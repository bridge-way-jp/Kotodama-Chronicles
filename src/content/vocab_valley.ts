import type { VocabEntry } from '../core/types';

/**
 * Chapter 2 (Hinomori valley) story vocabulary: orchards, vineyards, the onsen inn, calligraphy and work.
 * Levels are approximate (no official JLPT list exists); "story" marks words needed for the plot.
 */
const V = (e: Omit<VocabEntry, 'tags' | 'chapter'> & { tags?: string[] }): VocabEntry => ({ tags: ['valley'], chapter: 2, ...e });

export const VALLEY_VOCAB: VocabEntry[] = [
  // --- orchard and farm work
  V({ id: 'kajuen', word: '果樹園', reading: 'かじゅえん', en: 'orchard', de: 'Obstgarten', pos: 'noun', level: 'N2',
    example: '祖父は山の上で小さな果樹園をやっている。', exampleEn: 'My grandfather runs a small orchard up on the mountain.' }),
  V({ id: 'shuukaku', word: '収穫', reading: 'しゅうかく', en: 'harvest', de: 'Ernte', pos: 'noun', level: 'N3',
    example: '桃の収穫は七月に始まる。', exampleEn: 'The peach harvest starts in July.', collocations: ['収穫する', '収穫期'] }),
  V({ id: 'minoru', word: '実る', reading: 'みのる', en: 'to bear fruit, to ripen; to pay off', de: 'Früchte tragen; sich auszahlen', pos: 'verb', level: 'N2',
    example: '毎日の努力が実って、試験に合格した。', exampleEn: 'My daily effort paid off and I passed the exam.' }),
  V({ id: 'jukusu', word: '熟す', reading: 'じゅくす', en: 'to ripen, to mature', de: 'reifen', pos: 'verb', level: 'N2',
    example: '桃は木の上で熟したものが一番おいしい。', exampleEn: 'Peaches that ripen on the tree taste best.' }),
  V({ id: 'saibai', word: '栽培', reading: 'さいばい', en: 'cultivation, growing (plants)', de: 'Anbau', pos: 'noun', level: 'N2',
    example: 'この谷では、ぶどうの栽培が盛んだ。', exampleEn: 'Grape growing thrives in this valley.', collocations: ['栽培する'] }),
  V({ id: 'hinshu', word: '品種', reading: 'ひんしゅ', en: 'variety, breed', de: 'Sorte', pos: 'noun', level: 'N2',
    example: '同じ桃でも、品種によって甘さが違う。', exampleEn: 'Even among peaches, the sweetness differs by variety.' }),
  V({ id: 'shukka', word: '出荷', reading: 'しゅっか', en: 'shipping (of goods/produce)', de: 'Versand, Auslieferung', pos: 'noun', level: 'N2',
    example: '朝とった桃は、その日のうちに出荷される。', exampleEn: 'Peaches picked in the morning are shipped the same day.', collocations: ['出荷する'] }),
  V({ id: 'hiryou', word: '肥料', reading: 'ひりょう', en: 'fertiliser', de: 'Dünger', pos: 'noun', level: 'N2',
    example: '肥料をやりすぎると、かえって木が弱る。', exampleEn: 'Too much fertiliser actually weakens the tree.' }),
  V({ id: 'teire', word: '手入れ', reading: 'ていれ', en: 'care, maintenance', de: 'Pflege', pos: 'noun', level: 'N2',
    example: '畑の手入れは、一日も休めない。', exampleEn: 'You can’t skip a single day of caring for the field.', collocations: ['手入れをする'] }),
  V({ id: 'hitodebusoku', word: '人手不足', reading: 'ひとでぶそく', en: 'labour shortage', de: 'Personalmangel', pos: 'noun', level: 'N2',
    example: '若い人が町へ出ていき、村は人手不足に悩んでいる。', exampleEn: 'Young people move to the cities and the village struggles with a lack of workers.' }),
  V({ id: 'kurou', word: '苦労', reading: 'くろう', en: 'hardship, trouble, toil', de: 'Mühe, Not', pos: 'noun', level: 'N2',
    example: '苦労して育てた桃だから、大切に食べてほしい。', exampleEn: 'We worked hard to grow these peaches, so please enjoy them with care.', collocations: ['苦労する', 'ご苦労さま'] }),
  V({ id: 'tanbo', word: '田んぼ', reading: 'たんぼ', en: 'rice paddy', de: 'Reisfeld', pos: 'noun', level: 'N3',
    example: '夏の夜、田んぼからカエルの声が聞こえる。', exampleEn: 'On summer nights you can hear frogs from the rice paddies.' }),
  // --- winery
  V({ id: 'jouzou', word: '醸造', reading: 'じょうぞう', en: 'brewing, wine-making', de: 'Brauen, Keltern', pos: 'noun', level: 'story',
    example: 'このワインは、谷のぶどうだけで醸造している。', exampleEn: 'This wine is made only from the valley’s grapes.' }),
  V({ id: 'taru', word: '樽', reading: 'たる', en: 'barrel, cask', de: 'Fass', pos: 'noun', level: 'story',
    example: 'ワインは樽の中で、ゆっくり時間をかけて育つ。', exampleEn: 'Wine slowly matures in the barrel.' }),
  V({ id: 'kakaku', word: '価格', reading: 'かかく', en: 'price', de: 'Preis', pos: 'noun', level: 'N2',
    example: '天気が悪い年は、ぶどうの価格が上がる。', exampleEn: 'In years with bad weather, grape prices go up.' }),
  // --- onsen inn
  V({ id: 'ryokan', word: '旅館', reading: 'りょかん', en: 'Japanese-style inn', de: 'japanisches Gasthaus', pos: 'noun', level: 'N3',
    example: '古い旅館に泊まって、温泉に入った。', exampleEn: 'I stayed at an old inn and took a hot-spring bath.' }),
  V({ id: 'okami', word: '女将', reading: 'おかみ', en: 'landlady / proprietress (of an inn)', de: 'Wirtin (eines Ryokan)', pos: 'noun', level: 'story',
    example: '女将さんが、玄関でお客様を迎えている。', exampleEn: 'The proprietress is welcoming the guests at the entrance.' }),
  V({ id: 'yuge', word: '湯気', reading: 'ゆげ', en: 'steam', de: 'Dampf', pos: 'noun', level: 'N2',
    example: '露天風呂から白い湯気が立ちのぼっている。', exampleEn: 'White steam is rising from the open-air bath.' }),
  V({ id: 'yukagen', word: '湯加減', reading: 'ゆかげん', en: 'temperature of the bath water', de: 'Badetemperatur', pos: 'noun', level: 'story',
    example: '「湯加減はいかがですか」と女将さんが聞いた。', exampleEn: '“How is the water temperature?” the proprietress asked.' }),
  V({ id: 'motenashi', word: 'もてなし', reading: 'もてなし', en: 'hospitality', de: 'Gastfreundschaft', pos: 'noun', level: 'N2',
    example: 'この旅館は、心のこもったもてなしで有名だ。', exampleEn: 'This inn is famous for its heartfelt hospitality.', collocations: ['おもてなし', 'もてなす'] }),
  V({ id: 'tsukaru', word: '浸かる', reading: 'つかる', en: 'to soak (in a bath)', de: 'eintauchen, baden', pos: 'verb', level: 'N2',
    example: '肩までお湯に浸かると、疲れがとれる。', exampleEn: 'Soaking up to your shoulders takes the tiredness away.' }),
  // --- calligraphy and names
  V({ id: 'shodou', word: '書道', reading: 'しょどう', en: 'calligraphy', de: 'Kalligrafie', pos: 'noun', level: 'N2',
    example: '子どものころ、毎週書道教室に通っていた。', exampleEn: 'As a child I went to calligraphy class every week.' }),
  V({ id: 'fude', word: '筆', reading: 'ふで', en: 'writing brush', de: 'Pinsel', pos: 'noun', level: 'N3',
    example: '筆を持つ手が、少しふるえていた。', exampleEn: 'The hand holding the brush was trembling a little.' }),
  V({ id: 'sumi', word: '墨', reading: 'すみ', en: 'ink (for calligraphy)', de: 'Tusche', pos: 'noun', level: 'N3',
    example: '墨をすっていると、心が落ち着く。', exampleEn: 'Grinding the ink calms the mind.' }),
  V({ id: 'kakejiku', word: '掛け軸', reading: 'かけじく', en: 'hanging scroll', de: 'Hängerolle', pos: 'noun', level: 'story',
    example: '床の間に、古い掛け軸がかけてある。', exampleEn: 'An old hanging scroll hangs in the alcove.' }),
  V({ id: 'nazukeru', word: '名付ける', reading: 'なづける', en: 'to name', de: 'benennen', pos: 'verb', level: 'N2',
    example: 'この桃は、祖父が「ひのもり白」と名付けた。', exampleEn: 'My grandfather named this peach “Hinomori White”.' }),
  V({ id: 'wasureppoi', word: '忘れっぽい', reading: 'わすれっぽい', en: 'forgetful', de: 'vergesslich', pos: 'i-adj', level: 'N2',
    example: '最近、祖母は少し忘れっぽくなった。', exampleEn: 'Lately my grandmother has become a little forgetful.' }),
  V({ id: 'nagori', word: '名残', reading: 'なごり', en: 'trace, remains; lingering feeling', de: 'Überbleibsel; Wehmut', pos: 'noun', level: 'N1',
    example: '町には、昔のにぎわいの名残がある。', exampleEn: 'The town still has traces of its old liveliness.', collocations: ['名残惜しい'] }),
  V({ id: 'kotozuke', word: '言付け', reading: 'ことづけ', en: 'message (left for someone)', de: 'Nachricht, Botschaft', pos: 'noun', level: 'N2',
    example: '森さんから言付けを預かってきました。', exampleEn: 'I’ve brought a message from Ms. Mori.' }),
];
