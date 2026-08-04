// Statische Inhalte der App. Auf Deutsch, ruhiger, validierender Ton.
// Alles hier ist unterstützend gemeint — keine Diagnose, keine Behandlung.
// Icons: Namen aus js/icons.js (selbst gezeichnete Linien-Icons, keine Emojis).

// Trigger-Vorschläge, getrennt nach Sinn/Erleben. "Eigene" kommen frei dazu.
export const TRIGGERS = {
  hear: {
    label: 'Hören',
    hint: 'Geräusche, die dich treffen',
    items: ['Kauen', 'Schmatzen', 'Schlürfen', 'Luft einziehen / Schniefen', 'Atmen',
      'Schlucken', 'Räuspern / Husten', 'Kaugummikauen', 'Tippen / Tastatur',
      'Klicken (Stift, Maus)', 'Fußwippen-Geräusch', 'Besteck / Geschirr', 'Uhr-Ticken',
      'Hundebellen', 'bestimmte Stimmen'],
  },
  see: {
    label: 'Sehen',
    hint: 'Auch das Sehen kann auslösen (Misokinesie)',
    items: ['jemanden kauen sehen', 'Kaugummikauen sehen', 'Wippen / Zappeln',
      'mit dem Stift klopfen', 'Haare drehen', 'wiederholte Handbewegungen'],
  },
  anticipate: {
    label: 'Schon der Gedanke',
    hint: 'Die Anspannung, bevor es überhaupt losgeht',
    items: ['ich lauere schon, bevor es kommt', 'gemeinsames Essen steht an',
      'ich weiß, gleich fängt es an', 'die Person holt Essen raus'],
  },
};

// Belastende Situationen (Onboarding, Tagebuch, Vorbereiten).
export const SITUATIONS = [
  { id: 'eating', icon: 'utensils', label: 'Essen mit anderen' },
  { id: 'work', icon: 'laptop', label: 'Büro / Arbeit' },
  { id: 'transit', icon: 'train', label: 'Bus & Bahn' },
  { id: 'home', icon: 'home', label: 'Zu Hause / Familie' },
  { id: 'video', icon: 'video', label: 'Videocalls' },
  { id: 'study', icon: 'cap', label: 'Schule / Lernen' },
  { id: 'crowd', icon: 'users', label: 'Menschenmengen' },
  { id: 'event', icon: 'sparkles', label: 'Feiern & Events' },
  { id: 'festival', icon: 'tent', label: 'Outdoor-Festival' },
  { id: 'restaurant', icon: 'coffee', label: 'Restaurant / Café' },
  { id: 'cinema', icon: 'film', label: 'Kino / Theater' },
  { id: 'shopping', icon: 'bag', label: 'Einkaufen' },
  { id: 'guests', icon: 'guests', label: 'Besuch zu Hause' },
  { id: 'sport', icon: 'dumbbell', label: 'Sport / Fitnessstudio' },
  { id: 'car', icon: 'car', label: 'Auto fahren' },
  { id: 'travel', icon: 'plane', label: 'Reisen (Flug, Fernbus)' },
  { id: 'doctor', icon: 'stethoscope', label: 'Wartezimmer / Termin' },
  { id: 'call', icon: 'chat', label: 'Telefonate' },
  { id: 'sleep', icon: 'moon', label: 'Einschlafen' },
];

// Was jetzt schon hilft (Onboarding) -> bestückt die Notfallhilfe.
export const HELPS = [
  { id: 'leave', label: 'Kurz rausgehen' },
  { id: 'mask', label: 'Kopfhörer / Geräusch drüberlegen' },
  { id: 'breathe', label: 'Atmen / kurz sammeln' },
  { id: 'distract', label: 'Ablenken' },
  { id: 'reframe', label: 'Mir gut zureden' },
  { id: 'none', label: 'Noch nichts gefunden' },
];

