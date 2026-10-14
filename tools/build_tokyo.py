"""
Tokyo (chapter 7): five painted ground maps (art/sheets/ground_<name>_draft.webp, 42 x 28 tiles) and the buildings
(art/sheets/hm_exterior_tokyo.webp).

Writes
  public/assets/map_<name>.png, public/assets/bx_t_<map>_<key>.png
  src/content/tokyo.gen.ts  { grids, objects, warps } per map

Collision: colour-based guess (tools/kyoto_grid.py) + the corrections below. Every building plot is blocked as a whole;
the door is a warp tile (or an interaction tile) on the walkway just below the plot.

Run: python3 tools/build_tokyo.py [--overlay DIR]
"""
import json
import os
import sys

from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(__file__))
from build_rooms import piece, sheet  # noqa: E402
from extract_sheets import OUT, ROOT, resize_px  # noqa: E402
from kyoto_grid import guess  # noqa: E402

W, H, T = 42, 28, 32
S = os.path.join(ROOT, 'art', 'sheets')
# index in hm_exterior_tokyo.webp (rows, then left to right)
EXT = {'tower': 0, 'station': 1, 'gate': 2, 'shibuya': 3, 'radio': 4, 'sento': 5, 'kuyakusho': 6, 'kissaten': 7}

# interior entrances: map -> (x, y, facing) where you stand after walking in (filled in once the room sizes are known)
INTERIOR_IN = {'kissaten': (6, 8, 'up'), 'sento': (5, 8, 'up'), 'gamecenter': (6, 8, 'up'), 'yokocho': (5, 8, 'up'),
               'kuyakusho': (5, 8, 'up'), 'radio': (6, 9, 'up')}

