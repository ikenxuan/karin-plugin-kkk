/**
 * B站配置 Schema
 */
import type { SectionSchema } from './schema'
import { $eq, $includes, $ne, $not, $or } from './schema'

export const bilibiliConfigSchema: SectionSchema = {
  key: 'bilibili',
  title: 'B站相关',
  subtitle: '此处为B站相关的用户偏好设置',
  fields: [
    {
      key: 'switch',
      type: 'switch',
      label: '解析开关',
      description: 'B站解析开关，此开关为单独开关'
    },
    {
      key: 'tip',
      type: 'switch',
      label: '解析提示',
      description: 'B站解析提示，发送提示信息："检测到B站链接，开始解析"',
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
        { label: '视频文件', value: 'video', description: '仅对视频稿件有效' }
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
      key: 'realCommentCount',
      type: 'switch',
      label: '显示真实评论数量',
      description: '评论图是否显示真实评论数量，关闭则显示解析到的评论数量',
      disabled: $or($not('switch'), $not($includes('sendContent', 'comment')))
    },
    { type: 'divider', title: '渲染与画质设置' },
    {
      key: 'imageLayout',
      type: 'radio',
      label: '解析图文动态时，遇到多张图片时的页面布局方式（动态推送图片也生效）',
      description: '自动布局：少于4张时逐张上下排列；4~8张时瀑布流；9张及以上九宫格',
      orientation: 'horizontal',
      options: [
        { label: '自动布局', value: 'auto' },
        { label: '逐张上下排列', value: 'vertical' },
        { label: '瀑布流排列', value: 'waterfall' },
        { label: '九宫格排列', value: 'grid' }
      ]
    },
    {
      key: 'videoQuality',
      type: 'radio',
      label: '画质偏好',
      description: '解析视频的分辨率偏好。',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not($includes('sendContent', 'video'))),
      options: [
        { label: '自动选择', value: 0 },
        { label: '240P 极速', value: 6 },
        { label: '360P 流畅', value: 16 },
        { label: '480P 清晰', value: 32, description: '需登录（配置ck）' },
        { label: '720P 高清', value: 64, description: '需登录（配置ck）' },
        { label: '720P60 高帧率', value: 74, description: '需登录（配置ck）' },
        { label: '1080P 高清', value: 80, description: '需登录（配置ck）' },
        { label: '1080P+ 高码率', value: 112, description: '需大会员&视频支持' },
        { label: '1080P60 高帧率', value: 116, description: '需大会员&视频支持' },
        { label: '4K 超清', value: 120, description: '需大会员&视频支持' },
        { label: '8K 超高清', value: 127, description: '需大会员&视频支持' }
      ]
    },
    {
      key: 'maxAutoVideoSize',
      type: 'input',
      inputType: 'number',
      label: '视频体积上限（MB）',
      description: '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效',
      disabled: $or($not('switch'), $not($includes('sendContent', 'video')), $ne('videoQuality', 0)),
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
      label: '视频信息前返回的内容',
      description: '若什么都不选，则不会返回任何视频相关信息',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $eq('videoInfoMode', 'image')),
      options: [
        { label: '封面', value: 'cover' },
        { label: '标题', value: 'title' },
        { label: '作者', value: 'author' },
        { label: '视频统计信息', value: 'stats' },
        { label: '简介', value: 'desc' }
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
      description: '将弹幕硬编码到视频画面中。开启后视频需要重新编码，耗时较长，高分辨率视频会占用较多资源',
      disabled: $not('switch')
    },
    {
      key: 'danmakuArea',
      type: 'radio',
      label: '弹幕区域',
      description: '限制弹幕的显示范围，避免遮挡视频主体内容',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      options: [
        { label: '1/4 屏', value: '0.25', description: '仅顶部区域' },
        { label: '半屏', value: '0.5', description: '上半部分（推荐）' },
        { label: '3/4 屏', value: '0.75', description: '大部分区域' },
        { label: '全屏', value: '1', description: '铺满整个画面' }
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
      description: '模拟手机端竖屏观看体验，视频居中显示，上下黑边区域用于展示弹幕',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      options: [
        { label: '关闭', value: 'off', description: '保持原始比例，不做转换' },
        { label: '智能', value: 'standard', description: '仅对 16:9、21:9 等常见宽屏比例生效' },
        { label: '强制 9:16', value: 'force', description: '所有视频统一转为 9:16 竖屏，弹幕大小一致' }
      ]
    },
    {
      key: 'videoCodec',
      type: 'radio',
      label: '视频编码格式',
      description: '弹幕烧录时使用的视频编码格式，会自动检测硬件加速',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      options: [
        { label: 'H.264', value: 'h264', description: '兼容性最好，支持几乎所有设备' },
        { label: 'H.265', value: 'h265', description: '压缩率更高，近几年设备支持良好（推荐）' },
        { label: 'AV1', value: 'av1', description: '最新编码格式，压缩率最高，但编码较慢' }
      ]
    },
    { type: 'divider', title: 'B站推送相关' },
    {
      key: 'push.switch',
      type: 'switch',
      label: '推送开关',
      description: '推送开关，修改后需重启；使用「#设置B站推送 + UID」配置推送列表',
      color: 'warning'
    },
    {
      key: 'push.permission',
      type: 'radio',
      label: '谁可以设置推送',
      description: '修改后需重启',
      orientation: 'horizontal',
      color: 'warning',
      disabled: $not('push.switch'),
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
      key: 'push.pushVideoQuality',
      type: 'radio',
      label: '解析视频动态时的画质偏好',
      description: '「作品解析」开启时生效，仅对视频动态有效',
      orientation: 'horizontal',
      disabled: $or($not('push.switch'), $not('push.parsedynamic')),
      color: 'warning',
      options: [
        { label: '自动选择', value: 0 },
        { label: '240P 极速', value: 6 },
        { label: '360P 流畅', value: 16 },
        { label: '480P 清晰', value: 32, description: '需登录（配置ck）' },
        { label: '720P 高清', value: 64, description: '需登录（配置ck）' },
        { label: '720P60 高帧率', value: 74, description: '需登录（配置ck）' },
        { label: '1080P 高清', value: 80, description: '需登录（配置ck）' },
        { label: '1080P+ 高码率', value: 112, description: '需大会员&视频支持' },
        { label: '1080P60 高帧率', value: 116, description: '需大会员&视频支持' },
        { label: '4K 超清', value: 120, description: '需大会员&视频支持' },
        { label: '8K 超高清', value: 127, description: '需大会员&视频支持' }
      ]
    },
    {
      key: 'push.pushMaxAutoVideoSize',
      type: 'input',
      inputType: 'number',
      label: '视频动态的视频体积上限（MB）',
      description: '根据该值自动选择分辨率进行下载。仅在「解析视频动态时的画质偏好」 为 "自动选择" 且「作品解析」开启时生效，仅对视频动态有效',
      disabled: $or($not('push.switch'), $not('push.parsedynamic'), $ne('push.pushVideoQuality', 0)),
      color: 'warning',
      rules: [{ min: 1, max: 20000 }]
    }
  ]
}
