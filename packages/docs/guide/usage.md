---
title: 使用
icon: play
order: 4
---

## 基本使用

### 自动解析

在聊天中发送包含平台链接的消息，插件会自动识别并解析：

**支持的链接格式：**
- 抖音：`v.douyin.com/*`、`www.douyin.com/*`
- B站：`b23.tv/*`、`www.bilibili.com/*`、`bilibili.com/*`
- 快手：`v.kuaishou.com/*`、`www.kuaishou.com/*`
- 小红书：`xhslink.com/*`、`www.xiaohongshu.com/*`

**解析流程：**
1. 检测到链接后，根据配置决定是否发送提示信息
2. 调用对应平台的解析接口获取数据
3. 根据 `sendContent` 配置决定发送内容类型
4. 使用 渲染器渲染 html 模板成图片或直接发送视频文件

### 手动解析

当解析总开关关闭时，可使用命令手动解析：

| 命令 | 功能 | 使用方式 |
|-----|------|---------|
| `#解析` | 解析引用的消息 | 回复包含链接的消息并发送命令 |
| `#kkk解析` | 同上 | 回复包含链接的消息并发送命令 |

## 命令列表

### 解析相关

| 命令 | 功能 | 权限 |
|-----|------|------|
| `#解析` / `#kkk解析` | 手动解析引用消息中的链接 | 所有用户 |
| 发送平台链接 | 自动触发解析（需开启总开关） | 所有用户 |

### 推送管理

| 命令 | 功能 | 权限 | 示例 |
|-----|------|------|------|
| `#抖音推送列表` | 查看当前群的抖音订阅 | 所有用户 | `#抖音推送列表` |
| `#B站推送列表` | 查看当前群的B站订阅 | 所有用户 | `#B站推送列表` |
| `#设置抖音推送 + 抖音号` | 订阅/取消抖音创作者 | 配置的权限 | `#设置抖音推送yuanshen_mihoyo` |
| `#设置B站推送 + UID` | 订阅/取消B站UP主 | 配置的权限 | `#设置B站推送401742377` |
| `#抖音强制推送` | 当前群立即推送一次 | 管理员 | `#抖音强制推送` |
| `#B站强制推送` | 当前群立即推送一次 | 管理员 | `#B站强制推送` |
| `#抖音全部强制推送` | 所有订阅群立即推送 | Master | `#抖音全部强制推送` |
| `#B站全部强制推送` | 所有订阅群立即推送 | Master | `#B站全部强制推送` |

### 登录相关

| 命令 | 功能 | 权限 | 平台 |
|-----|------|------|------|
| `#抖音登录` | APP扫码登录获取Cookies | 配置的权限 | 抖音 |
| `#B站登录` | APP扫码登录获取Cookies | 配置的权限 | B站 |

### 系统管理

| 命令 | 功能 | 权限 | 示例 |
|-----|------|------|------|
| `#kkk设置推送机器人 + Bot ID` | 更换推送使用的机器人账号 | 管理员 | `#kkk设置推送机器人12345678` |
| `#kkk帮助` | 查看插件帮助信息 | 所有用户 | `#kkk帮助` |
| `#kkk版本` | 查看插件版本信息 | 所有用户 | `#kkk版本` |
| `#kkk更新日志` | 查看更新日志 | 所有用户 | `#kkk更新日志` |

## 平台功能详解

### 抖音

**支持的内容类型：**
- 单视频作品
- 图集作品（多图）
- 合辑视频
- 直播间信息
- 作品评论

**配置项：**
```yaml
douyin:
  switch: true  # 解析开关
  tip: false    # 解析提示
  sendContent:  # 发送内容
    - info      # 作品信息
    - video     # 视频文件
    - comment   # 评论图片
  numcomment: 5              # 评论数量
  realCommentCount: false    # 显示真实评论数
  videoQuality: "adapt"      # 画质：adapt/540p/720p/1080p/2k/4k
  maxAutoVideoSize: 100      # 最大视频体积（MB）
  videoInfoMode: "image"     # 信息模式：text/image
  displayContent:            # 显示内容
    - cover
    - title
    - author
    - stats
```

**推送功能：**
- 支持定时推送创作者动态
- 可配置推送权限、时间间隔
- 支持动态内容自动解析
- 可过滤分享类型（视频/图集/直播/评论）

### B站

**支持的内容类型：**
- 普通视频（含分P）
- 图文动态
- 视频动态
- 转发动态
- 番剧信息
- 直播间信息
- 视频评论

**配置项：**
```yaml
bilibili:
  switch: true
  tip: false
  sendContent:
    - info
    - video
    - comment
  numcomment: 5
  realCommentCount: false
  videopriority: 0           # 画质优先级：0自动
  videoQuality: 64           # 画质代码：0-127
  maxAutoVideoSize: 100
  imageLayout: "auto"        # 图片布局：vertical/waterfall/grid/auto
  videoInfoMode: "image"
  displayContent:
    - cover
    - title
    - author
    - stats
    - desc
```

**画质说明：**
| 代码 | 画质 | 说明 |
|-----|------|------|
| 0 | 自动 | 根据体积自动选择 |
| 6 | 240P | 极速（仅MP4） |
| 16 | 360P | 流畅 |
| 32 | 480P | 清晰 |
| 64 | 720P | 高清（默认） |
| 74 | 720P60 | 高帧率（需登录） |
| 80 | 1080P | 高清（需登录） |
| 112 | 1080P+ | 高码率（需大会员） |
| 116 | 1080P60 | 高帧率（需大会员） |
| 120 | 4K | 超清（需大会员） |
| 127 | 8K | 超高清（需大会员） |

