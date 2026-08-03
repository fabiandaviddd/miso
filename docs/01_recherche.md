# Phase 1 – Recherche: Misophonie als Grundlage für die App

**Stand:** 3. August 2026
**Zweck:** Wissensbasis, aus der die App-Konzeption (Phase 2) abgeleitet wird. Der letzte Abschnitt destilliert 5–8 Design-Prinzipien mit Quelle und ehrlicher Evidenz-Einordnung.

**Zur Quellenlage (Ehrlichkeit vorab):** Die Recherche stützt sich auf ~90 gezielte Web-Suchen (deutsch + englisch) über wissenschaftliche und Fachportale. Direkte Volltext-Abrufe waren in dieser Umgebung zeitweise per Proxy blockiert (403); die Kernfakten sind aber über mehrere unabhängige Treffer konsistent belegt, und die zentralen Zahlen (RCT-Response 37 %, AMISOS-R als Primär-Outcome, 1-Jahres-Stabilität) wurden am Original gegengeprüft. Wo Evidenz dünn oder widersprüchlich ist, steht es ausdrücklich dabei.

**Evidenz-Legende:** `[RCT]` randomisiert-kontrolliert · `[STUDIE]` Einzel-/Pilot-/Querschnittsstudie · `[QUAL]` qualitative Studie/Interviews · `[KLINIK]` Expertenkonsens/Fachportal · `[COMMUNITY]` Betroffenenberichte/Foren · `[UMSTRITTEN]` widersprüchlich oder Warnung vor Schaden.

---

## 1. Was ist Misophonie?

**Konsensus-Definition (Swedo et al. 2022, Delphi-Studie):** Misophonie ist „eine Störung verminderter Toleranz gegenüber spezifischen Geräuschen oder mit ihnen assoziierten Reizen" – sogenannten *Triggern* –, die als unangenehm/belastend erlebt werden und starke negative **emotionale, physiologische und behaviorale** Reaktionen auslösen, „wie sie bei den meisten anderen Menschen nicht auftreten". Die Reaktionen führen zu Leidensdruck und/oder Beeinträchtigung im sozialen, beruflichen oder schulischen Bereich. Trigger sind meist auditiv, oft von einem anderen menschlichen Körper erzeugt, teils auch visuell. `[KLINIK/Konsens]` (frontiersin.org/articles/10.3389/fnins.2022.841816)

**Diagnosestatus:** Misophonie ist **weder im DSM-5-TR noch in der ICD-11 als eigenständige Diagnose anerkannt**. Es gibt vorgeschlagene Kriterien und validierte Messinstrumente; eine ICD-11-/DSM-Aufnahme ist *vorgeschlagen, nicht beschlossen*. Für die App zentral: **Wir diagnostizieren nicht** – es gibt keinen offiziellen diagnostischen Standard, an dem wir andocken könnten, und das wäre auch nicht unsere Rolle. `[KLINIK]` (pmc.ncbi.nlm.nih.gov/articles/PMC11456068)

**Neurobiologie (kurz):** Trigger lösen bei Betroffenen eine überhöhte Aktivierung der **anterioren Insula** (Salienz-Netzwerk) aus, mit veränderter Konnektivität zu emotionsverarbeitenden Regionen (Kumar et al. 2017, *Current Biology*). Eine einflussreiche Zusatz-Hypothese: „Hyper-Mirroring" des orofazialen Motorsystems – das Beobachten fremder Mund-/Kaubewegungen aktiviert das eigene Motorsystem übermäßig (Kumar et al. 2021, *J. Neuroscience*). **Einordnung:** robuste Kernaussage (Insula/Salienz zentral), Mirroring bleibt ein Modell mit kleinen Stichproben. Praktische Bedeutung: Die Reaktion ist **eine neurophysiologische Reaktion, kein Charakterfehler** – das ist die wissenschaftliche Grundlage für den entstigmatisierenden Ton der App.

---

## 2. Abgrenzung (warum das fürs Design zählt)

