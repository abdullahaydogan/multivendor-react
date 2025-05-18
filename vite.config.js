import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Bu, frontend'deki tüm "/api" isteklerini backend API'ye yönlendirecek
      '/api': {
        target: 'https://localhost:7079', // Backend API URL
        changeOrigin: true, // CORS'u atlamak için gerekli
        secure: false, // Https kullanıyorsanız ve SSL sertifikası sorunları varsa
      },
    },
  },
})
