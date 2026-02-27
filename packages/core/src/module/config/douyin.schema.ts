/**
 * 抖音配置 Schema
 */
import type { SectionSchema } from './schema'
import { $includes, $ne, $not, $or } from './schema'

export const douyinConfigSchema: SectionSchema = {
  key: 'douyin',
  title: '抖音相关',
  subtitle: '此处为抖音相关的用户偏好设置',
  fields: [
    {
      key: 'switch',
      type: 'switch',
      label: '解析开关',
      description: '抖音解析开关，此开关为单独开关'
    },
    {
      key: 'tip',
      type: 'switch',
      label: '解析提示',
      description: '抖音解析提示，发送提示信息："检测到抖音链接，开始解析"',
      disabled: $not('switch')
    },
    {
      key: 'sendContent',
      type: 'checkbox',
      label: '解析时发送的内容',
      description: '若什么都不选，可能不会返回任何解析结果',
      orientation: 'horizontal',
      disabled: $not('switch'),
      options: [
        { label: '视频信息', value: 'info', description: '仅解析视频时有效' },
        { label: '评论列表', value: 'comment' },
        { label: '视频文件', value: 'video', description: '仅对视频作品有效' }
      ]
    },
    { type: 'divider', title: '评论详情设置' },
    {
      key: 'numcomment',
      type: 'input',
      inputType: 'number',
      label: '评论解析数量',
      disabled: $or($not('switch'), $not($includes('sendContent', 'comment'))),
      rules: [{ min: 1 }]
    },
    {
      key: 'subCommentLimit',
      type: 'input',
      inputType: 'number',
      label: '次级评论解析数量',
      description: '次级评论解析数量，当前逻辑不仅无法判断请求的来的评论的嵌套深度，而且「次级评论解析深度」会限制嵌套深度，超过深度的评论会被截断',
      disabled: $or($not('switch'), $not($includes('sendContent', 'comment'))),
      rules: [{ min: 1, max: 20 }]
    },
    {
      key: 'subCommentDepth',
      type: 'input',
      inputType: 'number',
      label: '次级评论解析深度',
      description: '次级评论解析深度',
      disabled: $or($not('switch'), $not($includes('sendContent', 'comment'))),
      rules: [{ min: 1, max: 6, error: '嵌套深度最高只有 6 层，超过 6 层的评论会被强制截断' }]
    },
    {
      key: 'commentImageCollection',
      type: 'switch',
      label: '是否收集评论区的图片',
      description: '开启后将收集评论区的图片，以合并转发的形式返回',
      disabled: $or($not('switch'), $not($includes('sendContent', 'comment')))
    },
    {
      key: 'realCommentCount',
      type: 'switch',
      label: '显示真实评论数量',
      description: '评论图是否显示真实评论数量，关闭则显示解析到的评论数量',
      disabled: $or($not('switch'), $not($includes('sendContent', 'comment')))
    },
    { type: 'divider', title: '渲染与画质设置' },
    {
      key: 'liveImageMergeMode',
      type: 'radio',
      label: '合辑 Live 图 BGM 合并方式',
      orientation: 'horizontal',
      disabled: $not('switch'),
      options: [
        { label: '连续', value: 'continuous', description: 'BGM 接续播放，结束后自动循环' },
        { label: '独立', value: 'independent', description: '每张图 BGM 从头开始' }
      ]
    },
    {
      key: 'videoQuality',
      type: 'radio',
      label: '画质偏好',
      description: '解析视频的分辨率偏好。',
      orientation: 'horizontal',
      disabled: $not('switch'),
      options: [
        { label: '自动选择', value: 'adapt', description: '根据「视频体积上限（MB）」自动选择分辨率进行下载' },
        { label: '标清 540p', value: '540p' },
        { label: '高清 720p', value: '720p' },
        { label: '高清 1080p', value: '1080p' },
        { label: '超清 2k', value: '2k' },
        { label: '超清 4k', value: '4k' }
      ]
    },
    {
      key: 'maxAutoVideoSize',
      type: 'input',
      inputType: 'number',
      label: '视频体积上限（MB）',
      description: '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效',
      disabled: $or($not('switch'), $ne('videoQuality', 'adapt')),
      rules: [{ min: 1, max: 20000 }]
    },
    {
      key: 'videoInfoMode',
      type: 'radio',
      label: '视频信息返回形式',
      disabled: $not('switch'),
      options: [
        { label: '图片模式', value: 'image' },
        { label: '文本模式', value: 'text' }
      ]
    },
    {
      key: 'displayContent',
      type: 'checkbox',
      label: '视频信息的内容',
      description: '若什么都不选，则不会返回任何视频相关信息',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $ne('videoInfoMode', 'text')),
      options: [
        { label: '封面', value: 'cover' },
        { label: '标题', value: 'title' },
        { label: '作者', value: 'author' },
        { label: '视频统计信息', value: 'stats' }
      ]
    },
    { type: 'divider', title: '权限设置' },
    {
      key: 'loginPerm',
      type: 'radio',
      label: '谁可以触发扫码登录',
      description: '修改后需重启',
      orientation: 'horizontal',
      options: [
        { label: '所有人', value: 'all' },
        { label: '管理员', value: 'admin' },
        { label: '主人', value: 'master' },
        { label: '群主', value: 'group.owner' },
        { label: '群管理员', value: 'group.admin' }
      ]
    },
    { type: 'divider', title: '弹幕烧录相关' },
    {
      key: 'burnDanmaku',
      type: 'switch',
      label: '弹幕烧录',
      description: '将弹幕硬编码到视频画面中。开启后视频需要重新编码，耗时较长',
      disabled: $not('switch')
    },
    {
      key: 'danmakuArea',
      type: 'radio',
      label: '弹幕显示区域',
      description: '限制弹幕范围，避免遮挡视频主体',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      options: [
        { label: '1/4 屏', value: '0.25' },
        { label: '半屏', value: '0.5' },
        { label: '3/4 屏', value: '0.75' },
        { label: '全屏', value: '1' }
      ]
    },
    {
      key: 'danmakuFontSize',
      type: 'radio',
      label: '弹幕字号',
      description: '弹幕文字大小',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      options: [
        { label: '小', value: 'small' },
        { label: '中', value: 'medium' },
        { label: '大', value: 'large' }
      ]
    },
    {
      key: 'danmakuOpacity',
      type: 'input',
      inputType: 'number',
      label: '弹幕透明度',
      description: '0为完全透明，100为完全不透明，推荐70',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      rules: [{ min: 0, max: 100 }]
    },
    {
      key: 'verticalMode',
      type: 'radio',
      label: '竖屏适配',
      description: '针对横屏视频，模拟手机端竖屏观看体验，视频居中显示，上下黑边区域用于展示弹幕',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      options: [
        { label: '关闭', value: 'off', description: '保持原始比例，不做转换' },
        { label: '智能', value: 'standard', description: '仅对宽高比 ≥1.7 的横屏视频生效' },
        { label: '强制 9:16', value: 'force', description: '所有视频统一转为竖屏' }
      ]
    },
    {
      key: 'videoCodec',
      type: 'radio',
      label: '视频编码格式',
      description: '烧录弹幕后的视频编码格式',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      options: [
        { label: 'H.264', value: 'h264' },
        { label: 'H.265', value: 'h265' },
        { label: 'AV1', value: 'av1' }
      ]
    },
    { type: 'divider', title: '抖音推送相关' },
    {
      key: 'push.switch',
      type: 'switch',
      label: '推送开关',
      description: '推送开关，修改后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表',
      color: 'warning'
    },
    {
      key: 'push.permission',
      type: 'radio',
      label: '谁可以设置推送',
      description: '修改后需重启',
      orientation: 'horizontal',
      disabled: $not('push.switch'),
      color: 'warning',
      options: [
        { label: '所有人', value: 'all' },
        { label: '管理员', value: 'admin' },
        { label: '主人', value: 'master' },
        { label: '群主', value: 'group.owner' },
        { label: '群管理员', value: 'group.admin' }
      ]
    },
    {
      key: 'push.cron',
      type: 'input',
      inputType: 'text',
      label: '定时任务表达式',
      description: '定时推送的时间，格式为cron表达式（默认为每十分钟执行一次）',
      color: 'warning',
      disabled: $not('push.switch')
    },
    {
      key: 'push.parsedynamic',
      type: 'switch',
      label: '作品解析',
      description: '触发推送时是否一同解析该作品',
      color: 'warning',
      disabled: $not('push.switch')
    },
    {
      key: 'push.shareType',
      type: 'radio',
      label: '推送图二维码的类型',
      orientation: 'horizontal',
      color: 'warning',
      disabled: $not('push.switch'),
      options: [
        { label: '网页链接', value: 'web', description: '识别后访问抖音官网对应的作品地址' },
        { label: '下载链接', value: 'download', description: '识别后访问无水印作品下载地址' }
      ]
    },
    {
      key: 'push.pushVideoQuality',
      type: 'radio',
      label: '画质偏好',
      description: '推送解析时解析视频的分辨率偏好。',
      orientation: 'horizontal',
      disabled: $not('push.switch'),
      color: 'warning',
      options: [
        { label: '自动选择', value: 'adapt', description: '根据「视频体积上限（MB）」自动选择分辨率进行下载' },
        { label: '标清 540p', value: '540p' },
        { label: '高清 720p', value: '720p' },
        { label: '高清 1080p', value: '1080p' },
        { label: '超清 2k', value: '2k' },
        { label: '超清 4k', value: '4k' }
      ]
    },
    {
      key: 'push.pushMaxAutoVideoSize',
      type: 'input',
      inputType: 'number',
      label: '视频体积上限（MB）',
      description: '推送解析时根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效',
      disabled: $or($not('push.switch'), $ne('push.pushVideoQuality', 'adapt')),
      color: 'warning',
      rules: [{ min: 1, max: 20000 }]
    }
  ]
}
