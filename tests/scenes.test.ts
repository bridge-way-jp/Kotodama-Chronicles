import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { SCRIPTS } from '../src/content/scripts';
import { DREAMS, HEART_PICTURES, SEASONS, sleepScenes } from '../src/content/scenes';
import { HEART_EVENTS } from '../src/content/social';
import { createInitialState } from '../src/core/store';
import { check, type Step } from '../src/core/script';
import { worldMonth, worldSeason } from '../src/core/season';

/** the steps a script plays for this state: `if` steps resolved */
const play = (s: ReturnType<typeof createInitialState>, steps: Step[]): Step[] =>
  steps.flatMap((st: any) => ('if' in st ? play(s, check(s, st.if) ? st.then : (st.else ?? [])) : [st]));

describe('story pictures and scenes', () => {
  it('every picture a script shows exists', () => {
    const cgs = new Set([...JSON.stringify(SCRIPTS).matchAll(/"cg":"([^"]+)"/g)].map((m) => m[1]));
    for (const id of Object.keys(HEART_PICTURES)) cgs.add(`cg_heart_${id}`);
    expect(cgs.size).toBeGreaterThan(50);
    expect([...cgs].filter((c) => !existsSync(`public/assets/${c}.webp`))).toEqual([]);
    for (const id of Object.keys(HEART_PICTURES)) expect(HEART_EVENTS[id], id).toBeTruthy();
  });

  it('sleeping at home brings the next dream after a chapter, else the season once a year', () => {
    const s = createInitialState('T');
    const cgOf = () => play(s, sleepScenes()).find((x: any) => x.cg) as any;
    // chapter 1 is spring; from chapter 2 the real calendar
    expect(worldSeason(s)).toBe('spring');
    s.chapter = 2;
    const season = SEASONS.find((x) => x.months.includes(worldMonth(s)))!;
    expect(cgOf()?.cg).toBe((season.step as any).cg);
    s.flags[`${season.id}_${new Date().getFullYear()}`] = true;
    expect(cgOf()).toBeUndefined();
    s.quests.mq9 = { id: 'mq9', status: 'done', objectives: {}, startedAt: 0 } as any;
    s.quests.mq13 = { id: 'mq13', status: 'done', objectives: {}, startedAt: 0 } as any;
    expect(cgOf()?.cg).toBe('cg_dream_letters');
    s.flags[DREAMS[0].id] = true;
    expect(cgOf()?.cg).toBe('cg_dream_snow');
  });
});
