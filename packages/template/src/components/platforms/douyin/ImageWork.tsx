import { renderRichTextToReact } from '@kkk/richtext'
import {
  ImageIcon,
  MapPinIcon,
  MusicNoteIcon,
  UserPlusIcon,
  UsersIcon,
  UsersThreeIcon,
  VideoCameraIcon
} from '@phosphor-icons/react'
import { format, formatDistanceToNow, fromUnixTime } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Clock3, Hash, Maximize } from 'lucide-react'
import React from 'react'

import type { DouyinImageMediaType, DouyinImageWorkProps } from '../../../types/platforms/douyin/imageWork'
import { cn } from '../../../utils/cn'
import { generateQRCode } from '../../../utils/QRcode'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { DouyinCommentIcon, DouyinFavoriteIcon, DouyinLikeIcon, DouyinShareIcon } from './Icons'

type Props = Omit<DouyinImageWorkProps, 'templateType' | 'templateName'>

/** 抖音实况图标，来源于根目录 noun-live-photo-710576.svg 的 React 化精简版。 */
const LivePhotoIcon: React.FC<{ size?: number; className?: string }> = ({ size = 28, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="50" cy="50" r="37" stroke="currentColor" strokeWidth="6" strokeDasharray="2 9" strokeLinecap="round" />
    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="6" />
    <circle cx="50" cy="50" r="10" fill="currentColor" />
  </svg>
)

/** 首图媒体类型徽标配置。 */
const imageMediaTypeMeta = {
  static: { label: '静态', icon: ImageIcon },
  live: { label: '动图', icon: LivePhotoIcon },
  clip: { label: '短片', icon: VideoCameraIcon }
} satisfies Record<
  DouyinImageMediaType,
  {
    label: string
    icon: React.FC<{ size?: number; className?: string; weight?: 'fill' }>
  }
>

const DouyinAvatarUserInfo: React.FC<Props> = (props) => {
  const { avater_url, username, create_time, useDarkTheme, dynamicTYPE } = props.data
  const publishTime = formatDistanceToNow(fromUnixTime(create_time), {
    addSuffix: true,
    locale: zhCN
  })
  return (
    <div className="flex gap-10 items-center justify-between px-0 pb-0 pl-24 pr-10">
      <div className="flex gap-10 items-center">
        <div className="flex justify-center items-center bg-white rounded-full w-35 h-35">
          <img
            src={avater_url}
            alt="头像"
            className="rounded-full w-33 h-33 shadow-large"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
        </div>
        <div className="flex flex-col gap-8 text-7xl">
          <div className="text-6xl font-bold select-text text-foreground">{username}</div>
          <div className="flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-muted">
            <Clock3 size={40} />
            <span className="select-text">{publishTime}</span>
          </div>
        </div>
      </div>
      <div className="shrink-0 flex flex-col items-end gap-2">
        <img
          src={useDarkTheme ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
          alt="抖音"
          className="h-20 w-auto object-contain"
        />
        {dynamicTYPE && (
          <div className="px-6 py-2 rounded-full bg-surface-secondary text-2xl font-medium text-muted select-text tracking-widest">
            {dynamicTYPE}
          </div>
        )}
      </div>
    </div>
  )
}

const DouyinCoverImage: React.FC<Props> = (props) => {
  const { image_list, music } = props.data
  const imageItems = image_list.images
  const cover = imageItems[0]
  const previews = imageItems.slice(1)
  const totalCount = image_list.total_count
  const previewItems = previews.slice(0, 2)
  if (!cover?.url) return null

  const firstMediaType = cover?.media_type ?? 'static'
  const firstMediaMeta = imageMediaTypeMeta[firstMediaType]
  const FirstMediaIcon = firstMediaMeta.icon
  const firstMediaBadge = (
    <div className="absolute top-7 right-7 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/50 backdrop-blur-sm text-white shadow-large">
      <FirstMediaIcon size={34} className="text-white" weight="fill" />
      <span className="text-3xl font-medium select-text">{firstMediaMeta.label}</span>
    </div>
  )
  const musicBadge = music && (
    <div className="absolute left-7 bottom-7 z-20 flex items-center gap-4 max-w-[72%] p-3 rounded-3xl bg-black/45 backdrop-blur-2xl border border-white/20 shadow-large overflow-hidden">
      <div className="relative shrink-0 w-18 h-18">
        {music.cover ? (
          <>
            <img
              src={music.cover}
              alt=""
              className="absolute inset-0 w-full h-full rounded-2xl object-cover blur-md scale-110 opacity-70"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <img
              src={music.cover}
              alt="BGM封面"
              className="relative z-10 w-full h-full rounded-2xl object-cover"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full rounded-2xl bg-white/15 text-white">
            <MusicNoteIcon size={36} weight="fill" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0 pr-2 text-white">
        <span className="text-3xl font-semibold truncate select-text">{music.title}</span>
        <span className="text-2xl text-white/85 truncate select-text">{music.author}</span>
      </div>
    </div>
  )

  if (previewItems.length === 0) {
    return (
      <div className="px-20">
        <div className="relative overflow-hidden rounded-5xl shadow-large">
          <img
            src={cover.url}
            alt="图文封面"
            className="object-contain w-full h-auto"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
          {firstMediaBadge}
          {musicBadge}
        </div>
      </div>
    )
  }

  const stack: Array<{ url: string; filter: string; shift: number }> = [
    { url: cover.url, filter: 'none', shift: 0 },
    ...previewItems.map((item, idx) => ({
      url: item.url,
      filter:
        idx === 0
          ? 'brightness(0.88) saturate(0.86) contrast(0.96) blur(1px) opacity(0.8)'
          : 'brightness(0.78) saturate(0.68) contrast(0.9) blur(3px) opacity(0.6)',
      shift: (idx + 1) * 16
    }))
  ].filter((item) => item.url)

  return (
    <div className="px-20">
      <div className="relative overflow-visible rounded-5xl">
        {stack.map((item, idx) => {
          const isFirst = idx === 0
          return isFirst ? (
            <div key={idx} className="relative overflow-hidden rounded-5xl shadow-large" style={{ zIndex: stack.length }}>
              <img src={item.url} alt="图文封面" className="w-full h-auto block" referrerPolicy="no-referrer" crossOrigin="anonymous" />
              {totalCount > 1 && (
                <div className="absolute top-7 left-7 px-5 py-2 rounded-2xl bg-black/50 backdrop-blur-sm">
                  <span className="text-3xl font-medium text-white select-text">共 {totalCount} 张</span>
                </div>
              )}
              {firstMediaBadge}
              {musicBadge}
            </div>
          ) : (
            <div
              key={idx}
              className="absolute inset-0 overflow-hidden rounded-5xl shadow-large"
              style={{
                transform: `translate(${item.shift}px, ${item.shift * 2}px)`,
                zIndex: stack.length - idx
              }}
            >
              <img
                src={item.url}
                alt={`预览图 ${idx + 1}`}
                className="w-full h-full object-cover object-center"
                style={{ filter: item.filter }}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const DouyinDynamicContent: React.FC<Props> = (props) => {
  const { title, desc } = props.data
  const richTextOptions = {
    hashtag: {
      className: 'text-[#04498d] dark:text-[#face15] font-medium'
    },
    mention: {
      className: 'text-[#04498d] dark:text-[#face15] font-medium'
    }
  }
  const hasTitle = Boolean(title?.nodes.length)
  const hasDesc = desc.nodes.length > 0

  return (
    <div className="flex flex-col px-20 w-full leading-relaxed">
      {hasTitle && title && (
        <div
          className="text-[72px] leading-tight mb-8 text-foreground select-text"
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {renderRichTextToReact(title, richTextOptions)}
        </div>
      )}
      {hasDesc && (
        <div
          className="text-[56px] tracking-[0.5px] leading-[1.7] whitespace-pre-wrap text-foreground select-text"
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {renderRichTextToReact(desc, richTextOptions)}
        </div>
      )}
    </div>
  )
}

const DouyinDynamicStatus: React.FC<Props> = (props) => {
  const { dianzan, pinglun, shouchang, share, ip_location, suggest_word } = props.data
  const renderTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  const stats = [
    { icon: DouyinLikeIcon, value: dianzan, label: '点赞' },
    { icon: DouyinCommentIcon, value: pinglun, label: '评论' },
    { icon: DouyinFavoriteIcon, value: shouchang, label: '收藏' },
    { icon: DouyinShareIcon, value: share, label: '分享' }
  ]

  return (
    <div className="flex flex-col gap-10 px-18 w-full leading-relaxed">
      <div className="flex gap-6 items-center text-5xl tracking-normal select-text text-foreground/70">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <React.Fragment key={stat.label}>
              {idx > 0 && <span>·</span>}
              <div className="flex gap-2 items-end">
                <Icon size={50} weight="fill" className="mt-2" />
                <span className="font-medium">{stat.value}</span>
                <span className="text-3xl font-light">{stat.label}</span>
              </div>
            </React.Fragment>
          )
        })}
      </div>
      {ip_location && (
        <div className="flex gap-12 items-center font-light select-text text-foreground/70">
          <div className="flex gap-2 items-center">
            <MapPinIcon size={50} weight="fill" className="mt-1" />
            <span className="text-5xl font-medium">{ip_location}</span>
          </div>
          {suggest_word && (
            <div className="flex gap-2 items-center py-3.5 px-6 bg-foreground/5 dark:bg-foreground/10 rounded-full text-4xl font-light select-text text-foreground/70">
              <span className="text-muted">{suggest_word.hint_text}</span>
              <span className="text-[#04498d] dark:text-[#face15] font-medium">{suggest_word.word}</span>
            </div>
          )}
        </div>
      )}
      <div className="flex gap-3 items-center text-4xl font-light tracking-normal select-text text-foreground/70">
        <Maximize size={44} />
        图片生成于: {renderTime}
      </div>
    </div>
  )
}

const DouyinCoCreatorList: React.FC<Props> = (props) => {
  const creators = props.data.cooperation_info?.co_creators ?? []
  if (creators.length === 0) return null

  const items = creators.slice(0, 50)

  const listRef = React.useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = React.useState(items.length)

  React.useEffect(() => {
    const calc = () => {
      const el = listRef.current
      if (!el) return
      const containerWidth = el.offsetWidth
      const ITEM_W = 152
      const GAP = 32
      const PAD_R = 8

      const capacity = Math.floor((containerWidth - PAD_R) / (ITEM_W + GAP))
      const needEllipsis = items.length > capacity
      const nextVisible = needEllipsis ? Math.max(0, capacity - 1) : items.length
      setVisibleCount(nextVisible)
    }

    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [items.length])

  return (
    <div className="flex flex-col px-20 w-full">
      <div ref={listRef} className="flex overflow-hidden gap-8 py-1 pr-2 w-full">
        {items.slice(0, visibleCount).map((c, idx) => (
          <div key={`${c.nickname || 'creator'}-${idx}`} className="flex flex-col items-center min-w-38 w-38 shrink-0">
            <div className="flex justify-center items-center bg-white rounded-full w-30 h-30">
              <img
                src={c.avatar_url}
                alt="共创者头像"
                className="object-cover w-28 h-28 rounded-full"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
            </div>
            <div className="overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground">
              {c.nickname || '未提供'}
            </div>
            <div className="overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-muted">
              {c.role_title || '未提供'}
            </div>
          </div>
        ))}

        {items.length > visibleCount && (
          <div className="flex flex-col items-center min-w-38 w-38 shrink-0">
            <div className="flex justify-center items-center rounded-full bg-surface-secondary w-30 h-30">
              <span className="text-[42px] leading-none text-muted">···</span>
            </div>
            <div className="overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground">
              还有{items.length - visibleCount}人
            </div>
            <div className="overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-muted">
              共创
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const DouyinDynamicFooter: React.FC<Props> = (props) => {
  const { avater_url, username, 抖音号, 获赞, 关注, 粉丝, share_url, useDarkTheme } = props.data
  const stats = [
    { icon: DouyinLikeIcon, iconSize: 36, label: '获赞', value: 获赞 },
    { icon: UserPlusIcon, iconSize: 36, label: '关注', value: 关注 },
    { icon: UsersThreeIcon, iconSize: 36, label: '粉丝', value: 粉丝 }
  ]

  return (
    <div className="flex justify-between items-start px-20 pb-20">
      <div className="flex flex-col gap-12">
        <div className="flex gap-12 items-start">
          <div className="relative shrink-0">
            <div className="flex justify-center items-center bg-white rounded-full w-35 h-35">
              <img
                src={avater_url}
                alt="头像"
                className="rounded-full w-33 h-33 shadow-large"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-7xl font-bold select-text text-foreground">{username}</div>
            <div className="flex gap-2 items-center text-4xl text-muted">
              <Hash size={32} />
              <span className="select-text">抖音号: {抖音号}</span>
            </div>
          </div>
        </div>

        <div className="text-3xl flex gap-6 items-center text-foreground/70">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-surface">
                <div className="flex gap-1 items-center">
                  <Icon size={stat.iconSize} weight="fill" />
                  <span className="text-muted">{stat.label}</span>
                </div>
                <div className="w-full h-px bg-border" />
                <span className="select-text font-medium text-4xl">{stat.value}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <img src={generateQRCode(share_url, useDarkTheme)} alt="二维码" className="h-auto w-75 rounded-2xl" />
      </div>
    </div>
  )
}

export const DouyinImageWork: React.FC<Props> = React.memo((props) => {
  const coCreatorCount = props.data.cooperation_info?.co_creator_nums ?? props.data.cooperation_info?.co_creators?.length ?? undefined
  const hasCoCreators = !!coCreatorCount && coCreatorCount > 0

  return (
    <DefaultLayout {...props}>
      <div className="p-4">
        <div className="h-25" />

        <DouyinAvatarUserInfo {...props} />

        <div className="h-15" />

        <DouyinDynamicContent {...props} />

        <div className="h-15" />

        <DouyinCoverImage {...props} />

        <div className={cn(props.data.image_list.images.length > 2 ? 'h-25' : 'h-20')} />

        <DouyinDynamicStatus {...props} />

        <div className={cn(hasCoCreators && 'h-23', !hasCoCreators && 'h-40')} />

        {hasCoCreators && (
          <>
            <div className="px-20 pb-8">
              <div className="gap-2 inline-flex items-center rounded-2xl bg-surface text-foreground/80 px-6 py-3">
                <UsersIcon size={26} weight="fill" />
                <span className="text-3xl font-medium leading-none select-text">{coCreatorCount}人共创</span>
              </div>
            </div>
            <DouyinCoCreatorList {...props} />
            <div className="h-15" />
          </>
        )}

        <DouyinDynamicFooter {...props} />
      </div>
    </DefaultLayout>
  )
})

DouyinImageWork.displayName = 'DouyinImageWork'

export default DouyinImageWork
