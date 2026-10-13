"""
Cut the player, NPCs and townsfolk out of the Hinomori character sheet (art/sheets/hm_characters.webp).

The sheet has 15 full blocks (3 rows x 5): a large front view, two bags, and a 4 x 3 grid of
walk frames: row 1 facing down, row 2 facing left, row 3 facing up (4 frames each).
"right" is the mirrored left row. The smaller blocks in the last row (front/back only)
and the animals are not used yet.

Outputs (overwriting the older sprites of the same name, so run this after extract_sheets.py):
  hero_<dir>_<frame>       player, 4 frames per direction
  npc_<id>_<dir>           NPCs, standing frame
  folk_<id>_<dir>_<frame>  wandering townsfolk

Run: python3 tools/build_characters.py
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

sys.path.insert(0, os.path.dirname(__file__))
from build_rooms import strict_bg  # noqa: E402
from extract_sheets import OUT, load, magenta_mask, resize_px, to_rgba, trim  # noqa: E402

HEIGHT = 46  # tallest walk frame in game px (the old hero was 46, NPCs 44)

# block number on the sheet (row-major, 0-14) -> what it becomes
HERO = 0
NPC_BLOCKS = {'haruto': 1, 'aoi': 2, 'kaede': 4, 'sato': 5, 'mori': 6, 'station_staff': 7}
FOLK_BLOCKS = {'miko': 11, 'chef': 10, 'gardener': 14, 'kid': 12, 'student': 3}
DIRS = ['down', 'left', 'up']


def blocks():
    """Return the 15 full blocks as lists of 12 boxes (x0, y0, x1, y1): rows down/left/up, 4 frames each."""
    a = load('hm_characters.webp')
    fg = ~magenta_mask(a)
    lab, _ = ndimage.label(ndimage.binary_dilation(fg, iterations=2))
    boxes = []
    for s in ndimage.find_objects(lab):
        h, w = s[0].stop - s[0].start, s[1].stop - s[1].start
        if h >= 40 and w >= 20:
            boxes.append((s[1].start, s[0].start, s[1].stop, s[0].stop))
    out = []
    band_h = 245
    for band in range(3):
        y0, y1 = band * band_h, (band + 1) * band_h
        inb = [b for b in boxes if y0 <= (b[1] + b[3]) / 2 < y1]
        # the large front views (frame columns that touch vertically are tall too, but narrow)
        bigs = sorted([b for b in inb if b[3] - b[1] > 110 and b[2] - b[0] > 60], key=lambda b: b[0])
        assert len(bigs) == 5, (band, len(bigs))
        for i, big in enumerate(bigs):
            xend = bigs[i + 1][0] if i + 1 < len(bigs) else a.shape[1]
            out.append(grid(fg, big[2] + 2, y0, xend - 2, y1))
    return a, fg, out


def runs(v, min_len):
    """(start, end) of the stretches where v > 0, ignoring ones shorter than min_len."""
    out, start = [], None
    for i, x in enumerate(list(v) + [0]):
        if x > 0 and start is None:
            start = i
        elif x <= 0 and start is not None:
            if i - start >= min_len:
                out.append((start, i))
            start = None
    return out


def grid(fg, x0, y0, x1, y1):
    """The 4 x 3 walk frames right of a block's large figure, split along empty rows/columns."""
    sub = ndimage.binary_opening(fg[y0:y1, x0:x1])
    rows = runs(sub.sum(1), 25)
    assert len(rows) == 3, (x0, y0, rows)
    boxes = []
    for ry0, ry1 in rows:
        cols = runs(sub[ry0:ry1].sum(0), 12)
        assert len(cols) == 4, (x0, y0, cols)
        boxes += [(x0 + cx0, y0 + ry0, x0 + cx1, y0 + ry1) for cx0, cx1 in cols]
    return boxes


