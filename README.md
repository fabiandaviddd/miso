# MisoNIE

Ein ruhiger Begleiter bei **Misophonie** (und Misokinesie) — eine installierbare Web-App (PWA), die sich beim Kennenlernen an ihren Nutzer anpasst. Sie **unterstützt**; sie behandelt und diagnostiziert nicht.

- 📱 **Smartphone-first**, als PWA installierbar, **offline** nutzbar
- 🔒 **Local-first:** kein Konto, kein Server, keine Tracker — alle Daten bleiben auf dem Gerät (IndexedDB)
- 🆘 **Notfall-Hilfe** im Trigger-Moment (ein Tap) · 📔 **Tagebuch mit Export** für die Therapie
- 🌿 Ruhig, respektvoll, dunkle Grüntöne · **keine Trigger-Sounds, keine Exposition**
- 🧩 Ohne Framework/Build-Schritt (reines HTML/CSS/JS) — langlebig und überall statisch hostbar

## Lokal starten

```bash
python3 -m http.server 8137   # im Projektordner
# Browser: http://127.0.0.1:8137/
```

## Dokumentation

- `docs/01_recherche.md` — Recherche zu Misophonie + Design-Prinzipien
- `docs/02_konzept.md` — App-Konzept (Onboarding, Adaptivität, Architektur)
- `docs/03_uebergabe.md` — Übergabe: Architektur, Entscheidungen, offene Punkte, **Deploy**
- `docs/04_test-anleitung.md` — Anleitung für die betroffene Person zum realen Ausprobieren

MisoNIE ist keine Behandlung, keine Therapie und keine Diagnose. Bei starker Belastung verweist die App respektvoll auf professionelle Hilfe.
