import { ClockIcon, PlayIcon } from '@phosphor-icons/react'
import { format } from 'date-fns'
import React from 'react'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

import { isDark } from '../../../../utils/theme'
import { EnhancedImage } from '../../../bilibili/components/shared'
import { AmbientCover } from '../../../components/AmbientCover'
import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterProps } from '../../../types/ctx'
import { DouyinFavoriteIcon, DouyinLikeIcon } from '../../components/Icons'
import type { DouyinMixData } from './types'

/** 海报每页展示的集数，和 core 的 EPISODE_SELECTION_PAGE_SIZE 保持一致 */
const DEFAULT_POSTER_PAGE_SIZE = 15

/** 万/亿 计数，数值与单位分开返回：数字用大号等宽，单位用小号 */
const splitCount = (count: number): { value: string; unit: string } => {
  if (count >= 100000000) return { value: (count / 100000000).toFixed(1), unit: '亿' }
  if (count >= 10000) return { value: (count / 10000).toFixed(1), unit: '万' }
  return { value: count.toString(), unit: '' }
}

/** 总时长：不到一小时按分钟，否则按小时保留一位 */
const splitRuntime = (milliseconds: number): { value: string; unit: string } => {
  const minutes = Math.round(milliseconds / 60000)
  if (minutes < 60) return { value: minutes.toString(), unit: '分钟' }
  return { value: (minutes / 60).toFixed(1), unit: '小时' }
}

