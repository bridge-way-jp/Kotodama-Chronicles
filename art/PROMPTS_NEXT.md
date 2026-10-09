# Was noch fehlt: Prompts (Stand nach Figuren-Blatt)

Gleiches Vorgehen wie in `PROMPTS_HINOMORI_SET.md`:
**Blatt 0 (Stil-Referenz) und das Figuren-Blatt als Referenzbilder mitgeben** und den **STIL-BLOCK** von dort an den Anfang jedes Prompts kopieren.
Reihenfolge = Wichtigkeit.

---

## 0. Innenräume richtig von oben (Bahnhof + alle Räume)

**Das Problem:** Die Möbel auf den bisherigen Blättern sind fast alle **gerade von vorne** gemalt, der Boden aber **schräg von oben**.
Darum wirken Bänke, Drehkreuze und Automaten wie Pappaufsteller. Außerdem gibt es jedes Sitzmöbel nur in einer Richtung,
also können sich Stühle nicht gegenüberstehen und Bänke nicht seitlich stehen.
Der Bahnhof hat zusätzlich unten die Holzwand der Wohnung und keine eigenen Wände.

**Die Lösung:** Neue Möbel-Blätter, auf denen **jedes Teil im gleichen Blickwinkel** wie der Boden gemalt ist
(man sieht immer die **Oberseite** und die Vorderseite). Sitzmöbel gibt es dann in **allen 4 Richtungen**.
Dazu kommt pro Raum ein **Gesamtbild als Vorlage**, nach dem ich den Raum aufbaue.

### 0a. Regel-Block (zusätzlich zum STIL-BLOCK in jeden Innenraum-Prompt kopieren)

```
INTERIOR RULES — all furniture uses the SAME 3/4 top-down camera as the floor tiles (camera looking down ~60°):
you always see the TOP surface of every object (seat cushions, table tops, counter tops, machine roofs) plus a narrower front face. Never a flat straight-on front view.
Furniture stands on the floor grid: its footprint is a whole number of tiles (1×1, 2×1, 3×1, 2×2 …), its top may stick up into the tile above, like the shelves in the attached sheets.
Every SEAT (chair, stool, bench, sofa, waiting-room seat row) is drawn in 4 orientations side by side: facing down (towards viewer), facing up (back visible), facing left, facing right.
Tables are drawn on their own, without chairs, so chairs can be placed around them.
Wall-mounted things (clocks, posters, boards, signs, windows, timetables) are drawn flat on a piece of wall, separately from floor furniture.
Same scale as the characters in the attached character sheet: a chair seat is at knee height of a character, a counter at hip height, a door is 1.5 characters tall.
```

### 0b. Bahnhof-Wartesaal: Wände, Boden und Möbel

```
[STYLE LOCK]
[INTERIOR RULES]
Interior tile and furniture sheet for a small rural Japanese train station waiting room (Hinomori Station), matching the attached Hinomori sheets.
Room shell pieces:
- floor: light grey stone tiles, and the same floor with the yellow tactile paving strip (straight, corner, end)
- back wall, 2 tiles tall: white plaster upper part, grey tiled lower part; a variant with a large window showing the platform and a stopped train outside; a variant with the ticket window (glass, small counter, staff visible behind it) built into the wall; a variant with the exit to the platform (opening with the ticket gates in it)
- left and right side walls seen from above as thin grey wall edges, 1 tile wide, with corner pieces; bottom wall seen from above (thin edge) with a 1-tile and a 2-tile door gap and a sliding glass entrance door
Furniture (3/4 top-down, see INTERIOR RULES):
- a row of 3 connected plastic waiting seats (blue) in 4 orientations; a 2-seat wooden bench in 4 orientations
- a row of 3 automatic ticket gates seen from above (you see their tops and the walkway between them)
- 2 ticket machines side by side against the wall, a coin locker block 2×1, a red drink vending machine, a ticket-office counter 3×1
- a waiting-room kerosene stove 1×1 with a kettle on top, a small round table, a magazine rack, a 3-bin trash station, a potted plant, a flower box
Wall items: departure board with two screens, round station clock, regional route map, two travel posters, "lost and found" sign plate (no readable text).
At least 16 px magenta gap between all pieces, no labels. Pure magenta #FF00FF background.
```

