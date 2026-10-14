import type { GrammarEntry } from '../core/types';

/**
 * N2 grammar, extra set (cause and reason, scope, turning points, near-misses). Original sentences and exercises
 * (not official JLPT material). The right answer is first; the game shuffles.
 */
const G = (g: Omit<GrammarEntry, 'level' | 'chapter' | 'source'>): GrammarEntry => ({ ...g, level: 'N2', chapter: 7, source: 'n2course' });

const X = (id: string, sentence: string, en: string, right: string, wrong: [string, string, string], why: string) => ({
  sentence,
  en,
  options: [{ text: right, grammar: id }, { text: wrong[0] }, { text: wrong[1] }, { text: wrong[2] }],
  answer: 0,
  why,
});

export const GRAMMAR_R7: GrammarEntry[] = [
  G({
    id: 'ppoi', pattern: '～っぽい', meaning: '-ish; tends to ~; looks like ~',
    formation: 'noun / verb ます-stem / い-adjective stem + っぽい',
    explanation: 'Says that something has the look or feel of X, or tends to be X (often negative: 忘れっぽい, 飽きっぽい).',
    nuance: 'Casual. With nouns it means "-ish": 子どもっぽい (childish), 黒っぽい (blackish).',
    mistakes: 'Not for good qualities in polite writing. 男らしい is praise, 男っぽい is just "boyish/macho".',
    examples: [
      { jp: '彼は忘れっぽいので、メモを取っている。', en: 'He is forgetful, so he takes notes.' },
      { jp: '空が白っぽくなってきた。', en: 'The sky has turned whitish.' },
    ],
    similar: [],
    exercises: [
      X('ppoi', '祖父は最近、怒り＿＿くなった。', 'My grandfather has become easily irritated recently.', 'っぽ', ['がち', 'ずくめ', 'かけ'], '怒りっぽい = tends to get angry. The other forms do not attach to 怒り in this way.'),
      X('ppoi', 'その服は、色が黒＿＿ので、夏には暑そうだ。', 'That clothing is blackish in colour, so it looks hot in summer.', 'っぽい', ['らしい', 'ぎみの', 'だらけの'], '黒っぽい = blackish (not truly black).'),
      X('ppoi', '彼の考え方は、まだ子ども＿＿。', 'His way of thinking is still childish.', 'っぽい', ['かねない', 'きわまりない', 'ようがない'], '子どもっぽい = childish; the others do not mean "-ish".'),
    ],
  }),
  G({
    id: 'kaneru', pattern: '～かねる', meaning: 'cannot ~ (cannot bring oneself to, for reasons of position)',
    formation: 'verb ます-stem + かねる',
    explanation: 'A polite way of declining: it is not possible for me to do it (because of rules, position or feelings).',
    nuance: 'Formal, business and customer service. It is not about ability but about being unable to agree or do.',
    mistakes: 'Do not confuse with かねない ("might well ~"), which is the opposite in feel.',
    examples: [
      { jp: 'その件については、私の一存では決めかねます。', en: 'I cannot decide that matter on my own.' },
      { jp: '申し訳ありませんが、ご要望には応じかねます。', en: 'I am sorry, but we cannot comply with your request.' },
    ],
    similar: ['kanenai'],
    exercises: [
      X('kaneru', '大変申し訳ございませんが、その件は、私ではお答え＿＿ます。', 'I am very sorry, but I cannot answer that matter.', 'しかね', ['しかねない', 'しがち', 'しっぱなし'], 'お答えしかねます = I am not in a position to answer (polite). しかねない means "might do".'),
      X('kaneru', '今すぐには、お約束＿＿ますので、上司に確認します。', 'I cannot promise right away, so I will check with my boss.', 'しかね', ['しきれ', 'しだし', 'しかけ'], '約束しかねます is a polite refusal for now.'),
      X('kaneru', '彼の意見には、賛成し＿＿。', 'I cannot agree with his opinion.', 'かねる', ['かねない', 'つつある', 'ぬいた'], '賛成しかねる = cannot bring myself to agree.'),
    ],
  }),
  G({
    id: 'naidemonai', pattern: '～ないでもない', meaning: 'it is not that ~ not; I do ~ a little (grudging admission)',
    formation: 'verb ない-form + でもない (also ～なくもない)',
    explanation: 'Double negative: "it is not that it is not so": I can admit it somewhat, with reservation.',
    nuance: 'Hedging and reserved. The speaker is not enthusiastic.',
    mistakes: 'It does not mean "never". It means "to a small degree, yes".',
    examples: [
      { jp: '彼の気持ちが分からないでもない。', en: 'I can, in a way, understand how he feels.' },
      { jp: '行きたくないでもないが、今週は忙しい。', en: 'It’s not that I don’t want to go, but I am busy this week.' },
    ],
    similar: [],
    exercises: [
      X('naidemonai', '彼の言い分も、理解でき＿＿。', 'I can also understand his point, up to a point.', 'ないでもない', ['なければならない', 'ざるを得ない', 'てはならない'], 'A reserved "I can sort of understand" → ないでもない. The others are obligations.'),
      X('naidemonai', '事情を聞けば、許せ＿＿が、やはり納得はできない。', 'If I hear the circumstances, I could forgive it, but I still cannot accept it.', 'ないでもない', ['なければならない', 'ようがない', 'っこない'], 'The speaker half-admits possibility; ないでもない.'),
      X('naidemonai', 'お金があれば、買い＿＿。', 'If I had the money, I wouldn’t mind buying it.', 'たくないでもない', ['たがらない', 'たいわけだ', 'たがる'], 'A hesitant "I do kind of want to" → たくないでもない.'),
    ],
  }),
  G({
    id: 'nikimatteiru', pattern: '～に決まっている', meaning: 'must be ~; of course ~ (a strong conviction)',
    formation: 'plain form (noun / な-adj without だ) + に決まっている',
    explanation: 'The speaker is sure that something is so; it is obvious or self-evident.',
    nuance: 'Spoken and strong, even a little blunt. Based on common sense rather than evidence.',
    mistakes: 'Not for polite or soft statements. Do not use に決まっている for a plan you decided: that is ことにしている.',
    examples: [
      { jp: 'こんなに練習したんだから、合格するに決まっている。', en: 'I practised this much, so of course I will pass.' },
      { jp: '嘘に決まっているよ。', en: 'It’s obviously a lie.' },
    ],
    similar: [],
    exercises: [
      X('nikimatteiru', '彼が犯人じゃない＿＿。いつも優しい人だから。', 'He’s obviously not the culprit. He’s always been a kind person.', 'に決まっている', ['かもしれない', 'つつある', 'わけにはいかない'], 'A firm conviction → に決まっている. かもしれない is only a possibility.'),
      X('nikimatteiru', '徹夜で運転したら、危ない＿＿。', 'Driving after an all-nighter is obviously dangerous.', 'に決まっている', ['ようがない', 'ずくめだ', 'ぎみだ'], 'Common-sense certainty → に決まっている.'),
      X('nikimatteiru', 'あんなに高い店は、おいしい＿＿。', 'A place that expensive must taste good.', 'に決まっている', ['わけではない', 'ないでもない', 'とは限らない'], 'Strong assumption → に決まっている. わけではない and とは限らない deny it.'),
    ],
  }),
  G({
    id: 'kkonai', pattern: '～っこない', meaning: 'there is no way that ~',
    formation: 'verb ます-stem + っこない',
    explanation: 'Strongly says it is impossible or will certainly not happen.',
    nuance: 'Casual, spoken. Close to わけがない.',
    mistakes: 'Not in formal writing; not for ordinary negation.',
    examples: [
      { jp: 'あんなに難しい問題、解けっこないよ。', en: 'There is no way I can solve such a hard problem.' },
      { jp: '一日で全部覚えられっこない。', en: 'No way you can memorise everything in one day.' },
    ],
    similar: [],
    exercises: [
      X('kkonai', '今から走っても、電車に間に合い＿＿。', 'Even if I run now, there’s no way I’ll make the train.', 'っこない', ['かねない', 'つつある', 'ぎみだ'], '間に合いっこない = no way. かねない means "might well".'),
      X('kkonai', '一人で山に登るなんて、出来＿＿よ。', 'There’s no way you can climb a mountain alone.', 'っこない', ['ざるを得ない', 'がちだ', 'にほかならない'], 'Strong impossibility → っこない.'),
      X('kkonai', '彼女が、そんなことを言い＿＿。', 'There’s no way she would say something like that.', 'っこない', ['かけの', 'きりの', 'ずくめの'], '言いっこない = she certainly wouldn’t say that.'),
    ],
  }),
  G({
    id: 'monodakara', pattern: '～ものだから', meaning: 'because ~ (an excuse, a reason for something unexpected)',
    formation: 'plain form (な-adj ～な) + ものだから (spoken: ～もんだから)',
    explanation: 'Gives the reason as an excuse or an explanation for an unplanned result. The reason is usually quite strong in the speaker’s mind.',
    nuance: 'Spoken, apologetic or excusing. The result part is a fact, not a command.',
    mistakes: 'Not for requests or intentions in the result clause (× ものだから、行ってください).',
    examples: [
      { jp: '電車が止まったものだから、遅刻してしまいました。', en: 'Because the train stopped, I was late.' },
      { jp: '忙しかったものだから、連絡できなかったんです。', en: 'I was so busy that I couldn’t get in touch.' },
    ],
    similar: [],
    exercises: [
      X('monodakara', '寝坊した＿＿、朝ご飯を食べる時間がなかった。', 'Because I overslept, I had no time to eat breakfast.', 'ものだから', ['ものの', 'ことなく', 'ばかりに'], 'An excuse for an unplanned result → ものだから.'),
      X('monodakara', 'あまりに驚いた＿＿、声が出なかった。', 'I was so surprised that I couldn’t make a sound.', 'ものだから', ['わけにはいかない', 'ところだ', 'にすぎない'], 'Strong reason for what happened → ものだから.'),
      X('monodakara', '道が分からなかった＿＿、少し遅れました。', 'Because I did not know the way, I was a little late.', 'もんだから', ['もんじゃない', 'ものではない', 'ものがある'], 'もんだから is the spoken form of ものだから.'),
    ],
  }),
  G({
    id: 'kotokara', pattern: '～ことから', meaning: 'from the fact that ~; because ~ (a basis for a name or judgment)',
    formation: 'plain form + ことから',
    explanation: 'Shows the fact from which a conclusion, a name or a judgment arises.',
    nuance: 'Written and news-like. Often used to explain why something is called what it is.',
    mistakes: 'The main clause should be a conclusion or name, not a personal wish.',
    examples: [
      { jp: '駅の近くにあることから、この橋は「駅前橋」と呼ばれている。', en: 'Because it is near the station, this bridge is called “Ekimae Bridge”.' },
      { jp: '足跡が残っていたことから、犯人は男性だと分かった。', en: 'From the footprints left behind, they learned the culprit was a man.' },
    ],
    similar: [],
    exercises: [
      X('kotokara', '桜の名所である＿＿、春は多くの観光客が訪れる。', 'Because it is a famous cherry-blossom spot, many tourists visit in spring.', 'ことから', ['ものの', 'ことなく', 'ながらも'], 'A fact as the basis of a result → ことから.'),
      X('kotokara', '川の近くにある＿＿、この町は「川町」と呼ばれる。', 'The town is called “Kawamachi” because it is by the river.', 'ことから', ['ばかりか', 'ようとして', 'かのような'], 'Naming from a fact → ことから.'),
      X('kotokara', '窓が開いていた＿＿、誰かが入ったと考えられる。', 'From the fact that the window was open, it is thought someone entered.', 'ことから', ['としても', 'わけには', 'ほどでも'], 'A fact leading to a conclusion → ことから.'),
    ],
  }),
  G({
    id: 'nianatte', pattern: '～にあたって', meaning: 'on the occasion of ~; when starting ~',
    formation: 'verb dictionary form / noun + にあたって (also にあたり)',
    explanation: 'Used at an important starting point, introducing preparation, greeting or caution.',
    nuance: 'Formal, written, speeches and notices.',
    mistakes: 'Not for daily events: use とき. Compare に先立って, which stresses "before".',
    examples: [
      { jp: '新しい生活を始めるにあたって、目標を立てた。', en: 'On starting my new life, I set goals.' },
      { jp: '入学にあたり、一言ごあいさつ申し上げます。', en: 'On the occasion of entering school, I will say a few words.' },
    ],
    similar: ['nisakidatte'],
    exercises: [
      X('nianatte', '新しい店を開く＿＿、近所の方々にあいさつに回った。', 'On opening the new shop, I went round greeting the neighbours.', 'にあたって', ['ものの', 'ついでに', 'とたんに'], 'An important starting point → にあたって.'),
      X('nianatte', '契約を結ぶ＿＿、内容をよく読んでください。', 'When concluding the contract, please read the contents carefully.', 'にあたって', ['ながら', 'うちに', 'つつ'], 'A formal "when you start" → にあたって.'),
      X('nianatte', '会議を始める＿＿、一つお願いがあります。', 'On starting the meeting, I have one request.', 'にあたって', ['としたら', 'ばかりに', 'ことなく'], 'Formal occasion → にあたって.'),
    ],
  }),
  G({
    id: 'nisotte', pattern: '～にそって', meaning: 'along ~; in line with ~',
    formation: 'noun + にそって／にそった／にそい',
    explanation: 'Describes something running alongside a physical line (river, road), or following a plan, policy or expectation.',
    nuance: 'Neutral. 沿う is a verb; the kanji is often written 沿って.',
    mistakes: 'Not "on top of" or "through". For basing on facts use に基づいて.',
    examples: [
      { jp: '川にそって、桜が植えられている。', en: 'Cherry trees are planted along the river.' },
      { jp: '計画にそって、作業を進めた。', en: 'We carried on the work in line with the plan.' },
    ],
    similar: [],
    exercises: [
      X('nisotte', '川＿＿歩いていくと、小さな橋があった。', 'Walking along the river, there was a small bridge.', 'にそって', ['をめぐって', 'にわたって', 'をもとに'], 'A line you move along → にそって.'),
      X('nisotte', '会社の方針＿＿、新しい制度を作った。', 'We created a new system in line with company policy.', 'にそって', ['をぬきにして', 'をよそに', 'はさておき'], 'Following a policy → にそって.'),
      X('nisotte', 'お客様の希望に＿＿、プランを変更します。', 'We will change the plan in line with the customer’s wishes.', 'そって', ['わたって', 'かけて', 'つれて'], 'に + そって = in line with.'),
    ],
  }),
  G({
    id: 'nukinishite', pattern: '～をぬきにして', meaning: 'without ~; leaving ~ out',
    formation: 'noun + をぬきにして／をぬきにしては／ぬきで',
    explanation: 'Says that something is done or considered without X, which would normally be included. With は + negative, it means "can’t be done without X".',
    nuance: 'Neutral to formal. 冗談ぬきで = seriously.',
    mistakes: 'Not simply "without" in the sense of "missing" (use なしで).',
    examples: [
      { jp: '冗談をぬきにして、真剣に話しましょう。', en: 'Jokes aside, let’s talk seriously.' },
      { jp: 'お金の話をぬきにしては、この計画は考えられない。', en: 'This plan can’t be considered without talking about money.' },
    ],
    similar: ['hatomokaku'],
    exercises: [
      X('nukinishite', '細かいことを＿＿して、まず全体の話をしましょう。', 'Leaving the details out, let’s first talk about the whole.', 'ぬきに', ['めぐって', 'ふまえて', 'ともなって'], 'Leaving something out → をぬきにして.'),
      X('nukinishite', '日本の文化は、お茶＿＿は語れない。', 'Japanese culture cannot be discussed without tea.', 'をぬきにして', ['をめぐって', 'に応じて', 'に基づいて'], 'ぬきにしては + negative = cannot be done without X.'),
      X('nukinishite', '社長の許可を＿＿して、勝手に決めてはいけない。', 'You must not decide on your own without the president’s permission.', 'ぬきに', ['もとに', 'はじめに', 'こめて'], '許可をぬきにして = bypassing permission.'),
    ],
  }),
  G({
    id: 'nikakete', pattern: '～にかけては', meaning: 'when it comes to ~ (skill/ability)',
    formation: 'noun + にかけては／にかけても',
    explanation: 'Names a field in which someone is outstanding. The result is a praise.',
    nuance: 'Used for positive evaluation of skill. Compare に関しては, which is neutral.',
    mistakes: 'Not for negative judgments.',
    examples: [
      { jp: '料理にかけては、彼女にかなう人はいない。', en: 'When it comes to cooking, nobody can match her.' },
      { jp: '足の速さにかけては、クラスで一番だ。', en: 'In speed, he is the best in the class.' },
    ],
    similar: [],
    exercises: [
      X('nikakete', '計算の速さ＿＿は、彼に勝てる人はいない。', 'When it comes to speed of calculation, nobody can beat him.', 'にかけて', ['にかぎって', 'にそって', 'に対して'], 'Outstanding skill in a field → にかけては.'),
      X('nikakete', '話の面白さ＿＿、あの人は一番だ。', 'In making talk entertaining, he’s the best.', 'にかけては', ['にともなって', 'をとおして', 'ばかりか'], 'Praise for a field → にかけては.'),
      X('nikakete', '記憶力に＿＿は、誰にも負けない自信がある。', 'When it comes to memory, I’m confident I won’t lose to anyone.', 'かけて', ['つれて', 'そって', 'さきだって'], 'に + かけては = when it comes to.'),
    ],
  }),
  G({
    id: 'wokikini', pattern: '～を契機に', meaning: 'prompted by ~; starting from ~ (a turning point)',
    formation: 'noun + を契機に／を契機として',
    explanation: 'A particular event becomes the occasion for a change or new action.',
    nuance: 'Formal, written. Similar to をきっかけに, which is less formal.',
    mistakes: 'The event must be a real trigger, not just a time.',
    examples: [
      { jp: '転職を契機に、東京へ引っ越した。', en: 'Prompted by changing jobs, I moved to Tokyo.' },
      { jp: '事故を契機に、安全の対策が見直された。', en: 'Prompted by the accident, safety measures were reviewed.' },
    ],
    similar: [],
    exercises: [
      X('wokikini', '結婚＿＿、彼女は仕事のしかたを変えた。', 'Prompted by marriage, she changed her way of working.', 'を契機に', ['にそって', 'をぬきに', 'にかけて'], 'An event leading to a change → を契機に.'),
      X('wokikini', '地震＿＿、町では防災の訓練が増えた。', 'Prompted by the earthquake, disaster drills increased in the town.', 'を契機に', ['のみならず', 'にすぎず', 'ずくめで'], 'A turning-point event → を契機に.'),
      X('wokikini', '留学＿＿、日本語の勉強を始めた。', 'Prompted by studying abroad, I started learning Japanese.', 'を契機に', ['を問わず', 'をよそに', 'を通じて'], 'をきっかけに ≈ を契機に. The other options do not fit this meaning.'),
    ],
  }),
  G({
    id: 'wosakaini', pattern: '～を境に', meaning: 'from ~ on; after the turning point of ~',
    formation: 'noun + を境に／を境として',
    explanation: 'A clear dividing point after which a situation changes.',
    nuance: 'Written and news-like. The point is a time or event that divides before and after.',
    mistakes: 'There must be a real change after the point.',
    examples: [
      { jp: 'その日を境に、彼は人が変わったように明るくなった。', en: 'From that day on, he became cheerful, like a changed person.' },
      { jp: '十月を境に、人の流れが大きく変わった。', en: 'From October on, the flow of people changed greatly.' },
    ],
    similar: [],
    exercises: [
      X('wosakaini', '引っ越し＿＿、近所の人との付き合いが増えた。', 'From the move on, my contact with neighbours increased.', 'を境に', ['にそって', 'をぬきに', 'にわたって'], 'A dividing point of before and after → を境に.'),
      X('wosakaini', '四月＿＿、街の様子は一変した。', 'From April on, the appearance of the town changed completely.', 'を境に', ['のみならず', 'にあたって', 'ずくめで'], 'A turning point in time → を境に.'),
      X('wosakaini', 'あの事件＿＿、彼は話さなくなった。', 'From that incident on, he stopped talking.', 'を境に', ['をめぐり', 'にかぎり', 'をつうじて'], 'The incident is the dividing line → を境に.'),
    ],
  }),
  G({
    id: 'kanainaikanouchini', pattern: '～か～ないかのうちに', meaning: 'just as ~ (almost at the same moment)',
    formation: 'verb dictionary form + か + verb ない-form + かのうちに',
    explanation: 'Something happens almost at the exact moment another action begins, before the first one is quite finished.',
    nuance: 'Slightly literary; vivid. Often with sudden events.',
    mistakes: 'The same verb is repeated: 着くか着かないかのうちに.',
    examples: [
      { jp: '電車に乗るか乗らないかのうちに、ドアが閉まった。', en: 'The door closed just as I was getting on the train.' },
      { jp: '家を出るか出ないかのうちに、雨が降り出した。', en: 'It started raining just as I left the house.' },
    ],
    similar: ['sobakara'],
    exercises: [
      X('kanainaikanouchini', '席に着くか着かない＿＿、先生の話が始まった。', 'The teacher’s talk began just as I took my seat.', 'かのうちに', ['ばかりに', 'ものの', 'ながらも'], 'V か V ない かのうちに = at almost the same moment. The other options give a reason or concession instead.'),
      X('kanainaikanouchini', '電話を切るか切らない＿＿、また電話が鳴った。', 'The phone rang again just as I hung up.', 'かのうちに', ['ところで', 'ことなく', 'たびに'], 'The verb is repeated positive then negative, then かのうちに for "almost simultaneous".'),
      X('kanainaikanouchini', '寝るか寝ない＿＿、もう朝になっていた。', 'It was already morning almost as soon as I had gone to bed.', 'かのうちに', ['ほどに', 'つつも', 'とたんに'], 'Almost simultaneous → かのうちに. とたんに needs a past verb directly before it.'),
    ],
  }),
  G({
    id: 'zujimai', pattern: '～ずじまい', meaning: 'ended up never ~ing',
    formation: 'verb ない-form (without ない) + ずじまい (する → せずじまい)',
    explanation: 'Says that one never got to do something, to the end, regretfully.',
    nuance: 'Regretful and conversational. The action was intended but never happened.',
    mistakes: 'Not for something you did not want to do.',
    examples: [
      { jp: '忙しくて、友だちに会えずじまいだった。', en: 'I was busy and ended up never seeing my friend.' },
      { jp: '結局、行かずじまいで、帰国した。', en: 'In the end I never went and returned to my country.' },
    ],
    similar: [],
    exercises: [
      X('zujimai', '手紙を書こうと思っていたが、結局書か＿＿だった。', 'I meant to write a letter but ended up never writing.', 'ずじまい', ['なきゃ', 'がちに', 'つつあり'], '書かずじまい = never got around to writing.'),
      X('zujimai', '東京タワーに登れ＿＿で、帰国してしまった。', 'I ended up leaving the country without ever going up Tokyo Tower.', 'ずじまい', ['ざるを得ず', 'つつあり', 'ないでもなく'], 'A regret about not doing it → ずじまい.'),
      X('zujimai', '結局、謝ら＿＿になってしまった。', 'In the end I never apologised.', 'ずじまい', ['ずくめ', 'きわまり', 'ずに限る'], '謝らずじまい = ended without apologising.'),
    ],
  }),
  G({
    id: 'zukume', pattern: '～ずくめ', meaning: 'all ~; full of ~; nothing but ~',
    formation: 'noun + ずくめ (黒ずくめ、いいことずくめ)',
    explanation: 'Everything is of one kind: all black, all good news, nothing but trouble.',
    nuance: 'Fixed set of nouns: 黒、いいこと、ごちそう、規則 …',
    mistakes: 'Not with any noun. Compare だらけ, which means "full of (usually dirty or negative)".',
    examples: [
      { jp: '黒ずくめの男が、駅のホームに立っていた。', en: 'A man dressed all in black stood on the platform.' },
      { jp: '今日は、いいことずくめの一日だった。', en: 'Today was a day of nothing but good things.' },
    ],
    similar: [],
    exercises: [
      X('zukume', '彼は黒＿＿の服で、夜の町を歩いていた。', 'He walked the night town dressed all in black.', 'ずくめ', ['だらけ', 'ぎみ', 'がち'], '黒ずくめ is the set phrase: all black.'),
      X('zukume', '旅行中は、いいこと＿＿だった。', 'During the trip it was nothing but good things.', 'ずくめ', ['っぱなし', 'づらい', 'ぬき'], 'いいことずくめ = nothing but good.'),
      X('zukume', '今夜は、ごちそう＿＿の食事だった。', 'Tonight’s meal was a feast of delicacies.', 'ずくめ', ['ばかり', 'まみれ', 'ざかり'], 'ごちそうずくめ = nothing but treats.'),
    ],
  }),
  G({
    id: 'womotoni', pattern: '～をもとに', meaning: 'based on ~; using ~ as material',
    formation: 'noun + をもとに／をもとにして／をもとにした',
    explanation: 'Uses data, an experience or a story as the basis from which something is made or decided.',
    nuance: 'Neutral. The base is the source material; に基づいて is closer to "in accordance with".',
    mistakes: 'Not for rules and laws (に基づいて). For "in line with a plan" use にそって.',
    examples: [
      { jp: '実際にあった話をもとに、映画が作られた。', en: 'The film was made based on a true story.' },
      { jp: 'アンケートの結果をもとに、サービスを改善した。', en: 'We improved the service based on the survey results.' },
    ],
    similar: [],
    exercises: [
      X('womotoni', '昔の記録＿＿、この町の歴史を調べた。', 'I researched the town’s history based on old records.', 'をもとに', ['をぬきに', 'にそって', 'にかけて'], 'Source material → をもとに.'),
      X('womotoni', '自分の経験＿＿、アドバイスをした。', 'I gave advice based on my own experience.', 'をもとに', ['をよそに', 'をぬきにして', 'を問わず'], 'Experience as a basis → をもとに.'),
      X('womotoni', 'この小説は、事実＿＿して書かれている。', 'This novel is written based on facts.', 'をもとに', ['を通じ', 'をめぐり', 'にそい'], 'をもとにして = based on. The other options do not fit this meaning.'),
    ],
  }),
];
