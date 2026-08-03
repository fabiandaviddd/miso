# Phase 2 – Konzept

**Arbeitstitel:** „Freiraum" *(Platzhalter – frei umbenennbar; „Freiraum" meint bewusst den Raum zum Durchatmen und die Legitimität, sich zurückzuziehen.)*
**Stand:** 3. August 2026 · baut auf `01_recherche.md` und den 8 Design-Prinzipien auf.

**Festgelegter Rahmen (aus Auftrag + Rückfragen):** Sprache Deutsch · dunkle Grüntöne · Smartphone-first, als PWA installierbar · Daten bleiben lokal, kein Konto, kein Server · unterstützt statt behandelt · Ton: ruhig, respektvoll, nie belehrend – die Gegenstimme zu „stell dich nicht so an". · **Keine Trigger-Sounds** in der App (nur beruhigende/maskierende Klänge, streng opt-in). · **KI = BYOK** (eigener API-Schlüssel), optionales Modul **nach** dem Kern.

---

## Leitbild in einem Satz
Ein ruhiger Begleiter, der **sich selbst kennenlernt an dem, der ihn nutzt** – und der im Trigger-Moment in einem Fingertipp da ist, ohne je zu urteilen.

Drei Wahrheiten aus der Recherche tragen alles:
1. **Trigger sind hochindividuell und wandeln sich** → die App fragt und wächst mit (auditiv **und visuell/Misokinesie und antizipatorisch** – z. B. jemanden Kaugummi kauen *sehen*, weil man weiß, man *könnte* es hören).
2. **Das zweite Leid ist das Nicht-geglaubt-Werden** → Validierung ist Kern, nicht Deko.
3. **Der Trigger-Moment = maximale Not, minimale Aufnahmefähigkeit** → Akut-Hilfe muss ein Tap sein; alles Komplexe lebt in ruhigen Momenten.

---

## 1. Onboarding als Kernstück – „Kennenlernen", kein Formular

Prinzip: Das Onboarding **gibt zuerst, bevor es fragt**, ist selbst schon misophonie-sensibel (still, eine Sache pro Screen, nichts erzwungen) und macht am Ende *sichtbar*, wie es die App umgeformt hat.

**Ablauf (kurzer Kern, ~6–8 sanfte Schritte, jederzeit pausierbar):**
1. **Ankommen, nicht abfragen.** Erster Screen ist eine Aussage, kein Feld: *„Was du erlebst, ist real. Hier musst du dich nicht erklären oder rechtfertigen."* Dazu die Zusage: alles bleibt auf diesem Gerät, du kannst alles überspringen und später ändern.
2. **Wie sollen wir uns anreden?** (Name/Spitzname optional, per Tippen *oder Diktat*.)
3. **Was brauchst du gerade am meisten?** → *Hilfe im Moment · Verstehen & Ruhe über Zeit · ein Tagebuch für meine:n Therapeut:in · weiß ich noch nicht.* (Mehrfachauswahl möglich.) — **steuert, was die App in den Vordergrund stellt.**
4. **Was löst bei dir aus?** Sanfte, tippbare Chips – **getrennt nach Hören / Sehen / „schon der Gedanke daran"** (Kauen, Schmatzen, Luft einziehen, Schlucken, Räuspern, Tippen/Klicken, Kaugummi … · jemanden kauen *sehen*, Wippen/Zappeln, Kaugummi sehen · „ich lauere schon, bevor es kommt") + eigenes Hinzufügen (Text/Diktat). Keine Geräuschbeispiele, kein Ton.
5. **Wo ist es am schwersten?** (Essen mit anderen · Arbeit/Büro · Bus & Bahn · zu Hause/Familie · Videocalls · …) — füllt die „Vorbereiten"-Karten vor.
6. **Wie tickst du?** *Magst du Struktur und Abhaken – oder stresst dich das eher?* — **das schärfste Adaptivitäts-Signal:** entscheidet, ob Routine/Checklisten überhaupt erscheinen.
7. **Was hilft dir jetzt schon?** (Rausgehen · Kopfhörer/Maskieren · Atmen · Ablenkung · noch nichts gefunden) — bestückt die Notfall-Hilfe mit *seinen* Mitteln zuerst.
8. **Spiegel & Freigabe.** *„Weil dir **Hilfe im Moment** am wichtigsten ist, lege ich den Notfall-Knopf in die Mitte und halte den Rest schlank. Das Tagebuch ist da, wenn du es willst – nicht als Pflicht. Du kannst das jederzeit ändern."*

**Progressive Vertiefung statt Mammut-Fragebogen:** Der Kern reicht, um die App zu formen; alles Weitere lernt sie *über die Zeit* aus (freiwilligen) Journal-Einträgen. Man kann das Kennenlernen jederzeit erneut öffnen und nachjustieren.

---

