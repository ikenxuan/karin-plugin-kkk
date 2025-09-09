import { Eye, QrCode, Radio, Users } from 'lucide-react'
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
        <div className='flex flex-col items-center overflow-hidden shadow-[0px_10px_20px_0px_#4343434f] rounded-[25px] w-[95%] flex-1 relative'>
          <img
            className='rounded-[25px] object-contain w-full h-full'
            src={imageUrl}
            alt='封面'
          />
          {/* 直播图标覆盖层 */}
          <div className='absolute top-4 left-4'>
            <div className='flex gap-2 items-center px-3 py-2 bg-red-500 bg-opacity-90 rounded-lg'>
              <Radio className='w-6 h-6 text-white' />
              <span className='text-sm font-bold text-white'>直播中</span>
            </div>
          </div>
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
  fans,
  useDarkTheme
}) => {
  return (
    <div className='flex gap-10 items-center pr-20'>
      <img
        src={avater_url}
        alt='头像'
        className='mr-[15px] rounded-full h-auto w-[130px]'
      />
      <div className='flex flex-col items-start'>
        <div className='flex flex-row items-center mb-[5px]'>
          <div className={`text-[60px] ${useDarkTheme ? 'text-[#dddddd]' : 'text-black'
          }`}
          >
            <span>{username}</span>
          </div>
          <div className='w-4' />
          <img
            className='w-[170px] h-auto'
            src='/image/douyin/抖音-直播中.png'
            alt='直播中'
          />
        </div>
        <div className='flex gap-2 items-center'>
          <Users className='w-8 h-8 text-[#808080]' />
          <span className='text-[#808080] text-[35px]'>{fans}粉丝</span>
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
const QRCodeSection: React.FC<DouyinLiveQRCodeProps> = ({ qrCodeDataUrl, useDarkTheme }) => {
  return (
    <div className='flex flex-col-reverse items-center mt-[30px] mr-5'>
      <div className={`flex items-center gap-2 text-[50px] ml-[10px] text-right mr-[10px] ${useDarkTheme ? 'text-[#dbdbdb]' : 'text-[#2f2f2ff9]'
      }`}
      >
        <QrCode className='w-12 h-12' />
        <span>直播分享链接</span>
      </div>
      <div className='p-[10px] rounded-[2%] border-[7px] border-dashed border-default-90'>
        <img
          src={qrCodeDataUrl}
          alt='二维码'
          className='w-[350px]'
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
        <div className='h-[10px]' />
        <div className={`text-[65px] items-center tracking-[1.5px] relative break-words font-bold ${props.data.useDarkTheme ? 'text-[#e7e7e7e7]' : 'text-black'
        }`}
        >
          {props.data.text}
        </div>
        <div className='h-[10px]' />
        <div className='text-[45px] items-center tracking-[1.5px] relative break-words text-[#808080]'>
          {props.data.liveinf}
        </div>
        <div className='flex items-center gap-6 text-[45px] tracking-[1.5px] relative break-words text-[#808080]'>
          <div className='flex gap-2 items-center'>
            <Eye className='w-11 h-11' />
            <span>观看总人数{props.data.总观看次数}</span>
          </div>
          <span>|</span>
          <div className='flex gap-2 items-center'>
            <Users className='w-11 h-11' />
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

        <div className='h-[120px]' />

        {/* 底部区域 */}
        <div className='flex flex-col w-auto h-full'>
          <div className={`w-inherit text-[70px] text-right mr-5 -mb-[45px] z-[-1] ${props.data.useDarkTheme ? 'text-[#dddddd]' : 'text-[#3e3e3e]'
          }`}
          >
            抖音{props.data.dynamicTYPE}
          </div>

          <div className='h-auto flex justify-between pt-[60px] items-center'>
            {/* 用户信息和Logo */}
            <div className='flex flex-col ml-[45px]'>
              <div className='flex flex-col justify-start items-start'>
                <div className={`w-[130%] h-[245px] mb-[52px] bg-cover bg-center bg-fixed ${props.data.useDarkTheme ? 'bg-[url(/image/douyin/dylogo-light.svg)]' : 'bg-[url(/image/douyin/dylogo-dark.svg)]'
                }`}
                />
                <div className='flex flex-col items-start'>
                  <div className={`text-[50px] tracking-[10px] ${props.data.useDarkTheme ? 'text-[#dddddd]' : 'text-[#212121]'
                  }`}
                  >
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
