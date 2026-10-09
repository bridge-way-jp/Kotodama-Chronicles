"""Cut the magenta-background sprite sheets in art/sheets/ into game assets.

Sheets (all generated on a flat #FF00FF background):
  hero-walk.webp       4x4 walk cycle (rows: down, left, right, up)
  npcs.webp            8 NPCs x 4 views (down, left, right, up)
  portraits.webp       dialogue portraits, 4 expressions per character
  creature-backs.webp  Kotodama seen from behind (player side in battles)
  story.webp           collage of 5 story illustrations (white gutters)

Run: python3 tools/extract_sheets.py   (needs Pillow, NumPy, SciPy)
"""
import os
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.join(os.path.dirname(__file__), '..')
SHEETS = os.path.join(ROOT, 'art', 'sheets')
OUT = os.path.join(ROOT, 'public', 'assets')


def load(name):
    return np.array(Image.open(os.path.join(SHEETS, name)).convert('RGB')).astype(np.int32)


def magenta_mask(a):
    r, g, b = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    # flat magenta plus its anti-aliased fringe
    return ((r > 150) & (b > 150) & (g < 120) & (np.abs(r - b) < 70)) | ((r + b) / 2 - g > 140)


def keep_main(fg, frac=0.03):
    """Drop small stray components (e.g. slivers of a neighbouring sprite)."""
    lab, n = ndimage.label(fg)
    if n <= 1:
        return fg
    sizes = ndimage.sum(fg, lab, range(1, n + 1))
    keep = [i + 1 for i, v in enumerate(sizes) if v >= sizes.max() * frac]
    return np.isin(lab, keep)


def to_rgba(a, keep):
    rgba = np.zeros((a.shape[0], a.shape[1], 4), np.uint8)
    rgba[:, :, :3] = a.clip(0, 255)
    rgba[:, :, 3] = np.where(keep, 255, 0)
    return Image.fromarray(rgba, 'RGBA')


def trim(img):
    al = np.array(img)[:, :, 3]
    ys, xs = np.where(al > 0)
    return img.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def resize_px(img, height):
    """Box-downscale with premultiplied alpha, then harden alpha for crisp pixels."""
    w = max(1, round(img.width * height / img.height))
    arr = np.array(img).astype(np.float32) / 255
    pm = np.concatenate([arr[:, :, :3] * arr[:, :, 3:4], arr[:, :, 3:4]], 2)
    ch = [np.array(Image.fromarray((pm[:, :, i] * 255).astype(np.uint8), 'L').resize((w, height), Image.BOX)).astype(np.float32) / 255 for i in range(4)]
    out = np.stack(ch, 2)
    al = out[:, :, 3:4]
    out[:, :, :3] = np.clip(out[:, :, :3] / np.where(al > 0, al, 1), 0, 1)
    out[:, :, 3] = np.where(out[:, :, 3] > 0.45, 1, 0)
    return Image.fromarray((out * 255).astype(np.uint8), 'RGBA')


def components(fg, min_area=800, dilate=3):
    lab, _ = ndimage.label(ndimage.binary_dilation(fg, iterations=dilate))
    boxes = []
    for s in ndimage.find_objects(lab):
        h, w = s[0].stop - s[0].start, s[1].stop - s[1].start
        if h * w >= min_area:
            boxes.append((s[1].start, s[0].start, s[1].stop, s[0].stop))
    return boxes


def save(img, name):
    img.save(os.path.join(OUT, name + '.png'))


def crop_sprite(a, fg, box, height):
    x0, y0, x1, y1 = box
    img = to_rgba(a[y0:y1, x0:x1], fg[y0:y1, x0:x1])
    return resize_px(trim(img), height)


def rows_of(boxes, tol=60, by_center=False):
    key = (lambda b: (b[1] + b[3]) / 2) if by_center else (lambda b: b[1])
    boxes = sorted(boxes, key=key)
    rows = []
    for b in boxes:
        if rows and abs(key(rows[-1][0]) - key(b)) < tol:
            rows[-1].append(b)
        else:
            rows.append([b])
    return [sorted(r, key=lambda b: b[0]) for r in rows]


