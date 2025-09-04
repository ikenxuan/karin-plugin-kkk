import express from 'node-karin/express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'
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
 * 获取平台模板数据目录
 * @param platform 平台类型
 * @param templateId 模板ID
 * @returns 目录路径
 */
function getTemplateDataDir(platform: PlatformType, templateId: string): string {
  const dir = join(dataDir, platform, templateId)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  return dir
}

/**
 * 读取数据文件
 * @param platform 平台类型
 * @param templateId 模板ID
 * @param filename 文件名
 * @returns 数据对象或null
 */
function readDataFile(platform: PlatformType, templateId: string, filename: string = 'default.json') {
  const dir = getTemplateDataDir(platform, templateId)
  const filePath = join(dir, filename)
  if (existsSync(filePath)) {
    try {
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
function writeDataFile(platform: PlatformType, templateId: string, data: any, filename: string = 'default.json') {
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
function getAvailableDataFiles(platform: PlatformType, templateId: string): string[] {
  const dir = getTemplateDataDir(platform, templateId)
  try {
    return readdirSync(dir).filter(file => file.endsWith('.json'))
  } catch (error) {
    return []
  }
}

// 获取模板数据文件列表
app.get('/data/:platform/:templateId/files', (req, res) => {
  const { platform, templateId } = req.params
  const files = getAvailableDataFiles(platform as PlatformType, templateId)
  res.json({ files })
})

// 获取特定数据文件
app.get('/data/:platform/:templateId/:filename', (req, res) => {
  const { platform, templateId, filename } = req.params
  const data = readDataFile(platform as PlatformType, templateId, filename)
  
  if (data) {
    res.json(data)
  } else {
    res.status(404).json({ error: '数据文件不存在' })
  }
})

// 获取默认模板数据
app.get('/data/:platform/:templateId', (req, res) => {
  const { platform, templateId } = req.params
  let data = readDataFile(platform as PlatformType, templateId, 'default.json')
  
  res.json(data)
})

// 保存特定数据文件
app.post('/data/:platform/:templateId/:filename', (req, res) => {
  try {
    const { platform, templateId, filename } = req.params
    writeDataFile(platform as PlatformType, templateId, req.body, filename)
    res.json({ success: true, message: `${platform}/${templateId}/${filename} 数据保存成功` })
  } catch (error) {
    console.error('保存数据失败:', error)
    res.status(500).json({ success: false, error: '保存失败' })
  }
})

// 保存默认模板数据
app.post('/data/:platform/:templateId', (req, res) => {
  try {
    const { platform, templateId } = req.params
    writeDataFile(platform as PlatformType, templateId, req.body, 'default.json')
    res.json({ success: true, message: `${platform}/${templateId} 默认数据保存成功` })
  } catch (error) {
    console.error('保存数据失败:', error)
    res.status(500).json({ success: false, error: '保存失败' })
  }
})

// 删除数据文件
app.delete('/data/:platform/:templateId/:filename', (req, res) => {
  try {
    const { platform, templateId, filename } = req.params
    
    // 不允许删除default.json
    if (filename === 'default.json') {
      return res.status(400).json({ error: '不能删除默认数据文件' })
    }
    
    const dir = getTemplateDataDir(platform as PlatformType, templateId)
    const filePath = join(dir, filename)
    
    if (existsSync(filePath)) {
      unlinkSync(filePath)
      res.json({ success: true, message: '文件删除成功' })
    } else {
      res.status(404).json({ error: '文件不存在' })
    }
  } catch (error) {
    console.error('删除文件失败:', error)
    res.status(500).json({ error: '删除失败' })
  }
})

// 生成二维码
app.get('/qrcode', async (req, res) => {
  try {
    const url = req.query.url as string || 'https://example.com'
    const useDarkTheme = req.query.useDarkTheme === 'true'
    const qrCodeSvg = await QRCode.toString(url, {
      type: 'svg',
      width: 600,
      errorCorrectionLevel: 'L',
      color: {
        dark: useDarkTheme ? '#c3c3c3' : '#3a3a3a', // 码的颜色
        light: useDarkTheme ? '#000000' : '#EEEEF0', // 背景色
      }
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
  console.log(`🚀 Mock API服务器运行在 http://localhost:${PORT}`)
  console.log(`📁 数据文件存储在: ${dataDir}`)
})