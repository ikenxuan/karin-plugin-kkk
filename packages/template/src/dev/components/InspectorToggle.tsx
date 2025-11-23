import { Button, Kbd, Tooltip } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'

interface InspectorToggleProps {
  /** 当前激活状态（受控） */
  active?: boolean
  /** 状态变化回调 */
  onToggle: (active: boolean) => void
}

/**
 * Inspector 切换按钮组件
 */
export const InspectorToggle: React.FC<InspectorToggleProps> = ({ active, onToggle }) => {
  const [isActive, setIsActive] = useState(false)

  // 同步外部状态
  useEffect(() => {
    if (active !== undefined) {
      setIsActive(active)
    }
  }, [active])

  const handleToggle = () => {
    const newState = !isActive
    setIsActive(newState)
    onToggle(newState)
  }

  // 检测操作系统
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent)

  return (
    <Tooltip
      delay={0}
      closeDelay={0}
      content={
        <div className='px-1 py-2'>
          <div className='text-small font-bold mb-1'>检查元素</div>
          <div className='flex gap-1 items-center'>
            <span className='text-tiny'>快捷键:</span>
            {isMac ? (
              <>
                <Kbd keys={['ctrl']}>Ctrl</Kbd>
                <span className='text-tiny'>+</span>
                <Kbd keys={['shift']}>Shift</Kbd>
                <span className='text-tiny'>+</span>
                <Kbd keys={['command']}>Cmd</Kbd>
                <span className='text-tiny'>+</span>
                <Kbd>C</Kbd>
              </>
            ) : (
              <>
                <Kbd keys={['ctrl']}>Ctrl</Kbd>
                <span className='text-tiny'>+</span>
                <Kbd keys={['shift']}>Shift</Kbd>
                <span className='text-tiny'>+</span>
                <Kbd keys={['alt']}>Alt</Kbd>
                <span className='text-tiny'>+</span>
                <Kbd>C</Kbd>
              </>
            )}
          </div>
        </div>
      }
    >
      <Button
        size='sm'
        variant='flat'
        color={isActive ? 'default' : 'success'}
        startContent={<MdOutlineSearch className='w-4 h-4' />}
        onPress={handleToggle}
      >
        {isActive ? '请点击喵' : '检查元素'}
      </Button>
    </Tooltip>
  )
}
