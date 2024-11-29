import { getBilibiliData, wbi_sign } from '@ikenxuan/amagi'

import { Config } from '@/module/utils'

export async function genParams (apiURL: string) {
  if (Config.cookies.bilibili === '' || Config.cookies.bilibili === null) return { QUERY: '&platform=html5', STATUS: '!isLogin' }
  const logininfo = await getBilibiliData('登录基本信息', Config.cookies.bilibili)
  const sign = await wbi_sign(apiURL, Config.cookies.bilibili)

  const qn = [ 6, 16, 32, 64, 74, 80, 112, 116, 120, 125, 126, 127 ]
  let isvip
  logininfo.data.vipStatus === 1 ? (isvip = true) : (isvip = false)
  if (isvip) {
    return { QUERY: `&fnval=16&fourk=1&${sign}`, STATUS: 'isLogin', isvip }
  } else return { QUERY: `&qn=${qn[3]}&fnval=16`, STATUS: 'isLogin', isvip }
}