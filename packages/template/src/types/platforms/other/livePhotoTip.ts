import type { BaseComponentProps } from '../../index'

export interface LivePhotoTipProps extends BaseComponentProps {
  data: {
    /** 提示标题 */
    title?: string
    /** 附加说明 */
    description?: string
  } & {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
  }
}
