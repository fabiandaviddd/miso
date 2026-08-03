// MisoNIE Icon-Set — selbst gezeichnete, ruhige Linien-Icons (statt Emojis).
// Einheitlich: 24x24, stroke currentColor, runde Kappen. Nutzung: icon('name').

const ICONS = {
  // Marke / Notfall: leiser werdende Ringe (wie das App-Icon)
  rings: '<circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="6.4"/><circle cx="12" cy="12" r="9.6" opacity="0.45"/>',

  home: '<path d="M4.5 11.2 L12 4.6 L19.5 11.2"/><path d="M6.6 9.8 V19.4 H17.4 V9.8"/>',
  book: '<path d="M12 6.2 C9.8 4.9 6.9 4.7 4.5 5.6 V18.4 C6.9 17.5 9.8 17.7 12 19 C14.2 17.7 17.1 17.5 19.5 18.4 V5.6 C17.1 4.7 14.2 4.9 12 6.2 Z"/><path d="M12 6.2 V19"/>',
  route: '<circle cx="5.6" cy="18" r="2.1"/><circle cx="18.4" cy="5.6" r="2.1"/><path d="M7.7 18 H14.2 A3.1 3.1 0 0 0 14.2 11.8 H9.8 A3.1 3.1 0 0 1 9.8 5.6 H16.3"/>',
  map: '<path d="M4 6.2 L9.3 4.4 L14.7 6.2 L20 4.4 V17.8 L14.7 19.6 L9.3 17.8 L4 19.6 Z"/><path d="M9.3 4.4 V17.8"/><path d="M14.7 6.2 V19.6"/>',
  lightbulb: '<path d="M9.6 17.6 H14.4"/><path d="M10.4 20.2 H13.6"/><path d="M12 3.6 A5.6 5.6 0 0 1 15.2 13.8 C14.6 14.3 14.3 14.9 14.3 15.6 H9.7 C9.7 14.9 9.4 14.3 8.8 13.8 A5.6 5.6 0 0 1 12 3.6 Z"/>',

  // Notfallwerkzeuge
  breathe: '<circle cx="10" cy="13.5" r="5.3"/><circle cx="16.8" cy="7.8" r="2.7"/><circle cx="18.2" cy="14.6" r="1.3"/>',
  door: '<path d="M13.5 20.2 H5.8 V3.8 H13.5"/><path d="M12.5 12 H21"/><path d="M18.4 9.4 L21 12 L18.4 14.6"/>',
  leaf: '<path d="M12 20.2 C6.8 16.6 5.4 10.2 12 4.2 C18.6 10.2 17.2 16.6 12 20.2 Z"/><path d="M12 8.5 V20.2"/>',
  headphones: '<path d="M4.6 16.8 V13.4 A7.4 7.4 0 0 1 19.4 13.4 V16.8"/><rect x="3.6" y="13.8" width="3.4" height="5.6" rx="1.5"/><rect x="17" y="13.8" width="3.4" height="5.6" rx="1.5"/>',
  wave: '<path d="M3 14.5 C5 12.2 7 12.2 9 14.5 C11 16.8 13 16.8 15 14.5 C17 12.2 19 12.2 21 14.5"/><path d="M3 9.5 C5 7.2 7 7.2 9 9.5 C11 11.8 13 11.8 15 9.5 C17 7.2 19 7.2 21 9.5" opacity="0.45"/>',
  compass: '<circle cx="12" cy="12" r="8.4"/><path d="M15.2 8.8 L13.4 13.4 L8.8 15.2 L10.6 10.6 Z"/>',
  heart: '<path d="M12 19.4 C7 15.9 4.4 13 4.4 9.9 C4.4 7.6 6.2 5.9 8.3 5.9 C9.8 5.9 11.2 6.8 12 8.1 C12.8 6.8 14.2 5.9 15.7 5.9 C17.8 5.9 19.6 7.6 19.6 9.9 C19.6 13 17 15.9 12 19.4 Z"/>',

  // Verstehen
  volume: '<path d="M4.6 9.4 V14.6 H7.8 L12.4 18.6 V5.4 L7.8 9.4 Z"/><path d="M15.4 9.6 A3.8 3.8 0 0 1 15.4 14.4"/><path d="M17.8 7.4 A7.2 7.2 0 0 1 17.8 16.6"/>',
  activity: '<path d="M3.4 12.6 H7.2 L9.6 6.4 L14.4 17.6 L16.8 12.6 H20.6"/>',
  eye: '<path d="M2.8 12 C5.1 7.9 8.4 5.9 12 5.9 C15.6 5.9 18.9 7.9 21.2 12 C18.9 16.1 15.6 18.1 12 18.1 C8.4 18.1 5.1 16.1 2.8 12 Z"/><circle cx="12" cy="12" r="2.7"/>',
  users: '<circle cx="9" cy="8.6" r="3.1"/><path d="M3.8 19.2 A5.3 5.3 0 0 1 14.2 19.2"/><path d="M15.4 5.9 A3.1 3.1 0 0 1 15.4 11.3"/><path d="M16.6 15.4 A5.3 5.3 0 0 1 20.2 19.2"/>',
  sprout: '<path d="M12 20.2 V13.6"/><path d="M12 13.6 C12 10 9.4 7.8 5.6 7.8 C5.6 11.4 8.2 13.6 12 13.6 Z"/><path d="M12 12 C12 8.4 14.6 6.2 18.4 6.2 C18.4 9.8 15.8 12 12 12 Z"/>',
  ban: '<circle cx="12" cy="12" r="8.3"/><path d="M6.2 6.2 L17.8 17.8"/>',

  // Situationen
  utensils: '<path d="M4.8 3.8 V7.4 A2.4 2.4 0 0 0 9.6 7.4 V3.8"/><path d="M7.2 3.8 V20.2"/><path d="M17.4 3.8 C15.4 6.4 15.4 9.6 17.4 11.6 V20.2"/>',
  laptop: '<rect x="5" y="5.6" width="14" height="9.4" rx="1.5"/><path d="M3.4 18.4 H20.6"/>',
  train: '<rect x="6" y="3.8" width="12" height="13" rx="2.6"/><path d="M6 9.6 H18"/><circle cx="9.2" cy="13.6" r="1" fill="currentColor" stroke="none"/><circle cx="14.8" cy="13.6" r="1" fill="currentColor" stroke="none"/><path d="M8.6 16.8 L6.8 20.2"/><path d="M15.4 16.8 L17.2 20.2"/>',
  video: '<rect x="3.8" y="7" width="11.4" height="10" rx="2"/><path d="M15.2 11.2 L20.2 8.2 V15.8 L15.2 12.8 Z"/>',
  cap: '<path d="M12 4.8 L21 8.8 L12 12.8 L3 8.8 Z"/><path d="M6.6 10.4 V15 C6.6 16.6 17.4 16.6 17.4 15 V10.4"/><path d="M21 8.8 V13.2"/>',
  film: '<rect x="4.4" y="4.4" width="15.2" height="15.2" rx="2"/><path d="M8.6 4.4 V19.6"/><path d="M15.4 4.4 V19.6"/><path d="M4.4 9.2 H8.6 M4.4 14.8 H8.6 M15.4 9.2 H19.6 M15.4 14.8 H19.6"/>',
  moon: '<path d="M19.6 14.2 A8.2 8.2 0 1 1 9.8 4.4 A6.6 6.6 0 0 0 19.6 14.2 Z"/>',
  tent: '<path d="M12 4.6 L21 19.4 H3 Z"/><path d="M9.2 19.4 L12 13.4 L14.8 19.4"/>',
  sparkles: '<path d="M12 4.4 L13.5 9.3 L18.4 10.8 L13.5 12.3 L12 17.2 L10.5 12.3 L5.6 10.8 L10.5 9.3 Z"/><path d="M18.6 15.4 L19.3 17.5 L21.4 18.2 L19.3 18.9 L18.6 21 L17.9 18.9 L15.8 18.2 L17.9 17.5 Z"/>',
  coffee: '<path d="M5 8.6 H16.2 V13.8 A4.6 4.6 0 0 1 11.6 18.4 H9.6 A4.6 4.6 0 0 1 5 13.8 Z"/><path d="M16.2 9.6 H17.6 A2.5 2.5 0 0 1 17.6 14.6 H16"/><path d="M8.4 5.8 V4.2 M12.8 5.8 V4.2"/>',
  bag: '<path d="M6.2 8.4 H17.8 L16.9 20 H7.1 Z"/><path d="M9.2 8.4 V6.9 A2.8 2.8 0 0 1 14.8 6.9 V8.4"/>',

  // Aktionen / Sonstiges
  phone: '<path d="M7.8 3.9 L10.3 3.9 L11.6 7.7 L9.6 9.2 A11.5 11.5 0 0 0 14.8 14.4 L16.3 12.4 L20.1 13.7 V16.2 A2 2 0 0 1 17.9 18.2 A16.2 16.2 0 0 1 5.8 6.1 A2 2 0 0 1 7.8 3.9 Z"/>',
  download: '<path d="M12 4.2 V14.2"/><path d="M8.2 10.8 L12 14.6 L15.8 10.8"/><path d="M4.8 15.5 V19.3 H19.2 V15.5"/>',
  doc: '<path d="M7 3.8 H14 L18.2 8 V20.2 H7 Z"/><path d="M14 3.8 V8 H18.2"/><path d="M9.6 12.4 H15.4"/><path d="M9.6 15.8 H15.4"/>',
  printer: '<path d="M7.4 8.8 V4.2 H16.6 V8.8"/><path d="M7.4 16.2 H4.8 V8.8 H19.2 V16.2 H16.6"/><rect x="7.4" y="13.6" width="9.2" height="6.4"/>',
  lock: '<rect x="5.4" y="10.6" width="13.2" height="9.4" rx="2"/><path d="M8.4 10.6 V7.9 A3.6 3.6 0 0 1 15.6 7.9 V10.6"/><circle cx="12" cy="15.2" r="1.1" fill="currentColor" stroke="none"/>',
  pencil: '<path d="M4.5 19.5 L5.3 16.1 L15.9 5.5 C16.8 4.6 18.3 4.6 19.2 5.5 C20.1 6.4 20.1 7.9 19.2 8.8 L8.6 19.4 L4.5 19.5 Z"/><path d="M14.6 6.8 L17.9 10.1"/>',
  share: '<circle cx="6.4" cy="12" r="2.3"/><circle cx="17.6" cy="5.9" r="2.3"/><circle cx="17.6" cy="18.1" r="2.3"/><path d="M8.5 10.9 L15.5 7 M8.5 13.1 L15.5 17"/>',
  check: '<path d="M4.8 12.6 L9.8 17.6 L19.2 6.8"/>',
};

export function icon(name, cls = '') {
  const body = ICONS[name] || ICONS.rings;
  return `<svg class="svgi ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
