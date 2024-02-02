import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(), // Apply Node.js polyfills
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for src directory
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000, // Development server configuration
  },
  build: {
    outDir: 'dist', // Output directory for production build
    
  chunkSizeWarningLimit: 1000, 
  },
  optimizeDeps: {
    include: [
      // List of dependencies for pre-bundling
    
      'react',
      'react-dom',
      'react-router-dom',
      '@ckeditor/ckeditor5-build-decoupled-document',
      '@ckeditor/ckeditor5-react',
      '@fullcalendar/core',
      '@fullcalendar/daygrid',
      '@fullcalendar/interaction',
      '@fullcalendar/react',
      '@fullcalendar/timegrid',
      '@popperjs/core',
      '@react-spring/web',
      'animejs',
      'axios',
      'bootstrap',
      'boxicons',
      'date-fns',
      'docx',
      'docxtemplater',
      'file-saver',
      'mammoth',
      'moment',
      'path-browserify',
      'pizzip',
      'react-big-calendar',
      'react-bootstrap',
      'react-datepicker',
      'react-draft-wysiwyg',
      'react-icons',
      'react-loader-spinner',
      'react-toastify',
      'scrollreveal', ],
  },
});
