"""
Build interior rooms from the Hinomori tile + furniture sheets (art/sheets/hm_*.webp).

Each room is defined below as a grid (W x H tiles, 32 px each):
  rows 0-1   back wall (2 tiles tall, not walkable)
  rows 2..H-2 floor
  row H-1    bottom wall with the door gap
Furniture becomes separate map objects (depth-sorted, exact collision footprints);
floor rugs and wall decorations are baked into the room shell image.

Outputs:
  public/assets/room2_<id>.png      the shell (floor, walls, rugs, wall decorations)
  public/assets/fu_<name>.png       furniture sprites
  src/content/rooms.gen.ts          tile grids + furniture objects for maps.ts

Run: python3 tools/build_rooms.py
"""
import json
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

sys.path.insert(0, os.path.dirname(__file__))
from extract_sheets import ROOT, OUT, load, magenta_mask, resize_px, to_rgba, trim  # noqa: E402

T = 32
SRC_TILE = 104  # sheet pixels per tile (the floor tiles are ~102 px)
SCALE = T / SRC_TILE

_sheets = {}


def sheet(name):
    if name not in _sheets:
        a = load(f'hm_{name}.webp')
        fg = ~magenta_mask(a)
        lab, _ = ndimage.label(ndimage.binary_dilation(fg, iterations=1))
        objs = ndimage.find_objects(lab)
        # order like the labelled contact sheets: rows (by top edge, 40 px tolerance), then left to right
        items = []
        for i, s in enumerate(objs):
            if s is None:
                continue
            h, w = s[0].stop - s[0].start, s[1].stop - s[1].start
            if h * w >= 150:
                items.append((s[0].start, s[1].start, i + 1, s))
        items.sort(key=lambda t: t[0])
        rows = []
        for it in items:
            if rows and abs(rows[-1][0][0] - it[0]) < 40:
                rows[-1].append(it)
            else:
                rows.append([it])
        order = [it for r in rows for it in sorted(r, key=lambda t: t[1])]
        _sheets[name] = (a, fg, lab, order)
    return _sheets[name]


def strict_bg(a):
    """Only real background magenta (purple furniture such as the bed blanket must survive)."""
    r, g, b = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    return (r > 190) & (b > 190) & (g < 90) & (np.abs(r - b) < 45)


def piece(name, idx, scale=SCALE, inset=0, depink=False):
    """One labelled object of a sheet as RGBA, scaled to game size."""
    a, fg, lab, order = sheet(name)
    _, _, li, s = order[idx]
    m = (lab[s] == li) & ~strict_bg(a[s])
    # fill pinholes inside the object, then drop the magenta fringe along the outline
    m = ndimage.binary_fill_holes(m) & ~strict_bg(a[s])
    # peel magenta-tinted anti-aliasing off the outline (twice: fringes are up to 2 px wide)
    sub = a[s]
    pinkish = (sub[:, :, 0] - sub[:, :, 1] > 50) & (sub[:, :, 2] - sub[:, :, 1] > 50)
    for _ in range(3):
        edge = m & ~ndimage.binary_erosion(m)
        m &= ~(edge & pinkish)
    if depink:
        # see-through parts (e.g. gate flaps) show the magenta background: drop every magenta-tinted pixel
        m &= ~pinkish
    img = trim(to_rgba(a[s], m))
    if inset:
        img = img.crop((inset, inset, img.width - inset, img.height - inset))
    h = max(1, round(img.height * scale))
    return resize_px(img, h)


def tile(name, idx, w, h, inset=5):
    """A floor/wall piece without its outline, stretched to w x h px (seamless when repeated)."""
    a, fg, lab, order = sheet(name)
    _, _, li, s = order[idx]
    img = Image.fromarray(a[s].clip(0, 255).astype(np.uint8))
    img = img.crop((inset, inset, img.width - inset, img.height - inset)).convert('RGBA')
    return resize_px(img, h).resize((w, h), Image.NEAREST)


def fit(img, w, h):
    return img.resize((w, h), Image.NEAREST)


# ------------------------------------------------------------------ room definitions
# furniture: (id, sheet, index, x, y, w, h, script)  footprint in tiles; script None = decoration (not solid)
# optional 9th field: dict(counter=True) marks the footprint as counter tiles (talk across),
#   depink=True removes magenta showing through see-through parts,
#   split=0.45 cuts the sprite: the top part (back shelves) is drawn behind people standing behind it

