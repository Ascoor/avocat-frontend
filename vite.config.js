import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  css: {
    modules: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the limit as per your preference
  },

  // Optimize dependencies for faster development
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'axios',
      'bootstrap'
    ],
  },
});
