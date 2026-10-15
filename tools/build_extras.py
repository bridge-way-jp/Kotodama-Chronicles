"""
Extra graphics from art/sheets: weather particles (hm_particles.webp), word capsules (hm_capsules.webp) and the
crane-game machine with its three claw poses (hm_crane_machine.webp), all on magenta.

Writes public/assets/fx_<kind>_<n>.png (petal, leaf, snow, rain, glow), capsule_<colour>[_open].png,
crane_machine.png, crane_claw_<open|closing|closed>.png
Run: python3 tools/build_extras.py
"""
import os

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'assets')
S = os.path.join(ROOT, 'art', 'sheets')


def blobs(name, min_area=150, grow=4):
    a = np.array(Image.open(os.path.join(S, name)).convert('RGB')).astype(int)
    bg = (a[..., 0] > 170) & (a[..., 2] > 170) & (a[..., 1] < 130)
    fg = ~bg
    lab, n = ndimage.label(ndimage.binary_dilation(fg, iterations=grow))
    res = []
    for sl in ndimage.find_objects(lab):
        sub = a[sl]
        m = ~((sub[..., 0] > 170) & (sub[..., 2] > 170) & (sub[..., 1] < 130))
        if m.sum() < min_area:
            continue
        pink = (sub[..., 0] - sub[..., 1] > 50) & (sub[..., 2] - sub[..., 1] > 50)
        m = ndimage.binary_fill_holes(m)
        for _ in range(2):
            m &= ~((m & ~ndimage.binary_erosion(m)) & pink)
        im = Image.fromarray(np.dstack([sub.astype('uint8'), (m * 255).astype('uint8')]), 'RGBA')
        bb = im.getbbox()
        if bb:
            res.append((sl[0].start, sl[1].start, im.crop(bb)))
    return res


def rows(items, tol=60):
    items = sorted(items, key=lambda t: t[0])
    out = []
    for it in items:
        if out and abs(out[-1][0][0] - it[0]) < tol:
            out[-1].append(it)
        else:
            out.append([it])
    return [[i[2] for i in sorted(r, key=lambda t: t[1])] for r in out]


def scaled(im, h):
    return im.resize((max(1, round(im.width * h / im.height)), h), Image.LANCZOS)


def main():
    kinds = ['petal', 'leaf', 'snow', 'rain', 'glow']
    heights = {'petal': 14, 'leaf': 18, 'snow': 14, 'rain': 22, 'glow': 20}
    r = rows(blobs('hm_particles.webp', min_area=60, grow=10), tol=80)
    assert len(r) == 5, len(r)
    for kind, row in zip(kinds, r):
        row = row[:5]
        for i, im in enumerate(row):
            h = max(6, round(heights[kind] * im.height / max(x.height for x in row)))
            scaled(im, h).save(os.path.join(OUT, f'fx_{kind}_{i}.png'))
    cols = ['pink', 'blue', 'green', 'yellow', 'orange', 'purple']
    r = rows(blobs('hm_capsules.webp', grow=6), tol=120)
    assert len(r) == 2 and len(r[0]) == 6, [len(x) for x in r]
    for i, c in enumerate(cols):
        scaled(r[0][i], 56).save(os.path.join(OUT, f'capsule_{c}.png'))
        scaled(r[1][i], 64).save(os.path.join(OUT, f'capsule_{c}_open.png'))
    b = blobs('hm_crane_machine.webp', min_area=2000, grow=6)
    b.sort(key=lambda t: t[1])
    machine = max(b, key=lambda t: t[2].width * t[2].height)
    claws = sorted([t for t in b if t is not machine], key=lambda t: t[0])
    assert len(claws) == 3, len(claws)
    scaled(machine[2], 300).save(os.path.join(OUT, 'crane_machine.png'))
    for name, t in zip(['open', 'closing', 'closed'], claws):
        scaled(t[2], 120).save(os.path.join(OUT, f'crane_claw_{name}.png'))
    print('extras ok')


if __name__ == '__main__':
    main()
