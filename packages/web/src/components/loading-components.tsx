import { useEffect, useState } from 'react'

import { Progress } from '@/components/ui/progress'

/**
 * 页面加载组件
 * @description 显示页面加载状态的组件
 */
export const LoadingComponent = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    /**
     * 模拟进度条动画
     * @description 创建平滑的进度条动画效果
     */
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / 150) * 100, 100)
      setProgress(progress)
      if (progress >= 100) {
        clearInterval(timer)
      }
    }, 16)

    // 清理定时器
    return () => clearInterval(timer)
  }, [])

  return (
    <div className='flex justify-center items-center h-screen bg-background'>
      <div className='flex flex-col items-center p-8 space-y-6 w-full max-w-md'>
        {/* 加载图标 */}
        <img
          src='/loading.svg'
          alt='加载中'
          className='w-96 h-96'
        />

        {/* 加载文本 */}
        <div className='space-y-2 text-center'>
          <h3 className='text-4xl font-semibold text-foreground'>加载中</h3>
          <p className='text-sm text-muted-foreground'>正在加载页面内容...</p>
        </div>

        {/* 进度条 */}
        <div className='space-y-2 w-full'>
          <Progress value={progress} className='w-full h-2' />
          <div className='flex justify-between text-xs text-muted-foreground'>
            <span>加载中...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* 加载指示器 */}
        <div className='flex space-x-2'>
          <div className='w-2 h-2 rounded-full animate-bounce bg-primary' style={{ animationDelay: '0ms' }} />
          <div className='w-2 h-2 rounded-full animate-bounce bg-primary' style={{ animationDelay: '150ms' }} />
          <div className='w-2 h-2 rounded-full animate-bounce bg-primary' style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
