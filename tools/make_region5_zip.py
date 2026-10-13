"""
Builds the art brief for chapter 5 (Kyoto): art/PROMPTS_REGION5.md and a ZIP with one folder per GPT message
(PROMPT.txt + reference images to attach + ANLEITUNG.txt), like the chapter-4 package.

Run: python3 tools/make_region5_zip.py [output_dir]
"""
import os
import shutil
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHEETS = os.path.join(ROOT, 'art', 'sheets')
STYLE = 'hm_style.webp'

GROUND = """16-bit top-down RPG pixel art in the same warm style and 3/4 top-down view as the attached images. The second attached image is the map of the previous area: paint the new map in exactly the same scale, detail and style.
Paint ONLY THE GROUND of {what}, seen from above, filling the whole picture edge to edge, as one map. {light}
Layout:
{layout}
- Paths are clearly visible (paving, gravel or dirt); everything else is garden, trees, water or rock.
- Leave EMPTY, flat plots where buildings will stand: {plots}.
Paint NO buildings, NO people, NO vehicles, NO text.
Landscape 1536 × 1024."""

AREAS = {
    '1a_Boden_Bahnhof': ('Kyoto Station area (modern city)', 'a modern Japanese city station district, with wide paved plazas',
        'Bright morning light, autumn leaves in the trees.',
        '- Top: a long flat plaza and a wide paved concourse where a big glass station building will stand (leave it empty). Shinkansen tracks run along the very top edge.\n- Centre: a large bus terminal with painted bays and bus-shelter plots, crosswalks, a taxi rank, bicycle racks, a small paved square with a few planted trees and benches.\n- Bottom: a city street with a crossing and a wide pavement; a narrow lane leaves to the right edge (towards the old town).\n- Modern street details: tactile paving lines, road markings, manhole covers, a few bollards.',
        'one huge plot at the top (station building), two small plots at the terminal (information kiosk, konbini), one plot at the right (hotel)'),
    '1b_Boden_Kamogawa': ('the Kamo riverside and Pontochō lane in Kyoto', 'a Japanese city river with a walking path and a narrow old nightlife lane',
        'Late afternoon, warm golden light, a few autumn leaves.',
        '- A shallow river with stepping stones runs across the upper third from left to right, with a stone embankment and a wide gravel walking path on both banks, cherry trees and benches.\n- A stone bridge crosses the river at the right.\n- Below the embankment: a very narrow paved lane (Pontochō style) running left to right with doorways and small steps, lanterns on poles.\n- Bottom: a quiet side street with a small tea café plot and a corner plot.',
        'three narrow plots along the lane (izakaya, tea café, small shop), one plot on the south bank (machiya)'),
    '1c_Boden_Gion': ('the old Gion district of Kyoto', 'a historic Japanese lane district with machiya townhouses (seen from above)',
        'Soft evening light, no people, a few autumn leaves, stone lanterns.',
        '- Several narrow stone-paved lanes crossing each other, with small wooden bridges over a tiny canal with willow trees.\n- A small open square in the centre with a shrine gate corner at the top and a big stone lantern.\n- Dense blocks of empty plots along both sides of the lanes (for wooden townhouses with latticed fronts).\n- Bottom left: a wider paved street to the station area; top right: stone steps leading up towards the hill temples.',
        'one large plot (guesthouse machiya), one medium plot (tea house with a small garden), one plot (kimono rental), four narrow plots for ordinary machiya, one plot for a small shrine'),
    '1d_Boden_Fushimi': ('the hill of Fushimi Inari in Kyoto', 'a wooded hillside with a long shrine path of red torii gates',
        'Early morning light with mist between the trees.',
        '- A wide stone-paved approach from the bottom edge up to a shrine courtyard plot in the lower third.\n- From the courtyard, a path runs up the hillside in two switchbacks, drawn as a covered tunnel of many red torii gates (seen from above as a dense red-orange line), with small stone steps and little shrines beside it.\n- Dense cedar forest everywhere else; a small pond with a bridge at the left; a tall-grass clearing on the right (for wild creatures).\n- At the very top: a flat plateau with a view.',
        'one plot for the main shrine hall, one for a small shrine office, one for a souvenir stand'),
    '1e_Boden_Nishiki': ('Nishiki Market in Kyoto', 'a long covered food-market street with side lanes, shown with the roof removed',
        'Bright, warm shop light.',
        '- One long, straight pedestrian market street running left to right through the centre, paved, with small side lanes crossing it, a temple gate plot at the right end and a shopping-street entrance gate plot at the left end.\n- Along both sides, rows of narrow empty shop plots (shops, stalls) all the same depth.\n- Above and below: back lanes with bicycles parking spots, crates and a small shrine in the corner.\n- A small open crossing in the middle with space for a stall.',
        'six narrow shop plots on each side (including one pickle shop and one knife shop), the two end gates'),
}


