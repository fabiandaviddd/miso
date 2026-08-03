// "Vorbereiten" — Situations-Karten (nach eigenen Situationen zuerst),
// Kommunikations-Skripte und eine teilbare "Das-ist-Misophonie"-Karte.
import { el, toast } from './ui.js';
import { PREPARE, SCRIPTS, SITUATIONS } from './data.js';
import { icon } from './icons.js';

export async function renderPrepare(app) {
  const p = app.profile;
  const view = el('div', { class: 'stack' });
  view.append(el('p', { class: 'muted', text: 'Konkrete Ideen für schwierige Situationen, und Worte, wenn du sie brauchst. Nimm, was passt.' }));

  // Deep-Link: #/vorbereiten/<id> öffnet gezielt eine Karte (z. B. vom Check-in).
  const focusId = (location.hash.replace(/^#\/?/, '').split('/')[1]) || null;

  // Situationen: eigene zuerst, dann der Rest.
  const own = p.situations || [];
  const order = [...own, ...SITUATIONS.map(s => s.id).filter(id => !own.includes(id))];
  if (focusId && order.includes(focusId)) {
    order.splice(order.indexOf(focusId), 1);
    order.unshift(focusId);
  }

  for (const id of order) {
    const card = PREPARE[id];
    if (!card) continue;
    const isOwn = own.includes(id);
    const isFocus = focusId ? id === focusId : (isOwn && own.indexOf(id) === 0);
    view.append(el('details', { class: 'card', open: isFocus ? true : null }, [
      el('summary', { class: 'sum-icon', style: { cursor: 'pointer', fontWeight: '600', listStyle: 'none' } }, [
        el('span', { class: 'icon', html: icon(card.icon) }),
        el('span', { text: card.title }),
        isOwn ? el('span', { class: 'faint small', text: ' · für dich' }) : null,
      ]),
      el('ul', { style: { margin: '12px 0 0', paddingLeft: '20px', color: 'var(--muted)' } },
        card.tips.map(t => el('li', { text: t, style: { marginBottom: '8px' } }))),
    ]));
  }

  // Kommunikations-Skripte
  view.append(el('div', { class: 'section-label', text: 'Worte für andere' }));
  for (const s of SCRIPTS) {
    view.append(el('div', { class: 'card' }, [
      el('h3', { text: s.title }),
      el('ul', { style: { margin: 0, paddingLeft: '20px', color: 'var(--muted)' } },
        s.lines.map(l => el('li', { text: l, style: { marginBottom: '6px' } }))),
    ]));
  }

  // Teilbare Karte
  view.append(el('div', { class: 'section-label', text: 'Für dein Umfeld' }));
  view.append(el('div', { class: 'card' }, [
    el('h3', { class: 'h-icon' }, [el('span', { class: 'icon', html: icon('share') }), 'Misophonie-Karte']),
    el('p', { class: 'muted', text: 'Ein kurzer Text, den du weitergeben kannst, wenn Erklären schwerfällt.' }),
    el('button', { class: 'btn btn-ghost', onClick: () => shareMisoCard(p) }, 'Text kopieren / teilen'),
  ]));

  return view;
}

function misoCardText(p) {
  const name = p.name ? p.name : 'Ich';
  return [
    `${name} hat Misophonie.`,
    'Bestimmte Geräusche (und manchmal ihr Anblick) lösen eine starke, unwillkürliche Stressreaktion aus. Das ist neurologisch, kein böser Wille und keine Überempfindlichkeit „aus Prinzip“.',
    'Es hilft: kurze Pausen/Rückzug ohne Nachfragen, Hintergrundgeräusche erlauben, das Thema in ruhigen Momenten ansprechen, nicht mitten im Trigger.',
    'Danke, dass du Rücksicht nimmst. Das bedeutet mehr, als du denkst.',
  ].join('\n\n');
}

async function shareMisoCard(p) {
  const text = misoCardText(p);
  try {
    if (navigator.share) { await navigator.share({ title: 'Über Misophonie', text }); return; }
  } catch { /* Nutzer hat abgebrochen o. ä. */ }
  try { await navigator.clipboard.writeText(text); toast('In die Zwischenablage kopiert'); }
  catch { toast('Teilen nicht verfügbar'); }
}
