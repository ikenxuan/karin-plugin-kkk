import { components, defineConfig, logger } from 'node-karin'
import _ from 'node-karin/lodash'

import { Root } from '@/module'
import { getConfigSchema } from '@/module/config'
import { sectionToAccordion } from '@/module/config/schemaToComponents'
import { Config } from '@/module/utils/Config'
import { type ConfigType } from '@/types'

/** 基础配置的类型 */
type BaseConfigType = {
  [key in keyof Omit<ConfigType, 'pushlist'>]: ConfigType[key]
}

/** 推送列表配置的类型，要单独处理 */
type PushConfigType = {
  'pushlist:douyin': ConfigType['pushlist']['douyin']
  'pushlist:bilibili': ConfigType['pushlist']['bilibili']
}

/** 前端传回来新配置的类型 */
type newConfigType = BaseConfigType & PushConfigType

export const webConfig = defineConfig({
  info: {
    id: 'karin-plugin-kkk',
    name: 'kkk插件',
    description: `Karin 的「抖音」「B站」视频解析/动态推送插件。v${Root.pluginVersion}`,
    icon: {
      name: 'radio_button_checked',
      color: '#F31260'
    },
    version: Root.pluginVersion,
    author: [
      {
        name: 'ikenxuan',
        home: 'https://github.com/ikenxuan',
        avatar: 'https://github.com/ikenxuan.png'
      },
      {
        name: 'sj817',
        home: 'https://github.com/sj817',
        avatar: 'https://github.com/sj817.png'
      }
    ]
  },
  components: async () => {
    const all = await Config.All()
    const configSchema = getConfigSchema()

    // 使用 schema 自动生成所有配置组件（除了推送列表）
    const schemaComponents = configSchema.modules
      .filter(module => module.key !== 'pushlist')
      .flatMap(module =>
        module.sections.map(section =>
          sectionToAccordion(section, all, module.label)
        )
      )

    return [
      ...schemaComponents,
      components.divider.create('divider-7', {
        description: '抖音推送列表相关',
        descPosition: 20
      }),
      components.accordionPro.create(
        'pushlist:douyin',
        all.pushlist.douyin.map((item) => {
          return {
            ...item,
            title: item.remark,
            subtitle: item.short_id
          }
        }),
        {
          label: '抖音推送列表',
          children: components.accordion.createItem('accordion-item-douyin', {
            className: 'ml-4 mr-4',
            children: [
              components.switch.create('switch', {
                label: '是否启用',
                description: '是否启用该订阅项',
                color: 'warning'
              }),
              components.input.string('short_id', {
                placeholder: '',
                label: '抖音号',
                description: '抖音号, 必填',
                errorMessage: '抖音号不能为空 Ciallo～(∠・ω< )⌒☆',
                color: 'warning'
              }),
              components.input.group('group_id', {
                label: '绑定推送群',
                maxRows: 2,
                data: [],
                template: components.input.string('accordion-item-douyin:push:douyin:group_id', {
                  placeholder: '必填，不能出现空值',
                  label: '群号:机器人账号',
                  color: 'warning',
                  rules: [
                    {
                      regex: /.+:.+/,
                      error: '请使用 `群号:机器人账号` 的格式'
                    }
                  ]
                })
              }),
              components.input.string('sec_uid', {
                color: 'default',
                placeholder: '可不填，会自动获取',
                label: 'UID',
                isRequired: false,
                description: '获取方法：PC浏览器打开某个博主主页，https://www.douyin.com/user/MS4wLj..... 其中的user/后的即为UID'
              }),
              components.input.string('remark', {
                color: 'default',
                placeholder: '可不填，会自动获取',
                label: '昵称',
                isRequired: false,
                description: '博主的抖音名称'
              }),
              components.divider.create('push:douyin:divider-pushTypes', {
                description: '推送类型配置',
                descPosition: 20
              }),
              components.checkbox.group('pushTypes', {
                label: '推送类型',
                description: '选择要推送的内容类型，可多选',
                orientation: 'horizontal',
                color: 'warning',
                checkbox: [
                  components.checkbox.create('pushTypes:checkbox:post', {
                    label: '作品列表',
                    description: '推送博主发布的作品',
                    value: 'post'
                  }),
                  components.checkbox.create('pushTypes:checkbox:favorite', {
                    label: '喜欢列表',
                    description: '推送博主喜欢的作品',
                    value: 'favorite'
                  }),
                  components.checkbox.create('pushTypes:checkbox:recommend', {
                    label: '推荐列表',
                    description: '推送博主的推荐作品',
                    value: 'recommend'
                  }),
                  components.checkbox.create('pushTypes:checkbox:live', {
                    label: '直播',
                    description: '推送博主开播通知',
                    value: 'live'
                  })
                ]
              }),
              components.divider.create('push:douyin:divider-1', {
                description: '过滤系统',
                descPosition: 20
              }),
              components.radio.group('filterMode', {
                label: '过滤模式',
                orientation: 'horizontal',
                color: 'warning',
                radio: [
                  components.radio.create('push:bilibili:filterMode.radio-1', {
                    label: '黑名单模式',
                    description: '命中以下内容时，不推送',
                    value: 'blacklist'
                  }),
                  components.radio.create('push:bilibili:filterMode.radio-2', {
                    label: '白名单模式',
                    description: '命中以下内容时，才推送',
                    value: 'whitelist'
                  })
                ]
              }),
              components.input.group('Keywords', {
                label: '关键词',
                maxRows: 2,
                itemsPerRow: 4,
                data: [],
                template: components.input.string('push:bilibili:filterKeywords', {
                  placeholder: '严禁提交空值',
                  label: '',
                  color: 'warning'
                })
              }),
              components.input.group('Tags', {
                label: '标签',
                maxRows: 2,
                itemsPerRow: 4,
                data: [],
                template: components.input.string('push:bilibili:filterTags', {
                  placeholder: '严禁提交空值',
                  label: '',
                  color: 'warning'
                })
              })
            ]
          })
        }
      ),
      components.divider.create('divider-8', {
        description: 'B站推送列表相关',
        descPosition: 20
      }),
      components.accordionPro.create(
        'pushlist:bilibili',
        all.pushlist.bilibili.map((item) => {
          return {
            ...item,
            title: item.remark,
            subtitle: item.host_mid
          }
        }),
        {
          label: 'B站推送列表',
          children: components.accordion.createItem('accordion-item-bilibili', {
            className: 'ml-4 mr-4',
            children: [
              components.switch.create('switch', {
                label: '是否启用',
                description: '是否启用该订阅项',
                color: 'warning'
              }),
              components.input.number('host_mid', {
                placeholder: '',
                label: 'UID',
                rules: undefined,
                description: 'B站用户的UID，必填',
                errorMessage: 'UID 不能为空 Ciallo～(∠・ω< )⌒☆',
                color: 'warning'
              }),
              components.input.group('group_id', {
                label: '绑定推送群',
                maxRows: 2,
                data: [],
                template: components.input.string('accordion-item-bilibili:push:bilibili:group_id', {
                  placeholder: '必填，不能出现空值',
                  label: '',
                  color: 'warning',
                  rules: [
                    {
                      regex: /.+:.+/,
                      error: '请使用 `群号:机器人账号` 的格式'
                    }
                  ]
                })
              }),
              components.input.string('remark', {
                color: 'default',
                placeholder: '可不填，会自动获取',
                label: '昵称',
                isRequired: false,
                description: 'UP主的昵称'
              }),
              components.radio.group('filterMode', {
                label: '过滤模式',
                orientation: 'horizontal',
                color: 'warning',
                radio: [
                  components.radio.create('push:bilibili:filterMode.radio-1', {
                    label: '黑名单模式',
                    description: '命中以下内容时，不推送',
                    value: 'blacklist'
                  }),
                  components.radio.create('push:bilibili:filterMode.radio-2', {
                    label: '白名单模式',
                    description: '命中以下内容时，才推送',
                    value: 'whitelist'
                  })
                ]
              }),
              components.input.group('Keywords', {
                label: '关键词',
                maxRows: 2,
                itemsPerRow: 4,
                data: [],
                description: '关键词，多个则使用逗号隔开',
                template: components.input.string('push:bilibili:filterKeywords', {
                  placeholder: '严禁提交空值',
                  label: '',
                  color: 'warning'
                })
              }),
              components.input.group('Tags', {
                label: '标签',
                maxRows: 2,
                itemsPerRow: 4,
                data: [],
                template: components.input.string('push:bilibili:filterTags', {
                  placeholder: '严禁提交空值',
                  label: '',
                  color: 'warning'
                })
              })
            ]
          })
        }
      )
    ]
  },

  /** 前端点击保存之后调用的方法 */
  save: async (config: newConfigType) => {
    const formatCfg = processFrontendData(config)
    const oldAllCfg = await Config.All()
    const mergeCfg = _.mergeWith({}, oldAllCfg, formatCfg, customizer)

    // 使用通用的扁平化字段清理方法
    cleanFlattenedFields(mergeCfg)

    let success = false
    let isChange = false
    let needReloadAmagi = false

    for (const key of Object.keys(mergeCfg) as Array<keyof ConfigType>) {
      const configValue = mergeCfg[key]

      // 检查配置是否有效且不为空
      if (configValue &&
        typeof configValue === 'object' &&
        Object.keys(configValue).length > 0) {
        isChange = deepEqual(configValue, oldAllCfg[key])
        if (isChange) {
          const modifySuccess = await Config.ModifyPro(key, configValue)
          if (modifySuccess) {
            success = true
            // 检查是否需要重载 Amagi Client
            if (key === 'cookies' || key === 'request') {
              needReloadAmagi = true
            }
          }
        }
      }
    }

    await Config.syncConfigToDatabase()

    // 如果 cookies 或 request 配置有变化，重载 Amagi Client
    if (needReloadAmagi) {
      try {
        const { reloadAmagiConfig } = await import('@/module/utils/amagiClient')
        reloadAmagiConfig()
      } catch (error) {
        logger.error(`[WebConfig] 重载 Amagi Client 失败: ${error}`)
      }
    }

    return {
      mergeCfg,
      formatCfg,
      success,
      message: success ? '保存成功 Ciallo～(∠・ω< )⌒☆' : '配置无变化 Ciallo～(∠・ω< )⌒☆'
    }
  }
})

