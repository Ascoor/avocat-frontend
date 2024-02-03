import reactRefresh from '@vitejs/plugin-react-refresh';
import compression from 'vite-plugin-compression';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [
    react(),
    reactRefresh(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  define: {
    'process.env': {}
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: false,
  },
});
