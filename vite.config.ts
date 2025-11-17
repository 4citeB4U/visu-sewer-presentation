/* LEEWAY HEADER
TAG: BUILD.CONFIG.VITE
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: settings
ICON_SIG: CD534113
5WH: WHAT=Vite bundler configuration;
WHY=Configure React plugin and dev server for <200KB bundle target;
WHO=LeeWay Industries + VisuSewer;
WHERE=b:\Visu-Sewer Strategic Asset & Growth Deck\vite.config.ts;
WHEN=2025-11-08;
HOW=Vite 6.x with React 19 plugin
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const desiredPort = Number(env.VITE_PORT || 5173);
      return {
        // Use the repo name as base for GitHub Pages deployment
        base: '/visu-sewer-presentation/',
        server: {
          port: desiredPort,
          host: '0.0.0.0',
          strictPort: true,
          // Explicit HMR client settings so dev client connects to the same port
          hmr: {
            protocol: 'ws',
            host: 'localhost',
            port: desiredPort,
          }
        },
        // Output to the `docs` directory so the repository can be published to GitHub Pages
        build: {
          outDir: 'docs',
          emptyOutDir: true,
        },
        plugins: [react()],
        define: {
          'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
          'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, '.'),
          }
        }
      };
});
