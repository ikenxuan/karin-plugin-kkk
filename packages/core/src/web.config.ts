import os from 'node:os'

import { components, defineConfig } from 'node-karin'
import _ from 'node-karin/lodash'

import { Root } from '@/module'
import { Config } from '@/module/utils/Config'
import { BilibiliWeb } from '@/platform/bilibili/web.config'
import { DouyinWeb } from '@/platform/douyin/web.config'
import { KuaishouWeb } from '@/platform/kuaishou/web.config'
import { XiaohongshuWeb } from '@/platform/xiaohongshu/web.config'
import { type ConfigType } from '@/types'

/**
 * 获取本机局域网 IP 地址
 * 优先返回常见局域网网段的 IP（192.168.x.x, 10.x.x.x, 172.16-31.x.x）
 */
function getLocalIP(): string {
  const interfaces = os.networkInterfaces()
  const candidates: string[] = []

  for (const name of Object.keys(interfaces)) {
    const netInterface = interfaces[name]
    if (!netInterface) continue
    for (const net of netInterface) {
      if (net.family === 'IPv4' && !net.internal) {
        candidates.push(net.address)
      }
    }
  }

  // 优先选择常见局域网网段
  const preferredIP = candidates.find(ip => {
    if (ip.startsWith('192.168.')) return true
    if (ip.startsWith('10.')) return true
    if (ip.startsWith('172.')) {
      const second = parseInt(ip.split('.')[1], 10)
      if (second >= 16 && second <= 31) return true
    }
    return false
  })

  return preferredIP || candidates[0] || '127.0.0.1'
}

/** 基础配置的类型 */
type BaseConfigType = {
  [key in keyof Omit<ConfigType, 'pushlist'>]: ConfigType[key]
}

/** 推送列表配置的类型，要单独处理 */
type PushConfigType = {
  'pushlist:douyin': ConfigType['pushlist']['douyin']
  'pushlist:bilibili': ConfigType['pushlist']['bilibili']
}

/** 前端传回来新配置的类型 */
type newConfigType = BaseConfigType & PushConfigType

