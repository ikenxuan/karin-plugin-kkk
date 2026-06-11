/**
 * 配置相关 API 接口
 */
import type { ApiResponse } from '../types/api'
import type { ConfigType } from '../types/config'
import { authClient } from '../auth/request'

/** API 基础 URL */
const API_BASE_URL = '/kkk/v1'

const unwrapResponse = <T>(response: ApiResponse<T>, fallbackMessage: string): T => {
  if ((response.success || response.code === 200) && response.data !== undefined) return response.data
  throw new Error(response.message || fallbackMessage)
}

/**
 * 获取配置
 */
export const getConfig = async (): Promise<ConfigType> => {
  const response = await authClient.get<ApiResponse<ConfigType>>(`${API_BASE_URL}/config`)
  return unwrapResponse(response.data, '获取配置失败')
}

/**
 * 保存配置
 */
export const saveConfig = async (config: ConfigType): Promise<void> => {
  const response = await authClient.post<ApiResponse<void>>(`${API_BASE_URL}/config`, config)
  unwrapResponse(response.data, '保存配置失败')
}
