import { useState, type ReactNode } from 'react';
import { store, DEFAULT_SETTINGS } from '../core/store';
import { QUESTS } from '../content/quests';
import { AFFINITY_INFO, ITEMS, MOVES, SPECIES } from '../content/creatures';
import { NPCS } from '../content/npcs';
import { VOCAB, wordForm } from '../content/vocab';
import { GRAMMAR } from '../content/grammar';
import { KANJI } from '../content/kanji';
import { AFFIXES } from '../content/wordformation';
import { CONFUSIONS } from '../content/confusions';
import { EXAM_TYPES } from '../content/examtypes';
import { creatureXpToNext, maxHp, xpToNext } from '../core/game';
import { readiness } from '../core/readiness';
import { DAILY_GOAL, answersToday, queueInfo, streakDays } from '../core/learning';
import { mastery } from '../core/srs';
import { SECTIONS, type Section } from '../core/exam';
import { exportToJson, makeEnvelope } from '../core/save';
import { ExportBox, ImportBox } from './Backup';
import { CloudSettings, PackSettings } from './CloudPanel';
import { saveNow, saveStatus } from '../core/persistence';
import { SECRETS, foundSecrets } from '../content/secrets';
import { NOTES, foundNotes } from '../content/society';
import { setSfx, setMusicVolume, hasJapaneseVoice, ttsAvailable } from '../core/audio';
import { ItemDetail, MASTERY_LABEL } from './Cards';
import type { Settings } from '../core/types';
import { DiaryTab } from './Diary';
import { MixupsSection } from './Mixups';
import { PalaceSection } from './Palace';

export type MenuTab = 'status' | 'diary' | 'quests' | 'kotodama' | 'bag' | 'notebook' | 'japan' | 'jlpt' | 'map' | 'settings';

const TABS: { id: MenuTab; ja: string; en: string; icon: string }[] = [
  { id: 'quests', ja: 'クエスト', en: 'Quests', icon: 'mi_quests' },
  { id: 'diary', ja: '日記', en: 'Diary & people', icon: 'mi_notebook' },
  { id: 'kotodama', ja: 'コトダマ', en: 'Kotodama', icon: 'mi_kotodama' },
  { id: 'notebook', ja: 'ノート', en: 'Notebook', icon: 'mi_notebook' },
  { id: 'japan', ja: '日本ノート', en: 'Japan notes', icon: 'mi_notebook' },
  { id: 'jlpt', ja: 'JLPT N2', en: 'Readiness', icon: 'mi_jlpt' },
  { id: 'bag', ja: 'もちもの', en: 'Bag', icon: 'mi_bag' },
  { id: 'status', ja: 'ステータス', en: 'Status', icon: 'mi_status' },
  { id: 'map', ja: 'ちず', en: 'Region map', icon: 'mi_map' },
  { id: 'settings', ja: '設定', en: 'Settings & Save', icon: 'mi_settings' },
];

export interface MenuActions {
  openReview: () => void;
  openWeak: () => void;
  openMixups: () => void;
  openPlace: (map: string) => void;
  openExam: (mode: 'practice' | 'mock' | 'diagnostic', section?: Section) => void;
  openTournament: () => void;
  toTitle: () => void;
}

