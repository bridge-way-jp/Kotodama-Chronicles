import type { GameState } from './types';

/**
 * Where a word was met: the place, the person and the very line. Memories are kept on the card when the item is met
 * for the first time (learning.encounter), so a review can bring back the moment ("Mori said it in the kitchen")
 * and the people and places of the world can ask about it again (core/recall.ts).
 */
export interface Origin {
  map: string;
  /** the person who said it (an NPCS id), if a person said it */
  who?: string;
  /** the line (markup) */
  line: string;
  en?: string;
  /** the story picture shown with the line */
  cg?: string;
  day: number;
  t: number;
}

/** the last lines of dialogue shown, newest last (session only) */
const recent: { who?: string; line: string; en?: string; cg?: string }[] = [];

export function noteLine(who: string | undefined, line: string, en?: string, cg?: string) {
  recent.push({ who, line, en, cg });
  if (recent.length > 12) recent.shift();
}

/** the markup of the item in a line ({word|reading|v:id}) */
export const markupOf = (key: string) => new RegExp(`\\{([^|{}]+)\\|[^{}]*\\|${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\}`);

/** the moment an item is being met right now: the latest line that has it, else the line just shown */
export function captureOrigin(s: GameState, key: string, now = Date.now()): Origin | undefined {
  if (!recent.length) return undefined;
  const re = markupOf(key);
  const hit = [...recent].reverse().find((l) => re.test(l.line)) ?? recent[recent.length - 1];
  return { map: s.map, who: hit.who, line: hit.line, en: hit.en, ...(hit.cg ? { cg: hit.cg } : {}), day: s.day, t: now };
}

/** the line with the item blanked out (a cue for recalling it); null when the line does not contain it */
export function cueLine(o: Origin, key: string): string | null {
  const re = markupOf(key);
  return re.test(o.line) ? o.line.replace(re, '｛　？　｝') : null;
}

/** forget the session lines (a new game, tests) */
export function clearLines() {
  recent.length = 0;
}
