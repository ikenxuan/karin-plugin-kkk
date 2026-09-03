import { Chip } from '@heroui/react'
import { formatDistanceToNow, parse } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import {
  AlertCircle,
  Clock,
  FileText,
  Fingerprint,
  Gauge,
  GitBranch,
  ListChecks,
  Puzzle,
  QrCode,
  Radio,
  Repeat,
  ShieldAlert,
  Terminal,
  Timer
} from 'lucide-react'
import _ from 'node-karin/lodash'
import React from 'react'
import { MdSchedule } from 'react-icons/md'

import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterProps } from '../../../types/ctx'
import { generateQRCode } from '../../../../utils/QRcode'
import { isDark } from '../../../../utils/theme'
import { getRandomErrorTitle } from './errorTitles'
import type { AmagiErrorDetail, ApiErrorData } from './types'

/** 业务错误类型：从总数据类型里取，不再单独导出。 */
type BusinessError = ApiErrorData['error']
/** 日志等级：从总数据类型里逐步取。 */
type LogLevel = NonNullable<ApiErrorData['logs']>[number]['level']

/**
 * ANSI 颜色代码映射
 */
const ansiColorMap: Record<number, string> = {
  30: 'text-foreground',
  31: 'text-danger',
  32: 'text-success',
  33: 'text-warning',
  34: 'text-accent',
  35: 'text-accent',
  36: 'text-cyan-600',
  37: 'text-muted',
  90: 'text-foreground/70',
  91: 'text-danger',
  92: 'text-success',
  93: 'text-warning',
  94: 'text-accent',
  95: 'text-accent',
  96: 'text-muted',
  97: 'text-background/80'
}

const ansi256ToColor = (colorCode: number): string => {
  const standardColors = [
    '#000000',
    '#800000',
    '#008000',
    '#808000',
    '#000080',
    '#800080',
    '#008080',
    '#c0c0c0',
    '#808080',
    '#ff0000',
    '#00ff00',
    '#ffff00',
    '#0000ff',
    '#ff00ff',
    '#00ffff',
    '#ffffff'
  ]
  if (colorCode < 16) return standardColors[colorCode]
  if (colorCode < 232) {
    const index = colorCode - 16
    const r = Math.floor(index / 36),
      g = Math.floor((index % 36) / 6),
      b = index % 6
    const toHex = (v: number) => (v === 0 ? 0 : 55 + v * 40).toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }
  const gray = (colorCode - 232) * 10 + 8
  const hex = gray.toString(16).padStart(2, '0')
  return `#${hex}${hex}${hex}`
}

const convertAnsiToHtml = (text: string): string => {
  // 完全避免在正则字面量中出现任何转义
  const ESC = String.fromCharCode(27)
  const ansiRegex = new RegExp(ESC + '\\[([0-9;]+)m', 'g')
  let result = '',
    lastIndex = 0
  let currentStyles: { classes: string[]; inlineColor?: string } = { classes: [] }
  let match

  const escapeHtml = (str: string) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
  const formatLogContent = (content: string) =>
    escapeHtml(content).replace(
      /([\u3400-\u9fff\uf900-\ufaff\u3000-\u303f\uff00-\uffef]+)/g,
      '<span class="font-[HarmonyOSHans-Regular]">$1</span>'
    )
  const makeSpan = (content: string) => {
    const hasClass = currentStyles.classes.length > 0,
      hasInline = currentStyles.inlineColor
    if (!hasClass && !hasInline) return formatLogContent(content)
    const classAttr = hasClass ? ` class="${currentStyles.classes.join(' ')}"` : ''
    const styleAttr = hasInline ? ` style="color: ${currentStyles.inlineColor}"` : ''
    return `<span${classAttr}${styleAttr}>${formatLogContent(content)}</span>`
  }

  while ((match = ansiRegex.exec(text)) !== null) {
    if (match.index > lastIndex) result += makeSpan(text.substring(lastIndex, match.index))
    const codes = match[1].split(';').map(Number)
    let i = 0
    while (i < codes.length) {
      const code = codes[i]
      if (code === 90 && codes[i + 1] === 2) {
        currentStyles.classes = currentStyles.classes.filter((c) => !c.startsWith('text-'))
        currentStyles.inlineColor = undefined
        currentStyles.classes.push('text-muted')
        i++
      } else if (code === 0 || code === 39 || code === 49) {
        currentStyles.classes = currentStyles.classes.filter(
          (c) => !c.startsWith('text-') && !c.startsWith('bg-') && !c.startsWith('dark:')
        )
        currentStyles.inlineColor = undefined
      } else if (code === 1) {
        if (!currentStyles.classes.includes('font-bold')) currentStyles.classes.push('font-bold')
      } else if (code === 22) {
        currentStyles.classes = currentStyles.classes.filter((c) => c !== 'font-bold')
      } else if (code === 38 && codes[i + 1] === 5) {
        const colorCode = codes[i + 2]
        if (colorCode !== undefined) {
          currentStyles.classes = currentStyles.classes.filter((c) => !c.startsWith('text-') && !c.startsWith('dark:'))
          currentStyles.inlineColor = ansi256ToColor(colorCode)
          i += 2
        }
      } else if (ansiColorMap[code]) {
        currentStyles.classes = currentStyles.classes.filter((c) => !c.startsWith('text-') && !c.startsWith('dark:'))
        currentStyles.inlineColor = undefined
        currentStyles.classes.push(ansiColorMap[code])
      }
      i++
    }
    lastIndex = ansiRegex.lastIndex
  }
  if (lastIndex < text.length) result += makeSpan(text.substring(lastIndex))
  return result
}

