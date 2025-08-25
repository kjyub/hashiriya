import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@utils': path.resolve(__dirname, '../../packages/utils/src'),
    },
    // dedupe: ['react', 'react-dom'],
  },
  server: {
    fs: { allow: ['..', '../../packages/ui', '../../packages/utils', '../../packages/ui/src'] },
  },
});
