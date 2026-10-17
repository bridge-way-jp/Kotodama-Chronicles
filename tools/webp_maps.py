"""Painted maps and room backdrops -> WebP (about 5x smaller, so the game starts and changes maps much faster).

public/assets/map_*.png and room*.png stay the editable sources (the other tools write and read them);
this writes public/assets/<name>.webp next to each one, and the build leaves the PNGs out of dist/
(vite.config.ts). The game loads the .webp (assetUrl in src/game/WorldScene.ts).
Run after any tool that changes a map or room picture:  python3 tools/webp_maps.py
"""
import glob
import os

from PIL import Image

A = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'assets')
done = 0
for src in sorted(glob.glob(os.path.join(A, 'map_*.png')) + glob.glob(os.path.join(A, 'room*.png'))):
    dst = src[:-4] + '.webp'
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        continue
    Image.open(src).convert('RGBA').save(dst, 'WEBP', quality=90, method=6)
    done += 1
print(f'{done} converted')
