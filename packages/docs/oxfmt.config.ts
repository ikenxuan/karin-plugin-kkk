import { defineConfig } from 'oxfmt'

export default defineConfig({
  semi: false,
  trailingComma: 'none',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 140,
  sortImports: {
    newlinesBetween: true,
    sortNamedImports: true
  },
  spaceBeforeFunctionParen: true,
  ignorePatterns: ['**/*.html', '**/Karin/**']
})
