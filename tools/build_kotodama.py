"""
Cut the redesigned Kotodama (art/sheets/kd_redesign_*.webp, art/PROMPTS in Kotodama_Redesign).
Each sheet: one row per creature, 4 pictures: front idle, front idle frame 2, back view, action pose.

Every sprite is placed bottom-centred on a fixed canvas, scaled to a target height per evolution
stage, so stage 1 really looks smaller than stage 3 even though the game shows all sprites at
the same display height.

Outputs (public/assets): <key>.png (front), idle_<key>_0/1.png, back_<key>.png, atk_<key>.png

Run: python3 tools/build_kotodama.py
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

sys.path.insert(0, os.path.dirname(__file__))
from build_characters import runs, split_n  # noqa: E402
from build_rooms import strict_bg  # noqa: E402
from extract_sheets import OUT, load, magenta_mask, resize_px, to_rgba, trim  # noqa: E402

CANVAS = (112, 96)  # w, h of front/idle/back sprites
ATK_CANVAS = (150, 110)
HEIGHT = {1: 54, 2: 74, 3: 92, 0: 72}  # stage -> creature height in px (0 = no evolution line)

# sheet: [(sprite key, stage)] top to bottom
SHEETS = {
    'kd_redesign_1.webp': [('k_fox_blue', 1), ('k_fox_winged', 2), ('k_bird1', 1), ('k_bird2', 2), ('k_bird3', 3)],
    'kd_redesign_2.webp': [('k_leaf1', 1), ('k_leaf2', 2), ('k_leaf3', 3), ('k_fire1', 1), ('k_fire2', 2), ('k_fire3', 3)],
    'kd_redesign_3.webp': [('k_puff', 0), ('k_fox_pink', 0), ('k_cat_black', 0)],
    'kd_redesign_4.webp': [('k_peach1', 1), ('k_peach2', 2), ('k_peach3', 3), ('k_steam1', 1), ('k_steam2', 2), ('k_steam3', 3)],
    'kd_harbor.webp': [('k_shell1', 1), ('k_shell2', 2), ('k_shell3', 3), ('k_gull1', 1), ('k_gull2', 2), ('k_gull3', 3)],
    'kd_osaka.webp': [('k_tako1', 1), ('k_tako2', 2), ('k_tako3', 3), ('k_sign1', 1), ('k_sign2', 2), ('k_sign3', 3)],
    'kd_tokyo.webp': [('k_radio1', 1), ('k_radio2', 2), ('k_radio3', 3), ('k_pass1', 1), ('k_pass2', 2), ('k_pass3', 3)],
    'kd_kyoto.webp': [('k_chatama', 1), ('k_bunbuku', 2), ('k_yugetsuru', 3), ('k_inariko', 1), ('k_inahogi', 2), ('k_senbon', 3)],
    'kd_redesign_5.webp': [('k_snow1', 1), ('k_snow2', 2), ('k_snow3', 3), ('k_lantern1', 1), ('k_lantern2', 2), ('k_lantern3', 3)],
}


def cell(a, fg, box, keep_all):
    x0, y0, x1, y1 = box
    sub = a[y0:y1, x0:x1]
    m = fg[y0:y1, x0:x1] & ~strict_bg(sub)
    lab, n = ndimage.label(m)
    if n > 1:
        sizes = ndimage.sum(m, lab, range(1, n + 1))
        # the creature plus its petals/sparkles/effects; drop specks
        keep = [i + 1 for i, s in enumerate(sizes) if s >= (0.004 if keep_all else 0.02) * sizes.max()]
        m = np.isin(lab, keep)
    m = ndimage.binary_fill_holes(m) & ~strict_bg(sub)
    pinkish = (sub[:, :, 0] - sub[:, :, 1] > 60) & (sub[:, :, 2] - sub[:, :, 1] > 60) & (np.abs(sub[:, :, 0] - sub[:, :, 2]) < 60)
    for _ in range(2):
        edge = m & ~ndimage.binary_erosion(m)
        m &= ~(edge & pinkish)
    return trim(to_rgba(sub, m))


def place(img, scale, canvas):
    h = max(4, round(img.height * scale))
    img = resize_px(img, h)
    w, H = canvas
    if img.width > w or img.height > H:  # never crop: shrink to fit
        f = min(w / img.width, H / img.height)
        img = resize_px(img, max(4, int(img.height * f)))
    out = Image.new('RGBA', canvas, (0, 0, 0, 0))
    out.alpha_composite(img, ((w - img.width) // 2, H - img.height))
    return out


def sheet(name, rows):
    a = load(name)
    fg = ndimage.binary_opening(~magenta_mask(a), iterations=2)
    prof = fg.sum(1)
    bands = runs(prof, 20)
    if len(bands) != len(rows):  # rows touch: split the whole content evenly at the emptiest lines
        y0, y1 = bands[0][0], bands[-1][1]
        bands = [(y0 + a0, y0 + a1) for a0, a1 in split_n(prof[y0:y1], len(rows))]
    for (y0, y1), (key, stage) in zip(bands, rows):
        cols = runs(fg[y0:y1].sum(0), 8)
        # merge effect fragments into 4 picture columns: split the row's content evenly at the emptiest columns
        if len(cols) != 4:
            x0, x1 = cols[0][0], cols[-1][1]
            colprof = fg[y0:y1, x0:x1].sum(0)
            cols = [(x0 + c0, x0 + c1) for c0, c1 in split_n(colprof, 4)]
        pics = [cell(a, fg, (c0, y0, c1, y1), keep_all=(i == 3)) for i, (c0, c1) in enumerate(cols)]
        scale = HEIGHT[stage] / pics[0].height
        front, idle2, back = (place(p, scale, CANVAS) for p in pics[:3])
        atk = place(pics[3], scale, ATK_CANVAS)
        front.save(os.path.join(OUT, f'{key}.png'))
        front.save(os.path.join(OUT, f'idle_{key}_0.png'))
        idle2.save(os.path.join(OUT, f'idle_{key}_1.png'))
        back.save(os.path.join(OUT, f'back_{key}.png'))
        atk.save(os.path.join(OUT, f'atk_{key}.png'))
        print(key, 'stage', stage, [p.size for p in pics])


if __name__ == '__main__':
    for n, rows in SHEETS.items():
        sheet(n, rows)
