// "Mein Weg" — langfristige Entwicklung in kleinen, täglichen Schritten.
// Individuell: Die Auswahl richtet sich nach den Situationen der Person.
// Bewusst OHNE Exposition/Habituation und OHNE Streak-Druck: Es zählt nur,
// dass Werkzeuge vertrauter werden — nicht, wie lückenlos man "dabei" war.
import { el, mount, toast, buzz } from './ui.js';
import { icon } from './icons.js';
import { getKV, setKV, getEntries } from './store.js';
import { SITUATIONS, DISCLAIMER } from './data.js';

// Wochen-Themen: rotieren, damit über Zeit alle Skill-Bereiche drankommen.
const THEMES = [
  { id: 'attention', title: 'Aufmerksamkeit sanft lenken', desc: 'Die Aufmerksamkeit ist wie ein Scheinwerfer. Diese Woche üben wir, ihn bewusst zu bewegen — nicht weg vom Leben, sondern hin zu dem, was du wählst.' },
  { id: 'body', title: 'Den Körper beruhigen', desc: 'Die Reaktion sitzt im Körper — dort kann man sie auch abfedern. Diese Woche: kleine Übungen, die dein Nervensystem runterregeln.' },
  { id: 'reframe', title: 'Umdeuten', desc: 'Nicht das Geräusch ändert sich — aber was es für dich bedeutet, kann sich verschieben. Diese Woche üben wir freundlichere Deutungen.' },
  { id: 'self', title: 'Freundlich zu dir', desc: 'Scham macht alles schwerer. Diese Woche üben wir den Ton, den du bei einer guten Freundin ganz selbstverständlich treffen würdest — dir selbst gegenüber.' },
  { id: 'situations', title: 'Deine Situationen meistern', desc: 'Vorbereitung gibt Kontrolle zurück. Diese Woche gehen wir deine schwierigen Situationen in kleinen Schritten durch.' },
  { id: 'talk', title: 'Darüber sprechen', desc: 'Du musst das nicht allein tragen. Diese Woche: kleine, machbare Schritte, dein Umfeld ins Boot zu holen.' },
];

