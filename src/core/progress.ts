import type { GameState } from './types';
import { ITEMS } from '../content/creatures';
import { HEART_EVENTS } from '../content/social';
import { readiness } from './readiness';
import { mastery } from './srs';
import { streakDays } from './learning';
import { hearts } from './social';
import { toast } from './events';

/**
 * Visible progress: learning milestones that put something new in your room, and a weekly snapshot so the game
 * can show what changed this week (and a short review on the first visit of a new week).
 */

const studied = (s: GameState, p: string) => Object.values(s.cards).filter((c) => c.introduced && c.key.startsWith(p)).length;
const matured = (s: GameState) => Object.values(s.cards).filter((c) => mastery(c) === 'mature').length;
const heartsDone = (s: GameState) => Object.keys(HEART_EVENTS).filter((id) => s.flags['heart_' + id]).length;
const friends = (s: GameState) => Object.keys(s.relationships).filter((id) => hearts(s, id) >= 3).length;

export interface Milestone {
  id: string;
  deco: string;
  ja: string;
  en: string;
  /** progress towards it: [have, need] */
  progress: (s: GameState) => [number, number];
}

const m = (id: string, deco: string, ja: string, en: string, need: number, have: (s: GameState) => number): Milestone => ({ id, deco, ja, en, progress: (s) => [Math.min(need, have(s)), need] });

export const MILESTONES: Milestone[] = [
  m('words10', 'deco_cactus', '言葉を10個学んだ', 'Learn 10 words', 10, (s) => studied(s, 'v:')),
  m('streak3', 'deco_furin', '3日連続で目標達成', 'Reach the daily goal 3 days in a row', 3, (s) => Number(s.flags.streak_best ?? 0)),
  m('words50', 'deco_books', '言葉を50個学んだ', 'Learn 50 words', 50, (s) => studied(s, 'v:')),
  m('heart1', 'deco_cushion', '初めて誰かと仲良くなった', 'Become close to someone (a ♥ talk)', 1, heartsDone),
  m('kanji30', 'deco_lamp', '漢字を30個学んだ', 'Learn 30 kanji', 30, (s) => studied(s, 'k:')),
  m('grammar15', 'deco_lights', '文法を15個学んだ', 'Learn 15 grammar points', 15, (s) => studied(s, 'g:')),
  m('requests10', 'deco_poster', 'お願いを10回かなえた', 'Fulfil 10 requests', 10, (s) => Number(s.flags.req_done ?? 0)),
  m('streak7', 'deco_manekineko', '7日連続で目標達成', 'Reach the daily goal 7 days in a row', 7, (s) => Number(s.flags.streak_best ?? 0)),
  m('words100', 'deco_shelf', '言葉を100個学んだ', 'Learn 100 words', 100, (s) => studied(s, 'v:')),
  m('mature30', 'deco_bonsai', '30個がしっかり定着した', 'Get 30 items firmly remembered', 30, matured),
  m('friends3', 'deco_beanbag', '3人と仲良し（♥3）', 'Three friends with ♥3', 3, friends),
  m('words250', 'deco_worldmap', '言葉を250個学んだ', 'Learn 250 words', 250, (s) => studied(s, 'v:')),
  m('streak30', 'deco_aquarium', '30日連続で目標達成', 'Reach the daily goal 30 days in a row', 30, (s) => Number(s.flags.streak_best ?? 0)),
  m('mature150', 'deco_tv', '150個がしっかり定着した', 'Get 150 items firmly remembered', 150, matured),
];

export const reached = (s: GameState, ms: Milestone) => !!s.flags['ms_' + ms.id];

/** marks newly reached milestones and puts their item in the room (or pays its price when you bought it already) */
export function checkMilestones(s: GameState): Milestone[] {
  const out: Milestone[] = [];
  for (const ms of MILESTONES) {
    if (reached(s, ms)) continue;
    const [have, need] = ms.progress(s);
    if (have < need) continue;
    s.flags['ms_' + ms.id] = true;
    const it = ITEMS[ms.deco];
    if (s.inventory[ms.deco]) s.money += it.price ?? 500;
    else s.inventory[ms.deco] = 1;
    out.push(ms);
    toast(`🏠 ${ms.ja}！ 部屋に「${it.name}」が届いた`, 'level');
  }
  return out;
}

// ------------------------------------------------------------------
// weekly progress

export interface Snapshot {
  t: number;
  /** readiness 0..1000 */
  ready: number;
  words: number;
  kanji: number;
  grammar: number;
  answers: number;
  goalDays: number;
  requests: number;
  streak: number;
}

export function snapshot(s: GameState, now = Date.now()): Snapshot {
  return {
    t: now,
    ready: Math.round(readiness(s).overall * 1000),
    words: studied(s, 'v:'),
    kanji: studied(s, 'k:'),
    grammar: studied(s, 'g:'),
    answers: Object.values(s.skills).reduce((a, b) => a + b.total, 0),
    goalDays: Number(s.flags.goal_days ?? 0),
    requests: Number(s.flags.req_done ?? 0),
    streak: streakDays(s, now),
  };
}

/** the Monday of the week as yyyymmdd */
export function weekKey(now = Date.now()): number {
  const d = new Date(now);
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

/** starts a new week when the calendar week changed; the past week's change becomes the review to show */
export function rollWeek(s: GameState, now = Date.now()): boolean {
  const key = weekKey(now);
  if (!s.week) {
    s.week = { key, start: snapshot(s, now) };
    return false;
  }
  if (s.week.key === key) return false;
  const to = snapshot(s, now);
  const from = s.week.start;
  const active = to.answers > from.answers;
  s.week = { key, start: to, review: active ? { from, to } : undefined };
  return active;
}

export type Delta = Record<Exclude<keyof Snapshot, 't'>, number>;
export function delta(from: Snapshot, to: Snapshot): Delta {
  return {
    ready: to.ready - from.ready,
    words: to.words - from.words,
    kanji: to.kanji - from.kanji,
    grammar: to.grammar - from.grammar,
    answers: to.answers - from.answers,
    goalDays: to.goalDays - from.goalDays,
    requests: to.requests - from.requests,
    streak: to.streak,
  };
}

/** what changed since the start of this week */
export function thisWeek(s: GameState, now = Date.now()): Delta | null {
  return s.week ? delta(s.week.start, snapshot(s, now)) : null;
}