export default webConfig

/**
 * 遇到数组时用新数组覆盖原始数组（而不是合并）
 * @param value 原始内容
 * @param srcValue 新内容
 * @returns
 */
const customizer = (value: any, srcValue: any) => {
  if (Array.isArray(srcValue)) {
    return srcValue // 直接返回新数组（覆盖旧数组）
  }
}

/**
 * 归递判断配置是否修改
 * @param a 前端传回来的配置
 * @param b 用户原本的配置
 * @returns 配置对象是否被修改
 */
const deepEqual = (a: any, b: any): boolean => {
  // 如果两个值严格相等，说明没有修改
  if (a === b) {
    return false
  }

  // 如果 a 和 b 都是字符串，比较是否相等
  if (typeof a === 'string' && typeof b === 'string') {
    if (a !== b) return true
  }

  // 如果 a 和 b 都是数字，比较是否相等
  if (typeof a === 'number' && typeof b === 'number') {
    if (a !== b) return true
  }

  // 如果 a 和 b 都是布尔值，比较是否相等
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    if (a !== b) return true
  }

  // 如果其中一个为 null 或者不是对象/数组，说明有修改
  if (a === null || b === null || typeof a !== typeof b) {
    return true
  }

  // 如果 a 和 b 都是数组
  if (Array.isArray(a) && Array.isArray(b)) {
    // 如果数组长度不同，说明有修改
    if (a.length !== b.length) {
      return true
    }

    // 递归比较数组中的每个元素
    for (let i = 0; i < a.length; i++) {
      if (deepEqual(a[i], b[i])) {
        return true // 如果某个元素有修改，返回 true
      }
    }
  }

  let isChange = false
  // 如果 a 和 b 都是对象
  if (typeof a === 'object' && typeof b === 'object') {
    if (isChange) return true
    // 获取两个对象的键
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    // 如果键的数量不同，说明对象结构有修改
    if (keysA.length !== keysB.length) {
      return true
    }

    // 遍历对象 a 的键
    for (const key of keysA) {
      // 如果 b 中没有该键，或者递归比较 a[key] 和 b[key] 有修改
      if (!keysB.includes(key)) {
        isChange = true
        return true // 如果 b 中没有该键，返回 true
      }

      // 如果 a[key] 和 b[key] 不相等，返回 true
      if (deepEqual(a[key], b[key])) {
        isChange = true
        return true
      }
    }
  }

  // 如果所有检查都没有发现修改，返回 false
  return false
}

