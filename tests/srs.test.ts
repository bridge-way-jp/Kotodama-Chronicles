import { describe, expect, it } from 'vitest';
import { DAY, MINUTE, mastery, newCard, review, gradeFromAnswer } from '../src/core/srs';

describe('SRS scheduler', () => {
  it('graduates intervals 1d -> 3d -> ease-multiplied', () => {
    const t = 1_000_000;
    const c = newCard('v:test', t);
    review(c, 4, t);
    expect(c.interval).toBe(1);
    expect(c.due).toBe(t + DAY);
    review(c, 4, t + DAY);
    expect(c.interval).toBe(3);
    review(c, 4, t + 4 * DAY);
    expect(c.interval).toBeCloseTo(3 * 2.5, 0);
  });

  it('a lapse resets the card and brings it back in 10 minutes', () => {
    const c = newCard('v:x', 0);
    review(c, 4, 0);
    review(c, 4, DAY);
    review(c, 0, 5 * DAY);
    expect(c.reps).toBe(0);
    expect(c.lapses).toBe(1);
    expect(c.due).toBe(5 * DAY + 10 * MINUTE);
    expect(c.ease).toBeLessThan(2.5);
  });

  it('exposure alone is not mastery', () => {
    const c = newCard('v:x', 0);
    c.encounters = 10;
    expect(mastery(c)).toBe('seen');
  });

  it('grades by correctness and speed', () => {
    expect(gradeFromAnswer(false, 1000)).toBe(0);
    expect(gradeFromAnswer(true, 2000)).toBe(5);
    expect(gradeFromAnswer(true, 8000)).toBe(4);
    expect(gradeFromAnswer(true, 30000)).toBe(3);
  });
});
