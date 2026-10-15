"""
Builds Kotodama_Politur_3.zip: seasonal versions (summer, autumn, winter) of the Hinomori valley and the Midori forest.
One folder per GPT message (PROMPT.txt + reference images + ANLEITUNG.txt).

Run: python3 tools/make_polish3_zip.py <output_dir>
"""
import os
import shutil
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')
out = sys.argv[1] if len(sys.argv) > 1 else '.'

TEMPLATE = """Create a {season} version of the attached ground map of {place} for a top-down 16-bit pixel-art RPG, in exactly the same painted pixel-art style.

Image 1 ({base}) is the finished SPRING map. KEEP THE LAYOUT PIXEL-FOR-PIXEL: the same image size ({w} x {h}) and everything {keep}, in exactly the same positions and shapes. The game draws buildings, people, signs and crops on top, so do NOT paint any buildings, houses, signs, lamps, people or growing crops, and do not move, add or remove anything walkable (paths, stairs, bridges, plazas, plots of bare soil).

Change ONLY the season: {change}
Keep the light soft and from the top left. Every walkable area must stay clearly readable. Do not put tall objects on paths or stairs.

Image 2 ({style}) shows the art style in another place/season; use it only as a style and colour-mood reference, not for layout.

Output: ONE image, exactly {w} x {h} pixels, no border, no text, no UI.
"""
ANL = """Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht hochladen.
Ergebnis speichern als: {name}.png ({w} x {h}).
Danach Bescheid sagen: ich trage die Jahreszeit im Spiel ein (automatisch nach dem echten Datum). Kleine Größenabweichungen skaliere ich, verschobene Wege oder Treppen kann ich nicht reparieren. Falls das passiert, bitte mit dem Zusatz "Keep every path, stair, bridge, river and plaza pixel-exactly where it is in image 1" nochmal erzeugen lassen."""

VALLEY = dict(place='the Hinomori valley (a hillside with terraced vineyard, vegetable beds, rice paddies, a hot spring, waterfalls, stairs, paths and a stone plaza)',
              base='map_valley_basis.png', w=1344, h=896,
              keep='that is walkable or structural: the orange dirt paths, the grey stone plaza and the asphalt road at the bottom, all stairs, the wooden bridge, the rivers and waterfalls, the hot-spring pool with its steam, the vineyard terraces, the vegetable beds and the rice paddies')
FOREST = dict(place='the Midori forest (a forest clearing with a winding dirt path, a rocky cliff with a stair in the middle, patches of tall grass where wild creatures appear, a pond with lily pads and a stone paving at the top)',
              base='map_forest_basis.png', w=960, h=832,
              keep='that is walkable or structural: the winding dirt path, the cliff with its stair, the tall-grass patches (they must stay clearly recognisable as tall grass in every season, just recoloured), the pond and the stone paving')

CH = {
 'valley': {
  'summer': 'deep green leaves, the cherry trees fully green (no blossom), sunflowers and hydrangeas along the paths, grape clusters on the vines, the rice paddies bright green water-and-seedling squares, clear bright blue water, stronger sunlight, steam still rising from the hot spring.',
  'autumn': 'golden and red leaves on all trees, the cherry trees red-orange, fallen leaves along the paths, golden-yellow rice paddies ready for harvest, vineyard leaves turning red and purple, red spider lilies and pampas grass along the water, warm golden light, steam still rising from the hot spring.',
  'winter': 'a thin cover of snow on trees, cliffs, grass and stair edges but the dirt paths, plaza, road and stairs stay mostly clear (a little snow only at their edges), bare cherry branches with snow, the rice paddies are empty frozen squares with thin ice, the vineyard shows bare vines with snow on the posts, the hot spring pool stays warm with strong rising steam and no snow inside, the rivers stay open with snowy banks, cold soft blue-white light.',
 },
 'forest': {
  'summer': 'deeper saturated greens, denser leaves, ferns and foxgloves, a few fireflies-sized yellow flowers, the pond with fresh lily pads and small pink lotus flowers, sunbeams through the canopy.',
  'autumn': 'golden, orange and red leaves in the canopy and bushes, fallen leaves covering parts of the grass and the path edges, mushrooms near the roots, tall-grass patches turned yellow-green, the pond with floating leaves, warm low light.',
  'winter': 'a thin cover of snow on the canopy, bushes, cliff top and grass, the dirt path stays visible with only patches of snow at its edges, bare branches with snow, tall-grass patches pale and frosty but still recognisable, the pond partly frozen, cold soft blue-white light.',
 },
}
NAMES = {'summer': ('Sommer', 'summer'), 'autumn': ('Herbst', 'autumn'), 'winter': ('Winter', 'winter')}
STYLE = {'summer': 'map_harbor.png', 'autumn': 'map_gion.png', 'winter': 'map_mountain.png'}

FOLDERS = []
for idx, (area, spec, img) in enumerate([('valley', VALLEY, 'map_valley'), ('forest', FOREST, 'map_forest')], 1):
    for j, season in enumerate(['summer', 'autumn', 'winter']):
        de, en = NAMES[season]
        name = f"{idx}{'abc'[j]}_{'Tal' if area == 'valley' else 'Wald'}_{de}"
        prompt = TEMPLATE.format(season=en.upper(), style='style_' + STYLE[season], change=CH[area][season], **spec)
        FOLDERS.append((name, prompt, ANL.format(name=f'{img}_{season}', w=spec['w'], h=spec['h']),
                        [(os.path.join(A, img + '.png'), spec['base']), (os.path.join(A, STYLE[season]), 'style_' + STYLE[season])]))

stage = os.path.join(out, '_polish3_stage')
shutil.rmtree(stage, ignore_errors=True)
for name, prompt, anleitung, refs in FOLDERS:
    d = os.path.join(stage, name)
    os.makedirs(d)
    open(os.path.join(d, 'PROMPT.txt'), 'w').write(prompt)
    open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(anleitung)
    for src, dst in refs:
        shutil.copy(src, os.path.join(d, dst))
zp = os.path.join(out, 'Kotodama_Politur_3.zip')
with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
    for r, _, fs in os.walk(stage):
        for f in fs:
            p = os.path.join(r, f)
            z.write(p, os.path.relpath(p, stage))
shutil.rmtree(stage)
print(zp, os.path.getsize(zp) // 1024, 'KB')