**推送功能：**
- 支持定时推送UP主动态
- 可配置推送权限、时间间隔
- 支持动态内容自动解析
- 独立的推送画质配置

### 快手

**支持的内容类型：**
- 视频作品
- 作品评论

**配置项：**
```yaml
kuaishou:
  switch: true
  tip: false
  comment: true      # 评论解析开关
  numcomment: 5      # 评论数量（1-30）
```

**限制：**
- 暂不支持推送功能
- 需手动配置Cookies

### 小红书

**支持的内容类型：**
- 图文笔记（多图）
- 视频笔记
- 笔记评论
- 表情解析

**配置项：**
```yaml
xiaohongshu:
  switch: true
  tip: false
  sendContent:
    - info
    - image
    - video
    - comment
  numcomment: 5
  videoQuality: "adapt"      # 画质：adapt/540p/720p/1080p/2k/4k
  maxAutoVideoSize: 100      # 最大视频体积（MB）
```

**特色功能：**
- 支持小红书表情显示
- 视频画质自适应
- 体积控制

## Web 管理界面

### 访问地址

| 页面 | 路径 | 功能 |
|-----|------|------|
| 解析页面 | `http://127.0.0.1:<端口>/kkk/` | 在线解析平台链接 |
| 推送历史 | `http://127.0.0.1:<端口>/kkk/database` | 查看推送记录和数据库 |

**端口说明：**
- 如果 `APIServerMount: true`，使用 Karin 的 HTTP 端口
- 如果 `APIServerMount: false`，使用 `APIServerPort` 配置的端口

### 鉴权配置

```yaml
app:
  webAuth: true  # 启用Web页面鉴权
```

启用后访问Web页面需要验证身份。

## 权限系统

### 权限等级

| 等级 | 说明 | 适用场景 |
|-----|------|---------|
| `all` | 所有用户 | 公开功能 |
| `admin` | 管理员 | 群管理员及以上 |
| `master` | 主人 | 机器人主人 |
| `group.owner` | 群主 | 仅群主 |
| `group.admin` | 群管理 | 群管理员 |

### 权限配置位置

```yaml
# 扫码登录权限
douyin:
  loginPerm: "admin"
bilibili:
  loginPerm: "admin"

# 推送设置权限
douyin:
  push:
    permission: "admin"
bilibili:
  push:
    permission: "admin"
```

## 画质与体积控制

### 自动画质模式

**工作原理：**
1. 从最高画质开始尝试
2. 下载并检查文件大小
3. 如果超过 `maxAutoVideoSize`，降级到下一档
4. 重复直到找到合适画质

**配置示例：**
```yaml
videoQuality: "adapt"  # 或 0（B站）
maxAutoVideoSize: 100  # 100MB
```

### 固定画质模式

**工作原理：**
- 直接下载指定画质
- 不进行体积检查
- 可能超出体积限制

**配置示例：**
```yaml
# 抖音/小红书
videoQuality: "1080p"

# B站
videoQuality: 80  # 1080P
```

### 体积限制策略

| 场景 | 行为 |
|-----|------|
| 视频小于限制 | 正常发送 |
| 视频超出限制（自动模式） | 降级画质重试 |
| 视频超出限制（固定模式） | 不发送视频，仅发送信息 |

## 渲染与显示

### 信息展示模式

**文本模式（`videoInfoMode: "text"`）：**
- 纯文本消息
- 包含标题、作者、统计数据等
- 适合快速浏览

**图片模式（`videoInfoMode: "image"`）：**
- 精美的图片卡片
- 统一的视觉风格
- 信息密度高，可读性强

### 自定义显示内容

**抖音：**
```yaml
displayContent:
  - cover   # 封面
  - title   # 标题
  - author  # 作者
  - stats   # 统计数据
```

**B站：**
```yaml
displayContent:
  - cover   # 封面
  - title   # 标题
  - author  # 作者
  - stats   # 统计数据
  - desc    # 简介
```

### 渲染配置

```yaml
app:
  renderScale: 100           # 渲染精度（50-200）
  Theme: "auto"              # 主题：auto/light/dark
  RemoveWatermark: false     # 移除插件水印
  RenderWaitTime: 1000       # 渲染等待时间（ms）
  multiPageRender: false     # 启用分页渲染
  multiPageHeight: 10000     # 分页高度阈值（px）
```

### 表情反馈

```yaml
app:
  EmojiReply: true           # 启用表情反馈
  EmojiReplyID: "123"        # 自定义表情ID
```

解析成功后自动添加表情反应，提升交互体验。

## 高级功能

### 群文件上传

```yaml
upload:
  usegroupfile: true         # 启用群文件上传
  groupfilevalue: 100        # 上传阈值（MB）
```

当视频文件超过阈值时，自动上传到群文件而非直接发送。

### 代理配置

```yaml
request:
  proxy:
    switch: true
    host: "127.0.0.1"
    port: "7890"
    protocol: "http"         # http/https
    auth:
      username: ""
      password: ""
```

适用于网络受限环境。

### 缓存管理

```yaml
app:
  removeCache: true          # 自动清理下载缓存
```

视频文件下载后自动删除，节省磁盘空间。