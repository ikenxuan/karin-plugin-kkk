import { setUnicodeEmojiSrcResolver, splitUnicodeEmoji } from '@kkk/richtext'
import { UserPlusIcon, UsersThreeIcon } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { BookOpenText, Clock3, Hash } from 'lucide-react'
import React from 'react'
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown'

import { APPLE_EMOJI_MARKER, getAppleEmojiAssetUrl } from '../../../../utils/appleEmoji'
import { isDark } from '../../../../utils/theme'
import { DefaultLayout } from '../../../components/DefaultLayout'
import { QRCodeWithAvatar } from '../../../components/QRCodeWithAvatar'
import type { PosterProps } from '../../../types/ctx'
import { DouyinCommentIcon, DouyinFavoriteIcon, DouyinLikeIcon, DouyinShareIcon } from '../../components/Icons'
import type { DouyinArticleWorkData } from './types'

const getTitleClassName = (titleLength: number): string => {
  if (titleLength > 96) return 'text-[55px] leading-[1.34]' // 42 * 1.3 = 54.6 → 55
  if (titleLength > 72) return 'text-[62px] leading-[1.3]' // 48 * 1.3 = 62.4 → 62
  if (titleLength > 48) return 'text-[70px] leading-[1.26]' // 54 * 1.3 = 70.2 → 70
  return 'text-[81px] leading-[1.18]' // 62 * 1.3 = 80.6 → 81
}

const getArticleImageUrl = (image?: DouyinArticleWorkData['images'][number]): string | undefined =>
  image?.ai_high_image_url || image?.high_image_url || image?.origin_image_url || image?.markdown_url

const preprocessMarkdown = (markdown: string): string =>
  markdown.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+width=\d+)?(?:\s+height=\d+)?\)/g, '![$1]($2)')

interface MarkdownTree {
  type: string
  value?: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: MarkdownTree[]
}

// KTR 开发面板在浏览器中渲染，不经过 core 的 Render/index.ts；给它注册一个同源 Apple PNG 资源地址。
if (typeof window !== 'undefined' && window.location.pathname.startsWith('/__ktr/')) {
  setUnicodeEmojiSrcResolver(getAppleEmojiAssetUrl)
}

/** 把 Markdown 文本节点中的 Unicode emoji 转为带标记的图片节点，跳过代码内容。 */
const rehypeArticleAppleEmoji = () => (tree: MarkdownTree) => {
  const codeTags = new Set(['code', 'pre', 'script', 'style', 'textarea'])
  const visit = (node: MarkdownTree) => {
    if (!node.children || (node.tagName && codeTags.has(node.tagName))) return

    node.children = node.children.flatMap((child): MarkdownTree[] => {
      if (child.type !== 'text' || !child.value) {
        visit(child)
        return [child]
      }

      return splitUnicodeEmoji(child.value).map((part): MarkdownTree =>
        part.kind === 'emoji'
          ? {
              type: 'element',
              tagName: 'img',
              properties: { src: part.src, alt: part.sequence, className: [APPLE_EMOJI_MARKER] },
              children: []
            }
          : { ...child, value: part.text }
      )
    })
  }

  visit(tree)
}

/** 只转换原始 HTML 中的裸 br 标签，代码、转义文本及其他 HTML 仍按原有规则渲染。 */
const rehypeArticleLineBreaks = () => (tree: MarkdownTree) => {
  const visit = (node: MarkdownTree) => {
    if (!node.children) return

    node.children = node.children.flatMap((child): MarkdownTree[] => {
      if (child.type !== 'raw' || !child.value) {
        visit(child)
        return [child]
      }

      // 按完整 HTML 标记匹配，避免把属性、注释或 script/style 中的字符串误当成换行。
      const tags =
        /<!--[\s\S]*?(?:-->|$)|<(script|style|pre|textarea)\b(?:[^>"']|"[^"]*"|'[^']*')*>[\s\S]*?(?:<\/\1\s*>|$)|<(?:[^>"']|"[^"]*"|'[^']*')*>/gi
      const children: MarkdownTree[] = []
      let offset = 0

      for (const match of child.value.matchAll(tags)) {
        if (!/^<br\s*\/?>$/i.test(match[0])) continue
        if (match.index > offset) children.push({ type: 'raw', value: child.value.slice(offset, match.index) })
        children.push({ type: 'element', tagName: 'br', properties: {}, children: [] })
        offset = match.index + match[0].length
      }

      if (offset === 0) return [child]
      if (offset < child.value.length) children.push({ type: 'raw', value: child.value.slice(offset) })
      return children
    })
  }

  visit(tree)
}

