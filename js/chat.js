// KI-Chat: Fragen zu Misophonie und Misokinesie. Sendet NUR, was hier
// getippt wird (nie Tagebuch- oder Profildaten). Braucht den eigenen
// API-Schlüssel aus "Mehr". Verlauf bleibt lokal (IndexedDB).
import { el, mount, toast } from './ui.js';
import { icon } from './icons.js';
import { getKV, setKV } from './store.js';
import { aiReady, callAI, CHAT_SYSTEM } from './ai.js';

const SUGGESTIONS = [
  'Was hilft im Triggermoment?',
  'Was ist Misokinesie?',
  'Wie erkläre ich Misophonie meiner Familie?',
  'Was gibt es Neues aus der Forschung?',
];

const MAX_STORED = 40;   // Verlauf lokal begrenzen
const MAX_SENT = 12;     // wie viele Nachrichten pro Anfrage mitgehen

export async function renderChat(app) {
  const p = app.profile;
  const container = el('div', {});

  if (!aiReady(p)) {
    mount(container, el('div', { class: 'stack' }, [
      el('div', { class: 'card' }, [
        el('h3', { text: 'Der KI-Assistent ist noch nicht eingerichtet' }),
        el('p', { class: 'muted', text: 'Für den Chat brauchst du einen eigenen API-Schlüssel von Anthropic. Er wird nur auf deinem Gerät gespeichert, und die App spricht direkt mit dem KI-Dienst. Es gibt keinen Server dazwischen.' }),
        el('button', { class: 'btn btn-primary', onClick: () => app.navigate('mehr') }, 'Zu den Einstellungen'),
      ]),
      el('div', { class: 'note' }, 'Ohne KI funktioniert MisoNIE vollständig weiter. Der Assistent ist ein Extra, kein Muss.'),
    ]));
    return container;
  }

  let history = (await getKV('chatHistory')) || [];
  let busy = false;

  const list = el('div', { class: 'chat-list' });
  const input = el('textarea', { placeholder: 'Deine Frage …', rows: 2, maxLength: 2000 });
  const sendBtn = el('button', { class: 'btn btn-primary auto', 'aria-label': 'Senden' }, 'Senden');

  function paintMessages() {
    const nodes = [];
    if (!history.length) {
      nodes.push(el('div', { class: 'card' }, [
        el('p', { style: { margin: 0 } }, [
          el('span', { class: 'icon', html: icon('lightbulb'), style: { color: 'var(--green-soft)', marginRight: '8px' } }),
          'Frag mich zu Misophonie und Misokinesie: Alltag, Forschung, Worte für dein Umfeld. Ich kenne dein Tagebuch nicht und sehe nur, was du hier schreibst.',
        ]),
      ]));
      nodes.push(el('div', { class: 'chips' }, SUGGESTIONS.map(s =>
        el('button', { class: 'chip', onClick: () => { input.value = s; send(); } }, s))));
    }
    for (const m of history) {
      nodes.push(el('div', { class: 'msg ' + (m.role === 'user' ? 'me' : 'ai') },
        el('div', { class: 'bubble', text: m.content })));
    }
    if (busy) nodes.push(el('div', { class: 'msg ai' }, el('div', { class: 'bubble typing', text: '…' })));
    mount(list, nodes);
    setTimeout(() => { list.lastElementChild?.scrollIntoView({ block: 'end' }); }, 30);
  }

  async function send() {
    const text = input.value.trim();
    if (!text || busy) return;
    input.value = '';
    history.push({ role: 'user', content: text });
    busy = true; sendBtn.disabled = true;
    paintMessages();
    try {
      const messages = history.slice(-MAX_SENT).map(m => ({ role: m.role, content: m.content }));
      const reply = await callAI(p, { system: CHAT_SYSTEM, messages, maxTokens: 1024 });
      history.push({ role: 'assistant', content: reply });
    } catch (e) {
      history.push({ role: 'assistant', content: 'Das hat gerade nicht geklappt: ' + e.message });
    }
    history = history.slice(-MAX_STORED);
    await setKV('chatHistory', history);
    busy = false; sendBtn.disabled = false;
    paintMessages();
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });

  const clearBtn = el('button', { class: 'btn btn-quiet', onClick: async () => {
    if (history.length && confirm('Chat-Verlauf löschen?')) {
      history = []; await setKV('chatHistory', []); paintMessages();
    }
  } }, 'Verlauf löschen');

  paintMessages();

  mount(container, el('div', { class: 'stack' }, [
    el('p', { class: 'muted small', style: { marginBottom: 0 }, text: 'Antworten kommen von einer KI (über deinen eigenen Schlüssel) und können Fehler enthalten. Keine Diagnose, keine Therapie. Dein Tagebuch wird nie mitgesendet.' }),
    list,
    el('div', { class: 'chat-input' }, [input, sendBtn]),
    clearBtn,
  ]));
  return container;
}
