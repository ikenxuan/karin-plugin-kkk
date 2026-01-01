/**
 * 配置 Schema 统一导出
 */
export { appConfigSchema } from './app.schema'
export { bilibiliConfigSchema } from './bilibili.schema'
export { cookiesConfigSchema } from './cookies.schema'
export { douyinConfigSchema } from './douyin.schema'
export { kuaishouConfigSchema } from './kuaishou.schema'
export { requestConfigSchema } from './request.schema'
export * from './schema'
export { uploadConfigSchema } from './upload.schema'
export { xiaohongshuConfigSchema } from './xiaohongshu.schema'

import { appConfigSchema } from './app.schema'
import { bilibiliConfigSchema } from './bilibili.schema'
import { cookiesConfigSchema } from './cookies.schema'
import { douyinConfigSchema } from './douyin.schema'
import { kuaishouConfigSchema } from './kuaishou.schema'
import { requestConfigSchema } from './request.schema'
import type { ConfigSchema, ModuleSchema, SectionSchema } from './schema'
import { uploadConfigSchema } from './upload.schema'
import { xiaohongshuConfigSchema } from './xiaohongshu.schema'

/** 所有配置区块 Schema */
export const allSectionSchemas: Record<string, SectionSchema> = {
  cookies: cookiesConfigSchema,
  app: appConfigSchema,
  douyin: douyinConfigSchema,
  bilibili: bilibiliConfigSchema,
  kuaishou: kuaishouConfigSchema,
  xiaohongshu: xiaohongshuConfigSchema,
  upload: uploadConfigSchema,
  request: requestConfigSchema
}

/** 获取完整配置 Schema（用于 API 返回） */
export function getConfigSchema(): ConfigSchema {
  const modules: ModuleSchema[] = [
    {
      key: 'cookies',
      label: 'Cookies 相关',
      sections: [cookiesConfigSchema]
    },
    {
      key: 'app',
      label: '插件应用相关',
      sections: [appConfigSchema]
    },
    {
      key: 'douyin',
      label: '抖音相关',
      sections: [douyinConfigSchema]
    },
    {
      key: 'bilibili',
      label: 'B站相关',
      sections: [bilibiliConfigSchema]
    },
    {
      key: 'kuaishou',
      label: '快手相关',
      sections: [kuaishouConfigSchema]
    },
    {
      key: 'xiaohongshu',
      label: '小红书相关',
      sections: [xiaohongshuConfigSchema]
    },
    {
      key: 'upload',
      label: '视频文件上传相关',
      sections: [uploadConfigSchema]
    },
    {
      key: 'request',
      label: '解析库请求配置相关',
      sections: [requestConfigSchema]
    }
  ]

  return { modules }
}

/** 获取指定模块的 Schema */
export function getModuleSchema(moduleKey: string): SectionSchema | undefined {
  return allSectionSchemas[moduleKey]
}

