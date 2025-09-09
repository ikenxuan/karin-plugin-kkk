import axios from 'axios'

import type { SlideItem } from '@/parsers/types'

import { downloadWithNative, sanitizeName } from './video'

/**
 * 合辑打包下载
 * @param slides - 合辑内容数组
 * @param title - 作品标题
 */
export const downloadSlidesAsZip = async (slides: SlideItem[], title: string) => {
  try {
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()
    const cleanTitle = sanitizeName(title || '合辑')
    const collectionFolder = zip.folder(cleanTitle)

    // 简化的进度显示
    let successCount = 0
    const failedItems: Array<{ index: number, url: string, type: string, error: string }> = []

    /**
     * 下载单个合辑项目的函数（带重试机制）
     * @param slide - 合辑项目
     * @param actualIndex - 项目索引
     * @param retryCount - 重试次数
     */
    const downloadSingleSlide = async (slide: SlideItem, actualIndex: number, retryCount = 0): Promise<{ success: boolean, index: number, error?: any }> => {
      const maxRetries = 3
      const downloadUrl = slide.url

      try {
        // 尝试多种请求策略
        const strategies = [
          // 策略1：模拟浏览器请求
          {
            method: 'GET',
            headers: {
              Accept: slide.type === 'video' ? 'video/*,*/*;q=0.8' : 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
              'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
              'Sec-Fetch-Dest': slide.type === 'video' ? 'video' : 'image',
              'Sec-Fetch-Mode': 'no-cors',
              'Sec-Fetch-Site': 'cross-site',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            responseType: 'blob' as const
          },
          // 策略2：简化请求
          {
            method: 'GET',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            responseType: 'blob' as const
          }
        ]

        let lastError: any = null

        for (const strategy of strategies) {
          try {
            const response = await axios(downloadUrl, strategy)

            const blob = response.data
            if (blob.size === 0) {
              throw new Error('下载的文件大小为0')
            }

            // 根据类型确定文件扩展名
            let extension = slide.type === 'video' ? '.mp4' : '.jpg'
            if (slide.type === 'image') {
              const blobType = blob.type.toLowerCase()
              if (blobType.includes('png')) extension = '.png'
              else if (blobType.includes('gif')) extension = '.gif'
              else if (blobType.includes('webp')) extension = '.webp'
              else if (blobType.includes('heic') || blobType.includes('heif')) extension = '.heic'
              else if (blobType.includes('jpeg') || blobType.includes('jpg')) extension = '.jpg'
            }

            const fileName = `${String(actualIndex + 1).padStart(3, '0')}_${slide.type}${extension}`
            collectionFolder?.file(fileName, blob)

            successCount++

            return { success: true, index: actualIndex }
          } catch (strategyError) {
            lastError = strategyError
            continue
          }
        }

        throw lastError || new Error('所有下载策略都失败了')
      } catch (error: any) {
        console.error(`❌ 下载合辑项目 ${actualIndex + 1} 失败:`, error)

        if (retryCount < maxRetries) {
          console.log(`🔄 重试下载合辑项目 ${actualIndex + 1} (${retryCount + 1}/${maxRetries})`)
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)))
          return downloadSingleSlide(slide, actualIndex, retryCount + 1)
        }

        failedItems.push({
          index: actualIndex,
          url: downloadUrl,
          type: slide.type,
          error: error.message || '未知错误'
        })

        return { success: false, index: actualIndex, error }
      }
    }

    // 并发下载合辑项目（限制并发数避免内存爆炸和请求过多）
    const CONCURRENT_LIMIT = 2 // 降低并发数，避免触发防护机制
    const downloadPromises: Promise<any>[] = []

    for (let i = 0; i < slides.length; i += CONCURRENT_LIMIT) {
      const batch = slides.slice(i, i + CONCURRENT_LIMIT)

      const batchPromise = Promise.all(
        batch.map(async (slide, batchIndex) => {
          const actualIndex = i + batchIndex
          // 添加随机延迟，避免请求过于密集
          await new Promise(resolve => setTimeout(resolve, Math.random() * 500))
          return downloadSingleSlide(slide, actualIndex)
        })
      )

      downloadPromises.push(batchPromise)
    }

    // 等待所有批次完成
    await Promise.all(downloadPromises)

    if (failedItems.length > 0) {
      console.warn(`⚠️ ${failedItems.length} 个项目下载失败，将继续打包成功的项目`)
    }

    // 生成ZIP文件
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    })
    const zipFileName = `${cleanTitle}_${successCount}项合辑.zip`

    // 使用原生下载方式下载ZIP
    const zipUrl = URL.createObjectURL(zipBlob)
    downloadWithNative(zipUrl, zipFileName)

    // 延迟清理URL
    setTimeout(() => {
      URL.revokeObjectURL(zipUrl)
    }, 1000)

    console.log(`✅ 合辑打包完成！成功: ${successCount}/${slides.length}`)
    if (failedItems.length > 0) {
      console.log('❌ 失败的项目:', failedItems)
    }
  } catch (error: any) {
    console.error('❌ 合辑打包下载失败:', error)
    alert(`合辑打包下载失败: ${error.message}`)
  }
}

