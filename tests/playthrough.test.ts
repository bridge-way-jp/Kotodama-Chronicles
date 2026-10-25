import { describe, expect, it } from 'vitest';
import { createInitialState } from '../src/core/store';
import { runAction, addCreature } from '../src/core/game';
import { check, pickRule } from '../src/core/script';
import type { Step } from '../src/core/script';
import type { GameState } from '../src/core/types';
import { SCRIPTS } from '../src/content/scripts';
import { QUESTS } from '../src/content/quests';

/**
 * A headless playthrough: a greedy autopilot talks to everything in the game (every script, in rounds) and answers
 * every question correctly, winning every battle. If the story is wired correctly it reaches the end of chapter 7.
 * It does not test the maps (the other tests do), only that the quest chain, conditions and rewards connect.
 */
function play(s: GameState, steps: Step[], pass: number) {
  for (const st of steps) {
    if ('do' in st) for (const a of st.do) runAction(s, a);
    else if ('if' in st) play(s, check(s, st.if) ? st.then : st.else ?? [], pass);
    else if ('choice' in st) {
      const real = st.choice.filter((c) => c.then);
      if (real.length) play(s, real[pass % real.length].then!, pass);
    } else if ('battle' in st) {
      if (st.battle.recruitable) addCreature(s, st.battle.species, st.battle.level);
      play(s, st.win ?? [], pass);
    } else if ('reading' in st || 'listening' in st) play(s, st.then ?? [], pass);
  }
}

describe('story playthrough', () => {
  it('a fresh game reaches the end of chapter 7 by talking to everyone', () => {
    const s = createInitialState('T');
    // the player starts with one Kotodama and can afford a few things; mimic that of a normal game
    const keys = Object.keys(SCRIPTS);
    let rounds = 0;
    for (; rounds < 60 && !s.flags.chapter7_done; rounds++) {
      const before = JSON.stringify([s.quests, s.flags, s.inventory]);
      for (const k of keys) {
        const steps = pickRule(s, SCRIPTS[k]);
        if (steps) play(s, steps, rounds);
      }
      if (JSON.stringify([s.quests, s.flags, s.inventory]) === before && rounds > 3) break;
    }
    const open = Object.values(s.quests).filter((q) => q.status === 'active').map((q) => `${q.id}: ${Object.entries(q.objectives).filter(([, v]) => !v).map(([o]) => o).join(',')}`);
    expect({ done: !!s.flags.chapter7_done, open }).toEqual({ done: true, open: expect.any(Array) });
    for (const id of ['mq1', 'mq6', 'mq10', 'mq14', 'mq18', 'mq22', 'mq26', 'mq30']) expect(s.quests[id]?.status, id).toBe('done');
    expect(Object.keys(QUESTS).filter((q) => QUESTS[q].kind === 'main' && s.quests[q]?.status !== 'done')).toEqual([]);
  });
});

describe('story scripts are reachable in the world', () => {
  it('every script that advances a quest belongs to an NPC or object that stands on a map', async () => {
    const { MAPS } = await import('../src/content/maps');
    const placed = new Set<string>();
    // only maps the player can get into (a room whose door was replaced by a hall does not count)
    const entered = new Set(Object.values(MAPS).flatMap((m) => m.warps.map((w) => w.to.map)));
    for (const m of Object.values(MAPS)) {
      if (m.interior && !entered.has(m.id)) continue;
      for (const n of m.npcs) placed.add(n.id);
      for (const o of m.objects ?? []) placed.add(o.script ?? o.id);
    }
    // scripts started from the menu, from other scripts or by hand
    const indirect = new Set(['valley_garden', 'o_door']);
    const orphan = Object.keys(SCRIPTS).filter((k) => /"objective":|"startQuest":/.test(JSON.stringify(SCRIPTS[k])) && !placed.has(k) && !indirect.has(k));
    expect(orphan).toEqual([]);
  });
});
