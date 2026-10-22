import type { Step } from './script';
import type { GameState } from './types';
import { NPCS } from '../content/npcs';
import { ITEMS } from '../content/creatures';
import { MAPS } from '../content/maps';
import { PROFILES } from '../content/social';
import { check } from './script';
import { regionOf } from './guide';
import { dayNum, profileOf } from './social';

/**
 * Today's requests: every real day two or three people you know ask for a small favour — what a word means, a
 * short review together, or something they like brought to them (someone in the region you are in). Done from the
 * diary (word, review) or by talking to the person (bring). Each pays a little money and brings you closer.
 */

export type RequestKind = 'word' | 'review' | 'bring';
export interface DailyRequest {
  /** flag set when done */
  id: string;
  who: string;
  kind: RequestKind;
  /** the word asked about (word) */
  key?: string;
  /** what to bring (bring) */
  item?: string;
  /** where the person is (bring) */
  map?: string;
  ja: string;
  en: string;
}

export const REQUEST_REWARD = { money: 150, points: 1 } as const;
export const BRING_REWARD = { money: 250, points: 2 } as const;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** the map where a person stands right now (the first placement whose condition holds) */
export function whereIs(s: GameState, id: string): string | null {
  for (const [mid, m] of Object.entries(MAPS)) for (const p of m.npcs ?? []) if (p.id === id && check(s, p.when)) return mid;
  return null;
}

const line = (casual: boolean, polite: string, cas: string) => (casual ? cas : polite);

export function dailyRequests(s: GameState, day = dayNum()): DailyRequest[] {
  const r = rng(day * 7919);
  const shuffle = <T,>(a: T[]) => a.map((v) => [r(), v] as const).sort((x, y) => x[0] - y[0]).map(([, v]) => v);
  const known = Object.keys(s.relationships).filter((id) => profileOf(id) && PROFILES[id]).sort();
  const people = shuffle(known);
  const studied = Object.values(s.cards)
    .filter((c) => c.introduced && c.key.startsWith('v:'))
    .map((c) => c.key)
    .sort();
  const region = regionOf(s.map);
  const out: DailyRequest[] = [];
  const used = new Set<string>();
  const take = (ok: (id: string) => boolean) => {
    const id = people.find((p) => !used.has(p) && ok(p));
    if (id) used.add(id);
    return id;
  };
  if (studied.length) {
    const who = take(() => true);
    if (who) {
      const c = PROFILES[who].reg === 'casual';
      out.push({ id: `req_${day}_word`, who, kind: 'word', key: studied[Math.floor(r() * studied.length)], ja: line(c, 'ちょっと教えてもらえますか。この言葉、何でしたっけ？', 'ねえ、この言葉って何だっけ？'), en: 'Could you help me? What was this word again?' });
    }
  }
  if (studied.length >= 3) {
    const who = take(() => true);
    if (who) {
      const c = PROFILES[who].reg === 'casual';
      out.push({ id: `req_${day}_review`, who, kind: 'review', ja: line(c, '一緒に少し復習しませんか。三つだけでいいですから。', 'ちょっと一緒に復習しない？ 三つだけ！'), en: 'Shall we review a little together? Just three.' });
    }
  }
  const who = take((id) => {
    const m = whereIs(s, id);
    return !!m && regionOf(m) === region && !!(PROFILES[id].loves?.length || PROFILES[id].likes?.length);
  });
  if (who) {
    const p = PROFILES[who];
    const wants = [...(p.loves ?? []), ...(p.likes ?? [])].filter((i) => ITEMS[i]);
    const item = wants[Math.floor(r() * wants.length)];
    const name = ITEMS[item].name;
    const c = p.reg === 'casual';
    out.push({ id: `req_${day}_bring`, who, kind: 'bring', item, map: whereIs(s, who)!, ja: line(c, `${name}が欲しいんですが、もしあったら持ってきてもらえますか。`, `${name}、もしあったら持ってきてくれない？`), en: `Could you bring me something if you find it: ${ITEMS[item].nameEn.toLowerCase()}?` });
  }
  return out;
}

/** today's requests, fixed for the day once made (kinds that were not possible yet are added later) */
export function todayRequests(s: GameState, day = dayNum()): DailyRequest[] {
  const have = s.requests?.day === day ? s.requests.list : [];
  if (have.length >= 3) return have;
  const fresh = dailyRequests(s, day).filter((q) => !have.some((h) => h.kind === q.kind));
  const list = [...have, ...fresh].sort((a, b) => KINDS.indexOf(a.kind) - KINDS.indexOf(b.kind));
  if (fresh.length || s.requests?.day !== day) s.requests = { day, list };
  return list;
}
const KINDS: RequestKind[] = ['word', 'review', 'bring'];

export const requestDone = (s: GameState, q: DailyRequest) => !!s.flags[q.id];

/** the reward of a word or review request, applied once */
export function finishRequest(s: GameState, q: DailyRequest) {
  if (s.flags[q.id]) return;
  const rw = q.kind === 'bring' ? BRING_REWARD : REQUEST_REWARD;
  s.flags[q.id] = true;
  s.flags.req_done = Number(s.flags.req_done ?? 0) + 1;
  s.money += rw.money;
  const rel = (s.relationships[q.who] ??= { points: 0, memories: [] });
  rel.points += rw.points;
}

/** an extra choice in the talk menu when you have what this person asked for today */
export function bringChoice(s: GameState, id: string): { text: string; en: string; then: Step[] } | null {
  const q = todayRequests(s).find((x) => x.kind === 'bring' && x.who === id);
  if (!q || requestDone(s, q) || !(s.inventory[q.item!] > 0)) return null;
  const c = PROFILES[id]?.reg === 'casual';
  const name = ITEMS[q.item!].name;
  return {
    text: `頼まれた${name}を渡す`,
    en: `Give the ${ITEMS[q.item!].nameEn} they asked for`,
    then: [
      { say: c ? `わあ、${name}！ 覚えててくれたんだ。ありがとう！` : `まあ、${name}！ 覚えていてくださったんですね。ありがとうございます。`, who: id, en: `Oh, ${ITEMS[q.item!].nameEn}! You remembered. Thank you!`, mood: 'happy' },
      { do: [{ take: q.item! }, { flag: q.id }, { add: 'req_done' }, { money: BRING_REWARD.money }, { rel: id, points: BRING_REWARD.points }] },
      { toast: `お願い達成！ +¥${BRING_REWARD.money} · ♥` },
    ],
  };
}

export const npcName = (id: string) => NPCS[id]?.name ?? id;
