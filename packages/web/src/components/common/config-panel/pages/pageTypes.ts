import type { ConfigPanelLayoutClasses } from '../../../../styles/desktopConfigPanel'
import type { ConfigType } from '../../../../types/config'
import type { ConfigFieldRenderers, ConfigPath, DeviceLayout } from '../types'

export interface ConfigPageProps {
  config: ConfigType
  renderers: ConfigFieldRenderers
  classes: ConfigPanelLayoutClasses
  device: DeviceLayout
  updateConfigValue: (path: ConfigPath, value: unknown) => void
}
