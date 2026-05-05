/**
 * AI 服务模块
 * 通过 Vite 开发服务器代理转发请求，完全规避浏览器 CORS 限制
 * 支持流式响应
 */

import type { AIGenerateOptions, AIGenerateResult, AIProvider } from '../types/ai'
import { getActiveProvider, getAIConfig } from './aiConfig'

/**
 * 从文本中提取 JSON
 */
export const extractJsonFromText = (text: string): any => {
  if (!text) throw new Error('AI 响应内容为空')
  const trimmed = text.trim()
  try { return JSON.parse(trimmed) } catch { /* ignore */ }
  const codeBlock = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (codeBlock?.[1]) {
    try { return JSON.parse(codeBlock[1].trim()) } catch { /* ignore */ }
  }
  const firstBrace = trimmed.indexOf('{')
  const lastBrace = trimmed.lastIndexOf('}')
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try { return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1)) } catch { /* ignore */ }
  }
  const firstBracket = trimmed.indexOf('[')
  const lastBracket = trimmed.lastIndexOf(']')
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    try { return JSON.parse(trimmed.slice(firstBracket, lastBracket + 1)) } catch { /* ignore */ }
  }
  throw new Error('无法从 AI 响应中解析出 JSON 数据')
}

const sampleReferenceJson = (data: any, maxLength = 6000): string => {
  if (data == null) return ''
  try {
    const str = JSON.stringify(data, null, 2)
    return str.length <= maxLength ? str : `${str.slice(0, maxLength)}\n... (已截断)`
  } catch { return '' }
}

export const buildPrompt = (options: AIGenerateOptions, extra?: string): { system: string; user: string } => {
  const { platform, templateId, componentName, referenceData, userPrompt } = options
  const sample = sampleReferenceJson(referenceData)
  const system = [
    '你是一个 mock 数据生成助手，专门为前端模板渲染场景生成可直接使用的 JSON 测试数据。',
    '生成数据时请严格遵循以下规则：',
    '1. 仅输出一个完整、可被 JSON.parse 解析的 JSON 对象，不要输出额外解释或 Markdown 包裹。',
    '2. 数据结构必须与参考示例保持完全一致（字段名、嵌套层级、字段类型一致），仅替换字段值为合理的随机/伪造数据。',
    '3. 字符串使用中文场景常见数据，链接使用合法形式但可以是虚构域名，时间戳使用毫秒级整数。',
    '4. 数组保持示例的元素数量级，必要时可适度增减但不少于 1 项。',
    '5. 不能编造原本不存在的字段，也不能删除必需字段。',
    extra ? `补充指引：${extra}` : ''
  ].filter(Boolean).join('\n')

  const userParts: string[] = []
  userParts.push(`目标平台：${platform}`)
  userParts.push(`目标子组件：${templateId}${componentName ? `（${componentName}）` : ''}`)
  if (sample) {
    userParts.push('参考数据示例（请按此结构生成全新的一份 mock 数据）：')
    userParts.push('```json')
    userParts.push(sample)
    userParts.push('```')
  } else {
    userParts.push('当前没有参考数据，请基于子组件名称合理推断字段并生成结构化的 mock 数据。')
  }
  if (userPrompt) userParts.push(`用户额外要求：${userPrompt}`)
  userParts.push('请直接输出符合要求的 JSON 数据。')
  return { system, user: userParts.join('\n\n') }
}

/**
 * 解析 SSE 流中的增量文本（支持 OpenAI 和 Claude 格式）
 */
function parseSSEChunk(chunk: string, apiFormat: 'openai' | 'claude'): string | null {
  const lines = chunk.split('\n')
  let dataLine = ''
  let inData = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed === '') {
      // 空行表示一个 SSE 事件结束，处理已收集的数据
      if (inData && dataLine) {
        break
      }
      continue
    }
    if (trimmed.startsWith('data:')) {
      inData = true
      dataLine = trimmed.slice(5).trim()
      break
    }
    if (trimmed.startsWith('event:') || trimmed.startsWith('id:')) {
      // Claude 格式有 event 行，忽略它，等待 data 行
      continue
    }
  }

  if (!dataLine || dataLine === '[DONE]') return null

  try {
    const parsed = JSON.parse(dataLine)
    if (apiFormat === 'claude') {
      // Claude: delta.text
      const text = parsed.delta?.text
      if (typeof text === 'string') return text
      // Claude message_delta 事件也有 usage，没有内容
      return null
    } else {
      // OpenAI: choices[0].delta.content
      const content = parsed.choices?.[0]?.delta?.content
      if (typeof content === 'string') return content
      return null
    }
  } catch {
    return null
  }
}

/**
 * 流式生成 mock 数据
 * @returns AsyncGenerator，每次 yield { text: 当前累积文本, done: 是否结束 }
 * 最后一次 yield 包含 { text, done: true, data?: 解析后的 JSON }
 */
