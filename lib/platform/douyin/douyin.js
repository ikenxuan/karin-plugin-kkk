import { Base, Config, Networks, Render, mergeFile, Version, UploadRecord, Common } from '../../module/utils/index.js';
import { douyinComments } from '../../platform/douyin/index.js';
import { common, segment, logger, render } from 'node-karin';
import fs from 'node:fs';
import { markdown } from '@karinjs/md-html';
import QRCode from 'qrcode';
import { getDouyinData } from '@ikenxuan/amagi';
let mp4size = '';
let img;
export class DouYin extends Base {
    e;
    type;
    is_mp4;
    get botadapter() {
        return this.e.bot?.adapter?.name;
    }
    constructor(e, iddata) {
        super(e);
        this.e = e;
        this.type = iddata?.type;
        this.is_mp4 = iddata?.is_mp4;
    }
    async RESOURCES(data) {
        switch (this.type) {
            case 'one_work': {
                if (Config.douyin.tip)
                    this.e.reply('检测到抖音链接，开始解析');
                let g_video_url = '';
                let g_title;
                const full_data = [];
                /** 图集 */
                let imagenum = 0;
                const image_res = [];
                if (this.is_mp4 === false) {
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
                            common.mkdir(`${Common.tempDri.images}${g_title}`);
                            const path = `${Common.tempDri.images}${g_title}/${i + 1}.png`;
                            await new Networks({ url: image_url, type: 'arraybuffer' }).getData().then((data) => fs.promises.writeFile(path, Buffer.from(data)));
                        }
                    }
                    const res = common.makeForward(imageres, this.e.sender.uin, this.e.sender.nick);
                    image_data.push(res);
                    image_res.push(image_data);
                    if (imageres.length === 1) {
                        await this.e.reply(segment.image(image_url));
                    }
                    else {
                        await this.e.bot.sendForwardMessage(this.e.contact, res);
                    }
                }
                else {
                    image_res.push('图集信息解析失败');
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
                    switch (this.botadapter) {
                        case 'OneBotv11': {
                            if (haspath) {
                                await this.e.reply(segment.record(music_url));
                            }
                            break;
                        }
                        case 'ICQQ': {
                            if (haspath) {
                                if (Config.douyin.sendHDrecord)
                                    await this.e.reply(await UploadRecord(this.e, music_url, 0, false));
                                else
                                    this.e.reply(segment.record(music_url));
                            }
                            break;
                        }
                    }
                }
                /** 视频 */
                let FPS;
                const video_res = [];
                let sendvideofile = true;
                if (this.is_mp4) {
                    const video_data = [];
                    const videores = [];
                    // 视频地址特殊判断：play_addr_h264、play_addr、
                    const video = data.VideoData.aweme_detail.video;
                    FPS = video.bit_rate[0].FPS; // FPS
                    if (data.VideoData.aweme_detail.video.play_addr_h264) {
                        g_video_url = await new Networks({
                            url: video.play_addr_h264.url_list[2],
                            headers: this.headers
                        }).getLongLink();
                    }
                    else if (data.VideoData.aweme_detail.video.play_addr) {
                        g_video_url = await new Networks({
                            url: video.play_addr.url_list[0],
                            headers: this.headers
                        }).getLongLink();
                    }
                    const cover = video.origin_cover.url_list[0]; // video cover image
                    const title = data.VideoData.aweme_detail.preview_title.substring(0, 80).replace(/[\\/:\*\?"<>\|\r\n]/g, ' '); // video title
                    g_title = title;
                    mp4size = (video.play_addr.data_size / (1024 * 1024)).toFixed(2);
                    videores.push(segment.text(`标题：\n${title}`));
                    videores.push(segment.text(`视频帧率：${'' + FPS}\n视频大小：${mp4size}MB`));
                    videores.push(segment.text(`永久直链(302跳转)\nhttps://aweme.snssdk.com/aweme/v1/play/?video_id=${data.VideoData.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`));
                    videores.push(segment.text(`视频直链（有时效性，永久直链在下一条消息）：\n${g_video_url}`));
                    videores.push(segment.image(cover));
                    g_video_url = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${data.VideoData.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`;
                    logger.info('视频地址', g_video_url);
                    const res = common.makeForward(videores, this.e.sender.uin, this.e.sender.nick);
                    video_data.push(res);
                    video_res.push(video_data);
                }
                if (Config.douyin.comment && Config.douyin.comment) {
                    const EmojiData = await getDouyinData('Emoji数据');
                    const list = await Emoji(EmojiData);
                    const commentsArray = await douyinComments(data.CommentsData, list);
                    const img = await Render('douyin/comment', {
                        Type: this.is_mp4 ? '视频' : '图集',
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
                sendvideofile && this.is_mp4 && await this.DownLoadVideo({ video_url: g_video_url, title: { timestampTitle: 'tmp_' + Date.now(), originTitle: g_title } });
                return true;
            }
            case 'user_mix_videos': {
                const images = [];
                const bgmurl = data.aweme_details[0].music.play_url.uri;
                for (const item of data.aweme_details[0].images) {
                    // 静态图片，clip_type为2
                    if (item.clip_type === 2) {
                        images.push(segment.text(`动图直链:\nhttps://aweme.snssdk.com/aweme/v1/play/?video_id=${item.uri}&ratio=1080p&line=0`));
                        continue;
                    }
                    images.push(segment.text(`动图直链:\nhttps://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`));
                    // 动图
                    const liveimg = await this.DownLoadFile(`https://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`, {
                        title: 'Douyin_tmp_' + Date.now(),
                        headers: this.headers,
                        filetype: '.mp4'
                    });
                    // BGM
                    const liveimgbgm = await this.DownLoadFile(bgmurl, {
                        title: 'Douyin_tmp_' + Date.now(),
                        headers: this.headers,
                        filetype: '.mp3'
                    });
                    if (liveimg.filepath && liveimgbgm.filepath) {
                        const resolvefilepath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`;
                        await mergeFile('视频*3 + 音频', {
                            path: liveimg.filepath,
                            path2: liveimgbgm.filepath,
                            resultPath: resolvefilepath,
                            callback: async (success) => {
                                if (success) {
                                    const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`;
                                    fs.renameSync(resolvefilepath, filePath);
                                    await this.removeFile(liveimgbgm.filepath, true);
                                    await this.removeFile(liveimg.filepath, true);
                                    const stats = fs.statSync(filePath);
                                    const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2));
                                    if (fileSizeInMB > Config.upload.groupfilevalue) {
                                        this.e.reply(`视频大小: ${fileSizeInMB}MB 正通过群文件上传中...`);
                                        return await this.upload_file({ filepath: filePath, totalBytes: fileSizeInMB }, '', { useGroupFile: true });
                                    }
                                    else {
                                        /** 因为本地合成，没有视频直链 */
                                        return await this.upload_file({ filepath: filePath, totalBytes: fileSizeInMB }, '');
                                    }
                                }
                                else {
                                    await this.removeFile(liveimgbgm.filepath, true);
                                    await this.removeFile(liveimg.filepath, true);
                                    return true;
                                }
                            }
                        });
                    }
                }
                const Element = common.makeForward(images, this.e.sender.uin, this.e.sender.nick);
                await this.e.bot.sendForwardMessage(this.e.contact, Element);
                return true;
            }
            case 'user_dynamic': {
                const veoarray = [];
                veoarray.unshift(`------------------------------ | ---------------------------- |\n`);
                veoarray.unshift(`标题                           | 分享二维码                    |\n`);
                const forwardmsg = [];
                for (let i = 0; i < data.aweme_list.length; i++) {
                    const title = data.aweme_list[i].desc;
                    const cover = data.aweme_list[i].share_url;
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
                const Element2 = common.makeForward(forwardmsg, this.e.sender.uin, this.e.sender.nick);
                await this.e.bot.sendForwardMessage(this.e.contact, Element2);
                return true;
            }
            case 'music_work': {
                const sec_uid = data.music_info.sec_uid;
                let userdata = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid });
                if (userdata.status_code === 2) {
                    const new_userdata = await getDouyinData('搜索数据', Config.cookies.douyin, { query: data.music_info.author });
                    if (new_userdata.data[0].type === 4 && new_userdata.data[0].card_unique_name === 'user') {
                        userdata = { user: new_userdata.data[0].user_list[0].user_info };
                    }
                    const search_data = new_userdata;
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
                // const record = await UploadRecord(this.e, data.music_info.play_url.uri, 0, false)
                if (this.botadapter === 'ICQQ') {
                    await this.e.reply(await UploadRecord(this.e, data.music_info.play_url.uri, 0, false));
                }
                else
                    await this.e.reply(segment.record(data.music_info.play_url.uri));
                return true;
            }
            case 'live_room_detail': {
                if (data.user.live_status === 1) {
                    // 直播中
                    const live_data = await getDouyinData('直播间信息数据', Config.cookies.douyin, { sec_uid: data.user.sec_uid });
                    const room_data = JSON.parse(data.user.room_data);
                    const img = await Render('douyin/live', {
                        image_url: [{ image_src: live_data.data.data[0].cover.url_list[0] }],
                        text: live_data.data.data[0].title,
                        liveinf: `${live_data.data.partition_road_map.partition.title} | 房间号: ${room_data.owner.web_rid}`,
                        在线观众: this.count(live_data.data.data[0].room_view_stats.display_value),
                        总观看次数: this.count(live_data.data.data[0].stats.total_user_str),
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
    for (let i = 0; i < data.emoji_list.length; i++) {
        const display_name = data.emoji_list[i].display_name;
        const url = data.emoji_list[i].emoji_url.url_list[0];
        const Objject = {
            name: display_name,
            url
        };
        ListArray.push(Objject);
    }
    return ListArray;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG91eWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BsYXRmb3JtL2RvdXlpbi9kb3V5aW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV6RyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFnQixNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFDMUUsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBQ3hCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUMzQyxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUE7QUFDM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRS9DLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQTtBQUNoQixJQUFJLEdBQUcsQ0FBQTtBQUVQLE1BQU0sT0FBTyxNQUFPLFNBQVEsSUFBSTtJQUM5QixDQUFDLENBQWM7SUFDZixJQUFJLENBQXdDO0lBQzVDLE1BQU0sQ0FBSztJQUNYLElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQTtJQUNsQyxDQUFDO0lBQ0QsWUFBYSxDQUFlLEVBQUUsTUFBaUM7UUFDN0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ1IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDVixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUE7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFBO0lB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