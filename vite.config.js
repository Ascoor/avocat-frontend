import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  define: {
    'process.env': {},
    __APP_ENV__: process.env.APP_ENV,
  },
  server: {
    host: '0.0.0.0', // Accessible over the network
    port: 3000,      // Dev server on port 3000
    open: true,      // Auto-open browser
    cors: true,      // Allow API requests across origins
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
