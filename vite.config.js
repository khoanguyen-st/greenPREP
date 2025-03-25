import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve('./src'),
      '@app': path.resolve('./src/app'),
      '@features': path.resolve('./src/features'),
      '@shared': path.resolve('./src/shared'),
      '@pages': path.resolve('./src/pages'),
      '@assets': path.resolve('./src/assets')
    }
  }
})
