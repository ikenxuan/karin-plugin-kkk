/**
 * 配置管理 API
 * 提供配置的增删改查接口，供 APP 端使用
 */
import { createBadRequestResponse, createServerErrorResponse, createSuccessResponse } from 'node-karin'
import type { Request, Response } from 'node-karin/express'

import { reloadAmagiConfig } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'
import type { ConfigType } from '@/types'

/**
 * 获取所有配置
 * GET /kkk/web/v1/config
 */
export const getAllConfig = async (_req: Request, res: Response) => {
  try {
    const config = await Config.All()
    return createSuccessResponse(res, config)
  } catch (error: any) {
    return createServerErrorResponse(res, `获取配置失败: ${error.message}`)
  }
}

/**
 * 批量更新配置
 * POST /kkk/web/v1/config
 * Body: Partial<ConfigType>
 */
export const updateAllConfig = async (req: Request, res: Response) => {
  try {
    const newConfig = req.body as Partial<ConfigType>

    if (!newConfig || typeof newConfig !== 'object') {
      return createBadRequestResponse(res, '请求体必须是有效的配置对象')
    }

    const oldConfig = await Config.All()
    const results: { module: string; success: boolean; error?: string }[] = []
    let needReloadAmagi = false

    for (const [module, config] of Object.entries(newConfig)) {
      try {
        if (!(module in oldConfig)) {
          results.push({ module, success: false, error: `配置模块 "${module}" 不存在` })
          continue
        }

        const moduleName = module as keyof ConfigType
        const success = await Config.ModifyPro(moduleName, config)
        results.push({ module, success })

        // cookies 与 request 会影响 amagi 客户端运行态，保存后需要立即重载。
        if (success && (moduleName === 'cookies' || moduleName === 'request')) {
          needReloadAmagi = true
        }
      } catch (error: any) {
        results.push({ module, success: false, error: error.message })
      }
    }

    // 同步数据库
    if ('pushlist' in newConfig) {
      await Config.syncConfigToDatabase()
    }

    if (needReloadAmagi) {
      reloadAmagiConfig()
    }

    const allSuccess = results.every((r) => r.success)
    const updatedConfig = await Config.All()

    return createSuccessResponse(
      res,
      {
        config: updatedConfig,
        results
      },
      allSuccess ? '所有配置更新成功' : '部分配置更新失败'
    )
  } catch (error: any) {
    return createServerErrorResponse(res, `配置更新失败: ${error.message}`)
  }
}
