import { m } from 'framer-motion';
import type { CSSProperties } from 'react';
import type { PipelineStep } from '../data/types';
import { cn } from '../lib/utils';

const STEP_SECONDS = 0.7;

interface PipelineProps {
  steps: PipelineStep[];
  /** Restarts the animation each time the card is flipped to this face. */
  running: boolean;
  /** Lay the steps out left-to-right from the md breakpoint up. */
  horizontal?: boolean;
}

/**
 * Pipeline diagram. A "packet" travels along the rail while each node pulses
 * in turn, so the data flow reads at a glance.
 */
export function Pipeline({ steps, running, horizontal }: PipelineProps) {
  const cycle = `${steps.length * STEP_SECONDS}s`;
  const packet = 'absolute size-2 rounded-full bg-accent shadow-[0_0_12px_2px_var(--accent)]';

  return (
    <ol
      className={cn('relative', horizontal && 'md:grid md:gap-4')}
      style={horizontal ? { gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` } : undefined}
      aria-label="Pipeline steps"
    >
      {/* Vertical rail (always on mobile) */}
      <span aria-hidden className={cn('absolute top-4 bottom-4 left-[15px] w-px bg-line-strong', horizontal && 'md:hidden')}>
        {running && (
          <span
            className={cn(packet, '-left-[3.5px] motion-safe:animate-[packet_var(--cycle)_linear_infinite]')}
            style={{ '--cycle': cycle } as CSSProperties}
          />
        )}
      </span>
      {/* Horizontal rail (wide cards, md+) */}
      {horizontal && (
        <span
          aria-hidden
          className="absolute top-4 hidden h-px bg-line-strong md:block"
          style={{ left: `${50 / steps.length}%`, right: `${50 / steps.length}%` }}
        >
          {running && (
            <span
              className={cn(packet, '-top-[3.5px] motion-safe:animate-[packet-x_var(--cycle)_linear_infinite]')}
              style={{ '--cycle': cycle } as CSSProperties}
            />
          )}
        </span>
      )}

      {steps.map((s, i) => (
        <m.li
          key={s.label}
          className={cn(
            'relative grid grid-cols-[32px_1fr] gap-3 py-2',
            horizontal && 'md:grid-cols-1 md:justify-items-center md:gap-3 md:py-0 md:text-center',
          )}
          initial={false}
          animate={running ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ delay: running ? 0.25 + i * 0.09 : 0, duration: 0.4 }}
        >
          <span
            aria-hidden
            className={cn(
              'relative z-10 grid size-8 place-items-center rounded-full border font-mono text-xs',
              i === steps.length - 1 ? 'border-accent bg-accent text-accent-fg' : 'border-line-strong bg-elev text-fg',
            )}
            style={running ? { animation: `node-pulse ${cycle} ease-in-out ${i * STEP_SECONDS}s infinite` } : undefined}
          >
            {i + 1}
          </span>
          <span className="min-w-0 pt-1">
            <span className="block text-sm font-semibold">{s.label}</span>
            <span className="mt-0.5 block text-sm leading-snug text-muted">{s.detail}</span>
          </span>
        </m.li>
      ))}
    </ol>
  );
}
