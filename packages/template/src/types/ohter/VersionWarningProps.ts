import type { BaseComponentProps } from '..'

export interface VersionWarningProps extends BaseComponentProps {
  data: {
    /** 插件构建时的 karin 版本 */
    requireVersion: string
    /** 当前运行的 karin 版本 */
    currentVersion: string
  }
}