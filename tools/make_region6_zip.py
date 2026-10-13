"""
Builds the art brief for chapter 6 (Osaka): art/PROMPTS_REGION6.md and three ZIPs (maps / people-items-story / interiors),
one folder per GPT message (PROMPT.txt + reference images + ANLEITUNG.txt). Reuses the templates of make_region5_zip.py.

Run: python3 tools/make_region6_zip.py [output_dir]
"""
import os
import shutil
import sys
import zipfile

sys.path.insert(0, os.path.dirname(__file__))
import make_region5_zip as k5  # noqa: E402

ROOT, SHEETS, STYLE = k5.ROOT, k5.SHEETS, k5.STYLE
GROUND = k5.GROUND
REF_GROUND = 'ground_gion_draft.webp'

AREAS = {
    '1a_Boden_Umeda': ('the Umeda business district of Osaka', 'a modern Japanese business district seen from above, with wide pavements',
        'Bright late-morning light, autumn leaves in a few street trees.',
        '- Top: a long plaza and a broad paved forecourt where a big station building will stand (leave it empty), railway tracks along the top edge.\n- Left and right: two blocks of empty plots for glass office towers, separated by a wide avenue with crossings and traffic islands.\n- Centre: a pedestrian square with benches, planters, bicycle racks and a small fountain; underground-entrance stair shafts with railings.\n- Bottom: a busy main street with a crossing, a row of street trees, tactile paving lines and manhole covers.',
        'one huge plot (station), four large plots (office towers), two small plots (convenience store, coffee kiosk)'),
    '1b_Boden_Nakanoshima': ('Nakanoshima, the river island park of Osaka', 'a long riverside park between a wide river and a row of old brick buildings',
        'Soft noon light, golden leaves, calm water.',
        '- A wide river with stone embankments along the bottom third, a stone bridge crossing it on the right.\n- A long park with lawns, winding gravel paths, benches, rose-bed shapes and big trees in the middle.\n- Along the top: a street with empty plots for old brick halls and a glass tower.\n- A riverside promenade with steps down to the water and a small landing stage.',
        'two large plots (brick hall, glass tower), two small plots (café, small trading-company lobby)'),
    '1c_Boden_Dotonbori': ('Dotonbori, the neon canal street of Osaka', 'a narrow canal lined with a pedestrian boardwalk, bridges and dense empty shop plots',
        'Dusk, warm lamplight, the ground only (no neon signs painted).',
        '- A straight canal runs left to right through the lower-middle, with a wide stone boardwalk on its north bank and a second narrow promenade on the south bank.\n- Two bridges cross the canal (one wide, one narrow arched).\n- North of the boardwalk: a dense row of narrow empty shop plots, with small alleys running north between them.\n- A little open square at the east end with a bridge head; stone steps down to the water in two places.',
        'six narrow shop plots (including a takoyaki shop, an okonomiyaki restaurant and an izakaya) and one corner plot'),
    '1d_Boden_Shinsekai': ('Shinsekai, the retro district of Osaka', 'an old amusement district with a central circle, a tall tower plot and narrow arcade streets',
        'Late afternoon, slightly faded warm light.',
        '- A central round plaza with a clear plot for a tall retro tower, four streets radiating from it.\n- Narrow covered arcades (shown with the roof removed) with rows of small empty shop plots.\n- A small park corner with benches where old men play board games; tidy paved ground, bicycles, crates.\n- Back lanes with lamp posts and a small shrine corner.',
        'one tower plot, eight narrow shop plots (including a kushikatsu diner and a shogi parlour), one small shrine plot'),
    '1e_Boden_Osakajo': ('Osaka Castle park', 'a castle park with a stone-walled moat, gate bridges and wide gravel paths',
        'Bright clear morning light, a few autumn leaves.',
        '- A big square stone-walled moat with water in the upper half, a stone bridge over it leading to a gate plot, and a huge empty plot inside the walls where a castle keep will stand.\n- Wide gravel paths around the moat, rows of trees, lawns, benches, a jogging track.\n- Lower area: a plaza with food-stall plots and a tea stall; stairs up to the stone walls.\n- A tall-grass patch under trees in one corner (for wild creatures).',
        'one huge plot (castle keep), one gate plot, two small plots (tea stall, museum shop)'),
}

