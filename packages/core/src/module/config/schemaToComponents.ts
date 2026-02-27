/**
 * Schema 到 Web Components 的转换器
 * 将 schema 定义转换为 node-karin 的 components 格式
 * 实现单一数据源，避免重复维护
 */
import { components } from 'node-karin'

import type { ConfigType } from '@/types'

import type { CheckboxFieldSchema, ConditionExpression, DividerSchema, FieldSchema, InputFieldSchema, RadioFieldSchema, SectionSchema, SwitchFieldSchema } from './schema'

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
      return condition.conditions.every(c => evaluateCondition(c, config, sectionKey))

    case 'or':
      return condition.conditions.some(c => evaluateCondition(c, config, sectionKey))

    case 'includes': {
      const arr = getValue(condition.field)
      return Array.isArray(arr) && arr.includes(condition.value)
    }

    default:
      return false
  }
}

/**
 * 将 schema 字段转换为 component
 */
function fieldToComponent(
  field: FieldSchema & { key: string },
  config: ConfigType,
  sectionKey: keyof ConfigType,
  componentId: string
): ReturnType<typeof components.switch.create> | ReturnType<typeof components.input.string> | ReturnType<typeof components.input.number> | ReturnType<typeof components.radio.group> | ReturnType<typeof components.checkbox.group> | null {
  const isDisabled = evaluateCondition(field.disabled, config, sectionKey)
  const baseProps = {
    label: field.label,
    description: field.description,
    isDisabled,
    color: field.color
  }

  const sectionConfig = config[sectionKey] as Record<string, unknown> | undefined

  switch (field.type) {
    case 'switch': {
      const switchField = field as SwitchFieldSchema & { key: string }
      return components.switch.create(componentId, {
        ...baseProps,
        defaultSelected: getNestedValue(sectionConfig, switchField.key) as boolean | undefined
      })
    }

    case 'input': {
      const inputField = field as InputFieldSchema & { key: string }
      const value = getNestedValue(sectionConfig, inputField.key)

      if (inputField.inputType === 'number') {
        return components.input.number(componentId, {
          ...baseProps,
          defaultValue: value?.toString() || '',
          placeholder: inputField.placeholder,
          rules: inputField.rules?.map(rule => ({
            min: rule.min,
            max: rule.max,
            error: rule.error
          }))
        })
      } else {
        return components.input.string(componentId, {
          ...baseProps,
          type: inputField.inputType || 'text',
          defaultValue: (value as string | undefined) || '',
          placeholder: inputField.placeholder,
          isRequired: field.required,
          rules: inputField.rules?.map(rule => ({
            regex: rule.regex,
            minLength: rule.minLength,
            maxLength: rule.maxLength,
            error: rule.error
          }))
        })
      }
    }

    case 'radio': {
      const radioField = field as RadioFieldSchema & { key: string }
      const value = getNestedValue(sectionConfig, radioField.key)

      return components.radio.group(componentId, {
        ...baseProps,
        orientation: radioField.orientation || 'vertical',
        defaultValue: typeof value === 'number' ? value.toString() : (value as string | undefined),
        radio: radioField.options.map((opt, idx) =>
          components.radio.create(`${componentId}:radio-${idx + 1}`, {
            label: opt.label,
            value: typeof opt.value === 'number' ? opt.value.toString() : opt.value,
            description: opt.description
          })
        )
      })
    }

    case 'checkbox': {
      const checkboxField = field as CheckboxFieldSchema & { key: string }
      const value = getNestedValue(sectionConfig, checkboxField.key)

      return components.checkbox.group(componentId, {
        ...baseProps,
        orientation: checkboxField.orientation || 'vertical',
        defaultValue: (value as string[] | undefined) || [],
        checkbox: checkboxField.options.map((opt, idx) =>
          components.checkbox.create(`${componentId}:checkbox:${idx + 1}`, {
            label: opt.label,
            value: opt.value,
            description: opt.description
          })
        )
      })
    }

    default:
      return null
  }
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
    if (field.type === 'divider') {
      const divider = field as DividerSchema
      children.push(
        components.divider.create(`divider-${schema.key}-${children.length}`, {
          description: divider.title,
          descPosition: 20
        })
      )
    } else {
      const fieldWithKey = field as FieldSchema & { key: string }
      // 将嵌套字段的点号替换为冒号，以符合前端组件的命名规范
      const componentId = fieldWithKey.key.replace(/\./g, ':')
      const component = fieldToComponent(fieldWithKey, config, schema.key as keyof ConfigType, componentId)
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
