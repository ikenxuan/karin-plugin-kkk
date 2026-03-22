declare global {
  var __kkkLoadStart: bigint | undefined
}

globalThis.__kkkLoadStart ??= process.hrtime.bigint()

import('./setup')

export { } 
