import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import QRCode from 'qrcode'
import type { Plugin } from 'vite'

import { baseComponentConfigs } from '../config/config-base'
import { PlatformType } from '../types/platforms'

const __dirname = fileURLToPath(new URL('..', import.meta.url))
const dataDir = resolve(__dirname, '../dev-data')

/**
 * Vite Mock API 插件
 * @description 将 mock 服务器集成到 Vite 开发服务器中
 * @returns Vite 插件配置
 */
export function mockApiPlugin (): Plugin {
  return {
    name: 'mock-api',
    configureServer (server) {
      // 确保数据目录存在
      if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true })
      }

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
      function getAvailableComponents (platform: PlatformType) {
        const platformConfig = baseComponentConfigs.find(config => config.type === platform)
        return platformConfig?.components || []
      }

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

      /**
       * 解析请求体
       * @param req 请求对象
       * @returns Promise<string> 请求体内容
       */
      function parseBody (req: any): Promise<string> {
        return new Promise((resolve) => {
          let body = ''
          req.on('data', (chunk: any) => {
            body += chunk.toString()
          })
          req.on('end', () => {
            resolve(body)
          })
        })
      }

      // API 路由处理 - 使用与原 mock-server.ts 相同的路由匹配逻辑
      server.middlewares.use('/api', async (req, res, next) => {
        const url = req.url!
        const method = req.method!

        try {
          // 组件列表 API: /api/components/{platform}
          if (method === 'GET' && url.match(/^\/components\/([^/]+)$/)) {
            const match = url.match(/^\/components\/([^/]+)$/)!
            const platform = match[1] as PlatformType
            const components = getAvailableComponents(platform)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              components: components.map(component => ({
                id: component.id,
                name: component.name,
                description: component.description,
                enabled: component.enabled
              }))
            }))
            return
          }

          // 匹配 /api/data/{platform}/{templateId}/files 格式
          if (method === 'GET' && url.match(/^\/data\/([^/]+)\/(.+)\/files$/)) {
            const match = url.match(/^\/data\/([^/]+)\/(.+)\/files$/)!
            const platform = decodeURIComponent(match[1]) as PlatformType
            const templateId = decodeURIComponent(match[2])
            const files = getAvailableDataFiles(platform, templateId)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ files }))
            return
          }

          // 匹配 /api/data/{platform}/{templateId}/files/{filename} 格式
          if (method === 'GET' && url.match(/^\/data\/([^/]+)\/(.+)\/files\/([^/]+)$/)) {
            const match = url.match(/^\/data\/([^/]+)\/(.+)\/files\/([^/]+)$/)!
            const platform = decodeURIComponent(match[1]) as PlatformType
            const templateId = decodeURIComponent(match[2])
            const filename = decodeURIComponent(match[3])
            const data = readDataFile(platform, templateId, filename)

            res.setHeader('Content-Type', 'application/json')
            if (data) {
              res.end(JSON.stringify(data))
            } else {
              res.statusCode = 404
              res.end(JSON.stringify({ error: '数据文件不存在' }))
            }
            return
          }

          // 匹配 /api/data/{platform}/{templateId}/{filename} 格式（特定文件）
          if (method === 'GET' && url.match(/^\/data\/([^/]+)\/(.+)\/([^/]+\.json)$/)) {
            const match = url.match(/^\/data\/([^/]+)\/(.+)\/([^/]+\.json)$/)!
            const platform = decodeURIComponent(match[1]) as PlatformType
            const templateId = decodeURIComponent(match[2])
            const filename = decodeURIComponent(match[3])
            const data = readDataFile(platform, templateId, filename)

            res.setHeader('Content-Type', 'application/json')
            if (data) {
              res.end(JSON.stringify(data))
            } else {
              res.statusCode = 404
              res.end(JSON.stringify({ error: '数据文件不存在' }))
            }
            return
          }

          // 匹配 /api/data/{platform}/{templateId} 格式（默认数据）
          if (method === 'GET' && url.match(/^\/data\/([^/]+)\/(.+)$/)) {
            const match = url.match(/^\/data\/([^/]+)\/(.+)$/)!
            const platform = decodeURIComponent(match[1]) as PlatformType
            const templateId = decodeURIComponent(match[2])
            const data = readDataFile(platform, templateId)

            res.setHeader('Content-Type', 'application/json')
            if (data) {
              res.end(JSON.stringify(data))
            } else {
              res.statusCode = 404
              res.end(JSON.stringify({ error: '数据文件不存在' }))
            }
            return
          }

          // POST 路由 - 保存特定数据文件
          if (method === 'POST' && url.match(/^\/data\/([^/]+)\/(.+)\/files\/([^/]+)$/)) {
            const match = url.match(/^\/data\/([^/]+)\/(.+)\/files\/([^/]+)$/)!
            const platform = match[1] as PlatformType
            const templateId = match[2]
            const filename = match[3]

            const body = await parseBody(req)
            try {
              const data = JSON.parse(body)
              writeDataFile(platform, templateId, data, filename)
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, message: `${platform}/${templateId}/${filename} 数据保存成功` }))
            } catch (error) {
              console.error('保存数据失败:', error)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: '保存失败' }))
            }
            return
          }

          // POST 路由 - 保存默认模板数据
          if (method === 'POST' && url.match(/^\/data\/([^/]+)\/(.+)$/)) {
            const match = url.match(/^\/data\/([^/]+)\/(.+)$/)!
            const platform = match[1] as PlatformType
            const templateId = match[2]

            const body = await parseBody(req)
            try {
              const data = JSON.parse(body)
              writeDataFile(platform, templateId, data, 'default.json')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, message: `${platform}/${templateId} 默认数据保存成功` }))
            } catch (error) {
              console.error('保存数据失败:', error)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: '保存失败' }))
            }
            return
          }

          // DELETE 路由 - 删除数据文件
          if (method === 'DELETE' && url.match(/^\/data\/([^/]+)\/(.+)\/files\/([^/]+)$/)) {
            const match = url.match(/^\/data\/([^/]+)\/(.+)\/files\/([^/]+)$/)!
            const platform = match[1] as PlatformType
            const templateId = match[2]
            const filename = match[3]

            // 不允许删除default.json
            if (filename === 'default.json') {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: '不能删除默认数据文件' }))
              return
            }

            const templateDataDir = getTemplateDataDir(platform, templateId)
            const filePath = join(templateDataDir, filename)

            if (existsSync(filePath)) {
              unlinkSync(filePath)
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, message: `${filename} 删除成功` }))
            } else {
              res.statusCode = 404
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: '文件不存在' }))
            }
            return
          }

          // 二维码生成 API: /api/qrcode
          if (method === 'GET' && url.startsWith('/qrcode')) {
            const urlParams = new URLSearchParams(url.split('?')[1] || '')
            const targetUrl = urlParams.get('url') || 'https://example.com'
            const useDarkTheme = urlParams.get('useDarkTheme') === 'true'

            try {
              const qrCodeSvg = await QRCode.toString(targetUrl, {
                type: 'svg',
                width: 600,
                errorCorrectionLevel: 'L',
                color: {
                  dark: useDarkTheme ? '#C3C3C3' : '#3A3A3A',
                  light: useDarkTheme ? '#18181B' : '#FAFAFA'
                },
                margin: 0
              })

              const dataUrl = `data:image/svg+xml;base64,${Buffer.from(qrCodeSvg).toString('base64')}`
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ dataUrl }))
            } catch (error) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({
                error: '生成二维码失败',
                details: error instanceof Error ? error.message : '未知错误'
              }))
            }
            return
          }

          // 如果没有匹配的路由，继续到下一个中间件
          next()
        } catch (error) {
          console.error('[Mock API] 处理请求时发生错误:', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: '服务器内部错误' }))
        }
      })

      console.log('🚀 Mock API 中间件已集成到 Vite 开发服务器')
      console.log(`📁 数据文件存储在: ${dataDir}`)
    }
  }
}