// "Mein Weg" — langfristige Entwicklung in kleinen, täglichen Schritten.
// Individuell: Die Auswahl richtet sich nach den Situationen der Person.
// Bewusst OHNE Exposition/Habituation und OHNE Streak-Druck: Es zählt nur,
// dass Werkzeuge vertrauter werden — nicht, wie lückenlos man "dabei" war.
import { el, mount, toast, buzz } from './ui.js';
import { icon } from './icons.js';
import { getKV, setKV, getEntries } from './store.js';
import { SITUATIONS, DISCLAIMER } from './data.js';

// Wochen-Themen: rotieren, damit über Zeit alle Skill-Bereiche drankommen.
// why  = Sinn und Langfrist-Wirkung der Übungen (unter der Tagesaufgabe).
// learn = passendes "Verstehen"-Wissen zum Thema (eigene Karte darunter).
const THEMES = [
  {
    id: 'attention', title: 'Aufmerksamkeit sanft lenken',
    desc: 'Die Aufmerksamkeit ist wie ein Scheinwerfer. Diese Woche üben wir, ihn bewusst zu bewegen, statt dass er am Geräusch hängen bleibt.',
    why: 'Du übst das Lenken der Aufmerksamkeit in ruhigen Momenten. Je geübter er ist, desto leichter kannst du ihn im Triggermoment bewusst bewegen, statt am Geräusch zu kleben. Über Wochen sinkt so auch das ständige Lauern.',
    learn: 'Bei Misophonie stuft dein Gehirn bestimmte Geräusche als hochwichtig ein, ähnlich einer Sirene: Es zwingt die Aufmerksamkeit dorthin, ob du willst oder nicht. Aufmerksamkeitstraining gibt dir den Scheinwerfer Stück für Stück zurück.',
  },
  {
    id: 'body', title: 'Den Körper beruhigen',
    desc: 'Die Reaktion sitzt im Körper, und dort kann man sie auch abfedern. Diese Woche: kleine Übungen, die dein Nervensystem runterregeln.',
    why: 'Ein ruhigeres Grundniveau bedeutet: Trigger treffen auf ein Nervensystem mit mehr Puffer. Die Reaktion fällt kleiner aus, und du erholst dich schneller. Das ist der Langzeiteffekt regelmäßiger kurzer Beruhigungsübungen.',
    learn: 'Die Misophonie-Reaktion ist eine echte Stressreaktion: Das Herz schlägt schneller, die Muskeln spannen an. Übungen, die das Nervensystem beruhigen, setzen genau dort an, wo die Reaktion körperlich entsteht.',
  },
  {
    id: 'reframe', title: 'Umdeuten',
    desc: 'Nicht das Geräusch ändert sich, aber was es für dich bedeutet, kann sich verschieben. Diese Woche üben wir freundlichere Deutungen.',
    why: 'Die Wut wird stärker durch die Deutung „das ist rücksichtslos, das ist gegen mich“. Wenn du in Ruhe andere Deutungen übst, stehen sie dir im Moment schneller zur Verfügung. Mit der Zeit verliert das Geräusch einen Teil seiner Bedeutung.',
    learn: 'Studien zeigen: Wie unangenehm ein Geräusch wirkt, hängt stark davon ab, wem oder was wir es zuschreiben. Dasselbe Geräusch trifft anders, je nachdem, welche Geschichte im Kopf dazu läuft. Die Bedeutung ist der Hebel, nicht die Lautstärke.',
  },
  {
    id: 'self', title: 'Freundlich zu dir',
    desc: 'Scham macht alles schwerer. Diese Woche üben wir, mit dir selbst so zu reden wie mit einer guten Freundin.',
    why: 'Scham und Selbstverurteilung sind ein zweiter Schmerz nach dem Trigger. Weniger Scham heißt: schnellere Erholung, weniger Grübeln und mehr Mut, dir Situationen wieder zuzutrauen.',
    learn: 'Viele Betroffene sagen: Das Schlimmste nach dem Trigger ist das eigene Urteil über sich. Selbstmitgefühl ist deshalb kein Luxus, sondern wirkt direkt auf die Belastung. Du bist nicht böse. Dein Alarm ist nur zu scharf gestellt.',
  },
  {
    id: 'situations', title: 'Deine Situationen meistern',
    desc: 'Vorbereitung gibt Kontrolle zurück. Diese Woche gehen wir deine schwierigen Situationen in kleinen Schritten durch.',
    why: 'Vorhersagbarkeit und Wahlmöglichkeiten senken die Anspannung, bevor es überhaupt losgeht. Genau diese Daueranspannung macht Trigger so mächtig. Jede vorbereitete Situation nimmt der nächsten etwas Schrecken.',
    learn: 'Das Unerträglichste an Triggern ist oft nicht das Geräusch selbst, sondern das Gefühl, nicht ausweichen zu können. Deshalb helfen Sitzplatzwahl, Ausstiegssätze und Rückzugsorte so sehr: Sie zeigen dir, dass du jederzeit gehen kannst.',
  },
  {
    id: 'talk', title: 'Darüber sprechen',
    desc: 'Du musst das nicht allein tragen. Diese Woche: kleine, machbare Schritte, dein Umfeld ins Boot zu holen.',
    why: 'Ein eingeweihtes Umfeld nimmt dauerhaft Druck raus: weniger Verstecken, weniger Missverständnisse, mehr Rücksicht. Das hilft oft mehr als jede einzelne Technik.',
    learn: 'Viele Betroffene beschreiben das Nicht-ernst-genommen-Werden als zweite Verletzung neben dem Trigger. Ein Umfeld, das Bescheid weiß, verhindert genau das. Schon eine einzige eingeweihte Person macht Situationen messbar leichter.',
  },
];

