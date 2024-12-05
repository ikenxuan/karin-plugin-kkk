import fs from 'node:fs'
import YAML from 'node-karin/yaml'
import { ConfigType } from '@/types'
import { Version } from './Version'
import { copyConfigSync, basePath, filesByExt, watch, requireFileSync } from 'node-karin'

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
      kuaishou: this.kuaishou,
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
    for (let i = 0; i < keys.length - 1; i++) {
      const subKey = keys[i]
      if (current instanceof YAML.YAMLMap) {
        let subValue: YAML.YAMLMap | YAML.Scalar | any | undefined = current.get(subKey)

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
    fs.writeFileSync(path, yamlData.toString(), 'utf8')
  }

  private mergeObjectsWithPriority (
    userDoc: YAML.Document.Parsed,
    defaultDoc: YAML.Document.Parsed
  ): { result: YAML.Document.Parsed; differences: boolean } {
    let differences = false

    // 合并 YAML 对象，确保注释保留
    function mergeYamlNodes (target: any, source: any): any {
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

/**
 * YamlReader类提供了对YAML文件的动态读写功能
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class YamlReader {
  private filePath: string
  private document: YAML.Document.Parsed

  constructor (filePath: string) {
    this.filePath = filePath
    this.document = this.parseDocument()
  }

  private parseDocument (): YAML.Document.Parsed {
    const fileContent = fs.readFileSync(this.filePath, 'utf8')
    return YAML.parseDocument(fileContent)
  }

  set (key: string, value: any) {
    this.document.set(key, value)
    this.write()
  }

  rm (key: string) {
    this.document.delete(key)
    this.write()
  }

  private write () {
    fs.writeFileSync(this.filePath,
      this.document.toString({
        lineWidth: -1,
        simpleKeys: true,
      }), 'utf8')
  }
}

export const Config = new Cfg().initCfg()