/** 标题实际起点：主内容区上内距 + 标题自身 mt-13 (52px)。 */
const articleTitleStart = 'min(65vh, 936px) - 60px'

const authorCoverBlurMask = 'linear-gradient(to bottom, black 0%, black 42%, rgba(0,0,0,0.5) 72%, transparent 100%)'
/** 模糊从原起点开始，在红框底部（标题起点 + 180px）达到完整强度。 */
const articleCoverBlurMask = `linear-gradient(
  to bottom,
  transparent 0px,
  transparent calc(${articleTitleStart} - 320px),
  rgba(0,0,0,0.03) calc(${articleTitleStart} - 270px),
  rgba(0,0,0,0.08) calc(${articleTitleStart} - 220px),
  rgba(0,0,0,0.15) calc(${articleTitleStart} - 170px),
  rgba(0,0,0,0.24) calc(${articleTitleStart} - 120px),
  rgba(0,0,0,0.36) calc(${articleTitleStart} - 70px),
  rgba(0,0,0,0.5) calc(${articleTitleStart} - 20px),
  rgba(0,0,0,0.64) calc(${articleTitleStart} + 30px),
  rgba(0,0,0,0.77) calc(${articleTitleStart} + 80px),
  rgba(0,0,0,0.88) calc(${articleTitleStart} + 130px),
  rgba(0,0,0,0.96) calc(${articleTitleStart} + 160px),
  black calc(${articleTitleStart} + 180px)
)`

/** 第二层更强的模糊从红框中段加入，并在红框底部达到完整强度。 */
const articleCoverDeepBlurMask = `linear-gradient(
  to bottom,
  transparent 0px,
  transparent calc(${articleTitleStart} - 70px),
  rgba(0,0,0,0.08) calc(${articleTitleStart} - 20px),
  rgba(0,0,0,0.22) calc(${articleTitleStart} + 30px),
  rgba(0,0,0,0.42) calc(${articleTitleStart} + 80px),
  rgba(0,0,0,0.65) calc(${articleTitleStart} + 130px),
  rgba(0,0,0,0.9) calc(${articleTitleStart} + 160px),
  black calc(${articleTitleStart} + 180px)
)`

const getArticleCoverToSolidTransition = (coverColor?: string): string => {
  const color = coverColor ?? 'var(--background)'
  return `linear-gradient(
    to bottom,
    transparent 0px,
    transparent calc(${articleTitleStart} - 320px),
    color-mix(in oklab, ${color} 3%, transparent) calc(${articleTitleStart} - 270px),
    color-mix(in oklab, ${color} 8%, transparent) calc(${articleTitleStart} - 220px),
    color-mix(in oklab, ${color} 16%, transparent) calc(${articleTitleStart} - 170px),
    color-mix(in oklab, ${color} 27%, transparent) calc(${articleTitleStart} - 120px),
    color-mix(in oklab, ${color} 42%, transparent) calc(${articleTitleStart} - 70px),
    color-mix(in oklab, ${color} 58%, transparent) calc(${articleTitleStart} - 20px),
    color-mix(in oklab, ${color} 72%, transparent) calc(${articleTitleStart} + 30px),
    color-mix(in oklab, ${color} 84%, transparent) calc(${articleTitleStart} + 80px),
    color-mix(in oklab, ${color} 93%, transparent) calc(${articleTitleStart} + 130px),
    color-mix(in oklab, ${color} 98%, transparent) calc(${articleTitleStart} + 160px),
    ${color} calc(${articleTitleStart} + 180px),
    ${color} 100%
  )`
}