// Sofort-Werkzeuge im Triggermoment. `id` verweist auf sos.js.
export const SOS_TOOLS = [
  { id: 'breathe', icon: 'breathe', title: 'Atemanker', sub: 'Langsamer atmen, Schritt für Schritt', suggestFrom: ['breathe'] },
  { id: 'leave', icon: 'door', title: 'Raus hier', sub: 'Rausgehen ist erlaubt, mit fertigen Sätzen', suggestFrom: ['leave'] },
  { id: 'ground', icon: 'leaf', title: 'Ankommen (5-4-3-2-1)', sub: 'Aus dem Kopf, zurück in den Moment', suggestFrom: ['distract'] },
  { id: 'mask', icon: 'headphones', title: 'Ruheklang', sub: 'Ein weiches Geräusch drüberlegen', suggestFrom: ['mask'], needsSound: true },
  { id: 'surf', icon: 'wave', title: 'Die Welle reiten', sub: 'Die Wut steigt und ebbt wieder ab', suggestFrom: [] },
  { id: 'reframe', icon: 'compass', title: 'Umdeuten', sub: 'Es ist nicht gegen dich gerichtet', suggestFrom: ['reframe'] },
  { id: 'kind', icon: 'heart', title: 'Freundlich zu dir', sub: 'Du reagierst nicht falsch', suggestFrom: [] },
];

// Grounding-Schritte (5-4-3-2-1).
export const GROUNDING = [
  { n: 5, sense: 'sehen', prompt: 'Nenne dir 5 Dinge, die du gerade sehen kannst.' },
  { n: 4, sense: 'fühlen', prompt: 'Nenne 4 Dinge, die du spüren kannst: der Boden, dein Atem, der Stoff.' },
  { n: 3, sense: 'hören', prompt: 'Nenne 3 Geräusche, die einfach da sind. Ohne sie zu bewerten.' },
  { n: 2, sense: 'riechen', prompt: 'Nenne 2 Dinge, die du riechen kannst oder gern riechen würdest.' },
  { n: 1, sense: 'schmecken', prompt: 'Nenne 1 Sache, die du schmecken kannst.' },
];

// "Raus hier": validierende Sätze zum Sich-Entschuldigen.
export const EXIT_LINES = [
  'Ich brauche kurz frische Luft, bin gleich zurück.',
  'Ich geh mir eben schnell die Beine vertreten.',
  'Ich hole mir kurz etwas zu trinken.',
  'Ich muss kurz auf die Toilette.',
];

// Umdeuten: ruhige Sätze zur Neubewertung.
export const REFRAME_LINES = [
  'Das Geräusch ist nicht gegen dich gerichtet.',
  'Dein Körper schlägt Alarm, obwohl keine Gefahr da ist. Das darf sein.',
  'Diese Reaktion ist körperlich. Sie ist kein Fehler in dir.',
  'Du musst das Geräusch nicht mögen. Du darfst es nur da sein lassen.',
];

// Freundlich zu dir: Selbstmitgefühl.
export const KIND_LINES = [
  'Was du erlebst, ist real. Du stellst dich nicht an.',
  'Du reagierst nicht falsch. Du reagierst stark auf etwas Echtes.',
  'Andere spüren das nicht so. Das macht dich nicht schwierig.',
  'Du gibst gerade dein Bestes. Das reicht.',
];