def ground(key):
    what, kind, light, layout, plots = AREAS[key]
    return GROUND.format(what=what + ': ' + kind, light=light, layout=layout, plots=plots)


FOLDERS = []  # (folder, prompt, attachments, hint)

for k in AREAS:
    FOLDERS.append((k, ground(k), [STYLE, 'ground_harbor_draft.webp'], f'Karte (Boden). Ergebnis speichern als: ground_{k.split("_", 2)[2].lower()}_draft.webp'))

FOLDERS.append(('2_Leute_Kyoto', """Create a walking sprite sheet for a top-down 16-bit RPG, in exactly the same pixel-art style, size and proportions as the attached character sheets.
RULES: chibi proportions, all adults exactly the same height, feet on the same baseline. Each character is one BLOCK of 4 columns × 4 rows:
Row 1 facing DOWN, Row 2 facing LEFT (true profile), Row 3 facing RIGHT (true profile — draw it, do not mirror; bags stay on the same body side), Row 4 facing UP (back view).
4 frames per row: standing, left foot forward, standing, right foot forward. Same outfit and items in every direction.
No large preview figure, no ground shadow, no text. Clear gaps between frames, bigger gaps between characters. 3 characters side by side, 2 rows.
Background: plain pure magenta (#FF00FF). Landscape 1536 × 1024.
The 6 characters (autumn clothes, modern Japan):
1. The tea-house mistress: an elegant woman of about 72, silver hair in a neat bun with a small hair ornament, dark-green kimono with a cream obi, white tabi socks and zori sandals, hands folded in front
2. The guesthouse host: a woman of about 45, hair in a low bun, cream blouse, long dark-blue apron, a ring of keys at the belt
3. The kimono-rental student: a young woman of about 22 in a staff outfit (short happi coat over a plain kimono, sleeves tied up with a cord), hair pinned up, a name badge, a tablet in her hand
4. A station attendant: a man of about 35 in a navy station uniform with a cap and white gloves, a handheld device on a strap
5. A business traveller: a man of about 40, grey suit and tie, a lanyard with a card, a roller suitcase, a smartphone in his hand
6. A backpacker tourist: a woman of about 28, sun hat, big backpack, a camera around her neck, a phone held up taking a photo""",
    [STYLE, 'hm_chars_harbor.webp', 'hm_chars_main.webp'], 'Laufbilder der 6 Figuren. Ergebnis speichern als: hm_chars_kyoto.webp'))

FOLDERS.append(('3_Portraets', """Dialogue portrait sheet for the characters in the walking sheet I also attach (from the previous message), in exactly the same style as the attached portrait sheet. Same faces, hair and clothes.
One ROW per character, 4 portraits per row: neutral, happy, surprised, worried. Head and shoulders, all the same size and crop.
Clear gaps, no text, no frames. Plain pure magenta (#FF00FF) background.
Rows:
1. The tea-house mistress (silver bun, dark-green kimono) — her four expressions: a polite smile that hides something, a real warm smile (rare), a lifted eyebrow, a faint worried look
2. The guesthouse host (low bun, cream blouse, dark-blue apron)
3. The kimono-rental student (hair pinned up, staff happi coat)
4. The station attendant (navy uniform and cap)
5. The business traveller (grey suit, lanyard)
6. The backpacker tourist (sun hat, camera)""",
    [STYLE, 'portraits_harbor.webp'], 'Porträts. Ergebnis speichern als: portraits_kyoto.webp (Ordner 2 vorher machen und anhängen).'))

