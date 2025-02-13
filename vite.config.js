import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  define: {
    'process.env': {},
    __APP_ENV__: process.env.APP_ENV,
    'import.meta.hot': false,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true,
    historyApiFallback: true,
    hmr: true,  // Enable HMR in development
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react")) return "react";
          if (id.includes("node_modules/lodash")) return "lodash";
          if (id.includes("node_modules/axios")) return "axios";
          if (id.includes("src/pages")) return "pages";
          if (id.includes("src/components")) return "components";
          return "misc";
        },
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash][extname]',
      },
    },
    chunkSizeWarningLimit: 1000,
    outDir: '../public_html',
    emptyOutDir: false,
    minify: 'esbuild',
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tailwindConfig': path.resolve(__dirname, './tailwind.config.js'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@fullcalendar/core'],
  },
});
