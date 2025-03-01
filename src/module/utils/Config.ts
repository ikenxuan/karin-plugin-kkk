import fs from 'node:fs'
import path from 'node:path'

import { basePath, copyConfigSync, filesByExt, logger, requireFileSync, watch } from 'node-karin'
import YAML from 'node-karin/yaml'

import { ConfigType } from '@/types'

import { Version } from '../../Version'

type ConfigDirType = 'config' | 'default_config'

class Cfg {
  /** 用户配置文件路径 */
  private dirCfgPath: string
  /** 默认配置文件路径 */
  private defCfgPath: string

  constructor () {
    this.dirCfgPath = `${basePath}/${Version.pluginName}/config`
    this.defCfgPath = `${Version.pluginPath}/config/default_config/`
  }

  /** 初始化配置 */
  initCfg () {
    copyConfigSync(this.defCfgPath, this.dirCfgPath)

    const files = filesByExt(this.dirCfgPath, '.yaml', 'name')
    for (const file of files) {
      const config = YAML.parseDocument(fs.readFileSync(`${this.dirCfgPath}/${file}`, 'utf8'))
      const defConfig = YAML.parseDocument(fs.readFileSync(`${this.defCfgPath}/${file}`, 'utf8'))
      const { differences, result } = this.mergeObjectsWithPriority(config, defConfig)
      if (differences) {
        fs.writeFileSync(`${this.dirCfgPath}/${file}`, result.toString({ lineWidth: -1 }))
      }
    }

    /**
     * @description 监听配置文件
     */
    setTimeout(() => {
      const list = filesByExt(this.dirCfgPath, '.yaml', 'abs')
      list.forEach((file) => watch(file, (old, now) => {
        // logger.info('旧数据:', old);
        // logger.info('新数据:', now);
      }))
    }, 2000)
    this.convertType()
    return this
  }

  /**
   * 获取默认配置和用户配置
   * @param name 配置文件名
   * @returns 返回合并后的配置
   */
  getDefOrConfig (name: keyof ConfigType) {
    const def = this.getYaml('default_config', name)
    const config = this.getYaml('config', name)
    return { ...def, ...config }
  }

  /** 获取所有配置文件 */
  All (): ConfigType {
    const allConfig: any = {}  // 初始化为 ConfigType 类型

    // 读取默认配置文件夹中的所有文件
    const files = fs.readdirSync(this.defCfgPath)
    files.forEach((file) => {
      const fileName = path.basename(file, '.yaml') as keyof ConfigType

      // 加载配置并合并
      allConfig[fileName] = this.getDefOrConfig(fileName) || {} as ConfigType[keyof ConfigType]
    })

    return allConfig as ConfigType
  }

  /**
   * 获取 YAML 文件内容
   * @param type 配置文件类型
   * @param name 配置文件名
   * @returns 返回 YAML 文件内容
   */
  private getYaml<T extends keyof ConfigType> (type: ConfigDirType, name: T): ConfigType[T] {
    const file =
      type === 'config'
        ? `${this.dirCfgPath}/${name}.yaml`
        : `${this.defCfgPath}/${name}.yaml`

    // 自动管理缓存 无需手动清除 如无缓存 则会自动导入并加载
    return requireFileSync(file, { force: true })
  }

  /** 由于上游类型定义错误，导致下游需要手动对已设置的内容进行类型转换。。。 */
  private convertType () {
    const pushList = this.getYaml('config', 'pushlist')
    pushList.bilibili.map((item) => {
      if (typeof item.host_mid === 'string') {
        item.host_mid = parseInt(item.host_mid)
      }
      return item
    })
    this.Modify('pushlist', 'bilibili', pushList.bilibili)
  }

  /**
   * 修改配置文件
   * @param name 文件名
   * @param key 键
   * @param value 值
   * @param type 配置文件类型，默认为用户配置文件 `config`
   */
  Modify (
    name: keyof ConfigType,
    key: string,
    value: any,
    type: ConfigDirType = 'config'
  ) {
    const path =
      type === 'config'
        ? `${this.dirCfgPath}/${name}.yaml`
        : `${this.defCfgPath}/${name}.yaml`

    // 读取 YAML 文件
    const yamlData = YAML.parseDocument(fs.readFileSync(path, 'utf8'))

    // 处理嵌套路径
    const keys = key.split('.')
    this.setNestedValue(yamlData.contents as YAML.YAMLMap, keys, value)

    fs.writeFileSync(path, yamlData.toString({ lineWidth: -1 }), 'utf8')
  }

