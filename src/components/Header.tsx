import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { sections } from '../data/site';
import { useActiveSection } from '../hooks/useActiveSection';
import { useShortcutLabel } from '../hooks/useShortcutLabel';
import { cn, scrollToId } from '../lib/utils';
import { MenuIcon, MoonIcon, SearchIcon, SunIcon } from './icons';

const ids = sections.map((s) => s.id);

interface HeaderProps {
  onToggleTheme: () => void;
  onOpenPalette: () => void;
}

export function Header({ onToggleTheme, onOpenPalette }: HeaderProps) {
  const active = useActiveSection(ids);
  const shortcutLabel = useShortcutLabel();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300',
        scrolled ? 'border-b border-line bg-bg/80 backdrop-blur-lg' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <a href="#top" onClick={(e) => (e.preventDefault(), scrollToId('top'))} className="group flex items-center gap-2.5 rounded-lg">
          <span aria-hidden className="grid size-9 place-items-center rounded-lg border border-accent/50 bg-accent-soft font-mono text-sm font-medium text-accent transition-transform group-hover:-rotate-6">
            {profile.initials}
          </span>
          <span className="hidden font-mono text-sm text-muted xs:inline">
            {profile.name.toLowerCase().replace(' ', '.')}
          </span>
          <span className="sr-only">{profile.name}, back to top</span>
        </a>

        <nav aria-label="Sections" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => (e.preventDefault(), scrollToId(s.id))}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-3 py-2 text-sm transition-colors hover:text-fg',
                    active === s.id ? 'text-fg' : 'text-muted',
                  )}
                >
                  {s.label}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300',
                      active === s.id ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 xl:ml-4">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden h-9 items-center gap-2 rounded-full border border-line bg-elev pr-1.5 pl-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg sm:flex"
            aria-haspopup="dialog"
            aria-keyshortcuts="Control+K Meta+K"
          >
            <SearchIcon width={15} height={15} />
            Jump to
            <kbd>{shortcutLabel}</kbd>
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
            aria-label="Toggle dark theme"
          >
            {/* Icons swap via CSS so the server-rendered markup matches either theme. */}
            <SunIcon className="hidden dark:block" />
            <MoonIcon className="dark:hidden" />
          </button>
          <button
            type="button"
            onClick={onOpenPalette}
            className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg sm:hidden"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
