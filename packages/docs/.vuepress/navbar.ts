import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "主页", link: "/" },
  {
    text: "指南",
    icon: "book",
    prefix: "/guide/",
    children: [
      { text: "快速开始", link: "quick-start" },
      { text: "功能详解", link: "features" },
      { text: "安装", link: "install" },
      { text: "配置", link: "configuration" },
      { text: "使用", link: "usage" },
      { text: "推送功能", link: "push" },
      { text: "CK相关", link: "ck" },
      { text: "开发", link: "dev" },
      { text: "FAQ", link: "faq" },
      { text: "支持项目", link: "afdian" },
    ],
  },
  { text: "案例", icon: "laptop-code", link: "/cases/" },
  { text: "GitHub", icon: "book", link: "https://github.com/ikenxuan/karin-plugin-kkk" },
  { text: "主题文档", icon: "book", link: "https://theme-hope.vuejs.press/zh/" },
]);
