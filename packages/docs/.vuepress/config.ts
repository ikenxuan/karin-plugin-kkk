import { defineUserConfig } from "vuepress";

import theme from "./theme";

export default defineUserConfig({
  base: "/karin-plugin-kkk/",
  lang: "zh-CN",
  title: "karin-plugin-kkk 文档",
  description: "Karin 的抖音/B站视频解析与动态推送插件",
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
