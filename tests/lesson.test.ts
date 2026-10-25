import { describe, expect, it } from 'vitest';

describe('story lessons', () => {
  it('every chapter teaches something new, taking turns between grammar and words; quest goals carry a lesson', async () => {
    const { readFileSync } = await import('node:fs');
    const { registerCurriculum } = await import('../src/core/curriculum');
    const { createInitialState } = await import('../src/core/store');
    const { lessonKey, lessonSteps, reachesGoal } = await import('../src/core/lesson');
    const { SCRIPTS } = await import('../src/content/scripts');
    registerCurriculum(JSON.parse(readFileSync('public/data/jlpt.json', 'utf8')));
    for (let ch = 1; ch <= 7; ch++) {
      const s = createInitialState('T');
      s.chapter = ch;
      expect(lessonKey(s)?.startsWith('g:'), `chapter ${ch}`).toBe(true);
      s.flags.lesson_n = 1;
      expect(lessonKey(s)?.startsWith('v:'), `chapter ${ch}`).toBe(true);
    }
    const steps = lessonSteps(createInitialState('T'));
    expect(steps.some((x) => 'teach' in x)).toBe(true);
    expect(steps.some((x) => 'check' in x)).toBe(false);
    const goals = Object.values(SCRIPTS).flat().filter((r) => reachesGoal(r.steps));
    expect(goals.length).toBeGreaterThan(30);
  });
});
