import { components } from 'node-karin'

import { type ConfigType } from '@/types'

/**
 * B站配置组件
 * @param all 配置
 */
export const BilibiliWeb = (all: ConfigType) => {
  return [
    components.accordion.create('bilibili', {
      label: 'B站相关',
      children: [
        components.accordion.createItem('cfg:bilibili', {
          title: 'B站相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为B站相关的用户偏好设置',
          children: [
            components.switch.create('switch', {
              label: '解析开关',
              description: 'B站解析开关，此开关为单独开关',
              defaultSelected: all.bilibili.switch
            }),
            components.switch.create('tip', {
              label: '解析提示',
              description: 'B站解析提示，发送提示信息：“检测到B站链接，开始解析”',
              defaultSelected: all.bilibili.tip,
              isDisabled: !all.bilibili.switch
            }),
            components.checkbox.group('sendContent', {
              label: '解析时发送的内容',
              description: '若什么都不选，可能不会返回任何解析结果',
              orientation: 'horizontal',
              defaultValue: all.bilibili.sendContent,
              isDisabled: !all.bilibili.switch,
              checkbox: [
                components.checkbox.create('sendContent:checkbox:1', {
                  label: '视频信息',
                  value: 'info',
                  description: '仅解析视频时有效'
                }),
                components.checkbox.create('sendContent:checkbox:2', {
                  label: '评论列表',
                  value: 'comment'
                }),
                components.checkbox.create('sendContent:checkbox:3', {
                  label: '视频文件',
                  value: 'video',
                  description: '仅对视频稿件有效'
                })
              ]
            }),
            components.divider.create('divider-bilibili-comment', {
              description: '评论详情设置',
              descPosition: 20
            }),
            components.input.number('numcomment', {
              label: '评论解析数量',
              defaultValue: all.bilibili.numcomment.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.bilibili.sendContent.some(content => content === 'comment') || !all.bilibili.switch
            }),
            components.switch.create('realCommentCount', {
              label: '显示真实评论数量',
              description: '评论图是否显示真实评论数量，关闭则显示解析到的评论数量',
              defaultSelected: all.bilibili.realCommentCount,
              isDisabled: !all.bilibili.sendContent.some(content => content === 'comment') || !all.bilibili.switch
            }),
            components.divider.create('divider-bilibili-render', {
              description: '渲染与画质设置',
              descPosition: 20
            }),
            components.radio.group('imageLayout', {
              label: '解析图文动态时，遇到多张图片时的页面布局方式（动态推送图片也生效）',
              description: '自动布局：少于4张时逐张上下排列；4~8张时瀑布流；9张及以上九宫格',
              orientation: 'horizontal',
              defaultValue: all.bilibili.imageLayout,
              radio: [
                components.radio.create('imageLayout:radio-4', {
                  label: '自动布局',
                  value: 'auto'
                }),
                components.radio.create('imageLayout:radio-1', {
                  label: '逐张上下排列',
                  value: 'vertical'
                }),
                components.radio.create('imageLayout:radio-2', {
                  label: '瀑布流排列',
                  value: 'waterfall'
                }),
                components.radio.create('imageLayout:radio-3', {
                  label: '九宫格排列',
                  value: 'grid'
                })
              ]
            }),
            components.radio.group('videoQuality', {
              label: '画质偏好',
              description: '解析视频的分辨率偏好。',
              orientation: 'horizontal',
              defaultValue: all.bilibili.videoQuality.toString(),
              isDisabled: !all.bilibili.switch,
              radio: [
                components.radio.create('videoQuality:parse:radio-1', {
                  label: '自动选择',
                  value: '0'
                }),
                components.radio.create('videoQuality:parse:radio-2', {
                  label: '240P 极速',
                  value: '6'
                }),
                components.radio.create('videoQuality:parse:radio-3', {
                  label: '360P 流畅',
                  value: '16'
                }),
                components.radio.create('videoQuality:parse:radio-4', {
                  label: '480P 清晰',
                  value: '32',
                  description: '需登录（配置ck）'
                }),
                components.radio.create('videoQuality:parse:radio-5', {
                  label: '720P 高清',
                  value: '64',
                  description: '需登录（配置ck）'
                }),
                components.radio.create('videoQuality:parse:radio-6', {
                  label: '720P60 高帧率',
                  value: '74',
                  description: '需登录（配置ck）'
                }),
                components.radio.create('videoQuality:parse:radio-7', {
                  label: '1080P 高清',
                  value: '80',
                  description: '需登录（配置ck）'
                }),
                components.radio.create('videoQuality:parse:radio-8', {
                  label: '1080P+ 高码率',
                  value: '112',
                  description: '需大会员&视频支持'
                }),
                components.radio.create('videoQuality:parse:radio-9', {
                  label: '1080P60 高帧率',
                  value: '116',
                  description: '需大会员&视频支持'
                }),
                components.radio.create('videoQuality:parse:radio-10', {
                  label: '4K 超清',
                  value: '120',
                  description: '需大会员&视频支持'
                }),
                components.radio.create('videoQuality:parse:radio-11', {
                  label: '8K 超高清',
                  value: '127',
                  description: '需大会员&视频支持'
                })
              ]
            }),
            components.input.number('maxAutoVideoSize', {
              label: '视频体积上限（MB）',
              description: '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效',
              defaultValue: all.bilibili.maxAutoVideoSize.toString(),
              isDisabled: all.bilibili.videoQuality !== 0 || !all.bilibili.switch,
              rules: [{ min: 1, max: 20000 }]
            }),
            components.radio.group('videoInfoMode', {
              label: '视频信息返回形式',
              defaultValue: all.bilibili.videoInfoMode,
              isDisabled: !all.bilibili.switch,
              radio: [
                components.radio.create('videoInfoMode:radio-2', {
                  label: '图片模式',
                  value: 'image'
                }),
                components.radio.create('videoInfoMode:radio-1', {
                  label: '文本模式',
                  value: 'text'
                })
              ]
            }),
            components.checkbox.group('displayContent', {
              label: '视频信息前返回的内容',
              description: '若什么都不选，则不会返回任何视频相关信息',
              orientation: 'horizontal',
              defaultValue: all.bilibili.displayContent,
              isDisabled: !all.bilibili.switch || (all.bilibili.switch && all.bilibili.videoInfoMode === 'image'),
              checkbox: [
                components.checkbox.create('displayContent:checkbox:1', {
                  label: '封面',
                  value: 'cover'
                }),
                components.checkbox.create('displayContent:checkbox:2', {
                  label: '标题',
                  value: 'title'
                }),
                components.checkbox.create('displayContent:checkbox:3', {
                  label: '作者',
                  value: 'author'
                }),
                components.checkbox.create('displayContent:checkbox:4', {
                  label: '视频统计信息',
                  value: 'stats'
                }),
                components.checkbox.create('displayContent:checkbox:5', {
                  label: '简介',
                  value: 'desc'
                })
              ]
            }),
            components.divider.create('divider-bilibili-permission', {
              description: '权限设置',
              descPosition: 20
            }),
            components.radio.group('loginPerm', {
              label: '谁可以触发扫码登录',
              description: '修改后需重启',
              orientation: 'horizontal',
              defaultValue: all.bilibili.loginPerm,
              radio: [
                components.radio.create('permission:radio-1', {
                  label: '所有人',
                  value: 'all'
                }),
                components.radio.create('permission:radio-2', {
                  label: '管理员',
                  value: 'admin'
                }),
                components.radio.create('permission:radio-3', {
                  label: '主人',
                  value: 'master'
                }),
                components.radio.create('permission:radio-4', {
                  label: '群主',
                  value: 'group.owner'
                }),
                components.radio.create('permission:radio-5', {
                  label: '群管理员',
                  value: 'group.admin'
                })
              ]
            }),
            components.divider.create('divider-bilibili-danmaku', {
              description: '弹幕烧录相关',
              descPosition: 20
            }),
            components.switch.create('burnDanmaku', {
              label: '弹幕烧录',
              description: '将弹幕硬编码到视频画面中。开启后视频需要重新编码，耗时较长，高分辨率视频会占用较多资源',
              defaultSelected: all.bilibili.burnDanmaku,
              isDisabled: !all.bilibili.switch
            }),
            components.radio.group('danmakuArea', {
              label: '弹幕区域',
              description: '限制弹幕的显示范围，避免遮挡视频主体内容',
              orientation: 'horizontal',
              defaultValue: all.bilibili.danmakuArea.toString(),
              isDisabled: !all.bilibili.switch || !all.bilibili.burnDanmaku,
              radio: [
                components.radio.create('danmakuArea:radio-1', {
                  label: '1/4 屏',
                  value: '0.25',
                  description: '仅顶部区域'
                }),
                components.radio.create('danmakuArea:radio-2', {
                  label: '半屏',
                  value: '0.5',
                  description: '上半部分（推荐）'
                }),
                components.radio.create('danmakuArea:radio-3', {
                  label: '3/4 屏',
                  value: '0.75',
                  description: '大部分区域'
                }),
                components.radio.create('danmakuArea:radio-4', {
                  label: '全屏',
                  value: '1',
                  description: '铺满整个画面'
                })
              ]
            }),
            components.radio.group('verticalMode', {
              label: '竖屏适配',
              description: '模拟手机端竖屏观看体验，视频居中显示，上下黑边区域用于展示弹幕',
              orientation: 'horizontal',
              defaultValue: all.bilibili.verticalMode,
              isDisabled: !all.bilibili.switch || !all.bilibili.burnDanmaku,
              radio: [
                components.radio.create('verticalMode:radio-1', {
                  label: '关闭',
                  value: 'off',
                  description: '保持原始比例，不做转换'
                }),
                components.radio.create('verticalMode:radio-2', {
                  label: '智能',
                  value: 'standard',
                  description: '仅对 16:9、21:9 等常见宽屏比例生效'
                }),
                components.radio.create('verticalMode:radio-3', {
                  label: '强制 9:16',
                  value: 'force',
                  description: '所有视频统一转为 9:16 竖屏，弹幕大小一致'
                })
              ]
            }),
            components.radio.group('videoCodec', {
              label: '视频编码格式',
              description: '弹幕烧录时使用的视频编码格式，会自动检测硬件加速',
              orientation: 'horizontal',
              defaultValue: all.bilibili.videoCodec,
              isDisabled: !all.bilibili.switch || !all.bilibili.burnDanmaku,
              radio: [
                components.radio.create('videoCodec:radio-1', {
                  label: 'H.264',
                  value: 'h264',
                  description: '兼容性最好，支持几乎所有设备'
                }),
                components.radio.create('videoCodec:radio-2', {
                  label: 'H.265',
                  value: 'h265',
                  description: '压缩率更高，近几年设备支持良好（推荐）'
                }),
                components.radio.create('videoCodec:radio-3', {
                  label: 'AV1',
                  value: 'av1',
                  description: '最新编码格式，压缩率最高，但编码较慢'
                })
              ]
            }),
            components.divider.create('divider-bilibili-1', {
              description: 'B站推送相关',
              descPosition: 20
            }),
            components.switch.create('push:switch', {
              label: '推送开关',
              description: '推送开关，修改后需重启；使用「#设置B站推送 + UID」配置推送列表',
              defaultSelected: all.bilibili.push.switch,
              color: 'warning'
            }),
            components.radio.group('push:permission', {
              label: '谁可以设置推送',
              description: '修改后需重启',
              orientation: 'horizontal',
              defaultValue: all.bilibili.push.permission,
              color: 'warning',
              isDisabled: !all.bilibili.push.switch,
              radio: [
                components.radio.create('push:permission:radio-1', {
                  label: '所有人',
                  value: 'all'
                }),
                components.radio.create('push:permission:radio-2', {
                  label: '管理员',
                  value: 'admin'
                }),
                components.radio.create('push:permission:radio-3', {
                  label: '主人',
                  value: 'master'
                }),
                components.radio.create('push:permission:radio-4', {
                  label: '群主',
                  value: 'group.owner'
                }),
                components.radio.create('push:permission:radio-5', {
                  label: '群管理员',
                  value: 'group.admin'
                })
              ]
            }),
            components.input.string('push:cron', {
              label: '定时任务表达式',
              description: '定时推送的时间，格式为cron表达式（默认为每十分钟执行一次）',
              defaultValue: all.bilibili.push.cron,
              color: 'warning',
              isDisabled: !all.bilibili.push.switch
            }),
            components.switch.create('push:parsedynamic', {
              label: '作品解析',
              description: '触发推送时是否一同解析该作品',
              defaultSelected: all.bilibili.push.parsedynamic,
              color: 'warning',
              isDisabled: !all.bilibili.push.switch
            }),
            components.switch.create('push:log', {
              label: '推送日志',
              description: '是否打印推送日志（修改后需重启）',
              defaultSelected: all.bilibili.push.log,
              color: 'warning',
              isDisabled: !all.bilibili.push.switch
            }),
            components.radio.group('push:pushVideoQuality', {
              label: '解析视频动态时的画质偏好',
              description: '「作品解析」开启时生效，仅对视频动态有效',
              orientation: 'horizontal',
              isDisabled: !all.bilibili.push.parsedynamic || !all.bilibili.push.switch,
              defaultValue: all.bilibili.push.pushVideoQuality.toString(),
              color: 'warning',
              radio: [
                components.radio.create('push:pushVideoQuality:radio-1', {
                  label: '自动选择',
                  value: '0'
                }),
                components.radio.create('push:pushVideoQuality:radio-2', {
                  label: '240P 极速',
                  value: '6'
                }),
                components.radio.create('push:pushVideoQuality:radio-3', {
                  label: '360P 流畅',
                  value: '16'
                }),
                components.radio.create('push:pushVideoQuality:radio-4', {
                  label: '480P 清晰',
                  value: '32',
                  description: '需登录（配置ck）'
                }),
                components.radio.create('push:pushVideoQuality:radio-5', {
                  label: '720P 高清',
                  value: '64',
                  description: '需登录（配置ck）'
                }),
                components.radio.create('push:pushVideoQuality:radio-6', {
                  label: '720P60 高帧率',
                  value: '74',
                  description: '需登录（配置ck）'
                }),
                components.radio.create('push:pushVideoQuality:radio-7', {
                  label: '1080P 高清',
                  value: '80',
                  description: '需登录（配置ck）'
                }),
                components.radio.create('push:pushVideoQuality:radio-8', {
                  label: '1080P+ 高码率',
                  value: '112',
                  description: '需大会员&视频支持'
                }),
                components.radio.create('push:pushVideoQuality:radio-9', {
                  label: '1080P60 高帧率',
                  value: '116',
                  description: '需大会员&视频支持'
                }),
                components.radio.create('push:pushVideoQuality:radio-10', {
                  label: '4K 超清',
                  value: '120',
                  description: '需大会员&视频支持'
                }),
                components.radio.create('push:pushVideoQuality:radio-11', {
                  label: '8K 超高清',
                  value: '127',
                  description: '需大会员&视频支持'
                })
              ]
            }),
            components.input.number('push:pushMaxAutoVideoSize', {
              label: '视频动态的视频体积上限（MB）',
              description: '根据该值自动选择分辨率进行下载。仅在「解析视频动态时的画质偏好」 为 "自动选择" 且「作品解析」开启时生效，仅对视频动态有效',
              defaultValue: all.bilibili.push.pushMaxAutoVideoSize.toString(),
              isDisabled: !all.bilibili.push.parsedynamic || all.bilibili.push.pushVideoQuality !== 0 || !all.bilibili.push.switch,
              rules: [{ min: 1, max: 20000 }],
              color: 'warning'
            })
          ]
        })
      ]
    })
  ]
}
