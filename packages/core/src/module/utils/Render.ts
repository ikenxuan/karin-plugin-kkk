import { join } from 'node:path'

import type { ImageElement, Options } from 'node-karin'
import { render, segment } from 'node-karin'
import { renderComponentToHtml, type RenderRequest } from 'render'

import { Common, Root } from '@/module'
import { Config } from '@/module/utils/Config'

function scale (pct = 1): string {
  const scale = Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100))
  pct = pct * scale
  return `style=transform:scale(${pct})`
}

/**
 * 渲染函数
 * @param path html模板路径或React组件标识
 * @param params 模板参数
 * @param useReact 是否使用React渲染，默认true
 * @returns 图片元素数组
 */
export async function Render (path: string, params?: any, useReact = true): Promise<ImageElement[]> {
  // 如果使用React渲染
  if (useReact) {
    return await renderWithReact(path, params)
  }

  // 传统HTML模板渲染
  return await renderWithTemplate(path, params)
}

/**
 * 使用React组件渲染
 * @param path 组件路径标识，格式：platform/templateName
 * @param params 渲染参数
 * @returns 图片元素数组
 */
async function renderWithReact (path: string, params?: any): Promise<ImageElement[]> {
  try {
    const [templateType, templateName] = path.split('/')
    return await renderWithLocalComponent(templateType as RenderRequest['templateType'], templateName, params)
  } catch (error) {
    console.error('React渲染失败，回退到传统模板渲染:', error)
    return await renderWithTemplate(path, params)
  }
}

/**
 * 使用本地编译的组件渲染
 * @param templateType 模板类型
 * @param templateName 模板名称
 * @param params 渲染参数
 * @returns 图片元素数组
 */
async function renderWithLocalComponent (templateType: RenderRequest['templateType'], templateName: string, params?: any): Promise<ImageElement[]> {
  const outputDir = join(Root.pluginPath, 'temp', 'html')
  const renderRequest: RenderRequest = {
    templateType,
    templateName,
    data: {
      ...params,
      useDarkTheme: Common.useDarkTheme(),
    },
    version: {
      pluginName: 'kkk',
      pluginVersion: Root.pluginVersion,
      releaseType: releaseType(),
      poweredBy: 'Karin'
    },
    scale: Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100)),
  }

  // 调用本地渲染函数
  const result = await renderComponentToHtml(renderRequest, outputDir)

  if (!result.success || !result.htmlPath) {
    throw new Error(result.error || '本地React渲染失败')
  }

  // 使用karin的render方法渲染HTML文件
  const images = await render.render({
    name: `${Root.pluginName}/${templateType}/${templateName}`,
    file: result.htmlPath,
    multiPage: 12000,
    selector: '#container',
    fullPage: false,
    type: 'jpeg'
  })

  // 转换为ImageElement数组
  const ret: ImageElement[] = []
  for (const image of images) {
    ret.push(segment.image('base64://' + image))
  }

  return ret
}

/**
 * 使用传统HTML模板渲染（原有逻辑）
 * @param path html模板路径
 * @param params 模板参数
 * @returns 图片元素数组
 */
async function renderWithTemplate (path: string, params?: any): Promise<ImageElement[]> {
  const basePaths: Record<string, string> = {
    douyin: 'douyin/html',
    bilibili: 'bilibili/html',
    admin: 'admin/html',
    kuaishou: 'kuaishou/html',
    help: 'help/html',
    apiError: 'apiError/html'
  }
  const platform = Object.keys(basePaths).find(key => path.startsWith(key))!
  let newPath = path.substring(platform.length)
  // 如果 newPath 以斜杠开头，去掉这个斜杠
  if (newPath.startsWith('/')) {
    newPath = newPath.substring(1)
  }
  path = `${basePaths[platform]}/${newPath}`
  const renderOpt: Options = {
    pageGotoParams: {
      waitUntil: 'load',
      timeout: Config.app.RenderWaitTime * 1000
    },
    name: `${Root.pluginName}/${platform}/${newPath}/`.replace(/\\/g, '/'),
    file: `${Root.pluginPath}/resources/template/${path}.html`,
    type: 'jpeg'
  }

  const img = await render.render({
    ...renderOpt,
    multiPage: 12000,
    encoding: 'base64',
    data: {
      ...params,
      _res_path: (join(Root.pluginPath, '/resources') + '/').replace(/\\/g, '/'),
      _layout_path: (join(Root.pluginPath, '/resources', 'template', 'extend') + '/').replace(/\\/g, '/'),
      defaultLayout: (join(Root.pluginPath, '/resources', 'template', 'extend', 'html') + '/default.html').replace(/\\/g, '/'),
      sys: {
        scale: scale(params?.scale ?? 1)
      },
      pluResPath: `${Root.pluginPath}/resources/`,
      copyright: Config.app.RemoveWatermark ? '' : `<span class="name">kkk</span><span class="version">${Root.pluginVersion} ${releaseType()}</span> Powered By <span class="name">Karin</span>`,
      useDarkTheme: Common.useDarkTheme()
    },
    screensEval: '#container'
  })
  // 分片截图传回来的是数组
  const ret: ImageElement[] = []
  for (const imgae of img) {
    ret.push(segment.image('base64://' + imgae))
  }
  return ret
}

/**
 * 获取当前版本的发布类型
 * @returns Preview | Stable
 */
const releaseType = () => {
  const versionPattern = /^\d+\.\d+\.\d+$/
  if (versionPattern.test(Root.pluginVersion)) {
    return 'Stable'
  } else {
    return 'Preview'
  }
}
