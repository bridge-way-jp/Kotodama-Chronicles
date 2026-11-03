import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 4, second round: Dr. Shiraishi, the harbour-restaurant owner, the harbour master. */
export const EPISODES_CH4B: Episode[] = [
  // ------------------------------------------------------------------ Dr. Shiraishi: the whale's voice
  {
    id: 'ep_shiraishi',
    chapter: 4,
    after: 'mq16',
    who: 'shiraishi',
    title: ['クジラの声', 'The Whale’s Voice', 'Die Stimme des Wals'],
    summary: [
      'Dr. Shiraishi’s research on whale songs is to lose its funding. Her late teacher’s last recording is still unheard.',
      'Dr. Shiraishis Forschung über Walgesänge soll ihre Förderung verlieren. Die letzte Aufnahme ihres verstorbenen Lehrers hat noch niemand angehört.',
    ],
    scenes: [
      {
        at: 'shiraishi',
        goal: ['Ask Dr. Shiraishi why she looks pale', 'Frag Dr. Shiraishi, warum sie so blass aussieht'],
        lines: [
          l('shiraishi', '@nameさん……。今日、大学から連絡があって。クジラの研究は{国家|こっか|v:n3_0927}の予算が出なくなるって。', ['@name… Today the university contacted me. The national budget for the whale research is being cut.', '@name… Heute hat sich die Uni gemeldet. Für die Walforschung gibt es kein staatliches Geld mehr.'], 'worried'),
          l('shiraishi', '{個人|こじん|v:n3_0924}のお金で続けるのは、{困難|こんなん|v:n3_0952}ね。{今後|こんご|v:n3_0949}どうするか、論文を書く{どころではない||g:dokorodehanai}わ。', [
            'Continuing with my own money would be hard. I’m in no state to write papers — I don’t know what to do from now on.',
            'Mit eigenem Geld weiterzumachen, ist schwierig. Ans Schreiben von Aufsätzen ist gar nicht zu denken – ich weiß nicht, wie es weitergeht.',
          ], 'worried'),
          l('shiraishi', 'この研究は、亡くなった先生と始めたの。先生は「クジラの歌を、人間の言葉で訳すのが{目標|もくひょう|v:n3_1065}だ」って、{夢中|むちゅう|v:n3_1039}で語っていた。', [
            'I started this research with my late teacher. He used to talk about it, completely absorbed: “Our goal is to translate the whales’ songs into human words.”',
            'Diese Forschung habe ich mit meinem verstorbenen Lehrer begonnen. Er hat immer ganz begeistert erzählt: „Unser Ziel ist es, die Lieder der Wale in Menschenworte zu übersetzen.“',
          ]),
          l('shiraishi', '防波堤の先に、先生の最後の録音テープが置いてあるの。……一人で聴く勇気がなくて。', ['At the end of the breakwater lies my teacher’s last recording. …I don’t have the courage to listen to it alone.', 'Am Ende der Mole liegt die letzte Aufnahme meines Lehrers. …Ich traue mich nicht, sie allein anzuhören.']),
        ],
        teach: ['v:n3_0927', 'v:n3_0924', 'v:n3_0952', 'v:n3_0949', 'v:n3_1065', 'v:n3_1039', 'g:dokorodehanai'],
      },
      {
        at: 'harbor_light',
        goal: ['Listen to the teacher’s last tape at the end of the breakwater', 'Hör dir am Ende der Mole das letzte Band des Lehrers an'],
        evening: true,
        music: 'memory',
        lines: [
          nar('夜の防波堤。古いテープから、波の音と、低く長いクジラの歌が流れた。', ['The breakwater at night. From the old tape come the sound of waves and the long, low song of a whale.', 'Die Mole bei Nacht. Vom alten Band kommen Wellenrauschen und der lange, tiefe Gesang eines Wals.']),
          nar('そして、かすれた男の声。「白石くん。君の{才能|さいのう|v:n3_0965}を、わたしは誰よりも信じている」', ['And then a hoarse man’s voice: “Shiraishi. I believe in your talent more than anyone.”', 'Und dann eine heisere Männerstimme: „Shiraishi. Ich glaube mehr als jeder andere an dein Talent.“']),
          nar('「この{作業|さぎょう|v:n3_0973}は、何十年もかかる。予算を{断られる|ことわられる|v:n3_0935}日もあるだろう。それでも、海の声を{守って|まもって|v:n3_1001}くれ」', [
            '“This work will take decades. There will be days when they refuse the funding. Even so, protect the voice of the sea.”',
            '„Diese Arbeit wird Jahrzehnte dauern. Es wird Tage geben, an denen man dir die Mittel verweigert. Trotzdem: Beschütze die Stimme des Meeres.“',
          ]),
          nar('テープの最後で、先生が{叫んで|さけんで|v:n3_0980}いた。「聞こえたか！ 今の歌、子どものクジラが母親を呼んでいる！」', [
            'At the end of the tape, the teacher is shouting: “Did you hear that? That song — a whale calf calling its mother!”',
            'Am Ende des Bandes ruft der Lehrer laut: „Hast du das gehört? Dieses Lied – ein Walkalb ruft seine Mutter!“',
          ]),
        ],
        teach: ['v:n3_0965', 'v:n3_0973', 'v:n3_0935', 'v:n3_1001', 'v:n3_0980'],
      },
      {
        at: 'shiraishi',
        goal: ['Tell Dr. Shiraishi what is on the tape', 'Erzähl Dr. Shiraishi, was auf dem Band ist'],
        lines: [
          l('shiraishi', '……先生、最後まで、あんなに楽しそうに。', ['…My teacher — so happy, right to the end.', '…Mein Lehrer – bis zum Schluss so glücklich.'], 'surprised'),
          l('shiraishi', '予想{に反して||g:nihanshite}、先生は悲しい言葉なんか残していなかった。子クジラが母親を呼ぶ声を、最後の{作品|さくひん|v:n3_0976}にしたのね。', [
            'Contrary to what I expected, he left no sad words at all. He made a whale calf calling its mother his last work.',
            'Entgegen meiner Erwartung hat er keine traurigen Worte hinterlassen. Er hat den Ruf eines Walkalbs nach seiner Mutter zu seinem letzten Werk gemacht.',
          ]),
          ask(
            ['町の人に、この声を聞いてもらいましょう', ['Let the people of the town hear this voice.', 'Lassen Sie die Leute der Stadt diese Stimme hören.']],
            ['先生の研究は、まだ終わっていません', ['Your teacher’s research isn’t over yet.', 'Die Forschung Ihres Lehrers ist noch nicht zu Ende.']],
          ),
          l('shiraishi', '予算がなくても、迷い{ながらも||g:nagaramo}続けるわ。来月、町の夏祭り{において||g:x_nioite}、クジラの歌を流す会を開く。町の人たちに{支えて|ささえて|v:n3_0982}もらえたら、きっと続けられる。', [
            'Even without the budget, I’ll keep going, doubts and all. Next month, at the town’s summer festival, I’ll hold an evening playing the whale songs. If the townspeople support me, I’m sure I can go on.',
            'Auch ohne Geld mache ich weiter, trotz aller Zweifel. Nächsten Monat, beim Sommerfest der Stadt, veranstalte ich einen Abend mit den Walgesängen. Wenn mich die Leute hier unterstützen, kann ich bestimmt weitermachen.',
          ], 'happy'),
          pic('cg_harbor_song', '夏祭りの夜の浜辺。クジラの歌が流れると、子どもたちが、そっと海のほうを向いた。', [
            'The beach on the night of the summer festival. When the whale song plays, the children quietly turn towards the sea.',
            'Der Strand in der Nacht des Sommerfests. Als der Walgesang erklingt, drehen sich die Kinder leise zum Meer.',
          ]),
          l('shiraishi', '海の声を聞く{未来|みらい|v:n3_1022}の研究者が、この中にいるかもしれないわね。', ['Maybe a future researcher of the sea’s voice is among them.', 'Vielleicht ist unter ihnen eine künftige Forscherin der Stimme des Meeres.'], 'happy'),
        ],
        teach: ['v:n3_0976', 'v:n3_0982', 'v:n3_1022', 'g:nihanshite', 'g:nagaramo', 'g:x_nioite'],
      },
    ],
  },

  // ------------------------------------------------------------------ the harbour-restaurant owner: breakfast at four
  {
    id: 'ep_diner_okami',
    chapter: 4,
    after: 'mq15',
    who: 'diner_okami',
    title: ['朝四時の定食', 'The Four O’Clock Breakfast', 'Das Frühstück um vier Uhr'],
    summary: [
      'The owner of the harbour restaurant has cooked breakfast for the fishermen at four every morning for forty years. Her back can’t take it any more.',
      'Die Wirtin des Hafenrestaurants kocht seit vierzig Jahren jeden Morgen um vier Frühstück für die Fischer. Ihr Rücken macht nicht mehr mit.',
    ],
    scenes: [
      {
        at: 'diner_okami',
        goal: ['Talk to the restaurant owner before dawn', 'Sprich vor Sonnenaufgang mit der Wirtin des Restaurants'],
        lines: [
          l('diner_okami', 'あら、こんな朝早くに。漁師さんたちのご{飯|めし|v:n3_1051}を作ってるところよ。', ['Oh, so early in the morning? I’m making the fishermen’s meal.', 'Oh, so früh am Morgen? Ich mache gerade das Essen für die Fischer.']),
          l('diner_okami', '……いたた。最近、{腰|こし|v:n3_0922}がね。去年は転んで、手首を{骨折|こっせつ|v:n3_0930}しちゃって。', ['…Ouch. My back, lately. Last year I fell and broke my wrist.', '…Autsch. Mein Rücken, in letzter Zeit. Letztes Jahr bin ich gestürzt und habe mir das Handgelenk gebrochen.'], 'worried'),
          l('diner_okami', '娘は「もう店をやめて」って言うの。年{のわりに||g:warini}元気だって言われるけど、正直、毎朝四時は{面倒|めんどう|v:n3_1058}になってきてね。', [
            'My daughter says, “Close the shop already.” People say I’m lively for my age, but honestly, four every morning is getting to be a chore.',
            'Meine Tochter sagt: „Hör endlich auf mit dem Laden.“ Die Leute sagen, ich sei für mein Alter noch fit, aber ehrlich gesagt wird es mir mit vier Uhr jeden Morgen langsam zu mühsam.',
          ], 'worried'),
          l('diner_okami', 'でも、源さんたち、ここで食べないと海に出ないのよ。……源さんに、本当のところを聞いてきてくれる？', ['But Gen-san and the others won’t go out to sea without eating here. …Would you ask Gen-san how it really is?', 'Aber Gen-san und die anderen fahren nicht aufs Meer, ohne hier gegessen zu haben. …Würdest du Gen-san fragen, wie es wirklich ist?']),
        ],
        teach: ['v:n3_1051', 'v:n3_0922', 'v:n3_0930', 'v:n3_1058', 'g:warini'],
      },
      {
        at: 'gen',
        goal: ['Ask Gen-san about the four o’clock breakfast', 'Frag Gen-san nach dem Frühstück um vier'],
        lines: [
          l('gen', 'あそこの朝飯か。……四十年、海に出る前に食ってきた。', ['Her breakfast? …For forty years I’ve eaten it before going out to sea.', 'Ihr Frühstück? …Seit vierzig Jahren esse ich es, bevor ich aufs Meer fahre.']),
          l('gen', '若いころ、嵐で船を失って、金がなかった時期がある。おかみは、黙って{無料|むりょう|v:n3_1041}で大{盛り|もり|v:n3_0972}にしてくれた。', [
            'When I was young I lost my boat in a storm and had no money for a while. She silently gave me a big helping for free.',
            'Als ich jung war, habe ich im Sturm mein Boot verloren und hatte eine Zeit lang kein Geld. Die Wirtin hat mir wortlos umsonst eine große Portion gegeben.',
          ]),
          l('gen', '{幸い|さいわい|v:n3_0968}、今は金に困っていない。だが、あの味じゃないと、どうも海に出る気がしねえ。……店をやめるなら、言ってくれればいい{ものを||g:monoo}。', [
            'Luckily I’m not short of money now. But without that taste, I just don’t feel like going out to sea. …If she’s going to close, she could just have said so.',
            'Zum Glück habe ich jetzt keine Geldsorgen. Aber ohne diesen Geschmack habe ich irgendwie keine Lust, aufs Meer zu fahren. …Wenn sie schließen will, hätte sie es doch einfach sagen können.',
          ]),
          l('gen', '朝飯の{材料|ざいりょう|v:n3_0967}くらい、おれたちが運んでやる。仕込みも、みんなで手伝えばいい。', ['We can carry the ingredients for her breakfasts at least. And we can all help with the preparation.', 'Die Zutaten fürs Frühstück können wir ihr wenigstens bringen. Und bei der Vorbereitung können wir alle helfen.']),
        ],
        teach: ['v:n3_1041', 'v:n3_0972', 'v:n3_0968', 'v:n3_0967', 'g:monoo'],
      },
      {
        at: 'diner_okami',
        goal: ['Go back to the restaurant at four in the morning', 'Geh um vier Uhr morgens zurück ins Restaurant'],
        evening: true,
        music: 'harbor',
        lines: [
          nar('翌朝、四時。店の前に、漁師たちが魚の箱と野菜を抱えて、並んでいた。', ['The next morning, four o’clock. In front of the restaurant, the fishermen stand in line carrying crates of fish and vegetables.', 'Am nächsten Morgen, vier Uhr. Vor dem Restaurant stehen die Fischer Schlange, mit Kisten voller Fisch und Gemüse im Arm.']),
          l('diner_okami', 'まあ、あんたたち……。{粉|こな|v:n3_0936}まで持ってきて。こぼさないでよ！', ['Oh, you lot… You even brought flour. Don’t spill it!', 'Ach, ihr… Ihr habt sogar Mehl mitgebracht. Nichts verschütten!'], 'surprised'),
          l('diner_okami', '昔{に比べて||g:nikurabete}体は弱くなったけど、みんなの顔を見る{につけ||g:x_nitsuke}、まだまだやれる気がするわ。', [
            'Compared to the old days my body has got weaker, but every time I see your faces, I feel I can still keep going.',
            'Verglichen mit früher ist mein Körper schwächer geworden, aber jedes Mal, wenn ich eure Gesichter sehe, habe ich das Gefühl, dass ich noch weitermachen kann.',
          ], 'happy'),
          l('diner_okami', 'これからは、朝は週三日だけにする。そのかわり、一品一品、心をこめて作るわ。……あんたも食べていきなさい。{満足|まんぞく|v:n3_1007}するまで、ね。', [
            'From now on I’ll only open three mornings a week. In return, I’ll make every dish with all my heart. …You eat too. Until you’re satisfied.',
            'Ab jetzt öffne ich morgens nur noch drei Tage in der Woche. Dafür mache ich jedes Gericht mit ganzem Herzen. …Iss du auch mit. Bis du satt und zufrieden bist.',
          ], 'happy'),
          pic('cg_harbor_arrival', '夜明け前の港食堂。湯気の中で、漁師たちとおかみさんが、大きな声で笑っていた。', [
            'The harbour restaurant before dawn. In the steam, the fishermen and the owner laugh out loud.',
            'Das Hafenrestaurant vor Tagesanbruch. Im Dampf lachen die Fischer und die Wirtin laut.',
          ]),
        ],
        teach: ['v:n3_0936', 'v:n3_1007', 'g:nikurabete', 'g:x_nitsuke'],
      },
    ],
  },

  // ------------------------------------------------------------------ the harbour master: the parcel in the storm
  {
    id: 'ep_harbor_chief',
    chapter: 4,
    after: 'mq17',
    who: 'harbor_chief',
    title: ['嵐の日の小包', 'The Parcel in the Storm', 'Das Paket im Sturm'],
    summary: [
      'A storm is coming. The last ferry carries a parcel for a girl’s engagement — and the harbour master must decide whether it may sail.',
      'Ein Sturm zieht auf. Die letzte Fähre bringt ein Paket für die Verlobung eines Mädchens – und der Hafenmeister muss entscheiden, ob sie auslaufen darf.',
    ],
    scenes: [
      {
        at: 'harbor_chief',
        goal: ['Ask the harbour master about the storm', 'Frag den Hafenmeister nach dem Sturm'],
        lines: [
          l('harbor_chief', '台風が近づいている。今夜は、島への最終のフェリーを止める{命令|めいれい|v:n3_1048}を出すかどうか、{迷って|まよって|v:n3_1002}いるんだ。', [
            'A typhoon is approaching. I’m torn over whether to give the order to stop tonight’s last ferry to the island.',
            'Ein Taifun kommt näher. Ich bin unschlüssig, ob ich heute Nacht den Befehl geben soll, die letzte Fähre zur Insel zu stoppen.',
          ], 'worried'),
          l('harbor_chief', 'フェリーには、島の娘さんへの{小包|こづつみ|v:n3_0931}が載る予定でね。明日が{婚約|こんやく|v:n3_0955}の日で、亡くなったお母さんの着物が入っているそうだ。', [
            'There’s a parcel due to go on the ferry for a young woman on the island. Tomorrow is her engagement, and it’s said to hold her late mother’s kimono.',
            'Auf der Fähre soll ein Paket für eine junge Frau auf der Insel mitfahren. Morgen ist ihre Verlobung, und darin soll der Kimono ihrer verstorbenen Mutter sein.',
          ]),
          l('harbor_chief', '{万一|まんいち|v:n3_1006}事故が起きたら、取り返しがつかない。危険は{避ける|さける|v:n3_0981}{に越したことはない||g:nikoshita}。……だが、あの子の気持ちを思うとな。', [
            'If by any chance there were an accident, it couldn’t be undone. Nothing beats avoiding danger. …But when I think of how she feels…',
            'Falls es zu einem Unfall käme, wäre das nicht wiedergutzumachen. Gefahr zu vermeiden ist immer das Beste. …Aber wenn ich daran denke, wie es ihr geht…',
          ], 'worried'),
        ],
        teach: ['v:n3_1048', 'v:n3_1002', 'v:n3_0931', 'v:n3_0955', 'v:n3_1006', 'v:n3_0981', 'g:nikoshita'],
      },
      {
        at: 'harbor_office',
        goal: ['Check the weather charts in the co-op office', 'Prüf die Wetterkarten im Büro der Genossenschaft'],
        lines: [
          nar('漁協の事務所。壁の天気図には、台風の進路が赤い線で描かれていた。', ['The fisheries co-op office. On the weather chart on the wall, the typhoon’s path is drawn in red.', 'Das Büro der Fischereigenossenschaft. Auf der Wetterkarte an der Wand ist der Weg des Taifuns rot eingezeichnet.']),
          nar('夕方から夜{にかけて||g:x_nikakete}、波は六メートル。港の{混雑|こんざつ|v:n3_0950}を避けて、漁船はもう全部戻っていた。', [
            'From evening into the night, six-metre waves. To avoid congestion in the harbour, the fishing boats have all come back already.',
            'Vom Abend bis in die Nacht sechs Meter hohe Wellen. Um Gedränge im Hafen zu vermeiden, sind alle Fischerboote schon zurück.',
          ]),
          nar('机の上に、源さんのメモ。「船を出した{ところで||g:tatokorode}、今夜は島に着けん。だが、朝の便なら、波は静まる。　源」', [
            'On the desk, a note from Gen-san: “Even if you did send the ferry out, it couldn’t reach the island tonight. But the morning boat — the waves will have calmed by then. — Gen”',
            'Auf dem Tisch ein Zettel von Gen-san: „Selbst wenn man die Fähre jetzt losschickt, kommt sie heute Nacht nicht zur Insel. Aber mit dem Boot am Morgen – dann haben sich die Wellen beruhigt. – Gen“',
          ]),
        ],
        teach: ['v:n3_0950', 'g:x_nikakete', 'g:tatokorode'],
      },
      {
        at: 'harbor_chief',
        goal: ['Bring Gen-san’s note to the harbour master', 'Bring dem Hafenmeister Gen-sans Zettel'],
        evening: true,
        music: 'harbor',
        lines: [
          nar('源さんのメモを渡すと、所長は、窓の外の荒れた海をしばらく見ていた。', ['When you give him Gen-san’s note, the harbour master looks out at the rough sea for a long while.', 'Als du ihm Gen-sans Zettel gibst, schaut der Hafenmeister lange auf die aufgewühlte See hinaus.']),
          l('harbor_chief', 'どちら{にしても||g:nishitemo}、今夜は出せない。それが{明確|めいかく|v:n3_1043}になった。……源さんの言うとおりだ。', ['Either way, it can’t sail tonight. That’s clear now. …Gen-san is right.', 'So oder so, heute Nacht kann sie nicht auslaufen. Das ist jetzt klar. …Gen-san hat recht.']),
          ask(
            ['朝の便で、小包を届けましょう', ['Let’s deliver the parcel with the morning boat.', 'Lassen Sie uns das Paket mit dem Morgenboot bringen.']],
            ['島の娘さんに、電話で伝えましょう', ['Let’s tell the young woman on the island by phone.', 'Lassen Sie uns der jungen Frau auf der Insel telefonisch Bescheid geben.']],
          ),
          l('harbor_chief', '今、島に電話したら、ちょうど娘さんが港に来た{ところに||g:x_tokoroni}、つながってね。「朝まで待ちます」と言ってくれた。', [
            'I just phoned the island, and it got through just as the young woman had come to the harbour. She said, “I’ll wait until morning.”',
            'Ich habe gerade auf der Insel angerufen, und ich bin genau in dem Moment durchgekommen, als die junge Frau zum Hafen kam. Sie sagte: „Ich warte bis morgen früh.“',
          ], 'happy'),
          nar('――翌朝。嵐の去った海を、朝一番のフェリーが{見事|みごと|v:n3_1012}に渡っていった。港の人たちは、それを{認めて|みとめて|v:n3_1016}、静かに手を振った。', [
            '— The next morning. The first ferry of the day crosses the storm-washed sea splendidly. The harbour people see it and wave quietly.',
            '— Am nächsten Morgen. Die erste Fähre des Tages überquert prächtig das Meer, über das der Sturm hinweggezogen ist. Die Leute am Hafen sehen es und winken leise.',
          ]),
          pic('cg_harbor_lighthouse', '嵐の翌朝。光る海の上を、小さなフェリーが島へ向かっていた。', [
            'The morning after the storm. A small ferry heads for the island across the shining sea.',
            'Der Morgen nach dem Sturm. Eine kleine Fähre fährt über das glänzende Meer zur Insel.',
          ]),
        ],
        teach: ['v:n3_1043', 'v:n3_1012', 'v:n3_1016', 'g:nishitemo', 'g:x_tokoroni'],
      },
    ],
  },
];
