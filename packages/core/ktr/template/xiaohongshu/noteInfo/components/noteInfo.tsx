import { renderRichTextToReact } from '@kkk/richtext'
import { PlayIcon } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { Calendar, Heart, MapPin, MessageCircle, Share2, Star } from 'lucide-react'
import React from 'react'

import { isDark } from '../../../../utils/theme'
import { AmbientCover } from '../../../components/AmbientCover'
import { DefaultLayout } from '../../../components/DefaultLayout'
import { QRCodeWithAvatar } from '../../../components/QRCodeWithAvatar'
import type { PosterProps } from '../../../types/ctx'
import type { XiaohongshuNoteInfoData } from './types'

/** 小红书品牌红：整图唯一强调色，只用于点赞图标与头像描边 */
const XHS_RED = '#FF2442'

const xiaohongshuNoteMentionClassName = 'text-[#13386c] dark:text-[#c7daef]'

/**
 * 格式化互动数：纯数字串过万缩写为 x.x万；API 已格式化的「5.7万」等原样返回
 * @param num 数字
 * @returns 格式化后的字符串
 */
const formatNumber = (num: string | number): string => {
  if (typeof num === 'string' && !/^\d+$/.test(num.trim())) return num || '0'
  const numValue = typeof num === 'string' ? parseInt(num, 10) : num
  if (!Number.isFinite(numValue)) return String(num) || '0'
  if (numValue >= 10000) {
    return `${(numValue / 10000).toFixed(1)}万`
  }
  return numValue.toLocaleString()
}

/**
 * 全局氛围背景层：弥散渐变封面 + 高对比杂色纹理。
 * 与抖音/B站同一套骨架，噪点集中在上下两端、中间让位给正文。
 */
const NoteDiffuseBackground: React.FC<PosterProps<XiaohongshuNoteInfoData>> = ({ data, ctx }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
    <AmbientCover src={data.image_url} ctx={ctx} />

    <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay dark:mix-blend-soft-light">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="xhsNoteNoise">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
            <feComponentTransfer>
              <feFuncA type="linear" slope="2.5" intercept="-0.6" />
            </feComponentTransfer>
          </filter>
          <mask id="xhsNoteNoiseMask">
            <linearGradient id="xhsNoteNoiseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.85" />
              <stop offset="25%" stopColor="white" stopOpacity="0.4" />
              <stop offset="50%" stopColor="white" stopOpacity="0.08" />
              <stop offset="75%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0.85" />
            </linearGradient>
            <rect width="100%" height="100%" fill="url(#xhsNoteNoiseGradient)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" filter="url(#xhsNoteNoise)" mask="url(#xhsNoteNoiseMask)" fill="white" />
      </svg>
    </div>
  </div>
)

/**
 * 顶部系统标签行：海报式技术标签 + 笔记 ID，替代平台 Logo 的顶部占位
 */
const NoteSystemLabel: React.FC<PosterProps<XiaohongshuNoteInfoData>> = ({ data }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <span className="h-8 w-2 rounded-full" style={{ backgroundColor: XHS_RED }} />
      <span className="text-[26px] font-bold tracking-[0.3em] uppercase text-foreground/60">Xiaohongshu Note</span>
    </div>
    <span className="font-mono text-[26px] text-foreground/40 select-text">ID: {data.note_id}</span>
  </div>
)

/**
 * 笔记封面：官方分享长图的干净大图样式，圆角 + 大投影，不做溶解遮罩。
 * 图集在右下角堆叠预览后续图片，超出部分以 +N 收尾；视频笔记改为白色半透明播放图标。
 */
