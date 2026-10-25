import type { GameState } from './types';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

/**
 * The month of the game world. The first chapters have the season their pictures and lines speak of: chapter 1
 * ("Spring in Hinomori") April, chapter 2 (the peach harvest in the valley) July, chapter 3 (the letter from the
 * snow village) January. From chapter 4 on the world follows the real calendar.
 */
const CHAPTER_MONTH: Record<number, number> = { 1: 4, 2: 7, 3: 1 };
export function worldMonth(s?: GameState | null, now = new Date()): number {
  const fixed = s ? CHAPTER_MONTH[s.chapter ?? 1] : undefined;
  return fixed ?? now.getMonth() + 1;
}

export function worldSeason(s?: GameState | null, now = new Date()): Season {
  const m = worldMonth(s, now);
  return m >= 3 && m <= 5 ? 'spring' : m >= 6 && m <= 8 ? 'summer' : m >= 9 && m <= 11 ? 'autumn' : 'winter';
}
