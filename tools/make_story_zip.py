"""
ZIPs with prompts for new story pictures (CGs): chapter title banners, the key moment of each chapter, the heart
talks with friends, dreams about K and seasonal evenings at home. One folder per picture with the prompt, a short
German instruction and the reference images: a finished CG for the style, the heroine with her fox (and K), the
portraits of the people in the scene and the place as it looks in the game.

  python3 tools/make_story_zip.py <out dir> <dir with in-game screenshots town_<map>.png>
"""
import os
import shutil
import sys
import zipfile

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'public', 'assets')

WIDE = (1344, 756)
BANNER = (1672, 466)

PEOPLE = {
    'hero': ('the heroine', 'a young woman in her twenties, long wavy brown hair, pink baseball cap, pink jacket, jeans, pink sneakers, a brown leather satchel; a cream scarf when it is cold'),
    'kotone': ('K (Kotone)', 'a calm woman around thirty, dark wavy shoulder-length hair, cream scarf, long dark-green coat, always carries a worn leather notebook; her face stays partly hidden in mysterious scenes'),
    'mori': ('Ms. Mori', 'the kind elderly landlady of the heroine'),
    'kaede': ('Kaede', 'the young owner of Café Kotonoha'),
    'haruto': ('Haruto', 'a cheerful young convenience-store clerk who dreams of being a cook'),
    'aoi': ('Aoi', 'a university student preparing for job interviews'),
    'sato': ('Mr. Satō', 'a retired teacher who spends his days in the town library'),
    'okami': ('Okami-san', 'the graceful owner of an old hot-spring inn, in kimono'),
    'tsuru': ('Grandma Tsuru', 'an old woman who runs a guesthouse in the snowy mountain village'),
    'gen': ('Gen-san', 'an old, weathered fisherman'),
    'nagisa': ('Nagisa', 'a young woman working at the harbour tourist office'),
    'matsuo': ('Ms. Matsuo', 'the elegant host of a machiya guesthouse in Kyoto'),
    'okan': ('Okan', 'a loud, warm-hearted Osaka takoyaki shop owner'),
    'kenta': ('Kenta', 'a nervous new office worker in a suit'),
    'haru': ('Haru', 'a young freelancer from Hokkaido living in Tokyo'),
    'yoshie': ('Yoshie-san', 'the old owner of a fifty-year-old coffee house'),
    'priya': ('Priya', 'an IT engineer from India working in Tokyo'),
    'hayashi': ('Mr. Hayashi', 'an old peach farmer'),
    'sakura': ('Sakura', 'his granddaughter, a lively teenager'),
    'hina': ('Hina', 'a girl from the snow village'),
    'jokan': ('Jōkan-oshō', 'the old head priest of the mountain temple'),
    'kaito': ('Kaito', 'a boy from the harbour town'),
    'kirishima': ('Dr. Kirishima', 'the researcher of Kotodama'),
}

STYLE = """Style: exactly like image 1 — detailed painterly anime pixel art, cinematic warm light and soft glow, rich colours, gentle Studio-Ghibli-like mood, slightly three-quarter view. No text, no letters, no speech bubbles, no UI, no watermark, no border (signs may show only blurred, unreadable glyph shapes)."""

FOX = 'Yukitsune, her fox companion: a small white fluffy fox spirit with pale blue ear tips and big blue eyes, softly glowing (image 2).'

