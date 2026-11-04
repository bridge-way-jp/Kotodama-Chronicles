import { l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 6: the people of the deer park and the old temple in Nara (content/expansion2.ts). */
export const EPISODES_EX10: Episode[] = [
  {
    id: 'ep_ex_kou', chapter: 6, after: 'mq23', who: 'nr_kou',
    title: ['鹿の子の名前', 'The Fawn’s Name', 'Der Name des Hirschkalbs'],
    summary: ['A deer keeper spends his nights with an injured fawn and forgets his own family.', 'Ein Hirschhüter verbringt seine Nächte mit einem verletzten Kalb und vergisst seine eigene Familie.'],
    scenes: [
      { at: 'nr_kou', goal: ['Talk to the deer keeper in the park', 'Sprich mit dem Hirschhüter im Park'],
        lines: [
          l('nr_kou', '{傷|きず}ついた{鹿|しか}の{子|こ}を、そっと{撫でる|なでる|v:n2_1349}。{比較的|ひかくてき|v:n2_1479}おとなしい{子|こ}だが、{怖|こわ}がると、{体|からだ}じゅうが{固|かた}まるんだ。', ['I gently stroke the injured fawn. It’s comparatively calm, but when scared, its whole body goes stiff.', 'Ich streichle das verletzte Kalb sanft. Es ist verhältnismäßig ruhig, aber wenn es Angst hat, wird sein ganzer Körper steif.']),
          l('nr_kou', '{毎晩|まいばん}、{公園|こうえん}を{巡る|めぐる|v:n2_1748}。{余計|よけい|v:n2_1843}なことは、{何|なに}も{考|かんが}えない。……{家|いえ}には、もう{何日|なんにち}も、{帰|かえ}っていない。', ['Every night I make the rounds of the park. I think of nothing extra. …I haven’t been home for days.', 'Jede Nacht gehe ich durch den Park. Ich denke an nichts Überflüssiges. … Ich war schon seit Tagen nicht zu Hause.'], 'worried'),
        ], teach: ['v:n2_1349', 'v:n2_1479', 'v:n2_1748', 'v:n2_1843'] },
      { at: 'exn_tea', goal: ['Meet Kou’s daughter at the tea house', 'Triff Kous Tochter im Teehaus'],
        lines: [
          nar('{茶屋|ちゃや}の{赤|あか}い{傘|かさ}の{下|した}で、{娘|むすめ}さんが、お{茶|ちゃ}を{持|も}って{待|ま}っていた。{父|ちち}が{来|く}ると、{何|なに}も{言|い}わずに、{湯呑|ゆのみ}を{差|さ}し{出|だ}した。', ['Under the red umbrella of the tea house his daughter was waiting with tea. When her father came, she held out a cup without a word.', 'Unter dem roten Schirm des Teehauses wartete seine Tochter mit Tee. Als ihr Vater kam, reichte sie ihm wortlos eine Tasse.']),
          l('nr_kou', '{娘|むすめ}の{狙い|ねらい|v:n2_1392}は、{分|わ}かっていた。「{引き止める|ひきとめる|v:n2_1486}ために、{来|き}たんじゃない」と、{目|め}が{言|い}っていた。ただ、{会|あ}いたかったんだ、と。', ['I understood my daughter’s aim. Her eyes said, “I didn’t come to hold you back.” She simply wanted to see me.', 'Ich verstand die Absicht meiner Tochter. Ihre Augen sagten: „Ich bin nicht gekommen, um dich zurückzuhalten.“ Sie wollte mich nur sehen.'], 'surprised'),
        ], teach: ['v:n2_1392', 'v:n2_1486'] },
      { at: 'nr_kou', goal: ['Hear what Kou named the fawn', 'Hör, wie Kou das Kalb nannte'], music: 'memory',
        lines: [
          l('nr_kou', '{鹿|しか}の{子|こ}の{名前|なまえ}は、{娘|むすめ}と{一緒|いっしょ}に、{決|き}めた。{二人|ふたり}の{間|あいだ}の{絆|きずな}が、{少|すこ}しずつ、{深まる|ふかまる|v:n2_1544}のを、{感|かん}じる。', ['I decided the fawn’s name together with my daughter. I can feel the bond between the two of us deepen little by little.', 'Den Namen des Hirschkalbs haben meine Tochter und ich gemeinsam festgelegt. Ich spüre, wie sich das Band zwischen uns nach und nach vertieft.'], 'happy'),
        ], teach: ['v:n2_1544'] },
    ],
  },
  {
    id: 'ep_ex_shinkai', chapter: 6, after: 'mq23', who: 'nr_shinkai',
    title: ['像の中の手紙', 'The Letter Inside the Statue', 'Der Brief in der Statue'],
    summary: ['While restoring a statue a monk finds a letter from three centuries ago.', 'Bei der Restaurierung einer Statue findet ein Mönch einen Brief aus drei Jahrhunderten Vergangenheit.'],
    scenes: [
      { at: 'nr_shinkai', goal: ['Talk to the monk at the museum', 'Sprich mit dem Mönch am Museum'],
        lines: [
          l('nr_shinkai', '{像|ぞう}を{分解|ぶんかい|v:n2_1597}して、{一|ひと}つひとつ、{部品|ぶひん}を{分類|ぶんるい|v:n2_1607}する。{標本|ひょうほん|v:n2_1530}のように、{番号|ばんごう}を{付|つ}けていく。', ['I take the statue apart and classify the parts one by one. I number them like specimens.', 'Ich zerlege die Statue und ordne die Teile einzeln ein. Wie Präparaten gebe ich ihnen Nummern.']),
          l('nr_shinkai', '{筆記|ひっき|v:n2_1497}の{記録|きろく}を、{全部|ぜんぶ}、{残|のこ}す。{筆者|ひっしゃ|v:n2_1502}の{名|な}のわからない{古典|こてん|v:n2_0670}のような、{一|ひと}つの{文字|もじ}も、{見逃|みのが}さない。', ['I keep a complete handwritten record. Not a single character is overlooked, like in a classic whose author’s name is unknown.', 'Ich bewahre eine vollständige handschriftliche Aufzeichnung auf. Kein einziges Zeichen entgeht mir, wie bei einem Klassiker, dessen Autor unbekannt ist.']),
        ], teach: ['v:n2_1597', 'v:n2_1607', 'v:n2_1530', 'v:n2_1497', 'v:n2_1502', 'v:n2_0670'] },
      { at: 'exn_museum', goal: ['See the letter that was found', 'Sieh den gefundenen Brief'],
        lines: [
          nar('{胸|むね}の{奥|おく}から、{細|ほそ}く{折|お}られた{紙|かみ}。{墨|すみ}の{字|じ}が、{百年|ひゃくねん}の{眠|ねむ}りから、{覚|さ}めた。「{皮肉|ひにく|v:n2_1514}なことに、この{世|よ}は、{願|ねが}う{人|ひと}ほど、{苦|くる}しむ」', ['From deep in the chest, a thinly folded paper. The ink characters awoke from a hundred years’ sleep: “Ironically, in this world those who wish most suffer most.”', 'Tief aus der Brust: ein dünn gefaltetes Papier. Die Tuschezeichen erwachten aus hundertjährigem Schlaf: „Ironischerweise leiden in dieser Welt gerade jene am meisten, die am meisten wünschen.“']),
        ], teach: ['v:n2_1514'] },
      { at: 'nr_shinkai', goal: ['Hear what the letter said', 'Hör, was im Brief stand'], music: 'memory',
        lines: [
          l('nr_shinkai', '{手紙|てがみ}の{最後|さいご}は、こうでした。「これを{読|よ}む{人|ひと}へ。どうか、{幸|しあわ}せに」。……{三百年|さんびゃくねん}{前|まえ}の{人|ひと}が、{私|わたし}の{幸|しあわ}せを、{願|ねが}っていたんです。', ['The letter ended like this: “To whoever reads this: please be happy.” …A person three hundred years ago had wished for my happiness.', 'Der Brief endete so: „An den, der dies liest: Sei bitte glücklich.“ … Ein Mensch vor dreihundert Jahren hatte sich mein Glück gewünscht.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_fude', chapter: 6, after: 'mq23', who: 'nr_fude',
    title: ['出来上がる筆', 'The Brush Takes Shape', 'Der Pinsel entsteht'],
    summary: ['A brush maker’s son prefers games, until he makes his first brush with his own hands.', 'Der Sohn einer Pinselmacherin mag lieber Spiele, bis er mit eigenen Händen seinen ersten Pinsel macht.'],
    scenes: [
      { at: 'nr_fude', goal: ['Talk to the brush maker', 'Sprich mit der Pinselmacherin'],
        lines: [
          l('nr_fude', '{初|はじ}めに、{毛|け}を{選|えら}ぶの。それから、{糊|のり|v:n2_1403}で{根元|ねもと}を{固|かた}めて、{熱|ねつ}で{溶かす|とかす|v:n2_1303}。{三日|みっか}で、やっと{出来上|できあ}がる。', ['First you choose the hair. Then you firm up the base with glue and melt it with heat. After three days it is finally done.', 'Zuerst wählt man die Haare. Dann festigt man den Ansatz mit Leim und schmilzt ihn mit Hitze. Nach drei Tagen ist er endlich fertig.']),
          l('nr_fude', '{弟子|でし|v:n2_1253}は、まだいません。{息子|むすこ}は、{画面|がめん}を{広げる|ひろげる|v:n2_1534}のが{好|す}きなだけ。{筆|ふで}には、{興味|きょうみ}がないんです。', ['I have no apprentice yet. My son only likes spreading things out on a screen. He has no interest in brushes.', 'Einen Lehrling habe ich noch nicht. Mein Sohn breitet nur gern etwas auf dem Bildschirm aus. An Pinseln hat er kein Interesse.'], 'worried'),
        ], teach: ['v:n2_1403', 'v:n2_1303', 'v:n2_1253', 'v:n2_1534'] },
      { at: 'exn_brush', goal: ['Watch the son try', 'Sieh dem Sohn beim Versuch zu'],
        lines: [
          nar('{青年|せいねん}が、{初|はじ}めて{作業台|さぎょうだい}に{座|すわ}った。{出来上がり|できあがり|v:n2_1245}の{筆|ふで}は、{不格好|ぶかっこう}。でも、{一本|いっぽん}、ちゃんと{墨|すみ}を{含|ふく}んだ。', ['The young man sat at the workbench for the first time. The finished brush was clumsy. But one brush properly held ink.', 'Der junge Mann setzte sich zum ersten Mal an die Werkbank. Der fertige Pinsel war unförmig. Aber einer nahm die Tusche richtig auf.']),
        ], teach: ['v:n2_1245'] },
      { at: 'nr_fude', goal: ['Hear what the son said', 'Hör, was der Sohn gesagt hat'], music: 'memory',
        lines: [
          l('nr_fude', '{息子|むすこ}が、{小|ちい}さな{声|こえ}で{言|い}いました。「{明日|あした}も、{作|つく}ってみたい」。……{三日|みっか}、{待|ま}った{甲斐|かい}が、ありました。', ['My son said in a small voice: “I want to try making one tomorrow, too.” …Waiting three days was worth it.', 'Mein Sohn sagte mit leiser Stimme: „Morgen möchte ich auch einen machen.“ … Das dreitägige Warten hat sich gelohnt.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_senbei', chapter: 6, after: 'mq23', who: 'nr_senbei',
    title: ['鹿が覚えている顔', 'The Face the Deer Remember', 'Das Gesicht, an das sich die Hirsche erinnern'],
    summary: ['The cracker seller is remembered by every deer — but not by his grandchildren, who come only on holidays.', 'Der Keksverkäufer wird von jedem Hirsch erkannt — aber nicht von seinen Enkeln, die nur an Feiertagen kommen.'],
    scenes: [
      { at: 'nr_senbei', goal: ['Buy crackers at the stand', 'Kauf am Stand Hirschkekse'],
        lines: [
          l('nr_senbei', '{一束|ひとたば}、{十枚|じゅうまい}で、{三百円|さんびゃくえん}。{枚数|まいすう|v:n2_1665}が{足|た}りなければ、{追加|ついか|v:n2_1196}で、もう{一束|ひとたば}。{取り消す|とりけす|v:n2_1329}ことは、できないよ。', ['One bundle, ten sheets, three hundred yen. If the number of sheets isn’t enough, an extra bundle. No cancelling, though.', 'Ein Bündel, zehn Stück, dreihundert Yen. Reicht die Stückzahl nicht, gibt es ein weiteres Bündel dazu. Stornieren geht allerdings nicht.']),
          l('nr_senbei', '{割|わり}と、{皆|みな}さん、{買|か}いすぎるんだ。{鹿|しか}は、{割合|わりあい|v:n2_1901}、すぐに{満腹|まんぷく}になるのにね。', ['Oddly, people buy too many. Even though the deer get full comparatively quickly.', 'Merkwürdigerweise kaufen die Leute zu viel. Dabei sind die Hirsche verhältnismäßig schnell satt.']),
        ], teach: ['v:n2_1665', 'v:n2_1196', 'v:n2_1329', 'v:n2_1901'] },
      { at: 'exn_cracker', goal: ['Visit on a holiday', 'Besuche den Stand an einem Feiertag'],
        lines: [
          nar('{連休|れんきゅう}の{日|ひ}。{孫|まご}が{二人|ふたり}、{初|はじ}めて{屋台|やたい}に{来|き}た。{鹿|しか}たちは、{一斉|いっせい}に、おじいさんの{周|まわ}りに{集|あつ}まった。{孫|まご}は、{目|め}を{丸|まる}くした。', ['A holiday weekend. Two grandchildren came to the stall for the first time. The deer all gathered at once around their grandfather. The grandchildren’s eyes went round.', 'Ein langes Wochenende. Zwei Enkel kamen zum ersten Mal an den Stand. Die Hirsche versammelten sich alle auf einmal um ihren Großvater. Den Enkeln wurden die Augen rund.']),
          l('nr_senbei', '「じいちゃん、すごい！」。……{鹿|しか}に、{覚|おぼ}えられているのが、こんなに{誇|ほこ}らしいとは、{思|おも}わなかった。', ['“Grandpa, you’re amazing!” …I never thought being remembered by deer could make me this proud.', '„Opa, du bist toll!“ … Ich hätte nie gedacht, dass es mich so stolz macht, von Hirschen erkannt zu werden.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_emi', chapter: 6, after: 'mq23', who: 'nr_emi',
    title: ['毎日の同じ説明', 'The Same Explanation Every Day', 'Jeden Tag dieselbe Erklärung'],
    summary: ['A museum guide who explains the same statues every day longs to speak about her own hometown.', 'Eine Museumsführerin, die jeden Tag dieselben Statuen erklärt, sehnt sich danach, von ihrer Heimat zu erzählen.'],
    scenes: [
      { at: 'nr_emi', goal: ['Join Emi’s guided tour', 'Nimm an Emis Führung teil'],
        lines: [
          l('nr_emi', 'この{概論|がいろん|v:n2_0361}は、もう{五百回|ごひゃっかい}は、{話|はな}しました。{学術|がくじゅつ|v:n2_0373}の{用語|ようご}を、やさしい{言葉|ことば}に、{直|なお}すのが、{私|わたし}の{仕事|しごと}です。', ['I’ve given this introduction at least five hundred times. My job is to turn scholarly terms into easy words.', 'Diese Einführung habe ich schon mindestens fünfhundertmal gehalten. Meine Arbeit ist, wissenschaftliche Begriffe in einfache Worte zu übersetzen.']),
          l('nr_emi', '{名作|めいさく|v:n2_1739}の{仏像|ぶつぞう}の{前|まえ}では、{無数|むすう|v:n2_1734}の{人|ひと}が、{同|おな}じ{写真|しゃしん}を{撮|と}ります。……その{人|ひと}たちの、{顔|かお}は、{覚|おぼ}えていません。', ['In front of the masterpiece Buddha statue, countless people take the same photo. …I don’t remember those people’s faces.', 'Vor der Buddhastatue, einem Meisterwerk, machen unzählige Menschen dasselbe Foto. … An ihre Gesichter erinnere ich mich nicht.'], 'worried'),
        ], teach: ['v:n2_0361', 'v:n2_0373', 'v:n2_1739', 'v:n2_1734'] },
      { at: 'exn_museum', goal: ['Hear Emi talk about her hometown', 'Hör Emi von ihrer Heimat sprechen'],
        lines: [
          nar('{閉館|へいかん}の{後|あと}、{学会|がっかい|v:n2_0413}の{資料|しりょう}を{整理|せいり}していた{エミ|えみ}さんが、ふと、{窓|まど}の{外|そと}を{見|み}た。{夕焼|ゆうや}けが、{ふるさと|ふるさと}の{海|うみ}の{色|いろ}だった。', ['After closing, Emi, sorting out materials from an academic conference, suddenly looked out the window. The sunset was the colour of her hometown sea.', 'Nach Schließung sortierte Emi Unterlagen einer Fachtagung, als sie plötzlich aus dem Fenster sah. Der Sonnenuntergang hatte die Farbe des Meeres ihrer Heimat.']),
          l('nr_emi', '{無限|むげん|v:n2_1730}に{続|つづ}く{波|なみ}の{音|おと}を、{思|おも}い{出|だ}しました。……{論ずる|ろんずる|v:n2_1893}より、{語|かた}りたい。{私|わたし}の{町|まち}の{話|はなし}を。', ['I recalled the sound of waves going on without limit. …Rather than discuss, I want to tell. The story of my town.', 'Ich erinnerte mich an das Rauschen der unendlich weiterziehenden Wellen. … Statt zu erörtern, möchte ich erzählen. Die Geschichte meiner Stadt.'], 'worried'),
        ], teach: ['v:n2_0413', 'v:n2_1730', 'v:n2_1893'] },
      { at: 'nr_emi', goal: ['Hear what happened at the next tour', 'Hör, was bei der nächsten Führung geschah'], music: 'memory',
        lines: [
          l('nr_emi', '{次|つぎ}の{ツアー|つあー}で、{私|わたし}は、{初|はじ}めて、{故郷|こきょう}の{話|はなし}を、{少|すこ}しだけ、{入|い}れました。{一人|ひとり}のおばあさんが、{涙|なみだ}を{拭|ふ}いて、うなずいてくれたんです。', ['On the next tour I included a little of my hometown for the first time. One old lady wiped away tears and nodded.', 'Bei der nächsten Tour habe ich zum ersten Mal ein wenig von meiner Heimat eingebaut. Eine alte Dame wischte sich Tränen ab und nickte.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_okami', chapter: 6, after: 'mq23', who: 'nr_okami',
    title: ['十二代目の決断', 'The Twelfth Generation’s Decision', 'Die Entscheidung der zwölften Generation'],
    summary: ['The inn’s proprietress must decide whether to close the inn her daughter wants to shut.', 'Die Wirtin muss entscheiden, ob sie das Gasthaus schließt, das ihre Tochter aufgeben will.'],
    scenes: [
      { at: 'nr_okami', goal: ['Talk to the proprietress of the inn', 'Sprich mit der Wirtin des Gasthauses'],
        lines: [
          l('nr_okami', '{宿|やど}の{朝|あさ}は、{平凡|へいぼん|v:n2_1613}です。{同|おな}じ{メニュー|めにゅー|v:n2_1757}、{同|おな}じ{布団|ふとん}、{同|おな}じ{挨拶|あいさつ}。でも、{十二代|じゅうにだい}、{続|つづ}いてきました。', ['Mornings at the inn are ordinary. The same menu, the same futons, the same greetings. But it has continued for twelve generations.', 'Die Morgen im Gasthaus sind gewöhnlich. Dieselbe Speisekarte, dieselben Futons, derselbe Gruß. Aber es besteht seit zwölf Generationen.']),
          l('nr_okami', '{娘|むすめ}は、{短期|たんき|v:n2_1136}で{赤字|あかじ}を{出|だ}すより、{閉|し}めたほうがいいと{言|い}います。{長短|ちょうたん|v:n2_1180}を、{考|かんが}えると、その{通|とお}りなんです。', ['My daughter says closing is better than running a short-term deficit. Weighing the pros and cons, she’s right.', 'Meine Tochter sagt, Schließen sei besser, als kurzfristig ins Minus zu geraten. Wägt man Vor- und Nachteile ab, hat sie recht.'], 'worried'),
        ], teach: ['v:n2_1613', 'v:n2_1757', 'v:n2_1136', 'v:n2_1180'] },
      { at: 'exn_inn', goal: ['See the inn on a busy night', 'Sieh das Gasthaus an einem vollen Abend'], evening: true,
        lines: [
          nar('{思|おも}いがけず、{団体|だんたい}の{客|きゃく}が、{玄関|げんかん}に{押|お}し{寄せ|よせ|v:n2_1846}た。{欲張り|よくばり|v:n2_1842}な{旅行会社|りょこうがいしゃ}が、{予約|よやく}を{重|かさ}ねてしまったのだ。{玄関|げんかん}の{ランプ|らんぷ}が、{揺|ゆ}れた。', ['Unexpectedly, a group of guests crowded the entrance. A greedy travel agency had double-booked. The lamp in the entrance swayed.', 'Unerwartet drängte sich eine Reisegruppe am Eingang. Ein gieriges Reisebüro hatte doppelt gebucht. Die Lampe im Eingang schwankte.']),
          l('nr_okami', '{普通|ふつう}なら、お{断|ことわ}りします。でも、{今夜|こんや}は、{例外|れいがい|v:n2_1878}です。{布団|ふとん}を、{廊下|ろうか}にも、{敷|し}きましょう。', ['Normally I’d refuse. But tonight is an exception. Let’s lay out futons in the corridor too.', 'Normalerweise würde ich ablehnen. Aber heute Nacht ist eine Ausnahme. Legen wir auch im Flur Futons aus.']),
        ], teach: ['v:n2_1842', 'v:n2_1846', 'v:n2_1878'] },
      { at: 'nr_okami', goal: ['Hear her decision', 'Hör ihre Entscheidung'], music: 'memory',
        lines: [
          l('nr_okami', '{夜中|よなか}、{廊下|ろうか}で{眠|ねむ}る{客|きゃく}の{寝顔|ねがお}を、{娘|むすめ}と{二人|ふたり}で、{見|み}ました。「{閉|し}めるのは、まだ、{早|はや}いかも」と、{娘|むすめ}が、{言|い}いました。', ['In the middle of the night my daughter and I looked at the sleeping faces of the guests in the corridor. “Maybe closing is still too early,” my daughter said.', 'Mitten in der Nacht sahen meine Tochter und ich die schlafenden Gesichter der Gäste im Flur an. „Vielleicht ist es zum Schließen noch zu früh“, sagte meine Tochter.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_daigo', chapter: 6, after: 'mq23', who: 'nr_daigo',
    title: ['作り話の灯籠', 'The Invented Lantern', 'Die erfundene Laterne'],
    summary: ['A bus driver invents ghost stories for tourists — until a child asks if they are true.', 'Ein Busfahrer erfindet Geistergeschichten für Touristen — bis ein Kind fragt, ob sie wahr sind.'],
    scenes: [
      { at: 'nr_daigo', goal: ['Join Daigo’s walking tour', 'Nimm an Daigos Rundgang teil'],
        lines: [
          l('nr_daigo', '「この{灯籠|とうろう}に、{夜|よる}、{女|おんな}の{人|ひと}が{立|た}つ。……と、{断定|だんてい|v:n2_1144}は、できませんがね」。{客|きゃく}は、{ぶつぶつ|ぶつぶつ|v:n2_1572}{言|い}いながら、{笑|わら}っている。', ['“At night a woman stands by this lantern. …Though I can’t assert it as fact, of course.” The guests chuckle, muttering to themselves.', '„An dieser Laterne steht nachts eine Frau. … Als Tatsache behaupten kann ich das natürlich nicht.“ Die Gäste lachen und murmeln vor sich hin.']),
          l('nr_daigo', '{ふざける|ふざける|v:n2_1561}つもりは、ないんですよ。ただ、{皆|みな}さんに、{楽|たの}しんで、もらいたいんです。{ばからしい|ばからしい|v:n2_1419}と、{笑|わら}われても。', ['I don’t mean to fool around. I just want everyone to enjoy themselves. Even if they laugh and say it’s absurd.', 'Ich will nicht herumalbern. Ich möchte nur, dass alle Spaß haben. Auch wenn sie lachen und es absurd nennen.']),
        ], teach: ['v:n2_1144', 'v:n2_1572', 'v:n2_1561', 'v:n2_1419'] },
      { at: 'exn_tea', goal: ['Hear the boy’s question', 'Hör die Frage des Jungen'],
        lines: [
          nar('{男|おとこ}の{子|こ}が、ガイドの{袖|そで}を{引|ひ}いた。「{本当|ほんとう}に、{幽霊|ゆうれい}は、いるの？」。{ダイゴ|だいご}さんは、{答|こた}えに、{詰|つ}まった。{質問|しつもん}が、{胸|むね}に、{突っ込む|つっこむ|v:n2_1211}ように、{刺|さ}さった。', ['A boy tugged the guide’s sleeve: “Are there really ghosts?” Daigo was lost for an answer. The question stabbed him in the chest, as if thrust in.', 'Ein Junge zupfte den Führer am Ärmel: „Gibt es wirklich Geister?“ Daigo wusste keine Antwort. Die Frage traf ihn mitten in die Brust, als würde sie hineingestoßen.']),
          l('nr_daigo', '「{嘘|うそ}だよ」と、{言|い}いたくなかった。……{誓う|ちかう|v:n2_1147}けど、{全部|ぜんぶ}、{私|わたし}の{空想|くうそう}なんだ。でも、それで、{君|きみ}の{心|こころ}が、{動|うご}いたなら。', ['I didn’t want to say, “It’s a lie.” …I swear it’s all my imagination. But if it moved your heart.', 'Ich wollte nicht sagen: „Das ist gelogen.“ … Ich schwöre, alles ist meine Fantasie. Aber wenn es dein Herz bewegt hat.'], 'worried'),
        ], teach: ['v:n2_1211', 'v:n2_1147'] },
      { at: 'nr_daigo', goal: ['See how the boy answered', 'Sieh, wie der Junge antwortete'], music: 'memory',
        lines: [
          l('nr_daigo', '{男|おとこ}の{子|こ}は、にっこり{笑|わら}って、{言|い}いました。「いいよ。{僕|ぼく}が、{大|おお}きくなったら、{新|あたら}しい{話|はなし}を、{作|つく}ってあげる」。……{弟子|でし}が{一人|ひとり}、できました。', ['The boy smiled and said, “That’s okay. When I grow up, I’ll make up new stories for you.” …I had gained an apprentice.', 'Der Junge lächelte und sagte: „Schon gut. Wenn ich groß bin, erfinde ich dir neue Geschichten.“ … Ich hatte einen Lehrling bekommen.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_tsubasa', chapter: 6, after: 'mq23', who: 'nr_tsubasa',
    title: ['シカの図鑑', 'The Deer Picture Book', 'Das Hirsch-Bilderbuch'],
    summary: ['A quiet boy draws every deer in the park, and a school teacher notices.', 'Ein stiller Junge zeichnet jeden Hirsch im Park, und eine Lehrerin wird aufmerksam.'],
    scenes: [
      { at: 'nr_tsubasa', goal: ['Meet Tsubasa in the park', 'Triff Tsubasa im Park'],
        lines: [
          l('nr_tsubasa', '{図鑑|ずかん|v:n2_0955}を、{自分|じぶん}で、{作|つく}ってるんだ。{全部|ぜんぶ}で、{百二十|ひゃくにじゅう}{頭|とう}。{名前|なまえ}と、{好|す}きな{食|た}べ{物|もの}も、{書|か}いてある。', ['I’m making a picture encyclopedia myself. A hundred and twenty deer in all. Their names and favourite foods are written down too.', 'Ich mache selbst ein Bilderlexikon. Insgesamt hundertzwanzig Hirsche. Ihre Namen und Lieblingsspeisen stehen auch drin.']),
          l('nr_tsubasa', '{理科|りか|v:n2_1862}の{先生|せんせい}は、{僕|ぼく}の{図鑑|ずかん}を、{見|み}て、{何|なに}も{言|い}わなかった。……つまらなかったのかな。', ['The science teacher looked at my picture book and said nothing. …Maybe it was boring.', 'Der Naturkundelehrer sah sich mein Bilderlexikon an und sagte nichts. … Vielleicht war es langweilig.'], 'worried'),
        ], teach: ['v:n2_0955', 'v:n2_1862'] },
      { at: 'nr_tsubasa', goal: ['Sit with Tsubasa in the sun', 'Setz dich mit Tsubasa in die Sonne'],
        lines: [
          nar('{日|ひ}が{照る|てる|v:n2_1265}{芝生|しばふ}で、{翼|つばさ}くんは、{チョーク|ちょーく|v:n2_1172}のような{太|ふと}い{鉛筆|えんぴつ}で、{大|おお}きな{鹿|しか}を{描|か}いた。{膨|ふく}らました{胸|むね}の{線|せん}が、{生|い}きている。{膨らます|ふくらます|v:n2_1553}と、{鹿|しか}は、{本当|ほんとう}に、{呼吸|こきゅう}した。', ['On the sunlit lawn, Tsubasa drew a big deer with a thick pencil like chalk. The line of its puffed chest is alive. As he swelled it, the deer really seemed to breathe.', 'Auf der sonnenbeschienenen Wiese zeichnete Tsubasa mit einem dicken Stift, der wie Kreide war, einen großen Hirsch. Die Linie seiner geblähten Brust lebt. Je mehr er ihn aufblähte, desto mehr schien der Hirsch wirklich zu atmen.']),
        ], teach: ['v:n2_1265', 'v:n2_1172', 'v:n2_1553'] },
      { at: 'nr_tsubasa', goal: ['Hear what the teacher did', 'Hör, was die Lehrerin getan hat'], music: 'memory',
        lines: [
          l('nr_tsubasa', '{先生|せんせい}が、{図鑑|ずかん}を、{町|まち}の{図書館|としょかん}に、{置|お}いてくれるって！{分数|ぶんすう|v:n2_1601}の{宿題|しゅくだい}より、ずっと、うれしい。', ['The teacher says she’ll put my picture book in the town library! It’s much nicer than a homework on fractions.', 'Die Lehrerin will mein Bilderlexikon in die Stadtbibliothek stellen! Das ist viel schöner als eine Bruch-Hausaufgabe.'], 'happy'),
        ], teach: ['v:n2_1601'] },
    ],
  },
  {
    id: 'ep_ex_lena', chapter: 6, after: 'mq23', who: 'nr_lena',
    title: ['一体の仏像のために', 'For a Single Statue', 'Wegen einer einzigen Statue'],
    summary: ['An exchange student came for one statue and stays for the people.', 'Eine Austauschstudentin kam wegen einer einzigen Statue und bleibt wegen der Menschen.'],
    scenes: [
      { at: 'nr_lena', goal: ['Talk to Lena at the museum', 'Sprich mit Lena am Museum'],
        lines: [
          l('nr_lena', '{学部|がくぶ|v:n2_0378}では、{美術|びじゅつ}を{学|まな}びました。{今|いま}は、{仏教|ぶっきょう}の{学科|がっか|v:n2_0412}にいるんです。{キャンパス|きゃんぱす|v:n2_0497}の{図書館|としょかん}には、この{像|ぞう}の{写真|しゃしん}が、{一枚|いちまい}だけ。', ['In my undergraduate faculty I studied art. Now I’m in the Buddhism department. In the campus library there’s just one photo of this statue.', 'In meinem Studiengang habe ich Kunst studiert. Jetzt bin ich im Fach Buddhismus. In der Bibliothek des Campus gibt es nur ein einziges Foto dieser Statue.']),
          l('nr_lena', '{休講|きゅうこう|v:n2_0499}になった{日|ひ}に、{一人|ひとり}で、{来|き}てみたんです。……それが、{全|すべ}ての{始|はじ}まりでした。', ['On a day when lectures were cancelled I came here alone. …That was the beginning of everything.', 'An einem Tag, an dem die Vorlesung ausfiel, bin ich allein hergekommen. … Das war der Anfang von allem.']),
        ], teach: ['v:n2_0378', 'v:n2_0412', 'v:n2_0497', 'v:n2_0499'] },
      { at: 'exn_museum', goal: ['See what Lena studies in the garden', 'Sieh, was Lena im Garten studiert'],
        lines: [
          nar('{庭|にわ}の{石|いし}の{仏|ほとけ}の{前|まえ}で、{レナ|れな}さんは、{中間|ちゅうかん|v:n2_1165}{試験|しけん}の{勉強|べんきょう}を、{忘|わす}れて、{見|み}とれていた。{町|まち}の{人|ひと}が、{お供|そな}えの{花|はな}を、{取|と}り{替|か}えに{来|き}た。', ['In front of the stone Buddha in the garden, Lena forgot her mid-term exam studies and gazed. A townsperson came to replace the offering flowers.', 'Vor dem steinernen Buddha im Garten vergaß Lena ihr Lernen für die Zwischenprüfung und schaute versunken. Ein Stadtbewohner kam, um die Opferblumen zu wechseln.']),
          l('nr_lena', '{単数|たんすう|v:n2_1142}の{像|ぞう}じゃなくて、{複数|ふくすう|v:n2_1551}の{人|ひと}の{祈|いの}りが、この{場所|ばしょ}を、{作|つく}っていたんです。', ['Not a single statue but the prayers of many people made this place.', 'Nicht eine einzelne Statue, sondern die Gebete vieler Menschen haben diesen Ort geschaffen.'], 'surprised'),
        ], teach: ['v:n2_1165', 'v:n2_1142', 'v:n2_1551'] },
      { at: 'nr_lena', goal: ['Hear what Lena decided', 'Hör, was Lena beschlossen hat'], music: 'memory',
        lines: [
          l('nr_lena', '{卒業論文|そつぎょうろんぶん}の{題|だい}を、{変|か}えました。「{一|ひと}つの{像|ぞう}と、{町|まち}の{人々|ひとびと}」。……{帰国|きこく}したあとも、{毎年|まいとし}、{奈良|なら}に{戻|もど}ってきます。', ['I changed my thesis title: “A Single Statue and the People of the Town.” …Even after I return home I’ll come back to Nara every year.', 'Ich habe den Titel meiner Abschlussarbeit geändert: „Eine einzelne Statue und die Menschen der Stadt.“ … Auch nach meiner Heimkehr komme ich jedes Jahr nach Nara zurück.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_taiko', chapter: 6, after: 'mq23', who: 'nr_taiko',
    title: ['夕方の鐘のわけ', 'Why the Evening Bell Rings', 'Warum die Abendglocke läutet'],
    summary: ['The old bell ringer does not know why the bell is rung. A roof tile holds the answer.', 'Der alte Glöckner weiß nicht, warum die Glocke geläutet wird. Ein Dachziegel birgt die Antwort.'],
    scenes: [
      { at: 'nr_taiko', goal: ['Climb the bell tower with the old man', 'Steig mit dem Alten auf den Glockenturm'],
        lines: [
          l('nr_taiko', '{煉瓦|れんが|v:n2_1885}の{土台|どだい}に、{瓦|かわら|v:n2_0450}の{屋根|やね}。{三百年|さんびゃくねん}、ここに{立|た}っておる。{冠|かんむり|v:n2_0472}のような{飾|かざ}りが、{夕日|ゆうひ}に{光|ひか}る。', ['A brick foundation and a tiled roof. It has stood here for three hundred years. The crown-like ornament shines in the setting sun.', 'Ein Backsteinfundament und ein Ziegeldach. Seit dreihundert Jahren steht es hier. Der kronenartige Schmuck glänzt in der Abendsonne.']),
          l('nr_taiko', '{鐘|かね}を{鳴|な}らす{前|まえ}に、{線香|せんこう}を{焚|た}く。{煙|けむり}が、{目|め}に{染|し}みて、{煙い|けむい|v:n2_0584}。でも、それが、わしの{毎日|まいにち}じゃ。', ['Before ringing the bell I burn incense. The smoke stings my eyes; it’s smoky. But that’s my daily life.', 'Bevor ich die Glocke läute, brenne ich Räucherstäbchen ab. Der Rauch brennt in den Augen; es ist qualmig. Aber das ist mein tägliches Leben.']),
        ], teach: ['v:n2_1885', 'v:n2_0450', 'v:n2_0472', 'v:n2_0584'] },
      { at: 'exn_hall', goal: ['Search for the reason in the main hall', 'Such in der Haupthalle nach dem Grund'],
        lines: [
          nar('{本堂|ほんどう}の{床|ゆか}に、{古|ふる}い{瓦|かわら}が{一|ひと}つ、{置|お}かれていた。{裏|うら}に、{彫|ほ}られた{字|じ}。「{夕|ゆうべ}の{鐘|かね}は、{旅人|たびびと}の{道|みち}しるべ。{日|ひ}の{暮|く}れに、{留まる|とどまる|v:n2_1320}{者|もの}のために」', ['On the floor of the main hall, an old roof tile had been placed. On its back, a carved inscription: “The evening bell is a guidepost for travellers: for those who stay at nightfall.”', 'Auf dem Boden der Haupthalle lag ein alter Dachziegel. Auf der Rückseite war eine Inschrift eingeritzt: „Die Abendglocke ist ein Wegweiser für Reisende: für jene, die bei Einbruch der Nacht Halt machen.“']),
          l('nr_taiko', '……なるほど。{道|みち}に{迷|まよ}った{者|もの}が、この{音|おと}を{頼|たよ}りに、ここに{留|とど}まれるように、と。……{退ける|どける|v:n2_1312}ことのできぬ、{大切|たいせつ}な{仕事|しごと}じゃったか。', ['…I see. So that those who lost their way could rely on this sound and stay here. …It was an important job that couldn’t be set aside.', '… Ich verstehe. Damit jene, die den Weg verloren hatten, sich auf diesen Klang verlassen und hier Halt machen können. … Es war eine wichtige Aufgabe, die man nicht beiseiteschieben durfte.'], 'surprised'),
        ], teach: ['v:n2_1320', 'v:n2_1312'] },
      { at: 'nr_taiko', goal: ['Hear the bell that evening', 'Hör die Glocke an diesem Abend'], music: 'memory', evening: true,
        lines: [
          l('nr_taiko', 'その{夜|よる}、{鐘|かね}を{鳴|な}らすと、{町|まち}の{人|ひと}たちが、{玄関|げんかん}に{出|で}て、{手|て}を{合|あ}わせておった。……{理由|りゆう}を{知|し}って{鳴|な}らす{音|おと}は、ひとあじ、{違|ちが}うのう。', ['That night when I rang the bell, the townspeople came out to their doorways and pressed their hands together. …A sound rung with the reason known is a little different.', 'In dieser Nacht, als ich die Glocke läutete, traten die Stadtbewohner vor ihre Haustüren und legten die Hände zusammen. … Ein Klang, den man mit Kenntnis des Grundes läutet, ist ein wenig anders.'], 'happy'),
        ], teach: [] },
    ],
  },
];
