# Was noch fehlt: Prompts (Stand nach Figuren-Blatt)

Gleiches Vorgehen wie in `PROMPTS_HINOMORI_SET.md`:
**Blatt 0 (Stil-Referenz) und das Figuren-Blatt als Referenzbilder mitgeben** und den **STIL-BLOCK** von dort an den Anfang jedes Prompts kopieren.
Reihenfolge = Wichtigkeit.

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
