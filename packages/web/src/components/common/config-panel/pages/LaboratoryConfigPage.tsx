import { getDisabledTooltip } from '../../../../config/disabledRules'
import type { ConfigPageProps } from './pageTypes'

const LaboratoryConfigPage = ({ config, renderers }: ConfigPageProps) => {
  const { renderPageHeader, renderSubSection, renderSwitch, renderTextField } = renderers
  const commandParsePath = ['laboratory', 'douyinApp', 'commandParse']
  const dailyWorkPath = ['laboratory', 'douyinApp', 'dailyWork']
  const appCommentsPath = ['laboratory', 'douyinApp', 'appComments']

  return (
    <>
      {renderPageHeader('实验室', '按需开启实验功能。')}
      {renderSubSection(
        '抖音APP特性',
        <>
          {renderTextField(['laboratory', 'douyinApp', 'signUrl'], 'URL签名地址', '抖音 App 特性共用的签名服务 HTTP(S) base URL。', {
            placeholder: 'http://127.0.0.1:8787'
          })}
          {renderSwitch(
            commandParsePath,
            '口令解析',
            '识别并解析 App 分享口令。会检查所有消息，可能延迟其他插件处理。',
            Boolean(getDisabledTooltip(config, commandParsePath))
          )}
          {renderSwitch(
            dailyWorkPath,
            '日常作品解析',
            '单作品详情改用 App work 接口。',
            Boolean(getDisabledTooltip(config, dailyWorkPath))
          )}
          {renderSwitch(
            appCommentsPath,
            'APP评论区',
            '改用 App 评论接口，支持单条多图与 Live Photo。',
            Boolean(getDisabledTooltip(config, appCommentsPath))
          )}
        </>
      )}
    </>
  )
}

export default LaboratoryConfigPage
