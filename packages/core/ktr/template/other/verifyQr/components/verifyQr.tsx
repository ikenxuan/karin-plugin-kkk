import { CircleCheckBig, Globe, ScanLine, ShieldAlert } from 'lucide-react'
import React from 'react'

import { isDark } from '../../../../utils/theme'
import { DefaultLayout } from '../../../components/DefaultLayout'
import { QRCodeWithAvatar } from '../../../components/QRCodeWithAvatar'
import type { PosterProps } from '../../../types/ctx'
import type { VerifyQrData } from './types'

/**
 * 风控验证二维码（弥散信息海报系统）。
 *
 * 视觉中心只有一个 —— 二维码本身；其余元素按「做什么 → 怎么扫 → 扫完怎么办」
 * 三段排布，避免把说明文字铺成正文墙。二维码来自**平台官方页面地址**：
 * 扫码后在手机上完成验证即可，本页不做任何自动过码。
 * @param props 组件属性
 * @returns JSX元素
 */
export const VerifyQr: React.FC<PosterProps<VerifyQrData>> = React.memo((props) => {
  const dark = isDark(props.ctx)
  const platform = props.data.platform ?? ''

  const theme = {
    bg: dark ? '#000000' : '#FFFFFF',
    text: dark ? '#FFFFFF' : '#000000',
    subText: dark ? '#8A8A8E' : '#6B6B70',
    accent: '#FF7A45', // 警示橙：与「验证」语义绑定，不做品牌色
    glow: '#FFB020'
  }

  const steps = [
    { icon: ScanLine, title: '手机扫码', desc: '相机或平台 App 均可' },
    { icon: Globe, title: '完成验证', desc: '在官方页面里手动通过验证' },
    { icon: CircleCheckBig, title: '自动继续', desc: '无需回复，我会自动接着解析' }
  ]

  return (
    <DefaultLayout
      {...props}
      className="relative overflow-hidden"
      style={{ background: theme.bg, color: theme.text }}
    >
      {/* 弥散光斑层：左上主光 + 右下氛围光，只服务空间感 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-45%] left-[-45%] w-500 h-700 rounded-full blur-[220px] opacity-25"
          style={{ background: theme.accent }}
        />
        <div
          className="absolute bottom-[-45%] right-[-45%] w-500 h-700 rounded-full blur-[220px] opacity-20"
          style={{ background: theme.glow }}
        />
      </div>

      {/* 高对比单色杂色层：弥散系统必备，只加质感、不污染正文 */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: dark ? 0.16 : 0.2 }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="verifyNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" result="gray" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#verifyNoise)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center h-full py-36 px-24 space-y-24">
        {/* 状态区 */}
        <div className="w-full max-w-5xl flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 px-6 py-2 rounded-full border border-white/15 bg-surface/40 backdrop-blur-md">
            <ShieldAlert size={26} style={{ color: theme.accent }} />
            <span className="text-[24px] font-medium tracking-[0.2em]" style={{ color: theme.subText }}>
              {platform ? `${platform} · HUMAN CHECK` : 'HUMAN CHECK'}
            </span>
          </div>

          <h1 className="text-8xl font-bold tracking-tight text-center">需要人机验证</h1>

          <p className="text-[26px] opacity-70 text-center max-w-3xl leading-relaxed">
            平台对刚才的请求发起了风控。验证在手机上的官方页面完成，本机器人不做任何自动过码。
          </p>
        </div>

        {/* 主体：左说明 + 右二维码 */}
        <div className="w-full max-w-6xl flex items-center justify-center gap-16 flex-1">
          <div className="flex flex-col gap-10 min-w-0 flex-1 max-w-2xl">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-start gap-8">
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="p-5 rounded-3xl bg-surface/50 backdrop-blur-md border border-white/10">
                    <step.icon size={48} style={{ color: theme.text }} strokeWidth={1.5} />
                  </div>
                  {index < steps.length - 1 && <div className="w-px h-10" style={{ background: `${theme.subText}55` }} />}
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <span className="text-[30px] font-semibold tracking-wide">{step.title}</span>
                  <span className="text-[22px] leading-relaxed opacity-60">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative shrink-0">
            <div
              className="relative p-6"
              style={{ width: '760px', height: '760px' }}
            >
              {props.data.share_url ? (
                <QRCodeWithAvatar
                  value={props.data.share_url}
                  avatarUrl={props.data.avatarUrl}
                  useDarkTheme={dark}
                  alt="验证二维码"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl text-muted">{platform ? '平台未给出验证页地址' : '未提供验证地址'}</span>
                </div>
              )}
            </div>

            {props.data.expiresHint && (
              <p
                className="absolute -bottom-16 left-0 right-0 text-center text-[26px] font-medium tracking-wide flex items-center justify-center gap-3"
                style={{ color: theme.subText }}
              >
                <span className="h-6 w-1.5 rounded-full" style={{ backgroundColor: theme.accent }}></span>
                {props.data.expiresHint}
              </p>
            )}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="w-full max-w-5xl flex items-center gap-6 px-10 py-8 rounded-4xl bg-surface/55 backdrop-blur-md border border-white/20">
          <ShieldAlert size={40} style={{ color: theme.accent }} strokeWidth={1.5} />
          <p className="text-[22px] leading-relaxed opacity-70">
            验证与本次会话绑定：请用同一账号在手机上完成，完成后不要再换 CK；二维码有时效，过期请重新触发一次解析。
          </p>
        </div>
      </div>
    </DefaultLayout>
  )
})

VerifyQr.displayName = 'VerifyQr'

export default VerifyQr