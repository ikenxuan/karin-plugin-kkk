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
  ignorePatterns: ['**/*.html', '**/Karin/**']
})
