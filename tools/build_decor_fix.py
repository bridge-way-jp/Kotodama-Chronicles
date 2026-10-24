"""
Moves decor (trees, bushes, lamps, benches, crates, ...) off the ways painted on the ground pictures: an object
standing on a path, a road or a plaza looks like it blocks the way, even when you can slip past it. Each one moves to
the nearest free spot beside the way (grass, a planting bed or a rim) where it

  * does not stand on a way itself, on an exit, an arrival point or next to a person or a door,
  * does not squeeze a walkway down to one tile,
  * leaves every exit and person reachable,

or, when there is no such spot nearby, is taken away. Objects placed or moved by hand in the editor stay as they are.
Writes src/content/decorfix.gen.ts, applied in maps.ts.

  npx vite-node tools/dump_decor.mts <decor.json> && python3 tools/build_decor_fix.py <decor.json>
"""
import json
import os
import sys

import numpy as np
from PIL import Image

from build_edges import A, ROOT, T, classify, reach

RADIUS = 5


def green_mask(img, H, W):
    a = np.asarray(img).astype(float) / 255
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(2), a.min(2)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    green = (g > r * 1.05) & (g > b * 1.1) & (sat > .25)
    water = (b > r * 1.25) & (b > g) & (sat > .3)
    frac = lambda m: m[:H * T, :W * T].reshape(H, T, W, T).mean((1, 3))
    return frac(green) > .45, frac(water) > .3


def sand_mask(img, H, W):
    # orange-yellow dirt and sand paths (classify() only knows grey paving and asphalt)
    a = np.asarray(img).astype(float) / 255
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    sand = (r > .62) & (g > .38) & (g < r * .92) & (b < g * .8) & (r - b > .3)
    return sand[:H * T, :W * T].reshape(H, T, W, T).mean((1, 3)) > .5