export const webConfig = defineConfig({
  info: {
    id: 'karin-plugin-kkk',
    name: 'kkk插件',
    description: `Karin 的「抖音」「B站」视频解析/动态推送插件。v${Root.pluginVersion}`,
    icon: {
      name: 'radio_button_checked',
      color: '#F31260'
    },
    version: Root.pluginVersion,
    author: [
      {
        name: 'ikenxuan',
        home: 'https://github.com/ikenxuan',
        avatar: 'https://github.com/ikenxuan.png'
      },
      {
        name: 'sj817',
        home: 'https://github.com/sj817',
        avatar: 'https://github.com/sj817.png'
      }
    ]
  },
  components: async () => {
    const all = await Config.All()

    return [
      components.accordion.create('cookies', {
        label: 'Cookies 相关',
        children: [
          components.accordion.createItem('cfg:cookies', {
            title: 'Cookies 相关',
            className: 'ml-4 mr-4',
            subtitle: '建议配置，否则大部分功能无法使用，此部分修改后需重启方可生效！',
            children: [
              components.input.string('douyin', {
                label: '抖音',
                type: 'text',
                description: '请输入你的抖音Cookies，不输入则无法使用抖音相关功能噢',
                defaultValue: all.cookies.douyin,
                placeholder: '',
                rules: undefined,
                isRequired: false
              }),
              components.input.string('bilibili', {
                label: 'B站',
                type: 'text',
                description: '请输入你的B站Cookies，不输入则无法使用B站相关功能噢',
                defaultValue: all.cookies.bilibili,
                placeholder: '',
                rules: undefined,
                isRequired: false
              }),
              components.input.string('kuaishou', {
                label: '快手',
                type: 'text',
                description: '请输入你的快手Cookies，不输入则无法使用快手相关功能噢',
                defaultValue: all.cookies.kuaishou,
                placeholder: '',
                rules: undefined,
                isRequired: false
              }),
              components.input.string('xiaohongshu', {
                label: '小红书',
                type: 'text',
                description: '请输入你的小红书Cookies，不输入则无法使用小红书相关功能噢',
                defaultValue: all.cookies.xiaohongshu,
                placeholder: '',
                rules: undefined,
                isRequired: false
              })
            ]
          })
        ]
      }),
      components.accordion.create('app', {
        label: '插件应用相关',
        children: [
          components.accordion.createItem('cfg:app', {
            title: '插件应用相关',
            className: 'ml-4 mr-4',
            subtitle: '此处用于管理插件的基本设置',
            children: [
              components.divider.create('divider-app-cache', {
                description: '缓存设置',
                descPosition: 20
              }),
              components.switch.create('removeCache', {
                label: '缓存删除',
                description: '下载的视频缓存自动删除，非必要不修改！',
                defaultSelected: all.app.removeCache
              }),
              components.divider.create('divider-app-priority', {
                description: '解析优先级设置',
                descPosition: 20
              }),
              components.switch.create('videoTool', {
                label: '默认解析',
                description: '即识别最高优先级，修改后重启生效',
                defaultSelected: all.app.videoTool
              }),
              components.input.number('priority', {
                label: '自定义优先级',
                description: '自定义优先级，「默认解析」关闭后才会生效。修改后重启生效',
                defaultValue: all.app.priority.toString(),
                isDisabled: all.app.videoTool,
                rules: undefined
              }),
              components.divider.create('divider-app-render', {
                description: '渲染配置',
                descPosition: 20
              }),
              components.input.number('renderScale', {
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
              components.radio.group('Theme', {
                label: '渲染图片的主题色',
                orientation: 'horizontal',
                defaultValue: all.app.Theme.toString(),
                radio: [
                  components.radio.create('Theme-1', {
                    label: '自动',
                    description: '06:00-18:00为浅色，18:00-06:00为深色',
                    value: '0'
                  }),
                  components.radio.create('Theme-2', {
                    label: '浅色',
                    value: '1'
                  }),
                  components.radio.create('Theme-3', {
                    label: '深色',
                    value: '2'
                  })
                ]
              }),
              components.switch.create('RemoveWatermark', {
                label: '移除水印',
                description: '渲染的图片是否移除底部水印',
                defaultSelected: all.app.RemoveWatermark
              }),
              components.input.number('RenderWaitTime', {
                label: '渲染图片的等待时间',
                description: os.platform() === 'linux' ? '单位：秒，Linux系统下不能为0' : '单位：秒，传递 0 可禁用',
                defaultValue: all.app.RenderWaitTime.toString(),
                rules: [
                  os.platform() === 'linux'
                    ? { min: 1, error: 'Linux系统下渲染等待时间不能为0' }
                    : { min: 0 }
                ]
              }),
              components.switch.create('multiPageRender', {
                label: '分页渲染',
                description: '将模板渲染成多页的图片，以降低渲染器压力，默认开启，非必要不修改！',
                defaultSelected: all.app.multiPageRender
              }),
              components.input.number('multiPageHeight', {
                label: '分页渲染时，每页的高度',
                description: '经测试最佳每页高度为12000px，默认12000px',
                defaultValue: all.app.multiPageHeight.toString(),
                isDisabled: !all.app.multiPageRender,
                rules: [
                  { min: 1000, max: 20000, error: '请输入一个范围在 1000 到 20000 之间的数字' }
                ]
              }),
              components.divider.create('divider-app-api', {
                description: 'API服务配置',
                descPosition: 20
              }),
              components.switch.create('APIServer', {
                label: 'API服务',
                description: '本地部署一个视频解析API服务，接口范围为本插件用到的所有',
                defaultSelected: all.app.APIServer
              }),
              components.switch.create('APIServerMount', {
                label: '挂载到 Karin',
                description: 'API 服务是否挂载到 Karin 上，开启后监听端口为 Karin 的 http 端口，修改后需重启。需开启「API服务」',
                defaultSelected: all.app.APIServerMount,
                isDisabled: !all.app.APIServer
              }),
              components.input.number('APIServerPort', {
                label: 'API服务端口',
                defaultValue: all.app.APIServerPort.toString(),
                isDisabled: all.app.APIServerMount,
                rules: [
                  {
                    min: 1024,
                    max: 65535,
                    error: '请输入一个范围在 1024 到 65535 之间的数字'
                  }
                ]
              }),
              components.divider.create('divider-app-interaction', {
                description: '交互与认证设置',
                descPosition: 20
              }),
              components.switch.create('EmojiReply', {
                label: '表情回应',
                description: '在解析任务开始时添加表情回应，若适配器不支持需要关闭',
                defaultSelected: all.app.EmojiReply
              }),
              components.input.number('EmojiReplyID', {
                label: '表情 ID',
                isDisabled: !all.app.EmojiReply,
                description: '详情查看：https://koishi.js.org/QFace/#/qqnt 中调试信息的 emojiId 字段，Emoji则是 qcid ',
                defaultValue: all.app.EmojiReplyID.toString(),
                rules: [
                  { min: 0, max: 1145141919810 }
                ]
              }),
              components.switch.create('EmojiReplyIgnoreError', {
                label: '忽略表情回应失败',
                description: '开启后表情回应失败时不会抛出错误，程序会继续执行',
                defaultSelected: all.app.EmojiReplyIgnoreError,
                isDisabled: !all.app.EmojiReply
              }),
              components.checkbox.group('errorLogSendTo', {
                label: '错误日志',
                description: '遇到错误时谁会收到错误日志。注：推送任务只可发送给主人。',
                orientation: 'horizontal',
                defaultValue: all.app.errorLogSendTo,
                checkbox: [
                  components.checkbox.create('errorLogSendTo:checkbox:1', {
                    label: '除\'console\'外的第一个主人',
                    value: 'master'
                  }),
                  components.checkbox.create('errorLogSendTo:checkbox:2', {
                    label: '触发者（不支持私聊）',
                    value: 'trigger'
                  })
                ]
              }),
              components.divider.create('divider-app-qrlogin', {
                description: '我的小玩具配置',
                descPosition: 20
              }),
              components.radio.group('qrLoginAddrType', {
                label: '扫码登录地址类型',
                description: '生成登录二维码时使用的服务器地址',
                orientation: 'horizontal',
                defaultValue: all.app.qrLoginAddrType || 'lan',
                radio: [
                  components.radio.create('qrLoginAddrType-lan', {
                    label: `局域网（${getLocalIP()}）`,
                    description: '适用于手机和服务器在同一局域网',
                    value: 'lan'
                  }),
                  components.radio.create('qrLoginAddrType-external', {
                    label: '外部地址',
                    description: '适用于远程访问，需手动配置',
                    value: 'external'
                  })
                ]
              }),
              components.input.string('qrLoginExternalAddr', {
                label: '外部访问地址',
                type: 'text',
                description: '公网 IP 或域名，如：123.45.67.89 或 example.com',
                defaultValue: all.app.qrLoginExternalAddr || '',
                placeholder: '请输入公网 IP 或域名',
                isDisabled: all.app.qrLoginAddrType !== 'external',
                isRequired: false
              })
            ]
          })
        ]
      }),
      ...DouyinWeb(all),
      ...BilibiliWeb(all),
      ...KuaishouWeb(all),
      ...XiaohongshuWeb(all),
      components.accordion.create('upload', {
        label: '视频上传和下载相关',
        children: [
          components.accordion.createItem('cfg:upload', {
            title: '上传和下载相关',
            className: 'ml-4 mr-4',
            subtitle: '此处为视频上传和下载相关的用户偏好设置',
            children: [
              components.divider.create('divider-upload-method', {
                description: '发送方式配置',
                descPosition: 20
              }),
              components.switch.create('sendbase64', {
                label: '转换Base64',
                description: '发送视频经本插件转换为base64格式后再发送，适合Karin与机器人不在同一网络环境下开启。与「群文件上传」互斥。',
                defaultSelected: all.upload.sendbase64,
                isDisabled: all.upload.usegroupfile
              }),
              components.switch.create('usegroupfile', {
                label: '群文件上传',
                description: '使用群文件上传，开启后会将视频文件上传到群文件中，需配置「群文件上传阈值」。与「转换Base64」互斥',
                defaultSelected: all.upload.usegroupfile,
                isDisabled: all.upload.sendbase64
              }),
              components.input.number('groupfilevalue', {
                label: '群文件上传阈值',
                description: '当文件大小超过该值时将使用群文件上传，单位：MB，「使用群文件上传」开启后才会生效',
                defaultValue: all.upload.groupfilevalue.toString(),
                rules: [{ min: 1 }],
                isDisabled: !all.upload.usegroupfile || all.upload.sendbase64
              }),
              components.divider.create('divider-upload-limit', {
                description: '上传拦截配置',
                descPosition: 20
              }),
              components.switch.create('usefilelimit', {
                label: '视频上传拦截',
                description: '开启后会根据视频文件大小判断是否需要上传，需配置「视频拦截阈值」。',
                defaultSelected: all.upload.usefilelimit
              }),
              components.input.number('filelimit', {
                label: '视频拦截阈值',
                description: '视频文件大于该数值则直接结束任务，不会上传，单位: MB，「视频上传拦截」开启后才会生效。',
                defaultValue: all.upload.filelimit.toString(),
                rules: [{ min: 1 }],
                isDisabled: !all.upload.usefilelimit
              }),
              components.divider.create('divider-upload-compress', {
                description: '视频压缩配置',
                descPosition: 20
              }),
              components.switch.create('compress', {
                label: '压缩视频',
                description: '开启后会将视频文件压缩后再上传，适合上传大文件，任务过程中会吃满CPU，对低配服务器不友好。需配置「压缩触发阈值」与「压缩后的值」',
                defaultSelected: all.upload.compress
              }),
              components.input.number('compresstrigger', {
                label: '压缩触发阈值',
                description: '触发视频压缩的阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「压缩视频」开启后才会生效',
                defaultValue: all.upload.compresstrigger.toString(),
                rules: [{ min: 1 }],
                isDisabled: !all.upload.compress
              }),
              components.input.number('compressvalue', {
                label: '压缩后的值',
                description: '单位：MB，若视频文件大小大于「压缩触发阈值」的值，则会进行压缩至该值（±5%），「压缩视频」开启后才会生效',
                defaultValue: all.upload.compressvalue.toString(),
                rules: [{ min: 1 }],
                isDisabled: !all.upload.compress
              }),
              components.divider.create('divider-upload-throttle', {
                description: '下载限速配置',
                descPosition: 20
              }),
              components.switch.create('downloadThrottle', {
                label: '下载限速',
                description: '开启后会限制下载速度，避免触发服务器风控导致连接被重置（ECONNRESET）。如果下载时经常报错"连接被重置"，建议开启',
                defaultSelected: all.upload.downloadThrottle
              }),
              components.input.number('downloadMaxSpeed', {
                label: '最大下载速度',
                description: '单位：MB/s，建议设置为 5-20 之间。设置过高可能触发风控，设置过低会影响下载体验',
                defaultValue: all.upload.downloadMaxSpeed.toString(),
                rules: [{ min: 1, max: 1000, error: '请输入一个范围在 1 到 1000 之间的数字' }],
                isDisabled: !all.upload.downloadThrottle
              }),
              components.switch.create('downloadAutoReduce', {
                label: '断流自动降速',
                description: '当检测到连接被重置时自动降低下载速度，每次断流后速度会降低到当前的 60%',
                defaultSelected: all.upload.downloadAutoReduce,
                isDisabled: !all.upload.downloadThrottle
              }),
              components.input.number('downloadMinSpeed', {
                label: '最低下载速度',
                description: '单位：MB/s，自动降速时不会低于此值',
                defaultValue: all.upload.downloadMinSpeed.toString(),
                rules: [{ min: 0.1, max: 100, error: '请输入一个范围在 0.1 到 100 之间的数字' }],
                isDisabled: !all.upload.downloadThrottle || !all.upload.downloadAutoReduce
              })
            ]
          })
        ]
      }),
      components.accordion.create('request', {
        label: '解析库请求配置相关',
        children: [
          components.accordion.createItem('cfg:request', {
            title: '解析库请求配置相关',
            className: 'ml-4 mr-4',
            subtitle: '此处用于管理解析库的网络请求配置',
            children: [
              components.input.number('timeout', {
                label: '请求超时时间',
                description: '网络请求的超时时间，单位：毫秒',
                defaultValue: all.request.timeout.toString(),
                rules: [
                  {
                    min: 1000,
                    max: 300000,
                    error: '请输入一个范围在 1000 到 300000 之间的数字'
                  }
                ]
              }),
              components.input.string('User-Agent', {
                label: 'User-Agent',
                type: 'text',
                description: '请求头中的User-Agent字段，用于标识客户端类型',
                defaultValue: all.request['User-Agent'],
                placeholder: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                rules: undefined,
                isRequired: false
              }),
              components.divider.create('divider-proxy', {
                description: '代理配置（可选）',
                descPosition: 20
              }),
              components.switch.create('proxy:switch', {
                label: '代理开关',
                description: '开启后需要配置「代理主机」「代理端口」',
                defaultSelected: all.request.proxy?.switch
              }),
              components.input.string('proxy:host', {
                label: '代理主机',
                type: 'text',
                description: '代理服务器的主机地址，如：127.0.0.1',
                defaultValue: all.request.proxy?.host || '',
                placeholder: '127.0.0.1',
                rules: undefined,
                isDisabled: !all.request.proxy?.switch
              }),
              components.input.number('proxy:port', {
                label: '代理端口',
                description: '代理服务器的端口号',
                defaultValue: all.request.proxy?.port?.toString() || '',
                rules: [
                  {
                    min: 1,
                    max: 65535,
                    error: '请输入一个范围在 1 到 65535 之间的数字'
                  }
                ],
                isDisabled: !all.request.proxy?.switch
              }),
              components.radio.group('proxy:protocol', {
                label: '代理协议',
                orientation: 'horizontal',
                defaultValue: all.request.proxy?.protocol || 'http',
                radio: [
                  components.radio.create('proxy-protocol-1', {
                    label: 'HTTP',
                    value: 'http'
                  }),
                  components.radio.create('proxy-protocol-2', {
                    label: 'HTTPS',
                    value: 'https'
                  })
                ],
                isDisabled: !all.request.proxy?.switch
              }),
              components.input.string('proxy:auth:username', {
                label: '代理用户名',
                type: 'text',
                description: '代理服务器的认证用户名（如果需要）',
                defaultValue: all.request.proxy?.auth?.username || '',
                placeholder: '',
                rules: undefined,
                isRequired: false,
                isDisabled: !all.request.proxy?.switch
              }),
              components.input.string('proxy:auth:password', {
                label: '代理密码',
                type: 'password',
                description: '代理服务器的认证密码（如果需要）',
                defaultValue: all.request.proxy?.auth?.password || '',
                placeholder: '',
                rules: undefined,
                isRequired: false,
                isDisabled: !all.request.proxy?.switch
              })
            ]
          })
        ]
      }),
      components.divider.create('divider-7', {
        description: '抖音推送列表相关',
        descPosition: 20
      }),
      components.accordionPro.create(
        'pushlist:douyin',
        all.pushlist.douyin.map((item) => {
          return {
            ...item,
            title: item.remark,
            subtitle: item.short_id
          }
        }),
        {
          label: '抖音推送列表',
          children: components.accordion.createItem('accordion-item-douyin', {
            className: 'ml-4 mr-4',
            children: [
              components.switch.create('switch', {
                label: '是否启用',
                description: '是否启用该订阅项',
                color: 'warning'
              }),
              components.input.string('short_id', {
                placeholder: '',
                label: '抖音号',
                description: '抖音号, 必填',
                errorMessage: '抖音号不能为空 Ciallo～(∠・ω< )⌒☆',
                color: 'warning'
              }),
              components.input.group('group_id', {
                label: '绑定推送群',
                maxRows: 2,
                data: [],
                template: components.input.string('accordion-item-douyin:push:douyin:group_id', {
                  placeholder: '必填，不能出现空值',
                  label: '群号:机器人账号',
                  color: 'warning',
                  rules: [
                    {
                      regex: /.+:.+/,
                      error: '请使用 `群号:机器人账号` 的格式'
                    }
                  ]
                })
              }),
              components.input.string('sec_uid', {
                color: 'default',
                placeholder: '可不填，会自动获取',
                label: 'UID',
                isRequired: false,
                description: '获取方法：PC浏览器打开某个博主主页，https://www.douyin.com/user/MS4wLj..... 其中的user/后的即为UID'
              }),
              components.input.string('remark', {
                color: 'default',
                placeholder: '可不填，会自动获取',
                label: '昵称',
                isRequired: false,
                description: '博主的抖音名称'
              }),
              components.divider.create('push:douyin:divider-1', {
                description: '过滤系统',
                descPosition: 20
              }),
              components.radio.group('filterMode', {
                label: '过滤模式',
                orientation: 'horizontal',
                color: 'warning',
                radio: [
                  components.radio.create('push:bilibili:filterMode.radio-1', {
                    label: '黑名单模式',
                    description: '命中以下内容时，不推送',
                    value: 'blacklist'
                  }),
                  components.radio.create('push:bilibili:filterMode.radio-2', {
                    label: '白名单模式',
                    description: '命中以下内容时，才推送',
                    value: 'whitelist'
                  })
                ]
              }),
              components.input.group('Keywords', {
                label: '关键词',
                maxRows: 2,
                itemsPerRow: 4,
                data: [],
                template: components.input.string('push:bilibili:filterKeywords', {
                  placeholder: '严禁提交空值',
                  label: '',
                  color: 'warning'
                })
              }),
              components.input.group('Tags', {
                label: '标签',
                maxRows: 2,
                itemsPerRow: 4,
                data: [],
                template: components.input.string('push:bilibili:filterTags', {
                  placeholder: '严禁提交空值',
                  label: '',
                  color: 'warning'
                })
              })
            ]
          })
        }
      ),
      components.divider.create('divider-8', {
        description: 'B站推送列表相关',
        descPosition: 20
      }),
      components.accordionPro.create(
        'pushlist:bilibili',
        all.pushlist.bilibili.map((item) => {
          return {
            ...item,
            title: item.remark,
            subtitle: item.host_mid
          }
        }),
        {
          label: 'B站推送列表',
          children: components.accordion.createItem('accordion-item-bilibili', {
            className: 'ml-4 mr-4',
            children: [
              components.switch.create('switch', {
                label: '是否启用',
                description: '是否启用该订阅项',
                color: 'warning'
              }),
              components.input.number('host_mid', {
                placeholder: '',
                label: 'UID',
                rules: undefined,
                description: 'B站用户的UID，必填',
                errorMessage: 'UID 不能为空 Ciallo～(∠・ω< )⌒☆',
                color: 'warning'
              }),
              components.input.group('group_id', {
                label: '绑定推送群',
                maxRows: 2,
                data: [],
                template: components.input.string('accordion-item-bilibili:push:bilibili:group_id', {
                  placeholder: '必填，不能出现空值',
                  label: '',
                  color: 'warning',
                  rules: [
                    {
                      regex: /.+:.+/,
                      error: '请使用 `群号:机器人账号` 的格式'
                    }
                  ]
                })
              }),
              components.input.string('remark', {
                color: 'default',
                placeholder: '可不填，会自动获取',
                label: '昵称',
                isRequired: false,
                description: 'UP主的昵称'
              }),
              components.radio.group('filterMode', {
                label: '过滤模式',
                orientation: 'horizontal',
                color: 'warning',
                radio: [
                  components.radio.create('push:bilibili:filterMode.radio-1', {
                    label: '黑名单模式',
                    description: '命中以下内容时，不推送',
                    value: 'blacklist'
                  }),
                  components.radio.create('push:bilibili:filterMode.radio-2', {
                    label: '白名单模式',
                    description: '命中以下内容时，才推送',
                    value: 'whitelist'
                  })
                ]
              }),
              components.input.group('Keywords', {
                label: '关键词',
                maxRows: 2,
                itemsPerRow: 4,
                data: [],
                description: '关键词，多个则使用逗号隔开',
                template: components.input.string('push:bilibili:filterKeywords', {
                  placeholder: '严禁提交空值',
                  label: '',
                  color: 'warning'
                })
              }),
              components.input.group('Tags', {
                label: '标签',
                maxRows: 2,
                itemsPerRow: 4,
                data: [],
                template: components.input.string('push:bilibili:filterTags', {
                  placeholder: '严禁提交空值',
                  label: '',
                  color: 'warning'
                })
              })
            ]
          })
        }
      )
    ]
  },

  /** 前端点击保存之后调用的方法 */
  save: async (config: newConfigType) => {
    const formatCfg = processFrontendData(config)
    const oldAllCfg = await Config.All()
    const mergeCfg = _.mergeWith({}, oldAllCfg, formatCfg, customizer)

    // 使用通用的扁平化字段清理方法
    cleanFlattenedFields(mergeCfg)

    let success = false
    let isChange = false

    for (const key of Object.keys(mergeCfg) as Array<keyof ConfigType>) {
      const configValue = mergeCfg[key]

      // 检查配置是否有效且不为空
      if (configValue &&
        typeof configValue === 'object' &&
        Object.keys(configValue).length > 0) {
        isChange = deepEqual(configValue, oldAllCfg[key])
        if (isChange) {
          const modifySuccess = await Config.ModifyPro(key, configValue)
          if (modifySuccess) {
            success = true
          }
        }
      }
    }

    await Config.syncConfigToDatabase()

    return {
      mergeCfg,
      formatCfg,
      success,
      message: success ? '保存成功 Ciallo～(∠・ω< )⌒☆' : '配置无变化 Ciallo～(∠・ω< )⌒☆'
    }
  }
})

export default webConfig

/**
 * 遇到数组时用新数组覆盖原始数组（而不是合并）
 * @param value 原始内容
 * @param srcValue 新内容
 * @returns
 */
const customizer = (value: any, srcValue: any) => {
  if (Array.isArray(srcValue)) {
    return srcValue // 直接返回新数组（覆盖旧数组）
  }
}

/**
 * 归递判断配置是否修改
 * @param a 前端传回来的配置
 * @param b 用户原本的配置
 * @returns 配置对象是否被修改
 */
const deepEqual = (a: any, b: any): boolean => {
  // 如果两个值严格相等，说明没有修改
  if (a === b) {
    return false
  }

  // 如果 a 和 b 都是字符串，比较是否相等
  if (typeof a === 'string' && typeof b === 'string') {
    if (a !== b) return true
  }

  // 如果 a 和 b 都是数字，比较是否相等
  if (typeof a === 'number' && typeof b === 'number') {
    if (a !== b) return true
  }

  // 如果 a 和 b 都是布尔值，比较是否相等
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    if (a !== b) return true
  }

  // 如果其中一个为 null 或者不是对象/数组，说明有修改
  if (a === null || b === null || typeof a !== typeof b) {
    return true
  }

  // 如果 a 和 b 都是数组
  if (Array.isArray(a) && Array.isArray(b)) {
    // 如果数组长度不同，说明有修改
    if (a.length !== b.length) {
      return true
    }

    // 递归比较数组中的每个元素
    for (let i = 0; i < a.length; i++) {
      if (deepEqual(a[i], b[i])) {
        return true // 如果某个元素有修改，返回 true
      }
    }
  }

  let isChange = false
  // 如果 a 和 b 都是对象
  if (typeof a === 'object' && typeof b === 'object') {
    if (isChange) return true
    // 获取两个对象的键
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    // 如果键的数量不同，说明对象结构有修改
    if (keysA.length !== keysB.length) {
      return true
    }

    // 遍历对象 a 的键
    for (const key of keysA) {
      // 如果 b 中没有该键，或者递归比较 a[key] 和 b[key] 有修改
      if (!keysB.includes(key)) {
        isChange = true
        return true // 如果 b 中没有该键，返回 true
      }

      // 如果 a[key] 和 b[key] 不相等，返回 true
      if (deepEqual(a[key], b[key])) {
        isChange = true
        return true
      }
    }
  }

  // 如果所有检查都没有发现修改，返回 false
  return false
}

/**
 * str 转 num
 * @param value 字符串
 * @returns
 */
const convertToNumber = (value: string): any => {
  // 检查字符串是否为有效的数字
  if (/^\d+$/.test(value)) {
    const num = parseInt(value, 10)
    return num
  } else return value
}
/**
 * 获取数组中的第一个对象，如果数组为空则返回空对象
 * @param arr 数组
 * @returns 数组中的第一个对象或空对象
 */
const getFirstObject = <T> (arr: T[]): T => {
  return arr.length > 0 ? arr[0] : {} as T
}

/**
 * 设置嵌套属性值
 * @param obj 目标对象
 * @param keys 键路径数组
 * @param value 要设置的值
 */
const setNestedProperty = (obj: any, keys: string[], value: any) => {
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }

  const lastKey = keys[keys.length - 1]
  current[lastKey] = value
}

