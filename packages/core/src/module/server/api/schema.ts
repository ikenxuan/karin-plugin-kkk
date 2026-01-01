/**
 * 配置 Schema API
 * 提供配置项元数据接口，供移动 APP 动态渲染配置界面
 */
import type { Request, Response } from 'express'

import { getConfigSchema, getModuleSchema } from '@/module/config'

/**
 * 获取完整配置 Schema
 * GET /api/kkk/v1/schema
 */
export const getFullSchema = async (_req: Request, res: Response) => {
  try {
    const schema = getConfigSchema()
    res.json({
      success: true,
      message: '获取配置 Schema 成功',
      data: schema
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `获取配置 Schema 失败: ${error.message}`,
      data: null
    })
  }
}

/**
 * 获取指定模块的 Schema
 * GET /api/kkk/v1/schema/:module
 */
export const getModuleSchemaApi = async (req: Request, res: Response) => {
  try {
    const { module } = req.params
    const schema = getModuleSchema(module)

    if (!schema) {
      return res.status(404).json({
        success: false,
        message: `配置模块 "${module}" 的 Schema 不存在`,
        data: null
      })
    }

    res.json({
      success: true,
      message: '获取配置 Schema 成功',
      data: schema
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `获取配置 Schema 失败: ${error.message}`,
      data: null
    })
  }
}

