import { Card, Kbd } from '@heroui/react'
import React from 'react'

import { Icon } from '../../components/common/Icon'

interface CanvasHintsProps {
  /** 是否深色模式 */
  isDarkMode?: boolean
}

/**
 * 画布操作提示组件
 */
export const CanvasHints: React.FC<CanvasHintsProps> = () => {
  return (
    <Card
      className='w-full rounded-xl border border-border shadow-none'
      variant='default'
    >
      <Card.Header className='px-3 pb-2 pt-3'>
        <div className='flex items-center gap-2.5'>
          <div className='flex size-7 items-center justify-center rounded-lg border border-border bg-background text-foreground'>
            <Icon icon="lucide:info" className='h-4 w-4' />
          </div>
          <div>
            <Card.Title className='text-sm font-semibold text-foreground'>画布操作</Card.Title>
            <Card.Description className='text-xs text-muted'>缩放、拖拽和文本选择的快捷提示</Card.Description>
          </div>
        </div>
      </Card.Header>

      <Card.Content className='space-y-2 px-3 pb-3'>
        <div className='flex gap-2'>
          <span className='shrink-0 text-xs leading-relaxed text-muted'>•</span>
          <div className='flex-1 text-xs leading-relaxed text-foreground/70'>
            <span className='font-medium text-foreground'>双击画布</span>
            <span className='ml-1'>可将组件按屏幕比例显示全部并居中</span>
          </div>
        </div>

        <div className='flex gap-2'>
          <span className='shrink-0 text-xs leading-relaxed text-muted'>•</span>
          <div className='flex-1 text-xs leading-relaxed text-foreground/70'>
            <span className='font-medium text-foreground'>按住</span>
            <Kbd className='mx-1 rounded-md'>
              <Kbd.Content>Ctrl</Kbd.Content>
            </Kbd>
            <span>或</span>
            <Kbd className='mx-1 rounded-md'>
              <Kbd.Content>Alt</Kbd.Content>
            </Kbd>
            <span>可激活文本选择</span>
          </div>
        </div>

        <div className='flex gap-2'>
          <span className='shrink-0 text-xs leading-relaxed text-muted'>•</span>
          <div className='flex-1 text-xs leading-relaxed text-foreground/70'>
            <span className='font-medium text-foreground'>滚轮</span>
            <span className='ml-1'>可缩放画布，拖拽可移动视图</span>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
