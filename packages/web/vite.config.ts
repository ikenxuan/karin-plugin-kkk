import path from "node:path"

import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/kkk/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: '../core/lib/web_chunk',
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 最小化混淆
    minify: 'esbuild',
    // 设置chunk大小警告阈值
    chunkSizeWarningLimit: 1000,
    // sourcemap: true,
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7777',
        changeOrigin: true,
      },
    },
  },
})
