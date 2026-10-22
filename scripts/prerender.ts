// Bakes the rendered page into dist/index.html so it paints before any JS runs,
// then React hydrates it. Runs after `vite build` and the SSR build (see package.json).
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const ssrDir = resolve(root, 'dist-ssr');
const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

const file = resolve(root, 'dist/index.html');
const html = readFileSync(file, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Could not find the empty #root in dist/index.html');
const out = html
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  // The page is already visible without JS, which only hydrates it, so let CSS and fonts load first.
  .replace('<script type="module" crossorigin', '<script type="module" crossorigin fetchpriority="low"');
writeFileSync(file, out);
rmSync(ssrDir, { recursive: true, force: true });
console.log('prerendered dist/index.html');
