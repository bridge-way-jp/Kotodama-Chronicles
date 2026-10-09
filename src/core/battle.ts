import { MOVES, SPECIES, affinityMultiplier } from '../content/creatures';
import { attackOf, makeCreature, maxHp } from './game';
import type { CreatureInstance } from './types';

/**
 * Pure battle rules. The UI drives the turn flow; these functions compute
 * outcomes. Correct answers make moves strong; wrong answers still do a
 * little damage (the player is never stuck), and are explained afterwards.
 */

export interface BattleSetup {
  species: string;
  level: number;
  recruitable?: boolean;
  boss?: boolean;
  bg?: string;
}

export function makeEnemy(setup: BattleSetup): CreatureInstance {
  const c = makeCreature(setup.species, setup.level, 'wild');
  if (setup.boss) c.hp = Math.round(maxHp(c) * 1.3);
  return c;
}

export function enemyMaxHp(enemy: CreatureInstance, boss?: boolean) {
  return boss ? Math.round(maxHp(enemy) * 1.3) : maxHp(enemy);
}

export function playerDamage(attacker: CreatureInstance, moveId: string, defender: CreatureInstance, correct: boolean, ms: number, r = Math.random) {
  const move = MOVES[moveId];
  const aff = affinityMultiplier(move.affinity, SPECIES[defender.speciesId].affinity);
  const quality = correct ? (ms < 7000 ? 1.25 : 1) : 0.35;
  const base = (move.power * attackOf(attacker)) / 10;
  const dmg = Math.max(1, Math.round(base * aff * quality * (0.9 + r() * 0.2)));
  return { dmg, aff, critical: correct && ms < 7000 };
}

export function enemyDamage(enemy: CreatureInstance, defender: CreatureInstance, boss?: boolean, r = Math.random) {
  const sp = SPECIES[enemy.speciesId];
  const move = MOVES[sp.moves[Math.floor(r() * sp.moves.length)]];
  const aff = affinityMultiplier(move.affinity, SPECIES[defender.speciesId].affinity);
  const base = (move.power * attackOf(enemy)) / 18;
  const dmg = Math.max(1, Math.round(base * aff * (boss ? 1 : 0.85) * (0.85 + r() * 0.2)));
  return { dmg, move, aff };
}

/** Recruitment succeeds if the player answered the talk question correctly and the creature trusts them enough. */
export function recruitSucceeds(enemy: CreatureInstance, bossHpMax: number, correct: boolean, bond: number): boolean {
  if (!correct) return false;
  const ratio = enemy.hp / bossHpMax;
  return ratio <= 0.5 || bond >= 2 || (ratio <= 0.75 && bond >= 1);
}

export function xpReward(enemy: CreatureInstance, boss?: boolean) {
  return Math.round((12 + enemy.level * 6) * (boss ? 2 : 1));
}
