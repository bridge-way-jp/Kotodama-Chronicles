"""
World expansion (tools/make_expansion_zip.py): one new district with ten new people in each region.

From the art in art/sheets (ground_ex_<r>_draft.webp, hm_exterior_ex_<r>.webp, hm_chars_ex_<r>_a/b.webp,
portraits_ex_<r>_a/b.webp) this writes
  public/assets/map_ex_<r>.png, bx_ex_<r>_<key>.png       the painted map and its buildings
  public/assets/npc_<id>_<dir>.png                        the standing frames of the new people
  public/assets/portrait_<id>_<expression>.png            their dialogue portraits
  src/content/expansion.gen.ts                            tiles, objects, warps and people per district

Collision: colour-based guess (tools/kyoto_grid.py) + the corrections below; every building plot is blocked whole and is
entered (interacted with) from the tiles named as its door. The district is reached from a signpost of its region
(content/expansion.ts) and left again at its exit tiles.

Run: python3 tools/build_expansion.py [--overlay DIR] [--only hinomori,tal]
"""
import json
import os
import sys

from PIL import Image, ImageDraw
from scipy import ndimage

sys.path.insert(0, os.path.dirname(__file__))
from build_characters import CHILD_HEIGHT, HEIGHT, cut, runs, split_n  # noqa: E402
from build_rooms import piece, sheet, strict_bg  # noqa: E402
from extract_sheets import OUT, ROOT, load, magenta_mask, resize_px, to_rgba, trim  # noqa: E402
from kyoto_grid import guess  # noqa: E402
from make_expansion_zip import REGIONS  # noqa: E402

W, H, T = 42, 28, 32
S = os.path.join(ROOT, 'art', 'sheets')

