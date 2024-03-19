import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(), // This now includes fast refresh by default
    compression({
      algorithm: 'gzip', // Consider 'brotliCompress' for better compression if targeting modern browsers
      ext: '.gz', // Use '.br' if using Brotli
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
    minify: true, // Consider specifying the minification method, e.g., 'terser' or 'esbuild'
    sourcemap: false, // Toggle based on your need for source maps in production
  },
});
