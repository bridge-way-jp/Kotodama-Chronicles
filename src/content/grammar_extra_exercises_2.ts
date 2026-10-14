import type { GrammarExercise } from '../core/types';

/**
 * A third exercise for the remaining older N2 patterns (second batch). Appended to the entries in grammar.ts.
 * The right option comes first (the game shuffles); `why` says why the others are excluded. Original sentences.
 */
const X = (id: string, sentence: string, en: string, right: string, wrong: [string, string, string], why: string): [string, GrammarExercise] => [
  id,
  { sentence, en, options: [{ text: right, grammar: id }, { text: wrong[0] }, { text: wrong[1] }, { text: wrong[2] }], answer: 0, why },
];

export const EXTRA_EXERCISES_2: [string, GrammarExercise][] = [
  X('uchini', '雨が降り出さない＿＿、早く帰ろう。', 'Let’s go home early before it starts to rain.', 'うちに', ['ことなく', 'ばかりに', 'たびに'], 'Do it while the situation still lasts (before the rain) → ないうちに. The others do not mean "while / before it changes".'),
  X('saichuuni', '会議の＿＿に、携帯電話が鳴ってしまった。', 'In the middle of the meeting my phone rang.', '最中', ['最後', '次第', '以上'], 'の最中に = right in the middle of an ongoing event. The others do not fit after の in this meaning.'),
  X('tatotan', '電車を降りた＿＿、雨が降り出した。', 'The moment I got off the train, it began to rain.', 'とたんに', ['ついでに', 'うえで', 'ばかりに'], 'た-form + とたんに = at the very moment something happened, surprisingly.'),
  X('shidai', '準備ができ＿＿、連絡いたします。', 'I will contact you as soon as the preparations are ready.', '次第', ['限り', 'ながら', 'ものの'], 'ます-stem + 次第 = as soon as (a polite, formal promise).'),
  X('tekaradenaito', '医者に診てもらって＿＿、薬は出せない。', 'We cannot give medicine unless you have first seen the doctor.', 'からでないと', ['ばかりか', 'ことなく', 'わりに'], 'て-form + からでないと = not until after ~ has been done; the main clause is negative.'),
  X('uede', '契約書をよく読んだ＿＿、サインしてください。', 'Please sign after reading the contract carefully.', '上で', ['ことなく', 'ものの', 'せいで'], 'た-form + 上で = after doing ~, then; it marks the order of two steps.'),
  X('sai', '入院する＿＿は、保険証が必要です。', 'When you are admitted to hospital, an insurance card is needed.', '際に', ['最中', 'とたん', 'ついでに'], '～際に = on the occasion of (formal). 最中 and とたん do not describe an upcoming occasion.'),
  X('tabini', 'この写真を見る＿＿、あの夏を思い出す。', 'Every time I see this photo, I remember that summer.', 'たびに', ['うちに', '次第', 'ことなく'], 'Dictionary form + たびに = each time. The others do not repeat the connection.'),
  X('okagede', '先生が教えてくださった＿＿、合格できました。', 'Thanks to the teacher’s teaching, I was able to pass.', 'おかげで', ['せいで', 'くせに', 'ものの'], 'A good result owed to someone → おかげで. せいで gives the blame for a bad one.'),
  X('amari', '緊張の＿＿、頭が真っ白になった。', 'From too much nervousness, my mind went blank.', 'あまり', ['おかげ', 'うえ', '最中'], 'の + あまり = so much that (an excessive degree causes a result).'),
  X('karaniwa', '引き受けた＿＿には、最後までやり遂げる。', 'Now that I have accepted it, I will see it through to the end.', 'からには', ['ばかりに', 'ことなく', 'たびに'], 'Having decided ~, so of course ~ → からには.'),
  X('totomoni', '年を取る＿＿、体力が落ちてくる。', 'As we get older, our stamina declines.', 'とともに', ['ばかりに', 'ものの', 'わりに'], 'Dictionary form + とともに = as / along with a change.'),
  X('nitomonatte', '人口の増加に＿＿、住宅が不足してきた。', 'Housing has become scarce along with the population increase.', '伴って', ['限って', '加えて', 'かかわらず'], 'に伴って = accompanying a change in another thing.'),
  X('nishitagatte', '町の発展に＿＿、人々の暮らしも変わった。', 'As the town developed, people’s lives changed too.', 'したがって', ['かかわらず', 'もかかわらず', 'ことなく'], 'に従って = as one thing changes, so does another, in step.'),
  X('bakarika', '彼は日本語＿＿、中国語も話せる。', 'Not only Japanese but he also speaks Chinese.', 'ばかりか', ['ばかりに', 'ばかりで', 'ばかりだ'], 'A ばかりか B = not only A but also B (B is even more).'),
  X('hamochiron', '漢字＿＿、ひらがなも読めない。', 'He can’t even read hiragana, let alone kanji.', 'はもちろん', ['はともかく', 'に限って', 'によって'], 'A はもちろん B = A goes without saying, and B too (here the negative).'),
  X('nikuwaete', '雨に＿＿、風も強くなってきた。', 'In addition to the rain, the wind has grown strong.', '加えて', ['限って', '伴って', '従って'], 'に加えて = in addition to (two things piled on one another).'),
  X('wohajime', '社長＿＿、社員全員が参加した。', 'All employees took part, starting with the president.', 'をはじめ', ['をめぐり', 'にかけて', 'にそって'], 'A をはじめ B = starting with A, and others (B) too.'),
  X('kawarini', '今日は私が行く＿＿、明日はあなたが行ってね。', 'I will go today; in exchange you go tomorrow.', '代わりに', ['ついでに', 'せいで', 'ばかりに'], '代わりに = in exchange / instead (a trade-off between two parties).'),
  X('nikawatte', '社長に＿＿、副社長が挨拶をした。', 'The vice president gave the greeting in place of the president.', '代わって', ['加えて', '伴って', '限って'], 'に代わって = acting in place of someone.'),
  X('ippoude', '彼は優しい＿＿、厳しいところもある。', 'He is kind, but on the other hand he can also be strict.', '一方で', ['ばかりで', 'おかげで', 'うちに'], 'A 一方で B = while A, on the other hand B (two sides of one subject).'),
  X('nikakawarazu', '天気に＿＿、試合は行われる。', 'The match will be held regardless of the weather.', 'かかわらず', ['もかかわらず', 'かぎって', 'そって'], 'Nに(も)かかわらず = regardless of N. The version with も follows a contrast: 大雨にもかかわらず.'),
  X('monnara', '行ける＿＿行きたいが、時間がない。', 'I would go if I could, but I have no time.', 'ものなら', ['ものを', 'ことなら', 'ほどなら'], 'Potential form + ものなら = if it were possible at all.'),
  X('saeba', '説明書を読み＿＿、使い方は分かる。', 'You’ll understand how to use it just by reading the manual.', 'さえすれば', ['ばかりか', 'ほど', 'ものの'], 'ます-stem + さえすれば = if only you do this one thing.'),
  X('naikagiri', '本人が来ない＿＿、手続きはできません。', 'Unless the person comes in, the procedure cannot be done.', '限り', ['ばかり', 'わりに', 'うえ'], 'ない + 限り = as long as ~ doesn’t happen; the main clause is negative.'),
  X('kagiri', '私の知っている＿＿、あの店は閉まった。', 'As far as I know, that shop has closed.', '限り', ['限って', 'ばかり', 'わけ'], '知っている限り = to the extent that I know.'),
  X('toshitara', '宝くじが当たった＿＿、何をしますか。', 'If you won the lottery, what would you do?', 'としたら', ['ことなく', 'ばかりに', 'わけに'], 'Assuming something hypothetical, then what? → としたら.'),
  X('naikotoniwa', '練習し＿＿は、上手にならない。', 'You won’t become good unless you practise.', 'ないことには', ['ずじまいで', 'ばかりか', 'ものの'], 'ない + ことには + negative = without ~ nothing happens.'),
  X('kotonaku', '彼は休む＿＿、働き続けた。', 'He kept working without taking a break.', 'ことなく', ['ことに', 'ばかりに', 'うちに'], 'Dictionary form + ことなく = without doing; a formal "without ~ing".'),
  X('hodo', '練習すれば＿＿、上手になる。', 'The more you practise, the better you get.', 'するほど', ['するばかり', 'するうち', 'するまで'], 'V-ば V-ほど = the more…, the more…'),
  X('hodonai', '旅行＿＿楽しいことはない。', 'Nothing is as enjoyable as travelling.', 'ほど', ['ばかり', 'くらいに', 'わりに'], 'A ほど B はない = nothing is as B as A.'),
  X('nikagitte', '急いでいるときに＿＿、電車が遅れる。', 'Of all times, the train is late just when I’m in a hurry.', '限って', ['かかわらず', 'そって', '加えて'], 'に限って = of all times / only then, unluckily.'),
  X('nikagirazu', '大人に＿＿、子どもも楽しめる展覧会だ。', 'It is an exhibition for children, not only for adults.', '限らず', ['限って', 'かかわらず', 'そって'], 'A に限らず B = not only A but B too.'),
  X('dakeatte', '有名なシェフの店＿＿、料理がおいしい。', 'As expected of a famous chef’s restaurant, the food is delicious.', 'だけあって', ['だけのくせに', 'ばかりに', 'どころか'], 'だけあって = as befits (a positive judgment matching the reputation).'),
  X('dakeni', '期待していた＿＿、結果にはがっかりした。', 'Because I had expected so much, I was disappointed with the result.', 'だけに', ['ものの', 'ことなく', 'ついでに'], 'だけに = precisely because ~, so the feeling is stronger.'),
  X('bakarini', '急いだ＿＿、転んでけがをしてしまった。', 'Just because I hurried, I fell and got hurt.', 'ばかりに', ['おかげで', 'うちに', 'たびに'], 'ばかりに = only because of ~, a bad result follows.'),
  X('seika', '疲れている＿＿、集中できない。', 'Perhaps because I am tired, I cannot concentrate.', 'せいか', ['おかげか', 'ばかりか', 'ものか'], 'せいか = perhaps because (a vague, mildly negative reason).'),
  X('karatoitte', '高い＿＿、いい物とは限らない。', 'Just because it is expensive doesn’t mean it is good.', 'からといって', ['からこそ', 'ばかりか', 'ことに'], 'からといって + negative = just because ~, it doesn’t follow that…'),
  X('kotodakara', 'あの人の＿＿、きっと忘れているよ。', 'Knowing him, he has surely forgotten.', 'ことだから', ['せいだから', 'わけだから', 'うちだから'], 'Person + のことだから = knowing what kind of person he is.'),
  X('kotoni', '驚いた＿＿、彼が社長になった。', 'To my surprise, he became president.', 'ことに', ['ものを', 'うえで', 'ばかりに'], 'Feeling + ことに = to my surprise/delight, followed by the fact.'),
  X('teshikatanai', '昨日の失敗が、悔しくて＿＿。', 'I am so frustrated about yesterday’s failure.', 'しかたがない', ['しかたない限り', 'しかたなくても', 'せずにいられる'], 'て-form + しかたがない = cannot help feeling it (a strong feeling).'),
  X('tenaranai', '将来が心配で＿＿。', 'I can’t help worrying about the future.', 'ならない', ['ならなかった限り', 'なるほど', 'ならずに'], 'て-form + ならない = a feeling that is hard to suppress.'),
  X('tetamaranai', '眠くて＿＿。', 'I am unbearably sleepy.', 'たまらない', ['たまらなかった', 'たまるなら', 'たまれば'], 'て-form + たまらない = unbearably, strongly felt.'),
  X('zuniwairarenai', '彼の話を聞いたら、泣か＿＿。', 'Hearing his story, I could not help crying.', 'ずにはいられなかった', ['ずにはおけなかった', 'ずじまいだった', 'なくてはならなかった'], 'ない-form + ずにはいられない = cannot help but do. ずにはおけない has a different meaning.'),
];
