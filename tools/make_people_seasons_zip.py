"""
Prompt packs for the next round of pictures:

  Kotodama_Figuren_Laufen.zip    walk cycles (4 frames x down / left / up) for the main people and the 16 people who
                                 still borrow someone else's look, two people per sheet
  Kotodama_Figuren_Portraits.zip portraits (neutral, happy, surprised, worried) for those 16 and the bus driver
  Kotodama_Jahreszeiten.zip      the ground of Hinomori, the forest, the valley and the harbour in summer, autumn and
                                 winter, Kyoto in cherry-blossom time, and trees and bushes in every season
  Kotodama_Alltag.zip            backdrops for everyday Japan: ticket machine, menus, departure board, a form

  python3 tools/make_people_seasons_zip.py <out dir>
"""
import os
import shutil
import sys
import zipfile

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')

# ---------------------------------------------------------------- people

# the people who walk in scenes (they already have a look: the sheet adds the steps)
MAIN = [
    ('mori', 'Ms. Mori, the kind elderly landlady'), ('kaede', 'Kaede, the young café owner'), ('haruto', 'Haruto, the konbini clerk'),
    ('kirishima', 'Dr. Kirishima, the researcher'), ('kotone', 'K (Kotone), the woman in the dark-green coat with a notebook'), ('aoi', 'Aoi, the university student'),
    ('sato', 'Mr. Satō, the retired teacher'), ('hayashi', 'Mr. Hayashi, the old peach farmer'), ('sakura', 'Sakura, his granddaughter'),
    ('ota', 'Mr. Ōta, the old calligrapher'), ('okami', 'Okami-san, the inn owner in kimono'), ('tsuru', 'Grandma Tsuru'),
    ('hina', 'Hina, a girl of the snow village'), ('jokan', 'Jōkan-oshō, the head priest'), ('gen', 'Gen-san, the old fisherman'),
    ('nagisa', 'Nagisa of the tourist office'), ('kaito', 'Kaito, the harbour boy'), ('umino', 'Mr. Umino, the lighthouse keeper'),
    ('matsuo', 'Ms. Matsuo, the machiya host'), ('sumie', 'Sumie-san, the tea-house mistress'), ('kenta', 'Kenta, the new office worker'),
    ('okan', 'Okan, the takoyaki shop owner'), ('tachibana', 'Tachibana-san, the receptionist and keigo master'), ('yoshie', 'Yoshie-san, the kissaten owner'),
    ('haru', 'Haru, the freelancer from Hokkaido'), ('priya', 'Priya, the IT engineer from India'), ('kuroi', 'Kuroi-san, the night-radio host'),
    ('fujita', 'Section chief Fujita'),
]
# people who still borrow someone else's look: a new person each (walk sheet + portraits)
NEW = [
    ('books_shuijin', 'an elderly bookshop owner in Tokyo: round glasses, grey hair, a beige cardigan, a book under the arm'),
    ('deck_staff', 'a young woman working at the Tokyo observation deck: navy uniform with a small cap and a neck scarf'),
    ('temple_priest', 'a young Buddhist monk: shaved head, black robe with a grey kesa over it, prayer beads'),
    ('teestand_oyaji', 'the old master of a tea stand at Fushimi Inari: towel headband, indigo samue work clothes, a kettle'),
    ('karaoke_uketsuke', 'a young karaoke receptionist in Shibuya: pink-dyed bob, black staff vest with a name badge'),
    ('museum_gakugei', 'a museum curator at Osaka Castle: woman in her forties, grey suit, lanyard, a clipboard'),
    ('wagashi_ten', 'a wagashi sweets maker in Kyoto: middle-aged man in a white work coat and white cap'),
    ('kaufhaus_ten', 'a department-store clerk in Osaka: young woman, red blazer uniform with a neck scarf, hair in a bun'),
    ('winery_master', 'a winemaker in the valley: man in his fifties with a short beard, rolled-up sleeves, a burgundy apron'),
    ('diner_okami', 'the owner of a harbour diner: woman in her sixties, bandana, striped apron, sturdy and cheerful'),
    ('souvenir_okami', 'the owner of a souvenir shop in Asakusa: woman in her fifties in a red happi coat over her clothes'),
    ('kino_shihainin', 'the manager of an old cinema in Osaka: man in his forties, waistcoat, bow tie, slicked hair'),
    ('share_resident', 'a share-house resident in Tokyo: young man, oversized hoodie, headphones round the neck, sneakers'),
    ('koban_omawari', 'a Japanese police officer at a koban: light-blue shirt, navy uniform cap and trousers, friendly'),
    ('farm_obaa', 'a farmhouse grandmother in the valley: wide sun bonnet, flowery work blouse, monpe trousers, small and bent'),
    ('harbor_chief', 'the harbour master of Shiomi: man in his sixties, captain cap, navy jacket with gold buttons, white moustache'),
]
# the look each new person borrows today (only a hint at size and style for the new drawing)
BORROW = {'books_shuijin': 'kenji', 'deck_staff': 'fujii', 'temple_priest': 'jokan', 'teestand_oyaji': 'gen', 'karaoke_uketsuke': 'hamada',
          'museum_gakugei': 'umino', 'wagashi_ten': 'sumie', 'kaufhaus_ten': 'matsuo', 'winery_master': 'sakamoto', 'diner_okami': 'tachibana',
          'souvenir_okami': 'okan', 'kino_shihainin': 'fujita', 'share_resident': 'minh', 'koban_omawari': 'porter', 'farm_obaa': 'yoshie',
          'harbor_chief': 'yamamoto'}
