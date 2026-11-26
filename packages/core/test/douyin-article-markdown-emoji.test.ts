import { setUnicodeEmojiSrcResolver } from '@kkk/richtext'
import React from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { afterAll, describe, expect, it } from 'vitest'

import '@/module/utils/emojiAssets'

import { DouyinArticleWork } from '../ktr/template/douyin/article-work/components/ArticleWork'
import type { DouyinArticleWorkData } from '../ktr/template/douyin/article-work/components/types'

const renderArticle = async (markdown: string): Promise<string> => {
  const data: DouyinArticleWorkData = {
    title: 'Emoji Markdown 测试',
    markdown,
    images: [],
    read_time: 1,
    dianzan: '0',
    pinglun: '0',
    shouchang: '0',
    share: '0',
    create_time: '2026-11-26 12:00',
    avater_url: 'https://example.com/avatar.png',
    username: '测试作者',
    抖音号: 'emoji-test',
    获赞: '0',
    关注: '0',
    粉丝: '0',
    share_url: 'https://www.douyin.com/'
  }
  const stream = await renderToReadableStream(
    React.createElement(DouyinArticleWork, {
      data,
      ctx: { scale: 1, theme: { mode: 'light' } }
    })
  )
  await stream.allReady
  return new Response(stream).text()
}

describe('抖音文章 Markdown Apple emoji', () => {
  afterAll(() => setUnicodeEmojiSrcResolver(null))

  it('将正文 Unicode emoji 转为带 Apple 资源的行内图片', async () => {
    const html = await renderArticle('正文 😰 后续文字')

    expect(html).toMatch(/<img src="data:image\/png;base64,[a-z0-9+/=]+" alt="😰"/i)
    expect(html).toContain('class="mx-1 inline-block object-contain mb-4"')
    expect(html).toContain('style="height:1.2em;width:1.2em"')
    expect(html).not.toContain('kkk-apple-emoji')
    expect(html).toContain('后续文字')
  })

  it('不转换行内代码与代码块中的 emoji', async () => {
    const html = await renderArticle('行内 `😰`\n\n```text\n😰\n```')

    expect(html).toMatch(/<code[^>]*>😰<\/code>/)
    expect(html).toMatch(/<pre[^>]*>[\s\S]*?😰[\s\S]*?<\/pre>/)
    expect(html).not.toContain('kkk-apple-emoji')
  })

  it('普通 Markdown 图片仍走文章大图样式，并拒绝非 Apple 标记的 data URL', async () => {
    const html = await renderArticle('![普通图](https://example.com/image.png)\n\n![不可信图片](data:image/png;base64,AA==)')

    expect(html).toContain('src="https://example.com/image.png"')
    expect(html).toContain('relative z-10 block h-auto w-full drop-shadow-2xl')
    expect(html).not.toContain('src="data:image/png;base64,AA=="')
    expect(html).not.toContain('alt="不可信图片"')
  })
})
