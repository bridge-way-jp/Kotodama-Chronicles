"""
Bus sprites from art/sheets/hm_bus.webp (front view left, side view right, on magenta).

Writes public/assets/bus_front.png (map: bus pulling up at the stop) and bus_side.png (expressway ride scene).
Run: python3 tools/build_bus.py
"""
import os

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'assets')


def cut(img, box, width):
    a = np.array(img.crop(box).convert('RGB')).astype(int)
    d = np.abs(a - np.array([255, 0, 255])).sum(axis=2)
    keep = ndimage.binary_opening(d > 150, iterations=1)
    lab, n = ndimage.label(keep)
    if n > 1:  # keep the biggest blob only
        sizes = ndimage.sum(keep, lab, range(1, n + 1))
        keep = lab == (1 + int(np.argmax(sizes)))
    keep = ndimage.binary_fill_holes(keep)
    rgba = np.dstack([a.astype('uint8'), (keep * 255).astype('uint8')])
    im = Image.fromarray(rgba, 'RGBA')
    im = im.crop(im.getbbox())
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)


def main():
    sheet = Image.open(os.path.join(ROOT, 'art', 'sheets', 'hm_bus.webp')).convert('RGB')
    cut(sheet, (0, 0, 540, 1024), 72).save(os.path.join(OUT, 'bus_front.png'))
    cut(sheet, (540, 0, 1536, 1024), 480).save(os.path.join(OUT, 'bus_side.png'))


if __name__ == '__main__':
    main()
