import { Card, CardBody, CardHeader, Kbd } from '@heroui/react'
import { Info } from 'lucide-react'
import React from 'react'

interface CanvasHintsProps {
  /** 是否深色模式 */
  isDarkMode?: boolean
}

/**
 * 画布操作提示组件
 */
export const CanvasHints: React.FC<CanvasHintsProps> = () => {
  return (
    <Card className='w-full bg-content2/60 backdrop-blur-md border border-divider shadow-sm' shadow='none'>
      <CardHeader className='pb-2 pt-2.5'>
        <div className='flex gap-2 items-center'>
          <Info className='w-4 h-4 text-foreground-600' />
          <h3 className='text-sm font-semibold text-foreground'>画布操作</h3>
        </div>
      </CardHeader>
      <CardBody className='pt-0 space-y-2 px-3 pb-3'>
        {/* 双击提示 */}
        <div className='flex gap-2'>
          <span className='text-foreground-400 shrink-0 text-xs leading-relaxed'>•</span>
          <div className='flex-1 text-xs text-foreground-600 leading-relaxed'>
            <span className='font-medium text-foreground'>双击画布</span>
            <span className='ml-1'>可将组件按屏幕比例显示全部并居中</span>
          </div>
        </div>
        
        {/* 文本选择提示 */}
        <div className='flex gap-2'>
          <span className='text-foreground-400 shrink-0 text-xs leading-relaxed'>•</span>
          <div className='flex-1 text-xs text-foreground-600 leading-relaxed'>
            <span className='font-medium text-foreground'>按住</span>
            <Kbd keys={['ctrl']} className='mx-1'>Ctrl</Kbd>
            <span>或</span>
            <Kbd keys={['alt']} className='mx-1'>Alt</Kbd>
            <span>可激活文本选择</span>
          </div>
        </div>
        
        {/* 滚轮缩放提示 */}
        <div className='flex gap-2'>
          <span className='text-foreground-400 shrink-0 text-xs leading-relaxed'>•</span>
          <div className='flex-1 text-xs text-foreground-600 leading-relaxed'>
            <span className='font-medium text-foreground'>滚轮</span>
            <span className='ml-1'>可缩放画布，拖拽可移动视图</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
