# Phase 3 – Übergabe-Doku (MisoNIE)

**Stand:** 3. August 2026 · Branch `claude/misophonie-webapp-research-hkudia` im Repo `fabiandaviddd/miso`.

MisoNIE ist eine installierbare Web-App (PWA) für einen Menschen mit Misophonie. Sie **unterstützt** — sie behandelt und diagnostiziert nicht. Grundlage sind die Recherche (`01_recherche.md`) und das Konzept (`02_konzept.md`).

---

## 1. Was drin ist (v1, der „Kern")

- **Onboarding als Kennenlernen** — validierend, still, eine Sache pro Schritt; erfasst Bedürfnisse, Trigger (Hören / Sehen / „schon der Gedanke"), Situationen, Struktur-Vorliebe und was schon hilft. Am Ende zeigt es, wie es die App umgebaut hat.
- **Adaptive Startseite** — Reihenfolge & Sichtbarkeit richten sich nach dem Onboarding (z. B. Notfall-Hero nur bei Bedürfnis „Hilfe im Moment"; Tagesanker nur, wenn Struktur gewünscht; Tagebuch vorn, wenn dafür gewählt).
- **Notfall-Hilfe („Jetzt Hilfe")** — Vollbild, ruhig, ein Tap: Atem-Anker, „Raus hier" (mit fertigen Sätzen), Ankommen (5-4-3-2-1), Ruhe-Klang, Die Welle reiten, Umdeuten, Freundlich zu dir. Danach optional „Kurz festhalten".
- **Verstehen** — kurze, validierende Psychoedukation.
- **Vorbereiten** — Situations-Karten (eigene zuerst), Kommunikations-Skripte, teilbare „Das-ist-Misophonie"-Karte.
- **Tagebuch** — Tageseintrag (Stärke 1–5, Auslöser, Kontext, „was hat geholfen", Notiz), Wochenüberblick, **Export für die Therapie** (Drucken/PDF + Textdatei). Leitplanken: optional, kein Streak, „was half" immer dabei.
- **Mehr** — Name, Ruhe-Klang, Notfall-Werkzeuge wählen, Kennenlernen neu durchgehen, **Backup/Restore (JSON)**, Datenschutz-Hinweis, Alles löschen.
- **Hilfe holen** — respektvoller Verweis auf professionelle & Krisen-Hilfe (Telefonseelsorge, Notruf); taucht bei anhaltend hoher Belastung behutsam von selbst auf.
- **PWA** — installierbar, offline nutzbar, dunkle Grüntöne, Icons.

---

## 2. Architektur

Bewusst **ohne Framework, ohne Build-Schritt** — reines HTML/CSS/JS mit ES-Modulen. Das macht die App langlebig, transparent und überall (statisch) hostbar.

```
index.html              PWA-Shell
manifest.webmanifest    PWA-Manifest (Name, Icons, Farben)
service-worker.js       Offline-Cache (Version in CACHE hochzählen bei Updates)
css/styles.css          Design-System (dunkle Grüntöne, CSS-Variablen)
js/
  app.js                Zustand, Router (Hash), Shell, konstante Navigation, SW-Registrierung
  ui.js                 DOM-Helfer (sicheres Escaping), Toast, Haptik
  data.js               Alle Inhalte (Trigger, Situationen, Übungen, Skripte, Krisen-Kontakte, Texte)
  store.js              IndexedDB: Profil + Tagebuch, Export/Import, Löschen
  onboarding.js         Kennenlernen + Ableitung der Konfiguration
  home.js               Adaptive Startseite
  sos.js                Notfall-Hilfe + Werkzeuge + Ruhe-Klang (Web Audio, lokal erzeugt)
  learn.js / prepare.js / journal.js / settings.js / help.js   Views
icons/                  PNG-Icons (192/512/maskable/apple) — erzeugt von tools/gen_icons.py
tools/gen_icons.py      Reproduzierbarer Icon-Generator (nur Python-Standardbibliothek)
```

**Datenhaltung:** ausschließlich lokal in **IndexedDB** (`misonie`). Kein Konto, kein Server, keine Analytics, keine Tracker, keine externen Requests. Die App funktioniert offline.

**Ruhe-Klang:** wird zur Laufzeit als braunes Rauschen über die Web Audio API erzeugt (kein Audio-Asset, kein Nachladen). Startet nur auf ausdrücklichen Tipp — „Stille als Default".

---

## 3. Prägende Entscheidungen (Warum so?)

1. **Kein Framework/Build** → Langlebigkeit, keine Lieferketten-Fragilität, direkt deploybar.
2. **Local-first, IndexedDB** → maximaler Datenschutz für sensible Trigger-/Beziehungsdaten; deckt sich mit dem Vertrauensdefizit der Branche (BetterHelp/Mozilla).
3. **Manuelles Backup/Restore** → ehrliche Konsequenz aus „nur lokal": ohne Sicherung sind Daten bei Geräteverlust weg.
4. **Zwei-Modi (Akut/Auf Dauer) + konstante Navigation** → JITAI: im Trigger-Moment zählt ein Tap; Vorhersagbarkeit beruhigt.
5. **Keine Trigger-Sounds, keine Exposition** → Misophonie habituiert nicht; Exposition kann schaden (Fachkonsens).
6. **Tagebuch mit Leitplanken** → Nutzen fürs Therapiegespräch, aber Hypervigilanz-Risiko abgefedert (optional, kein Streak, „was half").
7. **Adaptivität durch Priorität, nicht Löschen** → echte Anpassung ohne Bevormundung; alles bleibt erreichbar, Kennenlernen jederzeit anpassbar.

---

## 4. Offene Punkte / bewusst später

- **KI-Modul (als Nächstes, optional, BYOK).** Laut Freigabe „Kern zuerst". Geplant: (a) Wissens-Chat zu Misophonie/Misokinesie (sendet nichts Persönliches); (b) Wochen-Zusammenfassung fürs Therapiegespräch. Beides über einen **eigenen API-Schlüssel** der Person (direkt vom Gerät zum Anbieter, kein Server von uns). Die Wochen-Zusammenfassung gibt es **schon jetzt ohne KI** als Export — die KI wäre nur die „Politur". Andockpunkte im Code: neues `js/ai.js` + Einstiege in `settings.js` (Schlüssel) und `journal.js` (Zusammenfassung).
- **Trigger-/Erinnerungs-Logik.** Bewusst kein Push/keine Erinnerungen (Hypervigilanz-Schutz). Falls je gewünscht: nur opt-in, ohne Symptom-Abfragen.
- **Weitere Sprachen.** Aktuell nur Deutsch (wie vereinbart).
- **Testabdeckung.** Es gibt einen Browser-Smoke-Test (`tools/smoke-test` siehe unten), aber keine Unit-Tests — bei der schlanken, framework-losen Struktur bewusst leichtgewichtig gehalten.

---

## 4b. v1.1 — Änderungen nach dem ersten Nutzerinnen-Test

Nach 5 Minuten Test durch eine Betroffene kamen konkrete Rückmeldungen; alle umgesetzt:

- **Neue Kernfunktion „Mein Weg"** (`js/path.js`): langfristige Entwicklung in kleinen täglichen Schritten (1–3 Min.), individuell abgestimmt auf die im Onboarding gewählten Situationen; wöchentlich rotierender Skill-Fokus (Aufmerksamkeit, Körper, Umdeuten, Selbstmitgefühl, Situationen, Sprechen); ausdrücklich ohne Exposition und ohne Streaks. Übungs-Protokoll lokal (`practiceLog` in IndexedDB, im Backup enthalten). Neue Onboarding-Option „Langfristige Entwicklung" priorisiert den Bereich.
- **Eigene SVG-Icons statt Emojis** (`js/icons.js`): einheitliches, selbst gezeichnetes Linien-Icon-Set (24×24, currentColor) in der ganzen App.
- **iOS-Fixes:** Onboarding hat jetzt feste Höhe mit internem Scroll — der Weiter-Button ist immer sichtbar; mehr Abstand über der Tab-Leiste; die Tab-Leiste fängt nur noch Taps auf der Pille selbst (behebt: „Vorbereiten öffnete Jetzt Hilfe" — der unsichtbare Balkenbereich hatte Taps geschluckt).
- **Sprache:** Trigger-Frage heißt jetzt „Was sind deine Auslöser?"; „ohne Serie" → „ohne Streaks"; Tagebuch-„Kontext" → **„Situation"**; „Für die Therapie" → **„Datenexport"**.
- **Tagebuch erweitert:** mehr Situationen (Menschenmengen, Feiern & Events, Outdoor-Festival, Restaurant/Café, Einkaufen) inkl. neuer Vorbereiten-Karten; mehr „Was hat geholfen"-Optionen (Weggeschaut, Angesprochen, Mit jemandem geredet).
- Service-Worker-Cache auf `misonie-v2` (Bestandsinstallationen erhalten das Update beim nächsten Öffnen).

---

## 5. Lokal ausprobieren / weiterentwickeln

Die App braucht einen kleinen Webserver (wegen ES-Modulen & Service Worker; direktes Öffnen der Datei reicht nicht):

```bash
cd /pfad/zu/miso
python3 -m http.server 8137
# dann im Browser: http://127.0.0.1:8137/
```

Icons neu erzeugen (nur nötig, wenn das Motiv geändert wird):

```bash
python3 tools/gen_icons.py
```

**Getestet:** Ein automatischer Browser-Durchlauf (Chromium/Playwright) geht Onboarding → Startseite → Notfall-Hilfe → Tagebuch (Eintrag speichern) durch — **ohne Konsolen- oder Laufzeitfehler**. Getestet mobil (390×844).

---

## 6. Deploy (deploy-fähiger Stand)

Die App ist eine statische Seite und kann überall gehostet werden. Am einfachsten mit **GitHub Pages** direkt aus diesem Repo:

1. Auf GitHub: **Settings → Pages**.
2. **Source:** „Deploy from a branch".
3. **Branch:** `claude/misophonie-webapp-research-hkudia` (oder vorher in `main` mergen und `main` wählen), Ordner **`/ (root)`**, **Save**.
4. Nach ein paar Minuten ist die App erreichbar unter: `https://fabiandaviddd.github.io/miso/`

Alle Pfade sind **relativ** — die App läuft korrekt unter diesem Unterpfad (Manifest-`scope`/`start_url` = `./`). Alternativ funktioniert jeder statische Host (Netlify, Cloudflare Pages …) durch Hochladen des Repo-Inhalts.

> Hinweis: Ich habe wie vereinbart auf dem Feature-Branch entwickelt. Für „live" bitte den Branch als Pages-Quelle wählen **oder** nach `main` mergen — sag Bescheid, wenn ich das Mergen übernehmen soll.
