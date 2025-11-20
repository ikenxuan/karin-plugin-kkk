import { Chip } from '@heroui/react'
import AnsiToHtml from 'ansi-to-html'
import { AlertCircle, Clock, FileText, Plug2, Terminal } from 'lucide-react'
import React from 'react'
import { FaBug, FaCodeBranch, FaCube, FaLayerGroup } from 'react-icons/fa6'
import { MdAccessTime } from 'react-icons/md'

import { type ApiErrorProps, type BusinessError, type LogEntry, type LogLevel } from '../../../types/ohter/handlerError'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * ANSI 转 HTML 转换器实例
 */
const ansiConverter = new AnsiToHtml({
  fg: 'text-default-900',
  newline: false,
  escapeXML: true,
  stream: false
})

/**
 * 将 ANSI 颜色代码转换为 HTML
 */
const convertAnsiToHtml = (text: string): string => {
  return ansiConverter.toHtml(text)
}

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
 * 获取日志等级对应的主题色类名
 * @param level 日志等级
 * @returns 主题色类名配置
 */
const getLogLevelTheme = (level: LogLevel): { 
  bgClass: string
  borderClass: string
  textClass: string
  iconClass: string
} => {
  const themeMap: Record<LogLevel, { 
    bgClass: string
    borderClass: string
    textClass: string
    iconClass: string
  }> = {
    'TRAC': { 
      bgClass: 'bg-default/10',
      borderClass: 'border-default/30 border-l-default',
      textClass: 'text-default-600',
      iconClass: 'text-default-500'
    },
    'DEBU': { 
      bgClass: 'bg-primary/10',
      borderClass: 'border-primary/30 border-l-primary',
      textClass: 'text-primary-600',
      iconClass: 'text-primary'
    },
    'MARK': { 
      bgClass: 'bg-secondary/10',
      borderClass: 'border-secondary/30 border-l-secondary',
      textClass: 'text-secondary-600',
      iconClass: 'text-secondary'
    },
    'INFO': { 
      bgClass: 'bg-success/10',
      borderClass: 'border-success/30 border-l-success',
      textClass: 'text-success-600',
      iconClass: 'text-success'
    },
    'WARN': { 
      bgClass: 'bg-warning/10',
      borderClass: 'border-warning/30 border-l-warning',
      textClass: 'text-warning-600',
      iconClass: 'text-warning'
    },
    'ERRO': { 
      bgClass: 'bg-danger/10',
      borderClass: 'border-danger/30 border-l-danger',
      textClass: 'text-danger-600',
      iconClass: 'text-danger'
    },
    'FATA': { 
      bgClass: 'bg-danger/15',
      borderClass: 'border-danger/40 border-l-danger',
      textClass: 'text-danger-700',
      iconClass: 'text-danger-700'
    }
  }
  return themeMap[level] || themeMap['TRAC']
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
  logs?: LogEntry[]
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
              <pre 
                className='text-3xl leading-relaxed whitespace-pre-wrap break-all select-text font-[HarmonyOSHans-Regular]'
                dangerouslySetInnerHTML={{ __html: convertAnsiToHtml(triggerCommand) }}
              />
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
        {logs && logs.length > 0 && (
          <div className='border-l-2 border-default-200 pl-8'>
            <h3 className='flex items-center gap-3 mb-6 text-3xl font-medium text-foreground'>
              <FileText className='w-8 h-8' />
              相关执行日志
            </h3>
            <div className='space-y-3'>
              {logs.map((log, index) => {
                const theme = getLogLevelTheme(log.level)
                return (
                  <div 
                    key={index} 
                    className={`relative rounded-lg border border-l-4 ${theme.bgClass} ${theme.borderClass}`}
                  >
                    <div className='flex items-start gap-4 p-5'>
                      {/* 左侧 */}
                      <div className='flex-1 min-w-0 space-y-2'>
                        {/* 时间戳 */}
                        <div className='flex items-center gap-2'>
                          <Clock size={22} className={`flex-shrink-0 mb-1 ${theme.iconClass}`} />
                          <span className={`text-xl font-mono font-semibold ${theme.textClass}`}>
                            {log.timestamp}
                          </span>
                        </div>

                        {/* 日志消息 */}
                        <div 
                          className='font-mono text-xl leading-relaxed whitespace-pre-wrap break-all select-text text-foreground'
                          dangerouslySetInnerHTML={{ __html: convertAnsiToHtml(log.message) }}
                        />
                      </div>

                      {/* 右侧 */}
                      <div className='flex-shrink-0 flex items-center'>
                        <span className={`font-black text-6xl tracking-tight uppercase opacity-15 ${theme.textClass}`}>
                          {log.level}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
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
          <div className='border-l-2 text-default-400 border-primary pl-8'>
            <p className='text-3xl leading-relaxed mb-6 text-foreground'>
              需要帮助？请提供以下信息以便开发者快速定位问题：
            </p>
            <div className='space-y-4 mb-8'>
              <div className='flex items-baseline gap-3'>
                <span className='text-primary font-bold text-3xl flex-shrink-0'>1.</span>
                <p className='text-3xl leading-relaxed flex-1'>
                  <span className='text-primary font-semibold'>完整的错误截图</span> - 包含本页面所有内容（错误堆栈、执行日志、版本信息等）
                </p>
              </div>
              <div className='flex items-baseline gap-3'>
                <span className='text-primary font-bold text-3xl flex-shrink-0'>2.</span>
                <p className='text-3xl leading-relaxed flex-1'>
                  <span className='text-primary font-semibold'>问题复现步骤</span> - 详细描述触发错误的操作流程和环境信息
                </p>
              </div>
            </div>
            <div className='border-t border-default-200 pt-6'>
              <p className='text-3xl leading-relaxed mb-4 text-foreground'>
                联系方式：
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
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

handlerError.displayName = 'handlerError'

export default handlerError