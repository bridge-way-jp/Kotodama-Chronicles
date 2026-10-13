"""
Chapter-2 and chapter-3 art besides the maps (see tools/build_valley.py):
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
from scipy import ndimage  # noqa: E402

from build_rooms import strict_bg  # noqa: E402
from extract_sheets import OUT, ROOT, load, magenta_mask, resize_px, to_rgba, trim  # noqa: E402

SHEETS = os.path.join(ROOT, 'art', 'sheets')
BGS = ['bg_valley_orchard', 'bg_valley_onsen', 'bg_valley_river']
ITEMS = ['i_peach', 'i_grapes', 'i_onsen_tamago', 'i_grape_juice', 'i_tenugui', 'i_oke',
         'i_fude', 'i_washi', 'i_strawhat', 'i_bus_ticket', 'i_seeds', 'i_watering_can']
CGS = ['cg_valley_arrival', 'cg_valley_onsen', 'cg_valley_calligraphy']


def bgs(sheet='battle_bgs_valley.webp', names=BGS):
    img = Image.open(os.path.join(SHEETS, sheet)).convert('RGB')
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
    for name, (y0, y1) in zip(names, bands):
        band = img.crop((0, y0 + 4, img.width, y1 - 2))
        band.save(os.path.join(OUT, name + '.webp'), quality=88)


def grid_items(file, names, cols=4, rows=3):
    """Items on a regular grid; each cell keeps all its parts (e.g. steam above a cup)."""
    a = load(file)
    fg = ndimage.binary_opening(~magenta_mask(a), iterations=1)
    h, w = fg.shape
    for i, name in enumerate(names):
        r, c = divmod(i, cols)
        y0, y1, x0, x1 = r * h // rows, (r + 1) * h // rows, c * w // cols, (c + 1) * w // cols
        m = fg[y0:y1, x0:x1] & ~strict_bg(a[y0:y1, x0:x1])
        lab, n = ndimage.label(m)
        if n > 1:  # drop stray specks from the neighbouring cells, keep real parts like steam
            sizes = ndimage.sum(m, lab, range(1, n + 1))
            m = np.isin(lab, [i + 1 for i, sz in enumerate(sizes) if sz >= 0.02 * sizes.max()])
        p = trim(to_rgba(a[y0:y1, x0:x1], m))
        resize_px(p, 32 if p.height >= p.width else round(32 * p.height / p.width)).save(os.path.join(OUT, name + '.png'))


def cgs(names=CGS):
    for name in names:
        img = Image.open(os.path.join(SHEETS, name + '.webp')).convert('RGB')
        img.thumbnail((1344, 760), Image.LANCZOS)
        img.save(os.path.join(OUT, name + '.webp'), quality=86)


# chapter 3: Yukimi mountain village
MOUNTAIN_BGS = ['bg_mountain_village', 'bg_mountain_trail', 'bg_mountain_temple']
MOUNTAIN_ITEMS = ['i_amazake', 'i_oyaki', 'i_kairo', 'i_mittens', 'i_yukigutsu', 'i_herbs',
                  'i_hoshigaki', 'i_usagi_charm', 'i_chochin', 'i_stamp', 'i_sealed_letter', 'i_train_ticket']
MOUNTAIN_CGS = ['cg_mountain_arrival', 'cg_mountain_hearth', 'cg_mountain_festival']

# chapter 4: Shiomi harbour town (art/PROMPTS_REGION4.md)
HARBOR_BGS = ['bg_harbor_quay', 'bg_harbor_beach', 'bg_harbor_cliff']
HARBOR_ITEMS = ['i_lemon', 'i_ikayaki', 'i_takosen', 'i_sea_salt', 'i_ferry_ticket', 'i_pink_shell',
                'i_glass_float', 'i_message_bottle', 'i_lighthouse_key', 'i_hachimaki', 'i_uchiwa', 'i_song_sheet']
HARBOR_CGS = ['cg_harbor_arrival', 'cg_harbor_song', 'cg_harbor_lighthouse']


def harbor():
    bgs('battle_bgs_harbor.webp', HARBOR_BGS)
    grid_items('hm_items_harbor.webp', HARBOR_ITEMS)
    cgs(HARBOR_CGS)


# chapter 5: Kyoto (art/PROMPTS_REGION5.md)
KYOTO_BGS = ['bg_kyoto_gion', 'bg_kyoto_river', 'bg_kyoto_fushimi']
KYOTO_CGS = ['cg_kyoto_arrival', 'cg_kyoto_tea', 'cg_kyoto_fushimi']


KYOTO_ITEMS = ['i_matcha', 'i_wagashi', 'i_sensu', 'i_furoshiki', 'i_omamori_k', 'i_tsukemono',
               'i_yatsuhashi', 'i_ic_card', 'i_goshuin', 'i_incense', 'i_ema', 'i_cranes']


def kyoto():
    grid_items('hm_items_kyoto.webp', KYOTO_ITEMS)
    bgs('battle_bgs_kyoto.webp', KYOTO_BGS)
    cgs(KYOTO_CGS)


# easter eggs (art/PROMPTS_EASTER_EGGS.md)
EGG_CGS = ['cg_egg_newyear', 'cg_egg_tanabata', 'cg_egg_midnight', 'cg_egg_mirror']


def single_item(file, name):
    """One icon alone on a magenta sheet."""
    a = load(file)
    fg = ndimage.binary_opening(~magenta_mask(a), iterations=1) & ~strict_bg(a)
    lab, n = ndimage.label(fg)
    if n > 1:  # keep the icon, drop specks
        sizes = ndimage.sum(fg, lab, range(1, n + 1))
        fg = np.isin(lab, [i + 1 for i, sz in enumerate(sizes) if sz >= 0.02 * sizes.max()])
    p = trim(to_rgba(a, fg))
    resize_px(p, 32 if p.height >= p.width else round(32 * p.height / p.width)).save(os.path.join(OUT, name + '.png'))


def eggs():
    single_item('hm_item_koban.webp', 'i_koban')
    cgs(EGG_CGS)


if __name__ == '__main__':
    bgs()
    grid_items('hm_items_valley.webp', ITEMS)
    eggs()
    harbor()
    kyoto()
    cgs()
    bgs('battle_bgs_mountain.webp', MOUNTAIN_BGS)
    grid_items('hm_items_mountain.webp', MOUNTAIN_ITEMS)
    cgs(MOUNTAIN_CGS)
    print('ok')
