import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
},

  // Server configuration for development
  server: {
    host: true,
    port: 3000,
    open: true,
    cors: true,
  },

  // Alias and other resolve options
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Define other aliases here if necessary
      "documentServerUrl": "http://documentserver/"
        


    },
  },

  // CSS and styling options
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },

  // Build options for production
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'bootstrap', '@fullcalendar/core', 'axios', 'react-router-dom'],
          // Define other chunks or vendors as needed
          // draft.js and others
          


        },
      },
    },
    sourcemap: process.env.NODE_ENV !== 'production',
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'axios',
      'bootstrap',
      'react-router-dom',
      '@fullcalendar/core',
      // Include other dependencies that need pre-bundling
    ],
    exclude: ['@babel/core'],
  },

 

});
