import { MAPS, BLOCKING } from '../src/content/maps.ts';
const res = {};
for (const m of Object.values(MAPS)) {
  if (!m.image) continue;
  const g = m.tiles.map((r) => [...r].map((c) => (BLOCKING.has(c) ? '#' : '.')));
  for (const o of m.objects) if (o.solid !== false && (o.w ?? 1) > 0) for (let y = o.y; y < o.y + (o.h ?? 1); y++) for (let x = o.x; x < o.x + (o.w ?? 1); x++) if (g[y]?.[x] === '.') g[y][x] = 'o';
  for (const n of m.npcs) g[n.y][n.x] = 'N';
  for (const w of m.warps) g[w.y][w.x] = 'D';
  res[m.id] = { image: m.image, grid: g.map((r) => r.join('')) };
}
console.log(JSON.stringify(res));
