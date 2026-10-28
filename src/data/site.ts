// Site-wide settings: SEO, navigation and footer text.
// `url` must be your real deployed address (no trailing slash). It is used for
// canonical links, Open Graph tags, the sitemap and robots.txt.

export const site = {
  url: 'https://arpan-ghosh-portfolio.vercel.app',
  title: 'Arpan Ghosh · ML, Data Science & AI Engineer',
  description:
    'Arpan Ghosh: M.Tech CS student in Kolkata open to remote ML, Data Science and AI Engineer internships and jobs, anywhere. Live demos of NibbleContract AI, Attendly and Movexa.',
  ogImage: '/og-image.png',
  ogImageAlt: 'Arpan Ghosh, Machine Learning | Data Science | AI Engineer',
  locale: 'en_IN',
  themeColor: { light: '#f7f6fb', dark: '#0d0c13' },
  keywords: [
    'Arpan Ghosh', 'machine learning', 'data science', 'AI engineer', 'computer vision',
    'internship', 'remote internship', 'remote jobs', 'portfolio', 'Kolkata',
  ],
};

/**
 * Page sections in order. `label` is used in the header nav and command palette;
 * eyebrow / title / intro are the section headings. Ids are wired to components,
 * so change the text freely but keep the ids.
 */
export const sections = [
  {
    id: 'demos',
    label: 'Live demos',
    eyebrow: 'Try it live',
    title: 'Deployed apps you can use right now.',
    intro: 'No screenshots, no mock-ups. Each one opens the real app in a new tab.',
  },
  {
    id: 'about',
    label: 'About',
    eyebrow: 'About',
    title: 'Researches first. Ships second.',
  },
  {
    id: 'skills',
    label: 'Skills',
    eyebrow: 'Skills',
    title: 'The toolkit, wired to the work.',
    intro: 'Click any skill to light up the projects that use it. Click it again to clear.',
  },
  {
    id: 'projects',
    label: 'Projects',
    eyebrow: 'Projects',
    title: 'Built from zero, shipped to the web.',
    intro: 'Each card flips to show how the system works under the hood. Live demo and code on every one.',
  },
  {
    id: 'publication',
    label: 'Paper',
    eyebrow: 'Publication',
    title: 'Co-authored research, published with IEEE.',
  },
  {
    id: 'training',
    label: 'Training',
    eyebrow: 'Training & certifications',
    title: 'Structured training, beyond the degree.',
  },
  {
    id: 'education',
    label: 'Education',
    eyebrow: 'Education',
    title: 'The foundations.',
  },
  {
    id: 'contact',
    label: 'Contact',
    eyebrow: 'Contact',
    title: 'Hiring for a remote internship or job in ML, data or AI? Let’s talk.',
  },
] as const satisfies readonly { id: string; label: string; eyebrow: string; title: string; intro?: string }[];

export type SectionId = (typeof sections)[number]['id'];

export function sectionCopy(id: SectionId) {
  const i = sections.findIndex((s) => s.id === id);
  const s: { id: string; label: string; eyebrow: string; title: string; intro?: string } = sections[i];
  return { ...s, index: String(i + 1).padStart(2, '0') };
}

export const footer = {
  note: 'Designed and built by Arpan Ghosh with React, TypeScript and Tailwind CSS.',
  /** {shortcut} becomes Ctrl K or ⌘K depending on the visitor's OS. */
  hint: 'Psst: press {shortcut} to jump anywhere, or just type “ml”.',
};
