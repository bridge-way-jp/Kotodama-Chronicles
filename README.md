# Kotodama Chronicles 〜言葉でつながる、あたらしい世界へ〜

A browser-based Japanese-learning RPG for learners who have passed **JLPT N3** and are working toward **N2**.
You move to the small town of Hinomori, people are forgetting words, and creatures called **Kotodama** —
born from language and memory — start to appear. Understanding Japanese is the core mechanic: it unlocks
clues, solves people's problems, powers your Kotodama in battle, and drives the story forward.

> Phase 1 (playable vertical slice) — Chapter 1 “Summer in Hinomori”, roughly 30–60 minutes of play.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build
npm test           # unit tests (vitest)
npm run typecheck
```

Requires Node 18+. No backend or account is needed; everything runs locally in the browser.

## How to play

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | Arrow keys / WASD | On-screen D-pad |
| Talk / examine / advance | Space, Enter, Z | **A** button / tap the dialogue |
| Menu | Esc, M | ☰ button |

- Dotted words in Japanese text can be tapped for a glossary card (reading, meaning in EN/DE, example, audio).
- **EN** on a dialogue line shows the translation; **LOG** shows the dialogue backlog.
- Furigana defaults to *Auto*: it disappears for words you have demonstrably learned. Change it under Settings.
- The desk in your apartment opens reviews, the JLPT dashboard and the diagnostic. The bed heals your team and advances the day.
- Missing a day is never punished. The daily new-item limit (default 8) only paces new material.

### Chapter 1 quest line
1. **ようこそ、日野森へ** — read your landlady's letter (reading comprehension), meet Ms. Mori (〜わけではない, 〜ついでに).
2. **コンビニの困りごと** — help Haruto understand a regular customer (listening: 品切れ・取り寄せ・領収書).
3. **差出人のない手紙** — decipher an unsigned letter at Café Kotonoha (〜からこそ).
4. **消えたアナウンス** — a broken station display (announcement listening), then your first Kotodama, ユキツネ.
5. **みどりの森のささやき** — Dr. Kirishima, Midori Forest with wild Kotodama, the shrine inscription and a boss.

Side quests: アオイの発表 (keigo), 佐藤先生の宿題 (わけではない / わけがない / わけにはいかない contrast + an essay), 神社のおみくじ (kanji readings).
After the chapter: a post-game encounter at the shrine, continued reviews and N2-style practice.

## Learning system

- **Curriculum**: 56 vocabulary items, 14 grammar points and 22 kanji for chapter 1 (`src/content/`). Levels are approximate:
  the JLPT does not publish an official vocabulary or grammar list.
- **Spaced repetition**: SM-2-based scheduler (`src/core/srs.ts`). Answers are graded from correctness and response
  time; missed items return after 10 minutes, then 1 day, 3 days and ease-multiplied intervals.
- **Exposure ≠ mastery**: meeting a word in dialogue only registers an encounter. Mastery levels
  (learning → consolidating → mastered ≥21 days, or “needs work”) come only from answers.
- **Context vs. isolation**: if a word is known in isolation but missed in sentences, cloze/sentence/listening drills are prioritised.
- **Confusion tracking**: picking another grammar pattern by mistake (e.g. わけがない for わけではない) is recorded;
  repeated confusions trigger contrast drills.
- **Exercise types**: meaning, reading, reverse, cloze, sentence comprehension, listening, typed reading
  (romaji is converted to kana, so no IME is required), grammar cloze/meaning/contrast, kanji meaning/reading-in-context,
  story reading and listening comprehension.
- **Battles** draw their questions from your due/learning items, so fights double as reviews. Wrong answers still do a
  little damage and are explained; nothing is lost by losing a battle.

### JLPT N2 mode (menu → JLPT N2)
- Dashboard per area (vocab, kanji, grammar, reading, listening) distinguishing *met* from *mastered*, plus accuracy and speed.
- Section practice in the N2 formats: 漢字読み, 文脈規定, 言い換え類義, 文法形式の判断, 文の組み立て (★), 読解, 聴解.
- Optional diagnostic (personalises the queue) and a timed short-form mock exam with a per-section report.
- All questions are **original practice items in N2 style, not official JLPT material**, and no in-game score
  claims to predict or guarantee an exam result.

### Audio
Listening uses the browser's Japanese text-to-speech (Web Speech API) with speed control. This is **synthetic speech for
the prototype, not native-speaker recordings**; the UI labels it “TTS”. `src/core/audio.ts` has a `RECORDED` map ready
for curated audio files.

## Saving

- Progress is saved automatically to **IndexedDB**: within ~0.4 s after important events (quests, learning, battles,
  map changes, settings), debounced for movement, and on tab hide / page close.
- Save format is versioned (`SAVE_VERSION`) and validated on load; older saves get missing fields filled in.
- Each write rotates the previous save into a `backup` slot. If the main save is corrupt the backup is loaded;
  if neither works, nothing is overwritten and the title screen offers to download the raw data.
- **New Game never silently deletes a save**: it requires typing `NEW`, offers an export first, and moves the old save to a
  recovery slot.
- Export / import JSON backups from the title screen or Settings. Clearing browser site data erases local saves.
- The storage layer is a small `SaveBackend` interface, so a cloud backend can be added later.

## Architecture

```
src/
  core/        game logic, no rendering
    types.ts        data model (GameState, content types)
    store.ts        observable game state
    save.ts         IndexedDB persistence, validation, migration, import/export
    persistence.ts  autosave policy
    srs.ts          spaced repetition + mastery
    learning.ts     exercise generation, queues, answer recording, confusion tracking
    exam.ts         N2-style practice / mock / diagnostic builders
    readiness.ts    dashboard metrics
    script.ts       data-driven dialogue conditions & actions
    game.ts         progression, quests, creatures, action executor
    battle.ts       battle rules
    audio.ts, romaji.ts, events.ts
  content/     editable data: vocab, grammar, kanji, texts (reading/listening), quests,
               scripts (all dialogue), npcs, maps, creatures/moves/items, practice items
  game/        Phaser 3 world: tile maps, movement, collision, NPCs, warps, encounters
               (textures.ts paints tiles procedurally; input.ts unifies keyboard & touch)
  ui/          React overlays: title, HUD, dialogue/script runner, challenges, battle, menu, review & exams
