"""
Cut trees, bushes and outdoor props from the Hinomori outdoor sheets
(art/sheets/hm_outdoor_props_v2.webp) and save them under the
existing sprite keys, so the town and forest use them without map changes.

Run: python3 tools/build_outdoor.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from build_rooms import piece  # noqa: E402
from extract_sheets import OUT, resize_px  # noqa: E402

# sheet: [(index, sprite key(s), width in game px)]
PIECES = {
    'outdoor_props_v2': [
        (0, ['n_tree_round'], 64), (1, ['n_tree_sakura', 'p_sakura'], 70), (2, ['n_tree_cedar'], 50),
        (3, ['n_tree_maple'], 64), (4, ['n_tree_pine'], 46), (5, ['n_bush'], 30), (6, ['n_bush_flowers'], 30),
        (7, ['n_hedge'], 62),
        (8, ['p_lamp'], 20), (9, ['tp_pole'], 40), (10, ['tp_lantern', 'n_lantern'], 28), (11, ['tp_hokora'], 34),
        (12, ['tp_torii'], 96), (14, ['tp_bench'], 58), (13, ['tp_postbox', 'p_mailbox'], 24), (15, ['tp_vending'], 32),
        (19, ['tp_bicycle'], 62), (18, ['tp_mirror'], 22), (16, ['p_board2', 'p_board'], 44), (17, ['p_signpost'], 30),
        (20, ['tp_planter_y', 'tp_planter_p', 'tp_pot_flower'], 30), (21, ['tp_barrel'], 26),
        (22, ['n_rock'], 30), (23, ['g_stump'], 28), (24, ['n_log'], 60), (25, ['g_mushrooms'], 24),
        (26, ['n_jizo'], 26), (27, ['p_sign_small'], 30),
    ],
}
# see-through pieces: drop magenta showing between the spokes
DEPINK = {('outdoor_props_v2', 19)}


def main():
    for sh, items in PIECES.items():
        for idx, keys, width in items:
            img = piece(sh, idx, scale=1, depink=(sh, idx) in DEPINK)
            img = resize_px(img, max(8, round(img.height * width / img.width)))
            for k in keys:
                img.save(os.path.join(OUT, f'{k}.png'))
    print(', '.join(k for items in PIECES.values() for _, ks, _ in items for k in ks))


if __name__ == '__main__':
    main()
