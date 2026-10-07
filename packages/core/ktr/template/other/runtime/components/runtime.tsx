import { CheckCircle2, TriangleAlert } from 'lucide-react'
import React from 'react'
import ReactMarkdown from 'react-markdown'

import { isDark } from '../../../../utils/theme'
import { DefaultLayout, RELEASE_TYPE_LABEL } from '../../../components/DefaultLayout'
import type { PosterProps } from '../../../types/ctx'
import type { RuntimeReportData } from './types'

/**
 * `#kkk版本` 运行环境诊断海报。
 *
 * 面向手机端看图场景：1440px 画布在手机上约缩小 3.7 倍，字号按「手机直读」校准 ——
 * 数值 60px（屏显 ≈16px）、元信息 32px、正文 44px，全部达到 kkk-design token 表的
 * 主正文/元信息下限之上，不放大图片即可读完。
 *
 * 弥散信息海报 · 技术规格铭牌：纯底色 + 三片弥散光 + 高对比离散噪点（硬性需求，保持不变），
 * 全部元素无边框（硬性需求）：无胶囊边框、无面板、无分隔线，只靠字号、字重与留白分区。
 * 版式纪律：
 * - 超大版本号为唯一视觉中心，长度自适应字号（金丝雀长版本也不破版）。
 * - 环境摘要为两栏参数面板：序号 + 英文小标签 + 数值（基准 60px，超出列宽按比例自动
 *   缩小到下限 32px，全节数值单字体 sans；mono 只用于序号与机器元信息，同层不混排）。
 * - 无图表元素：内存不画进度条，数值即信息。
 * 深色主题为紫罗兰 → 品红 → 琥珀橙弥散；浅色主题为 #271151 / #9754c7 / #deacf5 同色系紫。
 */

/** 数值宽度估算（CJK ≈1em / 拉丁 ≈0.55em，bold 近似），驱动长字符串自适应缩小 */
const estimateUnits = (text: string): number => {
  let units = 0
  for (const ch of text) units += ch.charCodeAt(0) > 0x2e80 ? 1 : 0.55
  return units
}

const SPEC_VALUE_BASE = 60
const SPEC_VALUE_MIN = 32
const SPEC_CELL_WIDTH = 600

/** 数值字号自适应：超出列宽按比例缩小到下限；仍超宽的部分交给 line-clamp-2 兜底 */
const fitValueSize = (text: string): number => {
  const width = estimateUnits(text) * SPEC_VALUE_BASE
  if (width <= SPEC_CELL_WIDTH) return SPEC_VALUE_BASE
  return Math.max(SPEC_VALUE_MIN, Math.floor((SPEC_CELL_WIDTH / width) * SPEC_VALUE_BASE))
}

interface SpecRowProps {
  index: string
  label: string
  value: string
  meta?: React.ReactNode
  accentText: string
}

/** 规格铭牌行：序号（accent mono）+ 英文标签 + 自适应数值（全节单字体 sans）+ 机器元信息（mono 32px） */
const SpecRow = ({ index, label, value, meta, accentText }: SpecRowProps) => {
  const valueSize = fitValueSize(value)
  return (
    <div className="min-w-0">
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-[26px] font-bold" style={{ color: accentText }}>
          {index}
        </span>
        <span className="text-[30px] font-bold tracking-[0.24em] text-foreground/40">{label}</span>
      </div>
      <div
        className="mt-2 line-clamp-2 break-words font-bold leading-[1.2] tracking-[-0.02em] text-foreground"
        style={{ fontSize: valueSize }}
      >
        {value}
      </div>
      {meta !== undefined && <div className="mt-2 whitespace-nowrap font-mono text-[32px] font-semibold text-foreground/40">{meta}</div>}
    </div>
  )
}

interface SpecItem {
  index: string
  label: string
  value: string
  meta?: string
}

