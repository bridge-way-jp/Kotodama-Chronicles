import { MAPS, BLOCKING } from '../src/content/maps.ts';
const m = MAPS[process.argv[2] ?? 'town'];
const g = m.tiles.map((r) => [...r]);
for (const o of m.objects) { if ((o.w ?? 1) === 0) continue; for (let y = o.y; y < o.y + (o.h ?? 1); y++) for (let x = o.x; x < o.x + (o.w ?? 1); x++) if (g[y]?.[x]) g[y][x] = 'O'; }
for (const n of m.npcs) g[n.y][n.x] = 'N';
for (const w of m.warps) g[w.y][w.x] = 'D';
for (const w of m.wanderers ?? []) g[w.y][w.x] = 'w';
console.log('    ' + [...Array(g[0].length).keys()].map((i) => i % 10).join(''));
console.log(g.map((r, i) => String(i).padStart(3) + ' ' + r.join('')).join('\n'));
console.log(m.objects.map((o) => `${o.id}@${o.x},${o.y} ${o.w}x${o.h}`).join('  '));
