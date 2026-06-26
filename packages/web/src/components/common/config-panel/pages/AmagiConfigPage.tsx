import { getValue } from '../utils'
import type { ConfigPageProps } from './pageTypes'

const AmagiConfigPage = ({ config, renderers }: ConfigPageProps) => {
  const { renderPageHeader, renderSelectField, renderSubSection, renderSwitch, renderTextField } = renderers
  const proxyEnabled = getValue<boolean>(config, ['amagi', 'proxy', 'switch'], false)
  const apiServerEnabled = getValue<boolean>(config, ['amagi', 'APIServer'], false)

  return (
    <>
      {renderPageHeader('接口库配置', '接口库的 Cookies、请求、代理和 API 服务配置。保存后后端会重载接口库客户端。')}
      {renderSubSection(
        '平台 Cookies',
        <>
          {renderTextField(['amagi', 'cookies', 'douyin'], '抖音 Cookies', '请输入你的抖音Cookies，不输入则无法使用抖音相关功能噢。', {
            type: 'password'
          })}
          {renderTextField(['amagi', 'cookies', 'bilibili'], 'B站 Cookies', '请输入你的B站Cookies，不输入部分功能将受限噢。', {
            type: 'password'
          })}
          {renderTextField(['amagi', 'cookies', 'kuaishou'], '快手 Cookies', '请输入你的快手Cookies，不输入则无法使用快手相关功能噢。', {
            type: 'password'
          })}
          {renderTextField(
            ['amagi', 'cookies', 'xiaohongshu'],
            '小红书 Cookies',
            '请输入你的小红书Cookies，不输入则无法使用小红书相关功能噢。',
            {
              type: 'password'
            }
          )}
        </>
      )}
      {renderSubSection(
        '请求配置',
        <>
          {renderTextField(['amagi', 'timeout'], '请求超时时间', '网络请求的超时时间，单位：毫秒。', {
            type: 'number',
            fallback: 15000,
            min: 1000,
            max: 300000
          })}
          {renderTextField(['amagi', 'User-Agent'], 'User-Agent', '请求头中的User-Agent字段，用于标识客户端类型。')}
        </>
      )}
      {renderSubSection(
        '代理配置（可选）',
        <>
          {renderSwitch(['amagi', 'proxy', 'switch'], '代理开关', '开启后需要配置「代理主机」「代理端口」。')}
          {renderSelectField(
            ['amagi', 'proxy', 'protocol'],
            '代理协议',
            '代理服务使用的协议。',
            [
              { label: 'HTTP', value: 'http' },
              { label: 'HTTPS', value: 'https' }
            ],
            (value) => value,
            !proxyEnabled
          )}
          {renderTextField(['amagi', 'proxy', 'host'], '代理主机', '代理服务器的主机地址，如：127.0.0.1。', {
            disabled: !proxyEnabled
          })}
          {renderTextField(['amagi', 'proxy', 'port'], '代理端口', '代理服务器的端口号。', {
            type: 'number',
            fallback: 7890,
            min: 1,
            max: 65535,
            disabled: !proxyEnabled
          })}
          {renderTextField(['amagi', 'proxy', 'auth', 'username'], '代理用户名', '代理服务器的认证用户名（如果需要）。', {
            disabled: !proxyEnabled
          })}
          {renderTextField(['amagi', 'proxy', 'auth', 'password'], '代理密码', '代理服务器的认证密码（如果需要）。', {
            type: 'password',
            disabled: !proxyEnabled
          })}
        </>
      )}
      {renderSubSection(
        'API 服务配置',
        <>
          {renderSwitch(['amagi', 'APIServer'], 'API 服务', '本地部署一个视频解析API服务，接口范围为本插件用到的所有。')}
          {renderSwitch(
            ['amagi', 'APIServerMount'],
            '挂载到 Karin',
            'API 服务是否挂载到 Karin 上，开启后监听端口为 Karin 的 http 端口，修改后需重启。需开启「API服务」。',
            !apiServerEnabled
          )}
          {renderTextField(['amagi', 'APIServerPort'], 'API 服务端口', '仅未挂载到 Karin 时生效。', {
            type: 'number',
            disabled: getValue<boolean>(config, ['amagi', 'APIServerMount'], true),
            fallback: 4567,
            min: 1024,
            max: 65535
          })}
        </>
      )}
    </>
  )
}

export default AmagiConfigPage
