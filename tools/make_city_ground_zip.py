"""
Builds three ZIPs (Kyoto / Osaka / Tokyo) with prompts + reference images to repaint the city ground maps so that
(1) every building stands on a snug foundation, (2) no bare sand plots remain, (3) repeated blocks differ.

Needs: dump of the maps (maps_objs.json: id -> {image, objects:[{id,x,y,w,h,sprite,at,dy}]}), maps_tiles.json (id -> tiles, plus
_blocking) and full in-game renders (full/<id>.png).
Run: python3 tools/make_city_ground_zip.py <output_dir> <dir with the json files and full/>
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
tiles = json.load(open(os.path.join(src, 'maps_tiles.json')))
BLOCK = set(tiles['_blocking'])

PROMPT = """Repaint the ground map of {place} for a top-down 16-bit pixel-art RPG, in exactly the same painted pixel-art style, but finished and tidy: it must look like a complete, designed place.

TARGET LOOK: a classic farm-sim / village-sim map like Stardew Valley or Harvest Moon. Three-quarter top-down view with a slight front-facing perspective: cliffs, walls, fences, hedges, stairs, bridges and planter beds are drawn with their FRONT FACES visible (you see a bit of their height and thickness), so everything has depth. Fences, low walls, hedges, flower-bed borders and railings are part of the painted ground and clearly separate walkable ground from non-walkable ground. Paths are wide, clear and continuous, laid out on a 32 px tile grid. This is ONE neutral version of the map: do not make seasonal variants and do not change the existing time of day or colour mood.

Image 1 ({img}) is the CURRENT ground map ({w} x {h} px). KEEP THE LAYOUT: every road, crossing, river, canal, bridge, stair, railway, wall, plaza and the overall route network must stay where they are, and keep the same image size. The only intended changes are the fixes listed below (finished spaces, clean edges, wider paths).

What is wrong now and must be fixed:
1. RED boxes in image 2 (footprints_rot_leerflaechen_gelb.jpg) show exactly where the game draws a building on top of this map (the building names are written in the boxes). Everything inside a red box will be hidden by the building, so paint plain neutral paving or gravel there. Directly around each red box the ground must be finished: paving, a small forecourt, a low planter edge, small gardens. There must be NO bare sand or earth left around or beside a building.
2. Image 2 (footprints_rot_leerflaechen_gelb.jpg) also shows YELLOW boxes: bare, unfinished sand or earth rectangles that currently have nothing on them. Every bare sand-coloured rectangle in image 1 (the yellow ones and any similar ones) must become a finished space. {fill}
3. Repeated blocks must not look copy-pasted: where the map has several similar blocks, vary the planting, benches, bicycle racks, small objects and colours so each block is different. Keep the existing colour harmony and time of day.
4. Everything walkable must stay clearly readable as walkable: no tall objects on paths, stairs, crossings or plazas. Low decoration only inside the finished spaces.
5. WALKABLE MASK (image 3, {mask}): GREEN tiles are where the player can walk, RED tiles are blocked. Paint so that every green area clearly reads as walkable ground (path, paving, lawn, plaza, wooden deck, stairs, bridge) and every red area clearly reads as an obstacle (water, cliff or rock face, fence, hedge, tree cluster, flower bed with a stone rim, wall, railing). Edges between the two must be sharp and follow the 32 px tile grid. Never paint a cliff edge, fence, hedge or flower bed on a green tile, and never paint an open path on a red tile, so the player never seems to walk over a cliff, a bed or a fence.
6. ORANGE tiles in the mask are corridors narrower than 3 tiles (96 px) and feel cramped. Make every route between the main places at least 3 tiles (96 px) wide: widen the orange corridors into the neighbouring red decoration (flower beds, hedges, bushes, fence lines, grass verges), but NEVER into water, cliff faces, big trees or the building plots. After widening, every route must stay continuous and connect the same places as before; stairs, bridges, plazas and exits keep their positions.

