"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { TextHoverEffect } from "./ui/text-hover-effect";
import { NoiseBackground } from "./ui/noise-background";
import { SparklesText } from "./ui/sparkles-text";
import { MorphingText } from "./ui/morphing-text";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import { Highlighter } from "./ui/highlighter";
import { LinkPreview } from "./ui/link-preview";
import { Meteors } from "./ui/meteors";
import BorderGlow from "./BorderGlow";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    title: "抖音视频解析",
    desc: "无水印视频下载、视频信息提取、评论区渲染、动态照片解析，一键获取完整内容。",
    colors: ["#FE2C55", "#FF6B8A", "#FE2C55"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M8 5v14l11-7z" />
      </svg>
    ),
    title: "B站内容解析",
    desc: "支持视频、专栏、转发动态的解析与渲染，弹幕烧录让视频分享更完整。",
    colors: ["#00A1D6", "#4DB8E0", "#0084B0"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "动态实时推送",
    desc: "订阅 UP 主动态，新视频、专栏、转发实时推送至群聊，不再错过任何更新。",
    colors: ["#c084fc", "#e879f9", "#a855f7"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    title: "精美卡片渲染",
    desc: "30+ 款精心设计的卡片组件，涵盖视频详情、评论互动、用户信息等多种场景。",
    colors: ["#f472b6", "#fb7185", "#ec4899"],
  },
];

function DouyinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function BilibiliIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
    </svg>
  );
}

function PlatformBadge({
  icon,
  label,
  colorClass,
}: {
  icon: React.ReactNode;
  label: string;
  colorClass: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${colorClass}`}
    >
      {icon}
      {label}
    </span>
  );
}

function CTAButtons({ lang }: { lang: string }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <SparklesText className="p-4 -m-4" sparklesCount={10} colors={{ first: "#9E7AFF", second: "#FE8BBB" }}>
        <Link
          className="inline-flex overflow-hidden relative p-px h-11 rounded-full focus:outline-none focus:ring-2 focus:ring-fd-ring focus:ring-offset-2"
          href={`/${lang}/docs`}
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
  );
}

export function HeroSection() {
  const { lang } = useParams();
  const langStr = Array.isArray(lang) ? lang[0] : lang ?? "zh-CN";

  return (
    <div className="flex flex-col w-full">
      {/* ===== Section 1: Hero 主区域 ===== */}
      <section className="flex overflow-hidden relative flex-col w-full min-h-svh">
        {/* 背景层 */}
        <div className="absolute inset-x-0 top-0 z-0 pointer-events-none">
          <div className="w-screen opacity-60 dark:opacity-40">
            <TextHoverEffect text="KKK" />
          </div>
        </div>

        {/* 流星雨装饰 */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
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
            <CTAButtons lang={langStr} />
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

      {/* ===== Section 2: 核心功能 ===== */}
      <section className="relative px-4 py-24 w-full"
      >
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-4 text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-fd-foreground">一站式短视频解析与推送</h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-14 max-w-2xl text-center text-fd-muted-foreground leading-relaxed"
          >
            自动识别群聊中的分享链接，智能提取视频、图集、评论区等完整内容。
            无需跳转 App 即可在聊天窗口内直接浏览，打造丝滑的媒体分享体验。
          </motion.p>

          {/* 功能卡片 */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-5 mb-14 sm:grid-cols-2"
          >
            {features.map((feature) => (
              <BorderGlow
                key={feature.title}
                className="h-full"
                colors={feature.colors}
                backgroundColor="var(--fd-background)"
                borderRadius={16}
                glowRadius={24}
                glowIntensity={0.9}
                coneSpread={28}
                fillOpacity={0.4}
              >
                <div className="p-6 h-full"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 mb-4 rounded-xl bg-fd-muted/50 text-fd-foreground border border-fd-border/20">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-fd-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-fd-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </BorderGlow>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <CTAButtons lang={langStr} />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Section 3: 技术亮点 ===== */}
      <section className="relative px-4 py-24 w-full border-t border-fd-border/40"
      >
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-4 text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-fd-foreground">为什么选择 karin-plugin-kkk</h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-14 max-w-2xl text-center text-fd-muted-foreground leading-relaxed"
          >
            基于 Karin 框架开发，深度整合群聊生态，从解析到渲染再到推送，提供完整的短视频内容闭环。
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6 mb-14 md:grid-cols-3">
            {[
              {
                title: "深度平台适配",
                desc: "针对抖音与 B 站的接口特性做专项优化，评论区、弹幕、转发动态等细节一应俱全。",
              },
              {
                title: "零配置开箱即用",
                desc: "插件市场一键安装，只需配置 Cookie 即可开始解析，无需复杂的部署和调试流程。",
              },
              {
                title: "可扩展的渲染体系",
                desc: "30+ 卡片组件覆盖视频详情、动态推送、用户资料、错误日志等场景，支持深色与浅色双主题。",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border border-fd-border/40 bg-fd-background/40 backdrop-blur-sm"
              >
                <h3 className="mb-2 text-base font-semibold text-fd-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-fd-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <CTAButtons lang={langStr} />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
