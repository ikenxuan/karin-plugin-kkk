import simpleImportSort from 'eslint-plugin-simple-import-sort'
import neostandard from 'neostandard'

const data = neostandard({
  ignores: ['node_modules', 'temp', 'logs', 'data', 'lib', 'dist'],
  globals: ['NodeJS', 'RequestRedirect'],
  ts: true,
  files: ['src/**/*.ts'],
})

const newData = []

data.forEach(val => {
  // 驼峰命名规则关闭
  if (val?.rules?.['camelcase']) val.rules['camelcase'] = ['off']

  if (val?.rules) val.rules['no-unmodified-loop-condition'] = ['off']

  // ts
  if (val.name === 'neostandard/ts') {
    Object.keys(val.rules).forEach((key) => {
      if (val.rules[key] === 'off') val.rules[key] = 'error'
    })
    val.rules['@typescript-eslint/no-unused-vars'] = ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
      args: 'after-used'
    }]
    val.rules['no-use-before-define'] = ['off', {
      functions: false,
      classes: false,
      variables: true
    }]
  }
  newData.push(val)
})

// 添加 simple-import-sort 插件配置
newData.push({
  name: 'simple-import-sort',
  plugins: {
    'simple-import-sort': simpleImportSort
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
})

export default newData
