import { defineConfig } from 'oxfmt'

export default defineConfig({
  semi: false,
  trailingComma: 'none',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 140,
  sortImports: {
    partitionByNewline: false,
    newlinesBetween: true
  },
  // `packages/core/CHANGELOG.md` 沿用 release-please 时代的 markdown 风格（`*` 列表项、
  // 段前空两行），发版脚本（scripts/release.ts）按同款风格续写以保持条目一致 ——
  // 放进门禁只会逼出纯格式化 diff，没有收益。
  ignorePatterns: ['**/*.html', '**/Karin/**', 'packages/core/CHANGELOG.md']
})
