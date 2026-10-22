import type { PointerEvent } from 'react';

export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');

/** Resolve a public/ path against Vite's base (needed for GitHub Pages sub-paths). */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '');

/** Feeds the cursor position to the .spotlight radial highlight. */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

/**
 * Scrolls a section to the top of the viewport. Off-screen sections use
 * `content-visibility: auto`, so their real heights are only known once they
 * render mid-scroll; after each scroll ends we check the landing spot and
 * correct it if the target moved.
 */
export function scrollToId(id: string, instant = false) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = instant || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth';
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const maxScroll = () => document.documentElement.scrollHeight - innerHeight;
  const landed = () => Math.abs(el.getBoundingClientRect().top - offset) < 4 || scrollY >= maxScroll() - 2;

  const go = (triesLeft: number) => {
    if (landed()) return;
    el.scrollIntoView({ behavior, block: 'start' });
    if (triesLeft === 0) return;
    let timer = 0;
    const check = () => {
      removeEventListener('scrollend', check);
      clearTimeout(timer);
      go(triesLeft - 1);
    };
    addEventListener('scrollend', check, { once: true });
    timer = window.setTimeout(check, behavior === 'smooth' ? 1500 : 100);
  };
  go(3);
  // Move focus for keyboard and screen-reader users without a second jump.
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  history.replaceState(null, '', `#${id}`);
}
