import { Transform, TransformCallback } from 'node:stream'

/**
 * 限速流转换器
 * 用于控制下载速度，避免触发服务器风控
 */
export class ThrottleStream extends Transform {
  private bytesPerSecond: number
  private startTime: number
  private totalBytes: number

  /**
   * 创建限速流
   * @param bytesPerSecond 每秒允许通过的字节数
   */
  constructor (bytesPerSecond: number) {
    super()
    this.bytesPerSecond = bytesPerSecond
    this.startTime = Date.now()
    this.totalBytes = 0
  }

  /**
   * 动态调整速度限制
   * @param newSpeed 新的速度限制 (bytes/s)
   */
  setSpeed (newSpeed: number): void {
    this.bytesPerSecond = newSpeed
    // 重置计时，避免突然的速度变化导致长时间等待
    this.startTime = Date.now()
    this.totalBytes = 0
  }

  /**
   * 获取当前速度限制
   */
  getSpeed (): number {
    return this.bytesPerSecond
  }

  /**
   * 获取当前实际速度
   */
  getCurrentSpeed (): number {
    const elapsed = (Date.now() - this.startTime) / 1000
    if (elapsed <= 0) return 0
    return this.totalBytes / elapsed
  }

  _transform (chunk: Buffer, _encoding: BufferEncoding, callback: TransformCallback): void {
    this.totalBytes += chunk.length

    // 计算已经过的时间
    const elapsed = (Date.now() - this.startTime) / 1000

    // 计算按当前速度限制应该花费的时间
    const expectedTime = this.totalBytes / this.bytesPerSecond

    // 如果实际时间小于预期时间，需要等待
    const delay = Math.max(0, (expectedTime - elapsed) * 1000)

    if (delay > 0) {
      setTimeout(() => {
        this.push(chunk)
        callback()
      }, delay)
    } else {
      this.push(chunk)
      callback()
    }
  }

  _flush (callback: TransformCallback): void {
    callback()
  }
}
