"""Cut the furniture sheets of the new interiors (art/sheets/furniture_<id>.webp, magenta background) into single sprites.

Writes art/furniture/<id>/NN.png (RGBA, still 64 px per tile) in reading order (rows top to bottom, left to right) and a labelled
contact sheet per room, so build_new_rooms.py can refer to the pieces by number.
Run: python3 tools/cut_new_furniture.py [contact_dir]
"""
import glob
import os
import sys

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

sys.path.insert(0, os.path.dirname(__file__))
from extract_sheets import ROOT, SHEETS, components, load, magenta_mask, rows_of, to_rgba, trim  # noqa: E402


NEW = ['kyoto_wagashi', 'kyoto_fushimi_teestand', 'osaka_kaufhaus', 'osaka_kino', 'osaka_burg_museum', 'tokyo_koban', 'tokyo_karaoke',
       'tokyo_buchhandlung', 'tokyo_souvenirladen', 'tokyo_wohnung', 'tokyo_aussichtsdeck', 'tal_bauernhaus', 'tal_weingut',
       'hafen_restaurant', 'hafen_amt', 'berg_tempel', 'hall_kyoto', 'hall_osaka_umeda', 'hall_tokyo']


def defringe(img):
    """Remove magenta-tinted pixels along the outline, then keep only the main shape."""
    a = np.array(img)
    rgb = a[:, :, :3].astype(int)
    pink = ((rgb[:, :, 0] - rgb[:, :, 1] > 40) & (rgb[:, :, 2] - rgb[:, :, 1] > 40))
    m = a[:, :, 3] > 0
    edge = m & ~ndimage.binary_erosion(m, iterations=2)
    m &= ~(edge & pink)
    a[:, :, 3] = np.where(m, 255, 0)
    return Image.fromarray(a, 'RGBA')


def cut(sheet_name):
    a = load(sheet_name)
    fg = ~magenta_mask(a)
    boxes = [b for r in rows_of(components(fg, min_area=1200, dilate=3), tol=80) for b in r]
    out = []
    for x0, y0, x1, y1 in boxes:
        img = to_rgba(a[y0:y1, x0:x1], fg[y0:y1, x0:x1])
        out.append(defringe(trim(img)))
    return out


def main():
    cdir = sys.argv[1] if len(sys.argv) > 1 else None
    for path in sorted(glob.glob(os.path.join(SHEETS, 'furniture_*.webp'))):
        name = os.path.basename(path)[:-5]
        rid = name[len('furniture_'):]
        if rid not in NEW:
            continue  # an older sheet
        pieces = cut(os.path.basename(path))
        d = os.path.join(ROOT, 'art', 'furniture', rid)
        os.makedirs(d, exist_ok=True)
        for f in glob.glob(os.path.join(d, '[0-9][0-9].png')):
            os.remove(f)
        for i, p in enumerate(pieces):
            p.save(os.path.join(d, f'{i:02d}.png'))
        print(rid, len(pieces), [f'{p.width}x{p.height}' for p in pieces])
        if cdir:
            os.makedirs(cdir, exist_ok=True)
            W = 1536
            sheet = Image.new('RGB', (W, 700), (60, 60, 70))
            x = y = rowh = 0
            dr = ImageDraw.Draw(sheet)
            for i, p in enumerate(pieces):
                q = p if p.height <= 200 else p.resize((round(p.width * 200 / p.height), 200))
                if x + q.width + 8 > W:
                    x, y, rowh = 0, y + rowh + 22, 0
                sheet.paste(q, (x, y + 14), q)
                dr.text((x, y), str(i), fill=(255, 255, 0))
                x += q.width + 14
                rowh = max(rowh, q.height + 14)
            sheet.crop((0, 0, W, min(700, y + rowh + 22))).save(os.path.join(cdir, f'{rid}.png'))


if __name__ == '__main__':
    main()
