import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';

export function RoleRotator({ roles, interval = 2600 }: { roles: readonly string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), interval);
    return () => clearInterval(id);
  }, [roles.length, interval]);

  return (
    <>
      <span className="sr-only">{roles.join(', ')}</span>
      {/* Every role sits in the same grid cell, so the widest one fixes the width and nothing jumps. */}
      <span aria-hidden className="inline-grid align-bottom">
        {roles.map((r) => (
          <span key={r} className="invisible pr-2 [grid-area:1/1]">
            {r}
          </span>
        ))}
        <span className="relative overflow-hidden [grid-area:1/1]">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={roles[i]}
              className="block text-accent"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {roles[i]}
              <span aria-hidden className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] bg-accent motion-safe:animate-[caret_1s_steps(1)_infinite]" />
            </m.span>
          </AnimatePresence>
        </span>
      </span>
    </>
  );
}
