import { Clock, Hash, Heart, Music, QrCode, UserPlus, Users } from 'lucide-react'
import React from 'react'

import type {
  DouyinMusicInfoProps,
  MusicAuthorInfoProps,
  MusicCoverProps,
  MusicInfoProps,
  MusicQRCodeProps
} from '../../../types/platforms/douyin/musicinfo'
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
          className='object-contain w-full h-full select-text'
        />
      </div>
      <span className='text-[65px] ml-4 text-foreground select-text'>
        记录美好生活
      </span>
    </div>
  )
}

/**
 * 音乐封面组件
 * @param props 组件属性
 * @returns JSX元素
 */
const MusicCoverSection: React.FC<MusicCoverProps> = ({ imageUrl }) => {
  return (
    <div className='flex flex-col items-center my-5'>
      <div className='flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative'>
        <img
          className='rounded-[25px] object-contain w-full h-full select-text'
          src={imageUrl}
          alt='音乐封面'
        />
      </div>
    </div>
  )
}

/**
 * 音乐信息组件
 * @param props 组件属性
 * @returns JSX元素
 */
const MusicInfoSection: React.FC<MusicInfoProps & { desc: string }> = ({ 
  desc, 
  musicId, 
  userCount, 
  createTime
}) => {
  return (
    <div className='flex flex-col px-16 py-5'>
      <div
        className='text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text'
        style={{ letterSpacing: '1.5px', wordWrap: 'break-word' }}
        dangerouslySetInnerHTML={{ __html: desc }}
      />
      <div className='flex flex-col gap-2 text-[45px] text-default-500 font-light mb-2.5'>
        <div className='flex gap-2 items-center select-text'>
          <Music className='w-11 h-11' />
          <span>音乐ID: {musicId}</span>
        </div>
        <div className='flex gap-2 items-center select-text'>
          <Users className='w-11 h-11 text-follow' />
          <span>{userCount} 人使用过</span>
        </div>
      </div>
      <div className='flex items-center gap-2 text-[45px] text-default-500 font-light select-text'>
        <Clock className='w-11 h-11 text-time' />
        <span>图片生成于{createTime}</span>
      </div>
    </div>
  )
}

/**
 * 音乐作者信息组件
 * @param props 组件属性
 * @returns JSX元素
 */
const MusicAuthorInfoSection: React.FC<MusicAuthorInfoProps> = ({
  avatarUrl,
  username,
  userShortId,
  totalFavorited,
  followingCount,
  fans
}) => {
  return (
    <div className='flex flex-col pl-16'>
      <div className='flex items-center mb-6'>
        <img
          src={avatarUrl}
          alt='头像'
          className='w-[200px] h-[200px] rounded-full mr-7 shadow-large select-text'
        />
        <div className='flex flex-col'>
          <span className='text-[80px] font-bold text-foreground select-text'>
            {username}
          </span>
        </div>
      </div>
      <div
        className='flex flex-col text-[35px] mt-6 space-y-1 text-foreground select-text' 
        style={{ letterSpacing: '2.5px' }}
      >
        <div className='flex gap-2 items-center'>
          <Hash className='w-8 h-8' />
          <span>ID: {userShortId}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Heart className='w-8 h-8 text-like' />
          <span>获赞: {totalFavorited}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <UserPlus className='w-8 h-8' />
          <span>关注: {followingCount}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Users className='w-8 h-8 text-follow' />
          <span>粉丝: {fans}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 音乐二维码组件
 * @param props 组件属性
 * @returns JSX元素
 */
const MusicQRCodeSection: React.FC<MusicQRCodeProps> = ({ qrCodeDataUrl }) => {
  return (
    <div className='flex flex-col-reverse items-center -mb-12 mr-18'>
      <div className='flex items-center gap-2 text-[45px] text-right mt-5 text-default-500 select-text'>
        <QrCode className='w-11 h-11' />
        <span>文件直链：永久有效</span>
      </div>
      <div className='p-2.5 rounded-sm border-[7px] border-dashed border-default-300'>
        <img
          src={qrCodeDataUrl}
          alt='二维码'
          className='w-[350px] h-[350px] select-text'
        />
      </div>
    </div>
  )
}

/**
 * 抖音音乐信息组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const DouyinMusicInfo: React.FC<Omit<DouyinMusicInfoProps, 'templateType' | 'templateName'>> = (props) => {
  const { data, qrCodeDataUrl } = props

  return (
    <DefaultLayout {...props}>
      <div>
        <DouyinHeader useDarkTheme={data.useDarkTheme} />

        {/* 音乐封面 */}
        <MusicCoverSection 
          imageUrl={data.image_url} 
          description={data.desc}
          useDarkTheme={data.useDarkTheme}
        />
        <div className='h-[90px]' />

        {/* 音乐信息 */}
        <MusicInfoSection
          desc={data.desc}
          musicId={data.music_id}
          userCount={data.user_count}
          createTime={data.create_time}
          useDarkTheme={data.useDarkTheme}
        />
        <div className='h-[100px]' />

        {/* 底部文字 */}
        <div className='text-[70px] text-right mr-21 -mb-11 z-[-1] text-default-500 select-text'>
          抖音音乐信息
        </div>

        {/* 用户信息和二维码 */}
        <div className='flex justify-between items-center px-0 pt-25'>
          <MusicAuthorInfoSection
            avatarUrl={data.avater_url}
            username={data.username}
            userShortId={data.user_shortid}
            totalFavorited={data.total_favorited}
            followingCount={data.following_count}
            fans={data.fans}
            useDarkTheme={data.useDarkTheme}
          />
          <MusicQRCodeSection
            qrCodeDataUrl={qrCodeDataUrl}
            useDarkTheme={data.useDarkTheme}
          />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default DouyinMusicInfo