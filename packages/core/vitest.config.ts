import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    // 与生产构建一致，测试当前安装（含本地 link）的 SDK，而不是固定指向另一份子模块源码。
    conditions: ['node', 'import', 'module'],
    alias: {
      '@': path.resolve(root, 'src')
    }
  },
  test: {
    include: ['test/**/*.test.ts']
  }
})
