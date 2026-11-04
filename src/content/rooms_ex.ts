import { DE_STORY } from './de_story';
import type { DialogueRule } from '../core/script';

/** Words of the furniture and painted spots in the ten interiors of the expansion districts (tools/rooms2_spec.py). */
type R = [ja: string, en: string, de: string];

const TEXTS: Record<string, R> = {
  // Misaki's bakery
  exr_bakery_table: ['{小|ちい}さなテーブルに、{花|はな}と{丸|まる}いいすが二つ。ここで{焼|や}きたてを{食|た}べていく{人|ひと}もいるらしい。', 'A little table with flowers and two round stools. Some people eat their fresh bread right here.', 'Ein kleiner Tisch mit Blumen und zwei runden Hockern. Manche essen ihr frisches Brot gleich hier.'],
  exr_bakery_rack: ['{木|き}のラックに、メロンパンとクリームパンが{並|なら}んでいる。まだ{温|あたた}かい。', 'On the wooden rack, melon buns and cream buns. They are still warm.', 'Auf dem Holzregal liegen Melonenbrötchen und Cremebrötchen. Sie sind noch warm.'],
  exr_bakery_oven: ['{石|いし}のオーブンの{中|なか}で、{火|ひ}がちらちらと{揺|ゆ}れている。{朝|あさ}四{時|じ}から、ずっとこの{火|ひ}だ。', 'Inside the stone oven the fire flickers. It has burned since four in the morning.', 'Im Steinofen flackert das Feuer. Es brennt schon seit vier Uhr morgens.'],
  exr_bakery_display: ['ガラスの{棚|たな}に、サンドイッチとパンが{並|なら}んでいる。たまごサンドが、{一番|いちばん}{端|はし}に{置|お}いてある。', 'In the glass case, sandwiches and bread. The egg sandwiches sit at the very end.', 'In der Glasvitrine liegen Sandwiches und Brot. Die Eiersandwiches liegen ganz am Rand.'],
  // hospital
  exr_hosp_chairs: ['{青|あお}い{長|なが}いすが三つ。{夜|よる}の{待合室|まちあいしつ}は、{静|しず}かで、{少|すこ}しだけ{寂|さび}しい。', 'Three blue chairs in a row. The night waiting room is quiet and a little lonely.', 'Drei blaue Stühle in einer Reihe. Das Wartezimmer ist nachts still und ein wenig einsam.'],
  exr_hosp_cart: ['{薬|くすり}と{包帯|ほうたい}をのせた{台車|だいしゃ}だ。{看護師|かんごし}さんが、{夜中|よなか}に{何度|なんど}も{押|お}す。', 'A cart with medicine and bandages. The nurses push it many times in the night.', 'Ein Wagen mit Medikamenten und Verbänden. Die Schwestern schieben ihn nachts viele Male.'],
  exr_hosp_desk: ['ナースステーションだ。{机|つくえ}の{上|うえ}に、{小|ちい}さな{花|はな}とメモがある。「{今夜|こんや}も、がんばりましょう」。', 'The nurses’ station. On the desk are a small flower and a note: “Let’s do our best tonight, too.”', 'Der Schwesternstützpunkt. Auf dem Tisch liegen eine kleine Blume und ein Zettel: „Auch heute Nacht geben wir unser Bestes.“'],
  exr_hosp_vending: ['{自動販売機|じどうはんばいき}だ。{夜|よる}の{病院|びょういん}では、{温|あたた}かいお{茶|ちゃ}が{一番|いちばん}{売|う}れるそうだ。', 'A vending machine. In a hospital at night, warm tea sells best.', 'Ein Getränkeautomat. In einem Krankenhaus nachts verkauft sich warmer Tee am besten.'],
  // branch school café
  exr_cafe_desk: ['{古|ふる}い{学校|がっこう}の{机|つくえ}だ。{落書|らくが}きのあとが、まだ{残|のこ}っている。「ようすけ　参上」。', 'An old school desk. Doodles are still on it: “Yōsuke was here.”', 'Ein altes Schulpult. Kritzeleien sind noch zu sehen: „Yōsuke war hier.“'],
  exr_cafe_basket: ['{村|むら}の{人|ひと}が{持|も}ってきた{野菜|やさい}のかごだ。{今日|きょう}のランチは、これで{作|つく}る。', 'A basket of vegetables a villager brought. Today’s lunch will be made from them.', 'Ein Korb Gemüse, den jemand aus dem Dorf gebracht hat. Daraus wird das heutige Mittagessen.'],
  exr_cafe_stove: ['{小|ちい}さなストーブの{上|うえ}で、やかんがしゅんしゅんと{鳴|な}っている。', 'A kettle sings on the small stove.', 'Auf dem kleinen Ofen singt ein Wasserkessel.'],
  exr_cafe_board: ['{黒板|こくばん}に、チョークで{描|えが}いたコーヒーカップとケーキ。{昔|むかし}は、ここに{漢字|かんじ}の{練習|れんしゅう}が{書|か}いてあったのだろう。', 'On the blackboard, a chalk-drawn coffee cup and cake. Once it must have held kanji practice.', 'An der Tafel sind mit Kreide eine Kaffeetasse und ein Kuchen gezeichnet. Früher standen hier wohl Kanji-Übungen.'],
  exr_cafe_display: ['{窓|まど}の{外|そと}に、{棚田|たなだ}が{見|み}える。{教室|きょうしつ}だった{頃|ころ}と、{同|おな}じ{景色|けしき}だ。', 'Outside the window, the rice terraces. The same view as when this was a classroom.', 'Vor dem Fenster sieht man die Reisterrassen. Dieselbe Aussicht wie damals, als das hier ein Klassenzimmer war.'],
  // sake brewery
  exr_brew_barrel: ['{大|おお}きな{木|き}の{樽|たる}だ。{触|さわ}ると、ほんのり{温|あたた}かい。{中|なか}で、{酒|さけ}が{生|い}きている。', 'A large wooden barrel. It feels slightly warm. Inside, the sake is alive.', 'Ein großes Holzfass. Es fühlt sich leicht warm an. Darin lebt der Sake.'],
  exr_brew_table: ['{試飲|しいん}のテーブルだ。{小|ちい}さな{杯|さかずき}が{並|なら}んでいる。{飲|の}みすぎは、{禁物|きんもつ}。', 'The tasting table. Small cups stand in a row. Don’t drink too much.', 'Der Verkostungstisch. Kleine Becher stehen in einer Reihe. Nicht zu viel trinken.'],
  exr_brew_tanks: ['{背|せ}の{高|たか}い{仕込|しこ}みタンクが三つ。はしごの{上|うえ}から、{杜氏|とうじ}が{毎朝|まいあさ}のぞいて{確|たし}かめる。', 'Three tall brewing tanks. Every morning the master checks them from the top of the ladder.', 'Drei hohe Gärtanks. Jeden Morgen schaut der Meister von der Leiter aus hinein.'],
  exr_brew_shelf: ['{棚|たな}に、{陶器|とうき}の{徳利|とっくり}とお{猪口|ちょこ}。{杉|すぎ}の{香|かお}りが、{蔵|くら}じゅうに{満|み}ちている。', 'On the shelf, ceramic flasks and cups. The scent of cedar fills the whole brewery.', 'Im Regal stehen Keramikflaschen und Becher. Der Duft von Zedernholz erfüllt die ganze Brauerei.'],
  // Minshuku Sachi
  exr_pen_table: ['{囲炉裏|いろり}の{近|ちか}くの{低|ひく}いテーブル。{座布団|ざぶとん}が、お{客|きゃく}さんの{数|かず}より{多|おお}く{並|なら}べてある。', 'A low table near the hearth. There are more cushions than guests.', 'Ein niedriger Tisch nahe der Feuerstelle. Es liegen mehr Kissen da, als Gäste kommen.'],
  exr_pen_futons: ['ふかふかの{布団|ふとん}が、きれいにたたんで{積|つ}んである。{毎朝|まいあさ}、{干|ほ}している。', 'Fluffy futons folded neatly in a pile. They are aired every morning.', 'Flauschige Futons liegen ordentlich gefaltet gestapelt. Sie werden jeden Morgen gelüftet.'],
  exr_pen_boots: ['{雪|ゆき}の{長靴|ながぐつ}が、{玄関|げんかん}にそろえてある。{小|ちい}さいサイズも{一足|いっそく}ある。', 'Snow boots lined up in the entrance. There is one small pair, too.', 'Schneestiefel stehen aufgereiht im Eingang. Ein kleines Paar ist auch dabei.'],
  exr_pen_hearth: ['{囲炉裏|いろり}に、{鉄瓶|てつびん}がかかっている。{火|ひ}を{見|み}ていると、{時間|じかん}を{忘|わす}れる。', 'An iron kettle hangs over the hearth. Watching the fire, you lose track of time.', 'Über der Feuerstelle hängt ein Eisenkessel. Wer ins Feuer schaut, vergisst die Zeit.'],
  exr_pen_stove: ['{薪|まき}ストーブだ。{横|よこ}に、{割|わ}った{薪|まき}が{積|つ}んである。{外|そと}は、まだ{雪|ゆき}。', 'A wood stove with split logs stacked beside it. Outside, it is still snowing.', 'Ein Holzofen mit aufgestapelten Scheiten daneben. Draußen schneit es noch.'],
  // local history museum
  exr_mus_case: ['ガラスケースに、{古|ふる}い{農具|のうぐ}が{入|はい}っている。{名札|なふだ}に、{使|つか}った{人|ひと}の{名前|なまえ}がある。', 'Old farm tools in a glass case. A tag gives the name of the person who used them.', 'Alte Ackergeräte in einer Glasvitrine. Ein Schild nennt den Namen dessen, der sie benutzt hat.'],
  exr_mus_boots: ['{藁|わら}の{雪靴|ゆきぐつ}だ。{昔|むかし}の{人|ひと}は、これで{雪|ゆき}の{中|なか}を{歩|ある}いた。', 'Straw snow boots. People used to walk through the snow in these.', 'Strohschneeschuhe. Die Leute früher sind darin durch den Schnee gegangen.'],
  exr_mus_info: ['{案内|あんない}の{台|だい}だ。「{大雪|おおゆき}の{日記|にっき}」の{展示|てんじ}は、{奥|おく}の{棚|たな}にある。', 'An information stand. The exhibit of “the diary of the great snow” is on the back shelf.', 'Ein Infostand. Die Ausstellung „Das Tagebuch des großen Schnees“ steht im hinteren Regal.'],
  exr_mus_photo: ['{村|むら}の{古|ふる}い{写真|しゃしん}。{雪|ゆき}の{中|なか}に、かやぶきの{屋根|やね}が{並|なら}んでいる。', 'An old photo of the village: thatched roofs lined up in the snow.', 'Ein altes Foto des Dorfes: Strohdächer in einer Reihe im Schnee.'],
  exr_mus_cases: ['ケースの{中|なか}に、{古|ふる}い{道具|どうぐ}と{日記|にっき}が{並|なら}んでいる。{一番|いちばん}{大|おお}きな{日記|にっき}の{横|よこ}に、{赤|あか}い{紙|かみ}の{栞|しおり}がある。', 'In the cases, old tools and a diary. Next to the biggest diary lies a red bookmark.', 'In den Vitrinen liegen alte Werkzeuge und ein Tagebuch. Neben dem größten Tagebuch liegt ein rotes Lesezeichen.'],
  // boat workshop
  exr_werft_boat: ['{作|つく}りかけの{木|き}の{舟|ふね}だ。{舳先|へさき}に、{波|なみ}の{模様|もよう}の{竜|りゅう}が{彫|ほ}ってある。', 'A half-built wooden boat. A dragon in a wave pattern is carved into its bow.', 'Ein halb gebautes Holzboot. In den Bug ist ein Drache in einem Wellenmuster geschnitzt.'],
  exr_werft_bench: ['{作業台|さぎょうだい}の{上|うえ}に、かんなとのみ。{鉄男|てつお}さんの{手|て}のあとで、{柄|え}がすり{減|へ}っている。', 'On the workbench, a plane and chisels. The handles are worn smooth by Tetsuo’s hands.', 'Auf der Werkbank liegen Hobel und Meißel. Die Griffe sind von Tetsuos Händen glatt gewetzt.'],
  exr_werft_tar: ['タールのバケツだ。{強|つよ}いにおいがする。これを{塗|ぬ}ると、{舟|ふね}は{水|みず}に{強|つよ}くなる。', 'A bucket of tar with a strong smell. Painted on, it makes the boat resist water.', 'Ein Eimer Teer mit starkem Geruch. Damit gestrichen, hält das Boot dem Wasser stand.'],
  exr_werft_tools: ['{壁|かべ}に、のこぎりやのみがきちんと{並|なら}んでいる。どれも、{手入|ていれ}れが{行|ゆ}き{届|とど}いている。', 'Saws and chisels hang neatly on the wall. Every one is well cared for.', 'An der Wand hängen Sägen und Meißel ordentlich in einer Reihe. Jedes Stück ist gut gepflegt.'],
  exr_werft_helm: ['{舵輪|だりん}と{古|ふる}い{浮|う}き{輪|わ}。{海|うみ}の{男|おとこ}の{仕事場|しごとば}だ。', 'A ship’s wheel and an old lifebuoy. A workplace of men of the sea.', 'Ein Steuerrad und ein alter Rettungsring. Der Arbeitsplatz von Männern des Meeres.'],
  // Minshuku Umi
  exr_spen_table: ['{低|ひく}いテーブルに、{焼|や}き{魚|ざかな}とお{椀|わん}。{波|なみ}の{模様|もよう}の{座布団|ざぶとん}が、とてもかわいい。', 'On the low table, grilled fish and bowls. The wave-pattern cushions are very cute.', 'Auf dem niedrigen Tisch stehen Grillfisch und Schalen. Die Kissen mit Wellenmuster sind sehr niedlich.'],
  exr_spen_oranges: ['{夏|なつ}みかんのかごだ。{皮|かわ}をむくと、すっぱくていいにおいがする。', 'A basket of summer oranges. Peeled, they smell sour and fresh.', 'Ein Korb Sommerorangen. Geschält riechen sie sauer und frisch.'],
  exr_spen_fan: ['{古|ふる}い{扇風機|せんぷうき}が、ゆっくり{回|まわ}っている。{潮|しお}のにおいの{風|かぜ}が{来|く}る。', 'An old electric fan turns slowly. It brings a breeze smelling of the sea.', 'Ein alter Ventilator dreht sich langsam. Er bringt eine Brise, die nach Meer riecht.'],
  exr_spen_noren: ['{青|あお}い{波|なみ}のれんの{向|む}こうが、{台所|だいどころ}だ。{煮魚|にざかな}のいいにおいがする。', 'Beyond the blue wave noren lies the kitchen. It smells of simmered fish.', 'Hinter dem blauen Wellen-Noren liegt die Küche. Es riecht nach geschmortem Fisch.'],
  exr_spen_cooker: ['{炊飯器|すいはんき}から、ごはんの{湯気|ゆげ}が{上|あ}がっている。{朝|あさ}ごはんの{準備|じゅんび}だ。', 'Steam rises from the rice cooker. Breakfast is being prepared.', 'Aus dem Reiskocher steigt Dampf auf. Das Frühstück wird vorbereitet.'],
  // second-hand bookshop
  exr_ant_books: ['{古|ふる}い{本|ほん}の{山|やま}だ。{一番|いちばん}{上|うえ}の{本|ほん}に、メモがはさまっている。', 'A pile of old books. A note is tucked into the top one.', 'Ein Stapel alter Bücher. Im obersten steckt ein Zettel.'],
  exr_ant_shelf: ['{棚|たな}いっぱいの{文庫本|ぶんこぼん}。{背表紙|せびょうし}の{色|いろ}が、{日|ひ}に{焼|や}けている。', 'A shelf full of paperbacks, their spines sun-faded.', 'Ein Regal voller Taschenbücher, deren Rücken von der Sonne ausgeblichen sind.'],
  exr_ant_box: ['{段|だん}ボールの{箱|はこ}に、{買|か}い{取|と}ったばかりの{本|ほん}が{入|はい}っている。まだ{値段|ねだん}がついていない。', 'A cardboard box of newly bought books. They have no prices yet.', 'Ein Karton mit frisch angekauften Büchern. Sie haben noch keine Preise.'],
  exr_ant_shelves: ['{天井|てんじょう}まで{届|とど}く{本棚|ほんだな}。{詩|し}も、{歴史|れきし}も、{料理|りょうり}の{本|ほん}も、ごちゃまぜだ。', 'Bookshelves reaching the ceiling. Poetry, history and cookbooks, all mixed together.', 'Bücherregale bis zur Decke. Gedichte, Geschichte und Kochbücher, alles durcheinander.'],
  exr_ant_cat: ['{本|ほん}の{上|うえ}で、{三毛猫|みけねこ}が{丸|まる}くなって{寝|ね}ている。{起|お}こさないように、そっと。', 'A calico cat sleeps curled up on a pile of books. Quietly, so as not to wake it.', 'Eine Glückskatze schläft zusammengerollt auf einem Bücherstapel. Leise, um sie nicht zu wecken.'],
  // university library
  exr_lib_table: ['{長|なが}い{閲覧|えつらん}テーブルに、{緑|みどり}の{電気|でんき}スタンドが二つ。{静|しず}かに{勉強|べんきょう}する{人|ひと}の{席|せき}だ。', 'A long reading table with two green lamps. A seat for people studying quietly.', 'Ein langer Lesetisch mit zwei grünen Lampen. Plätze für alle, die in Ruhe lernen.'],
  exr_lib_cart: ['{返却|へんきゃく}された{本|ほん}の{台車|だいしゃ}だ。{一冊|いっさつ}ずつ、{元|もと}の{棚|たな}へ{戻|もど}す。', 'A cart of returned books. Each one goes back to its own shelf.', 'Ein Wagen mit zurückgegebenen Büchern. Jedes kommt wieder an seinen Platz im Regal.'],
  exr_lib_catalog: ['{カード目録|もくろく}の{引|ひ}き{出|だ}しだ。{古|ふる}いカードの{隅|すみ}に、{鉛筆|えんぴつ}の{字|じ}がある。', 'A drawer of the card catalogue. In the corner of an old card there is pencil handwriting.', 'Eine Schublade des Zettelkatalogs. In der Ecke einer alten Karte steht Bleistiftschrift.'],
  exr_lib_globe: ['{古|ふる}い{地球儀|ちきゅうぎ}だ。ブラジルのあたりが、{指|ゆび}のあとで{少|すこ}しすり{減|へ}っている。', 'An old globe. The area around Brazil is slightly worn by fingertips.', 'Ein alter Globus. Die Gegend um Brasilien ist von Fingern ein wenig abgegriffen.'],
  exr_lib_clock: ['{大|おお}きな{柱時計|はしらどけい}が、{正確|せいかく}に{時|とき}を{刻|きざ}んでいる。{閉館|へいかん}まで、あと{二|に}{時間|じかん}。', 'A big grandfather clock keeps exact time. Two hours until closing.', 'Eine große Standuhr zeigt genau die Zeit. Noch zwei Stunden bis zur Schließung.'],
  exr_lib_windows: ['{高|たか}いアーチの{窓|まど}から、{秋|あき}の{光|ひかり}が{差|さ}している。{床|ゆか}に、{長|なが}い{影|かげ}ができている。', 'Autumn light falls through the tall arched windows, casting long shadows on the floor.', 'Durch die hohen Bogenfenster fällt Herbstlicht und wirft lange Schatten auf den Boden.'],
};

export const EXROOM_SCRIPTS: Record<string, DialogueRule[]> = {};
for (const [id, [ja, en, de]] of Object.entries(TEXTS)) {
  DE_STORY[en] ??= de;
  EXROOM_SCRIPTS[id] = [{ steps: [{ say: ja, en }] }];
}

const NAMES: Record<string, string> = {
  "Misaki's bakery": 'Misakis Bäckerei', 'City hospital': 'Stadtkrankenhaus', 'Branch school café': 'Café in der Zweigschule', 'Sake brewery': 'Sake-Brauerei',
  'Minshuku Sachi': 'Pension Sachi', 'Local history museum': 'Heimatmuseum', 'Boat workshop': 'Bootswerkstatt', 'Minshuku Umi': 'Pension Umi',
  'Second-hand bookshop': 'Antiquariat', 'University library': 'Universitätsbibliothek',
};
for (const [en, de] of Object.entries(NAMES)) DE_STORY[en] ??= de;
