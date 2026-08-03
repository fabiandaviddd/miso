// MisoNIE — App-Kern: Zustand, Router, Shell, Navigation.
import { el, mount, clear, scrollTop } from './ui.js';
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
  async save() { await store.saveProfile(this.profile); },
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

  const sos = el('button', {
    class: 'tab tab-sos',
    'aria-label': 'Jetzt Hilfe im Moment',
    onClick: () => app.openSOS(),
  }, [el('span', { class: 'ti', html: icon('rings') }), el('span', { text: 'Jetzt Hilfe' })]);

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
  try {
    app.profile = await store.getProfile();
  } catch (e) {
    app.profile = null;
  }
  if (!app.profile) {
    app.profile = store.defaultProfile();
  }
  window.addEventListener('hashchange', route);
  route();
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
