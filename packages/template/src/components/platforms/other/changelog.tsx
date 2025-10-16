import React from 'react'

import { GlowText } from '../../../components/common/GlowImage'
import type { BaseComponentProps } from '../../../types'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 更新日志组件属性接口
 */
export interface ChangelogProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 更新日志图片 */
    changeLogImg?: string
    /** 是否包含更新提示 */
    Tip?: boolean
  }
}


/**
 * 更新日志组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const Changelog: React.FC<Omit<ChangelogProps, 'templateType' | 'templateName'>> = React.memo((props) => {

  return (
    <DefaultLayout
      {...props}
      className='bg-white dark:bg-[#0D1017]'
    >
      <div className='text-center'>
        <img src={props.data.changeLogImg} alt='更新日志' />
        {props.data.Tip && (
          <div className='text-5xl leading-relaxed text-primary-900'>
            引用回复此消息包含
            <span className='text-7xl'>「</span>
            <GlowText className='text-7xl font-bold text-primary' blurRadius={20} glowStrength={2} scale={1.2}>
              更新
            </GlowText>
            <span className='text-7xl'>」</span>
            字眼，即可开始更新
          </div>
        )}
      </div>
    </DefaultLayout>
  )
})

Changelog.displayName = 'Changelog'

export default Changelog