import type { Card } from './types';

/**
 * Spaced repetition based on SM-2 (Wozniak), adapted for a game:
 *  - answers are graded from correctness + response time (no self-rating)
 *  - a failed card comes back after 10 minutes (it can reappear in later battles)
 *  - graduated intervals 1d -> 3d -> interval * ease
 *
 * Mastery is defined by demonstrated retention (interval length and recent
 * accuracy), never by mere exposure.
 */

export const MINUTE = 60_000;
export const DAY = 24 * 60 * MINUTE;
export const MIN_EASE = 1.3;

export type Grade = 0 | 3 | 4 | 5; // 0 = wrong, 3 = hard (slow), 4 = good, 5 = easy

export function newCard(key: string, now = Date.now()): Card {
  return {
    key,
    firstSeen: now,
    introduced: false,
    encounters: 0,
    reps: 0,
    lapses: 0,
    ease: 2.5,
    interval: 0,
    due: now,
    last: 0,
    isoOk: 0,
    isoFail: 0,
    ctxOk: 0,
    ctxFail: 0,
    history: [],
  };
}

export function gradeFromAnswer(ok: boolean, ms: number): Grade {
  if (!ok) return 0;
  if (ms > 20_000) return 3;
  if (ms < 4_000) return 5;
  return 4;
}

/** Apply one review to a card (mutates and returns it). */
export function review(card: Card, grade: Grade, now = Date.now()): Card {
  card.introduced = true;
  card.last = now;
  if (grade < 3) {
    card.lapses += card.reps > 0 ? 1 : 0;
    card.reps = 0;
    card.interval = 0;
    card.ease = Math.max(MIN_EASE, card.ease - 0.2);
    card.due = now + 10 * MINUTE;
    return card;
  }
  card.reps += 1;
  if (card.reps === 1) card.interval = 1;
  else if (card.reps === 2) card.interval = 3;
  else card.interval = Math.round(card.interval * card.ease * (grade === 3 ? 0.8 : 1) * 10) / 10;
  // SM-2 ease update: EF' = EF + (0.1 - (5-q)*(0.08 + (5-q)*0.02))
  const q = grade;
  card.ease = Math.max(MIN_EASE, card.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  card.interval = Math.min(card.interval, 365);
  card.due = now + card.interval * DAY;
  return card;
}

export type MasteryLevel = 'seen' | 'learning' | 'young' | 'mature' | 'struggling';

export function recentAccuracy(card: Card, n = 5): number {
  const h = card.history.slice(-n);
  if (!h.length) return 0;
  return h.filter((x) => x.ok).length / h.length;
}

export function mastery(card: Card | undefined): MasteryLevel {
  if (!card || !card.introduced || card.history.length === 0) return 'seen';
  if (card.lapses >= 3 || (card.history.length >= 4 && recentAccuracy(card) < 0.5)) return 'struggling';
  if (card.interval >= 21) return 'mature';
  if (card.interval >= 3) return 'young';
  return 'learning';
}

/** Rough retention score 0..1 used for dashboards (not a probability claim). */
export function strength(card: Card | undefined): number {
  if (!card || !card.introduced) return 0;
  const m = mastery(card);
  const base = { seen: 0, struggling: 0.15, learning: 0.3, young: 0.6, mature: 0.9 }[m];
  return Math.min(1, base + Math.min(0.1, card.interval / 300));
}

export function isDue(card: Card, now = Date.now()): boolean {
  return card.introduced && card.due <= now;
}

/** Whether contextual practice should be prioritised for this card. */
export function needsContext(card: Card): boolean {
  return card.isoOk > 0 && card.ctxFail >= card.ctxOk && card.ctxFail > 0;
}
