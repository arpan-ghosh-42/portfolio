import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { publications } from '../data/publications';
import type { Publication } from '../data/types';
import { external, trackSpotlight } from '../lib/utils';
import { copyText } from './Contact';
import { CheckIcon, CopyIcon, ExternalIcon } from './icons';
import { Pipeline } from './Pipeline';
import { Reveal, Section } from './Section';

/** Reports a copy attempt; `what` names the copied thing for the toast. */
type Copied = (ok: boolean, what?: string) => void;

function PublicationCard({ pub, onCopied }: { pub: Publication; onCopied: Copied }) {
  const diagramRef = useRef<HTMLDivElement>(null);
  const inView = useInView(diagramRef, { once: true, margin: '0px 0px -15% 0px' });
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const ok = await copyText(pub.citation);
    onCopied(ok, 'citation');
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article
      aria-labelledby="paper-title"
      className="card spotlight grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
      onPointerMove={trackSpotlight}
    >
      <div className="flex flex-col">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
          <span className="text-accent">{pub.publisher}</span>
          <span>{pub.kind}</span>
          <span>{pub.year}</span>
          <span className="chip border-accent/50 text-accent">{pub.role}</span>
        </p>

        <h3 id="paper-title" className="mt-4 text-xl leading-snug font-bold text-balance sm:text-2xl">
          {pub.title}
        </h3>
        <p className="mt-3 text-sm text-muted">{pub.venue}</p>

        <p className="mt-5 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
          {pub.authors.map((a, i) => (
            <span key={a}>
              {a === pub.me ? <strong className="font-semibold text-fg">{a}</strong> : a}
              {i < pub.authors.length - 1 && ', '}
            </span>
          ))}
        </p>

        <div className="mt-5 space-y-3 text-sm leading-relaxed sm:text-[0.9375rem]">
          {pub.summary.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Topics">
          {pub.topics.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        <p className="mt-5 font-mono text-xs break-all text-subtle">
          doi:{' '}
          <a href={`https://doi.org/${pub.doi}`} {...external} className="underline-offset-2 hover:text-accent hover:underline">
            {pub.doi}
          </a>
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
          <a href={pub.url} {...external} className="btn-primary" aria-label={`Read the paper on ${pub.publisher} Xplore (opens in a new tab)`}>
            Read the paper <ExternalIcon width={15} height={15} />
          </a>
          <button type="button" onClick={copy} className="btn-secondary min-w-[10.5rem]">
            {copied ? <CheckIcon width={15} height={15} className="text-live" /> : <CopyIcon width={15} height={15} />}
            {copied ? 'Citation copied' : 'Copy citation'}
          </button>
        </div>
      </div>

      <div ref={diagramRef} className="rounded-xl border border-line bg-surface/40 p-5 sm:p-6 lg:self-start">
        <p className="eyebrow mb-5">The system, in four stages</p>
        <Pipeline steps={pub.stages} running={inView} />
      </div>
    </article>
  );
}

export function Publications({ onCopied }: { onCopied: Copied }) {
  return (
    <Section id="publication">
      <div className="space-y-5">
        {publications.map((p) => (
          <Reveal key={p.doi}>
            <PublicationCard pub={p} onCopied={onCopied} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
