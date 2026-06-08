# 推送列表管理界面实现总结

## 🎯 实现目标

将原本的 JSON 编辑方式改为可视化的表单管理界面，使用 Accordion + Tabs 组件。

## 📦 新增组件

### PushlistManager.tsx
**位置：** `packages/web/src/components/pushlist/PushlistManager.tsx`

**功能：**
- 顶层 Tabs 切换抖音/B站推送列表
- Accordion 手风琴组件，每个推送项一个折叠面板
- 完整的表单字段，覆盖所有配置项
- 新增/删除推送项功能

**架构：**
```
PushlistManager
  ├─ Tabs (顶层切换)
  │   ├─ Tab: 抖音推送
  │   └─ Tab: B站推送
  │
  ├─ 添加按钮
  │
  └─ Accordion (手风琴列表)
      ├─ AccordionItem 1
      │   ├─ Trigger (标题 + 开关)
      │   └─ Panel (表单字段)
      ├─ AccordionItem 2
      └─ ...
```

## 📋 字段映射

### 抖音推送项 (DouyinPushItem)

| 字段 | 类型 | 组件 | 说明 |
|------|------|------|------|
| `switch` | boolean | Switch | 是否启用此推送项 |
| `sec_uid` | string | TextField | 用户的 sec_uid |
| `short_id` | string | TextField | 抖音号（与 sec_uid 二选一） |
| `group_id` | string[] | TextField (multiline) | 推送群号列表 |
| `remark` | string | TextField | 备注名称 |
| `pushTypes` | DouyinPushType[] | CheckboxGroup | 推送类型（作品/喜欢/推荐/直播） |
| `filterMode` | 'blacklist' \| 'whitelist' | Select | 过滤模式 |
| `Keywords` | string[] | TextField (comma-separated) | 关键词列表 |
| `Tags` | string[] | TextField (comma-separated) | 标签列表 |

### B站推送项 (BilibiliPushItem)

| 字段 | 类型 | 组件 | 说明 |
|------|------|------|------|
| `switch` | boolean | Switch | 是否启用此推送项 |
| `host_mid` | number | TextField (number) | B站 UID |
| `group_id` | string[] | TextField (multiline) | 推送群号列表 |
| `remark` | string | TextField | 备注名称 |
| `pushTypes` | BilibiliPushType[] | CheckboxGroup | 推送类型（视频/图文/纯文/直播/转发/专栏） |
| `filterMode` | 'blacklist' \| 'whitelist' | Select | 过滤模式 |
| `Keywords` | string[] | TextField (comma-separated) | 关键词列表 |
| `Tags` | string[] | TextField (comma-separated) | 标签列表 |

## 🎨 UI 特性

### Accordion 标题区域
- **开关：** 直接在标题区显示 Switch，点击开关不会展开面板
- **名称显示：** 优先显示 `remark`，其次显示 `short_id` / `host_mid`
- **描述：** 显示账号标识（抖音号/UID）
- **展开指示器：** ChevronDown 图标

### 表单字段
- **TextField：** 单行文本输入
- **TextField (multiline)：** 多行输入（群号列表）
- **TextField (comma-separated)：** 逗号分隔的列表（关键词/标签）
- **CheckboxGroup：** 多选框（推送类型）
- **Select：** 下拉选择（过滤模式）

### 操作按钮
- **添加按钮：** 顶部，带 Plus 图标
- **删除按钮：** 每个面板底部，带 Trash2 图标，danger 样式

### 空状态
```tsx
<div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
  <p className="text-muted">暂无推送项，点击上方按钮添加</p>
</div>
```

## 🔧 技术实现

### 状态管理
```typescript
// 父组件 (ConfigPanel) 传递数据和更新函数
<PushlistManager
  douyinList={config.pushlist?.douyin || []}
  bilibiliList={config.pushlist?.bilibili || []}
  onDouyinChange={(list) => {
    updateConfigValue(['pushlist', 'douyin'], list)
  }}
  onBilibiliChange={(list) => {
    updateConfigValue(['pushlist', 'bilibili'], list)
  }}
/>
```

