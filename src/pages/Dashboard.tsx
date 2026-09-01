// SPDX-License-Identifier: MIT

import { useEffect } from 'react';

import { useAuth } from '@rakomi/react';

import { navigate } from '../router.js';

/** `/dashboard` — protected view. Redirects to `/` the moment there is no signed-in session. */
export function Dashboard() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoaded && !auth.isSignedIn) {
      navigate('/');
    }
  }, [auth.isLoaded, auth.isSignedIn]);

  if (!auth.isLoaded || !auth.isSignedIn) {
    return <p>Loading…</p>;
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Signed in as {auth.user.email}</p>
      <button
        type="button"
        onClick={() => {
          void auth.signOut().then(() => navigate('/'));
        }}
      >
        Sign out
      </button>
    </main>
  );
}
