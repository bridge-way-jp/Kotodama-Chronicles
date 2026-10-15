"""
Builds Kotodama_Politur_2.zip: prompts + reference images for (1) seasonal versions of the Hinomori town map and
(2) rank emblems for the Word Tournament. One folder per GPT message (PROMPT.txt + reference images + ANLEITUNG.txt).

Run: python3 tools/make_polish2_zip.py <output_dir>
"""
import os
import shutil
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')
SH = os.path.join(ROOT, 'art', 'sheets')
out = sys.argv[1] if len(sys.argv) > 1 else '.'

SEASON = """Create a {season} version of the attached ground map of the starting town "Hinomori" for a top-down 16-bit pixel-art RPG, in exactly the same painted pixel-art style.

Image 1 (map_town_basis.png) is the finished SPRING map. KEEP THE LAYOUT PIXEL-FOR-PIXEL: the same image size (1408 x 960), the same road, kerbs, manhole and drain grates, bridge, river, pond, dirt path, gravel yards, vegetable patches, shrine paving, station platform, tracks and fence, in exactly the same positions and shapes. The game draws buildings, people and signs on top, so do NOT paint any buildings, houses, signs, lamps, benches or people, and do not move anything that is walkable.

Change ONLY the season: {change}
Keep the light soft and from the top left. Keep every walkable area clearly readable. Do not add tall objects on paths, road or platform.

Image 2 ({style}) shows how this art style looks in another season/place; use it only as a style and colour-mood reference, not for layout.

Output: ONE image, exactly 1408 x 960 pixels, no border, no text, no UI.
"""

ANL_SEASON = """Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht hochladen.
Ergebnis speichern als: map_town_{key}.png (1408 x 960).
Danach Bescheid sagen: ich trage die Jahreszeit im Spiel ein. Das Spiel zeigt dann automatisch die passende Karte nach dem echten Datum (Frühling März-Mai, Sommer Juni-August, Herbst September-November, Winter Dezember-Februar).
WICHTIG: Straße, Fluss, Brücke, Teich, Pfade, Beete und Bahnsteig müssen an exakt derselben Stelle bleiben. Falls GPT etwas verschiebt oder die Größe ändert, bitte mit dem Zusatz "Keep every road, river, bridge, pond, path, bed and platform pixel-exactly where it is in image 1" nochmal erzeugen lassen (ich kann leicht abweichende Größen skalieren, aber keine verschobenen Dinge reparieren)."""

RANK = """Create ONE sprite sheet of five small rank emblems for a pixel-art RPG word tournament, in exactly the same painted pixel-art style as the attached item/icon references (clean dark outline, warm saturated colours, soft highlights).
Layout: five emblems in a single row, left to right, each centred in an equal square cell of 256 x 256 pixels, with clear empty space between them. Sheet size 1280 x 256. Background: plain pure magenta (#FF00FF), no shadows on the background, no text, no numbers.
The five emblems, in rising order:
1. Apprentice: a simple wooden calligraphy brush crossed with a small blank paper tag, plain brown and cream.
2. Bronze: a round bronze medal with a small embossed leaf, on a red ribbon.
3. Silver: a round silver medal with an embossed crane (bird), on a blue ribbon.
4. Gold: a round gold medal with an embossed cherry blossom, on a red and white ribbon.
5. Word Master: an ornate golden seal in the shape of a rounded square with the kanji 言 (word) engraved in the middle, a small white fox head crest on top, two small floating blossom petals around it. The most impressive of the five.
Each emblem about 200 pixels tall, same viewing angle (front view), same outline thickness.
"""

ANL_RANK = """Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht hochladen.
Ergebnis speichern als: rank_sheet.png (1280 x 256, magenta Hintergrund). Ich schneide die fünf Symbole zu und zeige sie im Ergebnis des Wort-Turniers (rank_0.png bis rank_4.png)."""

FOLDERS = [
    ('1a_Hinomori_Sommer', SEASON.format(season='SUMMER', style='style_map_harbor.png',
        change='lush deep-green grass and bushes, many small yellow and white summer flowers and some sunflowers and hydrangeas along the paths, the cherry trees are fully green (no blossom, no petals), a few dandelion puffs, slightly stronger sunlight, the pond has fresh lily pads, the vegetable patches show tall leafy summer crops (tomatoes, eggplants), the river is a clear bright blue.'),
        ANL_SEASON.format(key='summer'),
        [(os.path.join(A, 'map_town.png'), 'map_town_basis.png'), (os.path.join(A, 'map_harbor.png'), 'style_map_harbor.png')]),
    ('1b_Hinomori_Herbst', SEASON.format(season='AUTUMN', style='style_map_gion.png',
        change='the grass turns yellow-green and golden, bushes turn orange and red, the cherry trees show red-orange leaves, fallen maple and ginkgo leaves lie on the road, the paths and the grass, the flowers are autumn flowers (red spider lilies, cosmos, pampas grass), the vegetable patches show pumpkins and late crops, the pond has a few floating leaves, warm golden light.'),
        ANL_SEASON.format(key='autumn'),
        [(os.path.join(A, 'map_town.png'), 'map_town_basis.png'), (os.path.join(A, 'map_gion.png'), 'style_map_gion.png')]),
    ('1c_Hinomori_Winter', SEASON.format(season='WINTER', style='style_map_mountain.png',
        change='a thin cover of snow on the grass, bushes, tree crowns, stone kerbs, the platform roof line edges and the fence, but the road, the platform surface, the dirt paths and the bridge are cleared of snow (only a little snow at their edges) so they stay readable, bare branches on the cherry trees with snow on them, the pond is partly frozen with a clear patch, the river stays open but has snow on the banks, the vegetable patches are covered with straw mats, cold soft blue-white light.'),
        ANL_SEASON.format(key='winter'),
        [(os.path.join(A, 'map_town.png'), 'map_town_basis.png'), (os.path.join(A, 'map_mountain.png'), 'style_map_mountain.png')]),
    ('2_Rang_Symbole', RANK, ANL_RANK,
        [(os.path.join(SH, 'hm_capsules.webp'), 'style_capsules.webp'), (os.path.join(SH, 'menu-icons.webp'), 'style_menu_icons.webp'),
         (os.path.join(A, 'i_amazake.png'), 'style_item1.png'), (os.path.join(A, 'i_book.png'), 'style_item2.png')]),
]

stage = os.path.join(out, '_polish2_stage')
shutil.rmtree(stage, ignore_errors=True)
for name, prompt, anleitung, refs in FOLDERS:
    d = os.path.join(stage, name)
    os.makedirs(d)
    open(os.path.join(d, 'PROMPT.txt'), 'w').write(prompt)
    open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(anleitung)
    for src, dst in refs:
        shutil.copy(src, os.path.join(d, dst))
zp = os.path.join(out, 'Kotodama_Politur_2.zip')
with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
    for r, _, fs in os.walk(stage):
        for f in fs:
            p = os.path.join(r, f)
            z.write(p, os.path.relpath(p, stage))
shutil.rmtree(stage)
print(zp, os.path.getsize(zp) // 1024, 'KB')
