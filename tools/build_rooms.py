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
#   tw=1.5 scales the piece to that width in tiles (for sheets drawn at another scale),
#   depink=True removes magenta showing through see-through parts,
#   split=0.45 cuts the sprite: the top part (back shelves) is drawn behind people standing behind it

ROOMS = {
    # painted as one picture (art/sheets/room_konbini_v2.webp); shelves from hm_konbini_furniture.webp
    'konbini': dict(
        size=(15, 12), painted='room_konbini_v2.webp', crop=(15, 47, 1387, 1055),
        grid=['W' * 15] * 4 + ['WW' + 'f' * 9 + 'cc' + 'f' + 'W'] * 5 + ['WW' + 'f' * 10 + 'WWW']
        + ['W' * 6 + 'fff' + 'W' * 6, 'W' * 6 + 'DDD' + 'W' * 6],
        spots=[
            ('fridges', 2, 3, 3, 1, 'konbini_fridge'),
            ('bento', 5, 3, 3, 1, 'konbini_bento'),
            ('coffee', 10, 3, 1, 1, 'konbini_coffee'),
            ('rack', 1, 4, 1, 4, 'konbini_magazines'),
            ('plant', 1, 8, 1, 1, 'plant'),
            ('magazines', 1, 10, 5, 1, 'konbini_magazines'),
            ('baskets', 9, 10, 1, 1, 'konbini_baskets'),
            ('bins', 10, 10, 2, 1, 'konbini_trash'),
            ('atm', 12, 9, 2, 1, 'konbini_atm'),
        ],
        furniture=[
            ('shelf1', 'konbini_furniture', 0, 3, 5, 3, 1, 'konbini_shelf', dict(tw=3.0)),
            ('shelf2', 'konbini_furniture', 1, 7, 5, 3, 1, 'konbini_shelf', dict(tw=3.0)),
            ('shelf3', 'konbini_furniture', 2, 3, 7, 3, 1, 'konbini_shelf', dict(tw=3.0)),
            ('shelf4', 'konbini_furniture', 3, 7, 7, 3, 1, 'konbini_shelf', dict(tw=3.0)),
            ('ice', 'konbini_furniture', 4, 2, 8, 2, 1, 'konbini_ice', dict(tw=1.9)),
            ('endcap', 'konbini_furniture', 5, 9, 8, 1, 1, 'konbini_shelf', dict(tw=0.95)),
        ],
    ),
    # painted as one picture (art/sheets/room_cafe_v2.webp); free-standing furniture from hm_cafe_furniture.webp
    'cafe': dict(
        size=(13, 12), painted='room_cafe_v2.webp', crop=(11, 7, 1293, 1181),
        grid=['W' * 13] * 4 + ['W' + 'c' * 9 + 'WWW', 'W' + 'c' * 9 + 'fWW', 'WW' + 'f' * 9 + 'WW']
        + ['WW' + 'f' * 10 + 'W'] * 2 + ['WW' + 'f' * 9 + 'WW'] * 2 + ['W' * 6 + 'D' + 'W' * 6],
        spots=[
            ('counter', 1, 4, 9, 2, 'cafe_counter'),
            ('fridge', 10, 4, 1, 1, 'cafe_shelf'),
            ('cupboard', 11, 4, 1, 2, 'cafe_shelf'),
            ('clock', 11, 6, 1, 1, 'cafe_clock'),
            ('books', 1, 6, 1, 5, 'cafe_books'),
            ('plant', 11, 9, 1, 2, 'plant'),
        ],
        furniture=[
            ('stool1', 'cafe_furniture', 3, 2, 6, 1, 1, 'cafe_counter', dict(tw=0.6)),
            ('stool2', 'cafe_furniture', 3, 4, 6, 1, 1, 'cafe_counter', dict(tw=0.6)),
            ('stool3', 'cafe_furniture', 3, 6, 6, 1, 1, 'cafe_counter', dict(tw=0.6)),
            ('table', 'cafe_furniture', 0, 3, 8, 1, 1, 'cafe_table', dict(tw=1.0)),
            ('chair1', 'cafe_furniture', 2, 2, 8, 1, 1, 'cafe_table', dict(tw=0.62)),
            ('chair2', 'cafe_furniture', 1, 4, 8, 1, 1, 'cafe_table', dict(tw=0.62)),
            ('table2', 'cafe_furniture', 0, 3, 10, 1, 1, 'cafe_table', dict(tw=1.0)),
            ('chair3', 'cafe_furniture', 2, 2, 10, 1, 1, 'cafe_table', dict(tw=0.62)),
            ('chair4', 'cafe_furniture', 1, 4, 10, 1, 1, 'cafe_table', dict(tw=0.62)),
            ('booth_t', 'cafe_furniture', 5, 8, 7, 2, 1, 'cafe_sofa', dict(tw=1.6)),
            ('booth_table', 'cafe_furniture', 4, 8, 8, 2, 1, 'cafe_table', dict(tw=1.3)),
            ('booth_b', 'cafe_furniture', 6, 8, 9, 2, 1, 'cafe_sofa', dict(tw=1.6)),
            ('sign', 'cafe_furniture', 8, 7, 10, 1, 1, 'cafe_menu', dict(tw=0.8)),
        ],
    ),
    # painted as one picture (art/sheets/room_apartment_v2.webp); free-standing furniture from hm_apartment_furniture.webp
    'apartment': dict(
        size=(12, 12), painted='room_apartment_v2.webp', crop=(47, 44, 1208, 1176),
        grid=['W' * 12] * 2 + ['WWWfWWWWWWWW'] * 2 + ['WWWffWWWWWWW', 'WWWfffffffWW', 'W' + 'f' * 9 + 'WW', 'WWWfffffffWW',
              'WWWWffffffWW', 'WWWWfffffWWW', 'W' + 'f' * 7 + 'WWWW', 'WWWWWDDWWWWW'],
        spots=[
            ('bed', 1, 2, 2, 4, 'bed'),
            ('desk', 4, 2, 4, 2, 'desk'),
            ('chair', 5, 4, 1, 1, 'desk'),
            ('shelf', 8, 2, 1, 3, 'shelf'),
            ('wardrobe', 9, 2, 2, 3, 'wardrobe'),
            ('lamp', 10, 5, 1, 1, 'floorlamp'),
            ('tv', 10, 6, 1, 3, 'tv'),
            ('plant', 10, 9, 1, 2, 'plant'),
            ('mirror', 9, 9, 1, 2, 'mirror_room'),
            ('shoes', 8, 10, 1, 1, 'shoes'),
            ('kitchen', 1, 7, 2, 3, 'kitchen'),
            ('fridge', 3, 8, 1, 2, 'fridge'),
        ],
        furniture=[
            ('kotatsu', 'apartment_furniture', 0, 6, 6, 2, 2, 'kotatsu', dict(tw=2.2)),
            ('cushion_b', 'apartment_furniture', 1, 5, 7, 1, 1, None, dict(tw=0.8)),
            ('cushion_r', 'apartment_furniture', 2, 8, 7, 1, 1, None, dict(tw=0.8)),
            ('laundry', 'apartment_furniture', 6, 3, 5, 1, 1, 'laundry', dict(tw=0.8)),
        ],
    ),
    # painted as one picture (art/sheets/room_library_v2.webp); furniture from hm_library_furniture.webp
    'library': dict(
        size=(14, 12), painted='room_library_v2.webp', crop=(6, 14, 1350, 1140),
        grid=['W' * 14] * 4 + ['WW' + 'f' * 10 + 'WW'] * 7 + ['W' * 6 + 'DD' + 'W' * 6],
        spots=[
            ('shelf', 1, 3, 9, 1, 'library_shelf'),
            ('clock', 10, 3, 1, 1, 'library_clock'),
            ('shelf2', 11, 3, 2, 1, 'library_shelf'),
            ('shelf3', 1, 4, 1, 2, 'library_shelf'),
            ('globe', 1, 6, 1, 1, 'library_globe'),
            ('shelf4', 1, 7, 1, 4, 'library_shelf'),
            ('display', 12, 4, 1, 7, 'library_display'),
        ],
        furniture=[
            ('chair1', 'library_furniture', 2, 3, 5, 1, 1, 'library_table', dict(tw=0.75)),
            ('chair2', 'library_furniture', 2, 5, 5, 1, 1, 'library_table', dict(tw=0.75)),
            ('table', 'library_furniture', 0, 3, 6, 3, 1, 'library_table', dict(tw=3.0)),
            ('chair3', 'library_furniture', 1, 3, 7, 1, 1, 'library_table', dict(tw=0.7)),
            ('chair4', 'library_furniture', 1, 5, 7, 1, 1, 'library_table', dict(tw=0.7)),
            ('armchair1', 'library_furniture', 7, 7, 5, 1, 1, 'library_reading', dict(tw=1.0)),
            ('round', 'library_furniture', 6, 8, 5, 1, 1, 'library_reading', dict(tw=0.9)),
            ('armchair2', 'library_furniture', 8, 9, 5, 1, 1, 'library_reading', dict(tw=1.0)),
            ('librarian_chair', 'library_furniture', 9, 10, 7, 1, 1, None, dict(tw=0.75)),
            ('desk', 'library_furniture', 5, 8, 8, 3, 1, 'library_desk', dict(tw=2.9, counter=True)),
            ('cart', 'library_furniture', 10, 2, 9, 1, 1, 'library_cart', dict(tw=0.8)),
            ('magazines', 'library_furniture', 11, 11, 4, 1, 1, 'library_magazines', dict(tw=0.85)),
        ],
    ),
    # painted as one picture (art/sheets/room_ramen_v2.webp); furniture from hm_ramen_furniture.webp
    'ramen': dict(
        size=(12, 10), painted='room_ramen_v2.webp', crop=(14, 12, 1361, 1106),
        grid=['W' * 12] * 3 + ['W' + 'c' * 8 + 'fWW', 'W' + 'c' * 8 + 'ffW'] + ['WW' + 'f' * 9 + 'W'] * 4
        + ['W' * 5 + 'DD' + 'W' * 5],
        spots=[
            ('counter', 1, 3, 8, 2, 'ramen_counter'),
            ('noren', 9, 2, 1, 1, 'ramen_noren'),
            ('shelf', 10, 3, 1, 1, 'ramen_shelf'),
            ('ticket', 1, 7, 1, 1, 'ramen_ticket'),
            ('menu', 1, 5, 1, 2, 'ramen_menu'),
            ('posters', 11, 5, 1, 4, 'ramen_poster'),
        ],
        furniture=[
            ('stool1', 'ramen_furniture', 1, 2, 5, 1, 1, 'ramen_counter', dict(tw=0.6)),
            ('stool2', 'ramen_furniture', 1, 4, 5, 1, 1, 'ramen_counter', dict(tw=0.6)),
            ('stool3', 'ramen_furniture', 1, 6, 5, 1, 1, 'ramen_counter', dict(tw=0.6)),
            ('stool4', 'ramen_furniture', 2, 3, 7, 1, 1, 'ramen_table', dict(tw=0.6)),
            ('table', 'ramen_furniture', 0, 4, 7, 2, 1, 'ramen_table', dict(tw=2.0)),
            ('stool5', 'ramen_furniture', 2, 6, 7, 1, 1, 'ramen_table', dict(tw=0.6)),
            ('maneki', 'ramen_furniture', 4, 10, 8, 1, 1, 'ramen_maneki', dict(tw=0.75)),
        ],
    ),
    # painted as one picture (art/sheets/room_lab_v2.webp); furniture from hm_lab_furniture.webp
    'lab': dict(
        size=(14, 11), painted='room_lab_v2.webp', crop=(40, 41, 1374, 1028),
        grid=['W' * 14] * 4 + ['WWWW' + 'f' * 8 + 'WW'] + ['WWW' + 'f' * 9 + 'WW'] * 4
        + ['WWW' + 'f' * 8 + 'WWW', 'W' * 6 + 'DD' + 'W' * 6],
        spots=[
            ('computer', 1, 4, 2, 3, 'lab_computer'),
            ('whiteboard', 4, 3, 3, 1, 'lab_whiteboard'),
            ('desk', 7, 3, 3, 1, 'lab_papers'),
            ('books', 10, 3, 2, 1, 'lab_books'),
            ('jars', 12, 4, 1, 3, 'lab_jars'),
            ('coat', 12, 7, 1, 1, 'lab_coat'),
            ('globe', 1, 7, 2, 2, 'lab_globe'),
            ('boxes', 11, 9, 2, 1, 'lab_boxes'),
        ],
        furniture=[
            ('table', 'lab_furniture', 0, 5, 6, 3, 2, 'lab_table', dict(tw=3.2)),
            ('chair', 'lab_furniture', 1, 6, 8, 1, 1, 'lab_table', dict(tw=0.85)),
            ('chair2', 'lab_furniture', 4, 8, 6, 1, 1, 'lab_table', dict(tw=0.8)),
            ('sofa', 'lab_furniture', 8, 4, 4, 2, 1, 'lab_sofa', dict(tw=2.0)),
            ('cart', 'lab_furniture', 5, 10, 7, 1, 1, 'lab_cart', dict(tw=0.9)),
        ],
    ),
    # painted as one picture (art/sheets/room_station_v2.webp); only free-standing furniture is separate
    'station': dict(
        size=(22, 15), painted='room_station_v2.webp', crop=(17, 48, 1447, 1001),
        grid=['W' * 22] * 6 + ['WW' + 'f' * 18 + 'WW'] * 8 + ['W' * 10 + 'DD' + 'W' * 10],
        spots=[
            ('map', 2, 5, 1, 1, 'station_map'),
            ('window', 3, 5, 4, 1, 'station_window'),
            ('ticket', 7, 5, 2, 1, 'station_ticket'),
            ('timetable', 9, 5, 3, 1, 'station_timetable'),
            ('poster', 12, 5, 1, 1, 'station_poster'),
            ('gate', 14, 5, 6, 1, 'station_gate'),
            ('lockers', 2, 6, 1, 5, 'station_locker'),
            ('plant', 2, 11, 1, 2, 'plant'),
            ('posters', 20, 5, 1, 3, 'station_poster'),
            ('vending', 19, 8, 2, 4, 'vending'),
            ('plant2', 7, 13, 1, 1, 'plant'),
            ('bin1', 8, 13, 1, 1, 'station_trash'),
            ('bin2', 13, 13, 1, 1, 'station_trash'),
        ],
        furniture=[
            ('seats1', 'station_furniture', 0, 3, 8, 3, 1, 'station_bench', dict(tw=2.7)),
            ('stove', 'station_furniture', 6, 4, 9, 1, 1, 'station_stove', dict(tw=0.8)),
            ('seats2', 'station_furniture', 1, 3, 10, 3, 1, 'station_bench', dict(tw=2.7)),
            ('bench1', 'station_furniture', 2, 15, 8, 2, 1, 'station_bench', dict(tw=1.9)),
            ('table', 'station_furniture', 9, 15, 9, 1, 1, 'station_bench', dict(tw=0.8)),
            ('bench2', 'station_furniture', 3, 15, 10, 2, 1, 'station_bench', dict(tw=1.9)),
            ('board', 'station_furniture', 8, 13, 6, 1, 1, 'station_timetable', dict(tw=1.0)),
            ('plant3', 'station_furniture', 7, 19, 6, 1, 1, 'plant', dict(tw=0.8)),
        ],
    ),
    # --- chapters 2-4: rooms painted at 64 px per tile (art/sheets/room_<id>.webp) with ready-made furniture PNGs
    # (art/furniture/<id>/*.png, 64 px per tile, anchored at the bottom of the canvas); everything is scaled x0.5
    'ryokan': dict(
        size=(14, 11), painted='room_ryokan.webp', clean=True, crop=(0, 0, 896, 704),
        grid=['W' * 14] * 3 + ['W' + 'c' * 5 + 'f' * 5 + 'WWW'] + ['WW' + 'f' * 10 + 'WW'] * 5
        + ['W' * 6 + 'ff' + 'W' * 6, 'W' * 6 + 'DD' + 'W' * 6],
        spots=[
            ('counter', 1, 3, 5, 1, 'ryokan_counter'),
            ('scroll', 3, 1, 1, 2, 'ryokan_scroll'),
            ('shoes', 1, 4, 1, 3, 'ryokan_shoes'),
            ('umbrellas', 1, 7, 1, 2, 'ryokan_umbrellas'),
            ('yu', 9, 1, 2, 2, 'ryokan_yu'),
            ('cabinet', 11, 2, 2, 2, 'ryokan_cabinet'),
            ('window', 12, 4, 1, 4, 'ryokan_window'),
            ('plant', 12, 8, 1, 1, 'plant'),
        ],
        furniture=[
            ('table', '', 0, 6, 7, 2, 1, 'ryokan_table', dict(png='ryokan/tea_table.png')),
            ('cushion1', '', 0, 5, 7, 1, 1, None, dict(png='ryokan/cushion_red.png')),
            ('cushion2', '', 0, 8, 7, 1, 1, None, dict(png='ryokan/cushion_indigo.png')),
            ('cushion3', '', 0, 6, 6, 1, 1, None, dict(png='ryokan/cushion_indigo.png')),
            ('screen', '', 0, 10, 4, 2, 1, 'ryokan_screen', dict(png='ryokan/mountain_screen.png')),
            ('hibachi', '', 0, 2, 5, 1, 1, 'ryokan_hibachi', dict(png='ryokan/hibachi_kettle.png')),
            ('yukata', '', 0, 11, 6, 1, 1, 'ryokan_yukata', dict(png='ryokan/yukata_rack.png')),
            ('pine', '', 0, 2, 8, 1, 1, 'ryokan_pine', dict(png='ryokan/potted_pine.png')),
        ],
    ),
    'werkstatt': dict(
        size=(12, 10), painted='room_werkstatt.webp', clean=True, crop=(0, 0, 768, 640),
        grid=['W' * 12] * 3 + ['WWff' + 'WWWW' + 'f' + 'WWW'] + ['WW' + 'f' * 8 + 'WW'] * 4
        + ['W' * 5 + 'ff' + 'W' * 5, 'W' * 5 + 'DD' + 'W' * 5],
        spots=[
            ('scrolls1', 1, 1, 4, 2, 'werk_scrolls'),
            ('window', 5, 1, 2, 2, 'werk_window'),
            ('scrolls2', 7, 1, 3, 2, 'werk_scrolls'),
            ('bench', 4, 3, 4, 1, 'werk_bench'),
            ('chest', 9, 3, 2, 1, 'werk_chest'),
            ('cabinet', 1, 3, 1, 5, 'werk_cabinet'),
            ('works', 10, 4, 2, 4, 'werk_works'),
        ],
        furniture=[
            ('desk', '', 0, 5, 5, 2, 1, 'werk_desk', dict(png='werkstatt/writing_desk.png')),
            ('seat1', '', 0, 5, 4, 1, 1, None, dict(png='werkstatt/cushion_down.png')),
            ('seat2', '', 0, 5, 6, 1, 1, None, dict(png='werkstatt/cushion_up.png')),
            ('lamp', '', 0, 3, 4, 1, 1, 'werk_lamp', dict(png='werkstatt/andon_lamp.png')),
            ('washi', '', 0, 8, 6, 1, 1, 'werk_washi', dict(png='werkstatt/washi_stack.png')),
            ('brush', '', 0, 8, 4, 1, 1, 'werk_brush', dict(png='werkstatt/brush_stand.png')),
        ],
    ),
    'tsuru': dict(
        size=(14, 11), painted='room_tsuru.webp', clean=True, crop=(0, 0, 896, 704),
        grid=['W' * 14] * 4 + ['WW' + 'f' * 11 + 'W'] * 5 + ['W' * 6 + 'ff' + 'W' * 6, 'W' * 6 + 'DD' + 'W' * 6],
        spots=[
            ('kamado', 2, 2, 2, 2, 'tsuru_kamado'),
            ('jars', 4, 2, 1, 2, 'tsuru_jars'),
            ('shelf', 5, 2, 3, 2, 'tsuru_shelf'),
            ('window', 6, 1, 2, 1, 'tsuru_window'),
            ('kamidana', 8, 1, 2, 3, 'tsuru_kamidana'),
            ('persimmons', 11, 1, 2, 3, 'tsuru_persimmons'),
            ('cupboard', 1, 4, 1, 5, 'tsuru_cupboard'),
            ('coats', 13, 5, 1, 2, 'tsuru_coats'),
            ('boots', 13, 7, 1, 2, 'tsuru_boots'),
        ],
        furniture=[
            ('irori', '', 0, 6, 5, 2, 2, 'tsuru_irori', dict(png='tsuru/irori.png')),
            ('cushion1', '', 0, 5, 5, 1, 1, None, dict(png='tsuru/cushion_red.png')),
            ('cushion2', '', 0, 8, 5, 1, 1, None, dict(png='tsuru/cushion_green.png')),
            ('cushion3', '', 0, 6, 7, 1, 1, None, dict(png='tsuru/cushion_indigo.png')),
            ('cushion4', '', 0, 7, 7, 1, 1, None, dict(png='tsuru/cushion_ochre.png')),
            ('tray', '', 0, 10, 5, 1, 1, 'tsuru_tray', dict(png='tsuru/tea_tray_table.png')),
            ('wood', '', 0, 4, 4, 1, 1, 'tsuru_wood', dict(png='tsuru/firewood_basket.png')),
            ('futon', '', 0, 11, 5, 1, 2, 'tsuru_futon', dict(png='tsuru/winter_futon.png')),
        ],
    ),
    'klinik': dict(
        size=(12, 10), painted='room_klinik.webp', clean=True, crop=(0, 0, 768, 640),
        grid=['W' * 12] * 3 + ['WWW' + 'ff' + 'ccc' + 'WWW' + 'W'] + ['WWW' + 'f' * 7 + 'WW'] * 3 + ['WW' + 'f' * 8 + 'WW']
        + ['W' * 5 + 'ff' + 'W' * 5, 'W' * 5 + 'DD' + 'W' * 5],
        spots=[
            ('bed', 1, 3, 2, 4, 'klinik_bed'),
            ('stool', 1, 7, 1, 1, 'klinik_bedstool'),
            ('shelf', 3, 1, 2, 2, 'klinik_shelf'),
            ('counter', 5, 3, 3, 1, 'klinik_counter'),
            ('calendar', 8, 1, 1, 2, 'klinik_calendar'),
            ('chart', 9, 1, 1, 2, 'klinik_chart'),
            ('drawers', 8, 3, 3, 1, 'klinik_shelf'),
            ('redcross', 10, 4, 2, 2, 'klinik_cabinet'),
            ('coat', 10, 6, 1, 1, 'klinik_coat'),
            ('plant', 10, 7, 1, 1, 'plant'),
        ],
        furniture=[
            ('desk', '', 0, 6, 5, 2, 1, 'klinik_desk', dict(png='klinik/doctor_desk.png')),
            ('stool1', '', 0, 5, 5, 1, 1, None, dict(png='klinik/stool_right.png')),
            ('stool2', '', 0, 8, 5, 1, 1, None, dict(png='klinik/stool_left.png')),
            ('chairs', '', 0, 7, 7, 2, 1, 'klinik_chairs', dict(png='klinik/waiting_chairs_up.png')),
            ('stove', '', 0, 3, 5, 1, 1, 'klinik_stove', dict(png='klinik/kerosene_stove.png')),
            ('plant2', '', 0, 9, 4, 1, 1, 'plant', dict(png='klinik/potted_plant.png')),
        ],
    ),
    'kneipe': dict(
        size=(13, 10), painted='room_kneipe.webp', clean=True, crop=(0, 0, 832, 640),
        grid=['W' * 13] * 3 + ['WW' + 'f' * 7 + 'WWWW'] + ['W' + 'c' * 8 + 'fff' + 'W'] + ['WW' + 'f' * 10 + 'W'] * 3
        + ['W' * 6 + 'f' + 'W' * 6, 'W' * 6 + 'D' + 'W' * 6],
        spots=[
            ('shelf1', 1, 1, 2, 2, 'kneipe_shelf'),
            ('menu', 3, 1, 3, 1, 'kneipe_menu'),
            ('fish', 5, 1, 1, 1, 'kneipe_sign'),
            ('grill', 3, 2, 3, 1, 'kneipe_grill'),
            ('noren', 7, 1, 1, 2, 'kneipe_noren'),
            ('counter', 1, 4, 8, 1, 'kneipe_counter'),
            ('shelf2', 9, 2, 1, 2, 'kneipe_shelf'),
            ('tv', 10, 2, 2, 2, 'kneipe_tv'),
            ('float', 11, 1, 2, 1, 'kneipe_float'),
            ('tank', 1, 5, 1, 3, 'kneipe_tank'),
            ('window', 12, 4, 1, 4, 'kneipe_window'),
        ],
        furniture=[
            ('cstool1', '', 0, 2, 5, 1, 1, 'kneipe_stool', dict(png='kneipe/counter_stool_up.png')),
            ('cstool2', '', 0, 4, 5, 1, 1, 'kneipe_stool', dict(png='kneipe/counter_stool_up.png')),
            ('cstool3', '', 0, 6, 5, 1, 1, 'kneipe_stool', dict(png='kneipe/counter_stool_up.png')),
            ('cstool4', '', 0, 8, 5, 1, 1, 'kneipe_stool', dict(png='kneipe/counter_stool_up.png')),
            ('table', '', 0, 9, 6, 2, 1, 'kneipe_table', dict(png='kneipe/dining_table.png')),
            ('stool1', '', 0, 8, 6, 1, 1, None, dict(png='kneipe/wooden_stool.png')),
            ('stool2', '', 0, 11, 6, 1, 1, None, dict(png='kneipe/wooden_stool.png')),
            ('stool3', '', 0, 10, 7, 1, 1, None, dict(png='kneipe/wooden_stool.png')),
            ('lemons', '', 0, 11, 4, 1, 1, 'kneipe_lemons', dict(png='kneipe/lemon_crate.png')),
            ('cart', '', 0, 2, 7, 1, 1, 'kneipe_cart', dict(png='kneipe/squid_plate_cart.png')),
        ],
    ),
    'leuchtturm': dict(
        size=(12, 10), painted='room_leuchtturm.webp', clean=True, crop=(0, 0, 768, 640),
        grid=['W' * 12] * 4 + ['WW' + 'f' * 8 + 'WW'] * 4 + ['W' * 5 + 'ff' + 'W' * 5, 'W' * 5 + 'DD' + 'W' * 5],
        spots=[
            ('photo', 2, 1, 1, 2, 'turm_photo'),
            ('clock', 3, 1, 1, 2, 'turm_clock'),
            ('window', 4, 1, 2, 2, 'turm_window'),
            ('books1', 2, 3, 3, 1, 'turm_books'),
            ('books2', 5, 2, 3, 2, 'turm_books'),
            ('barometer', 8, 1, 1, 2, 'turm_barometer'),
            ('stairs', 9, 1, 2, 3, 'turm_stairs'),
            ('blackboard', 1, 3, 1, 3, 'turm_blackboard'),
            ('classphoto', 1, 6, 1, 1, 'turm_classphoto'),
            ('coats', 10, 4, 1, 2, 'turm_coats'),
            ('charts', 10, 6, 1, 2, 'turm_charts'),
        ],
        furniture=[
            ('desk', '', 0, 5, 5, 2, 1, 'turm_desk', dict(png='leuchtturm/teacher_desk.png')),
            ('chair1', '', 0, 5, 4, 1, 1, None, dict(png='leuchtturm/chair_down.png')),
            ('chair2', '', 0, 5, 6, 1, 1, None, dict(png='leuchtturm/chair_up.png')),
            ('globe', '', 0, 3, 4, 1, 1, 'turm_globe', dict(png='leuchtturm/globe.png')),
            ('telescope', '', 0, 8, 7, 1, 1, 'turm_telescope', dict(png='leuchtturm/telescope.png')),
            ('schooldesk', '', 0, 3, 6, 1, 1, 'turm_schooldesk', dict(png='leuchtturm/school_desk_seat.png')),
        ],
    ),
    # --- chapter 5 (Kyoto)
    'machiya': dict(
        size=(14, 11), painted='room_machiya.webp', clean=True, crop=(0, 0, 896, 704),
        grid=['W' * 14] * 3 + ['W' + 'c' * 4 + 'f' * 4 + 'W' * 5] + ['WW' + 'f' * 10 + 'WW'] * 5 + ['W' * 6 + 'ff' + 'W' * 6, 'W' * 6 + 'DD' + 'W' * 6],
        spots=[
            ('counter', 1, 3, 4, 1, 'machiya_counter'),
            ('keys', 2, 1, 2, 2, 'machiya_keys'),
            ('scroll', 6, 1, 1, 2, 'machiya_scroll'),
            ('garden', 9, 1, 3, 2, 'machiya_garden'),
            ('shoes', 1, 4, 1, 3, 'machiya_shoes'),
            ('luggage', 1, 7, 1, 2, 'machiya_luggage'),
            ('books', 12, 4, 1, 4, 'machiya_books'),
            ('plant', 12, 8, 1, 1, 'plant'),
        ],
        furniture=[
            ('table', '', 0, 6, 6, 2, 1, 'machiya_table', dict(png='machiya/tea_table.png')),
            ('cushion1', '', 0, 5, 6, 1, 1, None, dict(png='machiya/cushion_red.png')),
            ('cushion2', '', 0, 8, 6, 1, 1, None, dict(png='machiya/cushion_grey.png')),
            ('cushion3', '', 0, 6, 5, 1, 1, None, dict(png='machiya/cushion_grey.png')),
            ('lantern', '', 0, 3, 4, 1, 1, 'machiya_lantern', dict(png='machiya/paper_lantern.png')),
            ('bonsai', '', 0, 10, 4, 1, 1, 'machiya_bonsai', dict(png='machiya/maple_bonsai.png')),
            ('screen', '', 0, 10, 7, 2, 1, 'machiya_screen', dict(png='machiya/river_screen.png')),
            ('suitcase', '', 0, 3, 8, 1, 1, 'machiya_suitcase', dict(png='machiya/suitcase.png')),
        ],
    ),
    'teehaus': dict(
        size=(12, 10), painted='room_teehaus.webp', clean=True, crop=(0, 0, 768, 640),
        grid=['W' * 12] * 4 + ['WWW' + 'f' * 7 + 'WW'] + ['WW' + 'f' * 8 + 'WW'] * 3 + ['W' * 5 + 'ff' + 'W' * 5, 'W' * 5 + 'DD' + 'W' * 5],
        spots=[
            ('shelf', 1, 1, 3, 2, 'teahouse_shelf'),
            ('hearth', 2, 4, 1, 1, 'teahouse_hearth'),
            ('scroll', 5, 1, 2, 2, 'teahouse_scroll'),
            ('flowers', 6, 2, 1, 1, 'teahouse_flowers'),
            ('shoji', 8, 1, 2, 2, 'teahouse_garden'),
            ('maple', 10, 1, 1, 2, 'teahouse_garden'),
            ('jar', 1, 5, 1, 2, 'teahouse_jar'),
            ('plant', 10, 6, 1, 1, 'plant'),
        ],
        furniture=[
            ('table', '', 0, 5, 5, 2, 1, 'teahouse_table', dict(png='teehaus/tea_table.png')),
            ('cushion1', '', 0, 4, 5, 1, 1, None, dict(png='teehaus/cushion_gold.png')),
            ('cushion2', '', 0, 7, 5, 1, 1, None, dict(png='teehaus/cushion_green.png')),
            ('cushion3', '', 0, 5, 6, 1, 1, None, dict(png='teehaus/cushion_green.png')),
            ('waterjar', '', 0, 8, 4, 1, 1, 'teahouse_waterjar', dict(png='teehaus/water_jar_stand.png')),
            ('vase', '', 0, 3, 6, 1, 1, 'teahouse_vase', dict(png='teehaus/bamboo_vase_stand.png')),
            ('lamp', '', 0, 3, 4, 1, 1, 'teahouse_lamp', dict(png='teehaus/paper_lamp.png')),
        ],
    ),
    'kimono': dict(
        size=(13, 10), painted='room_kimono.webp', clean=True, crop=(0, 0, 832, 640),
        grid=['W' * 13] * 3 + ['WWf' + 'c' * 5 + 'W' * 5] + ['WW' + 'f' * 8 + 'WWW'] + ['WW' + 'f' * 9 + 'WW'] * 3 + ['W' * 6 + 'f' + 'W' * 6, 'W' * 6 + 'D' + 'W' * 6],
        spots=[
            ('geta', 1, 2, 1, 6, 'kimono_geta'),
            ('boxes', 3, 1, 5, 2, 'kimono_boxes'),
            ('counter', 3, 3, 5, 1, 'kimono_counter'),
            ('noren', 8, 1, 2, 2, 'kimono_noren'),
            ('rack1', 10, 1, 2, 3, 'kimono_hanging'),
            ('platform', 10, 3, 2, 2, 'kimono_platform'),
            ('rack2', 11, 5, 2, 3, 'kimono_hanging'),
            ('plant', 1, 7, 1, 1, 'plant'),
        ],
        furniture=[
            ('mirror', '', 0, 9, 5, 1, 1, 'kimono_mirror', dict(png='kimono/standing_mirror.png')),
            ('bench', '', 0, 5, 6, 2, 1, 'kimono_bench', dict(png='kimono/dressing_bench.png')),
            ('rack', '', 0, 3, 5, 2, 1, 'kimono_rack', dict(png='kimono/kimono_rack.png')),
            ('basket', '', 0, 8, 7, 1, 1, 'kimono_basket', dict(png='kimono/accessory_basket_stool.png')),
            ('plant2', '', 0, 3, 7, 1, 1, 'plant', dict(png='kimono/potted_plant.png')),
        ],
    ),
    'izakaya': dict(
        size=(13, 10), painted='room_izakaya.webp', clean=True, crop=(0, 0, 832, 640),
        grid=['W' * 13] * 3 + ['WW' + 'c' * 8 + 'WWW'] + ['WW' + 'f' * 9 + 'WW'] + ['WW' + 'f' * 10 + 'W'] * 3 + ['W' * 6 + 'f' + 'W' * 6, 'W' * 6 + 'D' + 'W' * 6],
        spots=[
            ('bottles', 2, 1, 3, 2, 'izakaya_bottles'),
            ('noren', 5, 1, 3, 2, 'izakaya_noren'),
            ('grill', 5, 2, 3, 1, 'izakaya_grill'),
            ('counter', 2, 3, 8, 1, 'izakaya_counter'),
            ('shelf', 8, 1, 2, 2, 'izakaya_shelf'),
            ('tv', 10, 2, 3, 2, 'izakaya_tv'),
            ('window', 1, 3, 1, 3, 'izakaya_window'),
            ('crates', 1, 6, 1, 2, 'izakaya_crates'),
        ],
        furniture=[
            ('stool1', '', 0, 3, 4, 1, 1, 'izakaya_stool', dict(png='izakaya/counter_stool.png')),
            ('stool2', '', 0, 5, 4, 1, 1, 'izakaya_stool', dict(png='izakaya/counter_stool.png')),
            ('stool3', '', 0, 7, 4, 1, 1, 'izakaya_stool', dict(png='izakaya/counter_stool.png')),
            ('table', '', 0, 4, 6, 2, 1, 'izakaya_table', dict(png='izakaya/table_two_cushions.png')),
            ('barrel', '', 0, 9, 6, 1, 1, 'izakaya_barrel', dict(png='izakaya/barrel_table.png')),
            ('lantern', '', 0, 10, 7, 1, 1, 'izakaya_lantern', dict(png='izakaya/standing_lantern.png')),
            ('beer', '', 0, 2, 7, 1, 1, 'izakaya_beer', dict(png='izakaya/beer_crates.png')),
        ],
    ),
    'bahnhofinfo': dict(
        size=(14, 11), painted='room_bahnhofinfo.webp', clean=True, crop=(0, 0, 896, 704),
        grid=['W' * 14] * 3 + ['WW' + 'ff' + 'c' * 6 + 'WWWW'] + ['WW' + 'f' * 8 + 'WWWW'] + ['WW' + 'f' * 11 + 'W'] * 3 + ['WW' + 'f' * 10 + 'WW']
        + ['W' * 6 + 'ff' + 'W' * 6, 'W' * 6 + 'DD' + 'W' * 6],
        spots=[
            ('lockers', 1, 3, 1, 5, 'info_lockers'),
            ('map', 4, 1, 4, 2, 'kyoto_station'),
            ('board', 7, 1, 3, 2, 'info_board'),
            ('counter', 4, 3, 6, 1, 'info_counter'),
            ('vending', 10, 3, 2, 2, 'info_vending'),
            ('atm', 12, 3, 1, 2, 'info_atm'),
            ('plant1', 1, 8, 1, 1, 'plant'),
            ('plant2', 12, 8, 1, 1, 'plant'),
        ],
        furniture=[
            ('bench1', '', 0, 4, 6, 2, 1, 'info_bench', dict(png='bahnhofinfo/bench.png')),
            ('bench2', '', 0, 9, 6, 2, 1, 'info_bench', dict(png='bahnhofinfo/bench.png')),
            ('trolley', '', 0, 11, 5, 1, 1, 'info_trolley', dict(png='bahnhofinfo/luggage_trolley.png')),
            ('bins', '', 0, 3, 7, 1, 1, 'info_bins', dict(png='bahnhofinfo/three_bins.png')),
            ('sign', '', 0, 7, 5, 1, 1, 'info_sign', dict(png='bahnhofinfo/signboard.png')),
            ('suitcase', '', 0, 8, 7, 1, 1, 'info_suitcase', dict(png='bahnhofinfo/suitcase.png')),
            ('plant3', '', 0, 11, 7, 1, 1, 'plant', dict(png='bahnhofinfo/potted_plant.png')),
        ],
    ),
    'nishikiladen': dict(
        size=(12, 10), painted='room_nishikiladen.webp', clean=True, crop=(0, 0, 768, 640),
        grid=['W' * 12] * 3 + ['WW' + 'c' * 8 + 'WW'] + ['WW' + 'f' * 8 + 'WW'] * 2 + ['WW' + 'f' * 9 + 'W'] * 2 + ['W' * 5 + 'ff' + 'W' * 5, 'W' * 5 + 'DD' + 'W' * 5],
        spots=[
            ('jars', 3, 1, 6, 2, 'pickle_jars'),
            ('sign', 5, 1, 2, 1, 'pickle_sign'),
            ('window', 8, 1, 2, 2, 'pickle_window'),
            ('counter', 2, 3, 8, 1, 'pickle_counter'),
            ('crates', 1, 4, 1, 4, 'pickle_veg'),
            ('scale', 10, 3, 2, 3, 'pickle_scale'),
        ],
        furniture=[
            ('table', '', 0, 5, 5, 2, 1, 'pickle_table', dict(png='nishikiladen/tasting_table.png')),
            ('barrel', '', 0, 3, 6, 1, 1, 'pickle_barrel', dict(png='nishikiladen/pickle_barrel.png')),
            ('crates2', '', 0, 8, 6, 1, 1, 'pickle_crates', dict(png='nishikiladen/wooden_crates.png')),
            ('basket', '', 0, 4, 7, 1, 1, 'pickle_basket', dict(png='nishikiladen/shopping_basket_stool.png')),
            ('plant2', '', 0, 9, 7, 1, 1, 'plant', dict(png='nishikiladen/potted_plant.png')),
        ],
    ),
    # --- chapter 6 (Osaka): painted rooms only (the furniture sheets are not cut yet)
    'buero': dict(
        size=(14, 11), painted='room_buero.webp', clean=True, crop=(0, 0, 896, 704),
        grid=['W' * 14] * 3 + ['WW' + 'f' * 10 + 'WW'] * 7 + ['W' * 6 + 'DD' + 'W' * 6],
        spots=[('desks', 2, 2, 7, 1, 'buero_desks'), ('board', 4, 1, 2, 1, 'buero_board'), ('calendar', 6, 1, 1, 1, 'buero_calendar'), ('meeting', 8, 1, 4, 2, 'buero_meeting'),
               ('cabinets', 1, 3, 1, 5, 'buero_cabinet'), ('coffee', 12, 3, 1, 2, 'buero_coffee'), ('printer', 12, 5, 1, 2, 'buero_printer'), ('plant', 12, 8, 1, 1, 'plant')],
        furniture=[],
    ),
    'empfang': dict(
        size=(12, 10), painted='room_empfang.webp', clean=True, crop=(0, 0, 768, 640),
        grid=['W' * 12] * 3 + ['WWW' + 'c' * 6 + 'WWW'] + ['WW' + 'f' * 8 + 'WW'] * 5 + ['W' * 5 + 'DD' + 'W' * 5],
        spots=[('desk', 3, 3, 6, 1, 'empfang_desk'), ('logo', 4, 1, 4, 1, 'empfang_logo'), ('shelf', 1, 1, 1, 3, 'empfang_shelf'), ('door', 10, 1, 1, 2, 'empfang_door'), ('umbrellas', 10, 6, 1, 1, 'empfang_umbrellas')],
        furniture=[],
    ),
    'takoladen': dict(
        size=(12, 10), painted='room_takoyaki_laden.webp', clean=True, crop=(0, 0, 768, 640),
        grid=['W' * 12] * 3 + ['W' + 'c' * 8 + 'ffW'] + ['WW' + 'f' * 9 + 'W'] * 5 + ['W' * 5 + 'DD' + 'W' * 5],
        spots=[('griddle', 1, 3, 4, 1, 'tako_griddle'), ('menu', 3, 1, 5, 1, 'tako_menu'), ('noren', 8, 1, 2, 1, 'tako_noren'), ('tv', 10, 1, 1, 2, 'tako_tv'), ('flour', 1, 3, 1, 2, 'tako_flour'), ('stools', 2, 4, 6, 1, 'tako_stool')],
        furniture=[],
    ),
    'okonomi': dict(
        size=(13, 10), painted='room_okonomiyaki.webp', clean=True, crop=(0, 0, 832, 640),
        grid=['W' * 13] * 3 + ['WW' + 'c' * 9 + 'WW'] + ['WW' + 'f' * 9 + 'WW'] * 5 + ['W' * 6 + 'DD' + 'W' * 5],
        spots=[('shelf', 1, 1, 2, 2, 'okonomi_shelf'), ('noren', 3, 1, 2, 2, 'okonomi_noren'), ('menu', 5, 1, 4, 1, 'okonomi_menu'), ('photo', 9, 1, 2, 1, 'okonomi_photo'), ('griddles', 3, 3, 6, 1, 'okonomi_griddle')],
        furniture=[],
    ),
    'konbini2': dict(
        size=(13, 10), painted='room_konbini_osaka.webp', clean=True, crop=(0, 0, 832, 640),
        grid=['W' * 13] * 3 + ['WW' + 'c' * 5 + 'ff' + 'WWWW'] + ['WW' + 'f' * 10 + 'W'] * 5 + ['W' * 6 + 'DD' + 'W' * 5],
        spots=[('counter', 2, 3, 5, 1, 'konbini2_counter'), ('fridges', 9, 1, 4, 3, 'konbini2_fridge'), ('boards', 3, 1, 6, 1, 'konbini2_board'), ('magazines', 1, 4, 1, 4, 'konbini2_magazines'), ('atm', 12, 6, 1, 3, 'konbini2_atm')],
        furniture=[],
    ),
    'kushikatsu': dict(
        size=(12, 10), painted='room_kushikatsu.webp', clean=True, crop=(0, 0, 768, 640),
        grid=['W' * 12] * 3 + ['W' + 'c' * 8 + 'ffW'] + ['WW' + 'f' * 9 + 'W'] * 5 + ['W' * 5 + 'DD' + 'W' * 5],
        spots=[('posters', 1, 1, 2, 2, 'kushi_poster'), ('fryers', 4, 1, 4, 2, 'kushi_fryer'), ('sign', 9, 1, 1, 2, 'kushi_sign'), ('racks', 7, 1, 2, 2, 'kushi_rack'), ('counter', 1, 3, 5, 1, 'kushi_counter'), ('tv', 1, 3, 1, 2, 'kushi_tv')],
        furniture=[],
    ),
}


