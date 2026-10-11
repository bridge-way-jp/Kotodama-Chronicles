import type { VocabEntry } from '../core/types';

/**
 * Chapter 3 (Yukimi mountain village) story vocabulary: winter, health, traditions, letters and kanji.
 * Levels are approximate (no official JLPT list exists); "story" marks words needed for the plot.
 */
const V = (e: Omit<VocabEntry, 'tags' | 'chapter'> & { tags?: string[] }): VocabEntry => ({ tags: ['mountain'], chapter: 3, ...e });

export const MOUNTAIN_VOCAB: VocabEntry[] = [
  // --- winter and nature
  V({ id: 'fubuki', word: '吹雪', reading: 'ふぶき', en: 'snowstorm, blizzard', de: 'Schneesturm', pos: 'noun', level: 'N2',
    example: '吹雪のため、電車は運転を見合わせている。', exampleEn: 'Because of the snowstorm, the trains have been suspended.' }),
  V({ id: 'sekisetsu', word: '積雪', reading: 'せきせつ', en: 'snowfall, snow cover (depth)', de: 'Schneedecke', pos: 'noun', level: 'N2',
    example: '今朝の積雪は一メートルを超えた。', exampleEn: 'This morning the snow was over a metre deep.' }),
  V({ id: 'nadare', word: '雪崩', reading: 'なだれ', en: 'avalanche', de: 'Lawine', pos: 'noun', level: 'story',
    example: '雪崩の危険があるので、山道は通行止めです。', exampleEn: 'The mountain trail is closed because of the risk of avalanches.' }),
  V({ id: 'kogoeru', word: '凍える', reading: 'こごえる', en: 'to freeze (of a person), to be chilled', de: 'erfrieren, frieren', pos: 'verb', level: 'N2',
    example: '外で待っていたら、手が凍えてしまった。', exampleEn: 'Waiting outside, my hands went numb with cold.' }),
  V({ id: 'hieru', word: '冷える', reading: 'ひえる', en: 'to get cold, to cool down', de: 'kalt werden', pos: 'verb', level: 'N3',
    example: '夜になると、山はぐっと冷える。', exampleEn: 'At night it gets much colder in the mountains.' }),
  V({ id: 'yukidoke', word: '雪解け', reading: 'ゆきどけ', en: 'thaw, melting of snow', de: 'Schneeschmelze', pos: 'noun', level: 'N2',
    example: '雪解けの水が、川になって村を流れる。', exampleEn: 'The meltwater flows through the village as a river.' }),
  // --- health and the clinic
  V({ id: 'shinryoujo', word: '診療所', reading: 'しんりょうじょ', en: 'clinic', de: 'Arztpraxis, Klinik', pos: 'noun', level: 'N2',
    example: '村には小さな診療所が一つしかない。', exampleEn: 'The village has only one small clinic.' }),
  V({ id: 'shoujou', word: '症状', reading: 'しょうじょう', en: 'symptom', de: 'Symptom', pos: 'noun', level: 'N3',
    example: 'どんな症状があるか、くわしく教えてください。', exampleEn: 'Please tell me exactly what symptoms you have.' }),
  V({ id: 'shohou', word: '処方', reading: 'しょほう', en: 'prescription', de: 'Verschreibung', pos: 'noun', level: 'N2',
    example: '医者に処方された薬を、毎食後に飲む。', exampleEn: 'I take the medicine the doctor prescribed after every meal.', collocations: ['処方箋', '処方する'] }),
  V({ id: 'taichou', word: '体調', reading: 'たいちょう', en: 'physical condition, health', de: 'Befinden', pos: 'noun', level: 'N2',
    example: '寒い日が続くと、体調を崩しやすい。', exampleEn: 'When cold days continue, it is easy to fall ill.', collocations: ['体調を崩す', '体調が悪い'] }),
  V({ id: 'kaifuku', word: '回復', reading: 'かいふく', en: 'recovery', de: 'Genesung, Erholung', pos: 'noun', level: 'N3',
    example: '祖母は、思ったより早く回復した。', exampleEn: 'My grandmother recovered faster than expected.' }),
  // --- traditions and the festival
  V({ id: 'dentou', word: '伝統', reading: 'でんとう', en: 'tradition', de: 'Tradition', pos: 'noun', level: 'N3',
    example: 'この祭りは、三百年続く村の伝統だ。', exampleEn: 'This festival is a village tradition that has lasted three hundred years.' }),
  V({ id: 'gyouji', word: '行事', reading: 'ぎょうじ', en: 'event, (annual) function', de: 'Veranstaltung, Brauch', pos: 'noun', level: 'N2',
    example: '冬の一番大きな行事は、雪灯籠まつりだ。', exampleEn: 'The biggest event of the winter is the snow-lantern festival.' }),
  V({ id: 'tourou', word: '灯籠', reading: 'とうろう', en: 'lantern (stone or snow)', de: 'Laterne', pos: 'noun', level: 'story',
    example: '川沿いに、雪で作った灯籠が並んでいる。', exampleEn: 'Lanterns made of snow line the river.' }),
  V({ id: 'irori', word: '囲炉裏', reading: 'いろり', en: 'sunken hearth', de: 'eingelassene Feuerstelle', pos: 'noun', level: 'story',
    example: '囲炉裏を囲んで、みんなで昔話をした。', exampleEn: 'We sat around the hearth and told old stories.' }),
  V({ id: 'tsugu', word: '継ぐ', reading: 'つぐ', en: 'to succeed to, to inherit, to carry on', de: 'erben, weiterführen', pos: 'verb', level: 'N3',
    example: '息子は、家の仕事を継がずに都会へ出た。', exampleEn: 'My son went to the city without taking over the family business.' }),
  V({ id: 'kokyou', word: '故郷', reading: 'こきょう', en: 'hometown, birthplace', de: 'Heimat', pos: 'noun', level: 'N2',
    example: '年をとるほど、故郷がなつかしくなる。', exampleEn: 'The older you get, the more you miss your hometown.' }),
  V({ id: 'hougen', word: '方言', reading: 'ほうげん', en: 'dialect', de: 'Dialekt', pos: 'noun', level: 'N2',
    example: 'おばあさんの方言は、最初は少しわかりにくかった。', exampleEn: 'At first, the old woman’s dialect was a little hard to understand.' }),
  // --- letters and kanji
  V({ id: 'tayori', word: '便り', reading: 'たより', en: 'news, letter, tidings', de: 'Nachricht, Brief', pos: 'noun', level: 'N2',
    example: '都会の息子から、久しぶりに便りが届いた。', exampleEn: 'For the first time in a while, a letter came from my son in the city.' }),
  V({ id: 'fuutou', word: '封筒', reading: 'ふうとう', en: 'envelope', de: 'Briefumschlag', pos: 'noun', level: 'N3',
    example: '封筒には、差出人の名前がなかった。', exampleEn: 'The envelope had no sender’s name.' }),
  V({ id: 'tsutaeru', word: '伝える', reading: 'つたえる', en: 'to convey, to tell, to pass on', de: 'übermitteln, weitergeben', pos: 'verb', level: 'N3',
    example: '言葉にしないと、気持ちは伝わらない。', exampleEn: 'If you don’t put it into words, your feelings won’t get across.' }),
  V({ id: 'bushu', word: '部首', reading: 'ぶしゅ', en: 'radical (of a kanji)', de: 'Radikal (Kanji)', pos: 'noun', level: 'N2',
    example: '「休」の部首は、にんべんだ。', exampleEn: 'The radical of 休 is ninben (the person radical).' }),
  V({ id: 'kakusuu', word: '画数', reading: 'かくすう', en: 'number of strokes', de: 'Strichzahl', pos: 'noun', level: 'N2',
    example: '画数の多い漢字は、書くのに時間がかかる。', exampleEn: 'Kanji with many strokes take a long time to write.' }),
  V({ id: 'kakitomeru', word: '書き留める', reading: 'かきとめる', en: 'to write down, to note down', de: 'aufschreiben, notieren', pos: 'verb', level: 'N2',
    example: '聞いた言葉を、忘れないうちに帳面に書き留めた。', exampleEn: 'I wrote the words I heard in my notebook before I could forget them.' }),
];
