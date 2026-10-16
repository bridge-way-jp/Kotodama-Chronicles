"""
Builds a "plain ground + separate objects" map from a flat ground image (see art/PROMPTS for the plain-ground brief).

For every configured map it
  * writes public/assets/<image>.png (the flat ground, scaled to the map size),
  * classifies tiles by colour (green planting beds, water, blocked rows) -> collision tiles,
  * fills beds with trees / bushes / flowers, and adds hand-placed street furniture,
  * writes src/content/plain.gen.ts (tiles + decor objects, keeps the existing building objects).

Run: python3 tools/build_plain.py <ground dir map> <cut objects dir>   (see MAPS below)
"""
import colorsys, json, os, random, sys
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')
TILE = 32
CUT = sys.argv[2] if len(sys.argv) > 2 else '.'
GROUNDS = json.load(open(sys.argv[1]))     # {map id: path to plain ground png}
SRC = json.load(open(os.path.join(os.path.dirname(sys.argv[1]), 'maps_tiles.json')))  # id -> tiles, warps, npcs
OBJS = json.load(open(os.path.join(os.path.dirname(sys.argv[1]), 'maps_objs.json')))  # id -> objects (buildings etc.)

# name -> (sheet, index, 'h'|'w', target px)
SPR = {
    'tree_round': ('natur_a', 0, 'h', 92), 'tree_cedar': ('natur_a', 1, 'h', 104), 'tree_pine': ('natur_a', 2, 'h', 104),
    'tree_maple': ('natur_a', 3, 'h', 104), 'tree_sakura': ('natur_a', 4, 'h', 104), 'tree_bare': ('natur_a', 5, 'h', 104),
    'tree_ginkgo': ('natur_a', 6, 'h', 108), 'tree_willow': ('natur_a', 8, 'h', 120),
    'bush_round': ('natur_a', 10, 'w', 34), 'bush_pink': ('natur_a', 11, 'w', 34), 'bush_yellow': ('natur_a', 12, 'w', 32),
    'bush_blue': ('natur_a', 13, 'w', 34), 'hedge_block': ('natur_a', 14, 'w', 40), 'grass_clump': ('natur_a', 15, 'w', 30),
    'fern': ('natur_a', 16, 'w', 30), 'bamboo': ('natur_a', 17, 'h', 72),
    'rock_s': ('natur_b', 2, 'w', 22), 'rock_m': ('natur_b', 3, 'w', 36), 'rock_l': ('natur_b', 5, 'w', 56),
    'flower_red': ('natur_b', 9, 'w', 30), 'flower_white': ('natur_b', 10, 'w', 30), 'flower_yellow': ('natur_b', 11, 'w', 30), 'flower_pink': ('natur_b', 12, 'w', 30),
    'lamp_modern': ('stadt_strasse_a', 0, 'h', 92), 'lamp_old': ('stadt_strasse_a', 1, 'h', 76), 'lamp_lantern': ('stadt_strasse_a', 2, 'h', 80),
    'bench_wood': ('stadt_strasse_a', 3, 'w', 60), 'bench_stone': ('stadt_strasse_a', 4, 'w', 60), 'bench_metal': ('stadt_strasse_a', 5, 'w', 60),
    'bollard': ('stadt_strasse_a', 7, 'h', 28), 'vend_red': ('stadt_strasse_a', 10, 'h', 58), 'vend_blue': ('stadt_strasse_a', 11, 'h', 58),
    'vend_snack': ('stadt_strasse_a', 12, 'h', 58), 'rack_empty': ('stadt_strasse_a', 13, 'w', 60), 'rack_two': ('stadt_strasse_a', 14, 'w', 60),
    'rack_four': ('stadt_strasse_a', 15, 'w', 62), 'scooter': ('stadt_strasse_a', 16, 'w', 40), 'planter_flower': ('stadt_strasse_a', 17, 'w', 44),
    'tree_pot': ('stadt_strasse_a', 18, 'h', 52), 'planter_hedge': ('stadt_strasse_a', 19, 'w', 60),
    'bonsai': ('stadt_strasse_b', 0, 'h', 32), 'trash': ('stadt_strasse_b', 1, 'h', 34), 'recycle': ('stadt_strasse_b', 2, 'w', 54),
    'sign_arrow': ('stadt_strasse_b', 4, 'h', 56), 'sign_board': ('stadt_strasse_b', 5, 'h', 50), 'bus_pole': ('stadt_strasse_b', 6, 'h', 64),
    'pole_wood': ('stadt_strasse_b', 7, 'h', 104), 'shelter_glass': ('stadt_strasse_b', 12, 'w', 100), 'shelter_wood': ('stadt_strasse_b', 13, 'w', 100),
    'phone_box': ('stadt_strasse_b', 14, 'h', 64), 'postbox': ('stadt_strasse_b', 15, 'h', 52), 'aframe': ('stadt_strasse_b', 16, 'h', 44),
    'hedge_h': ('zaeune_mauern_b', 0, 'w', 64), 'hedge_v': ('zaeune_mauern_b', 1, 'h', 64),
    'stall_red': ('markt_hof_a', 0, 'w', 76), 'stall_green': ('markt_hof_a', 1, 'w', 76), 'stall_blue': ('markt_hof_a', 2, 'w', 76), 'stall_plain': ('markt_hof_a', 3, 'w', 76),
    'crates_a': ('markt_hof_a', 4, 'w', 40), 'crates_b': ('markt_hof_a', 6, 'w', 42), 'crates_c': ('markt_hof_a', 8, 'w', 42),
    'barrel': ('markt_hof_a', 10, 'h', 38), 'barrel_red': ('markt_hof_a', 12, 'h', 38), 'jar_green': ('markt_hof_a', 14, 'h', 30), 'jar_blue': ('markt_hof_a', 16, 'h', 32),
    'sack_rice': ('markt_hof_a', 17, 'h', 32), 'sack': ('markt_hof_a', 19, 'h', 32),
    'laundry': ('markt_hof_b', 0, 'w', 64), 'drying_fish': ('markt_hof_b', 2, 'w', 64), 'drying_veg': ('markt_hof_b', 3, 'w', 64),
    'firewood': ('markt_hof_b', 4, 'w', 48), 'well': ('markt_hof_b', 7, 'h', 56), 'table_long': ('markt_hof_b', 11, 'w', 64), 'table_round': ('markt_hof_b', 9, 'w', 54),
    'beer_red': ('markt_hof_b', 12, 'w', 40), 'beer_yellow': ('markt_hof_b', 13, 'w', 40), 'cafe_red': ('markt_hof_b', 15, 'w', 64), 'cafe_blue': ('markt_hof_b', 16, 'w', 64), 'cafe_white': ('markt_hof_b', 17, 'w', 64),
    'noren_blue': ('markt_hof_b', 20, 'w', 64), 'noren_white': ('markt_hof_b', 21, 'w', 64), 'stone_lantern': ('markt_hof_b', 18, 'h', 52),
    'fox_statue': ('markt_hof_b', 22, 'h', 52), 'hokora': ('markt_hof_b', 24, 'h', 56), 'chozuya': ('markt_hof_b', 26, 'w', 54),
}

