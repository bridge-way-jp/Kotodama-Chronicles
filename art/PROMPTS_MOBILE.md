# Hochformat-Versionen der Story-Bilder (Handy)

Die Story-Bilder sind sehr breit (bis 5:1). Auf dem Handy im Hochformat schwenkt das Spiel jetzt langsam durch das Bild. Schöner ist eine eigene **Hochformat-Version** (9:16) pro Bild. Liegt eine vor, nutzt das Spiel sie im Hochformat automatisch.

Format: **1024 × 1536 px, Hochformat**. Gib das jeweilige Originalbild als Referenz mit, damit Figuren, Farben und Stil gleich bleiben.

Gemeinsamer Anfang für jeden Prompt:

```
Portrait-format (9:16, 1024×1536) version of the attached story illustration for a mobile screen.
Same pixel-art style, same characters, same colors and lighting as the reference — do not redesign anything.
Recompose vertically: the important subject sits in the middle 60% of the height; the top 20% is sky/background,
the bottom 20% is calm ground or floor (a text box will cover it). No text, no borders, no UI.
```

Danach je Bild eine Zeile:

| Datei | Szene (an den Prompt anhängen) |
|---|---|
| `cg_arrival_p` | Maria (pink cap, backpack, long brown hair) seen from behind on a station platform under a blossoming cherry tree, looking at the small town Hinomori with Mt. Fuji and a red torii on the hill, red-cream local train on the right. |
| `cg_board_p` | Night at the station: Maria from behind in front of a wooden notice board; a glowing white-blue fox spirit floats out of a shining paper, magical sparkles. |
| `cg_chapter1_p` | Maria and the white-blue fox spirit sitting on a wooden bench at the station, the town, river with stone bridge and mountains behind, cherry blossoms. |
| `cg_chapter2_p` | Maria in a train seat looking out of the window at a big city at sunset, the fox spirit reflected in the glass. |
| `cg_ending_p` | Sunset by a river: Maria, the fox spirit and a young man in a white lab coat holding a small glowing crystal, old factory buildings behind. |
| `cg_letter_p` | Cozy retro café: Maria (from behind, left) holding a letter with a red wax seal, the smiling café owner (brown hair, ponytail, pink shirt, apron) leaning on the counter. |
| `cg_shrine_p` | Dark forest shrine: a stone shrine with a glowing blue flower crest, stone lanterns, a small black cat spirit with purple aura floating, Maria from behind in the foreground. |

Speichere die Bilder unter diesen Dateinamen und schick sie mir. Ich trage sie dann ein.

---

# Das Hinomori-Set in voller Größe

Das Sammelbild mit allen 8 Blättern passt im Stil sehr gut zusammen. Für das Spiel ist es aber zu klein: Jedes Möbelstück hat nur etwa 45 px. Bitte jedes Blatt **einzeln** erzeugen (1536 × 1024 oder 1024 × 1024). Gib dabei das Sammelbild als Stil-Referenz mit und schreib davor:

```
Use the attached image ONLY as the style reference (palette, outlines, light, proportions).
Draw ONLY "Blatt N – …" from it as a full-size sheet filling the whole image, each object larger and more detailed,
same objects and arrangement, pure magenta #FF00FF background, objects not touching. No title text.
```

Danach folgt der passende Abschnitt aus `PROMPTS_HINOMORI_SET.md`.

Reihenfolge nach Wichtigkeit:
1. Blatt 1: Innenraum-Kachelsatz
2. Blatt 2: Wohnung
3. Blatt 3: Konbini
4. Blatt 4: Bibliothek
5. Blatt 5: Bahnhof
6. Blatt 7: Charaktere
7. Blatt 6: Gebäude
