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
        const mainChunkContent = fs.readFileSync(mainChunkPath, 'utf-8')

        // 使用正则表达式查找 webConfig 的导出别名
        const webConfigExportMatch = mainChunkContent.match(/webConfig as (\w+)/)
        const webConfigAlias = webConfigExportMatch ? webConfigExportMatch[1] : 'webConfig'

        // 在 lib 目录中创建 web.config.js
        const webConfigContent = `export { ${webConfigAlias} as default } from './${mainChunkFile}';\n`
        const outputPath = resolve(__dirname, 'lib', 'web.config.js')
        fs.writeFileSync(outputPath, webConfigContent)
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
    __dirname: 'new URL(".", import.meta.url).pathname',
    __filename: 'new URL("", import.meta.url).pathname'
  },
  build: {
    target: 'node21',
    lib: {
      formats: ['es'],
      entry
    },
    emptyOutDir: true,
    outDir: 'lib',
    // 使用 rolldownOptions（按你的要求）
    rolldownOptions: {
      platform: 'node',
      external: [
        // Node 内建模块保持 external
        ...builtinModules,
        ...builtinModules.map((mod) => `node:${mod}`),
        // 你的 node-karin 相关 external
        ...['', '/express', '/root', '/lodash', '/yaml', '/axios', '/log4js', '/template', '/sqlite3'].map(p => `node-karin${p}`)
      ],
      output: {
        // 你要求必须开启：内联动态导入，收敛 chunk 数量
        inlineDynamicImports: true,
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

        // advancedChunks 顶层键，避免 TS 报错
        advancedChunks: {
          includeDependenciesRecursively: true,
          minSize: 1024 * 200,
          minShareCount: 2,
          groups: [
            { name: 'vendor', test: /[\\\/]node_modules[\\\/]/, priority: 100 },
            { name: 'template', test: /[\\\/]template[\\\/]/, priority: 90 },
            { name: 'root', test: /[\\\/]src[\\\/]root\.ts$/, priority: 1000 },
            { name: 'db', test: /[\\\/]src[\\\/]module[\\\/]db/, priority: 70 },
            { name: 'main', test: /[\\\/]src[\\\/]/, priority: 0 }
          ]
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
    createWebConfigPlugin(),
    copyTemplateAssetsPlugin()
  ]
})