// Statische Inhalte der App. Auf Deutsch, ruhiger, validierender Ton.
// Alles hier ist unterstützend gemeint — keine Diagnose, keine Behandlung.

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

// Belastende Situationen (Onboarding + Vorbereiten).
export const SITUATIONS = [
  { id: 'eating', emoji: '🍽️', label: 'Essen mit anderen' },
  { id: 'work', emoji: '💻', label: 'Arbeit / Büro' },
  { id: 'transit', emoji: '🚆', label: 'Bus & Bahn' },
  { id: 'home', emoji: '🏠', label: 'Zu Hause / Familie' },
  { id: 'video', emoji: '🎥', label: 'Videocalls' },
  { id: 'study', emoji: '📚', label: 'Schule / Lernen' },
  { id: 'cinema', emoji: '🍿', label: 'Kino / Veranstaltung' },
  { id: 'sleep', emoji: '🌙', label: 'Einschlafen' },
];

// Was jetzt schon hilft (Onboarding) -> bestückt die Notfall-Hilfe.
export const HELPS = [
  { id: 'leave', label: 'Kurz rausgehen' },
  { id: 'mask', label: 'Kopfhörer / Geräusch drüberlegen' },
  { id: 'breathe', label: 'Atmen / kurz sammeln' },
  { id: 'distract', label: 'Ablenken' },
  { id: 'reframe', label: 'Mir gut zureden' },
  { id: 'none', label: 'Noch nichts gefunden' },
];

// Sofort-Werkzeuge im Trigger-Moment. `id` verweist auf sos.js.
export const SOS_TOOLS = [
  { id: 'breathe', emoji: '🫧', title: 'Atem-Anker', sub: 'Langsamer atmen, Schritt für Schritt', suggestFrom: ['breathe'] },
  { id: 'leave', emoji: '🚪', title: 'Raus hier', sub: 'Rausgehen ist erlaubt — mit fertigen Sätzen', suggestFrom: ['leave'] },
  { id: 'ground', emoji: '🌿', title: 'Ankommen (5-4-3-2-1)', sub: 'Aus dem Kopf, zurück in den Moment', suggestFrom: ['distract'] },
  { id: 'mask', emoji: '🎧', title: 'Ruhe-Klang', sub: 'Ein weiches Geräusch drüberlegen', suggestFrom: ['mask'], needsSound: true },
  { id: 'surf', emoji: '🌊', title: 'Die Welle reiten', sub: 'Die Wut steigt — und ebbt wieder ab', suggestFrom: [] },
  { id: 'reframe', emoji: '🧭', title: 'Umdeuten', sub: 'Es ist nicht gegen dich gerichtet', suggestFrom: ['reframe'] },
  { id: 'kind', emoji: '🤍', title: 'Freundlich zu dir', sub: 'Du reagierst nicht falsch', suggestFrom: [] },
];

// Grounding-Schritte (5-4-3-2-1).
export const GROUNDING = [
  { n: 5, sense: 'sehen', prompt: 'Nenne dir 5 Dinge, die du gerade sehen kannst.' },
  { n: 4, sense: 'fühlen', prompt: 'Nenne 4 Dinge, die du spüren kannst — der Boden, dein Atem, der Stoff.' },
  { n: 3, sense: 'hören', prompt: 'Nenne 3 Geräusche, die einfach da sind. Ohne sie zu bewerten.' },
  { n: 2, sense: 'riechen', prompt: 'Nenne 2 Dinge, die du riechen kannst — oder gern riechen würdest.' },
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
  'Diese Reaktion ist körperlich — kein Fehler in dir.',
  'Du musst das Geräusch nicht mögen. Du darfst es nur da sein lassen.',
];

// Freundlich zu dir: Selbstmitgefühl.
export const KIND_LINES = [
  'Was du erlebst, ist real. Du stellst dich nicht an.',
  'Du reagierst nicht falsch — du reagierst stark auf etwas Echtes.',
  'Andere spüren das nicht so. Das macht dich nicht schwierig.',
  'Du gibst gerade dein Bestes. Das reicht.',
];

