import { extractRichTextPlainText, renderRichTextToReact } from '@kkk/richtext'
import { MapPinIcon, MusicNoteIcon, PlayIcon, UserPlusIcon, UsersIcon, UsersThreeIcon } from '@phosphor-icons/react'
import { format, formatDistanceToNow, fromUnixTime } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Clock3, Hash } from 'lucide-react'
import React from 'react'

import type { DouyinVideoWorkProps } from '../../../types/platforms/douyin/videoWork'
import { generateQRCode } from '../../../utils/QRcode'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { DouyinCommentIcon, DouyinFavoriteIcon, DouyinLikeIcon, DouyinShareIcon } from './Icons'

type Props = Omit<DouyinVideoWorkProps, 'templateType' | 'templateName'>

const getTitleClassName = (titleLength: number): string => {
  if (titleLength > 96) return 'text-[42px] leading-[1.34]'
  if (titleLength > 72) return 'text-[48px] leading-[1.3]'
  if (titleLength > 48) return 'text-[54px] leading-[1.26]'
  return 'text-[62px] leading-[1.18]'
}

function formatDuration(duration?: number): string | undefined {
  if (typeof duration !== 'number' || !Number.isFinite(duration) || duration < 0) return undefined

  const totalSeconds = Math.floor(duration / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const pad = (value: number) => value.toString().padStart(2, '0')

  if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  return `${pad(minutes)}:${pad(seconds)}`
}

/**
 * 多段透明度停靠点用于模拟 smoothstep，让封面从环境柔光进入清晰主体时没有明显的线性渐变拐点。
 */
const ambientCoverMask =
  'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 6%, rgba(0,0,0,0.32) 16%, rgba(0,0,0,0.68) 28%, black 42%, black 58%, rgba(0,0,0,0.68) 72%, rgba(0,0,0,0.32) 84%, rgba(0,0,0,0.08) 94%, transparent 100%)'

const foregroundCoverMask =
  'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 4%, rgba(0,0,0,0.35) 10%, rgba(0,0,0,0.68) 17%, rgba(0,0,0,0.9) 23%, black 30%, black 70%, rgba(0,0,0,0.9) 77%, rgba(0,0,0,0.68) 83%, rgba(0,0,0,0.35) 90%, rgba(0,0,0,0.1) 96%, transparent 100%)'

const DouyinDiffuseBackground: React.FC<Props> = ({ data }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
    <img
      src={data.image_url}
      alt=""
      className="absolute inset-0 h-full w-full scale-150 object-cover opacity-50 blur-[120px] saturate-[1.8]"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
    />
    <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/50 to-background/70" />

    <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay dark:mix-blend-soft-light">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="douyinVideoWorkNoise">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" stitchTiles="stitch" />
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
          <mask id="douyinVideoWorkNoiseMask">
            <linearGradient id="douyinVideoWorkNoiseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="15%" stopColor="white" stopOpacity="0.6" />
              <stop offset="50%" stopColor="white" stopOpacity="0.15" />
              <stop offset="85%" stopColor="white" stopOpacity="0.6" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <rect width="100%" height="100%" fill="url(#douyinVideoWorkNoiseGradient)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" filter="url(#douyinVideoWorkNoise)" mask="url(#douyinVideoWorkNoiseMask)" fill="white" />
      </svg>
    </div>
  </div>
)

const DouyinPosterHeader: React.FC<Props> = ({ data }) => {
  const { avater_url, username, create_time, useDarkTheme, ip_location } = data
  const publishTime = formatDistanceToNow(fromUnixTime(create_time), {
    addSuffix: true,
    locale: zhCN
  })

  return (
    <header className="flex items-start justify-between gap-14">
      <div className="flex min-w-0 items-center gap-6">
        <img
          src={avater_url}
          alt="头像"
          className="h-24 w-24 shrink-0 rounded-full object-cover shadow-2xl"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
        <div className="min-w-0">
          <div className="max-w-[660px] truncate text-[44px] font-black leading-tight text-foreground select-text">{username}</div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[30px] text-muted">
            <span className="inline-flex items-center gap-2">
              <Clock3 size={28} />
              <span className="select-text">{publishTime}</span>
            </span>
            {ip_location && (
              <span className="inline-flex items-center gap-2">
                <MapPinIcon size={30} weight="fill" />
                <span className="select-text">{ip_location}</span>
              </span>
            )}
          </div>
        </div>
      </div>
      <img
        src={useDarkTheme ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
        alt="抖音"
        className="mt-2 h-[68px] w-auto shrink-0 object-contain opacity-90"
      />
    </header>
  )
}

const DouyinVideoCover: React.FC<Props> = ({ data }) => {
  const { image_url, music, duration } = data
  const durationText = formatDuration(duration)

  return (
    <section className="relative -mx-20 mt-12 overflow-visible">
      <div
        className="absolute -inset-x-20 -inset-y-32 z-0 overflow-hidden"
        style={{
          maskImage: ambientCoverMask,
          WebkitMaskImage: ambientCoverMask
        }}
      >
        <img
          src={image_url}
          alt=""
          className="h-full w-full scale-[1.16] object-cover opacity-48 blur-[72px] saturate-[1.2]"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
      </div>
      <img
        src={image_url}
        alt="视频封面"
        className="relative z-10 block h-auto w-full drop-shadow-xl"
        style={{
          maskImage: foregroundCoverMask,
          WebkitMaskImage: foregroundCoverMask
        }}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-[6%] z-20 h-[38%] bg-linear-to-b from-transparent via-black/38 to-transparent" />

      <div className="absolute left-24 top-10 z-30 flex items-center gap-5 text-white">
        {durationText && <span className="text-[34px] font-black tabular-nums drop-shadow-lg">时长: {durationText}</span>}
      </div>

      <PlayIcon
        size={104}
        weight="fill"
        aria-label="播放"
        className="absolute bottom-12 right-24 z-30 text-white opacity-90 drop-shadow-2xl"
      />

      {music && (
        <div className="absolute bottom-12 left-24 z-30 flex max-w-[850px] items-center gap-5 text-white drop-shadow-xl">
          {music.cover ? (
            <div className="relative h-20 w-20 shrink-0">
              <img
                src={music.cover}
                alt=""
                className="absolute inset-0 h-full w-full scale-110 rounded-2xl object-cover opacity-65 blur-md"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
              <img
                src={music.cover}
                alt="BGM封面"
                className="relative z-10 h-full w-full rounded-2xl object-cover"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
            </div>
          ) : (
            <MusicNoteIcon size={44} weight="fill" className="shrink-0" />
          )}
          <div className="min-w-0">
            <div className="truncate text-[36px] font-black leading-tight select-text">{music.title}</div>
            <div className="truncate text-[27px] font-semibold text-white/76 select-text">{music.author}</div>
          </div>
        </div>
      )}
    </section>
  )
}

const DouyinPosterTitle: React.FC<Props> = ({ data }) => {
  const { title, desc } = data
  const hasTitle = Boolean(title?.nodes.length)
  const hasDesc = Boolean(desc?.nodes.length)
  const titleLength = title ? extractRichTextPlainText(title).length : 0
  const titleClassName = getTitleClassName(titleLength)
  const richTextOptions = {
    hashtag: {
      className: 'text-inherit opacity-60'
    },
    mention: {
      className: 'text-inherit'
    }
  }

  if (!hasTitle && !hasDesc) {
    return <h1 className="mt-14 text-[68px] font-black leading-[1.16] text-foreground select-text">抖音视频作品</h1>
  }

  return (
    <section className="mt-13">
      {hasTitle && title && (
        <h1
          className={`${titleClassName} font-bold text-foreground select-text`}
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {renderRichTextToReact(title, richTextOptions)}
        </h1>
      )}
      {hasDesc && (
        <div
          className="mt-7 max-w-[1160px] whitespace-pre-wrap text-[42px] font-medium leading-[1.48] text-muted select-text"
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {renderRichTextToReact(desc, richTextOptions)}
        </div>
      )}
    </section>
  )
}

const DouyinSignalLine: React.FC<Props> = ({ data }) => {
  const { dianzan, pinglun, shouchang, share, suggest_word } = data
  const renderTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  const stats = [
    { icon: DouyinLikeIcon, value: dianzan, label: '点赞' },
    { icon: DouyinCommentIcon, value: pinglun, label: '评论' },
    { icon: DouyinFavoriteIcon, value: shouchang, label: '收藏' },
    { icon: DouyinShareIcon, value: share, label: '分享' }
  ]

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end gap-x-16 gap-y-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="min-w-[150px]">
              <div className="flex items-center gap-3 text-[28px] font-semibold text-muted">
                <Icon size={36} weight="fill" className="text-foreground/80" />
                <span>{stat.label}</span>
              </div>
              <div className="mt-2 text-[64px] font-black leading-none text-foreground tabular-nums select-text">{stat.value}</div>
            </div>
          )
        })}
      </div>
      <div className="mt-8 flex min-w-0 flex-col gap-3 text-[29px] leading-[1.45] text-muted">
        {suggest_word && (
          <div className="min-w-0 truncate select-text">
            <span>{suggest_word.hint_text}</span>
            <span className="ml-2 font-black text-foreground">{suggest_word.word}</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <span className="select-text">图片生成于: {renderTime}</span>
        </div>
      </div>
    </section>
  )
}

