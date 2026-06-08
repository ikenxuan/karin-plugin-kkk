import type { ConfigFileKey } from '../types'
import type { ConfigPageProps } from './pageTypes'
import AppConfigPage from './AppConfigPage'
import BilibiliConfigPage from './BilibiliConfigPage'
import CookiesConfigPage from './CookiesConfigPage'
import DouyinConfigPage from './DouyinConfigPage'
import KuaishouConfigPage from './KuaishouConfigPage'
import PushlistConfigPage from './PushlistConfigPage'
import RequestConfigPage from './RequestConfigPage'
import UploadConfigPage from './UploadConfigPage'
import XiaohongshuConfigPage from './XiaohongshuConfigPage'

interface ActiveConfigPageProps extends ConfigPageProps {
  activeFile: ConfigFileKey
}

const ActiveConfigPage = (props: ActiveConfigPageProps) => {
  switch (props.activeFile) {
    case 'cookies':
      return <CookiesConfigPage {...props} />
    case 'app':
      return <AppConfigPage {...props} />
    case 'upload':
      return <UploadConfigPage {...props} />
    case 'request':
      return <RequestConfigPage {...props} />
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
