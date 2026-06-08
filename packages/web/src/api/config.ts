/**
 * 配置相关 API 接口
 */

import type { ConfigType } from '../types/config'
import type { ApiResponse } from '../types/api'
import { authClient } from '../auth/request'

/** API 基础 URL，开发环境由 Vite 反代到 Karin 7777，生产环境走同源 Karin 路由。 */
const API_BASE_URL = '/api/kkk/v1'

/**
 * 获取配置
 * @returns Promise<ConfigType>
 */
export const getConfig = async (): Promise<ConfigType> => {
  const response = await authClient.get<ApiResponse<ConfigType>>(`${API_BASE_URL}/config`)
  if (response.data.success && response.data.data) {
    return response.data.data
  }
  throw new Error(response.data.message || '获取配置失败')
}

/**
 * 保存配置
 * @param config 配置数据
 * @returns Promise<void>
 */
export const saveConfig = async (config: ConfigType): Promise<void> => {
  const response = await authClient.post<ApiResponse>(`${API_BASE_URL}/config`, config)
  if (!response.data.success) {
    throw new Error(response.data.message || '保存配置失败')
  }
}
