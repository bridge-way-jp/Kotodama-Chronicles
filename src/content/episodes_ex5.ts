import { ask, l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 5: the people of the university and Arashiyama in Kyoto (content/expansion.ts). */
export const EPISODES_EX5: Episode[] = [
  // ------------------------------------------------------------------ Lucas: fluent, and still not understood
  {
    id: 'ep_ex_lucas',
    chapter: 5,
    after: 'mq18',
    who: 'ex_lucas',
    title: ['言葉の向こう側', 'Beyond the Words', 'Jenseits der Worte'],
    summary: [
      'Lucas from Brazil speaks perfect Japanese — and still feels nobody really understands him.',
      'Lucas aus Brasilien spricht perfekt Japanisch — und hat trotzdem das Gefühl, dass ihn niemand wirklich versteht.',
    ],
    scenes: [
      {
        at: 'ex_lucas',
        goal: ['Talk to Lucas on the campus', 'Sprich mit Lucas auf dem Campus'],
        lines: [
          l('ex_lucas', '日本に{滞在|たいざい|v:n3_1362}して二年。{単語|たんご|v:n3_1441}は一万語覚えたし、{知識|ちしき|v:n3_1464}もある。', ['I’ve been staying in Japan for two years. I’ve learned ten thousand words, and I know a lot.', 'Ich bin seit zwei Jahren in Japan. Ich habe zehntausend Wörter gelernt und weiß viel.']),
          l('ex_lucas', 'でも、{言葉|ことば}は{単なる|たんなる|v:n3_1448}道具じゃないんだね。{他人|たにん|v:n3_1418}の気持ちが、まだ分からない。', ['But words aren’t just a tool, are they. I still can’t understand what other people feel.', 'Aber Worte sind nicht bloß ein Werkzeug, oder? Ich verstehe immer noch nicht, was andere fühlen.'], 'worried'),
          l('ex_lucas', 'ゼミで{いきなり||v:n2_0178}意見を言ったら、みんな静かになった。日本では、少し{控える|ひかえる|v:ky_hikaeru}のが{気配り|きくばり|v:ky_kikubari}なんだって。', ['In the seminar I suddenly gave my opinion, and everyone went quiet. In Japan, holding back a little is considered thoughtful, they say.', 'Im Seminar habe ich einfach meine Meinung gesagt, und alle wurden still. In Japan gilt es als rücksichtsvoll, sich etwas zurückzuhalten, sagt man.']),
          l('ex_lucas', 'ブラジルと日本の{違い|ちがい|v:n3_1457}かな。それとも、ぼくの{態度|たいど|v:n3_1371}が悪いのかな。', ['Is it the difference between Brazil and Japan? Or is it my attitude?', 'Ist es der Unterschied zwischen Brasilien und Japan? Oder liegt es an meiner Art?']),
        ],
        teach: ['v:n3_1362', 'v:n3_1441', 'v:n3_1464', 'v:n3_1448', 'v:n3_1418', 'v:n2_0178', 'v:ky_hikaeru', 'v:ky_kikubari', 'v:n3_1457', 'v:n3_1371'],
      },
      {
        at: 'exk_hall',
        goal: ['Look into the lecture hall', 'Schau in den Hörsaal'],
        lines: [
          nar('講堂の{後|うし}ろの{席|せき}。ルーカスくんが、一人でノートを{見|み}つめている。だれも{話し掛けない|はなしかけない|v:n2_1449}。', ['A seat at the back of the lecture hall. Lucas sits alone, staring at his notebook. Nobody speaks to him.', 'Ein Platz ganz hinten im Hörsaal. Lucas sitzt allein und starrt in sein Heft. Niemand spricht ihn an.']),
          l('ex_lucas', '日本人の友だちとの{付き合い|つきあい|v:n3_1505}は、いつも{丁寧|ていねい}。でも、心の{扉|とびら}は{閉|し}まってる気がする。', ['My friendships with Japanese people are always polite. But it feels like the door to their hearts is closed.', 'Der Umgang mit japanischen Freunden ist immer höflich. Aber es fühlt sich an, als sei die Tür zu ihrem Herzen verschlossen.']),
          l('ex_lucas', '{怪しい|あやしい|v:n2_0158}外国人だと思われてるのかな。……{単に|たんに|v:n3_1449}、ぼくが{勝手|かって}にそう思ってるだけかもしれないけど。', ['Maybe they think I’m a suspicious foreigner. …Or maybe I’m simply imagining it.', 'Vielleicht halten sie mich für einen verdächtigen Ausländer. … Oder ich bilde es mir einfach nur ein.'], 'worried'),
        ],
        teach: ['v:n2_1449', 'v:n3_1505', 'v:n2_0158', 'v:n3_1449'],
      },
      {
        at: 'ex_lucas',
        goal: ['Bring Lucas to the calligraphy club', 'Bring Lucas zum Kalligrafie-Club'],
        music: 'memory',
        lines: [
          nar('書道部の部屋。声を{失った|うしなった}{結衣|ゆい}さんが、筆で書いた紙を、ルーカスくんに{差し出した|さしだした}。「わたしも、言葉が{通じない|つうじない|v:n3_1499}の」', ['The calligraphy club room. Yui, who lost her voice, holds out a paper written with her brush to Lucas: “My words don’t get through either.”', 'Der Raum des Kalligrafie-Clubs. Yui, die ihre Stimme verloren hat, hält Lucas ein mit dem Pinsel beschriebenes Blatt hin: „Meine Worte kommen auch nicht an.“']),
          l('ex_lucas', '……{お互い|おたがい}、言葉で{苦労|くろう}してるんだね。でも、今、すごく分かった気がする。', ['…We both struggle with words, don’t we. But right now I feel I understand perfectly.', '… Wir beide kämpfen mit Worten, oder? Aber gerade jetzt habe ich das Gefühl, alles zu verstehen.'], 'surprised'),
          l('ex_lucas', '言葉の{相違|そうい|v:n2_1045}は、{壁|かべ}じゃなかった。{互い|たがい|v:n3_1387}の{存在|そんざい|v:n3_1349}を見ようとすること。それが、本当の{日本語|にほんご}の{勉強|べんきょう}だったんだ。', ['The difference in language wasn’t a wall. Trying to see each other’s existence — that was the real Japanese study.', 'Der Unterschied der Sprache war keine Mauer. Zu versuchen, die Existenz des anderen zu sehen — das war das eigentliche Japanischlernen.'], 'happy'),
        ],
        teach: ['v:n3_1499', 'v:n2_1045', 'v:n3_1387', 'v:n3_1349'],
      },
    ],
  },
  // ------------------------------------------------------------------ Prof. Miyamoto: the last lecture
  {
    id: 'ep_ex_miyamoto',
    chapter: 5,
    after: 'mq18',
    who: 'ex_miyamoto',
    title: ['最終講義', 'The Last Lecture', 'Die letzte Vorlesung'],
    summary: [
      'Professor Miyamoto’s last lecture before retirement is next week. Classical literature — and hardly anyone signs up for it any more.',
      'Professor Miyamotos letzte Vorlesung vor der Pensionierung ist nächste Woche. Klassische Literatur — und kaum noch jemand belegt sie.',
    ],
    scenes: [
      {
        at: 'ex_miyamoto',
        goal: ['Talk to Prof. Miyamoto', 'Sprich mit Professor Miyamoto'],
        lines: [
          l('ex_miyamoto', '四十年、古典を教えてきた。{神話|しんわ|v:n2_0935}、{童話|どうわ|v:n2_1301}、{伝記|でんき|v:n2_1267}……日本の{文芸|ぶんげい|v:n2_1598}の{起源|きげん|v:n3_1255}を{探|さが}してね。', ['For forty years I’ve taught the classics. Myths, fairy tales, biographies… searching for the origins of Japanese literature.', 'Vierzig Jahre habe ich die Klassiker unterrichtet. Mythen, Märchen, Biografien … immer auf der Suche nach den Ursprüngen der japanischen Literatur.']),
          l('ex_miyamoto', '今の学生の{大半|たいはん|v:n3_1373}は、{古典|こてん}を{専攻|せんこう|v:n3_1302}しない。{退屈|たいくつ|v:n3_1361}だと言われるよ。', ['Most students today don’t major in the classics. They call it boring.', 'Die meisten Studierenden heute wählen keine Klassiker als Hauptfach. Langweilig, sagen sie.'], 'worried'),
          l('ex_miyamoto', '最後の講義の{題|だい|v:n3_1355}は、もう決めてある。「{名|な}もない{作者|さくしゃ|v:n2_0713}たち」。……聞きに来る人は、{恐|おそ}らく三人だろうね。', ['I’ve already chosen the title of my last lecture: “The Nameless Authors.” …Probably three people will come.', 'Den Titel der letzten Vorlesung habe ich schon: „Die namenlosen Autoren.“ … Wahrscheinlich kommen drei Leute.']),
        ],
        teach: ['v:n2_0935', 'v:n2_1301', 'v:n2_1267', 'v:n2_1598', 'v:n3_1255', 'v:n3_1373', 'v:n3_1302', 'v:n3_1361', 'v:n3_1355', 'v:n2_0713'],
      },
      {
        at: 'exk_library',
        goal: ['Look for the professor’s old book in the library', 'Such in der Bibliothek nach dem alten Buch des Professors'],
        lines: [
          nar('図書館の古い{棚|たな}に、四十年前に{刊行|かんこう|v:n3_1249}された本があった。{著者|ちょしゃ|v:n3_1490}は、{若|わか}い宮本先生だ。', ['On an old library shelf is a book published forty years ago. Its author is the young Professor Miyamoto.', 'In einem alten Bibliotheksregal steht ein Buch, das vor vierzig Jahren erschienen ist. Der Autor ist der junge Professor Miyamoto.']),
          nar('{活字|かつじ|v:n2_0418}は小さく、{語句|ごく|v:n3_1285}の{説明|せつめい}がびっしり。{短編|たんぺん|v:n2_1145}が一つずつ、{丁寧|ていねい}に読み{解|と}かれている。', ['The type is small, packed with explanations of words and phrases. Each short story is carefully interpreted.', 'Die Schrift ist klein, voller Erklärungen zu Wörtern und Wendungen. Jede Kurzgeschichte wird sorgfältig gedeutet.']),
          l('ex_haruka', 'この本、{貸し出し|かしだし}の記録がすごいんです。{教養|きょうよう|v:n2_0509}の授業で、四十年間、ずっと読まれてきた。{経緯|けいい|v:n3_1269}を{調|しら}べたら……。', ['This book’s lending record is amazing. It has been read in general-education courses for forty years. When I traced the history…', 'Die Ausleihliste dieses Buches ist erstaunlich. Es wird seit vierzig Jahren in Allgemeinbildungskursen gelesen. Als ich der Geschichte nachgegangen bin …']),
        ],
        teach: ['v:n3_1249', 'v:n3_1490', 'v:n2_0418', 'v:n3_1285', 'v:n2_1145', 'v:n2_0509', 'v:n3_1269'],
      },
      {
        at: 'exk_hall',
        goal: ['Attend the last lecture', 'Besuche die letzte Vorlesung'],
        music: 'memory',
        lines: [
          nar('講義の日。講堂の{大部分|だいぶぶん|v:n3_1375}が、人で{埋|う}まっていた。白髪の人も、子ども{連|づ}れの人もいる。', ['The day of the lecture. Most of the hall is filled with people. White-haired people, people with children.', 'Der Tag der Vorlesung. Der größte Teil des Saals ist voller Menschen. Weißhaarige, Leute mit Kindern.']),
          nar('「先生の本が{契機|けいき|v:n3_1271}で、教師になりました」「四十年前の教え{子|ご}です」……みんな、{尊敬|そんけい|v:n3_1348}の目で先生を見ている。', ['“Your book was what made me become a teacher.” “I was your student forty years ago.” …Everyone looks at the professor with respect.', '„Ihr Buch war der Anlass, dass ich Lehrer geworden bin.“ „Ich war vor vierzig Jahren Ihr Schüler.“ … Alle sehen den Professor voller Respekt an.']),
          l('ex_miyamoto', '……{遂に|ついに|v:n3_1493}、名もない作者たちの気持ちが、分かったよ。読んでくれる人がいる。それだけで、書いた{意味|いみ}がある。', ['…At last I understand how those nameless authors felt. There are people who read you. That alone gives meaning to what you wrote.', '… Endlich verstehe ich, wie sich die namenlosen Autoren gefühlt haben. Es gibt Menschen, die einen lesen. Das allein gibt dem Geschriebenen Sinn.'], 'happy'),
          l('ex_miyamoto', '{注目|ちゅうもく|v:n3_1481}されなくてもいい。{言葉|ことば}は、{必|かなら}ずだれかに{届|とど}くんだね。', ['It doesn’t matter if no one pays attention. Words always reach someone, don’t they.', 'Es macht nichts, wenn niemand Notiz nimmt. Worte erreichen immer irgendjemanden, nicht wahr?'], 'happy'),
        ],
        teach: ['v:n3_1375', 'v:n3_1271', 'v:n3_1348', 'v:n3_1493', 'v:n3_1481'],
      },
    ],
  },
  // ------------------------------------------------------------------ Daisuke: the runner who pulls a rickshaw
  {
    id: 'ep_ex_daisuke',
    chapter: 5,
    after: 'mq19',
    who: 'ex_daisuke',
    title: ['走る理由', 'A Reason to Run', 'Ein Grund zu laufen'],
    summary: [
      'Daisuke wanted to be a professional runner. An injury ended that dream. Now he pulls a rickshaw for tourists — and is ashamed of it.',
      'Daisuke wollte Profiläufer werden. Eine Verletzung beendete den Traum. Jetzt zieht er eine Rikscha für Touristen — und schämt sich dafür.',
    ],
    scenes: [
      {
        at: 'exk_rickshaw',
        goal: ['Visit the rickshaw stand', 'Besuche den Rikscha-Stand'],
        lines: [
          l('ex_daisuke', 'お客さんの{体重|たいじゅう|v:n3_1365}が八十キロでも、二人乗りでも、{走|はし}るっすよ！', ['Even if the customer weighs eighty kilos, even with two people on board — I run!', 'Selbst wenn der Kunde achtzig Kilo wiegt, selbst zu zweit — ich laufe!'], 'happy'),
          l('ex_daisuke', '{代金|だいきん|v:n3_1360}は三十分で五千円。{小銭|こぜに|v:n3_1288}でもいいっす。{儲かる|もうかる}仕事じゃないけどね。', ['Thirty minutes for five thousand yen. Small change is fine too. It’s not a job that makes much money, though.', 'Dreißig Minuten für fünftausend Yen. Kleingeld geht auch. Reich wird man mit dem Job nicht.']),
          l('ex_daisuke', '昔は、陸上の{大会|たいかい|v:n3_1358}で、{速度|そくど|v:n3_1322}だけを考えてた。{加速度|かそくど|v:n2_0404}の{計算|けいさん}までしてね。', ['In the old days at track meets, all I thought about was speed. I even calculated my acceleration.', 'Früher bei Leichtathletik-Wettkämpfen dachte ich nur an Geschwindigkeit. Ich habe sogar meine Beschleunigung berechnet.']),
        ],
        teach: ['v:n3_1365', 'v:n3_1360', 'v:n3_1288', 'v:n3_1358', 'v:n3_1322', 'v:n2_0404'],
      },
      {
        at: 'ex_daisuke',
        goal: ['Ask Daisuke about his dream', 'Frag Daisuke nach seinem Traum'],
        lines: [
          l('ex_daisuke', '二十二の時、{膝|ひざ}を{壊|こわ}して。{勝敗|しょうはい|v:n2_0887}の{世界|せかい}で{戦う|たたかう|v:n3_1404}{チャンス||v:n3_1470}は、それで終わり。', ['At twenty-two I wrecked my knee. That was the end of my chance to compete in a world of wins and losses.', 'Mit zweiundzwanzig habe ich mir das Knie ruiniert. Damit war meine Chance vorbei, in der Welt von Sieg und Niederlage anzutreten.'], 'worried'),
          l('ex_daisuke', '{体育|たいいく|v:n3_1356}{大学|だいがく}の仲間は、今はコーチや選手。……俺は、観光客を乗せて走ってる。{損|そん|v:n3_1346}な人生っすよね。', ['My friends from sports university are coaches and athletes now. …I’m running around with tourists in the back. A losing life, right?', 'Meine Kumpels von der Sporthochschule sind jetzt Trainer und Athleten. … Ich laufe mit Touristen herum. Ein Verliererleben, oder?'], 'worried'),
          l('ex_daisuke', '毎日の{疲れ|つかれ|v:n3_1504}は、{悪|わる}くないんすけどね。……{戦い|たたかい|v:n3_1403}から{逃|に}げた気がして。', ['The tiredness every day isn’t bad. …I just feel like I ran away from the fight.', 'Die tägliche Müdigkeit ist nicht schlecht. … Ich habe nur das Gefühl, vor dem Kampf davongelaufen zu sein.']),
        ],
        teach: ['v:n2_0887', 'v:n3_1404', 'v:n3_1470', 'v:n3_1356', 'v:n3_1346', 'v:n3_1504', 'v:n3_1403'],
      },
      {
        at: 'ex_daisuke',
        goal: ['Ride with Daisuke to the top of the hill', 'Fahr mit Daisuke auf den Hügel'],
        music: 'memory',
        lines: [
          nar('{車椅子|くるまいす}のおばあさんを乗せて、大輔さんが坂を上る。{足元|あしもと|v:n2_0136}をしっかり{踏|ふ}みしめて、{思い切り|おもいきり|v:n2_0322}。', ['Daisuke pulls an old lady who uses a wheelchair up the slope. Planting his feet firmly, with all his strength.', 'Daisuke zieht eine alte Dame, die im Rollstuhl sitzt, den Hang hinauf. Er setzt die Füße fest auf, mit aller Kraft.']),
          nar('{頂上|ちょうじょう|v:n3_1486}。{地平線|ちへいせん|v:n3_1467}に、{太陽|たいよう|v:n3_1380}が{沈|しず}んでいく。おばあさんが、{興奮|こうふん|v:n3_1284}して手をたたいた。「五十年ぶりに、この{景色|けしき}を見たわ！」', ['The top. The sun sinks on the horizon. The old lady claps, excited. “I’m seeing this view for the first time in fifty years!”', 'Der Gipfel. Die Sonne versinkt am Horizont. Die alte Dame klatscht aufgeregt. „Zum ersten Mal seit fünfzig Jahren sehe ich diesen Ausblick!“']),
          l('ex_daisuke', '……そっか。俺の足は、だれかの夢を{掴む|つかむ|v:n3_1503}ためにあるのかもな。', ['…I see. Maybe my legs are here to help someone grab hold of a dream.', '… Verstehe. Vielleicht sind meine Beine dazu da, jemandem zu helfen, einen Traum zu greifen.'], 'happy'),
          l('ex_daisuke', '{肘|ひじ|v:n2_1492}まで汗びっしょりだけど、こんなに{気持|きも}ちいいゴール、初めてっす。', ['I’m soaked in sweat up to my elbows, but I’ve never crossed a finish line that felt this good.', 'Ich bin bis zu den Ellbogen nass geschwitzt, aber so ein schönes Ziel hatte ich noch nie.'], 'happy'),
        ],
        teach: ['v:n2_0136', 'v:n2_0322', 'v:n3_1486', 'v:n3_1467', 'v:n3_1380', 'v:n3_1284', 'v:n3_1503', 'v:n2_1492'],
      },
    ],
  },
  // ------------------------------------------------------------------ Mr. Matsui: the dying maple
  {
    id: 'ep_ex_matsui',
    chapter: 5,
    after: 'mq19',
    who: 'ex_matsui',
    title: ['三百年の紅葉', 'The Three-Hundred-Year Maple', 'Der dreihundertjährige Ahorn'],
    summary: [
      'The ancient maple in the temple garden is dying. Gardener Matsui has cared for it for forty years and cannot let it go.',
      'Der uralte Ahorn im Tempelgarten stirbt. Gärtner Matsui pflegt ihn seit vierzig Jahren und kann ihn nicht loslassen.',
    ],
    scenes: [
      {
        at: 'exk_gate',
        goal: ['Enter the temple garden', 'Betritt den Tempelgarten'],
        lines: [
          nar('{寺院|じいん|v:n2_0749}の庭。大きな{紅葉|もみじ}の{葉|は}が、まだ秋なのに、{次|つぎ}から{次|つぎ}へと{散って|ちって|v:n3_1492}いる。', ['The temple garden. Although it is still autumn, the leaves of the great maple are falling one after another.', 'Der Tempelgarten. Obwohl noch Herbst ist, fallen die Blätter des großen Ahorns eins nach dem anderen.']),
          l('ex_matsui', '{根|ね}の{底|そこ|v:n3_1323}に、{菌|きん|v:n3_1264}が入った。{土|つち|v:n3_1516}を変えても、もう{遅|おそ}い。', ['A fungus got into the bottom of the roots. Even changing the soil, it’s too late.', 'Ein Pilz ist bis tief in die Wurzeln eingedrungen. Selbst die Erde auszutauschen kommt zu spät.'], 'worried'),
          l('ex_matsui', 'この木は、{寺|てら}の{先祖|せんぞ|v:n2_1034}が{植|う}えた。この{景観|けいかん|v:ky_keikan}を見に、毎年たくさんの人が来るんじゃ。', ['This tree was planted by the temple’s ancestors. Every year many people come to see this view.', 'Diesen Baum haben die Vorfahren des Tempels gepflanzt. Jedes Jahr kommen viele Menschen, um diesen Anblick zu sehen.']),
        ],
        teach: ['v:n2_0749', 'v:n3_1492', 'v:n3_1323', 'v:n3_1264', 'v:n3_1516', 'v:n2_1034', 'v:ky_keikan'],
      },
      {
        at: 'ex_matsui',
        goal: ['Talk to Mr. Matsui', 'Sprich mit Herrn Matsui'],
        lines: [
          l('ex_matsui', '四十年、この木の{世話|せわ}をしてきた。わしの{宝|たから|v:n3_1389}じゃ。', ['For forty years I’ve looked after this tree. It’s my treasure.', 'Vierzig Jahre habe ich mich um diesen Baum gekümmert. Er ist mein Schatz.']),
          l('ex_matsui', '{坊さん|ぼうさん|v:n2_1631}は「木にも{寿命|じゅみょう}がある」と言う。分かっとる。じゃが、{鈍い|にぶい|v:n2_1379}わしの心は、まだ受け入れられん。', ['The monk says, “Trees have a lifespan too.” I know. But my slow old heart still can’t accept it.', 'Der Mönch sagt: „Auch Bäume haben eine Lebensspanne.“ Ich weiß. Aber mein träges Herz kann es noch nicht annehmen.'], 'worried'),
          l('ex_matsui', 'この木の{種類|しゅるい}は、もう{絶滅|ぜつめつ|v:n3_1295}しかけとる。{荒廃|こうはい|v:n3_1282}した庭だけが残るのか……。', ['This kind of tree is almost extinct. Will only a ruined garden be left…', 'Diese Baumart ist fast ausgestorben. Bleibt am Ende nur ein verwüsteter Garten …']),
        ],
        teach: ['v:n3_1389', 'v:n2_1631', 'v:n2_1379', 'v:n3_1295', 'v:n3_1282'],
      },
      {
        at: 'ex_matsui',
        goal: ['Help Mr. Matsui gather seeds', 'Hilf Herrn Matsui, Samen zu sammeln'],
        music: 'memory',
        lines: [
          nar('松井さんと、{紅葉|もみじ}の{種|たね|v:n3_1419}を一つ{残らず|のこらず|v:n2_1401}{拾|ひろ}った。{羽|はね}のついた、小さな種。', ['Together with Mr. Matsui you pick up every last one of the maple seeds. Small seeds with wings.', 'Zusammen mit Herrn Matsui sammelst du jeden einzelnen Ahornsamen auf. Kleine Samen mit Flügeln.']),
          l('ex_matsui', '{園芸|えんげい|v:n2_0258}の{基本|きほん}じゃ。親の木が{倒|たお}れても、{子孫|しそん|v:n2_0772}を残せばええ。', ['It’s the basics of gardening. Even if the parent tree falls, it can leave offspring.', 'Das ist das Einmaleins des Gärtnerns. Auch wenn der Mutterbaum fällt, kann er Nachkommen hinterlassen.'], 'happy'),
          l('ex_matsui', '三百年前の{祖先|そせん|v:n2_1068}の木から、新しい木が{誕生|たんじょう|v:n3_1444}する。……わしが見られんでも、だれかが見る。それで十分じゃ。', ['From the tree of ancestors three hundred years ago, a new tree will be born. …Even if I don’t live to see it, someone will. That’s enough.', 'Aus dem Baum der Vorfahren von vor dreihundert Jahren wird ein neuer Baum geboren. … Auch wenn ich es nicht mehr sehe, wird es jemand sehen. Das genügt.'], 'happy'),
        ],
        teach: ['v:n3_1419', 'v:n2_1401', 'v:n2_0258', 'v:n2_0772', 'v:n2_1068', 'v:n3_1444'],
      },
    ],
  },
  // ------------------------------------------------------------------ Grandma Shizu: the bamboo craftswoman
  {
    id: 'ep_ex_shizu',
    chapter: 5,
    after: 'mq19',
    who: 'ex_shizu',
    title: ['竹を編む手', 'Hands That Weave Bamboo', 'Hände, die Bambus flechten'],
    summary: [
      'Shizu has woven bamboo for sixty years and has no apprentice. One day a student stands at her door.',
      'Shizu flicht seit sechzig Jahren Bambus und hat keine Schülerin. Eines Tages steht eine Studentin vor ihrer Tür.',
    ],
    scenes: [
      {
        at: 'exk_bamboo',
        goal: ['Visit the bamboo workshop', 'Besuche die Bambuswerkstatt'],
        lines: [
          l('ex_shizu', '{竹|たけ|v:n2_1116}はな、{曲げる|まげる|v:n2_1669}と{割|わ}れる。{曲線|きょくせん|v:n2_0512}を作るには、{知恵|ちえ|v:n3_1455}が要るんよ。', ['Bamboo, you see, cracks if you bend it. To make a curve, you need know-how.', 'Bambus bricht, wenn man ihn biegt. Um eine Kurve zu formen, braucht man Erfahrung.']),
          l('ex_shizu', '{竹|たけ}の{束|たば|v:n3_1420}を{細|ほそ}く{割|わ}って、{布|ぬの}のように{織る|おる|v:n3_1233}。{釘|くぎ|v:n2_0524}は一本も使わん。', ['You split a bundle of bamboo into thin strips and weave them like cloth. Not a single nail is used.', 'Man spaltet ein Bündel Bambus in dünne Streifen und webt sie wie Stoff. Kein einziger Nagel wird verwendet.']),
          l('ex_shizu', 'これが、京都の竹の{工芸|こうげい|v:n2_0613}。……じゃが、わしの代で{終|しま}いじゃろうね。', ['This is Kyoto’s bamboo craft. …But it will probably end with me.', 'Das ist das Bambushandwerk Kyotos. … Aber mit mir ist wohl Schluss.'], 'worried'),
        ],
        teach: ['v:n2_1116', 'v:n2_1669', 'v:n2_0512', 'v:n3_1455', 'v:n3_1420', 'v:n3_1233', 'v:n2_0524', 'v:n2_0613'],
      },
      {
        at: 'ex_shizu',
        goal: ['Meet the student at Shizu’s door', 'Triff die Studentin vor Shizus Tür'],
        lines: [
          nar('工房の前に、若い女の人が立っている。「教えてください。{試し|ためし|v:n3_1434}に、一週間だけでも」', ['A young woman stands in front of the workshop. “Please teach me. Even just for a week, as a trial.”', 'Vor der Werkstatt steht eine junge Frau. „Bitte bringen Sie es mir bei. Und sei es nur eine Woche zur Probe.“']),
          l('ex_shizu', '一週間？……{幼稚|ようち|v:n2_1833}なこと言うんじゃないよ。竹は、十年かかる。', ['A week? …Don’t say such childish things. Bamboo takes ten years.', 'Eine Woche? … Red nicht so kindisch daher. Bambus braucht zehn Jahre.']),
          nar('「じゃあ、十年、{通|かよ}います。だれにも{頼る|たよる|v:n3_1438}{人|ひと}がいなくても、この手で、何かを作りたいんです」', ['“Then I’ll come for ten years. Even with no one to rely on, I want to make something with these hands.”', '„Dann komme ich zehn Jahre lang. Auch wenn ich mich auf niemanden verlassen kann, will ich mit diesen Händen etwas erschaffen.“']),
          l('ex_shizu', '……ふん。{隙|すき|v:n2_0956}のない目をしとる。まずは、わしに{倣って|ならって|v:n2_1358}、竹を{叩く|たたく|v:n3_1405}ところからじゃ。', ['…Hmph. You’ve got watchful eyes. First, follow my lead — we start by tapping the bamboo.', '… Hm. Du hast wache Augen. Zuerst machst du es mir nach — wir fangen damit an, den Bambus abzuklopfen.']),
        ],
        teach: ['v:n3_1434', 'v:n2_1833', 'v:n3_1438', 'v:n2_0956', 'v:n2_1358', 'v:n3_1405'],
      },
      {
        at: 'ex_shizu',
        goal: ['See the student’s first basket', 'Sieh dir den ersten Korb der Studentin an'],
        music: 'memory',
        lines: [
          nar('三か月後。目は{揃って|そろって|v:n3_1344}いないし、{形|かたち}も{整って|ととのって|v:n2_1319}いない。でも、小さな{籠|かご}が一つ、できあがった。', ['Three months later. The weave isn’t even, the shape isn’t neat. But one small basket is finished.', 'Drei Monate später. Das Geflecht ist nicht gleichmäßig, die Form nicht sauber. Aber ein kleiner Korb ist fertig.']),
          l('ex_shizu', '{段階|だんかい|v:n2_1135}を一つずつ{上|あ}がっとる。{着々|ちゃくちゃく|v:n2_1164}とな。……わしの最初の籠より、ずっとええ。', ['She’s climbing step by step. Steadily. …It’s much better than my first basket.', 'Sie steigt Stufe für Stufe auf. Stetig. … Viel besser als mein erster Korb.'], 'happy'),
          l('ex_shizu', 'もう少し{試して|ためして|v:n3_1435}みるかね。竹と人は、{くっつく||v:n2_0541}までに時間がかかるもんじゃ。', ['Shall we keep trying a while longer? Bamboo and people take time before they stick together.', 'Wollen wir es noch eine Weile versuchen? Bambus und Menschen brauchen Zeit, bis sie zusammenwachsen.'], 'happy'),
        ],
        teach: ['v:n3_1344', 'v:n2_1319', 'v:n2_1135', 'v:n2_1164', 'v:n3_1435', 'v:n2_0541'],
      },
    ],
  },
  // ------------------------------------------------------------------ Mr. Ichirō: the book that came back
  {
    id: 'ep_ex_ichirou',
    chapter: 5,
    after: 'mq20',
    who: 'ex_ichirou',
    title: ['帰ってきた本', 'The Book That Came Back', 'Das Buch, das zurückkam'],
    summary: [
      'A book that old Ichirō sold forty years ago comes back to his shop. Inside is a note in his own handwriting.',
      'Ein Buch, das der alte Ichirō vor vierzig Jahren verkauft hat, kommt in seinen Laden zurück. Darin steckt ein Zettel in seiner eigenen Handschrift.',
    ],
    scenes: [
      {
        at: 'exk_bookshop',
        goal: ['Browse the second-hand bookshop', 'Stöbere im Antiquariat'],
        lines: [
          nar('{古本屋|ふるほんや}の店先。{中古|ちゅうこ|v:n3_1476}の本の{包み|つつみ|v:n3_1518}が、{山|やま}のように{積|つ}まれている。少し{かび||v:n2_0430}の{匂|にお}いがする。', ['The front of the second-hand bookshop. Packages of used books are piled up like a mountain. There’s a faint smell of mould.', 'Vor dem Antiquariat stapeln sich Pakete mit gebrauchten Büchern wie ein Berg. Es riecht leicht nach Schimmel.']),
          l('ex_ichirou', '今朝、{故人|こじん|v:n3_1287}の家から、本がまとめて来たんだよ。{中身|なかみ|v:n2_1340}を一冊ずつ{確かめて|たしかめて|v:n3_1396}いるところさ。', ['This morning a batch of books came from the house of someone who passed away. I’m checking the contents one by one.', 'Heute Morgen kam ein ganzer Schwung Bücher aus dem Haus eines Verstorbenen. Ich prüfe gerade den Inhalt, Buch für Buch.']),
          l('ex_ichirou', '……おや？この本、{偶々|たまたま|v:n3_1430}だろうか。四十年前、わしがこの店で売った本だ。', ['…Hm? This book — can it be chance? It’s a book I sold in this very shop forty years ago.', '… Nanu? Dieses Buch — ist das Zufall? Das habe ich vor vierzig Jahren genau in diesem Laden verkauft.'], 'surprised'),
        ],
        teach: ['v:n3_1476', 'v:n3_1518', 'v:n2_0430', 'v:n3_1287', 'v:n2_1340', 'v:n3_1396', 'v:n3_1430'],
      },
      {
        at: 'ex_ichirou',
        goal: ['Read the note in the book with Ichirō', 'Lies mit Ichirō den Zettel im Buch'],
        lines: [
          nar('本を{裏返す|うらがえす|v:n2_0233}と、古いメモが落ちた。「この本を買った{君|きみ}へ。{続き|つづき|v:n3_1517}は、{君|きみ}が書いてくれ」', ['When he turns the book over, an old note falls out: “To you who bought this book. Please write the rest yourself.”', 'Als er das Buch umdreht, fällt ein alter Zettel heraus: „An dich, der du dieses Buch gekauft hast. Schreib bitte selbst die Fortsetzung.“']),
          l('ex_ichirou', 'わしの字だ。{たしか||v:n3_1395}、若いころ、作家になりたくて……でも、なれなかった。', ['That’s my handwriting. If I remember right, when I was young I wanted to be a writer… but I never made it.', 'Das ist meine Schrift. Wenn ich mich recht erinnere, wollte ich als junger Mann Schriftsteller werden … aber ich habe es nie geschafft.']),
          l('ex_ichirou', '{名字|みょうじ|v:n2_1724}を見てごらん。{生年月日|せいねんがっぴ|v:n2_1000}は、{西暦|せいれき|v:n2_1008}一九六〇年。この{故人|こじん}は、四十年、この本を持っていたんだ。', ['Look at the family name. Date of birth: 1960. This person kept the book for forty years.', 'Sieh dir den Familiennamen an. Geburtsdatum: 1960. Dieser Mensch hat das Buch vierzig Jahre lang behalten.']),
        ],
        teach: ['v:n2_0233', 'v:n3_1517', 'v:n3_1395', 'v:n2_1724', 'v:n2_1000', 'v:n2_1008'],
      },
      {
        at: 'ex_ichirou',
        goal: ['Hear what the family told Ichirō', 'Hör, was die Familie Ichirō erzählt hat'],
        music: 'memory',
        lines: [
          l('ex_ichirou', '家族の方が、{直接|ちょくせつ|v:n3_1489}来てくれた。{故人|こじん}は、{小学校|しょうがっこう}の先生だったそうだ。', ['The family came in person. The deceased, they said, was a primary school teacher.', 'Die Familie ist persönlich gekommen. Der Verstorbene war Grundschullehrer, sagten sie.']),
          l('ex_ichirou', 'わしのメモを読んで、四十年、子どもたちに{物語|ものがたり}を書き続けたらしい。ノートが、{多少|たしょう|v:n3_1397}じゃない、百冊もあるんだと。', ['After reading my note, he apparently kept writing stories for children for forty years. Not just a few notebooks — a hundred of them.', 'Nachdem er meinen Zettel gelesen hatte, hat er offenbar vierzig Jahre lang Geschichten für Kinder geschrieben. Nicht nur ein paar Hefte — hundert Stück.'], 'surprised'),
          l('ex_ichirou', '……{たまらない||v:n3_1431}な。わしは作家になれなかったが、わしの{言葉|ことば}が、だれかを作家にしたんだ。', ['…It’s overwhelming. I never became a writer, but my words made someone else one.', '… Das überwältigt mich. Ich bin nie Schriftsteller geworden, aber meine Worte haben jemanden dazu gemacht.'], 'happy'),
        ],
        teach: ['v:n3_1489', 'v:n3_1397', 'v:n3_1431'],
      },
    ],
  },
  // ------------------------------------------------------------------ Koharu: the homesick maiko
  {
    id: 'ep_ex_koharu',
    chapter: 5,
    after: 'mq20',
    who: 'ex_koharu',
    title: ['見世出しの前に', 'Before the Debut', 'Vor dem ersten Auftritt'],
    summary: [
      'Koharu is training to become a maiko. For one year she may not see her family. Her debut is close, and her homesickness grows.',
      'Koharu macht eine Ausbildung zur Maiko. Ein Jahr lang darf sie ihre Familie nicht sehen. Ihr Debüt rückt näher, und das Heimweh wächst.',
    ],
    scenes: [
      {
        at: 'exk_okiya',
        goal: ['Look into the okiya', 'Schau ins Okiya'],
        lines: [
          nar('{置屋|おきや}の中から、{三味線|しゃみせん}の{響き|ひびき|v:n2_1520}が聞こえる。{民謡|みんよう|v:n2_1729}の{古|ふる}い{歌謡|かよう|v:n2_0439}だ。', ['From inside the okiya comes the sound of a shamisen. An old folk song.', 'Aus dem Okiya klingt eine Shamisen. Ein altes Volkslied.']),
          l('ex_koharu', '朝から晩まで、{楽器|がっき|v:n2_0414}と{踊|おど}りのお{稽古|けいこ}。{足袋|たび|v:n2_1127}も、一日で{真っ黒|まっくろ}になるの。', ['From morning to night, instrument and dance lessons. My tabi socks turn black in a single day.', 'Von morgens bis abends Instrument- und Tanzunterricht. Meine Tabi-Socken sind nach einem Tag schwarz.']),
          l('ex_koharu', '{着物|きもの}の{袖|そで|v:n3_1331}の{扱|あつか}い方、{扇|おうぎ}で{扇ぐ|あおぐ|v:n2_0125}{仕草|しぐさ}……全部、{儀式|ぎしき|v:n2_0483}みたいに{決|き}まってるんよ。', ['How to handle a kimono sleeve, how to fan yourself with a folding fan… everything is fixed, like a ritual.', 'Wie man den Kimonoärmel hält, wie man sich mit dem Fächer Luft zufächelt … alles ist festgelegt wie ein Ritual.']),
        ],
        teach: ['v:n2_1520', 'v:n2_1729', 'v:n2_0439', 'v:n2_0414', 'v:n2_1127', 'v:n3_1331', 'v:n2_0125', 'v:n2_0483'],
      },
      {
        at: 'ex_koharu',
        goal: ['Talk to Koharu', 'Sprich mit Koharu'],
        lines: [
          l('ex_koharu', 'うち、{末っ子|すえっこ|v:n2_0953}やから、家ではずっと{甘やかされて|あまやかされて|v:n2_0152}たの。', ['I’m the youngest, so at home I was always spoiled.', 'Ich bin die Jüngste, deshalb wurde ich zu Hause immer verwöhnt.']),
          l('ex_koharu', '一年は{父母|ふぼ|v:n2_1576}に会えない{決|き}まり。{父親|ちちおや|v:n3_1465}の声も、もう{忘|わす}れそう。', ['The rule is that I can’t see my parents for a year. I’m starting to forget my father’s voice.', 'Die Regel ist, dass ich meine Eltern ein Jahr lang nicht sehen darf. Ich vergesse schon fast die Stimme meines Vaters.'], 'worried'),
          l('ex_koharu', 'でも、{見習|みなら}いの{立場|たちば|v:n3_1409}で、泣いたらあかん。{常に|つねに|v:n3_1524}{笑顔|えがお}でいるのが、うちの{務め|つとめ|v:n3_1520}やから。', ['But as an apprentice, I mustn’t cry. Always smiling — that’s my duty.', 'Aber als Lehrling darf ich nicht weinen. Immer zu lächeln ist meine Pflicht.']),
        ],
        teach: ['v:n2_0953', 'v:n2_0152', 'v:n2_1576', 'v:n3_1465', 'v:n3_1409', 'v:n3_1524', 'v:n3_1520'],
      },
      {
        at: 'ex_koharu',
        goal: ['Go with Koharu to the shrine before her debut', 'Geh vor ihrem Debüt mit Koharu zum Schrein'],
        music: 'memory',
        lines: [
          nar('{見世出し|みせだし}の前の日。小春ちゃんと、{神社|じんじゃ}に{お参り|おまいり|v:n2_0316}に行った。赤い{鳥居|とりい|v:ky_torii}の下で、{神様|かみさま|v:n2_0435}に手を合わせる。', ['The day before her debut, you go with Koharu to pray at a shrine. Under the red torii, she puts her hands together for the gods.', 'Am Tag vor ihrem Debüt gehst du mit Koharu zum Beten an einen Schrein. Unter dem roten Torii faltet sie die Hände vor den Göttern.']),
          nar('その時、{鳥居|とりい}の{向|む}こうに、小さな人かげが見えた。{遠|とお}くから、手をふっている。……お{母|かあ}さんだ。', ['Just then, beyond the torii, a small figure appears. Waving from a distance. …It’s her mother.', 'Da erscheint jenseits des Torii eine kleine Gestalt. Sie winkt aus der Ferne. … Es ist ihre Mutter.']),
          l('ex_koharu', '……話したらあかん{決|き}まり。でも、見るだけなら、ええよね。……お母さん、{間もなく|まもなく|v:n2_1692}、うち、舞妓になるよ。', ['…The rule says I can’t talk to her. But just looking is all right, isn’t it. …Mum, very soon I’ll be a maiko.', '… Die Regel sagt, ich darf nicht mit ihr reden. Aber nur schauen ist in Ordnung, oder? … Mama, bald bin ich eine Maiko.'], 'happy'),
          l('ex_koharu', '明日の{公演|こうえん|v:n3_1278}、お母さんにも、この{恩恵|おんけい|v:n2_0332}の{全部|ぜんぶ}が届くように踊るね。', ['At tomorrow’s performance, I’ll dance so that all of this blessing reaches Mum too.', 'Bei der Vorstellung morgen tanze ich so, dass dieser ganze Segen auch Mama erreicht.'], 'happy'),
        ],
        teach: ['v:n2_0316', 'v:ky_torii', 'v:n2_0435', 'v:n2_1692', 'v:n3_1278', 'v:n2_0332'],
      },
    ],
  },
  // ------------------------------------------------------------------ Haruka: the love letter of 1975
  {
    id: 'ep_ex_haruka',
    chapter: 5,
    after: 'mq20',
    who: 'ex_haruka',
    title: ['一九七五年の手紙', 'The Letter of 1975', 'Der Brief von 1975'],
    summary: [
      'In a returned library book, librarian Haruka finds a love letter from 1975 that was never delivered.',
      'In einem zurückgegebenen Bibliotheksbuch findet die Bibliothekarin Haruka einen Liebesbrief von 1975, der nie zugestellt wurde.',
    ],
    scenes: [
      {
        at: 'ex_haruka',
        goal: ['Talk to Haruka at the library', 'Sprich mit Haruka in der Bibliothek'],
        lines: [
          l('ex_haruka', '{一昨日|おととい|v:n2_0192}{返|かえ}ってきた本に、これが{挟|はさ}まっていたんです。一九七五年の手紙。{宛名|あてな}は「{千代|ちよ}さんへ」。', ['This was tucked inside a book returned the day before yesterday. A letter from 1975, addressed “To Chiyo”.', 'Das steckte in einem Buch, das vorgestern zurückgegeben wurde. Ein Brief von 1975, adressiert „An Chiyo“.']),
          l('ex_haruka', '「{明日|あした}の{夕方|ゆうがた}、図書館の前で待っています。来てくれたら、それが{答え|こたえ}です」……でも、{封|ふう}は開いていない。', ['“Tomorrow evening, I’ll wait in front of the library. If you come, that will be your answer.” …But it was never opened.', '„Morgen Abend warte ich vor der Bibliothek. Wenn du kommst, ist das deine Antwort.“ … Aber er wurde nie geöffnet.']),
          l('ex_haruka', '{返却|へんきゃく}の{直前|ちょくぜん|v:n2_1187}まで、だれも気づかなかった。{そのころ||v:n2_1072}{以降|いこう|v:n2_0185}、この本を借りた人は、五十人もいるのに。', ['Nobody noticed until just before it was returned. Even though fifty people borrowed this book since then.', 'Niemand hat es bis kurz vor der Rückgabe bemerkt. Obwohl seitdem fünfzig Leute dieses Buch ausgeliehen haben.']),
        ],
        teach: ['v:n2_0192', 'v:n2_1187', 'v:n2_1072', 'v:n2_0185'],
      },
      {
        at: 'exk_library',
        goal: ['Search the library records with Haruka', 'Durchsuche mit Haruka die Bibliotheksakten'],
        lines: [
          l('ex_haruka', '一九七五年の{貸し出し|かしだし}カード。……あった。{箇所|かしょ|v:n2_0396}は少し{破|やぶ}れてるけど、「千代」の{括弧|かっこ|v:n2_0417}の中に、{名前|なまえ}が読めます。', ['The lending card from 1975. …Here. It’s a little torn in places, but in the brackets after “Chiyo” you can read a full name.', 'Die Ausleihkarte von 1975. … Hier. An einigen Stellen ist sie etwas zerrissen, aber in der Klammer hinter „Chiyo“ kann man einen Namen lesen.']),
          l('ex_haruka', '{知り合い|しりあい|v:n2_0912}の{親類|しんるい|v:n2_0933}をたどったら……その人は、{今|いま}、この大学の近くの{団地|だんち}に住んでいるそうです。', ['When I traced the relatives of an acquaintance… it seems she now lives in a housing estate near this university.', 'Als ich den Verwandten einer Bekannten nachging … lebt sie offenbar heute in einer Wohnsiedlung nahe der Uni.'], 'surprised'),
          l('ex_haruka', '{ことによると||v:n3_1289}、この手紙を書いた人も、まだ……。{違いない|ちがいない|v:n3_1458}、会いに行きましょう！', ['Perhaps the person who wrote this letter is still… No doubt about it — let’s go and see her!', 'Vielleicht ist der Mensch, der diesen Brief geschrieben hat, auch noch … Ganz bestimmt — lass uns zu ihr gehen!'], 'happy'),
        ],
        teach: ['v:n2_0396', 'v:n2_0417', 'v:n2_0912', 'v:n2_0933', 'v:n3_1289', 'v:n3_1458'],
      },
      {
        at: 'ex_haruka',
        goal: ['Hear what happened when Haruka delivered the letter', 'Hör, was geschah, als Haruka den Brief überbrachte'],
        music: 'memory',
        lines: [
          l('ex_haruka', '千代さんは、八十歳でした。手紙を読んで、長い間、{黙って|だまって}いて……それから、笑ったんです。', ['Chiyo was eighty. She read the letter, stayed silent for a long while… and then she laughed.', 'Chiyo war achtzig. Sie las den Brief, schwieg lange … und dann lachte sie.']),
          l('ex_haruka', '「この人ね、わたしの夫よ。手紙はなくても、{翌|よく|v:n2_1841}年、{結局|けっきょく}、{告白|こくはく}されたの。{遅れ|おくれ|v:n3_1230}た答えね」', ['“This man is my husband. Even without the letter, he finally confessed to me the following year. A late answer, wasn’t it.”', '„Dieser Mann ist mein Ehemann. Auch ohne den Brief hat er mir im Jahr darauf doch noch seine Liebe gestanden. Eine verspätete Antwort, nicht wahr.“']),
          l('ex_haruka', '{失恋|しつれん|v:n2_0792}の手紙だと思ってたのに。……五十年、{中年|ちゅうねん|v:n2_1171}も、{老後|ろうご}も、二人は一緒だったんですね。', ['I thought it was a letter of lost love. …For fifty years, through middle age and old age, they were together.', 'Ich dachte, es sei ein Brief über unerwiderte Liebe. … Fünfzig Jahre, im mittleren Alter und im Alter, waren die beiden zusammen.'], 'happy'),
        ],
        teach: ['v:n2_1841', 'v:n3_1230', 'v:n2_0792', 'v:n2_1171'],
      },
    ],
  },
  // ------------------------------------------------------------------ Kikue: the dormitory mother
  {
    id: 'ep_ex_kikue',
    chapter: 5,
    after: 'mq21',
    who: 'ex_kikue',
    title: ['寮母さんの台所', 'The Dorm Mother’s Kitchen', 'Die Küche der Wohnheimmutter'],
    summary: [
      'For fifty years Kikue has cooked for thousands of students. Now the old dormitory is to be torn down.',
      'Fünfzig Jahre lang hat Kikue für Tausende von Studierenden gekocht. Jetzt soll das alte Wohnheim abgerissen werden.',
    ],
    scenes: [
      {
        at: 'exk_dorm',
        goal: ['Visit the student dormitory', 'Besuche das Studentenwohnheim'],
        lines: [
          nar('{寮|りょう}の{台所|だいどころ}。{炊いた|たいた|v:n3_1391}ご飯の湯気と、野菜を{炒める|いためる|v:n3_1220}音。{大|おお}きな{鍋|なべ}で、{蕎麦|そば|v:n3_1337}と{うどん||v:n2_0228}が{茹|ゆ}でられている。', ['The dormitory kitchen. Steam from cooked rice and the sound of vegetables being stir-fried. Soba and udon boil in big pots.', 'Die Küche des Wohnheims. Dampf von gekochtem Reis und das Brutzeln von Gemüse in der Pfanne. In großen Töpfen kochen Soba und Udon.']),
          l('ex_kikue', '{昼食|ちゅうしょく|v:n3_1479}は百人分。{酢|す|v:n2_0936}の物と、{煎った|いった|v:n2_0207}ごまのおひたし。若い子は、ちゃんと食べなあかん。', ['Lunch for a hundred. Vinegared vegetables and spinach with roasted sesame. Young people have to eat properly.', 'Mittagessen für hundert. Essiggemüse und Spinat mit gerösteten Sesamkörnern. Junge Leute müssen ordentlich essen.'], 'happy'),
          l('ex_kikue', 'あら、{焦げ|こげ|v:n2_0654}ちゃった。……五十年やっても、{失敗|しっぱい}するのよ。ほら、{湯飲|ゆのみ|v:n2_1825}にお{茶|ちゃ|v:n3_1469}どうぞ。', ['Oops, it got burned. …Even after fifty years I still make mistakes. Here, have some tea in a cup.', 'Huch, angebrannt. … Selbst nach fünfzig Jahren passieren mir Fehler. Hier, eine Tasse Tee für dich.']),
        ],
        teach: ['v:n3_1391', 'v:n3_1220', 'v:n3_1337', 'v:n2_0228', 'v:n3_1479', 'v:n2_0936', 'v:n2_0207', 'v:n2_0654', 'v:n2_1825', 'v:n3_1469'],
      },
      {
        at: 'ex_kikue',
        goal: ['Talk to Kikue about the demolition', 'Sprich mit Kikue über den Abriss'],
        lines: [
          l('ex_kikue', 'この{地区|ちく|v:n3_1461}は、新しい{団地|だんち|v:n2_1143}になるんやって。{長期|ちょうき|v:n3_1483}の計画らしいわ。', ['They say this district is going to become a new housing estate. A long-term plan, apparently.', 'Dieses Viertel soll eine neue Wohnsiedlung werden, heißt es. Ein langfristiger Plan, wohl.'], 'worried'),
          l('ex_kikue', '毎朝、{シーツ||v:n2_0746}を{干|ほ}して、{スリッパ||v:n2_0984}を{並|なら}べて、{ソファー||v:n3_1338}で{寝|ね}てる子に{毛布|もうふ}をかけて……。', ['Every morning I hang out the sheets, line up the slippers, put a blanket over the kids asleep on the sofa…', 'Jeden Morgen hänge ich die Laken auf, stelle die Hausschuhe in eine Reihe, decke die Kinder zu, die auf dem Sofa schlafen …']),
          l('ex_kikue', '{片付け|かたづけ|v:n3_1242}を始めたら、五十年分の{思い出|おもいで}が出てきてね。……手が、止まっちゃうのよ。', ['When I started tidying up, fifty years of memories came out. …My hands just stop.', 'Als ich mit dem Aufräumen anfing, kamen fünfzig Jahre Erinnerungen zum Vorschein. … Meine Hände halten einfach inne.'], 'worried'),
        ],
        teach: ['v:n3_1461', 'v:n2_1143', 'v:n3_1483', 'v:n2_0746', 'v:n2_0984', 'v:n3_1338', 'v:n3_1242'],
      },
      {
        at: 'ex_kikue',
        goal: ['Come to the dormitory’s farewell party', 'Komm zum Abschiedsfest des Wohnheims'],
        music: 'memory',
        evening: true,
        lines: [
          nar('最後の夜。全国から、昔の{寮生|りょうせい}たちが集まった。会社の{社長|しゃちょう}も、学校の先生も、みんな「菊江さん！」と{呼|よ}ぶ。', ['The last night. Former residents have gathered from all over the country. Company presidents and schoolteachers alike call out, “Kikue!”', 'Die letzte Nacht. Ehemalige Bewohner sind aus dem ganzen Land gekommen. Firmenchefs wie Lehrer rufen: „Kikue!“']),
          l('ex_kikue', 'まあ、みんな、{おかげさまで||v:n2_0282}立派になって……。{めでたい||v:n2_1756}ことやわ。', ['My, thanks to all of you, everyone has turned out so well… What a happy occasion.', 'Na so was, ihr seid alle so tüchtige Leute geworden … Was für ein freudiger Anlass.'], 'happy'),
          l('ex_kikue', '建物はなくなっても、ここで食べたご飯は、みんなの体の中に残ってる。……それで、ええのよね。', ['Even if the building is gone, the meals they ate here remain inside all of them. …That’s good enough, isn’t it.', 'Auch wenn das Gebäude verschwindet, das Essen, das sie hier gegessen haben, bleibt in ihnen allen. … Das ist genug, nicht wahr.'], 'happy'),
        ],
        teach: ['v:n2_0282', 'v:n2_1756'],
      },
    ],
  },
  // ------------------------------------------------------------------ Yui: the student who speaks with a brush
  {
    id: 'ep_ex_yui',
    chapter: 5,
    after: 'mq21',
    who: 'ex_yui',
    title: ['筆の声', 'The Voice of the Brush', 'Die Stimme des Pinsels'],
    summary: [
      'After a shock, Yui lost her voice. Now she speaks only with her calligraphy brush. The club’s contest is approaching.',
      'Nach einem Schock hat Yui ihre Stimme verloren. Jetzt spricht sie nur noch mit ihrem Kalligrafiepinsel. Der Wettbewerb des Clubs naht.',
    ],
    scenes: [
      {
        at: 'ex_yui',
        goal: ['Visit Yui in the calligraphy club', 'Besuche Yui im Kalligrafie-Club'],
        lines: [
          nar('{結衣|ゆい}さんは{黙った|だまった|v:n3_1433}まま、半紙に一字書いた。「{声|こえ}」。……その字は、{震|ふる}えていた。', ['Yui, silent, writes a single character on the paper: “voice”. …The character trembles.', 'Yui schreibt schweigend ein einzelnes Zeichen aufs Papier: „Stimme“. … Das Zeichen zittert.']),
          nar('部員が{教|おし}えてくれた。「一年前の事故で、ショックで声が出なくなったの。それから、{引っ込んで|ひっこんで|v:n2_1501}ばかりで……」', ['A club member explains: “A year ago, after an accident, the shock took her voice. Since then she’s withdrawn into herself…”', 'Ein Clubmitglied erzählt: „Vor einem Jahr hat sie nach einem Unfall vor Schreck ihre Stimme verloren. Seitdem zieht sie sich nur noch zurück …“']),
          nar('「来月、{コンテスト||v:n3_1290}があるの。結衣は、うちのチームの{代表|だいひょう|v:n3_1374}。でも、本人は出たくないって」', ['“Next month there’s a contest. Yui represents our team. But she says she doesn’t want to take part.”', '„Nächsten Monat ist ein Wettbewerb. Yui vertritt unser Team. Aber sie selbst will nicht teilnehmen.“']),
        ],
        teach: ['v:n3_1433', 'v:n2_1501', 'v:n3_1290', 'v:n3_1374'],
      },
      {
        at: 'ex_yui',
        goal: ['Talk with Yui through her brush', 'Unterhalte dich mit Yui über ihren Pinsel'],
        lines: [
          nar('結衣さんの紙：「わたしの字は、{単純|たんじゅん|v:n3_1443}すぎる。みんなを{驚かす|おどろかす|v:n2_0309}ような字は、書けない」', ['Yui’s paper: “My characters are too simple. I can’t write anything that would amaze people.”', 'Yuis Blatt: „Meine Schriftzeichen sind zu einfach. Ich kann nichts schreiben, das die Leute staunen lässt.“']),
          ask(
            ['結衣さんの字は、まっすぐで好きです', ['I love your writing — it’s honest', 'Ich mag deine Schrift — sie ist aufrichtig'], [
              nar('結衣さんの紙：「まっすぐ……？」', ['Yui’s paper: “Honest…?”', 'Yuis Blatt: „Aufrichtig …?“']),
            ]],
            ['声の代わりに、字で話せばいい', ['Let your writing speak instead of your voice', 'Lass deine Schrift statt deiner Stimme sprechen'], [
              nar('結衣さんの紙：「字で、話す……」', ['Yui’s paper: “Speak with writing…”', 'Yuis Blatt: „Mit der Schrift sprechen …“']),
            ]],
          ),
          nar('結衣さんの紙：「{純粋|じゅんすい|v:n2_0862}な線なら、書ける。{水平|すいへい|v:n2_0947}な一本の線に、{全部|ぜんぶ}を{注ぐ|そそぐ|v:n3_1327}」', ['Yui’s paper: “A pure line — that I can write. I’ll pour everything into a single horizontal line.”', 'Yuis Blatt: „Eine reine Linie — die kann ich schreiben. Ich lege alles in eine einzige waagerechte Linie.“']),
          nar('結衣さんは、{個々|ここ|v:n3_1286}の線を、何百回も練習しはじめた。', ['Yui begins to practise each individual stroke hundreds of times.', 'Yui beginnt, jeden einzelnen Strich hunderte Male zu üben.']),
        ],
        teach: ['v:n3_1443', 'v:n2_0309', 'v:n2_0862', 'v:n2_0947', 'v:n3_1327', 'v:n3_1286'],
      },
      {
        at: 'ex_yui',
        goal: ['Be there at the calligraphy contest', 'Sei beim Kalligrafie-Wettbewerb dabei'],
        music: 'memory',
        lines: [
          nar('コンテストの{会場|かいじょう}。結衣さんは大きな紙に、一字だけ書いた。「{一|いち}」。まっすぐな、{一本|いっぽん}の線。', ['The contest venue. On a large sheet, Yui writes a single character: “one”. A single straight line.', 'Der Wettbewerbsort. Auf ein großes Blatt schreibt Yui ein einziges Zeichen: „eins“. Eine einzige gerade Linie.']),
          nar('会場が、しんと静まった。だれも、その線を{肯定|こうてい|v:n2_0634}も{否定|ひてい}もしない。ただ、見つめている。', ['The hall falls completely silent. Nobody praises the line or rejects it. They just gaze at it.', 'Der Saal wird ganz still. Niemand lobt die Linie oder lehnt sie ab. Alle sehen sie nur an.']),
          nar('その時、小さな、かすれた声がした。「……ありがとう」。一年ぶりの、結衣さんの声だった。', ['Then a small, hoarse voice is heard: “…Thank you.” It is Yui’s voice, for the first time in a year.', 'Da ist eine kleine, heisere Stimme zu hören: „… Danke.“ Es ist Yuis Stimme, zum ersten Mal seit einem Jahr.']),
        ],
        teach: ['v:n2_0634'],
      },
    ],
  },
];
