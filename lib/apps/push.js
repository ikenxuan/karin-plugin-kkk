import { C as Config, e as douyinDB, d as Common, g as getDouyinData, f as getBilibiliData } from "../chunk/douyin-C1kMBq00.js";
import karin$1, { logger, karin, segment, common } from "node-karin";
import "sequelize";
import "../Version.js";
import "node:fs";
import "node-karin/axios";
import "stream/promises";
import "node:path";
import "../chunk/index-B1YBjh1T.js";
import { B as Base, c as cleanOldDynamicCache, g as getDouyinID, N as Networks, p as processVideos, a as Bilibilipush } from "../chunk/getID-CVwHsrlV.js";
import "../chunk/index-BDlGFCbK.js";
import "node:child_process";
import "playwright";
import { R as Render } from "../chunk/Render-CU130B-b.js";
class DouYinpush extends Base {
  force = false;
  /**
   *
   * @param e  事件Message
   * @param force 是否强制推送
   * @default false
   * @returns
   */
  constructor(e = {}, force = false) {
    super(e);
    if (this.botadapter === "QQBot") {
      e.reply("不支持QQBot，请使用其他适配器");
      return;
    }
    this.headers.Referer = "https://www.douyin.com";
    this.headers.Cookie = Config.cookies.douyin;
    this.force = force;
  }
  async action() {
    try {
      await this.syncConfigToDatabase();
      const deletedCount = await cleanOldDynamicCache("douyin", 1);
      if (deletedCount > 0) {
        logger.info(`已清理 ${deletedCount} 条过期的抖音动态缓存记录`);
      }
      if (await this.checkremark()) return true;
      const data = await this.getDynamicList(Config.pushlist.douyin);
      if (Object.keys(data).length === 0) return true;
      if (this.force) return await this.forcepush(data);
      else return await this.getdata(data);
    } catch (error) {
      logger.error(error);
    }
  }
  /**
   * 同步配置文件中的订阅信息到数据库
   */
  async syncConfigToDatabase() {
    if (!Config.pushlist.douyin || Config.pushlist.douyin.length === 0) {
      return;
    }
    await douyinDB.syncConfigSubscriptions(Config.pushlist.douyin);
  }
  async getdata(data) {
    if (Object.keys(data).length === 0) return true;
    for (const awemeId in data) {
      const pushItem = data[awemeId];
      const Detail_Data = pushItem.Detail_Data;
      const skip = await skipDynamic(pushItem);
      let img = [];
      let iddata = { is_mp4: true, type: "one_work" };
      if (!skip) {
        iddata = await getDouyinID(Detail_Data.share_url ?? "https://live.douyin.com/" + Detail_Data.room_data?.owner.web_rid, false);
      }
      if (!skip) {
        if (pushItem.living && "room_data" in pushItem.Detail_Data) {
          img = await Render("douyin/live", {
            image_url: [{ image_src: Detail_Data.live_data.data.data[0].cover.url_list[0] }],
            text: Detail_Data.live_data.data.data[0].title,
            liveinf: `${Detail_Data.live_data.data.partition_road_map?.partition?.title ?? Detail_Data.live_data.data.data[0].title} | 房间号: ${Detail_Data.room_data.owner.web_rid}`,
            在线观众: this.count(Detail_Data.live_data.data.data[0].room_view_stats.display_value),
            总观看次数: this.count(Detail_Data.live_data.data.data[0].stats.total_user_str),
            username: Detail_Data.user_info.user.nickname,
            avater_url: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + Detail_Data.user_info.user.avatar_larger.uri,
            fans: this.count(Detail_Data.user_info.user.follower_count),
            create_time: Common.convertTimestampToDateTime(Date.now() / 1e3),
            now_time: Common.convertTimestampToDateTime(Date.now() / 1e3),
            share_url: "https://live.douyin.com/" + Detail_Data.room_data.owner.web_rid,
            dynamicTYPE: "直播动态推送"
          });
        } else {
          const realUrl = Config.douyin.push.shareType === "web" && await new Networks({
            url: Detail_Data.share_url,
            headers: {
              "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
            }
          }).getLongLink();
          img = await Render("douyin/dynamic", {
            image_url: iddata.is_mp4 ? Detail_Data.video.animated_cover?.url_list[0] ?? Detail_Data.video.cover.url_list[0] : Detail_Data.images[0].url_list[0],
            desc: this.desc(Detail_Data, Detail_Data.desc),
            dianzan: this.count(Detail_Data.statistics.digg_count),
            pinglun: this.count(Detail_Data.statistics.comment_count),
            share: this.count(Detail_Data.statistics.share_count),
            shouchang: this.count(Detail_Data.statistics.collect_count),
            create_time: Common.convertTimestampToDateTime(pushItem.create_time / 1e3),
            avater_url: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + Detail_Data.user_info.user.avatar_larger.uri,
            share_url: Config.douyin.push.shareType === "web" ? realUrl : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`,
            username: Detail_Data.author.nickname,
            抖音号: Detail_Data.user_info.user.unique_id === "" ? Detail_Data.user_info.user.short_id : Detail_Data.user_info.user.unique_id,
            粉丝: this.count(Detail_Data.user_info.user.follower_count),
            获赞: this.count(Detail_Data.user_info.user.total_favorited),
            关注: this.count(Detail_Data.user_info.user.following_count)
          });
        }
      }
      for (const target of pushItem.targets) {
        try {
          if (skip) continue;
          const { groupId, botId } = target;
          let status = { message_id: "" };
          const bot = karin.getBot(botId);
          status = await karin.sendMsg(botId, karin.contactGroup(groupId), img ? [...img] : []);
          if (pushItem.living && "room_data" in pushItem.Detail_Data && status.message_id) {
            await douyinDB.updateLiveStatus(pushItem.sec_uid, true);
          }
          if (!pushItem.living && status.message_id) {
            await douyinDB.addAwemeCache(awemeId, pushItem.sec_uid, groupId);
          }
          if (Config.douyin.push.parsedynamic && status.message_id) {
            if (iddata.is_mp4) {
              try {
                let downloadUrl = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`;
                if (Config.douyin.autoResolution) {
                  logger.debug(`开始排除不符合条件的视频分辨率；

                    共拥有${logger.yellow(Detail_Data.video.bit_rate.length)}个视频源

                    视频ID：${logger.green(Detail_Data.VideoData.aweme_detail.aweme_id)}

                    分享链接：${logger.green(Detail_Data.VideoData.aweme_detail.share_url)}
                    `);
                  const videoObj = processVideos(Detail_Data.video.bit_rate, Config.upload.filelimit);
                  downloadUrl = await new Networks({
                    url: videoObj[0].play_addr.url_list[2],
                    headers: this.headers
                  }).getLongLink();
                } else {
                  downloadUrl = await new Networks({
                    url: Detail_Data.video.bit_rate[0].play_addr.url_list[2] ?? Detail_Data.video.play_addr_h264.url_list[2] ?? Detail_Data.video.play_addr_h264.url_list[2],
                    headers: this.headers
                  }).getLongLink();
                }
                await this.DownLoadVideo({
                  video_url: downloadUrl,
                  title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${Detail_Data.desc}.mp4` }
                }, { active: true, activeOption: { uin: botId, group_id: groupId } });
              } catch (error) {
                logger.error(error);
              }
            } else if (!iddata.is_mp4 && iddata.type === "one_work") {
              const imageres = [];
              let image_url;
              for (const item of Detail_Data.images) {
                image_url = item.url_list[2] ?? item.url_list[1];
                imageres.push(segment.image(image_url));
              }
              const forwardMsg = common.makeForward(imageres, botId, bot.account.name);
              await bot.sendForwardMsg(karin.contactFriend(botId), forwardMsg);
            }
          }
        } catch (error) {
          logger.error(error);
        }
      }
    }
    return true;
  }
  /**
   * 根据配置文件获取用户当天的动态列表。
   * @returns 将要推送的列表
   */
  async getDynamicList(userList) {
    const willbepushlist = {};
    try {
      for (const item of userList) {
        const sec_uid = item.sec_uid;
        const videolist = await getDouyinData("用户主页视频列表数据", Config.cookies.douyin, { sec_uid });
        const userinfo = await getDouyinData("用户主页数据", Config.cookies.douyin, { sec_uid });
        const subscriptions = await douyinDB.getUserSubscribedGroups(sec_uid);
        const targets = [];
        for (const sub of subscriptions) {
          const groupId = sub.get("groupId");
          const groupModel = await douyinDB.getGroupById(groupId);
          if (groupModel) {
            const botId = groupModel.get("botId");
            targets.push({ groupId, botId });
          }
        }
        if (targets.length === 0) continue;
        if (videolist.aweme_list.length > 0) {
          for (const aweme of videolist.aweme_list) {
            const now = Date.now();
            const createTime = aweme.create_time * 1e3;
            const timeDifference = now - createTime;
            const is_top = aweme.is_top === 1;
            let shouldPush = false;
            logger.debug(`前期获取该动态基本信息：
动态ID：${aweme.aweme_id}
发布时间：${Common.convertTimestampToDateTime(aweme.create_time)}
发布时间戳（s）：${aweme.create_time}
时间差（ms）：${timeDifference}
是否置顶：${is_top}
是否处于开播：${userinfo.user.live_status === 1 ? logger.green("true") : logger.red("false")}是否在一天内：${timeDifference < 864e5 ? logger.green("true") : logger.red("false")}`);
            if (is_top && timeDifference < 864e5 || timeDifference < 864e5 && !is_top) {
              const alreadyPushed = await this.checkIfAlreadyPushed(aweme.aweme_id, sec_uid, targets.map((t) => t.groupId));
              if (!alreadyPushed) {
                shouldPush = true;
              }
            }
            if (shouldPush) {
              willbepushlist[aweme.aweme_id] = {
                remark: item.remark,
                sec_uid,
                create_time: aweme.create_time * 1e3,
                targets,
                Detail_Data: {
                  ...aweme,
                  user_info: userinfo
                },
                avatar_img: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + userinfo.user.avatar_larger.uri,
                living: false
              };
            }
          }
        }
        const liveStatus = await douyinDB.getLiveStatus(sec_uid);
        if (userinfo.user.live_status === 1) {
          const liveInfo = await getDouyinData("直播间信息数据", Config.cookies.douyin, { sec_uid: userinfo.user.sec_uid });
          if (!liveStatus.living) {
            willbepushlist[`live_${sec_uid}`] = {
              remark: item.remark,
              sec_uid,
              create_time: Date.now(),
              targets,
              Detail_Data: {
                user_info: userinfo,
                room_data: JSON.parse(userinfo.user.room_data),
                live_data: liveInfo,
                liveStatus: {
                  liveStatus: "open",
                  isChanged: true,
                  isliving: true
                }
              },
              avatar_img: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + userinfo.user.avatar_larger.uri,
              living: true
            };
          }
        } else if (liveStatus.living) {
          await douyinDB.updateLiveStatus(sec_uid, false);
          logger.info(`用户 ${item.remark ?? sec_uid} 已关播，更新直播状态`);
        }
      }
    } catch (error) {
      logger.error("获取抖音动态列表失败:", error);
    }
    return willbepushlist;
  }
  /**
  * 检查作品是否已经推送过
  * @param aweme_id 作品ID
  * @param sec_uid 用户sec_uid
  * @param groupIds 群组ID列表
  * @returns 是否已经推送过
  */
  async checkIfAlreadyPushed(aweme_id, sec_uid, groupIds) {
    for (const groupId of groupIds) {
      const isPushed = await douyinDB.isAwemePushed(aweme_id, sec_uid, groupId);
      if (!isPushed) {
        return false;
      }
    }
    return true;
  }
  /**
   * 设置或更新特定 sec_uid 的群组信息。
   * @param data 抖音的搜索结果数据。需要接口返回的原始数据
   * @returns 操作成功或失败的消息字符串。
   */
  async setting(data) {
    const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
    const config = Config.pushlist;
    const groupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
    const botId = this.e.selfId;
    try {
      let index = 0;
      while (data.data[index].card_unique_name !== "user") {
        index++;
      }
      const sec_uid = data.data[index].user_list[0].user_info.sec_uid;
      const UserInfoData = await getDouyinData("用户主页数据", Config.cookies.douyin, { sec_uid });
      let user_shortid;
      UserInfoData.user.unique_id === "" ? user_shortid = UserInfoData.user.short_id : user_shortid = UserInfoData.user.unique_id;
      config.douyin ??= [];
      const existingItem = config.douyin.find((item) => item.sec_uid === sec_uid);
      const isSubscribed = await douyinDB.isSubscribed(sec_uid, groupId);
      if (existingItem) {
        let has = false;
        let groupIndexToRemove = -1;
        for (let index2 = 0; index2 < existingItem.group_id.length; index2++) {
          const item = existingItem.group_id[index2];
          const existingGroupId = item.split(":")[0];
          if (existingGroupId === String(groupId)) {
            has = true;
            groupIndexToRemove = index2;
            break;
          }
        }
        if (has) {
          existingItem.group_id.splice(groupIndexToRemove, 1);
          if (isSubscribed) {
            await douyinDB.unsubscribeDouyinUser(groupId, sec_uid);
          }
          logger.info(`
删除成功！${UserInfoData.user.nickname}
抖音号：${user_shortid}
sec_uid${UserInfoData.user.sec_uid}`);
          await this.e.reply(`群：${groupInfo.groupName}(${groupId})
删除成功！${UserInfoData.user.nickname}
抖音号：${user_shortid}`);
          if (existingItem.group_id.length === 0) {
            const index2 = config.douyin.indexOf(existingItem);
            config.douyin.splice(index2, 1);
          }
        } else {
          existingItem.group_id.push(`${groupId}:${botId}`);
          if (!isSubscribed) {
            await douyinDB.subscribeDouyinUser(groupId, botId, sec_uid, user_shortid, UserInfoData.user.nickname);
          }
          await this.e.reply(`群：${groupInfo.groupName}(${groupId})
添加成功！${UserInfoData.user.nickname}
抖音号：${user_shortid}`);
          if (Config.douyin.push.switch === false) await this.e.reply("请发送「#kkk设置抖音推送开启」以进行推送");
          logger.info(`
设置成功！${UserInfoData.user.nickname}
抖音号：${user_shortid}
sec_uid${UserInfoData.user.sec_uid}`);
        }
      } else {
        config.douyin.push({
          sec_uid,
          group_id: [`${groupId}:${botId}`],
          remark: UserInfoData.user.nickname,
          short_id: user_shortid
        });
        if (!isSubscribed) {
          await douyinDB.subscribeDouyinUser(groupId, botId, sec_uid, user_shortid, UserInfoData.user.nickname);
        }
        await this.e.reply(`群：${groupInfo.groupName}(${groupId})
添加成功！${UserInfoData.user.nickname}
抖音号：${user_shortid}`);
        if (Config.douyin.push.switch === false) await this.e.reply("请发送「#kkk设置抖音推送开启」以进行推送");
        logger.info(`
设置成功！${UserInfoData.user.nickname}
抖音号：${user_shortid}
sec_uid${UserInfoData.user.sec_uid}`);
      }
      Config.Modify("pushlist", "douyin", config.douyin);
      await this.renderPushList();
    } catch (error) {
      logger.error(error);
      await this.e.reply("设置失败，请查看日志");
    }
  }
  /** 渲染推送列表图片 */
  async renderPushList() {
    await this.syncConfigToDatabase();
    const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
    if (Config.pushlist.douyin.length === 0) {
      await this.e.reply(`当前群：${groupInfo.groupName}(${groupInfo.groupId})
没有设置任何抖音博主推送！
可使用「#设置抖音推送 + 抖音号」进行设置`);
      return;
    }
    const renderOpt = [];
    for (const item of Config.pushlist.douyin) {
      const userInfo = await getDouyinData("用户主页数据", Config.cookies.douyin, { sec_uid: item.sec_uid });
      renderOpt.push({
        avatar_img: userInfo.user.avatar_larger.url_list[0],
        username: userInfo.user.nickname,
        short_id: userInfo.user.unique_id === "" ? userInfo.user.short_id : userInfo.user.unique_id,
        fans: this.count(userInfo.user.follower_count),
        total_favorited: this.count(userInfo.user.total_favorited),
        following_count: this.count(userInfo.user.following_count)
      });
    }
    const img = await Render("douyin/userlist", { renderOpt });
    await this.e.reply(img);
  }
  /**
  * 强制推送
  * @param data 处理完成的推送列表
  */
  async forcepush(data) {
    const currentGroupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
    const currentBotId = this.e.selfId;
    if (!this.e.msg.includes("全部")) {
      const subscriptions = await douyinDB.getGroupSubscriptions(currentGroupId);
      const subscribedUids = subscriptions.map((sub) => sub.get("sec_uid"));
      const filteredData = {};
      for (const awemeId in data) {
        if (subscribedUids.includes(data[awemeId].sec_uid)) {
          filteredData[awemeId] = {
            ...data[awemeId],
            targets: [{
              groupId: currentGroupId,
              botId: currentBotId
            }]
          };
        }
      }
      await this.getdata(filteredData);
    } else {
      await this.getdata(data);
    }
  }
  /**
  * 检查并更新备注信息
  */
  async checkremark() {
    const config = Config.pushlist;
    const updateList = [];
    if (Config.pushlist.douyin === null || Config.pushlist.douyin.length === 0) return true;
    for (const i of Config.pushlist.douyin) {
      const remark = i.remark;
      const sec_uid = i.sec_uid;
      if (remark === void 0 || remark === "") {
        updateList.push({ sec_uid });
      }
    }
    if (updateList.length > 0) {
      for (const i of updateList) {
        const userinfo = await getDouyinData("用户主页数据", Config.cookies.douyin, { sec_uid: i.sec_uid });
        const remark = userinfo.user.nickname;
        const matchingItemIndex = config.douyin.findIndex((item) => item.sec_uid === i.sec_uid);
        if (matchingItemIndex !== -1) {
          config.douyin[matchingItemIndex].remark = remark;
        }
      }
      Config.Modify("pushlist", "douyin", config.douyin);
    }
    return false;
  }
  /**
  * 处理动态描述
  */
  desc(Detail_Data, desc) {
    if (desc === "") {
      return "该动态没有描述";
    }
    return desc;
  }
  /**
  * 格式化数字
  */
  count(num) {
    if (num > 1e4) {
      return (num / 1e4).toFixed(1) + "万";
    }
    return num.toString();
  }
}
const skipDynamic = async (PushItem) => {
  if ("liveStatus" in PushItem.Detail_Data) {
    return false;
  }
  PushItem.Detail_Data.desc ?? "";
  const tags = [];
  if (PushItem.Detail_Data.text_extra) {
    for (const item of PushItem.Detail_Data.text_extra) {
      if (item.hashtag_name) {
        tags.push(item.hashtag_name);
      }
    }
  }
  const shouldFilter = await douyinDB.shouldFilter(PushItem, tags);
  return shouldFilter;
};
const douyinPush = Config.douyin.push.switch && karin$1.task("抖音推送", Config.douyin.push.cron, async () => {
  await new DouYinpush().action();
  return true;
}, { log: Config.douyin.push.log });
const bilibiliPush = Config.bilibili.push.switch && karin$1.task("B站推送", Config.bilibili.push.cron, async () => {
  await new Bilibilipush().action();
  return true;
}, { log: Config.bilibili.push.log });
const forcePush = karin$1.command(/#(抖音|B站)(全部)?强制推送/, async (e) => {
  if (e.msg.includes("抖音")) {
    await new DouYinpush(e, true).action();
    return true;
  } else if (e.msg.includes("B站")) {
    await new Bilibilipush(e, true).action();
    return true;
  }
  return true;
}, { name: "𝑪𝒊𝒂𝒍𝒍𝒐～(∠・ω< )⌒★", perm: "master", event: "message.group" });
const setdyPush = karin$1.command(/^#设置抖音推送/, async (e) => {
  const data = await getDouyinData("搜索数据", Config.cookies.douyin, { query: e.msg.replace(/^#设置抖音推送/, "") });
  await new DouYinpush(e).setting(data);
  return true;
}, { name: "kkk-推送功能-设置", event: "message.group", perm: Config.douyin.push.permission, dsbAdapter: ["qqbot"] });
const setbiliPush = karin$1.command(/^#设置[bB]站推送(?:[Uu][Ii][Dd]:)?(\d+)$/, async (e) => {
  if (!Config.cookies.bilibili) {
    await e.reply("\n请先配置B站Cookie", { at: true });
    return true;
  }
  const match = /^#设置[bB]站推送(?:UID:)?(\d+)$/.exec(e.msg);
  if (match && match[1]) {
    const data = await getBilibiliData("用户主页数据", Config.cookies.bilibili, { host_mid: Number(match[1]) });
    await new Bilibilipush(e).setting(data);
  }
  return true;
}, { name: "kkk-推送功能-设置", event: "message.group", perm: Config.bilibili.push.permission, dsbAdapter: ["qqbot"] });
const bilibiliPushList = karin$1.command(/^#?[bB]站推送列表$/, async (e) => {
  await new Bilibilipush(e).renderPushList();
}, { name: "kkk-推送功能-列表", event: "message.group" });
const douyinPushList = karin$1.command(/^#?抖音推送列表$/, async (e) => {
  await new DouYinpush(e).renderPushList();
}, { name: "kkk-推送功能-列表", event: "message.group" });
const changeBotID = karin$1.command(/^#kkk设置推送机器人/, async (e) => {
  const newDouyinlist = Config.pushlist.douyin.map((item) => {
    const modifiedGroupIds = item.group_id.map((groupId) => {
      const [group_id, uin] = groupId.split(":");
      return `${group_id}:${e.msg.replace(/^#kkk设置推送机器人/, "")}`;
    });
    return {
      ...item,
      group_id: modifiedGroupIds
    };
  });
  const newBilibililist = Config.pushlist.bilibili.map((item) => {
    const modifiedGroupIds = item.group_id.map((groupId) => {
      const [group_id, uin] = groupId.split(":");
      return `${group_id}:${e.msg.replace(/^#kkk设置推送机器人/, "")}`;
    });
    return {
      ...item,
      group_id: modifiedGroupIds
    };
  });
  Config.Modify("pushlist", "douyin", newDouyinlist);
  Config.Modify("pushlist", "bilibili", newBilibililist);
  await e.reply("推送机器人已修改为" + e.msg.replace(/^#kkk设置推送机器人/, ""));
  return true;
}, { name: "kkk-推送功能-设置", perm: "master" });
export {
  bilibiliPush,
  bilibiliPushList,
  changeBotID,
  douyinPush,
  douyinPushList,
  forcePush,
  setbiliPush,
  setdyPush
};
