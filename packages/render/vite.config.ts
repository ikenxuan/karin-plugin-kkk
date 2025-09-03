import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'
import { builtinModules } from 'node:module'
import dts from 'vite-plugin-dts'
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/**
 * 递归复制目录的函数
 * @param src 源目录路径
 * @param dest 目标目录路径
 */
function copyRecursive (src: string, dest: string) {
  if (statSync(src).isDirectory()) {
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true })
    }
    readdirSync(src).forEach(file => {
      copyRecursive(resolve(src, file), resolve(dest, file))
    })
  } else {
    copyFileSync(src, dest)
  }
}

export default defineConfig(({ command, mode }) => {
  // 基础配置
  const baseConfig = {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
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

  // 组件库构建模式
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
          'douyin/Comment': resolve(__dirname, 'src/components/platforms/douyin/Comment.tsx'),
          'layouts/DefaultLayout': resolve(__dirname, 'src/components/layouts/DefaultLayout.tsx'),
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