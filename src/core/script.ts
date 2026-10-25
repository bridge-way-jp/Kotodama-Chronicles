import type { Dir, GameState, Question } from './types';

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
      /** a counter (numeric flag) has reached at least this value: [name, n] */
      count?: [string, number];
      /** today's real date is one of these 'MM-DD' days */
      date?: string[];
      /** the real local hour is in [from, to) — wraps past midnight, e.g. [0, 4] */
      hours?: [number, number];
      /** the player's name is one of these */
      name?: string[];
      /** not yet done this real year (see the yearFlag action) */
      notYearFlag?: string;
      /** the real month (1–12) is one of these */
      months?: number[];
      /** random chance 0–1; only use inside an `if` step, never in a rule's `when` */
      chance?: number;
    }
  | { all: Cond[] }
  | { any: Cond[] }
  | { not: Cond };

export type Action =
  | { flag: string; value?: boolean | number }
  /** count up a numeric flag */
  | { add: string; n?: number }
  /** set a flag that only holds for the current real year */
  | { yearFlag: string }
  /** the player found a secret (content/secrets.ts) */
  | { secret: string }
  /** unlock a Japan-notebook entry (content/society.ts) */
  | { note: string }
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
  | { open: 'review' | 'dashboard' | 'diagnostic' | 'shop' | 'menu' | 'garden' | 'karaoke' | `job:${string}` | `board:${string}` | `alltag:${string}` }
  | { chapter: number }
  /** switch the music for a scene: a track key, or 'map' for the current map's track (memory ends with the scene) */
  | { music: string }
  /** the bus pulls up at this map's stop, or (before a warp) drives off from the stop on the next map */
  | { bus: 'arrive' | 'leave' }
  /** the train ride scene (call before the warp to the other station) */
  | { train: 'local' | 'shinkansen' };

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
  | { shop: string[] }
  /** a short check of studied items that must be passed (the ticket check at the station gates) */
  | { check: 'ticket' }
  /** a line that is first only heard (spoken), then the player picks what it meant, then it is shown */
  | { hear: { text: string; en: string; who?: string; voice?: 'f' | 'm'; options: string[]; answer: number } }
  /** the player puts a sentence together from blocks (given in the right order, shown shuffled) */
  | { build: { chunks: string[]; en: string } }
  /** small talk with a person (core/social.ts), built when it is reached */
  | { talk: string }
  /** pick a gift from the bag for this person */
  | { gift: string }
  /** a little scene in the world while the dialogue waits: people walk, turn, show feelings; the camera moves */
  | { stage: StageCmd[] }
  /** a person or a thing asks about an item learned with them (core/recall.ts) */
  | { recall: { key: string; who: string } }
  /** a word of the line just shown, met earlier, has to be understood before the story goes on (ui/Understand.tsx) */
  | { understand: { key: string; surface: string; line: string; en?: string; who?: string } };

export type Emote = 'alert' | 'question' | 'heart' | 'music' | 'idea' | 'sweat' | 'dots' | 'angry' | 'sparkle' | 'sleep';
/** who: 'player' or a person's id on the current map */
export type StageCmd =
  | { emote: Emote; who?: string }
  | { walk: string; path: Dir[] }
  /** turn to a direction or towards another person */
  | { face: string; to: string }
  /** pan to a person or a tile ('back' follows the player again); zoom is relative to the normal zoom */
  | { camera: string | [number, number]; zoom?: number; ms?: number }
  | { fade: 'out' | 'in'; ms?: number }
  | { shake: number }
  | { flash: true }
  | { wait: number };

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
  if (c.count && (Number(s.flags[c.count[0]]) || 0) < c.count[1]) return false;
  if (c.notYearFlag && s.flags[`${c.notYearFlag}_${new Date().getFullYear()}`]) return false;
  if (c.date) {
    const d = new Date();
    if (!c.date.includes(`${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)) return false;
  }
  if (c.hours) {
    const h = new Date().getHours();
    const [a, b] = c.hours;
    if (a <= b ? h < a || h >= b : h < a && h >= b) return false;
  }
  if (c.months && !c.months.includes(new Date().getMonth() + 1)) return false;
  if (c.name && !c.name.includes(s.playerName.trim())) return false;
  if (c.chance !== undefined && Math.random() >= c.chance) return false;
  return true;
}

export function pickRule(s: GameState, rules: DialogueRule[]): Step[] | null {
  for (const r of rules) if (check(s, r.when)) return r.steps;
  return null;
}
