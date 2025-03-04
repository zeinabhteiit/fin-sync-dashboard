import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fin-sync.onrender.com',
        changeOrigin: true,
        secure: false,
      },  // Proxy API requests to the deployed backend
    }
  },
})
