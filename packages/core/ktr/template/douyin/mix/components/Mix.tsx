import { format } from 'date-fns'
import { ArrowDownWideNarrow, MousePointerClick, Timer } from 'lucide-react'
import React from 'react'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

import { isDark } from '../../../../utils/theme'
import { EnhancedImage } from '../../../bilibili/components/shared'
import { AmbientCover } from '../../../components/AmbientCover'
import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterContext, PosterProps } from '../../../types/ctx'
import type { DouyinMixData } from './types'

/*
 * 抖音合集 / 短剧选集海报（杂志编辑排版，和 B 站番剧选集是兄弟模板）
 * 刊头 → 专题 hero（封面 + 大标题 + 导语 + 署名）→ 数据栏 → 目录页（巨型集号区间 + 操作说明）→ 选集网格 → 版权栏。
 * 秩序靠字体层级和留白建立，不使用分隔线；唯一强调色是抖音红，只用在眉题、章节方块和命令 chip 上。
 * 操作说明按 selectionMode 区分：button 对应 QQBot 键盘，text 只列出当前页真正能用的命令。
 */

type MixEpisode = DouyinMixData['episodes'][number]
type SelectionMode = NonNullable<DouyinMixData['selectionMode']>

/** 海报每页展示的集数，和 core 的 EPISODE_SELECTION_PAGE_SIZE 保持一致 */
const DEFAULT_POSTER_PAGE_SIZE = 15
/** 选集有效期兜底（秒），正常由 data.timeoutSeconds 下发 */
const DEFAULT_TIMEOUT_SECONDS = 120
/** QQBot 键盘每行的数字按钮数，和 core 的 EPISODE_SELECTION_BUTTONS_PER_ROW 保持一致 */
const KEYS_PER_ROW = 5
/** 抖音红：眉题、章节方块等装饰的唯一强调色 */
const ACCENT = '#FE2C55'
/** 命令 chip 底色：同色相压深一档，白字对比度约 4.8:1 */
const CHIP_BG = '#E0144C'
/** 网格补位块的跨列类名（Tailwind 只认静态字面量） */
const COL_SPAN: Record<number, string> = { 1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4' }

/** 万/亿 计数拆成数值与单位：10 亿以下的亿级两位小数，其余一位，去掉末尾 0（596.0万 → 596万）；不足 1 万原样返回 */
const splitCount = (count: number): { value: string; unit: string } => {
  if (count >= 1e9) return { value: `${Number((count / 1e8).toFixed(1))}`, unit: '亿' }
  if (count >= 1e8) return { value: `${Number((count / 1e8).toFixed(2))}`, unit: '亿' }
  if (count >= 1e4) return { value: `${Number((count / 1e4).toFixed(1))}`, unit: '万' }
  return { value: Math.max(0, Math.round(count)).toString(), unit: '' }
}

/** 总时长：不到一小时按分钟，否则按小时保留一位，去掉末尾 0 */
const splitRuntime = (milliseconds: number): { value: string; unit: string } => {
  const minutes = Math.round(milliseconds / 60000)
  if (minutes < 60) return { value: minutes.toString(), unit: '分钟' }
  return { value: `${Number((minutes / 60).toFixed(1))}`, unit: '小时' }
}

/** 单集时长 m:ss，超过一小时 h:mm:ss */
const formatDuration = (milliseconds: number): string => {
  const total = Math.max(0, Math.round(milliseconds / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = (total % 60).toString().padStart(2, '0')
  return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s}` : `${m}:${s}`
}

/** 缺集说明最多列出的段数，超出折成「等 N 集」 */
const MISSING_SEGMENT_LIMIT = 8

/**
 * 把升序集号写成「17、94、99–230 集」：连续 3 个及以上压成区间，两个相邻的照常列出；
 * 段数超过上限时只列前几段，后面接「等 N 集」，N 是全部缺集数。
 */
const formatMissing = (numbers: number[], unit: string): string => {
  const parts: string[] = []
  let index = 0
  while (index < numbers.length) {
    let end = index
    while (end + 1 < numbers.length && numbers[end + 1] === numbers[end] + 1) end++
    if (end - index >= 2) parts.push(`${numbers[index]}–${numbers[end]}`)
    else parts.push(...numbers.slice(index, end + 1).map(String))
    index = end + 1
  }
  if (parts.length <= MISSING_SEGMENT_LIMIT) return `第 ${parts.join('、')} ${unit}`
  return `第 ${parts.slice(0, MISSING_SEGMENT_LIMIT).join('、')} 等 ${numbers.length} ${unit}`
}

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
          <filter id="douyinMixNoise">
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
        <rect width="100%" height="100%" filter="url(#douyinMixNoise)" fill="white" />
      </svg>
    </div>
  </div>
)

/** 刊头：栏目名 + 平台 logo，靠字距和留白收束 */
const Masthead: React.FC<{ label: string; ctx: PosterContext }> = ({ label, ctx }) => (
  <header className="flex items-center justify-between pb-7">
    <div className="flex items-center gap-5 text-[26px] font-bold tracking-[0.32em] text-foreground">
      <span className="h-5 w-5" style={{ backgroundColor: ACCENT }} />
      <span>{label}</span>
    </div>
    <img src={isDark(ctx) ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'} alt="抖音" className="h-14 w-auto" />
  </header>
)

/** 眉题：强调色小号粗体，用细点分隔 */
const Kicker: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="flex flex-wrap items-center gap-x-4 text-[30px] font-bold" style={{ color: ACCENT }}>
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

/** 署名行：头像 + 作者名 + 认证 + 次要信息 */
const Byline: React.FC<{ avatar: string; name: string; verified: boolean; meta: string }> = ({ avatar, name, verified, meta }) => (
  <div className="flex items-center gap-5">
    <div className="h-19 w-19 shrink-0 overflow-hidden rounded-full ring-2 ring-foreground/10">
      <EnhancedImage src={avatar} alt={name} className="h-full w-full object-cover" isCircular />
    </div>
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <span className="truncate text-[34px] font-bold text-foreground">{name}</span>
        {verified && <RiVerifiedBadgeFill className="h-8 w-8 shrink-0" style={{ color: ACCENT }} />}
      </div>
      <div className="mt-0.5 text-[24px] text-foreground/65">{meta}</div>
    </div>
  </div>
)

/** 专题 hero：左封面，右眉题 / 大标题 / 导语 / 署名 */
const Hero: React.FC<{ data: DouyinMixData }> = ({ data }) => {
  const isPlaylet = data.kind === 'playlet'
  const total = data.total_episode
  const updated = data.updated_to_episode
  const kicker = isPlaylet
    ? [
        '短剧',
        ...(total > 0 && updated < total ? [`共 ${total} 集`, `更新至第 ${updated} 集`] : total > 0 ? [`全 ${total} 集`, '已完结'] : [])
      ]
    : ['合集', ...(total > 0 ? [`共 ${total} 个视频`] : [])]
  const authorMeta = [
    data.author.short_id ? `抖音号 ${data.author.short_id}` : '',
    `粉丝 ${Object.values(splitCount(data.author.follower_count)).join('')}`
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="flex items-stretch gap-16">
      {/* 封面随右栏拉伸到同高；最小高度保证短剧竖版、合集方图的基本比例 */}
      <div
        className={
          isPlaylet
            ? 'relative min-h-150 w-100 shrink-0 overflow-hidden rounded-8xl bg-surface-secondary shadow-2xl shadow-black/20'
            : 'relative min-h-100 w-100 shrink-0 overflow-hidden rounded-8xl bg-surface-secondary shadow-2xl shadow-black/20'
        }
      >
        <div className="absolute inset-0">
          <EnhancedImage src={data.image_url} alt={data.mix_name} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <Kicker items={kicker} />
        <h1 className={`mt-5 font-black tracking-tight text-balance text-foreground ${getTitleClassName(data.mix_name.length)}`}>
          {data.mix_name}
        </h1>
        {data.desc && (
          <p className={`mt-7 text-[32px] leading-[1.6] font-light text-foreground/80 ${isPlaylet ? 'line-clamp-4' : 'line-clamp-2'}`}>
            {data.desc}
          </p>
        )}
        <div className="mt-auto pt-18">
          <Byline avatar={data.author.avatar} name={data.author.nickname} verified={data.author.verified} meta={authorMeta} />
        </div>
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
const KeySketch: React.FC<{ episodes: number[]; page: number; pageCount: number }> = ({ episodes, page, pageCount }) => {
  const rows: number[][] = []
  for (let index = 0; index < episodes.length; index += KEYS_PER_ROW) rows.push(episodes.slice(index, index + KEYS_PER_ROW))
  const navigation = [page > 1 ? '上一页' : '', page < pageCount ? '下一页' : ''].filter(Boolean)
  const small = episodes.some((episode) => episode >= 1000)

  return (
    <div className="flex w-82.5 shrink-0 flex-col gap-1.5 self-start rounded-3xl bg-surface/60 p-3">
      {pageCount > 1 && <SketchKey>跳转到第x页</SketchKey>}
      {rows.map((row) => (
        <div key={row[0]} className="flex gap-1.5">
          {row.map((episode) => (
            <SketchKey key={episode} small={small}>
              {episode}
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
const ButtonGuide: React.FC<{ episodes: number[]; page: number; pageCount: number; seconds: number }> = ({
  episodes,
  page,
  pageCount,
  seconds
}) => (
  <div className="flex gap-6">
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="flex items-center gap-3 text-[34px] font-black text-foreground">
        <MousePointerClick className="h-9 w-9 shrink-0" strokeWidth={2.4} style={{ color: ACCENT }} />
        <span>点击下方按钮选集</span>
      </div>
      <ul className="flex flex-col gap-2 text-[26px] leading-snug text-foreground/80">
        <li>数字键即集号，点一下直接解析</li>
        {pageCount > 1 && <li>「跳转到第x页」补上页码再发送</li>}
      </ul>
      <ValidityNote seconds={seconds} pageCount={pageCount} />
    </div>
    <KeySketch episodes={episodes} page={page} pageCount={pageCount} />
  </div>
)

/** 目录页开篇：巨型区间数字 + 操作说明 */
const Contents: React.FC<{
  episodes: MixEpisode[]
  missingNote: string
  page: number
  pageCount: number
  mode: SelectionMode
  seconds: number
}> = ({ episodes, missingNote, page, pageCount, mode, seconds }) => {
  const first = episodes[0]?.episode ?? 0
  const last = episodes[episodes.length - 1]?.episode ?? 0
  const numeral = first === last ? `${first}` : `${first}–${last}`
  const compact = mode === 'button'

  return (
    <section>
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-5">
          <span className="h-6 w-6 self-center" style={{ backgroundColor: ACCENT }} />
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
            <ArrowDownWideNarrow className="h-8 w-8 shrink-0" strokeWidth={2.4} style={{ color: ACCENT }} />
            <span>最新在前</span>
          </div>
          {missingNote && <div className="mt-2 text-[26px] leading-snug text-foreground/65">{missingNote}</div>}
        </div>
        <div className="min-w-0 flex-1 pl-10">
          {mode === 'button' ? (
            <ButtonGuide episodes={episodes.map((episode) => episode.episode)} page={page} pageCount={pageCount} seconds={seconds} />
          ) : (
            <TextGuide first={first} page={page} pageCount={pageCount} seconds={seconds} />
          )}
        </div>
      </div>
    </section>
  )
}

/** 短剧单元：每集文案都是同一段简介，只留集号 + 时长，像目录条目一样左右分列 */
const PlayletCell: React.FC<{ episode: MixEpisode; numberClassName: string }> = ({ episode, numberClassName }) => (
  <div className="min-w-0">
    <div className="aspect-3/4 overflow-hidden rounded-3xl bg-surface-secondary shadow-lg shadow-black/10">
      <EnhancedImage
        src={episode.originCover || episode.cover || ''}
        alt={`第 ${episode.episode} 集`}
        className="h-full w-full object-cover object-[50%_30%]"
      />
    </div>
    <div className="mt-4 flex items-baseline gap-3">
      <span className={`leading-none font-black tracking-tight text-foreground tabular-nums ${numberClassName}`}>{episode.episode}</span>
      <span className="font-mono text-[26px] text-foreground/65">{formatDuration(episode.duration)}</span>
    </div>
  </div>
)

/** 短剧集号字号：5 列单元只有约 230px 宽，4 位集号降一档，给时长留位置；min-w 让同页时长列对齐 */
const PLAYLET_NUMBER_CLASS = ['min-w-14 text-[72px]', 'min-w-24 text-[72px]', 'min-w-32 text-[72px]', 'min-w-34 text-[56px]'] as const

/** 合集集号栏：按本页最大位数取宽度，同一页标题左缘对齐；4 位集号降字号，不挤占标题 */
const COLLECTION_NUMBER_CLASS = [
  'min-w-14 text-[80px]',
  'min-w-26 text-[80px]',
  'min-w-37.5 text-[80px]',
  'min-w-37 text-[60px]'
] as const

/** 普通合集单元：时长压在封面右下角，标题让出整列宽度显示三行 */
const CollectionCell: React.FC<{ episode: MixEpisode; numberClassName: string }> = ({ episode, numberClassName }) => (
  <div className="min-w-0">
    {/* originCover 是 16:9 原始帧，横屏视频零裁切；cover 是 4:3 的二次裁切，只作兜底 */}
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-surface-secondary shadow-lg shadow-black/10">
      <EnhancedImage src={episode.originCover || episode.cover || ''} alt={episode.title} className="h-full w-full object-cover" />
      <span className="absolute right-3 bottom-3 rounded-lg bg-black/60 px-2.5 py-0.5 font-mono text-[24px] text-white">
        {formatDuration(episode.duration)}
      </span>
    </div>
    <div className="mt-4 flex gap-4">
      <span className={`shrink-0 leading-[0.9] font-black tracking-tight text-foreground tabular-nums ${numberClassName}`}>
        {episode.episode}
      </span>
      <div className="line-clamp-3 min-w-0 flex-1 pt-0.5 text-[30px] leading-tight font-bold text-pretty text-foreground">
        {episode.title || '未命名视频'}
      </div>
    </div>
  </div>
)

/** 最后一页不满一行时的收尾块：说明最新内容在哪一页，并给出往回翻的方式 */
const EndCard: React.FC<{ span: number; noun: string; countText: string; pageCount: number; mode: SelectionMode }> = ({
  span,
  noun,
  countText,
  pageCount,
  mode
}) => (
  <div className={`${COL_SPAN[span] ?? 'col-span-1'} flex flex-col justify-center self-stretch rounded-3xl bg-foreground/5 p-9`}>
    <div className="flex items-center gap-4 text-[40px] leading-tight font-black text-foreground">
      <span className="h-5 w-5 shrink-0" style={{ backgroundColor: ACCENT }} />
      <span>{pageCount > 1 ? '已是最后一页' : '只有这一页'}</span>
    </div>
    <p className="mt-4 text-[28px] leading-normal text-foreground/75">{pageCount > 1 ? `最新的${noun}在第 1 页` : countText}</p>
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

/** 选集网格：短剧 5 列对应键盘每行 5 个按钮；普通合集 3 列，保证标题三行可读 */
const EpisodeGrid: React.FC<{
  episodes: MixEpisode[]
  isPlaylet: boolean
  isLastPage: boolean
  pageCount: number
  listed: number
  mode: SelectionMode
}> = ({ episodes, isPlaylet, isLastPage, pageCount, listed, mode }) => {
  const columns = isPlaylet ? 5 : 3
  const remainder = episodes.length % columns
  const fill = isLastPage && remainder > 0 ? columns - remainder : 0
  // 5 列网格只剩一格时只有约 230px 宽，放不下收尾块，留白即可
  const showEndCard = fill > 1 || (fill === 1 && !isPlaylet)
  const digits = Math.min(Math.max(1, ...episodes.map((episode) => `${episode.episode}`.length)), 4)
  const numberClassName = isPlaylet ? PLAYLET_NUMBER_CLASS[digits - 1] : COLLECTION_NUMBER_CLASS[digits - 1]

  return (
    <div className={isPlaylet ? 'grid grid-cols-5 gap-x-7 gap-y-10' : 'grid grid-cols-3 gap-x-10 gap-y-11'}>
      {episodes.map((episode) =>
        isPlaylet ? (
          <PlayletCell key={episode.aweme_id} episode={episode} numberClassName={numberClassName} />
        ) : (
          <CollectionCell key={episode.aweme_id} episode={episode} numberClassName={numberClassName} />
        )
      )}
      {showEndCard && (
        <EndCard
          span={fill}
          noun={isPlaylet ? '剧集' : '视频'}
          countText={isPlaylet ? `共 ${listed} 集` : `共 ${listed} 个视频`}
          pageCount={pageCount}
          mode={mode}
        />
      )}
    </div>
  )
}

/** 版权栏：左侧列出数量与缺集说明，右侧生成时间 */
const Colophon: React.FC<{ notes: string[] }> = ({ notes }) => (
  <footer className="flex items-start justify-between gap-10 pt-7 text-[24px] leading-relaxed text-foreground/65">
    <div className="min-w-0">{notes.join(' · ')}</div>
    <div className="shrink-0 select-text">图片生成于: {format(new Date(), 'yyyy-MM-dd HH:mm:ss')}</div>
  </footer>
)

export const DouyinMix: React.FC<PosterProps<DouyinMixData>> = React.memo((props) => {
  const { data, ctx } = props
  const isPlaylet = data.kind === 'playlet'
  const pageSize = Math.max(1, data.posterPageSize ?? DEFAULT_POSTER_PAGE_SIZE)
  const pageCount = Math.max(1, Math.ceil(data.episodes.length / pageSize))
  const page = Math.min(Math.max(1, data.posterPage ?? 1), pageCount)
  const visible = data.episodes.slice((page - 1) * pageSize, page * pageSize)
  const mode: SelectionMode = data.selectionMode ?? 'text'
  const seconds = data.timeoutSeconds > 0 ? data.timeoutSeconds : DEFAULT_TIMEOUT_SECONDS

  // 缺集 = 已更新范围内接口没返回的集号；尚未更新的集不算缺
  const listedSet = new Set(data.episodes.map((episode) => episode.episode))
  const maxEpisode = data.episodes.reduce((max, episode) => Math.max(max, episode.episode), 0)
  const missing: number[] = []
  for (let episode = 1; episode <= Math.max(maxEpisode, data.updated_to_episode); episode++) {
    if (!listedSet.has(episode)) missing.push(episode)
  }
  // 本页负责的集号段按展示顺序切：上界是上一页最后一集（不含），下界是本页最后一集；首页不设上界，末页兜到第 1 集。
  // 两页交界处缺的集归后一页，用户翻过去找的时候正好看到
  const upper = page > 1 ? data.episodes[(page - 1) * pageSize - 1].episode : Infinity
  const lower = page < pageCount ? visible[visible.length - 1].episode : 0
  const pageMissing = missing.filter((episode) => episode < upper && episode > lower)

  const unit = isPlaylet ? '集' : '个视频'
  const totalDuration = data.episodes.reduce((sum, episode) => sum + episode.duration, 0)
  const ledger = [
    { label: '播放', ...splitCount(data.statistics.play_count) },
    { label: '点赞', ...splitCount(data.statistics.digg_count) },
    { label: '收藏', ...splitCount(data.statistics.collect_count) },
    isPlaylet
      ? { label: '单集均长', value: formatDuration(data.episodes.length ? totalDuration / data.episodes.length : 0), unit: '' }
      : { label: '总时长', ...splitRuntime(totalDuration) }
  ]
  const notes = [
    data.total_episode > 0 ? `已列出 ${data.episodes.length} / ${data.total_episode} ${unit}` : `已列出 ${data.episodes.length} ${unit}`,
    ...(missing.length > 0 ? [`接口未返回${formatMissing(missing, unit)}，暂不能选`] : [])
  ]

  return (
    <DefaultLayout {...props} className="relative overflow-hidden">
      <PosterBackground src={data.image_url} ctx={ctx} />
      <section className="relative z-10 px-20 pt-18">
        <Masthead label={isPlaylet ? 'DOUYIN PLAYLET · EPISODE GUIDE' : 'DOUYIN COLLECTION · EPISODE GUIDE'} ctx={ctx} />
        <div className="mt-12">
          <Hero data={data} />
        </div>
        <div className="mt-12">
          <Ledger items={ledger} />
        </div>
        <div className="mt-16">
          <Contents
            episodes={visible}
            missingNote={pageMissing.length > 0 ? `缺${formatMissing(pageMissing, unit)}，暂不能选` : ''}
            page={page}
            pageCount={pageCount}
            mode={mode}
            seconds={seconds}
          />
        </div>
        <div className="mt-12">
          <EpisodeGrid
            episodes={visible}
            isPlaylet={isPlaylet}
            isLastPage={page === pageCount}
            pageCount={pageCount}
            listed={data.episodes.length}
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

DouyinMix.displayName = 'DouyinMix'

export default DouyinMix
