// Notfallhilfe im Triggermoment. Vollbild, ruhig, eine Aktion pro Screen,
// große Flächen. Nie ein überraschender Ton — der Ruheklang startet nur auf
// ausdrücklichen Tipp.
import { el, mount, clear, buzz, toast } from './ui.js';
import {
  SOS_TOOLS, GROUNDING, EXIT_LINES, REFRAME_LINES, KIND_LINES, TRIGGERS,
} from './data.js';
import { addEntry } from './store.js';
import { icon } from './icons.js';

export function openSOS(app, directToolId) {
  const overlay = el('div', { class: 'tool', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Hilfe im Moment' });
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const mask = new MaskPlayer();
  let cleanup = null;

  function close() {
    if (cleanup) cleanup();
    mask.stop(true);
    document.body.style.overflow = '';
    overlay.remove();
  }

  function show(builder, { back } = {}) {
    if (cleanup) { cleanup(); cleanup = null; }
    const top = el('div', { class: 'tool-top' }, [
      back ? el('button', { class: 'iconbtn', 'aria-label': 'Zurück', html: '‹', onClick: () => open(back) }) : el('div', {}),
      el('div', { class: 'spacer' }),
      el('button', { class: 'iconbtn', 'aria-label': 'Schließen', html: '✕', onClick: close }),
    ]);
    const body = el('div', { class: 'tool-body' });
    mount(overlay, [top, body]);
    cleanup = builder(body, { app, close, open, mask, show }) || null;
  }

  function open(toolId) {
    if (!toolId) return showList(app, show);
    const builder = TOOLS[toolId];
    if (builder) show(builder, { back: null });
    else showList(app, show);
  }

  if (directToolId && TOOLS[directToolId]) show(TOOLS[directToolId]);
  else showList(app, show);

  // Escape schließt.
  overlay.tabIndex = -1;
  overlay.focus();
  overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// ---------------------------------------------------------------- Liste

function showList(app, show) {
  show((body, ctx) => {
    const p = app.profile;
    const ids = (p.sosTools && p.sosTools.length) ? p.sosTools : SOS_TOOLS.map(t => t.id);
    const tools = ids.map(id => SOS_TOOLS.find(t => t.id === id)).filter(Boolean)
      .filter(t => !(t.needsSound && !p.sound.enabled) || true); // Ruheklang bleibt sichtbar, fragt selbst nach

    const wrap = el('div', { class: 'stack', style: { width: '100%' } });
    wrap.append(
      el('h1', { text: 'Ich bin da.' }),
      el('p', { class: 'muted', text: 'Wähle, was dir jetzt hilft. Es gibt kein Richtig oder Falsch.' }),
    );
    for (const t of tools) {
      wrap.append(el('button', { class: 'tile', onClick: () => open(t.id) }, [
        el('span', { class: 'emoji', html: icon(t.icon) }),
        el('span', { class: 't-body' }, [
          el('span', { class: 't-title', text: t.title }),
          el('span', { class: 't-sub', text: t.sub }),
        ]),
        el('span', { class: 'chev', html: '›' }),
      ]));
    }
    function open(id) { const b = TOOLS[id]; if (b) show(b, { back: null }); }
    body.classList.add('scroll');
    mount(body, wrap);
  });
}

// ---------------------------------------------------------------- Werkzeuge

const TOOLS = {
  breathe(body, ctx) {
    const phase = el('div', { class: 'phase', text: 'Bereit?' });
    const orb = el('div', { class: 'orb' });
    mount(body, el('div', { class: 'breath-wrap' }, [
      el('h1', { class: 'center', text: 'Atemanker' }),
      el('p', { class: 'muted center', text: 'Folge dem Kreis. Einatmen, ausatmen.' }),
      el('div', { class: 'breath' }, [orb, phase]),
      doneRow(ctx),
    ]));
    // Phasen-Text im Takt der CSS-Animation (10 s Zyklus).
    let t = [];
    const cycle = () => {
      phase.textContent = 'Einatmen';
      t.push(setTimeout(() => { phase.textContent = 'Halten'; }, 4000));
      t.push(setTimeout(() => { phase.textContent = 'Ausatmen'; }, 5500));
      t.push(setTimeout(cycle, 10000));
    };
    const start = setTimeout(cycle, 400);
    return () => { clearTimeout(start); t.forEach(clearTimeout); };
  },

  leave(body, ctx) {
    mount(body, el('div', { class: 'stack', style: { width: '100%' } }, [
      el('h1', { text: 'Raus hier. Das ist erlaubt.' }),
      el('p', { class: 'muted', text: 'Kurz rauszugehen ist kein Versagen und nicht unhöflich. Du schützt dich damit und musst dich nicht erklären.' }),
      el('div', { class: 'section-label', text: 'Falls du etwas sagen möchtest: tippen zum Kopieren' }),
      ...EXIT_LINES.map(line => copyLine(line)),
      el('p', { class: 'muted small', text: 'Und wenn du nichts sagen willst: Auch das ist völlig okay.' }),
      doneRow(ctx),
    ]));
  },

  ground(body, ctx) {
    let i = 0;
    const paint = () => {
      const step = GROUNDING[i];
      mount(body, el('div', { class: 'grounding-step stack', style: { width: '100%' } }, [
        el('div', { class: 'num', text: String(step.n) }),
        el('h1', { text: `${step.n} Dinge zum ${cap(step.sense)}` }),
        el('p', { class: 'muted', text: step.prompt }),
        el('div', { class: 'btn-row', style: { marginTop: '10px' } }, [
          i > 0 ? el('button', { class: 'btn btn-ghost', onClick: () => { i--; paint(); } }, 'Zurück') : null,
          i < GROUNDING.length - 1
            ? el('button', { class: 'btn btn-primary', onClick: () => { i++; buzz(); paint(); } }, 'Weiter')
            : el('button', { class: 'btn btn-primary', onClick: () => quickCapture(ctx) }, 'Fertig'),
        ]),
      ]));
    };
    paint();
  },

  mask(body, ctx) {
    const p = ctx.app.profile;
    const render = () => {
      if (!p.sound.enabled) {
        mount(body, el('div', { class: 'stack', style: { width: '100%' } }, [
          el('h1', { text: 'Ruheklang' }),
          el('p', { class: 'muted', text: 'Ein gleichmäßiges Rauschen kann Trigger überdecken. Es startet nur, wenn du es möchtest.' }),
          el('button', { class: 'btn btn-primary', onClick: async () => { p.sound.enabled = true; await ctx.app.save(); render(); } }, 'Ruheklang einschalten'),
          doneRow(ctx),
        ]));
        return;
      }
      const playing = ctx.mask.isPlaying();
      const vol = el('input', { type: 'range', min: '0', max: '100', value: String(Math.round((p.sound.volume ?? 0.5) * 100)), style: { width: '100%' } });
      vol.addEventListener('input', () => { const v = vol.value / 100; p.sound.volume = v; ctx.mask.setVolume(v); });
      vol.addEventListener('change', () => ctx.app.save());
      mount(body, el('div', { class: 'stack', style: { width: '100%' } }, [
        el('h1', { text: 'Ruheklang' }),
        el('p', { class: 'muted', text: 'Ein Rauschen, das du drüberlegen kannst. Für den Moment gedacht, nicht für den ganzen Tag.' }),
        el('button', {
          class: 'btn btn-primary',
          onClick: () => { if (ctx.mask.isPlaying()) ctx.mask.stop(); else ctx.mask.start(p.sound.volume ?? 0.5); render(); },
        }, playing ? '⏸ Anhalten' : '▶ Abspielen'),
        el('label', { class: 'field' }, [el('span', { class: 'lbl', text: 'Lautstärke' }), vol]),
        doneRow(ctx),
      ]));
    };
    render();
    return () => {}; // Stop übernimmt der Overlay-Close / Screenwechsel? -> hier bewusst weiterlaufen lassen
  },

  surf(body, ctx) {
    mount(body, el('div', { class: 'stack', style: { width: '100%' } }, [
      el('h1', { text: 'Die Welle reiten' }),
      el('p', { class: 'muted', text: 'Der Impuls (wegrennen, schreien, es abstellen) ist wie eine Welle. Er steigt an und lässt dann wieder nach. Von allein.' }),
      el('div', { class: 'card' }, [
        el('p', { html: '<strong>Du musst nichts tun.</strong> Beobachte die Welle nur, wie von außen:' }),
        el('ul', { style: { margin: 0, paddingLeft: '20px', color: 'var(--muted)' } }, [
          el('li', { text: 'Wo spürst du die Anspannung im Körper?' }),
          el('li', { text: 'Sie darf da sein. Atme langsam weiter.' }),
          el('li', { text: 'Jede Welle wird wieder kleiner, auch diese.' }),
        ]),
      ]),
      el('button', { class: 'btn btn-ghost', onClick: () => { ctx.show(TOOLS.breathe); } }, [el('span', { class: 'icon', html: icon('breathe') }), ' Mit dem Atem begleiten']),
      doneRow(ctx),
    ]));
  },

  reframe(body, ctx) { cycleCards(body, ctx, 'Umdeuten', 'Es ist nicht gegen dich gerichtet.', REFRAME_LINES); },
  kind(body, ctx) { cycleCards(body, ctx, 'Freundlich zu dir', 'Du reagierst nicht falsch.', KIND_LINES); },
};

// ---------------------------------------------------------------- Helfer

function cycleCards(body, ctx, title, sub, lines) {
  let i = 0;
  const paint = () => {
    mount(body, el('div', { class: 'stack', style: { width: '100%' } }, [
      el('h1', { text: title }),
      el('p', { class: 'muted', text: sub }),
      el('div', { class: 'card pad-lg' }, el('p', { class: 'big-statement', style: { margin: 0 }, text: lines[i] })),
      el('div', { class: 'btn-row' }, [
        el('button', { class: 'btn btn-ghost', onClick: () => { i = (i + 1) % lines.length; buzz(); paint(); } }, 'Nächster Satz'),
      ]),
      doneRow(ctx),
    ]));
  };
  paint();
}

function copyLine(text) {
  const btn = el('button', { class: 'btn btn-ghost auto', text: 'Kopieren' });
  btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(text); toast('Kopiert'); }
    catch { toast('Zum Kopieren markieren'); }
  });
  return el('div', { class: 'copyline' }, [el('span', { text }), btn]);
}

