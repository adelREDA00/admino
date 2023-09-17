import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
             target: 'https://api-blog-ten.vercel.app',
             changeOrigin: true,
             secure: false,      
             ws: true,
         }
    }
    },
  };
});