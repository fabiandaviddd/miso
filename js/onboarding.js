// Onboarding als "Kennenlernen" — kein Formular.
// Gibt zuerst (Validierung, Zusage), fragt dann sanft, und zeigt am Ende,
// wie es die App umgeformt hat. Selbst schon misophonie-sensibel: still,
// eine Sache pro Schritt, nichts erzwungen.
import { el, mount, buzz } from './ui.js';
import { TRIGGERS, SITUATIONS, HELPS, SOS_TOOLS, DISCLAIMER } from './data.js';

export function renderOnboarding(app, root) {
  const draft = app.profile; // Default-Profil, wird hier befüllt
  let i = 0;

  const steps = buildSteps();

  function refresh() { paint(); }
  function next() { if (i < steps.length - 1) { i++; buzz(); paint(); } }
  function back() { if (i > 0) { i--; paint(); } }

  async function finish() {
    // Abgeleitete Konfiguration: Notfall-Werkzeuge aus "was hilft schon".
    draft.sosTools = deriveSosTools(draft);
    if (hasHelp(draft, 'mask')) draft.sound.enabled = true; // sie sagt: Maskieren hilft
    draft.onboardingComplete = true;
    draft.seenDisclaimer = true;
    await app.save();
    location.hash = '#/start';
    app.rerender();
  }

  function paint() {
    const step = steps[i];
    const ctx = { draft, refresh, next, back };

    const dots = el('div', { class: 'ob-progress', 'aria-hidden': 'true' },
      steps.map((_, idx) => el('div', {
        class: 'ob-dot' + (idx < i ? ' done' : idx === i ? ' active' : ''),
      })));

    const body = el('div', { class: 'ob-body' }, step.body(ctx));

    const isLast = i === steps.length - 1;
    const foot = el('div', { class: 'ob-foot' }, [
      i > 0 ? el('button', { class: 'btn btn-quiet auto', text: 'Zurück', onClick: back }) : null,
      el('div', { class: 'grow' }),
      step.canSkip ? el('button', { class: 'btn btn-quiet auto', text: 'Überspringen', onClick: next }) : null,
      el('button', {
        class: 'btn btn-primary auto',
        text: step.nextLabel || (isLast ? "Los geht's" : 'Weiter'),
        onClick: isLast ? finish : next,
      }),
    ]);

    mount(root, el('div', { class: 'ob' }, [dots, body, foot]));
  }

  paint();
}

// ---------------------------------------------------------------- Schritte

