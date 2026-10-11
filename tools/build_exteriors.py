"""
Cut the town buildings out of the Hinomori exterior sheet (art/sheets/hm_exterior.webp).

Outputs public/assets/bx_<name>.png, scaled to a fixed width so they fit the footprints in
src/content/maps.ts (the sprite is drawn bottom-centred on the footprint).

Run: python3 tools/build_exteriors.py
"""
import os
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from build_rooms import piece, sheet, strict_bg  # noqa: E402
from scipy import ndimage  # noqa: E402
from extract_sheets import OUT, load, resize_px, to_rgba, trim  # noqa: E402

# name: (index on the sheet, width in game px)
BUILDINGS = {
    'apartment': (0, 120),
    'konbini': (1, 132),
    'cafe': (2, 150),
    'library': (3, 128),
    'station': (4, 176),
    'ramen': (5, 108),
    'shrine': (10, 92),
}


def neutral_konbini(img):
    """Make the store read as Hinomori's own konbini: blue fascia stripes, no chain logo."""
    a = np.asarray(img).astype(np.int32).copy()
    h, w = a.shape[:2]
    rgb = a[:, :, :3]
    sat = rgb.max(2) - rgb.min(2)
    band = np.zeros((h, w), bool)
    band[int(h * 0.38):int(h * 0.52)] = True
    hit = band & (sat > 60) & (a[:, :, 3] > 0)
    lum = rgb[hit].mean(1, keepdims=True) / 128.0
    rgb[hit] = (np.array([[40, 95, 190]]) * lum).clip(0, 255)
    # the logo square in the middle of the fascia: continue the stripes across it
    y0, y1 = int(h * 0.35), int(h * 0.555)
    x0, x1 = int(w * 0.37), int(w * 0.59)
    rgb[y0:y1, x0:x1] = rgb[y0:y1, x0 - 3:x0 - 2]
    a[:, :, :3] = rgb
    return Image.fromarray(a.astype(np.uint8), 'RGBA')


def lab(width=224):
    """Dr. Kirishima's lab: a sheet with just this building (pieces touch, so take everything)."""
    a = load('hm_lab_exterior.webp')
    sub = a
    m = ~strict_bg(sub)
    m = ndimage.binary_opening(m, iterations=1)
    pinkish = (sub[:, :, 0] - sub[:, :, 1] > 50) & (sub[:, :, 2] - sub[:, :, 1] > 50)
    m &= ~pinkish  # magenta between the bicycle spokes
    img = trim(to_rgba(sub, m))
    img = resize_px(img, round(img.height * width / img.width))
    img.save(os.path.join(OUT, 'bx_lab.png'))
    print('bx_lab', img.size)


def main():
    sheet('exterior')
    for name, (idx, width) in BUILDINGS.items():
        img = piece('exterior', idx, scale=1)
        img = resize_px(img, round(img.height * width / img.width))
        if name == 'konbini':
            img = neutral_konbini(img)
        img.save(os.path.join(OUT, f'bx_{name}.png'))
        print(f'bx_{name}', img.size)


if __name__ == '__main__':
    main()
    lab()
