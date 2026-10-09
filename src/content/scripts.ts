import type { DialogueRule, Step } from '../core/script';
import { GRAMMAR_BY_ID } from './grammar';
import { DECO_CATALOG, SPECIES } from './creatures';

/**
 * All interaction scripts, keyed by NPC id or map-object id.
 * The first rule whose `when` condition matches is played.
 * Dialogue is in Japanese with optional English (shown on demand).
 */

const say = (who: string | undefined, text: string, en?: string): Step => ({ say: text, who, en });
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
              then: [{ do: [{ sleep: true }] }, n('ぐっすり眠った。言霊たちも元気になった！', 'You slept well. Your Kotodama are fully healed!')],
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
        { do: [{ objective: 'mq1.mori' }, { rel: 'mori', points: 2, memory: 'first_meeting' }, { learn: ['v:otagaisama', 'g:wakedewanai', 'g:tsuideni'] }] },
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
        { cg: 'cg_ending', say: '夕暮れの研究所。欠片の光は、まだ消えていなかった。\n― 第一章「日野森の夏」完 ―', en: 'Dusk at the research facility. The fragment’s light had not gone out yet.\n— End of Chapter 1: “Summer in Hinomori” —' },
        { cg: 'cg_chapter2', say: '次章予告 ― 第二章「線路の向こうの街」（準備中）', en: 'Next time — Chapter 2: “The City Beyond the Tracks” (in development)' },
        n('Chapter 1 complete! Hinomori stays open: keep befriending Kotodama in Midori Forest, finish side quests, and use your desk to review and track your N2 readiness. Chapter 2 is in development.'),
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
  station_building: [{ steps: [n('日野森駅。小さいが、町の人にとって大切な駅だ。', 'Hinomori Station. Small, but important to the townspeople.')] }],
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
  konbini_atm: [{ steps: [n('ATMだ。{手数料|てすうりょう}がかかるので、{必要|ひつよう}な時だけ使おう。', 'An ATM. It charges a fee, so only use it when you need to.')] }],
  konbini_trash: [{ steps: [n('ゴミ箱が三つ{並んで|ならんで}いる。ペットボトル、{燃える|もえる}ゴミ、{缶|かん}・びん。{分別|ぶんべつ}してから{捨てよう|すてよう}。', 'Three bins: PET bottles, burnable, cans/bottles. Sort before you throw away.')] }],
  konbini_baskets: [{ steps: [n('買い物かごだ。{使い終わったら|つかいおわったら}元の{場所|ばしょ}に{戻す|もどす}こと。', 'Shopping baskets. Put them back where they belong after use.')] }],
  konbini_counter: [{ steps: [n('レジの横に、肉まんとおでんのケースがある。いいにおいだ。', 'Next to the register are cases of steamed buns and oden. Smells good.')] }],
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
  station_gate: [{ steps: [n('{改札|かいさつ}だ。電車が動いていないので、{通れ|とおれ}ないようになっている。', 'The ticket gates. With no trains running, they are closed.')] }],
  kitchen: [{ steps: [n('小さなキッチンだ。一人分の料理なら、ここで十分作れる。', 'A small kitchen. Enough to cook for one.')] }],
  nightstand: [{ steps: [n('ベッドの横の小さな棚だ。目覚まし時計は六時に{設定|せってい}してある。', 'A little shelf by the bed. The alarm is set for six.')] }],
  wardrobe: [{ steps: [n('{洋服|ようふく}ダンスだ。{引っ越し|ひっこし}の荷物はまだ半分しか片付いていない。', 'A wardrobe. Only half of the moving boxes are unpacked so far.')] }],
  tv: [{ steps: [n('テレビをつけると、天気予報をやっていた。「明日は全国的に晴れるでしょう。」', 'You switch on the TV: the weather forecast. “Tomorrow will be sunny nationwide.”')] }],
  fridge: [{ steps: [n('冷蔵庫の中には、牛乳と卵と、{賞味期限|しょうみきげん}が{切れ|きれ}そうなヨーグルトがある。', 'In the fridge: milk, eggs and a yoghurt about to pass its best-before date.')] }],
  shoes: [{ steps: [n('{靴箱|くつばこ}だ。日本では家に入るとき、玄関で靴を{脱ぐ|ぬぐ}。', 'A shoe cabinet. In Japan you take off your shoes at the entrance.')] }],
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
  mirror: [{ steps: [n('カーブミラーだ。自分の顔が少しゆがんで映っている。', 'A traffic mirror. Your reflection looks a little warped.')] }],
  nosign: [
    {
      steps: [
        n('「{進入禁止|しんにゅうきんし}」の標識だ。研究所の前の道は、車が入れないらしい。', 'A “No entry” sign. Cars can’t use the road in front of the facility.'),
        n('（「{立入禁止|たちいりきんし|v:tachiirikinshi}」は人が入ってはいけない場所。「進入禁止」は車などが入ってはいけない道。）', '(立入禁止 = people may not enter. 進入禁止 = vehicles may not enter.)'),
        { do: [{ learn: ['v:tachiirikinshi'] }] },
      ],
    },
  ],
  trash: [{ steps: [n('駅のゴミ箱だ。「カン・ビン」「ペットボトル」「その他」に分かれている。', 'The station bins: “cans & bottles”, “PET bottles”, “other”.')] }],
  barrel: [{ steps: [n('ラーメン屋の裏の{雨水|あまみず}をためる{樽|たる}だ。', 'A rain barrel behind the ramen shop.')] }],
};