// Übungs-Pool. tags = Situations-IDs, für die eine Übung besonders passt.
const PRACTICES = [
  // Aufmerksamkeit
  { id: 'att1', theme: 'attention', title: 'Der 60-Sekunden-Anker', minutes: 2,
    intro: 'Aufmerksamkeit lässt sich trainieren wie ein Muskel — in ruhigen Momenten, nicht im Trigger.',
    steps: ['Such dir einen Gegenstand in deiner Nähe.', 'Betrachte ihn eine Minute lang ganz genau: Farben, Kanten, Licht.', 'Wandert die Aufmerksamkeit ab (auch zu Geräuschen): kein Fehler. Sanft zurückholen.'], tags: [] },
  { id: 'att2', theme: 'attention', title: 'Zählen unterwegs', minutes: 3,
    intro: 'Eine unauffällige Übung für unterwegs — sie gibt dem Kopf etwas zu tun, das du bestimmst.',
    steps: ['Wähle heute unterwegs eine Kategorie: blaue Dinge, Türen, Bäume.', 'Zähle sie still mit, wo immer du bist.', 'Merke dir dein Ergebnis — nur für dich.'], tags: ['transit', 'shopping', 'crowd'] },
  { id: 'att3', theme: 'attention', title: 'Hände spüren', minutes: 2,
    intro: 'Der schnellste Weg aus dem Kopf ist über den Körper.',
    steps: ['Reibe deine Handflächen 10 Sekunden aneinander.', 'Halte sie dann still und spüre das Kribbeln und die Wärme.', 'Bleib 3 Atemzüge lang nur bei diesem Gefühl.'], tags: [] },

  // Körper
  { id: 'bod1', theme: 'body', title: 'Länger aus als ein', minutes: 2,
    intro: 'Eine verlängerte Ausatmung ist das direkteste Beruhigungssignal an dein Nervensystem.',
    steps: ['Atme 4 Sekunden ein.', 'Atme 6 Sekunden aus — wie durch einen Strohhalm.', 'Wiederhole das 5 Runden lang. Mehr braucht es nicht.'], tags: [] },
  { id: 'bod2', theme: 'body', title: 'Schultern schmelzen lassen', minutes: 3,
    intro: 'Anspannung sammelt sich oft unbemerkt — besonders an Tagen mit vielen Triggern.',
    steps: ['Zieh die Schultern 5 Sekunden fest Richtung Ohren.', 'Lass sie mit dem Ausatmen fallen — 10 Sekunden nachspüren.', 'Dreimal wiederholen. Auch Kiefer und Hände dürfen mitloslassen.'], tags: ['work', 'study'] },
  { id: 'bod3', theme: 'body', title: 'Warm und schwer', minutes: 3,
    intro: 'Ruhe kann man sich vorstellen — der Körper macht erstaunlich oft mit.',
    steps: ['Setz oder leg dich bequem hin, Augen gern zu.', 'Sag dir innerlich: „Meine Arme sind warm und schwer.“', 'Bleib 2–3 Minuten bei diesem Satz und dem Gefühl.'], tags: ['sleep', 'home'] },

  // Umdeuten
  { id: 'ref1', theme: 'reframe', title: 'Der andere Grund', minutes: 2,
    intro: 'Im Trigger fühlt sich das Geräusch wie ein Angriff an. In Ruhe kann man andere Erklärungen einsammeln.',
    steps: ['Denk an eine Person, deren Geräusche dich treffen.', 'Finde zwei neutrale Erklärungen: „Sie merkt es nicht.“ „Er ist einfach müde.“', 'Sprich die stimmigere einmal leise aus.'], tags: ['home', 'eating', 'work'] },
  { id: 'ref2', theme: 'reframe', title: 'Geräusche als Wetter', minutes: 2,
    intro: 'Ein Bild, das vielen hilft: Geräusche ziehen durch wie Wetter — du bist der Himmel, nicht die Wolke.',
    steps: ['Setz dich kurz hin und lausche bewusst in den Raum.', 'Gib jedem Geräusch im Kopf ein Wetter: Regen, Wind, Grollen.', 'Beobachte, wie jedes wieder weiterzieht.'], tags: [] },
  { id: 'ref3', theme: 'reframe', title: 'Dein Satz für schwere Momente', minutes: 2,
    intro: 'Ein vorbereiteter Satz ist im Trigger-Moment Gold wert — er muss nur vorher existieren.',
    steps: ['Vervollständige schriftlich: „Das Geräusch ist … — es ist nicht gegen mich.“', 'Formuliere, bis der Satz sich stimmig anfühlt.', 'Sprich ihn zweimal — er gehört jetzt dir.'], tags: [] },

  // Freundlich zu dir
  { id: 'self1', theme: 'self', title: 'Wie für eine Freundin', minutes: 2,
    intro: 'Wir sind mit uns oft härter als mit jedem anderen Menschen.',
    steps: ['Erinnere dich an deinen letzten schweren Trigger-Moment.', 'Was würdest du einer Freundin sagen, der genau das passiert wäre?', 'Sag dir diesen Satz — im selben Ton.'], tags: [] },
  { id: 'self2', theme: 'self', title: 'Drei Zeilen an dich', minutes: 3,
    intro: 'Aufschreiben ordnet — und nimmt der Scham das Versteck.',
    steps: ['Schreib drei Zeilen an dich selbst über den letzten schweren Moment.', 'Regel: kein Vorwurf. Nur beschreiben und verstehen.', 'Lies die Zeilen einmal laut — freundlich.'], tags: [] },
  { id: 'self3', theme: 'self', title: 'Der Satz am Morgen', minutes: 1,
    intro: 'Ein kleiner Anker am Tagesanfang verändert, wie Trigger später ankommen.',
    steps: ['Wähle einen Satz, der dir guttut — z. B. „Ich reagiere stark, nicht falsch.“', 'Sag ihn dir heute Morgen einmal bewusst.', 'Wenn du magst: Wiederhole ihn mittags kurz.'], tags: [] },

  // Situationen (individuell nach Onboarding)
  { id: 'sit_eating', theme: 'situations', title: 'Die nächste Mahlzeit vordenken', minutes: 3,
    intro: 'Gemeinsames Essen ist für viele die schwerste Situation. Ein kleiner Plan gibt Kontrolle zurück.',
    steps: ['Denk an die nächste gemeinsame Mahlzeit.', 'Entscheide: Wo sitze ich? Läuft ein Hintergrundgeräusch? Was ist mein Ausstiegssatz?', 'Wenn du magst: Weihe eine Person ein.'], tags: ['eating', 'restaurant'] },
  { id: 'sit_work', theme: 'situations', title: 'Deinen Arbeitstag rüsten', minutes: 3,
    intro: 'Kleine Vorbereitung, große Wirkung — besonders im Büro.',
    steps: ['Leg deine Kopfhörer/Ohrstöpsel griffbereit (Tasche, Schreibtisch).', 'Plane eine kurze Draußen-Pause fest ein.', 'Überleg dir einen ruhigeren Platz oder ein Zeitfenster für konzentriertes Arbeiten.'], tags: ['work', 'study', 'video'] },
  { id: 'sit_transit', theme: 'situations', title: 'Die Fahrt vorbereiten', minutes: 2,
    intro: 'In Bus und Bahn hilft alles, was dir Wahlmöglichkeiten gibt.',
    steps: ['Pack Ohrstöpsel/Kopfhörer ein, bevor du losgehst.', 'Nimm dir vor: Fensterplatz, und Platzwechsel ist jederzeit erlaubt.', 'Leg dir eine Playlist oder einen Podcast bereit.'], tags: ['transit'] },
  { id: 'sit_crowd', theme: 'situations', title: 'Trubel mit Plan', minutes: 3,
    intro: 'Menschenmengen, Feiern, Festivals: Mit Rückzugsplan wird aus Ausgeliefertsein Wahlfreiheit.',
    steps: ['Denk an dein nächstes Event mit vielen Menschen.', 'Plane: Wo ist meine ruhige Ecke? Wann mache ich Pause? Wer ist eingeweiht?', 'Merke dir: Früher gehen ist ein guter Plan B — kein Scheitern.'], tags: ['crowd', 'festival', 'event', 'cinema'] },
  { id: 'sit_home', theme: 'situations', title: 'Deine Insel zu Hause', minutes: 3,
    intro: 'Ein vereinbarter Rückzugsort zu Hause entlastet alle — dich und die anderen.',
    steps: ['Wähle deinen Rückzugsort (Zimmer, Balkon, Bad).', 'Nimm dir vor, ihn zu nutzen, bevor die Anspannung kippt.', 'Wenn du magst: Sag einer Person zu Hause, was der Ort bedeutet.'], tags: ['home', 'sleep'] },
  { id: 'sit_any', theme: 'situations', title: 'Drei Fragen vor jeder Situation', minutes: 2,
    intro: 'Ein Mini-Ritual, das in jede Tasche passt.',
    steps: ['Denk an die nächste schwierige Situation, die ansteht.', 'Beantworte dir: Wo positioniere ich mich? Was nehme ich mit? Wann gönne ich mir eine Pause?', 'Fertig. Mehr Vorbereitung braucht es oft nicht.'], tags: [] },

  // Darüber sprechen
  { id: 'talk1', theme: 'talk', title: 'Ein Satz mehr', minutes: 2,
    intro: 'Verstanden zu werden beginnt mit einem einzigen Satz.',
    steps: ['Wähle eine vertraute Person.', 'Erzähl ihr heute einen Satz über deine Misophonie — z. B. was dir hilft.', 'Zu schwer gerade? Dann nutze die „Das-ist-Misophonie“-Karte unter Vorbereiten.'], tags: [] },
  { id: 'talk2', theme: 'talk', title: 'Ich-Botschaft üben', minutes: 2,
    intro: 'Bitten fällt leichter, wenn der Satz schon fertig ist.',
    steps: ['Wähle eine Situation, in der du dir Rücksicht wünschst.', 'Formuliere: „Mir hilft es, wenn …“ — ohne Vorwurf.', 'Sprich den Satz einmal laut. Er wartet jetzt auf seinen Einsatz.'], tags: ['home', 'eating', 'work'] },
  { id: 'talk3', theme: 'talk', title: 'Rücksicht bemerken', minutes: 1,
    intro: 'Was man wertschätzt, passiert öfter — und Danke sagen fühlt sich besser an als Schämen.',
    steps: ['Achte heute auf einen Moment, in dem jemand Rücksicht nimmt (auch kleine).', 'Sag kurz danke — ein Wort reicht.', 'Merke dir das Gefühl dabei.'], tags: [] },
];

