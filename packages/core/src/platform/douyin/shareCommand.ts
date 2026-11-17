import axios from 'node-karin/axios'

import { getAmagiClient } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'

/** 从抖音 App 分享文本中提取口令，统一为官方解析器使用的带装饰符形式。 */
export const extractDouyinShareCommand = (message: string): string | undefined => {
  const decorated = message.match(/(?<!ˇ)ˇ{1,2}([0-9A-Za-z]{11,14})Š{1,2}(?!Š)/)?.[1]
  if (decorated) return `ˇ${decorated}Š`

  // 装饰符字符不可枚举（ˇ、ǚ、※ 都可能出现）：无 ˇ…Š 外壳时只从连贯分享文案筛唯一完整候选，有效性交给官方接口确认。
  if (!/复制[，,\s]*打开抖音(?:[，,\s]|$)/.test(message)) return undefined
  // 分享文案把作者名和标题放在【】里；先剔除，避免其中的英文串形成第二候选。
  const plain = message.replace(/【[^】]*】/g, ' ')
  const tokens = plain.match(/[0-9A-Za-z]+/g)?.filter((token) => token.length >= 11 && token.length <= 14) ?? []
  const candidates = [...new Set(tokens)]
  return candidates.length === 1 ? `ˇ${candidates[0]}Š` : undefined
}

const asRecord = (value: unknown): Record<string, unknown> | undefined =>
  typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined

const isCommandTransUrl = (value: string): boolean => {
  try {
    const url = new URL(value)
    return (
      url.protocol === 'https:' &&
      url.hostname === 'aweme.snssdk.com' &&
      url.pathname === '/aweme/v2/platform/share/command/trans/' &&
      !url.port &&
      !url.username &&
      !url.password
    )
  } catch {
    return false
  }
}

/** 读取口令接口响应，保留 JSON 数字形式的长 ID 精度。 */
const parseCommandResponse = (body: string): Record<string, unknown> => {
  const quoted = body.replace(/"(?:\\[\s\S]|[^"\\])*"|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/g, (token, offset: number) => {
    if (token.startsWith('"') || /[.eE]/.test(token) || Number.isSafeInteger(Number(token))) return token
    if (!/^\s*(?:[,}\]]|$)/.test(body.slice(offset + token.length))) return token
    return `"${token}"`
  })

  try {
    const payload = asRecord(JSON.parse(quoted))
    if (payload) return payload
  } catch {
    // 不把原始响应或签名头写进错误报告。
  }
  throw new Error('抖音口令接口未返回有效的 JSON 对象')
}

const asAwemeId = (value: unknown): string | undefined => {
  const id = typeof value === 'string' ? value : typeof value === 'number' && Number.isSafeInteger(value) ? String(value) : undefined
  return id && /^\d{15,20}$/.test(id) ? id : undefined
}

/** 使用 amagi 的 App URL 与外部签名服务，将分享口令换成作品 ID。 */
export const resolveDouyinShareCommand = async (command: string, signUrl: string): Promise<string> => {
  const signAddress = signUrl?.trim()
  try {
    const url = new URL(signAddress)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('invalid protocol')
  } catch {
    throw new Error('请在实验室配置有效的 HTTP 或 HTTPS 签名地址')
  }

  // App 口令接口不使用 Web Cookie。URL 只构造一次，签名与发送必须使用同一个字符串。
  const transUrl = getAmagiClient().douyin.apiUrls.getCommandTrans({
    command,
    clipboard_timestamp: Date.now(),
    patterns: ['email', 'datetime'],
    start_from: 'hot'
  })
  const http = axios.create({ timeout: Config.amagi.timeout, proxy: false, validateStatus: () => true })
  const signResponse = await http.post<unknown>(
    signAddress,
    { url: transUrl, method: 'GET', scene: 2, appendCommonParams: true, includeCookie: false },
    { headers: { 'content-type': 'application/json' } }
  )
  if (signResponse.status !== 200) throw new Error(`签名服务请求失败（HTTP ${signResponse.status}）`)

  const signPayload = asRecord(signResponse.data)
  const signObject = asRecord(signPayload?.signObject)
  const headers = asRecord(signObject?.headers)
  if (
    signPayload?.ok !== true ||
    typeof signObject?.url !== 'string' ||
    !isCommandTransUrl(signObject.url) ||
    typeof signObject.method !== 'string' ||
    signObject.method.toUpperCase() !== 'GET' ||
    !headers ||
    !Object.values(headers).every((value) => typeof value === 'string')
  ) {
    throw new Error('签名服务未返回有效的抖音 App 签名结果')
  }

  // 校验只读取 URL，不重新编码或拼接签名后的 URL；签名头也原样使用。
  const transResponse = await http.get<string>(signObject.url, {
    headers: headers as Record<string, string>,
    responseType: 'text',
    maxRedirects: 0
  })
  if (transResponse.status !== 200) throw new Error(`抖音口令接口请求失败（HTTP ${transResponse.status}）`)
  const payload = parseCommandResponse(transResponse.data)
  if (payload.status_code !== 0 && payload.status_code !== '0') {
    throw new Error(`抖音口令解析失败（状态码 ${String(payload.status_code ?? '未知')}）`)
  }

  const extraInfo = asRecord(payload.extra_info)
  const schemaDetail = asRecord(payload.schema_detail)
  const schema = typeof payload.schema === 'string' ? payload.schema : ''
  const schemaMatch = schema.match(
    /(?:aweme|article|note)\/detail\/(\d{15,20})(?=[/?#]|$)|[?&](?:aweme_id|item_id|modal_id)=(\d{15,20})(?=[&#]|$)/
  )
  const awemeId = asAwemeId(extraInfo?.object_id) ?? asAwemeId(schemaDetail?.aweme_id) ?? asAwemeId(schemaMatch?.[1] ?? schemaMatch?.[2])
  if (!awemeId) throw new Error('未能从抖音分享口令中获取作品 ID，口令可能已失效或不是作品分享')
  return awemeId
}
