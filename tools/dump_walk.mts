import { MAPS, BLOCKING } from '../src/content/maps';
import { SCRIPTS } from '../src/content/scripts';
import { writeFileSync } from 'node:fs';
import { BORDER_GEN } from '../src/content/border.gen';
// the outdoor maps without the edge barriers of tools/build_edges.py, for that tool and for walk checks
const entries: Record<string, [number, number][]> = {};
const addE = (m: string, x: number, y: number) => (entries[m] ??= []).push([x, y]);
for (const m of Object.values(MAPS)) for (const w of m.warps) addE(w.to.map, w.to.x, w.to.y);
const scan = (x: any) => { if (!x || typeof x !== 'object') return; if (Array.isArray(x)) return x.forEach(scan); if (x.warp?.map) addE(x.warp.map, x.warp.x, x.warp.y); Object.values(x).forEach(scan); };
for (const r of Object.values(SCRIPTS)) scan(r);
const out: any = {};
for (const m of Object.values(MAPS)) {
  if (m.interior || !m.image) continue;
  const solid = m.tiles.map((row, y) => [...row].map((c, x) => BLOCKING.has(c) ? 1 : 0));
  // raw: the border tiles of tools/build_border.py open again (its own input)
  if (process.argv[3] === 'raw') for (const [x, y] of BORDER_GEN[m.id] ?? []) solid[y][x] = 0;
  for (const o of m.objects) if (o.solid !== false && (o.w ?? 1) > 0 && !o.when && !o.id.includes('_edge')) for (let y = o.y; y < o.y + (o.h ?? 1); y++) for (let x = o.x; x < o.x + (o.w ?? 1); x++) if (solid[y]?.[x] === 0) solid[y][x] = o.decor ? 3 : 2;
  for (const n of m.npcs) if (!n.when && solid[n.y]) solid[n.y][n.x] = 4;
  out[m.id] = { image: m.image, solid, warps: m.warps.map((w) => [w.x, w.y, w.to.map]), entries: entries[m.id] ?? [], name: m.name };
}
writeFileSync(process.argv[2], JSON.stringify(out));
console.log(Object.keys(out).join(' '));
