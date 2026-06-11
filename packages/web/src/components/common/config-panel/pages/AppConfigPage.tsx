import { getValue } from '../utils'
import type { ConfigPageProps } from './pageTypes'

const AppConfigPage = ({ config, renderers }: ConfigPageProps) => {
  const { renderCheckboxGroup, renderPageHeader, renderSelectField, renderSubSection, renderSwitch, renderTextField } = renderers
  const appLivePhotoMode = getValue<string>(config, ['app', 'livePhotoMode'], 'video_and_livephoto')

  return (
    <>
      {renderPageHeader('应用', '插件运行、渲染、API 和交互相关配置。')}
      {renderSubSection('缓存设置', <>{renderSwitch(['app', 'removeCache'], '自动删除视频缓存', '任务完成后删除下载缓存。')}</>)}
      {renderSubSection(
        '解析优先级设置',
        <>
          {renderSwitch(['app', 'videoTool'], '默认解析优先级', '关闭后使用自定义优先级，修改后需重启。')}
          {renderTextField(['app', 'priority'], '自定义优先级', '默认解析优先级关闭后生效。', {
            type: 'number',
            disabled: getValue<boolean>(config, ['app', 'videoTool'], true),
            fallback: 800
          })}
        </>
      )}
      {renderSubSection(
        '渲染配置',
        <>
          {renderTextField(
            ['app', 'renderScale'],
            '渲染精度',
            '可选值50~200，建议100。设置高精度会提高图片的精细度，过高可能会影响渲染与发送速度。',
            { type: 'number', fallback: 100, min: 50, max: 200 }
          )}
          {renderSelectField(
            ['app', 'Theme'],
            '渲染图片的主题色',
            '渲染评论图和推送图的主题色。',
            [
              { label: '自动', value: '0', description: '06:00-18:00为浅色，18:00-06:00为深色' },
              { label: '浅色', value: '1' },
              { label: '深色', value: '2' }
            ],
            (value) => Number(value)
          )}
          {renderSwitch(['app', 'RemoveWatermark'], '移除版本信息', '渲染的图片是否移除底部版本信息。')}
          {renderTextField(['app', 'RenderWaitTime'], '渲染图片的等待时间', '单位：秒，Linux系统下不能为0；其他系统传递 0 可禁用。', {
            type: 'number',
            fallback: 60,
            min: 0
          })}
          {renderSwitch(['app', 'multiPageRender'], '分页渲染', '将模板渲染成多页的图片，以降低渲染器压力，默认开启，非必要不修改！')}
          {renderTextField(['app', 'multiPageHeight'], '分页渲染时，每页的高度', '经测试最佳每页高度为12000px，默认12000px。', {
            type: 'number',
            disabled: !getValue<boolean>(config, ['app', 'multiPageRender'], true),
            fallback: 12000,
            min: 1000,
            max: 20000
          })}
        </>
      )}
      {renderSubSection(
        'Live Photo 兼容设置',
        <>
          {renderSelectField(
            ['app', 'livePhotoMode'],
            'Live Photo 处理和发送方式',
            '解析遇到实况图时的处理和发送方式。注意：生成视频性能开销大，2C2G 服务器单张约需 20 秒。',
            [
              {
                label: '视频 + 实况图',
                value: 'video_and_livephoto',
                description: '生成并发送仿 iPhone Live Photo 播放效果的视频（播放三次）+ 对应系统的实况图'
              },
              {
                label: '仅视频',
                value: 'video_only',
                description: '仅生成并发送仿 iPhone Live Photo 播放效果的视频（播放三次）'
              },
              { label: '仅实况图', value: 'livephoto_only', description: '仅生成并发送对应系统的实况图，性能开销小' }
            ]
          )}
          {renderSelectField(
            ['app', 'livePhotoSystem'],
            'Live Photo 静态图兼容系统',
            '当解析到作品/动态包含 Live Photo 时，合并转发里发送的 Live Photo 静态图按所选系统生成。推荐 OPPO，兼容性最广。',
            [
              { label: 'Google', value: 'google', description: 'Google Motion Photo 格式' },
              {
                label: '小米（HyperOS）',
                value: 'xiaomi',
                description: '兼容小米（任何版本）和 Google，但无法被 OPPO 识别'
              },
              { label: 'OPPO（ColorOS）', value: 'oppo', description: '推荐，兼容 OPPO、小米（较新版本）和 Google' },
              {
                label: '华为/荣耀（HarmonyOS/MagicOS）',
                value: 'huawei_honor',
                description: '理论可行但未实测（作者无对应设备）'
              },
              {
                label: 'vivo（Origin OS）',
                value: 'vivo',
                description: '需要独立的图片和同名视频文件，暂不支持',
                disabled: true
              },
              {
                label: 'iPhone（iOS）',
                value: 'iphone',
                description: '需要独立的图片和同名视频文件，暂不支持',
                disabled: true
              }
            ],
            (value) => value,
            appLivePhotoMode === 'video_only'
          )}
        </>
      )}
      {renderSubSection(
        'API服务配置',
        <>
          {renderSwitch(['app', 'APIServer'], 'API 服务', '本地部署一个视频解析API服务，接口范围为本插件用到的所有。')}
          {renderSwitch(
            ['app', 'APIServerMount'],
            '挂载到 Karin',
            'API 服务是否挂载到 Karin 上，开启后监听端口为 Karin 的 http 端口，修改后需重启。需开启「API服务」。',
            !getValue<boolean>(config, ['app', 'APIServer'], false)
          )}
          {renderTextField(['app', 'APIServerPort'], 'API 服务端口', '仅未挂载到 Karin 时生效。', {
            type: 'number',
            disabled: getValue<boolean>(config, ['app', 'APIServerMount'], true),
            fallback: 4567,
            min: 1024,
            max: 65535
          })}
        </>
      )}
      {renderSubSection(
        '交互与认证设置',
        <>
          {renderSwitch(['app', 'EmojiReply'], '表情回应', '在解析任务开始时添加表情回应，若适配器不支持需要关闭。')}
          {renderSwitch(['app', 'parseTip'], '解析提示', '发送提示信息："检测到xxx链接，开始解析"。')}
          {renderSwitch(['app', 'fakeForward'], '伪造合并转发消息', '开启后合并转发将使用触发者身份展示；关闭后使用机器人身份展示。')}
          {renderCheckboxGroup(
            ['app', 'errorLogSendTo'],
            '错误日志',
            '遇到错误时谁会收到错误日志。注：推送任务只可发送给主人。「第一个主人」与「所有主人」互斥。',
            [
              { label: '第一个主人', value: 'master' },
              { label: '所有主人', value: 'allMasters' },
              { label: '触发者的群聊', value: 'trigger' }
            ]
          )}
        </>
      )}
      {renderSubSection(
        '我的小玩具配置',
        <>
          {renderSelectField(['app', 'qrLoginAddrType'], '扫码登录地址', '生成登录二维码时使用的服务器地址。', [
            { label: '局域网', value: 'lan', description: '适用于手机和服务器在同一局域网' },
            { label: '外部地址', value: 'external', description: '适用于远程访问，需手动配置' }
          ])}
          {renderTextField(['app', 'qrLoginExternalAddr'], '外部访问地址', '公网 IP 或域名，如：123.45.67.89 或 example.com。', {
            disabled: getValue<string>(config, ['app', 'qrLoginAddrType'], 'lan') !== 'external'
          })}
        </>
      )}
    </>
  )
}

export default AppConfigPage
