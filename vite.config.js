import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          // Add other libraries or modules that you want to manually chunk
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust as needed
  },
});

