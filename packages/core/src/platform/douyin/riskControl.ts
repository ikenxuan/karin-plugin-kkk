import { segment } from 'node-karin'

import { createCaptchaSession, resolveBrowserBaseUrl } from '@/module/utils/CaptchaSession'
import { AmagiError } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'
import {
  type ErrorStrategy,
  registerErrorStrategy,
  renderErrorImage,
  sendErrorToAllMasters,
  sendErrorToMaster
} from '@/module/utils/ErrorHandler'
import { logger } from '@/module/utils/logger'

/**
 * 抖音人机验证策略
 *
 * 抖音撞 TTGCaptcha 滑块（`subtype: "slide"`）时纯程序化过不去，amagi 把
 * 挑战转出来（`kind: 'risk'` + `challenge.bizName === 'TTGCaptcha'`）。
 * 这里创建一个一次性验证会话并把验证页链接发给用户：用户在浏览器里完成
 * 真人滑块，页面自动把验证期间新种的可读 cookie 上报回
 * `/kkk/captcha/douyin/<token>/done`，后端合并进 `Config.amagi.cookies.douyin`
 * 并重载 Amagi client，随后提示用户重发原命令 —— 重放时带着新凭证即可过 WAF。
 */
export const douyinRiskControlStrategy: ErrorStrategy = {
  name: 'DouyinRiskControl',

  match: (ctx) => {
    const { error, event } = ctx
    return error instanceof AmagiError && error.kind === 'risk' && error.challenge?.bizName === 'TTGCaptcha' && !!event
  },

  async handle(ctx) {
    const { error, event } = ctx
    if (!event) return 'continue'

    const amagiError = error as AmagiError
    const challenge = amagiError.challenge

    // 自建验证页必须要有 SDK 地址与完整 verify_data；缺了就退回默认错误处理
    if (!challenge?.jsSdkUrl || !challenge.verifyData || typeof challenge.verifyData !== 'object') {
      logger.warn('[DouyinRiskControl] 挑战缺少自建验证页必需信息（jsSdkUrl / verifyData），走默认错误处理')
      return 'continue'
    }

    logger.info('[DouyinRiskControl] 检测到抖音 TTGCaptcha 滑块风控，生成人工验证会话...')

    // 创建一次性验证会话：验证页 URL 里带 token，完成回填后一次性消费
    const token = createCaptchaSession(challenge, Config.amagi.cookies.douyin ?? '', event)
    const baseUrl = await resolveBrowserBaseUrl()
    const verifyUrl = `${baseUrl}/kkk/captcha/douyin/${token}`

    // 渲染带验证链接的错误图片
    const img = await renderErrorImage(ctx, {
      platform: 'douyin',
      errorName: 'DouyinRiskControl',
      errorMessage: '抖音人机验证',
      isVerification: true,
      verificationUrl: verifyUrl,
      share_url: verifyUrl
    })

    // 发送给触发者
    await event.reply([
      segment.text('检测到抖音人机验证，请点击下方链接在浏览器中完成滑块验证，完成后重新发送原命令\n'),
      ...img
    ])

    // 发送给主人（单个或所有）
    await sendErrorToMaster(ctx, img)
    await sendErrorToAllMasters(ctx, img)

    return 'handled'
  }
}

// 注册策略
registerErrorStrategy(douyinRiskControlStrategy)