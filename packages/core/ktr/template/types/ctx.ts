import type { RenderContext } from '@karinjs/template-react'

/**
 * kkk 注入模板的运行时上下文。
 * ktr 的 mergeContext 会把调用方传入的字段原样透传。
 */
export interface PosterContext extends RenderContext {
  /** 版本信息（页脚展示，RemoveWatermark 时不传） */
  version?: {
    /** 框架插件 */
    plugin: string
    /** 插件名称 */
    pluginName: string
    /** 插件版本 */
    pluginVersion: string
    /** 发布类型 */
    releaseType: 'Stable' | 'Preview'
    /** 驱动框架 */
    poweredBy: string
    /** 框架版本 */
    frameworkVersion: string
    /** 是否有可用更新 */
    hasUpdate?: boolean
  }
  /** 水印比特大小（Restore ID） */
  watermarkTextBitSize?: number
  /** 封面氛围背景贡献度参数（core 从 app.ambientCover 配置注入，缺省时模板用内置默认值） */
  ambientCover?: {
    /** 模糊封面层不透明度 (0~1) */
    coverOpacity?: number
    /** 压色罩两端（顶/底）不透明度 (0~1) */
    overlayEdgeOpacity?: number
    /** 压色罩中间带不透明度 (0~1) */
    overlayMiddleOpacity?: number
  }
}

/** kkk 模板组件 props：ktr 标准 { data, ctx } 形状，ctx 带 kkk 扩展字段。 */
export type PosterProps<D> = {
  /** 模板数据（路由级 Data 接口裸写，见 types/platforms/） */
  data: D
  /** ktr 注入的运行时上下文（scale/theme + kkk 扩展字段） */
  ctx: PosterContext
}
