# Nachrichten an GPT (einfach kopieren)

Jede Nachricht einzeln an GPT schicken, die genannten Bilder anhängen.

---

## Nachricht 1: Fehlende Figuren

**Anhängen:** `hm_characters.webp`

```
Please create a new sprite sheet that matches the attached character sheet exactly: same pixel-art style, same size and proportions, same outlines and colours.

Draw 6 characters. Each character is one block of walking frames: 4 columns × 3 rows.
- Row 1: walking towards the viewer (facing down)
- Row 2: walking to the left (side view)
- Row 3: walking away from the viewer (back view)
- In each row: standing, left foot forward, standing, right foot forward

Leave out the large preview figure, the bags and the ground shadow. No text.
Leave a clear gap between all frames, and a bigger gap between the characters. Arrange the blocks in 2 rows of 3.

The 6 characters:
1. Dr. Kirishima: researcher, about 35, messy black hair, white lab coat over a dark turtleneck, dark trousers
2. Old regular customer: about 75, brown flat cap, beige jacket, walking cane, short grey beard
3. High-school girl: short black bob, white blouse with a red ribbon, navy pleated skirt, black school bag
4. Office worker: about 30, short black hair, dark grey suit, tie, briefcase
5. Delivery worker: blue cap, blue work uniform, carrying a cardboard parcel
6. Grandmother: about 75, short grey curly hair, lavender cardigan, long skirt

Background: plain pure magenta (#FF00FF) everywhere. Landscape format 1536 × 1024.
```

---

## Nachricht 2: Tiere

**Anhängen:** `hm_characters.webp`

```
Please create an animal sprite sheet in exactly the same pixel-art style and scale as the attached character sheet. The animals are a bit smaller than a person.

Draw 3 animals. Each animal is one block of walking frames: 4 columns × 3 rows.
- Row 1: walking towards the viewer
- Row 2: walking to the left (side view)
- Row 3: walking away from the viewer
- 4 walking steps per row

No ground shadow, no text. Leave a clear gap between all frames, and a bigger gap between the animals. Put the 3 blocks next to each other.

1. Calico cat (white, orange and black patches)
2. Shiba inu dog (orange and cream, curled tail)
3. Small brown sparrow (hopping)

Background: plain pure magenta (#FF00FF) everywhere. Landscape format 1536 × 1024.
```

---

## Nachricht 3 (optional): Ort noch genauer

Nur nötig, falls der Ort noch schöner oder genauer werden soll. Der jetzige Boden ist schon im Spiel.

**Anhängen:** `town_ground_current.png` (aktueller Boden) und `ground_town_draft.webp` (dein letztes GPT-Bild)

```
The first picture is the current ground of a top-down pixel-art RPG town. Please repaint exactly this picture in the style of the second picture: richer grass with flowers, a stone-paved street with kerbs, a natural river with stones and reeds, a wooden bridge, a station platform with a yellow tactile strip, railway tracks on gravel, and a wooden fence.

Important: keep EVERYTHING in exactly the same place and size as in the first picture: street, path, river, bridge, pond, platform, tracks, fence, the forest edge, and the paved area to the right of the bridge. Do not add, move or remove anything.
No buildings, no trees standing on the grass, no people, no text. Same aspect ratio as the first picture (1408 × 960).
```
