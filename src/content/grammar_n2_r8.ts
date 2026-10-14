import type { GrammarEntry } from '../core/types';

/**
 * N2 grammar, extra set 2 (results, risks, rules, denial). Original sentences and exercises (not official JLPT
 * material). The right answer is first; the game shuffles.
 */
const G = (g: Omit<GrammarEntry, 'level' | 'chapter' | 'source'>): GrammarEntry => ({ ...g, level: 'N2', chapter: 7, source: 'n2course' });

const X = (id: string, sentence: string, en: string, right: string, wrong: [string, string, string], why: string) => ({
  sentence,
  en,
  options: [{ text: right, grammar: id }, { text: wrong[0] }, { text: wrong[1] }, { text: wrong[2] }],
  answer: 0,
  why,
});

export const GRAMMAR_R8: GrammarEntry[] = [
  G({
    id: 'ageku', pattern: '～あげく（に）', meaning: 'after ~ (a long effort or trouble), finally ~ (usually a bad result)',
    formation: 'verb た-form / noun の + あげく（に）',
    explanation: 'After a long process of trouble, hesitation or effort, one reaches an end result that is usually unwelcome.',
    nuance: 'The first part is long or repeated; the result is often negative or exhausted. Written and spoken.',
    mistakes: 'Not for a short, simple event. Do not use for a happy, easy result.',
    examples: [
      { jp: '何度も迷ったあげく、会社をやめることにした。', en: 'After hesitating many times, I finally decided to quit the company.' },
      { jp: '長い議論のあげく、結論は出なかった。', en: 'After a long discussion, no conclusion was reached.' },
    ],
    similar: [],
    exercises: [
      X('ageku', '三時間も待った＿＿、店は閉まっていた。', 'After waiting three whole hours, the shop turned out to be closed.', 'あげく', ['ばかりに', 'ことなく', 'わりに'], 'A long effort ending in a disappointing result → あげく. The others do not give "after a long trouble".'),
      X('ageku', '悩んだ＿＿に、彼は日本へ行くことに決めた。', 'After agonising for a long time, he decided to go to Japan.', 'あげく', ['うえ', 'さい', 'たび'], 'た-form + あげくに = after long thought. The other nouns do not fit this frame.'),
      X('ageku', '喧嘩の＿＿、二人は口もきかなくなった。', 'After a bitter quarrel, the two stopped speaking to each other.', 'あげく', ['おかげ', 'せい', 'ため'], 'noun の + あげく = at the end of a prolonged trouble; the others state a cause, not a long process.'),
    ],
  }),
  G({
    id: 'osorega', pattern: '～おそれがある', meaning: 'there is a risk that ~; ~ may happen (bad)',
    formation: 'plain form / noun の + おそれがある',
    explanation: 'Warns that something bad might happen. Used in news, notices and warnings.',
    nuance: 'Formal and written. Only for negative possibilities.',
    mistakes: 'Not for good possibilities (use かもしれない).',
    examples: [
      { jp: '台風が近づいているため、大雨のおそれがあります。', en: 'Because a typhoon is approaching, there is a risk of heavy rain.' },
      { jp: 'この薬は、眠くなるおそれがあるので、運転は避けてください。', en: 'This medicine may make you sleepy, so please avoid driving.' },
    ],
    similar: [],
    exercises: [
      X('osorega', '強い風のため、電車が止まる＿＿があります。', 'Because of the strong wind, there is a risk that trains will stop.', 'おそれ', ['わけ', 'はず', 'つもり'], 'A formal warning of a bad possibility → おそれがある. わけ/はず/つもり do not carry that sense.'),
      X('osorega', '夜の山道は、迷う＿＿があるので、一人で行かないでください。', 'On a mountain path at night you may get lost, so please do not go alone.', 'おそれ', ['ところ', 'ばかり', 'せい'], 'A warning in a notice → おそれがある.'),
      X('osorega', '火災の＿＿があるため、この部屋では火を使えません。', 'Because there is a risk of fire, you cannot use flames in this room.', 'おそれ', ['おかげ', 'あげく', 'うえ'], 'noun の + おそれがある = a risk of ~.'),
    ],
  }),
  G({
    id: 'ippouda', pattern: '～一方だ', meaning: 'keeps ~ing (a change in one direction)',
    formation: 'verb dictionary form + 一方だ',
    explanation: 'Says that a situation continues in one direction without reversal: more and more, worse and worse.',
    nuance: 'Written, news-like. Often negative: 増える一方だ, 悪くなる一方だ.',
    mistakes: 'Not 一方で ("on the other hand"), which is a contrast marker.',
    examples: [
      { jp: '物価は、上がる一方だ。', en: 'Prices keep going up and up.' },
      { jp: '町の人口は、減る一方だ。', en: 'The town’s population just keeps falling.' },
    ],
    similar: ['ippoude'],
    exercises: [
      X('ippouda', '一人暮らしの高齢者は、増える＿＿だ。', 'The number of elderly people living alone only keeps growing.', '一方', ['うち', 'たび', 'あげく'], 'verb + 一方だ = a trend in one direction only. ばかり gives a different nuance and うち/たび do not fit.'),
      X('ippouda', '忙しさは、増す＿＿で、休む時間がない。', 'The busyness only grows, and there is no time to rest.', '一方', ['最中', '限り', 'ほど'], '増す一方だ = keeps increasing.'),
      X('ippouda', '病気は、悪くなる＿＿だった。', 'The illness just kept getting worse.', '一方', ['あげく', 'うえ', 'せい'], 'verb + 一方だ = a one-way trend.'),
    ],
  }),
  G({
    id: 'kotoninatteiru', pattern: '～ことになっている', meaning: 'it is the rule / arrangement that ~',
    formation: 'verb dictionary form / ない-form + ことになっている',
    explanation: 'States a rule, custom or fixed arrangement that was decided by someone or by society.',
    nuance: 'Neutral, often for rules and schedules. It is not the speaker’s personal decision.',
    mistakes: 'Compare ～ことにしている (my own habit decided by me).',
    examples: [
      { jp: 'この寮では、夜十時以降は静かにすることになっている。', en: 'In this dorm, we are supposed to be quiet after ten at night.' },
      { jp: '来月、本社に異動することになっている。', en: 'I am due to be transferred to the head office next month.' },
    ],
    similar: [],
    exercises: [
      X('kotoninatteiru', '会議では、携帯電話の電源を切る＿＿。', 'In meetings, you are supposed to turn your phone off.', 'ことになっている', ['ことにしている', 'つもりだ', 'ばかりだ'], 'A rule set by the organisation → ことになっている. ことにしている is a personal habit.'),
      X('kotoninatteiru', 'うちの会社では、毎週月曜日に朝礼をする＿＿。', 'In our company a morning meeting is held every Monday, as arranged.', 'ことになっている', ['ことになった', 'ことにした', 'ところだ'], 'A standing arrangement → ことになっている. ことになった reports a decision that has just been made.'),
      X('kotoninatteiru', 'この島では、夜、外を歩かない＿＿。', 'On this island it is the custom not to walk outside at night.', 'ことになっている', ['ことにしている', 'わけではない', 'ようになっている'], 'A custom or rule → ことになっている. ようになっている describes how a thing is built to work.'),
    ],
  }),
  G({
    id: 'hazugahanai', pattern: '～はずがない', meaning: 'there is no way that ~; cannot possibly ~',
    formation: 'plain form (な-adj ～な／～である, noun の) + はずがない',
    explanation: 'The speaker is sure, on the basis of reasoning, that something cannot be true.',
    nuance: 'Spoken and written. Stronger and more logical than ないだろう.',
    mistakes: 'Compare ～わけがない (very similar) and ～はずだ (should be so).',
    examples: [
      { jp: '彼がそんなことを言うはずがない。', en: 'There is no way he would say such a thing.' },
      { jp: '一度も練習していないのに、勝てるはずがない。', en: 'You cannot possibly win without ever practising.' },
    ],
    similar: [],
    exercises: [
      X('hazugahanai', 'まじめな彼が、約束を忘れる＿＿。', 'A serious person like him cannot possibly forget an appointment.', 'はずがない', ['はずだ', 'わけだ', 'ことだ'], 'Logical certainty that it is not so → はずがない. はずだ affirms it.'),
      X('hazugahanai', 'こんなに安いのに、品質がいい＿＿。', 'At such a low price, it cannot possibly be good quality.', 'はずがない', ['ものだ', 'べきだ', 'ようだ'], 'A reasoned denial → はずがない.'),
      X('hazugahanai', '一人で十キロも歩ける＿＿。', 'There is no way I can walk ten kilometres alone.', 'はずがない', ['はずだった', 'つもりがない', 'ことはない'], 'Cannot possibly (so I judge) → はずがない.'),
    ],
  }),
  G({
    id: 'toiumonodewanai', pattern: '～というものではない', meaning: 'it is not (necessarily) the case that ~',
    formation: 'plain form + というものではない／というものでもない',
    explanation: 'Denies a common belief: it is not simply a matter of ~.',
    nuance: 'Slightly formal. Used for a measured correction.',
    mistakes: 'Not a plain negation of a fact; it denies a general view.',
    examples: [
      { jp: '高い物が、必ずしもいいというものではない。', en: 'Expensive things are not necessarily good.' },
      { jp: '勉強時間が長ければいいというものではない。', en: 'It is not simply a matter of studying for a long time.' },
    ],
    similar: [],
    exercises: [
      X('toiumonodewanai', '大きい声で話せば、伝わる＿＿。', 'It is not the case that speaking loudly gets your message across.', 'というものではない', ['というものだ', 'というわけだ', 'ということだ'], 'Denying a common assumption → というものではない. The others affirm.'),
      X('toiumonodewanai', '早ければ早いほどいい＿＿。', 'It is not simply a matter of the earlier the better.', 'というものでもない', ['というものだ', 'ということだ', 'というものがある'], 'A measured denial → というものでもない.'),
      X('toiumonodewanai', 'お金さえあれば幸せになれる＿＿。', 'It’s not that money alone makes you happy.', 'というものではない', ['というわけだ', 'というものがある', 'ということになる'], 'Correcting a common belief → というものではない.'),
    ],
  }),
  G({
    id: 'tohakagiranai', pattern: '～とは限らない', meaning: 'not necessarily ~; it doesn’t always follow that ~',
    formation: 'plain form + とは限らない',
    explanation: 'Denies that something is always true: there are exceptions.',
    nuance: 'Neutral. Often with 必ずしも.',
    mistakes: 'Do not confuse with ～に限る ("~ is best") or ～に限って ("of all times").',
    examples: [
      { jp: '有名な店が、おいしいとは限らない。', en: 'A famous restaurant is not necessarily delicious.' },
      { jp: '必ずしも、努力が報われるとは限らない。', en: 'Effort is not always rewarded.' },
    ],
    similar: [],
    exercises: [
      X('tohakagiranai', '日本人だからといって、敬語が完璧だ＿＿。', 'Being Japanese doesn’t mean one’s keigo is necessarily perfect.', 'とは限らない', ['に限る', 'に限って', 'わけではない'], 'とは限らない = not always. に限る means "the best".'),
      X('tohakagiranai', '値段が高い物が、質もいい＿＿。', 'An expensive item is not necessarily of good quality.', 'とは限らない', ['に決まっている', 'はずがない', 'ものだ'], 'Denying "always": とは限らない. に決まっている says it is certainly so.'),
      X('tohakagiranai', '練習すれば、誰でも上手になる＿＿。', 'Not everyone necessarily gets good by practising.', 'とは限らない', ['に違いない', 'にほかならない', 'というわけだ'], 'A cautious "not always" → とは限らない. The others assert.'),
    ],
  }),
];
