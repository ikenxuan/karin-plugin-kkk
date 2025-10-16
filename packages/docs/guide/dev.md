---
title: 开发
icon: code
order: 6
---

## 快速起步

```bash
pnpm i
```

- 监听 `core` 子包变化并自动重启：

```bash
pnpm watch
```

- 调试图片模板：

```bash
pnpm template
```

- 调试自带 Web：

```bash
pnpm web
```

- 打包：

```bash
pnpm build
```

## 要求

- Node.js `>= 21`，pnpm `>= 9`
- monorepo：`core`（发布到 npm）、`template`（模板渲染）、`web`（管理界面）、`docs`（文档）

## 文档开发

- 本地预览：

```bash
pnpm docs:dev
```

- 清理缓存启动（遇到主题缓存异常时）：

```bash
pnpm docs:clean-dev
```

- 构建（CI 会自动部署到 `gh-pages` 分支）：

```bash
pnpm docs:build
```