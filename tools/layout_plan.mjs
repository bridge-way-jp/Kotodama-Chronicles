// Draws a colour-coded layout plan of an outdoor map (art/reference/layout_<map>.json),
// used as the layout reference when the ground is painted as one picture.
import { MAPS } from '../src/content/maps.ts';
import { writeFileSync } from 'node:fs';
const id = process.argv[2] ?? 'town';
const m = MAPS[id];
const objs = m.objects.filter((o) => (o.w ?? 1) > 0 && (o.h ?? 1) > 0).map((o) => ({ id: o.id, x: o.x, y: o.y, w: o.w ?? 1, h: o.h ?? 1 }));
writeFileSync(`art/reference/layout_${id}.json`, JSON.stringify({ tiles: m.tiles, objects: objs }));
console.log(id, m.tiles[0].length + 'x' + m.tiles.length, objs.length, 'objects');
