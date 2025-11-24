import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { logger } from './logger'

const __dirname = fileURLToPath(new URL('..', import.meta.url))
const devDataDir = path.resolve(__dirname, '../dev-data')

// 保留的最大版本数
const MAX_VERSIONS_PER_TEMPLATE = 10

/**
 * 版本记录接口
 */
interface VersionRecord {
  file: string
  timestamp: number
  date: string
}

/**
 * 版本记录文件接口
 */
interface VersionsFile {
  versions: VersionRecord[]
  lastUpdated: number
}

/**
 * 开发数据管理器
 * 用于在开发环境中自动保存渲染数据到本地文件
 */
export class DevDataManager {
  /**
   * 检查是否在开发环境
   * @returns 是否在开发环境
   */
  private static isDevEnvironment (): boolean {
    return process.env.NODE_ENV === 'development'
  }

  /**
   * 确保目录存在
   * @param dirPath 目录路径
   */
  private static ensureDir (dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  }

  /**
   * 获取平台数据目录
   * @param platform 平台类型
   * @param templateName 模板名称
   * @returns 完整的目录路径
   */
  static getTemplateDataDir (platform: string, templateName: string): string {
    const sanitizedTemplateName = templateName.replace(/\//g, '_')
    const dir = path.join(devDataDir, platform, sanitizedTemplateName)
    this.ensureDir(dir)
    return dir
  }

  /**
   * 生成带日期时间的版本文件名
   * 格式：YYYY-MM-DD HHhmmss.json
   * @returns 版本化文件名
   */
  private static generateVersionedFilename (): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}h${minutes}m${seconds}s.json`
  }

  /**
   * 获取版本记录文件路径
   * @param dir 模板数据目录
   * @returns 版本记录文件路径
   */
  private static getVersionsFilePath (dir: string): string {
    return path.join(dir, 'versions.json')
  }

  /**
   * 读取版本记录文件
   * @param dir 模板数据目录
   * @returns 版本记录对象
   */
  private static readVersionsFile (dir: string): VersionsFile {
    try {
      const filePath = this.getVersionsFilePath(dir)
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(content)
      }
    } catch (error) {
      logger.error('读取版本记录文件失败:', error)
    }

    return { versions: [], lastUpdated: 0 }
  }

  /**
   * 写入版本记录文件
   * @param dir 模板数据目录
   * @param versionsData 版本记录数据
   */
  private static writeVersionsFile (dir: string, versionsData: VersionsFile): void {
    try {
      const filePath = this.getVersionsFilePath(dir)
      fs.writeFileSync(filePath, JSON.stringify(versionsData, null, 2), 'utf-8')
    } catch (error) {
      logger.error('写入版本记录文件失败:', error)
    }
  }

  /**
   * 清理过期的版本文件，只保留最新的 N 个版本
   * @param dir 模板数据目录
   * @param versionsData 版本记录数据
   */
  private static cleanupOldVersions (dir: string, versionsData: VersionsFile): void {
    try {
      // 如果版本数超过限制，删除最旧的
      while (versionsData.versions.length > MAX_VERSIONS_PER_TEMPLATE) {
        const oldestVersion = versionsData.versions.shift()
        if (oldestVersion) {
          const filePath = path.join(dir, oldestVersion.file)
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
          }
        }
      }

      // 更新版本记录
      this.writeVersionsFile(dir, versionsData)
    } catch (error) {
      logger.error('清理旧版本文件出错:', error)
    }
  }

  /**
   * 保存渲染数据到开发数据目录
   * 逻辑：
   * 1. 如果 default.json 不存在，直接创建
   * 2. 如果 default.json 存在，先将其迁移为版本文件，再创建新的 default.json
   * @param platform 平台类型
   * @param templateName 模板名称
   * @param data 要保存的数据
   * @returns 是否保存成功
   */
  static saveRenderData (
    platform: string,
    templateName: string,
    data: any
  ): boolean {
    // 只在开发环境下保存
    if (!this.isDevEnvironment()) {
      return false
    }

    try {
      const dir = this.getTemplateDataDir(platform, templateName)
      const defaultFilePath = path.join(dir, 'default.json')

      // 读取当前版本记录
      let versionsData = this.readVersionsFile(dir)

      // 如果 default.json 已存在，将其迁移为版本文件
      if (fs.existsSync(defaultFilePath)) {
        const versionedFilename = this.generateVersionedFilename()
        const versionedFilePath = path.join(dir, versionedFilename)

        // 将旧的 default.json 迁移为版本文件
        const oldData = fs.readFileSync(defaultFilePath, 'utf-8')
        fs.writeFileSync(versionedFilePath, oldData, 'utf-8')

        // 添加到版本记录
        const now = new Date()
        versionsData.versions.push({
          file: versionedFilename,
          timestamp: now.getTime(),
          date: now.toISOString()
        })

        // 清理过期版本
        this.cleanupOldVersions(dir, versionsData)
      }

      // 创建新的 default.json
      fs.writeFileSync(defaultFilePath, JSON.stringify(data, null, 2), 'utf-8')

      // 更新最后修改时间
      versionsData.lastUpdated = Date.now()
      this.writeVersionsFile(dir, versionsData)

      return true
    } catch (error) {
      logger.error(`❌ 保存渲染数据失败: ${platform}/${templateName}`, error)
      return false
    }
  }

  /**
   * 获取特定模板的所有版本
   * @param platform 平台类型
   * @param templateName 模板名称
   * @returns 版本记录列表
   */
  static getVersions (platform: string, templateName: string): VersionRecord[] {
    try {
      const dir = this.getTemplateDataDir(platform, templateName)
      const versionsData = this.readVersionsFile(dir)
      return versionsData.versions
    } catch (error) {
      logger.error(`获取版本列表失败: ${platform}/${templateName}`, error)
      return []
    }
  }

  /**
   * 获取特定版本的数据
   * @param platform 平台类型
   * @param templateName 模板名称
   * @param versionFile 版本文件名（可选，不指定则获取 default.json）
   * @returns 数据对象或 null
   */
  static getVersionData (platform: string, templateName: string, versionFile?: string): any {
    try {
      const dir = this.getTemplateDataDir(platform, templateName)
      const filename = versionFile || 'default.json'
      const filePath = path.join(dir, filename)

      if (!fs.existsSync(filePath)) return null

      return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    } catch (error) {
      logger.error(`获取版本数据失败: ${platform}/${templateName}/${versionFile || 'default.json'}`, error)
      return null
    }
  }

  /**
   * 获取开发数据目录路径
   * @returns 开发数据目录的完整路径
   */
  static getDevDataDir (): string {
    return devDataDir
  }

  /**
   * 检查开发数据目录是否存在
   * @returns 是否存在
   */
  static hasDevDataDir (): boolean {
    return fs.existsSync(devDataDir)
  }
}

export default DevDataManager