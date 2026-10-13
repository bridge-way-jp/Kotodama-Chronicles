"""
Kyoto (chapter 5): five painted ground maps (art/sheets/ground_<name>_draft.webp, 42 x 28 tiles each) and the town buildings
(art/sheets/hm_exterior_kyoto.webp).

Writes:
  public/assets/map_<name>.png     the ground picture scaled to the grid
  public/assets/bx_k_<name>.png    the buildings
  src/content/kyoto.gen.ts         collision / terrain grids

Collision: a colour-based first guess (tools/kyoto_grid.py: asphalt, water and tree crowns are blocked) corrected by hand below.
Legend: . walkable  : gravel/dirt  " tall grass (wild Kotodama)  p pavement  b bridge / stepping stones  H stairs  T blocked

Run: python3 tools/build_kyoto.py   (and  --overlay <dir>  to write check pictures)
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

# ---- exterior sheet: index in hm_exterior_kyoto.webp
EXT = {'station': 0, 'guesthouse': 1, 'tea_house': 2, 'kimono_shop': 3, 'machiya': 4, 'shrine': 5, 'market_shop': 6, 'konbini': 8, 'kiosk': 7}

# map -> ops, applied in order: (char, x0, y0, x1, y1) inclusive tiles
MAPS = {
    'bahnhof': dict(base='guess', ops=[
        ('T', 0, 0, 41, 1), ('T', 0, 1, 1, 19), ('T', 2, 1, 3, 3), ('T', 4, 4, 5, 6), ('T', 8, 4, 8, 6), ('T', 4, 7, 8, 10), ('T', 8, 7, 8, 13),
        ('T', 4, 12, 6, 13), ('T', 7, 13, 8, 14), ('T', 10, 6, 11, 8), ('T', 14, 7, 18, 8), ('T', 23, 7, 26, 8), ('T', 30, 6, 31, 8),
        ('T', 34, 7, 38, 9), ('T', 33, 4, 33, 6), ('T', 36, 4, 38, 6), ('T', 38, 1, 39, 3), ('T', 40, 1, 41, 9), ('T', 3, 15, 8, 19),
        ('T', 35, 10, 40, 17), ('T', 30, 11, 31, 18), ('T', 3, 20, 15, 22), ('T', 26, 20, 37, 22), ('T', 0, 25, 16, 27), ('T', 24, 25, 39, 27),
        ('T', 38, 19, 38, 21),
        ('p', 19, 10, 21, 19), ('p', 19, 22, 21, 25), ('p', 20, 10, 21, 10), ('p', 17, 25, 23, 27),
        ('T', 20, 12, 21, 14), ('T', 20, 15, 21, 17),
        ('H', 6, 4, 7, 6), ('H', 2, 7, 3, 8), ('H', 9, 7, 9, 8), ('H', 12, 7, 13, 8), ('H', 19, 7, 22, 8), ('H', 27, 7, 28, 8), ('H', 32, 7, 33, 8),
        ('H', 39, 7, 39, 8), ('H', 34, 5, 35, 6),
        ('T', 15, 5, 26, 6),  # the station building
    ], buildings={'station': (384, 15, 5, 12, 2), 'kiosk': (160, 4, 17, 5, 2), 'konbini': (192, 35, 12, 6, 2)}),
    'kamogawa': dict(base='guess', ops=[
        ('T', 0, 0, 41, 0), ('T', 0, 3, 41, 5), ('T', 0, 6, 41, 10), ('T', 0, 11, 41, 11), ('T', 0, 14, 41, 16), ('T', 0, 22, 41, 22),
        ('T', 0, 25, 41, 27), ('T', 0, 10, 0, 27), ('T', 39, 10, 41, 27), ('T', 37, 3, 41, 5),
        ('T', 5, 13, 11, 15), ('T', 5, 19, 12, 21), ('T', 17, 19, 24, 21), ('T', 29, 19, 33, 21),
        ('.', 1, 1, 40, 2), ('"', 2, 1, 12, 2), ('p', 1, 17, 35, 18), ('p', 0, 23, 38, 24), ('p', 36, 14, 38, 24), (':', 0, 12, 40, 13), ('p', 39, 14, 41, 15),
        ('H', 8, 3, 8, 5), ('H', 26, 3, 27, 5), ('H', 13, 14, 14, 16), ('H', 31, 14, 32, 16), ('H', 14, 19, 15, 22), ('H', 26, 19, 27, 22),
        ('H', 2, 19, 3, 22), ('H', 20, 11, 20, 11),
        ('b', 35, 2, 36, 12),
        ('b', 26, 6, 26, 6), ('b', 25, 6, 25, 7), ('b', 24, 7, 24, 8), ('b', 21, 8, 23, 8), ('b', 20, 9, 21, 9), ('b', 20, 10, 20, 10),
    ], buildings={'tea_house': (128, 6, 14, 4, 2), 'machiya': (105, 5, 20, 3, 2), 'market_shop': (128, 9, 20, 4, 2),
                  'kimono_shop': (160, 18, 20, 5, 2), 'machiya2': (105, 30, 20, 3, 2)}),
    'gion': dict(base='guess', ops=[
        ('T', 3, 4, 9, 7), ('T', 3, 10, 9, 13), ('T', 3, 14, 10, 16), ('T', 28, 6, 38, 11), ('T', 24, 2, 29, 5), ('T', 26, 16, 32, 19),
        ('T', 12, 0, 15, 7), ('T', 13, 10, 16, 19), ('T', 13, 16, 20, 19), ('T', 14, 14, 20, 15), ('T', 22, 14, 37, 23),
        ('T', 20, 9, 21, 11),
        ('b', 14, 8, 15, 9), ('p', 11, 8, 12, 9), ('p', 16, 8, 17, 9),
        ('H', 20, 5, 22, 6), ('p', 20, 3, 22, 4), ('H', 20, 14, 21, 15), ('b', 21, 16, 21, 17), ('p', 20, 18, 21, 22), ('H', 38, 1, 39, 3),
        ('.', 29, 20, 31, 20), ('b', 30, 21, 30, 23), ('b', 38, 17, 39, 19),
        ('p', 0, 17, 2, 18),
    ], buildings={'machiya': (96, 3, 6, 3, 2), 'machiya2': (96, 6, 6, 3, 2), 'machiya3': (96, 3, 12, 3, 2), 'machiya4': (96, 6, 12, 3, 2),
                  'kimono_shop': (160, 5, 15, 5, 2), 'guesthouse': (192, 31, 9, 6, 2), 'tea_house': (192, 26, 18, 6, 2), 'machiya5': (96, 25, 4, 3, 2)}),
    'nishiki': dict(base='guess', ops=[
        ('T', 7, 6, 19, 10), ('T', 22, 6, 34, 10), ('T', 7, 14, 19, 19), ('T', 22, 14, 34, 19),
        ('T', 8, 2, 19, 3), ('T', 23, 2, 32, 3), ('T', 8, 22, 19, 23), ('T', 23, 22, 32, 23),
        ('T', 6, 0, 19, 1), ('T', 23, 0, 34, 1), ('T', 7, 24, 19, 24), ('T', 23, 24, 33, 24),
        ('T', 2, 1, 6, 3), ('T', 35, 1, 39, 3), ('T', 2, 22, 6, 23), ('T', 34, 22, 39, 23),
        ('T', 0, 0, 1, 10), ('T', 0, 14, 1, 19), ('T', 0, 24, 1, 27), ('T', 40, 0, 41, 10), ('T', 40, 14, 41, 19), ('T', 40, 24, 41, 27),
        ('p', 0, 11, 41, 13), ('p', 20, 0, 21, 27),
        ('p', 8, 10, 9, 10), ('p', 12, 10, 13, 10), ('p', 16, 10, 17, 10), ('p', 23, 10, 24, 10), ('p', 28, 10, 29, 10), ('p', 32, 10, 33, 10),
        ('p', 8, 14, 9, 14), ('p', 12, 14, 13, 14), ('p', 16, 14, 17, 14), ('p', 23, 14, 24, 14), ('p', 28, 14, 29, 14), ('p', 32, 14, 33, 14),
        ('p', 8, 19, 9, 19), ('p', 12, 19, 13, 19), ('p', 16, 19, 17, 19), ('p', 23, 19, 24, 19), ('p', 28, 19, 29, 19), ('p', 32, 19, 33, 19),
    ] + [('T', x, 8, x + 3, 9) for x in (7, 11, 15, 22, 27, 31)] + [('T', x, 17, x + 3, 18) for x in (7, 11, 15, 22, 27, 31)],
        buildings={}),
    'fushimi': dict(base='T', ops=[
        ('p', 19, 20, 22, 27), ('p', 18, 20, 23, 24), ('p', 15, 19, 26, 19), ('p', 15, 18, 17, 18), ('p', 24, 18, 26, 18), ('H', 20, 18, 21, 18),
        ('p', 11, 20, 31, 20), ('H', 13, 20, 14, 21), ('H', 28, 20, 28, 21),
        ('p', 17, 15, 24, 17), ('H', 19, 12, 20, 14), ('p', 19, 10, 20, 11),
        (':', 19, 9, 25, 10), (':', 25, 8, 26, 9), (':', 17, 6, 25, 7), (':', 17, 5, 18, 6), (':', 18, 3, 26, 4), (':', 27, 3, 31, 4), (':', 28, 1, 33, 2),
        (':', 26, 17, 27, 17), (':', 27, 16, 28, 16), (':', 28, 15, 29, 15), (':', 29, 14, 30, 14), (':', 30, 13, 31, 13), (':', 31, 12, 32, 12),
        ('"', 32, 11, 33, 12), ('"', 33, 8, 40, 15),
        ('T', 11, 17, 15, 19), ('T', 27, 17, 30, 19), ('T', 21, 15, 24, 16),
    ], buildings={'shrine': (128, 21, 15, 4, 2), 'tea_house': (128, 11, 18, 4, 2), 'market_shop': (128, 27, 18, 4, 2)}),
}

# shops of Nishiki: the same two sprites, 12 plots
for i, x in enumerate((7, 11, 15, 22, 27, 31)):
    MAPS['nishiki']['buildings'][f'shop_t{i}'] = (120, x, 8, 4, 2)
    MAPS['nishiki']['buildings'][f'shop_b{i}'] = (120, x, 17, 4, 2)


def sprite_of(key):
    for name, idx in EXT.items():
        if key.rstrip('0123456789').split('_t')[0].split('_b')[0] == name or key.startswith(name):
            return name
    return None


def sprite_name(key):
    base = key
    if key.startswith('shop_'):
        return 'market_shop' if int(key[-1]) % 2 == 0 else 'machiya'
    if key[-1].isdigit():
        base = key[:-1]
    return base


def build_map(name, spec):
    g = [list(r) for r in (guess(os.path.join(S, f'ground_{name}_draft.webp')) if spec['base'] == 'guess' else ['T' * W] * H)]
    for ch, x0, y0, x1, y1 in spec['ops']:
        for y in range(max(0, y0), min(H - 1, y1) + 1):
            for x in range(max(0, x0), min(W - 1, x1) + 1):
                g[y][x] = ch
    return g


def main():
    sheet('exterior_kyoto')
    out = {}
    sprites = {}
    for name, spec in MAPS.items():
        g = build_map(name, spec)
        for key, (width, fx, fy, fw, fh) in spec['buildings'].items():
            sp = sprite_name(key)
            if sp not in sprites:
                sprites[sp] = piece('exterior_kyoto', EXT[sp], scale=1)
            img = sprites[sp]
            resize_px(img, round(img.height * width / img.width)).save(os.path.join(OUT, f'bx_k_{name}_{key}.png'))
            for y in range(fy, fy + fh):
                for x in range(fx, fx + fw):
                    g[y][x] = 'T'
        rows = [''.join(r) for r in g]
        out[name] = rows
        src = Image.open(os.path.join(S, f'ground_{name}_draft.webp')).convert('RGB')
        src.resize((W * T, H * T), Image.LANCZOS).save(os.path.join(OUT, f'map_{name}.png'))
    ts = '/* generated by tools/build_kyoto.py — do not edit */\nexport const KYOTO_GEN: Record<string, string[]> = ' + json.dumps(out, indent=2) + ';\n'
    open(os.path.join(ROOT, 'src', 'content', 'kyoto.gen.ts'), 'w').write(ts)
    if '--overlay' in sys.argv:
        d = sys.argv[sys.argv.index('--overlay') + 1]
        os.makedirs(d, exist_ok=True)
        for name, rows in out.items():
            im = Image.open(os.path.join(OUT, f'map_{name}.png')).convert('RGBA')
            ov = Image.new('RGBA', im.size, (0, 0, 0, 0))
            dr = ImageDraw.Draw(ov)
            col = {'T': (255, 0, 0, 95), 'H': (255, 255, 0, 90), 'b': (0, 160, 255, 90), '"': (0, 255, 0, 80)}
            for y, r in enumerate(rows):
                for x, ch in enumerate(r):
                    if ch in col:
                        dr.rectangle([x * T, y * T, x * T + T - 1, y * T + T - 1], fill=col[ch])
            for key, (width, fx, fy, fw, fh) in MAPS[name]['buildings'].items():
                p = os.path.join(OUT, f'bx_k_{name}_{key}.png')
                b = Image.open(p).convert('RGBA')
                im.alpha_composite(b, (round((fx + fw / 2) * T - b.width / 2), (fy + fh) * T - b.height))
            res = Image.alpha_composite(im, ov).convert('RGB')
            dd = ImageDraw.Draw(res)
            for x in range(0, W, 2):
                for y in range(0, H, 2):
                    dd.text((x * T + 2, y * T + 1), f'{x},{y}', fill=(255, 255, 0))
            res.resize((W * T * 3 // 2, H * T * 3 // 2), Image.LANCZOS).save(os.path.join(d, f'chk_{name}.png'))
    print('maps:', ', '.join(out))


if __name__ == '__main__':
    main()