PORTRAIT_ONLY = [('busdriver', 'the bus driver of the valley line: man in his fifties, grey uniform with a cap and white gloves')]

STYLE_SPRITE = """Style: exactly the pixel-art of the references: small 16-bit RPG characters (like Stardew Valley / classic Pokémon), clean dark outline, warm colours, about 2.5 heads tall, three-quarter top-down view."""

WALK = """Create a WALK-CYCLE sprite sheet for a top-down RPG with TWO characters, sheet 1536 x 1024, plain pure magenta (#FF00FF) background.
Left half = character 1, right half = character 2. For each character draw 3 rows of 4 frames:
  row 1: walking DOWN (facing the viewer), row 2: walking LEFT (side view, facing left), row 3: walking UP (back view).
  The 4 frames of a row: standing, left foot forward, standing, right foot forward (a smooth walk cycle, arms swinging a little).
Every frame the same size, the character the same size and height in all 12 frames, full body, feet on the same baseline in a row. Clear gaps (at least 30 px) between all frames, no overlap, no shadow, no ground, no text, no numbers, no grid lines.
Image 1 shows the format with the heroine (her 3 rows x 4 frames), image 2 and image 3 show what the two characters look like.

Character 1: {a}
Character 2: {b}

{style}
An existing character keeps exactly the look of their reference (hair, clothes, colours), only the walking poses are new; a NEW person gets the look from their description, drawn in the same style and size."""

PORTRAITS = """Create a PORTRAIT sheet for a Japanese RPG, sheet 1536 x 1024, plain pure magenta (#FF00FF) background.
One ROW per character ({n} rows), each row 4 portraits of the same character, head and shoulders, facing slightly to the side like the references:
  1 neutral, 2 happy (smiling), 3 surprised (eyes wide, mouth open a little), 4 worried (eyebrows up, unsure).
All portraits the same size (about 220 x 280 px), the same framing and the same face in all four; clear gaps between them, no frame, no text, no shadow.
{rows}
Style: exactly the pixel-art portrait style of the reference images (16-bit, clean outline, soft shading, warm skin tones, large friendly eyes)."""

# ---------------------------------------------------------------- seasons

SEASON_TEXT = {
    'summer': 'high SUMMER: lush deep-green grass and leaves, strong sunlight, a few sunflowers and morning glories in the flower beds, bright blue water, dry light paths',
    'autumn': 'AUTUMN: grass a little yellowed, red and orange maple leaves and golden ginkgo leaves scattered on the grass and at the edges of the paths, warm afternoon light',
    'winter': 'WINTER: a soft layer of snow on the grass, the flower beds and the roofs of walls; paths and plazas swept clear (wet dark stone, a little slush at their edges); water dark and calm with thin ice at the banks; cold blue light',
    'spring': 'CHERRY-BLOSSOM SPRING: fresh green grass, pink cherry petals scattered on the grass, the paths and the water, a few blossoms in the flower beds, soft bright light',
}
SEASON_MAPS = [
    ('map_town', 'Hinomori town', ['summer', 'autumn', 'winter']),
    ('map_forest', 'the Midori forest', ['summer', 'autumn', 'winter']),
    ('map_valley', 'the Hinomori valley village', ['summer', 'autumn', 'winter']),
    ('map_harbor', 'the harbour village Shiomi', ['summer', 'autumn', 'winter']),
    ('map_gion', 'Gion in Kyoto', ['spring']),
    ('map_kamogawa', 'the Kamo river bank in Kyoto', ['spring']),
    ('map_fushimi', 'the Fushimi Inari mountain', ['spring']),
]
SEASON_PROMPT = """Repaint this ground picture of {place} for a top-down 16-bit pixel-art RPG in another season: {season}.
Image 1 is the current ground, {w} x {h} px. The result must have EXACTLY the same layout: every path, plaza, wall, water edge, bridge, stair and flower bed stays at the same pixel position and keeps its shape, so the game's walking areas still fit. Only colours, textures and seasonal details change.
Do NOT add upright objects (no trees, bushes, lamps, people, buildings, text): the game draws those on top. No grid lines, no border.
Image 2 shows the mood of the season in the game's style.
Output: ONE image, exactly {w} x {h} pixels."""
SEASON_STYLE = {'summer': 'cg_season_summer', 'autumn': 'cg_season_autumn', 'winter': 'map_mountain', 'spring': 'cg_season_spring'}

