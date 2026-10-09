// Prints each interior's collision grid with NPC (N), warp (D) and spawn (S) markers.
import { MAPS, BLOCKING } from '../src/content/maps.ts';
for (const id of ['apartment', 'cafe', 'konbini', 'library', 'station', 'lab', 'ramen']) {
  const m = MAPS[id];
  const g = m.tiles.map((r) => [...r].map((c) => (BLOCKING.has(c) ? '#' : '.')));
  for (const o of m.objects) if (o.solid !== false && (o.w ?? 1) > 0) for (let y = o.y; y < o.y + (o.h ?? 1); y++) for (let x = o.x; x < o.x + (o.w ?? 1); x++) if (g[y]?.[x] === '.') g[y][x] = 'o';
  for (const n of m.npcs) g[n.y][n.x] = 'N';
  for (const w of m.warps) g[w.y][w.x] = 'D';
  console.log(id, m.tiles[0].length + 'x' + m.tiles.length);
  console.log(g.map((r, i) => String(i).padStart(2) + ' ' + r.join('')).join('\n'));
}