FOLDERS = []


def ground(key):
    what, kind, light, layout, plots = AREAS[key]
    return GROUND.format(what=what + ': ' + kind, light=light, layout=layout, plots=plots)


for k in AREAS:
    FOLDERS.append((k, ground(k), [STYLE, REF_GROUND], f'Karte (Boden). Ergebnis speichern als: ground_{k.split("_", 2)[2].lower()}_draft.webp'))

FOLDERS.append(('2_Leute_Osaka', """Create a walking sprite sheet for a top-down 16-bit RPG, in exactly the same pixel-art style, size and proportions as the attached character sheets.
RULES: chibi proportions, all adults exactly the same height, feet on the same baseline. Each character is one BLOCK of 4 columns × 4 rows:
Row 1 facing DOWN, Row 2 facing LEFT (true profile), Row 3 facing RIGHT (true profile — draw it, do not mirror; bags stay on the same body side), Row 4 facing UP (back view).
4 frames per row: standing, left foot forward, standing, right foot forward. Same outfit and items in every direction.
No large preview figure, no ground shadow, no text. Clear gaps between frames, bigger gaps between characters. 3 characters side by side, 2 rows.
Background: plain pure magenta (#FF00FF). Landscape 1536 × 1024.
The 6 characters (autumn clothes, modern Japan):
1. Tachibana-san: a slim, upright woman of about 58, silver-streaked hair in a tight bun, charcoal skirt suit, a white blouse, a slim name badge, a folder held to her chest, tired but flawless
2. Kenta: a young man of about 23, short black hair, a slightly oversized dark-navy suit, a brand-new company lanyard, a stiff new briefcase, a nervous look
3. Okan (Mrs. Naniwa): a round, loud, friendly woman of about 60, short permed hair, a leopard-print blouse under a white apron, a headband, tongs in one hand
4. Fujita-kachō: a tired section chief of about 45, loosened tie, rumpled grey suit, glasses, a large coffee can in his hand, a heavy shoulder bag
5. Minh: a young woman of about 24, a ponytail, a bright convenience-store uniform with a name tag, a small notebook with a pencil in her apron pocket
6. A hotel porter: a man of about 40 in a dark uniform with a cap and white gloves, pushing a small luggage trolley""",
    [STYLE, 'hm_chars_kyoto.webp', 'hm_chars_main.webp'], 'Laufbilder der 6 Figuren. Ergebnis speichern als: hm_chars_osaka.webp'))

FOLDERS.append(('3_Portraets', """Dialogue portrait sheet for the characters in the walking sheet I also attach (from the previous message), in exactly the same style as the attached portrait sheet. Same faces, hair and clothes.
One ROW per character, 4 portraits per row: neutral, happy, surprised, worried. Head and shoulders, all the same size and crop.
Clear gaps, no text, no frames. Plain pure magenta (#FF00FF) background.
Rows:
1. Tachibana-san (silver-streaked bun, charcoal suit) — her four expressions: a perfect professional smile, a rare tired real smile, a lifted eyebrow, a faint worried look
2. Kenta (nervous new graduate, navy suit)
3. Okan (loud takoyaki lady, headband)
4. Fujita-kachō (tired section chief, glasses)
5. Minh (konbini uniform, ponytail)
6. The hotel porter (cap, white gloves)""",
    [STYLE, 'portraits_kyoto.webp'], 'Porträts. Ergebnis speichern als: portraits_osaka.webp (Ordner 2 vorher machen und anhängen).'))

