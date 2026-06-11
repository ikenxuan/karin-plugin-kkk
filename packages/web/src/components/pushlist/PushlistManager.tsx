/**
 * 推送列表管理组件。
 * 使用 Tabs 区分平台，具体平台表单拆分到独立文件。
 */

import { useState } from 'react'
import { Accordion, Button, Tabs } from '@heroui/react'
import { Plus } from 'lucide-react'
import BilibiliPushItemPanel from './BilibiliPushItemPanel'
import DouyinPushItemPanel from './DouyinPushItemPanel'
import type {
  BilibiliPushItem,
  DouyinPushItem,
  PushPlatform,
  PushlistManagerProps
} from './types'

export type { BilibiliPushItem, DouyinPushItem } from './types'

const createDouyinItem = (): DouyinPushItem => ({
  switch: true,
  sec_uid: '',
  short_id: '',
  group_id: [],
  remark: '',
  pushTypes: ['post'],
  filterMode: 'blacklist',
  Keywords: [],
  Tags: []
})

const createBilibiliItem = (): BilibiliPushItem => ({
  switch: true,
  host_mid: 0,
  group_id: [],
  remark: '',
  pushTypes: ['video'],
  filterMode: 'blacklist',
  Keywords: [],
  Tags: []
})

interface EmptyPushListProps {
  platform: PushPlatform
}

const EmptyPushList = ({ platform }: EmptyPushListProps) => (
  <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
    <p className="text-muted">
      暂无{platform === 'douyin' ? '抖音' : 'B站'}推送项，点击上方按钮添加
    </p>
  </div>
)

export default function PushlistManager ({
  douyinList,
  bilibiliList,
  onDouyinChange,
  onBilibiliChange,
  device
}: PushlistManagerProps) {
  const [activeTab, setActiveTab] = useState<PushPlatform>('douyin')

  return (
    <div className="space-y-4">
      <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as PushPlatform)}>
        <Tabs.ListContainer>
          <Tabs.List>
            <Tabs.Tab id="douyin">
              <span>抖音推送</span>
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="bilibili">
              <span>B站推送</span>
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel id="douyin">
          <div className="space-y-4 pt-4">
            <Button
              className="w-full"
              variant="primary"
              onPress={() => onDouyinChange([...douyinList, createDouyinItem()])}
            >
              <Plus className="size-4" />
              <span>添加抖音推送项</span>
            </Button>

            {douyinList.length > 0 ? (
              <Accordion variant="surface">
                {douyinList.map((item, index) => (
                  <DouyinPushItemPanel
                    key={index}
                    device={device}
                    index={index}
                    item={item}
                    list={douyinList}
                    onChange={onDouyinChange}
                  />
                ))}
              </Accordion>
            ) : (
              <EmptyPushList platform="douyin" />
            )}
          </div>
        </Tabs.Panel>

        <Tabs.Panel id="bilibili">
          <div className="space-y-4 pt-4">
            <Button
              className="w-full"
              variant="primary"
              onPress={() => onBilibiliChange([...bilibiliList, createBilibiliItem()])}
            >
              <Plus className="size-4" />
              <span>添加B站推送项</span>
            </Button>

            {bilibiliList.length > 0 ? (
              <Accordion variant="surface">
                {bilibiliList.map((item, index) => (
                  <BilibiliPushItemPanel
                    key={index}
                    device={device}
                    index={index}
                    item={item}
                    list={bilibiliList}
                    onChange={onBilibiliChange}
                  />
                ))}
              </Accordion>
            ) : (
              <EmptyPushList platform="bilibili" />
            )}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

