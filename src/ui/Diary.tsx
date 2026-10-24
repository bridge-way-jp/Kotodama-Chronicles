import { store } from '../core/store';
import { QUESTS } from '../content/quests';
import { NPCS } from '../content/npcs';
import { HEART_EVENTS } from '../content/social';
import { guideFor } from '../core/guide';
import { hearts, profileOf } from '../core/social';
import type { GameState } from '../core/types';
import { MilestonesSection, RequestsSection, WeekSection } from './Progress';
import { MemoriesSection } from './Memories';

const CHAPTER_NAMES: Record<number, [string, string]> = {
  1: ['日野森の春', 'Spring in Hinomori'],
  2: ['日野森の谷', 'Hinomori valley'],
  3: ['雪見村', 'Yukimi Village'],
  4: ['潮見町', 'Shiomi'],
  5: ['京都', 'Kyoto'],
  6: ['大阪', 'Osaka'],
  7: ['東京', 'Tokyo'],
};

/** the current main quest, what it is about and where to go next */
export function nowText(s: GameState): { title: string; titleEn: string; desc: string; next?: string; where?: string } | null {
  const q = Object.values(s.quests).find((x) => x.status === 'active' && QUESTS[x.id]?.kind === 'main');
  if (!q) return null;
  const d = QUESTS[q.id];
  const obj = d.objectives.find((o) => !q.objectives[o.id]);
  const g = guideFor(s, q.id, s.map);
  return { title: d.title, titleEn: d.titleEn, desc: d.description, next: obj?.text, where: g ? `${g.ja} (${g.en})${g.far ? ' · by train or bus' : ''}` : undefined };
}

/** diary: what happened so far, chapter by chapter, and the people you have met */
export function DiaryTab() {
  const s = store.s;
  const now = nowText(s);
  const done = Object.values(QUESTS).filter((q) => q.kind === 'main' && s.quests[q.id]?.status === 'done');
  const byChapter = new Map<number, typeof done>();
  for (const q of done) byChapter.set(q.chapter, [...(byChapter.get(q.chapter) ?? []), q]);
  const people = Object.entries(s.relationships)
    .filter(([id]) => profileOf(id))
    .sort((a, b) => b[1].points - a[1].points);
  return (
    <div className="diary">
      {now && (
        <section className="diary-now">
          <h3>いま — Now</h3>
          <b lang="ja">{now.title}</b> <small>{now.titleEn}</small>
          <p>{now.desc}</p>
          {now.next && <p>▸ {now.next}</p>}
          {now.where && <p className="note">📍 {now.where}</p>}
        </section>
      )}
      <RequestsSection />
      <WeekSection />
      <MilestonesSection />
      <section>
        <h3>これまで — The story so far</h3>
        {!done.length && <p className="note">Nothing yet. Your story starts in Hinomori.</p>}
        {[...byChapter.entries()].map(([ch, qs]) => (
          <div key={ch} className="diary-ch">
            <div className="diary-ch-title">
              第{ch}章 <span lang="ja">{CHAPTER_NAMES[ch]?.[0]}</span> <small>{CHAPTER_NAMES[ch]?.[1]}</small>
            </div>
            <ul>
              {qs.map((q) => (
                <li key={q.id}>
                  <b lang="ja">{q.title}</b> <small>{q.titleEn}</small> — {q.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section>
        <h3>人々 — People</h3>
        {!people.length && <p className="note">Talk to people to get to know them.</p>}
        <div className="people">
          {people.map(([id, r]) => {
            const npc = NPCS[id];
            const h = hearts(s, id);
            const portrait = npc.portrait?.startsWith('portrait_') ? `${npc.portrait}_neutral` : npc.portrait;
            return (
              <div key={id} className="person">
                {portrait && <img className="px" src={`assets/${portrait}.png`} alt="" />}
                <div>
                  <b lang="ja">{npc.name}</b> <small>{npc.nameEn} · {npc.role}</small>
                  <div className="hearts" aria-label={`${h} of 5 hearts`}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span key={i} className={i < h ? 'on' : ''}>♥</span>
                    ))}
                    {HEART_EVENTS[id] && !s.flags['heart_' + id] && r.points >= 6 && <small className="note"> ✦ wants to talk</small>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="note">Talk a little more, answer in the right register and give gifts they like to grow closer. Close friends share a story of their own.</p>
      </section>
      <MemoriesSection />
    </div>
  );
}
