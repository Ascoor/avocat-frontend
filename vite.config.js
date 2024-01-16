import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, 
      gzipSize: true, 
      brotliSize: true, 
      filename: 'bundle-visualizer-report.html'
    }),
    compression({ 
      algorithm: 'brotliCompress', 
      ext: '.br' 
    }),
  ],
  define: {
    'process.env': {},
    global: 'window',
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: true,
    cors: true,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      'path': 'path-browserify',
      'util': 'util',
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    rollupOptions: {
      external: ['path', 'util'],
      output: {
        chunkSizeWarningLimit: 500,
        manualChunks: {
          vendor: ['react', 'react-dom', 'bootstrap', '@fullcalendar/core', 'axios', 'react-router-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'axios',
      'bootstrap',
      'react-router-dom',
      '@fullcalendar/core',
      '@ckeditor/ckeditor5-react',
      '@ckeditor/ckeditor5-build-decoupled-document',
    ],
    exclude: ['@babel/core'],
  },
});
