import amagi from '@ikenxuan/amagi'
import { common, logger } from 'node-karin'

import { Config, Version } from '@/module'

const haha = new amagi({
  bilibili: Config.cookies.bilibili,
  douyin: Config.cookies.douyin,
  kuaishou: Config.cookies.kuaishou
})
Config.app.APIServer && haha.startClient(Config.app.APIServerPort)

common.mkdir(`${Version.karinPath}/data/${Version.pluginName}`)
common.mkdir(`${Version.karinPath}/temp/${Version.pluginName}/kkkdownload/video/`)
common.mkdir(`${Version.karinPath}/temp/${Version.pluginName}/kkkdownload/images/`)
logger.info(`${logger.green(`[插件:${Version.pluginName}]`)} ${logger.violet(`${Version.pluginVersion}`)} 初始化完成~`)