import fs from 'node:fs'
import dts from 'vite-plugin-dts'
import { defineConfig, type Plugin } from 'vite'
import { builtinModules } from 'node:module'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync, writeFileSync } from 'node:fs'

// 在ES模块中模拟__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

const entry: string[] = ['src/index.ts', 'src/root.ts']

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
const __filename = import.meta.url ? new URL(import.meta.url).pathname : '';
const __dirname = import.meta.url ? new URL('.', import.meta.url).pathname : '';
`
        return injection + code
      }
      return code
    }
  }
}

// 创建输出目录 web.config.js 的插件
function createWebConfigPlugin (): Plugin {
  return {
    name: 'create-web-config',
    writeBundle (options, bundle) {
      // 查找包含 web.config 的 main chunk
      const mainChunkFile = Object.keys(bundle).find(fileName => {
        return fileName.startsWith('chunk/main-') && fileName.endsWith('.js')
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

export default defineConfig({
  define: {
    'process.env.PLUGIN_NAME': JSON.stringify(pkg.name),
    'process.env.PLUGIN_VERSION': JSON.stringify(pkg.version),
  },
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
        ...['', '/express', '/root', '/lodash', '/yaml', '/axios', '/log4js'].map(p => `node-karin${p}`),
        'playwright',
        'sequelize',
        'sqlite3'
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

          if (chunkInfo.facadeModuleId?.includes('src/cli')) {
            return `cli/${chunkInfo.name}.js`
          }

          return `chunk/${chunkInfo.name}.js`
        },

        chunkFileNames: 'chunk/[name]-[hash].js',

        manualChunks (id) {
          if (id.includes('node_modules')) {
            return 'vendor'
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
    injectDirnamePlugin(),
    createWebConfigPlugin()
  ]
})
