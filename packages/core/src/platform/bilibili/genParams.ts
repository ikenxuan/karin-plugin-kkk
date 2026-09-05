import { wbi_sign } from '@ikenxuan/amagi'

import { bilibiliFetcher } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'

/**
 * 计算请求参数
 * @param apiURL 请求地址
 * @returns
 */
export const genParams = async (apiURL: string): Promise<string> => {
  if (Config.amagi.cookies.bilibili === '' || Config.amagi.cookies.bilibili === null) return '&platform=html5'
  const loginInfo = await bilibiliFetcher.fetchLoginStatus({ typeMode: 'strict' })
  const genSign = await wbi_sign(apiURL, Config.amagi.cookies.bilibili)

  const qn = [6, 16, 32, 64, 74, 80, 112, 116, 120, 125, 126, 127]
  const isvip = loginInfo.data.data.vipStatus === 1
  if (isvip) {
    return `&fnval=16&fourk=1&${genSign}`
  } else return `&qn=${qn[3]}&fnval=16`
}

export const checkCk = async (): Promise<{ Status: 'isLogin' | '!isLogin'; isVIP: boolean }> => {
  if (Config.amagi.cookies.bilibili === '' || Config.amagi.cookies.bilibili === null) return { Status: '!isLogin', isVIP: false }
  const loginInfo = await bilibiliFetcher.fetchLoginStatus({ typeMode: 'strict' })
  const isVIP = loginInfo.data.data.vipStatus === 1
  if (isVIP) {
    return { Status: 'isLogin', isVIP }
  } else return { Status: 'isLogin', isVIP }
}
