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

# maps already full of decor get town objects by swapping the look of some of it (same spot, so the ways stay as they are):
# map -> [(sprites to swap, indices of the town's sprites to use, how many at most, only beside a way)]
SWAPS = {
    'mountain': [({'ob_tree_round'}, [3], 999, False), ({'ob_tree_pine', 'ob_tree_cedar'}, [14], 10, False), ({'ob_bush_round'}, [4], 40, False),
                 ({'ob_bush_round', 'ob_fern', 'ob_grass_clump'}, [0, 1, 5, 8, 10, 13, 15, 16], 14, True)],
    'k_fushimi': [({'ob_bush_round', 'ob_fern', 'ob_grass_clump'}, [2, 7, 16], 12, True)],
}
SPACING = 3


# game height in px of each object on the sheet (reading order, see the contact sheets); T = a tree (stands on green)
# objects that look like a barrier wherever they stand: only for placing by hand in the editor
NOT_AUTO = {('tokyo', 3), ('osaka', 16)}

SIZES = {
    'hinomori': [60, 52, 40, 56, 64, 40, 40, 'T100', 36, 60, 40, 48, 52, 36, 32, 32, 52, 44, 52, 72],
    'yukimi': [40, 56, 56, 'T104', 34, 40, 28, 56, 52, 48, 36, 36, 32, 60, 'T100', 56, 32, 30, 40],
    'shiomi': [40, 56, 40, 60, 60, 64, 64, 52, 44, 28, 44, 44, 44, 52, 'T56', 28, 40, 30, 64, 30],
    'kyoto': [40, 28, 64, 64, 40, 44, 72, 52, 'T104', 36, 56, 56, 72, 48, 56, 52, 32, 24, 44],
    'osaka': [64, 72, 64, 72, 72, 64, 40, 64, 60, 52, 56, 44, 40, 56, 64, 'T80', 28, 44, 52],
    'tokyo': [58, 44, 76, 36, 72, 56, 56, 56, 60, 56, 52, 'T100', 'T100', 'T100', 40, 40, 52, 56, 60, 32],
}


def sprites_for(town, cut):
    man = json.load(open(os.path.join(cut, 'manifest.json')))
    sizes = SIZES.get(town, [])
    out = []
    for sheet, items in man.items():
        if not sheet.startswith(town):
            continue
        for i, it in enumerate(items):
            spec = sizes[i] if i < len(sizes) else 48
            tree = isinstance(spec, str)
            target = int(spec[1:]) if tree else spec
            im = Image.open(os.path.join(cut, it['file'])).convert('RGBA')
            s = target / im.height
            # very wide things are limited by their width (a boat, a stall, a fence piece)
            s = min(s, 96 / im.width)
            im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
            key = f'co_{town}_{len(out):02d}'
            im.save(os.path.join(A, key + '.png'))
            out.append({'key': key, 'w': im.width, 'h': im.height, 'big': tree, 'tiles': 2 if im.width > 56 else 1, 'auto': (town, i) not in NOT_AUTO})
    return out