FOLDERS.append(('4_Gebaeude', """Exterior buildings for Kyoto, in exactly the same style, light and scale as the attached building sheet. Each building separately, at least 40 px magenta gap between them, no readable text on signs.
IMPORTANT: NO smoke, NO people, NO vehicles (these are added in the game).
1. A big modern Japanese station building: glass and steel, a wide canopy over the entrance, a clock above the doors, escalators visible through the glass, a blank name sign
2. A large wooden machiya guesthouse: two storeys, latticed front, a dark tiled roof, a noren curtain in the doorway, potted plants by the door
3. A traditional tea house with a small front garden: low wooden building, sliding doors, a stone lantern and a bamboo fence, a hanging paper lantern
4. A kimono rental shop: a machiya-style front with colourful kimono hanging on racks in the open window, a wooden sign board (blank)
5. A narrow ordinary machiya townhouse (will be used several times): latticed front, a small noren, a bicycle leaning on the wall
6. A small shrine hall with a vermilion gate in front and a stone fox statue on each side
7. A covered market shop front (will be used several times): a narrow shop with a striped awning, crates of vegetables, a blank hanging sign
8. A modern convenience store front (bright, glass doors, generic colours, no brand names) and a small information kiosk beside the bus terminal
Plain pure magenta (#FF00FF) background. Landscape 1536 × 1024.""", [STYLE, 'hm_exterior_harbor.webp'], 'Gebäude. Ergebnis speichern als: hm_exterior_kyoto.webp'))

FOLDERS.append(('5_Kotodama', """Create a creature sprite sheet for a top-down 16-bit RPG (like Pokémon Emerald), matching the attached reference images in style: cute chibi pixel art, warm palette, clean dark warm-brown outline, no anti-aliasing, no blur, light from the top-left.
These creatures are "Kotodama": spirits born from words and memories. They should look friendly, charming and clearly readable at small size, with one strong silhouette and 2–3 main colours each. A Japanese kanji-like rune or glowing word mark somewhere on the body ties them together.

RULES (very important):
- Each creature is ONE ROW of 4 pictures, left to right:
  1. front view, idle pose (standing, looking at the viewer)
  2. front view, idle pose frame 2 (the same pose but breathing: body slightly squashed, ears/tails a little moved) — for a 2-frame idle animation
  3. back view (seen from behind and slightly above, for the player's side in battles) — same colours and features as the front
  4. action pose (front view, attacking or casting, with a small effect of its element)
- All 4 pictures of a creature have exactly the same size, colours and details.
- Evolution lines must clearly GROW: stage 1 small and round (about half the size), stage 2 medium and more confident, stage 3 large, elegant and powerful.
- No two creatures in the sheet may look alike, and none may look like the creatures in the attached sheets.
- Clear gaps between all pictures, bigger gaps between rows. No text, no labels, no ground shadow.
- Background: plain pure magenta (#FF00FF) everywhere. Landscape 1536 × 1024.

These are new creatures for the old capital Kyoto.
Rows (top to bottom):
1. Stage 1 of the tea line: a round little matcha bowl with two small eyes and a bamboo whisk as a tail
2. Stage 2: a tanuki-like kettle spirit, a steaming iron kettle on its back, a leaf on its head
3. Stage 3: a graceful crane made of white steam with gold tea-ceremony patterns on its wings
4. Stage 1 of the guardian line: a small fox kit with a vermilion scarf and a tiny torii mark on its forehead
5. Stage 2: a confident fox with two tails, a rice-ear in its mouth, red-lacquer markings
6. Stage 3: a large, elegant fox guardian with three tails and a ring of floating small torii gates""",
    [STYLE, 'kd_harbor.webp'], 'Kotodama. Ergebnis speichern als: kd_kyoto.webp'))

FOLDERS.append(('6_Kampfhintergruende', """Three battle backgrounds for the same game, in exactly the same painted pixel-art style as the attached battle background sheet, in Kyoto in autumn.
Each background is a wide scene seen from a low angle, with an empty ground area in the lower half where two creatures stand (one near the front-left, one further back on the right). No creatures, no people, no text, no UI.
1. A stone-paved Gion lane at dusk: wooden machiya fronts, paper lanterns lit, a tiny canal with a willow
2. A gravel riverside path beside a shallow river with stepping stones, autumn trees, a stone bridge in the distance
3. The inside of a long tunnel of red torii gates in morning mist, light falling through the gaps
Stack the three backgrounds vertically, each exactly 1536 × 340 px, separated by a 2 px black line. Keep the three equal in size.""",
    [STYLE, 'battle_bgs_harbor.webp'], 'Kampfhintergründe. Ergebnis speichern als: battle_bgs_kyoto.webp'))

