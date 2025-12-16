import { components } from 'node-karin'

import { type ConfigType } from '@/types'

/**
 * 快手配置组件
 * @param all 配置
 */
export const KuaishouWeb = (all: ConfigType) => {
  return [
    components.accordion.create('kuaishou', {
      label: '快手相关',
      children: [
        components.accordion.createItem('cfg:kuaishou', {
          title: '快手相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为快手相关的用户偏好设置',
          children: [
            components.switch.create('switch', {
              label: '解析开关',
              description: '快手解析开关，此开关为单独开关',
              defaultSelected: all.kuaishou.switch
            }),
            components.switch.create('tip', {
              label: '解析提示',
              description: '快手解析提示，发送提示信息：“检测到快手链接，开始解析”',
              defaultSelected: all.kuaishou.tip,
              isDisabled: !all.kuaishou.switch
            }),
            components.divider.create('divider-kuaishou-comment', {
              description: '评论详情设置',
              descPosition: 20
            }),
            components.switch.create('comment', {
              label: '评论解析',
              description: '快手评论解析，开启后可发送快手作品评论图',
              defaultSelected: all.kuaishou.comment,
              isDisabled: !all.kuaishou.switch
            }),
            components.input.number('numcomment', {
              label: '评论解析数量',
              defaultValue: all.kuaishou.numcomment.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.kuaishou.switch || !all.kuaishou.comment
            })
          ]
        })
      ]
    })
  ]
}
