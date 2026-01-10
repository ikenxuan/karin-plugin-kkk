/** 视频编码格式 */
export type VideoCodec = 'h264' | 'h265' | 'av1'

/** 横屏转竖屏模式 */
export type VerticalMode = 'off' | 'standard' | 'force'

/** 弹幕字号 */
export type DanmakuFontSize = 'small' | 'medium' | 'large'

/** 获取分辨率 */
export function getResolution(width: number, height: number): string {
  return `${width}x${height}`
}

/** 获取帧率 */
export function getFrameRate(fps: number): string {
  return `${fps}fps`
}
