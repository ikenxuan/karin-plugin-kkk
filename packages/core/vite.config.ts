import fs from 'node:fs'
import { builtinModules } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, type Plugin } from 'vite'

// 在ES模块中模拟__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const entry: string[] = ['src/index.ts', 'src/root.ts', 'src/web.config.ts', 'src/export/template.ts']

const getFiles = (dir: string) => {
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith('.ts')) {
      entry.push(`${dir}/${file}`)
    }
  })
}

getFiles('src/apps')

/**
 * 递归复制目录
 * @param sourceDir 源目录路径
 * @param targetDir 目标目录路径
 */
const copyDirectory = (sourceDir: string, targetDir: string) => {
  if (!fs.existsSync(sourceDir)) {
    console.warn('⚠️ 源目录不存在:', sourceDir)
    return
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const files = fs.readdirSync(sourceDir)

  files.forEach(file => {
    const sourcePath = resolve(sourceDir, file)
    const targetPath = resolve(targetDir, file)

    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath)
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}

/**
 * 复制 template 静态资源的 Vite 插件
 * @description 在构建时将 template 包的静态资源复制到 core 包的 resources 目录
 */
const copyTemplateAssetsPlugin = (): Plugin => {
  return {
    name: 'copy-template-assets',
    writeBundle () {
      // 复制 template 包的静态资源
      const SourceDir = resolve(__dirname, '../template/public')
      const TargetDir = resolve(__dirname, 'resources')

      console.log('🔍 开始复制 template 静态资源...')
      console.log('📁 源目录:', SourceDir)
      console.log('📁 目标目录:', TargetDir)

      copyDirectory(SourceDir, TargetDir)
      console.log('✅ template 静态资源已复制到:', TargetDir)
    }
  }
}

export default defineConfig({
  define: {
    // 仅替换为全局引用，避免在 CJS 包裹函数内出现 import.meta
    __dirname: 'new URL(\'.\', import.meta.url).pathname',
    __filename: 'new URL(\'\', import.meta.url).pathname'
  },
  build: {
    target: 'node18',
    lib: {
      formats: ['es'],
      entry
    },
    emptyOutDir: true,
    outDir: 'lib',
    rolldownOptions: {
      platform: 'node',
      external: [
        ...builtinModules,
        ...builtinModules.map((mod) => `node:${mod}`),
        ...['', '/express', '/root', '/lodash', '/yaml', '/axios', '/log4js', '/template', '/sqlite3'].map(p => `node-karin${p}`)
      ],
      output: {
        inlineDynamicImports: false,
        format: 'esm',
        manualChunks(id) {
          const p = id.replace(/\\/g, '/')
          // 任何 node_modules（含 pnpm 的 .pnpm）都强制进入 vendor
          if (p.includes('/node_modules/') || p.includes('/.pnpm/')) {
            return 'vendor'
          }
          // template 子包源码单独分包，避免并入 main
          if (p.includes('/packages/template/') || p.includes('/../template/')) {
            return 'template'
          }
          // 仅将实现代码放进 main
          if (p.includes('/src/platform/') || p.includes('/src/module/')) {
            return 'main'
          }
          // 其他实现代码放入 misc，避免因为单入口被折叠进 main
          return 'misc'
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'main') {
            return 'core_chunk/main-[hash].js'
          }
          if (chunkInfo.name === 'vendor') {
            return 'core_chunk/vendor-[hash].js'
          }
          if (chunkInfo.name === 'template') {
            return 'core_chunk/template-[hash].js'
          }
          if (chunkInfo.name === 'misc') {
            return 'core_chunk/misc-[hash].js'
          }
          return 'core_chunk/[name].js'
        },
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index' || chunkInfo.name === 'root') {
            return `${chunkInfo.name}.js`
          }
          if (chunkInfo.facadeModuleId?.replace(/\\/g, '/').includes('src/apps')) {
            return `apps/${chunkInfo.name}.js`
          }
          return `core_chunk/${chunkInfo.name}.js`
        }
      }
    },
    minify: false,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      defaultIsModuleExports: true
    }
  },
  resolve: {
    conditions: ['node'],
    alias: {
      '@': resolve(__dirname, './src'),
      template: resolve(__dirname, '../template/src/client.ts')
    }
  },
  plugins: [
    react(),
    tailwindcss(),
    copyTemplateAssetsPlugin()
  ]
})