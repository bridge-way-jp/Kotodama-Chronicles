import { describe, expect, it } from 'vitest';
import { MAPS, doorsOf, moveBuildingLinks, moveExits } from '../src/content/maps';
import { emptyEdits, mergeEdits } from '../src/content/edits';

describe('map editor: links move along', () => {
  it('a house moved takes its door and the spot where you come out of it', () => {
    const town = MAPS.town;
    const house = town.objects.find((o) => doorsOf(town, o).length)!;
    const door = doorsOf(town, house)[0];
    const room = MAPS[door.to.map];
    const out = room.warps.find((w) => w.to.map === 'town')!;
    const [dx0, dy0] = [out.to.x - door.x, out.to.y - door.y];
    const before = [door.x, door.y];
    moveBuildingLinks('town', house, 3, 2);
    expect([door.x, door.y]).toEqual([before[0] + 3, before[1] + 2]);
    // coming out you still stand right at the door
    expect([out.to.x - door.x, out.to.y - door.y]).toEqual([dx0, dy0]);
  });

  it('an exit moved takes the arrival on the other side along, once for a wide exit', () => {
    const from = Object.values(MAPS).find((m) => !m.interior && m.warps.filter((w) => !MAPS[w.to.map]?.interior).length >= 2)!;
    const first = from.warps.find((w) => !MAPS[w.to.map]?.interior)!;
    const run = from.warps.filter((w) => w.to.map === first.to.map && Math.abs(w.x - first.x) + Math.abs(w.y - first.y) <= 2);
    const other = MAPS[first.to.map];
    const back = other.warps.filter((w) => w.to.map === from.id);
    const before = back.map((w) => [w.to.x, w.to.y]);
    moveExits(from.id, run.map((w) => ({ w, x: w.x, y: w.y + 1 })));
    const moved = back.filter((w, i) => w.to.y !== before[i][1]);
    expect(moved.length).toBeGreaterThan(0);
    for (const w of moved) expect(w.to.y - before[back.indexOf(w)][1]).toBe(1);
    expect(run.every((w) => w.orig)).toBe(true);
  });

  it('published and own edits merge: the own change wins, removing a published addition drops it', () => {
    const shared = { town: { ...emptyEdits(), moved: { a: [1, 1] as [number, number] }, added: [{ id: 'x', sprite: 's', x: 0, y: 0 }] } };
    const own = { town: { ...emptyEdits(), moved: { a: [2, 2] as [number, number] }, removed: ['x', 'y'] } };
    const m = mergeEdits(shared, own);
    expect(m.town.moved.a).toEqual([2, 2]);
    expect(m.town.added).toEqual([]);
    expect(m.town.removed).toEqual(['y']);
  });
});
