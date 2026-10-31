# Dipesh Biswa — Portfolio

Static portfolio site built from small HTML components, CSS modules and vanilla JS. The build is a ~60-line Node script plus esbuild, with no framework.

## Structure

    public/assets/            images, logos, résumé PDF (copied to dist as-is)
    src/
      pages/                  index.html, about.html: pages composed from components
      components/             one HTML partial per section (nav, hero, projects, experience,
                              skills, resume, contact, modals, about-hero, ...)
      data/skills.json        skills marquee content
      styles/
        main.css              entry; imports the files below in cascade order
        tokens.css            colors + theme variables
        base.css, animations.css
        components/*.css      one stylesheet per component
      scripts/
        index.js, about.js    page entry points
        theme.js              light/dark toggle
        modal.js              project + résumé modals
        data/projects.js      project details (edit here)
    scripts/build.mjs         build (partials -> dist/, bundles CSS/JS)
    scripts/dev.mjs           local dev server with rebuild on save

## Editing

- Change a section: edit its file in `src/components/`.
- Add a project: add an entry in `src/scripts/data/projects.js` and a card in `src/components/projects.html`.
- Add a skill: add an entry in `src/data/skills.json` (drop the logo in `public/assets/logos/`).
- Partials use `{{> name key="value"}}` includes and `{{key}}` variables.

## Run

    npm install
    npm run dev      # http://localhost:3000, rebuilds on save
    npm run build    # minified output in dist/

## Deploy

Vercel picks up `vercel.json` (build `npm run build`, output `dist`). Enable Analytics in the Vercel dashboard to receive data.