// Übungs-Pool. tags = Situations-IDs, für die eine Übung besonders passt.
const PRACTICES = [
  // Aufmerksamkeit
  { id: 'att1', theme: 'attention', title: 'Der 60-Sekunden-Anker', minutes: 2,
    intro: 'Das übst du am besten in ruhigen Momenten, nicht mitten im Trigger.',
    steps: ['Such dir einen Gegenstand in deiner Nähe.', 'Betrachte ihn eine Minute lang ganz genau: Farben, Kanten, Licht.', 'Wenn die Aufmerksamkeit abwandert, auch zu Geräuschen: Das ist normal. Hol sie einfach zurück.'], tags: [] },
  { id: 'att2', theme: 'attention', title: 'Zählen unterwegs', minutes: 3,
    intro: 'Eine unauffällige Übung für unterwegs. Sie gibt dem Kopf etwas zu tun, das du bestimmst.',
    steps: ['Wähle heute unterwegs eine Kategorie: blaue Dinge, Türen, Bäume.', 'Zähle sie still mit, wo immer du bist.', 'Merke dir am Ende deine Zahl.'], tags: ['transit', 'shopping', 'crowd'] },
  { id: 'att3', theme: 'attention', title: 'Hände spüren', minutes: 2,
    intro: 'Wenn die Gedanken kreisen, hilft es oft, den Körper zu spüren.',
    steps: ['Reibe deine Handflächen 10 Sekunden aneinander.', 'Halte sie dann still und spüre das Kribbeln und die Wärme.', 'Bleib 3 Atemzüge lang nur bei diesem Gefühl.'], tags: [] },

  // Körper
  { id: 'bod1', theme: 'body', title: 'Länger ausatmen als einatmen', minutes: 2,
    intro: 'Eine verlängerte Ausatmung ist das direkteste Beruhigungssignal an dein Nervensystem.',
    steps: ['Atme 4 Sekunden ein.', 'Atme 6 Sekunden aus, wie durch einen Strohhalm.', 'Wiederhole das 5 Runden lang. Mehr braucht es nicht.'], tags: [] },
  { id: 'bod2', theme: 'body', title: 'Schultern schmelzen lassen', minutes: 3,
    intro: 'Anspannung sammelt sich oft unbemerkt, besonders an Tagen mit vielen Triggern.',
    steps: ['Zieh die Schultern 5 Sekunden fest Richtung Ohren.', 'Lass sie mit dem Ausatmen fallen und spüre 10 Sekunden nach.', 'Dreimal wiederholen. Auch Kiefer und Hände dürfen mitloslassen.'], tags: ['work', 'study'] },
  { id: 'bod3', theme: 'body', title: 'Warm und schwer', minutes: 3,
    intro: 'Wenn du dir Ruhe vorstellst, macht der Körper oft mit.',
    steps: ['Setz oder leg dich bequem hin, Augen gern zu.', 'Sag dir innerlich: „Meine Arme sind warm und schwer.“', 'Bleib 2–3 Minuten bei diesem Satz und dem Gefühl.'], tags: ['sleep', 'home'] },

  // Umdeuten
  { id: 'ref1', theme: 'reframe', title: 'Der andere Grund', minutes: 2,
    intro: 'Im Trigger fühlt sich das Geräusch wie ein Angriff an. In Ruhe fallen dir andere Erklärungen ein.',
    steps: ['Denk an eine Person, deren Geräusche dich treffen.', 'Finde zwei neutrale Erklärungen: „Sie merkt es nicht.“ „Er ist einfach müde.“', 'Sprich die stimmigere einmal leise aus.'], tags: ['home', 'eating', 'work'] },
  { id: 'ref2', theme: 'reframe', title: 'Geräusche als Wetter', minutes: 2,
    intro: 'Ein Bild, das vielen hilft: Geräusche ziehen durch wie Wetter. Du bist der Himmel, nicht die Wolke.',
    steps: ['Setz dich kurz hin und lausche bewusst in den Raum.', 'Gib jedem Geräusch im Kopf ein Wetter: Regen, Wind, Grollen.', 'Beobachte, wie jedes wieder weiterzieht.'], tags: [] },
  { id: 'ref3', theme: 'reframe', title: 'Dein Satz für schwere Momente', minutes: 2,
    intro: 'Im Triggermoment hilft ein Satz, den du dir vorher zurechtgelegt hast.',
    steps: ['Vervollständige schriftlich: „Das Geräusch ist …, es ist nicht gegen mich.“', 'Formuliere, bis der Satz sich stimmig anfühlt.', 'Sprich ihn zweimal laut aus.'], tags: [] },

  // Freundlich zu dir
  { id: 'self1', theme: 'self', title: 'Wie für eine Freundin', minutes: 2,
    intro: 'Wir sind mit uns oft härter als mit jedem anderen Menschen.',
    steps: ['Erinnere dich an deinen letzten schweren Triggermoment.', 'Was würdest du einer Freundin sagen, der genau das passiert wäre?', 'Sag dir diesen Satz, im selben Ton.'], tags: [] },
  { id: 'self2', theme: 'self', title: 'Drei Zeilen an dich', minutes: 3,
    intro: 'Aufschreiben hilft, die Gedanken zu ordnen.',
    steps: ['Schreib drei Zeilen an dich selbst über den letzten schweren Moment.', 'Regel: kein Vorwurf. Nur beschreiben und verstehen.', 'Lies die Zeilen einmal laut und freundlich.'], tags: [] },
  { id: 'self3', theme: 'self', title: 'Der Satz am Morgen', minutes: 1,
    intro: 'Ein Satz am Morgen kann den ganzen Tag etwas leichter machen.',
    steps: ['Wähle einen Satz, der dir guttut, zum Beispiel „Ich reagiere stark, nicht falsch.“', 'Sag ihn dir heute Morgen einmal bewusst.', 'Wenn du magst: Wiederhole ihn mittags kurz.'], tags: [] },

  // Situationen (individuell nach Onboarding)
  { id: 'sit_eating', theme: 'situations', title: 'Die nächste Mahlzeit planen', minutes: 3,
    intro: 'Gemeinsames Essen ist für viele die schwerste Situation. Ein kleiner Plan gibt Kontrolle zurück.',
    steps: ['Denk an die nächste gemeinsame Mahlzeit.', 'Entscheide: Wo sitze ich? Läuft ein Hintergrundgeräusch? Was ist mein Ausstiegssatz?', 'Wenn du magst: Weihe eine Person ein.'], tags: ['eating', 'restaurant'] },
  { id: 'sit_work', theme: 'situations', title: 'Deinen Arbeitstag vorbereiten', minutes: 3,
    intro: 'Ein bisschen Vorbereitung macht den Arbeitstag deutlich leichter.',
    steps: ['Leg deine Kopfhörer/Ohrstöpsel griffbereit (Tasche, Schreibtisch).', 'Plane eine kurze Draußen-Pause fest ein.', 'Überleg dir einen ruhigeren Platz oder ein Zeitfenster für konzentriertes Arbeiten.'], tags: ['work', 'study', 'video'] },
  { id: 'sit_transit', theme: 'situations', title: 'Die Fahrt vorbereiten', minutes: 2,
    intro: 'In Bus und Bahn hilft alles, was dir Wahlmöglichkeiten gibt.',
    steps: ['Pack Ohrstöpsel/Kopfhörer ein, bevor du losgehst.', 'Nimm dir vor: Fensterplatz, und Platzwechsel ist jederzeit erlaubt.', 'Leg dir eine Playlist oder einen Podcast bereit.'], tags: ['transit'] },
  { id: 'sit_crowd', theme: 'situations', title: 'Trubel mit Plan', minutes: 3,
    intro: 'Bei Menschenmengen, Feiern und Festivals hilft es zu wissen, wohin du dich zurückziehen kannst.',
    steps: ['Denk an dein nächstes Event mit vielen Menschen.', 'Plane: Wo ist meine ruhige Ecke? Wann mache ich Pause? Wer ist eingeweiht?', 'Merke dir: Früher gehen ist ein guter Plan B, kein Scheitern.'], tags: ['crowd', 'festival', 'event', 'cinema'] },
  { id: 'sit_home', theme: 'situations', title: 'Dein Rückzugsort zu Hause', minutes: 3,
    intro: 'Ein vereinbarter Rückzugsort zu Hause entlastet alle: dich und die anderen.',
    steps: ['Wähle deinen Rückzugsort (Zimmer, Balkon, Bad).', 'Nimm dir vor, ihn zu nutzen, bevor die Anspannung kippt.', 'Wenn du magst: Sag einer Person zu Hause, was der Ort bedeutet.'], tags: ['home', 'sleep'] },
  { id: 'sit_any', theme: 'situations', title: 'Drei Fragen vor jeder Situation', minutes: 2,
    intro: 'Drei Fragen, die überall funktionieren.',
    steps: ['Denk an die nächste schwierige Situation, die ansteht.', 'Beantworte dir: Wo positioniere ich mich? Was nehme ich mit? Wann gönne ich mir eine Pause?', 'Fertig. Mehr Vorbereitung braucht es oft nicht.'], tags: [] },

  // Darüber sprechen
  { id: 'talk1', theme: 'talk', title: 'Ein Satz mehr', minutes: 2,
    intro: 'Oft reicht ein Satz, damit jemand dich versteht.',
    steps: ['Wähle eine vertraute Person.', 'Erzähl ihr heute einen Satz über deine Misophonie, zum Beispiel was dir hilft.', 'Zu schwer gerade? Dann nutze die Misophonie-Karte unter Vorbereiten.'], tags: [] },
  { id: 'talk2', theme: 'talk', title: 'Ich-Botschaft üben', minutes: 2,
    intro: 'Bitten fällt leichter, wenn der Satz schon fertig ist.',
    steps: ['Wähle eine Situation, in der du dir Rücksicht wünschst.', 'Formuliere: „Mir hilft es, wenn …“, ganz ohne Vorwurf.', 'Sprich den Satz einmal laut aus.'], tags: ['home', 'eating', 'work'] },
  { id: 'talk3', theme: 'talk', title: 'Rücksicht bemerken', minutes: 1,
    intro: 'Wenn du Rücksicht bemerkst und dich bedankst, passiert sie öfter.',
    steps: ['Achte heute auf einen Moment, in dem jemand Rücksicht nimmt (auch kleine).', 'Sag kurz danke, ein Wort reicht.', 'Merke dir das Gefühl dabei.'], tags: [] },
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
    const doneIds = log.byDate[todayStr()] || [];
    const doneToday = doneIds.includes(practice.id);
    const entries = await safeEntries();

    async function markDone(pr) {
      const l = (await getKV('practiceLog')) || { total: 0, byDate: {} };
      const day = todayStr();
      l.byDate[day] = l.byDate[day] || [];
      if (!l.byDate[day].includes(pr.id)) { l.byDate[day].push(pr.id); l.total = (l.total || 0) + 1; }
      await setKV('practiceLog', l);
      buzz(); toast('Erledigt.');
      await repaint();
    }

    const view = el('div', { class: 'stack' });

    view.append(el('p', { class: 'muted', text: 'Hier bekommst du jeden Tag einen kleinen Schritt, passend zu deinen Situationen. Kein Muss und kein Streak: Jeder Schritt zählt für sich, egal wann der letzte war.' }));

    // Wochen-Fokus
    view.append(el('div', { class: 'card' }, [
      el('div', { class: 'section-label', style: { marginTop: 0 }, text: 'Diese Woche im Blick' }),
      el('h3', { text: theme.title }),
      el('p', { class: 'muted', style: { margin: 0 }, text: theme.desc }),
    ]));

    // Heutiger Schritt
    view.append(el('div', { class: 'card pad-lg tint-green' }, [
      el('div', { class: 'section-label', style: { marginTop: 0 }, text: `Heute für dich · ca. ${practice.minutes} Min.` }),
      el('h2', { text: practice.title }),
      el('p', { class: 'muted', text: practice.intro }),
      el('ol', { style: { margin: '0 0 14px', paddingLeft: '20px', color: 'var(--text)' } },
        practice.steps.map(s => el('li', { text: s, style: { marginBottom: '8px' } }))),
      el('p', { class: 'muted small', style: { marginBottom: '14px' } }, [
        el('strong', { text: 'Warum das langfristig hilft: ' }),
        themeFor(practice).why,
      ]),
      doneToday
        ? el('div', { class: 'note soft' }, [el('span', { class: 'icon', html: icon('check') }), ' Erledigt. Mit jedem Schritt werden die Werkzeuge vertrauter.'])
        : el('button', { class: 'btn btn-primary', onClick: () => markDone(practice) },
            [el('span', { class: 'icon', html: icon('check') }), ' Hab ich gemacht']),
      doneToday ? null : el('button', { class: 'btn btn-quiet', style: { marginTop: '8px' }, onClick: async () => { offset++; await repaint(); } }, 'Anderen Schritt zeigen'),
    ]));

    // Bonusaufgabe: vertieft nach erledigtem Tagesschritt das Wochenthema
    if (doneToday) {
      const bonusPool = PRACTICES.filter(pr => pr.theme === theme.id && !doneIds.includes(pr.id));
      if (bonusPool.length) {
        const bonus = bonusPool[dayNumber() % bonusPool.length];
        view.append(el('div', { class: 'card tint-cream' }, [
          el('div', { class: 'section-label', style: { marginTop: 0 }, text: `Bonus, wenn du magst · ca. ${bonus.minutes} Min.` }),
          el('h3', { text: bonus.title }),
          el('p', { class: 'muted', text: bonus.intro }),
          el('ol', { style: { margin: '0 0 14px', paddingLeft: '20px', color: 'var(--text)' } },
            bonus.steps.map(s => el('li', { text: s, style: { marginBottom: '8px' } }))),
          el('button', { class: 'btn btn-ghost', onClick: () => markDone(bonus) },
            [el('span', { class: 'icon', html: icon('check') }), ' Da ging noch was']),
        ]));
      } else {
        view.append(el('div', { class: 'note soft' }, 'Alles zum Wochenthema geschafft. Das reicht dicke für heute.'));
      }
    }

    // Passendes Wissen zum Wochenthema
    view.append(el('div', { class: 'card' }, [
      el('div', { class: 'section-label', style: { marginTop: 0 }, text: 'Passend dazu · Verstehen' }),
      el('p', { style: { margin: 0 } }, [
        el('span', { class: 'icon', html: icon('lightbulb'), style: { color: 'var(--green-soft)', marginRight: '8px' } }),
        themeFor(practice).learn,
      ]),
      el('button', { class: 'btn btn-quiet', style: { marginTop: '10px' }, onClick: () => app.navigate('verstehen') }, 'Mehr verstehen'),
    ]));

    // Sanfter Rückblick (ohne Streaks)
    const helpedTop = topHelped(entries);
    if ((log.total || 0) > 0 || helpedTop.length) {
      const bits = [];
      if (log.total > 0) bits.push(el('p', { style: { margin: 0 } }, [
        el('strong', { text: `${log.total} kleine ${log.total === 1 ? 'Schritt' : 'Schritte'}` }),
        ' bist du schon gegangen. Nicht jeden Tag, und das ist auch nicht nötig.',
      ]));
      if (helpedTop.length) {
        bits.push(el('p', { class: 'muted', style: { margin: bits.length ? '10px 0 6px' : '0 0 6px' }, text: 'Aus deinem Tagebuch: Das hilft dir am häufigsten.' }));
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

function themeFor(practice) {
  return THEMES.find(t => t.id === practice.theme) || weeklyTheme();
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
