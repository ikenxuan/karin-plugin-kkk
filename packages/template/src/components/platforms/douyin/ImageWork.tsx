import { ChatIcon, HeartIcon, ShareIcon, UsersIcon } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { Bookmark, Hash, Maximize } from 'lucide-react'
import React from 'react'

import type { DouyinImageWorkProps } from '../../../types/platforms/douyin/imageWork'
import { cn } from '../../../utils/cn'
import { generateQRCode } from '../../../utils/QRcode'
import { DefaultLayout } from '../../layouts/DefaultLayout'

const DouyinAvatarUserInfo: React.FC<{
  avatarUrl: string
  username: string
  douyinId: string
  useDarkTheme?: boolean
}> = ({ avatarUrl, username, douyinId, useDarkTheme }) => {
  return (
    <div className='flex gap-10 items-center justify-between px-0 pb-0 pl-24 pr-10'>
      <div className='flex gap-10 items-center'>
        <div className='flex justify-center items-center bg-white rounded-full w-35 h-35'>
          <img
            src={avatarUrl}
            alt='头像'
            className='rounded-full w-33 h-33 shadow-large'
            referrerPolicy='no-referrer'
            crossOrigin='anonymous'
          />
        </div>
        <div className='flex flex-col gap-8 text-7xl'>
          <div className='text-6xl font-bold select-text text-foreground'>
            {username}
          </div>
          <div className='flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-muted'>
            <Hash size={40} />
            <span className='select-text'>{douyinId}</span>
          </div>
        </div>
      </div>
      <div className='shrink-0'>
        <img
          src={useDarkTheme ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
          alt='抖音'
          className='h-20 w-auto object-contain'
        />
      </div>
    </div>
  )
}

const DouyinCoverImage: React.FC<{
  imageUrl: string
  imageList?: { images: string[]; total_count: number }
}> = ({ imageUrl, imageList }) => {
  const previews = imageList?.images ?? []
  const totalCount = imageList?.total_count ?? 1
  const previewItems = previews.slice(0, 2)

  if (previewItems.length === 0) {
    return (
      <div className='px-20'>
        <div className='overflow-hidden rounded-5xl shadow-large'>
          <img
            src={imageUrl}
            alt='图文封面'
            className='object-contain w-full h-auto'
            referrerPolicy='no-referrer'
            crossOrigin='anonymous'
          />
        </div>
      </div>
    )
  }

  const stack: Array<{ url: string; opacity: number; shift: number }> = [
    { url: imageUrl, opacity: 1, shift: 0 },
    ...previewItems.map((url, idx) => ({
      url,
      opacity: idx === 0 ? 0.55 : 0.1,
      shift: (idx + 1) * 16
    }))
  ]

  return (
    <div className='px-20'>
      <div className='relative overflow-visible rounded-5xl'>
        {stack.map((item, idx) => {
          const isFirst = idx === 0
          return isFirst
            ? (
              <div
                key={idx}
                className='relative overflow-hidden rounded-5xl shadow-large'
                style={{ zIndex: stack.length }}
              >
                <img
                  src={item.url}
                  alt='图文封面'
                  className='w-full h-auto block'
                  referrerPolicy='no-referrer'
                  crossOrigin='anonymous'
                />
                {totalCount > 1 && (
                  <div className='absolute top-7 left-7 px-5 py-2 rounded-2xl bg-black/50 backdrop-blur-sm'>
                    <span className='text-3xl font-medium text-white select-text'>共 {totalCount} 张</span>
                  </div>
                )}
              </div>
            )
            : (
              <div
                key={idx}
                className='absolute inset-0 overflow-hidden rounded-5xl shadow-large'
                style={{
                  transform: `translate(${item.shift}px, ${item.shift * 2}px)`,
                  zIndex: stack.length - idx,
                  opacity: item.opacity
                }}
              >
                <img
                  src={item.url}
                  alt={`预览图 ${idx + 1}`}
                  className='w-full h-full object-cover object-center'
                  referrerPolicy='no-referrer'
                  crossOrigin='anonymous'
                />
              </div>
            )
        })}
      </div>
    </div>
  )
}

const DouyinDynamicContent: React.FC<{ desc: string }> = ({ desc }) => {
  return (
    <div className='flex flex-col px-20 w-full leading-relaxed'>
      <div
        className='text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground select-text'
        style={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word'
        }}
        dangerouslySetInnerHTML={{ __html: desc }}
      />
    </div>
  )
}

const DouyinDynamicStatus: React.FC<{
  dianzan: string
  pinglun: string
  shouchang: string
  share: string
  publishTime: string
  renderTime: string
}> = ({ dianzan, pinglun, shouchang, share, renderTime }) => {
  const stats = [
    { icon: HeartIcon, value: dianzan, label: '点赞' },
    { icon: ChatIcon, value: pinglun, label: '评论' },
    { icon: Bookmark, value: shouchang, label: '收藏', isLucide: true },
    { icon: ShareIcon, value: share, label: '分享' }
  ]

  return (
    <div className='flex flex-col gap-10 px-18 w-full leading-relaxed'>
      <div className='flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground/70'>
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <React.Fragment key={stat.label}>
              {idx > 0 && <span>·</span>}
              <div className='flex gap-2 items-center'>
                {stat.isLucide
                  ? <Icon size={50} />
                  : <Icon size={50} weight='fill' className='mt-2' />
                }
                {stat.value}{stat.label}
              </div>
            </React.Fragment>
          )
        })}
      </div>
      <div className='flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground/70'>
        <Maximize size={48} />
        图片生成于: {renderTime}
      </div>
    </div>
  )
}

