import type { ConfigPanelLayoutClasses } from '../../../../styles/desktopConfigPanel'
import type { ConfigType } from '../../../../types/config'
import type { ConfigFieldRenderers, ConfigPath, DeviceLayout } from '../types'

/** 单个配置分组页面接收的共享属性。 */
export interface ConfigPageProps {
  /** 当前编辑中的完整配置对象。 */
  config: ConfigType
  /** 页面字段渲染器集合，用于保持各平台配置页的控件样式和行为一致。 */
  renderers: ConfigFieldRenderers
  /** 当前设备布局对应的样式类名集合。 */
  classes: ConfigPanelLayoutClasses
  /** 当前配置面板布局类型。 */
  device: DeviceLayout
  /**
   * 更新指定路径上的配置值。
   *
   * @param path 配置字段路径。
   * @param value 要写入该字段的新值。
   */
  updateConfigValue: (path: ConfigPath, value: unknown) => void
}
