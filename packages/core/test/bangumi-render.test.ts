import React from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { BangumiBilibili } from '../ktr/template/bilibili/bangumi/components/bangumi'
import type { BangumiBilibiliData } from '../ktr/template/bilibili/bangumi/components/types'
import type { BangumiBilibiliUPInfo } from '../ktr/template/bilibili/components/types'

/**
 * 番剧海报的 SSR 冒烟测试。
 *
 * 存在的理由：部分版权番剧（如 ss2572）的 season 接口不返回 `up_info`，
 * 模板此前直接读 `data.UPInfo.uname`，整张海报会渲染失败。这里固定两种响应形态：
 * 缺 up_info 时用制作公司与追番数兜底，有 up_info 时保持原来的 UP 主信息。
 */

const ctx = {
  scale: 1,
  theme: { mode: 'light' as const },
  version: {
    plugin: 'karin-plugin',
    pluginName: 'kkk',
    pluginVersion: '1.0.0',
    releaseType: 'Stable' as const,
    poweredBy: 'Karin',
    frameworkVersion: '1.16.2'
  }
}

const render = async (element: React.ReactElement): Promise<string> => {
  const stream = await renderToReadableStream(element)
  await stream.allReady
  return await new Response(stream).text()
}

/** ss2572（Charlotte）的真实响应：没有 up_info，制作信息在 staff 里 */
const seasonData: BangumiBilibiliData = {
  mainCover: 'https://example.com/cover.jpg',
  Actors: '乙坂有宇：内山昂辉\n友利奈绪：佐仓绫音',
  Evaluate: '思春期的少年少女中极少部分人会发作的特殊能力。',
  Link: 'https://www.bilibili.com/bangumi/play/ss2572',
  newEP: { desc: '已完结, 全13话', id: 69729, is_new: 0, title: '13' },
  Title: 'Charlotte',
  Styles: ['日常', '校园', '奇幻'],
  seasonID: 2572,
  Copyright: 'bilibili',
  Stat: {
    coins: 1342678,
    danmakus: 2829160,
    favorite: 307017,
    favorites: 6561458,
    follow_text: '665.9万系列追番',
    likes: 1695269,
    reply: 200913,
    share: 261606,
    views: 227468802,
    vt: 0
  },
  Episodes: [
    {
      episode: 1,
      cover: 'https://example.com/ep1.jpg',
      bvid: 'BV1gs411S7R6',
      link: 'https://www.bilibili.com/bangumi/play/ep63840',
      long_title: '将自己想象成他人',
      pub_time: 1436027400,
      badge: '',
      badge_info: { bg_color: '#FB7299', bg_color_night: '#D44E7D', text: '' }
    }
  ],
  length: 13
}

const upInfo: BangumiBilibiliUPInfo = {
  avatar: 'https://example.com/avatar.jpg',
  avatar_subscript_url: '',
  follower: 9087862,
  is_follow: 0,
  mid: 928123,
  nickname_color: '',
  pendant: { image: '', name: '', pid: 0 },
  theme_type: 0,
  uname: '哔哩哔哩番剧',
  verify_type: 0,
  vip_label: { bg_color: '', bg_style: 0, border_color: '', text: '', text_color: '' },
  vip_status: 0,
  vip_type: 0
}

describe('B站番剧海报', () => {
  it('缺少 up_info 时用制作公司和追番数兜底', async () => {
    const html = await render(
      React.createElement(BangumiBilibili, {
        data: { ...seasonData, Staff: '原作：麻枝准\n监督：浅井义之\n动画制作：P.A.WORKS' },
        ctx
      })
    )

    expect(html).toContain('制作 P.A.WORKS')
    expect(html).toContain('665.9万系列追番')
    expect(html).not.toContain('UP 主')
  })

  it('没有制作信息时只保留追番数', async () => {
    const html = await render(
      React.createElement(BangumiBilibili, {
        data: { ...seasonData, Staff: '脚本：桜井正明\n导演：ムトウユージ\n原作：臼井儀人' },
        ctx
      })
    )

    expect(html).toContain('665.9万系列追番')
    expect(html).not.toContain('制作 ')
    expect(html).not.toContain('UP 主')
  })

  it('有 up_info 时保持原来的 UP 主与粉丝数', async () => {
    const html = await render(
      React.createElement(BangumiBilibili, {
        data: { ...seasonData, UPInfo: upInfo },
        ctx
      })
    )

    expect(html).toContain('UP 主 哔哩哔哩番剧')
    expect(html).toContain('粉丝 908.8万')
    expect(html).not.toContain('665.9万系列追番')
  })
})