Do NOT paint any buildings, shop fronts, houses, signs with text, people, cars or text of any kind: the game draws buildings and people on top. Keep the light soft and from the top left.

Image 4 ({shot}) shows how the map looks in the game today with the buildings and people on top, so you can judge what stands where.
Image 5 (style_*.jpg) is a finished map in the target style, for style only, not for layout.

Output: ONE image, exactly {w} x {h} pixels, no border, no text, no UI.
"""
ANL = """Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht hochladen.
Ergebnis speichern als: {name}_plain.png (PNG, nicht JPG) ({w} x {h}).\nEs soll NUR flacher Boden sein: keine Bäume, Zäune, Mauern, Laternen, Bänke, Hecken, Häuser. Die kommen als einzelne Objekte aus den Objekt-Sets und werden vom Spiel daraufgesetzt.
WICHTIG: Straßen, Wasser, Brücken, Treppen, Plätze und Wege müssen an derselben Stelle bleiben. Falls GPT etwas verschiebt, bitte nochmal mit dem Zusatz "Keep every road, river, bridge, stair, plaza and path pixel-exactly where it is in image 1" erzeugen lassen. Ich skaliere leichte Größenabweichungen und prüfe im Spiel, dass alles begehbar bleibt."""

PROMPT = """Repaint the ground map of {place} for a top-down 16-bit pixel-art RPG, as a PLAIN GROUND LAYER only, in exactly the same painted pixel-art style, three-quarter view (Stardew Valley / Harvest Moon look).

HOW THE GAME WORKS: the game draws every upright thing (trees, bushes, hedges, fences, walls, railings, lamp posts, benches, rocks, planters, bicycles, signs, bollards, vending machines, stairs rails, shop fronts, houses) as SEPARATE sprites on top of this ground, so the player can walk behind and in front of them. Therefore this image must contain NO upright objects at all, only flat ground and terrain.

Image 1 ({img}) is the CURRENT map ({w} x {h} px). Keep the same image size and keep the TERRAIN LAYOUT: roads, crossings, paving areas, plazas, paths, rivers, canals, ponds, the sea, bridges (as flat bridge decks), stairs (as flat stair blocks), railway tracks, and cliff or embankment bases stay where they are.

REMOVE from the ground and replace with plain ground that continues the surrounding surface (grass, soil, gravel, paving, forest floor, sand): every tree, bush, hedge, fence, wall, railing, lamp, bench, rock, flower bed with its stone rim, planter, bicycle, vending machine, sign, bollard, pole, barrel, crate, lantern, shrine, torii, and every building. Where the current map has a big tree crown or hedge or wall, paint just the ground below it (dark forest floor, grass, soil, or the base of a wall as a flat strip).

KEEP as flat ground detail: grass texture with tiny flowers and pebbles, worn dirt, paving stone pattern, road markings, crossings, tactile paving lines, manhole covers, drain grates, puddles, fallen leaves, shadows are NOT painted (the game adds shadows). Water with ripples, sand, wet stone edges. Cliffs and sea rocks stay as terrain only where they are part of the shoreline or a flat terrace edge; paint them as low flat rock bands, not tall rock towers.

PERSPECTIVE AND CLARITY: the ground must read very clearly: walkable ground (paving, path, grass, plaza, deck, stairs, bridge) versus areas that will be blocked by objects (water, dense planting areas, wall bases). Use the WALKABLE MASK (image 3, {mask}): GREEN tiles = walkable, keep them as open, clear ground. RED tiles = blocked: these become water, a flat cliff or wall base, a planting strip or forest floor (dark, with leaf litter) that the game will fill with trees, hedges, fences or walls. ORANGE tiles = corridors that are too narrow (< 3 tiles = 96 px): widen them to at least 3 tiles into the neighbouring red area (never into water or building plots), keeping every route connected.

BUILDING PLOTS: the red boxes in image 2 ({boxes}) show where the game draws buildings. Paint plain neutral paving or gravel inside and directly around them (max 1 tile around), no big bare sand yards. The yellow boxes are empty plots without a building: paint them as normal open ground that fits the district ({fill_plain}).

