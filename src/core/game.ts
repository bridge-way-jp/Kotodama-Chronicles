import { QUESTS } from '../content/quests';
import { ITEMS, SPECIES } from '../content/creatures';
import { encounter, labelOfKey } from './learning';
import { toast } from './events';
import type { Action } from './script';
import type { CreatureInstance, GameState } from './types';

// ---------------- player progression ----------------

export function xpToNext(level: number): number {
  return 60 + (level - 1) * 40;
}

export function grantXp(s: GameState, amount: number) {
  if (amount <= 0) return;
  s.xp += amount;
  while (s.xp >= xpToNext(s.level)) {
    s.xp -= xpToNext(s.level);
    s.level++;
    toast(`Level up! ${s.playerName} is now Lv. ${s.level}`, 'level');
  }
}

// ---------------- creatures ----------------

export function maxHp(c: CreatureInstance): number {
  const sp = SPECIES[c.speciesId];
  return Math.round(sp.baseHp + (c.level - 1) * (sp.baseHp / 8));
}

export function attackOf(c: CreatureInstance): number {
  const sp = SPECIES[c.speciesId];
  return sp.baseAtk + (c.level - 1) * 1.5;
}

export function creatureXpToNext(level: number): number {
  return 20 + level * 12;
}

export function makeCreature(speciesId: string, level: number, where: string): CreatureInstance {
  const c: CreatureInstance = {
    uid: Math.random().toString(36).slice(2, 10),
    speciesId,
    level,
    xp: 0,
    hp: 0,
    caughtAt: Date.now(),
    caughtWhere: where,
    bond: 0,
  };
  c.hp = maxHp(c);
  return c;
}

export function addCreature(s: GameState, speciesId: string, level: number) {
  const c = makeCreature(speciesId, level, s.map);
  if (s.team.length < 4) s.team.push(c);
  else s.box.push(c);
  s.dex[speciesId] = 'caught';
  s.stats.recruited++;
  return c;
}

/** Returns evolution messages, if any. */
export function giveCreatureXp(s: GameState, c: CreatureInstance, amount: number): string[] {
  const msgs: string[] = [];
  const bonus = s.inventory.omamori ? 1.1 : 1;
  c.xp += Math.round(amount * bonus);
  while (c.xp >= creatureXpToNext(c.level)) {
    c.xp -= creatureXpToNext(c.level);
    const before = maxHp(c);
    c.level++;
    c.hp += maxHp(c) - before;
    msgs.push(`${SPECIES[c.speciesId].name} grew to Lv. ${c.level}!`);
    const evo = SPECIES[c.speciesId].evolvesTo;
    if (evo && c.level >= evo.level) {
      const from = SPECIES[c.speciesId].name;
      const ratio = c.hp / maxHp(c);
      c.speciesId = evo.species;
      c.hp = Math.max(1, Math.round(maxHp(c) * ratio));
      s.dex[evo.species] = 'caught';
      msgs.push(`${from} evolved into ${SPECIES[evo.species].name}!`);
    }
  }
  return msgs;
}

export function healTeam(s: GameState) {
  for (const c of [...s.team, ...s.box]) c.hp = maxHp(c);
}

// ---------------- quests ----------------

export function startQuest(s: GameState, id: string) {
  if (s.quests[id] || !QUESTS[id]) return;
  const def = QUESTS[id];
  s.quests[id] = {
    id,
    status: 'active',
    objectives: Object.fromEntries(def.objectives.map((o) => [o.id, false])),
    startedAt: Date.now(),
  };
  toast(`New quest: ${def.title} — ${def.titleEn}`, 'quest');
}

export function completeObjective(s: GameState, path: string) {
  const [qid, oid] = path.split('.');
  if (!s.quests[qid]) startQuest(s, qid);
  const q = s.quests[qid];
  if (!q || q.status === 'done' || q.objectives[oid]) return;
  q.objectives[oid] = true;
  const def = QUESTS[qid];
  const text = def.objectives.find((o) => o.id === oid)?.text;
  if (text) toast(`✓ ${text}`, 'quest');
  if (def.objectives.every((o) => q.objectives[o.id])) completeQuest(s, qid);
}

export function completeQuest(s: GameState, id: string) {
  const q = s.quests[id];
  const def = QUESTS[id];
  if (!q || q.status === 'done') return;
  q.status = 'done';
  q.doneAt = Date.now();
  toast(`Quest complete: ${def.title} (+${def.rewards.xp} XP)`, 'quest');
  grantXp(s, def.rewards.xp);
  for (const c of s.team) giveCreatureXp(s, c, Math.round(def.rewards.xp / 2)).forEach((m) => toast(m, 'level'));
  if (def.rewards.money) s.money += def.rewards.money;
  for (const [item, n] of Object.entries(def.rewards.items ?? {})) {
    s.inventory[item] = (s.inventory[item] ?? 0) + n;
    toast(`Received ${ITEMS[item]?.name ?? item} ×${n}`, 'item');
  }
  encounter(s, def.learning);
  if (def.onComplete) s.flags[def.onComplete] = true;
  if (def.next) startQuest(s, def.next);
}

// ---------------- actions ----------------

export interface ActionHooks {
  warp?: (map: string, x: number, y: number) => void;
  open?: (what: string) => void;
}

export function runAction(s: GameState, a: Action, hooks: ActionHooks = {}) {
  if ('flag' in a) s.flags[a.flag] = a.value ?? true;
  else if ('startQuest' in a) startQuest(s, a.startQuest);
  else if ('objective' in a) completeObjective(s, a.objective);
  else if ('give' in a) {
    s.inventory[a.give] = (s.inventory[a.give] ?? 0) + (a.n ?? 1);
    toast(`Received ${ITEMS[a.give]?.name ?? a.give}${(a.n ?? 1) > 1 ? ' ×' + a.n : ''}`, 'item');
  } else if ('take' in a) {
    s.inventory[a.take] = Math.max(0, (s.inventory[a.take] ?? 0) - (a.n ?? 1));
    if (!s.inventory[a.take]) delete s.inventory[a.take];
  } else if ('money' in a) {
    s.money += a.money;
    if (a.money > 0) toast(`+¥${a.money}`, 'item');
  } else if ('xp' in a) grantXp(s, a.xp);
  else if ('learn' in a) {
    const fresh = encounter(s, a.learn);
    if (fresh.length) toast(`New in your notebook: ${fresh.map(labelOfKey).join('、')}`, 'learn');
  } else if ('rel' in a) {
    const r = (s.relationships[a.rel] ??= { points: 0, memories: [] });
    r.points += a.points;
    if (a.memory && !r.memories.includes(a.memory)) r.memories.push(a.memory);
  } else if ('heal' in a) healTeam(s);
  else if ('sleep' in a) {
    s.day++;
    s.timeOfDay = 'morning';
    healTeam(s);
  } else if ('recruit' in a) {
    addCreature(s, a.recruit, a.level);
    toast(`${SPECIES[a.recruit].name} joined your team!`, 'level');
  } else if ('seen' in a) {
    if (!s.dex[a.seen]) s.dex[a.seen] = 'seen';
  } else if ('warp' in a) hooks.warp?.(a.warp.map, a.warp.x, a.warp.y);
  else if ('time' in a) s.timeOfDay = a.time;
  else if ('open' in a) hooks.open?.(a.open);
  else if ('chapter' in a) s.chapter = a.chapter;
}