| Phänomen | Auslöser | Grundmechanismus |
|---|---|---|
| **Misophonie** | *spezifische* Geräusche (oft Körpergeräusche), **lautstärke-unabhängig** | emotionale Reaktion auf **Bedeutung/Inhalt** des Geräuschs |
| **Hyperakusis** | *jedes* Geräusch ab bestimmter **Lautstärke** | physische Unbehaglichkeit/Schmerz durch Intensität |
| **Phonophobie** | antizipierte Geräusche | **Furcht/Angst**, nicht Wut/Ekel |
| **Tinnitus** | (internes) Ohrgeräusch ohne externe Quelle | eigenständig, oft ko-auftretend |
| **ASMR** | sanfte, oft dieselben Reize wie Miso-Trigger | **angenehme** Reaktion – diametraler Gegenpol |

Designrelevant: (a) Es geht **nicht** um Lautstärke → reine „Leiser-machen"-Logik greift zu kurz; es geht um Bedeutung und Kontrolle. (b) **Dieselben** Reize sind bei ASMR positiv → eine App darf niemals ungefragt Trigger-artige Sounds abspielen. (c) Was bei Hyperakusis hilft (Klangtherapie/TRT), **wirkt nachweislich nicht** automatisch bei Misophonie – eigene Logik nötig. `[KLINIK]` (pubs.asha.org/doi/10.1044/2022_AJA-22-00035)

---

## 3. Trigger: individuell, verschieden, wandelbar

