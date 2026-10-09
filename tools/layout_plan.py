"""Render art/reference/layout_<map>.json (from tools/layout_plan.mjs) as a colour-coded plan, 32 px per tile."""
import json
import sys
from PIL import Image, ImageDraw

COL = {
    '.': (125, 191, 90), ',': (160, 205, 110), '"': (70, 140, 60), ':': (217, 183, 126), '=': (169, 163, 154),
    '~': (79, 163, 217), 'b': (156, 107, 67), 'T': (35, 90, 45), '#': (120, 80, 50), 'r': (90, 70, 60),
    'p': (200, 195, 185), 'P': (230, 200, 60), 'X': (110, 110, 120), 'x': (185, 185, 190), 'S': (150, 150, 140),
    'K': (130, 100, 70), 'H': (170, 140, 100), 'Z': (60, 60, 70), 'Y': (60, 120, 60), 'J': (230, 120, 150),
}
BIG = {'apartment', 'konbini', 'cafe', 'library', 'ramen', 'station_building', 'lab', 'shrine', 'garden', 'forest_stone'}
T = 32
for mid in sys.argv[1:]:
    d = json.load(open(f'art/reference/layout_{mid}.json'))
    W, H = len(d['tiles'][0]), len(d['tiles'])
    im = Image.new('RGB', (W * T, H * T))
    dr = ImageDraw.Draw(im)
    for y, row in enumerate(d['tiles']):
        for x, c in enumerate(row):
            dr.rectangle([x * T, y * T, x * T + T - 1, y * T + T - 1], fill=COL.get(c, (255, 0, 255)))
    for o in d['objects']:
        box = [o['x'] * T, o['y'] * T, (o['x'] + o['w']) * T - 1, (o['y'] + o['h']) * T - 1]
        if o['id'] in BIG:
            dr.rectangle(box, fill=(200, 60, 60), outline=(255, 255, 255), width=2)
            dr.text((box[0] + 3, box[1] + 3), o['id'].replace('_building', ''), fill=(255, 255, 255))
        else:
            dr.rectangle(box, outline=(255, 255, 255), width=1)
    im.save(f'art/reference/layout_{mid}.png')
    print(mid, im.size)
