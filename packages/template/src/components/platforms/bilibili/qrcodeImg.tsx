import { Clock, QrCode, Shield } from 'lucide-react'
import React from 'react'

import type { BilibiliQrcodeImgProps } from '../../../types/platforms/bilibili'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { EnhancedImage } from './shared'  

/**
 * B站二维码登录组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const BilibiliQrcodeImg: React.FC<BilibiliQrcodeImgProps> = React.memo((props) => {
  const { data, qrCodeDataUrl } = props
  const { share_url } = data

  const disclaimer = [
    '免责声明:',
    '您将通过扫码完成获取哔哩哔哩网页端的用户登录凭证（ck），该ck将用于请求哔哩哔哩WEB API接口。',
    '本BOT不会上传任何有关你的信息到第三方，所配置的 ck 只会用于请求官方 API 接口。',
    '我方仅提供视频解析及相关哔哩哔哩内容服务,若您的账号封禁、被盗等处罚与我方无关。',
    '害怕风险请勿扫码 ~'
  ].join('\n')

  return (
    <DefaultLayout {...props}>
      <div className='p-4 px-12 pt-24'>
        {/* 顶部标题与提示 */}
        <div className='flex flex-col gap-6 items-center text-center'>
          <div className='flex gap-4 items-center'>
            <QrCode className='w-12 h-12 text-foreground-600' />
            <h1 className='text-6xl font-bold text-foreground'>B站扫码登录</h1>
          </div>

          <div className='flex gap-3 items-center text-3xl text-default-600'>
            <Clock className='w-8 h-8' />
            <span>请在120秒内通过哔哩哔哩APP扫码进行登录</span>
          </div>
        </div>

        <div className='h-12' />

        {/* 二维码区域 */}
        <div className='flex flex-col items-center'>
          <div className='flex overflow-hidden flex-col justify-center items-center p-12'>
            {qrCodeDataUrl ? (
              <div className='flex justify-center items-center w-120 h-120'>
                <EnhancedImage
                  src={qrCodeDataUrl}
                  alt='登录二维码'
                  className='object-contain w-full h-full'
                />
              </div>
            ) : (
              <div className='flex flex-col gap-4 justify-center items-center w-120 h-120'>
                <QrCode className='w-16 h-16 text-default-500' />
                <span className='text-2xl text-default-500'>未提供二维码图片</span>
              </div>
            )}

            {/* share_url 展示 */}
            <div className='mt-8 w-full'>
              <div className='text-3xl font-medium text-foreground-600'>链接（share_url）</div>
              <pre className='overflow-auto p-6 mt-3 text-2xl leading-relaxed whitespace-pre-wrap break-all rounded-2xl select-text bg-content2 text-foreground-700'>
                {share_url}
              </pre>
            </div>
          </div>
        </div>

        <div className='h-10' />

        {/* 免责声明 */}
        <div className='p-8 rounded-3xl border-2 shadow-lg bg-warning-50 border-warning-200'>
          <h3 className='flex gap-4 items-center mb-6 text-4xl font-semibold text-warning-700'>
            <Shield className='w-10 h-10 text-warning-600' />
            注意事项与免责声明
          </h3> 
          <div className='space-y-4'>
            {disclaimer.split('\n').map((line, index) => (
              <p 
                key={index} 
                className={`text-2xl leading-relaxed ${
                  index === 0 
                    ? 'font-semibold text-warning-700'
                    : 'text-foreground-600'
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
})

BilibiliQrcodeImg.displayName = 'BilibiliQrcodeImg'

export default BilibiliQrcodeImg