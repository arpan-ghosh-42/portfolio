# Arpan Ghosh: Portfolio

Personal portfolio for **Arpan Ghosh** (Machine Learning | Data Science | AI Engineer).
A static site built with Vite, React, TypeScript, Tailwind CSS and Framer Motion.

- Hero with a rotating role line and a "model card" summary
- Live demos strip linking straight to the deployed apps
- Skill chips that highlight the projects using that skill
- Project cards that flip to an animated "How it works" pipeline
- Command palette (<kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd>), dark/light theme, scroll progress, education timeline
- Easter egg: type `ml` anywhere on the page
- Prerendered to static HTML at build time, so the page shows up before any JavaScript loads

## Quick start

Requires **Node.js 22.18+** (Node 24 recommended; see `.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck + production build + prerender into dist/
npm run preview   # serve dist/ at http://localhost:4173
```

## Editing content

All text, links and data live in `src/data/`. You never need to touch the components to update the site.

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | Name, headline, rotating roles, tagline, bio, status, location, email, GitHub, LinkedIn, resume path, and the hero "model card" rows |
| `src/data/projects.ts` | Projects: text, tech chips, live / repo / video links, results, "How it works" pipeline steps, mini projects, plus the note under the live demos |
| `src/data/skills.ts` | Skill groups and chips |
| `src/data/education.ts` | Education timeline (newest first) |
| `src/data/site.ts` | Site URL, SEO title and description, section headings and intros, footer text |
| `src/data/types.ts` | The shape of each item (only edit this to add a new field) |

### Add your resume

Put the PDF at `public/resume.pdf`. The "Download resume" buttons and the command palette already point there.

### Add real project results

Each project has an optional `results` array. The results block appears only when it has items, so leave it empty until you have measured numbers.

```ts
// src/data/projects.ts
results: [
  { label: 'Face ID accuracy', value: '96%', note: '40 group photos, 2 classes' },
  { label: 'Avg. report time', value: '8 s' },
],
```

### Add a demo video

Set `video` on a project to a YouTube or Loom URL. A "Watch demo" button then appears on the card and in the command palette.

```ts
video: 'https://www.loom.com/share/your-video-id',
```

### Project screenshots

Each project has an optional `image`. Screenshots live in `public/projects/` as WebP files (about 1200px wide):

```ts
image: {
  src: '/projects/attendly.webp',
  alt: 'Attendly home screen with Student Portal and Teacher Portal options.',
  width: 1200, // the file's real pixel size, so the page doesn't jump while it loads
  height: 675,
  caption: 'optional text for the frame’s top bar', // defaults to the live demo's address
},
```

To replace one, save a new screenshot over the file (or add a new file and update `src`), and keep `width` and `height` in step with the image. Leave `image` out to show no screenshot.

### How the skills filter works

Clicking a skill highlights every project whose `skills` array contains that exact string. When you add a skill to `skills.ts`, add the same string to the `skills` array of any project that uses it. A skill used by no project still works; the filter bar says it isn't in a featured project yet.

### Project card layout

The first project and any project without a live demo span the full width on larger screens, with the screenshot beside the text; the others sit two per row with the screenshot on top.

## SEO, social image and favicon

- **Set `url` in `src/data/site.ts` to your real address** once you deploy. It is used for the canonical link, Open Graph and Twitter tags, `sitemap.xml` and `robots.txt`.
- Meta tags, the JSON-LD `Person` schema, `sitemap.xml` and `robots.txt` are generated at build time from `src/data` by `seo.ts`.
- `public/og-image.png` (1200×630) and `public/apple-touch-icon.png` are generated from your profile data. After changing your name, headline, roles or tagline, regenerate them:

  ```bash
  npm run og
  ```

  This uses your installed Chrome or Edge in headless mode. If it can't find one, set `CHROME_PATH` to the browser executable.
- The favicon is `public/favicon.svg`.

## Deploy

The build output is a plain static folder: `dist/`.

### Vercel

1. Push the repo to GitHub.
2. In Vercel, choose **Add New → Project** and import the repo.
3. Vercel detects Vite. Keep the defaults: build command `npm run build`, output directory `dist`.
4. Deploy, then put the final URL in `src/data/site.ts` (`url`) and push again.

### Netlify

1. Push the repo to GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and pick the repo.
3. Build command `npm run build`, publish directory `dist`. Netlify reads the Node version from `.nvmrc`.
4. Deploy, then update `url` in `src/data/site.ts` and push again.

### GitHub Pages (alternative)

If the site will live at `https://<user>.github.io/<repo>/`, it needs to know that sub-path:

1. Set `url` in `src/data/site.ts` to `https://<user>.github.io/<repo>` (no trailing slash).
2. Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     deploy:
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version-file: .nvmrc
             cache: npm
         - run: npm ci
         - run: npm run build
           env:
             BASE_PATH: /${{ github.event.repository.name }}/
         - uses: actions/upload-pages-artifact@v3
           with:
             path: dist
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

3. In the repo on GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Push to `main`.

For a user site (`https://<user>.github.io/` from a repo named `<user>.github.io`), leave out the `BASE_PATH` line.

## Project structure

```
public/              favicon, OG image, touch icon (add resume.pdf here)
scripts/
  generate-og.ts     renders og-image.png and apple-touch-icon.png
  prerender.ts       bakes the rendered page into dist/index.html
seo.ts               Vite plugin: meta tags, JSON-LD, sitemap, robots
src/
  data/              all editable content
  components/        UI sections and widgets
  hooks/             theme, scroll-spy, key sequence, shortcut label
  commands.tsx       command palette actions (built from src/data)
  App.tsx            page layout and shared state
  entry-server.tsx   used by the prerender step
```

## Accessibility and motion

- Every interactive element is reachable by keyboard, with visible focus rings and a skip link.
- The command palette follows the combobox/listbox pattern (arrow keys, Enter, Esc).
- The hidden face of a flipped project card is made `inert`, so it can't be tabbed into.
- With "reduce motion" turned on in the OS, animations are switched off or reduced to simple fades.
