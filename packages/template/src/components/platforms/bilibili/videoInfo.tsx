import { renderRichTextToReact } from '@kkk/richtext'
import { format, fromUnixTime } from 'date-fns'
import React from 'react'

import { DefaultLayout } from '../../../components/layouts/DefaultLayout'
import type { BilibiliVideoInfoProps } from '../../../types/platforms/bilibili/videoInfo'
import { GlowText } from '../../common/GlowImage'
import { Icon } from '../../common/Icon'
import { EnhancedImage } from './shared'

const formatNumber = (num: number): string => {
  if (num >= 10000) return `${(num / 10000).toFixed(1)}万`
  return num.toLocaleString()
}

const coverMaskStyle: React.CSSProperties = {
  maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
}

/**
 * 全局氛围背景层：模糊封面 + 渐变遮罩 + 高对比杂色纹理
 */
const AmbientBackground: React.FC<{ pic: string }> = React.memo(({ pic }) => (
  <div className="absolute inset-0 overflow-hidden -z-10">
    {/* 模糊封面背景 */}
    <img
      src={pic}
      alt=""
      className="w-full h-full object-cover scale-150 blur-[120px] saturate-[1.8] opacity-50"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
    />
    {/* 渐变遮罩 */}
    <div className="absolute inset-0 bg-linear-to-b from-surface/60 via-surface/25 to-surface/60 dark:from-black/55 dark:via-black/20 dark:to-black/55" />

    {/* 高对比杂色纹理层 */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.45] mix-blend-overlay dark:mix-blend-soft-light">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="biliNoise">
            <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="3" stitchTiles="stitch" />
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
          <mask id="noiseMask">
            <linearGradient id="noiseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.85" />
              <stop offset="25%" stopColor="white" stopOpacity="0.4" />
              <stop offset="50%" stopColor="white" stopOpacity="0.08" />
              <stop offset="75%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0.85" />
            </linearGradient>
            <rect width="100%" height="100%" fill="url(#noiseGradient)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" filter="url(#biliNoise)" mask="url(#noiseMask)" fill="white" />
      </svg>
    </div>
  </div>
))

AmbientBackground.displayName = 'AmbientBackground'

