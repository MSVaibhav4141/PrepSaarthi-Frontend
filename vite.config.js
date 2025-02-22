import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5050,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        ws: true,
      },
    },
    watch: {
      usePolling: true, // Disable polling unless necessary
    },
  },
});
