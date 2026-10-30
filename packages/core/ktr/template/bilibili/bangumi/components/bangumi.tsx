import { format } from 'date-fns'
import { ArrowDownWideNarrow, MousePointerClick, Timer } from 'lucide-react'
import React from 'react'

import { isDark } from '../../../../utils/theme'
import { AmbientCover } from '../../../components/AmbientCover'
import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterContext, PosterProps } from '../../../types/ctx'
import { EnhancedImage } from '../../components/shared'
import type { BangumiBilibiliData } from './types'

/*
 * B 站番剧选集海报（杂志编辑排版，和抖音合集选集是兄弟模板）
 * 刊头 → 专题 hero（封面 + 大标题 + 导语 + 演职员栏）→ 数据栏 → 目录页（巨型集号区间 + 操作说明）→ 选集网格 → 版权栏。
 * 秩序靠字体层级和留白建立，不使用分隔线；唯一强调色是 B 站粉：浅色主题压深一档保证眉题可读，命令 chip 用更深的覆盆子粉保证白字对比度。
 * 操作说明按 selectionMode 区分：button 对应 QQBot 键盘，text 只列出当前页真正能用的命令。
 */

type BangumiEpisode = BangumiBilibiliData['Episodes'][number]
type SelectionMode = NonNullable<BangumiBilibiliData['selectionMode']>
type NumberedEpisode = { episode: BangumiEpisode; number: number }

