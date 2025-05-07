import fs from "node:fs";
import { h as getDouyinData, a as Config, C as Common, N as Networks, B as Base, i as index_default, R as Render, n as browserExports, o as mergeFile } from "./index-Bx_2eFfg.js";
import { m as markdown } from "./index-BDlGFCbK.js";
import { logger, segment, render, common, mkdirSync } from "node-karin";
import { Version } from "../Version.js";
import { h as heicConvertExports } from "./index-Dh6M_wtZ.js";
import "node:path";
import "sequelize";
import "node:child_process";
import "playwright";
async function douyinComments(data, emojidata) {
  let jsonArray = [];
  if (data.comments === null) return [];
  for (let i = 0; i < data.comments.length; i++) {
    const cid = data.comments[i].cid;
    const aweme_id = data.comments[i].aweme_id;
    const nickname = data.comments[i].user.nickname;
    const userimageurl = data.comments[i].user.avatar_thumb.url_list[0];
    const text = data.comments[i].text;
    const ip = data.comments[i].ip_label ?? "未知";
    const time = data.comments[i].create_time;
    const label_type = data.comments[i].label_type ?? -1;
    const sticker = data.comments[i].sticker ? data.comments[i].sticker.animate_url.url_list[0] : null;
    const digg_count = data.comments[i].digg_count;
    const imageurl = data.comments[i].image_list && data.comments[i].image_list[0] && data.comments[i].image_list[0].origin_url && data.comments[i].image_list[0].origin_url.url_list ? data.comments[i].image_list[0].origin_url.url_list[0] : null;
    const status_label = data.comments[i].label_list ? data.comments[i].label_list[0].text : null;
    const userintextlongid = data.comments[i].text_extra && data.comments[i].text_extra[0] && data.comments[i].text_extra[0].sec_uid ? data.comments[i].text_extra[0].sec_uid && data.comments[i].text_extra.map((extra) => extra.sec_uid) : null;
    const search_text2 = data.comments[i].text_extra && data.comments[i].text_extra[0] && data.comments[i].text_extra[0].search_text ? data.comments[i].text_extra[0].search_text && data.comments[i].text_extra.map((extra) => ({
      search_text: extra.search_text,
      search_query_id: extra.search_query_id
    })) : null;
    const relativeTime = getRelativeTimeFromTimestamp(time);
    const reply_comment_total = data.comments[i].reply_comment_total;
    const commentObj = {
      id: i + 1,
      cid,
      aweme_id,
      nickname,
      userimageurl,
      text,
      digg_count,
      ip_label: ip,
      create_time: relativeTime,
      commentimage: imageurl,
      label_type,
      sticker,
      status_label,
      is_At_user_id: userintextlongid,
      search_text: search_text2,
      reply_comment_total
    };
    jsonArray.push(commentObj);
  }
  jsonArray.sort((a, b) => b.digg_count - a.digg_count);
  const indexLabelTypeOne = jsonArray.findIndex((comment) => comment.label_type === 1);
  if (indexLabelTypeOne !== -1) {
    const commentTypeOne = jsonArray.splice(indexLabelTypeOne, 1)[0];
    jsonArray.unshift(commentTypeOne);
  }
  jsonArray = br(jsonArray);
  jsonArray = await handling_at(jsonArray);
  jsonArray = await search_text(jsonArray);
  jsonArray = await heic2jpg(jsonArray);
  const CommentData = {
    jsonArray
  };
  for (const i of jsonArray) {
    if (i.digg_count > 1e4) {
      i.digg_count = (i.digg_count / 1e4).toFixed(1) + "w";
    }
  }
  for (const item1 of CommentData.jsonArray) {
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
  return CommentData;
}
function getRelativeTimeFromTimestamp(timestamp) {
  const now = Math.floor(Date.now() / 1e3);
  const differenceInSeconds = now - timestamp;
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
    const date = new Date(timestamp * 1e3);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return year + "-" + month + "-" + day;
  }
}
async function handling_at(data) {
  for (const item of data) {
    if (item.is_At_user_id !== null && Array.isArray(item.is_At_user_id)) {
      for (const secUid of item.is_At_user_id) {
        const UserInfoData = await getDouyinData("用户主页数据", Config.cookies.douyin, { sec_uid: secUid, typeMode: "strict" });
        if (UserInfoData.user.sec_uid === secUid) {
          const regex = new RegExp(`@${UserInfoData.user.nickname?.replace(/[-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")}`, "g");
          item.text = item.text.replace(regex, (match) => {
            return `<span class="${Common.useDarkTheme() ? "dark-mode handling_at" : "handling_at"}">${match}</span>`;
          });
        }
      }
    }
  }
  return data;
}
async function search_text(data) {
  for (const item of data) {
    if (item.search_text !== null && Array.isArray(item.search_text)) {
      for (const search_text2 of item.search_text) {
        const SuggestWordsData = await getDouyinData("热点词数据", Config.cookies.douyin, { query: search_text2.search_text, typeMode: "strict" });
        if (SuggestWordsData.data && SuggestWordsData.data[0] && SuggestWordsData.data[0].params && SuggestWordsData.data[0].params.query_id && SuggestWordsData.data[0].params.query_id === search_text2.search_query_id) {
          const regex = new RegExp(`${search_text2.search_text}`, "g");
          item.text = item.text.replace(regex, (match) => {
            const themeClass = Common.useDarkTheme() ? "dark-mode" : "";
            return `<span class="search_text ${themeClass}">
                ${match}
                <span class="search-ico"></span>
            </span>&nbsp;&nbsp;&nbsp;`;
          });
        }
      }
    }
  }
  return data;
}
function br(data) {
  for (const i of data) {
    let text = i.text;
    text = text.replace(/\n/g, "<br>");
    i.text = text;
  }
  return data;
}
const heic2jpg = async (jsonArray) => {
  for (const item of jsonArray) {
    if (item.commentimage) {
      const headers = await new Networks({ url: item.commentimage, type: "arraybuffer" }).getHeaders();
      if (headers["content-type"] && headers["content-type"] === "image/heic") {
        const response = await new Networks({ url: item.commentimage, type: "arraybuffer" }).returnResult();
        const jpegBuffer = await heicConvertExports({
          buffer: response.data,
          format: "JPEG"
        });
        const base64Image = Buffer.from(jpegBuffer).toString("base64");
        item.commentimage = `data:image/jpeg;base64,${base64Image}`;
      }
    }
  }
  return jsonArray;
};
let mp4size = "";
let img;
class DouYin extends Base {
  e;
  type;
  is_mp4;
  is_slides;
  amagi;
  get botadapter() {
    return this.e.bot?.adapter?.name;
  }
  constructor(e, iddata) {
    super(e);
    this.e = e;
    this.type = iddata?.type;
    this.is_mp4 = iddata?.is_mp4;
    this.is_slides = false;
    this.amagi = new index_default({ douyin: Config.cookies.douyin });
  }
  async RESOURCES(data) {
    Config.app.EmojiReply && await this.e.bot.setMsgReaction(this.e.contact, this.e.messageId, Config.app.EmojiReplyID, true);
    if (Config.douyin.tip) this.e.reply("检测到抖音链接，开始解析");
    switch (this.type) {
      case "one_work": {
        const VideoData = await this.amagi.getDouyinData("聚合解析", {
          aweme_id: data.aweme_id,
          typeMode: "strict"
        });
        const CommentsData = await this.amagi.getDouyinData("评论数据", {
          aweme_id: data.aweme_id,
          number: Config.douyin.numcomment,
          typeMode: "strict"
        });
        this.is_slides = VideoData.aweme_detail.is_slides === true;
        let g_video_url = "";
        let g_title;
        let imagenum = 0;
        if (this.is_mp4 === false) {
          switch (true) {
            // 图集
            case (this.is_slides === false && VideoData.aweme_detail.images !== null): {
              const image_data = [];
              const imageres = [];
              let image_url = "";
              for (let i = 0; i < VideoData.aweme_detail.images.length; i++) {
                image_url = VideoData.aweme_detail.images[i].url_list[2] || VideoData.aweme_detail.images[i].url_list[1];
                const title = VideoData.aweme_detail.preview_title.substring(0, 50).replace(/[\\/:\*\?"<>\|\r\n]/g, " ");
                g_title = title;
                imageres.push(segment.image(image_url));
                imagenum++;
                if (Config.app.rmmp4 === false) {
                  mkdirSync(`${Common.tempDri.images}${g_title}`);
                  const path = `${Common.tempDri.images}${g_title}/${i + 1}.png`;
                  await new Networks({ url: image_url, type: "arraybuffer" }).getData().then((data2) => fs.promises.writeFile(path, Buffer.from(data2)));
                }
              }
              const res = common.makeForward(imageres, this.e.sender.userId, this.e.sender.nick);
              image_data.push(res);
              if (imageres.length === 1) {
                await this.e.reply(segment.image(image_url));
              } else {
                await this.e.bot.sendForwardMsg(this.e.contact, res, {
                  source: "图片合集",
                  summary: `查看${res.length}张图片消息`,
                  prompt: "抖音图集解析结果",
                  news: [{ text: "点击查看解析结果" }]
                });
              }
              break;
            }
            // 合辑
            case (VideoData.aweme_detail.is_slides === true && VideoData.aweme_detail.images !== null): {
              const images = [];
              const temp = [];
              const liveimgbgm = await this.DownLoadFile(
                VideoData.aweme_detail.music.play_url.uri,
                {
                  title: `Douyin_tmp_A_${Date.now()}.mp3`,
                  headers: this.headers
                }
              );
              temp.push(liveimgbgm);
              for (const item of VideoData.aweme_detail.images) {
                imagenum++;
                if (item.clip_type === 2) {
                  images.push(segment.image(item.url_list[0]));
                  continue;
                }
                const liveimg = await this.DownLoadFile(
                  `https://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`,
                  {
                    title: `Douyin_tmp_V_${Date.now()}.mp4`,
                    headers: this.headers
                  }
                );
                if (liveimg.filepath) {
                  const resolvefilepath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`;
                  await mergeFile("视频*3 + 音频", {
                    path: liveimg.filepath,
                    path2: liveimgbgm.filepath,
                    resultPath: resolvefilepath,
                    callback: async (success, resultPath) => {
                      if (success) {
                        const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`;
                        fs.renameSync(resultPath, filePath);
                        await this.removeFile(liveimg.filepath, true);
                        temp.push({ filepath: filePath, totalBytes: 0 });
                        images.push(segment.video("file://" + filePath));
                        return true;
                      } else {
                        await this.removeFile(liveimg.filepath, true);
                        return true;
                      }
                    }
                  });
                }
              }
              const Element = common.makeForward(images, this.e.sender.userId, this.e.sender.nick);
              try {
                await this.e.bot.sendForwardMsg(this.e.contact, Element, {
                  source: "合辑内容",
                  summary: `查看${Element.length}张图片/视频消息`,
                  prompt: "抖音合辑解析结果",
                  news: [{ text: "点击查看解析结果" }]
                });
              } catch (error) {
                await this.e.reply(JSON.stringify(error, null, 2));
              } finally {
                for (const item of temp) {
                  await this.removeFile(item.filepath, true);
                }
              }
              break;
            }
          }
        }
        if (VideoData.aweme_detail.music) {
          const music = VideoData.aweme_detail.music;
          const music_url = music.play_url.uri;
          if (this.is_mp4 === false && Config.app.rmmp4 === false && music_url !== void 0) {
            try {
              const path = Common.tempDri.images + `${g_title}/BGM.mp3`;
              await new Networks({ url: music_url, type: "arraybuffer" }).getData().then((data2) => fs.promises.writeFile(path, Buffer.from(data2)));
            } catch (error) {
              console.log(error);
            }
          }
          const haspath = music_url && this.is_mp4 === false && music_url !== void 0;
          haspath && await this.e.reply(segment.record(music_url, false));
        }
        let FPS;
        if (this.is_mp4) {
          const video_data = [];
          const videores = [];
          const video = VideoData.aweme_detail.video;
          FPS = video.bit_rate[0].FPS;
          if (Config.douyin.autoResolution) {
            logger.debug(`开始排除不符合条件的视频分辨率；

              共拥有${logger.yellow(video.bit_rate.length)}个视频源

              视频ID：${logger.green(VideoData.aweme_detail.aweme_id)}

              分享链接：${logger.green(VideoData.aweme_detail.share_url)}
              `);
            video.bit_rate = processVideos(video.bit_rate, Config.upload.filelimit);
            g_video_url = await new Networks({
              url: video.bit_rate[0].play_addr.url_list[2],
              headers: this.headers
            }).getLongLink();
          } else {
            g_video_url = await new Networks({
              url: video.play_addr_h264.url_list[2] ?? video.play_addr_h264.url_list[2],
              headers: this.headers
            }).getLongLink();
          }
          const cover = video.origin_cover.url_list[0];
          const title = VideoData.aweme_detail.preview_title.substring(0, 80).replace(/[\\/:\*\?"<>\|\r\n]/g, " ");
          g_title = title;
          mp4size = (video.bit_rate[0].play_addr.data_size / (1024 * 1024)).toFixed(2);
          videores.push(segment.text(`标题：
${title}`));
          videores.push(segment.text(`视频帧率：${"" + FPS}
视频大小：${mp4size}MB`));
          videores.push(segment.text(
            `永久直链(302跳转)
https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`
          ));
          videores.push(segment.text(`视频直链（有时效性，永久直链在下一条消息）：
${g_video_url}`));
          videores.push(segment.image(cover));
          logger.info("视频地址", `https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`);
          const res = common.makeForward(videores, this.e.sender.userId, this.e.sender.nick);
          video_data.push(res);
        }
        if (Config.douyin.comment && Config.douyin.comment) {
          const EmojiData = await getDouyinData("Emoji数据");
          const list = await Emoji(EmojiData);
          const commentsArray = await douyinComments(CommentsData, list);
          if (!commentsArray.jsonArray.length) {
            await this.e.reply("这个作品没有评论 ~");
          } else {
            const img2 = await Render(
              "douyin/comment",
              {
                Type: this.is_mp4 ? "视频" : this.is_slides ? "合辑" : "图集",
                CommentsData: commentsArray,
                CommentLength: String(commentsArray.jsonArray?.length ?? 0),
                share_url: this.is_mp4 ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0` : VideoData.aweme_detail.share_url,
                Title: g_title,
                VideoSize: mp4size,
                VideoFPS: FPS,
                ImageLength: imagenum
              }
            );
            await this.e.reply(img2);
          }
        }
        this.is_mp4 && await this.DownLoadVideo({ video_url: g_video_url, title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${g_title}.mp4` } });
        return true;
      }
      case "user_dynamic": {
        const UserVideoListData = await this.amagi.getDouyinData("用户主页视频列表数据", {
          sec_uid: data.sec_uid,
          typeMode: "strict"
        });
        const veoarray = [];
        veoarray.unshift("------------------------------ | ---------------------------- |\n");
        veoarray.unshift("标题                           | 分享二维码                    |\n");
        const forwardmsg = [];
        for (const i of UserVideoListData.aweme_list) {
          const title = i.desc;
          const cover = i.share_url;
          veoarray.push(`${title}       | ![img](${await browserExports.toDataURL(cover, {
            errorCorrectionLevel: "H",
            type: "image/png",
            color: {
              light: "#ffffff00",
              dark: Common.useDarkTheme() ? "#FFFFFF" : "#000000"
            }
          })})    |
`);
          forwardmsg.push(segment.text(`作品标题: ${title}
分享链接: ${cover}`));
        }
        const matext = markdown(veoarray.join(""), {});
        const htmlpath = `${Version.karinPath}/temp/html/${Version.pluginName}/douyin/user_worklist.html`;
        fs.writeFileSync(htmlpath, matext, "utf8");
        const img2 = await render.renderHtml(htmlpath);
        await this.e.reply(segment.image(img2));
        const Element2 = common.makeForward(forwardmsg, this.e.sender.userId, this.e.sender.nick);
        await this.e.bot.sendForwardMsg(this.e.contact, Element2);
        return true;
      }
      case "music_work": {
        const MusicData = await this.amagi.getDouyinData("音乐数据", {
          music_id: data.music_id,
          typeMode: "strict"
        });
        const sec_uid = MusicData.music_info.sec_uid;
        const UserData = await this.amagi.getDouyinData("用户主页数据", { sec_uid, typeMode: "strict" });
        if (!MusicData.music_info.play_url) {
          await this.e.reply("解析错误！该音乐抖音未提供下载链接，无法下载", { reply: true });
          return true;
        }
        img = await Render(
          "douyin/musicinfo",
          {
            image_url: MusicData.music_info.cover_hd.url_list[0],
            desc: MusicData.music_info.title,
            music_id: MusicData.music_info.id,
            create_time: Time(0),
            user_count: this.count(MusicData.music_info.user_count),
            avater_url: MusicData.music_info.avatar_large?.url_list[0] || UserData.user.avatar_larger.url_list[0],
            fans: UserData.user.mplatform_followers_count || UserData.user.follower_count,
            following_count: UserData.user.following_count,
            total_favorited: UserData.user.total_favorited,
            user_shortid: UserData.user.unique_id === "" ? UserData.user.short_id : UserData.user.unique_id,
            share_url: MusicData.music_info.play_url.uri,
            username: MusicData.music_info?.original_musician_display_name || MusicData.music_info.owner_nickname === "" ? MusicData.music_info.author : MusicData.music_info.owner_nickname
          }
        );
        await this.e.reply(
          [
            ...img,
            `
正在上传 ${MusicData.music_info.title}
`,
            `作曲: ${MusicData.music_info.original_musician_display_name || MusicData.music_info.owner_nickname === "" ? MusicData.music_info.author : MusicData.music_info.owner_nickname}
`,
            `music_id: ${MusicData.music_info.id}`
          ]
        );
        await this.e.reply(segment.record(MusicData.music_info.play_url.uri, false));
        return true;
      }
      case "live_room_detail": {
        const UserInfoData = await this.amagi.getDouyinData("用户主页数据", {
          sec_uid: data.sec_uid,
          typeMode: "strict"
        });
        if (UserInfoData.user.live_status === 1) {
          const live_data = await this.amagi.getDouyinData("直播间信息数据", { sec_uid: UserInfoData.user.sec_uid, typeMode: "strict" });
          const room_data = JSON.parse(UserInfoData.user.room_data);
          const img2 = await Render(
            "douyin/live",
            {
              image_url: [{ image_src: live_data.data.data[0].cover?.url_list[0] }],
              text: live_data.data.data[0].title,
              liveinf: `${live_data.data.partition_road_map.partition.title} | 房间号: ${room_data.owner.web_rid}`,
              在线观众: this.count(Number(live_data.data.data[0].room_view_stats?.display_value)),
              总观看次数: this.count(Number(live_data.data.data[0].stats?.total_user_str)),
              username: UserInfoData.user.nickname,
              avater_url: UserInfoData.user.avatar_larger.url_list[0],
              fans: this.count(UserInfoData.user.follower_count),
              create_time: convertTimestampToDateTime((/* @__PURE__ */ new Date()).getTime()),
              now_time: convertTimestampToDateTime((/* @__PURE__ */ new Date()).getTime()),
              share_url: "https://live.douyin.com/" + room_data.owner.web_rid,
              dynamicTYPE: "直播间信息"
            }
          );
          await this.e.reply(img2);
        } else {
          this.e.reply("当前博主未开播 ~");
        }
        return true;
      }
    }
  }
}
function processVideos(videos, filelimit) {
  const sizeLimitBytes = filelimit * 1024 * 1024;
  logger.debug(videos);
  const validVideos = videos.filter((video) => video.format !== "dash" && video.play_addr.data_size <= sizeLimitBytes);
  if (validVideos.length > 0) {
    return [validVideos.reduce((maxVideo, currentVideo) => {
      return currentVideo.play_addr.data_size > maxVideo.play_addr.data_size ? currentVideo : maxVideo;
    })];
  } else {
    const allValidVideos = videos.filter((video) => video.format !== "dash");
    return [allValidVideos.reduce((minVideo, currentVideo) => {
      return currentVideo.play_addr.data_size < minVideo.play_addr.data_size ? currentVideo : minVideo;
    })];
  }
}
function Time(delay) {
  const currentDate = /* @__PURE__ */ new Date();
  currentDate.setHours(currentDate.getHours() + delay);
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
function convertTimestampToDateTime(timestamp) {
  const date = new Date(timestamp * 1e3);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
function Emoji(data) {
  const ListArray = [];
  for (const i of data.emoji_list) {
    const display_name = i.display_name;
    const url = i.emoji_url.url_list[0];
    const Objject = {
      name: display_name,
      url
    };
    ListArray.push(Objject);
  }
  return ListArray;
}
async function getDouyinID(url, log = true) {
  const longLink = await new Networks({
    url,
    headers: {
      "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
    }
  }).getLongLink();
  let result = {};
  switch (true) {
    case longLink.includes("webcast.amemv.com"):
    case longLink.includes("live.douyin.com"): {
      if (longLink.includes("webcast.amemv.com")) {
        const sec_uid = /sec_user_id=([^&]+)/.exec(longLink);
        result = {
          type: "live_room_detail",
          sec_uid: sec_uid ? sec_uid[1] : void 0
        };
      } else if (longLink.includes("live.douyin.com")) {
        result = {
          type: "live_room_detail",
          room_id: longLink.split("/").pop()
        };
      }
      break;
    }
    case /video\/(\d+)/.test(longLink): {
      const videoMatch = /video\/(\d+)/.exec(longLink);
      result = {
        type: "one_work",
        aweme_id: videoMatch ? videoMatch[1] : void 0,
        is_mp4: true
      };
      break;
    }
    case /note\/(\d+)/.test(longLink): {
      const noteMatch = /note\/(\d+)/.exec(longLink);
      result = {
        type: "one_work",
        aweme_id: noteMatch ? noteMatch[1] : void 0,
        is_mp4: false
      };
      break;
    }
    case /https:\/\/(?:www\.douyin\.com|www\.iesdouyin\.com)\/share\/user\/(\S+)/.test(longLink): {
      const userMatch = /user\/([a-zA-Z0-9_-]+)\b/.exec(longLink);
      result = {
        type: "user_dynamic",
        sec_uid: userMatch ? userMatch[1] : void 0
      };
      break;
    }
    case /music\/(\d+)/.test(longLink): {
      const musicMatch = /music\/(\d+)/.exec(longLink);
      result = {
        type: "music_work",
        music_id: musicMatch ? musicMatch[1] : void 0
      };
      break;
    }
    default:
      logger.warn("无法获取作品ID");
      break;
  }
  log && console.log(result);
  return result;
}
export {
  DouYin as D,
  getDouyinID as g,
  processVideos as p
};
