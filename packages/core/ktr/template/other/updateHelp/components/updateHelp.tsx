import React from 'react'

import { isDark } from '../../../../utils/theme'
import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterProps } from '../../../types/ctx'
import type { UpdateChannelInfo, UpdateHelpData } from './types'

/**
 * `#kkk更新` 用法面板（kkk-design 系统 B 弥散信息海报 × Apple 材质与排版原则）。
 *
 * 双栏 4/8：左栏系统标签 + 主标题 + 当前安装（负字距大字锚点）+ 一句订阅说明；
 * 右栏单块玻璃面板承载渠道清单（hairline 分隔、状态灯），下接 2×2 命令矩阵与降级注记。
 * 排版按字号分级字距：大字负字距、正文归零、标签宽字距；行高随字号反向。
 */
export const UpdateHelp: React.FC<PosterProps<UpdateHelpData>> = React.memo((props) => {
  const { data } = props
  const dark = isDark(props.ctx)

  const palette = dark
    ? {
        background: '#0d0a1c',
        glowPrimary: 'rgba(139, 92, 246, 0.30)',
        glowSecondary: 'rgba(56, 189, 248, 0.15)',
        glowWarm: 'rgba(251, 146, 60, 0.13)',
        ink: '#f6f3ff',
        muted: 'rgba(246, 243, 255, 0.64)',
        faint: 'rgba(246, 243, 255, 0.40)',
        hairline: 'rgba(246, 243, 255, 0.10)',
        panelBg: 'rgba(255, 255, 255, 0.07)',
        panelBorder: 'rgba(255, 255, 255, 0.12)',
        panelTopEdge: 'rgba(255, 255, 255, 0.22)',
        pillBg: 'rgba(139, 92, 246, 0.16)',
        pillBorder: 'rgba(196, 181, 253, 0.32)',
        pillText: '#c4b5fd',
        accent: '#a78bfa',
        success: '#4ade80',
        warning: '#fdba74'
      }
    : {
        background: '#f7f4ff',
        glowPrimary: 'rgba(139, 92, 246, 0.28)',
        glowSecondary: 'rgba(56, 189, 248, 0.18)',
        glowWarm: 'rgba(251, 146, 60, 0.14)',
        ink: '#1c1436',
        muted: 'rgba(28, 20, 54, 0.68)',
        faint: 'rgba(28, 20, 54, 0.44)',
        hairline: 'rgba(28, 20, 54, 0.10)',
        panelBg: 'rgba(255, 255, 255, 0.64)',
        panelBorder: 'rgba(28, 20, 54, 0.10)',
        panelTopEdge: 'rgba(255, 255, 255, 0.85)',
        pillBg: 'rgba(139, 92, 246, 0.11)',
        pillBorder: 'rgba(139, 92, 246, 0.28)',
        pillText: '#6d28d9',
        accent: '#7c3aed',
        success: '#15803d',
        warning: '#b45309'
      }

  /** 渠道状态语义：反馈四类中的 status/warning/error */
  const statusView = (channel: UpdateChannelInfo) => {
    switch (channel.status) {
      case 'ok':
        return channel.hasUpdate ? { dot: palette.success, text: '有更新可升级' } : { dot: palette.faint, text: '已是最新' }
      case 'missing':
        return { dot: palette.faint, text: '该渠道暂未发布' }
      case 'error':
        return { dot: palette.warning, text: '获取失败' }
      default:
        return { dot: palette.faint, text: '不提供推送' }
    }
  }

  const noiseOpacity = dark ? 0.12 : 0.09
  const channelRows = data.channels

  return (
    <DefaultLayout {...props} className="relative overflow-hidden" style={{ backgroundColor: palette.background }}>
      {/* 弥散光：左上主情绪 / 右中辅助 / 底部暖色 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <div
          className="absolute rounded-full blur-[170px]"
          style={{
            background: `radial-gradient(ellipse at 40% 40%, ${palette.glowPrimary} 0%, transparent 70%)`,
            width: '1180px',
            height: '1040px',
            left: '-300px',
            top: '-280px'
          }}
        />
        <div
          className="absolute rounded-full blur-[150px]"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${palette.glowSecondary} 0%, transparent 72%)`,
            width: '860px',
            height: '820px',
            right: '-260px',
            top: '600px'
          }}
        />
        <div
          className="absolute rounded-full blur-[200px]"
          style={{
            background: `radial-gradient(ellipse at 50% 60%, ${palette.glowWarm} 0%, transparent 75%)`,
            width: '1040px',
            height: '700px',
            left: '120px',
            bottom: '-320px'
          }}
        />
        {/* 噪点：单色低透明，只做质感 */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay" style={{ opacity: noiseOpacity }}>
          <filter id="updateHelpNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#updateHelpNoise)" />
        </svg>
        {/* 背景气氛字 */}
        <div
          className="pointer-events-none absolute right-10 top-10 select-none font-bold leading-none tracking-[-0.02em]"
          style={{ fontSize: '200px', opacity: 0.05, color: palette.ink }}
        >
          UPDATE
        </div>
        {/* 角落短线组 */}
        <div className="pointer-events-none absolute bottom-14 left-20 flex select-none flex-col gap-2">
          <div className="h-1 w-24 rounded-full" style={{ backgroundColor: palette.accent, opacity: 0.5 }} />
          <div className="h-1 w-14 rounded-full" style={{ backgroundColor: palette.accent, opacity: 0.3 }} />
          <div className="h-1 w-8 rounded-full" style={{ backgroundColor: palette.accent, opacity: 0.18 }} />
        </div>
      </div>

      {/* 内容：双栏 4/8 */}
      <section className="relative z-10 grid grid-cols-12 gap-10 px-20 pt-20 pb-12">
        {/* 左栏：身份与当前安装 */}
        <aside className="col-span-4 flex flex-col">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: palette.accent }} />
            <span className="text-[24px] font-bold uppercase tracking-[0.26em]" style={{ color: palette.muted }}>
              Update Channels
            </span>
          </div>

          <h1 className="text-[112px] font-bold leading-[1.0] tracking-[-0.02em]" style={{ color: palette.ink }}>
            更新
            <br />
            渠道
          </h1>

          {/* 当前安装：第一视觉锚点 */}
          <div className="mt-16">
            <div className="text-[24px] font-semibold uppercase tracking-[0.22em]" style={{ color: palette.faint }}>
              Installed
            </div>
            <div
              className="mt-4 font-mono text-[72px] font-bold leading-none tracking-[-0.01em] tabular-nums"
              style={{ color: palette.ink }}
            >
              v{data.currentVersion}
            </div>
            <div className="mt-5">
              <span
                className="inline-block rounded-full border px-5 py-1.5 text-[26px] font-bold"
                style={{ backgroundColor: palette.pillBg, borderColor: palette.pillBorder, color: palette.pillText }}
              >
                {data.currentChannel}
              </span>
            </div>
          </div>

          {/* 分隔 hairline */}
          <div className="my-12 h-px w-full" style={{ backgroundColor: palette.hairline }} />

          <p className="whitespace-nowrap text-[27px] leading-[1.6]" style={{ color: palette.muted }}>
            新版本发布时自动推送变更日志
            <br />
            降级到更低版本号需回复「确认」执行
          </p>
        </aside>

        {/* 右栏：单块玻璃面板（Apple 材质：hairline 分隔、顶缘高光，不做卡中卡） */}
        <section className="col-span-8 flex flex-col gap-10">
          <div
            className="rounded-[3rem] border px-12 py-10 backdrop-blur-xl"
            style={{
              backgroundColor: palette.panelBg,
              borderColor: palette.panelBorder,
              boxShadow: `inset 0 1px 0 ${palette.panelTopEdge}`
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[44px] font-bold leading-none tracking-[-0.01em]" style={{ color: palette.ink }}>
                可用版本
              </h2>
              <span className="font-mono text-[24px] uppercase tracking-[0.16em]" style={{ color: palette.faint }}>
                npm dist-tags
              </span>
            </div>

            <ul>
              {channelRows.map((channel, index) => {
                const status = statusView(channel)
                return (
                  <li
                    key={channel.tag}
                    className="flex items-center justify-between gap-8 py-7"
                    style={{ borderTop: index === 0 ? 'none' : `1px solid ${palette.hairline}` }}
                  >
                    <div className="flex min-w-0 flex-col gap-2 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <span className="text-[34px] font-bold" style={{ color: palette.ink }}>
                          {channel.label}
                        </span>
                        <span
                          className="rounded-full border px-4 py-0.5 font-mono text-[22px] font-semibold"
                          style={{ backgroundColor: palette.pillBg, borderColor: palette.pillBorder, color: palette.pillText }}
                        >
                          {channel.tag}
                        </span>
                      </div>
                      {channel.command && (
                        <div className="font-mono text-[24px]" style={{ color: palette.muted }}>
                          {channel.command}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 whitespace-nowrap">
                      <span
                        className="font-mono text-[44px] font-bold leading-none tabular-nums"
                        style={{ color: channel.status === 'ok' ? palette.ink : palette.faint }}
                      >
                        {channel.status === 'ok' ? `v${channel.version}` : '—'}
                      </span>
                      <span className="flex items-center gap-2.5 text-[25px] font-semibold" style={{ color: status.dot }}>
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: status.dot }} />
                        {status.text}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* 用法矩阵：2×2 命令卡 */}
          <div
            className="rounded-[3rem] border px-12 py-10 backdrop-blur-xl"
            style={{
              backgroundColor: palette.panelBg,
              borderColor: palette.panelBorder,
              boxShadow: `inset 0 1px 0 ${palette.panelTopEdge}`
            }}
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-[44px] font-bold leading-none tracking-[-0.01em]" style={{ color: palette.ink }}>
                用法
              </h2>
              <span className="text-[24px] font-semibold uppercase tracking-[0.22em]" style={{ color: palette.faint }}>
                Commands
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { command: '#kkk更新', desc: '更新到最新正式版' },
                { command: '#kkk更新beta', desc: '更新到测试渠道' },
                { command: '#kkk更新rc', desc: '更新到预览渠道' },
                { command: '#kkk更新<版本号>', desc: '更新到指定版本' }
              ].map((item) => (
                <div
                  key={item.command}
                  className="flex flex-col gap-3 rounded-[28px] px-8 py-6"
                  style={{ backgroundColor: palette.rowBg ?? palette.panelBg }}
                >
                  <span className="whitespace-nowrap font-mono text-[30px] font-semibold" style={{ color: palette.pillText }}>
                    {item.command}
                  </span>
                  <span className="whitespace-nowrap text-[25px]" style={{ color: palette.muted }}>
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-1.5" style={{ color: palette.faint }}>
              <span className="whitespace-nowrap text-[25px] leading-[1.5]">金丝雀经 pkg.pr.new 分发，不提供渠道订阅与推送</span>
              <span className="whitespace-nowrap text-[25px] leading-[1.5]">指定低于当前的版本号属于降级，需回复「确认」执行</span>
            </div>
          </div>
        </section>
      </section>
    </DefaultLayout>
  )
})
