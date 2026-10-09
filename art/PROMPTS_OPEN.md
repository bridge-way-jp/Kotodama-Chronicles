# Offene Bilder: fertige Prompts für GPT

Jeder Prompt ist komplett und kann direkt kopiert werden.
**Bei jedem Prompt diese Bilder anhängen:** `art/sheets/hm_style.webp` (Blatt 0) und `art/sheets/hm_characters.webp` (Figuren-Blatt).
Zusätzliche Anhänge stehen beim jeweiligen Prompt.

Format in GPT: **Querformat 1536 × 1024**, wenn nichts anderes dabeisteht.

---

## 1. Fehlende Figuren (Laufbilder)

```
16-bit top-down RPG pixel art, exactly the same style, size, proportions, outline and colours as the attached character sheet (chibi characters, warm palette, dark warm-brown outlines, no anti-aliasing, no blur).
Walking sprite sheet. Each character is one BLOCK: a grid of 4 columns × 3 rows of walk frames.
Row 1: facing DOWN (towards the viewer). Row 2: facing LEFT (profile, looking left). Row 3: facing UP (back view).
The 4 frames in a row are a walk cycle: standing, left foot forward, standing, right foot forward.
NO large preview figure, NO bags, NO ground shadow, NO text or labels.
All frames the same size. At least 24 px of empty background between frames and 80 px between blocks. 3 blocks per row, 2 rows of blocks.
Blocks (left to right, top to bottom):
1. Dr. Kirishima: researcher, about 35, messy black hair, white lab coat over a dark turtleneck, dark trousers
2. Regular customer: old man, about 75, brown flat cap, beige jacket, walking cane in his right hand, short grey beard
3. High-school girl: short black bob, white blouse with red ribbon, navy pleated skirt, black school bag
4. Salaryman: about 30, short black hair, dark grey suit, tie, briefcase
5. Delivery worker: blue cap, blue work uniform, carrying a cardboard parcel
6. Grandmother: about 75, short grey curly hair, lavender cardigan, long skirt
Background: flat pure magenta #FF00FF everywhere.
```

## 2. Tiere (Laufbilder)

```
16-bit top-down RPG pixel art, exactly the same style, scale and outline as the attached character sheet. Animals are about 1 tile big (a bit smaller than a person).
Each animal is one BLOCK: a grid of 4 columns × 3 rows.
Row 1: walking DOWN towards the viewer. Row 2: walking LEFT (side view). Row 3: walking UP (seen from behind).
4-frame walk cycle per row. NO ground shadow, NO text.
At least 24 px of empty background between frames and 80 px between blocks. Blocks side by side in one row.
Blocks: 1. calico cat (white, orange and black patches), 2. shiba inu dog (orange and cream, curled tail), 3. small brown sparrow (hopping).
Background: flat pure magenta #FF00FF everywhere.
```

---

## 3. Boden vom Ort Hinomori

**Zusätzlich anhängen:** `art/reference/layout_town.png` (Lageplan), `art/sheets/hm_exterior.webp` (Gebäude) und `art/sheets/room_station_v2.webp` (für den Stil).
Format: **Querformat 1536 × 1024**.

```
16-bit top-down RPG pixel art in the same warm style and 3/4 top-down view as the attached sheets (dark warm-brown outlines, no anti-aliasing, no blur, light from the top-left).
Paint ONLY THE GROUND of a whole small Japanese country town (Hinomori) as one map picture.
FOLLOW THE ATTACHED COLOUR LAYOUT PLAN EXACTLY: same shapes, same positions, same proportions, filling the whole picture edge to edge. Every area of the plan must land on the same spot in the picture.
Colours in the plan mean:
- light green = lush grass with small variations; slightly lighter squares = little flower patches
- mid green = tall grass; dark green = dense forest wall (tree crowns seen from above, dark, not walkable)
- beige = soft dirt path with grassy edges; grey = paved town street with kerb stones; light grey = concrete square
- blue = river and pond with soft shorelines, reeds and stones; brown on the river = wooden bridge with railings
- very light = station platform tiles; yellow = platform edge with yellow tactile strip; dark brown = two railway tracks on gravel; the brown line below the tracks = low wooden fence
- pink = stone-paved shrine forecourt
- RED BOXES = building plots: paint only plain ground there (grass or paving matching the surroundings), the buildings are added later
- white frames = ignore, small objects are added later
Paint NO buildings, NO standing trees, NO lamps, signs, benches, people, animals or text. Only ground and flat things lying on the ground (paths, flower beds, stones, fallen sakura petals, manhole covers, drain grates, puddles).
```

## 4. Boden vom Midori-Wald

**Zusätzlich anhängen:** `art/reference/layout_forest.png` (Lageplan).
Format: **quadratisch 1024 × 1024**.

```
16-bit top-down RPG pixel art in the same warm style and 3/4 top-down view as the attached sheets (dark warm-brown outlines, no anti-aliasing, no blur), soft light falling through leaves, a little magical.
Paint ONLY THE GROUND of a mysterious green forest area (Midori Forest) as one map picture.
FOLLOW THE ATTACHED COLOUR LAYOUT PLAN EXACTLY: same shapes and positions, filling the whole picture edge to edge.
Colours in the plan mean:
- light green = mossy forest floor with clover and small mushrooms
- mid green = tall grass (where wild creatures hide)
- dark green = dense forest wall (tree crowns seen from above, dark, not walkable)
- beige = narrow dirt path with roots and stepping stones
- brown band = a low rocky cliff ledge running left to right; the lighter spot in it = stone stairs up the cliff
- blue = small clear pond with lily pads
- RED BOX at the top = small clearing with old stone paving (the ancient shrine stone is added later, paint only the ground)
Paint NO standing trees, NO signs, NO shrine stone, NO creatures, NO text. Only ground and flat things on it.
```

## 5. Bäume und Deko für draußen (einzeln)

**Zusätzlich anhängen:** dein fertiges Bild aus Prompt 3 (Ort), damit Stil und Licht passen.

```
16-bit top-down RPG pixel art, same style, light and 3/4 top-down angle as the attached town ground picture and sheets. Separate objects for placing on the map, each one alone, at least 24 px empty background between them, NO ground shadow, NO text.
Trees (each about 2 tiles wide and 3 tiles tall incl. crown): round leafy tree, sakura tree in full bloom, Japanese cedar, maple with red autumn leaves, small pine.
Bushes: round green bush, flowering pink azalea bush, hedge piece (2 tiles wide).
Town props (about 1 tile each): street lamp, telegraph pole, stone lantern, small roadside shrine (hokora), red torii gate (3 tiles wide), wooden bench (2 tiles wide), red post box, drink vending machine, bicycle (2 tiles wide), notice board (2 tiles wide), wooden signpost, curved traffic mirror, flower pot, wooden barrel.
Forest props: mossy boulder, tree stump, fallen log (2 tiles wide), glowing mushrooms, small stone jizō statue, old wooden signpost.
Background: flat pure magenta #FF00FF everywhere.
```

---

**Reihenfolge:** 1 → 2 → 3 → 5 → 4. Die Figuren und Tiere kann ich sofort einbauen.
Beim Ort und beim Wald ist wichtig, dass das Bild den Lageplan genau einhält. Kleine Abweichungen gleiche ich aus.
