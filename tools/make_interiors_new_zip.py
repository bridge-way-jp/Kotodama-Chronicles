"""
Builds ZIPs with prompts for NEW interiors (buildings that have no inside yet): per room a room picture + a furniture sheet,
using the same templates as the earlier interior packs. Run: python3 tools/make_interiors_new_zip.py <output_dir>
"""
import os, shutil, sys, zipfile
sys.path.insert(0, os.path.dirname(__file__))
import make_region5_zip as k5

ROOM_T, FUR_T, STYLE, SHEETS = k5.ROOM_T, k5.FUR_T, k5.STYLE, k5.SHEETS
REFS = [STYLE, 'room_cafe_v2.webp', 'hm_chars_main.webp']

# (folder, title, W, H, door, middle, room, pieces)
GROUPS = {
 'A_Kyoto_Osaka': [
  ('1_Kyoto_Wagashi', 'Kyoto sweet shop (wagashi)', 12, 10, 1, 'columns 2–9, rows 4–7',
   'A refined traditional sweets shop: pale wooden floor, a glass display counter across the back with colourful wagashi on trays, shelves with tea tins, a noren curtain to the kitchen, a small tasting corner by the window, paper lanterns.',
   'a small round tasting table with two stools (2×1); a basket of sweets boxes on a stool (1×1); a standing paper lamp (1×1); a potted maple bonsai (1×1); a stack of gift boxes (1×1)'),
  ('2_Kyoto_Fushimi_Teestand', 'Fushimi tea stand near the shrine path', 12, 10, 1, 'columns 2–9, rows 4–7',
   'A small rustic tea stand at the foot of a shrine mountain: dark wooden floor, a counter with iron kettles and tea bowls, wooden shelves with fox figurines and amulets (no text), a window looking at red torii, lanterns.',
   'a wooden bench with a red cushion (2×1); a charcoal brazier with a kettle (1×1); a stack of tea bowls on a stool (1×1); a stone fox figurine (1×1); a potted bamboo (1×1)'),
  ('3_Osaka_Kaufhaus', 'Umeda department store floor', 14, 11, 2, 'columns 2–11, rows 4–8',
   'A bright modern department-store floor: polished light floor, a long cosmetics counter at the back, mannequins and clothes racks along the left wall, a glass escalator hint on the right wall, ceiling spotlights, banners without text.',
   'a round clothes rack (1×1); a mannequin (1×1); a low display table with scarves (2×1); a shopping basket stack (1×1); a potted plant (1×1); a customer bench (2×1)'),
  ('4_Osaka_Kino', 'Shinsekai retro cinema lobby', 13, 10, 1, 'columns 2–10, rows 5–7',
   'A retro cinema lobby: dark red carpet, a ticket counter at the back, a popcorn machine on the right wall, faded blank film posters in frames on the left wall, brass lamps, a velvet-rope barrier.',
   'a velvet rope with two brass posts (2×1); a popcorn cart (1×1); a lobby sofa (2×1); a standing poster frame (1×1); a potted palm (1×1)'),
  ('5_Osaka_Burg_Museum', 'Osaka Castle museum hall', 14, 11, 2, 'columns 2–11, rows 4–8',
   'A castle museum hall: wooden floor, glass cases along the back wall with samurai armour and scrolls, a large painted folding screen of a castle, banners with crests (no text), lanterns, a reception desk on the left.',
   'a glass display case (2×1); a suit of samurai armour on a stand (1×1); a folding screen (2×1); a bench (2×1); a rope barrier with two posts (2×1)'),
 ],
 'B_Tokyo': [
  ('6_Tokyo_Koban', 'Police box (koban) at Tokyo Station', 12, 10, 1, 'columns 2–9, rows 4–7',
   'A small police box: tiled floor, a desk with a phone and a map of the district on the back wall, a lost-and-found shelf, a bicycle by the wall, a sliding window, a clock, a kettle on a small stove.',
   'a desk with a lamp (2×1); a swivel chair in four directions (1×1); a lost-and-found umbrella stand (1×1); a filing cabinet (1×1); a potted plant (1×1)'),
  ('7_Tokyo_Karaoke', 'Shibuya karaoke box lobby', 13, 10, 1, 'columns 2–10, rows 5–7',
   'A colourful karaoke lobby: patterned carpet, a reception counter with a key rack at the back, neon-style blank signs, a drink bar on the right wall, sound-proof doors along the left wall, disco ball light.',
   'a round table with a microphone and menu (2×1); a curved sofa (2×1); a drink vending machine (1×1); a standing speaker (1×1); a potted plant (1×1)'),
  ('8_Tokyo_Buchhandlung', 'Shinjuku bookshop', 14, 11, 2, 'columns 2–11, rows 4–8',
   'A cosy multi-storey-style bookshop: dark wooden floor, floor-to-ceiling bookshelves along the back and side walls, a ladder, a cash desk with a cat figurine on the left, reading lamps, a small stack of recommended books on a table (no readable titles).',
   'a free-standing bookshelf in two orientations (2×1); a low display table with books (2×1); a reading armchair (1×1); a rolling ladder (1×1); a stack of books on a stool (1×1); a potted plant (1×1)'),
  ('9_Tokyo_Souvenirladen', 'Asakusa souvenir shop', 13, 10, 1, 'columns 2–10, rows 5–7',
   'A lively Asakusa souvenir shop: wooden floor, shelves with fans, lucky cats, daruma dolls and folding fans (no text), a counter with a cash register, paper lanterns hanging, a rack of postcards on the right wall.',
   'a display table with lucky cats (2×1); a spinning postcard rack (1×1); a big daruma doll (1×1); a basket of folding fans (1×1); a stool (1×1); a potted plant (1×1)'),
  ('10_Tokyo_Wohnung', 'Sumida share house common room', 14, 11, 2, 'columns 2–11, rows 4–8',
   'A shared apartment common room near a river: light wooden floor, a kitchen counter with a small fridge on the back wall, a window with a river view and a tower in the distance, a bookshelf, a board with notes (no readable text), a cosy rug.',
   'a low dining table with four cushions (2×2); a sofa (2×1); a floor lamp (1×1); a bicycle leaning (1×1); a laundry rack with clothes (1×1); a potted plant (1×1)'),
  ('11_Tokyo_Aussichtsdeck', 'Tokyo tower observation deck', 14, 11, 2, 'columns 2–11, rows 4–8',
   'An observation deck high above the city: glass walls on the back and sides showing a night skyline of tiny lights, dark polished floor with a glowing path pattern, a small coin telescope, a souvenir counter on the left, soft blue light.',
   'a coin telescope (1×1); a long bench (2×1); a souvenir display (1×1); a railing piece (2×1); a potted plant (1×1)'),
 ],
 'C_Doerfer': [
  ('12_Tal_Bauernhaus', 'Valley farmhouse living room', 14, 11, 2, 'columns 2–11, rows 4–8',
   'A warm farmhouse living room: dark wooden floor with a raised tatami area, a kitchen stove and shelves with jars on the back wall, hanging bunches of dried herbs, a window onto the vineyard, a family altar (butsudan) on the left, wooden beams.',
   'a low dining table with cushions (2×1); a charcoal brazier (1×1); a spinning wheel (1×1); a stack of grape crates (1×1); a rocking chair (1×1); a potted plant (1×1)'),
  ('13_Tal_Weingut', 'Valley winery tasting room', 14, 11, 2, 'columns 2–11, rows 4–8',
   'A rustic winery tasting room: stone floor, wine barrels stacked along the back wall, a long tasting counter with glasses and bottles on the left, wooden shelves with bottles, a grape-press as a decoration on the right wall, lanterns.',
   'a tasting table with glasses (2×1); a wine barrel (1×1); a stack of crates with bottles (1×1); a grape press (1×1); a barrel table with two stools (2×1)'),
  ('14_Hafen_Restaurant', 'Harbour diner', 13, 10, 1, 'columns 2–10, rows 5–7',
   'A seaside harbour diner: wooden floor, a long counter with stools across the back and a grill behind it, nets and fishing floats hanging from the ceiling, a big window with a view of boats, blackboard menu (no readable text).',
   'a round table with four stools (2×2); a fish tank (1×1); a crate of fresh fish (1×1); a coat rack with oilskins (1×1); a barrel (1×1); a potted plant (1×1)'),
  ('15_Hafen_Amt', 'Harbour office', 12, 10, 1, 'columns 2–9, rows 4–7',
   'A small harbour office: wooden floor, a desk with a radio and maps on the back wall, a big tide table and nautical chart (no readable text), a lifebuoy, shelves with rope and tools, a window with the sea.',
   'a wide desk with papers (2×1); a swivel chair in four directions (1×1); a filing cabinet (1×1); a coil of rope (1×1); a barometer on a stand (1×1)'),
  ('16_Berg_Tempel', 'Yukimi mountain temple hall', 14, 11, 2, 'columns 2–11, rows 4–8',
   'A quiet mountain temple hall in winter: dark wooden floor, a golden altar with a small Buddha statue and incense at the back wall, hanging paper lanterns, a big bell on the right, snow visible through the paper doors, cushions in rows.',
   'an incense burner on a stand (1×1); an offering box (1×1); a row of floor cushions (2×1); a small gong on a frame (1×1); a monk\'s low desk (2×1); a potted pine (1×1)'),
 ],
}

