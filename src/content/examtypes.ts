/** JLPT N2 task types with Maria's notes (was gefragt wird / Vorgehen). `inGame` = practice section id. */
export interface ExamType {
  area: 'Vokabeln' | 'Grammatik' | 'Lesen' | 'Hören';
  type: string;
  what: string;
  how: string;
  inGame?: string;
}

export const EXAM_TYPES: ExamType[] = [
  { area: 'Vokabeln', type: '漢字読み', what: 'Lesung eines Kanji-Worts', how: 'auf lange Vokale, kleines っ und Stimmhaftwerdung achten', inGame: '漢字読み' },
  { area: 'Vokabeln', type: '表記', what: 'richtiges Kanji für ein Hiragana-Wort', how: 'gleich klingende Kanji über die Bedeutung unterscheiden' },
  { area: 'Vokabeln', type: '語形成', what: 'Vor- oder Nachsilbe ergänzen', how: 'Präfix- und Suffixlisten in der Notizbuch-Ansicht „語形成“ lernen', inGame: '語形成' },
  { area: 'Vokabeln', type: '文脈規定', what: 'passendes Wort für die Lücke', how: 'typische Wortverbindungen prüfen, Satz bis zum Ende lesen', inGame: '文脈規定' },
  { area: 'Vokabeln', type: '言い換え類義', what: 'Wort mit gleicher Bedeutung', how: 'Alternative in den Satz einsetzen und prüfen, ob er gleich bleibt', inGame: '言い換え類義' },
  { area: 'Vokabeln', type: '用法', what: 'Satz, in dem das Wort richtig steht', how: 'jede Option auf Wortverbindung und Stimmigkeit prüfen' },
  { area: 'Grammatik', type: '文法形式の判断', what: 'passende Grammatikform', how: 'Satzende, Anschluss und Gesamtbedeutung zusammen betrachten', inGame: '文法形式の判断' },
  { area: 'Grammatik', type: '文の組み立て', what: 'Wörter in die richtige Reihenfolge, ★ einsetzen', how: 'feste Verbindungen zuerst bilden, am Ende den ★-Platz ablesen', inGame: '文の組み立て' },
  { area: 'Grammatik', type: '文章の文法', what: 'Lücken in einem Text', how: 'ganzen Absatz lesen, auf Konjunktionen und Bezugswörter achten' },
  { area: 'Lesen', type: '内容理解 (短文)', what: 'kurze Texte, Hauptaussage', how: 'zuerst die Frage lesen, dann den Text', inGame: '読解' },
  { area: 'Lesen', type: '内容理解 (中文)', what: 'mittellange Texte, unterstrichene Stellen', how: 'Begründung vor oder nach der Stelle im Text suchen' },
  { area: 'Lesen', type: '統合理解', what: 'zwei Texte vergleichen', how: 'Gemeinsamkeiten und Unterschiede festhalten' },
  { area: 'Lesen', type: '主張理解 (長文)', what: 'Meinung des Autors in langem Text', how: 'Einleitung und Schluss gesondert beachten' },
  { area: 'Lesen', type: '情報検索', what: 'Informationen in Anzeigen, Tabellen, Broschüren', how: 'Bedingungen der Aufgabe markieren und gegen den Text abgleichen' },
  { area: 'Hören', type: '課題理解', what: 'was die Person als Nächstes tun muss', how: 'auf Änderungen im Gespräch achten („erst A, doch lieber B“)', inGame: '聴解' },
  { area: 'Hören', type: 'ポイント理解', what: 'Kernpunkt, Grund oder Absicht', how: 'Frage zuerst verstehen, Schlüsselwörter merken' },
  { area: 'Hören', type: '概要理解', what: 'Gesamtthema, Absicht des Sprechers', how: 'auf das Ganze achten, nicht auf Einzelheiten' },
  { area: 'Hören', type: '即時応答', what: 'kurze Frage, passende Antwort', how: 'Wendung und Höflichkeitsstufe beachten, nicht wörtlich übersetzen' },
  { area: 'Hören', type: '統合理解', what: 'mehrere Informationen vergleichen', how: 'Meinungen und Daten gegenüberstellen' },
];

export const tipFor = (section: string) => EXAM_TYPES.find((t) => t.inGame === section);
