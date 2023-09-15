import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  publicDir: 'public',
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: true, // opens the browser window automatically
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // segregate node_modules into their own chunks for better caching
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000, // increases the chunk size warning limit
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'axios', 'bootstrap', 'docx4js'],
  },
});
