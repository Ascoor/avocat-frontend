import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'brotliCompress', // Use Brotli for better compression, assuming modern browser support
      ext: '.br', // Extension for Brotli-compressed files
      // Additional options for the compression plugin can be specified here
    }),
  ],
  define: {
    // Placeholders for any global variables you'd like to define; often used for environment variables
    'process.env': process.env, // Directly passing environment variables (ensure to only expose what's necessary)
  },
  server: {
    // Development server configuration
    host: '0.0.0.0', // Allows your server to be accessible externally; use 'localhost' to restrict to local access only
    port: 3000, // Port on which your dev server runs
    // Uncomment and configure if you need to proxy requests during development
    // proxy: {
    //   '/api': {
    //     target: 'http://your-backend-api',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  
  build: {
    // Production build settings
    outDir: 'build', // Change if you prefer a different folder name for build outputs
    minify: 'terser', // 'terser' is recommended for its superior minification capabilities over the default 'esbuild'
    sourcemap: true, // Consider using source maps for production debugging; set to false for smaller builds
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Splitting vendor modules into their own chunk
          // Additional manual chunking strategies can be applied here
        },
      },
    },
    assetsDir: 'assets', // Organizes your assets in a specific folder within the build directory
    terserOptions: {
      compress: {
        // Terser-specific options for compression
        drop_console: true, // Drops all console statements in production
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Allows for cleaner import paths in your project
    },
  },
  // Additional Vite configuration options can go here
  // Examples include configuring CSS modules, JSON options, etc.
});
