import type { GrammarExercise } from '../core/types';

/**
 * A third exercise for existing N2 patterns (the first batch: the region-4 group). They are appended to the
 * entry in grammar.ts. The right option comes first (the game shuffles); wrong options are excluded by form or
 * meaning, and `why` says which. Original sentences, not official JLPT material.
 */
const X = (id: string, sentence: string, en: string, right: string, wrong: [string, string, string], why: string): [string, GrammarExercise] => [
  id,
  { sentence, en, options: [{ text: right, grammar: id }, { text: wrong[0] }, { text: wrong[1] }, { text: wrong[2] }], answer: 0, why },
];

export const EXTRA_EXERCISES: [string, GrammarExercise][] = [
  X('monono', '試験に合格した＿＿、まだ就職先が決まっていない。', 'I passed the exam, but I still have not found a job.', 'ものの', ['からこそ', 'ついでに', 'おかげで'],
    'A is true but the expected result (a job) does not follow → ものの. The others give a reason or a side action.'),
  X('nimokakawarazu', '大雪＿＿、電車は時間どおりに走った。', 'Despite the heavy snow, the trains ran on time.', 'にもかかわらず', ['をはじめ', 'につれて', 'に加えて'],
    'A surprising contrast with a noun → にもかかわらず. The others mean "starting with", "as" and "in addition to".'),
  X('kuseni', '子どもの＿＿、大人のような口をきく。', 'He is only a child, yet he talks like an adult.', 'くせに', ['おかげで', 'ばかりか', 'からこそ'],
    'Reproach: the behaviour does not fit what he is → くせに. The other options do not give "even though".'),
  X('tsutsumo', '悪いと知り＿＿、嘘をついてしまった。', 'Knowing it was wrong, I still told a lie.', 'つつも', ['ものを', 'ばかりに', 'ことなく'],
    'ます-stem + つつも = "while ~ing, yet". The other options cannot attach to a ます-stem like this.'),
  X('nagaramo', '狭い＿＿、住み心地のいい部屋だ。', 'It is small, but it is a comfortable room to live in.', 'ながらも', ['つつも', 'ことなく', 'きり'],
    'い-adjective + ながらも = "although". つつも attaches only to the ます-stem of verbs.'),
  X('toittemo', '日本語が話せる＿＿、簡単な会話ができるだけだ。', 'I can speak Japanese, but only simple conversation.', 'といっても', ['ことに', 'からこそ', 'せいで'],
    '"I can, but it is not as much as that sounds" → といっても. The others give emotion, emphasis of reason or blame.'),
  X('nishitewa', '初めて作った＿＿、よくできている。', 'For a first attempt it came out well.', 'にしては', ['について', 'のために', 'によって'],
    'Judged against what you would expect of a beginner → にしては. The others do not compare with a standard.'),
  X('warini', '値段が高い＿＿、味は普通だ。', 'For the high price, the taste is ordinary.', 'わりに', ['あまり', 'ことなく', 'ついでに'],
    'The result falls short of what the price suggests → わりに.'),
  X('hanmen', '便利になった＿＿、人との交流が減った。', 'It has become convenient, but on the other hand contact with people has decreased.', '反面', ['最中', 'たびに', '以上'],
    'Two sides of one thing → 反面. 最中 means "in the middle of", たびに "every time".'),
  X('nihanshite', '予想＿＿、結果はよかった。', 'Contrary to expectations, the result was good.', 'に反して', ['について', 'にとって', 'をはじめ'],
    'The result went against the expectation → に反して.'),
  X('nikurabete', '去年＿＿、今年は雪が少ない。', 'Compared with last year, there is less snow this year.', 'に比べて', ['のおかげで', 'について', 'をはじめ'],
    'Comparison of two years → に比べて.'),
  X('nitaishite', '先生の質問＿＿、学生は黙っていた。', 'The students stayed silent in response to the teacher’s question.', 'に対して', ['ついでに', 'ことなく', 'ばかりか'],
    'A reaction directed at the question → に対して.'),
  X('dokoroka', '貯金が増える＿＿、借金が増えている。', 'Far from my savings growing, my debts are growing.', 'どころか', ['ばかりか', 'せいか', 'わりに'],
    'The reverse of what was expected → どころか. ばかりか adds a similar item instead of reversing.'),
  X('dokorodehanai', '仕事が忙しくて、旅行＿＿。', 'I am so busy at work that travelling is out of the question.', 'どころではない', ['わけではない', 'ものではない', 'にすぎない'],
    'No room for it at all → どころではない. わけではない and ものではない cannot follow a noun like this.'),
  X('toshitemo', '失敗した＿＿、またやってみればいい。', 'Even if you fail, you can just try again.', 'としても', ['ばかりに', 'ことに', 'ものを'],
    'Hypothetical concession "even if" → としても.'),
  X('nishitemo', '誰＿＿、間違いはある。', 'Anyone makes mistakes.', 'にしても', ['にしては', 'によって', 'について'],
    '誰にしても = "whoever it is, even for anyone". 誰にしては does not exist.'),
  X('tatokorode', '今から急いだ＿＿、間に合わないだろう。', 'Even if we hurry from now, we will not make it.', 'ところで', ['とたんに', 'ついでに', 'おかげで'],
    'ta-form + ところで leads to a negative result: "even if" → ところで.'),
  X('monoo', 'もっと早く言ってくれれば手伝った＿＿。', 'If you had told me earlier, I would have helped (and now it is too late).', 'ものを', ['ものの', 'ことに', 'ばかりに'],
    'Regret that something was not done → ものを. ものの means "although".'),
  X('toiuyori', '彼は頭がいい＿＿、努力家なのだ。', 'He is less clever than hardworking.', 'というより', ['ことなく', 'ついでに', 'おかげで'],
    'Re-describing something more precisely → というより.'),
  X('nikoshita', '準備は早め＿＿ことはない。', 'There is nothing better than preparing early.', 'に越した', ['に限った', 'に伴った', 'をはじめた'],
    '早めに越したことはない is the set phrase "nothing beats ~".'),
  X('zaruoenai', '契約書にサインしたからには、守ら＿＿。', 'Having signed the contract, I have no choice but to keep it.', 'ざるを得ない', ['ずじまいだ', 'きれない', 'がたい'],
    '守らざるを得ない = cannot but obey. The others give "ended up not", "cannot finish" and "hard to".'),
  X('shikanai', '道が一本しかないので、この道を行く＿＿。', 'There is only one road, so I have no choice but to take it.', 'しかない', ['ばかりだ', 'ことはない', 'にすぎない'],
    '"There is no other option" → しかない.'),
];
