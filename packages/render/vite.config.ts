import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path, { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'
import { builtinModules } from 'node:module'
import dts from 'vite-plugin-dts'
import { copyFileSync, mkdirSync, existsSync } from 'node:fs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ command, mode }) => {
  // 基础配置
  const baseConfig = {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer
        ]
      }
    },
  }

  // 开发模式
  if (command === 'serve') {
    return {
      ...baseConfig,
      root: path.resolve(__dirname, "./src/dev"),
      publicDir: path.resolve(__dirname, "./public"), // 指定public目录
      server: {
        port: 5173,
        proxy: {
          // 代理API请求到后端服务器
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
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
          const targetDir = resolve(__dirname, '../core/resources/style')
          const targetFile = resolve(targetDir, 'main.css')

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
      },
    ],
    build: {
      lib: {
        entry: {
          'layouts/DefaultLayout': resolve(__dirname, 'src/components/layouts/DefaultLayout.tsx'),
          'douyin/Comment': resolve(__dirname, 'src/components/platforms/douyin/Comment.tsx'),
          'douyin/Dynamic': resolve(__dirname, 'src/components/platforms/douyin/Dynamic.tsx'),
          'douyin/Live': resolve(__dirname, 'src/components/platforms/douyin/Live.tsx'),
          'bilibili/Comment': resolve(__dirname, 'src/components/platforms/bilibili/Comment.tsx'),
          'bilibili/Dynamic/DYNAMIC_TYPE_DRAW': resolve(__dirname, 'src/components/platforms/bilibili/dynamic/DrawDynamic.tsx'),
          'index': resolve(__dirname, 'src/client.ts')
        },
        formats: ['es'],
        fileName: (format, entryName) => `${entryName}.js`
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
          generatedCode: {
            constBindings: true
          },
          format: 'es',
          inlineDynamicImports: false,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'css/main.css'
            }
            return 'assets/[name].[hash][extname]'
          }
        }
      },
      target: 'esnext',
      minify: false
    }
  }
})