# Was noch fehlt: Prompts (Stand nach Figuren-Blatt)

Gleiches Vorgehen wie in `PROMPTS_HINOMORI_SET.md`:
**Blatt 0 (Stil-Referenz) und das Figuren-Blatt als Referenzbilder mitgeben** und den **STIL-BLOCK** von dort an den Anfang jedes Prompts kopieren.
Reihenfolge = Wichtigkeit.

---

## 0. Innenräume: Mix aus gemaltem Raum und Einzelmöbeln

**Warum ein Mix:** Die alten, komplett gemalten Räume (`art/reference/old_*.png`) sehen schöner aus.
Sie haben warmes Licht, man sieht die Seitenwände von oben und alles ist im gleichen Winkel gemalt.
Ihr Nachteil war die Kollision: Man konnte manchmal über Wände und Möbel laufen.
Die Einzelmöbel von den neuen Blättern sind dagegen genau, aber von vorne gemalt und wirken flach.

**So kombinieren wir beides, pro Raum zwei Bilder:**

1. **Raumbild:** Wände, Boden, Teppiche und **alles, was an einer Wand steht**, als ein Bild gemalt wie früher
   (Regale an der Rückwand, Theke, Küche, Kühlschränke, Fenster, Uhren …). **Die Raummitte bleibt leerer Boden.**
2. **Möbel-Blatt:** Nur die **frei stehenden Möbel** für die Mitte (Tische mit Stühlen, Bänke, Regalreihen, Sofas),
   im **gleichen Stil und Winkel wie das Raumbild**. Die setze ich einzeln ein. Dann stimmt die Kollision
   und man kann hinter ihnen vorbeilaufen.

**Referenzbilder bei jedem Prompt mitgeben:** Blatt 0, das passende alte Raumbild aus `art/reference/`
und bei den Möbel-Blättern zusätzlich das fertige Raumbild aus Schritt 1.

### Welche Innenräume gebraucht werden

| # | Raum | Größe (Kacheln) | Eingang | Status |
| --- | --- | --- | --- | --- |
| 1 | Bahnhof-Wartesaal | 15 × 11 | 1 breit | gibt es, soll schöner werden (am dringendsten) |
| 2 | Bibliothek | 14 × 12 | 2 breit | gibt es, soll schöner werden |
| 3 | Café ことのは | 13 × 12 | 1 breit | gibt es, soll schöner werden |
| 4 | Konbini | 15 × 12 | 1 breit | gibt es, soll schöner werden |
| 5 | Wohnung der Heldin | 12 × 12 | 2 breit | gibt es, soll schöner werden |
| 6 | Ramen-Laden まんぷく | 12 × 10 | 1 breit | **neu** (ist im Moment „heute geschlossen“) |
| 7 | Labor von Dr. Kirishima | 14 × 11 | 1 breit | **neu** (Tür ist im Moment abgeschlossen) |

Räume 6 und 7 sind optional. Das Gebäude steht schon im Ort, und ich würde dazu eine kleine Szene schreiben.

### 0a. Raumbild (für jeden Raum gleich, nur die Platzhalter ersetzen)

```
[STYLE LOCK]
Painted interior room for a top-down 16-bit RPG, in the same look as the attached reference room: warm lamp light, wooden beams,
3/4 top-down view (camera looking down ~60°), side walls visible from above, every object shows its top surface. Never a straight-on front view.
EXACT LAYOUT on a tile grid — {W} × {H} tiles, 1 tile = 64 px, image exactly {W*64} × {H*64} px:
- top 2 tile rows: the back wall (windows, clocks, pictures, boards, things hanging on the wall)
- leftmost and rightmost tile column: the side walls seen from above (wooden beam + narrow strip of wall)
- bottom tile row: thin wall edge seen from above, with the entrance gap ({DOOR} tiles wide) in the middle and a door mat just inside
- furniture that stands AGAINST A WALL is painted into the room and is at most 1 tile deep (shelves, counters, kitchen, fridges, machines)
- the MIDDLE of the room ({MIDDLE}) is EMPTY floor, with rugs only. Free-standing furniture is added separately later.
No characters, no text, no grid lines. Everything outside the room is pure magenta #FF00FF.
Room: {ROOM}
```

### 0b. Möbel-Blatt (für jeden Raum gleich, nur die Liste ersetzen)

