import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    base: "/",
    preview: {
      port: 8080,
      strictPort: true,
    },
    server: {
      port: 8080,
      strictPort: true,
      host: true,
      origin: "http://0.0.0.0:8080",
    },
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
    },
    define: {
      'process.env': env
    }
  }
})
