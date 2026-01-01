/**
 * 配置项元数据 Schema 定义
 * 用于统一管理配置项的 UI 展示信息，供 Karin Web 和移动 APP 共用
 */

// ==================== 条件表达式 AST ====================

/** 变量引用 - 引用配置中的某个字段值 */
export interface ConditionVar {
  type: 'var'
  /** 字段路径，如 "switch" 或 "push.switch" */
  field: string
}

/** 字面量值 */
export interface ConditionLiteral {
  type: 'literal'
  value: string | number | boolean | null
}

/** 比较操作符 */
export type CompareOperator = '===' | '!==' | '>' | '<' | '>=' | '<='

/** 比较表达式 */
export interface ConditionCompare {
  type: 'compare'
  operator: CompareOperator
  left: ConditionVar | ConditionLiteral
  right: ConditionVar | ConditionLiteral
}

/** 逻辑非 */
export interface ConditionNot {
  type: 'not'
  condition: ConditionExpression
}

/** 逻辑与 */
export interface ConditionAnd {
  type: 'and'
  conditions: ConditionExpression[]
}

/** 逻辑或 */
export interface ConditionOr {
  type: 'or'
  conditions: ConditionExpression[]
}

/** 数组包含检查 */
export interface ConditionIncludes {
  type: 'includes'
  /** 数组字段路径 */
  field: string
  /** 要检查的值 */
  value: string | number
}

/** 条件表达式联合类型 */
export type ConditionExpression =
  | ConditionVar
  | ConditionLiteral
  | ConditionCompare
  | ConditionNot
  | ConditionAnd
  | ConditionOr
  | ConditionIncludes

// ==================== 条件构建辅助函数 ====================

/** 创建变量引用 */
export const $var = (field: string): ConditionVar => ({ type: 'var', field })

/** 创建字面量 */
export const $literal = (value: string | number | boolean | null): ConditionLiteral => ({ type: 'literal', value })

/** 创建比较表达式 */
export const $compare = (
  left: ConditionVar | ConditionLiteral | string,
  operator: CompareOperator,
  right: ConditionVar | ConditionLiteral | string | number | boolean
): ConditionCompare => ({
  type: 'compare',
  operator,
  left: typeof left === 'string' ? $var(left) : left,
  right: typeof right === 'string' ? $var(right) : (typeof right === 'object' ? right : $literal(right))
})

/** 创建逻辑非 */
export const $not = (condition: ConditionExpression | string): ConditionNot => ({
  type: 'not',
  condition: typeof condition === 'string' ? $var(condition) : condition
})

/** 创建逻辑与 */
export const $and = (...conditions: (ConditionExpression | string)[]): ConditionAnd => ({
  type: 'and',
  conditions: conditions.map(c => typeof c === 'string' ? $var(c) : c)
})

/** 创建逻辑或 */
export const $or = (...conditions: (ConditionExpression | string)[]): ConditionOr => ({
  type: 'or',
  conditions: conditions.map(c => typeof c === 'string' ? $var(c) : c)
})

/** 创建数组包含检查 */
export const $includes = (field: string, value: string | number): ConditionIncludes => ({
  type: 'includes',
  field,
  value
})

/** 快捷方式：字段等于某值 */
export const $eq = (field: string, value: string | number | boolean): ConditionCompare =>
  $compare(field, '===', value)

/** 快捷方式：字段不等于某值 */
export const $ne = (field: string, value: string | number | boolean): ConditionCompare =>
  $compare(field, '!==', value)

// ==================== 配置项 Schema ====================

/** 基础配置项属性 */
interface BaseFieldSchema {
  /** 配置项标签 */
  label: string
  /** 配置项描述 */
  description?: string
  /** 禁用条件 - 使用 AST 表达式 */
  disabled?: ConditionExpression
  /** 是否必填 */
  required?: boolean
  /** 颜色主题 */
  color?: 'default' | 'warning'
}

/** 开关组件 */
export interface SwitchFieldSchema extends BaseFieldSchema {
  type: 'switch'
}

/** 验证规则 */
export interface ValidationRule {
  /** 正则表达式 */
  regex?: string | RegExp
  /** 最小长度 */
  minLength?: number
  /** 最大长度 */
  maxLength?: number
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 自定义错误消息 */
  error?: string
}

/** 文本输入组件 */
export interface InputFieldSchema extends BaseFieldSchema {
  type: 'input'
  inputType?: 'text' | 'number' | 'password'
  placeholder?: string
  rules?: ValidationRule[]
}

/** 单选组件 */
export interface RadioFieldSchema extends BaseFieldSchema {
  type: 'radio'
  orientation?: 'horizontal' | 'vertical'
  options: {
    label: string
    value: string | number
    description?: string
  }[]
}

/** 多选组件 */
export interface CheckboxFieldSchema extends BaseFieldSchema {
  type: 'checkbox'
  orientation?: 'horizontal' | 'vertical'
  options: {
    label: string
    value: string
    description?: string
  }[]
}

/** 分隔线组件 */
export interface DividerSchema {
  type: 'divider'
  title: string
}

/** 配置项 Schema 联合类型 */
export type FieldSchema = SwitchFieldSchema | InputFieldSchema | RadioFieldSchema | CheckboxFieldSchema

/** 配置区块 Schema */
export interface SectionSchema {
  /** 区块标识 */
  key: string
  /** 区块标题 */
  title: string
  /** 区块副标题 */
  subtitle?: string
  /** 区块内的配置项 */
  fields: ((FieldSchema & { key: string }) | DividerSchema)[]
}

/** 配置模块 Schema */
export interface ModuleSchema {
  /** 模块标识 */
  key: string
  /** 模块标签 */
  label: string
  /** 模块内的区块 */
  sections: SectionSchema[]
}

/** 完整配置 Schema */
export interface ConfigSchema {
  modules: ModuleSchema[]
}
