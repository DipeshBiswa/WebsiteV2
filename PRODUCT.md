# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: university recruiters and engineering hiring managers screening candidates for a Summer 2027 software engineering co-op or internship. They are often skimming many portfolios quickly, frequently from a link on a résumé or LinkedIn, on desktop or phone.

## Product Purpose
Personal portfolio for Dipesh Biswa, a Software Engineering student at RIT (B.S. expected May 2029). It exists to land a Summer 2027 co-op / internship. Success means a recruiter emails, opens LinkedIn or GitHub, or views/downloads the résumé.

## Positioning
A systems and API thinker: someone interested in how the pieces of an application fit together. The work centers on Java/Spring Boot backends, React interfaces and the APIs and integrations between them (Plaid, Anthropic Claude API, ESP32 telemetry, JWT/Spring Security). Each project shows its architecture and what Dipesh personally owned, not just a screenshot.

## Operating Context
- Recruiters arrive cold, usually with seconds to judge fit; core stack, availability (Summer 2027) and graduation date must read immediately.
- Projects open in a detail modal with problem, experience, contributions, stack chips, architecture line, repo link and live link when one exists.
- Résumé is available as an inline preview and PDF (`public/assets/resume.pdf`).
- Two pages: `index` (hero, projects, experience, skills, résumé, contact) and `about` (personal story).

## Capabilities and Constraints
- Static site: HTML partials, CSS modules, vanilla JS, bundled with esbuild via `scripts/build.mjs`; deployed on Vercel. No framework.
- Content lives in `src/scripts/data/projects.js` and `src/data/skills.json`; project cards in `src/components/projects.html`.
- Must keep: the light and dark themes with the toggle, and the hero heart / "i" intro animation on the word "passion" (runs on phones too; respects reduced motion).
- Collaborative projects must state Dipesh's part honestly (e.g. LeafLink: backend and API integrations; hardware was a collaborator's).

## Brand Commitments
- Name: Dipesh Biswa. Voice: first person, plain, modest and specific; no hype.
- Hero line "I have a passion for building." with the heart intro animation.
- Personal story on the About page: born and raised in Nepal, loves nature, always building, drawn to positive impact (assets in `public/assets/about/`).

## Evidence on Hand
- Projects: Echo (7th Hack-Nation Global AI Hackathon, NY Hub at Columbia, Oct 2026), IoT Houseplant Health Monitor / LeafLink, Secure Auth Service, Personal Finance Tracker, with screenshots in `public/assets/projects/` and GitHub repos.
- Experience: AOI Operator, YOH (contractor at L3Harris), Apr–Aug 2025.
- Education: RIT Golisano College; RIT Presidential and Davitt Endowed Scholarship; relevant coursework listed.
- Résumé PDF and preview image; headshot `public/assets/about/dipesh.jpg`.
- No testimonials, references, metrics or prior software internships exist. Do not invent any.

## Product Principles
1. Fit is obvious in seconds: role sought, dates, stack and contact are never more than a glance away.
2. Show how systems connect: architecture and ownership over buzzwords.
3. Honest scope: every claim maps to a real project, repo or résumé line.
4. Personality supports credibility; the human story lives on About and never slows the hiring path.
