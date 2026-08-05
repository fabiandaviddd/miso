// Adaptive Startseite. Reihenfolge & Sichtbarkeit richten sich nach dem
// Onboarding: die App passt sich der Person an, nicht umgekehrt.
import { el, buzz } from './ui.js';
import { icon } from './icons.js';
import { getEntries } from './store.js';
import { todaysPractice } from './path.js';
import { SITUATIONS } from './data.js';
import { aiReady } from './ai.js';

const AREAS = {
  weg:         { icon: 'route', title: 'Mein Weg', sub: 'Jeden Tag ein kleiner Schritt, abgestimmt auf dich', route: 'weg' },
  verstehen:   { icon: 'lightbulb', title: 'Verstehen', sub: 'Was Misophonie ist und dass du nicht allein bist', route: 'verstehen' },
  vorbereiten: { icon: 'map', title: 'Vorbereiten', sub: 'Tipps für schwierige Situationen und Gespräche', route: 'vorbereiten' },
  tagebuch:    { icon: 'book', title: 'Tagebuch', sub: 'Kurz festhalten, mit Datenexport für deine Therapie', route: 'tagebuch' },
};

export async function renderHome(app) {
  const p = app.profile;
  const entries = await safeEntries();
  const view = el('div', { class: 'stack-lg' });

  // Sanfte Begrüßung
  view.append(el('div', {}, [
    el('h1', { text: greeting(p) }),
    el('p', { class: 'muted', style: { marginTop: '-2px' }, text: 'Ich bin da, wenn du mich brauchst.' }),
  ]));

  // Behutsamer Hilfe-Hinweis bei anhaltend hoher Belastung
  if (needsCareHint(entries)) {
    view.append(el('button', {
      class: 'note care', style: { textAlign: 'left', width: '100%', cursor: 'pointer', display: 'block' },
      onClick: () => app.navigate('hilfe'),
    }, [
      el('div', { html: '<strong>Die letzten Tage waren schwer.</strong>' }),
      'Das tut mir leid. Du musst da nicht allein durch. Hier findest du Menschen, die zuhören. Tippen zum Öffnen.',
    ]));
  }

  // "Im Moment" — prominent, wenn das ein Bedürfnis ist.
  // Im diskreten Modus ohne Klartext-Schlagzeile, damit niemand mitlesen kann.
  if (p.needs.includes('moment') || p.needs.length === 0) {
    view.append(p.discreet
      ? el('div', { class: 'card pad-lg tint-green' }, [
          el('button', { class: 'btn btn-primary', onClick: () => app.openSOS() },
            [el('span', { class: 'icon', html: icon('rings') }), ' Ruhe']),
        ])
      : el('div', { class: 'card pad-lg tint-green' }, [
          el('h2', { text: 'Bist du gerade getriggert?' }),
          el('p', { class: 'muted', text: 'Tipp einmal. Den Rest machen wir zusammen.' }),
          el('button', { class: 'btn btn-primary', style: { marginTop: '6px' }, onClick: () => app.openSOS() },
            [el('span', { class: 'icon', html: icon('rings') }), ' Jetzt Hilfe']),
        ]));
  }

  // Täglicher Check-in: eigene Situationen zuerst, der Rest auf Wunsch.
  {
    const own = p.situations || [];
    const rest = SITUATIONS.filter(x => !own.includes(x.id));
    const goTo = (id) => { buzz(); location.hash = '#/vorbereiten/' + id; };
    const chipFor = (sitId) => {
      const sit = SITUATIONS.find(x => x.id === sitId);
      if (!sit) return null;
      return el('button', { class: 'chip', onClick: () => goTo(sit.id) }, [
        el('span', { class: 'icon', html: icon(sit.icon) }), sit.label,
      ]);
    };

    const chips = el('div', { class: 'chips' }, own.map(chipFor).filter(Boolean));
    const more = el('button', { class: 'chip', onClick: () => {
      more.remove();
      rest.forEach(sit => chips.append(chipFor(sit.id)));
    } }, [el('span', { class: 'icon', html: icon('plus') }), 'Etwas anderes']);
    chips.append(more);

    view.append(el('div', { class: 'card' }, [
      el('div', { class: 'section-label', style: { marginTop: 0 }, text: 'Kurzer Check-in' }),
      el('h3', { text: 'Was machst du heute?' }),
      el('p', { class: 'muted', style: { marginTop: 0 }, text: 'Tipp an, was heute ansteht. Dann zeige ich dir, was dabei hilft.' }),
      chips,
    ]));
  }

  // Tagesanker — nur wenn Struktur gewünscht: zeigt den heutigen Schritt
  if (p.likesStructure === true) {
    const practice = todaysPractice(p);
    view.append(el('div', { class: 'card tint-cream' }, [
      el('div', { class: 'section-label', style: { marginTop: 0 }, text: 'Dein Tagesanker' }),
      el('p', { style: { marginTop: 0, marginBottom: '4px', fontWeight: 600 }, text: `Heute: ${practice.title}` }),
      el('p', { class: 'muted small', style: { marginTop: 0 }, text: `Ca. ${practice.minutes} Min., ohne Druck und ohne Streaks.` }),
      el('div', { class: 'btn-row' }, [
        el('button', { class: 'btn btn-ghost', onClick: () => app.navigate('weg') },
          [el('span', { class: 'icon', html: icon('route') }), ' Zum Schritt']),
        el('button', { class: 'btn btn-ghost', onClick: () => app.openSOS('breathe') },
          [el('span', { class: 'icon', html: icon('breathe') }), ' Kurz atmen']),
      ]),
    ]));
  }

  // "Auf Dauer" — Bereiche, geordnet nach Bedürfnis
  view.append(el('div', { class: 'section-label', text: 'Auf Dauer' }));
  for (const key of orderedAreas(p)) {
    const a = AREAS[key];
    view.append(el('button', { class: 'tile', onClick: () => app.navigate(a.route) }, [
      el('span', { class: 'emoji', html: icon(a.icon) }),
      el('span', { class: 't-body' }, [
        el('span', { class: 't-title', text: a.title }),
        el('span', { class: 't-sub', text: a.sub }),
      ]),
      el('span', { class: 'chev', html: '›' }),
    ]));
  }

  // KI-Chat, nur wenn eingerichtet
  if (aiReady(p)) {
    view.append(el('button', { class: 'tile', onClick: () => app.navigate('chat') }, [
      el('span', { class: 'emoji', html: icon('sparkles') }),
      el('span', { class: 't-body' }, [
        el('span', { class: 't-title', text: 'Fragen stellen' }),
        el('span', { class: 't-sub', text: 'Dein KI-Assistent zu Misophonie und Misokinesie' }),
      ]),
      el('span', { class: 'chev', html: '›' }),
    ]));
  }

  // Fuß: leiser Hinweis auf Hilfe
  view.append(el('div', { style: { marginTop: '10px' } }, [
    el('button', { class: 'btn btn-quiet', onClick: () => app.navigate('hilfe') },
      [el('span', { class: 'icon', html: icon('heart') }), ' Hilfe holen']),
  ]));

  return view;
}

function orderedAreas(p) {
  const base = ['weg', 'verstehen', 'vorbereiten', 'tagebuch'];
  const score = (k) => {
    if (k === 'weg' && p.needs.includes('develop')) return 0;
    if (k === 'tagebuch' && p.needs.includes('journal')) return 0;
    if (k === 'verstehen' && p.needs.includes('understand')) return 0;
    return 1;
  };
  return base.slice().sort((a, b) => score(a) - score(b));
}

function greeting(p) {
  const name = p.name ? `, ${p.name}` : '';
  return `Hallo${name}.`;
}

async function safeEntries() {
  try { return await getEntries(); } catch { return []; }
}

// Behutsam: mind. 3 von 5 Einträgen auf Stufe 4–5, aber nur aus den letzten
// zwei Wochen. Sonst behauptet die App nach einer Pause etwas über ein "Jetzt",
// das längst vorbei ist.
function needsCareHint(entries) {
  const cutoff = Date.now() - 14 * 86400000;
  const recent = entries.filter(e => (e.createdAt || 0) >= cutoff).slice(0, 5);
  if (recent.length < 3) return false;
  const high = recent.filter(e => (e.level || 0) >= 4).length;
  return high >= 3;
}