function buildSteps() {
  return [
    // 0 — Ankommen (Validierung zuerst, dann Zusage)
    {
      canSkip: false,
      nextLabel: 'Lass uns anfangen',
      body: () => [
        el('div', { class: 'kicker', text: 'Willkommen' }),
        el('h1', { text: 'Schön, dass du da bist.' }),
        el('p', { class: 'sub', text: 'Was du erlebst, ist real. Hier musst du dich nicht erklären, nichts rechtfertigen und nichts „aushalten“.' }),
        el('p', { class: 'sub', text: 'Ich lerne dich in ein paar ruhigen Schritten kennen und richte mich dann nach dir — nicht umgekehrt.' }),
        el('div', { class: 'note soft', style: { marginTop: '18px' } }, [
          '🔒 Alles, was du mir erzählst, bleibt auf diesem Gerät. Kein Konto, kein Server, keine Weitergabe.',
        ]),
        el('p', { class: 'ob-hint', text: 'Du kannst jederzeit etwas überspringen und später alles ändern.' }),
      ],
    },

    // 1 — Name (optional)
    {
      canSkip: true,
      body: (ctx) => [
        el('div', { class: 'kicker', text: 'Kennenlernen' }),
        el('h1', { text: 'Wie darf ich dich nennen?' }),
        el('p', { class: 'sub', text: 'Ganz wie du magst — Vorname, Spitzname, oder lass es frei. Nur für dich sichtbar.' }),
        el('label', { class: 'field', style: { marginTop: '10px' } }, [
          el('input', {
            type: 'text', value: ctx.draft.name || '', placeholder: 'Dein Name (optional)',
            autocomplete: 'off', maxLength: 40,
            onInput: (e) => { ctx.draft.name = e.target.value.trim(); },
          }),
        ]),
        el('p', { class: 'ob-hint', text: '💬 Tipp: Du kannst überall auch die Diktierfunktion deiner Tastatur nutzen.' }),
      ],
    },

    // 2 — Was brauchst du gerade?
    {
      canSkip: false,
      body: (ctx) => [
        el('div', { class: 'kicker', text: 'Kennenlernen' }),
        el('h1', { text: 'Was brauchst du gerade am meisten?' }),
        el('p', { class: 'sub', text: 'Mehrfachauswahl ist okay. Danach richte ich meine Startseite danach aus.' }),
        multiChips(ctx, 'needs', [
          { id: 'moment', label: '🆘 Hilfe im Moment' },
          { id: 'understand', label: '💚 Verstehen & Ruhe' },
          { id: 'journal', label: '📔 Ein Tagebuch für Therapie' },
          { id: 'unsure', label: '🤍 Weiß ich noch nicht' },
        ]),
      ],
    },

    // 3 — Trigger (Hören / Sehen / schon der Gedanke) + eigene
    {
      canSkip: true,
      body: (ctx) => {
        const wrap = el('div', { class: 'stack' });
        wrap.append(
          el('div', { class: 'kicker', text: 'Kennenlernen' }),
          el('h1', { text: 'Was löst bei dir aus?' }),
          el('p', { class: 'sub', text: 'Tippe an, was passt. Nichts hier wird abgespielt — du liest nur.' }),
        );
        for (const key of ['hear', 'see', 'anticipate']) {
          const group = TRIGGERS[key];
          wrap.append(
            el('div', { class: 'section-label', text: group.label + ' · ' + group.hint }),
            triggerChips(ctx, key, group.items),
          );
        }
        wrap.append(customTriggerAdder(ctx));
        return wrap;
      },
    },

    // 4 — Belastende Situationen
    {
      canSkip: true,
      body: (ctx) => [
        el('div', { class: 'kicker', text: 'Kennenlernen' }),
        el('h1', { text: 'Wo ist es am schwersten?' }),
        el('p', { class: 'sub', text: 'Das hilft mir, dir passende Vorbereitungen anzubieten.' }),
        el('div', { class: 'chips', style: { marginTop: '6px' } },
          SITUATIONS.map(s => chip(s.emoji + ' ' + s.label,
            ctx.draft.situations.includes(s.id),
            (on) => toggle(ctx.draft.situations, s.id, on)))),
      ],
    },

    // 5 — Wie tickst du? (Struktur ja/nein)
    {
      canSkip: false,
      body: (ctx) => [
        el('div', { class: 'kicker', text: 'Kennenlernen' }),
        el('h1', { text: 'Magst du Struktur?' }),
        el('p', { class: 'sub', text: 'Manche mögen Abhaken, Routinen und Überblick. Andere fühlen sich davon eher unter Druck. Beides ist völlig okay.' }),
        el('div', { class: 'stack', style: { marginTop: '8px' } }, [
          bigChoice('✅ Ja, Struktur tut mir gut', 'Ich mag Routinen und den Überblick.',
            ctx.draft.likesStructure === true, () => { ctx.draft.likesStructure = true; ctx.refresh(); }),
          bigChoice('🍃 Nein, das stresst mich eher', 'Halt es für mich schlicht — nur Werkzeuge, wenn ich sie brauche.',
            ctx.draft.likesStructure === false, () => { ctx.draft.likesStructure = false; ctx.refresh(); }),
        ]),
      ],
    },

    // 6 — Was hilft dir schon?
    {
      canSkip: true,
      body: (ctx) => [
        el('div', { class: 'kicker', text: 'Kennenlernen' }),
        el('h1', { text: 'Was hilft dir jetzt schon?' }),
        el('p', { class: 'sub', text: 'Was du schon nutzt, lege ich dir in der Notfall-Hilfe nach vorn.' }),
        el('div', { class: 'chips', style: { marginTop: '6px' } },
          HELPS.map(h => chip(h.label, ctx.draft.helps.includes(h.id),
            (on) => toggle(ctx.draft.helps, h.id, on)))),
      ],
    },

    // 7 — Spiegel: so habe ich mich eingerichtet
    {
      canSkip: false,
      body: (ctx) => [
        el('div', { class: 'kicker', text: 'Fast fertig' }),
        el('h1', { text: mirrorTitle(ctx.draft) }),
        el('p', { class: 'sub', text: 'So habe ich mich für dich eingerichtet:' }),
        el('div', { class: 'card', style: { marginTop: '8px' } },
          el('ul', { style: { margin: 0, paddingLeft: '20px' } },
            describeAdaptation(ctx.draft).map(t => el('li', { text: t, style: { marginBottom: '8px' } })))),
        el('p', { class: 'ob-hint', text: 'Du kannst das jederzeit ändern — über „Mehr“ und „Kennenlernen anpassen“.' }),
        el('p', { class: 'disclaimer', text: DISCLAIMER }),
      ],
    },
  ];
}

// ---------------------------------------------------------------- Bausteine

function chip(label, pressed, onToggle) {
  const c = el('button', { class: 'chip', 'aria-pressed': pressed ? 'true' : 'false', type: 'button' }, label);
  c.addEventListener('click', () => {
    const now = c.getAttribute('aria-pressed') !== 'true';
    c.setAttribute('aria-pressed', now ? 'true' : 'false');
    buzz();
    onToggle(now);
  });
  return c;
}

function multiChips(ctx, field, options) {
  return el('div', { class: 'chips', style: { marginTop: '6px' } },
    options.map(o => chip(o.label, ctx.draft[field].includes(o.id),
      (on) => toggle(ctx.draft[field], o.id, on))));
}

