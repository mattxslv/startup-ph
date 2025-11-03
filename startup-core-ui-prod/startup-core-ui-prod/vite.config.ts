import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  server: {
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Disable chunking to avoid cache issues
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve('src/'),
      assets: path.resolve('src/assets'),
      components: path.resolve('src/components'),
      context: path.resolve('src/context'),
      ui: path.resolve('src/ui'),
      layouts: path.resolve('src/layouts'),
      utils: path.resolve('src/utils'),
      lib: path.resolve('src/lib'),
      hooks: path.resolve('src/hooks'),
      features: path.resolve('src/features'),
      pages: path.resolve('src/pages'),
      validations: path.resolve('src/validations'),
      types: path.resolve('src/types'),
    },
  },
});