FOLDERS.append(('7_Items', """16-bit top-down RPG pixel art in exactly the same warm style as the attached images (clean dark warm-brown outline, no anti-aliasing, no blur, light from the top-left).
Item icons in exactly the same style and size as the attached item sheet (each about 64 × 64 px), for Kyoto.
Draw 12 separate icons in a grid of 4 × 3, with clear magenta gaps, no text:
1. a matcha tea bowl with green tea and a bamboo whisk 2. three pastel wagashi sweets on a small plate 3. a folding fan with a maple-leaf pattern 4. a furoshiki wrapping cloth tied in a bundle
5. an omamori charm (small brocade bag with a cord) 6. a small jar of pickled vegetables 7. triangular yatsuhashi sweets 8. a blue-green IC transit card
9. a shuin stamp book (goshuincho) with a red seal 10. a stick of incense in a small holder 11. a wooden ema prayer plaque with a fox drawn on it 12. a bundle of three paper cranes tied with a string
Background: plain pure magenta (#FF00FF). Landscape 1536 × 1024.""", [STYLE, 'hm_items_harbor.webp'], 'Items. Ergebnis speichern als: hm_items_kyoto.webp'))

CG_INTRO = """Story illustration (cut-scene picture) in exactly the same painted anime-pixel style as the attached story pictures. The heroine is Maria (pink cap, long light-brown wavy hair); here she wears an autumn outfit: her pink jacket, a cream scarf, jeans and sneakers, a small backpack. Her companion is a small snow-white fox spirit with pale blue ear tips.
Picture 16:9 (1536 × 864), no text, no speech bubbles.
"""
FOLDERS.append(('8a_Story_Bild_1_Ankunft', CG_INTRO + "Arrival in Kyoto. Maria stands in the huge bright glass hall of a modern station with a Shinkansen behind her, a sea of travellers with suitcases and phones around her, signs in several languages; through the glass roof she sees the red leaves of the old city on the hills. The white fox peeks out of her backpack, wide-eyed. Busy, a little overwhelming, but exciting. Autumn morning light.",
    [STYLE, 'cg_harbor_arrival.webp', 'hm_chars_main.webp'], 'Story-Bild 1. Ergebnis speichern als: cg_kyoto_arrival.webp'))
FOLDERS.append(('8b_Story_Bild_2_Teehaus', CG_INTRO + "The tea house. A quiet tatami room opens onto a small garden with a red maple tree. An elegant old woman in a dark-green kimono kneels and whisks matcha; Maria sits across from her, trying to read the woman's face, a little confused; the white fox sits beside the tea utensils. A single paper lantern glows. Calm, warm, a hint of humour.",
    [STYLE, 'cg_harbor_song.webp', 'hm_chars_main.webp'], 'Story-Bild 2. Ergebnis speichern als: cg_kyoto_tea.webp'))
FOLDERS.append(('8c_Story_Bild_3_Fushimi', CG_INTRO + "Dawn at Fushimi Inari. A long tunnel of vermilion torii gates seen from the front, golden mist, soft sunlight coming through the gaps. Far ahead, a woman in a long dark-green coat and cream scarf (55, grey-streaked hair) walks away holding an old leather notebook, her face not visible. Maria stops in the middle of the path, her hand reaching out; the white fox stands beside her ears raised. Quiet, emotional, hopeful.",
    [STYLE, 'cg_harbor_lighthouse.webp', 'hm_chars_main.webp'], 'Story-Bild 3. Ergebnis speichern als: cg_kyoto_fushimi.webp'))

FOLDERS.append(('9_Musik', """Music for chapter 5 (for Suno or Udio, switch on "Instrumental").
Save as MP3 or WAV with these names and send them to me in the chat.

1. kyoto.mp3 (Kyoto by day)
Elegant, lively old-capital music for a Japanese RPG, instrumental, loopable. Koto and shamisen melody over a light modern beat, soft bamboo flute, bells, a hint of city energy, warm autumn mood, 100 BPM, no vocals.

2. gion.mp3 (Gion and the tea house in the evening)
Calm, mysterious evening music for a Japanese RPG, instrumental, loopable. Slow koto arpeggios, soft shakuhachi, a low drone, distant temple bell, a feeling of unspoken words, 70 BPM, no vocals.""", [], 'Musik. Ergebnisse speichern als: kyoto.mp3 und gion.mp3'))

