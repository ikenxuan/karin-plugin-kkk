import React from 'react'

/**
 * GlowImage 组件的属性
 * 用于控制根据图片自身颜色生成辉光的效果与强度。
 */
type GlowImageProps = {
  /** 图片源地址（支持本地路径或外链 URL） */
  src: string
  /** 图片的替代文本（无障碍与加载失败时显示） */
  alt?: string
  /** 外层容器的类名（用于布局/定位） */
  className?: string
  /** 图片元素本体的类名（用于控制宽高等样式） */
  imgClassName?: string
  /**
   * 辉光生成模式：
   * - 'blur-layer'：在图片下方叠加模糊副本形成柔和辉光（无 CORS 限制，默认）
   * - 'dominant-shadow'：提取图片主色并使用 drop-shadow 着色（更干净边缘，外链需 CORS）
   */
  mode?: 'blur-layer' | 'dominant-shadow'
  /** 模糊辉光半径（像素），仅在 'blur-layer' 模式下生效 */
  blurRadius?: number
  /** 辉光强度（0–1），控制模糊层的不透明度或阴影颜色的透明度 */
  glowStrength?: number
  /** 辉光层相对原图的缩放比例（避免边缘被裁切），仅 'blur-layer' 模式使用 */
  scale?: number
  /** 阴影半径（像素），仅在 'dominant-shadow' 模式下生效 */
  shadowRadius?: number
  /**
   * 跨域设置，用于主色采样（canvas）：
   * - 'anonymous'：匿名模式（常用）
   * - 'use-credentials'：携带凭证
   * 外链图片需目标服务器允许 CORS，否则 canvas 会被污染。
   */
  crossOrigin?: 'anonymous' | 'use-credentials'
}

export const GlowImage: React.FC<GlowImageProps> = ({
  src,
  alt,
  className,
  imgClassName,
  mode = 'blur-layer',
  blurRadius = 18,
  glowStrength = 0.6,
  scale = 1.06,
  shadowRadius = 28,
  crossOrigin
}) => {
  const [shadowColor, setShadowColor] = React.useState<string>('rgba(255,255,255,0.5)')

  React.useEffect(() => {
    if (mode !== 'dominant-shadow') return
    const img = new Image()
    if (crossOrigin) img.crossOrigin = crossOrigin
    img.src = src
    img.onload = () => {
      try {
        const size = 16
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.drawImage(img, 0, 0, size, size)
        const data = ctx.getImageData(0, 0, size, size).data
        let r = 0, g = 0, b = 0, count = 0
        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3]
          if (a < 10) continue
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          count++
        }
        if (count > 0) {
          r = Math.round(r / count)
          g = Math.round(g / count)
          b = Math.round(b / count)
          setShadowColor(`rgba(${r}, ${g}, ${b}, ${Math.min(glowStrength, 0.85)})`)
        }
      } catch {
        // ignore errors (e.g. tainted canvas), keep default color
      }
    }
  }, [mode, src, glowStrength, crossOrigin])

  if (mode === 'dominant-shadow') {
    return (
      <img
        src={src}
        alt={alt}
        className={imgClassName}
        style={{
          filter: `drop-shadow(0 0 ${shadowRadius}px ${shadowColor}) drop-shadow(0 0 ${Math.round(
            shadowRadius * 0.6
          )}px ${shadowColor})`
        }}
      />
    )
  }

  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={src}
        alt={alt}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${scale})`,
          filter: `blur(${blurRadius}px) saturate(1.2)`,
          opacity: glowStrength,
          pointerEvents: 'none'
        }}
      />
      <img src={src} alt={alt} className={imgClassName} />
    </div>
  )
}