// "Mehr" — Einstellungen, Werkzeuge, Datensicherung, Datenschutz.
import { el, mount, toast } from './ui.js';
import { SOS_TOOLS, DISCLAIMER } from './data.js';
import { exportAll, importAll, wipeAll, getProfile, defaultProfile, saveProfile } from './store.js';
import { icon } from './icons.js';

export async function renderSettings(app) {
  const p = app.profile;
  const view = el('div', { class: 'stack' });

  // Name
  const nameInput = el('input', { type: 'text', value: p.name || '', placeholder: 'Dein Name (optional)', maxLength: 40 });
  nameInput.addEventListener('change', async () => { p.name = nameInput.value.trim(); await app.save(); toast('Gespeichert'); });
  view.append(el('div', { class: 'card' }, [
    el('h3', { text: 'Dein Name' }),
    el('label', { class: 'field' }, [nameInput]),
  ]));

  // Ruhe-Klang
  const soundToggle = el('button', { class: 'btn ' + (p.sound.enabled ? 'btn-primary' : 'btn-ghost') },
    p.sound.enabled ? 'Ruhe-Klang: an' : 'Ruhe-Klang: aus');
  soundToggle.addEventListener('click', async () => { p.sound.enabled = !p.sound.enabled; await app.save(); app.rerender(); });
  view.append(el('div', { class: 'card' }, [
    el('h3', { text: 'Ruhe-Klang' }),
    el('p', { class: 'muted', style: { marginTop: 0 }, text: 'Ein sanftes Rauschen für den Trigger-Moment. Standardmäßig aus — es startet immer nur, wenn du es antippst.' }),
    soundToggle,
  ]));

  // Notfall-Werkzeuge
  const enabled = new Set((p.sosTools && p.sosTools.length) ? p.sosTools : SOS_TOOLS.map(t => t.id));
  const toolList = el('div', { class: 'stack' }, SOS_TOOLS.map(t => {
    const on = enabled.has(t.id);
    const btn = el('button', { class: 'tile', 'aria-pressed': on ? 'true' : 'false',
      style: on ? { borderColor: 'var(--green-deep)' } : { opacity: '0.6' } }, [
      el('span', { class: 'emoji', html: icon(t.icon) }),
      el('span', { class: 't-body' }, [el('span', { class: 't-title', text: t.title }), el('span', { class: 't-sub', text: t.sub })]),
      el('span', { class: 'chev', html: on ? '✓' : '＋' }),
    ]);
    btn.addEventListener('click', async () => {
      if (enabled.has(t.id)) enabled.delete(t.id); else enabled.add(t.id);
      p.sosTools = SOS_TOOLS.map(x => x.id).filter(id => enabled.has(id));
      if (!p.sosTools.length) { p.sosTools = [t.id]; enabled.add(t.id); toast('Mindestens ein Werkzeug bleibt'); }
      await app.save(); app.rerender();
    });
    return btn;
  }));
  view.append(el('div', { class: 'card' }, [
    el('h3', { text: 'Notfall-Werkzeuge' }),
    el('p', { class: 'muted', style: { marginTop: 0 }, text: 'Wähle, was in „Jetzt Hilfe“ erscheint.' }),
    toolList,
  ]));

  // Kennenlernen anpassen
  view.append(el('div', { class: 'card' }, [
    el('h3', { text: 'Kennenlernen anpassen' }),
    el('p', { class: 'muted', style: { marginTop: 0 }, text: 'Trigger, Situationen und Vorlieben neu durchgehen. Deine bisherigen Angaben sind schon vorausgefüllt.' }),
    el('button', { class: 'btn btn-ghost', onClick: async () => { p.onboardingComplete = false; await app.save(); app.rerender(); } }, 'Neu durchgehen'),
  ]));

  // Datensicherung
  view.append(el('div', { class: 'card' }, [
    el('h3', { class: 'h-icon' }, [el('span', { class: 'icon', html: icon('lock') }), 'Deine Daten']),
    el('p', { class: 'muted', style: { marginTop: 0 }, text: 'Alles bleibt nur auf diesem Gerät. Ohne Sicherung gehen deine Einträge verloren, wenn du das Gerät wechselst oder den Browser-Speicher löschst.' }),
    el('div', { class: 'btn-row' }, [
      el('button', { class: 'btn btn-ghost', onClick: doExport }, 'Sicherung exportieren'),
      el('button', { class: 'btn btn-ghost', onClick: () => fileInput.click() }, 'Sicherung laden'),
    ]),
  ]));
  const fileInput = el('input', { type: 'file', accept: 'application/json,.json', style: { display: 'none' } });
  fileInput.addEventListener('change', doImport);
  view.append(fileInput);

  async function doExport() {
    const data = await exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: `misonie-sicherung-${todayStr()}.json` });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast('Sicherung erstellt');
  }
  async function doImport(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      await importAll(JSON.parse(text));
      app.profile = await getProfile();
      toast('Sicherung geladen');
      app.rerender();
    } catch (err) { toast('Datei konnte nicht gelesen werden'); }
    finally { fileInput.value = ''; }
  }

  // Hilfe & Datenschutz
  view.append(el('div', { class: 'card' }, [
    el('h3', { text: 'Hilfe & Krisen-Kontakte' }),
    el('button', { class: 'btn btn-ghost', onClick: () => app.navigate('hilfe') }, 'Öffnen'),
  ]));

  view.append(el('div', { class: 'note', style: { marginTop: '4px' } }, [
    el('div', { html: '<strong>Datenschutz.</strong>' }),
    'MisoNIE hat kein Konto, keinen Server und keine Tracker. Nichts wird übertragen. Diese App funktioniert auch offline.',
  ]));

  // Alles löschen
  view.append(el('div', { style: { marginTop: '4px' } }, [
    el('button', { class: 'btn btn-quiet', style: { color: 'var(--danger)' }, onClick: async () => {
      if (confirm('Wirklich ALLE Daten dieser App löschen? Das lässt sich nicht rückgängig machen.')) {
        await wipeAll(); app.profile = defaultProfile(); await saveProfile(app.profile); toast('Alles gelöscht'); location.hash = '#/start'; app.rerender();
      }
    } }, 'Alle Daten löschen'),
  ]));

  view.append(el('p', { class: 'disclaimer', text: DISCLAIMER }));
  view.append(el('p', { class: 'disclaimer', text: 'MisoNIE · lokale PWA · v1' }));

  return view;
}

function todayStr() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
