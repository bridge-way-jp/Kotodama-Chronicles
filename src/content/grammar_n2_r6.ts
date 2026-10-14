import type { GrammarEntry } from '../core/types';

/**
 * N2 grammar, region 7 (Tokyo: city life, emphasis, feelings, calls to act together).
 * Original sentences and exercises (not official JLPT material). The right answer is first; the game shuffles.
 */
const G = (g: Omit<GrammarEntry, 'level' | 'chapter' | 'source'>): GrammarEntry => ({ ...g, level: 'N2', chapter: 7, source: 'n2course' });

const X = (id: string, sentence: string, en: string, right: string, wrong: [string, string, string], why: string) => ({
  sentence,
  en,
  options: [{ text: right, grammar: id }, { text: wrong[0] }, { text: wrong[1] }, { text: wrong[2] }],
  answer: 0,
  why,
});

export const GRAMMAR_R6: GrammarEntry[] = [
  G({
    id: 'kotodashi', pattern: '～ことだし', meaning: 'since ~ (a light reason that backs up a suggestion)',
    formation: 'plain form + ことだし',
    explanation: 'Gives a mild, shared reason ("seeing that…") and then suggests or decides something. The reason is soft, not a strict cause.',
    nuance: 'Conversational. The main clause is usually a suggestion, an invitation or a decision.',
    mistakes: 'Not for strong, objective causes (use ので／から). It sounds odd with a command.',
    examples: [
      { jp: '今日は天気もいいことだし、歩いて行きましょう。', en: 'The weather is nice today, so let’s walk.' },
      { jp: '来週は休みのことだし、旅行でもしようかな。', en: 'Next week is a holiday, so maybe I’ll go on a trip.' },
    ],
    similar: [],
    exercises: [
      X('kotodashi', '終電にはまだ間に合う＿＿、もう少し飲んでいこうか。', 'There is still time for the last train, so shall we drink a bit more?', 'ことだし', ['ものの', 'ばかりに', 'どころか'],
        'A light reason + a suggestion → ことだし. ものの = "although", ばかりに = "only because (bad result)", どころか = "far from".'),
      X('kotodashi', '部屋も片付いた＿＿、そろそろ友だちを呼んでみよう。', 'The room is tidy now, so I’ll try inviting friends soon.', 'ことだし', ['ことなく', 'あげく', 'ながらも'],
        'ことだし links a soft reason to what the speaker decides. The others do not give a reason.'),
      X('kotodashi', '私も行く＿＿、あなたも一緒に行きませんか。', 'I’m going too, so won’t you come along?', 'ことだし', ['ものか', 'つつある', 'きわまりない'],
        'A soft reason followed by an invitation → ことだし.'),
    ],
  }),
  G({
    id: 'ttcheba', pattern: '～ってば', meaning: 'I said ~! (insistence); about ~ (topic, casual)',
    formation: 'plain form / noun + ってば',
    explanation: 'In casual speech it repeats something the listener did not listen to, with impatience: "I told you!" It can also bring up a person or thing as the topic, with a slightly annoyed or fond tone.',
    nuance: 'Very casual spoken Japanese; not for writing or polite speech.',
    mistakes: 'Do not use it with a superior. Compare ～って (quoting) which is neutral.',
    examples: [
      { jp: '早く起きなさいってば！', en: 'Get up already, I said!' },
      { jp: '田中さんってば、また遅刻したの？', en: 'Honestly, Tanaka, late again?' },
    ],
    similar: [],
    exercises: [
      X('ttcheba', '聞いてる？ だから、今日は無理＿＿！', 'Are you listening? I said I can’t today!', 'ってば', ['わけだ', 'ものの', 'にすぎない'],
        'Repeating an ignored statement with impatience → ってば. The others are not spoken insistence.'),
      X('ttcheba', 'ねえ、お母さん＿＿、聞いてよ！', 'Hey, Mum, listen to me!', 'ってば', ['にわたって', 'をめぐって', 'ずくめ'],
        'Calling out with impatience in casual speech → ってば; the others are formal.'),
      X('ttcheba', '大丈夫だ＿＿。心配しすぎだよ。', 'It’s fine, I said. You worry too much.', 'ってば', ['ともなると', 'つつも', 'べきだ'],
        'Insistent casual "I said it’s fine" → ってば.'),
    ],
  }),
  G({
    id: 'kotoka', pattern: '～ことか', meaning: 'how ~! (strong feeling)',
    formation: 'plain form (な-adj ～な／～である, noun ～な) + ことか。 Often with どれほど／どんなに／何度',
    explanation: 'Expresses strong feeling about the degree of something, usually with a question word like どんなに／どれほど／何度.',
    nuance: 'Written and spoken, a little emotional. Ends the sentence.',
    mistakes: 'Not a real question. Do not add か as a yes/no question.',
    examples: [
      { jp: '合格の知らせを聞いて、どんなに嬉しかったことか。', en: 'How happy I was to hear I had passed!' },
      { jp: '雨の日の満員電車は、どれほど大変なことか。', en: 'How hard a packed train on a rainy day is!' },
    ],
    similar: [],
    exercises: [
      X('kotoka', '一人で暮らし始めたころは、どんなに寂しかった＿＿。', 'How lonely it was when I started living alone!', 'ことか', ['ものの', 'わけだ', 'ばかり'],
        'どんなに + plain form + ことか = "how very…". The other options do not make an exclamation.'),
      X('kotoka', '彼の優しさに、何度助けられた＿＿。', 'How many times his kindness has helped me!', 'ことか', ['ところだ', 'にすぎない', 'かのようだ'],
        '何度 + ことか = emotional "how many times".'),
      X('kotoka', '母は、私のことをどれほど心配していた＿＿。', 'How worried my mother had been about me!', 'ことか', ['ところで', 'ほどでもない', 'たびに'],
        'どれほど + ことか = strong feeling about degree.'),
    ],
  }),
  G({
    id: 'naimonoka', pattern: '～ないものか', meaning: 'isn’t there some way to ~? (I wish I could)',
    formation: 'verb ない-form + ものか／ものだろうか',
    explanation: 'Expresses a strong wish for something to be possible, often after trying hard: "Isn’t there some way to…?"',
    nuance: 'Slightly formal and written. The speaker is searching for a solution.',
    mistakes: 'Do not confuse with ～ものか ("as if / no way"), which denies: そんなことがあるものか.',
    examples: [
      { jp: '騒音を減らす方法はないものか。', en: 'Isn’t there some way to reduce the noise?' },
      { jp: '何とかして、母に連絡できないものかと考えた。', en: 'I wondered whether there was some way to get in touch with my mother.' },
    ],
    similar: [],
    exercises: [
      X('naimonoka', '満員電車をもう少し楽にならない＿＿と、みんなが思っている。', 'Everyone thinks: isn’t there some way to make packed trains a bit easier?', 'ものか', ['わけだ', 'ばかりか', 'つつある'],
        'Wish for a solution: ない + ものか. The others do not express "isn’t there some way".'),
      X('naimonoka', 'この問題を解決できない＿＿と、彼は何日も考え続けた。', 'He kept thinking for days: isn’t there some way to solve this problem?', 'ものか', ['ものの', 'ことなく', 'あまり'],
        '〜ないものか expresses an earnest search for a way.'),
      X('naimonoka', '早く元気になってくれない＿＿と、祈っていた。', 'I prayed that she would somehow get well soon.', 'ものか', ['ところか', 'ためか', 'かのよう'],
        'A hopeful wish with ない + ものか (somehow, let her…).'),
    ],
  }),
  G({
    id: 'youdewanaika', pattern: '～ようではないか', meaning: 'let’s ~ (a firm call to act together)',
    formation: 'verb volitional-stem (よう／う) ではないか',
    explanation: 'A speech-like invitation to a group: "Let us…!" Used in speeches, meetings and writing.',
    nuance: 'Formal and a bit stiff or old-fashioned; often used by men or in speeches. Everyday speech uses ましょう.',
    mistakes: 'Not for polite everyday invitations. It sounds like a rally speech.',
    examples: [
      { jp: '皆さん、力を合わせて、この町を守ろうではないか。', en: 'Everyone, let us join forces and protect this town!' },
      { jp: '今日から、あいさつを大切にしようではないか。', en: 'From today, let’s value greetings!' },
    ],
    similar: [],
    exercises: [
      X('youdewanaika', '皆さん、最後まで頑張ろう＿＿。', 'Everyone, let’s keep going to the end!', 'ではないか', ['ものか', 'わけだ', 'ながら'],
        'A speech-like "let us" → 〜ようではないか. ものか is a denial; わけだ is an explanation.'),
      X('youdewanaika', 'お互いの違いを認め合おう＿＿。', 'Let us accept one another’s differences!', 'ではないか', ['ところだ', 'かもしれない', 'ばかりだ'],
        'Volitional + ではないか = firm call to act together.'),
      X('youdewanaika', '困っている人がいたら、声をかけよう＿＿。', 'If someone is in trouble, let’s speak to them!', 'ではないか', ['にすぎない', 'とはいえ', 'ずくめだ'],
        'A call to act together → ようではないか.'),
    ],
  }),
  G({
    id: 'kiwamarinai', pattern: '～きわまりない', meaning: 'extremely ~; ~ to the extreme',
    formation: 'na-adjective stem (or noun-like word such as 失礼, 危険, 迷惑) + きわまりない',
    explanation: 'Says that something is extreme, usually in a negative sense. The word before is a な-adjective stem.',
    nuance: 'Formal, written, critical. Cannot be used for positive things.',
    mistakes: 'Not with い-adjectives (× 高いきわまりない). Not for praise.',
    examples: [
      { jp: '電車の中での大声は、迷惑きわまりない行為だ。', en: 'Talking loudly on a train is an extremely annoying act.' },
      { jp: '雪の夜に薄い靴で山へ行くのは、危険きわまりない。', en: 'Going up a mountain in thin shoes on a snowy night is extremely dangerous.' },
    ],
    similar: [],
    exercises: [
      X('kiwamarinai', '約束を何度も忘れるなんて、失礼＿＿。', 'Forgetting an appointment again and again is extremely rude.', 'きわまりない', ['ずくめだ', 'ぎみだ', 'がたい'],
        '失礼 (a な-adjective stem) + きわまりない = extremely rude. The others do not attach to 失礼 in this meaning.'),
      X('kiwamarinai', '夜中の工事の音は、迷惑＿＿。', 'The noise of construction at midnight is extremely annoying.', 'きわまりない', ['かねない', 'っぱなしだ', 'だらけだ'],
        'Negative extreme with 迷惑 → きわまりない.'),
      X('kiwamarinai', '階段に荷物を置くのは、危険＿＿行為だ。', 'Leaving luggage on the stairs is an extremely dangerous act.', 'きわまりない', ['きれない', 'つつある', 'かのような'],
        '危険 + きわまりない, then the noun 行為.'),
    ],
  }),
  G({
    id: 'teyamanai', pattern: '～てやまない', meaning: 'never stop ~ing (a lasting feeling)',
    formation: 'verb て-form + やまない (verbs of feeling: 願う、祈る、愛する、期待する、感謝する)',
    explanation: 'Expresses a feeling that keeps going and does not stop, such as hope, love or thanks.',
    nuance: 'Formal and literary; used in speeches and letters. Limited to verbs of feeling.',
    mistakes: 'Not for ordinary actions (× 食べてやまない).',
    examples: [
      { jp: '皆さんの健康と幸せを、願ってやみません。', en: 'I never stop wishing for your health and happiness.' },
      { jp: '彼女の活躍を、期待してやまない。', en: 'I keep expecting great things from her.' },
    ],
    similar: [],
    exercises: [
      X('teyamanai', '遠い町で暮らす娘の成功を、祈っ＿＿。', 'I never stop praying for the success of my daughter living in a faraway town.', 'てやまない', ['てしかたがない', 'つつある', 'きわまりない'],
        'A lasting feeling with a feeling verb → ～てやまない. てしかたがない = "can’t help feeling", but the formal "never ceases" is やまない.'),
      X('teyamanai', 'この町と人々を、愛し＿＿。', 'I never stop loving this town and its people.', 'てやまない', ['てならない', 'ぬいた', 'っこない'],
        '愛してやまない is a set expression for lasting love.'),
      X('teyamanai', '皆さんの温かい支援に、感謝し＿＿。', 'I keep being grateful for everyone’s warm support.', 'てやまない', ['かけの', 'ようがない', 'ぎみの'],
        '感謝してやまない = never-ending gratitude.'),
    ],
  }),
  G({
    id: 'toatte', pattern: '～とあって', meaning: 'because it is ~ (a special situation); given that ~',
    formation: 'plain form / noun + とあって',
    explanation: 'Gives a special circumstance as the reason for an expected result: "since it is [special], [result]".',
    nuance: 'Written and news-like. The result is a visible state, not a command or a wish.',
    mistakes: 'Do not use for personal intentions (× 行きたいとあって、行く).',
    examples: [
      { jp: '連休初日とあって、駅は大変な人出だった。', en: 'It being the first day of the holiday, the station was packed.' },
      { jp: '人気の店とあって、朝から長い行列ができていた。', en: 'As it was a popular shop, a long queue had formed from the morning.' },
    ],
    similar: [],
    exercises: [
      X('toatte', '花火大会の日＿＿、川沿いは多くの人でにぎわっていた。', 'It being the day of the fireworks festival, the riverside was lively with people.', 'とあって', ['ばかりか', 'つつも', 'ものの'],
        'Special day + visible result → とあって. The others do not give "since it is a special day".'),
      X('toatte', '雨の日の朝＿＿、電車はいつもより混んでいた。', 'It being a rainy morning, the train was more crowded than usual.', 'とあって', ['ものか', 'ずじまい', 'ともかく'],
        'A circumstance explains a result → とあって.'),
      X('toatte', '有名なシェフの店＿＿、予約は三か月先まで埋まっている。', 'It being a famous chef’s restaurant, reservations are full three months ahead.', 'とあって', ['ことなく', 'ようがない', 'ぎみで'],
        'とあって links a special situation to its result.'),
    ],
  }),
  G({
    id: 'nikagiru', pattern: '～に限る', meaning: '~ is the best; nothing beats ~',
    formation: 'verb dictionary form / noun + に限る',
    explanation: 'Says that one choice is clearly the best for the situation, in the speaker’s opinion.',
    nuance: 'Casual to neutral, personal opinion. Often about food, drinks and weather.',
    mistakes: 'Different from ～に限り／～に限って ("only for ~", "of all times"). The plain statement is "X に限る".',
    examples: [
      { jp: '疲れた夜は、お風呂に入ってすぐ寝るに限る。', en: 'On a tired night, nothing beats a bath and going straight to bed.' },
      { jp: '寒い日は、温かいラーメンに限る。', en: 'On a cold day, nothing beats hot ramen.' },
    ],
    similar: [],
    exercises: [
      X('nikagiru', '仕事のあとの一杯は、冷たいビール＿＿。', 'After work, a cold beer is the best.', 'に限る', ['ずくめ', 'ぎみ', 'がち'],
        'Opinion "nothing beats X" → に限る.'),
      X('nikagiru', '朝は、早く起きて散歩する＿＿。', 'In the morning, nothing beats getting up early for a walk.', 'に限る', ['わけにはいかない', 'つつある', 'かのよう'],
        'Dictionary form + に限る = the best choice here.'),
      X('nikagiru', '風邪のときは、ゆっくり休む＿＿。', 'When you have a cold, nothing beats a good rest.', 'に限る', ['にすぎない', 'にほかならない', 'ようがない'],
        'The best way is resting → に限る. にすぎない = "nothing more than".'),
    ],
  }),
];
