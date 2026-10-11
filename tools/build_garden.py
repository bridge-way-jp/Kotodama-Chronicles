"""
Word garden sprites (art/sheets/hm_word_garden.webp): 6 plants x 5 growth stages
(seed, sprout, young, grown, wilted) and a row of extras.

Outputs (public/assets): wg_<plant>_<0..4>.png, wg_soil, wg_soil_wet, wg_border, wg_corner, wg_can, wg_tag
(64 px wide, for the garden screen) and the same names as wgs_* at half size (map objects)

Run: python3 tools/build_garden.py
"""
import os
import sys

import numpy as np
from scipy import ndimage

sys.path.insert(0, os.path.dirname(__file__))
from build_characters import runs  # noqa: E402
from extract_sheets import OUT, load, magenta_mask, resize_px, to_rgba, trim  # noqa: E402

PLANTS = ['sakura', 'peach', 'grape', 'rice', 'sunflower', 'asagao']
EXTRAS = ['soil', 'soil_wet', 'border', 'corner', 'can', 'tag']
SOIL_W = 64  # every plot is drawn on the same soil patch; scale it to this width


def main():
    a = load('hm_word_garden.webp')
    fg = ndimage.binary_opening(~magenta_mask(a), iterations=1)
    # tall grown plants reach into the row above, so cut the plants on a grid:
    # row bottoms come from the soil patches, columns from the column profile
    cols = runs(fg[:850].sum(0), 6)
    assert len(cols) == 5, cols
    soil = fg[:, cols[0][0]:cols[0][1]].sum(1)  # first column: seeds only, rows clearly separated
    rows_y = runs(soil[:850], 6)
    assert len(rows_y) == 6, rows_y
    bottoms = [y1 for _, y1 in rows_y]
    cells = []
    for r, y1 in enumerate(bottoms):
        y0 = bottoms[r - 1] if r else 0
        cells.append([(slice(y0, y1 + 2), slice(max(0, x0 - 4), x1 + 4)) for x0, x1 in cols])
    lab, n = ndimage.label(ndimage.binary_dilation(fg[850:], iterations=6))
    extras = sorted((s for s in ndimage.find_objects(lab) if (s[0].stop - s[0].start) * (s[1].stop - s[1].start) > 900), key=lambda s: s[1].start)
    extras = [(slice(e[0].start + 850, e[0].stop + 850), e[1]) for e in extras]
    assert len(extras) == 6, len(extras)
    rows = cells + [extras]
    scale = SOIL_W / (cols[0][1] - cols[0][0])

    def save(sl, name):
        sub, m = a[sl], fg[sl]
        lab2, k = ndimage.label(m)
        if k > 1:  # drop bits of neighbouring plants that reach into the cell
            sizes = ndimage.sum(m, lab2, range(1, k + 1))
            m = np.isin(lab2, [i + 1 for i, z in enumerate(sizes) if z >= 0.03 * sizes.max()])
        img = trim(to_rgba(sub, m))
        resize_px(img, max(4, round(img.height * scale))).save(os.path.join(OUT, name + '.png'))
        # half-size copies for the plot on the valley map (one 32 px tile per plant)
        resize_px(img, max(4, round(img.height * scale / 2))).save(os.path.join(OUT, name.replace('wg_', 'wgs_') + '.png'))

    for plant, row in zip(PLANTS, rows):
        for stage, sl in enumerate(row):
            save(sl, f'wg_{plant}_{stage}')
    for name, sl in zip(EXTRAS, rows[6]):
        save(sl, f'wg_{name}')
    print('ok', round(scale, 3))


if __name__ == '__main__':
    main()
