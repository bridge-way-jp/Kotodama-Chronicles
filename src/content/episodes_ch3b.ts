import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 3, second round: Dr. Fujii, the young priest of the mountain temple. */
export const EPISODES_CH3B: Episode[] = [
  // ------------------------------------------------------------------ Dr. Fujii: the house call in the blizzard
  {
    id: 'ep_fujii',
    chapter: 3,
    after: 'mq11',
    who: 'fujii',
    title: ['吹雪の往診', 'The House Call in the Blizzard', 'Der Hausbesuch im Schneesturm'],
    summary: [
      'Dr. Fujii came from Tokyo for two years. That was eight years ago. Now a Tokyo hospital has offered her a post.',
      'Dr. Fujii kam für zwei Jahre aus Tokio. Das war vor acht Jahren. Jetzt bietet ihr ein Krankenhaus in Tokio eine Stelle an.',
    ],
    scenes: [
      {
        at: 'fujii',
        goal: ['Ask Dr. Fujii about the letter on her desk', 'Frag Dr. Fujii nach dem Brief auf ihrem Schreibtisch'],
        lines: [
          l('fujii', 'これ？ 東京の大きな病院からの手紙。来年から来ないかって。{給料|きゅうりょう|v:n3_0743}も今の倍、{休暇|きゅうか|v:n3_0735}もちゃんと取れるわ。', [
            'This? A letter from a big hospital in Tokyo, asking if I’ll come next year. Twice my current salary, and proper holidays too.',
            'Das hier? Ein Brief von einem großen Krankenhaus in Tokio. Ob ich nächstes Jahr komme. Doppeltes Gehalt, und ich könnte auch richtig Urlaub nehmen.',
          ]),
          l('fujii', '最初は二年だけのつもりだったの。でも、この村は医者がわたし一人。{患者|かんじゃ|v:n3_0673}さんを置いていくのは、{気の毒|きのどく|v:n3_0720}で……。', [
            'At first I meant to stay only two years. But I’m the only doctor in this village. Leaving my patients behind feels terrible…',
            'Anfangs wollte ich nur zwei Jahre bleiben. Aber ich bin die einzige Ärztin im Dorf. Meine Patienten zurückzulassen, tut mir so leid…',
          ], 'worried'),
          l('fujii', '医者の{義務|ぎむ|v:n3_0727}と、自分の{希望|きぼう|v:n3_0722}と。どっちを選んでも、後悔しそうで。', ['A doctor’s duty, and my own wishes. Whichever I choose, I feel I’ll regret it.', 'Die Pflicht einer Ärztin und mein eigener Wunsch. Was ich auch wähle, ich werde es wohl bereuen.'], 'worried'),
          nar('そのとき、診療所の電話が鳴った。外は、{急に|きゅうに|v:n3_0742}激しい吹雪になっていた。', ['Just then the clinic phone rings. Outside, a heavy blizzard has suddenly started.', 'Da klingelt das Telefon der Praxis. Draußen hat plötzlich ein heftiger Schneesturm eingesetzt.']),
          l('fujii', '……民宿のおじいさんが倒れたって！ こんな日{に限って||g:nikagitte}……。@nameさん、一緒に来て！', ['…The old man at the guesthouse has collapsed! Of all days, it had to be today… @name, come with me!', '…Der alte Mann in der Pension ist zusammengebrochen! Ausgerechnet heute… @name, komm mit!'], 'surprised'),
        ],
        teach: ['v:n3_0743', 'v:n3_0735', 'v:n3_0673', 'v:n3_0720', 'v:n3_0727', 'v:n3_0722', 'v:n3_0742', 'g:nikagitte'],
      },
      {
        at: 'yukimi_guesthouse',
        goal: ['Help Dr. Fujii at the guesthouse in the blizzard', 'Hilf Dr. Fujii im Schneesturm in der Pension'],
        evening: true,
        music: 'snow',
        lines: [
          nar('{気温|きおん|v:n3_0691}は零下十五度。藤井先生は、雪で真っ白になるの{もかまわず||g:x_mokamawazu}、民宿に駆けこんだ。', [
            'Minus fifteen degrees. Dr. Fujii, not caring that she is turning white with snow, rushes into the guesthouse.',
            'Minus fünfzehn Grad. Dr. Fujii stürzt in die Pension, ohne darauf zu achten, dass sie ganz weiß vom Schnee wird.',
          ]),
          nar('倒れたおじいさんの腕には、転んだときの{傷|きず|v:n3_0707}。息は、{かなり||v:n3_0634}苦しそうだ。', ['The old man who collapsed has a wound on his arm from his fall. His breathing looks very laboured.', 'Der zusammengebrochene alte Mann hat eine Wunde am Arm vom Sturz. Er atmet ziemlich schwer.']),
          nar('「先生、痛いのは{我慢|がまん|v:n3_0640}できる。町の病院には行かんでいい。先生がいてくれれば、それでいいんじゃ」', [
            '“Doctor, I can bear the pain. I don’t need to go to the city hospital. As long as you’re here, that’s enough.”',
            '„Frau Doktor, den Schmerz halte ich aus. Ins Krankenhaus in der Stadt muss ich nicht. Solange Sie da sind, reicht das.“',
          ]),
          nar('先生は、おじいさんの{肩|かた|v:n3_0613}にそっと手を置き、薬を飲ませた。一時間後、薬が{効いて|きいて|v:n3_0698}、おじいさんは静かに眠った。', [
            'The doctor gently lays a hand on the old man’s shoulder and gives him his medicine. An hour later the medicine takes effect, and he falls quietly asleep.',
            'Die Ärztin legt dem alten Mann sanft die Hand auf die Schulter und gibt ihm das Medikament. Eine Stunde später wirkt es, und er schläft ruhig ein.',
          ]),
          nar('壁には、村の人たちが書いた寄せ書きが貼ってあった。「藤井先生、いつもありがとう」「先生が来てくれた日は、村の記念日です」', [
            'On the wall hangs a card signed by all the villagers: “Dr. Fujii, thank you always.” “The day you came is a holiday for the village.”',
            'An der Wand hängt eine Karte mit Grüßen der Dorfleute: „Frau Dr. Fujii, danke für alles.“ „Der Tag, an dem Sie kamen, ist ein Feiertag für das Dorf.“',
          ]),
        ],
        teach: ['v:n3_0691', 'v:n3_0707', 'v:n3_0634', 'v:n3_0640', 'v:n3_0613', 'v:n3_0698', 'g:x_mokamawazu'],
      },
      {
        at: 'fujii',
        goal: ['Walk back to the clinic with Dr. Fujii at dawn', 'Geh im Morgengrauen mit Dr. Fujii zurück in die Praxis'],
        music: 'snow',
        lines: [
          l('fujii', '……一晩中いてくれて、ありがとう。おじいさん、もう大丈夫よ。', ['…Thank you for staying all night. The old man is out of danger now.', '…Danke, dass du die ganze Nacht geblieben bist. Dem alten Mann geht es jetzt wieder gut.'], 'happy'),
          l('fujii', '東京の病院は、設備も{環境|かんきょう|v:n3_0667}も、ここよりずっといい。でもね、あの寄せ書きを見たら、行かずには{いられない||g:zuniwairarenai}、なんて思えなかった。', [
            'The Tokyo hospital has far better equipment and surroundings than here. But after seeing that card, I just couldn’t feel I had to go.',
            'Das Krankenhaus in Tokio hat viel bessere Geräte und Bedingungen als hier. Aber nachdem ich die Karte gesehen habe, hatte ich nicht mehr das Gefühl, unbedingt gehen zu müssen.',
          ]),
          ask(
            ['村の人は、先生をとても必要としています', ['The villagers need you very much.', 'Die Dorfleute brauchen Sie sehr.']],
            ['先生自身は、どうしたいんですか', ['What do you yourself want to do?', 'Was möchten Sie selbst?']],
          ),
          l('fujii', '医者が一人しかいない村で、ここまで{感謝|かんしゃ|v:n3_0672}されるのは、それだけ{貴重|きちょう|v:n3_0711}な仕事だからなのね。……東京には、断りの手紙を書くわ。', [
            'Being thanked this much in a village with only one doctor — it means the work is just that precious. …I’ll write to Tokyo and decline.',
            'In einem Dorf mit nur einer Ärztin so viel Dank zu bekommen – das heißt, dass die Arbeit genauso kostbar ist. …Ich schreibe nach Tokio und sage ab.',
          ], 'happy'),
          l('fujii', 'あの頑固なおじいさん{のことだから||g:kotodakara}、明日には「もう治った」って畑に出るわね。……だから、ここにいる{わけだ||g:x_wakeda}。わたしの{期待|きたい|v:n3_0708}以上に、手のかかる村だもの。', [
            'Knowing that stubborn old man, he’ll be out in his field tomorrow saying “I’m all better.” …That’s exactly why I’m staying. This village is more work than I ever expected.',
            'So wie ich den sturen alten Mann kenne, ist er morgen schon auf dem Feld und sagt: „Ich bin wieder gesund.“ …Genau deshalb bleibe ich. Dieses Dorf macht mehr Arbeit, als ich je erwartet hätte.',
          ], 'happy'),
          pic('cg_dream_snow', '吹雪のやんだ朝。雪の村に、診療所の灯りが、まだやさしくともっていた。', [
            'The morning after the blizzard. In the snowy village, the clinic’s light is still softly glowing.',
            'Der Morgen nach dem Schneesturm. Im verschneiten Dorf leuchtet das Licht der Praxis noch immer sanft.',
          ]),
        ],
        teach: ['v:n3_0667', 'v:n3_0672', 'v:n3_0711', 'v:n3_0708', 'g:zuniwairarenai', 'g:kotodakara', 'g:x_wakeda'],
      },
    ],
  },

  // ------------------------------------------------------------------ the young priest of the mountain temple: the practice of silence
  {
    id: 'ep_temple_priest',
    chapter: 3,
    after: 'mq13',
    who: 'temple_priest',
    title: ['沈黙の修行', 'The Practice of Silence', 'Die Übung des Schweigens'],
    summary: [
      'The young priest of the mountain temple was a salesman in Tokyo three years ago. He still cannot sit still in silence.',
      'Der junge Mönch im Bergtempel war vor drei Jahren noch Verkäufer in Tokio. Er kann noch immer nicht still sitzen.',
    ],
    scenes: [
      {
        at: 'temple_priest',
        goal: ['Sit with the young priest in the temple', 'Sitz mit dem jungen Mönch im Tempel'],
        lines: [
          l('temple_priest', 'ようこそ。……と言っても、僕もまだ修行三年目の、新米なんですけどね。', ['Welcome. …Though I’m only a beginner myself, in my third year of training.', 'Willkommen. …Obwohl ich selbst noch Anfänger bin, im dritten Jahr meiner Ausbildung.']),
          l('temple_priest', '三年前まで、東京で営業の仕事をしていました。毎日、言葉で人を動かして、数字ばかり{数えて|かぞえて|v:n3_0611}いた。', ['Until three years ago I worked in sales in Tokyo. Every day I moved people with words and did nothing but count numbers.', 'Bis vor drei Jahren war ich im Vertrieb in Tokio. Jeden Tag habe ich Menschen mit Worten bewegt und nur Zahlen gezählt.']),
          l('temple_priest', 'ある日、急に言葉が一つも出てこなくなったんです。自分の{感情|かんじょう|v:n3_0675}も、{感覚|かんかく|v:n3_0664}も、わからなくなって。', ['One day, suddenly, not a single word would come out. I couldn’t feel my own emotions or sensations any more.', 'Eines Tages kam plötzlich kein einziges Wort mehr heraus. Ich spürte weder meine eigenen Gefühle noch meine Sinne.'], 'worried'),
          l('temple_priest', '和尚様は「黙って座れ」とだけ。でも、黙っていると、色々な{考え|かんがえ|v:n3_0663}が浮かんで、気になっ{てしかたがない||g:teshikatanai}んです。', [
            'The master only says, “Sit in silence.” But when I’m silent, all kinds of thoughts come up, and I can’t stop being bothered by them.',
            'Der Meister sagt nur: „Sitz still.“ Aber wenn ich schweige, kommen mir alle möglichen Gedanken, und sie lassen mich einfach nicht los.',
          ], 'worried'),
          l('temple_priest', '本堂の裏に、和尚様が若いころに書いた修行の記録があるそうです。……一緒に、見に行きませんか。', ['Behind the main hall there is said to be the master’s training journal from his youth. …Will you come and look with me?', 'Hinter der Haupthalle soll das Übungstagebuch liegen, das der Meister in seiner Jugend geschrieben hat. …Kommst du mit, es anschauen?']),
        ],
        teach: ['v:n3_0611', 'v:n3_0675', 'v:n3_0664', 'v:n3_0663', 'g:teshikatanai'],
      },
      {
        at: 'yukimi_temple',
        goal: ['Read the master’s old training journal behind the main hall', 'Lies das alte Übungstagebuch des Meisters hinter der Haupthalle'],
        evening: true,
        music: 'memory',
        lines: [
          nar('古いノートには、若い僧の字で、毎日の修行が{語られて|かたられて|v:n3_0619}いた。', ['In the old notebook, in a young monk’s handwriting, every day of training is told.', 'Im alten Heft wird in der Schrift eines jungen Mönchs jeder Übungstag erzählt.']),
          nar('「三日目。座っても、雑念ばかり。修行に{価値|かち|v:n3_0621}などあるのか、{疑問|ぎもん|v:n3_0728}だ」「十日目。{雷|かみなり|v:n3_0643}の音に驚いて、逃げ出した」', [
            '“Day three. Even sitting, nothing but idle thoughts. I doubt this training has any value.” “Day ten. Startled by thunder, I ran away.”',
            '„Tag drei. Selbst im Sitzen nur Gedankengewirr. Ich bezweifle, dass diese Übung irgendeinen Wert hat.“ „Tag zehn. Vom Donner erschreckt, bin ich weggelaufen.“',
          ]),
          nar('「百日目。雪の音を、ただ{観察|かんさつ|v:n3_0670}した。考えを消すのではない。考えを、そのまま見ていればいいと{気付いた|きづいた|v:n3_0715}」', [
            '“Day one hundred. I simply observed the sound of the snow. It isn’t about erasing thoughts. I realised I only have to watch them as they are.”',
            '„Tag hundert. Ich habe einfach das Geräusch des Schnees beobachtet. Es geht nicht darum, Gedanken auszulöschen. Mir wurde klar, dass ich sie nur so betrachten muss, wie sie sind.“',
          ]),
          nar('最後のページ。「沈黙は、言葉のない{完全|かんぜん|v:n3_0681}な静けさではない。言葉が生まれる前の、{過程|かてい|v:n3_0630}なのだ」', [
            'The last page: “Silence is not a perfect stillness without words. It is the process before words are born.”',
            'Die letzte Seite: „Schweigen ist keine vollkommene Stille ohne Worte. Es ist der Vorgang, bevor Worte geboren werden.“',
          ]),
        ],
        teach: ['v:n3_0619', 'v:n3_0621', 'v:n3_0728', 'v:n3_0643', 'v:n3_0670', 'v:n3_0715', 'v:n3_0681', 'v:n3_0630'],
      },
      {
        at: 'temple_priest',
        goal: ['Tell the young priest what the journal says', 'Erzähl dem jungen Mönch, was im Tagebuch steht'],
        lines: [
          l('temple_priest', '……和尚様も、雷で逃げ出したんですか。あの和尚様が。', ['…The master ran away from thunder too? That master?', '…Der Meister ist auch vor dem Donner weggelaufen? Ausgerechnet der Meister?'], 'surprised'),
          l('temple_priest', '雑念を消せない自分を、ずっと{悲しんで|かなしんで|v:n3_0632}いました。でも、考えを消す必要はない。浮かんだ{まま||g:x_mama}、見ていればいい。', [
            'I’ve been grieving all along that I can’t get rid of my idle thoughts. But there’s no need to erase them. I can just watch them as they come up.',
            'Ich war die ganze Zeit traurig, dass ich mein Gedankengewirr nicht loswerde. Aber ich muss die Gedanken nicht auslöschen. Ich kann sie einfach so lassen, wie sie kommen, und zuschauen.',
          ]),
          l('temple_priest', 'もし東京に戻る{としたら||g:toshitara}、今度は、相手の言葉の前の沈黙も、聞ける人間になりたい。……もう、数字だけを追う生き方には、戻る{まい||g:x_mai}。', [
            'If I were to go back to Tokyo, this time I want to be someone who can also hear the silence before the other person’s words. …I won’t go back to a life of chasing nothing but numbers.',
            'Falls ich nach Tokio zurückgehe, möchte ich diesmal ein Mensch sein, der auch die Stille vor den Worten des anderen hören kann. …Zu einem Leben, in dem ich nur Zahlen nachjage, will ich nicht zurück.',
          ], 'happy'),
          l('temple_priest', '雪の音、風の音、心臓の音、うれしい{やら||g:x_yara}恥ずかしい{やら||g:x_yara}……今は、全部聞こえる気がします。不思議な{感動|かんどう|v:n3_0684}です。', [
            'The sound of the snow, the wind, my heartbeat — I’m happy and embarrassed all at once… Right now I feel I can hear everything. It’s a strange, moving feeling.',
            'Das Geräusch des Schnees, des Windes, mein Herzschlag – ich bin froh und verlegen zugleich… Gerade habe ich das Gefühl, alles zu hören. Es ist seltsam bewegend.',
          ], 'happy'),
          pic('cg_mountain_hearth', '雪の山寺。若い僧が、目を閉じて、静かに座っていた。その顔は、少しだけ笑っていた。', [
            'The snowy mountain temple. The young priest sits quietly with his eyes closed. His face is smiling just a little.',
            'Der verschneite Bergtempel. Der junge Mönch sitzt still mit geschlossenen Augen. Sein Gesicht lächelt ein klein wenig.',
          ]),
        ],
        teach: ['v:n3_0632', 'v:n3_0684', 'g:x_mama', 'g:toshitara', 'g:x_mai', 'g:x_yara'],
      },
    ],
  },
];
