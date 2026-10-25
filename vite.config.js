import { defineConfig } from 'vite';
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  server: { allowedHosts: ['merit-nelson-dam-economies.trycloudflare.com', 'sue-unprocessed-morton.ngrok-free.dev', 'vice-cotton-did-anyone.trycloudflare.com'] },
});
