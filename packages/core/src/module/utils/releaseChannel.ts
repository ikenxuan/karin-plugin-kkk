/**
 * 发布渠道解析
 *
 * 渠道由版本号的 prerelease 后缀决定（git tag 与 npm dist-tag 遵循同一约定：
 * release.yml 发布时 `-beta.N` 挂 beta、`-rc.N` 挂 rc，正式版挂 latest）：
 *   - `2.44.2`        → Stable 正式版
 *   - `2.45.0-beta.1` → Beta 测试版（beta.<序号> 后缀）
 *   - `2.45.0-rc.1`   → Rc 预览版
 *   - `-canary.*`      → Canary 金丝雀（CI 的 pkg.pr.new 构建统一用此标识，
 *                        按 PR 编号 / 分支名 / 提交序号 / 手动时间戳细分）
 *   - 其余带后缀形态   → Canary 金丝雀（历史遗留 `-beta.N.M`、`-alpha.*`、`-dev.*`
 *                        等三段以上/未知后缀，经 pkg.pr.new / 构建分支安装，
 *                        不参与 npm 渠道订阅与更新推送）
 */
export type ReleaseChannel = 'Stable' | 'Beta' | 'Rc' | 'Canary'

export const parseReleaseChannel = (version: string): ReleaseChannel => {
  const v = version.trim().replace(/^[vV]/, '').split('+', 1)[0]
  const match = /^\d+\.\d+\.\d+(?:-(.+))?$/.exec(v)
  if (!match) return 'Canary'
  if (!match[1]) return 'Stable'
  const pre = match[1].split('.')
  if (pre[0] === 'rc') return 'Rc'
  if (pre[0] === 'canary') return 'Canary'
  if (pre[0] === 'beta' && pre.length <= 2) return 'Beta'
  return 'Canary'
}

/** 渠道显示名（中文） */
export const RELEASE_CHANNEL_LABEL: Record<ReleaseChannel, string> = {
  Stable: '正式版',
  Beta: '测试版',
  Rc: '预览版',
  Canary: '金丝雀'
}
