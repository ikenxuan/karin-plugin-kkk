import type { ConfigFileKey } from '../types'
import AmagiConfigPage from './AmagiConfigPage'
import AppConfigPage from './AppConfigPage'
import BilibiliConfigPage from './BilibiliConfigPage'
import DouyinConfigPage from './DouyinConfigPage'
import KuaishouConfigPage from './KuaishouConfigPage'
import type { ConfigPageProps } from './pageTypes'
import PushlistConfigPage from './PushlistConfigPage'
import XiaohongshuConfigPage from './XiaohongshuConfigPage'

interface ActiveConfigPageProps extends ConfigPageProps {
  activeFile: ConfigFileKey
}

const ActiveConfigPage = (props: ActiveConfigPageProps) => {
  switch (props.activeFile) {
    case 'amagi':
      return <AmagiConfigPage {...props} />
    case 'app':
      return <AppConfigPage {...props} />
    case 'douyin':
      return <DouyinConfigPage {...props} />
    case 'bilibili':
      return <BilibiliConfigPage {...props} />
    case 'kuaishou':
      return <KuaishouConfigPage {...props} />
    case 'xiaohongshu':
      return <XiaohongshuConfigPage {...props} />
    case 'pushlist':
      return <PushlistConfigPage {...props} />
  }
}

export default ActiveConfigPage
