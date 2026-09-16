import { createRequire } from 'node:module'
import path from 'node:path'

import { FONT_ASSETS_PREFIX, KKK_PREFIX } from '../server/constants/routes'

/**
 * 模板字体包：包名 + 包内样式表。
 *
 * 字体不能进构建产物，也不能被 ktr 内联成 base64——`HtmlWrapper` 会在每次渲染时把样式表里
 * 的相对 url() 解析成 file:// 绝对路径（超过 assetsInlineLimit），字体文件因此留在 node_modules
 * 里按需取。改字体只需要动这张表。
 */
const FONT_PACKAGES = [
  { name: '@lobehub/webfont-harmony-sans-sc', stylesheet: 'css/index-full.css' },
  { name: '@lobehub/webfont-geist-mono', stylesheet: 'css/index.css' }
]

/** 单个字体包在运行期的位置 */
export type TemplateFont = {
  /** 字体包名 */
  name: string
  /** 包根绝对路径，静态路由原样挂在这里（包内 ../fonts/* 相对引用才成立） */
  root: string
  /** 包内样式表绝对路径，交给 ktr 的 extraStylePaths 在渲染时注入 */
  stylesheetPath: string
  /** 静态路由挂载前缀 */
  mountPath: string
  /** HTTP 页面（临时预览）引用的同源样式表地址 */
  stylesheetUrl: string
}

/**
 * 解析字体包位置。用包名解析而不是拼插件目录，依赖被提升到上层 node_modules 时同样能找到；
 * 依赖缺失时跳过并打日志，让模板回退到系统字体而不是整体启动失败。
 *
 * 只有这个模块被构建配置（karin.template.ts）共用，所以用 console 而不是 node-karin 的 logger。
 */
export const templateFonts: TemplateFont[] = (() => {
  const require = createRequire(import.meta.url)
  const fonts: TemplateFont[] = []
  for (const item of FONT_PACKAGES) {
    try {
      const root = path.dirname(require.resolve(`${item.name}/package.json`))
      const mountPath = `${FONT_ASSETS_PREFIX}/${item.name.split('/').pop()}`
      fonts.push({
        name: item.name,
        root,
        stylesheetPath: path.join(root, item.stylesheet),
        mountPath,
        stylesheetUrl: `${KKK_PREFIX}${mountPath}/${item.stylesheet}`
      })
    } catch {
      console.warn(`[karin-plugin-kkk] 未找到字体包 ${item.name}，对应字体将回退到系统字体。`)
    }
  }
  return fonts
})()
