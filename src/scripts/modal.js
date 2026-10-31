// Project + résumé modals.
import { PROJECTS } from './data/projects.js';

const X = '<button class="x" data-close aria-label="Close"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 3l12 12M15 3L3 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>';
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const pm = document.getElementById('pm'), panel = document.getElementById('pm-panel'), rm = document.getElementById('rm');
let lastFocus = null;
function openModal(el) { lastFocus = document.activeElement; el.hidden = false; document.body.style.overflow = 'hidden'; const c = el.querySelector('.x'); if (c) c.focus(); }
function closeModals() { pm.hidden = true; rm.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
function openProject(id) {
  const m = PROJECTS.find((p) => p.id === id); if (!m) return;
  panel.innerHTML = X +
    '<div class="mhead" style="background:var(--panel2)"><p class="eyebrow" style="margin:0 0 12px">' + esc(m.tag) + '</p>' +
    '<h2 style="margin:0 0 10px;font-size:clamp(34px,5vw,64px);line-height:1;letter-spacing:-0.04em;font-weight:700">' + esc(m.name) + '</h2>' +
    '<p style="margin:0;font-size:16px;font-weight:600;color:var(--ink2)">' + esc(m.dates) + '</p></div>' +
    (m.img ? '<div class="mimg"><img src="' + esc(m.img) + '" alt="' + esc(m.alt) + '"></div>' : '') +
    '<div class="mgrid"><div><h4>Overview</h4><p>' + esc(m.experience) + '</p><h4>The problem</h4><p>' + esc(m.problem) + '</p><h4>What I did</h4><ul>' +
    m.contribs.map((b) => '<li>' + esc(b) + '</li>').join('') + '</ul></div><div>' +
    (m.arch ? '<h4>How it fits together</h4><p>' + esc(m.arch) + '</p>' : '') +
    '<h4>Technologies</h4><div class="chips">' + m.chips.map((c) => '<span class="chip">' + esc(c) + '</span>').join('') + '</div>' +
    '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:18px">' + (m.url ? '<a class="btn ink" href="' + esc(m.url) + '" target="_blank" rel="noopener">Open live demo ↗</a>' : '') + (m.repo ? '<a class="btn glass" href="' + esc(m.repo) + '" target="_blank" rel="noopener">View on GitHub ↗</a>' : '') + '</div>' + '</div></div>';
  panel.scrollTop = 0; openModal(pm);
}

document.addEventListener('click', (e) => {
  const card = e.target.closest('.card[data-id]'); if (card) return openProject(card.dataset.id);
  if (e.target.closest('[data-open-resume]')) return openModal(rm);
  if (e.target.closest('[data-close]')) closeModals();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModals(); });
