import { describe, expect, it } from 'vitest';
import { createInitialState } from '../src/core/store';
import { newCard } from '../src/core/srs';
import { runAction } from '../src/core/game';
import { VOCAB } from '../src/content/vocab';
import { ITEMS } from '../src/content/creatures';
import { MAPS } from '../src/content/maps';
import { bringChoice, finishRequest, requestDone, todayRequests } from '../src/core/daily';
import { MILESTONES, checkMilestones, rollWeek, thisWeek, weekKey } from '../src/core/progress';
import { socialMenu } from '../src/core/social';
import type { GameState } from '../src/core/types';

const learn = (s: GameState, n: number) => {
  for (const v of VOCAB.slice(0, n)) s.cards['v:' + v.id] = { ...newCard('v:' + v.id), introduced: true };
};

describe('daily requests', () => {
  it('nothing to ask in a fresh game, then word, review and bring requests, fixed for the day', () => {
    const s = createInitialState('T');
    expect(todayRequests(s, 20261022)).toEqual([]);
    learn(s, 5);
    for (const id of ['mori', 'haruto', 'hana', 'kaede']) s.relationships[id] = { points: 0, memories: [] };
    s.map = 'town';
    const list = todayRequests(s, 20261022);
    expect(list.map((q) => q.kind)).toEqual(['word', 'review', 'bring']);
    expect(todayRequests(s, 20261022)).toEqual(list);
    const bring = list.find((q) => q.kind === 'bring')!;
    expect(ITEMS[bring.item!]).toBeTruthy();
    expect(MAPS[bring.map!]).toBeTruthy();
    expect(new Set(list.map((q) => q.who)).size).toBe(3);
  });

  it('a request pays once; the person you bring something to gets a choice for it', () => {
    const s = createInitialState('T');
    learn(s, 5);
    for (const id of ['mori', 'haruto', 'hana', 'kaede']) s.relationships[id] = { points: 0, memories: [] };
    s.map = 'town';
    const list = todayRequests(s);
    const word = list[0];
    const money = s.money;
    finishRequest(s, word);
    finishRequest(s, word);
    expect(requestDone(s, word)).toBe(true);
    expect(s.money).toBe(money + 150);
    expect(s.relationships[word.who].points).toBe(1);
    const bring = list.find((q) => q.kind === 'bring');
    if (!bring) return;
    expect(bringChoice(s, bring.who)).toBeNull();
    s.inventory[bring.item!] = 1;
    const c = bringChoice(s, bring.who)!;
    expect(JSON.stringify(socialMenu(s, bring.who))).toContain(c.text);
    for (const st of c.then) if ('do' in st) st.do.forEach((a) => runAction(s, a));
    expect(requestDone(s, bring)).toBe(true);
    expect(s.inventory[bring.item!] ?? 0).toBe(0);
    expect(bringChoice(s, bring.who)).toBeNull();
  });
});

describe('room rewards and weekly progress', () => {
  it('milestones use real deco items and put them in the room once', () => {
    for (const m of MILESTONES) expect(ITEMS[m.deco]?.kind, m.deco).toBe('deco');
    const s = createInitialState('T');
    expect(checkMilestones(s)).toEqual([]);
    learn(s, 12);
    expect(checkMilestones(s).map((m) => m.id)).toEqual(['words10']);
    expect(s.inventory.deco_cactus).toBe(1);
    expect(checkMilestones(s)).toEqual([]);
  });

  it('a new week starts a snapshot and keeps a review of the past one', () => {
    const s = createInitialState('T');
    const mon = new Date(2026, 9, 19, 10).getTime();
    expect(weekKey(mon)).toBe(20261019);
    expect(weekKey(new Date(2026, 9, 25, 22).getTime())).toBe(20261019);
    expect(rollWeek(s, mon)).toBe(false);
    learn(s, 8);
    s.skills.vocab.total += 30;
    expect(thisWeek(s, mon)!.words).toBe(8);
    expect(rollWeek(s, mon + 86400000)).toBe(false);
    expect(rollWeek(s, mon + 7 * 86400000)).toBe(true);
    expect(s.week!.review!.to.words - s.week!.review!.from.words).toBe(8);
    expect(thisWeek(s, mon + 7 * 86400000)!.words).toBe(0);
    // a quiet week brings no review
    expect(rollWeek(s, mon + 14 * 86400000)).toBe(false);
  });
});
