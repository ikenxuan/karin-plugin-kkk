import {
  bilibiliQualityOptions,
  danmakuAreaOptions,
  displayContentOptions,
  fontSizeOptions,
  permissionOptions,
  sendContentOptions,
  verticalModeOptions,
  videoCodecOptions
} from '../options'
import { getValue, includesValue } from '../utils'
import type { ConfigPageProps } from './pageTypes'

const BilibiliConfigPage = ({ config, renderers, classes }: ConfigPageProps) => {
  const { renderCheckboxGroup, renderCronField, renderPageHeader, renderSelectField, renderSubSection, renderSwitch, renderTextField } =
    renderers
  const bilibiliEnabled = getValue<boolean>(config, ['bilibili', 'switch'], false)
  const bilibiliSendContent = getValue<string[]>(config, ['bilibili', 'sendContent'], [])
  const bilibiliBurnDanmaku = getValue<boolean>(config, ['bilibili', 'burnDanmaku'], false)
  const bilibiliVideoQuality = getValue<number>(config, ['bilibili', 'videoQuality'], 0)
  const bilibiliVideoInfoMode = getValue<string>(config, ['bilibili', 'videoInfoMode'], 'text')
  const bilibiliPushEnabled = getValue<boolean>(config, ['bilibili', 'push', 'switch'], false)
  const bilibiliPushParsedynamic = getValue<boolean>(config, ['bilibili', 'push', 'parsedynamic'], false)
  const bilibiliPushQuality = getValue<number>(config, ['bilibili', 'push', 'pushVideoQuality'], 0)
  const commentDisabled = !bilibiliEnabled || !includesValue(bilibiliSendContent, 'comment')
  const danmakuDisabled = !bilibiliEnabled || !bilibiliBurnDanmaku

  return (
    <>
      {renderPageHeader('哔哩哔哩', 'B站解析、动态图片布局、弹幕和推送基础设置。')}
      <div className={classes.topLevelFields} data-config-section>
        {renderSwitch(['bilibili', 'switch'], '解析开关', 'B站解析开关，此开关为单独开关。')}
        {renderCheckboxGroup(
          ['bilibili', 'sendContent'],
          '解析时发送的内容',
          '若什么都不选，可能不会返回任何解析结果。',
          sendContentOptions.filter((item) => item.value !== 'image'),
          !bilibiliEnabled
        )}
      </div>
      {renderSubSection(
        '评论详情设置',
        <>
          {renderTextField(['bilibili', 'numcomment'], '评论解析数量', '主评论解析数量。', {
            type: 'number',
            fallback: 5,
            min: 1,
            disabled: commentDisabled
          })}
          {renderSwitch(['bilibili', 'realCommentCount'], '显示真实评论数量', '关闭则显示解析到的评论数量。', commentDisabled)}
          {renderSwitch(
            ['bilibili', 'commentImageCollection'],
            '是否收集评论区的图片',
            '开启后将收集评论区的图片，以合并转发的形式返回。',
            commentDisabled
          )}
        </>
      )}
      {renderSubSection(
        '渲染与画质设置',
        <>
          {renderSelectField(
            ['bilibili', 'videoQuality'],
            '画质偏好',
            '解析视频的分辨率偏好。',
            bilibiliQualityOptions,
            Number,
            !bilibiliEnabled
          )}
          {renderTextField(
            ['bilibili', 'maxAutoVideoSize'],
            '视频体积上限（MB）',
            '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效。',
            {
              type: 'number',
              fallback: 50,
              min: 1,
              max: 20000,
              disabled: !bilibiliEnabled || Number(bilibiliVideoQuality) !== 0
            }
          )}
          {renderSelectField(
            ['bilibili', 'imageLayout'],
            '解析图文动态时，遇到多张图片时的页面布局方式（动态推送图片也生效）',
            '自动布局：少于4张时逐张上下排列；4~8张时瀑布流；9张及以上九宫格。',
            [
              { label: '自动布局', value: 'auto' },
              { label: '逐张上下排列', value: 'vertical' },
              { label: '瀑布流排列', value: 'waterfall' },
              { label: '九宫格排列', value: 'grid' }
            ]
          )}
          {renderSelectField(
            ['bilibili', 'videoInfoMode'],
            '视频信息返回形式',
            '视频信息返回文本或图片。',
            [
              { label: '图片模式', value: 'image' },
              { label: '文本模式', value: 'text' }
            ],
            (value) => value,
            !bilibiliEnabled
          )}
          {renderCheckboxGroup(
            ['bilibili', 'displayContent'],
            '视频信息前返回的内容',
            '若什么都不选，则不会返回任何视频相关信息。',
            displayContentOptions,
            !bilibiliEnabled || bilibiliVideoInfoMode === 'image'
          )}
          {renderSwitch(
            ['bilibili', 'showDanmakuInVideoInfo'],
            '视频信息图片中显示弹幕',
            '开启后在视频信息图片的封面区域显示热门弹幕。关闭后不会请求弹幕数据，可提升解析速度。仅「视频信息返回形式」为图片模式时生效。',
            !bilibiliEnabled || bilibiliVideoInfoMode === 'text'
          )}
        </>
      )}
      {renderSubSection(
        '权限设置',
        <>{renderSelectField(['bilibili', 'loginPerm'], '谁可以触发扫码登录', '修改后需重启。', permissionOptions)}</>
      )}
      {renderSubSection(
        '弹幕烧录相关',
        <>
          {renderSwitch(
            ['bilibili', 'burnDanmaku'],
            '弹幕烧录',
            '将弹幕硬编码到视频画面中。开启后视频需要重新编码，耗时较长，高分辨率视频会占用较多资源。',
            !bilibiliEnabled
          )}
          {renderSelectField(
            ['bilibili', 'danmakuArea'],
            '弹幕区域',
            '限制弹幕的显示范围，避免遮挡视频主体内容。',
            danmakuAreaOptions,
            Number,
            danmakuDisabled
          )}
          {renderSelectField(
            ['bilibili', 'danmakuFontSize'],
            '弹幕字号',
            '弹幕文字大小。',
            fontSizeOptions,
            (value) => value,
            danmakuDisabled
          )}
          {renderTextField(['bilibili', 'danmakuOpacity'], '弹幕透明度', '0为完全透明，100为完全不透明，推荐70。', {
            type: 'number',
            fallback: 70,
            min: 0,
            max: 100,
            disabled: danmakuDisabled
          })}
          {renderSelectField(
            ['bilibili', 'verticalMode'],
            '竖屏适配',
            '模拟手机端竖屏观看体验，视频居中显示，上下黑边区域用于展示弹幕。',
            verticalModeOptions,
            (value) => value,
            danmakuDisabled
          )}
          {renderSelectField(
            ['bilibili', 'videoCodec'],
            '视频编码格式',
            '弹幕烧录时使用的视频编码格式，会自动检测硬件加速。',
            videoCodecOptions,
            (value) => value,
            danmakuDisabled
          )}
        </>
      )}
      {renderSubSection(
        'B站推送相关',
        <>
          {renderSwitch(['bilibili', 'push', 'switch'], '推送开关', '推送开关，修改后需重启；使用「#设置B站推送 + UID」配置推送列表。')}
          {renderSelectField(
            ['bilibili', 'push', 'permission'],
            '谁可以设置推送',
            '修改后需重启。',
            permissionOptions,
            (value) => value,
            !bilibiliPushEnabled
          )}
          {renderCronField(
            ['bilibili', 'push', 'cron'],
            '定时任务表达式',
            '定时推送的时间，支持可视化编辑或手动输入 cron 表达式。',
            !bilibiliPushEnabled
          )}
          {renderSwitch(['bilibili', 'push', 'parsedynamic'], '作品解析', '触发推送时是否一同解析该作品。', !bilibiliPushEnabled)}
          {renderSelectField(
            ['bilibili', 'push', 'pushVideoQuality'],
            '解析视频动态时的画质偏好',
            '「作品解析」开启时生效，仅对视频动态有效。',
            bilibiliQualityOptions.filter((item) => item.value !== '127'),
            Number,
            !bilibiliPushEnabled || !bilibiliPushParsedynamic
          )}
          {renderTextField(
            ['bilibili', 'push', 'pushMaxAutoVideoSize'],
            '视频动态的视频体积上限（MB）',
            '根据该值自动选择分辨率进行下载。仅在「解析视频动态时的画质偏好」 为 "自动选择" 且「作品解析」开启时生效，仅对视频动态有效。',
            {
              type: 'number',
              fallback: 50,
              min: 1,
              max: 20000,
              disabled: !bilibiliPushEnabled || !bilibiliPushParsedynamic || Number(bilibiliPushQuality) !== 0
            }
          )}
        </>
      )}
    </>
  )
}

export default BilibiliConfigPage
