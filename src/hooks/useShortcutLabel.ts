import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getLabel = () => (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? '⌘K' : 'Ctrl K');

/** "⌘K" on Apple devices, "Ctrl K" elsewhere. The prerendered HTML says "Ctrl K" until hydration. */
export function useShortcutLabel() {
  return useSyncExternalStore(subscribe, getLabel, () => 'Ctrl K');
}
