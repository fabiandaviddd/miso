// Lokale Datenhaltung — alles bleibt auf dem Gerät (IndexedDB).
// Kein Konto, kein Server, keine Übertragung.

const DB_NAME = 'misonie';
const DB_VERSION = 1;
const SCHEMA_VERSION = 1;

let _db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
      if (!db.objectStoreNames.contains('journal')) {
        const os = db.createObjectStore('journal', { keyPath: 'id' });
        os.createIndex('date', 'date', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function db() {
  if (!_db) _db = await openDB();
  return _db;
}

function tx(store, mode, fn) {
  return db().then(d => new Promise((resolve, reject) => {
    const t = d.transaction(store, mode);
    const os = t.objectStore(store);
    let out;
    Promise.resolve(fn(os)).then(v => { out = v; });
    t.oncomplete = () => resolve(out);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  }));
}

function reqP(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ---------- Profil ----------
export function defaultProfile() {
  return {
    schema: SCHEMA_VERSION,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    onboardingComplete: false,
    name: '',
    needs: [],              // 'moment' | 'understand' | 'journal' | 'unsure'
    triggers: [],           // [{type:'hear'|'see'|'anticipate'|'custom', label}]
    situations: [],         // situation-ids
    likesStructure: null,   // true | false | null
    helps: [],              // help-ids
    sosTools: [],           // geordnete tool-ids für die Notfall-Hilfe
    sound: { enabled: false, volume: 0.5 },
    seenDisclaimer: false,
  };
}

export async function getProfile() {
  const p = await tx('kv', 'readonly', os => reqP(os.get('profile')));
  if (!p) return null;
  // Vorwärtskompatibel: fehlende Felder ergänzen.
  return Object.assign(defaultProfile(), p);
}

export async function saveProfile(profile) {
  profile.updatedAt = Date.now();
  await tx('kv', 'readwrite', os => os.put(profile, 'profile'));
  return profile;
}

// ---------- Tagebuch ----------
export function newId() {
  return 'e' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
}

export async function addEntry(entry) {
  const e = Object.assign({ id: newId(), createdAt: Date.now() }, entry);
  await tx('journal', 'readwrite', os => os.put(e));
  return e;
}

export async function updateEntry(entry) {
  entry.updatedAt = Date.now();
  await tx('journal', 'readwrite', os => os.put(entry));
  return entry;
}

export async function deleteEntry(id) {
  await tx('journal', 'readwrite', os => os.delete(id));
}

export async function getEntries() {
  const all = await tx('journal', 'readonly', os => reqP(os.getAll()));
  return (all || []).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

// ---------- Freie Schlüssel/Werte (z. B. Übungs-Protokoll "Mein Weg") ----------
export async function getKV(key) {
  return tx('kv', 'readonly', os => reqP(os.get(key)));
}

export async function setKV(key, value) {
  await tx('kv', 'readwrite', os => os.put(value, key));
}

// ---------- Backup / Wiederherstellung ----------
export async function exportAll() {
  const profile = await getProfile();
  const entries = await getEntries();
  const practiceLog = await getKV('practiceLog');
  return {
    app: 'MisoNIE',
    schema: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    profile,
    entries,
    practiceLog: practiceLog || null,
  };
}

export async function importAll(data) {
  if (!data || data.app !== 'MisoNIE') throw new Error('Diese Datei sieht nicht nach einer MisoNIE-Sicherung aus.');
  if (data.profile) await saveProfile(Object.assign(defaultProfile(), data.profile));
  if (Array.isArray(data.entries)) {
    await tx('journal', 'readwrite', os => { data.entries.forEach(e => { if (e && e.id) os.put(e); }); });
  }
  if (data.practiceLog) await setKV('practiceLog', data.practiceLog);
}

export async function wipeAll() {
  await tx('kv', 'readwrite', os => os.clear());
  await tx('journal', 'readwrite', os => os.clear());
}
