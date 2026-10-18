"""Data for the sixteen new interiors (tools/build_new_rooms.py turns it into assets and src/content/rooms2.gen.ts).

Coordinates are tiles of the 32 px game grid. Every room picture has the same frame (see art/PROMPTS_INTERIORS_2_4.md):
rows 0-2 back wall, row 3 the counter / shelf line you talk across, rows 4..H-2 floor, columns 0-1 and W-2..W-1 side walls,
bottom row = wall with the entrance gap.

furniture: (name, piece_no, x, y, w, h, tw, script)
    piece_no  number in the contact sheet of art/furniture/<id>/ (tools/cut_new_furniture.py)
    x, y, w, h  footprint (top-left tile and size in tiles)
    tw        width of the sprite in tiles
    script    key of the text below, or None for plain decoration
spots: (name, x, y, w, h, script)  invisible interaction areas for the painted wall things
text: script key -> (japanese with {kanji|reading}, english)
npc: (id, x, y, facing) standing behind the counter (row 2) and talking across row 3
"""

# the shopkeepers: a new id each, borrowing the look of a character the game already has
NPCS = {
    'wagashi_ten': ('和菓子屋の店主', 'Wagashi shop owner', 'sumie', '#9b6b7a'),
    'teestand_oyaji': ('茶屋の主人', 'Tea-stand master', 'gen', '#7a5a3a'),
    'kaufhaus_ten': ('売り場の店員', 'Shop assistant', 'matsuo', '#c06a7a'),
    'kino_shihainin': ('映画館の支配人', 'Cinema manager', 'fujita', '#7a2a2a'),
    'museum_gakugei': ('学芸員', 'Museum curator', 'umino', '#4a4a66'),
    'koban_omawari': ('お巡りさん', 'Police officer', 'porter', '#2f3f6a'),
    'karaoke_uketsuke': ('受付のお姉さん', 'Karaoke receptionist', 'hamada', '#c0394a'),
    'books_shuijin': ('本屋の店主', 'Bookshop owner', 'kenji', '#3a6a4a'),
    'souvenir_okami': ('お土産屋のおかみさん', 'Souvenir shop owner', 'okan', '#d06a8a'),
    'share_resident': ('シェアハウスの住人', 'Share-house resident', 'minh', '#3a7fc0'),
    'deck_staff': ('展望台の係員', 'Observation-deck attendant', 'fujii', '#2f4a7a'),
    'farm_obaa': ('農家のおばあさん', 'Farmhouse grandmother', 'yoshie', '#6a8a4a'),
    'winery_master': ('ワイン職人', 'Winemaker', 'sakamoto', '#7a2a4a'),
    'diner_okami': ('食堂のおかみさん', 'Diner owner', 'tachibana', '#3a7a8a'),
    'harbor_chief': ('港の所長', 'Harbour master', 'yamamoto', '#2a4a7a'),
    'temple_priest': ('お坊さん', 'Priest', 'jokan', '#7a5a2a'),
}