/**
 * str 转 num
 * @param value 字符串
 * @returns
 */
const convertToNumber = (value: string): any => {
  // 检查字符串是否为有效的数字
  if (/^\d+$/.test(value)) {
    const num = parseInt(value, 10)
    return num
  } else return value
}
/**
 * 获取数组中的第一个对象，如果数组为空则返回空对象
 * @param arr 数组
 * @returns 数组中的第一个对象或空对象
 */
const getFirstObject = <T> (arr: T[]): T => {
  return arr.length > 0 ? arr[0] : {} as T
}

/**
 * 设置嵌套属性值
 * @param obj 目标对象
 * @param keys 键路径数组
 * @param value 要设置的值
 */
const setNestedProperty = (obj: any, keys: string[], value: any) => {
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }

  const lastKey = keys[keys.length - 1]
  current[lastKey] = value
}

/**
 * 处理前端返回的数据，将其转换为 ConfigType 格式
 * @param data 前端返回的数据
 * @returns 处理后符合 ConfigType 格式的数据
 */
const processFrontendData = (data: newConfigType): ConfigType => {
  const result: Partial<Record<keyof ConfigType, any>> = {}

  const configKeys = Object.keys(data).filter((key): key is keyof BaseConfigType => {
    return !key.includes('pushlist') && key in data
  })

  for (const key of configKeys) {
    const value = data[key]
    const firstObj = Array.isArray(value) ? getFirstObject(value) : {}

    // 检查是否有有效数据
    const objKeys = Object.keys(firstObj)
    if (objKeys.length === 0) {
      continue // 跳过空对象
    }

    // 初始化配置对象
    const configObj: Record<string, any> = {}
    let hasValidData = false

    // 先处理所有嵌套字段
    const nestedProps = objKeys.filter(prop => prop.includes(':'))
    const flatProps = objKeys.filter(prop => !prop.includes(':'))

    // 处理嵌套字段
    for (const prop of nestedProps) {
      let propValue = firstObj[prop]
      if (typeof propValue === 'string') {
        propValue = convertToNumber(propValue)
      }

      if (propValue !== undefined && propValue !== null) {
        const keys = prop.split(':')
        setNestedProperty(configObj, keys, propValue)
        hasValidData = true
      }
    }

    // 处理扁平字段
    for (const prop of flatProps) {
      let propValue = firstObj[prop]
      if (typeof propValue === 'string') {
        propValue = convertToNumber(propValue)
      }

      if (propValue !== undefined && propValue !== null) {
        configObj[prop] = propValue
        hasValidData = true
      }
    }

    // 只有当有有效数据时才添加到结果中
    if (hasValidData && Object.keys(configObj).length > 0) {
      result[key] = configObj
    }
  }

  // 处理pushlist
  result.pushlist = {
    douyin: data['pushlist:douyin'] || [],
    bilibili: (data['pushlist:bilibili'] || []).map(item => {
      return {
        ...item,
        host_mid: Number(item.host_mid)
      }
    })
  }

  return result as ConfigType
}

