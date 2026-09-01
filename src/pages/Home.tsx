// SPDX-License-Identifier: MIT

import { useEffect } from 'react';

import { useAuth } from '@rakomi/react';

import { navigate } from '../router.js';

/** `/` — sign-in entry point. Redirects to /dashboard once a session already exists. */
export function Home() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoaded && auth.isSignedIn) {
      navigate('/dashboard');
    }
  }, [auth.isLoaded, auth.isSignedIn]);

  return (
    <main>
      <h1>Rakomi React quickstart</h1>
      <p>Sign in with PKCE to reach the protected dashboard.</p>
      <button
        type="button"
        onClick={() => {
          // mode: 'redirect' is required — useAuth().signIn() defaults to email/password mode.
          void auth.signIn({ mode: 'redirect' });
        }}
      >
        Sign in
      </button>
    </main>
  );
}
