"""
Kotodama_Stadtobjekte.zip: prompts for one sheet of upright objects per place, so every town has props of its own
(the shared set from make_object_sets_zip.py stays for general things). Same sheet format, cut with
tools/cut_objects.py. References: a few existing object sprites for the style and the town as it looks in the game.

  python3 tools/make_city_objects_zip.py <out dir> <dir with in-game screenshots town_<map>.png>
"""
import os
import shutil
import sys
import zipfile

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')

COMMON = """Style: exactly the painted 16-bit pixel-art of the attached object references (clean dark outline, warm saturated colours), three-quarter view with a slight front-facing perspective like Stardew Valley objects: you see the front face and a little of the top. Every object is a separate sprite standing on a common baseline, soft light from the top left, NO cast shadow, NO ground under it (only the object), plain pure magenta (#FF00FF) background, clear empty gaps of at least 24 px between objects, no text, no letters, no logos. Sheet size 1536 x 1024. Tidy rows; small props 40-90 px tall, medium 90-150 px, the few large ones up to 220 px. The last image shows the place in the game: match its colours and mood so the objects belong there."""

# folder, file name, place, objects
SETS = [
    ('1_Hinomori', 'hinomori', 'Hinomori, a small, friendly Japanese country town in spring (and its forest and peach valley)',
     'a wooden notice board on legs (blank paper notes), a red Japanese post box (round, old style), a small jizo statue with a red bib, a wooden ema rack with small prayer plaques (blank), a straw scarecrow, a wooden handcart with peaches, a stack of peach crates, a persimmon tree, a small vegetable patch with a wooden fence, a wooden bench under a tiny roof, a bicycle leaning on a post, potted morning glories on a stand, a stone signpost (blank), a wooden water barrel with a ladle, a cat sleeping on a crate, a small bamboo fence piece, a clothes-drying pole with towels, a beehive box, a rice-straw stack, a hanging lantern on a wooden post'),
    ('2_Yukimi', 'yukimi', 'Yukimi, a snowy mountain village of thatched gassho houses in winter',
     'a small snow lantern (yukidoro, stacked snow with a candle), a snowman with a bucket hat, a small kamakura snow hut, a snow-covered pine tree, a snow-covered round bush, a stack of firewood under snow, a wooden sled, a snow shovel leaning on a post, a stone lantern with a snow cap, a wooden signboard with a snow cap (blank), a frozen water barrel, an icicle-hung wooden fence piece, a pair of straw snow boots on a bench, a small shrine (hokora) under snow, a straw-wrapped tree (yukizuri, ropes from a pole), a hanging dried persimmon string on a frame, a snow rabbit (yukiusagi) on a ledge, a wooden bench with snow, a stone path marker post with snow'),
    ('3_Shiomi', 'shiomi', 'Shiomi, a sunny harbour village on the Inland Sea',
     'an octopus pot stack (takotsubo), a squid-drying rack with squid, a lemon crate stack, a lemon tree in a pot, a fishing-net drying frame, glass fishing floats in a net (hanging on a post), a beach umbrella with a deckchair, a wooden lifeguard sign post (blank), a small boat on a trailer, a pile of oyster shells, a wooden fish-market table with ice and fish, a blue plastic fish crate stack, a stone breakwater block (tetrapod), a seagull standing on a post, a palm-like cycad plant, a rope coil on a bollard, an anchor resting on the ground, a fisherman’s rubber boots and bucket, a wind-sock pole, a wooden bench facing the sea'),
    ('4_Kyoto', 'kyoto', 'Kyoto, the old capital: machiya houses, temples and gardens in autumn',
     'a bamboo fence piece (kenninji-gaki), an inuyarai (curved bamboo wall guard), a tall stone lantern (ishidoro), a red umbrella (nodate-gasa) over a red bench with a red cloth, a stone water basin with a bamboo spout (tsukubai), a shishi-odoshi bamboo deer-scarer, a small red torii, a stone fox statue with a red bib, a maple tree in red leaves, a raked-gravel plot piece with one stone, a rickshaw (jinrikisha), a wooden lattice signboard (blank), a hanging paper lantern pair on a stand, a potted pine bonsai on a stand, a wooden wagashi display cart, a kimono-rental umbrella stand with paper umbrellas, a moss-covered stone, a stone step-stone path piece, a stack of sake barrels (komodaru)'),
    ('5_Osaka', 'osaka', 'Osaka: Dotonbori, Shinsekai, the castle park and Umeda at night and day',
     'a giant crab signboard sculpture (no letters), a giant puffer-fish paper lantern, a big octopus signboard figure, a takoyaki street stall with a griddle, a kushikatsu shop standing sign (blank), a red-white striped awning food cart, a stack of beer crates, a chochin lantern string on a pole, a retro arcade claw machine, a capsule toy (gachapon) machine row, a Billiken-like lucky statue (original design, no real character), a neon arrow sign (no letters), a red bicycle with a front basket, a row of pachinko-style flower stands (no text), a stone castle wall piece with a pine, a pine tree shaped by gardeners, a traffic cone pair, a small food-sample display case, a bench with a city map board (blank)'),
    ('6_Tokyo', 'tokyo', 'Tokyo: Marunouchi, Asakusa, Shibuya, Shinjuku and the Sumida riverside',
     'a row of three modern vending machines, a rental-bicycle dock with two bikes, a pedestrian crossing signal post, a road-work barrier with a blinking light, a big paper lantern (chochin) like at a temple gate, an incense burner (jokoro) with smoke, a rickshaw for tourists, a newspaper/manga stand (blank covers), a police box sign post (blank), a commuter bench at a bus stop, a digital signboard (blank screen), a city tree with a round iron grate, a ginkgo tree in yellow, a cherry tree in bloom, a delivery scooter with a box, a stack of cardboard boxes with a hand truck, a smoking-area partition (blank), a riverside railing with a lamp, a food truck with a crepe sign (no letters), a hedge planter with a city-flower bed'),
]