/**
 * 通用的扁平化字段清理函数
 * 自动检测并清理与嵌套结构冲突的扁平化字段
 * @param obj 要清理的对象
 */
const cleanFlattenedFields = (obj: any): void => {
  if (!obj || typeof obj !== 'object') return

  for (const [, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // 递归处理嵌套对象
      cleanFlattenedFields(value)

      // 类型断言确保value是一个对象
      const valueObj = value as Record<string, any>

      // 收集所有扁平化字段（包含点号的字段）
      const flattenedKeys = Object.keys(valueObj).filter(k => k.includes('.'))

      for (const flatKey of flattenedKeys) {
        const parts = flatKey.split('.')

        // 检查是否存在对应的嵌套结构
        if (hasNestedStructure(valueObj, parts)) {
          // 删除扁平化字段
          delete valueObj[flatKey]
        }
      }
    }
  }
}

/**
 * 检查对象中是否存在指定路径的嵌套结构
 * @param obj 要检查的对象
 * @param path 路径数组
 * @returns 是否存在嵌套结构
 */
const hasNestedStructure = (obj: Record<string, any>, path: string[]): boolean => {
  let current = obj

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]
    if (!current[key] || typeof current[key] !== 'object') {
      return false
    }
    current = current[key]
  }

  // 检查最后一个键是否存在
  const lastKey = path[path.length - 1]
  return lastKey in current
}
