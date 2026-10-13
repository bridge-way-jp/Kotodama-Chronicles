import type { GameState } from '../core/types';

/**
 * Japan notebook: short notes on everyday life, society and social issues, unlocked by scenes
 * (the `{ note: id }` script action sets flag `note_<id>`). Kept general and factual on purpose:
 * no exact statistics or legal details that could be wrong. German first, English second.
 */
export interface JapanNote {
  chapter: number;
  title: string;
  titleEn: string;
  de: string;
  en: string;
  words?: string;
}

export const NOTES: Record<string, JapanNote> = {
  // --- chapter 1: Hinomori, everyday life
  genkan: {
    chapter: 1, title: '玄関', titleEn: 'The genkan',
    de: 'In Japan zieht man die Schuhe am Eingang (Genkan) aus. Der Boden dort gilt als „draußen“, der Wohnraum als „drinnen“. Oft stehen Hausschuhe bereit, und auf Tatami geht man nur in Socken.',
    en: 'In Japan you take off your shoes at the entrance (genkan). The floor there counts as “outside”, the living space as “inside”. Slippers are often provided, and on tatami you wear socks only.',
    words: '玄関・靴箱・スリッパ',
  },
  bunbetsu: {
    chapter: 1, title: '分別', titleEn: 'Sorting rubbish',
    de: 'Müll wird in Japan streng getrennt. Die Regeln legt jede Gemeinde selbst fest: welche Sorte an welchem Tag, in welchen Beuteln. Öffentliche Mülleimer sind selten, deshalb nimmt man seinen Abfall oft wieder mit nach Hause.',
    en: 'Rubbish is sorted strictly in Japan. Each municipality sets its own rules: which kind on which day, in which bags. Public bins are rare, so people often take their litter home.',
    words: '分別・燃えるゴミ・ペットボトル',
  },
  shokkenki: {
    chapter: 1, title: '食券機', titleEn: 'Meal-ticket machines',
    de: 'In vielen Ramen-Läden kauft man erst ein Essensticket am Automaten und gibt es dann ab. Das spart Wartezeit und Gespräche. Trinkgeld gibt es in Japan nicht; guter Service gilt als selbstverständlich.',
    en: 'In many ramen shops you buy a meal ticket from a machine first and hand it over. It saves time and talk. There is no tipping in Japan; good service is taken for granted.',
    words: '食券・注文・おかわり',
  },
  konbini: {
    chapter: 1, title: 'コンビニ', titleEn: 'The konbini',
    de: 'Der Konbini ist mehr als ein Laden: Man holt dort Essen, zahlt Rechnungen, versendet Pakete, holt Tickets und kopiert. Viele haben rund um die Uhr geöffnet und sind für viele Menschen ein fester Teil des Alltags.',
    en: 'The konbini is more than a shop: people get food, pay bills, send parcels, pick up tickets and make copies there. Many are open around the clock and are a fixed part of daily life.',
    words: 'コンビニ・支払い・宅配便',
  },
  cash: {
    chapter: 1, title: '現金とIC', titleEn: 'Cash and IC cards',
    de: 'Bargeld ist in Japan weiterhin weit verbreitet, besonders in kleinen Läden und auf dem Land. Daneben gibt es IC-Karten (wie Suica oder Pasmo) für Bahn und Einkauf sowie Zahlungs-Apps. Am Geldautomaten können außerhalb der Bankzeiten Gebühren anfallen.',
    en: 'Cash is still widely used in Japan, especially in small shops and in the countryside. There are also IC cards (like Suica or Pasmo) for trains and shopping, plus payment apps. ATMs may charge fees outside bank hours.',
    words: '現金・手数料・ICカード',
  },
  ic_card: {
    chapter: 1, title: 'ICカードと改札', titleEn: 'IC cards and ticket gates',
    de: 'Mit einer IC-Karte hält man beim Bahnhofstor einfach die Karte an den Sensor; der Fahrpreis wird automatisch abgebucht. Das gilt in vielen Städten auch für Busse und Läden. Auf dem Land ist das Netz dünner.',
    en: 'With an IC card you just touch the sensor at the station gate and the fare is deducted automatically. In many cities it also works on buses and in shops. In the countryside the network is thinner.',
    words: '改札・乗り換え・運賃',
  },
  landlord: {
    chapter: 1, title: '大家さんと部屋探し', titleEn: 'Landlords and flat-hunting',
    de: 'Beim Mieten zahlt man oft mehr als Miete im Voraus, etwa Kaution und „Dankesgeld“ (敷金・礼金), und häufig braucht man einen Bürgen. Für Ausländer kann die Wohnungssuche manchmal schwieriger sein. Ein freundlicher Kontakt zur Vermieterin (大家さん) hilft im Alltag sehr.',
    en: 'Renting often means paying more than rent up front, such as a deposit and “key money” (shikikin, reikin), and you frequently need a guarantor. Flat-hunting can sometimes be harder for foreigners. A friendly relationship with the landlord(lady) helps a lot in daily life.',
    words: '大家・敷金・礼金',
  },
  newyear: {
    chapter: 1, title: 'お正月', titleEn: 'New Year',
    de: 'Neujahr ist einer der wichtigsten Feiertage. Man besucht zum ersten Mal im Jahr den Schrein (初詣), isst besonderes Essen (おせち) und Kinder bekommen Geldgeschenke im kleinen Umschlag (お年玉). Viele Geschäfte sind an den ersten Tagen geschlossen.',
    en: 'New Year is one of the most important holidays. People make the first shrine visit of the year (hatsumōde), eat special food (osechi) and children get money gifts in small envelopes (otoshidama). Many shops are closed during the first days.',
    words: 'お正月・初詣・お年玉',
  },
  // --- chapter 2: the valley
  farm_successor: {
    chapter: 2, title: '農家の後継ぎ', titleEn: 'Who takes over the farm?',
    de: 'Viele Bauern in Japan sind schon älter, der Durchschnitt liegt deutlich über 60. Oft fehlen Nachfolger, weil die jungen Leute in die Städte ziehen. Manche Betriebe werden deshalb von Zugezogenen oder Vereinen übernommen.',
    en: 'Many farmers in Japan are already old; the average age is well over 60. Successors are often missing because young people move to the cities. Some farms are taken over by newcomers or associations.',
    words: '農家・後継ぎ・高齢化',
  },
  omotenashi: {
    chapter: 2, title: 'おもてなし', titleEn: 'Omotenashi',
    de: 'Omotenashi heißt Gastfreundschaft ohne Gegenleistung zu erwarten. In einem Ryokan zeigt sich das in vielen kleinen Dingen: Der Gast wird begrüßt, die Schuhe werden gerichtet, das Zimmer ist schon vorbereitet.',
    en: 'Omotenashi means hospitality without expecting anything in return. In a ryokan it shows in many small things: the guest is greeted, shoes are put in order, the room is already prepared.',
    words: 'おもてなし・旅館・宿泊客',
  },
  onsen_manners: {
    chapter: 2, title: '温泉のマナー', titleEn: 'Onsen etiquette',
    de: 'Vor dem Bad wäscht man sich gründlich und betritt das Becken ohne Kleidung. Das kleine Handtuch kommt nicht ins Wasser. Manche Onsen schränken Tätowierungen ein; am besten vorher nachfragen. Im Ryokan trägt man danach oft einen Yukata.',
    en: 'Before bathing you wash thoroughly and enter the bath without clothes. The small towel stays out of the water. Some onsen restrict tattoos, so it is best to ask first. In a ryokan people often wear a yukata afterwards.',
    words: '温泉・浴衣・マナー',
  },
  shodo: {
    chapter: 2, title: '書道', titleEn: 'Shodō',
    de: 'Kalligrafie (書道) ist eine Kunst, aber auch Schulfach: Kinder üben in der Grundschule das Schreiben mit Pinsel. Beim Schreiben zählt nicht nur die Form, sondern auch Strichfolge, Rhythmus und innere Ruhe.',
    en: 'Calligraphy (shodō) is an art but also a school subject: children practise writing with a brush in primary school. Not only the shape counts, but also stroke order, rhythm and calm.',
    words: '書道・筆・墨',
  },
  // --- chapter 3: Yukimi
  gassho: {
    chapter: 3, title: '合掌造り', titleEn: 'Gasshō-zukuri houses',
    de: 'Die steilen Strohdächer sind für schweres Schneegewicht gebaut. Ein neues Dach zu decken ist Gemeinschaftsarbeit: Das ganze Dorf hilft mit (結, „yui“). Einige solcher Dörfer sind heute Welterbe und stark vom Tourismus abhängig.',
    en: 'The steep thatched roofs are built for heavy snow. Re-thatching a roof is community work: the whole village helps (結, “yui”). Some such villages are now World Heritage sites and depend heavily on tourism.',
    words: '合掌造り・茅葺き・結',
  },
  health_insurance: {
    chapter: 3, title: '診療所と保険', titleEn: 'Clinics and insurance',
    de: 'Wer in Japan lebt, ist in der Regel krankenversichert und zahlt bei Behandlungen nur einen Teil selbst. Auf dem Land fehlt es oft an Ärzten, und manche Dörfer haben nur noch eine kleine Klinik mit wenigen Sprechzeiten.',
    en: 'People living in Japan are generally covered by health insurance and pay only part of the treatment themselves. In the countryside doctors are often scarce, and some villages have only a small clinic with few opening hours.',
    words: '診療所・保険証・受付',
  },
  aging: {
    chapter: 3, title: '高齢化', titleEn: 'An ageing society',
    de: 'Japan hat eine der ältesten Bevölkerungen der Welt, knapp ein Drittel der Menschen ist über 65. In manchen Dörfern ist es noch mehr; man spricht von „Grenzdörfern“ (限界集落), die ohne Zuzug auszusterben drohen.',
    en: 'Japan has one of the oldest populations in the world; almost a third of people are over 65. In some villages it is even more; people speak of “marginal villages” (genkai shūraku) that may die out without newcomers.',
    words: '高齢化・限界集落・過疎',
  },
  akiya: {
    chapter: 3, title: '空き家', titleEn: 'Empty houses',
    de: 'In Japan stehen viele Häuser leer, vor allem auf dem Land, weil Besitzer weggezogen oder gestorben sind und Erben nicht einziehen wollen. Manche Gemeinden vermitteln solche Häuser günstig an Zuzügler (空き家バンク).',
    en: 'Many houses in Japan stand empty, especially in the countryside, because owners moved away or died and heirs do not want to move in. Some municipalities offer such houses cheaply to newcomers (akiya banks).',
    words: '空き家・移住・過疎',
  },
  matsuri: {
    chapter: 3, title: '祭りと担い手', titleEn: 'Festivals need people',
    de: 'Dorffeste (祭り) leben von Freiwilligen, die Wochen vorher vorbereiten, tragen und aufräumen. Wenn weniger junge Leute im Dorf leben, wird es schwer, solche Bräuche weiterzugeben; manchmal helfen Besucher oder Zugezogene mit.',
    en: 'Village festivals (matsuri) depend on volunteers who prepare, carry and clean up. When fewer young people live in the village it becomes hard to pass such customs on; sometimes visitors or newcomers help.',
    words: '祭り・伝統・行事',
  },
  // --- chapter 4: Shiomi
  fishery: {
    chapter: 4, title: '漁協と漁師', titleEn: 'Fishing cooperatives',
    de: 'Fischer sind oft in einer Genossenschaft (漁協) organisiert, die Fanggebiete, Zeiten und Verkauf regelt. Die Zahl der Fischer sinkt seit Jahrzehnten, und viele Häfen suchen Nachwuchs und neue Einnahmen, etwa durch Tourismus.',
    en: 'Fishers are often organised in a cooperative (gyokyō) that regulates fishing grounds, seasons and sales. The number of fishers has been falling for decades, and many harbours look for new blood and new income, such as tourism.',
    words: '漁協・漁師・水揚げ',
  },
  omiyage: {
    chapter: 4, title: 'お土産', titleEn: 'Omiyage',
    de: 'Wer verreist, bringt Kollegen, Familie und Freunden ein kleines Mitbringsel mit, meist etwas Regionales und einzeln Verpacktes zum Teilen. Deshalb sind Spezialitäten (名物) wie Zitronen oder Tintenfisch für Orte wie Shiomi wichtig.',
    en: 'When people travel they bring a small souvenir for colleagues, family and friends, usually something regional and individually wrapped for sharing. That is why specialities (meibutsu) such as lemons or squid matter to places like Shiomi.',
    words: 'お土産・名物・観光客',
  },
  school_closing: {
    chapter: 4, title: '廃校', titleEn: 'Closed schools',
    de: 'Weil weniger Kinder geboren werden und junge Familien wegziehen, schließen besonders auf dem Land viele Schulen. Die Gebäude werden manchmal zu Cafés, Museen oder Gemeindehäusern umgebaut.',
    en: 'Because fewer children are born and young families move away, many schools close, especially in the countryside. The buildings are sometimes turned into cafés, museums or community centres.',
    words: '廃校・少子化・卒業',
  },
  retirement: {
    chapter: 4, title: '引退と生きがい', titleEn: 'Retirement and ikigai',
    de: 'Viele Ältere in Japan arbeiten über das Rentenalter hinaus weiter, aus Geldgründen oder weil die Arbeit ihrem Leben Sinn gibt (生きがい). Wenn jemand aufhört, fehlt oft nicht nur das Einkommen, sondern auch eine Aufgabe und Gemeinschaft.',
    en: 'Many older people in Japan keep working past retirement age, for money or because work gives their life meaning (ikigai). When someone stops, what is missing is often not only income but also a role and a community.',
    words: '引退・生きがい・定年',
  },
  rural_transport: {
    chapter: 4, title: '地方の交通', titleEn: 'Rural transport',
    de: 'Auf dem Land fahren Busse und Fähren immer seltener, manche Linien wurden ganz eingestellt. Ohne Auto ist man dort schnell eingeschränkt, was gerade Ältere trifft, die nicht mehr fahren sollten oder wollen.',
    en: 'In the countryside buses and ferries run less and less, and some lines have been stopped altogether. Without a car you are quickly limited, which hits older people especially when they should not or do not want to drive any more.',
    words: '定期船・路線バス・廃止',
  },
  // --- chapter 5: Kyoto
  overtourism: {
    chapter: 5, title: 'オーバーツーリズム', titleEn: 'Overtourism',
    de: 'In beliebten Orten wie Kyoto kann es zu viele Besucher auf einmal geben: volle Busse, Gedränge in schmalen Gassen, Fotografieren vor privaten Häusern. Anwohner leiden darunter, viele Geschäfte leben aber von den Gästen. Gemeinden bitten deshalb um Rücksicht und lenken Besucherströme.',
    en: 'Popular places like Kyoto can get too many visitors at once: crowded buses, jostling in narrow lanes, photos in front of private homes. Residents suffer from it, yet many shops live off the guests. Towns therefore ask for consideration and try to steer the crowds.',
    words: 'オーバーツーリズム・混雑・迷惑',
  },
  honne_tatemae: {
    chapter: 5, title: '本音と建前', titleEn: 'Honne and tatemae',
    de: 'Tatemae ist, was man offiziell oder höflich sagt, honne das, was man wirklich denkt. Oft sagt man etwas Unverbindliches, um Streit zu vermeiden. Das ist keine Lüge, sondern Rücksicht, und man lernt, zwischen den Zeilen zu lesen (空気を読む). Nicht jeder Japaner redet gleich indirekt; es hängt von Person und Situation ab.',
    en: 'Tatemae is what you say officially or politely, honne what you really think. People often say something non-committal to avoid conflict. It is not lying but consideration, and you learn to read between the lines (kūki o yomu). Not every Japanese person is equally indirect; it depends on the person and the situation.',
    words: '本音・建前・空気を読む・遠回し',
  },
  machiya_stay: {
    chapter: 5, title: '町家の宿', titleEn: 'Machiya guesthouses',
    de: 'Viele alte Holzhäuser (町家) in Kyoto werden zu kleinen Gästehäusern, Cafés oder Läden umgebaut. So bleibt das Haus erhalten, aber das Viertel verändert sich: Weniger Nachbarn wohnen dort. Manche Städte haben Regeln für Gästehäuser aufgestellt.',
    en: 'Many old wooden houses (machiya) in Kyoto are converted into small guesthouses, cafés and shops. That keeps the house standing but changes the neighbourhood: fewer neighbours live there. Some cities have set rules for guesthouses.',
    words: '町家・景観・住民',
  },
  kimono_rental: {
    chapter: 5, title: '着物レンタル', titleEn: 'Kimono rental',
    de: 'In Touristenorten kann man Kimono leihen und darin spazieren gehen. Das ist bei vielen beliebt, wird aber unterschiedlich gesehen: Einige freuen sich, andere sorgen sich um Rücksicht auf Anwohner. Verleihläden sind oft ein Job für Studenten.',
    en: 'In tourist towns you can rent a kimono and stroll in it. It is popular, but seen in different ways: some are glad, others worry about consideration for residents. Rental shops are often a student part-time job.',
    words: '着物・貸衣装・アルバイト',
  },
  tabearuki: {
    chapter: 5, title: '食べ歩き', titleEn: 'Eating while walking',
    de: 'In Japan gilt es oft als unhöflich, beim Gehen zu essen. In manchen Markt- und Touristengassen bitten Schilder deshalb darum, das Essen am Stand oder an einem Platz zu essen. Grund sind Gedränge, Abfall und Flecken auf Kleidung.',
    en: 'In Japan it is often considered impolite to eat while walking. In some market and tourist lanes, signs therefore ask you to eat at the stall or in a designated spot. The reasons are crowding, litter and stains on clothes.',
    words: '食べ歩き・ごみ・マナー',
  },
  inari_torii: {
    chapter: 5, title: '稲荷と鳥居', titleEn: 'Inari and torii',
    de: 'Inari-Schreine sind dem Gott der Ernte und des Geschäfts gewidmet; Füchse gelten als seine Boten. Die vielen roten Tore wurden von Menschen und Firmen gespendet; ihre Namen stehen auf den Pfosten. Viele Besucher gehen den Weg früh am Morgen, wenn es ruhiger ist.',
    en: 'Inari shrines are dedicated to the god of harvest and business; foxes are seen as his messengers. The many red gates were donated by people and companies, and their names are written on the posts. Many visitors walk the path early in the morning, when it is quieter.',
    words: '稲荷・鳥居・参拝',
  },
};

export function foundNotes(s: GameState): number {
  return Object.keys(NOTES).filter((id) => s.flags['note_' + id]).length;
}
