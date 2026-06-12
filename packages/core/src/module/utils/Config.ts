import fs from 'node:fs'

import { logger, watch } from 'node-karin'
import { karinPathBase } from 'node-karin/root'
import YAML from 'node-karin/yaml'

import type { ConfigType } from '@/types'
import type { bilibiliPushItem, douyinPushItem } from '@/types/config/pushlist'

import { Root } from '../../root'

type ConfigDirType = 'config' | 'default_config'

class Cfg {
  /** 用户配置文件路径 */
  private dirCfgPath: string
  /** 默认配置文件路径 */
  private defCfgPath: string
  /** JSON 配置文件路径 */
  private get jsonConfigPath() {
    return `${this.dirCfgPath}/config.json`
  }
  private get defJsonConfigPath() {
    return `${this.defCfgPath}/config.json`
  }

  constructor() {
    this.dirCfgPath = `${karinPathBase}/${Root.pluginName}/config`
    this.defCfgPath = `${Root.pluginPath}/config/default_config/`
  }

  /** 初始化配置 */
  initCfg() {
    // 1. 确保用户配置目录存在
    if (!fs.existsSync(this.dirCfgPath)) {
      fs.mkdirSync(this.dirCfgPath, { recursive: true })
    }

    // 2. 如果用户没有 config.json 且没有 YAML 文件，复制默认配置（全新安装）
    const hasJson = fs.existsSync(this.jsonConfigPath)
    const hasYaml = ['app', 'bilibili', 'cookies', 'douyin', 'kuaishou', 'pushlist', 'request', 'upload', 'xiaohongshu'].some((name) =>
      fs.existsSync(`${this.dirCfgPath}/${name}.yaml`)
    )

    if (!hasJson && !hasYaml && fs.existsSync(this.defJsonConfigPath)) {
      fs.copyFileSync(this.defJsonConfigPath, this.jsonConfigPath)
    }

    // 3. 合并默认配置（处理新增字段）
    if (fs.existsSync(this.jsonConfigPath) && fs.existsSync(this.defJsonConfigPath)) {
      const userConfig = this.getJson()
      const defConfig = JSON.parse(fs.readFileSync(this.defJsonConfigPath, 'utf8'))
      const merged = this.mergeJsonConfigs(defConfig, userConfig)
      if (JSON.stringify(merged) !== JSON.stringify(userConfig)) {
        this.setJson(merged)
      }
    }

    // 4. 监听 config.json 变化
    setTimeout(() => {
      if (fs.existsSync(this.jsonConfigPath)) {
        watch(this.jsonConfigPath, (old, now) => {
          // @ts-ignore
          if (old?.amagi !== now?.amagi) {
            logger.debug('[Config] 检测到 amagi 配置变化，正在重载 Amagi Client...')
            import('./amagiClient')
              .then(({ reloadAmagiConfig }) => reloadAmagiConfig())
              .catch((error) => logger.error(`[Config] 重载 Amagi Client 失败: ${error}`))
          }
        })
      }
    }, 2000)

    return this
  }

  /** 读取 JSON 配置 */
  private getJson(): any {
    return JSON.parse(fs.readFileSync(this.jsonConfigPath, 'utf8'))
  }

  /** 写入 JSON 配置 */
  private setJson(config: any) {
    fs.writeFileSync(this.jsonConfigPath, JSON.stringify(config, null, 2), 'utf8')
  }

  /** 深度合并 JSON 配置（保留用户值，补充默认值） */
  private mergeJsonConfigs(def: any, user: any): any {
    if (!def || typeof def !== 'object' || Array.isArray(def)) return user ?? def
    if (!user || typeof user !== 'object' || Array.isArray(user)) return user ?? def

    const result: any = { ...def }
    for (const key in user) {
      if (typeof user[key] === 'object' && !Array.isArray(user[key]) && user[key] !== null) {
        result[key] = this.mergeJsonConfigs(def[key], user[key])
      } else {
        result[key] = user[key]
      }
    }
    return result
  }

  /**
   * 获取配置
   * @param name 配置键名
   */
  getDefOrConfig(name: keyof ConfigType) {
    const config = this.getJson()
    return config[name] || {}
  }

