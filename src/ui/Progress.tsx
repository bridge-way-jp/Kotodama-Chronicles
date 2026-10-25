import { isDe } from '../core/i18n';
import { useState, useSyncExternalStore } from 'react';
import { store } from '../core/store';
import { toast } from '../core/events';
import { NPCS } from '../content/npcs';
import { ITEMS } from '../content/creatures';
import { MAPS } from '../content/maps';
import { BRING_REWARD, REQUEST_REWARD, finishRequest, requestDone, todayRequests, type DailyRequest } from '../core/daily';
import { MILESTONES, checkMilestones, delta, reached, thisWeek, type Delta } from '../core/progress';
import { readiness } from '../core/readiness';
import { checkKeys, MasteryCheck } from './Mastery';
import { Jp } from './Jp';

const useStore = () => useSyncExternalStore(store.subscribe, store.getVersion);

const portraitOf = (id: string) => {
  const p = NPCS[id]?.portrait;
  return p?.startsWith('portrait_') ? `${p}_neutral` : p;
};

/** today's requests from people: answer a word, review together, or bring something they like */
export function RequestsSection() {
  useStore();
  const s = store.s;
  const list = todayRequests(s);
  const [open, setOpen] = useState<{ q: DailyRequest; keys: string[] } | null>(null);
  if (open)
    return (
      <section className="requests">
        <MasteryCheck
          keys={open.keys}
          title={`${NPCS[open.q.who].name}のお願い`}
          sub={open.q.en}
          onDone={() => {
            store.update((st) => {
              finishRequest(st, open.q);
              checkMilestones(st);
            }, 'request');
            toast(`お願い達成！ +¥${REQUEST_REWARD.money} · ${NPCS[open.q.who].name} ♥`, 'level');
            setOpen(null);
          }}
        />
      </section>
    );
  return (
    <section className="requests">
      <h3>今日のお願い — Today's requests</h3>
      {!list.length && <p className="note">Get to know people and learn a few words: then they will ask you for small favours every day.</p>}
      {list.map((q) => {
        const done = requestDone(s, q);
        const npc = NPCS[q.who];
        const have = q.item ? s.inventory[q.item] ?? 0 : 0;
        const keys = q.kind === 'word' ? [q.key!] : q.kind === 'review' ? checkKeys(s, 3) : [];
        return (
          <div key={q.id} className={`request ${done ? 'done' : ''}`}>
            {portraitOf(q.who) && <img className="px" src={`assets/${portraitOf(q.who)}.png`} alt="" />}
            <div className="request-body">
              <b lang="ja">{npc.name}</b>
              <div lang="ja">
                「<Jp text={q.ja} />」
              </div>
              <small>{q.en}</small>
              {q.kind === 'bring' && !done && (
                <div className="note">
                  {q.item && <img className="px icon" src={`assets/${ITEMS[q.item].icon}.png`} alt="" />} {ITEMS[q.item!].nameEn} · {have ? `you have ${have}: talk to ${npc.nameEn}` : 'buy it in a shop'} · 📍 {MAPS[q.map!]?.name ?? q.map}
                </div>
              )}
            </div>
            <div className="request-act">
              {done ? (
                <span className="badge m-mature">済</span>
              ) : q.kind === 'bring' ? (
                <small>+¥{BRING_REWARD.money}</small>
              ) : (
                <button className="btn small primary" disabled={!keys.length} onClick={() => setOpen({ q, keys })}>
                  {q.kind === 'word' ? '答える' : '復習する'}
                  <small> +¥{REQUEST_REWARD.money}</small>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}

/** milestones that bring something new to your room */
export function MilestonesSection() {
  useStore();
  const s = store.s;
  const next = MILESTONES.filter((m) => !reached(s, m));
  const got = MILESTONES.filter((m) => reached(s, m));
  return (
    <section>
      <h3>部屋のごほうび — Rewards for your room</h3>
      <p className="note">Learning milestones put something new in your apartment.</p>
      <div className="milestones">
        {[...next.slice(0, 4), ...got].map((m) => {
          const [have, need] = m.progress(s);
          const ok = reached(s, m);
          return (
            <div key={m.id} className={`milestone ${ok ? 'done' : ''}`}>
              <img className="px icon" src={`assets/${ITEMS[m.deco].icon}.png`} alt="" />
              <div>
                <b lang="ja">{m.ja}</b> <small>{m.en}</small>
                <div className="ms-bar">
                  <div style={{ width: `${(have / need) * 100}%` }} />
                </div>
                <small>
                  {ok ? (isDe() ? `✓ ${ITEMS[m.deco].nameEn} steht in deinem Zimmer` : `✓ ${ITEMS[m.deco].nameEn} is in your room`) : `${have} / ${need} → ${ITEMS[m.deco].nameEn}`}
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DeltaList({ d }: { d: Delta }) {
  const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);
  const pl = (n: number, one: string, many: string) => (n === 1 ? one : many);
  const rows: [string, string, number][] = [
    ['📝', pl(d.answers, 'answer', 'answers'), d.answers],
    ['📖', pl(d.words, 'new word', 'new words'), d.words],
    ['🈷', 'new kanji', d.kanji],
    ['🧩', pl(d.grammar, 'new grammar point', 'new grammar points'), d.grammar],
    ['🔥', pl(d.goalDays, 'day with the daily goal', 'days with the daily goal'), d.goalDays],
    ['✉', pl(d.requests, 'request fulfilled', 'requests fulfilled'), d.requests],
  ];
  return (
    <div className="week-delta">
      <div className="week-ready">
        N2 readiness <b className={d.ready >= 0 ? 'up' : 'down'}>{sign(Math.round(d.ready / 10))}%</b>
      </div>
      <ul>
        {rows
          .filter(([, , v]) => v > 0)
          .map(([icon, label, v]) => (
            <li key={label}>
              {icon} <b>{v}</b> {label}
            </li>
          ))}
      </ul>
    </div>
  );
}

/** what you achieved this week so far */
export function WeekSection() {
  useStore();
  const d = thisWeek(store.s);
  if (!d) return null;
  return (
    <section className="diary-week">
      <h3>今週 — This week</h3>
      {d.answers ? <DeltaList d={d} /> : <p className="note">Nothing yet this week. A few answers a day keep it growing.</p>}
    </section>
  );
}

/** the review of the past week, shown on the first visit of a new week */
export function WeekReview({ onClose }: { onClose: () => void }) {
  const s = store.s;
  const r = s.week?.review;
  if (!r) return null;
  const d = delta(r.from, r.to);
  const weak = readiness(s).weakest;
  const days = (d.goalDays / 7) * 100;
  const close = () => {
    store.update((st) => void (st.week && delete st.week.review), 'week');
    onClose();
  };
  return (
    <div className="dialogue-wrap">
      <div className="panel week-review">
        <h2>先週のふりかえり</h2>
        <div className="note">Your last week in Japanese</div>
        <DeltaList d={d} />
        <p lang="ja">{days >= 70 ? 'すばらしい一週間でした！ この調子で。' : d.answers >= 40 ? 'よくがんばりました。今週も少しずつ。' : '少しでも毎日続けるのが一番です。'}</p>
        <small>{days >= 70 ? 'A great week! Keep it up.' : d.answers >= 40 ? 'Well done. A little every day this week too.' : 'A little every day works best.'}</small>
        {weak && <p className="note">This week, try more {weak.label.split(' ').slice(1).join(' ')} — it is your weakest area ({Math.round(weak.score * 100)}%).</p>}
        <button className="btn primary" autoFocus onClick={close}>
          今週もがんばろう！
        </button>
      </div>
    </div>
  );
}

/** how many of today's requests are still open (for the HUD) */
export function openRequests(): number {
  const s = store.s;
  return todayRequests(s).filter((q) => !requestDone(s, q)).length;
}
