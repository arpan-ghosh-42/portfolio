import type { TrainingItem } from './types.ts';

// Courses and training programmes, newest or most substantial first.
// Copied from the resume's "Training & Certifications" section; keep them in step.

export const training: TrainingItem[] = [
  {
    title: 'AI/ML & Data Science',
    provider: 'Apna College',
    program: 'Prime 2.0',
    format: '1-year programme',
    status: 'Completed',
    topics: ['Machine learning', 'Deep learning', 'SQL', 'Web scraping', 'Gen AI', 'Agentic AI', 'Docker'],
  },
  {
    title: 'Machine Learning',
    provider: 'Internshala Trainings',
    format: '6-week online training',
    date: 'Aug 2023',
    status: 'Certified',
    certificate: 'https://trainings.internshala.com/view_certificate/ctzzlm7ybf0/zslaqal8x__/',
  },
];
