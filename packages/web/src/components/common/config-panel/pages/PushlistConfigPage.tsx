import PushlistManager, { type BilibiliPushItem, type DouyinPushItem } from '../../../pushlist/PushlistManager'
import type { ConfigPageProps } from './pageTypes'

const PushlistConfigPage = ({ config, device, renderers, updateConfigValue }: ConfigPageProps) => {
  const { renderPageHeader } = renderers

  return (
    <>
      {renderPageHeader('推送列表', '管理「抖音」与「哔哩哔哩」的推送订阅。')}
      <PushlistManager
        douyinList={(config.pushlist?.douyin as DouyinPushItem[]) || []}
        bilibiliList={(config.pushlist?.bilibili as BilibiliPushItem[]) || []}
        onDouyinChange={(list) => {
          updateConfigValue(['pushlist', 'douyin'], list)
        }}
        onBilibiliChange={(list) => {
          updateConfigValue(['pushlist', 'bilibili'], list)
        }}
        device={device}
      />
    </>
  )
}

export default PushlistConfigPage
