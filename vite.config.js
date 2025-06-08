import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // this is optional but safe
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: '/index.html',
    },
  },
});
