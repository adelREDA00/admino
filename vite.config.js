import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      // Ensure that this path matches your deployment configuration
      outDir: 'build',
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          // Ensure this is the correct URL for your API
          target: 'https://api-blog-ten.vercel.app',
          changeOrigin: true,
          // Keep secure as true for SSL security
          secure: true,
          ws: true,
        },
      },
    },
  };
});
