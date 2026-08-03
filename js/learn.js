// "Verstehen" — kurze, validierende Psychoedukation.
import { el } from './ui.js';
import { LEARN } from './data.js';

export async function renderLearn(app) {
  const view = el('div', { class: 'stack' });
  view.append(
    el('p', { class: 'muted', text: 'Ein paar ruhige Gedanken — lies, was dir gerade guttut. Kein Muss, keine Reihenfolge.' }),
  );
  for (const c of LEARN) {
    view.append(el('div', { class: 'card' }, [
      el('h3', { text: `${c.emoji}  ${c.title}` }),
      el('p', { class: 'lead', style: { margin: 0 }, text: c.body }),
    ]));
  }
  view.append(el('div', { style: { marginTop: '6px' } }, [
    el('button', { class: 'btn btn-quiet', onClick: () => app.navigate('hilfe') }, 'Wann professionelle Hilfe guttut →'),
  ]));
  return view;
}
