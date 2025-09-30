const nav = [
  { text: '主页', link: '/' },
  { text: '常见问题', link: '/docs/intro/QA' },
  {
    text: '🍉大纲',
    items: [
      {
        text: '快速开始',
        items: [
          { text: '简介', link: '/docs/start/start' },
          { text: '安装插件', link: '/docs/start/install' },
        ],
      },
      {
        text: '功能',
        items: [
          { text: '动态推送', link: '/docs/intro/push' },
        ],
      },
      {
        text: '其他',
        items: [
          { text: '配置ck', link: '/docs/other/ck' },
          { text: '投喂', link: '/docs/other/afdian' },
          { text: '免责声明', link: '/docs/other/disclaimer' },
        ],
      },
    ],
  },
]


export default nav
