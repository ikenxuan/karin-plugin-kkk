import fs, { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { builtinModules } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// 在ES模块中模拟__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const entry: string[] = ['src/index.ts', 'src/root.ts', 'src/export/template.ts']

const getFiles = (dir: string) => {
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith('.ts')) {
      entry.push(`${dir}/${file}`)
    }
  })
}

getFiles('src/apps')

/**
 * 注入 __dirname 和 __filename 变量的 Vite 插件
 * 用于在 ESM 环境中模拟 CommonJS 的这两个全局变量
 */
const injectDirnamePlugin = (): Plugin => {
  return {
    name: 'inject-dirname',
    renderChunk: (code: string) => {
      // 检查代码中是否使用了__dirname或__filename
      if (code.includes('__dirname') || code.includes('__filename')) {
        // 在文件顶部添加必要的导入和变量定义
        const injection = `
const __filename = import.meta.url ? new URL(import.meta.url).pathname : '';
const __dirname = import.meta.url ? new URL('.', import.meta.url).pathname : '';
`
        return injection + code
      }
      return code
    }
  }
}

/**
 * 创建输出目录 web.config.js 的 Vite 插件
 * @description 该插件会在构建完成后:
 * 1. 查找包含 web.config 的主 chunk 文件
 * 2. 从主 chunk 中提取 webConfig 的导出别名
 * 3. 在 lib 目录下创建 web.config.js 文件
 * 4. 重新导出 webConfig 为默认导出
 */
const createWebConfigPlugin = (): Plugin => {
  return {
    name: 'create-web-config',
    writeBundle: (options, bundle) => {
      // 查找包含 web.config 的 main chunk
      const mainChunkFile = Object.keys(bundle).find(fileName => {
        return fileName.startsWith('core_chunk/main-') && fileName.endsWith('.js')
      })

      if (mainChunkFile) {
        // 读取 main chunk 文件内容
        const mainChunkPath = resolve(__dirname, 'lib', mainChunkFile)
        const mainChunkContent = readFileSync(mainChunkPath, 'utf-8')

        // 使用正则表达式查找 webConfig 的导出别名
        const webConfigExportMatch = mainChunkContent.match(/webConfig as (\w+)/)
        const webConfigAlias = webConfigExportMatch ? webConfigExportMatch[1] : 'webConfig'

        // 在 lib 目录中创建 web.config.js
        const webConfigContent = `export { ${webConfigAlias} as default } from './${mainChunkFile}';\n`
        const outputPath = resolve(__dirname, 'lib', 'web.config.js')
        writeFileSync(outputPath, webConfigContent)
        console.log(`✓ Created lib/web.config.js -> ./${mainChunkFile} (alias: ${webConfigAlias})`)
      } else {
        console.warn('⚠ Could not find main chunk file')
        // 列出所有可用的 chunk 文件以便调试
        console.log('Available chunks:', Object.keys(bundle).filter(f => f.endsWith('.js')))
      }
    }
  }
}

/**
 * 递归复制目录
 * @param sourceDir 源目录路径
 * @param targetDir 目标目录路径
 */
const copyDirectory = (sourceDir: string, targetDir: string) => {
  if (!existsSync(sourceDir)) {
    console.warn('⚠️ 源目录不存在:', sourceDir)
    return
  }

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true })
  }

  const files = readdirSync(sourceDir)

  files.forEach(file => {
    const sourcePath = resolve(sourceDir, file)
    const targetPath = resolve(targetDir, file)

    if (statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath)
    } else {
      copyFileSync(sourcePath, targetPath)
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
      const imageSourceDir = resolve(__dirname, '../template/public/image')
      const imageTargetDir = resolve(__dirname, 'resources/image')

      console.log('🔍 开始复制 template 静态资源...')
      console.log('📁 源目录:', imageSourceDir)
      console.log('📁 目标目录:', imageTargetDir)

      copyDirectory(imageSourceDir, imageTargetDir)
      console.log('✅ template 静态资源已复制到:', imageTargetDir)
    }
  }
}

export default defineConfig({
  build: {
    target: 'node22',
    lib: {
      formats: ['es'],
      entry
    },
    emptyOutDir: true,
    outDir: 'lib',
    rollupOptions: {
      external: [
        ...builtinModules,
        ...builtinModules.map((mod) => `node:${mod}`),
        ...['', '/express', '/root', '/lodash', '/yaml', '/axios', '/log4js', '/template', '/sqlite3'].map(p => `node-karin${p}`)
      ],
      output: {
        inlineDynamicImports: false,
        format: 'esm',
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index' || chunkInfo.name === 'root') {
            return `${chunkInfo.name}.js`
          }

          if (chunkInfo.facadeModuleId?.includes('src/apps')) {
            return `apps/${chunkInfo.name}.js`
          }

          return `core_chunk/${chunkInfo.name}.js`
        },

        chunkFileNames: 'core_chunk/[name]-[hash].js',

        manualChunks (id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('template')) {
            return 'template'
          }
          if (id.includes('src/root.ts')) {
            return 'root'
          }
          if (id.includes('src/module/db')) {
            return 'db'
          }
          if (id.includes('src/web.config.ts') ||
            id.includes('src/module') ||
            id.includes('src/platform')) {
            return 'main'
          }
        }
      }
    },
    minify: false,
    commonjsOptions: {
      include: [
        /node_modules/
      ],
      transformMixedEsModules: true,
      defaultIsModuleExports: true
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      template: resolve(__dirname, '../template/src/client.ts')
    }
  },
  plugins: [
    react(),
    tailwindcss(),
    injectDirnamePlugin(),
    createWebConfigPlugin(),
    copyTemplateAssetsPlugin()
  ]
})