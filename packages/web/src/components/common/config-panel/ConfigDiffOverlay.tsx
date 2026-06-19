import { Button, Description, Drawer, Modal, Switch } from '@heroui/react'
import { GitCompare } from 'lucide-react'
import { useState } from 'react'

import type { ConfigType } from '../../../types/config'
import { ConfigDiffView } from './ConfigDiffView'
import type { DeviceLayout } from './types'

interface ConfigDiffOverlayProps {
  device: DeviceLayout
  original: ConfigType | null
  current: ConfigType | null
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const TITLE = '变更预览'
const DESC = '绿色 = 新增/改后的内容，红色 = 删除/改前的内容，灰色 = 没变化的内容。'

export const ConfigDiffOverlay = ({ device, original, current, isOpen, onOpenChange }: ConfigDiffOverlayProps) => {
  const [showUnchanged, setShowUnchanged] = useState(false)

  const body = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Description className="text-xs text-muted">{DESC}</Description>
        <Switch size="sm" isSelected={showUnchanged} onChange={setShowUnchanged} aria-label="显示未变更字段">
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            显示未变更
          </Switch.Content>
        </Switch>
      </div>
      <ConfigDiffView original={original} current={current} showUnchanged={showUnchanged} />
    </div>
  )

  const footer = (
    <Button slot="close" size="sm" variant="secondary">
      关闭
    </Button>
  )

  if (device === 'mobile') {
    return (
      <Drawer>
        <Drawer.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
          <Drawer.Content placement="bottom">
            <Drawer.Dialog className="h-[85vh]">
              <Drawer.Handle />
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>{TITLE}</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{body}</Drawer.Body>
              <Drawer.Footer>{footer}</Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    )
  }

  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
        <Modal.Container scroll="inside" size="lg">
          <Modal.Dialog className="w-full max-w-4xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <GitCompare className="size-5" />
              </Modal.Icon>
              <Modal.Heading>{TITLE}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>{footer}</Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
