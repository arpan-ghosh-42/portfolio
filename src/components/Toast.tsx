import { AnimatePresence, m } from 'framer-motion';

/** One polite live region for short confirmations ("Email copied"). */
export function Toast({ message }: { message: string | null }) {
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 top-20 z-[70] flex justify-center px-4">
      <AnimatePresence>
        {message && (
          <m.div
            key={message}
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-full border border-line-strong bg-elev px-4 py-2 font-mono text-sm text-fg shadow-card"
          >
            {message}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
