"""
Train sprites for the ride scene from art/sheets/hm_train_shinkansen.webp (head, middle, tail car) and
hm_train_local.webp (closed, doors open), on magenta.

Writes public/assets/train_{head,mid,tail}.png and train_local.png, train_local_open.png (each cut to its pixels).
Run: python3 tools/build_train.py
"""
import os

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'assets')
S = os.path.join(ROOT, 'art', 'sheets')


def pieces(name, n):
    img = Image.open(os.path.join(S, name)).convert('RGB')
    a = np.array(img).astype(int)
    bg = (a[..., 0] > 190) & (a[..., 2] > 190) & (a[..., 1] < 110)
    lab, k = ndimage.label(ndimage.binary_dilation(~bg, iterations=3))
    boxes = [s for s in ndimage.find_objects(lab) if (s[0].stop - s[0].start) * (s[1].stop - s[1].start) > 5000]
    boxes.sort(key=lambda s: s[0].start)
    assert len(boxes) == n, (name, len(boxes))
    res = []
    for s in boxes:
        sub = a[s]
        m = ~((sub[..., 0] > 170) & (sub[..., 2] > 170) & (sub[..., 1] < 120))
        m = ndimage.binary_fill_holes(m)
        # peel magenta-tinted anti-aliasing off the outline
        pink = (sub[..., 0] - sub[..., 1] > 50) & (sub[..., 2] - sub[..., 1] > 50)
        for _ in range(2):
            m &= ~((m & ~ndimage.binary_erosion(m)) & pink)
        rgba = np.dstack([sub.astype('uint8'), (m * 255).astype('uint8')])
        im = Image.fromarray(rgba, 'RGBA')
        res.append(im.crop(im.getbbox()))
    return res


def platform():
    """The platform strip (magenta removed, cut to its pixels) for the departure board."""
    a = np.array(Image.open(os.path.join(S, 'hm_platform.webp')).convert('RGB')).astype(int)
    bg = (a[..., 0] > 170) & (a[..., 2] > 170) & (a[..., 1] < 120)
    pink = (a[..., 0] - a[..., 1] > 50) & (a[..., 2] - a[..., 1] > 50)
    m = ~bg
    for _ in range(2):
        m &= ~((m & ~ndimage.binary_erosion(m)) & pink)
    im = Image.fromarray(np.dstack([a.astype('uint8'), (m * 255).astype('uint8')]), 'RGBA')
    im = im.crop(im.getbbox())
    im = im.resize((1400, round(im.height * 1400 / im.width)), Image.NEAREST)
    im.save(os.path.join(OUT, 'platform.png'))
    print('platform', im.size)


def main():
    platform()
    head, mid, tail = pieces('hm_train_shinkansen.webp', 3)
    for im, n in ((head, 'train_head'), (mid, 'train_mid'), (tail, 'train_tail')):
        im.save(os.path.join(OUT, n + '.png'))
    closed, opened = pieces('hm_train_local.webp', 2)
    closed.save(os.path.join(OUT, 'train_local.png'))
    opened.save(os.path.join(OUT, 'train_local_open.png'))
    print('train ok', head.size, mid.size, tail.size, closed.size)


if __name__ == '__main__':
    main()