def hero():
    a = load('hero-walk.webp')
    fg = ~magenta_mask(a)
    fg = ndimage.binary_opening(fg)
    rows = rows_of(components(fg))
    assert [len(r) for r in rows] == [4, 4, 4, 4], [len(r) for r in rows]
    # common scale for all frames: tallest frame -> 46 px
    tallest = max(b[3] - b[1] for r in rows for b in r)
    for d, row in zip(['down', 'left', 'right', 'up'], rows):
        for i, b in enumerate(row):
            x0, y0, x1, y1 = b
            img = trim(to_rgba(a[y0:y1, x0:x1], fg[y0:y1, x0:x1]))
            save(resize_px(img, max(8, round(img.height * 46 / tallest))), f'hero_{d}_{i}')


NPC_LAYOUT = [['mori', 'kaede'], ['haruto', 'aoi'], ['sato', 'kirishima'], ['station_staff', 'customer']]


def npcs():
    a = load('npcs.webp')
    fg = ndimage.binary_opening(~magenta_mask(a))
    h = a.shape[0]
    bands = [(int(h * i / 4), int(h * (i + 1) / 4)) for i in range(4)]
    for (y0, y1), pair in zip(bands, NPC_LAYOUT):
        band = np.zeros_like(fg)
        band[y0:y1] = fg[y0:y1]
        boxes = sorted(components(band, dilate=2), key=lambda b: b[0])
        boxes = [b for b in boxes if b[3] - b[1] > 80]
        assert len(boxes) == 8, (pair, len(boxes))
        tallest = max(b[3] - b[1] for b in boxes)
        for k, b in enumerate(boxes):
            who = pair[k // 4]
            d = ['down', 'left', 'right', 'up'][k % 4]
            x0, yy0, x1, yy1 = b
            img = trim(to_rgba(a[yy0:yy1, x0:x1], fg[yy0:yy1, x0:x1]))
            save(resize_px(img, max(8, round(img.height * 44 / tallest))), f'npc_{who}_{d}')


EXPR = ['neutral', 'happy', 'surprised', 'worried']
# (y-band index, x-start, x-end, character, count)
PORTRAIT_LAYOUT = [
    (0, 0, 815, 'hero', 4), (0, 905, 1774, 'mori', 4),
    (1, 0, 815, 'kaede', 4), (1, 905, 1774, 'haruto', 4),
    (2, 0, 815, 'aoi', 4), (2, 905, 1774, 'sato', 4),
    (3, 0, 645, 'kirishima', 4), (3, 645, 1160, 'station_staff', 3), (3, 1160, 1774, 'customer', 4),
]


def portraits():
    a = load('portraits.webp')
    fg = ~magenta_mask(a)
    fg = ndimage.binary_opening(fg)
    rowsum = fg.sum(1)
    # horizontal gutters between portrait rows
    h = a.shape[0]
    cuts = [0]
    for target in (h * 1 / 4, h * 2 / 4, h * 3 / 4):
        lo, hi = int(target - 40), int(target + 40)
        cuts.append(lo + int(np.argmin(rowsum[lo:hi])))
    cuts.append(h)
    for band, x0, x1, who, n in PORTRAIT_LAYOUT:
        y0, y1 = cuts[band], cuts[band + 1]
        cols = fg[y0:y1, x0:x1].sum(0)
        # split points: column minima near the equal divisions
        splits = [0]
        for i in range(1, n):
            t = int((x1 - x0) * i / n)
            lo, hi = max(0, t - 30), min(len(cols), t + 30)
            splits.append(lo + int(np.argmin(cols[lo:hi])))
        splits.append(x1 - x0)
        for i in range(n):
            sx0, sx1 = x0 + splits[i], x0 + splits[i + 1]
            img = to_rgba(a[y0:y1, sx0:sx1], keep_main(fg[y0:y1, sx0:sx1]))
            img = trim(img)
            save(resize_px(img, 104), f'portrait_{who}_{EXPR[i]}')
        if n == 3:  # no "worried" frame drawn: reuse neutral
            Image.open(os.path.join(OUT, f'portrait_{who}_neutral.png')).save(os.path.join(OUT, f'portrait_{who}_worried.png'))


# creature-backs.webp: rows left->right
BACK_ROW1 = ['k_fox_blue', 'k_fox_pink', 'k_fox_nine', 'k_sprout', 'k_sprout2', 'k_blob_pink', 'k_bird_blue', 'k_bird_blue2', 'k_fox_orange']
BACK_ROW2 = ['k_fox_black', 'k_fox_black2', 'k_fox_black3', 'k_puff', 'k_fox_winged', 'k_bird_white', 'k_cat_black', 'k_cat_black2']


def backs():
    a = load('creature-backs.webp')
    fg = ndimage.binary_opening(~magenta_mask(a))
    rows = rows_of(components(fg, min_area=3000, dilate=2), tol=140)
    assert [len(r) for r in rows] == [9, 8], [len(r) for r in rows]
    for names, row in zip([BACK_ROW1, BACK_ROW2], rows):
        for name, b in zip(names, row):
            save(crop_sprite(a, fg, b, 66), 'back_' + name)


STORY = ['cg_arrival', 'cg_letter', 'cg_board', 'cg_shrine', 'cg_ending']


def story():
    img = Image.open(os.path.join(SHEETS, 'story.webp')).convert('RGB')
    a = np.array(img).astype(np.int32)
    white = (a.min(2) > 235)
    h, w = white.shape
    # horizontal gutters: rows that are mostly white
    rw = white.mean(1)
    hrows = [y for y in range(h) if rw[y] > 0.85]
    def runs(ix):
        out, s = [], None
        for i, v in enumerate(ix):
            if s is None:
                s = v
            if i + 1 == len(ix) or ix[i + 1] != v + 1:
                out.append((s, v))
                s = None
        return out
    hg = runs(hrows)
    bands, prev = [], 0
    for g0, g1 in hg:
        if g0 - prev > 50:
            bands.append((prev, g0))
        prev = g1 + 1
    if h - prev > 50:
        bands.append((prev, h))
    panels = []
    for y0, y1 in bands:
        cw = white[y0:y1].mean(0)
        vg = runs([x for x in range(w) if cw[x] > 0.85])
        px = 0
        for g0, g1 in vg:
            if g0 - px > 50:
                panels.append((px, y0, g0, y1))
            px = g1 + 1
        if w - px > 50:
            panels.append((px, y0, w, y1))
    assert len(panels) == 5, panels
    for name, (x0, y0, x1, y1) in zip(STORY, panels):
        img.crop((x0 + 2, y0 + 2, x1 - 2, y1 - 2)).save(os.path.join(OUT, name + '.webp'), quality=88)


ITEM_ICONS = ['i_onigiri', 'i_greentea', 'i_cake', 'i_shiori', 'i_omamori', 'i_kakera', 'i_letter_k', 'i_notebook']


def items():
    a = load('items.webp')
    fg = ndimage.binary_opening(~magenta_mask(a))
    boxes = sorted(components(fg, min_area=3000), key=lambda b: b[0])
    assert len(boxes) == 8, len(boxes)
    for name, b in zip(ITEM_ICONS, boxes):
        save(crop_sprite(a, fg, b, 48), name)


# creature-lines.webp: 3 rows (fire fox, bird, leaf), each: stage1 front/back, stage2 front/back, stage3 front/back
LINES = ['fire', 'bird', 'leaf']
STAGE_H = [56, 64, 76]


def creature_lines():
    a = load('creature-lines.webp')
    fg = ndimage.binary_opening(~magenta_mask(a))
    rows = rows_of(components(fg, min_area=3000, dilate=2), tol=120, by_center=True)
    assert [len(r) for r in rows] == [6, 6, 6], [len(r) for r in rows]
    for line, row in zip(LINES, rows):
        for i, b in enumerate(row):
            stage = i // 2 + 1
            prefix = '' if i % 2 == 0 else 'back_'
            save(crop_sprite(a, fg, b, STAGE_H[stage - 1]), f'{prefix}k_{line}{stage}')


# interiors.webp: konbini, library, station waiting room -> map backgrounds (tile = 32px)
INTERIORS = [('room_konbini', 21, 15), ('room_library', 22, 15), ('room_station', 23, 14)]


def interiors():
    a = load('interiors.webp')
    fg = ndimage.binary_opening(~magenta_mask(a))
    boxes = sorted(components(fg, min_area=50000), key=lambda b: (b[1] // 300, b[0]))
    assert len(boxes) == 3, len(boxes)
    for (name, tw, th), (x0, y0, x1, y1) in zip(INTERIORS, boxes):
        img = to_rgba(a[y0:y1, x0:x1], fg[y0:y1, x0:x1]).resize((tw * 32, th * 32), Image.LANCZOS)
        arr = np.array(img)
        arr[:, :, 3] = np.where(arr[:, :, 3] > 128, 255, 0)
        Image.fromarray(arr).save(os.path.join(OUT, name + '.png'))


def station_building():
    """Transparent background: use the image's own alpha channel."""
    img = Image.open(os.path.join(SHEETS, 'station-building.webp')).convert('RGBA')
    arr = np.array(img)
    fg = keep_main(ndimage.binary_opening(arr[:, :, 3] > 128, iterations=2), frac=0.2)
    arr[:, :, 3] = np.where(fg, 255, 0)
    out = resize_px(trim(Image.fromarray(arr, 'RGBA')), 104)
    save(out, 'b_station')


TERRAIN = ['grass', 'flowers', 'tallgrass', 'dirt', 'street', 'plaza', 'water0', 'water1', 'bridge', 'rail', 'platform_edge', 'concrete']
ORGANIC = {'grass', 'flowers', 'tallgrass', 'dirt', 'water0', 'water1', 'concrete'}
TEX = 64  # tile texture size; shown at 32 world px so the art keeps its detail at zoom 2


def make_seamless(arr, band=18):
    """Blend the tile with a half-offset copy so opposite edges match (removes visible seams)."""
    h, w = arr.shape[:2]
    rolled = np.roll(np.roll(arr, h // 2, 0), w // 2, 1)
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.minimum(np.minimum(xx, w - 1 - xx), np.minimum(yy, h - 1 - yy)).astype(np.float32)
    m = np.clip(d / band, 0, 1)[..., None]
    return (arr * m + rolled * (1 - m)).astype(np.uint8)


def terrain():
    img = Image.open(os.path.join(SHEETS, 'terrain.webp')).convert('RGB')
    a = load('terrain.webp')
    fg = ndimage.binary_opening(~magenta_mask(a))
    boxes = sorted(components(fg, min_area=3000, dilate=2), key=lambda b: (b[1] // 200, b[0]))
    assert len(boxes) == 12, len(boxes)
    for name, (x0, y0, x1, y1) in zip(TERRAIN, boxes):
        crop = img.crop((x0 + 4, y0 + 4, x1 - 4, y1 - 4))
        if name == 'bridge':
            crop = crop.rotate(90, expand=True)  # planks run across a river crossed east-west
        t = np.array(crop.resize((TEX, TEX), Image.BOX))
        if name in ORGANIC:
            t = make_seamless(t)
        Image.fromarray(t).save(os.path.join(OUT, f'tile_{name}.png'))
        if name == 'platform_edge':
            # plain platform: the paving above the tactile strip
            top = crop.crop((0, 0, crop.width, int(crop.height * 0.48))).resize((TEX, TEX), Image.BOX)
            top.save(os.path.join(OUT, 'tile_platform.png'))


NATURE = [('tree_round', 74), ('tree_cedar', 86), ('tree_sakura', 74), ('bush', 30), ('bush_flowers', 26),
          ('rock', 26), ('fence', 18), ('fence_post', 18), ('lantern', 40)]


def nature_props():
    a = load('nature-props.webp')
    fg = ndimage.binary_opening(~magenta_mask(a))
    boxes = sorted(components(fg, min_area=3000, dilate=2), key=lambda b: (b[1] // 300, b[0]))
    assert len(boxes) == 9, len(boxes)
    for (name, h), b in zip(NATURE, boxes):
        save(crop_sprite(a, fg, b, h), 'n_' + name)


INTERIORS2 = [('room_apartment', 12, 12), ('room_cafe', 13, 12)]


def interiors2():
    a = load('interiors2.webp')
    fg = ndimage.binary_opening(~magenta_mask(a))
    boxes = sorted(components(fg, min_area=50000), key=lambda b: b[0])
    assert len(boxes) == 2
    for (name, tw, th), (x0, y0, x1, y1) in zip(INTERIORS2, boxes):
        img = to_rgba(a[y0:y1, x0:x1], fg[y0:y1, x0:x1]).resize((tw * 32, th * 32), Image.LANCZOS)
        arr = np.array(img)
        arr[:, :, 3] = np.where(arr[:, :, 3] > 128, 255, 0)
        Image.fromarray(arr).save(os.path.join(OUT, name + '.png'))


def landmarks():
    a = load('landmarks.webp')
    fg = ndimage.binary_opening(~magenta_mask(a))
    boxes = sorted(components(fg, min_area=50000), key=lambda b: b[0])
    assert len(boxes) == 2
    for (name, width), (x0, y0, x1, y1) in zip([('b_lab', 7 * 32), ('p_hokora', 4 * 32)], boxes):
        img = trim(to_rgba(a[y0:y1, x0:x1], fg[y0:y1, x0:x1]))
        save(resize_px(img, round(img.height * width / img.width)), name)


BATTLE_BGS = ['bg_forest_clearing', 'bg_town_sunset', 'bg_shrine_night']


def battle_bgs():
    img = Image.open(os.path.join(SHEETS, 'battle-bgs.webp')).convert('RGB')
    a = np.array(img).astype(np.int32)
    rw = (a.min(2) > 235).mean(1)
    cuts = [y for y in range(a.shape[0]) if rw[y] > 0.85]
    bands, prev = [], 0
    for y in cuts + [a.shape[0]]:
        if y - prev > 50:
            bands.append((prev, y))
        prev = y + 1
    assert len(bands) == 3, bands
    for name, (y0, y1) in zip(BATTLE_BGS, bands):
        img.crop((0, y0 + 1, img.width, y1 - 1)).save(os.path.join(OUT, name + '.webp'), quality=88)


TOWN_BUILDINGS = [('b_apartment2', 112), ('b_konbini2', 128), ('b_ramen2', 104), ('b_library2', 120)]


def town_buildings():
    a = load('town-buildings.webp')
    fg = ndimage.binary_opening(~magenta_mask(a))
    boxes = sorted(components(fg, min_area=50000), key=lambda b: b[0])
    assert len(boxes) == 4, len(boxes)
    for (name, width), (x0, y0, x1, y1) in zip(TOWN_BUILDINGS, boxes):
        crop = a[y0:y1, x0:x1].copy()
        if name == 'b_konbini2':
            # recolour the green/orange fascia stripes to blue so it reads as an original store
            r, g, b = crop[:, :, 0], crop[:, :, 1], crop[:, :, 2]
            band = np.zeros(crop.shape[:2], bool)
            band[int(crop.shape[0] * 0.30):int(crop.shape[0] * 0.50)] = True
            sat = crop.max(2) - crop.min(2)
            hit = band & (sat > 60)
            lum = crop[hit].mean(1, keepdims=True) / 128.0
            crop[hit] = (np.array([[40, 95, 190]]) * lum).clip(0, 255).astype(np.int32)
        img = trim(to_rgba(crop, fg[y0:y1, x0:x1]))
        save(resize_px(img, round(img.height * width / img.width)), name)


def ui_kit():
    """Stitch the 3x3 frame tiles into one nine-slice image; cut name plate, cursor, petals and buttons."""
    a = load('ui-kit.webp')
    fg = ndimage.binary_opening(~magenta_mask(a))
    rgba = np.array(to_rgba(a, fg))
    cols = [(87, 300), (346, 572), (624, 836)]
    rows = [(112, 304), (352, 549), (596, 772)]
    pieces = [[rgba[y0:y1, x0:x1] for (x0, x1) in cols] for (y0, y1) in rows]
    frame = np.concatenate([np.concatenate(r, 1) for r in pieces], 0)
    img = Image.fromarray(frame, 'RGBA')
    img = img.resize((img.width // 4, img.height // 4), Image.LANCZOS)
    arr = np.array(img)
    arr[:, :, 3] = np.where(arr[:, :, 3] > 100, 255, 0)
    Image.fromarray(arr).save(os.path.join(OUT, 'ui_frame.png'))
    print('ui_frame', img.size, 'slices', [(x1 - x0) // 4 for x0, x1 in cols], [(y1 - y0) // 4 for y0, y1 in rows])
    named = {
        'ui_nameplate': ((996, 169, 1566, 358), 48),
        'ui_cursor': ((1050, 447, 1172, 578), 28),
        'ui_petal0': ((1271, 482, 1342, 552), 16),
        'ui_petal1': ((1431, 482, 1510, 552), 16),
        'ui_btn': ((911, 653, 1156, 757), 26),
        'ui_btn_hover': ((1194, 652, 1440, 757), 26),
        'ui_btn_down': ((1477, 652, 1722, 757), 26),
    }
    for name, (box, h) in named.items():
        save(crop_sprite(a, fg, box, h), name)


MENU_ICONS = ['mi_quests', 'mi_kotodama', 'mi_notebook', 'mi_jlpt', 'mi_bag', 'mi_status', 'mi_settings', 'mi_map', 'mi_save']
EMOTES = ['em_alert', 'em_question', 'em_music', 'em_heart', 'em_sweat', 'em_angry', 'em_dots', 'em_idea', 'em_sparkle', 'em_sleep']


def icon_rows():
    for sheet, names, h in [('menu-icons.webp', MENU_ICONS, 32), ('emotes.webp', EMOTES, 24)]:
        a = load(sheet)
        fg = ndimage.binary_opening(~magenta_mask(a))
        boxes = sorted(components(fg, min_area=1500, dilate=2), key=lambda b: b[0])
        assert len(boxes) == len(names), (sheet, len(boxes))
        for name, b in zip(names, boxes):
            save(crop_sprite(a, fg, b, h), name)


FX = ['fire', 'water', 'leaf', 'wind', 'lightning', 'memory', 'hit', 'heal', 'levelup']


def effects():
    """9 rows x 4 frames -> one horizontal strip per effect (4 frames of 72x72)."""
    a = load('effects.webp')
    fg = ~magenta_mask(a)
    # also drop pink-tinted glow fringe that came from blending with the magenta background
    r, g, b = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    fg &= ~((np.minimum(r, b) - g > 70) & (np.abs(r - b) < 90))
    H, W = fg.shape
    cell = 72
    # rows of content separated by empty bands
    filled = ndimage.binary_closing(ndimage.binary_opening(fg).sum(1) >= 10, iterations=6)
    lab, n = ndimage.label(filled)
    bands = [(s_.start, s_.stop) for (s_,) in ndimage.find_objects(lab) if s_.stop - s_.start > 30]
    if len(bands) == 8:  # heal sparkles and the level-up pillar touch: split the last band
        y0, y1 = bands[-1]
        bands[-1:] = [(y0, y0 + (y1 - y0) * 2 // 5), (y0 + (y1 - y0) * 2 // 5, y1)]
    assert len(bands) == 9, bands
    for i, name in enumerate(FX):
        y0, y1 = bands[i]
        y0, y1 = max(0, y0 - 4), min(H, y1 + 4)
        strip = Image.new('RGBA', (cell * 4, cell), (0, 0, 0, 0))
        for f in range(4):
            x0, x1 = int(W * f / 4), int(W * (f + 1) / 4)
            img = to_rgba(a[y0:y1, x0:x1], fg[y0:y1, x0:x1])
            side = max(img.width, img.height)
            sq = Image.new('RGBA', (side, side), (0, 0, 0, 0))
            sq.paste(img, ((side - img.width) // 2, (side - img.height) // 2))
            strip.alpha_composite(resize_px(sq, cell), (f * cell, 0))
        strip.save(os.path.join(OUT, f'fx_{name}.png'))


def chapter_cards():
    img = Image.open(os.path.join(SHEETS, 'chapter-cards.webp')).convert('RGB')
    a = np.array(img).astype(np.int32)
    rw = (a.min(2) > 235).mean(1)
    cuts = [y for y in range(a.shape[0]) if rw[y] > 0.85]
    bands, prev = [], 0
    for y in cuts + [a.shape[0]]:
        if y - prev > 50:
            bands.append((prev, y))
        prev = y + 1
    assert len(bands) == 2, bands
    for name, (y0, y1) in zip(['cg_chapter1', 'cg_chapter2'], bands):
        img.crop((0, y0 + 1, img.width, y1 - 1)).save(os.path.join(OUT, name + '.webp'), quality=88)


if __name__ == '__main__':
    ui_kit()
    icon_rows()
    effects()
    chapter_cards()
    town_buildings()
    terrain()
    nature_props()
    interiors2()
    landmarks()
    battle_bgs()
    station_building()
    items()
    creature_lines()
    interiors()
    os.makedirs(OUT, exist_ok=True)
    hero()
    npcs()
    portraits()
    backs()
    story()
    print('done')
