import type { KanjiEntry } from '../core/types';

/** Kanji are always taught through the words they appear in (see `words`). */
export const KANJI: KanjiEntry[] = [
  { id: 'azu', char: '預', on: ['ヨ'], kun: ['あず(ける)', 'あず(かる)'], meaning: 'deposit, entrust', words: ['azukeru', 'azukaru'], strokes: 13 },
  { id: 'kan', char: '管', on: ['カン'], kun: ['くだ'], meaning: 'pipe; manage', words: ['kanrinin'], strokes: 14 },
  { id: 'shuu', char: '収', on: ['シュウ'], kun: ['おさ(める)'], meaning: 'obtain, collect', words: ['shuushuu', 'ryoushuusho'], strokes: 4 },
  { id: 'ryou', char: '領', on: ['リョウ'], kun: [], meaning: 'territory; receive', words: ['ryoushuusho'], strokes: 14 },
  { id: 'tei', char: '締', on: ['テイ'], kun: ['し(める)', 'し(まる)'], meaning: 'tighten, close', words: ['shimekiri'], strokes: 15 },
  { id: 'kei', char: '掲', on: ['ケイ'], kun: ['かか(げる)'], meaning: 'put up, display', words: ['keijiban'], strokes: 11 },
  { id: 'chi', char: '遅', on: ['チ'], kun: ['おく(れる)', 'おそ(い)'], meaning: 'late, slow', words: ['chien'], strokes: 12 },
  { id: 'en', char: '延', on: ['エン'], kun: ['の(びる)', 'の(ばす)'], meaning: 'prolong, delay', words: ['chien'], strokes: 8 },
  { id: 'kan2', char: '換', on: ['カン'], kun: ['か(える)'], meaning: 'exchange', words: ['norikae'], strokes: 12 },
  { id: 'oku', char: '憶', on: ['オク'], kun: [], meaning: 'recollection', words: ['kioku'], strokes: 16 },
  { id: 'haku', char: '薄', on: ['ハク'], kun: ['うす(い)', 'うす(れる)'], meaning: 'thin, faint', words: ['usureru'], strokes: 16 },
  { id: 'sa', char: '査', on: ['サ'], kun: [], meaning: 'investigate', words: ['chousa'], strokes: 9 },
  { id: 'kin', char: '禁', on: ['キン'], kun: [], meaning: 'prohibit', words: ['tachiirikinshi'], strokes: 13 },
  { id: 'seki', char: '跡', on: ['セキ'], kun: ['あと'], meaning: 'trace, track', words: ['ashiato'], strokes: 13 },
  { id: 'koku', char: '刻', on: ['コク'], kun: ['きざ(む)'], meaning: 'engrave; moment', words: ['kizamu'], strokes: 8 },
  { id: 'ryo', char: '慮', on: ['リョ'], kun: [], meaning: 'consideration', words: ['enryo'], strokes: 15 },
  { id: 'mei', char: '迷', on: ['メイ'], kun: ['まよ(う)'], meaning: 'astray, lost', words: ['meiwaku'], strokes: 9 },
  { id: 'ei', char: '影', on: ['エイ'], kun: ['かげ'], meaning: 'shadow; influence', words: ['eikyou'], strokes: 15 },
  { id: 'hai', char: '拝', on: ['ハイ'], kun: ['おが(む)'], meaning: 'worship', words: ['sanpai'], strokes: 8 },
  { id: 'shou', char: '象', on: ['ショウ', 'ゾウ'], kun: [], meaning: 'phenomenon; elephant', words: ['genshou'], strokes: 12 },
  { id: 'jou', char: '常', on: ['ジョウ'], kun: ['つね'], meaning: 'usual, normal', words: ['jouren'], strokes: 11 },
  { id: 'sai', char: '再', on: ['サイ', 'サ'], kun: ['ふたた(び)'], meaning: 'again', words: ['saikai'], strokes: 6 },
];

export const KANJI_BY_ID: Record<string, KanjiEntry> = Object.fromEntries(KANJI.map((k) => [k.id, k]));
