import { cp, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const resources = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
  .map(match => match[1])
  .filter(path => !path.includes('://'));
for (const path of [...resources, 'site.js', 'upstream-prs.json']) {
  const info = await stat(resolve(root, path));
  if (!info.isFile() || info.size === 0) throw new Error(`Missing or empty asset: ${path}`);
}
const prs = JSON.parse(await readFile(resolve(root, 'upstream-prs.json'), 'utf8'));
if (!Array.isArray(prs)) throw new Error('Upstream links must be an array');
for (const pr of prs) {
  if (!/^https:\/\/github\.com\/slint-ui\/slint\/pull\/\d+$/.test(pr.url)
      || typeof pr.title !== 'string' || !pr.title.trim()
      || !['Open', 'Merged', 'Closed'].includes(pr.status)) {
    throw new Error('Invalid upstream pull request entry');
  }
}
const output = resolve(root, 'dist');
await mkdir(output, { recursive: true });
for (const path of ['index.html', 'styles.css', 'site.js', 'favicon.svg', 'upstream-prs.json', 'assets']) {
  await cp(resolve(root, path), resolve(output, path), { recursive: true });
}
await writeFile(resolve(output, '_headers'), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Content-Security-Policy: default-src 'self'; img-src 'self'; media-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'\n`);
console.log('Static assets and upstream link data checked; site packaged in dist/.');
