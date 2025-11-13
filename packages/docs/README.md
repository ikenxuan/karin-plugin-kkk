---
home: true
icon: house
title: 项目主页
heroImage: /logo.png
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: karin-plugin-kkk
tagline: 抖音/B站/快手/小红书解析与推送，评论解析全覆盖，精美图片 UI
heroStyle:
  min-height: 600px
actions:
  - text: 快速开始
    icon: lightbulb
    link: ./guide/quick-start.html
    type: primary

  - text: 安装与配置
    icon: sliders
    link: ./guide/install.html

  - text: GitHub
    icon: book
    link: https://github.com/ikenxuan/karin-plugin-kkk

highlights:

  - header: 易于安装
    image: /assets/image/box.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/3-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/3-dark.svg
    highlights:
      - title: 运行 插件市场 直接安装以创建一个新的主题项目。
      - title: 或者在 Karin 根目录下运行 <code>pnpm add karin-plugin-kkk@latest -w</code>

  - header: 多平台解析
    description: 支持抖音、B站、快手、小红书，评论解析全覆盖
    image: /assets/image/markdown.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/2-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/2-dark.svg
    highlights:
      - title: 抖音
        icon: film
        details: 作品解析、评论解析、作品推送......
        link: ./guide/usage.html
      - title: B站
        icon: video
        details: 视频/动态解析、评论解析、动态推送......
        link: ./guide/usage.html
      - title: 快手
        icon: bolt
        details: 作品解析、评论解析
      - title: 小红书
        icon: book-open
        details: 图文/视频解析、评论解析

  - header: 推送能力
    description: 支持抖音与 B 站的订阅推送
    image: /assets/image/features.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/1-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/1-dark.svg
    highlights:
      - title: 定时推送
        icon: clock
        details: Cron 表达式、可视化配置
      - title: 权限控制
        icon: user-shield
        details: 支持 all/admin/master/group.owner/group.admin
      - title: 过滤策略
        icon: filter
        details: 黑白名单、关键词、标签
      - title: 解析偏好
        icon: gauge-simple
        details: 画质偏好与体积上限

  - header: 图片与渲染
    description: 精美图片 UI，细腻可读的展示效果
    image: /assets/image/ui.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/9-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/9-dark.svg
    highlights:
      - title: React 模板
        icon: puzzle-piece
        details: 组件化模板，易开发易维护
      - title: 渲染精度
        icon: highlighter
        details: 可配置 renderScale，支持分页渲染
      - title: 主题与水印
        icon: palette
        details: 自动/浅色/深色主题，插件水印可控

  - header: Web 与 API
    description: 可视化配置与本地解析服务
    image: /assets/image/layout.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: 解析页面
        icon: window-maximize
        details: /kkk/ 与 /kkk/database 管理
      - title: 鉴权支持
        icon: lock
        details: webAuth 控制访问
      - title: 本地 API
        icon: network-wired
        details: 上游解析库路由，挂载到 Karin 或独立端口

  - header: 稳定与维护
    description: 持续更新与问题快速响应
    image: /assets/image/advanced.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
    highlights:
      - title: 即时 Bug 修复
        icon: wrench
        details: 快速迭代与修复
      - title: 缓存与日志
        icon: clipboard-check
        details: 自动清理缓存与详细日志
      - title: 现代栈
        icon: code
        details: Node.js + TypeScript + React + Vite

copyright: false
footer: GPL 3.0 Licensed | Copyright © 2024-present ikenxuan
---
