import { sha256 } from 'js-sha256'

/**
 * 使用js-sha256库进行同步SHA256哈希计算
 * @param data 待加密的数据
 * @returns SHA256哈希值的十六进制字符串
 */
export const sha256HashSync = (data: string): string => {
  return sha256(data)
}