def main():
    D = json.load(open(sys.argv[1]))
    cut = sys.argv[2]
    rnd = random.Random(7)
    gen, palette, swapgen = {}, [], {}
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
            green, water = green_mask(img, H, W)
            arr = np.asarray(img).astype(float) / 255
            mx, mn = arr.max(2), arr.min(2)
            sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
            frac = lambda q: q[:H * T, :W * T].reshape(H, T, W, T).mean((1, 3))
            snow = frac((mx > .82) & (sat < .14)) > .5
            # planting beds in any season colour (autumn red, flowers): saturated, not water, not grey stone
            bed = frac((sat > .38) & (mx > .25)) > .55
            lawn = green.copy()
            # autumn beds only in the cities (in the villages the reddish ground is gravel, rails or soil)
            if town in ('kyoto', 'osaka', 'tokyo'):
                green = green | (bed & ~water)
            way = (path & ~snow) | road | sand_mask(img, H, W)
            walk = sol == 0
            taken = np.zeros((H, W), bool)
            for d in m['decor']:
                taken[max(0, d['y'] - 1):d['y'] + d['h'] + 1, max(0, d['x'] - 1):d['x'] + d['w'] + 1] = True
            keep = np.zeros((H, W), bool)
            for x, y in m['warps'] + m['entries'] + m['npcs']:
                keep[max(0, y - 2):y + 3, max(0, x - 2):x + 3] = True
            for x, y, w, h in m['things']:
                keep[max(0, y - 1):y + h + 1, max(0, x - 1):x + w + 1] = True
            # tall grass is where wild Kotodama appear: it stays open
            for x, y in m.get('tall', []):
                keep[y, x] = True
            blocked = ~walk
            for d in m['decor']:
                if d['solid']:
                    blocked[d['y']:d['y'] + d['h'], d['x']:d['x'] + d['w']] = True
            base = reach(~blocked, m['entries'])
            targets = m['warps'] + m['npcs']

            # people, exits and every thing of the map (a shrine stone, a door): one of its tiles must stay reachable
            groups = [[(x, y)] for x, y in targets] + [[(x + i, y + j) for i in range(w) for j in range(h)] for x, y, w, h in m['things']]

            def still_reachable(b):
                r = reach(~b, m['entries'])
                # no piece of ground that could be walked on before may be cut off (a clearing, a corner of a park)
                if ((base & ~b) & ~r).any():
                    return False
                near = lambda g, x, y: any(0 <= y + dy < H and 0 <= x + dx < W and g[y + dy, x + dx] for dx, dy in ((0, 0), (1, 0), (-1, 0), (0, 1), (0, -1)))
                return all(any(near(r, x, y) for x, y in g) or not any(near(base, x, y) for x, y in g) for g in groups)

            def squeeze(b, x, y):
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if not (0 <= nx < W and 0 <= ny < H) or b[ny, nx]:
                        continue
                    if ((nx - 1 < 0 or b[ny, nx - 1]) and (nx + 1 >= W or b[ny, nx + 1])) or ((ny - 1 < 0 or b[ny - 1, nx]) and (ny + 1 >= H or b[ny + 1, nx])):
                        return True
                return False

            def plaza_edge(x, y):
                # paving at least 5 tiles wide in both directions, against a wall, bed or building (not water)
                if not (path[y, x] or road[y, x]):
                    return False
                for dx, dy in ((1, 0), (0, 1)):
                    n = 1
                    for s in (1, -1):
                        k = 1
                        while 0 <= x + dx * k * s < W and 0 <= y + dy * k * s < H and (path | road)[y + dy * k * s, x + dx * k * s]:
                            n += 1
                            k += 1
                    if n < 5:
                        return False
                return any(0 <= x + dx < W and 0 <= y + dy < H and not walk[y + dy, x + dx] and not water[y + dy, x + dx] for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)))

            def beside_way(x, y):
                return any(0 <= x + dx < W and 0 <= y + dy < H and way[y + dy, x + dx] for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)))

            spots = [(x, y) for y in range(1, H - 1) for x in range(1, W - 1)
                     if not way[y, x] and not water[y, x] and not keep[y, x] and not taken[y, x] and sol[y, x] != 2
                     # on walkable ground only on a lawn or at the edge of a wide plaza (never on a narrow way, wood or a
                     # bridge), else on a bed beside the way
                     and ((walk[y, x] and (lawn[y, x] or plaza_edge(x, y))) or (not walk[y, x] and green[y, x])) and not (sol[max(0, y - 2):y, x] == 2).any()]
            okspot = set(spots)
            rnd.shuffle(spots)
            objs, uses = [], {}
            for x, y in spots:
                if len(objs) >= PER_MAP:
                    break
                if any(abs(x - o['x']) + abs(y - o['y']) < SPACING for o in objs) or taken[y, x]:
                    continue
                big = green[y, x] and not beside_way(x, y)
                small_ok = beside_way(x, y)
                pool = [s for s in spr if s['auto'] and ((s['big'] and big) or (not s['big'] and small_ok))]
                pool = [s for s in pool if uses.get(s['key'], 0) < 2]
                if not pool:
                    continue
                s = rnd.choice(pool)
                tw = s['tiles']
                cells = [(x + i, y) for i in range(tw)]
                if any(not (cx, cy) in okspot for cx, cy in cells):
                    continue
                if any(walk[cy, cx] for cx, cy in cells):
                    trial = blocked.copy()
                    for cx, cy in cells:
                        trial[cy, cx] = True
                    if any(squeeze(trial, cx, cy) for cx, cy in cells) or not still_reachable(trial):
                        continue
                    blocked = trial
                taken[max(0, y - 1):y + 2, max(0, x - 1):x + tw + 1] = True
                uses[s['key']] = uses.get(s['key'], 0) + 1
                objs.append({'id': f'{mid}_co{len(objs)}', 'sprite': s['key'], 'x': x, 'y': y, 'w': tw, 'h': 1, 'solid': True, 'decor': True})
            gen[mid] = objs
            swaps = {}
            props = [i for i, s in enumerate(spr) if not s['big'] and s['tiles'] == 1 and s['auto']]
            generic = {d['sprite'] for d in m['decor'] if any(k in d['sprite'] for k in ('bench', 'crates', 'barrel', 'planter', 'sign', 'jar', 'sack', 'well', 'table', 'beer', 'rack', 'recycle', 'trash'))}
            for kinds, idx, most, beside in SWAPS.get(mid, []) + ([(generic, props, 8, False)] if generic and props else []):
                done = 0
                cand = [d for d in m['decor'] if d['sprite'] in kinds and d['id'] not in swaps and not d['edited']]
                rnd.shuffle(cand)
                last = []
                for d in cand:
                    if done >= most:
                        break
                    if beside and not any(beside_way(d['x'] + i, d['y']) for i in range(d['w'])):
                        continue
                    # a town object never takes the place of something standing on a way
                    if mid != 'mountain' and any(way[d['y'], d['x'] + i] for i in range(d['w']) if d['x'] + i < W):
                        continue
                    if beside and any(abs(d['x'] - lx) + abs(d['y'] - ly) < SPACING for lx, ly in last):
                        continue
                    swaps[d['id']] = spr[idx[done % len(idx)]]['key']
                    last.append((d['x'], d['y']))
                    done += 1
            swapgen[mid] = swaps
            print(mid.ljust(14), len(objs), 'objects', len(swaps), 'swapped')
    ts = '/* generated by tools/place_city_objects.py — do not edit */\nimport type { MapObject } from \'./maps\';\n\n'
    ts += '/** the objects of each town, placed beside the ways */\n'
    ts += 'export const CITYDECOR_GEN: Record<string, MapObject[]> = ' + json.dumps(gen, separators=(',', ':')) + ';\n\n'
    ts += '/** decor that takes the look of a town object (object id -> sprite) */\n'
    ts += 'export const CITYSWAP_GEN: Record<string, Record<string, string>> = ' + json.dumps(swapgen, separators=(',', ':')) + ';\n\n'
    ts += '/** the town objects for the map editor\'s palette */\n'
    ts += 'export const CITY_PALETTE: { name: string; w: number; h: number }[] = ' + json.dumps(palette, separators=(',', ':')) + ';\n'
    open(os.path.join(ROOT, 'src', 'content', 'citydecor.gen.ts'), 'w').write(ts)


if __name__ == '__main__':
    main()
