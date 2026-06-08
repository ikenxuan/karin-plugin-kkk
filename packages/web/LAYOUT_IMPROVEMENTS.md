# 配置面板布局改进总结

## 🎯 完成的三大改进

### 1. 配置项禁用提示系统 ✅

**实现文件：**
- `src/config/disabledRules.ts` - 集中式规则配置
- `src/components/common/ConfigPanel.tsx` - 集成查询和显示逻辑

**核心功能：**
- 160+ 条禁用规则，覆盖所有平台配置
- 自动检测字段禁用原因并显示精确提示
- 多条件依赖时按优先级显示最上游的阻塞原因

**用户体验：**
- **桌面端：** 鼠标悬停 → Tooltip 显示提示
- **移动端：** 点击 → Popover 显示提示（新增）

**示例规则：**
```typescript
{
  path: ['bilibili', 'push', 'pushMaxAutoVideoSize'],
  rules: [
    { 
      condition: (cfg) => !getValue(cfg, ['bilibili', 'push', 'switch'], false),
      message: '修改此配置项需要先将「推送开关」打开'
    },
    { 
      condition: (cfg) => !getValue(cfg, ['bilibili', 'push', 'parsedynamic'], false),
      message: '修改此配置项需要先将「作品解析」打开'
    },
    { 
      condition: (cfg) => Number(getValue(cfg, ['bilibili', 'push', 'pushVideoQuality'], 0)) !== 0,
      message: '修改此配置项需要先将「画质偏好」改为「自动选择」'
    }
  ]
}
```

---

### 2. Select 组件优化 ✅

**改动：**
- 移除 `Select.Value` 中的自定义渲染逻辑
- 外部只显示简洁的 label
- 描述文字只在下拉列表内显示

**Before:**
```tsx
<Select.Value>
  {({ defaultChildren, isPlaceholder }) => {
    if (isPlaceholder || !selectedOption?.description) return defaultChildren
    return (
      <div className="flex min-w-0 flex-col gap-1">
        <span>{selectedOption.label}</span>
        <Description>{selectedOption.description}</Description>  {/* ❌ 外部显示描述 */}
      </div>
    )
  }}
</Select.Value>
```

**After:**
```tsx
<Select.Value />  {/* ✅ 只显示 label */}
```

---

### 3. 卡片布局全面重构 ✅

**新架构：**
```
页面标题（无卡片）
  ├─ 顶层字段（有内边距，无卡片）
  ├─ 📦 子卡片分组 A
  ├─ 📦 子卡片分组 B
  └─ 📦 子卡片分组 C
```

**已重构的 8 个配置页面：**

| 页面 | 顶层字段 | 子卡片数量 | 状态 |
|------|---------|-----------|------|
| Cookies | 0 | 1 | ✅ |
| 应用 | 0 | 7 | ✅ |
| 上传下载 | 0 | 4 | ✅ |
| 请求 | 2 | 1 | ✅ |
| 抖音 | 2 | 5 | ✅ |
| B站 | 2 | 5 | ✅ |
| 快手 | 1 | 1 | ✅ |
| 小红书 | 3 | 1 | ✅ |
| 推送列表 | 0 | 2 | ✅ |

**新增函数：**
```typescript
// 页面标题，无卡片包裹
const renderPageHeader = (title: string, description: string) => (
  <div className="mb-6" data-config-section>
    <h2 className="text-2xl font-bold">{title}</h2>
    <Description className="mt-1">{description}</Description>
  </div>
)

// 子卡片分组
const renderSubSection = (title: string, children: ReactNode) => (
  <Card data-config-section className="mb-4">
    <Card.Header className={classes.sectionHeader}>
      <Card.Title className="text-lg font-semibold">{title}</Card.Title>
    </Card.Header>
    <Card.Content className={classes.sectionContent}>
      <div className={classes.fields}>{children}</div>
    </Card.Content>
  </Card>
)

// 禁用提示包装器（桌面 Tooltip + 移动 Popover）
const wrapWithDisabledTooltip = (
  element: ReactNode, 
  path: ConfigPath, 
  disabled: boolean
) => ReactNode
```

**已废弃函数：**
```typescript
/**
 * @deprecated 使用 renderPageHeader + renderSubSection 代替
 */
const renderSection = (title: string, description: string, children: ReactNode) => { ... }
```

**顶层字段内边距：**
- 桌面端：`px-2` (8px)
- 移动端：`px-4` (16px)

**样式类新增：**
```typescript
// desktopConfigPanel.ts
topLevelFields: 'mb-4 space-y-4 px-2'

// mobileConfigPanel.ts
topLevelFields: 'mb-4 space-y-4 px-4'
```

---

## 📊 改进效果对比

