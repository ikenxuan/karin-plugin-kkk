import { Code } from '@heroui/react'
import { CornerDownLeft } from 'lucide-react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

import type { ChangelogProps } from '../../../types/platforms/other/changelog'
import { DefaultLayout } from '../../layouts/DefaultLayout'


/**
 * 更新日志组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const Changelog: React.FC<Omit<ChangelogProps & { data: { useDarkTheme: boolean } }, 'templateType' | 'templateName'>> = React.memo((props) => {
  const isDark = props.data.useDarkTheme ?? false

  const backgroundColors = isDark
    ? {
      base: '#06110d',
      primary: 'rgba(70, 184, 145, 0.26)',
      secondary: 'rgba(135, 214, 84, 0.22)',
      accent: 'rgba(88, 154, 210, 0.18)',
      wash: 'rgba(7, 24, 18, 0.8)',
      tint: 'rgba(162, 224, 103, 0.1)',
      noiseOpacity: 0.22,
      noiseBlend: 'screen' as const,
      inlineCodeBg: 'rgba(255, 255, 255, 0.08)',
      inlineCodeText: '#dff3db'
    }
    : {
      base: '#f5fbfc',
      primary: 'rgba(214, 236, 240, 0.95)',
      secondary: 'rgba(189, 221, 34, 0.42)',
      accent: 'rgba(214, 236, 240, 0.72)',
      wash: 'rgba(255, 255, 255, 0.36)',
      tint: 'rgba(189, 221, 34, 0.12)',
      noiseOpacity: 0.16,
      noiseBlend: 'multiply' as const,
      inlineCodeBg: 'rgba(15, 23, 42, 0.06)',
      inlineCodeText: '#314329'
    }

  return (
    <DefaultLayout
      {...props}
      className="relative overflow-hidden"
      style={{
        backgroundColor: backgroundColors.base
      }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute -top-48 -left-20 w-7xl h-280 rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(ellipse at 35% 40%, ${backgroundColors.primary} 0%, transparent 72%)`
          }}
        />
        <div
          className="absolute top-42 right-[-7%] w-[30%] h-[24%] rounded-full blur-[132px] rotate-12"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${backgroundColors.secondary} 0%, transparent 72%)`
          }}
        />
        <div
          className="absolute -bottom-36 left-30 w-280 h-220 rounded-full blur-[128px] -rotate-6"
          style={{
            background: `radial-gradient(ellipse at 55% 55%, ${backgroundColors.accent} 0%, transparent 72%)`
          }}
        />
        <div
          className="absolute left-[10%] w-[34%] h-[30%] blur-[138px]"
          style={{
            top: '33%',
            background: `radial-gradient(ellipse at 42% 50%, ${backgroundColors.tint} 0%, transparent 76%)`
          }}
        />
        <div
          className="absolute left-[32%] -bottom-[14%] w-[44%] h-[28%] blur-[342px]"
          style={{
            background: `radial-gradient(ellipse at 50% 48%, ${backgroundColors.secondary} 0%, transparent 77%)`
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${backgroundColors.wash} 0%, transparent 28%, transparent 72%, ${backgroundColors.wash} 100%)`
          }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: backgroundColors.noiseOpacity,
          mixBlendMode: backgroundColors.noiseBlend
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="changelogNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.88" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" result="gray" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 0 1 1" />
              <feFuncG type="discrete" tableValues="0 0 1 1" />
              <feFuncB type="discrete" tableValues="0 0 1 1" />
              <feFuncA type="table" tableValues="0 0.25 0.9 1" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#changelogNoise)" />
        </svg>
      </div>

      <div className='relative px-20 pt-5 pb-0 w-full max-w-none prose prose-lg prose-invert from-default-50 to-default-100'>

        {props.data.Tip === true ? (
          <>
            {/* <div className="inline-block relative mt-20">
              <div className="absolute inset-0 bg-black rounded-2xl opacity-50 blur-xl translate-y-6 -z-10"></div>
              
              <img className="block relative rounded-2xl" src="/image/other/changelog/banner.webp" alt="横幅" />
              
              <div className='flex absolute inset-0 flex-col justify-center items-center left-50 bottom-50'>
                <span className='text-9xl font-bold text-white opacity-10'>
                  v{props.data.remoteVersion}
                </span>
              </div>
            </div> */}

            {/* 更新提示 */}
            <div className='pt-32'>
              <div className='text-5xl leading-relaxed text-center mb-8 opacity-50 text-default-600'>
                以下任意方式均可更新
              </div>
              
              <div className='mb-10 px-8 py-5 rounded-2xl border border-default-300/70 bg-default-50/50 text-default-700 text-[2.2em] flex items-center justify-center gap-6'>
                <span>当前版本: v{props.data.localVersion}</span>
                <span>→</span>
                <span>最新版本: v{props.data.remoteVersion}</span>
                <span>，共落后 {props.data.lagVersionCount ?? 0} 个版本</span>
              </div>

              <div className='flex flex-col gap-6 text-[2.8em] leading-relaxed text-default-700'>
                <div className='flex items-center gap-5'>
                  <span className='text-default-500 text-[1.2em]'>•</span>
                  <span>回复</span>
                  <span className='inline-block text-[1.15em] font-bold text-default-900'>
                    更新
                  </span>
                  <span>立刻开始</span>
                </div>
                
                <div className='flex items-center gap-5'>
                  <span className='text-default-500 text-[1.2em]'>•</span>
                  <span>进入</span>
                  <Code radius='lg' color='success' className='text-[0.9em]'>Karin WebUI</Code>
                  <span>→</span>
                  <Code radius='lg' color='success' className='text-[0.9em]'>插件管理</Code>
                  <span>→</span>
                  <Code radius='lg' color='success' className='text-[0.9em]'>已安装</Code>
                  <span>→</span>
                  <span>一览更新</span>
                </div>
                
                <div className='flex items-center gap-5'>
                  <span className='text-default-500 text-[1.2em]'>•</span>
                  <span>Karin 根目录运行</span>
                  <Code radius='lg' color='success' className='text-[0.85em] whitespace-nowrap'>
                    pnpm add karin-plugin-kkk@{props.data.remoteVersion} -w
                  </Code>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className='changelog-content'>
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children, ...props }) => (
                <h1 className="text-[5.28em] font-semibold mb-8 pb-2 border-b-2 border-default-400 text-default-900" {...props}>
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <div className="relative mt-25 mb-5">
                  {/* <div
                    className="absolute -top-13 left-0 text-[11em] font-black text-default-500/50 select-none pointer-events-none uppercase leading-none"
                    aria-hidden="true"
                  >
                    {typeof children === 'string' ? children : 'H2'}
                  </div> */}
                  <h2 className="ml-5 relative z-10 text-[5.28em] text-default-900 font-light" {...props}>
                    {children}
                  </h2>
                  <div className='w-full border-b border-default-400' />
                </div>
              ),
              h3: ({ children, ...props }) => (
                <h3 className="flex items-baseline gap-3 text-[3.2em] font-light mb-2 text-default-900" {...props}>
                  {children}
                  <CornerDownLeft strokeWidth={2.5} className="w-[1em] h-[1em] text-default-900/10" />
                </h3>
              ),
              h4: ({ children, ...props }) => (
                <h4 className="text-[2.64em] font-semibold mb-5 text-default-900" {...props}>
                  {children}
                </h4>
              ),
              h5: ({ children, ...props }) => (
                <h5 className="text-[2.38em] font-semibold mb-5 text-default-900" {...props}>
                  {children}
                </h5>
              ),
              h6: ({ children, ...props }) => (
                <h6 className="text-[2.11em] font-semibold mb-4 text-default-600" {...props}>
                  {children}
                </h6>
              ),
              p: ({ children, ...props }) => (
                <p className="text-[2.64em] leading-[1.75] mb-[2.64em] text-default-900" {...props}>
                  {children}
                </p>
              ),
              ul: ({ children, ...props }) => (
                <ul className="pl-[5em] mb-[2em] list-disc text-default-900" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol className="pl-[3.6em] mb-[1.8em] list-decimal text-default-900" {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li className="text-[2.6em] leading-[1.6] text-default-900 font-black" {...props}>
                  {children}
                </li>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote className="border-l-4 border-default-500 pl-[1.8em] py-[0.9em] mb-[1.8em] text-default-700 bg-default-100" {...props}>
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code
                  className='inline align-text-bottom leading-inherit text-[0.8em] whitespace-normal break-all box-decoration-slice rounded-[0.5em] px-[0.38em] py-[0.14em] font-semibold'
                  style={{
                    backgroundColor: backgroundColors.inlineCodeBg,
                    color: backgroundColors.inlineCodeText
                  }}
                >
                  {children}
                </code>
              ),
              pre: ({ children, ...props }) => (
                <pre className="p-[1.8em] mb-[1.8em] bg-default-200 rounded overflow-x-auto font-mono" {...props}>
                  {children}
                </pre>
              ),
              a: ({ children, href, ...props }) => (
                <a
                  className="inline-flex gap-3 items-baseline cursor-pointer text-default-900/50 hover:underline"
                  onClick={(e) => e.preventDefault()}
                  {...props}
                >
                  <span>{children}</span>
                  {/* <ExternalLink className="w-[0.8em] h-auto -mb-[0.1em] opacity-70" /> */}
                </a>
              ),
              img: ({ ...props }) => (
                <img className="max-w-full h-auto rounded" {...props} />
              ),
              table: ({ children, ...props }) => (
                <table className="w-full border-collapse mb-[1.8em] text-default-900" {...props}>
                  {children}
                </table>
              ),
              th: ({ children, ...props }) => (
                <th className="px-5 py-3 font-semibold text-left border text-default-900 bg-default-200 border-default-400" {...props}>
                  {children}
                </th>
              ),
              td: ({ children, ...props }) => (
                <td className="px-5 py-3 border text-default-900 border-default-400" {...props}>
                  {children}
                </td>
              )
            }}
          >
            {props.data?.markdown ?? ''}
          </ReactMarkdown>
        </div>

        {/* 底部信息 */}
        {props.data.Tip === true && props.data.buildTime && (
          <div className='flex gap-8 justify-center py-12 mt-16 border-t-2 border-default-300 opacity-60'>
            <div className='text-4xl'>
              更新频道:
              <span className='font-bold text-default-700'> 正式版</span>
            </div>
            <div className='text-4xl'>
              编译于:
              <span className='font-bold text-default-700'> {props.data.buildTime}</span>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  )
})

Changelog.displayName = 'Changelog'

export default Changelog
