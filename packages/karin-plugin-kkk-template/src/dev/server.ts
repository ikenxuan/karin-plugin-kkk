import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { join, resolve, dirname } from 'node:path'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { PluginOption } from 'vite'

import type { ResolvedConfig } from '../types'
import { TemplateRegistry } from '../core/registry'
import { logger } from '../utils/logger'

// 获取当前文件的目录 (替代 __dirname)
const currentDir = typeof __dirname !== 'undefined' 
  ? __dirname 
  : fileURLToPath(new URL('.', import.meta.url))

/**
 * 创建模板虚拟模块插件
 */
function templatePlugin(registry: TemplateRegistry, config: ResolvedConfig): PluginOption {
  const virtualModuleId = 'virtual:karin-templates'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'karin-template-dev-plugin',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const templates = registry.getAllMetadata()
        
        // 生成导入语句
        const imports = templates.map((t, index) => 
          `import * as TemplateModule_${index} from '${t.entry}'`
        ).join('\n')
        
        // 全局 CSS 导入
        let globalCssImport = ''
        if (config.globalCss) {
          const cssPath = resolve(config.root, config.globalCss).replace(/\\/g, '/')
          globalCssImport = `import '${cssPath}'`
        }

        // 生成导出数组
        const exports = `
          export const templates = [
            ${templates.map((t, index) => `
              {
                // 优先使用默认导出，如果没有则使用所有命名导出
                component: TemplateModule_${index}.default || TemplateModule_${index},
                ...TemplateModule_${index},
                id: TemplateModule_${index}.id || '${t.id}',
                entry: '${t.entry}'
              }
            `).join(',\n')}
          ]
        `

        return `${globalCssImport}\n${imports}\n${exports}`
      }
    }
  }
}

/**
 * 模拟数据 API 插件
 */
function mockDataPlugin(config: ResolvedConfig): PluginOption {
  return {
    name: 'karin-template-mock-data',
    configureServer(server) {
      server.middlewares.use('/__api/data', async (req, res, next) => {
        const mockDir = resolve(config.root, config.mockDataDir || 'mock-data')
        
        const url = new URL(req.url || '', `http://${req.headers.host}`)
        const pathname = url.pathname

        // 获取文件列表
        if (req.method === 'GET' && pathname === '/list') {
          if (!existsSync(mockDir)) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify([]))
            return
          }
          
          try {
            const files = readdirSync(mockDir).filter(f => f.endsWith('.json'))
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(files))
          } catch (e) {
            console.error('Failed to list mock files:', e)
            res.statusCode = 500
            res.end('Internal Server Error')
          }
          return
        }

        // 获取文件内容
        if (req.method === 'GET' && pathname.length > 1) {
            const filename = pathname.slice(1) // remove leading /
            if (!filename.endsWith('.json')) {
                next()
                return
            }
            
            const filepath = join(mockDir, filename)
            if (existsSync(filepath)) {
                try {
                  const content = readFileSync(filepath, 'utf-8')
                  res.setHeader('Content-Type', 'application/json')
                  res.end(content)
                } catch (e) {
                  console.error(`Failed to read mock file ${filepath}:`, e)
                  res.statusCode = 500
                  res.end('Internal Server Error')
                }
                return
            } else {
                res.statusCode = 404
                res.end('File not found')
                return
            }
        }
        
        next()
      })
    }
  }
}

/**
 * 启动开发服务器
 */
export async function startDevServer(config: ResolvedConfig) {
  const registry = new TemplateRegistry(config)
  await registry.scan()

  // 确定客户端资源位置
  // 1. 开发模式: 使用源码目录 (src/client)
  // 2. 生产模式: 使用构建产物目录 (dist/client)
  let clientRoot: string
  let isProductionClient = false

  // 检查是否在构建后的环境中运行 (dist/dev/server.js)
  if (currentDir.includes('dist')) {
    // 检查是否存在构建后的客户端资源
    const distClient = resolve(currentDir, '../client')
    if (existsSync(resolve(distClient, 'index.html'))) {
      clientRoot = distClient
      isProductionClient = true
    } else {
      // 回退到源码目录 (用于 monorepo 开发)
      clientRoot = resolve(currentDir, '../../client')
    }
  } else {
    // 源码开发环境
    clientRoot = resolve(currentDir, '../../client')
  }

  logger.debug(`Client root resolved to: ${clientRoot} (Production: ${isProductionClient})`)

  const server = await createServer({
    root: clientRoot,
    server: {
      port: config.dev.port,
      host: config.dev.host,
      open: config.dev.open,
      fs: {
        allow: [
          clientRoot,
          config.root,
          resolve(config.root, 'node_modules'),
        ]
      }
    },
    plugins: [
      // 始终启用 React 和 Tailwind 插件，因为用户模板需要它们
      // 即使客户端 UI 是预构建的，用户开发的组件仍是源码形式
      react(),
      tailwindcss(),
      tsconfigPaths({
        root: config.root
      }),
      templatePlugin(registry, config),
      mockDataPlugin(config),
      {
        name: 'karin-template-html-fallback',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            // 如果是生产模式，SPA 路由回退到 index.html
            if (isProductionClient && req.headers.accept?.includes('text/html')) {
               // Let Vite handle it naturally or specific logic
            }
            
            // 开发模式下的入口处理
            if (!isProductionClient && req.url === '/') {
              const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Karin Template Dev</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>
              `
              const transformedHtml = await server.transformIndexHtml('/', html)
              res.statusCode = 200
              res.setHeader('Content-Type', 'text/html')
              res.end(transformedHtml)
              return
            }
            next()
          })
        }
      }
    ],
  })

  await server.listen()
  server.printUrls()
  
  logger.info('Development server started')
}
