import crypto from 'node:crypto'

import { RequestHandler } from 'express'
import { createBadRequestResponse, createServerErrorResponse, logger } from 'node-karin'

/**
 * Base64解码
 * @param str Base64编码的字符串
 * @returns 解码后的字符串
 */
const base64Decode = (str: string): string => {
  return Buffer.from(str, 'base64').toString('utf8')
}

/**
 * URL解码
 * @param str URL编码的字符串
 * @returns 解码后的字符串
 */
const urlDecode = (str: string): string => {
  return decodeURIComponent(str)
}

/**
 * 十六进制解码
 * @param str 十六进制编码的字符串
 * @returns 解码后的字符串
 */
const hexDecode = (str: string): string => {
  return Buffer.from(str, 'hex').toString('utf8')
}

/**
 * 反转字符串
 * @param str 待反转字符串
 * @returns 反转后的字符串
 */
const reverseString = (str: string): string => {
  return str.split('').reverse().join('')
}

/**
 * 字符偏移解码
 * @param str 编码的字符串
 * @param offset 偏移量
 * @returns 解码后的字符串
 */
const charOffsetDecode = (str: string, offset: number = 5): string => {
  return str.split('').map(char => {
    const code = char.charCodeAt(0)
    return String.fromCharCode(code - offset)
  }).join('')
}

/**
 * 多层解码解密
 * @param str 多层编码的字符串
 * @returns 解码后的原始字符串
 */
const multiLayerDecode = (str: string): string => {
  try {
    // 第6层：Base64解码
    let decoded = base64Decode(str)

    // 第5层：URL解码
    decoded = urlDecode(decoded)

    // 第4层：Base64解码
    decoded = base64Decode(decoded)

    // 第3层：反转字符串
    decoded = reverseString(decoded)

    // 第2层：十六进制解码
    decoded = hexDecode(decoded)

    // 第1层：字符偏移解码
    decoded = charOffsetDecode(decoded, 5)

    return decoded
  } catch (error) {
    throw new Error('多层解码失败：' + error)
  }
}

/**
 * HMAC-SHA256签名验证中间件
 * @param req 请求对象
 * @param res 响应对象
 * @param next 下一个中间件函数
 */
export const signatureVerificationMiddleware: RequestHandler = (req, res, next) => {
  try {
    // 获取请求头中的签名信息
    const encodedSignature = req.headers['x-signature'] as string
    const timestamp = req.headers['x-timestamp'] as string
    const nonce = req.headers['x-nonce'] as string
    const token = req.headers['authorization']?.replace('Bearer ', '') || ''

    if (!encodedSignature || !timestamp || !nonce) {
      return createBadRequestResponse(res, '缺少必要的签名参数')
    }

    // 检查时间戳是否在有效范围内（5分钟内）
    const currentTime = Date.now()
    const requestTime = parseInt(timestamp)
    const timeDiff = Math.abs(currentTime - requestTime)

    if (timeDiff > 5 * 60 * 1000) { // 5分钟
      return createBadRequestResponse(res, '请求时间戳已过期')
    }

    // 解码签名
    let decodedSignature: string
    try {
      decodedSignature = multiLayerDecode(encodedSignature)
    } catch (error) {
      return createBadRequestResponse(res, '签名格式错误：' + error)
    }

    // 构建签名字符串，使用|分割
    const method = req.method.toUpperCase()
    const url = (req.headers['x-original-url'] as string) || req.originalUrl
    const body = req.method === 'GET' ? '' : JSON.stringify(req.body || {})

    // 签名字符串格式：METHOD|URL|BODY|TIMESTAMP|NONCE
    const signatureString = `${method}|${url}|${body}|${timestamp}|${nonce}`

    // 使用token作为密钥生成HMAC-SHA256签名
    const expectedSignature = crypto
      .createHmac('sha256', token)
      .update(signatureString)
      .digest('hex')

    // 验证签名
    if (decodedSignature !== expectedSignature) {
      logger.warn(`签名验证失败: 期望=${expectedSignature}, 解码后实际=${decodedSignature}, 签名字符串=${signatureString}`)
      return createBadRequestResponse(res, '签名验证失败')
    }

    next()
  } catch (error: any) {
    logger.error('签名验证中间件错误:', error)
    return createServerErrorResponse(res, '签名验证失败')
  }
}
