import axios from 'axios'

import { PlatformType } from '../types/platforms'

export const version = {
  pluginName: 'kkk',
  pluginVersion: '2.0.0',
  releaseType: 'Stable',
  poweredBy: 'karin'
}

/**
 * 数据服务类
 */
export class DataService {
  private static instance: DataService
  private baseUrl = '/api'
  private axiosInstance = axios.create({
    baseURL: this.baseUrl,
    timeout: 10000
  })

  /**
   * 获取单例实例
   * @returns DataService实例
   */
  static getInstance (): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService()
    }
    return DataService.instance
  }

  /**
   * 获取模板数据
   * @param platform 平台类型
   * @param templateId 模板ID
   * @param filename 数据文件名（可选）
   * @returns 模板数据
   */
  async getTemplateData (platform: PlatformType, templateId: string, filename?: string): Promise<any> {
    try {
      const url = filename
        ? `/data/${platform}/${templateId}/${filename}`
        : `/data/${platform}/${templateId}`
      const response = await this.axiosInstance.get(url)
      return response.data
    } catch (error) {
      console.error(`获取${platform}/${templateId}数据失败:`, error)
      throw new Error(`获取${platform}/${templateId}数据失败`)
    }
  }

  /**
   * 保存模板数据
   * @param platform 平台类型
   * @param templateId 模板ID
   * @param data 数据对象
   * @param filename 文件名（可选）
   */
  async saveTemplateData (platform: PlatformType, templateId: string, data: any, filename?: string): Promise<void> {
    try {
      const url = filename
        ? `/data/${platform}/${templateId}/files/${filename}`
        : `/data/${platform}/${templateId}`
      await this.axiosInstance.post(url, data)
    } catch (error) {
      console.error(`保存${platform}/${templateId}数据失败:`, error)
      throw new Error(`保存${platform}/${templateId}数据失败`)
    }
  }

  /**
   * 获取可用的数据文件列表
   * @param platform 平台类型
   * @param templateId 模板ID
   * @returns 文件名列表
   */
  async getAvailableDataFiles (platform: PlatformType, templateId: string): Promise<string[]> {
    try {
      const response = await this.axiosInstance.get(`/data/${platform}/${templateId}/files`)
      return response.data.files || []
    } catch (error) {
      console.error(`获取${platform}/${templateId}文件列表失败:`, error)
      return []
    }
  }

  /**
   * 删除数据文件
   * @param platform 平台类型
   * @param templateId 模板ID
   * @param filename 文件名
   */
  async deleteDataFile (platform: PlatformType, templateId: string, filename: string): Promise<void> {
    try {
      await this.axiosInstance.delete(`/data/${platform}/${templateId}/${filename}`)
    } catch (error) {
      console.error(`删除${platform}/${templateId}/${filename}失败:`, error)
      throw new Error('删除数据文件失败')
    }
  }

  /**
   * 生成二维码
   * @param url 链接地址
   * @param useDarkTheme 是否使用深色主题
   * @returns 二维码数据URL
   */
  async generateQRCode (url: string, useDarkTheme: boolean = false): Promise<string> {
    try {
      const response = await this.axiosInstance.get('/qrcode', {
        params: { url, useDarkTheme }
      })
      return response.data.dataUrl
    } catch (error) {
      console.error('生成二维码失败:', error)
      throw new Error('生成二维码失败')
    }
  }
}
