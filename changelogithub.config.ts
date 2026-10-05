import { changelogSections } from './scripts/changelog-types'

// changelogithub 生成 GitHub Release notes 的分组配置 —— release.yml 里
// `pnpx changelogithub` 会从仓库根读它。默认只收录 feat/fix/perf，这里放开
// 全部类型；键序即分组顺序，与 CHANGELOG.md 的条目分组同源
// （scripts/changelog-types.ts）。
export default {
  types: Object.fromEntries(changelogSections.map((s) => [s.type, { title: s.title }]))
}
