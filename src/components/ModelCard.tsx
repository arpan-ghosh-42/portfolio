import type { CSSProperties } from 'react';
import { modelCard, profile } from '../data/profile';
import { useShortcutLabel } from '../hooks/useShortcutLabel';
import { trackSpotlight } from '../lib/utils';

/** Keeps ranges like 2021–2025 on one line (word joiners around the dash). */
const WORD_JOINER = String.fromCharCode(0x2060);
const noBreakRanges = (text: string) => text.replace(/([0-9])–([0-9])/g, `$1${WORD_JOINER}–${WORD_JOINER}$2`);

/** A Hugging Face-style "model card" that sums Arpan up in one glance. */
export function ModelCard() {
  const shortcutLabel = useShortcutLabel();
  return (
    <aside
      aria-label="Profile at a glance"
      className="card spotlight rise overflow-hidden"
      style={{ '--d': '250ms' } as CSSProperties}
      onPointerMove={trackSpotlight}
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">#</span> model_card.md
        </p>
        {profile.status.open && (
          <p className="flex items-center gap-2 font-mono text-xs text-live">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-live motion-safe:animate-[ping-soft_1.8s_ease-out_infinite]" />
              <span className="relative size-2 rounded-full bg-live" />
            </span>
            accepting requests
          </p>
        )}
      </div>

      <dl className="divide-y divide-line/70 px-5 py-2 font-mono text-[0.8125rem]">
        {modelCard.map(({ key, value }, i) => (
          <div
            key={key}
            className="slide-in grid grid-cols-[6.5rem_1fr] gap-3 py-2.5 sm:grid-cols-[7.25rem_1fr]"
            style={{ '--d': `${600 + i * 70}ms` } as CSSProperties}
          >
            <dt className="text-subtle">{key}</dt>
            <dd className="text-fg">{noBreakRanges(value)}</dd>
          </div>
        ))}
      </dl>

      <p className="border-t border-line bg-surface/50 px-5 py-3 font-mono text-xs text-subtle">
        <span className="text-accent">→</span> press <kbd>{shortcutLabel}</kbd> to jump anywhere
      </p>
    </aside>
  );
}