ROOMS = {
    # ------------------------------------------------------------------ Kyoto
    'kyoto_wagashi': dict(
        size=(12, 10), name='Wagashi shop', nameJa='和菓子の店',
        ext=('k_kamo', [(10, 21), (11, 21)], (10, 22, 'down')),
        npc=('wagashi_ten', 6, 2, 'down'),
        furniture=[
            ('table', 0, 4, 6, 3, 1, 3.2, 'wagashi_table'),
            ('basket', 6, 9, 6, 1, 1, 1.0, None),
            ('lamp', 10, 3, 4, 1, 1, 0.8, None),
            ('bonsai', 14, 2, 7, 1, 1, 1.2, 'wagashi_bonsai'),
            ('gifts', 18, 8, 4, 1, 1, 1.1, None),
        ],
        spots=[('case', 3, 2, 6, 2, 'wagashi_case'), ('tea', 1, 4, 1, 4, 'wagashi_tea'), ('gift_shelf', 10, 4, 1, 2, 'wagashi_gift_shelf')],
    ),
    'kyoto_fushimi_teestand': dict(
        size=(12, 10), name='Fushimi tea stand', nameJa='伏見の茶屋',
        ext=('k_fushimi', [(12, 19), (13, 19)], (12, 20, 'down')),
        npc=('teestand_oyaji', 5, 2, 'down'),
        furniture=[
            ('bench', 0, 4, 6, 3, 1, 3.0, 'teestand_bench'),
            ('brazier', 1, 8, 5, 1, 1, 1.1, 'teestand_brazier'),
            ('bowls', 2, 2, 7, 1, 1, 1.0, None),
            ('fox', 3, 9, 7, 1, 1, 1.0, 'teestand_fox'),
            ('bamboo', 4, 2, 4, 1, 1, 1.1, None),
        ],
        spots=[('counter', 2, 2, 8, 2, 'teestand_counter'), ('window', 3, 1, 3, 1, 'teestand_window'), ('foxes', 7, 1, 3, 2, 'teestand_foxes')],
    ),
    # ------------------------------------------------------------------ Osaka
    'osaka_kaufhaus': dict(
        size=(14, 11), name='Umeda department store', nameJa='梅田のデパート',
        ext=('o_umeda', [(33, 14), (34, 14)], (33, 15, 'down')),
        npc=('kaufhaus_ten', 8, 2, 'down'),
        furniture=[
            ('scarves', 8, 5, 5, 3, 1, 3.2, 'kaufhaus_scarves'),
            ('rack', 0, 9, 7, 1, 1, 1.2, None),
            ('mannequin', 4, 4, 6, 1, 1, 0.9, 'kaufhaus_mannequin'),
            ('baskets', 10, 10, 5, 1, 1, 1.0, None),
            ('bench', 18, 6, 8, 3, 1, 3.2, None),
            ('plant', 14, 3, 8, 1, 1, 1.0, None),
        ],
        spots=[('cosmetics', 4, 2, 7, 2, 'kaufhaus_cosmetics'), ('escalator', 12, 4, 1, 4, 'kaufhaus_escalator'), ('clothes', 1, 4, 1, 3, 'kaufhaus_clothes')],
    ),
    'osaka_kino': dict(
        size=(13, 10), name='Shinsekai cinema', nameJa='新世界の映画館',
        ext=('o_shinsekai', [(11, 15), (12, 15)], (11, 16, 'down')),
        npc=('kino_shihainin', 5, 2, 'down'),
        furniture=[
            ('popcorn', 6, 9, 4, 1, 1, 1.5, 'kino_popcorn'),
            ('sofa', 10, 4, 6, 3, 1, 3.4, 'kino_sofa'),
            ('poster', 14, 2, 4, 1, 1, 1.3, 'kino_poster'),
            ('rope', 0, 9, 8, 2, 1, 2.2, None),
            ('plant', 18, 2, 7, 1, 1, 1.2, None),
        ],
        spots=[('ticket', 3, 2, 4, 2, 'kino_ticket'), ('film_posters', 1, 2, 2, 1, 'kino_film_posters'), ('lamp', 9, 2, 1, 1, 'kino_lamp')],
    ),
    'osaka_burg_museum': dict(
        size=(14, 11), name='Castle museum', nameJa='お城の資料館',
        ext=('o_castle', [(20, 10), (21, 10)], (20, 11, 'down')),
        npc=('museum_gakugei', 3, 2, 'down'),
        furniture=[
            ('case', 0, 5, 5, 3, 1, 3.0, 'museum_case'),
            ('armour', 6, 9, 5, 1, 1, 1.3, 'museum_armour'),
            ('screen', 12, 5, 7, 3, 1, 3.0, 'museum_screen'),
            ('bench', 18, 9, 7, 2, 1, 2.4, None),
        ],
        spots=[('armour_wall', 2, 2, 2, 2, 'museum_armour_wall'), ('desk', 1, 4, 1, 3, 'museum_desk'), ('banner', 6, 1, 4, 2, 'museum_banner')],
    ),
    # ------------------------------------------------------------------ Tokyo
    'tokyo_koban': dict(
        size=(12, 10), name='Police box', nameJa='交番',
        ext=('t_station', [(36, 13), (37, 13)], (36, 14, 'down')),
        npc=('koban_omawari', 6, 2, 'down'),
        furniture=[
            ('desk', 0, 4, 5, 3, 1, 3.0, 'koban_desk'),
            ('chair', 4, 5, 4, 1, 1, 0.9, None),
            ('umbrellas', 8, 9, 5, 1, 1, 0.8, 'koban_umbrellas'),
            ('cabinet', 9, 2, 6, 1, 1, 0.9, None),
            ('plant', 10, 9, 7, 1, 1, 1.0, None),
        ],
        spots=[('map', 3, 2, 3, 2, 'koban_map'), ('shelf', 7, 2, 3, 2, 'koban_shelf'), ('window', 1, 4, 1, 3, 'koban_window')],
    ),
    'tokyo_karaoke': dict(
        size=(13, 10), name='Karaoke lobby', nameJa='カラオケのロビー',
        ext=('t_shibuya', [(36, 21), (37, 21)], (36, 22, 'down')),
        npc=('karaoke_uketsuke', 6, 2, 'down'),
        furniture=[
            ('table', 0, 3, 6, 3, 1, 2.6, 'karaoke_table'),
            ('sofa', 4, 7, 6, 4, 1, 3.8, None),
            ('vending', 8, 10, 4, 1, 1, 1.0, 'karaoke_vending'),
            ('speaker', 12, 2, 4, 1, 1, 0.9, None),
            ('plant', 16, 10, 7, 1, 1, 1.0, None),
        ],
        spots=[('counter', 4, 2, 5, 2, 'karaoke_counter'), ('doors', 1, 4, 1, 4, 'karaoke_doors'), ('neon', 9, 1, 2, 2, 'karaoke_neon')],
    ),
    'tokyo_buchhandlung': dict(
        size=(14, 11), name='Bookshop', nameJa='本屋',
        ext=('t_shinjuku', [(11, 9), (12, 9)], (11, 10, 'down')),
        npc=('books_shuijin', 2, 2, 'down'),
        furniture=[
            ('shelf', 0, 9, 5, 2, 1, 2.2, 'books_shelf'),
            ('table', 2, 5, 7, 3, 1, 3.0, 'books_table'),
            ('armchair', 4, 3, 5, 1, 1, 1.3, 'books_armchair'),
            ('ladder', 6, 6, 4, 1, 1, 0.8, None),
            ('stack', 8, 10, 7, 1, 1, 1.0, None),
            ('plant', 10, 3, 8, 1, 1, 1.0, None),
        ],
        spots=[('wall_shelves', 5, 2, 6, 2, 'books_wall'), ('desk', 1, 3, 3, 1, 'books_desk'), ('side_shelf', 11, 4, 1, 4, 'books_side')],
    ),
    'tokyo_souvenirladen': dict(
        size=(13, 10), name='Souvenir shop', nameJa='お土産屋',
        ext=('t_asakusa', [(30, 12)], (29, 12, 'left')),
        npc=('souvenir_okami', 6, 2, 'down'),
        furniture=[
            ('cats', 0, 3, 5, 3, 1, 3.0, 'souvenir_cats'),
            ('postcards', 4, 9, 5, 1, 1, 1.0, 'souvenir_postcards'),
            ('daruma', 8, 5, 7, 1, 1, 0.9, 'souvenir_daruma'),
            ('fans', 12, 7, 7, 1, 1, 1.1, None),
            ('stool', 16, 4, 8, 1, 1, 0.7, None),
            ('plant', 20, 10, 8, 1, 1, 1.0, None),
        ],
        spots=[('shelves', 2, 2, 4, 2, 'souvenir_shelves'), ('counter', 6, 2, 4, 2, 'souvenir_counter'), ('postcard_wall', 11, 4, 1, 3, 'souvenir_wall')],
    ),
    'tokyo_wohnung': dict(
        size=(14, 11), name='Share house common room', nameJa='シェアハウスの居間',
        ext=('t_sumida', [(30, 6), (31, 6)], (30, 7, 'down')),
        npc=('share_resident', 8, 2, 'down'),
        furniture=[
            ('table', 0, 5, 6, 3, 2, 3.4, 'wohnung_table'),
            ('sofa', 4, 9, 6, 2, 1, 2.4, None),
            ('lamp', 8, 3, 4, 1, 1, 0.7, None),
            ('bike', 12, 10, 8, 1, 1, 1.6, 'wohnung_bike'),
            ('laundry', 16, 2, 8, 2, 1, 1.9, None),
            ('plant', 20, 11, 4, 1, 1, 1.0, None),
        ],
        spots=[('kitchen', 5, 2, 6, 2, 'wohnung_kitchen'), ('window', 2, 1, 3, 2, 'wohnung_window'), ('board', 11, 2, 2, 2, 'wohnung_board')],
    ),
    'tokyo_aussichtsdeck': dict(
        size=(14, 11), name='Observation deck', nameJa='展望台',
        ext=('t_shibuya', [(31, 10), (32, 10)], (31, 11, 'down')),
        npc=('deck_staff', 2, 4, 'right'),
        furniture=[
            ('telescope', 0, 7, 4, 1, 1, 1.1, 'deck_telescope'),
            ('bench', 4, 5, 8, 3, 1, 3.2, None),
            ('postcards', 8, 3, 6, 1, 1, 0.9, None),
            ('railing', 12, 10, 4, 2, 1, 2.4, None),
            ('plant', 16, 11, 7, 1, 1, 1.0, None),
        ],
        spots=[('windows', 3, 1, 8, 3, 'deck_windows'), ('souvenirs', 1, 4, 1, 4, 'deck_souvenirs'), ('compass', 6, 5, 2, 2, 'deck_compass')],
    ),
    # ------------------------------------------------------------------ villages
    'tal_bauernhaus': dict(
        size=(14, 11), name='Farmhouse', nameJa='農家の居間',
        ext=('valley', [(5, 4), (6, 4)], (6, 5, 'down')),
        npc=('farm_obaa', 5, 2, 'down'),
        furniture=[
            ('table', 0, 5, 6, 3, 1, 3.4, 'farm_table'),
            ('brazier', 4, 3, 5, 1, 1, 1.2, 'farm_brazier'),
            ('wheel', 8, 9, 5, 1, 1, 1.6, 'farm_wheel'),
            ('crates', 12, 10, 7, 1, 1, 1.3, None),
            ('plant', 15, 2, 7, 1, 1, 1.1, None),
            ('rocker', 19, 10, 5, 1, 1, 1.2, 'farm_rocker'),
        ],
        spots=[('stove', 4, 2, 5, 2, 'farm_stove'), ('altar', 1, 4, 1, 3, 'farm_altar'), ('herbs', 9, 2, 3, 2, 'farm_herbs')],
    ),
    'tal_weingut': dict(
        size=(14, 11), name='Winery tasting room', nameJa='ワイナリーの試飲室',
        ext=('valley', [(23, 12), (24, 12)], (23, 13, 'down')),
        npc=('winery_master', 5, 2, 'down'),
        furniture=[
            ('barrel_table', 16, 5, 6, 3, 1, 3.4, 'winery_barrel_table'),
            ('barrel', 4, 3, 5, 1, 1, 1.1, None),
            ('crates', 8, 10, 5, 1, 1, 1.1, None),
            ('press', 12, 9, 6, 1, 1, 1.4, 'winery_press'),
            ('barrel2', 4, 3, 7, 1, 1, 1.1, None),
        ],
        spots=[('tasting', 1, 4, 1, 4, 'winery_tasting'), ('barrels_back', 3, 2, 5, 2, 'winery_barrels'), ('bottles', 8, 2, 4, 2, 'winery_bottles')],
    ),
    'hafen_restaurant': dict(
        size=(13, 10), name='Harbour restaurant', nameJa='海辺の食堂',
        ext=('harbor', [(24, 12)], (23, 12, 'left')),
        npc=('diner_okami', 6, 2, 'down'),
        furniture=[
            ('table', 0, 3, 6, 3, 1, 3.0, 'diner_table'),
            ('fishtank', 4, 8, 5, 1, 1, 2.0, 'diner_fishtank'),
            ('crate', 8, 9, 7, 1, 1, 1.0, None),
            ('coats', 12, 2, 5, 1, 1, 0.9, 'diner_coats'),
            ('barrel', 16, 10, 5, 1, 1, 1.0, None),
            ('plant', 19, 10, 7, 1, 1, 1.0, None),
        ],
        spots=[('counter', 3, 2, 6, 2, 'diner_counter'), ('window', 9, 1, 3, 2, 'diner_window'), ('nets', 1, 4, 1, 3, 'diner_nets')],
    ),
    'hafen_amt': dict(
        size=(12, 10), name='Harbour office', nameJa='港の事務所',
        ext=('harbor', [(26, 14), (27, 14)], (26, 15, 'down')),
        npc=('harbor_chief', 6, 2, 'down'),
        furniture=[
            ('desk', 0, 4, 5, 4, 1, 3.6, 'amt_desk'),
            ('chair', 1, 5, 4, 1, 1, 0.9, None),
            ('cabinet', 5, 2, 6, 1, 1, 0.9, None),
            ('clock', 6, 9, 5, 1, 1, 0.8, 'amt_clock'),
            ('rope', 7, 8, 7, 1, 1, 1.1, None),
        ],
        spots=[('chart', 3, 2, 4, 2, 'amt_chart'), ('lifebuoy', 8, 2, 2, 2, 'amt_lifebuoy'), ('window', 1, 4, 1, 3, 'amt_window')],
    ),
    'berg_tempel': dict(
        size=(14, 11), name='Mountain temple hall', nameJa='山のお寺の本堂',
        ext=('mountain', [(20, 3)], (20, 4, 'down')),
        npc=('temple_priest', 7, 2, 'down'),
        furniture=[
            ('incense', 0, 5, 4, 1, 1, 1.0, 'temple_incense'),
            ('offering', 4, 9, 4, 1, 1, 1.3, 'temple_offering'),
            ('cushions', 9, 5, 7, 3, 1, 3.4, None),
            ('gong', 11, 10, 5, 1, 1, 1.4, 'temple_gong'),
            ('desk', 16, 2, 8, 2, 1, 2.2, 'temple_desk'),
            ('pine', 20, 10, 8, 1, 1, 1.1, None),
        ],
        spots=[('altar', 5, 2, 4, 2, 'temple_altar'), ('lanterns', 2, 2, 2, 1, 'temple_lanterns'), ('doors', 1, 4, 1, 4, 'temple_doors')],
    ),
}

