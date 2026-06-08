# 配置项禁用提示系统

## 概述

实现了集中式配置项禁用提示系统，当配置项被禁用时，鼠标悬停会显示具体原因。

## 架构

### 1. 规则配置文件 (`src/config/disabledRules.ts`)

集中管理所有配置项的禁用规则和提示文案。

**核心类型：**
```typescript
export interface DisabledRule {
  path: ConfigPath  // 配置路径，如 ['douyin', 'numcomment']
  rules: Array<{
    condition: (config: ConfigType | null) => boolean  // 禁用条件
    message: string  // 提示文案
  }>
}
```

**查询函数：**
```typescript
export const getDisabledTooltip = (
  config: ConfigType | null, 
  path: ConfigPath
): string
```

### 2. ConfigPanel 集成 (`src/components/common/ConfigPanel.tsx`)

**包装函数：**
```typescript
const wrapWithDisabledTooltip = (
  element: ReactNode, 
  path: ConfigPath, 
  disabled: boolean
) => ReactNode
```

当字段 `disabled={true}` 时，自动从规则表查询提示并用 Tooltip 包裹。

**已改造的渲染函数：**
- `renderSwitch` — 开关字段
- `renderTextField` — 文本/数字字段
- `renderSelectField` — 下拉选择字段
- `renderCheckboxGroup` — 多选字段组

## 已覆盖的配置项

### 应用配置
- 自定义优先级（需关闭「默认解析优先级」）
- 分页渲染高度（需打开「分页渲染」）
- Live Photo 系统选择（需非「仅视频」模式）
- API 服务端口（需关闭「挂载到 Karin」）
- 外部访问地址（需选择「外部地址」）

### 上传下载配置
- 群文件上传（互斥：Base64 发送模式）
- 群文件上传阈值（需打开群文件上传）
- 视频拦截阈值（需打开拦截）
- 压缩触发/压缩后的值（需打开压缩）
- 下载限速相关（需打开限速）
- 断流降速配置（需打开限速 + 自动降速）

### 请求配置
- 所有代理相关字段（需打开「代理开关」）

### 抖音配置
- 全局：所有配置需先打开「解析开关」
- 评论相关：需勾选「评论图」
- 视频体积上限：需选择「自动选择」画质
- 显示内容配置：需选择「文本模式」
- 弹幕相关：需打开「弹幕烧录」
- 推送相关：需打开「推送开关」
- 推送视频体积上限：需「自动选择」画质

### B站配置
- 结构同抖音，包含评论、画质、弹幕、推送等层级依赖

### 快手配置
- 评论解析数量：需打开「解析开关」+「评论解析」

### 小红书配置
- 评论数量：需打开「解析开关」+ 勾选「评论图」
- 视频体积上限：需选择「自动选择」画质

## 规则优先级

多条规则按**数组顺序**检查，返回第一个匹配的提示。

**示例（B站推送视频体积上限）：**
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
      message: '修改此配置项需要先将「解析视频动态时的画质偏好」改为「自动选择」'
    }
  ]
}
```

当字段被禁用时，按顺序检查：
1. 推送开关未打开 → 提示打开推送开关
2. 推送开关已打开但作品解析未打开 → 提示打开作品解析
3. 作品解析已打开但画质非自动 → 提示改为自动选择

## 如何添加新规则

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

**无需修改 ConfigPanel 组件** — 规则会自动生效。

## 用户体验

- 鼠标悬停在禁用的配置项上 → 显示白色 Tooltip，说明具体原因
- 提示文案清晰指出需要操作的前置条件
- 多条件依赖时，按优先级显示最上游的阻塞原因
- Tooltip 自动适配桌面端（顶部）和移动端（底部）