def main():
    D = json.load(open(sys.argv[1]))
    out = {}
    for mid, m in D.items():
        sol = np.array(m['solid'])
        H, W = sol.shape
        img = Image.open(os.path.join(A, m['image'] + '.png')).convert('RGB').resize((W * T, H * T))
        path, road = classify(img, H, W)
        way = path | road | sand_mask(img, H, W)
        green, water = green_mask(img, H, W)
        walk = sol == 0
        # a way tile is narrow when the way through it is at most 4 tiles wide across one direction
        narrow = np.zeros((H, W), bool)
        for y in range(H):
            for x in range(W):
                if not way[y, x]:
                    continue
                runs = []
                for dx, dy in ((1, 0), (0, 1)):
                    n = 1
                    for s in (1, -1):
                        k = 1
                        while 0 <= x + dx * k * s < W and 0 <= y + dy * k * s < H and way[y + dy * k * s, x + dx * k * s]:
                            n += 1
                            k += 1
                    runs.append(n)
                narrow[y, x] = min(runs) <= 4
        occ = np.zeros((H, W), bool)  # tiles taken by decor
        for d in m['decor']:
            occ[d['y']:d['y'] + d['h'], d['x']:d['x'] + d['w']] = True
        keep = np.zeros((H, W), bool)  # tiles that must stay clear around exits, arrivals, people and things
        for x, y in m['warps'] + m['entries'] + m['npcs']:
            keep[max(0, y - 1):y + 2, max(0, x - 1):x + 2] = True
        for x, y, w, h in m['things']:
            keep[max(0, y - 1):y + h + 1, max(0, x - 1):x + w + 1] = True
        border = np.zeros((H, W), bool)
        border[0, :] = border[-1, :] = border[:, 0] = border[:, -1] = True

        def blocked_now():
            b = ~walk.copy()
            for d in m['decor']:
                if d['solid'] and d['id'] not in moved_away:
                    b[d['y']:d['y'] + d['h'], d['x']:d['x'] + d['w']] = True
            return b

        moved_away = set()
        base_reach = reach(~blocked_now(), m['entries'])
        targets = [(x, y) for x, y in m['warps']] + [(x, y) for x, y in m['npcs']]

        def reachable_ok(b):
            r = reach(~b, m['entries'])
            for x, y in targets:
                was = any(0 <= y + dy < H and 0 <= x + dx < W and base_reach[y + dy, x + dx] for dx, dy in ((0, 0), (1, 0), (-1, 0), (0, 1), (0, -1)))
                now = any(0 <= y + dy < H and 0 <= x + dx < W and r[y + dy, x + dx] for dx, dy in ((0, 0), (1, 0), (-1, 0), (0, 1), (0, -1)))
                if was and not now:
                    return False
            return True

        def squeezes(b, cells):
            # a free tile next to the new spot that would sit between two blocked tiles
            for cx, cy in cells:
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if not (0 <= nx < W and 0 <= ny < H) or b[ny, nx]:
                        continue
                    lr = (nx - 1 < 0 or b[ny, nx - 1]) and (nx + 1 >= W or b[ny, nx + 1])
                    ud = (ny - 1 < 0 or b[ny - 1, nx]) and (ny + 1 >= H or b[ny + 1, nx])
                    if (lr or ud) and way[ny, nx]:
                        return True
            return False

        fixes = {}
        for d in m['decor']:
            if d['edited']:
                continue
            x0, y0, w, h = d['x'], d['y'], d['w'], d['h']
            cells = [(x0 + i, y0 + j) for i in range(w) for j in range(h) if 0 <= x0 + i < W and 0 <= y0 + j < H]
            if not cells:
                continue
            # only on a narrow way (a path, a street): on a wide plaza a lamp or a bench is where it belongs
            on_way = sum(1 for cx, cy in cells if way[cy, cx] and walk[cy, cx] and narrow[cy, cx])
            if on_way * 2 < len(cells):
                continue
            # look for the nearest good spot
            occ[y0:y0 + h, x0:x0 + w] = False
            moved_away.add(d['id'])
            b = blocked_now()
            best = None
            for r in range(1, RADIUS + 1):
                cands = []
                for ny in range(y0 - r, y0 + r + 1):
                    for nx in range(x0 - r, x0 + r + 1):
                        if max(abs(nx - x0), abs(ny - y0)) != r:
                            continue
                        if nx < 0 or ny < 0 or nx + w > W or ny + h > H:
                            continue
                        spot = [(nx + i, ny + j) for i in range(w) for j in range(h)]
                        ok = all(not way[sy, sx] and not occ[sy, sx] and not keep[sy, sx] and not border[sy, sx] and not water[sy, sx]
                                 and (walk[sy, sx] or green[sy, sx]) and sol[sy, sx] != 2 for sx, sy in spot)
                        if not ok:
                            continue
                        # beside the way looks placed on purpose
                        edge = sum(1 for sx, sy in spot for ax, ay in ((sx + 1, sy), (sx - 1, sy), (sx, sy + 1), (sx, sy - 1)) if 0 <= ax < W and 0 <= ay < H and way[ay, ax])
                        cands.append((-edge, abs(nx - x0) + abs(ny - y0), nx, ny, spot))
                for _, _, nx, ny, spot in sorted(cands):
                    if d['solid']:
                        trial = b.copy()
                        for sx, sy in spot:
                            trial[sy, sx] = True
                        if squeezes(trial, spot) or not reachable_ok(trial):
                            continue
                    best = (nx, ny)
                    break
                if best:
                    break
            if best:
                fixes[d['id']] = list(best)
                d['x'], d['y'] = best
                occ[best[1]:best[1] + h, best[0]:best[0] + w] = True
                moved_away.discard(d['id'])
            else:
                fixes[d['id']] = None
        out[mid] = fixes
        print(mid.ljust(14), 'moved', sum(1 for v in fixes.values() if v), 'taken away', sum(1 for v in fixes.values() if v is None))
    ts = '/* generated by tools/build_decor_fix.py — do not edit */\n\n'
    ts += '/** decor moved off the painted ways (new tile position) or taken away (null) */\n'
    ts += 'export const DECORFIX_GEN: Record<string, Record<string, [number, number] | null>> = ' + json.dumps(out, separators=(',', ':')) + ';\n'
    open(os.path.join(ROOT, 'src', 'content', 'decorfix.gen.ts'), 'w').write(ts)


if __name__ == '__main__':
    main()