# per district: building sprites (index on the sheet), plots, corrections, exits, where the people stand
DISTRICTS = {
    'hinomori': dict(
        region='1_Hinomori', back=('town', 22, 14, 'down'),
        sprites={'hospital': 0, 'school': 1, 'post': 3, 'gate': 2, 'greengrocer': 4, 'flowers': 5, 'bakery': 6, 'hall': 7},
        base='.',
        ops=[('T', 0, 0, 41, 0), ('T', 0, 1, 3, 8), ('T', 18, 1, 19, 8), ('T', 22, 1, 22, 8), ('T', 39, 1, 41, 8),
             ('T', 3, 7, 8, 8), ('T', 12, 7, 17, 8), ('T', 22, 7, 29, 8), ('T', 32, 7, 41, 8), ('T', 0, 9, 0, 9), ('T', 0, 14, 0, 26),
             ('T', 41, 9, 41, 26), ('T', 3, 15, 3, 17), ('T', 38, 15, 38, 17), ('T', 3, 19, 4, 21), ('T', 29, 19, 35, 23),
             ('T', 0, 24, 19, 26), ('T', 22, 24, 41, 26), ('T', 0, 27, 41, 27)],
        plots=[
            dict(key='hospital', spr='hospital', rect=(4, 1, 17, 6), width=8, door=[(9, 8), (10, 8), (11, 8)], script='exh_hospital', room=True),
            dict(key='school', spr='school', rect=(23, 1, 38, 6), width=9, door=[(30, 8), (31, 8)], script='exh_school'),
            dict(key='s1', spr='greengrocer', rect=(4, 15, 7, 17), width=4, door=[(5, 18), (6, 18)], script='exh_greengrocer'),
            dict(key='s2', spr='flowers', rect=(8, 15, 10, 17), width=3, door=[(9, 18)], script='exh_flowers'),
            dict(key='s3', spr='bakery', rect=(11, 15, 14, 17), width=4, door=[(12, 18), (13, 18)], script='exh_bakery', room=True),
            dict(key='s4', spr='post', rect=(15, 15, 17, 17), width=3, door=[(16, 18)], script='exh_post'),
            dict(key='s5', spr='greengrocer', rect=(18, 15, 20, 17), width=3, door=[(19, 18)], script='exh_shutter'),
            dict(key='s6', spr='bakery', rect=(21, 15, 24, 17), width=4, door=[(22, 18), (23, 18)], script='exh_shutter'),
            dict(key='s7', spr='flowers', rect=(25, 15, 27, 17), width=3, door=[(26, 18)], script='exh_shutter'),
            dict(key='s8', spr='greengrocer', rect=(28, 15, 30, 17), width=3, door=[(29, 18)], script='exh_shutter'),
            dict(key='hall', spr='hall', rect=(32, 15, 37, 17), width=6, door=[(34, 18), (35, 18)], script='exh_hall'),
        ],
        deco=[dict(key='gate_w', spr='gate', x=0, y=9, width=4, at_y=15), dict(key='gate_e', spr='gate', x=38, y=9, width=4, at_y=15)],
        exits=[('w', [10, 11, 12, 13])],
        entry=(2, 11, 'right'),
        people={'ex_oomori': (6, 19, 'up'), 'ex_yuuma': (8, 19, 'up'), 'ex_ren': (13, 9, 'down'),
                'ex_takahashi': (28, 9, 'down'), 'ex_murai': (16, 19, 'up'), 'ex_shouta': (24, 12, 'left'), 'ex_oono': (36, 19, 'up'),
                'ex_genichirou': (10, 21, 'down')},
        children={'ex_ren'},
    ),
    'tal': dict(
        region='2_Tal', back=('valley', 37, 18, 'left'),
        sprites={'school': 0, 'coop': 1, 'dam': 3, 'drum': 2, 'vet': 4, 'brewery': 5, 'thatch': 6, 'modern': 7},
        base='T',
        ops=[('.', 21, 9, 24, 13), ('.', 20, 13, 27, 18), ('.', 13, 17, 20, 18), ('.', 14, 15, 15, 16), ('.', 10, 9, 20, 14),
             ('.', 19, 19, 21, 27), ('.', 22, 7, 23, 9), ('.', 27, 13, 30, 14), ('.', 28, 17, 31, 18), ('.', 32, 15, 32, 22),
             ('.', 26, 19, 38, 19), ('.', 38, 16, 39, 19), ('.', 18, 3, 19, 9), ('.', 13, 7, 19, 8), ('.', 24, 8, 30, 9),
             ('.', 30, 6, 38, 6), ('.', 30, 7, 30, 7), ('.', 9, 3, 10, 21), ('.', 6, 5, 8, 5), ('.', 6, 10, 8, 10), ('.', 7, 13, 8, 13)],
        plots=[
            dict(key='school', spr='school', rect=(13, 3, 17, 6), width=5, door=[(14, 7), (15, 7)], script='ext_school', room=True),
            dict(key='drum', spr='drum', rect=(21, 4, 24, 6), width=3, door=[(22, 7), (23, 7)], script='ext_drum'),
            dict(key='dam', spr='dam', rect=(38, 4, 40, 5), width=3, door=[(38, 6)], script='ext_dam'),
            dict(key='coop', spr='coop', rect=(28, 10, 32, 12), width=4, door=[(29, 13), (30, 13)], script='ext_coop'),
            dict(key='vet', spr='vet', rect=(28, 15, 31, 16), width=4, door=[(29, 17), (30, 17)], script='ext_vet'),
            dict(key='brewery', spr='brewery', rect=(33, 15, 37, 16), width=4, door=[(32, 16)], script='ext_brewery', room=True),
            dict(key='thatch', spr='thatch', rect=(27, 20, 31, 21), width=4, door=[(32, 21)], script='ext_farm'),
            dict(key='modern', spr='modern', rect=(33, 20, 37, 21), width=4, door=[(32, 22)], script='ext_newfarm'),
        ],
        exits=[('s', [20, 21])],
        entry=(20, 25, 'up'),
        people={'ex_masaji': (9, 12, 'right'), 'ex_uchida': (35, 6, 'down'), 'ex_sanae': (30, 18, 'up'),
                'ex_daichi': (24, 8, 'down'), 'ex_ume': (9, 4, 'down'), 'ex_miho': (22, 15, 'down'), 'ex_megumi': (16, 12, 'down'),
                'ex_youske': (34, 19, 'up'), },
        children={'ex_daichi'},
    ),
    'yukimi': dict(
        region='3_Yukimi', back=('mountain', 3, 12, 'right'),
        sprites={'lift': 1, 'inn': 0, 'wood': 2, 'plough': 3, 'weather': 4, 'museum': 5, 'footbath': 7, 'minshuku': 6},
        base='T',
        ops=[('.', 11, 2, 27, 9), ('.', 8, 13, 29, 13), ('.', 18, 11, 22, 12), ('.', 18, 14, 22, 16), ('.', 3, 19, 38, 20),
             ('.', 19, 21, 22, 27), ('.', 12, 21, 13, 22), ('.', 6, 23, 9, 27), ('.', 29, 13, 34, 14), ('.', 34, 10, 37, 12),
             ('.', 33, 7, 37, 9), ('.', 1, 12, 8, 13), ('.', 19, 17, 21, 18), ('.', 19, 9, 21, 10)],
        plots=[
            dict(key='plough', spr='plough', rect=(9, 10, 17, 12), width=5, door=[(12, 13), (13, 13)], script='exy_plough'),
            dict(key='lift', spr='lift', rect=(23, 10, 27, 12), width=4, door=[(24, 13), (25, 13)], script='exy_lift'),
            dict(key='weather', spr='weather', rect=(34, 4, 39, 6), width=4, door=[(35, 7), (36, 7)], script='exy_weather'),
            dict(key='inn', spr='inn', rect=(5, 16, 9, 18), width=4, door=[(7, 19)], script='exy_inn'),
            dict(key='wood', spr='wood', rect=(13, 16, 17, 18), width=4, door=[(15, 19)], script='exy_wood'),
            dict(key='minshuku', spr='minshuku', rect=(22, 16, 27, 18), width=4, door=[(24, 19), (25, 19)], script='exy_minshuku', room=True),
            dict(key='museum', spr='museum', rect=(31, 16, 36, 18), width=4, door=[(33, 19), (34, 19)], script='exy_museum', room=True),
            dict(key='footbath', spr='footbath', rect=(10, 23, 14, 26), width=4, door=[(9, 24)], script='exy_footbath'),
            dict(key='inn2', spr='inn', rect=(25, 23, 32, 26), width=6, door=[(22, 25)], script='exy_inn'),
        ],
        exits=[('s', [20, 21])],
        entry=(20, 26, 'up'),
        people={'ex_yukina': (21, 12, 'down'), 'ex_shigeru': (8, 12, 'right'), 'ex_itsuki': (16, 19, 'up'),
                'ex_ken': (6, 13, 'right'), 'ex_hoshino': (34, 8, 'down'), 'ex_ryuuji': (22, 20, 'left'), 'ex_yuzu': (17, 8, 'down'), 'ex_haruto2': (8, 20, 'right')},
        children={'ex_yuzu'},
    ),
    'shiomi': dict(
        region='4_Shiomi', back=('harbor', 39, 22, 'left'),
        sprites={'market': 0, 'shipyard': 1, 'school': 2, 'ferry': 3, 'house': 4, 'guesthouse': 5, 'coop': 6, 'clinic': 7},
        base='T',
        ops=[('.', 6, 15, 27, 16), ('.', 16, 17, 18, 19), ('.', 24, 16, 27, 19), ('.', 6, 20, 28, 21), ('.', 19, 22, 23, 25),
             ('.', 20, 9, 22, 14), ('.', 18, 9, 27, 10), ('.', 3, 9, 5, 16), ('.', 4, 8, 11, 8), ('.', 11, 3, 20, 4), ('.', 10, 4, 11, 8),
             ('.', 29, 9, 32, 11), ('.', 30, 6, 34, 8), ('.', 33, 3, 38, 5), ('.', 24, 11, 27, 15), ('.', 28, 10, 28, 10)],
        plots=[
            dict(key='house1', spr='house', rect=(6, 5, 9, 7), width=3, door=[(8, 8)], script='exs_house'),
            dict(key='school', spr='school', rect=(16, 5, 20, 7), width=4, door=[(19, 9), (20, 9)], script='exs_school'),
            dict(key='clinic', spr='clinic', rect=(25, 6, 29, 8), width=4, door=[(26, 9)], script='exs_clinic'),
            dict(key='house2', spr='house', rect=(6, 12, 9, 14), width=3, door=[(7, 15)], script='exs_house'),
            dict(key='guesthouse', spr='guesthouse', rect=(10, 12, 13, 14), width=4, door=[(11, 15)], script='exs_guesthouse', room=True),
            dict(key='house3', spr='house', rect=(14, 12, 17, 14), width=3, door=[(15, 15)], script='exs_house'),
            dict(key='coop', spr='coop', rect=(27, 12, 32, 14), width=4, door=[(28, 15)], script='exs_coop'),
            dict(key='market', spr='market', rect=(8, 17, 15, 19), width=5, door=[(11, 20), (12, 20)], script='exs_market'),
            dict(key='ferry', spr='ferry', rect=(19, 18, 23, 19), width=3, door=[(21, 20)], script='exs_ferry'),
            dict(key='shipyard', spr='shipyard', rect=(28, 16, 34, 18), width=5, door=[(28, 19)], script='exs_shipyard', room=True),
        ],
        exits=[('t', [(20, 25), (21, 25), (22, 25)])],
        entry=(21, 22, 'up'),
        people={'ex_tsuyoshi': (22, 23, 'up'), 'ex_kouji': (13, 21, 'up'), 'ex_natsumi': (18, 9, 'down'),
                'ex_tomi': (8, 21, 'down'), 'ex_takumi': (25, 21, 'down'), 'ex_morikawa': (27, 9, 'down'), 'ex_sofia': (36, 4, 'down'), 'ex_saori': (29, 15, 'up')},
    ),
    'kyoto': dict(
        region='5_Kyoto', back=('k_kamo', 2, 23, 'right'),
        sprites={'hall': 0, 'library': 1, 'dorm': 2, 'bookshop': 3, 'bamboo': 4, 'rickshaw': 5, 'gate': 6, 'okiya': 7},
        base='T',
        ops=[('.', 1, 7, 28, 8), ('.', 1, 7, 2, 13), ('.', 1, 13, 28, 13), ('.', 12, 1, 13, 13), ('.', 26, 1, 27, 13),
             ('.', 19, 5, 22, 8), ('.', 20, 9, 21, 19), ('.', 28, 10, 40, 10), ('.', 18, 19, 21, 22), ('.', 16, 22, 19, 27),
             ('.', 22, 19, 28, 19), ('.', 27, 18, 40, 18), ('.', 38, 18, 40, 21), ('.', 7, 14, 9, 26), ('.', 23, 18, 27, 18)],
        plots=[
            dict(key='library', spr='library', rect=(3, 3, 11, 6), width=6, door=[(7, 7), (8, 7)], script='exk_library', room=True),
            dict(key='hall', spr='hall', rect=(17, 1, 23, 4), width=5, door=[(20, 5), (21, 5)], script='exk_hall'),
            dict(key='dorm', spr='dorm', rect=(29, 3, 39, 8), width=6, door=[(33, 9), (34, 9)], script='exk_dorm'),
            dict(key='bookshop', spr='bookshop', rect=(3, 9, 6, 11), width=4, door=[(4, 12), (5, 12)], script='exk_bookshop', room=True),
            dict(key='bamboo', spr='bamboo', rect=(8, 9, 11, 11), width=4, door=[(9, 12), (10, 12)], script='exk_bamboo'),
            dict(key='okiya', spr='okiya', rect=(14, 9, 18, 12), width=4, door=[(16, 13)], script='exk_okiya'),
            dict(key='gate', spr='gate', rect=(3, 22, 8, 25), width=4, door=[(9, 23)], script='exk_gate'),
            dict(key='rickshaw', spr='rickshaw', rect=(35, 22, 40, 25), width=4, door=[(38, 21), (39, 21)], script='exk_rickshaw'),
        ],
        exits=[('s', [17, 18])],
        entry=(17, 26, 'up'),
        people={'ex_lucas': (20, 14, 'down'), 'ex_miyamoto': (22, 6, 'down'), 'ex_daisuke': (40, 20, 'left'), 'ex_matsui': (7, 20, 'down'),
                'ex_shizu': (11, 12, 'down'), 'ex_koharu': (17, 13, 'up'), 'ex_kikue': (31, 10, 'up'), 'ex_yui': (25, 19, 'right')},
    ),

    'osaka': dict(
        region='6_Osaka', back=('o_umeda', 37, 23, 'left'),
        sprites={'court': 0, 'workshop': 1, 'factory': 2, 'care': 3, 'school': 4, 'clinic': 5, 'news': 6, 'theatre': 7},
        base='.',
        ops=[('T', 0, 0, 41, 1), ('T', 0, 0, 1, 26), ('T', 40, 0, 41, 27), ('T', 0, 27, 41, 27), ('T', 0, 18, 7, 20), ('T', 9, 18, 24, 20), ('T', 27, 18, 41, 20),
             ('T', 1, 21, 4, 23), ('T', 0, 24, 3, 27), ('T', 34, 23, 41, 27), ('T', 38, 16, 41, 22)],
        plots=[
            dict(key='school', spr='school', rect=(5, 2, 11, 5), width=5, door=[(8, 6), (9, 6)], script='exo_school'),
            dict(key='theatre', spr='theatre', rect=(15, 2, 21, 5), width=5, door=[(18, 6), (19, 6)], script='exo_theatre'),
            dict(key='court', spr='court', rect=(28, 2, 37, 6), width=8, door=[(32, 7), (33, 7)], script='exo_court'),
            dict(key='w1', spr='workshop', rect=(4, 8, 7, 10), width=3, door=[(5, 11), (6, 11)], script='exo_workshop'),
            dict(key='w2', spr='factory', rect=(10, 8, 13, 10), width=3, door=[(11, 11), (12, 11)], script='exo_factory'),
            dict(key='w3', spr='workshop', rect=(16, 8, 19, 10), width=3, door=[(17, 11), (18, 11)], script='exo_workshop'),
            dict(key='w4', spr='factory', rect=(22, 8, 25, 10), width=3, door=[(23, 11), (24, 11)], script='exo_factory'),
            dict(key='w5', spr='factory', rect=(4, 13, 7, 15), width=3, door=[(5, 16), (6, 16)], script='exo_factory'),
            dict(key='w6', spr='workshop', rect=(10, 13, 13, 15), width=3, door=[(11, 16), (12, 16)], script='exo_workshop'),
            dict(key='w7', spr='factory', rect=(16, 13, 19, 15), width=3, door=[(17, 16), (18, 16)], script='exo_factory'),
            dict(key='w8', spr='workshop', rect=(22, 13, 25, 15), width=3, door=[(23, 16), (24, 16)], script='exo_workshop'),
            dict(key='care', spr='care', rect=(28, 13, 36, 15), width=6, door=[(32, 16), (33, 16)], script='exo_care'),
            dict(key='news', spr='news', rect=(9, 23, 16, 25), width=5, door=[(12, 26), (13, 26)], script='exo_news'),
            dict(key='clinic', spr='clinic', rect=(23, 23, 29, 25), width=5, door=[(26, 26), (27, 26)], script='exo_clinic'),
        ],
        exits=[('s', [19, 20])],
        entry=(19, 26, 'up'),
        people={'ex_teppei': (5, 12, 'down'), 'ex_jun': (11, 12, 'down'), 'ex_nina': (17, 12, 'down'), 'ex_hayakawa': (31, 9, 'down'),
                'ex_yuuko': (30, 17, 'up'), 'ex_tsuyoshi2': (23, 12, 'down'), 'ex_fujiwara': (15, 26, 'left'), 'ex_tsukkomi': (17, 7, 'down'),
                'ex_akira': (7, 7, 'down'), 'ex_sakata': (24, 26, 'right')},
    ),
    'tokyo': dict(
        region='7_Tokyo', back=('t_sumida', 37, 3, 'left'),
        sprites={'cowork': 0, 'lab': 1, 'fire': 2, 'care': 3, 'depot': 4, 'estate': 5, 'nursery': 6, 'salon': 7},
        base='.',
        ops=[('T', 0, 0, 1, 27), ('T', 38, 0, 41, 27), ('T', 17, 26, 41, 27), ('T', 17, 25, 37, 25), ('T', 0, 27, 41, 27), ('T', 2, 22, 4, 27), ('T', 9, 24, 13, 27)],
        plots=[
            dict(key='cowork', spr='cowork', rect=(24, 3, 29, 7), width=6, door=[(26, 8), (27, 8)], script='ext2_cowork'),
            dict(key='lab', spr='lab', rect=(32, 3, 37, 7), width=5, door=[(34, 8), (35, 8)], script='ext2_lab'),
            dict(key='depot', spr='depot', rect=(18, 5, 21, 9), width=4, door=[(19, 10), (20, 10)], script='ext2_depot'),
            dict(key='fire', spr='fire', rect=(25, 10, 28, 13), width=4, door=[(26, 14), (27, 14)], script='ext2_fire'),
            dict(key='care', spr='care', rect=(18, 13, 21, 17), width=4, door=[(19, 18), (20, 18)], script='ext2_care'),
            dict(key='estate', spr='estate', rect=(3, 10, 5, 12), width=3, door=[(4, 13)], script='ext2_estate'),
            dict(key='nursery', spr='nursery', rect=(9, 11, 11, 13), width=3, door=[(10, 14)], script='ext2_nursery'),
            dict(key='salon', spr='salon', rect=(5, 19, 8, 20), width=4, door=[(6, 21), (7, 21)], script='ext2_salon'),
            dict(key='old1', spr='estate', rect=(4, 3, 5, 4), width=3, door=[(4, 5)], script='ext2_old'),
            dict(key='old2', spr='nursery', rect=(10, 3, 11, 4), width=3, door=[(10, 5)], script='ext2_old'),
        ],
        exits=[('s', [14, 15])],
        entry=(14, 26, 'up'),
        people={'ex_mao': (28, 9, 'down'), 'ex_nakajima': (36, 9, 'down'), 'ex_hayato': (29, 14, 'left'), 'ex_hana': (22, 18, 'left'),
                'ex_shimizu': (30, 11, 'down'), 'ex_riku': (9, 21, 'down'), 'ex_isamu': (22, 9, 'left'), 'ex_nikaidou': (3, 14, 'up'),
                'ex_sophie': (12, 15, 'down'), 'ex_mai': (12, 14, 'right')},
        children={'ex_sophie'},
    ),
    'okinawa': dict(
        region='8_Okinawa', back=('town', 27, 20, 'down'),
        sprites={'hall': 0, 'still': 1, 'dive': 2, 'house': 3, 'soba': 4, 'school': 5, 'clinic': 6, 'fish': 7},
        base='.',
        ops=[('T', 0, 0, 41, 3), ('T', 0, 4, 5, 9), ('T', 34, 4, 41, 9), ('T', 0, 14, 2, 21), ('T', 39, 11, 41, 21), ('T', 17, 22, 21, 27), ('T', 24, 22, 41, 27),
             ('T', 0, 25, 16, 27), ('T', 24, 22, 35, 22), ('T', 36, 21, 41, 27), ('T', 6, 4, 9, 5)],
        plots=[
            dict(key='hall', spr='hall', rect=(11, 5, 17, 7), width=7, door=[(14, 8), (15, 8)], script='exk2_hall'),
            dict(key='clinic', spr='clinic', rect=(26, 5, 29, 7), width=3, door=[(27, 8), (28, 8)], script='exk2_clinic'),
            dict(key='still', spr='still', rect=(5, 10, 11, 12), width=5, door=[(8, 13), (9, 13)], script='exk2_still'),
            dict(key='soba', spr='soba', rect=(27, 10, 31, 12), width=4, door=[(29, 13), (30, 13)], script='exk2_soba'),
            dict(key='house1', spr='house', rect=(34, 10, 37, 12), width=4, door=[(35, 13), (36, 13)], script='exk2_house'),
            dict(key='house2', spr='house', rect=(7, 14, 10, 15), width=3, door=[(9, 16)], script='exk2_house'),
            dict(key='school', spr='school', rect=(17, 15, 25, 18), width=9, door=[(21, 19), (22, 19)], script='exk2_school'),
            dict(key='house3', spr='house', rect=(31, 14, 35, 15), width=3, door=[(33, 16)], script='exk2_house'),
            dict(key='dive', spr='dive', rect=(7, 18, 10, 19), width=4, door=[(8, 20), (9, 20)], script='exk2_dive'),
            dict(key='fish', spr='fish', rect=(32, 18, 35, 19), width=4, door=[(33, 20), (34, 20)], script='exk2_fish'),
        ],
        exits=[('t', [(22, 26), (23, 26)])],
        entry=(22, 21, 'up'),
        people={'ok_seiyu': (7, 13, 'down'), 'ok_umi': (10, 23, 'right'), 'ok_sanshin': (11, 16, 'left'), 'ok_kana': (19, 20, 'right'),
                'ok_hirugi': (28, 14, 'down'), 'ok_taiyo': (13, 23, 'down'), 'ok_masako': (30, 8, 'down'), 'ok_kenta': (14, 9, 'down'),
                'ok_alex': (25, 20, 'left'), 'ok_nagisa2': (16, 9, 'down')},
        children={'ok_kana'},
    ),
    'hokkaido': dict(
        region='9_Hokkaido', back=('town', 27, 20, 'down'),
        sprites={'barn': 0, 'cheese': 1, 'station': 2, 'ramen': 3, 'gym': 4, 'ice': 5, 'library': 6, 'bakery': 7},
        base='.',
        ops=[('T', 0, 0, 17, 1), ('T', 20, 0, 41, 1), ('T', 0, 2, 2, 23), ('T', 0, 24, 16, 24), ('T', 20, 24, 41, 24), ('T', 0, 25, 16, 27), ('T', 20, 25, 41, 27),
             ('T', 38, 0, 41, 2), ('T', 38, 22, 41, 23)],
        plots=[
            dict(key='barn', spr='barn', rect=(4, 3, 11, 7), width=7, door=[(7, 8), (8, 8)], script='exh2_barn'),
            dict(key='cheese', spr='cheese', rect=(14, 3, 16, 7), width=3, door=[(15, 8)], script='exh2_cheese'),
            dict(key='gym', spr='gym', rect=(21, 3, 28, 5), width=7, door=[(24, 6), (25, 6)], script='exh2_gym'),
            dict(key='ramen', spr='ramen', rect=(21, 9, 23, 11), width=3, door=[(22, 12)], script='exh2_ramen'),
            dict(key='bakery', spr='bakery', rect=(26, 9, 28, 11), width=3, door=[(27, 12)], script='exh2_bakery'),
            dict(key='library', spr='library', rect=(12, 13, 15, 15), width=4, door=[(13, 16), (14, 16)], script='exh2_library'),
            dict(key='ice', spr='ice', rect=(23, 15, 26, 16), width=4, door=[(24, 17), (25, 17)], script='exh2_ice'),
            dict(key='station', spr='station', rect=(21, 20, 27, 21), width=6, door=[(23, 22), (24, 22)], script='exh2_station'),
            dict(key='farm1', spr='cheese', rect=(5, 20, 8, 21), width=4, door=[(6, 22)], script='exh2_farm'),
            dict(key='farm2', spr='library', rect=(11, 20, 14, 21), width=4, door=[(12, 22)], script='exh2_farm'),
        ],
        exits=[('s', [18, 19])],
        entry=(18, 26, 'up'),
        people={'hk_gorou': (6, 9, 'down'), 'hk_chiaki': (17, 9, 'down'), 'hk_tomoya': (28, 22, 'left'), 'hk_hotaru': (23, 13, 'down'),
                'hk_ryo': (23, 7, 'down'), 'hk_utako': (12, 10, 'right'), 'hk_ken2': (33, 12, 'down'), 'hk_mizuho': (11, 16, 'right'),
                'hk_pierre': (28, 12, 'down'), 'hk_yukko': (17, 17, 'left')},
        children={'hk_yukko'},
    ),
    'nara': dict(
        region='10_Nara', back=('town', 27, 20, 'down'),
        sprites={'pagoda': 0, 'hall': 1, 'brush': 2, 'cracker': 3, 'museum': 4, 'inn': 5, 'tea': 6, 'toy': 7},
        base='.',
        ops=[('T', 0, 0, 23, 1), ('T', 27, 0, 41, 1), ('T', 0, 0, 0, 27), ('T', 41, 0, 41, 27), ('T', 0, 8, 23, 9), ('T', 27, 8, 41, 9), ('T', 21, 12, 29, 15),
             ('T', 0, 27, 23, 27), ('T', 27, 27, 41, 27), ('T', 6, 24, 40, 24), ('T', 0, 25, 3, 27), ('T', 38, 25, 40, 27), ('T', 21, 10, 21, 11)],
        plots=[
            dict(key='hall', spr='hall', rect=(8, 3, 18, 8), width=9, door=[(12, 9), (13, 9)], script='exn_hall', wall=True),
            dict(key='pagoda', spr='pagoda', rect=(33, 3, 36, 8), width=4, door=[(34, 9), (35, 9)], script='exn_pagoda', wall=True),
            dict(key='museum', spr='museum', rect=(3, 12, 7, 15), width=5, door=[(4, 16), (5, 16)], script='exn_museum', wall=True),
            dict(key='brush', spr='brush', rect=(8, 21, 11, 23), width=4, door=[(9, 24), (10, 24)], script='exn_brush', wall=True),
            dict(key='tea', spr='tea', rect=(14, 21, 16, 23), width=3, door=[(15, 24)], script='exn_tea', wall=True),
            dict(key='inn', spr='inn', rect=(19, 21, 23, 23), width=4, door=[(21, 24), (22, 24)], script='exn_inn', wall=True),
            dict(key='toy', spr='toy', rect=(25, 21, 28, 23), width=4, door=[(26, 24), (27, 24)], script='exn_toy', wall=True),
            dict(key='cracker', spr='cracker', rect=(31, 21, 34, 23), width=3, door=[(32, 24), (33, 24)], script='exn_cracker', wall=True),
            dict(key='house', spr='brush', rect=(36, 21, 39, 23), width=4, door=[(37, 24), (38, 24)], script='exn_house', wall=True),
        ],
        exits=[('s', [24, 25])],
        entry=(24, 26, 'up'),
        people={'nr_kou': (14, 13, 'down'), 'nr_shinkai': (13, 11, 'down'), 'nr_fude': (9, 26, 'up'), 'nr_senbei': (32, 26, 'up'),
                'nr_emi': (5, 18, 'down'), 'nr_okami': (21, 26, 'up'), 'nr_daigo': (28, 26, 'up'), 'nr_tsubasa': (30, 16, 'left'),
                'nr_lena': (6, 10, 'down'), 'nr_taiko': (25, 11, 'down')},
        children={'nr_tsubasa'},
    ),
}


