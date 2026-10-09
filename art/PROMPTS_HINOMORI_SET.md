# Einheitliches Asset-Set für die erste Stadt (日野森 Hinomori)

Ziel: Alle Bilder der ersten Stadt passen in **Farbe, Größe, Licht und Linienstärke** zusammen.
Außerdem wird jeder Innenraum aus **Kacheln und einzelnen Möbeln** zusammengesetzt statt aus einem fertig gemalten Bild.
Dadurch stimmt die Kollision immer und man läuft nicht mehr über Wände.

So gehst du vor:

1. Erzeuge zuerst **Blatt 0 (Stil-Referenz)**.
2. Gib Blatt 0 bei **jedem** weiteren Bild als Referenzbild mit. Füge immer den **STIL-BLOCK** unten in den Prompt ein.
3. Alle Blätter haben einen **reinen Magenta-Hintergrund #FF00FF**. Die Objekte berühren sich nicht.

---

## STIL-BLOCK (in jeden Prompt kopieren)

```
STYLE LOCK — Kotodama Chronicles, Hinomori town set.
16-bit GBA-era top-down RPG pixel art (Pokémon Sapphire/Emerald + Stardew Valley warmth), 3/4 top-down view, camera looking down ~60°.
Grid: 1 tile = 64×64 px (drawn as 32×32 pixel art at 2× scale, every art pixel is exactly 2×2 screen pixels). Everything snaps to this grid.
Palette: warm, slightly desaturated, max ~40 colors for the whole sheet. Outlines dark warm brown #3B2A20 (never pure black), 1 art-pixel thick.
Light comes from the TOP-LEFT; shadows fall to the bottom-right as a flat semi-dark shape (#00000040 look, but solid pixels, no blur).
Key colors: grass #7DBF5A / #5E9E45, path dirt #D9B77E, paved street #A9A39A, wood #9C6B43 / #6E4A2E, roof red #C0503F, roof blue #4F78A8, plaster #F1E6CF, water #4FA3D9.
No anti-aliasing, no gradients, no blur, no text unless asked, no perspective distortion.
Background: flat pure magenta #FF00FF everywhere that is not part of an object. Objects never touch each other; at least 16 px magenta gap.
```

---

## Blatt 0: Stil-Referenz (einmal)

```
[STYLE LOCK]
A small reference sheet: one 4×4-tile patch of grass with a dirt path crossing it, one 2×2 small Japanese house with a red tile roof and a sliding door,
one 1×2 vending machine, one 1×1 potted plant, the main character (girl, 18, light-brown hair, pink cap, pink shirt, small backpack) standing facing down at 1×2 tiles height,
and a 3×3-tile corner of an indoor room (wooden floor, cream plaster wall with wooden wainscot, the wall is exactly 2 tiles tall).
Label nothing. Pure magenta background.
```

---

## Blatt 1: Innenraum-Kachelsatz (für ALLE Innenräume)

Daraus setze ich jeden Raum in beliebiger Größe zusammen. Die Wände sind dann exakt Kacheln, und die Kollision passt immer.

```
[STYLE LOCK]
Interior TILESET sheet for a top-down RPG, every tile exactly 64×64 px, arranged in a neat grid with 16 px magenta gaps.
Row 1 – floors (each 1 tile, seamless when repeated): light wood planks, dark wood planks, beige stone tiles (convenience store), white-grey linoleum (station), tatami mat, red patterned carpet center.
Row 2 – back wall, 2 tiles tall (64×128 each), seamless horizontally: cream plaster with wooden wainscot; light-blue shop wall with white trim; dark wood library wall; station wall with timetable-board-free plain panels. For each: one plain piece and one piece with a window.
Row 3 – side walls and corners seen from top-down: left wall edge, right wall edge (each 1 tile wide, thin wooden beam), bottom wall strip (1 tile, seen from above as a thin beam), top-left / top-right / bottom-left / bottom-right corners for each wall style.
Row 4 – door pieces: bottom-wall door gap with doormat (2 tiles wide), sliding door in back wall (1×2), shop automatic glass door in back wall (2×2).
Row 5 – rugs (2×3, 3×2) and floor shadows.
All floors and walls must tile seamlessly. Pure magenta background.
```

---

## Blatt 2–5: Möbel pro Raum (einzeln, mit Grundfläche in Kacheln)

Ein Blatt pro Raum. Die Zahl in Klammern ist die **Grundfläche in Kacheln (Breite × Höhe)**, die das Möbelstück **auf dem Boden** belegt. Hohe Möbel dürfen nach oben über die Grundfläche hinausragen, maximal 1 Kachel.

**Blatt 2 – Wohnung (Marias Apartment)**

