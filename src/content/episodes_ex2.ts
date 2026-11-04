import { ask, l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 2: the people of the valley's branch school and rice terraces (content/expansion.ts). */
export const EPISODES_EX2: Episode[] = [
  // ------------------------------------------------------------------ Masaji: the last man on the upper terraces
  {
    id: 'ep_ex_masaji',
    chapter: 2,
    after: 'mq7',
    who: 'ex_masaji',
    title: ['上の棚田', 'The Upper Terraces', 'Die oberen Terrassen'],
    summary: [
      'Old Masaji is the last one still farming the upper rice terraces. When his knees give out, the terraces will go wild for ever.',
      'Der alte Masaji bestellt als Letzter noch die oberen Reisterrassen. Wenn seine Knie nicht mehr mitmachen, verwildern die Terrassen für immer.',
    ],
    scenes: [
      {
        at: 'ex_masaji',
        goal: ['Talk to Masaji on the terraces', 'Sprich mit Masaji auf den Terrassen'],
        lines: [
          l('ex_masaji', 'この{丘|おか|v:n3_0498}の上の{田んぼ|たんぼ|v:tanbo}は、わしのじいさんが{岩|いわ|v:n3_0423}を一つずつ積んで作ったんじゃ。', ['The paddies on top of this hill — my grandfather built them, piling up the rocks one by one.', 'Die Reisfelder oben auf diesem Hügel hat mein Großvater angelegt, Stein für Stein aufgeschichtet.']),
          l('ex_masaji', '下の{平野|へいや|v:n2_1614}の田んぼは、機械で一日。ここは、{面積|めんせき|v:n2_1761}は小さいのに、{田植え|たうえ|v:n2_1109}に一週間かかる。', ['The paddies down on the plain take a day with machines. Up here the area is small, yet rice planting takes a week.', 'Die Felder unten in der Ebene sind mit Maschinen in einem Tag fertig. Hier oben ist die Fläche klein, und trotzdem dauert das Reispflanzen eine Woche.']),
          l('ex_masaji', '水は、山の{泉|いずみ|v:n3_0377}から引いておる。{四季|しき|v:n2_0759}を通して、一度も{枯|か}れたことがない。', ['The water comes from a spring in the mountain. Through all four seasons it has never once run dry.', 'Das Wasser kommt aus einer Quelle im Berg. In allen vier Jahreszeiten ist sie noch nie versiegt.']),
          l('ex_masaji', 'じゃが、わしの{膝|ひざ}も、{老い|おい|v:n3_0485}には勝てん。{いずれ||v:n3_0378}、ここも草が{茂って|しげって|v:n2_0762}、山に{戻|もど}るじゃろう。', ['But even my knees can’t beat old age. Sooner or later the grass will grow thick here too, and it’ll go back to the mountain.', 'Aber auch meine Knie können das Alter nicht besiegen. Früher oder später wuchert hier das Gras, und alles wird wieder Berg.'], 'worried'),
        ],
        teach: ['v:n3_0498', 'v:tanbo', 'v:n3_0423', 'v:n2_1614', 'v:n2_1761', 'v:n2_1109', 'v:n3_0377', 'v:n2_0759', 'v:n3_0485', 'v:n3_0378', 'v:n2_0762'],
      },
      {
        at: 'ext_farm',
        goal: ['Visit Masaji’s farmhouse', 'Besuche Masajis Bauernhaus'],
        lines: [
          nar('{縁側|えんがわ}に、{稲|いね|v:n3_0408}の{束|たば}が{干して|ほして|v:n2_1650}ある。{農村|のうそん|v:n2_1396}の、昔のままの{秋|あき}の{景色|けしき}だ。', ['On the veranda, bundles of rice plants are hung out to dry. An autumn scene of a farming village, just as it always was.', 'Auf der Veranda hängen Reisbündel zum Trocknen. Ein Herbstbild aus einem Bauerndorf, wie es immer war.']),
          l('ex_masaji', 'この米は、売っても安い。{農産物|のうさんぶつ|v:n2_1395}の値段なんて、{恐らく|おそらく|v:n3_0512}これからも上がらんじゃろう。', ['This rice sells cheap. The prices of farm produce probably won’t go up from here either.', 'Dieser Reis bringt wenig. Die Preise für Agrarprodukte werden wohl auch künftig nicht steigen.']),
          l('ex_masaji', 'それでも作るのはな……ばあさんが「ここの米が{一層|いっそう|v:n3_0397}おいしい」と言うてくれたからじゃ。', ['The reason I still grow it… is that my wife always said, “The rice from up here tastes even better.”', 'Dass ich ihn trotzdem anbaue … liegt daran, dass meine Frau immer sagte: „Der Reis von hier oben schmeckt noch besser.“']),
        ],
        teach: ['v:n3_0408', 'v:n2_1650', 'v:n2_1396', 'v:n2_1395', 'v:n3_0512', 'v:n3_0397'],
      },
      {
        at: 'ex_masaji',
        goal: ['Help Masaji with the harvest', 'Hilf Masaji bei der Ernte'],
        music: 'memory',
        lines: [
          nar('{稲刈|いねか}りの日。{陽介|ようすけ}さんと{大地|だいち}くんと{分校|ぶんこう}カフェの{理沙|りさ}さんが、{鎌|かま}を持って{坂|さか}を登ってきた。', ['Harvest day. Yōsuke, little Daichi and Risa from the school café come up the slope with sickles.', 'Erntetag. Yōsuke, der kleine Daichi und Risa vom Schulcafé kommen mit Sicheln den Hang herauf.']),
          l('ex_masaji', '……なんじゃ、お前ら。こんな{年寄|としよ}りの田んぼに。', ['…What’s this, you lot? Coming to an old man’s paddies like this?', '… Was soll das, ihr? Kommt einfach zu den Feldern eines alten Mannes?'], 'surprised'),
          l('ex_masaji', '{覚悟|かくご|v:n3_0584}はしとった。わしの代で終わる、とな。……じゃが、{永遠|えいえん|v:n3_0466}に続くものは、一人じゃ作れんのじゃな。', ['I had made up my mind: it ends with me. …But it seems nothing that lasts for ever can be made by one person alone.', 'Ich hatte mich damit abgefunden: Mit mir ist Schluss. … Aber was ewig hält, schafft man offenbar nicht allein.'], 'happy'),
        ],
        teach: ['v:n3_0584', 'v:n3_0466'],
      },
    ],
  },
  // ------------------------------------------------------------------ Risa: “the one from the city”
  {
    id: 'ep_ex_risa',
    chapter: 2,
    after: 'mq7',
    who: 'ex_risa',
    title: ['都会の人', 'The One from the City', 'Die aus der Stadt'],
    summary: [
      'Risa turned the old branch school into a café three years ago. The villagers still call her “the one from the city”.',
      'Risa hat vor drei Jahren die alte Zweigschule in ein Café verwandelt. Die Dorfleute nennen sie immer noch „die aus der Stadt“.',
    ],
    scenes: [
      {
        at: 'ex_risa',
        goal: ['Have a cup at the school café', 'Trink etwas im Schulcafé'],
        lines: [
          nar('{分校|ぶんこう}カフェ。コーヒーのいい{香り|かおり|v:n3_0569}がする。{黒板|こくばん}に「本日の{丼|どんぶり|v:n2_1333}」と書いてある。', ['The school café. It smells of good coffee. The blackboard says: “Today’s rice bowl”.', 'Das Schulcafé. Es duftet nach gutem Kaffee. Auf der Tafel steht: „Reisschüssel des Tages“.']),
          l('ex_risa', 'いらっしゃい。{お代わり|おかわり|v:n2_0286}は自由よ。今日の{おかず||v:n2_0283}は、村のおばあちゃんに{教わった|おそわった}{煮物|にもの}。', ['Welcome. Refills are free. Today’s side dish is a stew a grandma from the village taught me.', 'Willkommen. Nachschlag ist gratis. Die Beilage heute ist ein Schmorgericht, das mir eine Oma aus dem Dorf beigebracht hat.'], 'happy'),
          l('ex_risa', '{営業|えいぎょう|v:n3_0469}は朝十時から。{定休日|ていきゅうび|v:n2_1237}は水曜日。……でも、村の人は、ほとんど来ないの。', ['We’re open from ten in the morning, closed on Wednesdays. …But hardly anyone from the village comes.', 'Geöffnet ist ab zehn Uhr morgens, Ruhetag ist Mittwoch. … Aber kaum jemand aus dem Dorf kommt.'], 'worried'),
          l('ex_risa', '店の中を{快適|かいてき|v:n3_0561}にしても、メニューを{改善|かいぜん|v:n3_0560}しても……。都会の{イメージ||v:n3_0416}が強すぎるのかな。', ['Even though I made the café comfortable and improved the menu… Maybe my city image is just too strong.', 'Auch wenn ich das Café gemütlich gemacht und die Karte verbessert habe … Vielleicht ist mein Stadt-Image einfach zu stark.']),
        ],
        teach: ['v:n3_0569', 'v:n2_1333', 'v:n2_0286', 'v:n2_0283', 'v:n3_0469', 'v:n2_1237', 'v:n3_0561', 'v:n3_0560', 'v:n3_0416'],
      },
      {
        at: 'ex_risa',
        goal: ['Hear what the village says about Risa', 'Hör, was das Dorf über Risa sagt'],
        lines: [
          l('ex_risa', '村の{噂|うわさ|v:n3_0462}、聞いちゃったの。「都会の人は、どうせすぐ{飽きて|あきて}帰る」って。', ['I overheard the village gossip: “City people always get bored and go back soon anyway.”', 'Ich habe das Dorfgerede gehört: „Stadtleute werden es eh bald leid und gehen zurück.“'], 'worried'),
          l('ex_risa', '{意地悪|いじわる|v:n3_0376}で言ってるんじゃないのは分かる。でも、わたしの{本気|ほんき}を、まだ{疑って|うたがって|v:n3_0443}るのよね。', ['I know they don’t say it out of spite. But they still doubt that I’m serious.', 'Ich weiß, dass sie es nicht aus Bosheit sagen. Aber sie bezweifeln immer noch, dass ich es ernst meine.']),
          l('ex_risa', '最初の{印象|いんしょう|v:n3_0430}って、こわいわね。都会では、だれもわたしのことなんか見てなかったのに。', ['First impressions are scary, aren’t they. In the city, nobody even looked at me.', 'Der erste Eindruck ist schon unheimlich. In der Stadt hat mich niemand auch nur angesehen.']),
          l('ex_risa', 'ここの人たちが、少し{羨ましい|うらやましい|v:n3_0460}の。{お互い|おたがい|v:n3_0516}の家の{好き嫌い|すききらい|v:n2_0958}まで知ってるんだもの。', ['I envy the people here a little. They even know each other’s likes and dislikes.', 'Ich beneide die Leute hier ein bisschen. Sie kennen sogar die Vorlieben und Abneigungen der anderen Familien.']),
        ],
        teach: ['v:n3_0462', 'v:n3_0376', 'v:n3_0443', 'v:n3_0430', 'v:n3_0460', 'v:n3_0516', 'v:n2_0958'],
      },
      {
        at: 'ex_risa',
        goal: ['Come to the café on the day of the harvest', 'Komm am Erntetag ins Café'],
        music: 'memory',
        lines: [
          nar('{稲刈|いねか}りの後、{泥|どろ}だらけの村人たちが、{次々|つぎつぎ}にカフェに入ってきた。「腹へった！」「何かあるか？」', ['After the harvest, mud-covered villagers stream into the café one after another. “I’m starving!” “Got anything?”', 'Nach der Ernte strömen schlammbedeckte Dorfleute nacheinander ins Café. „Ich hab Hunger!“ „Gibt’s was?“']),
          l('ex_risa', 'お{米|こめ}は{正次|まさじ}さんの田んぼのよ。{調味料|ちょうみりょう|v:n2_1184}は、全部この村のもの。', ['The rice is from Masaji’s paddies. The seasonings are all from this village.', 'Der Reis ist von Masajis Feldern. Die Gewürze kommen alle aus diesem Dorf.'], 'happy'),
          nar('「{図々しい|ずうずうしい|v:n2_0951}けど、明日も来ていいか？」……おじいさんが、照れたように言った。', ['“It’s a cheek, but can we come again tomorrow?” …an old man asks, a little embarrassed.', '„Ist ja dreist, aber dürfen wir morgen wiederkommen?“ … fragt ein alter Mann etwas verlegen.']),
          l('ex_risa', 'もちろん！……ねえ、今、だれもわたしを「都会の人」って呼ばなかったわ。', ['Of course! …Hey, just now, nobody called me “the one from the city”.', 'Natürlich! … Du, gerade hat mich niemand „die aus der Stadt“ genannt.'], 'happy'),
          l('ex_risa', 'みんなの{笑顔|えがお|v:n3_0472}を見て、やっと分かった。ここが、わたしの家なのね。', ['Seeing everyone’s smiles, I finally understand. This is my home.', 'Als ich das Lächeln aller sehe, verstehe ich es endlich. Hier ist mein Zuhause.'], 'happy'),
        ],
        teach: ['v:n2_1184', 'v:n2_0951', 'v:n3_0472'],
      },
    ],
  },
  // ------------------------------------------------------------------ Mr. Uchida: the village under the lake
  {
    id: 'ep_ex_uchida',
    chapter: 2,
    after: 'mq8',
    who: 'ex_uchida',
    title: ['湖の底の村', 'The Village Under the Lake', 'Das Dorf unter dem See'],
    summary: [
      'The dam keeper’s home village lies at the bottom of the reservoir. This summer, after a drought, its roofs appear again.',
      'Das Heimatdorf des Dammwärters liegt auf dem Grund des Stausees. Diesen Sommer, nach einer Dürre, tauchen seine Dächer wieder auf.',
    ],
    scenes: [
      {
        at: 'ex_uchida',
        goal: ['Talk to the dam keeper', 'Sprich mit dem Dammwärter'],
        lines: [
          l('ex_uchida', '五十年前、ダムの{工事|こうじ|v:n2_0617}が始まった。わしの{生まれ|うまれ|v:n3_0455}た村は、水に{覆われた|おおわれた|v:n3_0496}んじゃ。', ['Fifty years ago, construction of the dam began. The village I was born in was covered by water.', 'Vor fünfzig Jahren begann der Bau des Damms. Das Dorf, in dem ich geboren bin, wurde vom Wasser bedeckt.']),
          l('ex_uchida', 'わしの{一家|いっか|v:n3_0393}は、町へ{下った|くだった|v:n2_0538}。それ{以来|いらい|v:n3_0418}、毎日この湖を見とる。', ['My family went down to the town. Ever since, I’ve watched this lake every day.', 'Meine Familie ist in die Stadt hinuntergezogen. Seitdem schaue ich jeden Tag auf diesen See.']),
          l('ex_uchida', 'ダムを{恨み|うらみ|v:n2_0236}はせん。下の町の田んぼを{守る|まもる}ためじゃ。……じゃが、ふるさとを{奪われた|うばわれた|v:n3_0453}気持ちは、消えん。', ['I hold no grudge against the dam. It protects the paddies of the town below. …But the feeling that my home was taken from me never fades.', 'Ich hege keinen Groll gegen den Damm. Er schützt die Reisfelder der Stadt unten. … Aber das Gefühl, dass mir die Heimat genommen wurde, vergeht nicht.'], 'worried'),
        ],
        teach: ['v:n2_0617', 'v:n3_0455', 'v:n3_0496', 'v:n3_0393', 'v:n2_0538', 'v:n3_0418', 'v:n2_0236', 'v:n3_0453'],
      },
      {
        at: 'ext_dam',
        goal: ['Look at the lake from the dam', 'Schau vom Damm auf den See'],
        lines: [
          nar('{日照|ひで}りが続いて、湖の水が減っている。水の{奥|おく|v:n3_0500}に、黒い{影|かげ|v:n3_0593}が見える。', ['The drought goes on, and the lake’s water level is falling. Deep in the water, dark shadows can be seen.', 'Die Dürre hält an, und der Wasserstand des Sees sinkt. Tief im Wasser sieht man dunkle Schatten.']),
          nar('{泡|あわ|v:n3_0351}が{浮|う}かび、{水滴|すいてき|v:n2_0943}が光る。そして……水の中から、古い{屋根|やね}が{現れた|あらわれた|v:n3_0345}。', ['Bubbles rise, drops of water glitter. And then… an old roof appears out of the water.', 'Blasen steigen auf, Wassertropfen glitzern. Und dann … taucht ein altes Dach aus dem Wasser auf.']),
          l('ex_uchida', 'あれは……わしの家じゃ！水に{隠れて|かくれて|v:n3_0592}いた{過去|かこ|v:n3_0597}が、出てきおった。', ['That’s… my house! The past that was hidden under the water has come out.', 'Das ist … mein Haus! Die Vergangenheit, die unter dem Wasser verborgen war, ist wieder aufgetaucht.'], 'surprised'),
          l('ex_uchida', '{恐ろしい|おそろしい|v:n3_0514}ほど、昔のままじゃ……。', ['It’s frighteningly unchanged…', 'Es ist fast unheimlich, wie unverändert es ist …'], 'surprised'),
        ],
        teach: ['v:n3_0500', 'v:n3_0593', 'v:n3_0351', 'v:n2_0943', 'v:n3_0345', 'v:n3_0592', 'v:n3_0597', 'v:n3_0514'],
      },
      {
        at: 'ex_uchida',
        goal: ['Hear what Mr. Uchida found', 'Hör, was Herr Uchida gefunden hat'],
        music: 'memory',
        lines: [
          l('ex_uchida', '{泥|どろ}の中から、これが出てきた。うちの{アルバム||v:n3_0350}じゃ。……ほとんど読めんがな。', ['This came out of the mud. Our family photo album. …You can hardly make anything out, though.', 'Das hier kam aus dem Schlamm. Unser Familienalbum. … Man kann allerdings kaum etwas erkennen.']),
          l('ex_uchida', 'わしは、ずっと{思い出|おもいで|v:n3_0530}を{隠して|かくして|v:n3_0588}生きてきた。つらいから、話さんようにしてな。', ['I’ve lived my whole life hiding my memories. Because it hurt, I made sure never to speak of them.', 'Ich habe mein Leben lang meine Erinnerungen versteckt. Weil es wehtat, habe ich nie darüber gesprochen.']),
          l('ex_uchida', 'じゃが、雨が{降|ふ}れば、また沈む。だから今日、村の子どもらに話してやる。わしの村の{名残|なごり|v:nagori}を、言葉で残すんじゃ。', ['But when it rains, it will sink again. So today I’ll tell the village children about it. I’ll leave what remains of my village in words.', 'Aber wenn es regnet, versinkt es wieder. Deshalb erzähle ich heute den Kindern des Dorfes davon. Was von meinem Dorf geblieben ist, halte ich in Worten fest.'], 'happy'),
        ],
        teach: ['v:n3_0350', 'v:n3_0530', 'v:n3_0588', 'v:nagori'],
      },
    ],
  },
  // ------------------------------------------------------------------ Dr. Sanae: the old cow
  {
    id: 'ep_ex_sanae',
    chapter: 2,
    after: 'mq8',
    who: 'ex_sanae',
    title: ['ハナの最後の春', 'Hana’s Last Spring', 'Hanas letzter Frühling'],
    summary: [
      'Dr. Sanae, the country vet, has to tell an old farmer that his cow Hana will not get well again.',
      'Dr. Sanae, die Landtierärztin, muss einem alten Bauern sagen, dass seine Kuh Hana nicht mehr gesund wird.',
    ],
    scenes: [
      {
        at: 'ext_vet',
        goal: ['Visit the animal clinic', 'Besuche die Tierklinik'],
        lines: [
          nar('{動物|どうぶつ}{病院|びょういん}の庭。{子牛|こうし}と{馬|うま|v:n3_0454}が、{穏やか|おだやか|v:n3_0517}に草を食べている。', ['The yard of the animal clinic. A calf and a horse are peacefully eating grass.', 'Der Hof der Tierklinik. Ein Kälbchen und ein Pferd fressen friedlich Gras.']),
          l('ex_sanae', 'この村の{生き物|いきもの|v:n3_0368}は、全部わたしの{患者|かんじゃ}。{牧場|ぼくじょう|v:n2_1646}の{牛|うし|v:n3_0441}も、家の猫もね。', ['All the living creatures of this village are my patients. The cows on the pasture, and the house cats too.', 'Alle Lebewesen dieses Dorfes sind meine Patienten. Die Kühe auf der Weide und auch die Hauskatzen.'], 'happy'),
          l('ex_sanae', '{医療|いりょう|v:n3_0422}の{器具|きぐ|v:n2_0479}は古いけど、{顕微鏡|けんびきょう|v:n2_0598}だけは新しいのを買ったの。病気の{確認|かくにん|v:n3_0590}が、一番大事だから。', ['The medical instruments are old, but I bought a new microscope at least. Confirming the illness matters most.', 'Die medizinischen Geräte sind alt, aber wenigstens ein neues Mikroskop habe ich gekauft. Die Krankheit festzustellen ist das Wichtigste.']),
        ],
        teach: ['v:n3_0454', 'v:n3_0517', 'v:n3_0368', 'v:n2_1646', 'v:n3_0441', 'v:n3_0422', 'v:n2_0479', 'v:n2_0598', 'v:n3_0590'],
      },
      {
        at: 'ex_sanae',
        goal: ['Ask Dr. Sanae why she looks troubled', 'Frag Dr. Sanae, warum sie bedrückt aussieht'],
        lines: [
          l('ex_sanae', '{健三|けんぞう}さんのハナ、二十歳のおばあちゃん牛なの。重い病気に{罹って|かかって|v:n3_0576}いて……。', ['Kenzō’s Hana is a twenty-year-old granny cow. She has caught a serious illness…', 'Kenzōs Hana ist eine zwanzigjährige Oma-Kuh. Sie hat sich eine schwere Krankheit eingefangen …'], 'worried'),
          l('ex_sanae', '{胃|い|v:n3_0361}に{異常|いじょう|v:n3_0375}があって、{餌|えさ|v:n3_0474}をほとんど食べない。{栄養|えいよう|v:n3_0471}を{与えて|あたえて|v:n3_0318}も、もう体が{受け付け|うけつけ}ないの。', ['There’s something wrong with her stomach, and she hardly eats her feed. Even when I give her nutrients, her body won’t take them any more.', 'Mit ihrem Magen stimmt etwas nicht, und sie frisst kaum noch. Selbst wenn ich ihr Nährstoffe gebe, nimmt ihr Körper sie nicht mehr an.'], 'worried'),
          l('ex_sanae', '治らないのは、{確実|かくじつ|v:n3_0585}。……健三さんに、どう伝えればいいのかしら。', ['It’s certain that she won’t recover. …How should I tell Kenzō?', 'Dass sie nicht gesund wird, ist sicher. … Wie soll ich es Kenzō sagen?'], 'worried'),
        ],
        teach: ['v:n3_0576', 'v:n3_0361', 'v:n3_0375', 'v:n3_0474', 'v:n3_0471', 'v:n3_0318', 'v:n3_0585'],
      },
      {
        at: 'ex_sanae',
        goal: ['Go with Dr. Sanae to the farmer', 'Geh mit Dr. Sanae zum Bauern'],
        music: 'memory',
        lines: [
          nar('{牛舎|ぎゅうしゃ}で、健三さんはハナの首を{抱いて|だいて|v:n3_0382}いた。言葉は、もう{要|い}らなかった。', ['In the cowshed, Kenzō is holding Hana’s neck in his arms. No words are needed any more.', 'Im Kuhstall hält Kenzō Hanas Hals umarmt. Worte braucht es nicht mehr.']),
          nar('「先生、分かっとる。……ハナに{痛み|いたみ|v:n3_0385}がないようにしてやってくれ。それだけじゃ」', ['“Doctor, I know. …Just make sure Hana is free of pain. That’s all.”', '„Frau Doktor, ich weiß. … Sorgen Sie nur dafür, dass Hana keine Schmerzen hat. Mehr nicht.“']),
          l('ex_sanae', '{哀れ|あわれ|v:n3_0354}だと思っていたのは、わたしだけでした。健三さんは、ハナと二十年、ちゃんとお別れの{準備|じゅんび}をしてたのね。', ['I was the only one who thought it was pitiful. For twenty years, Kenzō had been preparing to say goodbye to Hana.', 'Ich war die Einzige, die es erbärmlich fand. Kenzō hat sich zwanzig Jahre lang darauf vorbereitet, sich von Hana zu verabschieden.']),
          l('ex_sanae', '獣医は、命を{延ばす|のばす}だけの仕事じゃない。最後まで、{そば|そば}にいる仕事なんだわ。', ['Being a vet isn’t only about making lives longer. It’s about being there until the very end.', 'Tierärztin zu sein heißt nicht nur, Leben zu verlängern. Es heißt, bis zuletzt da zu sein.']),
        ],
        teach: ['v:n3_0382', 'v:n3_0385', 'v:n3_0354'],
      },
    ],
  },
  // ------------------------------------------------------------------ Daichi: grandfather's drum
  {
    id: 'ep_ex_daichi',
    chapter: 2,
    after: 'mq8',
    who: 'ex_daichi',
    title: ['じいちゃんの太鼓', 'Grandpa’s Drum', 'Opas Trommel'],
    summary: [
      'This year little Daichi must play the great festival drum his late grandfather played for fifty years. He is terrified.',
      'Dieses Jahr soll der kleine Daichi die große Festtrommel schlagen, die sein verstorbener Großvater fünfzig Jahre lang gespielt hat. Er hat schreckliche Angst.',
    ],
    scenes: [
      {
        at: 'ext_drum',
        goal: ['Look at the shrine’s drum tower', 'Sieh dir den Trommelturm des Schreins an'],
        lines: [
          nar('{太鼓櫓|たいこやぐら}の中の大きな太鼓。{紅白|こうはく}の{飾り|かざり|v:n2_0388}が、{祭日|さいじつ|v:n2_0698}を待っている。', ['The great drum inside the drum tower. Red and white decorations wait for the festival day.', 'Die große Trommel im Trommelturm. Rot-weiße Schmuckbänder warten auf den Festtag.']),
          l('ex_daichi', 'じいちゃんは、五十年、この太鼓を{受け持って|うけもって|v:n2_0222}たんだ。秋祭りの{当番|とうばん|v:n2_1296}は、ずっとじいちゃん。', ['Grandpa was in charge of this drum for fifty years. The autumn festival duty was always his.', 'Opa war fünfzig Jahre lang für diese Trommel zuständig. Der Dienst beim Herbstfest war immer seiner.']),
          l('ex_daichi', 'じいちゃんの{音|おと|v:n3_0539}は、{勢い|いきおい|v:n3_0367}があって、山の向こうまで{響|ひび}いたんだって。……{偉大|いだい|v:n3_0381}すぎるよ。', ['They say Grandpa’s sound was so powerful it echoed beyond the mountains. …He’s too great.', 'Man sagt, Opas Klang war so kraftvoll, dass er bis hinter die Berge hallte. … Er ist einfach zu groß.'], 'worried'),
        ],
        teach: ['v:n2_0388', 'v:n2_0698', 'v:n2_0222', 'v:n2_1296', 'v:n3_0539', 'v:n3_0367', 'v:n3_0381'],
      },
      {
        at: 'ex_daichi',
        goal: ['Talk to Daichi', 'Sprich mit Daichi'],
        lines: [
          l('ex_daichi', 'ぼく、まだ{幼い|おさない|v:n3_0504}から、腕も細いし……みんなの前で{演奏|えんそう|v:n3_0484}するのを、{恐れて|おそれて|v:n3_0513}るんだ。', ['I’m still little, my arms are thin… I’m scared of playing in front of everyone.', 'Ich bin noch klein, meine Arme sind dünn … Ich habe Angst davor, vor allen zu spielen.'], 'worried'),
          l('ex_daichi', '練習も{嫌がって|いやがって|v:n2_0205}、母ちゃんに{叱|しか}られた。{鬼|おに|v:n3_0521}みたいな顔で。', ['I didn’t want to practise either, and Mum scolded me. With a face like an ogre.', 'Ich wollte auch nicht üben, und Mama hat mich ausgeschimpft. Mit einem Gesicht wie ein Oni.']),
          ask(
            ['じいちゃんと同じ音じゃなくていいよ', ['It doesn’t have to sound like your grandpa', 'Es muss nicht wie dein Opa klingen'], [
              l('ex_daichi', '……同じじゃなくて、いいの？', ['…It doesn’t have to be the same?', '… Es muss nicht gleich sein?'], 'surprised'),
            ]],
            ['一緒に練習しよう', ['Let’s practise together', 'Lass uns zusammen üben'], [
              l('ex_daichi', 'ほんと？……じゃあ、{一旦|いったん}、家に{帯|おび}を取りに帰る！', ['Really? …Then I’ll pop home first for my sash!', 'Echt? … Dann hol ich schnell meinen Gürtel von zu Hause!'], 'happy'),
            ]],
          ),
          l('ex_daichi', 'じいちゃんの{帯|おび|v:n3_0522}、まだ長すぎるんだ。……でも、{一旦|いったん|v:n2_0195}、{締|し}めてみる。', ['Grandpa’s sash is still too long for me. …But I’ll try tying it on for now.', 'Opas Gürtel ist mir noch zu lang. … Aber ich binde ihn erst mal um.']),
        ],
        teach: ['v:n3_0504', 'v:n3_0484', 'v:n3_0513', 'v:n2_0205', 'v:n3_0521', 'v:n3_0522', 'v:n2_0195'],
      },
      {
        at: 'ex_daichi',
        goal: ['Watch Daichi at the autumn festival', 'Sieh Daichi beim Herbstfest zu'],
        music: 'memory',
        evening: true,
        lines: [
          nar('祭りの夜。行列の{先頭|せんとう|v:n2_1038}で、大地くんがばちを{構え|かまえ}た。小さな体で、一つ一つの{動作|どうさ|v:n2_1288}を確かめるように。', ['Festival night. At the head of the procession, Daichi raises his drumsticks, checking every movement with his small body.', 'Festnacht. An der Spitze des Umzugs hebt Daichi die Trommelstöcke und prüft mit seinem kleinen Körper jede Bewegung.']),
          nar('ドン……ドン、ドン。じいちゃんとは{違|ちが}う、小さくて、まっすぐな音。山が、静かにそれを聞いていた。', ['Boom… boom, boom. A small, straight sound, different from his grandpa’s. The mountains listen quietly.', 'Bumm … bumm, bumm. Ein kleiner, gerader Klang, anders als der seines Opas. Die Berge hören still zu.']),
          l('ex_daichi', 'できた……！みんな、{祝い|いわい|v:n3_0424}の{拍手|はくしゅ}してくれた！ぼくの音で、いいんだね。', ['I did it…! Everyone clapped to celebrate! My own sound is good enough, isn’t it.', 'Ich hab’s geschafft …! Alle haben zur Feier geklatscht! Mein eigener Klang ist gut so, oder?'], 'happy'),
        ],
        teach: ['v:n2_1038', 'v:n2_1288', 'v:n3_0424'],
      },
    ],
  },
  // ------------------------------------------------------------------ Grandma Ume: the herb paths
  {
    id: 'ep_ex_ume',
    chapter: 2,
    after: 'mq9',
    who: 'ex_ume',
    title: ['帰り道の目印', 'Markers for the Way Home', 'Wegzeichen für den Heimweg'],
    summary: [
      'Grandma Ume knows every path in the mountains. Lately she forgets the way home.',
      'Oma Ume kennt jeden Pfad in den Bergen. Seit Kurzem vergisst sie den Heimweg.',
    ],
    scenes: [
      {
        at: 'ex_ume',
        goal: ['Go herb gathering with Grandma Ume', 'Geh mit Oma Ume Kräuter sammeln'],
        lines: [
          l('ex_ume', 'この{籠|かご|v:n3_0598}いっぱいに、山の{果実|かじつ|v:n2_0393}と草を{採る|とる|v:n2_1331}んじゃ。あの木には、秋に{実|み}が{生る|なる|v:n2_1359}よ。', ['We’ll fill this basket with mountain fruit and herbs. That tree bears fruit in autumn.', 'Wir füllen diesen Korb mit Bergfrüchten und Kräutern. Der Baum dort trägt im Herbst Früchte.'], 'happy'),
          l('ex_ume', 'においを{嗅げ|かげ|v:n3_0580}ば、どの草か分かる。七十年、{暗記|あんき|v:n3_0357}してきたからねえ。', ['If I smell it, I know which herb it is. I’ve learned them by heart for seventy years.', 'Wenn ich daran rieche, weiß ich, welches Kraut es ist. Siebzig Jahre habe ich sie auswendig gelernt.']),
          l('ex_ume', '{迷信|めいしん|v:n2_1743}じゃと笑われるが、この{葉|は}を{揉んで|もんで|v:n2_1784}{貼|は}れば、{傷|きず}はすぐ治るよ。', ['People laugh and call it superstition, but if you rub this leaf and put it on a cut, it heals at once.', 'Die Leute lachen und nennen es Aberglauben, aber wenn man dieses Blatt reibt und auf eine Wunde legt, heilt sie sofort.']),
        ],
        teach: ['v:n3_0598', 'v:n2_0393', 'v:n2_1331', 'v:n2_1359', 'v:n3_0580', 'v:n3_0357', 'v:n2_1743', 'v:n2_1784'],
      },
      {
        at: 'ex_ume',
        goal: ['Find Grandma Ume, who did not come home', 'Finde Oma Ume, die nicht nach Hause gekommen ist'],
        evening: true,
        lines: [
          nar('{夕方|ゆうがた}。山道の{突き当たり|つきあたり|v:n2_1206}で、梅ばあちゃんが{一時|いちじ|v:n3_0389}的に立ち止まっていた。{今にも|いまにも|v:n3_0415}泣き出しそうな顔だ。', ['Evening. At the dead end of the mountain path, Grandma Ume has stopped for a moment. She looks as if she might burst into tears at any second.', 'Abend. Am Ende des Bergpfads ist Oma Ume kurz stehen geblieben. Sie sieht aus, als würde sie jeden Moment in Tränen ausbrechen.']),
          l('ex_ume', 'ここは……どこじゃ。{四つ角|よつかど|v:n2_1848}を、右じゃったか、左じゃったか。', ['Where… is this? At the crossroads, was it right, or left?', 'Wo … bin ich? An der Kreuzung — war es rechts oder links?'], 'worried'),
          l('ex_ume', '{意識|いしき|v:n3_0374}ははっきりしとる。じゃが、時々、記憶が{欠ける|かける|v:n3_0595}んじゃ。{もしかしたら||v:n2_1771}、もう山には来られんのかねえ。', ['My mind is clear. But sometimes pieces of my memory go missing. Maybe I can’t come to the mountains any more.', 'Mein Kopf ist klar. Aber manchmal fehlen Stücke meiner Erinnerung. Vielleicht kann ich nicht mehr in die Berge kommen.'], 'worried'),
          l('ex_ume', '……{勘違い|かんちがい|v:n2_0463}でなけりゃ、わしの家は、この道の{位置|いち|v:n3_0388}から見て東じゃ。', ['…If I’m not mistaken, my house is to the east of where this path is.', '… Wenn ich mich nicht irre, liegt mein Haus von diesem Weg aus gesehen im Osten.']),
        ],
        teach: ['v:n2_1206', 'v:n3_0389', 'v:n3_0415', 'v:n2_1848', 'v:n3_0374', 'v:n3_0595', 'v:n2_1771', 'v:n2_0463', 'v:n3_0388'],
      },
      {
        at: 'ex_ume',
        goal: ['Put up markers with the village children', 'Bring mit den Dorfkindern Wegzeichen an'],
        music: 'memory',
        lines: [
          nar('次の日。{保育園|ほいくえん}の子どもたちが、赤いリボンを山道の木に{結んで|むすんで}いく。家まで{至る|いたる|v:n3_0386}道に、一つずつ。', ['The next day, the nursery children tie red ribbons to the trees along the mountain path — one by one, all the way to her house.', 'Am nächsten Tag binden die Kindergartenkinder rote Bänder an die Bäume am Bergpfad — eins nach dem anderen, den ganzen Weg bis zu ihrem Haus.']),
          l('ex_ume', 'これが、わしの{目印|めじるし|v:n2_1752}か。……ありがたいねえ。この{恩|おん|v:n3_0540}は、忘れんよ。', ['So these are my markers? …How kind. I won’t forget this kindness.', 'Das sind also meine Wegzeichen? … Wie lieb. Diese Güte vergesse ich nicht.'], 'happy'),
          l('ex_ume', '……いや、忘れるかもしれんな。じゃが、リボンを見るたびに、また思い出せばいいんじゃ。', ['…No, maybe I will forget. But every time I see a ribbon, I can just remember again.', '… Nein, vielleicht vergesse ich sie doch. Aber jedes Mal, wenn ich ein Band sehe, kann ich mich einfach wieder erinnern.'], 'happy'),
        ],
        teach: ['v:n3_0386', 'v:n2_1752', 'v:n3_0540'],
      },
    ],
  },
  // ------------------------------------------------------------------ Miho: the volunteer who never asked
  {
    id: 'ep_ex_miho',
    chapter: 2,
    after: 'mq9',
    who: 'ex_miho',
    title: ['村おこしの答え', 'What the Village Wanted', 'Was das Dorf wirklich wollte'],
    summary: [
      'Miho came to revive the valley with big ideas. Every project fails — because she never asked what the village wanted.',
      'Miho kam mit großen Ideen, um das Tal wiederzubeleben. Jedes Projekt scheitert — weil sie nie gefragt hat, was das Dorf will.',
    ],
    scenes: [
      {
        at: 'ext_coop',
        goal: ['Go to the meeting at the co-op', 'Geh zur Versammlung bei der Genossenschaft'],
        lines: [
          l('ex_miho', '今日の{会合|かいごう|v:n3_0555}の{資料|しりょう|v:n2_0914}です！新しい{アイデア||v:n2_0123}を十個、{用意|ようい}しました！', ['Here are the materials for today’s meeting! I’ve prepared ten new ideas!', 'Hier sind die Unterlagen für das heutige Treffen! Ich habe zehn neue Ideen vorbereitet!'], 'happy'),
          l('ex_miho', 'グランピング、ゆるキャラ、SNS……都会の{実績|じっせき|v:n2_0783}のある{案|あん|v:n3_0355}ばかりです！', ['Glamping, a mascot, social media… all plans with a track record in the city!', 'Glamping, ein Maskottchen, soziale Medien … lauter Pläne, die sich in der Stadt bewährt haben!']),
          nar('{農協|のうきょう}のおじいさんたちは、黙って{腕|うで}を組んでいる。だれも{応じない|おうじない|v:n3_0492}。', ['The old men of the co-op sit with their arms folded in silence. Nobody responds.', 'Die alten Männer der Genossenschaft sitzen schweigend mit verschränkten Armen da. Niemand geht darauf ein.']),
          l('ex_miho', '……あの、{開始|かいし|v:n3_0557}してもいいですか？……だめ、ですか。', ['…Um, may I begin? …No?', '… Ähm, darf ich anfangen? … Nein?'], 'worried'),
        ],
        teach: ['v:n3_0555', 'v:n2_0914', 'v:n2_0123', 'v:n2_0783', 'v:n3_0355', 'v:n3_0492', 'v:n3_0557'],
      },
      {
        at: 'ex_miho',
        goal: ['Talk to Miho after the meeting', 'Sprich nach dem Treffen mit Miho'],
        lines: [
          l('ex_miho', '{安易|あんい|v:n2_0171}だったのかな。都会のやり方を、そのまま{取り入れよう|とりいれよう|v:n2_1328}としただけで。', ['Was I being too simplistic? I just tried to bring in the city’s way of doing things as it was.', 'War ich zu leichtfertig? Ich habe einfach versucht, die Methoden der Stadt eins zu eins zu übernehmen.'], 'worried'),
          l('ex_miho', '村の{特色|とくしょく|v:n2_1307}を{高める|たかめる|v:n2_1112}つもりが、村の人の気持ちを、ぜんぜん分かってなかった。', ['I meant to bring out the village’s special character, but I didn’t understand how the villagers felt at all.', 'Ich wollte das Besondere des Dorfes stärken, aber ich habe die Gefühle der Dorfbewohner überhaupt nicht verstanden.']),
          l('ex_miho', '「忙しい」は、断るための{口実|こうじつ|v:n2_0619}だと思ってた。でも、{解釈|かいしゃく|v:n3_0558}が{誤り|あやまり|v:n3_0335}だったのかも。', ['I thought “we’re busy” was just an excuse to say no. But maybe my interpretation was wrong.', 'Ich dachte, „wir haben zu tun“ sei nur ein Vorwand, um abzulehnen. Aber vielleicht war meine Deutung falsch.']),
          ask(
            ['村の人に、話を聞いてみたら？', ['Why not ask the villagers what they think?', 'Warum fragen Sie die Dorfleute nicht, was sie denken?'], [
              l('ex_miho', '……聞く。そうか。わたし、話してばっかりだった。', ['…Ask. Of course. All I ever did was talk.', '… Fragen. Natürlich. Ich habe immer nur geredet.'], 'surprised'),
            ]],
            ['アイデアはいいと思います', ['I think your ideas are good', 'Ich finde Ihre Ideen gut'], [
              l('ex_miho', 'ありがとう。でも、いいアイデアでも、村に合わなきゃ{意義|いぎ}がないのよね。', ['Thank you. But even a good idea is meaningless if it doesn’t suit the village.', 'Danke. Aber auch eine gute Idee hat keinen Sinn, wenn sie nicht zum Dorf passt.']),
            ]],
          ),
        ],
        teach: ['v:n2_0171', 'v:n2_1328', 'v:n2_1307', 'v:n2_1112', 'v:n2_0619', 'v:n3_0558', 'v:n3_0335'],
      },
      {
        at: 'ex_miho',
        goal: ['See Miho’s new plan', 'Sieh dir Mihos neuen Plan an'],
        lines: [
          l('ex_miho', '一か月、村の全部の家で{インタビュー||v:n3_0432}したの。みんなの答えは、{一致|いっち|v:n3_0399}してた。', ['For a month I interviewed every house in the village. Everyone’s answers matched.', 'Einen Monat lang habe ich jedes Haus im Dorf befragt. Alle Antworten stimmten überein.'], 'happy'),
          l('ex_miho', '「人を呼ぶより、{若者|わかもの}が帰ってこられる村にしたい」。それが、村の{依頼|いらい|v:n3_0419}だったのよ。', ['“Rather than bringing in visitors, we want a village our young people can come back to.” That was what the village was asking for.', '„Statt Besucher herzuholen, wollen wir ein Dorf, in das unsere jungen Leute zurückkommen können.“ Das war es, worum das Dorf bat.']),
          l('ex_miho', 'だから、町からの{援助|えんじょ|v:n3_0481}で、空き家を若い家族に貸すことにしたの。小さな{解決|かいけつ|v:n3_0554}だけど、本物の{意義|いぎ|v:n2_0176}があると思う。', ['So with help from the town, we’ll rent empty houses to young families. It’s a small solution, but I think it has real meaning.', 'Also vermieten wir mit Hilfe der Stadt leer stehende Häuser an junge Familien. Eine kleine Lösung, aber ich glaube, sie hat echten Sinn.'], 'happy'),
        ],
        teach: ['v:n3_0432', 'v:n3_0399', 'v:n3_0419', 'v:n3_0481', 'v:n3_0554', 'v:n2_0176'],
      },
    ],
  },
  // ------------------------------------------------------------------ Ms. Megumi: the nursery with three children
  {
    id: 'ep_ex_megumi',
    chapter: 2,
    after: 'mq9',
    who: 'ex_megumi',
    title: ['三人の保育園', 'A Nursery for Three', 'Ein Kindergarten für drei'],
    summary: [
      'The valley nursery has only three children left and is to close. Ms. Megumi plans one last day the children will never forget.',
      'Der Kindergarten im Tal hat nur noch drei Kinder und soll schließen. Frau Megumi plant einen letzten Tag, den die Kinder nie vergessen werden.',
    ],
    scenes: [
      {
        at: 'ex_megumi',
        goal: ['Visit Ms. Megumi’s nursery', 'Besuche Frau Megumis Kindergarten'],
        lines: [
          l('ex_megumi', 'うちの子は三人。{お喋り|おしゃべり|v:n3_0510}な{陽菜|ひな}ちゃん、{大人しい|おとなしい|v:n3_0519}{蒼|あお}くん、{いたずら||v:n3_0383}{好き|ずき}の{健太|けんた}くん。', ['We have three children. Chatty Hina, quiet Ao, and Kenta, who loves pranks.', 'Wir haben drei Kinder. Die gesprächige Hina, den stillen Ao und Kenta, der Streiche liebt.'], 'happy'),
          l('ex_megumi', '{お昼|おひる|v:n3_0523}ごはんの後は、みんなで{居眠り|いねむり|v:n3_0409}。{兎|うさぎ|v:n3_0440}も一{羽|わ}、{飼って|かって|v:n3_0563}るのよ。', ['After lunch, everyone has a little doze. We keep a rabbit too.', 'Nach dem Mittagessen machen alle ein Nickerchen. Wir haben auch ein Kaninchen.']),
          l('ex_megumi', 'でも、来年の三月で{閉|と}じるの。三人じゃ、{一体|いったい|v:n3_0398}だれがお金を出すのって。', ['But it closes next March. With only three children, who on earth would pay for it, they say.', 'Aber im nächsten März wird er geschlossen. Mit nur drei Kindern — wer um Himmels willen soll das bezahlen, sagen sie.'], 'worried'),
        ],
        teach: ['v:n3_0510', 'v:n3_0519', 'v:n3_0383', 'v:n3_0523', 'v:n3_0409', 'v:n3_0440', 'v:n3_0563', 'v:n3_0398'],
      },
      {
        at: 'ex_megumi',
        goal: ['Help prepare the last day', 'Hilf bei den Vorbereitungen für den letzten Tag'],
        lines: [
          l('ex_megumi', '最後の日に、{発表会|はっぴょうかい}をするの。子どもたちが、紙に{三角|さんかく|v:n2_0739}や{長方形|ちょうほうけい|v:n2_1183}の{図形|ずけい|v:n2_0964}を{描いて|えがいて|v:n3_0473}、お家の絵を作ってるのよ。', ['On the last day we’ll hold a little show. The children are drawing triangles and rectangles to make pictures of their homes.', 'Am letzten Tag machen wir eine Aufführung. Die Kinder zeichnen Dreiecke und Rechtecke und machen daraus Bilder von ihrem Zuhause.'], 'happy'),
          l('ex_megumi', 'わたしは、衣装を{縫って|ぬって|v:n2_1385}るの。{リボン||v:n2_1867}は、梅ばあちゃんの山道と同じ赤。', ['I’m sewing the costumes. The ribbons are the same red as on Grandma Ume’s mountain path.', 'Ich nähe die Kostüme. Die Bänder haben dasselbe Rot wie die am Bergpfad von Oma Ume.']),
          l('ex_megumi', '{騒々しい|そうぞうしい|v:n2_1054}{毎日|まいにち}だったけど……{あんなに||v:n3_0359}{にこにこ||v:n2_1372}笑う子たちと、もう会えないなんて。', ['Every day was noisy… but to think I’ll never see those children who smiled like that again.', 'Jeder Tag war laut … aber zu denken, dass ich diese Kinder, die so gestrahlt haben, nicht mehr sehe.'], 'worried'),
        ],
        teach: ['v:n2_0739', 'v:n2_1183', 'v:n2_0964', 'v:n3_0473', 'v:n2_1385', 'v:n2_1867', 'v:n2_1054', 'v:n3_0359', 'v:n2_1372'],
      },
      {
        at: 'ex_megumi',
        goal: ['Come to the show', 'Komm zur Aufführung'],
        music: 'memory',
        lines: [
          nar('{発表会|はっぴょうかい}の後。三人の子どもたちが、そろって先生に{お辞儀|おじぎ|v:n3_0508}をした。「めぐみせんせい、ありがとう」', ['After the show, the three children bow to their teacher together. “Thank you, Ms. Megumi.”', 'Nach der Aufführung verbeugen sich die drei Kinder gemeinsam vor ihrer Lehrerin. „Danke, Frau Megumi.“']),
          nar('そこへ、{美穂|みほ}さんが走ってきた。「先生！空き家に、若い家族が三組、引っ越してくるんです！子どもは五人！」', ['Just then Miho comes running. “Ms. Megumi! Three young families are moving into the empty houses! Five children!”', 'Da kommt Miho angerannt. „Frau Megumi! Drei junge Familien ziehen in die leeren Häuser! Fünf Kinder!“']),
          l('ex_megumi', 'え……！じゃあ、{臨時|りんじ|v:n2_1876}の会議をして……もう一年、続けられるかもしれない！', ['What…! Then we’ll call an emergency meeting… we might be able to go on for another year!', 'Was …! Dann berufen wir eine Sondersitzung ein … vielleicht können wir noch ein Jahr weitermachen!'], 'surprised'),
          l('ex_megumi', '子どもたちに{教わった|おそわった|v:n3_0515}わ。終わりだと思っても、まだ何か始まるかもしれないって。', ['The children taught me that. Even when you think it’s the end, something may still begin.', 'Die Kinder haben es mir beigebracht: Auch wenn man denkt, es ist das Ende, kann noch etwas beginnen.'], 'happy'),
        ],
        teach: ['v:n3_0508', 'v:n2_1876', 'v:n3_0515'],
      },
    ],
  },
  // ------------------------------------------------------------------ Yōsuke: the wife who wants to go back
  {
    id: 'ep_ex_youske',
    chapter: 2,
    after: 'mq9',
    who: 'ex_youske',
    title: ['ふたりの畑', 'A Field for Two', 'Ein Feld für zwei'],
    summary: [
      'Yōsuke left his office job to farm in the valley. Now his wife wants to go back to the city.',
      'Yōsuke hat seinen Bürojob aufgegeben, um im Tal Landwirtschaft zu betreiben. Jetzt will seine Frau zurück in die Stadt.',
    ],
    scenes: [
      {
        at: 'ext_newfarm',
        goal: ['Visit the new farmhouse', 'Besuche das neue Bauernhaus'],
        lines: [
          l('ex_youske', '東京では、毎朝{定期券|ていきけん|v:n2_1236}で{出勤|しゅっきん|v:n2_0851}して、夜まで{オフィス||v:n3_0524}にいました。', ['In Tokyo, every morning I commuted with my season ticket and stayed in the office until night.', 'In Tokio bin ich jeden Morgen mit meiner Monatskarte zur Arbeit gefahren und war bis abends im Büro.']),
          l('ex_youske', '{月給|げっきゅう|v:n2_0578}はよかった。でも、{稼いだ|かせいだ|v:n3_0610}お金で何を買っても、心は空っぽで。', ['The monthly salary was good. But whatever I bought with the money I earned, my heart stayed empty.', 'Das Monatsgehalt war gut. Aber egal, was ich mit dem verdienten Geld kaufte, mein Herz blieb leer.']),
          l('ex_youske', 'ここなら、{衣食住|いしょくじゅう|v:n2_0187}は全部自分で作れる。……そう思って、来たんです。', ['Here I could make everything myself — food, clothing and shelter. …That’s what I thought when I came.', 'Hier kann ich alles selbst schaffen — Essen, Kleidung, Wohnung. … Das dachte ich, als ich herkam.']),
        ],
        teach: ['v:n2_1236', 'v:n2_0851', 'v:n3_0524', 'v:n2_0578', 'v:n3_0610', 'v:n2_0187'],
      },
      {
        at: 'ex_youske',
        goal: ['Ask Yōsuke about his wife', 'Frag Yōsuke nach seiner Frau'],
        lines: [
          l('ex_youske', '妻は、{炊事|すいじ|v:n2_0938}も{家事|かじ|v:n3_0606}も、ここでは全部大変だって。古い{家具|かぐ|v:n3_0581}も、{襖|ふすま|v:n2_1566}も、冬は寒くて。', ['My wife says cooking and housework are hard here in every way. The old furniture, the sliding doors — it’s cold in winter.', 'Meine Frau sagt, Kochen und Hausarbeit seien hier in jeder Hinsicht mühsam. Die alten Möbel, die Schiebetüren — im Winter ist es kalt.'], 'worried'),
          l('ex_youske', 'ストーブで部屋を{暖めて|あたためて|v:n3_0322}も、なかなか{暖まらない|あたたまらない|v:n3_0320}んです。', ['Even when I heat the room with the stove, it hardly warms up.', 'Auch wenn ich das Zimmer mit dem Ofen heize, wird es kaum warm.']),
          l('ex_youske', '妻を{裏切った|うらぎった|v:n3_0459}気がします。ぼくの夢に、{相手|あいて|v:n3_0301}を{付き合わせ|つきあわせ}ただけで。{それなのに||v:n2_1077}、文句ひとつ言わなかった。', ['I feel I betrayed her. I just dragged her along into my dream. And yet she never complained once.', 'Ich habe das Gefühl, sie verraten zu haben. Ich habe sie nur in meinen Traum hineingezogen. Und trotzdem hat sie sich nie beschwert.'], 'worried'),
        ],
        teach: ['v:n2_0938', 'v:n3_0606', 'v:n3_0581', 'v:n2_1566', 'v:n3_0322', 'v:n3_0320', 'v:n3_0459', 'v:n3_0301', 'v:n2_1077'],
      },
      {
        at: 'ex_youske',
        goal: ['Hear what Yōsuke and his wife decided', 'Hör, was Yōsuke und seine Frau beschlossen haben'],
        music: 'memory',
        lines: [
          l('ex_youske', '{昨夜|ゆうべ}、初めてちゃんと話しました。妻は、村が{嫌|いや}なんじゃなかった。一人で{抱えて|かかえて|v:n3_0571}たんです。', ['Last night we really talked for the first time. It wasn’t the village she hated. She’d been carrying everything alone.', 'Gestern Abend haben wir zum ersten Mal richtig geredet. Es war nicht das Dorf, das sie hasste. Sie hat alles allein getragen.']),
          l('ex_youske', 'ぼくが畑ばかりで、話す人がいなかった。……{分校|ぶんこう}カフェの{理沙|りさ}さんが、妻を{手伝い|てつだい}に{誘って|さそって}くれて。', ['I was always out in the fields, and she had no one to talk to. …Risa from the school café invited her to help out.', 'Ich war immer nur auf dem Feld, und sie hatte niemanden zum Reden. … Risa vom Schulcafé hat sie eingeladen, dort mitzuhelfen.']),
          l('ex_youske', '{給与|きゅうよ|v:n2_0501}は少ないけど、妻は{飽きない|あきない|v:n3_0309}って笑ってました。ふたりの畑、もう一年がんばってみます。', ['The pay is small, but my wife laughed and said she isn’t bored. We’ll give our field one more year — the two of us.', 'Der Lohn ist gering, aber meine Frau hat gelacht und gesagt, langweilig wird es ihr nicht. Wir geben unserem Feld noch ein Jahr — zu zweit.'], 'happy'),
        ],
        teach: ['v:n3_0571', 'v:n2_0501', 'v:n3_0309'],
      },
    ],
  },
  // ------------------------------------------------------------------ Genzō the brewmaster: the last sake
  {
    id: 'ep_ex_toji',
    chapter: 2,
    after: 'mq9',
    who: 'ex_toji',
    title: ['最後の仕込み', 'The Last Brew', 'Der letzte Sud'],
    summary: [
      'Brewmaster Genzō is making his last sake. Forty years of skill — and no one to pass it on to.',
      'Braumeister Genzō braut seinen letzten Sake. Vierzig Jahre Können — und niemand, an den er es weitergeben kann.',
    ],
    scenes: [
      {
        at: 'ex_toji',
        goal: ['Look into the sake brewery', 'Schau in die Sake-Brauerei'],
        lines: [
          nar('{酒蔵|さかぐら}の中。{蒸した|むした|v:n2_1565}米の{湯気|ゆげ}が、白い{雲|くも}のように{立ち上って|たちのぼって}いる。', ['Inside the brewery, steam from the steamed rice rises like white clouds.', 'In der Brauerei steigt der Dampf des gedämpften Reises wie weiße Wolken auf.']),
          l('ex_toji', '{原料|げんりょう|v:n2_0601}は、米と水と{麹|こうじ}だけじゃ。じゃが、{温度|おんど|v:n3_0542}の{加減|かげん|v:n3_0596}一つで、味がまるで{違う|ちがう}。', ['The ingredients are only rice, water and koji. But just the way you adjust the temperature changes the taste completely.', 'Die Zutaten sind nur Reis, Wasser und Koji. Aber allein wie man die Temperatur einstellt, verändert den Geschmack völlig.']),
          l('ex_toji', '{化学|かがく|v:n3_0573}の{学者|がくしゃ|v:n3_0586}も来たがな、わしの{実力|じつりょく|v:n2_0789}は{数字|すうじ}では{表せん|あらわせん}、と言うて帰ったわ。', ['Chemists came too, but they left saying my skill can’t be expressed in numbers.', 'Es kamen auch Chemiker, aber sie gingen wieder und sagten, mein Können lasse sich nicht in Zahlen ausdrücken.'], 'happy'),
        ],
        teach: ['v:n2_1565', 'v:n2_0601', 'v:n3_0542', 'v:n3_0596', 'v:n3_0573', 'v:n3_0586', 'v:n2_0789'],
      },
      {
        at: 'ex_toji',
        goal: ['Talk to Genzō', 'Sprich mit Genzō'],
        lines: [
          l('ex_toji', '水の{分量|ぶんりょう|v:n2_1606}、米の{重量|じゅうりょう|v:n2_0843}、{発酵|はっこう}の{濃度|のうど|v:n2_1397}……。全部、手と鼻で覚えた。', ['The amount of water, the weight of the rice, the strength of the fermentation… I learned it all with my hands and nose.', 'Die Wassermenge, das Gewicht des Reises, die Stärke der Gärung … Alles habe ich mit Händen und Nase gelernt.']),
          l('ex_toji', '若い者は、{賢い|かしこい|v:n3_0607}が、すぐやめる。わしの酒は、機械の酒に{劣る|おとる|v:n3_0520}とは思わんが……{継|つ}ぐ者がおらん。', ['Young people are clever, but they quit fast. I don’t think my sake is inferior to machine-made sake… but there’s no one to take over.', 'Junge Leute sind klug, aber sie hören schnell auf. Ich glaube nicht, dass mein Sake schlechter ist als der aus Maschinen … aber es gibt niemanden, der übernimmt.'], 'worried'),
          l('ex_toji', 'この{一種|いっしゅ|v:n3_0394}の酒は、わしが{死|し}ねば、{永久|えいきゅう|v:n3_0467}に消える。それが、つらいんじゃ。', ['When I die, this one kind of sake disappears for ever. That’s what hurts.', 'Wenn ich sterbe, verschwindet diese eine Sorte Sake für immer. Das tut weh.'], 'worried'),
        ],
        teach: ['v:n2_1606', 'v:n2_0843', 'v:n2_1397', 'v:n3_0607', 'v:n3_0520', 'v:n3_0394', 'v:n3_0467'],
      },
      {
        at: 'ex_toji',
        goal: ['Be there when the last sake is tasted', 'Sei dabei, wenn der letzte Sake probiert wird'],
        music: 'memory',
        lines: [
          nar('{仕込|しこ}みの最後の日。{分校|ぶんこう}カフェの{理沙|りさ}さんが、ノートを持って立っていた。{正面|しょうめん}から、{源蔵|げんぞう}さんを見ている。', ['The last day of brewing. Risa from the school café stands there with a notebook, looking Genzō straight in the face.', 'Der letzte Brautag. Risa vom Schulcafé steht mit einem Notizbuch da und sieht Genzō direkt an.']),
          nar('「わたしに、教えてください。全部書きます。手と鼻で{分|わ}かるまで、何年でも{通|かよ}います」', ['“Please teach me. I’ll write everything down. I’ll keep coming for as many years as it takes, until I understand it with my hands and nose.”', '„Bitte bringen Sie es mir bei. Ich schreibe alles auf. Ich komme so viele Jahre, wie es braucht, bis ich es mit Händen und Nase verstehe.“']),
          l('ex_toji', '……{都会|とかい}の{娘|むすめ}が、か。ふん。{艶|つや|v:n2_1225}のある、いい目をしとる。', ['…A city girl, eh? Hmph. She has good, bright eyes.', '… Ein Mädchen aus der Stadt, was? Hm. Sie hat gute, glänzende Augen.'], 'surprised'),
          l('ex_toji', '酒は、{輝く|かがやく|v:n3_0574}ように{澄んで|すんで}こそ{一人前|いちにんまえ}じゃ。……明日、朝五時に来い。遅れたら、{破門|はもん}じゃぞ。', ['Sake is only worthy when it’s clear and shining. …Come tomorrow at five in the morning. Be late, and you’re out.', 'Ein Sake ist erst etwas wert, wenn er klar ist und funkelt. … Komm morgen um fünf Uhr früh. Wer zu spät kommt, fliegt.'], 'happy'),
        ],
        teach: ['v:n2_1225', 'v:n3_0574'],
      },
    ],
  },
];