/**
 * 处理前端返回的数据，将其转换为 ConfigType 格式
 * @param data 前端返回的数据
 * @returns 处理后符合 ConfigType 格式的数据
 */
const processFrontendData = (data: newConfigType): ConfigType => {
  const result: Partial<Record<keyof ConfigType, any>> = {}

  const configKeys = Object.keys(data).filter((key): key is keyof BaseConfigType => {
    return !key.includes('pushlist') && key in data
  })

  for (const key of configKeys) {
    const value = data[key]
    const firstObj = Array.isArray(value) ? getFirstObject(value) : {}

    // 检查是否有有效数据
    const objKeys = Object.keys(firstObj)
    if (objKeys.length === 0) {
      continue // 跳过空对象
    }

    // 初始化配置对象
    const configObj: Record<string, any> = {}
    let hasValidData = false

    // 先处理所有嵌套字段
    const nestedProps = objKeys.filter(prop => prop.includes(':'))
    const flatProps = objKeys.filter(prop => !prop.includes(':'))

    // 处理嵌套字段
    for (const prop of nestedProps) {
      let propValue = firstObj[prop]
      if (typeof propValue === 'string') {
        propValue = convertToNumber(propValue)
      }

      if (propValue !== undefined && propValue !== null) {
        const keys = prop.split(':')
        setNestedProperty(configObj, keys, propValue)
        hasValidData = true
      }
    }

    // 处理扁平字段
    for (const prop of flatProps) {
      let propValue = firstObj[prop]
      if (typeof propValue === 'string') {
        propValue = convertToNumber(propValue)
      }

      if (propValue !== undefined && propValue !== null) {
        configObj[prop] = propValue
        hasValidData = true
      }
    }

    // 只有当有有效数据时才添加到结果中
    if (hasValidData && Object.keys(configObj).length > 0) {
      result[key] = configObj
    }
  }

  // 处理pushlist
  result.pushlist = {
    douyin: data['pushlist:douyin'] || [],
    bilibili: (data['pushlist:bilibili'] || []).map(item => {
      return {
        ...item,
        host_mid: Number(item.host_mid)
      }
    })
  }

  return result as ConfigType
}

