import { RenderRequest, RenderResponse } from './types'

/**
 * 渲染客户端类
 */
export class RenderClient {
  private serverUrl: string

  /**
   * 构造函数
   * @param serverUrl 渲染服务器地址，默认为 http://localhost:3001
   */
  constructor (serverUrl = 'http://localhost:3001') {
    this.serverUrl = serverUrl
  }

  /**
   * 渲染组件为HTML文件
   * @param request 渲染请求参数
   * @returns 渲染结果Promise
   */
  async render (request: RenderRequest): Promise<RenderResponse> {
    try {
      const response = await fetch(`${this.serverUrl}/render`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '网络请求失败'
      }
    }
  }

  /**
   * 检查服务器健康状态
   * @returns 健康状态Promise
   */
  async checkHealth (): Promise<boolean> {
    try {
      const response = await fetch(`${this.serverUrl}/health`)
      return response.ok
    } catch {
      return false
    }
  }
}