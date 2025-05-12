import karin, { logger } from "node-karin";
import "sequelize";
import { N as Networks, a as Config, e as Client, i as Base, R as Render, j as downloadVideo, k as Bilibili, C as Common } from "../chunk/index-DTQeTO4l.js";
import "../Version.js";
import "node:fs";
import "node-karin/axios";
import "stream/promises";
import "node:path";
import { g as getDouyinID, a as DouYin } from "../chunk/push-BRW5enQU.js";
import "node:child_process";
import "playwright";
async function getBilibiliID(url) {
  const longLink = await new Networks({ url }).getLongLink();
  let result = {};
  let pValue;
  const parsedUrl = new URL(longLink);
  const pParam = parsedUrl.searchParams.get("p");
  if (pParam) {
    pValue = parseInt(pParam, 10);
    if (isNaN(pValue)) {
      pValue = void 0;
    }
  }
  switch (true) {
    case /(video\/|video\-)([A-Za-z0-9]+)/.test(longLink): {
      const bvideoMatch = /video\/([A-Za-z0-9]+)|bvid=([A-Za-z0-9]+)/.exec(longLink);
      const parsedUrl2 = new URL(longLink);
      parsedUrl2.searchParams.get("p");
      result = {
        type: "one_video",
        bvid: bvideoMatch ? bvideoMatch[1] || bvideoMatch[2] : void 0,
        ...pValue !== void 0 && { p: pValue }
      };
      break;
    }
    case /festival\/([A-Za-z0-9]+)/.test(longLink): {
      const festivalMatch = /festival\/([A-Za-z0-9]+)\?bvid=([A-Za-z0-9]+)/.exec(longLink);
      result = {
        type: "one_video",
        id: festivalMatch ? festivalMatch[2] : void 0
      };
      break;
    }
    case /play\/(\S+?)\??/.test(longLink): {
      const playMatch = /play\/(\w+)/.exec(longLink);
      const id = playMatch ? playMatch[1] : "";
      let isEpid = false;
      if (id.startsWith("ss")) ;
      else if (id.startsWith("ep")) ;
      result = {
        type: "bangumi_video_info",
        isEpid,
        realid: playMatch ? playMatch[1] : ""
      };
      break;
    }
    case (/^https:\/\/t\.bilibili\.com\/(\d+)/.test(longLink) || /^https:\/\/www\.bilibili\.com\/opus\/(\d+)/.test(longLink)): {
      const tMatch = /^https:\/\/t\.bilibili\.com\/(\d+)/.exec(longLink);
      const opusMatch = /^https:\/\/www\.bilibili\.com\/opus\/(\d+)/.exec(longLink);
      const dynamic_id = tMatch ?? opusMatch;
      result = {
        type: "dynamic_info",
        dynamic_id: dynamic_id ? dynamic_id[1] : dynamic_id
      };
      break;
    }
    case longLink.includes("live.bilibili.com"): {
      const match = /https?:\/\/live\.bilibili\.com\/(\d+)/.exec(longLink);
      result = {
        type: "live_room_detail",
        room_id: match ? match[1] : void 0
      };
      break;
    }
    default:
      logger.warn("无法获取作品ID");
      break;
  }
  return result;
}
async function kuaishouComments(data, emojidata) {
  let jsonArray = [];
  for (const i of data.data.visionCommentList.rootComments) {
    const cid = i.commentId;
    const aweme_id = i.commentId;
    const nickname = i.authorName;
    const userimageurl = i.headurl;
    const text = i.content;
    const time = getRelativeTimeFromTimestamp(i.timestamp);
    const digg_count = Number(i.likedCount);
    const commentObj = {
      cid,
      aweme_id,
      nickname,
      userimageurl,
      text,
      digg_count,
      create_time: time
    };
    jsonArray.push(commentObj);
  }
  jsonArray.sort((a, b) => b.digg_count - a.digg_count);
  jsonArray = br(jsonArray);
  jsonArray = await handling_at(jsonArray);
  for (const i of jsonArray) {
    if (i.digg_count > 1e4) {
      i.digg_count = (i.digg_count / 1e4).toFixed(1) + "w";
    }
  }
  for (const item1 of jsonArray) {
    for (const item2 of emojidata) {
      if (item1.text.includes(item2.name)) {
        if (item1.text.includes("[") && item1.text.includes("]")) {
          item1.text = item1.text.replace(/\[[^\]]*\]/g, `<img src="${item2.url}"/>`).replace(/\\/g, "");
        } else {
          item1.text = `<img src="${item2.url}"/>`;
        }
        item1.text += "&#160";
      }
    }
  }
  return jsonArray.slice(0, Math.min(jsonArray.length, Config.kuaishou.numcomment));
}
function getRelativeTimeFromTimestamp(timestamp) {
  const timestampInSeconds = Math.floor(timestamp / 1e3);
  const now = Math.floor(Date.now() / 1e3);
  const differenceInSeconds = now - timestampInSeconds;
  if (differenceInSeconds < 30) {
    return "刚刚";
  } else if (differenceInSeconds < 60) {
    return differenceInSeconds + "秒前";
  } else if (differenceInSeconds < 3600) {
    return Math.floor(differenceInSeconds / 60) + "分钟前";
  } else if (differenceInSeconds < 86400) {
    return Math.floor(differenceInSeconds / 3600) + "小时前";
  } else if (differenceInSeconds < 2592e3) {
    return Math.floor(differenceInSeconds / 86400) + "天前";
  } else if (differenceInSeconds < 7776e3) {
    return Math.floor(differenceInSeconds / 2592e3) + "个月前";
  } else {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return year + "-" + month + "-" + day;
  }
}
function br(data) {
  for (const i of data) {
    let text = i.text;
    text = text.replace(/\n/g, "<br>");
    i.text = text;
  }
  return data;
}
function handling_at(data) {
  for (const i of data) {
    let text = i.text;
    text = text.replace(/(@[\S\s]+?)\(\w+\)/g, (match, p1) => {
      return `<span style="color: rgb(3,72,141);">${p1.trim()}</span>`;
    });
    i.text = text;
  }
  return data;
}
async function fetchKuaishouData(type, opt) {
  const client = new Client({ kuaishou: Config.cookies.kuaishou });
  switch (type) {
    case "one_work": {
      const VideoData = await client.getKuaishouData("单个视频作品数据", {
        photoId: opt.photoId
      });
      const CommentsData = await client.getKuaishouData("评论数据", {
        photoId: opt.photoId
      });
      const EmojiData = await client.getKuaishouData("Emoji数据");
      return { VideoData, CommentsData, EmojiData };
    }
    case "work_comments": {
      const CommentsData = await client.getKuaishouData("评论数据", {
        photoId: opt.photoId
      });
      return CommentsData;
    }
    case "emoji_list": {
      const EmojiData = await client.getKuaishouData("Emoji数据");
      return EmojiData;
    }
  }
}
async function getKuaishouID(url, log = true) {
  const longLink = await new Networks({ url }).getLongLink();
  let result = {};
  switch (true) {
    case /photoId=(.*)/.test(longLink): {
      const workid = /photoId=([^&]+)/.exec(longLink);
      result = {
        type: "one_work",
        photoId: workid ? workid[1] : void 0
      };
      break;
    }
    default: {
      logger.warn("无法获取作品ID");
      break;
    }
  }
  log && console.log(result);
  return result;
}
class Kuaishou extends Base {
  e;
  type;
  is_mp4;
  constructor(e, iddata) {
    super(e);
    this.e = e;
    this.type = iddata?.type;
  }
  async RESOURCES(data) {
    Config.app.EmojiReply && await this.e.bot.setMsgReaction(this.e.contact, this.e.messageId, Config.app.EmojiReplyID, true);
    if (data.VideoData.data.visionVideoDetail.status !== 1) {
      await this.e.reply("不支持解析的视频");
      return true;
    }
    Config.kuaishou.kuaishoutip && await this.e.reply("检测到快手链接，开始解析");
    const video_url = data.VideoData.data.visionVideoDetail.photo.photoUrl;
    const transformedData = Object.entries(data.EmojiData.data.visionBaseEmoticons.iconUrls).map(([name, path]) => {
      return { name, url: `https:${path}` };
    });
    const CommentsData = await kuaishouComments(data.CommentsData, transformedData);
    const fileHeaders = await new Networks({ url: video_url, headers: this.headers }).getHeaders();
    const fileSizeContent = fileHeaders["content-range"]?.match(/\/(\d+)/) ? parseInt(fileHeaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0;
    const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2);
    const img = await Render("kuaishou/comment", {
      Type: "视频",
      viewCount: data.VideoData.data.visionVideoDetail.photo.viewCount,
      CommentsData,
      CommentLength: String(CommentsData?.length ?? 0),
      share_url: video_url,
      VideoSize: fileSizeInMB,
      likeCount: data.VideoData.data.visionVideoDetail.photo.likeCount
    });
    await this.e.reply(img);
    await downloadVideo(this.e, { video_url, title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${data.VideoData.data.visionVideoDetail.photo.caption}.mp4` } });
    return true;
  }
}
const reg = {
  douyin: new RegExp("^.*((www|v|jx|m)\\.(douyin|iesdouyin)\\.com|douyin\\.com\\/(video|note)).*"),
  bilibili: new RegExp(/(bilibili.com|b23.tv|t.bilibili.com|bili2233.cn|BV[a-zA-Z0-9]{10,})/),
  kuaishou: new RegExp("^((.*)快手(.*)快手(.*)|(.*)v.kuaishou(.*))$")
};
const douyin = karin.command(reg.douyin, async (e) => {
  const url = String(e.msg.match(/(http|https):\/\/.*\.(douyin|iesdouyin)\.com\/[^ ]+/g));
  const iddata = await getDouyinID(url);
  await new DouYin(e, iddata).RESOURCES(iddata);
  return true;
}, { name: "kkk-视频功能-抖音", priority: Config.app.defaulttool ? -Infinity : 800 });
const bilibili = karin.command(reg.bilibili, async (e) => {
  e.msg = e.msg.replace(/\\/g, "");
  const urlRegex = /(https?:\/\/(?:www\.bilibili\.com|m\.bilibili\.com|t\.bilibili\.com|b23\.tv|bili2233\.cn)\/[a-zA-Z0-9_\-\.~:\/\?#\[\]@!$&'\(\)\*\+,;=]+)/;
  const bvRegex = /^BV[1-9a-zA-Z]{10}$/;
  let url = null;
  const urlMatch = e.msg.match(urlRegex);
  if (urlMatch) {
    url = urlMatch[0];
  } else if (bvRegex.test(e.msg)) {
    url = `https://www.bilibili.com/video/${e.msg}`;
  }
  if (!url) {
    logger.warn(`未能在消息中找到有效的B站分享链接或BV号: ${e.msg}`);
    return true;
  }
  const iddata = await getBilibiliID(url);
  await new Bilibili(e, iddata).RESOURCES(iddata);
  return true;
}, { name: "kkk-视频功能-B站", priority: Config.app.defaulttool ? -Infinity : 800 });
const kuaishou = karin.command(reg.kuaishou, async (e) => {
  const iddata = await getKuaishouID(String(e.msg.replaceAll("\\", "").match(/https:\/\/v\.kuaishou\.com\/\w+/g)));
  const WorkData = await fetchKuaishouData(iddata.type, iddata);
  await new Kuaishou(e, iddata).RESOURCES(WorkData);
}, { name: "kkk-视频功能-快手", priority: Config.app.defaulttool ? -Infinity : 800 });
const prefix = karin.command(/^#?(解析|kkk解析)/, async (e, next) => {
  e.msg = await Common.getReplyMessage(e);
  if (reg.douyin.test(e.msg)) {
    return await douyin.fnc(e, next);
  } else if (reg.bilibili.test(e.msg)) {
    return await bilibili.fnc(e, next);
  } else if (reg.kuaishou.test(e.msg)) {
    return await kuaishou.fnc(e, next);
  }
}, { name: "kkk-视频功能-引用解析" });
const douyinAPP = Config.douyin.switch && douyin;
const bilibiliAPP = Config.bilibili.switch && bilibili;
const kuaishouAPP = Config.kuaishou.switch && kuaishou;
export {
  bilibiliAPP,
  douyinAPP,
  kuaishouAPP,
  prefix
};
