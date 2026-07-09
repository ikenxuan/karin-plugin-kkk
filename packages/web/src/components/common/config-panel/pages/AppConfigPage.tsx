import { Surface } from '@heroui/react'

import { getValue } from '../utils'
import type { ConfigPageProps } from './pageTypes'

const AppConfigPage = ({ config, renderers }: ConfigPageProps) => {
  const { renderCheckboxGroup, renderPageHeader, renderSelectField, renderSubSection, renderSwitch, renderTextField } = renderers
  const appLivePhotoMode = getValue<string>(config, ['app', 'livePhotoMode'], 'video_and_livephoto')

  return (
    <>
      {renderPageHeader('通用', '插件运行、渲染和交互相关配置。')}
      {renderSubSection('缓存设置', <>{renderSwitch(['app', 'removeCache'], '自动删除视频缓存', '任务完成后删除下载缓存。')}</>)}
      {renderSubSection(
        '交互设置',
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
            ],
            false,
            [['master', 'allMasters']] // 「第一个主人」与「所有主人」互斥
          )}
        </>
      )}
      {renderSubSection(
        '渲染设置',
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
              { label: '深色', value: '2' },
              {
                label: '智能场景（实验性）',
                value: '3',
                description: '自动模式的超集；部分模板会根据封面色调 智能调整主题色，可能会出现不适配的情况。'
              }
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
        '上传与下载设置',
        <>
          <Surface className="flex flex-col gap-5 p-4 mb-4 rounded-3xl" variant="secondary">
            {renderSelectField(
              ['app', 'videoSendMode'],
              '本地视频发送方式',
              '选择本地视频交付给协议端的方式。',
              [
                {
                  label: 'File 协议（本地文件）',
                  value: 'file',
                  description: '使用 file 协议发送本地视频，需 Karin 与协议端在同一网络环境下'
                },
                {
                  label: 'Base64（编码传输）',
                  value: 'base64',
                  description:
                    '将本地视频转换为 base64 发送，传输数据量增大约 30%，不在同一网络环境可能导致额外带宽成本，适合 karin 和协议端不在同一网络环境'
                }
              ],
              (value) => value,
              getValue<boolean>(config, ['app', 'usegroupfile'], false)
            )}
            {renderSwitch(
              ['app', 'usegroupfile'],
              '群文件上传',
              '使用群文件上传，开启后会将视频文件上传到群文件中，需配置「群文件上传阈值」。与「本地视频发送方式 = Base64」互斥。',
              getValue<string>(config, ['app', 'videoSendMode'], 'file') === 'base64'
            )}
            {renderTextField(
              ['app', 'groupfilevalue'],
              '群文件上传阈值',
              '当文件大小超过该值时将使用群文件上传，单位：MB，「使用群文件上传」开启后才会生效。',
              {
                type: 'number',
                fallback: 100,
                min: 1,
                disabled:
                  !getValue<boolean>(config, ['app', 'usegroupfile'], false) ||
                  getValue<string>(config, ['app', 'videoSendMode'], 'file') === 'base64'
              }
            )}
          </Surface>

          <Surface className="flex flex-col gap-5 p-4 mb-4 rounded-3xl" variant="secondary">
            {renderSelectField(['app', 'imageSendMode'], '网络图片发送方式', '图片资源发送给协议端的方式。', [
              {
                label: 'URL 链接（直接传递）',
                value: 'url',
                description: '直接传递 HTTP 链接给上游下载，可能因上游网络问题导致下载超时'
              },
              {
                label: 'File 协议（本地文件）',
                value: 'file',
                description: '下载到本地后使用 file 协议发送，需 Karin 与协议端在同一网络环境下'
              },
              {
                label: 'Base64（编码传输）',
                value: 'base64',
                description: '下载后转换为 base64 发送，传输数据量增大约 30%，不在同一网络环境可能导致额外带宽成本'
              }
            ])}
          </Surface>

          <Surface className="flex flex-col gap-5 p-4 mb-4 rounded-3xl" variant="secondary">
            {renderSwitch(['app', 'usefilelimit'], '视频上传拦截', '开启后会根据视频文件大小判断是否需要上传，需配置「视频拦截阈值」。')}
            {renderTextField(
              ['app', 'filelimit'],
              '视频拦截阈值',
              '视频文件大于该数值则直接结束任务，不会上传，单位: MB，「视频上传拦截」开启后才会生效。',
              { type: 'number', fallback: 20, min: 1, disabled: !getValue<boolean>(config, ['app', 'usefilelimit'], false) }
            )}
            {renderSwitch(
              ['app', 'compress'],
              '压缩视频',
              '开启后会将视频文件压缩后再上传，适合上传大文件，任务过程中会吃满CPU，对低配服务器不友好。需配置「压缩触发阈值」与「压缩后的值」。'
            )}
            {renderTextField(
              ['app', 'compresstrigger'],
              '压缩触发阈值',
              '触发视频压缩的阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「压缩视频」开启后才会生效。',
              { type: 'number', fallback: 80, min: 1, disabled: !getValue<boolean>(config, ['app', 'compress'], false) }
            )}
            {renderTextField(
              ['app', 'compressvalue'],
              '压缩后的值',
              '单位：MB，若视频文件大小大于「压缩触发阈值」的值，则会进行压缩至该值（±5%），「压缩视频」开启后才会生效。',
              { type: 'number', fallback: 30, min: 1, disabled: !getValue<boolean>(config, ['app', 'compress'], false) }
            )}
          </Surface>

          <Surface className="flex flex-col gap-5 p-4 rounded-3xl" variant="secondary">
            {renderSwitch(
              ['app', 'downloadThrottle'],
              '下载限速',
              '开启后会限制下载速度，避免触发服务器风控导致连接被重置（ECONNRESET）。如果下载时经常报错"连接被重置"，建议开启。'
            )}
            {renderTextField(
              ['app', 'downloadMaxSpeed'],
              '最大下载速度',
              '限速开关打开后生效。单位：MB/s，建议值：10，根据实际情况调整。',
              {
                type: 'number',
                fallback: 10,
                min: 1,
                max: 100,
                disabled: !getValue<boolean>(config, ['app', 'downloadThrottle'], false)
              }
            )}
            {renderSwitch(
              ['app', 'downloadAutoReduce'],
              '断流自动降速',
              '限速开关打开后生效。当检测到下载中断时，自动降低下载速度，避免再次触发风控。',
              !getValue<boolean>(config, ['app', 'downloadThrottle'], false)
            )}
            {renderTextField(['app', 'downloadMinSpeed'], '最低下载速度', '断流降速开关打开后生效。单位：MB/s，自动降速的下限值。', {
              type: 'number',
              fallback: 1,
              min: 0.5,
              max: 50,
              disabled:
                !getValue<boolean>(config, ['app', 'downloadThrottle'], false) ||
                !getValue<boolean>(config, ['app', 'downloadAutoReduce'], false)
            })}
          </Surface>
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
        '我的小玩具',
        <>
          {renderSwitch(['app', 'videoTool'], '默认解析优先级', '关闭后使用自定义优先级，修改后需重启。')}
          {renderTextField(['app', 'priority'], '自定义优先级', '默认解析优先级关闭后生效。', {
            type: 'number',
            disabled: getValue<boolean>(config, ['app', 'videoTool'], true),
            fallback: 800
          })}
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
