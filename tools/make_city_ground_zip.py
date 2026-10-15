"""
Builds three ZIPs (Kyoto / Osaka / Tokyo) with prompts + reference images to repaint the city ground maps so that
(1) every building stands on a snug foundation, (2) no bare sand plots remain, (3) repeated blocks differ.

Needs: dump of the maps (maps_objs.json: id -> {image, objects:[{id,x,y,w,h}]}) and full in-game renders (<id>.png).
Run: python3 tools/make_city_ground_zip.py <output_dir> <dir with maps_objs.json and full/>
"""
import json
import os
import shutil
import sys
import zipfile

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')
out = sys.argv[1]
src = sys.argv[2]
data = json.load(open(os.path.join(src, 'maps_objs.json')))

PROMPT = """Repaint the ground map of {place} for a top-down 16-bit pixel-art RPG, in exactly the same painted pixel-art style, but finished and tidy: it must look like a complete, designed place.

Image 1 ({img}) is the CURRENT ground map ({w} x {h} px). KEEP THE LAYOUT PIXEL-FOR-PIXEL: every road, crossing, river, canal, bridge, stair, railway, wall, plaza and walkable path must stay at exactly the same position and shape. Do NOT move or resize anything, and keep the same image size.

What is wrong now and must be fixed:
1. RED boxes in image 2 show exactly where the game draws a building on top of this map (the building names are written in the boxes). Everything inside a red box will be hidden by the building, so paint plain neutral paving or gravel there. Directly around each red box the ground must be finished: paving, a small forecourt, a low planter edge, small gardens. There must be NO bare sand or earth left around or beside a building.
2. Image 2 also shows YELLOW boxes: bare, unfinished sand or earth rectangles that currently have nothing on them. Every bare sand-coloured rectangle in image 1 (the yellow ones and any similar ones) must become a finished space. {fill}
3. Repeated blocks must not look copy-pasted: where the map has several similar blocks, vary the planting, benches, bicycle racks, small objects and colours so each block is different. Autumn mood is fine; keep the existing colour harmony.
4. Everything walkable must stay clearly readable as walkable: no tall objects on paths, stairs, crossings or plazas. Low decoration only inside the finished spaces.

Do NOT paint any buildings, shop fronts, houses, signs with text, people, cars or text of any kind: the game draws buildings and people on top. Keep the light soft and from the top left.

Image 3 ({shot}) shows how the map looks in the game today with the buildings and people on top, so you can judge what stands where.
Image 4 (style_*.jpg) is a finished map in the target style, for style only, not for layout.

Output: ONE image, exactly {w} x {h} pixels, no border, no text, no UI.
"""
ANL = """Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht hochladen.
Ergebnis speichern als: {name}_neu.png (PNG, nicht JPG) ({w} x {h}).
WICHTIG: Straßen, Wasser, Brücken, Treppen, Plätze und Wege müssen an derselben Stelle bleiben. Falls GPT etwas verschiebt, bitte nochmal mit dem Zusatz "Keep every road, river, bridge, stair, plaza and path pixel-exactly where it is in image 1" erzeugen lassen. Ich skaliere leichte Größenabweichungen und prüfe im Spiel, dass alles begehbar bleibt."""

MAPS = {
 'Kyoto': [
  ('k_nishiki', 'Nishiki Market street in Kyoto (a long shopping street with rows of small shop plots)',
   'Turn them into small working shop yards and market corners: stacked wooden crates, pickle barrels, noren-cloth stands without text, a few bicycles, a stone well, a tiny stone garden with a lantern, a bench with a tea stand, potted plants.'),
  ('k_kamo', 'the Kamo river bank in Kyoto (river, stepping stones, riverside paths and terraces)',
   'Turn them into riverside terraces: wooden decks with low tables, benches, red parasols, bamboo fences, small gardens with stone lanterns and maples, a few stepping-stone paths.'),
  ('k_gion', 'Gion in Kyoto (old tea-house district with canals, willows and stone paving)',
   'Turn them into moss gardens: stone lanterns, small ponds with a stepping stone, bamboo clumps, raked-gravel corners, maple trees, a small wooden bench.'),
 ],
 'Osaka': [
  ('o_umeda', 'Umeda in Osaka (a big station plaza with office blocks and a fountain)',
   'Turn them into pocket plazas and green spaces: lawns with a few trees, benches around a small fountain, cafe terraces with round tables (no text), bicycle parking, planter beds, a small playground corner.'),
  ('o_dotonbori', 'Dotonbori in Osaka (a canal street with food-shop plots along the water)',
   'Turn them into shop courtyards: stacked beer crates and boxes, small tables, lantern posts, bicycles, potted plants, a tiny shrine corner.'),
  ('o_shinsekai', 'Shinsekai in Osaka (a retro district around a tall tower, with a round plaza)',
   'Turn them into lively retro courtyards: small plazas with benches, game-board tables, lantern posts, planters, stacked crates, a little garden pond.'),
  ('o_castle', 'Osaka Castle park (a castle on a stone base inside a moat, with garden paths)',
   'Turn them into park spaces: lawns with cherry and maple groves, picnic spots, stone paths, a rose garden, a stone lantern garden, low hedges.'),
 ],
 'Tokyo': [
  ('t_station', 'Tokyo Station and the Marunouchi district (a grand station plaza, ginkgo avenue, office blocks, moat)',
   'Turn them into tidy city spaces: lawns with ginkgo trees, formal flower beds, benches, small paved courtyards in front of office blocks, bicycle racks, planters.'),
  ('t_asakusa', 'Asakusa in Tokyo (a temple approach with a long market street of narrow stall plots, back lanes and a riverside)',
   'Turn the empty stall plots along the market street into finished stall yards (paved or gravel, with low market tables, stacked crates, lantern posts, noren stands without text, benches) and the back-lane blocks into small shrine gardens, vegetable beds, bicycle parking, laundry-pole corners and tiny pocket parks.'),
  ('t_shibuya', 'Shibuya in Tokyo (a scramble crossing surrounded by shopping blocks and a fountain plaza)',
   'Turn them into small urban spaces: paved pocket plazas with benches and planters, bicycle parking, vending-machine corners, tiny parks with a tree, street-performer spots with a low stage (no text).'),
  ('t_shinjuku', 'Shinjuku in Tokyo (skyscrapers, a narrow yokocho alley district, a railway and a park with a pond)',
   'Turn them into finished spaces: alley terraces with beer crates and small tables, lantern posts, planters, tiny shrines, bicycle parking, pocket gardens; the open plots near the skyscrapers become paved plazas with trees and benches.'),
  ('t_sumida', 'the Sumida riverside in Tokyo (a wide river, a promenade, bridges, a tall-tower plot, a playground)',
   'Turn them into riverside park spaces: lawns with cherry trees, benches, a playground (slide, swing, sandbox), paved gathering squares, flower beds, a small garden.'),
 ],
}
STYLE = {'Kyoto': 'map_gion.png', 'Osaka': 'map_nakanoshima.png', 'Tokyo': 'map_sumida.png'}


