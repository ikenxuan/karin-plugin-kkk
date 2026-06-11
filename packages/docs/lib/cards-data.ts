export interface CardData {
  id: number
  num: string
  titleCN: string
  titleEN: string
  center: string
  frontBgColor: string
  frontTextColor: string
  bgColor: string
  textColor: string
}

export const CARDS_DATA: CardData[] = [
  {
    id: 1,
    num: '01',
    titleCN: '多平台解析',
    titleEN: 'PLATFORMS',
    center: '抖音 · B站\n快手 · 小红书',
    frontBgColor: '#e8e0d5',
    frontTextColor: '#5a5248',
    bgColor: '#e8e0d5',
    textColor: '#5a5248'
  },
  {
    id: 2,
    num: '02',
    titleCN: '评论区渲染',
    titleEN: 'COMMENTS',
    center: '楼中楼\n热评',
    frontBgColor: '#d5e0d8',
    frontTextColor: '#485a50',
    bgColor: '#d5e0d8',
    textColor: '#485a50'
  },
  {
    id: 3,
    num: '03',
    titleCN: '弹幕烧录',
    titleEN: 'DANMAKU',
    center: 'FFmpeg\n硬编码',
    frontBgColor: '#e0d5d5',
    frontTextColor: '#5a4848',
    bgColor: '#e0d5d5',
    textColor: '#5a4848'
  },
  {
    id: 4,
    num: '04',
    titleCN: '动态推送',
    titleEN: 'PUSH',
    center: '实时\n订阅',
    frontBgColor: '#d5d8e0',
    frontTextColor: '#484a5a',
    bgColor: '#d5d8e0',
    textColor: '#484a5a'
  },
  {
    id: 5,
    num: '05',
    titleCN: '动态照片',
    titleEN: 'LIVEPHOTO',
    center: 'LivePhoto\n解析',
    frontBgColor: '#d8d5e0',
    frontTextColor: '#4a485a',
    bgColor: '#d8d5e0',
    textColor: '#4a485a'
  },
  {
    id: 6,
    num: '06',
    titleCN: '精美卡片',
    titleEN: 'CARDS',
    center: '30+\n组件',
    frontBgColor: '#e0d5e0',
    frontTextColor: '#5a485a',
    bgColor: '#e0d5e0',
    textColor: '#5a485a'
  },
  {
    id: 7,
    num: '07',
    titleCN: '扫码登录',
    titleEN: 'QRCODE',
    center: '扫码取\nCookie',
    frontBgColor: '#d5e0e0',
    frontTextColor: '#485a5a',
    bgColor: '#d5e0e0',
    textColor: '#485a5a'
  },
  {
    id: 8,
    num: '08',
    titleCN: '开箱即用',
    titleEN: 'READY',
    center: '一键\n安装',
    frontBgColor: '#d5d5d5',
    frontTextColor: '#484848',
    bgColor: '#d5d5d5',
    textColor: '#484848'
  }
]
