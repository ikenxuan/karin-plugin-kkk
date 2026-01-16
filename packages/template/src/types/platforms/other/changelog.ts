import type { BaseComponentProps } from '../../index'

/**
 * 更新日志组件属性接口
 */
export interface ChangelogProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否包含更新提示 */
    Tip?: boolean
    /** 后端传入的 Markdown 源码 */
    markdown: string,
    /** 本地版本号 */
    localVersion: string,
    /** 远程版本号 */
    remoteVersion: string,
    /** 构建时间 */
    buildTime?: string,
  }
}