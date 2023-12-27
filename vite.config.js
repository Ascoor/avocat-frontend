import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Define server options
  server: {
    host: true,
    port: 3000,
    open: true, // automatically open the browser
    cors: true, // enable CORS
  },

  // Resolve aliases for directories
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Add other aliases here
    },
  },

  // CSS configuration
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        // SCSS global styles (variables, mixins, etc.)
        additionalData: '@import \'@/styles/variables.scss\';',
      },
    },
  },

  // Build specific configurations
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        // Control chunking and asset output
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // other chunks
        },
      },
    },
    sourcemap: true, // enable source maps
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'axios', 'bootstrap', 'react-router-dom'],
    // exclude specific packages
  },
});
