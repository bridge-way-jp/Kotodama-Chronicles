"""
ZIPs with prompts to repaint the flat ground of every outdoor map so that it reads exactly like the game plays:
walkable ground looks walkable, blocked ground looks blocked, and paths only reach the map border at real exits.

Per map: the current ground, a colour mask of the game's real collision (green walkable, red blocked, grey building
plots, blue exits), an in-game screenshot and a style reference. Run:
  npx vite-node tools/dump_walk.mts <walk.json>   (with the edge barriers, see build_edges.py)
  python3 tools/make_clarity_ground_zip.py <out dir> <walk.json> <dir with ingame screenshots town_<id>.png>
"""
import json
import os
import shutil
import sys
import zipfile

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')
T = 32

PROMPT = """Repaint the GROUND LAYER of {place} for a top-down 16-bit pixel-art RPG (Stardew Valley / Harvest Moon look, three-quarter view), in the same painted pixel-art style and colours as image 1. The goal is CLARITY: a player must see at a glance where they can walk and where they cannot.

Image 1 ({img}) is the current ground, {w} x {h} px = {tw} x {th} tiles of 32 px. Keep the same size and the same overall layout (roads, water, bridges, stairs, plazas, railway stay where they are).

Image 2 ({mask}) is the EXACT collision of the game on a 32 px grid. It is the most important reference:
- GREEN tiles = walkable. Paint them as clearly walkable ground: paving, a dirt or gravel path, a plaza, a wooden deck, a bridge deck, flat stairs or short lawn. Every green area must look open and inviting, with no clutter.
- RED tiles = blocked. Paint them so they clearly read as "you cannot go here": water, a flat cliff or rock base, a wall base, a dense flower or planting bed with a clear stone or wooden rim, deep tall grass, the base of a hedge row. Never paint a path, paving or stairs inside red.
- GREY tiles = building plots: plain neutral paving or gravel there, the game draws the buildings on top.
- BLUE tiles = exits to the next area. A road or path may run to the edge of the image ONLY at blue tiles. Everywhere else the image border must clearly be closed: no road, path, stairs, bridge or crossing running into the border. End them before the border, or bend them, or close them with the base of a hedge, wall or fence line.
- The border between green and red must be crisp and follow the tile grid: a clean kerb, a stone rim, a hedge base line or a shoreline, not a soft blend.

Do NOT paint upright objects (trees, bushes, fences, lamps, benches, signs, buildings, people, cars, text): the game draws those as separate sprites on top. Only flat ground with fine detail (grass texture, paving pattern, road markings, puddles, a few fallen leaves). No cast shadows, soft light from the top left. No grid lines in the result.

Image 3 ({shot}) shows the map in the game today with buildings and people on top. Image 4 ({style}) is a finished map in the target style, for style only.

Output: ONE image, exactly {w} x {h} pixels, no border, no text, no UI.
"""

ANL = """Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht an GPT.
Ergebnis speichern als: {name}_plain.png (PNG, {w} x {h}).
Wichtig ist Bild 2 (die Maske): grün = begehbar, rot = gesperrt, grau = Hausfläche, blau = Ausgang. Wege dürfen nur an den blauen Stellen bis zum Rand gehen.
Wenn GPT trotzdem Wege in rote Flächen oder an den Rand malt: nochmal mit dem Zusatz "Follow image 2 exactly: no path or paving on red tiles, no road reaching the border except at blue tiles."
Kleine Abweichungen kann ich ausgleichen, und mit dem Editor-Pinsel (?edit, „begehbar / gesperrt“) kannst du danach selbst nachbessern."""

