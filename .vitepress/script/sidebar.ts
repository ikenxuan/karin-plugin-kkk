const sidebar = [
  {
    text: '快速开始',
    items: [
      { text: '<iconify-icon icon="ix:about" style="margin-right:0.25rem;color:#741eff;"></iconify-icon> 简介', link: '/docs/start/start' },
      { text: '<iconify-icon icon="icon-park-outline:install" style="margin-right:0.25rem;color:#cdff1e;"></iconify-icon> 安装插件', link: '/docs/start/install' },
      { text: '<iconify-icon icon="ep:setting" style="margin-right:0.25rem;color:#1effc5;"></iconify-icon> 配置文件', link: '/docs/start/start.config' },
    ],
  },
  {
    text: '功能',
    items: [
      {
        text: '<iconify-icon icon="line-md:list-3-filled" style="margin-right:0.25rem;color:#ffd72a"></iconify-icon> 目录', link: '/docs/intro/main/main', items: [
          { text: '<iconify-icon icon="logos:tiktok-icon" style="margin-right:0.25rem"></iconify-icon> 抖音相关', link: '/docs/intro/main/douyin', },
          { text: '<iconify-icon icon="ri:bilibili-fill" style="margin-right:0.25rem;color:#1ee1ff"></iconify-icon> B站相关', link: '/docs/intro/main/bilibili' },
          { text: '<iconify-icon icon="simple-icons:kuaishou" style="margin-right:0.25rem;color:#ff551e"></iconify-icon> 快手相关', link: '/docs/intro/main/kuaishou' },
        ]
      },
      { text: '<iconify-icon icon="mingcute:horn-fill" style="margin-right:0.25rem;color:#d1a202;"></iconify-icon> 动态推送', link: '/docs/intro/push' },
      { text: '<iconify-icon icon="mingcute:route-fill" style="margin-right:0.25rem;color:#74ff5c;"></iconify-icon> API Server', link: '/docs/intro/apiserver' },
      { text: '<iconify-icon icon="basil:other-1-outline" style="margin-right:0.25rem;color:#5f2aff;"></iconify-icon> 其他功能', link: '/docs/intro/other' },
    ],
  },
  {
    text: '其他',
    items: [
      {
        text: '<iconify-icon icon="twemoji:thinking-face" style="margin-right:0.25rem"></iconify-icon> 遇到问题了？', link: '/docs/intro/problems', items: [
          { text: '<iconify-icon icon="mingcute:check-2-fill" style="margin-right:0.25rem;color:#50ff2a;"></iconify-icon> 常见问题解答', link: '/docs/intro/QA' },
        ]
      },
      { text: '<iconify-icon icon="fluent-emoji:red-heart" style="margin-right:0.25rem"></iconify-icon> 投喂', link: '/docs/other/afdian' },
      { text: '<iconify-icon icon="noto-v1:warning" style="margin-right:0.25rem"></iconify-icon> 免责声明', link: '/docs/other/disclaimer' },
      { text: '<iconify-icon icon="mingcute:content-ai-line" style="margin-right:0.25rem;color:#2afff9;"></iconify-icon> 版本历史', link: '/docs/other/timeline' },
    ],
  },
]

export default sidebar