NATURE = ['ob_tree_round', 'ob_tree_cedar', 'ob_tree_pine', 'ob_tree_maple', 'ob_tree_sakura', 'ob_tree_ginkgo', 'ob_tree_willow', 'ob_bush_round',
          'ob_bush_pink', 'ob_bush_yellow', 'ob_bush_blue', 'ob_hedge_block', 'ob_flower_pink', 'ob_flower_red', 'ob_grass_clump', 'ob_fern']
NATURE_PROMPT = """Create a sprite sheet: the {n} trees, bushes and plants of the reference images, each one redrawn for {season}, in the same order (reading order, left to right, row by row) and at the same size and pose as its reference.
{season_detail}
Sheet 1536 x 1024, plain pure magenta (#FF00FF) background, clear gaps (at least 24 px) between objects, no shadow, no ground, no text.
Style: exactly the pixel-art of the references."""
NATURE_SEASON = {
    'summer': ('SUMMER', 'Summer: deep lush green leaves; the cherry tree in green leaves (no blossoms); bushes dense and dark green; flowers in full bloom.'),
    'autumn': ('AUTUMN', 'Autumn: round tree and maple in red and orange, ginkgo bright yellow, cherry tree in orange-red leaves, cedar and pine stay dark green, willow yellow-green; bushes in warm orange and brown; flowers fading.'),
    'winter': ('WINTER', 'Winter: deciduous trees bare with snow on their branches, cedar and pine dark green with snow caps, bushes with a snow cap, flowers and grass under a little snow.'),
}

# ---------------------------------------------------------------- everyday Japan

EVERYDAY = [
    ('ui_ticket_machine', 1024, 1024, 'A Japanese ramen-shop meal-ticket machine (shokkenki), seen straight from the front, filling the picture: a grid of 4 x 5 large rectangular buttons, each with a small colourful photo of a dish (ramen bowls, gyoza, rice, drinks) and a BLANK white label strip below the photo; a coin slot, a bill slot and a change tray at the bottom right. No letters or numbers anywhere: the game writes the names and prices on the labels.'),
    ('ui_menu_board', 1024, 768, 'A wooden café menu board (chalkboard in a wooden frame) hanging on a warm café wall, seen from the front, filling most of the picture: the chalkboard has two columns of empty rows with tiny chalk drawings of coffee, cake, sandwiches and tea at the start of each row. No letters or numbers: the game writes the menu.'),
    ('ui_izakaya_menu', 1024, 768, 'The wall of an Osaka kushikatsu / izakaya shop seen from the front: a row of 12 hanging vertical wooden menu plates (blank, no letters), red paper lanterns above, a counter edge at the bottom with a small sauce pot and skewers. The plates must be clearly empty so the game can write dishes on them.'),
    ('ui_departure_board', 1280, 720, 'A Japanese train station departure board above a platform, seen from the front: a dark board with 4 empty LED rows (dim orange dots, no characters), a small clock on the left, a line of coloured platform numbers boxes (empty), under it a glimpse of the platform with yellow tactile paving and a train arriving at the side. No letters or numbers: the game writes times and destinations.'),
    ('ui_form', 1024, 1280, 'A Japanese city-office registration form lying on a wooden counter, seen from straight above: a white paper sheet with neat printed boxes and lines for a name, address, date of birth and signature (all EMPTY, no printed words), a red ink stamp pad, a ballpoint pen on a chain and a small number ticket next to it. No letters anywhere.'),
]
EVERYDAY_STYLE = """Style: the painted pixel-art of the game (image 1): warm, cosy, detailed, soft light. It is a backdrop for a mini game: keep the empty label areas clean and evenly lit."""

