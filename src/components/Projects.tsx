import { projects } from '../data/projects';
import { cn } from '../lib/utils';
import { ProjectCard } from './ProjectCard';
import { Reveal, Section } from './Section';

export function Projects({ activeSkill }: { activeSkill: string | null }) {
  return (
    <Section
      id="projects">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => {
          // The flagship (first) project and repo-only projects span the full row.
          const wide = i === 0 || !p.live;
          return (
            <Reveal key={p.id} delay={(i % 2) * 0.08} className={cn('h-full', wide && 'md:col-span-2')}>
              <ProjectCard
                project={p}
                index={i}
                wide={wide}
                match={activeSkill ? p.skills.includes(activeSkill) : null}
              />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