FOLDERS.append(('4_Gebaeude', """Exterior buildings for Osaka, in exactly the same style, light and scale as the attached building sheet. Each building separately, at least 40 px magenta gap between them, no readable text on signs.
IMPORTANT: NO smoke, NO people, NO vehicles (these are added in the game).
1. A big modern station building: glass and steel, a curved canopy over the entrance, a large clock, a blank name sign
2. A tall glass office tower (about 4 storeys shown from the 3/4 top-down view), a lobby entrance with a revolving door
3. An old red-brick public hall with a copper-green roof and arched windows (Nakanoshima style)
4. A narrow takoyaki shop: a bright red awning, a big blank octopus-shaped sign, a serving window
5. An okonomiyaki restaurant: dark wood front, a blue noren, a paper lantern, a big blank sign
6. A kushikatsu diner: yellow-and-red front, a skewer-shaped blank sign, a sliding door
7. A tall retro tower on a base (Shinsekai style) with a blank sign on top and a viewing deck
8. A castle keep: white walls, green copper roofs with gold ornaments, on a high stone base
Plain pure magenta (#FF00FF) background. Landscape 1536 × 1024.""", [STYLE, 'hm_exterior_kyoto.webp'], 'Gebäude. Ergebnis speichern als: hm_exterior_osaka.webp'))

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

