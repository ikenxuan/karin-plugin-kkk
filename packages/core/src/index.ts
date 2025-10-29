import '@/module/server/Register'

import { logger, mkdirSync } from 'node-karin'
import { karinPathBase } from 'node-karin/root'

import { Common, Root } from '@/module'

// ----------------- DATABASE INIT -----------------
const { initAllDatabases } = await import('@/module/db')
await initAllDatabases().catch((err) => {
  logger.error(`[karin-plugin-kkk] 数据库初始化失败: ${err.message}`)
})

// ------------------- MAIN INIT -------------------
mkdirSync(`${karinPathBase}/${Root.pluginName}/data`)
mkdirSync(Common.tempDri.images)
mkdirSync(Common.tempDri.video)

console.log('')
console.log('-------------------------- karin-plugin-kkk --------------------------')
logger.info(`${logger.violet(`[插件:v${Root.pluginVersion}]`)} ${logger.green(Root.pluginName)} 初始化完成~`)
logger.info(`${logger.violet('[server]')} ${logger.yellow('外部解析页面:')} ${logger.green(`http://127.0.0.1:${process.env.HTTP_PORT!}/kkk/`)}`)
logger.info(`${logger.violet('[server]')} ${logger.yellow('推送历史管理:')} ${logger.green(`http://127.0.0.1:${process.env.HTTP_PORT!}/kkk/database`)}`)
console.log('-------------------------- karin-plugin-kkk --------------------------')
console.log('')