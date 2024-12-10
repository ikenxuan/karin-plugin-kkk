import Amagi from '@ikenxuan/amagi'
import { basePath, common, logger } from 'node-karin'

import { Common, Config, Version } from '@/module'

const haha = new Amagi({
  bilibili: Config.cookies.bilibili,
  douyin: Config.cookies.douyin,
  kuaishou: Config.cookies.kuaishou
})
Config.app.APIServer && haha.startClient(Config.app.APIServerPort)

const base = `${basePath}/${Version.pluginName}`
common.mkdir(`${base}/data`)
common.mkdir(Common.tempDri.images)
common.mkdir(Common.tempDri.video)
logger.info(`${logger.green(`[插件:${Version.pluginName}]`)} ${logger.violet(`${Version.pluginVersion}`)} 初始化完成~`)
