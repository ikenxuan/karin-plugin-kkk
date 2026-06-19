/**
 * 通用配置管理面板。
 * 配置项直接在前端硬编码，不依赖 Karin schema 数据。
 */

import { Button, Description, Form, Spinner, Tabs, Tooltip, toast, useOverlayState } from '@heroui/react'
import { useMemoizedFn, useRequest, useSetState, useUpdateEffect } from 'ahooks'
import equal from 'fast-deep-equal'
import gsap from 'gsap'
import { GitCompare, RotateCcw, Save } from 'lucide-react'
import { useEffect, useMemo, useRef, type FormEvent, type Key } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getConfig, saveConfig } from '../../api/config'
import type { ConfigType } from '../../types/config'
import { fadeInFrom, fadeInTo, getAnimationDuration, getStaggerDelay } from '../../utils/animations'
import { ConfigDiffOverlay } from './config-panel/ConfigDiffOverlay'
import { createConfigFieldRenderers } from './config-panel/fieldRenderers'
import { getLayoutClasses } from './config-panel/layout'
import { configFiles } from './config-panel/options'
import ActiveConfigPage from './config-panel/pages/ActiveConfigPage'
import type { ConfigFileKey, ConfigPath, DeviceLayout } from './config-panel/types'
import { normalizeConfigArrays, setValue } from './config-panel/utils'
import { validateConfig } from './config-panel/validation'

interface ConfigPanelProps {
  device?: DeviceLayout
}

