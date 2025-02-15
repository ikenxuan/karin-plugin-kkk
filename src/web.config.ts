import { components } from 'node-karin'

import { Config } from '@/module'
import { ConfigType } from '@/types'

const all = Config.All()

export default {
  info: {},
  /** 动态渲染的组件 */
  components: () => [
    // 手风琴
    components.accordion.create('cfg.cookies', {
      children: [
        components.accordion.createItem('cookies', {
          title: 'Cookies 相关',
          className: 'ml-4 mr-4',
          subtitle: '建议配置，否则大部分功能无法使用',
          children: [
            components.input.string('cfg.cookies.douyin', {
              label: '抖音',
              isRequired: true,
              type: 'text',
              description: '请输入你的抖音Cookies，不输入则无法使用抖音相关功能噢',
              defaultValue: all.cookies.douyin,
              isClearable: true,
              placeholder: ''
            }),
            components.input.string('cfg.cookies.bilibili', {
              label: 'B站',
              fullWidth: true,
              isRequired: true,
              type: 'password',
              description: '请输入你的B站Cookies，不输入则无法使用B站相关功能噢',
              defaultValue: all.cookies.bilibili,
              placeholder: '',
              errorMessage: '请填写一个有效的 B站 Cookies'
            }),
            components.input.string('cfg.cookies.kuaishou', {
              label: '快手',
              isRequired: true,
              type: 'password',
              description: '请输入你的快手Cookies，不输入则无法使用快手相关功能噢',
              defaultValue: all.cookies.kuaishou,
              isClearable: true,
              placeholder: ''
            })
          ]
        })
      ]
    }),
    // 基础用法
    components.divider.create('divider-1', {
      description: '插件应用相关',
      orientation: 'vertical'
    }),
    // 开关
    components.switch.create('cfg.app.rmmp4', {
      startText: '缓存删除',
      description: '缓存自动删除，非必要不修改！',
      defaultSelected: all.app.rmmp4
    }),
    components.switch.create('cfg.app.defaulttool', {
      startText: '默认解析',
      description: '即识别最高优先级，修改后重启生效',
      defaultSelected: all.app.defaulttool
    }),
    components.input.number('cfg.app.defaulttool', {
      label: '渲染精度',
      description: '可选值50~200，建议100。设置高精度会提高图片的精细度，过高可能会影响渲染与发送速度',
      defaultValue: all.app.renderScale.toString(),
      rules: [
        {
          min: 50,
          max: 200
        }
      ]
    }),
    components.switch.create('cfg.app.APIServer', {
      startText: 'API服务',
      description: '本地部署一个视频解析API服务，接口范围为本插件用到的所有',
      defaultSelected: all.app.APIServer
    }),
    components.input.number('cfg.app.defaulttool', {
      label: 'API服务端口',
      defaultValue: all.app.APIServerPort.toString(),
      rules: [
        {
          min: 1024,
          max: 65535,
          error: '请输入一个范围在 1024 到 65535 之间的数字'
        }
      ]
    })
  ],

  /** 前端点击保存之后调用的方法 */
  save: (config: ConfigType) => {
    console.log(config)
    return {
      success: true,
      message: '还在写。。。Ciallo～(∠・ω< )⌒☆'
    }
  }
}
