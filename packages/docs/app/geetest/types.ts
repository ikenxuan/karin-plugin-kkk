// ============ 极验3 类型定义 ============
export interface Geetest3Result {
  geetest_challenge: string
  geetest_validate: string
  geetest_seccode: string
}

export interface Geetest3Error {
  msg: string
  error_code?: string
}

export interface Geetest3CaptchaObj {
  appendTo: (selector: string) => void
  onReady: (callback: () => void) => Geetest3CaptchaObj
  onSuccess: (callback: () => void) => Geetest3CaptchaObj
  onError: (callback: (error: Geetest3Error) => void) => Geetest3CaptchaObj
  verify: () => void
  getValidate: () => Geetest3Result | false
  destroy: () => void
}

export interface Geetest3Config {
  gt: string
  challenge: string
  offline: boolean
  new_captcha: boolean
  product?: 'popup' | 'float' | 'bind'
  width?: string
  https?: boolean
}

// ============ 极验4 类型定义 ============
export interface Geetest4Result {
  lot_number: string
  captcha_output: string
  pass_token: string
  gen_time: string
}

export interface Geetest4Error {
  code: string
  msg: string
  desc?: {
    detail: string
  }
}

export interface Geetest4CaptchaObj {
  appendTo: (selector: string | HTMLElement) => Geetest4CaptchaObj
  getValidate: () => Geetest4Result | false
  reset: () => Geetest4CaptchaObj
  showCaptcha: () => Geetest4CaptchaObj
  destroy: () => Geetest4CaptchaObj
  onReady: (callback: () => void) => Geetest4CaptchaObj
  onSuccess: (callback: () => void) => Geetest4CaptchaObj
  onError: (callback: (error: Geetest4Error) => void) => Geetest4CaptchaObj
  onClose: (callback: () => void) => Geetest4CaptchaObj
}

export interface Geetest4Config {
  captchaId: string
  product?: 'float' | 'popup' | 'bind'
  language?: string
  onError?: (error: Geetest4Error) => void
}

export type GeetestVersion = 'v3' | 'v4'

declare global {
  function initGeetest(
    config: Geetest3Config,
    callback: (captchaObj: Geetest3CaptchaObj) => void
  ): void

  function initGeetest4(
    config: Geetest4Config,
    callback: (captchaObj: Geetest4CaptchaObj) => void
  ): void
}
