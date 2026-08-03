// Tagebuch — für Selbstüberblick und fürs Therapiegespräch.
// Leitplanken gegen Hypervigilanz: optional, kein Streak/kein Nörgeln,
// immer auch "was hat geholfen" (Blick nach außen statt in die Grübelschleife).
import { el, mount, clear, toast, esc, buzz } from './ui.js';
import { getEntries, addEntry, updateEntry, deleteEntry } from './store.js';
import { SITUATIONS, DISCLAIMER } from './data.js';
import { icon } from './icons.js';

const HELPED = ['Rausgegangen', 'Kopfhörer / Klang', 'Weggeschaut', 'Geatmet', 'Abgelenkt', 'Umgedeutet', 'Angesprochen', 'Mit jemandem geredet', 'Freundlich zu mir', 'Nichts geholfen'];
const LVL_VARS = { 1: '--lvl-1', 2: '--lvl-2', 3: '--lvl-3', 4: '--lvl-4', 5: '--lvl-5' };

export async function renderJournal(app) {
  const container = el('div', {});
  const state = { editId: null, draft: emptyDraft(app) };
  async function repaint() { mount(container, await build(app, state, repaint)); }
  await repaint();
  return container;
}

function emptyDraft(app) {
  return {
    date: todayStr(), level: null,
    triggers: [], situation: '', helped: [], note: '',
  };
}

async function build(app, state, repaint) {
  const p = app.profile;
  const entries = await getEntries();
  const nodes = [];

  // --- Eintrags-Formular ---
  nodes.push(entryForm(app, state, repaint));

  // --- Wochenüberblick ---
  if (entries.length) {
    nodes.push(el('div', { class: 'section-label', text: 'Deine letzten 7 Tage' }));
    nodes.push(weekChart(entries));
  }

  // --- Export ---
  if (entries.length) {
    nodes.push(el('div', { class: 'card' }, [
      el('h3', { class: 'h-icon' }, [el('span', { class: 'icon', html: icon('download') }), 'Datenexport']),
      el('p', { class: 'muted', style: { marginTop: 0 }, text: 'Nimm deine Einträge mit — z. B. für dein Therapiegespräch. Als übersichtliche Seite zum Ausdrucken/als PDF oder als Textdatei.' }),
      el('div', { class: 'btn-row' }, [
        el('button', { class: 'btn btn-ghost', onClick: () => exportPrintable(entries, p) }, [el('span', { class: 'icon', html: icon('printer') }), ' Drucken / PDF']),
        el('button', { class: 'btn btn-ghost', onClick: () => downloadText(entries, p) }, [el('span', { class: 'icon', html: icon('doc') }), ' Textdatei']),
      ]),
    ]));
  }

  // --- Liste ---
  nodes.push(el('div', { class: 'section-label', text: entries.length ? 'Einträge' : '' }));
  if (!entries.length) {
    nodes.push(el('div', { class: 'empty' }, [
      el('div', { class: 'big', html: icon('book') }),
      el('p', { text: 'Noch keine Einträge. Ganz ohne Druck — halte fest, wann und was du magst.' }),
    ]));
  } else {
    const list = el('div', {});
    for (const e of entries) list.append(entryRow(e, state, repaint));
    nodes.push(list);
  }

  nodes.push(el('p', { class: 'disclaimer', text: DISCLAIMER }));
  return el('div', { class: 'stack' }, nodes);
}

// ---------------------------------------------------------------- Formular

