import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    // React plugin
    react(),
    // Compression plugin for Brotli and gzip
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024, // Compress files larger than 1KB
      deleteOriginFile: false,
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  define: {
    'process.env': {},
    __APP_ENV__: process.env.APP_ENV,
  },
  server: {
    host: '0.0.0.0', // Accessible on the local network
    port: 3000, // Dev server port
    open: true, // Automatically opens the browser
    cors: true, // Enable CORS for API requests
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild', // Faster minification with esbuild
    sourcemap: true, // Generate source maps for debugging
    rollupOptions: {
      output: {
        manualChunks: {
          // Splitting vendor and app code for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@fullcalendar/core'], // Exclude heavy dependencies for faster initial load
  },
});
