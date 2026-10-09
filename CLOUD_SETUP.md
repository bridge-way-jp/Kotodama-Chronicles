# Cloud-Spielstand einrichten (Firebase, kostenlos)

Etwa 10 Minuten, einmalig. Du brauchst nur ein Google-Konto. Der kostenlose „Spark“-Tarif reicht, eine Kreditkarte ist nicht nötig.

1. **Projekt anlegen:** <https://console.firebase.google.com> → „Projekt erstellen“ → Name z. B. `kotodama-chronicles` → Google Analytics **aus** → erstellen.
2. **Web-App registrieren:** In der Projektübersicht auf das Symbol `</>` (Web) klicken → Spitzname `kotodama` → *Firebase Hosting nicht anhaken* → „App registrieren“.
   Es erscheint ein Code-Block mit `const firebaseConfig = { apiKey: …, authDomain: …, projectId: …, … }`.
   **Diesen Block an Claude schicken.** Die Werte sind nicht geheim; geschützt wird alles über die Regeln aus Schritt 5.
3. **Google-Login einschalten:** Linkes Menü → *Build* → *Authentication* → „Jetzt starten“ → Reiter *Sign-in method* → **Google** → aktivieren → Support-E-Mail auswählen → Speichern.
4. **Domain erlauben:** *Authentication* → Reiter *Settings* → *Authorized domains* → „Add domain“ → `bridge-way-jp.github.io`.
5. **Datenbank anlegen:** *Build* → *Firestore Database* → „Datenbank erstellen“ → Standort `europe-west3 (Frankfurt)` → **Produktionsmodus** → erstellen.
   Danach den Reiter *Regeln* öffnen. Den Inhalt der Datei [`firestore.rules`](firestore.rules) hineinkopieren und **`DEINE-GOOGLE-EMAIL@gmail.com` durch die Google-Adresse ersetzen, mit der gespielt wird**. Danach „Veröffentlichen“.

Fertig. Im Spiel gibt es dann auf dem Titelbildschirm „☁ Mit Google anmelden“. In den Einstellungen findest du den Bereich „☁ Cloud“.

## So funktioniert es

- Gespeichert wird weiterhin sofort im Browser. Zusätzlich lädt das Spiel den Stand spätestens alle 20 Sekunden in die Cloud hoch, und sofort, wenn du die App schließt oder wechselst.
- Auf einem neuen Gerät: anmelden → „☁ Continue (cloud)“.
- Wenn zwei Geräte unabhängig weitergespielt haben, wird **nichts überschrieben**. Du wählst in den Einstellungen, welcher Stand gilt. Der ersetzte Stand bleibt als Sicherung in der Cloud.
- **Später für alle Spieler:** In `firestore.rules` die Zeile mit der E-Mail-Liste löschen. Dann bekommt jedes Google-Konto seinen eigenen, getrennten Spielstand.
