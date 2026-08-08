/** 本模板的数据类型（路由 index.tsx 与 components/ 实现共用）。 */

export interface VersionWarningData {
  /** 插件构建时的 karin 版本 */
  requireVersion: string
  /** 当前运行的 karin 版本 */
  currentVersion: string
  /** 是否使用深色主题（core 渲染时注入 data） */
  useDarkTheme?: boolean
}
