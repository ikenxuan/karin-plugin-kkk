import { Button, Card, Chip, Label, Modal, ScrollShadow, toast } from '@heroui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Icon } from '../../components/common/Icon'
import type { AIProvider } from '../types/ai'
import { getAIConfig } from '../utils/aiConfig'
import { buildPrompt, extractJsonFromText, streamGenerateMockData } from '../utils/aiService'

interface AIGenerateModalProps {
  isOpen: boolean
  onClose: () => void
  platform: string
  templateId: string
  componentName?: string
  referenceData?: any
  onApply: (data: any, saveAsFilename?: string) => Promise<void> | void
  panelTheme?: 'light' | 'dark'
  panelThemeStyle?: React.CSSProperties
}

export const AIGenerateModal: React.FC<AIGenerateModalProps> = ({
  isOpen,
  onClose,
  platform,
  templateId,
  componentName,
  referenceData,
  onApply,
  panelTheme = 'light',
  panelThemeStyle
}) => {
  const [provider, setProvider] = useState<AIProvider | null>(null)
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [streamText, setStreamText] = useState('')
  const [resultData, setResultData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (isOpen) {
      const config = getAIConfig()
      const p = config.providers.find(x => x.id === config.activeProviderId) ?? null
      setProvider(p)
      setPrompt('')
      setStreamText('')
      setResultData(null)
      setError(null)
      abortRef.current = null
    }
  }, [isOpen])

  const fullPrompt = useMemo(() => {
    if (!isOpen) return null
    const config = getAIConfig()
    return buildPrompt(
      { platform, templateId, componentName, referenceData, userPrompt: prompt.trim() || undefined },
      config.defaultPrompt
    )
  }, [isOpen, platform, templateId, componentName, referenceData, prompt])

  const handleGenerate = async () => {
    if (!provider) return
    setIsGenerating(true)
    setError(null)
    setStreamText('')
    setResultData(null)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const generator = streamGenerateMockData(provider, {
        platform,
        templateId,
        componentName,
        referenceData,
        userPrompt: prompt.trim() || undefined,
        signal: controller.signal
      })

      for await (const chunk of generator) {
        if (controller.signal.aborted) break
        setStreamText(chunk.text)
        if (chunk.done && chunk.data !== undefined) {
          setResultData(chunk.data)
        }
      }

      if (!controller.signal.aborted) {
        toast.success('生成完成')
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        toast.info('已停止生成')
      } else {
        const msg = err instanceof Error ? err.message : String(err)
        setError(msg)
        toast.danger('生成失败', { description: msg })
      }
    } finally {
      setIsGenerating(false)
      abortRef.current = null
    }
  }

  const handleStop = () => {
    abortRef.current?.abort()
    setIsGenerating(false)
  }

  const handleApply = async () => {
    const dataToApply = resultData
    if (!dataToApply) {
      try {
        const parsed = extractJsonFromText(streamText)
        setResultData(parsed)
        await onApply(parsed)
        toast.success('已应用到当前数据')
        onClose()
        return
      } catch {
        toast.danger('当前内容无法解析为有效 JSON，请等待生成完成或重新生成')
        return
      }
    }
    try {
      await onApply(dataToApply)
      toast.success('已应用到当前数据')
      onClose()
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      toast.danger('应用失败', { description: msg })
    }
  }

  const noProvider = !provider

  // 生成完成后自动格式化 JSON 显示，过程中显示原始流文本
  const displayText = useMemo(() => {
    if (resultData) {
      try {
        return JSON.stringify(resultData, null, 2)
      } catch {
        return streamText
      }
    }
    return streamText
  }, [streamText, resultData])

  return (
    <Modal.Backdrop
      className={panelTheme}
      data-theme={panelTheme}
      isDismissable={!isGenerating}
      isOpen={isOpen}
      style={panelThemeStyle}
      variant='blur'
      onOpenChange={open => { if (!open && !isGenerating) onClose() }}
    >
      <Modal.Container size='cover'>
        <Modal.Dialog className='flex h-[min(85vh,900px)] max-h-[85vh] flex-col overflow-hidden'>
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Icon className='bg-default'>
              <Icon icon='lucide:wand-2' />
            </Modal.Icon>
            <Modal.Heading>AI 生成 Mock 数据</Modal.Heading>
            {!noProvider && (
              <div className='ml-auto flex items-center gap-2'>
                <Chip size='lg' variant='soft'>
                  <Icon icon='lucide:layout-template' className='size-3.5' />
                  {platform}
                </Chip>
                <Chip size='lg' variant='soft'>
                  <Icon icon='lucide:box' className='size-3.5' />
                  {componentName ?? templateId}
                </Chip>
                {provider && (
                  <Chip size='lg' variant='soft'>
                    <Icon icon='lucide:cpu' className='size-3.5' />
                    {provider.model}
                  </Chip>
                )}
              </div>
            )}
          </Modal.Header>

          <Modal.Body className='flex-1 overflow-hidden'>
            {noProvider ? (
              <div className='flex flex-col items-center justify-center gap-3 py-12'>
                <Icon icon='lucide:settings-2' className='size-8 text-default-400' />
                <p className='text-sm font-medium'>尚未配置 AI 供应商</p>
                <p className='text-xs text-default-400'>请先在顶部导航栏的「AI 配置」中完成设置。</p>
              </div>
            ) : (
              <div className='flex h-full gap-3'>
                {/* 左侧：提示词区域 */}
                <div className='flex w-[42%] flex-col gap-3'>
                  {/* 补充要求 */}
                  <div>
                    <Label className='text-xs font-medium text-default-foreground'>补充要求（可选）</Label>
                    <textarea
                      value={prompt}
                      onChange={e => setPrompt(e.target.value)}
                      placeholder='例如：生成一条带 3 张图片的小红书笔记'
                      disabled={isGenerating}
                      rows={2}
                      className='mt-1.5 w-full resize-none rounded-lg border border-default-200 bg-default-100 px-2.5 py-1.5 text-xs text-default-foreground placeholder:text-default-400 focus:border-default-400 focus:outline-none disabled:opacity-60'
                    />
                  </div>

                  {/* System Prompt */}
                  <Card className='flex flex-1 flex-col overflow-hidden'>
                    <Card.Header className='border-b border-default-200 py-2'>
                      <Card.Title className='text-xs font-medium text-default-foreground/70'>System Prompt</Card.Title>
                    </Card.Header>
                    <Card.Content className='flex-1 overflow-hidden p-0'>
                      <ScrollShadow className='h-full p-3' size={40}>
                        <pre className='whitespace-pre-wrap text-xs leading-relaxed text-default-foreground'>
                          {fullPrompt?.system}
                        </pre>
                      </ScrollShadow>
                    </Card.Content>
                  </Card>

                  {/* User Prompt */}
                  <Card className='flex flex-1 flex-col overflow-hidden'>
                    <Card.Header className='border-b border-default-200 py-2'>
                      <Card.Title className='text-xs font-medium text-default-foreground/70'>User Prompt</Card.Title>
                    </Card.Header>
                    <Card.Content className='flex-1 overflow-hidden p-0'>
                      <ScrollShadow className='h-full p-3' size={40}>
                        <pre className='whitespace-pre-wrap text-xs leading-relaxed text-default-foreground'>
                          {fullPrompt?.user}
                        </pre>
                      </ScrollShadow>
                    </Card.Content>
                  </Card>
                </div>

                {/* 右侧：生成结果 */}
                <Card className='flex flex-1 flex-col overflow-hidden'>
                  <Card.Header className='flex items-center justify-between border-b border-default-200 py-2'>
                    <Card.Title className='text-xs font-medium text-default-foreground/70'>
                      {resultData ? '生成结果' : isGenerating ? '生成中...' : '输出'}
                    </Card.Title>
                    {isGenerating && (
                      <span className='flex items-center gap-1.5 text-xs text-default-400'>
                        <Icon icon='lucide:loader-2' className='size-3 animate-spin' />
                        {streamText.length} 字符
                      </span>
                    )}
                  </Card.Header>
                  <Card.Content className='flex-1 overflow-hidden p-0'>
                    <ScrollShadow className='h-full p-3' size={40}>
                      {displayText ? (
                        <pre className='whitespace-pre-wrap text-xs leading-relaxed text-default-foreground'>
                          {displayText}
                        </pre>
                      ) : (
                        <div className='flex h-full flex-col items-center justify-center gap-2 text-xs text-default-400'>
                          <Icon icon='lucide:sparkles' className='size-5 opacity-40' />
                          <span>点击「开始生成」生成 mock 数据</span>
                        </div>
                      )}
                    </ScrollShadow>
                  </Card.Content>
                </Card>
              </div>
            )}

            {/* 错误提示 */}
            {error && (
              <div className='mt-3 flex items-start gap-2 rounded-lg bg-danger-50 p-2.5 text-xs text-danger'>
                <Icon icon='lucide:alert-triangle' className='size-4 shrink-0' />
                <span className='break-all'>{error}</span>
              </div>
            )}
          </Modal.Body>

          {!noProvider && (
            <Modal.Footer>
              <Button onPress={onClose} variant='tertiary' isDisabled={isGenerating}>
                关闭
              </Button>
              {isGenerating ? (
                <Button onPress={handleStop} variant='secondary'>
                  <Icon icon='lucide:square' className='size-4' />
                  停止生成
                </Button>
              ) : (
                <Button onPress={handleGenerate} variant='secondary'>
                  <Icon icon='lucide:wand-2' className='size-4' />
                  {streamText ? '重新生成' : '开始生成'}
                </Button>
              )}
              <Button
                isDisabled={!streamText || isGenerating}
                onPress={handleApply}
                variant='primary'
              >
                <Icon icon='lucide:check' className='size-4' />
                确认应用
              </Button>
            </Modal.Footer>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}
