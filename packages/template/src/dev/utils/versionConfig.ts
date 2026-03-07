/**
 * 版本信息配置管理工具
 * 使用 localStorage 保存用户的版本信息显示偏好设置
 */

const VERSION_CONFIG_KEY = 'karin-template-version-enabled'

/**
 * 获取版本信息启用状态
 * @returns 是否启用版本信息（默认为 true）
 */
export const getVersionEnabled = (): boolean => {
  try {
    const stored = localStorage.getItem(VERSION_CONFIG_KEY)
    // 默认启用版本信息
    return stored === null ? true : stored === 'true'
  } catch (error) {
    console.warn('无法读取版本信息配置:', error)
    return true
  }
}

/**
 * 设置版本信息启用状态
 * @param enabled 是否启用版本信息
 */
export const setVersionEnabled = (enabled: boolean): void => {
  try {
    localStorage.setItem(VERSION_CONFIG_KEY, String(enabled))
  } catch (error) {
    console.warn('无法保存版本信息配置:', error)
  }
}

/**
 * 切换版本信息启用状态
 * @returns 切换后的状态
 */
export const toggleVersionEnabled = (): boolean => {
  const current = getVersionEnabled()
  const newValue = !current
  setVersionEnabled(newValue)
  return newValue
}
