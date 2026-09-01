// SPDX-License-Identifier: MIT

import { useEffect, useState } from 'react';

/** Fired after `navigate()` so any mounted `usePathname()` hook re-renders. `popstate` alone
 * does not fire on a same-document `pushState()` call — only on back/forward — so this is the
 * missing signal. */
const NAVIGATION_EVENT = 'rakomi-quickstart:navigation';

/** Push a new path via `pushState()` and notify every mounted `usePathname()` hook. */
export function navigate(path: string): void {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
}

/** The current `location.pathname`, reactive to `navigate()` calls and browser back/forward. */
export function usePathname(): string {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const onChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onChange);
    window.addEventListener(NAVIGATION_EVENT, onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener(NAVIGATION_EVENT, onChange);
    };
  }, []);

  return pathname;
}
