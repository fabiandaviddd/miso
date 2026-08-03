// "Verstehen" — kurze, validierende Psychoedukation + Forschung des Monats.
import { el } from './ui.js';
import { LEARN, RESEARCH } from './data.js';
import { icon } from './icons.js';

const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export async function renderLearn(app) {
  const view = el('div', { class: 'stack' });
  view.append(
    el('p', { class: 'muted', text: 'Ein paar ruhige Gedanken. Lies, was dir gerade guttut. Kein Muss, keine Reihenfolge.' }),
  );

  // Forschungs-Fund des Monats (rotiert monatlich durch kuratierte Studien)
  const now = new Date();
  const finding = RESEARCH[(now.getFullYear() * 12 + now.getMonth()) % RESEARCH.length];
  view.append(el('div', { class: 'card', style: { borderColor: 'var(--green-deep)' } }, [
    el('div', { class: 'section-label', style: { marginTop: 0 }, text: `Aus der Forschung · ${MONTHS[now.getMonth()]} ${now.getFullYear()}` }),
    el('h3', { text: finding.title }),
    el('p', { class: 'lead', style: { marginBottom: '8px' }, text: finding.body }),
    el('p', { class: 'faint small', style: { margin: 0 }, text: 'Quelle: ' + finding.source }),
  ]));
  for (const c of LEARN) {
    view.append(el('div', { class: 'card' }, [
      el('h3', { class: 'h-icon' }, [el('span', { class: 'icon', html: icon(c.icon) }), c.title]),
      el('p', { class: 'lead', style: { margin: 0 }, text: c.body }),
    ]));
  }
  view.append(el('div', { style: { marginTop: '6px' } }, [
    el('button', { class: 'btn btn-quiet', onClick: () => app.navigate('hilfe') }, 'Wann professionelle Hilfe guttut →'),
  ]));
  return view;
}
