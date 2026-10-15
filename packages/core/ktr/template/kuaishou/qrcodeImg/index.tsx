import { defineTemplate } from '@karinjs/template-react'

import { KuaishouQrcodeImg } from './components/qrcodeImg'
import type { KuaishouQrcodeImgData } from './components/types'

export default defineTemplate({
  name: '登录二维码',
  description: '快手登录二维码展示模板',
  component: KuaishouQrcodeImg,
  validate: (data): data is KuaishouQrcodeImgData =>
    typeof data === 'object' && data !== null && typeof (data as KuaishouQrcodeImgData).share_url === 'string'
})