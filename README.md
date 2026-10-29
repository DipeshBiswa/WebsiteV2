# Dipesh Biswa — Portfolio

A static portfolio site: plain HTML, CSS and a little vanilla JavaScript. No build step.

- Project cards open detail modals (Esc or the close button dismisses them)
- Résumé viewer with PDF download
- Skills marquee, scroll reveals and hover effects (respects `prefers-reduced-motion`)

## Run locally

    python3 -m http.server 8000

Then open http://localhost:8000.

## Deploy

Import the repo on Vercel (or GitHub Pages) as a static site. No settings needed.

## Structure

    index.html    markup
    styles.css    styles
    script.js     project data + modal logic
    assets/       résumé, project screenshots, tool logos