  /**
   * 修改整个配置文件，保留注释
   * @param name 文件名
   * @param config 完整的配置对象
   * @param type 配置文件类型，默认为用户配置文件 `config`
   */
  ModifyPro<T extends keyof ConfigType> (
    name: T,
    config: ConfigType[T],
    type: ConfigDirType = 'config'
  ) {
    const filePath =
      type === 'config'
        ? `${this.dirCfgPath}/${name}.yaml`
        : `${this.defCfgPath}/${name}.yaml`

    try {
      // 1. 读取现有文件（包含注释）
      const existingContent = fs.readFileSync(filePath, 'utf8')
      const doc = YAML.parseDocument(existingContent)

      // 2. 将新配置转换为YAML节点（不解析注释）
      const newConfigNode = YAML.parseDocument(YAML.stringify(config)).contents

      // 3. 深度合并新配置到现有文档（保留注释结构）
      this.deepMergeYaml(doc.contents, newConfigNode)

      // 4. 写回文件
      fs.writeFileSync(filePath, doc.toString({ lineWidth: -1 }), 'utf8')
      return true
    } catch (error) {
      logger.error(`修改配置文件时发生错误：${error}`)
      return false
    }
  }

  /**
   * 深度合并YAML节点（保留目标注释）
   * @param target 目标节点（保留注释的原始节点）
   * @param source 源节点（提供新值的节点）
   */
  private deepMergeYaml (target: any, source: any) {
    if (YAML.isMap(target) && YAML.isMap(source)) {
      for (const pair of source.items) {
        const key = pair.key
        const sourceVal = pair.value
        const targetVal = target.get(key)

        if (targetVal === undefined) {
          target.set(key, sourceVal)
        } else if (YAML.isMap(targetVal) && YAML.isMap(sourceVal)) {
          this.deepMergeYaml(targetVal, sourceVal)
        } else if (YAML.isSeq(targetVal) && YAML.isSeq(sourceVal)) {
          // 替换序列内容并保持源序列格式
          targetVal.items = sourceVal.items
          // 同步序列的显示格式
          targetVal.flow = sourceVal.flow
        } else {
          target.set(key, sourceVal)
        }
      }
    }
  }

  /**
   * 在YAML映射中设置嵌套值
   *
   * 该函数用于在给定的YAML映射（map）中，根据指定的键路径（keys）设置值（value）
   * 如果键路径不存在，该函数会创建必要的嵌套映射结构并设置值
   *
   * @param map YAML映射，作为设置值的目标
   * @param keys 键路径，表示要设置的值的位置
   * @param value 要设置的值
   */
  setNestedValue (
    map: YAML.YAMLMap,
    keys: string[],
    value: any
  ) {
    // 当键路径长度为1时，直接在map中设置值
    if (keys.length === 1) {
      map.set(keys[0], value)
      return
    }

    // 获取当前层级的键
    const subKey = keys[0]
    // 尝试获取当前键对应的子映射
    let subMap: YAML.YAMLMap | undefined = map.get(subKey) as YAML.YAMLMap

    // 如果子映射不存在或不是YAML映射，则创建一个新的YAML映射
    if (!subMap || !YAML.isMap(subMap)) {
      subMap = new YAML.YAMLMap()
      // 在当前映射中设置新的子映射
      map.set(subKey, subMap)
    }

    // 递归调用自身，处理下一个键路径
    this.setNestedValue(subMap, keys.slice(1), value)
  }

  mergeObjectsWithPriority (
    userDoc: YAML.Document.Parsed,
    defaultDoc: YAML.Document.Parsed
  ): { result: YAML.Document.Parsed; differences: boolean } {
    let differences = false

    /** 合并 YAML 对象，确保注释保留 */
    const mergeYamlNodes = (target: any, source: any) => {
      if (YAML.isMap(target) && YAML.isMap(source)) {
        // 遍历 source 中的每一项，合并到 target 中
        for (const pair of source.items) {
          const key = pair.key
          const value = pair.value

          // 查找现有的键
          const existing = target.get(key)

          // 如果目标中没有该键，则添加新的键值对
          if (existing === undefined) {
            differences = true
            target.set(key, value)
          } else if (YAML.isMap(value) && YAML.isMap(existing)) {
            // 如果值是一个嵌套的 Map 类型，则递归合并
            mergeYamlNodes(existing, value)
          } else if (existing !== value) {
            // 如果值不同，进行覆盖
            differences = true
            target.set(key, value)
          }
        }
      }
    }

    // 执行合并操作
    mergeYamlNodes(defaultDoc.contents, userDoc.contents)

    return { differences, result: defaultDoc }
  }
}

type Config = ConfigType & Pick<Cfg, 'All' | 'Modify' | 'ModifyPro'>

export const Config: Config = new Proxy(new Cfg().initCfg(), {
  get (target, prop: string) {
    if (prop in target) return target[prop as keyof Cfg]
    return target.getDefOrConfig(prop as keyof ConfigType)
  }
}) as unknown as Config
