import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
        // all of my code will be funneled through port 3001
        changeOrigin: true
      }
    }
  }
})
