import type { PosterContext } from '../types/ctx'

/**
 * 解析模板的明暗状态。
 * 优先级：面板「模板主题」弹窗显式下发的 `ctx.theme.mode` > core 渲染时注入数据的 `data.useDarkTheme`。
 * 生产渲染两者同值；开发面板未选主题时（mode 为 undefined）跟随数据文件。
 */
export const resolveUseDarkTheme = (data: { useDarkTheme?: boolean } | undefined, ctx: PosterContext): boolean => {
  if (ctx.theme?.mode !== undefined) {
    return ctx.theme.mode === 'dark'
  }
  return Boolean(data?.useDarkTheme)
}
