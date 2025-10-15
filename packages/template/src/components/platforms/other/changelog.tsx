import React from 'react'

import type { BaseComponentProps } from '../../../types'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 2.0版本更新日志组件属性接口
 */
export interface ChangelogProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 更新日志图片 */
    changeLogImg?: string
  }
}


/**
 * 2.0版本更新日志组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const Changelog: React.FC<Omit<ChangelogProps, 'templateType' | 'templateName'>> = React.memo((props) => {

  return (
    <DefaultLayout
      {...props}
      className='bg-white dark:bg-[#0D1017]'
    >
      <img className="mb-4" src={props.data?.changeLogImg} alt="更新日志" />
    </DefaultLayout>
  )
})

Changelog.displayName = 'Changelog'

export default Changelog