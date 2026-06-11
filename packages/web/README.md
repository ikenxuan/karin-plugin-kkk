# KKK Config Web

基于 Vite + React + Tailwind CSS v4 + HeroUI v3 的 KKK 配置管理 Web。

## 技术栈

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- HeroUI v3 React
- ahooks
- GSAP
- Axios
- Lucide React

## 结构

```text
src/
├── api/                  # 配置 API
├── auth/                 # Karin 登录态、刷新 token、KKK API 签名
├── components/common/    # 通用面板
├── components/desktop/   # PC 组件
├── components/mobile/    # 手机组件
├── layouts/              # PC/手机独立布局入口
├── types/                # 配置与 API 类型
├── utils/                # 设备检测
├── main.tsx
└── index.css
```

## 路由与构建

- 开发环境：Vite dev server 只启动前端，`/api/kkk` 和 `/api/v1` 反代到 Karin `http://localhost:7777`。
- 生产环境：构建产物输出到 `packages/core/lib/web`，由 core 包注册到 Karin 路由 `/kkk`。
- API：配置读取和保存走同源 `/api/kkk/v1/config`。

## 鉴权

应用复用 Karin 主 Web 的 localStorage key：

- `userId`
- `accessToken`
- `refreshToken`

如果浏览器没有 Karin 登录态，会显示登录页，输入 Karin `HTTP_AUTH_KEY` 后调用 `/api/v1/login` 获取 token。调用 `/api/kkk/v1/*` 时会自动附加 Karin 鉴权头和 KKK API 签名头。

## 开发命令

```bash
pnpm --filter web run dev
pnpm --filter web run build
```

## 样式约束

`src/index.css` 只导入 Tailwind CSS v4 和 HeroUI 样式：

```css
@import 'tailwindcss';
@import '@heroui/styles';
```

组件视觉由 HeroUI 组件和语义 props 承担，Tailwind 只用于布局、间距和尺寸。
