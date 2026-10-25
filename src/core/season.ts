import type { GameState } from './types';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

/**
 * The month of the game world: chapter 1 ("Spring in Hinomori") is always in April, as its pictures and lines say;
 * from chapter 2 on the world follows the real calendar.
 */
export function worldMonth(s?: GameState | null, now = new Date()): number {
  if (s && (s.chapter ?? 1) <= 1) return 4;
  return now.getMonth() + 1;
}

export function worldSeason(s?: GameState | null, now = new Date()): Season {
  const m = worldMonth(s, now);
  return m >= 3 && m <= 5 ? 'spring' : m >= 6 && m <= 8 ? 'summer' : m >= 9 && m <= 11 ? 'autumn' : 'winter';
}
