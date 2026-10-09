"""
Cut the dialogue portraits out of the Hinomori portrait sheets (art/sheets/portraits_p1/p2.webp).
One row per character, 4 columns: neutral, happy, surprised, worried.
Output: public/assets/portrait_<id>_<expression>.png (104 px tall), overwriting the older portraits.

Run: python3 tools/build_portraits.py
"""
import os
import sys

from scipy import ndimage

sys.path.insert(0, os.path.dirname(__file__))
from build_characters import runs  # noqa: E402
from build_rooms import strict_bg  # noqa: E402
from extract_sheets import OUT, load, magenta_mask, resize_px, to_rgba, trim  # noqa: E402

SHEETS = {
    'portraits_p1.webp': ['hero', 'mori', 'kaede', 'haruto', 'aoi'],
    'portraits_p2.webp': ['sato', 'kirishima', 'station_staff', 'customer'],
}
EXPR = ['neutral', 'happy', 'surprised', 'worried']
HEIGHT = 104


def main():
    for name, people in SHEETS.items():
        a = load(name)
        fg = ndimage.binary_opening(~magenta_mask(a), iterations=2)
        rows = runs(fg.sum(1), 60)
        assert len(rows) == len(people), (name, rows)
        for who, (y0, y1) in zip(people, rows):
            cols = runs(fg[y0:y1].sum(0), 60)
            assert len(cols) == 4, (name, who, cols)
            for expr, (x0, x1) in zip(EXPR, cols):
                sub = a[y0:y1, x0:x1]
                m = fg[y0:y1, x0:x1] & ~strict_bg(sub)
                m = ndimage.binary_fill_holes(m) & ~strict_bg(sub)
                # peel the magenta-tinted anti-aliasing off the outline
                pinkish = (sub[:, :, 0] - sub[:, :, 1] > 40) & (sub[:, :, 2] - sub[:, :, 1] > 40)
                for _ in range(3):
                    edge = m & ~ndimage.binary_erosion(m)
                    m &= ~(edge & pinkish)
                img = trim(to_rgba(sub, m))
                resize_px(img, HEIGHT).save(os.path.join(OUT, f'portrait_{who}_{expr}.png'))
        print(name, ', '.join(people))


if __name__ == '__main__':
    main()