// ---------------------------------------------------------------- Auswahl

function dayNumber() { return Math.floor(Date.now() / 86400000); }

export function weeklyTheme() {
  return THEMES[Math.floor(dayNumber() / 7) % THEMES.length];
}

// Tages-Übung: Wochen-Thema + Übungen zu den eigenen Situationen im Wechsel.
export function todaysPractice(profile, offset = 0) {
  const theme = weeklyTheme();
  const situ = profile.situations || [];
  const themePool = PRACTICES.filter(p => p.theme === theme.id);
  const situPool = PRACTICES.filter(p => p.tags.some(t => situ.includes(t)) && p.theme !== theme.id);
  const list = [...themePool, ...situPool];
  if (!list.length) return PRACTICES[0];
  return list[(dayNumber() + offset) % list.length];
}

function todayStr() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

// ---------------------------------------------------------------- View

export async function renderPath(app) {
  const p = app.profile;
  const container = el('div', {});
  let offset = 0;

  async function repaint() {
    const theme = weeklyTheme();
    const practice = todaysPractice(p, offset);
    const log = (await getKV('practiceLog')) || { total: 0, byDate: {} };
    const doneToday = (log.byDate[todayStr()] || []).includes(practice.id);
    const entries = await safeEntries();

    const view = el('div', { class: 'stack' });

    view.append(el('p', { class: 'muted', text: 'Kleine Schritte, in deinem Tempo — angepasst an deine Situationen. Kein Muss und kein Streak: Jeder Schritt zählt für sich, egal wann der letzte war.' }));

    // Wochen-Fokus
    view.append(el('div', { class: 'card' }, [
      el('div', { class: 'section-label', style: { marginTop: 0 }, text: 'Diese Woche im Blick' }),
      el('h3', { text: theme.title }),
      el('p', { class: 'muted', style: { margin: 0 }, text: theme.desc }),
    ]));

    // Heutiger Schritt
    view.append(el('div', { class: 'card pad-lg', style: { borderColor: 'var(--green-deep)' } }, [
      el('div', { class: 'section-label', style: { marginTop: 0 }, text: `Heute für dich · ca. ${practice.minutes} Min.` }),
      el('h2', { text: practice.title }),
      el('p', { class: 'muted', text: practice.intro }),
      el('ol', { style: { margin: '0 0 14px', paddingLeft: '20px', color: 'var(--text)' } },
        practice.steps.map(s => el('li', { text: s, style: { marginBottom: '8px' } }))),
      doneToday
        ? el('div', { class: 'note soft' }, [el('span', { class: 'icon', html: icon('check') }), ' Schön. Jeder Schritt macht die Werkzeuge vertrauter.'])
        : el('button', { class: 'btn btn-primary', onClick: async () => {
            const l = (await getKV('practiceLog')) || { total: 0, byDate: {} };
            const day = todayStr();
            l.byDate[day] = l.byDate[day] || [];
            if (!l.byDate[day].includes(practice.id)) { l.byDate[day].push(practice.id); l.total = (l.total || 0) + 1; }
            await setKV('practiceLog', l);
            buzz(); toast('Schritt gegangen.');
            await repaint();
          } }, [el('span', { class: 'icon', html: icon('check') }), ' Hab ich gemacht']),
      el('button', { class: 'btn btn-quiet', style: { marginTop: '8px' }, onClick: async () => { offset++; await repaint(); } }, 'Ein anderer Schritt, bitte'),
    ]));

    // Sanfter Rückblick (ohne Streaks)
    const helpedTop = topHelped(entries);
    if ((log.total || 0) > 0 || helpedTop.length) {
      const bits = [];
      if (log.total > 0) bits.push(el('p', { style: { margin: 0 } }, [
        el('strong', { text: `${log.total} kleine ${log.total === 1 ? 'Schritt' : 'Schritte'}` }),
        ' bist du schon gegangen. Nicht am Stück — das muss es auch nicht.',
      ]));
      if (helpedTop.length) {
        bits.push(el('p', { class: 'muted', style: { margin: bits.length ? '10px 0 6px' : '0 0 6px' }, text: 'Aus deinem Tagebuch — das hilft dir am häufigsten:' }));
        bits.push(el('div', {}, helpedTop.map(([h, n]) => el('span', { class: 'tag help', text: `${h} · ${n}×` }))));
      }
      view.append(el('div', { class: 'card' }, [
        el('div', { class: 'section-label', style: { marginTop: 0 }, text: 'Dein Weg bisher' }),
        ...bits,
      ]));
    }

    // Brücke zu den Situations-Karten
    if ((p.situations || []).length) {
      view.append(el('button', { class: 'tile', onClick: () => app.navigate('vorbereiten') }, [
        el('span', { class: 'emoji', html: icon('map') }),
        el('span', { class: 't-body' }, [
          el('span', { class: 't-title', text: 'Deine Situationen vorbereiten' }),
          el('span', { class: 't-sub', text: situationsLine(p) }),
        ]),
        el('span', { class: 'chev', html: '›' }),
      ]));
    }

    view.append(el('p', { class: 'disclaimer', text: DISCLAIMER }));
    mount(container, view);
  }

  await repaint();
  return container;
}

function situationsLine(p) {
  const labels = (p.situations || []).map(id => (SITUATIONS.find(s => s.id === id) || {}).label).filter(Boolean);
  return labels.slice(0, 3).join(' · ') + (labels.length > 3 ? ' …' : '');
}

function topHelped(entries) {
  const counts = {};
  for (const e of entries) for (const h of (e.helped || [])) {
    if (h === 'Nichts geholfen') continue;
    counts[h] = (counts[h] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
}

async function safeEntries() { try { return await getEntries(); } catch { return []; } }