const getArticleCoverUrl = (data: DouyinArticleWorkData): string | undefined => data.cover_url || getArticleImageUrl(data.images[0])

interface DouyinArticleNoiseProps extends PosterProps<DouyinArticleWorkData> {
  filterId: string
  className?: string
}

const DouyinArticleNoise: React.FC<DouyinArticleNoiseProps> = ({ ctx, filterId, className }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`} aria-hidden="true">
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncA type="linear" slope="2" intercept="-0.5" />
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="100%" height="100%" opacity={isDark(ctx) ? 0.16 : 0.12} filter={`url(#${filterId})`} fill="white" />
    </svg>
  </div>
)

const DouyinDiffuseBackground: React.FC<PosterProps<DouyinArticleWorkData>> = ({ data, ctx }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
    <DouyinArticleNoise data={data} ctx={ctx} filterId="douyinArticleWorkBackgroundNoise" />
  </div>
)
/** 封面在红框区域内完成模糊并过渡到纯色背景。 */
const DouyinArticleCover: React.FC<PosterProps<DouyinArticleWorkData>> = ({ data, ctx }) => {
  const coverUrl = getArticleCoverUrl(data)
  if (!coverUrl) return null

  return (
    <section className="relative col-start-1 row-start-1 w-full self-start" style={{ minHeight: `calc(${articleTitleStart} + 180px)` }}>
      <img
        src={coverUrl}
        alt="文章封面"
        className="relative z-10 block h-auto w-full object-contain object-top"

        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-15 h-90 overflow-hidden"
        style={{
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          maskImage: authorCoverBlurMask,
          WebkitMaskImage: authorCoverBlurMask
        }}
      />{' '}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-18"
        style={{ backgroundImage: getArticleCoverToSolidTransition(ctx.coverColor) }}
      />
      <img
        src={coverUrl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-16 block h-auto w-full object-contain object-top"
        style={{
          filter: 'blur(32px)',
          maskImage: articleCoverBlurMask,
          WebkitMaskImage: articleCoverBlurMask
        }}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />
      <img
        src={coverUrl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-17 block h-auto w-full object-contain object-top"
        style={{
          filter: 'blur(72px)',
          maskImage: articleCoverDeepBlurMask,
          WebkitMaskImage: articleCoverDeepBlurMask
        }}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />
      <DouyinArticleNoise data={data} ctx={ctx} filterId="douyinArticleWorkCoverNoise" className="z-18" />
    </section>
  )
}

const DouyinPosterHeader: React.FC<PosterProps<DouyinArticleWorkData>> = ({ data, ctx }) => {
  const { avater_url, username, create_time, read_time } = data

  return (
    <header className="flex items-start justify-between gap-14">
      <div className="flex min-w-0 items-center gap-6">
        <img
          src={avater_url}
          alt="头像"
          className="h-24 w-24 shrink-0 rounded-full object-cover shadow-2xl"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
        <div className="min-w-0">
          <div className="max-w-165 truncate text-[44px] font-bold leading-tight text-foreground select-text">{username}</div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[30px] text-foreground/75">
            <span className="inline-flex items-center gap-2">
              <Clock3 size={28} />
              <span className="select-text">{create_time}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpenText size={30} />
              <span className="select-text">阅读 {read_time} 分钟</span>
            </span>
          </div>
        </div>
      </div>
      <img
        src={isDark(ctx) ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
        alt="抖音"
        className="mt-2 h-17 w-auto shrink-0 object-contain opacity-90"
      />
    </header>
  )
}

const DouyinArticleTitle: React.FC<PosterProps<DouyinArticleWorkData>> = ({ data }) => (
  <section className="mt-13">
    <h1
      className={`${getTitleClassName(data.title.length)} font-semibold text-foreground select-text`}
      style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
    >
      {data.title}
    </h1>
  </section>
)

const DouyinArticleContent: React.FC<PosterProps<DouyinArticleWorkData>> = ({ data }) => {
  const imageMap = new Map<string, string>()
  data.images.forEach((image) => {
    const highQualityUrl = getArticleImageUrl(image)
    if (highQualityUrl) imageMap.set(image.markdown_url, highQualityUrl)
  })

  return (
    <section className="mt-20 select-text">
      <ReactMarkdown
        rehypePlugins={[rehypeArticleAppleEmoji, rehypeArticleLineBreaks]}
        urlTransform={(url, key, node) => {
          const className = node.properties.className
          const isAppleEmoji = node.tagName === 'img' && Array.isArray(className) && className.includes(APPLE_EMOJI_MARKER)

          // react-markdown 默认会移除 data:；仅放行由本插件标记的本地 Apple PNG，其他 Markdown URL 仍使用默认安全规则。
          if (key === 'src' && isAppleEmoji && url.startsWith('data:image/png;base64,')) return url
          return defaultUrlTransform(url)
        }}
        components={{
          h1: ({ children }) => <h2 className="mt-14 text-[81px] font-medium leading-tight text-foreground">{children}</h2>,
          h2: ({ children }) => <h2 className="mt-12 text-[71px] font-medium leading-tight text-foreground">{children}</h2>,
          h3: ({ children }) => <h3 className="mt-10 text-[65px] font-medium leading-snug text-foreground">{children}</h3>,
          h4: ({ children }) => <h4 className="mt-9 text-[55px] font-medium leading-snug text-foreground">{children}</h4>,
          p: ({ children }) => <p className="mb-7 text-[60px] font-light leading-[1.62] text-foreground/90">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-8 list-inside list-disc text-[60px] font-light leading-[1.6] text-foreground/90">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-8 list-inside list-decimal text-[60px] font-light leading-[1.6] text-foreground/90">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-3">{children}</li>,
          strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-foreground/80">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="my-10 pl-7 text-[55px] font-light leading-[1.62] text-foreground/70">{children}</blockquote>
          ),
          code: ({ children }) => <code className="font-mono text-[49px] text-foreground/85">{children}</code>,
          img: ({ src, alt, className }) => {
            if (className?.split(/\s+/).includes(APPLE_EMOJI_MARKER)) {
              return (
                <img
                  src={src}
                  alt={alt || ''}
                  className="mx-1 inline-block object-contain mb-4"
                  style={{ height: '1.2em', width: '1.2em' }}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              )
            }

            const imageUrl = src ? imageMap.get(src) || src : ''
            if (!imageUrl) return null

            return (
              <figure className="relative -mx-20 my-12 overflow-visible">
                <div
                  className="absolute -inset-x-16 -inset-y-20 z-0 overflow-hidden"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)'
                  }}
                >
                  <img
                    src={imageUrl}
                    alt=""
                    className="h-full w-full scale-[1.08] object-cover opacity-62 blur-[46px] saturate-[1.15]"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                </div>
                <img
                  src={imageUrl}
                  alt={alt || '文章图片'}
                  className="relative z-10 block h-auto w-full drop-shadow-2xl"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)'
                  }}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
                {alt && alt !== '图片描述' && (
                  <figcaption className="relative z-10 mt-5 px-20 text-[43px] font-normal text-foreground/70">{alt}</figcaption>
                )}
              </figure>
            )
          }
        }}
      >
        {preprocessMarkdown(data.markdown)}
      </ReactMarkdown>
    </section>
  )
}

