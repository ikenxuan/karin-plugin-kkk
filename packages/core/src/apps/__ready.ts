import { Root } from '@/module'
import { logger } from '@/module/utils/logger'

const start = globalThis.__kkkLoadStart
const elapsedMs = typeof start === 'bigint' ? Number(process.hrtime.bigint() - start) / 1_000_000 : 0

const timeText = elapsedMs >= 1000 ? `${String(parseFloat((elapsedMs / 1000).toFixed(2)))}s` : `${Math.round(elapsedMs)}ms`

logger.info(`${logger.green(`v${Root.pluginVersion}`)} 初始化完成 ~ 耗时 ${logger.green(timeText)}`)

delete (globalThis as any).__kkkLoadStart
