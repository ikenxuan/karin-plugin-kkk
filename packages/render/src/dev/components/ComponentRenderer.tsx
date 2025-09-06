import React from 'react'
import { PlatformType } from '../../types/platforms'
import { version } from '../../services/DataService'

// 抖音
const DouyinComment = React.lazy(() =>
  import('../../components/platforms/douyin/Comment').then(module => ({
    default: module.DouyinComment
  }))
)
const DouyinDynamic = React.lazy(() =>
  import('../../components/platforms/douyin/Dynamic').then(module => ({
    default: module.DouyinDynamic
  }))
)
const DouyinLive = React.lazy(() =>
  import('../../components/platforms/douyin/Live').then(module => ({
    default: module.DouyinLive
  }))
)

// 哔哩哔哩
const BilibiliComment = React.lazy(() =>
  import('../../components/platforms/bilibili/Comment').then(module => ({
    default: module.BilibiliComment
  }))
)
const BilibiliDrawDynamic = React.lazy(() =>
  import('../../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_DRAW').then(module => ({
    default: module.BilibiliDrawDynamic
  }))
)
const BilibiliVideoDynamic = React.lazy(() =>
  import('../../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_AV').then(module => ({
    default: module.BilibiliVideoDynamic
  }))
)
const BilibiliLiveDynamic = React.lazy(() =>
  import('../../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD').then(module => ({
    default: module.BilibiliLiveDynamic
  }))
)
const BilibiliForwardDynamic = React.lazy(() =>
  import('../../components/platforms/bilibili/dynamic/DYNAMIC_TYPE_FORWARD').then(module => ({
    default: module.BilibiliForwardDynamic
  }))
)

// 未来可以在这里添加更多平台的组件导入
// const WechatMoments = React.lazy(() => import('../../components/platforms/wechat/Moments'))
// const QQZone = React.lazy(() => import('../../components/platforms/qq/Zone'))
// const WeiboPost = React.lazy(() => import('../../components/platforms/weibo/Post'))

interface ComponentRendererProps {
  /** 当前平台 */
  platform: PlatformType
  /** 当前模板ID */
  templateId: string
  /** 当前数据 */
  data: any
  /** 二维码数据URL */
  qrCodeDataUrl: string
}

/**
 * 组件渲染器 - 根据平台和模板ID渲染对应组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  platform,
  templateId,
  data,
  qrCodeDataUrl
}) => {
  /**
   * 渲染加载中状态
   * @param message 加载消息
   * @returns JSX元素
   */
  const renderLoading = (message: string) => (
    <div className="flex justify-center items-center h-full text-default-50">
      {message}
    </div>
  )

  /**
   * 渲染开发中状态
   * @param type 类型（平台或模板）
   * @param name 名称
   * @returns JSX元素
   */
  const renderInDevelopment = (type: string, name: string) => (
    <div className="flex justify-center items-center h-full text-default-50">
      {type} {name} 开发中...
    </div>
  )

  // 数据为空时显示加载状态
  if (!data) {
    return renderLoading('正在加载预览...')
  }

  // 根据平台渲染对应组件
  switch (platform) {
    case PlatformType.DOUYIN:
      return renderDouyinComponent(templateId, data, qrCodeDataUrl)
    case PlatformType.BILIBILI:
      return renderBilibiliComponent(templateId, data, qrCodeDataUrl)
    default:
      return renderInDevelopment('平台', platform)
  }
}

/**
 * 渲染抖音平台组件
 * @param templateId 模板ID
 * @param data 数据
 * @param qrCodeDataUrl 二维码URL
 * @returns JSX元素
 */
const renderDouyinComponent = (templateId: string, data: any, qrCodeDataUrl: string) => {
  const commonProps = {
    data,
    qrCodeDataUrl,
    version,
    scale: 1
  }

  switch (templateId) {
    case 'comment':
      return (
        <React.Suspense fallback={
          <div className="flex justify-center items-center h-full text-default-50">
            加载评论组件中...
          </div>
        }>
          <DouyinComment {...commonProps} />
        </React.Suspense>
      )
    
    case 'dynamic':
      return (
        <React.Suspense fallback={
          <div className="flex justify-center items-center h-full text-default-50">
            加载动态组件中...
          </div>
        }>
          <DouyinDynamic {...commonProps} />
        </React.Suspense>
      )
    
    case 'live':
      return (
        <React.Suspense fallback={
          <div className="flex justify-center items-center h-full text-default-50">
            加载直播组件中...
          </div>
        }>
          <DouyinLive {...commonProps} />
        </React.Suspense>
      )
    
    default:
      return (
        <div className="flex justify-center items-center h-full text-default-50">
          模板 {templateId} 开发中...
        </div>
      )
  }
}

/**
 * 渲染哔哩哔哩平台组件
 * @param templateId 模板ID
 * @param data 数据
 * @param qrCodeDataUrl 二维码URL
 * @returns JSX元素
 */
const renderBilibiliComponent = (templateId: string, data: any, qrCodeDataUrl: string) => {
  const commonProps = {
    data,
    qrCodeDataUrl,
    version,
    scale: 1
  }

  switch (templateId) {
    case 'comment':
      return (
        <React.Suspense fallback={
          <div className="flex justify-center items-center h-full text-default-50">
            加载评论组件中...
          </div>
        }>
          <BilibiliComment {...commonProps} />
        </React.Suspense>
      )
    
    case 'dynamic/DYNAMIC_TYPE_DRAW':
      return (
        <React.Suspense fallback={
          <div className="flex justify-center items-center h-full text-default-50">
            加载动态组件中...
          </div>
        }>
          <BilibiliDrawDynamic {...commonProps} />
        </React.Suspense>
      )
    
    case 'dynamic/DYNAMIC_TYPE_AV':
      return (
        <React.Suspense fallback={
          <div className="flex justify-center items-center h-full text-default-50">
            加载动态组件中...
          </div>
        }>
          <BilibiliVideoDynamic {...commonProps} />
        </React.Suspense>
      )

    case 'dynamic/DYNAMIC_TYPE_LIVE_RCMD':
      return (
        <React.Suspense fallback={
          <div className="flex justify-center items-center h-full text-default-50">
            加载动态组件中...
          </div>
        }>
          <BilibiliLiveDynamic {...commonProps} />
        </React.Suspense>
      )
    
    case 'dynamic/DYNAMIC_TYPE_FORWARD':
      return (
        <React.Suspense fallback={
          <div className="flex justify-center items-center h-full text-default-50">
            加载动态组件中...
          </div>
        }>
          <BilibiliForwardDynamic {...commonProps} />
        </React.Suspense>
      )
    
    default:
      return (
        <div className="flex justify-center items-center h-full text-default-50">
          模板 {templateId} 开发中...
        </div>
      )
  }
}

// 未来可以添加更多平台的渲染函数
// function renderWechatComponent(templateId: string, data: any, qrCodeDataUrl: string) { ... }
// function renderQQComponent(templateId: string, data: any, qrCodeDataUrl: string) { ... }
// function renderWeiboComponent(templateId: string, data: any, qrCodeDataUrl: string) { ... }