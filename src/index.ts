import { logger, common } from 'node-karin'
import { Version, Config } from '@/module'
import amagi from '@ikenxuan/amagi'

const haha = new amagi({
  bilibili: Config.cookies.bilibili,
  douyin: Config.cookies.douyin,
  kuaishou: Config.cookies.kuaishou
})
Config.app.APIServer && haha.startClient(Config.app.APIServerPort)

common.mkdir(`${Version.karinPath}/temp/${Version.pluginName}/kkkdownload/video/`)
common.mkdir(`${Version.karinPath}/temp/${Version.pluginName}/kkkdownload/images/`)
logger.info(`${logger.green(`[插件:${Version.pluginName}]`)} ${logger.violet(`${Version.pluginVersion}`)} 初始化完成~`)