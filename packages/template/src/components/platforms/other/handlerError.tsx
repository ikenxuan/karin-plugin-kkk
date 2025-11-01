import { AlertCircle, Clock, FileText, Terminal } from 'lucide-react'
import React from 'react'
import { FaBug } from 'react-icons/fa6'

import { type ApiErrorProps, type BusinessError, PLATFORM_CONFIG } from '../../../types/ohter/handlerError'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 使用种子生成伪随机数（确保每次渲染一致）
 */
const seededRandom = (seed: number) => {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

/**
 * 生成随机分布的 Bug 图标位置
 */
const generateBugPositions = (count: number) => {
  const seed = Date.now() + Math.random() * 10000
  const random = seededRandom(seed)
  const positions = []

  for (let i = 0; i < count; i++) {
    positions.push({
      top: `${random() * 100}%`,
      left: `${random() * 100}%`,
      size: 50 + random() * 30, // 50-80px
      rotation: random() * 360 - 180, // -180 到 180 度
      opacity: 10 + random() * 10 // 10-20 的透明度
    })
  }

  return positions
}

/**
 * 解析ANSI颜色代码并转换为内联样式，保留换行符和空格格式
 * @param text 包含ANSI颜色代码的文本
 * @returns 解析后的JSX元素数组
 */
const parseAnsiColors = (text: string): React.ReactNode[] => {
  // ANSI颜色代码映射 - 使用实际颜色值而非Tailwind类
  const colorMap: { [key: string]: string } = {
    '30': '#000000',
    '31': '#f31260', // danger
    '32': '#17c964', // success
    '33': '#f5a524', // warning
    '34': '#006FEE', // primary
    '35': '#7828c8', // secondary
    '36': '#45d4ff',
    '37': '#d4d4d8',
    '90': '#a1a1aa',
    '91': '#ff6090',
    '92': '#7ee7b7',
    '93': '#fbbf24',
    '94': '#3b9eff',
    '95': '#a855f7',
    '96': '#67e8f9',
    '97': '#f4f4f5'
  }

  const ansiRegex = /\u001b\[(\d+)m/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let currentColor = ''
  let match

  while ((match = ansiRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textPart = text.slice(lastIndex, match.index)
      const formattedText = textPart.replace(/\\n/g, '\n')
      if (currentColor) {
        parts.push(
          <span key={`${lastIndex}-${match.index}`} style={{ color: currentColor }}>
            {formattedText}
          </span>
        )
      } else {
        parts.push(formattedText)
      }
    }

    const colorCode = match[1]
    if (colorCode === '39' || colorCode === '0') {
      currentColor = ''
    } else if (colorMap[colorCode]) {
      currentColor = colorMap[colorCode]
    }

    lastIndex = ansiRegex.lastIndex
  }

  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex)
    const formattedText = remainingText.replace(/\\n/g, '\n')
    if (currentColor) {
      parts.push(
        <span key={`${lastIndex}-end`} style={{ color: currentColor }}>
          {formattedText}
        </span>
      )
    } else {
      parts.push(formattedText)
    }
  }

  return parts.length > 0 ? parts : [text.replace(/\\n/g, '\n')]
}

/**
 * 错误头部组件
 * @param props 组件属性
 * @returns JSX元素
 */
