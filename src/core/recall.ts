import { SCRIPTS } from '../content/scripts';
import { MAPS } from '../content/maps';
import { NPCS } from '../content/npcs';
import { KANJI_BY_ID } from '../content/kanji';
import { isDue, mastery, strength } from './srs';
import { exerciseFor, shuffle, type Exercise } from './learning';
import { markupOf, type Origin } from './memory';
import type { Step } from './script';
import type { GameState } from './types';

/**
 * Memories in the world. Every item can tell where it was met (the card's origin, or, for items met before origins
 * were kept, the first script line that teaches it). The people and things of a place then ask about what was
 * learned with them when it is due again — recalling a word where and from whom it was heard — and every place keeps
 * the words learned there (the memory palace in the notebook).
 */

/** a memory from the scripts: the script (a person or a thing), its map and the line */
export interface StaticOrigin {
  script: string;
  map: string;
  who?: string;
  line: string;
  en?: string;
}

let index: Map<string, StaticOrigin> | null = null;

/** script id -> the map it is on (people by id, things by their script) */
function scriptMaps(): Map<string, string> {
  const m = new Map<string, string>();
  for (const map of Object.values(MAPS)) {
    for (const n of map.npcs) if (!m.has(n.id)) m.set(n.id, map.id);
    for (const o of map.objects) {
      const id = o.script ?? o.id;
      if (!m.has(id)) m.set(id, map.id);
    }
  }
  return m;
}

function buildIndex(): Map<string, StaticOrigin> {
  const out = new Map<string, StaticOrigin>();
  const where = scriptMaps();
  for (const [script, rules] of Object.entries(SCRIPTS)) {
    const map = where.get(script);
    if (!map) continue;
    let last: { who?: string; line: string; en?: string } | null = null;
    const put = (key: string, l: { who?: string; line: string; en?: string } | null) => {
      if (l && !out.has(key)) out.set(key, { script, map, ...l });
    };
    const walk = (steps: Step[]) => {
      for (const st of steps as any[]) {
        if (!st || typeof st !== 'object') continue;
        const line = typeof st.say === 'string' ? st.say : null;
        if (line) {
          last = { who: st.who, line, en: st.en };
          for (const mm of line.matchAll(/\|([vgk]:[a-z_0-9]+)\}/g)) put(mm[1], last);
        }
        if (st.teach) put(st.teach, last);
        for (const a of st.do ?? []) if (a.learn) for (const k of a.learn) put(k, last);
        for (const c of st.choice ?? []) if (c.then) walk(c.then);
        for (const k of ['then', 'else', 'win', 'lose'] as const) if (Array.isArray(st[k])) walk(st[k]);
      }
    };
    for (const r of rules) walk(r.steps);
  }
  return out;
}

export function staticOrigin(key: string): StaticOrigin | undefined {
  index ??= buildIndex();
  const hit = index.get(key);
  if (hit || !key.startsWith('k:')) return hit;
  // a kanji is remembered through the first of its words that has a memory
  for (const w of KANJI_BY_ID[key.slice(2)]?.words ?? []) {
    const o = index.get('v:' + w);
    if (o) return o;
  }
  return undefined;
}

/** where an item was met: the card's own memory, else the scripts' */
export function originOf(s: GameState, key: string): (Origin & { script?: string }) | undefined {
  const own = s.cards[key]?.origin;
  if (own) return own;
  const st = staticOrigin(key);
  return st ? { ...st, day: 0, t: 0 } : undefined;
}

export function placeName(map: string): string {
  return MAPS[map]?.nameJa ?? map;
}
export function placeNameEn(map: string): string {
  return MAPS[map]?.name ?? map;
}
export function speakerName(who?: string): string | undefined {
  return who ? NPCS[who]?.name : undefined;
}

/** studied items (not just seen) */
const studied = (s: GameState, key: string) => !!s.cards[key]?.introduced;