function doneRow(ctx) {
  return el('div', { style: { marginTop: '18px' } }, [
    el('div', { class: 'btn-row' }, [
      el('button', { class: 'btn btn-ghost', onClick: () => quickCapture(ctx) }, [el('span', { class: 'icon', html: icon('pencil') }), ' Kurz festhalten']),
      el('button', { class: 'btn btn-quiet', onClick: ctx.close }, 'Schließen'),
    ]),
  ]);
}

// Optionale, sehr kurze Erfassung direkt aus dem Moment.
function quickCapture(ctx) {
  const p = ctx.app.profile;
  let level = null;
  const triggerLabels = (p.triggers || []).map(t => t.label);
  const chosen = new Set();

  ctx.show((body) => {
    const levelBtns = el('div', { class: 'levels' },
      [1, 2, 3, 4, 5].map(n => {
        const b = el('button', { class: 'level', 'data-lvl': String(n), 'aria-pressed': 'false', text: String(n) });
        b.addEventListener('click', () => {
          level = n; buzz();
          body.querySelectorAll('.level').forEach(x => x.setAttribute('aria-pressed', 'false'));
          b.setAttribute('aria-pressed', 'true');
        });
        return b;
      }));

    const chips = triggerLabels.length ? el('div', { class: 'chips' },
      triggerLabels.slice(0, 12).map(label => {
        const c = el('button', { class: 'chip', 'aria-pressed': 'false', text: label });
        c.addEventListener('click', () => {
          const on = c.getAttribute('aria-pressed') !== 'true';
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
          if (on) chosen.add(label); else chosen.delete(label);
        });
        return c;
      })) : null;

    const save = async () => {
      await addEntry({
        date: todayStr(), level: level || null,
        triggers: [...chosen], situation: null, helped: [], note: '',
      });
      toast('Festgehalten.');
      ctx.close();
    };

    body.classList.add('scroll');
    mount(body, el('div', { class: 'stack', style: { width: '100%' } }, [
      el('h1', { text: 'Kurz festhalten' }),
      el('p', { class: 'muted', text: 'Nur wenn du magst. Ein paar Sekunden reichen.' }),
      el('div', { class: 'section-label', style: { marginTop: '6px' }, text: 'Wie stark war es? (1 leicht … 5 sehr stark)' }),
      levelBtns,
      chips ? el('div', { class: 'section-label', text: 'Auslöser' }) : null,
      chips,
      el('div', { class: 'btn-row', style: { marginTop: '16px' } }, [
        el('button', { class: 'btn btn-primary', onClick: save }, 'Speichern'),
        el('button', { class: 'btn btn-quiet', onClick: ctx.close }, 'Ohne Speichern schließen'),
      ]),
    ]));
  });
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function todayStr() { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function pad(n) { return String(n).padStart(2, '0'); }

// ---------------------------------------------------------------- Ruheklang

class MaskPlayer {
  constructor() { this.ctx = null; this.src = null; this.gain = null; this.playing = false; }
  isPlaying() { return this.playing; }
  start(volume = 0.5) {
    try {
      this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const buf = this._brownNoise(this.ctx, 2);
      const src = this.ctx.createBufferSource();
      src.buffer = buf; src.loop = true;
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 1600;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.0001;
      src.connect(lp); lp.connect(gain); gain.connect(this.ctx.destination);
      src.start();
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), this.ctx.currentTime + 0.8);
      this.src = src; this.gain = gain; this.playing = true;
    } catch (e) { toast('Klang nicht verfügbar'); }
  }
  setVolume(v) { if (this.gain && this.ctx) this.gain.gain.setTargetAtTime(Math.max(0.0002, v), this.ctx.currentTime, 0.1); }
  stop(immediate = false) {
    if (!this.playing || !this.src) { this.playing = false; return; }
    try {
      const src = this.src, gain = this.gain, ctx = this.ctx;
      if (immediate) { src.stop(); }
      else { gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.25); setTimeout(() => { try { src.stop(); } catch {} }, 700); }
    } catch {}
    this.src = null; this.gain = null; this.playing = false;
  }
  _brownNoise(ctx, seconds) {
    const len = ctx.sampleRate * seconds;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = Math.max(-1, Math.min(1, last * 3.2));
    }
    return buf;
  }
}
