// SPDX-License-Identifier: MIT

import { useEffect } from 'react';

import { useAuth } from '@rakomi/react';

import { navigate } from '../router.js';

/**
 * `/oauth/callback` — the redirect target the SDK sends the browser back to after the hosted
 * login form (the `authorization_endpoint` resolved via OIDC discovery). RakomiProvider does
 * the code exchange (`POST /oauth/token`) itself on mount; this page only has to wait for
 * `isLoaded` and route on the outcome.
 */
export function Callback() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoaded) return;
    navigate(auth.isSignedIn ? '/dashboard' : '/');
  }, [auth.isLoaded, auth.isSignedIn]);

  return <p>Signing you in…</p>;
}
