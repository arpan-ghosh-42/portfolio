import { useEffect } from 'react';

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

/** Calls `onMatch` when the visitor types `sequence` outside any text field. */
export function useKeySequence(sequence: string, onMatch: () => void) {
  useEffect(() => {
    let buffer = '';
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target) || e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-sequence.length);
      if (buffer === sequence) {
        buffer = '';
        onMatch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sequence, onMatch]);
}
