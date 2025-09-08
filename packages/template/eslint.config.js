import stylistic from '@stylistic/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: [
      'src-tauri/**',
      'dist/**',
      'dev-data/**',
      'node_modules/**'
    ]
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': typescriptEslint,
      'simple-import-sort': simpleImportSort,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // 导入排序规则
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      
      // TypeScript 未使用变量规则
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        args: 'after-used'
      }],
      
      // 禁用变量提升检查
      'no-use-before-define': ['off', {
        functions: false,
        classes: false,
        variables: true
      }],
      
      // 代码格式化规则
      '@stylistic/comma-dangle': ['error', 'never'], // 禁止对象末尾逗号
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }], // 限制空行数量
      '@stylistic/object-curly-spacing': ['error', 'always'], // 对象花括号内空格
      '@stylistic/array-bracket-spacing': ['error', 'never'], // 数组方括号内无空格
      '@stylistic/comma-spacing': ['error', { before: false, after: true }], // 逗号后空格
      '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }], // 对象键值对空格
      '@stylistic/space-before-blocks': ['error', 'always'], // 代码块前空格
      '@stylistic/space-infix-ops': 'error', // 操作符周围空格
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }], // 关键字周围空格
      '@stylistic/semi': ['error', 'never'], // 不使用分号
      '@stylistic/quotes': ['error', 'single'], // 使用单引号
      '@stylistic/indent': ['error', 2], // 使用2个空格缩进
      '@stylistic/no-multi-spaces': 'error', // 禁止多个空格

      // JSX 格式化规则
      '@stylistic/jsx-curly-spacing': ['error', { when: 'never' }], // JSX花括号内无空格
      '@stylistic/jsx-equals-spacing': ['error', 'never'], // JSX等号周围无空格
      '@stylistic/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never'
      }]
    }
  }
]