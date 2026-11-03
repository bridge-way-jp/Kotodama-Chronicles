import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 4 (Shiomi, the harbour town): Gen-san, Mrs. Hamada and Kaito, Nagisa, Mr. Umino. */
export const EPISODES_CH4: Episode[] = [
  // ------------------------------------------------------------------ Nagisa: why she stays
  {
    id: 'ep_nagisa',
    chapter: 4,
    after: 'mq14',
    who: 'nagisa',
    title: ['この町を出ない理由', 'Why She Doesn’t Leave', 'Warum sie bleibt'],
    summary: [
      'Nagisa turned down a job in Tokyo to stay in Shiomi. Now fewer and fewer visitors come, and she is starting to doubt.',
      'Nagisa hat eine Stelle in Tokio abgelehnt, um in Shiomi zu bleiben. Jetzt kommen immer weniger Besucher, und sie beginnt zu zweifeln.',
    ],
    scenes: [
      {
        at: 'nagisa',
        goal: ['Ask Nagisa why she looks tired', 'Frag Nagisa, warum sie so müde aussieht'],
        music: 'harbor',
        lines: [
          l('nagisa', '@nameさん……見てください、この{夕刊|ゆうかん|v:n2_1811}。「潮見町、{観光客|かんこうきゃく|v:kankoukyaku}が十年で半分に」ですって。', [
            '@name… look at this evening paper. “Shiomi: tourists halved in ten years,” it says.',
            '@name… schau mal, diese Abendzeitung. „Shiomi: Touristen in zehn Jahren halbiert“, steht da.',
          ], 'worried'),
          l('nagisa', '三年前、東京の会社から誘われたんです。{名刺|めいし|v:n2_1741}まで作ってもらったのに、断ってこの町に残りました。', [
            'Three years ago a company in Tokyo invited me. They had even made business cards for me, but I turned it down and stayed in this town.',
            'Vor drei Jahren wollte mich eine Firma in Tokio haben. Sie hatten sogar schon Visitenkarten für mich gemacht, aber ich habe abgelehnt und bin in dieser Stadt geblieben.',
          ]),
          l('nagisa', '一生懸命やってきた{にもかかわらず||g:nimokakawarazu}、お客さんは減るばかり。……わたし、間違えたのかな。', [
            'Even though I have worked so hard, the visitors only get fewer. …Did I make a mistake?',
            'Obwohl ich mich so angestrengt habe, werden die Besucher immer weniger. …Habe ich einen Fehler gemacht?',
          ], 'worried'),
          ask(
            ['この町の、何が好きで残ったの？', ['What is it you love about this town that made you stay?', 'Was liebst du an dieser Stadt, dass du geblieben bist?']],
            ['一緒に何かやってみようよ', ['Let’s try something together.', 'Lass uns zusammen etwas versuchen.']],
          ),
          l('nagisa', '……岬の上から、町を{見下ろす|みおろす|v:n2_1702}の、好きなんです。夕方、漁船が帰ってくるところ。行ってみてもらえますか？', [
            '…I love looking down on the town from the cape. In the evening, when the fishing boats come home. Would you go and see?',
            '…Ich liebe es, vom Kap auf die Stadt hinabzuschauen. Am Abend, wenn die Fischerboote heimkommen. Würdest du hingehen und schauen?',
          ]),
        ],
        teach: ['v:n2_1811', 'v:kankoukyaku', 'v:n2_1741', 'v:n2_1702', 'g:nimokakawarazu'],
      },
      {
        at: 'harbor_hokora',
        goal: ['Look down on the town from the shrine on the cape', 'Schau vom Schrein auf dem Kap auf die Stadt hinab'],
        evening: true,
        music: 'memory',
        lines: [
          nar('夕暮れ。小さな祠のそばから、港が見えた。漁船が一隻、また一隻と帰ってくる。', [
            'Dusk. From beside the little shrine you can see the harbour. Fishing boats come home, one after another.',
            'Abenddämmerung. Neben dem kleinen Schrein sieht man den Hafen. Ein Fischerboot nach dem anderen kehrt heim.',
          ]),
          nar('{街角|まちかど|v:n2_1680}のあちこちで、人々が手を振っている。浜田さんの食堂の煙、源さんの{掛け声|かけごえ|v:kakegoe}。', [
            'On street corners here and there, people are waving. The smoke from Mrs. Hamada’s diner, Gen-san’s shouts.',
            'An den Straßenecken winken Leute. Der Rauch aus Frau Hamadas Imbiss, Gen-sans Zurufe.',
          ]),
          nar('祠の中に、古い写真が一枚。この町の夏祭りだった。浜は、人でいっぱいだった。写真の裏に、子どもの字。「なぎさ　六さい　また来年も」', [
            'Inside the shrine there is an old photo of the town’s summer festival. The beach is full of people. On the back, a child’s writing: “Nagisa, age 6. Again next year.”',
            'Im Schrein liegt ein altes Foto vom Sommerfest der Stadt. Der Strand ist voller Menschen. Auf der Rückseite Kinderschrift: „Nagisa, 6 Jahre. Nächstes Jahr wieder.“',
          ]),
        ],
        teach: ['v:n2_1680', 'v:kakegoe'],
      },
      {
        at: 'nagisa',
        goal: ['Bring the photo to Nagisa', 'Bring Nagisa das Foto'],
        music: 'harbor',
        lines: [
          l('nagisa', 'これ……わたしが小さいころの夏祭り。もう十年も、開かれていないんです。', ['This is… the summer festival from when I was little. It hasn’t been held for ten years.', 'Das… ist das Sommerfest aus meiner Kindheit. Es findet seit zehn Jahren nicht mehr statt.'], 'surprised'),
          l('nagisa', 'この町は、不便な{反面||g:hanmen}、人と人が近い。そこが好きで、わたしは残ったんだった。', [
            'This town is inconvenient, but on the other hand people are close to each other. That is what I loved, and why I stayed.',
            'Diese Stadt ist unpraktisch, aber andererseits sind sich die Menschen nah. Das habe ich geliebt, darum bin ich geblieben.',
          ]),
          l('nagisa', '決めました。今年、夏祭りの{催し|もよおし|v:n2_1786}を復活させます！ 町のみんなに{呼び掛けて|よびかけて|v:n2_1851}みます。', [
            'I’ve decided. This year I’ll bring the summer festival back! I’ll call on everyone in town.',
            'Ich habe mich entschieden. Dieses Jahr lasse ich das Sommerfest wieder aufleben! Ich rufe alle in der Stadt dazu auf.',
          ], 'happy'),
          l('nagisa', 'お客さんが少なかった{としても||g:toshitemo}、町の人が笑えたら、それでいい。{全力|ぜんりょく|v:n2_1042}でやる{しかない||g:shikanai}ですね！', [
            'Even if only a few visitors come, if the people of the town can laugh, that’s enough. I just have to give it everything I have!',
            'Auch wenn nur wenige Besucher kommen – wenn die Menschen der Stadt lachen können, reicht das. Ich muss einfach alles geben!',
          ], 'happy'),
          pic('cg_harbor_arrival', '潮見の港。なぎささんが、手作りのポスターを、掲示板に貼った。', [
            'Shiomi harbour. Nagisa pins a handmade poster on the noticeboard.',
            'Der Hafen von Shiomi. Nagisa hängt ein selbstgemachtes Plakat ans Schwarze Brett.',
          ]),
        ],
        teach: ['v:n2_1786', 'v:n2_1851', 'v:n2_1042', 'g:hanmen', 'g:toshitemo', 'g:shikanai'],
      },
    ],
  },

  // ------------------------------------------------------------------ Gen-san: the last net
  {
    id: 'ep_gen',
    chapter: 4,
    after: 'mq15',
    who: 'gen',
    title: ['最後の網', 'The Last Net', 'Das letzte Netz'],
    summary: [
      'Gen-san is the last fisherman in Shiomi who still goes out every day. The co-op has told him to retire.',
      'Gen-san ist der letzte Fischer in Shiomi, der noch jeden Tag hinausfährt. Die Genossenschaft hat ihm nahegelegt, in Rente zu gehen.',
    ],
    scenes: [
      {
        at: 'gen',
        goal: ['Watch Gen-san mend his net', 'Schau Gen-san beim Netzflicken zu'],
        music: 'harbor',
        lines: [
          l('gen', '……おう、@name。見ての通り、{網|あみ|v:ami}を直してるだけだ。', ['…Hey, @name. As you can see, I’m just mending my net.', '…Na, @name. Wie du siehst, flicke ich nur mein Netz.']),
          l('gen', '漁協から、そろそろ{引退|いんたい|v:intai}しろと言われてな。七十八の{漁師|りょうし|v:ryoushi}は、もう危ないんだと。', [
            'The co-op told me it’s about time I retired. A fisherman of seventy-eight is dangerous now, they say.',
            'Die Genossenschaft sagt, es wird Zeit, dass ich in Rente gehe. Ein Fischer mit achtundsiebzig sei zu gefährlich, meinen sie.',
          ]),
          l('gen', 'わかってはいる{ものの||g:monono}、海に出ない朝なんて、考えられん。{跡継ぎ|あとつぎ|v:atotsugi}もいねえしな。', [
            'I understand, but I can’t imagine a morning without going out to sea. And there’s no successor either.',
            'Ich verstehe das zwar, aber ein Morgen, ohne aufs Meer zu fahren, ist für mich unvorstellbar. Und einen Nachfolger gibt es auch nicht.',
          ], 'worried'),
          l('gen', '息子は、二十年前に町を出た。……家に、あいつからの手紙がある。読む気になれなくてな。', [
            'My son left town twenty years ago. …There are letters from him at my house. I can’t bring myself to read them.',
            'Mein Sohn hat die Stadt vor zwanzig Jahren verlassen. …Bei mir zu Hause liegen Briefe von ihm. Ich bringe es nicht über mich, sie zu lesen.',
          ]),
        ],
        teach: ['v:ami', 'v:intai', 'v:ryoushi', 'v:atotsugi', 'g:monono'],
      },
      {
        at: 'harbor_genhouse',
        goal: ['Look at the letters in Gen-san’s house', 'Sieh dir die Briefe in Gen-sans Haus an'],
        evening: true,
        music: 'memory',
        lines: [
          nar('源さんの家の棚に、封を切っていない手紙が、二十通並んでいた。{宛名|あてな|v:n2_0144}は、どれも同じ字。', [
            'On a shelf in Gen-san’s house stand twenty unopened letters. The address on each is in the same handwriting.',
            'Im Regal in Gen-sans Haus stehen zwanzig ungeöffnete Briefe. Die Adresse ist überall in derselben Schrift.',
          ]),
          nar('一番新しい一通だけ、封が開いていた。{便箋|びんせん|v:n2_1539}は一枚だけ。', ['Only the newest one has been opened. A single sheet of letter paper.', 'Nur der neueste ist geöffnet. Ein einziges Blatt Briefpapier.']),
          nar('「親父へ。二十年、{船便|ふなびん|v:n2_1573}の会社で働いてきた。海から離れられなかったのは、親父の背中を見て育ったからだ。今年、潮見に帰って、漁師になりたい。{ベテラン||v:n2_1620}の親父に、一から教えてほしい」', [
            '“Dad. For twenty years I’ve worked for a shipping company. I couldn’t get away from the sea because I grew up watching your back. This year I want to come back to Shiomi and become a fisherman. I want you, the old hand, to teach me from scratch.”',
            '„Vater. Zwanzig Jahre habe ich bei einer Reederei gearbeitet. Vom Meer bin ich nicht losgekommen, weil ich mit deinem Rücken vor Augen aufgewachsen bin. Dieses Jahr will ich nach Shiomi zurück und Fischer werden. Ich möchte, dass du, der alte Hase, mir alles von Anfang an beibringst.“',
          ]),
        ],
        teach: ['v:n2_0144', 'v:n2_1539', 'v:n2_1573', 'v:n2_1620'],
      },
      {
        at: 'gen',
        goal: ['Talk to Gen-san about his son’s letter', 'Sprich mit Gen-san über den Brief seines Sohnes'],
        music: 'harbor',
        lines: [
          l('gen', '……読んだのか。ああ、最後の一通だけは、開けたんだ。でも、返事を書けなかった。', [
            '…You read it? Yes, I opened only the last one. But I couldn’t write back.',
            '…Du hast ihn gelesen? Ja, nur den letzten habe ich aufgemacht. Aber antworten konnte ich nicht.',
          ]),
          l('gen', 'あいつが出て行ったとき、「二度と帰ってくるな」と言っちまった。……あの言葉を、二十年、背負ってきたんだ。', [
            'When he left, I told him, “Don’t ever come back.” …I’ve carried those words for twenty years.',
            'Als er ging, habe ich gesagt: „Komm ja nie wieder.“ …Diese Worte trage ich seit zwanzig Jahren mit mir herum.',
          ], 'worried'),
          ask(
            ['今なら、返事が書けるんじゃないですか', ['Maybe you can write back now.', 'Vielleicht können Sie jetzt antworten.']],
            ['網は、二人で引くものですよね', ['A net is something two people haul, isn’t it?', 'Ein Netz zieht man doch zu zweit, oder?']],
          ),
          l('gen', '……ふん。こんな年寄りに言われたら、帰ってこ{ざるを得ない||g:zaruoenai}だろうな。', [
            '…Hmph. If an old man like me says it, he’ll have no choice but to come home.',
            '…Hm. Wenn so ein Alter wie ich das sagt, bleibt ihm wohl nichts anderes übrig, als heimzukommen.',
          ], 'happy'),
          l('gen', '{月日|つきひ|v:n2_1208}が経っても、海の男の約束は一つだ。最後まで、やり{ぬく||g:x_nuku}。……あいつに網の引き方を教えるまで、引退はなしだ。', [
            'However much time passes, a man of the sea has only one promise: see it through to the end. …No retiring until I’ve taught him how to haul a net.',
            'Wie viel Zeit auch vergeht, ein Mann des Meeres hat nur ein Versprechen: es bis zum Ende durchziehen. …Keine Rente, bis ich ihm beigebracht habe, wie man ein Netz einholt.',
          ], 'happy'),
          pic('cg_heart_gen', '夜明け前の東の桟橋。源さんが、二人分の網を、{力強く|ちからづよく|v:n2_1152}広げた。', [
            'The east pier before dawn. Gen-san spreads out nets for two, with strong hands.',
            'Der Ostpier vor Tagesanbruch. Gen-san breitet mit kräftigen Händen Netze für zwei aus.',
          ]),
        ],
        teach: ['v:n2_1208', 'v:n2_1152', 'g:zaruoenai', 'g:x_nuku'],
        give: ['ikayaki', 1],
      },
    ],
  },

  // ------------------------------------------------------------------ Mrs. Hamada and Kaito: the empty seat
  {
    id: 'ep_kaito',
    chapter: 4,
    after: 'mq16',
    who: 'kaito',
    title: ['空いている席', 'The Empty Seat', 'Der leere Platz'],
    summary: [
      'Kaito says he hates the sea. Yet every day at low tide he goes down to the beach alone.',
      'Kaito sagt, er hasst das Meer. Trotzdem geht er jeden Tag bei Ebbe allein an den Strand.',
    ],
    scenes: [
      {
        at: 'hamada',
        goal: ['Ask Mrs. Hamada about Kaito', 'Frag Frau Hamada nach Kaito'],
        lines: [
          l('hamada', 'あら@nameちゃん、いらっしゃい！ ……カイト？ また浜に行ったわ。海が嫌いだって言う{くせに||g:kuseni}、毎日よ。', [
            'Oh, @name, welcome! …Kaito? He went down to the beach again. He says he hates the sea, and yet he goes every day.',
            'Ach, @name, willkommen! …Kaito? Der ist wieder an den Strand. Er sagt, er hasst das Meer, und geht trotzdem jeden Tag hin.',
          ]),
          l('hamada', 'あの子の父親――わたしの息子はね、五年前、漁に出たまま帰ってこなかったの。', [
            'That boy’s father — my son — went out fishing five years ago and never came back.',
            'Der Vater des Jungen – mein Sohn – ist vor fünf Jahren zum Fischen hinausgefahren und nie zurückgekommen.',
          ], 'worried'),
          l('hamada', 'この店の{客席|きゃくせき|v:n2_0494}の一番奥、窓際の席は、ずっと空けてあるの。息子の{座布団|ざぶとん|v:n2_0733}を置いたまま。', [
            'The seat at the very back of the diner, by the window, I’ve kept empty all this time. With my son’s floor cushion still on it.',
            'Der hinterste Platz im Lokal, am Fenster, ist die ganze Zeit frei geblieben. Mit dem Sitzkissen meines Sohnes darauf.',
          ]),
          l('hamada', '{可愛がって|かわいがって|v:n2_0447}育ててきたつもりだけど、カイトは、わたしには何も話してくれないのよ。', [
            'I’ve raised him with all the love I have, but Kaito tells me nothing.',
            'Ich habe ihn mit aller Liebe großgezogen, aber Kaito erzählt mir nichts.',
          ], 'worried'),
        ],
        teach: ['v:n2_0494', 'v:n2_0733', 'v:n2_0447', 'g:kuseni'],
      },
      {
        at: 'kaito',
        goal: ['Find Kaito on the beach at low tide', 'Finde Kaito bei Ebbe am Strand'],
        evening: true,
        music: 'memory',
        lines: [
          nar('{干潮|かんちょう|v:kanchou}の{浜辺|はまべ|v:hamabe}。カイトくんが、しゃがんで{貝殻|かいがら|v:kaigara}を拾っていた。', [
            'The beach at low tide. Kaito is crouching, picking up shells.',
            'Der Strand bei Ebbe. Kaito hockt da und sammelt Muscheln.',
          ]),
          l('kaito', '……なんだよ。別に、遊んでるんじゃねえし。', ['…What? I’m not playing or anything.', '…Was ist? Ich spiele hier nicht oder so.']),
          l('kaito', '父ちゃんがさ、「潮が引いたら、海が落とし物を返してくれる」って言ってたんだ。だから……もしかしたら、って。', [
            'Dad used to say, “When the tide goes out, the sea gives back what it took.” So… maybe, I thought.',
            'Papa hat immer gesagt: „Wenn die Flut zurückgeht, gibt das Meer zurück, was es genommen hat.“ Also… vielleicht, dachte ich.',
          ], 'worried'),
          l('kaito', '小学生{にしては||g:nishitewa}バカみたいだろ。……ばあちゃんには、言うなよ。泣くから。', [
            'Stupid for a kid my age, right? …Don’t tell Grandma. She’ll cry.',
            'Ziemlich dumm für einen Grundschüler, oder? …Sag’s nicht Oma. Sonst weint sie.',
          ]),
          l('kaito', 'これ、拾った中で一番きれいなやつ。父ちゃんの席に、置いてやりたいんだ。……{満潮|まんちょう|v:manchou}になる前に、帰らなきゃ。', [
            'This is the prettiest one I’ve found. I want to put it on Dad’s seat. …I have to go back before high tide.',
            'Das ist die schönste, die ich gefunden habe. Ich will sie auf Papas Platz legen. …Ich muss zurück, bevor die Flut kommt.',
          ]),
        ],
        teach: ['v:kanchou', 'v:hamabe', 'v:kaigara', 'v:manchou', 'g:nishitewa'],
      },
      {
        at: 'hamada',
        goal: ['Go back to the diner with Kaito', 'Geh mit Kaito zurück in den Imbiss'],
        music: 'harbor',
        lines: [
          nar('カイトくんは、窓際の席に、{そうっと||v:n2_1056}貝殻を置いた。', ['Kaito gently places the shell on the seat by the window.', 'Kaito legt die Muschel behutsam auf den Platz am Fenster.']),
          l('hamada', '……カイト。あんた、毎日、これを探してたの？', ['…Kaito. Is this what you’ve been looking for, every day?', '…Kaito. Hast du jeden Tag danach gesucht?'], 'surprised'),
          l('kaito', '泣くなって言ったのに……。ばあちゃんが泣く{どころか||g:dokoroka}、おれまで泣けてくるじゃんか。', [
            'I told you not to cry… Not only is Grandma crying — now I’m crying too.',
            'Ich hab doch gesagt, nicht weinen… Statt dass nur Oma weint, muss ich jetzt auch noch heulen.',
          ]),
          l('hamada', 'いいのよ、泣いて。……ほら、二人で座ろう。今日は、この店の{名物|めいぶつ|v:meibutsu}、父ちゃんの好きだった{刺身|さしみ|v:n2_0724}定食よ。', [
            'It’s all right to cry. …Come, let’s sit together. Today it’s the diner’s speciality, the sashimi set your dad loved.',
            'Es ist gut, wenn du weinst. …Komm, setzen wir uns zusammen. Heute gibt es die Spezialität des Hauses: das Sashimi-Menü, das dein Papa so geliebt hat.',
          ], 'happy'),
          nar('悲しみ{つつも||g:tsutsumo}、二人は五年ぶりに、同じテーブルで笑った。窓際の席には、小さな貝殻が光っていた。', [
            'Sad as they were, for the first time in five years the two of them laughed at the same table. On the seat by the window a small shell gleamed.',
            'Trotz aller Trauer lachten die beiden zum ersten Mal seit fünf Jahren am selben Tisch. Auf dem Platz am Fenster schimmerte eine kleine Muschel.',
          ]),
          pic('cg_harbor_shell', '港食堂の窓際。夕日の中で、貝殻が、小さく光っている。', [
            'The window seat of the harbour diner. In the evening sun, a shell gleams softly.',
            'Der Fensterplatz im Hafenimbiss. In der Abendsonne schimmert leise eine Muschel.',
          ]),
        ],
        teach: ['v:n2_1056', 'v:meibutsu', 'v:n2_0724', 'g:dokoroka', 'g:tsutsumo'],
      },
    ],
  },

  // ------------------------------------------------------------------ Mr. Umino: the lighthouse diary
  {
    id: 'ep_umino',
    chapter: 4,
    after: 'mq17',
    who: 'umino',
    title: ['灯台守の日誌', 'The Lighthouse Keeper’s Diary', 'Das Tagebuch des Leuchtturmwärters'],
    summary: [
      'Every night for forty years, Mr. Umino has written one line in the lighthouse diary. The lighthouse is to be automated next spring.',
      'Seit vierzig Jahren schreibt Herr Umino jede Nacht eine Zeile ins Leuchtturmtagebuch. Im nächsten Frühling soll der Leuchtturm automatisiert werden.',
    ],
    scenes: [
      {
        at: 'umino',
        goal: ['Ask Mr. Umino about the diary', 'Frag Herrn Umino nach dem Tagebuch'],
        music: 'lighthouse',
        lines: [
          l('umino', '……来年の春、この{灯台|とうだい|v:toudai}は機械だけで動くことになる。人の仕事{として||g:x_toshite}の灯台守は、わしで終わりだ。', [
            '…Next spring this lighthouse will run on machines alone. Lighthouse keeping as a human job ends with me.',
            '…Nächsten Frühling läuft dieser Leuchtturm nur noch mit Maschinen. Leuchtturmwärter als Beruf für Menschen endet mit mir.',
          ]),
          l('umino', '四十年、毎晩、この日誌に一行書いてきた。天気でも、船の数でもない。……同じ一行をな。', [
            'For forty years I have written one line in this diary every night. Not the weather, not the number of ships. …The same line.',
            'Vierzig Jahre lang habe ich jede Nacht eine Zeile in dieses Tagebuch geschrieben. Nicht das Wetter, nicht die Zahl der Schiffe. …Dieselbe Zeile.',
          ]),
          l('umino', '日誌は、灯台の上の窓辺にある。文法の試験に受かったおまえなら、読む資格がある。', [
            'The diary is by the window at the top of the lighthouse. You passed my grammar trial, so you have earned the right to read it.',
            'Das Tagebuch liegt oben im Leuchtturm am Fenster. Du hast meine Grammatikprüfung bestanden, also hast du dir das Recht verdient, es zu lesen.',
          ]),
        ],
        teach: ['v:toudai', 'g:x_toshite'],
      },
      {
        at: 'harbor_lighthouse',
        goal: ['Read the diary at the top of the lighthouse', 'Lies das Tagebuch oben im Leuchtturm'],
        evening: true,
        music: 'memory',
        lines: [
          nar('窓の向こうに、{水平線|すいへいせん|v:suiheisen}が細く光っている。古い日誌は、何十冊も積み重なっていた。', [
            'Beyond the window the horizon gleams like a thin line. The old diaries are stacked in dozens of volumes.',
            'Hinter dem Fenster leuchtet der Horizont wie ein dünner Strich. Die alten Tagebücher stapeln sich in Dutzenden Bänden.',
          ]),
          nar('どのページにも、同じ一行。「今夜も、光は届いている。兄さん、帰り道は、こっちの{方角|ほうがく|v:n2_1628}だ」', [
            'On every page, the same line: “Tonight too, the light is reaching out. Brother, the way home is in this direction.”',
            'Auf jeder Seite dieselbe Zeile: „Auch heute Nacht reicht das Licht hinaus. Bruder, der Heimweg liegt in dieser Richtung.“',
          ]),
          nar('一冊目の最初のページ。「兄の船、嵐で帰らず。わしの{油断|ゆだん|v:n2_1823}だった。灯が一瞬消えた」', [
            'The first page of the first volume: “My brother’s boat did not return in the storm. My carelessness. The light went out for a moment.”',
            'Die erste Seite des ersten Bandes: „Das Boot meines Bruders kam im Sturm nicht zurück. Meine Unachtsamkeit. Das Licht ging für einen Moment aus.“',
          ]),
          nar('日誌の横に、古いテープが一本。ラベルには「{録音|ろくおん|v:n2_1890}　兄の舟歌」と書いてあった。', [
            'Beside the diaries lies an old tape. The label says: “Recording — my brother’s boat song.”',
            'Neben den Tagebüchern liegt ein altes Tonband. Auf dem Etikett steht: „Aufnahme – das Bootslied meines Bruders“.',
          ]),
        ],
        teach: ['v:suiheisen', 'v:n2_1628', 'v:n2_1823', 'v:n2_1890'],
      },
      {
        at: 'umino',
        goal: ['Talk to Mr. Umino at dawn', 'Sprich bei Tagesanbruch mit Herrn Umino'],
        music: 'lighthouse',
        lines: [
          l('umino', '読んだか。……あの夜、灯を一瞬止めたのは、わしだ。兄は、その一瞬に岩に当たった。', [
            'You read it. …That night, it was I who stopped the light for a moment. In that moment my brother hit the rocks.',
            'Du hast es gelesen. …In jener Nacht war ich es, der das Licht für einen Moment anhielt. In diesem Moment lief mein Bruder auf die Felsen.',
          ], 'worried'),
          l('umino', '日誌に書いた{とおり||g:x_toori}、四十年、一晩も休まずに灯してきた。それが、兄{に対して||g:nitaishite}できる、たった一つの償いだった。', [
            'Just as I wrote in the diary, for forty years I have kept the light burning without missing a single night. It was the only atonement I could make to my brother.',
            'Genau wie ich es ins Tagebuch geschrieben habe, habe ich vierzig Jahre lang keine einzige Nacht ausgelassen. Das war die einzige Sühne, die ich meinem Bruder gegenüber leisten konnte.',
          ]),
          ask(
            ['この灯台は、四十年、たくさんの船を守ってきたんですね', ['For forty years this lighthouse has protected so many ships.', 'Vierzig Jahre lang hat dieser Leuchtturm so viele Schiffe beschützt.']],
            ['テープ、一緒に聴きませんか', ['Shall we listen to the tape together?', 'Wollen wir uns das Band zusammen anhören?']],
          ),
          nar('古いテープから、かすれた歌声が{響いた|ひびいた|v:hibiku}。海野さんは、目を閉じて、小さく{口ずさんだ|くちずさんだ|v:kuchizusamu}。', [
            'A faint, rasping song rings out from the old tape. Mr. Umino closes his eyes and quietly hums along.',
            'Vom alten Band erklingt ein leiser, rauer Gesang. Herr Umino schließt die Augen und summt leise mit.',
          ]),
          l('umino', '償い、{というより||g:toiuyori}――兄と話していたのかもしれん。毎晩、光でな。', [
            'Not atonement so much as — maybe I was talking with my brother. Every night, with the light.',
            'Weniger Sühne als – vielleicht habe ich mit meinem Bruder gesprochen. Jede Nacht, mit dem Licht.',
          ]),
          pic('cg_harbor_lighthouse', '{夜明け|よあけ|v:yoake}。最後の灯が消え、{日の出|ひので|v:n2_1519}の光が、海を金色に染めた。', [
            'Dawn. The last light goes out, and the rising sun turns the sea to gold.',
            'Morgendämmerung. Das letzte Licht erlischt, und die aufgehende Sonne färbt das Meer golden.',
          ]),
          l('umino', '最後の日誌には、新しい一行を書こう。「兄さん、今日から、わしも休む」……{間も無く|まもなく|v:n2_1691}、春だな。', [
            'In the last diary I will write a new line: “Brother, from today I rest too.” …Spring is almost here.',
            'Ins letzte Tagebuch schreibe ich eine neue Zeile: „Bruder, ab heute ruhe auch ich.“ …Bald ist Frühling.',
          ], 'happy'),
        ],
        teach: ['v:hibiku', 'v:kuchizusamu', 'v:yoake', 'v:n2_1519', 'v:n2_1691', 'g:x_toori', 'g:nitaishite', 'g:toiuyori'],
      },
    ],
  },
];
