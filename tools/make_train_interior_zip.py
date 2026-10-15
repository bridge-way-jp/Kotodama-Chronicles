"""
Builds Kotodama_Zug_Innen.zip: prompts + references for a painted train interior (several layers so the game can compose it).
Run: python3 tools/make_train_interior_zip.py <output_dir> <dir with zugfahrt_desktop.jpg>
"""
import os, shutil, sys, zipfile
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')
out, src = sys.argv[1], sys.argv[2]

COMMON = """Style: the same painted 16-bit pixel-art as the attached references (clean dark outline, warm saturated colours, soft top-left light), three-quarter view with a slight front-facing perspective like Stardew Valley interiors: surfaces show their front face and a little thickness. No text, no logos."""

F = []
def add(name, prompt, refs, note):
    F.append((name, prompt + '\n\n' + COMMON + '\n', note, refs))

CUR = (os.path.join(src, 'zugfahrt_desktop.jpg'), 'ride_aktuell.jpg')
HERO = (os.path.join(A, 'hero_up_0.png'), 'ref_maria_von_hinten.png')
FOX = (os.path.join(A, 'k_fox_blue.png'), 'ref_kotodama.png')
TRAIN = (os.path.join(A, 'train_head.png'), 'ref_shinkansen_aussen.png')
LOC = (os.path.join(A, 'train_local.png'), 'ref_nahverkehr_aussen.png')

add('1_Shinkansen_Abteil', """Create the empty INTERIOR of a Shinkansen passenger car, seen straight from the front, as the background of a ride scene (1536 x 1024 px).
Layout: a long wide window in the upper middle (about 60% of the width, 40% of the height) whose glass area is a FLAT PURE MAGENTA (#FF00FF) rectangle so the game can show a moving landscape behind it; a slim light-grey window frame with a roll-up blind half open at the top, a small folding table / ledge below the window, bright off-white wall panels, a light ceiling strip with a row of ceiling lights at the very top, a luggage rack on the left edge, a thin carpet floor strip at the bottom. Calm, clean, modern Japanese bullet-train look in white, grey and a blue accent line.
IMPORTANT: no people, no seats in front of the window (they come as a separate image), nothing inside the magenta window area.""",
    [CUR, TRAIN], 'Ergebnis: zug_shinkansen_abteil.png (1536 x 1024, Fenster magenta). Referenz: aktuelle Szene und Außenansicht.')
add('2_Nahverkehr_Abteil', """Create the empty INTERIOR of a local commuter train car, seen straight from the front, as the background of a ride scene (1536 x 1024 px).
Layout: one wide window in the upper middle (about 60% of the width, 40% of the height) whose glass area is a FLAT PURE MAGENTA (#FF00FF) rectangle; a warm wooden window frame with a pull-down blind half open, a wooden ledge below, cream walls with wood panelling, a luggage rack and two hanging hand straps on the left and right, round ceiling lamps, a worn wooden floor strip at the bottom. Cosy, slightly old-fashioned regional-line look in brown, cream and green.
IMPORTANT: no people, no seats in front of the window, nothing inside the magenta window area.""",
    [CUR, LOC], 'Ergebnis: zug_nahverkehr_abteil.png (1536 x 1024, Fenster magenta).')
add('3_Sitz_mit_Maria', """Create a foreground sprite: a train seat back seen from behind (the player sits in it), with Maria (the attached character from behind, red cap, brown hair) sitting in it so that only her head and shoulders show above the seat back, and her small white-blue fox-like Kotodama (attached) sitting on the seat top beside her head, looking out. Seat in deep blue with a white head cloth. 1536 x 700 px, the seat centred, a plain pure magenta (#FF00FF) background, no shadow on the background.
Also draw the same in a second row: the seat in a warm red fabric (for the regional train), same Maria and Kotodama. Two rows, 1536 x 1400 px in total.""",
    [HERO, FOX, CUR], 'Ergebnis: zug_sitz_maria.png (1536 x 1400, magenta Hintergrund). Zwei Zeilen: blau (Shinkansen), rot (Nahverkehr).')
add('4_Kleinteile_Ablage', """Create a small sprite sheet of train props on a plain pure magenta (#FF00FF) background, 1536 x 512 px, each item in its own clear cell, same pixel scale as a character 32 px wide: 1) an ekiben bento box with chopsticks, 2) a green-tea bottle, 3) a paper train ticket, 4) a small paper coffee cup with steam, 5) a folded Japanese newspaper (no readable text), 6) a small backpack, 7) a hanging hand strap, 8) a tiny potted-plant-sized souvenir doll (a daruma). No text.""",
    [(os.path.join(A, 'i_train_ticket.png'), 'ref_fahrkarte.png')], 'Ergebnis: zug_kleinteile.png (1536 x 512, magenta Hintergrund).')
add('5_Fensterlandschaft_Ebenen', """Create FOUR seamlessly horizontally tileable landscape strips, as seen from a moving train window, to be scrolled at different speeds (parallax). Each strip 2048 x 512 px, the left and right edges must match exactly. Plain pure magenta (#FF00FF) where the strip is transparent.
1) far: distant blue mountains and a pale sky horizon, 2) mid: rolling green hills with villages, rice paddies and a few cherry trees, 3) near: a low embankment with bushes, small houses, a level-crossing barrier and a road, only the bottom 40% of the image filled, 4) tunnel wall: a dark concrete tunnel wall with evenly spaced orange lamps, full height, tileable.
Four images stacked vertically in ONE sheet 2048 x 2048. Bright daytime light, spring mood.""",
    [(os.path.join(A, 'hw_far.webp'), 'ref_far.webp'), (os.path.join(A, 'hw_mid.webp'), 'ref_mid.webp'), CUR], 'Ergebnis: zug_landschaft_ebenen.png (2048 x 2048, vier Streifen untereinander).')

stage = os.path.join(out, '_zug_stage')
shutil.rmtree(stage, ignore_errors=True)
for name, prompt, note, refs in F:
    d = os.path.join(stage, name)
    os.makedirs(d)
    open(os.path.join(d, 'PROMPT.txt'), 'w').write(prompt)
    open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write('Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht hochladen.\n' + note + '\nMagenta (#FF00FF) wird von mir zu transparent gemacht bzw. als Fensterausschnitt genutzt.')
    for s_, n_ in refs:
        if s_.endswith('.webp') or s_.endswith('.jpg'):
            shutil.copy(s_, os.path.join(d, n_))
        else:
            Image.open(s_).convert('RGBA').save(os.path.join(d, n_))
zp = os.path.join(out, 'Kotodama_Zug_Innen.zip')
with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
    for r, _, fs in os.walk(stage):
        for f in fs:
            p = os.path.join(r, f)
            z.write(p, os.path.relpath(p, stage))
shutil.rmtree(stage)
print(zp, os.path.getsize(zp) // 1024, 'KB')