export const BilibiliVideoInfo: React.FC<Omit<BilibiliVideoInfoProps, 'templateType' | 'templateName'>> = React.memo(
  (props) => {
    return (
      <DefaultLayout {...props} className="relative overflow-hidden">
        {/* 全局氛围层 */}
        <AmbientBackground pic={props.data.pic} />

        <div className="relative z-10">
          {/* 封面：全宽，底部极轻微溶解，不接文字 */}
          <div style={coverMaskStyle}>
            <EnhancedImage
              src={props.data.pic}
              alt={props.data.title}
              className="object-cover w-full"
              placeholder="视频封面"
            />
          </div>

          {/* 内容区：压在封面溶解区域之上 */}
          <div className="flex flex-col gap-10 px-16 pt-20">
            {/* 标题区 */}
            <div className="flex flex-col gap-5">
              <h1 className="text-[80px] font-black leading-[1.05] text-foreground tracking-tight">
                {props.data.title}
              </h1>
              <div className="flex items-center gap-4 text-4xl text-muted">
                <Icon icon="solar:calendar-linear" width={38} className="text-foreground/25" />
                <span>{format(fromUnixTime(props.data.ctime), 'yyyy-MM-dd HH:mm')}</span>
              </div>
            </div>

            {/* 视频简介 */}
            {props.data.desc && (
              <div className="text-5xl leading-relaxed text-foreground/75">
                {renderRichTextToReact(props.data.desc, {
                  at: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
                  topic: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
                  lottery: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
                  webLink: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
                  vote: { className: 'text-[#006A9E] dark:text-[#58B0D5]' },
                  viewPicture: { className: 'text-[#006A9E] dark:text-[#58B0D5]' }
                })}
              </div>
            )}

            {/* 统计 3×2：紧凑同行排列，图标小、数字标签同排 */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
              {/* 播放 */}
              <div className="flex items-baseline gap-3 text-4xl">
                <Icon icon="tabler:eye" width={38} className="text-foreground/25 shrink-0 self-center" />
                <span className="font-bold text-foreground tabular-nums leading-none">
                  {formatNumber(props.data.stat.view)}
                </span>
                <span className="ml-1 text-3xl opacity-40 leading-none">
                  播放
                </span>
              </div>

              {/* 点赞 */}
              <div className="flex items-baseline gap-3 text-4xl">
                <Icon icon="tabler:heart" width={38} className="text-foreground/25 shrink-0 self-center" />
                <span className="font-bold text-foreground tabular-nums leading-none">
                  {formatNumber(props.data.stat.like)}
                </span>
                <span className="ml-1 text-3xl opacity-40 leading-none">
                  点赞
                </span>
              </div>

              {/* 评论 */}
              <div className="flex items-baseline gap-3 text-4xl">
                <Icon icon="tabler:message-circle" width={38} className="text-foreground/25 shrink-0 self-center" />
                <span className="font-bold text-foreground tabular-nums leading-none">
                  {formatNumber(props.data.stat.reply)}
                </span>
                <span className="ml-1 text-3xl opacity-40 leading-none">
                  评论
                </span>
              </div>

              {/* 收藏 */}
              <div className="flex items-baseline gap-3 text-4xl">
                <Icon icon="tabler:star" width={38} className="text-foreground/25 shrink-0 self-center" />
                <span className="font-bold text-foreground tabular-nums leading-none">
                  {formatNumber(props.data.stat.favorite)}
                </span>
                <span className="ml-1 text-3xl opacity-40 leading-none">
                  收藏
                </span>
              </div>

              {/* 投币 */}
              <div className="flex items-baseline gap-3 text-4xl">
                <Icon icon="tabler:coins" width={38} className="text-foreground/25 shrink-0 self-center" />
                <span className="font-bold text-foreground tabular-nums leading-none">
                  {formatNumber(props.data.stat.coin)}
                </span>
                <span className="ml-1 text-3xl opacity-40 leading-none">
                  投币
                </span>
              </div>

              {/* 分享 */}
              <div className="flex items-baseline gap-3 text-4xl">
                <Icon icon="tabler:share-2" width={38} className="text-foreground/25 shrink-0 self-center" />
                <span className="font-bold text-foreground tabular-nums leading-none">
                  {formatNumber(props.data.stat.share)}
                </span>
                <span className="ml-1 text-3xl opacity-40 leading-none">
                  分享
                </span>
              </div>
            </div>

            {/* BV号 */}
            <div className="text-right">
              <span className="font-mono text-4xl text-foreground/40">稿件BV号：{props.data.bvid}</span>
            </div>

            <div />

            {/* UP主信息：头像左，文字右，利用 flex 自然撑开宽度 */}
            <div className="flex gap-10 items-center ml-6">
              <div className="relative shrink-0 w-56 h-56 flex items-center justify-center">
                <EnhancedImage
                  src={props.data.owner.face}
                  alt={props.data.owner.name}
                  className="object-cover w-44 h-44 rounded-full"
                  placeholder={props.data.owner.name.charAt(0)}
                  isCircular
                />
                {props.data.owner.frame && (
                  <EnhancedImage
                    src={props.data.owner.frame}
                    alt="头像框"
                    className="absolute inset-0 scale-138"
                  />
                )}
              </div>
              <div className="flex flex-col gap-8 min-w-0 flex-1">
                <GlowText glowStrength={props.data.useDarkTheme ? 1 : 0}>
                  <p
                    className="text-7xl font-bold truncate"
                    style={props.data.owner.usernameMeta?.nicknameColor
                      ? { color: props.data.owner.usernameMeta.nicknameColor }
                      : undefined}
                  >
                    {props.data.owner.usernameMeta?.name ?? props.data.owner.name}
                  </p>
                </GlowText>
                <p className="text-5xl text-scrollbar">UID: {props.data.owner.mid}</p>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
)

BilibiliVideoInfo.displayName = 'BilibiliVideoInfo'

export default BilibiliVideoInfo
