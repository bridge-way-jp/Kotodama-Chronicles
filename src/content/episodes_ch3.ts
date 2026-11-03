import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 3 (Yukimi, the snow village): Grandma Tsuru, Hina and Dr. Fujii, Mr. Kuroda, Jōkan-oshō. */
export const EPISODES_CH3: Episode[] = [
  // ------------------------------------------------------------------ Grandma Tsuru: the home she writes down
  {
    id: 'ep_tsuru',
    chapter: 3,
    after: 'mq10',
    who: 'tsuru',
    title: ['書き留めた故郷', 'The Home She Writes Down', 'Die Heimat, die sie aufschreibt'],
    summary: [
      'Grandma Tsuru’s granddaughter in the city no longer understands the village dialect. Tsuru has started a secret notebook.',
      'Oma Tsurus Enkelin in der Stadt versteht den Dialekt des Dorfes nicht mehr. Tsuru hat ein heimliches Heft angefangen.',
    ],
    scenes: [
      {
        at: 'tsuru',
        goal: ['Ask Grandma Tsuru what she is writing', 'Frag Oma Tsuru, was sie schreibt'],
        music: 'snow',
        lines: [
          l('tsuru', 'あら、@name様。こんな雪の日に、ようこそ。……ああ、これでございますか。孫への{便り|たより|v:tayori}でございます。', [
            'Oh, @name, welcome on such a snowy day. …Ah, this? It’s a letter to my granddaughter.',
            'Ach, @name, willkommen an so einem Schneetag. …Ach, das hier? Ein Brief an meine Enkelin.',
          ]),
          l('tsuru', 'この前、電話で村の{方言|ほうげん|v:hougen}を使いましたら、孫に「おばあちゃん、何言ってるかわからない」と笑われまして。', [
            'The other day I used the village dialect on the phone, and my granddaughter laughed: “Grandma, I don’t understand what you’re saying.”',
            'Neulich habe ich am Telefon den Dialekt des Dorfes benutzt, und meine Enkelin hat gelacht: „Oma, ich verstehe nicht, was du sagst.“',
          ], 'worried'),
          l('tsuru', 'わたしがいなくなれば、この言葉も消えてしまう。そう思うと、寂しく{てならない||g:tenaranai}のです。', [
            'When I am gone, these words will disappear too. When I think of that, I can’t help feeling lonely.',
            'Wenn ich nicht mehr bin, verschwinden auch diese Worte. Wenn ich daran denke, werde ich so einsam.',
          ], 'worried'),
          l('tsuru', 'ですから、村の言葉を一つずつ、ノートに{書き留めて|かきとめて|v:kakitomeru}おりますの。古い家の囲炉裏のそばに、置いてございます。', [
            'So I am writing down the village words one by one in a notebook. It is by the hearth in the old farmhouse.',
            'Deshalb schreibe ich die Wörter des Dorfes eins nach dem anderen in ein Heft. Es liegt am Herd im alten Bauernhaus.',
          ]),
        ],
        teach: ['v:tayori', 'v:hougen', 'v:kakitomeru', 'g:tenaranai'],
      },
      {
        at: 'yukimi_gassho',
        goal: ['Find Grandma Tsuru’s notebook in the old farmhouse', 'Finde Oma Tsurus Heft im alten Bauernhaus'],
        evening: true,
        music: 'memory',
        lines: [
          nar('{積雪|せきせつ|v:sekisetsu}は二メートル。古い家の中は{薄暗く|うすぐらく}、囲炉裏の火だけが赤い。', [
            'The snow lies two metres deep. Inside the old house it is dim, and only the fire in the hearth glows red.',
            'Der Schnee liegt zwei Meter hoch. Im alten Haus ist es dämmrig, nur das Feuer im Herd glüht rot.',
          ]),
          nar('ノートには、震える字で、方言とその意味が並んでいた。「しみる――{凍える|こごえる|v:kogoeru}ほど寒い」「ぬくい――あたたかい」', [
            'In the notebook, in shaky writing, dialect words and their meanings are lined up. “Shimiru — so cold you freeze.” “Nukui — warm.”',
            'Im Heft stehen in zittriger Schrift Dialektwörter und ihre Bedeutung. „Shimiru – so kalt, dass man erfriert.“ „Nukui – warm.“',
          ]),
          nar('最後のページだけ、意味が書いていなかった。「おらほの{故郷|こきょう|v:kokyou}は、おめえだ」', [
            'Only the last page has no meaning written down: “Ora-ho no kokyō wa, omē da.”',
            'Nur auf der letzten Seite fehlt die Bedeutung: „Ora-ho no kokyō wa, omē da.“',
          ]),
          nar('ページの隅に、小さな{独り言|ひとりごと|v:n2_1511}のような文字。「これだけは、意味を書かずに、会って言いたい」', [
            'In the corner of the page, small letters like a murmur to herself: “This one I want to say face to face, without writing the meaning.”',
            'In der Ecke der Seite, klein, wie ein Selbstgespräch: „Das hier will ich ihr persönlich sagen, ohne die Bedeutung aufzuschreiben.“',
          ]),
        ],
        teach: ['v:sekisetsu', 'v:kogoeru', 'v:kokyou', 'v:n2_1511'],
      },
      {
        at: 'tsuru',
        goal: ['Ask Grandma Tsuru about the last page', 'Frag Oma Tsuru nach der letzten Seite'],
        music: 'snow',
        lines: [
          l('tsuru', 'まあ、読まれてしまいましたか。……「わたしの故郷は、あなたです」という意味でございます。', [
            'Oh dear, you read it. …It means: “My home is you.”',
            'Ach, Sie haben es gelesen. …Es bedeutet: „Meine Heimat bist du.“',
          ]),
          l('tsuru', '孫に会って伝えない{ことには||g:naikotoniwa}、このノートは終われません。でも、この雪では、町までは……。', [
            'Unless I meet my granddaughter and tell her, this notebook can’t be finished. But with this snow, to the city…',
            'Solange ich meiner Enkelin das nicht persönlich sage, kann dieses Heft nicht fertig werden. Aber bei diesem Schnee, bis in die Stadt…',
          ], 'worried'),
          ask(
            ['お孫さんに、この村へ来てもらったら？', ['Why not ask your granddaughter to come to the village?', 'Warum bitten Sie Ihre Enkelin nicht, ins Dorf zu kommen?']],
            ['手紙に、「会いたい」と書いてみたら？', ['Why not write “I want to see you” in your letter?', 'Warum schreiben Sie nicht „Ich möchte dich sehen“ in den Brief?']],
          ),
          l('tsuru', '……そうですね。{素直|すなお|v:n2_0973}に「会いたい」と書けばよかったのですね。年を取ると、かえって言えなくなるものでございます。', [
            '…You’re right. I should simply have written “I want to see you”. The older one gets, the harder it is to say.',
            '…Sie haben recht. Ich hätte einfach „Ich möchte dich sehen“ schreiben sollen. Je älter man wird, desto schwerer fällt es einem.',
          ]),
          nar('――雪解けの頃。つるさんから、短い手紙が届いた。', ['— When the snow melts, a short letter arrives from Tsuru.', '— Zur Zeit der Schneeschmelze kommt ein kurzer Brief von Tsuru.']),
          nar('「孫が来てくれました。最後のページを読んであげたら、{漸く|ようやく|v:n2_1839}わたしの方言で、こう返してくれたのです。『おらほの故郷も、ばあちゃんだ』」', [
            '“My granddaughter came. When I read her the last page, at last she answered me in my own dialect: ‘My home is you too, Grandma.’”',
            '„Meine Enkelin ist gekommen. Als ich ihr die letzte Seite vorlas, hat sie mir endlich in meinem Dialekt geantwortet: ‚Meine Heimat bist auch du, Oma.‘“',
          ]),
          pic('cg_heart_tsuru', '雪の夜の囲炉裏端。つるさんが、ノートの最後のページを、そっと閉じた。', [
            'By the hearth on a snowy night. Tsuru gently closes the last page of her notebook.',
            'Am Herd in einer Schneenacht. Tsuru schließt behutsam die letzte Seite ihres Hefts.',
          ]),
          l('tsuru', '言葉は、生きている{限り||g:kagiri}、人から人へ渡せるものでございますね。@name様、{改めて|あらためて|v:n2_0163}、お礼を申し上げます。', [
            'As long as one lives, words can be passed from person to person. @name, once again, thank you.',
            'Solange man lebt, kann man Worte von Mensch zu Mensch weitergeben. @name, noch einmal: vielen Dank.',
          ], 'happy'),
        ],
        teach: ['v:n2_0973', 'v:n2_1839', 'v:n2_0163', 'g:naikotoniwa', 'g:kagiri'],
        give: ['amazake', 1],
      },
    ],
  },

  // ------------------------------------------------------------------ Hina and Dr. Fujii: the child who waits for the thaw
  {
    id: 'ep_hina',
    chapter: 3,
    after: 'mq11',
    who: 'hina',
    title: ['雪解けを待つ子', 'The Child Who Waits for the Thaw', 'Das Kind, das auf die Schneeschmelze wartet'],
    summary: [
      'Hina is always cheerful. But her mother has been in a city hospital since autumn.',
      'Hina ist immer fröhlich. Aber ihre Mutter liegt seit dem Herbst in einem Krankenhaus in der Stadt.',
    ],
    scenes: [
      {
        at: 'hina',
        goal: ['Play with Hina by the snow hut', 'Spiel mit Hina an der Schneehütte'],
        music: 'snow',
        lines: [
          l('hina', '@name！ 見て見て、かまくら、大きくできたでしょ！', ['@name! Look, look, I made the snow hut really big!', '@name! Schau mal, ich hab die Schneehütte richtig groß gebaut!'], 'happy'),
          l('hina', 'お母さんが帰ってきたら、ここで一緒にお餅を焼くんだ。お母さん、町の病院にいるの。でも、{平気|へいき|v:n2_1609}だよ！', [
            'When Mum comes home, we’ll toast mochi in here together. Mum is in hospital in the city. But I’m fine!',
            'Wenn Mama nach Hause kommt, rösten wir hier zusammen Mochi. Mama liegt in der Stadt im Krankenhaus. Aber mir geht’s gut!',
          ], 'happy'),
          nar('そう言って笑うひなちゃんの{瞳|ひとみ|v:n2_1509}が、少しだけ揺れていた。', ['As Hina laughs, her eyes waver just a little.', 'Als Hina lacht, flackern ihre Augen ein klein wenig.']),
          l('hina', '……本当はね、会いたく{てたまらない||g:tetamaranai}。でも、泣いたら、お母さんが心配するから。', [
            '…Actually, I miss her so much I can hardly bear it. But if I cry, Mum will worry.',
            '…Eigentlich vermisse ich sie so sehr, dass ich es kaum aushalte. Aber wenn ich weine, macht sich Mama Sorgen.',
          ], 'worried'),
          l('hina', '藤井先生なら、お母さんのこと、何か知ってるかも。わたし、こわくて聞けないの。', [
            'Dr. Fujii might know something about Mum. I’m too scared to ask.',
            'Frau Dr. Fujii weiß vielleicht etwas über Mama. Ich trau mich nicht zu fragen.',
          ]),
        ],
        teach: ['v:n2_1609', 'v:n2_1509', 'g:tetamaranai'],
      },
      {
        at: 'fujii',
        goal: ['Ask Dr. Fujii at the clinic about Hina’s mother', 'Frag Frau Dr. Fujii in der Praxis nach Hinas Mutter'],
        lines: [
          l('fujii', 'ひなちゃんのお母さんのことね。……秋に倒れて、一時は{重体|じゅうたい|v:n2_0835}だったの。', [
            'Hina’s mother… She collapsed in the autumn, and for a while she was in a critical condition.',
            'Hinas Mutter… Sie ist im Herbst zusammengebrochen und war eine Zeit lang in kritischem Zustand.',
          ], 'worried'),
          l('fujii', 'この村の{診療所|しんりょうじょ|v:shinryoujo}では、できることが限られていて。町の病院を紹介して、わたしも毎週{見舞い|みまい|v:n2_1722}に行っているのよ。', [
            'There is only so much this village clinic can do. I referred her to the city hospital, and I visit her every week.',
            'In dieser Dorfpraxis kann man nur begrenzt etwas tun. Ich habe sie ins Krankenhaus in der Stadt überwiesen und besuche sie jede Woche.',
          ]),
          l('fujii', '最近は{体調|たいちょう|v:taichou}も落ち着いて、新しく{処方|しょほう|v:shohou}した薬もよく効いている。……ただ、家族に会えないのが、一番つらいみたい。', [
            'Lately her condition has settled, and the new medicine I prescribed works well. …But not being able to see her family is the hardest part for her.',
            'In letzter Zeit ist ihr Zustand stabil, und das neu verschriebene Medikament wirkt gut. …Aber ihre Familie nicht sehen zu können, ist für sie das Schwerste.',
          ]),
          l('fujii', '子どもだ{からといって||g:karatoitte}、本当のことを話さないのは、かえってかわいそうね。……@nameさん、ひなちゃんに伝えてくれる？ 春には、帰ってこられるって。', [
            'Just because she is a child doesn’t mean we should keep the truth from her — that is crueller. …@name, will you tell Hina? Her mother can come home in spring.',
            'Nur weil sie ein Kind ist, sollte man ihr die Wahrheit nicht verschweigen – das ist eher grausam. …@name, sagst du es Hina? Im Frühling kann ihre Mutter nach Hause kommen.',
          ], 'happy'),
        ],
        teach: ['v:n2_0835', 'v:shinryoujo', 'v:n2_1722', 'v:taichou', 'v:shohou', 'g:karatoitte'],
      },
      {
        at: 'hina',
        goal: ['Bring Dr. Fujii’s news to Hina', 'Bring Hina die Nachricht von Frau Dr. Fujii'],
        music: 'snow',
        lines: [
          l('hina', '……春？ お母さん、春に帰ってくるの？', ['…Spring? Mum is coming home in spring?', '…Frühling? Mama kommt im Frühling nach Hause?'], 'surprised'),
          nar('ひなちゃんは、こらえていた涙を、やっと流した。', ['At last Hina lets the tears she had been holding back fall.', 'Endlich lässt Hina die Tränen fließen, die sie zurückgehalten hat.']),
          l('hina', '{雪解け|ゆきどけ|v:yukidoke}って、春のことだよね。……お母さんさえ元気になれ{ば||g:saeba}、何もいらない。', [
            'The thaw means spring, right? …As long as Mum gets well, I don’t need anything else.',
            'Schneeschmelze heißt Frühling, oder? …Solange Mama nur gesund wird, brauche ich nichts anderes.',
          ]),
          l('hina', 'わたし、お母さんの{看病|かんびょう|v:n2_0471}、手伝えるように、藤井先生に教えてもらう！ がんばってた{だけに||g:dakeni}、うれしくて、涙が止まらないや。', [
            'I’ll ask Dr. Fujii to teach me so I can help nurse Mum! Because I tried so hard, I’m so happy the tears won’t stop.',
            'Ich lasse mir von Frau Dr. Fujii beibringen, wie ich Mama pflegen kann! Gerade weil ich mich so zusammengerissen habe, freue ich mich so, dass die Tränen nicht aufhören.',
          ], 'happy'),
          pic('cg_dream_snow', '雪の村に、細い光が差した。かまくらの屋根から、最初のしずくが落ちた。', [
            'A thin ray of light falls on the snowy village. The first drop falls from the roof of the snow hut.',
            'Ein dünner Lichtstrahl fällt auf das verschneite Dorf. Vom Dach der Schneehütte fällt der erste Tropfen.',
          ]),
          l('hina', '春になったら、雪の上に{虹|にじ|v:n2_1374}が出るんだよ。お母さんと、一緒に見るんだ！', ['When spring comes, a rainbow appears over the snow. I’ll watch it with Mum!', 'Wenn der Frühling kommt, steht ein Regenbogen über dem Schnee. Den schaue ich mit Mama an!'], 'happy'),
        ],
        teach: ['v:yukidoke', 'v:n2_0471', 'v:n2_1374', 'g:saeba', 'g:dakeni'],
      },
    ],
  },

  // ------------------------------------------------------------------ Mr. Kuroda: the voice beyond the pass
  {
    id: 'ep_kuroda',
    chapter: 3,
    after: 'mq12',
    who: 'kuroda',
    title: ['峠の向こうの声', 'The Voice Beyond the Pass', 'Die Stimme jenseits des Passes'],
    summary: [
      'Every year Mr. Kuroda makes one snow lantern that he never lights.',
      'Jedes Jahr baut Herr Kuroda eine Schneelaterne, die er nie anzündet.',
    ],
    scenes: [
      {
        at: 'kuroda',
        goal: ['Ask Mr. Kuroda about the unlit lantern', 'Frag Herrn Kuroda nach der unbeleuchteten Laterne'],
        music: 'snow',
        lines: [
          l('kuroda', 'あの灯籠か。……二十年前、相棒と二人で、この先の{峠|とうげ|v:n2_1286}を越えようとしたんだ。', [
            'That lantern? …Twenty years ago my partner and I tried to cross the pass up ahead.',
            'Die Laterne? …Vor zwanzig Jahren wollten mein Partner und ich den Pass da oben überqueren.',
          ]),
          l('kuroda', '途中で{吹雪|ふぶき|v:fubuki}になった。おれが「もう少し行ける」と言った{ばかりに||g:bakarini}、あいつは帰ってこなかった。', [
            'Halfway, a blizzard came. Just because I said “we can go a bit further”, he never came back.',
            'Auf halbem Weg kam ein Schneesturm. Nur weil ich sagte „Wir schaffen noch ein Stück“, ist er nie zurückgekommen.',
          ], 'worried'),
          l('kuroda', '毎年、あいつの灯籠を作る。でも、火をつけられない。あの日のことを、ずっと{悔やんで|くやんで|v:n2_0550}いるからな。', [
            'Every year I make his lantern. But I can’t light it. Because I have regretted that day all this time.',
            'Jedes Jahr baue ich seine Laterne. Aber ich kann sie nicht anzünden. Weil ich diesen Tag die ganze Zeit bereue.',
          ], 'worried'),
          l('kuroda', 'あいつの家族は、おれを{恨んで|うらんで|v:n2_0237}いるだろう。……時間を戻せる{ものなら||g:monnara}、戻したいよ。', [
            'His family must resent me. …If I could turn back time, I would.',
            'Seine Familie hasst mich sicher. …Wenn ich die Zeit zurückdrehen könnte, ich würde es tun.',
          ]),
          l('kuroda', '祭りの広場に、あいつの灯籠を置いてある。……見てきてくれないか。', ['I’ve put his lantern on the festival field. …Would you go and look at it?', 'Ich habe seine Laterne auf den Festplatz gestellt. …Würdest du sie dir ansehen?']),
        ],
        teach: ['v:n2_1286', 'v:fubuki', 'v:n2_0550', 'v:n2_0237', 'g:bakarini', 'g:monnara'],
      },
      {
        at: 'yukimi_festival',
        goal: ['Look at the unlit lantern on the festival field', 'Sieh dir die unbeleuchtete Laterne auf dem Festplatz an'],
        evening: true,
        music: 'memory',
        lines: [
          nar('祭りの夜の広場。百の雪灯籠が、雪の道を{照らして|てらして|v:n2_1264}いる。', ['The festival field at night. A hundred snow lanterns light up the snowy path.', 'Der Festplatz in der Nacht. Hundert Schneelaternen erleuchten den verschneiten Weg.']),
          nar('一つだけ、暗いままの灯籠があった。その前に、女の人と男の子が立っていた。', [
            'Only one lantern stays dark. A woman and a boy are standing in front of it.',
            'Nur eine Laterne bleibt dunkel. Davor stehen eine Frau und ein Junge.',
          ]),
          nar('「毎年、黒田さんが作ってくれる灯籠です。主人のための」女の人は、{ろうそく||v:n2_1889}を一本、差し出した。', [
            '“Mr. Kuroda makes this lantern for us every year. For my husband.” The woman holds out a candle.',
            '„Herr Kuroda baut diese Laterne jedes Jahr für uns. Für meinen Mann.“ Die Frau hält eine Kerze hin.',
          ]),
          nar('「主人は、山が大好きでした。黒田さんを恨んだことなんて、一度もありません。この{行事|ぎょうじ|v:gyouji}の夜くらい、一緒に火をつけてほしいのです」', [
            '“My husband loved the mountains. I have never once blamed Mr. Kuroda. On the night of this festival at least, I want us to light it together.”',
            '„Mein Mann hat die Berge geliebt. Ich habe Herrn Kuroda nie einen Vorwurf gemacht. Wenigstens in der Nacht dieses Festes möchte ich, dass wir sie zusammen anzünden.“',
          ]),
        ],
        teach: ['v:n2_1264', 'v:n2_1889', 'v:gyouji'],
      },
      {
        at: 'kuroda',
        goal: ['Bring the candle to Mr. Kuroda', 'Bring Herrn Kuroda die Kerze'],
        evening: true,
        music: 'festival',
        lines: [
          nar('ろうそくと、奥さんの言葉を伝えると、黒田さんは、しばらく夜空を{見上げて|みあげて|v:n2_1700}いた。', [
            'When you give him the candle and the wife’s words, Mr. Kuroda looks up at the night sky for a long while.',
            'Als du ihm die Kerze und die Worte der Frau überbringst, schaut Herr Kuroda lange in den Nachthimmel.',
          ]),
          l('kuroda', '……恨んでいない、か。二十年、一度も聞く{ことなく||g:kotonaku}、勝手に決めつけていたんだな。', [
            '…She doesn’t blame me. For twenty years I never once asked — I just decided it on my own.',
            '…Sie gibt mir keine Schuld. Zwanzig Jahre lang habe ich nie gefragt – ich habe es einfach selbst beschlossen.',
          ], 'surprised'),
          l('kuroda', '山で人を守るのが、ガイドの仕事だ。だから、これからも{懸命|けんめい|v:n2_0599}に、この山を案内する。あいつの分まで。', [
            'Protecting people in the mountains is a guide’s job. So I will keep guiding people on this mountain with all I have. For him too.',
            'Menschen in den Bergen zu beschützen, ist die Aufgabe eines Bergführers. Darum führe ich weiter mit aller Kraft durch diese Berge. Auch für ihn.',
          ]),
          pic('cg_mountain_festival', '雪灯籠の夜。一番奥の灯籠に、やっと火がともった。', [
            'The night of the snow lanterns. At last the lantern at the very back is lit.',
            'Die Nacht der Schneelaternen. Endlich brennt auch die hinterste Laterne.',
          ]),
          l('kuroda', '亡くした人のことは、忘れる{べき||g:x_beki}じゃない。灯して、思い出せばいいんだ。……ありがとうな、@name。', [
            'You shouldn’t forget the people you lost. You light a lamp and remember them. …Thanks, @name.',
            'Man soll die Menschen, die man verloren hat, nicht vergessen. Man zündet ein Licht an und erinnert sich. …Danke, @name.',
          ], 'happy'),
        ],
        teach: ['v:n2_1700', 'v:n2_0599', 'g:kotonaku', 'g:x_beki'],
      },
    ],
  },

  // ------------------------------------------------------------------ Jōkan-oshō: the stroke that does not fade
  {
    id: 'ep_jokan',
    chapter: 3,
    after: 'mq13',
    who: 'jokan',
    title: ['消えない一画', 'The Stroke That Does Not Fade', 'Der Strich, der nicht verblasst'],
    summary: [
      'Ten years ago Jōkan-oshō’s only pupil left the temple after a quarrel. A letter has come from him.',
      'Vor zehn Jahren hat Jōkan-oshōs einziger Schüler den Tempel nach einem Streit verlassen. Jetzt ist ein Brief von ihm gekommen.',
    ],
    scenes: [
      {
        at: 'jokan',
        goal: ['Ask Jōkan-oshō about the letter', 'Frag Jōkan-oshō nach dem Brief'],
        lines: [
          l('jokan', '@name殿。十年前、わしには弟子が一人おった。{生意気|なまいき|v:n2_1355}で、字の{部首|ぶしゅ|v:bushu}もろくに覚えん小僧じゃった。', [
            '@name. Ten years ago I had one pupil. A cheeky boy who could hardly even remember the radicals of the kanji.',
            '@name. Vor zehn Jahren hatte ich einen einzigen Schüler. Einen frechen Jungen, der sich kaum die Radikale der Kanji merken konnte.',
          ]),
          l('jokan', 'ある日、「{画数|かくすう|v:kakusuu}など数えて何になる」と言いおってな。わしも怒鳴り返して、それっきりじゃ。', [
            'One day he said, “What’s the point of counting strokes?” I shouted back, and that was the end of it.',
            'Eines Tages sagte er: „Was soll das Strichezählen bringen?“ Ich habe zurückgebrüllt, und das war’s.',
          ], 'worried'),
          l('jokan', 'その弟子から、手紙が届いた。……開けておらん。この年になると、こわいものが増える。', [
            'A letter has come from that pupil. …I haven’t opened it. At my age, more and more things frighten you.',
            'Von diesem Schüler ist ein Brief gekommen. …Ich habe ihn nicht geöffnet. In meinem Alter gibt es immer mehr, wovor man sich fürchtet.',
          ]),
          l('jokan', '本堂に置いてある。……代わりに、読んでくれんか。', ['It’s in the main hall. …Would you read it for me?', 'Er liegt in der Haupthalle. …Würdest du ihn an meiner Stelle lesen?']),
        ],
        teach: ['v:n2_1355', 'v:bushu', 'v:kakusuu'],
      },
      {
        at: 'yukimi_temple',
        goal: ['Read the pupil’s letter in the main hall', 'Lies den Brief des Schülers in der Haupthalle'],
        music: 'memory',
        lines: [
          nar('封筒の中には、手紙と、何十枚もの{原稿|げんこう|v:n2_0589}用紙が入っていた。どの紙にも、同じ漢字が一つずつ。', [
            'In the envelope there is a letter and dozens of sheets of manuscript paper. On each sheet, one and the same kanji.',
            'Im Umschlag stecken ein Brief und Dutzende Blätter Manuskriptpapier. Auf jedem Blatt ein und dasselbe Kanji.',
          ]),
          nar('「和尚様。今、町の小学校で、子どもたちに漢字を教えています。僕の{弱点|じゃくてん|v:n2_0817}だった画数を、一番{苦心|くしん|v:n2_0529}して教えています」', [
            '“Master. I now teach kanji to children at a primary school in the city. Stroke counts, my weak point, are what I teach with the most care.”',
            '„Meister. Ich unterrichte jetzt Kinder an einer Grundschule in der Stadt in Kanji. Die Strichzahl, meine Schwachstelle, unterrichte ich mit der meisten Mühe.“',
          ]),
          nar('「一画が欠けると、別の字になる。人との縁も、同じだと思います。あの日のことを、謝らせてください」', [
            '“If one stroke is missing, it becomes a different character. I think it is the same with the bonds between people. Please let me apologise for that day.”',
            '„Fehlt ein Strich, wird es ein anderes Zeichen. Ich glaube, mit den Bindungen zwischen Menschen ist es genauso. Bitte lassen Sie mich mich für jenen Tag entschuldigen.“',
          ]),
          nar('原稿用紙の漢字は、どれも「{繋|つな}」――{繋がる|つながる|v:n2_1216}の字だった。', ['The kanji on every sheet is 繋 — the character of “to be connected”.', 'Das Kanji auf jedem Blatt ist 繋 – das Zeichen für „verbunden sein“.']),
        ],
        teach: ['v:n2_0589', 'v:n2_0817', 'v:n2_0529', 'v:n2_1216'],
      },
      {
        at: 'jokan',
        goal: ['Tell Jōkan-oshō what the letter says', 'Erzähl Jōkan-oshō, was im Brief steht'],
        lines: [
          nar('手紙の内容を伝えると、和尚は、長いあいだ黙っていた。', ['When you tell him what the letter says, the priest is silent for a long time.', 'Als du ihm erzählst, was im Brief steht, schweigt der Priester lange.']),
          l('jokan', '……あの小僧が、子どもに画数を教えておる、か。わしの弟子{だけあって||g:dakeatte}、しつこいのう。', [
            '…That boy is teaching children stroke counts, is he. As you’d expect of my pupil — stubborn.',
            '…Der Junge bringt Kindern die Strichzahl bei, so so. Wie man es von meinem Schüler erwarten kann – hartnäckig.',
          ], 'happy'),
          l('jokan', '十年も意地を張って、{とっくに||v:n2_1317}許しておったのに、言えずにおった。こんな{ことに||g:kotoni}、先に謝ったのは、弟子のほうじゃ。', [
            'Ten years of stubbornness. I had forgiven him long ago, but couldn’t say it. And to my surprise, it was the pupil who apologised first.',
            'Zehn Jahre Sturheit. Ich hatte ihm längst verziehen, konnte es aber nicht sagen. Und ausgerechnet der Schüler hat sich zuerst entschuldigt.',
          ]),
          l('jokan', '返事を書く。{率直|そっちょく|v:n2_1070}に、一言だけ。「{仲直り|なかなおり|v:n2_1338}じゃ。いつでも帰ってこい」', [
            'I’ll write back. Frankly, just one line: “We are reconciled. Come home any time.”',
            'Ich schreibe zurück. Offen, nur eine Zeile: „Wir sind versöhnt. Komm jederzeit nach Hause.“',
          ], 'happy'),
          pic('cg_mountain_hearth', '山寺の夜。和尚が、一画一画、ゆっくりと筆を運んでいた。', [
            'Night at the mountain temple. The priest moves his brush slowly, stroke by stroke.',
            'Nacht im Bergtempel. Der Priester führt den Pinsel langsam, Strich für Strich.',
          ]),
          l('jokan', '人の縁{ほど||g:hodonai}大事なもの{はない||g:hodonai}。画数と同じで、一本でも欠けてはならんのじゃよ。', [
            'Nothing is as precious as the bonds between people. Like stroke counts — not one may be missing.',
            'Nichts ist so kostbar wie die Bindungen zwischen Menschen. Wie bei der Strichzahl darf kein einziger fehlen.',
          ], 'happy'),
        ],
        teach: ['v:n2_1317', 'v:n2_1070', 'v:n2_1338', 'g:dakeatte', 'g:kotoni', 'g:hodonai'],
      },
    ],
  },
];