/** 单集时长 mm:ss */
const formatDuration = (milliseconds: number): string => {
  const totalSeconds = Math.round(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

/** 标题按字数分档：短标题撑满，长标题收小并最多三行 */
const getTitleClassName = (titleLength: number): string => {
  if (titleLength <= 8) return 'text-[112px] leading-[1.05]'
  if (titleLength <= 14) return 'text-[96px] leading-[1.08]'
  if (titleLength <= 22) return 'text-[76px] leading-[1.12]'
  return 'text-[60px] leading-[1.18]'
}

/** 弥散背景：海报模糊铺底 + 单色离散杂色 */
const MixBackground: React.FC<PosterProps<DouyinMixData>> = ({ data, ctx }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
    <AmbientCover src={data.image_url} ctx={ctx} />
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

const MixHeader: React.FC<PosterProps<DouyinMixData>> = ({ ctx }) => (
  <header className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <span className="h-4 w-4 rounded-full bg-foreground/80" />
      <span className="text-[26px] font-bold uppercase tracking-[0.24em] text-muted">Douyin Mix</span>
      <span className="text-[26px] font-bold text-muted">· 合集选集</span>
    </div>
    <img
      src={isDark(ctx) ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
      alt="抖音"
      className="h-17 w-auto shrink-0 object-contain opacity-90"
    />
  </header>
)

const MixHero: React.FC<PosterProps<DouyinMixData>> = ({ data }) => {
  const { kind, image_url, mix_name, author, statistics, episodes, total_episode, updated_to_episode } = data
  // 普通合集的每一项是独立作品，按「个视频」计数更贴切
  const countUnit = kind === 'collection' ? '个视频' : '集'
  const runtime = splitRuntime(episodes.reduce((sum, item) => sum + item.duration, 0))
  const stats = [
    { icon: PlayIcon, label: '总播放', ...splitCount(statistics.play_count) },
    { icon: DouyinLikeIcon, label: '总点赞', ...splitCount(statistics.digg_count) },
    { icon: DouyinFavoriteIcon, label: '总收藏', ...splitCount(statistics.collect_count) },
    { icon: ClockIcon, label: '总时长', ...runtime }
  ]
  const follower = splitCount(author.follower_count)

  return (
    <section className="mt-14 flex gap-14">
      {/* 封面：短剧是竖版海报，普通合集是方图；后面垫一层模糊副本当柔光 */}
      <div className={`relative ${kind === 'collection' ? 'h-120' : 'h-180'} w-120 shrink-0`}>
        <img
          src={image_url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-[1.06] rounded-[40px] object-cover opacity-55 blur-[36px] saturate-[1.2]"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
        <img
          src={image_url}
          alt="合集海报"
          className="relative h-full w-full rounded-[40px] object-cover shadow-2xl"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-10">
        <div>
          <h1
            className={`${getTitleClassName(mix_name.length)} line-clamp-3 font-bold text-balance text-foreground select-text`}
            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
          >
            {mix_name}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-foreground px-7 py-3 text-[30px] font-bold leading-none text-background">
              共 {total_episode} {countUnit}
            </span>
            {updated_to_episode < total_episode && (
              <span className="rounded-full border border-foreground/20 px-7 py-3 text-[30px] font-semibold leading-none text-foreground/80">
                更新至第 {updated_to_episode} 集
              </span>
            )}
          </div>

          <div className="mt-10 flex min-w-0 items-center gap-5">
            <img
              src={author.avatar}
              alt="头像"
              className="h-20 w-20 shrink-0 rounded-full object-cover shadow-xl"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate text-[38px] font-bold leading-tight text-foreground select-text">{author.nickname}</span>
                {author.verified && <RiVerifiedBadgeFill size={34} className="shrink-0 text-foreground/70" />}
              </div>
              <div className="mt-1 truncate text-[26px] text-muted select-text">
                抖音号 {author.short_id} · 粉丝 {follower.value}
                {follower.unit}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="min-w-0">
                <div className="flex items-center gap-3 text-[28px] font-semibold text-muted">
                  <Icon size={32} weight="fill" className="text-foreground/80" />
                  <span>{stat.label}</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2 text-foreground select-text">
                  <span className="text-[64px] font-semibold leading-none tabular-nums">{stat.value}</span>
                  {stat.unit && <span className="text-[28px] font-bold">{stat.unit}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** 区块标题：竖条 + 标题 */
const SectionTitle: React.FC<{ children: React.ReactNode; extra?: React.ReactNode }> = ({ children, extra }) => (
  <div className="flex items-end justify-between gap-8">
    <div className="flex items-center gap-4">
      <span className="h-10 w-2 rounded-full bg-foreground/80" />
      <h2 className="text-[44px] font-bold leading-none text-foreground">{children}</h2>
    </div>
    {extra}
  </div>
)
const MixSynopsis: React.FC<PosterProps<DouyinMixData>> = ({ data }) => {
  if (!data.desc) return null
  return (
    <section className="mt-16">
      <SectionTitle>简介</SectionTitle>
      <p className="mt-6 line-clamp-5 text-[40px] leading-[1.6] text-foreground/85 select-text" style={{ overflowWrap: 'break-word' }}>
        {data.desc}
      </p>
    </section>
  )
}

/** 文字选集提示里的命令高亮，和 B 站番剧模板保持一致 */
const CommandChip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-xl bg-danger px-4 py-1.5 font-semibold text-danger-foreground">
    {children}
  </span>
)

const MixEpisodes: React.FC<PosterProps<DouyinMixData>> = ({ data }) => {
  const { kind, episodes, total_episode, updated_to_episode, selectionMode } = data
  const pageSize = Math.max(1, data.posterPageSize ?? DEFAULT_POSTER_PAGE_SIZE)
  const pageCount = Math.max(1, Math.ceil(episodes.length / pageSize))
  const page = Math.min(Math.max(1, data.posterPage ?? 1), pageCount)
  const start = (page - 1) * pageSize
  const visibleEpisodes = episodes.slice(start, start + pageSize)
  if (visibleEpisodes.length === 0) return null

  const firstEpisode = visibleEpisodes[0].episode
  const lastEpisode = visibleEpisodes[visibleEpisodes.length - 1].episode
  const range = firstEpisode === lastEpisode ? `第 ${firstEpisode} 集` : `第 ${firstEpisode}–${lastEpisode} 集`
  const countUnit = kind === 'collection' ? '个视频' : '集'

  // 短剧常见中间缺集：列出接口没返回的集号，说明为什么按钮里没有
  const maxEpisode = episodes.reduce((max, item) => Math.max(max, item.episode), 0)
  const episodeSet = new Set(episodes.map((item) => item.episode))
  const missingEpisodes: number[] = []
  for (let episode = 1; episode <= Math.max(maxEpisode, updated_to_episode); episode++) {
    if (!episodeSet.has(episode)) missingEpisodes.push(episode)
  }

  return (
    <section className="mt-16">
      <SectionTitle
        extra={
          <span className="text-[30px] font-semibold text-muted">
            {selectionMode === 'button' ? range : `第 ${page}/${pageCount} 页 · ${range}`}
          </span>
        }
      >
        选集
      </SectionTitle>

      {/* 文字选集的操作提示；按钮选集由消息正文说明 */}
      {selectionMode !== 'button' && (
        <div className="flex flex-col gap-4 mt-8 text-[32px] select-text text-foreground/80">
          <div className="flex flex-wrap gap-3 items-center">
            <span>发送</span>
            <CommandChip>第?集</CommandChip>
            <span>选集</span>
          </div>
          {pageCount > 1 && (
            <div className="flex flex-wrap gap-3 items-center">
              <span>发送</span>
              <CommandChip>上一页</CommandChip>
              <span className="text-foreground/30">/</span>
              <CommandChip>下一页</CommandChip>
              <span className="text-foreground/30">/</span>
              <CommandChip>第?页</CommandChip>
              <span>翻页</span>
            </div>
          )}
        </div>
      )}

      {/* 3 列 × 5 行：普通合集用方图 + 标题，短剧用竖版原始帧 + 集号 */}
      <div className="grid grid-cols-3 gap-8 mt-8">
        {visibleEpisodes.map((episode) => {
          const cover =
            kind === 'collection'
              ? episode.cover || episode.originCover
              : episode.originCover || episode.cover

          return (
            <div
              key={`${episode.episode}-${episode.aweme_id}`}
              className="flex flex-col overflow-hidden bg-surface rounded-3xl shadow-large"
            >
              <div className={`relative overflow-hidden ${kind === 'collection' ? 'aspect-square' : 'aspect-[3/4]'}`}>
                <EnhancedImage
                  src={cover || ''}
                  alt={`第${episode.episode}集 ${episode.title}`}
                  className="object-cover w-full h-full select-text"
                />
                <div className="absolute top-4 left-4 px-3 py-1 text-2xl font-bold text-white rounded-xl bg-black/65">
                  第{episode.episode}集
                </div>
                <div className="absolute right-4 bottom-4 px-3 py-1 text-xl font-semibold text-white rounded-xl bg-black/65 tabular-nums">
                  {formatDuration(episode.duration)}
                </div>
              </div>

              {kind === 'collection' && (
                <div className="flex flex-col flex-1 gap-3 p-5">
                  <div className="text-3xl font-semibold leading-snug select-text text-foreground line-clamp-2">
                    {episode.title || `第${episode.episode}集`}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 mt-8 text-[26px] text-muted">
        <span>
          已列出 {episodes.length} / {total_episode} {countUnit}
          {missingEpisodes.length > 0 && `；接口未返回第 ${missingEpisodes.join('、')} ${countUnit}，暂不能解析。`}
          {updated_to_episode < total_episode && `；已更新至第 ${updated_to_episode} ${countUnit}。`}
        </span>
        <span className="select-text">图片生成于: {format(new Date(), 'yyyy-MM-dd HH:mm:ss')}</span>
      </div>
    </section>
  )
}

export const DouyinMix: React.FC<PosterProps<DouyinMixData>> = React.memo((props) => (
  <DefaultLayout {...props} className="relative overflow-hidden">
    <MixBackground {...props} />
    <section className="relative z-10 px-20 pt-18">
      <MixHeader {...props} />
      <MixHero {...props} />
      <MixSynopsis {...props} />
      <MixEpisodes {...props} />
    </section>
  </DefaultLayout>
))

DouyinMix.displayName = 'DouyinMix'

export default DouyinMix
