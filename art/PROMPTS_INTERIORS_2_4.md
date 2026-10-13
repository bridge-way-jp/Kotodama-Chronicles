# Interiors for chapters 2–4
Same procedure as the Hinomori rooms (art/PROMPTS_NEXT.md, section 0): per room ONE painted room picture,
then ONE sheet with the free-standing furniture. One folder of the ZIP = one message to GPT.

**Attach to every room picture:** hm_style.webp, room_cafe_v2.webp (reference room), hm_chars_main.webp
**Attach to every furniture sheet:** the same three, plus your finished room picture from the message before.

## Room picture (template, the placeholders are already filled in per folder)

```
Painted interior room for a top-down 16-bit RPG, in the same look as the attached reference room: warm lamp light, wooden beams,
3/4 top-down view (camera looking down ~60°), side walls visible from above, every object shows its top surface. Never a straight-on front view.
EXACT LAYOUT on a tile grid — {W} × {H} tiles, 1 tile = 64 px, image exactly {W*64} × {H*64} px:
- top 2 tile rows: the back wall (windows, pictures, things hanging on the wall)
- leftmost and rightmost tile column: the side walls seen from above (wooden beam + narrow strip of wall)
- bottom tile row: thin wall edge seen from above, with the entrance gap ({DOOR} tiles wide) in the middle and a door mat just inside
- furniture that stands AGAINST A WALL is painted into the room and is at most 1 tile deep
- the MIDDLE of the room ({MIDDLE}) is EMPTY floor, with rugs only. Free-standing furniture is added separately later.
No characters, no text, no grid lines. Everything outside the room is pure magenta #FF00FF.
Room: {ROOM}
```

## Furniture sheet (template)

```
Free-standing furniture for the attached room picture: same painting style, colours, light and 3/4 top-down angle (top surfaces visible, never a straight-on front view).
Same scale as the room and the attached characters. Footprints are whole tiles (1 tile = 64 px); tall pieces may stick up into the tile above.
Every seat is drawn in the orientations listed. Each piece separately, at least 24 px magenta gap, no shadows on the floor, no labels.
Pure magenta #FF00FF background.
Pieces: {PIECES}
```

## The six rooms

**1. Onsen inn ゆのか (valley, Okami-san)**: 14 × 11, {DOOR}=2, {MIDDLE}=columns 2–11, rows 4–8
- ROOM: Entrance hall and lounge of an old Japanese hot-spring inn. Polished dark wooden floor, a raised tatami area along the back wall. Back wall: a wooden reception counter on the left with a guest book and a small bell, a hanging scroll with a painted peach branch, sliding paper doors (shoji) to the corridor, a framed calligraphy of 湯. Left wall: shoe shelves (getabako) and a wooden umbrella stand. Right wall: a glass cabinet with local sake and peach jam, a window with steam rising outside. Lanterns, a big ceramic vase with peach blossoms.
- PIECES: low wooden tea table (2×1); floor cushions in red and indigo (1×1); a folding screen with a mountain painting (2×1); a hibachi charcoal brazier with a kettle (1×1); a rack with yukata and towels (1×1); a potted pine (1×1)

**2. Calligraphy workshop of Mr. Ōta (valley)**: 12 × 10, {DOOR}=1, {MIDDLE}=columns 2–9, rows 4–7
- ROOM: Quiet calligraphy workshop, tatami floor with a wooden border. Back wall: many hanging scrolls with big brush characters (no readable text), a shelf with brushes, inkstones and paper rolls, a round window looking onto a peach tree. Left wall: a tall cabinet with drawers. Right wall: a low shelf with finished works drying on strings above it.
- PIECES: low writing desk with a felt mat, an inkstone and a brush (2×1); a floor cushion facing up and down (1×1); a stack of washi paper (1×1); a large brush in a stand (1×1); a paper lamp (andon) (1×1)

**3. Grandma Tsuru's guesthouse (Yukimi, gassho farmhouse)**: 14 × 11, {DOOR}=2, {MIDDLE}=columns 2–11, rows 4–8
- ROOM: Inside an old gassho-zukuri farmhouse in winter. Dark wooden floor with a raised wooden area; huge dark roof beams visible above the back wall. Back wall: a kitchen corner with a clay stove (kamado) and water jars, shelves with bowls, a small household shrine (kamidana), a paper window with snow outside. Left wall: futons folded in a cupboard. Right wall: straw raincoats and snow boots hanging on pegs, dried persimmons on strings.
- PIECES: a sunken square hearth (irori) with glowing embers and an iron kettle hanging from a hook (2×2, seen from above); floor cushions around it (1×1); a low wooden tray table with tea (1×1); a basket of firewood (1×1); a futon laid out with a thick quilt (1×2)

**4. Yukimi village clinic (Dr. Fujii)**: 12 × 10, {DOOR}=1, {MIDDLE}=columns 2–9, rows 4–7
- ROOM: Small old village clinic, clean light wooden floor, warm but tidy. Back wall: a reception window with a little counter, shelves with medicine bottles and paper medicine bags, a wall calendar, an eye chart (symbols only), a window with snow. Left wall: an examination bed with a white sheet behind a half-open curtain. Right wall: a cabinet with a red cross, a coat rack with a white coat.
- PIECES: doctor's desk with a lamp and patient files (2×1); round stool facing left and right (1×1); a row of 2 waiting chairs facing up (2×1); a kerosene stove with a kettle (1×1); a potted plant (1×1)

**5. Harbour diner はまだ (Shiomi, Mrs. Hamada)**: 13 × 10, {DOOR}=1, {MIDDLE}=columns 2–10, rows 5–7
- ROOM: Lively little harbour diner, worn wooden floor, warm light, fishing decorations. Back wall: open kitchen with a grill and a big pot, wooden menu tags on the wall (no readable text), a blue noren curtain to the back, a fish-shaped wooden sign. In tile row 3: a counter across the left two thirds of the room with a 1-tile walkway behind it for the cook. Left wall: a fish tank. Right wall: a window to the harbour, a glass fishing float and a net on the wall, a small TV on a shelf.
- PIECES: round counter stool facing up (1×1); square table for four (2×1); wooden stool (1×1); a crate of lemons (1×1); a stack of grilled-squid plates on a cart (1×1)

**6. Lighthouse keeper's room (Shiomi, Mr. Umino)**: 12 × 10, {DOOR}=1, {MIDDLE}=columns 2–9, rows 4–7
- ROOM: The round-cornered ground floor of a white lighthouse, used as the keeper's study. Light stone floor. Back wall: a spiral iron staircase going up in the top right corner, tall bookshelves full of old school books and dictionaries, a ship's barometer and a clock, a round window to the sea. Left wall: a small blackboard with faded chalk lines (no readable text), a framed old class photo. Right wall: oilskins and a lantern on hooks, a cabinet with sea charts.
- PIECES: a teacher's wooden desk with a lamp, an open notebook and a red pen (2×1); a wooden chair facing up and down (1×1); an old school desk with an attached seat (1×1); a globe on a stand (1×1); a telescope on a tripod (1×1)

**Order:** room picture first, then its furniture sheet with the room picture attached. The rooms are independent;
start with 1, 3 and 5 (the inns and the diner are the places players visit most).
