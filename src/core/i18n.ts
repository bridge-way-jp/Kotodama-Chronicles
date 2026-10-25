import { DE } from '../content/de';
import { DE_STORY } from '../content/de_story';
import { store } from './store';

/** German for the fixed English lines of the learning screens (instructions, feedback). */
const UI: Record<string, string> = {
  'Words you mixed up — which one means this?': 'Verwechselte Wörter – welches bedeutet das?',
  'Words you mixed up — which one fits the blank?': 'Verwechselte Wörter – welches passt in die Lücke?',
  'Listen. Which word goes in the gap?': 'Hör zu. Welches Wort gehört in die Lücke?',
  'How is this word read?': 'Wie wird dieses Wort gelesen?',
  'Which word matches this meaning?': 'Welches Wort passt zu dieser Bedeutung?',
  'Which word fits the blank?': 'Welches Wort passt in die Lücke?',
  'What does this sentence mean?': 'Was bedeutet dieser Satz?',
  'Listen. What does the sentence mean?': 'Hör zu. Was bedeutet der Satz?',
  'Type the reading in hiragana (romaji is converted automatically).': 'Schreib die Lesung in Hiragana (Romaji wird automatisch umgewandelt).',
  'What does this prefix / suffix mean?': 'Was bedeutet diese Vorsilbe / Nachsilbe?',
  'What does this word mean?': 'Was bedeutet dieses Wort?',
  'What does this pattern express?': 'Was drückt dieses Muster aus?',
  'Contrast drill — choose the pattern that fits. Watch the nuance!': 'Vergleichsübung – wähle das passende Muster. Achte auf die Nuance!',
  'Choose the expression that fits the blank.': 'Wähle den Ausdruck, der in die Lücke passt.',
  'Write the reading of the word in 【 】 (hiragana or romaji).': 'Schreib die Lesung des Wortes in 【 】 (Hiragana oder Romaji).',
  'How is the word in 【 】 read?': 'Wie wird das Wort in 【 】 gelesen?',
  'Correct': 'Richtig',
  'Not quite.': 'Nicht ganz.',
  'Not quite — try again.': 'Nicht ganz – versuch es noch mal.',
  'you picked another item. The difference:': 'du hast etwas anderes gewählt. Der Unterschied:',
  'Listen to the order…': 'Hör dir die Bestellung an…',
  'Announcements on the platform: delays, platform changes, the last train… Listen and pick which train on the board they mean.': 'Durchsagen am Bahnsteig: Verspätungen, Gleiswechsel, der letzte Zug… Hör zu und wähle, welchen Zug auf der Tafel sie meinen.',
  'Which train is arriving now?': 'Welcher Zug fährt gerade ein?',
  'Which train is delayed?': 'Welcher Zug hat Verspätung?',
  'Which train leaves from another platform today?': 'Welcher Zug fährt heute von einem anderen Gleis ab?',
  'Which one is the last train?': 'Welcher ist der letzte Zug?',
  'Read what you told the officer, then put the right card into each box of the form. Careful: some cards are almost the same.': 'Lies, was du dem Polizisten gesagt hast, und leg dann die richtige Karte in jedes Feld des Formulars. Vorsicht: Manche Karten sind fast gleich.',
  'Tap a box for this card.': 'Tippe ein Feld für diese Karte an.',
  'Tap a card, then a box. (Leave a box empty if you were not told.)': 'Tippe eine Karte an, dann ein Feld. (Lass ein Feld leer, wenn dir nichts dazu gesagt wurde.)',
  'once more': 'noch einmal',
  'That one did not sit yet. Here it is again in another form.': 'Das saß noch nicht. Hier kommt es noch einmal in anderer Form.',
  'quick check': 'kurzer Check',
  'Use what you just read.': 'Wende an, was du gerade gelesen hast.',
  'ticket check': 'Fahrkartenkontrolle',
  'Three words you have learned. Answer them to pass the gate.': 'Drei Wörter, die du gelernt hast. Beantworte sie, um durch die Sperre zu kommen.',
  'listen first': 'erst zuhören',
  'build your answer:': 'bau deine Antwort:',
  // the questions any Kotodama can ask in battle
  '…(The Kotodama is staring at you.)': '…(Das Kotodama starrt dich an.)',
  'A calm, friendly invitation is the most natural way to approach it.': 'Eine ruhige, freundliche Einladung ist die natürlichste Art, sich ihm zu nähern.',
  'Who are you…? Did you come to take my words?': 'Wer bist du…? Bist du gekommen, um meine Worte zu nehmen?',
  'Reassure it: you came to listen, not to take anything away.': 'Beruhige es: Du bist gekommen, um zuzuhören, nicht um etwas wegzunehmen.',
  '…I’m hungry.': '…Ich habe Hunger.',
  'Offering to share your food is the kind, natural reply.': 'Anzubieten, dein Essen zu teilen, ist die freundliche, natürliche Antwort.',
  'It’s cold here… I don’t want to be alone any more.': 'Hier ist es kalt… Ich will nicht mehr allein sein.',
  'It tells you it is lonely; inviting it along answers exactly that.': 'Es sagt dir, dass es einsam ist; es mitzunehmen, ist genau die Antwort darauf.',
  'Nobody calls my name any more.': 'Niemand ruft mehr meinen Namen.',
  'In this world, calling someone’s name is what keeps their words alive.': 'In dieser Welt hält das Rufen eines Namens die Worte dieses Wesens am Leben.',
  'You really won’t do anything scary…?': 'Du tust wirklich nichts Unheimliches…?',
  '約束する (I promise) answers its fear directly.': '約束する (ich verspreche es) geht direkt auf seine Angst ein.',
  'Hey, why are you studying Japanese?': 'Sag mal, warum lernst du Japanisch?',
  'An honest, open answer builds trust; the others shut the conversation down.': 'Eine ehrliche, offene Antwort schafft Vertrauen; die anderen würgen das Gespräch ab.',
  '…I’m tired. Can I rest for a bit?': '…Ich bin müde. Darf ich mich kurz ausruhen?',
  'もちろん (of course) plus a gentle ゆっくり休んでね is the caring reply.': 'もちろん (natürlich) plus ein sanftes ゆっくり休んでね ist die fürsorgliche Antwort.',
};

export const isDe = () => (store.state?.settings.meaningLang ?? 'de') === 'de';

const one = (s: string) => DE[s] ?? DE_STORY[s] ?? UI[s];

/** the German of one exact English text, if there is one */
export const lookupDe = (s: string): string | undefined => one(s);

/**
 * The German of an English learning text when the meaning language is German, else the text itself.
 * Composed texts are translated line by line and around " — ", and a Japanese lead-in ("もう一度！ …") is kept.
 */
export function tr<T extends string | undefined>(en: T, de = isDe()): T {
  if (!en || !de) return en;
  const whole = one(en.trim());
  if (whole) return whole as T;
  if (en.includes('\n')) return en.split('\n').map((l) => tr(l, true)).join('\n') as T;
  if (en.includes(' — ')) {
    const parts = en.split(' — ');
    const out = parts.map((p) => one(p.trim()) ?? p);
    if (out.some((p, i) => p !== parts[i])) return out.join(' — ') as T;
  }
  const lead = /^(\S*[^\x00-\x7F]\S*\s+)(.+)$/.exec(en);
  if (lead) {
    const rest = one(lead[2].trim());
    if (rest) return (lead[1] + rest) as T;
  }
  return en;
}
