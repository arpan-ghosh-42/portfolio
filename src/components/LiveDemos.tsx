import { demoNote, projects } from '../data/projects';
import { external, trackSpotlight } from '../lib/utils';
import { ExternalIcon } from './icons';
import { Reveal, Section } from './Section';

const demos = projects.filter((p) => p.live);

export function LiveDemos() {
  return (
    <Section
      id="demos"
      className="pt-4 sm:pt-8"
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {demos.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={i * 0.08} className="h-full">
              <a
                href={p.live}
                {...external}
                onPointerMove={trackSpotlight}
                className="card spotlight group flex h-full flex-col p-5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/60 sm:p-6"
              >
                <span className="flex items-center justify-between">
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-live">
                    <span className="size-1.5 rounded-full bg-live" aria-hidden /> live
                  </span>
                </span>
                <span className="mt-5 font-display text-2xl font-bold">{p.name}</span>
                <span className="mt-1 text-sm text-muted">{p.subtitle}</span>
                <span className="mt-3 mb-6 truncate font-mono text-xs text-subtle">{new URL(p.live!).host}</span>
                <span className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
                  <span className="text-xs text-subtle">opens in a new tab</span>
                  <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent">
                    Open app
                    <ExternalIcon width={15} height={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
      {demoNote && <p className="mt-5 font-mono text-xs text-subtle">* {demoNote}</p>}
    </Section>
  );
}
