import Amagi from '@ikenxuan/amagi'
import { common, logger, basePath } from 'node-karin'

import { Config, Version } from '@/module'

const haha = new Amagi({
  bilibili: Config.cookies.bilibili,
  douyin: Config.cookies.douyin,
  kuaishou: Config.cookies.kuaishou,
})
Config.app.APIServer && haha.startClient(Config.app.APIServerPort)

const base = `${basePath}/${Version.pluginName}`
common.mkdir(`${base}/data`)
common.mkdir(`${base}/temp/${Version.pluginName}/kkkdownload/video/`)
common.mkdir(`${base}/temp/${Version.pluginName}/kkkdownload/images/`)
logger.info(`${logger.green(`[插件:${Version.pluginName}]`)} ${logger.violet(`${Version.pluginVersion}`)} 初始化完成~`)