These are new creatures for the big working city Osaka.
Rows (top to bottom):
1. Stage 1 of the steam-pot line: a small round takoyaki-pan spirit with a little octopus-leg tuft on top and a toothpick like an antenna
2. Stage 2: a plump, cheerful tanuki-like cook spirit with a steaming pot hat and a ladle, a glowing "味" mark on its belly
3. Stage 3: a grand, golden steam-dragon-cat with a drifting cloud of savoury steam and chef's-knife-shaped fins
4. Stage 1 of the lantern-sign line: a tiny paper lantern with sleepy eyes and a little neon-pink tail
5. Stage 2: a confident lantern-fox with a glowing signboard tail made of small colourful bulbs
6. Stage 3: a tall, elegant lantern-crane with a long neck of lit signs and wings of glowing banners""",
    [STYLE, 'kd_kyoto.webp'], 'Kotodama. Ergebnis speichern als: kd_osaka.webp'))

FOLDERS.append(('6_Kampfhintergruende', """Three battle backgrounds for the same game, in exactly the same painted pixel-art style as the attached battle background sheet, in Osaka.
Each background is a wide scene seen from a low angle, with an empty ground area in the lower half where two creatures stand (one near the front-left, one further back on the right). No creatures, no people, no text, no UI.
1. A neon canal street at night (Dotonbori style): glowing blank signs reflected in the canal, a wide stone boardwalk in the foreground
2. A glass-and-steel business district at dusk: office towers lit from inside, a wide empty plaza with a few street trees, a pale orange sky
3. The stone walls and moat of Osaka Castle in the morning: autumn trees, the castle keep in the distance, a gravel path in the foreground
Stack the three backgrounds vertically, each exactly 1536 × 340 px, separated by a 2 px black line. Keep the three equal in size.""",
    [STYLE, 'battle_bgs_kyoto.webp'], 'Kampfhintergründe. Ergebnis speichern als: battle_bgs_osaka.webp'))

FOLDERS.append(('7_Items', """16-bit top-down RPG pixel art in exactly the same warm style as the attached images (clean dark warm-brown outline, no anti-aliasing, no blur, light from the top-left).
Item icons in exactly the same style and size as the attached item sheet (each about 64 × 64 px), for Osaka.
Draw 12 separate icons in a grid of 4 × 3, with clear magenta gaps, no text:
1. a boat of takoyaki balls with sauce and bonito flakes 2. an okonomiyaki pancake on a griddle plate 3. a skewer of kushikatsu with a dipping dish 4. a canned coffee
5. a business card (meishi) held in two hands 6. a company lanyard with an ID card 7. an energy-drink bottle 8. a hanko seal stamp with red ink
9. a fountain pen in a case 10. a red leather notebook with a ribbon 11. a small Osaka-style lucky cat figurine (a cat with a coin) 12. a bundle of old train tickets tied with a string
Background: plain pure magenta (#FF00FF). Landscape 1536 × 1024.""", [STYLE, 'hm_items_kyoto.webp'], 'Items. Ergebnis speichern als: hm_items_osaka.webp'))

CG = """Story illustration (cut-scene picture) in exactly the same painted anime-pixel style as the attached story pictures. The heroine is Maria (pink cap, long light-brown wavy hair); here she wears her pink jacket, a cream scarf, jeans and sneakers, a small backpack. Her companion is a small snow-white fox spirit with pale blue ear tips.
Picture 16:9 (1536 × 864), no text, no speech bubbles.
"""
FOLDERS.append(('8a_Story_Bild_1_Ankunft', CG + "Arrival in Osaka. Maria stands on a pedestrian deck above a wide avenue at lunchtime; below, a river of people in dark suits with lanyards and coffee cups streams between glass towers; neon and big signs glow in the daylight. The white fox peeks from her backpack, ears flat from the noise. Energetic, a little overwhelming. Bright autumn light.",
    [STYLE, 'cg_kyoto_arrival.webp', 'hm_chars_main.webp'], 'Story-Bild 1. Ergebnis speichern als: cg_osaka_arrival.webp'))
FOLDERS.append(('8b_Story_Bild_2_Takoyaki', CG + "The takoyaki alley at dusk. A loud, cheerful stall owner in a headband flips takoyaki balls with two picks, steam rising; a tired section chief in a rumpled suit sits on a crate eating a skewer and finally smiling; Maria and the fox share a boat of takoyaki beside him. Warm lantern light, relaxed and funny.",
    [STYLE, 'cg_kyoto_tea.webp', 'hm_chars_main.webp'], 'Story-Bild 2. Ergebnis speichern als: cg_osaka_takoyaki.webp'))
FOLDERS.append(('8c_Story_Bild_3_Burg', CG + "Dawn at Osaka Castle. The white castle keep stands over the stone walls and moat in golden morning mist; on the bridge far ahead a woman in a long dark-green coat and cream scarf (55, grey-streaked hair) walks away holding an old leather notebook, face not visible. Maria stops mid-bridge with her hand half raised; the white fox stands beside her, ears up. Quiet, emotional, hopeful.",
    [STYLE, 'cg_kyoto_fushimi.webp', 'hm_chars_main.webp'], 'Story-Bild 3. Ergebnis speichern als: cg_osaka_castle.webp'))

FOLDERS.append(('9_Musik', """Music for chapter 6 (for Suno or Udio, switch on "Instrumental").
Save as MP3 or WAV with these names and send them to me in the chat.

1. osaka.mp3 (Osaka by day: business district and streets)
Bright, busy modern-city music for a Japanese RPG, instrumental, loopable. Funky electric piano, a light brass riff, tight drums, a hint of shamisen, upbeat and slightly hurried, 118 BPM, no vocals.

2. dotonbori.mp3 (the neon canal street and the takoyaki alley in the evening)
Warm, playful evening-street music for a Japanese RPG, instrumental, loopable. Jazzy guitar, double bass, brushed drums, a little accordion and festival bells, cosy and humorous with a touch of melancholy, 96 BPM, no vocals.""", [], 'Musik. Ergebnisse speichern als: osaka.mp3 und dotonbori.mp3'))

ROOMS = [
    ('10a_Buero', 'Open-plan office floor', 14, 11, 2, 'columns 2–11, rows 4–8',
     'A real Japanese open-plan office: light grey carpet-tile floor, rows of desk islands against the back wall (monitors, paper stacks), a glass-walled meeting room in the back right corner, a whiteboard with blank sticky notes on the back wall, filing cabinets along the left wall, a coffee machine and a small printer on the right wall, fluorescent ceiling lights, a clock, a wall calendar.',
     'a pair of facing desks with monitors (2×1); an office chair (1×1); a meeting table with four chairs (2×1); a photocopier (1×1); a tall plant (1×1); a stack of document boxes on a trolley (1×1)'),
    ('10b_Empfang', 'Company reception', 12, 10, 1, 'columns 2–9, rows 4–7',
     'A tidy company reception: polished stone floor, a curved reception desk at the back with a phone and a visitor sign-in tablet, a plain wall with a blank company logo plate, a small waiting area on the left with a low table and magazines, a glass door to the office on the right, a tall plant, an umbrella stand.',
     'a two-seat waiting sofa facing right (2×1); a low glass table with magazines (1×1); an armchair facing up (1×1); a tall potted plant (1×1); a standing sign board (1×1)'),
    ('10c_Takoyaki_Laden', 'Takoyaki shop', 12, 10, 1, 'columns 2–9, rows 4–7',
     'A small takoyaki shop interior: a counter across the back with a big iron takoyaki griddle, bottles of sauce, a bowl of batter and a stack of paper boats, a menu on the back wall (no readable text), a few wooden stools along the front of the counter, a cheerful red lantern, a small TV on a shelf, a stack of flour sacks in the corner.',
     'a round counter stool (1×1); a small standing table (1×1); a bench along the wall (2×1); a crate of octopus-shaped toy packaging (1×1); a rubbish bin set (1×1)'),
    ('10d_Okonomiyaki', 'Okonomiyaki restaurant', 13, 10, 1, 'columns 2–10, rows 5–7',
     'A cosy okonomiyaki restaurant: dark wooden floor, a long counter with iron griddles built in, a menu on wooden tags (no readable text), a blue noren curtain to the kitchen, paper lanterns, a shelf with beer bottles and sauce jars, a window to the street on the right, a few framed old Osaka photos (no text).',
     'a square table with a built-in griddle and four cushions (2×1); a wooden stool (1×1); a beer crate stack (1×1); a standing lantern (1×1); a coat rack (1×1)'),
    ('10e_Konbini', 'Convenience store (Osaka)', 13, 10, 2, 'columns 2–10, rows 4–7',
     'A bright Japanese convenience store interior in generic colours (no brand names): white floor, a cash register counter with an oden pot and a hot-snack case at the back left, drink fridges along the back right, magazine rack on the left wall, an ATM next to the door on the right, a bulletin board, hanging promotional boards with no readable text.',
     'a snack shelf (2×1); a stack of delivery boxes (1×1); a shopping basket tower (1×1); a small ice-cream freezer (2×1); a mop bucket and sign (1×1)'),
    ('10f_Kushikatsu', 'Kushikatsu diner', 12, 10, 1, 'columns 2–9, rows 4–7',
     'A lively kushikatsu diner in Shinsekai: yellow-and-red walls, a long counter with deep fryers behind it, skewer racks, sauce dipping dishes built into the counter, a sign on the wall asking guests not to double-dip (symbols only, no readable text), a retro wall clock and old posters, a small TV.',
     'a counter stool (1×1); a square table with a sauce dish (2×1); a bench along the wall (2×1); a stack of bamboo skewer jars (1×1); a standing menu board (1×1)'),
]

for folder, title, W, H, door, middle, room, pieces in ROOMS:
    rp = k5.ROOM_T.replace('{W}', str(W)).replace('{H}', str(H)).replace('{W*64}', str(W * 64)).replace('{H*64}', str(H * 64)).replace('{DOOR}', str(door)).replace('{MIDDLE}', middle).replace('{ROOM}', room)
    fp = k5.FUR_T.replace('{PIECES}', pieces)
    slug = folder.split('_', 1)[1].lower()
    FOLDERS.append((folder + '_Raumbild', rp, [STYLE, 'room_cafe_v2.webp', 'hm_chars_main.webp'], f'Raumbild: {title}. Ergebnis speichern als: room_{slug}.webp'))
    FOLDERS.append((folder + '_Moebel', fp, [STYLE, 'room_cafe_v2.webp', 'hm_chars_main.webp'], f'Möbel für: {title}. Das fertige Raumbild aus der Nachricht davor zusätzlich anhängen!'))

LIESMICH = """Kotodama Chronicles – Kapitel 6: Osaka (大阪)

Jeder Ordner = eine Nachricht an GPT (Ordner 9 ist für Suno/Udio).
In jedem Ordner: PROMPT.txt (Text kopieren), die Beispielbilder zum Anhängen und ANLEITUNG.txt.
Reihenfolge einhalten: Ordner 3 braucht dein Ergebnis aus Ordner 2; jeder Möbel-Ordner (…_Moebel) braucht das fertige Raumbild davor.

1a–1e  Karten (Boden)   2  Laufbilder   3  Porträts   4  Gebäude   5  Kotodama   6  Kampfhintergründe
7  Items   8a–8c  Story-Bilder   9  Musik   10a–10f  Innenräume (je Raumbild + Möbel)

Wichtigste Reihenfolge: 1a, 1c, 2, 3, 4, 5, dann der Rest. Die fertigen Dateien einfach im Chat hochladen.
"""


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'art', 'out')
    pkg = os.path.join(out, 'Kotodama_Kapitel6')
    shutil.rmtree(pkg, ignore_errors=True)
    os.makedirs(pkg)
    open(os.path.join(pkg, 'LIESMICH.txt'), 'w', encoding='utf-8').write(LIESMICH)
    md = ['# Images and music for chapter 6: Osaka (大阪)', 'One folder of the ZIP = one message to GPT. Generated by tools/make_region6_zip.py; story in art/PLAN_CHAPTER6_OSAKA.md.', '']
    for folder, prompt, attach, hint in FOLDERS:
        d = os.path.join(pkg, folder)
        os.makedirs(d)
        open(os.path.join(d, 'PROMPT.txt'), 'w', encoding='utf-8').write(prompt + '\n')
        open(os.path.join(d, 'ANLEITUNG.txt'), 'w', encoding='utf-8').write('Eine Nachricht an GPT: Text aus PROMPT.txt kopieren und die Bilder aus diesem Ordner anhängen.\n' + hint + '\n')
        for a in attach:
            src = os.path.join(SHEETS, a)
            if not os.path.exists(src):
                raise SystemExit('missing reference image ' + src)
            shutil.copy(src, d)
        md += [f'## {folder}', f'**Attach:** {", ".join(attach) or "-"}  ·  {hint}', '', '```', prompt, '```', '']
    open(os.path.join(ROOT, 'art', 'PROMPTS_REGION6.md'), 'w', encoding='utf-8').write('\n'.join(md))
    for name, pick in (('Kotodama_Kapitel6_A_Karten', lambda f: f.startswith('1') and not f.startswith('10')),
                       ('Kotodama_Kapitel6_B_Figuren_Items_Story', lambda f: f[0] in '23456789'),
                       ('Kotodama_Kapitel6_C_Innenraeume', lambda f: f.startswith('10'))):
        zp = os.path.join(out, name + '.zip')
        with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
            z.write(os.path.join(pkg, 'LIESMICH.txt'), 'Kotodama_Kapitel6/LIESMICH.txt')
            for folder in sorted(os.listdir(pkg)):
                if os.path.isdir(os.path.join(pkg, folder)) and pick(folder):
                    for f in os.listdir(os.path.join(pkg, folder)):
                        z.write(os.path.join(pkg, folder, f), f'Kotodama_Kapitel6/{folder}/{f}')
        print(zp, round(os.path.getsize(zp) / 1e6, 1), 'MB')


if __name__ == '__main__':
    main()
