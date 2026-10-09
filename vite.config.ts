import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

/** writes dist/precache.json: every built file, used by public/sw.js for offline play */
function precacheList() {
  return {
    name: 'precache-list',
    apply: 'build' as const,
    closeBundle() {
      const root = 'dist';
      const files: string[] = [];
      const walk = (dir: string) => {
        for (const f of readdirSync(dir)) {
          const p = join(dir, f);
          if (statSync(p).isDirectory()) walk(p);
          else files.push(relative(root, p).split('\\').join('/'));
        }
      };
      walk(root);
      const list = files.filter((f) => f !== 'sw.js' && f !== 'precache.json');
      writeFileSync(join(root, 'precache.json'), JSON.stringify({ version: Date.now().toString(36), files: list }));
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), precacheList()],
  build: { chunkSizeWarningLimit: 2500, assetsDir: 'bundle' },
  test: { environment: 'node' },
} as any);
