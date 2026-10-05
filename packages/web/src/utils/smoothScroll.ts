/**
 * 滚轮平滑滚动绑定。
 *
 * 拦截滚动容器上的 wheel 事件，把滚动增量累积到一个目标位置，
 * 每帧以帧率无关的指数缓动向目标插值：起手快、收尾慢，形成
 * 跟随滚轮输入的"由快到慢"缓动曲线。滚动过程中可随时被新的
 * 滚轮输入打断、加速或反向，程序化滚动共用同一条曲线。
 *
 * 触摸滚动不接管：移动端原生触摸滚动本身就是 1:1 跟手，并自带
 * 系统级的由快到慢动量衰减，JS 接管反而会丢失跟手性与回弹。
 * prefers-reduced-motion 时保持原生瞬时滚动。
 */

import gsap from 'gsap'
import type { RefObject } from 'react'

/** 60fps 基准下每帧位置向目标位置靠拢的比例，越小惯性越长 */
const LERP_PER_FRAME = 0.12

/** deltaMode 为"行"时的每行像素近似值（Firefox 按行报增量） */
const LINE_HEIGHT_PX = 33

/**
 * 收敛与"是否自己写入"的判定容差（像素）。
 * 浏览器会把 scrollTop 吸附到设备像素网格（缩放时网格更粗），
 * 实际落点与写入值存在亚像素差异，判定必须容住这个误差。
 */
const SETTLE_EPSILON = 1

/**
 * 平滑滚动控制句柄。
 */
export interface SmoothScrollHandle {
  /**
   * 以缓动曲线滚动到指定位置，可被滚轮输入随时打断。
   */
  scrollTo: (top: number) => void
  /**
   * 解除绑定并停止动画循环。
   */
  destroy: () => void
}

const emptyHandle: SmoothScrollHandle = {
  scrollTo: () => {},
  destroy: () => {}
}

const clampTop = (top: number, max: number): number => {
  return Math.min(Math.max(top, 0), Math.max(max, 0))
}

const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 创建平滑滚动绑定。
 * @param scroller 实际被滚动的元素（写 scrollTop 的目标）
 * @param wheelHost wheel 事件监听宿主（通常是滚动容器本身或布局根元素）
 * @param scrollHost scroll 事件监听宿主（元素滚动挂元素，页面滚动挂 window）
 */
