import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';


export default defineConfig(({ command }) => ({
  plugins: [react(), command === 'serve' && mkcert()].filter(Boolean),
  server: { port: 3000 },
}));