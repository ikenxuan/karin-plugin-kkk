import { AlertCircle, Clock, FileText, QrCode, Send, Terminal } from 'lucide-react'
import React from 'react'

import { type ApiErrorProps, type BusinessError, PLATFORM_CONFIG } from '../../../types/ohter/handlerError'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 解析ANSI颜色代码并转换为HTML，保留换行符和空格格式
 * @param text 包含ANSI颜色代码的文本
 * @returns 解析后的JSX元素数组
 */
const parseAnsiColors = (text: string): React.ReactNode[] => {
  // ANSI颜色代码映射 - 使用HeroUI主题色
  const colorMap: { [key: string]: string } = {
    '30': 'text-foreground', // 黑色 - 使用主题前景色
    '31': 'text-danger', // 红色
    '32': 'text-success', // 绿色
    '33': 'text-warning', // 黄色
    '34': 'text-primary', // 蓝色
    '35': 'text-secondary', // 紫色
    '36': 'text-primary-400', // 青色
    '37': 'text-default-300', // 白色
    '90': 'text-default-400', // 亮黑色（灰色）
    '91': 'text-danger-400', // 亮红色
    '92': 'text-success-400', // 亮绿色
    '93': 'text-warning-400', // 亮黄色
    '94': 'text-primary-400', // 亮蓝色
    '95': 'text-secondary-400', // 亮紫色
    '96': 'text-primary-300', // 亮青色
    '97': 'text-default-100' // 亮白色
  }

  // 匹配ANSI转义序列的正则表达式
  const ansiRegex = /\u001b\[(\d+)m/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let currentColor = ''
  let match

  while ((match = ansiRegex.exec(text)) !== null) {
    // 添加颜色代码之前的文本
    if (match.index > lastIndex) {
      const textPart = text.slice(lastIndex, match.index)
      // 保留换行符和空格，将\n转换为实际换行
      const formattedText = textPart.replace(/\\n/g, '\n')
      if (currentColor) {
        parts.push(
          <span key={`${lastIndex}-${match.index}`} className={currentColor}>
            {formattedText}
          </span>
        )
      } else {
        parts.push(formattedText)
      }
    }

    // 处理颜色代码
    const colorCode = match[1]
    if (colorCode === '39' || colorCode === '0') {
      // 重置颜色
      currentColor = ''
    } else if (colorMap[colorCode]) {
      currentColor = colorMap[colorCode]
    }

    lastIndex = ansiRegex.lastIndex
  }

  // 添加剩余的文本
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex)
    // 保留换行符和空格，将\n转换为实际换行
    const formattedText = remainingText.replace(/\\n/g, '\n')
    if (currentColor) {
      parts.push(
        <span key={`${lastIndex}-end`} className={currentColor}>
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
}> = ({ platform, method, timestamp }) => {
  const platformConfig = PLATFORM_CONFIG[platform as keyof typeof PLATFORM_CONFIG] || PLATFORM_CONFIG.unknown

  return (
    <div className='w-full max-w-[1440px] mx-auto px-20 py-16'>
      <div className='p-16 rounded-3xl bg-danger-50'>
        <div className='flex items-center mb-12'>
          <AlertCircle className='mr-6 w-16 h-16 text-danger-600' />
          <div>
            <h1 className='text-6xl font-bold text-danger-600'>
              出错了~
            </h1>
            <p className='mt-4 text-3xl text-default-600'>
              {platformConfig.displayName} - {method}
            </p>
          </div>
        </div>
        
        <div className='flex items-center'>
          <Clock className='mr-4 w-8 h-8 text-default-600' />
          <span className='text-2xl text-default-600'>
            发生时间：{new Date(timestamp).toLocaleString('zh-CN')}
          </span>
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
    <div className='w-full max-w-[1440px] mx-auto px-20 py-12'>
      <h2 className='mb-16 text-6xl font-bold text-foreground'>错误详情</h2>
      
      {/* 触发命令信息 */}
      {triggerCommand && (
        <div className='p-12 mb-16 rounded-3xl bg-content1'>
          <h3 className='flex items-center mb-8 text-4xl font-semibold text-foreground'>
            <Terminal className='mr-4 w-10 h-10' />
            触发命令
          </h3>
          <div className='p-6 rounded-2xl bg-default-100'>
            <pre className='text-2xl leading-relaxed whitespace-pre-wrap break-all select-text text-foreground-700'>
              {triggerCommand}
            </pre>
          </div>
        </div>
      )}

      <div className='p-12 mb-16 rounded-3xl bg-danger-50'>
        <h3 className='flex items-center mb-10 text-4xl font-semibold text-danger-800'>
          <Terminal className='mr-4 w-10 h-10' />
          调用栈信息
        </h3>
        <div className='p-10 rounded-2xl bg-content1'>
          <pre className='text-2xl leading-relaxed whitespace-pre-wrap break-all select-text text-foreground-700'>
            {error.stack.split('\n').map((line, index) => (
              <div key={index} className={`py-1 ${index === 0 ? 'font-semibold text-danger' : ''}`}>
                {line}
              </div>
            ))}
          </pre>
        </div>
      </div>

      {logs && (typeof logs === 'string' ? logs.length > 0 : logs.length > 0) && (
        <div className='p-12 rounded-3xl bg-content1'>
          <h3 className='flex items-center mb-10 text-4xl font-semibold text-foreground'>
            <FileText className='mr-4 w-10 h-10' />
            相关日志
          </h3>
          <div className='p-10 rounded-2xl bg-content1'>
            <div className='space-y-2'>
              {typeof logs === 'string' ? (
                logs.split('\n\n').map((logSection, index) => {
                  const parsedLog = parseAnsiColors(logSection)
                  return (
                    <div key={index} className='mb-6 font-mono text-2xl leading-relaxed whitespace-pre-wrap break-all select-text'>
                      {parsedLog.length > 0 ? parsedLog : logSection}
                    </div>
                  )
                })
              ) : (
                logs.map((log, index) => {
                  const parsedLog = parseAnsiColors(log)
                  return (
                    <div key={index} className='font-mono text-2xl leading-relaxed whitespace-pre-wrap break-all select-text'>
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
  )
}

/**
 * 二维码组件
 * @param props 组件属性
 * @returns JSX元素
 */
const QRCodeSection: React.FC<{ qrCodeDataUrl: string }> = ({ qrCodeDataUrl }) => {
  return (
    <div className='flex flex-col-reverse items-center -mb-12 mr-18'>
      <div className='flex items-center gap-2 text-[45px] text-right mt-5 text-default-500 select-text'>
        <QrCode className='w-11 h-11' />
        <span>触发命令</span>
      </div>
      <div className='p-2.5 rounded-sm border-[7px] border-dashed border-default-300'>
        <img
          src={qrCodeDataUrl}
          alt='二维码'
          className='w-[350px] h-[350px] select-text'
        />
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
  const { data, qrCodeDataUrl } = props
  const { type, platform, error, method, timestamp, logs, triggerCommand } = data
  const isBusinessError = type === 'business_error'
  const businessError = isBusinessError ? error as BusinessError : null

  return (
    <DefaultLayout {...props}>
      {/* 头部信息 */}
      <div className='h-[60px]' />
      <ErrorHeader
        type={type}
        platform={platform}
        method={method}
        timestamp={timestamp}
      />

      {/* 错误详情 */}
      <BusinessErrorDetails 
        error={businessError!} 
        logs={logs} 
        triggerCommand={triggerCommand}
      />

      {/* 底部区域：发送给开发者提示和二维码 */}
      <div className='w-full max-w-[1440px] mx-auto px-20 py-12'>
        <div className='flex justify-between items-center'>
          <div className='p-16 rounded-3xl bg-primary-50 flex-1 mr-8'>
            <h3 className='flex items-center mb-10 text-5xl font-semibold text-primary-800'>
              <Send className='mr-6 w-12 h-12' />
              发送错误报告
            </h3>
            <div className='space-y-6'>
              <p className='text-3xl leading-relaxed text-default-700'>
                请将此错误报告截图发送给开发者，以便快速定位和解决问题。
              </p>
              <p className='text-2xl text-default-600'>
                您可以通过以下方式联系开发者：GitHub Issues、QQ群：795874649。
              </p>
            </div>
          </div>
          
          {/* 二维码区域 */}
          {qrCodeDataUrl && (
            <QRCodeSection qrCodeDataUrl={qrCodeDataUrl} />
          )}
        </div>
      </div>
    </DefaultLayout>
  )
}

handlerError.displayName = 'handlerError'

export default handlerError