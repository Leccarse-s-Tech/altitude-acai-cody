import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function spa404FallbackPlugin() {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      const indexHtml = resolve(distDir, 'index.html');
      const notFoundHtml = resolve(distDir, '404.html');
      const noJekyll = resolve(distDir, '.nojekyll');
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, notFoundHtml);
        writeFileSync(noJekyll, '');
      }
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss(), spa404FallbackPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