export async function* streamGenerateMockData(
  provider: AIProvider,
  options: AIGenerateOptions
): AsyncGenerator<{ text: string; done: boolean; data?: any }, void, unknown> {
  const config = getAIConfig()
  const { system, user } = buildPrompt(options, config.defaultPrompt)
  const isClaude = provider.apiFormat === 'claude'

  const apiBody = isClaude
    ? {
      model: provider.model,
      max_tokens: 4096,
      system,
      messages: [{ role: 'user', content: user }],
      stream: true
    }
    : {
      model: provider.model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      temperature: 0.7,
      stream: true
    }

  const resp = await fetch('/__ai_proxy__', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiFormat: provider.apiFormat,
      baseUrl: provider.baseUrl,
      apiKey: provider.apiKey,
      body: apiBody
    }),
    signal: options.signal
  })

  if (!resp.ok) {
    const text = await resp.text()
    let errMsg = `HTTP ${resp.status}`
    try {
      const errJson = JSON.parse(text)
      errMsg = errJson.error?.message || errJson.error || errJson.message || text
    } catch {
      errMsg = text || errMsg
    }
    throw new Error(errMsg)
  }

  if (!resp.body) {
    throw new Error('响应体为空，无法读取流')
  }

  const reader = resp.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''
  let fullText = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      // SSE 事件以两个换行分隔
      const events = buffer.split('\n\n')
      // 最后一个可能是未完成的事件，保留在 buffer 中
      buffer = events.pop() || ''

      for (const event of events) {
        const chunk = parseSSEChunk(event, provider.apiFormat)
        if (chunk !== null) {
          fullText += chunk
          yield { text: fullText, done: false }
        }
      }
    }

    // 处理剩余 buffer
    if (buffer.trim()) {
      const chunk = parseSSEChunk(buffer, provider.apiFormat)
      if (chunk !== null) {
        fullText += chunk
        yield { text: fullText, done: false }
      }
    }
  } finally {
    reader.releaseLock()
  }

  // 流结束，解析 JSON
  const data = extractJsonFromText(fullText)
  yield { text: fullText, done: true, data }
}

/**
 * 通用代理调用（非流式，用于测试连接等）
 */
const callProxy = async (
  provider: AIProvider,
  systemPrompt: string,
  userPrompt: string,
  signal?: AbortSignal
): Promise<{ content: string; model: string }> => {
  const isClaude = provider.apiFormat === 'claude'

  const apiBody = isClaude
    ? {
      model: provider.model,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    }
    : {
      model: provider.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    }

  const resp = await fetch('/__ai_proxy__', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiFormat: provider.apiFormat,
      baseUrl: provider.baseUrl,
      apiKey: provider.apiKey,
      body: apiBody
    }),
    signal
  })

  const respText = await resp.text()

  if (!resp.ok) {
    let errMsg = `HTTP ${resp.status}`
    try {
      const errJson = JSON.parse(respText)
      errMsg = errJson.error?.message || errJson.error || errJson.message || respText
    } catch {
      errMsg = respText || errMsg
    }
    throw new Error(errMsg)
  }

  let data: any
  try {
    data = JSON.parse(respText)
  } catch {
    throw new Error('AI 返回了非 JSON 格式的响应')
  }

  if (isClaude) {
    const content = data.content?.[0]?.text ?? ''
    if (!content) throw new Error('Claude 返回内容为空')
    return { content, model: data.model || provider.model }
  } else {
    const content = data.choices?.[0]?.message?.content ?? ''
    if (!content) throw new Error('OpenAI 返回内容为空')
    return { content, model: data.model || provider.model }
  }
}

/**
 * 生成 mock 数据（非流式，使用指定供应商）
 */
export const generateMockDataWithProvider = async (
  provider: AIProvider,
  options: AIGenerateOptions
): Promise<AIGenerateResult> => {
  const config = getAIConfig()
  const { system, user } = buildPrompt(options, config.defaultPrompt)
  const { content, model } = await callProxy(provider, system, user, options.signal)
  const data = extractJsonFromText(content)
  return { data, rawText: content, model }
}

/**
 * 生成 mock 数据（非流式，使用当前激活的供应商）
 */
export const generateMockData = async (options: AIGenerateOptions): Promise<AIGenerateResult> => {
  const provider = getActiveProvider()
  if (!provider) throw new Error('尚未配置 AI 供应商')
  return generateMockDataWithProvider(provider, options)
}

/**
 * 测试供应商连通性
 */
export const testProvider = async (provider: AIProvider, signal?: AbortSignal): Promise<{ ok: boolean; message: string }> => {
  try {
    const { content } = await callProxy(
      provider,
      '你是一个连通性测试助手，请严格按要求回复。',
      '请仅回复 JSON：{"ok": true}',
      signal
    )
    try {
      const parsed = extractJsonFromText(content)
      if (parsed?.ok === true) return { ok: true, message: '连接成功，模型响应正常' }
    } catch { /* ignore */ }
    return { ok: true, message: `连接成功，模型已返回内容（${content.slice(0, 60)}...）` }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { ok: false, message }
  }
}