/** 海报每页展示的集数，和 core 的 EPISODE_SELECTION_PAGE_SIZE 保持一致 */
const DEFAULT_POSTER_PAGE_SIZE = 15
/** 选集有效期兜底（秒），正常由 data.timeoutSeconds 下发，和 core 的 EPISODE_SELECTION_TTL_SECONDS 保持一致 */
const DEFAULT_TIMEOUT_SECONDS = 120
/** QQBot 键盘每行的数字按钮数，和 core 的 EPISODE_SELECTION_BUTTONS_PER_ROW 保持一致 */
const KEYS_PER_ROW = 5
/** 演职员栏最多列出的「角色 声优」对数，其余折叠成「等 N 人」 */
const CAST_LIMIT = 5
/** B 站粉：浅色主题压深到 #E04F86（大字对比度约 3.4:1），深色主题用品牌色 #FB7299 */
const ACCENT_TEXT = 'text-[#E04F86] dark:text-[#FB7299]'
const ACCENT_BG = 'bg-[#E04F86] dark:bg-[#FB7299]'
/** 命令 chip 底色：覆盆子粉，白字对比度约 4.7:1 */
const CHIP_BG = '#CC3D72'
/** 徽标缺色时的中性兜底 */
const BADGE_FALLBACK = '#71717A'
/** 网格补位块的跨列类名（Tailwind 只认静态字面量） */
const COL_SPAN: Record<number, string> = { 1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4' }
const COPYRIGHT_LABEL: Record<string, string> = { dujia: '独家' }

/** 万/亿 计数拆成数值与单位：10 亿以下的亿级两位小数，其余一位，去掉末尾 0（306.0万 → 306万）；不足 1 万原样返回 */
const splitCount = (count: number): { value: string; unit: string } => {
  if (count >= 1e9) return { value: `${Number((count / 1e8).toFixed(1))}`, unit: '亿' }
  if (count >= 1e8) return { value: `${Number((count / 1e8).toFixed(2))}`, unit: '亿' }
  if (count >= 1e4) return { value: `${Number((count / 1e4).toFixed(1))}`, unit: '万' }
  return { value: Math.max(0, Math.round(count)).toString(), unit: '' }
}

/** 「1800.1万追番」「1158.7万系列追番」拆成数值 / 单位 / 标签；数值照抄 B 站的文本，和番剧页显示一致 */
const parseFollowText = (text: string): { value: string; unit: string; label: string } | null => {
  const match = /^\s*(\d+(?:\.\d+)?)\s*(万|亿)?\s*(.*)$/.exec(text || '')
  if (!match) return null
  return { value: match[1], unit: match[2] ?? '', label: match[3].trim() || '追番' }
}

/** 演职员表：后端给的是换行分隔的「角色：声优」「职务：人名」「其他配音演员：a、b、c」 */
const STAFF_ROLE = /导演|监督|统筹|监制|制片|出品|编剧|原作|原著|音乐|作曲|美术|剪辑|分镜|作画|动画|总监|策划|配音指导/
const EXTRA_CAST_ROLE = /^(其他)?(配音)?演员$|^其他配音$|^其他声优$/
const parseCredits = (raw: string) => {
  const cast: { role: string; actor: string }[] = []
  const staff: { role: string; name: string }[] = []
  const extras: string[] = []
  for (const line of (raw || '').split(/\r?\n/)) {
    const text = line.trim()
    if (!text) continue
    const index = text.search(/[：:]/)
    if (index < 0) {
      extras.push(
        ...text
          .split(/[、，,]/)
          .map((name) => name.trim())
          .filter(Boolean)
      )
      continue
    }
    // 全角空格对齐的角色名（「马  克」）去掉空白
    const role = text.slice(0, index).replace(/\s+/g, '')
    const value = text.slice(index + 1).trim()
    if (!role || !value) continue
    if (EXTRA_CAST_ROLE.test(role))
      extras.push(
        ...value
          .split(/[、，,]/)
          .map((name) => name.trim())
          .filter(Boolean)
      )
    else if (STAFF_ROLE.test(role)) staff.push({ role, name: value })
    else cast.push({ role, actor: value })
  }
  const voiceCount = new Set([...cast.map((item) => item.actor), ...extras]).size
  return { cast, staff, extras, voiceCount }
}

/** 版权番剧没有 up_info 时，从制作人员里取制作公司：优先「动画制作」，其次「制作/製作」 */
const parseMaker = (raw: string): string => {
  let fallback = ''
  for (const line of (raw || '').split(/\r?\n/)) {
    const match = /^\s*(动画制作公司|动画制作|制作公司|制作|製作)[：:]\s*(.+?)\s*$/.exec(line)
    if (!match) continue
    if (/动画制作/.test(match[1])) return match[2]
    if (!fallback) fallback = match[2]
  }
  return fallback
}

/** 发布日期统一写成 2026.10.24，等宽数字列对齐，跨年也不歧义 */
const formatPubDate = (seconds: number): string => (seconds > 0 ? format(new Date(seconds * 1000), 'yyyy.MM.dd') : '')

/** 按展示顺序（最新在前）写区间；只有一集时写「第 a 集」 */
const formatEpisodeRange = (first: number, last: number): string => (first === last ? `第 ${first} 集` : `第 ${first}–${last} 集`)

/** 标题按字数分档：短标题撑满版面，长标题收字号换行 */
const getTitleClassName = (length: number): string => {
  if (length <= 6) return 'text-[132px] leading-[1.05]'
  if (length <= 10) return 'text-[112px] leading-[1.08]'
  if (length <= 16) return 'text-[96px] leading-[1.1] line-clamp-2'
  if (length <= 24) return 'text-[80px] leading-[1.14] line-clamp-2'
  return 'text-[68px] leading-[1.18] line-clamp-3'
}

/** 巨型区间数字的字宽系数（字号的倍数，含 -0.04em 字距），按 tabular 数字和短横线的实测宽度取上限 */
const RANGE_NUMERAL_ADVANCE = 0.56

/** 目录页巨型区间数字的字号：按左栏内容宽度和字符数反推，最大 184px，4 位集号的长区间也不会溢出 */
const getRangeNumeralSize = (length: number, compact: boolean): number =>
  Math.min(184, Math.floor((compact ? 448 : 520) / (Math.max(length, 1) * RANGE_NUMERAL_ADVANCE)))

/** 背景：封面弥散 + 离散噪点，与兄弟模板同一套图层 */
const PosterBackground: React.FC<{ src: string; ctx: PosterContext }> = ({ src, ctx }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
    <AmbientCover src={src} ctx={ctx} />
    <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay dark:mix-blend-soft-light">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="bangumiNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
            <feComponentTransfer>
              <feFuncA type="linear" slope="2" intercept="-0.5" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#bangumiNoise)" fill="white" />
      </svg>
    </div>
  </div>
)

/** 刊头：栏目名 + 平台 logo，靠字距和留白收束 */
const Masthead: React.FC<{ label: string; ctx: PosterContext }> = ({ label, ctx }) => (
  <header className="flex items-center justify-between pb-7">
    <div className="flex items-center gap-5 text-[26px] font-bold tracking-[0.32em] text-foreground">
      <span className={`h-5 w-5 ${ACCENT_BG}`} />
      <span>{label}</span>
    </div>
    <img src={isDark(ctx) ? '/image/bilibili/bilibili-light.png' : '/image/bilibili/bilibili.png'} alt="哔哩哔哩" className="h-14 w-auto" />
  </header>
)

/** 眉题：强调色小号粗体，用细点分隔 */
const Kicker: React.FC<{ items: string[] }> = ({ items }) => (
  <div className={`flex flex-wrap items-center gap-x-4 text-[30px] font-bold ${ACCENT_TEXT}`}>
    {items.map((item, index) => (
      <React.Fragment key={`${index}-${item}`}>
        {index > 0 && <span className="text-muted">·</span>}
        <span>{item}</span>
      </React.Fragment>
    ))}
  </div>
)

/** 数据栏：四格铺在浅色面板上，用留白代替分隔线，小标签 + 粗体大数字 + 小单位 */
const Ledger: React.FC<{ items: { label: string; value: string; unit: string }[] }> = ({ items }) => (
  <div className="grid grid-cols-4 gap-x-10 rounded-3xl bg-foreground/5 px-10 py-8">
    {items.map((item) => (
      <div key={item.label}>
        <div className="text-[24px] font-medium text-foreground/65">{item.label}</div>
        <div className="mt-1 flex items-baseline gap-1.5 text-foreground">
          <span className="text-[60px] leading-none font-black tabular-nums">{item.value}</span>
          {item.unit && <span className="text-[26px] font-bold">{item.unit}</span>}
        </div>
      </div>
    ))}
  </div>
)

/** 演职员栏的一行：左侧小标签，右侧内容 */
const CreditRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex gap-6">
    <dt className="w-16 shrink-0 pt-0.5 text-[24px] font-bold text-foreground/65">{label}</dt>
    <dd className="min-w-0 flex-1 text-[26px] leading-[1.55] text-foreground">{children}</dd>
  </div>
)

