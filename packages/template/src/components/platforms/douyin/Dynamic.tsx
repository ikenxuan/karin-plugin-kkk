import { Bookmark, Clock, Eye, Hash, Heart, MessageCircle, QrCode, Share2, Users } from 'lucide-react'
import React from 'react'

import type {
  DouyinDynamicProps,
  DouyinDynamicQRCodeProps,
  DouyinDynamicUserInfoProps
} from '../../../types/platforms/douyin'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 抖音Logo头部组件
 * @param props 组件属性
 * @returns JSX元素
 */
const DouyinHeader: React.FC<{ useDarkTheme?: boolean }> = ({ useDarkTheme }) => {
  return (
    <div className='flex items-center px-12 py-15'>
      <div className='w-[39%] h-[200px] bg-cover bg-center bg-fixed'>
        <img
          src={useDarkTheme ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
          alt='抖音Logo'
          className='object-contain w-full h-full'
        />
      </div>
      <span className='text-[65px] ml-4 text-foreground-600'>
        记录美好生活
      </span>
    </div>
  )
}

/**
 * 作品封面组件
 * @param props 组件属性
 * @returns JSX元素
 */
const CoverSection: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <div className='flex flex-col items-center my-5'>
      <div className='flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative'>
        <img
          className='rounded-[25px] object-contain w-full h-full'
          src={imageUrl}
          alt='封面'
        />
      </div>
    </div>
  )
}

/**
 * 作品信息组件
 * @param props 组件属性
 * @returns JSX元素
 */
const InfoSection: React.FC<{
  desc: string
  dianzan: string
  pinglun: string
  shouchang: string
  share: string
  createTime: string
  useDarkTheme?: boolean
}> = ({ desc, dianzan, pinglun, shouchang, share, createTime }) => {
  return (
    <div className='flex flex-col px-16 py-5'>
      <div
        className='text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text'
        style={{ letterSpacing: '1.5px', wordWrap: 'break-word' }}
        dangerouslySetInnerHTML={{ __html: desc }}
      />
      <div className='flex items-center gap-6 text-[45px] text-foreground-500 font-light mb-2.5 select-text'>
        <div className='flex gap-2 items-center'>
          <Heart className='w-11 h-11 text-like' />
          <span>{dianzan}点赞</span>
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <MessageCircle className='w-11 h-11 text-comment' />
          <span>{pinglun}评论</span>
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <Bookmark className='w-11 h-11' />
          <span>{shouchang}收藏</span>
        </div>
        <span>·</span>
        <div className='flex gap-2 items-center'>
          <Share2 className='w-11 h-11 text-success' />
          <span>{share}分享</span>
        </div>
      </div>
      <div className='flex items-center gap-2 text-[45px] text-foreground-500 font-light select-text'>
        <Clock className='w-11 h-11 text-time' />
        <span>发布于{createTime}</span>
      </div>
    </div>
  )
}

/**
 * 用户信息组件
 * @param props 组件属性
 * @returns JSX元素
 */