STYLE_REFS = ['ob_lamp_lantern', 'ob_bench_wood', 'ob_vend_red', 'ob_stall_red', 'ob_tree_maple', 'ob_stone_lantern', 'ob_crates_a']
PLACE = {'hinomori': 'town', 'yukimi': 'mountain', 'shiomi': 'harbor', 'kyoto': 'k_gion', 'osaka': 'o_dotonbori', 'tokyo': 't_asakusa'}

ANL = """Alle Bilder dieses Ordners zusammen mit dem Text aus PROMPT.txt in EINE Nachricht an GPT.
Ergebnis speichern als: objekte_{name}_a.png (1536 x 1024, magenta Hintergrund).
Wenn nicht alle Objekte auf ein Blatt passen: ein zweites Blatt objekte_{name}_b.png mit dem Rest.
Wichtig: reiner Magenta-Hintergrund (#FF00FF), Abstand zwischen den Objekten, kein Schatten, kein Boden, kein Text.
Ich schneide die Objekte einzeln aus und stelle sie so in die Stadt, dass sie keine Wege blockieren.
"""


def main():
    out, shots = sys.argv[1], sys.argv[2]
    stage = os.path.join(out, '_city_obj_stage')
    shutil.rmtree(stage, ignore_errors=True)
    for folder, name, place, objects in SETS:
        d = os.path.join(stage, folder)
        os.makedirs(d)
        for i, r in enumerate(STYLE_REFS, 1):
            Image.open(os.path.join(A, r + '.png')).convert('RGBA').save(os.path.join(d, f'{i}_stil_{r}.png'))
        Image.open(os.path.join(shots, f'town_{PLACE[name]}.png')).convert('RGB').save(os.path.join(d, f'{len(STYLE_REFS) + 1}_ort_im_spiel.jpg'), quality=85)
        prompt = f'Create a sprite sheet of upright objects for a top-down RPG, all typical for {place}: {objects}.\n\n{COMMON}\n'
        open(os.path.join(d, 'PROMPT.txt'), 'w').write(prompt)
        open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(ANL.format(name=name))
    zp = os.path.join(out, 'Kotodama_Stadtobjekte.zip')
    with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
        for r, _, fs in os.walk(stage):
            for f in sorted(fs):
                p = os.path.join(r, f)
                z.write(p, os.path.relpath(p, stage))
    shutil.rmtree(stage)
    print(zp, round(os.path.getsize(zp) / 1e6, 1), 'MB')


if __name__ == '__main__':
    main()
