"""
Builds Kotodama_Bahnhofshallen.zip: prompts for three own station halls (Kyoto, Umeda, Tokyo), room picture + furniture each,
laid out like the Hinomori hall so the ticket-gate logic can be reused. Run: python3 tools/make_station_halls_zip.py <out dir>
"""
import os, shutil, sys, zipfile
sys.path.insert(0, os.path.dirname(__file__))
import make_region5_zip as k5
from PIL import Image

ROOT, SHEETS, STYLE = k5.ROOT, k5.SHEETS, k5.STYLE
A = os.path.join(ROOT, 'public', 'assets')
W, H = 22, 15
LAYOUT = """HALL LAYOUT (very important, keep exactly; 22 x 15 tiles, 1 tile = 64 px, image exactly 1408 x 960 px):
- top 2 tile rows: the back wall with the big departure windows onto the platforms (you see trains and platform roofs through the glass)
- tile row 5 (the 6th row from the top): a continuous line of TICKET GATES (automatic gates with a small display, 6 gates side by side) spanning tile columns 14 to 19, with one gap-free barrier wall continuing left of it to column 13 and right of it to column 21, so the gates are the only way through
- tile columns 2 to 12 of row 5: ticket window (columns 3-6), two ticket machines (columns 7-8), a big timetable board (columns 9-11), a poster (column 12); all against the wall, one tile deep
- left wall (column 2, rows 6-10): coin lockers; right wall: posters (column 20, rows 5-7) and two vending machines (columns 19-20, rows 8-11)
- bottom tile row: the entrance, 2 tiles wide in the middle (columns 10 and 11), with a door mat just inside
- the MIDDLE of the hall (columns 3-18, rows 7-12) is EMPTY floor with a light pattern only. Free-standing furniture is added separately.
Same 3/4 top-down view as the attached hall: camera looking down about 60 degrees, side walls visible from above, every object shows its top surface, never a straight-on front view. No characters, no readable text, no grid lines. Everything outside the hall is pure magenta #FF00FF."""

HALLS = [
 ('1_Kyoto', 'KYOTO STATION HALL', 'A grand modern-meets-traditional Kyoto station hall: huge glass wall and a high ceiling with a wooden lattice, light grey stone floor with a subtle pattern, dark wood and warm paper-lantern light accents, a calm, elegant mood. Departure windows show Shinkansen trains. Hanging paper lantern lamps, a small ikebana arrangement and a wooden bench corner painted against the wall near the entrance.',
  'long wooden benches in two orientations (3x1); a large potted bamboo (1x1); a luggage trolley (1x1); a small souvenir cart with blank boxes (2x1); a standing paper lantern (1x1); a trash and recycling station (1x1); a luggage pile with a suitcase and a backpack (1x1)'),
 ('2_Osaka_Umeda', 'UMEDA STATION HALL (OSAKA)', 'A big, bright, modern Osaka commuter station hall: polished white and grey floor with coloured guide lines, bright ceiling lights, a lively busy mood, glass and steel, colourful blank advertising screens on the walls, a small kiosk painted against the right wall. Departure windows show green and silver commuter trains.',
  'curved metal benches (3x1); a coffee kiosk cart (2x1); a standing blank advertisement screen (1x1); a luggage trolley (1x1); a potted tree in a square planter (1x1); a trash and recycling station (1x1); a bicycle pump station and a commuter crowd barrier post (1x1)'),
 ('3_Tokyo', 'TOKYO STATION HALL', 'A stately historic Tokyo station hall in red brick: warm red brick walls with white stone bands, a high arched ceiling with a dome-like skylight, dark wood panelling and brass lamps, an old station clock above the gates, tiled marble floor in beige and brown, a dignified, slightly nostalgic mood. Departure windows show a Shinkansen with its white and blue colours.',
  'wooden benches with iron frames (3x1); a brass floor lamp (1x1); a vintage trolley with luggage (1x1); a potted palm (1x1); a small newspaper kiosk (2x1); a trash and recycling station (1x1); a standing clock on a pillar (1x1)'),
]
FUR = """Free-standing furniture for the attached station hall: same painting style, colours, light and 3/4 top-down angle (top surfaces visible, never a straight-on front view). Same scale as the hall and the attached characters. Footprints are whole tiles (1 tile = 64 px); tall pieces may stick up into the tile above. Each piece separately, at least 24 px magenta gap, no shadows on the floor, no labels. Pure magenta #FF00FF background.
Pieces: {P}"""
ROOM = """Painted interior of a station ticket hall for a top-down 16-bit RPG, in the same look as the attached reference hall (the Hinomori station hall) but with its OWN character: {WHAT}

""" + LAYOUT

out = sys.argv[1]
stage = os.path.join(out, '_hall_stage'); shutil.rmtree(stage, ignore_errors=True)
refs = [(os.path.join(A, 'room_station.png'), 'ref_halle_hinomori.png'), (os.path.join(SHEETS, STYLE), STYLE), (os.path.join(SHEETS, 'hm_chars_main.webp'), 'hm_chars_main.webp')]
for folder, title, what, pieces in HALLS:
    for suffix, prompt, note in (('_Raumbild', ROOM.replace('{WHAT}', title + '. ' + what), f'Raumbild {title}. Ergebnis als hall_{folder.split("_",1)[1].lower()}.png (1408 x 960, magenta außerhalb).'),
                                 ('_Moebel', FUR.replace('{P}', pieces), f'Möbel für {title}. ERST nach dem fertigen Raumbild; das Raumbild zusätzlich anhängen. Ergebnis als furniture_hall_{folder.split("_",1)[1].lower()}.png (magenta Hintergrund).')):
        d = os.path.join(stage, folder + suffix); os.makedirs(d)
        open(os.path.join(d, 'PROMPT.txt'), 'w', encoding='utf-8').write(prompt + '\n')
        open(os.path.join(d, 'ANLEITUNG.txt'), 'w', encoding='utf-8').write('Eine Nachricht an GPT: PROMPT.txt kopieren und alle Bilder dieses Ordners anhängen.\n' + note + '\n')
        for s_, n_ in refs:
            if s_.endswith('.png'): Image.open(s_).convert('RGBA').save(os.path.join(d, n_))
            else: shutil.copy(s_, os.path.join(d, n_))
zp = os.path.join(out, 'Kotodama_Bahnhofshallen.zip')
with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
    for r, _, fs in os.walk(stage):
        for f in fs:
            p = os.path.join(r, f); z.write(p, os.path.relpath(p, stage))
shutil.rmtree(stage); print(zp, round(os.path.getsize(zp) / 1e6, 1), 'MB')