function entryForm(app, state, repaint) {
  const d = state.draft;
  const editing = !!state.editId;
  const wrap = el('div', { class: 'card stack' });

  // Stufe 1–5 (Pflicht)
  const levels = el('div', { class: 'levels' }, [1, 2, 3, 4, 5].map(n => {
    const b = el('button', { class: 'level', 'data-lvl': String(n), 'aria-pressed': d.level === n ? 'true' : 'false', text: String(n) });
    b.addEventListener('click', () => {
      d.level = n; buzz();
      wrap.querySelectorAll('.level').forEach(x => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', 'true');
      saveBtn.disabled = !d.level;
    });
    return b;
  }));

  // Auslöser: aus Profil + eigene für diesen Eintrag
  const profileTriggers = (app.profile.triggers || []).map(t => t.label);
  const allTriggerLabels = uniq([...profileTriggers, ...d.triggers]);
  const triggerChips = el('div', { class: 'chips' }, allTriggerLabels.map(label =>
    toggleChip(label, d.triggers.includes(label), (on) => setArr(d.triggers, label, on))));
  const trgInput = el('input', { type: 'text', placeholder: 'Anderer Auslöser …', maxLength: 60, autocomplete: 'off' });
  const addTrg = () => {
    const v = trgInput.value.trim(); if (!v) return;
    if (!d.triggers.includes(v)) d.triggers.push(v);
    trgInput.value = '';
    // Chip anhängen (ohne Volls-Repaint, damit Fokus/Restfeld bleibt)
    triggerChips.append(toggleChip(v, true, (on) => setArr(d.triggers, v, on)));
  };
  trgInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); addTrg(); } });

  // Situation
  const sit = el('select', {}, [
    el('option', { value: '', text: '— Situation wählen (optional) —' }),
    ...SITUATIONS.map(s => el('option', { value: s.id, text: s.label, selected: d.situation === s.id ? true : null })),
  ]);
  sit.addEventListener('change', () => { d.situation = sit.value; });

  // Was hat geholfen (coping-zentriert)
  const helpedChips = el('div', { class: 'chips' }, HELPED.map(h =>
    toggleChip(h, d.helped.includes(h), (on) => setArr(d.helped, h, on))));

  // Notiz
  const note = el('textarea', { placeholder: 'Notiz (optional) — was war, wie ging’s dir?', maxLength: 600 });
  note.value = d.note || '';
  note.addEventListener('input', () => { d.note = note.value; });

  const saveBtn = el('button', { class: 'btn btn-primary', disabled: !d.level }, editing ? 'Änderung speichern' : 'Eintrag speichern');
  saveBtn.addEventListener('click', async () => {
    if (!d.level) return;
    if (editing) {
      await updateEntry(Object.assign({ id: state.editId }, d));
      state.editId = null;
      toast('Aktualisiert');
    } else {
      await addEntry(Object.assign({}, d));
      toast('Gespeichert.');
    }
    state.draft = emptyDraft(app);
    await repaint();
  });

  wrap.append(
    el('h3', { text: editing ? 'Eintrag bearbeiten' : 'Wie war’s gerade?' }),
    el('div', { class: 'section-label', style: { marginTop: 0 }, text: 'Wie stark war es?' }),
    levels,
    el('div', { class: 'levels-legend' }, [el('span', { text: '1 · leicht' }), el('span', { text: '5 · sehr stark' })]),
    el('div', { class: 'section-label', text: 'Auslöser' }),
    triggerChips,
    el('div', { class: 'btn-row', style: { gap: '10px', marginTop: '8px' } }, [trgInput, el('button', { class: 'btn btn-ghost auto', text: '+', onClick: addTrg })]),
    el('div', { class: 'section-label', text: 'Situation' }),
    sit,
    el('div', { class: 'section-label', text: 'Was hat geholfen?' }),
    helpedChips,
    note,
    el('div', { class: 'btn-row', style: { marginTop: '4px' } }, [
      saveBtn,
      editing ? el('button', { class: 'btn btn-quiet auto', text: 'Abbrechen', onClick: async () => { state.editId = null; state.draft = emptyDraft(app); await repaint(); } }) : null,
    ]),
  );
  return wrap;
}

// ---------------------------------------------------------------- Liste