ANL_WALK = """Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht an GPT.
Ergebnis speichern als: {name}.png (1536 x 1024, magenta Hintergrund).
Wichtig: links Figur 1, rechts Figur 2, je 3 Reihen (unten, links, oben) mit 4 Schritten, gleich groß, mit Abstand.
Wenn die Figuren anders aussehen als die Vorlagen: "Keep each character exactly as in images 2 and 3." dazuschreiben."""
ANL_PORTRAIT = """Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht an GPT.
Ergebnis speichern als: {name}.png (1536 x 1024, magenta Hintergrund). Eine Reihe pro Person: neutral, froh, überrascht, besorgt."""
ANL_SEASON = """Beide Bilder zusammen mit PROMPT.txt in EINE Nachricht an GPT.
Ergebnis speichern als: {name}.png ({w} x {h}).
Wichtig: Wege, Wasser und Mauern müssen genau an derselben Stelle bleiben (sonst passt das Laufen nicht mehr).
Wenn GPT die Anordnung ändert: "Keep the layout pixel-exact, only change the season." dazuschreiben."""
ANL_NATURE = """Alle Bilder dieses Ordners zusammen mit PROMPT.txt in EINE Nachricht an GPT.
Ergebnis speichern als: {name}.png (1536 x 1024, magenta Hintergrund), gleiche Reihenfolge wie die Vorlagen (1_..., 2_..., ...)."""
ANL_EVERYDAY = """Bild und PROMPT.txt in EINE Nachricht an GPT.
Ergebnis speichern als: {name}.png ({w} x {h}).
Wichtig: keine Buchstaben oder Zahlen im Bild, die Felder bleiben leer (das Spiel schreibt die Texte darauf)."""


def big(img, s=4):
    return img.resize((img.width * s, img.height * s), Image.NEAREST)


def sprite_ref(pid):
    """the three standing directions of a person, enlarged, side by side"""
    frames = [Image.open(os.path.join(A, f'npc_{pid}_{d}.png')).convert('RGBA') for d in ('down', 'left', 'up') if os.path.exists(os.path.join(A, f'npc_{pid}_{d}.png'))]
    if not frames:
        return None
    frames = [big(f, 5) for f in frames]
    w = sum(f.width for f in frames) + 40 * (len(frames) + 1)
    h = max(f.height for f in frames) + 80
    out = Image.new('RGB', (w, h), (255, 0, 255))
    x = 40
    for f in frames:
        out.paste(f, (x, 40), f)
        x += f.width + 40
    return out


def hero_format():
    out = Image.new('RGB', (4 * 200 + 40, 3 * 260 + 40), (255, 0, 255))
    for r, d in enumerate(('down', 'left', 'up')):
        for c in range(4):
            f = big(Image.open(os.path.join(A, f'hero_{d}_{c}.png')).convert('RGBA'), 5)
            out.paste(f, (40 + c * 200, 40 + r * 260), f)
    return out


def portrait_ref(pid):
    p = os.path.join(A, f'portrait_{pid}_neutral.png')
    return big(Image.open(p).convert('RGBA'), 3) if os.path.exists(p) else None


def zip_dir(stage, zp):
    with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
        for r, _, fs in os.walk(stage):
            for f in sorted(fs):
                p = os.path.join(r, f)
                z.write(p, os.path.relpath(p, stage))
    shutil.rmtree(stage)
    print(zp, round(os.path.getsize(zp) / 1e6, 1), 'MB')