def load_sprite(name):
    sheet, idx, axis, px = SPR[name]
    im = Image.open(os.path.join(CUT, f'{sheet}_{idx:02d}.png'))
    s = px / (im.height if axis == 'h' else im.width)
    out = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
    fn = f'ob_{name}.png'
    out.save(os.path.join(A, fn), optimize=True)
    return fn, out.size

def tile_feats(img):
    a = np.asarray(img.convert('RGB')).astype(float) / 255
    H, W = a.shape[:2]
    mx, mn = a.max(axis=2), a.min(axis=2)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    green = (g > r * 1.08) & (g > b * 1.15) & (sat > .3) & (mx > .2)
    blue = (b > r * 1.3) & (b > g * 1.05) & (sat > .35) & (mx > .3)
    th, tw = H // TILE, W // TILE
    gf = green[:th * TILE, :tw * TILE].reshape(th, TILE, tw, TILE).mean(axis=(1, 3))
    bf = blue[:th * TILE, :tw * TILE].reshape(th, TILE, tw, TILE).mean(axis=(1, 3))
    return gf, bf

def tile_masks(img, th, tw):
    a = np.asarray(img.convert('RGB')).astype(float) / 255
    mx, mn = a.max(axis=2), a.min(axis=2)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    def frac(m): return m[:th * TILE, :tw * TILE].reshape(th, TILE, tw, TILE).mean(axis=(1, 3))
    road = frac((sat < .2) & (mx > .2) & (mx < .52))
    sand = frac((r > .62) & (r < .98) & (g > .4) & (g < .8) & (b > .2) & (b < .6) & (r - b > .25) & (r - g > .08) & (r - g < .3) & (sat > .3))
    paving = frac((sat < .32) & (mx > .5))
    return road > .55, sand > .6, paving > .5

