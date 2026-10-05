import { CircleFadingArrowUp } from 'lucide-react'
import React from 'react'

import { isDark } from '../../../../utils/theme'
import { DefaultLayout } from '../../../components/DefaultLayout'
import type { PosterProps } from '../../../types/ctx'
import type { UpdateHelpData } from './types'

/**
 * `#kkk更新` 用法面板。
 *
 * 展示当前安装版本、各渠道（正式/测试/预览）的远程可用版本与对应命令，
 * 并说明降级更新的二次确认规则。继承默认布局，与更新日志/版本模板同一视觉体系。
 */
export const UpdateHelp: React.FC<PosterProps<UpdateHelpData>> = React.memo((props) => {
  const { data } = props
  const dark = isDark(props.ctx)

  return (
    <DefaultLayout {...props} className="relative overflow-hidden">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-14 py-8">
        {/* 当前安装 */}
        <section>
          <div className="text-sm font-bold tracking-widest uppercase text-foreground/60">当前安装</div>
          <div className="mt-3 flex items-center gap-4">
            <span className="text-4xl font-bold tracking-wide">v{data.currentVersion}</span>
            <span className="rounded-full bg-foreground/10 px-4 py-1 text-sm font-bold text-foreground/80">{data.currentChannel}</span>
          </div>
        </section>

        {/* 各渠道可用版本 */}
        <section>
          <div className="text-sm font-bold tracking-widest uppercase text-foreground/60">各渠道可用版本</div>
          <ul className="mt-4 flex flex-col gap-4">
            {data.channels.map((channel) => (
              <li key={channel.tag} className="flex items-center justify-between rounded-2xl bg-foreground/5 px-6 py-4">
                <div className="flex flex-col items-start">
                  <div className="text-lg font-bold">{channel.label}</div>
                  <div className="font-mono text-sm text-foreground/60">{channel.command}</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-mono text-xl font-bold">{channel.available ? `v${channel.version}` : '获取失败'}</div>
                  {channel.available &&
                    (channel.hasUpdate ? (
                      <div className="flex items-center gap-1 text-sm font-bold text-success">
                        <CircleFadingArrowUp className="h-4 w-4" />
                        <span>有更新可升级</span>
                      </div>
                    ) : (
                      <div className="text-sm text-foreground/50">已是最新或更高</div>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 用法说明 */}
        <section>
          <div className="text-sm font-bold tracking-widest uppercase text-foreground/60">用法说明</div>
          <ul className="mt-4 flex flex-col gap-3 text-base text-foreground/80">
            <li>
              <code className="rounded bg-foreground/10 px-2 py-0.5 font-mono text-sm">#kkk更新</code>
              <span className="ml-2">更新到最新正式版</span>
            </li>
            <li>
              <code className="rounded bg-foreground/10 px-2 py-0.5 font-mono text-sm">#kkk更新beta</code>
              <span className="ml-2">更新到测试渠道最新版</span>
            </li>
            <li>
              <code className="rounded bg-foreground/10 px-2 py-0.5 font-mono text-sm">#kkk更新rc</code>
              <span className="ml-2">更新到预览渠道最新版</span>
            </li>
            <li>
              <code className="rounded bg-foreground/10 px-2 py-0.5 font-mono text-sm">#kkk更新&lt;版本号&gt;</code>
              <span className="ml-2">更新到指定版本，如 #kkk更新2.45.0、#kkk更新2.46.1-rc.2</span>
            </li>
            <li className="text-foreground/60">目标版本低于当前安装版本时属于降级，需要回复「确认」才会执行；金丝雀版本不提供更新推送</li>
          </ul>
        </section>

        {/* 底部占位，避免内容贴住页脚 */}
        <div className={dark ? 'opacity-0' : 'opacity-0'}>
          <span className="text-xs">.</span>
        </div>
      </div>
    </DefaultLayout>
  )
})
