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

Maria comes to Japan from abroad (her home country is deliberately left open, so every player can see
themselves in her; she starts over after her studies). She arrives in the countryside, travels through very different
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

Story spine (confirmed, bittersweet with a hopeful ending): the towns are forgetting their words and
Kotodama appear. It becomes personal — Ms. Mori starts forgetting the names of the people she loves, and
Maria travels across Japan to stop the forgetting. The "K" signature in the library book leads to a
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

## 6. Grammar plan (~200 N2 patterns)

Patterns are grouped by function and placed in the region whose texts need them. ✓ = in the game.
Each entry has meaning, formation, explanation, nuance, typical mistakes, two examples and at least two
exam-style exercises whose wrong options are excluded by form or meaning (checked by `tests/curriculum.test.ts`).

| Region | Functions | Patterns |
| --- | --- | --- |
| 1 Hinomori | judging, cause (story) | ✓ わけではない ✓ わけがない ✓ わけにはいかない ✓ に違いない ✓ かねない ✓ をきっかけに ✓ からこそ ✓ せいで ✓ ついでに ✓ うえに ✓ ばかりでなく ✓ につれて ✓ っぱなし ✓ ものだ |
| 2 Valley | time, sequence, cause, addition, substitution | ✓ うちに ✓ 最中に ✓ たとたん ✓ 次第 ✓ てからでないと ✓ 上で ✓ 際／に際して ✓ たびに ✓ おかげで ✓ あまり ✓ からには／以上は ✓ とともに ✓ に伴って ✓ にしたがって ✓ ばかりか ✓ はもちろん／はもとより ✓ に加えて ✓ をはじめ ✓ かわりに ✓ に代わって ✓ 一方（で） ✓ にかかわらず |
| 3 Mountain village | conditions, hypotheses, degree | ものなら・さえ～ば・ない限り・限り（は）・としたら／とすれば・ばよかった・ないことには・ことなく・ほど／くらい・に限って・に限らず・だけあって・だけに・ばかりに・せいか・からといって・ことだから・ことに（は）・ほど～はない・てしかたがない・てならない・てたまらない・ずにはいられない・ないではいられない |
| 4 Coast | contrast, concession, comparison | ものの・にもかかわらず・くせに・つつ（も）・ながらも・といっても・にしては・わりに・反面・に反して・に比べて・に対して・どころか・どころではない・としても・にしても／にせよ／にしろ・たところで・ものを・というより・に越したことはない・よりほかない・ざるを得ない・しかない |
| 5 Old capital | basis, viewpoint, keigo, formal set phrases | に基づいて・をもとに・に沿って・を通じて／を通して・にとって・として・からすると／からして・から見ると・上（は）・において・における・にわたって・を中心に・をめぐって・に関して・について・に応じて・に先立ち・にあたって・を問わず・をこめて・ならではの・謙譲語／尊敬語の慣用表現 |
| 6 University city | opinion, argument, reasoning, quoting | とは限らない・ないことはない・ことはない・ものか・までもない・にすぎない・に他ならない・べきだ／べきではない・ものではない・ことだ・というものだ・というものではない・わけだ・はずだ・に相違ない・と思われる・とされる・といわれている・とのことだ・によると・に決まっている・かのようだ・とみえる・恐れがある・つつある |
| 7 Capital | formal written style, emphasis, news | に至って・に至るまで・をもって・を契機に・にほかならない・を余儀なくされる・を踏まえて・に即して・を皮切りに・をよそに・はさておき・にひきかえ・ともなると・ともなれば・ないまでも・ずくめ・まみれ・がらみ・かたがた・がてら・きる／きれない・抜く・かける・得る／得ない・っこない・がちだ・気味・っぽい・げ・向き／向け |

## 7. Sources and licences

- Vocabulary lists: Jonathan Waller's JLPT lists (tanos.co.uk, CC BY), via
  [open-anki-jlpt-decks](https://github.com/jamsinclair/open-anki-jlpt-decks) (MIT).
- Kanji data: [kanji-data](https://github.com/davidluzgouveia/kanji-data) (MIT), based on KANJIDIC2
  (EDRDG, CC BY-SA 4.0).
- All example sentences, grammar explanations, texts and exam-style questions are original to the game.