tools/extract_sprites.py   cuts sprites out of art/concept-sheet.webp into public/assets/
```

Content is data-driven: add a quest in `content/quests.ts`, its dialogue in `content/scripts.ts`, place NPCs/objects
in `content/maps.ts`, and the engine picks it up. `tests/game.test.ts` checks that every script reference, map warp and
NPC placement is valid.

### Art
- `art/concept-sheet.webp` → buildings, props, front-facing creatures and icons, cut by `python3 tools/extract_sprites.py`.
- `art/sheets/*.webp` (flat magenta background) → cut by `python3 tools/extract_sheets.py` (Pillow, NumPy, SciPy):
  player walk cycle (`hero_<dir>_<frame>`), 8 NPCs in four directions (`npc_<id>_<dir>`), dialogue portraits with
  four expressions (`portrait_<id>_<neutral|happy|surprised|worried>`), creature back views for battles (`back_<sprite>`)
  and five story illustrations (`cg_*`, shown by `{ cg: ... }` script steps).
- Ground tiles and furniture are painted procedurally in `src/game/textures.ts`.
- Any texture can be replaced by dropping a PNG with the same key into `public/assets/` without touching game logic.
- `art/sheets/asset-pack.webp` and `overview.webp` are reference sheets (painted checkerboard background) for upcoming
  content: starter lines, more creatures, interiors, items.

## Status

**Playable now:** title / new game / continue, Hinomori town + apartment + café + Midori Forest, 8 NPCs, 5 main and 3 side quests,
reading & listening challenges, grammar teaching cards, glossary, SRS reviews, 10 Kotodama species (3 evolution lines),
turn-based battles with recruitment, items and shop, relationships with remembered events, JLPT dashboard,
diagnostic, section practice, timed mock exam, autosave and backups, touch controls.

**Not yet:** chapters 2+ and further regions (city, mountain village, coast, university district), interiors for the
library/konbini/station, train travel, apartment decoration, seasonal events, walking NPCs, recorded native audio, kanji stroke-order data, broader N2 coverage (the full N2 scope is several thousand
words), FSRS, cloud saves.
