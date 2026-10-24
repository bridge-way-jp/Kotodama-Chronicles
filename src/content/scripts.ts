import type { DialogueRule, Mood, Step } from '../core/script';
import { GRAMMAR_BY_ID } from './grammar';
import { DECO_CATALOG, SPECIES } from './creatures';
import { TOKYO_SCRIPTS } from './scripts_tokyo';
import { ROOMS2_SCRIPTS } from './scripts_rooms2.gen';
import { applyBeats, sleepScenes } from './scenes';

/**
 * All interaction scripts, keyed by NPC id or map-object id.
 * The first rule whose `when` condition matches is played.
 * Dialogue is in Japanese with optional English (shown on demand).
 */

const say = (who: string | undefined, text: string, en?: string, mood?: Mood): Step => (mood ? { say: text, who, en, mood } : { say: text, who, en });
const n = (text: string, en?: string): Step => say(undefined, text, en);

/** a grammar fill-in quiz built from the grammar entry's own exercise */
const grammarQuiz = (id: string, idx = 0): Step => {
  const g = GRAMMAR_BY_ID[id];
  const ex = g.exercises[idx];
  return {
    quiz: { q: ex.sentence, qEn: ex.en, options: ex.options.map((o) => o.text), answer: ex.answer, why: ex.why },
    keys: ['g:' + id],
    area: 'grammar',
    retry: true,
  };
};

const talkQuiz = (species: string, idx = 0): Step => {
  const t = SPECIES[species].talk[idx];
  return {
    quiz: { q: t.line, qEn: t.en, options: t.options, answer: t.answer, why: t.why },
    area: 'reading',
    retry: true,
  };
};

/** Grandma Tsuru's guesthouse: a free bed in Yukimi once you have met her */
/** the guesthouse in Gion: a free bed once you have met Ms. Matsuo */
const MATSUO_STAY: Step[] = [
  {
    choice: [
      {
        text: '泊めてもらう', en: 'Stay the night (heals your team, starts a new day)',
        then: [
          say('matsuo', 'どうぞ、ごゆっくり。{朝|あさ}ごはんも、用意しておきますね。', 'Please, make yourself at home. I’ll have breakfast ready, too.', 'happy'),
          { do: [{ sleep: true }] },
          n('町家の二階で、ぐっすり眠った。{格子|こうし}の{向|む}こうから、朝の光がさしている。言霊たちも元気になった！', 'You sleep soundly upstairs in the machiya. Morning light comes through the lattice. Your Kotodama are fully healed!'),
        ],
      },
      { text: 'お茶だけいただく', en: 'Just have some tea' },
    ],
  },
];

const TSURU_STAY: Step[] = [
  {
    choice: [
      {
        text: '泊めてもらう', en: 'Stay the night (heals your team, starts a new day)',
        then: [
          say('tsuru', '遠慮せんでええ。{囲炉裏|いろり}のそばに布団を敷いとくでね。', 'Don’t be shy. I’ll lay out a futon by the hearth.', 'happy'),
          { do: [{ sleep: true }] },
          n('囲炉裏の火の音を聞きながら、ぐっすり眠った。言霊たちも元気になった！', 'Listening to the crackling hearth, you sleep soundly. Your Kotodama are fully healed!'),
        ],
      },
      { text: 'お茶だけいただく', en: 'Just have some tea' },
    ],
  },
];

