import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

/**
 * The map edits published for everyone (a snapshot of the live ones in tests/fixtures/shared_edits.json): moving
 * houses about must never leave a door letting out into a wall, or a person inside a building.
 */
describe('the world with the published map edits', () => {
  it('still hangs together', async () => {
    const store: Record<string, string> = { kc_map_edits_shared: readFileSync('tests/fixtures/shared_edits.json', 'utf8') };
    (globalThis as any).localStorage = { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => void (store[k] = v), removeItem: (k: string) => void delete store[k] };
    const { audit } = await import('../tools/walk_audit');
    expect(audit().flatMap((m) => m.problems.map((p) => `${m.map}: ${p}`))).toEqual([]);
    const { MAPS } = await import('../src/content/maps');
    // nobody stands inside a solid building
    const inside = Object.values(MAPS).flatMap((m) =>
      m.npcs.filter((n) => m.objects.some((o) => o.sprite && !o.decor && o.solid !== false && n.x >= o.x && n.x < o.x + (o.w ?? 1) && n.y >= o.y && n.y < o.y + (o.h ?? 1))).map((n) => `${m.id}: ${n.id}`),
    );
    expect(inside.filter((x) => !MAPS[x.split(':')[0]].interior)).toEqual([]);
    delete (globalThis as any).localStorage;
  });
});