const DouyinSignalLine: React.FC<PosterProps<DouyinArticleWorkData>> = ({ data }) => {
  const { dianzan, pinglun, shouchang, share } = data
  const renderTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  const stats = [
    { icon: DouyinLikeIcon, value: dianzan, label: '点赞' },
    { icon: DouyinCommentIcon, value: pinglun, label: '评论' },
    { icon: DouyinFavoriteIcon, value: shouchang, label: '收藏' },
    { icon: DouyinShareIcon, value: share, label: '分享' }
  ]

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end gap-x-16 gap-y-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="min-w-37.5">
              <div className="flex items-center gap-3 text-[28px] font-semibold text-foreground/70">
                <Icon size={36} weight="fill" className="text-foreground/80" />
                <span>{stat.label}</span>
              </div>
              <div className="mt-2 text-[64px] font-bold leading-none text-foreground tabular-nums select-text">{stat.value}</div>
            </div>
          )
        })}
      </div>
      <div className="mt-8 text-[29px] leading-[1.45] text-foreground/65">
        <span className="select-text">图片生成于: {renderTime}</span>
      </div>
    </section>
  )
}

const DouyinPosterFooter: React.FC<PosterProps<DouyinArticleWorkData>> = ({ data, ctx }) => {
  const { avater_url, username, 抖音号, 获赞, 关注, 粉丝, share_url } = data
  const stats = [
    { icon: DouyinLikeIcon, iconSize: 26, label: '获赞', value: 获赞 },
    { icon: UserPlusIcon, iconSize: 32, label: '关注', value: 关注 },
    { icon: UsersThreeIcon, iconSize: 32, label: '粉丝', value: 粉丝 }
  ]

  return (
    <footer className="mt-16 flex items-start justify-between gap-16 text-foreground">
      <div className="min-w-0 flex-1 pt-10">
        <div className="flex items-center gap-6">
          <img
            src={avater_url}
            alt="头像"
            className="h-24 w-24 shrink-0 rounded-full object-cover shadow-xl"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
          <div className="min-w-0">
            <div className="max-w-162.5 truncate text-[48px] font-bold leading-tight text-foreground select-text">{username}</div>
            <div className="mt-3 flex items-center gap-2 text-[30px] text-foreground/65">
              <Hash size={28} />
              <span className="truncate select-text">抖音号: {抖音号}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="min-w-37.5">
                <div className="flex items-center gap-3 text-[25px] font-semibold text-foreground/65">
                  <Icon size={stat.iconSize} weight="fill" className="text-foreground/80" />
                  <span>{stat.label}</span>
                </div>
                <div className="mt-2 text-[32px] font-bold leading-none text-foreground select-text">{stat.value}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="shrink-0 text-center">
        <div className="drop-shadow-2xl">
          <QRCodeWithAvatar value={share_url} avatarUrl={avater_url} useDarkTheme={isDark(ctx)} alt="二维码" className="h-75 w-75" />
        </div>
        <div className="mt-2 text-[28px] font-bold text-foreground/80">扫码查看作品详情</div>
      </div>
    </footer>
  )
}

