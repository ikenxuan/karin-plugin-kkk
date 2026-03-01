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
      label: '解析开关',
      description: 'B站解析开关，此开关为单独开关'
    },
    {
      key: 'tip',
      label: '解析提示',
      description: 'B站解析提示，发送提示信息："检测到B站链接，开始解析"',
      disabled: $not('switch')
    },
    {
      key: 'sendContent',
      label: '解析时发送的内容',
      description: '若什么都不选，可能不会返回任何解析结果',
      orientation: 'horizontal',
      disabled: $not('switch'),
      checkbox: [
        { key: 'sendContent:checkbox:1', label: '视频信息', value: 'info', description: '仅解析视频时有效' },
        { key: 'sendContent:checkbox:2', label: '评论列表', value: 'comment' },
        { key: 'sendContent:checkbox:3', label: '视频文件', value: 'video', description: '仅对视频稿件有效' }
      ]
    },
    { description: '评论详情设置', descPosition: 20 },
    {
      key: 'numcomment',
      type: 'number',
      label: '评论解析数量',
      disabled: $or($not('switch'), $not($includes('sendContent', 'comment'))),
      rules: [{ min: 1 }]
    },
    {
      key: 'realCommentCount',
      label: '显示真实评论数量',
      description: '评论图是否显示真实评论数量，关闭则显示解析到的评论数量',
      disabled: $or($not('switch'), $not($includes('sendContent', 'comment')))
    },
    {
      key: 'commentImageCollection',
      label: '是否收集评论区的图片',
      description: '开启后将收集评论区的图片，以合并转发的形式返回',
      disabled: $or($not('switch'), $not($includes('sendContent', 'comment')))
    },
    { description: '渲染与画质设置', descPosition: 20 },
    {
      key: 'imageLayout',
      label: '解析图文动态时，遇到多张图片时的页面布局方式（动态推送图片也生效）',
      description: '自动布局：少于4张时逐张上下排列；4~8张时瀑布流；9张及以上九宫格',
      orientation: 'horizontal',
      radio: [
        { key: 'imageLayout:radio-1', label: '自动布局', value: 'auto' },
        { key: 'imageLayout:radio-2', label: '逐张上下排列', value: 'vertical' },
        { key: 'imageLayout:radio-3', label: '瀑布流排列', value: 'waterfall' },
        { key: 'imageLayout:radio-4', label: '九宫格排列', value: 'grid' }
      ]
    },
    {
      key: 'videoQuality',
      label: '画质偏好',
      description: '解析视频的分辨率偏好。',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not($includes('sendContent', 'video'))),
      radio: [
        { key: 'videoQuality:radio-1', label: '自动选择', value: '0' },
        { key: 'videoQuality:radio-2', label: '240P 极速', value: '6' },
        { key: 'videoQuality:radio-3', label: '360P 流畅', value: '16' },
        { key: 'videoQuality:radio-4', label: '480P 清晰', value: '32', description: '需登录（配置ck）' },
        { key: 'videoQuality:radio-5', label: '720P 高清', value: '64', description: '需登录（配置ck）' },
        { key: 'videoQuality:radio-6', label: '720P60 高帧率', value: '74', description: '需登录（配置ck）' },
        { key: 'videoQuality:radio-7', label: '1080P 高清', value: '80', description: '需登录（配置ck）' },
        { key: 'videoQuality:radio-8', label: '1080P+ 高码率', value: '112', description: '需大会员&视频支持' },
        { key: 'videoQuality:radio-9', label: '1080P60 高帧率', value: '116', description: '需大会员&视频支持' },
        { key: 'videoQuality:radio-10', label: '4K 超清', value: '120', description: '需大会员&视频支持' },
        { key: 'videoQuality:radio-11', label: '8K 超高清', value: '127', description: '需大会员&视频支持' }
      ]
    },
    {
      key: 'maxAutoVideoSize',
      type: 'number',
      label: '视频体积上限（MB）',
      description: '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效',
      disabled: $or($not('switch'), $not($includes('sendContent', 'video')), $ne('videoQuality', '0')),
      rules: [{ min: 1, max: 20000 }]
    },
    {
      key: 'videoInfoMode',
      label: '视频信息返回形式',
      disabled: $not('switch'),
      radio: [
        { key: 'videoInfoMode:radio-1', label: '图片模式', value: 'image' },
        { key: 'videoInfoMode:radio-2', label: '文本模式', value: 'text' }
      ]
    },
    {
      key: 'displayContent',
      label: '视频信息前返回的内容',
      description: '若什么都不选，则不会返回任何视频相关信息',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $eq('videoInfoMode', 'image')),
      checkbox: [
        { key: 'displayContent:checkbox:1', label: '封面', value: 'cover' },
        { key: 'displayContent:checkbox:2', label: '标题', value: 'title' },
        { key: 'displayContent:checkbox:3', label: '作者', value: 'author' },
        { key: 'displayContent:checkbox:4', label: '视频统计信息', value: 'stats' },
        { key: 'displayContent:checkbox:5', label: '简介', value: 'desc' }
      ]
    },
    { description: '权限设置', descPosition: 20 },
    {
      key: 'loginPerm',
      label: '谁可以触发扫码登录',
      description: '修改后需重启',
      orientation: 'horizontal',
      radio: [
        { key: 'loginPerm:radio-1', label: '所有人', value: 'all' },
        { key: 'loginPerm:radio-2', label: '管理员', value: 'admin' },
        { key: 'loginPerm:radio-3', label: '主人', value: 'master' },
        { key: 'loginPerm:radio-4', label: '群主', value: 'group.owner' },
        { key: 'loginPerm:radio-5', label: '群管理员', value: 'group.admin' }
      ]
    },
    { description: '弹幕烧录相关', descPosition: 20 },
    {
      key: 'burnDanmaku',
      label: '弹幕烧录',
      description: '将弹幕硬编码到视频画面中。开启后视频需要重新编码，耗时较长，高分辨率视频会占用较多资源',
      disabled: $not('switch')
    },
    {
      key: 'danmakuArea',
      label: '弹幕区域',
      description: '限制弹幕的显示范围，避免遮挡视频主体内容',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      radio: [
        { key: 'danmakuArea:radio-1', label: '1/4 屏', value: '0.25', description: '仅顶部区域' },
        { key: 'danmakuArea:radio-2', label: '半屏', value: '0.5', description: '上半部分（推荐）' },
        { key: 'danmakuArea:radio-3', label: '3/4 屏', value: '0.75', description: '大部分区域' },
        { key: 'danmakuArea:radio-4', label: '全屏', value: '1', description: '铺满整个画面' }
      ]
    },
    {
      key: 'danmakuFontSize',
      label: '弹幕字号',
      description: '弹幕文字大小',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      radio: [
        { key: 'danmakuFontSize:radio-1', label: '小', value: 'small' },
        { key: 'danmakuFontSize:radio-2', label: '中', value: 'medium' },
        { key: 'danmakuFontSize:radio-3', label: '大', value: 'large' }
      ]
    },
    {
      key: 'danmakuOpacity',
      type: 'number',
      label: '弹幕透明度',
      description: '0为完全透明，100为完全不透明，推荐70',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      rules: [{ min: 0, max: 100 }]
    },
    {
      key: 'verticalMode',
      label: '竖屏适配',
      description: '模拟手机端竖屏观看体验，视频居中显示，上下黑边区域用于展示弹幕',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      radio: [
        { key: 'verticalMode:radio-1', label: '关闭', value: 'off', description: '保持原始比例，不做转换' },
        { key: 'verticalMode:radio-2', label: '智能', value: 'standard', description: '仅对 16:9、21:9 等常见宽屏比例生效' },
        { key: 'verticalMode:radio-3', label: '强制 9:16', value: 'force', description: '所有视频统一转为 9:16 竖屏，弹幕大小一致' }
      ]
    },
    {
      key: 'videoCodec',
      label: '视频编码格式',
      description: '弹幕烧录时使用的视频编码格式，会自动检测硬件加速',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not('burnDanmaku')),
      radio: [
        { key: 'videoCodec:radio-1', label: 'H.264', value: 'h264', description: '兼容性最好，支持几乎所有设备' },
        { key: 'videoCodec:radio-2', label: 'H.265', value: 'h265', description: '压缩率更高，近几年设备支持良好（推荐）' },
        { key: 'videoCodec:radio-3', label: 'AV1', value: 'av1', description: '最新编码格式，压缩率最高，但编码较慢' }
      ]
    },
    { description: 'B站推送相关', descPosition: 20 },
    {
      key: 'push.switch',
      label: '推送开关',
      description: '推送开关，修改后需重启；使用「#设置B站推送 + UID」配置推送列表',
      color: 'warning'
    },
    {
      key: 'push.permission',
      label: '谁可以设置推送',
      description: '修改后需重启',
      orientation: 'horizontal',
      color: 'warning',
      disabled: $not('push.switch'),
      radio: [
        { key: 'push.permission:radio-1', label: '所有人', value: 'all' },
        { key: 'push.permission:radio-2', label: '管理员', value: 'admin' },
        { key: 'push.permission:radio-3', label: '主人', value: 'master' },
        { key: 'push.permission:radio-4', label: '群主', value: 'group.owner' },
        { key: 'push.permission:radio-5', label: '群管理员', value: 'group.admin' }
      ]
    },
    {
      key: 'push.cron',
      type: 'text',
      label: '定时任务表达式',
      description: '定时推送的时间，格式为cron表达式（默认为每十分钟执行一次）',
      color: 'warning',
      disabled: $not('push.switch')
    },
    {
      key: 'push.parsedynamic',
      label: '作品解析',
      description: '触发推送时是否一同解析该作品',
      color: 'warning',
      disabled: $not('push.switch')
    },
    {
      key: 'push.pushVideoQuality',
      label: '解析视频动态时的画质偏好',
      description: '「作品解析」开启时生效，仅对视频动态有效',
      orientation: 'horizontal',
      disabled: $or($not('push.switch'), $not('push.parsedynamic')),
      color: 'warning',
      radio: [
        { key: 'push.pushVideoQuality:radio-1', label: '自动选择', value: '0' },
        { key: 'push.pushVideoQuality:radio-2', label: '240P 极速', value: '6' },
        { key: 'push.pushVideoQuality:radio-3', label: '360P 流畅', value: '16' },
        { key: 'push.pushVideoQuality:radio-4', label: '480P 清晰', value: '32', description: '需登录（配置ck）' },
        { key: 'push.pushVideoQuality:radio-5', label: '720P 高清', value: '64', description: '需登录（配置ck）' },
        { key: 'push.pushVideoQuality:radio-6', label: '720P60 高帧率', value: '74', description: '需登录（配置ck）' },
        { key: 'push.pushVideoQuality:radio-7', label: '1080P 高清', value: '80', description: '需登录（配置ck）' },
        { key: 'push.pushVideoQuality:radio-8', label: '1080P+ 高码率', value: '112', description: '需大会员&视频支持' },
        { key: 'push.pushVideoQuality:radio-9', label: '1080P60 高帧率', value: '116', description: '需大会员&视频支持' },
        { key: 'push.pushVideoQuality:radio-10', label: '4K 超清', value: '120', description: '需大会员&视频支持' },
        { key: 'push.pushVideoQuality:radio-11', label: '8K 超高清', value: '127', description: '需大会员&视频支持' }
      ]
    },
    {
      key: 'push.pushMaxAutoVideoSize',
      type: 'number',
      label: '视频动态的视频体积上限（MB）',
      description: '根据该值自动选择分辨率进行下载。仅在「解析视频动态时的画质偏好」 为 "自动选择" 且「作品解析」开启时生效，仅对视频动态有效',
      disabled: $or($not('push.switch'), $not('push.parsedynamic'), $ne('push.pushVideoQuality', '0')),
      color: 'warning',
      rules: [{ min: 1, max: 20000 }]
    }
  ]
}
