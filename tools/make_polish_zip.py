"""
Builds Kotodama_Politur.zip: prompts + reference images for graphics that would make the finished game look better.
One folder per GPT message (PROMPT.txt + reference images + ANLEITUNG.txt).

Run: python3 tools/make_polish_zip.py <output_dir> <dir with town_layout_plots.png and town_ingame_clean.png>
"""
import os
import shutil
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')
out = sys.argv[1] if len(sys.argv) > 1 else '.'
extra = sys.argv[2] if len(sys.argv) > 2 else '.'

TOWN_PROMPT = """Repaint the ground map of the starting town "Hinomori" for a top-down 16-bit pixel-art RPG, in exactly the same painted pixel-art style as the attached style references (map_valley / map_harbor): rich detail, warm natural colours, soft light, clean pixel edges.

Image 1 (map_town_aktuell.png) is the CURRENT ground map. It is too empty and flat. Make it clearly richer and prettier, but KEEP THE LAYOUT PIXEL-FOR-PIXEL, because walking and collisions depend on it. These must stay exactly where they are (same position and size):
- the wide grey paved road running left to right (about y 310-435), with its stone kerbs, the manhole cover and the two drain grates
- the vertical dirt path at the top and in the middle (about x 650-720), which crosses the road
- the river on the right (about x 1060-1130) with the wooden bridge over the road (about y 310-440) and the railway culvert at the bottom
- the pond (about x 770-930, y 480-570)
- the station platform with the yellow tactile strip (about x 110-1000, y 630-735) and the two railway tracks with the wooden fence below
- the dense forest border all around the edges
- the stone shrine paving at the top left (about x 65-255, y 95-190)

Image 2 (town_layout_plots.png) shows the red footprints where buildings and objects are placed on top of this map in the game. Do NOT paint any buildings, houses, shops, signs, lamps, benches, people or text. Instead:
- Under every red building footprint paint a neutral ground: packed earth, gravel, small paving or a low garden bed edge, so a building can stand there without a grass-coloured patch showing through at its feet. The cafe (top, right of centre) and the lab (top right) need a bit of paved forecourt.
- Add life to the open grass areas WITHOUT blocking paths: small vegetable patches, flower beds along the road, low hedges, stepping stones, a laundry-pole base, a few bushes and rocks, patches of clover, a dirt trail along the river bank, small wooden planks over the ditch, fallen cherry petals on the road and the grass.
- Keep every walkable area clearly readable as walkable (no tall objects on paths).
- Soft, even daylight from the top left, spring mood (a few cherry petals).

Image 3 (town_ingame_clean.png) shows how the map looks in the game right now with all buildings on top, so you can judge what will stand where.

Output: ONE image, exactly 1408 x 960 pixels, no border, no text, no UI.
"""

ANLEITUNG_TOWN = """Reihenfolge in GPT: Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht hochladen.
Ergebnis speichern als: map_town_neu.png (1408 x 960). Danach sage ich mir (Claude) Bescheid, ich tausche es ein und prüfe, ob alles noch begehbar ist.
WICHTIG: Straße, Fluss, Brücke, Gleise, Teich und Bahnsteig müssen an derselben Stelle bleiben. Wenn GPT etwas verschiebt, bitte noch einmal mit dem Zusatz "Keep every road, river, bridge, track and pond pixel-exactly where it is in image 1" erzeugen lassen."""

FOLDERS = [
    ('1_Hinomori_Ort_neu', TOWN_PROMPT, ANLEITUNG_TOWN, [
        (os.path.join(A, 'map_town.png'), 'map_town_aktuell.png'),
        (os.path.join(extra, 'town_layout_plots.png'), 'town_layout_plots.png'),
        (os.path.join(extra, 'town_ingame_clean.png'), 'town_ingame_clean.png'),
        (os.path.join(A, 'map_valley.png'), 'style_map_valley.png'),
        (os.path.join(A, 'map_harbor.png'), 'style_map_harbor.png'),
    ]),
]

stage = os.path.join(out, '_polish_stage')
shutil.rmtree(stage, ignore_errors=True)
for name, prompt, anleitung, refs in FOLDERS:
    d = os.path.join(stage, name)
    os.makedirs(d)
    open(os.path.join(d, 'PROMPT.txt'), 'w').write(prompt)
    open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(anleitung)
    for src, dst in refs:
        shutil.copy(src, os.path.join(d, dst))
zp = os.path.join(out, 'Kotodama_Politur.zip')
with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
    for r, _, fs in os.walk(stage):
        for f in fs:
            p = os.path.join(r, f)
            z.write(p, os.path.relpath(p, stage))
shutil.rmtree(stage)
print(zp, os.path.getsize(zp) // 1024, 'KB')
