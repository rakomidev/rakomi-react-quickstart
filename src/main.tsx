// SPDX-License-Identifier: MIT

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RakomiProvider } from '@rakomi/react';

import { App } from './App.js';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      {/* clientId/baseUrl are read from VITE_RAKOMI_CLIENT_ID / VITE_RAKOMI_BASE_URL (see
          .env.example) when omitted — RakomiProvider auto-detects Vite's import.meta.env. */}
      <RakomiProvider>
        <App />
      </RakomiProvider>
    </StrictMode>,
  );
} else {
  // No error-boundary equivalent exists for a missing DOM node — this stays a plain
  // console.error.
  console.error('[rakomi-quickstart] #root element not found — check index.html');
}
