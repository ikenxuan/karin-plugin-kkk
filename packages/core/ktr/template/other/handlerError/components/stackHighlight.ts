/**
 * 调用栈的结构化高亮。
 *
 * 与 `convertAnsiToHtml` 的分工：那个按 ANSI 转义上色，只适用于 `util.inspect`
 * 的彩色转储。amagi 的错误现在只印 `error.stack`（纯文本、没有 ANSI），交给它
 * 整段就是一个颜色 —— 所以这里按**结构**上色：错误名、`[kind/CODE]` 标签、
 * 函数名、目录、文件名、行列号各一色，`node_modules` 与 node 内部帧整行压暗，
 * 一眼能挑出项目里的帧。
 *
 * 单独成文件（不带 JSX / React import）是为了能直接单测 —— 颜色是否真的分层，
 * 只有断言才说得清。
 */

/** 调用栈高亮用的一组颜色 */
export const stackPalette = (dark: boolean) => ({
  base: dark ? 'rgba(255,255,255,0.82)' : 'rgba(127,29,29,0.88)',
  dim: dark ? 'rgba(255,255,255,0.32)' : 'rgba(127,29,29,0.38)',
  errName: dark ? '#f87171' : '#dc2626',
  tag: dark ? '#c4b5fd' : '#6d28d9',
  fn: dark ? '#fca5a5' : '#b91c1c',
  file: dark ? '#fcd34d' : '#a16207',
  num: dark ? '#7dd3fc' : '#0369a1'
})

const escapeHtmlText = (str: string) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')

/** 转义 + 给 CJK 段落套字体，与 convertAnsiToHtml 的 formatLogContent 同款 */
const withCjkFont = (str: string) =>
  escapeHtmlText(str).replace(/([㐀-鿿豈-﫿　-〿＀-￯]+)/g, '<span class="font-[HarmonyOSHans-Regular]">$1</span>')

/**
 * 按结构高亮 JS 调用栈。
 * @param text - `error.stack` 原文（纯文本）
 * @param dark - 是否深色模式
 * @returns 可交给 dangerouslySetInnerHTML 的 HTML
 */
export const highlightStack = (text: string, dark: boolean): string => {
  const c = stackPalette(dark)
  const paint = (color: string, str: string, bold = false) =>
    `<span style="color:${color}${bold ? ';font-weight:700' : ''}">${withCjkFont(str)}</span>`

  /** `路径:行:列` —— 目录压暗、文件名高亮、行列号另一色 */
  const paintLocation = (loc: string, dimAll: boolean): string => {
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
        // 自己的代码才高亮；依赖与 node 内部整行压暗
        const foreign = /node_modules|^node:|\(node:/.test(rest)
        const prefix = paint(c.dim, `${frame[1]}at `)

        const named = /^(?:(async|new)\s+)?(.+?)\s+\((.+)\)$/.exec(rest)
        if (named) {
          const modifier = named[1] ? paint(c.dim, `${named[1]} `) : ''
          return (
            prefix +
            modifier +
            paint(foreign ? c.dim : c.fn, named[2]) +
            paint(c.dim, ' (') +
            paintLocation(named[3], foreign) +
            paint(c.dim, ')')
          )
        }
        return prefix + paintLocation(rest, foreign)
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
