import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { codeInspectorPlugin } from 'code-inspector-plugin'

// https://vite.dev/config/
export default defineConfig({
  base: '/kkk/',
  plugins: [
    react(),
    tailwindcss(),
    codeInspectorPlugin({
      bundler: 'vite',
      showSwitch: true,
      hotKeys: ['shiftKey', 'altKey']
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    port: 5176,
    proxy: {
      '/api/kkk': {
        target: 'http://localhost:7777',
        changeOrigin: true,
      },
      '/api/v1': {
        target: 'http://localhost:7777',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: '../core/lib/web',
    emptyOutDir: true,
  }
})
