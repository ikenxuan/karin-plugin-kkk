/**
 * 水印配置管理工具
 * 使用 localStorage 保存用户的水印偏好设置
 */

const WATERMARK_CONFIG_KEY = 'karin-template-watermark-enabled'

/**
 * 获取水印启用状态
 * @returns 是否启用水印（默认为 true）
 */
export const getWatermarkEnabled = (): boolean => {
  try {
    const stored = localStorage.getItem(WATERMARK_CONFIG_KEY)
    // 默认启用水印
    return stored === null ? true : stored === 'true'
  } catch (error) {
    console.warn('无法读取水印配置:', error)
    return true
  }
}

/**
 * 设置水印启用状态
 * @param enabled 是否启用水印
 */
export const setWatermarkEnabled = (enabled: boolean): void => {
  try {
    localStorage.setItem(WATERMARK_CONFIG_KEY, String(enabled))
  } catch (error) {
    console.warn('无法保存水印配置:', error)
  }
}

/**
 * 切换水印启用状态
 * @returns 切换后的状态
 */
export const toggleWatermarkEnabled = (): boolean => {
  const current = getWatermarkEnabled()
  const newValue = !current
  setWatermarkEnabled(newValue)
  return newValue
}