```
[STYLE LOCK]
Furniture sprites for a small Japanese one-room apartment, each a separate object on magenta, footprint given in tiles (64 px each):
single bed with purple blanket (2×3), low desk with laptop (2×1), desk chair (1×1), bookshelf (2×1, may be 2 tiles tall), kitchen counter with sink (2×1), two-burner stove (1×1),
small fridge (1×1, 2 tiles tall), kotatsu table with futon skirt (2×2), floor cushion (1×1), big potted plant (1×1), TV on low cabinet (2×1), shoe rack at the entrance (1×1), wall clock, window with curtains (2×2 wall piece), small trash can, laundry basket.
```

**Blatt 3 – Konbini**

```
[STYLE LOCK]
Furniture sprites for a Japanese convenience store, separate objects on magenta, footprint in tiles:
3 drink fridges with glass doors (each 1×1, 2 tiles tall, must line up seamlessly side by side), double-sided snack shelf seen from above (1×3 vertical) and (3×1 horizontal),
magazine rack (1×2), cashier counter with register (3×1) and its end piece (1×1), hot-food display case (1×1), coffee machine (1×1), ice cream freezer chest (2×1), ATM (1×1, 2 tiles tall),
copy machine (1×1), stacked cardboard boxes (1×1), shopping basket stack (1×1), small potted plant (1×1), ceiling-free hanging banner (wall piece 1×1).
```

**Blatt 4 – Café „Kotonoha“**

```
[STYLE LOCK]
Furniture sprites for a cozy retro Japanese kissaten café, separate objects on magenta, footprint in tiles:
wooden bar counter pieces (left end, middle, right end, each 1×1), bar stool (1×1), espresso machine on counter (1×1), cake display case (1×1), shelf with jars on back wall (2×1, wall piece 2 tiles tall),
round table for two with chairs (2×2), square table for four with chairs (3×2), tall potted plant (1×1), pendant lamp (decoration), piano (2×2), coat stand (1×1), menu chalkboard (1×1).
```

**Blatt 5 – Bibliothek + Bahnhof-Wartesaal**

```
[STYLE LOCK]
Furniture sprites, separate objects on magenta, footprint in tiles:
LIBRARY: tall bookshelf against wall (2×1, 2 tiles tall, seamless side by side), low bookshelf (2×1), reading table with green lamp and 4 chairs (3×2), librarian desk with computer (3×1), grandfather clock (1×1, 2 tiles tall), ladder (1×1), globe (1×1), book cart (1×1).
STATION: wooden waiting bench (3×1), bench facing down (3×1), ticket machine (1×1, 2 tiles tall), timetable board (3×1 wall piece), wood stove with pipe (1×1, 3 tiles tall), small table with flowers (2×1), trash bin (1×1), poster on wall (1×1).
```

---

## Blatt 6: Gebäude außen (alle Gebäude der Stadt in einem Bild)

```
[STYLE LOCK]
Exterior buildings for Hinomori, a small Japanese town, all in the SAME style, scale and light, separate objects on magenta. Footprint = tiles the building covers on the ground (width × depth); the roof may extend 1 tile further up.
The door is always exactly 1 tile wide and sits on the bottom edge of the footprint.
- Maria's apartment building, 2 floors, beige (3×2)
- convenience store "ひのもり" with glass front and blue-green stripe (4×2)
- library, brick and wood, small clock (3×2)
- retro café "ことのは" with awning (6×3)
- ramen shop with noren curtain and red lantern (3×2)
- small train station with platform roof (6×3)
- old research lab, concrete, ivy, fenced gate (7×5)
- two ordinary family houses (3×2 each, one red roof, one blue roof)
- small shrine with offering box (4×2)
```

---

## Blatt 7: Charaktere (Laufanimation, gleiche Größe)

```
[STYLE LOCK]
Character walking sprite sheet, each frame exactly 64×96 px (1 tile wide, 1.5 tiles tall), 4 directions (down, left, right, up) × 3 frames (step, stand, step).
Characters: Maria (main), Haruto (konbini clerk, red apron), Kaede (café owner, apron, bun), Aoi (student, glasses), Sato-sensei (librarian, cardigan), Mori (old man, cap, cane).
Same head size and proportions for all. One row per character. Pure magenta background.
```

---

### Warum ein Set pro Stadt?

- **Einmal für alle:** der Kachelsatz für Innenräume (Blatt 1), die Charaktere (Blatt 7) und der Boden.
- **Pro Stadt oder Kapitel:** Gebäude außen (Blatt 6), Möbel (Blatt 2–5) und Deko.

Dann gehört alles einer Stadt farblich zusammen, und die nächste Stadt (z. B. Küstenort) bekommt ihr eigenes Set mit derselben STYLE-LOCK-Zeile.
