import { components } from 'node-karin'

import { Config } from '@/module'
import { ConfigType } from '@/types'

const all = Config.All()

export default {
  info: {},
  /** 动态渲染的组件 */
  components: () => [
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
    components.divider.create('divider-1', {
      description: '插件应用相关'
    }),
    components.accordion.create('cfg.app', {
      children: [
        components.accordion.createItem('app', {
          title: '插件应用相关',
          className: 'ml-4 mr-4',
          subtitle: '此处用于管理插件的基本设置',
          children: [
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
            }),
            components.radio.group('cfg.app.Theme', {
              label: '渲染图片的主题色',
              orientation: 'horizontal',
              defaultValue: all.app.Theme.toString(),
              radio: [
                components.radio.create('cfg.app.Theme-1', {
                  label: '自动',
                  value: '0'
                }),
                components.radio.create('cfg.app.Theme-2', {
                  label: '浅色',
                  value: '1'
                }),
                components.radio.create('cfg.app.Theme-3', {
                  label: '深色',
                  value: '2'
                })
              ]
            })
          ]
        })
      ]
    }),
    components.divider.create('divider-2', {
      description: '插件应用相关'
    }),
    components.accordion.create('cfg.douyin', {
      children: [
        components.accordion.createItem('cookies', {
          title: '抖音相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为抖音相关的用户偏好设置',
          children: [
            components.switch.create('cfg.doubyin.switch', {
              startText: '解析开关',
              description: '抖音解析开关，此开关为单独开关',
              defaultSelected: all.douyin.switch
            }),
            components.switch.create('cfg.doubyin.tip', {
              startText: '解析提示',
              description: '抖音解析提示，发送提示信息：“检测到抖音链接，开始解析”',
              defaultSelected: all.douyin.tip
            }),
            components.switch.create('cfg.doubyin.switch', {
              startText: '评论解析',
              description: '抖音评论解析，开启后可发送抖音作品评论图',
              defaultSelected: all.douyin.comment
            }),
            components.input.number('cfg.app.defaulttool', {
              label: '评论解析数量',
              defaultValue: all.douyin.numcomment.toString(),
              rules: [{ min: 1 }]
            }),
            components.switch.create('cfg.doubyin.switch', {
              startText: '自动分辨率',
              description: '根据「视频拦截阈值」自动选择合适的分辨率，关闭后默认选择最大分辨率进行下载',
              defaultSelected: all.douyin.autoResolution
            }),
            components.divider.create('divider-dy-1', {
              description: '抖音推送相关'
            }),
            components.switch.create('cfg.doubyin.push.switch', {
              startText: '推送开关',
              description: '推送开关，开启后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表',
              defaultSelected: all.douyin.autoResolution
            })
          ]
        })
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
