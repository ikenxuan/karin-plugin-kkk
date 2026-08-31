/**
 * Copyright AngelToms
 * SPDX-License-Identifier: Apache-2.0
 *
 * a_bogus 签名引擎由 ylcangel/douyin_sign 的 utils.js 逐行翻译，
 * 登录协议结构参考 dmmdekkd/DouyinDataAPI。
 */
import { DOUYIN_USER_AGENT } from './constants'
import { sm3Digest, sm3DigestTwice } from './sm3'

const AB_ARRAY_SIZE = 256
const DY_SALT = 'dhzx'
const enterPageTs = +Date.now()
const sdkVersion = '1.0.1.19-fix.01'
const aid = 6383
const pageId = 7571

const onwheelx = {
  value: '0X21',
  writable: false,
  enumerable: true,
  configurable: true
}

const envWindow = {
  innerWidth: 2048,
  innerHeight: 960,
  outerWidth: 2554,
  outerHeight: 1386,
  onwheelx: null as unknown,
  screen: {
    availWidth: 2560,
    availHeight: 1392,
    width: 2560,
    height: 1440,
    sizeWidth: 2560,
    sizeHeight: 1440
  }
}
const envNavigator = {
  userAgent: DOUYIN_USER_AGENT,
  platform: 'Win32',
  vendorSubs: {} as Record<string, unknown>
}

function createKey(): string {
  const keyArray: number[] = []
  let magic = 1
  magic /= AB_ARRAY_SIZE
  keyArray.push(magic)
  magic = 1
  magic %= AB_ARRAY_SIZE
  keyArray.push(magic)
  magic = 14
  magic %= AB_ARRAY_SIZE
  keyArray.push(magic)
  return String.fromCharCode(...keyArray)
}

function dyRc4(key: string, text: string): string {
  const state = new Uint8Array(AB_ARRAY_SIZE)
  const keyBytes = new Uint8Array(AB_ARRAY_SIZE)
  const maxStateIndex = AB_ARRAY_SIZE - 1
  for (let index = 0; index < AB_ARRAY_SIZE; index++) {
    state[index] = maxStateIndex - index
    keyBytes[index] = key.charCodeAt(index % key.length)
  }
  let j = 0
  for (let index = 0; index < AB_ARRAY_SIZE; index++) {
    j = (j * state[index] + j + keyBytes[index]) % AB_ARRAY_SIZE
    const current = state[index]
    state[index] = state[j]
    state[j] = current
  }
  let i = 0
  let k = 0
  let cipher = ''
  for (let index = 0; index < text.length; index++) {
    i = (i + 1) % AB_ARRAY_SIZE
    k = (k + state[i]) % AB_ARRAY_SIZE
    const current = state[i]
    state[i] = state[k]
    state[k] = current
    const random = state[(state[i] + state[k]) % AB_ARRAY_SIZE]
    cipher += String.fromCharCode(text.charCodeAt(index) ^ random)
  }
  return cipher
}

function dyBase64(code: string, tableName: string, pad: string | null = '='): string {
  if (pad === null) pad = '='
  const tables: Record<string, string> = {
    s0: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    s1: 'Dkdpgh4ZKsQB80/Mfvw36XI1R25+WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=',
    s2: 'Dkdpgh4ZKsQB80/Mfvw36XI1R25-WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=',
    s3: 'ckdp1h4ZKsUB80/Mfvw36XIgR25+WQAlEi7NLboqYTOPuzmFjJnryx9HVGDaStCe',
    s4: 'Dkdpgh2ZmsQB80/MfvV36XI1R45-WUAlEixNLwoqYTOPuzKFjJnry79HbGcaStCe'
  }
  const table = tables[tableName]
  let encoded = ''
  let index = 0
  while (index < code.length) {
    const firstOriginal = code.charCodeAt(index++)
    const secondOriginal = code.charCodeAt(index++)
    const thirdOriginal = code.charCodeAt(index++)
    const first = (firstOriginal & 255) << 16
    const second = Number.isNaN(secondOriginal) ? 0 : (secondOriginal & 255) << 8
    const third = Number.isNaN(thirdOriginal) ? 0 : thirdOriginal & 255
    const packed = (first | second) | third
    encoded += table.charAt((packed & 16515072) >> 18)
    encoded += table.charAt((packed & 258048) >> 12)
    if (!Number.isNaN(secondOriginal)) encoded += table.charAt((packed & 4032) >> 6)
    if (!Number.isNaN(thirdOriginal)) encoded += table.charAt(packed & 63)
    if (Number.isNaN(secondOriginal)) encoded += pad
    if (Number.isNaN(thirdOriginal)) encoded += pad
  }
  return encoded
}

