import { useEffect, useState } from 'react';
import type { Project } from '../data/types';
import { cn, external, trackSpotlight } from '../lib/utils';
import { ArrowRightIcon, ExternalIcon, FlipIcon, GitHubIcon, PlayIcon } from './icons';
import { Pipeline } from './Pipeline';

/** Fired by the command palette to flip a card to its "How it works" face. */
export const FLIP_EVENT = 'project:flip';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** null = no filter, true = matches the active skill, false = dimmed. */
  match: boolean | null;
  wide?: boolean;
}

function Links({ project, size }: { project: Project; size?: 'sm' }) {
  const sm = size === 'sm' ? 'btn-sm' : '';
  const multiRepo = project.repos.length > 1;
  return (
    <>
      {project.live && (
        <a href={project.live} {...external} className={cn('btn-primary', sm)} aria-label={`${project.name} live demo (opens in a new tab)`}>
          Live demo <ExternalIcon width={15} height={15} />
        </a>
      )}
      {project.repos.map((r) => (
        <a
          key={r.url}
          href={r.url}
          {...external}
          className={cn(project.live ? 'btn-secondary' : multiRepo ? 'btn-secondary' : 'btn-primary', sm)}
          aria-label={`${project.name}: ${r.label} repository on GitHub (opens in a new tab)`}
        >
          <GitHubIcon width={15} height={15} /> {multiRepo ? r.label : 'GitHub'}
        </a>
      ))}
      {project.video && (
        <a href={project.video} {...external} className={cn('btn-secondary', sm)} aria-label={`Watch the ${project.name} demo video (opens in a new tab)`}>
          <PlayIcon width={15} height={15} /> Watch demo
        </a>
      )}
    </>
  );
}

export function ProjectCard({ project: p, index, match, wide }: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const onFlip = (e: Event) => {
      if ((e as CustomEvent<string>).detail === p.id) setFlipped(true);
    };
    window.addEventListener(FLIP_EVENT, onFlip);
    return () => window.removeEventListener(FLIP_EVENT, onFlip);
  }, [p.id]);

  const face = 'card spotlight flex h-full flex-col p-5 [backface-visibility:hidden] [grid-area:1/1] sm:p-7';
  const results = p.results?.filter((r) => r.label && r.value) ?? [];

  return (
    <article
      id={`project-${p.id}`}
      aria-labelledby={`project-${p.id}-title`}
      className={cn(
        'h-full [perspective:1800px] transition-[opacity,filter,transform] duration-500',
        match === false && 'scale-[0.98] opacity-35 grayscale-[0.6]',
        match === true && '[&_.card]:border-accent [&_.card]:shadow-[0_0_0_1px_var(--accent),var(--shadow)]',
      )}
    >
      <div
        className="grid h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : undefined }}
      >
        {/* Front: what it is */}
        <div className={face} inert={flipped} onPointerMove={trackSpotlight}>
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-xs text-subtle">
              <span className="text-accent">0{index + 1}</span> / {p.subtitle}
            </p>
            {match === true && <span className="chip border-accent/50 text-accent">matches</span>}
          </div>

          <h3 id={`project-${p.id}-title`} className="mt-4 text-2xl font-bold sm:text-3xl">
            {p.name}
          </h3>
          <p className="mt-3 text-base text-pretty sm:text-lg">{p.summary}</p>

          <div className={cn('mt-4 space-y-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]', wide && 'md:columns-2 md:gap-10 md:space-y-0 [&>p]:break-inside-avoid [&>p+p]:md:mt-0')}>
            {p.description.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>

          {results.length > 0 && (
            <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {results.map((r) => (
                <div key={r.label} className="rounded-xl border border-line bg-surface/50 p-3">
                  <dt className="font-mono text-[0.7rem] tracking-wide text-subtle uppercase">{r.label}</dt>
                  <dd className="mt-1 font-display text-xl font-bold text-accent">{r.value}</dd>
                  {r.note && <dd className="mt-1 text-xs text-muted">{r.note}</dd>}
                </div>
              ))}
            </dl>
          )}

          {p.minorProjects && (
            <div className="mt-6">
              <p className="mb-2.5 font-mono text-xs text-subtle">mini projects ↗</p>
              <ul className="flex flex-wrap gap-2">
                {p.minorProjects.map((mp) => (
                  <li key={mp.label}>
                    <a
                      href={mp.url}
                      {...external}
                      className="inline-flex min-h-8 items-center rounded-full border border-line-strong px-3 text-[0.8125rem] transition-colors hover:border-accent hover:text-accent"
                    >
                      {mp.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {p.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
            <Links project={p} />
            <button type="button" onClick={() => setFlipped(true)} className="btn-ghost ml-auto">
              <FlipIcon width={15} height={15} /> How it works
            </button>
          </div>
        </div>

        {/* Back: how it works */}
        <div className={cn(face, '[transform:rotateY(180deg)]')} inert={!flipped} onPointerMove={trackSpotlight}>
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">How it works</p>
            <p className="font-mono text-xs text-subtle">{p.name}</p>
          </div>
          <div className={cn('mt-5', wide && 'md:my-auto md:pt-4')}>
            <Pipeline steps={p.pipeline} running={flipped} horizontal={wide} />
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
            <Links project={p} size="sm" />
            <button type="button" onClick={() => setFlipped(false)} className="btn-ghost btn-sm ml-auto">
              Back to overview <ArrowRightIcon width={14} height={14} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