# name, size, title (German), scene, people, style CG, place screenshot (map or room id) or None
SCENES = {
    'A_Kapitel': [
        ('cg_chapter3', BANNER, 'Kapitel 3 Titelbild — Yukimi', 'A wide panoramic chapter title picture: the heroine and her fox seen from behind, walking up a snowy mountain road at blue dusk towards Yukimi, a small village of thatched gassho houses with warm windows, snow lanterns glowing along the road, falling snow, mountains behind. Keep the left third calm (sky and snow): the game shows the chapter title there.', ['hero'], 'cg_chapter2', 'mountain'),
        ('cg_chapter4', BANNER, 'Kapitel 4 Titelbild — Shiomi', 'A wide panoramic chapter title picture: a small local train running along the coast of the Inland Sea in the early morning, the heroine looking out of the open window with her fox, small islands in the glittering sea, a white lighthouse on a far cliff. Keep the left third calm (sea and sky).', ['hero'], 'cg_chapter2', 'harbor'),
        ('cg_chapter5', BANNER, 'Kapitel 5 Titelbild — Kyoto', 'A wide panoramic chapter title picture: the heroine and her fox at the top of a narrow stone-paved slope in old Kyoto at sunset, wooden machiya houses on both sides, a five-storey pagoda against an orange sky, autumn maple leaves, paper lanterns lighting up. Keep the left third calm (sky).', ['hero'], 'cg_chapter2', 'k_gion'),
        ('cg_chapter6', BANNER, 'Kapitel 6 Titelbild — Osaka', 'A wide panoramic chapter title picture: the heroine and her fox on a bridge over the Dotonbori canal at night, a riot of neon signs and giant food signboards (octopus, crab, puffer fish) reflected in the water, crowds and food stalls, lively and bright. Keep the left third a little calmer (dark water and sky).', ['hero'], 'cg_chapter2', 'o_dotonbori'),
        ('cg_chapter7', BANNER, 'Kapitel 7 Titelbild — Tokyo', 'A wide panoramic chapter title picture: the Tokyo skyline at blue hour seen across the Sumida river, a tall broadcasting tower, a steel bridge with lights, the heroine and her fox on the riverside promenade, the first city lights reflected in the water, calm and a little lonely. Keep the left third calm (sky).', ['hero'], 'cg_chapter2', 't_sumida'),
        ('cg_forgotten_name', WIDE, 'Kapitel 2 — Der vergessene Name', 'In front of the small apartment house in Hinomori on a spring afternoon, Ms. Mori looks at the heroine with a kind but confused smile: she cannot remember her name. Between them, the letters of a name written on a paper slip are dissolving into small glowing particles that drift away. The heroine looks shocked, the fox presses against her leg. Bittersweet, quiet.', ['hero', 'mori'], 'cg_kyoto_tea', 'town'),
        ('cg_peach_harvest', WIDE, 'Kapitel 2 — Pfirsichernte', 'A sunny peach orchard on the terraces of Hinomori valley in summer: old Mr. Hayashi on a wooden ladder hands down ripe peaches, his granddaughter Sakura laughs with a full basket, the heroine carries a wooden crate of peaches, the fox chases a falling peach. Warm golden light, cicadas mood, joyful.', ['hero', 'hayashi', 'sakura'], 'cg_valley_onsen', 'valley'),
        ('cg_farewell_platform', WIDE, 'Abschied am Bahnsteig von Hinomori', 'The small platform of Hinomori station: the heroine leans out of the window of a departing local train, her fox on her shoulder, waving. On the platform Ms. Mori, Kaede and Haruto wave back, cherry blossom petals blowing across the tracks, soft morning light. Emotional but hopeful.', ['hero', 'mori', 'kaede', 'haruto'], 'cg_arrival', 'town'),
        ('cg_fading_kanji', WIDE, 'Kapitel 3 — Verblassende Schriftzeichen', 'A snowy street of Yukimi village at dusk: on wooden signboards, shop curtains and a sign at a kamakura (snow hut), the written characters peel off and turn into snowflakes that blow away, leaving blank spaces. Hina points at the empty sign, the heroine stares in shock, the fox growls softly at the drifting glyph-flakes. Mysterious, cold blue light with warm windows.', ['hero', 'hina'], 'cg_mountain_festival', 'mountain'),
        ('cg_temple_letter', WIDE, 'Kapitel 3 — Der versiegelte Brief', 'Inside the old mountain temple at night, by candlelight: the old head priest Jōkan-oshō breaks a red wax seal on a letter with great care, Grandma Tsuru kneels beside the heroine on the tatami, everyone leans in, the fox watches with glowing eyes, incense smoke, snow outside the paper doors. Solemn, warm, a moment of revelation.', ['hero', 'jokan', 'tsuru'], 'cg_mountain_hearth', 'berg_tempel'),
        ('cg_harbor_shell', WIDE, 'Kapitel 4 — Die Muschel', 'On the beach of Shiomi at sunset, the boy Kaito holds a large spiral shell to the heroine’s ear; faint glowing musical notes drift out of the shell over the waves. The fox tilts its head, listening. Pastel orange and violet sky, gentle waves, tide pools.', ['hero', 'kaito'], 'cg_harbor_song', 'harbor'),
        ('cg_nishiki_sign', WIDE, 'Kapitel 5 — Das laute Schild', 'Inside the covered Nishiki Market arcade in Kyoto, busy and colourful: a signboard Kotodama has come alive, a creature made of many overlapping shop signs and arrows in different scripts, buzzing and flashing; shoppers cover their ears. The heroine steps forward calmly with one hand raised, the fox at her side glowing, and the creature starts to quiet down. Dynamic but friendly.', ['hero'], 'cg_kyoto_tea', 'k_nishiki'),
        ('cg_osaka_office', WIDE, 'Kapitel 6 — Kentas erster Anruf', 'An open-plan office high in an Umeda tower in Osaka, city view through the windows: Kenta, the nervous new employee in a suit, holds the phone with both hands and sweats, the heroine beside him holds up a small memo with a polite phrase, the fox peeks from behind a monitor. Colleagues in the background. Light-hearted, a little comic.', ['hero', 'kenta'], 'cg_osaka_takoyaki', 'buero'),
        ('cg_osaka_lantern', WIDE, 'Kapitel 6 — Die müde Laterne', 'A narrow food alley in Dotonbori at night: a worn-out paper lantern Kotodama with a tired face floats above the takoyaki stalls, its light flickering and pale, its paper torn. Okan watches from her takoyaki stall with a worried look, the heroine gently reaches out to it, the fox’s glow warms the lantern back up. Neon colours, steam from the grills, tender mood.', ['hero', 'okan'], 'cg_osaka_takoyaki', 'o_dotonbori'),
        ('cg_asakusa_coffee', WIDE, 'Kapitel 7 — Das alte Kissaten', 'Inside an old coffee house (kissaten) in Asakusa, dark wood, red velvet seats, a jukebox, warm lamps: Yoshie-san pours siphon coffee behind the counter while the heroine at the counter opens a yellowed letter from K; dried pressed flowers fall out of it. The fox curls up on the next stool. Nostalgic, warm, quiet.', ['hero', 'yoshie'], 'cg_tokyo_radio', 'kissaten'),
        ('cg_shinjuku_alley', WIDE, 'Kapitel 7 — Das ungehörte Kotodama', 'A narrow yokocho alley in Shinjuku at night, red lanterns, tiny bars, tired commuters passing by without looking: a faint ghostly Kotodama made of overlapping empty speech-bubble shapes sits curled up between the crates. The heroine kneels down to it and listens, the fox lights the scene softly. Rainy reflections, quiet compassion in a busy city.', ['hero'], 'cg_tokyo_radio', 'yokocho'),
    ],
    'B_Herz': [
        ('cg_heart_mori', WIDE, 'Herz — Frau Mori', 'In front of the apartment house in the evening, Ms. Mori stands at the door with a warm smile as the heroine comes home with shopping bags, saying “welcome home”; warm light from the doorway, the fox runs ahead. Cozy, like coming home.', ['hero', 'mori'], 'cg_letter', 'town'),
        ('cg_heart_kaede', WIDE, 'Herz — Kaede', 'In Café Kotonoha after closing time, Kaede proudly sets a new homemade cake in front of the heroine at the counter, an old photo of her mother on the shelf behind. Soft lamp light, coffee steam.', ['hero', 'kaede'], 'cg_kyoto_tea', 'cafe'),
        ('cg_heart_haruto', WIDE, 'Herz — Haruto', 'Behind the convenience store at night, Haruto in his uniform sits on a crate and hands the heroine an oversized homemade rice ball, grinning; the store light spills out, the fox sniffs at the rice ball. Friendly and funny.', ['hero', 'haruto'], 'cg_letter', 'konbini'),
        ('cg_heart_aoi', WIDE, 'Herz — Aoi', 'In Café Kotonoha, Aoi in a job-interview suit practises bowing in front of the heroine, who plays the interviewer with a serious face over a notebook; both trying not to laugh. Bright afternoon light.', ['hero', 'aoi'], 'cg_kyoto_tea', 'cafe'),
        ('cg_heart_sato', WIDE, 'Herz — Herr Satō', 'In the quiet town library, old Mr. Satō hands the heroine an old pressed-flower bookmark between tall shelves, sunbeams with floating dust, the fox asleep on a stack of books.', ['hero', 'sato'], 'cg_letter', 'library'),
        ('cg_heart_okami', WIDE, 'Herz — Okami-san', 'At the entrance of the old hot-spring inn at dusk, Okami-san in kimono bows deeply to welcome the heroine back, lanterns glowing, steam rising from the onsen behind. Graceful and warm.', ['hero', 'okami'], 'cg_valley_onsen', 'ryokan'),
        ('cg_heart_tsuru', WIDE, 'Herz — Oma Tsuru', 'Around the sunken irori hearth in Grandma Tsuru’s guesthouse on a snowy night, Tsuru grills oyaki and tells old stories, glowing words like snowflakes rising from the fire; the heroine listens wrapped in a blanket, the fox asleep. Very cozy.', ['hero', 'tsuru'], 'cg_mountain_hearth', 'tsuru'),
        ('cg_heart_gen', WIDE, 'Herz — Gen-san', 'On the east pier of Shiomi at sunset, old Gen-san grills squid on a small charcoal brazier and hands one to the heroine, fishing boats bobbing, seagulls, the fox eyeing the squid.', ['hero', 'gen'], 'cg_harbor_song', 'harbor'),
        ('cg_heart_nagisa', WIDE, 'Herz — Nagisa', 'On a viewpoint above the harbour town at golden hour, Nagisa and the heroine sit on a bench looking at the sea and the far-away train line, Nagisa holding a university brochure, thoughtful but smiling.', ['hero', 'nagisa'], 'cg_harbor_lighthouse', 'harbor'),
        ('cg_heart_matsuo', WIDE, 'Herz — Frau Matsuo', 'In the machiya guesthouse in Kyoto, Ms. Matsuo serves the heroine a bowl of ochazuke (tea over rice) on a low table, a small inner garden with a stone lantern seen through the open sliding doors, evening light.', ['hero', 'matsuo'], 'cg_kyoto_tea', 'machiya'),
        ('cg_heart_okan', WIDE, 'Herz — Okan', 'In front of the takoyaki shop in Dotonbori, Okan laughs loudly and pushes a huge okonomiyaki in a box into the heroine’s hands, neon lights, steam, passers-by smiling. Loud, warm, Osaka energy.', ['hero', 'okan'], 'cg_osaka_takoyaki', 'takoladen'),
        ('cg_heart_kenta', WIDE, 'Herz — Kenta', 'On the rooftop of the Umeda office tower at sunset, Kenta loosens his tie and clinks a can of energy drink against the heroine’s can, proud and relieved, Osaka skyline behind.', ['hero', 'kenta'], 'cg_osaka_castle', 'buero'),
        ('cg_heart_haru', WIDE, 'Herz — Haru', 'In the Shibuya game centre, Haru and the heroine laugh together at a claw machine, a small plush fox in the claw, colourful arcade lights.', ['hero', 'haru'], 'cg_tokyo_radio', 'gamecenter'),
        ('cg_heart_yoshie', WIDE, 'Herz — Yoshie-san', 'In the old kissaten in Asakusa on a rainy afternoon, Yoshie-san warms coffee cups with her hands and smiles at the heroine at the counter, rain on the window, an old jukebox glowing.', ['hero', 'yoshie'], 'cg_tokyo_radio', 'kissaten'),
        ('cg_heart_priya', WIDE, 'Herz — Priya', 'In front of a glass office building near the Shibuya fountain square in the evening, Priya, laptop bag on her shoulder, gives the heroine an excited high five after her first meeting in Japanese, city lights coming on.', ['hero', 'priya'], 'cg_tokyo_river', 't_shibuya'),
    ],
    'C_Traeume_Jahreszeiten': [
        ('cg_dream_letters', WIDE, 'Traum 1 — Briefe ohne Absender', 'A dream: an endless library floating in a starry night sky, hundreds of unsent letters fly like birds between the shelves, far away a woman with a notebook (K) writes at a desk and only the letter “K” on an envelope glows. The heroine stands on a floating staircase in her pyjamas, reaching out. Dreamy, blue and gold, soft blur.', ['hero', 'kotone'], 'cg_chapter2', None),
        ('cg_dream_snow', WIDE, 'Traum 2 — Schnee aus Schriftzeichen', 'A dream: a silent white field at night where glowing kanji-like glyphs fall like snow and melt when they touch the ground; Yukitsune the fox, larger and shining, walks ahead and leaves footprints of light, K’s silhouette waits at the horizon. Dreamy, silver and pale blue.', ['hero', 'kotone'], 'cg_mountain_festival', None),
        ('cg_dream_sea', WIDE, 'Traum 3 — Das Meer der Lieder', 'A dream: the heroine floats underwater in a calm, glowing sea, schools of fish made of musical notes swim around her, the beam of a lighthouse cuts down through the water, far above K stands on a cliff looking down. Dreamy, turquoise and gold.', ['hero', 'kotone'], 'cg_harbor_song', None),
        ('cg_dream_gates', WIDE, 'Traum 4 — Tore in die Stadt', 'A dream: an endless corridor of red torii gates that slowly turns into neon city streets and railway tracks; K walks ahead and looks back over her shoulder, her face hidden by her scarf and the light; the heroine and the fox run after her. Dreamy, red and violet.', ['hero', 'kotone'], 'cg_kyoto_fushimi', None),
        ('cg_dream_tree', WIDE, 'Traum 5 — Der Baum aus Worten', 'A dream at blue hour: a giant tree whose leaves are small glowing paper slips with words (kotonoha, “leaves of words”) stands above a city river; leaves drift down like lights; under the tree K finally turns around with a gentle smile, holding her open notebook. The heroine and the fox stand in front of her. Hopeful, magical.', ['hero', 'kotone'], 'cg_tokyo_river', None),
        ('cg_season_spring', WIDE, 'Jahreszeit — Frühling zu Hause', 'The heroine’s small apartment in Hinomori on a spring morning: she studies at her desk by the open window, cherry blossom petals blow in onto her notebook and vocabulary cards, the fox naps in a sunbeam. Fresh, light, pastel.', ['hero'], 'cg_letter', 'apartment'),
        ('cg_season_summer', WIDE, 'Jahreszeit — Sommerabend', 'A summer night on the small balcony of the apartment: the heroine in a yukata with a hand fan watches fireworks over Hinomori, a wind chime (furin) above her, a slice of watermelon on a plate, the fox staring at the fireworks with wide eyes.', ['hero'], 'cg_valley_onsen', 'apartment'),
        ('cg_season_autumn', WIDE, 'Jahreszeit — Herbstregen', 'A rainy autumn evening in the apartment: the heroine reads a Japanese book with a cup of tea under a warm desk lamp, red maple leaves stuck on the rainy window, the fox curled in a cushion. Calm, warm, orange and grey.', ['hero'], 'cg_kyoto_tea', 'apartment'),
        ('cg_season_winter', WIDE, 'Jahreszeit — Winter am Kotatsu', 'A snowy winter night in the apartment: the heroine sits under a kotatsu with mandarins and a mug of hot cocoa, vocabulary cards spread on the table, snow falling outside the window, the fox asleep half under the kotatsu blanket. Very cozy.', ['hero'], 'cg_mountain_hearth', 'apartment'),
    ],
}

