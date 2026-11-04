"""
Builds ZIPs with prompts for the interiors of the expansion districts (tools/build_expansion.py): per room a room picture + a furniture sheet,
using the same templates as the earlier interior packs. Run: python3 tools/make_interiors_expansion_zip.py <output_dir>
"""
import os, shutil, sys, zipfile
sys.path.insert(0, os.path.dirname(__file__))
import make_region5_zip as k5

ROOM_T, FUR_T, STYLE, SHEETS = k5.ROOM_T, k5.FUR_T, k5.STYLE, k5.SHEETS
REFS = [STYLE, 'room_cafe_v2.webp', 'hm_chars_main.webp']

# (folder, title, W, H, door, middle, room, pieces)
GROUPS = {
 'Erweiterung_A_Hinomori_Tal_Yukimi': [
  ('1_Hinomori_Baeckerei', 'Hinomori arcade bakery (Misaki)', 12, 10, 1, 'columns 2–9, rows 4–7',
   'A small, cosy family bakery in an old shopping arcade: warm wooden floor, a glass display counter across the back with trays of bread, melon buns and sandwiches, a big stone oven glowing behind it, flour sacks and a kneading table on the left wall, shelves with paper bags and jam jars on the right wall, a chalkboard (no readable text), morning light through the shop window.',
   'a small round table with two stools (2×1); a basket of baguettes (1×1); a stack of flour sacks (1×1); a wooden bread rack on wheels (1×1); a potted plant (1×1)'),
  ('2_Hinomori_Krankenhaus', 'City hospital night ward hallway (nurse Chihiro)', 14, 11, 2, 'columns 2–11, rows 4–8',
   'A quiet hospital ward at night: pale green linoleum floor, a nurses\' station counter at the back with a desk lamp, a monitor and a clipboard rack, a window with a night sky and city lights, a row of waiting chairs on the left wall, a medicine cart and an IV stand on the right wall, soft blue night light, a small vending machine.',
   'a row of three waiting chairs (2×1); a medicine cart (1×1); an IV drip stand (1×1); a wheelchair (1×1); a potted plant (1×1); a water dispenser (1×1)'),
  ('3_Tal_Schulcafe', 'Old branch school turned café (Risa)', 14, 11, 2, 'columns 2–11, rows 4–8',
   'A former one-room wooden village school turned into a café: old wooden floorboards, a big green blackboard on the back wall with chalk drawings (no readable text), a café counter with a coffee machine where the teacher\'s desk used to be, tall windows with rice terraces outside, old school desks used as café tables, a bookshelf with picture books, plants in old school buckets.',
   'an old school desk with two small chairs (2×1); a wooden school chair (1×1); a basket of vegetables from the village (1×1); a coat stand (1×1); a potted plant in a tin bucket (1×1); a small stove (1×1)'),
  ('4_Tal_Sakebrauerei', 'Sake brewery (brewmaster Genzō)', 14, 11, 2, 'columns 2–11, rows 4–8',
   'Inside a traditional sake brewery: dark wooden beams, a stone floor, huge wooden fermentation tanks along the back wall with wooden ladders, steam rising from a rice steamer on the left, a shelf with ceramic sake bottles and cups, a cedar ball (sugidama) hanging by the door, sacks of rice, warm lamp light.',
   'a large wooden barrel (1×1); a rice steamer with steam (1×1); a stack of rice sacks (1×1); a tasting table with cups (2×1); a wooden paddle rack (1×1)'),
  ('5_Yukimi_Pension', 'Family guesthouse in the snow (Sachiko)', 14, 11, 2, 'columns 2–11, rows 4–8',
   'The common room of a small family guesthouse in a snowy mountain village: dark wooden floor, a sunken hearth (irori) with a hanging kettle in the middle area, a raised tatami area along the back wall with folded futons, a window with snow falling, a shoe shelf and a guest book on the left, a wood stove and stacked firewood on the right, warm lantern light.',
   'a low dining table with cushions (2×1); a stack of folded futons (1×1); a wood-burning stove (1×1); a basket of firewood (1×1); a pair of snow boots on a mat (1×1); a potted pine (1×1)'),
  ('6_Yukimi_Museum', 'Local history museum in an old storehouse (Fumiko)', 14, 11, 2, 'columns 2–11, rows 4–8',
   'A small local history museum inside an old storehouse (kura): thick white plaster walls, dark beams, a wooden floor, glass display cases along the back wall with old tools, straw snow boots and an old diary, a big old photo of the village in snow on the wall (no readable text), a reception desk on the left, a wooden sledge on the right wall, soft lamps.',
   'a glass display case (2×1); a pair of straw snow boots on a stand (1×1); an old wooden sledge (2×1); a bench (2×1); a standing info board (1×1)'),
 ],
 'Erweiterung_B_Shiomi_Kyoto': [
  ('7_Shiomi_Werft', 'Island boat workshop (shipwright Tetsuo)', 14, 11, 2, 'columns 2–11, rows 4–8',
   'Inside a small wooden boat workshop by the sea: wooden plank floor with sawdust, a half-built wooden boat on trestles in the middle area, tools hanging on the back wall (saws, planes, chisels), a workbench with a vice on the left, coiled ropes and buckets of tar on the right, a big open door with the sea behind it, warm light.',
   'a half-built small wooden boat on trestles (3×2); a workbench (2×1); a coil of rope (1×1); a bucket of tar (1×1); a stack of planks (2×1); a sawhorse (1×1)'),
  ('8_Shiomi_Pension', 'Island guesthouse (Yumi)', 13, 10, 1, 'columns 2–10, rows 5–7',
   'The dining room of a small island guesthouse: light wooden floor, a sea-blue noren to the kitchen at the back, a counter with a rice cooker and bowls, a window with the harbour and boats, potted plants and seashells on a shelf, a low table with cushions, a calendar with a fish picture (no readable text).',
   'a low table with cushions and a fish dish (2×1); a basket of summer oranges (1×1); a potted plant (1×1); a shell collection on a small shelf (1×1); a fan on a stand (1×1)'),
  ('9_Kyoto_Antiquariat', 'Second-hand bookshop (Ichirō)', 12, 10, 1, 'columns 2–9, rows 4–7',
   'A narrow, crowded second-hand bookshop: dark wooden floor, floor-to-ceiling bookshelves on the back and side walls, piles of old books everywhere, a small cash desk on the left with an old lamp and a feather duster, a ladder, a cat sleeping on a pile of books, warm yellow light, dust in the light.',
   'a pile of old books (1×1); a free-standing bookshelf (2×1); a small step ladder (1×1); a reading stool (1×1); a cardboard box of books (1×1)'),
  ('10_Kyoto_Unibibliothek', 'Old university library reading room (Haruka)', 14, 11, 2, 'columns 2–11, rows 4–8',
   'The reading room of an old university library: polished wooden floor, tall arched windows with autumn light on the back wall, long wooden reading tables with green lamps, tall bookshelves on the side walls with rolling ladders, a return desk on the left with a stack of returned books and a card catalogue, a big clock.',
   'a long reading table with two green lamps (3×1); a wooden chair in four directions (1×1); a rolling book cart (1×1); a card catalogue cabinet (1×1); a globe on a stand (1×1); a potted plant (1×1)'),
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
