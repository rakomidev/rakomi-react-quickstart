<!-- SPDX-License-Identifier: MIT -->

# Rakomi React quickstart

A single-page app (Vite + React, no SSR) that signs a user in with **PKCE**, handles the
OAuth callback, and shows a protected `/dashboard` built on `@rakomi/react` alone — no
backend of your own required for auth.

Deploy to Vercel by importing this repository in the Vercel dashboard.

## What this quickstart demonstrates

1. **Sign-in** — a button that calls `useAuth().signIn({ mode: 'redirect' })`, which
   generates a PKCE code verifier/challenge, stores it, and navigates the browser to
   `GET /oauth/authorize`.
2. **Callback handling** — `<RakomiProvider>` detects the `code`/`state` query params on
   `/oauth/callback`, validates `state` (CSRF), and exchanges the code for tokens via
   `POST /oauth/token`. The app only has to wait for `useAuth().isLoaded` and route on the
   result — see `src/pages/Callback.tsx`.
3. **A protected view** — `/dashboard` reads the signed-in user straight from
   `useAuth().user` (decoded from the verified access token, no extra network round trip)
   and redirects to `/` the moment there is no session.
4. **Sign-out** — `useAuth().signOut()` clears the local session.

## Run it

```sh
npm install
cp .env.example .env.local   # set VITE_RAKOMI_CLIENT_ID
npm run dev
```

Open the printed local URL, click **Sign in**, and complete the sign-in flow. Your tenant's
OAuth client needs `http://localhost:5173/oauth/callback` (or your dev port) registered as a
redirect URI — `RakomiProvider` defaults `redirectUrl` to `${window.location.origin}/oauth/callback`.

## Troubleshooting

If an OAuth error interrupts sign-in against a real tenant, note the approximate timestamp and
the error code from the callback — every OAuth error response is recorded server-side with its
error code and a request identifier, which support can use to locate the exact request when
diagnosing an integration issue.

## Why no router library

`src/router.ts` is a ~30-line pathname router (browser `pushState`/`popstate`) instead of
a routing dependency — this quickstart has exactly three destinations (`/`, `/oauth/callback`,
`/dashboard`), and every extra dependency adds to the shipped bundle size.

## What this is NOT

Not a multi-page app, not server-rendered, and not a router tutorial — see the Next.js
quickstart for a server-actions + SSR shape of the same sign-in flow. This example only covers
PKCE sign-in — it does not demonstrate region residency, consent receipts, or EUDI wallet flows.