/**
 * 通用的扁平化字段清理函数
 * 自动检测并清理与嵌套结构冲突的扁平化字段
 * @param obj 要清理的对象
 */
const cleanFlattenedFields = (obj: any): void => {
  if (!obj || typeof obj !== 'object') return

  for (const [, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // 递归处理嵌套对象
      cleanFlattenedFields(value)

      // 类型断言确保value是一个对象
      const valueObj = value as Record<string, any>

      // 收集所有扁平化字段（包含点号的字段）
      const flattenedKeys = Object.keys(valueObj).filter(k => k.includes('.'))

      for (const flatKey of flattenedKeys) {
        const parts = flatKey.split('.')

        // 检查是否存在对应的嵌套结构
        if (hasNestedStructure(valueObj, parts)) {
          // 删除扁平化字段
          delete valueObj[flatKey]
        }
      }
    }
  }
}

/**
 * 检查对象中是否存在指定路径的嵌套结构
 * @param obj 要检查的对象
 * @param path 路径数组
 * @returns 是否存在嵌套结构
 */
const hasNestedStructure = (obj: Record<string, any>, path: string[]): boolean => {
  let current = obj

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]
    if (!current[key] || typeof current[key] !== 'object') {
      return false
    }
    current = current[key]
  }

  // 检查最后一个键是否存在
  const lastKey = path[path.length - 1]
  return lastKey in current
}
