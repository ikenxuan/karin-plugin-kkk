import { SiApple, SiHuawei, SiOneplus, SiOppo, SiSamsung, SiVivo } from '@icons-pack/react-simple-icons'
import { ArrowRight, CircleDashed, X } from 'lucide-react'
import React from 'react'

import { isDark } from '../../../../utils/theme'
import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterProps } from '../../../types/ctx'
import type { LivePhotoTipData } from './types'

/**
 * Google Photos 彩色官方 Logo（渐变版）。
 * 原 SVG 用 <style> + .cls-* 挂渐变，类名会泄漏到整份文档，这里改成 fill 直接引用；
 * 渐变 id 也加了前缀，避免同页多个 logo 互相抢 id。
 */
const GooglePhotosIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 350 350" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient
        id="gpGreen"
        cx="173.161"
        cy="178.716"
        fx="239.836"
        fy="36.176"
        r="170.886"
        gradientTransform="translate(0 -7.272) scale(1 1.041)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".469" stopColor="#7acaff" />
        <stop offset=".828" stopColor="#00b054" />
      </radialGradient>
      <radialGradient
        id="gpYellow"
        cx="173.161"
        cy="178.716"
        fx="239.836"
        fy="36.176"
        r="170.886"
        gradientTransform="translate(357.272) rotate(90) scale(1 1.041)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".545" stopColor="#fded1c" />
        <stop offset=".828" stopColor="#feca01" />
      </radialGradient>
      <radialGradient
        id="gpRed"
        cx="173.161"
        cy="178.716"
        fx="239.836"
        fy="36.176"
        r="170.886"
        gradientTransform="translate(350 357.272) rotate(-180) scale(1 1.041)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".469" stopColor="#ff81d0" />
        <stop offset=".828" stopColor="#ff4041" />
      </radialGradient>
      <radialGradient
        id="gpBlue"
        cx="173.161"
        cy="178.716"
        fx="239.836"
        fy="36.176"
        r="170.886"
        gradientTransform="translate(-7.272 350) rotate(-90) scale(1 1.041)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".469" stopColor="#aaa7ff" />
        <stop offset=".828" stopColor="#2f89ff" />
      </radialGradient>
    </defs>
    <path fill="url(#gpGreen)" d="M79.6,262.5c0-48.3,39.2-87.5,87.5-87.5h7.9v167.1c0,4.4-3.6,7.9-7.9,7.9-48.3,0-87.5-39.2-87.5-87.5Z" />
    <path fill="url(#gpYellow)" d="M87.5,79.6c48.3,0,87.5,39.2,87.5,87.5h0v7.9H7.9c-4.4,0-7.9-3.6-7.9-7.9,0-48.3,39.2-87.5,87.5-87.5Z" />
    <path fill="url(#gpRed)" d="M270.4,87.5c0,48.3-39.2,87.5-87.5,87.5h-7.9V7.9c0-4.4,3.6-7.9,7.9-7.9,48.3,0,87.5,39.2,87.5,87.5Z" />
    <path fill="url(#gpBlue)" d="M262.5,270.4c-48.3,0-87.5-39.2-87.5-87.5h0v-7.9h167.1c4.4,0,7.9,3.6,7.9,7.9,0,48.3-39.2,87.5-87.5,87.5Z" />
  </svg>
)

/**
 * 小米官方 Logo（橙色实心圆角方块 + 白色 mi）。
 * 原 SVG 用 <style> + .st0/.st1 上色、且 path 数据里混着 &#xA;&#x9; 换行实体，一并清掉。
 */
const XiaomiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 112 112" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#FF6900"
      d="M100.3,11.7C89.8,1.2,74.6,0,56,0C37.4,0,22.2,1.2,11.6,11.7C1.1,22.3,0,37.5,0,56.1c0,18.6,1.1,33.8,11.6,44.3C22.2,110.9,37.4,112,56,112s33.8-1.1,44.4-11.6C110.9,89.8,112,74.6,112,56.1C112,37.5,110.9,22.3,100.3,11.7L100.3,11.7z"
    />
    <path
      fill="#FFFFFF"
      d="M88.9,34.6c0.4,0,0.7,0.3,0.7,0.7v41.5c0,0.4-0.3,0.7-0.7,0.7h-9.1c-0.4,0-0.7-0.3-0.7-0.7V35.3c0-0.4,0.3-0.7,0.7-0.7H88.9z"
    />
    <path
      fill="#FFFFFF"
      d="M49.4,34.6c6.9,0,14,0.3,17.6,3.9c3.5,3.5,3.9,10.4,3.9,17.2l0,21.2c0,0.4-0.3,0.7-0.7,0.7H61c-0.4,0-0.7-0.3-0.7-0.7V55.2c0-3.8-0.2-7.6-2.2-9.6c-1.7-1.7-4.8-2.1-8-2.1H33.7c-0.4,0-0.7,0.3-0.7,0.7v32.6c0,0.4-0.3,0.7-0.7,0.7h-9.1c-0.4,0-0.7-0.3-0.7-0.7V35.3c0-0.4,0.3-0.7,0.7-0.7H49.4z"
    />
    <path
      fill="#FFFFFF"
      d="M51.4,51.1c0.4,0,0.7,0.3,0.7,0.7v25c0,0.4-0.3,0.7-0.7,0.7h-9.6c-0.4,0-0.7-0.3-0.7-0.7v-25c0-0.4,0.3-0.7,0.7-0.7H51.4z"
    />
  </svg>
)

/**
 * 荣耀官方字标。本身是单色路径，用 currentColor 跟随明暗主题
 */
const HonorIcon: React.FC<{ className?: string; color?: string }> = ({ className, color }) => (
  <svg className={className} viewBox="1.4 2 109.2 21" xmlns="http://www.w3.org/2000/svg" style={{ color: color }} fill="currentColor">
    <path d="M13.237 2.276v8.295H5.071V2.276H1.4v20.465h3.671v-8.524h8.166v8.524h3.671V2.276zM98.19 5.922h4.087c1.677 0 3.035 1.349 3.035 3.013a3.024 3.024 0 0 1-3.035 3.014H98.19zm-3.669-3.646v20.465h3.67v-9.107l7.641 9.107h4.77l-6.263-7.46c3.144-1 5.088-4.12 4.585-7.359s-3.304-5.634-6.604-5.646h-7.805zm-34.718-.061v12.77l-8.911-12.77H47.96v20.463h3.672V9.85l8.955 12.829h2.882V2.215zm-34.27 10.28c.002-3.785 3.093-6.852 6.904-6.851 3.812.002 6.9 3.071 6.899 6.856s-3.09 6.853-6.902 6.853c-1.831 0-3.586-.722-4.88-2.007s-2.021-3.029-2.021-4.847zm-3.671.004c0 4.248 2.575 8.076 6.526 9.702 3.951 1.625 8.498.728 11.522-2.275s3.929-7.519 2.292-11.443c-1.636-3.924-5.492-6.482-9.768-6.482-5.836.001-10.567 4.698-10.57 10.495zm50.234-.004c.002-3.785 3.093-6.853 6.905-6.851s6.899 3.072 6.897 6.857c-.001 3.785-3.092 6.853-6.904 6.851-1.83 0-3.585-.722-4.88-2.007s-2.021-3.029-2.021-4.847zm-3.674.004c-.001 4.248 2.575 8.076 6.525 9.702 3.951 1.625 8.499.728 11.522-2.275s3.93-7.519 2.292-11.443c-1.636-3.924-5.491-6.482-9.768-6.482-5.836.001-10.568 4.698-10.571 10.495z" />
  </svg>
)

/**
 * 手机品牌 Logo 统一装进同尺寸圆角方块。
 * 图标（Google / 小米 / 一加）与字标（三星 / OPPO / 华为 / 荣耀）的宽高比差了好几倍，
 * 只有靠等大的容器才能把它们的视觉重量拉平，眼睛才读得出节奏。
 */
function BrandTile({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center w-39 h-39 rounded-[46px] backdrop-blur-md"
      style={{
        backgroundColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.55)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.05)'}`
      }}
    >
      {children}
    </div>
  )
}

/**
 * 实况图提示组件 - 手机端阅读优先：大字号、极简层级；背景走 kkk-design 的弥散信息海报系统
 */
