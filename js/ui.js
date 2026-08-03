// Kleine DOM-Helfer — bewusst ohne Framework, damit die App langlebig
// und ohne Build-Schritt bleibt.

// Element bauen. attrs: {class, onClick, html, text, ...attribute}.
// Kinder werden als Text sicher eingefügt (kein innerHTML), außer man
// nutzt explizit attrs.html (nur für vertrauenswürdige, eigene Strings).
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k === 'html') node.innerHTML = v; // nur für eigene, statische Inhalte
    else if (k === 'onClick') node.addEventListener('click', v);
    else if (k === 'onInput') node.addEventListener('input', v);
    else if (k === 'onChange') node.addEventListener('change', v);
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else if (k in node && k !== 'list') { try { node[k] = v; } catch { node.setAttribute(k, v); } }
    else node.setAttribute(k, v);
  }
  append(node, children);
  return node;
}

function append(node, children) {
  if (children == null) return;
  if (Array.isArray(children)) children.forEach(c => append(node, c));
  else if (children instanceof Node) node.appendChild(children);
  else node.appendChild(document.createTextNode(String(children)));
}

export function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); return node; }

export function mount(node, children) { clear(node); append(node, children); return node; }

// Text HTML-sicher machen (für den seltenen Fall, dass wir html brauchen).
export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

let toastTimer = null;
export function toast(msg) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const t = el('div', { class: 'toast', role: 'status', text: msg });
  document.body.appendChild(t);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.remove(), 2400);
}

// Sanftes haptisches Feedback, wo verfügbar (nie Ton).
export function buzz(ms = 12) {
  try { if (navigator.vibrate) navigator.vibrate(ms); } catch {}
}

export function scrollTop() { window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' }); }
