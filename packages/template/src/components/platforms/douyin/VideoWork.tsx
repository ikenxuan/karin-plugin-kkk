import { format } from 'date-fns'
import React from 'react'

import type { DouyinVideoWorkProps } from '../../../types/platforms/douyin'
import { Icon } from '../../common/Icon'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 抖音Logo头部组件
 */
const DouyinHeader: React.FC<{ useDarkTheme?: boolean }> = ({ useDarkTheme }) => {
  return (
    <div className='flex items-center px-12 py-15'>
      <div className='w-[39%] h-50 bg-cover bg-center bg-fixed'>
        <img
          src={useDarkTheme ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
          alt='抖音Logo'
          className='object-contain w-full h-full'
        />
      </div>
      <span className='text-[65px] ml-4 text-foreground/70'>
        记录美好生活
      </span>
    </div>
  )
}

/**
 * 视频封面组件
 */
const CoverSection: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <div className='flex flex-col items-center my-5'>
      <div className='flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative'>
        <img
          className='rounded-[25px] object-contain w-full h-full'
          src={imageUrl}
          alt='视频封面'
        />
      </div>
    </div>
  )
}

/**
 * 作品信息组件
 */
const InfoSection: React.FC<DouyinVideoWorkProps> = (props) => {
  return (
    <div className='flex flex-col px-16 py-5'>
      <div
        className='text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text'
        style={{ letterSpacing: '1.5px', wordWrap: 'break-word' }}
        dangerouslySetInnerHTML={{ __html: props.data.desc }}
      />
      <div className='flex items-center gap-6 text-[45px] text-muted font-light mb-2.5 select-text'>
        <div className='flex gap-2 items-center'>
          <Icon icon="lucide:heart" className='w-11 h-11 text-like' />
          <span>{props.data.dianzan}点赞</span>
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <Icon icon="lucide:message-circle" className='w-11 h-11 text-comment' />
          <span>{props.data.pinglun}评论</span>
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <Icon icon="lucide:bookmark" className='w-11 h-11' />
          <span>{props.data.shouchang}收藏</span>
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <Icon icon="lucide:share-2" className='w-11 h-11 text-success' />
          <span>{props.data.share}分享</span>
        </div>
      </div>
      <div className='flex items-center gap-2 text-[45px] text-muted font-light select-text'>
        <Icon icon="lucide:clock" className='w-11 h-11 text-time' />
        <span>发布于: {props.data.create_time}</span>
      </div>
      <div className='flex items-center gap-2 text-[45px] text-muted font-light select-text'>
        <Icon icon="lucide:maximize" className='w-11 h-11 text-time text-time' />
        <span>图片生成于: {format(new Date(), 'yyyy-MM-dd HH:mm:ss')}</span>
      </div>
    </div>
  )
}

/**
 * 用户信息组件
 */
