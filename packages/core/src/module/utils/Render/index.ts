import pathModule from 'node:path'

import type { ImageElement } from 'node-karin'
import { karinPathHtml, render, segment } from 'node-karin'
import type {
  DataTypeMap,
  DynamicRenderPath,
  ExtractDataTypeFromPath,
  TypedRenderRequest
} from 'template'
import reactServerRender from 'template'

import { Common, Root } from '@/module'
import { Config } from '@/module/utils/Config'

import { createQrCodePlugin } from './plugins'


/**
 * 渲染函数
 * 将指定路径的模板渲染为图片元素数组
 * 
 * @template P 渲染路径，必须是有效的动态路径
 * @param path 渲染路径，格式为 "平台/组件ID" 或 "平台/分类/组件ID"
 * @param data 渲染数据，类型根据路径自动推断
 * @returns 渲染结果图片元素数组的 Promise
 */
export const Render = async <P extends DynamicRenderPath> (
  path: P,
  data?: ExtractDataTypeFromPath<P>
): Promise<ImageElement[]> => {
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

  const outputDir = pathModule.join(karinPathHtml, Root.pluginName, templateType)

  const renderRequest: TypedRenderRequest<keyof DataTypeMap> = {
    templateType: templateType as TypedRenderRequest<keyof DataTypeMap>['templateType'],
    templateName,
    scale: Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100)),
    useDarkTheme: Common.useDarkTheme(),
    version: Config.app.RemoveWatermark ? undefined : {
      plugin: 'karin-plugin',
      pluginName: 'kkk',
      pluginVersion: Root.pluginVersion,
      releaseType: /^\d+\.\d+\.\d+$/.test(Root.pluginVersion) ? 'Stable' : 'Preview',
      poweredBy: 'Karin',
      frameworkVersion: Root.karinVersion
    },
    data: {
      ...data,
      useDarkTheme: Common.useDarkTheme()
    }
  }

  // 调用 SSR 渲染，生成 HTML 文件
  const result = await reactServerRender({
    request: renderRequest,
    outputDir,
    plugins: [
      createQrCodePlugin()
    ]
  }).then(res => {
    if (!res.success || !res.htmlPath) {
      throw new Error(res.error)
    }
    return res
  }).catch(err => {
    throw new Error(`SSR渲染失败: ${err.message || '未知错误'}`)
  })

  // 截图渲染
  const renderResult = await render.render({
    name: `${Root.pluginName}/${templateType}/${templateName}`,
    file: result.htmlPath,
    multiPage: Config.app.multiPageRender ? Config.app.multiPageHeight : false,
    selector: '#container',
    fullPage: false,
    type: 'png',
    pageGotoParams: {
      waitUntil: 'load',
      timeout: Config.app.RenderWaitTime * 1000
    }
  })

  // 转换为 ImageElement 数组
  const ret: ImageElement[] = []
  if (Array.isArray(renderResult)) {
    for (const image of renderResult) {
      ret.push(segment.image('base64://' + image))
    }
  } else {
    ret.push(segment.image('base64://' + renderResult))
  }

  return ret
}