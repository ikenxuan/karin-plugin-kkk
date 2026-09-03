import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '@karinjs/template-react'
import type { ViteDevServer } from 'vite'

import { AVATAR_PROXY_PATH, isProxyableAvatarUrl } from './ktr/utils/avatarProxy'

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

/** 代理上游的超时，比模板侧 loadQRCodeAvatar 的 5s 略宽，让超时判定落在模板侧 */
const AVATAR_PROXY_TIMEOUT_MS = 8000

/**
 * 面板预览用的头像代理插件：
 * `q*.qlogo.cn` 这类头像 CDN 不发 CORS 头，浏览器分支直接 fetch 会被拦，
 * 这里在 dev 服务器上开一个同源端点把字节原样转发回来，让面板预览也能嵌上头像。
 * 只在 serve 生效；生产渲染走 Node SSR，服务端 fetch 不受同源策略约束，用不到它。
 */
const avatarProxyPlugin = () => {
  return {
    name: 'kkk-avatar-proxy-plugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(AVATAR_PROXY_PATH, (req, res) => {
        void (async () => {
          // connect 会剥掉挂载前缀，这里只剩 `/?url=...`
          const target = new URL(req.url ?? '/', 'http://localhost').searchParams.get('url')
          if (!target || !isProxyableAvatarUrl(target)) {
            res.statusCode = 400
            res.end()
            return
          }

          try {
            const upstream = await fetch(target, {
              headers: { accept: 'image/png,image/jpeg,image/webp,image/*;q=0.8' },
              signal: AbortSignal.timeout(AVATAR_PROXY_TIMEOUT_MS)
            })
            if (!upstream.ok) {
              res.statusCode = 502
              res.end()
              return
            }

            res.statusCode = 200
            res.setHeader('content-type', upstream.headers.get('content-type') ?? 'application/octet-stream')
            res.setHeader('access-control-allow-origin', '*')
            res.setHeader('cache-control', 'public, max-age=3600')
            res.end(Buffer.from(await upstream.arrayBuffer()))
          } catch {
            res.statusCode = 502
            res.end()
          }
        })()
      })
    }
  }
}

export default defineConfig({
  dir: {
    assets: 'resources',
    copyAssets: false
  },
  dev: {
    port: 5174,
    host: 'localhost',
    open: false
  },
  vite: ({ command }) => ({
    plugins: command === 'serve' ? [fontProxyPlugin(), avatarProxyPlugin()] : [],
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
