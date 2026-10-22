// Build-time SEO: injects meta / Open Graph / Twitter / JSON-LD tags into
// index.html and emits sitemap.xml + robots.txt, all from src/data.
import type { HtmlTagDescriptor, Plugin } from 'vite';
import { site } from './src/data/site.ts';
import { profile } from './src/data/profile.ts';
import { skillGroups } from './src/data/skills.ts';
import { education } from './src/data/education.ts';

// Relative resolution keeps any sub-path in site.url (GitHub Pages project sites).
const abs = (path: string) => new URL(path.replace(/^\//, ''), site.url + '/').toString();

function personJsonLd() {
  const [locality, region] = profile.location.split(',').map((s) => s.trim());
  const universities = education.filter((e) => /university/i.test(e.institution));
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: site.url,
    image: abs(profile.photo?.src ?? site.ogImage),
    jobTitle: profile.headline,
    description: site.description,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: locality, addressRegion: region, addressCountry: 'IN' },
    sameAs: [profile.github, profile.linkedin],
    alumniOf: universities.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
    knowsAbout: skillGroups.flatMap((g) => g.skills),
  };
}

export function seo(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: 'meta', attrs, injectTo: 'head' });
      const tags: HtmlTagDescriptor[] = [
        meta({ name: 'description', content: site.description }),
        meta({ name: 'keywords', content: site.keywords.join(', ') }),
        meta({ name: 'author', content: profile.name }),
        { tag: 'link', attrs: { rel: 'canonical', href: abs('/') }, injectTo: 'head' },
        meta({ name: 'theme-color', content: site.themeColor.light, media: '(prefers-color-scheme: light)' }),
        meta({ name: 'theme-color', content: site.themeColor.dark, media: '(prefers-color-scheme: dark)' }),
        meta({ property: 'og:type', content: 'profile' }),
        meta({ property: 'og:site_name', content: profile.name }),
        meta({ property: 'og:title', content: site.title }),
        meta({ property: 'og:description', content: site.description }),
        meta({ property: 'og:url', content: abs('/') }),
        meta({ property: 'og:image', content: abs(site.ogImage) }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ property: 'og:image:alt', content: site.ogImageAlt }),
        meta({ property: 'og:locale', content: site.locale }),
        meta({ property: 'profile:first_name', content: profile.firstName }),
        meta({ property: 'profile:last_name', content: profile.name.split(' ').slice(1).join(' ') }),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        meta({ name: 'twitter:title', content: site.title }),
        meta({ name: 'twitter:description', content: site.description }),
        meta({ name: 'twitter:image', content: abs(site.ogImage) }),
        meta({ name: 'twitter:image:alt', content: site.ogImageAlt }),
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(personJsonLd()).replace(/</g, '\\u003c'),
          injectTo: 'head',
        },
      ];
      const noscript =
        `<p style="padding:1rem;font-family:sans-serif">${profile.name}: ${profile.headline}. ` +
        `This site needs JavaScript. Find me on <a href="${profile.github}">GitHub</a> and ` +
        `<a href="${profile.linkedin}">LinkedIn</a>, or email <a href="mailto:${profile.email}">${profile.email}</a>.</p>`;
      return { html: html.replace('%SITE_TITLE%', site.title).replace('%NOSCRIPT%', noscript), tags };
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${abs('/')}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`,
      });
    },
  };
}
