import {
  danmakuAreaOptions,
  displayContentOptions,
  fontSizeOptions,
  permissionOptions,
  qualityOptions,
  sendContentOptions,
  verticalModeOptions,
  videoCodecOptions
} from '../options'
import { getValue, includesValue } from '../utils'
import type { ConfigPageProps } from './pageTypes'

const DouyinConfigPage = ({ config, renderers, classes }: ConfigPageProps) => {
  const { renderCheckboxGroup, renderCronField, renderPageHeader, renderSelectField, renderSubSection, renderSwitch, renderTextField } =
    renderers
  const appLivePhotoMode = getValue<string>(config, ['app', 'livePhotoMode'], 'video_and_livephoto')
  const douyinEnabled = getValue<boolean>(config, ['douyin', 'switch'], false)
  const douyinSendContent = getValue<string[]>(config, ['douyin', 'sendContent'], [])
  const douyinBurnDanmaku = getValue<boolean>(config, ['douyin', 'burnDanmaku'], false)
  const douyinVideoQuality = getValue<string>(config, ['douyin', 'videoQuality'], 'adapt')
  const douyinVideoInfoMode = getValue<string>(config, ['douyin', 'videoInfoMode'], 'text')
  const douyinPushEnabled = getValue<boolean>(config, ['douyin', 'push', 'switch'], false)
  const douyinPushQuality = getValue<string>(config, ['douyin', 'push', 'pushVideoQuality'], 'adapt')
  const commentDisabled = !douyinEnabled || !includesValue(douyinSendContent, 'comment')
  const danmakuDisabled = !douyinEnabled || !douyinBurnDanmaku

  return (
    <>
      {renderPageHeader('抖音', '抖音解析、画质、弹幕和推送基础设置。')}
      <div className={classes.topLevelFields} data-config-section>
        {renderSwitch(['douyin', 'switch'], '解析开关', '抖音解析开关，此开关为单独开关。')}
        {renderCheckboxGroup(
          ['douyin', 'sendContent'],
          '解析时发送的内容',
          '若什么都不选，可能不会返回任何解析结果。',
          sendContentOptions.filter((item) => item.value !== 'image'),
          !douyinEnabled
        )}
      </div>
      {renderSubSection(
        '评论详情设置',
        <>
          {renderTextField(['douyin', 'numcomment'], '评论解析数量', '主评论解析数量。', {
            type: 'number',
            fallback: 5,
            min: 1,
            disabled: commentDisabled
          })}
          {renderTextField(
            ['douyin', 'subCommentLimit'],
            '子评论请求数量',
            '单条主评论下请求的子评论总条数（含多层嵌套）。注意：UI中最多显示 6 层回复嵌套，超出部分会被隐藏；因实际嵌套深度不可预知，配置数量不代表最终可见数量。',
            { type: 'number', fallback: 5, min: 1, max: 20, disabled: commentDisabled }
          )}
          {renderSwitch(
            ['douyin', 'commentImageCollection'],
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
            ['douyin', 'liveImageMergeMode'],
            '合辑 Live 图 BGM 合并方式',
            '合辑 Live 图 BGM 合并方式，仅 Live Photo 模式不是「仅实况图」时生效。',
            [
              { label: '连续', value: 'continuous', description: 'BGM 接续播放，结束后自动循环' },
              { label: '独立', value: 'independent', description: '每张图 BGM 从头开始' }
            ],
            (value) => value,
            !douyinEnabled || appLivePhotoMode === 'livephoto_only'
          )}
          {renderSelectField(
            ['douyin', 'videoQuality'],
            '画质偏好',
            '解析视频的分辨率偏好。',
            qualityOptions,
            (value) => value,
            !douyinEnabled
          )}
          {renderTextField(
            ['douyin', 'maxAutoVideoSize'],
            '视频体积上限（MB）',
            '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效。',
            {
              type: 'number',
              fallback: 50,
              min: 1,
              max: 20000,
              disabled: !douyinEnabled || douyinVideoQuality !== 'adapt'
            }
          )}
          {renderSelectField(
            ['douyin', 'videoInfoMode'],
            '视频信息返回形式',
            '视频信息返回文本或图片。',
            [
              { label: '图片模式', value: 'image' },
              { label: '文本模式', value: 'text' }
            ],
            (value) => value,
            !douyinEnabled
          )}
          {renderCheckboxGroup(
            ['douyin', 'displayContent'],
            '视频信息的内容',
            '若什么都不选，则不会返回任何视频相关信息。',
            displayContentOptions.filter((item) => item.value !== 'desc'),
            !douyinEnabled || douyinVideoInfoMode === 'image'
          )}
        </>
      )}
      {renderSubSection(
        '权限设置',
        <>{renderSelectField(['douyin', 'loginPerm'], '谁可以触发扫码登录', '修改后需重启。', permissionOptions)}</>
      )}
      {renderSubSection(
        '弹幕烧录相关',
        <>
          {renderSwitch(
            ['douyin', 'burnDanmaku'],
            '弹幕烧录',
            '将弹幕硬编码到视频画面中。开启后视频需要重新编码，耗时较长。',
            !douyinEnabled
          )}
          {renderSelectField(
            ['douyin', 'danmakuArea'],
            '弹幕显示区域',
            '限制弹幕范围，避免遮挡视频主体。',
            danmakuAreaOptions,
            Number,
            danmakuDisabled
          )}
          {renderSelectField(
            ['douyin', 'danmakuFontSize'],
            '弹幕字号',
            '弹幕文字大小。',
            fontSizeOptions,
            (value) => value,
            danmakuDisabled
          )}
          {renderTextField(['douyin', 'danmakuOpacity'], '弹幕透明度', '0为完全透明，100为完全不透明，推荐70。', {
            type: 'number',
            fallback: 70,
            min: 0,
            max: 100,
            disabled: danmakuDisabled
          })}
          {renderSelectField(
            ['douyin', 'verticalMode'],
            '竖屏适配',
            '针对横屏视频，模拟手机端竖屏观看体验，视频居中显示，上下黑边区域用于展示弹幕。',
            verticalModeOptions,
            (value) => value,
            danmakuDisabled
          )}
          {renderSelectField(
            ['douyin', 'videoCodec'],
            '视频编码格式',
            '烧录弹幕后的视频编码格式。',
            videoCodecOptions,
            (value) => value,
            danmakuDisabled
          )}
        </>
      )}
      {renderSubSection(
        '抖音推送相关',
        <>
          {renderSwitch(['douyin', 'push', 'switch'], '推送开关', '推送开关，修改后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表。')}
          {renderSelectField(
            ['douyin', 'push', 'permission'],
            '谁可以设置推送',
            '修改后需重启。',
            permissionOptions,
            (value) => value,
            !douyinPushEnabled
          )}
          {renderCronField(
            ['douyin', 'push', 'cron'],
            '定时任务表达式',
            '定时推送的时间，支持可视化编辑或手动输入 cron 表达式。',
            !douyinPushEnabled
          )}
          {renderSwitch(['douyin', 'push', 'parsedynamic'], '作品解析', '触发推送时是否一同解析该作品。', !douyinPushEnabled)}
          {renderSelectField(
            ['douyin', 'push', 'shareType'],
            '推送图二维码的类型',
            '推送图二维码识别后的跳转类型。',
            [
              { label: '网页链接', value: 'web', description: '识别后访问抖音官网对应的作品地址' },
              { label: '下载链接', value: 'download', description: '识别后访问无水印作品下载地址' }
            ],
            (value) => value,
            !douyinPushEnabled
          )}
          {renderSelectField(
            ['douyin', 'push', 'pushVideoQuality'],
            '画质偏好',
            '推送解析时解析视频的分辨率偏好。',
            qualityOptions,
            (value) => value,
            !douyinPushEnabled
          )}
          {renderTextField(
            ['douyin', 'push', 'pushMaxAutoVideoSize'],
            '视频体积上限（MB）',
            '推送解析时根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效。',
            {
              type: 'number',
              fallback: 50,
              min: 1,
              max: 20000,
              disabled: !douyinPushEnabled || douyinPushQuality !== 'adapt'
            }
          )}
        </>
      )}
    </>
  )
}

export default DouyinConfigPage