def grid_of(name, spec):
    if spec.get('base'):  # painted maps whose colours fool the guess: walkable unless the corrections block it
        g = [[spec['base']] * W for _ in range(H)]
    else:
        g = [list(r) for r in guess(os.path.join(S, f'ground_ex_{name}_draft.webp'), asphalt_blocks=False)]
    for ch, x0, y0, x1, y1 in spec['ops']:
        for y in range(max(0, y0), min(H - 1, y1) + 1):
            for x in range(max(0, x0), min(W - 1, x1) + 1):
                g[y][x] = ch
    for p in spec['plots']:
        x0, y0, x1, y1 = p['rect']
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                g[y][x] = 'T'
        for x, y in p['door']:
            if g[y][x] in 'T~' and not p.get('wall'):
                g[y][x] = '.'
    for x, y, _ in spec['people'].values():
        g[y][x] = '.'
    return g


def people_of(spec):
    return next(r for r in REGIONS if r[0] == spec['region'])[-1]


def cut_people(name, spec):
    """walking sheets: blocks of 4 x 4 cells of 128 px (rows down / left / right / up), 3 + 2 blocks; portraits: one row each"""
    people = [p[0] for p in people_of(spec)]
    for part, group in (('a', people[:5]), ('b', people[5:])):
        a = load(f'hm_chars_ex_{name}_{part}.webp')
        fg = ndimage.binary_opening(~magenta_mask(a))
        for i, who in enumerate(group):
            br, bc = divmod(i, 3)
            cell = 128
            imgs = [cut(a, fg, ((bc * 4 + c) * cell, (br * 4 + r) * cell, (bc * 4 + c + 1) * cell, (br * 4 + r + 1) * cell))
                    for r in range(4) for c in range(4)]
            tallest = max(im.height for im in imgs)
            h = CHILD_HEIGHT if who in spec.get('children', set()) else HEIGHT
            for k, d in enumerate(['down', 'left', 'right', 'up']):
                im = imgs[k * 4]
                resize_px(im, max(8, round(im.height * h / tallest))).save(os.path.join(OUT, f'npc_{who}_{d}.png'))
        p = load(f'portraits_ex_{name}_{part}.webp')
        pfg = ndimage.binary_opening(~magenta_mask(p), iterations=2)
        rows = runs(pfg.sum(1), 60)
        if len(rows) != len(group):
            y0, y1 = rows[0][0], rows[-1][1]
            rows = [(y0 + r0, y0 + r1) for r0, r1 in split_n(pfg[y0:y1].sum(1), len(group))]
        for who, (y0, y1) in zip(group, rows):
            cols = runs(pfg[y0:y1].sum(0), 60)
            if len(cols) != 4:
                x0, x1 = cols[0][0], cols[-1][1]
                cols = [(x0 + c0, x0 + c1) for c0, c1 in split_n(pfg[y0:y1, x0:x1].sum(0), 4)]
            for expr, (x0, x1) in zip(['neutral', 'happy', 'surprised', 'worried'], cols):
                sub = p[y0:y1, x0:x1]
                m = ndimage.binary_fill_holes(pfg[y0:y1, x0:x1] & ~strict_bg(sub)) & ~strict_bg(sub)
                pinkish = (sub[:, :, 0] - sub[:, :, 1] > 40) & (sub[:, :, 2] - sub[:, :, 1] > 40)
                for _ in range(3):
                    edge = m & ~ndimage.binary_erosion(m)
                    m &= ~(edge & pinkish)
                resize_px(trim(to_rgba(sub, m)), 104).save(os.path.join(OUT, f'portrait_{who}_{expr}.png'))