```
[STYLE LOCK]
Free-standing furniture for the attached room picture: same painting style, colours, light and 3/4 top-down angle (top surfaces visible, never a straight-on front view).
Same scale as the room and the attached characters. Footprints are whole tiles (1 tile = 64 px); tall pieces may stick up into the tile above.
Every seat is drawn in the orientations listed. Each piece separately, at least 24 px magenta gap, no shadows on the floor, no labels.
Pure magenta #FF00FF background.
Pieces: {PIECES}
```

### Einsetzen pro Raum

**1. Bahnhof-Wartesaal**: {W}=15, {H}=11, Bild 960 × 704 px, {DOOR}=1, {MIDDLE}=tile columns 2–12, rows 4–8

- {ROOM}: `Small rural Japanese train station waiting room (Hinomori Station), light grey stone floor with a yellow tactile strip from the entrance. Back wall: ticket window with a small counter and staff area behind glass on the left, two ticket machines, a big departure board and a round clock in the middle, a wide window to the platform with a stopped two-car train outside. Top right corner: three automatic ticket gates in an opening to the platform. Left wall: coin lockers, regional route map. Right wall: red drink vending machine, travel posters, a small notice board. Bottom: trash bins and a plant next to the entrance.`
- {PIECES}: `a row of 3 connected blue waiting seats facing DOWN and the same facing UP (2×1 each); a 2-seat wooden bench facing down, up, left and right; an old kerosene stove with a kettle (1×1); a low wooden side table (1×1); a potted plant (1×1); a standing sign with the timetable (1×1)`

**2. Bibliothek**: 14 × 12, Bild 896 × 768 px, {DOOR}=2, {MIDDLE}=columns 2–11, rows 4–9

- {ROOM}: `Quiet old town library with warm wooden floor. Back wall: tall bookshelves with a ladder, a grandfather clock, two windows, a notice board with flyers. Left and right walls: lower bookshelves, a magazine rack, a globe on a stand. A big patterned rug in the middle.`
- {PIECES}: `long reading table with two green desk lamps (3×1, seen from above); wooden library chair facing up, down, left and right; lending desk with a computer and book stacks (2×1) with the librarian's chair behind it; reading corner set: round table (1×1) and green armchair facing left and right; returned-books cart (1×1); standing display of recommended books (1×1)`

**3. Café ことのは**: 13 × 12, Bild 832 × 768 px, {DOOR}=1, {MIDDLE}=columns 2–11, rows 5–9

- {ROOM}: `Cosy retro Japanese café (kissaten), dark wooden floor, warm pendant lamps. Back wall: shelves with cups, jars and coffee beans, an espresso machine. In tile row 3: a long bar counter from the left wall to the middle with a cake display, leaving a 1-tile walkway behind it for the owner. Right side of the back wall: cupboard, fridge, grandfather clock. Left wall: bookshelf with plants. Window with curtains, framed pictures.`
- {PIECES}: `bar stool facing up (1×1); square wooden table for two (1×1); wooden chair with red cushion facing left and right; booth: small table (1×1) and red booth sofa facing down and up (1×1); green 3-seat sofa facing up (2×1) with a low coffee table (2×1); chalkboard menu stand (1×1); large potted plant; small blossom tree in a pot`

**4. Konbini**: 15 × 12, Bild 960 × 768 px, {DOOR}=1, {MIDDLE}=columns 1–9, rows 4–9

- {ROOM}: `Bright Japanese convenience store, light tiled floor. Back wall: a row of glass drink fridges, bento and onigiri chilled shelf, coffee machine. Right side: the register counter running top to bottom in tile column 11, with a 1-tile walkway behind it for the clerk, hot snack case and oden pot on the counter. Bottom wall: glass front with a magazine rack below the window, ATM and copy machine. Next to the entrance: trash bins and a stack of shopping baskets. Posters with prices (no readable text).`
- {PIECES}: `double-sided shop shelf seen from above, full of snacks (2×1) — 4 variants (snacks, cup noodles, drinks, daily goods); low ice cream freezer chest (2×1); end-cap display with a special offer (1×1); stack of shopping baskets (1×1)`

**5. Wohnung**: 12 × 12, Bild 768 × 768 px, {DOOR}=2, {MIDDLE}=columns 2–9, rows 4–8

