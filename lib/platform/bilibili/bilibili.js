import { Base, Render, Config, Networks, mergeFile, Common } from '../../module/utils/index.js';
import { bilibiliComments, genParams } from '../../platform/bilibili/index.js';
import { bilibiliAPI } from '@ikenxuan/amagi';
import karin, { segment, logger } from 'node-karin';
import fs from 'node:fs';
let img;
export class Bilibili extends Base {
    e;
    type;
    STATUS;
    ISVIP;
    TYPE;
    islogin;
    downloadfilename;
    get botadapter() {
        return this.e.bot?.adapter?.name;
    }
    constructor(e, data) {
        super(e);
        this.e = e;
        this.STATUS = data?.USER?.STATUS;
        this.ISVIP = data?.USER?.isvip;
        this.TYPE = data?.TYPE;
        this.islogin = data?.USER?.STATUS === 'isLogin';
        this.downloadfilename = '';
        this.headers.Referer = 'https://api.bilibili.com/';
        this.headers.Cookie = Config.cookies.bilibili;
    }
    async RESOURCES(OBJECT) {
        Config.bilibili.tip && await this.e.reply('检测到B站链接，开始解析');
        switch (this.TYPE) {
            case 'one_video': {
                const { owner, pic, title, stat } = OBJECT.INFODATA.data;
                const { name } = owner;
                const { coin, like, share, view, favorite, danmaku } = stat;
                this.downloadfilename = title.substring(0, 50).replace(/[\\/:\*\?"<>\|\r\n\s]/g, ' ');
                const nocd_data = await new Networks({
                    url: bilibiliAPI.视频流信息({ avid: OBJECT.INFODATA.data.aid, cid: OBJECT.INFODATA.data.cid }) + '&platform=html5',
                    headers: this.headers
                }).getData();
                await this.e.reply([
                    segment.image(pic),
                    `\n# 标题: ${title}\n`,
                    `\n作者: ${name}\n播放量: ${this.count(view)},    弹幕: ${this.count(danmaku)}\n点赞: ${this.count(like)},    投币: ${this.count(coin)}\n转发: ${this.count(share)},    收藏: ${this.count(favorite)}`
                ]);
                let videoSize;
                if (this.islogin) {
                    const simplify = OBJECT.DATA.data.dash.video.filter((item, index, self) => {
                        return self.findIndex((t) => {
                            return t.id === item.id;
                        }) === index;
                    });
                    OBJECT.DATA.data.dash.video = simplify;
                    OBJECT = await this.processVideos(OBJECT);
                    videoSize = await this.getvideosize(OBJECT.DATA.data.dash.video[0].base_url, OBJECT.DATA.data.dash.audio[0].base_url, OBJECT.INFODATA.data.bvid);
                }
                else {
                    videoSize = (OBJECT.DATA.data.durl[0].size / (1024 * 1024)).toFixed(2);
                }
                const commentsdata = bilibiliComments(OBJECT);
                img = await Render('bilibili/comment', {
                    Type: '视频',
                    CommentsData: commentsdata,
                    CommentLength: String(commentsdata?.length ? commentsdata.length : 0),
                    share_url: 'https://b23.tv/' + OBJECT.INFODATA.data.bvid,
                    Clarity: Config.bilibili.videopriority === true ? nocd_data.data.accept_description[0] : OBJECT.DATA.data.accept_description[0],
                    VideoSize: Config.bilibili.videopriority === true ? (nocd_data.data.durl[0].size / (1024 * 1024)).toFixed(2) : videoSize,
                    ImageLength: 0,
                    shareurl: 'https://b23.tv/' + OBJECT.INFODATA.data.bvid
                });
                Config.bilibili.comment && await this.e.reply(img);
                if (Config.upload.usefilelimit && Number(videoSize) > Number(Config.upload.filelimit)) {
                    await this.e.reply(`设定的最大上传大小为 ${Config.upload.filelimit}MB\n当前解析到的视频大小为 ${Number(videoSize)}MB\n` + '视频太大了，还是去B站看吧~', { reply: true });
                }
                else
                    await this.getvideo(Config.bilibili.videopriority === true ? { DATA: nocd_data } : OBJECT);
                break;
            }
            case 'bangumi_video_info': {
                const barray = [];
                let msg = [];
                for (let i = 0; i < OBJECT.INFODATA.result.episodes.length; i++) {
                    const totalEpisodes = OBJECT.INFODATA.result.episodes.length;
                    const long_title = OBJECT.INFODATA.result.episodes[i].long_title;
                    const badge = OBJECT.INFODATA.result.episodes[i].badge;
                    const short_link = OBJECT.INFODATA.result.episodes[i].short_link;
                    barray.push({
                        id: i + 1,
                        totalEpisodes,
                        long_title,
                        badge: badge === '' ? '暂无' : badge,
                        short_link
                    });
                    msg.push([
                        `\n> ## 第${i + 1}集`,
                        `\n> 标题: ${long_title}`,
                        `\n> 类型: ${badge !== '预告' ? '正片' : '预告'}`,
                        `\n> 🔒 播放要求: ${badge === '预告' || badge === '' ? '暂无' : badge}`,
                        this.botadapter !== 'QQBot' ? `\n> 🔗 分享链接: [🔗点击查看](${short_link})\r\r` : ''
                    ]);
                }
                img = await Render('bilibili/bangumi', {
                    saveId: 'bangumi',
                    bangumiData: barray,
                    Botadapter: this.botadapter,
                    title: OBJECT.INFODATA.result.title
                });
                await this.e.reply([`请在120秒内输入 第?集 选择集数`]);
                const context = await karin.ctx(this.e, { reply: true });
                const regex = context.msg.match(/第([一二三四五六七八九十百千万0-9]+)集/);
                let Episode;
                if (regex && regex[1]) {
                    Episode = regex[1];
                    // 检查是否为中文数字，如果是则转换为阿拉伯数字
                    if (/^[一二三四五六七八九十百千万]+$/.test(Episode)) {
                        Episode = Common.chineseToArabic(Episode).toString();
                    }
                    this.downloadfilename = OBJECT.INFODATA.result.episodes[Number(Episode) - 1].share_copy.substring(0, 50).replace(/[\\/:\*\?"<>\|\r\n\s]/g, ' ');
                    this.e.reply(`收到请求，第${Episode}集\n${this.downloadfilename}\n正在下载中`);
                }
                else {
                    logger.debug(Episode);
                    this.e.reply('匹配内容失败，请重新发送链接再次解析');
                    return true;
                }
                const bangumidataBASEURL = bilibiliAPI.番剧视频流信息({
                    cid: OBJECT.INFODATA.result.episodes[Number(Episode) - 1].cid,
                    ep_id: OBJECT.INFODATA.result.episodes[Number(Episode) - 1].ep_id
                });
                const QUERY = await genParams(bangumidataBASEURL);
                if (QUERY.STATUS === '!isLogin')
                    await this.e.reply('B站ck未配置或已失效，无法获取视频流，可尝试【#B站登录】以配置新ck');
                const DATA = await new Networks({
                    url: bangumidataBASEURL + QUERY.QUERY,
                    headers: this.headers
                }).getData();
                OBJECT.DATA = { ...DATA };
                if (OBJECT.INFODATA.result.episodes[Number(Episode) - 1].badge === '会员' && !this.ISVIP) {
                    logger.warn('该CK不是大会员，无法获取视频流');
                    return true;
                }
                await this.getvideo({
                    ...OBJECT,
                    video_url: this.ISVIP ? OBJECT.DATA.result.dash.video[0].base_url : OBJECT.DATA.result.dash.video[0].base_url,
                    audio_url: OBJECT.DATA.result.dash.audio[0].base_url
                });
                break;
            }
            case 'dynamic_info': {
                switch (OBJECT.dynamicINFO.data.item.type) {
                    /** 图文、纯图 */
                    case 'DYNAMIC_TYPE_DRAW': {
                        const imgArray = [];
                        for (const img of OBJECT.dynamicINFO.data.item.modules.module_dynamic.major && OBJECT.dynamicINFO.data.item.modules.module_dynamic?.major?.draw?.items) {
                            imgArray.push(segment.image(img.src));
                        }
                        // const commentsdata = bilibiliComments(OBJECT)
                        // img = await Render('bilibili/comment', {
                        //   Type: '动态',
                        //   CommentsData: commentsdata,
                        //   CommentLength: String(commentsdata?.length ? commentsdata.length : 0),
                        //   share_url: 'https://t.bilibili.com/' + OBJECT.dynamicINFO.data.item.id_str,
                        //   ImageLength: OBJECT.dynamicINFO.data.item.modules?.module_dynamic?.major?.draw?.items?.length || '动态中没有附带图片',
                        //   shareurl: '动态分享链接'
                        // })
                        // if (imgArray.length === 1) await this.e.reply(imgArray[0])
                        // if (imgArray.length > 1) {
                        //   const forwardMsg = common.makeForward(imgArray, this.e.sender.uin, this.e.sender.nick)
                        //   await this.e.bot.sendForwardMessage(this.e.contact, forwardMsg)
                        // }
                        // if (Config.bilibili.comment) await this.e.reply(img)
                        const dynamicCARD = JSON.parse(OBJECT.dynamicINFO_CARD.data.card.card);
                        const cover = () => {
                            const imgArray = [];
                            for (let i = 0; i < dynamicCARD.item.pictures.length; i++) {
                                const obj = {
                                    image_src: dynamicCARD.item.pictures[i].img_src
                                };
                                imgArray.push(obj);
                            }
                            return imgArray;
                        };
                        if ('topic' in OBJECT.dynamicINFO.data.item.modules.module_dynamic) {
                            const name = OBJECT.dynamicINFO.data.item.modules.module_dynamic.topic.name;
                            OBJECT.dynamicINFO.data.item.modules.module_dynamic.desc.rich_text_nodes.unshift({
                                orig_text: name,
                                text: name,
                                type: 'topic'
                            });
                            OBJECT.dynamicINFO.data.item.modules.module_dynamic.desc.text = `${name}\n\n` + OBJECT.dynamicINFO.data.item.modules.module_dynamic.desc.text;
                        }
                        await this.e.reply(await Render('bilibili/dynamic/DYNAMIC_TYPE_DRAW', {
                            image_url: cover(),
                            text: replacetext(br(OBJECT.dynamicINFO.data.item.modules.module_dynamic.desc.text), OBJECT.dynamicINFO),
                            dianzan: this.count(OBJECT.dynamicINFO.data.item.modules.module_stat.like.count),
                            pinglun: this.count(OBJECT.dynamicINFO.data.item.modules.module_stat.comment.count),
                            share: this.count(OBJECT.dynamicINFO.data.item.modules.module_stat.forward.count),
                            create_time: OBJECT.dynamicINFO.data.item.modules.module_author.pub_time,
                            avater_url: OBJECT.dynamicINFO.data.item.modules.module_author.face,
                            frame: OBJECT.dynamicINFO.data.item.modules.module_author.pendant.image,
                            share_url: 'https://t.bilibili.com/' + OBJECT.dynamicINFO.data.item.id_str,
                            username: checkvip(OBJECT.USERDATA.data.card),
                            fans: this.count(OBJECT.USERDATA.data.follower),
                            user_shortid: OBJECT.dynamicINFO.data.item.modules.module_author.mid,
                            total_favorited: this.count(OBJECT.USERDATA.data.like_num),
                            following_count: this.count(OBJECT.USERDATA.data.card.attention),
                            Botadapter: this.botadapter,
                            dynamicTYPE: '图文动态'
                        }));
                        break;
                    }
                    /** 纯文 */
                    case 'DYNAMIC_TYPE_WORD': {
                        const text = replacetext(br(OBJECT.dynamicINFO.data.item.modules.module_dynamic.desc.text), OBJECT.dynamicINFO);
                        await this.e.reply(await Render('bilibili/dynamic/DYNAMIC_TYPE_WORD', {
                            text,
                            dianzan: this.count(OBJECT.dynamicINFO.data.item.modules.module_stat.like.count),
                            pinglun: this.count(OBJECT.dynamicINFO.data.item.modules.module_stat.comment.count),
                            share: this.count(OBJECT.dynamicINFO.data.item.modules.module_stat.forward.count),
                            create_time: OBJECT.dynamicINFO.data.item.modules.module_author.pub_time,
                            avater_url: OBJECT.dynamicINFO.data.item.modules.module_author.face,
                            frame: OBJECT.dynamicINFO.data.item.modules.module_author.pendant.image,
                            share_url: 'https://t.bilibili.com/' + OBJECT.dynamicINFO.data.item.id_str,
                            username: checkvip(OBJECT.USERDATA.data.card),
                            fans: this.count(OBJECT.USERDATA.data.follower),
                            user_shortid: OBJECT.dynamicINFO.data.item.modules.module_author.mid,
                            total_favorited: this.count(OBJECT.USERDATA.data.like_num),
                            following_count: this.count(OBJECT.USERDATA.data.card.attention),
                            Botadapter: this.botadapter,
                            dynamicTYPE: '纯文动态'
                        }));
                        await this.e.reply(await Render('bilibili/comment', {
                            Type: '动态',
                            CommentsData: bilibiliComments(OBJECT),
                            CommentLength: String((bilibiliComments(OBJECT)?.length) ? bilibiliComments(OBJECT).length : 0),
                            share_url: 'https://t.bilibili.com/' + OBJECT.dynamicINFO.data.item.id_str,
                            ImageLength: OBJECT.dynamicINFO.data.item.modules?.module_dynamic?.major?.draw?.items?.length || '动态中没有附带图片',
                            shareurl: '动态分享链接',
                            Botadapter: this.botadapter
                        }));
                        break;
                    }
                    default:
                        break;
                }
                break;
            }
            case 'live_room_detail': {
                if (OBJECT.room_init_info.data.live_status === 0) {
                    await this.e.reply(`${OBJECT.USERDATA.data.card.name} 未开播，正在休息中~`);
                    return true;
                }
                const img = await Render('bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD', {
                    image_url: [{ image_src: OBJECT.live_info.data.user_cover }],
                    text: br(OBJECT.live_info.data.title),
                    liveinf: br(`${OBJECT.live_info.data.area_name} | 房间号: ${OBJECT.live_info.data.room_id}`),
                    username: OBJECT.USERDATA.data.card.name,
                    avater_url: OBJECT.USERDATA.data.card.face,
                    frame: OBJECT.dynamicINFO.data.item.modules.module_author.pendant.image,
                    fans: this.count(OBJECT.USERDATA.data.card.fans),
                    create_time: OBJECT.live_info.data.live_time === -62170012800 ? '获取失败' : OBJECT.live_info.data.live_time,
                    now_time: 114514,
                    share_url: 'https://live.bilibili.com/' + OBJECT.live_info.data.room_id,
                    dynamicTYPE: '直播'
                });
                await this.e.reply(img);
                break;
            }
            default:
                break;
        }
    }
    async getvideo(OBJECT) {
        /** 获取视频 => FFmpeg合成 */
        if (Config.bilibili.videopriority === true) {
            this.STATUS = '!isLogin';
        }
        switch (this.STATUS) {
            case 'isLogin': {
                const bmp4 = await this.DownLoadFile(this.TYPE === 'one_video' ? OBJECT.DATA.data?.dash?.video[0].base_url : OBJECT.video_url, {
                    title: `Bil_V_${this.TYPE === 'one_video' ? OBJECT.INFODATA.data.bvid : OBJECT.INFODATA.result.episodes[0].bvid}`,
                    headers: this.headers,
                    filetype: '.mp4'
                });
                const bmp3 = await this.DownLoadFile(this.TYPE === 'one_video' ? OBJECT.DATA.data?.dash?.audio[0].base_url : OBJECT.audio_url, {
                    title: `Bil_A_${this.TYPE === 'one_video' ? OBJECT.INFODATA.data.bvid : OBJECT.INFODATA.result.episodes[0].bvid}`,
                    headers: this.headers,
                    filetype: '.mp3'
                });
                if (bmp4.filepath && bmp3.filepath) {
                    await mergeFile('二合一（视频 + 音频）', {
                        path: bmp4.filepath,
                        path2: bmp3.filepath,
                        resultPath: Common.tempDri.video + `Bil_Result_${this.TYPE === 'one_video' ? OBJECT.INFODATA.data.bvid : OBJECT.INFODATA.result.episodes[0].bvid}.mp4`,
                        callback: async (success) => {
                            if (success) {
                                const filePath = Common.tempDri.video + `${Config.app.rmmp4 ? 'tmp_' + Date.now() : this.downloadfilename}.mp4`;
                                fs.renameSync(Common.tempDri.video + `Bil_Result_${this.TYPE === 'one_video' ? OBJECT.INFODATA.data.bvid : OBJECT.INFODATA.result.episodes[0].bvid}.mp4`, filePath);
                                logger.mark('正在尝试删除缓存文件');
                                await this.removeFile(bmp4.filepath, true);
                                await this.removeFile(bmp3.filepath, true);
                                const stats = fs.statSync(filePath);
                                const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2));
                                if (fileSizeInMB > Config.upload.groupfilevalue) {
                                    await this.e.reply(`视频大小: ${fileSizeInMB}MB 正通过群文件上传中...`);
                                    return await this.upload_file({ filepath: filePath, totalBytes: fileSizeInMB }, '', { useGroupFile: true });
                                }
                                else {
                                    /** 因为本地合成，没有视频直链 */
                                    return await this.upload_file({ filepath: filePath, totalBytes: fileSizeInMB }, '');
                                }
                            }
                            else {
                                await this.removeFile(bmp4.filepath, true);
                                await this.removeFile(bmp3.filepath, true);
                                return true;
                            }
                        }
                    });
                }
                break;
            }
            case '!isLogin': {
                /** 没登录（没配置ck）情况下直接发直链，传直链在DownLoadVideo()处理 */
                await this.DownLoadVideo({ video_url: OBJECT.DATA.data.durl[0].url, title: { timestampTitle: 'tmp_' + Date.now(), originTitle: this.downloadfilename } });
                break;
            }
            default:
                break;
        }
    }
    async getvideosize(videourl, audiourl, bvid) {
        const videoheaders = await new Networks({ url: videourl, headers: { ...this.headers, Referer: `https://api.bilibili.com/video/${bvid}` } }).getHeaders();
        const audioheaders = await new Networks({ url: audiourl, headers: { ...this.headers, Referer: `https://api.bilibili.com/video/${bvid}` } }).getHeaders();
        const videoSize = videoheaders['content-range']?.match(/\/(\d+)/) ? parseInt(videoheaders['content-range']?.match(/\/(\d+)/)[1], 10) : 0;
        const audioSize = audioheaders['content-range']?.match(/\/(\d+)/) ? parseInt(audioheaders['content-range']?.match(/\/(\d+)/)[1], 10) : 0;
        const videoSizeInMB = (videoSize / (1024 * 1024)).toFixed(2);
        const audioSizeInMB = (audioSize / (1024 * 1024)).toFixed(2);
        const totalSizeInMB = parseFloat(videoSizeInMB) + parseFloat(audioSizeInMB);
        return totalSizeInMB.toFixed(2);
    }
    /**
     * 检出应该下载的视频流
     * @param data 视频流数据
     * @returns 经过排除后的视频流数据（删减不符合Config.upload.filelimit条件的视频流）
     */
    async processVideos(data) {
        let results = {};
        for (let video of data.DATA.data.dash.video) {
            let size = await this.getvideosize(video.base_url, data.DATA.data.dash.audio[0].base_url, data.INFODATA.data.bvid);
            results[video.id] = size;
        }
        // 将结果对象的值转换为数字，并找到最接近但不超过 Config.upload.filelimit 的值
        let sizes = Object.values(results).map(size => parseFloat(size.replace('MB', '')));
        let closestId = null;
        let smallestDifference = Infinity;
        sizes.forEach((size, index) => {
            if (size <= Config.upload.filelimit) {
                let difference = Math.abs(size - Config.upload.filelimit);
                if (difference < smallestDifference) {
                    smallestDifference = difference;
                    closestId = Object.keys(results)[index];
                }
            }
        });
        if (closestId !== null) {
            // 找到最接近但不超过文件大小限制的视频清晰度
            const closestQuality = qnd[Number(closestId)];
            // 更新 OBJECT.DATA.data.accept_description
            data.DATA.data.accept_description = data.DATA.data.accept_description.filter((desc) => desc === closestQuality);
            if (data.DATA.data.accept_description.length === 0) {
                data.DATA.data.accept_description = [closestQuality];
            }
            // 找到对应的视频对象
            const video = data.DATA.data.dash.video.find((video) => video.id === Number(closestId));
            // 更新 OBJECT.DATA.data.dash.video 数组
            data.DATA.data.dash.video = [video];
        }
        else {
            // 如果没有找到符合条件的视频，使用最低画质的视频对象
            data.DATA.data.dash.video = [[...data.DATA.data.dash.video].pop()];
            // 更新 OBJECT.DATA.data.accept_description 为最低画质的描述
            data.DATA.data.accept_description = [...data.DATA.data.accept_description].pop();
        }
        return data;
    }
}
function checkvip(member) {
    return member.vip.vipStatus === 1
        ? `<span style="color: ${member.vip.nickname_color || '#FB7299'}; font-weight: bold;">${member.name}</span>`
        : `<span style="color: #606060">${member.name}</span>`;
}
function br(data) {
    return (data = data.replace(/\n/g, '<br>'));
}
function replacetext(text, obj) {
    for (const tag of obj.data.item.modules.module_dynamic.desc.rich_text_nodes) {
        // 对正则表达式中的特殊字符进行转义
        const escapedText = tag.orig_text.replace(/([.*+?^${}()|[\]\\])/g, '\\$1').replace(/\n/g, '\\n');
        const regex = new RegExp(escapedText, 'g');
        switch (tag.type) {
            case 'topic': {
                text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#006A9E'};"><svg style="width: 80px;height: 80px;margin: 0 -25px -25px 0;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="opus-module-topic__icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4302 2.57458C11.4416 2.51023 11.4439 2.43974 11.4218 2.3528C11.3281 1.98196 10.9517 1.72037 10.5284 1.7527C10.432 1.76018 10.3599 1.78383 10.297 1.81376C10.2347 1.84398 10.1832 1.88155 10.1401 1.92465C10.1195 1.94485 10.1017 1.96692 10.0839 1.98897L10.0808 1.99289L10.0237 2.06277L9.91103 2.2033C9.76177 2.39141 9.61593 2.58191 9.47513 2.77556C9.33433 2.96936 9.19744 3.16585 9.06672 3.36638C9.00275 3.46491 8.93968 3.56401 8.87883 3.66461L8.56966 3.6613C8.00282 3.6574 7.43605 3.65952 6.86935 3.67034C6.80747 3.56778 6.74325 3.46677 6.67818 3.3664C6.54732 3.16585 6.41045 2.96934 6.26968 2.77568C6.12891 2.58186 5.98309 2.39134 5.83387 2.20322L5.72122 2.06268L5.66416 1.99279L5.6622 1.99036C5.64401 1.96783 5.62586 1.94535 5.60483 1.92454C5.56192 1.88144 5.51022 1.84388 5.44797 1.81364C5.38522 1.78386 5.31305 1.76006 5.21665 1.75273C4.80555 1.72085 4.4203 1.97094 4.32341 2.35273C4.30147 2.43968 4.30358 2.51018 4.31512 2.57453C4.32715 2.63859 4.34975 2.69546 4.38112 2.74649C4.39567 2.77075 4.41283 2.79315 4.42999 2.81557C4.43104 2.81694 4.43209 2.81831 4.43314 2.81968L4.48759 2.89122L4.59781 3.03355C4.74589 3.22242 4.89739 3.40905 5.05377 3.59254C5.09243 3.63788 5.13136 3.68306 5.17057 3.72785C4.99083 3.73681 4.81112 3.7467 4.63143 3.75756C4.41278 3.771 4.19397 3.78537 3.97547 3.80206L3.64757 3.82786L3.48362 3.84177L3.39157 3.85181C3.36984 3.8543 3.34834 3.8577 3.32679 3.86111C3.31761 3.86257 3.30843 3.86402 3.29921 3.86541C3.05406 3.90681 2.81526 3.98901 2.59645 4.10752C2.37765 4.22603 2.17867 4.38039 2.00992 4.56302C1.84117 4.74565 1.70247 4.95593 1.60144 5.18337C1.50025 5.4105 1.43687 5.65447 1.41362 5.90153C1.33103 6.77513 1.27663 7.6515 1.25742 8.5302C1.23758 9.40951 1.25835 10.2891 1.3098 11.1655C1.32266 11.3846 1.33738 11.6035 1.35396 11.8223L1.38046 12.1505L1.39472 12.3144L1.39658 12.335L1.39906 12.3583L1.40417 12.4048C1.40671 12.4305 1.41072 12.4558 1.41473 12.4811C1.41561 12.4866 1.41648 12.4922 1.41734 12.4977C1.45717 12.7449 1.53806 12.9859 1.65567 13.2074C1.77314 13.4289 1.92779 13.6304 2.11049 13.8022C2.29319 13.974 2.50441 14.1159 2.73329 14.2197C2.96201 14.3235 3.2084 14.3901 3.45836 14.4135C3.47066 14.415 3.48114 14.4159 3.49135 14.4167C3.49477 14.417 3.49817 14.4173 3.50159 14.4176L3.5425 14.4212L3.62448 14.4283L3.78843 14.4417L4.11633 14.4674C4.33514 14.4831 4.55379 14.4983 4.7726 14.5111C6.52291 14.6145 8.27492 14.6346 10.0263 14.5706C10.4642 14.5547 10.9019 14.5332 11.3396 14.5062C11.5584 14.4923 11.7772 14.4776 11.9959 14.4604L12.3239 14.434L12.4881 14.4196L12.5813 14.4093C12.6035 14.4065 12.6255 14.403 12.6474 14.3995C12.6565 14.3981 12.6655 14.3966 12.6746 14.3952C12.9226 14.3527 13.1635 14.2691 13.3844 14.1486C13.6052 14.0284 13.8059 13.8716 13.9759 13.6868C14.1463 13.5022 14.2861 13.2892 14.3874 13.0593C14.4381 12.9444 14.4793 12.8253 14.5108 12.7037C14.519 12.6734 14.5257 12.6428 14.5322 12.612L14.5421 12.566L14.55 12.5196C14.5556 12.4887 14.5607 12.4578 14.5641 12.4266C14.5681 12.3959 14.5723 12.363 14.5746 12.3373C14.6642 11.4637 14.7237 10.5864 14.7435 9.70617C14.764 8.825 14.7347 7.94337 14.6719 7.06715C14.6561 6.8479 14.6385 6.62896 14.6183 6.41033L14.5867 6.08246L14.5697 5.91853L14.5655 5.87758C14.5641 5.86445 14.5618 5.8473 14.5599 5.83231C14.5588 5.8242 14.5578 5.81609 14.5567 5.80797C14.5538 5.78514 14.5509 5.76229 14.5466 5.7396C14.5064 5.49301 14.4252 5.25275 14.3067 5.03242C14.1886 4.81208 14.0343 4.61153 13.8519 4.44095C13.6695 4.27038 13.4589 4.12993 13.2311 4.02733C13.0033 3.92458 12.7583 3.85907 12.5099 3.83636C12.4974 3.83492 12.4865 3.83394 12.4759 3.833C12.4729 3.83273 12.4698 3.83246 12.4668 3.83219L12.4258 3.82879L12.3438 3.82199L12.1798 3.80886L11.8516 3.78413C11.633 3.76915 11.4143 3.75478 11.1955 3.74288C10.993 3.73147 10.7904 3.72134 10.5878 3.71243L10.6914 3.59236C10.8479 3.40903 10.9992 3.22242 11.1473 3.03341L11.2576 2.89124L11.312 2.81971C11.3136 2.81773 11.3151 2.81575 11.3166 2.81377C11.3333 2.79197 11.3501 2.77013 11.3641 2.74653C11.3954 2.6955 11.418 2.63863 11.4302 2.57458ZM9.33039 5.49268C9.38381 5.16945 9.67705 4.95281 9.98536 5.00882L9.98871 5.00944C10.2991 5.06783 10.5063 5.37802 10.4524 5.70377L10.2398 6.99039L11.3846 6.9904C11.7245 6.9904 12 7.27925 12 7.63557C12 7.99188 11.7245 8.28073 11.3846 8.28073L10.0266 8.28059L9.7707 9.82911L11.0154 9.82913C11.3553 9.82913 11.6308 10.118 11.6308 10.4743C11.6308 10.8306 11.3553 11.1195 11.0154 11.1195L9.55737 11.1195L9.32807 12.5073C9.27465 12.8306 8.98141 13.0472 8.6731 12.9912L8.66975 12.9906C8.35937 12.9322 8.1522 12.622 8.20604 12.2962L8.40041 11.1195H6.89891L6.66961 12.5073C6.61619 12.8306 6.32295 13.0472 6.01464 12.9912L6.01129 12.9906C5.7009 12.9322 5.49374 12.622 5.54758 12.2962L5.74196 11.1195L4.61538 11.1195C4.27552 11.1195 4 10.8306 4 10.4743C4 10.118 4.27552 9.82913 4.61538 9.82913L5.95514 9.82911L6.21103 8.28059L4.98462 8.28073C4.64475 8.28073 4.36923 7.99188 4.36923 7.63557C4.36923 7.27925 4.64475 6.9904 4.98462 6.9904L6.42421 6.99039L6.67193 5.49268C6.72535 5.16945 7.01859 4.95281 7.3269 5.00882L7.33025 5.00944C7.64063 5.06783 7.8478 5.37802 7.79396 5.70377L7.58132 6.99039H9.08281L9.33039 5.49268ZM8.61374 9.82911L8.86963 8.28059H7.36813L7.11225 9.82911H8.61374Z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`);
                break;
            }
            case 'RICH_TEXT_NODE_TYPE_TOPIC':
            case 'RICH_TEXT_NODE_TYPE_AT': {
                text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#006A9E'};">${tag.orig_text}</span>`);
                break;
            }
            case 'RICH_TEXT_NODE_TYPE_LOTTERY': {
                text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#006A9E'};"><svg style="width: 65px;height: 65px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M3.7499750000000005 9.732083333333334C4.095158333333333 9.732083333333334 4.374975 10.011875000000002 4.374975 10.357083333333334L4.374975 15.357083333333334C4.374975 15.899458333333335 4.8147 16.339166666666667 5.357116666666667 16.339166666666667L14.642833333333334 16.339166666666667C15.185250000000002 16.339166666666667 15.625 15.899458333333335 15.625 15.357083333333334L15.625 10.357083333333334C15.625 10.011875000000002 15.904791666666668 9.732083333333334 16.25 9.732083333333334C16.595166666666668 9.732083333333334 16.875 10.011875000000002 16.875 10.357083333333334L16.875 15.357083333333334C16.875 16.589833333333335 15.875625000000001 17.589166666666667 14.642833333333334 17.589166666666667L5.357116666666667 17.589166666666667C4.124341666666667 17.589166666666667 3.124975 16.589833333333335 3.124975 15.357083333333334L3.124975 10.357083333333334C3.124975 10.011875000000002 3.4048 9.732083333333334 3.7499750000000005 9.732083333333334z" fill="currentColor"></path><path d="M2.4106916666666667 7.3214250000000005C2.4106916666666667 6.384516666666666 3.1702083333333335 5.625 4.107116666666667 5.625L15.892833333333334 5.625C16.82975 5.625 17.58925 6.384516666666666 17.58925 7.3214250000000005L17.58925 8.917583333333335C17.58925 9.74225 16.987583333333337 10.467208333333334 16.13125 10.554C15.073666666666668 10.661208333333335 13.087708333333333 10.803583333333334 10 10.803583333333334C6.912275 10.803583333333334 4.9263 10.661208333333335 3.8687250000000004 10.554C3.0123833333333336 10.467208333333334 2.4106916666666667 9.74225 2.4106916666666667 8.917583333333335L2.4106916666666667 7.3214250000000005zM4.107116666666667 6.875C3.8605666666666667 6.875 3.6606916666666667 7.0748750000000005 3.6606916666666667 7.3214250000000005L3.6606916666666667 8.917583333333335C3.6606916666666667 9.135250000000001 3.8040833333333333 9.291041666666667 3.9947583333333334 9.310375C5.0068 9.412958333333334 6.950525000000001 9.553583333333334 10 9.553583333333334C13.049458333333334 9.553583333333334 14.993166666666669 9.412958333333334 16.005166666666668 9.310375C16.195875 9.291041666666667 16.33925 9.135250000000001 16.33925 8.917583333333335L16.33925 7.3214250000000005C16.33925 7.0748750000000005 16.139375 6.875 15.892833333333334 6.875L4.107116666666667 6.875z" fill="currentColor"></path><path d="M5.446408333333333 4.464341666666667C5.446408333333333 3.1329416666666665 6.525716666666667 2.0536333333333334 7.857116666666667 2.0536333333333334C9.188541666666666 2.0536333333333334 10.267833333333334 3.1329416666666665 10.267833333333334 4.464341666666667L10.267833333333334 6.875058333333333L7.857116666666667 6.875058333333333C6.525716666666667 6.875058333333333 5.446408333333333 5.795741666666666 5.446408333333333 4.464341666666667zM7.857116666666667 3.3036333333333334C7.216075000000001 3.3036333333333334 6.696408333333334 3.8233 6.696408333333334 4.464341666666667C6.696408333333334 5.105391666666667 7.216075000000001 5.6250583333333335 7.857116666666667 5.6250583333333335L9.017833333333334 5.6250583333333335L9.017833333333334 4.464341666666667C9.017833333333334 3.8233 8.498166666666668 3.3036333333333334 7.857116666666667 3.3036333333333334z" fill="currentColor"></path><path d="M9.732083333333334 4.464341666666667C9.732083333333334 3.1329416666666665 10.811416666666666 2.0536333333333334 12.142833333333334 2.0536333333333334C13.474250000000001 2.0536333333333334 14.553583333333336 3.1329416666666665 14.553583333333336 4.464341666666667C14.553583333333336 5.795741666666666 13.474250000000001 6.875058333333333 12.142833333333334 6.875058333333333L9.732083333333334 6.875058333333333L9.732083333333334 4.464341666666667zM12.142833333333334 3.3036333333333334C11.501791666666666 3.3036333333333334 10.982083333333334 3.8233 10.982083333333334 4.464341666666667L10.982083333333334 5.6250583333333335L12.142833333333334 5.6250583333333335C12.783875 5.6250583333333335 13.303583333333334 5.105391666666667 13.303583333333334 4.464341666666667C13.303583333333334 3.8233 12.783875 3.3036333333333334 12.142833333333334 3.3036333333333334z" fill="currentColor"></path><path d="M10 4.732058333333334C10.345166666666666 4.732058333333334 10.625 5.011875 10.625 5.357058333333334L10.625 16.428500000000003C10.625 16.773666666666667 10.345166666666666 17.053500000000003 10 17.053500000000003C9.654791666666668 17.053500000000003 9.375 16.773666666666667 9.375 16.428500000000003L9.375 5.357058333333334C9.375 5.011875 9.654791666666668 4.732058333333334 10 4.732058333333334z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`);
                break;
            }
            case 'RICH_TEXT_NODE_TYPE_WEB': {
                text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#006A9E'};"><svg style="width: 60px;height: 60px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M9.571416666666666 7.6439C9.721125 7.33675 10.091416666666667 7.209108333333334 10.398583333333335 7.358808333333333C10.896041666666667 7.540316666666667 11.366333333333333 7.832000000000001 11.767333333333333 8.232975C13.475833333333334 9.941541666666668 13.475833333333334 12.711625 11.767333333333333 14.420166666666669L9.704916666666666 16.482583333333334C7.996383333333334 18.191125000000003 5.226283333333334 18.191125000000003 3.5177416666666668 16.482583333333334C1.8091916666666668 14.774041666666669 1.8091916666666668 12.003916666666667 3.5177416666666668 10.295375L5.008791666666667 8.804333333333334C5.252875 8.56025 5.6486 8.56025 5.892683333333334 8.804333333333334C6.136758333333334 9.048416666666668 6.136758333333334 9.444125000000001 5.892683333333334 9.688208333333334L4.401625 11.179250000000001C3.1812333333333336 12.399666666666667 3.1812333333333336 14.378291666666668 4.401625 15.598708333333335C5.622000000000001 16.819083333333335 7.60065 16.819083333333335 8.821041666666668 15.598708333333335L10.883416666666667 13.536291666666667C12.103833333333334 12.315916666666666 12.103833333333334 10.337250000000001 10.883416666666667 9.116875C10.582458333333333 8.815875 10.229416666666667 8.600908333333333 9.856458333333334 8.471066666666667C9.549333333333333 8.321375 9.421708333333335 7.9510499999999995 9.571416666666666 7.6439z" fill="currentColor"></path><path d="M15.597541666666668 4.402641666666667C14.377166666666668 3.1822500000000002 12.398541666666667 3.1822500000000002 11.178125000000001 4.402641666666667L9.11575 6.465033333333333C7.895358333333333 7.685425 7.895358333333333 9.664041666666668 9.11575 10.884458333333333C9.397666666666668 11.166375 9.725916666666667 11.371583333333334 10.073083333333333 11.500958333333333C10.376583333333334 11.658083333333334 10.495291666666667 12.031416666666667 10.338208333333332 12.334875C10.181083333333333 12.638375 9.80775 12.757083333333334 9.504291666666667 12.6C9.042416666666666 12.420333333333334 8.606383333333333 12.142833333333334 8.231858333333333 11.768333333333334C6.523316666666667 10.059791666666667 6.523316666666667 7.289691666666666 8.231858333333333 5.58115L10.29425 3.5187583333333334C12.002791666666667 1.8102083333333334 14.772875 1.8102083333333334 16.481458333333336 3.5187583333333334C18.19 5.2273000000000005 18.19 7.997400000000001 16.481458333333336 9.705916666666667L15.054916666666667 11.132458333333334C14.810875000000001 11.3765 14.415166666666668 11.3765 14.171041666666667 11.132458333333334C13.927 10.888333333333334 13.927 10.492625 14.171041666666667 10.248541666666666L15.597541666666668 8.822041666666667C16.81791666666667 7.601666666666667 16.81791666666667 5.623025 15.597541666666668 4.402641666666667z" fill="currentColor"></path></svg> ${tag.text}</span>`);
                break;
            }
            case 'RICH_TEXT_NODE_TYPE_EMOJI': {
                const regex = new RegExp(tag.orig_text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                text = text.replace(regex, `<img src='${tag.emoji.icon_url}' style='height: 60px; margin: 0 0 -10px 0;'>`);
                break;
            }
        }
    }
    return text;
}
const qnd = {
    6: '极速 240P',
    16: '流畅 360P',
    32: '清晰480P',
    64: '高清720P',
    74: '高帧率 720P60',
    80: '高清 1080P',
    112: '高码率 1080P+',
    116: '高帧率 1080P60',
    120: '超清 4K',
    125: '真彩色 HDR ',
    126: '杜比视界',
    127: '超高清 8K'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlsaWJpbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0vYmlsaWJpbGkvYmlsaWJpbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDbEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUM3QyxPQUFPLEtBQUssRUFBRSxFQUFnQixPQUFPLEVBQUUsTUFBTSxFQUF3QixNQUFNLFlBQVksQ0FBQTtBQUN2RixPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFHeEIsSUFBSSxHQUFzRCxDQUFBO0FBRTFELE1BQU0sT0FBTyxRQUFTLFNBQVEsSUFBSTtJQUNoQyxDQUFDLENBQWM7SUFDZixJQUFJLENBQUs7SUFDVCxNQUFNLENBQUs7SUFDWCxLQUFLLENBQVM7SUFDZCxJQUFJLENBQTRDO0lBQ2hELE9BQU8sQ0FBUztJQUNoQixnQkFBZ0IsQ0FBUTtJQUN4QixJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUE7SUFDbEMsQ0FBQztJQUNELFlBQWEsQ0FBZSxFQUFFLElBQVM7UUFDckMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ1IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDVixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUE7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVB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