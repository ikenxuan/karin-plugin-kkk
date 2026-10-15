import { defineTemplate } from '@karinjs/template-react'

import { XiaohongshuQrcodeImg } from './components/qrcodeImg'
import type { XiaohongshuQrcodeImgData } from './components/types'

export default defineTemplate({
  name: '登录二维码',
  description: '小红书登录二维码展示模板',
  component: XiaohongshuQrcodeImg,
  validate: (data): data is XiaohongshuQrcodeImgData =>
    typeof data === 'object' && data !== null && typeof (data as XiaohongshuQrcodeImgData).share_url === 'string'
})