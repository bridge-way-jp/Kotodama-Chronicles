import type { ListeningItem, ReadingText } from '../core/types';

/**
 * Text markup used everywhere in the game:
 *   {漢字|かんじ}          furigana only
 *   {言い訳|いいわけ|v:iiwake}  furigana + glossary link to a vocab/grammar/kanji card
 *   {わけではない||g:wakedewanai} link without furigana
 *   @name                  the player's name
 *
 * All texts are original and written for this game.
 */

export const READINGS: Record<string, ReadingText> = {
  r_mori_letter: {
    id: 'r_mori_letter',
    title: '大家さんからの手紙',
    kind: 'letter',
    body:
      '@nameさんへ\n\n' +
      '日野森へようこそ。長旅お{疲|つか}れさまでした。\n' +
      'お部屋の{鍵|かぎ}は、この手紙と一緒に{机|つくえ}の上に置いておきます。\n\n' +
      'それから、ゴミの出し方について少しだけ。{燃|も}えるゴミの{収集|しゅうしゅう|v:shuushuu}日は月曜日と木曜日です。朝八時までに出してくださいね。{分別|ぶんべつ|v:bunbetsu}のルールはアパートの{掲示板|けいじばん|v:keijiban}に{貼|は}ってあります。\n\n' +
      '落ち着いたら、一度アパートの前まで来てください。町を案内しますよ。困ったことがあれば、{遠慮|えんりょ|v:enryo}なく声をかけてくださいね。\n\n' +
      '{大家|おおや|v:ooya}　森 千代',
    en:
      'Dear @name,\nWelcome to Hinomori. You must be tired after the long trip. I left the key to your room on the desk together with this letter.\n' +
      'Also, a little about the garbage: burnable garbage is collected on Mondays and Thursdays. Please put it out by 8 a.m. The sorting rules are posted on the apartment bulletin board.\n' +
      'Once you have settled in, please come to the front of the apartment. I will show you around town. If anything troubles you, don’t hesitate to ask.\nYour landlady, Chiyo Mori',
    vocab: ['shuushuu', 'bunbetsu', 'keijiban', 'enryo', 'ooya'],
    grammar: [],
    questions: [
      {
        q: '燃えるゴミは、いつ出さなければならないか。',
        qEn: 'When must burnable garbage be put out?',
        options: ['月曜日と木曜日の朝八時まで', '毎日、朝八時から', '月曜日と木曜日の夜', '掲示板に書いてある日'],
        answer: 0,
        why: '「収集日は月曜日と木曜日です。朝八時までに出してください」とある。',
        type: 'detail',
      },
      {
        q: '森さんが@nameにしてほしいことは何か。',
        qEn: 'What does Ms. Mori want @name to do?',
        options: ['落ち着いたら、アパートの前に来ること', 'すぐに鍵を返しに来ること', '掲示板にルールを貼ること', '町を一人で案内すること'],
        answer: 0,
        why: '「落ち着いたら、一度アパートの前まで来てください」= after you’ve settled in.',
        type: 'main',
      },
    ],
  },

  r_konbini_notice: {
    id: 'r_konbini_notice',
    title: 'コンビニの張り紙',
    kind: 'notice',
    body:
      '【お客様へのお知らせ】\n' +
      '現在、「{日野森|ひのもり}{緑茶|りょくちゃ}」は{品切れ|しなぎれ|v:shinagire}となっております。\n' +
      'ご希望のお客様には、お{取り寄せ|とりよせ|v:toriyoseru}も{承|うけたまわ}ります。（{入荷|にゅうか}まで一週間ほどかかります）\n' +
      'ご{迷惑|めいわく|v:meiwaku}をおかけしますが、よろしくお願いいたします。\n\n' +
      '　　コンビニ ひのもり{店|てん}',
    en:
      'Notice to customers: "Hinomori Green Tea" is currently out of stock. For customers who want it, we can also order it in (it takes about a week to arrive). We apologise for the inconvenience.',
    vocab: ['shinagire', 'toriyoseru', 'meiwaku'],
    grammar: [],
    questions: [
      {
        q: 'この張り紙によると、日野森緑茶がほしい客はどうすればいいか。',
        qEn: 'According to the notice, what can a customer who wants the tea do?',
        options: ['店に取り寄せを頼む', '一週間後に別の店へ行く', '店員に在庫を探してもらう', '今日中に予約する'],
        answer: 0,
        why: '「お取り寄せも承ります」= the shop will order it in.',
        type: 'detail',
      },
    ],
  },

  r_mystery_letter: {
    id: 'r_mystery_letter',
    title: '差出人のない手紙',
    kind: 'letter',
    body:
      'まだ見ぬ言葉を探す人へ\n\n' +
      'この町では今、言葉が少しずつ消えている。けれど、忘れられた言葉は、ただ消えてしまう{わけではない||g:wakedewanai}。形を変えて、どこかで{誰|だれ}かを待っているのだ。\n\n' +
      '最初の{手がかり|てがかり|v:tegakari}は駅にある。古い{掲示板|けいじばん|v:keijiban}の前で、{耳を澄ませて|みみをすませて|v:mimiwosumasu}ほしい。\n\n' +
      '言葉を大切にする君だ{からこそ||g:karakoso}、この{謎|なぞ|v:nazo}を{託|たく}したい。\n\n' +
      '　　―― K',
    en:
      'To the one who searches for words not yet seen,\nIn this town, words are now slowly disappearing. But forgotten words do not simply vanish. They change their shape and wait for someone, somewhere.\n' +
      'The first clue is at the station. Listen carefully in front of the old bulletin board.\nIt is precisely because you treasure words that I want to entrust this mystery to you.\n— K',
    vocab: ['tegakari', 'keijiban', 'mimiwosumasu', 'nazo'],
    grammar: ['wakedewanai', 'karakoso'],
    questions: [
      {
        q: '筆者によると、忘れられた言葉はどうなるのか。',
        qEn: 'According to the writer, what happens to forgotten words?',
        options: ['形を変えて、どこかで待っている', '完全に消えてしまう', '駅の掲示板に書かれる', '大切にする人の記憶に戻る'],
        answer: 0,
        why: '「ただ消えてしまうわけではない。形を変えて…待っている」— わけではない denies “they simply vanish”.',
        type: 'main',
      },
      {
        q: '@nameは次にどこへ行けばいいか。',
        qEn: 'Where should @name go next?',
        options: ['駅の古い掲示板の前', '町の図書館', '喫茶店の裏', '森の祠'],
        answer: 0,
        why: '「最初の手がかりは駅にある。古い掲示板の前で…」',
        type: 'detail',
      },
      {
        q: '筆者が@nameにこの謎を託した理由は何か。',
        qEn: 'Why does the writer entrust the mystery to @name?',
        options: ['@nameが言葉を大切にする人だから', '@nameが町に引っ越してきたから', '@nameが駅の近くに住んでいるから', '@nameが筆者の友達だから'],
        answer: 0,
        why: '「言葉を大切にする君だからこそ」— からこそ emphasises this exact reason.',
        type: 'intent',
      },
    ],
  },

  r_forest_stone: {
    id: 'r_forest_stone',
    title: '祠の石碑',
    kind: 'inscription',
    body:
      'ここに{刻|きざ|v:kizamu}まれた言葉は、人々の{記憶|きおく|v:kioku}を守るためのものである。\n\n' +
      '人が言葉を忘れるにつれて、{言霊|ことだま|v:kotodama}は力を{失|うしな|v:ushinau}い、やがて姿を変える。しかし、その言葉を再び呼ぶ者が現れれば、言霊は{蘇|よみがえ|v:yomigaeru}る。\n\n' +
      '言葉を呼ぶ者よ、{恐|おそ}れることなかれ。',
    en:
      'The words carved here exist to protect people’s memories.\nAs people forget words, the Kotodama lose their power and eventually change their form. But if someone appears who calls those words again, the Kotodama will be revived.\nYou who call the words — do not be afraid.',
    vocab: ['kizamu', 'kioku', 'kotodama', 'ushinau', 'yomigaeru'],
    grammar: ['nitsurete'],
    questions: [
      {
        q: '石碑によると、言霊が力を失うのはなぜか。',
        qEn: 'According to the inscription, why do Kotodama lose their power?',
        options: ['人が言葉を忘れていくから', '石碑の文字が消えたから', '森が暗くなったから', '言葉を呼ぶ者が恐れたから'],
        answer: 0,
        why: '「人が言葉を忘れるにつれて、言霊は力を失い」— につれて = proportional change.',
        type: 'detail',
      },
      {
        q: '言霊が蘇るためには、何が必要か。',
        qEn: 'What is needed for the Kotodama to be revived?',
        options: ['その言葉をもう一度呼ぶ人', '新しい石碑', '町の人全員の記憶', '森の祠への参拝'],
        answer: 0,
        why: '「その言葉を再び呼ぶ者が現れれば、言霊は蘇る」',
        type: 'inference',
      },
    ],
  },

  r_library_essay: {
    id: 'r_library_essay',
    title: '佐藤先生のコラム「言葉の寿命」',
    kind: 'essay',
    body:
      '言葉にも{寿命|じゅみょう}がある、と私は考えている。使われなくなった言葉は、少しずつ人々の{記憶|きおく|v:kioku}から{薄れて|うすれて|v:usureru}いく。\n\n' +
      'しかし、古い言葉が使われなくなるのは、必ずしも悪いことだという{わけではない||g:wakedewanai}。社会が変われば、必要な言葉も変わるものだ。\n\n' +
      '大切なのは、言葉が消えることそのものではなく、その言葉と一緒に、人々の思いまで忘れられてしまうことではないだろうか。',
    en:
      'I believe words have a lifespan. Words that are no longer used gradually fade from people’s memories.\nHowever, it is not necessarily a bad thing that old words fall out of use. When society changes, the words it needs change too.\nWhat matters, perhaps, is not that words disappear, but that people’s feelings are forgotten together with them.',
    vocab: ['kioku', 'usureru'],
    grammar: ['wakedewanai', 'monoda'],
    questions: [
      {
        q: '筆者が最も言いたいことは何か。',
        qEn: 'What is the author’s main point?',
        options: [
          '言葉と一緒に人々の思いが忘れられることが問題だ',
          '古い言葉が使われなくなるのは悪いことだ',
          '社会が変わっても、言葉は変わらない',
          '言葉の寿命は短いほうがいい',
        ],
        answer: 0,
        why: '最後の段落「大切なのは…人々の思いまで忘れられてしまうことではないだろうか」が主張。',
        type: 'main',
      },
      {
        q: '「必ずしも悪いことだというわけではない」とあるが、筆者の考えに合うのはどれか。',
        qEn: 'Which matches the author’s view in “not necessarily a bad thing”?',
        options: [
          '言葉が使われなくなることには、悪くない面もある',
          '言葉が使われなくなるのは、絶対に悪い',
          '言葉が消えることは、いつもいいことだ',
          '古い言葉はすべて忘れるべきだ',
        ],
        answer: 0,
        why: 'わけではない is a partial denial: it isn’t (always) bad — not that it is always good.',
        type: 'expression',
      },
    ],
  },
};

