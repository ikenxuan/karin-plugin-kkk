import type { ConfigPageProps } from './pageTypes'

const CookiesConfigPage = ({ renderers }: ConfigPageProps) => {
  const { renderPageHeader, renderSubSection, renderTextField } = renderers

  return (
    <>
      {renderPageHeader('Cookies', '各平台 Cookie。保存后后端会重载 amagi 客户端。')}
      {renderSubSection(
        '平台 Cookies',
        <>
          {renderTextField(['cookies', 'douyin'], '抖音 Cookies', '请输入你的抖音Cookies，不输入则无法使用抖音相关功能噢。', {
            type: 'password'
          })}
          {renderTextField(['cookies', 'bilibili'], 'B站 Cookies', '请输入你的B站Cookies，不输入部分功能将受限噢。', {
            type: 'password'
          })}
          {renderTextField(['cookies', 'kuaishou'], '快手 Cookies', '请输入你的快手Cookies，不输入则无法使用快手相关功能噢。', {
            type: 'password'
          })}
          {renderTextField(['cookies', 'xiaohongshu'], '小红书 Cookies', '请输入你的小红书Cookies，不输入则无法使用小红书相关功能噢。', {
            type: 'password'
          })}
        </>
      )}
    </>
  )
}

export default CookiesConfigPage
