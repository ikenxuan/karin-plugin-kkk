import fs from "node:fs"
import path from "node:path"

import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'
import obfuscator from 'vite-plugin-javascript-obfuscator'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'

/** 读取插件的版本信息 */
const getPluginVersion = () => {
  try {
    const pluginPackageJson = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../core/package.json'), 'utf-8')
    )
    return pluginPackageJson.version
  } catch {
    return '1.0.0'
  }
}

/** 获取格式化的构建时间 */
const getBuildTime = () => {
  const now = new Date()
  const chinaTime = now.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  
  // 获取时区偏移
  const offset = -now.getTimezoneOffset() / 60
  const timezone = offset >= 0 ? `UTC+${offset}` : `UTC${offset}`
  
  return `${chinaTime} (${timezone})`
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isStandalone = mode === 'standalone'
  const buildTime = getBuildTime()
  const version = getPluginVersion()
  const isDev = command === 'serve'

  return {
    base: isStandalone? '/':  '/kkk/',
    plugins: [
      react(),
      tailwindcss(),
      mkcert(),
      viteImagemin({
        gifsicle: { optimizationLevel: 7 },
        mozjpeg: { quality: 80 },
        pngquant: {
          quality: [0.65, 0.8],
          speed: 4
        },
        webp: {
          quality: 75
        }
      }),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          navigateFallback: isStandalone ? '/index.html' : '/kkk/index.html',
          navigateFallbackDenylist: [/^\/api\//],
          // 支持 HTTP 协议下的 PWA
          skipWaiting: true,
          clientsClaim: true,
          // 缓存策略
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1年
                },
                plugins: [
                  {
                    cacheKeyWillBeUsed: async ({ request }) => {
                      return `${request.url}?v=${version}`
                    }
                  }
                ]
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                }
              }
            },
            {
              urlPattern: /\/api\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 5 // 5分钟
                }
              }
            }
          ]
        },
        includeAssets: ['favicon/*.png', 'favicon/*.ico', 'favicon/*.svg'],
        // 开发模式下禁用 PWA
        disable: isDev,
        // 支持 HTTP 协议
        devOptions: {
          enabled: true,
          type: 'module',
          navigateFallback: '/kkk/index.html'
        },
        injectRegister: 'auto',
        strategies: 'injectManifest',
        srcDir: 'public',
        filename: 'sw.js'
      }),
      !isStandalone && obfuscator({
        include: ['src/**/*.ts', 'src/**/*.tsx'],
        exclude: ['node_modules/**', 'src-tauri/**', 'src/App.tsx', 'src/main.tsx'],
        apply: 'build',
        debugger: true,
        options: {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 1,
          numbersToExpressions: true,
          simplify: true,
          stringArrayShuffle: true,
          splitStrings: true,
          stringArray: true,
          stringArrayThreshold: 1,
          stringArrayWrappersCount: 10,
          deadCodeInjection: true,
          stringArrayWrappersChainedCalls: true,
          stringArrayWrappersParametersMaxCount: 5,
          stringArrayWrappersType: 'function',
          stringArrayEncoding: ['rc4'],
          unicodeEscapeSequence: true,
          identifierNamesGenerator: 'hexadecimal',
          renameGlobals: false,
          selfDefending: true,
          debugProtection: false,
          debugProtectionInterval: 2000,
          disableConsoleOutput: true,
          domainLock: [],
          reservedNames: [],
          seed: 0,
          sourceMap: false,
          sourceMapBaseUrl: '',
          sourceMapFileName: '',
          sourceMapMode: 'separate',
          target: 'browser'
        }
      })
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __TAURI__: JSON.stringify(process.env.TAURI_PLATFORM !== undefined),
      __APP_VERSION__: JSON.stringify(version),
      __BUILD_TIME__: JSON.stringify(buildTime),
      'import.meta.env.DEV': JSON.stringify(command === 'serve'),
      'import.meta.env.PROD': JSON.stringify(command === 'build')
    },
    build: {
      emptyOutDir: true,
      // 根据模式设置不同的输出目录
      outDir: isStandalone ? 'dist' : '../core/lib/web_chunk',
      // 启用CSS代码分割
      cssCodeSplit: true,
      // 最小化混淆
      minify: isDev || process.env.TAURI_ENV_DEBUG ? false : 'esbuild',
      // 设置chunk大小警告阈值
      chunkSizeWarningLimit: 1000,
      sourcemap: isDev || !!process.env.TAURI_ENV_DEBUG,
      rollupOptions: {
        external: ['workbox-window']
      }
    },
    clearScreen: false,
    server: {
      host: true,
      watch: {
        ignored: ['**/src-tauri/**'],
      },
      proxy: {
        '/api': {
          target: 'http://localhost:7777',
          changeOrigin: true,
        },
      }
    },
  }
})