function triggerChips(ctx, type, items) {
  return el('div', { class: 'chips' },
    items.map(label => chip(label, hasTrigger(ctx.draft, type, label),
      (on) => setTrigger(ctx.draft, type, label, on))));
}

function customTriggerAdder(ctx) {
  const input = el('input', { type: 'text', placeholder: 'Eigenen Trigger hinzufügen …', maxLength: 60, autocomplete: 'off' });
  const add = () => {
    const label = input.value.trim();
    if (!label) return;
    setTrigger(ctx.draft, 'custom', label, true);
    input.value = '';
    ctx.refresh();
  };
  const customs = ctx.draft.triggers.filter(t => t.type === 'custom');
  return el('div', { class: 'stack', style: { marginTop: '14px' } }, [
    el('div', { class: 'section-label', text: 'Eigene' }),
    customs.length ? el('div', { class: 'chips' },
      customs.map(t => chip(t.label, true, (on) => { if (!on) setTrigger(ctx.draft, 'custom', t.label, false); ctx.refresh(); }))) : null,
    el('div', { class: 'btn-row', style: { gap: '10px' } }, [
      input,
      el('button', { class: 'btn btn-ghost auto', text: 'Hinzufügen', onClick: add }),
    ]),
  ]);
}

function bigChoice(title, sub, pressed, onClick) {
  return el('button', {
    class: 'tile', 'aria-pressed': pressed ? 'true' : 'false',
    style: pressed ? { borderColor: 'var(--green)', background: 'var(--green-ghost)' } : {},
    onClick,
  }, [
    el('div', { class: 't-body' }, [
      el('div', { class: 't-title', text: title }),
      el('div', { class: 't-sub', text: sub }),
    ]),
    el('div', { class: 'chev', html: pressed ? '✓' : '' }),
  ]);
}

// ---------------------------------------------------------------- Logik

function toggle(arr, id, on) {
  const idx = arr.indexOf(id);
  if (on && idx === -1) arr.push(id);
  if (!on && idx !== -1) arr.splice(idx, 1);
}

function hasTrigger(draft, type, label) {
  return draft.triggers.some(t => t.type === type && t.label === label);
}
function setTrigger(draft, type, label, on) {
  const idx = draft.triggers.findIndex(t => t.type === type && t.label === label);
  if (on && idx === -1) draft.triggers.push({ type, label });
  if (!on && idx !== -1) draft.triggers.splice(idx, 1);
}
function hasHelp(draft, id) { return draft.helps.includes(id); }

export function deriveSosTools(draft) {
  const chosen = new Set();
  // Zuerst Werkzeuge, die zu "was hilft schon" passen.
  for (const tool of SOS_TOOLS) {
    if (tool.suggestFrom && tool.suggestFrom.some(h => draft.helps.includes(h))) chosen.add(tool.id);
  }
  // Kern-Werkzeuge immer verfügbar, in ruhiger Reihenfolge auffüllen.
  const order = ['breathe', 'leave', 'ground', 'reframe', 'surf', 'kind', 'mask'];
  const result = [];
  for (const id of order) if (chosen.has(id)) result.push(id);
  for (const id of order) if (!result.includes(id)) result.push(id);
  return result;
}

function mirrorTitle(draft) {
  return draft.name ? `Danke, ${draft.name}.` : 'Danke fürs Kennenlernen.';
}

export function describeAdaptation(draft) {
  const out = [];
  const needs = draft.needs;
  if (needs.includes('moment')) out.push('Die Notfall-Hilfe steht bei dir ganz vorn — im Ernstfall ein Fingertipp entfernt.');
  if (needs.includes('understand')) out.push('Ruhige Erklärungen und Übungen bekommen auf der Startseite Platz.');
  if (needs.includes('journal')) out.push('Dein Tagebuch für die Therapie ist gleich griffbereit.');
  if (!needs.length || needs.includes('unsure')) out.push('Ich halte alles offen und schlicht — du findest in deinem Tempo, was dir hilft.');

  if (draft.likesStructure === true) out.push('Weil dir Struktur guttut, zeige ich dir einen sanften Tagesanker — ganz ohne Druck oder Streaks.');
  if (draft.likesStructure === false) out.push('Weil Struktur dich eher stresst, blende ich Routinen aus. Nur Werkzeuge, wenn du sie brauchst.');

  const trg = draft.triggers.length;
  if (trg) out.push(`Deine ${trg} ${trg === 1 ? 'Auslöser ist' : 'Auslöser sind'} im Tagebuch schon vorausgewählt.`);
  if (draft.situations.length) out.push('Für deine schwierigen Situationen liegen passende Vorbereitungen bereit.');
  if (draft.helps.includes('mask')) out.push('Den Ruhe-Klang habe ich dir freigeschaltet — er startet trotzdem nur, wenn du ihn antippst.');
  return out;
}