function entryRow(e, state, repaint) {
  const color = `var(${LVL_VARS[e.level] || '--surface-3'})`;
  const row = el('div', { class: 'entry' }, [
    el('div', { class: 'dot', style: { background: color }, text: e.level ? String(e.level) : '·' }),
    el('div', { class: 'e-body' }, [
      el('div', { class: 'e-date', text: prettyDate(e.date, e.createdAt) }),
      (e.triggers && e.triggers.length) || e.situation ? el('div', { class: 'e-triggers' }, [
        ...(e.triggers || []).map(t => el('span', { class: 'tag', text: t })),
        e.situation ? el('span', { class: 'tag', text: sitLabel(e.situation) }) : null,
      ]) : null,
      (e.helped && e.helped.length) ? el('div', {}, (e.helped).map(h => el('span', { class: 'tag help', text: '✓ ' + h }))) : null,
      e.note ? el('div', { class: 'small muted', style: { marginTop: '4px' }, text: e.note }) : null,
      el('div', { style: { marginTop: '8px' } }, [
        el('button', { class: 'btn btn-quiet auto', style: { minHeight: '38px', padding: '0 10px' }, text: 'Bearbeiten', onClick: async () => {
          state.editId = e.id;
          state.draft = { date: e.date, level: e.level, triggers: [...(e.triggers || [])], situation: e.situation || '', helped: [...(e.helped || [])], note: e.note || '' };
          await repaint();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } }),
        el('button', { class: 'btn btn-quiet auto', style: { minHeight: '38px', padding: '0 10px', color: 'var(--danger)' }, text: 'Löschen', onClick: async () => {
          if (confirm('Diesen Eintrag löschen?')) { await deleteEntry(e.id); toast('Gelöscht'); await repaint(); }
        } }),
      ]),
    ]),
  ]);
  return row;
}

// ---------------------------------------------------------------- Wochenüberblick

function weekChart(entries) {
  const days = lastNDays(7);
  const byDate = {};
  for (const e of entries) {
    if (!e.date) continue;
    byDate[e.date] = Math.max(byDate[e.date] || 0, e.level || 0);
  }
  return el('div', { class: 'week' }, days.map(d => {
    const lvl = byDate[d.iso] || 0;
    const h = lvl ? Math.round((lvl / 5) * 100) : 3;
    const color = lvl ? `var(${LVL_VARS[lvl]})` : 'var(--surface-3)';
    return el('div', { class: 'day' }, [
      el('div', { class: 'bar-track' }, el('div', { class: 'bar', style: { height: h + '%', background: color }, title: lvl ? `Stufe ${lvl}` : 'kein Eintrag' })),
      el('div', { class: 'dlabel', text: d.label }),
    ]);
  }));
}

// ---------------------------------------------------------------- Export

function buildReport(entries, p) {
  const name = p.name ? p.name : '—';
  const lines = [];
  lines.push('MisoNIE — Tagebuch-Auszug');
  lines.push('Name: ' + name);
  lines.push('Erstellt: ' + new Date().toLocaleString('de-DE'));
  lines.push('Einträge: ' + entries.length);
  lines.push('');
  lines.push('Hinweis: Selbstbeobachtung, keine Diagnose.');
  lines.push('----------------------------------------');
  for (const e of entries) {
    lines.push('');
    lines.push(`${prettyDate(e.date, e.createdAt)}  —  Stärke: ${e.level ?? '—'}/5`);
    if (e.triggers && e.triggers.length) lines.push('Auslöser: ' + e.triggers.join(', '));
    if (e.situation) lines.push('Situation: ' + sitLabel(e.situation));
    if (e.helped && e.helped.length) lines.push('Geholfen hat: ' + e.helped.join(', '));
    if (e.note) lines.push('Notiz: ' + e.note);
  }
  return lines.join('\n');
}