def build(name, spec):
    sheet_name = f'exterior_ex_{name}'
    sheet(sheet_name)
    g = grid_of(name, spec)
    cache, objs, wps = {}, [], []

    def sprite(key, spr, width):
        if spr not in cache:
            cache[spr] = piece(sheet_name, spec['sprites'][spr], scale=1)
        img = cache[spr]
        out = resize_px(img, round(img.height * width * T / img.width))
        out.save(os.path.join(OUT, f'bx_ex_{name}_{key}.png'))
        return f'bx_ex_{name}_{key}'

    for p in spec['plots']:
        x0, y0, x1, y1 = p['rect']
        objs.append({'id': f'ex_{name}_{p["key"]}', 'sprite': sprite(p['key'], p['spr'], p['width']), 'x': x0, 'y': y0, 'w': x1 - x0 + 1,
                     'h': y1 - y0 + 1, 'at': [round((x0 + x1 + 1) / 2 * T), (y1 + 1) * T], **({'decor': True} if p.get('room') else {'script': p['script'], 'interactAt': [{'x': x, 'y': y} for x, y in p['door']]})})
    for d in spec.get('deco', []):
        objs.append({'id': f'ex_{name}_{d["key"]}', 'sprite': sprite(d['key'], d['spr'], d['width']), 'x': d['x'], 'y': d['y'], 'w': 1, 'h': 1,
                     'solid': False, 'decor': True, 'at': [round((d['x'] + d['width'] / 2) * T), d['at_y'] * T]})
    bm, bx, by, bf = spec['back']
    for side, vs in spec['exits']:
        for v in vs:
            # an edge of the map, or ('t') given tiles anywhere (the tip of a pier)
            x, y = v if side == 't' else {'n': (v, 0), 's': (v, H - 1), 'w': (0, v), 'e': (W - 1, v)}[side]
            g[y][x] = '.'
            wps.append({'x': x, 'y': y, 'to': {'map': bm, 'x': bx, 'y': by, 'facing': bf}})
    Image.open(os.path.join(S, f'ground_ex_{name}_draft.webp')).convert('RGB').resize((W * T, H * T), Image.LANCZOS).save(os.path.join(OUT, f'map_ex_{name}.png'))
    npcs = [{'id': who, 'x': x, 'y': y, 'facing': f} for who, (x, y, f) in spec['people'].items()]
    reg = next(r for r in REGIONS if r[0] == spec['region'])
    people = [[p[0], p[1], p[2], p[3]] for p in reg[-1]]
    return {'title': list(reg[1:4]), 'tiles': [''.join(r) for r in g], 'objects': objs, 'warps': wps, 'npcs': npcs, 'entry': list(spec['entry']),
            'people': people, 'children': sorted(spec.get('children', set()))}