PROMPT = """Create ONE story illustration (CG) for a cozy Japanese-learning RPG, exactly {w} x {h} pixels, {shape}.

{style}

Scene: {scene}

People (keep their look exactly as in the references):
{people}
- {fox}

{place}Image 2 shows the heroine and her fox (and, further away, the woman K in the green coat) in the finished style. Image 3 shows the portraits of the people in this scene, with their names below.

Output: ONE image, exactly {w} x {h} pixels. If your tool cannot make this exact size, make it in the same aspect ratio ({ratio}); it will be resized.
"""

ANL = """Alle Bilder dieses Ordners zusammen mit dem Text aus PROMPT.txt in EINE Nachricht an GPT.
Ergebnis speichern als: {name}.png ({w} x {h}, oder gleiches Seitenverhältnis — ich passe die Größe an).
Szene: {title}
Wenn die Figuren nicht wie in den Porträts aussehen, nochmal mit dem Zusatz: "Keep every person exactly as in image 3 (hair, clothes, colours) and the heroine exactly as in image 2."
Wenn Text oder Buchstaben im Bild auftauchen: "No text or letters anywhere in the image."
"""


def portrait(pid):
    for name in (f'portrait_{pid}_neutral.png', f'portrait_{pid}.png'):
        p = os.path.join(A, name)
        if os.path.exists(p):
            return Image.open(p).convert('RGBA')
    return None


