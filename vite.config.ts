import fs from 'node:fs'
import dts from 'vite-plugin-dts'
import { defineConfig, type Plugin } from 'vite'
import { builtinModules } from 'node:module'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// 在ES模块中模拟__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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


function injectDirnamePlugin (): Plugin {
  return {
    name: 'inject-dirname',
    renderChunk (code: string) {
      // 检查代码中是否使用了__dirname或__filename
      if (code.includes('__dirname') || code.includes('__filename')) {
        // 在文件顶部添加必要的导入和变量定义
        const injection = `
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
`
        return injection + code
      }
      return code
    }
  }
}

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
        'sequelize',
        'sqlite3'
      ],
      output: {
        inlineDynamicImports: false,
        format: 'esm',
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index' ||
            chunkInfo.name === 'web.config' ||
            chunkInfo.name === 'Version') {
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
      defaultIsModuleExports: true,   // 处理 module.exports
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    // dts({ rollupTypes: true }) // 生成类型声明文件
    injectDirnamePlugin()
  ]
})
