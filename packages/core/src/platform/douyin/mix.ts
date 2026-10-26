import { Common } from '@/module/utils/Common'

/** 句中的「第N集」，集数可以是阿拉伯数字或中文数字，数字两侧允许空格（模板里写的就是「第 N 集」） */
const EPISODE_IN_TEXT = /第\s*([0-9]+|[零一二三四五六七八九十百千]+)\s*集/
/** 整条回复只有集数：「12」「12集」「十二」 */
const EPISODE_ONLY = /^([0-9]+|[零一二三四五六七八九十百千]+)\s*集?$/

/**
 * 从用户回复里解析要看的集数。
 * @param msg 用户回复的文本
 * @returns 集数（从 1 开始）；没解析出来返回 null
 */
export const parseMixEpisode = (msg: string): number | null => {
  const text = msg.trim()
  const raw = (EPISODE_IN_TEXT.exec(text) ?? EPISODE_ONLY.exec(text))?.[1]
  if (!raw) return null
  const episode = /^[0-9]+$/.test(raw) ? Number(raw) : Common.chineseToArabic(raw)
  return Number.isInteger(episode) && episode > 0 ? episode : null
}
