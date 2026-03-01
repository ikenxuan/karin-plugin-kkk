/**
 * Schema 到 Web Components 的转换器
 * 将 schema 定义转换为 node-karin 的 components 格式
 * 实现单一数据源，避免重复维护
 */
import { components } from 'node-karin'

import type { ConfigType } from '@/types'

import type {
  CheckboxGroupField,
  ConditionExpression,
  DividerField,
  FieldConfig,
  InputField,
  RadioGroupField,
  SectionSchema,
  SwitchField
} from './schema'

/**
 * 获取嵌套字段的值
 */
function getNestedValue(obj: Record<string, unknown> | undefined, path: string): unknown {
  if (!obj) return undefined
  const keys = path.split('.')
  let value: unknown = obj
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key]
    } else {
      return undefined
    }
  }
  return value
}

/**
 * 将条件表达式转换为实际的布尔值
 * @param condition 条件表达式
 * @param config 配置对象
 * @param sectionKey 当前区块的 key（用于获取配置值）
 */
function evaluateCondition(
  condition: ConditionExpression | undefined,
  config: ConfigType,
  sectionKey: keyof ConfigType
): boolean {
  if (!condition) return false

  const sectionConfig = config[sectionKey] as Record<string, unknown> | undefined

  const getValue = (field: string): unknown => {
    return getNestedValue(sectionConfig, field)
  }

  switch (condition.type) {
    case 'var':
      return !!getValue(condition.field)

    case 'literal':
      return !!condition.value

    case 'compare': {
      const left = condition.left.type === 'var' ? getValue(condition.left.field) : condition.left.value
      const right = condition.right.type === 'var' ? getValue(condition.right.field) : condition.right.value

      switch (condition.operator) {
        case '===': return left === right
        case '!==': return left !== right
        case '>': return (left as number) > (right as number)
        case '<': return (left as number) < (right as number)
        case '>=': return (left as number) >= (right as number)
        case '<=': return (left as number) <= (right as number)
        default: return false
      }
    }

    case 'not':
      return !evaluateCondition(condition.condition, config, sectionKey)

    case 'and':
      return condition.conditions.every((c: ConditionExpression) => evaluateCondition(c, config, sectionKey))

    case 'or':
      return condition.conditions.some((c: ConditionExpression) => evaluateCondition(c, config, sectionKey))

    case 'includes': {
      const arr = getValue(condition.field)
      return Array.isArray(arr) && arr.includes(condition.value)
    }

    default:
      return false
  }
}

/**
 * 类型守卫：判断是否为分隔线
 */
function isDivider(field: FieldConfig): field is DividerField {
  return !('key' in field)
}

/**
 * 类型守卫：判断是否为开关
 */
function isSwitch(field: FieldConfig): field is SwitchField {
  return 'key' in field && !('type' in field) && !('radio' in field) && !('checkbox' in field)
}

/**
 * 类型守卫：判断是否为输入框
 */
function isInput(field: FieldConfig): field is InputField {
  return 'key' in field && 'type' in field
}

/**
 * 类型守卫：判断是否为单选框组
 */
function isRadioGroup(field: FieldConfig): field is RadioGroupField {
  return 'key' in field && 'radio' in field
}

/**
 * 类型守卫：判断是否为多选框组
 */
function isCheckboxGroup(field: FieldConfig): field is CheckboxGroupField {
  return 'key' in field && 'checkbox' in field
}

/**
 * 将 schema 字段转换为 component
 */
function fieldToComponent(
  field: FieldConfig,
  config: ConfigType,
  sectionKey: keyof ConfigType,
  componentId: string
): ReturnType<typeof components.switch.create> | ReturnType<typeof components.input.string> | ReturnType<typeof components.input.number> | ReturnType<typeof components.radio.group> | ReturnType<typeof components.checkbox.group> | null {
  // 处理分隔线
  if (isDivider(field)) {
    return null // 分隔线在外部单独处理
  }

  const isDisabled = evaluateCondition('disabled' in field ? field.disabled : undefined, config, sectionKey)
  const sectionConfig = config[sectionKey] as Record<string, unknown> | undefined

  // 处理开关
  if (isSwitch(field)) {
    const { key, disabled, ...rest } = field
    return components.switch.create(componentId, {
      ...rest,
      isDisabled,
      defaultSelected: getNestedValue(sectionConfig, key) as boolean | undefined
    })
  }

  // 处理输入框
  if (isInput(field)) {
    const { key, disabled, type, ...rest } = field
    const value = getNestedValue(sectionConfig, key)

    if (type === 'number') {
      return components.input.number(componentId, {
        ...rest,
        isDisabled,
        defaultValue: value?.toString() || ''
      })
    } else {
      return components.input.string(componentId, {
        ...rest,
        type,
        isDisabled,
        defaultValue: (value as string | undefined) || ''
      })
    }
  }

  // 处理单选框组
  if (isRadioGroup(field)) {
    const { key, disabled, radio, ...rest } = field
    const value = getNestedValue(sectionConfig, key)

    return components.radio.group(componentId, {
      ...rest,
      isDisabled,
      defaultValue: typeof value === 'number' ? value.toString() : (value as string | undefined),
      radio: radio.map((opt) => {
        const { key: optKey, ...optRest } = opt
        return components.radio.create(optKey, optRest)
      })
    })
  }

  // 处理多选框组
  if (isCheckboxGroup(field)) {
    const { key, disabled, checkbox, ...rest } = field
    const value = getNestedValue(sectionConfig, key)

    return components.checkbox.group(componentId, {
      ...rest,
      isDisabled,
      defaultValue: (value as string[] | undefined) || [],
      checkbox: checkbox.map((opt) => {
        const { key: optKey, ...optRest } = opt
        return components.checkbox.create(optKey, optRest)
      })
    })
  }

  return null
}

/**
 * 将 section schema 转换为 accordion item
 */
export function sectionToAccordionItem(
  schema: SectionSchema,
  config: ConfigType,
  accordionId: string = `cfg:${schema.key}`
): ReturnType<typeof components.accordion.createItem> {
  const children: Array<ReturnType<typeof components.divider.create> | NonNullable<ReturnType<typeof fieldToComponent>>> = []

  for (const field of schema.fields) {
    if (isDivider(field)) {
      children.push(
        components.divider.create(`divider-${schema.key}-${children.length}`, field)
      )
    } else if ('key' in field) {
      // 将嵌套字段的点号替换为冒号，以符合前端组件的命名规范
      const componentId = field.key.replace(/\./g, ':')
      const component = fieldToComponent(field, config, schema.key as keyof ConfigType, componentId)
      if (component) {
        children.push(component)
      }
    }
  }

  return components.accordion.createItem(accordionId, {
    title: schema.title,
    className: 'ml-4 mr-4',
    subtitle: schema.subtitle,
    children
  })
}

/**
 * 将 section schema 转换为完整的 accordion
 */
export function sectionToAccordion(
  schema: SectionSchema,
  config: ConfigType,
  label?: string
): ReturnType<typeof components.accordion.create> {
  return components.accordion.create(schema.key, {
    label: label || schema.title,
    children: [sectionToAccordionItem(schema, config)]
  })
}
