import type { ConfigPageProps } from './pageTypes'

const LaboratoryConfigPage = ({ renderers }: ConfigPageProps) => {
  const { renderPageHeader, renderSubSection, renderSwitch, renderTextField } = renderers

  return (
    <>
      {renderPageHeader('实验室', '按需开启实验功能。')}
      {renderSubSection(
        '消息 Hooks',
        <>
          {renderSwitch(
            ['laboratory', 'messageHooks', 'switch'],
            '抖音口令解析',
            '识别消息中的抖音 App 分享口令，自动解析对应作品。需开启抖音解析，保存后即时生效。'
          )}
          {renderTextField(
            ['laboratory', 'messageHooks', 'signUrl'],
            '签名地址',
            '填写可访问的 App 签名接口完整地址，包含 /v1/app/sign 路径。',
            {
              placeholder: 'https://example.com/v1/app/sign'
            }
          )}
        </>
      )}
    </>
  )
}

export default LaboratoryConfigPage
