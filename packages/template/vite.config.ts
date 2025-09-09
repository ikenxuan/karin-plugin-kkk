import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { builtinModules } from 'node:module'
import path, { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ command }) => {
  // 基础配置
  const baseConfig = {
    plugins: [
      react(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer
        ]
      }
    }
  }

  // 开发模式
  if (command === 'serve') {
    return {
      ...baseConfig,
      root: path.resolve(__dirname, './src/dev'),
      publicDir: path.resolve(__dirname, './public'),
      server: {
        port: 5174,
        proxy: {
          // 代理API请求到后端服务器
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true
          }
        }
      },
      define: {
        __DEV__: true
      }
    }
  }

  // 构建模式保持不变
  return {
    ...baseConfig,
    emptyOutDir: true,
    plugins: [
      ...baseConfig.plugins,
      dts({
        insertTypesEntry: true,
        outDir: 'dist',
        include: ['src/**/*'],
        exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts']
      }),
      // CSS复制插件
      {
        name: 'copy-css-to-core',
        writeBundle () {
          const sourceFile = resolve(__dirname, 'dist/css/main.css')
          const targetDir = resolve(__dirname, '../core/lib/karin-plugin-kkk.css')
          const targetFile = resolve(targetDir)

          if (!existsSync(targetDir)) {
            mkdirSync(targetDir, { recursive: true })
          }

          if (existsSync(sourceFile)) {
            copyFileSync(sourceFile, targetFile)
            console.log('✅ CSS文件已复制到:', targetFile)
          } else {
            console.warn('⚠️ 源CSS文件不存在:', sourceFile)
          }
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
      rollupOptions: {
        external: [
          'cors',
          ...builtinModules,
          ...builtinModules.map((mod) => `node:${mod}`),
          ...['', '/express', '/root', '/lodash', '/yaml', '/axios', '/log4js', '/template'].map(p => `node-karin${p}`)
        ],
        output: {
          format: 'es',
          inlineDynamicImports: false,
          // 手动分包配置 - 将components目录下的所有文件打包到components.js
          manualChunks: (id) => {
            // 检查模块ID是否包含components路径
            if (id.includes('/src/components/') || id.includes('\\src\\components\\')) {
              return 'components'
            }
            // 其他模块保持默认行为
            return undefined
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'css/main.css'
            }
            return 'assets/[name].[hash][extname]'
          },
          // 自定义chunk文件名
          chunkFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'components') {
              return 'js/components.js'
            }
            return 'js/[name].[hash].js'
          }
        }
      },
      target: 'esnext',
      minify: false
    }
  }
})