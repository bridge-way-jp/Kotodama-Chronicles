import { useState } from 'react';
import { store } from '../core/store';
import { questObjDone, type Step } from '../core/script';
import { SCRIPTS } from '../content/scripts';
import { QUESTS } from '../content/quests';
import { NPCS } from '../content/npcs';
import { DREAMS, HEART_PICTURES, SEASONS } from '../content/scenes';
import type { GameState } from '../core/types';

/**
 * The memories album: every story picture, in story order. A picture counts as seen when it was shown, or (for
 * saves from before the album) when the scene it belongs to is done.
 */

interface Memory {
  cg: string;
  chapter: number;
  seen: (s: GameState) => boolean;
}

let index: Memory[] | null = null;
function buildIndex(): Memory[] {
  const out = new Map<string, Memory>();
  const add = (cg: string, chapter: number, seen: (s: GameState) => boolean) => {
    const old = out.get(cg);
    if (!old) out.set(cg, { cg, chapter, seen });
    else out.set(cg, { cg, chapter: Math.min(old.chapter, chapter), seen: (s) => old.seen(s) || seen(s) });
  };
  add('cg_chapter1', 1, (s) => !!s.flags.intro_done);
  add('cg_arrival', 1, (s) => !!s.flags.intro_done);
  for (const rules of Object.values(SCRIPTS)) {
    for (const r of rules) {
      const cgs: string[] = [];
      const objs: string[] = [];
      const walk = (steps: Step[]) => {
        for (const st of steps as any[]) {
          if (st.cg) cgs.push(st.cg);
          for (const a of st.do ?? []) if (a.objective) objs.push(a.objective);
          for (const k of ['then', 'else', 'win', 'lose']) if (Array.isArray(st[k])) walk(st[k]);
          if (st.choice) for (const c of st.choice) if (c.then) walk(c.then);
        }
      };
      walk(r.steps);
      if (!cgs.length) continue;
      const chapter = Math.min(9, ...objs.map((o) => QUESTS[o.split('.')[0]]?.chapter ?? 9));
      for (const cg of cgs) if (!/^cg_(heart|dream|season)_/.test(cg)) add(cg, chapter, (s) => objs.length > 0 && objs.some((o) => questObjDone(s, o)));
    }
  }
  const story = [...out.values()].sort((a, b) => a.chapter - b.chapter);
  const hearts = Object.keys(HEART_PICTURES).map((id) => ({ cg: `cg_heart_${id}`, chapter: 10, seen: (s: GameState) => !!s.flags['heart_' + id] }));
  const dreams = DREAMS.map((d) => ({ cg: (d.steps[0] as { cg: string }).cg, chapter: 11, seen: (s: GameState) => !!s.flags[d.id] }));
  const seasons = SEASONS.map((x) => ({ cg: (x.step as { cg: string }).cg, chapter: 12, seen: (s: GameState) => Object.keys(s.flags).some((f) => f.startsWith(x.id + '_')) }));
  return [...story, ...hearts, ...dreams, ...seasons];
}

const GROUPS: [string, (m: Memory) => boolean][] = [
  ['物語 — Story', (m) => m.chapter <= 9],
  ['♥ 友だち — Friends', (m) => m.chapter === 10],
  ['夢 — Dreams', (m) => m.chapter === 11],
  ['季節 — Seasons at home', (m) => m.chapter === 12],
];

export function MemoriesSection() {
  index ??= buildIndex();
  const s = store.s;
  const [open, setOpen] = useState<string | null>(null);
  const seen = (m: Memory) => !!s.flags['seen_' + m.cg] || m.seen(s);
  const have = index.filter(seen).length;
  return (
    <section>
      <h3>思い出 — Memories <small className="note">{have} / {index.length}</small></h3>
      {GROUPS.map(([title, pick]) => {
        const list = index!.filter(pick);
        return (
          <div key={title}>
            <div className="mem-title">{title}</div>
            <div className="memories">
              {list.map((m) =>
                seen(m) ? (
                  <button key={m.cg} className="mem" onClick={() => setOpen(m.cg)} title={m.cg}>
                    <img src={`assets/${m.cg}.webp`} alt="" loading="lazy" />
                  </button>
                ) : (
                  <div key={m.cg} className="mem locked" title={m.cg.startsWith('cg_heart_') ? NPCS[m.cg.slice(9)]?.nameEn : undefined}>
                    ？
                  </div>
                ),
              )}
            </div>
          </div>
        );
      })}
      {open && (
        <div className="gloss-backdrop mem-view" onClick={() => setOpen(null)}>
          <img src={`assets/${open}.webp`} alt="" />
        </div>
      )}
    </section>
  );
}
