/// <reference lib="dom" />
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
  const { element } = options

  console.log('开始使用 SnapDOM 截图...')

  try {
    // 获取元素实际尺寸
    const rect = element.getBoundingClientRect()
    console.log(`元素尺寸: ${rect.width}x${rect.height}`)

    // 使用 SnapDOM 进行截图
    const result = await snapdom(element, {
      backgroundColor: '#ffffff',
      // 明确设置宽度为 1440px
      width: 1440,
      // 保留外部 transform（包括 scale）
      outerTransforms: false,
      // 嵌入字体以保持字体样式
      embedFonts: true,
      // 快速模式关闭以获得更好质量
      fast: false,
      // 显示占位符
      placeholders: true
    })

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
