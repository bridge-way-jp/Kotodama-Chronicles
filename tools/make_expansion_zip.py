"""
Builds the art brief for the world expansion: one new district with ten new people in each of the seven regions,
so there are people enough for the stories that cover the whole N2 learning path.
Writes art/PLAN_EXPANSION.md (the districts and people, for writing their stories) and art/PROMPTS_EXPANSION.md,
plus one ZIP per region (one folder per GPT message: PROMPT.txt + reference images + ANLEITUNG.txt).

Run: python3 tools/make_expansion_zip.py [output_dir]
"""
import os
import shutil
import sys
import zipfile

sys.path.insert(0, os.path.dirname(__file__))
import make_region5_zip as k5  # noqa: E402

ROOT, SHEETS, STYLE, GROUND = k5.ROOT, k5.SHEETS, k5.STYLE, k5.GROUND

# region: (folder name, district ja, district en/de, season and light, ground (what, kind, layout, plots), buildings, reference ground,
#          reference buildings, reference people, reference portraits, people [(id, name ja, role en, role de, look, story hook de)])
REGIONS = [
    ('1_Hinomori', 'ひのもり商店街と市民病院', 'Hinomori shopping arcade and city hospital', 'Einkaufsstraße und Stadtkrankenhaus von Hinomori',
     'Spring, soft morning light, a few cherry trees in bloom.',
     ('the old shopping-arcade district of a small Japanese town', 'a covered shopping street, a small hospital, a primary school and a park beside a river',
      '- A long covered shopping street (shōtengai) running from left to right through the centre, paved, with an arcade entrance gate plot at each end.\n- Above it: a hospital plot with a small front garden and a bus stop, and a primary-school plot with a sand schoolyard and a few cherry trees.\n- Below it: a small park with a playground, benches, a stone shogi table and a narrow river with a footbridge at the bottom edge.',
      'one large plot (hospital), one large plot (primary school with schoolyard), eight narrow shop plots along the arcade (greengrocer, flower shop, bakery, post office, bookshop and others), one plot for a community hall, the two arcade gates'),
     ['A three-storey white town hospital with a red cross-free plain sign board, a glass entrance and a small roof garden',
      'A wooden-and-concrete primary school building with a clock on the front and a shoe-locker entrance',
      'A red-roofed small post office with a red post box in front',
      'A covered shopping-arcade entrance gate (an arch with a blank sign board and lanterns)',
      'A greengrocer shop front with crates of vegetables and fruit under an awning',
      'A small flower shop with buckets of flowers and a glass front',
      'A cosy bakery with a striped awning and bread in the window',
      'A plain community hall (kōminkan) with a notice board and a small flag pole'],
     'ground_town_draft.webp', 'hm_exterior.webp', 'hm_chars_town.webp', 'portraits_p1.webp',
     [('ex_oomori', '大森さん', 'Greengrocer in the arcade', 'Gemüsehändler in der Einkaufsstraße', 'a sturdy man of about 62, a twisted towel headband, a green apron over a work shirt, a small calculator on a string', 'Die Läden der Straße schließen einer nach dem anderen – er will als Letzter bleiben.'),
      ('ex_yuuma', '悠真', 'Young florist', 'junger Florist', 'a shy young man of about 24, soft black hair over his eyes, a denim apron, a small bouquet in his hand', 'Er stottert und spricht lieber mit Blumen als mit Menschen.'),
      ('ex_chihiro', '千尋さん', 'Night-shift nurse', 'Nachtschwester', 'a calm woman of about 35, hair in a low ponytail, a light-pink nurse uniform with a cardigan, a clipboard', 'Seit zehn Jahren Nachtschicht – sie sieht ihre eigene Tochter kaum.'),
      ('ex_ren', '蓮くん', 'Boy in a long hospital stay', 'Junge, der lange im Krankenhaus liegt', 'a thin boy of about 10 in striped pyjamas and slippers, a knitted hat, a drip stand on wheels beside him', 'Er war seit einem Jahr nicht mehr in der Schule und schreibt Briefe an seine Klasse.'),
      ('ex_takahashi', '高橋先生', 'First-year primary-school teacher', 'Grundschullehrerin im ersten Jahr', 'a young woman of about 26, bob haircut, a tracksuit jacket over a blouse, a whistle and a stack of notebooks', 'Ihre Klasse hört ihr nicht zu – und ein Kind kommt gar nicht mehr.'),
      ('ex_murai', '村井さん', 'Postman', 'Briefträger', 'a friendly man of about 55, a dark-blue postal uniform and cap, a big mail bag across his body', 'Er bringt seit 30 Jahren Briefe – auch die, auf die niemand antwortet.'),
      ('ex_shouta', '翔太', 'High-school paper boy', 'Oberschüler, der Zeitungen austrägt', 'a lanky boy of about 17, a school jacket with the sleeves rolled up, a newspaper bag, sneakers', 'Er trägt vor der Schule Zeitungen aus, um die Studiengebühren zu sparen.'),
      ('ex_oono', '大野会長', 'Head of the neighbourhood association', 'Vorsitzender des Nachbarschaftsvereins', 'a lively old man of about 75, white hair, a happi festival coat over a sweater, a folded fan', 'Das Straßenfest soll ausfallen, weil keine jungen Leute mehr helfen.'),
      ('ex_misaki', '美咲さん', 'Baker and single mother', 'Bäckerin und alleinerziehende Mutter', 'a warm woman of about 40, hair under a white baker\'s cap, an apron dusted with flour, a tray of bread', 'Sie backt jeden Morgen um vier – und ihr Sohn schämt sich für den kleinen Laden.'),
      ('ex_genichirou', '源一郎さん', 'Old shogi player in the park', 'alter Shōgi-Spieler im Park', 'a very old man of about 82, bald with a thin white beard, a padded vest, a wooden shogi box under his arm', 'Er wartet jeden Tag auf einen Freund, der nicht mehr kommt.')]),

    ('2_Tal', '谷の分校と棚田', 'The branch school and the rice terraces', 'Die Zweigschule und die Reisterrassen',
     'Early summer, green rice terraces, bright light.',
     ('rice terraces and an old village school in a Japanese mountain valley', 'terraced rice fields on a hillside, a closed wooden school, a small dam lake and a shrine',
      '- The left half: rice terraces stepping down the hill, with narrow earth paths between them and a small water channel.\n- The upper right: a small dam with a calm lake and a path along the shore.\n- The centre: a village square with an old wooden school plot and its sports ground, a farm co-op plot and a shrine plot with a big tree.',
      'one large plot (old wooden school, now a café), one plot (farm co-op shed), one small plot (dam control hut), one plot (shrine with a drum tower), one plot (animal clinic), one plot (sake brewery), two plots for farmhouses'),
     ['An old one-storey wooden school building with big windows, now a café (a small blank sign and plants at the door)',
      'A farm co-op storage shed with a corrugated roof and rice sacks by the door',
      'A small concrete dam control hut with a railing and a measuring pole',
      'A shrine drum tower (an open wooden tower with a big taiko drum inside)',
      'A small animal clinic with a paw-print sign (no text) and a fenced yard',
      'A traditional sake brewery with white walls, black wood and a big ball of cedar leaves (sugidama) hanging at the door',
      'A thatched farmhouse with a veranda',
      'A modern small farmhouse with solar panels and a vegetable garden'],
     'ground_valley_v2.webp', 'hm_exterior_valley.webp', 'hm_chars_valley.webp', 'portraits_valley.webp',
     [('ex_masaji', '正次さん', 'Rice farmer of the terraces', 'Reisbauer an den Terrassen', 'a weathered man of about 70, a straw hat, a long-sleeved work shirt, rubber boots, a sickle in his belt', 'Er ist der Letzte, der die oberen Terrassen noch bestellt.'),
      ('ex_risa', '理沙さん', 'Owner of the old-school café (moved here from the city)', 'Besitzerin des Schulcafés (aus der Stadt hergezogen)', 'a cheerful woman of about 34, short hair, a linen apron, round glasses, a coffee pot', 'Die Dorfleute nennen sie immer noch „die aus der Stadt“.'),
      ('ex_uchida', '内田さん', 'Dam keeper', 'Dammwärter', 'a quiet man of about 58, a grey work jacket with a reflective vest, a helmet under his arm, binoculars', 'Unter dem Stausee liegt sein altes Heimatdorf.'),
      ('ex_sanae', '早苗先生', 'Country vet', 'Landtierärztin', 'a brisk woman of about 45, hair tied back, a green vet coat with rolled sleeves, a stethoscope, a medical bag', 'Sie musste einem Bauern sagen, dass seine alte Kuh nicht mehr gesund wird.'),
      ('ex_daichi', '大地', 'Boy who plays the festival drum', 'Junge, der die Festtrommel spielt', 'a sporty boy of about 14, a short-sleeved happi coat and a headband, two drumsticks', 'Er soll die Trommel seines verstorbenen Großvaters übernehmen und hat Angst.'),
      ('ex_ume', '梅ばあちゃん', 'Mountain-herb gatherer', 'Kräutersammlerin aus den Bergen', 'a tiny old woman of about 88, a wide sun hat with a neck cloth, a basket on her back, a walking stick', 'Sie kennt jeden Pfad – und vergisst seit Kurzem den Heimweg.'),
      ('ex_miho', '美穂さん', 'Rural-revitalisation volunteer', 'Helferin für die Wiederbelebung des Dorfes', 'an energetic woman of about 27, a ponytail, an outdoor jacket with a logo patch (no text), a tablet and a camera', 'Ihre Projekte scheitern, weil sie nie fragt, was das Dorf eigentlich will.'),
      ('ex_megumi', '恵先生', 'Nursery-school teacher', 'Erzieherin im Kindergarten', 'a gentle woman of about 38, a pink apron with an animal print, a toddler\'s hat in her hand', 'Der Kindergarten hat nur noch drei Kinder und soll schließen.'),
      ('ex_youske', '陽介さん', 'Young man who moved in to farm', 'junger Mann, der hergezogen ist, um Bauer zu werden', 'a tall man of about 31, a cap, a T-shirt and overalls, a crate of tomatoes', 'Seine Frau will zurück in die Stadt.'),
      ('ex_toji', '杜氏の源蔵さん', 'Sake brewmaster', 'Braumeister einer Sakebrauerei', 'a dignified man of about 65, a white brewer\'s outfit and cap, a long wooden paddle', 'Er braut seinen letzten Sake – und hat noch keinen Nachfolger.')]),

    ('3_Yukimi', '雪見スキー場と湯の町', 'Yukimi ski slope and hot-spring street', 'Skihang und Thermalstraße von Yukimi',
     'Deep winter, fresh snow, clear blue sky.',
     ('a ski slope and a small hot-spring street in a snowy Japanese mountain village', 'a snowy slope with a lift, a street of inns with steaming hot springs and a weather station',
      '- The upper half: a wide white ski slope coming down from the top edge, with a chairlift line drawn as a row of posts, and a flat area at the bottom for a lift station plot.\n- The lower half: a narrow street of old inns with steam rising from small stone hot-spring pools, snow piled along the sides, a stream with a red bridge.\n- At the right edge: a small hill with a plot for a weather station.',
      'one plot (lift station and ski school hut), four plots along the hot-spring street (inns and a woodworking studio), one plot (snow-plough depot), one plot (weather station), one plot (local history museum)'),
     ['A small wooden lift station with a ski rack and a ski-school hut',
      'A two-storey old wooden inn with steam from the roof and snow on it',
      'A woodworking studio with logs stacked outside and a big window',
      'A snow-plough depot (a shed with a big orange snow plough parked inside the open door)',
      'A small white weather station with instruments and a wind vane on a mast',
      'A local history museum in an old storehouse (white plaster walls, black tiles)',
      'An open-air stone hot-spring footbath with a little wooden roof',
      'A small family guesthouse (minshuku) with a blue noren'],
     'ground_mountain_draft.webp', 'hm_exterior_mountain.webp', 'hm_chars_mountain.webp', 'portraits_mountain.webp',
     [('ex_yukina', '雪菜さん', 'Ski instructor', 'Skilehrerin', 'a sporty woman of about 28, a red ski jacket, goggles on her forehead, a knitted hat, skis on her shoulder', 'Nach einem Unfall traut sie sich selbst nicht mehr auf die Piste.'),
      ('ex_shigeru', '茂さん', 'Snow-plough driver', 'Schneepflugfahrer', 'a stocky man of about 60, a padded orange work suit, a hard hat with ear flaps, thick gloves', 'Er fährt jede Nacht, damit morgens der Krankenwagen durchkommt.'),
      ('ex_sachiko', 'さち子さん', 'Owner of a family guesthouse', 'Wirtin einer Familienpension', 'a round-faced woman of about 55, a padded kimono jacket, a tray of hot drinks', 'Ihre Pension hat seit drei Wintern keinen Gast mehr gehabt.'),
      ('ex_itsuki', '樹さん', 'Woodworker', 'Holzhandwerker', 'a calm man of about 33, a beard, a canvas apron with tools, a wooden bowl in his hands', 'Er macht Löffel aus dem Holz eines umgestürzten alten Baumes.'),
      ('ex_ken', '健', 'Young forester', 'junger Forstarbeiter', 'a strong young man of about 25, a helmet with a face guard, a forestry jacket, a chainsaw case', 'Er wollte nie im Dorf bleiben – bis der Wald ihn brauchte.'),
      ('ex_hoshino', '星野さん', 'Weather observer', 'Wetterbeobachter', 'a thin man of about 48, glasses, a thick parka, a notebook and a thermometer', 'Er schreibt seit 25 Jahren jeden Tag das Wetter auf – für wen eigentlich?'),
      ('ex_ryuuji', '竜二さん', 'Seasonal worker who comes every winter', 'Saisonarbeiter, der jeden Winter kommt', 'a rough-looking man of about 45, a worn down jacket, a duffel bag, a scar on his chin, kind eyes', 'Er hat seiner Tochter seit zehn Jahren nicht geschrieben.'),
      ('ex_fumiko', '文子館長', 'Head of the local history museum', 'Leiterin des Heimatmuseums', 'an elegant old woman of about 70, silver bob, a long knitted coat, white gloves for handling old objects', 'Ein altes Tagebuch aus dem Museum erzählt vom großen Schneesturm vor 60 Jahren.'),
      ('ex_yuzu', 'ゆず', 'Girl in the ski school', 'Mädchen in der Skischule', 'a small girl of about 8, a yellow ski suit, a bib with a number (no text), mittens on a string', 'Sie fällt jeden Tag hin und will nie wieder Ski fahren.'),
      ('ex_haruto2', '晴人', 'University student snow volunteer', 'Student, der freiwillig Schnee schaufelt', 'a cheerful young man of about 20, a big snow shovel, a down jacket with a volunteer armband (no text)', 'Er kam nur für Uni-Punkte – und findet hier eine zweite Familie.')]),

    ('4_Shiomi', '潮見島', 'Shiomi Island', 'Die Insel Shiomi',
     'Summer, bright sea, white clouds.',
     ('a small fishing island off a Japanese harbour town', 'a tiny island with a ferry pier, a fish market, a small shipyard, a branch school and a cliff path',
      '- The sea surrounds the island; a ferry pier sticks out at the bottom edge.\n- Along the shore: a fish-market plot, a small shipyard with a slipway into the water, and a row of fishermen\'s houses.\n- The hilly centre: a branch-school plot with a tiny sports ground, a clinic plot, and a winding path up to a cliff on the right with a view point.',
      'one plot (ferry terminal hut), one plot (fish market hall), one plot (shipyard with slipway), one plot (branch school), one plot (island clinic), one plot (family guesthouse), one plot (fisheries co-op office), three small plots for houses'),
     ['A small ferry terminal hut with a ticket window and a bench',
      'An open fish-market hall with a wide roof and crates stacked inside',
      'A small wooden shipyard shed beside a slipway with a half-built boat',
      'A tiny two-room branch school with a bell on the roof',
      'A small white island clinic with a blue roof',
      'A fisherman\'s house with nets drying on a frame',
      'A family guesthouse with a sea-blue noren and potted plants',
      'A small fisheries co-op office with a flag'],
     'ground_harbor_draft.webp', 'hm_exterior_harbor.webp', 'hm_chars_harbor.webp', 'portraits_harbor.webp',
     [('ex_tsuyoshi', '剛船長', 'Ferry captain', 'Fährkapitän', 'a broad-shouldered man of about 52, a captain\'s cap, a white short-sleeved shirt with epaulettes, a sunburnt face', 'Die Fährlinie zur Insel soll eingestellt werden.'),
      ('ex_tetsuo', '鉄男さん', 'Shipyard craftsman', 'Bootsbauer', 'a wiry man of about 66, a towel around his neck, a sleeveless shirt, a wooden plane in his hand', 'Er baut sein letztes Holzboot – für einen Enkel, den er nie getroffen hat.'),
      ('ex_kouji', '浩二さん', 'Fish-market auctioneer', 'Auktionator auf dem Fischmarkt', 'a loud man of about 44, a cap with a numbered badge (no text), rubber boots, a notebook in his hand', 'Seine laute Stimme ist weg – nach einer Operation am Hals.'),
      ('ex_natsumi', '夏美先生', 'Branch-school teacher', 'Lehrerin der Zweigschule', 'a young woman of about 31, a sun hat, a T-shirt and wide trousers, a handbell', 'Die Schule hat nur noch zwei Schüler – und einer zieht weg.'),
      ('ex_tomi', 'トミさん', 'Old ama diver', 'alte Perlentaucherin', 'a strong old woman of about 79, a white diving outfit and headscarf, a wooden bucket', 'Sie taucht seit 60 Jahren – heute zum letzten Mal.'),
      ('ex_takumi', '拓海さん', 'Young angler from the city', 'junger Angler aus der Stadt', 'a pale man of about 30, a fishing vest, a rod case, a big sun hat', 'Er ist nach einem Burn-out auf die Insel geflohen.'),
      ('ex_morikawa', '森川先生', 'Doctor of the clinic boat', 'Arzt des Klinikbootes', 'a tanned man of about 50, a white coat over a polo shirt, a medical bag, sunglasses on his head', 'Er fährt jede Woche zu den Inseln – und vermisst seine eigene Familie.'),
      ('ex_yumi', '由美さん', 'Guesthouse mother', 'Pensionswirtin', 'a lively woman of about 47, an apron, hair in a bandana, a big pot', 'Ihr Sohn will die Insel verlassen, wie einst ihr Mann.'),
      ('ex_sofia', 'ソフィアさん', 'Photographer from abroad', 'Fotografin aus dem Ausland', 'a tall woman of about 35 with curly red hair, a camera around her neck, a travel vest', 'Sie fotografiert die Insel, die ihr Großvater auf einem alten Foto hinterlassen hat.'),
      ('ex_saori', 'さおりさん', 'Fisheries co-op clerk', 'Angestellte der Fischereigenossenschaft', 'a neat young woman of about 26, a co-op jacket over a blouse, a folder of papers', 'Sie muss den Fischern sagen, dass die Fangmengen begrenzt werden.')]),

    ('5_Kyoto', '大学と嵐山', 'The university and Arashiyama', 'Die Universität und Arashiyama',
     'Autumn, red maples, golden afternoon light.',
     ('a university campus and the Arashiyama area of Kyoto', 'an old brick campus with a library, a bamboo grove and a river with boats',
      '- The upper half: an old university campus with red-brick building plots, a clock tower plot, lawns, ginkgo avenues and a library plot.\n- The lower left: a dense green bamboo grove with a narrow path winding through it.\n- The lower right: a wide river with wooden boats, a long wooden bridge, and a rickshaw stand plot on the bank.',
      'one large plot (library), one plot (clock-tower lecture hall), one plot (student dormitory), one plot (second-hand bookshop), one plot (bamboo-craft workshop), one plot (rickshaw stand), one plot (temple garden gate), one plot (tea house for maiko training)'),
     ['An old red-brick university lecture hall with a clock tower',
      'A university library with tall arched windows',
      'A wooden student dormitory with laundry on the balconies',
      'A narrow second-hand bookshop with books stacked outside',
      'A bamboo-craft workshop with bamboo poles leaning against the wall',
      'A rickshaw stand with a little wooden hut and a parked rickshaw',
      'A temple garden gate with a thatched roof',
      'A two-storey okiya (maiko house) with lattice windows and a lantern'],
     'ground_gion_draft.webp', 'hm_exterior_kyoto.webp', 'hm_chars_kyoto.webp', 'portraits_kyoto.webp',
     [('ex_lucas', 'ルーカス', 'Exchange student from Brazil', 'Austauschstudent aus Brasilien', 'a cheerful young man of about 23, curly dark hair, a hoodie, a backpack with a Japanese dictionary', 'Er spricht fließend Japanisch – und versteht trotzdem niemanden wirklich.'),
      ('ex_miyamoto', '宮本教授', 'Professor of classical literature', 'Professor für klassische Literatur', 'a thin old man of about 64, a tweed jacket, round glasses, an old book under his arm', 'Seine letzte Vorlesung vor der Pensionierung – vor fast leerem Saal.'),
      ('ex_daisuke', '大輔さん', 'Rickshaw puller', 'Rikschafahrer', 'a muscular young man of about 27, a black happi coat, tabi shoes, a towel headband, a big smile', 'Er wollte Profisportler werden; jetzt läuft er für Touristen.'),
      ('ex_matsui', '松井さん', 'Temple gardener', 'Tempelgärtner', 'a quiet man of about 58, a dark work kimono, a straw hat, pruning shears', 'Ein jahrhundertealter Ahorn im Garten stirbt.'),
      ('ex_shizu', '静さん', 'Bamboo craftswoman', 'Bambuskunsthandwerkerin', 'an old woman of about 71, a grey work kimono, sleeves tied back, a woven bamboo basket', 'Sie hat keine Schülerin – bis eine Studentin vor ihrer Tür steht.'),
      ('ex_ichirou', '一郎さん', 'Second-hand bookshop owner', 'Antiquar', 'a stooped man of about 68, a knitted vest, reading glasses on his nose, a feather duster', 'Ein Buch, das er vor 40 Jahren verkauft hat, kommt zu ihm zurück.'),
      ('ex_koharu', '小春', 'Maiko in training', 'Maiko-Schülerin', 'a girl of about 16 in a simple practice kimono (not full maiko make-up), hair in a bun, a fan', 'Sie hat Heimweh und darf ihre Familie ein Jahr lang nicht sehen.'),
      ('ex_haruka', '遥さん', 'University librarian', 'Universitätsbibliothekarin', 'a calm woman of about 36, a long cardigan, a lanyard with an ID card, a stack of returned books', 'In einem zurückgegebenen Buch steckt ein Liebesbrief von 1975.'),
      ('ex_kikue', '菊江さん', 'Dormitory mother', 'Wohnheimmutter', 'a plump old woman of about 73, an apron with a chrysanthemum pattern, a ladle', 'Ihr Wohnheim wird abgerissen – nach 50 Jahren und tausenden Studenten.'),
      ('ex_yui', '結衣', 'Calligraphy-club student', 'Studentin im Kalligrafie-Club', 'a serious young woman of about 19, a long skirt and a cardigan, a brush case', 'Sie hat ihre Stimme verloren und spricht nur noch mit dem Pinsel.')]),

    ('6_Osaka', '町工場の町', 'The town of small factories', 'Die Stadt der kleinen Fabriken',
     'Late afternoon, warm orange light, a few clouds.',
     ('a district of small factories in East Osaka', 'narrow streets with small workshops, a canal, a courthouse, a care home and a comedy theatre',
      '- A grid of narrow streets with many small workshop plots (open fronts, roller shutters), stacked metal parts and pallets.\n- A canal crossing the lower third with two small bridges.\n- On the right: a larger plot for a courthouse with a forecourt, and a plot for a care home with a garden.',
      'eight small workshop plots, one plot (courthouse), one plot (care home with garden), one plot (newspaper office), one plot (small comedy theatre), one plot (night school), one plot (town doctor\'s clinic)'),
     ['A small metal workshop with a half-open roller shutter, machines inside and a blank sign',
      'A two-storey small factory with a saw-tooth roof',
      'A stone courthouse with columns and a flag pole',
      'A modern care home with wide windows and a garden bench',
      'A small newspaper office with a glass front and a blank sign',
      'A tiny comedy theatre with a red curtain-shaped entrance and paper lanterns',
      'An old school building used as a night school, lights in the windows',
      'A town doctor\'s clinic in an old house with a white sign board'],
     'ground_shinsekai_draft.webp', 'hm_exterior_osaka.webp', 'hm_chars_osaka.webp', 'portraits_osaka.webp',
     [('ex_teppei', '鉄平社長', 'Owner of a small metal workshop', 'Inhaber einer kleinen Metallwerkstatt', 'a short wiry man of about 62, a work uniform with his name tag (no text), safety glasses on his forehead, oil on his hands', 'Seine Werkstatt hat einen Auftrag für ein Raumfahrtteil – und zu wenig Leute.'),
      ('ex_jun', '純', 'Young apprentice in the workshop', 'junger Lehrling in der Werkstatt', 'a young man of about 22, dyed brown hair, a work uniform, earphones around his neck', 'Er hat die Schule abgebrochen und glaubt, er kann nichts.'),
      ('ex_nina', 'ニナさん', 'Technical trainee from Indonesia', 'Praktikantin aus Indonesien', 'a young woman of about 25 with a hijab, a factory uniform, a small notebook of Japanese words', 'Sie schickt ihr ganzes Gehalt nach Hause und isst allein.'),
      ('ex_hayakawa', '早川弁護士', 'Lawyer for ordinary people', 'Anwältin für einfache Leute', 'a sharp woman of about 41, a dark suit, a lawyer\'s badge, a heavy briefcase', 'Sie verteidigt einen Mann, den alle für schuldig halten.'),
      ('ex_yuuko', '優子さん', 'Care worker in the care home', 'Altenpflegerin', 'a kind woman of about 33, a light-green care uniform, an armband, a wheelchair handle in her hand', 'Ihre Lieblingsbewohnerin erkennt sie nicht mehr.'),
      ('ex_tsuyoshi2', '剛先生', 'Male nursery-school teacher', 'Erzieher im Kindergarten', 'a big gentle man of about 29, an apron with a bear on it, a child\'s backpack on one arm', 'Eltern misstrauen ihm, weil er ein Mann ist.'),
      ('ex_fujiwara', '藤原記者', 'Newspaper reporter', 'Zeitungsreporter', 'a tired man of about 38, a crumpled jacket, a press armband (no text), a notepad and a camera', 'Seine Zeitung wird eingestellt; seine letzte Geschichte soll wahr sein.'),
      ('ex_tsukkomi', 'ツッコミの勇気', 'Stand-up comedian (manzai straight man)', 'Komiker (Manzai, der „Ernste“ im Duo)', 'a thin man of about 30, a shiny blue stage suit, a big bow tie, a fan for slapping', 'Sein Partner hat aufgehört – er steht allein auf der Bühne.'),
      ('ex_akira', '明さん', 'Night-school student of 46', 'Abendschüler mit 46', 'a middle-aged man of about 46, a work jacket over a school-style shirt, a schoolbag', 'Er lernt lesen und schreiben, um einen Brief an seine Mutter zu schreiben.'),
      ('ex_sakata', '坂田先生', 'Old town doctor', 'alter Stadtarzt', 'an old man of about 70, a white coat over a cardigan, a stethoscope, a leather doctor\'s bag', 'Er schließt die Praxis – aber seine Patienten wollen keinen anderen Arzt.')]),

    ('7_Tokyo', '湾岸と下町の路地', 'The bay area and the old lanes', 'Das Hafenviertel und die alten Gassen',
     'Clear evening, the sky turning orange, city lights starting.',
     ('the Tokyo bay area next to an old downtown lane', 'modern towers and a seaside park next to a maze of old wooden lanes',
      '- The right half: a modern bay area with plots for glass towers, a wide seaside promenade, a park with a lawn and a view of the water at the right edge.\n- The left half: a dense maze of narrow old lanes with potted plants, small wooden houses and tiny shop plots.\n- Between them: a road with a fire-station plot and a plot for a courthouse annex.',
      'two large plots (glass towers: a co-working office and a research lab), one plot (fire station), one plot (care home), one plot (court building), one plot (hair salon), one plot (delivery depot), one plot (real-estate office), one plot (night nursery), two small plots for old houses'),
     ['A sleek glass co-working tower with a rooftop garden',
      'A modern research lab building with a satellite dish and white walls',
      'A fire station with a red door and a fire engine visible inside (no text)',
      'A bright care home with a terrace and wheelchairs by the door',
      'A small modern hair salon with a striped barber pole and a big window',
      'A delivery depot with roller shutters and stacked cardboard boxes',
      'A tiny old real-estate office with paper flats posted in the window (no readable text)',
      'A small night nursery in an old house with a lit window and a children\'s drawing on the door'],
     'ground_sumida_draft.webp', 'hm_exterior_tokyo.webp', 'hm_chars_tokyo.webp', 'portraits_tokyo.webp',
     [('ex_mao', '真央さん', 'Start-up founder', 'Start-up-Gründerin', 'a stylish woman of about 29, a white sneakers-and-blazer outfit, a tablet, wireless earbuds', 'Ihr Start-up hat Geld – aber ihr Mitgründer, ihr bester Freund, ist gegangen.'),
      ('ex_nakajima', '中島博士', 'Robotics researcher', 'Robotikforscher', 'a scruffy man of about 44, a lab coat over a T-shirt, a small robot in his arms', 'Er baut einen Pflegeroboter – für seine Mutter, die er nie besucht.'),
      ('ex_hayato', '隼人さん', 'Firefighter', 'Feuerwehrmann', 'a strong man of about 32, a fire-fighter\'s jacket with reflective stripes, a helmet under his arm', 'Er konnte bei einem Brand nicht alle retten.'),
      ('ex_hana', 'ハナさん', 'Resident of the care home, 91', 'Bewohnerin des Pflegeheims, 91', 'a tiny old woman of about 91 in a wheelchair, a lavender cardigan, a brooch, sharp bright eyes', 'Sie erzählt von dem Tokio, das es nicht mehr gibt.'),
      ('ex_shimizu', '清水書記官', 'Court clerk', 'Gerichtsschreiber', 'a precise man of about 50, a grey suit, a lanyard, a thick file of papers', 'Er hat in 25 Jahren tausende Urteile aufgeschrieben – und eines bereut.'),
      ('ex_riku', 'リク', 'Hairdresser', 'Friseur', 'a fashionable young man of about 27, two-tone hair, a black apron with scissors in the pocket', 'Er schneidet jeden Sonntag kostenlos Obdachlosen die Haare.'),
      ('ex_isamu', '勇さん', 'Delivery driver', 'Paketfahrer', 'a hurried man of about 37, a delivery uniform with a cap, a big cardboard box', 'Er liefert 200 Pakete am Tag und hat für sich selbst keine Zeit.'),
      ('ex_nikaidou', '二階堂さん', 'Old real-estate agent', 'alter Immobilienmakler', 'a dapper old man of about 55, a bow tie, a vest, a bunch of keys', 'Er vermittelt Wohnungen an die, die sonst niemand nimmt.'),
      ('ex_sophie', 'ソフィー', 'French schoolgirl in Tokyo', 'französisches Schulmädchen in Tokio', 'a girl of about 9 with blond braids, a yellow school hat, a red randoseru backpack', 'In der Schule redet niemand mit ihr – sie redet mit dem Hausmeister.'),
      ('ex_mai', '麻衣さん', 'Night-nursery teacher', 'Erzieherin in der Nachtkita', 'a warm woman of about 30, a soft sweater, an apron, a picture book', 'Die Kinder, die sie nachts betreut, sehen ihre Eltern fast nie.')]),
]

