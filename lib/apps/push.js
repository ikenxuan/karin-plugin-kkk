import { a as getDouyinData, g as getBilibiliData, ah as amagi } from "../core_chunk/vendor-ClxefV4m.js";
import karin, { logger } from "node-karin";
import { douyinDBInstance, bilibiliDBInstance } from "../core_chunk/db-BmR8SVQE.js";
import "../root.js";
import "node:fs";
import { C as Config, o as wrapWithErrorHandler, B as Bilibilipush, D as DouYinpush, p as getDouyinID, N as Networks, R as Render, m as Common } from "../core_chunk/main-B5xrTreS.js";
import "node-karin/axios";
const handleDouyinPush = wrapWithErrorHandler(async () => {
  await new DouYinpush().action();
  return true;
}, {
  businessName: "抖音推送任务"
});
const handleBilibiliPush = wrapWithErrorHandler(async () => {
  await new Bilibilipush().action();
  return true;
}, {
  businessName: "B站推送任务"
});
const handleForcePush = wrapWithErrorHandler(async (e) => {
  if (e.msg.includes("抖音")) {
    await new DouYinpush().action();
    return true;
  } else if (e.msg.includes("B站")) {
    await new Bilibilipush().action();
    return true;
  }
  return true;
}, {
  businessName: "强制推送"
});
const handleSetDouyinPush = wrapWithErrorHandler(async (e) => {
  const data = await getDouyinData("搜索数据", Config.cookies.douyin, {
    query: e.msg.replace(/^#设置抖音推送/, ""),
    typeMode: "strict"
  });
  await new DouYinpush(e).setting(data.data);
  return true;
}, {
  businessName: "设置抖音推送"
});
const handleSetBilibiliPush = wrapWithErrorHandler(async (e) => {
  if (!Config.cookies.bilibili) {
    await e.reply("\n请先配置B站Cookie", { at: true });
    return true;
  }
  const match = /^#设置[bB]站推送(?:UID:)?(\d+)$/.exec(e.msg);
  if (match && match[1]) {
    const data = await getBilibiliData("用户主页数据", Config.cookies.bilibili, {
      host_mid: Number(match[1]),
      typeMode: "strict"
    });
    await new Bilibilipush(e).setting(data.data);
  }
  return true;
}, {
  businessName: "设置B站推送"
});
const handleBilibiliPushList = wrapWithErrorHandler(async (e) => {
  await new Bilibilipush(e).renderPushList();
}, {
  businessName: "B站推送列表"
});
const handleDouyinPushList = wrapWithErrorHandler(async (e) => {
  await new DouYinpush(e).renderPushList();
}, {
  businessName: "抖音推送列表"
});
const handleChangeBotID = wrapWithErrorHandler(async (e) => {
  const newBotId = e.msg.replace(/^#kkk设置推送机器人/, "");
  const newDouyinlist = Config.pushlist.douyin.map((item) => {
    const modifiedGroupIds = item.group_id.map((groupId) => {
      const [group_id, oldBotId] = groupId.split(":");
      if (oldBotId && oldBotId !== newBotId) {
        douyinDBInstance.updateGroupBotId(group_id, oldBotId, newBotId).catch((err) => {
          logger.error(`Failed to update douyin group ${group_id}:`, err);
        });
      }
      return `${group_id}:${newBotId}`;
    });
    return {
      ...item,
      group_id: modifiedGroupIds
    };
  });
  const newBilibililist = Config.pushlist.bilibili.map((item) => {
    const modifiedGroupIds = item.group_id.map((groupId) => {
      const [group_id, oldBotId] = groupId.split(":");
      if (oldBotId && oldBotId !== newBotId) {
        bilibiliDBInstance.updateGroupBotId(group_id, oldBotId, newBotId).catch((err) => {
          logger.error(`Failed to update bilibili group ${group_id}:`, err);
        });
      }
      return `${group_id}:${newBotId}`;
    });
    return {
      ...item,
      group_id: modifiedGroupIds
    };
  });
  Config.Modify("pushlist", "douyin", newDouyinlist);
  Config.Modify("pushlist", "bilibili", newBilibililist);
  await e.reply("推送机器人已修改为" + newBotId);
  return true;
}, {
  businessName: "设置推送机器人"
});
const handleTestDouyinPush = wrapWithErrorHandler(async (e) => {
  const url = String(e.msg.match(/(http|https):\/\/.*\.(douyin|iesdouyin)\.com\/[^ ]+/g));
  const iddata = await getDouyinID(e, url);
  const workInfo = await amagi.getDouyinData("聚合解析", { aweme_id: iddata.aweme_id, typeMode: "strict" }, Config.cookies.douyin);
  const userProfile = await amagi.getDouyinData("用户主页数据", { sec_uid: workInfo.data.aweme_detail.author.sec_uid, typeMode: "strict" }, Config.cookies.douyin);
  const realUrl = Config.douyin.push.shareType === "web" && await new Networks({
    url: workInfo.data.aweme_detail.share_url,
    headers: {
      "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive"
    }
  }).getLocation();
  const img = await Render("douyin/dynamic", {
    image_url: iddata.is_mp4 ? workInfo.data.aweme_detail.video.animated_cover?.url_list[0] ?? workInfo.data.aweme_detail.video.cover.url_list[0] : workInfo.data.aweme_detail.images[0].url_list[0],
    desc: workInfo.data.aweme_detail.desc,
    dianzan: Common.count(workInfo.data.aweme_detail.statistics.digg_count),
    pinglun: Common.count(workInfo.data.aweme_detail.statistics.comment_count),
    share: Common.count(workInfo.data.aweme_detail.statistics.share_count),
    shouchang: Common.count(workInfo.data.aweme_detail.statistics.collect_count),
    create_time: Common.convertTimestampToDateTime(workInfo.data.aweme_detail.create_time),
    avater_url: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + userProfile.data.user.avatar_larger.uri,
    share_url: Config.douyin.push.shareType === "web" ? realUrl : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${workInfo.data.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`,
    username: workInfo.data.aweme_detail.author.nickname,
    抖音号: userProfile.data.user.unique_id === "" ? userProfile.data.user.short_id : userProfile.data.user.unique_id,
    粉丝: Common.count(userProfile.data.user.follower_count),
    获赞: Common.count(userProfile.data.user.total_favorited),
    关注: Common.count(userProfile.data.user.following_count),
    cooperation_info: (() => {
      const raw = workInfo.data.aweme_detail.cooperation_info;
      if (!raw) return void 0;
      const rawCreators = Array.isArray(raw.co_creators) ? raw.co_creators : [];
      const author = workInfo.data.aweme_detail.author;
      const authorUid = author?.uid;
      const authorSecUid = author?.sec_uid;
      const authorNickname = author?.nickname;
      const authorInCreators = rawCreators.some(
        (c) => authorUid && c.uid && c.uid === authorUid || authorSecUid && c.sec_uid && c.sec_uid === authorSecUid || authorNickname && c.nickname && c.nickname === authorNickname
      );
      const co_creators = rawCreators.map((c) => {
        const firstUrl = c.avatar_thumb?.url_list?.[0] ?? (c.avatar_thumb?.uri ? `https://p3.douyinpic.com/${c.avatar_thumb.uri}` : void 0);
        return {
          avatar_thumb: firstUrl ? { url_list: [firstUrl] } : void 0,
          nickname: c.nickname,
          role_title: c.role_title
        };
      });
      const baseCount = Math.max(Number(raw.co_creator_nums || 0), co_creators.length);
      const teamCount = baseCount + (authorInCreators ? 0 : 1);
      return {
        co_creator_nums: teamCount,
        co_creators
      };
    })()
  });
  e.reply(img);
  return true;
}, {
  businessName: "测试抖音推送"
});
const douyinPush = Config.douyin.push.switch && karin.task("抖音推送", Config.douyin.push.cron, handleDouyinPush, { log: Config.douyin.push.log });
const bilibiliPush = Config.bilibili.push.switch && karin.task("B站推送", Config.bilibili.push.cron, handleBilibiliPush, { log: Config.bilibili.push.log });
const forcePush = karin.command(/#(抖音|B站)(全部)?强制推送/, handleForcePush, { name: "𝑪𝒊𝒂𝒍𝒍𝒐～(∠・ω< )⌒★", perm: "master", event: "message.group" });
const setdyPush = karin.command(/^#设置抖音推送/, handleSetDouyinPush, { name: "kkk-推送功能-设置", event: "message.group", perm: Config.douyin.push.permission, dsbAdapter: ["qqbot"] });
const setbiliPush = karin.command(/^#设置[bB]站推送(?:[Uu][Ii][Dd]:)?(\d+)$/, handleSetBilibiliPush, { name: "kkk-推送功能-设置", event: "message.group", perm: Config.bilibili.push.permission, dsbAdapter: ["qqbot"] });
const bilibiliPushList = karin.command(/^#?[bB]站推送列表$/, handleBilibiliPushList, { name: "kkk-推送功能-列表", event: "message.group" });
const douyinPushList = karin.command(/^#?抖音推送列表$/, handleDouyinPushList, { name: "kkk-推送功能-列表", event: "message.group" });
const changeBotID = karin.command(/^#kkk设置推送机器人/, handleChangeBotID, { name: "kkk-推送功能-设置", perm: "master" });
const testDouyinPush = karin.command(/^#测试抖音推送\s*(https?:\/\/[^\s]+)?/, handleTestDouyinPush, { name: "kkk-推送功能-测试", event: "message.group", perm: Config.douyin.push.permission, dsbAdapter: ["qqbot"] });
export {
  bilibiliPush,
  bilibiliPushList,
  changeBotID,
  douyinPush,
  douyinPushList,
  forcePush,
  setbiliPush,
  setdyPush,
  testDouyinPush
};
