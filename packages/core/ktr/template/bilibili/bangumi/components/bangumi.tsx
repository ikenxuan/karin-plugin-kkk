import { Chip } from '@heroui/react'
import { Crown, Hash, Play, Shield, Star, Users } from 'lucide-react'
import React from 'react'

import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterProps } from '../../../types/ctx'
import { EnhancedImage } from '../../components/shared'
import type { BangumiBilibiliHeaderProps } from '../../components/types'
import type { BangumiBilibiliData } from './types'

/** 海报每页展示的集数，和 core 的 EPISODE_SELECTION_PAGE_SIZE 保持一致 */
const DEFAULT_POSTER_PAGE_SIZE = 15

/**
 * 格式化数字显示
 * @param num 要格式化的数字
 * @returns 格式化后的字符串
 */
const formatNumber = (num: number): string => {
  if (num >= 100000000) {
    return `${(num / 100000000).toFixed(1)}亿`
  }
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`
  }
  return num.toString()
}

/**
 * 格式化日期部分
 * @param timestamp 时间戳
 * @returns 包含月份和日期的对象
 */
const formatDateParts = (timestamp: number): { month: string; day: string } => {
  const date = new Date(timestamp * 1000)
  const month = date.toLocaleDateString('zh-CN', { month: 'short' })
  const day = date.getDate().toString().padStart(2, '0')
  return { month, day }
}

/**
 * B站番剧头部组件
 * @param props 头部组件属性
 */
const BangumiBilibiliHeader: React.FC<BangumiBilibiliHeaderProps> = (props) => {
  // 处理演员数据
  const actorList = props.actors ? props.actors.split(/[,，、\s]+/).filter((actor) => actor.trim()) : []

  return (
    <div className="overflow-hidden relative rounded-6xl">
      <div className="flex relative z-10 gap-25 p-25">
        <div className="flex flex-col shrink-0 gap-20">
          {/* 封面 */}
          <div className="overflow-hidden rounded-4xl w-120 h-160">
            <EnhancedImage src={props.mainCover} alt={props.title} className="object-cover w-full h-full select-text" />
          </div>
          {/* UP主信息 */}
          {props.upInfo && (
            <div className="flex gap-12 items-center mt-15">
              <div className="relative">
                <EnhancedImage
                  className="w-28 h-28 rounded-full select-text"
                  src={`https://images.weserv.nl/?url=${encodeURIComponent(props.upInfo.avatar)}`}
                  alt={props.upInfo.uname}
                />
                {props.upInfo.avatar_subscript_url && (
                  <EnhancedImage
                    className="absolute -right-1 -bottom-1 w-8 h-8 select-text"
                    src={props.upInfo.avatar_subscript_url}
                    alt="头像角标"
                  />
                )}
                {/* 挂件 */}
                {props.upInfo.pendant?.image && (
                  <EnhancedImage
                    className="absolute inset-0 w-full h-full transform select-text scale-160"
                    src={props.upInfo.pendant.image}
                    alt={props.upInfo.pendant.name || '挂件'}
                  />
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-center">
                  <div
                    className="text-4xl font-medium select-text"
                    style={{
                      color: props.upInfo.vip_status === 1 ? props.upInfo.nickname_color || '#FB7299' : '#EDEDED'
                    }}
                  >
                    {props.upInfo.uname}
                  </div>

                  {props.upInfo.verify_type > 0 && (
                    <div className="flex items-center">
                      {props.upInfo.verify_type === 1 ? (
                        <Shield width={20} className="text-warning" />
                      ) : (
                        <Crown width={20} className="text-accent" />
                      )}
                    </div>
                  )}

                  {props.upInfo.vip_status === 1 && props.upInfo.vip_label?.text && (
                    <Chip
                      size="sm"
                      className="px-2 py-1 text-xs select-text"
                      style={{
                        backgroundColor: props.upInfo.vip_label.bg_color || '#FB7299',
                        color: props.upInfo.vip_label.text_color || '#FFFFFF',
                        borderColor: props.upInfo.vip_label.border_color || 'transparent'
                      }}
                    >
                      {props.upInfo.vip_label.text}
                    </Chip>
                  )}
                </div>

                {/* 粉丝数和关注状态 */}
                <div className="flex gap-6 items-center text-3xl select-text text-foreground">
                  <Users size={30} />
                  <span>{formatNumber(props.upInfo.follower)}粉丝</span>

                  {/* 关注状态 */}
                  {props.upInfo.is_follow === 1 && (
                    <Chip size="sm" color="accent" variant="soft" className="text-xs select-text">
                      已关注
                    </Chip>
                  )}
                </div>

                <div className="flex gap-2 items-center text-2xl select-text text-foreground/70">
                  <Hash size={20} />
                  <span>UID: {props.upInfo.mid}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 justify-between text-foreground">
          <div>
            <div className="mb-8 text-8xl font-bold leading-tight select-text">{props.title}</div>
            {props.subtitle && <div className="mb-12 text-4xl select-text text-foreground">{props.subtitle}</div>}

            {/* 风格标签 */}
            {props.styles && props.styles.length > 0 && (
              <div className="flex flex-wrap gap-8 mb-12">
                {props.styles.map((style, index) => (
                  <Chip
                    key={index}
                    size="lg"
                    className="w-32 h-12 rounded-xl bg-surface-secondary px-4 py-2 text-3xl text-foreground backdrop-blur-sm select-text"
                  >
                    {style}
                  </Chip>
                ))}
              </div>
            )}

            {/* CV信息 */}
            {actorList.length > 0 && (
              <div className="mb-12">
                <div className="flex gap-6 items-center mb-6 text-3xl select-text text-foreground">
                  <Users size={30} />
                  <span>声优阵容</span>
                </div>
                <div className="flex flex-wrap gap-8">
                  {actorList.slice(0, 6).map((actor, index) => (
                    <div key={index} className="text-3xl select-text text-foreground">
                      {actor}
                    </div>
                  ))}
                  {actorList.length > 6 && <div className="text-3xl select-text text-foreground">等{actorList.length}人</div>}
                </div>
              </div>
            )}

            {/* 评价信息 */}
            {props.evaluate && (
              <div className="mb-12">
                <div className="flex gap-6 items-center mb-6 text-3xl select-text text-foreground">
                  <Star size={30} />
                  <span>评价</span>
                </div>
                <div className="text-3xl leading-relaxed select-text text-foreground">{props.evaluate}</div>
              </div>
            )}
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-4 gap-16">
            <div className="items-center min-w-0">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold select-text text-foreground">{formatNumber(props.stat.views).slice(0, -1)}</span>
                <span className="text-xl font-bold select-text text-foreground">{formatNumber(props.stat.views).slice(-1)}</span>
              </div>
              <span className="text-2xl whitespace-nowrap select-text">播放</span>
            </div>

            <div className="items-center min-w-0">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold select-text text-foreground">{formatNumber(props.stat.favorites).slice(0, -1)}</span>
                <span className="text-xl font-bold select-text text-foreground">{formatNumber(props.stat.favorites).slice(-1)}</span>
              </div>
              <span className="text-2xl whitespace-nowrap select-text">收藏</span>
            </div>

            <div className="items-center min-w-0">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold select-text text-foreground">{formatNumber(props.stat.danmakus).slice(0, -1)}</span>
                <span className="text-xl font-bold select-text text-foreground">{formatNumber(props.stat.danmakus).slice(-1)}</span>
              </div>
              <span className="text-2xl whitespace-nowrap select-text">弹幕</span>
            </div>

            <div className="items-center min-w-0">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold select-text text-foreground">{formatNumber(props.stat.coins).slice(0, -1)}</span>
                <span className="text-xl font-bold select-text text-foreground">{formatNumber(props.stat.coins).slice(-1)}</span>
              </div>
              <span className="text-2xl whitespace-nowrap select-text">投币</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** 文字选集提示里的命令高亮，和海报的强调色保持一致 */
const CommandChip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-xl bg-danger px-4 py-1.5 font-semibold text-danger-foreground">
    {children}
  </span>
)

/**
 * B站番剧剧集列表组件。
 * 每页最多 15 集，3 列网格展示封面 + 标题；长番剧不会再生成超长截图。
 * @param props 剧集列表组件属性
 */
const BangumiBilibiliEpisodes: React.FC<BangumiBilibiliData> = (props) => {
  const totalEpisodes = props.length > 0 ? props.length : props.Episodes.length
  const pageSize = Math.max(1, props.posterPageSize ?? DEFAULT_POSTER_PAGE_SIZE)
  const pageCount = Math.max(1, Math.ceil(totalEpisodes / pageSize))
  const page = Math.min(Math.max(1, props.posterPage ?? 1), pageCount)
  const start = (page - 1) * pageSize
  const visibleEpisodes = props.Episodes.slice(start, start + pageSize)
  if (visibleEpisodes.length === 0) return null

  const episodeNumbers = visibleEpisodes.map((episode, index) => episode.episode ?? start + index + 1)
  // Episodes 按展示顺序传入（最新一集在前），范围也用首尾，不能取 min/max
  const firstEpisode = episodeNumbers[0]
  const lastEpisode = episodeNumbers[episodeNumbers.length - 1]
  const range = firstEpisode === lastEpisode ? `第 ${firstEpisode} 集` : `第 ${firstEpisode}–${lastEpisode} 集`

  return (
    <div className="px-10">
      {/* 剧集标题 */}
      <div className="flex flex-wrap gap-6 items-center mb-16 text-5xl font-bold select-text text-foreground">
        <Play size={46} />
        <span>剧集列表</span>
        <Chip size="lg" color="danger" variant="soft" className="h-18 px-4 py-2 text-4xl select-text">
          共{totalEpisodes}集
        </Chip>
        <span className="text-3xl font-semibold select-text text-muted">
          {props.selectionMode === 'button' ? range : `第 ${page}/${pageCount} 页 · ${range}`}
        </span>
      </div>

      {/* 文字选集的操作提示；按钮选集由消息正文说明 */}
      {props.selectionMode !== 'button' && (
        <div className="flex flex-col gap-4 mb-12 text-3xl select-text text-foreground/80">
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

      {/* 剧集网格：3 列 × 5 行，卡片更宽，长标题能多显示一些字 */}
      <div className="grid grid-cols-3 gap-8">
        {visibleEpisodes.map((episode, index) => {
          const episodeNumber = episodeNumbers[index]
          const { month, day } = formatDateParts(episode.pub_time)

          return (
            <div
              key={`${episodeNumber}-${episode.bvid}`}
              className="flex flex-col overflow-hidden bg-surface rounded-3xl shadow-large"
            >
              {/* 剧集封面 */}
              <div className="overflow-hidden relative aspect-video">
                <EnhancedImage
                  src={episode.cover}
                  alt={`第${episodeNumber}集 ${episode.long_title}`}
                  className="object-cover w-full h-full select-text"
                />
                <div className="absolute top-4 left-4 px-3 py-1 text-2xl font-bold text-white rounded-xl bg-black/65">
                  第{episodeNumber}集
                </div>
                {episode.badge && (
                  <Chip
                    size="sm"
                    className="absolute top-4 right-4 px-2 py-1 text-lg font-medium select-text"
                    style={{
                      backgroundColor: episode.badge_info?.bg_color || '#FB7299',
                      color: '#FFFFFF'
                    }}
                  >
                    {episode.badge_info?.text || episode.badge}
                  </Chip>
                )}
              </div>

              {/* 剧集信息 */}
              <div className="flex flex-col flex-1 gap-3 p-5">
                <div className="text-3xl font-semibold leading-snug select-text text-foreground line-clamp-2">
                  {episode.long_title || `第${episodeNumber}集`}
                </div>
                {episode.pub_time > 0 && (
                  <div className="mt-auto text-2xl select-text text-foreground/60">
                    {month}
                    {day}日
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const BangumiBilibili: React.FC<PosterProps<BangumiBilibiliData>> = React.memo((props) => {
  return (
    <DefaultLayout {...props}>
      <div className="p-4">
        {/* 头部区域 */}
        <BangumiBilibiliHeader
          title={props.data.Title}
          mainCover={props.data.mainCover}
          evaluate={props.data.Evaluate}
          actors={props.data.Actors}
          styles={props.data.Styles}
          subtitle={props.data.subtitle}
          upInfo={props.data.UPInfo}
          stat={props.data.Stat}
          copyright={props.data.Copyright}
          seasonID={props.data.seasonID}
        />

        {/* 剧集列表区域 */}
        <BangumiBilibiliEpisodes {...props.data} />
      </div>
    </DefaultLayout>
  )
})

BangumiBilibili.displayName = 'BangumiBilibili'

export default BangumiBilibili