/**
 * 图片打包下载
 * @param images - 图片URL数组
 * @param title - 作品标题
 */
export const downloadImagesAsZip = async (images: string[], title: string) => {
  try {
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()
    const cleanTitle = sanitizeName(title || '图片集')
    const imageFolder = zip.folder(cleanTitle)

    // 简化的进度显示
    let successCount = 0
    const failedImages: Array<{ index: number, url: string, error: string }> = []

    /**
     * 下载单张图片的函数（带重试机制）
     * @param imageUrl - 图片URL
     * @param actualIndex - 图片索引
     * @param retryCount - 重试次数
     */
    const downloadSingleImage = async (imageUrl: string, actualIndex: number, retryCount = 0): Promise<{ success: boolean, index: number, error?: any }> => {
      const maxRetries = 3

      try {
        // 尝试多种请求策略
        const strategies = [
          // 策略1：模拟浏览器请求
          {
            method: 'GET',
            headers: {
              Accept: 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
              'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
              'Sec-Fetch-Dest': 'image',
              'Sec-Fetch-Mode': 'no-cors',
              'Sec-Fetch-Site': 'cross-site',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            responseType: 'blob' as const
          },
          // 策略2：无Referer请求
          {
            method: 'GET',
            headers: {
              Accept: 'image/*,*/*',
              'User-Agent': navigator.userAgent
            },
            responseType: 'blob' as const
          },
          // 策略3：最简请求
          {
            method: 'GET',
            responseType: 'blob' as const
          }
        ]

        let lastError: any

        // 尝试不同的请求策略
        for (let strategyIndex = 0; strategyIndex < strategies.length; strategyIndex++) {
          try {
            const response = await axios(imageUrl, strategies[strategyIndex])

            // 检查响应是否为图片
            const contentType = response.headers['content-type'] || ''
            if (!contentType.startsWith('image/') && response.headers['content-length'] !== '0') {
              // 如果不是图片类型，尝试下一个策略
              if (strategyIndex < strategies.length - 1) {
                continue
              }
            }

            // 直接获取blob数据
            const blob = response.data

            // 验证blob是否有效
            if (blob.size === 0) {
              throw new Error('图片文件为空')
            }

            // 确定文件扩展名
            let extension = '.jpg'
            const blobType = blob.type || contentType
            if (blobType) {
              if (blobType.includes('png')) extension = '.png'
              else if (blobType.includes('gif')) extension = '.gif'
              else if (blobType.includes('webp')) extension = '.webp'
              else if (blobType.includes('heic') || blobType.includes('heif')) extension = '.heic'
              else if (blobType.includes('jpeg') || blobType.includes('jpg')) extension = '.jpg'
            }

            const fileName = `${String(actualIndex + 1).padStart(3, '0')}${extension}`
            imageFolder?.file(fileName, blob)

            successCount++

            return { success: true, index: actualIndex }
          } catch (strategyError) {
            lastError = strategyError
            console.warn(`策略${strategyIndex + 1}失败:`, strategyError)
            continue
          }
        }

        throw lastError || new Error('所有请求策略都失败')
      } catch (error) {
        // 重试机制
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))) // 递增延迟
          return downloadSingleImage(imageUrl, actualIndex, retryCount + 1)
        }

        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error(`❌ 图片 ${actualIndex + 1} 最终失败:`, errorMessage)
        failedImages.push({ index: actualIndex, url: imageUrl, error: errorMessage })
        return { success: false, index: actualIndex, error }
      }
    }

    // 并发下载图片（限制并发数避免内存爆炸和请求过多）
    const CONCURRENT_LIMIT = 2 // 降低并发数，避免触发防护机制
    const downloadPromises: Promise<any>[] = []

    for (let i = 0; i < images.length; i += CONCURRENT_LIMIT) {
      const batch = images.slice(i, i + CONCURRENT_LIMIT)

      const batchPromise = Promise.all(
        batch.map(async (imageUrl, batchIndex) => {
          const actualIndex = i + batchIndex
          // 添加随机延迟，避免请求过于密集
          await new Promise(resolve => setTimeout(resolve, Math.random() * 500))
          return downloadSingleImage(imageUrl, actualIndex)
        })
      )

      downloadPromises.push(batchPromise)

      // 批次间添加延迟
      if (i + CONCURRENT_LIMIT < images.length) {
        await new Promise(resolve => setTimeout(resolve, 200))
      }
    }

    // 等待所有批次完成
    const allResults = await Promise.all(downloadPromises)
    allResults.flat()

    if (successCount === 0) {
      // 提供详细的错误信息
      const errorDetails = failedImages.slice(0, 3).map(img =>
        `图片${img.index + 1}: ${img.error}`
      ).join('\n')

      throw new Error(`所有图片下载失败，可能原因：\n1. 网络连接问题\n2. 图片服务器防盗链机制\n3. 图片链接已失效\n\n详细错误:\n${errorDetails}${failedImages.length > 3 ? '\n...' : ''}`)
    }

    if (failedImages.length > 0) {
      console.warn(`⚠️ ${failedImages.length} 张图片下载失败，将继续打包成功的图片`)
    }

    // 生成ZIP文件
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    })
    const zipFileName = `${cleanTitle}_${successCount}张图片.zip`

    // 使用原生下载方式下载ZIP
    const zipUrl = URL.createObjectURL(zipBlob)
    downloadWithNative(zipUrl, zipFileName)

    // 延迟清理URL
    setTimeout(() => {
      URL.revokeObjectURL(zipUrl)
    }, 2000)
  } catch (error) {
    console.error('❌ 打包下载失败:', error)
    alert(`❌ 打包下载失败:\n${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * 视频打包下载
 * @param videos - 视频URL数组
 * @param title - 作品标题
 */
export const downloadVideosAsZip = async (videos: string[], title: string) => {
  try {
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()
    const cleanTitle = sanitizeName(title || '视频集')
    const videoFolder = zip.folder(cleanTitle)

    // 简化的进度显示
    let successCount = 0
    const failedVideos: Array<{ index: number, url: string, error: string }> = []

    /**
     * 下载单个视频的函数（带重试机制）
     * @param videoUrl - 视频URL
     * @param actualIndex - 视频索引
     * @param retryCount - 重试次数
     */
    const downloadSingleVideo = async (videoUrl: string, actualIndex: number, retryCount = 0): Promise<{ success: boolean, index: number, error?: any }> => {
      const maxRetries = 3

      try {
        // 尝试多种请求策略
        const strategies = [
          // 策略1：模拟浏览器请求
          {
            method: 'GET',
            headers: {
              Accept: 'video/*,*/*;q=0.8',
              'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
              'Sec-Fetch-Dest': 'video',
              'Sec-Fetch-Mode': 'no-cors',
              'Sec-Fetch-Site': 'cross-site',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            responseType: 'blob' as const
          },
          // 策略2：无Referer请求
          {
            method: 'GET',
            headers: {
              Accept: 'video/*,*/*',
              'User-Agent': navigator.userAgent
            },
            responseType: 'blob' as const
          },
          // 策略3：最简请求
          {
            method: 'GET',
            responseType: 'blob' as const
          }
        ]

        let lastError: any

        // 尝试不同的请求策略
        for (let strategyIndex = 0; strategyIndex < strategies.length; strategyIndex++) {
          try {
            const response = await axios(videoUrl, strategies[strategyIndex])

            // 检查响应是否为视频
            const contentType = response.headers['content-type'] || ''
            if (!contentType.startsWith('video/') && response.headers['content-length'] !== '0') {
              // 如果不是视频类型，尝试下一个策略
              if (strategyIndex < strategies.length - 1) {
                continue
              }
            }

            // 直接获取blob数据
            const blob = response.data

            // 验证blob是否有效
            if (blob.size === 0) {
              throw new Error('视频文件为空')
            }

            // 确定文件扩展名
            let extension = '.mp4'
            const blobType = blob.type || contentType
            if (blobType) {
              if (blobType.includes('mp4')) extension = '.mp4'
              else if (blobType.includes('webm')) extension = '.webm'
              else if (blobType.includes('avi')) extension = '.avi'
              else if (blobType.includes('mov')) extension = '.mov'
              else if (blobType.includes('mkv')) extension = '.mkv'
            }

            const fileName = `${String(actualIndex + 1).padStart(3, '0')}_video${extension}`
            videoFolder?.file(fileName, blob)

            successCount++

            return { success: true, index: actualIndex }
          } catch (strategyError) {
            lastError = strategyError
            console.warn(`策略${strategyIndex + 1}失败:`, strategyError)
            continue
          }
        }

        throw lastError || new Error('所有请求策略都失败')
      } catch (error) {
        // 重试机制
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))) // 递增延迟
          return downloadSingleVideo(videoUrl, actualIndex, retryCount + 1)
        }

        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error(`❌ 视频 ${actualIndex + 1} 最终失败:`, errorMessage)
        failedVideos.push({ index: actualIndex, url: videoUrl, error: errorMessage })
        return { success: false, index: actualIndex, error }
      }
    }

    // 并发下载视频（限制并发数避免内存爆炸和请求过多）
    const CONCURRENT_LIMIT = 2 // 降低并发数，避免触发防护机制
    const downloadPromises: Promise<any>[] = []

    for (let i = 0; i < videos.length; i += CONCURRENT_LIMIT) {
      const batch = videos.slice(i, i + CONCURRENT_LIMIT)

      const batchPromise = Promise.all(
        batch.map(async (videoUrl, batchIndex) => {
          const actualIndex = i + batchIndex
          // 添加随机延迟，避免请求过于密集
          await new Promise(resolve => setTimeout(resolve, Math.random() * 500))
          return downloadSingleVideo(videoUrl, actualIndex)
        })
      )

      downloadPromises.push(batchPromise)

      // 批次间添加延迟
      if (i + CONCURRENT_LIMIT < videos.length) {
        await new Promise(resolve => setTimeout(resolve, 200))
      }
    }

    // 等待所有批次完成
    const allResults = await Promise.all(downloadPromises)
    allResults.flat()

    if (successCount === 0) {
      // 提供详细的错误信息
      const errorDetails = failedVideos.slice(0, 3).map(video =>
        `视频${video.index + 1}: ${video.error}`
      ).join('\n')

      throw new Error(`所有视频下载失败，可能原因：\n1. 网络连接问题\n2. 视频服务器防盗链机制\n3. 视频链接已失效\n\n详细错误:\n${errorDetails}${failedVideos.length > 3 ? '\n...' : ''}`)
    }

    if (failedVideos.length > 0) {
      console.warn(`⚠️ ${failedVideos.length} 个视频下载失败，将继续打包成功的视频`)
    }

    // 生成ZIP文件
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    })
    const zipFileName = `${cleanTitle}_${successCount}个视频.zip`

    // 使用原生下载方式下载ZIP
    const zipUrl = URL.createObjectURL(zipBlob)
    downloadWithNative(zipUrl, zipFileName)

    // 延迟清理URL
    setTimeout(() => {
      URL.revokeObjectURL(zipUrl)
    }, 2000)
  } catch (error) {
    console.error('❌ 视频打包下载失败:', error)
    alert(`❌ 视频打包下载失败:\n${error instanceof Error ? error.message : String(error)}`)
  }
}
