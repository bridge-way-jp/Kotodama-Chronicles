"""
Title screen art: the logo (art/sheets/title_logo.webp, already transparent) and the
background pictures for landscape and portrait screens.

Run: python3 tools/build_title.py
"""
import os

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHEETS = os.path.join(ROOT, 'art', 'sheets')
OUT = os.path.join(ROOT, 'public', 'assets')


def logo():
    # the logo already comes with transparency; drop the faint haze around it and make the letters fully opaque
    a = np.asarray(Image.open(os.path.join(SHEETS, 'title_logo.webp')).convert('RGBA')).copy()
    al = a[:, :, 3].astype(int)
    a[:, :, 3] = np.where(al < 24, 0, np.where(al > 200, 255, al)).astype(np.uint8)
    out = Image.fromarray(a, 'RGBA')
    out = out.crop(out.getbbox())
    out.thumbnail((1000, 1000), Image.LANCZOS)
    out.save(os.path.join(OUT, 'title_logo.png'))


def bgs():
    for name, box in [('title_bg_wide', (1920, 1080)), ('title_bg_tall', (1080, 1920))]:
        img = Image.open(os.path.join(SHEETS, name + '.webp')).convert('RGB')
        img.thumbnail(box, Image.LANCZOS)
        img.save(os.path.join(OUT, name + '.webp'), quality=86)


if __name__ == '__main__':
    logo()
    bgs()
    print('ok')