Keep the same time of day and colour harmony, no seasons. Soft light from the top left only on the painted ground texture, no cast shadows. No text, no people, no cars.

Image 4 ({shot}) shows how the map looks in the game today. Image 5 (style_*.jpg) is a finished map in the target style, for style only.

Output: ONE image, exactly {w} x {h} pixels, no border, no text, no UI.
"""

MAPS = {
 'Kyoto': [
  ('k_nishiki', 'Nishiki Market street in Kyoto (a long shopping street with rows of small shop plots)',
   'Turn them into small working shop yards and market corners: stacked wooden crates, pickle barrels, noren-cloth stands without text, a few bicycles, a stone well, a tiny stone garden with a lantern, a bench with a tea stand, potted plants.'),
  ('k_kamo', 'the Kamo river bank in Kyoto (river, stepping stones, riverside paths and terraces)',
   'Turn them into riverside terraces: wooden decks with low tables, benches, red parasols, bamboo fences, small gardens with stone lanterns and maples, a few stepping-stone paths.'),
  ('k_station', 'Kyoto Station forecourt (a modern station, a bus terminal, plazas and a convenience-store plot)',
   'Turn them into tidy city spaces: planted islands with trees, benches, bicycle parking, small paved courtyards, information-stand corners.'),
  ('k_fushimi', 'the Fushimi Inari shrine mountain path in Kyoto (a forest hillside with a long tunnel of red torii gates, stairs and small shrines)',
   'Turn them into shrine spaces: small stone courtyards with lanterns, moss and ferns, offering tables corners, stone foxes, benches.'),
  ('k_gion', 'Gion in Kyoto (old tea-house district with canals, willows and stone paving)',
   'Turn them into moss gardens: stone lanterns, small ponds with a stepping stone, bamboo clumps, raked-gravel corners, maple trees, a small wooden bench.'),
 ],
 'Osaka': [
  ('o_nakanoshima', 'Nakanoshima in Osaka (a riverside park island with a rose garden, paths and a wide river)',
   'Turn them into park spaces: lawns with trees and benches, flower beds, a small pavilion terrace, stone paths.'),
  ('o_umeda', 'Umeda in Osaka (a big station plaza with office blocks and a fountain)',
   'Turn them into pocket plazas and green spaces: lawns with a few trees, benches around a small fountain, cafe terraces with round tables (no text), bicycle parking, planter beds, a small playground corner.'),
  ('o_dotonbori', 'Dotonbori in Osaka (a canal street with food-shop plots along the water)',
   'Turn them into shop courtyards: stacked beer crates and boxes, small tables, lantern posts, bicycles, potted plants, a tiny shrine corner.'),
  ('o_shinsekai', 'Shinsekai in Osaka (a retro district around a tall tower, with a round plaza)',
   'Turn them into lively retro courtyards: small plazas with benches, game-board tables, lantern posts, planters, stacked crates, a little garden pond.'),
  ('o_castle', 'Osaka Castle park (a castle on a stone base inside a moat, with garden paths)',
   'Turn them into park spaces: lawns with cherry and maple groves, picnic spots, stone paths, a rose garden, a stone lantern garden, low hedges.'),
 ],
 'Doerfer': [
  ('valley', 'the Hinomori valley (a hillside village with a terraced vineyard, vegetable beds, rice paddies, a hot spring, waterfalls, stairs and a stone plaza)',
   'Turn them into farm-village spaces: tidy farmyards with fences, stacked firewood, a well, small vegetable beds, drying racks, flower borders.'),
  ('harbor', 'the Shiomi harbour village (a cliffside fishing town with terraces, stairs, a pier, a beach and a lighthouse)',
   'Turn them into harbour-village spaces: fish-drying racks, net piles, wooden crates and barrels, small gardens with low fences, stone steps, bollards.'),
  ('mountain', 'the Yukimi mountain village (snowy village with a stone bridge, a frozen pond, terraced fields and thatched houses)',
   'Turn them into village spaces: snow-covered yards with firewood stacks, low wooden fences, small snow shrines, kamakura snow huts, straw-covered garden beds.'),
  ('forest', 'the Midori forest (a forest clearing with a winding dirt path, a cliff with a stair, tall-grass patches and a pond)',
   'There are few bare plots here; instead clean the edges: make the path wider, the cliff edge clean with a visible rock face, and add low log fences or stone borders where the path meets the tall grass.'),
 ],
 'Hinomori': [
  ('town', 'Hinomori, the small starting town (a main road, a station platform with tracks, a river with a bridge, a pond, a shrine corner, apartment, cafe, library, ramen shop, konbini and a lab in the north-east)',
   'Turn them into small-town spaces: neat gravel or paved yards, a vegetable-bed corner, a bicycle parking spot, a little garden, a bench corner, plain lawn.'),
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
STYLE = {'Kyoto': 'map_gion.png', 'Osaka': 'map_nakanoshima.png', 'Tokyo': 'map_sumida.png', 'Doerfer': 'map_town.png', 'Hinomori': 'map_valley.png'}


def make_mask(mid, im):
    T = tiles[mid]['tiles']
    walk = np.array([[c not in BLOCK for c in row] for row in T])
    full3 = ndimage.binary_erosion(walk, structure=np.ones((3, 3)))
    wide = ndimage.binary_dilation(full3, structure=np.ones((3, 3))) & walk
    narrow = walk & ~wide
    ov = im.copy().convert('RGBA')
    layer = Image.new('RGBA', im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for y in range(walk.shape[0]):
        for x in range(walk.shape[1]):
            box = (x * 32, y * 32, x * 32 + 31, y * 32 + 31)
            if not walk[y, x]:
                d.rectangle(box, fill=(220, 0, 0, 105))
            elif narrow[y, x]:
                d.rectangle(box, fill=(255, 150, 0, 140))
            else:
                d.rectangle(box, fill=(0, 220, 80, 85))
    return Image.alpha_composite(ov, layer).convert('RGB')


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
        name = f"{n}_{city}_{mid.split('_', 1)[-1].capitalize()}"
        d = os.path.join(stage, name)
        os.makedirs(d)
        im.save(os.path.join(d, f"{v['image']}_aktuell.jpg"), quality=92)
        make_mask(mid, im).save(os.path.join(d, 'begehbar_gruen_blockiert_rot_eng_orange.jpg'), quality=90)
        ov.save(os.path.join(d, 'footprints_rot_leerflaechen_gelb.jpg'), quality=93)
        Image.open(os.path.join(src, 'full', mid + '.png')).convert('RGB').resize((1100, 733)).save(os.path.join(d, 'ingame_aktuell.jpg'), quality=86)
        Image.open(os.path.join(A, STYLE[city])).convert('RGB').save(os.path.join(d, 'style_' + STYLE[city].replace('.png', '.jpg')), quality=84)
        w, h = im.size
        open(os.path.join(d, 'PROMPT.txt'), 'w').write(PROMPT.format(place=place, img=f"{v['image']}_aktuell.jpg", w=w, h=h, fill=fill, fill_plain='lawn, gravel, plain paving or open soil, whatever suits the place', boxes='footprints_rot_leerflaechen_gelb.jpg', shot='ingame_aktuell.jpg', mask='begehbar_gruen_blockiert_rot_eng_orange.jpg'))
        open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(ANL.format(name=v['image'], w=w, h=h))
    zp = os.path.join(out, f'Kotodama_Staedte_{city}.zip')
    with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
        for r, _, fs in os.walk(stage):
            for f in fs:
                p = os.path.join(r, f)
                z.write(p, os.path.relpath(p, stage))
    shutil.rmtree(stage)
    print(zp, os.path.getsize(zp) // 1048576, 'MB')
