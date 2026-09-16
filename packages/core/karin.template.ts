import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '@karinjs/template-react'
import type { ViteDevServer } from 'vite'

import { AVATAR_PROXY_PATH, isProxyableAvatarUrl } from './ktr/utils/avatarProxy'
import { templateFonts } from './src/module/utils/templateFonts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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

/**
 * 开发面板的模板字体：
 * 面板预览跑在浏览器里（/__ktr/sandbox），模板 CSS 里只有字体家族名——
 * 生产由 Render/index.ts 以 extraStylePaths 读字体包，这里用 vite 的 /@fs 把同一份包内 CSS
 * 交给面板，包内 ../fonts/* 的相对引用由 vite 接着解析，预览和实际渲染字体一致。
 */
const fontLinkPlugin = () => ({
  name: 'kkk-font-link-plugin',
  transformIndexHtml: () => templateFonts.map((font) => ({
    tag: 'link',
    attrs: { rel: 'stylesheet', href: `/@fs/${font.stylesheetPath.split(path.sep).join('/')}` },
    injectTo: 'head' as const
  }))
})

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
    plugins: command === 'serve' ? [avatarProxyPlugin(), fontLinkPlugin()] : [],
    resolve: {
      alias: [{ find: '@kkk/richtext', replacement: path.resolve(__dirname, '../richtext/src/index.ts') }]
    }
  })
})