PEOPLE_T = """Create a walking sprite sheet for a top-down 16-bit RPG, in exactly the same pixel-art style, size and proportions as the attached character sheets.
RULES: chibi proportions, all adults exactly the same height (children smaller), feet on the same baseline. Each character is one BLOCK of 4 columns × 4 rows:
Row 1 facing DOWN, Row 2 facing LEFT (true profile), Row 3 facing RIGHT (true profile — draw it, do not mirror; bags stay on the same body side), Row 4 facing UP (back view).
4 frames per row: standing, left foot forward, standing, right foot forward. Same outfit and items in every direction.
No large preview figure, no ground shadow, no text. Clear gaps between frames, bigger gaps between characters. The characters side by side in one row (3 + 2 if needed).
Background: plain pure magenta (#FF00FF). Landscape 1536 × 1024.
The {n} characters ({season}, modern Japan):
{list}"""

PORTRAIT_T = """Dialogue portrait sheet for the characters in the walking sheet I also attach (from the previous message), in exactly the same style as the attached portrait sheet. Same faces, hair and clothes.
One ROW per character, 4 portraits per row: neutral, happy, surprised, worried. Head and shoulders, all the same size and crop.
Clear gaps, no text, no frames. Plain pure magenta (#FF00FF) background.
Rows:
{list}"""

