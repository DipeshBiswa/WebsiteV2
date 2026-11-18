// Light/dark theme toggle (the initial theme is set by an inline script in <head> to avoid a flash).
const root = document.documentElement;
function setTheme(t, save) {
  if (t === 'dark') root.dataset.theme = 'dark'; else delete root.dataset.theme;
  const tc = document.querySelector('meta[name="theme-color"]'); if (tc) tc.content = t === 'dark' ? '#0b0716' : '#f3f4f6';
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'));
  if (save) { try { localStorage.setItem('theme', t); } catch (e) {} }
}
setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-theme-toggle]')) setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
});