const getLogLevelTheme = (level: LogLevel, dark: boolean) => {
  const themeMap: Record<
    LogLevel,
    {
      bgClass: string
      borderClass: string
      textClass: string
      iconClass: string
      levelClass: string
      dotClass: string
    }
  > = {
    TRAC: {
      bgClass: dark ? 'bg-muted/10' : 'bg-muted/5',
      borderClass: 'border-muted/20',
      textClass: 'text-muted',
      iconClass: 'text-muted',
      levelClass: dark ? 'text-muted/10' : 'text-muted/10',
      dotClass: 'bg-muted/40'
    },
    DEBU: {
      bgClass: dark ? 'bg-cyan-400/10' : 'bg-cyan-500/5',
      borderClass: dark ? 'border-cyan-400/20' : 'border-cyan-500/20',
      textClass: dark ? 'text-cyan-400' : 'text-cyan-600',
      iconClass: dark ? 'text-cyan-400' : 'text-cyan-600',
      levelClass: dark ? 'text-cyan-400/10' : 'text-cyan-600/10',
      dotClass: dark ? 'bg-cyan-400/40' : 'bg-cyan-500/40'
    },
    MARK: {
      bgClass: dark ? 'bg-muted/10' : 'bg-muted/5',
      borderClass: 'border-muted/20',
      textClass: 'text-muted',
      iconClass: 'text-muted',
      levelClass: dark ? 'text-muted/10' : 'text-muted/10',
      dotClass: 'bg-muted/40'
    },
    INFO: {
      bgClass: 'bg-success-soft',
      borderClass: 'border-success/25',
      textClass: 'text-success',
      iconClass: 'text-success',
      levelClass: dark ? 'text-success/10' : 'text-success/10',
      dotClass: 'bg-success/40'
    },
    WARN: {
      bgClass: 'bg-warning-soft',
      borderClass: 'border-warning/25',
      textClass: 'text-warning',
      iconClass: 'text-warning',
      levelClass: dark ? 'text-warning/10' : 'text-warning-soft',
      dotClass: 'bg-warning/40'
    },
    ERRO: {
      bgClass: 'bg-danger-soft',
      borderClass: 'border-danger/25',
      textClass: 'text-danger',
      iconClass: 'text-danger',
      levelClass: dark ? 'text-danger/10' : 'text-danger/10',
      dotClass: 'bg-danger/40'
    },
    FATA: {
      bgClass: dark ? 'bg-pink-400/10' : 'bg-pink-500/5',
      borderClass: dark ? 'border-pink-400/25' : 'border-pink-500/25',
      textClass: dark ? 'text-pink-400' : 'text-pink-500',
      iconClass: dark ? 'text-pink-400' : 'text-pink-500',
      levelClass: dark ? 'text-pink-400/10' : 'text-pink-500/10',
      dotClass: dark ? 'bg-pink-400/40' : 'bg-pink-500/40'
    }
  }
  return themeMap[level] || themeMap['TRAC']
}

const ADAPTER_LOGO_MAP: Record<string, string> = {
  napcat: '/image/other/handlerError/napcat.webp',
  lagrange: '/image/other/handlerError/lagrange.webp',
  chronocat: '/image/other/handlerError/chronocat.svg',
  llonebot: '/image/other/handlerError/llonebot.webp',
  lltwobot: '/image/other/handlerError/llonebot.webp',
  conwechat: '/image/other/handlerError/conwechat.webp',
  gocq: '/image/other/handlerError/gocq-http.webp'
}

const getAdapterLogo = (adapterName: string): React.ReactNode => {
  const nameLower = adapterName.toLowerCase()
  for (const [key, logoPath] of Object.entries(ADAPTER_LOGO_MAP)) {
    if (nameLower.includes(key)) return <img src={logoPath} className="h-20 w-auto" alt={adapterName} />
  }
  return <Puzzle size={64} className="text-danger/80" />
}

/**
 * amagi 12 个错误大类的中文名与「该怎么办」。
 *
 * 印 `kind` 本身对看图的人没用 —— 有用的是它指向哪一类处置：改配置、等一会儿、
 * 还是提 issue。所以每一类都带一句处置提示。
 */