def painted_shell(rid, r):
    """A room painted as one picture (art/sheets/<src>): crop the room, scale it to W x H tiles."""
    W, H = r['size']
    a = load(r['painted'])
    bg = strict_bg(a)
    if r.get('clean'):
        # drop the magenta fringe along the outline: magenta-tinted pixels right next to the background
        pink = ((a[:, :, 0] - a[:, :, 1] > 22) & (a[:, :, 2] - a[:, :, 1] > 22)) | magenta_mask(a)
        bg = bg | (pink & ndimage.binary_dilation(bg, iterations=3))
    a[bg] = (34, 26, 20)  # outside the room: the dark game background (purple furniture survives)
    src = Image.fromarray(a.clip(0, 255).astype(np.uint8), 'RGB')
    src.crop(r['crop']).resize((W * T, H * T), Image.LANCZOS).save(os.path.join(OUT, f'room2_{rid}.png'))
    grid = [list(row) for row in r['grid']]
    assert len(grid) == H and all(len(row) == W for row in grid), rid
    return grid


def place(rid, r, grid):
    """Furniture sprites, plus invisible interaction spots (id, x, y, w, h, script), as map objects."""
    objects = []
    for oid, sh, idx, x, y, w, h, script, *extra in r['furniture']:
        opt = extra[0] if extra else {}
        if opt.get('png'):
            # ready-made RGBA sprite on a 64 px/tile canvas, bottom = bottom of the footprint: crop the empty top, halve
            img = Image.open(os.path.join(ROOT, 'art', 'furniture', opt['png'])).convert('RGBA')
            top = img.getchannel('A').getbbox()[1]
            img = img.crop((0, top, img.width, img.height))
            arr = np.array(img)
            pinkish = (arr[:, :, 0].astype(int) - arr[:, :, 1] > 50) & (arr[:, :, 2].astype(int) - arr[:, :, 1] > 50)
            m = arr[:, :, 3] > 0
            for _ in range(3):
                m &= ~((m & ~ndimage.binary_erosion(m)) & pinkish)
            arr[:, :, 3] = np.where(m, arr[:, :, 3], 0)
            img = Image.fromarray(arr, 'RGBA')
            p = resize_px(img, max(1, round(img.height / 2)))
        elif opt.get('tw'):
            # sheets drawn at another scale: fit the piece to a width in tiles
            p = piece(sh, idx, scale=1, depink=opt.get('depink', False))
            p = resize_px(p, max(8, round(p.height * opt['tw'] * T / p.width)))
        else:
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
    for oid, x, y, w, h, script in r.get('spots', []):
        objects.append({'id': f'{rid}_{oid}', 'x': x, 'y': y, 'w': w, 'h': h, 'script': script})
    return objects


def build_room(rid, r):
    W, H = r['size']
    if 'painted' in r:
        grid = painted_shell(rid, r)
        return {'tiles': [''.join(row) for row in grid], 'objects': place(rid, r, grid), 'image': f'room2_{rid}'}
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
    objects = place(rid, r, grid)
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