export const SCRIPTS: Record<string, DialogueRule[]> = {
  // ================================================================ apartment
  desk: [
    {
      when: { notObj: 'mq1.letter' },
      steps: [
        n('机の上に、鍵と手紙が置いてある。大家さんからの手紙のようだ。', 'A key and a letter are on the desk. It seems to be from the landlady.'),
        { reading: 'r_mori_letter' },
        { do: [{ objective: 'mq1.letter' }, { learn: ['v:ooya', 'v:shuushuu', 'v:bunbetsu', 'v:keijiban', 'v:enryo'] }] },
        n('アパートの前で、森さんが待っているようだ。', 'It seems Ms. Mori is waiting in front of the apartment.'),
      ],
    },
    {
      steps: [
        n('勉強机だ。今日は何をしようか。', 'Your study desk. What will you do today?'),
        {
          choice: [
            { text: '復習する', en: 'Review (spaced repetition)', then: [{ do: [{ open: 'review' }] }] },
            { text: 'JLPT準備を確認する', en: 'Check JLPT N2 readiness', then: [{ do: [{ open: 'dashboard' }] }] },
            { text: '言葉の庭を見る', en: 'Look at your word garden (every word you meet grows here)', then: [{ do: [{ open: 'garden' }] }] },
            { text: '実力診断テスト', en: 'Diagnostic assessment', then: [{ do: [{ open: 'diagnostic' }] }] },
            {
              text: '通販カタログを見る', en: 'Browse the mail-order catalogue (decorate your room)',
              then: [{ say: 'インテリアの{通販|つうはん}カタログだ。部屋に何を{飾|かざ}ろうかな。', en: 'An interior-goods catalogue. What should I decorate my room with?' }, { shop: DECO_CATALOG }],
            },
            { text: 'やめる', en: 'Leave' },
          ],
        },
      ],
    },
  ],
  bed: [
    {
      steps: [
        n('ふかふかのベッドだ。少し休もうか？', 'A soft bed. Rest for a while?'),
        {
          choice: [
            {
              text: '休む', en: 'Sleep (heals your team, advances the day)',
              then: [{ do: [{ sleep: true }] }, ...sleepScenes(), n('ぐっすり眠った。言霊たちも元気になった！', 'You slept well. Your Kotodama are fully healed!')],
            },
            { text: 'まだ起きている', en: 'Stay up' },
          ],
        },
      ],
    },
  ],
  shelf: [
    {
      steps: [
        n('本棚だ。引っ越しのときに持ってきた日本語の本が並んでいる。', 'A bookshelf with the Japanese books you brought when you moved.'),
        n('（メニューの「ノート」で、覚えた言葉や文法をいつでも見直せる。）', '(You can review learned words and grammar any time in the menu under “Notebook”.)'),
      ],
    },
  ],
  plant: [{ steps: [n('よく手入れされた観葉植物だ。', 'A well-tended house plant.')] }],
  window: [{ steps: [n('窓の外に、日野森の町が見える。', 'You can see Hinomori through the window.')] }],

  // ================================================================ Ms. Mori
  mori: [
    {
      when: { all: [{ date: ['01-01', '01-02', '01-03'] }, { notYearFlag: 'otoshidama' }, { questDone: 'mq1' }] },
      steps: [
        say('mori', 'あけましておめでとう、@nameちゃん！ 今年もよろしくね。', 'Happy New Year, @name! Let’s have another good year together.', 'happy'),
        { cg: 'cg_egg_newyear', say: '森さんは、かわいい{袋|ふくろ}を両手で差し出してくれた。', en: 'Ms. Mori holds out a pretty little envelope with both hands.' },
        say('mori', 'はい、これ。少ないけど、お{年玉|としだま}よ。日本では、お正月に子どもや若い人にあげるの。', 'Here, it isn’t much, but it’s otoshidama. In Japan we give it to children and young people at New Year.', 'happy'),
        { do: [{ money: 2000 }, { yearFlag: 'otoshidama' }, { secret: 'shogatsu' }, { note: 'newyear' }] },
        n('「{初詣|はつもうで}」は、もう行った？ 神社でおみくじを引くと、一年の運がわかるらしい。', 'Have you done hatsumōde, the first shrine visit of the year? A fortune slip at the shrine tells your luck for the year.'),
      ],
    },
    {
      when: { notObj: 'mq1.letter' },
      steps: [say('mori', 'あら、@nameさん！ 机の上の手紙、もう読んだ？ まずは読んでみてね。', 'Oh, @name! Have you read the letter on your desk yet? Read it first.')],
    },
    {
      when: { all: [{ obj: 'mq1.letter' }, { notObj: 'mq1.mori' }] },
      steps: [
        say('mori', '@nameさん、いらっしゃい！ {大家|おおや|v:ooya}の森です。{長旅|ながたび}お疲れさま。', 'Welcome, @name! I’m Mori, your landlady. You must be tired after the long journey.'),
        say('mori', '日野森はね、小さいけど、いい町よ。駅も近いし、川沿いの散歩道もきれいなの。', 'Hinomori is small, but it’s a nice town. The station is close and the riverside path is lovely.'),
        say('mori', 'ただ……最近、ちょっと{不思議|ふしぎ}なことが起きていてね。', 'But… lately, something strange has been happening.'),
        say('mori', '言葉を急に忘れてしまう人が増えているの。年のせいだって言う人もいるけど、お年寄りだけに起きている{わけではない||g:wakedewanai}のよ。', 'More and more people suddenly forget words. Some say it’s age, but it’s not only happening to old people.'),
        { teach: 'g:wakedewanai' },
        {
          quiz: {
            q: '森さんが言いたいことは何か。',
            qEn: 'What does Ms. Mori mean?',
            options: ['言葉を忘れるのは、お年寄りだけではない', 'お年寄りは言葉を忘れない', '言葉を忘れる人は一人もいない', '言葉を忘れるのは、年のせいに違いない'],
            answer: 0,
            why: '～だけに起きているわけではない = it is not ONLY happening to the elderly (partial denial).',
          },
          keys: ['g:wakedewanai'],
          area: 'grammar',
          retry: true,
        },
        say('mori', 'そうそう。それでね、駅前のコンビニのハルトくんも、最近困っているみたいなの。', 'Right. And Haruto from the convenience store seems to be having trouble lately too.'),
        say('mori', '町を歩く{ついでに||g:tsuideni}、ちょっと寄ってあげてくれる？ コンビニは、この大通りの向こう側よ。', 'While you’re walking around town, could you drop by? The store is across the main street.'),
        { teach: 'g:tsuideni' },
        say('mori', '困ったときは{お互い様|おたがいさま|v:otagaisama}。何かあったら、いつでも声をかけてね。', 'We all need help sometimes. Call me any time.'),
        { do: [{ objective: 'mq1.mori' }, { note: 'landlord' }, { rel: 'mori', points: 2, memory: 'first_meeting' }, { learn: ['v:otagaisama', 'g:wakedewanai', 'g:tsuideni'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq5' }, { notFlag: 'mori_gift' }, { flag: 'forest_open' }] },
      steps: [
        say('mori', 'みどりの森へ行くの？ 最近、森の奥で光るものを見たって人がいるのよ。', 'You’re going to Midori Forest? Someone said they saw something glowing deep inside.'),
        say('mori', '{慌て|あわて|v:awateru}なくていいから、気をつけてね。はい、おにぎり。{遠慮|えんりょ|v:enryo}しないで持っていって。', 'No need to rush — just be careful. Here, take these rice balls. Don’t be shy.'),
        { do: [{ give: 'onigiri', n: 2 }, { flag: 'mori_gift' }, { rel: 'mori', points: 1 }, { learn: ['v:awateru'] }] },
      ],
    },
    {
      when: { all: [{ flag: 'chapter1_done' }, { questNotStarted: 'mq6' }] },
      steps: [
        { do: [{ music: 'memory' }] },
        say('mori', 'あら、おかえりなさい。えっと……あなた、お名前は……。', 'Oh, welcome back. Um… your name is…', 'surprised'),
        n('森さんは、困ったように笑った。いつも「@nameちゃん」と呼んでくれていたのに。', 'Ms. Mori smiled awkwardly. She has always called you “@name”.'),
        {
          choice: [
            { text: '@nameです。', en: 'It’s @name.' },
            { text: '大丈夫ですか？', en: 'Are you all right?' },
          ],
        },
        say('mori', 'そうそう、@nameちゃん！ ごめんなさいね。最近、{忘れっぽく|わすれっぽく|v:wasureppoi}なっちゃって。', 'Yes, of course, @name! I’m sorry. I’ve become so forgetful lately.', 'worried'),
        say('mori', '昨日は、亡くなった主人の名前も、すぐに出てこなかったの。……おかしいわね。', 'Yesterday, even my late husband’s name didn’t come to me right away… Strange, isn’t it.', 'worried'),
        {
          quiz: {
            q: '森さんについて、正しいものはどれか。',
            qEn: 'Which statement about Ms. Mori is correct?',
            options: ['大切な人の名前が、すぐに思い出せないことがある', 'マリアの名前を一度も聞いたことがない', 'わざと名前を言わなかった', '主人の名前を新しく覚えた'],
            answer: 0,
            why: '忘れっぽい = forgetful; she could not recall your name or her husband’s name right away.',
          },
          keys: ['v:wasureppoi'], area: 'reading', retry: true,
        },
        n('町で起きている「忘却」が、森さんにも……。霧島博士に相談しよう。', 'The “forgetting” in town is reaching Ms. Mori too… You should talk to Dr. Kirishima.'),
        { do: [{ startQuest: 'mq6' }, { chapter: 2 }, { objective: 'mq6.mori' }, { rel: 'mori', points: 1, memory: 'forgot_name' }, { learn: ['v:wasureppoi'] }] },
      ],
    },
    {
      when: { all: [{ item: 'name_scroll' }, { notFlag: 'mori_scroll' }] },
      steps: [
        { do: [{ music: 'memory' }] },
        n('森さんに、谷で書いた書を渡した。', 'You give Ms. Mori the calligraphy you wrote in the valley.'),
        say('mori', 'これは……「森」。わたしの名前ね。', 'This is… “Mori”. My name.', 'surprised'),
        say('mori', '上手じゃないけど、一画一画、ていねいに書いてある。……あなたが書いてくれたのね、@nameちゃん。', 'It isn’t perfect, but every stroke is careful… You wrote this for me, @name.', 'happy'),
        say('mori', '不思議ね。これを見ていると、忘れかけていたことが、少しずつ戻ってくるみたい。主人の名前も……そう、「{健一|けんいち}」。', 'Strange. Looking at this, the things I was forgetting seem to come back little by little. My husband’s name too… yes, “Ken’ichi”.', 'happy'),
        say('mori', '部屋に{飾|かざ}っておくわ。忘れそうになったら、毎朝これを見るの。ありがとう。', 'I’ll hang it in my room. Whenever I start to forget, I’ll look at it every morning. Thank you.', 'happy'),
        { do: [{ take: 'name_scroll' }, { flag: 'mori_scroll' }, { rel: 'mori', points: 3, memory: 'name_scroll' }] },
        { cg: 'cg_ending', say: '名前は、呼ばれるたびに強くなる。\n― 第二章「桃と湯けむりの谷」完 ―', en: 'A name grows stronger every time it is called.\n— End of Chapter 2: “The Valley of Peaches and Steam” —' },
        n('Chapter 2 complete! Talk to Ms. Mori again to begin Chapter 3. The valley stays open: help out with jobs, befriend the valley Kotodama and keep reviewing.'),
      ],
    },
    {
      when: { all: [{ flag: 'mori_scroll' }, { questNotStarted: 'mq10' }] },
      steps: [
        say('mori', '@nameちゃん、ちょっといい？ 雪見村にいる古い友だちの、つるさんから{便|たよ|v:tayori}りが来たの。', '@name, do you have a moment? I got a letter from my old friend Tsuru in Yukimi Village.'),
        n('手紙を見せてもらった。ところどころ、字があるはずの場所が、白く抜けている。', 'She shows you the letter. Here and there, where characters should be, there are only white gaps.'),
        say('mori', 'つるさん、昔はとてもきれいな字を書く人だったのに……。わたしと同じように、言葉が消えはじめているのかもしれない。', 'Tsuru used to have such beautiful handwriting… Maybe her words are starting to fade, just like mine.', 'worried'),
        say('mori', '北の山の雪見村まで、日野森駅から電車が出ているわ。つるさんの様子を、見てきてくれないかしら。', 'A train runs from Hinomori Station up to Yukimi Village in the northern mountains. Could you go and see how she is?'),
        {
          quiz: {
            q: '森さんがマリアに頼んだことは何か。',
            qEn: 'What did Ms. Mori ask Maria to do?',
            options: ['雪見村へ行って、つるさんの様子を見てくること', 'つるさんに新しい手紙を書くこと', '駅で電車の切符を買ってくること', 'つるさんを日野森に連れてくること'],
            answer: 0,
            why: '様子を見てきてくれないかしら = could you go and check on her (and come back).',
          },
          keys: ['v:tayori'], area: 'reading', retry: true,
        },
        { do: [{ startQuest: 'mq10' }, { objective: 'mq10.mori' }, { chapter: 3 }, { rel: 'mori', points: 1 }, { learn: ['v:tayori', 'v:fuutou'] }] },
      ],
    },
    {
      when: { all: [{ flag: 'chapter3_done' }, { questNotStarted: 'mq14' }] },
      steps: [
        say('mori', '@nameちゃん、おかえり！ つるさんから電話があったのよ。字が読めるようになったって、すごく喜んでたわ。', 'Welcome back, @name! Tsuru called me. She was so happy she can read again.', 'happy'),
        say('mori', '「海の見える町」……。それなら、潮見町かもしれないわね。瀬戸内海の小さな港町よ。主人と、新婚旅行で行ったの。', '“A town where you can see the sea”… Then it might be Shiomi. A little harbour town on the Inland Sea. My husband and I went there on our honeymoon.'),
        say('mori', '日野森駅から、海へ向かう電車が出ているわ。……今度は、わたしも名前を忘れずに待ってるからね。', 'A train to the sea leaves from Hinomori station. …This time I’ll be waiting, without forgetting your name.', 'happy'),
        { do: [{ startQuest: 'mq14' }, { objective: 'mq14.mori' }, { chapter: 4 }, { rel: 'mori', points: 1 }] },
      ],
    },
    {
      when: { all: [{ flag: 'chapter6_done' }, { questNotStarted: 'mq26' }] },
      steps: [
        say('mori', '@nameちゃん、おかえり！ 大阪のお話、ぜんぶ聞いたわよ。……「東」の字ね。', 'Welcome back, @name! I heard all about Osaka. …The character 東, then.', 'happy'),
        say('mori', '東京には、{何|なん}{万|まん}もの{落|お}とし{物|もの}を{預|あず}かる{駅員|えきいん}さんがいるの。{昔|むかし}、{私|わたし}も、{忘|わす}れ{物|もの}を{取|と}りに{行|い}ったことがあってね。', 'In Tokyo there are station attendants who look after tens of thousands of lost things. I once went there myself to pick up something I’d forgotten.'),
        say('mori', '{大|おお}きい{町|まち}は、{疲|つか}れるわ。……でも、きっと、{大事|だいじ}なことが{待|ま}っているから。{気|き}をつけて、いってらっしゃい。', 'Big cities are tiring. …But I’m sure something important is waiting. Take care, and off you go.'),
        { do: [{ startQuest: 'mq26' }, { objective: 'mq26.mori' }, { chapter: 7 }, { rel: 'mori', points: 1 }] },
      ],
    },
    {
      when: { all: [{ flag: 'chapter5_done' }, { questNotStarted: 'mq22' }] },
      steps: [
        say('mori', '@nameちゃん、おかえり！ 京都のお話、ぜんぶ聞いたわよ。……次は、「阪」の字ね。', 'Welcome back, @name! I heard all about Kyoto. …Next, the character 阪.', 'happy'),
        say('mori', '大阪には、今年、会社に入ったばかりの{健太|けんた}くんがいるの。{私|わたし}の{甥|おい}みたいな{子|こ}よ。{忙|いそが}しそうだから、{様子|ようす}を{見|み}てきてあげて。', 'In Osaka there’s Kenta, who just started at a company this year. Like a nephew to me. He seems busy, so go and see how he is.'),
        say('mori', '{大阪|おおさか}は、{働|はたら}く{人|ひと}の{町|まち}。……{体|からだ}に、気をつけてね。', 'Osaka is a city of working people. …Take care of yourself.'),
        { do: [{ startQuest: 'mq22' }, { objective: 'mq22.mori' }, { chapter: 6 }, { rel: 'mori', points: 1 }] },
      ],
    },
    {
      when: { all: [{ flag: 'chapter4_done' }, { questNotStarted: 'mq18' }] },
      steps: [
        say('mori', '@nameちゃん、おかえり！ 潮見の{灯台|とうだい}の話、{聞|き}いたわよ。……手がかり、また{見|み}つかったのね。', 'Welcome back, @name! I heard about the lighthouse in Shiomi. …You found another clue.', 'happy'),
        say('mori', '「{古|ふる}いものと{新|あたら}しいものが、並んで歩く町」……それは、{京都|きょうと}かもしれないわ。{町家|まちや|v:ky_machiya}の{宿|やど}をやっている{友|とも}だちがいるの。', '“A city where old and new walk side by side”… that may be Kyoto. I have a friend who runs a guesthouse in a machiya.'),
        say('mori', '{日野森駅|ひのもりえき}から、{京都|きょうと}へ行けるわよ。……大きな町だから、{迷|まよ}わないようにね。', 'You can reach Kyoto from Hinomori Station. …It’s a big city, so don’t get lost.'),
        { do: [{ startQuest: 'mq18' }, { objective: 'mq18.mori' }, { chapter: 5 }, { rel: 'mori', points: 1 }] },
      ],
    },
    {
      when: { flag: 'chapter1_done' },
      steps: [
        say('mori', '霧島さんと話したの？ あの研究所、昔はにぎやかだったのよ。子どもの頃、よく門の前で遊んだ{ものだ||g:monoda}わ。', 'You talked to Mr. Kirishima? That facility used to be lively. When I was a kid I often played in front of the gate.'),
        { do: [{ learn: ['g:monoda'] }, { rel: 'mori', points: 1, memory: 'lab_past' }] },
      ],
    },
    {
      steps: [say('mori', '困ったときはお互い様よ。いつでも声をかけてね。', 'We all need help sometimes. Call me any time.')],
    },
  ],

  mailbox: [{ steps: [n('「森」と書かれた郵便受けだ。チラシが入っている。', 'A mailbox labelled “Mori”. There are some flyers inside.')] }],
  apartment: [{ steps: [n('ひのもり荘。今日から@nameの家だ。', 'Hinomori-sō. Your home from today.')] }],
  garden: [{ steps: [n('森さんの小さな畑だ。トマトがよく育っている。', 'Ms. Mori’s little vegetable patch. The tomatoes are growing well.')] }],
  pond: [{ steps: [n('小さな池だ。{耳を澄ます|みみをすます|v:mimiwosumasu}と、水の音が聞こえる。', 'A small pond. If you listen carefully, you can hear the water.'), { do: [{ learn: ['v:mimiwosumasu'] }] }] }],
  sakura: [{ steps: [n('大きな桜の木だ。花びらがひらひらと舞っている。', 'A big cherry tree. Petals are fluttering in the air.')] }],
  lamp: [{ steps: [n('古い街灯だ。', 'An old street lamp.')] }],
  ramen: [
    {
      steps: [
        n('ラーメン屋「まんぷく」の張り紙：「本日は{臨時休業|りんじきゅうぎょう}いたします。ご{迷惑|めいわく|v:meiwaku}をおかけして申し訳ございません。」', 'Notice at ramen shop “Manpuku”: “We are closed today. We apologise for the inconvenience.”'),
        { do: [{ learn: ['v:meiwaku'] }] },
      ],
    },
  ],
  signpost: [{ steps: [n('案内板：「↑ みどりの森　→ 日野森言語研究所　↓ 日野森駅」', 'Signpost: “↑ Midori Forest  → Hinomori Language Research Facility  ↓ Hinomori Station”')] }],
  forest_sign: [{ steps: [n('「この先 みどりの森。{足跡|あしあと|v:ashiato}の少ない道に注意。」', '“Midori Forest ahead. Beware of paths with few footprints.”'), { do: [{ learn: ['v:ashiato'] }] }] }],
  library: [
    {
      steps: [n('日野森図書館。木の扉の向こうから、古い本のにおいがする。', 'Hinomori Library. The smell of old books drifts through the wooden door.')],
    },
  ],
  konbini: [{ steps: [n('コンビニ「ひのもり店」。24時間営業だ。', 'Convenience store “Hinomori branch”. Open 24 hours.')] }],
  cafe: [{ steps: [n('喫茶ことのは。いい香りがする。', 'Café Kotonoha. It smells wonderful.')] }],

  konbini_notice: [
    {
      when: { notFlag: 'read_konbini_notice' },
      steps: [
        n('コンビニの入口に張り紙がある。', 'There is a notice at the store entrance.'),
        { reading: 'r_konbini_notice' },
        { do: [{ flag: 'read_konbini_notice' }, { xp: 10 }, { learn: ['v:shinagire', 'v:toriyoseru', 'v:meiwaku'] }] },
      ],
    },
    { steps: [n('「日野森緑茶は品切れです。お取り寄せも承ります。」', '“Hinomori green tea is out of stock. We can order it in.”')] },
  ],

  // ================================================================ konbini
  haruto: [
    {
      when: { questNotStarted: 'mq2' },
      steps: [say('haruto', 'いらっしゃいませ！……あれ、見ない顔ですね。', 'Welcome! …Oh, I haven’t seen you before.')],
    },
    {
      when: { all: [{ questActive: 'mq2' }, { notObj: 'mq2.haruto' }] },
      steps: [
        say('haruto', 'いらっしゃいませ！……あ、もしかして、新しく引っ越してきた@nameさんですか？ 森さんから聞いてます。', 'Welcome! …Oh, are you @name, who just moved here? Ms. Mori told me about you.'),
        say('haruto', '実は、ちょっと困ってて……。さっき{常連|じょうれん|v:jouren}さんに何か頼まれたんですけど、なぜか急に、言われたことが思い出せないんです。', 'Actually, I’m in a bit of trouble… A regular customer asked me for something, but suddenly I can’t remember what he said.'),
        say('haruto', '常連さん、まだそこにいるので……もう一回聞いてもらえませんか？ 僕、なんだか頭がぼんやりして……。', 'He’s still over there… could you ask him again for me? My head feels kind of foggy…'),
        { do: [{ objective: 'mq2.haruto' }, { learn: ['v:jouren'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq2' }, { notObj: 'mq2.customer' }] },
      steps: [say('haruto', '常連さんは、すぐそこにいます。お願いします！', 'The regular is right there. Please!')],
    },
    {
      steps: [
        say('haruto', 'いらっしゃいませ！ 何かお探しですか？', 'Welcome! Looking for something?'),
        { shop: ['onigiri', 'greentea', 'shiori'] },
        say('haruto', 'ありがとうございました！ またお越しください。', 'Thank you! Please come again.'),
      ],
    },
  ],
  customer: [
    {
      when: { notObj: 'mq2.haruto' },
      steps: [say('customer', 'うーん、いつものお茶がないなあ……。', 'Hmm, my usual tea isn’t here…')],
    },
    {
      steps: [
        say('customer', 'ああ、君が手伝ってくれるのかい？ じゃあ、もう一度言うよ。よく聞いてね。', 'Oh, you’re going to help? Then I’ll say it again. Listen carefully.'),
        { listening: 'l_konbini' },
        say('haruto', 'そうだ、{取り寄せ|とりよせ|v:toriyoseru}と{領収書|りょうしゅうしょ|v:ryoushuusho}だ！ 思い出しました。ありがとうございます！', 'That’s right — ordering it in and a receipt! I remember now. Thank you!'),
        say('customer', '急いでいるわけではないからね。来週また来るよ。', 'I’m not in a hurry. I’ll come again next week.'),
        say('haruto', '@nameさん、本当に助かりました。あ、そうだ。喫茶ことのはの楓さんが、@nameさん{宛|あて}の手紙を{預かって|あずかって|v:azukaru}るって言ってましたよ。', '@name, you really saved me. Oh, right — Kaede at Café Kotonoha said she’s keeping a letter addressed to you.'),
        say('haruto', 'お礼に、これ持っていってください。{ささやか|ささやか|v:sasayaka}ですけど。', 'Please take this as thanks. It’s just something small.'),
        { do: [{ objective: 'mq2.customer' }, { rel: 'haruto', points: 3, memory: 'helped_customer' }, { learn: ['v:shinagire', 'v:toriyoseru', 'v:ryoushuusho', 'v:azukaru', 'v:sasayaka'] }] },
      ],
    },
  ],

  // ================================================================ café
  kaede: [
    {
      when: { questNotStarted: 'mq3' },
      steps: [say('kaede', 'いらっしゃいませ。喫茶ことのはへようこそ。ゆっくりしていってね。', 'Welcome to Café Kotonoha. Make yourself at home.')],
    },
    {
      when: { all: [{ questActive: 'mq3' }, { notObj: 'mq3.kaede' }] },
      steps: [
        say('kaede', 'いらっしゃいませ。……あら、あなたが@nameさんね？ 喫茶ことのはの{楓|かえで}です。', 'Welcome… Oh, you must be @name? I’m Kaede, of Café Kotonoha.'),
        say('kaede', '今朝、お店の前にこの手紙が置いてあったの。{宛先|あてさき|v:atesaki}にはあなたの名前。でも、{差出人|さしだしにん|v:sashidashinin}の名前がどこにもないのよ。', 'This letter was left in front of the shop this morning. Your name is on it as the addressee — but there’s no sender name anywhere.'),
        { do: [{ objective: 'mq3.kaede' }, { give: 'mystery_letter' }, { learn: ['v:atesaki', 'v:sashidashinin'] }] },
        { cg: 'cg_letter', say: '白い封筒には、赤いろうで「K」と押してある。', en: 'The white envelope is sealed with red wax stamped “K”.' },
        say('kaede', 'どうぞ、ここで読んでみて。コーヒーでも飲みながらね。', 'Go ahead and read it here, over a cup of coffee.'),
        { reading: 'r_mystery_letter' },
        say('kaede', '「K」……？', '“K”…?'),
        say('kaede', '……まさか、ね。ううん、なんでもないわ。', '…It couldn’t be. No, never mind.'),
        say('kaede', '駅の古い掲示板、ね。気をつけて行ってらっしゃい。', 'The old bulletin board at the station, then. Take care.'),
        { do: [{ objective: 'mq3.read' }, { rel: 'kaede', points: 2, memory: 'letter' }, { learn: ['v:tegakari', 'v:nazo', 'g:karakoso'] }] },
      ],
    },
    {
      when: { all: [{ questDone: 'mq3' }, { name: ['K', 'Ｋ', 'ケイ', 'けい', 'Kei', 'kei', 'KEI'] }, { notFlag: 'secret_name_k' }] },
      steps: [
        say('kaede', 'そういえば、あなたの名前……@name、なのね。', 'Come to think of it, your name… it’s @name, isn’t it.', 'surprised'),
        say('kaede', '手紙の「K」も、まさかあなたが自分で……？ ふふ、なんてね。冗談よ。', 'The “K” on that letter… you didn’t write it to yourself, did you? Heh, just kidding.', 'happy'),
        n('楓さんは笑っているけれど、カップを持つ手が、少しだけふるえていた。', 'Kaede is smiling, but the hand holding her cup trembles slightly.'),
        { do: [{ secret: 'name_k' }] },
      ],
    },
    {
      when: { flag: 'chapter1_done' },
      steps: [
        say('kaede', '研究所の話、霧島さんから聞いたわ。……Kのこと、いつかあなたに話さなきゃいけないわね。', 'I heard about the facility from Mr. Kirishima… Someday I’ll have to tell you about K.'),
        say('kaede', 'でも今日は、コーヒーでも飲んでいって。', 'But today, have a coffee.'),
        { shop: ['cake', 'greentea'] },
      ],
    },
    {
      steps: [
        say('kaede', 'うちのコーヒーはおいしい{うえに||g:ueni}、ケーキも手作りなの。……なんてね、自分で言っちゃった。', 'Our coffee is delicious, and on top of that the cakes are homemade… Ha, listen to me bragging.'),
        { do: [{ learn: ['g:ueni'] }] },
        { shop: ['cake', 'greentea'] },
      ],
    },
  ],
  aoi: [
    {
      when: { questNotStarted: 'sq_aoi' },
      steps: [
        say('aoi', 'あ、すみません……。わたし、アオイです。日野森大学の学生です。', 'Ah, excuse me… I’m Aoi, a student at Hinomori University.'),
        say('aoi', '来週、ゼミで{発表|はっぴょう|v:happyou}があるんですけど、{緊張|きんちょう|v:kinchou}しちゃって……。敬語、ちょっと見てもらえませんか？', 'I have a seminar presentation next week, and I’m so nervous… Could you check my polite Japanese?'),
        {
          choice: [
            {
              text: 'いいよ、見せて。', en: 'Sure, show me.',
              then: [
                { do: [{ startQuest: 'sq_aoi' }, { learn: ['v:happyou', 'v:kinchou', 'v:osoreiru', 'v:shouchi'] }] },
                say('aoi', 'ありがとうございます！ じゃあ、一つ目。先生に「ちょっと待って」と丁寧に言いたいんです。', 'Thank you! First: I want to politely tell my professor “wait a moment”.'),
                {
                  quiz: {
                    q: '先生に「ちょっと待ってください」と、とても丁寧に言うなら？',
                    qEn: 'How do you say “please wait a moment” very politely to a professor?',
                    options: ['恐れ入りますが、少々お待ちください。', 'ちょっと待ってくれる？', '少々待たせていただきます。', 'お待ちしてもいいですか。'],
                    answer: 0,
                    why: '恐れ入りますが（I’m sorry to trouble you）＋少々お待ちください is the standard very polite form. お待ちします means “I will wait”.',
                  },
                  keys: ['v:osoreiru'], area: 'vocab', retry: true,
                },
                say('aoi', 'なるほど！ 二つ目。先生にお願いされて「わかりました」と言うとき。', 'I see! Second: saying “understood” when the professor asks me something.'),
                {
                  quiz: {
                    q: '目上の人に「わかりました」を丁寧に言うと？',
                    qEn: 'How do you politely say “understood” to a superior?',
                    options: ['承知いたしました。', '了解！', 'わかったよ。', '承知してください。'],
                    answer: 0,
                    why: '承知いたしました is humble and polite. 了解 sounds casual to superiors; 承知してください asks the other person to consent.',
                  },
                  keys: ['v:shouchi'], area: 'vocab', retry: true,
                },
                say('aoi', '最後です！ 発表の終わりに「質問があったら、遠慮しないで聞いてね」って言いたいんですけど……。', 'Last one! At the end I want to say “if you have questions, don’t hold back”…'),
                {
                  quiz: {
                    q: '発表の最後に言う、いちばん適切な表現はどれか。',
                    qEn: 'Which is the most appropriate thing to say at the end of a presentation?',
                    options: ['ご質問がございましたら、ご遠慮なくお聞きください。', '質問があったら、遠慮して聞いてね。', 'ご質問をいたしましたら、お聞きください。', '質問、どんどん聞いちゃって！'],
                    answer: 0,
                    why: 'ございましたら (polite “if there are”) + ご遠慮なく (without hesitation). いたす is humble and can’t be used for the audience’s actions.',
                  },
                  keys: ['v:enryo'], area: 'vocab', retry: true,
                },
                say('aoi', '完璧です！ @nameさん、{さすが|さすが|v:sasuga}ですね！ これ、楓さんのケーキ。お礼です！', 'Perfect! As expected of you, @name! Here’s one of Kaede’s cakes as thanks!'),
                { do: [{ objective: 'sq_aoi.help' }, { rel: 'aoi', points: 3, memory: 'presentation' }, { learn: ['v:sasuga'] }] },
              ],
            },
            { text: 'ごめん、今はちょっと……。', en: 'Sorry, not right now…', then: [say('aoi', 'そうですよね……。また今度お願いします！', 'Of course… Maybe next time!')] },
          ],
        },
      ],
    },
    {
      when: { flag: 'chapter1_done' },
      steps: [
        say('aoi', '発表、うまくいきました！ ……そういえば、大学の図書館でも、本の文字が消えるっていう{噂|うわさ}があるんです。', 'The presentation went well! …By the way, there’s a rumour that text is disappearing from books in the university library too.'),
        say('aoi', '言葉が消える現象は、日野森{ばかりでなく||g:bakaridenaku}、大学のほうでも起きているのかも……。', 'Maybe the vanishing-words phenomenon is happening not only in Hinomori but at the university, too…'),
        { do: [{ learn: ['g:bakaridenaku'] }, { rel: 'aoi', points: 1, memory: 'university_rumour' }] },
      ],
    },
    {
      steps: [say('aoi', '人前で話すと、どうしても緊張しちゃうんですよね。でも、がんばります！', 'I always get nervous speaking in front of people. But I’ll do my best!')],
    },
  ],
  cafe_shelf: [{ steps: [n('コーヒー豆の{瓶|びん}が並んでいる。どれも{懐かしい|なつかしい|v:natsukashii}香りがする。', 'Jars of coffee beans. They all have a nostalgic aroma.'), { do: [{ learn: ['v:natsukashii'] }] }] }],
  cafe_counter: [{ steps: [n('カウンターの{奥|おく}に、コーヒー{豆|まめ}とケーキが{並んで|ならんで}いる。', 'Behind the counter: coffee beans and cakes on display.')] }],
  cafe_clock: [{ steps: [n('古い{柱時計|はしらどけい}だ。{正確|せいかく}な時間を{刻み続けて|きざみつづけて}いる。', 'An old grandfather clock, still keeping exact time.')] }],
  cafe_sofa: [{ steps: [n('ふかふかのソファだ。ここで本を読んでいる{常連|じょうれん}さんが多いらしい。', 'A soft sofa. Many regulars apparently read here.')] }],
  cafe_books: [{ steps: [n('お{客|きゃく}さんが{自由に|じゆうに}読める本棚だ。日本の{昔話|むかしばなし}の本もある。', 'A bookshelf guests can use freely, with some Japanese folk tales too.')] }],
  cafe_menu: [{ steps: [n('「本日のおすすめ：{季節|きせつ}のケーキセット　{税込|ぜいこみ}八百円」', '“Today’s recommendation: seasonal cake set, ¥800 incl. tax.”')] }],
  cafe_table: [{ steps: [n('窓際の席だ。日当たりがいい。', 'A seat by the window. Nice and sunny.')] }],
  cafe_window: [{ steps: [n('窓の外を、自転車がゆっくり通り過ぎていく。', 'A bicycle slowly passes by outside.')] }],

  // ================================================================ library
  sato: [
    {
      when: { questNotStarted: 'mq2' },
      steps: [say('sato', 'おや、新しい顔だね。ゆっくり本を見ていきなさい。', 'Oh, a new face. Take your time looking at the books.')],
    },
    {
      when: { questNotStarted: 'sq_sato' },
      steps: [
        say('sato', 'こんにちは。私は佐藤。昔、この町の中学校で国語を教えていたんだよ。', 'Hello. I’m Satō. I used to teach Japanese at the middle school here.'),
        say('sato', '君は日本語を勉強しているのかね？ では、ひとつ{宿題|しゅくだい}を出そう。「わけ」の使い分けは、なかなか難しいものだ。', 'You’re studying Japanese? Then let me give you some homework. Using the different “wake” patterns is quite tricky.'),
        { do: [{ startQuest: 'sq_sato' }, { learn: ['g:wakedewanai', 'g:wakeganai', 'g:wakeniwaikanai'] }] },
        grammarQuiz('wakedewanai', 0),
        grammarQuiz('wakeganai', 0),
        grammarQuiz('wakeniwaikanai', 0),
        say('sato', 'ほう、なかなかやるね。三つとも形は似ているが、意味はまったく違う。', 'Well done. All three look alike, but their meanings are completely different.'),
        { do: [{ objective: 'sq_sato.quiz' }] },
        say('sato', 'では、私が町の新聞に書いたコラムも読んでみなさい。', 'Now, read this column I wrote for the town paper.'),
        { reading: 'r_library_essay' },
        say('sato', '言葉は消えても、思いまで忘れてはいけない。……最近の{現象|げんしょう|v:genshou}を見ていると、そう思うんだよ。', 'Words may disappear, but we mustn’t forget the feelings behind them… That’s what I think, seeing what’s happening lately.'),
        { do: [{ objective: 'sq_sato.essay' }, { rel: 'sato', points: 3, memory: 'homework' }, { learn: ['v:genshou', 'g:monoda'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'sq_sato' }, { notObj: 'sq_sato.essay' }] },
      steps: [
        say('sato', 'コラムはもう読んだかね？', 'Have you read my column yet?'),
        { reading: 'r_library_essay' },
        { do: [{ objective: 'sq_sato.essay' }, { rel: 'sato', points: 2 }] },
      ],
    },
    {
      steps: [
        say('sato', 'わからない言葉があったら、いつでも来なさい。復習は、少しずつ毎日続けるものだよ。', 'Come any time you have words you don’t understand. Review is something you do a little every day.'),
        {
          choice: [
            { text: '一緒に復習する', en: 'Review together', then: [{ do: [{ open: 'review' }] }] },
            { text: 'ありがとうございます', en: 'Thank you' },
          ],
        },
      ],
    },
  ],

  // ================================================================ shrine
  shrine: [
    {
      when: { all: [{ date: ['07-07'] }, { notYearFlag: 'tanabata' }] },
      steps: [
        { cg: 'cg_egg_tanabata', say: '今日は{七夕|たなばた}。境内の{笹|ささ}に、色とりどりの{短冊|たんざく}が下がっている。', en: 'Today is Tanabata. Colourful paper strips hang from the bamboo in the shrine grounds.' },
        { cg: 'cg_egg_tanabata', say: '織姫と{彦星|ひこぼし}が、年に一度だけ会える夜。短冊に願いを書くと、かなうと言われている。', en: 'The one night a year when Orihime and Hikoboshi may meet. A wish written on a strip is said to come true.' },
        {
          choice: [
            { text: '「N2に合格できますように」', en: '“May I pass the N2”', then: [n('きっと、毎日の{積み重ね|つみかさね}が届くはず。', 'Surely all those days of practice will reach the stars.')] },
            { text: '「森さんが、大切な名前を忘れませんように」', en: '“May Ms. Mori never forget the names she loves”', then: [n('笹が風にゆれて、短冊がそっと光った……気がした。', 'The bamboo sways in the wind, and the strip seems to glow softly.')] },
            { text: '「Kさんに会えますように」', en: '“May I meet K”', then: [n('天の川のどこかで、だれかが帳面を閉じる音がした……ような気がした。', 'Somewhere along the Milky Way, you seem to hear someone close a notebook.')] },
          ],
        },
        { do: [{ yearFlag: 'tanabata' }, { secret: 'tanabata' }, { xp: 50 }] },
      ],
    },
    {
      when: { questNotStarted: 'sq_shrine' },
      steps: [
        n('日野森神社。静かな境内に、おみくじの箱がある。', 'Hinomori Shrine. There is a box of fortune slips in the quiet grounds.'),
        {
          choice: [
            {
              text: 'おみくじを引く（¥100）', en: 'Draw a fortune (¥100)',
              then: [
                { do: [{ money: -100 }, { startQuest: 'sq_shrine' }, { learn: ['v:sanpai', 'k:hai', 'k:oku', 'k:koku'] }] },
                n('おみくじには、難しい漢字がたくさん書いてある……。', 'The fortune is full of difficult kanji…'),
                { quiz: { q: '【参拝】の読み方は？', qEn: 'How is 参拝 read?', options: ['さんぱい', 'さんはい', 'さいはい', 'さんばい'], answer: 0, why: '参拝（さんぱい）: 拝 is read はい but becomes ぱい after ん.' }, keys: ['k:hai', 'v:sanpai'], area: 'kanji', retry: true },
                { quiz: { q: '【記憶】の読み方は？', qEn: 'How is 記憶 read?', options: ['きおく', 'きおう', 'きよく', 'ぎおく'], answer: 0, why: '記憶（きおく）: 憶 = おく.' }, keys: ['k:oku', 'v:kioku'], area: 'kanji', retry: true },
                { quiz: { q: '【刻む】の読み方は？', qEn: 'How is 刻む read?', options: ['きざむ', 'こくむ', 'きさむ', 'かこむ'], answer: 0, why: '刻む（きざむ）: the kun reading. コク is the on reading (時刻 じこく).' }, keys: ['k:koku', 'v:kizamu'], area: 'kanji', retry: true },
                n('大吉！「忘れた言葉も、呼べば必ず{蘇|よみがえ|v:yomigaeru}る。」', 'Great blessing! “Even forgotten words will surely return if you call them.”'),
                { do: [{ objective: 'sq_shrine.omikuji' }, { learn: ['v:yomigaeru'] }] },
              ],
            },
            { text: '参拝だけする', en: 'Just pray', then: [n('静かに手を合わせた。心が落ち着く。', 'You quietly put your hands together. You feel calm.')] },
          ],
        },
      ],
    },
    {
      when: { all: [{ flag: 'chapter1_done' }, { notFlag: 'sakurako_met' }] },
      steps: [
        n('境内の桜の下で、ピンク色の言霊がこちらを見ている……！', 'Under the cherry tree, a pink Kotodama is watching you…!'),
        { do: [{ flag: 'sakurako_met' }, { seen: 'sakurako' }] },
        { battle: { species: 'sakurako', level: 6, recruitable: true, bg: 'bg_shrine_night.webp' } },
      ],
    },
    { steps: [n('日野森神社。静かで、心が落ち着く。', 'Hinomori Shrine. Quiet and calming.')] },
  ],

  // ================================================================ station
  station_staff: [
    {
      when: { all: [{ questActive: 'mq4' }, { notObj: 'mq4.staff' }] },
      steps: [
        say('station_staff', 'あっ、すみません！ 今、{電光掲示板|でんこうけいじばん}が{故障|こしょう}していて……。', 'Ah, excuse me! The electronic display is broken right now…'),
        say('station_staff', 'アナウンスを流しますので、もしお時間があれば、内容を確認していただけませんか。実は僕、自分で言ったことを、すぐ忘れてしまうんです……。', 'I’ll play the announcement — if you have time, could you confirm what it says? Actually, I keep forgetting what I myself just said…'),
        { listening: 'l_station' },
        say('station_staff', 'ありがとうございます！ みどり線の上りが{遅延|ちえん|v:chien}、十時半ごろ{再開|さいかい|v:saikai}……と。助かりました。', 'Thank you! Midori Line inbound delayed, resuming around 10:30… That’s a big help.'),
        say('station_staff', 'それにしても、最近おかしいんですよ。あの古い掲示板の前を通ると、時々、声が聞こえる気がして……。', 'Still, things have been strange lately. When I pass that old bulletin board, I sometimes feel like I hear a voice…'),
        { do: [{ objective: 'mq4.staff' }, { rel: 'station_staff', points: 2 }, { learn: ['v:chien', 'v:saikai', 'v:eikyou', 'v:meiwaku'] }] },
      ],
    },
    {
      steps: [
        say('station_staff', '{改札|かいさつ|v:kaisatsu}はこちらです。……ただ、みどり線は今日も{運転見合わせ|うんてんみあわせ|v:miawase}なんです。すみません。', 'The ticket gates are this way… but the Midori Line is suspended again today. Sorry.'),
        { do: [{ learn: ['v:kaisatsu', 'v:miawase'] }] },
      ],
    },
  ],
  station_banner: [{ steps: [n('のぼりに「夢を追え」と書いてある。', 'The banner says “Chase your dreams”.')] }],
  timetable: [{ steps: [n('時刻表だ。「みどり線　上り・下り」……文字が一部、かすれて読めない。', 'A timetable. “Midori Line — inbound / outbound”… part of the text has faded.')] }],

  old_board: [
    {
      when: { all: [{ questActive: 'mq4' }, { obj: 'mq4.staff' }, { notObj: 'mq4.board' }] },
      steps: [
        n('古い{掲示板|けいじばん|v:keijiban}だ。紙はほとんど色あせて、文字が読めない。', 'An old bulletin board. The paper has faded almost completely; you can’t read it.'),
        n('……{耳を澄ます|みみをすます|v:mimiwosumasu}と、どこからか小さな声が聞こえる。', '…If you listen carefully, you can hear a small voice from somewhere.'),
        { listening: 'l_kotodama_call' },
        { cg: 'cg_board', say: '掲示板の文字がふわりと光り、小さな青いきつねが現れた！', en: 'The writing on the board glows softly, and a small blue fox appears!' },
        { do: [{ seen: 'yukitsune' }] },
        say('yukitsune', '……ここ、どこ？ だれも、わたしのこと覚えてないの……？', '…Where am I? Doesn’t anyone remember me…?'),
        talkQuiz('yukitsune', 0),
        say('yukitsune', '……ほんと？ じゃあ……いっしょに行く。わたし、ユキツネ。', '…Really? Then… I’ll come with you. I’m Yukitsune.'),
        { do: [{ recruit: 'yukitsune', level: 5 }, { objective: 'mq4.board' }, { flag: 'has_starter' }, { learn: ['v:kotodama', 'v:kioku'] }] },
        n('（メニューの「コトダマ」で仲間を確認できる。研究所の人が何か知っているかもしれない。橋を渡って東へ行ってみよう。）', '(Check your team under “Kotodama” in the menu. Someone at the research facility might know something — cross the bridge to the east.)'),
      ],
    },
    {
      when: { questActive: 'mq3' },
      steps: [n('古い掲示板だ。何か貼ってあるが、ほとんど読めない。', 'An old bulletin board. Something is posted, but it’s almost unreadable.')],
    },
    {
      when: { notObj: 'mq4.staff' },
      steps: [n('古い掲示板だ。近くの駅員さんが、何か困っているようだ。', 'An old bulletin board. The station attendant nearby seems troubled.')],
    },
    { steps: [n('古い掲示板。今はもう、声は聞こえない。', 'The old bulletin board. You can’t hear the voice any more.')] },
  ],

  // ================================================================ research facility
  lab_sign: [
    {
      steps: [
        n('「日野森言語研究所　関係者以外{立入禁止|たちいりきんし|v:tachiirikinshi}」', '“Hinomori Language Research Facility — Authorised personnel only.”'),
        { do: [{ learn: ['v:tachiirikinshi', 'v:kenkyuujo'] }] },
      ],
    },
  ],
  lab_door: [{ steps: [n('ドアには鍵がかかっている。中は暗くて、何も見えない。', 'The door is locked. It’s dark inside.')] }],
  ramen_counter: [{ steps: [n('カウンターの向こうで、大きな{鍋|なべ}から湯気が上がっている。いいにおいだ。', 'Behind the counter, steam rises from big pots. It smells great.')] }],
  ramen_table: [{ steps: [n('テーブルの上に、はしと{調味料|ちょうみりょう}が{並んで|ならんで}いる。', 'Chopsticks and condiments are lined up on the table.')] }],
  ramen_noren: [{ steps: [n('{奥|おく}の部屋に続く{暖簾|のれん}だ。「{関係者以外立入禁止|かんけいしゃいがいたちいりきんし}」と書いてある。', 'A noren curtain to the back room: “Staff only”.')] }],
  ramen_shelf: [{ steps: [n('{替え玉|かえだま}用の{麺|めん}と、{丼|どんぶり}が{積んで|つんで}ある。', 'Extra noodle portions and stacked bowls.')] }],
  ramen_ticket: [{ steps: [n('{食券機|しょっけんき}だ。先に{食券|しょっけん}を買ってから{注文|ちゅうもん}する{仕組み|しくみ}になっている。', 'A meal-ticket machine: you buy a ticket first, then order.'), { do: [{ note: 'shokkenki' }] }] }],
  ramen_menu: [{ steps: [n('メニュー：「しょうゆラーメン　{味噌|みそ}ラーメン　{替え玉|かえだま}{無料|むりょう}」', 'Menu: “Shoyu ramen, miso ramen, free noodle refills”.')] }],
  ramen_poster: [{ steps: [n('{壁|かべ}に「{創業|そうぎょう}五十年」と書かれた{色紙|しきし}が{飾って|かざって}ある。', 'A signed board on the wall: “Founded fifty years ago”.')] }],
  ramen_maneki: [{ steps: [n('{招き猫|まねきねこ}だ。お客さんを{招いて|まねいて}くれるらしい。', 'A beckoning cat. It is said to invite customers in.')] }],
  lab_computer: [{ steps: [n('モニターに、言葉の形をした光の図が映っている。「言霊の発生パターン」と書いてある。', 'The monitor shows a diagram of light shaped like words: “Kotodama emergence patterns”.')] }],
  lab_whiteboard: [{ steps: [n('ホワイトボードには漢字と矢印がびっしり書かれている。真ん中の図は、森の石碑の模様に似ている。', 'The whiteboard is covered in kanji and arrows. The diagram in the middle looks like the pattern on the forest stone.')] }],
  lab_papers: [{ steps: [n('{資料|しりょう}の山だ。「忘れられた言葉は、どこへ行くのか」というメモが見える。', 'A pile of papers. One note reads: “Where do forgotten words go?”')] }],
  lab_books: [{ steps: [n('言語学と民俗学の本がぎっしり{並んで|ならんで}いる。', 'Shelves packed with books on linguistics and folklore.')] }],
  lab_jars: [{ steps: [n('ガラス{瓶|びん}の中で、小さな光がゆらゆらと{漂って|ただよって}いる。言葉のかけらだろうか。', 'Tiny lights drift inside the glass jars. Fragments of words, perhaps?')] }],
  lab_coat: [{ steps: [n('白衣がかけてある。ポケットからメモがはみ出している。', 'A lab coat on a hook. A note sticks out of the pocket.')] }],
  lab_globe: [{ steps: [n('古い{天球儀|てんきゅうぎ}だ。星座の名前が漢字で書いてある。', 'An old armillary sphere. The constellations are labelled in kanji.')] }],
  lab_boxes: [{ steps: [n('{段ボール|だんボール}{箱|ばこ}だ。「{取扱注意|とりあつかいちゅうい}」と書いてある。', 'Cardboard boxes marked “Handle with care”.')] }],
  lab_table: [{ steps: [n('作業台の上で、石のかけらがほんのり光っている。{顕微鏡|けんびきょう}もある。', 'On the worktable a stone fragment glows faintly. There is a microscope too.')] }],
  lab_sofa: [{ steps: [n('{毛布|もうふ}がかかったソファだ。博士はよくここで{寝て|ねて}いるらしい。', 'A sofa with a blanket. The doctor apparently often sleeps here.')] }],
  lab_cart: [{ steps: [n('{実験|じっけん}用のワゴンだ。フラスコの中で青い光がぱちぱちしている。', 'A lab cart. Blue light crackles in a flask.')] }],
  kirishima: [
    {
      when: { all: [{ questActive: 'mq5' }, { notObj: 'mq5.kirishima' }] },
      steps: [
        say('kirishima', '……君、その子は……！ まさか、{言霊|ことだま|v:kotodama}が{実体化|じったいか}しているのか？', '…You — that creature…! Could it be a Kotodama that has taken physical form?'),
        say('kirishima', '失礼。私は霧島。この{研究所|けんきゅうじょ|v:kenkyuujo}で、言葉と{記憶|きおく|v:kioku}の研究をしている……いや、「していた」と言うべきかな。', 'Excuse me. I’m Kirishima. I research language and memory at this facility… or rather, I used to.'),
        say('kirishima', '町で起きている{現象|げんしょう|v:genshou}について、私も一人で{調査|ちょうさ|v:chousa}を続けている。', 'I’ve been investigating the phenomenon in town on my own.'),
        say('kirishima', '反応が一番強いのは、北のみどりの森だ。森の奥の{祠|ほこら}に、原因がある{に違いない||g:nichigainai}。', 'The readings are strongest in Midori Forest to the north. The cause must be at the shrine deep in the forest.'),
        { teach: 'g:nichigainai' },
        {
          quiz: {
            q: '霧島博士は、森の祠についてどう考えているか。',
            qEn: 'What does Dr. Kirishima think about the forest shrine?',
            options: ['原因が祠にあると強く思っている', '祠には原因がないと思っている', '祠に原因があるかどうか、まったくわからない', '祠に行くわけにはいかないと思っている'],
            answer: 0,
            why: 'に違いない expresses strong conviction: he is (almost) certain the cause is there.',
          },
          keys: ['g:nichigainai'], area: 'grammar', retry: true,
        },
        say('kirishima', 'このまま放っておけば、町中の言葉が消えてしまい{かねない||g:kanenai}。……頼めるかな？', 'If we leave it, the whole town’s words could disappear… Can I ask you to go?'),
        { teach: 'g:kanenai' },
        say('kirishima', '森には野生の言霊もいる。君の日本語の力が、その子の力になるはずだ。北の道のバリケードは外しておこう。', 'There are wild Kotodama in the forest. Your Japanese will become that creature’s strength. I’ll remove the barricade on the northern path.'),
        { do: [{ objective: 'mq5.kirishima' }, { flag: 'forest_open' }, { rel: 'kirishima', points: 2 }, { learn: ['v:kenkyuujo', 'v:genshou', 'v:chousa', 'g:nichigainai', 'g:kanenai'] }] },
        say('kirishima', 'それから……研究所で保護している言霊が三匹いる。一匹で森へ行くのは{頼もしい|たのもしい|v:tanomoshii}とは言えない。どの子か、一緒に連れていってくれないか。', 'Also… I am looking after three Kotodama here. Going into the forest with just one isn’t exactly reassuring. Would you take one of them with you?'),
        {
          choice: [
            {
              text: 'ホムラ（炎）', en: 'Homura — Fire fox. Strong against Nature. Evolves at Lv.7 and Lv.14.',
              then: [{ do: [{ recruit: 'homura', level: 5 }, { flag: 'partner_chosen' }] }, say('kirishima', 'ホムラか。気が強いが、仲間思いの子だ。よろしく頼むよ。', 'Homura. Hot-headed, but loyal to its friends. Take good care of it.')],
            },
            {
              text: 'コトリ（風）', en: 'Kotori — Wind bird. Listening moves. Evolves at Lv.7 and Lv.14.',
              then: [{ do: [{ recruit: 'kotori', level: 5 }, { flag: 'partner_chosen' }] }, say('kirishima', 'コトリか。おしゃべりだが、耳がとてもいい。聴解の力になるはずだ。', 'Kotori. Chatty, but with excellent ears. It will help your listening.')],
            },
            {
              text: 'メブキ（自然）', en: 'Mebuki — Nature sprout. Grammar moves. Evolves at Lv.7 and Lv.14.',
              then: [{ do: [{ recruit: 'mebuki', level: 5 }, { flag: 'partner_chosen' }] }, say('kirishima', 'メブキか。ゆっくりだが、根はしっかりしている。文法の力を伸ばしてくれるだろう。', 'Mebuki. Slow, but firmly rooted. It will strengthen your grammar.')],
            },
          ],
        },
        { do: [{ learn: ['v:tanomoshii'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq5' }, { notObj: 'mq5.stone' }] },
      steps: [say('kirishima', '森の奥の祠だ。道は北の大通りからつながっている。野生の言霊には気をつけて。', 'The shrine is deep in the forest, reached via the northern road. Watch out for wild Kotodama.')],
    },
    {
      when: { all: [{ questActive: 'mq5' }, { obj: 'mq5.stone' }, { notObj: 'mq5.befriend' }] },
      steps: [say('kirishima', 'その欠片……！ だが、森の言霊たちのことも知っておきたい。一度、野生の言霊と向き合ってきてくれないか。', 'That fragment…! But I’d also like to know about the forest’s Kotodama. Could you face a wild one first?')],
    },
    {
      when: { all: [{ questActive: 'mq5' }, { obj: 'mq5.stone' }] },
      steps: [
        say('kirishima', 'これは……{言葉の欠片|ことばのかけら|v:kakera}だ！ やはり、あの計画の……。', 'This is… a word fragment! So it really is from that project…'),
        say('kirishima', '昔、この研究所では「言霊アーカイブ計画」という研究が行われていた。人の言葉と記憶を、永遠に保存するための計画だ。', 'Long ago this facility ran the “Kotodama Archive Project” — a plan to preserve human words and memories forever.'),
        say('kirishima', 'だが、ある事故{をきっかけに||g:wokikkakeni}計画は中止になり、研究所は閉鎖された。', 'But an accident led to the project being cancelled, and the facility was closed.'),
        {
          quiz: {
            q: '霧島博士の話によると、計画が中止になったのはなぜか。',
            qEn: 'According to Dr. Kirishima, why was the project cancelled?',
            options: ['ある事故がきっかけだったから', '記憶の保存に成功したから', '町の人が反対したから', '研究者がいなくなったから'],
            answer: 0,
            why: '事故をきっかけに = the accident was the trigger for the cancellation.',
          },
          keys: ['g:wokikkakeni'], area: 'reading', retry: true,
        },
        say('kirishima', '計画の中心にいた研究者のイニシャルは……「K」だ。', 'The initial of the lead researcher of the project was… “K”.'),
        say('kirishima', '君に届いた手紙。もしかすると、計画はまだ終わっていないのかもしれない。', 'The letter you received… perhaps the project isn’t over yet.'),
        { do: [{ take: 'kakera' }, { objective: 'mq5.report' }, { rel: 'kirishima', points: 3, memory: 'archive_project' }, { learn: ['g:wokikkakeni', 'v:kakera'] }] },
        { cg: 'cg_ending', say: '夕暮れの研究所。欠片の光は、まだ消えていなかった。\n― 第一章「日野森の春」完 ―', en: 'Dusk at the research facility. The fragment’s light had not gone out yet.\n— End of Chapter 1: “Spring in Hinomori” —' },
        { cg: 'cg_valley_arrival', say: '次章予告 ― 第二章「桃と湯けむりの谷」', en: 'Next time — Chapter 2: “The Valley of Peaches and Steam”' },
        n('Chapter 1 complete! Talk to Ms. Mori in front of the apartment to begin Chapter 2. Hinomori stays open: keep befriending Kotodama in Midori Forest and use your desk to review.'),
      ],
    },
    {
      when: { all: [{ questActive: 'mq6' }, { notObj: 'mq6.kirishima' }] },
      steps: [
        say('kirishima', '森さんが、君の名前を……？ そうか。ついに、人の名前まで消え始めたか。', 'Ms. Mori forgot your name…? I see. So now even people’s names are starting to fade.', 'worried'),
        say('kirishima', '実は、あの欠片が毎晩、同じ方角を指して光るんだ。南の山の向こう……日野森の谷だ。', 'Actually, the fragment glows every night, pointing in the same direction: beyond the southern hills… Hinomori Valley.'),
        say('kirishima', '谷には、太田という書道家がいる。昔、Kと一緒に仕事をしていたと聞いたことがある。', 'There is a calligrapher in the valley named Ōta. I heard he once worked with K.'),
        say('kirishima', '森さんの記憶が消えない{うちに||g:uchini}、できることをしよう。駅前から谷へのバスが出ている。', 'Let’s do what we can while Ms. Mori still remembers. A bus to the valley leaves from the station.'),
        { teach: 'g:uchini' },
        {
          quiz: {
            q: '「森さんの記憶が消えないうちに」の意味に一番近いものはどれか。',
            qEn: 'Which is closest in meaning to 森さんの記憶が消えないうちに?',
            options: ['森さんの記憶がまだ残っている間に', '森さんの記憶が消えてから', '森さんの記憶が消えたとしても', '森さんの記憶が消えるたびに'],
            answer: 0,
            why: 'ないうちに = before something (unwanted) happens, while the current state still lasts.',
          },
          keys: ['g:uchini'], area: 'grammar', retry: true,
        },
        { do: [{ objective: 'mq6.kirishima' }, { rel: 'kirishima', points: 1 }, { learn: ['g:uchini'] }] },
      ],
    },
    {
      steps: [say('kirishima', 'Kのことは、引き続き調べてみる。君も、言葉を大切にな。', 'I’ll keep looking into K. Take care of your words.')],
    },
  ],

  // ================================================================ forest
  forest_sign2: [{ steps: [n('「↑ 祠　↓ 日野森町」', '“↑ Shrine  ↓ Hinomori Town”')] }],
  forest_stone: [
    {
      when: { all: [{ questActive: 'mq5' }, { notObj: 'mq5.stone' }] },
      steps: [
        n('古い祠だ。石碑に何か{刻|きざ|v:kizamu}まれている……。', 'An old shrine. Something is carved into the stone…'),
        { reading: 'r_forest_stone' },
        { cg: 'cg_shrine', say: '石碑が光った！ 祠の影から、黒い猫のような言霊が飛び出してきた！', en: 'The stone glows! A black, cat-like Kotodama leaps out of the shrine’s shadow!' },
        {
          battle: { species: 'kurone', level: 6, boss: true, bg: 'bg_shrine_night.webp' },
          win: [
            n('クロネは研究所の方角へ走り去った……。祠の前に、光る欠片が落ちている。', 'Kurone ran off towards the research facility… A glowing fragment lies in front of the shrine.'),
            { do: [{ give: 'kakera' }, { objective: 'mq5.stone' }, { objective: 'mq5.befriend' }, { seen: 'kurone' }] },
            n('霧島博士に報告しよう。', 'Report to Dr. Kirishima.'),
          ],
          lose: [n('クロネの力に押し返された……。少し休んで、また来よう。', 'You were pushed back by Kurone’s power… Rest a little and come back.')],
        },
      ],
    },
    { steps: [n('古い祠。石碑には「言葉を呼ぶ者よ、恐れることなかれ」と刻まれている。', 'The old shrine. The stone reads “You who call the words — do not be afraid.”')] },
  ],

  // ================================================================ interiors
  station_building: [
    {
      when: { all: [{ questActive: 'mq10' }, { notObj: 'mq10.arrive' }] },
      steps: [
        n('日野森駅。北の山へ向かう、一両だけの小さな電車が待っている。', 'Hinomori Station. A small one-car train bound for the northern mountains is waiting.'),
        say('station_staff', '雪見村行きですね。山の上は雪が深いので、暖かくしていってくださいね。', 'To Yukimi Village? The snow is deep up there, so keep warm.'),
        { cg: 'cg_mountain_arrival', say: '電車を降りると、空気が{凍|こお}るように冷たかった。夕焼けの中、雪に埋もれた村に、ぽつぽつと明かりがともる。', en: 'Stepping off the train, the air is freezing. In the sunset glow, lights flicker on one by one in the village buried in snow.' },
        { cg: 'cg_mountain_arrival', say: 'ここが雪見村……。字が消えていく村。', en: 'So this is Yukimi Village… the village where characters are fading.' },
        { do: [{ objective: 'mq10.arrive' }, { flag: 'yukimi_visited' }, { train: 'local' }, { warp: { map: 'mountain', x: 9, y: 19 } }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq14' }, { notObj: 'mq14.arrive' }] },
      steps: [
        n('日野森駅。南の海へ向かう電車が、ホームで待っている。', 'Hinomori Station. A train bound for the southern sea is waiting at the platform.'),
        say('station_staff', '潮見行きですね。海はいいですよ。いか焼き、食べてきてください！', 'To Shiomi? The sea is lovely. Do try the grilled squid!', 'happy'),
        { cg: 'cg_harbor_arrival', say: '山のトンネルを抜けると、窓いっぱいに青い海が広がった。小さな駅に降りると、潮のにおいがした。', en: 'Out of the mountain tunnel, the blue sea fills the whole window. Stepping off at the little station, you smell the salt air.' },
        { cg: 'cg_harbor_arrival', say: '石段の下に、瓦屋根と港と、白い灯台が見える。……ここに、Kがいる。', en: 'Below the stone steps you can see tiled roofs, the harbour and a white lighthouse. …K is here.' },
        { do: [{ objective: 'mq14.arrive' }, { flag: 'shiomi_visited' }, { learn: ['v:gyokou'] }, { train: 'local' }, { warp: { map: 'harbor', x: 10, y: 2 } }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq18' }, { obj: 'mq18.mori' }, { notObj: 'mq18.arrive' }] },
      steps: [
        n('日野森駅。大きな町へ向かう電車が、ホームで待っている。乗り換えをして、京都までは二時間ほどだ。', 'Hinomori Station. A train bound for the big city waits at the platform. With a change, Kyoto is about two hours away.'),
        say('station_staff', '京都行きですね。向こうは、人でいっぱいですよ。おみやげの八つ橋、よろしくお願いします！', 'To Kyoto? It will be packed with people. And please bring back some yatsuhashi!', 'happy'),
        { cg: 'cg_kyoto_arrival', say: '新幹線から降りると、天井の高い大きな駅に、たくさんの人が行き交っていた。いろいろな言葉の案内が、あちこちから聞こえる。', en: 'Stepping off the Shinkansen, a huge station with a high ceiling, crowds streaming past. Announcements in many languages come from all directions.' },
        { do: [{ objective: 'mq18.arrive' }, { flag: 'kyoto_visited' }, { learn: ['v:ky_annai'] }, { train: 'shinkansen' }, { warp: { map: 'k_station', x: 20, y: 9 } }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq26' }, { obj: 'mq26.mori' }, { notObj: 'mq26.arrive' }] },
      steps: [
        n('日野森駅。東京へ向かう新幹線が、ホームで待っている。', 'Hinomori Station. A Shinkansen bound for Tokyo waits at the platform.'),
        { cg: 'cg_tokyo_arrival', say: '新幹線を降りると、長いホームを、{暗|くら}い{色|いろ}のコートの{人|ひと}たちが、{川|かわ}のように{流|なが}れていた。だれも、{顔|かお}を{上|あ}げない。{赤|あか}れんがの{駅|えき}が、{朝|あさ}の{光|ひかり}の{中|なか}で、{静|しず}かに{待|ま}っている。', en: 'Stepping off the Shinkansen, people in dark coats flow like a river along the long platform. Nobody looks up. The red-brick station waits quietly in the morning light.' },
        { do: [{ objective: 'mq26.arrive' }, { flag: 'tokyo_visited' }, { learn: ['v:tk_manin'] }, { train: 'shinkansen' }, { warp: { map: 't_station', x: 20, y: 9 } }] },
      ],
    },
    {
      when: { flag: 'tokyo_visited' },
      steps: [
        n('日野森駅。東京、大阪、京都、潮見町、雪見村へ、電車が出ている。', 'Hinomori Station. Trains run to Tokyo, Osaka, Kyoto, Shiomi and Yukimi Village.'),
        { do: [{ open: 'board:hinomori' }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq22' }, { obj: 'mq22.mori' }, { notObj: 'mq22.arrive' }] },
      steps: [
        n('日野森駅。大阪へ向かう電車が、ホームで待っている。', 'Hinomori Station. A train bound for Osaka waits at the platform.'),
        { cg: 'cg_osaka_arrival', say: '駅を出ると、スーツの人たちが、川のように流れていた。ガラスの高いビルと、大きな看板。昼なのに、街が光っている。', en: 'Outside the station, people in suits flow like a river. Tall glass towers and huge signs. Even at noon the city glows.' },
        { do: [{ objective: 'mq22.arrive' }, { flag: 'osaka_visited' }, { learn: ['v:os_shinnyuu'] }, { train: 'shinkansen' }, { warp: { map: 'o_umeda', x: 20, y: 25 } }] },
      ],
    },
    {
      when: { flag: 'osaka_visited' },
      steps: [
        n('日野森駅。京都、大阪、潮見町、雪見村へ、電車が出ている。', 'Hinomori Station. Trains run to Kyoto, Osaka, Shiomi and Yukimi Village.'),
        { do: [{ open: 'board:hinomori' }] },
      ],
    },
    {
      when: { flag: 'kyoto_visited' },
      steps: [
        n('日野森駅。京都、潮見町、雪見村へ、電車が出ている。谷へのバスは、駅前のバス停からだ。', 'Hinomori Station. Trains run to Kyoto, Shiomi and Yukimi Village. Buses to the valley leave from the bus stop in front.'),
        { do: [{ open: 'board:hinomori' }] },
      ],
    },
    {
      when: { flag: 'shiomi_visited' },
      steps: [
        n('日野森駅。北の山の雪見村と、南の海の潮見町へ、電車が出ている。谷へのバスは、駅前のバス停からだ。', 'Hinomori Station. Trains run north to Yukimi Village and south to Shiomi by the sea. Buses to the valley leave from the bus stop in front of the station.'),
        { do: [{ open: 'board:hinomori' }] },
      ],
    },
    {
      when: { flag: 'yukimi_visited' },
      steps: [
        n('日野森駅。北の山の雪見村へ、電車が出ている。谷へのバスは、駅前のバス停からだ。', 'Hinomori Station. Trains run north to Yukimi Village. Buses to the valley leave from the bus stop in front of the station.'),
        { do: [{ open: 'board:hinomori' }] },
      ],
    },
    { when: { flag: 'chapter1_done' }, steps: [n('日野森駅。今は電車が止まっている。谷へのバスは、駅前のバス停から出ている。', 'Hinomori Station. No trains are running right now. Buses to the valley leave from the bus stop in front of the station.')] },
    { steps: [n('日野森駅。小さいが、町の人にとって大切な駅だ。', 'Hinomori Station. Small, but important to the townspeople.')] },
  ],
  town_busstop: [
    {
      when: { all: [{ questActive: 'mq6' }, { obj: 'mq6.kirishima' }, { notObj: 'mq6.arrive' }] },
      steps: [
        { do: [{ bus: 'arrive' }] },
        n('駅前のバス停に、谷へ行くバスがやってきた。', 'The bus to the valley pulls up at the stop in front of the station.'),
        say('busdriver', '日野森の谷行き、まもなく発車しまーす。', 'The bus to Hinomori Valley is about to depart!'),
        { cg: 'cg_valley_arrival', say: 'バスを降りると、甘い桃の香りがした。山に囲まれた谷に、川の音が響いている。', en: 'Stepping off the bus, you smell sweet peaches. The sound of the river echoes through the valley ringed by mountains.' },
        { cg: 'cg_valley_arrival', say: '……ここに、Kを知る人がいる。', en: '…Somewhere here is someone who knew K.' },
        { do: [{ objective: 'mq6.arrive' }, { bus: 'leave' }, { warp: { map: 'valley', x: 22, y: 18 } }] },
      ],
    },
    {
      when: { flag: 'chapter1_done' },
      steps: [
        n('バス停だ。「日野森の谷行き」と書いてある。', 'A bus stop. The sign says “To Hinomori Valley”.'),
        {
          choice: [
            {
              text: 'バスで谷へ行く', en: 'Take the bus to Hinomori Valley',
              then: [
                { do: [{ bus: 'arrive' }] },
                n('バスがやってきた。乗りこむと、バスは山道をのぼっていく。窓の外に、{桃|もも}の花が見えてきた。', 'The bus pulls up. You get on, and it climbs the mountain road. Peach blossoms appear outside the window.'),
                { do: [{ bus: 'leave' }, { warp: { map: 'valley', x: 22, y: 18 } }] },
              ],
            },
            { text: 'やめる', en: 'Stay in town' },
          ],
        },
      ],
    },
    { steps: [n('バス停だ。「日野森の谷行き」……{時刻表|じこくひょう}を見ると、今日のバスはもう終わっていた。', 'A bus stop: “To Hinomori Valley”. According to the timetable, today’s last bus has already left.')] },
  ],
  // ================================================================ chapter 4: Shiomi harbour town
  nagisa: [
    {
      when: { all: [{ questActive: 'mq14' }, { obj: 'mq14.arrive' }, { notObj: 'mq14.nagisa' }] },
      steps: [
        say('nagisa', 'こんにちは！ 潮見町観光案内所のなぎさです。ようこそ、海の見える町へ！', 'Hello! I’m Nagisa from the Shiomi tourist office. Welcome to the town by the sea!', 'happy'),
        say('nagisa', '{観光客|かんこうきゃく|v:kankoukyaku}の方ですか？ この町の{名物|めいぶつ|v:meibutsu}は、いか焼きとレモン、それから……夏祭りの舟歌！', 'Are you a tourist? This town’s specialities are grilled squid, lemons and… the boat song at the summer festival!'),
        say('nagisa', '……だったんですけど。', '…Or at least, they used to be.', 'worried'),
        say('nagisa', '町と{いっても||g:toittemo}、住んでいるのは三百人くらい。若い人はみんな出ていっちゃって、島への{定期船|ていきせん|v:teikisen}もなくなりました。', 'I say “town”, but only about three hundred people live here. The young people have all left, and the ferry to the island stopped running.'),
        { teach: 'g:toittemo' },
        say('nagisa', 'それに最近、おかしいんです。夏祭りで歌う舟歌を、だれも思い出せなくて。町の人みんなが、同じところで歌がとぎれちゃうんです。', 'And lately something strange is happening. Nobody can remember the boat song we sing at the summer festival. Everyone stops singing at the same place.', 'worried'),
        {
          quiz: {
            q: 'なぎさが「町といっても、住んでいるのは三百人くらい」と言ったのはなぜか。',
            qEn: 'Why does Nagisa say “I say town, but only about three hundred people live here”?',
            options: ['「町」という言葉から想像するより、ずっと小さいから', '三百人は、町としてはとても多いから', '観光客が三百人来るから', '町の名前を説明したかったから'],
            answer: 0,
            why: '〜といっても corrects the image a word creates: it is called a town, but it is really small.',
          },
          keys: ['g:toittemo'], area: 'grammar', retry: true,
        },
        say('nagisa', '舟歌をいちばんよく知っているのは、源さんです。東の桟橋で、毎日海を見ています。……あ、これ、案内所のうちわです。どうぞ！', 'The one who knows the boat song best is Gen-san. He watches the sea from the east pier every day. …Oh, here’s a fan from the tourist office!', 'happy'),
        { do: [{ objective: 'mq14.nagisa' }, { note: 'rural_transport' }, { give: 'uchiwa' }, { rel: 'nagisa', points: 1, memory: 'first_meeting' }, { learn: ['v:kankoukyaku', 'v:meibutsu', 'v:teikisen', 'g:toittemo'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq15' }, { notObj: 'mq15.hamada' }] },
      steps: [say('nagisa', '浜田さんの食堂、お昼はすごく混むんです。手伝ってあげたら、きっと喜びますよ！', 'Mrs. Hamada’s diner gets really busy at lunchtime. She’d be thrilled if you helped!')],
    },
    {
      when: { flag: 'chapter4_done' },
      steps: [
        say('nagisa', '今年の夏祭り、舟歌がちゃんと歌えそうなんです！ 観光客の人たちにも、聞いてもらえたらいいな。', 'This year at the summer festival we’ll actually be able to sing the boat song! I hope the tourists get to hear it too.', 'happy'),
        say('nagisa', '島へ渡る飛び石は、潮が引いているときなら歩けますよ。小さな祠があるんです。', 'You can walk across the stepping stones to the island when the tide is out. There’s a little shrine there.'),
      ],
    },
    { steps: [say('nagisa', '潮見町へようこそ！ 困ったことがあったら、案内所のなぎさに何でも聞いてくださいね。', 'Welcome to Shiomi! If you need anything, just ask Nagisa at the tourist office.', 'happy')] },
  ],
  gen: [
    {
      when: { all: [{ questActive: 'mq15' }, { notObj: 'mq15.gen' }] },
      steps: [
        say('gen', '……なんだ、観光客か。写真なら、あっちの灯台でも撮りな。', '…What, a tourist? If you want photos, go take them at the lighthouse over there.'),
        n('源さんは、海を見たまま動かない。足もとには、古い{網|あみ|v:ami}が置いてある。', 'Gen-san doesn’t move, his eyes on the sea. An old net lies at his feet.'),
        say('gen', '舟歌のことか。……わしは六十年、{漁師|りょうし|v:ryoushi}をやってきた。{引退|いんたい|v:intai}した{ものの||g:monono}、毎朝ここに来てしまう。体が、海を忘れんのだ。', 'The boat song, is it. …I was a fisherman for sixty years. I may have retired, but I still end up here every morning. My body won’t forget the sea.'),
        { teach: 'g:monono' },
        say('gen', '舟歌は、目をつぶっても歌えた。……それが今は、二番の途中から、どうしても出てこん。歌おうとすると、波の音しか聞こえんのだ。', 'I could sing the boat song with my eyes closed. …Now, from the middle of the second verse, it just won’t come. When I try to sing, all I hear is the waves.', 'worried'),
        {
          quiz: {
            q: '「引退したものの、毎朝ここに来てしまう」の意味に一番近いものはどれか。',
            qEn: 'Which is closest in meaning to “I retired, but I still come here every morning”?',
            options: ['引退したが、それでも毎朝ここに来る', '引退したので、毎朝ここに来られる', '引退する前は、毎朝ここに来ていた', '引退したら、毎朝ここに来るつもりだ'],
            answer: 0,
            why: '〜ものの = “although / but” (formal). The second part goes against what the first would make you expect.',
          },
          keys: ['g:monono'], area: 'grammar', retry: true,
        },
        say('gen', '……浜田の食堂へ行ってみな。あいつも昔は、祭りでよく歌っとった。', '…Try Hamada’s diner. She used to sing at the festival a lot, too.'),
        { do: [{ objective: 'mq15.gen' }, { note: 'retirement' }, { rel: 'gen', points: 1, memory: 'first_meeting' }, { learn: ['v:ryoushi', 'v:intai', 'v:ami', 'g:monono'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq16' }, { obj: 'mq16.shiraishi' }, { notObj: 'mq16.dawn' }] },
      steps: [
        n('次の朝。まだ暗いうちに、源さんの舟が{出港|しゅっこう|v:shukkou}の準備をしていた。', 'The next morning. While it is still dark, Gen-san’s boat is getting ready to leave port.'),
        say('gen', '……白石先生から聞いた。カイトの貝に、歌が残っとるそうだな。', '…I heard from Dr. Shiraishi. Kaito’s shell still holds the song, they say.'),
        n('さくら貝を源さんに渡した。源さんは、それをそっと耳に当てた。', 'You hand the pink shell to Gen-san. He gently holds it to his ear.'),
        { do: [{ music: 'memory' }] },
        { cg: 'cg_harbor_song', say: '{夜明け|よあけ|v:yoake}の光が、海を金色にそめていく。源さんは目をつぶって、ゆっくりと口を開いた。', en: 'The light of dawn dyes the sea gold. Gen-san closes his eyes and slowly opens his mouth.' },
        { cg: 'cg_harbor_song', say: '「♪ 沖の{鴎|かもめ}に　潮どき問えば　わたしゃ立つ鳥　波に聞け……」', en: '“♪ Ask the gulls out at sea when the tide will turn — I’m a bird about to fly, ask the waves…”' },
        { cg: 'cg_harbor_song', say: '低い声が、静かな港に{響|ひび|v:hibiku}いた。二番も、三番も。とぎれることなく、最後まで。', en: 'His low voice echoes across the quiet harbour. The second verse, the third. Without a break, all the way to the end.' },
        say('gen', '……出た。全部、出た。', '…It came. All of it came back.', 'surprised'),
        say('gen', '思い出す{どころか||g:dokoroka}、昔より声が出とる気がするわ。はっはっは！', 'Far from just remembering it, I think my voice is better than it used to be. Ha ha ha!', 'happy'),
        { teach: 'g:dokoroka' },
        {
          quiz: {
            q: '「思い出すどころか、昔より声が出ている」の意味に一番近いものはどれか。',
            qEn: 'Which is closest in meaning to “far from just remembering, my voice is better than before”?',
            options: ['思い出しただけでなく、昔よりよく歌えている', '思い出せなかったので、声が出なかった', '思い出したが、昔ほどは歌えない', '思い出すために、声を出している'],
            answer: 0,
            why: 'A どころか B: not just A — something stronger (B) is true. Here B goes well beyond merely remembering.',
          },
          keys: ['g:dokoroka'], area: 'grammar', retry: true,
        },
        say('gen', 'この歌は、わしの親父も、そのまた親父も{歌|うた}い{継|つ|v:utaitsugu}いできた。わしで終わらせるわけには、いかんな。', 'My father sang this song, and his father before him. I can’t let it end with me.'),
        say('gen', '歌詞を書いておいてくれ。あんたの字でな。……それから、灯台の海野にも見せてやってくれんか。あいつは、昔この町の学校で先生をしとった。', 'Write the words down for me. In your handwriting. …And would you show them to Umino at the lighthouse? He used to be a teacher at the school here.'),
        n('源さんの舟歌を、一字一字ていねいに書き留めた。', 'You carefully write down Gen-san’s boat song, character by character.'),
        say('gen', 'これは礼だ。……今日から、あんたも潮見の漁師の仲間だ。', 'This is my thanks. …From today, you’re one of Shiomi’s fishermen too.', 'happy'),
        { do: [{ objective: 'mq16.dawn' }, { take: 'pink_shell' }, { give: 'song_sheet' }, { give: 'hachimaki' }, { rel: 'gen', points: 3, memory: 'boat_song' }, { learn: ['v:yoake', 'v:hibiku', 'v:utaitsugu', 'v:shukkou', 'g:dokoroka'] }] },
        n('そのとき、波の間から、貝のような言霊が顔を出した！', 'Just then, a shell-like Kotodama peeks out between the waves!'),
        {
          battle: { species: 'yadone', level: 19, recruitable: true, bg: 'bg_harbor_quay.webp' },
          win: [n('ヤドネは、源さんの歌に合わせて、貝をカラカラと鳴らしていた。', 'Yadone rattles its shell in time with Gen-san’s song.'), { do: [{ seen: 'yadone' }] }],
          lose: [n('ヤドネは、波の向こうへ帰っていった。でも、歌はもう消えない。', 'Yadone goes back beyond the waves. But the song won’t vanish again.')],
        },
      ],
    },
    {
      when: { flag: 'chapter4_done' },
      steps: [say('gen', '今朝も歌いながら網を直したわ。カイトのやつ、二番まで覚えたぞ。', 'I mended the nets singing again this morning. That Kaito’s learned it up to the second verse.', 'happy')],
    },
    {
      when: { questDone: 'mq16' },
      steps: [say('gen', '灯台の海野には、もう会ったか？ あいつは口はきびしいが、字にはもっときびしい。はっはっは。', 'Have you met Umino at the lighthouse yet? He’s strict with his words, and even stricter with writing. Ha ha.')],
    },
    { steps: [say('gen', '……海はな、毎日ちがう顔をしとる。人の言葉と同じだ。', '…The sea shows a different face every day. Just like people’s words.')] },
  ],
  hamada: [
    {
      when: { all: [{ questActive: 'mq15' }, { obj: 'mq15.gen' }, { notObj: 'mq15.hamada' }] },
      steps: [
        say('hamada', 'いらっしゃい！ ……あら、源さんに言われて来たの？ ちょうどよかった、お昼の注文がたまっちゃって！', 'Welcome! …Oh, Gen-san sent you? Perfect timing — the lunch orders are piling up!', 'happy'),
        say('hamada', '注文は最後まで聞くのよ。小さな言葉ひとつで、意味がぜんぜん変わるんだから。', 'Listen to the order right to the end. One little word changes the whole meaning.'),
        {
          quiz: {
            q: 'お客さん：「この店、値段のわりに量が多いね。」――お客さんは何と言っているか。',
            qEn: 'Customer: “This place gives big portions for the price.” — What is the customer saying?',
            options: ['値段から考えると、量が多い', '値段が高いので、量が多い', '量が多いので、値段が高い', '値段も量も、ふつうだ'],
            answer: 0,
            why: '〜わりに: compared with what you would expect from the price, the portion is big.',
          },
          keys: ['g:warini'], area: 'grammar', retry: true,
        },
        {
          quiz: {
            q: 'お客さん：「子ども（　　）、よく食べるねえ。」――一番いいのはどれか。',
            qEn: 'Customer: “For a child, he really eats a lot!” — which fits best?',
            options: ['にしては', 'にもかかわらず', 'どころか', 'ものの'],
            answer: 0,
            why: 'Noun + にしては: “for a …” (considering it is a child, eating that much is surprising).',
          },
          keys: ['g:nishitewa'], area: 'grammar', retry: true,
        },
        {
          quiz: {
            q: 'お客さん：「雨（　　）、わざわざ来たんだよ。名物のいか焼き、二本ね！」',
            qEn: 'Customer: “I came all this way despite the rain. Two of your famous grilled squid!”',
            options: ['にもかかわらず', 'わりに', 'にしては', 'といっても'],
            answer: 0,
            why: '〜にもかかわらず: “in spite of”. They came even though it was raining.',
          },
          keys: ['g:nimokakawarazu'], area: 'grammar', retry: true,
        },
        say('hamada', 'あんた、耳がいいねえ！ 助かったわ。', 'You’ve got good ears! What a help.', 'happy'),
        say('hamada', '……舟歌ね。あたしも毎年、祭りで歌ってた。なのに、今年は二番から先が、真っ白なのよ。', '…The boat song. I sang it at the festival every year too. But this year everything after the second verse is just blank.', 'worried'),
        say('hamada', 'そういえば、孫のカイトが「貝から歌が聞こえる」って言ってたわ。西の浜辺で遊んでるはずよ。', 'Now that I think of it, my grandson Kaito said he “hears a song from a shell”. He should be playing on the beach to the west.'),
        { do: [{ objective: 'mq15.hamada' }, { rel: 'hamada', points: 1, memory: 'first_meeting' }, { learn: ['g:warini', 'g:nishitewa', 'g:nimokakawarazu'] }] },
      ],
    },
    {
      when: { obj: 'mq15.hamada' },
      steps: [
        say('hamada', 'いらっしゃい！ 今日も手伝ってくれるの？', 'Welcome! Here to help again today?', 'happy'),
        {
          choice: [
            { text: 'バイトする', en: 'Work: diner orders (grammar, pays ¥220 per correct answer)', then: [{ do: [{ open: 'job:diner' }] }] },
            { text: '何か買う', en: 'Buy something', then: [{ shop: ['ikayaki', 'takosen', 'lemon', 'sea_salt'] }] },
            { text: 'またこんど', en: 'Maybe later' },
          ],
        },
      ],
    },
    { steps: [say('hamada', 'いらっしゃい！ 潮見の名物、いか焼きはいかが？', 'Welcome! How about Shiomi’s speciality, grilled squid?', 'happy'), { shop: ['ikayaki', 'takosen', 'lemon', 'sea_salt'] }] },
  ],
  kaito: [
    {
      when: { all: [{ questActive: 'mq15' }, { obj: 'mq15.hamada' }, { notObj: 'mq15.kaito' }] },
      steps: [
        say('kaito', 'ねえねえ、聞いて！ この{貝殻|かいがら|v:kaigara}、耳に当てると歌が聞こえるんだ！', 'Hey, hey, listen! When I hold this shell to my ear, I can hear a song!', 'happy'),
        n('さくら貝を耳に当ててみた。波の音の向こうに、かすかに、だれかが歌を{口|くち|v:kuchizusamu}ずさんでいる。', 'You hold the pink shell to your ear. Beyond the sound of the waves, someone is faintly humming a song.'),
        say('kaito', 'ばあちゃんの舟歌と、同じ歌だよ。でも、続きはぼくも知らないんだ……。', 'It’s the same song as Grandma’s boat song. But I don’t know how it goes on either…', 'worried'),
        n('そのとき、浜辺に打ち上げられた紙の舟が、ぱたぱたと動きだした！', 'Just then, a paper boat washed up on the beach starts flapping about!'),
        {
          battle: { species: 'funedori', level: 18, recruitable: true, bg: 'bg_harbor_beach.webp' },
          win: [
            n('紙の舟は、ぬれた手紙でできていた。にじんだ字の中に、「K」という字だけが読める。', 'The paper boat is made from a wet letter. In the smudged ink, only the letter “K” can be read.'),
            say('kaito', 'この貝、あげる！ 歌の続き、見つけてね。約束だよ！', 'You can have this shell! Find the rest of the song, okay? Promise!', 'happy'),
            { do: [{ objective: 'mq15.kaito' }, { give: 'pink_shell' }, { give: 'message_bottle' }, { seen: 'funedori' }, { rel: 'kaito', points: 2, memory: 'shell' }, { learn: ['v:kaigara', 'v:kuchizusamu', 'v:hamabe'] }] },
          ],
          lose: [say('kaito', 'あっ、逃げちゃった！ ……また来てね！', 'Ah, it got away! …Come back again!')],
        },
      ],
    },
    {
      when: { flag: 'chapter4_done' },
      steps: [say('kaito', '♪ 沖の鴎に　潮どき問えば……。じいちゃんに教わったんだ。上手でしょ！', '♪ Ask the gulls out at sea when the tide will turn… Gen-san taught me. I’m good, right?', 'happy')],
    },
    { steps: [say('kaito', '{干潮|かんちょう|v:kanchou}のときはね、島まで歩いて行けるんだよ！ {満潮|まんちょう|v:manchou}になったら、すぐ戻らないとだめだけど。', 'At low tide you can walk all the way to the island! But at high tide you have to come straight back.'), { do: [{ learn: ['v:kanchou', 'v:manchou'] }] }] },
  ],
  shiraishi: [
    {
      when: { all: [{ questActive: 'mq16' }, { notObj: 'mq16.shiraishi' }] },
      steps: [
        say('shiraishi', 'あら、その貝……。ちょっと見せてくれる？ わたしは白石。海の生き物の「声」を研究しているの。', 'Oh, that shell… may I see it? I’m Shiraishi. I study the “voices” of sea creatures.', 'surprised'),
        say('shiraishi', 'クジラはね、仲間に歌で話しかけるの。何百キロも離れた仲間に、同じ歌が伝わっていくのよ。', 'Whales talk to each other in songs, you know. The same song travels to whales hundreds of kilometres away.'),
        say('shiraishi', '{防波堤|ぼうはてい|v:boukatei}に録音機を置いて、毎晩海の音を録っているんだけど……最近、聞いたことのないメロディーが入るの。', 'I leave a recorder on the breakwater and record the sea every night… and lately a melody I’ve never heard keeps showing up.'),
        {
          listening: 'l_harbor_recording',
        },
        say('shiraishi', '海は、人が忘れた歌まで覚えているのかもしれない。……研究者としては、そう言わ{ざるを得ない||g:zaruoenai}わね。', 'Maybe the sea remembers even the songs people forget. …As a researcher, I have to admit that.'),
        { teach: 'g:zaruoenai' },
        say('shiraishi', 'その貝を、歌を知っている人のところへ持っていって。夜明けの静かな海なら、きっと歌が戻ってくるわ。', 'Take that shell to someone who knows the song. On the quiet sea at dawn, the song will surely come back.'),
        { do: [{ objective: 'mq16.shiraishi' }, { rel: 'shiraishi', points: 1, memory: 'whale_song' }, { learn: ['v:boukatei', 'v:kakegoe', 'g:zaruoenai'] }] },
      ],
    },
    { steps: [say('shiraishi', '今夜も録音機を置いておくわ。海の歌、また聞こえるかしら。', 'I’ll leave the recorder out again tonight. I wonder if we’ll hear the sea’s song again.')] },
  ],
  umino: [
    {
      when: { all: [{ questActive: 'mq17' }, { notObj: 'mq17.umino' }] },
      steps: [
        say('umino', '……何の用かね。灯台は見学できんよ。', '…What do you want? The lighthouse is not open to visitors.'),
        n('源さんの舟歌の歌詞を見せた。海野さんは眼鏡を押し上げて、紙をじっと見た。', 'You show him the lyrics of Gen-san’s boat song. Mr. Umino pushes up his glasses and studies the paper.'),
        say('umino', 'ほう……源の歌か。字はまだ固いが、ていねいに書いてある。', 'Hm… Gen’s song. Your handwriting is still stiff, but it is careful.', 'surprised'),
        say('umino', 'わたしは四十年、この町の学校で国語を教えた。生徒がいなくなって、学校は閉じた。今は、この灯台を守る{しかない||g:shikanai}。', 'I taught Japanese at this town’s school for forty years. The pupils left, and the school closed. Now all I can do is keep this lighthouse.'),
        { teach: 'g:shikanai' },
        say('umino', '……毎晩、灯台の下に、帳面を持った女の人が来る。だれかを待っているようだ。わたしが声をかけても、首をふるだけだ。', '…Every night a woman with a notebook comes to the foot of the lighthouse. She seems to be waiting for someone. When I speak to her, she only shakes her head.'),
        say('umino', 'あの人に会いたいのなら、言葉の力を見せてもらおう。言葉を正しく使えん者に、人の心はつかめんからな。準備ができたら来なさい。', 'If you want to meet her, show me the power of your words. Someone who cannot use words correctly cannot reach a person’s heart. Come back when you are ready.'),
        { do: [{ objective: 'mq17.umino' }, { rel: 'umino', points: 1, memory: 'first_meeting' }, { learn: ['g:shikanai', 'v:toudai'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq17' }, { obj: 'mq17.umino' }, { notObj: 'mq17.master' }] },
      steps: [
        say('umino', 'では、始めよう。言葉の流れを読む問題だ。', 'Then let us begin. Questions on reading the flow of a sentence.'),
        {
          quiz: {
            q: '練習した（　　）、本番ではうまく話せなかった。',
            qEn: 'Although I practised, I couldn’t speak well on the day.',
            options: ['ものの', 'からこそ', 'おかげで', 'うえに'],
            answer: 0,
            why: '〜ものの: the result goes against what the first part would lead you to expect.',
          },
          keys: ['g:monono'], area: 'grammar', retry: true,
        },
        {
          quiz: {
            q: '彼は謝る（　　）、わたしのせいだと言い出した。',
            qEn: 'Far from apologising, he started saying it was my fault.',
            options: ['どころか', 'にしては', 'わりに', 'としても'],
            answer: 0,
            why: 'A どころか B: not A at all — the opposite (B) happened.',
          },
          keys: ['g:dokoroka'], area: 'grammar', retry: true,
        },
        {
          quiz: {
            q: '台風で船が出ないので、今日は島へ行くのをあきらめる（　　）。',
            qEn: 'The boats aren’t running because of the typhoon, so I have no choice but to give up going to the island today.',
            options: ['しかない', 'わけがない', 'どころではない', 'に越したことはない'],
            answer: 0,
            why: '〜しかない: there is no other option. わけがない = it can’t be; に越したことはない = it is best to.',
          },
          keys: ['g:shikanai'], area: 'grammar', retry: true,
        },
        {
          quiz: {
            q: 'たとえ全部は思い出せない（　　）、歌い続けることに意味がある。',
            qEn: 'Even if we can’t remember all of it, there is meaning in carrying on singing.',
            options: ['としても', 'からには', 'ものの', 'にしては'],
            answer: 0,
            why: 'たとえ〜としても: “even if (it were so)”. A hypothetical concession, unlike ものの (a real fact).',
          },
          keys: ['g:toshitemo'], area: 'grammar', retry: true,
        },
        say('umino', '……よろしい。最後に、この灯台の光を守る言霊と向き合いなさい。', '…Very well. Lastly, face the Kotodama that guards this lighthouse’s light.'),
        {
          battle: { species: 'umiakari', level: 25, boss: true, bg: 'bg_harbor_cliff.webp' },
          win: [
            say('umino', '見事だ。……生徒にこんな顔をさせられたのは、何年ぶりかな。', 'Splendid. …How many years has it been since a pupil made me feel like this.', 'happy'),
            say('umino', 'この鍵を持っていきなさい。灯台の上まで行ける鍵だ。わたしの最後の生徒の、合格の証だよ。', 'Take this key. It opens the way to the top of the lighthouse. Proof that my last pupil passed.'),
            say('umino', '夜になった。……ほら、今夜も来ている。手すりのところだ。', 'Night has fallen. …Look, she has come again tonight. Over by the railing.'),
            { do: [{ objective: 'mq17.master' }, { give: 'lighthouse_key' }, { time: 'evening' }, { rel: 'umino', points: 3, memory: 'trial_passed' }, { learn: ['g:monono', 'g:dokoroka', 'g:shikanai', 'g:toshitemo'] }] },
          ],
          lose: [say('umino', '言葉は、焦ると逃げていく。落ち着いて、また来なさい。', 'Words run away when you hurry. Calm down, and come again.')],
        },
      ],
    },
    {
      when: { flag: 'chapter4_done' },
      steps: [say('umino', '夏祭りの舟歌、わたしも歌うことにした。……音痴だと笑うんじゃないぞ。', 'I have decided to sing the boat song at the summer festival too. …Don’t you laugh at my singing.', 'happy')],
    },
    { steps: [say('umino', '灯台の光は、遠くの船のためにある。言葉も同じだ。届けたい相手がいてこそ、意味を持つ。', 'A lighthouse beam exists for distant ships. Words are the same: they only mean something when there is someone you want them to reach.')] },
  ],
  traveller: [
    {
      when: { all: [{ questActive: 'mq17' }, { obj: 'mq17.master' }, { notObj: 'mq17.lighthouse' }] },
      steps: [
        { do: [{ music: 'lighthouse' }] },
        { cg: 'cg_harbor_lighthouse', say: '灯台の光が、星の多い夜の海を、ゆっくりとなでていく。手すりのそばに、帳面を抱えた女の人が立っていた。', en: 'The lighthouse beam slowly sweeps the starry night sea. By the railing stands a woman holding a notebook.' },
        { cg: 'cg_harbor_lighthouse', say: '女の人は、今度は消えなかった。ゆっくりとふり返って、@nameを見た。', en: 'This time the woman does not vanish. She slowly turns around and looks at @name.' },
        say('traveller', '……雪見村でも、会ったわね。手紙を、読んでくれたのね。', '…We met in Yukimi Village too. You read my letter, didn’t you.'),
        say('traveller', 'わたしは昔、霧島さんたちと一緒に、言葉を保存する研究をしていた。消えていく言葉を、全部この帳面に集めれば、だれも忘れなくてすむと思っていたの。', 'Long ago I worked with Dr. Kirishima and the others on research to preserve words. I thought that if I gathered every vanishing word in this notebook, nobody would have to forget.'),
        say('traveller', 'でも、言葉は集めて閉じこめるものじゃなかった。人が使わなくなった言葉は、帳面の中で、少しずつ色をなくしていった。……わたしの名前も。', 'But words aren’t things you collect and lock away. Words people stopped using slowly lost their colour inside the notebook. …My own name too.', 'worried'),
        {
          choice: [
            { text: '「あなたの名前を、いっしょに探させてください。」', en: '“Please let me help you find your name.”' },
            { text: '「源さんの舟歌、戻ってきましたよ。」', en: '“Gen-san’s boat song has come back.”' },
          ],
        },
        say('traveller', '……あなたは、言葉を閉じこめるんじゃなくて、人に返しているのね。名前を呼んで、歌を歌わせて、手紙を読んで。', '…You don’t lock words away. You give them back to people. You call their names, let them sing their songs, read their letters.', 'happy'),
        say('traveller', 'わたしの最初の帳面は、古い都のお寺に預けてあるの。そこに、わたしの名前が、まだ残っているかもしれない。', 'My very first notebook is kept at a temple in the old capital. My name might still be there.'),
        say('traveller', '……もし、そこまで来てくれるなら。今度は、わたしが待っているわ。', '…If you come that far. This time, I’ll be the one waiting.', 'happy'),
        n('女の人は、灯台の光の中を歩いて、坂道を下りていった。帳面から、一枚の紙がひらりと落ちた。', 'The woman walks through the lighthouse beam and goes down the slope. A single sheet slips out of her notebook.'),
        n('紙には、ていねいな字で一つだけ書いてあった。「香」。', 'On it, in careful handwriting, is a single character: 香.'),
        {
          quiz: {
            q: '女の人の名前が消えていったのはなぜか。',
            qEn: 'Why did the woman’s name fade away?',
            options: ['言葉を帳面に閉じこめて、使わなくなったから', '灯台の光が強すぎたから', '舟歌を歌わなかったから', '雪見村に帳面を忘れたから'],
            answer: 0,
            why: '人が使わなくなった言葉は、帳面の中で色をなくしていった — words that are no longer used lose their colour.',
          },
          keys: ['v:toudai'], area: 'reading', retry: true,
        },
        { do: [{ objective: 'mq17.lighthouse' }, { learn: ['v:suiheisen', 'v:toudai', 'g:toshitemo'] }, { seen: 'umiakari' }] },
        { cg: 'cg_harbor_arrival', say: '言葉は、閉じこめるものじゃない。歌えば、海の向こうまで届く。\n― 第四章「潮見町の舟歌」完 ―', en: 'Words are not meant to be locked away. Sing them, and they reach beyond the sea.\n— End of Chapter 4: “The Boat Song of Shiomi” —' },
        n('Chapter 4 complete! Shiomi stays open: help at the diner, befriend the shell and gull Kotodama and keep reviewing. Chapter 5 (Kyoto) is open: talk to Ms. Mori in Hinomori.'),
      ],
    },
  ],
  shiomi_station: [
    {
      when: { flag: 'kyoto_visited' },
      steps: [
        n('潮見駅。単線の線路が、山の向こうの日野森までつながっている。乗り換えれば、京都にも行ける。', 'Shiomi Station. A single-track line runs over the hills to Hinomori. With a change you can reach Kyoto too.'),
        { do: [{ open: 'board:shiomi' }] },
      ],
    },
    {
      steps: [
        n('潮見駅。単線の線路が、山の向こうの日野森までつながっている。', 'Shiomi Station. A single-track line runs over the hills to Hinomori.'),
        { do: [{ open: 'board:shiomi' }] },
      ],
    },
  ],
  harbor_diner: [{ steps: [n('港食堂「はまだ」。のれんに、魚の絵が三つ描いてある。いいにおいがする。', 'The harbour diner “Hamada”. Three fish are painted on the noren curtain. Something smells good.')] }],
  harbor_inn: [
    {
      steps: [
        n('海の見える宿「しおさい」。二階のベランダから、水平線が見える。', 'The seaside inn “Shiosai”. From the first-floor balcony you can see the horizon.'),
        {
          choice: [
            {
              text: '泊まる（¥700）', en: 'Stay the night (¥700: heals your team, starts a new day)',
              then: [
                {
                  if: { money: 700 },
                  then: [
                    { do: [{ money: -700 }, { sleep: true }, { learn: ['v:suiheisen'] }] },
                    n('波の音を聞きながら、ぐっすり眠った。言霊たちも元気になった！', 'Listening to the waves, you sleep soundly. Your Kotodama are fully healed!'),
                  ],
                  else: [n('お金が足りない……。', 'Not enough money…')],
                },
              ],
            },
            { text: 'やめる', en: 'Leave' },
          ],
        },
      ],
    },
  ],
  harbor_office: [{ steps: [n('漁協の事務所。「本日の水温　二十二度　波　おだやか」と書いてある。', 'The fishing cooperative office. “Water temperature today: 22°C. Waves: calm.”'), { do: [{ note: 'fishery' }] }] }],
  harbor_genhouse: [{ steps: [n('源さんの家だ。玄関に、使いこまれた網とガラスの浮き玉がつるしてある。', 'Gen-san’s house. A well-used net and a glass fishing float hang by the door.')] }],
  harbor_lighthouse: [
    { when: { item: 'lighthouse_key' }, steps: [n('灯台の扉は、海野さんの鍵で開くようになった。上の窓から、町全体と海が見える。', 'The lighthouse door now opens with Mr. Umino’s key. From the window at the top you can see the whole town and the sea.')] },
    { steps: [n('白い灯台だ。扉には鍵がかかっている。「関係者以外立入禁止」。', 'A white lighthouse. The door is locked: “Authorised personnel only.”')] },
  ],
  harbor_lemon: [{ steps: [n('レモンの木がならぶ小さな畑。潮風で、葉っぱが少ししょっぱい気がする。', 'A small field of lemon trees. The leaves seem a little salty from the sea breeze.')] }],
  harbor_bottle: [
    { when: { item: 'message_bottle' }, steps: [n('砂浜に、波が静かに寄せている。', 'Waves lap quietly on the sand.')] },
    { steps: [n('{浜辺|はまべ|v:hamabe}に、きれいな貝殻がたくさん落ちている。', 'Lots of pretty shells lie on the beach.'), { do: [{ learn: ['v:hamabe'] }] }] },
  ],
  harbor_hokora: [
    {
      steps: [
        n('島の小さな祠。海の安全を祈って、だれかがお{神酒|みき}を供えている。', 'The little shrine on the island. Someone has left an offering of sake to pray for safety at sea.'),
        n('ここからは、町と灯台と、遠くの島々が全部見える。', 'From here you can see the town, the lighthouse and the distant islands all at once.'),
      ],
    },
  ],
  harbor_light: [{ steps: [n('防波堤の先の、赤い灯台。夜になると、船に港の入り口を知らせる。', 'The red harbour light at the end of the breakwater. At night it shows ships the way into the harbour.')] }],
  // ================================================================ chapter 2: Hinomori valley
  valley_busstop: [
    {
      steps: [
        n('バス停だ。{時刻表|じこくひょう}によると、町へのバスは一時間に一本。', 'A bus stop. According to the timetable, there is one bus an hour to town.'),
        {
          choice: [
            {
              text: '町へ帰る', en: 'Ride back to Hinomori town',
              then: [
                { do: [{ bus: 'arrive' }] },
                n('町へ行くバスがやってきた。', 'The bus to town pulls up.'),
                { do: [{ bus: 'leave' }, { warp: { map: 'town', x: 18, y: 20 } }] },
              ],
            },
            { text: 'もう少しいる', en: 'Stay a little longer' },
          ],
        },
      ],
    },
  ],
  // ================================================================ chapter 3: Yukimi village (story in development)
  yukimi_station: [
    {
      steps: [
        n('雪見駅。一両だけの電車が、日野森との間を行き来している。', 'Yukimi Station. A one-car train runs back and forth to Hinomori.'),
        { do: [{ open: 'board:yukimi' }] },
      ],
    },
  ],
  yukimi_guesthouse: [{ steps: [n('{合掌造|がっしょうづく}りの大きな{民宿|みんしゅく}。窓から{囲炉裏|いろり}の明かりがもれている。', 'A large thatched guesthouse. Firelight from the hearth glows through the windows.')] }],
  yukimi_gassho: [{ steps: [n('{屋根|やね}に雪がどっさり{積|つ}もった、古い{合掌造|がっしょうづく}りの家。', 'An old thatched farmhouse with heaps of snow on the roof.'), { do: [{ note: 'gassho' }] }] }],
  yukimi_clinic: [{ steps: [n('村の{診療所|しんりょうじょ}。「{本日|ほんじつ}の{診療|しんりょう}　九時〜十七時」', 'The village clinic. “Consultation hours today: 9:00–17:00.”')] }],
  yukimi_temple: [{ steps: [n('山寺の{本堂|ほんどう}。{静|しず}かな空気の中、お{香|こう}の{香|かお}りがする。', 'The main hall of the mountain temple. Incense hangs in the quiet air.')] }],
  yukimi_kamakura: [{ steps: [n('{雪|ゆき}で作った{かまくら}。中は思ったより{暖|あたた}かい。', 'A kamakura made of snow. It’s warmer inside than you’d think.')] }],
  tsuru: [
    {
      when: { all: [{ questActive: 'mq10' }, { obj: 'mq10.arrive' }, { notObj: 'mq10.tsuru' }] },
      steps: [
        say('tsuru', 'まあまあ、あんたが森ちゃんの言うとった子かね。遠いところを、よう来なさった。', 'My, my, so you’re the one Mori-chan wrote about. You’ve come a long way.', 'happy'),
        { do: [{ music: 'memory' }] },
        { cg: 'cg_mountain_hearth', say: '{囲炉裏|いろり|v:irori}の火が、ぱちぱちと鳴っている。つるさんは、温かい甘酒を出してくれた。', en: 'The fire in the sunken hearth crackles. Grandma Tsuru serves you warm amazake.' },
        say('tsuru', '森ちゃんへの手紙、ちゃんと読めたかね。……実はね、最近、字が思い出せんのよ。', 'Could Mori-chan read my letter? …The truth is, lately I can’t remember the characters.', 'worried'),
        say('tsuru', '東京におる息子から、毎月便りが来る。でも{封筒|ふうとう|v:fuutou}を開けても、漢字が雪みたいに溶けて、読めんの。', 'My son in Tokyo writes every month. But when I open the envelope, the kanji melt like snow and I can’t read them.', 'worried'),
        say('tsuru', '年をとる{ほど||g:hodo}、字というもんは大事になるのにねえ。', 'The older you get, the more precious characters become.', 'worried'),
        { teach: 'g:hodo' },
        n('息子さんの手紙を見せてもらった。消えかけた字を、ゆっくり読んでみる。', 'She shows you her son’s letter. You try to read the fading characters slowly.'),
        {
          quiz: {
            q: '手紙の一行：「寒い日が続きますが、【体調】はいかがですか。」　【体調】の読みはどれか。',
            qEn: 'A line of the letter: “The cold days continue — how is your health?” How is 【体調】 read?',
            options: ['たいちょう', 'からだしらべ', 'たいしょう', 'ていちょう'],
            answer: 0,
            why: '体調（たいちょう）= physical condition. 体 is read たい here, 調 ちょう (as in 調子).',
          },
          keys: ['v:taichou'], area: 'kanji', retry: true,
        },
        say('tsuru', 'たいちょう……。そうそう、体の調子のことやね。あんたが読んでくれると、字が戻ってくるみたいやわ。', 'Taichou… yes, of course, how the body is doing. When you read it, it’s as if the characters come back.', 'happy'),
        say('tsuru', 'ここらの言葉は{方言|ほうげん|v:hougen}が強いで、わかりにくいかもしれんけど、ゆっくりしていきなれ。', 'Folks round here speak a strong dialect, so it may be hard to follow, but make yourself at home.'),
        say('tsuru', 'そうそう、毎年冬になると、帳面を持った旅の女の人が、うちに泊まりに来るんよ。村の言葉を、ひとつひとつ{書き留め|かきとめ|v:kakitomeru}ていくの。', 'Oh, and every winter a travelling woman with a notebook stays here. She writes down the village’s words, one by one.'),
        { do: [{ objective: 'mq10.tsuru' }, { note: 'akiya' }, { rel: 'tsuru', points: 2, memory: 'hearth' }, { learn: ['v:irori', 'v:hougen', 'v:taichou', 'v:fuutou', 'v:kakitomeru', 'g:hodo'] }] },
        n('村のあちこちで、字が消えはじめているらしい。ひなという女の子が、かまくらの前で困っていたそうだ。', 'Characters seem to be fading all over the village. A girl called Hina was apparently upset in front of the kamakura.'),
      ],
    },
    {
      when: { all: [{ questActive: 'mq13' }, { obj: 'mq13.master' }, { notObj: 'mq13.tsuru' }] },
      steps: [
        { do: [{ music: 'memory' }] },
        { cg: 'cg_mountain_hearth', say: 'つるさんの囲炉裏の前で、手紙を開いた。うっすらと光る字が、並んでいる。', en: 'By Grandma Tsuru’s hearth, you open the letter. Faintly glowing characters line the page.' },
        n('「この手紙を読めるあなたへ。」', '“To you, who can read this letter.”'),
        n('「わたしは昔、言葉を失っていく人たちを救おうとして、言葉を集めつづけました。けれど、集めれば集めるほど、わたし自身の言葉が、こぼれ落ちていったのです。」', '“Long ago I tried to save people who were losing their words, and I kept collecting words. But the more I collected, the more my own words slipped away.”'),
        n('「いつか、わたしの名前を呼んでくれる人がいたら、海の見える町で待っています。　K」', '“If one day someone calls my name, I will be waiting in a town by the sea. — K”'),
        {
          quiz: {
            q: '手紙によると、Kさんはなぜ自分の言葉を失ったのか。',
            qEn: 'According to the letter, why did K lose her own words?',
            options: ['言葉を集めつづけたから', '雪の村に住んでいたから', '手紙を書かなかったから', '漢字を勉強しなかったから'],
            answer: 0,
            why: '集めれば集めるほど、わたし自身の言葉がこぼれ落ちていった — the more she collected, the more she lost.',
          },
          keys: ['v:tsutaeru'], area: 'reading', retry: true,
        },
        say('tsuru', '海の町……。あの人、毎年言うとった。「春になったら、海の見える町へ行く」って。', 'A town by the sea… She said it every year: “When spring comes, I’ll go to a town where you can see the sea.”', 'surprised'),
        say('tsuru', 'それにね、@nameちゃん。あんたと字を読んどったら、ほら。', 'And you know, @name — reading with you, look.', 'happy'),
        n('つるさんは、息子さんの手紙を、自分の声で読みはじめた。一字一字、ゆっくりと。でも、はっきりと。', 'Grandma Tsuru begins to read her son’s letter in her own voice. One character at a time, slowly, but clearly.'),
        say('tsuru', '「お母さん、お正月には帰ります」……。読める。ちゃんと、読めるよ。', '“Mum, I’ll come home for New Year”… I can read it. I can really read it.', 'happy'),
        say('tsuru', 'うれしい{ことに||g:kotoni}、字が戻ってきたんよ。ありがとうね、@nameちゃん。', 'To my joy, the characters have come back. Thank you, @name.', 'happy'),
        { teach: 'g:kotoni' },
        { do: [{ objective: 'mq13.tsuru' }, { rel: 'tsuru', points: 3, memory: 'letter_read' }, { learn: ['v:tsutaeru', 'g:kotoni'] }] },
        { cg: 'cg_mountain_arrival', say: '雪の下で、言葉は春を待っている。\n― 第三章「雪見村の手紙」完 ―', en: 'Beneath the snow, words are waiting for spring.\n— End of Chapter 3: “Letters from Yukimi Village” —' },
        n('Chapter 3 complete! Talk to Ms. Mori in front of the apartment to begin Chapter 4. Yukimi stays open: help at the clinic, befriend the snow and lantern Kotodama and keep reviewing.'),
      ],
    },
    {
      when: { questDone: 'mq13' },
      steps: [say('tsuru', '息子の手紙、毎晩読み返しとるんよ。字は、読むたびに{温|あった}かくなるねえ。', 'I read my son’s letter again every night. Characters get warmer every time you read them.', 'happy'), ...TSURU_STAY],
    },
    { when: { obj: 'mq10.tsuru' }, steps: [say('tsuru', 'まあまあ、寒かったろう。中でお茶でもどうだい。', 'My, you must be cold. How about some tea inside?'), ...TSURU_STAY] },
    { steps: [say('tsuru', 'まあまあ、寒かったろう。中でお茶でもどうだい。', 'My, you must be cold. How about some tea inside?')] },
  ],
  hina: [
    {
      when: { all: [{ questActive: 'mq11' }, { notObj: 'mq11.hina' }] },
      steps: [
        say('hina', 'ねえ、聞いて！ かまくらの前に立てた看板の字が、朝になったら消えてたの！', 'Hey, listen! The sign I put up in front of the kamakura — the writing vanished overnight!', 'worried'),
        say('hina', '「雪見村　かまくら」って、ちゃんと書いたのに。……あっ、あそこ！ 雪の中で何か動いてる！', 'I wrote “Yukimi Village — Kamakura” properly. …Ah, over there! Something’s moving in the snow!', 'surprised'),
        n('雪だまのような小さな言霊が、字のかけらをくわえて転がっていく！', 'A small Kotodama like a snowball rolls away with a fragment of a character in its mouth!'),
        {
          battle: { species: 'yukidama', level: 13, recruitable: true, bg: 'bg_mountain_village.webp' },
          win: [
            say('hina', 'つかまえた！ ……この子、字を食べてたんじゃないんだって。消えそうな字を、雪の中にしまって守ってたの。', 'Got it! …It wasn’t eating the writing. It was keeping the fading characters safe inside the snow.', 'happy'),
            say('hina', '字が全部なくなら{ないかぎり||g:naikagiri}、看板はまた書けるよね。いっしょに書こう！', 'As long as the characters don’t disappear completely, we can write the sign again, right? Let’s write it together!', 'happy'),
            { teach: 'g:naikagiri' },
            {
              quiz: {
                q: '「字がなくならないかぎり、看板はまた書ける」の意味に一番近いものはどれか。',
                qEn: 'Which is closest to 字がなくならないかぎり、看板はまた書ける?',
                options: ['字が残っていれば、また書ける', '字がなくなったら、また書ける', '字がなくなっても、書けない', '字は絶対になくならない'],
                answer: 0,
                why: 'ないかぎり = as long as … not / unless: as long as the characters don’t vanish, the sign can be rewritten.',
              },
              keys: ['g:naikagiri'], area: 'grammar', retry: true,
            },
            say('hina', 'これ、お礼！ 雪うさぎのお守りだよ。山でも、言霊がこごえないんだって。', 'This is for you! A snow-rabbit charm. They say your Kotodama won’t freeze in the mountains.', 'happy'),
            { do: [{ objective: 'mq11.hina' }, { give: 'usagi_charm' }, { rel: 'hina', points: 2 }, { seen: 'yukidama' }, { learn: ['g:naikagiri', 'v:kogoeru'] }] },
            n('{診療所|しんりょうじょ|v:shinryoujo}の藤井先生も、字のことで困っているらしい。', 'Dr. Fujii at the clinic seems to be having trouble with characters too.'),
          ],
          lose: [say('hina', 'だいじょうぶ？ 少し休んでから来てね。', 'Are you okay? Rest a bit and come back.', 'worried')],
        },
      ],
    },
    { steps: [say('hina', 'かまくら見た？ わたしが作ったんだよ！ 中であったかいお{餅|もち}食べるの。', 'Did you see the kamakura? I made it! We eat warm mochi inside.', 'happy')] },
  ],
  fujii: [
    {
      when: { all: [{ questActive: 'mq11' }, { notObj: 'mq11.fujii' }] },
      steps: [
        say('fujii', 'ちょうどよかった！ 薬の袋の字が消えかけていて、どれが誰のお薬か、わからなくなってしまったの。', 'Perfect timing! The writing on the medicine bags is fading, and I can’t tell whose medicine is whose.', 'worried'),
        say('fujii', '寒くなった{せいか||g:seika}、最近は{体調|たいちょう|v:taichou}を崩す人が多くて……。', 'Perhaps because it’s got colder, lots of people have been falling ill lately…', 'worried'),
        { teach: 'g:seika' },
        say('fujii', 'カルテを読み上げるから、合うものを選んでくれる？', 'I’ll read out the charts — can you pick the right one?'),
        {
          quiz: {
            q: '「熱があって、のどが痛い」――これは患者さんの何か。',
            qEn: '“A fever and a sore throat” — what are these?',
            options: ['症状', '処方', '診療所', '回復'],
            answer: 0,
            why: '症状 = symptoms. 処方 = prescription, 診療所 = clinic, 回復 = recovery.',
          },
          keys: ['v:shoujou'], area: 'vocab', retry: true,
        },
        {
          quiz: {
            q: '薬の袋：「医師の【処方】どおりに飲んでください」　【処方】の読みはどれか。',
            qEn: 'Medicine bag: “Take as prescribed by the doctor.” How is 【処方】 read?',
            options: ['しょほう', 'しょぼう', 'ところかた', 'しょうほう'],
            answer: 0,
            why: '処方（しょほう）: 処 is しょ, 方 is ほう — no voicing here.',
          },
          keys: ['v:shohou'], area: 'kanji', retry: true,
        },
        {
          quiz: {
            q: '「雪の中で長い時間待っていたら、手が＿＿しまった。」',
            qEn: 'I waited in the snow for a long time, and my hands ＿＿.',
            options: ['凍えて', '冷やして', '回復して', '継いで'],
            answer: 0,
            why: '凍える = a person’s body freezing / going numb. 冷やす is to cool something on purpose.',
          },
          keys: ['v:kogoeru'], area: 'vocab', retry: true,
        },
        say('fujii', '完璧！ あなた、漢字の読みが本当に正確ね。', 'Perfect! Your kanji readings are really accurate.', 'happy'),
        say('fujii', 'でも、おかしいの。消えるのは字だけじゃない。患者さんの「名前」も、少しずつ思い出しにくくなっているみたい。', 'But it’s strange. It isn’t only characters. Patients are finding it harder and harder to remember names, too.', 'worried'),
        say('fujii', 'そうだ、黒田さんが雪灯籠まつりの準備で人手を探していたわ。お祭りの夜には、毎年あの「旅の人」も来るのよ。', 'Oh, Mr. Kuroda was looking for help preparing the snow-lantern festival. On festival night, that “traveller” comes every year, too.'),
        { do: [{ objective: 'mq11.fujii' }, { rel: 'fujii', points: 2 }, { learn: ['v:shoujou', 'v:shohou', 'v:kogoeru', 'v:shinryoujo', 'v:taichou', 'g:seika'] }] },
      ],
    },
    {
      when: { questDone: 'mq11' },
      steps: [
        say('fujii', 'こんにちは。今日も受付、お願いできる？ 薬の字がまた薄くなっていて……。', 'Hello. Could you help at reception again today? The writing on the medicine is fading again…'),
        {
          choice: [
            { text: 'バイトする', en: 'Work: clinic reception (kanji & health words, pays ¥220 per correct answer)', then: [{ do: [{ open: 'job:clinic' }] }] },
            { text: 'またこんど', en: 'Maybe later' },
          ],
        },
      ],
    },
    { steps: [say('fujii', 'こんにちは。村の医者の藤井です。寒い日は、体調を崩しやすいから気をつけてね。', 'Hello, I’m Fujii, the village doctor. People fall ill easily on cold days, so take care.')] },
  ],
  kuroda: [
    {
      when: { all: [{ questActive: 'mq12' }, { notObj: 'mq12.kuroda' }] },
      steps: [
        say('kuroda', 'おう、手伝ってくれるのか。雪灯籠まつりは、この村に三百年続く{伝統|でんとう|v:dentou}の{行事|ぎょうじ|v:gyouji}だ。', 'Oh, you’ll help? The snow-lantern festival is a tradition this village has kept for three hundred years.'),
        say('kuroda', '昔は、冬の間に亡くなった人の名前を一つずつ{灯籠|とうろう|v:tourou}に書いた。名前を忘れる{ことなく||g:kotonaku}、春を迎えるためにな。', 'Long ago, people wrote the name of everyone who died over the winter on a lantern — so they could greet spring without forgetting a single name.'),
        { teach: 'g:kotonaku' },
        {
          quiz: {
            q: '「名前を忘れることなく、春を迎える」の意味に一番近いものはどれか。',
            qEn: 'Which is closest to 名前を忘れることなく、春を迎える?',
            options: ['名前を忘れないで、春を迎える', '名前を忘れてから、春を迎える', '名前を忘れないと、春が来ない', '名前を忘れるために、春を迎える'],
            answer: 0,
            why: 'ことなく = without doing: they greet spring without forgetting the names.',
          },
          keys: ['g:kotonaku'], area: 'grammar', retry: true,
        },
        n('あなたは黒田さんと一緒に、川沿いに雪灯籠を並べた。', 'Together with Mr. Kuroda, you line the river with snow lanterns.'),
        say('kuroda', '俺は一度村を出て、都会で働いていた。でも親父が倒れて、山の案内の仕事を{継|つ|v:tsugu}いだんだ。', 'I left the village once and worked in the city. But when my father collapsed, I took over his work as a mountain guide.'),
        say('kuroda', '一度は捨てた村な{だけに||g:dakeni}、この祭りだけは絶対になくしたくないんだ。', 'Precisely because I once turned my back on this village, I never want to lose this festival.'),
        { teach: 'g:dakeni' },
        say('kuroda', '日が暮れたら、駅の近くの広場に来てくれ。灯籠に火を入れるぞ。', 'When the sun goes down, come to the field near the station. We’ll light the lanterns.', 'happy'),
        { do: [{ objective: 'mq12.kuroda' }, { note: 'matsuri' }, { time: 'evening' }, { rel: 'kuroda', points: 2 }, { learn: ['v:dentou', 'v:gyouji', 'v:tourou', 'v:tsugu', 'g:kotonaku', 'g:dakeni'] }] },
      ],
    },
    { steps: [say('kuroda', 'この先は山道だ。今は雪が深すぎて、{雪崩|なだれ|v:nadare}の危険がある。{通行止|つうこうど}めにしている。', 'Beyond here is the mountain trail. The snow is too deep and there’s a risk of avalanches, so it’s closed.')] },
  ],
  yukimi_festival: [
    {
      when: { all: [{ questActive: 'mq12' }, { obj: 'mq12.kuroda' }, { notObj: 'mq12.festival' }] },
      steps: [
        { do: [{ music: 'festival' }] },
        { cg: 'cg_mountain_festival', say: '日が暮れると、何百もの雪灯籠に、いっせいに火がともった。川の水が、金色に光っている。', en: 'As night falls, hundreds of snow lanterns are lit at once. The river shines gold.' },
        { cg: 'cg_mountain_festival', say: '橋の上に、帳面を抱えた女の人が立っていた。深い緑のコートに、白いマフラー。', en: 'On the bridge stands a woman holding a notebook. A deep green coat, a white scarf.' },
        {
          choice: [
            { text: '「待ってください！」', en: '“Please wait!”' },
            { text: '「あなたが、Kさんですか？」', en: '“Are you… K?”' },
          ],
        },
        { cg: 'cg_mountain_festival', say: '女の人は少しだけ振り向いて、悲しそうにほほえんだ。そして、灯籠の光の中に消えていった。', en: 'She turns back for a moment and smiles sadly. Then she vanishes into the lantern light.' },
        n('橋の上に、赤い封をされた手紙が落ちている。', 'A letter sealed in red lies on the bridge.'),
        n('そのとき、灯籠の火がゆらりと集まって、言霊の姿になった！', 'Then the lantern flames gather and sway, taking the shape of a Kotodama!'),
        {
          battle: { species: 'tomoshibi', level: 14, recruitable: true, bg: 'bg_mountain_temple.webp' },
          win: [
            n('トモシビは、手紙の封をじっと照らしている。封には、見たことのない形の漢字が一字、押されている。', 'Tomoshibi keeps shining on the seal. A single kanji you have never seen is pressed into it.'),
            n('この字が読めないと、封は開かないらしい……。山寺の和尚さんなら、わかるかもしれない。', 'It seems the seal won’t open unless you can read that kanji… The priest at the mountain temple might know.'),
            { do: [{ give: 'sealed_letter' }, { objective: 'mq12.festival' }, { seen: 'tomoshibi' }, { learn: ['v:tourou'] }] },
          ],
          lose: [n('灯籠の光にまぎれて、見失ってしまった……。もう一度来よう。', 'You lose sight of it among the lantern lights… Try again.')],
        },
      ],
    },
    { steps: [n('お祭りの広場。雪で作った灯籠が並んでいる。', 'The festival field. Lanterns made of snow stand in rows.')] },
  ],
  jokan: [
    {
      when: { all: [{ questActive: 'mq13' }, { notObj: 'mq13.jokan' }] },
      steps: [
        say('jokan', 'ほう……その封は。あの方の手紙ですな。', 'Oh… that seal. It is her letter.', 'surprised'),
        say('jokan', 'あの方は毎年冬に来ては、村の言葉を帳面に書き留めていかれる。だが、ご自分のお名前は、もう思い出せないとおっしゃっていた。', 'Every winter she comes and writes the village’s words in her notebook. But she said she can no longer remember her own name.', 'worried'),
        say('jokan', '漢字に{限らず||g:nikagirazu}、言葉というものは、使わなければ消えてしまう。', 'Not only kanji — any word disappears if it is not used.'),
        { teach: 'g:nikagirazu' },
        say('jokan', 'この封は、字の心を知る者にしか開けられん。……あなたにその力があるか、試させていただこう。準備ができたら、声をかけなさい。', 'This seal opens only for one who knows the heart of characters. …Let me test whether you have that strength. Speak to me when you are ready.'),
        { do: [{ objective: 'mq13.jokan' }, { rel: 'jokan', points: 1 }, { learn: ['g:nikagirazu', 'v:kakitomeru'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq13' }, { obj: 'mq13.jokan' }, { notObj: 'mq13.master' }] },
      steps: [
        say('jokan', '一つ目。字の{部首|ぶしゅ|v:bushu}を見なさい。', 'First. Look at the radical of each character.'),
        {
          quiz: {
            q: '「休む」「体」「住む」に共通する部首はどれか。',
            qEn: 'Which radical do 休, 体 and 住 share?',
            options: ['にんべん（亻）', 'さんずい（氵）', 'きへん（木）', 'ごんべん（言）'],
            answer: 0,
            why: '休・体・住 all have the person radical 亻 (にんべん) on the left.',
          },
          keys: ['v:bushu'], area: 'kanji', retry: true,
        },
        say('jokan', '二つ目。言葉の組み立てだ。', 'Second. How words are built.'),
        {
          quiz: {
            q: '「雪」と組み合わせて、「雪がとけること」を表す言葉はどれか。',
            qEn: 'Which word built with 雪 means “snow melting”?',
            options: ['雪解け', '雪崩', '積雪', '吹雪'],
            answer: 0,
            why: '雪解け（ゆきどけ）= thaw. 雪崩 = avalanche, 積雪 = snow cover, 吹雪 = snowstorm.',
          },
          keys: ['v:yukidoke'], area: 'vocab', retry: true,
        },
        say('jokan', '三つ目。読みを見分けなさい。', 'Third. Tell the readings apart.'),
        {
          quiz: {
            q: '「行事」の「行」と同じ読み方をするものはどれか。',
            qEn: 'Which word reads 行 the same way as in 行事 (ぎょうじ)?',
            options: ['行列', '銀行', '旅行', '行動'],
            answer: 0,
            why: '行事・行列 read 行 as ぎょう. 銀行・旅行・行動 use こう.',
          },
          keys: ['v:gyouji'], area: 'kanji', retry: true,
        },
        say('jokan', 'ふむ。字の心は、確かにわかっておられる。最後に、この寺の灯明を守る言霊と向き合いなさい。', 'Hm. You truly understand the heart of characters. Lastly, face the Kotodama that guards this temple’s light.'),
        {
          battle: { species: 'toumyou', level: 20, boss: true, bg: 'bg_mountain_temple.webp' },
          win: [
            say('jokan', '見事。字は、書く人と読む人がいて、初めて命を持つ。あなたは、よい読み手だ。', 'Splendid. Characters only come alive when there is someone to write them and someone to read them. You are a good reader.', 'happy'),
            say('jokan', 'この印をお持ちなさい。……さあ、封を開けてみるとよい。', 'Take this seal. …Now, try opening the letter.'),
            n('和尚の印を押すと、赤い封がほどけた。中の字が、うっすらと光っている。', 'When you press the priest’s seal to it, the red seal comes undone. The characters inside glow faintly.'),
            say('jokan', 'わしが読むより、つるさんの囲炉裏で読むのがよかろう。あの方の手紙は、いつもつるさんの家に置いていかれたのだから。', 'Better to read it by Tsuru’s hearth than with me. Her letters were always left at Tsuru’s house.'),
            { do: [{ objective: 'mq13.master' }, { give: 'kanji_stamp' }, { rel: 'jokan', points: 3, memory: 'trial_passed' }, { learn: ['v:bushu', 'v:yukidoke', 'v:kakusuu', 'v:gyouji'] }] },
          ],
          lose: [say('jokan', 'まだ字の声が聞こえておらんようだ。修行して、また来なさい。', 'You cannot hear the voice of the characters yet. Train, and come back.')],
        },
      ],
    },
    {
      when: { questDone: 'mq13' },
      steps: [say('jokan', '字は、書く人と読む人がいて、初めて命を持つ。忘れなさるな。', 'Characters come alive only with a writer and a reader. Do not forget.', 'happy')],
    },
    { steps: [say('jokan', 'ほう、旅の方か。漢字というものは、一つ一つが小さな物語なのですよ。', 'Oh, a traveller. Each kanji, you know, is a little story of its own.')] },
  ],
  valley_garden: [
    {
      when: { questDone: 'mq7' },
      steps: [
        n('林さんが貸してくれた畑。覚えた言葉が、ここで育っている。', 'The plot Mr. Hayashi lent you. The words you’ve learned are growing here.'),
        { do: [{ open: 'garden' }] },
      ],
    },
    { steps: [n('{手入れ|ていれ|v:teire}の行き届いた小さな畑だ。木の札には何も書かれていない。', 'A small, well-kept plot. The wooden tag is blank.')] },
  ],
  valley_farmhouse: [{ steps: [n('{茅葺|かやぶ}き{屋根|やね}の古い{農家|のうか}。{縁側|えんがわ}で{猫|ねこ}が{昼寝|ひるね}をしている。', 'An old farmhouse with a thatched roof. A cat is napping on the veranda.'), { do: [{ note: 'farm_successor' }] }] }],
  valley_winery: [{ steps: [n('小さなワイナリー。{樽|たる}から、ぶどうの{香|かお}りがする。', 'A small winery. The barrels smell of grapes.')] }],
  valley_stand: [{ steps: [n('{無人販売所|むじんはんばいじょ}だ。「桃 一{袋|ふくろ} 三百円。お金は{箱|はこ}に入れてください」', 'An unmanned stand: “Peaches, 300 yen a bag. Please put the money in the box.”')] }],
  valley_workshop: [{ steps: [n('{書道|しょどう}の{工房|こうぼう}。{入口|いりぐち}に、大きな{掛け軸|かけじく}がかかっている。', 'A calligraphy workshop. A large hanging scroll hangs by the entrance.')] }],
  valley_ryokan: [{ steps: [n('{温泉旅館|おんせんりょかん}「ゆのか」。のれんの{奥|おく}から、湯けむりが{立|た}ちのぼっている。', 'The hot-spring inn “Yunoka”. Steam rises from behind the noren curtain.')] }],
  hayashi: [
    {
      when: { all: [{ questActive: 'mq7' }, { notObj: 'mq7.hayashi' }] },
      steps: [
        say('hayashi', 'おう、見ない顔だな。町から来たのか？ 悪いが、今は話してる{暇|ひま}がない。', 'Oh, a new face. From town? Sorry, no time to chat right now.'),
        say('hayashi', '桃ってのはな、{熟した|じゅくした|v:jukusu}{とたん||g:tatotan}、あっという間に落ちちまうんだ。今日のうちにとらないと、売り物にならねえ。', 'Peaches fall the moment they ripen. If I don’t pick them today, they can’t be sold.'),
        { teach: 'g:tatotan' },
        say('hayashi', '若いのはみんな町へ出ていっちまって、谷はずっと{人手不足|ひとでぶそく|v:hitodebusoku}だ。……ん？ 手伝ってくれるのか？', 'All the young people left for the city; the valley has been short of hands for years. …Hm? You’ll help?', 'surprised'),
        {
          quiz: {
            q: '林さんが急いでいるのはなぜか。',
            qEn: 'Why is Mr. Hayashi in a hurry?',
            options: ['桃は熟すとすぐに落ちてしまうから', '桃がまだ全然熟していないから', '町へ出かける約束があるから', '手伝ってくれる人が多すぎるから'],
            answer: 0,
            why: 'たとたん = right at the moment: as soon as peaches ripen, they fall.',
          },
          keys: ['g:tatotan'], area: 'grammar', retry: true,
        },
        { do: [{ objective: 'mq7.hayashi' }, { rel: 'hayashi', points: 1 }, { learn: ['v:jukusu', 'v:hitodebusoku', 'g:tatotan'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq7' }, { notObj: 'mq7.harvest' }] },
      steps: [
        say('hayashi', 'よし、まずは{収穫|しゅうかく|v:shuukaku}だ。熟した実だけを、そっとひねってとるんだぞ。', 'Right, the harvest first. Only the ripe ones — twist them off gently.'),
        n('あなたは林さんと一緒に、{果樹園|かじゅえん|v:kajuen}で桃をとった。', 'You pick peaches with Mr. Hayashi in the orchard.'),
        say('hayashi', 'とった桃は、明日の朝{出荷|しゅっか|v:shukka}する。箱に「{品種|ひんしゅ|v:hinshu}」を書いてくれ。', 'We ship them tomorrow morning. Write the variety on the boxes.'),
        {
          quiz: {
            q: '箱に「白桃」「黄金桃」と書いた。これは桃の何か。',
            qEn: 'You wrote “white peach” and “golden peach” on the boxes. What are these?',
            options: ['品種', '収穫', '出荷', '果樹園'],
            answer: 0,
            why: '品種 = variety/breed. 収穫 = harvest, 出荷 = shipping, 果樹園 = orchard.',
          },
          keys: ['v:hinshu'], area: 'vocab', retry: true,
        },
        {
          quiz: {
            q: '「朝とった桃は、その日のうちに＿＿される。」',
            qEn: 'Peaches picked in the morning are ＿＿ the same day.',
            options: ['出荷', '収穫', '栽培', '品種'],
            answer: 0,
            why: '出荷 = sending produce to market. They were already picked (収穫) in the morning.',
          },
          keys: ['v:shukka'], area: 'vocab', retry: true,
        },
        say('hayashi', 'この黄色いのは、わしが{名付けた|なづけた|v:nazukeru}品種でな。名前は……ええと……。', 'This yellow one is a variety I named myself. It’s called… um…', 'worried'),
        say('hayashi', '……出てこねえ。何十年も育ててきたのに。……まあいい、今日はご苦労さん。', '…It won’t come. I’ve grown it for decades… Never mind. Thanks for today.', 'worried'),
        { do: [{ objective: 'mq7.harvest' }, { give: 'peach', n: 2 }, { money: 800 }, { rel: 'hayashi', points: 2 }, { learn: ['v:shuukaku', 'v:kajuen', 'v:shukka', 'v:hinshu', 'v:nazukeru'] }] },
        n('林さんの孫のさくらが、北東の桃畑にいるらしい。', 'Mr. Hayashi’s granddaughter Sakura seems to be in the peach grove to the north-east.'),
      ],
    },
    {
      when: { all: [{ questActive: 'mq7' }, { notObj: 'mq7.sakura' }] },
      steps: [say('hayashi', 'さくらなら、北東の桃畑だ。草が深いから、気をつけてな。', 'Sakura’s in the peach grove to the north-east. The grass is deep, so be careful.')],
    },
    {
      when: { questDone: 'mq7' },
      steps: [
        say('hayashi', 'おう、来たか。今日も桃の選別、手伝ってくれるか？', 'Ah, you came. Will you help sort peaches again today?'),
        {
          choice: [
            { text: 'バイトする', en: 'Work: peach sorting (vocabulary, pays ¥150 per correct answer)', then: [{ do: [{ open: 'job:orchard' }] }] },
            { text: '話す', en: 'Chat', then: [say('hayashi', '「ひのもり{金|きん}」……。いい名前だろ？ もう忘れねえよ。さくらのおかげだ。', '“Hinomori Gold”… A good name, isn’t it? I won’t forget it again. Thanks to Sakura.', 'happy')] },
            { text: 'またこんど', en: 'Maybe later' },
          ],
        },
      ],
    },
    {
      when: { flag: 'mq7_peach_named' },
      steps: [say('hayashi', '「ひのもり{金|きん}」……。いい名前だろ？ もう忘れねえよ。さくらのおかげだ。', '“Hinomori Gold”… A good name, isn’t it? I won’t forget it again. Thanks to Sakura.', 'happy')],
    },
    { steps: [say('hayashi', '谷は桃とぶどうと温泉しかないが、いいところだぞ。', 'This valley has nothing but peaches, grapes and hot springs, but it’s a good place.')] },
  ],
  sakura_hayashi: [
    {
      when: { all: [{ questActive: 'mq7' }, { obj: 'mq7.harvest' }, { notObj: 'mq7.sakura' }] },
      steps: [
        say('sakura_hayashi', 'あなたが、おじいちゃんを手伝ってくれた人？ ありがとう！ わたし、さくら。', 'Are you the one who helped Grandpa? Thank you! I’m Sakura.', 'happy'),
        say('sakura_hayashi', '……おじいちゃん、最近、桃の名前を忘れる{たびに||g:tabini}、すごくさびしそうな顔をするの。', '…Lately, every time Grandpa forgets a peach’s name, he looks so lonely.', 'worried'),
        { teach: 'g:tabini' },
        say('sakura_hayashi', 'それに、名前を忘れられた木は、だんだん元気がなくなっていくみたい。……あっ！', 'And the trees whose names are forgotten seem to lose their strength… Oh!', 'surprised'),
        n('桃の木の根元から、小さな言霊が転がり出てきた！', 'A small Kotodama tumbles out from the roots of a peach tree!'),
        {
          battle: { species: 'momotan', level: 7, recruitable: true, bg: 'bg_valley_orchard.webp' },
          win: [
            say('sakura_hayashi', 'この子、モモタン！ おじいちゃんの黄色い桃から生まれたんだ。……そうだ、思い出した！ あの桃の名前は「ひのもり金」！', 'It’s a Momotan! Born from Grandpa’s yellow peaches… That’s it, I remember! That peach is called “Hinomori Gold”!', 'happy'),
            say('sakura_hayashi', '名前を呼んであげたら、木がまた元気になった気がする。おじいちゃんに教えてくるね！', 'When I called its name, the tree seemed to perk up again. I’ll go tell Grandpa!', 'happy'),
            { do: [{ objective: 'mq7.sakura' }, { flag: 'mq7_peach_named' }, { rel: 'sakura_hayashi', points: 2 }, { seen: 'momotan' }, { learn: ['g:tabini'] }] },
            say('sakura_hayashi', 'そうだ、おじいちゃんがね、家の横の畑をあなたに貸すって。覚えた言葉を植えて、毎日{水|みず}をあげてね！', 'Oh, and Grandpa says you can use the plot next to the house. Plant the words you learn and water them every day!', 'happy'),
            n('言葉の庭が使えるようになった！ 覚えた言葉が植物になって育つ。（アパートの机からも見られる）', 'The word garden is open! The words you learn grow as plants. (You can also open it from the desk in your apartment.)'),
                        n('名前を呼ぶと、言葉は戻ってくる……？ 旅館の女将さんにも、話を聞いてみよう。', 'Calling a name brings the words back…? Let’s talk to the proprietress of the inn, too.'),
          ],
          lose: [say('sakura_hayashi', '大丈夫？ 少し休んでから、また来てね。', 'Are you okay? Rest a bit and come back.', 'worried')],
        },
      ],
    },
    { steps: [say('sakura_hayashi', '桃畑の奥は草が深いから、言霊がよく出るよ。気をつけてね！', 'The grass is deep at the back of the peach grove, so Kotodama show up a lot. Be careful!')] },
  ],
  okami: [
    {
      when: { all: [{ questActive: 'mq8' }, { notObj: 'mq8.okami' }] },
      steps: [
        say('okami', 'ようこそお越しくださいました。温泉{旅館|りょかん|v:ryokan}「ゆのか」の女将でございます。', 'Welcome. I am the proprietress of the hot-spring inn “Yunoka”.'),
        say('okami', 'この宿は、亡くなった主人と二人で始めました。ここまで続けてこられたのは、お客様の{おかげ||g:okagede}です。', 'My late husband and I started this inn together. We’ve come this far thanks to our guests.'),
        { teach: 'g:okagede' },
        say('okami', '……ですが最近、常連のお客様まで、宿の名前を思い出せないとおっしゃるのです。', '…But lately even our regulars say they can’t remember the inn’s name.', 'worried'),
        say('okami', 'よろしければ、広場の{足湯|あしゆ}でひと休みなさってください。お話は、そちらで。', 'If you like, please rest at the footbath on the square. We can talk there.'),
        { do: [{ objective: 'mq8.okami' }, { rel: 'okami', points: 1 }, { learn: ['v:ryokan', 'v:motenashi', 'g:okagede'] }] },
      ],
    },
    {
      when: { questDone: 'mq8' },
      steps: [
        say('okami', 'いらっしゃいませ。今日も、フロントを手伝っていただけますか？', 'Welcome. Could you help at the front desk again today?'),
        {
          choice: [
            { text: 'バイトする', en: 'Work: inn front desk (listening, pays ¥200 per correct answer)', then: [{ do: [{ open: 'job:onsen' }] }] },
            {
              text: '泊まる（¥800）', en: 'Stay the night (¥800: heals your team, starts a new day)',
              then: [
                {
                  if: { money: 800 },
                  then: [
                    { do: [{ money: -800 }, { sleep: true }] },
                    n('温泉につかって、ふかふかの{布団|ふとん}でぐっすり眠った。言霊たちも元気になった！', 'You soak in the hot spring and sleep soundly on a soft futon. Your Kotodama are fully healed!'),
                  ],
                  else: [say('okami', 'あいにく、お{代|だい}が少し足りないようでございます。', 'I’m afraid that isn’t quite enough, I’m sorry.', 'worried')],
                },
              ],
            },
            { text: 'またこんど', en: 'Maybe later' },
          ],
        },
      ],
    },
    { steps: [say('okami', '温泉には、いつでもどうぞ。{湯加減|ゆかげん|v:yukagen}はちょうどいいですよ。', 'Please use the hot spring any time. The water is just right.')] },
  ],
  valley_ashiyu: [
    {
      when: { all: [{ questActive: 'mq8' }, { obj: 'mq8.okami' }, { notObj: 'mq8.onsen' }] },
      steps: [
        { do: [{ music: 'onsen' }] },
        { cg: 'cg_valley_onsen', say: '足をお湯に{浸|つ}けると、体の{芯|しん}まで温かくなった。白い{湯気|ゆげ}が、夕空にとけていく。', en: 'As you soak your feet, warmth spreads through your whole body. White steam melts into the evening sky.' },
        { do: [{ music: 'memory' }] },
        say('okami', '主人は、とても声のやさしい人でした。でも最近、その声が思い出せないのです。', 'My husband had a very gentle voice. But lately I can’t remember it.', 'worried'),
        say('okami', '忘れるのがこわい{あまり||g:amari}、毎晩、主人との思い出を日記に書いています。', 'I’m so afraid of forgetting that I write my memories of him in a diary every night.', 'worried'),
        { teach: 'g:amari' },
        {
          quiz: {
            q: '女将さんが毎晩日記を書いているのはなぜか。',
            qEn: 'Why does Okami-san write in her diary every night?',
            options: ['忘れることがとてもこわいから', '日記を書くのが仕事だから', '主人に頼まれたから', '声を出す練習をしているから'],
            answer: 0,
            why: 'こわいあまり = because she is so (excessively) afraid — strong emotion leading to the action.',
          },
          keys: ['g:amari'], area: 'grammar', retry: true,
        },
        n('そのとき、湯気が{渦|うず}を巻いて、小さな言霊の形になった！', 'Just then, the steam swirls and takes the shape of a small Kotodama!'),
        {
          battle: { species: 'yukemuri', level: 8, recruitable: true, bg: 'bg_valley_onsen.webp' },
          win: [
            say('okami', '「ああ、いい湯だ」……。主人の口ぐせでした。今、その声が、はっきり聞こえた気がします。', '“Ah, what a nice bath”… That was my husband’s favourite phrase. Just now I feel I heard his voice clearly.', 'happy'),
            say('okami', '名前や言葉を書いて残す……。それなら、書道の太田先生をお訪ねなさい。広場の西の工房です。', 'Writing names and words down to keep them… Then you should visit Mr. Ōta, the calligrapher. His workshop is west of the square.'),
            { do: [{ objective: 'mq8.onsen' }, { rel: 'okami', points: 2, memory: 'husband_voice' }, { seen: 'yukemuri' }, { heal: true }, { learn: ['v:yuge', 'v:tsukaru', 'g:amari'] }] },
          ],
          lose: [n('湯気に包まれて、何も見えなくなった……。少し休んで、また来よう。', 'The steam wraps around you and you can’t see a thing… Rest and try again.')],
        },
      ],
    },
    { steps: [n('{足湯|あしゆ}だ。足を浸けると、疲れがとれる。', 'A footbath. Soaking your feet takes the tiredness away.'), { do: [{ heal: true }] }, n('言霊たちも元気になった！', 'Your Kotodama feel refreshed!')] },
  ],
  kenji: [
    {
      when: { questDone: 'mq7' },
      steps: [
        say('kenji', 'やあ、林さんのところを手伝ったんだって？ うちも{人手不足|ひとでぶそく|v:hitodebusoku}でね。ラベルのチェック、頼めないかな。', 'Hey, I heard you helped out at Mr. Hayashi’s? We’re short-handed too. Could you check our labels?'),
        {
          choice: [
            { text: 'バイトする', en: 'Work: wine labels (kanji readings, pays ¥180 per correct answer)', then: [{ do: [{ open: 'job:winery' }] }] },
            { text: 'またこんど', en: 'Maybe later' },
          ],
        },
      ],
    },
    { steps: [say('kenji', '今年のぶどうは{出来|でき}がいいんだ。ワインの{醸造|じょうぞう|v:jouzou}は、{樽|たる|v:taru}の中で、ゆっくり時間をかけて進むんだよ。', 'This year’s grapes are good. Wine-making takes its time, slowly, inside the barrels.')] },
  ],
  ota: [
    {
      when: { all: [{ questActive: 'mq9' }, { notObj: 'mq9.ota' }] },
      steps: [
        say('ota', '……何の用だ。弟子なら取らんぞ。', '…What do you want? I don’t take students.'),
        n('あなたは、森さんのこと、町で消えていく言葉のこと、そして「K」の手紙のことを話した。', 'You tell him about Ms. Mori, the words vanishing in town, and the letter signed “K”.'),
        { do: [{ music: 'memory' }] },
        say('ota', 'Kか……。霧島くんから聞いたのだな。', 'K… So you heard it from Kirishima.', 'surprised'),
        say('ota', 'あの人は、言葉を失っていく人たちを救おうとした。そして、自分の言葉を失った。……わしは、止められなかった。', 'That person tried to save people who were losing their words — and lost their own words instead. …I couldn’t stop it.', 'worried'),
        say('ota', 'ここまで来た{からには||g:karaniwa}、覚悟はできているのだろうな。入りなさい。', 'Now that you’ve come this far, I trust you’re prepared. Come in.'),
        { teach: 'g:karaniwa' },
        { do: [{ objective: 'mq9.ota' }, { rel: 'ota', points: 1 }, { learn: ['g:karaniwa'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq9' }, { notObj: 'mq9.calligraphy' }] },
      steps: [
        { cg: 'cg_valley_calligraphy', say: '工房の中は、{墨|すみ|v:sumi}の香りがした。太田先生は、一本の{筆|ふで|v:fude}を差し出した。', en: 'The workshop smells of ink. Mr. Ōta holds out a brush.' },
        { cg: 'cg_valley_calligraphy', say: '「忘れたくない人の名前を、一つ書きなさい。上手でなくていい。心をこめて書くことだ」', en: '“Write the name of someone you don’t want to forget. It needn’t be beautiful. What matters is that you put your heart into it.”' },
        {
          choice: [
            { text: '「森」と書く', en: 'Write “Mori” (森)' },
            { text: '「森」と、ていねいにもう一度書く', en: 'Write “Mori” again, more carefully' },
          ],
        },
        say('ota', '……いい字だ。名前というのは、呼ばれるたびに強くなる。書かれれば、もっと強くなる。', '…Good. A name grows stronger every time it is called. Written down, it grows stronger still.', 'happy'),
        {
          quiz: {
            q: '「書道」の「道」と同じ読み方をするものはどれか。',
            qEn: 'Which word reads 道 the same way as in 書道 (しょどう)?',
            options: ['柔道', '近道', '坂道', '道端'],
            answer: 0,
            why: '書道・柔道 read 道 as どう. 近道（ちかみち）・坂道（さかみち）・道端（みちばた）use the kun reading みち.',
          },
          keys: ['v:shodou'], area: 'kanji', retry: true,
        },
        say('ota', 'その書は、森さんに持っていくといい。だが、その前に……。', 'Take that scroll to Ms. Mori. But first…'),
        say('ota', 'わしは、この谷の言葉を守る者だ。言葉を守る力があるかどうか、試させてもらう。準備ができたら、声をかけなさい。', 'I am the guardian of this valley’s words. Let me test whether you have the strength to protect words. Speak to me when you’re ready.'),
        { do: [{ objective: 'mq9.calligraphy' }, { give: 'name_scroll' }, { rel: 'ota', points: 2, memory: 'name_written' }, { learn: ['v:shodou', 'v:fude', 'v:sumi'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq9' }, { notObj: 'mq9.master' }] },
      steps: [
        say('ota', '試験は二つ。まずは言葉の意味だ。', 'The trial has two parts. First, the meaning of words.'),
        {
          quiz: {
            q: '「若い人が減り、村は＿＿に悩んでいる。」',
            qEn: 'Young people are leaving, and the village is troubled by ＿＿.',
            options: ['人手不足', '品種', '手入れ', '名残'],
            answer: 0,
            why: '人手不足 = shortage of workers, which follows from young people leaving.',
          },
          keys: ['v:hitodebusoku'], area: 'vocab', retry: true,
        },
        {
          quiz: {
            q: '「毎日の努力が＿＿、試験に合格した。」',
            qEn: 'My daily effort ＿＿ and I passed the exam.',
            options: ['実って', '熟して', '浸かって', '名付けて'],
            answer: 0,
            why: '実る is also used figuratively: effort “bears fruit”. 熟す is only literal ripening.',
          },
          keys: ['v:minoru'], area: 'vocab', retry: true,
        },
        {
          quiz: {
            q: '「もてなし」の使い方として、正しいものはどれか。',
            qEn: 'Which sentence uses もてなし correctly?',
            options: ['この旅館は、心のこもったもてなしで有名だ。', '桃をもてなしてから、箱に入れた。', '駅でバスをもてなしている。', '筆でもてなしを書いた。'],
            answer: 0,
            why: 'もてなし = hospitality towards guests.',
          },
          keys: ['v:motenashi'], area: 'vocab', retry: true,
        },
        say('ota', 'ふむ。では最後だ。わしの言霊と向き合ってみなさい。', 'Hm. Then the last part. Face my Kotodama.'),
        {
          battle: { species: 'tougenkyo', level: 13, boss: true, bg: 'bg_valley_river.webp' },
          win: [
            say('ota', '……見事だ。お前の言葉には、人を思う力がある。', '…Splendid. Your words carry the strength of caring for others.', 'happy'),
            say('ota', 'この筆を持っていきなさい。谷の試験に通った{証|あかし}だ。', 'Take this brush. It is proof that you passed the valley’s trial.'),
            say('ota', 'Kは、北の山の村へ向かったと聞いた。……あの人に会ったら、伝えてくれ。「太田は、まだ待っている」と。', 'I heard K went north, to a mountain village. …If you meet them, tell them: “Ōta is still waiting.”', 'worried'),
            { do: [{ objective: 'mq9.master' }, { give: 'ota_fude' }, { rel: 'ota', points: 3, memory: 'trial_passed' }, { learn: ['v:minoru', 'v:motenashi', 'v:nagori'] }] },
            n('名前の書を、森さんに届けよう。（バス停から町へ帰れる）', 'Bring the name scroll to Ms. Mori. (You can ride back to town from the bus stop.)'),
          ],
          lose: [say('ota', 'まだ早かったようだな。言葉をもっと育ててから、また来なさい。', 'Too early, it seems. Grow your words further and come back.')],
        },
      ],
    },
    {
      when: { questDone: 'mq9' },
      steps: [say('ota', '名前は、呼ばれるたびに強くなる。忘れるなよ。', 'A name grows stronger every time it is called. Don’t forget.')],
    },
    { steps: [say('ota', '……言葉は、書いて初めて形になる。', '…Words only take shape once you write them.')] },
  ],
  busdriver: [{ steps: [say('busdriver', '町行きのバスは、そこのバス停から出ますよ。', 'The bus to town leaves from that stop over there.')] }],
  konbini_fridge: [
    {
      steps: [
        n('冷蔵庫に飲み物がずらりと並んでいる。「日野森緑茶」の棚だけ、空っぽだ。', 'Drinks line the fridges. Only the “Hinomori Green Tea” shelf is empty.'),
        n('値札：「{品切れ|しなぎれ|v:shinagire}中。お{取り寄せ|とりよせ|v:toriyoseru}できます」', 'Price tag: “Out of stock. Can be ordered in.”'),
        { do: [{ learn: ['v:shinagire', 'v:toriyoseru'] }] },
      ],
    },
  ],
  konbini_shelf: [
    {
      steps: [
        n('お菓子やパンが並んでいる。{賞味期限|しょうみきげん|v:shoumikigen}が近いパンには、割引シールが{貼|は}ってある。', 'Snacks and bread. Bread near its best-before date has discount stickers.'),
        { do: [{ learn: ['v:shoumikigen'] }] },
      ],
    },
  ],
  konbini_bento: [{ steps: [n('お弁当とおにぎりの{棚|たな}だ。「{温め|あたため}ますか？」とよく聞かれる。', 'Bento boxes and onigiri. Clerks often ask: “Shall I heat it up?”')] }],
  konbini_coffee: [{ steps: [n('セルフのコーヒーマシンだ。レジでカップを買ってから、自分で{入れる|いれる}{仕組み|しくみ}になっている。', 'A self-service coffee machine: you buy a cup at the register and pour it yourself.')] }],
  konbini_ice: [{ steps: [n('アイスの{冷凍|れいとう}ケースだ。{期間限定|きかんげんてい}の{抹茶|まっちゃ}味がある。', 'An ice-cream freezer. There’s a limited-time matcha flavour.')] }],
  konbini_magazines: [{ steps: [n('雑誌の{棚|たな}だ。「{立ち読み|たちよみ}はご{遠慮|えんりょ}ください」と書いてある。', 'A magazine rack. A sign says “Please refrain from reading without buying.”')] }],
  konbini_atm: [{ steps: [n('ATMだ。{手数料|てすうりょう}がかかるので、{必要|ひつよう}な時だけ使おう。', 'An ATM. It charges a fee, so only use it when you need to.'), { do: [{ note: 'cash' }] }] }],
  konbini_trash: [{ steps: [n('ゴミ箱が三つ{並んで|ならんで}いる。ペットボトル、{燃える|もえる}ゴミ、{缶|かん}・びん。{分別|ぶんべつ}してから{捨てよう|すてよう}。', 'Three bins: PET bottles, burnable, cans/bottles. Sort before you throw away.'), { do: [{ note: 'bunbetsu' }] }] }],
  konbini_baskets: [{ steps: [n('買い物かごだ。{使い終わったら|つかいおわったら}元の{場所|ばしょ}に{戻す|もどす}こと。', 'Shopping baskets. Put them back where they belong after use.')] }],
  konbini_counter: [{ steps: [n('レジの横に、肉まんとおでんのケースがある。いいにおいだ。', 'Next to the register are cases of steamed buns and oden. Smells good.'), { do: [{ note: 'konbini' }] }] }],
  library_shelf: [
    {
      steps: [
        n('本棚には、町の歴史の本がたくさんある。『日野森の言葉と{記憶|きおく|v:kioku}』という古い本が目に入った。', 'Many books on local history. An old book catches your eye: “Words and Memory of Hinomori”.'),
        n('最後のページに、手書きで「K」というサインがある……。', 'On the last page is a handwritten signature: “K”…'),
        { do: [{ learn: ['v:kioku'] }, { flag: 'library_k_book' }] },
      ],
    },
  ],
  library_clock: [{ steps: [n('古い柱時計だ。こち、こち、と静かに時を{刻|きざ|v:kizamu}んでいる。', 'An old grandfather clock, quietly ticking away the time.'), { do: [{ learn: ['v:kizamu'] }] }] }],
  library_table: [{ steps: [n('読書用の机だ。誰かが読みかけの本を置いたままにしている。', 'A reading table. Someone left a book open here.')] }],
  library_globe: [{ steps: [n('古い{地球儀|ちきゅうぎ}だ。回すと、日本がずいぶん小さく見える。', 'An old globe. Spin it and Japan looks very small.')] }],
  library_display: [{ steps: [n('「今月のおすすめ」のコーナーだ。町の{昔話|むかしばなし}の本が並んでいる。', 'A “Recommended this month” corner with books of local folk tales.')] }],
  library_reading: [{ steps: [n('{静か|しずか}な読書コーナーだ。ソファに座ると、つい{眠く|ねむく}なりそうだ。', 'A quiet reading corner. Sit on the sofa and you might doze off.')] }],
  library_magazines: [{ steps: [n('新聞と雑誌の{棚|たな}だ。ここでは{立ち読み|たちよみ}しても{大丈夫|だいじょうぶ}だ。', 'Newspapers and magazines. Here, reading without buying is fine.')] }],
  library_desk: [{ steps: [n('{貸し出し|かしだし}カウンターだ。「返却は二週間以内にお願いします」と書いてある。', 'The lending desk. A sign says “Please return books within two weeks.”')] }],
  library_cart: [{ steps: [n('返された本のワゴンだ。{棚|たな}に戻されるのを待っている。', 'A cart of returned books, waiting to go back on the shelves.')] }],
  station_timetable: [
    {
      steps: [
        n('大きな時刻表だ。「みどり線　{上|のぼ}り・{下|くだ}り」', 'A large timetable: “Midori Line — inbound / outbound”.'),
        n('張り紙：「現在、みどり線は運転を{見合わせて|みあわせて|v:miawase}おります。{再開|さいかい|v:saikai}の時期は未定です。」', 'Notice: “Service on the Midori Line is currently suspended. The date of resumption is undecided.”'),
        { do: [{ learn: ['v:miawase', 'v:saikai'] }] },
      ],
    },
  ],
  station_ticket: [{ steps: [n('切符の{券売機|けんばいき}だ。画面に「ただいま発売を停止しております」と表示されている。', 'A ticket machine. The screen says “Ticket sales are currently suspended.”')] }],
  station_map: [{ steps: [n('この地方の地図だ。日野森の先に、大きな街や山の村、海の町が描かれている。いつか行ってみたい。', 'A map of the region. Beyond Hinomori are a big city, a mountain village and a coastal town. Someday…')] }],
  station_window: [{ steps: [n('{窓口|まどぐち}だ。「本日の営業は終了しました」という札が出ている。', 'The ticket window. A sign says “Closed for today.”')] }],
  station_poster: [{ steps: [n('旅行のポスターだ。「山の村で、{紅葉|こうよう}を楽しもう」と書いてある。', 'A travel poster: “Enjoy the autumn leaves in the mountain village.”')] }],
  station_trash: [{ steps: [n('ゴミ箱だ。「ゴミは{分別|ぶんべつ}してお{捨て|すて}ください」と書いてある。', 'A bin. “Please sort your rubbish before throwing it away.”')] }],
  station_stove: [{ steps: [n('古い{石油|せきゆ}ストーブだ。やかんがのっている。冬にはここで、みんな電車を待つのだろう。', 'An old kerosene stove with a kettle on top. In winter, people must wait for trains here.')] }],
  station_locker: [{ steps: [n('コインロッカーだ。{全部|ぜんぶ}{空いて|あいて}いる。最近は旅行客も少ないのだろう。', 'Coin lockers, all empty. Few travellers come these days.')] }],
  station_bench: [{ steps: [n('待合室のベンチだ。{誰|だれ}もいない。電車が止まってから、ずっとこうなのだろう。', 'A waiting-room bench. Nobody here. It has probably been like this since the trains stopped.')] }],
  station_gate: [{ steps: [n('{改札|かいさつ}だ。電車が動いていないので、{通れ|とおれ}ないようになっている。', 'The ticket gates. With no trains running, they are closed.'), { do: [{ note: 'ic_card' }] }] }],
  kitchen: [{ steps: [n('小さなキッチンだ。一人分の料理なら、ここで十分作れる。', 'A small kitchen. Enough to cook for one.')] }],
  nightstand: [{ steps: [n('ベッドの横の小さな棚だ。目覚まし時計は六時に{設定|せってい}してある。', 'A little shelf by the bed. The alarm is set for six.')] }],
  wardrobe: [{ steps: [n('{洋服|ようふく}ダンスだ。{引っ越し|ひっこし}の荷物はまだ半分しか片付いていない。', 'A wardrobe. Only half of the moving boxes are unpacked so far.')] }],
  tv: [{ steps: [n('テレビをつけると、天気予報をやっていた。「明日は全国的に晴れるでしょう。」', 'You switch on the TV: the weather forecast. “Tomorrow will be sunny nationwide.”')] }],
  fridge: [{ steps: [n('冷蔵庫の中には、牛乳と卵と、{賞味期限|しょうみきげん}が{切れ|きれ}そうなヨーグルトがある。', 'In the fridge: milk, eggs and a yoghurt about to pass its best-before date.')] }],
  shoes: [{ steps: [n('{靴箱|くつばこ}だ。日本では家に入るとき、玄関で靴を{脱ぐ|ぬぐ}。', 'A shoe cabinet. In Japan you take off your shoes at the entrance.'), { do: [{ note: 'genkan' }] }] }],
  laundry: [{ steps: [n('{洗濯物|せんたくもの}がたまっている。{天気|てんき}がいい日にまとめて{干そう|ほそう}。', 'The laundry is piling up. Better hang it all out on a sunny day.')] }],
  floorlamp: [{ steps: [n('{柔らかい|やわらかい}光のスタンドだ。夜の勉強にちょうどいい。', 'A lamp with soft light. Just right for studying at night.')] }],
  mirror_room: [{ steps: [n('{鏡|かがみ}に自分が{映って|うつって}いる。今日も{頑張ろう|がんばろう}！', 'Your reflection in the mirror. Let’s do our best today!')] }],
  kotatsu: [
    {
      steps: [
        n('畳の上の低いテーブルだ。座ってお茶を飲みながら、日本語の本を読むのにちょうどいい。', 'A low table on the tatami. Perfect for reading a Japanese book over tea.'),
        {
          choice: [
            { text: '少し復習する', en: 'Do a short review', then: [{ do: [{ open: 'review' }] }] },
            { text: 'やめる', en: 'Leave' },
          ],
        },
      ],
    },
  ],
  // ================================================================ street furniture
  vending: [
    {
      steps: [
        n('{自動販売機|じどうはんばいき}だ。「つめた～い」と「あたたか～い」の飲み物が並んでいる。', 'A vending machine with “cold” and “hot” drinks.'),
        {
          choice: [
            {
              text: '日野森緑茶を買う（¥150）', en: 'Buy Hinomori green tea (¥150)',
              then: [
                {
                  if: { money: 150 },
                  then: [
                    { do: [{ money: -150 }, { give: 'greentea' }] },
                    n('ガコン！ お茶が出てきた。……コンビニでは{品切れ|しなぎれ|v:shinagire}なのに、ここにはあった。', 'Clunk! A bottle drops out. …Sold out at the konbini, but here it is.'),
                    {
                      if: { chance: 0.05 },
                      then: [
                        n('ピピピピ……「７７７７」！ {当たり|あたり}！ もう一本！', 'Beep-beep-beep… “7777”! A winner! One more drink!'),
                        { do: [{ give: 'greentea' }, { secret: 'atari' }] },
                      ],
                    },
                  ],
                  else: [n('お金が足りない……。', 'Not enough money…')],
                },
              ],
            },
            { text: 'やめる', en: 'Leave' },
          ],
        },
      ],
    },
  ],
  postbox: [{ steps: [n('赤いポストだ。「{収集|しゅうしゅう|v:shuushuu}時刻　平日 10:00・15:00」と書いてある。', 'A red post box: “Collection times — weekdays 10:00 and 15:00.”'), { do: [{ learn: ['v:shuushuu'] }] }] }],
  bench: [{ steps: [n('ベンチだ。少し座って、町の音に{耳を澄ませた|みみをすませた|v:mimiwosumasu}。', 'A bench. You sit for a moment and listen to the sounds of the town.')] }],
  bicycle: [{ steps: [n('森さんの自転車だ。かごに「{駐輪禁止|ちゅうりんきんし}」の張り紙が……あれ、ここは森さんの家の前だから大丈夫なのかな。', 'Ms. Mori’s bicycle. There’s a “No bicycle parking” sticker in the basket… but it’s in front of her own house, so it’s probably fine.')] }],
  pole: [{ steps: [n('電柱だ。「この先　日野森駅　300m」と書いた{看板|かんばん}が付いている。', 'A utility pole with a sign: “Hinomori Station 300 m ahead.”')] }],
  stone_lantern: [{ steps: [n('{石灯籠|いしどうろう}だ。{苔|こけ}が生えていて、ずいぶん古そうだ。', 'A stone lantern, covered in moss. It looks very old.')] }],
  torii: [{ steps: [n('{鳥居|とりい}だ。ここから先は神様の{領域|りょういき}だと言われている。', 'A torii gate. Beyond it is said to be the realm of the gods.')] }],
  town_hokora: [
    {
      when: { hours: [0, 4] },
      steps: [
        { cg: 'cg_egg_midnight', say: '真夜中の祠。昼間とちがって、ろうそくの火がともっている。', en: 'The shrine at midnight. Unlike in the daytime, a candle is burning.' },
        { cg: 'cg_egg_midnight', say: '？？？「……こんな夜中まで、勉強かい。えらいねえ。」', en: '???: “…Studying this late at night? Good for you.”' },
        { cg: 'cg_egg_midnight', say: '？？？「でもね、言葉は寝ているあいだに、頭の中で{根|ね}をはるんだよ。早くおやすみ。」', en: '???: “But words put down their roots while you sleep, you know. Off to bed with you.”' },
        { cg: 'cg_egg_midnight', say: 'ふり返っても、だれもいない。言霊たちが、すっかり元気になっている。', en: 'You turn around, but no one is there. Your Kotodama feel completely refreshed.' },
        { do: [{ heal: true }, { secret: 'yofukashi' }] },
      ],
    },
    {
      steps: [
        n('道ばたの小さな{祠|ほこら}だ。お{供|そな}えの花が新しい。', 'A tiny roadside shrine. The offering flowers are fresh.'),
        n('「言葉を大切に」と、かすれた文字で書いてある。', 'In faded letters: “Treasure your words.”'),
      ],
    },
  ],
  garbage: [
    {
      steps: [
        n('ゴミ{集積所|しゅうせきじょ}だ。{掲示板|けいじばん|v:keijiban}にルールが書いてある。', 'The garbage collection point. The rules are on a notice board.'),
        n('「燃えるゴミ：月・木　／　{資源|しげん}ゴミ：水　※きちんと{分別|ぶんべつ|v:bunbetsu}してください」', '“Burnable: Mon & Thu / Recyclables: Wed — please sort properly.”'),
        { do: [{ learn: ['v:bunbetsu', 'v:keijiban'] }] },
      ],
    },
  ],
  planter: [{ steps: [n('{花壇|かだん}にきれいな花が咲いている。町の人が手入れしているようだ。', 'Pretty flowers in a planter. The townspeople seem to look after them.')] }],
  mirror: [
    {
      when: { all: [{ count: ['mirror_looks', 12] }, { notFlag: 'secret_mirror' }] },
      steps: [
        { cg: 'cg_egg_mirror', say: 'カーブミラーをのぞきこむ。……十三回目。', en: 'You peer into the traffic mirror. …For the thirteenth time.' },
        { cg: 'cg_egg_mirror', say: 'ミラーの中で、小さな青いきつねが、こちらに手をふった。', en: 'Inside the mirror, a small blue fox waves at you.' },
        { cg: 'cg_egg_mirror', say: 'ふり返ると、ユキツネはちゃんと足もとにいる。きょとんとした顔で。', en: 'You turn around, and Yukitsune is right at your feet, looking puzzled.' },
        { do: [{ secret: 'mirror' }, { add: 'mirror_looks' }] },
      ],
    },
    { steps: [n('カーブミラーだ。自分の顔が少しゆがんで映っている。', 'A traffic mirror. Your reflection looks a little warped.'), { do: [{ add: 'mirror_looks' }] }] },
  ],
  /** the calico cat (a wandering townsfolk animal): be patient with it ten times */
  folk_cat: [
    {
      when: { flag: 'secret_neko' },
      steps: [n('三毛猫：「にゃ。」（{小判|こばん}のお礼を待っているような顔だ）', 'Calico cat: “Mya.” (It looks like it’s waiting to be thanked for the coin.)')],
    },
    {
      when: { count: ['cat_talks', 9] },
      steps: [
        n('三毛猫が、くわえていた何かを、あなたの足もとにぽとりと落とした。', 'The calico cat drops something it was carrying at your feet.'),
        n('ぴかぴかの{小判|こばん}だ！ どこで拾ってきたんだろう。', 'A shiny gold koban coin! Where did it find that?'),
        n('「猫に小判」：価値のわからない人に、よいものをあげてもむだだ、ということわざ。……でもこの猫は、ちゃんと価値をわかっていたみたいだ。', '“Neko ni koban” (a gold coin to a cat): a proverb meaning that giving something valuable to someone who can’t appreciate it is wasted. …But this cat seems to know its worth.'),
        { do: [{ give: 'koban' }, { secret: 'neko' }, { add: 'cat_talks' }] },
      ],
    },
    {
      when: { count: ['cat_talks', 5] },
      steps: [n('三毛猫：「にゃあ。」（あなたの足に、すりすりしてくる）', 'Calico cat: “Nyaa.” (It rubs against your legs.)'), { do: [{ add: 'cat_talks' }] }],
    },
    { steps: [n('三毛猫：「にゃーん。」（のんびりしている）', 'Calico cat: “Meow.” (It looks relaxed.)'), { do: [{ add: 'cat_talks' }] }] },
  ],
  /** ↑↑↓↓←→←→ B A anywhere in the world */
  egg_konami: [
    {
      steps: [
        n('……どこからか、古いゲーム機の音が聞こえた気がする。', '…From somewhere, you seem to hear the sound of an old game console.'),
        n('ユキツネ：「いまの、なに？ 昔の人の{呪文|じゅもん}？」', 'Yukitsune: “What was that? A spell from the old days?”'),
        n('{裏技|うらわざ}を見つけた！ ことのはの{栞|しおり}をもらった。', 'You found a secret trick (urawaza)! You got Kotonoha bookmarks.'),
        { do: [{ give: 'shiori', n: 3 }, { secret: 'konami' }] },
      ],
    },
  ],
  /** after 10,000 steps */
  egg_manpo: [
    {
      steps: [
        n('ピピッ！ スマホの{万歩計|まんぽけい}が鳴った。今日までに、なんと一万歩！', 'Beep! The pedometer (manpokei) on your phone goes off: ten thousand steps so far!'),
        n('「千里の道も一歩から」。どんなに長い道も、一歩ずつ進めば、いつか着く。', '“A journey of a thousand miles begins with one step.” However long the road, step by step you will get there.'),
        { do: [{ give: 'onigiri', n: 3 }, { xp: 80 }, { secret: 'manpo' }] },
      ],
    },
  ],
  nosign: [
    {
      steps: [
        n('「{進入禁止|しんにゅうきんし}」の標識だ。研究所の前の道は、車が入れないらしい。', 'A “No entry” sign. Cars can’t use the road in front of the facility.'),
        n('（「{立入禁止|たちいりきんし|v:tachiirikinshi}」は人が入ってはいけない場所。「進入禁止」は車などが入ってはいけない道。）', '(立入禁止 = people may not enter. 進入禁止 = vehicles may not enter.)'),
        { do: [{ learn: ['v:tachiirikinshi'] }] },
      ],
    },
  ],
  // ================================================================ interiors of chapters 2-4 (flavour text; the people keep their own scripts)
  // --- Onsen inn Yunoka
  ryokan_counter: [{ steps: [n('{帳場|ちょうば}に{宿帳|やどちょう}と{小さな|ちいさな}ベルが置いてある。{宿泊客|しゅくはくきゃく}の名前が、ていねいな字で並んでいる。', 'The reception counter holds a guest book and a small bell. The guests’ names are lined up in careful handwriting.'), { do: [{ note: 'omotenashi' }] }] }],
  ryokan_scroll: [{ steps: [n('{桃|もも}の{枝|えだ}が描かれた{掛け軸|かけじく}だ。この谷の{春|はる}を思い出させる。', 'A hanging scroll with a peach branch. It reminds you of spring in this valley.')] }],
  ryokan_shoes: [{ steps: [n('{下駄箱|げたばこ}に、お{客|きゃく}さんの{靴|くつ}がきれいに並んでいる。ここで{靴|くつ}をぬぐのが{日本|にほん}の{旅館|りょかん}のルールだ。', 'The shoe shelves, with guests’ shoes neatly lined up. Taking your shoes off here is the rule in a Japanese inn.'), { do: [{ note: 'genkan' }] }] }],
  ryokan_umbrellas: [{ steps: [n('{傘立て|かさたて}に、{赤い|あかい}{傘|かさ}と{青い|あおい}{傘|かさ}が{差して|さして}ある。{雨|あめ}の{日|ひ}は、お{客|きゃく}さんに{貸して|かして}くれるそうだ。', 'The umbrella stand holds red and blue umbrellas. They lend them to guests on rainy days.')] }],
  ryokan_yu: [{ steps: [n('{額|がく}に大きく「{湯|ゆ}」と{書|か}いてある。{太田|おおた}先生の{字|じ}かもしれない。', 'A framed “湯” (hot water). It might be Mr. Ōta’s calligraphy.')] }],
  ryokan_cabinet: [{ steps: [n('ガラスの{棚|たな}に、{地元|じもと}の{日本酒|にほんしゅ}と{桃|もも}のジャムが{並んで|ならんで}いる。お{土産|みやげ}にも人気らしい。', 'A glass cabinet with local sake and peach jam. Apparently a popular souvenir.')] }],
  ryokan_window: [{ steps: [n('{窓|まど}の{外|そと}に、{温泉|おんせん}の{湯気|ゆげ}が{立ちのぼって|たちのぼって}いる。', 'Outside the window, steam from the hot spring rises.')] }],
  ryokan_table: [{ steps: [n('{低い|ひくい}テーブルに、お{茶|ちゃ}とお{菓子|かし}が用意されている。ひと口いただいた。', 'Tea and sweets are laid out on the low table. You have a little.'), { do: [{ heal: true }] }, n('体がほっとして、{言霊|ことだま}たちも元気になった！', 'You relax, and your Kotodama are refreshed!')] }],
  ryokan_screen: [{ steps: [n('{山|やま}の絵の{屏風|びょうぶ}だ。{雪|ゆき}の{山|やま}が、{遠く|とおく}に描かれている。', 'A folding screen painted with mountains. Snowy peaks in the distance.')] }],
  ryokan_hibachi: [{ steps: [n('{火鉢|ひばち}の上で、{鉄瓶|てつびん}がしゅんしゅんと音を立てている。', 'On the hibachi, an iron kettle is softly singing.')] }],
  ryokan_yukata: [{ steps: [n('{浴衣|ゆかた}とタオルが{整えて|ととのえて}ある。{温泉|おんせん}の前に、お{客|きゃく}さんはここで着がえる。', 'Yukata and towels, neatly arranged. Guests change here before the hot spring.'), { do: [{ note: 'onsen_manners' }] }] }],
  ryokan_pine: [{ steps: [n('{小さな|ちいさな}{松|まつ}の{鉢植え|はちうえ}だ。{年|とし}を{取った|とった}{木|き}の{形|かたち}が{美しい|うつくしい}。', 'A potted dwarf pine. The shape of the old tree is beautiful.')] }],
  // --- Mr. Ōta's workshop
  werk_scrolls: [{ steps: [n('{大きな|おおきな}{掛け軸|かけじく}が何枚も{下がって|さがって}いる。{墨|すみ}の{線|せん}の強さに、{思わず|おもわず}息をのむ。', 'Many large hanging scrolls. The strength of the ink lines takes your breath away.')] }],
  werk_window: [{ steps: [n('{丸い|まるい}{窓|まど}から、{桃|もも}の{木|き}と{青い|あおい}{空|そら}が見える。まるで{絵|え}のようだ。', 'Through the round window you see the peach tree and blue sky, like a painting.')] }],
  werk_bench: [{ steps: [n('{筆|ふで}と{硯|すずり}と{紙|かみ}が、きちんと並んでいる。{道具|どうぐ}を{大切に|たいせつに}する人の{机|つくえ}だ。', 'Brushes, inkstones and paper, all in order. The desk of someone who treasures their tools.')] }],
  werk_chest: [{ steps: [n('{引き出し|ひきだし}の{付いた|ついた}{小さな|ちいさな}たんすだ。{上|うえ}に、{緑|みどり}の{壺|つぼ}が{置いて|おいて}ある。', 'A small chest of drawers with a green pot on top.')] }],
  werk_cabinet: [{ steps: [n('{背の高い|せのたかい}{棚|たな}だ。{古い|ふるい}{筆|ふで}や{墨|すみ}が、{引き出し|ひきだし}ごとに{分けて|わけて}しまってある。', 'A tall cabinet. Old brushes and ink sticks are sorted drawer by drawer.')] }],
  werk_works: [{ steps: [n('{仕上がった|しあがった}{作品|さくひん}が、ひもにつるして{乾かして|かわかして}ある。{桜|さくら}や{竹|たけ}の{絵|え}もある。', 'Finished works hang on strings to dry, including paintings of cherry blossoms and bamboo.')] }],
  werk_desk: [{ steps: [n('{書き|かき}かけの{半紙|はんし}が{机|つくえ}の上にある。{筆|ふで}に{墨|すみ}がまだ{残って|のこって}いる。', 'A half-finished sheet of paper lies on the desk. Ink is still on the brush.'), { do: [{ note: 'shodo' }] }] }],
  werk_lamp: [{ steps: [n('{行灯|あんどん}のやわらかい{光|ひかり}が、{畳|たたみ}をあたためている。', 'The soft light of the paper lamp warms the tatami.')] }],
  werk_washi: [{ steps: [n('{和紙|わし}が{積んで|つんで}ある。{手|て}ざわりが、とてもやさしい。', 'A stack of washi paper. It feels very gentle to the touch.')] }],
  werk_brush: [{ steps: [n('{大きな|おおきな}{筆|ふで}だ。これで{書く|かく}{字|じ}は、きっと{人の背|ひとのせ}ほどの大きさだろう。', 'A huge brush. The characters written with it must be as tall as a person.')] }],
  // --- Grandma Tsuru's guesthouse
  tsuru_kamado: [{ steps: [n('{土|つち}の{竈|かまど}の{中|なか}で、{薪|まき}がぱちぱちと{燃えて|もえて}いる。', 'Firewood crackles inside the clay stove.')] }],
  tsuru_jars: [{ steps: [n('{水|みず}がめと{漬物|つけもの}のかめだ。{冬|ふゆ}の{間|あいだ}、{村|むら}の人はこれで{暮らす|くらす}。', 'Water jars and pickle crocks. The villagers live off these through the winter.')] }],
  tsuru_shelf: [{ steps: [n('{棚|たな}に、{古い|ふるい}お{椀|わん}がきれいに並んでいる。', 'Old bowls stand neatly on the shelf.')] }],
  tsuru_window: [{ steps: [n('{紙|かみ}の{窓|まど}の{向こう|むこう}に、{雪|ゆき}が{静かに|しずかに}{降って|ふって}いる。', 'Beyond the paper window, snow falls quietly.')] }],
  tsuru_kamidana: [{ steps: [n('{神棚|かみだな}に、{榊|さかき}と{白い|しろい}{紙|かみ}が{飾って|かざって}ある。{毎朝|まいあさ}、つるさんが{手を合わせる|てをあわせる}のだろう。', 'The household shrine, decorated with sakaki branches and white paper. Tsuru probably prays here every morning.')] }],
  tsuru_persimmons: [{ steps: [n('{干し柿|ほしがき}が{軒先|のきさき}に、ずらりと{並んで|ならんで}いる。', 'Dried persimmons hang in a long row.')] }],
  tsuru_cupboard: [{ steps: [n('{押し入れ|おしいれ}に、ふかふかの{布団|ふとん}が{積んで|つんで}ある。', 'Fluffy futons are stacked in the cupboard.')] }],
  tsuru_coats: [{ steps: [n('{藁|わら}の{雪|ゆき}よけ{蓑|みの}が{壁|かべ}に{掛けて|かけて}ある。{昔|むかし}は、これを{着て|きて}{雪かき|ゆきかき}をした。', 'Straw snow capes hang on the wall. People used to wear them to shovel snow.')] }],
  tsuru_boots: [{ steps: [n('{雪靴|ゆきぐつ}がならんでいる。{大きさ|おおきさ}は、{大人|おとな}も{子ども|こども}もいろいろだ。', 'Snow boots in a row, in sizes for adults and children.')] }],
  tsuru_irori: [{ steps: [n('{囲炉裏|いろり}の{火|ひ}が、ゆらゆらと{赤く|あかく}{燃えて|もえて}いる。{鉄瓶|てつびん}から、{湯気|ゆげ}が{上がって|あがって}いる。', 'The hearth fire flickers red. Steam rises from the iron kettle.'), { do: [{ heal: true }] }, n('火のそばで、体も心もあたたまった。', 'Beside the fire, body and heart both warm up.')] }],
  tsuru_tray: [{ steps: [n('{小さな|ちいさな}{お盆|おぼん}に、お茶が一杯のっている。', 'A small tray with a cup of tea.')] }],
  tsuru_wood: [{ steps: [n('{薪|まき}がかごに{山|やま}のように{積んで|つんで}ある。', 'Firewood is piled high in the basket.')] }],
  tsuru_futon: [
    { when: { obj: 'mq10.tsuru' }, steps: [n('{布団|ふとん}が{敷いて|しいて}ある。{見る|みる}だけで、{眠く|ねむく}なってくる。', 'A futon is laid out. Just looking at it makes you sleepy.'), ...TSURU_STAY] },
    { steps: [n('ふかふかの{冬布団|ふゆぶとん}だ。', 'A thick winter futon.')] },
  ],
  // --- Yukimi clinic
  klinik_bed: [{ steps: [n('{診察|しんさつ}ベッドだ。{白い|しろい}シーツが、ぴんと{張って|はって}ある。', 'The examination bed, with a crisp white sheet pulled tight.')] }],
  klinik_bedstool: [{ steps: [n('{丸い|まるい}いすと、{小さな|ちいさな}{机|つくえ}がある。{体温計|たいおんけい}も{置いて|おいて}ある。', 'A round stool and a small table, with a thermometer on it.')] }],
  klinik_shelf: [{ steps: [n('{薬|くすり}の{瓶|びん}と、{薬袋|くすりぶくろ}がきちんと並んでいる。', 'Medicine bottles and paper medicine bags, neatly arranged.')] }],
  klinik_counter: [{ steps: [n('{受付|うけつけ}の{窓口|まどぐち}だ。「{保険証|ほけんしょう}をお{見せ|みせ}ください」と{書いて|かいて}ある。', 'The reception window. A note says: “Please show your insurance card.”'), { do: [{ note: 'health_insurance' }] }] }],
  klinik_calendar: [{ steps: [n('{壁|かべ}のカレンダーに、{休診日|きゅうしんび}の{印|しるし}がついている。', 'The wall calendar has the clinic’s closed days marked.')] }],
  klinik_chart: [{ steps: [n('{視力|しりょく}{検査|けんさ}の{表|ひょう}だ。{丸|まる}や{四角|しかく}の{記号|きごう}が{並んで|ならんで}いる。', 'An eye chart with rows of circles and squares.')] }],
  klinik_cabinet: [{ steps: [n('{赤い|あかい}十字のマークの{棚|たな}だ。{包帯|ほうたい}と{消毒液|しょうどくえき}が{入って|はいって}いる。', 'A cabinet with a red cross. It holds bandages and disinfectant.')] }],
  klinik_coat: [{ steps: [n('{白衣|はくい}が、{コート掛け|コートかけ}に{掛けて|かけて}ある。', 'A white coat hangs on the coat rack.')] }],
  klinik_desk: [{ steps: [n('{先生|せんせい}の{机|つくえ}だ。{患者|かんじゃ}さんのカルテが{積んで|つんで}ある。', 'The doctor’s desk, stacked with patient files.')] }],
  klinik_chairs: [{ steps: [n('{待合|まちあい}のいすだ。{冬|ふゆ}は、お年寄りがここで{世間話|せけんばなし}をしていく。', 'The waiting chairs. In winter, the elderly chat here.'), { do: [{ note: 'aging' }] }] }],
  klinik_stove: [{ steps: [n('{石油|せきゆ}ストーブの上で、やかんがお{湯|ゆ}をわかしている。', 'A kettle simmers on top of the kerosene stove.')] }],
  // --- Harbour diner Hamada
  kneipe_shelf: [{ steps: [n('{皿|さら}や{お椀|おわん}が、棚にぎっしり{積んで|つんで}ある。', 'Plates and bowls are packed onto the shelf.')] }],
  kneipe_menu: [{ steps: [n('{壁|かべ}に、{木|き}の{札|ふだ}のメニューが{並んで|ならんで}いる。{魚|さかな}の{名前|なまえ}ばかりだ。', 'Wooden menu tags line the wall. Mostly fish names.')] }],
  kneipe_sign: [{ steps: [n('{魚|さかな}の{形|かたち}の{木|き}の{看板|かんばん}だ。', 'A wooden sign shaped like a fish.')] }],
  kneipe_grill: [{ steps: [n('{焼き台|やきだい}の{上|うえ}で、{魚|さかな}がいい{色|いろ}に{焼けて|やけて}いる。{大きな|おおきな}{鍋|なべ}も、ぐつぐついっている。', 'Fish browns nicely on the grill, and a big pot bubbles.')] }],
  kneipe_noren: [{ steps: [n('{青い|あおい}のれんの{奥|おく}は、{台所|だいどころ}の{裏口|うらぐち}だ。', 'Behind the blue noren is the kitchen’s back door.')] }],
  kneipe_counter: [{ steps: [n('{長い|ながい}カウンターだ。{新鮮な|しんせんな}{魚|さかな}が、{氷|こおり}の上に{並んで|ならんで}いる。', 'A long counter. Fresh fish lies on ice.')] }],
  kneipe_tv: [{ steps: [n('{小さな|ちいさな}テレビが、{天気予報|てんきよほう}を{流して|ながして}いる。「{明日|あした}の{波|なみ}は{穏やか|おだやか}でしょう」。', 'A small TV plays the weather forecast: “Tomorrow’s waves will be calm.”')] }],
  kneipe_float: [{ steps: [n('ガラスの{浮き玉|うきだま}と{古い|ふるい}{網|あみ}が{壁|かべ}に{飾って|かざって}ある。', 'A glass float and an old net decorate the wall.')] }],
  kneipe_tank: [{ steps: [n('{水槽|すいそう}の中を、{小さな|ちいさな}{魚|さかな}が{泳いで|およいで}いる。', 'Small fish swim in the tank.')] }],
  kneipe_window: [{ steps: [n('{窓|まど}から{港|みなと}が見える。{船|ふね}がゆっくり{揺れて|ゆれて}いる。', 'Through the window you see the harbour, boats rocking slowly.')] }],
  kneipe_stool: [{ steps: [n('{丸い|まるい}カウンターの{椅子|いす}だ。{座って|すわって}みたくなる。', 'A round counter stool. Tempting to sit on.')] }],
  kneipe_table: [{ steps: [n('{四人|よにん}がけのテーブルだ。お{昼|ひる}どきはいつもいっぱいになるらしい。', 'A table for four. It is always full at lunchtime, apparently.')] }],
  kneipe_lemons: [{ steps: [n('{箱|はこ}に、{黄色い|きいろい}レモンがたくさん入っている。{潮見|しおみ}の{名物|めいぶつ}だ。', 'A crate full of yellow lemons, Shiomi’s speciality.'), { do: [{ note: 'omiyage' }] }] }],
  kneipe_cart: [{ steps: [n('{焼いた|やいた}いかのお{皿|さら}が、ワゴンの上に{積んで|つんで}ある。', 'Plates of grilled squid are stacked on the cart.')] }],
  // --- Lighthouse keeper's room
  turm_photo: [{ steps: [n('{古い|ふるい}{集合写真|しゅうごうしゃしん}だ。{教室|きょうしつ}いっぱいに、{子ども|こども}たちが{並んで|ならんで}いる。', 'An old group photo. Children fill the whole classroom.')] }],
  turm_clock: [{ steps: [n('{柱時計|はしらどけい}が、{静かに|しずかに}{時|とき}を{刻んで|きざんで}いる。', 'The wall clock quietly counts the time.')] }],
  turm_window: [{ steps: [n('{丸い|まるい}{窓|まど}の{外|そと}は、{一面|いちめん}の{海|うみ}だ。', 'Outside the round window: nothing but sea.')] }],
  turm_books: [{ steps: [n('{辞書|じしょ}や{古い|ふるい}{教科書|きょうかしょ}が、ぎっしり{並んで|ならんで}いる。{背表紙|せびょうし}は、{何度も|なんども}{開いた|ひらいた}あとで{すり切れて|すりきれて}いる。', 'Dictionaries and old textbooks are packed in tight. The spines are worn from being opened again and again.')] }],
  turm_barometer: [{ steps: [n('{気圧計|きあつけい}の{針|はり}は、「{晴れ|はれ}」のあたりを{指して|さして}いる。', 'The barometer needle points around “fair”.')] }],
  turm_stairs: [{ steps: [n('{鉄|てつ}のらせん階段が、{灯台|とうだい}の{上|うえ}まで{続いて|つづいて}いる。', 'An iron spiral staircase climbs to the top of the lighthouse.')] }],
  turm_blackboard: [{ steps: [n('{小さな|ちいさな}{黒板|こくばん}に、{消えかけた|きえかけた}チョークの{線|せん}が{残って|のこって}いる。', 'Faded chalk lines remain on the small blackboard.')] }],
  turm_classphoto: [{ steps: [n('{額|がく}に、{学校|がっこう}の{先生|せんせい}たちの{写真|しゃしん}が入っている。{若い|わかい}{頃|ころ}の{海野|うみの}さんもいるようだ。', 'A framed photo of the school’s teachers. A young Mr. Umino seems to be among them.'), { do: [{ note: 'school_closing' }] }] }],
  turm_coats: [{ steps: [n('{防水|ぼうすい}の{上着|うわぎ}とランタンが、{釘|くぎ}に{掛けて|かけて}ある。', 'Oilskins and a lantern hang from hooks.')] }],
  turm_charts: [{ steps: [n('{海図|かいず}がしまってある{棚|たな}だ。{潮|しお}の{流れ|ながれ}が、{細かく|こまかく}{書き込んで|かきこんで}ある。', 'A cabinet of sea charts, with tides and currents noted in fine detail.')] }],
  turm_desk: [{ steps: [n('{先生|せんせい}の{机|つくえ}だ。{開いた|ひらいた}ノートに、{赤ペン|あかペン}で{直した|なおした}あとがある。', 'The teacher’s desk. An open notebook shows corrections in red pen.')] }],
  turm_globe: [{ steps: [n('{地球儀|ちきゅうぎ}だ。{指|ゆび}で{回す|まわす}と、{海|うみ}の{青|あお}がぐるりとまわる。', 'A globe. Spin it with a finger and the blue of the sea turns round.')] }],
  turm_telescope: [{ steps: [n('{望遠鏡|ぼうえんきょう}をのぞくと、{水平線|すいへいせん|v:suiheisen}の{向こう|むこう}に、{小さな|ちいさな}{島|しま}が見える。', 'Through the telescope you see a small island beyond the horizon.'), { do: [{ learn: ['v:suiheisen'] }] }] }],
  turm_schooldesk: [{ steps: [n('{椅子|いす}の{付いた|ついた}{古い|ふるい}{学校|がっこう}の{机|つくえ}だ。{机|つくえ}に、{生徒|せいと}の{落書き|らくがき}が{残って|のこって}いる。', 'An old school desk with attached seat. A pupil’s doodle is still carved into it.')] }],

  // ================================================================ Kyoto (chapter 5)
  kyoto_station: [
    {
      when: { questActive: 'mq21' }, // also after the first ride, so the way back to Fushimi stays open until the summit is done
      steps: [
        n('京都駅。構内は、朝から{大勢|おおぜい}の人でごった返している。伏見稲荷へは、{奈良線|ならせん}の{各駅停車|かくえきていしゃ}で、二つ目の駅だ。', 'Kyoto Station, crowded from early morning. Fushimi Inari is two stops away on the local Nara Line.'),
        {
          choice: [
            { text: '伏見稲荷へ行く', en: 'Take the local train to Fushimi Inari', then: [{ do: [{ objective: 'mq21.fushimi' }, { flag: 'fushimi_visited' }, { warp: { map: 'k_fushimi', x: 20, y: 26 } }] }] },
            { text: 'やめる', en: 'Not yet' },
          ],
        },
      ],
    },
    {
      steps: [
        n('京都駅。新幹線のホームは上、地下鉄とバスは下だ。{乗り換え|のりかえ|v:norikae}の{案内|あんない|v:ky_annai}が、何か国語もで書いてある。', 'Kyoto Station. The Shinkansen platforms are upstairs, the subway and buses below. Transfer signs are written in several languages.'),
        { do: [{ open: 'board:kyoto' }] },
      ],
    },
  ],
  dep_osaka: [{ steps: [n('梅田駅の改札だ。どこへ行こう？', 'The ticket gates of Umeda Station. Where to?'), { do: [{ open: 'board:osaka' }] }] }],
  dep_tokyo: [{ steps: [n('東京駅の改札だ。どこへ行こう？', 'The ticket gates of Tokyo Station. Where to?'), { do: [{ open: 'board:tokyo' }] }] }],
  k_station_front: [{ steps: [n('京都駅の入口だ。ガラスの大きな建物の中に、案内所と改札がある。', 'The entrance of Kyoto Station. Inside the big glass building are the information desk and the ticket gates.')] }],
  ikeda: [
    {
      when: { all: [{ questActive: 'mq18' }, { obj: 'mq18.arrive' }, { notObj: 'mq18.ikeda' }] },
      steps: [
        say('ikeda', 'いらっしゃいませ。京都駅へ、ようこそ。……初めてですか。', 'Welcome to Kyoto Station. …Is this your first time?'),
        say('ikeda', '本日は、{紅葉|こうよう}の{季節|きせつ}で、{構内|こうない}がたいへん{混雑|こんざつ}しております。お{急|いそ}ぎのところ、ご{迷惑|めいわく}をおかけします。', 'It is autumn-leaf season, so the station is very crowded. We apologise to those in a hurry.'),
        say('ikeda', '{ご案内|ごあんない}に{先立って|さきだって|g:nisakidatte}、ひとつお願いです。ホームでも{路地|ろじ}でも、立ち止まって写真を撮るのは、お{控|ひか}えくださいね。', 'Before I guide you, one request: please refrain from stopping to take photos, on the platforms or in the lanes.'),
        { teach: 'g:nisakidatte' },
        {
          quiz: {
            q: '「ご案内に先立って、お願いです」とは、どんな意味か。',
            qEn: 'What does 「ご案内に先立って、お願いです」 mean?',
            options: ['案内を始める前に、まずお願いがある', '案内をしたあとで、お願いする', '案内はしないが、お願いはある', '案内と同じ時に、お願いする'],
            answer: 0,
            why: '〜に先立って = prior to ~, before starting: the request comes before the guidance.',
          },
          keys: ['g:nisakidatte'], area: 'grammar', retry: true,
        },
        say('ikeda', '宿は、{祇園|ぎおん}の{松尾|まつお}さんのお{宅|たく}ですね。駅を出て、{錦市場|にしきいちば}を{通じて|つうじて|g:wotsujite}、{東|ひがし}へ行くのが{早|はや}いですよ。ICカードがあれば、バスも楽です。', 'Your inn is Ms. Matsuo’s house in Gion. Going through Nishiki Market and east is quickest. With an IC card, buses are easy too.'),
        { do: [{ objective: 'mq18.ikeda' }, { rel: 'ikeda', points: 1, memory: 'first_meeting' }, { note: 'ic_card' }, { learn: ['g:nisakidatte', 'g:wotsujite', 'v:ky_annai'] }] },
      ],
    },
    { when: { flag: 'chapter5_done' }, steps: [say('ikeda', '伏見の朝は、いいでしょう？ あそこの{夜明け|よあけ}が、一番静かなんです。', 'Fushimi in the morning is lovely, isn’t it? Dawn is the quietest time there.', 'happy')] },
    { steps: [say('ikeda', '乗り換えは、あちらの{階段|かいだん}を下りて、左です。お気をつけて。', 'Transfers: go down those stairs and turn left. Take care.')] },
  ],
  emma: [
    {
      when: { all: [{ questActive: 'mq19' }, { notObj: 'mq19.emma' }] },
      steps: [
        say('emma', 'あの、すみません！ この{看板|かんばん}、読めなくて……。「ご{遠慮|えんりょ|v:enryo}ください」って、書いてありますよね。何を？', 'Excuse me! I can’t read this sign… it says “go-enryo kudasai”, right? What does it want from me?', 'worried'),
        n('{看板|かんばん}には、こう書いてある。「路地での写真撮影は、ご遠慮ください」。', 'The sign reads: “Please refrain from taking photographs in the lanes.”'),
        {
          quiz: {
            q: '「ご遠慮ください」は、どんな意味か。',
            qEn: 'What does 「ご遠慮ください」 mean?',
            options: ['しないでください', 'どうぞ、してください', 'あとでしてください', 'ゆっくりしてください'],
            answer: 0,
            why: '遠慮 = holding back. 「ご遠慮ください」 is a polite way to say “please don’t”.',
          },
          keys: ['v:enryo'], area: 'vocab', retry: true,
        },
        say('emma', 'えっ、写真はだめなんですか！ わたしは、ただの{旅行者|りょこうしゃ}{にすぎない||g:nisugimai}のに……。', 'What, no photos! I’m nothing more than a tourist…', 'surprised'),
        { teach: 'g:nisugimai' },
        n('エマは、{肩|かた}をすぼめた。「ただの旅行者」でも、{路地|ろじ}に住む人にとっては、{毎日|まいにち}{何十人|なんじゅうにん}もの旅行者の一人だ。', 'Emma shrugs. “Just one tourist” — but for the people who live in the lane, she is one of dozens every day.'),
        say('emma', '……そうか。住んでいる人の{迷惑|めいわく}に、なっていたんですね。ありがとう。気をつけます！', '…I see. I had been a bother to the people who live here. Thank you. I’ll be careful!', 'happy'),
        { do: [{ objective: 'mq19.emma' }, { rel: 'emma', points: 1, memory: 'first_meeting' }, { note: 'overtourism' }, { learn: ['v:enryo', 'g:nisugimai', 'v:ky_roji'] }] },
      ],
    },
    { steps: [say('emma', '京都、すごいですね！ ……でも、人がいっぱいで、ちょっと{疲|つか}れました。', 'Kyoto is amazing! …But so many people. I’m a little tired.')] },
  ],
  sakamoto: [
    {
      when: { all: [{ questActive: 'mq19' }, { notObj: 'mq19.sakamoto' }] },
      steps: [
        say('sakamoto', 'ああ、君は旅行者かね。……少し、{相談|そうだん}に乗ってくれないか。', 'Ah, you’re a traveller? …Could you give me a bit of advice?', 'worried'),
        say('sakamoto', '京都の取引先に、新しい商品を{提案|ていあん}したんだ。そうしたら、「{前向|まえむ}きに{検討|けんとう}させていただきます」と、{笑顔|えがお}で言われた。', 'I proposed a new product to a client in Kyoto. And they said with a smile: “We’ll consider it positively.”'),
        say('sakamoto', 'これは、いい{返事|へんじ}だろう？ だが、{部下|ぶか}は「期待しないほうがいい」と言うんだ。', 'That’s a good answer, isn’t it? But my subordinate says I shouldn’t get my hopes up.'),
        {
          quiz: {
            q: '「前向きに検討させていただきます」は、京都の取引先の{返事|へんじ}として、どう考えられるか。',
            qEn: 'How might 「前向きに検討させていただきます」 be understood as a reply from a Kyoto client?',
            options: ['はっきり断らない、遠回しな断りかもしれない', '必ず買うという、はっきりした約束だ', '商品が悪いという、ていねいな説明だ', '値段を下げてほしいという、お願いだ'],
            answer: 0,
            why: 'A smiling “we will consider it” can be a polite, indirect no (tatemae). Context and tone tell you the honne.',
          },
          keys: ['v:ky_tatemae'], area: 'reading', retry: true,
        },
        say('sakamoto', '……やはり、そうか。{社長|しゃちょう}ともなると、はっきり断れないものだな。', '…So that’s how it is. When you reach a president’s level, you can’t say no outright.'),
        { teach: 'g:tomonaruto' },
        say('sakamoto', '{相手|あいて}は、まるで{何|なに}も{気|き}にしていない{かのように||g:kanoyouda}笑っていた。……あれが、{空気|くうき}を読む、ということか。', 'The other side smiled as if nothing mattered. …Is that what “reading the air” means?'),
        { teach: 'g:kanoyouda' },
        { do: [{ objective: 'mq19.sakamoto' }, { rel: 'sakamoto', points: 1, memory: 'first_meeting' }, { note: 'honne_tatemae' }, { learn: ['v:ky_honne', 'v:ky_tatemae', 'v:ky_kuuki', 'g:tomonaruto', 'g:kanoyouda'] }] },
      ],
    },
    { steps: [say('sakamoto', '次の会議までに、頭を冷やさないとな。……{遠回|とおまわ}しな返事は、{難|むずか}しい。', 'I need to cool my head before the next meeting. …Indirect replies are hard.')] },
  ],
  matsuo: [
    {
      when: { all: [{ questActive: 'mq18' }, { obj: 'mq18.ikeda' }, { notObj: 'mq18.matsuo' }] },
      steps: [
        say('matsuo', 'まあ、遠いところ、ようこそ。{森|もり}さんから、聞いていますよ。ゲストハウス「まつお」の松尾です。', 'Well, welcome from so far away. Ms. Mori told me about you. I’m Matsuo of the guesthouse “Matsuo”.', 'happy'),
        n('この{町家|まちや|v:ky_machiya}は、{松尾|まつお}さんの{家族|かぞく}が{百年|ひゃくねん}以上住んできた家だ。{今|いま}は、一階を{宿|やど}にしている。', 'This machiya was home to Ms. Matsuo’s family for over a hundred years. Now the ground floor is a guesthouse.'),
        say('matsuo', 'ご近所の{皆|みな}さんと{話|はな}し{合|あ}って、{決|き}まりを作ったんです。{夜|よる}は静かに、{路地|ろじ}では写真を撮らない。……お客さんが増えて、近所の{意見|いけん}も{分|わ}かれていてね。', 'We talked with the neighbours and made rules: be quiet at night, no photos in the lane. …With more guests, the neighbours’ opinions are divided.'),
        say('matsuo', '{町|まち}の{将来|しょうらい}を{めぐって||g:womeguratte}、いろいろな声があるのよ。この{宿|やど}のルールは、{皆|みな}さんの{意見|いけん}に{基づいて||g:nimotozuite}作ったんです。', 'There are all kinds of voices about the town’s future. The rules of this inn are based on everyone’s opinions.'),
        { teach: 'g:womeguratte' },
        { teach: 'g:nimotozuite' },
        { do: [{ objective: 'mq18.matsuo' }, { rel: 'matsuo', points: 1, memory: 'first_meeting' }, { note: 'machiya_stay' }, { learn: ['v:ky_machiya', 'g:womeguratte', 'g:nimotozuite'] }] },
        say('matsuo', '二階に、お部屋を用意してあります。疲れたら、いつでも泊まっていってね。', 'I have a room ready upstairs. Whenever you’re tired, do stay the night.'),
      ],
    },
    { when: { obj: 'mq18.matsuo' }, steps: [say('matsuo', 'おかえりなさい。今日は、どんな一日だった？', 'Welcome back. How was your day?', 'happy'), ...MATSUO_STAY] },
    { steps: [say('matsuo', 'いらっしゃいませ。ゲストハウス「まつお」へ、ようこそ。', 'Welcome to the guesthouse “Matsuo”.')] },
  ],
  rin: [
    {
      when: { all: [{ questActive: 'mq19' }, { notObj: 'mq19.rin' }] },
      steps: [
        say('rin', 'いらっしゃいませ！ 着物の{貸衣装|かしいしょう}は、いかがですか。……あ、{今|いま}、お客さんが{多|おお}くて、ばたばたしてて。', 'Welcome! How about renting a kimono? …Sorry, we’re rushed — so many customers.', 'happy'),
        say('rin', 'わたし、北海道から来た{学生|がくせい}なんです。アルバイトで、ここで{働|はたら}いて{三|さん}か{月|げつ}。', 'I’m a student from Hokkaido. I’ve been working here part-time for three months.'),
        say('rin', '着物で歩く{観光客|かんこうきゃく}は、みんな楽しそう。{とはいえ||g:tohaie}、お店の前を通る近所の人は、ちょっと{困|こま}った顔をするんです。', 'The tourists walking in kimono all look happy. Even so, neighbours passing the shop sometimes look a bit troubled.'),
        { teach: 'g:tohaie' },
        {
          quiz: {
            q: '「楽しそうだ。とはいえ、近所の人は困った顔をする」の意味に、一番近いものはどれか。',
            qEn: 'Which is closest to “They look happy. Even so, the neighbours look troubled”?',
            options: ['観光客は喜んでいるが、近所の人は少し困っている', '観光客も近所の人も、みんな楽しんでいる', '近所の人は喜んでいるが、観光客は困っている', '観光客は少ないので、近所の人は困っている'],
            answer: 0,
            why: 'とはいえ = admitting the first fact but contrasting it: tourists are happy, yet neighbours are a bit troubled.',
          },
          keys: ['g:tohaie'], area: 'grammar', retry: true,
        },
        say('rin', 'わたしは、どっちの{気持|きも}ちも{分|わ}かる。……だから、{澄江|すみえ}さんに、{相談|そうだん}してみたら？ 島のお茶室にいる{先生|せんせい}。ヒントをくれるって、{町|まち}で{有名|ゆうめい}なの。', 'I understand both feelings. …So why not ask Sumie-san? The teacher at the tea room on the island. She’s famous in town for giving hints.'),
        { do: [{ objective: 'mq19.rin' }, { rel: 'rin', points: 1, memory: 'first_meeting' }, { note: 'kimono_rental' }, { learn: ['g:tohaie', 'v:ky_kimono'] }] },
      ],
    },
    { when: { flag: 'chapter5_done' }, steps: [say('rin', '伏見に行ったんですね！ わたしも、今度の朝、行ってみようかな。', 'You went to Fushimi! Maybe I’ll go one morning, too.', 'happy')] },
    { steps: [say('rin', '着物、{似合|にあ}いますよ。……なんて、お客さんには、みんなにそう言うんですけどね。', 'It suits you. …Well, that’s what I tell all the customers.', 'happy')] },
  ],
  sumie: [
    {
      when: { all: [{ questActive: 'mq20' }, { notObj: 'mq20.sumie' }] },
      steps: [
        { do: [{ music: 'gion' }] },
        { cg: 'cg_kyoto_tea', say: '{静|しず}かな{茶室|ちゃしつ}に、{炭|すみ}の{音|おと}だけが{響|ひび}いている。{澄江|すみえ}さんは、ゆっくりとお茶をたてた。', en: 'In the quiet tea room only the sound of charcoal can be heard. Sumie-san whisks the tea slowly.' },
        say('sumie', 'ようこそ。……お{茶|ちゃ}は、お好きですか。それとも、お急ぎですか。', 'Welcome. …Do you like tea? Or are you in a hurry?'),
        say('sumie', 'ぶぶ漬けでも、いかがどすか。……なんて、{京都|きょうと}の{人|ひと}はそう言って、帰ってほしい{意味|いみ}だと、よく{言|い}われますなあ。', 'Would you like some ochazuke?… That’s what Kyoto people supposedly say when they mean “please go home”, or so the story goes.', 'happy'),
        n('{澄江|すみえ}さんは、{楽|たの}しそうに{目|め}を{細|ほそ}めた。これは、よく知られた「{京都人|きょうとじん}の{話|はなし}」だ。{本当|ほんとう}にそうなのかは、{人|ひと}と{場面|ばめん}による。', 'Sumie-san narrows her eyes with amusement. It’s a well-known “story about Kyoto people”. Whether it’s really so depends on the person and the situation.'),
        say('sumie', '{大事|だいじ}なのは、{言葉|ことば}の{裏|うら}を{察|さっ|v:ky_sassuru}すること。……けれど、{察|さっ}するだけでは、足りません。{相手|あいて}の{気持|きも}ちに{気配|きくば}りができて{こそ||g:tekoso}、{本当|ほんとう}に{伝|つた}わるのです。', 'What matters is sensing what lies behind words. …But sensing is not enough. Only when you can be considerate of the other person’s feelings does it truly get through.'),
        { teach: 'g:tekoso' },
        say('sumie', '三つ、ヒントを出しましょう。{答|こた}えられたら、お話ししましょう。……{準備|じゅんび}ができたら、また{来|き}てください。', 'I’ll give you three hints. If you can answer them, we will talk. …Come back when you’re ready.'),
        { do: [{ objective: 'mq20.sumie' }, { rel: 'sumie', points: 1, memory: 'first_meeting' }, { learn: ['v:ky_sassuru', 'v:ky_toomawashi', 'v:ky_kikubari', 'g:tekoso'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq20' }, { obj: 'mq20.sumie' }, { notObj: 'mq20.master' }] },
      steps: [
        say('sumie', 'では、一つめ。……お客様が、「このお茶、とてもおいしいですね」と{言|い}いながら、{お茶|おちゃ}を{少|すこ}ししか{飲|の}んでいません。どう{思|おも}いますか。', 'First: a guest says, “This tea is very delicious,” but drinks only a little. What do you think?'),
        {
          quiz: {
            q: 'お客さんが「おいしいですね」と言いながら、少ししか飲まないとき、考えられることは何か。',
            qEn: 'When a guest says “delicious” but drinks only a little, what might be going on?',
            options: ['お茶が{口|くち}に{合|あ}わないが、{言|い}いにくいのかもしれない', 'とても気に入って、ゆっくり味わっている', 'のどがかわいていて、もっと欲しい', '急いでいて、すぐ帰りたい'],
            answer: 0,
            why: 'A polite compliment with actions that don’t match can mean the real feeling (honne) is different; you read the gap.',
          },
          keys: ['v:ky_honne'], area: 'reading', retry: true,
        },
        say('sumie', 'よろしい。二つめ。……「{考|かんが}えておきます」は、どんな{時|とき}に、どんな{意味|いみ}ですか。', 'Good. Second: when does “I’ll think about it” mean what?'),
        {
          quiz: {
            q: '「考えておきます」の言い方について、正しいものはどれか。',
            qEn: 'Which is correct about the way of saying 「考えておきます」?',
            options: ['声の調子や{場面|ばめん}によって、「はい」にも「だめ」にもなる', '必ず「はい」という意味だ', '必ず「だめ」という意味だ', '何の意味もない、ただの挨拶だ'],
            answer: 0,
            why: 'Indirect replies depend on tone and context. The skill is to listen to the whole situation, not only the words.',
          },
          keys: ['v:ky_toomawashi'], area: 'reading', retry: true,
        },
        say('sumie', '最後に、三つめ。……{町|まち}の{人|ひと}も、{旅人|たびびと}も、{傷|きず}つけない言い方を、{見|み}つけられますか。', 'Last, the third: can you find a way of speaking that hurts neither the townspeople nor the travellers?'),
        grammarQuiz('hatomokaku', 0),
        grammarQuiz('dakenokotohaaru', 0),
        say('sumie', '……お見事です。{十年|じゅうねん}お{茶|ちゃ}を{習|なら}っている{だけのことはある||g:dakenokotohaaru}、とお{世辞|せじ}を言うつもりでしたが、あなたは、{初|はじ}めてのお{客様|きゃくさま}の{割|わり}に、{よく聞|よくき}きました。', 'Splendid. I was going to flatter you by saying “no wonder, having studied tea for ten years”, but for a first-time guest you listened very well.'),
        { teach: 'g:dakenokotohaaru' },
        say('sumie', '最後に、{言霊|ことだま}と{向|む}き合ってください。……お茶の{湯気|ゆげ}から{生|う}まれた、{町|まち}の{声|こえ}です。', 'Lastly, face a Kotodama. …A voice of the town, born from the steam of tea.'),
        {
          battle: { species: 'bunbuku', level: 26, recruitable: true, bg: 'bg_kyoto_gion.webp' },
          win: [
            { cg: 'cg_kyoto_tea', say: 'ブンブクの{湯気|ゆげ}の中から、いくつもの{声|こえ}が{聞|き}こえた。{町|まち}の人の{本音|ほんね}と{旅|たび}の人の{本音|ほんね}。どちらも、{本当|ほんとう}の声だった。', en: 'From Bunbuku’s steam many voices rose: the townspeople’s honne and the travellers’ honne. Both were true.' },
            say('sumie', '{言葉|ことば}は、{言|い}われたことだけでなく、{言|い}われなかったことも、運びます。……あなたなら、その{両方|りょうほう}を、聞けるでしょう。', 'Words carry not only what is said but also what is not. …You will be able to hear both.', 'happy'),
            say('sumie', 'あの{方|かた}に会いたいのなら、{夜明|よあ}けの{伏見|ふしみ}へ行きなさい。{千|せん}の{鳥居|とりい}の{道|みち}を、{一人|ひとり}で歩いている人がいます。', 'If you want to meet her, go to Fushimi at dawn. Someone walks the path of a thousand gates alone.'),
            { do: [{ objective: 'mq20.master' }, { give: 'sumie_cup' }, { give: 'ema' }, { rel: 'sumie', points: 3, memory: 'trial_passed' }, { learn: ['g:hatomokaku', 'g:tekoso', 'g:dakenokotohaaru', 'g:narini'] }] },
          ],
          lose: [say('sumie', '{焦|あせ}ると、{言葉|ことば}の{裏|うら}は見えなくなります。{落|お}ち着いて、またどうぞ。', 'When you hurry, what lies behind words becomes invisible. Calm down and come again.')],
        },
      ],
    },
    { when: { flag: 'chapter5_done' }, steps: [say('sumie', '{朝|あさ}の{鳥居|とりい}は、いかがでしたか。……言わなくても、お顔に{書|か}いてありますね。', 'How were the gates in the morning? …You needn’t say; it’s written on your face.', 'happy')] },
    { steps: [say('sumie', 'お茶を、一服。……急がなくても、{言葉|ことば}は逃げません。', 'Have a cup of tea. …Words don’t run away if you don’t hurry.')] },
  ],
  k_guesthouse: [
    { when: { obj: 'mq18.matsuo' }, steps: [n('ゲストハウス「まつお」の玄関だ。松尾さんが、中から手を振っている。', 'The entrance of the guesthouse “Matsuo”. Ms. Matsuo waves from inside.'), ...MATSUO_STAY] },
    { steps: [n('{町家|まちや|v:ky_machiya}を{改装|かいそう}した{宿|やど}だ。{格子戸|こうしど}の{向|む}こうで、{灯|あか}りがやさしくゆれている。', 'A guesthouse in a renovated machiya. Beyond the latticed door a light flickers gently.')] },
  ],
  k_teahouse: [
    { when: { all: [{ questActive: 'mq20' }, { notObj: 'mq20.sumie' }] }, steps: [n('島の{茶室|ちゃしつ}。{澄江|すみえ}さんが、{入口|いりぐち}の{前|まえ}でお{待|ま}ちのようだ。', 'The tea house on the island. Sumie-san seems to be waiting at the entrance.')] },
    { steps: [n('小さな{庭|にわ}のある{茶室|ちゃしつ}。{石灯籠|いしどうろう}に、{紅葉|もみじ}が{一枚|いちまい}{落|お}ちている。', 'A tea house with a small garden. A maple leaf has fallen on the stone lantern.')] },
  ],
  k_kimono_shop: [{ steps: [n('{着物|きもの|v:ky_kimono}の{貸衣装|かしいしょう}のお店。色とりどりの着物が、{窓|まど}いっぱいにかかっている。', 'A kimono rental shop. Colourful kimono hang across the whole window.'), { do: [{ note: 'kimono_rental' }] }] }],
  k_izakaya: [{ steps: [n('{居酒屋|いざかや}の{前|まえ}だ。{夜|よる}になると、{赤|あか}い{提灯|ちょうちん}に{灯|ひ}がともる。{今|いま}は、{準備中|じゅんびちゅう}の{札|ふだ}が{下|さ}がっている。', 'In front of an izakaya. At night its red lantern lights up. For now a “preparing” sign hangs.')] }],
  k_kamo_cafe: [{ steps: [n('川を見下ろす、小さな{茶|ちゃ}カフェ。{抹茶|まっちゃ|v:ky_matcha}と{和菓子|わがし}のセットが、{人気|にんき}らしい。', 'A small tea café overlooking the river. The matcha and Japanese-sweet set seems popular.')] }],
  k_shop_veg: [{ steps: [n('{漬物|つけもの}や{野菜|やさい}を{売|う}る{店|みせ}。{試食|ししょく}の{皿|さら}が{並|なら}んでいる。「{食|た}べ{歩|ある}きは、ご{遠慮|えんりょ}ください」の{札|ふだ}も。', 'A shop selling pickles and vegetables, with sample plates. A sign asks: “Please refrain from eating while walking.”'), { do: [{ note: 'tabearuki' }] }, { shop: ['tsukemono', 'yatsuhashi', 'wagashi'] }] }],
  k_shop_old: [{ steps: [n('{老舗|しにせ|v:ky_shinise}の{店|みせ}。{包丁|ほうちょう}や{器|うつわ}が、{静|しず}かに{並|なら}んでいる。{店|みせ}の{人|ひと}は、{奥|おく}で{忙|いそが}しそうだ。', 'A long-established shop with knives and tableware lined up quietly. The staff look busy in the back.')] }],
  k_nishiki_sign: [
    {
      when: { all: [{ questActive: 'mq19' }, { obj: 'mq19.emma' }, { obj: 'mq19.sakamoto' }, { obj: 'mq19.rin' }, { notObj: 'mq19.nishiki' }] },
      steps: [
        n('{錦市場|にしきいちば}の{入口|いりぐち}で、{看板|かんばん}がちかちか{光|ひか}っている。「ようこそ！ Welcome! 欢迎！」。……{何|なに}かが、{看板|かんばん}の{文字|もじ}の{陰|かげ}で、{騒|さわ}いでいる。', 'At the entrance of Nishiki Market a sign flickers: “Youkoso! Welcome! 欢迎!” …Something is making a racket behind the letters.'),
        {
          battle: { species: 'chatama', level: 23, recruitable: true, bg: 'bg_kyoto_gion.webp' },
          win: [
            n('{騒|さわ}いでいたのは、チャタマだった。たくさんの{言葉|ことば}に{囲|かこ}まれて、{自分|じぶん}の{声|こえ}が{聞|き}こえなくなっていたのだ。', 'It was Chatama. Surrounded by so many words, it could no longer hear its own voice.'),
            n('{看板|かんばん}の{光|ひかり}が、{少|すこ}しやさしくなった。「ようこそ」の{文字|もじ}が、ゆっくりと{落|お}ち{着|つ}く。', 'The sign’s light softens a little. The letters of “Welcome” settle slowly.'),
            { do: [{ objective: 'mq19.nishiki' }, { note: 'tabearuki' }, { seen: 'chatama' }, { learn: ['v:ky_honne', 'v:ky_kuuki'] }] },
          ],
          lose: [n('{看板|かんばん}の{光|ひかり}が、まぶしくてよく見えない。……{少|すこ}し{休|やす}んで、また{来|き}よう。', 'The sign is too bright to see clearly. …Rest a bit and try again.')],
        },
      ],
    },
    { when: { questActive: 'mq19' }, steps: [n('{看板|かんばん}がちかちか光っている。{先|さき}に、{駅|えき}や{祇園|ぎおん}で、{人|ひと}の{話|はなし}を{聞|き}いてみよう。', 'The sign flickers. First, let’s listen to people at the station and in Gion.')] },
    { steps: [n('{錦市場|にしきいちば}の{入口|いりぐち}。「ようこそ」の{看板|かんばん}が、{静|しず}かに{光|ひか}っている。', 'The entrance of Nishiki Market. The “Welcome” sign glows quietly.')] },
  ],
  k_gion_hokora: [{ steps: [n('{石段|いしだん}の{上|うえ}の、小さなお{社|やしろ}。{町|まち}の人が、{毎朝|まいあさ}{手|て}を{合|あ}わせるのだろう。', 'A small shrine at the top of the stone steps. Townspeople probably pray here every morning.')] }],
  k_gion_lantern: [{ steps: [n('{広場|ひろば}の{真|ま}ん{中|なか}の{大|おお}きな{石灯籠|いしどうろう}。{夜|よる}になると、ほんのり{灯|あか}りがともる。', 'A big stone lantern in the middle of the square. At night it glows softly.')] }],
  k_shrine: [
    { steps: [n('{稲荷|いなり}{神社|じんじゃ}の{本殿|ほんでん}。{左右|さゆう}に、{赤い|あかい}前かけをした{石|いし}のきつねが{座|すわ}っている。', 'The main hall of the Inari shrine. A stone fox in a red bib sits on each side.'), n('お{賽銭|さいせん}を{入|い}れて、{手|て}を{合|あ}わせた。{朝|あさ}の{空気|くうき}が、すっと{静|しず}まる。', 'You drop in a coin and press your hands together. The morning air quietens.'), { do: [{ note: 'inari_torii' }] }] },
  ],
  k_shrine_office: [{ steps: [n('{社務所|しゃむしょ}だ。お{守|まも}りや{絵馬|えま}が{並|なら}んでいる。{絵馬|えま}には、{小|ちい}さなきつねの{絵|え}がかいてある。', 'The shrine office. Charms and ema plaques are lined up. The ema have a little fox drawn on them.')] }],
  k_souvenir: [{ steps: [n('{土産物|みやげもの}の{店|みせ}。きつねの{形|かたち}の{お菓子|おかし}や、{小|ちい}さな{鳥居|とりい}が{並|なら}んでいる。', 'A souvenir stand with fox-shaped sweets and little torii on display.'), { shop: ['yatsuhashi', 'wagashi', 'matcha'] }] }],
  k_fushimi_summit: [
    {
      when: { all: [{ questActive: 'mq21' }, { obj: 'mq21.fushimi' }, { notObj: 'mq21.summit' }] },
      steps: [
        { do: [{ music: 'gion' }] },
        { cg: 'cg_kyoto_fushimi', say: '{千本|せんぼん}の{鳥居|とりい}のトンネルに、{朝|あさ}の{光|ひかり}が{差|さ}し{込|こ}んでいる。……{遠|とお}くに、{帳面|ちょうめん}を{抱|かか}えた女の人が、{歩|ある}いていく。', en: 'Morning light streams through the tunnel of a thousand torii. …Far ahead, a woman with a notebook walks away.' },
        { cg: 'cg_kyoto_fushimi', say: '@nameは、思わず{手|て}を{伸|の}ばした。けれど、{女|おんな}の{人|ひと}は、{振|ふ}り{返|かえ}らなかった。{鳥居|とりい}の{向|む}こうの{光|ひかり}の中へ、{少|すこ}しずつ{消|き}えていく。', en: '@name reaches out. But the woman does not turn around. She fades little by little into the light beyond the gates.' },
        n('{道|みち}に、{一枚|いちまい}の{紙|かみ}が{落|お}ちていた。ていねいな{字|じ}で、こう{書|か}いてある。「{言葉|ことば}は、{人|ひと}の{多|おお}い{町|まち}ほど、{聞|き}こえなくなる」。', 'A sheet of paper lies on the path. In careful handwriting it says: “Words become harder to hear in busy towns.”'),
        n('その下に、{一字|いちじ}だけ。「{阪|さか}」。', 'Beneath it, a single character: 阪.'),
        {
          quiz: {
            q: '{女|おんな}の人は、なぜ振り返らなかったと{考|かんが}えられるか。',
            qEn: 'Why might the woman not have turned around?',
            options: ['まだ、会うための言葉を探している途中だから', '@nameの顔を、知らなかったから', '朝の光がまぶしかったから', '道を急いでいたから'],
            answer: 0,
            why: 'Sumie-san’s hint: she is still “searching for the words”. Words not yet found cannot be said — you read it between the lines.',
          },
          keys: ['v:ky_sassuru'], area: 'reading', retry: true,
        },
        { do: [{ objective: 'mq21.summit' }, { note: 'inari_torii' }, { seen: 'senbon' }, { learn: ['v:ky_sassuru', 'g:nihokanaranai', 'g:tsutsuaru', 'g:wotowazu'] }] },
        { cg: 'cg_kyoto_arrival', say: '言葉は、{聞|き}こえなくなっても、なくなりはしない。{察|さっ}して、{待|ま}って、また{届|とど}ける。\n― 第五章「京都」完 ―', en: 'Words may become hard to hear but they do not vanish. Sense them, wait, and deliver them again.\n— Chapter 5 “Kyoto” complete —' },
        n('Chapter 5 complete! Kyoto stays open: tea with Sumie-san, the Kotodama of the river and Fushimi, and your Japan notes. Chapter 6 (Osaka) is in development.'),
      ],
    },
    { steps: [n('{頂上|ちょうじょう}の{広場|ひろば}。{京都|きょうと}の{町|まち}と、{遠|とお}い{山|やま}が{霞|かす}んで{見|み}える。', 'The summit clearing. Kyoto and the distant mountains lie hazy below.')] },
  ],

  // ---- interiors of Kyoto (chapter 5): flavour text
  machiya_counter: [{ steps: [n('帳場の机に、宿帳と鍵かけがある。世界のあちこちの国の名前が、丁寧な字で並んでいる。', 'The reception desk holds a guest book and a key rack. Names from all over the world are lined up in neat handwriting.')] }],
  machiya_keys: [{ steps: [n('小さな鍵が、部屋の名前の札といっしょに下がっている。「梅」「竹」「松」。', 'Small keys hang with name tags for the rooms: “Plum”, “Bamboo”, “Pine”.')] }],
  machiya_scroll: [{ steps: [n('紅葉の枝を描いた掛け軸だ。季節ごとに、松尾さんが掛け替えるらしい。', 'A hanging scroll with maple branches. Ms. Matsuo apparently changes it with the seasons.')] }],
  machiya_garden: [{ steps: [n('ガラスの戸の向こうに、小さな中庭がある。石の手水鉢に、水がしたたっている。', 'Beyond the glass doors is a small inner garden. Water drips into a stone basin.')] }],
  machiya_shoes: [{ steps: [n('下駄箱に、お客さんの靴がきれいに並んでいる。町家でも、靴はぬぐのがきまりだ。', 'Guests’ shoes are lined up neatly in the shoe cabinet. Shoes come off in a machiya, too.')] }],
  machiya_luggage: [{ steps: [n('荷物置き場だ。大きなスーツケースが、いくつも預けてある。', 'The luggage corner, with several big suitcases left in storage.')] }],
  machiya_books: [{ steps: [n('本棚に、観光ガイドが並んでいる。「路地では静かに」と書いた小さな紙がはさんである。', 'Tour guides line the shelf. A small slip tucked in says “Please be quiet in the lanes”.')] }],
  machiya_table: [{ steps: [n('低いテーブルに、お茶とお菓子が用意されている。ひと口いただいた。', 'Tea and sweets are set out on the low table. You have a little.'), { do: [{ heal: true }] }, n('体がほっとして、言霊たちも元気になった！', 'You relax, and your Kotodama are refreshed!')] }],
  machiya_lantern: [{ steps: [n('紙の行灯のやわらかい光が、畳をあたためている。', 'The soft light of the paper lantern warms the tatami.')] }],
  machiya_bonsai: [{ steps: [n('小さな紅葉の盆栽だ。葉が、ほんのり赤くなっている。', 'A small maple bonsai. Its leaves are just turning red.')] }],
  machiya_screen: [{ steps: [n('川の絵の屏風だ。川べりを歩く人たちが、小さく描かれている。', 'A folding screen painted with a river. Tiny people walk along its bank.')] }],
  machiya_suitcase: [{ steps: [n('お客さんの大きなスーツケースだ。持ち主は、まだ観光中らしい。', 'A guest’s big suitcase. Its owner is still out sightseeing, apparently.')] }],
  teahouse_shelf: [{ steps: [n('棚に、茶わんや茶入れがきちんと並んでいる。どれも、長く使われてきた道具だ。', 'Tea bowls and caddies are lined up on the shelf, all tools that have been used for a long time.')] }],
  teahouse_hearth: [{ steps: [n('畳の中の小さな炉に、炭が赤く燃えている。釜から、静かに湯気が上がる。', 'Charcoal glows red in the small hearth sunk in the tatami. Steam rises quietly from the kettle.')] }],
  teahouse_scroll: [{ steps: [n('山の絵の掛け軸が、床の間に掛かっている。見ていると、気持ちが静まる。', 'A mountain scroll hangs in the alcove. Looking at it calms the mind.')] }],
  teahouse_flowers: [{ steps: [n('床の間に、季節の花が活けてある。赤い葉が、ひと枝そえてある。', 'Seasonal flowers are arranged in the alcove, with one branch of red leaves.')] }],
  teahouse_garden: [{ steps: [n('障子の向こうに、庭の紅葉が見える。風が吹くたびに、葉が一枚ずつ落ちる。', 'Beyond the shoji you see the garden’s maples. With every breeze a leaf falls.')] }],
  teahouse_jar: [{ steps: [n('小さな棚に、水がめと壺が置いてある。', 'A small shelf holds a water jar and a pot.')] }],
  teahouse_table: [{ steps: [n('低い茶卓の上に、お茶の道具が一そろい置いてある。茶せんが、きれいにそろっている。', 'A set of tea utensils is laid out on the low tea table. The whisk is perfectly aligned.'), { do: [{ heal: true }] }, n('温かいお茶を一服。心が落ち着いて、言霊たちも元気になった！', 'A cup of warm tea. Your mind settles, and your Kotodama are refreshed!')] }],
  teahouse_waterjar: [{ steps: [n('水指の台だ。水の音が、静かな部屋に小さく響く。', 'A stand for the water jar. The sound of water echoes softly in the quiet room.')] }],
  teahouse_vase: [{ steps: [n('竹の花入れが、台の上に置いてある。', 'A bamboo flower vase on its stand.')] }],
  teahouse_lamp: [{ steps: [n('和紙の灯りが、茶室をほんのり明るくしている。', 'A washi lamp lights the tea room faintly.')] }],
  kimono_geta: [{ steps: [n('下駄と草履の棚だ。着物の色に合わせて、鼻緒を選ぶらしい。', 'A shelf of geta and zori. You choose the thongs to match the colour of your kimono.')] }],
  kimono_boxes: [{ steps: [n('帯や小物の箱が、色ごとに並んでいる。', 'Boxes of obi and accessories are lined up by colour.')] }],
  kimono_counter: [{ steps: [n('受付のカウンターだ。タブレットで、予約と返却の時間を確認する。', 'The reception counter. A tablet is used to check reservations and return times.')] }],
  kimono_noren: [{ steps: [n('赤いのれんの奥は、着付けの部屋だ。「スタッフ専用」の札がかかっている。', 'Behind the red noren is the dressing room. A sign reads “Staff only”.')] }],
  kimono_hanging: [{ steps: [n('色とりどりの着物が、ずらりと掛かっている。花もよう、鳥もよう……どれにしようか迷う。', 'Colourful kimono hang in a long row: flowers, birds… it’s hard to choose.')] }],
  kimono_platform: [{ steps: [n('小さな畳の台だ。ここに立って、着付けをしてもらう。', 'A small tatami platform. You stand here to be dressed.')] }],
  kimono_mirror: [{ steps: [n('大きな鏡に、自分の姿がうつる。……着物を着たら、もっと背筋が伸びそうだ。', 'A big mirror shows your reflection. …In a kimono you’d probably stand straighter.')] }],
  kimono_bench: [{ steps: [n('着付けの前に、足袋をはくための低いベンチだ。', 'A low bench for putting on tabi socks before dressing.')] }],
  kimono_rack: [{ steps: [n('移動式のラックに、これから貸し出す着物が掛かっている。', 'On a wheeled rack hang the kimono about to go out for rent.')] }],
  kimono_basket: [{ steps: [n('かごの中に、髪かざりがたくさん入っている。花やリボン、小さな櫛もある。', 'A basket full of hair ornaments: flowers, ribbons, even little combs.')] }],
  izakaya_bottles: [{ steps: [n('棚に、日本酒の瓶がずらりと並んでいる。ラベルは、地元の酒蔵のものばかりだ。', 'Sake bottles line the shelf, all labelled by local breweries.')] }],
  izakaya_noren: [{ steps: [n('藍色ののれんに、白く徳利の形が染め抜いてある。奥が、台所だ。', 'The indigo noren has a sake bottle dyed in white. The kitchen lies behind it.')] }],
  izakaya_grill: [{ steps: [n('焼き台の上に、串がのっている。夜になると、いい香りがするのだろう。', 'Skewers sit on the grill. At night it probably smells wonderful.')] }],
  izakaya_counter: [{ steps: [n('長いカウンターだ。席に着くと、まず小さなお通しが出るらしい。……日本の居酒屋には、チップはない。', 'A long counter. When you sit down, a small appetiser (otoshi) apparently comes first. …In Japanese izakaya there is no tipping.'), { do: [{ note: 'otoshi' }] }] }],
  izakaya_shelf: [{ steps: [n('小さな棚に、お皿やコップがきちんと重ねてある。', 'A small shelf with plates and cups stacked neatly.')] }],
  izakaya_tv: [{ steps: [n('小さなテレビが、天気予報を流している。', 'A small TV plays the weather forecast.')] }],
  izakaya_window: [{ steps: [n('細い窓から、路地の明かりがもれてくる。', 'Light from the lane seeps through the narrow window.')] }],
  izakaya_crates: [{ steps: [n('瓶ケースが、壁ぎわに積んである。', 'Bottle crates are stacked against the wall.')] }],
  izakaya_stool: [{ steps: [n('カウンターの丸い椅子だ。座ってみたくなる。', 'A round counter stool. You feel like sitting down.')] }],
  izakaya_table: [{ steps: [n('低いテーブルに、座布団が二つ。仲のいい二人用の席だ。', 'A low table with two cushions. A seat for two friends.')] }],
  izakaya_barrel: [{ steps: [n('樽をテーブルにした席だ。', 'A table made from a barrel.')] }],
  izakaya_lantern: [{ steps: [n('赤い提灯が、床に置いてある。夜は、これを店の前に出すのだろう。', 'A red lantern stands on the floor. At night it probably goes out front.')] }],
  izakaya_beer: [{ steps: [n('瓶ビールのケースだ。空の瓶が、まだ少し残っている。', 'Crates of bottled beer, with a few empty bottles left.')] }],
  info_lockers: [{ steps: [n('コインロッカーが、壁にずらりと並んでいる。大きなスーツケースも入るサイズがある。', 'Coin lockers line the wall, with sizes that fit big suitcases.')] }],
  info_board: [{ steps: [n('電車の時刻表の電光掲示板だ。行き先が、日本語と英語で交互に表示される。', 'The electronic timetable board. Destinations alternate between Japanese and English.'), { do: [{ note: 'ic_card' }] }] }],
  info_counter: [{ steps: [n('案内カウンターだ。「Information」の丸いマークが、青く光っている。', 'The information counter. A round “Information” mark glows blue.')] }],
  info_vending: [{ steps: [n('自動販売機だ。ICカードをタッチして買える機械もある。', 'A vending machine. Some can be paid for by touching an IC card.')] }],
  info_atm: [{ steps: [n('ATMだ。外国のカードが使えるかどうか、画面で選ぶようになっている。', 'An ATM. A menu on the screen asks whether you’re using a foreign card.')] }],
  info_bench: [{ steps: [n('待合のベンチだ。大きな荷物を持った旅行者が、休んでいる。', 'A waiting bench. Travellers with big luggage rest here.')] }],
  info_trolley: [{ steps: [n('荷物用のカートだ。', 'A luggage trolley.')] }],
  info_bins: [{ steps: [n('三つのごみ箱が並んでいる。「燃えるごみ」「びん・缶」「ペットボトル」。', 'Three bins stand in a row: “burnable”, “bottles & cans”, “PET bottles”.'), { do: [{ note: 'bunbetsu' }] }] }],
  info_sign: [{ steps: [n('案内板に、乗り場の番号が書いてある。いろいろな言葉の説明つきだ。', 'A signboard lists platform numbers with explanations in several languages.')] }],
  info_suitcase: [{ steps: [n('だれかの黒いスーツケースだ。持ち主は、案内カウンターに並んでいるのだろう。', 'Somebody’s black suitcase. Its owner is probably in line at the counter.')] }],
  pickle_jars: [{ steps: [n('大きなガラス瓶に、色とりどりの漬物が入っている。きゅうり、大根、なす、かぶ……。', 'Big glass jars hold colourful pickles: cucumber, radish, aubergine, turnip…')] }],
  pickle_sign: [{ steps: [n('「本日のおすすめ」と、墨で書いた木の看板が掛かっている。', 'A wooden sign in ink reads “Today’s recommendation”.')] }],
  pickle_window: [{ steps: [n('小さな格子窓から、朝の光がさしている。', 'Morning light falls through a small latticed window.')] }],
  pickle_counter: [{ steps: [n('カウンターに、試食の皿が並んでいる。「お一つどうぞ」と、店の人が笑う。……「食べ歩き」は、ご遠慮ください。', 'Sample plates line the counter. “Have one,” the shopkeeper smiles. …But please refrain from eating while walking.'), { do: [{ note: 'tabearuki' }] }] }],
  pickle_veg: [{ steps: [n('木箱に、大根、白菜、なすが並んでいる。冬の京野菜だ。', 'Wooden crates of daikon, napa cabbage and aubergines: winter Kyoto vegetables.')] }],
  pickle_scale: [{ steps: [n('古い秤と、包み紙が置いてある。重さを量って、一枚ずつ包んでくれる。', 'An old scale and wrapping paper. Items are weighed and wrapped one by one.')] }],
  pickle_table: [{ steps: [n('試食用の小さなテーブルに、つまようじと小皿が並んでいる。', 'A small tasting table with toothpicks and little plates.')] }],
  pickle_barrel: [{ steps: [n('大きな漬物樽だ。蓋の上に、重い石がのせてある。', 'A big pickling barrel with a heavy stone on its lid.')] }],
  pickle_crates: [{ steps: [n('木箱が重ねてある。', 'Stacked wooden crates.')] }],
  pickle_basket: [{ steps: [n('お客さん用の買い物かごだ。', 'A shopping basket for customers.')] }],
  // ---- Osaka (chapter 6): flavour texts
  buero_desks: [{ steps: [n('机の上は、書類とモニターでいっぱいだ。付せんに「至急」と書いた紙が何枚もはってある。', 'The desks are piled with papers and monitors. Many sticky notes say “urgent”.'), { do: [{ note: 'overwork' }] }] }],
  buero_board: [{ steps: [n('ホワイトボードに、今週の予定がぎっしり書いてある。「定時」と書いた枠は、ほとんど空だ。', 'The whiteboard is packed with this week’s plans. The box labelled “regular finishing time” is nearly empty.'), { do: [{ note: 'overwork' }] }] }],
  buero_calendar: [{ steps: [n('壁のカレンダーの、今日の日付に赤い丸がついている。「納期」と読める。', 'On the wall calendar today’s date is circled in red: “deadline”.')] }],
  buero_meeting: [{ steps: [n('ガラスの会議室だ。長い机に、会議の資料が置いたままになっている。', 'The glass meeting room. Papers from a meeting still lie on the long table.')] }],
  buero_cabinet: [{ steps: [n('書類棚が並んでいる。引き出しには、「取引先」「契約書」などの札がついている。', 'Filing cabinets in a row, with labels like “clients” and “contracts”.')] }],
  buero_coffee: [{ steps: [n('コーヒーマシンだ。使い終わったカップが、ごみ箱にたくさん入っている。', 'A coffee machine. The bin beside it is full of used cups.')] }],
  buero_printer: [{ steps: [n('コピー機だ。「紙づまり」の表示が出ている。', 'A photocopier. A “paper jam” message is showing.')] }],
  empfang_desk: [{ steps: [n('受付のカウンターだ。来客用の記入用紙と、タブレットが置いてある。', 'The reception counter, with a visitor form and a tablet.')] }],
  empfang_logo: [{ steps: [n('壁に、会社のマークの板がかかっている。字は書かれていない。', 'A company logo plate hangs on the wall. No lettering on it.')] }],
  empfang_shelf: [{ steps: [n('本棚に、会社の案内のパンフレットが並んでいる。', 'Company brochures stand on the shelf.')] }],
  empfang_door: [{ steps: [n('ガラスのドアの向こうが、オフィスだ。社員証がないと入れない。', 'Beyond the glass door is the office. You can’t enter without a staff ID.')] }],
  empfang_umbrellas: [{ steps: [n('傘立てに、会社の黒い傘が並んでいる。', 'Black company umbrellas stand in the umbrella stand.')] }],
  tako_griddle: [{ steps: [n('たこ焼き器の丸い穴に、生地がじゅうじゅう焼けている。たこの足が、ちらりと見える。', 'Batter sizzles in the round holes of the takoyaki pan. An octopus leg peeks out.')] }],
  tako_menu: [{ steps: [n('木の札に、「六個」「八個」「十二個」とだけ書いてある。分かりやすい。', 'Wooden tags simply say “six”, “eight”, “twelve”. Easy to understand.')] }],
  tako_noren: [{ steps: [n('赤いのれんに、たこの絵がかいてある。', 'The red noren has an octopus painted on it.')] }],
  tako_tv: [{ steps: [n('小さなテレビで、野球の試合が流れている。おかんが時々、声を上げる。', 'A small TV shows a baseball game. Okan shouts at it now and then.')] }],
  tako_flour: [{ steps: [n('小麦粉の袋が積んである。袋にも、たこの絵がついている。', 'Sacks of flour are piled up, with an octopus on each.')] }],
  tako_stool: [{ steps: [n('赤い丸椅子だ。立って食べる人も多いらしい。', 'Red round stools. Many people eat standing, apparently.')] }],
  okonomi_shelf: [{ steps: [n('棚に、お皿とソースの瓶がぎっしり並んでいる。', 'Plates and sauce bottles are packed on the shelf.')] }],
  okonomi_noren: [{ steps: [n('青いのれんの奥は、台所だ。', 'Beyond the blue noren is the kitchen.')] }],
  okonomi_menu: [{ steps: [n('木の札のメニューが並んでいる。「豚玉」「いか玉」……読めるかな？', 'Wooden menu tags: “buta-tama”, “ika-tama”… can you read them?')] }],
  okonomi_photo: [{ steps: [n('古い大阪城の写真が、額に入っている。', 'A framed old photo of Osaka Castle.')] }],
  okonomi_griddle: [{ steps: [n('カウンターの鉄板は、まだ熱い。お客さんが自分で焼く店もあるそうだ。', 'The griddles in the counter are still hot. At some restaurants guests cook their own.')] }],
  konbini2_counter: [{ steps: [n('レジの横に、おでんと唐揚げのケースがある。いいにおいがする。', 'Beside the register: oden and fried-chicken cases. Smells good.'), { do: [{ note: 'konbini' }] }] }],
  konbini2_fridge: [{ steps: [n('ドリンクの冷蔵庫だ。お茶、コーヒー、エナジードリンク……。', 'Drink fridges: tea, coffee, energy drinks…')] }],
  konbini2_board: [{ steps: [n('「今月の新商品」の看板がつるしてある。', 'A “this month’s new products” board hangs here.')] }],
  konbini2_magazines: [{ steps: [n('雑誌の棚だ。働く人向けの雑誌が多い。', 'The magazine rack. Many magazines are for working people.')] }],
  konbini2_atm: [{ steps: [n('ATMだ。外国語の案内もついている。', 'An ATM, with instructions in foreign languages too.')] }],
  kushi_poster: [{ steps: [n('昔のビールとたこ焼きのポスターが、はってある。', 'Old beer and takoyaki posters are stuck on the wall.')] }],
  kushi_fryer: [{ steps: [n('フライヤーで、串カツがこんがり揚がっている。', 'Skewers fry golden brown in the deep fryers.')] }],
  kushi_sign: [{ steps: [n('「ソースの二度づけ禁止」の絵がかかっている。', 'A sign shows “no double-dipping in the sauce”.'), { do: [{ note: 'kansai' }] }] }],
  kushi_rack: [{ steps: [n('串の置き場に、揚げる前の串がずらりと並んでいる。', 'Raw skewers are lined up in the rack, waiting to be fried.')] }],
  kushi_counter: [{ steps: [n('カウンターに、ソースの入れ物が埋め込んである。みんなで使う、一つのソースだ。', 'Sauce dishes are built into the counter. One shared sauce for everyone.')] }],
  kushi_tv: [{ steps: [n('古いテレビが、天気予報を流している。', 'An old TV plays the weather forecast.')] }],
  osaka_castle: [{ steps: [n('大阪城だ。石垣の上に、白い天守がそびえている。入口は、橋の向こうにあるらしい。', 'Osaka Castle. The white keep towers over the stone walls. The entrance seems to lie beyond the bridge.')] }],
  umeda_station: [{ steps: [n('梅田駅。ガラスの大きな建物の中を、スーツの人たちが急ぎ足で通っていく。改札は、入口から入ってすぐだ。', 'Umeda Station. People in suits hurry through the big glass building. The ticket gates are just inside the entrance.')] }],
  umeda_tower: [{ steps: [n('ガラスのオフィスビルだ。窓の中で、夜までたくさんの人が働いている。', 'A glass office tower. Behind the windows many people work until night.')] }],
  umeda_stall: [{ steps: [n('広場の屋台だ。昼休みになると、スーツの人の行列ができる。', 'A stall on the square. At lunch break a queue of suited people forms.')] }],
  nakano_hall: [{ steps: [n('赤れんがの古い建物だ。屋根が青緑色に光っている。', 'An old red-brick building with a blue-green roof.')] }],
  nakano_cafe: [{ steps: [n('川の見える小さなカフェだ。昼休みの人たちが、ゆっくりコーヒーを飲んでいる。', 'A small café by the river. Lunch-break people sip coffee slowly.')] }],
  doton_shop: [{ steps: [n('お店の前に、色あざやかな看板と提灯が出ている。', 'Colourful signs and lanterns stand in front of the shop.')] }],
  doton_hall: [{ steps: [n('古い赤れんがの建物だ。昔は、劇場だったらしい。', 'An old red-brick building. It apparently used to be a theatre.')] }],
  shin_tower: [{ steps: [n('レトロな塔だ。てっぺんの展望台は、夕方になると光る。', 'A retro tower. The observation deck on top lights up in the evening.')] }],
  shin_shop: [{ steps: [n('昔ながらの店だ。おじさんたちが、店先で将棋を指している。', 'An old-style shop. Middle-aged men play shogi in front of it.')] }],
  castle_stall: [{ steps: [n('お城の下の屋台だ。観光客が、写真を撮っている。', 'A stall below the castle. Tourists are taking photos.')] }],
  o_door: [{ steps: [n('入口だ。', 'The entrance.')] }],
  // ================================================================ Osaka (chapter 6)
  kenta: [
    {
      when: { all: [{ questActive: 'mq22' }, { obj: 'mq22.arrive' }, { notObj: 'mq22.kenta' }] },
      steps: [
        say('kenta', 'あっ、森さんが言ってた方ですか！ はじめまして、健太と申します。……すみません、まだ名刺の渡し方も、ぎこちなくて。', 'Ah, you’re the person Ms. Mori mentioned! Nice to meet you, I’m Kenta. …Sorry, I’m still clumsy even at handing over a business card.', 'worried'),
        n('健太さんは、{両手|りょうて}で{名刺|めいし}を差し出した。{背筋|せすじ}は、ぴんと{伸|の}びている。けれど、{手|て}が少しふるえていた。', 'Kenta holds out his card with both hands. His back is straight, but his hands tremble a little.'),
        { do: [{ note: 'meishi_etiquette' }] },
        say('kenta', '今年の四月に入社したんです。{同期|どうき}は{十人|じゅうにん}。みんな、同じ日に入って、同じ研修を受けました。', 'I joined in April this year. There are ten of us who started on the same day and took the same training.'),
        say('kenta', '……でも、{毎日|まいにち}{夜|よる}おそくまで{残業|ざんぎょう|v:os_zangyou}で。ご{飯|はん}も、コンビニです。', '…But every day it’s overtime until late at night. And my meals come from the convenience store.'),
        say('kenta', '{課長|かちょう}は、{忙|いそが}しそうで、{質問|しつもん}できません。{のみならず||g:nominarazu}、{先輩|せんぱい}も、みんな{遅|おそ}くまで{残|のこ}っているから、先に帰りにくくて。', 'The section chief looks busy, so I can’t ask. And not only that — my seniors all stay late, so it’s hard to leave first.'),
        { teach: 'g:nominarazu' },
        { do: [{ note: 'shinsotsu' }, { objective: 'mq22.kenta' }, { rel: 'kenta', points: 1, memory: 'first_meeting' }, { learn: ['v:os_shinnyuu', 'v:os_zangyou', 'g:nominarazu'] }] },
      ],
    },
    {
      when: { all: [{ questActive: 'mq23' }, { notObj: 'mq23.kenta' }] },
      steps: [
        say('kenta', '助けてください！ 今から、取引先に電話をかけなければいけないんです。……敬語、{自信|じしん}がなくて。', 'Please help! I have to call a client right now. …I’m not confident with keigo.', 'worried'),
        {
          quiz: {
            q: '取引先の人が電話に出た。最初に言う言葉として、一番よいものはどれか。',
            qEn: 'A client picks up the phone. Which is the best opening?',
            options: ['お世話になっております。○○社の健太です', 'もしもし、健太だけど、田中さんいる？', 'あの、すみません、誰ですか', 'ええと、こんにちは、健太です'],
            answer: 0,
            why: 'Business calls open with the set phrase お世話になっております + company and name. It is polite and tells the other side who you are right away.',
          },
          keys: ['v:os_torihiki'], area: 'reading', retry: true,
        },
        say('kenta', 'なるほど。じゃあ、{用件|ようけん}は、どう言えばいいですか。上司に{確認|かくにん}してから返事をする、と伝えたいんです。', 'I see. Then how do I say my business? I want to say I’ll reply after checking with my boss.'),
        {
          quiz: {
            q: '「上司に確認してから、お返事します」を、取引先にていねいに言うとき、一番よいものはどれか。',
            qEn: 'Which is the most suitable polite way to tell a client you will reply after checking with your boss?',
            options: ['上司に確認いたしまして、改めてご連絡いたします', '上司に聞いてみて、また電話してやるよ', '上司がいいって言ったら、教えてあげます', '上司は忙しいので、たぶん無理です'],
            answer: 0,
            why: '確認いたしまして／ご連絡いたします are humble forms (謙譲語) that lower yourself and your side, which is right when speaking to an outside client.',
          },
          keys: ['v:os_shouchi'], area: 'reading', retry: true,
        },
        say('kenta', '……できた！ {電話|でんわ}、つながりました。{報告|ほうこく}・{連絡|れんらく}・{相談|そうだん}、{略|りゃく}して{報連相|ほうれんそう|v:os_hourensou}。{先輩|せんぱい}にも、これを言われました。', '…Done! The call went through. Report, inform, consult — hō-ren-sō for short. My seniors told me about it too.'),
        { do: [{ note: 'horenso' }, { objective: 'mq23.kenta' }, { give: 'meishi' }, { rel: 'kenta', points: 1, memory: 'phone_call' }, { learn: ['v:os_hourensou', 'v:os_torihiki', 'v:os_shouchi'] }] },
        say('kenta', 'ありがとうございます。……あ、そうだ。コンビニのミンさんも、同じ{悩|なや}みがあるみたいです。話を聞いてあげてください。', 'Thank you. …Oh, and Minh at the convenience store seems to have a similar worry. Please listen to her.'),
      ],
    },
    { when: { flag: 'chapter6_done' }, steps: [say('kenta', '今日、はじめて定時で帰れたんです。立花さんのおかげで、自分から「お先に失礼します」って言えました。', 'Today I left on time for the first time. Thanks to Tachibana-san I could say “excuse me for leaving first” myself.', 'happy')] },
    { steps: [say('kenta', 'この会社で、がんばります。……たぶん。', 'I’ll do my best at this company. …Probably.')] },
  ],
  minh: [
    {
      when: { all: [{ questActive: 'mq23' }, { notObj: 'mq23.minh' }] },
      steps: [
        say('minh', 'いらっしゃいませ。……あ、お客さん、日本語、じょうずですね。わたしも、JLPTのN2、勉強しています。', 'Welcome. …Oh, your Japanese is good. I’m studying for JLPT N2, too.', 'happy'),
        say('minh', 'ベトナムから来ました。昼は学校、夜と朝はコンビニです。アルバイトだけど、{週|しゅう}に{五日|いつか}、{働|はたら}いています。', 'I’m from Vietnam. School by day, convenience store at night and in the morning. It’s part-time, but I work five days a week.'),
        say('minh', '{非正規|ひせいき|v:os_hiseiki}は、{給料|きゅうりょう}が{低|ひく}くて、{休|やす}みも{少|すく}ないんです。{でも||g:monono}、{日本語|にほんご}を使う{機会|きかい}がたくさんあるから、やめるわけにはいかない。', 'Non-regular jobs pay little and give few days off. But there are lots of chances to use Japanese, so I can’t quit.'),
        { teach: 'g:wakeniwaikanai' },
        {
          quiz: {
            q: '「やめるわけにはいかない」の意味に、一番近いものはどれか。',
            qEn: 'Which is closest to 「やめるわけにはいかない」?',
            options: ['やめたくても、やめることができない事情がある', 'やめる気は、まったくない', 'やめる方法を、知らない', 'やめるほうが、ぜったいにいい'],
            answer: 0,
            why: 'わけにはいかない = cannot do it because of circumstances (duty, reasons), even if one might want to.',
          },
          keys: ['g:wakeniwaikanai'], area: 'grammar', retry: true,
        },
        say('minh', 'お{客|きゃく}さんには、いつも「ありがとうございました」と言います。……毎日、何百回も。{意味|いみ}を考えないで、言ってしまうこともあります。', 'To customers I always say “thank you very much”. …Hundreds of times a day. Sometimes I say it without thinking of its meaning.'),
        { do: [{ note: 'nonregular' }, { objective: 'mq23.minh' }, { rel: 'minh', points: 1, memory: 'first_meeting' }, { learn: ['v:os_hiseiki', 'v:os_taiguu'] }] },
      ],
    },
    { when: { flag: 'chapter6_done' }, steps: [say('minh', '立花さんに、日本語を教えてもらいました。「お疲れさま」って、本当は「あなたの努力を、見ていますよ」って意味なんですね。', 'Tachibana-san taught me some Japanese. “Otsukaresama” really means “I see your efforts”, doesn’t it.', 'happy')] },
    { steps: [say('minh', 'いらっしゃいませ。あたたかいおでんは、いかがですか。', 'Welcome. How about some warm oden?'), { shop: ['canned_coffee', 'energy_drink', 'onigiri'] }] },
  ],
  fujita: [
    {
      when: { all: [{ questActive: 'mq23' }, { obj: 'mq23.minh' }, { notObj: 'mq23.fujita' }] },
      steps: [
        say('fujita', '……ん？ ああ、健太の知り合いか。{座|すわ}れ。串カツでも{食|く}え。ソースの二度づけは禁止だぞ。', '…Hm? Ah, a friend of Kenta’s. Sit. Have some kushikatsu. No double-dipping in the sauce.'),
        n('{藤田|ふじた}課長は、{缶|かん}コーヒーを{片手|かたて}に、{串|くし}を{食|た}べていた。{目|め}の{下|した}に、{濃|こ}いくまがある。', 'Section chief Fujita eats a skewer with a can of coffee in one hand. Dark circles under his eyes.'),
        say('fujita', '新人には、「わからなかったら、すぐ聞け」と言ってる。……だが、わたし自身は、{部長|ぶちょう}に{何|なに}も聞けん。', 'I tell newcomers to ask right away if they don’t understand. …But I myself can’t ask my own department head anything.'),
        say('fujita', '{残業|ざんぎょう}が{当|あ}たり{前|まえ}の{会社|かいしゃ}で、二十年。{課長|かちょう}ともなると、{帰|かえ}りたいと{言|い}い{出|だ}せない。', 'Twenty years in a company where overtime is normal. When you’re a section chief, you can’t bring yourself to say you want to go home.'),
        { teach: 'g:tomonaruto' },
        {
          quiz: {
            q: '「課長ともなると、帰りたいと言い出せない」の意味に、一番近いものはどれか。',
            qEn: 'Which is closest to 「課長ともなると、帰りたいと言い出せない」?',
            options: ['課長のような立場になると、帰りたいとは言いにくくなる', '課長になったので、早く帰れるようになった', '課長は、いつも早く帰りたいと言う', '課長でないと、帰りたいと言えない'],
            answer: 0,
            why: 'ともなると = once you reach a (higher) position or stage, a certain thing naturally follows.',
          },
          keys: ['g:tomonaruto'], area: 'grammar', retry: true,
        },
        say('fujita', '……お前に話したら、少し{楽|らく}になったよ。{飲み会|のみかい|v:os_nomikai}も、本当は、{断|ことわ}りたいんだ。でも、{断|ことわ}れん。', '…Telling you made things a bit easier. Even the after-work drinking parties — I’d actually like to decline. But I can’t.'),
        { do: [{ note: 'nomikai' }, { note: 'overwork' }, { objective: 'mq23.fujita' }, { rel: 'fujita', points: 1, memory: 'first_meeting' }, { learn: ['v:os_kachou', 'v:os_nomikai', 'g:tomonaruto'] }] },
      ],
    },
    { when: { flag: 'chapter6_done' }, steps: [say('fujita', '今日は、{定時|ていじ}で帰るぞ。……{娘|むすめ}の{運動会|うんどうかい}を、{見|み}に行くんだ。{何年|なんねん}ぶりかな。', 'I’m leaving on time today. …I’m going to see my daughter’s sports day. How many years has it been?', 'happy')] },
    { steps: [say('fujita', '串カツは、うまいな。……明日も、早く来なきゃならん。', 'Kushikatsu is good. …I have to come in early tomorrow again.')] },
  ],
  okan: [
    {
      when: { all: [{ questActive: 'mq24' }, { notObj: 'mq24.okan' }] },
      steps: [
        say('okan', 'いらっしゃい、いらっしゃい！ たこ焼き、あつあつやで！ ……お、見かけん顔やな。観光客かいな？', 'Welcome, welcome! Piping-hot takoyaki! …Oh, I don’t recognise your face. A tourist?', 'happy'),
        say('okan', 'もうかりまっか？ ……って、お客さんには言わんか。これは、大阪の{挨拶|あいさつ}みたいなもんや。', 'Making any money? …Well, I don’t say that to customers. It’s kind of an Osaka greeting.', 'happy'),
        { do: [{ note: 'kansai' }] },
        say('okan', 'うちの店はな、四十年、この路地でたこ焼きを焼いてきたんや。……最近、夜になると、{路地|ろじ}の{奥|おく}で、{何|なに}かがぐったりしてる気がする。', 'This shop has been grilling takoyaki in this alley for forty years. …Lately at night I feel something drooping at the back of the alley.'),
        say('okan', '{提灯|ちょうちん}みたいな{光|ひかり}や。「おつかれさま、おつかれさま」って、{小|ちい}さい{声|こえ}で、{何度|なんど}も{何度|なんど}も……。', 'It’s a light like a lantern. In a tiny voice it says “otsukaresama, otsukaresama” over and over…'),
        { do: [{ objective: 'mq24.okan' }, { rel: 'okan', points: 1, memory: 'first_meeting' }, { learn: ['v:os_nagare', 'v:os_kansai'] }] },
      ],
    },
    { when: { all: [{ questActive: 'mq24' }, { obj: 'mq24.lamp' }] }, steps: [say('okan', 'ありがとうな！ ほら、これ食べて。たこ焼き、おまけや！', 'Thank you! Here, eat this. Extra takoyaki on the house!', 'happy'), { do: [{ give: 'takoyaki', n: 1 }] }, say('okan', '……そうそう、あの{背広|せびろ}の{立花|たちばな}さんに、会うてみ。{受付|うけつけ}におる。ええ人やで。', '…Oh, and go meet Tachibana in the suit. She’s at reception. A good person.')] },
    { steps: [say('okan', 'たこ焼き、いかがでっか！', 'How about some takoyaki!', 'happy'), { shop: ['takoyaki', 'okonomiyaki', 'kushikatsu'] }] },
  ],
  doton_alley: [
    {
      when: { all: [{ questActive: 'mq24' }, { obj: 'mq24.okan' }, { notObj: 'mq24.lamp' }] },
      steps: [
        n('{路地|ろじ}の{奥|おく}で、{小|ちい}さな{提灯|ちょうちん}が、ぐったりと{揺|ゆ}れている。「……おつかれさま……おつかれさま……」', 'Deep in the alley a small lantern sways limply. “…otsukaresama… otsukaresama…”'),
        {
          battle: { species: 'chouchinko', level: 29, recruitable: true, bg: 'bg_osaka_dotonbori.webp' },
          win: [
            n('チョウチンコは、{大|おお}きく{息|いき}をはいた。{何百回|なんびゃっかい}も{言|い}われた「おつかれさま」に、{気持|きも}ちが{入|はい}っていなかったのだ。', 'Chouchinko exhales deeply. The hundreds of “otsukaresama”s it heard had no feeling in them.'),
            n('@nameは、そっと{言|い}った。「{今日|きょう}も、{見|み}てたよ。お{疲|つか}れさま」。{提灯|ちょうちん}の{灯|ひ}が、やわらかく{色|いろ}づいた。', '@name says softly: “I saw you today too. Thank you for your hard work.” The lantern’s light turns gently warm.'),
            { do: [{ objective: 'mq24.lamp' }, { seen: 'chouchinko' }, { learn: ['v:os_nagare'] }] },
          ],
          lose: [n('{提灯|ちょうちん}は、{何|なに}も{言|い}わずに{揺|ゆ}れている。……{少|すこ}し{休|やす}んで、また{来|き}よう。', 'The lantern sways without a word. …Let’s rest a bit and come again.')],
        },
      ],
    },
    { steps: [n('{細|ほそ}い{路地|ろじ}。{提灯|ちょうちん}の{灯|あか}りが、{壁|かべ}にゆれている。', 'A narrow alley. Lantern light flickers on the walls.')] },
  ],
  tachibana: [
    {
      when: { all: [{ questActive: 'mq24' }, { obj: 'mq24.lamp' }, { notObj: 'mq24.tachibana' }] },
      steps: [
        say('tachibana', 'いらっしゃいませ。ようこそお越しくださいました。……おかんの店から、いらっしゃったのですね。', 'Welcome. Thank you for coming. …So you came from Okan’s shop.'),
        n('{立花|たちばな}さんは、{完璧|かんぺき}な{笑顔|えがお}で{頭|あたま}を{下|さ}げた。{声|こえ}も、{姿勢|しせい}も、{一分|いちぶ}のすきもない。', 'Tachibana bows with a perfect smile. Her voice and posture have not a gap.'),
        say('tachibana', '三十五年、この{会社|かいしゃ}の{受付|うけつけ}と{秘書|ひしょ}を{務|つと}めて{まいりました||g:nikawatte}。{新入社員|しんにゅうしゃいん}の{マナー研修|マナーけんしゅう}も、わたくしの{仕事|しごと}です。', 'For thirty-five years I have served at this company’s reception and as a secretary. Training new employees in manners is also my job.'),
        say('tachibana', '{敬語|けいご}は、{相手|あいて}を{大切|たいせつ}にする{気持|きも}ちを、{形|かたち}にしたもの。……そのはずなのです。けれど{近頃|ちかごろ}、{自分|じぶん}の{言葉|ことば}が、からっぽに{聞|き}こえて。', 'Keigo is the form that care for the other person takes. …That is what it should be. But recently my own words sound hollow to me.'),
        { do: [{ objective: 'mq24.tachibana' }, { rel: 'tachibana', points: 1, memory: 'first_meeting' }, { learn: ['v:os_nagare'] }] },
        say('tachibana', 'もし、わたくしの試練をお受けになるなら、お話しいたします。……{準備|じゅんび}が整いましたら、またお声がけください。', 'If you take up my trial, I will tell you more. …When you are ready, please call on me again.'),
      ],
    },
    {
      when: { all: [{ questActive: 'mq25' }, { notObj: 'mq25.master' }] },
      steps: [
        say('tachibana', 'では、始めましょう。敬語の{尊敬語|そんけいご}・{謙譲語|けんじょうご}を、{場面|ばめん}に{合|あ}わせて{選|えら}んでいただきます。', 'Then let us begin. You will choose between honorific and humble forms to fit each scene.'),
        {
          quiz: { q: '取引先の部長に、「資料をご覧になりましたか」の意味を伝えたい。正しいのはどれか。', qEn: 'You want to ask a client’s department head whether they have seen the document. Which is correct?',
            options: ['資料をご覧になりましたか', '資料を拝見しましたか', '資料を見られてあげましたか', '資料を見ましたでございますか'], answer: 0,
            why: 'ご覧になる is the honorific (尊敬語) of 見る: you raise the other person. 拝見する is humble and is for your own action.' },
          keys: ['v:os_shouchi'], area: 'reading', retry: true,
        },
        {
          quiz: { q: '自分が資料を受け取ったことを、取引先にていねいに伝えるとき、正しいのはどれか。', qEn: 'Which is correct for telling a client politely that you received the document?',
            options: ['資料を拝受いたしました', '資料をお受け取りになりました', '資料をいただいてくださいました', '資料を受け取りなさいました'], answer: 0,
            why: '拝受する／いただく are humble (謙譲語) forms for your own receiving. お受け取りになる would raise yourself.' },
          keys: ['v:os_shouchi'], area: 'reading', retry: true,
        },
        grammarQuiz('wotowazu', 0),
        say('tachibana', '……お見事です。{敬語|けいご}の{形|かたち}は、もう{完璧|かんぺき}ですね。最後に、{言霊|ことだま}と{向|む}き合ってください。わたくしの{疲|つか}れた{言葉|ことば}から、{生|う}まれたものです。', '…Splendid. Your keigo forms are perfect. Lastly, face a Kotodama born from my own tired words.'),
        {
          battle: { species: 'ajitanuki', level: 32, recruitable: true, bg: 'bg_osaka_umeda.webp' },
          win: [
            n('{戦|たたか}いのあと、{立花|たちばな}さんは、{長|なが}いあいだ、{黙|だま}っていた。そして、ふっと{息|いき}をはいた。', 'After the battle, Tachibana was silent for a long while. Then she let out a breath.'),
            say('tachibana', '「お疲れさま」……。{今|いま}、あなたに{言|い}われて、ほんとうに、そう{思|おも}いました。三十五年ぶりに、{言葉|ことば}が{胸|むね}に{届|とど}きました。', '“Otsukaresama”… Hearing it from you just now, I truly felt it. For the first time in thirty-five years, a word reached my heart.', 'happy'),
            say('tachibana', 'この{万年筆|まんねんひつ}を、あなたに。……あの{方|かた}は、{お城|おしろ}の{橋|はし}に、{夜明|よあ}けごろ、{立|た}っておられます。', 'Take this fountain pen. …She stands on the bridge at the castle around dawn.'),
            { do: [{ objective: 'mq25.master' }, { give: 'fountain_pen' }, { give: 'red_notebook' }, { rel: 'tachibana', points: 3, memory: 'trial_passed' }, { learn: ['v:os_shouchi', 'v:os_taiguu', 'g:wotowazu'] }] },
          ],
          lose: [say('tachibana', '{焦|あせ}らず。{言葉|ことば}には、{心|こころ}をこめてくださいませ。', 'Do not hurry. Please put your heart into your words.')],
        },
      ],
    },
    { when: { flag: 'chapter6_done' }, steps: [say('tachibana', '今日は、{受付|うけつけ}の{新人|しんじん}に、{敬語|けいご}の{前|まえ}に、{笑顔|えがお}を{教|おし}えました。……{本当|ほんとう}の{笑顔|えがお}を。', 'Today I taught the new reception staff a smile before keigo. …A real smile.', 'happy')] },
    { steps: [say('tachibana', 'いらっしゃいませ。{本日|ほんじつ}は、どのようなご用件でしょうか。', 'Welcome. What can I do for you today?')] },
  ],
  porter: [
    { steps: [say('porter', 'いらっしゃいませ。お荷物、お持ちいたします。……と、言いたいところですが、今日はホテルの{お客様|おきゃくさま}の{荷物|にもつ}で、手一杯です。', 'Welcome. I’d be glad to carry your luggage… but today my hands are full with the hotel guests’ bags.')] },
  ],
  castle_bridge: [
    {
      when: { all: [{ questActive: 'mq25' }, { obj: 'mq25.master' }, { notObj: 'mq25.castle' }] },
      steps: [
        { do: [{ music: 'lighthouse' }] },
        { cg: 'cg_osaka_castle', say: '{夜明|よあ}けの{大阪城|おおさかじょう}。{白|しろ}い{天守|てんしゅ}が、{金色|きんいろ}の{霧|きり}の{中|なか}に{浮|う}かんでいる。{橋|はし}の{向|む}こうを、{帳面|ちょうめん}を{抱|かか}えた{女|おんな}の{人|ひと}が{歩|ある}いていく。', en: 'Osaka Castle at dawn. The white keep floats in golden mist. Beyond the bridge a woman with a notebook walks away.' },
        n('@nameは、{赤|あか}い{手帳|てちょう}を{握|にぎ}りしめた。{女|おんな}の{人|ひと}が、ふと{足|あし}を{止|と}めた。……けれど、{振|ふ}り{向|む}かない。', '@name clutches the red notebook. The woman stops for a moment… but does not turn around.'),
        n('{橋|はし}の{上|うえ}に、{紙|かみ}が{一枚|いちまい}。「{言葉|ことば}は、{忙|いそが}しい{町|まち}ほど、すり{減|へ}る」。その{下|した}に、{一字|いちじ}だけ。「{東|ひがし}」。', 'A sheet lies on the bridge: “Words wear out fastest in busy towns.” Beneath it, one character: 東.'),
        {
          quiz: { q: '「言葉は、忙しい町ほどすり減る」とは、どんな意味か。', qEn: 'What does 「言葉は、忙しい町ほどすり減る」 mean?',
            options: ['忙しいと、言葉に気持ちをこめる余裕がなくなり、意味がうすくなる', '忙しい町では、言葉が増える', '忙しいほど、言葉が上手になる', '町が忙しいと、人は話さなくなる'], answer: 0,
            why: 'ほど = the busier, the more: with no time, words lose their feeling and wear thin — exactly the “empty phrases” of this chapter.' },
          keys: ['v:os_nagare'], area: 'reading', retry: true,
        },
        { do: [{ objective: 'mq25.castle' }, { give: 'old_tickets' }, { learn: ['g:nihokanaranai', 'v:os_nagare'] }, { seen: 'neongitsune' }] },
        { cg: 'cg_osaka_arrival', say: '{言葉|ことば}は、すり{減|へ}っても、{磨|みが}けば、また{光|ひか}る。\n― 第六章「大阪」完 ―', en: 'Words may wear thin, but polish them and they shine again.\n— Chapter 6 “Osaka” complete —' },
        n('Chapter 6 complete! Osaka stays open: takoyaki with Okan, the shops, the wild Kotodama at the castle and your Japan notes. Chapter 7 (Tokyo) is ready — take the Shinkansen from Hinomori station after talking to Ms. Mori.'),
      ],
    },
    { steps: [n('{お城|おしろ}の{橋|はし}。{朝|あさ}の{光|ひかり}の{中|なか}を、ジョギングの{人|ひと}たちが{走|はし}っていく。', 'The castle bridge. Joggers run through the morning light.')] },
  ],
  trash: [{ steps: [n('駅のゴミ箱だ。「カン・ビン」「ペットボトル」「その他」に分かれている。', 'The station bins: “cans & bottles”, “PET bottles”, “other”.'), { do: [{ note: 'bunbetsu' }] }] }],
  barrel: [{ steps: [n('ラーメン屋の裏の{雨水|あまみず}をためる{樽|たる}だ。', 'A rain barrel behind the ramen shop.')] }],
  ...TOKYO_SCRIPTS,
  ...ROOMS2_SCRIPTS,
};

// the first trips to Osaka and Tokyo start in Hinomori (station_building) but the quest also names Kyoto station: the same
// arrival there, so nobody is stuck in Kyoto; and a hint when Ms. Mori has not been talked to yet
{
  const hinomori = SCRIPTS.station_building;
  const arrival = (quest: string) => hinomori.find((r) => JSON.stringify(r.when ?? {}).includes(`"questActive":"${quest}"`) && JSON.stringify(r.when).includes(`${quest}.arrive`))!;
  const fromKyoto = (quest: string, city: string): DialogueRule[] => {
    const a = arrival(quest);
    return [
      { when: a.when, steps: [n(`京都駅。${city}へ向かう新幹線が、ホームで待っている。`, `Kyoto Station. The Shinkansen to ${city === '大阪' ? 'Osaka' : 'Tokyo'} waits at the platform.`), ...a.steps.slice(1)] },
      {
        when: { all: [{ questActive: quest }, { notObj: `${quest}.mori` }] },
        steps: [n(`${city}へ行く前に、日野森の森さんに話を聞こう。まず、日野森へ戻る電車に乗る。`, `Before going to ${city === '大阪' ? 'Osaka' : 'Tokyo'}, talk to Ms. Mori in Hinomori. First take the train back to Hinomori.`), { do: [{ open: 'board:kyoto' }] }],
      },
    ];
  };
  SCRIPTS.kyoto_station.unshift(...fromKyoto('mq22', '大阪'), ...fromKyoto('mq26', '東京'));
}

// little scenes in the world and chapter pictures at the lines they belong to (content/scenes.ts)
applyBeats(SCRIPTS);
