import { Chip, Code } from '@heroui/react'
import { AlertCircle, Clock, FileText, Plug2, Terminal } from 'lucide-react'
import React from 'react'
import { FaBug, FaCodeBranch, FaCube, FaLayerGroup } from 'react-icons/fa6'
import { MdAccessTime } from 'react-icons/md'

import { type ApiErrorProps, type BusinessError } from '../../../types/ohter/handlerError'
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
}> = ({ method, timestamp, businessName }) => {
  const displayMethod = businessName || method

  return (
    <div className='w-full max-w-[1440px] mx-auto px-20 py-20'>
      <div className='border-l-4 border-danger pl-12'>
        <div className='flex items-start gap-6 mb-10'>
          {/* <AlertCircle className='w-16 h-16 text-danger mt-2' /> */}
          <img className='w-30 h-auto' src="/image/流泪.png" />
          <div className='flex-1'>
            <h1 className='text-8xl font-bold text-foreground mb-6'>
              哎呀！出错了 ~
            </h1>
            <div className='flex items-center gap-4 mb-8'>
              <span className='text-5xl font-semibold text-danger'>
                {displayMethod}
              </span>
            </div>
            {/* 触发时间 */}
            <div className='mt-2'>
              <div className='text-3xl text-default-400 mb-2'>触发时间</div>
              <div className='flex items-center gap-3'>
                <Clock className='w-10 h-10 text-warning' />
                <span className='text-4xl font-bold text-foreground'>
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
              <pre className='text-3xl leading-relaxed whitespace-pre-wrap break-all select-text font-[HarmonyOSHans-Regular]'>
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
              调用解析库
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
  const { type, platform, error, method, timestamp, logs, triggerCommand, frameworkVersion, pluginVersion, adapterInfo } = data
  const isBusinessError = type === 'business_error'
  const businessError = isBusinessError ? error as BusinessError : null

  // 生成随机分布的小图标位置
  const bugPositions = React.useMemo(() => generateBugPositions(50), [])

  return (
    <DefaultLayout {...props}>
      {/* 背景装饰 Bug 图标 */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none' style={{ zIndex: 0 }}>
        {/* 主要大图标 */}
        {/* <FaBug
          className='absolute text-danger/10'
          style={{
            width: '50vw',
            height: '50vw',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)'
          }}
        /> */}

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
          {/* 版本信息 - 重点突出 */}
          <div className='space-y-5'>
            {/* 框架版本和插件版本 */}
            <div className='flex items-center gap-12'>
              <div className='flex items-center gap-4'>
                <FaLayerGroup className='w-9 h-9 text-primary' />
                <div>
                  <div className='text-2xl text-default-400'>框架版本</div>
                  <div className='text-4xl font-bold text-foreground'>{frameworkVersion}</div>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <FaCube className='w-9 h-9 text-success' />
                <div>
                  <div className='text-2xl text-default-400'>插件版本</div>
                  <div className='text-4xl font-bold text-foreground'>{pluginVersion}</div>
                </div>
              </div>
            </div>

            {/* 适配器信息 */}
            {adapterInfo && (
              <div className='flex items-center gap-4'>
                <Plug2 className='w-9 h-9 text-secondary' />
                <div>
                  <div className='text-2xl text-default-400'>适配器</div>
                  <div className='text-4xl font-bold text-foreground'>
                    <span className='relative inline-block pr-24'>
                      {adapterInfo.name}
                      <Chip 
                        color='secondary' 
                        variant='flat' 
                        size='lg'
                        className='absolute bottom-5 left-70 ml-2 align-super scale-120'
                      >
                        <span className='font-bold'>v{adapterInfo.version}</span>
                      </Chip>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 次要信息 - 弱化显示 */}
            <div className='pt-3 border-t border-default-200 space-y-2'>
              {data.buildTime && (
                <div className='flex items-center gap-2 text-2xl text-default-400'>
                  <MdAccessTime className='w-5 h-5' />
                  <span>插件编译于 {data.buildTime}</span>
                </div>
              )}
              {data.commitHash && (
                <div className='flex items-center gap-2 text-2xl text-default-400'>
                  <FaCodeBranch className='w-5 h-5' />
                  <span>Commit {data.commitHash}</span>
                </div>
              )}
            </div>
          </div>

          {/* 底部提示 */}
          <div className='border-l-2 text-default-400 border-warning pl-8'>
            <p className='text-3xl leading-relaxed mb-6'>
              遇到问题了？为了帮助开发者快速定位并解决问题，请提供以下信息：
            </p>
            <div className='space-y-4 mb-8'>
              <div className='flex items-start gap-3'>
                <span className='text-warning font-bold text-3xl'>1.</span>
                <p className='text-3xl leading-relaxed flex-1'>
                  <span className='text-warning font-semibold'>完整的错误截图</span>（包含本页面所有内容）
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-warning font-bold text-3xl'>2.</span>
                <p className='text-3xl leading-relaxed flex-1'>
                  <span className='text-warning font-semibold'>
                    DEBUG 等级的完整日志
                  </span>
                  {' '}- 当前页面显示的日志是自动捕获的，可能不包含关键的调试信息。请在配置文件中将日志等级设置为{' '}
                  <Code 
                    color='warning'
                    size='lg'
                    radius='md'
                    className='font-mono inline-flex items-center mx-1 -translate-y-[6px]'
                  >
                    DEBUG
                  </Code>
                  {' '}，重现问题后提供完整日志
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-warning font-bold text-3xl'>3.</span>
                <p className='text-3xl leading-relaxed flex-1'>
                  <span className='text-warning font-semibold'>问题复现步骤</span> - 详细描述触发错误的操作流程
                </p>
              </div>
            </div>
            <div className='border-t border-default-200 pt-6'>
              <p className='text-3xl leading-relaxed mb-4'>
                您可以通过以下方式联系我们：
              </p>
              <div className='space-y-3'>
                <p className='text-3xl'>
                  · 提交 <span className='text-primary font-semibold'>GitHub Issues</span>（推荐）
                </p>
                <p className='text-3xl'>
                  · 加入 QQ 群：<span className='text-primary font-semibold'>795874649</span>
                </p>
              </div>
            </div>
            <div className='mt-6 p-6 bg-warning/10 rounded-lg border border-warning/30'>
              <p className='text-2xl text-warning-700 leading-relaxed'>
                💡 提示：仅凭此页面的信息可能无法完全定位错误根源，DEBUG 日志能提供更详细的执行流程和变量状态，大大提高问题解决效率。
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