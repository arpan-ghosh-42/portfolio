import { useCallback, useEffect } from 'react';

type Theme = 'light' | 'dark';

const media = () => matchMedia('(prefers-color-scheme: dark)');
const root = () => document.documentElement;

function readSaved(): Theme | null {
  try {
    const v = localStorage.getItem('theme');
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

/**
 * Follows the OS theme until the visitor picks one; the pick is remembered.
 * The initial class is set by an inline script in index.html before first paint,
 * so this hook only reacts to OS changes and the toggle. The `dark` class on
 * <html> is the single source of truth, which keeps prerendered markup stable.
 */
export function useTheme() {
  useEffect(() => {
    const mq = media();
    const onChange = () => {
      if (!readSaved()) root().classList.toggle('dark', mq.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = root().classList.contains('dark') ? 'light' : 'dark';
    root().classList.toggle('dark', next === 'dark');
    try {
      // Picking the same theme as the OS clears the override, so OS changes apply again.
      if ((next === 'dark') === media().matches) localStorage.removeItem('theme');
      else localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable: theme still changes for this visit */
    }
  }, []);

  return { toggle };
}