PLACES = {
    'Hinomori': [
        ('town', 'Hinomori, the small starting town (main road, station platform with tracks, a river with a bridge, a pond, a shrine corner)'),
        ('forest', 'the Midori forest (a clearing with a winding dirt path, a cliff with a stair, a pond)'),
        ('valley', 'the Hinomori valley village (vineyard terraces, fields, a hot spring, waterfalls, stairs, a stone plaza)'),
        ('mountain', 'the snowy Yukimi mountain village (a stone bridge, a frozen pond, terraced fields)'),
        ('harbor', 'the Shiomi harbour village (cliff terraces, stairs, piers, a beach, a lighthouse cliff)'),
    ],
    'Kyoto': [
        ('k_station', 'the Kyoto Station forecourt (station building, bus area, plazas)'),
        ('k_nishiki', 'Nishiki Market street in Kyoto (a covered shopping street with rows of shop plots)'),
        ('k_kamo', 'the Kamo river bank in Kyoto (river, riverside paths and terraces)'),
        ('k_gion', 'Gion in Kyoto (old tea-house district with canals and stone paving)'),
        ('k_fushimi', 'the Fushimi Inari shrine mountain (a forest hillside, a long path of torii gates up to the summit)'),
    ],
    'Osaka': [
        ('o_umeda', 'Umeda in Osaka (a big station plaza with office blocks)'),
        ('o_nakanoshima', 'Nakanoshima in Osaka (a riverside park island with a rose garden)'),
        ('o_dotonbori', 'Dotonbori in Osaka (a canal street with food shops)'),
        ('o_shinsekai', 'Shinsekai in Osaka (a retro district around a tower with a round plaza)'),
        ('o_castle', 'Osaka Castle park (a castle on a stone base inside a moat, garden paths)'),
    ],
    'Tokyo': [
        ('t_station', 'Tokyo Station and Marunouchi (a station plaza, avenues, office blocks)'),
        ('t_asakusa', 'Asakusa in Tokyo (temple gate, a market street of stalls, back lanes)'),
        ('t_shibuya', 'Shibuya in Tokyo (the scramble crossing with shopping blocks)'),
        ('t_shinjuku', 'Shinjuku in Tokyo (skyscrapers, the yokocho alleys, a park)'),
        ('t_sumida', 'the Sumida riverside in Tokyo (a river promenade, bridges, a park)'),
    ],
}
STYLE = {'Hinomori': 'map_valley', 'Kyoto': 'map_gion', 'Osaka': 'map_nakanoshima', 'Tokyo': 'map_sumida'}


def mask(m, im):
    W, H = im.size
    tw, th = W // T, H // T
    lay = Image.new('RGBA', im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    exits = {(x, y) for x, y, _ in m['warps']}
    for y in range(th):
        for x in range(tw):
            v = m['solid'][y][x]
            box = (x * T, y * T, x * T + T - 1, y * T + T - 1)
            if (x, y) in exits:
                d.rectangle(box, fill=(30, 110, 255, 200))
            elif v == 0 or v == 4:
                d.rectangle(box, fill=(0, 210, 80, 95))
            elif v == 2:
                d.rectangle(box, fill=(110, 110, 110, 190))
            else:
                d.rectangle(box, fill=(225, 0, 0, 115))
    out = Image.alpha_composite(im.convert('RGBA'), lay)
    g = ImageDraw.Draw(out)
    for x in range(0, W, T):
        g.line([(x, 0), (x, H)], fill=(255, 255, 255, 60))
    for y in range(0, H, T):
        g.line([(0, y), (W, y)], fill=(255, 255, 255, 60))
    return out.convert('RGB')


def main():
    out, walk_json, shots = sys.argv[1], sys.argv[2], sys.argv[3]
    D = json.load(open(walk_json))
    os.makedirs(out, exist_ok=True)
    for region, items in PLACES.items():
        stage = os.path.join(out, '_ground_stage_' + region)
        shutil.rmtree(stage, ignore_errors=True)
        for n, (mid, place) in enumerate(items, 1):
            m = D[mid]
            img = m['image']
            im = Image.open(os.path.join(A, img + '.png')).convert('RGB')
            W, H = len(m['solid'][0]) * T, len(m['solid']) * T
            im = im.resize((W, H))
            d = os.path.join(stage, f'{n}_{region}_{mid}')
            os.makedirs(d)
            names = {'img': f'1_{img}_aktuell.jpg', 'mask': '2_maske_gruen_begehbar_rot_gesperrt_blau_ausgang.png', 'shot': '3_im_spiel.jpg', 'style': f'4_stil_{STYLE[region]}.jpg'}
            im.save(os.path.join(d, names['img']), quality=92)
            mask(m, im).save(os.path.join(d, names['mask']), optimize=True)
            Image.open(os.path.join(shots, f'town_{mid}.png')).convert('RGB').save(os.path.join(d, names['shot']), quality=85)
            Image.open(os.path.join(A, STYLE[region] + '.png')).convert('RGB').save(os.path.join(d, names['style']), quality=82)
            open(os.path.join(d, 'PROMPT.txt'), 'w').write(PROMPT.format(place=place, w=W, h=H, tw=W // T, th=H // T, **names))
            open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(ANL.format(name=img, w=W, h=H))
        zp = os.path.join(out, f'Kotodama_Boden_Klarheit_{region}.zip')
        with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
            for r, _, fs in os.walk(stage):
                for f in sorted(fs):
                    p = os.path.join(r, f)
                    z.write(p, os.path.relpath(p, stage))
        shutil.rmtree(stage)
        print(zp, round(os.path.getsize(zp) / 1e6, 1), 'MB')


if __name__ == '__main__':
    main()
