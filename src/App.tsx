import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import { buildCommands } from './commands';
import { About } from './components/About';
import { CommandPalette } from './components/CommandPalette';
import { Contact, copyText } from './components/Contact';
import { Education } from './components/Education';
import { FilterBar } from './components/FilterBar';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveDemos } from './components/LiveDemos';
import { Projects } from './components/Projects';
import { ScrollProgress } from './components/ScrollProgress';
import { Skills } from './components/Skills';
import { Toast } from './components/Toast';
import { profile } from './data/profile';
import { useKeySequence } from './hooks/useKeySequence';
import { useTheme } from './hooks/useTheme';
import { scrollToId } from './lib/utils';

const NeuralBackground = lazy(() => import('./components/NeuralBackground'));

export default function App() {
  const { toggle: toggleTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [skill, setSkill] = useState<string | null>(null);
  const [neural, setNeural] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const neuralRef = useRef(false);
  const toggleNeural = useCallback(() => {
    const on = !neuralRef.current;
    neuralRef.current = on;
    setNeural(on);
    notify(on ? 'Neural mode: on. Type “ml” again to switch off' : 'Neural mode: off');
  }, [notify]);
  useKeySequence('ml', toggleNeural);

  const onCopied = useCallback(
    (ok: boolean) => notify(ok ? `Copied ${profile.email}` : 'Could not copy. Select the address instead.'),
    [notify],
  );

  // Land correctly on a shared link like /#projects (sections render lazily, see scrollToId).
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id && document.getElementById(id)) scrollToId(id, true);
  }, []);

  // Ctrl/⌘K toggles the palette from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const commands = useMemo(
    () =>
      buildCommands({
        toggleTheme,
        toggleNeural,
        copyEmail: async () => onCopied(await copyText(profile.email)),
        filterBySkill: (s) => {
          setSkill(s);
          scrollToId('projects');
        },
      }),
    [toggleTheme, toggleNeural, onCopied],
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[90] -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-fg focus:translate-y-0"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header onToggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />

        {neural && (
          <Suspense fallback={null}>
            <NeuralBackground />
          </Suspense>
        )}

        <main id="main" className="relative z-10">
          <Hero />
          <LiveDemos />
          <About />
          <Skills active={skill} onSelect={setSkill} />
          <Projects activeSkill={skill} />
          <Education />
          <Contact onCopied={onCopied} />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>

        <FilterBar skill={skill} onClear={() => setSkill(null)} />
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} />
        <Toast message={toast} />
      </MotionConfig>
    </LazyMotion>
  );
}
