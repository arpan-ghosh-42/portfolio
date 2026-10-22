import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { cn } from '../lib/utils';
import { SearchIcon } from './icons';

export interface Command {
  id: string;
  group: string;
  label: string;
  /** Extra words to match on. */
  keywords?: string;
  icon?: ReactNode;
  /** Right-aligned hint, e.g. "↗" for external links. */
  hint?: string;
  /** Only listed once the visitor starts typing (keeps the default list short). */
  searchOnly?: boolean;
  run: () => void;
}

/** 0 = no match; higher is better. Label hits beat keyword hits. */
function score(cmd: Command, query: string) {
  const q = query.trim().toLowerCase();
  const label = cmd.label.toLowerCase();
  const hay = `${cmd.group} ${label} ${cmd.keywords ?? ''}`.toLowerCase();
  if (!q.split(/\s+/).every((word) => hay.includes(word))) return 0;
  if (label === q) return 4;
  if (label.startsWith(q)) return 3;
  if (label.includes(q)) return 2;
  return 1;
}

/** Ranks matches, keeping each group together and ordering groups by their best hit. */
function search(commands: Command[], query: string) {
  const hits = commands.map((c) => ({ c, s: score(c, query) })).filter((h) => h.s > 0);
  const best = new Map<string, number>();
  const order = new Map<string, number>();
  for (const h of hits) {
    best.set(h.c.group, Math.max(best.get(h.c.group) ?? 0, h.s));
    if (!order.has(h.c.group)) order.set(h.c.group, order.size);
  }
  const g = (c: Command) => -best.get(c.group)! * 1000 + order.get(c.group)!;
  return hits.sort((a, b) => g(a.c) - g(b.c) || b.s - a.s).map((h) => h.c);
}

interface PaletteProps {
  open: boolean;
  onClose: () => void;
  commands: Command[];
}

export function CommandPalette({ open, onClose, commands }: PaletteProps) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const listId = useId();

  const results = useMemo(
    () => (query.trim() ? search(commands, query) : commands.filter((c) => !c.searchOnly)),
    [commands, query],
  );

  // Reset, remember where focus was, and lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery('');
    setActive(0);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const runAt = (i: number) => {
    const cmd = results[i];
    if (!cmd) return;
    onClose();
    // Let the dialog unmount and focus return before navigating.
    requestAnimationFrame(() => cmd.run());
  };

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((a) => (a + 1) % Math.max(results.length, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((a) => (a - 1 + results.length) % Math.max(results.length, 1));
        break;
      case 'Home':
        e.preventDefault();
        setActive(0);
        break;
      case 'End':
        e.preventDefault();
        setActive(results.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        runAt(active);
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'Tab':
        // The input is the only tab stop inside the dialog.
        e.preventDefault();
        break;
    }
  };

  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center px-3 pt-[12vh] sm:px-4">
          <m.div
            className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-elev shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <SearchIcon className="shrink-0 text-subtle" />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, open a demo, filter by skill…"
                className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-subtle"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
                aria-autocomplete="list"
                aria-label="Search commands"
                spellCheck={false}
              />
              <kbd className="hidden sm:inline">Esc</kbd>
            </div>

            <ul ref={listRef} id={listId} role="listbox" aria-label="Commands" className="max-h-[min(60vh,26rem)] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-subtle">No matches. Try “demo”, “github” or a skill.</li>}
              {results.map((c, i) => {
                const header = c.group !== lastGroup ? c.group : null;
                lastGroup = c.group;
                return (
                  <li key={c.id} role="presentation">
                    {header && (
                      <p role="presentation" className="px-3 pt-3 pb-1.5 font-mono text-[0.7rem] tracking-wider text-subtle uppercase">
                        {header}
                      </p>
                    )}
                    <div
                      id={`${listId}-${c.id}`}
                      role="option"
                      aria-selected={i === active}
                      data-index={i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => runAt(i)}
                      className={cn(
                        'flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-sm',
                        i === active ? 'bg-accent-soft text-fg' : 'text-muted',
                      )}
                    >
                      <span className={cn('shrink-0', i === active ? 'text-accent' : 'text-subtle')}>{c.icon}</span>
                      <span className="flex-1 truncate">{c.label}</span>
                      {c.hint && <span className="font-mono text-xs text-subtle">{c.hint}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.7rem] text-subtle">
              <span>
                <kbd>↑</kbd> <kbd>↓</kbd> navigate
              </span>
              <span>
                <kbd>↵</kbd> open
              </span>
              <span className="ml-auto">{results.length} results</span>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