# the three big station halls: the Hinomori hall layout (22 x 15, ticket gates in row 5), a hall of their own each
HALL_SPOTS = [  # (name, x, y, w, h, script) the painted features; the gate script differs per hall
    ('map', 2, 5, 1, 1, 'hall_map'), ('window', 3, 5, 4, 1, 'hall_window'), ('ticket', 7, 5, 2, 1, 'hall_ticket'),
    ('timetable', 9, 5, 3, 1, 'hall_board'), ('poster', 12, 5, 1, 1, 'hall_poster'), ('gate', 13, 5, 7, 1, None),
    ('lockers', 2, 6, 1, 5, 'hall_locker'), ('plant', 2, 11, 1, 2, 'plant'), ('posters', 20, 5, 1, 3, 'hall_poster'), ('vending', 19, 8, 2, 4, 'vending'),
]
HALLS = {
    'k_station_hall': dict(
        sheet='hall_kyoto', furniture_dir='hall_kyoto', name='Kyoto Station hall', nameJa='京都駅 改札', gate='kyoto_station',
        ext=('k_station', [(20, 6), (21, 6)], (20, 7, 'down')),
        furniture=[
            ('bench1', 2, 4, 8, 3, 1, 3.1, 'hall_bench'), ('bench2', 2, 4, 11, 3, 1, 3.1, 'hall_bench'), ('bamboo', 1, 8, 7, 1, 1, 1.1, None),
            ('lantern', 5, 12, 10, 1, 1, 0.8, None), ('cart', 4, 15, 9, 2, 1, 2.4, 'hall_cart'), ('luggage', 7, 17, 11, 1, 1, 1.1, None),
            ('trolley', 3, 7, 12, 1, 1, 1.0, None), ('bins', 6, 3, 13, 1, 1, 1.2, 'station_trash'),
        ],
    ),
    'o_station_hall': dict(
        sheet='hall_osaka_umeda', furniture_dir='hall_osaka_umeda', name='Umeda Station hall', nameJa='梅田駅 改札', gate='dep_osaka',
        ext=('o_umeda', [(20, 7), (21, 7)], (20, 8, 'down')),
        furniture=[
            ('bench1', 2, 4, 8, 3, 1, 3.1, 'hall_bench'), ('bench2', 2, 13, 11, 3, 1, 3.1, 'hall_bench'), ('kiosk', 1, 15, 8, 2, 1, 2.4, 'hall_cart'),
            ('screen', 3, 8, 7, 1, 1, 1.0, None), ('plant', 5, 3, 12, 1, 1, 1.2, None), ('pump', 6, 6, 12, 1, 1, 0.9, None),
            ('trolley', 4, 12, 8, 1, 1, 1.0, None), ('bins', 7, 17, 12, 1, 1, 1.2, 'station_trash'), ('post', 8, 8, 10, 1, 1, 0.8, None),
        ],
    ),
    't_station_hall': dict(
        sheet='hall_tokyo', furniture_dir='hall_tokyo', name='Tokyo Station hall', nameJa='東京駅 改札', gate='dep_tokyo',
        ext=('t_station', [(20, 8), (21, 8)], (20, 10, 'down')),
        furniture=[
            ('bench1', 0, 4, 8, 3, 1, 3.1, 'hall_bench'), ('bench2', 0, 14, 11, 3, 1, 3.1, 'hall_bench'), ('lamp1', 2, 8, 7, 1, 1, 0.8, None),
            ('lamp2', 2, 12, 7, 1, 1, 0.8, None), ('trolley', 3, 16, 9, 1, 1, 1.4, None), ('palm', 4, 3, 12, 1, 1, 1.3, None),
            ('kiosk', 5, 6, 12, 2, 1, 2.4, 'hall_cart'), ('clock', 6, 9, 9, 1, 1, 0.8, 'hall_clock'), ('bins', 7, 17, 12, 1, 1, 1.2, 'station_trash'),
        ],
    ),
}

