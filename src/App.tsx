// SPDX-License-Identifier: MIT

import { useAuth } from '@rakomi/react';

import { Callback } from './pages/Callback.js';
import { Dashboard } from './pages/Dashboard.js';
import { Home } from './pages/Home.js';
import { usePathname } from './router.js';

export function App() {
  const pathname = usePathname();
  const auth = useAuth();

  // isLoaded is false while RakomiProvider restores a session from storage, or exchanges an
  // /oauth/callback code for tokens — both are async. Every page below reads a settled auth
  // state.
  if (!auth.isLoaded) {
    return <p>Loading…</p>;
  }

  if (pathname === '/oauth/callback') {
    return <Callback />;
  }
  if (pathname === '/dashboard') {
    return <Dashboard />;
  }
  return <Home />;
}
