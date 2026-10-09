"""
Cut trees, bushes and outdoor props from the Hinomori outdoor sheets
(art/sheets/hm_trees.webp, hm_props.webp, hm_forest_props.webp) and save them under the
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
    'trees': [
        (0, ['n_tree_round'], 64), (3, ['n_tree_sakura', 'p_sakura'], 70), (1, ['n_tree_cedar'], 50),
        (4, ['n_tree_maple'], 64), (5, ['n_tree_pine'], 46), (6, ['n_bush'], 30), (7, ['n_bush_flowers'], 30),
        (8, ['n_hedge'], 62),
    ],
    'props': [
        (0, ['p_lamp'], 20), (1, ['tp_pole'], 40), (3, ['tp_lantern', 'n_lantern'], 28), (4, ['tp_hokora'], 40),
        (2, ['tp_torii'], 96), (7, ['tp_bench'], 58), (5, ['tp_postbox', 'p_mailbox'], 24), (6, ['tp_vending'], 32),
        (8, ['tp_bicycle'], 62), (9, ['tp_mirror'], 22), (10, ['p_board2', 'p_board'], 44), (11, ['p_signpost'], 26),
        (12, ['tp_planter_y', 'tp_planter_p'], 32), (13, ['tp_barrel'], 26),
    ],
    'forest_props': [
        (0, ['n_rock'], 30), (1, ['g_stump'], 28), (2, ['n_log'], 60), (3, ['n_jizo'], 26),
        (4, ['p_sign_small'], 26), (5, ['g_mushrooms'], 26),
    ],
}


def main():
    for sh, items in PIECES.items():
        for idx, keys, width in items:
            img = piece(sh, idx, scale=1)
            img = resize_px(img, max(8, round(img.height * width / img.width)))
            for k in keys:
                img.save(os.path.join(OUT, f'{k}.png'))
    print(', '.join(k for items in PIECES.values() for _, ks, _ in items for k in ks))


if __name__ == '__main__':
    main()