# plot = rect of blocked tiles; width = sprite width in tiles (bottom centre sits under the plot); door = walkway tiles
MAPS = {
    'station': dict(ops=[('p', 39, 13, 41, 16)], plots=[
        dict(key='station', spr='station', rect=(13, 3, 28, 7), width=14, door=[(20, 8), (21, 8)], script='tk_station'),
        dict(key='t1', spr='tower', rect=(3, 8, 7, 12), width=5, door=[(5, 13)], script='tk_tower'),
        dict(key='t2', spr='tower', rect=(8, 8, 12, 12), width=5, door=[(10, 13)], script='tk_tower'),
        dict(key='t3', spr='tower', rect=(3, 16, 7, 19), width=4, door=[(5, 20)], script='tk_tower'),
        dict(key='t4', spr='tower', rect=(8, 16, 12, 19), width=4, door=[(10, 20)], script='tk_tower'),
        dict(key='t5', spr='tower', rect=(30, 8, 34, 12), width=5, door=[(32, 13)], script='tk_tower'),
        dict(key='t6', spr='tower', rect=(35, 8, 38, 12), width=5, door=[(36, 13)], script='tk_tower'),
        dict(key='k1', spr='kissaten', rect=(15, 17, 16, 18), width=3, door=[(15, 19), (16, 19)], script='tk_kiosk'),
        dict(key='k2', spr='kissaten', rect=(25, 17, 26, 18), width=3, door=[(25, 19), (26, 19)], script='tk_kiosk'),
    ], exits=[('s', [19, 20, 21, 22], 'shibuya', (20, 2, 'down')), ('e', [14, 15], 'asakusa', (1, 21, 'right'))]),
    'asakusa': dict(ops=[('p', 36, 21, 41, 27), ('p', 28, 13, 36, 14), ('p', 28, 9, 29, 14)], plots=[
        dict(key='gate', spr='gate', rect=(19, 1, 24, 4), width=6, door=[(21, 5), (22, 5)], script='as_gate'),
        dict(key='kissaten', spr='kissaten', rect=(9, 4, 11, 5), width=3, door=[(10, 6)], enter='kissaten'),
        dict(key='sento', spr='sento', rect=(8, 10, 12, 11), width=5, door=[(9, 12), (10, 12)], enter='sento'),
        dict(key='s1', spr='kissaten', rect=(16, 9, 18, 10), width=3, door=[(17, 11)], script='as_stall'),
        dict(key='s2', spr='kissaten', rect=(16, 13, 18, 14), width=3, door=[(17, 15)], script='as_stall'),
        dict(key='s3', spr='kissaten', rect=(24, 9, 26, 10), width=3, door=[(25, 11)], script='as_stall'),
        dict(key='s4', spr='kissaten', rect=(24, 13, 26, 14), width=3, door=[(25, 15)], script='as_stall'),
        dict(key='h1', spr='kissaten', rect=(30, 10, 33, 12), width=4, door=[(31, 13), (32, 13)], script='as_shop'),
    ], exits=[('w', [20, 21, 22], 'station', (40, 14, 'left')), ('e', [24, 25, 26], 'sumida', (1, 20, 'right'))]),
    'shibuya': dict(ops=[('p', 39, 11, 41, 14)], plots=[
        dict(key='game', spr='shibuya', rect=(6, 3, 14, 9), width=5, door=[(9, 10), (10, 10)], enter='gamecenter'),
        dict(key='t1', spr='tower', rect=(28, 3, 35, 9), width=5, door=[(31, 10), (32, 10)], script='sb_tower'),
        dict(key='t2', spr='tower', rect=(3, 15, 8, 20), width=5, door=[(5, 21), (6, 21)], script='sb_tower'),
        dict(key='t3', spr='tower', rect=(28, 15, 33, 20), width=5, door=[(30, 21), (31, 21)], script='sb_tower'),
        dict(key='t4', spr='shibuya', rect=(34, 15, 39, 20), width=5, door=[(36, 21), (37, 21)], script='sb_shop'),
        dict(key='k1', spr='kissaten', rect=(16, 19, 17, 20), width=3, door=[(16, 21), (17, 21)], script='sb_shop'),
    ], exits=[('n', [19, 20, 21], 'station', (20, 26, 'up')), ('e', [12, 13, 14], 'shinjuku', (1, 12, 'right'))]),
    'shinjuku': dict(ops=[('p', 0, 10, 3, 14), ('p', 38, 12, 41, 14), ('"', 32, 3, 39, 7)] + [('p', 37, 18, 38, 24), ('p', 34, 17, 38, 19), ('p', 31, 14, 35, 18), ('p', 30, 10, 32, 15), ('p', 30, 8, 32, 11), ('p', 31, 7, 34, 9), ('p', 33, 5, 34, 8)], plots=[
        dict(key='kuyaku', spr='kuyakusho', rect=(2, 4, 6, 8), width=5, door=[(4, 9), (5, 9)], enter='kuyakusho'),
        dict(key='t1', spr='tower', rect=(9, 4, 14, 8), width=5, door=[(11, 9), (12, 9)], script='sj_tower'),
        dict(key='t2', spr='tower', rect=(2, 16, 9, 20), width=6, door=[(5, 21), (6, 21)], script='sj_tower'),
        dict(key='t3', spr='tower', rect=(13, 16, 15, 20), width=5, door=[(13, 21), (14, 21)], script='sj_tower'),
        dict(key='yokocho', spr='kissaten', rect=(21, 10, 23, 12), width=3, door=[(22, 13)], enter='yokocho'),
        dict(key='a1', spr='kissaten', rect=(17, 4, 19, 6), width=3, door=[(18, 7)], script='sj_alley'),
        dict(key='a2', spr='kissaten', rect=(21, 5, 23, 7), width=3, door=[(22, 8)], script='sj_alley'),
        dict(key='a3', spr='kissaten', rect=(17, 12, 19, 14), width=3, door=[(18, 15)], script='sj_alley'),
        dict(key='a4', spr='kissaten', rect=(17, 17, 19, 19), width=3, door=[(18, 20)], script='sj_alley'),
    ], exits=[('w', [11, 12, 13], 'shibuya', (40, 13, 'left')), ('e', [12, 13, 14], 'sumida', (40, 20, 'left'))]),
    'sumida': dict(ops=[('b', 4, 9, 5, 18), ('b', 32, 9, 34, 19), ('p', 0, 19, 3, 21), ('p', 38, 19, 41, 21), ('"', 1, 21, 12, 25)], plots=[
        dict(key='radio', spr='radio', rect=(15, 4, 20, 7), width=5, door=[(17, 8), (18, 8)], enter='radio'),
        dict(key='share', spr='kissaten', rect=(29, 3, 31, 5), width=4, door=[(30, 6)], script='sm_share'),
        dict(key='hut', spr='kissaten', rect=(17, 22, 18, 23), width=3, door=[(17, 24), (18, 24)], script='sm_hut'),
    ], exits=[('w', [19, 20, 21], 'asakusa', (36, 25, 'left')), ('e', [19, 20, 21], 'shinjuku', (40, 13, 'left'))]),
}


def build(name, spec):
    g = [list(r) for r in guess(os.path.join(S, f'ground_{name}_draft.webp'), asphalt_blocks=False)]
    for ch, x0, y0, x1, y1 in spec['ops']:
        for y in range(max(0, y0), min(H - 1, y1) + 1):
            for x in range(max(0, x0), min(W - 1, x1) + 1):
                g[y][x] = ch
    for p in spec['plots']:
        x0, y0, x1, y1 = p['rect']
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                g[y][x] = 'T'
        for x, y in p['door']:
            if g[y][x] in 'T~':
                g[y][x] = 'p'
    return g


