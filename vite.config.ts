// SPDX-License-Identifier: MIT

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Minimal Vite config for a static SPA. `build.target` matches the tsconfig `target` (ES2022)
// so the shipped bundle and the type-checked surface agree on the JS feature floor.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
  },
});
