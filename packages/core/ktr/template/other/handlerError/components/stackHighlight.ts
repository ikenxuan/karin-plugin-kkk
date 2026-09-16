/**
 * 调用栈的结构化高亮。
 *
 * 与 `convertAnsiToHtml` 的分工：那个按 ANSI 转义上色，只适用于 `util.inspect`
 * 的彩色转储。amagi 的错误现在只印 `error.stack`（纯文本、没有 ANSI），交给它
 * 整段就是一个颜色 —— 所以这里按**结构**上色：错误名、`[kind/CODE]` 标签、
 * 函数名、目录、文件名、行列号各一色，外部帧（依赖库与 node 内部）整行压暗，
 * 一眼能挑出项目里的帧。归属由调用方的 {@link HighlightStackOptions.isOwnFrame} 判定 ——
 * 不能只看路径里有没有 `node_modules`：发布后的插件自己就装在 `node_modules` 里。
 *
 * 单独成文件（不带 JSX / React import）是为了能直接单测 —— 颜色是否真的分层，
 * 只有断言才说得清。
 */

/**
 * 调用栈高亮用的一组颜色。
 *
 * 整个错误页是暖红底，所以这里只用邻近色：玫瑰 → 红 → 橙 → 琥珀，靠色相小步移动
 * 加明度差把各段分开，不再借蓝紫这类对比色 —— 蓝紫压在红底上会跳出来抢戏。
 */
export const stackPalette = (dark: boolean) => ({
  base: dark ? 'rgba(255,255,255,0.82)' : 'rgba(127,29,29,0.88)',
  dim: dark ? 'rgba(255,255,255,0.32)' : 'rgba(127,29,29,0.38)',
  errName: dark ? '#f87171' : '#dc2626',
  tag: dark ? '#fb923c' : '#9a3412',
  fn: dark ? '#fda4af' : '#be123c',
  file: dark ? '#fcd34d' : '#a16207',
  num: dark ? '#fdba74' : '#c2410c'
})

const escapeHtmlText = (str: string) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')

/** 转义 + 给 CJK 段落套字体，与 convertAnsiToHtml 的 formatLogContent 同款 */
const withCjkFont = (str: string) =>
  escapeHtmlText(str).replace(/([㐀-鿿豈-﫿　-〿＀-￯]+)/g, '<span class="font-[HarmonyOS Sans SC]">$1</span>')

/**
 * 兜底的外部帧判定：只看文本特征，认不出路径。
 *
 * 它区分不了「第三方依赖」与「装在 node_modules 里跑的插件自己」—— 发布后的 kkk 正是
 * 后者，调用帧形如
 * `file:///…/node_modules/.pnpm/karin-plugin-kkk@…/node_modules/karin-plugin-kkk/lib/core_chunk/main.js:84860:65`，
 * `node_modules` 出现两次，于是每一帧都被压暗、整块图失去分层。所以它只作兜底（单测等
 * 无调用方上下文的场景），真实渲染一律由调用方给出 {@link HighlightStackOptions.isOwnFrame}。
 * @param location - 帧里的位置原文
 * @returns 是否属于本插件自己的代码
 */
const defaultIsOwnFrame = (location: string): boolean => !/node_modules|^node:|\(node:/.test(location)

/** {@link highlightStack} 的选项。 */
export interface HighlightStackOptions {
  /**
   * 判断一个调用帧的位置是否属于本插件自己的代码；返回 false 的帧整行压暗。
   * @param location - 帧里的位置原文，形如 `路径:行:列` 或 `node:internal/…`
   */
  isOwnFrame?: (location: string) => boolean
}

/**
 * 按结构高亮 JS 调用栈。
 * @param text - `error.stack` 原文（纯文本）
 * @param dark - 是否深色模式
 * @param options - 可选覆盖项；不给 `isOwnFrame` 时退回文本特征判定
 * @returns 可交给 dangerouslySetInnerHTML 的 HTML
 */
export const highlightStack = (text: string, dark: boolean, options: HighlightStackOptions = {}): string => {
  const isOwnFrame = options.isOwnFrame ?? defaultIsOwnFrame
  const c = stackPalette(dark)
  const paint = (color: string, str: string, bold = false) =>
    `<span style="color:${color}${bold ? ';font-weight:700' : ''}">${withCjkFont(str)}</span>`

  /**
   * `路径:行:列` —— 目录压暗、文件名高亮、行列号另一色。
   * @param loc - 位置原文
   * @param foreign - 外部帧，整行压暗
   * @param ownFrame - 有路径可判归属的帧；裸文件名无从判断，按外部保守处理
   */
  const paintLocation = (loc: string, foreign: boolean, ownFrame: boolean): string => {
    const dimAll = foreign || !ownFrame
    const pos = /^(.*?):(\d+):(\d+)$/.exec(loc)
    const body = pos ? pos[1] : loc
    const tail = pos ? paint(dimAll ? c.dim : c.num, `:${pos[2]}:${pos[3]}`) : ''
    const cut = Math.max(body.lastIndexOf('/'), body.lastIndexOf('\\'))
    if (cut < 0) return paint(dimAll ? c.dim : c.file, body) + tail
    return paint(c.dim, body.slice(0, cut + 1)) + paint(dimAll ? c.dim : c.file, body.slice(cut + 1)) + tail
  }

  return text
    .split('\n')
    .map((line) => {
      // 调用帧：`    at [async |new ]名字 (位置)` 或 `    at 位置`
      const frame = /^(\s*)at\s+(.*)$/.exec(line)
      if (frame) {
        const rest = frame[2]
        const prefix = paint(c.dim, `${frame[1]}at `)

        const named = /^(?:(async|new)\s+)?(.+?)\s+\((.+)\)$/.exec(rest)
        if (named) {
          const foreign = !isOwnFrame(named[3])
          const modifier = named[1] ? paint(c.dim, `${named[1]} `) : ''
          return (
            prefix +
            modifier +
            paint(foreign ? c.dim : c.fn, named[2]) +
            paint(c.dim, ' (') +
            paintLocation(named[3], foreign, true) +
            paint(c.dim, ')')
          )
        }
        // 匿名帧：整段就是位置；没有行列号的多半是裸文件名，无从判归属，按外部处理
        const hasPosition = /^(.*?):(\d+):(\d+)$/.test(rest)
        return prefix + paintLocation(rest, !isOwnFrame(rest), hasPosition)
      }

      // 首行：`AmagiError: [risk/ANTIBOT_PAGE] 平台返回了反爬页面 (...)`
      const head = /^([A-Za-z_$][\w$]*):\s([\s\S]*)$/.exec(line)
      if (head) {
        const tagMatch = /^(\[[^\]]+\])\s?([\s\S]*)$/.exec(head[2])
        const body = tagMatch ? paint(c.tag, tagMatch[1], true) + paint(c.base, ` ${tagMatch[2]}`) : paint(c.base, head[2])
        return paint(c.errName, head[1], true) + paint(c.dim, ': ') + body
      }

      return paint(c.base, line)
    })
    .join('\n')
}
