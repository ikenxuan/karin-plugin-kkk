# karin-plugin-kkk 项目介绍

## 🎯 项目概述

**karin-plugin-kkk** 是一个专为 Karin 框架开发的多媒体内容解析和推送插件，主要功能是解析抖音、B站等平台的视频内容，并提供动态推送服务。该项目采用 monorepo 架构，使用 pnpm workspace 管理多个子包。

## 📦 项目架构

### 核心包结构
- **`packages/core`** - 主要业务逻辑包，发布到 npm 作为 `karin-plugin-kkk`
- **`packages/template`** - React 模板渲染服务包，为 core 提供图片渲染能力
- **`packages/web`** - Web 管理界面，支持桌面端和移动端，为 core 提供可视化配置
- **`packages/docs`** - 项目文档站点，使用 VuePress 构建

### 依赖关系
```
core (主包，发布到npm)
├── template (图片渲染服务)
├── web (管理界面)  
└── docs (文档支持)
```

## 🚀 主要功能

1. **视频解析** - 支持抖音、B站、快手等平台的视频链接解析
2. **动态推送** - 自动推送关注用户的最新动态
3. **图片渲染** - 通过 React 模板生成精美的展示图片
4. **Web 管理** - 提供可视化的配置和管理界面
5. **跨平台支持** - 支持桌面端和移动端应用

## 🛠️ 技术栈

- **后端**: Node.js + TypeScript + Express
- **前端**: React + Vite + Tailwind CSS + Radix UI
- **模板引擎**: React + html2canvas (图片生成)
- **桌面应用**: Tauri
- **文档**: VuePress
- **包管理**: pnpm workspace

## 📋 开发特点

- **Monorepo 架构** - 统一管理多个相关包
- **TypeScript 全栈** - 类型安全的开发体验  
- **模块化设计** - 各子包职责明确，松耦合
- **现代化工具链** - Vite、ESLint、Husky 等
- **自动化部署** - GitHub Actions CI/CD

## 🎯 使用场景

该项目主要用于 QQ 机器人开发，通过 Karin 框架集成，为用户提供：
- 视频链接自动解析和下载
- 社交平台动态监控和推送
- 美观的图片展示效果
- 便捷的 Web 配置界面

这个项目是一个完整的 Karin 插件生态系统，core 包作为核心发布到 npm 供用户安装，其他子包则为其提供模板渲染、Web 管理和文档支持等辅助功能。
        