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
};

export function foundNotes(s: GameState): number {
  return Object.keys(NOTES).filter((id) => s.flags['note_' + id]).length;
}
