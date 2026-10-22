// Renders public/og-image.png (1200×630) and public/apple-touch-icon.png (180×180)
// from src/data with headless Chrome/Edge. Run: npm run og
// Set CHROME_PATH if your browser isn't in a standard location.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { profile } from '../src/data/profile.ts';

const root = resolve(import.meta.dirname, '..');

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean) as string[];
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error('No Chrome/Edge found. Set CHROME_PATH to your browser executable.');
  process.exit(1);
}

const fonts =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&family=Instrument+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=block';

const network = (() => {
  const layers = [3, 5, 5, 2];
  const pts = layers.map((n, li) => Array.from({ length: n }, (_, i) => [40 + li * 110, 40 + ((320 - 80) * (i + 1)) / (n + 1)]));
  let edges = '';
  for (let l = 0; l < pts.length - 1; l++)
    for (const a of pts[l]) for (const b of pts[l + 1]) edges += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
  const nodes = pts
    .flat()
    .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 4 === 1 ? 7 : 5}" fill="${i % 4 === 1 ? '#ff6b35' : '#3a3f4b'}"/>`)
    .join('');
  return `<svg width="330" height="252" viewBox="0 0 420 320"><g stroke="#ff6b35" stroke-opacity=".18">${edges}</g>${nodes}</svg>`;
})();

const og = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${fonts}"><style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#0d0e11;color:#ecebe6;font-family:'Instrument Sans',sans-serif;
    background-image:radial-gradient(rgba(236,235,230,.07) 1px,transparent 1px);background-size:22px 22px;position:relative;overflow:hidden}
  .glow{position:absolute;right:-160px;top:-160px;width:620px;height:620px;border-radius:50%;background:rgba(255,107,53,.14);filter:blur(90px)}
  .wrap{position:absolute;inset:72px 80px;display:flex;flex-direction:column}
  .mono{font-family:'JetBrains Mono',monospace}
  .eyebrow{font-size:22px;color:#8c8f98;letter-spacing:.02em}
  h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:112px;line-height:.95;letter-spacing:-.03em;margin-top:22px}
  .roles{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:34px;color:#ff6b35;margin-top:26px}
  .tag{font-size:28px;color:#b0b2ba;margin-top:18px;max-width:640px}
  .foot{margin-top:auto;display:flex;align-items:center;gap:14px;font-size:22px;color:#b0b2ba}
  .dot{width:14px;height:14px;border-radius:50%;background:#4ade80;box-shadow:0 0 0 6px rgba(74,222,128,.15)}
  .net{position:absolute;right:60px;top:170px}
  .mark{position:absolute;right:80px;bottom:72px;font-size:22px;color:#8c8f98}
</style></head><body><div class="glow"></div><div class="net">${network}</div>
<div class="wrap">
  <p class="eyebrow mono">${profile.headline}</p>
  <h1>${profile.name}</h1>
  <p class="roles">${profile.roles.join(' · ')}</p>
  <p class="tag">${profile.tagline}</p>
  <p class="foot"><span class="dot"></span>${profile.status.label} · ${profile.locationShort}</p>
</div>
<p class="mark mono">github.com/${profile.githubHandle}</p>
</body></html>`;

const favicon = readFileSync(join(root, 'public/favicon.svg'), 'utf8');
const touch = `<!doctype html><html><head><style>*{margin:0}body{width:180px;height:180px;background:#15161a}
  svg{width:180px;height:180px;display:block}</style></head><body>${favicon.replace(/rx="8"/, 'rx="0"')}</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
function shoot(html: string, out: string, w: number, h: number) {
  const file = join(dir, `${w}x${h}.html`);
  writeFileSync(file, html);
  execFileSync(chrome!, [
    '--headless=new',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--virtual-time-budget=6000',
    `--window-size=${w},${h}`,
    `--screenshot=${join(root, out)}`,
    pathToFileURL(file).href,
  ], { stdio: 'ignore' });
  console.log('wrote', out);
}

try {
  shoot(og, 'public/og-image.png', 1200, 630);
  shoot(touch, 'public/apple-touch-icon.png', 180, 180);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
