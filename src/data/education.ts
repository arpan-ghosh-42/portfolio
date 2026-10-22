import type { EducationItem } from './types.ts';

// Newest first. Leave `period` out where you don't want a date shown.

export const education: EducationItem[] = [
  {
    degree: 'M.Tech, Computer Science',
    institution: 'Tripura University',
    period: '2026 – 2028',
    detail: 'Currently in the 1st semester.',
    badge: 'Pursuing',
  },
  {
    degree: 'BE',
    institution: 'Chandigarh University',
    period: '2021 – 2025',
    detail: 'CGPA 7.4',
  },
  {
    degree: 'Class XII',
    institution: 'WBCHSE',
    detail: '93.4%',
  },
  {
    degree: 'Class X',
    institution: 'WBBSE',
    detail: '87%',
  },
];
