import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync, watch, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import QRCodeStyling from 'qr-code-styling'
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
          const allFiles = readdirSync(dir)
          const jsonFiles = allFiles.filter(file => file.endsWith('.json') && file !== 'versions.json')

          // 分离 default.json 和其他文件
          const defaultFile = jsonFiles.find(f => f === 'default.json')
          const otherFiles = jsonFiles.filter(f => f !== 'default.json')

          // 对其他文件按时间倒序排列（新的在前）
          otherFiles.sort((a, b) => b.localeCompare(a))

          // default.json 始终在最前面
          return defaultFile ? ['default.json', ...otherFiles] : otherFiles
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

      /**
       * 监听 dev-data 目录的文件变化
       * 当有新文件被创建或修改时，通知前端进行热更新
       */
      function setupFileWatcher () {
        if (!existsSync(dataDir)) {
          return
        }

        try {
          const watcher = watch(dataDir, { recursive: true }, (eventType, filename) => {
            if (filename && (eventType === 'change' || eventType === 'rename')) {
              // 只处理 JSON 文件
              if (filename.endsWith('.json')) {
                // 通过 Vite HMR 通知前端数据已更新
                server.ws.send({
                  type: 'custom',
                  event: 'dev-data-updated',
                  data: {
                    file: filename,
                    timestamp: Date.now()
                  }
                })
              }
            }
          })

            // 保存 watcher 引用以便后续可能的清理
            ; (server as any).__devDataWatcher = watcher
        } catch {
          // 文件监听错误不影响 API 正常运行
        }
      }

      // 启动文件监听
      setupFileWatcher()

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
              const { JSDOM } = await import('jsdom')

              const qrCode = new QRCodeStyling({
                jsdom: JSDOM,
                type: 'svg',
                shape: 'square',
                width: 2000,
                height: 2000,
                data: targetUrl,
                margin: 0,
                qrOptions: {
                  typeNumber: 0,
                  mode: 'Byte',
                  errorCorrectionLevel: 'L'
                },
                imageOptions: {
                  hideBackgroundDots: false,
                  imageSize: 0.4,
                  margin: 0
                },
                dotsOptions: {
                  type: 'rounded',
                  color: useDarkTheme ? '#C3C3C3' : '#3A3A3A',  
                  roundSize: false
                },
                backgroundOptions: {
                  color: 'transparent'
                },
                cornersSquareOptions: {
                  type: 'extra-rounded',
                  color: useDarkTheme ? '#C3C3C3' : '#3A3A3A'
                },
                cornersDotOptions: {
                  color: useDarkTheme ? '#C3C3C3' : '#3A3A3A'
                }
              })
              const buffer = await qrCode.getRawData('svg')

              const dataUrl = buffer && `data:image/svg+xml;base64,${buffer.toString('base64')}`
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

      // ========== AI 代理中间件（解决浏览器 CORS 问题）==========
      server.middlewares.use('/__ai_proxy__', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: '仅支持 POST 请求' }))
          return
        }

        try {
          const bodyText = await parseBody(req)
          const payload = JSON.parse(bodyText)
          const { apiFormat, baseUrl, apiKey, body: apiBody } = payload

          if (!apiFormat || !baseUrl || !apiKey) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: '缺少必要参数：apiFormat、baseUrl、apiKey' }))
            return
          }

          // 确定目标端点
          // 官方 SDK 默认在 baseURL 后拼接 /v1/{endpoint}
          // Claude: /v1/messages, OpenAI: /v1/chat/completions
          const normalizedBase = baseUrl.replace(/\/$/, '')
          const endpoint = apiFormat === 'claude' ? 'messages' : 'chat/completions'

          // 如果用户粘贴了完整端点 URL，直接使用
          let targetUrl: string
          if (normalizedBase.includes(`/${endpoint}`)) {
            targetUrl = normalizedBase
          } else if (normalizedBase.endsWith('/v1')) {
            targetUrl = `${normalizedBase}/${endpoint}`
          } else {
            targetUrl = `${normalizedBase}/v1/${endpoint}`
          }

          console.log(`[AI Proxy] 转发请求 → ${targetUrl} (格式: ${apiFormat})`)

          // 构建请求头
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }

          // Claude 使用 x-api-key 而不是 Authorization
          if (apiFormat === 'claude') {
            delete headers.Authorization
            headers['x-api-key'] = apiKey
            headers['anthropic-version'] = '2023-06-01'
          }

          // 检测是否为流式请求
          const shouldStream = apiBody.stream === true

          // 转发请求到实际 AI API
          const response = await fetch(targetUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(apiBody)
          })

          // 流式响应：直接透传 SSE 数据流（仅当外部 API 返回 200 时）
          if (shouldStream && response.body && response.ok) {
            res.statusCode = response.status
            const contentType = response.headers.get('content-type') || 'text/event-stream'
            res.setHeader('Content-Type', contentType)
            res.setHeader('Cache-Control', 'no-cache')
            res.setHeader('Connection', 'keep-alive')

            const reader = response.body.getReader()
            try {
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                res.write(value)
              }
            } finally {
              reader.releaseLock()
            }
            res.end()
            return
          }

          // 非流式：读取完整响应后返回
          const responseText = await response.text()

          if (!response.ok) {
            console.error(`[AI Proxy] 外部 API 返回 ${response.status}: ${responseText.slice(0, 200)}`)
          } else {
            console.log(`[AI Proxy] 外部 API 返回 ${response.status}`)
          }

          // 设置响应头（透传 Content-Type）
          const contentType = response.headers.get('content-type')
          if (contentType) {
            res.setHeader('Content-Type', contentType)
          } else {
            res.setHeader('Content-Type', 'application/json')
          }

          res.statusCode = response.status
          res.end(responseText)
        } catch (error) {
          console.error('[AI Proxy] 代理请求失败:', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            error: 'AI 代理请求失败',
            message: error instanceof Error ? error.message : String(error)
          }))
        }
      })

      console.log('🚀 Mock API 中间件已集成到 Vite 开发服务器')
    }
  }
}