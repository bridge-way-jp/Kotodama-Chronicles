"""
Cuts the object sprite sheets (magenta background) into single trimmed RGBA sprites.
Run: python3 tools/cut_objects.py <dir with Objekte/<set>/objekte_*_[ab].png> <out dir>
Writes <out>/<sheet>_<nn>.png (native size, trimmed) and <out>/manifest.json, plus numbered contact sheets <out>/contact_<sheet>.jpg
"""
import glob, json, os, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
man = {}
for f in sorted(glob.glob(os.path.join(src, '*', 'objekte_*_[ab].png'))):
    name = os.path.basename(f)[len('objekte_'):-4]
    im = Image.open(f).convert('RGB')
    a = np.asarray(im).astype(int)
    d = np.abs(a - np.array([255, 0, 255])).sum(axis=2)
    alpha = np.clip((d - 70) * 255 // 90, 0, 255).astype(np.uint8)
    fg = alpha > 40
    lab, n = ndimage.label(ndimage.binary_dilation(fg, iterations=9))
    objs = ndimage.find_objects(lab)
    items = []
    for i, o in enumerate(objs, 1):
        mask = (lab[o] == i) & ndimage.binary_dilation(fg[o], iterations=0) | (fg[o] & (lab[o] == i))
        h, w = fg[o].shape
        if fg[o].sum() < 400 or h < 14 or w < 14:
            continue
        rgba = np.dstack([a[o].astype(np.uint8), np.where(lab[o] == i, alpha[o], 0).astype(np.uint8)])
        # defringe semi-transparent magenta tint
        m = (rgba[..., 3] > 0) & (rgba[..., 3] < 255)
        rgba[m, 0] = np.minimum(rgba[m, 0], rgba[m, 2])
        spr = Image.fromarray(rgba, 'RGBA')
        bb = spr.getbbox()
        if not bb:
            continue
        spr = spr.crop(bb)
        items.append((o[0].start, o[1].start, spr))
    # reading order: rows (by y bucket) then x
    items.sort(key=lambda t: (t[0] // 120, t[1]))
    cs = Image.new('RGB', (1536, 1024), (60, 60, 70))
    dr = ImageDraw.Draw(cs)
    man[name] = []
    for k, (y, x, spr) in enumerate(items):
        fn = f'{name}_{k:02d}.png'
        spr.save(os.path.join(out, fn))
        man[name].append({'file': fn, 'w': spr.width, 'h': spr.height})
    # contact sheet: re-place on the original positions
    for k, (y, x, spr) in enumerate(items):
        cs.paste(spr, (x, y), spr)
        dr.rectangle((x, y, x + 30, y + 14), fill=(0, 0, 0))
        dr.text((x + 2, y + 1), str(k), fill=(255, 255, 0))
    cs.resize((1100, 733)).save(os.path.join(out, f'contact_{name}.jpg'), quality=88)
    print(name, len(items))
json.dump(man, open(os.path.join(out, 'manifest.json'), 'w'), indent=1)
