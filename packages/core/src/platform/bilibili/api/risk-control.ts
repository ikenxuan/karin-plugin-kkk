/**
 * B站风控处理 API
 */
import {
  createBadRequestResponse,
  createServerErrorResponse,
  createSuccessResponse,
  logger
} from 'node-karin'
import type { RequestHandler } from 'node-karin/express'

import { AmagiError, bilibiliFetcher } from '@/module/utils/amagiClient'

/**
 * 风控验证数据接口
 */
export interface RiskControlData {
  type: 'bilibili_risk_control' | 'bilibili_risk_control_no_voucher'
  geetest?: {
    gt: string
    challenge: string
  }
  token?: string
  v_voucher?: string
  message?: string
}

/**
 * 创建风控错误响应
 */
export const createRiskControlResponse = (
  res: any,
  geetest: { gt: string; challenge: string },
  token: string,
  v_voucher: string
) => {
  return res.status(452).json({
    message: 'B站风控验证',
    code: -352,
    data: {
      type: 'bilibili_risk_control',
      geetest,
      token,
      v_voucher
    }
  })
}

/**
 * 创建无法验证的风控错误响应
 */
export const createRiskControlNoVoucherResponse = (
  res: any,
  code: number
) => {
  return res.status(452).json({
    message: 'B站风控',
    code,
    data: {
      type: 'bilibili_risk_control_no_voucher',
      message: code === -352 
        ? 'B站风控校验失败，请稍后重试或更换 Cookie'
        : '当前IP被B站风控，请稍后重试或更换网络'
    }
  })
}

/**
 * 处理 B站风控错误
 * 检测 -352 和 -412 错误并申请验证码
 */
export const handleBilibiliRiskControl = async (
  error: unknown,
  res: any
): Promise<boolean> => {
  if (!(error instanceof AmagiError)) {
    return false
  }

  if (error.code !== -352 && error.code !== -412) {
    return false
  }

  const v_voucher = error.data?.data?.v_voucher
  if (!v_voucher) {
    logger.info(`[BilibiliAPI] 检测到风控(${error.code})，但无 v_voucher`)
    createRiskControlNoVoucherResponse(res, error.code)
    return true
  }

  try {
    logger.info(`[BilibiliAPI] 检测到风控(${error.code})，申请验证码...`)
    const verification = await bilibiliFetcher.requestCaptchaFromVoucher({
      v_voucher,
      typeMode: 'strict'
    })

    if (!verification.data?.data?.geetest) {
      logger.error('[BilibiliAPI] 申请验证码失败')
      createRiskControlNoVoucherResponse(res, error.code)
      return true
    }

    const geetest = verification.data.data.geetest
    const token = verification.data.data.token

    createRiskControlResponse(res, {
      gt: geetest.gt,
      challenge: geetest.challenge
    }, token, v_voucher)

    return true
  } catch (err) {
    logger.error('[BilibiliAPI] 申请验证码异常:', err)
    createRiskControlNoVoucherResponse(res, error.code)
    return true
  }
}

/**
 * B站风控验证结果提交
 * POST /api/v1/platforms/bilibili/verify
 * Body: { challenge, token, validate, seccode }
 */
export const verifyCaptcha: RequestHandler = async (req, res) => {
  try {
    const { challenge, token, validate, seccode } = req.body

    if (!challenge || !token || !validate || !seccode) {
      return createBadRequestResponse(res, '验证参数不完整')
    }

    logger.info('[BilibiliAPI] 提交风控验证结果...')

    const verifyResult = await bilibiliFetcher.validateCaptchaResult({
      challenge,
      token,
      validate,
      seccode,
      typeMode: 'strict'
    })

    if (verifyResult.success && verifyResult.data?.data?.grisk_id) {
      logger.info(`[BilibiliAPI] 验证成功，grisk_id: ${verifyResult.data.data.grisk_id}`)
      return createSuccessResponse(res, { 
        success: true, 
        message: '验证成功',
        grisk_id: verifyResult.data.data.grisk_id 
      })
    }

    return createSuccessResponse(res, { 
      success: false, 
      message: '验证失败，请重试' 
    })
  } catch (error) {
    logger.error('[BilibiliAPI] 验证请求失败:', error)
    
    if (error instanceof AmagiError) {
      if (error.code === -111) {
        return createSuccessResponse(res, { 
          success: false, 
          message: '验证失败，建议重新配置 B站 Cookie' 
        })
      }
      return createSuccessResponse(res, { 
        success: false, 
        message: error.rawError?.errorDescription || '验证失败' 
      })
    }
    
    return createServerErrorResponse(res, '验证请求失败')
  }
}