const ConfigPanel = ({ device = 'desktop' }: ConfigPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const diffState = useOverlayState()

  // 从 URL 查询参数获取当前配置文件，默认为 'amagi'
  const fileParam = searchParams.get('file')
  const isValidFile = fileParam && configFiles.some((f) => f.key === fileParam)
  const initialActiveFile = (isValidFile ? fileParam : 'amagi') as ConfigFileKey

  const [state, setPanelState] = useSetState({
    config: null as ConfigType | null,
    savedConfig: null as ConfigType | null,
    activeFile: initialActiveFile as ConfigFileKey
  })
  const { activeFile, config, savedConfig } = state
  const classes = useMemo(() => getLayoutClasses(device), [device])
  const controlSize = device === 'mobile' ? 'sm' : 'md'

  const { loading, run: fetchConfig } = useRequest(getConfig, {
    onSuccess: (data) => {
      setPanelState({
        config: structuredClone(data),
        savedConfig: structuredClone(data)
      })
    },
    onError: (error) => {
      toast.danger('加载配置失败', { description: error.message })
    }
  })

  const { loading: saving, runAsync: submitConfig } = useRequest(saveConfig, {
    manual: true
  })

  const hasChanges = useMemo(() => {
    if (!config || !savedConfig) return false
    // 标准化数组字段顺序后再比较，避免因顺序不同误判为配置变更
    const normalizedConfig = normalizeConfigArrays(config)
    const normalizedSavedConfig = normalizeConfigArrays(savedConfig)
    return !equal(normalizedConfig, normalizedSavedConfig)
  }, [config, savedConfig])

  const validationErrors = useMemo(() => {
    return validateConfig(config)
  }, [config])

  const hasValidationError = useMemo(() => {
    return Object.values(validationErrors).some(Boolean)
  }, [validationErrors])

  const saveActionActive = useMemo(() => {
    return hasChanges && !hasValidationError && !loading
  }, [hasChanges, hasValidationError, loading])

  const updateConfigValue = useMemoizedFn((path: ConfigPath, value: unknown) => {
    setPanelState((current) => {
      if (!current.config) return null
      return { config: setValue(current.config, path, value) }
    })
  })

  const handleSave = useMemoizedFn(() => {
    if (!config || hasValidationError) return

    const nextConfig = config
    const savePromise = submitConfig(nextConfig).then(() => {
      setPanelState({ savedConfig: nextConfig })
    })

    toast.promise(savePromise, {
      loading: '正在保存配置...',
      success: '配置已保存',
      error: (error) => (error instanceof Error ? error.message : '保存配置失败')
    })
  })

  const handleReset = useMemoizedFn(() => {
    fetchConfig()
  })

  const handleTabChange = useMemoizedFn((key: Key) => {
    const newFile = key as ConfigFileKey
    // 只更新 URL，让 useEffect 同步状态，避免双重渲染
    setSearchParams({ file: newFile })
  })

  const handleFormSubmit = useMemoizedFn((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSave()
  })

  useEffect(() => {
    // 监听 URL 查询参数变化，同步到状态
    const fileParam = searchParams.get('file')
    const isValidFile = fileParam && configFiles.some((f) => f.key === fileParam)
    if (isValidFile && fileParam !== activeFile) {
      setPanelState({ activeFile: fileParam as ConfigFileKey })
    }
  }, [searchParams, activeFile, setPanelState])

  useEffect(() => {
    const container = panelRef.current?.querySelector<HTMLElement>('[data-config-tabs-scroll="true"]')
    if (!container) return

    const handleTabsWheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY

      if (!delta) return

      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()

      if (container.scrollWidth <= container.clientWidth) return

      container.scrollLeft += delta
    }

    container.addEventListener('wheel', handleTabsWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleTabsWheel)
    }
  }, [config])

  const animateCurrentPanel = useMemoizedFn(() => {
    if (!panelRef.current) return

    gsap.fromTo(panelRef.current.querySelectorAll('[data-config-section]'), fadeInFrom, {
      ...fadeInTo,
      duration: getAnimationDuration(0.35),
      stagger: getStaggerDelay(0.03)
    })
  })

  useEffect(() => {
    if (!config || panelRef.current?.dataset.animated === 'true') return
    if (panelRef.current) panelRef.current.dataset.animated = 'true'
    animateCurrentPanel()
  }, [config, animateCurrentPanel])

  useUpdateEffect(() => {
    animateCurrentPanel()
  }, [activeFile])

  const renderers = useMemo(
    () =>
      config
        ? createConfigFieldRenderers({
            config,
            device,
            classes,
            validationErrors,
            updateConfigValue
          })
        : ({} as ReturnType<typeof createConfigFieldRenderers>),
    [config, device, classes, validationErrors, updateConfigValue]
  )

  if (loading || !config) {
    return (
      <div className={`${classes.root} ${classes.loading}`}>
        <Spinner size="sm" aria-label="正在读取配置" />
        <span>正在读取配置</span>
      </div>
    )
  }

  const actionControls = (
    <div className={classes.floatingActions}>
      <div className={classes.actionControls}>
        <Tooltip delay={0}>
          <Tooltip.Trigger aria-label="重新读取配置">
            <Button isIconOnly size={controlSize} variant="secondary" isDisabled={loading || saving} onPress={handleReset}>
              <RotateCcw size={16} aria-hidden="true" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content showArrow placement="bottom">
            <Tooltip.Arrow />
            重新读取
          </Tooltip.Content>
        </Tooltip>
        <Tooltip delay={0}>
          <Tooltip.Trigger aria-label="查看配置变更">
            <Button isIconOnly size={controlSize} variant="secondary" isDisabled={!hasChanges} onPress={diffState.open}>
              <GitCompare size={16} aria-hidden="true" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content showArrow placement="bottom">
            <Tooltip.Arrow />
            查看变更
          </Tooltip.Content>
        </Tooltip>
        <Button size={controlSize} isDisabled={!saveActionActive} isPending={saving} onPress={handleSave} variant="primary">
          <Save size={16} aria-hidden="true" />
          <span>保存</span>
        </Button>
      </div>
    </div>
  )

  return (
    <div ref={panelRef} className={classes.root}>
      <ConfigDiffOverlay
        device={device}
        original={savedConfig}
        current={config}
        isOpen={diffState.isOpen}
        onOpenChange={diffState.setOpen}
      />
      <div className={classes.header}>
        <div className={classes.headerCopy}>
          <h2 className="text-2xl font-bold">配置管理</h2>
          <Description>直接读取并写回 Karin 插件配置文件，未展示字段会原样保留。</Description>
        </div>
      </div>
      <Form className={classes.form} onSubmit={handleFormSubmit}>
        <Tabs className="w-full min-w-0 max-w-full" selectedKey={activeFile} onSelectionChange={handleTabChange}>
          <Tabs.ListContainer className={classes.tabsListContainer} data-config-tabs-scroll="true" data-scrollbar="none">
            <Tabs.List aria-label="配置文件选择" className={classes.tabsList}>
              {configFiles.map((item, index) => (
                <Tabs.Tab key={item.key} id={item.key}>
                  {index > 0 ? <Tabs.Separator /> : null}
                  <span className="whitespace-nowrap">{item.label}</span>
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>

        <div className="relative min-w-0 max-w-full">
          {actionControls}
          <ActiveConfigPage
            key={activeFile}
            activeFile={activeFile}
            classes={classes}
            config={config}
            device={device}
            renderers={renderers}
            updateConfigValue={updateConfigValue}
          />
        </div>
      </Form>
    </div>
  )
}

export default ConfigPanel
