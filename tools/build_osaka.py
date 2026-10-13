"""
Osaka (chapter 6): five painted ground maps (art/sheets/ground_<name>_draft.webp, 42 x 28 tiles) and the buildings
(art/sheets/hm_exterior_osaka.webp).

Writes
  public/assets/map_<name>.png, public/assets/bx_o_<map>_<key>.png
  src/content/osaka.gen.ts  { grids, objects, warps } per map

Collision: colour-based guess (tools/kyoto_grid.py) + the corrections below. Every building plot is blocked as a whole;
the door is a warp tile (or an interaction tile) on the walkway just below the plot.

Run: python3 tools/build_osaka.py [--overlay DIR]
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
# index in hm_exterior_osaka.webp (rows, then left to right)
EXT = {'tower': 0, 'hall': 1, 'station': 2, 'tsuten': 3, 'castle': 4, 'tako': 5, 'okonomi': 6, 'kushi': 7}

# interior entrances: map -> (x, y, facing) where you stand after walking in
INTERIOR_IN = {'buero': (6, 9, 'up'), 'empfang': (5, 8, 'up'), 'takoladen': (5, 8, 'up'), 'okonomi': (6, 8, 'up'), 'konbini2': (6, 8, 'up'), 'kushikatsu': (5, 8, 'up')}

# plot = (x0, y0, x1, y1) inclusive tiles that are blocked; width = sprite width in tiles; door = tiles below the plot;
# enter = interior map id (door warps in), script = object script (door interaction otherwise)
MAPS = {
    'umeda': dict(ops=[('p', 0, 14, 41, 14), ('p', 0, 22, 41, 22), ('p', 19, 22, 21, 27), ('p', 19, 7, 22, 8)], plots=[
        dict(key='station', spr='station', rect=(11, 2, 30, 6), width=14, door=[(20, 7), (21, 7)], script='umeda_station'),
        dict(key='t1', spr='tower', rect=(4, 8, 12, 13), width=6, door=[(8, 14), (9, 14)], enter='buero'),
        dict(key='t2', spr='tower', rect=(4, 16, 12, 21), width=6, door=[(8, 22), (9, 22)], enter='empfang'),
        dict(key='t3', spr='tower', rect=(29, 8, 38, 13), width=6, door=[(33, 14), (34, 14)], script='umeda_tower'),
        dict(key='t4', spr='tower', rect=(29, 16, 38, 21), width=6, door=[(33, 22), (34, 22)], enter='konbini2'),
        dict(key='s1', spr='tako', rect=(17, 17, 19, 20), width=4, door=[(18, 21)], script='umeda_stall'),
        dict(key='s2', spr='kushi', rect=(22, 17, 25, 20), width=5, door=[(23, 21), (24, 21)], script='umeda_stall'),
    ], exits=[('s', [19, 20, 21], 'nakanoshima', (20, 1, 'down'))]),
    'nakanoshima': dict(ops=[('p', 0, 7, 41, 8), ('p', 36, 16, 39, 27), ('T', 0, 19, 35, 27), ('T', 40, 19, 41, 27), ('b', 17, 19, 21, 21), ('p', 38, 9, 41, 18)], plots=[
        dict(key='hall', spr='hall', rect=(5, 2, 11, 6), width=9, door=[(8, 7), (9, 7)], script='nakano_hall'),
        dict(key='c1', spr='okonomi', rect=(14, 2, 16, 6), width=4, door=[(15, 7)], script='nakano_cafe'),
        dict(key='tw', spr='tower', rect=(22, 2, 30, 6), width=6, door=[(26, 7), (27, 7)], script='umeda_tower'),
        dict(key='c2', spr='tako', rect=(35, 2, 37, 6), width=4, door=[(36, 7)], script='nakano_cafe'),
    ], exits=[('n', [19, 20, 21], 'umeda', (20, 26, 'up')), ('b', [37, 38], 'dotonbori', (38, 1, 'down')), ('e', [10, 11, 12], 'osakajo', (1, 7, 'right'))]),
    'dotonbori': dict(ops=[('T', 0, 13, 41, 13), ('T', 0, 14, 41, 19), ('b', 16, 13, 18, 19), ('b', 34, 13, 36, 19), ('p', 0, 11, 41, 12), ('p', 0, 20, 33, 21), ('p', 16, 20, 18, 21), ('p', 34, 20, 36, 27), ('p', 37, 24, 39, 27), ('p', 38, 0, 39, 11)], plots=[
        dict(key='a', spr='kushi', rect=(2, 4, 4, 11), width=4, door=[(3, 12)], script='doton_shop'),
        dict(key='b', spr='tako', rect=(6, 4, 9, 11), width=5, door=[(7, 12), (8, 12)], enter='takoladen'),
        dict(key='c', spr='okonomi', rect=(11, 4, 14, 11), width=5, door=[(12, 12), (13, 12)], enter='okonomi'),
        dict(key='d', spr='okonomi', rect=(17, 4, 20, 11), width=5, door=[(18, 12), (19, 12)], script='doton_shop'),
        dict(key='e', spr='tako', rect=(21, 4, 24, 11), width=5, door=[(22, 12), (23, 12)], script='doton_shop'),
        dict(key='f', spr='kushi', rect=(26, 4, 29, 11), width=5, door=[(27, 12), (28, 12)], script='doton_shop'),
        dict(key='g', spr='hall', rect=(32, 4, 36, 11), width=8, door=[(34, 12), (35, 12)], script='doton_hall'),
    ], exits=[('n', [37, 38, 39], 'nakanoshima', (38, 26, 'up')), ('s', [35, 36, 37], 'shinsekai', (20, 1, 'down'))]),
    'shinsekai': dict(ops=[('p', 0, 15, 41, 16), ('p', 19, 0, 21, 27)], plots=[
        dict(key='tower', spr='tsuten', rect=(19, 11, 22, 14), width=5, door=[(20, 15), (21, 15)], script='shin_tower'),
        dict(key='a', spr='kushi', rect=(3, 11, 6, 14), width=5, door=[(4, 15), (5, 15)], enter='kushikatsu'),
        dict(key='b', spr='okonomi', rect=(10, 11, 14, 14), width=5, door=[(11, 15), (12, 15)], script='shin_shop'),
        dict(key='c', spr='tako', rect=(28, 11, 32, 14), width=5, door=[(29, 15), (30, 15)], script='shin_shop'),
        dict(key='d', spr='kushi', rect=(36, 11, 38, 14), width=4, door=[(37, 15)], script='shin_shop'),
        dict(key='e', spr='okonomi', rect=(17, 1, 19, 6), width=4, door=[(18, 7)], script='shin_shop'),
        dict(key='f', spr='tako', rect=(23, 1, 25, 6), width=4, door=[(24, 7)], script='shin_shop'),
        dict(key='g', spr='kushi', rect=(17, 19, 19, 23), width=4, door=[(18, 24)], script='shin_shop'),
        dict(key='h', spr='okonomi', rect=(23, 19, 25, 23), width=4, door=[(24, 24)], script='shin_shop'),
    ], exits=[('n', [19, 20, 21], 'dotonbori', (36, 26, 'up'))]),
    'osakajo': dict(ops=[('"', 3, 6, 7, 12), ('p', 20, 17, 23, 26), ('p', 20, 10, 23, 16), ('p', 0, 5, 1, 8), ('p', 0, 9, 2, 13), ('p', 1, 13, 11, 13)], plots=[
        dict(key='castle', spr='castle', rect=(15, 2, 29, 9), width=7, door=[(21, 10), (22, 10), (23, 10)], script='osaka_castle'),
        dict(key='t1', spr='tako', rect=(14, 21, 16, 22), width=4, door=[(15, 24)], script='castle_stall'),
        dict(key='t2', spr='okonomi', rect=(28, 21, 30, 22), width=4, door=[(29, 24)], script='castle_stall'),
    ], exits=[('w', [5, 6, 7, 8], 'nakanoshima', (40, 11, 'left'))]),
}


def build(name, spec):
    g = [list(r) for r in guess(os.path.join(S, f'ground_{name}_draft.webp'))]
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
    sheet('exterior_osaka')
    grids, objects, warps = {}, {}, {}
    cache = {}
    for name, spec in MAPS.items():
        g = build(name, spec)
        objs, wps = [], []
        for p in spec['plots']:
            sp = p['spr']
            if sp not in cache:
                cache[sp] = piece('exterior_osaka', EXT[sp], scale=1)
            img = cache[sp]
            spr = resize_px(img, round(img.height * p['width'] * T / img.width))
            key = f'bx_o_{name}_{p["key"]}'
            spr.save(os.path.join(OUT, key + '.png'))
            x0, y0, x1, y1 = p['rect']
            o = {'id': f'o_{name}_{p["key"]}', 'sprite': key, 'x': x0, 'y': y0, 'w': x1 - x0 + 1, 'h': y1 - y0 + 1,
                 'at': [round((x0 + x1 + 1) / 2 * T), (y1 + 1) * T]}
            if p.get('enter'):
                o['script'] = 'o_door'
                o['interactAt'] = [{'x': x, 'y': y} for x, y in p['door']]
                for x, y in p['door']:
                    ix, iy, f = INTERIOR_IN[p['enter']]
                    wps.append({'x': x, 'y': y, 'to': {'map': p['enter'], 'x': ix, 'y': iy, 'facing': f}})
            else:
                o['script'] = p['script']
                o['interactAt'] = [{'x': x, 'y': y} for x, y in p['door']]
            objs.append(o)
        MAPID = {'umeda': 'o_umeda', 'nakanoshima': 'o_nakanoshima', 'dotonbori': 'o_dotonbori', 'shinsekai': 'o_shinsekai', 'osakajo': 'o_castle'}
        for side, xs, to, (tx, ty, f) in spec['exits']:
            to = MAPID[to]
            for v in xs:
                pos = {'n': (v, 0), 's': (v, H - 1), 'w': (0, v), 'e': (W - 1, v), 'b': (v, H - 1)}[side]
                wps.append({'x': pos[0], 'y': pos[1], 'to': {'map': to, 'x': tx + (v - xs[0] if side in 'ns' and False else 0), 'y': ty, 'facing': f}})
        grids[name] = [''.join(r) for r in g]
        objects[name] = objs
        warps[name] = wps
        Image.open(os.path.join(S, f'ground_{name}_draft.webp')).convert('RGB').resize((W * T, H * T), Image.LANCZOS).save(os.path.join(OUT, f'map_{name}.png'))
    ts = ('/* generated by tools/build_osaka.py — do not edit */\nimport type { MapObject, Warp } from \'./maps\';\n\n'
          'export const OSAKA_GEN: Record<string, { tiles: string[]; objects: MapObject[]; warps: Warp[] }> = '
          + json.dumps({k: {'tiles': grids[k], 'objects': objects[k], 'warps': warps[k]} for k in grids}, ensure_ascii=False, indent=1) + ';\n')
    open(os.path.join(ROOT, 'src', 'content', 'osaka.gen.ts'), 'w').write(ts)
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
