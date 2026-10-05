import React from 'react'

import { isDark } from '../../../../utils/theme'
import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterProps } from '../../../types/ctx'
import type { UpdateHelpData } from './types'

/**
 * `#kkk更新` 用法面板（kkk-design 系统 B：弥散信息海报 / 双栏构图）。
 *
 * 左栏：系统标签、主标题、当前安装版本（第一视觉锚点）与降级提示摘要；
 * 右栏：玻璃面板承载三渠道可用版本行（渠道名 + dist-tag + 版本 + 状态徽章），
 *       面板底部为用法命令清单（等宽字体，保持机器感）。
 * 背景：纯底色 + 左上/右中/底部三片弥散光 + 单色噪点 + 低透明背景字。
 */
export const UpdateHelp: React.FC<PosterProps<UpdateHelpData>> = React.memo((props) => {
  const { data } = props
  const dark = isDark(props.ctx)

  const palette = dark
    ? {
        background: '#0d0a1c',
        glowPrimary: 'rgba(139, 92, 246, 0.32)',
        glowSecondary: 'rgba(56, 189, 248, 0.16)',
        glowWarm: 'rgba(251, 146, 60, 0.14)',
        ink: '#f6f3ff',
        muted: 'rgba(246, 243, 255, 0.62)',
        faint: 'rgba(246, 243, 255, 0.38)',
        panelBg: 'rgba(255, 255, 255, 0.06)',
        panelBorder: 'rgba(255, 255, 255, 0.14)',
        rowBg: 'rgba(255, 255, 255, 0.05)',
        rowBorder: 'rgba(255, 255, 255, 0.08)',
        pillBg: 'rgba(139, 92, 246, 0.16)',
        pillBorder: 'rgba(196, 181, 253, 0.35)',
        pillText: '#c4b5fd',
        accent: '#a78bfa',
        success: '#4ade80',
        warning: '#fdba74'
      }
    : {
        background: '#f7f4ff',
        glowPrimary: 'rgba(139, 92, 246, 0.30)',
        glowSecondary: 'rgba(56, 189, 248, 0.20)',
        glowWarm: 'rgba(251, 146, 60, 0.16)',
        ink: '#1c1436',
        muted: 'rgba(28, 20, 54, 0.66)',
        faint: 'rgba(28, 20, 54, 0.42)',
        panelBg: 'rgba(255, 255, 255, 0.62)',
        panelBorder: 'rgba(28, 20, 54, 0.10)',
        rowBg: 'rgba(255, 255, 255, 0.66)',
        rowBorder: 'rgba(28, 20, 54, 0.08)',
        pillBg: 'rgba(139, 92, 246, 0.12)',
        pillBorder: 'rgba(139, 92, 246, 0.30)',
        pillText: '#6d28d9',
        accent: '#7c3aed',
        success: '#16a34a',
        warning: '#d97706'
      }

  const noiseOpacity = dark ? 0.13 : 0.1

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
            top: '620px'
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
        {/* 噪点 */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay" style={{ opacity: noiseOpacity }}>
          <filter id="updateHelpNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#updateHelpNoise)" />
        </svg>
        {/* 背景气氛字 */}
        <div
          className="pointer-events-none absolute select-none font-bold leading-none tracking-tight"
          style={{ right: '36px', top: '48px', fontSize: '196px', opacity: 0.05, color: palette.ink }}
        >
          UPDATE
        </div>
        {/* 角落短线组 */}
        <div className="pointer-events-none absolute bottom-16 left-20 flex select-none flex-col gap-2">
          <div className="h-1 w-24 rounded-full" style={{ backgroundColor: palette.accent, opacity: 0.5 }} />
          <div className="h-1 w-14 rounded-full" style={{ backgroundColor: palette.accent, opacity: 0.3 }} />
          <div className="h-1 w-8 rounded-full" style={{ backgroundColor: palette.accent, opacity: 0.18 }} />
        </div>
      </div>

      {/* 内容：双栏 4/8 */}
      <section className="relative z-10 grid grid-cols-12 gap-12 px-20 pt-20 pb-10">
        {/* 左栏：身份与当前安装 */}
        <aside className="col-span-4 flex flex-col gap-14">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: palette.accent }} />
              <span className="text-[24px] font-bold uppercase tracking-[0.26em]" style={{ color: palette.muted }}>
                Update Channels
              </span>
            </div>
            <h1 className="text-[104px] font-bold leading-[1.02]" style={{ color: palette.ink }}>
              更新渠道
            </h1>
          </div>

          <div>
            <div className="text-[26px] font-semibold uppercase tracking-[0.18em]" style={{ color: palette.faint }}>
              Installed
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-5">
              <span className="font-mono text-[64px] font-bold leading-none tabular-nums" style={{ color: palette.ink }}>
                v{data.currentVersion}
              </span>
              <span
                className="rounded-full border px-5 py-1.5 text-[26px] font-bold"
                style={{ backgroundColor: palette.pillBg, borderColor: palette.pillBorder, color: palette.pillText }}
              >
                {data.currentChannel}
              </span>
            </div>
          </div>

          <p className="text-[28px] leading-[1.6]" style={{ color: palette.muted }}>
            订阅渠道后，新版本发布时会自动推送变更日志；降级到更低的版本号需要回复「确认」才会执行。
          </p>
        </aside>

        {/* 右栏：玻璃面板 */}
        <section className="col-span-8 flex flex-col gap-10">
          <div
            className="rounded-[3rem] border p-12 backdrop-blur-xl"
            style={{ backgroundColor: palette.panelBg, borderColor: palette.panelBorder }}
          >
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-[56px] font-bold leading-none" style={{ color: palette.ink }}>
                可用版本
              </h2>
              <div className="h-2.5 w-24 rounded-full" style={{ backgroundColor: palette.accent }} />
            </div>

            <ul className="flex flex-col gap-6">
              {data.channels.map((channel) => (
                <li
                  key={channel.tag}
                  className="flex items-center justify-between rounded-[32px] border px-9 py-7"
                  style={{ backgroundColor: palette.rowBg, borderColor: palette.rowBorder }}
                >
                  <div className="flex flex-col gap-2">
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
                    <div className="font-mono text-[26px]" style={{ color: palette.muted }}>
                      {channel.command}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-mono text-[42px] font-bold leading-none tabular-nums" style={{ color: palette.ink }}>
                      {channel.available ? `v${channel.version}` : '——'}
                    </span>
                    {channel.available &&
                      (channel.hasUpdate ? (
                        <span className="text-[26px] font-bold" style={{ color: palette.success }}>
                          有更新可升级
                        </span>
                      ) : (
                        <span className="text-[26px] font-semibold" style={{ color: palette.faint }}>
                          已是最新
                        </span>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 用法清单 */}
          <div
            className="rounded-[3rem] border p-12 backdrop-blur-xl"
            style={{ backgroundColor: palette.panelBg, borderColor: palette.panelBorder }}
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-[56px] font-bold leading-none" style={{ color: palette.ink }}>
                用法
              </h2>
              <span className="text-[24px] font-semibold uppercase tracking-[0.20em]" style={{ color: palette.faint }}>
                Commands
              </span>
            </div>
            <ul className="flex flex-col gap-5">
              {[
                { command: '#kkk更新', desc: '更新到最新正式版' },
                { command: '#kkk更新beta', desc: '更新到测试渠道最新版' },
                { command: '#kkk更新rc', desc: '更新到预览渠道最新版' },
                { command: '#kkk更新<版本号>', desc: '更新到指定版本（如 #kkk更新2.45.0）' }
              ].map((item) => (
                <li key={item.command} className="flex items-center gap-6">
                  <span
                    className="rounded-2xl px-5 py-2 font-mono text-[30px] font-semibold"
                    style={{ backgroundColor: palette.pillBg, color: palette.pillText }}
                  >
                    {item.command}
                  </span>
                  <span className="text-[30px]" style={{ color: palette.muted }}>
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[26px] leading-[1.5]" style={{ color: palette.faint }}>
              金丝雀版本经 pkg.pr.new 分发，不提供渠道订阅与推送；指定低于当前的版本号时需回复「确认」执行降级。
            </p>
          </div>
        </section>
      </section>
    </DefaultLayout>
  )
})