function random(input: Record<string, unknown>): number[] {
  const value = input[0] as [number, number]
  const secondValue = input[1]
  const firstInput = value[0]
  const secondInput = value[1]
  let flag = 0
  const randomValue = Math.random() * 65535
  let first = randomValue & 255
  let second = (randomValue >> 8) & 255
  if ((input.length as number) > 1) {
    if (secondValue !== void 0) flag = input[1] as number
  } else {
    flag = 0
  }
  if (flag === 1) second = 0
  if (flag === 2) {
    first = (Math.random() * 240) >> 0
    if (first > 109) {
      first += first % 2
      first += 1
    }
    second = 0
    second |= 1 << 1
    second |= 1 << 4
    second |= 1 << 5
    second |= 1 << 7
  }
  return [
    (first & 170) | (firstInput & 85),
    (first & 85) | (firstInput & 170),
    (second & 170) | (secondInput & 85),
    (second & 85) | (secondInput & 170)
  ]
}

function makeVersionArray(version: string): number[] {
  const parts = version.split('.')
  const result = new Array<number>(parts.length)
  for (let index = 0; index < parts.length; index++) result[index] = ~~+parts[index]
  return result
}

function transformPayload(array: number[]): number[] {
  const result: number[] = []
  const mask1 = 145
  const mask2 = 110
  const mask3 = 66
  const mask4 = 189
  const mask5 = 44
  const mask6 = 211
  let index = 0
  while (index < array.length) {
    if (index + 2 < array.length) {
      const randomValue = (Math.random() * 1000) & 255
      result.push(
        (randomValue & mask1) | (array[index] & mask2),
        (randomValue & mask3) | (array[index + 1] & mask4),
        (randomValue & mask5) | (array[index + 2] & mask6),
        (array[index] & mask1) | (array[index + 1] & mask3) | (array[index + 2] & mask5)
      )
    } else {
      result.push(array[index])
      if (array[index + 1] !== void 0) result.push(array[index + 1])
    }
    index += 3
  }
  return result
}

