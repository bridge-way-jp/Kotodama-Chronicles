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


def rows_of(boxes, tol=60):
    boxes = sorted(boxes, key=lambda b: b[1])
    rows = []
    for b in boxes:
        if rows and abs(rows[-1][0][1] - b[1]) < tol:
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


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    hero()
    npcs()
    portraits()
    backs()
    story()
    print('done')
