import { components } from 'node-karin'

import { type ConfigType } from '@/types'

/**
 * 小红书配置组件
 * @param all 配置
 */
export const XiaohongshuWeb = (all: ConfigType) => {
  return [
    components.accordion.create('xiaohongshu', {
      label: '小红书相关',
      children: [
        components.accordion.createItem('cfg:xiaohongshu', {
          title: '小红书相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为小红书相关的用户偏好设置',
          children: [
            components.switch.create('switch', {
              label: '解析开关',
              description: '小红书解析开关，此开关为单独开关',
              defaultSelected: all.xiaohongshu.switch
            }),
            components.switch.create('tip', {
              label: '解析提示',
              description: '小红书解析提示，发送提示信息：“检测到小红书链接，开始解析”',
              defaultSelected: all.xiaohongshu.tip,
              isDisabled: !all.xiaohongshu.switch
            }),
            components.checkbox.group('sendContent', {
              label: '解析时发送的内容',
              description: '若什么都不选，可能不会返回任何解析结果',
              orientation: 'horizontal',
              defaultValue: all.xiaohongshu.sendContent,
              isDisabled: !all.xiaohongshu.switch,
              checkbox: [
                components.checkbox.create('sendContent:checkbox:1', {
                  label: '笔记信息',
                  value: 'info'
                }),
                components.checkbox.create('sendContent:checkbox:2', {
                  label: '评论列表',
                  value: 'comment'
                }),
                components.checkbox.create('sendContent:checkbox:3', {
                  label: '笔记图片',
                  value: 'image'
                }),
                components.checkbox.create('sendContent:checkbox:4', {
                  label: '视频文件',
                  value: 'video',
                  description: '仅对视频笔记有效'
                })
              ]
            }),
            components.input.number('numcomment', {
              label: '评论解析数量',
              defaultValue: all.xiaohongshu.numcomment.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.xiaohongshu.sendContent.some(content => content === 'comment') || !all.xiaohongshu.switch
            }),
            components.divider.create('divider-xiaohongshu-render', {
              description: '渲染与画质设置',
              descPosition: 20
            }),
            components.radio.group('videoQuality', {
              label: '画质偏好',
              description: '解析视频的分辨率偏好。',
              orientation: 'horizontal',
              defaultValue: all.xiaohongshu.videoQuality.toString(),
              isDisabled: !all.xiaohongshu.switch,
              radio: [
                components.radio.create('videoQuality:radio-1', {
                  label: '自动选择',
                  value: 'adapt',
                  description: '根据「视频体积上限（MB）」自动选择分辨率进行下载'
                }),
                components.radio.create('videoQuality:radio-2', {
                  label: '标清 540p',
                  value: '540p'
                }),
                components.radio.create('videoQuality:radio-3', {
                  label: '高清 720p',
                  value: '720p'
                }),
                components.radio.create('videoQuality:radio-4', {
                  label: '高清 1080p',
                  value: '1080p'
                }),
                components.radio.create('videoQuality:radio-5', {
                  label: '超清 2k',
                  value: '2k'
                }),
                components.radio.create('videoQuality:radio-6', {
                  label: '超清 4k',
                  value: '4k'
                })
              ]
            }),
            components.input.number('maxAutoVideoSize', {
              label: '视频体积上限（MB）',
              description: '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效',
              defaultValue: all.xiaohongshu.maxAutoVideoSize.toString(),
              isDisabled: all.xiaohongshu.videoQuality !== 'adapt' || !all.xiaohongshu.switch,
              rules: [{ min: 1, max: 20000 }]
            })
          ]
        })
      ]
    })
  ]
}
