import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// Only prefix asset paths when building for the standalone GitHub Pages
// deploy; a plain `vite build` (used locally / by other consumers) stays at '/'.
const base = process.env.GH_PAGES === 'true' ? '/leoday-host-shell/' : '/';

// remoteEntry.js keeps a fixed filename across remote deploys, so browsers/CDNs
// happily cache it and a plain page refresh can keep serving a stale entry even
// after the remote redeploys. Appending a cache-busting query param forces a
// fresh network fetch of the entry on every load, while its exposed chunks
// (which are content-hashed) stay cacheable as normal.
const cacheBustedRemote = (url: string) => ({
  external: `Promise.resolve('${url}?t=' + Date.now())`,
  externalType: 'promise' as const,
});

export default defineConfig({
  base,
  plugins: [
    react(),
    federation({
      name: 'host_shell',
      remotes: {
        remoteMood: cacheBustedRemote('https://olesiatk.github.io/leoday-remote-mood/assets/remoteEntry.js'),
        remoteDayToday: cacheBustedRemote('https://olesiatk.github.io/leoday-remote-daytoday/assets/remoteEntry.js'),
        remoteTeam: cacheBustedRemote('https://olesiatk.github.io/leoday-remote-team/assets/remoteEntry.js'),
        remoteAgenda: cacheBustedRemote('https://olesiatk.github.io/leoday-remote-agenda/assets/remoteEntry.js'),
        remoteGame1: cacheBustedRemote('http://localhost:3007//assets/remoteEntry.js'),
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
