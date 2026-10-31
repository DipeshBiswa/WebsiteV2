// Dependency-light static site build: HTML partials + data-driven pieces + esbuild for CSS/JS.
//   node scripts/build.mjs          -> writes ./dist
import { build } from 'esbuild';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const dist = join(root, 'dist');

// ---- tiny template engine: {{> partial key="value"}} and {{key}} ----
const partialCache = new Map();
async function partial(name) {
  if (!partialCache.has(name)) partialCache.set(name, await readFile(join(src, 'components', `${name}.html`), 'utf8'));
  return partialCache.get(name);
}
const parseArgs = (s) => Object.fromEntries([...s.matchAll(/(\w+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));

async function render(html, vars = {}, helpers = {}) {
  const re = /\{\{>\s*([\w-]+)([^}]*)\}\}/g;
  let out = '', last = 0, m;
  while ((m = re.exec(html))) {
    out += html.slice(last, m.index);
    out += await render(await partial(m[1]), { ...vars, ...parseArgs(m[2]) }, helpers);
    last = re.lastIndex;
  }
  out += html.slice(last);
  return out.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? vars[k] : k in helpers ? helpers[k]() : `{{${k}}}`));
}

// ---- data-driven component: skills marquee (two copies for the seamless loop) ----
async function skillTiles() {
  const skills = JSON.parse(await readFile(join(src, 'data', 'skills.json'), 'utf8'));
  const tile = (s) => `<div class="sk">${s.logo
    ? `<img src="assets/${s.logo}" alt="" width="64" height="64">`
    : s.svg}<span>${s.name}</span></div>`;
  const row = skills.map(tile).join('');
  return `<div>${row}</div>\n<div aria-hidden="true">${row}</div>`;
}

// ---- build ----
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, 'public'), dist, { recursive: true });

const tiles = await skillTiles();
for (const file of await readdir(join(src, 'pages'))) {
  const page = await readFile(join(src, 'pages', file), 'utf8');
  await writeFile(join(dist, file), await render(page, {}, { skillTiles: () => tiles }));
}

await build({
  entryPoints: {
    index: join(src, 'scripts/index.js'),
    about: join(src, 'scripts/about.js'),
    main: join(src, 'styles/main.css'),
  },
  outdir: dist,
  bundle: true,
  minify: process.argv.includes('--minify'),
  format: 'esm',
  target: 'es2019',
  logLevel: 'info',
});
console.log('Built ->', dist);
