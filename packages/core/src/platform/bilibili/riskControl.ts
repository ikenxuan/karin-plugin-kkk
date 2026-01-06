import util from 'node:util'

import karin, { logger, segment } from 'node-karin'

import { AmagiError, bilibiliFetcher } from '@/module/utils/amagiClient'
import { type ErrorStrategy, registerErrorStrategy, renderErrorImage, sendErrorToMaster } from '@/module/utils/ErrorHandler'

/**
 * B站风控验证策略
 * 处理 -352 错误码，引导用户完成人机验证
 */
export const bilibiliRiskControlStrategy: ErrorStrategy = {
  name: 'BilibiliRiskControl',

  match: (ctx) => {
    const { error, event } = ctx
    return error instanceof AmagiError && error.code === -352 && !!error.data?.data?.v_voucher && !!event
  },

  async handle (ctx) {
    const { error, event } = ctx
    if (!event) return 'continue'

    const amagiError = error as AmagiError
    logger.info('[BilibiliRiskControl] 检测到B站风控(-352)，开始申请验证码...')

    // 申请验证码
    const verification = await bilibiliFetcher.requestCaptchaFromVoucher({
      v_voucher: amagiError.data.data.v_voucher,
      typeMode: 'strict'
    })

    if (!verification.data?.data?.geetest) {
      logger.error('[BilibiliRiskControl] 申请验证码失败')
      return 'continue'
    }

    const geetest = verification.data.data.geetest
    const token = verification.data.data.token
    const verifyUrl = `https://karin-plugin-kkk-docs.vercel.app/geetest?v=3&gt=${geetest.gt}&challenge=${geetest.challenge}`

    // 渲染带二维码的验证图片
    const img = await renderErrorImage(ctx, {
      platform: 'bilibili',
      errorName: 'BilibiliRiskControl',
      errorMessage: 'B站风控验证',
      stack: util.inspect(error, { depth: 1, colors: true })
        .replace(/\x1b\[90m/g, '\x1b[90;2m')
        .replace(/\x1b\[32m/g, '\x1b[31m'),
      isVerification: true,
      verificationUrl: verifyUrl,
      share_url: verifyUrl
    })

    // 发送给触发者
    await event.reply([segment.text('检测到B站风控，请在「120 秒内」扫描二维码完成验证后发送验证结果\n'), ...img])

    // 发送给主人
    await sendErrorToMaster(ctx, img)

    const resultCtx = await karin.ctx(event)
    const params = new URLSearchParams(resultCtx.msg)
    const validate = params.get('validate')
    const seccode = params.get('seccode')

    if (!validate || !seccode) {
      event.reply('验证参数不完整，请确保包含 validate 和 seccode')
      return 'handled'
    }

    try {
      const verifyResult = await bilibiliFetcher.validateCaptchaResult({
        challenge: geetest.challenge,
        token,
        validate,
        seccode,
        typeMode: 'strict'
      })

      if (verifyResult.success && verifyResult.data?.data?.grisk_id) {
        logger.info(`[BilibiliRiskControl] 验证成功，grisk_id: ${verifyResult.data.data.grisk_id}`)
        event.reply('✅ 验证成功！请重新发送命令')
        return 'handled'
      }
      event.reply('❌ 验证失败，请重试')
    } catch (err) {
      logger.error(`[BilibiliRiskControl] 验证请求失败: ${err}`)
      if (err instanceof AmagiError) {
        // csrf 校验失败
        if (err.code === -111) {
          event.reply('❌ 验证失败，建议使用「#B站登录」重新配置 ck 以绕过风控')
          return 'handled'
        }
        event.reply(`❌ 验证失败: ${err.rawError?.errorDescription}`)
      } else {
        event.reply(`❌ 验证失败: ${(err as Error).message}`)
      }
    }
    return 'handled'
  }
}

// 注册策略
registerErrorStrategy(bilibiliRiskControlStrategy)