- {ROOM}: `Small cosy one-room apartment of a female student, light wooden floor. Back wall: window with curtains, desk with laptop and a pink office chair, bookshelf, wardrobe, a sakura scroll and a clock. Left wall: single bed with purple blanket and a nightstand at the top, small kitchen and a fridge at the bottom. Right wall: TV on a low board, floor lamp. By the entrance: shoe rack, mirror, small step (genkan).`
- {PIECES}: `kotatsu with a floral quilt (2×2) seen from above; floor cushion (zabuton) in blue, red and pink (1×1); laundry basket (1×1); potted plant big and small (1×1); bean bag (1×1); small aquarium on a stand (1×1)`

**6. Ramen-Laden まんぷく (neu)**: 12 × 10, Bild 768 × 640 px, {DOOR}=1, {MIDDLE}=columns 2–9, rows 5–7

- {ROOM}: `Small traditional ramen shop, dark wooden interior, warm light, steam. Back wall: open kitchen with big soup pots on gas burners, noodle boiler, shelves with bowls, wooden menu tags hanging on the wall, a noren curtain to the back room. In tile row 3: a wooden counter across the room with a 1-tile walkway behind it for the chef. Left wall: water dispenser and cups. By the entrance: meal-ticket vending machine.`
- {PIECES}: `round counter stool facing up (1×1); small wooden table for 4 (2×1); wooden stool (1×1); stack of bowls (1×1); a beckoning-cat figurine on a small shelf (1×1)`

**7. Labor von Dr. Kirishima (neu)**: 14 × 11, Bild 896 × 704 px, {DOOR}=1, {MIDDLE}=columns 2–11, rows 4–8

- {ROOM}: `Small cluttered research lab of a scientist who studies Kotodama (creatures born from words). Grey floor, white walls. Back wall: whiteboard covered in kanji and diagrams, shelves full of folders and old books, a window with blinds. Left wall: computer desk with two monitors and an office chair. Right wall: cabinet with glass jars holding tiny glowing lights, a coat rack with a white lab coat. Cardboard boxes by the entrance.`
- {PIECES}: `large central worktable with papers, a microscope and a softly glowing stone (3×2); office chair facing up, down, left and right; lab cart with glassware (1×1); stack of boxes (1×1); potted plant (1×1); a small sofa with a blanket (2×1) facing down`

**Reihenfolge:** Bahnhof → Bibliothek → Café → Konbini → Wohnung, danach optional Ramen und Labor.
Pro Raum zuerst das Raumbild, dann das Möbel-Blatt (das fertige Raumbild als Referenz mitgeben).

---

## 1. Porträts für die Dialoge (passend zu den neuen Figuren)

Die Gesprächsbilder sind noch die alten und passen nicht mehr zu den Figuren im Spiel.
Am besten **zwei Blätter**, damit jedes Gesicht groß genug wird.

**Blatt P1:** Heldin, Frau Mori, Kaede, Haruto, Aoi
**Blatt P2:** Herr Satō, Dr. Kirishima, Bahnhofsangestellter, Stammkunde

```
[STYLE LOCK]
Dialogue portrait sheet for the characters in the attached character sheet. Same faces, hair, clothes and colours as their walking sprites, but as larger bust portraits.
One ROW per character, 4 portraits per row, left to right: neutral, happy (smiling), surprised (eyes wide, small open mouth), worried (eyebrows up, small frown).
Every portrait: head and shoulders, facing the viewer slightly turned to the left, same size (about 200×200 px), same crop, same head height in every row.
Pixel-art bust portrait style (like GBA RPG dialogue portraits), dark warm brown outline, no background shape behind the head.
At least 40 px magenta gap between portraits and between rows. No text, no labels, no frames.
Rows (top to bottom):
1. the heroine: girl, 18, light-brown wavy hair, pink cap with a white emblem, pink shirt, backpack straps
2. Ms. Mori: kind old landlady, grey hair in a bun, purple cardigan
3. Kaede: café owner, around 30, black hair in a bun, red top, brown apron
4. Haruto: konbini clerk, 20, messy black hair, dark blue jacket over a white shirt
5. Aoi: university student, 20, long straight dark-navy hair, school-style blouse with a yellow ribbon
Pure magenta #FF00FF background.
```

Für **Blatt P2** dieselben Sätze, nur die Zeilen tauschen:

```
Rows (top to bottom):
1. Mr. Satō: retired teacher, about 70, white hair, round glasses, white coat over a shirt
2. Dr. Kirishima: researcher, about 35, messy black hair, white lab coat over a dark turtleneck, tired but friendly eyes
3. Station attendant: young man, navy station uniform and navy cap with a gold badge
4. Regular customer: old man, about 75, brown flat cap, beige jacket, walking cane
```

