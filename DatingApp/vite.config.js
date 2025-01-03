import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5173, // Default Vite port or choose an available port
  },
  plugins: [react()],
});