def people_sheet(ids):
    imgs = [(pid, portrait(pid)) for pid in ids]
    imgs = [(pid, im) for pid, im in imgs if im]
    S = 4
    cell = max(max(im.width, im.height) for _, im in imgs) * S
    sheet = Image.new('RGB', (cell * len(imgs) + 20 * (len(imgs) + 1), cell + 70), (245, 238, 225))
    d = ImageDraw.Draw(sheet)
    for i, (pid, im) in enumerate(imgs):
        big = im.resize((im.width * S, im.height * S), Image.NEAREST)
        x = 20 + i * (cell + 20)
        sheet.paste(big, (x + (cell - big.width) // 2, 10 + cell - big.height), big)
        d.text((x + 6, cell + 22), PEOPLE[pid][0], fill=(60, 40, 30))
    return sheet


def main():
    out, shots = sys.argv[1], sys.argv[2]
    os.makedirs(out, exist_ok=True)
    for pack, scenes in SCENES.items():
        stage = os.path.join(out, '_stage_' + pack)
        shutil.rmtree(stage, ignore_errors=True)
        for n, (name, (w, h), title, scene, ids, style, place) in enumerate(scenes, 1):
            d = os.path.join(stage, f'{n:02d}_{name}')
            os.makedirs(d)
            Image.open(os.path.join(A, style + '.webp')).convert('RGB').save(os.path.join(d, f'1_stil_{style}.jpg'), quality=88)
            Image.open(os.path.join(A, 'cg_kyoto_fushimi.webp')).convert('RGB').save(os.path.join(d, '2_heldin_fuchs_K.jpg'), quality=88)
            people_sheet(ids).save(os.path.join(d, '3_figuren.png'))
            place_txt = ''
            if place:
                Image.open(os.path.join(shots, f'town_{place}.png')).convert('RGB').save(os.path.join(d, '4_ort_im_spiel.jpg'), quality=85)
                place_txt = 'Image 4 shows the place as it looks in the game, seen from above: draw the same place (its buildings, colours and details) from eye level as a cinematic scene, not from above.\n'
            people = '\n'.join(f'- {PEOPLE[p][0]}: {PEOPLE[p][1]}' + (' (image 2 and image 3)' if p in ('hero', 'kotone') else ' (image 3)') for p in ids)
            banner = (w, h) == BANNER
            open(os.path.join(d, 'PROMPT.txt'), 'w').write(PROMPT.format(
                w=w, h=h, shape='a very wide panoramic banner' if banner else 'landscape 16:9', style=STYLE, scene=scene, people=people, fox=FOX,
                place=place_txt, ratio='about 3.6 : 1' if banner else '16 : 9'))
            open(os.path.join(d, 'ANLEITUNG.txt'), 'w').write(ANL.format(name=name, w=w, h=h, title=title))
        zp = os.path.join(out, f'Kotodama_Story_{pack}.zip')
        with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
            for r, _, fs in os.walk(stage):
                for f in sorted(fs):
                    p = os.path.join(r, f)
                    z.write(p, os.path.relpath(p, stage))
        shutil.rmtree(stage)
        print(zp, len(scenes), 'pictures', round(os.path.getsize(zp) / 1e6, 1), 'MB')


if __name__ == '__main__':
    main()
