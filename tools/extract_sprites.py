"""Extract and downscale sprites from art/concept-sheet.webp into public/assets.

The concept sheet already has a transparent background. Each sprite is cropped,
trimmed, downscaled with a box filter (to approximate the underlying pixel grid)
and its alpha is hardened so it renders crisply with nearest-neighbour scaling.

Run: python3 tools/extract_sprites.py
"""
import os
import numpy as np
from PIL import Image

SRC = os.path.join(os.path.dirname(__file__), '..', 'art', 'concept-sheet.webp')
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets')

# name: (x, y, w, h, target_height or None for 'keep scale', scale)
SPRITES = {
    # characters (front / side / back)
    'hero_down': (256, 21, 63, 122, 40),
    'hero_side': (327, 22, 54, 121, 40),
    'hero_up': (392, 24, 51, 119, 40),
    'boy_down': (28, 18, 60, 126, 40),
    'boy_side': (103, 23, 59, 118, 40),
    'boy_up': (171, 24, 55, 117, 40),
    'kimono_m': (477, 13, 66, 140, 42),
    'kimono_f': (555, 28, 56, 126, 38),
    # kotodama
    'k_fox_blue': (8, 156, 77, 82, 64),
    'k_fox_pink': (87, 157, 71, 82, 64),
    'k_sprout': (172, 165, 54, 76, 56),
    'k_bird_blue': (239, 163, 66, 72, 58),
    'k_fox_orange': (315, 163, 97, 78, 62),
    'k_puff': (418, 186, 84, 57, 48),
    'k_fox_black': (8, 249, 86, 86, 68),
    'k_fox_winged': (104, 257, 76, 82, 68),
    'k_sprout2': (186, 256, 57, 85, 64),
    'k_blob_pink': (245, 260, 68, 63, 52),
    'k_bird_white': (325, 257, 83, 84, 68),
    'k_cat_black': (429, 262, 76, 78, 62),
    # buildings and props (world)
    'b_inn': (641, 10, 281, 179, 132),
    'b_house_blue': (6, 353, 132, 129, 100),
    'b_house_trad': (140, 358, 122, 135, 100),
    'b_konbini': (262, 358, 143, 135, 108),
    'b_shop_red': (405, 358, 113, 135, 108),
    'b_bridge': (531, 354, 155, 141, 112),
    'p_sakura': (513, 162, 140, 159, 112),
    'p_shrine': (659, 201, 148, 151, 120),
    'p_pond': (805, 207, 129, 86, 60),
    'p_garden': (806, 304, 143, 90, 62),
    'p_lamp': (689, 360, 36, 122, 52),
    'p_signpost': (742, 379, 59, 99, 40),
    'p_board': (814, 408, 65, 59, 30),
    'p_board2': (889, 397, 82, 73, 36),
    'p_mailbox': (983, 393, 30, 60, 26),
    'p_sign_nihon': (1027, 356, 37, 91, 40),
    'p_banner': (1072, 349, 41, 121, 60),
    'p_sign_small': (983, 353, 34, 30, 16),
    'room': (938, 166, 179, 171, None),
    # landscapes (battle / region backdrops) — kept at near-native size
    'bg_sea': (10, 510, 119, 151, None),
    'bg_mountain': (134, 501, 126, 156, None),
    'bg_forest': (263, 503, 148, 159, None),
    'bg_night': (418, 510, 94, 146, None),
    'bg_bridge': (515, 515, 120, 145, None),
    # ui
    'portrait_hero': (853, 489, 58, 63, None),
    'i_backpack': (1011, 15, 38, 45, None),
    'i_book': (1060, 21, 42, 37, None),
    'i_map': (957, 69, 41, 45, None),
    'i_scroll': (1008, 70, 41, 42, None),
    'i_gear': (1060, 70, 42, 44, None),
    'i_letter': (958, 122, 39, 31, None),
    'i_heart': (649, 504, 22, 22, None),
    'i_star': (747, 595, 28, 28, None),
    'i_coin': (779, 595, 27, 28, None),
    'i_tome': (807, 595, 32, 30, None),
    'i_leaf': (747, 631, 28, 33, None),
    'i_sakura': (783, 632, 32, 32, None),
    'i_orb_blue': (780, 560, 27, 28, None),
    'i_orb_pink': (809, 560, 29, 28, None),
    'e_memory': (18, 680, 41, 43, None),
    'e_water': (73, 681, 32, 42, None),
    'e_fire': (116, 681, 38, 42, None),
    'e_nature': (162, 681, 32, 39, None),
    'e_knowledge': (202, 680, 39, 40, None),
    'e_emotion': (249, 684, 39, 39, None),
    'e_lightning': (298, 685, 34, 35, None),
    'e_wind': (342, 681, 39, 42, None),
}


def trim(img):
    a = np.array(img)[:, :, 3]
    ys, xs = np.where(a > 40)
    if len(xs) == 0:
        return img
    return img.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def harden(img):
    arr = np.array(img).astype(np.int32)
    alpha = arr[:, :, 3]
    arr[:, :, 3] = np.where(alpha > 110, 255, 0)
    return Image.fromarray(arr.astype(np.uint8), 'RGBA')


def premultiplied_resize(img, size):
    # resize with premultiplied alpha so transparent edges do not bleed dark fringes
    arr = np.array(img).astype(np.float32) / 255.0
    rgb = arr[:, :, :3] * arr[:, :, 3:4]
    pm = np.concatenate([rgb, arr[:, :, 3:4]], axis=2)
    chans = [Image.fromarray((pm[:, :, i] * 255).astype(np.uint8), 'L').resize(size, Image.BOX) for i in range(4)]
    out = np.stack([np.array(c).astype(np.float32) / 255.0 for c in chans], axis=2)
    a = out[:, :, 3:4]
    safe = np.where(a > 0, a, 1)
    out[:, :, :3] = np.clip(out[:, :, :3] / safe, 0, 1)
    return Image.fromarray((out * 255).astype(np.uint8), 'RGBA')


def main():
    os.makedirs(OUT, exist_ok=True)
    sheet = Image.open(SRC).convert('RGBA')
    for name, (x, y, w, h, target_h) in SPRITES.items():
        img = trim(sheet.crop((x, y, x + w, y + h)))
        if target_h:
            scale = target_h / img.height
            size = (max(1, round(img.width * scale)), target_h)
            img = harden(premultiplied_resize(img, size))
        img.save(os.path.join(OUT, name + '.png'))
    # mirrored side views for left-facing variants
    for base in ('hero', 'boy'):
        Image.open(os.path.join(OUT, base + '_side.png')).transpose(Image.FLIP_LEFT_RIGHT).save(
            os.path.join(OUT, base + '_side_flip.png'))
    print('extracted', len(SPRITES), 'sprites')


if __name__ == '__main__':
    main()
