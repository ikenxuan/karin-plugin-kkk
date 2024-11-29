import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  {
    files: ['lib/**/*.js', 'lib/**/*.d.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: {
        ...globals.node
      }
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // 禁用驼峰命名规则，允许使用下划线或其他命名方式。
      'camelcase': ['off'],
      // 要求使用 === 和 !== 而不是 == 和 !=，以避免类型强制转换带来的潜在错误。
      'eqeqeq': [1, 'always'],
      // 禁用优先使用 const 规则，允许使用 var 声明变量。
      'prefer-const': ['off'],
      // 禁止对象字面量或函数参数后的拖尾逗号。
      'comma-dangle': [1, 'never'],
      // 禁用箭头函数体的代码风格规则，允许使用大括号或不使用大括号。
      'arrow-body-style': 'off',
      // 要求使用两个空格进行缩进，并且在 switch case 语句中也使用两个空格缩进。
      'indent': [1, 2, { 'SwitchCase': 1 }],
      // 要求在函数声明的参数列表开括号前有一个空格。
      'space-before-function-paren': 1,
      // 要求不使用分号来结束语句。
      'semi': [1, 'never'],
      // 禁止行尾有多余的空格。
      'no-trailing-spaces': 1,
      // 要求对象字面量中的大括号内侧有一个空格。
      'object-curly-spacing': [1, 'always'],
      // 要求数组字面量中的方括号内侧有一个空格。
      'array-bracket-spacing': [1, 'always'],
      // 禁止多个空行，最多允许两行空行，文件末尾不允许空行。
      'no-multiple-empty-lines': [1, { max: 2, maxEOF: 0 }],
      // 要求导入语句按照字母顺序排序。
      'simple-import-sort/imports': 'error',
      // 要求导出语句按照字母顺序排序。
      'simple-import-sort/exports': 'error',
      // 要求逗号后面有空格，而逗号前面没有空格。
      "comma-spacing": ["error", { "before": false, "after": true }],
      // 要求对象字面量中键和冒号之间没有空格，而冒号后面有空格。
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
      // 要求二元操作符周围有空格。
      "space-infix-ops": "error",
      // 要求一元操作符与其操作数之间有空格，无论是单词类型的操作符还是非单词类型的操作符。
      "space-unary-ops": ["error", { "words": true, "nonwords": true }],
      // 要求代码块的开括号前有一个空格。
      "space-before-blocks": ["error", "always"],
      // 要求小括号内侧没有空格。
      "space-in-parens": ["error", "never"]
    }
  },
  {
    files: ['src/**/*.ts', 'src/**/*.d.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: {
        ...globals.node
      },
      parserOptions: {
        project: './tsconfig.json'
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // 禁用驼峰命名规则，允许使用下划线或其他命名方式。
      'camelcase': ['off'],
      // 要求使用 === 和 !== 而不是 == 和 !=，以避免类型强制转换带来的潜在错误。
      'eqeqeq': [1, 'always'],
      // 禁用优先使用 const 规则，允许使用 var 声明变量。
      'prefer-const': ['off'],
      // 禁止对象字面量或函数参数后的拖尾逗号。
      'comma-dangle': [1, 'never'],
      // 禁用箭头函数体的代码风格规则，允许使用大括号或不使用大括号。
      'arrow-body-style': 'off',
      // 要求使用两个空格进行缩进，并且在 switch case 语句中也使用两个空格缩进。
      'indent': [1, 2, { 'SwitchCase': 1 }],
      // 要求在函数声明的参数列表开括号前有一个空格。
      'space-before-function-paren': 1,
      // 要求不使用分号来结束语句。
      'semi': [1, 'never'],
      // 禁止行尾有多余的空格。
      'no-trailing-spaces': 1,
      // 要求对象字面量中的大括号内侧有一个空格。
      'object-curly-spacing': [1, 'always'],
      // 要求数组字面量中的方括号内侧有一个空格。
      'array-bracket-spacing': [1, 'always'],
      // 禁止多个空行，最多允许两行空行，文件末尾不允许空行。
      'no-multiple-empty-lines': [1, { max: 2, maxEOF: 0 }],
      // 要求导入语句按照字母顺序排序。
      'simple-import-sort/imports': 'error',
      // 要求导出语句按照字母顺序排序。
      'simple-import-sort/exports': 'error',
      // 要求逗号后面有空格，而逗号前面没有空格。
      "comma-spacing": ["error", { "before": false, "after": true }],
      // 要求对象字面量中键和冒号之间没有空格，而冒号后面有空格。
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
      // 要求二元操作符周围有空格。
      "space-infix-ops": "error",
      // 要求一元操作符与其操作数之间有空格，无论是单词类型的操作符还是非单词类型的操作符。
      "space-unary-ops": ["error", { "words": true, "nonwords": true }],
      // 要求代码块的开括号前有一个空格。
      "space-before-blocks": ["error", "always"],
      // 要求小括号内侧没有空格。
      "space-in-parens": ["error", "never"]
    }
  }
]