import type { BaseComponentProps } from '..'

/**
 * 更新日志组件属性接口
 */
export interface ChangelogProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否包含更新提示 */
    Tip?: boolean
    /** 后端传入的 Markdown 源码 */
    markdown: string
  }
}