import '@/module/server/Register'
import '@/platform/bilibili/riskControl'

import { logger, mkdirSync } from 'node-karin'
import { karinPathBase } from 'node-karin/root'

import { Common, Root } from '@/module'
import { initAllDatabases } from '@/module/db'

// ----------------- DATABASE INIT -----------------
await initAllDatabases().catch((err) => {
  logger.error(`[karin-plugin-kkk] 数据库初始化失败: ${err.message}`)
})

// ------------------- MAIN INIT -------------------
mkdirSync(`${karinPathBase}/${Root.pluginName}/data`)
mkdirSync(Common.tempDri.images)
mkdirSync(Common.tempDri.video)
