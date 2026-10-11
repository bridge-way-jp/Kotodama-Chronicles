# Kotodama Chronicles — N2 curriculum and game plan

Goal: a player who starts at JLPT N3 and finishes the game is ready to **pass N2**.
The game is a mix of *Stardew Valley* (daily life, seasons, jobs, friendships),
*Pokémon* (Kotodama to befriend and evolve, one master per region) and
*Animal Crossing* (decorating, letters from residents, a museum, festivals).

The JLPT publishes no official vocabulary, kanji or grammar lists. The game uses the widely used
community lists (see *Sources*) and says so in the UI. No score in the game predicts a real result.

## 1. What N2 needs (guide values)

| Area | Target | Source in the game |
| --- | --- | --- |
| Vocabulary | ~1,900 N2 words on top of N3 (~5,500 in total from N5) | `data/jlpt/n2.csv`, `n3.csv` → `public/data/jlpt.json` |
| Kanji | ~370 N2 kanji on top of N3 (~1,000 in total) | `data/jlpt/kanji.json` |
| Grammar | ~200 N2 patterns | `src/content/grammar*.ts` (written for the game) |
| Reading | short, medium and long texts, comparison of two texts, information search | `src/content/texts.ts` |
| Listening | 5 N2 task types at natural speed | `src/content/texts.ts` (TTS now, recordings later) |

The N3 list is loaded as *review material*: it is used for distractors and texts and enters the queue
only when the player meets a word or misses it — players who passed N3 are not drilled on it again.

## 2. Learning loop (every game day)

1. **Morning review at the desk**: due cards first, then a capped number of new items (setting, default 8;
   recommended 15–20 for players with a fixed exam date).
2. **The day itself**: the words of the current region appear in dialogue, letters, signs, jobs and battles.
   Meeting a word only registers an *encounter*; mastery comes only from answers.
3. **Battles** draw their questions from due/learning items, so fights double as reviews.
4. **Evening**: the day's report (new items, accuracy, words that need work); the bed advances the day.

Missing days is never punished; the queue simply waits.

## 3. World and story

Maria comes to Japan from abroad. She arrives in the countryside, travels through very different
landscapes and ends up in the capital. Places are fictional but based on real regions, so the contrast
of nature and culture inside Japan is part of the journey.

| Ch. | Region (fictional, inspired by) | Landscape & culture | Learning focus (N2 topics) | Region master = exam section |
| --- | --- | --- | --- | --- |
| 1 | **Hinomori** (Yamanashi: Fuji views, orchards) | small town, station, forest | moving in, daily life, shops, neighbours | — (tutorial) |
| 2 | **Hinomori valley** (Yamanashi/Kōfu basin) | vineyards, peach orchards, onsen | work & part-time jobs, seasons, agriculture | Vocabulary (文字・語彙) |
| 3 | **Mountain village** (Nagano/Gifu: Shirakawa-gō) | snow, thatched houses, alpine trails | nature, weather, health, traditions | Kanji readings & word formation |
| 4 | **Coastal town** (Izu/Setouchi) | sea, islands, fishing port | environment, tourism, transport, trade | Grammar (文法) |
| 5 | **Old capital** (Kyoto/Nara) | temples, crafts, tea | history, culture, manners, keigo | Reading (読解) |
| 6 | **University city** (Sendai/Tsukuba) | campus, research, libraries | education, science, argument & opinion | Listening (聴解) |
| 7 | **Capital** (Tokyo) | skyscrapers, crowded trains, old shitamachi | economy, media, society, technology, politics | Mock exam (final) |

Story spine: the towns are forgetting their words and Kotodama appear. It becomes personal — Ms. Mori
starts forgetting the names of the people she loves. The "K" signature in the library book leads to a
person who once tried to stop the forgetting and failed. Each region restores one kind of language
(names, songs, letters, stories, research, news); the finale in the capital mirrors exam day.

## 4. Game systems (planned)

- **Stardew**: day/season cycle, a *word garden* (mastered words grow, forgotten ones wilt), part-time jobs
  as practice modes (konbini shift = listening, library = reading, café = keigo), heart levels and festivals.
- **Pokémon**: Kotodama evolve when their linked words/grammar are mastered; one master per region.
- **Animal Crossing**: decorating (exists), residents' letters (reading that grows with the player),
  a word museum (kanji, proverbs, onomatopoeia), seasonal events with their own vocabulary.

## 5. How content is assigned to chapters

`tools/import_jlpt.py` tags every N2 word with a topic from its English meaning and places it in the
region whose focus matches; untagged words are spread so that every region gets a similar share.
Kanji follow the earliest chapter of the words that contain them. Grammar is written by hand per chapter.

## 6. Sources and licences

- Vocabulary lists: Jonathan Waller's JLPT lists (tanos.co.uk, CC BY), via
  [open-anki-jlpt-decks](https://github.com/jamsinclair/open-anki-jlpt-decks) (MIT).
- Kanji data: [kanji-data](https://github.com/davidluzgouveia/kanji-data) (MIT), based on KANJIDIC2
  (EDRDG, CC BY-SA 4.0).
- All example sentences, grammar explanations, texts and exam-style questions are original to the game.
