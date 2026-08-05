// MisoNIE — App-Kern: Zustand, Router, Shell, Navigation.
import { el, mount, clear, scrollTop, setHaptics } from './ui.js';
import { applyTheme } from './theme.js';
import { SOS_TOOLS } from './data.js';
import * as store from './store.js';
import { renderOnboarding } from './onboarding.js';
import { renderHome } from './home.js';
import { renderJournal } from './journal.js';
import { renderLearn } from './learn.js';
import { renderPrepare } from './prepare.js';
import { renderSettings } from './settings.js';
import { renderHelp } from './help.js';
import { renderPath } from './path.js';
import { renderChat } from './chat.js';
import { icon } from './icons.js';
import { openSOS } from './sos.js';

const root = document.getElementById('app');

// Zentrales App-Objekt, das alle Views bekommen.
const app = {
  profile: null,
  async save() {
    setHaptics(this.profile.haptics !== false);
    await store.saveProfile(this.profile);
  },
  navigate,
  rerender: () => route(),
  openSOS: () => openSOS(app),
  store,
};

// Routen-Tabelle. `tab` markiert die Einträge der Bottom-Navigation.
const ROUTES = {
  start:       { view: renderHome,     title: 'MisoNIE', primary: true },
  tagebuch:    { view: renderJournal,  title: 'Tagebuch', primary: true },
  weg:         { view: renderPath,     title: 'Mein Weg', back: 'start' },
  chat:        { view: renderChat,     title: 'KI-Assistent', back: 'start' },
  verstehen:   { view: renderLearn,    title: 'Verstehen', back: 'start' },
  vorbereiten: { view: renderPrepare,  title: 'Vorbereiten', back: 'start' },
  mehr:        { view: renderSettings, title: 'Mehr', back: 'start' },
  hilfe:       { view: renderHelp,     title: 'Hilfe holen', back: 'start' },
};

function currentRoute() {
  const key = (location.hash.replace(/^#\/?/, '') || 'start').split('/')[0];
  return ROUTES[key] ? key : 'start';
}

// Kommt jemand nach laengerer Pause zurueck, beginnt die App auf der
// Startseite. Sonst empfaengt einen im Triggermoment ein Formular.
const RESUME_FRESH_AFTER = 30 * 60 * 1000;
function resetToStartIfStale() {
  try {
    const last = Number(localStorage.getItem('misonie:lastOpen') || 0);
    if (last && Date.now() - last > RESUME_FRESH_AFTER && location.hash && location.hash !== '#/start') {
      location.replace('#/start');
    }
  } catch {}
  markOpen();
}
function markOpen() {
  try { localStorage.setItem('misonie:lastOpen', String(Date.now())); } catch {}
}
document.addEventListener('visibilitychange', () => { if (document.hidden) markOpen(); });

function navigate(routeKey) {
  if (location.hash === '#/' + routeKey) { route(); }
  else location.hash = '#/' + routeKey;
}

// --- Rendering ---------------------------------------------------------

async function route() {
  // Onboarding hat Vorrang, solange es nicht abgeschlossen ist.
  if (!app.profile || !app.profile.onboardingComplete) {
    renderOnboarding(app, root);
    return;
  }
  const key = currentRoute();
  const def = ROUTES[key];
  const content = await def.view(app);
  renderShell(key, def, content);
  scrollTop();
}

function renderShell(key, def, content) {
  const appbar = el('header', { class: 'appbar' }, [
    def.back
      ? el('button', { class: 'iconbtn', 'aria-label': 'Zurück', html: '‹', onClick: () => navigate(def.back) })
      : null,
    el('div', { class: 'title', html: key === 'start' ? 'Miso<b>NIE</b>' : def.title }),
    el('div', { class: 'spacer' }),
    el('button', { class: 'iconbtn', 'aria-label': 'Mehr & Einstellungen', title: 'Mehr', html: '⋯', onClick: () => navigate('mehr') }),
  ]);

  const view = el('main', { class: 'view' }, content);
  const shell = el('div', { class: 'shell' }, [appbar, view]);
  mount(root, [shell, buildTabbar(key)]);
}

function buildTabbar(key) {
  const tab = (routeKey, iconName, label, current) =>
    el('button', {
      class: 'tab',
      'aria-current': current ? 'page' : null,
      onClick: () => navigate(routeKey),
    }, [el('span', { class: 'ti', html: icon(iconName) }), el('span', { text: label })]);

  const discreet = app.profile && app.profile.discreet;
  const sos = el('button', {
    class: 'tab tab-sos',
    'aria-label': discreet ? 'Ruhe' : 'Jetzt Hilfe im Moment',
    onClick: () => app.openSOS(),
  }, [el('span', { class: 'ti', html: icon('rings') }), el('span', { text: discreet ? 'Ruhe' : 'Jetzt Hilfe' })]);

  return el('nav', { class: 'tabbar', 'aria-label': 'Hauptnavigation' }, [
    el('div', { class: 'tabbar-inner' }, [
      tab('start', 'home', 'Start', key === 'start'),
      sos,
      tab('tagebuch', 'book', 'Tagebuch', key === 'tagebuch'),
    ]),
  ]);
}

// --- Start -------------------------------------------------------------

async function boot() {
  applyTheme('system');            // vor dem ersten Zeichnen, kein Aufblitzen
  try {
    app.profile = await store.getProfile();
  } catch (e) {
    app.profile = null;
  }
  if (!app.profile) {
    app.profile = store.defaultProfile();
  }
  applyTheme(app.profile.theme || 'system');
  setHaptics(app.profile.haptics !== false);
  // Werkzeuge, die es beim letzten Start noch nicht gab, nachtragen.
  if (app.profile.sosTools && app.profile.sosTools.length) {
    const missing = SOS_TOOLS.map(t => t.id).filter(id => !app.profile.sosTools.includes(id));
    if (missing.length) {
      app.profile.sosTools = app.profile.sosTools.concat(missing);
      store.saveProfile(app.profile).catch(() => {});
    }
  }
  resetToStartIfStale();
  window.addEventListener('hashchange', route);
  route();

  // Vom Icon-Kurzbefehl (Long-Press) direkt in die Soforthilfe.
  const params = new URLSearchParams(location.search);
  if (params.get('sos') === '1' && app.profile.onboardingComplete) {
    setTimeout(() => app.openSOS(), 60);
  }
  registerSW();
}

function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    });
  }
}

boot();

export { app };