---

## 2. Figuren, die noch fehlen (mit allen 4 Richtungen)

Wichtig: **genau das Raster** wie im Figuren-Blatt, aber **ohne großes Vorschaubild und ohne Taschen**.
Dann kann das Werkzeug alles automatisch schneiden.

```
[STYLE LOCK]
Walking sprite sheet, same art style, size and proportions as the attached character sheet (chibi, about 1×1.5 tiles tall).
Each character is one BLOCK: a grid of 4 columns × 3 rows of walk frames.
Row 1: facing DOWN (towards the viewer), row 2: facing LEFT (profile, looking left), row 3: facing UP (back view).
The 4 frames in a row are a walk cycle: standing, left foot forward, standing, right foot forward.
No large preview figure, no bags, no ground shadow. All frames same size, at least 24 px magenta gap between frames, 80 px between blocks.
Blocks (left to right, top to bottom):
1. Dr. Kirishima: researcher, about 35, messy black hair, white lab coat over a dark turtleneck, dark trousers
2. Regular customer: old man, about 75, brown flat cap, beige jacket, walking cane in his right hand
3. High-school girl: short black bob, white blouse with red ribbon, navy pleated skirt, school bag
4. Salaryman: about 30, short black hair, dark grey suit, tie, briefcase
5. Delivery worker: blue cap, blue work uniform, carrying a cardboard parcel
6. Grandmother: about 75, short grey curly hair, lavender cardigan, long skirt
Pure magenta #FF00FF background.
```

### Tiere (gleiches Raster, nur kleiner)

```
[STYLE LOCK]
Animal walking sprite sheet, same art style and scale as the attached character sheet (animals about 1×1 tile).
Each animal is one BLOCK: 4 columns × 3 rows. Row 1 walking DOWN towards the viewer, row 2 walking LEFT (side view), row 3 walking UP (seen from behind).
4-frame walk cycle per row. No ground shadow, at least 24 px magenta gap between frames, 80 px between blocks.
Blocks: 1. calico cat (white, orange and black patches), 2. shiba inu dog (orange and cream, curled tail), 3. sparrow hopping (small, brown).
Pure magenta #FF00FF background.
```

---

## 3. Das Labor von Dr. Kirishima (Außenansicht)

Das ist das letzte Gebäude im Ort mit dem alten Bild.

```
[STYLE LOCK]
One exterior building, same style, light and scale as the attached Hinomori exterior buildings sheet.
Dr. Kirishima's small research lab at the edge of town: a two-storey modern-but-old concrete building, footprint 7 tiles wide × 4 tiles deep (the roof may extend 1 tile higher),
white walls with some ivy, big windows with blinds, a satellite dish and a small antenna on the flat roof, a glass entrance door in the middle of the front with two steps,
a small sign plate next to the door (no readable text), potted plants, a bicycle leaning on the wall, a low hedge along the front.
Only this one building, centred. Pure magenta #FF00FF background.
```

---

## 4. Ort Hinomori und Midori-Wald hübscher (gemalter Boden)

Gleicher Mix wie bei den Innenräumen und beim Bahnhof:
**der Boden wird als ein großes Bild gemalt** (Wiese, Wege, Straße, Fluss, Teich, Brücke, Bahnsteig, Gleise, Zäune,
Blumenbeete, Waldrand, Klippen). **Gebäude, Bäume vor dem Weg, Laternen, Schilder, Bänke usw. bleiben einzelne Objekte**,
damit man hinter ihnen vorbeilaufen kann.

Damit das Bild genau zur Spielkarte passt, gibt es einen **farbigen Lageplan** als Referenz:
`art/reference/layout_town.png` (Ort, 44 × 30 Kacheln) und `art/reference/layout_forest.png` (Wald, 30 × 26 Kacheln).
Farben im Plan: hellgrün = Wiese, hellere Flecken = Blumen, dunkelgrün = dichter Wald (nicht begehbar),
mittelgrün = hohes Gras, beige = Erdweg, grau = gepflasterte Straße, hellgrau = Beton/Platz, blau = Wasser,
braun = Brücke bzw. Klippe, sehr hell = Bahnsteig, gelb = Bahnsteigkante, dunkelbraun = Gleise, rosa = Schrein-Platz,
**rote Kästen = Gebäude** (dort kommt später das Gebäude hin), **weiße Rahmen = kleine Objekte** (kommen später dazu).

