import { Chip } from '@heroui/react'
import { AlertCircle, Clock, FileText, Plug2, QrCode, Terminal } from 'lucide-react'
import React from 'react'
import { FaCodeBranch } from 'react-icons/fa6'
import { MdAccessTime } from 'react-icons/md'

import type { ApiErrorProps, BusinessError, LogLevel } from '../../../types/platforms/ohter/handlerError'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { getRandomErrorTitle } from './errorTitles'

/**
 * ANSI 颜色代码映射
 */
const ansiColorMap: Record<number, string> = {
  30: 'text-default-900', 31: 'text-danger', 32: 'text-success', 33: 'text-warning',
  34: 'text-primary', 35: 'text-secondary', 36: 'text-cyan-600', 37: 'text-default-500',
  90: 'text-default-600', 91: 'text-danger', 92: 'text-success', 93: 'text-warning',
  94: 'text-primary', 95: 'text-secondary', 96: 'text-default-500', 97: 'text-default-200'
}

const ansi256ToColor = (colorCode: number): string => {
  const standardColors = [
    '#000000', '#800000', '#008000', '#808000', '#000080', '#800080', '#008080', '#c0c0c0',
    '#808080', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff'
  ]
  if (colorCode < 16) return standardColors[colorCode]
  if (colorCode < 232) {
    const index = colorCode - 16
    const r = Math.floor(index / 36), g = Math.floor((index % 36) / 6), b = index % 6
    const toHex = (v: number) => (v === 0 ? 0 : 55 + v * 40).toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }
  const gray = (colorCode - 232) * 10 + 8
  const hex = gray.toString(16).padStart(2, '0')
  return `#${hex}${hex}${hex}`
}

