import { createRequire } from 'module';
import { Config } from './chunk-YW4DRDI5.js';
import { init_esm_shims } from './chunk-U2PMGOCW.js';
import { components } from 'node-karin';
import _ from 'node-karin/lodash';

createRequire(import.meta.url);

// src/web.config.ts
init_esm_shims();
var all = await Config.All();
var web_config_default = {
  info: {
    id: "karin-plugin-kkk",
    name: "karin-plugin-kkk",
    description: "Karin \u7684\u300C\u6296\u97F3\u300D\u300CB\u7AD9\u300D\u300C\u5FEB\u624B\u300D\u89C6\u9891\u89E3\u6790/\u52A8\u6001\u63A8\u9001\u63D2\u4EF6",
    icon: {
      name: "tag",
      color: "#EAC452"
    },
    author: [
      {
        name: "ikenxuan",
        home: "https://github.com/ikenxuan",
        avatar: "https://avatars.githubusercontent.com/u/112480306"
      }
    ]
  },
  components: () => [
    components.accordion.create("cookies", {
      label: "Cookies \u76F8\u5173",
      children: [
        components.accordion.createItem("cfg:cookies", {
          title: "Cookies \u76F8\u5173",
          className: "ml-4 mr-4",
          subtitle: "\u5EFA\u8BAE\u914D\u7F6E\uFF0C\u5426\u5219\u5927\u90E8\u5206\u529F\u80FD\u65E0\u6CD5\u4F7F\u7528",
          children: [
            components.input.string("douyin", {
              label: "\u6296\u97F3",
              type: "text",
              description: "\u8BF7\u8F93\u5165\u4F60\u7684\u6296\u97F3Cookies\uFF0C\u4E0D\u8F93\u5165\u5219\u65E0\u6CD5\u4F7F\u7528\u6296\u97F3\u76F8\u5173\u529F\u80FD\u5662",
              defaultValue: all.cookies.douyin,
              placeholder: "",
              rules: void 0,
              isRequired: false
            }),
            components.input.string("bilibili", {
              label: "B\u7AD9",
              type: "text",
              description: "\u8BF7\u8F93\u5165\u4F60\u7684B\u7AD9Cookies\uFF0C\u4E0D\u8F93\u5165\u5219\u65E0\u6CD5\u4F7F\u7528B\u7AD9\u76F8\u5173\u529F\u80FD\u5662",
              defaultValue: all.cookies.bilibili,
              placeholder: "",
              rules: void 0,
              isRequired: false
            }),
            components.input.string("kuaishou", {
              label: "\u5FEB\u624B",
              type: "text",
              description: "\u8BF7\u8F93\u5165\u4F60\u7684\u5FEB\u624BCookies\uFF0C\u4E0D\u8F93\u5165\u5219\u65E0\u6CD5\u4F7F\u7528\u5FEB\u624B\u76F8\u5173\u529F\u80FD\u5662",
              defaultValue: all.cookies.kuaishou,
              placeholder: "",
              rules: void 0,
              isRequired: false
            })
          ]
        })
      ]
    }),
    components.accordion.create("app", {
      label: "\u63D2\u4EF6\u5E94\u7528\u76F8\u5173",
      children: [
        components.accordion.createItem("cfg:app", {
          title: "\u63D2\u4EF6\u5E94\u7528\u76F8\u5173",
          className: "ml-4 mr-4",
          subtitle: "\u6B64\u5904\u7528\u4E8E\u7BA1\u7406\u63D2\u4EF6\u7684\u57FA\u672C\u8BBE\u7F6E",
          children: [
            components.switch.create("rmmp4", {
              label: "\u7F13\u5B58\u5220\u9664",
              description: "\u7F13\u5B58\u81EA\u52A8\u5220\u9664\uFF0C\u975E\u5FC5\u8981\u4E0D\u4FEE\u6539\uFF01",
              defaultSelected: all.app.rmmp4
            }),
            components.switch.create("defaulttool", {
              label: "\u9ED8\u8BA4\u89E3\u6790",
              description: "\u5373\u8BC6\u522B\u6700\u9AD8\u4F18\u5148\u7EA7\uFF0C\u4FEE\u6539\u540E\u91CD\u542F\u751F\u6548",
              defaultSelected: all.app.defaulttool
            }),
            components.input.number("priority", {
              label: "\u81EA\u5B9A\u4E49\u4F18\u5148\u7EA7",
              description: "\u81EA\u5B9A\u4E49\u4F18\u5148\u7EA7\uFF0C\u300C\u9ED8\u8BA4\u89E3\u6790\u300D\u5173\u95ED\u540E\u624D\u4F1A\u751F\u6548\u3002\u4FEE\u6539\u540E\u91CD\u542F\u751F\u6548",
              defaultValue: all.app.priority.toString(),
              isDisabled: all.app.defaulttool,
              rules: void 0
            }),
            components.input.number("renderScale", {
              label: "\u6E32\u67D3\u7CBE\u5EA6",
              description: "\u53EF\u9009\u503C50~200\uFF0C\u5EFA\u8BAE100\u3002\u8BBE\u7F6E\u9AD8\u7CBE\u5EA6\u4F1A\u63D0\u9AD8\u56FE\u7247\u7684\u7CBE\u7EC6\u5EA6\uFF0C\u8FC7\u9AD8\u53EF\u80FD\u4F1A\u5F71\u54CD\u6E32\u67D3\u4E0E\u53D1\u9001\u901F\u5EA6",
              defaultValue: all.app.renderScale.toString(),
              rules: [
                {
                  min: 50,
                  max: 200
                }
              ]
            }),
            components.switch.create("APIServer", {
              label: "API\u670D\u52A1",
              description: "\u672C\u5730\u90E8\u7F72\u4E00\u4E2A\u89C6\u9891\u89E3\u6790API\u670D\u52A1\uFF0C\u63A5\u53E3\u8303\u56F4\u4E3A\u672C\u63D2\u4EF6\u7528\u5230\u7684\u6240\u6709",
              defaultSelected: all.app.APIServer
            }),
            components.switch.create("APIServerMount", {
              label: "\u6302\u8F7D\u5230 Karin",
              description: "API \u670D\u52A1\u662F\u5426\u6302\u8F7D\u5230 Karin \u4E0A\uFF0C\u5F00\u542F\u540E\u76D1\u542C\u7AEF\u53E3\u4E3A Karin \u7684 http \u7AEF\u53E3\uFF0C\u4FEE\u6539\u540E\u9700\u91CD\u542F",
              defaultSelected: all.app.APIServerMount
            }),
            components.input.number("APIServerPort", {
              label: "API\u670D\u52A1\u7AEF\u53E3",
              defaultValue: all.app.APIServerPort.toString(),
              isDisabled: all.app.APIServerMount,
              rules: [
                {
                  min: 1024,
                  max: 65535,
                  error: "\u8BF7\u8F93\u5165\u4E00\u4E2A\u8303\u56F4\u5728 1024 \u5230 65535 \u4E4B\u95F4\u7684\u6570\u5B57"
                }
              ]
            }),
            components.radio.group("Theme", {
              label: "\u6E32\u67D3\u56FE\u7247\u7684\u4E3B\u9898\u8272",
              orientation: "horizontal",
              defaultValue: all.app.Theme.toString(),
              radio: [
                components.radio.create("Theme-1", {
                  label: "\u81EA\u52A8",
                  description: "06:00-18:00\u4E3A\u6D45\u8272\uFF0C18:00-06:00\u4E3A\u6DF1\u8272",
                  value: "0"
                }),
                components.radio.create("Theme-2", {
                  label: "\u6D45\u8272",
                  value: "1"
                }),
                components.radio.create("Theme-3", {
                  label: "\u6DF1\u8272",
                  value: "2"
                })
              ]
            }),
            components.switch.create("RemoveWatermark", {
              label: "\u79FB\u9664\u6C34\u5370",
              description: "\u6E32\u67D3\u7684\u56FE\u7247\u662F\u5426\u79FB\u9664\u5E95\u90E8\u6C34\u5370",
              defaultSelected: all.app.RemoveWatermark
            }),
            components.input.number("RenderWaitTime", {
              label: "\u6E32\u67D3\u56FE\u7247\u7684\u7B49\u5F85\u65F6\u95F4",
              description: "\u5355\u4F4D\uFF1A\u79D2\uFF0C\u4F20\u9012 0 \u53EF\u7981\u7528",
              defaultValue: all.app.RenderWaitTime.toString(),
              rules: [
                { min: 0 }
              ]
            }),
            components.switch.create("EmojiReply", {
              label: "\u8868\u60C5\u56DE\u5E94",
              description: "\u5728\u89E3\u6790\u4EFB\u52A1\u5F00\u59CB\u65F6\u6DFB\u52A0\u8868\u60C5\u56DE\u5E94",
              defaultSelected: all.app.EmojiReply
            }),
            components.input.number("EmojiReplyID", {
              label: "\u8868\u60C5 ID",
              isDisabled: !all.app.EmojiReply,
              description: "\u8BE6\u60C5\u67E5\u770B\uFF1Ahttps://github.com/NapNeko/NapCatQQ/blob/main/src/core/external/face_config.json \u7684 QCid \u5B57\u6BB5",
              defaultValue: all.app.EmojiReplyID.toString(),
              rules: [
                { min: 0, max: 1145141919810 }
              ]
            })
          ]
        })
      ]
    }),
    components.accordion.create("douyin", {
      label: "\u6296\u97F3\u76F8\u5173",
      children: [
        components.accordion.createItem("cfg:douyin", {
          title: "\u6296\u97F3\u76F8\u5173",
          className: "ml-4 mr-4",
          subtitle: "\u6B64\u5904\u4E3A\u6296\u97F3\u76F8\u5173\u7684\u7528\u6237\u504F\u597D\u8BBE\u7F6E",
          children: [
            components.switch.create("switch", {
              label: "\u89E3\u6790\u5F00\u5173",
              description: "\u6296\u97F3\u89E3\u6790\u5F00\u5173\uFF0C\u6B64\u5F00\u5173\u4E3A\u5355\u72EC\u5F00\u5173",
              defaultSelected: all.douyin.switch
            }),
            components.switch.create("tip", {
              label: "\u89E3\u6790\u63D0\u793A",
              description: "\u6296\u97F3\u89E3\u6790\u63D0\u793A\uFF0C\u53D1\u9001\u63D0\u793A\u4FE1\u606F\uFF1A\u201C\u68C0\u6D4B\u5230\u6296\u97F3\u94FE\u63A5\uFF0C\u5F00\u59CB\u89E3\u6790\u201D",
              defaultSelected: all.douyin.tip
            }),
            components.switch.create("comment", {
              label: "\u8BC4\u8BBA\u89E3\u6790",
              description: "\u6296\u97F3\u8BC4\u8BBA\u89E3\u6790\uFF0C\u5F00\u542F\u540E\u53EF\u53D1\u9001\u6296\u97F3\u4F5C\u54C1\u8BC4\u8BBA\u56FE",
              defaultSelected: all.douyin.comment
            }),
            components.input.number("numcomment", {
              label: "\u8BC4\u8BBA\u89E3\u6790\u6570\u91CF",
              defaultValue: all.douyin.numcomment.toString(),
              rules: [{ min: 1 }]
            }),
            components.switch.create("autoResolution", {
              label: "\u81EA\u52A8\u5206\u8FA8\u7387",
              description: "\u6839\u636E\u300C\u89C6\u9891\u62E6\u622A\u9608\u503C\u300D\u81EA\u52A8\u9009\u62E9\u5408\u9002\u7684\u5206\u8FA8\u7387\uFF0C\u5173\u95ED\u540E\u9ED8\u8BA4\u9009\u62E9\u6700\u5927\u5206\u8FA8\u7387\u8FDB\u884C\u4E0B\u8F7D",
              defaultSelected: all.douyin.autoResolution
            }),
            components.divider.create("divider-dy-1", {
              description: "\u6296\u97F3\u63A8\u9001\u76F8\u5173",
              descPosition: 20
            }),
            components.switch.create("push:switch", {
              label: "\u63A8\u9001\u5F00\u5173",
              description: "\u63A8\u9001\u5F00\u5173\uFF0C\u5F00\u542F\u540E\u9700\u91CD\u542F\uFF1B\u4F7F\u7528\u300C#\u8BBE\u7F6E\u6296\u97F3\u63A8\u9001 + \u6296\u97F3\u53F7\u300D\u914D\u7F6E\u63A8\u9001\u5217\u8868",
              defaultSelected: all.douyin.push.switch
            }),
            components.radio.group("push:permission", {
              label: "\u8C01\u53EF\u4EE5\u8BBE\u7F6E\u63A8\u9001",
              orientation: "horizontal",
              defaultValue: all.douyin.push.permission,
              radio: [
                components.radio.create("push:permission:radio-1", {
                  label: "\u6240\u6709\u4EBA",
                  value: "all"
                }),
                components.radio.create("push:permission:radio-2", {
                  label: "\u7BA1\u7406\u5458",
                  value: "admin"
                }),
                components.radio.create("push:permission:radio-3", {
                  label: "\u4E3B\u4EBA",
                  value: "master"
                }),
                components.radio.create("push:permission:radio-4", {
                  label: "\u7FA4\u4E3B",
                  value: "group.owner"
                }),
                components.radio.create("push:permission:radio-5", {
                  label: "\u7FA4\u7BA1\u7406\u5458",
                  value: "group.admin"
                })
              ]
            }),
            components.input.string("push:cron", {
              label: "\u5B9A\u65F6\u4EFB\u52A1\u8868\u8FBE\u5F0F",
              description: "\u5B9A\u65F6\u63A8\u9001\u7684\u65F6\u95F4\uFF0C\u683C\u5F0F\u4E3Acron\u8868\u8FBE\u5F0F\uFF08\u9ED8\u8BA4\u4E3A\u6BCF\u5341\u5206\u949F\u6267\u884C\u4E00\u6B21\uFF09",
              defaultValue: all.douyin.push.cron
            }),
            components.switch.create("push:parsedynamic", {
              label: "\u4F5C\u54C1\u89E3\u6790",
              description: "\u89E6\u53D1\u63A8\u9001\u65F6\u662F\u5426\u4E00\u540C\u89E3\u6790\u8BE5\u4F5C\u54C1",
              defaultSelected: all.douyin.push.parsedynamic
            }),
            components.switch.create("push:log", {
              label: "\u63A8\u9001\u65E5\u5FD7",
              description: "\u662F\u5426\u6253\u5370\u63A8\u9001\u65E5\u5FD7\uFF08\u4FEE\u6539\u540E\u9700\u91CD\u542F\uFF09",
              defaultSelected: all.douyin.push.log
            }),
            components.radio.group("push:shareType", {
              label: "\u63A8\u9001\u56FE\u4E8C\u7EF4\u7801\u7684\u7C7B\u578B",
              orientation: "horizontal",
              defaultValue: all.douyin.push.shareType,
              radio: [
                components.radio.create("push:shareType.radio-1", {
                  label: "\u7F51\u9875\u94FE\u63A5",
                  description: "\u8BC6\u522B\u540E\u8BBF\u95EE\u6296\u97F3\u5B98\u7F51\u5BF9\u5E94\u7684\u4F5C\u54C1\u5730\u5740",
                  value: "web"
                }),
                components.radio.create("push:shareType.radio-2", {
                  description: "\u8BC6\u522B\u540E\u8BBF\u95EE\u65E0\u6C34\u5370\u4F5C\u54C1\u4E0B\u8F7D\u5730\u5740",
                  label: "\u4E0B\u8F7D\u94FE\u63A5",
                  value: "download"
                })
              ]
            })
          ]
        })
      ]
    }),
    components.accordion.create("bilibili", {
      label: "B\u7AD9\u76F8\u5173",
      children: [
        components.accordion.createItem("cfg:bilibili", {
          title: "B\u7AD9\u76F8\u5173",
          className: "ml-4 mr-4",
          subtitle: "\u6B64\u5904\u4E3AB\u7AD9\u76F8\u5173\u7684\u7528\u6237\u504F\u597D\u8BBE\u7F6E",
          children: [
            components.switch.create("switch", {
              label: "\u89E3\u6790\u5F00\u5173",
              description: "B\u7AD9\u89E3\u6790\u5F00\u5173\uFF0C\u6B64\u5F00\u5173\u4E3A\u5355\u72EC\u5F00\u5173",
              defaultSelected: all.bilibili.switch
            }),
            components.switch.create("tip", {
              label: "\u89E3\u6790\u63D0\u793A",
              description: "B\u7AD9\u89E3\u6790\u63D0\u793A\uFF0C\u53D1\u9001\u63D0\u793A\u4FE1\u606F\uFF1A\u201C\u68C0\u6D4B\u5230B\u7AD9\u94FE\u63A5\uFF0C\u5F00\u59CB\u89E3\u6790\u201D",
              defaultSelected: all.bilibili.tip
            }),
            components.switch.create("comment", {
              label: "\u8BC4\u8BBA\u89E3\u6790",
              description: "B\u7AD9\u8BC4\u8BBA\u89E3\u6790\uFF0C\u5F00\u542F\u540E\u53EF\u53D1\u9001B\u7AD9\u4F5C\u54C1\u8BC4\u8BBA\u56FE",
              defaultSelected: all.bilibili.comment
            }),
            components.input.number("numcomment", {
              label: "\u8BC4\u8BBA\u89E3\u6790\u6570\u91CF",
              defaultValue: all.bilibili.numcomment.toString(),
              rules: [{ min: 1 }]
            }),
            components.switch.create("videopriority", {
              label: "\u4F18\u5148\u4FDD\u5185\u5BB9",
              description: "\u89E3\u6790\u89C6\u9891\u662F\u5426\u4F18\u5148\u4FDD\u5185\u5BB9\uFF0Ctrue\u4E3A\u4F18\u5148\u4FDD\u8BC1\u4E0A\u4F20\u5C06\u4F7F\u7528\u6700\u4F4E\u5206\u8FA8\u7387\uFF0Cfalse\u4E3A\u4F18\u5148\u4FDD\u6E05\u6670\u5EA6\u5C06\u4F7F\u7528\u6700\u9AD8\u5206\u8FA8\u7387",
              defaultSelected: all.bilibili.videopriority
            }),
            components.switch.create("autoResolution", {
              label: "\u81EA\u52A8\u5206\u8FA8\u7387",
              description: "\u6839\u636E\u300C\u89C6\u9891\u62E6\u622A\u9608\u503C\u300D\u81EA\u52A8\u9009\u62E9\u5408\u9002\u7684\u5206\u8FA8\u7387\uFF0C\u5173\u95ED\u540E\u9ED8\u8BA4\u9009\u62E9\u6700\u5927\u5206\u8FA8\u7387\u8FDB\u884C\u4E0B\u8F7D",
              defaultSelected: all.bilibili.autoResolution
            }),
            components.divider.create("divider-dy-1", {
              description: "B\u7AD9\u63A8\u9001\u76F8\u5173",
              descPosition: 20
            }),
            components.switch.create("push:switch", {
              label: "\u63A8\u9001\u5F00\u5173",
              description: "\u63A8\u9001\u5F00\u5173\uFF0C\u5F00\u542F\u540E\u9700\u91CD\u542F\uFF1B\u4F7F\u7528\u300C#\u8BBE\u7F6EB\u7AD9\u63A8\u9001 + UID\u300D\u914D\u7F6E\u63A8\u9001\u5217\u8868",
              defaultSelected: all.bilibili.push.switch
            }),
            components.radio.group("push:permission", {
              label: "\u8C01\u53EF\u4EE5\u8BBE\u7F6E\u63A8\u9001",
              orientation: "horizontal",
              defaultValue: all.bilibili.push.permission,
              radio: [
                components.radio.create("push:permission:radio-1", {
                  label: "\u6240\u6709\u4EBA",
                  value: "all"
                }),
                components.radio.create("push:permission:radio-2", {
                  label: "\u7BA1\u7406\u5458",
                  value: "admin"
                }),
                components.radio.create("push:permission:radio-3", {
                  label: "\u4E3B\u4EBA",
                  value: "master"
                }),
                components.radio.create("push:permission:radio-4", {
                  label: "\u7FA4\u4E3B",
                  value: "group.owner"
                }),
                components.radio.create("push:permission:radio-5", {
                  label: "\u7FA4\u7BA1\u7406\u5458",
                  value: "group.admin"
                })
              ]
            }),
            components.input.string("push:cron", {
              label: "\u5B9A\u65F6\u4EFB\u52A1\u8868\u8FBE\u5F0F",
              description: "\u5B9A\u65F6\u63A8\u9001\u7684\u65F6\u95F4\uFF0C\u683C\u5F0F\u4E3Acron\u8868\u8FBE\u5F0F\uFF08\u9ED8\u8BA4\u4E3A\u6BCF\u5341\u5206\u949F\u6267\u884C\u4E00\u6B21\uFF09",
              defaultValue: all.bilibili.push.cron
            }),
            components.switch.create("push:parsedynamic", {
              label: "\u4F5C\u54C1\u89E3\u6790",
              description: "\u89E6\u53D1\u63A8\u9001\u65F6\u662F\u5426\u4E00\u540C\u89E3\u6790\u8BE5\u4F5C\u54C1",
              defaultSelected: all.bilibili.push.parsedynamic
            }),
            components.switch.create("push:log", {
              label: "\u63A8\u9001\u65E5\u5FD7",
              description: "\u662F\u5426\u6253\u5370\u63A8\u9001\u65E5\u5FD7\uFF08\u4FEE\u6539\u540E\u9700\u91CD\u542F\uFF09",
              defaultSelected: all.bilibili.push.log
            })
          ]
        })
      ]
    }),
    components.accordion.create("kuaishou", {
      label: "\u5FEB\u624B\u76F8\u5173",
      children: [
        components.accordion.createItem("cfg:kuaishou", {
          title: "\u5FEB\u624B\u76F8\u5173",
          className: "ml-4 mr-4",
          subtitle: "\u6B64\u5904\u4E3A\u5FEB\u624B\u76F8\u5173\u7684\u7528\u6237\u504F\u597D\u8BBE\u7F6E",
          children: [
            components.switch.create("switch", {
              label: "\u89E3\u6790\u5F00\u5173",
              description: "\u5FEB\u624B\u89E3\u6790\u5F00\u5173\uFF0C\u6B64\u5F00\u5173\u4E3A\u5355\u72EC\u5F00\u5173",
              defaultSelected: all.kuaishou.switch
            }),
            components.switch.create("tip", {
              label: "\u89E3\u6790\u63D0\u793A",
              description: "\u6296\u97F3\u89E3\u6790\u63D0\u793A\uFF0C\u53D1\u9001\u63D0\u793A\u4FE1\u606F\uFF1A\u201C\u68C0\u6D4B\u5230\u5FEB\u624B\u94FE\u63A5\uFF0C\u5F00\u59CB\u89E3\u6790\u201D",
              defaultSelected: all.kuaishou.tip
            }),
            components.switch.create("comment", {
              label: "\u8BC4\u8BBA\u89E3\u6790",
              description: "\u5FEB\u624B\u8BC4\u8BBA\u89E3\u6790\uFF0C\u5F00\u542F\u540E\u53EF\u53D1\u9001\u6296\u97F3\u4F5C\u54C1\u8BC4\u8BBA\u56FE",
              defaultSelected: all.kuaishou.comment
            }),
            components.input.number("numcomment", {
              label: "\u8BC4\u8BBA\u89E3\u6790\u6570\u91CF",
              defaultValue: all.kuaishou.numcomment.toString(),
              rules: [{ min: 1 }]
            })
          ]
        })
      ]
    }),
    components.accordion.create("upload", {
      label: "\u89C6\u9891\u6587\u4EF6\u4E0A\u4F20\u76F8\u5173",
      children: [
        components.accordion.createItem("cfg:upload", {
          title: "\u4E0A\u4F20\u76F8\u5173",
          className: "ml-4 mr-4",
          subtitle: "\u6B64\u5904\u4E3A\u4E0A\u4F20\u76F8\u5173\u7684\u7528\u6237\u504F\u597D\u8BBE\u7F6E",
          children: [
            components.switch.create("sendbase64", {
              label: "\u8F6C\u6362Base64",
              description: "\u53D1\u9001\u89C6\u9891\u7ECF\u672C\u63D2\u4EF6\u8F6C\u6362\u4E3Abase64\u683C\u5F0F\u540E\u518D\u53D1\u9001\uFF0C\u9002\u5408Karin\u4E0E\u673A\u5668\u4EBA\u4E0D\u5728\u540C\u4E00\u7F51\u7EDC\u73AF\u5883\u4E0B\u5F00\u542F",
              defaultSelected: all.upload.swisendbase64tch
            }),
            components.switch.create("usefilelimit", {
              label: "\u89C6\u9891\u4E0A\u4F20\u62E6\u622A",
              description: "\u5F00\u542F\u540E\u4F1A\u6839\u636E\u89C6\u9891\u6587\u4EF6\u5927\u5C0F\u5224\u65AD\u662F\u5426\u9700\u8981\u4E0A\u4F20\uFF0C\u9700\u914D\u7F6E\u300C\u89C6\u9891\u62E6\u622A\u9608\u503C\u300D\u3002",
              defaultSelected: all.upload.usefilelimit
            }),
            components.input.number("filelimit", {
              label: "\u89C6\u9891\u62E6\u622A\u9608\u503C",
              description: "\u89C6\u9891\u6587\u4EF6\u5927\u4E8E\u8BE5\u6570\u503C\u5219\u76F4\u63A5\u7ED3\u675F\u4EFB\u52A1\uFF0C\u4E0D\u4F1A\u4E0A\u4F20\uFF0C\u5355\u4F4D: MB\uFF0C\u300C\u89C6\u9891\u4E0A\u4F20\u62E6\u622A\u300D\u5F00\u542F\u540E\u624D\u4F1A\u751F\u6548\u3002",
              defaultValue: all.upload.filelimit.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.upload.usefilelimit
            }),
            components.switch.create("compress", {
              label: "\u538B\u7F29\u89C6\u9891",
              description: "\u5F00\u542F\u540E\u4F1A\u5C06\u89C6\u9891\u6587\u4EF6\u538B\u7F29\u540E\u518D\u4E0A\u4F20\uFF0C\u9002\u5408\u4E0A\u4F20\u5927\u6587\u4EF6\uFF0C\u4EFB\u52A1\u8FC7\u7A0B\u4E2D\u4F1A\u5403\u6EE1CPU\uFF0C\u5BF9\u4F4E\u914D\u670D\u52A1\u5668\u4E0D\u53CB\u597D\u3002\u9700\u914D\u7F6E\u300C\u538B\u7F29\u89E6\u53D1\u9608\u503C\u300D\u4E0E\u300C\u538B\u7F29\u540E\u7684\u503C\u300D",
              defaultSelected: all.upload.compress
            }),
            components.input.number("compresstrigger", {
              label: "\u538B\u7F29\u89E6\u53D1\u9608\u503C",
              description: "\u89E6\u53D1\u89C6\u9891\u538B\u7F29\u7684\u9608\u503C\uFF0C\u5355\u4F4D\uFF1AMB\u3002\u5F53\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7\u8BE5\u503C\u65F6\uFF0C\u624D\u4F1A\u538B\u7F29\u89C6\u9891\uFF0C\u300C\u538B\u7F29\u89C6\u9891\u300D\u5F00\u542F\u540E\u624D\u4F1A\u751F\u6548",
              defaultValue: all.upload.compresstrigger.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.upload.compress
            }),
            components.input.number("compressvalue", {
              label: "\u538B\u7F29\u540E\u7684\u503C",
              description: "\u5355\u4F4D\uFF1AMB\uFF0C\u82E5\u89C6\u9891\u6587\u4EF6\u5927\u5C0F\u5927\u4E8E\u300C\u538B\u7F29\u89E6\u53D1\u9608\u503C\u300D\u7684\u503C\uFF0C\u5219\u4F1A\u8FDB\u884C\u538B\u7F29\u81F3\u8BE5\u503C\uFF08\xB15%\uFF09\uFF0C\u300C\u538B\u7F29\u89C6\u9891\u300D\u5F00\u542F\u540E\u624D\u4F1A\u751F\u6548",
              defaultValue: all.upload.compressvalue.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.upload.compress
            }),
            components.switch.create("usegroupfile", {
              label: "\u7FA4\u6587\u4EF6\u4E0A\u4F20",
              description: "\u4F7F\u7528\u7FA4\u6587\u4EF6\u4E0A\u4F20\uFF0C\u5F00\u542F\u540E\u4F1A\u5C06\u89C6\u9891\u6587\u4EF6\u4E0A\u4F20\u5230\u7FA4\u6587\u4EF6\u4E2D\uFF0C\u9700\u914D\u7F6E\u300C\u7FA4\u6587\u4EF6\u4E0A\u4F20\u9608\u503C\u300D",
              defaultSelected: all.upload.usegroupfile
            }),
            components.input.number("groupfilevalue", {
              label: "\u7FA4\u6587\u4EF6\u4E0A\u4F20\u9608\u503C",
              description: "\u5F53\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7\u8BE5\u503C\u65F6\u5C06\u4F7F\u7528\u7FA4\u6587\u4EF6\u4E0A\u4F20\uFF0C\u5355\u4F4D\uFF1AMB\uFF0C\u300C\u4F7F\u7528\u7FA4\u6587\u4EF6\u4E0A\u4F20\u300D\u5F00\u542F\u540E\u624D\u4F1A\u751F\u6548",
              defaultValue: all.upload.groupfilevalue.toString(),
              rules: [{ min: 1 }],
              isDisabled: !all.upload.usegroupfile
            })
          ]
        })
      ]
    }),
    components.divider.create("divider-7", {
      description: "\u6296\u97F3\u63A8\u9001\u5217\u8868\u76F8\u5173",
      descPosition: 20
    }),
    components.accordionPro.create(
      "pushlist:douyin",
      all.pushlist.douyin.map((item) => {
        return {
          ...item,
          title: item.remark,
          subtitle: item.short_id
        };
      }),
      {
        label: "\u6296\u97F3\u63A8\u9001\u5217\u8868",
        children: components.accordion.createItem("accordion-item-douyin", {
          className: "ml-4 mr-4",
          children: [
            components.input.string("short_id", {
              placeholder: "",
              label: "\u6296\u97F3\u53F7",
              description: "\u6296\u97F3\u53F7, \u5FC5\u586B",
              errorMessage: "\u6296\u97F3\u53F7\u4E0D\u80FD\u4E3A\u7A7A Ciallo\uFF5E(\u2220\u30FB\u03C9< )\u2312\u2606"
            }),
            components.input.group("group_id", {
              label: "\u63A8\u9001\u7FA4\u53F7\u548C\u673A\u5668\u4EBA\u8D26\u53F7",
              maxRows: 2,
              data: [],
              template: components.input.string("accordion-item-douyin:push:douyin:group_id", {
                placeholder: "\u5FC5\u586B\uFF0C\u4E0D\u80FD\u51FA\u73B0\u7A7A\u503C",
                label: "",
                color: "default",
                description: "\u63A8\u9001\u7FA4\u53F7\u548C\u673A\u5668\u4EBA\u8D26\u53F7\uFF0C\u591A\u4E2A\u5219\u4F7F\u7528\u9017\u53F7\u9694\u5F00\uFF0C\u5FC5\u586B\u3002\u5982\uFF1A\u7FA4\u53F71:\u673A\u5668\u4EBA\u8D26\u53F71",
                errorMessage: "\u4F60\u4E0D\u8BBE\u7F6E\u7FA4\u53F7\u548CBot\u53F7\uFF0C\u6211\u600E\u4E48\u77E5\u9053\u4F60\u8981\u7528\u4EC0\u4E48\u63A8\u9001\u7ED9\u8C01\u5462\uFF1F"
              })
            }),
            components.input.string("sec_uid", {
              color: "default",
              placeholder: "\u53EF\u4E0D\u586B\uFF0C\u4F1A\u81EA\u52A8\u83B7\u53D6",
              label: "UID",
              isRequired: false,
              description: "\u83B7\u53D6\u65B9\u6CD5\uFF1APC\u6D4F\u89C8\u5668\u6253\u5F00\u67D0\u4E2A\u535A\u4E3B\u4E3B\u9875\uFF0Chttps://www.douyin.com/user/MS4wLj..... \u5176\u4E2D\u7684user/\u540E\u7684\u5373\u4E3AUID"
            }),
            components.input.string("remark", {
              color: "default",
              placeholder: "\u53EF\u4E0D\u586B\uFF0C\u4F1A\u81EA\u52A8\u83B7\u53D6",
              label: "\u6635\u79F0",
              isRequired: false,
              description: "\u535A\u4E3B\u7684\u6296\u97F3\u540D\u79F0"
            }),
            components.divider.create("push:douyin:divider-1", {
              description: "\u8FC7\u6EE4\u7CFB\u7EDF",
              descPosition: 20
            }),
            components.radio.group("filterMode", {
              label: "\u8FC7\u6EE4\u6A21\u5F0F",
              orientation: "horizontal",
              // defaultValue: all.douyin.push.filterMode,
              radio: [
                components.radio.create("push:bilibili:filterMode.radio-1", {
                  label: "\u9ED1\u540D\u5355\u6A21\u5F0F",
                  description: "\u547D\u4E2D\u4EE5\u4E0B\u5185\u5BB9\u65F6\uFF0C\u4E0D\u63A8\u9001",
                  value: "blacklist"
                }),
                components.radio.create("push:bilibili:filterMode.radio-2", {
                  label: "\u767D\u540D\u5355\u6A21\u5F0F",
                  description: "\u547D\u4E2D\u4EE5\u4E0B\u5185\u5BB9\u65F6\uFF0C\u624D\u63A8\u9001",
                  value: "whitelist"
                })
              ]
            }),
            components.input.group("Keywords", {
              label: "\u5173\u952E\u8BCD",
              maxRows: 2,
              itemsPerRow: 4,
              data: [],
              template: components.input.string("push:bilibili:filterKeywords", {
                placeholder: "\u4E25\u7981\u63D0\u4EA4\u7A7A\u503C",
                label: "",
                color: "primary"
              })
            }),
            components.input.group("Tags", {
              label: "\u6807\u7B7E",
              maxRows: 2,
              itemsPerRow: 4,
              data: [],
              template: components.input.string("push:bilibili:filterTags", {
                placeholder: "\u4E25\u7981\u63D0\u4EA4\u7A7A\u503C",
                label: "",
                color: "primary"
              })
            })
          ]
        })
      }
    ),
    components.divider.create("divider-8", {
      description: "B\u7AD9\u63A8\u9001\u5217\u8868\u76F8\u5173",
      descPosition: 20
    }),
    components.accordionPro.create(
      "pushlist:bilibili",
      all.pushlist.bilibili.map((item) => {
        return {
          ...item,
          title: item.remark,
          subtitle: item.host_mid
        };
      }),
      {
        label: "B\u7AD9\u63A8\u9001\u5217\u8868",
        children: components.accordion.createItem("accordion-item-bilibili", {
          className: "ml-4 mr-4",
          children: [
            components.input.number("host_mid", {
              placeholder: "",
              label: "UID",
              rules: void 0,
              description: "B\u7AD9\u7528\u6237\u7684UID\uFF0C\u5FC5\u586B",
              errorMessage: "UID \u4E0D\u80FD\u4E3A\u7A7A Ciallo\uFF5E(\u2220\u30FB\u03C9< )\u2312\u2606"
            }),
            components.input.group("group_id", {
              label: "\u63A8\u9001\u7FA4\u53F7\u548C\u673A\u5668\u4EBA\u8D26\u53F7",
              maxRows: 2,
              data: [],
              template: components.input.string("accordion-item-bilibili:push:bilibili:group_id", {
                placeholder: "\u5FC5\u586B\uFF0C\u4E0D\u80FD\u51FA\u73B0\u7A7A\u503C",
                label: "",
                color: "default",
                description: "\u63A8\u9001\u7FA4\u53F7\u548C\u673A\u5668\u4EBA\u8D26\u53F7\uFF0C\u591A\u4E2A\u5219\u4F7F\u7528\u9017\u53F7\u9694\u5F00\uFF0C\u5FC5\u586B\u3002\u5982\uFF1A\u7FA4\u53F71:\u673A\u5668\u4EBA\u8D26\u53F71",
                errorMessage: "\u4F60\u4E0D\u8BBE\u7F6E\u7FA4\u53F7\u548CBot\u53F7\uFF0C\u6211\u600E\u4E48\u77E5\u9053\u4F60\u8981\u7528\u4EC0\u4E48\u63A8\u9001\u7ED9\u8C01\u5462\uFF1F"
              })
            }),
            components.input.string("remark", {
              color: "default",
              placeholder: "\u53EF\u4E0D\u586B\uFF0C\u4F1A\u81EA\u52A8\u83B7\u53D6",
              label: "\u6635\u79F0",
              isRequired: false,
              description: "UP\u4E3B\u7684\u6635\u79F0"
            }),
            components.radio.group("filterMode", {
              label: "\u8FC7\u6EE4\u6A21\u5F0F",
              orientation: "horizontal",
              // defaultValue: all.bilibili.push.filterMode,
              radio: [
                components.radio.create("push:bilibili:filterMode.radio-1", {
                  label: "\u9ED1\u540D\u5355\u6A21\u5F0F",
                  description: "\u547D\u4E2D\u4EE5\u4E0B\u5185\u5BB9\u65F6\uFF0C\u4E0D\u63A8\u9001",
                  value: "blacklist"
                }),
                components.radio.create("push:bilibili:filterMode.radio-2", {
                  label: "\u767D\u540D\u5355\u6A21\u5F0F",
                  description: "\u547D\u4E2D\u4EE5\u4E0B\u5185\u5BB9\u65F6\uFF0C\u624D\u63A8\u9001",
                  value: "whitelist"
                })
              ]
            }),
            components.input.group("Keywords", {
              label: "\u5173\u952E\u8BCD",
              maxRows: 2,
              itemsPerRow: 4,
              data: [],
              template: components.input.string("push:bilibili:filterKeywords", {
                placeholder: "\u4E25\u7981\u63D0\u4EA4\u7A7A\u503C",
                label: "",
                color: "primary"
              })
            }),
            components.input.group("Tags", {
              label: "\u6807\u7B7E",
              maxRows: 2,
              itemsPerRow: 4,
              data: [],
              template: components.input.string("push:bilibili:filterTags", {
                placeholder: "\u4E25\u7981\u63D0\u4EA4\u7A7A\u503C",
                label: "",
                color: "primary"
              })
            })
          ]
        })
      }
    )
  ],
  /** 前端点击保存之后调用的方法 */
  save: async (config) => {
    const formatCfg = processFrontendData(config);
    const oldAllCfg = await Config.All();
    const mergeCfg = _.mergeWith({}, oldAllCfg, formatCfg, customizer);
    let success = false;
    let isChange = false;
    for (const key of Object.keys(mergeCfg)) {
      isChange = deepEqual(mergeCfg[key], oldAllCfg[key]);
      if (isChange) {
        const modifySuccess = await Config.ModifyPro(key, mergeCfg[key]);
        if (modifySuccess) {
          success = true;
        }
      }
    }
    return {
      mergeCfg,
      formatCfg,
      success,
      message: success ? "\u4FDD\u5B58\u6210\u529F Ciallo\uFF5E(\u2220\u30FB\u03C9< )\u2312\u2606" : "\u914D\u7F6E\u65E0\u53D8\u5316\uFF0C\u65E0\u9700\u4FDD\u5B58"
    };
  }
};
var customizer = (value, srcValue) => {
  if (Array.isArray(srcValue)) {
    return srcValue;
  }
};
var deepEqual = (a, b) => {
  if (a === b) {
    return false;
  }
  if (typeof a === "string" && typeof b === "string") {
    if (a !== b) return true;
  }
  if (typeof a === "number" && typeof b === "number") {
    if (a !== b) return true;
  }
  if (typeof a === "boolean" && typeof b === "boolean") {
    if (a !== b) return true;
  }
  if (a === null || b === null || typeof a !== typeof b) {
    return true;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return true;
    }
    for (let i = 0; i < a.length; i++) {
      if (deepEqual(a[i], b[i])) {
        return true;
      }
    }
  }
  let isChange = false;
  if (typeof a === "object" && typeof b === "object") {
    if (isChange) return true;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
      return true;
    }
    for (const key of keysA) {
      if (!keysB.includes(key)) {
        isChange = true;
        return true;
      }
      if (deepEqual(a[key], b[key])) {
        isChange = true;
        return true;
      }
    }
  }
  return false;
};
function convertToNumber(value) {
  if (/^\d+$/.test(value)) {
    const num = parseInt(value, 10);
    return num;
  } else return value;
}
function getFirstObject(arr) {
  return arr.length > 0 ? arr[0] : {};
}
function processFrontendData(data) {
  const result = {};
  const configKeys = Object.keys(data).filter((key) => {
    return !key.includes("pushlist") && key in data;
  });
  for (const key of configKeys) {
    const value = data[key];
    const firstObj = Array.isArray(value) ? getFirstObject(value) : {};
    result[key] = {};
    for (const prop in firstObj) {
      let value2 = firstObj[prop];
      if (typeof value2 === "string") {
        value2 = convertToNumber(value2);
      }
      if (prop.includes(":")) {
        const [parent, child] = prop.split(":");
        if (!result[key] || typeof result[key] !== "object") {
          result[key] = {};
        }
        if (!result[key][parent] || typeof result[key][parent] !== "object") {
          result[key][parent] = {};
        }
        result[key][parent][child] = value2;
      } else {
        result[key][prop] = value2;
      }
    }
  }
  result.pushlist = {
    douyin: data["pushlist:douyin"] || [],
    bilibili: data["pushlist:bilibili"].map((item) => {
      return {
        ...item,
        host_mid: Number(item.host_mid)
      };
    }) ?? []
  };
  return result;
}

export { web_config_default as default };
