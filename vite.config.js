import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // تغييره إلى مسار مشروعك الفعلي
    },
  },
  server: {
    host: '127.0.0.1',
    network: 'host',
    port: 3000, // تغييره حسب احتياجاتك
  },
  build: {
    outDir: 'dist', // تغييره حسب احتياجاتك
  },
  optimizeDeps: {
    include: [
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
      'scrollreveal',
    ],
  },
});
