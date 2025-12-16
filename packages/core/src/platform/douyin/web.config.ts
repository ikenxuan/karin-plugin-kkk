import { components } from 'node-karin'

import { type ConfigType } from '@/types'

/**
 * 抖音配置组件
 * @param all 配置
 */
export const DouyinWeb = (all: ConfigType) => {
  return [
    components.accordion.create('douyin', {
      label: '抖音相关',
      children: [
        components.accordion.createItem('cfg:douyin', {
          title: '抖音相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为抖音相关的用户偏好设置',
          children: [
            components.switch.create('switch', {
              label: '解析开关',
              description: '抖音解析开关，此开关为单独开关',
              defaultSelected: all.douyin.switch
            }),
            components.switch.create('tip', {
              label: '解析提示',
              description: '抖音解析提示，发送提示信息：“检测到抖音链接，开始解析”',
              defaultSelected: all.douyin.tip,
              isDisabled: !all.douyin.switch
            }),
            components.checkbox.group('sendContent', {
              label: '解析时发送的内容',
              description: '若什么都不选，可能不会返回任何解析结果',
              orientation: 'horizontal',
              defaultValue: all.douyin.sendContent,
              isDisabled: !all.douyin.switch,
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
                  description: '仅对视频作品有效'
                })
              ]
            }),
            components.divider.create('divider-dy-comment', {
              description: '评论详情设置',
              descPosition: 20
            }),
            components.input.number('numcomment', {
              label: '评论解析数量',
              defaultValue: all.douyin.numcomment.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.douyin.sendContent.includes('comment') || !all.douyin.switch
            }),
            components.input.number('subCommentLimit', {
              label: '次级评论解析数量',
              description: '次级评论解析数量，当前逻辑不仅无法判断请求的来的评论的嵌套深度，而且「次级评论解析深度」会限制嵌套深度，超过深度的评论会被截断',
              defaultValue: all.douyin.subCommentLimit.toString(),
              rules: [{ min: 1, max: 20 }],
              isDisabled: !all.douyin.sendContent.includes('comment') || !all.douyin.switch
            }),
            components.input.number('subCommentDepth', {
              label: '次级评论解析深度',
              description: '次级评论解析深度',
              defaultValue: all.douyin.subCommentDepth.toString(),
              rules: [{ min: 1, max: 6, error: '嵌套深度最高只有 6 层，超过 6 层的评论会被强制截断' }],
              isDisabled: !all.douyin.sendContent.includes('comment') || !all.douyin.switch
            }),
            components.switch.create('commentImageCollection', {
              label: '是否收集评论区的图片',
              description: '开启后将收集评论区的图片，以合并转发的形式返回',
              defaultSelected: all.douyin.commentImageCollection,
              isDisabled: !all.douyin.sendContent.includes('comment') || !all.douyin.switch
            }),
            components.switch.create('realCommentCount', {
              label: '显示真实评论数量',
              description: '评论图是否显示真实评论数量，关闭则显示解析到的评论数量',
              defaultSelected: all.douyin.realCommentCount,
              isDisabled: !all.douyin.sendContent.includes('comment') || !all.douyin.switch
            }),
            components.divider.create('divider-dy-render', {
              description: '渲染与画质设置',
              descPosition: 20
            }),
            components.radio.group('liveImageMergeMode', {
              label: '合辑 Live 图 BGM 合并方式',
              orientation: 'horizontal',
              defaultValue: all.douyin.liveImageMergeMode.toString(),
              isDisabled: !all.douyin.switch,
              radio: [
                components.radio.create('liveImageMergeMode:radio-1', {
                  label: '连续',
                  value: 'continuous',
                  description: 'BGM 接续播放，结束后自动循环'
                }),
                components.radio.create('liveImageMergeMode:radio-2', {
                  label: '独立',
                  value: 'independent',
                  description: '每张图 BGM 从头开始'
                })
              ]
            }),
            components.radio.group('videoQuality', {
              label: '画质偏好',
              description: '解析视频的分辨率偏好。',
              orientation: 'horizontal',
              defaultValue: all.douyin.videoQuality.toString(),
              isDisabled: !all.douyin.switch,
              radio: [
                components.radio.create('videoQuality:parse:radio-1', {
                  label: '自动选择',
                  value: 'adapt',
                  description: '根据「视频体积上限（MB）」自动选择分辨率进行下载'
                }),
                components.radio.create('videoQuality:parse:radio-2', {
                  label: '标清 540p',
                  value: '540p'
                }),
                components.radio.create('videoQuality:parse:radio-3', {
                  label: '高清 720p',
                  value: '720p'
                }),
                components.radio.create('videoQuality:parse:radio-4', {
                  label: '高清 1080p',
                  value: '1080p'
                }),
                components.radio.create('videoQuality:parse:radio-5', {
                  label: '超清 2k',
                  value: '2k'
                }),
                components.radio.create('videoQuality:parse:radio-6', {
                  label: '超清 4k',
                  value: '4k'
                })
              ]
            }),
            components.input.number('maxAutoVideoSize', {
              label: '视频体积上限（MB）',
              description: '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效',
              defaultValue: all.douyin.maxAutoVideoSize.toString(),
              isDisabled: all.douyin.videoQuality !== 'adapt' || !all.douyin.switch,
              rules: [{ min: 1, max: 20000 }]
            }),
            components.radio.group('videoInfoMode', {
              label: '视频信息返回形式',
              defaultValue: all.douyin.videoInfoMode,
              isDisabled: !all.douyin.switch,
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
              label: '视频信息的内容',
              description: '若什么都不选，则不会返回任何视频相关信息',
              orientation: 'horizontal',
              defaultValue: all.douyin.displayContent,
              isDisabled: !all.douyin.switch || (all.douyin.switch && all.douyin.videoInfoMode === 'image'),
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
                })
              ]
            }),
            components.divider.create('divider-dy-permission', {
              description: '权限设置',
              descPosition: 20
            }),
            components.radio.group('loginPerm', {
              label: '谁可以触发扫码登录',
              description: '修改后需重启',
              orientation: 'horizontal',
              defaultValue: all.douyin.loginPerm,
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
            components.divider.create('divider-dy-danmaku', {
              description: '弹幕烧录相关',
              descPosition: 20
            }),
            components.switch.create('burnDanmaku', {
              label: '弹幕烧录',
              description: '将弹幕硬编码到视频画面中。开启后视频需要重新编码，耗时较长',
              defaultSelected: all.douyin.burnDanmaku,
              isDisabled: !all.douyin.switch
            }),
            components.radio.group('danmakuArea', {
              label: '弹幕显示区域',
              description: '限制弹幕范围，避免遮挡视频主体',
              orientation: 'horizontal',
              defaultValue: all.douyin.danmakuArea.toString(),
              isDisabled: !all.douyin.switch || !all.douyin.burnDanmaku,
              radio: [
                components.radio.create('danmakuArea:radio-1', {
                  label: '1/4 屏',
                  value: '0.25'
                }),
                components.radio.create('danmakuArea:radio-2', {
                  label: '半屏',
                  value: '0.5'
                }),
                components.radio.create('danmakuArea:radio-3', {
                  label: '3/4 屏',
                  value: '0.75'
                }),
                components.radio.create('danmakuArea:radio-4', {
                  label: '全屏',
                  value: '1'
                })
              ]
            }),
            components.radio.group('verticalMode', {
              label: '竖屏适配',
              description: '针对横屏视频，模拟手机端竖屏观看体验，视频居中显示，上下黑边区域用于展示弹幕',
              orientation: 'horizontal',
              defaultValue: all.douyin.verticalMode,
              isDisabled: !all.douyin.switch || !all.douyin.burnDanmaku,
              radio: [
                components.radio.create('verticalMode:radio-1', {
                  label: '关闭',
                  value: 'off',
                  description: '保持原始比例，不做转换'
                }),
                components.radio.create('verticalMode:radio-2', {
                  label: '智能',
                  value: 'standard',
                  description: '仅对宽高比 ≥1.7 的横屏视频生效'
                }),
                components.radio.create('verticalMode:radio-3', {
                  label: '强制 9:16',
                  value: 'force',
                  description: '所有视频统一转为竖屏'
                })
              ]
            }),
            components.radio.group('videoCodec', {
              label: '视频编码格式',
              description: '烧录弹幕后的视频编码格式',
              orientation: 'horizontal',
              defaultValue: all.douyin.videoCodec,
              isDisabled: !all.douyin.switch || !all.douyin.burnDanmaku,
              radio: [
                components.radio.create('videoCodec:radio-1', {
                  label: 'H.264',
                  value: 'h264'
                }),
                components.radio.create('videoCodec:radio-2', {
                  label: 'H.265',
                  value: 'h265'
                }),
                components.radio.create('videoCodec:radio-3', {
                  label: 'AV1',
                  value: 'av1'
                })
              ]
            }),
            components.divider.create('divider-dy-1', {
              description: '抖音推送相关',
              descPosition: 20
            }),
            components.switch.create('push:switch', {
              label: '推送开关',
              description: '推送开关，修改后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表',
              defaultSelected: all.douyin.push.switch,
              color: 'warning'
            }),
            components.radio.group('push:permission', {
              label: '谁可以设置推送',
              description: '修改后需重启',
              orientation: 'horizontal',
              defaultValue: all.douyin.push.permission,
              isDisabled: !all.douyin.push.switch,
              color: 'warning',
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
              defaultValue: all.douyin.push.cron,
              color: 'warning',
              isDisabled: !all.douyin.push.switch
            }),
            components.switch.create('push:parsedynamic', {
              label: '作品解析',
              description: '触发推送时是否一同解析该作品',
              defaultSelected: all.douyin.push.parsedynamic,
              color: 'warning',
              isDisabled: !all.douyin.push.switch
            }),
            components.switch.create('push:log', {
              label: '推送日志',
              description: '是否打印推送日志（修改后需重启）',
              defaultSelected: all.douyin.push.log,
              color: 'warning',
              isDisabled: !all.douyin.push.switch
            }),
            components.radio.group('push:shareType', {
              label: '推送图二维码的类型',
              orientation: 'horizontal',
              defaultValue: all.douyin.push.shareType,
              color: 'warning',
              isDisabled: !all.douyin.push.switch,
              radio: [
                components.radio.create('push:shareType.radio-1', {
                  label: '网页链接',
                  description: '识别后访问抖音官网对应的作品地址',
                  value: 'web'
                }),
                components.radio.create('push:shareType.radio-2', {
                  description: '识别后访问无水印作品下载地址',
                  label: '下载链接',
                  value: 'download'
                })
              ]
            }),
            components.radio.group('pushvideoQuality', {
              label: '画质偏好',
              description: '推送解析时解析视频的分辨率偏好。',
              orientation: 'horizontal',
              defaultValue: all.douyin.push.pushVideoQuality.toString(),
              isDisabled: !all.douyin.push.switch,
              color: 'warning',
              radio: [
                components.radio.create('pushvideoQuality:radio-1', {
                  label: '自动选择',
                  value: 'adapt',
                  description: '根据「视频体积上限（MB）」自动选择分辨率进行下载'
                }),
                components.radio.create('pushvideoQuality:radio-2', {
                  label: '标清 540p',
                  value: '540p'
                }),
                components.radio.create('pushvideoQuality:radio-3', {
                  label: '高清 720p',
                  value: '720p'
                }),
                components.radio.create('pushvideoQuality:radio-4', {
                  label: '高清 1080p',
                  value: '1080p'
                }),
                components.radio.create('pushvideoQuality:radio-5', {
                  label: '超清 2k',
                  value: '2k'
                }),
                components.radio.create('pushvideoQuality:radio-6', {
                  label: '超清 4k',
                  value: '4k'
                })
              ]
            }),
            components.input.number('maxAutoVideoSize', {
              label: '视频体积上限（MB）',
              color: 'warning',
              description: '推送解析时根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效',
              defaultValue: all.douyin.push.pushMaxAutoVideoSize.toString(),
              isDisabled: all.douyin.push.pushVideoQuality !== 'adapt' || !all.douyin.push.switch,
              rules: [{ min: 1, max: 20000 }]
            })
          ]
        })
      ]
    })
  ]
}