const DouyinCoCreatorList: React.FC<Props & { coCreatorCount: number }> = ({ data, coCreatorCount }) => {
  const subscriberNickname = data.username
  const allCreators = data.cooperation_info?.co_creators ?? []
  const creators = allCreators.filter((creator) => creator.nickname !== subscriberNickname)
  if (creators.length === 0) return null

  const visibleCreators = creators.slice(0, 8)
  const remainingCount = Math.max(coCreatorCount - visibleCreators.length - 1, 0)

  return (
    <section className="mt-16">
      <div className="flex items-center gap-3 text-[34px] font-black text-foreground">
        <UsersIcon size={42} weight="fill" className="text-foreground/80" />
        <span>共 {coCreatorCount} 人共创</span>
      </div>
      <div className="mt-6 flex min-w-0 flex-wrap items-center gap-x-10 gap-y-6 overflow-hidden">
        {visibleCreators.map((creator, index) => (
          <div key={`${creator.nickname || 'creator'}-${index}`} className="flex min-w-0 max-w-[310px] items-center gap-4">
            <img
              src={creator.avatar_url || data.avater_url}
              alt="共创者头像"
              className="h-[72px] w-[72px] shrink-0 rounded-full object-cover shadow-xl"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <div className="min-w-0">
              <div className="truncate text-[28px] font-black leading-tight text-foreground select-text">
                {creator.nickname || '未提供'}
              </div>
              <div className="mt-1 truncate text-[23px] font-semibold text-muted select-text">{creator.role_title || '共创者'}</div>
            </div>
          </div>
        ))}
        {remainingCount > 0 && <div className="text-[32px] font-black text-muted">剩余 {remainingCount} 个...</div>}
      </div>
    </section>
  )
}

