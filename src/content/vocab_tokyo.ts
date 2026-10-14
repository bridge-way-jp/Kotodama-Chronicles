import type { VocabEntry } from '../core/types';

/**
 * Chapter 7 (Tokyo) story vocabulary: commuting, city life, paperwork, radio and loneliness in a crowd.
 * Levels are approximate (no official JLPT list exists); "story" marks words needed for the plot.
 */
const V = (e: Omit<VocabEntry, 'tags' | 'chapter'> & { tags?: string[] }): VocabEntry => ({ tags: ['tokyo'], chapter: 7, ...e });

export const TOKYO_VOCAB: VocabEntry[] = [
  V({ id: 'tk_manin', word: '満員', reading: 'まんいん', en: 'full, packed (no room left)', de: 'überfüllt, voll besetzt', pos: 'noun', level: 'N2',
    example: '朝の電車は、いつも満員だ。', exampleEn: 'The morning train is always packed.' }),
  V({ id: 'tk_tsuukin', word: '通勤', reading: 'つうきん', en: 'commuting to work', de: 'Pendeln zur Arbeit', pos: 'noun', level: 'N2',
    example: '通勤に、毎日一時間かかる。', exampleEn: 'My commute takes an hour every day.' }),
  V({ id: 'tk_shuuden', word: '終電', reading: 'しゅうでん', en: 'the last train of the night', de: 'der letzte Zug', pos: 'noun', level: 'story',
    example: '終電に乗り遅れて、タクシーで帰った。', exampleEn: 'I missed the last train and went home by taxi.' }),
  V({ id: 'tk_kodoku', word: '孤独', reading: 'こどく', en: 'loneliness, solitude', de: 'Einsamkeit', pos: 'noun', level: 'story',
    example: '人が多い町ほど、孤独を感じることがある。', exampleEn: 'In a town with many people you can feel the more lonely.' }),
  V({ id: 'tk_tetsuzuki', word: '手続き', reading: 'てつづき', en: 'procedure, paperwork', de: 'Formalitäten, Behördengang', pos: 'noun', level: 'N2',
    example: '引っ越しの手続きは、区役所でする。', exampleEn: 'The paperwork for moving is done at the ward office.' }),
  V({ id: 'tk_juuminhyou', word: '住民票', reading: 'じゅうみんひょう', en: 'certificate of residence', de: 'Meldebescheinigung', pos: 'noun', level: 'story',
    example: '住民票を取るために、窓口に並んだ。', exampleEn: 'I queued at the counter to get my certificate of residence.' }),
  V({ id: 'tk_keiyaku', word: '契約', reading: 'けいやく', en: 'contract', de: 'Vertrag', pos: 'noun', level: 'N2',
    example: '部屋を借りる前に、契約の内容をよく読んだ。', exampleEn: 'Before renting the room I read the contract carefully.' }),
  V({ id: 'tk_shinya', word: '深夜', reading: 'しんや', en: 'late at night, the dead of night', de: 'tiefe Nacht', pos: 'noun', level: 'N2',
    example: '深夜ラジオを聞きながら、勉強している。', exampleEn: 'I study while listening to late-night radio.' }),
  V({ id: 'tk_housou', word: '放送', reading: 'ほうそう', en: 'broadcast', de: 'Sendung, Übertragung', pos: 'noun', level: 'N2',
    example: 'この番組は、毎晩十一時に放送される。', exampleEn: 'This programme is broadcast every night at eleven.' }),
  V({ id: 'tk_kikinagasu', word: '聞き流す', reading: 'ききながす', en: 'to let go in one ear and out the other; to listen without really hearing', de: 'nur mit halbem Ohr hören', pos: 'verb', level: 'N2',
    example: '忙しくて、先生の話を聞き流してしまった。', exampleEn: 'I was busy and let the teacher’s talk go past me.' }),
  V({ id: 'tk_madoguchi', word: '窓口', reading: 'まどぐち', en: 'service counter, window', de: 'Schalter', pos: 'noun', level: 'N2',
    example: '区役所の窓口は、五時で閉まる。', exampleEn: 'The counters at the ward office close at five.' }),
  V({ id: 'tk_wasuremono', word: '忘れ物', reading: 'わすれもの', en: 'a thing left behind, lost property', de: 'vergessener Gegenstand', pos: 'noun', level: 'N2',
    example: '電車に忘れ物をして、駅に連絡した。', exampleEn: 'I left something on the train and contacted the station.' }),
  V({ id: 'tk_share', word: 'シェアハウス', reading: 'しぇあはうす', en: 'share house (several tenants, shared kitchen and living room)', de: 'WG-Haus', pos: 'noun', level: 'story',
    example: '外国から来た人が、シェアハウスに住んでいる。', exampleEn: 'People who came from abroad live in the share house.' }),
  V({ id: 'tk_kotonoha', word: '言ノ葉', reading: 'ことのは', en: 'words (poetic: “leaves of speech”)', de: 'Worte (poetisch: „Blätter der Sprache“)', pos: 'noun', level: 'story',
    example: '言ノ葉は、人の心から生まれる。', exampleEn: 'Words are born from people’s hearts.' }),
];