ROOM_T = open(os.path.join(ROOT, 'art', 'PROMPTS_INTERIORS_2_4.md'), encoding='utf-8').read().split('## Room picture (template, the placeholders are already filled in per folder)')[1].split('```')[1].strip()
FUR_T = open(os.path.join(ROOT, 'art', 'PROMPTS_INTERIORS_2_4.md'), encoding='utf-8').read().split('## Furniture sheet (template)')[1].split('```')[1].strip()

ROOMS = [
    ('10a_Machiya_Gaestehaus', 'Machiya guesthouse (home base)', 14, 11, 2, 'columns 2–11, rows 4–8',
     'Entrance hall and lounge of a renovated Kyoto machiya used as a guesthouse. Dark wooden floor, a raised tatami area along the back wall, wooden latticed screens, a reception counter on the left with a guest book and a key rack, a small inner garden seen through glass doors at the back right, a hanging scroll with a maple branch, a shoe rack and a luggage rack on the left wall, a bookshelf with tourist guides on the right wall, paper lanterns.',
     'a low wooden table with a tea set (2×1); floor cushions in red and grey (1×1); a standing paper lantern (1×1); a large suitcase (1×1); a potted maple bonsai (1×1); a folding screen with a river painting (2×1)'),
    ('10b_Teehaus', 'Tea house (the tea mistress)', 12, 10, 1, 'columns 2–9, rows 4–7',
     'A quiet tea-ceremony room: tatami floor with a wooden border, an alcove (tokonoma) with a hanging scroll and a flower arrangement in the back wall, a small sunken hearth in the floor, shelves with tea bowls and a tea caddy, a paper sliding door on the right with a garden and a maple tree behind it, a low shelf with a kettle on the left wall.',
     'a low tea table (2×1); floor cushions (zabuton) in green and gold (1×1); a water jar and tea utensils on a small wooden stand (1×1); a standing paper lamp (1×1); a bamboo flower vase on a stand (1×1)'),
    ('10c_Kimono_Verleih', 'Kimono rental shop', 13, 10, 1, 'columns 2–10, rows 5–7',
     'A bright kimono rental shop: wooden floor, walls lined with racks of colourful kimono and obi, a mirror area on the right wall with a small dressing platform, a counter at the back with a tablet and a basket of hair ornaments, shelves with geta and zori on the left wall, a sliding door to a changing room.',
     'a full-length standing mirror (1×1); a low dressing bench (2×1); a rack of kimono on wheels (2×1); a basket of hair accessories on a stool (1×1); a potted plant (1×1)'),
    ('10d_Izakaya', 'Izakaya (small tavern)', 13, 10, 1, 'columns 2–10, rows 5–7',
     'A cosy small izakaya: dark wooden floor, a long counter across the back with the kitchen behind it, sake bottles on shelves, paper lanterns, a blue noren curtain, a handwritten menu on wooden tags (no readable text), a small TV on a shelf on the right wall, a stack of beer crates on the left wall, a sliding window.',
     'a round counter stool (1×1); a square low table with two cushions (2×1); a barrel table (1×1); a beer crate stack (1×1); a standing lantern (1×1)'),
    ('10e_Bahnhof_Info', 'Station information desk', 14, 11, 2, 'columns 2–11, rows 4–8',
     'A modern station information corner: light tiled floor, a curved information counter at the back with a monitor and brochure racks, a big route map and timetable display on the back wall, lockers along the left wall, a vending machine and a ticket machine on the right wall, a bench along the front, bright fluorescent light.',
     'a bench (2×1); a luggage trolley (1×1); a trash bin set with three bins (1×1); a potted plant (1×1); a standing sign board (1×1); a suitcase (1×1)'),
    ('10f_Nishiki_Laden', 'Pickle shop at Nishiki Market', 12, 10, 1, 'columns 2–9, rows 4–7',
     'A traditional pickle shop: wooden floor, shelves behind the counter filled with jars and barrels of pickled vegetables, a counter in front with sample plates and toothpicks, a hanging blank wooden sign, a stack of wooden crates on the left wall, a scale and a paper-wrapping station on the right wall, warm lamps.',
     'a barrel of pickles (1×1); a stack of wooden crates (1×1); a shopping basket on a stool (1×1); a small tasting table with sample plates (2×1); a potted plant (1×1)'),
]