## 2. Adaptivität – wie das Ergebnis die App konkret umformt

Prinzip: **Anpassung durch Priorität, nicht durch Löschen.** Nichts verschwindet endgültig – die App entscheidet nur, was *vorn* steht. Alles bleibt über „Mehr" erreichbar, und das Kennenlernen ist jederzeit anpassbar.

| Antwort im Onboarding | Was die App tut |
|---|---|
| Bedürfnis = **Hilfe im Moment** | Start = großer Notfall-Knopf; Übungen/Journal treten zurück |
| Bedürfnis = **Verstehen & Ruhe** | Start = Psychoedukation + ruhige Übungen; Notfall bleibt präsent, aber sekundär |
| Bedürfnis = **Journal für Therapie** | Start = Tages-Check-in + Export; klinik-begleitender Rahmen |
| Mehreres gewählt | Start mit zwei klaren Zonen: **Im Moment** / **Auf Dauer** |
| Struktur/Abhaken = **ja** | sanfte Tages-Routine-Karte + Checklisten (ohne Streaks, ohne Schuld) |
| Struktur = **stresst mich** | Routine/Checklisten werden **ganz ausgeblendet** – nur Werkzeuge auf Abruf |
| Schwere Situationen | „Vorbereiten"-Karten dieser Situationen zuerst |
| Trigger-Set | Journal-Chips & Notfall-„Warum" mit *diesen* Triggern vorbelegt |
| Visuelle Trigger dabei | Sprache & Werkzeuge decken auch Sehen ab (wegschauen, umdeuten), nicht nur Maskieren |

**Adaptivität über die Zeit (behutsam):** Erkennt die App Muster im Journal (z. B. „oft abends", „oft beim Essen"), *bietet* sie passende Werkzeuge an – nie Nörgeln, nie Diagnose. Zeigen die Einträge über längere Zeit anhaltend hohe Belastung (4–5) oder starke Not, taucht **respektvoll** der Hinweis auf professionelle/Krisen-Hilfe auf (P8) – ruhig formuliert, nie alarmistisch.

---

## 3. Kernfunktionen – abgeleitet aus der Recherche

Die App hat zwei Modi entlang „Not vs. Ruhe" (JITAI):

### A) Im Moment (Akut) – ein Tap, große Flächen, eine Aktion pro Screen
Ein **persistenter Notfall-Knopf** (immer an fester Stelle). Er öffnet ruhig und still die *vom Nutzer vorgewählten* Sofort-Werkzeuge:
- **Atem-Anker** – visueller Taktgeber, lange Ausatmung (still; Ton nur, wenn aktiviert).
- **Grounding 5-4-3-2-1** – geführt, ein Sinn pro Screen.
- **„Raus hier" – Rausgehen ist erlaubt.** Validierender Mikro-Text + fertige Sätze zum Sich-Entschuldigen („Ich brauche kurz frische Luft"). Nimmt Scham *und* den sozialen Zwang.
- **Umdeuten** – „Das Geräusch ist nicht gegen dich gerichtet." (kognitive Reattribuierung).
- **Die Welle reiten (Urge Surfing)** – kurzer Guide: der Impuls steigt und ebbt ab.
- **Selbstmitgefühl-Karte** – *„Das ist eine körperliche Reaktion, kein Charakterfehler."*
- **Maskierung** (nur wenn Sound opt-in) – beruhigender Klang, startet erst auf Tipp, Fade-in; als Werkzeug gerahmt, nicht als Dauer-Kokon (P5).

Danach *optional* und überspringbar: „Kurz festhalten?" → Ein-Tipp-Eintrag ins Journal.