// Psychoedukation — kurze, validierende Karten ("Verstehen").
export const LEARN = [
  {
    icon: 'heart', title: 'Es ist real und es hat einen Namen',
    body: 'Misophonie bedeutet: Bestimmte Geräusche (oder ihr Anblick) lösen bei dir starke, unwillkürliche Reaktionen aus: Wut, Ekel, Anspannung, den Drang zu fliehen. Das ist keine Überempfindlichkeit „aus Prinzip“ und kein Charakterfehler. Du bist damit nicht allein.',
  },
  {
    icon: 'volume', title: 'Es geht nicht um Lautstärke',
    body: 'Anders als bei Lärmempfindlichkeit ist nicht entscheidend, wie laut etwas ist, sondern welches Geräusch es ist und was es bedeutet. Ein leises Kauen kann heftiger treffen als eine laute Baustelle. Deshalb hilft „einfach leiser“ oft nicht. Das ist nicht deine Schuld.',
  },
  {
    icon: 'activity', title: 'Warum der Körper Alarm schlägt',
    body: 'Bei Misophonie reagiert ein Netzwerk im Gehirn, das Reizen Bedeutung und Dringlichkeit gibt, auf Trigger besonders stark. Die Folge ist eine echte Stressreaktion: schnellerer Herzschlag, Anspannung. Das läuft schneller ab, als du denken kannst. Du „entscheidest“ dich nicht dafür.',
  },
  {
    icon: 'volume', title: 'Wie eine Sirene, die nur du hörst',
    body: 'Alle Menschen sind auf bestimmte Geräusche trainiert: Bei einer Sirene wird jeder sofort wach, aufmerksam, angespannt. Niemand käme auf die Idee, das eine Überreaktion zu nennen. Bei Misophonie hat dein Gehirn Geräuschen wie Kauen oder Schniefen genau diesen Sirenenstatus gegeben. Dein Alarm ist echt. Er geht nur bei Geräuschen los, die für andere harmlos sind.',
  },
  {
    icon: 'eye', title: 'Auch Sehen kann auslösen',
    body: 'Manche Menschen reagieren auch auf den Anblick von Bewegungen: jemanden kauen sehen, Wippen, Zappeln. Das nennt man Misokinesie. Oft reicht schon das Wissen, dass ein Geräusch kommen könnte. Auch das ist ein bekanntes, echtes Phänomen.',
  },
  {
    icon: 'users', title: 'Warum es bei nahen Menschen oft schlimmer ist',
    body: 'Dass ausgerechnet Familie oder Partner:in am stärksten triggern, ist typisch und heißt nicht, dass du sie weniger magst. Es liegt an Nähe, Wiederholung und daran, dass man ihnen schlecht ausweichen kann. Das über ein „du müsstest es doch besser wissen“ zu erklären, macht es unnötig schwer.',
  },
  {
    icon: 'sprout', title: 'Was realistisch hilft',
    body: 'Es gibt keine Wunderlösung und keine „Heilung auf Knopfdruck“. Aber vieles lässt sich lindern: die Reaktion abfedern, sich erlauben rauszugehen, Situationen vorbereiten, freundlicher mit sich sein. Genau solche Werkzeuge findest du hier. Kein Training, das dich Geräuschen aussetzt.',
  },
  {
    icon: 'ban', title: 'Warum wir dich Geräuschen nicht „aussetzen“',
    body: 'Bei Angst hilft es oft, sich dem Gefürchteten zu stellen, bis es abklingt. Bei Misophonie ist das anders: Sich Triggern gezielt auszusetzen, hilft meist nicht und kann es sogar schlimmer machen. Deshalb spielt diese App bewusst keine Triggergeräusche ab. Nur du entscheidest, welchen Klang du hörst.',
  },
];