export const DouyinArticleWork: React.FC<PosterProps<DouyinArticleWorkData>> = React.memo((props) => (
  <DefaultLayout
    {...props}
    className="relative overflow-hidden"
    style={props.ctx.coverColor ? { backgroundColor: props.ctx.coverColor } : undefined}
  >
    <DouyinDiffuseBackground {...props} />

    <main className={getArticleCoverUrl(props.data) ? 'relative z-10 grid' : 'relative z-10'}>
      {getArticleCoverUrl(props.data) ? (
        <>
          <DouyinArticleCover {...props} />
          <section className="relative z-20 col-start-1 row-start-1 px-20" style={{ paddingTop: `calc(${articleTitleStart} + 52px)` }}>
            <div className="relative z-10">
              <DouyinArticleTitle {...props} />
              <DouyinArticleContent {...props} />
              <DouyinSignalLine {...props} />
              <DouyinPosterFooter {...props} />
            </div>
          </section>
          <div className="absolute inset-x-20 top-0 z-30 pt-18">
            <DouyinPosterHeader {...props} />
          </div>
        </>
      ) : (
        <section className="relative z-20 px-20 pt-18">
          <DouyinPosterHeader {...props} />
          <DouyinArticleTitle {...props} />
          <DouyinArticleContent {...props} />
          <DouyinSignalLine {...props} />
          <DouyinPosterFooter {...props} />
        </section>
      )}
    </main>
  </DefaultLayout>
))

DouyinArticleWork.displayName = 'DouyinArticleWork'

export default DouyinArticleWork
