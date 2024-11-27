import { Networks } from '@/module'
import { logger } from 'node-karin'
import { KuaishouOptionsType } from '@ikenxuan/amagi'
import { KuaishouDataTypes } from '@/types'

export interface ExtendedKuaishouOptionsType extends KuaishouOptionsType {
  type: KuaishouDataTypes[keyof KuaishouDataTypes],
  [x: string]: any
}

/**
 *
 * @param url 分享链接
 * @param log 输出日志，默认true
 * @returns
 */
export async function getKuaishouID (url: string, log = true) {
  const longLink = await new Networks({ url }).getLongLink()
  let result = {} as ExtendedKuaishouOptionsType
  switch (true) {
    case /photoId=(.*)/.test(longLink): {
      const workid = longLink.match(/photoId=([^&]+)/)
      result = {
        type: 'one_work',
        photoId: workid ? workid[1] : undefined
      }
      break
    }

    default: {
      logger.warn('无法获取作品ID')
      break
    }
  }

  log && console.log(result)
  return result
}