out = sys.argv[1] if len(sys.argv) > 1 else '.'
os.makedirs(out, exist_ok=True)
for gname, rooms in GROUPS.items():
    stage = os.path.join(out, '_int_stage_' + gname); shutil.rmtree(stage, ignore_errors=True)
    for folder, title, W, H, door, middle, room, pieces in rooms:
        rp = ROOM_T.replace('{W}', str(W)).replace('{H}', str(H)).replace('{W*64}', str(W * 64)).replace('{H*64}', str(H * 64)).replace('{DOOR}', str(door)).replace('{MIDDLE}', middle).replace('{ROOM}', room)
        fp = FUR_T.replace('{PIECES}', pieces)
        for suffix, prompt, extra, hint in (('_Raumbild', rp, REFS, f'Raumbild: {title}. Ergebnis als room_{folder.split("_", 1)[1].lower()}.png ({W*64} x {H*64}, magenta außerhalb).'),
                                            ('_Moebel', fp, REFS, f'Möbel für: {title}. ERST NACH dem fertigen Raumbild: das Raumbild zusätzlich mit anhängen. Ergebnis als furniture_{folder.split("_", 1)[1].lower()}.png (magenta Hintergrund).')):
            d = os.path.join(stage, folder + suffix); os.makedirs(d)
            open(os.path.join(d, 'PROMPT.txt'), 'w', encoding='utf-8').write(prompt + '\n')
            open(os.path.join(d, 'ANLEITUNG.txt'), 'w', encoding='utf-8').write('Eine Nachricht an GPT: PROMPT.txt kopieren und alle Bilder dieses Ordners anhängen.\n' + hint + '\n')
            for a in extra:
                shutil.copy(os.path.join(SHEETS, a), d)
    zp = os.path.join(out, f'Kotodama_Innen_{gname}.zip')
    with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
        for r, _, fs in os.walk(stage):
            for f in fs:
                p = os.path.join(r, f); z.write(p, os.path.relpath(p, stage))
    shutil.rmtree(stage); print(zp, round(os.path.getsize(zp) / 1e6, 1), 'MB')
