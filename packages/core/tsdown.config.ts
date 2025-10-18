import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    './src/index.ts',
    './src/root.ts',
    './src/web.config.ts',
    './src/export/template.ts',
    './src/apps/*.ts'
  ],
  dts: true,
  format: ['esm'],
  target: 'node18',
  platform: 'node',
  sourcemap: false,
  outDir: 'lib',
  clean: true,
  treeshake: true,
  shims: true,
  outputOptions: (options) => {
    return {
      ...options,
      chunkFileNames: (chunkInfo) => {
        const moduleIds = chunkInfo.moduleIds || []        
        for (const id of moduleIds) {
          if (id.includes('root.ts')) {
            return '[name]-[hash].js' // 关于root.ts 因为使用了import.meta.url 所有必须让其处于顶层
          }
        }
        return 'chunks/[name]-[hash].js'
      }
    }
  },
  external: [/^node-karin/]
})