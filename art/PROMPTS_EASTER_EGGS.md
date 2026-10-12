# Images for the easter eggs (ひみつ)
Same procedure as before: one section = one message to GPT.
All pictures are delivered and in the game (sources in `art/sheets/`: hm_item_koban.webp,
cg_egg_*.webp; `python3 tools/build_valley_assets.py` rebuilds them).

| Secret | How to find it | Picture |
| --- | --- | --- |
| 猫に小判 | talk to the calico cat in town ten times | item icon (1) |
| お正月 | talk to Ms. Mori on 1–3 January (real date) | story picture A |
| 七夕 | examine the shrine on 7 July (real date) | story picture B |
| 夜ふかし | examine the small roadside shrine in town between 0:00 and 4:00 (real time) | story picture C |
| 鏡の向こう | look into the traffic mirror in town thirteen times | story picture D |
| 当たり！ | buy a drink at the vending machine (1 in 20 wins a second one) | — |
| 昔の呪文 | press ↑ ↑ ↓ ↓ ← → ← → B A while walking | — |
| 一万歩 | walk 10,000 steps | — |
| もう一人のK | start a new game named K (or ケイ / Kei), then visit Kaede after chapter 1's letter | — |

## 1_Item_Koban: the gold coin

**Attach:** hm_style.webp, hm_items_valley.webp

```
16-bit top-down RPG pixel art in exactly the same warm style as the attached images (clean dark warm-brown outline, no anti-aliasing, no blur, light from the top-left).
ONE item icon in exactly the same style and size as the attached item sheet (about 64 × 64 px): an old Japanese oval gold coin (koban), standing upright, with the typical horizontal stamped lines and a small round stamp mark, shiny gold with a warm highlight on the upper left.
Centred on a plain pure magenta (#FF00FF) background, no text. Square 1024 × 1024.
```

## 2_Story_Bilder_Geheimnisse: four story pictures (ONE picture per message)

**Attach:** hm_style.webp, cg_valley_arrival.webp, cg_mountain_hearth.webp, hm_chars_main.webp

```
Story illustration (cut-scene picture) in exactly the same painted anime-pixel style as the attached story pictures. The heroine is Maria (pink cap, long light-brown wavy hair, pink jacket). Her companion is a small snow-white fox spirit with pale blue ear tips.
Picture 16:9 (1536 × 864), no text, no speech bubbles.

Send this message FOUR times and add one of these lines each time:

Picture A (New Year): Morning of New Year's Day in a small Japanese town. In front of an old apartment house with a kadomatsu (pine and bamboo decoration) by the door, a kind elderly landlady (about 70, grey hair in a bun, lavender cardigan over a kimono-style top) smiles and hands Maria a small decorated red-and-white envelope (otoshidama). Clear winter sky, a little frost, the white fox looks at the envelope curiously.

Picture B (Tanabata): A summer evening at a small Shinto shrine. A tall bamboo branch is covered in colourful paper strips (tanzaku) and paper decorations; Maria, in a light summer yukata with a cap, ties her own strip to the bamboo on tiptoe. Behind the shrine roof the Milky Way shines across a deep blue sky, fireflies float in the air, the white fox sits beside her.

Picture C (Midnight): Deep night in the town. A tiny roadside stone shrine (hokora) with a single candle burning, fresh flowers in front. Maria stands before it in a hoodie, surprised, looking over her shoulder; behind her, barely visible in the candle light, the faint transparent outline of an old woman's kind smiling face, like a warm ghost. Quiet street, a single street lamp, stars. Gentle and mysterious, not scary.

Picture D (Mirror): A curved traffic mirror (orange pole, round convex mirror) at a quiet street corner on a sunny afternoon. Maria peers into it, seen from slightly behind. In the warped reflection, instead of only Maria, the small white fox spirit with blue ear tips waves a paw at her from INSIDE the mirror, while the real fox sits at her feet outside the mirror, looking puzzled.
```
