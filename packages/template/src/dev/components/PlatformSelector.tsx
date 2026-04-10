import { Card, Description, Label, ListBox, ScrollShadow, Tabs } from '@heroui/react'
import { Settings } from 'lucide-react'
import React from 'react'

import { componentConfigs } from '../../config/config'
import { PlatformType } from '../../types/platforms'

interface PlatformSelectorProps {
  /** 当前选中的平台 */
  selectedPlatform: PlatformType
  /** 当前选中的组件ID */
  selectedTemplate: string
  /** 平台变更回调 */
  onPlatformChange: (platform: PlatformType) => void
  /** 组件变更回调 */
  onTemplateChange: (componentId: string) => void
}

/**
 * 平台选择组件
 */
export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  selectedTemplate,
  onPlatformChange,
  onTemplateChange
}) => {
  return (
    <Card
      className='w-full rounded-2xl border border-border shadow-none'
      variant='default'
    >
      <Card.Header className='flex-col items-start gap-3 px-4 pb-3 pt-4'>
        <div className='flex items-start gap-3'>
          <div className='flex size-7 items-center justify-center rounded-lg border border-border bg-background text-foreground'>
            <Settings className='h-4 w-4' />
          </div>
          <div>
            <Card.Description className='text-[10px] font-semibold tracking-[0.18em] uppercase text-muted'>
              组件开发面板
            </Card.Description>
            <Card.Title className='mt-1 text-base font-semibold text-foreground'>
              {selectedPlatform}
            </Card.Title>
            <Card.Description className='mt-1 text-sm text-muted break-all'>
              {selectedTemplate}
            </Card.Description>
          </div>
        </div>
      </Card.Header>

      <Card.Content className='space-y-4 px-4 pb-4'>
        <Tabs
          selectedKey={selectedPlatform}
          variant='secondary'
          onSelectionChange={(key) => onPlatformChange(key as PlatformType)}
        >
          <Tabs.ListContainer>
            <Tabs.List
              aria-label='平台选择'
              className='w-full *:flex-1 *:justify-center *:px-3 *:py-2 *:text-xs *:font-medium'
            >
              {componentConfigs.map(config => (
                <Tabs.Tab key={config.type} id={config.type}>
                  {config.name}
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>

          {componentConfigs.map(config => (
            <Tabs.Panel key={config.type} className='pt-3' id={config.type}>
              <label className='mb-2 block px-0.5 text-[10px] font-semibold tracking-[0.18em] text-muted uppercase'>
                组件
              </label>

              <ScrollShadow className='max-h-[calc(100vh-26rem)] pe-1' hideScrollBar size={48}>
                <ListBox
                  aria-label={`${config.name}组件列表`}
                  selectedKeys={new Set([selectedTemplate])}
                  selectionMode='single'
                  onSelectionChange={(keys) => {
                    const key = Array.from(keys as Set<React.Key>)[0]
                    if (typeof key === 'string') {
                      onTemplateChange(key)
                    }
                  }}
                >
                  {config.components
                    .filter(component => component.enabled)
                    .map(component => (
                      <ListBox.Item
                        key={component.id}
                        className='rounded-xl px-3 py-2.5'
                        id={component.id}
                        textValue={component.name}
                      >
                        <div className='flex min-w-0 flex-1 flex-col'>
                          <Label className='truncate text-sm font-medium text-foreground'>
                            {component.name}
                          </Label>
                          <Description className='truncate text-xs text-muted'>
                            {component.id}
                          </Description>
                        </div>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                </ListBox>
              </ScrollShadow>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Card.Content>
    </Card>
  )
}
