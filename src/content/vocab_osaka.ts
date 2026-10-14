import type { VocabEntry } from '../core/types';

/**
 * Chapter 6 (Osaka) story vocabulary: work, offices, business manners and Kansai life.
 * Levels are approximate (no official JLPT list exists); "story" marks words needed for the plot.
 */
const V = (e: Omit<VocabEntry, 'tags' | 'chapter'> & { tags?: string[] }): VocabEntry => ({ tags: ['osaka'], chapter: 6, ...e });

export const OSAKA_VOCAB: VocabEntry[] = [
  V({ id: 'os_zangyou', word: '残業', reading: 'ざんぎょう', en: 'overtime work', de: 'Überstunden', pos: 'noun', level: 'N2',
    example: '今週は、毎日夜遅くまで残業が続いている。', exampleEn: 'This week overtime has gone on every day until late at night.' }),
  V({ id: 'os_hourensou', word: '報連相', reading: 'ほうれんそう', en: 'report, inform, consult (workplace rule)', de: 'Berichten, Informieren, Beraten (Arbeitsregel)', pos: 'noun', level: 'story',
    example: '新入社員は、まず報連相を覚えるように言われる。', exampleEn: 'New employees are told first to learn hō-ren-sō.' }),
  V({ id: 'os_shinnyuu', word: '新入社員', reading: 'しんにゅうしゃいん', en: 'new employee', de: 'neuer Mitarbeiter', pos: 'noun', level: 'N2',
    example: '四月に、新入社員が十人入ってきた。', exampleEn: 'Ten new employees joined in April.' }),
  V({ id: 'os_torihiki', word: '取引先', reading: 'とりひきさき', en: 'business partner, client', de: 'Geschäftspartner', pos: 'noun', level: 'N2',
    example: '取引先に、メールでお礼を伝えた。', exampleEn: 'I thanked our client by email.' }),
  V({ id: 'os_nouki', word: '納期', reading: 'のうき', en: 'delivery deadline', de: 'Liefertermin', pos: 'noun', level: 'story',
    example: '納期に間に合わせるために、みんなで協力した。', exampleEn: 'Everyone cooperated to meet the delivery deadline.' }),
  V({ id: 'os_shouchi', word: '承知しました', reading: 'しょうちしました', en: 'understood (humble, polite)', de: 'verstanden (höflich, demütig)', pos: 'expression', level: 'story',
    example: '「承知しました。すぐに対応いたします。」', exampleEn: '“Understood. I will deal with it right away.”' }),
  V({ id: 'os_nomikai', word: '飲み会', reading: 'のみかい', en: 'drinking party (after work)', de: 'Trinkrunde (nach der Arbeit)', pos: 'noun', level: 'N2',
    example: '今夜は、部署の飲み会がある。', exampleEn: 'Tonight there is a drinking party for our department.' }),
  V({ id: 'os_kachou', word: '課長', reading: 'かちょう', en: 'section chief', de: 'Abteilungsleiter', pos: 'noun', level: 'N2',
    example: '課長は、いつも最後まで会社に残っている。', exampleEn: 'The section chief always stays at the office until last.' }),
  V({ id: 'os_hiseiki', word: '非正規', reading: 'ひせいき', en: 'non-regular (contract / part-time) employment', de: 'nicht reguläre Beschäftigung', pos: 'noun', level: 'story',
    example: '非正規で働く人が、全体の約四割を占めている。', exampleEn: 'People in non-regular work make up about four tenths of the total.' }),
  V({ id: 'os_taiguu', word: '待遇', reading: 'たいぐう', en: 'treatment, working conditions', de: 'Behandlung, Arbeitsbedingungen', pos: 'noun', level: 'N2',
    example: '待遇のいい会社に転職したい。', exampleEn: 'I want to change to a company with better conditions.' }),
  V({ id: 'os_oraiyou', word: '賑わう', reading: 'にぎわう', en: 'to be lively, crowded with people', de: 'belebt sein', pos: 'verb', level: 'N2',
    example: '夜の道頓堀は、観光客でにぎわっている。', exampleEn: 'Dotonbori at night is lively with tourists.' }),
  V({ id: 'os_nagare', word: 'お疲れさま', reading: 'おつかれさま', en: 'thank you for your hard work (greeting)', de: 'Danke für Ihre harte Arbeit (Grußformel)', pos: 'expression', level: 'story',
    example: '「お疲れさまです」は、会社で一日に何度も使う。', exampleEn: '“Otsukaresama desu” is used many times a day at the office.' }),
  V({ id: 'os_kansai', word: '関西弁', reading: 'かんさいべん', en: 'Kansai dialect', de: 'Kansai-Dialekt', pos: 'noun', level: 'story',
    example: '関西弁は、東京の言葉より、ずっと明るく聞こえる。', exampleEn: 'Kansai dialect sounds much brighter than Tokyo speech.' }),
];
