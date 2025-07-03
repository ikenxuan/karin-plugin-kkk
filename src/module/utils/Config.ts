import fs from 'node:fs'
import path from 'node:path'

import { copyConfigSync, filesByExt, logger, requireFileSync, watch } from 'node-karin'
import { karinPathBase } from 'node-karin/root'
import YAML from 'node-karin/yaml'

import type { ConfigType } from '@/types'
import type { bilibiliPushItem, douyinPushItem, pushlistConfig } from '@/types/config/pushlist'

import { Root } from '../../root'
import { getBilibiliDB, getDouyinDB } from '../db'

type ConfigDirType = 'config' | 'default_config'

class Cfg {
  /** 用户配置文件路径 */
  private dirCfgPath: string
  /** 默认配置文件路径 */
  private defCfgPath: string

  constructor () {
    this.dirCfgPath = `${karinPathBase}/${Root.pluginName}/config`
    this.defCfgPath = `${Root.pluginPath}/config/default_config/`
  }

  /** 初始化配置 */
  initCfg () {
    copyConfigSync(this.defCfgPath, this.dirCfgPath)

    const files = filesByExt(this.dirCfgPath, '.yaml', 'name')
    for (const file of files) {
      const config = YAML.parseDocument(fs.readFileSync(`${this.dirCfgPath}/${file}`, 'utf8'))
      const defConfig = YAML.parseDocument(fs.readFileSync(`${this.defCfgPath}/${file}`, 'utf8'))
      const { differences, result } = this.mergeObjectsWithPriority(config, defConfig)

      // 对pushlist配置文件进行特殊处理，添加switch字段兼容
      let needsUpdate = differences
      if (file === 'pushlist.yaml') {
        const updated = this.addSwitchFieldToPushlist(result)
        if (updated) {
          needsUpdate = true
        }
      }

      if (needsUpdate) {
        fs.writeFileSync(`${this.dirCfgPath}/${file}`, result.toString({ lineWidth: -1 }))
      }
    }

    /**
     * @description 监听配置文件
     */
    setTimeout(() => {
      const list = filesByExt(this.dirCfgPath, '.yaml', 'abs')
      list.forEach((file) => watch(file, (_old, _now) => {
        // logger.info('旧数据:', old);
        // logger.info('新数据:', now);
      }))
    }, 2000)

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
  async All (): Promise<ConfigType> {
    const douyinDB = await getDouyinDB()
    const bilibiliDB = await getBilibiliDB()

    const allConfig: any = {}  // 初始化为 ConfigType 类型

    // 读取默认配置文件夹中的所有文件
    const files = fs.readdirSync(this.defCfgPath)
    for (const file of files) {
      const fileName = path.basename(file, '.yaml') as keyof ConfigType

      // 加载配置并合并
      allConfig[fileName] = this.getDefOrConfig(fileName) || {} as ConfigType[keyof ConfigType]
    }

    // 从数据库获取过滤配置并合并到推送列表中
    if (allConfig.pushlist) {
      try {
        // 处理抖音推送项
        if (allConfig.pushlist.douyin) {
          for (const item of allConfig.pushlist.douyin) {
            // 从数据库获取该用户的过滤配置
            const filterWords = await douyinDB.getFilterWords(item.sec_uid)
            const filterTags = await douyinDB.getFilterTags(item.sec_uid)
            const userInfo = await douyinDB.getDouyinUser(item.sec_uid)

            // 将数据库中的过滤配置合并到推送项中
            if (userInfo) {
              item.filterMode = userInfo.filterMode as 'blacklist' | 'whitelist' || 'blacklist'
            }

            // 将过滤词和标签添加到推送项中
            item.Keywords = filterWords
            item.Tags = filterTags
          }
        }

        // 处理B站推送项
        if (allConfig.pushlist.bilibili) {
          for (const item of allConfig.pushlist.bilibili) {
            // 从数据库获取该用户的过滤配置
            const filterWords = await bilibiliDB.getFilterWords(item.host_mid)
            const filterTags = await bilibiliDB.getFilterTags(item.host_mid)
            const userInfo = await bilibiliDB.getOrCreateBilibiliUser(item.host_mid)

            // 将数据库中的过滤配置合并到推送项中
            if (userInfo) {
              item.filterMode = userInfo.filterMode as 'blacklist' | 'whitelist' || 'blacklist'
            }

            // 将过滤词和标签添加到推送项中
            item.Keywords = filterWords
            item.Tags = filterTags
          }
        }
      } catch (error) {
        logger.error(`从数据库获取过滤配置时出错: ${error}`)
      }
    }

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
  async ModifyPro<T extends keyof ConfigType> (
    name: T,
    config: ConfigType[T],
    type: ConfigDirType = 'config'
  ) {
    const douyinDB = await getDouyinDB()
    const bilibiliDB = await getBilibiliDB()

    const filePath =
      type === 'config'
        ? `${this.dirCfgPath}/${name}.yaml`
        : `${this.defCfgPath}/${name}.yaml`

    try {
      // 1. 读取现有文件（包含注释）
      const existingContent = fs.readFileSync(filePath, 'utf8')
      const doc = YAML.parseDocument(existingContent)

      // 2. 将新配置转换为YAML节点（不解析注释）
      let filterCfg = config
      if (name === 'pushlist' && ('douyin' in config || 'bilibili' in config)) {
        const cleanedConfig = { ...config } as pushlistConfig

        // 处理抖音配置
        if ('douyin' in cleanedConfig) {
          cleanedConfig.douyin = cleanedConfig.douyin.map(item => {
            const { Keywords, Tags, filterMode, ...rest } = item
            return rest as Omit<douyinPushItem, 'Keywords' | 'Tags' | 'filterMode'>
          })
        }

        // 处理B站配置
        if ('bilibili' in cleanedConfig) {
          cleanedConfig.bilibili = cleanedConfig.bilibili.map(item => {
            const { Keywords, Tags, filterMode, ...rest } = item
            return rest as Omit<bilibiliPushItem, 'Keywords' | 'Tags' | 'filterMode'>
          })
        }

        filterCfg = cleanedConfig as ConfigType[T]
      }

      const newConfigNode = YAML.parseDocument(YAML.stringify(filterCfg)).contents

      // 3. 深度合并新配置到现有文档（保留注释结构）
      this.deepMergeYaml(doc.contents, newConfigNode)

      // 4. 写回文件
      fs.writeFileSync(filePath, doc.toString({ lineWidth: -1 }), 'utf8')

      // 同步抖音配置
      if ('douyin' in config) {
        await this.syncFilterConfigToDb(config.douyin as douyinPushItem[], douyinDB, 'sec_uid')
        logger.debug('已同步抖音过滤配置到数据库')
      }

      // 同步B站配置
      if ('bilibili' in config) {
        await this.syncFilterConfigToDb(config.bilibili as bilibiliPushItem[], bilibiliDB, 'host_mid')
        logger.debug('已同步B站过滤配置到数据库')
      }

      return true
    } catch (error) {
      logger.error(`修改配置文件时发生错误：${error}`)
      return false
    }
  }

  /**
   * 同步过滤配置到数据库
   * @param items 推送项列表
   * @param db 数据库实例
   * @param idField ID字段名称
   */
  private async syncFilterConfigToDb (items: any[], db: any, idField: string) {
    for (const item of items) {
      const id = item[idField]
      if (!id) continue

      // 更新过滤模式
      if (item.filterMode) {
        await db.updateFilterMode(id, item.filterMode)
      }

      // 更新过滤词
      if (item.Keywords && Array.isArray(item.Keywords)) {
        const existingWords = await db.getFilterWords(id)

        // 删除不再需要的过滤词
        for (const word of existingWords) {
          if (!item.Keywords.includes(word)) {
            await db.removeFilterWord(id, word)
          }
        }

        // 添加新的过滤词
        for (const word of item.Keywords) {
          if (!existingWords.includes(word)) {
            await db.addFilterWord(id, word)
          }
        }
      }

      // 更新过滤标签
      if (item.Tags && Array.isArray(item.Tags)) {
        const existingTags = await db.getFilterTags(id)

        // 删除不再需要的过滤标签
        for (const tag of existingTags) {
          if (!item.Tags.includes(tag)) {
            await db.removeFilterTag(id, tag)
          }
        }

        // 添加新的过滤标签
        for (const tag of item.Tags) {
          if (!existingTags.includes(tag)) {
            await db.addFilterTag(id, tag)
          }
        }
      }
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

  /**
   * 为推送列表配置添加switch字段兼容
   * @param doc YAML文档
   * @returns 是否有更新
   */
  private addSwitchFieldToPushlist (doc: YAML.Document.Parsed): boolean {
    let hasUpdates = false
    const contents = doc.contents as YAML.YAMLMap

    // 处理抖音推送列表
    const douyinList = contents.get('douyin')
    if (YAML.isSeq(douyinList)) {
      for (const item of douyinList.items) {
        if (YAML.isMap(item)) {
          const switchField = item.get('switch')
          if (switchField === undefined) {
            item.set('switch', true)
            hasUpdates = true
          }
        }
      }
    }

    // 处理B站推送列表
    const bilibiliList = contents.get('bilibili')
    if (YAML.isSeq(bilibiliList)) {
      for (const item of bilibiliList.items) {
        if (YAML.isMap(item)) {
          const switchField = item.get('switch')
          if (switchField === undefined) {
            item.set('switch', true)
            hasUpdates = true
          }
        }
      }
    }

    return hasUpdates
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

  /**
   * 同步配置到数据库
   * 这个方法应该在所有模块都初始化完成后调用
   */
  async syncConfigToDatabase () {
    try {
      const pushCfg = this.getYaml('config', 'pushlist')
      const douyinDB = await getDouyinDB()
      const bilibiliDB = await getBilibiliDB()

      // 同步配置到数据库
      if (pushCfg.bilibili) {
        await bilibiliDB.syncConfigSubscriptions(pushCfg.bilibili)
      }

      if (pushCfg.douyin) {
        await douyinDB.syncConfigSubscriptions(pushCfg.douyin)
      }

      logger.debug('[BilibiliDB] + [DouyinDB] 配置已同步到数据库')
    } catch (error) {
      logger.error('同步配置到数据库失败:', error)
    }
  }
}

type Config$ = ConfigType & Pick<Cfg, 'All' | 'Modify' | 'ModifyPro' | 'syncConfigToDatabase'>

export const Config: Config$ = new Proxy(new Cfg().initCfg(), {
  get (target, prop: string) {
    if (prop in target) return target[prop as keyof Cfg]
    return target.getDefOrConfig(prop as keyof ConfigType)
  }
}) as unknown as Config$
