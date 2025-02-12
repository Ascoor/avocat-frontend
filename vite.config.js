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
    'import.meta.hot': false, // ✅ Prevents issues with dynamic imports
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true,
    historyApiFallback: true, // ✅ حل مشكلة 404 عند إعادة تحميل الصفحة
  },

  build: {
    rollupOptions: {
      output: {
        // ✅ Auto split vendor chunks
        manualChunks(id) {
          if (id.includes("node_modules/react")) return "react";
          if (id.includes("node_modules/lodash")) return "lodash";
          if (id.includes("node_modules/axios")) return "axios";
          if (id.includes("src/pages")) return "pages";
          if (id.includes("src/components")) return "components";
          return "misc";
        },
        
      },
    },
    chunkSizeWarningLimit: 500, // Adjust if needed
  
    outDir: '../public_html', // ✅ نقل ملفات الإنتاج مباشرة إلى public_html
    emptyOutDir: false, // ✅ حذف الملفات القديمة قبل كل بناء جديد
    minify: 'esbuild',
    sourcemap: false, // ⬅️ يفضل تعطيله في الإنتاج لتقليل حجم الملفات
   
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
