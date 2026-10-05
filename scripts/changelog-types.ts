/**
 * changelog 类型单一来源 —— 三处共用，改这里一处即可：
 *   - `.husky/husky-tasks.ts`：commit-msg 钩子校验允许的提交类型
 *   - `scripts/release.ts`：发版时按这里的分组与标题生成 CHANGELOG.md 条目
 *   - `changelogithub.config.ts`：changelogithub 生成 GitHub Release 的分组
 *
 * 顺序即分组输出顺序；清单与历史 release-please 的 changelog-sections 对齐。
 */
export interface ChangelogSection {
  type: string
  title: string
}

export const changelogSections: ChangelogSection[] = [
  { type: 'feat', title: '✨ 新功能' },
  { type: 'fix', title: '🐛 错误修复' },
  { type: 'perf', title: '⚡️ 性能优化' },
  { type: 'revert', title: '⏪️ 回退提交' },
  { type: 'docs', title: '📝 文档更新' },
  { type: 'style', title: '💄 UI 优化' },
  { type: 'chore', title: '🧰 其他更新' },
  { type: 'refactor', title: '♻️ 代码重构' },
  { type: 'test', title: '✅ 测试相关' },
  { type: 'deps', title: '📦 依赖更新' },
  { type: 'build', title: '🏗️ 构建系统' },
  { type: 'ci', title: '🎡 持续集成' },
  { type: 'sec', title: '🔒 安全修复' },
  { type: 'i18n', title: '🌐 国际化' },
  { type: 'ui', title: '💄 UI 优化' },
  { type: 'lint', title: '🧹 Lint/代码格式' },
  { type: 'types', title: '📐 类型定义' },
  { type: 'config', title: '⚙️ 配置变更' },
  { type: 'db', title: '🗃️ 数据库迁移' },
  { type: 'opt', title: '💯 细节优化' },
  { type: 'amagi', title: '🧩 接口库更新' }
]
