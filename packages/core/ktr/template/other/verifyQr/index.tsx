import { defineTemplate } from '@karinjs/template-react'

import { VerifyQr } from './components/verifyQr'
import type { VerifyQrData } from './components/types'

export default defineTemplate({
  name: '风控验证二维码',
  description: '把平台的风控验证页地址渲染成二维码，交给真人扫码过码',
  component: VerifyQr,
  validate: (data): data is VerifyQrData =>
    typeof data === 'object' && data !== null && typeof (data as VerifyQrData).share_url === 'string'
})