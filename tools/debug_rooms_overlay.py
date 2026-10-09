"""Draw each room image with its collision grid (red = blocked) for checking layouts."""
import json, subprocess, sys, os
from PIL import Image, ImageDraw
out = sys.argv[1]
grids = json.loads(subprocess.check_output(['npx', 'vite-node', 'tools/dump_grids.mjs'], text=True).strip().splitlines()[-1])
for mid, info in grids.items():
    im = Image.open(f"public/assets/{info['image']}.png").convert('RGBA')
    im = im.resize((im.width * 2, im.height * 2), Image.NEAREST)
    ov = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    for y, row in enumerate(info['grid']):
        for x, c in enumerate(row):
            box = [x * 64, y * 64, x * 64 + 63, y * 64 + 63]
            col = {'#': (255, 0, 0, 90), 'o': (255, 140, 0, 110), 'N': (0, 0, 255, 120), 'D': (0, 255, 255, 140)}.get(c, (0, 255, 0, 40))
            d.rectangle(box, fill=col, outline=(255, 255, 255, 60))
            d.text((box[0] + 3, box[1] + 2), f'{x},{y}', fill=(255, 255, 255, 230))
    im.alpha_composite(ov); im.save(os.path.join(out, mid + '_ov.png'))
