import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@constants': path.resolve(__dirname, 'src/constants'),
    },
  },
  server: {
    host: true,
    proxy: {
      '/php-api': 'http://localhost:8000',
      '/node-api': 'http://localhost:3001'
    }
  }
})