def analyse(imgname, objs):
    im = Image.open(os.path.join(A, imgname + '.png')).convert('RGB')
    a = np.asarray(im).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    sand = (r > 170) & (r < 245) & (g > 110) & (g < 190) & (b > 50) & (b < 130) & (r - b > 70) & (r - g > 25) & (r - g < 90)
    sand = ndimage.binary_opening(sand, iterations=2)
    lab, _ = ndimage.label(ndimage.binary_closing(sand, iterations=3))
    plots = []
    for i, o in enumerate(ndimage.find_objects(lab), 1):
        h = o[0].stop - o[0].start
        w = o[1].stop - o[1].start
        if (lab[o] == i).sum() > 1800 and w > 40 and h > 40:
            plots.append((o[1].start, o[0].start, o[1].stop, o[0].stop))
    ov = im.copy()
    d = ImageDraw.Draw(ov, 'RGBA')
    for x0, y0, x1, y1 in plots:
        d.rectangle((x0, y0, x1, y1), outline=(255, 230, 0, 255), width=4)
    for o in objs:
        # the game draws each sprite at its natural size, centred on the object box, bottom edge on the box bottom
        sp = os.path.join(A, o['sprite'] + '.png')
        iw, ih = Image.open(sp).size if os.path.exists(sp) else (o['w'] * 32, o['h'] * 32)
        cx = o['at'][0] if o.get('at') else (o['x'] + o['w'] / 2) * 32
        by = o['at'][1] if o.get('at') else (o['y'] + o['h']) * 32 + (o.get('dy') or 0)
        box = (cx - iw / 2, by - ih, cx + iw / 2, by)
        d.rectangle(box, outline=(255, 40, 40, 255), width=4, fill=(255, 60, 60, 70))
        d.text((box[0] + 4, box[1] + 4), o['id'], fill=(255, 255, 255, 255))
    return im, ov


os.makedirs(out, exist_ok=True)
for city, items in MAPS.items():
    stage = os.path.join(out, '_city_stage')
    shutil.rmtree(stage, ignore_errors=True)
    for n, (mid, place, fill) in enumerate(items, 1):
        v = data[mid]
        im, ov = analyse(v['image'], v['objects'])
        name = f"{n}_{city}_{mid.split('_', 1)[1].capitalize()}"
        d = os.path.join(stage, name)
        os.makedirs(d)
        im.save(os.path.join(d, f"{v['image']}_aktuell.jpg"), quality=93)
        ov.save(os.path.join(d, 'footprints_rot_leerflaechen_gelb.jpg'), quality=93)
        Image.open(os.path.join(src, 'full', mid + '.png')).convert('RGB').save(os.path.join(d, 'ingame_aktuell.jpg'), quality=90)
        Image.open(os.path.join(A, STYLE[city])).convert('RGB').save(os.path.join(d, 'style_' + STYLE[city].replace('.png', '.jpg')), quality=90)
        w, h = im.size
        open(os.path.join(d, 'PROMPT.txt'), 'w').write(PROMPT.format(place=place, img=f"{v['image']}_aktuell.jpg", w=w, h=h, fill=fill, shot='ingame_aktuell.jpg'))
        open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(ANL.format(name=v['image'], w=w, h=h))
    zp = os.path.join(out, f'Kotodama_Staedte_{city}.zip')
    with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
        for r, _, fs in os.walk(stage):
            for f in fs:
                p = os.path.join(r, f)
                z.write(p, os.path.relpath(p, stage))
    shutil.rmtree(stage)
    print(zp, os.path.getsize(zp) // 1048576, 'MB')