/** 专题 hero：左封面，右眉题 / 大标题 / 类型 / 简介 / 演职员栏 */
const Hero: React.FC<{ data: BangumiBilibiliData }> = ({ data }) => {
  const credits = parseCredits(data.Actors)
  const shownCast = credits.cast.slice(0, CAST_LIMIT)
  const shownExtras = shownCast.length > 0 ? [] : credits.extras.slice(0, CAST_LIMIT)
  const shownCount = shownCast.length + shownExtras.length
  const statusParts = (data.newEP?.desc || '')
    .split(/[,，]/)
    .map((part) => part.trim())
    .filter(Boolean)
  const copyright = COPYRIGHT_LABEL[data.Copyright]
  const kicker = ['番剧', ...(copyright ? [copyright] : []), ...statusParts]

  return (
    <div className="flex items-stretch gap-16">
      {/* 封面随右栏拉伸到同高；最小高度保证 3:4 竖版海报的基本比例 */}
      <div className="relative min-h-146.75 w-110 shrink-0 overflow-hidden rounded-8xl bg-surface-secondary shadow-2xl shadow-black/20">
        <div className="absolute inset-0">
          <EnhancedImage src={data.mainCover} alt={data.Title} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <Kicker items={kicker} />
        <h1 className={`mt-5 font-black tracking-tight text-balance text-foreground ${getTitleClassName(data.Title.length)}`}>
          {data.Title}
        </h1>
        {data.Styles.length > 0 && <div className="mt-3 text-[30px] font-medium text-foreground/70">{data.Styles.join(' / ')}</div>}
        {data.Evaluate && <p className="mt-5 line-clamp-3 text-[30px] leading-[1.55] font-light text-foreground/80">{data.Evaluate}</p>}
        {(shownCount > 0 || credits.staff.length > 0) && (
          <div className="mt-auto pt-8">
            <dl className="flex flex-col gap-2.5 pt-6">
              {shownCount > 0 && (
                <CreditRow label="声优">
                  <span className="flex flex-wrap gap-x-7">
                    {shownCast.map((item) => (
                      <span key={`${item.role}-${item.actor}`}>
                        <span className="text-foreground/60">{item.role}</span> <span className="font-bold">{item.actor}</span>
                      </span>
                    ))}
                    {shownExtras.length > 0 && <span className="font-bold">{shownExtras.join('、')}</span>}
                    {credits.voiceCount > shownCount && <span className="text-foreground/60">等 {credits.voiceCount} 人</span>}
                  </span>
                </CreditRow>
              )}
              {credits.staff.length > 0 && (
                <CreditRow label="制作">
                  <span className="flex flex-wrap gap-x-7">
                    {credits.staff.slice(0, 3).map((item) => (
                      <span key={`${item.role}-${item.name}`}>
                        <span className="text-foreground/60">{item.role}</span> <span className="font-bold">{item.name}</span>
                      </span>
                    ))}
                  </span>
                </CreditRow>
              )}
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}

/** 可执行命令：统一实心高对比 chip */
const CommandChip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    className="inline-flex h-15 items-center rounded-2xl px-6 text-[30px] font-bold whitespace-nowrap text-white shadow-lg shadow-black/15"
    style={{ backgroundColor: CHIP_BG }}
  >
    {children}
  </span>
)

/** 有效期说明：两种模式共用；主句加粗，补充说明降一档。只有一页时没有翻页，不提重新计时 */
const ValidityNote: React.FC<{ seconds: number; pageCount: number }> = ({ seconds, pageCount }) => (
  <div className="flex items-start gap-3 text-[26px] leading-snug">
    <Timer className="mt-0.5 h-7 w-7 shrink-0 text-foreground/70" strokeWidth={2.2} />
    <div>
      <div className="font-bold text-foreground">
        {seconds} 秒内有效{pageCount > 1 && '，翻页重新计时'}
      </div>
      <div className="mt-0.5 text-foreground/65">过期请重新发送原链接</div>
    </div>
  </div>
)

/** 文字命令模式：只列出当前页真正能用的命令；后端也认纯数字集号，用本页第一集举例 */
const TextGuide: React.FC<{ first: number; page: number; pageCount: number; seconds: number }> = ({ first, page, pageCount, seconds }) => (
  <div className="flex flex-col gap-5">
    <div className="text-[34px] font-black text-foreground">回复文字选集</div>
    <div className="flex items-center gap-5">
      <span className="w-19 shrink-0 text-[28px] font-bold text-foreground">选集</span>
      <span className="text-[26px] text-foreground/65">发送</span>
      <CommandChip>第?集</CommandChip>
      <span className="text-[26px] text-foreground/65">也可只发集号，如 {first}</span>
    </div>
    {pageCount > 1 ? (
      <div className="flex items-center gap-5">
        <span className="w-19 shrink-0 text-[28px] font-bold text-foreground">翻页</span>
        <span className="text-[26px] text-foreground/65">发送</span>
        <div className="flex flex-wrap gap-3">
          {page > 1 && <CommandChip>上一页</CommandChip>}
          {page < pageCount && <CommandChip>下一页</CommandChip>}
          <CommandChip>第?页</CommandChip>
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-5">
        <span className="w-19 shrink-0 text-[28px] font-bold text-foreground">翻页</span>
        <span className="text-[26px] text-foreground/65">只有这一页，无需翻页</span>
      </div>
    )}
    <ValidityNote seconds={seconds} pageCount={pageCount} />
  </div>
)

/** 键盘示意里的一枚按钮：数字键与「跳转」是蓝框键（style 1），翻页是灰框键；small 给 4 位集号用 */
const SketchKey: React.FC<{ children: React.ReactNode; quiet?: boolean; small?: boolean }> = ({ children, quiet, small }) => (
  <span
    className={
      quiet
        ? 'flex h-11 flex-1 items-center justify-center rounded-lg border-2 border-foreground/20 text-[24px] font-bold text-foreground/60'
        : `flex h-11 flex-1 items-center justify-center rounded-lg border-2 border-foreground/45 font-bold text-foreground tabular-nums ${small ? 'text-[18px]' : 'text-[24px]'}`
    }
  >
    {children}
  </span>
)

/** 按钮模式的键盘示意：只画本页真实存在的按钮，排布与 QQBot 键盘一致；宽度固定，4 位集号收小字号，左侧说明不被挤到换行 */
const KeySketch: React.FC<{ numbers: number[]; page: number; pageCount: number }> = ({ numbers, page, pageCount }) => {
  const rows: number[][] = []
  for (let index = 0; index < numbers.length; index += KEYS_PER_ROW) rows.push(numbers.slice(index, index + KEYS_PER_ROW))
  const navigation = [page > 1 ? '上一页' : '', page < pageCount ? '下一页' : ''].filter(Boolean)
  const small = numbers.some((number) => number >= 1000)

  return (
    <div className="flex w-82.5 shrink-0 flex-col gap-1.5 self-start rounded-3xl bg-surface/60 p-3">
      {pageCount > 1 && <SketchKey>跳转到第x页</SketchKey>}
      {rows.map((row) => (
        <div key={row[0]} className="flex gap-1.5">
          {row.map((number) => (
            <SketchKey key={number} small={small}>
              {number}
            </SketchKey>
          ))}
        </div>
      ))}
      {navigation.length > 0 && (
        <div className="flex gap-1.5">
          {navigation.map((label) => (
            <SketchKey key={label} quiet>
              {label}
            </SketchKey>
          ))}
        </div>
      )}
    </div>
  )
}

/** 按钮模式：引导点按钮，不出现任何手打命令 */
const ButtonGuide: React.FC<{ numbers: number[]; page: number; pageCount: number; seconds: number }> = ({
  numbers,
  page,
  pageCount,
  seconds
}) => (
  <div className="flex gap-6">
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="flex items-center gap-3 text-[34px] font-black text-foreground">
        <MousePointerClick className={`h-9 w-9 shrink-0 ${ACCENT_TEXT}`} strokeWidth={2.4} />
        <span>点击下方按钮选集</span>
      </div>
      <ul className="flex flex-col gap-2 text-[26px] leading-snug text-foreground/80">
        <li>数字键即集号，点一下直接解析</li>
        {pageCount > 1 && <li>「跳转到第x页」补上页码再发送</li>}
      </ul>
      <ValidityNote seconds={seconds} pageCount={pageCount} />
    </div>
    <KeySketch numbers={numbers} page={page} pageCount={pageCount} />
  </div>
)

/** 目录页开篇：巨型区间数字 + 操作说明 */
const Contents: React.FC<{ items: NumberedEpisode[]; page: number; pageCount: number; mode: SelectionMode; seconds: number }> = ({
  items,
  page,
  pageCount,
  mode,
  seconds
}) => {
  const first = items[0]?.number ?? 0
  const last = items[items.length - 1]?.number ?? 0
  const numeral = first === last ? `${first}` : `${first}–${last}`
  const compact = mode === 'button'

  return (
    <section>
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-5">
          <span className={`h-6 w-6 self-center ${ACCENT_BG}`} />
          <h2 className="text-[72px] leading-none font-black text-foreground">选集</h2>
          <span className="text-[24px] font-bold tracking-[0.3em] text-foreground/55">CONTENTS</span>
        </div>
        <div className="rounded-full bg-foreground/10 px-7 py-2 text-[34px] font-bold text-foreground tabular-nums">
          第 {page} / {pageCount} 页
        </div>
      </div>
      <div className="mt-8 flex items-stretch">
        <div className={compact ? 'w-120 shrink-0 pr-8' : 'w-140 shrink-0 pr-10'}>
          <div
            className="leading-[0.84] font-light tracking-[-0.04em] whitespace-nowrap text-foreground tabular-nums"
            style={{ fontSize: getRangeNumeralSize(numeral.length, compact) }}
          >
            {numeral}
          </div>
          <div className="mt-6 text-[30px] leading-snug font-bold text-foreground">{formatEpisodeRange(first, last)}</div>
          <div className="mt-1 flex items-center gap-2.5 text-[28px] font-bold text-foreground">
            <ArrowDownWideNarrow className={`h-8 w-8 shrink-0 ${ACCENT_TEXT}`} strokeWidth={2.4} />
            <span>最新在前</span>
          </div>
        </div>
        <div className="min-w-0 flex-1 pl-10">
          {mode === 'button' ? (
            <ButtonGuide numbers={items.map((item) => item.number)} page={page} pageCount={pageCount} seconds={seconds} />
          ) : (
            <TextGuide first={first} page={page} pageCount={pageCount} seconds={seconds} />
          )}
        </div>
      </div>
    </section>
  )
}

/** 集号栏：按本页最大位数取宽度，同一页标题左缘对齐；4 位集号降字号，不挤占标题 */
const NUMBER_COLUMN_CLASS = [
  'min-w-14 text-[80px]',
  'min-w-26 text-[80px]',
  'min-w-37.5 text-[80px]',
  'min-w-37 text-[60px]'
] as const

/** 选集单元：封面右上角是 B 站徽标，下方大集号在左，标题两行 + 日期作说明文字 */
const BangumiCell: React.FC<{ item: NumberedEpisode; dark: boolean; numberClassName: string }> = ({ item, dark, numberClassName }) => {
  const { episode, number } = item
  // 后端把空徽标映射成「限免」，这里再兜一层 badge_info.text
  const badge = episode.badge || episode.badge_info?.text || ''
  const badgeColor =
    (dark ? episode.badge_info?.bg_color_night || episode.badge_info?.bg_color : episode.badge_info?.bg_color) || BADGE_FALLBACK

  return (
    <div className="min-w-0">
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-surface-secondary shadow-lg shadow-black/10">
        <EnhancedImage src={episode.cover} alt={episode.long_title || `第 ${number} 集`} className="h-full w-full object-cover" />
        {badge && (
          <span
            className="absolute top-4 right-4 rounded-xl px-3.5 py-1 text-[24px] leading-normal font-bold text-white shadow-md shadow-black/20"
            style={{ backgroundColor: badgeColor }}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="mt-4 flex gap-4">
        <span className={`shrink-0 leading-[0.9] font-black tracking-tight text-foreground tabular-nums ${numberClassName}`}>{number}</span>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="line-clamp-2 text-[30px] leading-tight font-bold text-pretty text-foreground">{episode.long_title || `第 ${number} 集`}</div>
          <div className="mt-1 font-mono text-[26px] leading-tight text-foreground/65">{formatPubDate(episode.pub_time)}</div>
        </div>
      </div>
    </div>
  )
}

/** 最后一页不满一行时的收尾块：说明最新剧集在哪一页，并给出往回翻的方式 */
const EndCard: React.FC<{ span: number; listed: number; pageCount: number; mode: SelectionMode }> = ({ span, listed, pageCount, mode }) => (
  <div className={`${COL_SPAN[span] ?? 'col-span-1'} flex flex-col justify-center self-stretch rounded-3xl bg-foreground/5 p-9`}>
    <div className="flex items-center gap-4 text-[40px] leading-tight font-black text-foreground">
      <span className={`h-5 w-5 shrink-0 ${ACCENT_BG}`} />
      <span>{pageCount > 1 ? '已是最后一页' : '只有这一页'}</span>
    </div>
    <p className="mt-4 text-[28px] leading-normal text-foreground/75">{pageCount > 1 ? '最新的剧集在第 1 页' : `共 ${listed} 集`}</p>
    {pageCount > 1 && (
      <div className="flex flex-wrap items-center gap-3 pt-6 text-[28px] text-foreground/70">
        {mode === 'button' ? (
          <span>点键盘「上一页」往回翻</span>
        ) : (
          <>
            <span>发送</span>
            <CommandChip>上一页</CommandChip>
            <span>往回翻</span>
          </>
        )}
      </div>
    )}
  </div>
)

/** 选集网格：3 列，标题两行可读；最后一页不满一行时补收尾块 */
const EpisodeGrid: React.FC<{
  items: NumberedEpisode[]
  dark: boolean
  isLastPage: boolean
  pageCount: number
  listed: number
  mode: SelectionMode
}> = ({ items, dark, isLastPage, pageCount, listed, mode }) => {
  const columns = 3
  const remainder = items.length % columns
  const fill = isLastPage && remainder > 0 ? columns - remainder : 0
  const digits = Math.max(1, ...items.map((item) => `${item.number}`.length))
  const numberClassName = NUMBER_COLUMN_CLASS[Math.min(digits, 4) - 1]

  return (
    <div className="grid grid-cols-3 gap-x-10 gap-y-11">
      {items.map((item) => (
        <BangumiCell key={`${item.number}-${item.episode.bvid}`} item={item} dark={dark} numberClassName={numberClassName} />
      ))}
      {fill > 0 && <EndCard span={fill} listed={listed} pageCount={pageCount} mode={mode} />}
    </div>
  )
}

/** 版权栏：左侧列出数量、UP 主与 season 号，右侧生成时间 */
const Colophon: React.FC<{ notes: string[] }> = ({ notes }) => {
  // 生成时间只在挂载时取一次：渲染期直接调用 new Date() 会被 React Compiler 判为不纯
  const [generatedAt] = React.useState(() => format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
  return (
    <footer className="flex items-start justify-between gap-10 pt-7 text-[24px] leading-relaxed text-foreground/65">
      <div className="min-w-0">{notes.join(' · ')}</div>
      <div className="shrink-0 select-text">图片生成于: {generatedAt}</div>
    </footer>
  )
}

export const BangumiBilibili: React.FC<PosterProps<BangumiBilibiliData>> = React.memo((props) => {
  const { data, ctx } = props
  const dark = isDark(ctx)
  const total = data.length > 0 ? data.length : data.Episodes.length
  // Episodes 已是最新在前；缺集号时按倒序位置推算（第 0 项是最新一集）
  const numbered: NumberedEpisode[] = data.Episodes.map((episode, index) => ({ episode, number: episode.episode ?? total - index }))
  const pageSize = Math.max(1, data.posterPageSize ?? DEFAULT_POSTER_PAGE_SIZE)
  const pageCount = Math.max(1, Math.ceil(numbered.length / pageSize))
  const page = Math.min(Math.max(1, data.posterPage ?? 1), pageCount)
  const visible = numbered.slice((page - 1) * pageSize, page * pageSize)
  const mode: SelectionMode = data.selectionMode ?? 'text'
  const seconds = data.timeoutSeconds && data.timeoutSeconds > 0 ? data.timeoutSeconds : DEFAULT_TIMEOUT_SECONDS

  // 数据栏只放计数。更新进度已在眉题（newEP.desc）里；B 站的「第 N 话」不算预告/特别篇，和海报按位置编的集号会差一两集，不放进来
  const follow = parseFollowText(data.Stat.follow_text) ?? { ...splitCount(data.Stat.favorites), label: '追番' }
  const ledger = [
    { label: '播放', ...splitCount(data.Stat.views) },
    { label: follow.label, value: follow.value, unit: follow.unit },
    { label: '弹幕', ...splitCount(data.Stat.danmakus) },
    { label: '投币', ...splitCount(data.Stat.coins) }
  ]
  // 版权番剧的接口不返回 up_info，用制作公司和系列追番数兜底
  const maker = data.UPInfo ? '' : parseMaker(data.Staff ?? '')
  const upNote = data.UPInfo
    ? `UP 主 ${data.UPInfo.uname} · 粉丝 ${Object.values(splitCount(data.UPInfo.follower)).join('')}`
    : [maker && `制作 ${maker}`, data.Stat.follow_text].filter(Boolean).join(' · ')
  const notes = [
    `已列出 ${numbered.length} 集`,
    ...(upNote ? [upNote] : []),
    ...(data.seasonID ? [`ss${data.seasonID}`] : [])
  ]

  return (
    <DefaultLayout {...props} className="relative overflow-hidden">
      <PosterBackground src={data.mainCover} ctx={ctx} />
      <section className="relative z-10 px-20 pt-18">
        <Masthead label="BILIBILI BANGUMI · EPISODE GUIDE" ctx={ctx} />
        <div className="mt-12">
          <Hero data={data} />
        </div>
        <div className="mt-12">
          <Ledger items={ledger} />
        </div>
        <div className="mt-16">
          <Contents items={visible} page={page} pageCount={pageCount} mode={mode} seconds={seconds} />
        </div>
        <div className="mt-12">
          <EpisodeGrid
            items={visible}
            dark={dark}
            isLastPage={page === pageCount}
            pageCount={pageCount}
            listed={numbered.length}
            mode={mode}
          />
        </div>
        <div className="mt-14">
          <Colophon notes={notes} />
        </div>
      </section>
    </DefaultLayout>
  )
})

BangumiBilibili.displayName = 'BangumiBilibili'

export default BangumiBilibili