export function makeABogus(uri: string): string {
  const values: unknown[] = []
  const ink = +Date.now() - 1
  envNavigator.vendorSubs = { ink }

  values[0] = []
  ;(values[0] as unknown[]).length = 22
  ;(values[0] as unknown[])[0] = {}
  ;(values[0] as unknown[])[1] = { length: 0 }
  ;(values[0] as unknown[])[2] = DY_SALT
  ;(values[0] as unknown[])[3] = enterPageTs
  ;(values[0] as unknown[])[4] = 1

  values[1] = []
  ;(values[1] as unknown[]).length = 9
  ;(values[1] as unknown[])[0] = 1
  ;(values[1] as unknown[])[1] = 0
  ;(values[1] as unknown[])[2] = 8
  ;(values[1] as unknown[])[3] = uri
  ;(values[1] as unknown[])[4] = ''
  ;(values[1] as unknown[])[5] = envNavigator.userAgent
  ;(values[1] as unknown[])[6] = pageId
  ;(values[1] as unknown[])[7] = aid
  ;(values[1] as unknown[])[8] = sdkVersion

  values[2] = 1
  values[3] = 0
  values[4] = 8
  values[5] = uri.endsWith(DY_SALT) ? uri : uri + DY_SALT
  values[6] = ''
  values[7] = envNavigator.userAgent.trim()
  values[8] = pageId
  values[9] = aid
  values[10] = sdkVersion

  const urlDigest = sm3DigestTwice(values[5] as string)
  const saltDigest = sm3DigestTwice(DY_SALT)
  const userAgentCipher = dyRc4(createKey(), values[7] as string)
  const encodedUserAgent = dyBase64(userAgentCipher, 's3', null)
  const userAgentDigest = sm3Digest(encodedUserAgent)

  values[11] = envNavigator.vendorSubs
  values[12] = 3
  envWindow.onwheelx = onwheelx as unknown
  values[13] = envWindow.onwheelx
  values[14] = +Date.now()

  values[15] = []
  values[16] = 1
  values[17] = 14
  values[18] = urlDigest
  values[19] = saltDigest
  values[20] = encodedUserAgent
  values[21] = userAgentDigest
  values[22] = ink
  values[23] = [3, 82]
  values[24] = 41
  values[25] = makeVersionArray(sdkVersion)

  const epoch = 1721836800000
  const now = Date.now()
  values[26] = ((now - epoch) / 1000 / 60 / 60 / 24 / 14) >> 0
  values[27] = 6
  values[28] = ((values[14] as number) - enterPageTs + 3) & 255
  values[29] = (values[14] as number) & 255
  values[30] = ((values[14] as number) >> 8) & 255
  values[31] = ((values[14] as number) >> 16) & 255
  values[32] = ((values[14] as number) >> 24) & 255
  values[33] = ((values[14] as number) / 256 / 256 / 256 / 256) & 255
  values[34] = ((values[14] as number) / 256 / 256 / 256 / 256 / 256) & 255
  values[35] = ((values[16] as number) % 256) & 255
  values[36] = ((values[16] as number) / 256) & 255

  values[37] = [0, 0, 0, 0, 129]
  values[38] = (values[37] as number[])[4] & 255
  values[39] = ((values[37] as number[])[4] >> 8) & 255
  values[40] = (values[37] as number[])[0]
  values[41] = (values[37] as number[])[1]
  values[42] = (values[37] as number[])[2]
  values[43] = (values[37] as number[])[3]
  values[44] = (values[17] as number) & 255
  values[45] = ((values[17] as number) >> 8) & 255
  values[46] = ((values[17] as number) >> 16) & 255
  values[47] = ((values[17] as number) >> 24) & 255
  values[48] = (values[18] as number[])[9]
  values[49] = (values[18] as number[])[18]
  values[50] = 3
  values[51] = (values[18] as number[])[3]
  values[52] = (values[19] as number[])[10]
  values[53] = (values[19] as number[])[19]
  values[54] = 4
  values[55] = (values[19] as number[])[4]
  values[56] = (values[21] as number[])[11]
  values[57] = (values[21] as number[])[21]
  values[58] = 5
  values[59] = (values[21] as number[])[5]
  values[60] = (values[22] as number) & 255
  values[61] = ((values[22] as number) >> 8) & 255
  values[62] = ((values[22] as number) >> 16) & 255
  values[63] = ((values[22] as number) >> 24) & 255
  values[64] = ((values[22] as number) / 256 / 256 / 256 / 256) & 255
  values[65] = ((values[22] as number) / 256 / 256 / 256 / 256 / 256) & 255
  values[66] = values[12]
  values[67] = (values[8] as number) & 255
  values[68] = ((values[8] as number) >> 8) & 255
  values[69] = ((values[8] as number) >> 16) & 255
  values[70] = ((values[8] as number) >> 24) & 255
  values[71] = (values[9] as number) & 255
  values[72] = ((values[9] as number) >> 8) & 255
  values[73] = ((values[9] as number) >> 16) & 255
  values[74] = ((values[9] as number) >> 24) & 255

  const windowSnapshot: Record<string, number> = {
    innerWidth: envWindow.innerWidth >> 0,
    innerHeight: envWindow.innerHeight >> 0,
    outerWidth: envWindow.outerWidth >> 0,
    outerHeight: envWindow.outerHeight >> 0,
    availWidth: envWindow.screen.availWidth >> 0,
    availHeight: envWindow.screen.availHeight >> 0,
    sizeWidth: envWindow.screen.width >> 0 === 0 ? 2560 : envWindow.screen.sizeWidth >> 0,
    sizeHeight: envWindow.screen.height >> 0 === 0 ? 1440 : envWindow.screen.sizeHeight >> 0,
    platform: envNavigator.platform as unknown as number
  }
  values[75] = windowSnapshot

  let serializedWindow = ''
  for (const key of Object.keys(windowSnapshot)) serializedWindow += windowSnapshot[key] + '|'
  serializedWindow = serializedWindow.substring(0, serializedWindow.length - 1)
  values[76] = serializedWindow

  const windowBytes: number[] = []
  for (let index = 0; index < serializedWindow.length; index++) windowBytes.push(serializedWindow.charCodeAt(index))
  values[77] = windowBytes
  values[78] = windowBytes.length
  values[79] = (values[78] as number) & 255
  values[80] = ((values[78] as number) >> 8) & 255

  const timingValue = (((values[14] as number) + 3) & 255) + ','
  values[81] = timingValue
  const timingBytes: number[] = []
  for (let index = 0; index < timingValue.length; index++) timingBytes.push(timingValue.charCodeAt(index))
  values[82] = timingBytes
  values[83] = timingBytes.length
  values[84] = (values[83] as number) & 255
  values[85] = ((values[83] as number) >> 8) & 255

  const version = values[25] as number[]
  const flaggedVersion = { 0: [version[0], version[1]], 1: 2, length: 2 }
  values[86] = random({ 0: [version[0], version[1]], length: 1 }).concat(random(flaggedVersion))

  const versionBytes = values[86] as number[]
  values[87] =
    (versionBytes[0] ^
      versionBytes[1] ^
      versionBytes[2] ^
      versionBytes[3] ^
      versionBytes[4] ^
      versionBytes[5] ^
      versionBytes[6] ^
      versionBytes[7]) ^
    (values[24] as number) ^
    (values[26] as number) ^
    (values[27] as number) ^
    (values[28] as number) ^
    (values[29] as number) ^
    (values[30] as number) ^
    (values[31] as number) ^
    (values[32] as number) ^
    (values[33] as number) ^
    (values[34] as number) ^
    (values[35] as number) ^
    (values[36] as number) ^
    (values[38] as number) ^
    (values[39] as number) ^
    (values[40] as number) ^
    (values[41] as number) ^
    (values[42] as number) ^
    (values[43] as number) ^
    (values[44] as number) ^
    (values[45] as number) ^
    (values[46] as number) ^
    (values[47] as number) ^
    (values[48] as number) ^
    (values[49] as number) ^
    (values[51] as number) ^
    (values[52] as number) ^
    (values[53] as number) ^
    (values[55] as number) ^
    (values[56] as number) ^
    (values[57] as number) ^
    (values[59] as number) ^
    (values[60] as number) ^
    (values[61] as number) ^
    (values[62] as number) ^
    (values[63] as number) ^
    (values[64] as number) ^
    (values[65] as number) ^
    (values[66] as number) ^
    (values[67] as number) ^
    (values[68] as number) ^
    (values[69] as number) ^
    (values[70] as number) ^
    (values[71] as number) ^
    (values[72] as number) ^
    (values[73] as number) ^
    (values[74] as number) ^
    (values[79] as number) ^
    (values[80] as number) ^
    (values[84] as number) ^
    (values[85] as number)

  const payload = [
    values[34],
    values[44],
    values[56],
    values[61],
    values[73],
    values[29],
    values[70],
    values[45],
    values[35],
    values[49],
    values[38],
    values[66],
    values[51],
    values[68],
    values[28],
    values[48],
    values[64],
    values[47],
    values[30],
    values[71],
    values[26],
    values[55],
    values[31],
    values[69],
    values[59],
    values[40],
    values[62],
    values[63],
    values[27],
    values[72],
    values[41],
    values[74],
    values[57],
    values[52],
    values[42],
    values[39],
    values[33],
    values[67],
    values[53],
    values[43],
    values[65],
    values[46],
    values[36],
    values[24],
    values[60],
    values[32],
    values[79],
    values[80],
    values[84],
    values[85]
  ] as number[]

  values[88] = payload.concat(windowBytes, timingBytes, [values[87] as number])
  const prefixBytes = random({ 0: values[23] as number[], 1: 1, length: 2 })
  const prefix = String.fromCharCode(...prefixBytes)
  values[89] = prefix
  values[90] = transformPayload(values[88] as number[])

  const encryptionKey = String.fromCharCode(211)
  const plainBytes = (values[86] as number[]).concat(values[90] as number[])
  const plain = String.fromCharCode(...plainBytes)
  values[91] = dyRc4(encryptionKey, plain)
  values[92] = prefix + (values[91] as string)
  values[93] = dyBase64(values[92] as string, 's4', null)
  return values[93] as string
}