### 更新逻辑
```typescript
// 更新单个推送项
const updateItem = (updates: Partial<DouyinPushItem>) => {
  const newList = [...douyinList]
  newList[index] = { ...item, ...updates }
  onDouyinChange(newList)
}

// 删除推送项
const deleteItem = () => {
  onDouyinChange(douyinList.filter((_, i) => i !== index))
}

// 添加推送项
const addDouyinItem = () => {
  onDouyinChange([
    ...douyinList,
    {
      switch: true,
      sec_uid: '',
      short_id: '',
      group_id: [],
      remark: '',
      pushTypes: ['post'],
      filterMode: 'blacklist',
      Keywords: [],
      Tags: []
    }
  ])
}
```

### 数组字段处理
```typescript
// 群号列表：换行分隔
value={item.group_id.join('\n')}
onChange={(value) => updateItem({ 
  group_id: value.split('\n').filter(Boolean) 
})}

// 关键词/标签：逗号分隔
value={(item.Keywords || []).join(', ')}
onChange={(value) => updateItem({ 
  Keywords: value.split(',').map((k) => k.trim()).filter(Boolean) 
})}
```

### Switch 事件阻止冒泡
```typescript
<Switch
  isSelected={item.switch}
  onChange={(isSelected) => updateItem({ switch: isSelected })}
  onClick={(e) => e.stopPropagation()} // 阻止展开面板
>
```

## 📝 组件集成

### ConfigPanel.tsx 修改

**添加导入：**
```typescript
import { Accordion } from '@heroui/react'
import PushlistManager from '../pushlist/PushlistManager'
```

**替换渲染：**
```typescript
// Before: JSON 编辑
{renderSubSection('抖音推送列表', (
  <>{renderJsonField(['pushlist', 'douyin'], ...)}</>
))}

// After: 可视化表单
{activeFile === 'pushlist' ? (
  <>
    {renderPageHeader('推送列表', '管理抖音与 B站的推送订阅。')}
    <PushlistManager
      douyinList={config.pushlist?.douyin || []}
      bilibiliList={config.pushlist?.bilibili || []}
      onDouyinChange={(list) => updateConfigValue(['pushlist', 'douyin'], list)}
      onBilibiliChange={(list) => updateConfigValue(['pushlist', 'bilibili'], list)}
    />
  </>
) : null}
```

## 🎯 用户体验提升

### Before (JSON 编辑)
```json
[
  {
    "switch": true,
    "sec_uid": "MS4wLjABAAAA...",
    "short_id": "",
    "group_id": ["123456:111111"],
    "remark": "某博主",
    "pushTypes": ["post"],
    ...
  }
]
```
- ❌ 需要手动编辑 JSON
- ❌ 容易出现语法错误
- ❌ 不直观，字段含义不清
- ❌ 无字段验证

### After (可视化表单)
- ✅ 点击切换平台（抖音/B站）
- ✅ 点击展开/折叠推送项
- ✅ 每个字段有标签和说明
- ✅ 开关一键启用/禁用
- ✅ 删除按钮明确
- ✅ 添加按钮醒目
- ✅ 输入验证（类型限制）

## 🔄 数据流

```
用户操作
   ↓
PushlistManager 内部状态更新
   ↓
onDouyinChange / onBilibiliChange 回调
   ↓
ConfigPanel.updateConfigValue(['pushlist', 'douyin'], list)
   ↓
config 状态更新
   ↓
传递给 PushlistManager
   ↓
渲染更新
```

## ✅ 测试清单

- [ ] 切换抖音/B站标签正常
- [ ] 添加推送项成功
- [ ] 删除推送项成功
- [ ] 开关切换正常（不展开面板）
- [ ] 展开/折叠面板正常
- [ ] 所有字段输入正常
- [ ] 群号列表换行分隔正常
- [ ] 关键词/标签逗号分隔正常
- [ ] CheckboxGroup 多选正常
- [ ] Select 下拉选择正常
- [ ] 空状态显示正常
- [ ] 保存配置后数据正确
- [ ] 刷新页面数据保留

## 📂 相关文件

- `packages/web/src/components/pushlist/PushlistManager.tsx` — 新增组件
- `packages/web/src/components/common/ConfigPanel.tsx` — 集成组件
- `packages/core/src/types/config/pushlist.ts` — 类型定义（参考）

## 🎨 可选优化

1. **拖拽排序：** 使用 `@dnd-kit/core` 实现推送项排序
2. **批量操作：** 批量启用/禁用/删除
3. **导入导出：** 支持 JSON 导入导出备份
4. **搜索过滤：** 搜索备注名称/账号
5. **表单验证：** 必填字段高亮提示
6. **预览模式：** 预览推送配置效果
7. **撤销/重做：** 支持操作历史
