import type { ConfigPageProps } from './pageTypes'
import { getValue } from '../utils'

const UploadConfigPage = ({ config, renderers }: ConfigPageProps) => {
  const { renderPageHeader, renderSelectField, renderSubSection, renderSwitch, renderTextField } = renderers
  const uploadVideoSendMode = getValue<string>(config, ['upload', 'videoSendMode'], 'file')
  const uploadUseGroupFile = getValue<boolean>(config, ['upload', 'usegroupfile'], false)
  const uploadUseFileLimit = getValue<boolean>(config, ['upload', 'usefilelimit'], false)
  const uploadCompress = getValue<boolean>(config, ['upload', 'compress'], false)
  const uploadDownloadThrottle = getValue<boolean>(config, ['upload', 'downloadThrottle'], false)
  const uploadDownloadAutoReduce = getValue<boolean>(config, ['upload', 'downloadAutoReduce'], false)

  return (
    <>
      {renderPageHeader('上传与下载', '视频、图片发送方式和下载限速策略。')}
      {renderSubSection('发送方式配置', (
        <>
          {renderSelectField(['upload', 'videoSendMode'], '本地视频发送方式', '选择本地视频交付给协议端的方式。', [
            { label: 'File 协议（本地文件）', value: 'file', description: '使用 file 协议发送本地视频，需 Karin 与协议端在同一系统' },
            { label: 'Base64（编码传输）', value: 'base64', description: '将本地视频转换为 base64 发送，传输数据量增大约 30%，不在同一网络环境可能导致额外带宽成本，适合 karin 和协议端不在同一网络环境' }
          ], (value) => value, uploadUseGroupFile)}
          {renderSwitch(['upload', 'usegroupfile'], '群文件上传', '使用群文件上传，开启后会将视频文件上传到群文件中，需配置「群文件上传阈值」。与「本地视频发送方式 = Base64」互斥。', uploadVideoSendMode === 'base64')}
          {renderTextField(['upload', 'groupfilevalue'], '群文件上传阈值', '当文件大小超过该值时将使用群文件上传，单位：MB，「使用群文件上传」开启后才会生效。', { type: 'number', fallback: 100, min: 1, disabled: !uploadUseGroupFile || uploadVideoSendMode === 'base64' })}
          {renderSelectField(['upload', 'imageSendMode'], '网络图片发送方式', '图片资源发送给协议端的方式。', [
            { label: 'URL 链接（直接传递）', value: 'url', description: '直接传递 HTTP 链接给上游下载，可能因上游网络问题导致下载超时' },
            { label: 'File 协议（本地文件）', value: 'file', description: '下载到本地后使用 file 协议发送，需 Karin 与协议端在同一系统' },
            { label: 'Base64（编码传输）', value: 'base64', description: '下载后转换为 base64 发送，传输数据量增大约 30%，不在同一网络环境可能导致额外带宽成本' }
          ])}
        </>
      ))}
      {renderSubSection('上传拦截配置', (
        <>
          {renderSwitch(['upload', 'usefilelimit'], '视频上传拦截', '开启后会根据视频文件大小判断是否需要上传，需配置「视频拦截阈值」。')}
          {renderTextField(['upload', 'filelimit'], '视频拦截阈值', '视频文件大于该数值则直接结束任务，不会上传，单位: MB，「视频上传拦截」开启后才会生效。', { type: 'number', fallback: 20, min: 1, disabled: !uploadUseFileLimit })}
        </>
      ))}
      {renderSubSection('视频压缩配置', (
        <>
          {renderSwitch(['upload', 'compress'], '压缩视频', '开启后会将视频文件压缩后再上传，适合上传大文件，任务过程中会吃满CPU，对低配服务器不友好。需配置「压缩触发阈值」与「压缩后的值」。')}
          {renderTextField(['upload', 'compresstrigger'], '压缩触发阈值', '触发视频压缩的阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「压缩视频」开启后才会生效。', { type: 'number', fallback: 80, min: 1, disabled: !uploadCompress })}
          {renderTextField(['upload', 'compressvalue'], '压缩后的值', '单位：MB，若视频文件大小大于「压缩触发阈值」的值，则会进行压缩至该值（±5%），「压缩视频」开启后才会生效。', { type: 'number', fallback: 30, min: 1, disabled: !uploadCompress })}
        </>
      ))}
      {renderSubSection('下载限速配置', (
        <>
          {renderSwitch(['upload', 'downloadThrottle'], '下载限速', '开启后会限制下载速度，避免触发服务器风控导致连接被重置（ECONNRESET）。如果下载时经常报错"连接被重置"，建议开启。')}
          {renderTextField(['upload', 'downloadMaxSpeed'], '最大下载速度', '单位：MB/s，建议设置为 5-20 之间。设置过高可能触发风控，设置过低会影响下载体验。', { type: 'number', fallback: 10, min: 1, max: 1000, disabled: !uploadDownloadThrottle })}
          {renderSwitch(['upload', 'downloadAutoReduce'], '断流自动降速', '当检测到连接被重置时自动降低下载速度，每次断流后速度会降低到当前的 60%。', !uploadDownloadThrottle)}
          {renderTextField(['upload', 'downloadMinSpeed'], '最低下载速度', '单位：MB/s，自动降速时不会低于此值。', { type: 'number', fallback: 1, min: 0.1, max: 100, step: 0.1, disabled: !uploadDownloadThrottle || !uploadDownloadAutoReduce })}
        </>
      ))}
    </>
  )
}

export default UploadConfigPage