const ERROR_KIND_META: Record<AmagiErrorDetail['kind'], { zh: string; hint: string }> = {
  validation: { zh: '参数校验', hint: '调用参数不合法，通常是插件自身的问题' },
  auth: { zh: '身份失效', hint: 'Cookie 缺失或已过期，重新扫码登录即可' },
  rate_limit: { zh: '触发限流', hint: '请求太频繁，等一会儿再试' },
  risk: { zh: '命中风控', hint: '平台要求人机验证，或需要换一个账号的 Cookie' },
  not_found: { zh: '内容不存在', hint: '作品可能已删除、被设为私密或仅粉丝可见' },
  forbidden: { zh: '无权访问', hint: '当前账号看不到这份内容（付费 / 地区 / 权限）' },
  unavailable: { zh: '服务不可用', hint: '平台侧临时故障，稍后重试' },
  network: { zh: '网络错误', hint: '检查代理配置与出口网络' },
  timeout: { zh: '请求超时', hint: '调大 amagi.timeout，或检查代理链路' },
  parse: { zh: '响应解析失败', hint: '平台改了协议，或返回的是反爬页面' },
  internal: { zh: 'amagi 内部错误', hint: '解析库内部异常，建议反馈' },
  unknown: { zh: '未分类错误', hint: '平台返回了未被识别的错误码' }
}

/** 诊断区的一格：小标签 + 大值，值缺失时整格不渲染 */
const DetailCell: React.FC<{
  icon: React.ReactNode
  label: string
  value?: string | number
  color: string
  valueColor: string
}> = ({ icon, label, value, color, valueColor }) => {
  if (value === undefined || value === null || value === '') return null
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 opacity-70">
        {icon}
        <span className="text-xl font-semibold tracking-[0.12em]" style={{ color }}>
          {label}
        </span>
      </div>
      <span className="text-3xl font-bold font-mono break-all" style={{ color: valueColor }}>
        {value}
      </span>
    </div>
  )
}

const SectionTitle: React.FC<{ icon: React.ReactNode; en: string; zh: string; color: string }> = ({ icon, en, zh, color }) => (
  <div className="flex items-center gap-5 mb-6">
    {icon}
    <div className="flex flex-col leading-tight">
      <span className="text-xl font-semibold tracking-[0.2em] uppercase" style={{ color }}>
        {en}
      </span>
      <span className="text-base font-medium tracking-[0.08em] opacity-80" style={{ color }}>
        {zh}
      </span>
    </div>
  </div>
)

/**
 * API错误显示组件 - 手机端 Apple 风格
 */
