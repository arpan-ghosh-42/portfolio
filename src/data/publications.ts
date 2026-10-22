import type { Publication } from './types.ts';

// Your published work. Everything here comes from the publisher's record
// (https://ieeexplore.ieee.org/document/10596633). Keep `role` accurate.

export const publications: Publication[] = [
  {
    title: 'A login confirmation mechanism for meeting platforms with an automatic face acknowledgment system',
    venue: '2024 Sixth International Conference on Computational Intelligence and Communication Technologies (CCICT)',
    kind: 'Conference paper',
    publisher: 'IEEE',
    date: '19 April 2024',
    year: '2024',
    doi: '10.1109/CCICT62777.2024.00100',
    url: 'https://ieeexplore.ieee.org/document/10596633',
    authors: ['Sanjay Singla', 'Er. Neha Rajput', 'Sonu', 'Balwinder Singh', 'Arpan Ghosh', 'Ajay Kumar'],
    me: 'Arpan Ghosh',
    role: 'Co-author',
    summary: [
      'Meeting links can be forwarded to anyone, and shared login details let uninvited people join. The paper proposes using face recognition to confirm that only the intended attendees enter an online meeting.',
      'It uses the Local Binary Pattern Histogram (LBPH) method with a Haar-Cascade classifier for recognising faces.',
    ],
    topics: ['Face recognition', 'LBPH', 'Haar-Cascade', 'Authentication', 'Online meetings'],
    stages: [
      { label: 'Participant entry', detail: 'An attendee tries to join the meeting.' },
      { label: 'Face detection', detail: 'A face is found in the camera frame.' },
      { label: 'Face recognition', detail: 'LBPH with a Haar-Cascade classifier checks who it is.' },
      { label: 'Database construction', detail: 'Attendee face data is kept in a database for verification.' },
    ],
    citation:
      'S. Singla, N. Rajput, Sonu, B. Singh, A. Ghosh and A. Kumar, "A login confirmation mechanism for meeting platforms with an automatic face acknowledgment system," 2024 Sixth International Conference on Computational Intelligence and Communication Technologies (CCICT), 2024, doi: 10.1109/CCICT62777.2024.00100.',
  },
];
