import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { builtinModules } from 'node:module'
import path, { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
// import { DevTools } from '@vitejs/devtools'
import reactSwc from '@vitejs/plugin-react-swc'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

import { mockApiPlugin } from './src/dev/vite-mock-plugin'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

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
 * 字体代理插件
 * 开发环境下将 http://localhost:3780 替换为空字符串，以便通过 Vite 代理转发
 */
const fontProxyPlugin = () => {
  return {
    name: 'font-proxy-plugin',
    enforce: 'pre' as const,
    transform (code: string, id: string) {
      // 只要是 CSS 文件，或者内容中包含目标字符串，就尝试替换
      // 忽略 query 参数，例如 font.css?direct
      const cleanId = id.split('?')[0]
      if (
        (cleanId.endsWith('.css') || cleanId.endsWith('.scss') || cleanId.endsWith('.less')) &&
        code.includes('http://localhost:3780')
      ) {
        return code.replace(/http:\/\/localhost:3780/g, '')
      }
    }
  }
}

export default defineConfig(({ command }) => {
  // 基础配置
  const baseConfig = {
    plugins: [
      // DevTools 仅在需要时启用，避免 Vue 警告
      // DevTools(),
      codeInspectorPlugin({
        bundler: 'vite',
        showSwitch: true,
        hotKeys: ['shiftKey', 'altKey'],
        exclude: [
          // 排除左侧工具栏和中间工具栏，避免被检查器检测
          /App\.tsx.*左侧垂直工具栏/,
          /App\.tsx.*中间垂直工具栏/
        ]
      }),
      reactSwc({
        devTarget: 'es2022'
      }),
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    }
  }

  // 开发模式
  if (command === 'serve') {
    return {
      ...baseConfig,
      plugins: [
        ...baseConfig.plugins,
        mockApiPlugin(),
        fontProxyPlugin(),
        checker({
          // e.g. use TypeScript check
          typescript: true
        })
      ],
      root: path.resolve(__dirname, './src/dev'),
      publicDir: path.resolve(__dirname, './public'),
      server: {
        port: 5174,
        proxy: {
          '/config/commonResource/font': {
            target: 'https://developer.huawei.com',
            changeOrigin: true,
            secure: false,
            headers: {
              'Referer': 'https://developer.huawei.com/'
            }
          }
        }
      },
      define: {
        __DEV__: true,
        // Vue feature flags (消除警告)
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
      },
      build: {
        sourcemap: true
      }
    }
  }

  // 构建模式保持不变
  return {
    ...baseConfig,
    emptyOutDir: true,
    plugins: [
      ...baseConfig.plugins,
      {
        name: 'copy-assets-to-core',
        writeBundle () {
          // 复制CSS文件
          const sourceFile = resolve(__dirname, 'dist/main.css')
          const targetFile = resolve(__dirname, '../core/lib/karin-plugin-kkk.css')
          const targetDir = resolve(__dirname, '../core/lib')

          if (!existsSync(targetDir)) {
            mkdirSync(targetDir, { recursive: true })
          }

          if (existsSync(sourceFile)) {
            copyFileSync(sourceFile, targetFile)
            console.log('✅ CSS文件已复制到:', targetFile)
          } else {
            console.warn('⚠️ 源CSS文件不存在:', sourceFile)
          }

          // 复制静态资源
          const SourceDir = resolve(__dirname, 'public')
          const TargetDir = resolve(__dirname, '../core/resources')

          copyDirectory(SourceDir, TargetDir)
          console.log('✅ 静态资源已复制到:', TargetDir)
        }
      }
    ],
    build: {
      lib: {
        entry: {
          index: resolve(__dirname, 'src/client.ts')
        },
        formats: ['es']
      },
      outDir: 'dist',
      cssCodeSplit: false,
      rolldownOptions: {
        external: [
          'cors',
          ...builtinModules,
          ...builtinModules.map((mod) => `node:${mod}`),
          ...['', '/express', '/root', '/lodash', '/yaml', '/axios', '/log4js', '/template'].map(p => `node-karin${p}`)
        ],
        output: {
          format: 'es',
          inlineDynamicImports: false,
          manualChunks: (id) => {
            if (id.includes('/src/components/') || id.includes('\\src\\components\\')) {
              return 'template'
            }

            // 主要依赖文件放到deps目录
            if (id.includes('/src/main.ts') || id.includes('\\src\\main.ts') ||
              id.includes('/src/utils/') || id.includes('\\src\\utils\\') ||
              id.includes('/src/config/') || id.includes('\\src\\config\\') ||
              id.includes('/src/types/') || id.includes('\\src\\types\\')) {
              return 'deps/main'
            }

            // React相关依赖
            if (id.includes('react') || id.includes('react-dom')) {
              return 'deps/react'
            }

            // 其他第三方库
            if (id.includes('node_modules')) {
              return 'deps/vendor'
            }

            // 其他模块保持默认行为
            return undefined
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'main.css'
            }
            return 'assets/[name].[hash][extname]'
          },
          chunkFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'template') {
              return 'template.js'
            }
            if (chunkInfo.name?.startsWith('deps/')) {
              return `${chunkInfo.name}.js`
            }
            return 'chunks/[name].[hash].js'
          },
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'index') {
              return 'index.js'
            }
            return '[name].js'
          }
        }
      },
      target: 'esnext',
      minify: false
    }
  }
})