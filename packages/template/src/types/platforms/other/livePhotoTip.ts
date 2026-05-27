import type { BaseComponentProps } from '../../index'

export interface LivePhotoTipProps extends BaseComponentProps<{
  /** 提示标题 */
  title?: string
  /** 附加说明 */
  description?: string
}> {}