// "Aus der Forschung": kuratierte Funde, monatlich rotierend ("News of the month").
// Ehrlich formuliert, mit Quelle. Kein Ersatz für aktuelle Literatur.
export const RESEARCH = [
  {
    title: 'Misophonie ist offiziell definiert',
    body: 'Ein internationales Expertengremium hat sich 2022 auf eine Definition geeinigt: Misophonie ist eine eigenständige Störung verminderter Toleranz gegenüber bestimmten Geräuschen, mit starken emotionalen und körperlichen Reaktionen. Das klingt trocken, bedeutet aber: Die Wissenschaft nimmt ernst, was du erlebst.',
    source: 'Swedo et al. 2022, Frontiers in Neuroscience (Konsensus-Definition)',
  },
  {
    title: 'Deine Reaktion ist messbar',
    body: 'Bei Betroffenen reagiert die vordere Inselrinde, eine Art Wichtigkeitszentrale des Gehirns, deutlich stärker auf Triggergeräusche. Gleichzeitig steigen Herzfrequenz und Hautleitwert. Die Reaktion ist also körperlich nachweisbar und keine Einbildung.',
    source: 'Kumar et al. 2017, Current Biology',
  },
  {
    title: 'Therapie ohne Konfrontation wirkt',
    body: 'Die bisher größte Studie zu Verhaltenstherapie bei Misophonie arbeitete bewusst ohne Konfrontation mit Triggern und zeigte deutliche Besserung bei gut einem Drittel der Teilnehmenden. Der Effekt hielt über ein Jahr an. Wichtig: Es ging um Umgang und Bewertung, nicht ums Aushalten.',
    source: 'Jager et al. 2021, Depression and Anxiety (randomisierte Studie, Amsterdam)',
  },
  {
    title: 'Essgeräusche sind der häufigste Auslöser',
    body: 'In einer großen Befragung nannten rund 81 Prozent der Betroffenen Ess- und Kaugeräusche als Trigger, gefolgt von Atem- und Nasengeräuschen. Zugleich gilt: Jedes Trigger-Profil ist individuell. Praktisch jedes Geräusch kann diese Rolle übernehmen.',
    source: 'Rouw und Erfanian 2018, Journal of Clinical Psychology',
  },
  {
    title: 'Auch Sehen kann triggern',
    body: 'Etwa jeder dritte Mensch kennt in irgendeiner Form Unbehagen beim Anblick kleiner, wiederholter Bewegungen wie Zappeln oder Wippen. Das Phänomen heißt Misokinesie und tritt oft zusammen mit Misophonie auf. Wenn dich also auch der Anblick von Kaugummikauen trifft: bekannt und real.',
    source: 'Jaswal et al. 2021, Scientific Reports',
  },
  {
    title: 'Das Gehirn spiegelt mit',
    body: 'Eine einflussreiche Studie fand bei Betroffenen eine stärkere Kopplung zwischen Hörsystem und den Hirnarealen für Mundbewegungen. Die Hypothese: Beim Hören von Kaugeräuschen läuft das eigene Mund-Motorsystem ungewollt mit. Das könnte erklären, warum gerade Körpergeräusche anderer so unerträglich sind.',
    source: 'Kumar et al. 2021, Journal of Neuroscience',
  },
  {
    title: 'Nachahmen ist verbreitet und hilft vielen',
    body: 'Über 45 Prozent der Befragten ahmen Triggergeräusche manchmal nach, und gut zwei Drittel davon empfinden das als erleichternd. Falls du das kennst: Es ist eine bekannte, häufige Reaktion und nichts Seltsames.',
    source: 'Ash et al. 2024, Journal of Clinical Psychology',
  },
  {
    title: 'Mehrere Wege führen zu Linderung',
    body: 'Eine Studie verglich Akzeptanz- und Commitment-Therapie mit einfachem Entspannungstraining. Beide halfen spürbar und ähnlich gut. Eine mögliche Deutung: Struktur, ein glaubwürdiges Werkzeug und das Gefühl von Selbstwirksamkeit sind selbst ein großer Teil der Wirkung.',
    source: 'Twohig et al. 2025, Journal of Affective Disorders (randomisierte Studie)',
  },
  {
    title: 'Rund jeder Zwanzigste ist betroffen',
    body: 'Repräsentative Befragungen, auch aus Deutschland, schätzen: Etwa 5 Prozent der Bevölkerung erleben Misophonie in klinisch relevantem Ausmaß. Deutlich mehr Menschen kennen mildere Formen. Du bist damit alles andere als allein.',
    source: 'u. a. repräsentative Erhebung Deutschland 2022/2024',
  },
  {
    title: 'Misophonie hat eine eigene Signatur im Gehirn',
    body: 'Neuere Bildgebungsarbeiten deuten darauf hin, dass sich die Netzwerkmuster bei Misophonie von denen bei Angststörungen und Depression unterscheiden. Das stützt die Sicht, dass Misophonie ein eigenständiges Phänomen ist und keine Unterform von etwas anderem. Die Befunde sind noch frisch und werden weiter geprüft.',
    source: 'Human Brain Mapping 2026 (vorsichtig zu lesen, sehr neue Daten)',
  },
];

