/**
 * Writes a save state from a headless autopilot (as in tests/playthrough.test.ts) that stops when a given main quest
 * becomes active — for play-testing a chapter from its start in the browser.
 *   npx vite-node tools/autopilot_state.mts <questId> <out.json>
 */
import fs from 'node:fs';
import { createInitialState } from '../src/core/store';
import { runAction, addCreature, healTeam } from '../src/core/game';
import { check, pickRule, type Step } from '../src/core/script';
import { SCRIPTS } from '../src/content/scripts';
import type { GameState } from '../src/core/types';

const [stop, out] = process.argv.slice(-2);
function play(s: GameState, steps: Step[], pass: number) {
  for (const st of steps) {
    if (s.quests[stop]) return;
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
const s = createInitialState('マリア');
s.flags.intro_done = true;
for (let r = 0; r < 60 && !s.quests[stop]; r++) for (const k of Object.keys(SCRIPTS)) { if (s.quests[stop]) break; const steps = pickRule(s, SCRIPTS[k]); if (steps) play(s, steps, r); }
healTeam(s);
// the player stands in front of the apartment, where the chapters begin
s.map = 'town';
s.pos = { x: 6, y: 18 };
fs.writeFileSync(out, JSON.stringify(s));
console.log(stop, !!s.quests[stop], 'chapter', s.chapter, 'map', s.map, 'team', s.team.length, 'cards', Object.keys(s.cards).length);
