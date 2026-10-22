import type { Command } from './components/CommandPalette';
import { FLIP_EVENT } from './components/ProjectCard';
import {
  DownloadIcon, ExternalIcon, FlipIcon, GitHubIcon, HashIcon, LinkedInIcon, MailIcon, CopyIcon,
  MoonIcon, PlayIcon, SparkIcon,
} from './components/icons';
import { profile } from './data/profile';
import { projects } from './data/projects';
import { publications } from './data/publications';
import { sections } from './data/site';
import { skillGroups } from './data/skills';
import { asset, scrollToId } from './lib/utils';

interface Actions {
  toggleTheme: () => void;
  toggleNeural: () => void;
  copyEmail: () => void;
  copyText: (text: string, what: string) => void;
  filterBySkill: (skill: string) => void;
}

const open = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');
const sm = { width: 16, height: 16 };

/** Everything the Ctrl/⌘K palette can do, built from src/data. */
export function buildCommands(a: Actions): Command[] {
  return [
    { id: 'go-top', group: 'Go to', label: 'Top', keywords: 'home hero start', icon: <HashIcon {...sm} />, run: () => scrollToId('top') },
    ...sections.map((s) => ({
      id: `go-${s.id}`,
      group: 'Go to',
      label: s.label,
      keywords: 'section',
      icon: <HashIcon {...sm} />,
      run: () => scrollToId(s.id),
    })),

    ...projects.flatMap((p) => [
      ...(p.live
        ? [{ id: `live-${p.id}`, group: 'Live demos', label: `Open ${p.name}`, keywords: `demo app ${p.subtitle}`, icon: <ExternalIcon {...sm} />, hint: '↗', run: () => open(p.live!) }]
        : []),
      ...(p.video
        ? [{ id: `video-${p.id}`, group: 'Live demos', label: `Watch ${p.name} demo video`, keywords: 'video', icon: <PlayIcon {...sm} />, hint: '↗', run: () => open(p.video!) }]
        : []),
    ]),

    ...projects.flatMap((p) => [
      {
        id: `how-${p.id}`,
        group: 'Projects',
        label: `How ${p.name} works`,
        keywords: `pipeline diagram ${p.subtitle} ${p.tech.join(' ')}`,
        icon: <FlipIcon {...sm} />,
        run: () => {
          scrollToId(`project-${p.id}`);
          window.dispatchEvent(new CustomEvent(FLIP_EVENT, { detail: p.id }));
        },
      },
      ...p.repos.map((r) => ({
        id: `repo-${p.id}-${r.label}`,
        group: 'Projects',
        label: p.repos.length > 1 ? `${r.label} repo on GitHub` : `${p.name} on GitHub`,
        keywords: 'code source repo',
        icon: <GitHubIcon {...sm} />,
        hint: '↗',
        run: () => open(r.url),
      })),
    ]),

    ...publications.flatMap((pub) => [
      { id: `paper-${pub.doi}`, group: 'Publication', label: `Read the paper: ${pub.venue.match(/\(([^)]+)\)$/)?.[1] ?? pub.publisher} ${pub.year}`, keywords: `research ieee ${pub.title} ${pub.topics.join(' ')}`, icon: <ExternalIcon {...sm} />, hint: '↗', run: () => open(pub.url) },
      { id: `cite-${pub.doi}`, group: 'Publication', label: 'Copy paper citation', keywords: 'cite reference bibtex ieee', icon: <CopyIcon {...sm} />, run: () => a.copyText(pub.citation, 'citation') },
    ]),

    { id: 'email', group: 'Contact', label: 'Email Arpan', keywords: `mail ${profile.email}`, icon: <MailIcon {...sm} />, run: () => (location.href = `mailto:${profile.email}`) },
    { id: 'copy-email', group: 'Contact', label: 'Copy email address', keywords: 'clipboard', icon: <CopyIcon {...sm} />, run: a.copyEmail },
    { id: 'linkedin', group: 'Contact', label: 'LinkedIn', keywords: 'profile', icon: <LinkedInIcon {...sm} />, hint: '↗', run: () => open(profile.linkedin) },
    { id: 'github', group: 'Contact', label: 'GitHub profile', keywords: 'code', icon: <GitHubIcon {...sm} />, hint: '↗', run: () => open(profile.github) },
    { id: 'resume', group: 'Contact', label: 'Download resume', keywords: 'cv pdf', icon: <DownloadIcon {...sm} />, run: () => open(asset(profile.resume)) },

    { id: 'theme', group: 'Preferences', label: 'Toggle dark / light theme', keywords: 'mode colour color', icon: <MoonIcon {...sm} />, run: a.toggleTheme },
    { id: 'neural', group: 'Preferences', label: 'Neural mode (or just type “ml”)', keywords: 'easter egg secret network ml', icon: <SparkIcon {...sm} />, run: a.toggleNeural },

    ...skillGroups.flatMap((g) =>
      g.skills.map((s) => ({
        id: `skill-${s}`,
        group: 'Filter projects by skill',
        label: s,
        keywords: `skill filter ${g.title}`,
        icon: <HashIcon {...sm} />,
        searchOnly: true,
        run: () => a.filterBySkill(s),
      })),
    ),
  ];
}
