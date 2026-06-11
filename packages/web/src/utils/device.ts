/**
 * 设备检测工具函数
 */

export type DeviceLayout = 'mobile' | 'desktop'

export const mobilePageWidthBreakpoint = 768

/**
 * 获取当前页面可视宽度。
 * @returns 页面宽度
 */
export const getPageWidth = (): number => {
  return document.documentElement.clientWidth || window.innerWidth
}

/**
 * 根据页面宽度判断布局类型。
 * @param pageWidth 页面宽度
 * @returns 设备布局类型
 */
export const detectDeviceByPageWidth = (pageWidth: number = getPageWidth()): DeviceLayout => {
  return pageWidth <= mobilePageWidthBreakpoint ? 'mobile' : 'desktop'
}

/**
 * 根据 User-Agent 判断是否倾向移动设备。
 * @returns 是否为移动设备 UA
 */
export const hasMobileUserAgent = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone', 'mobile']

  return mobileKeywords.some((keyword) => userAgent.includes(keyword))
}

/**
 * 检测当前设备类型
 * @returns 设备布局类型
 */
export const detectDevice = (): DeviceLayout => {
  const pageWidthLayout = detectDeviceByPageWidth()

  // UA 或页面宽度任意一个命中手机条件，都使用手机布局。
  if (hasMobileUserAgent() || pageWidthLayout === 'mobile') {
    return 'mobile'
  }

  return 'desktop'
}

/**
 * 判断是否为移动设备
 * @returns boolean
 */
export const isMobileDevice = (): boolean => {
  return detectDevice() === 'mobile'
}

/**
 * 判断是否为桌面设备
 * @returns boolean
 */
export const isDesktopDevice = (): boolean => {
  return detectDevice() === 'desktop'
}