const DouyinCoCreatorList: React.FC<{
  info?: DouyinImageWorkProps['data']['cooperation_info']
}> = ({ info }) => {
  const creators = info?.co_creators ?? []
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
    <div className='flex flex-col px-20 w-full'>
      <div
        ref={listRef}
        className='flex overflow-hidden gap-8 py-1 pr-2 w-full'
      >
        {items.slice(0, visibleCount).map((c, idx) => (
          <div
            key={`${c.nickname || 'creator'}-${idx}`}
            className='flex flex-col items-center min-w-38 w-38 shrink-0'
          >
            <div className='flex justify-center items-center bg-white rounded-full w-30 h-30'>
              <img
                src={c.avatar_url}
                alt='共创者头像'
                className='object-cover w-28 h-28 rounded-full'
                referrerPolicy='no-referrer'
                crossOrigin='anonymous'
              />
            </div>
            <div className='overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground'>
              {c.nickname || '未提供'}
            </div>
            <div className='overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-muted'>
              {c.role_title || '未提供'}
            </div>
          </div>
        ))}

        {items.length > visibleCount && (
          <div className='flex flex-col items-center min-w-38 w-38 shrink-0'>
            <div className='flex justify-center items-center rounded-full bg-surface-secondary w-30 h-30'>
              <span className='text-[42px] leading-none text-muted'>···</span>
            </div>
            <div className='overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground'>
              还有{items.length - visibleCount}人
            </div>
            <div className='overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-muted'>
              共创
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const DouyinDynamicFooter: React.FC<{
  avatarUrl: string
  username: string
  douyinId: string
  dianzan: string
  following: string
  fans: string
  shareUrl: string
  useDarkTheme?: boolean
}> = ({ avatarUrl, username, douyinId, dianzan, following, fans, shareUrl, useDarkTheme }) => {
  const stats = [
    { icon: HeartIcon, iconSize: 36, label: '获赞', value: dianzan },
    { icon: UsersIcon, iconSize: 36, label: '关注', value: following },
    { icon: UsersIcon, iconSize: 36, label: '粉丝', value: fans, filled: true }
  ]

  return (
    <div className='flex justify-between items-start px-20 pb-20'>
      <div className='flex flex-col gap-12'>
        <div className='flex gap-12 items-start'>
          <div className='relative shrink-0'>
            <div className='flex justify-center items-center bg-white rounded-full w-35 h-35'>
              <img
                src={avatarUrl}
                alt='头像'
                className='rounded-full w-33 h-33 shadow-large'
                referrerPolicy='no-referrer'
                crossOrigin='anonymous'
              />
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='text-7xl font-bold select-text text-foreground'>
              {username}
            </div>
            <div className='flex gap-2 items-center text-4xl text-muted'>
              <Hash size={32} />
              <span className='select-text'>抖音号: {douyinId}</span>
            </div>
          </div>
        </div>

        <div className='text-3xl flex gap-6 items-center text-foreground/70'>
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-surface'>
                <div className='flex gap-1 items-center'>
                  <Icon size={stat.iconSize} weight={stat.filled ? 'fill' : undefined} />
                  <span className='text-muted'>{stat.label}</span>
                </div>
                <div className='w-full h-px bg-border' />
                <span className='select-text font-medium text-4xl'>{stat.value}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <img
          src={generateQRCode(shareUrl, useDarkTheme)}
          alt='二维码'
          className='h-auto w-75 rounded-2xl'
        />
      </div>
    </div>
  )
}

export const DouyinImageWork: React.FC<Omit<DouyinImageWorkProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  const renderTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

  const coCreatorCount =
    props.data.cooperation_info?.co_creator_nums ??
    (props.data.cooperation_info?.co_creators?.length ?? undefined)
  const hasCoCreators = !!coCreatorCount && coCreatorCount > 0

  return (
    <DefaultLayout {...props}>
      <div className='p-4'>
        <div className='h-25' />

        <DouyinAvatarUserInfo
          avatarUrl={props.data.avater_url}
          username={props.data.username}
          douyinId={props.data.抖音号}
          useDarkTheme={props.data.useDarkTheme}
        />

        <div className='h-15' />

        <DouyinDynamicContent desc={props.data.desc} />

        <div className='h-15' />

        <DouyinCoverImage imageUrl={props.data.image_url} imageList={props.data.image_list} />

        <div className='h-20' />

        <DouyinDynamicStatus
          dianzan={props.data.dianzan}
          pinglun={props.data.pinglun}
          shouchang={props.data.shouchang}
          share={props.data.share}
          publishTime={props.data.create_time}
          renderTime={renderTime}
        />

        <div className={cn(
          hasCoCreators && 'h-23',
          !hasCoCreators && 'h-40'
        )} />

        {hasCoCreators && (
          <>
            <div className='px-20 pb-8'>
              <div className='gap-2 inline-flex items-center rounded-2xl bg-surface text-foreground/80 px-6 py-3'>
                <UsersIcon size={26} weight='fill' />
                <span className='text-3xl font-medium leading-none select-text'>{coCreatorCount}人共创</span>
              </div>
            </div>
            <DouyinCoCreatorList info={props.data.cooperation_info} />
            <div className='h-15' />
          </>
        )}

        <DouyinDynamicFooter
          avatarUrl={props.data.avater_url}
          username={props.data.username}
          douyinId={props.data.抖音号}
          dianzan={props.data.获赞}
          following={props.data.关注}
          fans={props.data.粉丝}
          shareUrl={props.data.share_url}
          useDarkTheme={props.data.useDarkTheme}
        />
      </div>
    </DefaultLayout>
  )
})

DouyinImageWork.displayName = 'DouyinImageWork'

export default DouyinImageWork
