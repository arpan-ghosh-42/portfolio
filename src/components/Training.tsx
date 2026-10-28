import { training } from '../data/training';
import { external, trackSpotlight } from '../lib/utils';
import { ExternalIcon } from './icons';
import { Reveal, Section } from './Section';

export function Training() {
  return (
    <Section id="training">
      <ul className="grid gap-4 md:grid-cols-2">
        {training.map((t, i) => (
          <li key={`${t.provider}-${t.title}`}>
            <Reveal delay={i * 0.06} className="h-full">
              <article className="card spotlight flex h-full flex-col p-5 sm:p-6" onPointerMove={trackSpotlight}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-xs text-accent">
                    {t.provider}
                    {t.program && <span className="text-subtle"> · {t.program}</span>}
                  </p>
                  <span className="chip border-accent/50 text-accent">{t.status}</span>
                </div>

                <h3 className="mt-3 text-xl font-bold sm:text-2xl">{t.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {t.format}
                  {t.date && <> · {t.date}</>}
                </p>

                {t.topics && (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics covered">
                    {t.topics.map((topic) => (
                      <li key={topic} className="chip">
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}

                {t.certificate && (
                  <div className="mt-auto pt-5">
                    <a
                      href={t.certificate}
                      {...external}
                      className="btn-secondary btn-sm"
                      aria-label={`View the ${t.provider} ${t.title} certificate (opens in a new tab)`}
                    >
                      View certificate <ExternalIcon width={14} height={14} />
                    </a>
                  </div>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
