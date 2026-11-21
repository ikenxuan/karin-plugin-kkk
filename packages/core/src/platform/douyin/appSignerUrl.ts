/** 将签名服务的 HTTP(S) base URL 规范为 origin；具体接口路径由 Amagi 派生。 */
export const getDouyinAppSignerBaseUrl = (signUrl: string): string => {
  const value = signUrl.trim()
  try {
    const url = new URL(value)
    if (/^https?:\/\/[^/?#]+\/?$/i.test(value) && !url.username && !url.password && !url.search && !url.hash && url.pathname === '/') {
      return url.origin
    }
  } catch {
    // 用固定文案，不回显用户提供的地址。
  }
  throw new TypeError('请在实验室填写 HTTP(S) 签名服务的 base URL，不支持接口路径、自定义路径前缀、查询参数或凭据')
}