export const LivePhotoTip: React.FC<PosterProps<LivePhotoTipData>> = React.memo((props) => {
  const dark = isDark(props.ctx)

  const fg = dark ? '#ffffff' : '#0a0a0a'
  const muted = dark ? 'rgba(255,255,255,0.52)' : 'rgba(0,0,0,0.52)'
  const faint = dark ? 'rgba(255,255,255,0.32)' : 'rgba(0,0,0,0.34)'

  const title = props.data?.title ?? '实况照片已生成'
  const description = props.data?.description ?? '保存原图到相册即可识别为实况图'

  return (
    <DefaultLayout
      {...props}
      className="relative overflow-hidden"
      style={{ backgroundColor: dark ? '#07080D' : '#F1F3FA', minHeight: '1536px' }}
    >
      {/* 背景骨架（弥散信息海报）：渐变底 → 4 团偏心超大光斑 → 灰度噪点 → 低透明装饰。
          光斑全部压在右侧与底部，左上留给正文，标题区的对比度才不会被自己的背景吃掉 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: dark
              ? 'linear-gradient(118deg, #04050A 0%, #06070E 38%, #0A0E1C 100%)'
              : 'linear-gradient(118deg, #F7F9FE 0%, #F1F4FC 38%, #E9EEF9 100%)'
          }}
        />
        {/* 右上主光斑：整张图最亮的一块，圆心压在画布外，只让边缘扫进来制造高对比 */}
        <div
          className="absolute -top-110 -right-75 h-300 w-362.5 rounded-full blur-[170px]"
          style={{
            background: dark
              ? 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.46) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.42) 0%, transparent 70%)'
          }}
        />
        {/* 右中紫光斑 */}
        <div
          className="absolute top-100 -right-90 h-260 w-255 rounded-full blur-[170px]"
          style={{
            background: dark
              ? 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.38) 0%, transparent 72%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.34) 0%, transparent 72%)'
          }}
        />
        {/* 左下青色，把下半张画布托住，避免底部发死 */}
        <div
          className="absolute -bottom-95 -left-55 h-235 w-325 rounded-full blur-[210px]"
          style={{
            background: dark
              ? 'radial-gradient(ellipse at 50% 60%, rgba(34,211,238,0.26) 0%, transparent 75%)'
              : 'radial-gradient(ellipse at 50% 60%, rgba(34,211,238,0.30) 0%, transparent 75%)'
          }}
        />
        {/* 右下靛蓝，与右上主光斑对角呼应 */}
        <div
          className="absolute -right-70 -bottom-85 h-225 w-262.5 rounded-full blur-[190px]"
          style={{
            background: dark
              ? 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.32) 0%, transparent 72%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.30) 0%, transparent 72%)'
          }}
        />
      </div>

      {/* 杂色层：配方取自 douyin/video-work 的杂色层，只补两处——
          1) RGB 的对比再拉高一点，让斑点落在纯黑/纯白附近，不糊成中间调的灰雾；
          2) 不挂 mix-blend-mode。整屏混合会把四团大模糊的背景层拖进同一次合成，
             实测截图会卡死不再出帧；噪点层自带的噪声 alpha 已经保证"只有一部分像素参与"，
             普通叠加同样不会蒙灰纱。
          另外这里必须用内联 <svg> 元素：改成 SVG 的 background-image 平铺反而更慢，
          Chromium 会为整块图层重新栅格化滤镜，1440 宽的画布直接卡住 */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{ opacity: dark ? 0.32 : 0.28 }}
      >
        <filter id="kkkLivePhotoNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" result="gray" />
          <feComponentTransfer in="gray">
            <feFuncR type="linear" slope="2.2" intercept="-0.6" />
            <feFuncG type="linear" slope="2.2" intercept="-0.6" />
            <feFuncB type="linear" slope="2.2" intercept="-0.6" />
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncA type="linear" slope="1.7" intercept="-0.35" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#kkkLivePhotoNoise)" />
      </svg>

      {/* 装饰层：只放角落，靠留白平衡，绝不压到正文 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-16 -right-10 text-[200px] font-bold uppercase leading-none tracking-[-0.03em] whitespace-nowrap"
          style={{ color: fg, opacity: dark ? 0.06 : 0.05 }}
        >
          Motion
        </div>
        <div className="absolute top-110 right-28 grid grid-cols-5 gap-3.25" style={{ opacity: dark ? 0.22 : 0.16 }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} className="block h-1.75 w-1.75 rounded-full" style={{ backgroundColor: fg }} />
          ))}
        </div>
      </div>

      {/* 顶部一道极窄高光，模拟光落在材质上边缘 */}
      <div
        className="absolute inset-x-30 top-0 h-px pointer-events-none"
        style={{
          background: dark
            ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.34), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)'
        }}
      />

      {/* pb 交给 DefaultLayout 的版本落款自带 pt-32，这里再留一次会空出两倍间距 */}
      <div className="relative z-10 flex min-h-360 flex-col px-27 pt-29 pb-0">
        {/* 状态：先给一句「成了」的确认，再讲要做的事 */}
        <div className="flex items-center gap-6.5">
          <span
            className="inline-block h-4.5 w-4.5 shrink-0 rounded-full"
            style={{ backgroundColor: '#30d158', boxShadow: '0 0 0 9px rgba(48,209,88,0.13)' }}
          />
          <span className="text-[40px] font-medium" style={{ color: muted, letterSpacing: '0.2em' }}>
            {title}
          </span>
        </div>

        {/* 主张：动作最重、结果次之，靠字重与明度拉开层级 */}
        <div className="mt-19 flex flex-col text-[132px] leading-[1.08]" style={{ letterSpacing: '-0.035em' }}>
          <span className="font-bold" style={{ color: fg }}>
            保存原图
          </span>
          <span className="font-normal" style={{ color: muted }}>
            动与声都留在相册
          </span>
        </div>

        {/* 操作路径：把用户要在聊天界面里找的那几个字，做成整张图里最实的字。
            用玻璃面板托住，顺便让背后的噪点在正文底下散焦 */}
        <div
          className="mt-23 rounded-[56px] px-16 py-13 backdrop-blur-xl"
          style={{
            backgroundColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.58)',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)'}`,
            boxShadow: dark ? '0 40px 90px -50px rgba(0,0,0,0.9)' : '0 40px 90px -60px rgba(24,32,64,0.35)'
          }}
        >
          <div className="flex items-center gap-6.5 text-[52px] leading-none whitespace-nowrap">
            <span style={{ color: muted }}>点击</span>
            <span className="font-semibold" style={{ color: fg }}>
              「查看原图」
            </span>
            <ArrowRight className="h-11.5 w-11.5 shrink-0" strokeWidth={3} style={{ color: muted }} />
            <span className="font-semibold" style={{ color: fg }}>
              保存到相册
            </span>
          </div>
          {/* 这一行不重复标题说过的话，只补一句「为什么这样就能被认出来」 */}
          <p className="mt-8.5 text-[42px] leading-normal" style={{ color: faint }}>
            {description}
          </p>
        </div>

        {/* 兼容性：Logo 墙不挂状态角标——缩到手机宽度后那点小字谁也读不到，
            例外机型改用整行正文说明，缩到 1/3 也还读得清。
            mt-auto 把这一块连同落款一起压到底部，多出来的空白留成「怎么做」与「我这台行不行」之间的停顿 */}
        <div className="mt-auto pt-33">
          <div className="text-[40px] font-medium" style={{ color: muted, letterSpacing: '0.2em' }}>
            支持实况照片
          </div>
          <div className="mt-11 flex gap-5.5">
            <BrandTile dark={dark}>
              <GooglePhotosIcon className="h-auto w-19" />
            </BrandTile>
            <BrandTile dark={dark}>
              <XiaomiIcon className="h-auto w-17" />
            </BrandTile>
            <BrandTile dark={dark}>
              <SiSamsung className="h-auto w-28" style={{ color: dark ? '#3B5BDB' : '#1428A0' }} />
            </BrandTile>
            <BrandTile dark={dark}>
              <SiOppo className="h-auto w-26.5" style={{ color: dark ? '#00C08B' : '#009B77' }} />
            </BrandTile>
            <BrandTile dark={dark}>
              <SiOneplus className="h-auto w-14" style={{ color: '#F50514' }} />
            </BrandTile>
            <BrandTile dark={dark}>
              <SiHuawei className="h-auto w-18" style={{ color: dark ? '#E8384F' : '#CF0A2C' }} />
            </BrandTile>
            <BrandTile dark={dark}>
              <HonorIcon className="h-auto w-27" color={fg} />
            </BrandTile>
          </div>

          <div className="mt-12 flex flex-col gap-4.5 text-[42px] leading-[1.4]" style={{ color: muted }}>
            <div className="flex items-center gap-5">
              <CircleDashed className="h-8.5 w-8.5 shrink-0" strokeWidth={2.5} style={{ color: faint }} />
              <span>华为、荣耀为理论支持，尚未实测</span>
            </div>
            <div className="flex items-center gap-5">
              <X className="h-8.5 w-8.5 shrink-0" strokeWidth={3} style={{ color: faint }} />
              <span className="inline-flex items-center gap-4.5">
                <SiApple className="h-auto w-7.5" style={{ color: fg }} />
                <SiVivo className="h-auto w-13.5" style={{ color: dark ? '#6E7BFF' : '#415FFF' }} />
                <span>暂不支持</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
})

LivePhotoTip.displayName = 'LivePhotoTip'

export default LivePhotoTip
