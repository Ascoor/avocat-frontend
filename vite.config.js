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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Add other aliases as needed
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: true,
    cors: true,
    strictPort: true,
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
      output: {
        chunkSizeWarningLimit: 500,
        manualChunks: {
          vendor: ['react', 'react-dom'], // Include other libraries as needed
        },
      },
    },
  },
  optimizeDeps: {
    // Include necessary dependencies for pre-bundling
  },
});