// Psychoedukation — kurze, validierende Karten ("Verstehen").
export const LEARN = [
  {
    emoji: '💚', title: 'Es ist real — und es hat einen Namen',
    body: 'Misophonie bedeutet: Bestimmte Geräusche (oder ihr Anblick) lösen bei dir starke, unwillkürliche Reaktionen aus — Wut, Ekel, Anspannung, den Drang zu fliehen. Das ist keine Überempfindlichkeit „aus Prinzip“ und kein Charakterfehler. Du bist damit nicht allein.',
  },
  {
    emoji: '🔊', title: 'Es geht nicht um Lautstärke',
    body: 'Anders als bei Lärmempfindlichkeit ist nicht entscheidend, wie laut etwas ist, sondern welches Geräusch es ist und was es bedeutet. Ein leises Kauen kann heftiger treffen als eine laute Baustelle. Deshalb hilft „einfach leiser“ oft nicht — und das ist nicht deine Schuld.',
  },
  {
    emoji: '🧠', title: 'Warum der Körper Alarm schlägt',
    body: 'Bei Misophonie reagiert ein Netzwerk im Gehirn, das Reizen Bedeutung und Dringlichkeit gibt, auf Trigger besonders stark — mit einer echten Stressreaktion (Herzschlag, Anspannung). Das läuft schneller ab, als du denken kannst. Du „entscheidest“ dich nicht dafür.',
  },
  {
    emoji: '👀', title: 'Auch Sehen kann auslösen',
    body: 'Manche Menschen reagieren auch auf den Anblick von Bewegungen — jemanden kauen sehen, Wippen, Zappeln. Das nennt man Misokinesie. Oft reicht schon das Wissen, dass ein Geräusch kommen könnte. Auch das ist ein bekanntes, echtes Phänomen.',
  },
  {
    emoji: '👥', title: 'Warum es bei nahen Menschen oft schlimmer ist',
    body: 'Dass ausgerechnet Familie oder Partner:in am stärksten triggern, ist typisch — nicht, weil du sie weniger magst. Es liegt an Nähe, Wiederholung und daran, dass man ihnen schlecht ausweichen kann. Das über ein „du müsstest es doch besser wissen“ zu erklären, macht es unnötig schwer.',
  },
  {
    emoji: '🌱', title: 'Was realistisch hilft',
    body: 'Es gibt keine Wunderlösung und keine „Heilung auf Knopfdruck“. Aber vieles lässt sich lindern: die Reaktion abfedern, sich erlauben rauszugehen, Situationen vorbereiten, freundlicher mit sich sein. Was hier drin steckt, sind solche Werkzeuge — kein Training, das dich Geräuschen aussetzt.',
  },
  {
    emoji: '🚫', title: 'Warum wir dich Geräuschen nicht „aussetzen“',
    body: 'Bei Angst hilft es oft, sich dem Gefürchteten zu stellen, bis es abklingt. Bei Misophonie ist das anders: Sich Triggern gezielt auszusetzen, hilft meist nicht — und kann es schlimmer machen. Deshalb spielt diese App bewusst keine Trigger-Geräusche ab. Nur du entscheidest, welchen Klang du hörst.',
  },
];

