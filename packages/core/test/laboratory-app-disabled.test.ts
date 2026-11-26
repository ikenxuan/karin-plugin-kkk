import { describe, expect, it } from 'vitest'

import { getDisabledTooltip } from '../../web/src/config/disabledRules'
import type { ConfigType } from '../../web/src/types/config'
import defaultConfig from '../config/default_config/config.json'

const createConfig = (): ConfigType => structuredClone(defaultConfig) as unknown as ConfigType

describe('抖音 App 实验室开关依赖', () => {
  it.each(['commandParse', 'dailyWork', 'appComments'] as const)('签名地址为空时禁用 %s', (feature) => {
    const config = createConfig()
    expect(getDisabledTooltip(config, ['laboratory', 'douyinApp', feature])).toContain('URL签名地址')
  })

  it('未启用抖音解析时禁用所有 App 实验室功能', () => {
    const config = createConfig()
    config.laboratory.douyinApp.signUrl = 'http://127.0.0.1:8787'
    config.douyin.switch = false

    expect(getDisabledTooltip(config, ['laboratory', 'douyinApp', 'commandParse'])).toContain('解析开关')
    expect(getDisabledTooltip(config, ['laboratory', 'douyinApp', 'dailyWork'])).toContain('解析开关')
    expect(getDisabledTooltip(config, ['laboratory', 'douyinApp', 'appComments'])).toContain('解析开关')
  })

  it('未勾选「评论图」时禁用 App 评论区，恢复选项后解除禁用', () => {
    const config = createConfig()
    config.laboratory.douyinApp.signUrl = 'http://127.0.0.1:8787'
    config.douyin.sendContent = ['info', 'video']

    expect(getDisabledTooltip(config, ['laboratory', 'douyinApp', 'appComments'])).toContain('评论图')

    config.douyin.sendContent = ['info', 'comment', 'video']
    expect(getDisabledTooltip(config, ['laboratory', 'douyinApp', 'appComments'])).toBe('')
  })
})