const NoteCover: React.FC<PosterProps<XiaohongshuNoteInfoData>> = ({ data }) => {
  const images = data.image_list?.length ? data.image_list : [data.image_url]
  const previewImages = data.is_video ? [] : images.slice(1, 4).filter(Boolean)
  const remainingPreviewCount = Math.max(images.length - previewImages.length - 1, 0)

  return (
    <section className="relative mt-12 overflow-hidden rounded-[3rem] shadow-2xl">
      <img
        src={data.image_url}
        alt={data.title || '小红书笔记封面'}
        className="block h-auto w-full object-cover"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />

      {data.is_video && (
        <PlayIcon size={104} weight="fill" aria-label="视频笔记" className="absolute right-10 bottom-10 z-10 text-white/50" />
      )}

      {previewImages.length > 0 && (
        <div className="absolute right-10 bottom-10 z-10 flex items-center -space-x-5 drop-shadow-2xl">
          {previewImages.map((url, index) => (
            <img
              key={`${url}-${index}`}
              src={url}
              alt="图集预览"
              className="h-28 w-28 rounded-3xl object-cover ring-2 ring-white/25"
              style={{ transform: `rotate(${(index - 1) * 8}deg)` }}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
          ))}
          {remainingPreviewCount > 0 && (
            <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-black/50 px-5 text-[32px] font-black text-white ring-2 ring-white/25 backdrop-blur-xs">
              +{remainingPreviewCount}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

/**
 * 作者行：官方长图位置（封面之后、标题之前），头像带品牌红描边
 */
const NoteAuthorRow: React.FC<PosterProps<XiaohongshuNoteInfoData>> = ({ data }) => (
  <section className="mt-14 flex items-center gap-6">
    <img
      src={data.author.avatar}
      alt={data.author.nickname}
      className="h-28 w-28 shrink-0 rounded-full border-4 object-cover shadow-xl"
      style={{ borderColor: `${XHS_RED}33` }}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
    />
    <div className="min-w-0">
      <div className="max-w-200 truncate text-[52px] font-black leading-tight text-foreground select-text">{data.author.nickname}</div>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[30px] text-muted">
        <span className="inline-flex items-center gap-2">
          <Calendar size={28} />
          <span className="select-text">{format(new Date(data.time), 'yyyy-MM-dd HH:mm')}</span>
        </span>
        {data.ip_location && (
          <span className="inline-flex items-center gap-2">
            <MapPin size={28} />
            <span className="select-text">{data.ip_location}</span>
          </span>
        )}
      </div>
    </div>
  </section>
)

/**
 * 标题与正文：标题是唯一大字层级，正文降为次级明度
 */
const NoteContent: React.FC<PosterProps<XiaohongshuNoteInfoData>> = ({ data }) => (
  <section className="mt-10">
    {data.title && (
      <h1
        className="text-[68px] font-black leading-[1.2] tracking-tight text-foreground select-text"
        style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
      >
        {data.title}
      </h1>
    )}
    <div
      className="mt-8 whitespace-pre-wrap text-[42px] font-medium leading-[1.55] text-foreground/80 select-text"
      style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
    >
      {renderRichTextToReact(data.desc, {
        mention: { className: xiaohongshuNoteMentionClassName }
      })}
    </div>
  </section>
)

/**
 * 互动数据行：大数字做视觉锚点，只有点赞用心红，其余中性色
 */
const NoteStatsRow: React.FC<PosterProps<XiaohongshuNoteInfoData>> = ({ data }) => {
  const stats = [
    { icon: Heart, value: data.statistics.liked_count, label: '点赞', accent: true },
    { icon: MessageCircle, value: data.statistics.comment_count, label: '评论', accent: false },
    { icon: Star, value: data.statistics.collected_count, label: '收藏', accent: false },
    { icon: Share2, value: data.statistics.share_count, label: '分享', accent: false }
  ]

  return (
    <section className="mt-14 flex flex-wrap items-end gap-x-20 gap-y-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="min-w-40">
            <div className="flex items-center gap-3 text-[28px] font-semibold text-muted">
              <Icon
                size={36}
                strokeWidth={2.2}
                style={stat.accent ? { color: XHS_RED, fill: XHS_RED } : undefined}
                className={stat.accent ? undefined : 'text-foreground/70'}
              />
              <span>{stat.label}</span>
            </div>
            <div className="mt-3 text-[64px] font-black leading-none text-foreground tabular-nums select-text">
              {formatNumber(stat.value)}
            </div>
          </div>
        )
      })}
    </section>
  )
}

/**
 * 底部行动条：官方长图的小红书 Logo + 二维码收尾
 */
const NoteFooter: React.FC<PosterProps<XiaohongshuNoteInfoData>> = ({ data, ctx }) => (
  <footer className="mt-16">
    <div className="mt-12 flex items-center justify-between gap-16">
      <img src="/image/xiaohongshu/logo.png" alt="小红书" className="h-16 w-auto shrink-0 object-contain opacity-90" />
      {data.share_url && (
        <div className="flex items-center gap-8">
          <div className="text-right">
            <div className="text-[32px] font-black text-foreground">扫码查看原笔记</div>
            <div className="mt-2 text-[26px] text-muted">长按识别二维码</div>
          </div>
          <div className="shrink-0 drop-shadow-2xl">
            <QRCodeWithAvatar value={data.share_url} useDarkTheme={isDark(ctx)} alt="笔记二维码" className="h-60 w-60" />
          </div>
        </div>
      )}
    </div>
  </footer>
)

/**
 * 小红书笔记信息组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const XiaohongshuNoteInfo: React.FC<PosterProps<XiaohongshuNoteInfoData>> = React.memo((props) => {
  return (
    <DefaultLayout {...props} className="relative overflow-hidden">
      <NoteDiffuseBackground {...props} />

      <section className="relative z-10 px-20 pt-16">
        <NoteSystemLabel {...props} />
        <NoteCover {...props} />
        <NoteAuthorRow {...props} />
        <NoteContent {...props} />
        <NoteStatsRow {...props} />
        <NoteFooter {...props} />
      </section>
    </DefaultLayout>
  )
})

XiaohongshuNoteInfo.displayName = 'XiaohongshuNoteInfo'

export default XiaohongshuNoteInfo