ROOMS = {
    'konbini': dict(
        size=(15, 12), door=[7], floor=('tiles', 7), wall=('tiles', 18),
        wall_items=[('konbini', 53, 7.5, 0.25), ('konbini', 55, 9.0, 0.6)],
        rugs=[('tiles', 67, 7.5, 10.5)],
        furniture=[
            ('fridge1', 'konbini', 0, 0, 2, 1, 1, 'konbini_fridge'),
            ('fridge2', 'konbini', 1, 1, 2, 1, 1, 'konbini_fridge'),
            ('fridge3', 'konbini', 2, 2, 2, 1, 1, 'konbini_fridge'),
            ('fridge4', 'konbini', 3, 3, 2, 1, 1, 'konbini_fridge'),
            ('bento1', 'konbini', 4, 4, 2, 2, 1, 'konbini_bento'),
            ('bento2', 'konbini', 5, 6, 2, 2, 1, 'konbini_bento'),
            ('coffee', 'konbini', 9, 10, 2, 2, 1, 'konbini_coffee'),
            ('hotsnack', 'konbini', 6, 12, 2, 1, 1, 'konbini_counter'),
            ('bakery', 'konbini', 7, 13, 2, 2, 1, 'konbini_counter'),
            ('counter', 'konbini', 22, 10, 4, 5, 1, 'konbini_counter', dict(counter=True)),
            ('shelf1', 'konbini', 12, 1, 5, 3, 1, 'konbini_shelf'),
            ('shelf2', 'konbini', 17, 5, 5, 2, 1, 'konbini_shelf'),
            ('shelf3', 'konbini', 11, 1, 8, 2, 1, 'konbini_shelf'),
            ('shelf4', 'konbini', 13, 3, 8, 1, 1, 'konbini_shelf'),
            ('shelf5', 'konbini', 14, 5, 8, 1, 1, 'konbini_shelf'),
            ('shelf6', 'konbini', 16, 6, 8, 1, 1, 'konbini_shelf'),
            ('ice', 'konbini', 33, 8, 7, 2, 1, 'konbini_ice'),
            ('magazines', 'konbini', 15, 14, 7, 1, 1, 'konbini_magazines'),
            ('atm', 'konbini', 19, 14, 9, 1, 1, 'konbini_atm'),
            ('bins', 'konbini', 40, 11, 10, 2, 1, 'konbini_trash'),
            ('baskets', 'konbini', 26, 5, 10, 1, 1, 'konbini_baskets'),
        ],
    ),
    'cafe': dict(
        size=(13, 12), door=[6], floor=('tiles', 1), wall=('tiles', 17),
        wall_items=[('cafe', 75, 10.5, 0.2), ('cafe', 29, 7.5, 0.35)],
        rugs=[('cafe', 21, 9.0, 7.0), ('tiles', 68, 6.5, 10.5)],
        furniture=[
            ('bar', 'cafe', 0, 0, 3, 7, 1, 'cafe_counter', dict(counter=True, split=0.42)),
            ('cupboard', 'cafe', 5, 8, 2, 2, 1, 'cafe_shelf'),
            ('fridge', 'cafe', 4, 10, 2, 1, 1, 'cafe_shelf'),
            ('clock', 'cafe', 31, 11, 2, 1, 1, 'cafe_clock'),
            ('plant', 'cafe', 16, 12, 2, 1, 1, 'plant'),
            ('table', 'cafe', 7, 1, 6, 2, 1, 'cafe_table'),
            ('table2', 'cafe', 7, 3, 8, 2, 1, 'cafe_table'),
            ('booth_l', 'cafe', 12, 8, 6, 1, 1, 'cafe_table'),
            ('booth_t', 'cafe', 13, 9, 6, 1, 1, 'cafe_table'),
            ('booth_r', 'cafe', 14, 10, 6, 1, 1, 'cafe_table'),
            ('sofa', 'cafe', 19, 9, 9, 2, 1, 'cafe_sofa'),
            ('books', 'cafe', 22, 0, 8, 1, 1, 'cafe_books'),
            ('sign', 'cafe', 48, 4, 10, 1, 1, 'cafe_menu'),
            ('plant2', 'cafe', 53, 0, 10, 1, 1, 'plant'),
            ('plant3', 'cafe', 17, 12, 10, 1, 1, 'plant'),
        ],
    ),
    'apartment': dict(
        size=(12, 12), door=[5, 6], floor=('tiles', 0), wall=('tiles', 15),
        wall_items=[('apartment', 21, 3.5, 0.15), ('apartment', 5, 8.5, 0.2), ('apartment', 26, 11.0, 0.1)],
        rugs=[('apartment', 39, 8.5, 6.9), ('tiles', 68, 6.0, 10.5)],
        furniture=[
            ('bed', 'apartment', 0, 0, 2, 2, 3, 'bed'),
            ('nightstand', 'apartment', 6, 2, 2, 1, 1, 'nightstand'),
            ('desk', 'apartment', 7, 5, 2, 3, 1, 'desk'),
            ('shelf', 'apartment', 2, 8, 2, 1, 1, 'shelf'),
            ('wardrobe', 'apartment', 3, 9, 2, 2, 1, 'wardrobe'),
            ('plant', 'apartment', 16, 11, 2, 1, 1, 'plant'),
            ('tv', 'apartment', 13, 8, 4, 2, 1, 'tv'),
            ('kotatsu', 'apartment', 14, 7, 6, 3, 2, 'kotatsu'),
            ('cushion_b', 'apartment', 18, 6, 7, 1, 1, None),
            ('cushion_r', 'apartment', 19, 10, 7, 1, 1, None),
            ('lamp', 'apartment', 31, 11, 5, 1, 1, 'floorlamp'),
            ('mirror', 'apartment', 30, 0, 8, 1, 1, 'mirror_room'),
            ('kitchen', 'apartment', 17, 0, 10, 3, 1, 'kitchen'),
            ('fridge', 'apartment', 11, 3, 10, 1, 1, 'fridge'),
            ('shoes', 'apartment', 24, 8, 10, 1, 1, 'shoes'),
            ('laundry', 'apartment', 28, 0, 6, 1, 1, 'laundry'),
            ('plant2', 'apartment', 27, 11, 10, 1, 1, 'plant'),
        ],
    ),
    'library': dict(
        size=(14, 12), door=[6, 7], floor=('tiles', 1), wall=('tiles', 15),
        wall_items=[('libstation', 17, 7.0, 0.3)],
        rugs=[('libstation', 28, 3.5, 8.6), ('tiles', 68, 7.0, 10.5)],
        furniture=[
            ('shelf1', 'libstation', 1, 1, 2, 2, 1, 'library_shelf'),
            ('shelf2', 'libstation', 0, 3, 2, 1, 1, 'library_shelf'),
            ('shelf3', 'libstation', 2, 4, 2, 1, 1, 'library_shelf'),
            ('clock', 'cafe', 31, 5, 2, 1, 1, 'library_clock'),
            ('shelf4', 'libstation', 3, 8, 2, 1, 1, 'library_shelf'),
            ('shelf5', 'libstation', 0, 9, 2, 1, 1, 'library_shelf'),
            ('globe', 'libstation', 7, 10, 2, 1, 1, 'library_globe'),
            ('display', 'libstation', 8, 11, 2, 1, 1, 'library_display'),
            ('shelf6', 'libstation', 11, 12, 2, 1, 1, 'library_shelf'),
            ('plant', 'libstation', 25, 13, 2, 1, 1, 'plant'),
            ('table1', 'libstation', 12, 1, 5, 2, 1, 'library_table'),
            ('table2', 'libstation', 14, 4, 5, 2, 1, 'library_table'),
            ('reading', 'libstation', 21, 8, 5, 3, 1, 'library_reading'),
            ('magazines', 'libstation', 24, 13, 5, 1, 1, 'library_magazines'),
            ('desk', 'libstation', 15, 11, 8, 2, 1, 'library_desk', dict(counter=True)),
            ('study', 'libstation', 22, 1, 9, 2, 1, 'library_table'),
            ('cart', 'libstation', 19, 4, 9, 1, 1, 'library_cart'),
            ('plant2', 'libstation', 27, 13, 10, 1, 1, 'plant'),
        ],
    ),
    'station': dict(
        size=(15, 11), door=[7], floor=('tiles', 3), wall=('tiles', 18),
        wall_items=[('libstation', 48, 13.0, 0.15)],
        rugs=[('tiles', 67, 7.5, 9.5)],
        furniture=[
            ('ticket1', 'libstation', 41, 1, 2, 1, 1, 'station_ticket'),
            ('ticket2', 'libstation', 42, 2, 2, 1, 1, 'station_ticket'),
            ('ticket3', 'libstation', 43, 3, 2, 1, 1, 'station_ticket'),
            ('timetable', 'libstation', 40, 5, 2, 5, 1, 'station_timetable'),
            ('gate', 'libstation', 53, 11, 2, 2, 1, 'station_gate', dict(depink=True)),
            ('gate2', 'libstation', 54, 13, 2, 1, 1, 'station_gate', dict(depink=True)),
            ('lockers', 'libstation', 60, 0, 5, 2, 1, 'station_locker'),
            ('vending', 'libstation', 58, 14, 5, 1, 1, 'vending'),
            ('map', 'libstation', 50, 14, 7, 1, 1, 'station_map'),
            ('bench1', 'libstation', 36, 4, 5, 2, 1, 'station_bench'),
            ('bench2', 'libstation', 36, 9, 5, 2, 1, 'station_bench'),
            ('bench3', 'libstation', 37, 4, 7, 1, 1, 'station_bench'),
            ('bench4', 'libstation', 37, 10, 7, 1, 1, 'station_bench'),
            ('bins', 'libstation', 59, 0, 9, 2, 1, 'konbini_trash'),
            ('flowers', 'libstation', 69, 13, 9, 2, 1, 'planter'),
        ],
    ),
}


