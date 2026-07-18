'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const { parseSections, validateIssue } = require('./issue-quality.cjs')

const bugConfirmation = `- [x] 已阅读文档
- [x] 已搜索
- [x] 已更新
- [x] 已脱敏
- [x] 理解关闭规则`

const featureConfirmation = `- [x] 已阅读并搜索
- [x] 不是个人排障
- [x] 会描述场景
- [x] 理解不承诺实现`

test('parseSections parses Issue Form markdown fields', () => {
  const sections = parseSections('### 问题描述\n\n详细描述\n\n### 预期行为\n\n正常返回')
  assert.equal(sections.get('问题描述'), '详细描述')
  assert.equal(sections.get('预期行为'), '正常返回')
})

test('validateIssue ignores legacy forms when they are edited later', () => {
  const body = `### 提交前检查

- [x] 我已经搜索过现有的 Issues

### 功能描述

旧版模板中的功能描述`

  assert.deepEqual(validateIssue({ title: 'Feature: 旧版功能建议仍需补充', body, labels: ['enhancement'] }).problems, [])
})

test('validateIssue accepts a complete bug report', () => {
  const body = `### 提交前确认

${bugConfirmation}

### 问题类型

动态推送

### 涉及平台

B站

### 问题描述

更新插件后，每一条 B 站视频动态都会向同一个群连续发送两次，图文动态没有这个问题。

### 复现步骤

1. 启用 B 站推送并订阅一个账号\n2. 等待该账号发布视频动态\n3. 查看目标群消息

### 实际结果与完整日志

日志显示同一个动态 ID 在同一分钟内进入了两次发送流程。\n\`\`\`text\n[10:00:01] dynamic 123 sent\n[10:00:02] dynamic 123 sent\n\`\`\`

### 预期行为

同一个动态 ID 对同一个目标群只发送一次。

### 相关配置

push.cron: */10 * * * *\nsendContent: [info, video]

### 运行环境

- 插件版本（#kkk版本）：2.39.0\n- Karin 版本：1.16.2\n- Node.js 版本：24.13.0\n- 操作系统：Ubuntu 24.04\n- 适配器 / 协议端：adapter-onebot + NapCat 4.8\n- 安装方式（插件市场 / npm / Git / Docker）：插件市场

### 复现频率

必现（每次都能复现）`

  assert.deepEqual(validateIssue({ title: 'Bug: B站视频动态会向同一群重复推送', body, labels: [{ name: 'bug' }] }).problems, [])
})

test('validateIssue rejects placeholder content and incomplete environment', () => {
  const body = `### 提交前确认

${bugConfirmation}

### 问题类型

动态推送

### 涉及平台

B站

### 问题描述

test

### 复现步骤

*

### 实际结果与完整日志

如图

### 预期行为

无

### 相关配置

*

### 运行环境

- 插件版本（#kkk版本）：最新版\n- Karin 版本：\n- Node.js 版本：\n- 操作系统：\n- 适配器 / 协议端：\n- 安装方式（插件市场 / npm / Git / Docker）：

### 复现频率

仅出现一次`

  const result = validateIssue({ title: 'Bug:', body, labels: ['bug'] })
  assert.ok(result.problems.length >= 10)
  assert.ok(result.problems.some((problem) => problem.includes('标题过短')))
  assert.ok(result.problems.some((problem) => problem.includes('插件版本')))
})

test('validateIssue accepts a complete feature proposal', () => {
  const body = `### 提交前确认

${featureConfirmation}

### 建议类型

动态推送能力

### 涉及平台

通用或不确定

### 需求背景

管理多个用途不同的群时，每个群需要接收不同内容，但当前解析内容只能使用同一份全局配置。

### 功能建议

允许为指定群覆盖发送内容配置；没有单独配置的群继续继承全局设置，并能随时恢复继承。

### 使用场景

资讯群只发送信息卡片，资源群发送卡片和视频；管理员保存后，两个群分别按自己的配置发送。

### 现有方案与不足

目前只能部署多个插件实例或每次手工切换全局配置，维护成本高且容易误发。

### 预期受益范围

使用该平台或模块的用户会受益

### 兼容性与风险

未配置群必须继续沿用现有全局行为。

### 补充材料

愿意协助测试。`

  assert.deepEqual(validateIssue({ title: 'Feature: 支持按群覆盖解析发送内容', body, labels: ['enhancement'] }).problems, [])
})

test('validateIssue rejects duplicated feature answers', () => {
  const repeated = '希望增加按群配置解析内容的功能，满足不同群分别发送不同内容的实际使用需求。'
  const body = `### 提交前确认

${featureConfirmation}

### 建议类型

动态推送能力

### 涉及平台

通用或不确定

### 需求背景

${repeated}

### 功能建议

${repeated}

### 使用场景

管理员维护多个用途不同的群，需要让资讯群和资源群收到不同消息。

### 现有方案与不足

当前只能部署多个实例，维护成本过高。

### 预期受益范围

使用该平台或模块的用户会受益`

  const result = validateIssue({ title: 'Feature: 支持按群覆盖解析发送内容', body, labels: ['enhancement'] })
  assert.ok(result.problems.some((problem) => problem.includes('内容完全重复')))
})
