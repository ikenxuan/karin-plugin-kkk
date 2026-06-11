import { Popover, Tooltip } from '@heroui/react'
import type { ReactNode } from 'react'

import type { PushlistDevice } from './types'

interface DisabledFieldHintProps {
  children: ReactNode
  disabled: boolean
  message: string
  device: PushlistDevice
}

const DisabledFieldHint = ({ children, disabled, message, device }: DisabledFieldHintProps) => {
  if (!disabled) return children

  if (device === 'mobile') {
    return (
      <Popover>
        <Popover.Trigger className="w-full cursor-not-allowed">{children}</Popover.Trigger>
        <Popover.Content placement="bottom">
          <Popover.Arrow />
          <div className="px-3 py-2">
            <p className="text-sm text-foreground">{message}</p>
          </div>
        </Popover.Content>
      </Popover>
    )
  }

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger className="w-full cursor-not-allowed">{children}</Tooltip.Trigger>
      <Tooltip.Content showArrow placement="top">
        <Tooltip.Arrow />
        {message}
      </Tooltip.Content>
    </Tooltip>
  )
}

export default DisabledFieldHint