**Häufigste Kategorien** (Rouw & Erfanian 2018, große Stichprobe): Ess-/Kau-/Schluckgeräusche ~81 %, Atmen/nasale Geräusche ~64 %, Finger-/Handgeräusche ~60 %. Dazu repetitive/mechanische Geräusche (Tippen, Klicken, tickende Uhr) und **visuelle Trigger („Misokinesie")** – Aversion gegen kleine repetitive Bewegungen anderer. `[STUDIE]` (journals.plos.org/plosone/article?id=10.1371/journal.pone.0231390; nature.com/articles/s41598-021-96430-4)

**Das ist der zentrale Design-Befund:** Zwar dominieren Mundgeräusche im Schnitt, aber **jede Person hat ihr eigenes, idiosynkratisches Trigger-Set** – „praktisch jedes Geräusch kann zum Trigger werden", die Präsentation variiert von Person zu Person wie bei OCD. `[KLINIK]` (iocdf.org/expert-opinions/misophonia)

**Trigger generalisieren über die Zeit:** Beginn oft mit *einer* Person/*einem* Geräusch → Ausweitung auf ähnliche Geräusche anderer → schließlich auf Geräusche generell. Mechanismus: klassische + operante Konditionierung, Vermeidung verfestigt. `[KLINIK/STUDIE, Modell]` (misophoniainstitute.org/how-triggers-spread)

→ **Fazit für die App:** Man kann Trigger *nicht* aus einer Standardliste vorgeben. Die App muss die individuellen Trigger **erfragen und mitwachsen** lassen. Genau das ist der Kern des Nutzer-Auftrags: *die App lernt ihren Nutzer kennen.*

---

## 4. Reaktionen und Kontext

**Emotional:** Wut (häufigste Reaktion, von Irritation bis Rage), Ekel, Angst, Überwältigung. **Körperlich:** messbare autonome Erregung (erhöhte Herzrate, Hautleitwert, Muskelanspannung) – Fight-or-Flight. **Verhalten:** Flucht, Vermeidung, Isolation, teils **Mimikry** (Nachahmen des Triggers). `[STUDIE]` (cell.com/current-biology/fulltext/S0960-9822(16)31530-5)

**Kontext entscheidet:** Trigger sind fast immer an **konkrete Personen** gebunden, und **nahestehende** Personen (Partner, Familie) lösen oft die *stärksten* Reaktionen aus. Erklärungsansätze: tägliche Wiederholung, Unausweichlichkeit („aus der eigenen Küche kann man nicht flüchten") und die emotionale Aufladung „ausgerechnet du müsstest es doch besser wissen". **Einordnung:** klinisch/experimentell gut gestützt, aber die genaue Gewichtung (emotionale Nähe vs. bloße Expositionshäufigkeit) ist nicht sauber quantifiziert. `[STUDIE/KLINIK]` (allergictosound.com/articles/why-parents-partners-siblings-mum-dad-biggest-misophonia-triggers)

**Wichtig:** Betroffene stört ihr *eigenes* Kauen i. d. R. nicht – das Problem sind Geräusche *anderer*. Misophonie ist damit weniger ein „Geräuschproblem" als ein **Beziehungs- und Kontrollproblem**.

---

## 5. Der Alltag: die belastendsten Situationen

- **Gemeinsames Essen** (mit Abstand am häufigsten genannt): Der Familientisch ist der Nullpunkt der Belastung. `[QUAL]` (Guzick et al. 2025, Interviewstudie mit Kindern + Eltern; pubmed.ncbi.nlm.nih.gov/39369709 – der Titel ist ein Betroffenenzitat: *„How Can I Get Out of This?"*)
- **Großraumbüro / Homeoffice / Videocalls:** offene Büros ohne Trennwände; in Zoom/Discord mischt ein Audiokanal alle Geräusche – das Kauen einer Kollegin ist *gleich laut* wie ihre Stimme. `[QUAL]` (arxiv.org/abs/2601.13355, „Remote Triggers")
- **Schule/Prüfungen, ÖPNV, Kino, WG/geteilter Wohnraum:** überall dort, wo man **bleiben muss** und nicht ausweichen kann.
- **Social Media:** Autoplay + algorithmisch ausgespielter ASMR-/Ess-Content machen Trigger unentrinnbar; manche meiden Technik ganz. `[QUAL]`

**Das doppelte Leid:** (1) der Trigger selbst und (2) das anschließende **Nicht-ernst-genommen-Werden** – in der Forschung als *„epistemisches Trauma"* beschrieben: der kumulative Schaden, wenn die eigene Erfahrung systematisch nicht geglaubt wird. „Die Geräusche tun weh – und das Nicht-geglaubt-Werden danach tut noch einmal weh." `[QUAL]` (arxiv.org/abs/2605.09796). Dazu **Scham und Schuld** als sekundäre Hauptlasten: *„Meine Misophonie verwandelt mich innerhalb von Sekunden in jemanden, den ich nicht wiedererkenne."* `[COMMUNITY]` (refinery29.com/de-de/misophonie-zerstoert-beziehungen)

**Was verschlimmert:** Stress prädiziert nachweislich den Schweregrad; Schlafmangel, Hunger, Erschöpfung senken die Toleranzschwelle („Window of Tolerance"); **Hypervigilanz** (das Lauern auf das Geräusch, antizipatorische Angst) und **erzwungenes Aushalten ohne Kontrolle** sind zentrale Verstärker. `[STUDIE]` (pmc.ncbi.nlm.nih.gov/articles/PMC10883556)

---

## 6. Was hilft – nach Evidenzgrad geordnet

### Am besten belegt (aber Basis insgesamt jung und klein)
Das systematische Review (Mattson et al. 2023) fand nur **1 RCT, 1 Open-Label-Studie, 31 Fallstudien** und schließt: „**Es gibt derzeit keine klare Behandlungsempfehlung**." Die Evidenzbasis ist jung. `[STUDIE, Review]`

- **KVT, misophonie-spezifisch und NICHT expositionsbasiert** `[RCT]` – die stärkste Einzelstudie des Feldes (Jager et al. 2021, *Depression and Anxiety*): erste RCT, Gruppen-KVT vs. Warteliste, klinische Verbesserung (CGI-I<3) bei **37 % vs. 0 %**, sehr große Effektstärke, **Effekt auf 1-Jahres-Follow-up stabil** (Kernzahlen am Original verifiziert; onlinelibrary.wiley.com/doi/full/10.1002/da.23127). Vier Kernkomponenten, alle **ohne Habituation**: Aufmerksamkeitslenkung, positive Umdeutung/Counterconditioning, kontrollierte Stimulus-Manipulation, Arousal-Reduktion.
- **Emotionsregulation / Unified Protocol** (Duke, Rosenthal-Gruppe) `[STUDIE/Pilot + kleine RCT]`: Achtsamkeit, kognitive Flexibilität, Umgang mit Emotionen; hohe Akzeptanz; Jugend-RCT ~47 % Responder.
- **ACT vs. progressive Entspannung** (Twohig 2025, N=60) `[RCT]`: beide wirksam; bemerkenswert – die *einfache Entspannung* war ähnlich gut. Das legt nahe, dass **Struktur + eine glaubwürdige, selbstwirksame Technik** einen großen Teil des Nutzens ausmachen (unspezifische Faktoren).

### Plausibel hilfreich, aber dünn belegt (Fallberichte/Analogieschluss, niedriges Risiko)
Sofort-Coping im Trigger-Moment: **den Raum verlassen dürfen** (als legitime Selbstfürsorge, nicht als Versagen), **Geräuschmaskierung**, **Atemtechnik** (verlängerte Ausatmung / physiologischer Seufzer), **Grounding (5-4-3-2-1)**, **Urge Surfing** (die Wut-Welle beobachtend mitreiten), **kognitive Reattribuierung** („die Person macht das nicht gegen mich"), **Muskelentspannung**, **Selbstmitgefühl**. Längerfristig: Stress-/Schlaf-Management, Achtsamkeit, **Psychoedukation** (Verstehen senkt Selbstverurteilung), **Kommunikation mit Angehörigen** (im *nicht*-getriggerten Moment, Ich-Botschaften). `[KLINIK]` (Duke CMER-Ressourcen; soquiet.org)

### Aus der Community bewährt
Dosierter Gehörschutz (Loop u. ä., dämpfen ohne Sprache zu blockieren), ANC-Kopfhörer + Maskierung, **selbst mitessen/eigene Geräusche machen**, **Mimikry** (>45 % der Betroffenen nutzen es, 68 % davon mit Erleichterung – studienbelegt), Vorhersagbarkeit/Kontrolle (Sitzplatzwahl, „sound-safe zones"), und vor allem **Validierung**: „es hat einen Namen, ich bin nicht verrückt/böse" wird durchgängig als Wendepunkt beschrieben. `[COMMUNITY/STUDIE]`

### Nicht belegt / vermeiden — der wichtigste Design-Merksatz
**Habituationsbasierte Expositionstherapie („Flooding") gilt bei Misophonie als ineffektiv und potenziell schädlich.** Anders als bei Angst *habituiert* Misophonie nicht – physiologisch zeigt sich eher **Sensibilisierung** (Reaktion steigt bei Wiederholung). Das Misophonia Institute nennt Flooding „wahrscheinlich die schlechtestmögliche Behandlung" (kann die Reaktion verstärken, neue Trigger erzeugen, bei Kindern unbedingt vermeiden). Der TRT-Begründer Jastreboff warnte sogar konkret vor einer *Trigger-Expositions-App*, sie könne Misophonie verschlimmern. `[UMSTRITTEN/KLINIK]` (misophoniainstitute.org/treatments-to-avoid; soquiet.org/faq/exposure-therapy)

→ **Für die App bindend:** kein Trigger-Trainingsmodul mit Habituationslogik, kein ungefragtes Abspielen von Trigger-Sounds. Wenn überhaupt Sound, dann nur maskierend/beruhigend und opt-in.

### Wann professionelle Hilfe (Warnsignale)
Misophonie geht mit **signifikant erhöhter Rate an Suizidgedanken und Selbstverletzung** einher (Simner et al. 2023). Warnsignale: starke Funktionseinschränkung, Depression/Hoffnungslosigkeit, soziale Isolation, Suizidgedanken. `[STUDIE]` (pmc.ncbi.nlm.nih.gov/articles/PMC11114359) → Die App muss **respektvoll und niederschwellig auf professionelle Hilfe verweisen** können, inkl. Krisen-Kontakten (z. B. Telefonseelsorge 0800 111 0 111).

---

## 7. Digitale Hilfen: Markt, Fallen, App-Tauglichkeit

**Marktlücke ist real:** Es gibt **keine** evidenzbasierte, professionell gestaltete Misophonie-App und **keine moderne deutschsprachige** Lösung. Das reifste Angebot ist ein Community-Projekt (Misophonia-Podcast-App: kostenlos, werbefrei, mit Panik-Button, Trigger-Journal, Atemübungen, Audio-Frequenzfilter – ein gutes Referenzmodell). Erste RCT-Evidenz, dass eine Misophonie-App überhaupt etwas bewirkt, existiert seit 2025 (JAD, Anti-Ärger-Mikrointerventionen), ist aber teils unspezifisch. `[STUDIE/AN]`

**Das Tracking-Dilemma** (designentscheidend): Symptom-Tracking kann Selbsterkenntnis fördern **oder** Hypervigilanz/Rumination verstärken. Bestes Analogon Tinnitus-EMA: im Mittel neutral bis leicht positiv, aber **~20 % verschlechtern sich** unter Monitoring; Bipolar-Selbstmonitoring (MONARCA) zeigte teils *mehr* depressive Symptome. „Worry Engines": Apps, die mit Streaks und Alarm-Notifications Mikro-Krisen erzeugen. `[STUDIE/RCT]`
→ **Ableitung:** Tracking **optional, dosiert, coping-zentriert** (was hat geholfen?), keine Symptom-Streaks, keine Push-Frage „Wie schlimm war es heute?", sanfte Verschlechterungs-Erkennung mit Hinweis auf Hilfe.

**JITAI-Prinzip** (Just-in-Time Adaptive Intervention): Der Trigger-Moment ist maximale *Vulnerabilität* bei minimaler *Rezeptivität* → Akut-Hilfe muss **1 Tap** sein; komplexe Inhalte (Psychoedukation, Reflexion) gehören in ruhige Momente. `[KLINIK/Theorie]`

**Datenschutz als Vertrauensmerkmal:** Die Branche hat ein Vertrauensproblem (BetterHelp-FTC-Strafe wegen Datenweitergabe; Mozilla-Audit: Mehrheit der Mental-Health-Apps mit Warnlabel). **Local-first/offline, kein Konto-Zwang, keine Tracker** ist für stigmatisierte, sensible Trigger-/Beziehungsdaten ein starkes, explizit kommunizierbares Feature. `[RL]` — deckt sich exakt mit dem Rahmen des Auftrags.

**UX unter Stress + WCAG 1.4.2:** Kein Autoplay-Audio; **Stille als Default, jeder Sound opt-in**; große Touch-Targets, eine Aktion pro Screen, keine Textwüsten im Akutmoment; vorhersagbare, nie wandernde Navigation. `[RL/KLINIK]`

**Validierte Fragebögen als (nicht-diagnostische) Struktur-Inspiration** – *nicht* als Test: A-MISO-S (nur 6 Items), S-Five (5 verständliche Erlebnisfacetten), DMQ-Coping-Subskalen (davor/während/danach – fertiges Gerüst, um zu erkennen, *welche* Coping-Phase jemand braucht). Nutzung strikt als Selbstreflexion rahmen, nicht als Diagnostik.

---

## 8. Die Design-Prinzipien (Destillat)

Diese acht Prinzipien tragen die App-Konzeption in Phase 2. Jedes nennt Begründung, Quelle und – wo nötig – die Evidenz-Grenze.

**P1 — Die App lernt den Nutzer kennen, nicht umgekehrt.**
Trigger sind hochgradig individuell und verändern sich über die Zeit; eine Standard-Triggerliste greift prinzipiell zu kurz. Die App muss die persönlichen Trigger, Situationen und Präferenzen *erfragen* und *mitwachsen* lassen. *Basis:* idiosynkratische Trigger + Generalisierung (Abschnitt 3). *Grenze:* solide belegt.

**P2 — Validierung ist ein Kern-Feature, kein Beiwerk.**
Das zweite Leid ist das Nicht-geglaubt-Werden. Der erste Eindruck und jeder Ton der App müssen die Erfahrung ernst nehmen: „Es ist real, du bist nicht verrückt oder böse." Kein „stell dich nicht so an" – die App ist die Gegenstimme. *Basis:* epistemisches Trauma, Scham/Schuld, Validierung als Wendepunkt (Abschnitt 5). *Grenze:* qualitativ stark, quantitativ wenig – aber risikoarm und vom Auftrag ausdrücklich gewünscht.

**P3 — Der Trigger-Moment regiert die Architektur: Akut-Hilfe in 1 Tap.**
Maximale Vulnerabilität, minimale Rezeptivität. Notfall-Hilfe muss ohne Nachdenken erreichbar sein (persistenter Button, vorkonfigurierter Inhalt, große Targets, eine Aktion pro Screen). Alles Komplexe gehört in ruhige Momente. *Basis:* JITAI + UX-unter-Stress (Abschnitt 7). *Grenze:* Prinzip gut etabliert.

**P4 — Stille als Default; niemals ungefragt Trigger-artige Sounds.**
Kein Autoplay, jeder Klang opt-in mit Vorschau; Sound nur maskierend/beruhigend. *Basis:* WCAG 1.4.2 + ASMR/Miso-Überschneidung + Remote-Triggers (Abschnitte 2, 7). *Grenze:* bindend.

**P5 — Rausgehen und Maskieren sind legitime Selbstfürsorge – aber die App treibt nicht in Dauervermeidung.**
Sofortmaßnahmen (Raum verlassen, maskieren, atmen) werden als valide angeboten, *ohne* Scham. Zugleich vermeidet die App die Falle, totale Vermeidung zu verstärken – der Ton ist „Werkzeug, nicht Dauer-Kapselung". *Basis:* Coping-Evidenz + Vermeidungs-/Sensibilisierungsdilemma (Abschnitt 6). *Grenze:* Nutzen plausibel, Vermeidungs-Risiko klinisch beschrieben – App soll *anbieten*, nicht *vorschreiben*.

**P6 — Keine Exposition, keine Habituations-Logik.**
Misophonie habituiert nicht; Flooding kann verschlimmern. Kein Trigger-Trainingsmodul. Stattdessen: Skills, Reattribuierung, Emotionsregulation, Selbstbestimmung. *Basis:* der klarste Konsens der Fachportale + Physiologie (Abschnitt 6). *Grenze:* bindend.

**P7 — Tracking mit Leitplanken: coping-zentriert, optional, ohne Hypervigilanz-Verstärkung.**
Wenn getrackt wird, dann was *geholfen* hat – nicht Symptom-Streaks, keine Push-Abfragen „wie schlimm war es". Dosiert, optional, mit sanfter Verschlechterungs-Erkennung. *Basis:* Tracking-Dilemma (Abschnitt 7). *Grenze:* Evidenz gemischt → Design entscheidet, konservativ vorgehen.

**P8 — Unterstützen, nicht behandeln; lokal, ohne Konto; bei Belastung auf Hilfe verweisen.**
Keine Diagnose, keine Heilungsversprechen (realistisches Ziel: Reaktionsintensität senken, Funktion verbessern). Sensible Daten bleiben lokal, kein Konto-Zwang, keine Tracker. Bei Warnsignalen respektvoller Verweis auf professionelle/Krisen-Hilfe. *Basis:* Diagnosestatus, Datenschutz-Vertrauensbruch der Branche, erhöhtes Suizidrisiko (Abschnitte 1, 6, 7) – und der Auftrags-Rahmen. *Grenze:* bindend, teils rechtlich/ethisch geboten.

---

## 9. Wo die Evidenz ehrlich dünn ist
- **Behandlungsevidenz insgesamt** ist jung: im Grunde *eine* starke RCT (KVT), sonst Pilots/Fallserien. „Keine klare Behandlungsempfehlung" (Mattson 2023). Eine App darf daher *nichts* versprechen.
- **Unspezifische Faktoren** (Zuwendung, Struktur, Erwartung) tragen viel bei (Entspannung ≈ ACT) – ermutigend für eine gut gemachte Selbsthilfe-App, aber kein Wirksamkeitsbeweis.
- **„Nahestehende triggern stärker"**: plausibel, aber nicht sauber quantifiziert.
- **Verlauf/Prognose**: kaum Längsschnittdaten.
- **Tracking**: kann helfen *oder* schaden – wir bauen konservativ.
- **App-Personalisierung**: von Nutzern gewünscht, Wirksamkeitsvorteil aber bisher klein/gemischt → als UX-/Vertrauens-Hebel begründet, nicht als Wirkversprechen.

---

*Nächster Schritt: Phase 2 (Konzept) leitet aus diesen Prinzipien Onboarding, Adaptivität, Kernfunktionen und Architektur ab – zur Freigabe.*