HALL_TEXT = {
    'hall_map': ('{路線図|ろせんず}が{貼|は}ってある。{行|い}き{先|さき}ごとに{色|いろ}が{分|わ}かれていて、{見|み}ているだけで{旅|たび}に{出|で}たくなる。', 'A route map. Each line has its own colour, and just looking makes you want to travel.'),
    'hall_window': ('{窓口|まどぐち}だ。{駅員|えきいん}さんが、{旅行者|りょこうしゃ}に{切符|きっぷ}の{買い方|かいかた}を{説明|せつめい}している。', 'The ticket window. A station attendant is explaining to a traveller how to buy a ticket.'),
    'hall_ticket': ('{切符|きっぷ}の{券売機|けんばいき}だ。{行|い}き{先|さき}を{選|えら}んでお{金|かね}を{入|い}れる。ICカードのチャージもできる。', 'A ticket machine. You choose a destination and insert money. You can also top up an IC card.'),
    'hall_board': ('{発車|はっしゃ}{案内|あんない}の{掲示板|けいじばん}だ。{電車|でんしゃ}の{名前|なまえ}と{時刻|じこく}が、{順番|じゅんばん}に{並|なら}んでいる。{改札|かいさつ}の{向|む}こうが、ホームだ。', 'The departure board with train names and times in order. The platforms lie beyond the gates.'),
    'hall_poster': ('{旅行|りょこう}のポスターだ。{行|い}ったことのない{町|まち}の{景色|けしき}が、{写真|しゃしん}になっている。', 'A travel poster with photographs of towns you have not yet visited.'),
    'hall_locker': ('コインロッカーだ。{大|おお}きな{荷物|にもつ}を{預|あず}けて、{身軽|みがる}に{街|まち}を{歩|ある}ける。', 'Coin lockers. Leave your big luggage and walk through town unburdened.'),
    'hall_bench': ('{駅|えき}のベンチだ。{電車|でんしゃ}を{待|ま}つ{人|ひと}が、{荷物|にもつ}を{膝|ひざ}にのせて{座|すわ}っている。', 'A station bench. People waiting for trains sit with their luggage on their knees.'),
    'hall_cart': ('{小|ちい}さな{売店|ばいてん}だ。お{弁当|べんとう}や{飲|の}み{物|もの}、お{土産|みやげ}が{並|なら}んでいる。{電車|でんしゃ}の{中|なか}で{食|た}べる{人|ひと}が{多|おお}い。', 'A small stall with bento, drinks and souvenirs. Many people eat on the train.'),
    'hall_clock': ('{古|ふる}い{時計|とけい}が、{正確|せいかく}に{時|とき}を{刻|きざ}んでいる。{日本|にほん}の{電車|でんしゃ}は、{一分|いっぷん}の{遅|おく}れも{珍|めずら}しいのだ。', 'An old clock keeps exact time. In Japan even a one-minute delay of a train is rare.'),
}

