import { join } from 'node:path'

import type { ImageElement } from 'node-karin'
import { karinPathHtml, render, segment } from 'node-karin'
import reactServerRender, { type RenderRequest } from 'template'

import { Common, Root } from '@/module'
import { Config } from '@/module/utils/Config'

/**
 * 渲染模板
 * @param path 组件路径标识
 * @param params 模板参数
 * @returns 图片元素数组
 */
export const Render = async (path: string, params?: any): Promise<ImageElement[]> => {
  return await SSR(path, params)
}

/**
 * SSR渲染
 * @param path 组件路径标识，格式：platform/category/templateName 或 platform/templateName
 * @param params 模板参数
 * @returns 图片元素数组
 */
const SSR = async (path: string, params?: any): Promise<ImageElement[]> => {
  const pathParts = path.split('/')
  let templateType: string
  let templateName: string

  if (pathParts.length === 2) {
    // 二级路径：platform/templateName
    [templateType, templateName] = pathParts
  } else if (pathParts.length === 3) {
    // 三级路径：platform/category/templateName
    templateType = pathParts[0]
    templateName = `${pathParts[1]}/${pathParts[2]}`
  } else {
    throw new Error(`不支持的路径格式: ${path}`)
  }

  const outputDir = join(karinPathHtml, Root.pluginName, templateType)
  const renderRequest: RenderRequest = {
    templateType: templateType as RenderRequest['templateType'],
    templateName,
    data: {
      ...params,
      useDarkTheme: Common.useDarkTheme()
    },
    version: {
      pluginName: 'kkk',
      pluginVersion: Root.pluginVersion,
      releaseType: /^\d+\.\d+\.\d+$/.test(Root.pluginVersion) ? 'Stable' : 'Preview',
      poweredBy: 'Karin'
    },
    scale: Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100))
  }

  // 调用本地SSR渲染函数
  const result = await reactServerRender(renderRequest, outputDir)

  if (!result.success || !result.htmlPath) {
    throw new Error(result.error || 'SSR渲染失败')
  }

  // 截图
  const images = await render.render({
    name: `${Root.pluginName}/${templateType}/${templateName}`,
    file: result.htmlPath,
    multiPage: 12000,
    selector: '#container',
    fullPage: false,
    type: 'jpeg',
    pageGotoParams: {
      waitUntil: 'load',
      timeout: Config.app.RenderWaitTime * 1000
    }
  })

  // 转换为ImageElement数组
  const ret: ImageElement[] = []
  for (const image of images) {
    ret.push(segment.image('base64://' + image))
  }

  return ret
}
