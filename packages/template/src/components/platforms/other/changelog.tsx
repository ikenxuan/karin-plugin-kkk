import { Code } from '@heroui/react'
import { CornerDownLeft, ExternalLink } from 'lucide-react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

import { GlowText } from '../../../components/common/GlowImage'
import type { ChangelogProps } from '../../../types/ohter/changelog'
import { DefaultLayout } from '../../layouts/DefaultLayout'


/**
 * 更新日志组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const Changelog: React.FC<Omit<ChangelogProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  return (
    <DefaultLayout
      {...props}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgb(163 163 163 / 0.1) 2px, transparent 2px),
          linear-gradient(to bottom, rgb(163 163 163 / 0.1) 2px, transparent 2px)
        `,
        backgroundSize: '60px 60px'
      }}
    >
      <div className='relative px-20 pt-5 pb-0 w-full max-w-none prose prose-lg prose-invert from-default-50 to-default-100'>

        {props.data.Tip === true ? (
          <>
            <div className="relative inline-block mt-20">
              {/* Banner 背景阴影 */}
              <div className="absolute inset-0 bg-black rounded-2xl opacity-50 blur-xl translate-y-6 -z-10"></div>
              
              {/* Banner 图片 */}
              <img className="block relative rounded-2xl" src="/image/banner.webp" alt="横幅" />
              
              {/* 版本信息叠加 */}
              <div className='absolute inset-0 flex flex-col left-50 bottom-50 items-center justify-center'>
                <span className='text-9xl font-bold opacity-10'>
                  v{props.data.remoteVersion}
                </span>
              </div>
            </div>

            {/* 更新提示 */}
            <div className='py-16 pb-4 text-5xl leading-relaxed text-center'>
              引用回复此消息包含
              <span className='text-7xl'>「</span>
              <GlowText className='text-7xl font-bold text-warning' blurRadius={20} glowStrength={2} scale={1.2}>
                更新
              </GlowText>
              <span className='text-7xl'>」</span>
              字眼，即可开始更新
            </div>
            {props.data.buildTime && (
              <div className='flex gap-4 opacity-50'>
                <div className='text-4xl ml-17'>
                  更新频道:
                  <span className='text-warning-200 font-bold'> 正式版</span>
                </div>
                <div className='text-4xl ml-15'>
                  编译于:
                  <span className='text-warning-200 font-bold'> {props.data.buildTime}</span>
                </div>
              </div>
              
            )}
          </>
        ) : null}
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            h1: ({ children, ...props }) => (
              <h1 className="text-[5.28em] font-semibold mb-8 pb-2 border-b-2 border-default-400 text-default-900" {...props}>
                {children}
              </h1>
            ),
            h2: ({ children, ...props }) => (
              <div className="relative mt-20 mb-5">
                <div
                  className="absolute -top-13 left-0 text-[11em] font-black text-default-200/50 select-none pointer-events-none uppercase leading-none"
                  aria-hidden="true"
                >
                  {typeof children === 'string' ? children : 'H2'}
                </div>
                <h2 className="ml-15 relative z-10 text-[3.8em] pb-2  text-default-900 font-medium" {...props}>
                  {children}
                </h2>
                <div className='w-full border-b border-default-400' />
              </div>
            ),
            h3: ({ children, ...props }) => (
              <h3 className="flex items-baseline gap-3 text-[3.3em] font-semibold mb-6 text-default-900" {...props}>
                {children}
                <CornerDownLeft strokeWidth={2.5} className="w-[1em] h-[1em] text-default-200" />
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
              <li className="text-[2.6em] leading-[1.6] text-default-900" {...props}>
                {children}
              </li>
            ),
            blockquote: ({ children, ...props }) => (
              <blockquote className="border-l-4 border-default-500 pl-[1.8em] py-[0.9em] mb-[1.8em] text-default-700 bg-default-100" {...props}>
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <Code
                radius='lg'
                color='warning'
                className='inline align-text-bottom leading-[inherit] text-[0.8em] whitespace-normal break-all box-decoration-slice'
              >
                {children}
              </Code>
            ),
            pre: ({ children, ...props }) => (
              <pre className="p-[1.8em] mb-[1.8em] bg-default-200 rounded overflow-x-auto font-mono" {...props}>
                {children}
              </pre>
            ),
            a: ({ children, href, ...props }) => (
              <a
                className="inline-flex gap-3 items-baseline cursor-pointer text-warning hover:underline"
                onClick={(e) => e.preventDefault()}
                {...props}
              >
                <GlowText blurRadius={10} glowStrength={3} scale={1.2}>
                  {children}
                </GlowText>
                <GlowText blurRadius={10} glowStrength={3} scale={1.2}>
                  <ExternalLink className="w-[1.1em] h-[1.1em] -mb-[0.1em]" />
                </GlowText>
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
    </DefaultLayout>
  )
})

Changelog.displayName = 'Changelog'

export default Changelog
