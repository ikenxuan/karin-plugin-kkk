import { createBilibiliRoutes, createDouyinRoutes, createKuaishouRoutes, createXiaohongshuRoutes } from '@ikenxuan/amagi'
import { logger } from 'node-karin'
import express from 'node-karin/express'

import { registerAmagiReloadListener } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'

/**
 * 平台 Router 的请求配置。
 *
 * `createXxxRoutes(cookie, requestConfig?)` 的第二参与 client 的
 * `ClientOptions.request` 是同一个东西 —— 原先只传了 cookie，于是 HTTP API
 * 这一路绕开了插件配置里的代理、超时与 UA，行为与 SDK 那一路不一致。
 * @returns 与 `AmagiBase.createAmagiClient` 同源的请求配置
 */
const requestConfigOf = () => {
  const amagi = Config.amagi
  return {
    timeout: amagi.timeout,
    headers: { 'User-Agent': amagi['User-Agent'] },
    proxy: amagi.proxy?.switch ? amagi.proxy : (false as const)
  }
}

/** 创建使用当前配置的 Amagi 平台 Router。 */
const createPlatformRouters = () => {
  const requestConfig = requestConfigOf()
  return {
    bilibili: createBilibiliRoutes(Config.amagi.cookies.bilibili, requestConfig),
    douyin: createDouyinRoutes(Config.amagi.cookies.douyin, requestConfig),
    kuaishou: createKuaishouRoutes(Config.amagi.cookies.kuaishou, requestConfig),
    xiaohongshu: createXiaohongshuRoutes(Config.amagi.cookies.xiaohongshu, requestConfig)
  }
}

/**
 * 创建一个挂载地址保持不变、内部平台 Router 可热切换的 Amagi Router。
 *
 * Express 挂载后无法直接替换中间件栈，因此外层 Router 始终保持稳定，
 * 每次请求再转发给当前的平台 Router；配置重载时只需原子替换内部引用。
 */
export const createReloadableAmagiRouter = () => {
  const router = express.Router()
  let platformRouters = createPlatformRouters()

  router.use('/bilibili', (req, res, next) => platformRouters.bilibili(req, res, next))
  router.use('/douyin', (req, res, next) => platformRouters.douyin(req, res, next))
  router.use('/kuaishou', (req, res, next) => platformRouters.kuaishou(req, res, next))
  router.use('/xiaohongshu', (req, res, next) => platformRouters.xiaohongshu(req, res, next))

  registerAmagiReloadListener(() => {
    platformRouters = createPlatformRouters()
    logger.debug('[AmagiRouter] 平台 Router 已使用最新配置重建')
  })

  return router
}