const UserInfoSection: React.FC<DouyinDynamicUserInfoProps & { coCreatorCount?: number }> = ({
  avater_url,
  username,
  douyinId,
  likes,
  following,
  followers,
  coCreatorCount
}) => {
  return (
    <div className='flex flex-col pl-16'>
      <div className='flex items-center mb-6'>
        <div className='flex justify-center items-center mr-7 bg-white rounded-full w-54 h-54'>
          <img
            src={avater_url}
            alt='头像'
            className='rounded-full w-51 h-51 shadow-large'
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-[80px] font-bold text-foreground-700 select-text'>
            @{username}
          </span>
          {coCreatorCount && coCreatorCount > 0 && (
            <div className='gap-2 mt-3 inline-flex items-center rounded-[20px] bg-foreground-200 text-foreground-700 px-6 py-3 self-start'>
              <Users className='w-8 h-8' />
              <span className='text-[34px] leading-none select-text text-foreground-700'>{coCreatorCount}人共创</span>
            </div>
          )}
        </div>
      </div>
      <div
        className='flex flex-col text-[35px] mt-6 space-y-1 text-foreground-600 select-text' 
        style={{ letterSpacing: '2.5px' }}
      >
        <div className='flex gap-2 items-center'>
          <Hash className='w-8 h-8' />
          <span>抖音号: {douyinId}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Heart className='w-8 h-8 text-like' />
          <span>获赞: {likes}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Eye className='w-8 h-8 text-view' />
          <span>关注: {following}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Users className='w-8 h-8 text-follow' />
          <span>粉丝: {followers}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 二维码组件
 * @param props 组件属性
 * @returns JSX元素
 */
// 组件：QRCodeSection
const QRCodeSection: React.FC<DouyinDynamicQRCodeProps> = ({ qrCodeDataUrl }) => {
  return (
    <div className='flex flex-col items-center w-[420px] mr-18'>
      <div className='p-2.5 rounded-sm border-[7px] border-dashed border-divider'>
        <img
          src={qrCodeDataUrl}
          alt='二维码'
          className='w-[350px] h-[350px]'
        />
      </div>
      <div className='flex items-center gap-3 text-[40px] text-foreground-500 mt-5 select-text'>
        <QrCode className='w-10 h-10' />
        <span className='whitespace-nowrap'>作品直链：永久有效</span>
      </div>
    </div>
  )
}

/** 共创者信息 */
const CoCreatorsInfo: React.FC<{
  info?: DouyinDynamicProps['data']['cooperation_info']
}> = ({ info }) => {
  const creators = info?.co_creators ?? []
  if (creators.length === 0) return null

  const items = creators.slice(0, 50)

  // 根据容器宽度，计算可显示的条目数；剩余用省略占位符
  const listRef = React.useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = React.useState(items.length)

  React.useEffect(() => {
    const calc = () => {
      const el = listRef.current
      if (!el) return
      const containerWidth = el.offsetWidth

      // 每项宽度120px，间距gap-8=32px，右内边距pr-2=8px
      const ITEM_W = 120
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
          const avatar =
            c.avatar_thumb?.url_list[0]
          return (
            <div
              key={`${c.nickname || 'creator'}-${idx}`}
              className='flex flex-col items-center min-w-[120px] w-[120px] flex-shrink-0'
            >
              <div className='flex justify-center items-center bg-white rounded-full h-21 w-21'>
                <img
                  src={avatar}
                  alt='共创者头像'
                  className='object-cover w-20 h-20 rounded-full'
                />
              </div>
              <div className='mt-2 text-[30px] font-medium text-foreground-700 text-center leading-tight w-full overflow-hidden whitespace-nowrap truncate select-text'>
                {c.nickname || '未提供'}
              </div>
              <div className='text-[26px] text-foreground-600 text-center leading-tight w-full overflow-hidden whitespace-nowrap truncate select-text'>
                {c.role_title || '未提供'}
              </div>
            </div>
          )
        })}

        {items.length > visibleCount && (
          <div className='flex flex-col items-center min-w-[120px] w-[120px] flex-shrink-0'>
            <div className='flex justify-center items-center bg-white rounded-full h-21 w-21'>
              <span className='text-[42px] leading-none text-foreground-500'>···</span>
            </div>
            <div className='mt-2 text-[26px] text-foreground-600 text-center leading-tight w-full overflow-hidden whitespace-nowrap truncate select-text'>
              {`还有${items.length - visibleCount}人`}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


/**
 * 抖音动态组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const DouyinDynamic: React.FC<Omit<DouyinDynamicProps, 'templateType' | 'templateName'>> = (props) => {
  const { data, qrCodeDataUrl } = props
  const coCreatorCount =
    data.cooperation_info?.co_creator_nums ??
    (data.cooperation_info?.co_creators?.length ?? undefined)

  return (
    <DefaultLayout {...props}>
      <div>
        {/* 头部Logo */}
        <div className='h-[60px]' />
        <DouyinHeader useDarkTheme={data.useDarkTheme} />
        <div className='h-[60px]' />

        {/* 封面 */}
        <CoverSection imageUrl={data.image_url} />
        <div className='h-[20px]' />

        {/* 作品信息 */}
        <InfoSection
          desc={data.desc}
          dianzan={data.dianzan}
          pinglun={data.pinglun}
          shouchang={data.shouchang}
          share={data.share}
          createTime={data.create_time}
          useDarkTheme={data.useDarkTheme}
        />
        <div className='h-[100px]' />

        <div className='flex flex-col gap-10 px-0 pt-25'>
          <div className='w-full'>
            <CoCreatorsInfo info={data.cooperation_info} />
          </div>

          <div className='flex justify-between items-start'>
            <div className='flex flex-col gap-8 items-start w-[960px]'>
              <UserInfoSection
                avater_url={data.avater_url}
                username={data.username}
                douyinId={data.抖音号}
                likes={data.获赞}
                following={data.关注}
                followers={data.粉丝}
                useDarkTheme={data.useDarkTheme}
                coCreatorCount={coCreatorCount}
              />
            </div>
            <QRCodeSection
              qrCodeDataUrl={qrCodeDataUrl}
              useDarkTheme={data.useDarkTheme}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default DouyinDynamic