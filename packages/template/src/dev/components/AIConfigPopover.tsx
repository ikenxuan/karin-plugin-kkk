import {
  Button,
  Input,
  Label,
  ListBox,
  Popover,
  Select,
  TextField,
  toast
} from '@heroui/react'
import React, { useEffect, useState } from 'react'

import { Icon } from '../../components/common/Icon'
import type { AIProvider, APIFormat } from '../types/ai'
import { API_FORMAT_TEMPLATES } from '../types/ai'
import {
  addProvider,
  getAIConfig,
  removeProvider,
  setActiveProvider,
  setDefaultPrompt,
  updateProvider
} from '../utils/aiConfig'
import { testProvider } from '../utils/aiService'

interface AIConfigPopoverProps {
  panelTheme?: 'light' | 'dark'
  panelThemeStyle?: React.CSSProperties
}

/**
 * AI 配置 Popover（非模态窗）
 */
export const AIConfigPopover: React.FC<AIConfigPopoverProps> = ({
  panelTheme = 'light',
  panelThemeStyle
}) => {
  const [providers, setProviders] = useState<AIProvider[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [defaultPrompt, setDefaultPromptState] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const [draft, setDraft] = useState<{
    id?: string
    apiFormat: APIFormat
    baseUrl: string
    apiKey: string
    model: string
  }>({
    apiFormat: 'openai',
    baseUrl: API_FORMAT_TEMPLATES[0].defaultBaseUrl,
    apiKey: '',
    model: ''
  })

  const refresh = () => {
    const config = getAIConfig()
    setProviders(config.providers)
    setActiveId(config.activeProviderId)
    setDefaultPromptState(config.defaultPrompt ?? '')
  }

  useEffect(() => {
    refresh()
  }, [])

  const activeProvider = providers.find(p => p.id === activeId)

  const handleStartAdd = () => {
    setDraft({
      apiFormat: 'openai',
      baseUrl: API_FORMAT_TEMPLATES[0].defaultBaseUrl,
      apiKey: '',
      model: ''
    })
    setShowApiKey(false)
    setIsEditing(true)
  }

  const handleStartEdit = (provider: AIProvider) => {
    setDraft({
      id: provider.id,
      apiFormat: provider.apiFormat,
      baseUrl: provider.baseUrl,
      apiKey: provider.apiKey,
      model: provider.model
    })
    setShowApiKey(false)
    setIsEditing(true)
  }

  const handleSave = () => {
    const { apiFormat, baseUrl, apiKey, model } = draft
    const url = baseUrl.trim()
    const key = apiKey.trim()
    const m = model.trim()
    if (!url) return toast.danger('请填写 Base URL')
    if (!key) return toast.danger('请填写 API Key')
    if (!m) return toast.danger('请填写模型 ID')

    if (draft.id) {
      updateProvider(draft.id, { apiFormat, baseUrl: url, apiKey: key, model: m })
      toast.success('已更新供应商')
    } else {
      const template = API_FORMAT_TEMPLATES.find(t => t.key === apiFormat)
      addProvider({
        apiFormat,
        baseUrl: url,
        apiKey: key,
        model: m
      })
      toast.success(`已添加 ${template?.name ?? apiFormat} 供应商`)
    }
    refresh()
    setIsEditing(false)
  }

  const handleDelete = (id: string) => {
    if (!window.confirm('确认删除此供应商配置？')) return
    removeProvider(id)
    refresh()
  }

  const handleSetActive = (id: string) => {
    setActiveProvider(id)
    refresh()
  }

  const handleTest = async () => {
    const url = draft.baseUrl.trim()
    const key = draft.apiKey.trim()
    const m = draft.model.trim()
    if (!url || !key || !m) {
      toast.danger('请先填写完整信息')
      return
    }
    setIsTesting(true)
    try {
      const result = await testProvider({
        id: draft.id ?? 'temp',
        apiFormat: draft.apiFormat,
        baseUrl: url,
        apiKey: key,
        model: m,
        createdAt: Date.now()
      })
      if (result.ok) toast.success('测试成功', { description: result.message })
      else toast.danger('测试失败', { description: result.message })
    } finally {
      setIsTesting(false)
    }
  }

  const handleSavePrompt = () => {
    setDefaultPrompt(defaultPrompt.trim() || undefined)
    toast.success('已保存默认生成要求')
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Popover 关闭时重置到列表页
      setIsEditing(false)
    }
  }

  return (
    <Popover.Root onOpenChange={handleOpenChange}>
      <Popover.Trigger>
        <Button size='sm' variant='secondary'>
          <Icon icon='lucide:sparkles' className='size-4' />
          AI 配置
          {activeProvider && (
            <span className='ml-1 rounded-full bg-foreground px-1.5 py-0.5 text-[10px] text-background'>
              {activeProvider.apiFormat}
            </span>
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Content className={`${panelTheme} w-80`} data-theme={panelTheme} style={panelThemeStyle}>
        <Popover.Arrow />
        <Popover.Dialog className='flex max-h-[70vh] flex-col gap-4 overflow-y-auto p-4'>
          <Popover.Heading className='flex items-center gap-2 text-sm font-semibold'>
            <Icon icon='lucide:sparkles' className='size-4' />
            AI 供应商配置
          </Popover.Heading>

          {isEditing ? (
            <div className='flex flex-col gap-3'>
              {/* API 格式 */}
              <div className='space-y-1.5'>
                <Label className='text-[10px] font-semibold tracking-[0.18em] text-muted uppercase'>
                  API 格式
                </Label>
                <Select
                  value={draft.apiFormat}
                  variant='secondary'
                  onChange={(value) => {
                    if (typeof value === 'string') {
                      const v = value as APIFormat
                      const template = API_FORMAT_TEMPLATES.find(t => t.key === v)
                      setDraft(prev => ({
                        ...prev,
                        apiFormat: v,
                        baseUrl: template?.defaultBaseUrl ?? prev.baseUrl
                      }))
                    }
                  }}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className='p-0'>
                    <div className={panelTheme} data-theme={panelTheme} style={panelThemeStyle}>
                      <ListBox className='p-1'>
                        {API_FORMAT_TEMPLATES.map(t => (
                          <ListBox.Item key={t.key} id={t.key} textValue={t.name}>
                            <Icon icon={t.icon} className='size-4 text-muted' />
                            {t.name}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </div>
                  </Select.Popover>
                </Select>
              </div>

              {/* Base URL */}
              <TextField
                value={draft.baseUrl}
                onChange={(value: string) => setDraft(prev => ({ ...prev, baseUrl: value }))}
              >
                <Label className='text-[10px] font-semibold tracking-[0.18em] text-muted uppercase'>Base URL</Label>
                <Input placeholder='https://api.openai.com' />
              </TextField>

              {/* API Key */}
              <TextField
                value={draft.apiKey}
                onChange={(value: string) => setDraft(prev => ({ ...prev, apiKey: value }))}
              >
                <Label className='text-[10px] font-semibold tracking-[0.18em] text-muted uppercase'>API Key</Label>
                <div className='flex items-center gap-2'>
                  <Input
                    className='flex-1'
                    placeholder='sk-xxx 或 sk-ant-xxx'
                    type={showApiKey ? 'text' : 'password'}
                    autoComplete='off'
                  />
                  <Button
                    isIconOnly
                    onPress={() => setShowApiKey(v => !v)}
                    size='sm'
                    variant='ghost'
                  >
                    <Icon icon={showApiKey ? 'lucide:eye-off' : 'lucide:eye'} className='size-4' />
                  </Button>
                </div>
              </TextField>

              {/* Model ID */}
              <TextField
                value={draft.model}
                onChange={(value: string) => setDraft(prev => ({ ...prev, model: value }))}
              >
                <Label className='text-[10px] font-semibold tracking-[0.18em] text-muted uppercase'>模型 ID</Label>
                <Input placeholder='例如 gpt-4o-mini 或 claude-3-5-sonnet' />
              </TextField>

              <div className='flex gap-2'>
                <Button
                  className='flex-1'
                  onPress={() => setIsEditing(false)}
                  size='sm'
                  variant='tertiary'
                >
                  取消
                </Button>
                <Button
                  className='flex-1'
                  isDisabled={isTesting}
                  isPending={isTesting}
                  onPress={handleTest}
                  size='sm'
                  variant='secondary'
                >
                  {({ isPending }) => (isPending ? '测试中...' : '测试连接')}
                </Button>
                <Button
                  className='flex-1'
                  onPress={handleSave}
                  size='sm'
                  variant='primary'
                >
                  保存
                </Button>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-3'>
              {providers.length === 0 ? (
                <div className='rounded-xl border border-dashed border-border bg-surface-secondary p-4 text-center'>
                  <p className='text-xs text-muted'>尚未配置供应商</p>
                  <Button
                    className='mt-2 w-full'
                    onPress={handleStartAdd}
                    size='sm'
                    variant='primary'
                  >
                    <Icon icon='lucide:plus' className='size-4' />
                    添加供应商
                  </Button>
                </div>
              ) : (
                <div className='flex flex-col gap-2'>
                  {providers.map(p => {
                    const isActive = p.id === activeId
                    const tmpl = API_FORMAT_TEMPLATES.find(t => t.key === p.apiFormat)
                    return (
                      <div
                        key={p.id}
                        className={`rounded-xl border p-2.5 ${isActive ? 'border-foreground bg-surface' : 'border-border bg-surface-secondary'}`}
                      >
                        <div className='flex items-center justify-between gap-2'>
                          <div className='min-w-0 flex-1'>
                            <div className='flex items-center gap-1.5'>
                              <Icon icon={tmpl?.icon ?? 'lucide:bot'} className='size-3.5 text-muted' />
                              <span className='text-xs font-medium'>{tmpl?.name ?? p.apiFormat}</span>
                              {isActive && (
                                <span className='rounded bg-foreground px-1 py-0.5 text-[9px] text-background'>默认</span>
                              )}
                            </div>
                            <p className='mt-0.5 truncate text-[11px] text-muted'>{p.model}</p>
                          </div>
                          <div className='flex items-center gap-1'>
                            {!isActive && (
                              <Button
                                isIconOnly
                                onPress={() => handleSetActive(p.id)}
                                size='sm'
                                variant='ghost'
                              >
                                <Icon icon='lucide:check-circle-2' className='size-3.5' />
                              </Button>
                            )}
                            <Button
                              isIconOnly
                              onPress={() => handleStartEdit(p)}
                              size='sm'
                              variant='ghost'
                            >
                              <Icon icon='lucide:pencil' className='size-3.5' />
                            </Button>
                            <Button
                              isIconOnly
                              onPress={() => handleDelete(p.id)}
                              size='sm'
                              variant='ghost'
                            >
                              <Icon icon='lucide:trash-2' className='size-3.5' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <Button
                    className='w-full'
                    onPress={handleStartAdd}
                    size='sm'
                    variant='secondary'
                  >
                    <Icon icon='lucide:plus' className='size-4' />
                    添加供应商
                  </Button>
                </div>
              )}

              <div className='space-y-1.5 rounded-xl border border-border bg-surface-secondary p-3'>
                <Label className='text-[10px] font-semibold tracking-[0.18em] text-muted uppercase'>
                  默认生成要求（可选）
                </Label>
                <textarea
                  value={defaultPrompt}
                  onChange={e => setDefaultPromptState(e.target.value)}
                  placeholder='每次 AI 生成时默认携带的要求，例如：使用中文、时间戳在 2024 年内...'
                  className='min-h-15 w-full resize-none rounded-lg border border-field-border bg-field-background px-2.5 py-2 text-xs text-field-foreground placeholder:text-field-placeholder focus:outline-none'
                />
                <div className='flex justify-end'>
                  <Button onPress={handleSavePrompt} size='sm' variant='secondary'>
                    <Icon icon='lucide:save' className='size-3.5' />
                    保存
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Popover.Dialog>
      </Popover.Content>
    </Popover.Root>
  )
}
