import { permissionOptions, qualityOptions, sendContentOptions } from '../options'
import { getValue, includesValue } from '../utils'
import type { ConfigPageProps } from './pageTypes'

const XiaohongshuConfigPage = ({ config, renderers, classes }: ConfigPageProps) => {
  const { renderCheckboxGroup, renderPageHeader, renderSelectField, renderSubSection, renderSwitch, renderTextField } = renderers
  const xiaohongshuEnabled = getValue<boolean>(config, ['xiaohongshu', 'switch'], false)
  const xiaohongshuSendContent = getValue<string[]>(config, ['xiaohongshu', 'sendContent'], [])
  const xiaohongshuVideoQuality = getValue<string>(config, ['xiaohongshu', 'videoQuality'], 'adapt')

  return (
    <>
      {renderPageHeader('小红书', '小红书解析基础设置。')}
      <div className={classes.topLevelFields} data-config-section>
        {renderSwitch(['xiaohongshu', 'switch'], '解析开关', '小红书解析开关，此开关为单独开关。')}
        {renderCheckboxGroup(
          ['xiaohongshu', 'sendContent'],
          '解析时发送的内容',
          '若什么都不选，可能不会返回任何解析结果。',
          sendContentOptions,
          !xiaohongshuEnabled
        )}
        {renderTextField(['xiaohongshu', 'numcomment'], '评论解析数量', '小红书评论解析数量。', {
          type: 'number',
          fallback: 5,
          min: 1,
          disabled: !xiaohongshuEnabled || !includesValue(xiaohongshuSendContent, 'comment')
        })}
        {renderTextField(
          ['xiaohongshu', 'subCommentLimit'],
          '子评论请求数量',
          '大于 2 时需要配置小红书 ck（平台不允许游客获取二级评论）。',
          {
            type: 'number',
            fallback: 2,
            min: 2,
            max: 20,
            disabled: !xiaohongshuEnabled || !includesValue(xiaohongshuSendContent, 'comment')
          }
        )}
      </div>
      {renderSubSection(
        '渲染与画质设置',
        <>
          {renderSelectField(
            ['xiaohongshu', 'videoQuality'],
            '画质偏好',
            '解析视频的分辨率偏好。',
            qualityOptions,
            (value) => value,
            !xiaohongshuEnabled
          )}
          {renderTextField(
            ['xiaohongshu', 'maxAutoVideoSize'],
            '视频体积上限（MB）',
            '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效。',
            {
              type: 'number',
              fallback: 50,
              min: 1,
              max: 20000,
              disabled: !xiaohongshuEnabled || xiaohongshuVideoQuality !== 'adapt'
            }
          )}
        </>
      )}
      {renderSubSection(
        '权限设置',
        <>{renderSelectField(['xiaohongshu', 'loginPerm'], '谁可以触发扫码登录', '修改后需重启。', permissionOptions)}</>
      )}
    </>
  )
}

export default XiaohongshuConfigPage
