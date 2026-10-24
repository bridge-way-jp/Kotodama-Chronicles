/**
 * Walks every map the way the game does (WorldScene.blocked / tryMove / buildingAt) and checks that the world hangs
 * together: you never arrive on a blocked tile, from every arrival point you can reach the exits, doors, people and
 * things of the map, and from wherever an exit takes you there is a way back.
 *
 *   npx vite-node tools/audit_walk.mts   (prints the problems, exit code 1 if there are any); tests/walk.test.ts runs it too
 */
import { MAPS, BLOCKING, type MapDef } from '../src/content/maps';
import { SCRIPTS } from '../src/content/scripts';
import { NPCS } from '../src/content/npcs';

type P = [number, number];
const key = (x: number, y: number) => `${x},${y}`;

export interface MapReport {
  map: string;
  problems: string[];
}

/** tiles a player can stand on, the warp tiles and the building tiles that lead somewhere */
function grid(m: MapDef) {
  const H = m.tiles.length;
  const W = m.tiles[0].length;
  const npcAt = new Set(m.npcs.filter((n) => !n.when).map((n) => key(n.x, n.y)));
  const solid = (x: number, y: number) =>
    m.objects.some((o) => o.solid !== false && !o.when && (o.w ?? 1) > 0 && x >= o.x && x < o.x + (o.w ?? 1) && y >= o.y && y < o.y + (o.h ?? 1));
  const blocked = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return true;
    const painted = m.walk?.[key(x, y)];
    if (painted !== undefined) return painted === 0 || npcAt.has(key(x, y));
    return BLOCKING.has(m.tiles[y][x]) || npcAt.has(key(x, y)) || solid(x, y);
  };
  const warpAt = new Map(m.warps.map((w) => [key(w.x, w.y), w]));
  // buildings with doors: walking into any of their tiles goes in
  const doorOf = new Map<string, string>();
  for (const o of m.objects) {
    if (o.when) continue;
    const w = o.w ?? 1;
    const h = o.h ?? 1;
    const doors = m.warps.filter((wp) => wp.x >= o.x && wp.x < o.x + w && wp.y >= o.y && wp.y <= o.y + h && MAPS[wp.to.map]?.interior);
    if (!doors.length) continue;
    for (let y = o.y; y < o.y + h; y++) for (let x = o.x; x < o.x + w; x++) doorOf.set(key(x, y), doors[0].to.map);
  }
  return { H, W, blocked, warpAt, doorOf, npcAt };
}

const DIRS: P[] = [[1, 0], [-1, 0], [0, 1], [0, -1]];

/** can a player standing on one of these tiles talk to / examine something on `cells` (the game's interact: the tile ahead, or across up to two counter tiles) */
function canReach(m: MapDef, g: ReturnType<typeof grid>, stand: Set<string>, cells: Set<string>) {
  for (const k of stand) {
    const [x, y] = k.split(',').map(Number);
    for (const [dx, dy] of DIRS) {
      let tx = x + dx;
      let ty = y + dy;
      if (cells.has(key(tx, ty))) return true;
      // along the line of sight over furniture (WorldScene.interact)
      if (g.blocked(tx, ty))
        for (let i = 0; i <= 4; i++) for (const side of i ? [0, -1, 1] : [-1, 1]) if (cells.has(key(tx + dx * i + dy * side, ty + dy * i + dx * side))) return true;
      for (let i = 0; i < 2 && m.tiles[ty]?.[tx] === 'c' && !g.npcAt.has(key(tx, ty)); i++) {
        tx += dx;
        ty += dy;
      }
      if (cells.has(key(tx, ty))) return true;
    }
  }
  return false;
}

const cellsOf = (x: number, y: number, w = 1, h = 1) => {
  const s = new Set<string>();
  for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) s.add(key(i, j));
  return s;
};

/** from a start tile: the tiles you can stand on and the places you can go to */
function walkFrom(g: ReturnType<typeof grid>, start: P) {
  const seen = new Set<string>([key(...start)]);
  const goes = new Set<string>();
  const st: P[] = [start];
  while (st.length) {
    const [x, y] = st.pop()!;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx;
      const ny = y + dy;
      const k = key(nx, ny);
      const w = g.warpAt.get(k);
      if (w) {
        goes.add(w.to.map);
        continue;
      }
      if (g.blocked(nx, ny)) {
        const door = g.doorOf.get(k);
        if (door) goes.add(door);
        continue;
      }
      if (seen.has(k)) continue;
      seen.add(k);
      st.push([nx, ny]);
    }
  }
  return { seen, goes };
}

/** the places a person's or thing's script can send you to */
function scriptTargets(id: string): string[] {
  const out: string[] = [];
  const scan = (v: unknown) => {
    if (!v || typeof v !== 'object') return;
    if (Array.isArray(v)) return v.forEach(scan);
    const o = v as Record<string, any>;
    if (o.warp?.map) out.push(o.warp.map);
    if (typeof o.open === 'string' && o.open.startsWith('board:')) out.push('*board');
    Object.values(o).forEach(scan);
  };
  scan(SCRIPTS[id]);
  return out;
}

/** where scripts send you (trains, buses, story warps) and from which map */
function scriptWarps(): { from: string | null; to: string; x: number; y: number }[] {
  const owner = new Map<string, string>();
  for (const m of Object.values(MAPS)) {
    for (const n of m.npcs) if (!owner.has(n.id)) owner.set(n.id, m.id);
    for (const o of m.objects) {
      const id = (o as { script?: string }).script ?? o.id;
      if (!owner.has(id)) owner.set(id, m.id);
    }
  }
  const out: { from: string | null; to: string; x: number; y: number }[] = [];
  const scan = (v: unknown, from: string | null) => {
    if (!v || typeof v !== 'object') return;
    if (Array.isArray(v)) return v.forEach((x) => scan(x, from));
    const o = v as Record<string, any>;
    if (o.warp?.map) out.push({ from, to: o.warp.map, x: o.warp.x, y: o.warp.y });
    Object.values(o).forEach((x) => scan(x, from));
  };
  for (const [id, rules] of Object.entries(SCRIPTS)) scan(rules, owner.get(id) ?? null);
  return out;
}

