// Hell/Dunkel. Bewusst ein eigenes Modul, damit weder app.js noch
// settings.js voneinander abhängen müssen.
//
// Warum das wichtig ist: Diese App wird oft unter Menschen benutzt, am
// Esstisch, im Bus, im Wartezimmer. Ein hell leuchtendes Display verrät,
// dass gerade etwas läuft. Dunkel ist hier kein Geschmack, sondern Schutz.

const query = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
let wish = 'system';   // 'system' | 'light' | 'dark'

export function applyTheme(pref) {
  if (pref) wish = pref;
  const dark = wish === 'dark' || (wish === 'system' && query && query.matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#0B1410' : '#F5F1E6');
}

if (query && query.addEventListener) {
  query.addEventListener('change', () => { if (wish === 'system') applyTheme(); });
}
