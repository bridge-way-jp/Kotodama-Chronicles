import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 2500, assetsDir: 'bundle' },
  test: { environment: 'node' },
} as any);
