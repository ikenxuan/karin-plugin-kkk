import fs from 'node:fs'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
import { builtinModules } from 'node:module'
import { resolve } from 'node:path'

const entry: string[] = ['src/index.ts', 'src/Version.ts', 'src/web.config.ts']

function getFiles (dir: string) {
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith('.ts')) {
      entry.push(`${dir}/${file}`)
    }
  })
}

getFiles('src/apps')
getFiles('src/cli')

export default defineConfig({
  build: {
    target: 'node18',
    lib: {
      formats: ['es'],
      entry,
    },
    emptyOutDir: true,
    outDir: 'lib',
    rollupOptions: {
      external: [
        ...builtinModules,
        ...builtinModules.map((mod) => `node:${mod}`),
        'node-karin',
        'playwright',
        'node-karin/express',
        'node-karin/root',
        'node-karin/lodash',
        'node-karin/yaml',
        'node-karin/axios',
        'node-karin/sqlite3',
        'sequelize',
      ],
      output: {
        inlineDynamicImports: false,
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index' || chunkInfo.name === 'web.config' || chunkInfo.name === 'Version') {
            return `${chunkInfo.name}.js`
          }

          if (chunkInfo.facadeModuleId?.includes('src/apps')) {
            return `apps/${chunkInfo.name}.js`
          }

          if (chunkInfo.facadeModuleId?.includes('src/cli')) {
            return `cli/${chunkInfo.name}.js`
          }

          return `chunk/${chunkInfo.name}.js`
        },
        chunkFileNames: 'chunk/[name]-[hash].js',
      },
      cache: false,
    },
    minify: false,
    commonjsOptions: {
      include: [
        /node_modules/,
      ],
      transformMixedEsModules: true,  // 处理混合模块
      defaultIsModuleExports: true    // 处理 module.exports
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    // dts({ rollupTypes: true }) // 生成类型声明文件
  ]
})
