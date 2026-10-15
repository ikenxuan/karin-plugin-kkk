import { SiXiaohongshu } from '@icons-pack/react-simple-icons'
import { ScanLine, ShieldCheck, UserRound } from 'lucide-react'
import React from 'react'
import { RiArrowRightFill } from 'react-icons/ri'

import { isDark } from '../../../../utils/theme'
import { DefaultLayout } from '../../../components/DefaultLayout'
import { QRCodeWithAvatar } from '../../../components/QRCodeWithAvatar'
import type { PosterProps } from '../../../types/ctx'
import type { XiaohongshuQrcodeImgData } from './types'

/**
 * 小红书二维码登录组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const XiaohongshuQrcodeImg: React.FC<PosterProps<XiaohongshuQrcodeImgData>> = React.memo((props) => {
  const dark = isDark(props.ctx)

  const theme = {
    bg: dark ? '#000000' : '#FFFFFF',
    text: dark ? '#FFFFFF' : '#000000',
    subText: dark ? '#888888' : '#666666',
    accent: '#FF2442' // 小红书红
  }

  return (
    <DefaultLayout
      {...props}
      className="relative overflow-hidden"
      style={{
        background: theme.bg,
        color: theme.text
      }}
    >
      {/* 弥散模糊：右上主光 + 左下氛围光 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-40%] right-[-50%] w-400 h-600 rounded-full blur-[200px] opacity-25"
          style={{ background: theme.accent }}
        />
        <div
          className="absolute bottom-[-40%] left-[-50%] w-400 h-600 rounded-full blur-[200px] opacity-20"
          style={{ background: '#FF8A9B' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full py-40 px-24 space-y-32">
        {/* 标题区 */}
        <div className="text-center space-y-12">
          <h1 className="text-8xl font-bold tracking-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${theme.text}, ${theme.subText})` }}
            >
              小红书扫码登录
            </span>
          </h1>

          {/* 操作步骤 */}
          <div className="flex items-start justify-center gap-10 opacity-90" style={{ color: theme.text }}>
            <div className="flex flex-col items-center gap-4">
              <div className="p-5 rounded-3xl bg-surface/50 backdrop-blur-md">
                <SiXiaohongshu size={64} />
              </div>
              <span className="text-[28px] font-medium tracking-wide">打开小红书</span>
            </div>
            <RiArrowRightFill size={40} className="mt-8 opacity-40" />
            <div className="flex flex-col items-center gap-4">
              <div className="p-5 rounded-3xl bg-surface/50 backdrop-blur-md">
                <UserRound size={64} />
              </div>
              <span className="text-[28px] font-medium tracking-wide">右下角「我」</span>
            </div>
            <RiArrowRightFill size={40} className="mt-8 opacity-40" />
            <div className="flex flex-col items-center gap-4">
              <div className="p-5 rounded-3xl bg-surface/50 backdrop-blur-md">
                <ScanLine size={64} />
              </div>
              <span className="text-[28px] font-medium tracking-wide">顶部扫一扫</span>
            </div>
          </div>
        </div>

        {/* 二维码 */}
        <div className="relative group">
          <div className="relative p-4" style={{ width: '800px', height: '800px' }}>
            {props.data.share_url ? (
              <QRCodeWithAvatar
                value={props.data.share_url}
                avatarUrl={props.data.avatarUrl}
                useDarkTheme={dark}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-8">
                <div className="w-24 h-24 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: theme.accent }} />
                <span className="text-3xl text-muted">未提供二维码图片</span>
              </div>
            )}
          </div>

          <div className="absolute -bottom-24 left-0 right-0 text-center">
            <p className="text-[28px] font-medium tracking-wide flex items-center justify-center gap-3" style={{ color: theme.subText }}>
              <span className="h-6 w-1.5 rounded-full" style={{ backgroundColor: theme.accent }}></span>
              此二维码 3 分钟内有效，请及时扫码登录。
            </p>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="w-full max-w-4xl pt-20">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-2">
              <ShieldCheck size={64} style={{ color: theme.text }} strokeWidth={1.5} />
            </div>
            <h3 className="text-[40px] font-bold" style={{ color: theme.text }}>
              安全承诺
            </h3>
            <p className="text-[24px] leading-relaxed opacity-60 max-w-3xl" style={{ color: theme.text }}>
              扫码只会把小红书网页端的登录凭证（ck）保存在本机配置里，用于请求小红书官方接口；不会上传到任何第三方。请在可信环境下使用。
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
})

XiaohongshuQrcodeImg.displayName = 'XiaohongshuQrcodeImg'

export default XiaohongshuQrcodeImg