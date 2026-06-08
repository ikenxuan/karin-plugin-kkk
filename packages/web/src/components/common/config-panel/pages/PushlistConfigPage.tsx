import type { ConfigPageProps } from './pageTypes'
import PushlistManager, { type BilibiliPushItem, type DouyinPushItem } from '../../../pushlist/PushlistManager'

const PushlistConfigPage = ({
  config,
  device,
  renderers,
  updateConfigValue
}: ConfigPageProps) => {
  const { renderPageHeader } = renderers

  return (
    <>
      {renderPageHeader('推送列表', '管理抖音与 B站的推送订阅。')}
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
