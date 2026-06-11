/**
 * 动画工具函数，遵循 Web Interface Guidelines 的动画最佳实践。
 * 自动检测 prefers-reduced-motion 并调整动画参数。
 */

/**
 * 检测用户是否偏好减少动画。
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 获取适配用户偏好的动画时长。
 * @param duration 默认动画时长（秒）
 * @returns 如果用户偏好减少动画，返回 0.01，否则返回原时长
 */
export const getAnimationDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0.01 : duration
}

/**
 * 获取适配用户偏好的交错动画延迟。
 * @param stagger 默认交错延迟（秒）
 * @returns 如果用户偏好减少动画，返回 0，否则返回原延迟
 */
export const getStaggerDelay = (stagger: number): number => {
  return prefersReducedMotion() ? 0 : stagger
}

/**
 * 符合 Web Interface Guidelines 的 GSAP 动画配置。
 * 只使用 transform 和 opacity 属性，避免触发 layout 和 paint。
 */
export const animationDefaults = {
  duration: getAnimationDuration(0.35),
  ease: 'power2.out',
  stagger: getStaggerDelay(0.03)
}

/**
 * 淡入动画的默认 fromVars。
 */
export const fadeInFrom = {
  opacity: 0,
  y: 12
}

/**
 * 淡入动画的默认 toVars。
 */
export const fadeInTo = {
  opacity: 1,
  y: 0,
  ...animationDefaults
}