def cut(a, fg, box):
    x0, y0, x1, y1 = box
    sub = a[y0:y1, x0:x1]
    m = fg[y0:y1, x0:x1] & ~strict_bg(sub)
    # drop the purple ground shadow and stray slivers: keep the largest component
    lab, n = ndimage.label(m)
    if n > 1:
        sizes = ndimage.sum(m, lab, range(1, n + 1))
        m = lab == (1 + int(np.argmax(sizes)))
    m = ndimage.binary_fill_holes(m) & ~strict_bg(sub)
    # peel the magenta-tinted anti-aliasing and the purple shadow off the outline
    pinkish = (sub[:, :, 0] - sub[:, :, 1] > 40) & (sub[:, :, 2] - sub[:, :, 1] > 40)
    for _ in range(3):
        edge = m & ~ndimage.binary_erosion(m)
        m &= ~(edge & pinkish)
    return trim(to_rgba(sub, m))


def frames(a, fg, block):
    """{dir: [4 RGBA frames]} at game scale, one common scale per character."""
    imgs = [cut(a, fg, b) for b in block]
    tallest = max(i.height for i in imgs)
    scaled = [resize_px(i, max(8, round(i.height * HEIGHT / tallest))) for i in imgs]
    out = {d: scaled[k * 4:(k + 1) * 4] for k, d in enumerate(DIRS)}
    out['right'] = [i.transpose(Image.FLIP_LEFT_RIGHT) for i in out['left']]
    return out


def main():
    a, fg, bl = blocks()
    f = frames(a, fg, bl[HERO])
    for d, imgs in f.items():
        for i, img in enumerate(imgs):
            img.save(os.path.join(OUT, f'hero_{d}_{i}.png'))
    for who, k in NPC_BLOCKS.items():
        for d, imgs in frames(a, fg, bl[k]).items():
            imgs[0].save(os.path.join(OUT, f'npc_{who}_{d}.png'))
    for who, k in FOLK_BLOCKS.items():
        for d, imgs in frames(a, fg, bl[k]).items():
            for i, img in enumerate(imgs):
                img.save(os.path.join(OUT, f'folk_{who}_{d}_{i}.png'))
    print('hero,', ', '.join(NPC_BLOCKS), ',', ', '.join(FOLK_BLOCKS))


if __name__ == '__main__':
    main()


# ---------------------------------------------------------------- grid-only sheets (no preview figure)
# hm_characters2.webp / hm_animals.webp: blocks of 4 x 3 frames (down / left / up), nothing else.
GRID_SHEETS = {
    'hm_characters2.webp': dict(height=HEIGHT, blocks=[
        ('npc', 'kirishima'), ('npc', 'customer'), ('folk', 'schoolgirl'),
        ('folk', 'salaryman'), ('folk', 'delivery'), None]),
    'hm_animals.webp': dict(height=24, gap=120, blocks=[('folk', 'cat'), ('folk', 'dog'), ('folk', 'sparrow')]),
}


def split3(v):
    """Two cut points near 1/3 and 2/3 of v where the row sum is smallest."""
    n = len(v)
    cuts = []
    for t in (n / 3, 2 * n / 3):
        lo, hi = int(t - n / 8), int(t + n / 8)
        cuts.append(lo + int(np.argmin(v[lo:hi])))
    return [(0, cuts[0]), (cuts[0], cuts[1]), (cuts[1], n)]