BUILD_T = """Exterior buildings for {district}, in exactly the same style, light and scale as the attached building sheet. Each building separately, at least 40 px magenta gap between them, no readable text on signs.
IMPORTANT: NO smoke, NO people, NO vehicles unless named (these are added in the game).
{list}
Plain pure magenta (#FF00FF) background. Landscape 1536 × 1024."""


def folders(region):
    key, ja, en, de, light, (what, kind, layout, plots), buildings, ref_ground, ref_build, ref_people, ref_port, people = region
    short = key.split('_', 1)[1].lower()
    out = []
    out.append(('1_Boden', GROUND.format(what=what + ': ' + kind, light=light, layout=layout, plots=plots), [STYLE, ref_ground],
                f'Karte (Boden) für „{ja}“. Ergebnis speichern als: ground_ex_{short}_draft.webp'))
    out.append(('2_Gebaeude', BUILD_T.format(district=f'{en} ({ja})', list='\n'.join(f'{i + 1}. {b}' for i, b in enumerate(buildings))),
                [STYLE, ref_build], f'Gebäude. Ergebnis speichern als: hm_exterior_ex_{short}.webp'))
    season = light.split(',')[0].lower()
    for part, group in (('a', people[:5]), ('b', people[5:])):
        lst = '\n'.join(f'{i + 1}. {p[1]} ({p[2]}): {p[4]}' for i, p in enumerate(group))
        out.append((f'3{part}_Leute', PEOPLE_T.format(n=len(group), season=season + ' clothes', list=lst), [STYLE, ref_people, 'hm_chars_main.webp'],
                    f'Laufbilder der Figuren {", ".join(p[1] for p in group)}. Ergebnis speichern als: hm_chars_ex_{short}_{part}.webp'))
        out.append((f'4{part}_Portraets', PORTRAIT_T.format(list='\n'.join(f'{i + 1}. {p[1]} ({p[2]})' for i, p in enumerate(group))), [STYLE, ref_port],
                    f'Porträts. Ergebnis speichern als: portraits_ex_{short}_{part}.webp (Ordner 3{part} vorher machen und dessen Ergebnis zusätzlich anhängen).'))
    return out


