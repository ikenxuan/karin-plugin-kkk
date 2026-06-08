# Tabs 切换问题调试

## 修改内容

### 从受控模式改为非受控模式

**修改前：**
```tsx
<Tabs selectedKey={activeTab} onSelectionChange={...}>
```

**修改后：**
```tsx
<Tabs defaultSelectedKey="douyin" onSelectionChange={...}>
```

### 原因分析

HeroUI v3 的 Tabs 可能在受控模式下有问题，或者需要特殊的 key 处理。非受控模式更简单可靠。

---

## 如果还是不工作

### 1. 检查浏览器控制台
打开开发者工具 (F12) → Console 标签页，查看是否有错误

### 2. 检查 Tabs 点击响应
点击"B站推送"标签时，观察：
- 是否有任何视觉反馈（高亮、下划线）
- 控制台是否输出任何信息

### 3. 测试简化版本

如果还是不工作，可以尝试最简化的 Tabs：

```tsx
<Tabs>
  <Tabs.ListContainer>
    <Tabs.List>
      <Tabs.Tab id="douyin">抖音<Tabs.Indicator /></Tabs.Tab>
      <Tabs.Tab id="bilibili">B站<Tabs.Indicator /></Tabs.Tab>
    </Tabs.List>
  </Tabs.ListContainer>
  <Tabs.Panel id="douyin">抖音内容</Tabs.Panel>
  <Tabs.Panel id="bilibili">B站内容</Tabs.Panel>
</Tabs>
```

### 4. 检查 HeroUI 版本

```bash
npm list @heroui/react
```

确认是 v3.x 版本

---

## 替代方案：手动实现标签切换

如果 Tabs 组件实在有问题，可以手动实现：

```tsx
const [activeTab, setActiveTab] = useState<'douyin' | 'bilibili'>('douyin')

return (
  <div>
    {/* 手动标签按钮 */}
    <div className="flex gap-2 border-b">
      <button
        className={`px-4 py-2 ${activeTab === 'douyin' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => setActiveTab('douyin')}
      >
        抖音推送
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'bilibili' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => setActiveTab('bilibili')}
      >
        B站推送
      </button>
    </div>

    {/* 条件渲染内容 */}
    {activeTab === 'douyin' && (
      <div className="pt-4">
        {/* 抖音推送内容 */}
      </div>
    )}
    {activeTab === 'bilibili' && (
      <div className="pt-4">
        {/* B站推送内容 */}
      </div>
    )}
  </div>
)
```

这样可以完全绕过 Tabs 组件的问题。
