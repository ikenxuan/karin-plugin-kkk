/**
 * 配置项元数据 Schema 定义
 * 基于 Karin 组件返回类型，但作为纯数据定义
 * 可同时服务于 Karin Web 和 Next-Web APP
 */
import { components } from 'node-karin'

/**
 * 条件表达式 - 用于动态控制字段的 disabled 状态
 */

/** 变量引用 - 引用配置中的某个字段值 */
export interface VarExpression {
  type: 'var'
  field: string
}

/** 字面量 - 直接使用布尔值 */
export interface LiteralExpression {
  type: 'literal'
  value: boolean
}

/** 比较运算 */
export interface CompareExpression {
  type: 'compare'
  left: VarExpression | LiteralExpression
  operator: '===' | '!==' | '>' | '<' | '>=' | '<='
  right: VarExpression | LiteralExpression
}

/** 逻辑非 */
export interface NotExpression {
  type: 'not'
  condition: ConditionExpression
}

/** 逻辑与 */
export interface AndExpression {
  type: 'and'
  conditions: ConditionExpression[]
}

/** 逻辑或 */
export interface OrExpression {
  type: 'or'
  conditions: ConditionExpression[]
}

/** 数组包含 */
export interface IncludesExpression {
  type: 'includes'
  field: string
  value: string
}

export type ConditionExpression =
  | VarExpression
  | LiteralExpression
  | CompareExpression
  | NotExpression
  | AndExpression
  | OrExpression
  | IncludesExpression

/**
 * 条件表达式构造器
 */
export const $var = (field: string): VarExpression => ({ type: 'var', field })
export const $literal = (value: boolean): LiteralExpression => ({ type: 'literal', value })
export const $not = (condition: ConditionExpression | string): NotExpression => ({
  type: 'not',
  condition: typeof condition === 'string' ? $var(condition) : condition
})
export const $and = (...conditions: ConditionExpression[]): AndExpression => ({ type: 'and', conditions })
export const $or = (...conditions: ConditionExpression[]): OrExpression => ({ type: 'or', conditions })
export const $eq = (left: string | boolean, right: string | boolean): CompareExpression => ({
  type: 'compare',
  left: typeof left === 'string' ? $var(left) : $literal(left),
  operator: '===',
  right: typeof right === 'string' ? $var(right) : $literal(right)
})
export const $ne = (left: string | boolean, right: string | boolean): CompareExpression => ({
  type: 'compare',
  left: typeof left === 'string' ? $var(left) : $literal(left),
  operator: '!==',
  right: typeof right === 'string' ? $var(right) : $literal(right)
})
export const $gt = (left: string | number, right: string | number): CompareExpression => ({
  type: 'compare',
  left: typeof left === 'string' ? $var(left) : $literal(left as unknown as boolean),
  operator: '>',
  right: typeof right === 'string' ? $var(right) : $literal(right as unknown as boolean)
})
export const $lt = (left: string | number, right: string | number): CompareExpression => ({
  type: 'compare',
  left: typeof left === 'string' ? $var(left) : $literal(left as unknown as boolean),
  operator: '<',
  right: typeof right === 'string' ? $var(right) : $literal(right as unknown as boolean)
})
export const $gte = (left: string | number, right: string | number): CompareExpression => ({
  type: 'compare',
  left: typeof left === 'string' ? $var(left) : $literal(left as unknown as boolean),
  operator: '>=',
  right: typeof right === 'string' ? $var(right) : $literal(right as unknown as boolean)
})
export const $lte = (left: string | number, right: string | number): CompareExpression => ({
  type: 'compare',
  left: typeof left === 'string' ? $var(left) : $literal(left as unknown as boolean),
  operator: '<=',
  right: typeof right === 'string' ? $var(right) : $literal(right as unknown as boolean)
})
export const $includes = (field: string, value: string): IncludesExpression => ({ type: 'includes', field, value })

/**
 * 字段 Schema 定义
 * 基于 Karin 组件返回类型，但移除运行时字段（key, componentType）
 * 添加自定义字段（key, disabled）
 */

/** 分隔线字段 */
export type DividerField = Omit<ReturnType<typeof components.divider.create>, 'key' | 'componentType'>

/** 开关字段 */
export type SwitchField = Omit<ReturnType<typeof components.switch.create>, 'key' | 'componentType'> & {
  key: string
  disabled?: ConditionExpression
}

/** 输入框字段 */
export type InputField = Omit<ReturnType<typeof components.input.string>, 'key' | 'componentType'> & {
  key: string
  disabled?: ConditionExpression
}

/** 单选框字段 */
export type RadioGroupField = Omit<ReturnType<typeof components.radio.group>, 'key' | 'componentType' | 'radio'> & {
  key: string
  disabled?: ConditionExpression
  radio: Array<Omit<ReturnType<typeof components.radio.create>, 'key' | 'componentType'> & { key: string }>
}

/** 多选框字段 */
export type CheckboxGroupField = Omit<ReturnType<typeof components.checkbox.group>, 'key' | 'componentType' | 'checkbox'> & {
  key: string
  disabled?: ConditionExpression
  checkbox: Array<Omit<ReturnType<typeof components.checkbox.create>, 'key' | 'componentType' | 'className'> & { key: string }>
}

/** 所有字段类型的联合 */
export type FieldConfig = SwitchField | InputField | RadioGroupField | CheckboxGroupField | DividerField

/**
 * 配置区块 Schema
 */
export interface SectionSchema {
  /** 区块标识 */
  key: string
  /** 区块标题 */
  title: string
  /** 区块副标题 */
  subtitle?: string
  /** 区块内的配置项 */
  fields: FieldConfig[]
}

/**
 * 配置模块 Schema
 */
export interface ModuleSchema {
  /** 模块标识 */
  key: string
  /** 模块标签 */
  label: string
  /** 模块内的区块 */
  sections: SectionSchema[]
}

/**
 * 完整配置 Schema
 */
export interface ConfigSchema {
  modules: ModuleSchema[]
}
