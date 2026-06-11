import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/kkk/assets/',
  plugins: [
    react(),
    tailwindcss(),
    codeInspectorPlugin({
      bundler: 'vite',
      showSwitch: true,
      hotKeys: ['shiftKey', 'altKey']
    })
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
      '/kkk/v1': {
        target: 'http://localhost:7777',
        changeOrigin: true
      },
      '/api/v1': {
        target: 'http://localhost:7777',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../core/lib/web',
    emptyOutDir: true
  }
})
