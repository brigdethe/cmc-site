import { defineConfig } from 'vite';
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  server: { allowedHosts: ['sue-unprocessed-morton.ngrok-free.dev'] },
});
