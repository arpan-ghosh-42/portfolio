import { useRef } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import { education } from '../data/education';
import { cn } from '../lib/utils';
import { Reveal, Section } from './Section';

export function Education() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <Section id="education">
      <ol ref={listRef} className="relative max-w-3xl">
        {/* The rail draws itself as you scroll. */}
        <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-0.5 rounded-full bg-line" />
        <m.span
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-0.5 origin-top rounded-full bg-accent"
          style={{ scaleY }}
        />
        {education.map((e, i) => (
          <li key={e.degree} className="relative pb-10 pl-10 last:pb-0 sm:pl-12">
            <span
              aria-hidden
              className={cn(
                'absolute top-1.5 left-0 size-4 rounded-full border-2 bg-bg',
                i === 0 ? 'border-accent shadow-[0_0_0_5px_var(--accent-soft)]' : 'border-line-strong',
              )}
            />
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {e.period && <p className="font-mono text-sm text-accent">{e.period}</p>}
                {e.badge && (
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[0.7rem] text-accent uppercase">
                    {e.badge}
                  </span>
                )}
              </div>
              <h3 className="mt-1.5 text-xl font-bold sm:text-2xl">{e.degree}</h3>
              <p className="mt-0.5 text-muted">{e.institution}</p>
              {e.detail && <p className="mt-2 inline-block font-mono text-sm text-fg">{e.detail}</p>}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
