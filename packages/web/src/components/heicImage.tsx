import axios from 'axios'
import convert from 'heic-convert/browser'
import React, { useEffect, useState } from 'react'

interface HeicImageProps {
  src: string
  alt: string
  className?: string
  referrerPolicy?: React.ImgHTMLAttributes<HTMLImageElement>['referrerPolicy']
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin']
  onClick?: () => void
  onProcessed?: (processedSrc: string) => void
}

/**
 * HEIC图片处理组件
 * 使用heic-convert库通过文件头部字节检测并转换HEIC格式图片为PNG格式
 * @param src - 图片源地址
 * @param alt - 图片替代文本
 * @param className - CSS类名
 * @param referrerPolicy - 引用策略
 * @param crossOrigin - 跨域设置
 * @param onClick - 点击事件处理函数
 * @param onProcessed - 图片处理完成后的回调函数，返回处理后的图片URL
 */
const HeicImage: React.FC<HeicImageProps> = ({
  src,
  alt,
  className,
  referrerPolicy,
  crossOrigin,
  onClick,
  onProcessed
}) => {
  const [processedSrc, setProcessedSrc] = useState<string>(src)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    /**
     * 通过文件头部字节检测HEIC格式
     * HEIC文件的魔术字节特征：
     * - 偏移4-11字节: "ftypheic" 或 "ftypheix" 或 "ftyphevc" 或 "ftyphevx"
     * - 偏移4-11字节: "ftypmif1" (HEIF)
     * @param buffer - 文件的ArrayBuffer数据
     * @returns 是否为HEIC/HEIF格式
     */
    const isHeicFormat = (buffer: ArrayBuffer): boolean => {
      try {
        // 至少需要12个字节来检查文件头
        if (buffer.byteLength < 12) {
          console.log('文件太小，无法检测格式')
          return false
        }

        const uint8Array = new Uint8Array(buffer)

        // 将字节转换为字符串进行比较
        const getStringFromBytes = (start: number, length: number): string => {
          return Array.from(uint8Array.slice(start, start + length))
            .map(byte => String.fromCharCode(byte))
            .join('')
        }

        // 检查偏移4-11字节的文件类型标识
        const fileType = getStringFromBytes(4, 8)

        // HEIC/HEIF的各种可能的文件类型标识
        const heicSignatures = [
          'ftypheic', // HEIC
          'ftypheix', // HEIC sequence
          'ftyphevc', // HEIC with video codec
          'ftyphevx', // HEIC sequence with video codec
          'ftypmif1', // HEIF
          'ftypmsf1', // HEIF sequence
          'ftypavif' // AVIF (也是基于HEIF的格式)
        ]

        // 修复检测逻辑：直接比较完整的文件类型标识
        const isHeic = heicSignatures.some(signature => fileType === signature)

        return isHeic
      } catch (error) {
        console.error('检测HEIC格式时出错:', error)
        return false
      }
    }

    /**
     * 处理图片格式转换
     * 通过读取文件头部检测是否为HEIC格式，如果是则转换为PNG
     */
    const processImage = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // 使用axios获取图片数据
        const response = await axios.get(src, {
          responseType: 'arraybuffer'
        })

        const arrayBuffer = response.data

        // 通过文件头部字节检测是否为HEIC格式
        if (isHeicFormat(arrayBuffer)) {
          try {
            // 将ArrayBuffer转换为Uint8Array
            const inputBuffer = new Uint8Array(arrayBuffer)

            // 使用heic-convert转换为PNG
            const outputBuffer = await convert({
              buffer: inputBuffer.buffer,
              format: 'PNG',
              quality: 0.9
            })

            // 创建新的Blob和URL
            const convertedBlob = new Blob([outputBuffer], { type: 'image/png' })
            const convertedUrl = URL.createObjectURL(convertedBlob)
            setProcessedSrc(convertedUrl)

            // 通知父组件转换完成
            onProcessed?.(convertedUrl)
          } catch (convertError) {
            console.error('HEIC转换失败:', convertError)
            // 转换失败时，尝试直接显示原图
            setProcessedSrc(src)
            onProcessed?.(src)
            setError('HEIC转换失败，显示原图')
          }
        } else {
          // 非HEIC格式，直接使用原始URL
          setProcessedSrc(src)
          onProcessed?.(src)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '图片处理失败'
        setError(errorMessage)
        // 发生错误时仍尝试显示原始图片
        setProcessedSrc(src)
        onProcessed?.(src)
      } finally {
        setIsLoading(false)
      }
    }

    // 只有当src变化时才重新处理
    if (src) {
      processImage()
    }

    // 清理函数：释放创建的URL对象
    return () => {
      if (processedSrc !== src && processedSrc.startsWith('blob:')) {
        URL.revokeObjectURL(processedSrc)
      }
    }
  }, [src, referrerPolicy, onProcessed, processedSrc])

  if (error && !processedSrc) {
    return (
      <div className={`flex justify-center items-center text-sm text-gray-500 bg-gray-100 ${className}`}>
        图片加载失败
      </div>
    )
  }

  return (
    <div className='relative'>
      {isLoading && (
        <div className='flex absolute inset-0 z-10 justify-center items-center bg-gray-100 bg-opacity-75'>
          <div className='text-xs text-gray-600'>转换中...</div>
        </div>
      )}
      {error && (
        <div className='absolute top-0 left-0 z-20 px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded'>
          {error}
        </div>
      )}
      <img
        src={processedSrc}
        alt={alt}
        className={className}
        referrerPolicy={referrerPolicy}
        crossOrigin={crossOrigin}
        onClick={onClick}
        onError={(e) => {
          console.error('图片显示失败:', e)
        }}
      />
    </div>
  )
}

export default HeicImage
