import karin from 'node-karin'

import { getBilibiliData } from '@/module/utils/amagiClient'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler'

/**
 * B站风控验证测试命令
 * 用于测试 -352 风控验证流程
 */
export const testVerification = karin.command(
  /^#?测试b站验证$/,
  wrapWithErrorHandler(async (e) => {
    // 模拟请求触发风控（连续请求直到触发 -352）
    for (let i = 0; i < 200; i++) {
      // 这里会自动被 amagiClient 的 proxy 捕获并抛出错误
      // wrapWithErrorHandler 会捕获 -352 错误并触发验证流程
      // logger.debug(`第 ${i + 1} 次`)
      await getBilibiliData('用户空间详细信息', { host_mid: 114514, typeMode: 'strict' })
    }

    await e.reply('未触发风控，测试完成')
    return e
  }, { businessName: '测试B站验证' })
)