export function audit(): MapReport[] {
  const arrivals = new Map<string, { at: P; from: string }[]>();
  const addA = (map: string, at: P, from: string) => (arrivals.get(map) ?? arrivals.set(map, []).get(map)!).push({ at, from });
  for (const m of Object.values(MAPS)) for (const w of m.warps) addA(w.to.map, [w.to.x, w.to.y], m.id);
  const sw = scriptWarps();
  for (const w of sw) addA(w.to, [w.x, w.y], w.from ?? '(script)');

  const reports: MapReport[] = [];
  const nodes = new Map<string, { at: P; from: string; goes: Set<string> }[]>();
  for (const m of Object.values(MAPS)) {
    const problems: string[] = [];
    const g = grid(m);
    const arr = arrivals.get(m.id) ?? [];
    // people and things that can send you somewhere (a station board, a bus stop, a story scene)
    const senders = [
      ...m.npcs.filter((n) => !n.when).map((n) => ({ cells: cellsOf(n.x, n.y), to: scriptTargets(n.id) })),
      ...m.objects.filter((o) => !o.when).map((o) => ({ cells: cellsOf(o.x, o.y, o.w ?? 1, o.h ?? 1), to: scriptTargets((o as { script?: string }).script ?? o.id) })),
    ].filter((x) => x.to.length);
    const results = arr.map((a) => {
      const r = walkFrom(g, a.at);
      for (const s of senders) if (canReach(m, g, r.seen, s.cells)) s.to.forEach((t) => r.goes.add(t));
      return { a, r };
    });
    for (const { a, r } of results) {
      const [x, y] = a.at;
      const onExit = g.warpAt.get(key(x, y));
      // coming out of a building you stand on its door; any other exit under your feet is a mistake
      if (onExit && onExit.to.map !== a.from) problems.push(`arrival ${x},${y} (from ${a.from}) is on the exit to ${onExit.to.map}`);
      else if (g.blocked(x, y)) problems.push(`arrival ${x},${y} (from ${a.from}) is blocked`);
      // the way back: the map you came from, or anywhere further by script
      // the way back: to where you came from, or (after a train or bus ride) to a station board or stop
      const back = r.goes.has(a.from) || a.from === '(script)' || (!MAPS[a.from]?.interior && r.goes.has('*board'));
      void back; // checked below, across maps
    }
    // everything on the map should be reachable from the arrivals
    const all = new Set<string>();
    const goes = new Set<string>();
    for (const { r } of results) {
      r.seen.forEach((k) => all.add(k));
      r.goes.forEach((k) => goes.add(k));
    }
    if (results.length) {
      for (const w of m.warps) if (!goes.has(w.to.map)) problems.push(`exit ${w.x},${w.y} -> ${w.to.map} cannot be reached`);
      for (const n of m.npcs) if (!n.when && NPCS[n.id] && !canReach(m, g, all, cellsOf(n.x, n.y))) problems.push(`person ${n.id} at ${n.x},${n.y} cannot be reached`);
      for (const o of m.objects) {
        const id = (o as { script?: string }).script ?? o.id;
        if (o.decor || o.when || !SCRIPTS[id] || (o.w ?? 1) === 0) continue;
        const at = (o as { interactAt?: { x: number; y: number }[] }).interactAt;
        const cells = at ? new Set(at.map((p) => key(p.x, p.y))) : cellsOf(o.x, o.y, o.w ?? 1, o.h ?? 1);
        if (![...cells].some((c) => all.has(c)) && !canReach(m, g, all, cells)) problems.push(`thing ${o.id} at ${o.x},${o.y} cannot be reached`);
      }
    }
    nodes.set(m.id, results.map(({ a, r }) => ({ at: a.at, from: a.from, goes: r.goes })));
    if (problems.length) reports.push({ map: m.id, problems: [...new Set(problems)] });
  }
  // the way back can lead through other places (out of the station square into the station hall to the board)
  const arrivalIn = (map: string, from: string) => (nodes.get(map) ?? []).filter((n) => n.from === from);
  for (const [map, list] of nodes) {
    for (const n of list) {
      if (n.from === '(script)' || n.goes.has(n.from) || (!MAPS[n.from]?.interior && n.goes.has('*board'))) continue;
      // follow the places reachable from here, each entered from the place before it
      const seen = new Set<string>();
      const queue: [string, string][] = [...n.goes].filter((t) => t !== '*board').map((t) => [t, map]);
      let ok = false;
      while (queue.length && !ok) {
        const [t, via] = queue.shift()!;
        if (t === n.from) ok = true;
        if (ok || seen.has(t + '<' + via)) continue;
        seen.add(t + '<' + via);
        for (const next of arrivalIn(t, via)) {
          if (next.goes.has('*board') || next.goes.has(n.from)) ok = true;
          next.goes.forEach((g) => g !== '*board' && queue.push([g, t]));
        }
      }
      if (!ok) {
        const r = reports.find((x) => x.map === map) ?? (reports.push({ map, problems: [] }), reports[reports.length - 1]);
        r.problems.push(`from arrival ${n.at} (from ${n.from}) there is no way back (reach: ${[...n.goes].join(' ') || 'nothing'})`);
      }
    }
  }
  return reports;
}