for folder, title, W, H, door, middle, room, pieces in ROOMS:
    rp = ROOM_T.replace('{W}', str(W)).replace('{H}', str(H)).replace('{W*64}', str(W * 64)).replace('{H*64}', str(H * 64)).replace('{DOOR}', str(door)).replace('{MIDDLE}', middle).replace('{ROOM}', room)
    fp = FUR_T.replace('{PIECES}', pieces)
    FOLDERS.append((folder + '_Raumbild', rp, [STYLE, 'room_cafe_v2.webp', 'hm_chars_main.webp'], f'Raumbild: {title}. Ergebnis speichern als: room_{folder.split("_", 1)[1].lower()}.webp'))
    FOLDERS.append((folder + '_Moebel', fp, [STYLE, 'room_cafe_v2.webp', 'hm_chars_main.webp'], f'Möbel für: {title}. Das fertige Raumbild aus der Nachricht davor zusätzlich anhängen!'))

LIESMICH = """Kotodama Chronicles – Kapitel 5: Kyoto (京都)

Jeder Ordner = eine Nachricht an GPT (Ordner 9 ist für Suno/Udio).
In jedem Ordner: PROMPT.txt (Text kopieren), die Beispielbilder zum Anhängen und ANLEITUNG.txt.
Reihenfolge einhalten: Ordner 3 braucht dein Ergebnis aus Ordner 2; jeder Möbel-Ordner (…_Moebel) braucht das fertige Raumbild davor.

1a–1e  Karten (Boden) der 5 Gebiete   2  Laufbilder   3  Porträts   4  Gebäude
5  Kotodama   6  Kampfhintergründe   7  Items   8a–8c  Story-Bilder   9  Musik
10a–10f  Innenräume (je Raumbild + Möbel)

Du musst nicht alles auf einmal machen. Wichtigste Reihenfolge: 1a, 1c, 2, 3, 4, 5, dann der Rest.
Die fertigen Bilder und Musikstücke einfach in den Chat hochladen, ich baue sie ins Spiel ein.
"""


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'art', 'out')
    pkg = os.path.join(out, 'Kotodama_Kapitel5')
    shutil.rmtree(pkg, ignore_errors=True)
    os.makedirs(pkg)
    open(os.path.join(pkg, 'LIESMICH.txt'), 'w', encoding='utf-8').write(LIESMICH)
    md = ['# Images and music for chapter 5: Kyoto (京都)', 'Same procedure as before: one folder of the ZIP = one message to GPT.',
          'Generated by tools/make_region5_zip.py; see art/PLAN_CHAPTER5_KYOTO.md for the story.', '']
    for folder, prompt, attach, hint in FOLDERS:
        d = os.path.join(pkg, folder)
        os.makedirs(d)
        open(os.path.join(d, 'PROMPT.txt'), 'w', encoding='utf-8').write(prompt + '\n')
        open(os.path.join(d, 'ANLEITUNG.txt'), 'w', encoding='utf-8').write(
            'Eine Nachricht an GPT: Text aus PROMPT.txt kopieren und die Bilder aus diesem Ordner anhängen.\n' + hint + '\n')
        for a in attach:
            src = os.path.join(SHEETS, a)
            if not os.path.exists(src):
                raise SystemExit('missing reference image ' + src)
            shutil.copy(src, d)
        md += [f'## {folder}', f'**Attach:** {", ".join(attach) or "-"}  ·  {hint}', '', '```', prompt, '```', '']
    open(os.path.join(ROOT, 'art', 'PROMPTS_REGION5.md'), 'w', encoding='utf-8').write('\n'.join(md))
    # three ZIPs (the chat upload limit is 30 MB): maps, people/items/story, interiors
    for name, pick in (('Kotodama_Kapitel5_A_Karten', lambda f: f.startswith('1') and not f.startswith('10')), ('Kotodama_Kapitel5_B_Figuren_Items_Story', lambda f: f[0] in '23456789'), ('Kotodama_Kapitel5_C_Innenraeume', lambda f: f.startswith('10'))):
        zp = os.path.join(out, name + '.zip')
        with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
            z.write(os.path.join(pkg, 'LIESMICH.txt'), 'Kotodama_Kapitel5/LIESMICH.txt')
            for folder in sorted(os.listdir(pkg)):
                if os.path.isdir(os.path.join(pkg, folder)) and pick(folder):
                    for f in os.listdir(os.path.join(pkg, folder)):
                        z.write(os.path.join(pkg, folder, f), f'Kotodama_Kapitel5/{folder}/{f}')
        print(zp, round(os.path.getsize(zp) / 1e6, 1), 'MB')


if __name__ == '__main__':
    main()