### Before（旧布局）
```
┌─────────────────────────────────────────┐
│ 📦 大卡片「抖音」                        │
│                                         │
│  解析开关                                │
│  发送内容                                │
│  ━━━━━━━━ 评论详情设置 ━━━━━━━━        │
│  评论解析数量                            │
│  次级评论数量                            │
│  是否收集评论图片                        │
│  ━━━━━━━━ 渲染与画质设置 ━━━━━━━━      │
│  画质偏好                                │
│  视频体积上限                            │
│  ...                                    │
│                                         │
└─────────────────────────────────────────┘
```
- ❌ 所有配置挤在一个大卡片里
- ❌ 顶层字段贴屏幕边缘
- ❌ 分割线视觉层次不清晰
- ❌ 移动端无法查看禁用原因

### After（新布局）
```
抖音 (页面标题)
抖音解析、画质、弹幕和推送基础设置。

  解析开关            ← 有内边距
  发送内容

┌─────────────────────────────────────────┐
│ 📦 评论详情设置                          │
│  评论解析数量                            │
│  次级评论数量                            │
│  是否收集评论图片                        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 📦 渲染与画质设置                        │
│  Live 图 BGM 合并方式                   │
│  画质偏好                                │
│  视频体积上限                            │
│  视频信息返回形式                        │
│  视频信息的内容                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 📦 弹幕烧录相关                          │
│  ...                                    │
└─────────────────────────────────────────┘
```
- ✅ 每个功能模块独立卡片
- ✅ 顶层字段有内边距，不贴边
- ✅ 视觉层次清晰
- ✅ 桌面端悬停 / 移动端点击查看禁用原因

---

## 🛠️ 技术实现细节

### 禁用提示的响应式适配

```typescript
const wrapWithDisabledTooltip = (element, path, disabled) => {
  if (!disabled) return element
  
  const tooltipMessage = getDisabledTooltip(config, path)
  if (!tooltipMessage) return element

  // 移动端：Popover（点击触发）
  if (device === 'mobile') {
    return (
      <Popover>
        <Popover.Trigger className="w-full cursor-not-allowed">
          {element}
        </Popover.Trigger>
        <Popover.Content placement="bottom">
          <Popover.Dialog>
            <Popover.Arrow />
            <div className="max-w-72 text-sm">{tooltipMessage}</div>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    )
  }

  // 桌面端：Tooltip（悬停触发）
  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger className="w-full cursor-not-allowed">
        {element}
      </Tooltip.Trigger>
      <Tooltip.Content showArrow placement="top">
        <Tooltip.Arrow />
        <div className="max-w-72">{tooltipMessage}</div>
      </Tooltip.Content>
    </Tooltip>
  )
}
```

**关键点：**
- 移动端使用 `Popover`（需要点击才能看到提示）
- 桌面端使用 `Tooltip`（鼠标悬停即显示）
- 两者都使用 `cursor-not-allowed` 提示字段被禁用

---

## 📖 如何添加新的禁用规则

在 `src/config/disabledRules.ts` 的 `disabledRules` 数组中添加：

```typescript
{
  path: ['platform', 'fieldName'],
  rules: [
    {
      condition: (cfg) => !getValue<boolean>(cfg, ['platform', 'switch'], false),
      message: '修改此配置项需要先将「平台开关」打开'
    },
    {
      condition: (cfg) => getValue<string>(cfg, ['platform', 'mode'], 'auto') !== 'manual',
      message: '修改此配置项需要先将「模式」改为「手动」'
    }
  ]
}
```

**规则会自动生效，无需修改 ConfigPanel 组件。**

---

## 🎨 视觉改进

1. **页面标题** — 使用 `text-2xl font-bold`，更醒目
2. **卡片标题** — 使用 `text-lg font-semibold`，层次分明
3. **顶层字段** — 增加左右内边距，避免贴边
4. **卡片间距** — `mb-4` 统一间距
5. **禁用提示** — 移动端可点击查看，体验提升

---

## ✅ 测试清单

- [ ] 桌面端：悬停禁用字段显示 Tooltip
- [ ] 移动端：点击禁用字段显示 Popover
- [ ] 所有 8 个配置页面布局正常
- [ ] 顶层字段有内边距，不贴屏幕边缘
- [ ] 卡片标题和页面标题视觉层次清晰
- [ ] Select 组件外部只显示 label，无描述
- [ ] 入场动画正常（卡片从下向上淡入）

---

## 📂 相关文件

**核心文件：**
- `packages/web/src/components/common/ConfigPanel.tsx` — 主组件
- `packages/web/src/config/disabledRules.ts` — 禁用规则配置
- `packages/web/src/styles/desktopConfigPanel.ts` — 桌面端样式
- `packages/web/src/styles/mobileConfigPanel.ts` — 移动端样式

**文档：**
- `packages/web/DISABLED_TOOLTIP_GUIDE.md` — 禁用提示系统指南
- `packages/web/LAYOUT_IMPROVEMENTS.md` — 本文档
