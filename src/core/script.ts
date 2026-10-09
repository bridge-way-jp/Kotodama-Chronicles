import type { GameState, Question } from './types';

/** Data-driven dialogue / event scripting used by NPCs, objects and quests. */

export type Cond =
  | {
      flag?: string;
      notFlag?: string;
      questActive?: string;
      questDone?: string;
      questNotStarted?: string;
      obj?: string; // "quest.objective" completed
      notObj?: string;
      hasTeam?: boolean;
      item?: string;
      time?: 'morning' | 'evening';
      money?: number; // at least this much
    }
  | { all: Cond[] }
  | { any: Cond[] }
  | { not: Cond };

export type Action =
  | { flag: string; value?: boolean | number }
  | { startQuest: string }
  | { objective: string }
  | { give: string; n?: number }
  | { take: string; n?: number }
  | { money: number }
  | { xp: number }
  | { learn: string[] }
  | { rel: string; points: number; memory?: string }
  | { heal: true }
  | { sleep: true }
  | { recruit: string; level: number }
  | { seen: string }
  | { warp: { map: string; x: number; y: number } }
  | { time: 'morning' | 'evening' }
  | { open: 'review' | 'dashboard' | 'diagnostic' | 'shop' | 'menu' }
  | { chapter: number };

export type Mood = 'neutral' | 'happy' | 'surprised' | 'worried';

export type Step =
  | { say: string; who?: string; en?: string; mood?: Mood }
  | { cg: string; say?: string; en?: string }
  | { choice: { text: string; en?: string; then?: Step[] }[] }
  | { reading: string; then?: Step[] }
  | { listening: string; then?: Step[] }
  | { quiz: Question; keys?: string[]; area: 'vocab' | 'grammar' | 'reading' | 'listening' | 'kanji'; retry?: boolean }
  | { teach: string } // card key to introduce with a short explanation (e.g. "g:wakedewanai")
  | { battle: { species: string; level: number; recruitable?: boolean; boss?: boolean; bg?: string }; win?: Step[]; lose?: Step[] }
  | { do: Action[] }
  | { if: Cond; then: Step[]; else?: Step[] }
  | { toast: string }
  | { shop: string[] };

export interface DialogueRule {
  when?: Cond;
  steps: Step[];
}

export function questObjDone(s: GameState, path: string): boolean {
  const [q, o] = path.split('.');
  const qp = s.quests[q];
  if (!qp) return false;
  if (qp.status === 'done') return true;
  return !!qp.objectives[o];
}

export function check(s: GameState, c: Cond | undefined): boolean {
  if (!c) return true;
  if ('all' in c) return c.all.every((x) => check(s, x));
  if ('any' in c) return c.any.some((x) => check(s, x));
  if ('not' in c) return !check(s, c.not);
  if (c.flag && !s.flags[c.flag]) return false;
  if (c.notFlag && s.flags[c.notFlag]) return false;
  if (c.questActive && s.quests[c.questActive]?.status !== 'active') return false;
  if (c.questDone && s.quests[c.questDone]?.status !== 'done') return false;
  if (c.questNotStarted && s.quests[c.questNotStarted]) return false;
  if (c.obj && !questObjDone(s, c.obj)) return false;
  if (c.notObj && questObjDone(s, c.notObj)) return false;
  if (c.hasTeam !== undefined && c.hasTeam !== s.team.length > 0) return false;
  if (c.item && !(s.inventory[c.item] > 0)) return false;
  if (c.time && s.timeOfDay !== c.time) return false;
  if (c.money !== undefined && s.money < c.money) return false;
  return true;
}

export function pickRule(s: GameState, rules: DialogueRule[]): Step[] | null {
  for (const r of rules) if (check(s, r.when)) return r.steps;
  return null;
}
