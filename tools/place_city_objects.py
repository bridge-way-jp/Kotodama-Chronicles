"""
Puts the objects of each town (cut from the Stadtobjekte sheets with tools/cut_objects.py) on its maps, so that
every place has props of its own, placed so that they look right and never block a way:

  * big things (trees, statues, signboard figures) stand on green beds and open grass, away from the ways,
  * small and medium props line the ways: right beside a path, a street or a plaza, never on a narrow way,
  * never on an exit, an arrival point, next to a person, a door or a story spot, never on the map's border,
  * never squeezing a walkway down to one tile, every exit and person stays reachable,
  * spread out: at least a few tiles between two of them, each sprite used a limited number of times per map.

Copies the sprites to public/assets/co_<town>_<nn>.png and writes src/content/citydecor.gen.ts (decor per map and
the palette for the map editor).

  python3 tools/cut_objects.py <dir with the town sheets> <cut dir>
  npx vite-node tools/dump_decor.mts <decor.json>
  python3 tools/place_city_objects.py <decor.json> <cut dir>
"""
import json
import os
import random
import sys

import numpy as np
from PIL import Image

from build_edges import A, ROOT, T, classify, reach
from build_decor_fix import green_mask, sand_mask

TOWNS = {
    'hinomori': ['town', 'forest', 'valley'],
    'yukimi': ['mountain'],
    'shiomi': ['harbor'],
    'kyoto': ['k_station', 'k_nishiki', 'k_kamo', 'k_gion', 'k_fushimi'],
    'osaka': ['o_umeda', 'o_nakanoshima', 'o_dotonbori', 'o_shinsekai', 'o_castle'],
    'tokyo': ['t_station', 't_asakusa', 't_shibuya', 't_shinjuku', 't_sumida'],
}
PER_MAP = 16
SPACING = 3


def sprites_for(town, cut):
    man = json.load(open(os.path.join(cut, 'manifest.json')))
    out = []
    for sheet, items in man.items():
        if not sheet.startswith(town):
            continue
        for it in items:
            src = os.path.join(cut, it['file'])
            im = Image.open(src).convert('RGBA')
            # sprites come at sheet size: scale so a small prop is about a tile, trees about three
            h = im.height
            target = 104 if h > 170 else 72 if h > 110 else 44 if h > 60 else 34
            s = target / h
            im = im.resize((max(1, round(im.width * s)), target), Image.LANCZOS)
            key = f'co_{town}_{len(out):02d}'
            im.save(os.path.join(A, key + '.png'))
            out.append({'key': key, 'w': im.width, 'h': im.height, 'big': target >= 72})
    return out


def main():
    D = json.load(open(sys.argv[1]))
    cut = sys.argv[2]
    rnd = random.Random(7)
    gen, palette = {}, []
    for town, maps in TOWNS.items():
        spr = sprites_for(town, cut)
        if not spr:
            print(town, 'no sprites')
            continue
        palette += [{'name': s['key'], 'w': s['w'], 'h': s['h']} for s in spr]
        for mid in maps:
            m = D.get(mid)
            if not m:
                continue
            sol = np.array(m['solid'])
            H, W = sol.shape
            img = Image.open(os.path.join(A, m['image'] + '.png')).convert('RGB').resize((W * T, H * T))
            path, road = classify(img, H, W)
            way = path | road | sand_mask(img, H, W)
            green, water = green_mask(img, H, W)
            walk = sol == 0
            taken = np.zeros((H, W), bool)
            for d in m['decor']:
                taken[max(0, d['y'] - 1):d['y'] + d['h'] + 1, max(0, d['x'] - 1):d['x'] + d['w'] + 1] = True
            keep = np.zeros((H, W), bool)
            for x, y in m['warps'] + m['entries'] + m['npcs']:
                keep[max(0, y - 2):y + 3, max(0, x - 2):x + 3] = True
            for x, y, w, h in m['things']:
                keep[max(0, y - 1):y + h + 1, max(0, x - 1):x + w + 1] = True
            blocked = ~walk
            for d in m['decor']:
                if d['solid']:
                    blocked[d['y']:d['y'] + d['h'], d['x']:d['x'] + d['w']] = True
            base = reach(~blocked, m['entries'])
            targets = m['warps'] + m['npcs']

            def still_reachable(b):
                r = reach(~b, m['entries'])
                near = lambda g, x, y: any(0 <= y + dy < H and 0 <= x + dx < W and g[y + dy, x + dx] for dx, dy in ((0, 0), (1, 0), (-1, 0), (0, 1), (0, -1)))
                return all(near(r, x, y) or not near(base, x, y) for x, y in targets)

            def squeeze(b, x, y):
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if not (0 <= nx < W and 0 <= ny < H) or b[ny, nx]:
                        continue
                    if ((nx - 1 < 0 or b[ny, nx - 1]) and (nx + 1 >= W or b[ny, nx + 1])) or ((ny - 1 < 0 or b[ny - 1, nx]) and (ny + 1 >= H or b[ny + 1, nx])):
                        return True
                return False

            def beside_way(x, y):
                return any(0 <= x + dx < W and 0 <= y + dy < H and way[y + dy, x + dx] for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)))

            spots = [(x, y) for y in range(1, H - 1) for x in range(1, W - 1)
                     if not way[y, x] and not water[y, x] and not keep[y, x] and not taken[y, x] and sol[y, x] != 2
                     and (walk[y, x] or green[y, x]) and not (sol[max(0, y - 2):y, x] == 2).any()]
            rnd.shuffle(spots)
            objs, uses = [], {}
            for x, y in spots:
                if len(objs) >= PER_MAP:
                    break
                if any(abs(x - o['x']) + abs(y - o['y']) < SPACING for o in objs):
                    continue
                big = green[y, x] and not beside_way(x, y)
                small_ok = beside_way(x, y)
                pool = [s for s in spr if (s['big'] and big) or (not s['big'] and small_ok)]
                pool = [s for s in pool if uses.get(s['key'], 0) < 2]
                if not pool:
                    continue
                s = rnd.choice(pool)
                if walk[y, x]:
                    trial = blocked.copy()
                    trial[y, x] = True
                    if squeeze(trial, x, y) or not still_reachable(trial):
                        continue
                    blocked = trial
                taken[max(0, y - 1):y + 2, max(0, x - 1):x + 2] = True
                uses[s['key']] = uses.get(s['key'], 0) + 1
                objs.append({'id': f'{mid}_co{len(objs)}', 'sprite': s['key'], 'x': x, 'y': y, 'w': 1, 'h': 1, 'solid': True, 'decor': True})
            gen[mid] = objs
            print(mid.ljust(14), len(objs), 'objects')
    ts = '/* generated by tools/place_city_objects.py — do not edit */\nimport type { MapObject } from \'./maps\';\n\n'
    ts += '/** the objects of each town, placed beside the ways */\n'
    ts += 'export const CITYDECOR_GEN: Record<string, MapObject[]> = ' + json.dumps(gen, separators=(',', ':')) + ';\n\n'
    ts += '/** the town objects for the map editor\'s palette */\n'
    ts += 'export const CITY_PALETTE: { name: string; w: number; h: number }[] = ' + json.dumps(palette, separators=(',', ':')) + ';\n'
    open(os.path.join(ROOT, 'src', 'content', 'citydecor.gen.ts'), 'w').write(ts)


if __name__ == '__main__':
    main()
