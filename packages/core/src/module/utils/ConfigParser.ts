import { Config } from './Config'

/**
 * 解析新格式的group_id，将群号@平台.索引转换为群号:机器人账号
 * @param groupId 格式: 群号@平台.索引
 * @returns 格式: 群号:机器人账号
 */
export function parseGroupId(groupId: string): string {
  const match = groupId.match(/^(\d+)@(\w+)\.(\d+)$/)
  if (!match) {
    throw new Error(`Invalid group_id format: ${groupId}. Expected format: 群号@平台.索引`)
  }

  const [, groupNumber, platform, indexStr] = match
  const index = parseInt(indexStr, 10)

  // 从配置中获取对应平台的账号列表
  const accountList = Config.pushlist.account_lists[platform]
  if (!accountList || !Array.isArray(accountList)) {
    throw new Error(`Platform ${platform} not found in account_lists`)
  }

  if (index >= accountList.length) {
    throw new Error(`Index ${index} out of range for platform ${platform}. Available indices: 0-${accountList.length - 1}`)
  }

  const botAccount = accountList[index]
  return `${groupNumber}:${botAccount}`
}

/**
 * 批量解析group_id列表
 * @param groupIds 新格式的group_id数组
 * @returns 旧格式的group_id数组
 */
export function parseGroupIds(groupIds: string[]): string[] {
  return groupIds.map(parseGroupId)
}

/**
 * 将旧格式的group_id转换为新格式
 * @param groupId 格式: 群号:机器人账号
 * @returns 格式: 群号@平台.索引，如果找不到对应账号则返回原格式
 */
export function convertToNewGroupIdFormat(groupId: string): string {
  const [groupNumber, botAccount] = groupId.split(':')
  if (!groupNumber || !botAccount) {
    return groupId
  }

  // 在所有平台的账号列表中查找该机器人账号
  for (const [platform, accounts] of Object.entries(Config.pushlist.account_lists)) {
    const index = accounts.indexOf(botAccount)
    if (index !== -1) {
      return `${groupNumber}@${platform}.${index}`
    }
  }

  // 如果找不到，返回原格式
  return groupId
}