"""
Builds Kotodama_Objekte.zip: prompts for upright object sprite sheets (trees, fences, walls, lamps, benches, rocks, ...) that the game
places on the plain ground maps. One folder per GPT message. Run: python3 tools/make_object_sets_zip.py <output_dir>
"""
import os, shutil, sys, zipfile
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')
out = sys.argv[1]
COMMON = """Style: exactly the painted 16-bit pixel-art of the attached references (clean dark outline, warm saturated colours), three-quarter view with a slight front-facing perspective like Stardew Valley objects: you see the front face and a little of the top. Every object is a separate sprite, standing with its base on a common baseline, soft light from the top left, NO cast shadow, NO ground under it (the object only), plain pure magenta (#FF00FF) background, clear empty gaps (at least 24 px) between objects, no text. Sheet size 1536 x 1024. Arrange the objects in tidy rows, each object roughly 64-160 px tall (trees up to 220 px). Autumn-neutral colours: keep leaves green or mixed; no seasonal snow."""
REFS = [(os.path.join(A, n + '.png'), 'ref_' + n + '.png') for n in ('n_tree_round', 'n_tree_maple', 'n_bush', 'p_lamp', 'tp_bench', 'f_wood_h', 'f_stone_h', 'n_rock', 'tp_planter_y', 'tp_vending')]
SETS = {
 '1_Natur': 'NATURE SET: 6 trees (round leafy, tall cedar, pine, maple, cherry blossom, a bare-branch tree in a neutral way), 4 ginkgo / willow style trees, 8 bushes (round, flowering pink, flowering yellow, hydrangea, low hedge block, tall grass clump, fern, bamboo clump), 6 rocks (small, medium, large mossy, flat stepping stone, rock cluster, boulder), 3 tree stumps and logs, 4 flower patches, a reed patch, a lily-pad cluster.',
 '2_Zaeune_Mauern': 'FENCES AND WALLS SET, every type as 5 pieces: straight horizontal segment, straight vertical segment (side view, drawn as a post line), left end, right end, and corner: 1) wooden rail fence, 2) bamboo fence, 3) low stone wall, 4) iron railing, 5) clipped green hedge, 6) white plaster wall with a tiled roof cap, 7) stone river embankment wall. Segments are exactly 64 px wide (horizontal) so they tile seamlessly when placed side by side. Add 3 gate pieces (wooden gate, torii-style small gate, iron gate).',
 '3_Stadt_Strasse': 'STREET FURNITURE SET: 3 street lamp types (modern lamp post, old iron lamp, hanging paper lantern post), 4 benches (wood, stone, metal, with a small table), 3 bollard types (short post, chain post, stone post), 3 vending machines (drinks red, drinks blue, snack), 4 bicycle racks (empty, with 2 bikes, with 4 bikes, one parked scooter), 4 planters (flower box, round tree pot, long hedge planter, bonsai pot), 3 trash cans / recycling stations, 3 street signs (arrow sign, no-text blank signboard, bus-stop pole), 3 utility poles with cables, 2 manhole-style small objects, 2 bus-stop shelters, a phone box, a post box (red), an A-frame menu board without text.',
 '4_Markt_Hof': 'MARKET AND YARD PROPS SET: 4 market stalls with awning (empty counters, no text), 6 stacks of wooden crates and boxes, 4 barrels, 3 pickle jars / pots, 3 sacks, 2 laundry poles with white sheets, 2 drying racks (fish, vegetables), 3 stacks of firewood, 2 wells (stone well, wooden well), 3 small wooden tables with stools, 3 beer-crate stacks, 3 round café tables with chairs and parasol (no text), 2 noren-cloth stands (plain colours, no text), 2 stone lanterns, 2 stone fox statues, 2 small shrines (hokora), a stone water basin (chozuya).',
 '5_Wasser_Kueste': 'WATER AND COAST SET: 3 wooden jetty posts with rope, 4 mooring bollards, 3 fishing-net piles, 3 small rowing boats (side view, empty), 2 moored fishing boats, 3 lobster-trap stacks, 3 buoys, 2 life rings on a post, a stone lighthouse lamp, 4 stepping-stone groups, 3 wooden bridge railings (short pieces), 3 stone bridge pillars with lamps, 2 water lilies large, 3 sea-rock stacks (flat-topped, 64-128 px).',
}
stage = os.path.join(out, '_obj_stage')
shutil.rmtree(stage, ignore_errors=True)
for name, content in SETS.items():
    d = os.path.join(stage, name); os.makedirs(d)
    open(os.path.join(d, 'PROMPT.txt'), 'w').write('Create a sprite sheet of upright objects for a top-down RPG: ' + content + '\n\n' + COMMON + '\n')
    open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write('Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht hochladen.\nErgebnis speichern als: objekte_' + name.split('_', 1)[1].lower() + '.png (1536 x 1024, magenta Hintergrund).\nWenn nicht alles auf ein Blatt passt: gern zwei Blätter (_a, _b). Ich schneide die Objekte einzeln aus und lege sie in die Bibliothek.')
    for s_, n_ in REFS:
        if os.path.exists(s_): Image.open(s_).convert('RGBA').save(os.path.join(d, n_))
zp = os.path.join(out, 'Kotodama_Objekte.zip')
with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
    for r, _, fs in os.walk(stage):
        for f in fs:
            p = os.path.join(r, f); z.write(p, os.path.relpath(p, stage))
shutil.rmtree(stage); print(zp, os.path.getsize(zp) // 1024, 'KB')
