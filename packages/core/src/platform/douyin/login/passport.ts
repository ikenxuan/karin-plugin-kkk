import crypto from 'node:crypto'

export const PASSPORT_APP_KEY = '163e7ce78d58971a41f5b969996d85c2'
export const PASSPORT_AID = '6383'
export const LOGIN_HOST = 'login.douyin.com'
export const JSSDK_VERSION = '3.1.3'
export const P_VER = '1.1.3'
export const P_BD = '1.0.1.19-fix.01'
export const P_ZT = '3.3.14'
export const P_UI = '2.1.9-alpha.6'
export const P_CA = '4.0.17'
export const P_CA_REAL = '1.0.0.874'

const ACCOUNT_SDK_SOURCE_INFO =
  '7e276d64776172647760466a6b66707777606b667c273f3433292772606761776c736077273f63646976602927666d776a686061776c736077273f63646976602927766d60696961776c736077273f63646976602927756970626c6b76273f3029276c6b6b60774d606c626d71273f3d3d3129276c6b6b6077526c61716d273f3430363d29276a707160774d606c626d71273f3d3d3129276a70716077526c61716d273f3430363d29277260676269273f7e2773606b616a77273f27426a6a626960254c6b662b252d4b534c414c442c27292777606b6160776077273f27444b424940252d4b534c414c4429254b534c414c44254260436a7766602557515d253635303525496475716a7525425550252d357d35353535373040372c25416c77606671364134342573765a305a352575765a305a35292541364134342c27782927756077636a7768646b6660273f7e27716c68604a776c626c6b273f34323d333c3d30303230313c3c2b362927707660614f564d606475566c7f60273f313d363d323d33373129276b64736c6264716c6a6b516c686c6b62273f7e276160666a616061476a617c566c7f60273f323d353236352927606b71777c517c7560273f276b64736c6264716c6a6b2729276c6b6c716c64716a77517c7560273f276b64736c6264716c6a6b2729276b646860273f276d717175763f2a2a7272722b616a707c6c6b2b666a682a707660772a766069633a63776a685a7164675a6b6468603868646c6b27292777606b61607747696a666e6c6b62567164717076273f276b6a6b2867696a666e6c6b62272927766077736077516c686c6b62273f2766616b286664666d602960616260296a776c626c6b296c6b6b60772971715a646272272927627069605671647771273f3c31332b353c3c3c3c3c3c35313336373329276270696041707764716c6a6b273f276b6a6b60277878292767776a72766077273f7e2771273f27373c34373d30303d3c333d3234272927676c715a75776a716a666a69273f276364697660272927676c715a6d6069756077273f63646976607878'

const sha256Hex = (value: string): string => crypto.createHash('sha256').update(value, 'utf8').digest('hex')

const hmacSha256 = (key: Uint8Array, value: Uint8Array): Uint8Array =>
  new Uint8Array(crypto.createHmac('sha256', Buffer.from(key)).update(Buffer.from(value)).digest())

const hexToBytes = (hex: string): Uint8Array => {
  const pairs = hex.match(/.{1,2}/g) ?? []
  return Uint8Array.from(pairs.map((pair) => Number.parseInt(pair, 16)))
}

export function encodeHexXor5(value: string): string {
  let result = ''
  for (const byte of Buffer.from(value, 'utf8')) result += (byte ^ 5).toString(16).padStart(2, '0')
  return result
}

function serializeParams(value: Record<string, unknown>, limit = -1): { serialized: string; keys: string[] } {
  const keys = Object.keys(value).sort()
  if (limit >= 0) keys.splice(limit)

  return {
    serialized: keys
      .map((key) => {
        const item = value[key]
        return typeof item === 'object' ? `${key}=${JSON.stringify(item)}` : `${key}=${String(item)}`
      })
      .join('&'),
    keys
  }
}

export function makeSignAndQs(
  params: Record<string, unknown>,
  data: Record<string, unknown> = {},
  appKey = PASSPORT_APP_KEY
): { sign: string; qs: string } {
  const { serialized: query, keys } = serializeParams(params, 10)
  const { serialized: body } = serializeParams(data)
  return {
    sign: sha256Hex(`${query}&${body}&app_key=${appKey}`),
    qs: encodeHexXor5(keys.join(','))
  }
}

export function makePNo(params: {
  p_ca?: string
  p_ts?: number | string
  p_bd?: string
  p_zt?: string
  p_ver?: string
  passport_jssdk_version?: string
}): string {
  const values: Record<string, string> = {
    passport_jssdk_version: params.passport_jssdk_version ?? JSSDK_VERSION,
    p_bd: params.p_bd ?? P_BD,
    p_ca: params.p_ca ?? '0',
    p_ts: String(params.p_ts ?? Date.now()),
    p_ver: params.p_ver ?? P_VER,
    p_zt: params.p_zt ?? P_ZT
  }
  return sha256Hex(
    Object.keys(values)
      .sort()
      .map((key) => `${key}=${values[key]}`)
      .join('&')
  )
}

export function todayUtcNoonTs(): number {
  const now = new Date()
  return Math.floor(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12) / 1000)
}

function deriveKey(keyHex: string, salt: Uint8Array, length = 32): Uint8Array {
  let result = new Uint8Array()
  let previous = ''
  let counter = 0

  while (result.length < length) {
    counter++
    const input = Uint8Array.from([...hexToBytes(previous), ...salt, counter])
    previous = Buffer.from(hmacSha256(hexToBytes(keyHex), input)).toString('hex')
    result = Uint8Array.from([...result, ...hexToBytes(previous)])
  }

  return result.slice(0, length)
}

export function makeAidSign(path: string, aid = PASSPORT_AID, appKey = PASSPORT_APP_KEY): string {
  const timestamp = String(todayUtcNoonTs())
  const firstKey = Buffer.from(hmacSha256(new TextEncoder().encode(timestamp), new TextEncoder().encode(appKey))).toString('hex')
  const key = deriveKey(firstKey, new Uint8Array())
  return Buffer.from(hmacSha256(key, new TextEncoder().encode(`aid=${aid}&path=${path}&ts=${timestamp}`))).toString('hex')
}

export function randomHex(length: number): string {
  let result = ''
  while (result.length < length) result += Math.floor(Math.random() * 16).toString(16)
  return result
}

export function makeCommonParams(extra: Record<string, string | number> = {}): Record<string, string> {
  const timestamp = String(Date.now())
  const params: Record<string, string> = {
    passport_jssdk_version: JSSDK_VERSION,
    passport_jssdk_type: 'normal',
    is_from_ttaccountsdk: '1',
    aid: PASSPORT_AID,
    language: 'zh',
    account_app_language: 'zh-CN',
    ts: String(todayUtcNoonTs()),
    ...Object.fromEntries(Object.entries(extra).map(([key, value]) => [key, String(value)])),
    is_from_iesaccountsaas: '1',
    p_ui: P_UI,
    p_ca: P_CA,
    p_ca_real: P_CA_REAL,
    account_sdk_source: 'web',
    account_sdk_source_info: ACCOUNT_SDK_SOURCE_INFO,
    p_js_v: JSSDK_VERSION,
    p_js_t: 'pro',
    p_zt: P_ZT,
    p_ver: P_VER,
    p_ver_real: '0',
    request_host: encodeURIComponent('https://www.douyin.com'),
    p_bd: P_BD,
    p_ts: timestamp,
    p_no: '',
    biz_trace_id: randomHex(8),
    device_platform: 'web_app'
  }
  params.p_no = makePNo({ p_ca: P_CA, p_ts: timestamp })
  return params
}
