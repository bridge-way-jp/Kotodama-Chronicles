# N2 coverage check (draft)

Method: counted what is in the game, compared with a core list of typical N2 grammar patterns written from memory
(NOT an official list — the JLPT publishes none) and with the old-level kanji lists in data/jlpt/kanji.json.

## Counts in the game
- Vocabulary: 3,840 list words (1,876 N2, 1,964 N3) + 214 story words
- Grammar: 80 N2 patterns, about 1.9 exercises each
- Kanji: 321 list kanji + 22 hand-written

## Grammar: about 56 common N2 patterns not yet in the game
Target: roughly 130 patterns in total, at least 3 exercises each. Missing (draft list):
かのようだ/かのように、がたい、がち、気味、っぽい、～きる、ようがない、かねる、ないでもない、に決まっている、っこない、ものか、ものだから、ことから、あげく／末に、にあたって、に先立って、にわたって、を通じて／を通して、をめぐって、をもとに、に基づいて、にそって、に応じて、をぬきにして、はともかく、はさておき、にかけては、とはいえ、を契機に、を境に、なりに、ずくめ、てはじめて、かと思うと、か～ないかのうちに、そばから、てこそ、ことだし、だけのことはある、ともなると、ってば、ことか、ないものか、ようではないか、ずじまい、つつある、ものがある、にほかならない、にすぎない、を問わず、のみならず、に限る、きわまりない、てやまない、とあって

## Kanji
- Old N2 level: 367 kanji, 46 missing in the game: 黄雲軽拾倍緑億坂浅荷細鼻祈焼喫冊絡乳腕預菜卵机簡誌枝紹湖貿伺珍封柔匹舟曇帽踊咲塗召沸濯郊隅隻
- Old N3 level: 367 kanji, none in the game (N2 learners are expected to know them)

## Suggested order
1. Add the missing grammar in groups tied to chapters 5-7 (Kyoto: indirect/formal patterns, Osaka: work and business, Tokyo: news and society)
2. Third exercise for every existing pattern
3. Missing N2 kanji, then the N3 kanji
4. More reading and listening texts of exam length

## Progress
- Added 27 new N2 patterns in src/content/grammar_n2_r5.ts (chapter 5 / Kyoto group), 3 exercises each. Total grammar now 107.
- Third exercise added for the 22 region-4 patterns (src/content/grammar_extra_exercises.ts); the remaining ~58 older patterns still have 2.
- 16 Kyoto story words added (src/content/vocab_kyoto.ts). The 46 missing N2 kanji occur only in N4/N5 words that are not in the game's word list, so they would never unlock; they need those words first.
- Chapter 7 (Tokyo): 14 story words (vocab_tokyo.ts), 9 more N2 patterns in grammar_n2_r6.ts and 17 in grammar_n2_r7.ts (ことだし、ってば、ことか、ないものか、ようではないか、きわまりない、てやまない、とあって、に限る; 3 exercises each; total grammar 133), 3 reading and 3 listening texts (practice_tokyo.ts). Every pattern now has at least 3 exercises (grammar_extra_exercises_2.ts adds the last 44). Grammar total 141 (grammar_n2_r8.ts). The 45 missing old-N2 kanji now have their own everyday words (vocab_kanjifill.ts). Still open: the old-N3 kanji (367), which need N4/N5 words.
- Practice texts: practice_more.ts adds 6 reading (e-mail, argument, notice, A/B comparison, letter, essay) and 6 listening items (hotel, shop, lecture, meeting room, weather, club choice). Totals: 20 reading, 20 listening. Still open: old-N3 kanji; native-speaker proofreading of all texts.
