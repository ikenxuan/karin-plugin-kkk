---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: 'karin-plugin-kkk'
  text: 视频解析插
  textsuffix: 件
  tagline: 在群聊中添加更多互动乐趣
  prelink:
    copy: true
    install: 'pnpm add karin-plugin-kkk -w'
    title: '<p style="text-align: left;"><i class="fa-solid fa-bolt fa-shake" style="color: #FFD43B;"></i> 快速开始，点击卡片复制安装命令</p><div style="text-align: left; font-weight: bold; word-break: break-all; overflow-wrap: break-word;">pnpm add karin-plugin-kkk -w</div>'
  image:
    src: /logo.png
  actions:
    - theme: brand
      text: 源码
      link: https://github.com/ikenxuan/karin-plugin-kkk
    - theme: alt
      text: 简介
      link: /docs/start/start
    - theme: alt
      text: 安装
      link: /docs/start/install

features:
  - title: <iconify-icon icon="mdi:comment-text-multiple" style="margin-right:0.25rem;color:#3498db;"></iconify-icon>评论解析
    details: 解析视频同时解析评论，并通过渲染器渲染精美的评论图片返回
    rel: 'noopener'

  - title: <iconify-icon icon="mingcute:horn-fill" style="margin-right:0.25rem;color:#d1a202;"></iconify-icon>推送功能
    details: 用户可通过指定命令对自己喜欢的博主/UP主的视频或者动态进行定时推送，不错过他/她更新的动态
    rel: 'noopener'

  - title: '<iconify-icon icon="mingcute:align-arrow-up-fill" style="margin-right:0.25rem;color:#f39c12;"></iconify-icon>精细化的上传设置'
    details: 当视频文件过大对服务器上行形成压力时可对其拦截或压缩后再上传；同时支持过大的视频使用群文件上传
    rel: 'noopener'

  - title: <iconify-icon icon="mingcute:route-fill" style="margin-right:0.25rem;color:#74ff5c;"></iconify-icon>开放API
    details: 得益于解析库自带的http服务，本插件可开放解析库的所有API接口
    link: /docs/intro/apiserver
    rel: 'noopener'
    linkText: 了解更多
---

<Home />
<confetti />
