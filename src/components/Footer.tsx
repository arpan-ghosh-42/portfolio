import { footer } from '../data/site';
import { profile } from '../data/profile';
import { useShortcutLabel } from '../hooks/useShortcutLabel';

export function Footer() {
  const shortcutLabel = useShortcutLabel();
  const [before, after] = footer.hint.split('{shortcut}');
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p suppressHydrationWarning>
          © {new Date().getFullYear()} {profile.name}. {footer.note}
        </p>
        <p className="font-mono text-xs">
          {before}
          {after !== undefined && (
            <>
              <kbd>{shortcutLabel}</kbd>
              {after}
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
