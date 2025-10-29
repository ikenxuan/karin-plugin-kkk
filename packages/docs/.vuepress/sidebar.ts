import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "文档",
      icon: "book",
      prefix: "guide/",
      children: [
        "quick-start",
        "install",
        "configuration",
        "usage",
        "push",
        "ck",
        "dev",
        "faq",
        "afdian",
      ],
    },
    {
      text: "案例",
      icon: "laptop-code",
      prefix: "cases/",
      link: "cases/",
      children: "structure",
    },
  ],
  "/guide/": [
    "",
    "quick-start",
    "install",
    "configuration",
    "usage",
    "push",
    "ck",
    "dev",
    "faq",
    "afdian",
  ],
  "/cases/": [
    "",
  ],
});
