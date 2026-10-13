"""
First-guess collision grids for the Kyoto maps, read off the painted ground by colour:
  asphalt and water are blocked, strongly saturated tiles (trees, flowers, torii) are blocked, the rest is walkable.
build_kyoto.py applies hand-made corrections (stairs, building plots, crossings) on top of this guess.
"""
import numpy as np
from PIL import Image

W, H, T = 42, 28, 32


def guess(path):
    im = np.array(Image.open(path).convert('RGB').resize((W * T, H * T), Image.LANCZOS)).astype(int)
    rows = []
    for ty in range(H):
        row = ''
        for tx in range(W):
            c = im[ty * T:(ty + 1) * T, tx * T:(tx + 1) * T]
            r, g, b = c[..., 0], c[..., 1], c[..., 2]
            mx, mn = c.max(2), c.min(2)
            sat = (mx - mn) / np.maximum(mx, 1)
            bright = (r + g + b) / 3
            asphalt = ((bright < 110) & (mx - mn < 45) & (b >= r - 5)).mean()
            water = ((b > r + 25) & (b >= g - 5) & (sat > 0.25)).mean()
            foliage = ((sat > 0.68) & (mx > 80)).mean()
            green = ((g > r + 12) & (g > b + 12)).mean()
            if asphalt > 0.55 or water > 0.5 or foliage > 0.38 or green > 0.45:
                row += 'T'
            else:
                row += '.'
        rows.append(row)
    return rows
