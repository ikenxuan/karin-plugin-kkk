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

/** {@link templateFonts} 的类型：字体包数组，外加解析失败的包名 */
export type TemplateFontList = TemplateFont[] & {
  /** 解析失败的字体包名，交给运行时调用方打告警 */
  missing: string[]
}

/**
 * 解析字体包位置。用包名解析而不是拼插件目录，依赖被提升到上层 node_modules 时同样能找到；
 * 依赖缺失时跳过，让模板回退到系统字体而不是整体启动失败。
 *
 * 本模块被构建配置（karin.template.ts）共用，构建进程里不能碰 node-karin——它的模块顶层会拉起
 * 常驻句柄，`vite build` 跑完进程不退出（实测挂到超时）。所以这里对 Karin 零依赖，只把缺失的包名
 * 收进 `missing`，由运行时的调用方（Render/index.ts）打日志。同理，改这个文件时别 import 插件内的
 * 其他模块，链条上任何一个碰到 node-karin 都会把构建挂住。
 */
export const templateFonts: TemplateFontList = (() => {
  const require = createRequire(import.meta.url)
  const fonts: TemplateFont[] = []
  const missing: string[] = []

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
      missing.push(item.name)
    }
  }

  return Object.assign(fonts, { missing })
})()
