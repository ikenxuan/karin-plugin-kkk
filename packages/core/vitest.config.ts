import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      // 与 tsconfig 的 paths 保持一致：amagi 以源码形式被引用，其内部用的是 amagi/* 自别名
      '@ikenxuan/amagi': path.resolve(root, '../../../amagi/packages/core/src/index.ts'),
      amagi: path.resolve(root, '../../../amagi/packages/core/src'),
      '@': path.resolve(root, 'src')
    }
  },
  test: {
    include: ['test/**/*.test.ts']
  }
})
