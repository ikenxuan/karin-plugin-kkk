/**
 * ktr 开发面板预览用的头像代理约定。
 *
 * 头像 CDN（尤其 `q*.qlogo.cn`）不返回 `Access-Control-Allow-Origin`，
 * 浏览器里直接 fetch 会被同源策略拦掉，面板预览的二维码就嵌不上头像。
 * 生产渲染走 Node SSR（服务端 fetch，无同源策略），不受影响也不需要这个代理。
 *
 * 代理端点由 `karin.template.ts` 的 avatarProxyPlugin 挂在 ktr dev 服务器上，仅 serve 态存在。
 */

/** 代理端点路径，dev 服务器与模板侧共用这一处定义。 */
export const AVATAR_PROXY_PATH = '/__kkk/avatar-proxy'

/**
 * 允许转发的头像 CDN 域名。
 *
 * 白名单是为了不让 dev 服务器变成任意地址的开放转发；
 * 其它适配器的头像域名如果也缺 CORS 头，在这里补一条即可（不在名单内的走直连）。
 */
const ALLOWED_AVATAR_HOSTS = [/(?:^|\.)qlogo\.cn$/i, /(?:^|\.)qpic\.cn$/i, /(?:^|\.)hdslb\.com$/i]

/**
 * 判断某个头像 URL 是否允许经代理转发
 * @param url - 头像地址
 * @returns 命中白名单且是 http(s) 时为 true
 */
export const isProxyableAvatarUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false
    return ALLOWED_AVATAR_HOSTS.some((pattern) => pattern.test(parsed.hostname))
  } catch {
    return false
  }
}

/**
 * 把头像地址改写成同源代理地址
 * @param url - 原始头像地址
 * @returns 代理端点地址
 */
export const toProxiedAvatarUrl = (url: string): string => `${AVATAR_PROXY_PATH}?url=${encodeURIComponent(url)}`