def overlay(name, m, d):
    im = Image.open(os.path.join(OUT, f'map_ex_{name}.png')).convert('RGBA')
    for o in m['objects']:
        b = Image.open(os.path.join(OUT, o['sprite'] + '.png')).convert('RGBA')
        im.alpha_composite(b, (round(o['at'][0] - b.width / 2), o['at'][1] - b.height))
    for n in m['npcs']:
        b = Image.open(os.path.join(OUT, f'npc_{n["id"]}_{n["facing"]}.png')).convert('RGBA')
        im.alpha_composite(b, (n['x'] * T + 16 - b.width // 2, n['y'] * T + 30 - b.height))
    ov = Image.new('RGBA', im.size, (0, 0, 0, 0))
    dr = ImageDraw.Draw(ov)
    for y, r in enumerate(m['tiles']):
        for x, ch in enumerate(r):
            if ch == 'T':
                dr.rectangle([x * T, y * T, x * T + T - 1, y * T + T - 1], fill=(255, 0, 0, 80))
    for o in m['objects']:
        for t in o.get('interactAt', []):
            dr.rectangle([t['x'] * T, t['y'] * T, t['x'] * T + T - 1, t['y'] * T + T - 1], fill=(0, 255, 0, 110))
    for w in m['warps']:
        dr.rectangle([w['x'] * T, w['y'] * T, w['x'] * T + T - 1, w['y'] * T + T - 1], fill=(255, 0, 255, 140))
    res = Image.alpha_composite(im, ov).convert('RGB')
    dd = ImageDraw.Draw(res)
    for x in range(0, W, 2):
        for y in range(0, H, 2):
            dd.text((x * T + 2, y * T + 1), f'{x},{y}', fill=(255, 255, 0))
    res.save(os.path.join(d, f'chk_ex_{name}.png'))


def main():
    only = sys.argv[sys.argv.index('--only') + 1].split(',') if '--only' in sys.argv else list(DISTRICTS)
    path = os.path.join(ROOT, 'src', 'content', 'expansion.gen.ts')
    maps = {}
    if os.path.exists(path):
        txt = open(path, encoding='utf-8').read()
        maps = json.loads(txt[txt.index('= ') + 2:txt.rindex(';')])
    for name in only:
        spec = DISTRICTS[name]
        cut_people(name, spec)
        maps[name] = build(name, spec)
        if '--overlay' in sys.argv:
            d = sys.argv[sys.argv.index('--overlay') + 1]
            os.makedirs(d, exist_ok=True)
            overlay(name, maps[name], d)
        print('district', name)
    ts = ('/* generated by tools/build_expansion.py — do not edit */\nimport type { MapObject, Warp } from \'./maps\';\n\n'
          'export const EXPANSION_GEN: Record<string, { tiles: string[]; objects: MapObject[]; warps: Warp[]; npcs: { id: string; x: number; y: number; facing: \'up\' | \'down\' | \'left\' | \'right\' }[]; entry: [number, number, string]; '
          'title: [string, string, string]; people: [id: string, ja: string, role: string, roleDe: string][]; children: string[] }> = '
          + json.dumps(maps, ensure_ascii=False, indent=1) + ';\n')
    open(path, 'w', encoding='utf-8').write(ts)


if __name__ == '__main__':
    main()
