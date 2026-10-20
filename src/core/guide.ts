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

/** the way to another outdoor map of the same region: which exit to take next, and where it leads */
export function nextExit(from: string, to: string): { dirJa: string; dirEn: string; viaJa: string; viaEn: string; x: number; y: number } | null {
  const start = outdoorOf(from);
  const goal = outdoorOf(to);
  if (start === goal) return null;
  const prev = new Map<string, { map: string; x: number; y: number }>();
  const q = [start];
  const seen = new Set([start]);
  while (q.length) {
    const cur = q.shift()!;
    if (cur === goal) break;
    for (const w of MAPS[cur].warps) {
      const t = MAPS[w.to.map];
      if (!t || t.interior || seen.has(t.id)) continue;
      seen.add(t.id);
      prev.set(t.id, { map: cur, x: w.x, y: w.y });
      q.push(t.id);
    }
  }
  if (!prev.has(goal)) return null;
  // walk back to the first hop
  let at = goal;
  while (prev.get(at)!.map !== start) at = prev.get(at)!.map;
  const hop = prev.get(at)!;
  const m = MAPS[start];
  const W = m.tiles[0].length;
  const H = m.tiles.length;
  const dirs: [string, string][] = [];
  if (hop.y <= H * 0.2) dirs.push(['北', 'north']);
  if (hop.y >= H * 0.8) dirs.push(['南', 'south']);
  if (hop.x <= W * 0.2) dirs.push(['西', 'west']);
  if (hop.x >= W * 0.8) dirs.push(['東', 'east']);
  const d = dirs[0] ?? ['出口', 'exit'];
  return { dirJa: d[0], dirEn: d[1], viaJa: MAPS[at].nameJa, viaEn: MAPS[at].name, x: hop.x, y: hop.y };
}

export interface Guide {
  /** the way on from where you are: an exit to take, or going outside first */
  route?: string;
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
  const far = regionOf(best.map) !== regionOf(current);
  let route: string | undefined;
  if (!far && current !== best.map) {
    const here = outdoorOf(current);
    const hop = here !== out.id ? nextExit(current, best.map) : null;
    const hopText = hop ? `${hop.dirJa}の出口（${hop.dirEn}）から${hop.viaJa}へ` : '';
    if (MAPS[current].interior) route = hopText ? `まず外へ出て、${hopText}` : 'まず外へ出る';
    else if (hopText) route = hopText;
  }
  return {
    ja: room ? `${out.nameJa} › ${room.nameJa}` : out.nameJa,
    en: room ? `${out.name} › ${room.name}` : out.name,
    route,
    map: best.map,
    far,
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
