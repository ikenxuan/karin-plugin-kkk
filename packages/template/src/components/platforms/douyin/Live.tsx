import { Eye, QrCode, Users } from 'lucide-react'
import React from 'react'

import type {
  DouyinLiveProps,
  DouyinLiveQRCodeProps,
  DouyinLiveUserInfoProps
} from '../../../types/platforms/douyin'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 直播封面组件
 * @param props 组件属性
 * @returns JSX元素
 */
const CoverSection: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <div className='py-10'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[95%] flex-1 relative'>
          <img
            className='rounded-[25px] object-contain w-full h-full select-text'
            src={imageUrl}
            alt='封面'
          />
        </div>
      </div>
    </div>
  )
}

/**
 * 用户信息组件
 * @param props 组件属性
 * @returns JSX元素
 */
const UserInfoSection: React.FC<DouyinLiveUserInfoProps> = ({
  avater_url,
  username,
  fans
}) => {
  return (
    <div className='flex gap-10 items-center pr-20'>
      <img
        src={avater_url}
        alt='头像'
        className='mr-3.75 rounded-full h-auto w-32.5 select-text'
      />
      <div className='flex flex-col items-start'>
        <div className='flex flex-row items-center mb-1.25'>
          <div className='text-[60px] text-foreground select-text'>
            <span>{username}</span>
          </div>
          <div className='w-4' />
          <img
            className='w-42.5 h-auto select-text'
            src='/image/douyin/抖音-直播中.png'
            alt='直播中'
          />
        </div>
        <div className='flex gap-2 items-center'>
          <Users className='w-8 h-8 text-follow' />
          <span className='text-default-500 text-[35px] select-text'>{fans}粉丝</span>
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
const QRCodeSection: React.FC<DouyinLiveQRCodeProps> = ({ qrCodeDataUrl }) => {
  return (
    <div className='flex flex-col-reverse items-center mt-7.5 mr-5'>
      <div className='flex items-center gap-2 text-[50px] ml-2.5 text-right mr-2.5 text-foreground select-text'>
        <QrCode className='w-12 h-12' />
        <span>直播分享链接</span>
      </div>
      <div className='p-2.5 rounded-[2%] border-[7px] border-dashed border-default-300'>
        <img
          src={qrCodeDataUrl}
          alt='二维码'
          className='w-87.5 select-text'
        />
      </div>
    </div>
  )
}

/**
 * 抖音直播组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const DouyinLive: React.FC<Omit<DouyinLiveProps, 'templateType' | 'templateName'>> = (props) => {
  const { qrCodeDataUrl } = props

  return (
    <DefaultLayout {...props}>
      {/* 封面区域 */}
      <CoverSection imageUrl={props.data.image_url} />

      {/* 信息区域 */}
      <div className='flex flex-col px-20'>
        <div className='h-2.5' />
        <div className='text-[65px] items-center tracking-[1.5px] relative wrap-break-word font-bold text-foreground select-text'>
          {props.data.text}
        </div>
        <div className='h-2.5' />
        <div className='text-[45px] items-center tracking-[1.5px] relative wrap-break-word text-default-500 select-text'>
          {props.data.liveinf}
        </div>
        <div className='flex items-center gap-6 text-[45px] tracking-[1.5px] relative wrap-break-word text-default-500 select-text'>
          <div className='flex gap-2 items-center'>
            <Eye className='w-11 h-11 text-view' />
            <span>观看总人数{props.data.总观看次数}</span>
          </div>
          <span>|</span>
          <div className='flex gap-2 items-center'>
            <Users className='w-11 h-11 text-follow' />
            <span>在线观众{props.data.在线观众}</span>
          </div>
        </div>
        <div className='h-20' />

        {/* 用户信息 */}
        <UserInfoSection
          avater_url={props.data.avater_url}
          username={props.data.username}
          fans={props.data.fans}
          useDarkTheme={props.data.useDarkTheme}
        />

        <div className='h-30' />

        {/* 底部区域 */}
        <div className='flex flex-col w-auto h-full'>
          <div className='w-inherit text-[70px] text-right mr-5 -mb-11.25 z-[-1] text-foreground select-text'>
            抖音{props.data.dynamicTYPE}
          </div>

          <div className='h-auto flex justify-between pt-15 items-center'>
            {/* 用户信息和Logo */}
            <div className='flex flex-col ml-11.25'>
              <div className='flex flex-col justify-start items-start'>
                <div 
                  className='w-[130%] h-61.25 mb-13 bg-cover bg-center bg-fixed'
                  style={{
                    backgroundImage: `url(/image/douyin/${props.data.useDarkTheme ? 'dylogo-light' : 'dylogo-dark'}.svg)`
                  }}
                />
                <div className='flex flex-col items-start'>
                  <div className='text-[50px] tracking-[10px] text-foreground select-text'>
                    抖音 记录美好生活
                  </div>
                </div>
              </div>
            </div>

            {/* 二维码区域 */}
            <QRCodeSection qrCodeDataUrl={qrCodeDataUrl} useDarkTheme={props.data.useDarkTheme} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default DouyinLive