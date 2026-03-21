# 🎨 Template 渲染服务

> 为 `karin-plugin-kkk` 生态系统提供基于 React 的高性能模板渲染服务。

本子包（`template`）是一个基于 Web 技术的 UI 渲染引擎，主要用于将各类平台数据转化为精美的可视化卡片和图像，支持 **B站 (Bilibili)**、**抖音 (Douyin)**、**快手 (Kuaishou)** 和 **小红书 (Xiaohongshu)** 等主流平台。

项目基于 **React 19**、**Vite** 和 **HeroUI** 构建，作为整个机器人生态的“视觉中枢”，负责输出所有富文本消息、用户主页和数据统计面板的视觉展示。

## ✨ 特性

- **多平台无缝适配**：内置 B站、抖音、快手、小红书等平台的专属 UI 模板（涵盖动态、评论、视频信息、用户列表等）。
- **现代化 UI 构建**：深度整合 HeroUI 与各类定制化组件，提供极致还原的视觉体验。
- **独立且友好的开发环境**：内置强大的开发工作台（包含实时预览面板和 Mock 数据编辑器），**无需启动主程序**即可直接在浏览器中调试和开发模板。
- **前沿技术栈**：全面采用 React 19 + TypeScript + Vite，结合 GSAP 动画和 Markdown 渲染。

## 🚀 快速开始

### 安装依赖

建议在项目根目录统一安装，或进入本子包目录执行安装：

```bash
cd packages/template
pnpm install
```

### 启动开发环境

启动带有实时预览和 Mock 调试面板的本地开发服务器：

```bash
pnpm run dev
```

> [!TIP]
> 在开发模式下，界面会渲染 `PreviewPanel` 和 `MockDataEditorModal` 组件。你可以随意修改 JSON Mock 数据，并实时查看各个平台模板在不同状态下的渲染效果。

### 构建与打包

执行以下命令编译并打包生产环境的渲染服务：

```bash
pnpm run build
```

## 📂 目录结构说明

- **`src/components/`**：全局通用的基础 UI 组件和布局（Layout）。
- **`src/platforms/`**：各个平台核心业务模板组件（按 `bilibili`、`douyin`、`kuaishou`、`xiaohongshu` 等模块划分）。
- **`src/dev/`**：专为模板开发设计的预览页面、Mock 工具、数据面板和工作台组件。
- **`src/types/`**：平台数据结构与内部组件的 TypeScript 类型定义文件，确保数据对接的严谨性。
- **`src/utils/`**：日志记录、组件自动注册等辅助工具。
- **`public/`**：静态资源目录，包含各类定制字体（如 JetBrainsMono）、平台图标与 SVG 素材。