/** items whose memory belongs to this person or thing (a script id) */
function itemsOf(s: GameState, script: string): string[] {
  const out: string[] = [];
  for (const key of Object.keys(s.cards)) {
    const o = originOf(s, key);
    if (!o) continue;
    if (o.who === script || (o as { script?: string }).script === script) out.push(key);
  }
  return out;
}

export const ECHOES_PER_DAY = 12;

/**
 * The item a person or a thing asks about now: one learned with them that is due (or keeps slipping), or one only
 * heard from them so far (the first time it is actively recalled is with them), at most once a
 * day for each of them and a few a day in all. Null when there is nothing to ask.
 */
export function echoFor(s: GameState, script: string, now = Date.now()): string | null {
  if (s.settings.echoes === false) return null;
  if (s.flags['echo_' + script] === s.day) return null;
  if (s.flags.echo_day === s.day && Number(s.flags.echo_n ?? 0) >= ECHOES_PER_DAY) return null;
  const cands = itemsOf(s, script).filter((k) => {
    const c = s.cards[k];
    if (studied(s, k)) return isDue(c, now) || mastery(c) === 'struggling';
    // only heard so far: asked about it the next time (another day, or an hour later), the first time it is recalled
    return c.origin ? c.origin.day < s.day || now - c.origin.t > 3600_000 : now - c.firstSeen > 3600_000;
  });
  if (!cands.length) return null;
  // the most overdue first (heard-only items count as due since they were heard)
  const when = (k: string) => (studied(s, k) ? s.cards[k].due : s.cards[k].firstSeen);
  cands.sort((a, b) => when(a) - when(b));
  return cands[0];
}

/** count an echo (once a day per person or thing) */
export function markEcho(s: GameState, script: string) {
  s.flags['echo_' + script] = s.day;
  if (s.flags.echo_day !== s.day) {
    s.flags.echo_day = s.day;
    s.flags.echo_n = 0;
  }
  s.flags.echo_n = Number(s.flags.echo_n ?? 0) + 1;
}

export interface Place {
  map: string;
  keys: string[];
  due: number;
  strong: number;
}

/** the memory palace: the places and the items met there (only items that were met at all) */
export function palace(s: GameState, now = Date.now()): Place[] {
  const by = new Map<string, Place>();
  for (const key of Object.keys(s.cards)) {
    const o = originOf(s, key);
    if (!o || !MAPS[o.map]) continue;
    const p = by.get(o.map) ?? { map: o.map, keys: [], due: 0, strong: 0 };
    p.keys.push(key);
    const c = s.cards[key];
    if (studied(s, key) && isDue(c, now)) p.due++;
    if (['young', 'mature'].includes(mastery(c))) p.strong++;
    by.set(o.map, p);
  }
  return [...by.values()].sort((a, b) => b.due - a.due || b.keys.length - a.keys.length);
}

/** the studied items of a place that are due now */
export function dueHere(s: GameState, map: string, now = Date.now()): string[] {
  return (palace(s, now).find((p) => p.map === map)?.keys ?? []).filter((k) => studied(s, k) && isDue(s.cards[k], now));
}

/** the word itself, marked in a memory line */
export function highlight(line: string, key: string): string {
  return line.replace(markupOf(key), (m) => `【${m}】`);
}

/** a review of one place: its due items first, then its weakest studied ones */
export function placeSession(s: GameState, map: string, size = 10, now = Date.now()): Exercise[] {
  const keys = (palace(s, now).find((p) => p.map === map)?.keys ?? []).filter((k) => studied(s, k));
  const due = keys.filter((k) => isDue(s.cards[k], now)).sort((a, b) => s.cards[a].due - s.cards[b].due);
  const rest = keys.filter((k) => !due.includes(k)).sort((a, b) => strength(s.cards[a]) - strength(s.cards[b]));
  return shuffle([...due, ...rest].slice(0, size)).map((k) => exerciseFor(s, k));
}