export const handlerError: React.FC<PosterProps<ApiErrorData>> = (props) => {
  const { data } = props
  const dark = isDark(props.ctx)
  const isBusinessError = data.type === 'business_error'
  const businessError = isBusinessError ? (data.error as BusinessError) : null
  const displayMethod = businessError?.businessName || data.method

  // 631 配色 - 红/珊瑚色系
  const bgColor = dark ? '#0f0a0a' : '#faf5f5'
  const primaryColor = dark ? '#f87171' : '#dc2626'
  const secondaryColor = dark ? '#fca5a5' : '#b91c1c'
  const mutedColor = dark ? 'rgba(248,113,113,0.7)' : '#991b1b'
  const accentColor = dark ? '#fecaca' : '#7f1d1d'

  return (
    <DefaultLayout
      {...props}
      // version={undefined}
      className="relative overflow-hidden"
      style={{ backgroundColor: bgColor, width: '1440px', minHeight: '1800px' }}
    >
      {/* 弥散光背景 - 深浅模式完全适配 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 左上主光斑 */}
        <div
          className="absolute rounded-full w-300 h-350 -top-75 -left-50 blur-[120px] -rotate-15"
          style={{
            background: dark
              ? 'radial-gradient(ellipse at 40% 40%, rgba(220,38,38,0.35) 0%, rgba(185,28,28,0.18) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 40% 40%, rgba(248,113,113,0.45) 0%, rgba(252,165,165,0.22) 50%, transparent 100%)'
          }}
        />
        {/* 右侧光斑 */}
        <div
          className="absolute rounded-full w-225 h-250 top-100 -right-25 blur-[100px] rotate-20"
          style={{
            background: dark
              ? 'radial-gradient(ellipse at 50% 50%, rgba(127,29,29,0.3) 0%, rgba(69,10,10,0.15) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(254,202,202,0.4) 0%, rgba(254,226,226,0.2) 50%, transparent 100%)'
          }}
        />
        {/* 底部光斑 */}
        <div
          className="absolute rounded-full w-250 h-200 -bottom-50 left-50 blur-[140px] -rotate-10"
          style={{
            background: dark
              ? 'radial-gradient(ellipse at 50% 60%, rgba(153,27,27,0.3) 0%, rgba(127,29,29,0.15) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 50% 60%, rgba(252,165,165,0.35) 0%, rgba(254,202,202,0.18) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* 单色噪点层 - 明显颗粒感 */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: dark ? 0.12 : 0.18 }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="errorPixelNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" result="gray" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#errorPixelNoise)" />
        </svg>
      </div>

      {/* 背景大字装饰 */}
      <div className="absolute bottom-20 right-15 pointer-events-none select-none opacity-[0.03]">
        <span
          className="text-[180px] font-black tracking-tighter leading-none block text-right"
          style={{ color: dark ? '#fff' : '#7f1d1d' }}
        >
          ERROR
        </span>
      </div>

      {/* 四周装饰性图形点缀 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* 右上角：实心方块阵列 */}
        <div className="absolute top-10 right-10 grid grid-cols-2 gap-3 opacity-20">
          <div className="w-4 h-4" style={{ backgroundColor: primaryColor }} />
          <div className="w-4 h-4" style={{ backgroundColor: secondaryColor }} />
          <div className="w-4 h-4" style={{ backgroundColor: secondaryColor }} />
          <div className="w-4 h-4" style={{ backgroundColor: primaryColor }} />
        </div>

        {/* 左下角：对角线条纹 */}
        <div
          className="absolute bottom-0 left-0 w-125 h-125 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${primaryColor}, ${primaryColor} 4px, transparent 2px, transparent 12px)`,
            maskImage: 'linear-gradient(to top right, black, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to top right, black, transparent 70%)'
          }}
        />

        {/* 右下角：同心圆弧 */}
        <div className="absolute -bottom-20 -right-20 w-150 h-150 opacity-10 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-full border-40 rounded-full" style={{ borderColor: primaryColor }} />
          <div
            className="absolute bottom-20 right-20 w-[calc(100%-160px)] h-[calc(100%-160px)] border-20 rounded-full"
            style={{ borderColor: secondaryColor }}
          />
          <div
            className="absolute bottom-35 right-35 w-[calc(100%-280px)] h-[calc(100%-280px)] border-10 rounded-full"
            style={{ borderColor: mutedColor }}
          />
        </div>
      </div>

      {/* 内容层 */}
      <div className="relative z-10 flex flex-col h-full p-16">
        {/* 顶部状态栏 */}
        <div className="flex items-center justify-between mb-14">
          {/* 优化后的左侧状态标签 */}
          <div className="flex items-center">
            {/* 左侧装饰竖条 */}
            <div
              className="h-16 w-3 mr-4 opacity-80"
              style={{
                backgroundColor: primaryColor,
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)'
              }}
            />

            {/* 主标签容器 */}
            <div
              className="relative px-8 py-3 backdrop-blur-md"
              style={{
                backgroundColor: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
              }}
            >
              {/* 四角装饰钉 */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: primaryColor }} />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: primaryColor }} />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: primaryColor }} />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: primaryColor }} />

              <div className="flex items-center gap-6">
                {/* 状态指示器 */}
                <div
                  className="flex flex-col items-center justify-center border-r pr-6"
                  style={{ borderColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                >
                  <div
                    className="w-4 h-4 rounded-full shadow-[0_0_15px_currentColor] animate-pulse"
                    style={{ backgroundColor: primaryColor, color: primaryColor }}
                  />
                  <span className="text-[10px] font-mono mt-2 tracking-wider opacity-50" style={{ color: mutedColor }}>
                    ERR.01
                  </span>
                </div>

                {/* 文字信息 */}
                <div className="flex flex-col">
                  <span
                    className="text-xs font-mono font-bold tracking-[0.4em] uppercase mb-1 opacity-50"
                    style={{ color: secondaryColor }}
                  >
                    System Alert
                  </span>
                  <span className="text-2xl font-black tracking-[0.25em] uppercase" style={{ color: primaryColor }}>
                    Runtime Exception
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* 优化后的时间显示模块 */}
          <div className="flex items-center gap-8 pr-12">
            {/* 装饰线条组 */}
            <div className="flex flex-col gap-1 items-end opacity-40">
              <div className="w-16 h-0.5" style={{ backgroundColor: primaryColor }} />
              <div className="w-8 h-0.5" style={{ backgroundColor: secondaryColor }} />
            </div>

            {/* 时间数字显示 */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-3 mb-1">
                <span className="text-xs font-black tracking-[0.3em] uppercase opacity-60" style={{ color: mutedColor }}>
                  System Time
                </span>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
              </div>
              <div className="font-mono text-5xl font-black tracking-widest leading-none" style={{ color: mutedColor }}>
                {new Date(data.timestamp).toLocaleTimeString('en-GB', { hour12: false })}
              </div>
            </div>

            {/* 分割线 */}
            <div className="h-12 w-0.5 opacity-20" style={{ backgroundColor: mutedColor }} />

            {/* 日期显示 */}
            <div className="text-right">
              <div className="text-xs font-black tracking-[0.3em] uppercase opacity-60 mb-1" style={{ color: mutedColor }}>
                Date
              </div>
              <div className="font-mono text-3xl font-bold tracking-[0.2em]" style={{ color: secondaryColor }}>
                {new Date(data.timestamp)
                  .toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
                  .replaceAll('/', '-')}
              </div>
            </div>
          </div>
        </div>

        {/* 主标题 */}
        <div className="mb-20">
          <h1 className="text-[120px] font-black leading-none tracking-tight mb-10" style={{ color: accentColor }}>
            {getRandomErrorTitle()}
          </h1>
          <p className="text-5xl font-semibold" style={{ color: primaryColor }}>
            {displayMethod}
          </p>
        </div>

        {/* amagi 错误诊断：只有失败来自解析库时才有这一块 */}
        {data.amagi && (
          <div className="mb-16">
            <SectionTitle
              icon={<ShieldAlert size={36} style={{ color: mutedColor }} />}
              en="Amagi Diagnosis"
              zh="解析库错误诊断"
              color={mutedColor}
            />
            <div
              className="p-12 rounded-[36px]"
              style={{
                backgroundColor: dark ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.55)',
                border: `1px solid ${dark ? 'rgba(248,113,113,0.18)' : 'rgba(252,165,165,0.45)'}`
              }}
            >
              {/* 第一行：错误大类 + 是否可重试。这两个决定「现在该做什么」 */}
              <div className="flex items-center gap-6 flex-wrap mb-4">
                <span
                  className="px-8 py-3 rounded-full text-3xl font-black tracking-wide"
                  style={{
                    backgroundColor: dark ? 'rgba(248,113,113,0.18)' : 'rgba(220,38,38,0.12)',
                    color: primaryColor
                  }}
                >
                  {ERROR_KIND_META[data.amagi.kind].zh}
                </span>
                <span
                  className="px-6 py-3 rounded-full text-2xl font-bold tracking-wide"
                  style={{
                    backgroundColor: data.amagi.retryable
                      ? dark
                        ? 'rgba(74,222,128,0.16)'
                        : 'rgba(22,163,74,0.12)'
                      : dark
                        ? 'rgba(148,163,184,0.16)'
                        : 'rgba(100,116,139,0.12)',
                    color: data.amagi.retryable ? (dark ? '#4ade80' : '#15803d') : dark ? '#cbd5e1' : '#475569'
                  }}
                >
                  {data.amagi.retryable ? '可以重试' : '重试无用'}
                </span>
                <span className="font-mono text-2xl opacity-70" style={{ color: mutedColor }}>
                  {data.amagi.kind}
                </span>
              </div>

              <p className="text-3xl mb-10" style={{ color: secondaryColor }}>
                {ERROR_KIND_META[data.amagi.kind].hint}
              </p>

              {/* 平台返回的原文：与堆栈里那份 inspect 转储不同，这里是干净的一句话 */}
              <div
                className="p-8 rounded-[28px] mb-10"
                style={{ backgroundColor: dark ? 'rgba(220,38,38,0.12)' : 'rgba(254,202,202,0.35)' }}
              >
                <div className="text-xl font-semibold tracking-[0.12em] opacity-70 mb-3" style={{ color: mutedColor }}>
                  平台原文
                </div>
                <p className="text-3xl leading-relaxed break-all" style={{ color: accentColor }}>
                  {data.amagi.reason || '(平台未给出说明)'}
                </p>
              </div>

              {/* 分层错误码与请求归因 */}
              <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                <DetailCell
                  icon={<AlertCircle size={26} style={{ color: mutedColor }} />}
                  label="AMAGI 码"
                  value={data.amagi.code}
                  color={mutedColor}
                  valueColor={accentColor}
                />
                <DetailCell
                  icon={<Radio size={26} style={{ color: mutedColor }} />}
                  label="平台业务码"
                  value={data.amagi.platformCode}
                  color={mutedColor}
                  valueColor={accentColor}
                />
                <DetailCell
                  icon={<Gauge size={26} style={{ color: mutedColor }} />}
                  label="HTTP 状态"
                  value={data.amagi.httpStatus}
                  color={mutedColor}
                  valueColor={accentColor}
                />
                <DetailCell
                  icon={<Fingerprint size={26} style={{ color: mutedColor }} />}
                  label="请求 ID"
                  value={data.amagi.requestId}
                  color={mutedColor}
                  valueColor={accentColor}
                />
                <DetailCell
                  icon={<Repeat size={26} style={{ color: mutedColor }} />}
                  label="实际请求次数"
                  value={data.amagi.attempts}
                  color={mutedColor}
                  valueColor={accentColor}
                />
                <DetailCell
                  icon={<Timer size={26} style={{ color: mutedColor }} />}
                  label="耗时"
                  value={data.amagi.durationMs === undefined ? undefined : `${data.amagi.durationMs} ms`}
                  color={mutedColor}
                  valueColor={accentColor}
                />
              </div>

              {/* 参数校验的字段级错误，只有 kind === 'validation' 时有 */}
              {data.amagi.issues && data.amagi.issues.length > 0 && (
                <div className="mt-12">
                  <div className="flex items-center gap-3 mb-5 opacity-70">
                    <ListChecks size={26} style={{ color: mutedColor }} />
                    <span className="text-xl font-semibold tracking-[0.12em]" style={{ color: mutedColor }}>
                      参数问题
                    </span>
                  </div>
                  <ul className="space-y-4">
                    {data.amagi.issues.map((issue, index) => (
                      <li key={`${issue.path}-${index}`} className="flex gap-5 text-2xl leading-relaxed">
                        <span className="font-mono font-bold shrink-0" style={{ color: primaryColor }}>
                          {issue.path || '(根)'}
                        </span>
                        <span style={{ color: accentColor }}>{issue.message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 验证二维码 */}
        {data.isVerification && data.verificationUrl && (
          <div className="mb-16 p-12 rounded-[40px]" style={{ backgroundColor: dark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.6)' }}>
            <div className="flex items-center gap-6 mb-10">
              <QrCode size={40} className="text-warning" />
              <span className="text-3xl font-semibold" style={{ color: accentColor }}>
                人机验证
              </span>
            </div>
            <div className="flex gap-16 items-center">
              <img src={generateQRCode(data.verificationUrl, dark)} alt="验证二维码" className="w-64 h-64 rounded-3xl" />
              <div className="space-y-6">
                <p className="text-3xl" style={{ color: secondaryColor }}>
                  请在 120 秒内完成验证
                </p>
                <ol className="space-y-4 text-2xl" style={{ color: mutedColor }}>
                  <li>1. 使用手机扫描二维码</li>
                  <li>2. 在网页中完成人机验证</li>
                  <li>3. 将验证结果发送至此对话</li>
                </ol>
                {data.verificationUrl && (
                  <p className="text-xl break-all mt-8" style={{ color: mutedColor }}>
                    {data.verificationUrl}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 触发命令 */}
        {data.triggerCommand && (
          <div className="mb-14">
            <SectionTitle
              icon={<Terminal size={36} style={{ color: mutedColor }} />}
              en="Trigger Command"
              zh="触发命令"
              color={mutedColor}
            />
            <div className="p-10 rounded-[36px]" style={{ backgroundColor: dark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)' }}>
              <pre
                className="text-3xl leading-relaxed whitespace-pre-wrap break-all font-mono"
                style={{ color: accentColor }}
                dangerouslySetInnerHTML={{ __html: convertAnsiToHtml(data.triggerCommand) }}
              />
            </div>
          </div>
        )}

        {/* 错误堆栈 */}
        <div className="mb-14">
          <SectionTitle icon={<AlertCircle size={36} style={{ color: mutedColor }} />} en="Stack Trace" zh="错误堆栈" color={mutedColor} />
          <div
            className="p-10 rounded-[36px]"
            style={{
              backgroundColor: dark ? 'rgba(220,38,38,0.1)' : 'rgba(254,202,202,0.4)',
              border: `1px solid ${dark ? 'rgba(248,113,113,0.2)' : 'rgba(252,165,165,0.5)'}`
            }}
          >
            <pre
              className="text-2xl leading-relaxed whitespace-pre-wrap break-all font-mono"
              style={{ color: dark ? 'rgba(255,255,255,0.85)' : 'rgba(127,29,29,0.9)' }}
              dangerouslySetInnerHTML={{
                __html: convertAnsiToHtml(String(businessError?.stack || data.error?.stack || ''))
              }}
            />
          </div>
        </div>

        {/* 执行日志 */}
        {data.logs && data.logs.length > 0 && (
          <div className="mb-14">
            <SectionTitle
              icon={<FileText size={36} style={{ color: mutedColor }} />}
              en="Execution Logs"
              zh="执行日志"
              color={mutedColor}
            />
            <div className="space-y-6">
              {data.logs.map((log, index) => {
                const theme = getLogLevelTheme(log.level, dark)
                return (
                  <fieldset key={index} className={`relative rounded-3xl ${theme.bgClass} border-2 ${theme.borderClass} p-6`}>
                    {/* 时间戳 */}
                    <legend className="flex items-center gap-2 ml-4">
                      {/* 左侧圆角装饰 */}
                      <span className={`w-2 h-6 rounded-full -mr-1.5 ${theme.dotClass}`} />
                      <span className="flex items-center gap-2 px-3">
                        <Clock size={18} className={theme.iconClass} />
                        <span className={`text-xl font-mono font-medium ${theme.textClass}`}>{log.timestamp}</span>
                      </span>
                      {/* 右侧圆角装饰 */}
                      <span className={`w-2 h-6 rounded-full -ml-1.5 ${theme.dotClass}`} />
                    </legend>

                    {/* 日志等级 */}
                    <div className="absolute bottom-2 right-6 pointer-events-none">
                      <span className={`text-6xl font-black uppercase leading-none tracking-tight ${theme.levelClass}`}>{log.level}」</span>
                    </div>

                    {/* 日志内容 */}
                    <div
                      className="relative z-1 text-2xl font-mono whitespace-pre-wrap break-all leading-relaxed"
                      style={{ color: dark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.82)' }}
                      dangerouslySetInnerHTML={{ __html: convertAnsiToHtml(log.message) }}
                    />
                  </fieldset>
                )
              })}
            </div>
          </div>
        )}

        {/* 底部版本信息 */}
        <div className="mt-auto pt-12" style={{ borderTop: `2px solid ${dark ? 'rgba(248,113,113,0.15)' : 'rgba(252,165,165,0.3)'}` }}>
          {/* 版本信息网格 */}
          <div className="grid grid-cols-2 gap-10 mb-12">
            <div className="flex items-center gap-6">
              <img src="/image/frame-logo.png" className="h-16 w-auto" alt="Framework" />
              <div>
                <p className="text-xl" style={{ color: mutedColor }}>
                  Framework / 框架版本
                </p>
                <p className="text-3xl font-bold" style={{ color: accentColor }}>
                  {data.frameworkVersion}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 221" className="h-16 w-auto" style={{ color: accentColor }}>
                <path
                  d="M132.75,87.37l-53.72-53.37c-4.66-4.63-1.38-12.58,5.18-12.58h115.13c6.57,0,9.84,7.95,5.18,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z"
                  fill="currentColor"
                />
                <path
                  d="M28.49,186.89l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39h-51.42c-7.04-.02-12.94-5.72-12.96-12.76Z"
                  fill="currentColor"
                />
                <path
                  d="M41.54,23.68l163.04,163.05c4.78,4.78,1.39,12.95-5.36,12.94h-47.88c-9.69,0-18.99-3.86-25.84-10.71L39.3,102.75c-6.85-6.85-10.7-16.15-10.7-25.84V29.04c0-6.76,8.16-10.14,12.94-5.36Z"
                  fill="currentColor"
                />
              </svg>
              <div>
                <p className="text-xl" style={{ color: mutedColor }}>
                  Plugin / 插件版本
                </p>
                <p className="text-3xl font-bold" style={{ color: accentColor }}>
                  {data.pluginVersion}
                </p>
              </div>
            </div>

            {data.adapterInfo && (
              <div
                className="col-span-2 p-8 rounded-3xl"
                style={{
                  backgroundColor: dark ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.52)',
                  border: `1px solid ${dark ? 'rgba(248,113,113,0.22)' : 'rgba(220,38,38,0.14)'}`
                }}
              >
                <div className="flex items-start justify-between gap-8 mb-6">
                  <div className="flex items-center gap-6 min-w-0">
                    {getAdapterLogo(data.adapterInfo.name)}
                    <div className="min-w-0">
                      <p className="text-xl mb-1" style={{ color: mutedColor }}>
                        Adapter / 适配器
                      </p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <p className="text-3xl font-bold truncate" style={{ color: accentColor }}>
                          {data.adapterInfo.name}
                        </p>
                        <Chip size="lg" variant="soft" color="danger" className="h-8 text-lg">
                          {data.adapterInfo.version.startsWith('v') ? data.adapterInfo.version : `v${data.adapterInfo.version}`}
                        </Chip>
                      </div>
                    </div>
                  </div>
                  <p className="text-xl font-medium mb-4" style={{ color: mutedColor }}>
                    事件信息来源
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-4 text-lg" style={{ color: secondaryColor }}>
                  <div
                    className="rounded-2xl px-4 py-3"
                    style={{ backgroundColor: dark ? 'rgba(248,113,113,0.08)' : 'rgba(220,38,38,0.05)' }}
                  >
                    <p className="text-sm mb-1 opacity-75">Platform / 对接平台</p>
                    <p className="font-semibold break-all text-2xl">{String(data.adapterInfo.platform)}</p>
                  </div>
                  <div
                    className="rounded-2xl px-4 py-3 relative overflow-hidden"
                    style={{ backgroundColor: dark ? 'rgba(248,113,113,0.08)' : 'rgba(220,38,38,0.05)' }}
                  >
                    <p className="text-sm mb-1 opacity-75">Standard / 协议标准</p>
                    <p className="font-semibold break-all text-2xl">{_.upperFirst(_.camelCase(String(data.adapterInfo.standard)))}</p>
                    {String(data.adapterInfo.standard).toLowerCase() === 'milky' && (
                      <div className="absolute inset-0 pointer-events-none">
                        <img
                          src="/image/other/handlerError/Milky.png"
                          alt="Milky"
                          className="absolute -right-2 -bottom-3 w-24 h-24 object-contain"
                          style={{
                            WebkitMaskImage: 'linear-gradient(to top left, transparent 0%, rgba(0,0,0,1) 60%)',
                            maskImage: 'linear-gradient(to top left, transparent 0%, rgba(0,0,0,1) 60%)',
                            opacity: 1
                          }}
                        />
                      </div>
                    )}
                    {String(data.adapterInfo.standard).toLowerCase() === 'satori' && (
                      <div className="absolute inset-0 pointer-events-none">
                        <img
                          src="/image/other/handlerError/satori.png"
                          alt="Satori"
                          className="absolute -right-2 -bottom-3 w-24 h-24 object-contain"
                          style={{
                            WebkitMaskImage: 'linear-gradient(to top left, transparent 0%, rgba(0,0,0,1) 60%)',
                            maskImage: 'linear-gradient(to top left, transparent 0%, rgba(0,0,0,1) 60%)',
                            opacity: 1
                          }}
                        />
                      </div>
                    )}
                    {String(data.adapterInfo.standard).includes('onebot') && (
                      <div className="absolute inset-0 pointer-events-none">
                        <img
                          src="/image/other/handlerError/onebot.png"
                          alt="OneBot"
                          className="absolute -right-2 -bottom-3 w-24 h-24 object-contain"
                          style={{
                            WebkitMaskImage: 'linear-gradient(to top left, transparent 0%, rgba(0,0,0,1) 60%)',
                            maskImage: 'linear-gradient(to top left, transparent 0%, rgba(0,0,0,1) 60%)',
                            opacity: 1
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className="rounded-2xl px-4 py-3"
                    style={{ backgroundColor: dark ? 'rgba(248,113,113,0.08)' : 'rgba(220,38,38,0.05)' }}
                  >
                    <p className="text-sm mb-1 opacity-75">Protocol / 协议实现</p>
                    <p className="font-semibold break-all text-2xl">{String(data.adapterInfo.protocol)}</p>
                  </div>
                  <div
                    className="rounded-2xl px-4 py-3"
                    style={{ backgroundColor: dark ? 'rgba(248,113,113,0.08)' : 'rgba(220,38,38,0.05)' }}
                  >
                    <p className="text-sm mb-1 opacity-75">Communication / 通信方式</p>
                    <p className="font-semibold break-all text-2xl">{String(data.adapterInfo.communication)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* 次要信息 */}
          <div className="flex items-center gap-10 text-xl mb-12" style={{ color: mutedColor }}>
            {data.buildTime && (
              <div className="flex items-center gap-3">
                <MdSchedule size={24} />
                <span>
                  Built Time: {data.buildTime} 于{' '}
                  {formatDistanceToNow(parse(data.buildTime, 'yyyy年MM月dd日 HH:mm', new Date()), { locale: zhCN })}前
                </span>
              </div>
            )}
            {data.commitHash && (
              <div className="flex items-center gap-3">
                <GitBranch size={24} />
                <span>Commit Hash: {data.commitHash}</span>
              </div>
            )}
          </div>

          {/* 帮助提示 */}
          <div className="p-10 rounded-[36px]" style={{ backgroundColor: dark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)' }}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-3xl font-semibold mb-2" style={{ color: accentColor }}>
                  Need Help? / 需要帮助？
                </p>
                <p className="text-2xl" style={{ color: secondaryColor }}>
                  提交问题时请附上完整报错截图、复现步骤和环境版本信息。
                </p>
              </div>
              <span
                className="text-xs font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                style={{
                  color: primaryColor,
                  backgroundColor: dark ? 'rgba(248,113,113,0.12)' : 'rgba(220,38,38,0.08)'
                }}
              >
                Support
              </span>
            </div>
            <div
              className="grid grid-cols-2 gap-x-6 gap-y-6 text-2xl leading-relaxed py-6"
              style={{
                borderTop: `1px solid ${dark ? 'rgba(248,113,113,0.2)' : 'rgba(220,38,38,0.12)'}`,
                borderBottom: `1px solid ${dark ? 'rgba(248,113,113,0.2)' : 'rgba(220,38,38,0.12)'}`
              }}
            >
              <div>
                <p className="font-semibold mb-1" style={{ color: accentColor }}>
                  GitHub Issue
                </p>
                <p className="text-xl break-all" style={{ color: secondaryColor }}>
                  https://github.com/ikenxuan/karin-plugin-kkk/issues/new/choose
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: accentColor }}>
                  GitHub Repository
                </p>
                <p className="text-xl break-all" style={{ color: secondaryColor }}>
                  https://github.com/ikenxuan/karin-plugin-kkk
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: accentColor }}>
                  QQ 群
                </p>
                <p className="text-xl" style={{ color: secondaryColor }}>
                  795874649
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: accentColor }}>
                  附带信息
                </p>
                <p className="text-xl" style={{ color: secondaryColor }}>
                  此图片 + 触发命令 + 对应配置（自行脱敏处理）
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6 text-xl" style={{ color: mutedColor }}>
              <span className="font-mono">Tips:</span>
              <span>信息越完整，定位越快。</span>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

handlerError.displayName = 'handlerError'

export default handlerError
