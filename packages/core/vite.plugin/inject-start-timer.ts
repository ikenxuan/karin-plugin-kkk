import type { Plugin } from 'vite'

/**
 * 注入主 chunk 顶部的加载起始时间
 * 在打包产出的 main 入口 chunk（src/index.ts）最顶部插入高精度时间戳，
 * 以保证度量覆盖整个插件在打包后首次执行的时间范围。
 */
export const injectStartTimerPlugin = (): Plugin => {
  return {
    name: 'inject-start-timer',
    renderChunk(code, chunk) {
      const isMainEntry =
        chunk.name === 'index' ||
        (chunk.facadeModuleId?.replace(/\\/g, '/').endsWith('/src/index.ts') ?? false)

      if (!isMainEntry) return null

      const prefix =
        'globalThis.__kkkLoadStart ??= (typeof process !== "undefined" && process.hrtime?.bigint ? process.hrtime.bigint() : BigInt(Date.now()));\n'

      return {
        code: prefix + code,
        map: null
      }
    }
  }
}