def build_room(rid, r):
    W, H = r['size']
    img = Image.new('RGBA', (W * T, H * T), (34, 26, 20, 255))
    # floor
    ft = tile(*r['floor'], T, T)
    for y in range(2, H - 1):
        for x in range(W):
            img.alpha_composite(ft, (x * T, y * T))
    for x in r['door']:
        img.alpha_composite(ft, (x * T, (H - 1) * T))
    # back wall: one wall piece per column, 2 tiles tall
    wp = tile(*r['wall'], T, 2 * T, inset=10)
    for x in range(W):
        img.alpha_composite(wp, (x * T, 0))
    # rugs (floor) and wall items, centred on (x, y) in tiles
    for sh, idx, cx, cy in r['rugs']:
        p = piece(sh, idx)
        img.alpha_composite(p, (round(cx * T - p.width / 2), round(cy * T - p.height / 2)))
    for sh, idx, cx, top in r['wall_items']:
        p = piece(sh, idx)
        img.alpha_composite(p, (round(cx * T - p.width / 2), round(top * T)))
    # side beams and bottom wall
    beam = piece('tiles', 22)
    beam = fit(beam, max(6, beam.width), H * T)
    img.alpha_composite(beam, (0, 0))
    img.alpha_composite(beam.transpose(Image.FLIP_LEFT_RIGHT), (W * T - beam.width, 0))
    cap = fit(piece('tiles', 44), T * 2, T)
    for x in range(W):
        if x in r['door']:
            continue
        img.alpha_composite(cap.crop((0, 0, T, T)) if x % 2 == 0 else cap.crop((T, 0, 2 * T, T)), (x * T, (H - 1) * T))
    # door posts
    post = fit(piece('tiles', 45), 10, T + 8)
    d0, d1 = min(r['door']), max(r['door'])
    img.alpha_composite(post, (d0 * T - 6, (H - 1) * T - 8))
    img.alpha_composite(post, ((d1 + 1) * T - 4, (H - 1) * T - 8))
    img.convert('RGB').save(os.path.join(OUT, f'room2_{rid}.png'))

    # tiles + objects
    grid = [['f'] * W for _ in range(H)]
    for y in (0, 1):
        grid[y] = ['W'] * W
    grid[H - 1] = ['D' if x in r['door'] else 'W' for x in range(W)]
    objects = []
    for oid, sh, idx, x, y, w, h, script, *extra in r['furniture']:
        opt = extra[0] if extra else {}
        p = piece(sh, idx, depink=opt.get('depink', False))
        key = f'fu_{rid}_{oid}'
        if opt.get('split'):
            # back part drawn behind people standing behind the counter
            cut = round(p.height * opt['split'])
            back = p.crop((0, 0, p.width, cut))
            back.save(os.path.join(OUT, key + '_back.png'))
            cx = (x + w / 2) * T
            bottom = (y + h) * T
            objects.append({'id': f'{rid}_{oid}_back', 'sprite': key + '_back', 'x': 0, 'y': 0, 'w': 0, 'h': 0, 'solid': False,
                            'at': [round(cx), bottom - p.height + cut]})
            p = p.crop((0, cut, p.width, p.height))
        p.save(os.path.join(OUT, key + '.png'))
        o = {'id': f'{rid}_{oid}', 'sprite': key, 'x': x, 'y': y, 'w': w, 'h': h}
        if script:
            o['script'] = script
        else:
            o['solid'] = False
        if opt.get('counter'):
            for yy in range(y, y + h):
                for xx in range(x, x + w):
                    grid[yy][xx] = 'c'
        objects.append(o)
    return {'tiles': [''.join(row) for row in grid], 'objects': objects, 'image': f'room2_{rid}'}


def main():
    out = {rid: build_room(rid, r) for rid, r in ROOMS.items()}
    ts = '/* generated by tools/build_rooms.py — do not edit */\n'
    ts += "import type { MapObject } from './maps';\n\n"
    ts += 'export const ROOMS_GEN: Record<string, { tiles: string[]; image: string; objects: MapObject[] }> = '
    ts += json.dumps(out, ensure_ascii=False, indent=2) + ';\n'
    open(os.path.join(ROOT, 'src', 'content', 'rooms.gen.ts'), 'w').write(ts)
    print('rooms:', ', '.join(out))


if __name__ == '__main__':
    main()