export const RuntimeReport: React.FC<PosterProps<RuntimeReportData>> = React.memo((props) => {
  const { data } = props
  const dark = isDark(props.ctx)
  const releaseLabel = RELEASE_TYPE_LABEL[data.identity.releaseType] ?? data.identity.releaseType
  const buildStatus =
    data.build.state === 'matched'
      ? { label: '构建信息一致', icon: <CheckCircle2 className="h-10 w-10" />, color: '#22c55e' }
      : data.build.state === 'mismatched'
        ? { label: '构建信息不一致', icon: <TriangleAlert className="h-10 w-10" />, color: '#f59e0b' }
        : { label: '未找到构建信息', icon: <TriangleAlert className="h-10 w-10" />, color: '#94a3b8' }

  const palette = dark
    ? {
        background: '#0d0a1c',
        glowPrimary: 'rgba(139, 92, 246, 0.34)',
        glowSecondary: 'rgba(217, 70, 239, 0.22)',
        glowWarm: 'rgba(251, 146, 60, 0.20)',
        versionGlow: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.30) 0%, rgba(240, 171, 252, 0.15) 50%, transparent 75%)',
        versionInk: '#f6f3ff',
        versionAccent: '#fdba74',
        accentText: '#c4b5fd',
        tagBg: 'rgba(139, 92, 246, 0.12)',
        tagText: '#c4b5fd',
        statusDot: '#c4b5fd',
        dotGlow: '0 0 28px rgba(192, 132, 252, 0.85)',
        bgWord: '#ede9fe',
        noteHeading: '#f5f3ff',
        noteBody: 'rgba(240, 237, 255, 0.72)',
        noteStrong: '#ffffff',
        noteCodeBg: 'rgba(139, 92, 246, 0.16)',
        noteCodeText: '#c4b5fd',
        noteLink: '#c4b5fd',
        noteBulletClass: 'before:bg-violet-400/70',
        warnText: '#fbbf24',
        noiseOpacity: 0.16
      }
    : {
        background: '#f7f1fe',
        glowPrimary: 'rgba(151, 84, 199, 0.30)',
        glowSecondary: 'rgba(222, 172, 245, 0.55)',
        glowWarm: 'rgba(250, 211, 22, 0.38)',
        versionGlow: 'radial-gradient(ellipse at center, rgba(222, 172, 245, 0.50) 0%, rgba(250, 211, 22, 0.16) 55%, transparent 78%)',
        versionInk: '#271151',
        versionAccent: '#9754c7',
        accentText: '#9754c7',
        tagBg: 'rgba(151, 84, 199, 0.10)',
        tagText: '#7a3db0',
        statusDot: '#9754c7',
        dotGlow: '0 0 26px rgba(151, 84, 199, 0.55)',
        bgWord: '#271151',
        noteHeading: '#271151',
        noteBody: 'rgba(39, 17, 81, 0.70)',
        noteStrong: '#271151',
        noteCodeBg: 'rgba(151, 84, 199, 0.10)',
        noteCodeText: '#7a3db0',
        noteLink: '#7a3db0',
        noteBulletClass: 'before:bg-[#9754c7]/70',
        warnText: '#8a5a06',
        noiseOpacity: 0.12
      }

  const pluginVersion = data.identity.pluginVersion
  // 版本号长度自适应字号：金丝雀长版本（26+ 字符）在 1440 画布内不破版
  const heroSize = pluginVersion.length <= 9 ? 200 : pluginVersion.length <= 14 ? 152 : pluginVersion.length <= 20 ? 112 : 80

  const specs: SpecItem[] = [
    { index: '01', label: 'OS', value: data.runtime.os, meta: `${data.runtime.platform} · ${data.runtime.arch}` },
    { index: '02', label: 'ADAPTER', value: data.adapter.name, meta: `v${data.adapter.version}` },
    { index: '03', label: 'KARIN', value: `v${data.identity.karinVersion}` },
    { index: '04', label: 'NODE', value: data.runtime.nodeVersion },
    { index: '05', label: 'CPU', value: data.resources.cpuModel, meta: `${data.resources.cpuCores} 核心` },
    { index: '06', label: 'MEMORY', value: data.resources.memoryUsagePercent, meta: `${data.resources.usedMemory} / ${data.resources.totalMemory}` }
  ]

  return (
    <DefaultLayout {...props} className="relative min-h-455 overflow-hidden" style={{ backgroundColor: palette.background }}>
      {/* 背景：三片弥散光 + 背景字（低透明气氛层，不与正文争抢） */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -left-130 -top-120 h-337.5 w-375 rounded-full blur-[230px]"
          style={{ background: `radial-gradient(ellipse at center, ${palette.glowPrimary} 0%, transparent 70%)` }}
        />
        <div
          className="absolute -right-130 top-[30%] h-312.5 w-300 rounded-full blur-[240px]"
          style={{ background: `radial-gradient(ellipse at center, ${palette.glowSecondary} 0%, transparent 72%)` }}
        />
        <div
          className="absolute -bottom-120 -left-80 h-287.5 w-337.5 rounded-full blur-[260px]"
          style={{ background: `radial-gradient(ellipse at center, ${palette.glowWarm} 0%, transparent 72%)` }}
        />
        <div
          className="absolute left-115 top-200 select-none text-[400px] -rotate-90 font-bold leading-none tracking-[-0.06em] opacity-[0.03]"
          style={{ color: palette.bgWord }}
        >
          RUNTIME
        </div>
      </div>

      {/* 高对比离散噪点层（硬性需求：与 Help 模板同源，feComponentTransfer 离散化为纯黑白颗粒） */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{ opacity: palette.noiseOpacity }}>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="runtimeReportNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" result="gray" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#runtimeReportNoise)" />
        </svg>
      </div>

      <main className="relative z-10 px-22 pb-16 pt-20">
        {/* 顶带：系统标签 + 渠道标签（色底无边框） */}
        <header className="flex items-center justify-between gap-12">
          <div className="flex items-center gap-4">
            <span className="h-4 w-4 rounded-full" style={{ background: palette.statusDot, boxShadow: palette.dotGlow }} />
            <span className="text-[30px] font-bold tracking-[0.28em] text-foreground/44">运行诊断 · RUNTIME REPORT</span>
          </div>
          <span
            className="whitespace-nowrap rounded-full px-7 py-2.5 text-[28px] font-bold tracking-[0.14em]"
            style={{ background: palette.tagBg, color: palette.tagText }}
          >
            {releaseLabel}
          </span>
        </header>

        {/* 第一视觉中心：超大版本号（字号随长度自适应），状态行内联不上框 */}
        <section className="relative mt-24">
          <div
            className="pointer-events-none absolute -left-16 -top-24 h-105 w-205 rounded-full blur-[150px]"
            style={{ background: palette.versionGlow }}
          />
          <div className="relative whitespace-nowrap font-mono text-[34px] font-bold text-foreground/46">{data.identity.pluginName}</div>
          <div
            className="relative mt-5 whitespace-nowrap font-mono font-bold leading-none tracking-[-0.08em]"
            style={{ color: palette.versionInk, fontSize: heroSize }}
          >
            <span className="mr-4 text-[0.32em]" style={{ color: palette.versionAccent }}>
              v
            </span>
            {pluginVersion}
          </div>
          <div className="relative mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <span className="flex items-center gap-3 whitespace-nowrap text-[30px] font-bold" style={{ color: buildStatus.color }}>
              {buildStatus.icon}
              {buildStatus.label}
            </span>
            <span className="whitespace-nowrap font-mono text-[30px] font-semibold text-foreground/30">
              构建 {data.build.shortCommitHash ?? '未知'} · {data.build.buildTime ?? '时间未知'}
            </span>
          </div>
        </section>

        {/* 环境摘要：两栏参数面板 —— 单列序号行，数值统一 60px 基准自适应，无图表元素 */}
        <section className="relative mt-40">
          <div className="text-[32px] font-bold tracking-[0.28em]" style={{ color: palette.accentText }}>
            环境摘要 · SNAPSHOT
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-12 gap-y-16">
            {specs.map((spec) => (
              <SpecRow key={spec.index} {...spec} accentText={palette.accentText} />
            ))}
          </div>
        </section>

        {/* 本版变更：单层节标题，附「仅展示当前版本」说明 */}
        <section className="relative mt-40">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <div className="text-[32px] font-bold tracking-[0.28em]" style={{ color: palette.accentText }}>
              本版变更 · RELEASE NOTES
            </div>
            <div className="text-[28px] font-semibold text-foreground/30">仅展示当前版本</div>
          </div>

          {data.releaseNotes.available ? (
            <div className="runtime-release-notes relative mt-14">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="mb-12 whitespace-nowrap text-[56px] font-bold leading-tight" style={{ color: palette.noteStrong }}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3
                      className="mb-6 mt-12 flex items-center gap-6 whitespace-nowrap text-[44px] font-bold leading-tight"
                      style={{ color: palette.noteHeading }}
                    >
                      <span className="h-3 w-14 shrink-0 rounded-full" style={{ background: palette.accentText }} />
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-7 text-[44px] leading-[1.7]" style={{ color: palette.noteBody }}>
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => <ul className="mb-9 space-y-6 pl-12">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-9 list-decimal space-y-6 pl-14">{children}</ol>,
                  li: ({ children }) => (
                    <li
                      className={`relative wrap-break-word text-[44px] font-semibold leading-[1.65] before:absolute before:-left-10 before:top-[0.72em] before:h-3 before:w-3 before:rounded-full ${palette.noteBulletClass}`}
                      style={{ color: palette.noteBody }}
                    >
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold" style={{ color: palette.noteStrong }}>
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code
                      className="break-all rounded-xl px-4 py-1 font-mono text-[0.9em] font-bold"
                      style={{ background: palette.noteCodeBg, color: palette.noteCodeText }}
                    >
                      {children}
                    </code>
                  ),
                  a: ({ children }) => (
                    <span className="font-bold" style={{ color: palette.noteLink }}>
                      {children}
                    </span>
                  )
                }}
              >
                {data.releaseNotes.markdown}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="relative mt-14 flex items-start gap-7" style={{ color: palette.warnText }}>
              <TriangleAlert className="mt-2 h-14 w-14 shrink-0" />
              <div>
                <div className="text-[44px] font-bold">当前构建没有可用的变更日志</div>
                <div className="mt-3 text-[34px] font-semibold leading-[1.55] opacity-70">环境摘要仍可正常用于问题定位。</div>
              </div>
            </div>
          )}
        </section>

        <footer className="mt-24 flex items-end justify-between gap-12 whitespace-nowrap text-[28px] font-semibold text-foreground/32">
          <span>仅包含经过脱敏的本地运行信息</span>
          <span className="font-mono">{data.snapshotAt}</span>
        </footer>
      </main>
    </DefaultLayout>
  )
})

RuntimeReport.displayName = 'RuntimeReport'

export default RuntimeReport
