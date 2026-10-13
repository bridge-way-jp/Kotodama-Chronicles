import type { VocabEntry } from '../core/types';

/**
 * Chapter 4 (Shiomi harbour town) story vocabulary: the sea, fishing, tourism, songs and a town getting smaller.
 * Levels are approximate (no official JLPT list exists); "story" marks words needed for the plot.
 */
const V = (e: Omit<VocabEntry, 'tags' | 'chapter'> & { tags?: string[] }): VocabEntry => ({ tags: ['harbor'], chapter: 4, ...e });

export const HARBOR_VOCAB: VocabEntry[] = [
  // --- the sea and the harbour
  V({ id: 'gyokou', word: '漁港', reading: 'ぎょこう', en: 'fishing port', de: 'Fischereihafen', pos: 'noun', level: 'N2',
    example: '朝の漁港は、魚を運ぶ人たちでにぎやかだ。', exampleEn: 'In the morning the fishing port is lively with people carrying fish.' }),
  V({ id: 'ryoushi', word: '漁師', reading: 'りょうし', en: 'fisherman', de: 'Fischer', pos: 'noun', level: 'N2',
    example: '祖父は六十年、漁師として海に出ていた。', exampleEn: 'My grandfather went out to sea as a fisherman for sixty years.' }),
  V({ id: 'shukkou', word: '出港', reading: 'しゅっこう', en: 'leaving port, departure (of a ship)', de: 'Auslaufen (Schiff)', pos: 'noun', level: 'N2',
    example: '船は夜明け前に出港する。', exampleEn: 'The boats leave port before dawn.' }),
  V({ id: 'boukatei', word: '防波堤', reading: 'ぼうはてい', en: 'breakwater', de: 'Wellenbrecher', pos: 'noun', level: 'story',
    example: '防波堤の先に、赤い灯台が立っている。', exampleEn: 'At the end of the breakwater stands a red harbour light.' }),
  V({ id: 'suiheisen', word: '水平線', reading: 'すいへいせん', en: 'horizon (over the sea)', de: 'Horizont (Meer)', pos: 'noun', level: 'N2',
    example: '水平線の向こうに、小さな島が見える。', exampleEn: 'Beyond the horizon you can see a small island.' }),
  V({ id: 'kanchou', word: '干潮', reading: 'かんちょう', en: 'low tide', de: 'Ebbe', pos: 'noun', level: 'N2',
    example: '干潮のときだけ、島まで歩いて渡れる。', exampleEn: 'Only at low tide can you walk across to the island.' }),
  V({ id: 'manchou', word: '満潮', reading: 'まんちょう', en: 'high tide', de: 'Flut', pos: 'noun', level: 'N2',
    example: '満潮になると、飛び石は海の下に沈む。', exampleEn: 'At high tide the stepping stones sink under the sea.' }),
  V({ id: 'hamabe', word: '浜辺', reading: 'はまべ', en: 'beach, seashore', de: 'Strand', pos: 'noun', level: 'N2',
    example: '浜辺で、きれいな貝殻を拾った。', exampleEn: 'I picked up a pretty seashell on the beach.' }),
  V({ id: 'kaigara', word: '貝殻', reading: 'かいがら', en: 'seashell', de: 'Muschelschale', pos: 'noun', level: 'N2',
    example: '貝殻を耳に当てると、波の音が聞こえる。', exampleEn: 'If you hold a seashell to your ear, you can hear the waves.' }),
  V({ id: 'toudai', word: '灯台', reading: 'とうだい', en: 'lighthouse', de: 'Leuchtturm', pos: 'noun', level: 'N2',
    example: '灯台の光が、夜の海を照らしている。', exampleEn: 'The lighthouse beam lights up the night sea.' }),
  // --- the town, tourism and work
  V({ id: 'kankoukyaku', word: '観光客', reading: 'かんこうきゃく', en: 'tourist', de: 'Tourist', pos: 'noun', level: 'N2',
    example: '夏になると、観光客が増える。', exampleEn: 'In summer the number of tourists increases.' }),
  V({ id: 'meibutsu', word: '名物', reading: 'めいぶつ', en: 'local speciality, famous product', de: 'Spezialität', pos: 'noun', level: 'N2',
    example: 'この町の名物は、いか焼きとレモンだ。', exampleEn: 'This town’s specialities are grilled squid and lemons.' }),
  V({ id: 'kaso', word: '過疎', reading: 'かそ', en: 'depopulation', de: 'Entvölkerung', pos: 'noun', level: 'N2',
    example: '過疎が進んで、学校が一つなくなった。', exampleEn: 'As depopulation advanced, one of the schools closed.' }),
  V({ id: 'atotsugi', word: '跡継ぎ', reading: 'あとつぎ', en: 'successor, heir', de: 'Nachfolger', pos: 'noun', level: 'N2',
    example: '店の跡継ぎがいなくて、困っている。', exampleEn: 'We are in trouble because there is no one to take over the shop.' }),
  V({ id: 'intai', word: '引退', reading: 'いんたい', en: 'retirement (from work)', de: 'Ruhestand', pos: 'noun', level: 'N2',
    example: '源さんは、去年漁師を引退した。', exampleEn: 'Gen-san retired as a fisherman last year.' }),
  V({ id: 'teikisen', word: '定期船', reading: 'ていきせん', en: 'regular ferry, scheduled boat', de: 'Linienschiff', pos: 'noun', level: 'story',
    example: '島への定期船は、十年前になくなった。', exampleEn: 'The regular ferry to the island stopped ten years ago.' }),
  V({ id: 'ami', word: '網', reading: 'あみ', en: 'net', de: 'Netz', pos: 'noun', level: 'N2',
    example: '漁師たちが、港で網を直している。', exampleEn: 'The fishermen are mending their nets in the harbour.' }),
  // --- songs and memory
  V({ id: 'funauta', word: '舟歌', reading: 'ふなうた', en: 'boatman’s song, sea shanty', de: 'Seemannslied', pos: 'noun', level: 'story',
    example: '昔は、漁に出るとき、みんなで舟歌を歌った。', exampleEn: 'In the old days everyone sang a boat song when they went out fishing.' }),
  V({ id: 'utaitsugu', word: '歌い継ぐ', reading: 'うたいつぐ', en: 'to pass a song down (to the next generation)', de: 'ein Lied weitergeben', pos: 'verb', level: 'story',
    example: 'この歌は、三百年歌い継がれてきた。', exampleEn: 'This song has been passed down for three hundred years.' }),
  V({ id: 'kuchizusamu', word: '口ずさむ', reading: 'くちずさむ', en: 'to hum, to sing to oneself', de: 'vor sich hin summen', pos: 'verb', level: 'N2',
    example: '祖母は、料理をしながら古い歌を口ずさんでいた。', exampleEn: 'My grandmother hummed an old song while she cooked.' }),
  V({ id: 'hibiku', word: '響く', reading: 'ひびく', en: 'to resound, to echo', de: 'widerhallen', pos: 'verb', level: 'N2',
    example: '静かな港に、汽笛の音が響いた。', exampleEn: 'The sound of a ship’s horn echoed across the quiet harbour.' }),
  V({ id: 'kakegoe', word: '掛け声', reading: 'かけごえ', en: 'shout (of encouragement), call', de: 'Zuruf, Anfeuerungsruf', pos: 'noun', level: 'N2',
    example: '「よいしょ」という掛け声で、網を引き上げた。', exampleEn: 'With a shout of “yoisho”, they hauled up the net.' }),
  V({ id: 'yoake', word: '夜明け', reading: 'よあけ', en: 'dawn, daybreak', de: 'Morgendämmerung', pos: 'noun', level: 'N2',
    example: '夜明けの海は、金色に光っていた。', exampleEn: 'The sea at dawn was shining gold.' }),
  V({ id: 'natsukashii_kioku', word: '懐かしさ', reading: 'なつかしさ', en: 'nostalgia, fond longing', de: 'Nostalgie', pos: 'noun', level: 'N2',
    example: 'その歌を聞くと、なぜか懐かしさを感じる。', exampleEn: 'Somehow I feel nostalgic when I hear that song.' }),
];