const ErrorHeader: React.FC<{
  type: 'api_error' | 'internal_error' | 'business_error'
  platform: string
  method: string
  timestamp: string
  businessName?: string
}> = ({ platform, method, timestamp, businessName }) => {
  const platformConfig = PLATFORM_CONFIG[platform as keyof typeof PLATFORM_CONFIG] || PLATFORM_CONFIG.unknown
  const displayMethod = businessName || method

  return (
    <div className='w-full max-w-[1440px] mx-auto px-20 py-20'>
      <div className='border-l-4 border-danger pl-12'>
        <div className='flex items-start gap-6 mb-10'>
          <AlertCircle className='w-16 h-16 text-danger mt-2' />
          <div className='flex-1'>
            <h1 className='text-8xl font-bold text-foreground mb-6'>
              执行失败
            </h1>
            <div className='flex items-center gap-4 mb-4'>
              <span className='text-5xl font-semibold text-danger'>
                {displayMethod}
              </span>
              <span className='text-3xl text-default-400'>·</span>
              <span className='text-3xl text-default-500'>
                {platformConfig.displayName}
              </span>
            </div>
            <div className='flex items-center gap-3 text-default-400'>
              <Clock className='w-8 h-8' />
              <span className='text-3xl font-medium'>
                {new Date(timestamp).toLocaleString('zh-CN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 业务错误详情组件
 * @param props 组件属性
 * @returns JSX元素
 */
const BusinessErrorDetails: React.FC<{
  error: BusinessError
  logs?: string | string[]
  triggerCommand?: string
}> = ({ error, logs, triggerCommand }) => {
  return (
    <div className='w-full max-w-[1440px] mx-auto px-20 py-8'>
      <div className='space-y-12'>
        {/* 触发命令信息 */}
        {triggerCommand && (
          <div className='border-l-2 border-default-200 pl-8'>
            <h3 className='flex items-center gap-3 mb-8 text-4xl font-medium text-foreground'>
              <Terminal className='w-10 h-10' />
              触发命令
            </h3>
            <div className='font-bold p-10 rounded-lg'>
              <pre className='text-3xl leading-relaxed whitespace-pre-wrap break-all select-text text-foreground font-mono'>
                {triggerCommand}
              </pre>
            </div>
          </div>
        )}

        {/* 调用栈信息 */}
        <div className='border-l-2 border-danger pl-8'>
          <h3 className='flex items-center gap-3 mb-6 text-3xl font-medium text-foreground'>
            <AlertCircle className='w-8 h-8' />
            错误堆栈
          </h3>
          <div className='bg-danger/5 p-8 rounded-lg border border-danger/20'>
            <pre className='text-xl leading-relaxed whitespace-pre-wrap break-all select-text text-danger-700 font-mono'>
              {String(error.stack || '')}
            </pre>
          </div>
        </div>

        {/* 相关日志 */}
        {logs && (typeof logs === 'string' ? logs.length > 0 : logs.length > 0) && (
          <div className='border-l-2 border-default-200 pl-8'>
            <h3 className='flex items-center gap-3 mb-6 text-3xl font-medium text-foreground'>
              <FileText className='w-8 h-8' />
              执行日志
            </h3>
            <div className='p-8 rounded-lg border border-default-200'>
              <div className='space-y-4'>
                {typeof logs === 'string' ? (
                  logs.split('\n\n').map((logSection, index) => {
                    const parsedLog = parseAnsiColors(logSection)
                    return (
                      <div key={index} className='font-mono text-xl leading-relaxed whitespace-pre-wrap break-all select-text'>
                        {parsedLog.length > 0 ? parsedLog : logSection}
                      </div>
                    )
                  })
                ) : (
                  logs.map((log, index) => {
                    const parsedLog = parseAnsiColors(log)
                    return (
                      <div key={index} className='font-mono text-xl leading-relaxed whitespace-pre-wrap break-all select-text'>
                        {parsedLog.length > 0 ? parsedLog : log}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * API错误显示组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const handlerError: React.FC<Omit<ApiErrorProps, 'templateType' | 'templateName'>> = (props) => {
  const { data } = props
  const { type, platform, error, method, timestamp, logs, triggerCommand, frameworkVersion, pluginVersion } = data
  const isBusinessError = type === 'business_error'
  const businessError = isBusinessError ? error as BusinessError : null

  // 生成随机分布的小图标位置
  const bugPositions = React.useMemo(() => generateBugPositions(25), [])

  return (
    <DefaultLayout {...props}>
      {/* 背景装饰 Bug 图标 */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none' style={{ zIndex: 0 }}>
        {/* 主要大图标 */}
        <FaBug
          className='absolute text-danger/10'
          style={{
            width: '50vw',
            height: '50vw',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)'
          }}
        />

        {/* 随机分布的小图标 */}
        {bugPositions.map((pos, index) => (
          <FaBug
            key={index}
            className='absolute'
            style={{
              width: `${pos.size}px`,
              height: `${pos.size}px`,
              top: pos.top,
              left: pos.left,
              transform: `rotate(${pos.rotation}deg)`,
              color: `rgba(243, 18, 96, ${pos.opacity / 100})`
            }}
          />
        ))}
      </div>

      <div className='relative' style={{ zIndex: 1 }}>
        <div className='h-[60px]' />

        <ErrorHeader
          type={type}
          platform={platform}
          method={method}
          timestamp={timestamp}
          businessName={businessError?.businessName}
        />

        <BusinessErrorDetails
          error={businessError!}
          logs={logs}
          triggerCommand={triggerCommand}
        />

        {/* 版本信息和底部提示 */}
        <div className='w-full max-w-[1440px] mx-auto px-20 py-16 space-y-8'>
          {/* 版本信息 */}
          <div className='flex items-center gap-8 text-default-400 text-3xl'>
            <span>框架版本：<span className='font-bold text-foreground'>{frameworkVersion}</span></span>
            <span>·</span>
            <span>插件版本：<span className='font-bold text-foreground'>{pluginVersion}</span></span>
          </div>

          {/* 底部提示 */}
          <div className='border-l-2 border-primary pl-8'>
            <p className='text-3xl text-default-600 leading-relaxed'>
              遇到问题了？请将<span className='text-primary font-semibold'>完整的错误截图</span>发送给开发者，这将帮助我们快速定位并解决问题。您可以通过以下方式联系：
            </p>
            <div className='mt-6 space-y-3'>
              <p className='text-3xl text-default-500'>
                · 提交 <span className='text-primary font-semibold'>GitHub Issues</span>
              </p>
              <p className='text-3xl text-default-500'>
                · 加入 QQ 群：<span className='text-primary font-semibold font-mono'>795874649</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

handlerError.displayName = 'handlerError'

export default handlerError