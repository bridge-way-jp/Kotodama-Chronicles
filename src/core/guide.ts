import type { Step } from './script';
import { check, pickRule } from './script';
import type { GameState } from './types';
import { MAPS } from '../content/maps';
import { QUESTS } from '../content/quests';
import { SCRIPTS } from '../content/scripts';

/** true if these steps advance a quest (start it or complete an objective) */
export function advancesQuest(steps: Step[]): boolean {
  return steps.some((st) => {
    if ('do' in st) return st.do.some((a) => 'objective' in a || 'startQuest' in a || 'recruit' in a);
    if ('choice' in st) return st.choice.some((c) => c.then && advancesQuest(c.then));
    if ('if' in st) return advancesQuest(st.then) || (!!st.else && advancesQuest(st.else));
    if ('battle' in st) return true;
    return false;
  });
}

// which script completes an objective ("mq23.fujita" -> ["fujita"]), and where scripts stand in the world
let completers: Map<string, Set<string>> | null = null;
let placements: Map<string, { map: string; npc: boolean; when?: any }[]> | null = null;

function build() {
  completers = new Map();
  const scan = (key: string, x: any) => {
    if (!x || typeof x !== 'object') return;
    if (Array.isArray(x)) return x.forEach((e) => scan(key, e));
    if (typeof x.objective === 'string') {
      if (!completers!.has(x.objective)) completers!.set(x.objective, new Set());
      completers!.get(x.objective)!.add(key);
    }
    for (const v of Object.values(x)) scan(key, v);
  };
  for (const [k, rules] of Object.entries(SCRIPTS)) scan(k, rules);
  placements = new Map();
  const add = (k: string, p: { map: string; npc: boolean; when?: any }) => {
    if (!placements!.has(k)) placements!.set(k, []);
    placements!.get(k)!.push(p);
  };
  for (const m of Object.values(MAPS)) {
    for (const n of m.npcs) add(n.id, { map: m.id, npc: true, when: n.when });
    for (const o of m.objects) add(o.script ?? o.id, { map: m.id, npc: false, when: o.when });
  }
}

/** the outdoor map whose door leads into this map (itself, if it is outdoors) */
export function outdoorOf(mapId: string): string {
  const m = MAPS[mapId];
  if (!m?.interior) return mapId;
  for (const o of Object.values(MAPS)) if (!o.interior && o.warps.some((w) => w.to.map === mapId)) return o.id;
  return mapId;
}

const REGIONS: [RegExp, string, string][] = [
  [/^k_/, '京都', 'Kyoto'],
  [/^o_/, '大阪', 'Osaka'],
  [/^t_/, '東京', 'Tokyo'],
  [/^(town|forest)$/, '日野森', 'Hinomori'],
  [/^valley$/, '日野森の谷', 'Hinomori valley'],
  [/^mountain$/, '雪見村', 'Yukimi'],
  [/^harbor$/, '潮見町', 'Shiomi'],
];
export function regionOf(mapId: string): string {
  const o = outdoorOf(mapId);
  return REGIONS.find(([re]) => re.test(o))?.[2] ?? o;
}

export interface Guide {
  ja: string;
  en: string;
  /** the map the next step happens in */
  map: string;
  /** true if it is in another region: take a train or bus first */
  far: boolean;
}

/** where the next step of a quest is: the first open objective, and the place whose scene would complete it now */
export function guideFor(s: GameState, questId: string, current: string): Guide | null {
  const q = s.quests[questId];
  const def = QUESTS[questId];
  if (!q || !def || q.status !== 'active') return null;
  const obj = def.objectives.find((o) => !q.objectives[o.id]);
  if (!obj) return null;
  if (!completers) build();
  const keys = [...(completers!.get(`${questId}.${obj.id}`) ?? [])];
  const options = keys.flatMap((k) => (placements!.get(k) ?? []).filter((p) => check(s, p.when)).map((p) => ({ ...p, key: k })));
  if (!options.length) return null;
  // prefer a place whose scene would advance the quest right now (the earlier steps are done), then one on this map
  const ready = options.filter((p) => {
    const rules = SCRIPTS[p.key];
    const steps = rules ? pickRule(s, rules) : null;
    return !!steps && advancesQuest(steps);
  });
  const pool = ready.length ? ready : options;
  const best = pool.find((p) => outdoorOf(p.map) === outdoorOf(current)) ?? pool[0];
  const out = MAPS[outdoorOf(best.map)];
  const room = best.map !== out.id ? MAPS[best.map] : null;
  return {
    ja: room ? `${out.nameJa} › ${room.nameJa}` : out.nameJa,
    en: room ? `${out.name} › ${room.name}` : out.name,
    map: best.map,
    far: regionOf(best.map) !== regionOf(current),
  };
}

/** does any scene in this room advance a quest right now? (shown as a "!" above the door that leads in) */
export function roomHasQuestScene(s: GameState, roomId: string): boolean {
  const m = MAPS[roomId];
  if (!m) return false;
  const hit = (key: string, when?: any) => {
    if (!check(s, when)) return false;
    const rules = SCRIPTS[key];
    const steps = rules ? pickRule(s, rules) : null;
    return !!steps && advancesQuest(steps);
  };
  return m.npcs.some((n) => hit(n.id, n.when)) || m.objects.some((o) => !o.decor && hit(o.script ?? o.id, o.when));
}
