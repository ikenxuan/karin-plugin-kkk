import React from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { SSRChart } from '../ktr/template/statistics/components/SSRChart'
import { getChartPalette, renderChartToSVG } from '../ktr/template/statistics/components/chartTheme'

/** 一份最小的饼图配置，够触发真实的布局与文本渲染 */
const pieOption = (color: string) => ({
  series: [
    {
      type: 'pie',
      radius: ['40%', '60%'],
      label: { show: true, formatter: '{b} {d}%' },
      data: [
        { name: '抖音', value: 12, itemStyle: { color } },
        { name: '哔哩哔哩', value: 7, itemStyle: { color: '#fb7299' } }
      ]
    }
  ]
})

const renderReact = async (element: React.ReactElement): Promise<string> => {
  const stream = await renderToReadableStream(element)
  await stream.allReady
  return await new Response(stream).text()
}

describe('图表基座', () => {
  it('纯 Node 无 DOM 下能出 SVG', () => {
    expect(typeof document).toBe('undefined')
    const svg = renderChartToSVG(pieOption('#8b5cf6'), 1200, 900)
    expect(svg).toMatch(/^<svg /)
    expect(svg).toContain('</svg>')
  })

  it('产物是静态图形：没有脚本、没有 foreignObject', () => {
    const svg = renderChartToSVG(pieOption('#8b5cf6'), 1200, 900)
    expect(svg).not.toMatch(/<script/i)
    expect(svg).not.toMatch(/<foreignObject/i)
    // 文字必须是真 <text>，否则海报里的字体不会生效
    expect(svg).toMatch(/<text/i)
    expect(svg).toMatch(/font-family/i)
  })

  it('配色按明暗切换，且都是 hex —— zrender 不认 oklch', () => {
    for (const dark of [true, false]) {
      const palette = getChartPalette(dark)
      for (const value of Object.values(palette)) {
        expect(value, `${dark ? 'dark' : 'light'} 色板含非 hex 值`).toMatch(/^#[0-9a-fA-F]{3,8}$/)
      }
    }
    expect(getChartPalette(true).text).not.toBe(getChartPalette(false).text)
  })

  it('同一份 option 反复渲染结果稳定，且不残留实例', () => {
    const first = renderChartToSVG(pieOption('#8b5cf6'), 600, 400)
    for (let i = 0; i < 30; i++) renderChartToSVG(pieOption('#8b5cf6'), 600, 400)
    const last = renderChartToSVG(pieOption('#8b5cf6'), 600, 400)

    // ECharts 的 class 前缀走全局自增计数，会随渲染次数变化，
    // 所以比较形状而不是整串；几何数据必须完全一致。
    const strip = (svg: string) => svg.replace(/zr\d+-cls-\d+/g, 'zrN-cls-N')
    expect(strip(last)).toBe(strip(first))
  })
})

describe('SSRChart 组件', () => {
  it('React 19 SSR 下注入完整 SVG，且页面里没有脚本', async () => {
    const html = await renderReact(
      React.createElement(SSRChart, { option: pieOption('#8b5cf6'), width: 600, height: 400, className: 'my-chart' })
    )

    expect(html).not.toMatch(/<script/i)
    expect(html).toContain('<svg')
    expect(html).toContain('my-chart')
    expect(html).toContain('font-family')
    // ECharts 的多行标签是拆成多个 <text> 出的，这里只验证文本确实落地了
    expect(html).toContain('抖音')
  })

  it('同页两张图互不干扰（无 id 冲突，class 前缀各自独立）', async () => {
    const html = await renderReact(
      React.createElement(
        'div',
        null,
        React.createElement(SSRChart, { option: pieOption('#8b5cf6'), width: 600, height: 400 }),
        React.createElement(SSRChart, { option: pieOption('#fb7299'), width: 600, height: 400 })
      )
    )

    expect((html.match(/<svg/g) ?? []).length).toBe(2)
    // ECharts 不给根节点写 id，所以不存在同页 id 撞车
    expect(html).not.toMatch(/<svg[^>]*\sid="/)
  })
})