def grid_sheet(name, height, blocks, gap=30):
    a = load(name)
    fg = ndimage.binary_opening(~magenta_mask(a))
    cols = runs(fg.sum(0), 10)
    assert len(cols) % 4 == 0, (name, cols)
    groups = [cols[i:i + 4] for i in range(0, len(cols), 4)]
    out = []
    for gx in groups:
        x0, x1 = gx[0][0], gx[-1][1]
        bands = runs(fg[:, x0:x1].sum(1), 15)
        # merge touching frame rows back into blocks: a block is ~3 frame heights tall
        merged = []
        for b in bands:
            if merged and b[0] - merged[-1][1] < gap:
                merged[-1] = (merged[-1][0], b[1])
            else:
                merged.append(b)
        for y0, y1 in merged:
            rows = split3(fg[y0:y1, x0:x1].sum(1))
            out.append([(cx0, y0 + ry0, cx1, y0 + ry1) for ry0, ry1 in rows for cx0, cx1 in gx])
    # order: block rows top to bottom, then left to right
    out.sort(key=lambda bl: (bl[0][1] // 200, bl[0][0]))
    assert len(out) == len(blocks), (name, len(out))
    for spec, bl in zip(blocks, out):
        if spec is None:  # not used (too close to an existing character)
            continue
        kind, who = spec
        imgs = [cut(a, fg, b) for b in bl]
        tallest = max(i.height for i in imgs)
        scaled = [resize_px(i, max(6, round(i.height * height / tallest))) for i in imgs]
        f = {d: scaled[k * 4:(k + 1) * 4] for k, d in enumerate(DIRS)}
        f['right'] = [i.transpose(Image.FLIP_LEFT_RIGHT) for i in f['left']]
        for d, fr in f.items():
            if kind == 'npc':
                fr[0].save(os.path.join(OUT, f'npc_{who}_{d}.png'))
            else:
                for i, img in enumerate(fr):
                    img.save(os.path.join(OUT, f'folk_{who}_{d}_{i}.png'))
    print(name, ', '.join(b[1] for b in blocks if b))


if __name__ == '__main__':
    for n, cfg in GRID_SHEETS.items():
        grid_sheet(n, **cfg)


# ---------------------------------------------------------------- redrawn sheets (art/PROMPTS_CHARACTERS.md)
# blocks of 4 columns x 4 rows (down / left / right / up); blocks with only 3 rows are down / left / up
# and get "right" mirrored. Listed row by row (blocks left to right).
REDRAWN = {
    'hm_chars_main.webp': [[('hero', 'hero'), ('npc', 'mori'), ('npc', 'kaede')],
                           [('npc', 'haruto'), ('npc', 'aoi'), ('npc', 'sato')]],
    # Haruto, Aoi and Satō redrawn with real right-facing views (overrides their 3-row blocks above)
    'hm_chars_main2.webp': [[('npc', 'haruto'), ('npc', 'aoi'), ('npc', 'sato')]],
    # chapter 2: people of the Hinomori valley
    # chapter 3: the snowy mountain village (sheet has 3 rows per block: down, left, up)
    'hm_chars_mountain.webp': [[('npc', 'tsuru'), ('npc', 'hina'), ('npc', 'fujii')],
                               [('npc', 'kuroda'), ('npc', 'jokan'), ('npc', 'traveller')]],
    'hm_chars_valley.webp': [[('npc', 'hayashi'), ('npc', 'sakura'), ('npc', 'okami')],
                             [('npc', 'kenji'), ('npc', 'ota'), ('npc', 'busdriver')]],
    'hm_chars_more.webp': [[('npc', 'kirishima'), ('npc', 'station_staff'), ('npc', 'customer')],
                           [('folk', 'schoolgirl'), ('folk', 'salaryman'), ('folk', 'delivery')]],
    'hm_chars_town.webp': [[('folk', 'miko'), ('folk', 'chef'), ('folk', 'gardener')],
                           [('folk', 'kid'), ('folk', 'student')]],
}


# sheets whose blocks always have this many direction rows (guessing from the block height fails for bulky figures)
ROWS_PER_BLOCK = {'hm_chars_mountain.webp': 3}

CHILDREN = {'kid', 'hina', 'kaito'}
CHILD_HEIGHT = 38


def split_n(v, n):
    """n stretches, cut where the row sum is smallest near the equal divisions."""
    L = len(v)
    cuts = [0]
    for i in range(1, n):
        t = L * i / n
        lo, hi = int(t - L / (3 * n)), int(t + L / (3 * n))
        cuts.append(lo + int(np.argmin(v[lo:hi])))
    cuts.append(L)
    return list(zip(cuts[:-1], cuts[1:]))


def redrawn_sheet(name, layout):
    a = load(name)
    fg = ndimage.binary_opening(~magenta_mask(a))
    cols = runs(fg.sum(0), 10)
    if len(cols) != 4 * len(layout[0]):
        # frames that touch (long hair): split each too-wide run into equal frame columns
        fw = np.median([c1 - c0 for c0, c1 in cols])
        fixed = []
        for c0, c1 in cols:
            n = max(1, round((c1 - c0) / fw))
            prof = fg[:, c0:c1].sum(0)
            fixed += [(c0 + a, c0 + b) for a, b in split_n(prof, n)] if n > 1 else [(c0, c1)]
        cols = fixed
    assert len(cols) == 4 * len(layout[0]), (name, cols)
    # block rows: horizontal gaps across the whole sheet
    bands = runs(fg.sum(1), 15)
    blocks_y, cur = [], None
    for b in bands:
        if cur and b[0] - cur[1] < 20:
            cur = (cur[0], b[1])
        else:
            if cur:
                blocks_y.append(cur)
            cur = b
    blocks_y.append(cur)
    assert len(blocks_y) == len(layout), (name, blocks_y)
    for bi, ((y0, y1), row) in enumerate(zip(blocks_y, layout)):
        for gi, (kind, who) in enumerate(row):
            gx = cols[gi * 4:gi * 4 + 4]
            x0, x1 = gx[0][0], gx[-1][1]
            prof = fg[y0:y1, x0:x1].sum(1)
            # frame rows can touch: count them from the block height (a frame is ~1.25x as tall as wide)
            col_w = sum(c1 - c0 for c0, c1 in gx) / 4
            n = ROWS_PER_BLOCK.get(name) or (4 if (y1 - y0) / col_w > 4.6 else 3)
            if isinstance(n, list):
                n = n[bi]
            rows = split_n(prof, n)
            imgs = [cut(a, fg, (cx0, y0 + ry0, cx1, y0 + ry1)) for ry0, ry1 in rows for cx0, cx1 in gx]
            tallest = max(i.height for i in imgs)
            h = CHILD_HEIGHT if who in CHILDREN else HEIGHT
            scaled = [resize_px(i, max(8, round(i.height * h / tallest))) for i in imgs]
            dirs = ['down', 'left', 'right', 'up'] if n == 4 else ['down', 'left', 'up']
            f = {d: scaled[k * 4:(k + 1) * 4] for k, d in enumerate(dirs)}
            if n == 3:
                f['right'] = [i.transpose(Image.FLIP_LEFT_RIGHT) for i in f['left']]
            for d, fr in f.items():
                if kind == 'hero':
                    for i, img in enumerate(fr):
                        img.save(os.path.join(OUT, f'hero_{d}_{i}.png'))
                elif kind == 'npc':
                    fr[0].save(os.path.join(OUT, f'npc_{who}_{d}.png'))
                else:
                    for i, img in enumerate(fr):
                        img.save(os.path.join(OUT, f'folk_{who}_{d}_{i}.png'))
            print(name, who, f'{n} rows')


# sheets on a fixed grid (cell px): 3 blocks of 4 x 4 cells per block row, rows down / left / right / up
GRID_NPC_SHEETS = {
    'hm_chars_harbor.webp': (128, [['gen', 'nagisa', 'hamada'], ['kaito', 'umino', 'shiraishi']]),
    'hm_chars_kyoto.webp': (128, [['sumie', 'matsuo', 'rin'], ['ikeda', 'sakamoto', 'emma']]),
}


def fixed_grid_sheet(name, cell, layout):
    a = load(name)
    fg = ndimage.binary_opening(~magenta_mask(a))
    for br, row in enumerate(layout):
        for bc, who in enumerate(row):
            imgs = [cut(a, fg, ((bc * 4 + c) * cell, (br * 4 + r) * cell, (bc * 4 + c + 1) * cell, (br * 4 + r + 1) * cell))
                    for r in range(4) for c in range(4)]
            tallest = max(i.height for i in imgs)
            h = CHILD_HEIGHT if who in CHILDREN else HEIGHT
            for k, d in enumerate(['down', 'left', 'right', 'up']):
                img = imgs[k * 4]
                resize_px(img, max(8, round(img.height * h / tallest))).save(os.path.join(OUT, f'npc_{who}_{d}.png'))
            print(name, who, 'fixed grid')


if __name__ == '__main__':
    for n, layout in REDRAWN.items():
        redrawn_sheet(n, layout)
    for n, (cell, layout) in GRID_NPC_SHEETS.items():
        fixed_grid_sheet(n, cell, layout)
