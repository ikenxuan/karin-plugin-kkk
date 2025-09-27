import { join } from 'node:path'

import type { ImageElement } from 'node-karin'
import { karinPathHtml, render, segment } from 'node-karin'
import type { 
  DynamicRenderPath,
  ExtractDataTypeFromPath,
  TemplateDataTypeMap,
  TypedRenderRequest
} from 'template'
import reactServerRender from 'template'

import { Common, Root } from '@/module'
import { Config } from '@/module/utils/Config'

/**
 * 渲染函数
 * @template P 渲染路径，必须是有效的动态路径
 * @param path 渲染路径，格式为 "平台/组件ID"
 * @param data 渲染数据，类型根据路径自动推断
 * @returns 渲染结果Promise
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

  const outputDir = join(karinPathHtml, Root.pluginName, templateType)

  const renderRequest: TypedRenderRequest<keyof TemplateDataTypeMap> = {
    templateType: templateType as TypedRenderRequest<keyof TemplateDataTypeMap>['templateType'],
    templateName,
    scale: Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100)),
    useDarkTheme: Common.useDarkTheme(),
    version: Config.app.RemoveWatermark ? undefined : {
      pluginName: 'kkk',
      pluginVersion: Root.pluginVersion,
      releaseType: /^\d+\.\d+\.\d+$/.test(Root.pluginVersion) ? 'Stable' : 'Preview',
      poweredBy: 'Karin'
    },
    data: {
      ...data,
      useDarkTheme: Common.useDarkTheme()
    }
  }

  // 调用本地SSR渲染函数
  const result = await reactServerRender(renderRequest, outputDir)
    .then(res => {
      if (!res.success || !res.htmlPath) {
        throw new Error(res.error || 'SSR渲染失败')
      }
      return res
    })
    .catch(err => {
      throw new Error(err.message || 'SSR渲染失败')
    })
    
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