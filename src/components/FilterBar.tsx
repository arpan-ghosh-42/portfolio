import { AnimatePresence, m } from 'framer-motion';
import { projects } from '../data/projects';
import { scrollToId } from '../lib/utils';
import { ArrowDownIcon, CloseIcon } from './icons';

/** Floating status for the skills → projects filter, visible wherever you are on the page. */
export function FilterBar({ skill, onClear }: { skill: string | null; onClear: () => void }) {
  const matches = skill ? projects.filter((p) => p.skills.includes(skill)) : [];

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <AnimatePresence>
        {skill && (
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="pointer-events-auto flex max-w-full items-center gap-2 rounded-full border border-line-strong bg-elev/95 py-1.5 pr-1.5 pl-4 text-sm shadow-card backdrop-blur"
          >
            <p className="min-w-0 truncate">
              <span className="font-semibold text-accent">{skill}</span>
              <span className="text-muted">
                {matches.length
                  ? ` · ${matches.length} project${matches.length > 1 ? 's' : ''}`
                  : ' · not in a featured project yet'}
              </span>
            </p>
            {matches.length > 0 && (
              <button type="button" onClick={() => scrollToId('projects')} className="btn-primary btn-sm shrink-0">
                View <ArrowDownIcon width={14} height={14} />
              </button>
            )}
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear skill filter"
              className="grid size-9 shrink-0 place-items-center rounded-full text-muted hover:bg-surface hover:text-fg"
            >
              <CloseIcon width={16} height={16} />
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
