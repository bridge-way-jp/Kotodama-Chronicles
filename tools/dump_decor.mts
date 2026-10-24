/**
 * The outdoor maps without the decor fixes of tools/build_decor_fix.py, as its input: collision without decor,
 * exits, arrival points, people, the decor objects and the ones edited by hand (left alone).
 *   npx vite-node tools/dump_decor.mts <out.json>
 */
import { writeFileSync } from 'node:fs';
(globalThis as { __KC_RAW_DECOR__?: boolean }).__KC_RAW_DECOR__ = true;
const { MAPS, BLOCKING } = await import('../src/content/maps');
const { EDITS_BASE } = await import('../src/content/edits');
const { SCRIPTS } = await import('../src/content/scripts');
const out: Record<string, unknown> = {};
const entries: Record<string, [number, number][]> = {};
for (const m of Object.values(MAPS)) for (const w of m.warps) (entries[w.to.map] ??= []).push([w.to.x, w.to.y]);
const scan = (x: any) => { if (!x || typeof x !== 'object') return; if (Array.isArray(x)) return x.forEach(scan); if (x.warp?.map) (entries[x.warp.map] ??= []).push([x.warp.x, x.warp.y]); Object.values(x).forEach(scan); };
scan(SCRIPTS);
for (const m of Object.values(MAPS)) {
  if (m.interior || !m.image) continue;
  const e = EDITS_BASE[m.id];
  const edited = new Set([...(e?.removed ?? []), ...Object.keys(e?.moved ?? {}), ...(e?.added ?? []).map((a) => a.id)]);
  const decor = m.objects.filter((o) => o.decor && (o.w ?? 1) > 0 && !o.when && !o.id.includes('_edge'));
  const isDecor = new Set(decor.map((o) => o.id));
  const solid = m.tiles.map((row) => [...row].map((c) => (BLOCKING.has(c) ? 1 : 0)));
  for (const o of m.objects)
    if (!isDecor.has(o.id) && o.solid !== false && (o.w ?? 1) > 0 && !o.when)
      for (let y = o.y; y < o.y + (o.h ?? 1); y++) for (let x = o.x; x < o.x + (o.w ?? 1); x++) if (solid[y]?.[x] === 0) solid[y][x] = 2;
  for (const [k, v] of Object.entries(m.walk ?? {})) { const [x, y] = k.split(',').map(Number); if (solid[y]) solid[y][x] = v ? 0 : 1; }
  out[m.id] = {
    image: m.image, solid,
    warps: m.warps.map((w) => [w.x, w.y]),
    entries: entries[m.id] ?? [],
    npcs: m.npcs.filter((n) => !n.when).map((n) => [n.x, n.y]),
    things: m.objects.filter((o) => !o.decor && (o.w ?? 1) > 0 && o.solid === false).map((o) => [o.x, o.y, o.w ?? 1, o.h ?? 1]),
    decor: decor.map((o) => ({ id: o.id, sprite: o.sprite, x: o.x, y: o.y, w: o.w ?? 1, h: o.h ?? 1, solid: o.solid !== false, edited: edited.has(o.id) })),
  };
}
writeFileSync(process.argv[process.argv.length - 1], JSON.stringify(out));
console.log(Object.keys(out).length, 'maps');