function downloadText(entries, p) {
  const blob = new Blob([buildReport(entries, p)], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = el('a', { href: url, download: `misonie-tagebuch-${todayStr()}.txt` });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  toast('Textdatei erstellt');
}

function exportPrintable(entries, p) {
  const rows = entries.map(e => `
    <tr>
      <td class="d">${esc(prettyDate(e.date, e.createdAt))}</td>
      <td class="l"><span class="pill l${e.level || 0}">${e.level ?? '–'}</span></td>
      <td>${e.triggers && e.triggers.length ? esc(e.triggers.join(', ')) : '<i>—</i>'}</td>
      <td>${e.situation ? esc(sitLabel(e.situation)) : '<i>—</i>'}</td>
      <td>${e.helped && e.helped.length ? esc(e.helped.join(', ')) : '<i>—</i>'}</td>
      <td>${e.note ? esc(e.note) : ''}</td>
    </tr>`).join('');
  const html = `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8">
    <title>MisoNIE Tagebuch — ${esc(p.name || '')}</title>
    <style>
      body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#12211a;margin:32px;}
      h1{font-size:20px;margin:0 0 4px;} .meta{color:#555;font-size:13px;margin-bottom:16px;}
      table{border-collapse:collapse;width:100%;font-size:13px;}
      th,td{border-bottom:1px solid #ddd;padding:8px 6px;text-align:left;vertical-align:top;}
      th{background:#f0f5f2;} td.d{white-space:nowrap;} td.l{text-align:center;}
      .pill{display:inline-block;min-width:22px;text-align:center;border-radius:6px;padding:2px 6px;color:#fff;font-weight:700;}
      .l1{background:#5cc8a0}.l2{background:#86c98a}.l3{background:#c9b23f}.l4{background:#d99e6a}.l5{background:#cf7f6f}.l0{background:#bbb}
      .note{color:#666;font-size:11px;margin-top:18px;}
      @media print{body{margin:12mm;}}
    </style></head><body>
    <h1>MisoNIE — Tagebuch</h1>
    <div class="meta">Name: ${esc(p.name || '—')} · Erstellt: ${esc(new Date().toLocaleString('de-DE'))} · ${entries.length} Einträge</div>
    <table><thead><tr><th>Datum</th><th>Stärke</th><th>Auslöser</th><th>Situation</th><th>Geholfen hat</th><th>Notiz</th></tr></thead>
    <tbody>${rows}</tbody></table>
    <p class="note">Dieses Tagebuch dient der Selbstbeobachtung und dem Gespräch mit Fachpersonen. Es ist keine Diagnose.</p>
    <script>window.onload=function(){setTimeout(function(){window.print();},300);}<\/script>
    </body></html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const w = window.open(url, '_blank');
  if (!w) { // Popup blockiert -> Download als Fallback
    const a = el('a', { href: url, download: `misonie-tagebuch-${todayStr()}.html` });
    document.body.appendChild(a); a.click(); a.remove();
    toast('Als HTML gespeichert (zum Drucken öffnen)');
  }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// ---------------------------------------------------------------- Helfer

function toggleChip(label, pressed, onToggle) {
  const c = el('button', { class: 'chip', type: 'button', 'aria-pressed': pressed ? 'true' : 'false', text: label });
  c.addEventListener('click', () => {
    const now = c.getAttribute('aria-pressed') !== 'true';
    c.setAttribute('aria-pressed', now ? 'true' : 'false'); buzz(); onToggle(now);
  });
  return c;
}
function setArr(arr, v, on) { const i = arr.indexOf(v); if (on && i === -1) arr.push(v); if (!on && i !== -1) arr.splice(i, 1); }
function uniq(a) { return [...new Set(a)]; }
function sitLabel(id) { const s = SITUATIONS.find(x => x.id === id); return s ? s.label : id; }

function todayStr() { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function pad(n) { return String(n).padStart(2, '0'); }

function prettyDate(iso, createdAt) {
  let d;
  if (iso && /^\d{4}-\d{2}-\d{2}$/.test(iso)) { const [y, m, day] = iso.split('-').map(Number); d = new Date(y, m - 1, day); }
  else d = new Date(createdAt || Date.now());
  const wd = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][d.getDay()];
  const s = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const t = createdAt ? new Date(createdAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : '';
  return `${wd}, ${s}${t ? ' · ' + t : ''}`;
}

function lastNDays(n) {
  const out = [];
  const wd = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    out.push({ iso: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, label: wd[d.getDay()] });
  }
  return out;
}