const convertAnsiToHtml = (text: string): string => {
  const ansiRegex = /\x1b\[([0-9;]+)m/g
  let result = '', lastIndex = 0
  let currentStyles: { classes: string[], inlineColor?: string } = { classes: [] }
  let match

  const escapeHtml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
  const makeSpan = (content: string) => {
    const hasClass = currentStyles.classes.length > 0, hasInline = currentStyles.inlineColor
    if (!hasClass && !hasInline) return escapeHtml(content)
    const classAttr = hasClass ? ` class="${currentStyles.classes.join(' ')}"` : ''
    const styleAttr = hasInline ? ` style="color: ${currentStyles.inlineColor}"` : ''
    return `<span${classAttr}${styleAttr}>${escapeHtml(content)}</span>`
  }

  while ((match = ansiRegex.exec(text)) !== null) {
    if (match.index > lastIndex) result += makeSpan(text.substring(lastIndex, match.index))
    const codes = match[1].split(';').map(Number)
    let i = 0
    while (i < codes.length) {
      const code = codes[i]
      if (code === 90 && codes[i + 1] === 2) {
        currentStyles.classes = currentStyles.classes.filter(c => !c.startsWith('text-'))
        currentStyles.inlineColor = undefined
        currentStyles.classes.push('text-default-400')
        i++
      } else if (code === 0 || code === 39 || code === 49) {
        currentStyles.classes = currentStyles.classes.filter(c => !c.startsWith('text-') && !c.startsWith('bg-') && !c.startsWith('dark:'))
        currentStyles.inlineColor = undefined
      } else if (code === 1) {
        if (!currentStyles.classes.includes('font-bold')) currentStyles.classes.push('font-bold')
      } else if (code === 22) {
        currentStyles.classes = currentStyles.classes.filter(c => c !== 'font-bold')
      } else if (code === 38 && codes[i + 1] === 5) {
        const colorCode = codes[i + 2]
        if (colorCode !== undefined) {
          currentStyles.classes = currentStyles.classes.filter(c => !c.startsWith('text-') && !c.startsWith('dark:'))
          currentStyles.inlineColor = ansi256ToColor(colorCode)
          i += 2
        }
      } else if (ansiColorMap[code]) {
        currentStyles.classes = currentStyles.classes.filter(c => !c.startsWith('text-') && !c.startsWith('dark:'))
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

const getLogLevelTheme = (level: LogLevel, isDark: boolean): { bgClass: string; borderClass: string; textClass: string; iconClass: string } => {
  const themeMap: Record<LogLevel, { bgClass: string; borderClass: string; textClass: string; iconClass: string }> = {
    'TRAC': { bgClass: isDark ? 'bg-default/10' : 'bg-default/5', borderClass: 'border-default/20', textClass: isDark ? 'text-default-400' : 'text-default-500', iconClass: 'text-default-400' },
    'DEBU': { bgClass: isDark ? 'bg-primary/15' : 'bg-primary/5', borderClass: 'border-primary/25', textClass: 'text-primary', iconClass: 'text-primary' },
    'MARK': { bgClass: isDark ? 'bg-secondary/15' : 'bg-secondary/5', borderClass: 'border-secondary/25', textClass: 'text-secondary', iconClass: 'text-secondary' },
    'INFO': { bgClass: isDark ? 'bg-success/15' : 'bg-success/5', borderClass: 'border-success/25', textClass: 'text-success', iconClass: 'text-success' },
    'WARN': { bgClass: isDark ? 'bg-warning/15' : 'bg-warning/5', borderClass: 'border-warning/25', textClass: 'text-warning', iconClass: 'text-warning' },
    'ERRO': { bgClass: isDark ? 'bg-danger/15' : 'bg-danger/5', borderClass: 'border-danger/25', textClass: 'text-danger', iconClass: 'text-danger' },
    'FATA': { bgClass: isDark ? 'bg-danger/20' : 'bg-danger/10', borderClass: 'border-danger/35', textClass: 'text-danger', iconClass: 'text-danger' }
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
    if (nameLower.includes(key)) return <img src={logoPath} className='h-16 w-auto' alt={adapterName} />
  }
  return <Plug2 className='w-14 h-14 text-default-400' />
}

/**
 * API错误显示组件 - 手机端 Apple 风格
 */
export const handlerError: React.FC<Omit<ApiErrorProps, 'templateType' | 'templateName'>> = (props) => {
  const { data, qrCodeDataUrl } = props
  const isDark = data.useDarkTheme === true
  const isBusinessError = data.type === 'business_error'
  const businessError = isBusinessError ? data.error as BusinessError : null
  const displayMethod = businessError?.businessName || data.method
  const errorTitle = React.useMemo(() => getRandomErrorTitle(), [])

  // 631 配色 - 红/珊瑚色系
  const bgColor = isDark ? '#0f0a0a' : '#faf5f5'
  const primaryColor = isDark ? '#f87171' : '#dc2626'
  const secondaryColor = isDark ? '#fca5a5' : '#b91c1c'
  const mutedColor = isDark ? 'rgba(248,113,113,0.7)' : '#991b1b'
  const accentColor = isDark ? '#fecaca' : '#7f1d1d'

  return (
    <DefaultLayout
      {...props}
      version={undefined}
      className='relative overflow-hidden'
      style={{ backgroundColor: bgColor, width: '1440px', minHeight: '1800px' }}
    >
      {/* 弥散光背景 - 深浅模式完全适配 */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* 左上主光斑 */}
        <div
          className='absolute rounded-full w-[1200px] h-[1400px] -top-[300px] -left-[200px] blur-[120px] -rotate-15'
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 40% 40%, rgba(220,38,38,0.35) 0%, rgba(185,28,28,0.18) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 40% 40%, rgba(248,113,113,0.45) 0%, rgba(252,165,165,0.22) 50%, transparent 100%)'
          }}
        />
        {/* 右侧光斑 */}
        <div
          className='absolute rounded-full w-[900px] h-[1000px] top-[400px] -right-[100px] blur-[100px] rotate-20'
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 50% 50%, rgba(127,29,29,0.3) 0%, rgba(69,10,10,0.15) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(254,202,202,0.4) 0%, rgba(254,226,226,0.2) 50%, transparent 100%)'
          }}
        />
        {/* 底部光斑 */}
        <div
          className='absolute rounded-full w-[1000px] h-[800px] -bottom-[200px] left-[200px] blur-[140px] -rotate-10'
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 50% 60%, rgba(153,27,27,0.3) 0%, rgba(127,29,29,0.15) 50%, transparent 100%)'
              : 'radial-gradient(ellipse at 50% 60%, rgba(252,165,165,0.35) 0%, rgba(254,202,202,0.18) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* 单色噪点层 - 明显颗粒感 */}
      <div className='absolute inset-0 pointer-events-none' style={{ opacity: isDark ? 0.12 : 0.18 }}>
        <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
          <filter id='errorPixelNoise' x='0%' y='0%' width='100%' height='100%'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch' result='noise' />
            <feColorMatrix type='saturate' values='0' result='gray' />
            <feComponentTransfer>
              <feFuncR type='discrete' tableValues='0 1' />
              <feFuncG type='discrete' tableValues='0 1' />
              <feFuncB type='discrete' tableValues='0 1' />
            </feComponentTransfer>
          </filter>
          <rect width='100%' height='100%' filter='url(#errorPixelNoise)' />
        </svg>
      </div>

      {/* 背景大字装饰 */}
      <div className='absolute bottom-[80px] right-[60px] pointer-events-none select-none opacity-[0.03]'>
        <span className='text-[180px] font-black tracking-tighter leading-none block text-right' style={{ color: isDark ? '#fff' : '#7f1d1d' }}>
          ERROR
        </span>
      </div>

      {/* 内容层 - 手机端大字体大间距 */}
      <div className='relative z-10 flex flex-col h-full p-16'>
        {/* 顶部状态栏 */}
        <div className='flex items-center justify-between mb-14'>
          <div className='flex items-center gap-5'>
            <div className='w-5 h-5 rounded-full' style={{ backgroundColor: primaryColor }} />
            <span className='text-2xl font-medium tracking-[0.3em] uppercase' style={{ color: mutedColor }}>
              Runtime Exception
            </span>
          </div>
          <span className='text-2xl' style={{ color: mutedColor }}>
            {new Date(data.timestamp).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
        </div>

        {/* 主标题 - 手机端超大字 */}
        <div className='mb-20'>
          <h1 className='text-[120px] font-black leading-none tracking-tight mb-10' style={{ color: accentColor }}>
            {errorTitle}
          </h1>
          <p className='text-5xl font-semibold' style={{ color: primaryColor }}>{displayMethod}</p>
        </div>

        {/* 验证二维码 */}
        {data.isVerification && qrCodeDataUrl && (
          <div
            className='mb-16 p-12 rounded-[40px]'
            style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.6)' }}
          >
            <div className='flex items-center gap-6 mb-10'>
              <QrCode className='w-10 h-10 text-warning' />
              <span className='text-3xl font-semibold' style={{ color: accentColor }}>人机验证</span>
            </div>
            <div className='flex gap-16 items-center'>
              <img src={qrCodeDataUrl} alt='验证二维码' className='w-64 h-64 rounded-3xl' />
              <div className='space-y-6'>
                <p className='text-3xl' style={{ color: secondaryColor }}>请在 120 秒内完成验证</p>
                <ol className='space-y-4 text-2xl' style={{ color: mutedColor }}>
                  <li>1. 使用手机扫描二维码</li>
                  <li>2. 在网页中完成人机验证</li>
                  <li>3. 将验证结果发送至此对话</li>
                </ol>
                {data.verificationUrl && <p className='text-xl break-all mt-8' style={{ color: mutedColor }}>{data.verificationUrl}</p>}
              </div>
            </div>
          </div>
        )}

        {/* 触发命令 */}
        {data.triggerCommand && (
          <div className='mb-14'>
            <div className='flex items-center gap-5 mb-6'>
              <Terminal className='w-9 h-9' style={{ color: mutedColor }} />
              <span className='text-xl font-semibold tracking-[0.2em] uppercase' style={{ color: mutedColor }}>Trigger Command</span>
            </div>
            <div
              className='p-10 rounded-[36px]'
              style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)' }}
            >
              <pre
                className='text-3xl leading-relaxed whitespace-pre-wrap break-all font-mono'
                style={{ color: accentColor }}
                dangerouslySetInnerHTML={{ __html: convertAnsiToHtml(data.triggerCommand) }}
              />
            </div>
          </div>
        )}

        {/* 错误堆栈 */}
        <div className='mb-14'>
          <div className='flex items-center gap-5 mb-6'>
            <AlertCircle className='w-9 h-9' style={{ color: primaryColor }} />
            <span className='text-xl font-semibold tracking-[0.2em] uppercase' style={{ color: mutedColor }}>Stack Trace</span>
          </div>
          <div
            className='p-10 rounded-[36px]'
            style={{
              backgroundColor: isDark ? 'rgba(220,38,38,0.1)' : 'rgba(254,202,202,0.4)',
              border: `1px solid ${isDark ? 'rgba(248,113,113,0.2)' : 'rgba(252,165,165,0.5)'}`
            }}
          >
            <pre
              className='text-2xl leading-relaxed whitespace-pre-wrap break-all font-mono'
              style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(127,29,29,0.9)' }}
              dangerouslySetInnerHTML={{ __html: convertAnsiToHtml(String(businessError?.stack || data.error?.stack || '')) }}
            />
          </div>
        </div>

        {/* 执行日志 */}
        {data.logs && data.logs.length > 0 && (
          <div className='mb-14'>
            <div className='flex items-center gap-5 mb-6'>
              <FileText className='w-9 h-9' style={{ color: mutedColor }} />
              <span className='text-xl font-semibold tracking-[0.2em] uppercase' style={{ color: mutedColor }}>Execution Logs</span>
            </div>
            <div className='space-y-6'>
              {data.logs.map((log, index) => {
                const theme = getLogLevelTheme(log.level, isDark)
                // 日志等级半透明颜色
                const levelColor = theme.textClass.includes('danger') ? (isDark ? 'rgba(248,113,113,0.1)' : 'rgba(220,38,38,0.07)') :
                  theme.textClass.includes('warning') ? (isDark ? 'rgba(251,191,36,0.1)' : 'rgba(245,158,11,0.07)') :
                    theme.textClass.includes('success') ? (isDark ? 'rgba(34,197,94,0.1)' : 'rgba(22,163,74,0.07)') :
                      theme.textClass.includes('primary') ? (isDark ? 'rgba(59,130,246,0.1)' : 'rgba(37,99,235,0.07)') :
                        theme.textClass.includes('secondary') ? (isDark ? 'rgba(168,85,247,0.1)' : 'rgba(147,51,234,0.07)') :
                          (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)')
                // 边框颜色
                const borderColor = theme.textClass.includes('danger') ? (isDark ? 'rgba(248,113,113,0.3)' : 'rgba(220,38,38,0.2)') :
                  theme.textClass.includes('warning') ? (isDark ? 'rgba(251,191,36,0.3)' : 'rgba(245,158,11,0.2)') :
                    theme.textClass.includes('success') ? (isDark ? 'rgba(34,197,94,0.3)' : 'rgba(22,163,74,0.2)') :
                      theme.textClass.includes('primary') ? (isDark ? 'rgba(59,130,246,0.3)' : 'rgba(37,99,235,0.2)') :
                        theme.textClass.includes('secondary') ? (isDark ? 'rgba(168,85,247,0.3)' : 'rgba(147,51,234,0.2)') :
                          (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)')
                
                return (
                  <fieldset 
                    key={index} 
                    className={`relative rounded-3xl ${theme.bgClass} border-2 p-6`}
                    style={{ borderColor }}
                  >
                    {/* 时间戳 - legend 自动切割边框 */}
                    <legend className='flex items-center gap-2 ml-4'>
                      {/* 左侧圆角装饰 */}
                      <span 
                        className='w-3 h-3 rounded-full -mr-1.5'
                        style={{ backgroundColor: borderColor }}
                      />
                      <span className='flex items-center gap-2 px-3'>
                        <Clock size={18} className={theme.iconClass} />
                        <span className={`text-xl font-mono font-medium ${theme.textClass}`}>{log.timestamp}</span>
                      </span>
                      {/* 右侧圆角装饰 */}
                      <span 
                        className='w-3 h-3 rounded-full -ml-1.5'
                        style={{ backgroundColor: borderColor }}
                      />
                    </legend>
                    
                    {/* 日志等级 - 右下角大字半透明 */}
                    <div className='absolute bottom-2 right-6 pointer-events-none'>
                      <span className='text-[56px] font-black uppercase leading-none tracking-tight' style={{ color: levelColor }}>
                        {log.level}
                      </span>
                    </div>
                    
                    {/* 日志内容 */}
                    <div
                      className='relative z-1 text-2xl font-mono whitespace-pre-wrap break-all leading-relaxed'
                      style={{ color: isDark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.82)' }}
                      dangerouslySetInnerHTML={{ __html: convertAnsiToHtml(log.message) }}
                    />
                  </fieldset>
                )
              })}
            </div>
          </div>
        )}

        {/* 底部版本信息 */}
        <div
          className='mt-auto pt-12'
          style={{ borderTop: `2px solid ${isDark ? 'rgba(248,113,113,0.15)' : 'rgba(252,165,165,0.3)'}` }}
        >
          {/* 版本信息网格 */}
          <div className='grid grid-cols-2 gap-10 mb-12'>
            <div className='flex items-center gap-6'>
              <img src='/image/frame-logo.png' className='h-16 w-auto' alt='Framework' />
              <div>
                <p className='text-xl' style={{ color: mutedColor }}>Framework</p>
                <p className='text-3xl font-bold' style={{ color: accentColor }}>{data.frameworkVersion}</p>
              </div>
            </div>

            <div className='flex items-center gap-6'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 230 221' className='h-16 w-auto' style={{ color: accentColor }}>
                <path d='M132.75,87.37l-53.72-53.37c-4.66-4.63-1.38-12.58,5.18-12.58h115.13c6.57,0,9.84,7.95,5.18,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z' fill='currentColor' />
                <path d='M28.49,186.89l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39h-51.42c-7.04-.02-12.94-5.72-12.96-12.76Z' fill='currentColor' />
                <path d='M41.54,23.68l163.04,163.05c4.78,4.78,1.39,12.95-5.36,12.94h-47.88c-9.69,0-18.99-3.86-25.84-10.71L39.3,102.75c-6.85-6.85-10.7-16.15-10.7-25.84V29.04c0-6.76,8.16-10.14,12.94-5.36Z' fill='currentColor' />
              </svg>
              <div>
                <p className='text-xl' style={{ color: mutedColor }}>Plugin</p>
                <p className='text-3xl font-bold' style={{ color: accentColor }}>{data.pluginVersion}</p>
              </div>
            </div>

            {data.amagiVersion && (
              <div className='flex items-center gap-6'>
                <img src='/image/other/handlerError/cxk.png' alt='Amagi' className='w-16 h-16' />
                <div>
                  <p className='text-xl' style={{ color: mutedColor }}>API Library</p>
                  <p className='text-3xl font-bold' style={{ color: accentColor }}>{data.amagiVersion}</p>
                </div>
              </div>
            )}

            {data.adapterInfo && (
              <div className='flex items-center gap-6'>
                {getAdapterLogo(data.adapterInfo.name)}
                <div>
                  <p className='text-xl' style={{ color: mutedColor }}>Adapter</p>
                  <div className='flex items-center gap-4'>
                    <p className='text-3xl font-bold' style={{ color: accentColor }}>{data.adapterInfo.name}</p>
                    <Chip size='lg' variant='flat' className='h-8 text-lg'>{data.adapterInfo.version.startsWith('v') ? data.adapterInfo.version : `v${data.adapterInfo.version}`}</Chip>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 次要信息 */}
          <div className='flex items-center gap-10 text-xl mb-12' style={{ color: mutedColor }}>
            {data.buildTime && (
              <div className='flex items-center gap-3'>
                <MdAccessTime className='w-6 h-6' />
                <span>Built {data.buildTime}</span>
              </div>
            )}
            {data.commitHash && (
              <div className='flex items-center gap-3'>
                <FaCodeBranch className='w-6 h-6' />
                <span>Commit {data.commitHash}</span>
              </div>
            )}
          </div>

          {/* 帮助提示 */}
          <div
            className='p-10 rounded-[36px]'
            style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)' }}
          >
            <p className='text-3xl font-semibold mb-5' style={{ color: accentColor }}>需要帮助？</p>
            <p className='text-2xl mb-8' style={{ color: secondaryColor }}>请提供完整的错误截图和问题复现步骤</p>
            <div className='flex items-center gap-10 text-2xl'>
              <span style={{ color: secondaryColor }}>GitHub Issues</span>
              <span style={{ color: mutedColor }}>·</span>
              <span style={{ color: secondaryColor }}>QQ 群: <span className='font-bold' style={{ color: primaryColor }}>795874649</span></span>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

handlerError.displayName = 'handlerError'

export default handlerError