def main():
    sheet('exterior_tokyo')
    grids, objects, warps = {}, {}, {}
    cache = {}
    for name, spec in MAPS.items():
        g = build(name, spec)
        objs, wps = [], []
        for p in spec['plots']:
            sp = p['spr']
            if sp not in cache:
                cache[sp] = piece('exterior_tokyo', EXT[sp], scale=1)
            img = cache[sp]
            spr = resize_px(img, round(img.height * p['width'] * T / img.width))
            key = f'bx_t_{name}_{p["key"]}'
            spr.save(os.path.join(OUT, key + '.png'))
            x0, y0, x1, y1 = p['rect']
            o = {'id': f't_{name}_{p["key"]}', 'sprite': key, 'x': x0, 'y': y0, 'w': x1 - x0 + 1, 'h': y1 - y0 + 1,
                 'at': [round((x0 + x1 + 1) / 2 * T), (y1 + 1) * T]}
            if p.get('enter'):
                o['script'] = 't_door'
                o['interactAt'] = [{'x': x, 'y': y} for x, y in p['door']]
                for x, y in p['door']:
                    ix, iy, f = INTERIOR_IN[p['enter']]
                    wps.append({'x': x, 'y': y, 'to': {'map': p['enter'], 'x': ix, 'y': iy, 'facing': f}})
            else:
                o['script'] = p['script']
                o['interactAt'] = [{'x': x, 'y': y} for x, y in p['door']]
            objs.append(o)
        MAPID = {k: 't_' + k for k in MAPS}
        for side, xs, to, (tx, ty, f) in spec['exits']:
            to = MAPID[to]
            for v in xs:
                pos = {'n': (v, 0), 's': (v, H - 1), 'w': (0, v), 'e': (W - 1, v), 'b': (v, H - 1)}[side]
                wps.append({'x': pos[0], 'y': pos[1], 'to': {'map': to, 'x': tx + (v - xs[0] if side in 'ns' and False else 0), 'y': ty, 'facing': f}})
        grids[name] = [''.join(r) for r in g]
        objects[name] = objs
        warps[name] = wps
        Image.open(os.path.join(S, f'ground_{name}_draft.webp')).convert('RGB').resize((W * T, H * T), Image.LANCZOS).save(os.path.join(OUT, f'map_{name}.png'))
    ts = ('/* generated by tools/build_tokyo.py — do not edit */\nimport type { MapObject, Warp } from \'./maps\';\n\n'
          'export const TOKYO_GEN: Record<string, { tiles: string[]; objects: MapObject[]; warps: Warp[] }> = '
          + json.dumps({k: {'tiles': grids[k], 'objects': objects[k], 'warps': warps[k]} for k in grids}, ensure_ascii=False, indent=1) + ';\n')
    open(os.path.join(ROOT, 'src', 'content', 'tokyo.gen.ts'), 'w').write(ts)
    if '--overlay' in sys.argv:
        d = sys.argv[sys.argv.index('--overlay') + 1]
        os.makedirs(d, exist_ok=True)
        for name, rows in grids.items():
            im = Image.open(os.path.join(OUT, f'map_{name}.png')).convert('RGBA')
            for o in objects[name]:
                b = Image.open(os.path.join(OUT, o['sprite'] + '.png')).convert('RGBA')
                im.alpha_composite(b, (round(o['at'][0] - b.width / 2), o['at'][1] - b.height))
            ov = Image.new('RGBA', im.size, (0, 0, 0, 0))
            dr = ImageDraw.Draw(ov)
            col = {'T': (255, 0, 0, 95), 'H': (255, 255, 0, 90), 'b': (0, 160, 255, 90), '"': (0, 255, 0, 80)}
            for y, r in enumerate(rows):
                for x, ch in enumerate(r):
                    if ch in col:
                        dr.rectangle([x * T, y * T, x * T + T - 1, y * T + T - 1], fill=col[ch])
            for w in warps[name]:
                dr.rectangle([w['x'] * T, w['y'] * T, w['x'] * T + T - 1, w['y'] * T + T - 1], fill=(255, 0, 255, 140))
            res = Image.alpha_composite(im, ov).convert('RGB')
            dd = ImageDraw.Draw(res)
            for x in range(0, W, 2):
                for y in range(0, H, 2):
                    dd.text((x * T + 2, y * T + 1), f'{x},{y}', fill=(255, 255, 0))
            res.resize((W * T * 3 // 2, H * T * 3 // 2), Image.LANCZOS).save(os.path.join(d, f'chk_{name}.png'))
    print('maps:', ', '.join(grids))


if __name__ == '__main__':
    main()