### B) Auf Dauer (ruhige Momente) – hier lebt der reichere Inhalt
- **Verstehen** – kurze, validierende Psychoedukation (was Misophonie/Misokinesie ist; „es hat einen Namen, du bist nicht allein"). Kein Lehrbuch.
- **Übungen/Skills** – *ausschließlich* nicht-expositionsbasiert (P6): Aufmerksamkeit lenken, umdeuten, Entspannung/PMR, Achtsamkeit/Akzeptanz, Selbstmitgefühl. Als Angebot, nie als Hausaufgabe.
- **Vorbereiten** – Situations-Karten für *seine* schweren Settings + **Kommunikations-Skripte** für Angehörige (im ruhigen Moment ansprechen, Ich-Botschaften) + eine teilbare **„Das-ist-Misophonie"-Karte** für Umfeld/Arbeit/Schule.
- **Tagebuch** *(dein Wunsch, Kernfunktion)* – Tageseintrag in Sekunden: **Symptomstärke 1–5**, Trigger (Chips + frei/Diktat), Situation/Kontext, **„was hat geholfen"**, optionale Notiz. Dazu **Export** (PDF/Text) für die Therapie und ein schlichter **Wochen-Überblick**. *Leitplanken gegen Hypervigilanz:* optional statt Pflicht, kein Streak/kein Nörgeln, immer auch „was half" – der Blick geht nach außen, nicht in die Grübelschleife.
- **Routine** – nur wenn gewünscht: ein sanfter Tagesanker, ohne Schuld-Mechanik.

### Übergreifend
- **Hilfe holen** – immer erreichbar: respektvolle Verweise auf professionelle Hilfe + Krisen-Kontakte (z. B. Telefonseelsorge 0800 111 0 111).
- **Kennenlernen anpassen** – Onboarding jederzeit erneut/feiner.

### KI-Modul (später, BYOK, opt-in, standardmäßig aus)
- **Wissens-Chat** zu Misophonie/Misokinesie – sendet **keine** persönlichen Journal-Daten; nutzt den eigenen Schlüssel; klar gekennzeichnet: informierend, keine Therapie, kann irren.
- **Wochen-Zusammenfassung (Politur)** – fasst das lokale Journal für die Therapie zusammen. **Funktioniert immer auch ohne KI** (strukturierter Export); mit KI gehen die Daten nur auf ausdrückliche Aktion direkt vom Gerät zum Anbieter.

---

## 4. Technische Architektur & Datenhaltung

- **Reine statische PWA** – **kein Backend**, hostbar auf jedem statischen Host (z. B. GitHub Pages/Netlify). Installierbar (Manifest + Service Worker), **offline nutzbar**.
- **Stack:** schlankes **Vanilla JS/HTML/CSS** ohne Build-Schritt und ohne Framework-Abhängigkeiten – robust, langlebig, keine Lieferketten-/Build-Fragilität. Design-System (dunkle Grüntöne) über CSS-Variablen.
- **Datenhaltung: nur lokal.** Profil/Konfiguration + Journal in **IndexedDB** (kleiner Wrapper), kleine Flags in localStorage. Kein Konto, keine Cloud-Sync, keine Analytics, keine Tracker.
- **Backup/Restore (ehrliche Konsequenz von „nur lokal"):** manuelles **Export/Import als JSON** – geht das Gerät verloren, sind sonst alle Daten weg. Der Nutzer behält die Hoheit und kann selbst sichern.
- **KI (BYOK):** eigener Schlüssel, lokal gespeichert (mit klarer Warnung), Direktaufruf des Anbieters aus dem Browser. Kein Server von uns. Vollständig optional und entfernbar.
- **Sicherheit/Ethik:** sichtbarer, unaufdringlicher Hinweis „keine Diagnose/Behandlung", Krisen-Infos, respektvolle Eskalation bei Anzeichen starker Belastung.

---

## 5. Prägende Entscheidungen – zur Diskussion

1. **Zwei-Modi-Rückgrat (Akut / Auf Dauer).** *Begründung:* JITAI – im Trigger-Moment zählt nur ein Tap; Wissen gehört in ruhige Momente. *Trade-off:* zwei Einstiege statt einem – gelöst durch die adaptive Startseite.
2. **Adaptivität durch Priorität, nicht Löschen.** *Begründung:* echte Anpassung ohne Bevormundung; nichts geht verloren. *Trade-off:* Ausgeblendetes ist weniger auffindbar → über „Mehr" + jederzeit anpassbares Kennenlernen abgefedert.
3. **Onboarding = kurzer Kern + lebenslanges Mitlernen.** *Begründung:* lange Fragebögen killen die Nutzung (Recherche). *Trade-off:* anfangs weniger Vorwissen → durch progressive Vertiefung ausgeglichen.
4. **Journal mit Leitplanken + manuelles Backup.** *Begründung:* dein Wunsch + klinischer Nutzen, aber ~20 % Hypervigilanz-Risiko → optional, coping-zentriert, kein Nörgeln. Backup als Preis von „nur lokal".
5. **Keine Trigger-Sounds; Maskierung nur opt-in.** *Begründung:* Misophonie habituiert nicht, Exposition kann schaden (P4/P6).
6. **KI = BYOK, opt-in, nach dem Kern; Zusammenfassung immer auch ohne KI.** *Begründung:* dein Datenschutz-Rahmen bleibt zu 100 % gewahrt (kein eigener Server).
7. **Tech: statische Vanilla-PWA + IndexedDB, kein Backend.** *Begründung:* deploy-freundlich, langlebig, maximal privat.
8. **Arbeitstitel „Freiraum".** Platzhalter – sag gern, wenn du einen anderen Namen willst.

---

*Nach deiner Freigabe: Phase 3 – vollständige Implementierung des Kerns (Onboarding, adaptive Startseite, Notfall-Hilfe, Übungen/Vorbereiten, Journal + Export, PWA/Offline), dann Übergabe-Doku + Test-Anleitung für die betroffene Person. Das KI-Modul folgt als opt-in Nachrüstung.*
