// Copy-email button next to the mailto link, for visitors without a mail app.
const btn = document.querySelector('[data-copy-email]');
if (btn) {
  let t;
  btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copyEmail); btn.textContent = 'Copied'; }
    catch { getSelection().selectAllChildren(btn.previousElementSibling); btn.textContent = 'Selected'; }
    clearTimeout(t); t = setTimeout(() => { btn.textContent = 'Copy'; }, 2200);
  });
}
