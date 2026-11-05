// The ID / EN switch: every text is in the page twice (data-l="id" / "en"); <html lang> picks one.
// The head script already set it from ?lang= or the last pick.
'use strict';
const btn = document.getElementById('lang');
if (btn) {
  btn.addEventListener('click', () => {
    const next = document.documentElement.lang === 'en' ? 'id' : 'en';
    document.documentElement.lang = next;
    try { localStorage.setItem('nt.lang', next); } catch (e) { /* storage blocked: the switch still works for this visit */ }
  });
}