def plan_md():
    md = ['# World expansion: a new district and ten new people in every region', '',
          'Generated by tools/make_expansion_zip.py. The people here are the cast of the 心の物語 that cover the rest of the N2 learning path.', '']
    for r in REGIONS:
        key, ja, en, de, light, ground, buildings, *_, people = r
        md += [f'## {key.split("_", 1)[0]}. {ja} — {en} ({de})', '', f'*{light}*', '', '| id | Name | Rolle | Story-Idee |', '|---|---|---|---|']
        md += [f'| {p[0]} | {p[1]} | {p[3]} | {p[5]} |' for p in people]
        md.append('')
    return '\n'.join(md)


LIESMICH = """Kotodama Chronicles – Welterweiterung, Region {name}

Ein neuer Stadtteil „{ja}“ ({de}) mit 10 neuen Menschen.
Jeder Ordner = eine Nachricht an GPT. In jedem Ordner: PROMPT.txt (Text kopieren), die Beispielbilder zum Anhängen und ANLEITUNG.txt.
Reihenfolge: 1, 2, 3a, 4a, 3b, 4b. Für 4a brauchst du dein Ergebnis aus 3a, für 4b das aus 3b.

Die fertigen Bilder einfach in den Chat hochladen (Dateinamen stehen in der ANLEITUNG), ich baue sie ins Spiel ein.
"""


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'art', 'out')
    os.makedirs(out, exist_ok=True)
    open(os.path.join(ROOT, 'art', 'PLAN_EXPANSION.md'), 'w', encoding='utf-8').write(plan_md())
    md = ['# Images for the world expansion', 'One ZIP per region; one folder of a ZIP = one message to GPT.', 'Generated by tools/make_expansion_zip.py.', '']
    for r in REGIONS:
        key, ja, en, de = r[:4]
        name = f'Kotodama_Erweiterung_{key}'
        pkg = os.path.join(out, name)
        shutil.rmtree(pkg, ignore_errors=True)
        os.makedirs(pkg)
        open(os.path.join(pkg, 'LIESMICH.txt'), 'w', encoding='utf-8').write(LIESMICH.format(name=key.split('_', 1)[1], ja=ja, de=de))
        md += [f'# {key}: {ja} ({en})', '']
        for folder, prompt, attach, hint in folders(r):
            d = os.path.join(pkg, folder)
            os.makedirs(d)
            open(os.path.join(d, 'PROMPT.txt'), 'w', encoding='utf-8').write(prompt + '\n')
            open(os.path.join(d, 'ANLEITUNG.txt'), 'w', encoding='utf-8').write(
                'Eine Nachricht an GPT: Text aus PROMPT.txt kopieren und die Bilder aus diesem Ordner anhängen.\n' + hint + '\n')
            for a in attach:
                src = os.path.join(SHEETS, a)
                if not os.path.exists(src):
                    raise SystemExit('missing reference image ' + src)
                shutil.copy(src, d)
            md += [f'## {folder}', f'**Attach:** {", ".join(attach)}  ·  {hint}', '', '```', prompt, '```', '']
        zp = os.path.join(out, name + '.zip')
        with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
            for base, _, files in os.walk(pkg):
                for f in files:
                    p = os.path.join(base, f)
                    z.write(p, os.path.relpath(p, out))
        print(zp, round(os.path.getsize(zp) / 1e6, 1), 'MB')
    open(os.path.join(ROOT, 'art', 'PROMPTS_EXPANSION.md'), 'w', encoding='utf-8').write('\n'.join(md))


if __name__ == '__main__':
    main()
