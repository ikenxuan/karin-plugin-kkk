declare global {
  var __kkkLoadStart: bigint | undefined
}

globalThis.__kkkLoadStart ??= process.hrtime.bigint()

const main = './setup'
await import(main)

export { } 
