import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '@karinjs/template-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * 复刻旧 template dev 的字体代理插件：
 * 开发态把 font.css 里的 http://localhost:3780 前缀剥掉，走面板自己的代理（见 server.proxy）。
 * 只在 serve 生效；生产构建保留绝对地址（3780 字体代理由 core 在运行时启动）。
 */
const fontProxyPlugin = () => {
  return {
    name: 'kkk-font-proxy-plugin',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      const cleanId = id.split('?')[0]
      if ((cleanId.endsWith('.css') || cleanId.endsWith('.scss') || cleanId.endsWith('.less')) && code.includes('http://localhost:3780')) {
        return code.replace(/http:\/\/localhost:3780/g, '')
      }
    }
  }
}

export default defineConfig({
  dir: {
    assets: 'resources'
  },
  dev: {
    port: 5174,
    host: 'localhost',
    open: false
  },
  vite: ({ command }) => ({
    plugins: command === 'serve' ? [fontProxyPlugin()] : [],
    resolve: {
      alias: [{ find: '@kkk/richtext', replacement: path.resolve(__dirname, '../richtext/src/index.ts') }]
    },
    server: {
      proxy: {
        // HarmonyOS 字体：面板单独运行时反代到华为开发者站（与旧 template dev 行为一致）
        '/config/commonResource/font': {
          target: 'https://developer.huawei.com',
          changeOrigin: true,
          secure: false,
          headers: {
            Referer: 'https://developer.huawei.com/'
          }
        }
      }
    },
    build: {
      // 字体等 CSS 引用资源全部内联进 style.css，与旧构建（assetsInlineLimit 10MB）一致
      assetsInlineLimit: 10 * 1024 * 1024
    }
  })
})
