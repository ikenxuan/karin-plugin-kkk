import { components, defineConfig } from 'node-karin'
import _ from 'node-karin/lodash'

import { Config } from '@/module'
import { ConfigType } from '@/types'

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

const all = await Config.All()

export default defineConfig({
  info: {
    id: 'karin-plugin-kkk',
    name: 'karin-plugin-kkk',
    description: 'Karin 的「抖音」「B站」「快手」视频解析/动态推送插件',
    icon: {
      name: 'tag',
      color: '#EAC452'
    },
    author: [
      {
        name: 'ikenxuan',
        home: 'https://github.com/ikenxuan',
        avatar: 'https://avatars.githubusercontent.com/u/112480306'
      }
    ]
  },
  components: () => [
    components.accordion.create('cookies', {
      label: 'Cookies 相关',
      children: [
        components.accordion.createItem('cfg:cookies', {
          title: 'Cookies 相关',
          className: 'ml-4 mr-4',
          subtitle: '建议配置，否则大部分功能无法使用',
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
            components.switch.create('rmmp4', {
              label: '缓存删除',
              description: '缓存自动删除，非必要不修改！',
              defaultSelected: all.app.rmmp4
            }),
            components.switch.create('defaulttool', {
              label: '默认解析',
              description: '即识别最高优先级，修改后重启生效',
              defaultSelected: all.app.defaulttool
            }),
            components.input.number('priority', {
              label: '自定义优先级',
              description: '自定义优先级，「默认解析」关闭后才会生效。修改后重启生效',
              defaultValue: all.app.priority.toString(),
              isDisabled: all.app.defaulttool,
              rules: undefined
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
            components.switch.create('APIServer', {
              label: 'API服务',
              description: '本地部署一个视频解析API服务，接口范围为本插件用到的所有',
              defaultSelected: all.app.APIServer
            }),
            components.switch.create('APIServerMount', {
              label: '挂载到 Karin',
              description: 'API 服务是否挂载到 Karin 上，开启后监听端口为 Karin 的 http 端口，修改后需重启',
              defaultSelected: all.app.APIServerMount
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
              description: '单位：秒，传递 0 可禁用',
              defaultValue: all.app.RenderWaitTime.toString(),
              rules: [
                { min: 0 }
              ]
            }),
            components.switch.create('EmojiReply', {
              label: '表情回应',
              description: '在解析任务开始时添加表情回应',
              defaultSelected: all.app.EmojiReply
            }),
            components.input.number('EmojiReplyID', {
              label: '表情 ID',
              isDisabled: !all.app.EmojiReply,
              description: '详情查看：https://github.com/NapNeko/NapCatQQ/blob/main/src/core/external/face_config.json 的 QCid 字段',
              defaultValue: all.app.EmojiReplyID.toString(),
              rules: [
                { min: 0, max: 1145141919810 }
              ]
            })
          ]
        })
      ]
    }),
    components.accordion.create('douyin', {
      label: '抖音相关',
      children: [
        components.accordion.createItem('cfg:douyin', {
          title: '抖音相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为抖音相关的用户偏好设置',
          children: [
            components.switch.create('switch', {
              label: '解析开关',
              description: '抖音解析开关，此开关为单独开关',
              defaultSelected: all.douyin.switch
            }),
            components.switch.create('tip', {
              label: '解析提示',
              description: '抖音解析提示，发送提示信息：“检测到抖音链接，开始解析”',
              defaultSelected: all.douyin.tip
            }),
            components.switch.create('comment', {
              label: '评论解析',
              description: '抖音评论解析，开启后可发送抖音作品评论图',
              defaultSelected: all.douyin.comment
            }),
            components.input.number('numcomment', {
              label: '评论解析数量',
              defaultValue: all.douyin.numcomment.toString(),
              rules: [{ min: 1 }]
            }),
            components.switch.create('autoResolution', {
              label: '自动分辨率',
              description: '根据「视频拦截阈值」自动选择合适的分辨率，关闭后默认选择最大分辨率进行下载',
              defaultSelected: all.douyin.autoResolution
            }),
            components.radio.group('loginPerm', {
              label: '谁可以触发扫码登录',
              description: '修改后需重启',
              orientation: 'horizontal',
              defaultValue: all.douyin.loginPerm,
              radio: [
                components.radio.create('permission:radio-1', {
                  label: '所有人',
                  value: 'all'
                }),
                components.radio.create('permission:radio-2', {
                  label: '管理员',
                  value: 'admin'
                }),
                components.radio.create('permission:radio-3', {
                  label: '主人',
                  value: 'master'
                }),
                components.radio.create('permission:radio-4', {
                  label: '群主',
                  value: 'group.owner'
                }),
                components.radio.create('permission:radio-5', {
                  label: '群管理员',
                  value: 'group.admin'
                })
              ]
            }),
            components.divider.create('divider-dy-1', {
              description: '抖音推送相关',
              descPosition: 20
            }),
            components.switch.create('push:switch', {
              label: '推送开关',
              description: '推送开关，开启后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表',
              defaultSelected: all.douyin.push.switch
            }),
            components.radio.group('push:permission', {
              label: '谁可以设置推送',
              description: '修改后需重启',
              orientation: 'horizontal',
              defaultValue: all.douyin.push.permission,
              radio: [
                components.radio.create('push:permission:radio-1', {
                  label: '所有人',
                  value: 'all'
                }),
                components.radio.create('push:permission:radio-2', {
                  label: '管理员',
                  value: 'admin'
                }),
                components.radio.create('push:permission:radio-3', {
                  label: '主人',
                  value: 'master'
                }),
                components.radio.create('push:permission:radio-4', {
                  label: '群主',
                  value: 'group.owner'
                }),
                components.radio.create('push:permission:radio-5', {
                  label: '群管理员',
                  value: 'group.admin'
                })
              ]
            }),
            components.input.string('push:cron', {
              label: '定时任务表达式',
              description: '定时推送的时间，格式为cron表达式（默认为每十分钟执行一次）',
              defaultValue: all.douyin.push.cron
            }),
            components.switch.create('push:parsedynamic', {
              label: '作品解析',
              description: '触发推送时是否一同解析该作品',
              defaultSelected: all.douyin.push.parsedynamic
            }),
            components.switch.create('push:log', {
              label: '推送日志',
              description: '是否打印推送日志（修改后需重启）',
              defaultSelected: all.douyin.push.log
            }),
            components.radio.group('push:shareType', {
              label: '推送图二维码的类型',
              orientation: 'horizontal',
              defaultValue: all.douyin.push.shareType,
              radio: [
                components.radio.create('push:shareType.radio-1', {
                  label: '网页链接',
                  description: '识别后访问抖音官网对应的作品地址',
                  value: 'web'
                }),
                components.radio.create('push:shareType.radio-2', {
                  description: '识别后访问无水印作品下载地址',
                  label: '下载链接',
                  value: 'download'
                })
              ]
            })
          ]
        })
      ]
    }),
    components.accordion.create('bilibili', {
      label: 'B站相关',
      children: [
        components.accordion.createItem('cfg:bilibili', {
          title: 'B站相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为B站相关的用户偏好设置',
          children: [
            components.switch.create('switch', {
              label: '解析开关',
              description: 'B站解析开关，此开关为单独开关',
              defaultSelected: all.bilibili.switch
            }),
            components.switch.create('tip', {
              label: '解析提示',
              description: 'B站解析提示，发送提示信息：“检测到B站链接，开始解析”',
              defaultSelected: all.bilibili.tip
            }),
            components.switch.create('comment', {
              label: '评论解析',
              description: 'B站评论解析，开启后可发送B站作品评论图',
              defaultSelected: all.bilibili.comment
            }),
            components.input.number('numcomment', {
              label: '评论解析数量',
              defaultValue: all.bilibili.numcomment.toString(),
              rules: [{ min: 1 }]
            }),
            components.switch.create('videopriority', {
              label: '优先保内容',
              description: '解析视频是否优先保内容，true为优先保证上传将使用最低分辨率，false为优先保清晰度将使用最高分辨率',
              defaultSelected: all.bilibili.videopriority
            }),
            components.switch.create('autoResolution', {
              label: '自动分辨率',
              description: '根据「视频拦截阈值」自动选择合适的分辨率，关闭后默认选择最大分辨率进行下载',
              defaultSelected: all.bilibili.autoResolution
            }),
            components.radio.group('loginPerm', {
              label: '谁可以触发扫码登录',
              description: '修改后需重启',
              orientation: 'horizontal',
              defaultValue: all.bilibili.loginPerm,
              radio: [
                components.radio.create('permission:radio-1', {
                  label: '所有人',
                  value: 'all'
                }),
                components.radio.create('permission:radio-2', {
                  label: '管理员',
                  value: 'admin'
                }),
                components.radio.create('permission:radio-3', {
                  label: '主人',
                  value: 'master'
                }),
                components.radio.create('permission:radio-4', {
                  label: '群主',
                  value: 'group.owner'
                }),
                components.radio.create('permission:radio-5', {
                  label: '群管理员',
                  value: 'group.admin'
                })
              ]
            }),
            components.divider.create('divider-bilibili-1', {
              description: 'B站推送相关',
              descPosition: 20
            }),
            components.switch.create('push:switch', {
              label: '推送开关',
              description: '推送开关，开启后需重启；使用「#设置B站推送 + UID」配置推送列表',
              defaultSelected: all.bilibili.push.switch
            }),
            components.radio.group('push:permission', {
              label: '谁可以设置推送',
              description: '修改后需重启',
              orientation: 'horizontal',
              defaultValue: all.bilibili.push.permission,
              radio: [
                components.radio.create('push:permission:radio-1', {
                  label: '所有人',
                  value: 'all'
                }),
                components.radio.create('push:permission:radio-2', {
                  label: '管理员',
                  value: 'admin'
                }),
                components.radio.create('push:permission:radio-3', {
                  label: '主人',
                  value: 'master'
                }),
                components.radio.create('push:permission:radio-4', {
                  label: '群主',
                  value: 'group.owner'
                }),
                components.radio.create('push:permission:radio-5', {
                  label: '群管理员',
                  value: 'group.admin'
                })
              ]
            }),
            components.input.string('push:cron', {
              label: '定时任务表达式',
              description: '定时推送的时间，格式为cron表达式（默认为每十分钟执行一次）',
              defaultValue: all.bilibili.push.cron
            }),
            components.switch.create('push:parsedynamic', {
              label: '作品解析',
              description: '触发推送时是否一同解析该作品',
              defaultSelected: all.bilibili.push.parsedynamic
            }),
            components.switch.create('push:log', {
              label: '推送日志',
              description: '是否打印推送日志（修改后需重启）',
              defaultSelected: all.bilibili.push.log
            })
          ]
        })
      ]
    }),
    components.accordion.create('kuaishou', {
      label: '快手相关',
      children: [
        components.accordion.createItem('cfg:kuaishou', {
          title: '快手相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为快手相关的用户偏好设置',
          children: [
            components.switch.create('switch', {
              label: '解析开关',
              description: '快手解析开关，此开关为单独开关',
              defaultSelected: all.kuaishou.switch
            }),
            components.switch.create('tip', {
              label: '解析提示',
              description: '抖音解析提示，发送提示信息：“检测到快手链接，开始解析”',
              defaultSelected: all.kuaishou.tip
            }),
            components.switch.create('comment', {
              label: '评论解析',
              description: '快手评论解析，开启后可发送抖音作品评论图',
              defaultSelected: all.kuaishou.comment
            }),
            components.input.number('numcomment', {
              label: '评论解析数量',
              defaultValue: all.kuaishou.numcomment.toString(),
              rules: [{ min: 1 }]
            })
          ]
        })
      ]
    }),
    components.accordion.create('upload', {
      label: '视频文件上传相关',
      children: [
        components.accordion.createItem('cfg:upload', {
          title: '上传相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为上传相关的用户偏好设置',
          children: [
            components.switch.create('sendbase64', {
              label: '转换Base64',
              description: '发送视频经本插件转换为base64格式后再发送，适合Karin与机器人不在同一网络环境下开启',
              defaultSelected: all.upload.swisendbase64tch
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
            components.switch.create('usegroupfile', {
              label: '群文件上传',
              description: '使用群文件上传，开启后会将视频文件上传到群文件中，需配置「群文件上传阈值」',
              defaultSelected: all.upload.usegroupfile
            }),
            components.input.number('groupfilevalue', {
              label: '群文件上传阈值',
              description: '当文件大小超过该值时将使用群文件上传，单位：MB，「使用群文件上传」开启后才会生效',
              defaultValue: all.upload.groupfilevalue.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.upload.usegroupfile
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
            components.input.string('short_id', {
              placeholder: '',
              label: '抖音号',
              description: '抖音号, 必填',
              errorMessage: '抖音号不能为空 Ciallo～(∠・ω< )⌒☆'
            }),
            components.input.group('group_id', {
              label: '推送群号和机器人账号',
              maxRows: 2,
              data: [],
              template: components.input.string('accordion-item-douyin:push:douyin:group_id', {
                placeholder: '必填，不能出现空值',
                label: '',
                color: 'default',
                description: '推送群号和机器人账号，多个则使用逗号隔开，必填。如：群号1:机器人账号1',
                errorMessage: '你不设置群号和Bot号，我怎么知道你要用什么推送给谁呢？'
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
              // defaultValue: all.douyin.push.filterMode,
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
                color: 'primary'
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
                color: 'primary'
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
            components.input.number('host_mid', {
              placeholder: '',
              label: 'UID',
              rules: undefined,
              description: 'B站用户的UID，必填',
              errorMessage: 'UID 不能为空 Ciallo～(∠・ω< )⌒☆'
            }),
            components.input.group('group_id', {
              label: '推送群号和机器人账号',
              maxRows: 2,
              data: [],
              template: components.input.string('accordion-item-bilibili:push:bilibili:group_id', {
                placeholder: '必填，不能出现空值',
                label: '',
                color: 'default',
                description: '推送群号和机器人账号，多个则使用逗号隔开，必填。如：群号1:机器人账号1',
                errorMessage: '你不设置群号和Bot号，我怎么知道你要用什么推送给谁呢？'
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
              // defaultValue: all.bilibili.push.filterMode,
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
                color: 'primary'
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
                color: 'primary'
              })
            })
          ]
        })
      }
    )
  ],

  /** 前端点击保存之后调用的方法 */
  save: async (config: newConfigType) => {
    const formatCfg = processFrontendData(config)
    const oldAllCfg = await Config.All()
    const mergeCfg = _.mergeWith({}, oldAllCfg, formatCfg, customizer)

    let success = false
    let isChange = false

    for (const key of Object.keys(mergeCfg) as Array<keyof ConfigType>) {
      isChange = deepEqual(mergeCfg[key], oldAllCfg[key])
      if (isChange) {
        const modifySuccess = await Config.ModifyPro(key, mergeCfg[key])
        if (modifySuccess) {
          success = true
        }
      }
    }

    return {
      mergeCfg,
      formatCfg,
      success,
      message: success ? '保存成功 Ciallo～(∠・ω< )⌒☆' : '配置无变化，无需保存'
    }
  }
})

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
function convertToNumber (value: string): any {
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
function getFirstObject<T> (arr: T[]): T {
  return arr.length > 0 ? arr[0] : {} as T
}

/**
 * 处理前端返回的数据，将其转换为 ConfigType 格式
 * @param data 前端返回的数据
 * @returns 处理后符合 ConfigType 格式的数据
 */
function processFrontendData (data: newConfigType): ConfigType {
  const result: Partial<Record<keyof ConfigType, any>> = {}

  const configKeys = Object.keys(data).filter((key): key is keyof BaseConfigType => {
    return !key.includes('pushlist') && key in data
  })

  for (const key of configKeys) {
    const value = data[key]
    const firstObj = Array.isArray(value) ? getFirstObject(value) : {}

    // 使用类型断言，确保 result[key] 的类型正确
    result[key] = {}

    for (const prop in firstObj) {
      let value = firstObj[prop]
      if (typeof value === 'string') { // 确保仅对字符串类型进行转换
        value = convertToNumber(value)
      }

      if (prop.includes(':')) {
        const [parent, child] = prop.split(':')
        if (!result[key] || typeof result[key] !== 'object') {
          result[key] = {}
        }
        if (!result[key][parent] || typeof result[key][parent] !== 'object') {
          result[key][parent] = {}
        }

        result[key][parent][child] = value
      } else {
        result[key][prop] = value
      }
    }
  }

  result.pushlist = {
    douyin: data['pushlist:douyin'] || [],
    bilibili: data['pushlist:bilibili'].map(item => {
      return {
        ...item,
        host_mid: Number(item.host_mid)
      }
    }) ?? []
  }

  return result as ConfigType
}
