/**
 * 配置管理 API
 * 提供配置的增删改查接口，供 APP 端使用
 */
import type { Request, Response } from 'node-karin/express'

import { Config } from '@/module/utils/Config'
import type { ConfigType } from '@/types'

/**
 * 获取所有配置
 * GET /api/kkk/v1/config
 */
export const getAllConfig = async (_req: Request, res: Response) => {
  try {
    const config = await Config.All()
    res.json({
      success: true,
      message: '获取配置成功',
      data: config
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `获取配置失败: ${error.message}`,
      data: null
    })
  }
}

/**
 * 获取指定配置模块
 * GET /api/kkk/v1/config/:module
 */
export const getConfigModule = async (req: Request, res: Response) => {
  try {
    const { module } = req.params as { module: keyof ConfigType }
    const allConfig = await Config.All()

    if (!(module in allConfig)) {
      return res.status(400).json({
        success: false,
        message: `配置模块 "${module}" 不存在`,
        data: null
      })
    }

    res.json({
      success: true,
      message: '获取配置成功',
      data: allConfig[module]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `获取配置失败: ${error.message}`,
      data: null
    })
  }
}

/**
 * 更新指定配置模块
 * PUT/POST /api/kkk/v1/config/:module
 */
export const updateConfigModule = async (req: Request, res: Response) => {
  try {
    const { module } = req.params as { module: keyof ConfigType }
    // 支持两种格式：直接传配置对象，或者 { config: 配置对象 }
    const newConfig = req.body?.config || req.body

    if (!newConfig || typeof newConfig !== 'object') {
      return res.status(400).json({
        success: false,
        message: '请求体必须是有效的配置对象',
        data: null
      })
    }

    // 移除可能存在的 _method 字段
    if ('_method' in newConfig) {
      delete newConfig._method
    }

    const allConfig = await Config.All()
    if (!(module in allConfig)) {
      return res.status(400).json({
        success: false,
        message: `配置模块 "${module}" 不存在`,
        data: null
      })
    }

    // 使用 ModifyPro 保存配置（保留注释）
    const success = await Config.ModifyPro(module, newConfig)

    if (success) {
      // 如果是 pushlist，同步到数据库
      if (module === 'pushlist') {
        await Config.syncConfigToDatabase()
      }

      // 返回更新后的配置
      const updatedConfig = await Config.All()
      res.json({
        success: true,
        message: '配置更新成功',
        data: updatedConfig[module]
      })
    } else {
      res.status(500).json({
        success: false,
        message: '配置更新失败',
        data: null
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `配置更新失败: ${error.message}`,
      data: null
    })
  }
}

/**
 * 更新单个配置项
 * PATCH /api/kkk/v1/config/:module
 * Body: { key: string, value: any }
 */
export const patchConfigItem = async (req: Request, res: Response) => {
  try {
    const { module } = req.params as { module: keyof ConfigType }
    const { key, value } = req.body

    if (!key) {
      return res.status(400).json({
        success: false,
        message: '缺少配置项 key',
        data: null
      })
    }

    const allConfig = await Config.All()
    if (!(module in allConfig)) {
      return res.status(400).json({
        success: false,
        message: `配置模块 "${module}" 不存在`,
        data: null
      })
    }

    // 使用 Modify 更新单个配置项
    Config.Modify(module, key, value)

    // 返回更新后的配置
    const updatedConfig = await Config.All()
    res.json({
      success: true,
      message: '配置项更新成功',
      data: updatedConfig[module]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `配置项更新失败: ${error.message}`,
      data: null
    })
  }
}

/**
 * 批量更新配置
 * PUT /api/kkk/v1/config
 * Body: Partial<ConfigType>
 */
export const updateAllConfig = async (req: Request, res: Response) => {
  try {
    const newConfig = req.body as Partial<ConfigType>

    if (!newConfig || typeof newConfig !== 'object') {
      return res.status(400).json({
        success: false,
        message: '请求体必须是有效的配置对象',
        data: null
      })
    }

    const results: { module: string; success: boolean; error?: string }[] = []

    for (const [module, config] of Object.entries(newConfig)) {
      try {
        const success = await Config.ModifyPro(module as keyof ConfigType, config)
        results.push({ module, success })
      } catch (error: any) {
        results.push({ module, success: false, error: error.message })
      }
    }

    // 同步数据库
    if ('pushlist' in newConfig) {
      await Config.syncConfigToDatabase()
    }

    const allSuccess = results.every(r => r.success)
    const updatedConfig = await Config.All()

    res.json({
      success: allSuccess,
      message: allSuccess ? '所有配置更新成功' : '部分配置更新失败',
      data: {
        config: updatedConfig,
        results
      }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `配置更新失败: ${error.message}`,
      data: null
    })
  }
}