const UserInfoSection: React.FC<DouyinVideoWorkProps> = (props) => {
  return (
    <div className='flex flex-col gap-12'>
      {/* 头像和用户名/抖音号 */}
      <div className='flex gap-12 items-start'>
        {/* 头像 */}
        <div className='relative shrink-0'>
          <div className='flex justify-center items-center bg-white rounded-full w-35 h-35'>
            <img
              src={props.data.avater_url}
              alt='头像'
              className='rounded-full w-33 h-33 shadow-large'
            />
          </div>
        </div>
        
        {/* 用户名和抖音号 - 纵向排列 */}
        <div className='flex flex-col gap-5'>
          <div className='text-7xl font-bold select-text text-foreground'>
            @{props.data.username}
          </div>
          <div className='flex gap-2 items-center text-4xl text-muted'>
            <Icon icon="lucide:hash" width={32} />
            <span className='select-text'>抖音号: {props.data.抖音号}</span>
            {props.data.cooperation_info?.subscriber_role && (
              <span className='ml-5 px-3 py-1 rounded-xl bg-surface-secondary text-3xl'>{props.data.cooperation_info.subscriber_role}</span>
            )}
          </div>
        </div>
      </div>
      
      {/* 用户统计信息 */}
      <div className='text-3xl flex gap-6 items-center text-foreground/70'>
        <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-surface'>
          <div className='flex gap-1 items-center'>
            <Icon icon="lucide:heart" width={28} className='text-like' />
            <span className='text-muted'>获赞</span>
          </div>
          <div className='w-full h-px bg-border' />
          <span className='select-text font-medium text-4xl'>{props.data.获赞}</span>
        </div>
        <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-surface'>
          <div className='flex gap-1 items-center'>
            <Icon icon="lucide:eye" width={28} className='text-view' />
            <span className='text-muted'>关注</span>
          </div>
          <div className='w-full h-px bg-border' />
          <span className='select-text font-medium text-4xl'>{props.data.关注}</span>
        </div>
        <div className='flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-surface'>
          <div className='flex gap-1 items-center'>
            <Icon icon="lucide:users" width={28} className='text-accent' />
            <span className='text-muted'>粉丝</span>
          </div>
          <div className='w-full h-px bg-border' />
          <span className='select-text font-medium text-4xl'>{props.data.粉丝}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 共创者信息组件
 */
const CoCreatorsInfo: React.FC<{
  info?: DouyinVideoWorkProps['data']['cooperation_info']
  subscriberNickname?: string
}> = ({ info, subscriberNickname }) => {
  const creators = (info?.co_creators ?? []).filter(c => !subscriberNickname || c.nickname !== subscriberNickname)
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
    <div className='flex flex-col pl-16 w-full'>
      <div
        ref={listRef}
        className='flex overflow-hidden gap-8 py-1 pr-2 w-full'
        style={{ scrollbarWidth: 'thin' }}
      >
        {items.slice(0, visibleCount).map((c, idx) => {
          const avatar = c.avatar_url
          return (
            <div
              key={`${c.nickname || 'creator'}-${idx}`}
              className='flex flex-col items-center min-w-42 w-42 shrink-0'
            >
              <div className='flex justify-center items-center bg-white rounded-full w-30 h-30'>
                <img
                  src={avatar}
                  alt='共创者头像'
                  className='object-cover w-28 h-auto rounded-full'
                />
              </div>
              <div className='overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground'>
                {c.nickname || '未提供'}
              </div>
              <div className='overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground/70'>
                {c.role_title || '未提供'}
              </div>
            </div>
          )
        })}

        {items.length > visibleCount && (
          <div className='flex flex-col items-center min-w-38 w-38 shrink-0'>
            <div className='flex justify-center items-center rounded-full bg-surface-secondary w-30 h-30'>
              <span className='text-[42px] leading-none text-muted'>···</span>
            </div>
            <div className='overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground/80'>
              还有{items.length - visibleCount}人
            </div>
            <div className='overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground/70'>
              共创
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 抖音视频作品组件
 */
export const DouyinVideoWork: React.FC<Omit<DouyinVideoWorkProps, 'templateType' | 'templateName'>> = (props) => {
  const coCreatorCount =
    props.data.cooperation_info?.co_creator_nums ??
    (props.data.cooperation_info?.co_creators?.length ?? undefined)

  return (
    <DefaultLayout {...props}>
      <div>
        {/* 头部Logo */}
        <div className='h-15' />
        <DouyinHeader useDarkTheme={props.data.useDarkTheme} />
        <div className='h-15' />

        {/* 视频封面 */}
        <CoverSection imageUrl={props.data.image_url} />
        <div className='h-5' />

        {/* 作品信息 */}
        <InfoSection {...props} />
        <div className='h-25' />

        <div className='flex flex-col gap-10 px-0 pt-25'>
          <div className='w-full'>
            {coCreatorCount && coCreatorCount > 0 && (
              <div className='px-16 pb-8'>
                <div className='gap-2 inline-flex items-center rounded-2xl bg-surface text-foreground/80 px-6 py-3'>
                  <Icon icon="lucide:users" className='w-7 h-7' />
                  <span className='text-3xl font-medium leading-none select-text text-foreground/80'>{coCreatorCount}人共创</span>
                </div>
              </div>
            )}
            <CoCreatorsInfo info={props.data.cooperation_info} subscriberNickname={props.data.username} />
          </div>

          {/* 底部信息区域 */}
          <div className='flex justify-between items-start px-20 pb-20'>
            {/* 左侧：用户信息 */}
            <UserInfoSection {...props} />

            {/* 右侧：二维码 */}
            <div className='flex flex-col items-center gap-4'>
              {props.qrCodeDataUrl
                ? (
                  <img
                    src={props.qrCodeDataUrl}
                    alt='二维码'
                    className='h-auto w-75 rounded-xl'
                  />
                )
                : (
                  <div className='flex justify-center items-center rounded-2xl bg-surface w-100 h-100'>
                    <span className='text-muted'>二维码</span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default DouyinVideoWork
