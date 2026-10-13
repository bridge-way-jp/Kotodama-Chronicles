import type { VocabEntry } from '../core/types';

/**
 * Chapter 5 (Kyoto) story vocabulary: old town, tourism, crowds, and indirect communication.
 * Levels are approximate (no official JLPT list exists); "story" marks words needed for the plot.
 * They unlock once the story reaches chapter 5.
 */
const V = (e: Omit<VocabEntry, 'tags' | 'chapter'> & { tags?: string[] }): VocabEntry => ({ tags: ['kyoto'], chapter: 5, ...e });

export const KYOTO_VOCAB: VocabEntry[] = [
  // --- the old town
  V({ id: 'ky_machiya', word: '町家', reading: 'まちや', en: 'traditional wooden townhouse (Kyoto)', de: 'traditionelles Holzstadthaus (Kyoto)', pos: 'noun', level: 'story',
    example: '古い町家を改装して、小さな宿にした。', exampleEn: 'They renovated an old townhouse and turned it into a small inn.' }),
  V({ id: 'ky_roji', word: '路地', reading: 'ろじ', en: 'alley, narrow lane', de: 'Gasse', pos: 'noun', level: 'N2',
    example: '路地を一本入ると、急に静かになる。', exampleEn: 'One lane in from the main street, it suddenly becomes quiet.' }),
  V({ id: 'ky_shinise', word: '老舗', reading: 'しにせ', en: 'long-established shop', de: 'traditionsreiches Geschäft', pos: 'noun', level: 'N2',
    example: 'この老舗は、三百年前から同じ味を守っている。', exampleEn: 'This long-established shop has kept the same taste for three hundred years.' }),
  V({ id: 'ky_sadou', word: '茶道', reading: 'さどう', en: 'tea ceremony (the way of tea)', de: 'Teezeremonie', pos: 'noun', level: 'N2',
    example: '茶道では、お客様を心から迎えることが大切にされる。', exampleEn: 'In the tea ceremony, welcoming the guest wholeheartedly is treasured.' }),
  V({ id: 'ky_matcha', word: '抹茶', reading: 'まっちゃ', en: 'powdered green tea, matcha', de: 'Matcha (Pulvertee)', pos: 'noun', level: 'N3',
    example: '抹茶を飲む前に、和菓子をいただいた。', exampleEn: 'Before drinking matcha, we ate a Japanese sweet.' }),
  V({ id: 'ky_kimono', word: '着物', reading: 'きもの', en: 'kimono; traditional clothes', de: 'Kimono', pos: 'noun', level: 'N3',
    example: '着物を着て歩くと、いつもより背筋が伸びる。', exampleEn: 'Walking in a kimono, you stand straighter than usual.' }),
  V({ id: 'ky_torii', word: '鳥居', reading: 'とりい', en: 'torii gate (of a shrine)', de: 'Torii (Schreintor)', pos: 'noun', level: 'N2',
    example: '山道には、赤い鳥居が何千も並んでいる。', exampleEn: 'Thousands of red torii gates line the mountain path.' }),
  V({ id: 'ky_keikan', word: '景観', reading: 'けいかん', en: 'scenery, townscape', de: 'Landschaftsbild, Stadtbild', pos: 'noun', level: 'N2',
    example: 'この町では、古い景観を守るために建物の高さが決められている。', exampleEn: 'In this town building heights are limited to protect the old townscape.' }),
  // --- crowds and tourism
  V({ id: 'ky_annai', word: '案内', reading: 'あんない', en: 'guidance, information; showing the way', de: 'Führung, Auskunft', pos: 'noun', level: 'N2',
    example: '駅員が、外国人の旅行者に乗り場を案内していた。', exampleEn: 'A station attendant was showing a foreign traveller to the platform.' }),
  // --- indirect communication
  V({ id: 'ky_honne', word: '本音', reading: 'ほんね', en: 'one’s true feelings', de: 'wahre Gefühle, eigentliche Meinung', pos: 'noun', level: 'N2',
    example: '彼女は笑っていたが、本音は反対だったようだ。', exampleEn: 'She was smiling, but in truth she seems to have been against it.' }),
  V({ id: 'ky_tatemae', word: '建前', reading: 'たてまえ', en: 'public stance, what one says officially', de: 'offizielle Haltung (nach außen)', pos: 'noun', level: 'N2',
    example: '「ぜひまた来てください」は、建前かもしれない。', exampleEn: '“Please do come again” may just be a polite formality.' }),
  V({ id: 'ky_kuuki', word: '空気を読む', reading: 'くうきをよむ', en: 'to read the atmosphere (sense what is unspoken)', de: 'die Stimmung lesen', pos: 'expression', level: 'N2',
    example: '会議では、その場の空気を読んで発言することも大切だ。', exampleEn: 'In meetings it is also important to speak after reading the room.' }),
  V({ id: 'ky_sassuru', word: '察する', reading: 'さっする', en: 'to guess, to sense (what someone means)', de: 'erahnen, sich denken', pos: 'verb', level: 'N2',
    example: '言わなくても、相手の気持ちを察してほしい。', exampleEn: 'I want you to sense the other person’s feelings even without being told.' }),
  V({ id: 'ky_toomawashi', word: '遠回し', reading: 'とおまわし', en: 'indirect (way of saying)', de: 'Umschreibung, indirekt', pos: 'na-adj', level: 'N2',
    example: '断るときは、遠回しに言うことが多い。', exampleEn: 'When refusing, people often put it indirectly.' }),
  V({ id: 'ky_kikubari', word: '気配り', reading: 'きくばり', en: 'thoughtfulness, attention to others’ needs', de: 'Aufmerksamkeit, Rücksichtnahme', pos: 'noun', level: 'N2',
    example: 'この宿の女将は、細かい気配りで有名だ。', exampleEn: 'The proprietress of this inn is famous for her fine attention to detail.' }),
  V({ id: 'ky_hikaeru', word: '控える', reading: 'ひかえる', en: 'to refrain from; to hold back', de: 'sich zurückhalten, unterlassen', pos: 'verb', level: 'N2',
    example: '路地での大声や写真撮影は、お控えください。', exampleEn: 'Please refrain from loud talking and photography in the lanes.' }),
];
