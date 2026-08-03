// Adaptive Startseite. Reihenfolge & Sichtbarkeit richten sich nach dem
// Onboarding: die App passt sich der Person an, nicht umgekehrt.
import { el } from './ui.js';
import { getEntries } from './store.js';

const AREAS = {
  verstehen:   { emoji: '💚', title: 'Verstehen', sub: 'Was Misophonie ist — und dass du nicht allein bist', route: 'verstehen' },
  vorbereiten: { emoji: '🧭', title: 'Vorbereiten', sub: 'Für schwierige Situationen & Gespräche gewappnet sein', route: 'vorbereiten' },
  tagebuch:    { emoji: '📔', title: 'Tagebuch', sub: 'Kurz festhalten — auch für deine Therapie', route: 'tagebuch' },
};

export async function renderHome(app) {
  const p = app.profile;
  const entries = await safeEntries();
  const view = el('div', { class: 'stack-lg' });

  // Sanfte Begrüßung
  view.append(el('div', {}, [
    el('h1', { text: greeting(p) }),
    el('p', { class: 'muted', style: { marginTop: '-2px' }, text: 'Ich bin da. In deinem Tempo.' }),
  ]));

  // Behutsamer Hilfe-Hinweis bei anhaltend hoher Belastung
  if (needsCareHint(entries)) {
    view.append(el('button', {
      class: 'note care', style: { textAlign: 'left', width: '100%', cursor: 'pointer', display: 'block' },
      onClick: () => app.navigate('hilfe'),
    }, [
      el('div', { html: '<strong>Die letzten Tage waren schwer.</strong>' }),
      'Das tut mir leid. Du musst da nicht allein durch — hier findest du Menschen, die zuhören. Tippen zum Öffnen.',
    ]));
  }

  // "Im Moment" — prominent, wenn das ein Bedürfnis ist
  if (p.needs.includes('moment') || p.needs.length === 0) {
    view.append(el('div', { class: 'card pad-lg', style: { background: 'linear-gradient(160deg, var(--surface-2), var(--surface))' } }, [
      el('h2', { text: 'Bist du gerade getriggert?' }),
      el('p', { class: 'muted', text: 'Ein Fingertipp — und wir gehen zusammen durch den Moment. Kein Nachdenken nötig.' }),
      el('button', { class: 'btn btn-primary', style: { marginTop: '6px' }, onClick: () => app.openSOS() },
        [el('span', { html: '🆘' }), ' Jetzt Hilfe']),
    ]));
  }

  // Tagesanker — nur wenn Struktur gewünscht ist
  if (p.likesStructure === true) {
    view.append(el('div', { class: 'card' }, [
      el('div', { class: 'section-label', style: { marginTop: 0 }, text: 'Dein Tagesanker' }),
      el('p', { class: 'muted', style: { marginTop: 0 }, text: 'Eine Minute Ruhe, wann immer du magst. Ohne Druck, ohne Serie.' }),
      el('div', { class: 'btn-row' }, [
        el('button', { class: 'btn btn-ghost', onClick: () => app.openSOS('breathe') }, '🫧 Kurz atmen'),
        el('button', { class: 'btn btn-ghost', onClick: () => app.navigate('tagebuch') }, '📔 Eintrag'),
      ]),
    ]));
  }

  // "Auf Dauer" — Bereiche, geordnet nach Bedürfnis
  view.append(el('div', { class: 'section-label', text: 'Auf Dauer' }));
  for (const key of orderedAreas(p)) {
    const a = AREAS[key];
    view.append(el('button', { class: 'tile', onClick: () => app.navigate(a.route) }, [
      el('span', { class: 'emoji', html: a.emoji }),
      el('span', { class: 't-body' }, [
        el('span', { class: 't-title', text: a.title }),
        el('span', { class: 't-sub', text: a.sub }),
      ]),
      el('span', { class: 'chev', html: '›' }),
    ]));
  }

  // Fuß: leiser Hinweis auf Hilfe + Einstellungen
  view.append(el('div', { style: { marginTop: '10px' } }, [
    el('button', { class: 'btn btn-quiet', onClick: () => app.navigate('hilfe') }, '🤍 Hilfe holen'),
  ]));

  return view;
}

function orderedAreas(p) {
  const base = ['verstehen', 'vorbereiten', 'tagebuch'];
  const score = (k) => {
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

// Behutsam: mind. 3 der letzten 5 Einträge auf Stufe 4–5 -> sanfter Hinweis.
function needsCareHint(entries) {
  const recent = entries.slice(0, 5);
  if (recent.length < 3) return false;
  const high = recent.filter(e => (e.level || 0) >= 4).length;
  return high >= 3;
}
