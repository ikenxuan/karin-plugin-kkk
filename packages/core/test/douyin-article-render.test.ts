import React from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { DouyinArticleWork } from '../ktr/template/douyin/article-work/components/ArticleWork'
import type { DouyinArticleWorkData } from '../ktr/template/douyin/article-work/components/types'

const renderArticle = async (
  markdown: string,
  mode: 'light' | 'dark' = 'light',
  coverUrl?: string,
  coverColor?: string
): Promise<string> => {
  const data: DouyinArticleWorkData = {
    title: '文章换行测试',
    markdown,
    cover_url: coverUrl,
    images: [],
    read_time: 1,
    dianzan: '1',
    pinglun: '0',
    shouchang: '0',
    share: '0',
    create_time: '2026-11-24 12:00',
    avater_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=',
    username: '测试作者',
    抖音号: 'article-test',
    获赞: '1',
    关注: '0',
    粉丝: '0',
    share_url: 'https://www.douyin.com/'
  }
  const stream = await renderToReadableStream(
    React.createElement(DouyinArticleWork, {
      data,
      ctx: {
        scale: 1,
        theme: { mode },
        coverColor,
        version: {
          plugin: 'kkk',
          pluginName: 'kkk',
          pluginVersion: '1.0.0',
          releaseType: 'Stable',
          poweredBy: 'Karin',
          frameworkVersion: '1.0.0'
        }
      }
    })
  )
  await stream.allReady
  return new Response(stream).text()
}

describe('抖音文章 Markdown 与封面', () => {
  it('封面 URL 缺失时仍正常渲染正文', async () => {
    const html = await renderArticle('Web 正文')

    expect(html).toContain('文章换行测试</h1>')
    expect(html).toContain('Web 正文')
    expect(html).not.toContain('alt="文章封面"')
  })

  it.each([
    ['light', '#c48854'],
    ['dark', '#3b526a']
  ] as const)('%s 主题下文章封面以同一主色完成模糊过渡', async (mode, coverColor) => {
    const coverUrl = 'https://example.com/article-cover.jpg'
    const html = await renderArticle('保持阅读对比', mode, coverUrl, coverColor)
    const rootStyle = html.match(/<div class="[^"]*w-360[^"]*" style="([^"]*)">/)?.[1] ?? ''
    const transition = [...html.matchAll(/style="([^"]*background-image:[^"]*)"/g)].map(([, style]) => style)
    const coverIndex = html.indexOf('alt="文章封面"')
    const titleIndex = html.indexOf('文章换行测试</h1>')

    expect(rootStyle).toContain(`background-color:${coverColor}`)
    expect(html).toContain(coverUrl)
    expect(coverIndex).toBeGreaterThan(0)
    expect(coverIndex).toBeLessThan(titleIndex)
    expect(html).toContain('backdrop-filter:blur(28px)')
    expect(html).toContain('filter:blur(32px)')
    expect(html).toContain('filter:blur(72px)')
    expect(transition.some((style) => style.includes(`color-mix(in oklab, ${coverColor} 3%, transparent)`))).toBe(true)
    expect(transition.some((style) => style.includes(`color-mix(in oklab, ${coverColor} 98%, transparent)`))).toBe(true)
    expect(transition.some((style) => style.includes(`${coverColor} 100%`))).toBe(true)
    expect(html).toContain('id="douyinArticleWorkBackgroundNoise"')
    expect(html).toContain('id="douyinArticleWorkCoverNoise"')
    expect(html).toContain('保持阅读对比')
  })

  it.each(['<br>', '<br/>', '<br />', '<BR />'])('将段落内的 %s 渲染成换行', async (tag) => {
    const html = await renderArticle(`第一行${tag}第二行`)

    expect(html).toContain('第一行<br/>第二行')
  })

  it('保留相邻换行和换行标签后的正文', async () => {
    const html = await renderArticle('<br/>\n第二行<br/><br/>第三行')

    expect(html.match(/<br\s*\/?>/g) ?? []).toHaveLength(3)
    expect(html).toContain('第二行')
    expect(html).toContain('第三行')
    expect(html).not.toContain('&lt;br')
  })

  it.each(['`<br/>`', '```html\n<br/>\n```', '    <br/>', '&lt;br/&gt;', '\\<br/>'])('保留代码或转义文本 %s', async (markdown) => {
    const html = await renderArticle(markdown)

    expect(html).toContain('&lt;br/&gt;')
    expect(html).not.toMatch(/<br\s*\/?>/)
  })

  it('保持带属性的 HTML 标签和脚本内容为文本', async () => {
    const html = await renderArticle('<br onclick="alert(1)">\n\n<span title="<br/>">正文</span>\n\n<script>alert(1)</script>')

    expect(html).toContain('&lt;br onclick=')
    expect(html).toContain('&lt;span title=')
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
    expect(html).not.toMatch(/<br\s+onclick=/)
    expect(html).not.toContain('<script>')
  })

  it.each(['<!-- <br/> -->', '<script>const tag = "<br/>"</script>', '<style>/* <br/> */</style>'])(
    '保留 HTML 注释和原始文本元素 %s',
    async (markdown) => {
      const html = await renderArticle(markdown)

      expect(html).toContain('&lt;br/&gt;')
      expect(html).not.toMatch(/<br\s*\/?>/)
    }
  )

  it('保留 Markdown 图片尺寸清理', async () => {
    const html = await renderArticle('![图片描述](https://example.com/image.png width=600 height=400)')

    expect(html).toContain('src="https://example.com/image.png"')
    expect(html).not.toContain('width=600 height=400')
  })
})
