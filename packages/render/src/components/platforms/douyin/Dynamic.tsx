import React from 'react'
import type {
  DouyinDynamicProps,
  DouyinDynamicUserInfoProps,
  DouyinDynamicQRCodeProps
} from '../../../types/douyin'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { Heart, MessageCircle, Bookmark, Share2, Clock, Hash, Eye, Users, QrCode } from 'lucide-react'

/**
 * 抖音Logo头部组件
 * @param props 组件属性
 * @returns JSX元素
 */
const DouyinHeader: React.FC<{ useDarkTheme?: boolean }> = ({ useDarkTheme }) => {
  return (
    <div className="flex items-center px-12 py-15">
      <div className="w-[39%] h-[200px] bg-cover bg-center bg-fixed">
        <img
          src={useDarkTheme ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
          alt="抖音Logo"
          className="object-contain w-full h-full"
        />
      </div>
      <span className={`text-[65px] ml-4 ${
        useDarkTheme ? 'text-[#d3d3d3]' : 'text-[#3e3e3eb8]'
      }`}>
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
    <div className="flex flex-col items-center my-5">
      <div className="flex flex-col items-center overflow-hidden shadow-[0px_10px_20px_0px_#4343434f] rounded-[25px] w-[90%] relative">
        <img
          className="rounded-[25px] object-contain w-full h-full"
          src={imageUrl}
          alt="封面"
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
}> = ({ desc, dianzan, pinglun, shouchang, share, createTime, useDarkTheme }) => {
  return (
    <div className="flex flex-col px-16 py-5">
      <div className={`text-[70px] font-bold leading-relaxed mb-9 ${
        useDarkTheme ? 'text-[#e9e9e9]' : 'text-black'
      }`} 
           style={{ letterSpacing: '1.5px', wordWrap: 'break-word' }}
           dangerouslySetInnerHTML={{ __html: desc }}
      />
      <div className="flex items-center gap-6 text-[45px] text-[#808080] font-light mb-2.5">
        <div className="flex gap-2 items-center">
          <Heart className="w-11 h-11" />
          <span>{dianzan}点赞</span>
        </div>
        <span>·</span>
        <div className="flex gap-2 items-center">
          <MessageCircle className="w-11 h-11" />
          <span>{pinglun}评论</span>
        </div>
        <span>·</span>
        <div className="flex gap-2 items-center">
          <Bookmark className="w-11 h-11" />
          <span>{shouchang}收藏</span>
        </div>
        <span>·</span>
        <div className="flex gap-2 items-center">
          <Share2 className="w-11 h-11" />
          <span>{share}分享</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[45px] text-[#808080] font-light">
        <Clock className="w-11 h-11" />
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
const UserInfoSection: React.FC<DouyinDynamicUserInfoProps> = ({
  avater_url,
  username,
  douyinId,
  likes,
  following,
  followers,
  useDarkTheme
}) => {
  return (
    <div className="flex flex-col pl-16">
      <div className="flex items-center mb-6">
        <img
          src={avater_url}
          alt="头像"
          className="w-[200px] h-[200px] rounded-full mr-7 shadow-[0px_10px_20px_0px_#4343434f]"
        />
        <div className="flex flex-col">
          <span className={`text-[80px] font-bold ${
            useDarkTheme ? 'text-[#ededed]' : 'text-[#606060]'
          }`}>
            {username}
          </span>
        </div>
      </div>
      <div className={`flex flex-col text-[35px] mt-6 space-y-1 ${
        useDarkTheme ? 'text-[#d1d1d1]' : 'text-[#2f2f2f]'
      }`} style={{ letterSpacing: '2.5px' }}>
        <div className="flex gap-2 items-center">
          <Hash className="w-8 h-8" />
          <span>抖音号: {douyinId}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Heart className="w-8 h-8" />
          <span>获赞: {likes}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Eye className="w-8 h-8" />
          <span>关注: {following}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Users className="w-8 h-8" />
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
const QRCodeSection: React.FC<DouyinDynamicQRCodeProps> = ({ qrCodeDataUrl }) => {
  return (
    <div className="flex flex-col-reverse items-center -mb-12 mr-18">
      <div className="flex items-center gap-2 text-[45px] text-right mt-5 text-default-90">
        <QrCode className="w-11 h-11" />
        <span>作品直链：永久有效</span>
      </div>
      <div className="p-2.5 rounded-sm border-[7px] border-dashed border-default-90">
        <img
          src={qrCodeDataUrl}
          alt="二维码"
          className="w-[350px] h-[350px]"
        />
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

  return (
    <DefaultLayout {...props}>
      <div>
        {/* 头部Logo */}
        <div className="h-[60px]"></div>
        <DouyinHeader useDarkTheme={data.useDarkTheme} />
        <div className="h-[60px]"></div>
        
        {/* 封面 */}
        <CoverSection imageUrl={data.image_url} />
        <div className="h-[20px]"></div>
        
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
        <div className="h-[100px]"></div>
        
        {/* 底部文字 */}
        <div className='text-[70px] text-right mr-21 -mb-11 z-[-1] text-default-90 '>
          抖音作品推送
        </div>
        
        {/* 用户信息和二维码 */}
        <div className="flex justify-between items-center px-0 py-25">
          <UserInfoSection
            avater_url={data.avater_url}
            username={data.username}
            douyinId={data.抖音号}
            likes={data.获赞}
            following={data.关注}
            followers={data.粉丝}
            useDarkTheme={data.useDarkTheme}
          />
          <QRCodeSection
            qrCodeDataUrl={qrCodeDataUrl}
            useDarkTheme={data.useDarkTheme}
          />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default DouyinDynamic