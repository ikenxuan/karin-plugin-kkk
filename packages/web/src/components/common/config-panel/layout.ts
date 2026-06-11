import { desktopConfigPanelClasses } from '../../../styles/desktopConfigPanel'
import { mobileConfigPanelClasses } from '../../../styles/mobileConfigPanel'
import type { DeviceLayout } from './types'

export const getLayoutClasses = (device: DeviceLayout) => {
  return device === 'mobile' ? mobileConfigPanelClasses : desktopConfigPanelClasses
}
