import fs from 'node:fs'
import path from 'node:path'

import { basePath, copyConfigSync, filesByExt, requireFileSync, watch } from 'node-karin'
import YAML from 'node-karin/yaml'

import { ConfigType } from '@/types'

import { Version } from './Version'

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
    const allConfig: ConfigType = {} as ConfigType  // 初始化为 ConfigType 类型

    // 读取默认配置文件夹中的所有文件
    const files = fs.readdirSync(this.defCfgPath)
    files.forEach((file) => {
      const fileName = path.basename(file, '.yaml') as keyof ConfigType

      // 加载配置并合并
      allConfig[fileName] = this.getDefOrConfig(fileName) || {} as ConfigType[keyof ConfigType]
    })

    return allConfig
  }

  /**
   * 获取 YAML 文件内容
   * @param type 配置文件类型
   * @param name 配置文件名
   * @returns 返回 YAML 文件内容
   */
  private getYaml (type: ConfigDirType, name: keyof ConfigType) {
    const file =
      type === 'config'
        ? `${this.dirCfgPath}/${name}.yaml`
        : `${this.defCfgPath}/${name}.yaml`

    // 自动管理缓存 无需手动清除 如无缓存 则会自动导入并加载
    return requireFileSync(file)
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
    let current: YAML.YAMLMap | undefined = yamlData.contents as YAML.YAMLMap

    for (const subKey of keys.slice(0, -1)) {
      if (current instanceof YAML.YAMLMap) {
        let subValue: any = current.get(subKey)
        if (!YAML.isMap(subValue)) {
          subValue = new YAML.YAMLMap()
          current.set(subKey, subValue)
        }
        current = subValue
      } else {
        throw new Error(`无效的YAML结构：${subKey} 不是一个YAMLMap。`)
      }
    }

    if (current instanceof YAML.YAMLMap) {
      current.set(keys[keys.length - 1], value)
    } else {
      throw new Error('无效的YAML结构：无法设置值。')
    }

    fs.writeFileSync(path, yamlData.toString({ lineWidth: -1 }), 'utf8')
  }
}

type Config = Omit<ConfigType & Cfg, | 'getDefOrConfig' | 'initCfg'>

export const Config: Config = new Proxy(new Cfg().initCfg(), {
  get (target, prop: string) {
    if (prop in target) return target[prop as keyof Cfg]
    // 动态获取配置
    if (typeof prop === 'string') {
      return target.getDefOrConfig(prop as keyof ConfigType)
    }
    throw new Error(`属性 ${prop} 在配置文件上不存在。`)
  }
}) as unknown as Config
