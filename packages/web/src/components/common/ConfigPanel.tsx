/**
 * 通用配置管理面板。
 * 配置项直接在前端硬编码，不依赖 Karin schema 数据。
 */

import { useEffect, useMemo, useRef, type FormEvent, type Key } from 'react'
import { Button, Description, Form, Spinner, Tabs, Tooltip, toast } from '@heroui/react'
import { useMemoizedFn, useRequest, useSetState, useUpdateEffect } from 'ahooks'
import gsap from 'gsap'
import { RotateCcw, Save } from 'lucide-react'
import { getConfig, saveConfig } from '../../api/config'
import type { ConfigType } from '../../types/config'
import { fadeInFrom, fadeInTo, getAnimationDuration, getStaggerDelay } from '../../utils/animations'
import ActiveConfigPage from './config-panel/pages/ActiveConfigPage'
import { configFiles } from './config-panel/options'
import { getLayoutClasses } from './config-panel/layout'
import { createConfigFieldRenderers } from './config-panel/fieldRenderers'
import { setValue } from './config-panel/utils'
import { validateConfig } from './config-panel/validation'
import type { ConfigFileKey, ConfigPath, DeviceLayout } from './config-panel/types'

type ConfigPanelVariant = 'standalone' | 'karin'

interface ConfigPanelProps {
  device?: DeviceLayout
  variant?: ConfigPanelVariant
}

const ConfigPanel = ({ device = 'desktop', variant = 'standalone' }: ConfigPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const [state, setPanelState] = useSetState({
    config: null as ConfigType | null,
    savedSnapshot: '',
    activeFile: 'cookies' as ConfigFileKey
  })
  const { activeFile, config, savedSnapshot } = state
  const classes = useMemo(() => getLayoutClasses(device), [device])
  const controlSize = device === 'mobile' ? 'sm' : 'md'

  const { loading, run: fetchConfig } = useRequest(getConfig, {
    onSuccess: (data) => {
      setPanelState({
        config: data,
        savedSnapshot: JSON.stringify(data)
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
    return config ? JSON.stringify(config) !== savedSnapshot : false
  }, [config, savedSnapshot])

  const validationErrors = useMemo(() => {
    return validateConfig(config)
  }, [config])

  const hasValidationError = useMemo(() => {
    return Object.values(validationErrors).some(Boolean)
  }, [validationErrors])

  const updateConfigValue = useMemoizedFn((path: ConfigPath, value: unknown) => {
    setPanelState((current) => {
      if (!current.config) return null
      return { config: setValue(current.config, path, value) }
    })
  })

  const handleSave = useMemoizedFn(() => {
    if (!config || hasValidationError) return

    const nextConfig = config
    const nextSnapshot = JSON.stringify(nextConfig)
    const savePromise = submitConfig(nextConfig).then(() => {
      setPanelState({ savedSnapshot: nextSnapshot })
    })

    toast.promise(savePromise, {
      loading: '正在保存配置...',
      success: '配置已保存',
      error: (error) => error instanceof Error ? error.message : '保存配置失败'
    })
  })

  const handleReset = useMemoizedFn(() => {
    fetchConfig()
  })

  const handleTabChange = useMemoizedFn((key: Key) => {
    setPanelState({ activeFile: key as ConfigFileKey })
  })

  const handleFormSubmit = useMemoizedFn((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSave()
  })

  useEffect(() => {
    const container = panelRef.current?.querySelector<HTMLElement>('[data-config-tabs-scroll="true"]')
    if (!container) return

    const handleTabsWheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY

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

    gsap.fromTo(
      panelRef.current.querySelectorAll('[data-config-section]'),
      fadeInFrom,
      {
        ...fadeInTo,
        duration: getAnimationDuration(0.35),
        stagger: getStaggerDelay(0.03)
      }
    )
  })

  useEffect(() => {
    if (!config || panelRef.current?.dataset.animated === 'true') return
    if (panelRef.current) panelRef.current.dataset.animated = 'true'
    animateCurrentPanel()
  }, [config, animateCurrentPanel])

  useUpdateEffect(() => {
    animateCurrentPanel()
  }, [activeFile])

  if (loading || !config) {
    return (
      <div className={`${classes.root} ${classes.loading}`}>
        <Spinner size="sm" aria-label="正在读取配置" />
        <span>正在读取配置</span>
      </div>
    )
  }

  const renderers = createConfigFieldRenderers({
    config,
    device,
    classes,
    validationErrors,
    updateConfigValue
  })

  return (
    <div ref={panelRef} className={classes.root}>
      {variant === 'standalone' ? (
        <div className={classes.header}>
          <div className={classes.headerCopy}>
            <h2 className="text-2xl font-bold">配置管理</h2>
            <Description>直接读取并写回 Karin 插件配置文件，未展示字段会原样保留。</Description>
          </div>
        </div>
      ) : null}
      <div className={classes.floatingActions}>
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
        <Button size={controlSize} isDisabled={!hasChanges || hasValidationError || loading} isPending={saving} onPress={handleSave} variant="tertiary">
          <Save size={16} aria-hidden="true" />
          <span>保存</span>
        </Button>
      </div>

      <Form className={classes.form} onSubmit={handleFormSubmit}>
        <Tabs className="w-full min-w-0 max-w-full" selectedKey={activeFile} onSelectionChange={handleTabChange}>
          <Tabs.ListContainer
            className={classes.tabsListContainer}
            data-config-tabs-scroll="true"
            data-scrollbar="none"
          >
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

        <ActiveConfigPage
          activeFile={activeFile}
          classes={classes}
          config={config}
          device={device}
          renderers={renderers}
          updateConfigValue={updateConfigValue}
        />
      </Form>
    </div>
  )
}

export default ConfigPanel
