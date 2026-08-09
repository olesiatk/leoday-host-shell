import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// Only prefix asset paths when building for the standalone GitHub Pages
// deploy; a plain `vite build` (used locally / by other consumers) stays at '/'.
const base = process.env.GH_PAGES === 'true' ? '/leoday-host-shell/' : '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    federation({
      name: 'host_shell',
      remotes: {
        remoteMood: `https://olesiatk.github.io/leoday-remote-mood/assets/remoteEntry.js`,
        remoteDayToday: `https://olesiatk.github.io/leoday-remote-daytoday/assets/remoteEntry.js`,
        remoteTeam: `https://olesiatk.github.io/leoday-remote-team/assets/remoteEntry.js`,
        remoteAgenda: `https://olesiatk.github.io/leoday-remote-agenda/assets/remoteEntry.js`,
        remoteGame1: `https://olesiatk.github.io/leoday-remote-game1/assets/remoteEntry.js`,
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: { host: true, port: 3000, strictPort: true },
  preview: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  build: { modulePreload: false, target: 'esnext', minify: false, cssCodeSplit: false },
});
