import { describe, expect, it } from 'vitest'

import { highlightStack, stackPalette } from '../ktr/template/other/handlerError/components/stackHighlight'

/**
 * 调用栈高亮的契约。
 *
 * 背景：amagi 的错误现在只印 `error.stack`（纯文本，没有 ANSI），而错误图原先
 * 只有一个按 ANSI 转义上色的 `convertAnsiToHtml` —— 纯文本进去出来是**一整段
 * 同色**。这里断言颜色真的分层了，而不是「看起来加了个函数」。
 */

const STACK = [
  'AmagiError: [risk/ANTIBOT_PAGE] 平台返回了反爬页面 (douyin.parseWork HTTP 403 requestId=mtm03xli attempts=1)',
  '    at <anonymous> (D:\\GitHub\\karin-plugin-kkk\\packages\\core\\src\\module\\utils\\amagiClient.ts:162:50)',
  '    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)',
  '    at async DouYin.DouyinHandler (D:\\GitHub\\karin-plugin-kkk\\packages\\core\\src\\platform\\douyin\\douyin.ts:65:27)',
  '    at async groupsCmd (D:\\GitHub\\karin-plugin-kkk\\node_modules\\.pnpm\\node-karin@1.16.2\\node_modules\\node-karin\\dist\\file-ZGuqNDd-.mjs:10408:19)'
].join('\n')

/** 取出 HTML 里用到的全部颜色值 */
const colorsUsed = (html: string): string[] => [...html.matchAll(/color:([^;"]+)/g)].map((m) => m[1])

describe('highlightStack', () => {
  const dark = highlightStack(STACK, true)
  const light = highlightStack(STACK, false)
  const p = stackPalette(true)

  it('一段栈里出现多种颜色，不再是整段同色', () => {
    expect(new Set(colorsUsed(dark)).size).toBeGreaterThanOrEqual(5)
  })

  it('错误名、[kind/CODE] 标签、函数名、文件名、行列号各自成色', () => {
    expect(dark).toContain(`color:${p.errName};font-weight:700">AmagiError`)
    expect(dark).toContain(`color:${p.tag};font-weight:700">[risk/ANTIBOT_PAGE]`)
    // 函数名
    expect(dark).toContain(`color:${p.fn}">DouYin.DouyinHandler`)
    // 文件名与目录分开：目录压暗、文件名高亮
    expect(dark).toContain(`color:${p.file}">douyin.ts`)
    expect(dark).toContain(`color:${p.dim}">D:\\GitHub\\karin-plugin-kkk\\packages\\core\\src\\platform\\douyin\\`)
    // 行列号
    expect(dark).toContain(`color:${p.num}">:65:27`)
  })

  it('node_modules 与 node 内部帧整行压暗（项目里的帧才亮）', () => {
    // node-karin 的帧：函数名也走 dim
    expect(dark).toContain(`color:${p.dim}">groupsCmd`)
    // node: 内部帧
    expect(dark).toContain(`color:${p.dim}">process.processTicksAndRejections`)
    // 项目里的帧不压暗
    expect(dark).not.toContain(`color:${p.dim}">DouYin.DouyinHandler`)
  })

  it('深浅模式给的是两套颜色', () => {
    expect(new Set(colorsUsed(dark))).not.toEqual(new Set(colorsUsed(light)))
  })

  it('转义 HTML，不给注入留口子', () => {
    const html = highlightStack('Error: <img src=x onerror="alert(1)">', true)
    expect(html).not.toContain('<img')
    expect(html).toContain('&lt;img')
    expect(html).toContain('&quot;')
  })

  it('CJK 段落套上模板用的字体', () => {
    expect(dark).toContain('font-[HarmonyOSHans-Regular]')
  })

  it('行数与输入一致（逐行处理，不吞行）', () => {
    expect(dark.split('\n')).toHaveLength(STACK.split('\n').length)
  })

  it('没有 at 前缀的普通行也不会丢', () => {
    expect(highlightStack('just one line', true)).toContain('just one line')
  })
})
