import { format, formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import React from 'react'

import { isDark } from '../../../../utils/theme'
import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterProps } from '../../../types/ctx'
import type { UpdateChannelInfo, UpdateHelpData } from './types'

/**
 * `#kkk更新` 用法面板（kkk-design 系统 B × Apple 排版原则）。
 *
 * 主情绪色为深青（teal）——紫罗兰系在 runtime/更新日志等模板已被占用，避开色彩同质化。
 * 构图：横向 Hero 带（左主标题、右当前安装版本，版本号按长度分级缩放防溢出）→
 * 表格式渠道清单（固定列宽 grid，命令列纵向对齐）→ 命令→说明单行对。
 * 状态为完整 semver 比较：有更新 / 已是最新 / 低于当前版本三分，而非笼统布尔。
 * 噪点沿用 runtime 的高对比离散颗粒（深色 0.16 / 浅色 0.12）。
 */

/** 完整 semver 比较（core 数字 + prerelease 段，规则与 core 的 semver.ts 一致） */
const semverCompare = (a: string, b: string): number => {
  const parse = (v: string) => {
    const [core, pre] = v.trim().replace(/^[vV]/, '').split('+')[0].split('-')
    const [maj, min, pat] = core.split('.').map((n) => Number.parseInt(n, 10) || 0)
    return { maj, min, pat, pre: pre ? pre.split('.') : [] }
  }
  const p = parse(a)
  const q = parse(b)
  if (p.maj !== q.maj) return p.maj - q.maj
  if (p.min !== q.min) return p.min - q.min
  if (p.pat !== q.pat) return p.pat - q.pat
  if (p.pre.length === 0 && q.pre.length === 0) return 0
  if (p.pre.length === 0) return 1
  if (q.pre.length === 0) return -1
  const len = Math.min(p.pre.length, q.pre.length)
  for (let i = 0; i < len; i++) {
    const an = /^\d+$/.test(p.pre[i])
    const bn = /^\d+$/.test(q.pre[i])
    if (an !== bn) return an ? -1 : 1
    if (p.pre[i] !== q.pre[i]) {
      if (an && bn) return Number(p.pre[i]) - Number(q.pre[i])
      return p.pre[i] > q.pre[i] ? 1 : -1
    }
  }
  return p.pre.length === q.pre.length ? 0 : p.pre.length > q.pre.length ? 1 : -1
}

/**
 * Hero 版本号布局：
 * - 短版本（纯 semver，≤6 字符）与主标题同行横排，150px；
 * - 长版本（canary 等 prerelease）独占整行堆叠在标题下方，字号按「可用宽 1180px ÷
 *   等宽字符宽 0.6em」自适应，上限仍 150px——标题与版本号不再挤同一行。
 */
const heroStacked = (version: string): boolean => version.trim().replace(/^[vV]/, '').length > 6

const heroVersionSize = (version: string): number => {
  const len = version.trim().replace(/^[vV]/, '').length
  if (len <= 6) return 150
  return Math.max(72, Math.min(150, Math.floor(1180 / (len * 0.6))))
}

