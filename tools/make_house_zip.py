"""
Builds Kotodama_Haeuser.zip: prompts + reference sheets for NEW building variants (so towns stop repeating the same houses).
Run: python3 tools/make_house_zip.py <output_dir>
"""
import glob, os, shutil, sys, zipfile
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')
out = sys.argv[1]

def montage(prefixes, name, cols=6, cell=240):
    fs = []
    for p in prefixes: fs += sorted(glob.glob(os.path.join(A, p + '*.png')))
    fs = [f for f in fs if Image.open(f).size[0] <= 260][:24]
    rows = (len(fs) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * cell, rows * cell), (255, 0, 255))
    for i, f in enumerate(fs):
        im = Image.open(f).convert('RGBA')
        sc = min(1, (cell - 16) / im.width, (cell - 16) / im.height)
        im = im.resize((max(1, int(im.width * sc)), max(1, int(im.height * sc))), Image.LANCZOS)
        x, y = (i % cols) * cell + (cell - im.width) // 2, (i // cols) * cell + cell - im.height - 8
        sheet.paste(im, (x, y), im)
    path = os.path.join(out, '_ref_' + name + '.png')
    sheet.save(path)
    return path

COMMON = """Style: exactly the painted 16-bit pixel art of the attached reference sheet (clean dark outline, warm saturated colours, soft light from the top left), three-quarter front view with a little of the roof visible, like buildings in Stardew Valley. Each building is a separate sprite with its base on a common baseline per row, NO ground, NO shadow, NO people, NO readable text or lettering (signboards are blank or show simple pictograms only). Plain pure magenta (#FF00FF) background, at least 24 px clear gap between buildings. Sheet size 1536 x 1024, drawn at about twice the size of the reference buildings (the game scales them down). Every building must look clearly DIFFERENT from the others in shape, roof, colour, signboard, balcony, awning and details, while still belonging to the same town."""

SETS = {
 '1_Kyoto': ('KYOTO SET: 12 different traditional Kyoto town buildings: 4 machiya townhouses (narrow, dark wooden lattice, tiled roof, different noren-cloth colours), 3 tea houses (one with a small garden gate), 2 sweet shops, 1 pickle shop with barrels, 1 kimono shop with colourful cloth, 1 small inn with a lantern. Heights vary: some one-storey, some two-storey.', ['bx_k_', ]),
 '2_Osaka': ('OSAKA SET: 12 different lively Osaka shop buildings: 3 takoyaki and okonomiyaki stalls with big blank pictogram signs (an octopus, a pancake, a pufferfish), 3 narrow izakaya houses with red lanterns, 2 retro cinemas / game halls with blank marquees, 2 small department-store fronts with striped awnings, 1 tiny shrine-style shop, 1 five-storey slim retro tower shop.', ['bx_o_']),
 '3_Tokyo': ('TOKYO SET: 6 different modern office towers (glass blue, concrete grey, brick red, white with green terraces, black glass, mint with a round top) 160-200 px wide and tall, plus 6 small city shops: a konbini-like corner shop, a ramen shop, a coffee house, a game centre, a bookshop, a pharmacy (blank signs, pictograms only).', ['bx_t_']),
 '4_Doerfer': ('VILLAGE SET: 12 different village buildings: 3 farmhouses with thatched or tiled roofs and a small barn, 3 harbour-town houses (blue tiled roof, fishing nets, wooden balcony), 3 mountain houses (steep snow-ready roofs, firewood stack), 1 small village shop with an awning, 1 tiny wayside shrine house, 1 storehouse (white walls, black tiles).', ['bx_farm', 'bx_gassho', 'bx_townhouse', 'bx_diner', 'bx_apartment', 'bx_ramen', 'bx_workshop', 'bx_stand']),
}

os.makedirs(out, exist_ok=True)
stage = os.path.join(out, '_house_stage')
shutil.rmtree(stage, ignore_errors=True)
for name, (content, prefixes) in SETS.items():
    d = os.path.join(stage, name); os.makedirs(d)
    ref = montage(prefixes, name)
    shutil.copy(ref, os.path.join(d, 'referenz_aktuelle_haeuser.png')); os.remove(ref)
    open(os.path.join(d, 'PROMPT.txt'), 'w').write('Create a sprite sheet of NEW building variants for a top-down RPG town. ' + content + '\n\n' + COMMON + '\n')
    open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write('Referenzbild und PROMPT.txt in EINE GPT-Nachricht.\nErgebnis speichern als: haeuser_' + name.split('_', 1)[1].lower() + '.png (1536 x 1024, magenta Hintergrund).\nWenn nicht alle 12 auf ein Blatt passen: gern zwei Blätter (_a, _b). Ich schneide die Häuser aus und tausche sie anstelle der doppelten ein.')
zp = os.path.join(out, 'Kotodama_Haeuser.zip')
with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
    for r, _, fs in os.walk(stage):
        for f in fs:
            p = os.path.join(r, f); z.write(p, os.path.relpath(p, stage))
shutil.rmtree(stage); print(zp, os.path.getsize(zp) // 1024, 'KB')
