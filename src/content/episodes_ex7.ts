import { l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 7: the people of the Tokyo bay area and the old lanes (content/expansion2.ts). */
export const EPISODES_EX7: Episode[] = [
  // ------------------------------------------------------------------ Mao: the founder who lost her partner
  {
    id: 'ep_ex_mao', chapter: 7, after: 'mq28', who: 'ex_mao',
    title: ['空いた隣の席', 'The Empty Seat Beside Her', 'Der leere Platz neben ihr'],
    summary: ['Mao’s start-up is thriving, but her best friend and co-founder has left. She cannot say what she feels.', 'Maos Start-up läuft gut, aber ihr bester Freund und Mitgründer ist gegangen. Sie kann nicht sagen, was sie fühlt.'],
    scenes: [
      { at: 'ex_mao', goal: ['Talk to Mao at the glass tower', 'Sprich mit Mao am Glasturm'],
        lines: [
          l('ex_mao', '{新興|しんこう|v:n3_2028}{企業|きぎょう}は、{毎日|まいにち}が{挑戦|ちょうせん|v:n3_2065}です。{データ|でーた|v:n3_2074}は{右肩上|みぎかたあ}がり。……でも、{ストレス|すとれす|v:n3_2033}で{眠|ねむ}れません。', ['A rising company means a challenge every day. The data goes up and up. …But I can’t sleep from stress.', 'Ein aufstrebendes Unternehmen bedeutet jeden Tag eine Herausforderung. Die Daten steigen und steigen. … Aber ich kann vor Stress nicht schlafen.'], 'worried'),
          l('ex_mao', '{上司|じょうし|v:n3_2021}はいません。{決|き}めるのは、{全部|ぜんぶ}{私|わたし}。{隣|となり}の{席|せき}の{彼|かれ}に、{何度|なんど}も{相談|そうだん}したのに。', ['I have no boss. I decide everything. And I used to consult the person in the next seat so many times.', 'Ich habe keinen Chef. Ich entscheide alles. Und ich habe mich so oft mit ihm am Nachbarplatz beraten.']),
        ], teach: ['v:n3_2028', 'v:n3_2065', 'v:n3_2074', 'v:n3_2033', 'v:n3_2021'] },
      { at: 'ext2_cowork', goal: ['Look at the office with Mao', 'Sieh dir mit Mao das Büro an'], evening: true,
        lines: [
          nar('{照明|しょうめい|v:n3_2023}を{落|お}としたフロア。{画面|がめん}には、{彼|かれ}が{最後|さいご}に{作|つく}ったデザインが{映|うつ}っている。', ['The floor with its lighting turned down. On the screen, the design he made last.', 'Der Stock mit gedimmter Beleuchtung. Auf dem Bildschirm das Design, das er zuletzt gemacht hat.']),
          l('ex_mao', '{デザイン|でざいん|v:n3_2075}の{視点|してん|v:n3_2011}が、{私|わたし}とは{全然|ぜんぜん}{違|ちが}った。{彼|かれ}は、{創造|そうぞう|v:n3_2055}する{人|ひと}。{私|わたし}は、{形|かたち}にする{人|ひと}。', ['His viewpoint on design was completely different from mine. He creates. I give it shape.', 'Sein Blickwinkel auf Design war ein völlig anderer als meiner. Er schafft. Ich gebe Gestalt.']),
        ], teach: ['v:n3_2023', 'v:n3_2075', 'v:n3_2011', 'v:n3_2055'] },
      { at: 'ex_mao', goal: ['Hear what Mao wrote to him', 'Hör, was Mao ihm geschrieben hat'], music: 'memory',
        lines: [
          l('ex_mao', '{メッセージ|めっせーじ|v:n3_2127}を{送|おく}りました。「{同志|どうし|v:n3_2084}だった{頃|ころ}を、{忘|わす}れません」と。{返事|へんじ}は、{三分|さんぷん}で{来|き}ました。', ['I sent a message: “I won’t forget when we were comrades.” The reply came within three minutes.', 'Ich habe eine Nachricht geschickt: „Ich vergesse nicht, als wir Gleichgesinnte waren.“ Die Antwort kam binnen drei Minuten.'], 'happy'),
          l('ex_mao', '{ほっと|ほっと|v:n3_2118}しました。{同士|どうし|v:n3_2083}は、{別々|べつべつ}の{道|みち}を{歩|ある}いても、{同士|どうし}のままなんですね。', ['I felt relieved. Comrades remain comrades even if they walk separate paths.', 'Ich war erleichtert. Gleichgesinnte bleiben Gleichgesinnte, auch wenn sie getrennte Wege gehen.'], 'happy'),
        ], teach: ['v:n3_2127', 'v:n3_2084', 'v:n3_2118', 'v:n3_2083'] },
    ],
  },
  // ------------------------------------------------------------------ Nakajima: the robot for his mother
  {
    id: 'ep_ex_nakajima', chapter: 7, after: 'mq28', who: 'ex_nakajima',
    title: ['母のためのロボット', 'A Robot for His Mother', 'Ein Roboter für seine Mutter'],
    summary: ['A robotics researcher builds a care robot — and realises he built it to avoid visiting his mother.', 'Ein Robotikforscher baut einen Pflegeroboter — und erkennt, dass er ihn baute, um seine Mutter nicht besuchen zu müssen.'],
    scenes: [
      { at: 'ex_nakajima', goal: ['Visit the research lab', 'Besuche das Forschungslabor'],
        lines: [
          l('ex_nakajima', 'この{ロボット|ろぼっと}の{仕様|しよう|v:n3_2018}は、{視覚|しかく|v:n3_2004}センサーと、{精巧|せいこう|v:n3_2036}な{手|て}です。{操縦|そうじゅう|v:n3_2054}は、{要|い}りません。{自分|じぶん}で{考|かんが}えます。', ['This robot’s specifications: visual sensors and a finely made hand. It needs no steering. It thinks for itself.', 'Die Spezifikation dieses Roboters: Sehsensoren und eine feine Hand. Er braucht keine Steuerung. Er denkt selbst.']),
          l('ex_nakajima', '{人|ひと}の{脳|のう|v:n3_2096}の{動|うご}きを、{まね|まね}ているんです。{磁気|じき|v:n3_2006}で{腕|うで}を{動|うご}かす。{進行|しんこう|v:n3_2027}は、{順調|じゅんちょう}です。', ['It imitates the workings of the human brain. It moves its arm with magnetism. Progress is going well.', 'Er ahmt die Arbeitsweise des menschlichen Gehirns nach. Mit Magnetismus bewegt er den Arm. Der Fortschritt läuft gut.']),
        ], teach: ['v:n3_2018', 'v:n3_2004', 'v:n3_2036', 'v:n3_2054', 'v:n3_2096', 'v:n3_2006', 'v:n3_2027'] },
      { at: 'ext2_lab', goal: ['Ask about the robot’s purpose', 'Frag nach dem Zweck des Roboters'],
        lines: [
          l('ex_nakajima', '{母|はは}の{介護|かいご}のために、{作|つく}りました。{治療|ちりょう|v:n3_2066}や{保護|ほご|v:n3_2115}は、{ロボット|ろぼっと}に{任|まか}せられる、と。', ['I made it for my mother’s care. Treatment and protection could be left to the robot, I thought.', 'Ich habe ihn für die Pflege meiner Mutter gebaut. Behandlung und Schutz könnte man dem Roboter überlassen, dachte ich.']),
          l('ex_nakajima', '……でも、{私|わたし}は、{母|はは}に{会|あ}いに{行|い}く{勇気|ゆうき}が、なかったんです。{指揮|しき|v:n3_2005}を{執|と}るのは、{得意|とくい}なのに。', ['…But I lacked the courage to go and see my mother. Though I’m good at giving orders.', '… Aber mir fehlte der Mut, meine Mutter zu besuchen. Dabei bin ich gut darin, Anweisungen zu geben.'], 'worried'),
        ], teach: ['v:n3_2066', 'v:n3_2115', 'v:n3_2005'] },
      { at: 'ex_nakajima', goal: ['Hear where Nakajima went', 'Hör, wohin Nakajima gegangen ist'], music: 'memory',
        lines: [
          l('ex_nakajima', '{先週|せんしゅう}、{実家|じっか}に{帰|かえ}りました。{伝言|でんごん|v:n3_2078}ノートに、{母|はは}の{字|じ}で「{待|ま}ってます」と、{三年分|さんねんぶん}。', ['Last week I went home. In the message notebook, in my mother’s handwriting, “I’m waiting” — three years’ worth.', 'Letzte Woche bin ich nach Hause gefahren. Im Notizbuch stand in der Schrift meiner Mutter „Ich warte“ — drei Jahre lang.'], 'surprised'),
          l('ex_nakajima', '{当然|とうぜん|v:n3_2085}、ロボットは、まだ{完成|かんせい}していません。でも、{母|はは}の{肩|かた}は、{私|わたし}が{自分|じぶん}で{揉|も}みました。{マッサージ|まっさーじ|v:n3_2124}は、{下手|へた}ですけどね。', ['Naturally, the robot isn’t finished yet. But I rubbed my mother’s shoulders myself. My massage is clumsy, though.', 'Natürlich ist der Roboter noch nicht fertig. Aber die Schultern meiner Mutter habe ich selbst massiert. Meine Massage ist allerdings ungeschickt.'], 'happy'),
        ], teach: ['v:n3_2078', 'v:n3_2085', 'v:n3_2124'] },
    ],
  },
  // ------------------------------------------------------------------ Hayato: the firefighter
  {
    id: 'ep_ex_hayato', chapter: 7, after: 'mq28', who: 'ex_hayato',
    title: ['救えなかった夜', 'The Night He Could Not Save', 'Die Nacht, in der er nicht retten konnte'],
    summary: ['After a fire in which one person died, Hayato cannot forgive himself.', 'Nach einem Brand, bei dem ein Mensch starb, kann sich Hayato nicht verzeihen.'],
    scenes: [
      { at: 'ex_hayato', goal: ['Talk to the firefighter', 'Sprich mit dem Feuerwehrmann'],
        lines: [
          l('ex_hayato', '{隊|たい|v:n3_2056}の{指揮|しき}で、{私|わたし}たちは{班|はん|v:n3_2104}に{分|わ}かれて{中|なか}に{入|はい}った。{煙|けむり}で、{何|なに}も{見|み}えなかった。', ['Under the unit’s command, we split into groups and went in. We couldn’t see anything for the smoke.', 'Unter dem Kommando der Einheit teilten wir uns in Gruppen und gingen hinein. Vor Rauch sah man nichts.'], 'worried'),
          l('ex_hayato', '{一人|ひとり}、{間|ま}に{合|あ}わなかった。{死|し|v:n3_2002}は、{何度|なんど}{経験|けいけん}しても、{慣|な}れない。{ショック|しょっく|v:n3_2026}は、ずっと{残|のこ}る。', ['One person didn’t make it. No matter how many times you experience death, you don’t get used to it. The shock stays for ever.', 'Ein Mensch kam zu spät. An den Tod gewöhnt man sich nicht, egal, wie oft man ihn erlebt. Der Schock bleibt für immer.']),
        ], teach: ['v:n3_2056', 'v:n3_2104', 'v:n3_2002', 'v:n3_2026'] },
      { at: 'ext2_fire', goal: ['Visit the fire station', 'Besuche die Feuerwache'],
        lines: [
          nar('{消防署|しょうぼうしょ}の{壁|かべ}に、{古|ふる}い{写真|しゃしん}と{碑|ひ|v:n3_2107}の{拓本|たくほん}。{殉職|じゅんしょく}した{隊員|たいいん}の{名|な}が、{並|なら}ぶ。', ['On the wall of the fire station, old photographs and a rubbing of a memorial stone. The names of fallen colleagues line up.', 'An der Wand der Feuerwache hängen alte Fotos und der Abrieb eines Gedenksteins. Die Namen im Dienst gestorbener Kollegen stehen in einer Reihe.']),
          l('ex_hayato', '{遺族|いぞく}への{補償|ほしょう|v:n3_2117}や、{保障|ほしょう|v:n3_2116}の{話|はなし}は、できる。……でも、{気持|きも}ちは、{誰|だれ}も{保障|ほしょう}できない。', ['Compensation and guarantees for the bereaved can be arranged. …But no one can guarantee their feelings.', 'Entschädigung und Garantien für die Hinterbliebenen lassen sich regeln. … Aber ihre Gefühle kann niemand garantieren.']),
        ], teach: ['v:n3_2107', 'v:n3_2117', 'v:n3_2116'] },
      { at: 'ex_hayato', goal: ['Hear about the family’s letter', 'Hör vom Brief der Familie'], music: 'memory',
        lines: [
          l('ex_hayato', '{亡|な}くなった{方|かた}の{娘|むすめ}さんから、{手紙|てがみ}が{来|き}ました。{良い|よい|v:n3_2132}{隊員|たいいん}の{皆|みな}さんへ、と。', ['A letter came from the deceased’s daughter. “To the good members of the unit,” it said.', 'Ein Brief kam von der Tochter des Verstorbenen. „An die guten Mitglieder der Einheit“, stand darauf.'], 'surprised'),
          l('ex_hayato', '「{父|ちち}は、{最後|さいご}に、あなたの{声|こえ}を{聞|き}いたそうです」。……{声|こえ}が、{届|とど}いていた。{私|わたし}は、{ほっと|ほっと}して、{泣|な}きました。', ['“My father is said to have heard your voice at the end.” …My voice had reached him. I was relieved, and I cried.', '„Mein Vater soll am Ende Ihre Stimme gehört haben.“ … Meine Stimme hatte ihn erreicht. Ich war erleichtert und weinte.'], 'happy'),
        ], teach: ['v:n3_2132'] },
    ],
  },
  // ------------------------------------------------------------------ Hana: old Tokyo
  {
    id: 'ep_ex_hana', chapter: 7, after: 'mq28', who: 'ex_hana',
    title: ['なくなった東京', 'The Tokyo That No Longer Exists', 'Das Tokio, das es nicht mehr gibt'],
    summary: ['Ninety-one-year-old Hana remembers a different Tokyo and leaves one last request.', 'Die einundneunzigjährige Hana erinnert sich an ein anderes Tokio und hinterlässt einen letzten Wunsch.'],
    scenes: [
      { at: 'ex_hana', goal: ['Listen to Hana’s stories', 'Hör Hanas Geschichten zu'],
        lines: [
          l('ex_hana', '{生涯|しょうがい|v:n3_2020}で、{一番|いちばん}{好|す}きだった{景色|けしき}は、{朝|あさ}の{露|つゆ|v:n3_2071}が{光|ひか}る{下町|したまち}の{道|みち}。', ['The sight I loved most in my whole life was the dew shining on the old-town roads in the morning.', 'Der Anblick, den ich in meinem ganzen Leben am meisten liebte, war der Tau auf den Straßen der Altstadt am Morgen.']),
          l('ex_hana', '{年鑑|ねんかん|v:n3_2095}を{見|み}ると、{昔|むかし}の{私|わたし}の{家|いえ}が{載|の}っとるのよ。{月日|つきひ}が{経つ|へつ|v:n3_2114}と、{町|まち}も{変|か}わるわねえ。', ['In the yearbook, my old house is listed. As the days and months pass, the town changes too.', 'Im Jahrbuch ist mein altes Haus verzeichnet. Wenn Monate und Jahre vergehen, verändert sich auch die Stadt.']),
        ], teach: ['v:n3_2020', 'v:n3_2071', 'v:n3_2095', 'v:n3_2114'] },
      { at: 'ext2_care', goal: ['Take a walk with Hana', 'Geh mit Hana spazieren'],
        lines: [
          nar('{車|くるま}いすで、{小|ちい}さな{路地|ろじ}を{進|すす}む。{ハナ|はな}さんが、{細|ほそ}い{指|ゆび}で{空|そら}を{指|さ}した。「あの{窓|まど}、{夕日|ゆうひ}に{映える|はえる|v:n3_2100}のよ」', ['In the wheelchair, you move down a little lane. Hana points to the sky with a thin finger. “That window gleams in the setting sun.”', 'Im Rollstuhl geht es durch eine kleine Gasse. Hana zeigt mit einem dünnen Finger zum Himmel. „Dieses Fenster glänzt in der Abendsonne.“']),
          l('ex_hana', '{福|ふく|v:n3_2112}は、{大|おお}きなものじゃなくて、こういう{小|ちい}さな{光|ひかり}の{中|なか}にあるの。{前もって|まえもって|v:n3_2119}、{教|おし}えておくわね。', ['Happiness isn’t something big; it’s in little lights like this. I’ll tell you in advance.', 'Glück ist nichts Großes, es liegt in kleinen Lichtern wie diesem. Das sage ich dir schon im Voraus.']),
        ], teach: ['v:n3_2100', 'v:n3_2112', 'v:n3_2119'] },
      { at: 'ex_hana', goal: ['Hear Hana’s last request', 'Hör Hanas letzten Wunsch'], music: 'memory',
        lines: [
          l('ex_hana', '{私|わたし}の{世|よ|v:n3_2131}の{終|お}わりに、お{願|ねが}いがあるの。あの{窓|まど}の{写真|しゃしん}を、{飾|かざ}って。{祈る|いのる|v:kf_inoru}ように。', ['At the end of my world I have a request. Put up a photo of that window. As if in prayer.', 'Am Ende meiner Welt habe ich eine Bitte. Hängt ein Foto dieses Fensters auf. Wie zum Gebet.'], 'happy'),
          l('ex_hana', '{孤独|こどく|v:tk_kodoku}は、{恐|こわ}くないの。だって、{覚|おぼ}えていてくれる{人|ひと}が、ここにいるから。', ['Loneliness doesn’t scare me. Because there are people here who remember.', 'Einsamkeit macht mir keine Angst. Denn hier sind Menschen, die sich erinnern.'], 'happy'),
        ], teach: ['v:n3_2131', 'v:kf_inoru', 'v:tk_kodoku'] },
    ],
  },
  // ------------------------------------------------------------------ Shimizu: the court clerk
  {
    id: 'ep_ex_shimizu', chapter: 7, after: 'mq28', who: 'ex_shimizu',
    title: ['書き残した一行', 'The Line He Left Unwritten', 'Die Zeile, die er nicht schrieb'],
    summary: ['A court clerk who has recorded thousands of verdicts regrets one word he wrote — or did not write.', 'Ein Gerichtsschreiber, der Tausende Urteile aufgezeichnet hat, bereut ein Wort, das er schrieb — oder nicht schrieb.'],
    scenes: [
      { at: 'ex_shimizu', goal: ['Talk to the court clerk', 'Sprich mit dem Gerichtsschreiber'],
        lines: [
          l('ex_shimizu', '{裁|さば}くことは、{裁判官|さいばんかん}の{仕事|しごと}です。{私|わたし}は、{姓名|せいめい|v:n3_2040}も{主張|しゅちょう}も、{一字|いちじ}も{変|か}えずに{記録|きろく}します。', ['Judging is the judge’s job. I record names and claims without changing a single character.', 'Urteilen ist die Aufgabe des Richters. Ich zeichne Namen und Behauptungen auf, ohne ein einziges Zeichen zu ändern.']),
          l('ex_shimizu', '{申告|しんこく|v:n3_2030}された{事実|じじつ}は、{全|すべ}て{同|おな}じ{重|おも}さです。……でも、{一人|ひとり}だけ、{忘|わす}れられない{被告|ひこく}がいます。', ['All facts reported weigh the same. …But there is one defendant I cannot forget.', 'Alle gemeldeten Tatsachen wiegen gleich schwer. … Aber einen Angeklagten kann ich nicht vergessen.']),
        ], teach: ['v:n3_2040', 'v:n3_2030'] },
      { at: 'ex_shimizu', goal: ['Ask about the defendant', 'Frag nach dem Angeklagten'],
        lines: [
          l('ex_shimizu', '{青年|せいねん}は、{真理|しんり|v:n3_2031}を{問|と}われて、「わかりません」と{答|こた}えた。{私|わたし}は、{書|か}かなかった。{声|こえ}が{震|ふる}えていたことを。', ['The young man, asked for the truth, answered “I don’t know”. I didn’t write down that his voice was trembling.', 'Der junge Mann, nach der Wahrheit gefragt, antwortete „Ich weiß es nicht“. Ich schrieb nicht auf, dass seine Stimme zitterte.'], 'worried'),
          l('ex_shimizu', '{版|はん|v:n3_2106}を{重|かさ}ねた{記録|きろく}には、{動揺|どうよう|v:n3_2086}も、{涙|なみだ}も{出|で}てこない。……それで、{良|よ}かったのか。', ['In the record, edition after edition, neither agitation nor tears appear. …Was that right?', 'In den Aufzeichnungen, Ausgabe um Ausgabe, tauchen weder Erregung noch Tränen auf. … War das richtig?']),
        ], teach: ['v:n3_2031', 'v:n3_2106', 'v:n3_2086'] },
      { at: 'ex_shimizu', goal: ['Hear what the clerk did', 'Hör, was der Gerichtsschreiber getan hat'], music: 'memory',
        lines: [
          l('ex_shimizu', '{先日|せんじつ}、その{青年|せいねん}が、{弁護士|べんごし}の{資格|しかく|v:n3_2003}を{取|と}って、{私|わたし}を{訪|たず}ねてきました。「あの{時|とき}、{私|わたし}の{声|こえ}を、{聞|き}いていてくれた」と。', ['The other day, that young man came to see me after getting his lawyer’s qualification. “At that time, you were listening to my voice.”', 'Neulich besuchte mich dieser junge Mann, nachdem er die Anwaltsqualifikation erworben hatte. „Damals haben Sie meiner Stimme zugehört.“'], 'surprised'),
          l('ex_shimizu', '{書|か}かなくても、{聞|き}いていた。……{それ|それ}が、{私|わたし}の{仕事|しごと}の、{本当|ほんとう}の{意味|いみ}だったのかもしれません。', ['Even without writing it down, I was listening. …Perhaps that was the real meaning of my work.', 'Auch ohne es aufzuschreiben, habe ich zugehört. … Vielleicht war das die eigentliche Bedeutung meiner Arbeit.'], 'happy'),
        ], teach: ['v:n3_2003'] },
    ],
  },
  // ------------------------------------------------------------------ Riku: free haircuts on Sundays
  {
    id: 'ep_ex_riku', chapter: 7, after: 'mq28', who: 'ex_riku',
    title: ['日曜日のはさみ', 'Scissors on Sundays', 'Die Schere am Sonntag'],
    summary: ['A hairdresser cuts hair for homeless people every Sunday — and receives an unexpected thank you.', 'Ein Friseur schneidet sonntags obdachlosen Menschen die Haare — und erhält ein unerwartetes Dankeschön.'],
    scenes: [
      { at: 'ex_riku', goal: ['Talk to Riku outside the salon', 'Sprich mit Riku vor dem Salon'],
        lines: [
          l('ex_riku', '{公園|こうえん}で、{見掛|みか}ける{人|ひと}は、{皆|みな}、{髪|かみ}が{伸|の}びてるんだ。{見掛ける|みかける|v:n3_2125}たびに、{声|こえ}をかけたくなる。', ['The people I see in the park all have overgrown hair. Every time I run into someone, I want to speak to them.', 'Die Leute, die ich im Park so sehe, haben alle lange Haare. Jedes Mal, wenn ich jemanden erblicke, möchte ich ihn ansprechen.']),
          l('ex_riku', '{デザート|でざーと|v:n3_2076}みたいに、{髪型|かみがた}も、ちょっとした{楽|たの}しみだと{思|おも}うんだ。{お金|かね}は、{取|と}らないよ。', ['Like dessert, I think a hairstyle is a little pleasure too. I don’t take any money.', 'Wie ein Dessert ist auch eine Frisur ein kleines Vergnügen, finde ich. Geld nehme ich keins.']),
        ], teach: ['v:n3_2125', 'v:n3_2076'] },
      { at: 'ext2_salon', goal: ['See Riku’s Sunday in the park', 'Erlebe Rikus Sonntag im Park'],
        lines: [
          nar('{公園|こうえん}のベンチ。{椅子|いす}の{前|まえ}に、{順番|じゅんばん}を{待|ま}つ{人|ひと}が{三人|さんにん}。{表示|ひょうじ|v:n3_2139}の{板|いた}には、{手書|てが}きで「{今日|きょう}は、{無料|むりょう}」と。', ['A bench in the park. Three people wait their turn in front of the chair. On the display board, in handwriting: “Free today.”', 'Eine Parkbank. Drei Leute warten vor dem Stuhl auf ihre Reihe. Auf dem Schild steht handgeschrieben: „Heute kostenlos.“']),
          l('ex_riku', '{ルール|るーる|v:n3_2137}は、{一|ひと}つだけ。{鏡|かがみ}を{見|み}て、{自分|じぶん}で「いいね」と{言|い}うこと。{ラベル|らべる|v:n3_2136}は、{貼|は}らないんだ。', ['There’s one rule: look in the mirror and say “nice” yourself. We don’t stick labels on people.', 'Es gibt nur eine Regel: in den Spiegel schauen und selbst „gut“ sagen. Etiketten kleben wir niemandem an.']),
        ], teach: ['v:n3_2139', 'v:n3_2137', 'v:n3_2136'] },
      { at: 'ex_riku', goal: ['Hear the surprise Riku received', 'Hör, welche Überraschung Riku erhielt'], music: 'memory',
        lines: [
          l('ex_riku', '{一人|ひとり}のおじさんが、{髪|かみ}を{切|き}った{翌週|よくしゅう}、{スーツ|すーつ}で{来|き}たんだ。{仕事|しごと}が、{決|き}まったって。', ['One man came the week after his haircut, in a suit. He’d gotten a job.', 'Ein Mann kam in der Woche nach dem Haareschneiden im Anzug. Er hatte eine Stelle bekommen.'], 'surprised'),
          l('ex_riku', '「{君|きみ}のはさみは、{世|よ}の{中|なか}に、{一|ひと}つの{福|ふく}を{足|た}したよ」って。……{優|やさ}しい{予想|よそう|v:n3_2133}は、{外|はず}れるのも、{悪|わる}くない。', ['“Your scissors added a little happiness to the world,” he said. …It’s not bad when a kind expectation turns out wrong.', '„Deine Schere hat der Welt ein Stück Glück hinzugefügt“, sagte er. … Es ist nicht schlecht, wenn sich eine freundliche Erwartung als falsch erweist.'], 'happy'),
        ], teach: ['v:n3_2133'] },
    ],
  },
  // ------------------------------------------------------------------ Isamu: two hundred parcels
  {
    id: 'ep_ex_isamu', chapter: 7, after: 'mq29', who: 'ex_isamu',
    title: ['自分あての荷物', 'A Parcel for Himself', 'Ein Paket für ihn selbst'],
    summary: ['A delivery driver brings two hundred parcels a day — and one day finds a parcel with his own name.', 'Ein Paketfahrer bringt zweihundert Pakete am Tag — und findet eines Tages ein Paket mit seinem eigenen Namen.'],
    scenes: [
      { at: 'ex_isamu', goal: ['Meet Isamu at the depot', 'Triff Isamu am Verteilzentrum'],
        lines: [
          l('ex_isamu', '{荷物|にもつ|v:kf_nimotsu}は、{今日|きょう}も{二百個|にひゃくこ}。{軽い|かるい|v:kf_karui}のも、{重|おも}いのもある。{精算|せいさん|v:n3_2037}は、{夜|よる}の{十時|じゅうじ}だ。', ['Two hundred parcels again today. Some light, some heavy. Settling up is at ten at night.', 'Auch heute zweihundert Pakete. Leichte und schwere. Abgerechnet wird um zehn Uhr abends.']),
          l('ex_isamu', '{正規|せいき|v:n3_2035}の{休|やす}みは、{週|しゅう}に{一日|いちにち}だけ。{ストレス|すとれす}より、{体|からだ}が{先|さき}に{限界|げんかい}なんだ。{終電|しゅうでん|v:tk_shuuden}にも、{間|ま}に{合|あ}わない。', ['My regular day off is just one a week. My body hits its limit before stress does. And I miss even the last train.', 'Mein regulärer freier Tag ist nur einer pro Woche. Mein Körper ist eher am Limit als vom Stress. Und ich verpasse sogar den letzten Zug.']),
        ], teach: ['v:kf_nimotsu', 'v:kf_karui', 'v:n3_2037', 'v:n3_2035', 'v:tk_shuuden'] },
      { at: 'ext2_depot', goal: ['Look at the depot with Isamu', 'Sieh dir mit Isamu das Verteilzentrum an'],
        lines: [
          nar('{配送|はいそう}センターは、{三|みっ}つの{棟|とう|v:n3_2081}に{分|わ}かれている。{票|ひょう|v:n3_2109}を{貼|は}った{箱|はこ}が、{ベルト|べると}の{上|うえ}を、ゆっくり{進|すす}む。', ['The depot is divided into three buildings. Boxes with labels stuck on them glide slowly along the belt.', 'Das Verteilzentrum ist in drei Gebäude aufgeteilt. Kartons mit aufgeklebten Zetteln gleiten langsam über das Band.']),
          l('ex_isamu', '{一|ひと}つの{荷物|にもつ}に、{一|ひと}つの{誰|だれ}かの{待|ま}つ{気持|きも}ちが{入|はい}ってる。……だから、{拾|ひろ}い{落|お}としは、しない。{拾う|ひろう|v:kf_hirou}のが、{俺|おれ}の{仕事|しごと}だ。', ['In every parcel is someone’s waiting heart. …So I never drop one. Picking them up is my job.', 'In jedem Paket steckt das Warten von jemandem. … Deshalb lasse ich keins fallen. Sie aufzuheben ist meine Arbeit.']),
        ], teach: ['v:n3_2081', 'v:n3_2109', 'v:kf_hirou'] },
      { at: 'ex_isamu', goal: ['Hear what arrived for Isamu', 'Hör, was für Isamu ankam'], music: 'memory',
        lines: [
          l('ex_isamu', '{今朝|けさ}、{初|はじ}めて、{俺|おれ}あての{荷物|にもつ}が{来|き}たんだ。{送|おく}り{主|ぬし}は、{北|きた}の{町|まち}の、おふくろ。{中|なか}は、{手編|てあ}みの{靴下|くつした}。', ['This morning, for the first time, a parcel came for me. Sender: my mum in the northern town. Inside, hand-knitted socks.', 'Heute Morgen kam zum ersten Mal ein Paket für mich. Absender: meine Mama in der nördlichen Stadt. Darin handgestrickte Socken.'], 'surprised'),
          l('ex_isamu', '「{友|とも}だちに{会|あ}ったら、ちゃんと{お礼|れい}を{言|い}いなさい」と、{メモ|めも}が。……{今日|きょう}の{荷物|にもつ}は、なぜか{二倍|にばい|v:kf_bai}、{軽|かる}かった。', ['“When you meet your friends, say thank you properly,” said the note. …Today’s parcels felt twice as light, somehow.', '„Wenn du Freunde triffst, bedanke dich ordentlich“, stand auf dem Zettel. … Die heutigen Pakete fühlten sich irgendwie doppelt so leicht an.'], 'happy'),
        ], teach: ['v:kf_bai'] },
    ],
  },
  // ------------------------------------------------------------------ Nikaidō: the keys
  {
    id: 'ep_ex_nikaidou', chapter: 7, after: 'mq29', who: 'ex_nikaidou',
    title: ['鍵は信用の印', 'A Key Is a Sign of Trust', 'Ein Schlüssel ist ein Zeichen des Vertrauens'],
    summary: ['An old estate agent rents flats to those nobody else will take. One day he is asked to take a risk himself.', 'Ein alter Makler vermietet Wohnungen an jene, die sonst niemand nimmt. Eines Tages soll er selbst ein Risiko eingehen.'],
    scenes: [
      { at: 'ex_nikaidou', goal: ['Talk to the estate agent', 'Sprich mit dem Makler'],
        lines: [
          l('ex_nikaidou', '{住|す}まいは、{人|ひと}の{一生|いっしょう}を{支|ささ}える。{保証人|ほしょうにん}がいない{人|ひと}にも、{私|わたし}は、{鍵|かぎ}を{貸|か}すんだ。', ['A home supports a person’s whole life. Even to those with no guarantor, I lend a key.', 'Eine Wohnung trägt das ganze Leben eines Menschen. Auch denen ohne Bürgen leihe ich einen Schlüssel.']),
          l('ex_nikaidou', '{住|じゅう}の{字|じ|v:n3_2015}は、「{人|にん}べん」に「{主|しゅ}」と{書|か}く。……{人|ひと}が{主|あるじ}になる{場所|ばしょ}、って{意味|いみ}だよ。', ['The character 住 is written with the “person” radical and 主. …It means a place where a person becomes master.', 'Das Zeichen 住 setzt sich aus dem Personenradikal und 主 zusammen. … Es bedeutet einen Ort, an dem ein Mensch Herr wird.']),
        ], teach: ['v:n3_2015'] },
      { at: 'ext2_estate', goal: ['See what happens at the estate office', 'Sieh, was im Maklerbüro geschieht'],
        lines: [
          nar('{事務所|じむしょ}に、{一組|ひとくみ}の{親子|おやこ}。{父親|ちちおや}が、{小|ちい}さな{声|こえ}で{言|い}った。「{会社|かいしゃ}が{倒産|とうさん|v:n3_2082}して、{行|い}くところが……」', ['At the office, a father and child. The father says in a small voice, “My company went bankrupt, and I have nowhere to go…”', 'Im Büro sind ein Vater und sein Kind. Der Vater sagt mit leiser Stimme: „Meine Firma ist pleitegegangen, und ich habe keinen Ort …“']),
          l('ex_nikaidou', '{断|ことわ}られるのは、{当然|とうぜん}、と{思|おも}っている{顔|かお}だ。……{私|わたし}は、{前|まえ}の{鍵|かぎ}を{出|だ}した。{枠|わく|v:n3_2138}は、{人|ひと}が{決|き}めたものにすぎない。', ['He wears the face of someone who thinks being refused is only natural. …I took out the key. The frame is only something people decided.', 'Er sieht aus wie jemand, der es für selbstverständlich hält, abgewiesen zu werden. … Ich holte den Schlüssel hervor. Der Rahmen ist nur etwas, das Menschen festgelegt haben.']),
        ], teach: ['v:n3_2082', 'v:n3_2138'] },
      { at: 'ex_nikaidou', goal: ['Hear how the family is doing', 'Hör, wie es der Familie geht'], music: 'memory',
        lines: [
          l('ex_nikaidou', '{三|さん}か{月|げつ}{後|ご}、その{父親|ちちおや}が、{初|はじ}めて{家賃|やちん}を{持|も}ってきたよ。{正規|せいき}の{仕事|しごと}を、{見|み}つけたそうだ。', ['Three months later that father brought the rent for the first time. He said he’d found a regular job.', 'Drei Monate später brachte dieser Vater zum ersten Mal die Miete. Er habe eine reguläre Arbeit gefunden, sagte er.'], 'happy'),
          l('ex_nikaidou', '{鍵|かぎ}は、{信用|しんよう}の{印|しるし}さ。……{返|かえ}ってきたのは、お{金|かね}より、もっと{大|おお}きなものだった。', ['A key is a sign of trust. …What came back was something bigger than money.', 'Ein Schlüssel ist ein Zeichen des Vertrauens. … Was zurückkam, war etwas Größeres als Geld.'], 'happy'),
        ], teach: [] },
    ],
  },
  // ------------------------------------------------------------------ Sophie: the new school
  {
    id: 'ep_ex_sophie', chapter: 7, after: 'mq29', who: 'ex_sophie',
    title: ['チャイムの鳴る場所', 'Where the Chime Rings', 'Wo die Glocke läutet'],
    summary: ['A French girl has changed schools and talks only with the caretaker. A little message changes the break time.', 'Ein französisches Mädchen hat die Schule gewechselt und spricht nur mit dem Hausmeister. Eine kleine Nachricht verändert die Pause.'],
    scenes: [
      { at: 'ex_sophie', goal: ['Talk to Sophie in the lane', 'Sprich mit Sophie in der Gasse'],
        lines: [
          l('ex_sophie', '{転校|てんこう|v:n3_2077}して、{三|さん}か{月|げつ}。{日本語|にほんご}が、まだよく{分|わ}からない。{チャイム|ちゃいむ|v:n3_2064}の{音|おと}が、{私|わたし}だけ、{違|ちが}って{聞|き}こえるの。', ['Three months since I changed schools. I still don’t understand Japanese well. The sound of the chime seems different to me alone.', 'Seit drei Monaten bin ich auf einer neuen Schule. Ich verstehe noch nicht gut Japanisch. Der Klang der Glocke klingt nur für mich anders.'], 'worried'),
          l('ex_sophie', '{用務員|ようむいん}さんは、{優|やさ}しいの。「{慣らす|ならす|v:n3_2091}には、{時間|じかん}が{要|い}るよ」って。……わたし、{馴|な}らされた{猫|ねこ}みたい？', ['The caretaker is kind. “It takes time to get used to it,” he says. …Am I like a tamed cat?', 'Der Hausmeister ist freundlich. „Man braucht Zeit, um sich einzugewöhnen“, sagt er. … Bin ich wie eine gezähmte Katze?']),
        ], teach: ['v:n3_2077', 'v:n3_2064', 'v:n3_2091'] },
      { at: 'ext2_nursery', goal: ['Walk Sophie to school', 'Begleite Sophie zur Schule'],
        lines: [
          nar('{学校|がっこう}の{帰|かえ}り{道|みち}。ソフィーさんは、{小|ちい}さな{紙|かみ}に、{日本語|にほんご}で{何|なに}か{書|か}いている。{書|か}いては、{消|け}し、{書|か}いては、{消|け}す。', ['On the way home from school, Sophie writes something in Japanese on a little piece of paper. She writes, erases, writes, erases.', 'Auf dem Heimweg schreibt Sophie etwas auf Japanisch auf einen kleinen Zettel. Sie schreibt, radiert, schreibt, radiert.']),
          l('ex_sophie', '{同|おな}じ{クラス|くらす}の{子|こ}に、{伝言|でんごん}を{書|か}いたの。「{一緒|いっしょ}に、{遊|あそ}ぼう」。……ちゃんと{読|よ}んでくれるかな。{退学|たいがく|v:n3_2057}したくなるほど、{怖|こわ}いの。', ['I wrote a message to a girl in my class: “Let’s play together.” …Will she really read it? I’m so scared I want to leave school.', 'Ich habe einem Mädchen aus meiner Klasse eine Nachricht geschrieben: „Lass uns zusammen spielen.“ … Ob sie sie wirklich liest? Ich habe solche Angst, dass ich von der Schule abgehen möchte.'], 'worried'),
        ], teach: ['v:n3_2057'] },
      { at: 'ex_sophie', goal: ['Hear what happened in the break', 'Hör, was in der Pause geschah'], music: 'memory',
        lines: [
          l('ex_sophie', '{休|やす}み{時間|じかん}に、{三人|さんにん}の{子|こ}が、{私|わたし}の{机|つくえ}に{来|き}たの！「{メッセージ|めっせーじ}、{読|よ}んだよ。{一緒|いっしょ}に、{行|い}こう」って。', ['At break time three children came to my desk! “We read your message. Let’s go together,” they said.', 'In der Pause kamen drei Kinder an meinen Tisch! „Wir haben deine Nachricht gelesen. Komm, wir gehen zusammen“, sagten sie.'], 'happy'),
          l('ex_sophie', '{用務員|ようむいん}さんに、{一番|いちばん}に{教|おし}えたの。「{弱|よわ|v:n3_2134}まった{気持|きも}ちが、{少|すこ}し{強|つよ|v:n3_2072}まったね」って、{笑|わら}ってくれた。', ['I told the caretaker first. “The feelings that had weakened have grown a bit stronger,” he said, smiling.', 'Ich habe es zuerst dem Hausmeister erzählt. „Die geschwächten Gefühle sind etwas stärker geworden“, sagte er lächelnd.'], 'happy'),
        ], teach: ['v:n3_2134', 'v:n3_2072'] },
    ],
  },
  // ------------------------------------------------------------------ Mai: the night nursery
  {
    id: 'ep_ex_mai', chapter: 7, after: 'mq29', who: 'ex_mai',
    title: ['夜の絵本', 'The Night Picture Book', 'Das Bilderbuch der Nacht'],
    summary: ['At the night nursery, a boy who never sees his parents asks Mai for a story with a happy ending.', 'In der Nachtkita bittet ein Junge, der seine Eltern nie sieht, Mai um eine Geschichte mit gutem Ende.'],
    scenes: [
      { at: 'ex_mai', goal: ['Visit the night nursery', 'Besuche die Nachtkita'], evening: true,
        lines: [
          l('ex_mai', '{夜|よる}の{保育園|ほいくえん}は、{親|おや}が{夜勤|やきん}の{子|こ}たちが{来|く}ます。{眠|ねむ}れない{子|こ}は、{絵本|えほん}を、{何冊|なんさつ}も{持|も}って{来|き}ます。', ['Children whose parents work nights come to the night nursery. Those who can’t sleep bring many picture books.', 'In die Nachtkita kommen Kinder, deren Eltern Nachtschicht haben. Kinder, die nicht schlafen können, bringen viele Bilderbücher mit.']),
          l('ex_mai', '{絵本|えほん}の{題|だい}は、{全部|ぜんぶ}、{違|ちが}う。でも、{読|よ}み{終|お}わるころには、みんな、{同|おな}じ{寝顔|ねがお}になります。{絆|きずな}を{深める|ふかめる|v:n3_2111}{時間|じかん}でもあります。', ['The titles of the picture books are all different. But by the time I finish reading, everyone has the same sleeping face.', 'Die Titel der Bilderbücher sind alle verschieden. Aber wenn ich fertig gelesen habe, haben alle dasselbe Schlafgesicht.']),
        ], teach: ['v:n3_2111'] },
      { at: 'ext2_nursery', goal: ['Listen to Mai reading a story', 'Hör zu, wie Mai eine Geschichte vorliest'], evening: true,
        lines: [
          nar('{男|おとこ}の{子|こ}が、{小|ちい}さな{声|こえ}で{言|い}った。「{黄色|きいろ|v:kf_kiiro}い{雲|くも|v:kf_kumo}の{話|はなし}を、{読|よ}んで」。{緑|みどり|v:kf_midori}の{表紙|ひょうし}の{本|ほん}だった。', ['A boy said in a small voice, “Read me the story of the yellow cloud.” It was a book with a green cover.', 'Ein Junge sagte mit leiser Stimme: „Lies mir die Geschichte von der gelben Wolke vor.“ Es war ein Buch mit grünem Einband.']),
          l('ex_mai', '{絵本|えほん}の{中|なか}の{雲|くも}は、{鼻|はな|v:kf_hana}を{鳴|な}らして、{空|そら}を{泳|およ}ぐの。……この{話|はなし}は、{子|こ}どもたちの{間|あいだ}で、{広まって|ひろまって|v:n3_2110}います。', ['The cloud in the book snorts and swims across the sky. …This story has spread among the children.', 'Die Wolke im Buch schnaubt und schwimmt über den Himmel. … Diese Geschichte hat sich unter den Kindern verbreitet.']),
        ], teach: ['v:kf_kiiro', 'v:kf_kumo', 'v:kf_midori', 'v:kf_hana', 'v:n3_2110'] },
      { at: 'ex_mai', goal: ['Hear how the story ended that night', 'Hör, wie die Geschichte in dieser Nacht endete'], music: 'memory', evening: true,
        lines: [
          l('ex_mai', '{雲|くも}は、{最後|さいご}に、{小|ちい}さな{花|はな}を{摘|つ}んで、{家|いえ}に{帰|かえ}るの。{摘む|つむ|v:n3_2070}、という{言葉|ことば}を、{男|おとこ}の{子|こ}は、{初|はじ}めて{知|し}ったんです。', ['At the end the cloud picks a small flower and goes home. The boy learned the word “pick” for the first time.', 'Am Ende pflückt die Wolke eine kleine Blume und geht nach Hause. Das Wort „pflücken“ lernte der Junge zum ersten Mal.'], 'happy'),
          l('ex_mai', '{朝|あさ}、お{母|かあ}さんが{迎|むか}えに{来|き}て、その{子|こ}は、{花|はな}の{絵|え}を{渡|わた}しました。……{親子|おやこ}の{笑顔|えがお}を{見|み}ると、{私|わたし}の{夜勤|やきん}も、{悪|わる}くないな、と{思|おも}います。', ['In the morning his mother came to fetch him, and he handed her a flower drawing. …Seeing parent and child smile, I think my night shifts aren’t so bad.', 'Am Morgen kam seine Mutter, um ihn abzuholen, und er überreichte ihr eine Blumenzeichnung. … Wenn ich Eltern und Kind lächeln sehe, denke ich, dass meine Nachtschichten gar nicht so schlecht sind.'], 'happy'),
        ], teach: ['v:n3_2070'] },
    ],
  },
];
