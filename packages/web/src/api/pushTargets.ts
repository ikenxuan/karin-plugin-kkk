import type { ApiResponse } from '../types/api'
import { authClient } from '../auth/request'

export interface BotInfo {
  id: string
  name: string
  avatar: string
  isOnline: boolean
}

export interface GroupBriefInfo {
  id: string
  name: string
  avatar: string
}

export interface GroupDetailInfo extends GroupBriefInfo {
  botId: string
  botName: string
  botAvatar: string
  memberCount?: number
  isOnline: boolean
}

export interface GroupMappingInfo {
  groupId: string
  botId: string
  groupName: string
  groupAvatar: string
  botName: string
  botAvatar: string
  isOnline: boolean
}

const unwrapResponse = <T>(response: ApiResponse<T>, fallbackMessage: string): T => {
  if ((response.success || response.code === 200) && response.data !== undefined) return response.data
  throw new Error(response.message || fallbackMessage)
}

export const getPushBots = async (): Promise<BotInfo[]> => {
  const response = await authClient.get<ApiResponse<BotInfo[]>>('/api/kkk/v1/bots')
  return unwrapResponse(response.data, '获取 Bot 列表失败')
}

export const getPushBotInfo = async (botId: string): Promise<BotInfo> => {
  const response = await authClient.get<ApiResponse<BotInfo>>(`/api/kkk/v1/bots/${encodeURIComponent(botId)}`)
  return unwrapResponse(response.data, '获取 Bot 信息失败')
}

export const getPushBotGroups = async (botId: string): Promise<GroupBriefInfo[]> => {
  const response = await authClient.get<ApiResponse<GroupBriefInfo[]>>(`/api/kkk/v1/bots/${encodeURIComponent(botId)}/groups`)
  return unwrapResponse(response.data, '获取群列表失败')
}

export const getPushBotGroupInfo = async (botId: string, groupId: string): Promise<GroupDetailInfo> => {
  const response = await authClient.get<ApiResponse<GroupDetailInfo>>(
    `/api/kkk/v1/bots/${encodeURIComponent(botId)}/groups/${encodeURIComponent(groupId)}`
  )
  return unwrapResponse(response.data, '获取群信息失败')
}

export const getPushMappingsBatch = async (groups: Array<{ groupId: string; botId: string }>): Promise<GroupMappingInfo[]> => {
  if (groups.length === 0) return []

  const response = await authClient.post<ApiResponse<GroupMappingInfo[]>>('/api/kkk/v1/groups/batch', { groups })
  return unwrapResponse(response.data, '获取推送目标信息失败')
}