**Referenzbilder mitgeben:** Lageplan, Blatt 0, das Gebäude-Blatt (`hm_exterior`) und das neue Bahnhofsbild (für den Stil).

### 4a. Ort Hinomori

```
[STYLE LOCK]
Paint the GROUND of a whole small Japanese country town (Hinomori) for a top-down 16-bit RPG, seen from above in the same 3/4 style and warm light as the attached sheets.
FOLLOW THE ATTACHED COLOUR LAYOUT PLAN EXACTLY: same shapes, same positions, same proportions. The plan is 44 × 30 tiles; the picture must have the same aspect ratio (44:30, e.g. 1536 × 1047 px) so every tile of the plan lands on the same spot.
Translate the plan colours: light green = lush grass with small variations; lighter patches = little flower patches; mid green = tall grass; dark green = dense forest wall (tree crowns seen from above, dark, not walkable); beige = soft dirt path with grass edges; grey = paved town street with kerb stones; light grey = concrete square; blue = river and pond with soft shorelines, reeds and stones; brown on the river = wooden bridge with railings; very light = station platform with tiles; yellow = platform edge with the yellow tactile strip; dark brown = two railway tracks on gravel; the brown line below = a wooden fence; pink = the shrine's stone-paved forecourt.
RED BOXES: paint only plain ground there (grass or paving, matching the surroundings) — the buildings are added on top later. WHITE FRAMES: ignore, small objects are added later.
Paint NO buildings, NO free-standing trees, NO lamps, signs, benches, people or text. Only ground and flat things lying on the ground (paths, flower beds, puddles, stones, fallen sakura petals, manhole covers, drain grates).
Pure magenta #FF00FF outside the map edge only.
```

### 4b. Midori-Wald

```
[STYLE LOCK]
Paint the GROUND of a mysterious green forest clearing area (Midori Forest) for a top-down 16-bit RPG, same 3/4 style as the attached sheets, soft light falling through the leaves, a little magical.
FOLLOW THE ATTACHED COLOUR LAYOUT PLAN EXACTLY: same shapes and positions. The plan is 30 × 26 tiles; same aspect ratio (30:26, e.g. 1200 × 1040 px).
Translate the plan colours: light green = mossy forest floor with clover and small mushrooms; mid green = tall grass (where wild Kotodama hide); dark green = dense forest wall (tree crowns seen from above, not walkable); beige = narrow dirt path with roots and stepping stones; brown band = a low rocky cliff ledge running left to right, with a lighter spot = stone stairs up the cliff; blue = a small clear pond with lily pads.
RED BOX at the top: a small clearing with old stone paving around where the ancient shrine stone will stand (paint only the ground).
Paint NO free-standing trees, NO signs, NO shrine stone, NO creatures. Only ground and flat things on it.
Pure magenta #FF00FF outside the map edge only.
```

### 4c. Bäume und Deko einzeln (passend zum gemalten Boden)

```
[STYLE LOCK]
Free-standing outdoor objects for Hinomori town and Midori Forest, same style, light and 3/4 top-down angle as the attached ground painting, separate pieces with at least 24 px magenta gap, no ground shadow.
Trees (each about 2 tiles wide, 3 tiles tall incl. crown): round leafy tree, sakura tree in full bloom, Japanese cedar, maple with autumn-red leaves, a small pine; bushes: round green bush, flowering azalea bush, hedge piece 2×1;
town props (1×1 unless noted): street lamp, telegraph pole with wires stub, stone lantern, small shrine (hokora), torii gate 3×1, wooden bench 2×1, red post box, vending machine, bicycle 2×1, notice board 2×1, signpost, curved traffic mirror, flower pot, wooden barrel;
forest props: mossy boulder, tree stump, fallen log 2×1, glowing mushrooms, small stone statue (jizō), old wooden signpost.
Pure magenta #FF00FF background.
```

**Reihenfolge:** zuerst 4a (Ort), dann 4c (Bäume und Deko), danach 4b (Wald).

---

## Später (Kapitel 2)

Wenn das nächste Gebiet feststeht (Stadt, Bergdorf, Küste oder Uni-Viertel), schreibe ich dafür eigene Prompts:
Boden-Kacheln, Gebäude, Innenräume und neue Figuren im gleichen Stil.