export function Menu({ tab: initial, onClose, actions }: { tab?: MenuTab; onClose: () => void; actions: MenuActions }) {
  const [tab, setTab] = useState<MenuTab>(initial ?? 'quests');
  return (
    <div className="menu-backdrop" onClick={onClose}>
      <div className="panel menu" onClick={(e) => e.stopPropagation()}>
        <div className="menu-tabs">
          {TABS.map((t) => (
            <button key={t.id} className={`tab ${t.id === tab ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              <img className="px" src={`assets/${t.icon}.png`} alt="" />
              <span>{t.ja}</span>
              <small>{t.en}</small>
            </button>
          ))}
          <button className="tab close-tab" onClick={onClose}>
            ✕ <small>Close (Esc)</small>
          </button>
        </div>
        <div className="menu-body">
          {tab === 'status' && <StatusTab />}
          {tab === 'quests' && <QuestsTab />}
          {tab === 'diary' && <DiaryTab />}
          {tab === 'kotodama' && <KotodamaTab />}
          {tab === 'bag' && <BagTab />}
          {tab === 'notebook' && <NotebookTab />}
          {tab === 'japan' && <JapanTab />}
          {tab === 'jlpt' && <JlptTab actions={actions} />}
          {tab === 'map' && <MapTab />}
          {tab === 'settings' && <SettingsTab actions={actions} />}
        </div>
      </div>
    </div>
  );
}

function Bar({ value, color = '#3d8bd9', label }: { value: number; color?: string; label?: ReactNode }) {
  return (
    <div className="bar">
      <div className="bar-fill" style={{ width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`, background: color }} />
      {label && <span className="bar-label">{label}</span>}
    </div>
  );
}

// ------------------------------------------------------------------ status
function AlbumGrid() {
  const s = store.s;
  const cards = Object.values(s.cards);
  const known = (p: string) => cards.filter((c) => c.key.startsWith(p) && c.introduced).length;
  const entries: { label: string; ja: string; have: number; of: number }[] = [
    { ja: '図鑑', label: 'Kotodama met', have: Object.keys(s.dex).length, of: Object.keys(SPECIES).length },
    { ja: '仲間', label: 'Kotodama befriended', have: Object.values(s.dex).filter((d) => d === 'caught').length, of: Object.keys(SPECIES).length },
    { ja: '日本ノート', label: 'Japan notes', have: foundNotes(s), of: Object.keys(NOTES).length },
    { ja: 'ひみつ', label: 'Secrets', have: foundSecrets(s), of: Object.keys(SECRETS).length },
    { ja: '語彙', label: 'Words studied', have: known('v:'), of: VOCAB.length },
    { ja: '文法', label: 'Grammar patterns', have: known('g:'), of: GRAMMAR.length },
    { ja: '漢字', label: 'Kanji', have: known('k:'), of: KANJI.length },
    { ja: '旅', label: 'Places visited', have: ['yukimi', 'shiomi', 'kyoto', 'osaka', 'tokyo'].filter((k) => s.flags[`${k}_visited`]).length, of: 5 },
  ];
  return (
    <div className="album-grid">
      {entries.map((e) => (
        <div key={e.ja} className={`album-card ${e.have >= e.of && e.of > 0 ? 'full' : ''}`}>
          <b lang="ja">{e.ja}</b> <small className="note">{e.label}</small>
          <Bar value={e.of ? e.have / e.of : 0} color="#2fa58b" label={`${e.have}/${e.of}`} />
        </div>
      ))}
    </div>
  );
}

function StatusTab() {
  const s = store.s;
  const r = readiness(s);
  const hours = Math.floor(s.stats.playMs / 3600000);
  const mins = Math.floor((s.stats.playMs % 3600000) / 60000);
  return (
    <div className="tab-content">
      <div className="status-head">
        <img className="px portrait-lg" src="assets/portrait_hero_happy.png" alt="" />
        <div>
          <h2>{s.playerName}</h2>
          <div>Lv. {s.level} · ¥{s.money} · Day {s.day} ({s.timeOfDay === 'morning' ? '朝' : '夜'})</div>
          <Bar value={s.xp / xpToNext(s.level)} label={`XP ${s.xp}/${xpToNext(s.level)}`} />
          <div className="note">Play time {hours}h {mins}m · {s.stats.battlesWon} battles · {s.stats.recruited} Kotodama befriended</div>
        </div>
      </div>
      <h3>今日の目標 Daily goal</h3>
      <p className="note">
        {Math.min(answersToday(s), DAILY_GOAL)} / {DAILY_GOAL} answers today · streak <b>🔥 {streakDays(s)}</b> days (best {Number(s.flags.streak_best ?? 0)}). Reaching the goal pays ¥50 per streak day (up to ¥350).
      </p>
      <Bar value={Math.min(1, answersToday(s) / DAILY_GOAL)} color="#e8903c" label={`${Math.min(answersToday(s), DAILY_GOAL)}/${DAILY_GOAL}`} />
      <h3>アルバム Album</h3>
      <AlbumGrid />
      <h3>言語スキル Language skills</h3>
      <p className="note">Separate from your RPG level — based only on demonstrated answers.</p>
      {r.areas.map((a) => (
        <div key={a.area} className="skill-row">
          <span lang="ja">{a.label}</span>
          <Bar value={a.score} color="#2fa58b" label={`${Math.round(a.score * 100)}%`} />
        </div>
      ))}
      <h3>人間関係 Relationships</h3>
      {Object.keys(s.relationships).length === 0 && <p className="note">Talk to people around town.</p>}
      {Object.entries(s.relationships).map(([id, rel]) => (
        <div key={id} className="rel-row">
          <b>{NPCS[id]?.name ?? id}</b> <small>{NPCS[id]?.role}</small>
          <span className="hearts">{'♥'.repeat(Math.min(5, Math.ceil(rel.points / 2)))}{'♡'.repeat(Math.max(0, 5 - Math.ceil(rel.points / 2)))}</span>
          {rel.memories.length > 0 && <div className="note">Remembers: {rel.memories.map(memoryText).join(' · ')}</div>}
        </div>
      ))}
      <h3>
        ひみつ Secrets <small className="note">{foundSecrets(s)} / {Object.keys(SECRETS).length}</small>
      </h3>
      <ul className="secret-list">
        {Object.entries(SECRETS).map(([id, x]) =>
          s.flags['secret_' + id] ? (
            <li key={id} className="found">
              ✦ <b lang="ja">{x.name}</b> <small>{x.nameEn}</small>
            </li>
          ) : (
            <li key={id} className="hidden">
              ？？？ <small className="note">{x.hint}</small>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

function JapanTab() {
  const s = store.s;
  const chapters = [...new Set(Object.values(NOTES).map((n) => n.chapter))].sort((a, b) => a - b);
  return (
    <div className="tab-content">
      <h3>
        日本ノート Japan notes <small className="note">{foundNotes(s)} / {Object.keys(NOTES).length}</small>
      </h3>
      <p className="note">Alltag, Gesellschaft und Probleme in Japan. Einträge schalten sich frei, wenn du die passende Stelle im Spiel erlebst. / Everyday life and society in Japan, unlocked as you meet them.</p>
      {chapters.map((c) => (
        <div key={c}>
          <h4>Kapitel {c}</h4>
          <ul className="japan-list">
            {Object.entries(NOTES)
              .filter(([, n]) => n.chapter === c)
              .map(([id, n]) =>
                s.flags['note_' + id] ? (
                  <li key={id} className="found">
                    <b lang="ja">{n.title}</b> <small>{n.titleEn}</small>
                    <p>{n.de}</p>
                    <p className="note">{n.en}</p>
                    {n.words && <p lang="ja" className="note">{n.words}</p>}
                  </li>
                ) : (
                  <li key={id} className="hidden">
                    ？？？ <small className="note">noch nicht entdeckt / not found yet</small>
                  </li>
                ),
              )}
          </ul>
        </div>
      ))}
    </div>
  );
}

function memoryText(m: string) {
  return (
    {
      first_meeting: 'your first meeting', helped_customer: 'you helped with the regular customer', letter: 'the unsigned letter',
      presentation: 'you helped with the presentation', homework: 'you did the わけ homework', archive_project: 'you found the word fragment',
      lab_past: 'stories about the facility', university_rumour: 'the university rumour',
      forgot_name: 'the day she forgot your name', name_scroll: 'the name you wrote for her', husband_voice: 'her husband’s voice in the steam',
      boat_song: 'the boat song at dawn', shell: 'the singing shell', whale_song: 'the song in the recording',
      name_written: 'the name you wrote with the brush', trial_passed: 'you passed the trial', hearth: 'the evening by the hearth', letter_read: 'reading the letter together',
    }[m] ?? m
  );
}

// ------------------------------------------------------------------ quests
/** where to go next when the story is waiting for the player: first match wins */
const NEXT_STEPS: { show: (s: typeof store.s) => boolean; ja: string; en: string }[] = [
  { show: (s) => !!s.flags.chapter7_done, ja: '次は：言葉の大会に挑戦！', en: 'The story is complete. Try the Word Tournament (Menu → JLPT N2), work part-time jobs, or take the exam simulation.' },
  { show: (s) => !!s.flags.chapter6_done && !s.quests.mq26, ja: '次は：森さん → 日野森駅から東京へ', en: 'Next: talk to Ms. Mori (in front of the apartment), then take the Shinkansen to Tokyo from Hinomori station (walk into the station and use the ticket gates, or the departure sign on the platform).' },
  { show: (s) => !!s.flags.chapter5_done && !s.quests.mq22, ja: '次は：森さん → 大阪へ', en: 'Next: talk to Ms. Mori (in front of the apartment), then take the train to Osaka from Hinomori station (walk into the station and use the ticket gates, or the departure sign on the platform).' },
  { show: (s) => !!s.flags.chapter4_done && !s.quests.mq18, ja: '次は：森さん → 京都へ', en: 'Next: talk to Ms. Mori (in front of the apartment), then take the train to Kyoto from Hinomori station (walk into the station and use the ticket gates, or the departure sign on the platform).' },
  { show: (s) => !!s.flags.chapter3_done && !s.quests.mq14, ja: '次は：森さん → 潮見町へ', en: 'Next: talk to Ms. Mori (in front of the apartment), then take the train to Shiomi from Hinomori station (walk into the station and use the ticket gates, or the departure sign on the platform).' },
  { show: (s) => !!s.flags.mori_scroll && !s.quests.mq10, ja: '次は：もう一度、森さんと話す', en: 'Next: talk to Ms. Mori again (in front of the apartment in Hinomori town), then take the train to Yukimi.' },
  { show: (s) => !!s.flags.chapter2_done && !s.flags.mori_scroll, ja: '次は：名前の巻物を森さんへ', en: 'Next: take Mr. Ōta’s name scroll back to Hinomori by bus (stop at the lower right of the valley) and show it to Ms. Mori in front of the apartment.' },
  { show: (s) => !!s.flags.chapter1_done && !s.quests.mq6, ja: '次は：森さんと話す', en: 'Next: talk to Ms. Mori in front of the apartment.' },
];

function QuestsTab() {
  const s = store.s;
  const list = Object.values(s.quests).sort((a, b) => (a.status === b.status ? b.startedAt - a.startedAt : a.status === 'active' ? -1 : 1));
  const renderQuest = (q: (typeof list)[number]) => {
    const def = QUESTS[q.id];
    return (
      <div key={q.id} className={`quest ${q.status}`}>
            <div className="quest-title">
              <span className={`qkind ${def.kind}`}>{{ main: 'メイン', side: 'サブ', character: 'キャラ' }[def.kind]}</span>
              <b lang="ja">{def.title}</b> <small>{def.titleEn}</small>
              {q.status === 'done' && <span className="badge m-mature">完了</span>}
            </div>
            <div className="note">{def.description}</div>
            {q.status === 'active' && (
              <ul>
                {def.objectives.map((o) => (
                  <li key={o.id} className={q.objectives[o.id] ? 'done' : ''}>
                    {q.objectives[o.id] ? '☑' : '☐'} {o.text}
                  </li>
                ))}
              </ul>
            )}
            <div className="note">Language focus: <span lang="ja">{def.learning.map((k) => itemLabel(k)).join('・')}</span></div>
          </div>
    );
  };
  const next = NEXT_STEPS.find((n) => n.show(s));
  if (!list.length) return <div className="tab-content"><p>No quests yet.</p></div>;
  return (
    <div className="tab-content">
      {next && (
        <div className="quest active">
          <div className="quest-title"><b lang="ja">{next.ja}</b></div>
          <div className="note">{next.en}</div>
        </div>
      )}
      {list.filter((q) => q.status !== 'done').map(renderQuest)}
      {list.some((q) => q.status === 'done') && (
        <details className="quest-done">
          <summary>完了 Completed ({list.filter((q) => q.status === 'done').length})</summary>
          {list.filter((q) => q.status === 'done').map(renderQuest)}
        </details>
      )}
    </div>
  );
}

function itemLabel(k: string) {
  const [t, id] = k.split(':');
  if (t === 'v') return VOCAB.find((v) => v.id === id)?.word ?? id;
  if (t === 'g') return GRAMMAR.find((g) => g.id === id)?.pattern ?? id;
  return KANJI.find((x) => x.id === id)?.char ?? id;
}

// ------------------------------------------------------------------ kotodama
function KotodamaTab() {
  const s = store.s;
  const [, setV] = useState(0);
  const allSpecies = Object.values(SPECIES);
  return (
    <div className="tab-content">
      <h3>チーム Team</h3>
      {s.team.length === 0 && <p className="note">No Kotodama yet. Maybe the mystery letter will lead you to one…</p>}
      {s.team.map((c, i) => {
        const sp = SPECIES[c.speciesId];
        return (
          <div key={c.uid} className="creature-card">
            <img className="px creature-img" src={`assets/${sp.sprite}.png`} alt="" />
            <div className="cc-body">
              <div>
                <b>{sp.name}</b> <small>{sp.nameEn}</small> · Lv.{c.level}{' '}
                <img className="px aff-icon" src={`assets/${AFFINITY_INFO[sp.affinity].icon}.png`} alt="" /> {AFFINITY_INFO[sp.affinity].ja}
              </div>
              <Bar value={c.hp / maxHp(c)} color="#4cc463" label={`HP ${c.hp}/${maxHp(c)}`} />
              <Bar value={c.xp / creatureXpToNext(c.level)} label={`XP ${c.xp}/${creatureXpToNext(c.level)}`} />
              <div className="note">
                Moves: {sp.moves.map((m) => MOVES[m].name).join('・')} · Ability: ✦{sp.ability.name} — {sp.ability.desc}
              </div>
              {sp.evolvesTo && <div className="note">Evolves at Lv.{sp.evolvesTo.level} → {SPECIES[sp.evolvesTo.species].name}</div>}
              {i > 0 && (
                <button
                  className="btn small"
                  onClick={() => {
                    store.update((st) => {
                      const [x] = st.team.splice(i, 1);
                      st.team.unshift(x);
                    }, 'settings');
                    setV((v) => v + 1);
                  }}
                >
                  Lead
                </button>
              )}
            </div>
          </div>
        );
      })}
      {s.box.length > 0 && <p className="note">+{s.box.length} resting at home (team max 4)</p>}
      <h3>図鑑 Collection ({Object.values(s.dex).filter((d) => d === 'caught').length}/{allSpecies.length})</h3>
      <div className="dex-grid">
        {allSpecies.map((sp) => {
          const st = s.dex[sp.id];
          return (
            <div key={sp.id} className={`dex-entry ${st ?? 'unknown'}`} title={st ? sp.descEn : '???'}>
              <img className="px" src={`assets/${sp.sprite}.png`} alt="" />
              <div>{st ? sp.name : '？？？'}</div>
              {st === 'caught' && <div className="dex-desc" lang="ja">{sp.desc.replace(/\{([^|]+)\|[^}]*\}/g, '$1')}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ bag
function BagTab() {
  const s = store.s;
  const [, setV] = useState(0);
  const [target, setTarget] = useState<string | null>(null);
  const entries = Object.entries(s.inventory).filter(([, n]) => n > 0);
  return (
    <div className="tab-content">
      <div className="money">¥{s.money}</div>
      {entries.length === 0 && <p>Your bag is empty.</p>}
      {entries.map(([id, n]) => {
        const it = ITEMS[id];
        if (!it) return null;
        return (
          <div key={id} className="shop-row">
            <img className="px icon" src={`assets/${it.icon}.png`} alt="" />
            <div className="shop-info">
              <b>{it.name}</b> ×{n} <small>{it.nameEn}</small>
              <div className="note">{it.desc}</div>
              {target === id && (
                <div className="row">
                  {s.team.map((c, i) => (
                    <button
                      key={c.uid}
                      className="btn small"
                      disabled={c.hp >= maxHp(c)}
                      onClick={() => {
                        store.update((st) => {
                          const cc = st.team[i];
                          cc.hp = Math.min(maxHp(cc), cc.hp + (it.heal ?? 0));
                          st.inventory[id]--;
                          if (!st.inventory[id]) delete st.inventory[id];
                        }, 'item');
                        setTarget(null);
                        setV((v) => v + 1);
                      }}
                    >
                      {SPECIES[c.speciesId].name} {c.hp}/{maxHp(c)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {it.kind === 'heal' && s.team.length > 0 && (
              <button className="btn small" onClick={() => setTarget(target === id ? null : id)}>
                使う
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ------------------------------------------------------------------ notebook
function NotebookTab() {
  const s = store.s;
  const [kind, setKind] = useState<'v' | 'g' | 'k' | 'w' | 'c'>('v');
  const [sel, setSel] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const items =
    kind === 'v'
      ? VOCAB.map((v) => ({ k: 'v:' + v.id, label: wordForm(v), sub: v.reading }))
      : kind === 'g'
        ? GRAMMAR.map((g) => ({ k: 'g:' + g.id, label: g.pattern, sub: g.meaning }))
        : KANJI.map((x) => ({ k: 'k:' + x.id, label: x.char, sub: x.meaning }));
  const visible = items.filter((i) => showAll || s.cards[i.k]);
  return (
    <div className="tab-content notebook">
      <div className="row">
        <button className={`btn small ${kind === 'v' ? 'primary' : ''}`} onClick={() => setKind('v')}>語彙 Vocab</button>
        <button className={`btn small ${kind === 'g' ? 'primary' : ''}`} onClick={() => setKind('g')}>文法 Grammar</button>
        <button className={`btn small ${kind === 'k' ? 'primary' : ''}`} onClick={() => setKind('k')}>漢字 Kanji</button>
        <button className={`btn small ${kind === 'w' ? 'primary' : ''}`} onClick={() => setKind('w')}>語形成 Affixes</button>
        <button className={`btn small ${kind === 'c' ? 'primary' : ''}`} onClick={() => setKind('c')}>比較 Confusables</button>
        {kind !== 'w' && kind !== 'c' && <label className="note">
          <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> show whole chapter curriculum
        </label>}
      </div>
      {kind === 'w' && <AffixList />}
      {kind === 'c' && <ConfusionList />}
      {kind !== 'w' && kind !== 'c' && <>
      <p className="note">
        {visible.length} shown · items you have only seen are not counted as learned until you answer them correctly in reviews, quests or battles.
      </p>
      <div className="nb-layout">
        <div className="nb-list">
          {visible.map((i) => {
            const c = s.cards[i.k];
            const m = c ? mastery(c) : 'unseen';
            return (
              <button key={i.k} className={`nb-item ${sel === i.k ? 'sel' : ''}`} onClick={() => setSel(i.k)}>
                <span className="nb-label" lang="ja">{i.label}</span>
                <span className="nb-sub">{i.sub}</span>
                <span className={`dot m-${m}`} title={MASTERY_LABEL[m]} />
              </button>
            );
          })}
        </div>
        <div className="nb-detail">{sel ? <ItemDetail k={sel} /> : <p className="note">Select an entry.</p>}</div>
      </div>
      </>}
    </div>
  );
}

function AffixList() {
  return (
    <div className="ref-list">
      {(['prefix', 'suffix'] as const).map((kind) => (
        <div key={kind}>
          <h4>{kind === 'prefix' ? '接頭語 Präfixe' : '接尾語 Suffixe'}</h4>
          <table className="report">
            <tbody>
              {AFFIXES.filter((a) => a.kind === kind).map((a) => (
                <tr key={a.part}>
                  <td lang="ja"><b>{a.part}</b> <small>{a.reading}</small></td>
                  <td>{a.de}</td>
                  <td lang="ja">{a.examples.map((e) => <span key={e.word} className="ref-ex">{e.word}<small>（{e.reading}）</small></span>)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <p className="note">Übe sie im JLPT-Tab unter 語形成.</p>
    </div>
  );
}

function ConfusionList() {
  return (
    <div className="ref-list">
      {CONFUSIONS.map((g) => (
        <div key={g.id} className="ref-group">
          <h4 lang="ja">{g.forms.join(' · ')}</h4>
          <p>{g.note}</p>
          <ul>
            {g.ex.map((e, i) => (
              <li key={i} lang="ja">{e.s.split('＿＿').join(`【${e.opts[0]}】`)} <small className="note">{e.en}</small></li>
            ))}
          </ul>
        </div>
      ))}
      <p className="note">These groups also appear in 文法形式の判断 practice and in the mock exam.</p>
    </div>
  );
}

// ------------------------------------------------------------------ JLPT
function JlptTab({ actions }: { actions: MenuActions }) {
  const s = store.s;
  const r = readiness(s);
  const q = queueInfo(s);
  return (
    <div className="tab-content">
      <h3>JLPT N2 準備 Preparation</h3>
      <div className="readiness-overall">
        <div className="ring" style={{ ['--p' as any]: Math.round(r.overall * 100) }}>
          <span>{Math.round(r.overall * 100)}%</span>
        </div>
        <div>
          <b>Curriculum mastery</b>
          <p className="note">
            Measures demonstrated, retained knowledge of the game's current content ({VOCAB.length} words, {GRAMMAR.length} grammar points, {KANJI.length} kanji)
            plus reading/listening accuracy. It is not an estimate of your official JLPT score; the N2 scope is much larger and the curriculum will grow.
          </p>
          {r.weakest && <p>Weakest area right now: <b lang="ja">{r.weakest.label}</b></p>}
        </div>
      </div>
      {r.areas.map((a) => (
        <div key={a.area} className="area-row">
          <div className="area-head">
            <b lang="ja">{a.label}</b>
            <span className="note">
              {a.total > 0
                ? `met ${a.encountered}/${a.total} · mastered ${a.counts.mature} · consolidating ${a.counts.young} · learning ${a.counts.learning} · needs work ${a.counts.struggling}`
                : `${a.attempts} answers`}
              {a.accuracy !== null && ` · accuracy ${Math.round(a.accuracy * 100)}%`}
              {a.avgMs !== null && ` · avg ${(a.avgMs / 1000).toFixed(1)}s`}
            </span>
          </div>
          {a.total > 0 ? (
            <div className="stack-bar">
              {(['mature', 'young', 'learning', 'struggling', 'seen'] as const).map((m) => (
                <div key={m} className={`m-${m}`} style={{ width: `${(a.counts[m] / a.total) * 100}%` }} title={`${MASTERY_LABEL[m]}: ${a.counts[m]}`} />
              ))}
            </div>
          ) : (
            <Bar value={a.score} color="#2fa58b" label={`${Math.round(a.score * 100)}%`} />
          )}
        </div>
      ))}
      <div className="legend">
        {(['mature', 'young', 'learning', 'struggling', 'seen'] as const).map((m) => (
          <span key={m}><i className={`dot m-${m}`} /> {MASTERY_LABEL[m]}</span>
        ))}
      </div>

      <MixupsSection onPractice={actions.openMixups} />
      <PalaceSection onPlace={actions.openPlace} />
      <h3>練習 Practice</h3>
      <div className="row wrap">
        <button className="btn" onClick={actions.openWeak}>苦手を練習 Practise weak spots</button>
        <button className="btn primary" onClick={actions.openReview}>
          復習 Review ({q.due.length} due · {Math.min(q.newAllowed, q.newAvailable.length)} new)
        </button>
        {s.flags.chapter7_done && <button className="btn" onClick={() => actions.openTournament()}>言葉の大会 Word Tournament{s.flags.tournament_best ? ` (best ${s.flags.tournament_best})` : ''}</button>}
        <button className="btn" onClick={() => actions.openExam('diagnostic')}>実力診断 Diagnostic{s.flags.diagnostic_done ? ' (retake)' : ''}</button>
        <button className="btn" onClick={() => actions.openExam('mock')}>模擬試験 Mock exam (timed)</button>
      </div>
      <div className="row wrap">
        {SECTIONS.map((sec) => (
          <button key={sec.id} className="btn small" onClick={() => actions.openExam('practice', sec.id)}>
            <span lang="ja">{sec.id}</span> <small>{sec.en}</small>
          </button>
        ))}
      </div>
      {s.practice.length > 0 && (
        <>
          <h3>履歴 History</h3>
          <table className="report">
            <tbody>
              {[...s.practice].reverse().slice(0, 8).map((p) => {
                const ok = Object.values(p.sections).reduce((a, b) => a + b.ok, 0);
                const tot = Object.values(p.sections).reduce((a, b) => a + b.total, 0);
                return (
                  <tr key={p.t}>
                    <td>{new Date(p.t).toLocaleDateString()}</td>
                    <td>{p.mode}</td>
                    <td>{ok}/{tot} ({Math.round((ok / Math.max(1, tot)) * 100)}%)</td>
                    <td>{Math.round(p.durationMs / 60000)} min</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      <details className="exam-types">
        <summary>試験の問題形式 Aufgabentypen & Vorgehen</summary>
        <table className="report">
          <tbody>
            {EXAM_TYPES.map((t) => (
              <tr key={t.area + t.type}>
                <td>{t.area}</td>
                <td lang="ja"><b>{t.type}</b>{t.inGame ? ' ✓' : ''}</td>
                <td>{t.what}</td>
                <td>{t.how}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="note">✓ = im Spiel trainierbar.</p>
      </details>
      <p className="note">All practice questions are original and written in the style of the JLPT N2 — not official JLPT material. No in-game score guarantees passing the real exam.</p>
    </div>
  );
}

// ------------------------------------------------------------------ settings
function SettingsTab({ actions }: { actions: MenuActions }) {
  const [, setV] = useState(0);
  const [msg, setMsg] = useState('');
  const [panel, setPanel] = useState<'export' | 'import' | null>(null);
  const st = store.s.settings;
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => {
    store.update((s) => {
      s.settings[k] = v;
    }, 'settings');
    if (k === 'sfx') setSfx(v as boolean);
    setV((x) => x + 1);
  };
  return (
    <div className="tab-content settings">
      <h3>学習 Learning</h3>
      <label>
        Furigana
        <select value={st.furigana} onChange={(e) => set('furigana', e.target.value as Settings['furigana'])}>
          <option value="auto">Auto — hide for words you have learned</option>
          <option value="always">Always</option>
          <option value="tap">On tap only</option>
          <option value="off">Off</option>
        </select>
      </label>
      <label>
        Translations
        <select value={st.translation} onChange={(e) => set('translation', e.target.value as Settings['translation'])}>
          <option value="tap">On request (EN button)</option>
          <option value="always">Always show</option>
          <option value="never">Never</option>
        </select>
      </label>
      <label>
        Meaning language
        <select value={st.meaningLang} onChange={(e) => set('meaningLang', e.target.value as Settings['meaningLang'])}>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>
      </label>
      <label>
        New items per day
        <select value={st.newPerDay} onChange={(e) => set('newPerDay', Number(e.target.value))}>
          {[4, 8, 12, 16, 24].map((n) => (
            <option key={n} value={n}>{n}{n === DEFAULT_SETTINGS.newPerDay ? ' (recommended)' : ''}</option>
          ))}
        </select>
      </label>
      <label>
        Speech speed
        <select value={st.ttsRate} onChange={(e) => set('ttsRate', Number(e.target.value))}>
          {[0.7, 0.85, 1, 1.15].map((n) => <option key={n} value={n}>{n}×</option>)}
        </select>
      </label>
      <label>
        Music volume
        <input
          id="music-volume"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={st.musicVolume ?? 0.5}
          onChange={(e) => {
            set('musicVolume', Number(e.target.value));
            setMusicVolume(Number(e.target.value));
          }}
        />
      </label>
      <label>
        Sound effects <input type="checkbox" checked={st.sfx} onChange={(e) => set('sfx', e.target.checked)} />
      </label>
      <label>
        Text size
        <select value={st.uiScale ?? 'normal'} onChange={(e) => set('uiScale', e.target.value as Settings['uiScale'])}>
          <option value="normal">Normal</option>
          <option value="large">Large</option>
          <option value="xlarge">Extra large</option>
        </select>
      </label>
      <label>
        Touch controls
        <select value={st.touchMode ?? 'stick'} onChange={(e) => set('touchMode', e.target.value as Settings['touchMode'])}>
          <option value="stick">Drag anywhere (stick)</option>
          <option value="dpad">Arrow buttons</option>
        </select>
      </label>
      <label>
        High contrast <input type="checkbox" checked={!!st.highContrast} onChange={(e) => set('highContrast', e.target.checked)} />
      </label>
      <label>
        Read dialogue aloud <input type="checkbox" checked={!!st.readAloud} onChange={(e) => set('readAloud', e.target.checked)} />
      </label>
      <label>
        People ask about words learned with them <input type="checkbox" checked={st.echoes !== false} onChange={(e) => set('echoes', e.target.checked)} />
      </label>
      <label>
        Weather and season effects <input type="checkbox" checked={st.effects !== false} onChange={(e) => set('effects', e.target.checked)} />
      </label>
      <p className="note">
        Audio uses your browser's Japanese text-to-speech ({ttsAvailable() ? (hasJapaneseVoice() ? 'Japanese voice found' : 'no Japanese voice found — install one in your OS for best results') : 'not supported'}). It is synthetic, not a native-speaker recording.
      </p>

      <h3>セーブ Save data</h3>
      <p className="note">
        Progress is saved automatically in this browser (IndexedDB){saveStatus.last ? ` — last saved ${new Date(saveStatus.last).toLocaleTimeString()}` : ''}.
        Clearing browser data will erase it, so export a backup now and then.
      </p>
      {saveStatus.state === 'error' && <p className="warn">Last save failed: {saveStatus.error}</p>}
      <div className="row wrap">
        <button className="btn" onClick={async () => { await saveNow(); setMsg('Saved.'); }}>Save now</button>
        <button className="btn" onClick={() => setPanel(panel === 'export' ? null : 'export')}>Export backup</button>
        <button className="btn" onClick={() => setPanel(panel === 'import' ? null : 'import')}>Import backup</button>
        <button className="btn ghost" onClick={async () => { await saveNow(); actions.toTitle(); }}>Save & return to title</button>
      </div>
      {panel === 'export' && (
        <ExportBox
          text={exportToJson(makeEnvelope(store.s))}
          filename={`kotodama-save-${new Date().toISOString().slice(0, 10)}.json`}
          onClose={() => setPanel(null)}
        />
      )}
      {panel === 'import' && (
        <ImportBox
          hasSave
          onClose={() => setPanel(null)}
          onImport={async (env) => {
            await saveNow();
            store.set(env.state, 'import');
            await saveNow();
            location.reload();
          }}
        />
      )}
      {msg && <p className="note">{msg}</p>}
      <h3>☁ クラウド Cloud</h3>
      <CloudSettings />
      <h3>📚 Lernpaket (Anki)</h3>
      <PackSettings />
      <h3>操作 Controls</h3>
      <p className="note">Move: arrow keys / WASD · Talk / examine: Space, Enter, Z · Menu: Esc or M · On touch screens use the on-screen pad. · Press and hold any kanji word (or tap a word with furigana) for its reading and meaning.</p>
    </div>
  );
}

// ------------------------------------------------------------------ region map
const PLACES: { id: string; ja: string; en: string; x: number; y: number; open: (s: typeof store.s) => boolean; maps?: string[] }[] = [
  { id: 'town', ja: '日野森町', en: 'Hinomori Town', x: 55, y: 44, open: () => true, maps: ['town', 'apartment', 'cafe', 'konbini', 'library', 'station', 'ramen'] },
  { id: 'forest', ja: 'みどりの森', en: 'Midori Forest', x: 63, y: 16, open: (s) => !!s.flags.forest_open, maps: ['forest'] },
  { id: 'lab', ja: '日野森言語研究所', en: 'Language Research Facility', x: 82, y: 24, open: () => true, maps: ['lab'] },
  { id: 'valley', ja: '日野森の谷', en: 'Hinomori Valley', x: 70, y: 56, open: (s) => !!s.quests.mq6?.objectives.arrive, maps: ['valley'] },
  { id: 'village', ja: '雪見村', en: 'Yukimi Village', x: 18, y: 14, open: (s) => !!s.quests.mq10?.objectives.arrive, maps: ['mountain'] },
  { id: 'city', ja: 'さくら市', en: 'Sakura City', x: 12, y: 33, open: () => false },
  { id: 'univ', ja: '大学の街', en: 'University district', x: 18, y: 68, open: () => false },
  { id: 'coast', ja: '潮見町', en: 'Shiomi', x: 52, y: 84, open: (s) => !!s.quests.mq14?.objectives.arrive, maps: ['harbor'] },
];

function MapTab() {
  const s = store.s;
  const here = PLACES.find((p) => p.maps?.includes(s.map));
  return (
    <div className="tab-content">
      <h3>地図 Region map</h3>
      <div className="region-map">
        <img src="assets/region_map.webp" alt="Map of the region around Hinomori" />
        {PLACES.map((p) => (
          <div key={p.id} className={`map-pin ${p.open(s) ? 'open' : 'locked'} ${here === p ? 'here' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <span lang="ja">{p.open(s) ? p.ja : '？？？'}</span>
            {here === p && <img className="px map-me" src="assets/hero_down_0.png" alt="You are here" />}
          </div>
        ))}
      </div>
      <p className="note">
        You are in <b lang="ja">{here?.ja ?? '日野森町'}</b>. Places marked ？？？ open up as the story continues.
      </p>
    </div>
  );
}
