import { components } from 'node-karin'

import { Config } from '@/module'
import { ConfigType } from '@/types'

const all = Config.All()

export default {
  info: {},
  /** 动态渲染的组件 */
  components: () => [
    components.divider.create('divider-1', {
      description: 'Cookies 相关',
      descPosition: 20
    }),
    components.accordion.create('cfg.cookies', {
      children: [
        components.accordion.createItem('cookies', {
          title: 'Cookies 相关',
          className: 'ml-4 mr-4',
          subtitle: '建议配置，否则大部分功能无法使用',
          children: [
            components.input.string('cfg.cookies.douyin', {
              label: '抖音',
              type: 'text',
              description: '请输入你的抖音Cookies，不输入则无法使用抖音相关功能噢',
              defaultValue: all.cookies.douyin,
              placeholder: '',
              rules: undefined
            }),
            components.input.string('cfg.cookies.bilibili', {
              label: 'B站',
              type: 'text',
              description: '请输入你的B站Cookies，不输入则无法使用B站相关功能噢',
              defaultValue: all.cookies.bilibili,
              placeholder: '',
              rules: undefined
            }),
            components.input.string('cfg.cookies.kuaishou', {
              label: '快手',
              type: 'text',
              description: '请输入你的快手Cookies，不输入则无法使用快手相关功能噢',
              defaultValue: all.cookies.kuaishou,
              placeholder: '',
              rules: undefined
            })
          ]
        })
      ]
    }),
    components.divider.create('divider-2', {
      description: '插件应用相关',
      descPosition: 20
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
            components.input.number('cfg.app.renderScale', {
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
            components.input.number('cfg.app.APIServerPort', {
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
    components.divider.create('divider-3', {
      description: '抖音相关',
      descPosition: 20
    }),
    components.accordion.create('cfg.douyin', {
      children: [
        components.accordion.createItem('douyin', {
          title: '抖音相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为抖音相关的用户偏好设置',
          children: [
            components.switch.create('cfg.douyin.switch', {
              startText: '解析开关',
              description: '抖音解析开关，此开关为单独开关',
              defaultSelected: all.douyin.switch
            }),
            components.switch.create('cfg.douyin.tip', {
              startText: '解析提示',
              description: '抖音解析提示，发送提示信息：“检测到抖音链接，开始解析”',
              defaultSelected: all.douyin.tip
            }),
            components.switch.create('cfg.douyin.switch', {
              startText: '评论解析',
              description: '抖音评论解析，开启后可发送抖音作品评论图',
              defaultSelected: all.douyin.comment
            }),
            components.input.number('cfg.douyin.numcomment', {
              label: '评论解析数量',
              defaultValue: all.douyin.numcomment.toString(),
              rules: [{ min: 1 }]
            }),
            components.switch.create('cfg.douyin.switch', {
              startText: '自动分辨率',
              description: '根据「视频拦截阈值」自动选择合适的分辨率，关闭后默认选择最大分辨率进行下载',
              defaultSelected: all.douyin.autoResolution
            }),
            components.divider.create('divider-dy-1', {
              description: '抖音推送相关',
              descPosition: 20
            }),
            components.switch.create('cfg.douyin.push.switch', {
              startText: '推送开关',
              description: '推送开关，开启后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表',
              defaultSelected: all.douyin.autoResolution
            }),
            components.radio.group('cfg.douyin.push.permission', {
              label: '谁可以设置推送',
              orientation: 'horizontal',
              defaultValue: all.douyin.push.permission,
              radio: [
                components.radio.create('cfg.douyin.push.permission.radio-1', {
                  label: '所有人',
                  value: 'all'
                }),
                components.radio.create('cfg.douyin.push.permission.radio-2', {
                  label: '管理员',
                  value: 'admin'
                }),
                components.radio.create('cfg.douyin.push.permission.radio-3', {
                  label: '主人',
                  value: 'master'
                }),
                components.radio.create('cfg.douyin.push.permission.radio-4', {
                  label: '群主',
                  value: 'group.owner'
                }),
                components.radio.create('cfg.douyin.push.permission.radio-5', {
                  label: '群管理员',
                  value: 'group.admin'
                })
              ]
            }),
            components.input.string('cfg.douyin.push.cron', {
              label: '定时任务表达式',
              defaultValue: all.douyin.push.cron
            }),
            components.switch.create('cfg.douyin.push.parsedynamic', {
              startText: '作品解析',
              description: '触发推送时是否一同解析该作品',
              defaultSelected: all.douyin.push.parsedynamic
            }),
            components.switch.create('cfg.douyin.push.log', {
              startText: '推送日志',
              description: '是否打印推送日志（修改后需重启）',
              defaultSelected: all.douyin.push.log
            })
          ]
        })
      ]
    }),
    components.divider.create('divider-4', {
      description: 'B站相关',
      descPosition: 20
    }),
    components.accordion.create('cfg.bilibili', {
      children: [
        components.accordion.createItem('bilibili', {
          title: 'B站相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为B站相关的用户偏好设置',
          children: [
            components.switch.create('cfg.bilibili.switch', {
              startText: '解析开关',
              description: 'B站解析开关，此开关为单独开关',
              defaultSelected: all.bilibili.switch
            }),
            components.switch.create('cfg.bilibili.tip', {
              startText: '解析提示',
              description: 'B站解析提示，发送提示信息：“检测到B站链接，开始解析”',
              defaultSelected: all.bilibili.tip
            }),
            components.switch.create('cfg.bilibili.switch', {
              startText: '评论解析',
              description: 'B站评论解析，开启后可发送B站作品评论图',
              defaultSelected: all.bilibili.comment
            }),
            components.input.number('cfg.bilibili.numcomment', {
              label: '评论解析数量',
              defaultValue: all.bilibili.numcomment.toString(),
              rules: [{ min: 1 }]
            }),
            components.switch.create('cfg.bilibili.switch', {
              startText: '自动分辨率',
              description: '根据「视频拦截阈值」自动选择合适的分辨率，关闭后默认选择最大分辨率进行下载',
              defaultSelected: all.bilibili.autoResolution
            }),
            components.divider.create('divider-dy-1', {
              description: 'B站推送相关',
              descPosition: 20
            }),
            components.switch.create('cfg.bilibili.push.switch', {
              startText: '推送开关',
              description: '推送开关，开启后需重启；使用「#设置B站推送 + UID」配置推送列表',
              defaultSelected: all.bilibili.autoResolution
            }),
            components.radio.group('cfg.bilibili.push.permission', {
              label: '谁可以设置推送',
              orientation: 'horizontal',
              defaultValue: all.bilibili.push.permission,
              radio: [
                components.radio.create('cfg.bilibili.push.permission.radio-1', {
                  label: '所有人',
                  value: 'all'
                }),
                components.radio.create('cfg.bilibili.push.permission.radio-2', {
                  label: '管理员',
                  value: 'admin'
                }),
                components.radio.create('cfg.bilibili.push.permission.radio-3', {
                  label: '主人',
                  value: 'master'
                }),
                components.radio.create('cfg.bilibili.push.permission.radio-4', {
                  label: '群主',
                  value: 'group.owner'
                }),
                components.radio.create('cfg.bilibili.push.permission.radio-5', {
                  label: '群管理员',
                  value: 'group.admin'
                })
              ]
            }),
            components.input.string('cfg.bilibili.push.cron', {
              label: '定时任务表达式',
              defaultValue: all.bilibili.push.cron
            }),
            components.switch.create('cfg.bilibili.push.parsedynamic', {
              startText: '作品解析',
              description: '触发推送时是否一同解析该作品',
              defaultSelected: all.bilibili.push.parsedynamic
            }),
            components.switch.create('cfg.bilibili.push.log', {
              startText: '推送日志',
              description: '是否打印推送日志（修改后需重启）',
              defaultSelected: all.bilibili.push.log
            })
          ]
        })
      ]
    }),
    components.divider.create('divider-5', {
      description: '快手相关',
      descPosition: 20
    }),
    components.accordion.create('cfg.kuaishou', {
      children: [
        components.accordion.createItem('kuaishou', {
          title: '快手相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为快手相关的用户偏好设置',
          children: [
            components.switch.create('cfg.kuaishou.switch', {
              startText: '解析开关',
              description: '快手解析开关，此开关为单独开关',
              defaultSelected: all.kuaishou.switch
            }),
            components.switch.create('cfg.kuaishou.tip', {
              startText: '解析提示',
              description: '抖音解析提示，发送提示信息：“检测到快手链接，开始解析”',
              defaultSelected: all.kuaishou.tip
            }),
            components.switch.create('cfg.kuaishou.switch', {
              startText: '评论解析',
              description: '快手评论解析，开启后可发送抖音作品评论图',
              defaultSelected: all.kuaishou.comment
            }),
            components.input.number('cfg.kuaishou.numcomment', {
              label: '评论解析数量',
              defaultValue: all.kuaishou.numcomment.toString(),
              rules: [{ min: 1 }]
            })
          ]
        })
      ]
    }),
    components.divider.create('divider-6', {
      description: '上传相关',
      descPosition: 20
    }),
    components.accordion.create('cfg.upload', {
      children: [
        components.accordion.createItem('upload', {
          title: '上传相关',
          className: 'ml-4 mr-4',
          subtitle: '此处为上传相关的用户偏好设置',
          children: [
            components.switch.create('cfg.upload.sendbase64', {
              startText: '转换Base64',
              description: '发送视频经本插件转换为base64格式后再发送，适合Karin与机器人不在同一网络环境下开启',
              defaultSelected: all.upload.switch
            }),
            components.switch.create('cfg.upload.usefilelimit', {
              startText: '视频上传拦截',
              description: '开启后会根据视频文件大小判断是否需要上传，需配置「视频拦截阈值」。',
              defaultSelected: all.upload.usefilelimit
            }),
            components.input.number('cfg.upload.filelimit', {
              label: '视频拦截阈值',
              description: '视频文件大于该数值则直接结束任务，不会上传，单位: MB，「视频上传拦截」开启后才会生效。',
              defaultValue: all.upload.filelimit.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.upload.usefilelimit
            }),
            components.switch.create('cfg.upload.compress', {
              startText: '压缩视频',
              description: '开启后会将视频文件压缩后再上传，适合上传大文件，任务过程中会吃满CPU，对低配服务器不友好。需配置「压缩触发阈值」与「压缩后的值」',
              defaultSelected: all.upload.compress
            }),
            components.input.number('cfg.upload.compresstrigger', {
              label: '压缩触发阈值',
              description: '触发视频压缩的阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「压缩视频」开启后才会生效',
              defaultValue: all.upload.compresstrigger.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.upload.compress
            }),
            components.input.number('cfg.upload.compressvalue', {
              label: '压缩后的值',
              description: '单位：MB，若视频文件大小大于「压缩触发阈值」的值，则会进行压缩至该值（±5%），「压缩视频」开启后才会生效',
              defaultValue: all.upload.compressvalue.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.upload.compress
            }),
            components.switch.create('cfg.upload.compress', {
              startText: '群文件上传',
              description: '使用群文件上传，开启后会将视频文件上传到群文件中，需配置「群文件上传阈值」',
              defaultSelected: all.upload.usegroupfile
            }),
            components.input.number('cfg.upload.groupfilevalue', {
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
      'cfg.pushlist.douyin',
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
              color: 'success',
              placeholder: '',
              label: '抖音号'
            }),
            components.input.string('sec_uid', {
              color: 'default',
              placeholder: '',
              label: 'UID',
              isRequired: false
            }),
            components.input.string('remark', {
              color: 'default',
              placeholder: '',
              label: '昵称',
              isRequired: false
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
      'cfg.pushlist.bilibili',
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
              color: 'success',
              placeholder: '',
              label: 'UID',
              rules: undefined
            }),
            components.input.string('remark', {
              color: 'default',
              placeholder: '',
              label: '昵称',
              isRequired: false
            })
          ]
        })
      }
    )
  ],

  /** 前端点击保存之后调用的方法 */
  save: (config: any) => {
    const formatCfg = processFrontendConfig(config)
    const fullData: ConfigType = { ...all, ...formatCfg }
    let success = false
    let isChange = false;

    (Object.keys(fullData) as Array<keyof ConfigType>).forEach((key: keyof ConfigType) => {
      isChange = deepEqual({ ...all[key], ...fullData[key] }, all[key])
      if (isChange) {
        success = Config.ModifyPro(key, fullData[key])
      }
    })

    return {
      success,
      message: success ? '保存成功 Ciallo～(∠・ω< )⌒☆' : '配置无变化，无需保存'
    }
  }
}

/**
 * 判断配置是否修改
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

  // 如果 a 和 b 都是对象
  if (typeof a === 'object' && typeof b === 'object') {
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
        return true // 如果 b 中没有该键，返回 true
      }

      // 如果 a[key] 和 b[key] 不相等，返回 true
      if (deepEqual(a[key], b[key])) {
        return true
      }
    }
  }

  // 如果所有检查都没有发现修改，返回 false
  return false
}

const convertToNumber = (value: string | number): number => {
  if (typeof value === 'string') {
    return parseInt(value, 10)
  }
  return value
}

const processFrontendConfig = (frontendConfig: any): ConfigType => {
  const processedConfig: ConfigType = {
    app: {} as ConfigType['app'],
    bilibili: {} as ConfigType['bilibili'],
    douyin: {} as ConfigType['douyin'],
    cookies: {} as ConfigType['cookies'],
    pushlist: {} as ConfigType['pushlist'],
    upload: {} as ConfigType['upload'],
    kuaishou: {} as ConfigType['kuaishou']
  }

  // 处理cookies配置
  if (frontendConfig['cfg.cookies'] && frontendConfig['cfg.cookies'].length > 0) {
    const cookiesData = frontendConfig['cfg.cookies'][0]
    processedConfig.cookies = {
      bilibili: cookiesData['cfg.cookies.bilibili'],
      douyin: cookiesData['cfg.cookies.douyin'],
      kuaishou: cookiesData['cfg.cookies.kuaishou']
    }
  }

  // 处理app配置
  if (frontendConfig['cfg.app'] && frontendConfig['cfg.app'].length > 0) {
    const appData = frontendConfig['cfg.app'][0]
    processedConfig.app = {
      defaulttool: appData['cfg.app.defaulttool'],
      priority: 0, // 未在前端数据中找到，这里假设默认值为0
      rmmp4: appData['cfg.app.rmmp4'],
      renderScale: convertToNumber(appData['cfg.app.renderScale']),
      APIServer: appData['cfg.app.APIServer'],
      APIServerPort: convertToNumber(appData['cfg.app.APIServerPort']),
      Theme: convertToNumber(appData['cfg.app.Theme'])
    }
  }

  // 处理douyin配置
  if (frontendConfig['cfg.douyin'] && frontendConfig['cfg.douyin'].length > 0) {
    const douyinData = frontendConfig['cfg.douyin'][0]
    processedConfig.douyin = {
      switch: douyinData['cfg.douyin.switch'],
      tip: douyinData['cfg.douyin.tip'],
      comment: false, // 未在前端数据中找到，这里假设默认值为false
      numcomment: convertToNumber(douyinData['cfg.douyin.numcomment']),
      autoResolution: false, // 未在前端数据中找到，这里假设默认值为false
      push: {
        switch: douyinData['cfg.douyin.push.switch'],
        banWords: [], // 未在前端数据中找到，这里假设默认值为空数组
        banTags: [], // 未在前端数据中找到，这里假设默认值为空数组
        permission: douyinData['cfg.douyin.push.permission'] as 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin',
        cron: douyinData['cfg.douyin.push.cron'],
        parsedynamic: douyinData['cfg.douyin.push.parsedynamic'],
        log: douyinData['cfg.douyin.push.log']
      }
    }
  }

  // 处理bilibili配置
  if (frontendConfig['cfg.bilibili'] && frontendConfig['cfg.bilibili'].length > 0) {
    const bilibiliData = frontendConfig['cfg.bilibili'][0]
    processedConfig.bilibili = {
      switch: bilibiliData['cfg.bilibili.switch'],
      tip: bilibiliData['cfg.bilibili.tip'],
      comment: false, // 未在前端数据中找到，这里假设默认值为false
      numcomment: convertToNumber(bilibiliData['cfg.bilibili.numcomment']),
      videopriority: false, // 未在前端数据中找到，这里假设默认值为false
      autoResolution: false, // 未在前端数据中找到，这里假设默认值为false
      push: {
        switch: bilibiliData['cfg.bilibili.push.switch'],
        banWords: [], // 未在前端数据中找到，这里假设默认值为空数组
        banTags: [], // 未在前端数据中找到，这里假设默认值为空数组
        permission: bilibiliData['cfg.bilibili.push.permission'] as 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin',
        cron: bilibiliData['cfg.bilibili.push.cron'],
        parsedynamic: bilibiliData['cfg.bilibili.push.parsedynamic'],
        log: bilibiliData['cfg.bilibili.push.log']
      }
    }
  }

  // 处理kuaishou配置
  if (frontendConfig['cfg.kuaishou'] && frontendConfig['cfg.kuaishou'].length > 0) {
    const kuaishouData = frontendConfig['cfg.kuaishou'][0]
    processedConfig.kuaishou = {
      switch: kuaishouData['cfg.kuaishou.switch'],
      tip: kuaishouData['cfg.kuaishou.tip'],
      numcomment: convertToNumber(kuaishouData['cfg.kuaishou.numcomment'])
    }
  }

  // 处理upload配置
  if (frontendConfig['cfg.upload'] && frontendConfig['cfg.upload'].length > 0) {
    const uploadData = frontendConfig['cfg.upload'][0]
    processedConfig.upload = {
      sendbase64: uploadData['cfg.upload.sendbase64'],
      usefilelimit: uploadData['cfg.upload.usefilelimit'],
      filelimit: convertToNumber(uploadData['cfg.upload.filelimit']),
      compress: uploadData['cfg.upload.compress'],
      compresstrigger: convertToNumber(uploadData['cfg.upload.compresstrigger']),
      compressvalue: convertToNumber(uploadData['cfg.upload.compressvalue']),
      usegroupfile: false, // 未在前端数据中找到，这里假设默认值为false
      groupfilevalue: convertToNumber(uploadData['cfg.upload.groupfilevalue'])
    }
  }

  // 处理pushlist配置
  processedConfig.pushlist = {
    douyin: [],
    bilibili: []
  }
  if (frontendConfig['cfg.pushlist.douyin'] && frontendConfig['cfg.pushlist.douyin'].length > 0) {
    processedConfig.pushlist.douyin = frontendConfig['cfg.pushlist.douyin'].map((item: any) => ({
      sec_uid: item.sec_uid,
      short_id: item.short_id,
      group_id: item.group_id,
      remark: item.remark
    }))
  }
  if (frontendConfig['cfg.pushlist.bilibili'] && frontendConfig['cfg.pushlist.bilibili'].length > 0) {
    processedConfig.pushlist.bilibili = frontendConfig['cfg.pushlist.bilibili'].map((item: any) => ({
      host_mid: convertToNumber(item.host_mid),
      group_id: item.group_id,
      remark: item.remark
    }))
  }

  return processedConfig
}
