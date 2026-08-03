// "Hilfe holen" — respektvoller Verweis auf professionelle & Krisen-Hilfe.
import { el } from './ui.js';
import { CRISIS, DISCLAIMER } from './data.js';
import { icon } from './icons.js';

export async function renderHelp(app) {
  const view = el('div', { class: 'stack' });

  view.append(el('div', { class: 'card' }, [
    el('h2', { text: 'Du musst da nicht allein durch.' }),
    el('p', { class: 'lead', style: { margin: 0 }, text: CRISIS.intro }),
  ]));

  view.append(el('div', { class: 'section-label', text: 'Jemanden erreichen' }));
  for (const c of CRISIS.contacts) {
    view.append(el('a', { class: 'tile', href: 'tel:' + c.tel, style: { textDecoration: 'none' } }, [
      el('span', { class: 'emoji', html: icon('phone') }),
      el('span', { class: 't-body' }, [
        el('span', { class: 't-title', text: c.value }),
        el('span', { class: 't-sub', text: c.label }),
      ]),
      el('span', { class: 'chev', html: '›' }),
    ]));
  }

  view.append(el('div', { class: 'note soft' }, CRISIS.note));

  view.append(el('div', { class: 'card' }, [
    el('h3', { text: 'Wann sich Hilfe besonders lohnt' }),
    el('ul', { style: { margin: 0, paddingLeft: '20px', color: 'var(--muted)' } }, [
      el('li', { text: 'Wenn Misophonie deinen Alltag stark einschränkt (Essen, Arbeit, Schule, Kontakte).' }),
      el('li', { text: 'Wenn du dich zunehmend zurückziehst oder niedergeschlagen fühlst.' }),
      el('li', { text: 'Wenn dunkle Gedanken auftauchen: dann bitte sofort eine der Nummern oben.' }),
    ]),
    el('p', { class: 'muted', style: { marginTop: '10px', marginBottom: 0 }, text: 'Um Hilfe zu bitten ist ein Zeichen von Stärke, nicht von Schwäche.' }),
  ]));

  view.append(el('p', { class: 'disclaimer', text: DISCLAIMER }));
  return view;
}
