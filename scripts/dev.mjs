// Dev server: rebuilds on change and serves ./dist on http://localhost:3000
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { watch } from 'node:fs';
import { execFile } from 'node:child_process';
import { extname, join, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.pdf': 'application/pdf' };

let timer;
const rebuild = () => { clearTimeout(timer); timer = setTimeout(() => execFile('node', [join(root, 'scripts/build.mjs')], (e, out, err) => console.log(e ? err : 'rebuilt')), 80); };
rebuild();
for (const dir of ['src', 'public']) watch(join(root, dir), { recursive: true }, rebuild);

createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  if (p.endsWith('/')) p += 'index.html';
  try { res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(await readFile(join(root, 'dist', p))); }
  catch { res.writeHead(404); res.end('Not found'); }
}).listen(3000, () => console.log('http://localhost:3000'));
