import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 7 (Tokyo): Yoshie-san, Haru, Priya, Yamamoto-san, Kuroi-san — being heard in a city of millions. */
export const EPISODES_CH7: Episode[] = [
  // ------------------------------------------------------------------ Yoshie-san: until the day the coffee house closes
  {
    id: 'ep_yoshie',
    chapter: 7,
    after: 'mq27',
    who: 'yoshie',
    title: ['閉店の日まで', 'Until the Last Day', 'Bis zum letzten Tag'],
    summary: [
      'After fifty years, Yoshie-san’s coffee house in Asakusa must close next month for redevelopment.',
      'Nach fünfzig Jahren muss Yoshie-sans Café in Asakusa nächsten Monat wegen Neubebauung schließen.',
    ],
    scenes: [
      {
        at: 'yoshie',
        goal: ['Have a coffee with Yoshie-san', 'Trink einen Kaffee mit Yoshie-san'],
        music: 'tokyo',
        lines: [
          l('yoshie', 'いらっしゃい。……この店もね、来月でおしまいなの。{都心|としん|v:n2_1315}の再開発で、ビルになるんですって。', [
            'Welcome. …This place closes next month too. Redevelopment of the city centre — it’s going to be an office building.',
            'Willkommen. …Auch dieses Café schließt nächsten Monat. Neubebauung im Stadtzentrum – hier soll ein Bürogebäude hin.',
          ], 'worried'),
          l('yoshie', '主人が亡くなったのを{境に||g:wosakaini}、何度もやめようと思ったけど、結局やめられ{ずじまい||g:zujimai}で、五十年。', [
            'From the time my husband died, I thought about quitting so many times — but in the end I never did, and now it’s fifty years.',
            'Seit dem Tod meines Mannes habe ich so oft ans Aufhören gedacht – aber am Ende habe ich es nie getan, und jetzt sind es fünfzig Jahre.',
          ]),
          l('yoshie', '{元々|もともと|v:n2_1777}は、貧乏な学生さんのための店だったのよ。お金のない子には、黙ってコーヒーを出したっけ。……もう、誰も覚えてないでしょうけど。', [
            'Originally it was a place for poor students. To the ones with no money, I would quietly serve coffee. …Nobody remembers that any more, I suppose.',
            'Ursprünglich war es ein Café für arme Studenten. Denen ohne Geld habe ich wortlos Kaffee hingestellt. …Daran erinnert sich wohl niemand mehr.',
          ]),
          l('yoshie', 'となりの銭湯のおかみさんが、昔の話をよく知ってるわ。……あの人とも、もう長い付き合いね。', ['The lady who runs the bathhouse next door knows the old stories well. …We go back a long way, she and I.', 'Die Besitzerin des Badehauses nebenan kennt die alten Geschichten gut. …Wir kennen uns schon sehr lange.']),
        ],
        teach: ['v:n2_1315', 'v:n2_1777', 'g:wosakaini', 'g:zujimai'],
      },
      {
        at: 'sento_counter',
        goal: ['Ask the bathhouse lady about Yoshie-san', 'Frag die Badehausbesitzerin nach Yoshie-san'],
        evening: true,
        music: 'memory',
        lines: [
          nar('銭湯の番台のおかみさんは、古い缶を出してきた。中には、はがきや手紙が、ぎっしり入っていた。', [
            'The lady at the bathhouse counter brings out an old tin. It is packed with postcards and letters.',
            'Die Frau an der Badehauskasse holt eine alte Blechdose hervor. Sie ist voller Postkarten und Briefe.',
          ]),
          nar('「みんな、芳江さんにコーヒーをごちそうになった学生さんたちからよ。『{御無沙汰|ごぶさた|v:n2_0674}しています。あのときのコーヒーは、一生忘れません』ってね」', [
            '“They’re all from students Yoshie treated to coffee. ‘Forgive my long silence. I will never forget that coffee as long as I live,’ they write.”',
            '„Die sind alle von Studenten, denen Yoshie einen Kaffee ausgegeben hat. ‚Verzeihen Sie, dass ich mich so lange nicht gemeldet habe. Diesen Kaffee werde ich nie vergessen‘, schreiben sie.“',
          ]),
          nar('「芳江さんに渡したら、照れて読まないから、わたしが預かってるの。お医者さん、先生、作家……五十年{遡れば|さかのぼれば|v:n2_0708}、何百人になる{ことか||g:kotoka}」', [
            '“If I give them to Yoshie she gets embarrassed and won’t read them, so I keep them. Doctors, teachers, writers… Go back fifty years, and how many hundreds would that be!”',
            '„Wenn ich sie Yoshie gebe, wird sie verlegen und liest sie nicht, also bewahre ich sie auf. Ärzte, Lehrer, Schriftsteller… Fünfzig Jahre zurück – wie viele Hunderte das wohl sind!“',
          ]),
          nar('「閉店の日に、みんなを呼んで、芳江さんを{見送り|みおくり|v:n2_1701}たいの。手伝ってくれる？」', [
            '“On the day the café closes, I want to invite them all and see Yoshie off. Will you help?”',
            '„Am Tag der Schließung möchte ich sie alle einladen und Yoshie gebührend verabschieden. Hilfst du mir?“',
          ]),
        ],
        teach: ['v:n2_0674', 'v:n2_0708', 'v:n2_1701', 'g:kotoka'],
      },
      {
        at: 'yoshie',
        goal: ['Go to the coffee house on its last day', 'Geh am letzten Tag ins Café'],
        music: 'tokyo',
        lines: [
          nar('閉店の日。狭い店に、白髪の人、スーツの人、子ども連れの人が、次々に入ってきた。', [
            'The last day. Into the small café come grey-haired people, people in suits, people with children, one after another.',
            'Der letzte Tag. In das kleine Café kommen grauhaarige Leute, Leute im Anzug, Leute mit Kindern, einer nach dem anderen.',
          ]),
          l('yoshie', 'まあ……まあ、みんな。どうして……。', ['Oh… oh, all of you. How…', 'Ach… ach, ihr alle. Wieso…'], 'surprised'),
          nar('「芳江さんのコーヒーのおかげで、卒業できました」「あの一杯に、どれだけ救われたか」――{送別|そうべつ|v:n2_1057}の言葉が、店いっぱいに広がった。', [
            '“Thanks to your coffee I could graduate.” “You can’t imagine how much that one cup saved me.” — Words of farewell fill the whole café.',
            '„Dank Ihres Kaffees konnte ich meinen Abschluss machen.“ „Sie wissen nicht, wie sehr mich diese eine Tasse gerettet hat.“ – Abschiedsworte erfüllen das ganze Café.',
          ]),
          l('yoshie', '{有難い|ありがたい|v:n2_0166}ねえ……。誰も覚えてないと思ってたのに。コーヒーより、みんなの言葉で、胸が{温まる|あたたまる|v:n2_0139}わ。', [
            'How grateful I am… I thought nobody remembered. More than any coffee, your words warm my heart.',
            'Wie dankbar ich bin… Ich dachte, niemand erinnert sich. Mehr als jeder Kaffee wärmen eure Worte mein Herz.',
          ], 'happy'),
          l('yoshie', '店はなくなっても、この味は残したい。主人のレシピ{をもとに||g:womotoni}、みんなに一杯ずつ淹れる{ことにする||g:x_kotonisuru}わ。……みんなの幸せを、願ってやまない。', [
            'Even if the café disappears, I want this taste to remain. Based on my husband’s recipe, I’ll make one cup for each of you. …I wish you all happiness, with all my heart.',
            'Auch wenn das Café verschwindet, soll dieser Geschmack bleiben. Nach dem Rezept meines Mannes mache ich jedem von euch eine Tasse. …Ich wünsche euch allen von Herzen Glück.',
          ], 'happy'),
          pic('cg_heart_yoshie', '浅草の古い喫茶店。最後の一杯の湯気が、たくさんの笑顔の中に消えていった。', [
            'The old coffee house in Asakusa. The steam of the last cup fades among so many smiling faces.',
            'Das alte Café in Asakusa. Der Dampf der letzten Tasse verliert sich zwischen so vielen lächelnden Gesichtern.',
          ]),
          l('yoshie', '幸せを、願って{やまない||g:teyamanai}のよ。@nameさんの旅もね。', ['I never stop wishing for your happiness. For your journey too, @name.', 'Ich wünsche euch unaufhörlich Glück. Auch für deine Reise, @name.'], 'happy'),
        ],
        teach: ['v:n2_1057', 'v:n2_0166', 'v:n2_0139', 'g:womotoni', 'g:x_kotonisuru', 'g:teyamanai'],
      },
    ],
  },

  // ------------------------------------------------------------------ Haru: from the window of a packed train
  {
    id: 'ep_haru',
    chapter: 7,
    after: 'mq28',
    who: 'haru',
    title: ['満員電車の窓から', 'From the Window of a Packed Train', 'Aus dem Fenster eines vollen Zuges'],
    summary: [
      'Haru came to Tokyo from Hokkaido to draw. Three years later, she spends her nights alone in the game centre.',
      'Haru kam aus Hokkaido nach Tokio, um zu zeichnen. Drei Jahre später verbringt sie ihre Nächte allein im Spielcenter.',
    ],
    scenes: [
      {
        at: 'haru',
        goal: ['Talk to Haru in the game centre', 'Sprich mit Haru im Spielcenter'],
        music: 'tokyo_night',
        lines: [
          l('haru', '……あ、@name。こんな{深夜|しんや|v:tk_shinya}に、ゲームセンターで{うろうろ||v:n2_0245}してるの、わたしくらいだよね。', [
            '…Oh, @name. I’m probably the only one wandering around a game centre this late at night.',
            '…Ach, @name. Wahrscheinlich bin ich die Einzige, die so spät nachts im Spielcenter herumstreunt.',
          ]),
          l('haru', 'イラストの仕事は減る{一方だ||g:ippouda}し、知り合いもできない。北海道に帰ろうかなって、毎日思ってる。', [
            'My illustration work keeps on shrinking, and I can’t make any friends. Every day I think about going back to Hokkaido.',
            'Meine Illustrationsaufträge werden immer weniger, und Bekannte finde ich auch keine. Jeden Tag denke ich daran, nach Hokkaido zurückzugehen.',
          ], 'worried'),
          l('haru', 'でも、帰ったら負けみたいで。東京で成功なんて、できっ{こない||g:kkonai}のにね。', ['But going back feels like losing. Even though there’s no way I’ll ever make it in Tokyo.', 'Aber zurückgehen fühlt sich an wie verlieren. Dabei schaffe ich es in Tokio sowieso nie.'], 'worried'),
          l('haru', '朝は、東京駅で、{通勤|つうきん|v:tk_tsuukin}の人を描いてるの。{満員|まんいん|v:tk_manin}電車から降りてくる顔。……スケッチブック、見てくれる？', [
            'In the mornings I draw the commuters at Tokyo Station. The faces coming out of the packed trains. …Will you look at my sketchbook?',
            'Morgens zeichne ich die Pendler am Bahnhof Tokio. Die Gesichter, die aus den vollen Zügen steigen. …Schaust du dir mein Skizzenbuch an?',
          ]),
        ],
        teach: ['v:tk_shinya', 'v:n2_0245', 'v:tk_tsuukin', 'v:tk_manin', 'g:ippouda', 'g:kkonai'],
      },
      {
        at: 'tk_station',
        goal: ['Look at Haru’s sketchbook at Tokyo Station', 'Sieh dir Harus Skizzenbuch am Bahnhof Tokio an'],
        lines: [
          nar('スケッチブックには、何百人もの顔が描いてあった。疲れた顔、眠そうな顔、{見慣れた|みなれた|v:n2_1717}東京の朝。', [
            'The sketchbook holds hundreds of faces. Tired faces, sleepy faces, the familiar Tokyo morning.',
            'Im Skizzenbuch sind Hunderte Gesichter. Müde Gesichter, verschlafene Gesichter, der vertraute Tokioter Morgen.',
          ]),
          nar('でも、ページの端には、小さなメモ。「この人、改札の前で{立ち止まって|たちどまって|v:n2_1120}、空を見た」「この子、お母さんに{振り向いて|ふりむいて|v:n2_1586}手を振った」', [
            'But in the margins, little notes: “This man stopped in front of the ticket gate and looked at the sky.” “This child turned round and waved to her mother.”',
            'Aber am Rand stehen kleine Notizen: „Dieser Mann blieb vor der Sperre stehen und schaute in den Himmel.“ „Dieses Kind drehte sich um und winkte seiner Mutter.“',
          ]),
          nar('最後のページだけ、白いまま。小さく書いてあった。「いつか、自分の顔も描けるかな」', [
            'Only the last page is still blank. In small letters: “Will I be able to draw my own face one day?”',
            'Nur die letzte Seite ist noch leer. Klein steht da: „Ob ich eines Tages auch mein eigenes Gesicht zeichnen kann?“',
          ]),
        ],
        teach: ['v:n2_1717', 'v:n2_1120', 'v:n2_1586'],
      },
      {
        at: 'haru',
        goal: ['Give Haru back her sketchbook', 'Gib Haru ihr Skizzenbuch zurück'],
        music: 'tokyo_night',
        lines: [
          ask(
            ['誰も見ていない一瞬を、ちゃんと見ているんですね', ['You really see the moments nobody else notices.', 'Du siehst wirklich die Momente, die sonst keiner bemerkt.']],
            ['この絵、たくさんの人に見せたいです', ['I want lots of people to see these drawings.', 'Ich möchte, dass viele Leute diese Bilder sehen.']],
          ),
          l('haru', '……そんなふうに言ってもらえたの、初めて。一人だった{ものだから||g:monodakara}、自分の絵の良さなんて、わからなくなってた。', [
            '…That’s the first time anyone’s said that to me. Because I was all alone, I had stopped being able to see anything good in my drawings.',
            '…Das hat mir noch nie jemand gesagt. Weil ich ganz allein war, konnte ich das Gute an meinen Bildern gar nicht mehr sehen.',
          ], 'surprised'),
          l('haru', '帰ることが、負けだと{は限らない||g:tohakagiranai}よね。{回り道|まわりみち|v:n2_1695}したって、描き続ければいい。', [
            'Going home isn’t necessarily losing, is it. Even if I take a detour, I just have to keep drawing.',
            'Zurückgehen heißt ja nicht unbedingt verlieren. Auch wenn ich einen Umweg mache, muss ich einfach weiterzeichnen.',
          ]),
          l('haru', '悩んだ{あげく||g:ageku}、決めた。東京の「立ち止まる人たち」の絵で、小さな展示をする。それから、北海道の家族の顔も描きに帰る。……{やっぱり||v:n2_1805}、両方、わたしの場所だから。', [
            'After all that agonising, I’ve decided. I’ll do a small exhibition of Tokyo’s “people who stop for a moment”. And then I’ll go home to draw my family in Hokkaido too. …After all, both are my places.',
            'Nach langem Grübeln habe ich mich entschieden. Ich mache eine kleine Ausstellung mit Tokios „Menschen, die kurz innehalten“. Und dann fahre ich heim und zeichne auch meine Familie in Hokkaido. …Letztlich sind beides meine Orte.',
          ], 'happy'),
          pic('cg_heart_haru', '朝の東京駅。ハルさんが、スケッチブックの最後のページに、自分の笑顔を描いた。', [
            'Tokyo Station in the morning. On the last page of her sketchbook, Haru draws her own smiling face.',
            'Der Bahnhof Tokio am Morgen. Auf die letzte Seite ihres Skizzenbuchs zeichnet Haru ihr eigenes lächelndes Gesicht.',
          ]),
        ],
        teach: ['v:n2_1695', 'v:n2_1805', 'g:monodakara', 'g:tohakagiranai', 'g:ageku'],
      },
    ],
  },

  // ------------------------------------------------------------------ Priya: the "daijōbu" that does not get through
  {
    id: 'ep_priya',
    chapter: 7,
    after: 'mq28',
    who: 'priya',
    title: ['通じない「大丈夫」', 'The “Daijōbu” That Doesn’t Get Through', 'Das „Daijōbu“, das nicht ankommt'],
    summary: [
      'Priya’s team stopped inviting her to meetings. She is sure they want her gone.',
      'Priyas Team lädt sie nicht mehr zu Besprechungen ein. Sie ist sicher, dass man sie loswerden will.',
    ],
    scenes: [
      {
        at: 'priya',
        goal: ['Ask Priya what happened at work', 'Frag Priya, was bei der Arbeit passiert ist'],
        music: 'tokyo',
        lines: [
          l('priya', '@name、聞いて。わたし、{来日|らいにち|v:n2_1855}して一年。最近、チームの{打合せ|うちあわせ|v:n2_0225}に呼ばれなくなったの。', [
            '@name, listen. It’s been a year since I came to Japan. Lately I’m not being invited to my team’s meetings any more.',
            '@name, hör mal. Ich bin seit einem Jahr in Japan. In letzter Zeit werde ich nicht mehr zu den Besprechungen meines Teams eingeladen.',
          ], 'worried'),
          l('priya', '「飲み会、来られる？」って聞いたら、「大丈夫です」って。……それ、「いいよ」なの？「いらない」なの？ 日本語、難しすぎる。', [
            'When I asked, “Can I come to the drinks?”, they said “daijōbu desu”. …Does that mean “sure” or “no need”? Japanese is too hard.',
            'Als ich fragte „Kann ich zur Trinkrunde kommen?“, sagten sie „Daijōbu desu“. …Heißt das „gern“ oder „nicht nötig“? Japanisch ist zu schwer.',
          ], 'worried'),
          l('priya', 'みんな、わたしのこと、嫌いに{決まってる||g:nikimatteiru}。……本当のことを聞く勇気は、ちょっと持ち{かねる||g:kaneru}わ。', [
            'They must hate me. …I can’t quite find the courage to ask what’s really going on.',
            'Die hassen mich bestimmt. …Den Mut, nach der Wahrheit zu fragen, bringe ich nicht ganz auf.',
          ], 'worried'),
          l('priya', '今夜、チームのみんなが新宿の横丁で集まるって、偶然聞いちゃった。……わたし抜きで。', ['I happened to hear that the whole team is meeting tonight in the alley in Shinjuku. …Without me.', 'Ich habe zufällig gehört, dass sich das ganze Team heute Abend in der Gasse in Shinjuku trifft. …Ohne mich.']),
        ],
        teach: ['v:n2_1855', 'v:n2_0225', 'g:nikimatteiru', 'g:kaneru'],
      },
      {
        at: 'yokocho_counter',
        goal: ['Look into the yokocho in Shinjuku in the evening', 'Schau am Abend in die Gasse in Shinjuku'],
        evening: true,
        lines: [
          nar('横丁の小さな店。プリヤさんのチームの人たちが、カウンターで頭を寄せ合っていた。', ['A tiny bar in the alley. Priya’s team are huddled together at the counter.', 'Eine winzige Kneipe in der Gasse. Priyas Team sitzt dicht gedrängt an der Theke.']),
          nar('「プリヤさんの{入社|にゅうしゃ|v:n2_1380}一周年の{宴会|えんかい|v:n2_0257}、サプライズにしようよ」「でも、インド料理の店、どこがいいかな」', [
            '“Let’s make Priya’s one-year-at-the-company party a surprise.” “But which Indian restaurant would be good?”',
            '„Lasst uns die Feier zu Priyas erstem Firmenjubiläum als Überraschung machen.“ „Aber welches indische Restaurant wäre gut?“',
          ]),
          nar('「打合せに呼ばなかったのは、準備の話をしてたからだし……。でも、プリヤさん、最近元気ないよね」「どう{接したら|せっしたら|v:n2_1013}いいか、わからなくて」', [
            '“We didn’t invite her to the meetings because we were talking about the preparations… But Priya has seemed down lately.” “We just don’t know how to approach her.”',
            '„Wir haben sie nicht zu den Besprechungen eingeladen, weil wir die Vorbereitung besprochen haben… Aber Priya wirkt in letzter Zeit bedrückt.“ „Wir wissen einfach nicht, wie wir mit ihr umgehen sollen.“',
          ]),
          nar('「この前、『大丈夫です』って言っちゃったけど、あれ、伝わったかなあ。本当は『もちろん来て！』って意味だったのに」', [
            '“The other day I said ‘daijōbu desu’ — did that get through? What I really meant was ‘Of course, come!’”',
            '„Neulich habe ich ‚Daijōbu desu‘ gesagt – ob das angekommen ist? Eigentlich meinte ich ‚Na klar, komm!‘“',
          ]),
        ],
        teach: ['v:n2_1380', 'v:n2_0257', 'v:n2_1013'],
      },
      {
        at: 'priya',
        goal: ['Tell Priya what her team was talking about', 'Erzähl Priya, worüber ihr Team gesprochen hat'],
        music: 'tokyo',
        lines: [
          l('priya', '……サプライズ？ わたしの？', ['…A surprise? For me?', '…Eine Überraschung? Für mich?'], 'surprised'),
          l('priya', '嫌われてると思ってた。わたし、{まごまご||v:n2_1670}して、何も聞けなかった……。言葉は、正しければ通じる{というものではない||g:toiumonodewanai}のね。', [
            'I thought they hated me. I was so flustered I couldn’t ask anything… Words don’t get through just because they’re correct, do they.',
            'Ich dachte, sie hassen mich. Ich war so durcheinander, dass ich nichts fragen konnte… Worte kommen nicht einfach an, nur weil sie korrekt sind.',
          ]),
          l('priya', '日本の「大丈夫」も、わからない{でもない||g:naidemonai}。相手を困らせない{ように||g:x_youni}、やさしく言ってるのね。', [
            'I can sort of understand the Japanese “daijōbu” now. They say it gently, so as not to put the other person on the spot.',
            'Das japanische „Daijōbu“ kann ich jetzt irgendwie verstehen. Man sagt es sanft, damit man den anderen nicht in Verlegenheit bringt.',
          ]),
          l('priya', 'せっかく準備してくれてる{ことだし||g:kotodashi}、知らないふりをする。でも当日は、{はきはき||v:n2_1422}、ちゃんと言うわ。「ありがとう、大好きなチームです！」って。', [
            'Since they’re going to the trouble of preparing it, I’ll pretend I don’t know. But on the day I’ll say it clearly: “Thank you — I love this team!”',
            'Da sie sich schon die Mühe mit der Vorbereitung machen, tue ich so, als wüsste ich nichts. Aber am Tag selbst sage ich es klar und deutlich: „Danke – ich liebe dieses Team!“',
          ], 'happy'),
          pic('cg_heart_priya', '渋谷の噴水広場。プリヤさんが、チームの写真を見て、笑いながら涙をふいた。', [
            'The fountain square in Shibuya. Priya looks at a photo of her team, laughing and wiping away tears.',
            'Der Brunnenplatz in Shibuya. Priya schaut sich ein Foto ihres Teams an, lacht und wischt sich die Tränen ab.',
          ]),
          l('priya', 'わたしたち、もう{仲良し|なかよし|v:n2_1342}になれるわね。……@name、ありがとう！', ['We can be close friends now. …@name, thank you!', 'Jetzt können wir richtig gute Freunde werden. …@name, danke!'], 'happy'),
        ],
        teach: ['v:n2_1670', 'v:n2_1422', 'v:n2_1342', 'g:toiumonodewanai', 'g:naidemonai', 'g:x_youni', 'g:kotodashi'],
      },
    ],
  },

  // ------------------------------------------------------------------ Yamamoto-san: the other side of the counter
  {
    id: 'ep_yamamoto',
    chapter: 7,
    after: 'mq28',
    who: 'yamamoto',
    title: ['窓口の向こう側', 'The Other Side of the Counter', 'Die andere Seite des Schalters'],
    summary: [
      'Every month an old man comes to Yamamoto-san’s counter with an application that cannot be accepted.',
      'Jeden Monat kommt ein alter Mann mit einem Antrag an Frau Yamamotos Schalter, der nicht angenommen werden kann.',
    ],
    scenes: [
      {
        at: 'yamamoto',
        goal: ['Ask Yamamoto-san why she looks troubled', 'Frag Frau Yamamoto, warum sie so bekümmert aussieht'],
        lines: [
          l('yamamoto', '@nameさん、こんにちは。……すみません、ちょっと考えごとを。この{窓口|まどぐち|v:tk_madoguchi}に、毎月同じおじいさんが来るんです。', [
            'Hello, @name. …Sorry, I was lost in thought. The same old man comes to this counter every month.',
            'Hallo, @name. …Entschuldigung, ich war in Gedanken. Jeden Monat kommt derselbe alte Mann an diesen Schalter.',
          ], 'worried'),
          l('yamamoto', '取り壊された家の住所に、住民票を戻したいって。でも、建物がない{敷地|しきち|v:n2_0760}には、住所は置けない{ことになっている||g:kotoninatteiru}んです。', [
            'He wants to move his residence registration back to the address of his house, which was torn down. But by the rules, you can’t register an address on a plot with no building.',
            'Er möchte seine Meldeadresse zurück auf sein abgerissenes Haus legen. Aber laut Vorschrift kann man auf einem Grundstück ohne Gebäude keine Adresse anmelden.',
          ]),
          l('yamamoto', '{再三|さいさん|v:n2_0697}説明しても、「妻と暮らした家なんだ」って。{役人|やくにん|v:n2_1796}として、ルールを曲げるわけにはいきません。……でも、断るたびに、胸が痛くて。', [
            'Even though I’ve explained again and again, he says, “It’s the house I lived in with my wife.” As a civil servant I can’t bend the rules. …But every time I refuse, my heart aches.',
            'Obwohl ich es ihm immer wieder erklärt habe, sagt er: „Das ist das Haus, in dem ich mit meiner Frau gelebt habe.“ Als Beamtin kann ich die Regeln nicht beugen. …Aber jedes Mal, wenn ich ablehne, tut mir das Herz weh.',
          ], 'worried'),
          l('yamamoto', 'おじいさんは、いつも隅田川の川沿いのベンチにいるそうです。……もしよかったら、話を聞いてきてもらえませんか。', ['I hear he always sits on a bench by the Sumida river. …If you don’t mind, could you go and hear him out?', 'Er soll immer auf einer Bank am Sumida-Fluss sitzen. …Wenn es dir nichts ausmacht, könntest du hingehen und ihm zuhören?']),
        ],
        teach: ['v:tk_madoguchi', 'v:n2_0760', 'v:n2_0697', 'v:n2_1796', 'g:kotoninatteiru'],
      },
      {
        at: 'sm_river',
        goal: ['Find the old man on the Sumida riverside', 'Finde den alten Mann am Sumida-Ufer'],
        evening: true,
        music: 'memory',
        lines: [
          nar('川沿いのベンチに、おじいさんが一人。手には、古い{手続き|てつづき|v:tk_tetsuzuki}の書類が何枚も。', ['On a bench by the river sits an old man, holding many old sheets of paperwork.', 'Auf einer Bank am Fluss sitzt ein alter Mann und hält viele alte Formulare in der Hand.']),
          nar('「家内が亡くなって、家も取り壊された。住所までなくなったら、家内と暮らした五十年が、なかったことになる気がしてな」', [
            '“My wife died, and the house was torn down. If even the address disappears, it feels as if our fifty years together never happened.”',
            '„Meine Frau ist gestorben, und das Haus wurde abgerissen. Wenn jetzt auch noch die Adresse verschwindet, fühlt es sich an, als hätte es unsere fünfzig gemeinsamen Jahre nie gegeben.“',
          ]),
          nar('「わかってるんだ。そんな{申請|しんせい|v:n2_0924}が通る{はずがない||g:hazugahanai}。窓口の人を困らせてるのもな。……でも、何か、残す方法は{ないものか||g:naimonoka}と」', [
            '“I know. An application like that can’t possibly go through. And I know I’m troubling the lady at the counter. …But I keep wondering if there isn’t some way to leave something behind.”',
            '„Ich weiß ja. So ein Antrag kann unmöglich durchgehen. Und ich weiß, dass ich die Dame am Schalter in Verlegenheit bringe. …Aber ich frage mich, ob es nicht doch einen Weg gibt, etwas zu bewahren.“',
          ]),
        ],
        teach: ['v:tk_tetsuzuki', 'v:n2_0924', 'g:hazugahanai', 'g:naimonoka'],
      },
      {
        at: 'yamamoto',
        goal: ['Tell Yamamoto-san what the old man said', 'Erzähl Frau Yamamoto, was der alte Mann gesagt hat'],
        lines: [
          l('yamamoto', '……「残す方法」。そうか、おじいさんが欲しかったのは、住所じゃなかったんですね。', ['…“A way to leave something behind.” I see — what he wanted wasn’t the address at all.', '…„Einen Weg, etwas zu bewahren.“ Ich verstehe – eigentlich wollte er gar nicht die Adresse.'], 'surprised'),
          l('yamamoto', '区の{方針|ほうしん|v:n2_1633}で、再開発{にあたって||g:nianatte}、昔の町の記録を残す事業があるんです。古い家の写真と、住んでいた人の思い出を、区の資料館に残せます。', [
            'Under the ward’s policy, when an area is redeveloped there is a project to record the old town. Photos of old houses and the memories of the people who lived there can be kept in the ward archive.',
            'Nach der Richtlinie des Bezirks gibt es bei Neubebauungen ein Projekt, das die alte Stadt dokumentiert. Fotos alter Häuser und die Erinnerungen der Bewohner können im Bezirksarchiv aufbewahrt werden.',
          ]),
          l('yamamoto', 'ルールを守るのが、わたしの{役目|やくめ|v:n2_1798}。でも、人の気持ち{をぬきにして||g:nukinishite}、窓口の仕事はできませんね。{本来|ほんらい|v:n2_1662}、役所は、人のためにあるんですから。', [
            'Keeping the rules is my job. But you can’t do counter work leaving people’s feelings out of it. The ward office exists for people, after all.',
            'Die Regeln einzuhalten, ist meine Aufgabe. Aber Schalterarbeit geht nicht, ohne die Gefühle der Menschen zu berücksichtigen. Eigentlich ist das Amt ja für die Menschen da.',
          ], 'happy'),
          nar('――翌月。おじいさんは、もう窓口には来なかった。区の資料館に、一枚の写真が飾られた。「田中さん夫妻の家　五十年の思い出」', [
            '— The following month the old man no longer came to the counter. In the ward archive, a photo was put on display: “The Tanakas’ house — fifty years of memories.”',
            '— Im nächsten Monat kam der alte Mann nicht mehr an den Schalter. Im Bezirksarchiv wurde ein Foto ausgestellt: „Das Haus des Ehepaars Tanaka – fünfzig Jahre Erinnerungen.“',
          ]),
          l('yamamoto', '断る{おそれがある||g:osorega}申請でも、まず話を聞く。……それを、わたしの窓口の決まりにします。', [
            'Even when an application is likely to be refused, listen first. …I’ll make that the rule at my counter.',
            'Auch wenn ein Antrag womöglich abgelehnt werden muss: zuerst zuhören. …Das mache ich zur Regel an meinem Schalter.',
          ], 'happy'),
        ],
        teach: ['v:n2_1633', 'v:n2_1798', 'v:n2_1662', 'g:nianatte', 'g:nukinishite', 'g:osorega'],
      },
    ],
  },

  // ------------------------------------------------------------------ Kuroi-san: the frequency that does not arrive
  {
    id: 'ep_kuroi',
    chapter: 7,
    after: 'mq29',
    who: 'kuroi',
    title: ['届かない周波数', 'The Frequency That Doesn’t Arrive', 'Die Frequenz, die nicht ankommt'],
    summary: [
      'Kuroi-san’s night radio show is to end this spring. He says nobody listens to him any more.',
      'Kuroi-sans Nachtradiosendung soll im Frühling enden. Er sagt, niemand hört ihm mehr zu.',
    ],
    scenes: [
      {
        at: 'kuroi',
        goal: ['Ask Kuroi-san about the end of his show', 'Frag Kuroi-san nach dem Ende seiner Sendung'],
        music: 'tokyo_night',
        lines: [
          l('kuroi', '……春で、この深夜{放送|ほうそう|v:tk_housou}は終わりだ。聴取率が低い{とあって||g:toatte}、局も決めたらしい。', [
            '…This late-night broadcast ends in spring. With the ratings so low, the station has decided, apparently.',
            '…Im Frühling ist Schluss mit dieser Nachtsendung. Weil die Einschaltquote so niedrig ist, hat der Sender wohl entschieden.',
          ]),
          l('kuroi', '東京は、言葉が{絶えず|たえず|v:n2_1110}流れている町だ。おれの声も、みんな{聞き流して|ききながして|v:tk_kikinagasu}いるだけさ。', [
            'Tokyo is a city where words flow without end. My voice too — everyone just lets it go in one ear and out the other.',
            'Tokio ist eine Stadt, in der unaufhörlich Worte fließen. Auch meine Stimme – alle hören nur mit halbem Ohr hin.',
          ], 'worried'),
          l('kuroi', '昔、毎週はがきをくれた男の子がいた。病院から、{青白い|あおじろい|v:n2_0126}顔で聴いてるって。……五年前から、ぱったり来なくなった。', [
            'There used to be a boy who sent a postcard every week. He said he listened from hospital, pale-faced. …Five years ago, they suddenly stopped.',
            'Früher gab es einen Jungen, der jede Woche eine Postkarte schickte. Er schrieb, er höre im Krankenhaus zu, mit blassem Gesicht. …Vor fünf Jahren hörten die Karten plötzlich auf.',
          ], 'worried'),
          l('kuroi', '……東京駅の駅員さんから、「黒井さん宛ての忘れ物がある」って連絡があった。行く気になれなくてな。', ['…The station attendant at Tokyo Station called: “There’s a lost item addressed to Mr. Kuroi.” I can’t bring myself to go.', '…Der Bahnhofsmitarbeiter vom Bahnhof Tokio hat angerufen: „Hier ist eine Fundsache, adressiert an Herrn Kuroi.“ Ich bringe es nicht über mich hinzugehen.']),
        ],
        teach: ['v:tk_housou', 'v:n2_1110', 'v:tk_kikinagasu', 'v:n2_0126', 'g:toatte'],
      },
      {
        at: 'attendant',
        goal: ['Collect the lost item for Kuroi-san at Tokyo Station', 'Hol die Fundsache für Kuroi-san am Bahnhof Tokio ab'],
        lines: [
          l('attendant', 'ああ、黒井さんの代わりの方ですね。この{忘れ物|わすれもの|v:tk_wasuremono}です。ラジオ局に送るはずの{速達|そくたつ|v:n2_1063}が、ホームのベンチに。', [
            'Ah, you’ve come for Mr. Kuroi. Here is the lost item. An express letter that was supposed to go to the radio station, left on a bench on the platform.',
            'Ach, Sie kommen für Herrn Kuroi. Hier ist die Fundsache. Ein Eilbrief, der an den Radiosender gehen sollte, lag auf einer Bank am Bahnsteig.',
          ]),
          nar('封筒の裏には、大人の字でこう書いてあった。「五年前、病院でラジオを聴いていた、たかしです」', [
            'On the back of the envelope, in grown-up handwriting: “I’m Takashi, who listened to the radio in hospital five years ago.”',
            'Auf der Rückseite des Umschlags steht in Erwachsenenschrift: „Ich bin Takashi, der vor fünf Jahren im Krankenhaus Radio gehört hat.“',
          ]),
          l('attendant', '落とした方が、ずっとホームで探していたんですよ。「今度こそ、自分で渡したいんだ」って。……隅田川の放送局まで、行くとおっしゃっていました。', [
            'The person who dropped it searched the platform for ages. “This time I want to hand it over myself,” he said. …He said he was going to the radio station by the Sumida river.',
            'Der Mann, der ihn verloren hat, hat lange am Bahnsteig gesucht. „Diesmal will ich ihn selbst überreichen“, sagte er. …Er sagte, er gehe zum Sender am Sumida-Fluss.',
          ]),
        ],
        teach: ['v:tk_wasuremono', 'v:n2_1063'],
      },
      {
        at: 'kuroi',
        goal: ['Bring the letter to Kuroi-san’s studio', 'Bring den Brief in Kuroi-sans Studio'],
        evening: true,
        music: 'tokyo_night',
        lines: [
          nar('スタジオの前に、背の高い青年が立っていた。手には、もう一通、同じ字の手紙。', ['A tall young man is standing in front of the studio, holding another letter in the same handwriting.', 'Vor dem Studio steht ein großer junger Mann, in der Hand noch einen Brief in derselben Schrift.']),
          l('kuroi', '……たかし、なのか？ あの、病院の。', ['…Takashi? Is that you? The boy from the hospital?', '…Takashi? Bist du das? Der Junge aus dem Krankenhaus?'], 'surprised'),
          nar('「黒井さんの声が、毎晩、眠れない病室で、唯一の友だちでした。元気になって、今は、ラジオの仕事を目指してます。番組が終わるって聞いて、どうしても、ありがとうを言いたくて」', [
            '“Your voice was my only friend every night in that sleepless hospital room. I got better, and now I’m aiming to work in radio. When I heard the show was ending, I just had to say thank you.”',
            '„Ihre Stimme war jede Nacht im schlaflosen Krankenzimmer mein einziger Freund. Ich bin gesund geworden und will jetzt beim Radio arbeiten. Als ich hörte, dass die Sendung endet, musste ich einfach danke sagen.“',
          ]),
          l('kuroi', '……聞き流されてる、なんて。おれの声は、ちゃんと届いていたのか。', ['…And I thought everyone just let it pass. My voice really did reach someone.', '…Und ich dachte, alle hören nur mit halbem Ohr zu. Meine Stimme ist tatsächlich angekommen.']),
          l('kuroi', 'たかし、最後の放送、一緒にやらないか。……いや、二人で、最高の最終回にしよう{ではないか||g:youdewanaika}。', [
            'Takashi, won’t you do the last broadcast with me? …No — let’s make it the best final episode there ever was, the two of us.',
            'Takashi, willst du die letzte Sendung mit mir machen? …Nein – lass uns zu zweit die beste letzte Folge aller Zeiten machen.',
          ], 'happy'),
          pic('cg_dream_letters', '春の夜。隅田川のスタジオから、二つの声が、東京の空へ流れていった。', [
            'A spring night. From the studio on the Sumida river, two voices drift out into the Tokyo sky.',
            'Eine Frühlingsnacht. Aus dem Studio am Sumida-Fluss schweben zwei Stimmen hinaus in den Himmel über Tokio.',
          ]),
          l('kuroi', '声{にかけては||g:nikakete}、まだ若いやつには負けない。……@name、聴いててくれよ。最終回の{主役|しゅやく|v:n2_0855}は、聴いてるみんなだからな。', [
            'When it comes to voices, I won’t lose to a youngster yet. …@name, keep listening. The stars of the final episode are everyone who listens.',
            'Was die Stimme angeht, verliere ich noch nicht gegen einen Jungspund. …@name, hör zu. Die Hauptrolle in der letzten Folge spielen alle, die zuhören.',
          ], 'happy'),
        ],
        teach: ['v:n2_0855', 'g:youdewanaika', 'g:nikakete'],
      },
    ],
  },
];
