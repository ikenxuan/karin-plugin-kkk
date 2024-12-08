import fs from 'node:fs'

import { basePath, copyConfigSync, filesByExt, requireFileSync, watch } from 'node-karin'
import YAML from 'node-karin/yaml'

import { ConfigType } from '@/types'

import { Version } from './Version'

type ConfigDirType = 'config' | 'default_config'

class Cfg {
  /** 用户配置文件路径 */
  dirCfgPath: string
  /** 默认配置文件路径 */
  defCfgPath: string

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
      list.forEach(file => watch(file, (old, now) => {
        // logger.info('旧数据:', old)
        // logger.info('新数据:', now)
      }))
    }, 2000)
    return this
  }

  /** 插件相关配置 */
  get app (): ConfigType['app'] {
    return this.getDefOrConfig('app')
  }

  /** ck相关配置 */
  get cookies (): ConfigType['cookies'] {
    return this.getDefOrConfig('cookies')
  }

  /** 抖音相关配置 */
  get douyin (): ConfigType['douyin'] {
    return this.getDefOrConfig('douyin')
  }

  /** B站相关配置 */
  get bilibili (): ConfigType['bilibili'] {
    return this.getDefOrConfig('bilibili')
  }

  /** 推送列表 */
  get pushlist (): ConfigType['pushlist'] {
    return this.getDefOrConfig('pushlist')
  }

  /** 上传相关配置 */
  get upload (): ConfigType['upload'] {
    return this.getDefOrConfig('upload')
  }

  /** 快手相关配置 */
  get kuaishou (): ConfigType['kuaishou'] {
    return this.getDefOrConfig('kuaishou')
  }

  All (): ConfigType {
    return {
      cookies: this.cookies,
      app: this.app,
      douyin: this.douyin,
      bilibili: this.bilibili,
      pushlist: this.pushlist,
      upload: this.upload,
      kuaishou: this.kuaishou
    }
  }

  /** 默认配置和用户配置 */
  private getDefOrConfig (name: string) {
    const def = this.getdefSet(name)
    const config = this.getConfig(name)
    return { ...def, ...config }
  }

  /** 默认配置 */
  private getdefSet (name: string) {
    return this.getYaml('default_config', name)
  }

  /** 用户配置 */
  private getConfig (name: string) {
    return this.getYaml('config', name)
  }

  /**
   * 获取配置yaml
   * @param type 默认跑配置-defSet，用户配置-config
   * @param name 名称
   */
  private getYaml (type: ConfigDirType, name: string) {
    const file = type === 'config'
      ? `${this.dirCfgPath}/${name}.yaml`
      : `${this.defCfgPath}/${name}.yaml`

    // 自动管理缓存 无需手动清除 如无缓存 则会自动导入并加载
    return requireFileSync(file)
  }

  /**
   * 修改设置
   * @param name 文件名
   * @param key 修改的key值
   * @param value 修改的value值
   * @param type 配置文件或默认
   */
  modify (
    name: 'cookies' | 'app' | 'douyin' | 'bilibili' | 'pushlist' | 'upload' | 'kuaishou',
    key: string,
    value: any,
    type: ConfigDirType = 'config'
  ) {
    const path = type === 'config'
      ? `${this.dirCfgPath}/${name}.yaml`
      : `${this.defCfgPath}/${name}.yaml`

    // 读取 YAML 文件
    const yamlData = YAML.parseDocument(fs.readFileSync(path, 'utf8'))

    // 处理嵌套路径
    const keys = key.split('.')
    let current: YAML.YAMLMap | undefined = yamlData.contents as YAML.YAMLMap

    // 遍历键并确保每个子键都有对应的结构
    for (const subKey of keys.slice(0, -1)) {
      if (current instanceof YAML.YAMLMap) {
        let subValue: any = current.get(subKey)

        // 类型保护，确保 subValue 是 YAMLMap
        if (!YAML.isMap(subValue)) {
          subValue = new YAML.YAMLMap() // 创建新的 YAMLMap
          current.set(subKey, subValue) // 设置新的子值
        }

        current = subValue // 更新 current 为子结构
      } else {
        throw new Error(`Invalid YAML structure: ${subKey} is not a YAMLMap.`)
      }
    }

    // 设置最终值
    if (current instanceof YAML.YAMLMap) {
      current.set(keys[keys.length - 1], value)
    } else {
      throw new Error('Invalid YAML structure: Unable to set value.')
    }

    // 写回 YAML 文件并保留注释
    fs.writeFileSync(path, yamlData.toString({ lineWidth: -1 }), 'utf8')
  }
}

export const Config = new Cfg().initCfg()
