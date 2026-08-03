// KI-Modul (BYOK: eigener API-Schlüssel). Bewusst ohne eigenen Server:
// Die App spricht direkt vom Gerät mit der Anthropic-API. Der Schlüssel
// bleibt lokal (und wird aus Sicherungen ausgeschlossen). Standardmäßig
// ist alles hier AUS und die App voll nutzbar ohne KI.

export const AI_MODELS = [
  { id: 'claude-sonnet-5', label: 'Claude Sonnet 5 (empfohlen)' },
  { id: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5 (günstiger)' },
  { id: 'claude-opus-5', label: 'Claude Opus 5 (am stärksten)' },
];

export function defaultAI() {
  return { enabled: false, apiKey: '', model: 'claude-sonnet-5' };
}

export function aiReady(profile) {
  const ai = profile && profile.ai;
  return !!(ai && ai.enabled && ai.apiKey);
}

// Ruhiger, ehrlicher Wissens-Assistent. Keine Diagnosen, keine Exposition,
// keine Gedankenstriche (Stil-Wunsch der Nutzerin).
export const CHAT_SYSTEM = `Du bist der KI-Assistent in MisoNIE, einer deutschsprachigen App für einen Menschen mit Misophonie (und Misokinesie). Dein Ton: ruhig, warm, respektvoll, auf Augenhöhe, niemals belehrend. Die Person bekommt oft genug zu hören, sie solle sich nicht so anstellen. Du bist die Gegenstimme: Was sie erlebt, ist real und neurophysiologisch erklärbar.

Regeln:
- Antworte auf Deutsch, per Du, in kurzen Absätzen. Meist unter 180 Wörtern, außer es wird ausdrücklich mehr gewünscht.
- Verwende keine Gedankenstriche und keine Aufzählungs-Striche, außer es ist unvermeidbar. Schreibe in ganzen Sätzen. Emojis nur, wenn die Person selbst welche nutzt.
- Du diagnostizierst nicht, behandelst nicht und versprichst keine Heilung. Bei Fragen nach Diagnose oder Therapieentscheidungen: freundlich an Fachpersonen verweisen.
- Empfiehl niemals Konfrontations- oder Habituationstraining mit Triggergeräuschen. Der Fachstand: Misophonie habituiert nicht wie Angst, gezielte Exposition kann verschlimmern. Wirksame Wege arbeiten mit Aufmerksamkeit, Umdeutung, Entspannung, Selbstmitgefühl, Vorbereitung und Kommunikation.
- Sei ehrlich über Evidenz: Die Forschung ist jung, vieles ist vorläufig. Wenn du etwas nicht sicher weißt, sag es. Bei Fragen nach ganz aktuellen Studien: Erkläre, dass dein Wissen einen Stand hat und du keine Echtzeit-Recherche machst, und gib das Solideste wieder, was du kennst.
- Bei Anzeichen starker Belastung, Hoffnungslosigkeit oder dunklen Gedanken: Reagiere zuerst menschlich und validierend, dann verweise ruhig auf professionelle Hilfe und die Telefonseelsorge 0800 111 0 111 (kostenlos, anonym, rund um die Uhr). Kein Alarmismus.
- Du hast keinen Zugriff auf Tagebuch oder persönliche Daten der App. Sag das, falls danach gefragt wird.`;

export const SUMMARY_SYSTEM = `Du fasst Tagebucheinträge einer Person mit Misophonie für ihr Therapiegespräch zusammen. Schreibe auf Deutsch, sachlich, warm und kompakt (unter 250 Wörtern). Verwende keine Gedankenstriche.

Struktur:
1. Überblick: Zeitraum, Anzahl der Einträge, grobe Belastungslage (Stufen 1 bis 5).
2. Auffällige Muster: häufigste Auslöser, häufigste Situationen, Tageszeiten falls erkennbar.
3. Was geholfen hat: die genannten Strategien, besonders die wiederkehrenden.
4. Mögliche Gesprächspunkte für die Therapie: 2 bis 3 respektvoll formulierte Anregungen, als Fragen oder Beobachtungen, keine Diagnosen und keine Behandlungsempfehlungen.

Wichtig: Du beschreibst und ordnest, du diagnostizierst nicht. Formuliere durchgehend würdevoll. Die Zusammenfassung gehört der Person selbst.`;

// Direkter API-Aufruf vom Gerät. Wirft Error mit verständlicher Meldung.
export async function callAI(profile, { system, messages, maxTokens = 1024 }) {
  const ai = profile.ai || {};
  if (!ai.apiKey) throw new Error('Kein API-Schlüssel hinterlegt.');
  let res;
  try {
    res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': ai.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: ai.model || 'claude-sonnet-5',
        max_tokens: maxTokens,
        system,
        messages,
      }),
    });
  } catch (e) {
    throw new Error('Keine Verbindung. Bist du online?');
  }
  if (!res.ok) {
    if (res.status === 401) throw new Error('Der API-Schlüssel wurde nicht akzeptiert. Bitte prüfe ihn unter Mehr.');
    if (res.status === 429) throw new Error('Gerade zu viele Anfragen. Warte einen Moment und versuch es nochmal.');
    if (res.status === 400) {
      let detail = '';
      try { detail = (await res.json())?.error?.message || ''; } catch {}
      throw new Error('Die Anfrage wurde abgelehnt. ' + detail);
    }
    throw new Error(`Der KI-Dienst hat mit Fehler ${res.status} geantwortet.`);
  }
  const data = await res.json();
  const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
  if (!text) throw new Error('Leere Antwort erhalten. Bitte versuch es nochmal.');
  return text;
}

// Baut den Text, der für die Wochenzusammenfassung an die KI geht.
// Bewusst transparent: Genau das (und nichts anderes) verlässt das Gerät.
export function buildSummaryInput(entries, situationLabel) {
  const cutoff = Date.now() - 7 * 86400000;
  const recent = entries.filter(e => (e.createdAt || 0) >= cutoff);
  if (!recent.length) return null;
  const lines = recent.map(e => {
    const parts = [`Datum: ${e.date || new Date(e.createdAt).toISOString().slice(0, 10)}`, `Stärke: ${e.level ?? 'ohne'}/5`];
    if (e.triggers && e.triggers.length) parts.push('Auslöser: ' + e.triggers.join(', '));
    if (e.situation) parts.push('Situation: ' + situationLabel(e.situation));
    if (e.helped && e.helped.length) parts.push('Geholfen: ' + e.helped.join(', '));
    if (e.note) parts.push('Notiz: ' + e.note);
    return parts.join(' | ');
  });
  return `Tagebucheinträge der letzten 7 Tage (${recent.length} Stück), je Zeile ein Eintrag:\n\n` + lines.join('\n');
}
