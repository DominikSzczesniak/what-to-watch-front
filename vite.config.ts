// https://vite.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://java-application-latest-d43f.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})