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
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),

        


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
          commonjsOptions: {
            include: [/@workspace\/ckeditor5-custom-build/, /node_modules/],
          }
      


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
      '@ckeditor/ckeditor5-react',
      '@ckeditor/ckeditor5-build-classic',  
      
    '@workspace/ckeditor5-custom-build'
    ],
    exclude: ['@babel/core'],
  },

 

});