// Situations-Karten ("Vorbereiten"): konkrete, würdevolle Strategien.
export const PREPARE = {
  eating: {
    icon: 'utensils', title: 'Essen mit anderen',
    tips: [
      'Setz dich, wenn möglich, so, dass du Trigger nicht direkt vor dir hast: Kopfende, Ecke, neben statt gegenüber.',
      'Ein Hintergrundgeräusch (Musik, Radio, Ventilator) darf laufen. Das ist kein Zeichen von Schwäche.',
      'Selbst mitessen oder trinken maskiert oft die Geräusche der anderen.',
      'Verabrede vorher ein leises Signal mit einer vertrauten Person, wenn du kurz raus musst.',
    ],
  },
  work: {
    icon: 'laptop', title: 'Büro / Arbeit',
    tips: [
      'Kopfhörer sind ein legitimes Arbeitsmittel, kein Rückzug. Du darfst sie tragen.',
      'Wenn möglich: ruhigerer Platz, weiter weg von Küche/Essbereich, oder feste Fokus-Zeiten.',
      'Kurze Pausen an der frischen Luft helfen wirklich. Das ist kein Faulenzen.',
      'Du musst deine Misophonie nicht erklären, um Rücksicht zu bitten. „Ich arbeite konzentrierter mit Kopfhörern“ reicht.',
    ],
  },
  transit: {
    icon: 'train', title: 'Bus & Bahn',
    tips: [
      'Halte Kopfhörer und einen ruhigen Klang griffbereit, bevor du einsteigst.',
      'Du darfst den Platz wechseln, so oft du willst. Du schuldest niemandem eine Erklärung.',
      'Ein Fensterplatz und der Blick nach draußen geben dir etwas Kontrolle zurück.',
    ],
  },
  home: {
    icon: 'home', title: 'Zu Hause / Familie',
    tips: [
      'Sprich in einem ruhigen Moment darüber, nicht mitten im Trigger.',
      'Ich-Botschaften helfen: „Mir tut es gut, wenn …“ statt „Du machst immer …“.',
      'Ein vereinbarter Rückzugsort zu Hause hilft enorm. Rausgehen ist erlaubt.',
      'Es ist okay, wenn nicht immer alle zusammen am Tisch sitzen müssen.',
    ],
  },
  video: {
    icon: 'video', title: 'Videocalls',
    tips: [
      'Nutze Untertitel/Transkript, wenn möglich. Dann kannst du stummschalten und trotzdem folgen.',
      'Eigenes Mikro stummschalten, fremde Kacheln bei Bedarf ausblenden (auch gegen visuelle Trigger).',
      'Kopfhörer mit gutem Klang trennen Stimmen von Nebengeräuschen.',
    ],
  },
  study: {
    icon: 'cap', title: 'Schule / Lernen',
    tips: [
      'Ein ruhiger Klang oder Ohrstöpsel beim Lernen sind Konzentrationshilfen.',
      'Bei Prüfungen: frag nach einem ruhigeren Platz. Das ist eine faire Bitte.',
      'Plane Pausen fest ein, bevor die Anspannung zu groß wird.',
    ],
  },
  crowd: {
    icon: 'users', title: 'Menschenmengen',
    tips: [
      'Ränder statt Mitte: Am Rand einer Menge hast du Luft und einen Weg nach draußen.',
      'Ohrstöpsel, die dämpfen ohne abzuschotten, helfen hier besonders.',
      'Plane vorher, wo du kurz auftanken kannst: eine ruhige Ecke, draußen, die Toilette.',
      'Du musst nicht durchhalten, bis es vorbei ist. Zu wissen, dass du gehen darfst, macht das Bleiben oft leichter.',
    ],
  },
  event: {
    icon: 'sparkles', title: 'Feiern & Events',
    tips: [
      'Komm früh, dann kannst du dir deinen Platz aussuchen (Rand, Nähe zur Tür).',
      'Eine eingeweihte Person als Verbündete macht vieles leichter: Sie versteht, wenn du kurz verschwindest.',
      'Pausen sind normal. Niemand zählt, wie lange du am Tisch sitzt.',
      'Früher gehen ist völlig okay. Ein kurzer schöner Abend ist mehr wert als ein langer, den du nur überstehst.',
    ],
  },
  festival: {
    icon: 'tent', title: 'Outdoor-Festival',
    tips: [
      'Gehörschutz gehört auf Festivals sowieso dazu. Du fällst damit nicht auf.',
      'Such dir früh Rückzugsorte: das eigene Zelt, ruhigere Bereiche, der Rand des Geländes.',
      'Verabrede ein einfaches Zeichen mit deinen Leuten für „ich brauch kurz Pause“.',
      'Plane Erholungsfenster ein (z. B. nachmittags), statt von früh bis nachts durchzuziehen.',
    ],
  },
  restaurant: {
    icon: 'coffee', title: 'Restaurant / Café',
    tips: [
      'Der richtige Platz macht viel aus: Wand im Rücken, Ecke, nicht mitten im Raum.',
      'Orte mit Hintergrundmusik oder Betriebsgeräusch sind oft leichter als stille Cafés.',
      'Selbst essen und trinken maskiert. Bestell dir ruhig zuerst etwas.',
      'Draußen sitzen ist oft angenehmer: mehr Raum, mehr Umgebungsgeräusche.',
    ],
  },
  cinema: {
    icon: 'film', title: 'Kino / Theater',
    tips: [
      'Randplatz oder Gang-Nähe geben dir einen Fluchtweg, falls nötig.',
      'Vorstellungen zu Randzeiten sind leerer: weniger Menschen, weniger Trigger.',
      'Es ist völlig in Ordnung, zwischendurch kurz rauszugehen.',
    ],
  },
  shopping: {
    icon: 'bag', title: 'Einkaufen',
    tips: [
      'Ruhige Uhrzeiten nutzen (früh morgens, spät abends): weniger Menschen, weniger Geräusche.',
      'Mit Einkaufszettel bist du schneller wieder draußen.',
      'Kopfhörer oder Ohrstöpsel beim Einkaufen sind völlig legitim.',
    ],
  },
  guests: {
    icon: 'guests', title: 'Besuch zu Hause',
    tips: [
      'Zu Hause hast du das Heimrecht. Du darfst dich zwischendurch in dein Zimmer zurückziehen.',
      'Musik oder Radio im Hintergrund laufen lassen, bevor der Besuch kommt. Dann ist es von Anfang an normal.',
      'Wenn geknabbert wird: Setz dich weiter weg oder übernimm eine Aufgabe in der Küche.',
      'Weihe eine Person ein, die da ist. Dann musst du dich nicht jedes Mal erklären.',
    ],
  },
  sport: {
    icon: 'dumbbell', title: 'Sport / Fitnessstudio',
    tips: [
      'Kopfhörer sind im Studio ohnehin üblich. Nutze sie ruhig durchgehend.',
      'Geräte am Rand oder in der Nähe der Lüftung sind oft angenehmer als die Mitte.',
      'Randzeiten sind leerer: früh morgens oder spät abends.',
      'Bewegung senkt das Stressniveau. Danach treffen Trigger oft weniger hart.',
    ],
  },
  car: {
    icon: 'car', title: 'Auto fahren',
    tips: [
      'Als Beifahrerin oder Beifahrer darfst du Musik oder Lüftung aufdrehen. Das ist eine kleine Bitte, keine große.',
      'Wenn du selbst fährst, bestimmst du den Ton im Auto.',
      'Bei längeren Fahrten Pausen einplanen, bevor die Anspannung steigt.',
    ],
  },
  travel: {
    icon: 'plane', title: 'Reisen (Flug, Fernbus)',
    tips: [
      'Sitzplatz vorher reservieren: Fenster, weiter vorn, weg von der Bordküche.',
      'Ohrstöpsel und Kopfhörer gehören ins Handgepäck, nicht in den Koffer.',
      'Snackzeiten sind die schwersten Momente. Plane für genau diese Zeit etwas ein, das dich beschäftigt.',
      'Eine Schlafmaske hilft auch gegen visuelle Trigger.',
    ],
  },
  doctor: {
    icon: 'stethoscope', title: 'Wartezimmer / Termin',
    tips: [
      'Wartezimmer sind still, dadurch fällt jedes Geräusch auf. Nimm dir etwas zum Hören mit.',
      'Du darfst fragen, ob du draußen oder im Flur warten kannst, bis du dran bist.',
      'Termine am Anfang der Sprechzeit bedeuten meist weniger Wartende.',
    ],
  },
  call: {
    icon: 'chat', title: 'Telefonate',
    tips: [
      'Kopfhörer mit gutem Mikrofon trennen die Stimme von Nebengeräuschen.',
      'Wenn Atem- oder Mundgeräusche durchkommen: Halte das Telefon etwas weiter weg oder stell auf Lautsprecher.',
      'Ein kurzes Telefonat ist völlig in Ordnung. Du musst nichts ausdehnen.',
    ],
  },
  sleep: {
    icon: 'moon', title: 'Einschlafen',
    tips: [
      'Ein gleichmäßiger Klang (Rauschen, Ventilator) kann Trigger überdecken.',
      'Getrennte Decken oder etwas Abstand nehmen niemandem etwas weg. Sie schützen deinen Schlaf.',
      'Anspannung vor dem Schlafen ist normal. Der Atemanker hilft beim Runterkommen.',
    ],
  },
};

