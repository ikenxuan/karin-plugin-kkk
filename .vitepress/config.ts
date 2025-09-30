import { defineConfig } from 'vitepress'
import nav from './script/nav'
import sidebar from './script/sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "karin-plugin-kkk",
  description: "一个基于karin的抖音、B站插件",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ikenxuan/karin-plugin-kkk' }
    ]
  }
})
