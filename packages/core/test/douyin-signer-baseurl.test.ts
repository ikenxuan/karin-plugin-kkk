import { describe, expect, it } from 'vitest'

import { validateConfig } from '../../web/src/components/common/config-panel/validation'
import type { ConfigType } from '../../web/src/types/config'
import defaultConfig from '../config/default_config/config.json'
import { getDouyinAppSignerBaseUrl } from '../src/platform/douyin/appSignerUrl'

const validBaseUrls = [
  { input: 'http://127.0.0.1:8787', baseUrl: 'http://127.0.0.1:8787' },
  { input: '  https://SIGNER.EXAMPLE:443/  ', baseUrl: 'https://signer.example' },
  { input: 'http://localhost:80/', baseUrl: 'http://localhost' },
  { input: 'http://[::1]:8787/', baseUrl: 'http://[::1]:8787' }
]
const invalidBaseUrls = [
  'https://signer.example/v1/app/sign',
  'https://signer.example/v1/sign',
  'https://signer.example/v1/app/tt-encrypt',
  'https://signer.example/proxy',
  'https://signer.example/proxy/..',
  'https://signer.example//',
  'https://signer.example/?token=test',
  'https://signer.example?',
  'https://signer.example/#fragment',
  'https://signer.example#',
  'https://user:test@signer.example',
  'ftp://signer.example',
  ''
]

const configWithSigner = (signUrl: string): ConfigType => {
  const config = structuredClone(defaultConfig) as unknown as ConfigType
  config.laboratory.douyinApp.commandParse = true
  config.laboratory.douyinApp.signUrl = signUrl
  return config
}

describe('抖音签名地址使用 base URL', () => {
  it.each(validBaseUrls)('核心将 $input 规范为 $baseUrl', ({ input, baseUrl }) => {
    expect(getDouyinAppSignerBaseUrl(input)).toBe(baseUrl)
  })

  it.each(invalidBaseUrls)('核心拒绝不是服务根地址的 %s', (input) => {
    expect(() => getDouyinAppSignerBaseUrl(input)).toThrow(/base URL/)
  })

  it.each(validBaseUrls)('WebUI 接受 $input，保持 signUrl 字段', ({ input }) => {
    const config = configWithSigner(input)
    expect(validateConfig(config)).not.toHaveProperty('laboratory.douyinApp.signUrl')
    expect(config.laboratory.douyinApp.signUrl).toBe(input)
  })

  it.each(invalidBaseUrls)('WebUI 将 %s 的错误挂到原配置字段', (input) => {
    expect(validateConfig(configWithSigner(input))).toHaveProperty('laboratory.douyinApp.signUrl', expect.stringMatching(/base URL/))
  })

  it('功能关闭时仍允许空的签名地址', () => {
    const config = configWithSigner('')
    config.laboratory.douyinApp.commandParse = false
    expect(validateConfig(config)).not.toHaveProperty('laboratory.douyinApp.signUrl')
  })
})