const DouyinPosterFooter: React.FC<Props> = ({ data }) => {
  const { avater_url, username, 抖音号, 获赞, 关注, 粉丝, share_url, useDarkTheme } = data
  const stats = [
    { icon: DouyinLikeIcon, iconSize: 26, label: '获赞', value: 获赞 },
    { icon: UserPlusIcon, iconSize: 32, label: '关注', value: 关注 },
    { icon: UsersThreeIcon, iconSize: 32, label: '粉丝', value: 粉丝 }
  ]

  return (
    <footer className="mt-10 flex items-start justify-between gap-16">
      <div className="min-w-0 flex-1 pt-10">
        <div className="flex items-center gap-6">
          <img
            src={avater_url}
            alt="头像"
            className="h-24 w-24 shrink-0 rounded-full object-cover shadow-xl"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
          <div className="min-w-0">
            <div className="max-w-[650px] truncate text-[48px] font-black leading-tight text-foreground select-text">{username}</div>
            <div className="mt-3 flex items-center gap-2 text-[30px] text-muted">
              <Hash size={28} />
              <span className="truncate select-text">抖音号: {抖音号}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="min-w-[150px]">
                <div className="flex items-center gap-3 text-[25px] font-semibold text-muted">
                  <Icon size={stat.iconSize} weight="fill" className="text-foreground/80" />
                  <span>{stat.label}</span>
                </div>
                <div className="mt-2 text-[32px] font-black leading-none text-foreground select-text">{stat.value}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="shrink-0 text-center">
        <div className="drop-shadow-2xl">
          <img
            src={generateQRCode(share_url, useDarkTheme)}
            alt="二维码"
            className="h-[300px] w-[300px]"
          />
        </div>
        <div className="mt-2 text-[28px] font-black text-foreground/80">扫码查看作品详情</div>
      </div>
    </footer>
  )
}

export const DouyinVideoWork: React.FC<Props> = React.memo((props) => {
  const coCreatorCount = props.data.cooperation_info?.co_creator_nums ?? props.data.cooperation_info?.co_creators?.length ?? undefined
  const hasCoCreators = !!coCreatorCount && coCreatorCount > 0

  return (
    <DefaultLayout {...props} className="relative overflow-hidden">
        <DouyinDiffuseBackground {...props} />

        <section className="relative z-10 px-20 pt-18">
          <DouyinPosterHeader {...props} />
          <DouyinPosterTitle {...props} />
          <DouyinVideoCover {...props} />
          <DouyinSignalLine {...props} />
          {hasCoCreators && <DouyinCoCreatorList {...props} coCreatorCount={coCreatorCount} />}
          <DouyinPosterFooter {...props} />
        </section>
    </DefaultLayout>
  )
})

DouyinVideoWork.displayName = 'DouyinVideoWork'

export default DouyinVideoWork
