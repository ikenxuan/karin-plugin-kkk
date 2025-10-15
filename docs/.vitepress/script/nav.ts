const nav = [
  { text: '主页', link: '/docs' },
  { text: '常见问题', link: '/intro/QA' },
  {
    text: '🍉大纲',
    items: [
      {
        text: '快速开始',
        items: [
          { text: '简介', link: '/start/start' },
          { text: '安装插件', link: '/start/install' },
        ],
      },
      {
        text: '功能',
        items: [
          { text: '动态推送', link: '/intro/push' },
        ],
      },
      {
        text: '其他',
        items: [
          { text: '配置ck', link: '/other/ck' },
          { text: '图片样式', link: '/other/images' },
          { text: '开发贡献', link: '/other/contribution' },
          { text: '投喂', link: '/other/afdian' },
          { text: '免责声明', link: '/other/disclaimer' },
        ],
      },
    ],
  },
]


export default nav