export const UpdateHelp: React.FC<PosterProps<UpdateHelpData>> = React.memo((props) => {
  const { data } = props
  const dark = isDark(props.ctx)

  const palette = dark
    ? {
        background: '#081416',
        glowPrimary: 'rgba(45, 212, 191, 0.28)',
        glowSecondary: 'rgba(56, 130, 246, 0.14)',
        glowWarm: 'rgba(250, 204, 21, 0.12)',
        bgWord: '#99f6e4',
        ink: '#effefd',
        muted: 'rgba(239, 254, 253, 0.62)',
        faint: 'rgba(239, 254, 253, 0.36)',
        pillBg: 'rgba(45, 212, 191, 0.12)',
        pillBorder: 'rgba(94, 234, 212, 0.32)',
        pillText: '#5eead4',
        accentText: '#5eead4',
        success: '#4ade80',
        warning: '#fbbf24',
        noiseOpacity: 0.16
      }
    : {
        background: '#effaf8',
        glowPrimary: 'rgba(20, 184, 166, 0.26)',
        glowSecondary: 'rgba(125, 211, 252, 0.40)',
        glowWarm: 'rgba(250, 204, 21, 0.26)',
        bgWord: '#0c3b38',
        ink: '#0c3b38',
        muted: 'rgba(12, 59, 56, 0.68)',
        faint: 'rgba(12, 59, 56, 0.42)',
        pillBg: 'rgba(20, 184, 166, 0.10)',
        pillBorder: 'rgba(20, 184, 166, 0.30)',
        pillText: '#0f766e',
        accentText: '#0d9488',
        success: '#15803d',
        warning: '#8a5a06',
        noiseOpacity: 0.12
      }

  /**
   * 渠道状态：文案按具体状态区分（有更新 / 已是最新 / 低于当前版本 / 暂未发布 / 获取失败），
   * 颜色只分两档 —— 可升级（success）与置灰（faint）：非可升级状态一律不引导行动。
   * active 供行内所有元素同步置灰。
   */
  const statusView = (channel: UpdateChannelInfo) => {
    if (channel.status === 'missing') return { dot: palette.faint, text: '该渠道暂未发布', active: false }
    if (channel.status === 'error') return { dot: palette.faint, text: '获取失败', active: false }
    if (channel.status === 'canary') return { dot: palette.accentText, text: 'main 分支构建', active: true }
    const order = semverCompare(channel.version ?? '0.0.0', data.currentVersion)
    if (order > 0) return { dot: palette.success, text: '有更新可升级', active: true }
    if (order === 0) return { dot: palette.faint, text: '已是最新', active: false }
    return { dot: palette.faint, text: '低于当前版本', active: false }
  }

  return (
    <DefaultLayout {...props} className="relative min-h-440 overflow-hidden" style={{ backgroundColor: palette.background }}>
      {/* 氛围层：三片弥散光 + 横排背景字 */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -left-130 -top-120 h-337.5 w-375 rounded-full blur-[230px]"
          style={{ background: `radial-gradient(ellipse at center, ${palette.glowPrimary} 0%, transparent 70%)` }}
        />
        <div
          className="absolute -right-130 top-[36%] h-312.5 w-300 rounded-full blur-[240px]"
          style={{ background: `radial-gradient(ellipse at center, ${palette.glowSecondary} 0%, transparent 72%)` }}
        />
        <div
          className="absolute -bottom-120 -left-80 h-287.5 w-337.5 rounded-full blur-[260px]"
          style={{ background: `radial-gradient(ellipse at center, ${palette.glowWarm} 0%, transparent 72%)` }}
        />
        <div
          className="pointer-events-none absolute right-14 top-8 select-none font-bold leading-none tracking-[-0.02em]"
          style={{ fontSize: '220px', opacity: 0.04, color: palette.bgWord }}
        >
          UPDATE
        </div>
      </div>

      {/* 高对比离散噪点层（runtime 同源数值：离散纯黑白颗粒，深 0.16 / 浅 0.12） */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{ opacity: palette.noiseOpacity }}>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="updateHelpNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" result="gray" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#updateHelpNoise)" />
        </svg>
      </div>

      <main className="relative z-10 px-22 pb-16 pt-20">
        {/* 顶带：小节标签 + 当前渠道 */}
        <header className="relative flex items-center justify-between gap-12">
          <div className="flex items-center gap-4">
            <span className="h-3 w-3 rounded-full" style={{ background: palette.accentText }} />
            <span className="whitespace-nowrap text-[24px] font-bold tracking-[0.28em] text-foreground/44">更新面板 · UPDATE PANEL</span>
          </div>
          <span
            className="whitespace-nowrap rounded-full border px-6 py-2 text-[22px] font-bold tracking-[0.14em]"
            style={{ borderColor: palette.pillBorder, background: palette.pillBg, color: palette.pillText }}
          >
            {data.currentChannel}
          </span>
        </header>

        {/* Hero：短版本与标题同行横排；长版本（canary）堆叠——版本号独占整行按宽自适应，避免溢出 */}
        {heroStacked(data.currentVersion) ? (
          <>
            <div>
              <h1 className="whitespace-nowrap text-[96px] font-bold leading-[1.04] tracking-[-0.02em] text-foreground">更新渠道</h1>
              <p className="mt-6 whitespace-nowrap text-[30px] font-semibold text-foreground/48">
                {data.currentChannel === '金丝雀'
                  ? '金丝雀构建跟随 main 分支实时发布，可随时切换回正式渠道'
                  : '各渠道可用版本与 #kkk更新 用法一览'}
              </p>
            </div>
            <div className="relative mt-14">
              <div className="text-[22px] font-bold uppercase tracking-[0.22em] text-foreground/36">当前安装 · INSTALLED</div>
              <div
                className="mt-4 whitespace-nowrap font-mono font-bold leading-none tracking-[-0.05em] tabular-nums text-foreground"
                style={{ fontSize: `${heroVersionSize(data.currentVersion)}px` }}
              >
                <span className="mr-3 align-top text-[0.42em] font-bold text-foreground/40">v</span>
                {data.currentVersion}
              </div>
            </div>
          </>
        ) : (
          <div className="relative mt-14 flex items-end justify-between gap-12">
            <div>
              <h1 className="whitespace-nowrap text-[96px] font-bold leading-[1.04] tracking-[-0.02em] text-foreground">更新渠道</h1>
              <p className="mt-6 whitespace-nowrap text-[30px] font-semibold text-foreground/48">
                {data.currentChannel === '金丝雀'
                  ? '金丝雀构建跟随 main 分支实时发布，可随时切换回正式渠道'
                  : '各渠道可用版本与 #kkk更新 用法一览'}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end">
              <div className="text-[22px] font-bold uppercase tracking-[0.22em] text-foreground/36">当前安装 · INSTALLED</div>
              <div
                className="mt-4 whitespace-nowrap font-mono font-bold leading-none tracking-[-0.05em] tabular-nums text-foreground"
                style={{ fontSize: `${heroVersionSize(data.currentVersion)}px` }}
              >
                <span className="mr-3 align-top text-[0.42em] font-bold text-foreground/40">v</span>
                {data.currentVersion}
              </div>
            </div>
          </div>
        )}

        {/* 渠道清单：固定列宽 grid，命令列纵向对齐；稳定度序 正式 → 预览 → 测试 → 金丝雀 */}
        <section className="relative mt-24">
          <div className="flex items-center gap-4">
            <span className="h-3 w-3 rounded-full" style={{ background: palette.accentText }} />
            <span className="text-[24px] font-bold tracking-[0.28em] text-foreground/44">可用版本 · AVAILABLE</span>
          </div>

          <div className="mt-12 flex flex-col gap-14">
            {data.channels.map((channel) => {
              const status = statusView(channel)
              const publishedDate = channel.publishedAt ? new Date(channel.publishedAt) : undefined

              // 金丝雀：独立纵向块（长安装命令 + 发布时间放不进三列行）
              if (channel.status === 'canary') {
                return (
                  <div key={channel.tag} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-10">
                      <div className="flex items-center gap-4">
                        <span
                          className="whitespace-nowrap text-[30px] font-semibold"
                          style={{ color: status.active ? palette.muted : palette.faint }}
                        >
                          {channel.label}
                        </span>
                        <span
                          className="whitespace-nowrap rounded-full border px-4 py-0.5 font-mono text-[20px] font-semibold"
                          style={{
                            borderColor: palette.pillBorder,
                            background: palette.pillBg,
                            color: status.active ? palette.pillText : palette.faint
                          }}
                        >
                          {channel.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span
                          className="whitespace-nowrap font-mono text-[46px] font-bold leading-none"
                          style={{ color: status.active ? palette.ink : palette.faint }}
                        >
                          {channel.version}
                        </span>
                        <span className="flex items-center gap-3 whitespace-nowrap text-[24px] font-semibold" style={{ color: status.dot }}>
                          <span className="h-2.5 w-2.5 rounded-full" style={{ background: status.dot }} />
                          {status.text}
                        </span>
                      </div>
                    </div>

                    {/* 安装命令：整块供复制 */}
                    {channel.installCommand && (
                      <div
                        className="whitespace-nowrap rounded-3xl px-7 py-4 font-mono text-[27px] font-semibold"
                        style={{
                          background: status.active ? palette.pillBg : 'transparent',
                          color: status.active ? palette.pillText : palette.faint
                        }}
                      >
                        {channel.installCommand}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-10 whitespace-nowrap">
                      <span className="text-[24px] text-foreground/42">
                        发布于 {publishedDate && format(publishedDate, 'yyyy/MM/dd HH:mm')}
                      </span>
                      <span className="font-mono text-[24px] font-semibold" style={{ color: palette.faint }} title={channel.publishedAt}>
                        {publishedDate && formatDistanceToNow(publishedDate, { addSuffix: true, locale: zhCN })}
                      </span>
                    </div>
                  </div>
                )
              }

              // semver 渠道：三列行（渠道 → 命令 → 版本/状态）
              return (
                <div key={channel.tag} className="grid grid-cols-[11rem_1fr_auto] items-center gap-8">
                  <div className="flex flex-col gap-2">
                    <span
                      className="whitespace-nowrap text-[30px] font-semibold"
                      style={{ color: status.active ? palette.muted : palette.faint }}
                    >
                      {channel.label}
                    </span>
                    <span
                      className="w-fit whitespace-nowrap rounded-full border px-4 py-0.5 font-mono text-[20px] font-semibold"
                      style={{
                        borderColor: palette.pillBorder,
                        background: palette.pillBg,
                        color: status.active ? palette.pillText : palette.faint
                      }}
                    >
                      {channel.tag}
                    </span>
                  </div>
                  <span
                    className="whitespace-nowrap font-mono text-[24px] font-semibold"
                    style={{ color: status.active ? palette.muted : palette.faint }}
                  >
                    {channel.command}
                  </span>
                  <div className="flex flex-col items-end gap-2.5 whitespace-nowrap">
                    <span
                      className="font-mono text-[56px] font-bold leading-none tracking-[-0.02em] tabular-nums"
                      style={{ color: status.active ? palette.ink : palette.faint }}
                    >
                      {channel.status === 'ok' ? `v${channel.version}` : '—'}
                    </span>
                    <span className="flex items-center gap-3 text-[24px] font-semibold" style={{ color: status.dot }}>
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: status.dot }} />
                      {status.text}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 用法：命令 → 说明 单行对 */}
        <section className="relative mt-28">
          <div className="flex items-center gap-4">
            <span className="h-3 w-3 rounded-full" style={{ background: palette.accentText }} />
            <span className="text-[24px] font-bold tracking-[0.28em] text-foreground/44">用法 · COMMANDS</span>
          </div>

          <div className="mt-12 flex flex-col gap-10">
            {[
              { command: '#kkk更新', desc: '更新到最新正式版' },
              { command: '#kkk更新rc', desc: '更新到预览渠道最新版' },
              { command: '#kkk更新beta', desc: '更新到测试渠道最新版' },
              { command: '#kkk更新<版本号>', desc: '更新到指定 stable 版本，例如 #kkk更新2.45.0' }
            ].map((item) => (
              <div key={item.command} className="grid grid-cols-[24rem_1fr] items-baseline gap-8">
                <span className="whitespace-nowrap font-mono text-[34px] font-bold text-foreground">{item.command}</span>
                <span className="whitespace-nowrap text-[26px] font-semibold text-foreground/48">{item.desc}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-2 whitespace-nowrap font-mono text-[22px] font-semibold text-foreground/28">
            <span>金丝雀版本经 pkg.pr.new 分发，不提供渠道订阅与更新推送</span>
            <span>指定低于当前安装版本的版本号属于降级，需回复「确认」才会执行</span>
          </div>
        </section>
      </main>
    </DefaultLayout>
  )
})