TEXT = {
    # ---- wagashi
    'wagashi_ten': [
        ('いらっしゃいませ。{京都|きょうと}の{和菓子|わがし}は、{季節|きせつ}ごとに{姿|すがた}を{変|か}えるんですよ。', 'Welcome. Kyoto wagashi change their shape with every season.'),
        ('{今|いま}は{紅葉|もみじ}の{形|かたち}の{練り切り|ねりきり}が{人気|にんき}です。お{茶|ちゃ}と{一緒|いっしょ}に、ぜひ。', 'Right now, maple-leaf nerikiri are popular. Do try them with tea.'),
    ],
    'wagashi_table': ('{小|ちい}さな{丸|まる}いテーブルに、お{茶|ちゃ}と{花|はな}。ここで{味見|あじみ}をさせてもらえるらしい。', 'A small round table with tea and flowers. Apparently you may taste the sweets here.'),
    'wagashi_bonsai': ('{赤|あか}い{紅葉|もみじ}の{盆栽|ぼんさい}だ。{店|みせ}の{中|なか}にも{秋|あき}が{来|き}ている。', 'A bonsai maple with red leaves. Autumn has come inside the shop, too.'),
    'wagashi_case': ('ガラスのケースに、{桜|さくら}や{栗|くり}の{形|かたち}をした{和菓子|わがし}が{並|なら}んでいる。{食|た}べるのがもったいないほどだ。', 'In the glass case, sweets shaped like cherry blossoms and chestnuts. Almost too pretty to eat.'),
    'wagashi_tea': ('{棚|たな}に、{茶筒|ちゃづつ}が{並|なら}んでいる。{緑|みどり}の{缶|かん}は{抹茶|まっちゃ}、{白|しろ}いのは{煎茶|せんちゃ}だそうだ。', 'Tea tins on the shelf. Green ones are matcha, white ones sencha.'),
    'wagashi_gift_shelf': ('{贈|おく}り{物|もの}{用|よう}の{箱|はこ}が、{美|うつく}しい{包|つつ}み{紙|がみ}で{積|つ}まれている。', 'Gift boxes in beautiful wrapping are stacked up.'),
    # ---- fushimi tea stand
    'teestand_oyaji': [
        ('いらっしゃい。{千本鳥居|せんぼんとりい}を{歩|ある}いてきたのかい？ {足|あし}が{疲|つか}れただろう。', 'Welcome. Did you walk the thousand torii? Your feet must be tired.'),
        ('ここで{一|ひと}ぷくして、お{茶|ちゃ}を{飲|の}んでいきなさい。{山|やま}はまだ{長|なが}いからね。', 'Rest here a while and have some tea. The mountain is still long.'),
    ],
    'teestand_bench': ('{赤|あか}いクッションのベンチだ。{登|のぼ}り{疲|づか}れた{人|ひと}が、よく{座|すわ}るのだろう。', 'A bench with a red cushion. Tired climbers must sit here often.'),
    'teestand_brazier': ('{炭|すみ}の{火|ひ}に、{鉄瓶|てつびん}がかかっている。お{湯|ゆ}がしゅんしゅんと{鳴|な}っている。', 'An iron kettle on glowing charcoal, its water softly singing.'),
    'teestand_fox': ('{赤|あか}い{前掛|まえか}けをした、{小|ちい}さな{狐|きつね}の{像|ぞう}だ。{稲荷|いなり}{神社|じんじゃ}の{使|つか}いなのだ。', 'A small stone fox in a red bib. It is the messenger of Inari shrines.'),
    'teestand_counter': ('{長|なが}いカウンターに、{湯飲|ゆの}みと{急須|きゅうす}が{並|なら}んでいる。', 'Cups and teapots stand along the long counter.'),
    'teestand_window': ('{窓|まど}の{外|そと}に、{赤|あか}い{鳥居|とりい}が{見|み}える。{光|ひかり}が{朱色|しゅいろ}に{染|そ}まっている。', 'Through the window you see red torii; the light is tinted vermilion.'),
    'teestand_foxes': ('{棚|たな}の{上|うえ}に、{狐|きつね}の{置物|おきもの}とお{守|まも}りが{並|なら}んでいる。', 'Fox figurines and amulets line the shelf.'),
    # ---- kaufhaus
    'kaufhaus_ten': [
        ('いらっしゃいませ。{本日|ほんじつ}は{秋|あき}の{新作|しんさく}が{入|はい}っております。', 'Welcome. Our new autumn items have arrived today.'),
        ('お{探|さが}しの{物|もの}がございましたら、お{声|こえ}がけください。', 'If you are looking for something, please let me know.'),
    ],
    'kaufhaus_scarves': ('スカーフと{小物|こもの}の{売り場|うりば}だ。やわらかい{色|いろ}ばかりで、{選|えら}ぶのが{難|むずか}しい。', 'The scarf and accessory counter. All soft colours, so choosing is hard.'),
    'kaufhaus_mannequin': ('ピンクのワンピースを{着|き}たマネキンだ。{肩|かた}に、{小|ちい}さなかばんをかけている。', 'A mannequin in a pink dress with a small bag on its shoulder.'),
    'kaufhaus_cosmetics': ('{化粧品|けしょうひん}のカウンターだ。{瓶|びん}が、{天井|てんじょう}の{光|ひかり}にきらきら{光|ひか}っている。', 'The cosmetics counter. The bottles sparkle in the ceiling lights.'),
    'kaufhaus_escalator': ('ガラスのエスカレーターが、{上|うえ}の{階|かい}へ{続|つづ}いている。{今日|きょう}は{見|み}るだけにしておこう。', 'A glass escalator leads to the floor above. Just looking today.'),
    'kaufhaus_clothes': ('ブラウスやシャツが、ハンガーにきれいに{並|なら}んでいる。', 'Blouses and shirts hang neatly on their hangers.'),
    # ---- kino
    'kino_shihainin': [
        ('ようこそ、{古|ふる}い{映画館|えいがかん}へ。{昔|むかし}は、ここに{毎晩|まいばん}{行列|ぎょうれつ}ができたものです。', 'Welcome to the old cinema. Back then there was a queue here every night.'),
        ('{今|いま}は{静|しず}かですが、ポップコーンの{匂|にお}いだけは、{昔|むかし}のままですよ。', 'It is quiet now, but the smell of popcorn is just as it was.'),
    ],
    'kino_popcorn': ('ポップコーンのワゴンだ。バターの{甘|あま}い{匂|にお}いが、ロビーいっぱいに{広|ひろ}がっている。', 'A popcorn cart. The sweet smell of butter fills the whole lobby.'),
    'kino_sofa': ('{赤|あか}いビロードの{大|おお}きなソファだ。{映画|えいが}の{前|まえ}に{座|すわ}って{待|ま}つ{人|ひと}がいたのだろう。', 'A big red velvet sofa. People surely waited here before the film.'),
    'kino_poster': ('{映写機|えいしゃき}の{絵|え}が{描|か}かれた{立|た}て{看板|かんばん}だ。{星|ほし}が{四|よっ}つ{並|なら}んでいる。', 'A standing sign with a film projector. Four stars are lined up on it.'),
    'kino_ticket': ('{切符|きっぷ}の{売り場|うりば}だ。{小|ちい}さな{窓|まど}の{向|む}こうに、{赤|あか}いカーテンが{見|み}える。', 'The ticket booth. Behind the small window you can see a red curtain.'),
    'kino_film_posters': ('{色|いろ}あせた{映画|えいが}のポスターが、{額|がく}に{入|い}っている。{題名|だいめい}はもう{読|よ}めない。', 'Faded film posters in frames. The titles can no longer be read.'),
    'kino_lamp': ('{真鍮|しんちゅう}のランプが、{壁|かべ}をやさしく{照|て}らしている。', 'A brass lamp lights the wall gently.'),
    # ---- museum
    'museum_gakugei': [
        ('ここは{大阪城|おおさかじょう}の{資料館|しりょうかん}です。{鎧|よろい}や{巻物|まきもの}を{展示|てんじ}しています。', 'This is the Osaka Castle museum. Armour and scrolls are on display.'),
        ('ガラスケースには、{手|て}を{触|ふ}れないでくださいね。{長|なが}い{歴史|れきし}のある{品|しな}ですから。', 'Please do not touch the glass cases. These items have a long history.'),
    ],
    'museum_case': ('ガラスケースの{中|なか}に、{古|ふる}い{巻物|まきもの}と{地図|ちず}が{広|ひろ}げてある。{戦|たたか}いの{様子|ようす}が{描|えが}かれているようだ。', 'Inside the case lie old scrolls and a map, apparently showing a battle.'),
    'museum_armour': ('{黒|くろ}い{鎧|よろい}と、{金|きん}の{角|つの}のかぶとだ。{見|み}ているだけで、{背筋|せすじ}が{伸|の}びる。', 'Black armour and a helmet with golden horns. Just looking makes you stand up straight.'),
    'museum_screen': ('{金色|きんいろ}の{屏風|びょうぶ}に、{大阪城|おおさかじょう}が{描|えが}かれている。{松|まつ}の{緑|みどり}がきれいだ。', 'A golden folding screen with Osaka Castle painted on it. The green of the pines is lovely.'),
    'museum_armour_wall': ('{壁|かべ}ぎわのケースにも、{鎧|よろい}が{飾|かざ}ってある。{家紋|かもん}が{刺繍|ししゅう}された{旗|はた}も{見|み}える。', 'More armour stands in the cases along the wall, with flags embroidered with family crests.'),
    'museum_desk': ('{受付|うけつけ}の{机|つくえ}だ。パンフレットが{置|お}いてある。', 'The reception desk, with brochures on it.'),
    'museum_banner': ('{赤|あか}い{旗|はた}に、{家紋|かもん}が{白|しろ}く{染|そ}め{抜|ぬ}かれている。', 'Red banners with a family crest dyed in white.'),
    # ---- koban
    'koban_omawari': [
        ('こんにちは。{道|みち}に{迷|まよ}いましたか？ {交番|こうばん}では、{道案内|みちあんない}もしていますよ。', 'Hello. Are you lost? The koban gives directions too.'),
        ('{落|お}とし{物|もの}も、ここで{預|あず}かります。{財布|さいふ}や{傘|かさ}が、{毎日|まいにち}{届|とど}くんです。', 'Lost property is kept here, too. Wallets and umbrellas arrive every day.'),
    ],
    'koban_desk': ('{大|おお}きな{机|つくえ}に、{緑|みどり}のランプと{書類|しょるい}がある。{仕事|しごと}の{途中|とちゅう}のようだ。', 'A big desk with a green lamp and papers. Work seems to be in progress.'),
    'koban_umbrellas': ('{忘|わす}れ{物|もの}の{傘|かさ}が{立|た}ててある。{持|も}ち{主|ぬし}が{取|と}りに{来|く}るのを{待|ま}っている。', 'Forgotten umbrellas stand here, waiting for their owners to fetch them.'),
    'koban_map': ('この{辺|あた}りの{地図|ちず}だ。{駅|えき}と{道|みち}が、{細|こま}かく{書|か}き{込|こ}まれている。', 'A map of the neighbourhood, with the station and streets marked in detail.'),
    'koban_shelf': ('{落|お}とし{物|もの}の{棚|たな}だ。{手袋|てぶくろ}や{帽子|ぼうし}に、{番号|ばんごう}の{札|ふだ}がついている。', 'The lost-and-found shelf. Gloves and hats carry numbered tags.'),
    'koban_window': ('{引|ひ}き{戸|ど}の{窓|まど}から、{駅|えき}の{広場|ひろば}が{見|み}える。', 'Through the sliding window you can see the station square.'),
    # ---- karaoke
    'karaoke_uketsuke': [
        ('いらっしゃいませ！ お{部屋|へや}は{混|こ}んでいますが、ロビーで{待|ま}てますよ。', 'Welcome! The rooms are busy, but you can wait in the lobby.'),
        ('{歌|うた}いたい{曲|きょく}は、{決|き}まりましたか？ ここでは、ドリンクも{飲|の}み{放題|ほうだい}です。', 'Have you chosen what to sing? Drinks are all you can drink here.'),
    ],
    'karaoke_table': ('マイクとメニューが{置|お}いてある。{待|ま}っている{間|あいだ}に、{曲|きょく}を{選|えら}べる。', 'A microphone and a menu lie here. You can pick songs while you wait.'),
    'karaoke_vending': ('ジュースの{自動販売機|じどうはんばいき}だ。{色|いろ}とりどりの{缶|かん}が{並|なら}んでいる。', 'A juice vending machine with colourful cans in rows.'),
    'karaoke_counter': ('{受付|うけつけ}のカウンターだ。{後|うし}ろに、{部屋|へや}の{鍵|かぎ}が{掛|か}かっている。', 'The reception counter, with room keys hanging behind it.'),
    'karaoke_doors': ('{防音|ぼうおん}のドアが{並|なら}んでいる。{中|なか}から、かすかに{歌声|うたごえ}が{聞|き}こえてくる。', 'Soundproof doors in a row. A faint singing voice leaks from inside.'),
    'karaoke_neon': ('ネオンサインが、ピンクと{青|あお}にちかちか{光|ひか}っている。', 'The neon sign blinks pink and blue.'),
    # ---- bookshop
    'books_shuijin': [
        ('いらっしゃい。ゆっくり{見|み}ていってください。{立|た}ち{読|よ}みも、ほどほどなら{大歓迎|だいかんげい}ですよ。', 'Welcome. Take your time. Browsing in moderation is very welcome.'),
        ('{日本語|にほんご}の{勉強|べんきょう}には、{短|みじか}い{小説|しょうせつ}がおすすめです。{一|ひと}つの{物語|ものがたり}を{読|よ}み{終|お}えると、{自信|じしん}がつきますよ。', 'For learning Japanese I recommend short novels. Finishing one story builds confidence.'),
    ],
    'books_shelf': ('{背|せ}の{高|たか}い{本棚|ほんだな}だ。{緑|みどり}の{葉|は}が{上|うえ}から{垂|た}れている。', 'A tall bookshelf with green leaves trailing down from the top.'),
    'books_table': ('おすすめの{本|ほん}が、{開|ひら}いたまま{置|お}いてある。{下|した}の{段|だん}にも、{本|ほん}がびっしりだ。', 'A recommended book lies open. The shelf underneath is packed with books too.'),
    'books_armchair': ('{緑|みどり}の{肘掛|ひじか}け{椅子|いす}だ。ひざ{掛|か}けまである。ここで{読|よ}んだら、{時間|じかん}を{忘|わす}れそうだ。', 'A green armchair, even with a blanket. Reading here, you would lose track of time.'),
    'books_wall': ('{壁|かべ}いっぱいの{本棚|ほんだな}だ。{背表紙|せびょうし}の{色|いろ}が、{虹|にじ}のように{並|なら}んでいる。', 'Shelves fill the wall, the colours of the spines lined up like a rainbow.'),
    'books_desk': ('{会計|かいけい}の{机|つくえ}だ。{招|まね}き{猫|ねこ}の{置物|おきもの}が、お{客|きゃく}さんを{見守|みまも}っている。', 'The cash desk. A lucky-cat figurine watches over the customers.'),
    'books_side': ('{壁|かべ}ぎわの{棚|たな}に、{文庫本|ぶんこぼん}が{並|なら}んでいる。{値段|ねだん}も{手頃|てごろ}だ。', 'Paperbacks line the shelf by the wall, at friendly prices.'),
    # ---- souvenir
    'souvenir_okami': [
        ('いらっしゃいませ！ {浅草|あさくさ}のお{土産|みやげ}なら、うちが{一番|いちばん}ですよ。', 'Welcome! For Asakusa souvenirs, we are the best.'),
        ('{招|まね}き{猫|ねこ}は、お{客|きゃく}さんを{招|まね}く{縁起物|えんぎもの}。{右手|みぎて}は{お金|おかね}、{左手|ひだりて}は{人|ひと}を{招|まね}くんですよ。', 'The beckoning cat is a lucky charm that invites customers. The right paw calls money, the left calls people.'),
    ],
    'souvenir_cats': ('{大|おお}きな{招|まね}き{猫|ねこ}と、{小|ちい}さな{猫|ねこ}たちが{並|なら}んでいる。{桜|さくら}の{枝|えだ}も{飾|かざ}ってある。', 'A big lucky cat and smaller cats sit in a row, with cherry branches beside them.'),
    'souvenir_postcards': ('くるくる{回|まわ}るポストカードの{棚|たな}だ。{浅草|あさくさ}の{写真|しゃしん}や{富士山|ふじさん}の{絵|え}がある。', 'A spinning postcard rack with pictures of Asakusa and Mount Fuji.'),
    'souvenir_daruma': ('{大|おお}きな{赤|あか}いだるまだ。{目|め}を{入|い}れて{願|ねが}いごとをするのだという。', 'A big red daruma doll. You paint in an eye and make a wish, they say.'),
    'souvenir_shelves': ('{棚|たな}に、{扇子|せんす}やだるまが{並|なら}んでいる。どれも{小|ちい}さくて、お{土産|みやげ}に{良|よ}さそうだ。', 'Folding fans and daruma dolls line the shelves, small and just right as gifts.'),
    'souvenir_counter': ('{会計|かいけい}のカウンターだ。{紙|かみ}の{提灯|ちょうちん}が{天井|てんじょう}から{下|さ}がっている。', 'The cash counter, with paper lanterns hanging from the ceiling.'),
    'souvenir_wall': ('{壁|かべ}の{棚|たな}に、ポストカードがぎっしり{並|なら}んでいる。', 'Postcards are packed tightly on the wall rack.'),
    # ---- share house
    'share_resident': [
        ('あ、{新|あたら}しい{人|ひと}？ ここはシェアハウスだよ。みんなで{台所|だいどころ}と{居間|いま}を{使|つか}っているんだ。', 'Oh, a new face? This is a share house. We all use the kitchen and living room together.'),
        ('{窓|まど}から{隅田川|すみだがわ}が{見|み}えるのが、{自慢|じまん}なんだ。{夜|よる}は、スカイツリーもきれいだよ。', 'Our pride is the view of the Sumida River. At night the Skytree is beautiful, too.'),
    ],
    'wohnung_table': ('{大|おお}きなテーブルを、みんなで{囲|かこ}んで{食事|しょくじ}をするらしい。{座布団|ざぶとん}が{四|よっ}つ{並|なら}んでいる。', 'Everyone seems to eat around this big table. Four cushions are laid out.'),
    'wohnung_bike': ('{赤|あか}い{自転車|じてんしゃ}が、{壁|かべ}に{立|た}てかけてある。かごに{野菜|やさい}が{入|はい}っているところを{想像|そうぞう}する。', 'A red bicycle leans against the wall. You picture vegetables in its basket.'),
    'wohnung_kitchen': ('{小|ちい}さな{台所|だいどころ}に、{冷蔵庫|れいぞうこ}がある。{名前|なまえ}の{書|か}いてある{食|た}べ{物|もの}には、{手|て}を{出|だ}さないルールだ。', 'A small kitchen with a fridge. The rule: never touch food with someone’s name on it.'),
    'wohnung_window': ('{窓|まど}の{外|そと}に、{川|かわ}の{流|なが}れと、{遠|とお}くのタワーが{見|み}える。', 'Outside the window: the river flowing and a tower far away.'),
    'wohnung_board': ('{掲示板|けいじばん}に、メモが{何枚|なんまい}も{貼|は}ってある。ごみの{日|ひ}や、{当番|とうばん}の{表|ひょう}のようだ。', 'Many notes on the board: rubbish days and a duty rota, it seems.'),
    # ---- observation deck
    'deck_staff': [
        ('ようこそ{展望台|てんぼうだい}へ。{今夜|こんや}は{空気|くうき}が{澄|す}んでいて、{遠|とお}くまで{見|み}えますよ。', 'Welcome to the observation deck. The air is clear tonight, so you can see far.'),
        ('{望遠鏡|ぼうえんきょう}は、コインを{入|い}れると{使|つか}えます。{橋|はし}のあかりが、とてもきれいです。', 'The telescope works with a coin. The lights on the bridge are lovely.'),
    ],
    'deck_telescope': ('コインで{使|つか}う{望遠鏡|ぼうえんきょう}だ。のぞくと、{街|まち}の{明|あ}かりが{一|ひと}つ{一|ひと}つ{見|み}える。', 'A coin-operated telescope. Looking through, you can see the city lights one by one.'),
    'deck_windows': ('{大|おお}きなガラスの{向|む}こうに、{夜景|やけい}が{広|ひろ}がっている。{宝石|ほうせき}をばらまいたようだ。', 'Beyond the big glass spreads the night view, like scattered jewels.'),
    'deck_souvenirs': ('{小|ちい}さな{売店|ばいてん}だ。{絵葉書|えはがき}と{地球儀|ちきゅうぎ}の{置物|おきもの}が{並|なら}んでいる。', 'A small stall with postcards and little globes.'),
    'deck_compass': ('{床|ゆか}に、{金色|きんいろ}の{方位|ほうい}{磁石|じしゃく}の{模様|もよう}がある。{真|ま}ん{中|なか}に{立|た}つと、なんだか{旅|たび}に{出|で}たくなる。', 'A golden compass pattern on the floor. Standing in the centre makes you want to travel.'),
    # ---- farmhouse
    'farm_obaa': [
        ('おや、よく{来|き}たねえ。{畑|はたけ}は{見|み}たかい？ ぶどうが{甘|あま}く{育|そだ}っているよ。', 'Well, you came. Did you see the fields? The grapes are growing sweet.'),
        ('お{茶|ちゃ}でも{飲|の}んでいきなさい。{炭火|すみび}の{上|うえ}で{沸|わ}かした{湯|ゆ}は、{味|あじ}が{違|ちが}うんだよ。', 'Have some tea. Water boiled over charcoal tastes different.'),
    ],
    'farm_table': ('{低|ひく}いテーブルに、{花|はな}と{急須|きゅうす}が{置|お}いてある。{座布団|ざぶとん}も{用意|ようい}されている。', 'A low table with flowers and a teapot. Cushions are ready, too.'),
    'farm_brazier': ('{炭|すみ}の{火|ひ}が、ほんのり{赤|あか}い。{冬|ふゆ}は、{家族|かぞく}みんなでここに{集|あつ}まるのだろう。', 'The charcoal glows softly red. In winter the whole family probably gathers here.'),
    'farm_wheel': ('{古|ふる}い{糸車|いとぐるま}だ。{昔|むかし}は、おばあさんが{毎日|まいにち}{糸|いと}をつむいでいたらしい。', 'An old spinning wheel. Long ago the grandmother apparently spun thread every day.'),
    'farm_rocker': ('ゆらゆら{揺|ゆ}れるいすだ。{緑|みどり}のひざ{掛|か}けが{掛|か}かっている。', 'A gently swaying chair with a green blanket over it.'),
    'farm_stove': ('{台所|だいどころ}のかまどだ。{棚|たな}に、ジャムの{瓶|びん}が{並|なら}んでいる。', 'The kitchen stove. Jars of jam stand on the shelf.'),
    'farm_altar': ('{小|ちい}さな{仏壇|ぶつだん}だ。{花|はな}とお{線香|せんこう}が{供|そな}えてある。', 'A small family altar, offered flowers and incense.'),
    'farm_herbs': ('{天井|てんじょう}から、{乾|かわ}かした{薬草|やくそう}の{束|たば}が{下|さ}がっている。いい{香|かお}りがする。', 'Bundles of dried herbs hang from the ceiling and smell good.'),
    # ---- winery
    'winery_master': [
        ('ようこそ。ここはワイナリーの{試飲室|しいんしつ}です。{今年|ことし}のぶどうは、{出来|でき}がいいですよ。', 'Welcome to the winery tasting room. This year’s grapes turned out well.'),
        ('ワインは{待|ま}つ{時間|じかん}も{大切|たいせつ}な{材料|ざいりょう}です。{樽|たる}の{中|なか}で、ゆっくり{育|そだ}てているんですよ。', 'Waiting time is an important ingredient for wine. We let it mature slowly in the barrels.'),
    ],
    'winery_barrel_table': ('{樽|たる}を{使|つか}ったテーブルに、ワインとグラス、ぶどうが{置|お}いてある。ランタンの{灯|あか}りが{温|あたた}かい。', 'A table made from a barrel, with wine, glasses and grapes. The lantern light is warm.'),
    'winery_press': ('ぶどうを{搾|しぼ}る{機械|きかい}だ。{紫|むらさき}の{果汁|かじゅう}の{匂|にお}いがする。', 'A grape press. It smells of purple juice.'),
    'winery_tasting': ('{細長|ほそなが}いカウンターに、グラスとワインの{瓶|びん}が{並|なら}んでいる。{試飲|しいん}は{少|すこ}しだけだ。', 'Glasses and bottles stand on the long counter. Tastings are small.'),
    'winery_barrels': ('{奥|おく}の{壁|かべ}に、{大|おお}きな{樽|たる}が{積|つ}まれている。{木|き}の{香|かお}りがする。', 'Big barrels are stacked against the back wall. The room smells of wood.'),
    'winery_bottles': ('{棚|たな}に、ワインの{瓶|びん}が{横|よこ}に{寝|ね}かせてある。{年|とし}ごとに、{札|ふだ}の{色|いろ}が{違|ちが}う。', 'Wine bottles lie on their sides on the shelf. Each year has a different label colour.'),
    # ---- harbour restaurant
    'diner_okami': [
        ('いらっしゃい！ {今日|きょう}は{朝|あさ}{獲|と}れたばかりの{魚|さかな}があるよ。', 'Welcome! We have fish caught this very morning.'),
        ('{漁師|りょうし}さんたちは、ここで{朝|あさ}ごはんを{食|た}べていくのよ。{港|みなと}の{味|あじ}を、{楽|たの}しんでね。', 'The fishermen eat breakfast here. Enjoy the taste of the harbour.'),
    ],
    'diner_table': ('{丸|まる}いテーブルに、{丸椅子|まるいす}が{四|よっ}つ。{漁師|りょうし}さんたちが{大声|おおごえ}で{話|はな}している{姿|すがた}が{目|め}に{浮|う}かぶ。', 'A round table with four stools. You can picture fishermen talking loudly here.'),
    'diner_fishtank': ('{氷|こおり}の{上|うえ}に、{赤|あか}い{魚|さかな}が{並|なら}んでいる。とても{新鮮|しんせん}だ。', 'Red fish lie on ice. Very fresh.'),
    'diner_coats': ('{黄色|きいろ}い{雨具|あまぐ}と{帽子|ぼうし}が、{掛|か}けてある。{海|うみ}の{仕事|しごと}は、{雨|あめ}でも{休|やす}めない。', 'Yellow oilskins and a hat hang here. Sea work does not stop for rain.'),
    'diner_counter': ('{長|なが}いカウンターの{向|む}こうに、{焼|や}き{台|だい}が{見|み}える。{魚|さかな}を{焼|や}く{匂|にお}いがする。', 'Beyond the long counter you see the grill. It smells of grilling fish.'),
    'diner_window': ('{大|おお}きな{窓|まど}から、{港|みなと}の{船|ふね}が{見|み}える。', 'Through the big window you can see the boats in the harbour.'),
    'diner_nets': ('{天井|てんじょう}と{壁|かべ}に、{網|あみ}と{浮|う}きが{飾|かざ}ってある。', 'Nets and floats decorate the ceiling and wall.'),
    # ---- harbour office
    'harbor_chief': [
        ('おはよう。ここは{港|みなと}の{事務所|じむしょ}だ。{船|ふね}の{出入|ではい}りを、{毎日|まいにち}{記録|きろく}している。', 'Good morning. This is the harbour office. We record the boats’ comings and goings every day.'),
        ('{潮|しお}の{満|み}ち{引|ひ}きの{表|ひょう}を、{見|み}ておくといい。{海|うみ}は、{時間|じかん}によって{顔|かお}が{変|か}わるからね。', 'Have a look at the tide table. The sea changes its face with the hour.'),
    ],
    'amt_desk': ('{広|ひろ}い{机|つくえ}に、{海図|かいず}や{書類|しょるい}、{羅針盤|らしんばん}が{置|お}いてある。', 'A wide desk with sea charts, papers and a compass.'),
    'amt_clock': ('{古|ふる}い{柱時計|はしらどけい}だ。{振|ふ}り{子|こ}が、ゆっくり{揺|ゆ}れている。', 'An old grandfather clock, its pendulum swinging slowly.'),
    'amt_chart': ('{壁|かべ}に、{潮|しお}の{満|み}ち{引|ひ}きの{表|ひょう}と{海|うみ}の{地図|ちず}が{貼|は}ってある。', 'A tide table and a sea chart are pinned to the wall.'),
    'amt_lifebuoy': ('{赤|あか}と{白|しろ}の{浮|う}き{輪|わ}が、{壁|かべ}に{掛|か}けてある。いざという{時|とき}の{備|そな}えだ。', 'A red-and-white lifebuoy hangs on the wall, ready for emergencies.'),
    'amt_window': ('{窓|まど}の{向|む}こうに、{青|あお}い{海|うみ}が{広|ひろ}がっている。', 'Beyond the window spreads the blue sea.'),
    # ---- temple
    'temple_priest': [
        ('ようこそ、{山|やま}のお{寺|てら}へ。{雪|ゆき}の{中|なか}を、よく{来|き}られましたね。', 'Welcome to the mountain temple. You did well to come through the snow.'),
        ('ここでは、ただ{静|しず}かに{座|すわ}るだけでいいのです。{心|こころ}が{落|お}ち{着|つ}きますよ。', 'Here you only need to sit quietly. Your heart will settle.'),
    ],
    'temple_incense': ('{金色|きんいろ}の{香炉|こうろ}から、{細|ほそ}い{煙|けむり}が{上|のぼ}っている。', 'Thin smoke rises from the golden incense burner.'),
    'temple_offering': ('お{賽銭箱|さいせんばこ}だ。{蓮|はす}の{花|はな}の{模様|もよう}がある。お{金|かね}を{入|い}れて、{手|て}を{合|あ}わせよう。', 'An offering box with a lotus pattern. Drop in a coin and press your hands together.'),
    'temple_gong': ('{大|おお}きな{鐘|かね}が{台|だい}に{掛|か}かっている。{鳴|な}らすと、{音|おと}が{長|なが}く{響|ひび}く。', 'A big gong hangs on its frame. When struck, the sound rings for a long time.'),
    'temple_desk': ('お{坊|ぼう}さんの{低|ひく}い{机|つくえ}だ。{経典|きょうてん}と{筆|ふで}、ろうそくが{置|お}いてある。', 'The priest’s low desk, with scriptures, a brush and candles.'),
    'temple_altar': ('{金|きん}の{祭壇|さいだん}に、{小|ちい}さな{仏像|ぶつぞう}がある。{静|しず}かな{顔|かお}をしている。', 'A small Buddha statue on a golden altar, with a calm face.'),
    'temple_lanterns': ('{紙|かみ}の{灯籠|とうろう}が、{天井|てんじょう}から{下|さ}がっている。', 'Paper lanterns hang from the ceiling.'),
    'temple_doors': ('{障子|しょうじ}の{向|む}こうに、{雪|ゆき}が{降|ふ}っているのが{見|み}える。', 'Beyond the paper doors you see snow falling.'),
}