def auto_furniture(mid, cfg, img, blocked, keep, decor, rnd, tw, th):
    road, sand, paving = tile_masks(img, th, tw)
    _, bfl = tile_feats(img)
    wet = ndimage.binary_dilation(bfl > .12, iterations=1)
    paving = paving & ~wet
    sand = sand & ~wet
    bld = []  # building footprints (+ the sprite's drawn area) and the row in front of them
    occ = np.zeros((th, tw), bool)
    solid_fp = np.zeros((th, tw), bool)
    for o in OBJS[mid]['objects']:
        x0, y0, w, h = o['x'], o['y'], o['w'], o['h']
        occ[y0:y0 + h, x0:x0 + w] = True
        solid_fp[y0:y0 + h, x0:x0 + w] = True
        sp = os.path.join(A, o['sprite'] + '.png')
        if os.path.exists(sp):
            iw, ih = Image.open(sp).size
            cx = o['at'][0] if o.get('at') else (x0 + w / 2) * TILE
            by = o['at'][1] if o.get('at') else (y0 + h) * TILE + (o.get('dy') or 0)
            bld.append((int((cx - iw / 2) // TILE), int((by - ih) // TILE), int((cx + iw / 2 - 1) // TILE), int((by - 1) // TILE), o))
    for (x0, y0, x1, y1, o) in bld:
        occ[max(0, y0):y1 + 1, max(0, x0):x1 + 1] = True
    front = np.zeros((th, tw), bool)
    for (x0, y0, x1, y1, o) in bld:
        front[min(th - 1, y1 + 1), max(0, x0):x1 + 1] = True
    for (x, y) in keep:
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if 0 <= x + dx < tw and 0 <= y + dy < th: front[y + dy, x + dx] = True
    used = np.zeros((th, tw), bool)
    start = None
    for w in SRC[mid]['warps']:
        start = (w['x'], w['y']); break
    def reach_count(extra):
        free = ~blocked & ~extra & ~solid_fp
        if start is None: return 0
        seen = {start}; q = [start]
        while q:
            x, y = q.pop()
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < tw and 0 <= ny < th and (nx, ny) not in seen and (free[ny, nx] or (nx, ny) in keep):
                    seen.add((nx, ny)); q.append((nx, ny))
        return len(seen)
    base_reach = [reach_count(np.zeros((th, tw), bool))]
    if os.environ.get('DBG'): print(mid, 'base_reach', base_reach[0], 'blocked', int(blocked.sum()), 'occ', int(occ.sum()), 'front', int(front.sum()), 'road', int(road.sum()), 'paving', int(paving.sum()), 'sand', int(sand.sum()), 'start', start)
    why = {}
    def place(name, x, y, w=1, h=1):
        if x < 0 or y < 0 or x + w > tw or y + h > th: return False
        for key_, arr in (('wet', wet), ('blocked', blocked), ('used', used), ('occ', occ), ('front', front)):
            if arr[y:y + h, x:x + w].any():
                why[key_] = why.get(key_, 0) + 1
                return False
        trial = used.copy(); trial[y:y + h, x:x + w] = True
        rc = reach_count(trial)
        if rc < base_reach[0] - w * h:
            why['reach'] = why.get('reach', 0) + 1
            return False
        used[y:y + h, x:x + w] = True
        base_reach[0] = rc
        decor.append(dict(name=name, x=int(x), y=int(y), w=w, h=h, solid=True, dy=0))
        return True
    cand = [(x, y) for y in range(th) for x in range(tw)]
    # lamps: paving tiles that touch a road
    rnd.shuffle(cand)
    lamps = []
    for x, y in cand:
        if len(lamps) >= cfg.get('lamps', 12): break
        if not paving[y, x] or road[y, x]: continue
        touch = road if road.sum() > 100 else (occ | blocked)
        if not any(0 <= x + dx < tw and 0 <= y + dy < th and touch[y + dy, x + dx] for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))): continue
        if any(abs(x - lx) + abs(y - ly) < 7 for lx, ly in lamps): continue
        if place(rnd.choice(cfg.get('lamp_types', ['lamp_modern', 'lamp_old'])), x, y): lamps.append((x, y))
    # benches on open paving, props beside buildings
    benches = []
    for x, y in cand:
        if len(benches) >= cfg.get('benches', 3): break
        if y + 2 >= th or x + 3 >= tw: continue
        if not paving[y:y + 3, x:x + 3].all() or road[y:y + 3, x:x + 3].any(): continue
        if any(abs(x - bx) + abs(y - by) < 9 for bx, by in benches): continue
        if place(rnd.choice(['bench_wood', 'bench_stone', 'bench_metal']), x, y, 2, 1): benches.append((x, y))
    side = cfg.get('side', ['vend_red', 'vend_blue', 'rack_two', 'trash', 'vend_snack', 'planter_flower'])
    k = 0
    for (x0, y0, x1, y1, o) in bld:
        for x, y in ((x1 + 1, y1), (x0 - 1, y1), (x1 + 1, y1 - 1), (x0 - 1, y1 - 1)):
            if k >= cfg.get('side_n', 6): break
            nm = side[k % len(side)]
            w = 2 if nm in ('rack_two', 'rack_four') else 1
            if place(nm, x, y, w, 1): k += 1; break
    if os.environ.get('DBG'): print(mid, 'lamps', len(lamps), 'benches', len(benches), 'side', k, why)
    # yards: sand-coloured rectangles that no building covers become themed little spaces
    pool = cfg.get('yard', ['planter_flower', 'bench_wood', 'tree_pot', 'crates_a', 'barrel', 'bush_pink'])
    yard = sand & ~occ & ~blocked
    lab, n = ndimage.label(yard)
    for c in range(1, n + 1):
        ys, xs = np.where(lab == c)
        if len(xs) < 4: continue
        cells = list(zip(xs, ys)); rnd.shuffle(cells)
        placed = 0
        for x, y in cells:
            if placed >= max(2, len(xs) // 5): break
            nm = rnd.choice(pool)
            w = 2 if nm in ('stall_red', 'stall_green', 'stall_blue', 'stall_plain', 'table_long', 'bench_wood', 'bench_stone', 'laundry', 'drying_fish', 'drying_veg', 'cafe_red', 'cafe_blue', 'cafe_white', 'noren_blue', 'noren_white', 'rack_two') else 1
            if place(nm, x, y, w, 1): placed += 1

def build(mid, cfg):
    img = Image.open(GROUNDS[mid]).convert('RGB')
    W, H = len(SRC[mid]['tiles'][0]) * TILE, len(SRC[mid]['tiles']) * TILE
    img = img.resize((W, H), Image.LANCZOS)
    img.save(os.path.join(A, cfg['image'] + '.png'), optimize=True)
    gf, bf = tile_feats(img)
    th, tw = gf.shape
    keep = set(map(tuple, cfg.get('open', [])))
    for w in SRC[mid]['warps']:
        keep.add((w['x'], w['y']))
    for n in SRC[mid]['npcs']:
        keep.add((n['x'], n['y']))
    blocked = np.zeros((th, tw), bool)
    for (x0, y0, x1, y1) in cfg.get('block', []):
        blocked[y0:y1 + 1, x0:x1 + 1] = True
    old = SRC[mid]['tiles']
    mode = cfg.get('mode', 'color')
    # terrain that the old collision already knew about (water, cliffs, rails, walls) stays blocked; bridges stay open
    for y in range(th):
        for x in range(tw):
            if old[y][x] in cfg.get('inherit', '~KrXSZYWc'):
                blocked[y, x] = True
    if mode == 'color':
        water = bf > .5
        for y in range(th):
            for x in range(tw):
                if water[y, x] and old[y][x] != 'b':
                    blocked[y, x] = True
    green = gf > .45
    if mode == 'old':
        green = np.zeros_like(green)
    lab, n = ndimage.label(green)
    rnd = random.Random(mid)
    decor = []
    def add(name, x, y, w=1, h=1, solid=True, dy=0):
        decor.append(dict(name=name, x=int(x), y=int(y), w=w, h=h, solid=solid, dy=dy))
    for c in range(1, n + 1):
        ys, xs = np.where(lab == c)
        area = len(xs)
        bw, bh = xs.max() - xs.min() + 1, ys.max() - ys.min() + 1
        lawn = area >= 14 and min(bw, bh) >= 3
        edge = (xs.min() == 0 or ys.min() == 0 or xs.max() == tw - 1 or ys.max() == th - 1) and min(bw, bh) <= 3
        if lawn and not edge:
            # walkable lawn: a few trees and flower patches, never on the edge ring
            cells = [(x, y) for x, y in zip(xs, ys) if 1 <= x < tw - 1 and 1 <= y < th - 1]
            rnd.shuffle(cells)
            taken = []
            for x, y in cells:
                if len(taken) >= max(1, area // 9): break
                if any(abs(x - tx) + abs(y - ty) < 4 for tx, ty in taken) or (x, y) in keep: continue
                taken.append((x, y))
                add(rnd.choice(cfg.get('lawn_trees', ['tree_round', 'tree_maple', 'tree_ginkgo'])) if rnd.random() < .6 else rnd.choice(['flower_red', 'flower_white', 'flower_yellow', 'flower_pink']), x, y, 1, 1, solid=True)
            continue
        # planting bed / forest edge: blocked and planted
        for x, y in zip(xs, ys):
            if (x, y) in keep: continue
            blocked[y, x] = True
        for x, y in zip(xs, ys):
            if (x, y) in keep: continue
            big = area >= 6
            r = rnd.random()
            if big and (x + 2 * y) % 4 == 0:
                add(rnd.choice(cfg.get('bed_trees', ['tree_round', 'tree_maple', 'tree_ginkgo', 'tree_sakura'])), x, y, 1, 1, solid=False)
            elif r < .55:
                add(rnd.choice(['bush_round', 'bush_round', 'bush_pink', 'bush_yellow', 'bush_blue']), x, y, 1, 1, solid=False)
            elif r < .75:
                add(rnd.choice(['flower_red', 'flower_white', 'flower_yellow', 'flower_pink']), x, y, 1, 1, solid=False)
            else:
                add('hedge_block', x, y, 1, 1, solid=False)
    if mode == 'old':
        # old collision decides: trees and bushes planted on every old tree tile
        for y in range(th):
            for x in range(tw):
                if old[y][x] == 'T' and (x, y) not in keep:
                    blocked[y, x] = True
                    if bf[y, x] > .3:
                        continue  # old tree tile that is open water now: stays blocked, nothing planted
                    r = rnd.random()
                    crown_clear = all(y - k < 0 or old[y - k][x] == 'T' for k in (1, 2)) and all(0 <= x + k < tw and old[y][x + k] == 'T' for k in (-1, 1))
                    if crown_clear and (x * 7 + y * 13) % cfg.get('tree_mod', 4) == 0:
                        add(rnd.choice(cfg.get('bed_trees', ['tree_round', 'tree_cedar', 'tree_pine', 'tree_round'])), x, y, 1, 1, solid=False)
                    elif r < .55:
                        add(rnd.choice(['bush_round', 'fern', 'bush_round', 'grass_clump']), x, y, 1, 1, solid=False)
        for y in range(th):
            for x in range(tw):
                if old[y][x] not in 'T' and blocked[y, x] is False:
                    pass
    # ---- automatic street life (city maps): lamps along roads, benches on open paving, props beside buildings, themed yards
    if mode == 'color' and cfg.get('auto', True):
        auto_furniture(mid, cfg, img, blocked, keep, decor, rnd, tw, th)
    for item in cfg.get('decor', []):
        name, x, y = item[0], item[1], item[2]
        w = item[3] if len(item) > 3 else 1
        h = item[4] if len(item) > 4 else 1
        add(name, x, y, w, h)
        for yy in range(y, y + h):
            for xx in range(x, x + w):
                keep.discard((xx, yy))
    for (x, y) in keep:
        blocked[y, x] = False
    if mode == 'old':
        tiles = list(old)  # collision letters (tall grass for encounters, stairs, bridges, ...) stay exactly as they were
    else:
        tiles = [''.join('T' if blocked[y, x] else ('"' if old[y][x] == '"' else '.') for x in range(tw)) for y in range(th)]
    return dict(image=cfg['image'], tiles=tiles, decor=decor, keep=sorted(keep))

MAPS = json.load(open(sys.argv[3])) if len(sys.argv) > 3 else {}
out = {}
used = set()
for mid, cfg in MAPS.items():
    r = build(mid, cfg)
    for d in r['decor']: used.add(d['name'])
    out[mid] = r
sizes = {n: load_sprite(n) for n in sorted(SPR)}
objs = {}
for mid, r in out.items():
    lst = []
    for i, d in enumerate(r['decor']):
        fn, (sw, sh) = sizes[d['name']]
        lst.append({'id': f"{mid}_d{i}", 'sprite': 'ob_' + d['name'], 'x': d['x'], 'y': d['y'], 'w': d['w'], 'h': d['h'], 'solid': d['solid'], 'dy': d['dy']})
    objs[mid] = {'image': r['image'], 'tiles': r['tiles'], 'decor': lst}
ts = "/* generated by tools/build_plain.py — do not edit */\nimport type { MapObject } from './maps';\n\n/** every placeable object sprite (palette of the map editor) */\nexport const OBJECT_PALETTE: { name: string; w: number; h: number }[] = " + json.dumps([{'name': 'ob_' + n, 'w': sizes[n][1][0], 'h': sizes[n][1][1]} for n in sorted(SPR)]) + ";\n\nexport const PLAIN_GEN: Record<string, { image: string; tiles: string[]; decor: MapObject[] }> = " + json.dumps(objs, indent=1, ensure_ascii=False) + ";\n"
open(os.path.join(ROOT, 'src', 'content', 'plain.gen.ts'), 'w').write(ts)
print('maps', list(objs), 'sprites', len(sizes), 'decor', {k: len(v['decor']) for k, v in objs.items()})
