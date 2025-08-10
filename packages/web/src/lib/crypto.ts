import CryptoJS from 'crypto-js'

/**
 * 使用crypto-js库进行同步SHA256哈希计算
 * @param data 待加密的数据
 * @returns SHA256哈希值的十六进制字符串
 */
export const sha256HashSync = (data: string): string => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex)
}

/**
 * 生成随机字符串作为nonce
 * @param length 字符串长度，默认16位
 * @returns 随机字符串
 */
export const generateNonce = (length: number = 16): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Base64编码
 * @param str 待编码字符串
 * @returns Base64编码后的字符串
 */
export const base64Encode = (str: string): string => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str))
}

/**
 * URL编码
 * @param str 待编码字符串
 * @returns URL编码后的字符串
 */
export const urlEncode = (str: string): string => {
  return encodeURIComponent(str)
}

/**
 * 十六进制编码
 * @param str 待编码字符串
 * @returns 十六进制编码后的字符串
 */
export const hexEncode = (str: string): string => {
  return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(str))
}

/**
 * 反转字符串
 * @param str 待反转字符串
 * @returns 反转后的字符串
 */
export const reverseString = (str: string): string => {
  return str.split('').reverse().join('')
}

/**
 * 字符偏移编码（类似凯撒密码）
 * @param str 待编码字符串
 * @param offset 偏移量
 * @returns 编码后的字符串
 */
export const charOffsetEncode = (str: string, offset: number = 3): string => {
  return str.split('').map(char => {
    const code = char.charCodeAt(0)
    return String.fromCharCode(code + offset)
  }).join('')
}

/**
 * 多层编码加密
 * @param str 待加密字符串
 * @returns 多层编码后的字符串
 */
export const multiLayerEncode = (str: string): string => {
  // 第1层：字符偏移编码
  let encoded = charOffsetEncode(str, 5)
  
  // 第2层：十六进制编码
  encoded = hexEncode(encoded)
  
  // 第3层：反转字符串
  encoded = reverseString(encoded)
  
  // 第4层：Base64编码
  encoded = base64Encode(encoded)
  
  // 第5层：URL编码
  encoded = urlEncode(encoded)
  
  // 第6层：再次Base64编码
  encoded = base64Encode(encoded)
  
  return encoded
}

/**
 * 生成请求签名
 * @param method HTTP方法
 * @param url 请求URL
 * @param body 请求体
 * @param timestamp 时间戳
 * @param nonce 随机字符串
 * @param secretKey 密钥
 * @returns 多层编码的HMAC-SHA256签名
 */
export const generateSignature = (
  method: string,
  url: string,
  body: string,
  timestamp: string,
  nonce: string,
  secretKey: string
): string => {
  // 签名字符串格式：METHOD|URL|BODY|TIMESTAMP|NONCE
  const signatureString = `${method.toUpperCase()}|${url}|${body}|${timestamp}|${nonce}`
  
  // 使用HMAC-SHA256生成原始签名
  const rawSignature = CryptoJS.HmacSHA256(signatureString, secretKey).toString(CryptoJS.enc.Hex)
  
  // 对签名进行多层编码加密
  return multiLayerEncode(rawSignature)
}