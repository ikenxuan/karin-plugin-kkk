import { getValue } from '../utils'
import type { ConfigPageProps } from './pageTypes'

const RequestConfigPage = ({ config, renderers, classes }: ConfigPageProps) => {
  const { renderPageHeader, renderSelectField, renderSubSection, renderSwitch, renderTextField } = renderers
  const proxyEnabled = getValue<boolean>(config, ['request', 'proxy', 'switch'], false)

  return (
    <>
      {renderPageHeader('请求', 'amagi 解析库的请求超时、UA 和代理配置。')}
      <div className={classes.topLevelFields} data-config-section>
        {renderTextField(['request', 'timeout'], '请求超时时间', '网络请求的超时时间，单位：毫秒。', {
          type: 'number',
          fallback: 15000,
          min: 1000,
          max: 300000
        })}
        {renderTextField(['request', 'User-Agent'], 'User-Agent', '请求头中的User-Agent字段，用于标识客户端类型。')}
      </div>
      {renderSubSection(
        '代理配置（可选）',
        <>
          {renderSwitch(['request', 'proxy', 'switch'], '代理开关', '开启后需要配置「代理主机」「代理端口」。')}
          {renderSelectField(
            ['request', 'proxy', 'protocol'],
            '代理协议',
            '代理服务使用的协议。',
            [
              { label: 'HTTP', value: 'http' },
              { label: 'HTTPS', value: 'https' }
            ],
            (value) => value,
            !proxyEnabled
          )}
          {renderTextField(['request', 'proxy', 'host'], '代理主机', '代理服务器的主机地址，如：127.0.0.1。', {
            disabled: !proxyEnabled
          })}
          {renderTextField(['request', 'proxy', 'port'], '代理端口', '代理服务器的端口号。', {
            type: 'number',
            fallback: 7890,
            min: 1,
            max: 65535,
            disabled: !proxyEnabled
          })}
          {renderTextField(['request', 'proxy', 'auth', 'username'], '代理用户名', '代理服务器的认证用户名（如果需要）。', {
            disabled: !proxyEnabled
          })}
          {renderTextField(['request', 'proxy', 'auth', 'password'], '代理密码', '代理服务器的认证密码（如果需要）。', {
            type: 'password',
            disabled: !proxyEnabled
          })}
        </>
      )}
    </>
  )
}

export default RequestConfigPage