const createSmoothScroll = (
  scroller: HTMLElement,
  wheelHost: HTMLElement | Window,
  scrollHost: HTMLElement | Window
): SmoothScrollHandle => {
  let current = scroller.scrollTop
  let target = current
  let lastWritten = current
  let ticking = false
  let firstTick = false

  const maxScroll = () => scroller.scrollHeight - scroller.clientHeight

  function stopTicker() {
    if (!ticking) return
    ticking = false
    gsap.ticker.remove(tick)
  }

  function tick() {
    // 时间归一化的指数缓动：帧率无关，速度随剩余距离衰减（由快到慢）。
    // gsap.ticker 休眠后再 add 会带着陈旧 delta 同步先跑一帧，首帧直接用基准系数。
    const factor = firstTick ? LERP_PER_FRAME : 1 - Math.pow(1 - LERP_PER_FRAME, gsap.ticker.deltaRatio(60))
    firstTick = false

    target = clampTop(target, maxScroll())
    current += (target - current) * factor

    if (scroller.scrollTop !== current) {
      scroller.scrollTop = current
      const actual = scroller.scrollTop
      lastWritten = actual
      // 浏览器会把 scrollTop 吸附到像素网格，也会钳到真实滚动上限
      // （scrollHeight/clientHeight 是取整值，maxScroll 估计偏大）。
      // 理想位置保持浮点，不把吸附误差喂回缓动（否则尾段步长小于
      // 吸附网格时会形成停滞）；偏差远超吸附误差说明到了真实边界，
      // 此时以实际落点为终点。
      if (Math.abs(actual - current) > SETTLE_EPSILON) {
        current = actual
        target = actual
      }
    }

    // 收敛后停止循环（gsap.ticker 无监听时会自动休眠）
    if (Math.abs(target - current) < SETTLE_EPSILON) {
      current = target
      stopTicker()
    }
  }

  function startTicker() {
    if (ticking) return
    ticking = true
    firstTick = true
    gsap.ticker.add(tick)
  }

  /**
   * 同步外部滚动（键盘、拖动滚动条、查找定位）：滚动值偏离自己最后写入的
   * 落点超过容差，说明用户在直接控制，立即贴合实际位置，避免抢滚动条。
   */
  const handleScroll = () => {
    if (Math.abs(scroller.scrollTop - lastWritten) < SETTLE_EPSILON) return

    current = scroller.scrollTop
    target = current
  }

  /**
   * 判断滚轮事件是否落在能独立滚动的内层元素上
   * （文本域、内层列表、代码块等），此时交给原生滚动。
   */
  function passesThroughNestedScroller(event: WheelEvent): boolean {
    const goingDown = event.deltaY > 0
    let node = event.target as HTMLElement | null

    while (node && node !== scroller) {
      if (node instanceof HTMLElement) {
        const overflowY = window.getComputedStyle(node).overflowY

        if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
          const canContinue = goingDown ? node.scrollTop + node.clientHeight < node.scrollHeight - 1 : node.scrollTop > 1

          if (canContinue) return true
        }
      }

      node = node.parentElement
    }

    return false
  }

  const handleWheel = (event: Event) => {
    const wheelEvent = event as WheelEvent
    // Ctrl+滚轮是捏合缩放手势，水平滚动意图（Shift+滚轮、倾斜滚轮）交原生
    if (wheelEvent.ctrlKey || Math.abs(wheelEvent.deltaX) > Math.abs(wheelEvent.deltaY)) return
    if (prefersReducedMotion()) return
    if (passesThroughNestedScroller(wheelEvent)) return

    let delta = wheelEvent.deltaY

    if (wheelEvent.deltaMode === WheelEvent.DOM_DELTA_LINE) {
      delta *= LINE_HEIGHT_PX
    } else if (wheelEvent.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      delta *= scroller.clientHeight
    }

    if (!delta) return

    wheelEvent.preventDefault()
    // 从当前目标继续累积，天然支持连续滚动与中途反向
    target = clampTop(target + delta, maxScroll())
    startTicker()
  }

  const scrollTo = (top: number) => {
    current = scroller.scrollTop
    target = clampTop(top, maxScroll())

    if (prefersReducedMotion()) {
      current = target
      lastWritten = target
      scroller.scrollTop = target
      return
    }

    startTicker()
  }

  scrollHost.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions)
  wheelHost.addEventListener('wheel', handleWheel, { passive: false } as AddEventListenerOptions)

  return {
    scrollTo,
    destroy: () => {
      stopTicker()
      scrollHost.removeEventListener('scroll', handleScroll)
      wheelHost.removeEventListener('wheel', handleWheel)
    }
  }
}

/**
 * 给滚动容器绑定滚轮平滑滚动（元素自身滚动，如桌面端主内容区、配置页 ScrollShadow）。
 * @param scrollerRef 滚动容器 ref
 * @returns 控制句柄；ref 未就绪时返回空句柄
 */
export const bindSmoothScroll = (scrollerRef: RefObject<HTMLElement | null>): SmoothScrollHandle => {
  const scroller = scrollerRef.current

  if (!scroller) return emptyHandle

  return createSmoothScroll(scroller, scroller, scroller)
}

/**
 * 给页面级滚动绑定滚轮平滑滚动。适用于内容撑开高度、由 document 根节点
 * 承载滚动的布局（如移动端布局：Surface 只有 min-h-screen，高度随内容增长）。
 * @param wheelHostRef 布局根元素 ref，wheel 监听挂在这里：覆盖整个布局区域，
 *   且 portal 到 body 的弹层（抽屉、对话框）不经过它，弹层打开时的滚动锁定不受影响
 * @returns 控制句柄；ref 未就绪时返回空句柄
 */
export const bindPageScroll = (wheelHostRef: RefObject<HTMLElement | null>): SmoothScrollHandle => {
  const wheelHost = wheelHostRef.current
  // scrollingElement 在标准模式下是 documentElement
  const scroller = document.scrollingElement as HTMLElement | null

  if (!wheelHost || !scroller) return emptyHandle

  return createSmoothScroll(scroller, wheelHost, window)
}