export const LISTENING: Record<string, ListeningItem> = {
  l_station: {
    id: 'l_station',
    title: '駅のアナウンス',
    lines: [
      { who: 'アナウンス', jp: 'お客様にご案内いたします。', voice: 'm' },
      { who: 'アナウンス', jp: 'ただいま、信号トラブルの影響で、みどり線の上り電車に遅延が発生しております。', voice: 'm' },
      { who: 'アナウンス', jp: '運転再開は、十時半ごろを予定しております。', voice: 'm' },
      { who: 'アナウンス', jp: 'お急ぎのところ、ご迷惑をおかけして申し訳ございません。', voice: 'm' },
    ],
    en:
      'Attention please. Due to a signal problem, inbound trains on the Midori Line are currently delayed. Service is scheduled to resume at around 10:30. We apologise for the inconvenience while you are in a hurry.',
    vocab: ['chien', 'eikyou', 'saikai', 'meiwaku'],
    questions: [
      {
        q: 'どの電車が遅れていますか。',
        qEn: 'Which trains are delayed?',
        options: ['みどり線の上り電車', 'みどり線の下り電車', 'すべての電車', '十時半の電車だけ'],
        answer: 0,
        why: '「みどり線の上り電車に遅延が発生しております」',
        type: 'detail',
      },
      {
        q: '電車が遅れている原因は何ですか。',
        qEn: 'What is the cause of the delay?',
        options: ['信号のトラブル', '大雨', '事故', '車両の点検'],
        answer: 0,
        why: '「信号トラブルの影響で」',
        type: 'detail',
      },
      {
        q: '運転はいつ再開する予定ですか。',
        qEn: 'When is service expected to resume?',
        options: ['十時半ごろ', '十時ごろ', '十一時半ごろ', 'まだわからない'],
        answer: 0,
        why: '「運転再開は、十時半ごろを予定しております」',
        type: 'detail',
      },
    ],
  },
  l_konbini: {
    id: 'l_konbini',
    title: '常連さんの注文',
    lines: [
      { who: '常連さん', jp: 'いつものお茶、また品切れなの？', voice: 'm' },
      { who: '常連さん', jp: '急いでいるわけではないから、取り寄せてもらえるかな。来週でもかまわないよ。', voice: 'm' },
      { who: '常連さん', jp: 'あ、それと、今日の分の領収書もお願いね。', voice: 'm' },
    ],
    en:
      'Is my usual tea out of stock again? I’m not in a hurry, so could you order it in for me? Next week is fine. Oh, and a receipt for today’s purchase, please.',
    vocab: ['shinagire', 'toriyoseru', 'ryoushuusho'],
    questions: [
      {
        q: '常連さんは何をしてほしいと言っていますか。',
        qEn: 'What does the regular customer want?',
        options: ['お茶を取り寄せてほしい', '今すぐお茶がほしい', '別のお茶をすすめてほしい', '代金を返してほしい'],
        answer: 0,
        why: '「取り寄せてもらえるかな」— and 急いでいるわけではない = he isn’t in a hurry.',
        type: 'main',
      },
      {
        q: 'ほかに何を頼みましたか。',
        qEn: 'What else did he ask for?',
        options: ['今日の分の領収書', '新しい袋', 'お弁当を温めること', 'ポイントカード'],
        answer: 0,
        why: '「今日の分の領収書もお願いね」',
        type: 'detail',
      },
    ],
  },
  l_cafe_talk: {
    id: 'l_cafe_talk',
    title: 'カフェでの会話',
    lines: [
      { who: '女', jp: 'ねえ、明日の発表の準備、もう終わった？', voice: 'f' },
      { who: '男', jp: 'うーん、資料はできたんだけど、まだ一回も練習してないんだ。', voice: 'm' },
      { who: '女', jp: 'え、大丈夫？じゃあ、今から私が聞いてあげようか。', voice: 'f' },
      { who: '男', jp: '本当？助かる。でも先に、コピーだけしてくるね。', voice: 'm' },
    ],
    en:
      'W: Hey, are you done preparing for tomorrow’s presentation? M: Hmm, the handout is done, but I haven’t practised even once. W: Huh, are you OK? Shall I listen to you now? M: Really? That would help. But first I’ll go make the copies.',
    vocab: ['happyou'],
    questions: [
      {
        q: '男の人はこのあとまず何をしますか。',
        qEn: 'What will the man do first?',
        options: ['資料をコピーする', '発表の練習をする', '資料を作る', '先生に相談する'],
        answer: 0,
        why: '「でも先に、コピーだけしてくるね」— 先に = first. Typical N2 task-based listening.',
        type: 'detail',
      },
    ],
  },
  l_kotodama_call: {
    id: 'l_kotodama_call',
    title: '掲示板の声',
    lines: [
      { who: '？？？', jp: '……だれか……わたしの声が、聞こえる……？', voice: 'f' },
      { who: '？？？', jp: '忘れられた言葉は、ここで眠っている。呼んでくれる人を、ずっと待っていたの。', voice: 'f' },
    ],
    en: '…Someone… can you hear my voice…? Forgotten words sleep here. I have been waiting all this time for someone to call them.',
    vocab: ['kotodama'],
    questions: [
      {
        q: '声の主は何を待っていたと言っていますか。',
        qEn: 'What does the voice say it was waiting for?',
        options: ['言葉を呼んでくれる人', '電車の運転再開', '新しい掲示板', '朝になること'],
        answer: 0,
        why: '「呼んでくれる人を、ずっと待っていたの」',
        type: 'detail',
      },
    ],
  },
};
