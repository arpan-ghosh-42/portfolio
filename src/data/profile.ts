// Who you are. Everything in the hero, about and contact sections reads from here.

export const profile = {
  name: 'Arpan Ghosh',
  firstName: 'Arpan',
  initials: 'AG',
  headline: 'Machine Learning | Data Science | AI Engineer',
  /** The hero's animated line cycles through these. */
  roles: ['ML Engineer', 'Data Scientist', 'AI Engineer'],
  tagline: "I'm a builder who researches first and ships second.",
  location: 'Kolkata, West Bengal, India',
  locationShort: 'Kolkata, IN',
  timezone: 'IST · UTC+5:30',

  status: {
    /** Set to false to hide the green "open to" badge. */
    open: true,
    label: 'Open to remote internships',
    detail: 'Looking for remote ML, Data Science and AI Engineer internships.',
    current: 'M.Tech student, Computer Science, Tripura University (2026–2028, 1st semester)',
  },

  bio: [
    'Machine learning and deep learning pulled me in because they let me take a messy real-world problem and turn it into something that actually works.',
    'I love the moment an idea on paper becomes a product people can use, especially when it makes their day a little easier.',
    "I'm drawn to research, statistics and computer vision, and I like going deep until I understand why a model works, not just that it does.",
    'Across data science and AI, my favourite thing is starting a new project from zero.',
  ],
  /** Short interest tags shown beside the bio. */
  interests: ['Research', 'Statistics', 'Computer vision', 'Zero-to-one projects'],

  email: 'arpanghosh6734@gmail.com',
  github: 'https://github.com/arpan-ghosh-42',
  githubHandle: 'arpan-ghosh-42',
  linkedin: 'https://www.linkedin.com/in/arpan-ghosh-21261327a/',
  /** Put your resume at public/resume.pdf and this link will work. */
  resume: '/resume.pdf',
} as const;

/**
 * The "model card" in the hero: a quick, skimmable summary for recruiters.
 * Keep each value short. Only facts.
 */
export const modelCard: { key: string; value: string }[] = [
  { key: 'model', value: 'arpan-ghosh · student build' },
  { key: 'task', value: 'ML · Data Science · AI Engineering' },
  { key: 'base', value: 'BE, Chandigarh University (2021–2025)' },
  { key: 'fine-tuning', value: 'M.Tech CS, Tripura University (2026–2028)' },
  { key: 'interests', value: 'Research · statistics · computer vision' },
  { key: 'deployed', value: 'NibbleContract AI · Attendly · Movexa' },
  { key: 'region', value: 'Kolkata, IN · remote-ready' },
  { key: 'intended use', value: 'Remote ML / DS / AI Engineer internships' },
];
