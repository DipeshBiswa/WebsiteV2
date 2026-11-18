// Narrow-screen nav: the Menu button opens the links panel; a link tap, Esc or a tap outside closes it.
const btn = document.querySelector('[data-nav-toggle]');
const nav = btn && btn.closest('nav');
if (nav) {
  const setOpen = (open) => { nav.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); };
  btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('.navlinks a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('click', (e) => { if (nav.classList.contains('open') && !nav.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); btn.focus(); } });
  matchMedia('(min-width: 861px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}
