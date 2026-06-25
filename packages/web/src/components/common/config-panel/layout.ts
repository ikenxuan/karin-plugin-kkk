import { desktopConfigPanelClasses } from '../../../styles/desktopConfigPanel'
import { mobileConfigPanelClasses } from '../../../styles/mobileConfigPanel'
import type { DeviceLayout } from './types'

/**
 * 根据设备布局返回配置面板使用的样式类名集合。
 *
 * @param device 当前配置面板布局类型。
 */
export const getLayoutClasses = (device: DeviceLayout) => {
  return device === 'mobile' ? mobileConfigPanelClasses : desktopConfigPanelClasses
}