// Kommunikations-Skripte für Angehörige.
export const SCRIPTS = [
  {
    title: 'Einem nahen Menschen erklären',
    lines: [
      'Ich möchte dir etwas über mich erklären, das nichts mit dir als Person zu tun hat.',
      'Bestimmte Geräusche lösen bei mir eine körperliche Stressreaktion aus. Ich kann das nicht einfach abstellen.',
      'Wenn ich in so einem Moment kurz rausgehe, ist das kein Vorwurf an dich. Ich schütze mich nur.',
      'Es hilft mir sehr, wenn wir zusammen Lösungen finden, statt dass ich mich dafür schämen muss.',
    ],
  },
  {
    title: 'Um eine kleine Rücksicht bitten',
    lines: [
      'Dürfte ich beim Essen Musik nebenbei laufen lassen? Das macht es für mich viel leichter.',
      'Wäre es okay, wenn ich mich woanders hinsetze? Das liegt nicht an dir.',
      'Ich sag dann einfach kurz Bescheid und gehe ein paar Minuten raus und bin gleich wieder da.',
    ],
  },
];

// Krisen-/Hilfe-Kontakte (Deutschland). Bewusst prominent, aber ruhig.
export const CRISIS = {
  intro: 'Wenn die Belastung sehr groß wird, du dich völlig zurückziehst oder dunkle Gedanken auftauchen: Du musst da nicht allein durch. Eine App kann dir Werkzeuge geben. Menschen können mehr.',
  contacts: [
    { label: 'Telefonseelsorge (kostenlos, rund um die Uhr, anonym)', value: '0800 111 0 111', tel: '08001110111' },
    { label: 'Telefonseelsorge (zweite Nummer)', value: '0800 111 0 222', tel: '08001110222' },
    { label: 'In akuter Gefahr: Notruf', value: '112', tel: '112' },
  ],
  note: 'Für Misophonie selbst können Ärzt:innen, Psychotherapeut:innen oder HNO/Audiolog:innen erste Ansprechpartner sein. Deinen Datenexport aus dem Tagebuch darfst du gern mitnehmen.',
};

export const DISCLAIMER = 'MisoNIE unterstützt dich. Es stellt keine Diagnose und ist keine Behandlung oder Therapie. Bei anhaltender oder starker Belastung wende dich bitte an professionelle Hilfe.';