### 0c. Sitzmöbel und Tische für die anderen Räume (alle 4 Richtungen)

```
[STYLE LOCK]
[INTERIOR RULES]
Seating and table sheet for the Hinomori interiors, matching the attached café, library, apartment and konbini sheets.
Each seat in 4 orientations (down, up, left, right) in one row:
- café: wooden chair with red cushion, wooden chair with green cushion, bar stool, red booth sofa (2-seat), green sofa (3-seat), green armchair
- library: wooden chair with blue seat, reading armchair (green)
- apartment: floor cushion (zabuton) blue, red and pink, desk chair (pink office chair)
- konbini: eat-in counter stool
Tables alone, seen from above: small round café table, square café table for 2, long library reading table with green desk lamps (3×1), low apartment table, café booth table 1×2, konbini eat-in counter 3×1 along a window.
At least 16 px magenta gap, no labels. Pure magenta #FF00FF background.
```

### 0d. Raum-Vorlagen (so soll jeder Raum fertig aussehen)

Ein Bild pro Raum. Ich nutze es als Bauplan und setze den Raum dann aus den Einzelteilen zusammen.
Die Raumgröße bitte genau so angeben, wie sie im Spiel ist.

```
[STYLE LOCK]
[INTERIOR RULES]
A finished top-down RPG room mock-up, as seen in-game, using exactly the furniture from the attached sheets.
Room size: {W} tiles wide × {H} tiles tall including walls. Top 2 rows: back wall. Left and right: thin side wall edges. Bottom row: thin wall edge with the entrance gap in the middle.
Leave clear walking paths at least 1 tile wide from the entrance to every interactive object. Characters are not drawn.
Room: {ROOM DESCRIPTION}
No text, no grid lines. Fill the area outside the room with pure magenta #FF00FF.
```

Einsetzen für **{W} × {H}** und **{ROOM DESCRIPTION}**:

| Raum | Größe | Beschreibung |
| --- | --- | --- |
| Bahnhof | 15 × 11 | Small rural station waiting room: ticket window and ticket machines on the back wall, ticket gates to the platform at the top right, departure board and clock above them, two rows of seats facing each other in the middle, kerosene stove between them, lockers and vending machine on the side walls, trash bins and plants by the entrance. |
| Bibliothek | 14 × 12 | Quiet old town library: tall bookshelves along the back wall, grandfather clock, lending desk with a librarian's chair near the right, two long reading tables with chairs on both sides, a reading corner with two armchairs and a rug, magazine rack, returned-books cart. |
| Café | 13 × 12 | Cosy retro café: bar counter with stools along the top left, cake display, kitchen shelves behind the counter, two tables for 2 with chairs facing each other, a booth with two sofas facing each other, a green sofa corner, bookshelf, plants, a small menu board by the entrance. |
| Konbini | 15 × 12 | Japanese convenience store: drink fridges along the back wall, bento and onigiri shelves, two aisles of shelves, register counter with hot snacks on the right, coffee machine, ice cream freezer, magazine rack by the window, ATM, trash bins by the door. |
| Wohnung | 12 × 12 | Small one-room apartment of a student: bed with nightstand top left, desk with laptop and pink chair, bookshelf, wardrobe, TV on a low board, kotatsu with cushions around it, small kitchen and fridge at the bottom left, shoe rack by the door, plants. |

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

## Später (Kapitel 2)

Wenn das nächste Gebiet feststeht (Stadt, Bergdorf, Küste oder Uni-Viertel), schreibe ich dafür eigene Prompts:
Boden-Kacheln, Gebäude, Innenräume und neue Figuren im gleichen Stil.
