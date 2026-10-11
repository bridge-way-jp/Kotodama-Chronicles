"""
Chapter-2 art besides the map (see tools/build_valley.py):
- battle backgrounds (art/sheets/battle_bgs_valley.webp, three stacked scenes)
- item icons (art/sheets/hm_items_valley.webp, 4 x 3)
- story pictures (art/sheets/cg_valley_*.webp)

Run: python3 tools/build_valley_assets.py
"""
import os
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from build_rooms import piece, sheet  # noqa: E402
from extract_sheets import OUT, ROOT, resize_px  # noqa: E402

SHEETS = os.path.join(ROOT, 'art', 'sheets')
BGS = ['bg_valley_orchard', 'bg_valley_onsen', 'bg_valley_river']
ITEMS = ['i_peach', 'i_grapes', 'i_onsen_tamago', 'i_grape_juice', 'i_tenugui', 'i_oke',
         'i_fude', 'i_washi', 'i_strawhat', 'i_bus_ticket', 'i_seeds', 'i_watering_can']
CGS = ['cg_valley_arrival', 'cg_valley_onsen', 'cg_valley_calligraphy']


def bgs():
    img = Image.open(os.path.join(SHEETS, 'battle_bgs_valley.webp')).convert('RGB')
    a = np.asarray(img).astype(int)
    dark = (a.sum(2) < 90).mean(1) > 0.9  # the black separator lines
    rows = [y for y in range(a.shape[0]) if dark[y]]
    cuts = [0]
    for y in rows:
        if y - cuts[-1] > 40:
            cuts.append(y)
    cuts.append(a.shape[0])
    bands = [(cuts[i], cuts[i + 1]) for i in range(len(cuts) - 1) if cuts[i + 1] - cuts[i] > 100]
    assert len(bands) == 3, bands
    for name, (y0, y1) in zip(BGS, bands):
        band = img.crop((0, y0 + 4, img.width, y1 - 2))
        band.save(os.path.join(OUT, name + '.webp'), quality=88)


def items():
    sheet('items_valley')
    for i, name in enumerate(ITEMS):
        p = piece('items_valley', i, scale=1)
        resize_px(p, 32 if p.height >= p.width else round(32 * p.height / p.width)).save(os.path.join(OUT, name + '.png'))


def cgs():
    for name in CGS:
        img = Image.open(os.path.join(SHEETS, name + '.webp')).convert('RGB')
        img.thumbnail((1344, 760), Image.LANCZOS)
        img.save(os.path.join(OUT, name + '.webp'), quality=86)


if __name__ == '__main__':
    bgs()
    items()
    cgs()
    print('ok')
