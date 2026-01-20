/// <reference lib="dom" />
import { Watermark } from '@pansy/watermark'
import { snapdom } from '@zumer/snapdom'

/**
 * 截图配置接口
 */
export interface ScreenshotOptions {
  /** 要截图的元素 */
  element: HTMLElement
  /** 当前缩放比例 */
  scale: number
  /** 当前位移 */
  panOffset: { x: number; y: number }
  /** 是否为深色模式 */
  isDarkMode?: boolean
}

/**
 * 截图结果接口
 */
export interface ScreenshotResult {
  /** Blob 对象 */
  blob: Blob
  /** 下载方法 */
  download: () => void
  /** 复制到剪贴板方法 */
  copyToClipboard: () => Promise<void>
}

/**
 * 执行截图
 * @param options 截图配置
 * @returns Promise<ScreenshotResult>
 */
export const captureScreenshot = async (options: ScreenshotOptions): Promise<ScreenshotResult> => {
  const { element, isDarkMode = false } = options

  console.log('开始使用 SnapDOM 截图...')

  try {
    // 找到实际要截图的内容元素（.shadow-2xl 容器）
    const actualContent = element.querySelector('.shadow-2xl') as HTMLElement
    const targetElement = actualContent || element
    
    // 获取元素实际尺寸
    const rect = targetElement.getBoundingClientRect()
    console.log(`截图目标尺寸: ${rect.width}x${rect.height}`)

    // 创建水印实例
    const watermarkInstance = new Watermark({
      container: targetElement,
      text: '开发中内容，实际内容请以正式发布为准',
      width: 800,
      height: 600,
      fontSize: 36,
      fontColor: isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)',
      fontWeight: 'bold',
      opacity: 0.1,
      mode: 'interval'
    })
    
    // 等待水印渲染完成
    await new Promise(resolve => setTimeout(resolve, 200))

    // 临时处理空元素，防止 snapdom 忽略它们的高度
    const emptyElements: Array<{ 
      element: HTMLElement
      originalHTML: string
      computedHeight: string
    }> = []
    
    const allElements = targetElement.querySelectorAll('*')
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      
      // 检查是否是空元素（没有子元素且没有文本内容）
      if (htmlEl.children.length === 0 && !htmlEl.textContent?.trim()) {
        const computedStyle = window.getComputedStyle(htmlEl)
        const height = computedStyle.height
        
        // 如果元素有明确的高度（不是 auto 或 0px）
        if (height && height !== 'auto' && height !== '0px') {
          emptyElements.push({
            element: htmlEl,
            originalHTML: htmlEl.innerHTML,
            computedHeight: height
          })
          
          // 添加一个透明的占位元素，保持高度
          htmlEl.innerHTML = `<div style="height: ${height}; width: 100%; opacity: 0; pointer-events: none;"></div>`
        }
      }
    })

    console.log(`处理了 ${emptyElements.length} 个空元素`)

    // 使用 SnapDOM 进行截图
    const result = await snapdom(targetElement, {
      // 使用元素的实际宽度
      width: 1440,
      // 保留外部 transform（包括 scale）
      outerTransforms: false,
      // 嵌入字体以保持字体样式
      embedFonts: true,
      // 快速模式关闭以获得更好质量
      fast: false,
      // 显示占位符
      placeholders: true,
      // 输出类型为 PNG
      type: 'png'
    })

    // 恢复空元素的原始内容
    emptyElements.forEach(({ element, originalHTML }) => {
      element.innerHTML = originalHTML
    })

    // 销毁水印
    watermarkInstance.destroy()

    console.log('截图完成')

    // 获取 Blob
    const blob = await result.toBlob({
      type: 'png'
    })

    // 返回结果对象
    return {
      blob,
      download: () => {
        const link = document.createElement('a')
        link.download = `screenshot-${Date.now()}.png`
        link.href = URL.createObjectURL(blob)
        link.click()
        URL.revokeObjectURL(link.href)
      },
      copyToClipboard: async () => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ])
          console.log('已复制到剪贴板')
        } catch (error) {
          console.error('复制到剪贴板失败:', error)
          throw new Error('复制到剪贴板失败，请检查浏览器权限')
        }
      }
    }

  } catch (error) {
    console.error('截图失败:', error)
    throw error
  }
}
