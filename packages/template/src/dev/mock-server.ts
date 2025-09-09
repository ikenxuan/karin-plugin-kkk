import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import cors from 'cors'
import { logger } from 'node-karin'
import express from 'node-karin/express'
import QRCode from 'qrcode'

// 使用新的配置系统
import { componentConfigs } from '../config/config'
import { PlatformType } from '../types/platforms'

const __dirname = fileURLToPath(new URL('..', import.meta.url))
const dataDir = resolve(__dirname, '../dev-data')

// 确保数据目录存在
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

/**
 * 获取平台组件数据目录
 * @param platform 平台类型
 * @param componentId 组件ID
 * @returns 目录路径
 */
function getTemplateDataDir (platform: PlatformType, componentId: string): string {
  const dir = join(dataDir, platform, componentId)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  return dir
}

/**
 * 获取平台的可用组件列表
 * @param platform 平台类型
 * @returns 组件配置列表
 */
function getAvailableComponents(platform: PlatformType) {
  const platformConfig = componentConfigs.find(config => config.type === platform)
  return platformConfig?.components || []
}

app.get('/api/components/:platform', (req, res) => {
  const platform = req.params.platform as PlatformType
  const components = getAvailableComponents(platform)
  res.json({ 
    components: components.map(component => ({
      id: component.id,
      name: component.name,
      description: component.description,
      enabled: component.enabled
    }))
  })
})

/**
 * 读取数据文件
 * @param platform 平台类型
 * @param templateId 模板ID
 * @param filename 文件名
 * @returns 数据对象或null
 */
function readDataFile (platform: PlatformType, templateId: string, filename: string = 'default.json') {
  const dir = getTemplateDataDir(platform, templateId)
  const filePath = join(dir, filename)

  if (existsSync(filePath)) {
    try {
      // 检查路径是否为文件而不是目录
      const stats = statSync(filePath)
      if (stats.isDirectory()) {
        console.error(`路径是目录而不是文件: ${filePath}`)
        return null
      }

      return JSON.parse(readFileSync(filePath, 'utf-8'))
    } catch (error) {
      console.error(`读取数据文件失败: ${filePath}`, error)
      return null
    }
  }
  return null
}

/**
 * 写入数据文件
 * @param platform 平台类型
 * @param templateId 模板ID
 * @param data 数据对象
 * @param filename 文件名
 */
function writeDataFile (platform: PlatformType, templateId: string, data: any, filename: string = 'default.json') {
  const dir = getTemplateDataDir(platform, templateId)
  const filePath = join(dir, filename)
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

/**
 * 获取可用的数据文件列表
 * @param platform 平台类型
 * @param templateId 模板ID
 * @returns 文件名列表
 */
function getAvailableDataFiles (platform: PlatformType, templateId: string): string[] {
  const dir = getTemplateDataDir(platform, templateId)
  try {
    return readdirSync(dir).filter(file => file.endsWith('.json'))
  } catch {
    return []
  }
}

// 匹配 /api/data/{platform}/{templateId}/files 格式
app.get(/^\/api\/data\/([^/]+)\/(.+)\/files$/, (req, res) => {
  const platform = req.params[0] as PlatformType
  const templateId = req.params[1]
  const files = getAvailableDataFiles(platform, templateId)
  res.json({ files })
})

// 匹配 /api/data/{platform}/{templateId}/files/{filename} 格式
app.get(/^\/api\/data\/([^/]+)\/(.+)\/files\/([^/]+)$/, (req, res) => {
  const platform = req.params[0] as PlatformType
  const templateId = req.params[1]
  const filename = req.params[2]
  const data = readDataFile(platform, templateId, filename)

  if (data) {
    res.json(data)
  } else {
    res.status(404).json({ error: '数据文件不存在' })
  }
})

// 匹配 /api/data/{platform}/{templateId}/{filename} 格式（特定文件）
app.get(/^\/api\/data\/([^/]+)\/(.+)\/([^/]+\.json)$/, (req, res) => {
  const platform = req.params[0] as PlatformType
  const templateId = req.params[1]
  const filename = req.params[2]
  const data = readDataFile(platform, templateId, filename)

  if (data) {
    res.json(data)
  } else {
    res.status(404).json({ error: '数据文件不存在' })
  }
})

// 匹配 /api/data/{platform}/{templateId} 格式（默认数据）
app.get(/^\/api\/data\/([^/]+)\/(.+)$/, (req, res) => {
  const platform = req.params[0] as PlatformType
  const templateId = req.params[1]
  const data = readDataFile(platform, templateId, 'default.json')
  res.json(data)
})

// POST 路由 - 保存特定数据文件
app.post(/^\/api\/data\/([^/]+)\/(.+)\/files\/([^/]+)$/, (req, res) => {
  try {
    const platform = req.params[0] as PlatformType
    const templateId = req.params[1]
    const filename = req.params[2]
    writeDataFile(platform, templateId, req.body, filename)
    res.json({ success: true, message: `${platform}/${templateId}/${filename} 数据保存成功` })
  } catch (error) {
    console.error('保存数据失败:', error)
    res.status(500).json({ success: false, error: '保存失败' })
  }
})

// POST 路由 - 保存默认模板数据
app.post(/^\/api\/data\/([^/]+)\/(.+)$/, (req, res) => {
  try {
    const platform = req.params[0] as PlatformType
    const templateId = req.params[1]
    writeDataFile(platform, templateId, req.body, 'default.json')
    res.json({ success: true, message: `${platform}/${templateId} 默认数据保存成功` })
  } catch (error) {
    console.error('保存数据失败:', error)
    res.status(500).json({ success: false, error: '保存失败' })
  }
})

// DELETE 路由 - 删除数据文件
app.delete(/^\/api\/data\/([^/]+)\/(.+)\/files\/([^/]+)$/, (req, res) => {
  try {
    const platform = req.params[0] as PlatformType
    const templateId = req.params[1]
    const filename = req.params[2]

    // 不允许删除default.json
    if (filename === 'default.json') {
      return res.status(400).json({ error: '不能删除默认数据文件' })
    }

    const templateDataDir = getTemplateDataDir(platform, templateId)
    const filePath = join(templateDataDir, filename)

    if (existsSync(filePath)) {
      unlinkSync(filePath)
      res.json({ success: true, message: `${filename} 删除成功` })
    } else {
      res.status(404).json({ success: false, error: '文件不存在' })
    }
  } catch (error) {
    console.error('删除文件失败:', error)
    res.status(500).json({ success: false, error: '删除失败' })
  }
})

// 生成二维码
app.get('/api/qrcode', async (req, res) => {
  try {
    const url = req.query.url as string || 'https://example.com'
    const useDarkTheme = req.query.useDarkTheme === 'true'
    const qrCodeSvg = await QRCode.toString(url, {
      type: 'svg',
      width: 600,
      errorCorrectionLevel: 'L',
      color: {
        dark: useDarkTheme ? '#c3c3c3' : '#3a3a3a', // 码的颜色
        light: useDarkTheme ? '#000000' : '#EEEEF0' // 背景色
      },
      margin: 0
    })

    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(qrCodeSvg).toString('base64')}`
    res.json({ dataUrl })
  } catch (error) {
    res.status(500).json({
      error: '生成二维码失败',
      details: error instanceof Error ? error.message : '未知错误'
    })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  logger.info(`🚀 Mock API服务器运行在 http://localhost:${PORT}`)
  logger.info(`📁 数据文件存储在: ${dataDir}`)
})
