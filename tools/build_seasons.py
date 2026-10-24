"""
Cuts the seasonal nature sheets (objekte_natur_<season>_a.png, 4 x 4 sprites in the order of NATURE in
tools/make_people_seasons_zip.py) into public/assets/<sprite>_<season>.png at the height of the original sprite.
The game swaps them in on the maps that have a painted picture for the season (SEASONAL in src/game/WorldScene.ts).

  python3 tools/build_seasons.py <dir with objekte_natur_*_a.png>
"""
import glob
import os
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_people import grid, sprite  # noqa: E402
from extract_sheets import OUT, resize_px  # noqa: E402
from make_people_seasons_zip import NATURE  # noqa: E402


def main():
    for f in sorted(glob.glob(os.path.join(sys.argv[1], 'objekte_natur_*_a.png'))):
        season = os.path.basename(f).split('_')[2]
        a = np.array(Image.open(f).convert('RGB')).astype(int)
        fg, rows = grid(a, 4, 4)
        boxes = [b for row in rows for b in row]
        for name, box in zip(NATURE, boxes):
            h = Image.open(os.path.join(OUT, name + '.png')).height
            resize_px(sprite(a, fg, box), h).save(os.path.join(OUT, f'{name}_{season}.png'))
        print(season, len(boxes))


if __name__ == '__main__':
    main()