def main():
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)

    # walk sheets: main people with their own look, then the new people (their borrowed look only hints at the role)
    people = [(pid, desc, pid) for pid, desc in MAIN] + [(pid, desc, BORROW[pid]) for pid, desc in NEW]
    stage = os.path.join(out, '_walk')
    shutil.rmtree(stage, ignore_errors=True)
    fmt = hero_format()
    for i in range(0, len(people), 2):
        pair = people[i:i + 2]
        n = i // 2 + 1
        d = os.path.join(stage, f'{n:02d}_' + '_'.join(p[0] for p in pair))
        os.makedirs(d)
        fmt.save(os.path.join(d, '1_format_heldin.png'))
        for k, (pid, desc, ref) in enumerate(pair):
            new = pid != ref
            img = sprite_ref(ref)
            if img and not new:
                img.save(os.path.join(d, f'{k + 2}_figur{k + 1}_{pid}.png'))
            elif img:
                img.save(os.path.join(d, f'{k + 2}_figur{k + 1}_stil_nur_aehnlich.png'))
        a = pair[0][1] + (' (a NEW person: only the drawing style comes from image 2, design the look from this description)' if pair[0][0] != pair[0][2] else '')
        b = (pair[1][1] + (' (a NEW person: only the drawing style comes from image 3, design the look from this description)' if pair[1][0] != pair[1][2] else '')) if len(pair) > 1 else '(none: leave the right half empty)'
        open(os.path.join(d, 'PROMPT.txt'), 'w').write(WALK.format(a=a, b=b, style=STYLE_SPRITE))
        open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(ANL_WALK.format(name=f'laufen_{n:02d}'))
    zip_dir(stage, os.path.join(out, 'Kotodama_Figuren_Laufen.zip'))

    # portraits of the new people (+ the bus driver), four people per sheet
    stage = os.path.join(out, '_portraits')
    shutil.rmtree(stage, ignore_errors=True)
    todo = NEW + PORTRAIT_ONLY
    style_refs = ['mori', 'okan', 'kenta', 'priya']
    for i in range(0, len(todo), 4):
        group = todo[i:i + 4]
        n = i // 4 + 1
        d = os.path.join(stage, f'{n}_' + '_'.join(p[0] for p in group))
        os.makedirs(d)
        for k, r in enumerate(style_refs, 1):
            img = portrait_ref(r)
            if img:
                img.save(os.path.join(d, f'{k}_stil_{r}.png'))
        rows = '\n'.join(f'Row {k + 1}: {desc}' for k, (_, desc) in enumerate(group))
        open(os.path.join(d, 'PROMPT.txt'), 'w').write(PORTRAITS.format(n=len(group), rows=rows))
        open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(ANL_PORTRAIT.format(name=f'portraits_{n}') + '\nReihenfolge: ' + ', '.join(p[0] for p in group))
    zip_dir(stage, os.path.join(out, 'Kotodama_Figuren_Portraits.zip'))

    # seasons: ground pictures and nature sprites
    stage = os.path.join(out, '_seasons')
    shutil.rmtree(stage, ignore_errors=True)
    n = 0
    for img, place, seasons in SEASON_MAPS:
        src = Image.open(os.path.join(A, img + '.png')).convert('RGB')
        for s in seasons:
            n += 1
            d = os.path.join(stage, f'{n:02d}_{img}_{s}')
            os.makedirs(d)
            src.save(os.path.join(d, f'1_{img}_aktuell.jpg'), quality=92)
            st = SEASON_STYLE[s]
            Image.open(os.path.join(A, st + ('.webp' if st.startswith('cg_') else '.png'))).convert('RGB').save(os.path.join(d, f'2_stimmung_{s}.jpg'), quality=85)
            open(os.path.join(d, 'PROMPT.txt'), 'w').write(SEASON_PROMPT.format(place=place, season=SEASON_TEXT[s], w=src.width, h=src.height))
            open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(ANL_SEASON.format(name=f'{img}_{s}', w=src.width, h=src.height))
    for s, (label, detail) in NATURE_SEASON.items():
        n += 1
        d = os.path.join(stage, f'{n:02d}_natur_{s}')
        os.makedirs(d)
        for k, key in enumerate(NATURE, 1):
            big(Image.open(os.path.join(A, key + '.png')).convert('RGBA'), 2).save(os.path.join(d, f'{k:02d}_{key[3:]}.png'))
        open(os.path.join(d, 'PROMPT.txt'), 'w').write(NATURE_PROMPT.format(n=len(NATURE), season=label, season_detail=detail))
        open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(ANL_NATURE.format(name=f'objekte_natur_{s}_a'))
    zip_dir(stage, os.path.join(out, 'Kotodama_Jahreszeiten.zip'))

    # everyday Japan
    stage = os.path.join(out, '_everyday')
    shutil.rmtree(stage, ignore_errors=True)
    for k, (name, w, h, desc) in enumerate(EVERYDAY, 1):
        d = os.path.join(stage, f'{k}_{name}')
        os.makedirs(d)
        Image.open(os.path.join(A, 'cg_asakusa_coffee.webp')).convert('RGB').save(os.path.join(d, '1_stil.jpg'), quality=85)
        open(os.path.join(d, 'PROMPT.txt'), 'w').write(f'Create a picture for a Japanese-learning RPG, exactly {w} x {h} pixels: {desc}\n\n{EVERYDAY_STYLE}\n')
        open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(ANL_EVERYDAY.format(name=name, w=w, h=h))
    zip_dir(stage, os.path.join(out, 'Kotodama_Alltag.zip'))


if __name__ == '__main__':
    main()
