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
from build_characters import runs, split_n  # noqa: E402
from build_rooms import strict_bg  # noqa: E402
from extract_sheets import OUT, load, magenta_mask, resize_px, to_rgba, trim  # noqa: E402

SHEETS = {
    'portraits_p1.webp': ['hero', 'mori', 'kaede', 'haruto', 'aoi'],
    'portraits_p2.webp': ['sato', 'kirishima', 'station_staff', 'customer'],
    'portraits_valley.webp': ['hayashi', 'sakura', 'okami', 'kenji', 'ota'],
    'portraits_mountain.webp': ['tsuru', 'hina', 'fujii', 'kuroda', 'jokan', 'traveller'],
    'portraits_harbor.webp': ['gen', 'nagisa', 'hamada', 'kaito', 'umino', 'shiraishi'],
    'portraits_kyoto.webp': ['sumie', 'matsuo', 'rin', 'ikeda', 'sakamoto', 'emma'],
    'portraits_osaka.webp': ['tachibana', 'kenta', 'okan', 'fujita', 'minh', 'porter'],
    'portraits_tokyo.webp': ['kuroi', 'haru', 'yoshie', 'yamamoto', 'priya', 'attendant'],
}
EXPR = ['neutral', 'happy', 'surprised', 'worried']
HEIGHT = 104


def main():
    for name, people in SHEETS.items():
        a = load(name)
        fg = ndimage.binary_opening(~magenta_mask(a), iterations=2)
        rows = runs(fg.sum(1), 60)
        if len(rows) != len(people):  # rows touch (hats, shoulders): split the content evenly at the emptiest lines
            y0, y1 = rows[0][0], rows[-1][1]
            rows = [(y0 + r0, y0 + r1) for r0, r1 in split_n(fg[y0:y1].sum(1), len(people))]
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
