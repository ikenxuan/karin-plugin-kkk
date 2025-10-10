import axios from 'node-karin/axios'

export interface XiaohongshuIdData {
  type: 'note' | 'unknown'
  [x: string]: any
}

/**
 * 解析小红书分享链接，提取作品ID
 * - 典型长链接: https://www.xiaohongshu.com/explore/<note_id>
 * - 短链: https://xhslink.com/<code>（会重定向到长链接）
 */
export async function getXiaohongshuID (url: string, log = true): Promise<XiaohongshuIdData> {
  const resp = await axios.get(url, {
    headers: {
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
    }
  })
  const longLink = resp?.request?.res?.responseUrl ?? url
  // 安全解码：如果最终地址里包含百分号编码的真实链接，解码后才能命中正则
  const normalizedLink = (() => {
    try { return decodeURIComponent(longLink) } catch { return longLink }
  })()

  const effectiveLink = (() => {
    try {
      const u = new URL(normalizedLink)
      if (u.pathname.startsWith('/404')) {
        const rp = u.searchParams.get('redirectPath')
        if (rp) {
          try { return decodeURIComponent(rp) } catch { return rp }
        }
      }
      const mm = /[?&]redirectPath=([^&#]+)/.exec(normalizedLink)
      if (mm?.[1]) {
        try { return decodeURIComponent(mm[1]) } catch { return mm[1] }
      }
      return normalizedLink
    } catch {
      const mm = /[?&]redirectPath=([^&#]+)/.exec(normalizedLink)
      if (mm?.[1]) {
        try { return decodeURIComponent(mm[1]) } catch { return mm[1] }
      }
      return normalizedLink
    }
  })()

  // 同时从 effectiveLink 与 normalizedLink 中获取 token，优先使用有效链接
  const pickToken = (s: string): string | undefined => {
    try {
      const u = new URL(s)
      const t = u.searchParams.get('xsec_token') || u.searchParams.get('XSEC_TOKEN') || undefined
      if (t) return t
      if (u.hash) {
        const mm = /(?:^|[?&#])(?:xsec_token|XSEC_TOKEN)=([^&#]+)/.exec(u.hash)
        if (mm?.[1]) return mm[1]
      }
      return undefined
    } catch {
      const mm = /(?:^|[?&#])(?:xsec_token|XSEC_TOKEN)=([^&#]+)/.exec(s)
      return mm?.[1]
    }
  }
  const finalToken = pickToken(effectiveLink) ?? pickToken(normalizedLink)

  let result: XiaohongshuIdData = { type: 'unknown' }

  switch (true) {
    case /xiaohongshu\.com\/discovery\/item\/([0-9a-zA-Z]+)/.test(effectiveLink): {
      const m = /xiaohongshu\.com\/discovery\/item\/([0-9a-zA-Z]+)/.exec(effectiveLink)
      result = {
        type: 'note',
        note_id: m ? m[1] : undefined,
        xsec_token: finalToken
      }
      break
    }

    case /xiaohongshu\.com\/explore\/([0-9a-zA-Z]+)/.test(effectiveLink): {
      const m = /xiaohongshu\.com\/explore\/([0-9a-zA-Z]+)/.exec(effectiveLink)
      result = {
        type: 'note',
        note_id: m ? m[1] : undefined,
        xsec_token: finalToken
      }
      break
    }
    default:
      result = { type: 'unknown' }
      break
  }

  if (result.type === 'unknown') {
    throw new Error('无法从链接中提取小红书笔记ID')
  }

  log && console.log(result)
  return result
}