  /** 获取所有配置文件 */
  async All(): Promise<ConfigType> {
    const { getDouyinDB, getBilibiliDB } = await import('../db')
    const douyinDB = await getDouyinDB()
    const bilibiliDB = await getBilibiliDB()

    const allConfig: any = this.getJson()

    // 从数据库获取过滤配置并合并到推送列表中
    if (allConfig.pushlist) {
      try {
        if (allConfig.pushlist.douyin) {
          for (const item of allConfig.pushlist.douyin) {
            const filterWords = await douyinDB.getFilterWords(item.sec_uid)
            const filterTags = await douyinDB.getFilterTags(item.sec_uid)
            const userInfo = await douyinDB.getDouyinUser(item.sec_uid)
            if (userInfo) {
              item.filterMode = (userInfo.filterMode as 'blacklist' | 'whitelist') || 'blacklist'
            }
            item.Keywords = filterWords
            item.Tags = filterTags
          }
        }
        if (allConfig.pushlist.bilibili) {
          for (const item of allConfig.pushlist.bilibili) {
            const filterWords = await bilibiliDB.getFilterWords(item.host_mid)
            const filterTags = await bilibiliDB.getFilterTags(item.host_mid)
            const userInfo = await bilibiliDB.getOrCreateBilibiliUser(item.host_mid)
            if (userInfo) {
              item.filterMode = (userInfo.filterMode as 'blacklist' | 'whitelist') || 'blacklist'
            }
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
   * 修改整个配置文件
   * @param name 文件名
   * @param config 完整的配置对象
   */
  async ModifyPro<T extends keyof ConfigType>(name: T, config: ConfigType[T], type: ConfigDirType = 'config') {
    if (type !== 'config') return false

    const { getDouyinDB, getBilibiliDB } = await import('../db')
    const douyinDB = await getDouyinDB()
    const bilibiliDB = await getBilibiliDB()

    const jsonConfig = this.getJson()
    jsonConfig[name] = config
    this.setJson(jsonConfig)

    // 同步到数据库
    if ('douyin' in config) {
      await this.syncFilterConfigToDb(config.douyin as douyinPushItem[], douyinDB, 'sec_uid')
      logger.debug('已同步抖音过滤配置到数据库')
    }
    if ('bilibili' in config) {
      await this.syncFilterConfigToDb(config.bilibili as bilibiliPushItem[], bilibiliDB, 'host_mid')
      logger.debug('已同步B站过滤配置到数据库')
    }
    return true
  }

  /**
   * 修改配置字段（支持深层嵌套路径，包括数组索引）
   * @param moduleName 模块名
   * @param path 字段路径，如 'push.switch' 或 'cookies.douyin' 或 'list[0].name'
   * @param value 新值
   */
  async Modify<T extends keyof ConfigType>(moduleName: T, path: string, value: any) {
    const jsonConfig = this.getJson()
    const pathKeys = this.parsePath(path)

    // 导航到目标对象
    let target: any = jsonConfig[moduleName]
    for (let i = 0; i < pathKeys.length - 1; i++) {
      const key = pathKeys[i]
      if (!(key in target)) {
        target[key] = {}
      }
      target = target[key]
    }

    // 设置值
    const lastKey = pathKeys[pathKeys.length - 1]
    target[lastKey] = value

    // 保存
    this.setJson(jsonConfig)

    // 同步数据库
    if (moduleName === 'pushlist') {
      const { getDouyinDB, getBilibiliDB } = await import('../db')
      const douyinDB = await getDouyinDB()
      const bilibiliDB = await getBilibiliDB()

      if ('douyin' in jsonConfig[moduleName]) {
        await this.syncFilterConfigToDb(jsonConfig[moduleName].douyin, douyinDB, 'sec_uid')
      }
      if ('bilibili' in jsonConfig[moduleName]) {
        await this.syncFilterConfigToDb(jsonConfig[moduleName].bilibili, bilibiliDB, 'host_mid')
      }
    }

    return true
  }

  /**
   * 解析路径字符串，支持点号和数组索引
   * 'a.b.c' => ['a', 'b', 'c']
   * 'a[0].b' => ['a', '0', 'b']
   */
  private parsePath(path: string): string[] {
    return path.replace(/\[(\d+)\]/g, '.$1').split('.')
  }

  /**
   * 同步过滤配置到数据库
   * @param items 推送项列表
   * @param db 数据库实例
   * @param idField ID字段名称
   */
  private async syncFilterConfigToDb(items: any[], db: any, idField: string) {
    for (const item of items) {
      const id = item[idField]
      if (!id) continue

      if (item.filterMode) {
        await db.updateFilterMode(id, item.filterMode)
      }

      if (item.Keywords && Array.isArray(item.Keywords)) {
        const existingWords = await db.getFilterWords(id)
        for (const word of existingWords) {
          if (!item.Keywords.includes(word)) {
            await db.removeFilterWord(id, word)
          }
        }
        for (const word of item.Keywords) {
          if (!existingWords.includes(word)) {
            await db.addFilterWord(id, word)
          }
        }
      }

      if (item.Tags && Array.isArray(item.Tags)) {
        const existingTags = await db.getFilterTags(id)
        for (const tag of existingTags) {
          if (!item.Tags.includes(tag)) {
            await db.removeFilterTag(id, tag)
          }
        }
        for (const tag of item.Tags) {
          if (!existingTags.includes(tag)) {
            await db.addFilterTag(id, tag)
          }
        }
      }
    }
  }

  /**
   * 同步配置到数据库
   */
  async syncConfigToDatabase() {
    try {
      const { getDouyinDB, getBilibiliDB } = await import('../db')
      const douyinDB = await getDouyinDB()
      const bilibiliDB = await getBilibiliDB()

      const config = this.getJson()
      const pushCfg = config.pushlist

      if (pushCfg?.bilibili) await bilibiliDB.syncConfigSubscriptions(pushCfg.bilibili)
      if (pushCfg?.douyin) await douyinDB.syncConfigSubscriptions(pushCfg.douyin)
      logger.debug('[BilibiliDB] + [DouyinDB] 配置已同步到数据库')
    } catch (error) {
      logger.error('同步配置到数据库失败:', error)
    }
  }
}

type Config$ = ConfigType & Pick<Cfg, 'All' | 'Modify' | 'ModifyPro' | 'syncConfigToDatabase'>

let configInstance: Config$ | null = null
let migrationExecuted = false

const getConfigInstance = (): Config$ => {
  if (!configInstance) {
    // 首次初始化时执行迁移
    if (!migrationExecuted) {
      migrateConfigFromYaml()
      migrationExecuted = true
    }

    configInstance = new Proxy(new Cfg().initCfg(), {
      get(target, prop: string) {
        if (prop in target) return target[prop as keyof Cfg]
        return target.getDefOrConfig(prop as keyof ConfigType)
      }
    }) as unknown as Config$
  }
  return configInstance
}

export const Config: Config$ = new Proxy({} as Config$, {
  get(target, prop: string) {
    return getConfigInstance()[prop as keyof Config$]
  }
})

/**
 * 从 YAML 迁移到 JSON
 */
const migrateConfigFromYaml = () => {
  const dirCfgPath = `${karinPathBase}/${Root.pluginName}/config`
  const defCfgPath = `${Root.pluginPath}/config/default_config/`
  const jsonConfigPath = `${dirCfgPath}/config.json`

  if (fs.existsSync(jsonConfigPath)) return

  const yamlFiles = ['app', 'bilibili', 'cookies', 'douyin', 'kuaishou', 'pushlist', 'request', 'upload', 'xiaohongshu']
  const hasYaml = yamlFiles.some((name) => fs.existsSync(`${dirCfgPath}/${name}.yaml`))
  if (!hasYaml) return

  try {
    // 读取默认配置作为模板
    const defYaml: any = {}
    for (const name of yamlFiles) {
      const file = `${defCfgPath}/${name}.yaml`
      if (fs.existsSync(file)) {
        defYaml[name] = YAML.parse(fs.readFileSync(file, 'utf8'))
      }
    }

    // 读取用户配置，只保留默认配置中存在的字段
    const userYaml: any = {}
    for (const name of yamlFiles) {
      const file = `${dirCfgPath}/${name}.yaml`
      if (fs.existsSync(file)) {
        const data = YAML.parse(fs.readFileSync(file, 'utf8'))
        userYaml[name] = filterKeys(data, defYaml[name])
      }
    }

    // 转换结构
    const jsonConfig = {
      amagi: {
        timeout: userYaml.request?.timeout ?? defYaml.request?.timeout,
        'User-Agent': userYaml.request?.['User-Agent'] ?? defYaml.request?.['User-Agent'],
        proxy: userYaml.request?.proxy ?? defYaml.request?.proxy,
        cookies: userYaml.cookies || defYaml.cookies || {},
        APIServer: userYaml.app?.APIServer ?? defYaml.app?.APIServer,
        APIServerMount: userYaml.app?.APIServerMount ?? defYaml.app?.APIServerMount,
        APIServerPort: userYaml.app?.APIServerPort ?? defYaml.app?.APIServerPort
      },
      app: {
        ...defYaml.app,
        ...defYaml.upload,
        ...userYaml.app,
        ...userYaml.upload
      },
      douyin: userYaml.douyin || defYaml.douyin,
      bilibili: userYaml.bilibili || defYaml.bilibili,
      kuaishou: userYaml.kuaishou || defYaml.kuaishou,
      xiaohongshu: userYaml.xiaohongshu || defYaml.xiaohongshu,
      pushlist: userYaml.pushlist || defYaml.pushlist
    }

    fs.writeFileSync(jsonConfigPath, JSON.stringify(jsonConfig, null, 2), 'utf8')

    // 备份 YAML
    const backupDir = `${dirCfgPath}/yaml_backup_${Date.now()}`
    fs.mkdirSync(backupDir, { recursive: true })
    for (const name of yamlFiles) {
      const file = `${dirCfgPath}/${name}.yaml`
      if (fs.existsSync(file)) {
        fs.copyFileSync(file, `${backupDir}/${name}.yaml`)
        fs.unlinkSync(file)
      }
    }

    logger.info(`[Config] YAML 配置已迁移到 config.json，备份保存在 ${backupDir}`)
  } catch (error) {
    logger.error(`[Config] YAML 迁移失败: ${error}`)
  }
}

const filterKeys = (user: any, template: any): any => {
  if (!template || typeof template !== 'object') return user
  if (Array.isArray(template)) return user

  const result: any = {}
  for (const key in template) {
    if (key in user) {
      result[key] = typeof template[key] === 'object' && !Array.isArray(template[key]) ? filterKeys(user[key], template[key]) : user[key]
    }
  }
  return result
}
