import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path, { resolve } from 'node:path'

export default defineConfig({
  root: path.resolve(__dirname, './client'),
  // base: '/__karin_dev__/', // Removed to ensure paths match in standalone dev server
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'mock-virtual-modules',
      resolveId(id) {
        if (id === 'virtual:karin-templates') {
          return '\0virtual:karin-templates'
        }
      },
      load(id) {
        if (id === '\0virtual:karin-templates') {
          // 构建时提供一个空的模板列表，因为运行时会动态注入
          // 或者提供一个占位符
          return `export const templates = []`
        }
      }
    }
  ],
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
    manifest: true,
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, 'client/index.html'),
    //   },
    // },
  },
})
