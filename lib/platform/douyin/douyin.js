import fs from 'node:fs';
import { getDouyinData } from '@ikenxuan/amagi';
import { markdown } from '@karinjs/md-html';
import { common, logger, mkdirSync, render, segment } from 'node-karin';
import QRCode from 'qrcode';
import { Base, Common, Config, mergeFile, Networks, Render, Version } from '../../module/utils/index.js';
import { douyinComments } from '../../platform/douyin/index.js';
let mp4size = '';
let img;
export class DouYin extends Base {
    e;
    type;
    is_mp4;
    is_slides;
    get botadapter() {
        return this.e.bot?.adapter?.name;
    }
    constructor(e, iddata) {
        super(e);
        this.e = e;
        this.type = iddata?.type;
        this.is_mp4 = iddata?.is_mp4;
        this.is_slides = false;
    }
    async RESOURCES(data) {
        switch (this.type) {
            case 'one_work': {
                if (Config.douyin.tip)
                    this.e.reply('检测到抖音链接，开始解析');
                this.is_slides = data.VideoData.aweme_detail.is_slides === true;
                let g_video_url = '';
                let g_title;
                /** 图集 */
                let imagenum = 0;
                const image_res = [];
                if (this.is_mp4 === false) {
                    switch (true) {
                        // 图集
                        case this.is_slides === false: {
                            const image_data = [];
                            const imageres = [];
                            let image_url;
                            for (let i = 0; i < data.VideoData.aweme_detail.images.length; i++) {
                                image_url = data.VideoData.aweme_detail.images[i].url_list[2] || data.VideoData.aweme_detail.images[i].url_list[1]; // 图片地址
                                const title = data.VideoData.aweme_detail.preview_title.substring(0, 50).replace(/[\\/:\*\?"<>\|\r\n]/g, ' '); // 标题，去除特殊字符
                                g_title = title;
                                imageres.push(segment.image(image_url));
                                imagenum++;
                                if (Config.app.rmmp4 === false) {
                                    mkdirSync(`${Common.tempDri.images}${g_title}`);
                                    const path = `${Common.tempDri.images}${g_title}/${i + 1}.png`;
                                    await new Networks({ url: image_url, type: 'arraybuffer' }).getData().then((data) => fs.promises.writeFile(path, Buffer.from(data)));
                                }
                            }
                            const res = common.makeForward(imageres, this.e.sender.userId, this.e.sender.nick);
                            image_data.push(res);
                            image_res.push(image_data);
                            if (imageres.length === 1) {
                                await this.e.reply(segment.image(image_url));
                            }
                            else {
                                await this.e.bot.sendForwardMsg(this.e.contact, res, {
                                    source: '图片合集',
                                    summary: `查看${res.length}张图片消息`,
                                    prompt: '抖音图集解析结果',
                                    news: [{ text: '点击查看解析结果' }]
                                });
                            }
                            break;
                        }
                        // 合辑
                        case data.VideoData.aweme_detail.is_slides === true: {
                            const images = [];
                            const temp = [];
                            /** BGM */
                            const liveimgbgm = await this.DownLoadFile(data.VideoData.aweme_detail.music.play_url.uri, {
                                title: `Douyin_tmp_A_${Date.now()}.mp3`,
                                headers: this.headers
                            });
                            temp.push(liveimgbgm);
                            for (const item of data.VideoData.aweme_detail.images) {
                                imagenum++;
                                // 静态图片，clip_type为2
                                if (item.clip_type === 2) {
                                    images.push(segment.image((item.url_list[0])));
                                    continue;
                                }
                                /** 动图 */
                                const liveimg = await this.DownLoadFile(`https://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`, {
                                    title: `Douyin_tmp_V_${Date.now()}.mp4`,
                                    headers: this.headers
                                });
                                if (liveimg.filepath) {
                                    const resolvefilepath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`;
                                    await mergeFile('视频*3 + 音频', {
                                        path: liveimg.filepath,
                                        path2: liveimgbgm.filepath,
                                        resultPath: resolvefilepath,
                                        callback: async (success, resultPath) => {
                                            if (success) {
                                                const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`;
                                                fs.renameSync(resultPath, filePath);
                                                await this.removeFile(liveimg.filepath, true);
                                                temp.push({ filepath: filePath, totalBytes: 0 });
                                                images.push(segment.video('file://' + filePath));
                                                return true;
                                            }
                                            else {
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
                                    source: '合辑内容',
                                    summary: `查看${Element.length}张图片/视频消息`,
                                    prompt: '抖音合辑解析结果',
                                    news: [{ text: '点击查看解析结果' }]
                                });
                            }
                            catch (error) {
                                await this.e.reply(JSON.stringify(error, null, 2));
                            }
                            finally {
                                for (const item of temp) {
                                    await this.removeFile(item.filepath, true);
                                }
                            }
                            break;
                        }
                    }
                }
                /** 背景音乐 */
                if (data.VideoData.aweme_detail.music) {
                    const music = data.VideoData.aweme_detail.music;
                    const music_url = music.play_url.uri; // BGM link
                    if (this.is_mp4 === false && Config.app.rmmp4 === false && music_url !== undefined) {
                        try {
                            const path = Common.tempDri.images + `${g_title}/BGM.mp3`;
                            await new Networks({ url: music_url, type: 'arraybuffer' }).getData().then((data) => fs.promises.writeFile(path, Buffer.from(data)));
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    const haspath = music_url && this.is_mp4 === false && music_url !== undefined;
                    haspath && await this.e.reply(segment.record(music_url, false));
                }
                /** 视频 */
                let FPS;
                const video_res = [];
                const sendvideofile = true;
                if (this.is_mp4) {
                    const video_data = [];
                    const videores = [];
                    // 视频地址特殊判断：play_addr_h264、play_addr、
                    const video = data.VideoData.aweme_detail.video;
                    FPS = video.bit_rate[0].FPS; // FPS
                    if (Config.douyin.autoResolution) {
                        video.bit_rate = processVideos(video.bit_rate, Config.upload.filelimit);
                        g_video_url = await new Networks({
                            url: video.bit_rate[0].play_addr.url_list[2],
                            headers: this.headers
                        }).getLongLink();
                    }
                    else {
                        g_video_url = await new Networks({
                            url: video.play_addr_h264.url_list[2] || video.play_addr_h264.url_list[2],
                            headers: this.headers
                        }).getLongLink();
                    }
                    const cover = video.origin_cover.url_list[0]; // video cover image
                    const title = data.VideoData.aweme_detail.preview_title.substring(0, 80).replace(/[\\/:\*\?"<>\|\r\n]/g, ' '); // video title
                    g_title = title;
                    mp4size = (video.bit_rate[0].play_addr.data_size / (1024 * 1024)).toFixed(2);
                    videores.push(segment.text(`标题：\n${title}`));
                    videores.push(segment.text(`视频帧率：${'' + FPS}\n视频大小：${mp4size}MB`));
                    videores.push(segment.text(`永久直链(302跳转)\nhttps://aweme.snssdk.com/aweme/v1/play/?video_id=${data.VideoData.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`));
                    videores.push(segment.text(`视频直链（有时效性，永久直链在下一条消息）：\n${g_video_url}`));
                    videores.push(segment.image(cover));
                    logger.info('视频地址', `https://aweme.snssdk.com/aweme/v1/play/?video_id=${data.VideoData.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`);
                    const res = common.makeForward(videores, this.e.sender.userId, this.e.sender.nick);
                    video_data.push(res);
                    video_res.push(video_data);
                }
                if (Config.douyin.comment && Config.douyin.comment) {
                    const EmojiData = await getDouyinData('Emoji数据');
                    const list = await Emoji(EmojiData);
                    const commentsArray = await douyinComments(data.CommentsData, list);
                    const img = await Render('douyin/comment', {
                        Type: this.is_mp4 ? '视频' : this.is_slides ? '合辑' : '图集',
                        CommentsData: commentsArray,
                        CommentLength: String(commentsArray.jsonArray?.length ? commentsArray.jsonArray.length : 0),
                        share_url: this.is_mp4
                            ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${data.VideoData.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`
                            : data.VideoData.aweme_detail.share_url,
                        Title: g_title,
                        VideoSize: mp4size,
                        VideoFPS: FPS,
                        ImageLength: imagenum
                    });
                    await this.e.reply(img);
                }
                /** 发送视频 */
                sendvideofile && this.is_mp4 && await this.DownLoadVideo({ video_url: g_video_url, title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${g_title}.mp4` } });
                return true;
            }
            case 'user_dynamic': {
                const veoarray = [];
                veoarray.unshift('------------------------------ | ---------------------------- |\n');
                veoarray.unshift('标题                           | 分享二维码                    |\n');
                const forwardmsg = [];
                for (const i of data.aweme_list) {
                    const title = i.desc;
                    const cover = i.share_url;
                    veoarray.push(`${title}       | ![img](${await QRCode.toDataURL(cover, {
                        errorCorrectionLevel: 'H',
                        type: 'image/png',
                        color: {
                            light: '#ffffff00',
                            dark: Common.useDarkTheme() ? '#FFFFFF' : '#000000'
                        }
                    })})    |\n`);
                    forwardmsg.push(segment.text(`作品标题: ${title}\n分享链接: ${cover}`));
                }
                const matext = markdown(veoarray.join(''), {});
                const htmlpath = `${Version.karinPath}/temp/html/${Version.pluginName}/douyin/user_worklist.html`;
                fs.writeFileSync(htmlpath, matext, 'utf8');
                const img = await render.renderHtml(htmlpath);
                await this.e.reply(segment.image(img));
                const Element2 = common.makeForward(forwardmsg, this.e.sender.userId, this.e.sender.nick);
                await this.e.bot.sendForwardMsg(this.e.contact, Element2);
                return true;
            }
            case 'music_work': {
                const sec_uid = data.music_info.sec_uid;
                let userdata = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid });
                // if (userdata.status_code === 2) {
                //   const new_userdata = await getDouyinData('搜索数据', Config.cookies.douyin, { query: data.music_info.author })
                //   if (new_userdata.data[0].type === 4 && new_userdata.data[0].card_unique_name === 'user') {
                //     userdata = { user: new_userdata.data[0].user_list[0].user_info }
                //   }
                //   const search_data = new_userdata
                // }
                if (!data.music_info.play_url) {
                    await this.e.reply('解析错误！该音乐抖音未提供下载链接，无法下载', { reply: true });
                    return true;
                }
                img = await Render('douyin/musicinfo', {
                    image_url: data.music_info.cover_hd.url_list[0],
                    desc: data.music_info.title,
                    music_id: data.music_info.id,
                    create_time: Time(0),
                    user_count: this.count(data.music_info.user_count),
                    avater_url: data.music_info.avatar_large?.url_list[0] || userdata.user.avatar_larger.url_list[0],
                    fans: userdata.user.mplatform_followers_count || userdata.user.follower_count,
                    following_count: userdata.user.following_count,
                    total_favorited: userdata.user.total_favorited,
                    user_shortid: userdata.user.unique_id === '' ? userdata.user.short_id : userdata.user.unique_id,
                    share_url: data.music_info.play_url.uri,
                    username: data.music_info?.original_musician_display_name || data.music_info.owner_nickname === '' ? data.music_info.author : data.music_info.owner_nickname
                });
                await this.e.reply([
                    ...img,
                    `\n正在上传 ${data.music_info.title}\n`,
                    `作曲: ${data.music_info.original_musician_display_name || data.music_info.owner_nickname === '' ? data.music_info.author : data.music_info.owner_nickname}\n`,
                    `music_id: ${data.music_info.id}`
                ]);
                await this.e.reply(segment.record(data.music_info.play_url.uri, false));
                return true;
            }
            case 'live_room_detail': {
                if (data.user.live_status === 1) {
                    // 直播中
                    const live_data = await getDouyinData('直播间信息数据', Config.cookies.douyin, { sec_uid: data.user.sec_uid });
                    const room_data = JSON.parse(data.user.room_data);
                    const img = await Render('douyin/live', {
                        image_url: [{ image_src: live_data.data.data[0].cover?.url_list[0] }],
                        text: live_data.data.data[0].title,
                        liveinf: `${live_data.data.partition_road_map.partition.title} | 房间号: ${room_data.owner.web_rid}`,
                        在线观众: this.count(Number(live_data.data.data[0].room_view_stats?.display_value)),
                        总观看次数: this.count(Number(live_data.data.data[0].stats?.total_user_str)),
                        username: data.user.nickname,
                        avater_url: data.user.avatar_larger.url_list[0],
                        fans: this.count(data.user.follower_count),
                        create_time: convertTimestampToDateTime(new Date().getTime()),
                        now_time: convertTimestampToDateTime(new Date().getTime()),
                        share_url: 'https://live.douyin.com/' + room_data.owner.web_rid,
                        dynamicTYPE: '直播间信息'
                    });
                    await this.e.reply(img);
                }
                else {
                    this.e.reply('当前博主未开播 ~');
                }
                return true;
            }
            default:
                break;
        }
    }
}
export function processVideos(videos, filelimit) {
    const sizeLimitBytes = filelimit * 1024 * 1024; // 将 MB 转换为字节
    // 过滤掉 format 为 'dash' 的视频，并且过滤出小于等于大小限制的视频
    const validVideos = videos.filter(video => video.format !== 'dash' && video.play_addr.data_size <= sizeLimitBytes);
    if (validVideos.length > 0) {
        // 如果有符合条件的视频，找到 data_size 最大的视频
        return [validVideos.reduce((maxVideo, currentVideo) => {
                return currentVideo.play_addr.data_size > maxVideo.play_addr.data_size ? currentVideo : maxVideo;
            })];
    }
    else {
        // 如果没有符合条件的视频，返回 data_size 最小的那个视频（排除 'dash' 格式）
        const allValidVideos = videos.filter(video => video.format !== 'dash');
        return [allValidVideos.reduce((minVideo, currentVideo) => {
                return currentVideo.play_addr.data_size < minVideo.play_addr.data_size ? currentVideo : minVideo;
            })];
    }
}
/**
 * 传递整数，返回x小时后的时间
 * @param {number} delay
 * @returns
 */
function Time(delay) {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + delay);
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
/**
   *
   * @param {number} timestamp 时间戳
   * @returns 获取 年-月-日 时:分
   */
function convertTimestampToDateTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
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