// Situations-Karten ("Vorbereiten"): konkrete, würdevolle Strategien.
export const PREPARE = {
  eating: {
    emoji: '🍽️', title: 'Essen mit anderen',
    tips: [
      'Setz dich, wenn möglich, so, dass du Trigger nicht direkt vor dir hast — Kopf-Ende, Ecke, neben statt gegenüber.',
      'Ein Hintergrundgeräusch (Musik, Radio, Ventilator) darf laufen. Das ist kein Zeichen von Schwäche.',
      'Selbst mitessen oder trinken maskiert oft die Geräusche der anderen.',
      'Verabrede vorher ein leises Signal mit einer vertrauten Person, wenn du kurz raus musst.',
    ],
  },
  work: {
    emoji: '💻', title: 'Arbeit / Büro',
    tips: [
      'Kopfhörer sind ein legitimes Arbeitsmittel, kein Rückzug. Du darfst sie tragen.',
      'Wenn möglich: ruhigerer Platz, weiter weg von Küche/Essbereich, oder feste Fokus-Zeiten.',
      'Kurze Pausen an der frischen Luft sind Erste Hilfe, kein Faulenzen.',
      'Du musst deine Misophonie nicht erklären, um Rücksicht zu bitten — „Ich arbeite konzentrierter mit Kopfhörern“ reicht.',
    ],
  },
  transit: {
    emoji: '🚆', title: 'Bus & Bahn',
    tips: [
      'Halte Kopfhörer und einen ruhigen Klang griffbereit, bevor du einsteigst.',
      'Du darfst den Platz wechseln — so oft du willst. Du schuldest niemandem eine Erklärung.',
      'Ein Fensterplatz und der Blick nach draußen geben dir etwas Kontrolle zurück.',
    ],
  },
  home: {
    emoji: '🏠', title: 'Zu Hause / Familie',
    tips: [
      'Sprich in einem ruhigen Moment darüber — nicht mitten im Trigger.',
      'Ich-Botschaften helfen: „Mir tut es gut, wenn …“ statt „Du machst immer …“.',
      'Ein vereinbarter Rückzugsort zu Hause ist Gold wert. Rausgehen ist erlaubt.',
      'Es ist okay, wenn nicht immer alle zusammen am Tisch sitzen müssen.',
    ],
  },
  video: {
    emoji: '🎥', title: 'Videocalls',
    tips: [
      'Nutze Untertitel/Transkript, wenn möglich — dann kannst du stummschalten und trotzdem folgen.',
      'Eigenes Mikro stummschalten, fremde Kacheln bei Bedarf ausblenden (auch gegen visuelle Trigger).',
      'Kopfhörer mit gutem Klang trennen Stimmen von Nebengeräuschen.',
    ],
  },
  study: {
    emoji: '📚', title: 'Schule / Lernen',
    tips: [
      'Ein ruhiger Klang oder Ohrstöpsel beim Lernen sind Konzentrationshilfen.',
      'Bei Prüfungen: frag nach einem ruhigeren Platz — das ist eine faire Bitte.',
      'Plane Pausen fest ein, bevor die Anspannung zu groß wird.',
    ],
  },
  cinema: {
    emoji: '🍿', title: 'Kino / Veranstaltung',
    tips: [
      'Randplatz oder Gang-Nähe geben dir einen Fluchtweg, falls nötig.',
      'Es ist völlig in Ordnung, vorher zu klären, ob du zwischendurch kurz rausgehen kannst.',
    ],
  },
  sleep: {
    emoji: '🌙', title: 'Einschlafen',
    tips: [
      'Ein gleichmäßiger Klang (Rauschen, Ventilator) kann Trigger überdecken.',
      'Getrennte Decken oder etwas Abstand nehmen niemandem etwas weg — sie schützen deinen Schlaf.',
      'Anspannung vor dem Schlafen ist normal. Der Atem-Anker hilft beim Runterkommen.',
    ],
  },
};

// Kommunikations-Skripte für Angehörige.
export const SCRIPTS = [
  {
    title: 'Einem nahen Menschen erklären',
    lines: [
      'Ich möchte dir etwas über mich erklären, das nichts mit dir als Person zu tun hat.',
      'Bestimmte Geräusche lösen bei mir eine körperliche Stressreaktion aus — ich kann das nicht einfach abstellen.',
      'Wenn ich in so einem Moment kurz rausgehe, ist das kein Vorwurf an dich. Ich schütze mich nur.',
      'Es hilft mir sehr, wenn wir zusammen Lösungen finden, statt dass ich mich dafür schämen muss.',
    ],
  },
  {
    title: 'Um eine kleine Rücksicht bitten',
    lines: [
      'Dürfte ich beim Essen Musik nebenbei laufen lassen? Das macht es für mich viel leichter.',
      'Wäre es okay, wenn ich mich woanders hinsetze? Das liegt nicht an dir.',
      'Ich sag dann einfach kurz Bescheid und gehe ein paar Minuten raus — bin gleich wieder da.',
    ],
  },
];

// Krisen-/Hilfe-Kontakte (Deutschland). Bewusst prominent, aber ruhig.
export const CRISIS = {
  intro: 'Wenn die Belastung sehr groß wird, du dich völlig zurückziehst oder dunkle Gedanken auftauchen: Du musst da nicht allein durch. Diese App kann dir zuhören — aber Menschen können mehr.',
  contacts: [
    { label: 'Telefonseelsorge (kostenlos, rund um die Uhr, anonym)', value: '0800 111 0 111', tel: '08001110111' },
    { label: 'Telefonseelsorge (zweite Nummer)', value: '0800 111 0 222', tel: '08001110222' },
    { label: 'In akuter Gefahr: Notruf', value: '112', tel: '112' },
  ],
  note: 'Für Misophonie selbst können Ärzt:innen, Psychotherapeut:innen oder HNO/Audiolog:innen erste Ansprechpartner sein. Dieses Tagebuch darfst du gern mitnehmen.',
};

export const DISCLAIMER = 'MisoNIE unterstützt dich — es stellt keine Diagnose und ist keine Behandlung oder Therapie. Bei anhaltender oder starker Belastung wende dich bitte an professionelle Hilfe.';
