import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// Host used to reach the remote MFEs during dev. Defaults to localhost;
// override with REMOTE_HOST=<lan-ip> when testing from another device on the network.
const remoteHost = process.env.REMOTE_HOST || 'localhost';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host_shell',
      remotes: {
        remoteMood: `http://${remoteHost}:3001/assets/remoteEntry.js`,
        remoteDayToday: `http://${remoteHost}:3002/assets/remoteEntry.js`,
        remoteTeam: `http://${remoteHost}:3003/assets/remoteEntry.js`,
        remoteAgenda: `http://${remoteHost}:3004/assets/remoteEntry.js`,
        remoteGame1: `http://${remoteHost}:3006/assets/remoteEntry.js`,
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: { host: true, port: 3000, strictPort: true },
  preview: {
    host: true,
    port: 3000,
    strictPort: true
  },
  build: { modulePreload: false, target: 'esnext', minify: false, cssCodeSplit: false },
});