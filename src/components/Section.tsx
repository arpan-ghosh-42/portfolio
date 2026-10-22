import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { sectionCopy, type SectionId } from '../data/site';
import { cn } from '../lib/utils';

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/** Fades its children up once they scroll into view. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </m.div>
  );
}

interface SectionProps {
  id: SectionId;
  children: ReactNode;
  className?: string;
}

/** A page section whose eyebrow, title and intro come from `sections` in data/site.ts. */
export function Section({ id, children, className }: SectionProps) {
  const { index, eyebrow, title, intro } = sectionCopy(id);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('py-20 outline-none sm:py-28', className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <p className="eyebrow mb-3 flex items-center gap-3">
            <span className="text-subtle">{index}</span>
            <span className="h-px w-8 bg-accent/60" aria-hidden />
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="text-3xl font-bold text-balance sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-base text-pretty text-muted sm:text-lg">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
