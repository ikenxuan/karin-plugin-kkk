"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { TextHoverEffect } from "./ui/text-hover-effect"
import { NoiseBackground } from "./ui/noise-background"
import { SparklesText } from "./ui/sparkles-text"
import { MorphingText } from "./ui/morphing-text"
import { InteractiveHoverButton } from "./ui/interactive-hover-button"
import { Highlighter } from "./ui/highlighter"
import { LinkPreview } from "./ui/link-preview"
import { Meteors } from "./ui/meteors"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function DouyinIcon ({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

function BilibiliIcon ({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
    </svg>
  )
}

function PlatformBadge ({
  icon,
  label,
  colorClass,
}: {
  icon: React.ReactNode
  label: string
  colorClass: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${colorClass}`}
    >
      {icon}
      {label}
    </span>
  )
}

function CTAButtons () {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <SparklesText className="p-4 -m-4" sparklesCount={10} colors={{ first: "#9E7AFF", second: "#FE8BBB" }}>
        <Link
          className="inline-flex overflow-hidden relative p-px h-11 rounded-full focus:outline-none focus:ring-2 focus:ring-fd-ring focus:ring-offset-2"
          href="/docs"
        >
          <NoiseBackground
            containerClassName="w-full h-full rounded-full flex items-center justify-center bg-transparent dark:bg-transparent"
            className="px-6 py-1"
            gradientColors={["rgb(255, 100, 150)", "rgb(100, 150, 255)", "rgb(255, 200, 100)"]}
          >
            <span className="flex relative z-10 gap-2 items-center text-base text-fd-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              快速开始
            </span>
          </NoiseBackground>
        </Link>
      </SparklesText>

      <a href="https://github.com/ikenxuan/karin-plugin-kkk" target="_blank" rel="noopener noreferrer">
        <InteractiveHoverButton className="h-11">访问源代码</InteractiveHoverButton>
      </a>
    </div>
  )
}

export function HeroSection () {
  return (
    <div className="relative w-full" style={{ height: "100svh" }}>
      {/* ===== Hero 主区域 ===== */}
      <section className="absolute inset-0 flex overflow-hidden flex-col w-full">
        {/* 背景层 */}
        <div className="absolute inset-x-0 top-0 z-0 pointer-events-none">
          <div className="w-screen opacity-60 dark:opacity-40">
            <TextHoverEffect text="KKK" />
          </div>
        </div>

        {/* 流星雨装饰 */}
        <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
          <Meteors number={12} minDelay={0.5} maxDelay={2.5} minDuration={3} maxDuration={8} angle={220} />
        </div>

        {/* 主内容 */}
        <motion.div
          className="flex relative z-10 flex-col flex-1 justify-center items-center px-4 py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 平台标签 */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center mb-5">
            <PlatformBadge
              icon={<DouyinIcon className="w-4 h-4 text-[#FE2C55]" />}
              label="抖音"
              colorClass="bg-[#FE2C55]/10 text-[#FE2C55] border-[#FE2C55]/20"
            />
            <PlatformBadge
              icon={<BilibiliIcon className="w-4 h-4 text-[#00A1D6]" />}
              label="哔哩哔哩"
              colorClass="bg-[#00A1D6]/10 text-[#00A1D6] border-[#00A1D6]/20"
            />
          </motion.div>

          {/* 主标题 */}
          <motion.div variants={itemVariants} className="relative mb-5 w-full max-w-4xl h-14 md:h-20">
            <MorphingText
              texts={["karin-plugin-kkk", "视频解析", "动态推送", "评论渲染"]}
              className="text-4xl text-fd-foreground md:text-6xl"
            />
          </motion.div>

          {/* 副标题 */}
          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-2xl text-lg text-center md:text-xl text-fd-muted-foreground leading-relaxed"
          >
            基于{" "}
            <LinkPreview url="https://karinjs.com" className="cursor-pointer">
              <Highlighter action="underline" color="#FFD700" strokeWidth={2}>
                Karin
              </Highlighter>
            </LinkPreview>
            {" "}框架的短视频解析与动态推送插件
            <br />
            <span className="text-fd-muted-foreground/80">
              为群聊打造一流的媒体分享体验，自动识别分享链接，无需跳转即可浏览
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <CTAButtons />
          </motion.div>

          {/* 底部信任指标 */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-5 justify-center items-center mt-8 text-xs text-fd-muted-foreground/70"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              开源免费
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              开箱即用
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              30+ 卡片组件
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* 底部滚动提示 - absolute定位在首屏底部，随首屏滚走 */}
      <div
        className="absolute bottom-8 left-0 right-0 z-50 pointer-events-none"
      >
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center tracking-widest text-fd-muted-foreground/70 flex flex-col items-center"
        // style={{
        //   transform: "translateY(30%)",
        //   fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)",
        //   width: "100%",
        // }}
        >
          <span
            className="font-mono font-black"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 6rem)' }}
          >
            向下滑动，探索 karin-plugin-kkk 的全部功能
          </span>
        </motion.div>
      </div>
    </div>
  )
}
