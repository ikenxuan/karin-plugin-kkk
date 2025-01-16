import { getBilibiliData } from '@ikenxuan/amagi';
import { common, karin, logger, segment } from 'node-karin';
import { Base, Common, Config, DB, Render } from '../../module/index.js';
import { cover, fetchBilibiliData, generateDecorationCard, replacetext } from '../../platform/bilibili/index.js';
/** 已支持推送的动态类型 */
export var DynamicType;
(function (DynamicType) {
    DynamicType["AV"] = "DYNAMIC_TYPE_AV";
    DynamicType["DRAW"] = "DYNAMIC_TYPE_DRAW";
    DynamicType["WORD"] = "DYNAMIC_TYPE_WORD";
    DynamicType["LIVE_RCMD"] = "DYNAMIC_TYPE_LIVE_RCMD";
    DynamicType["FORWARD"] = "DYNAMIC_TYPE_FORWARD";
})(DynamicType || (DynamicType = {}));
export class Bilibilipush extends Base {
    force = false;
    /**
     *
     * @param e 事件对象，提供给实例使用的事件相关信息，默认为空对象{}
     * @param force 强制执行标志，用于控制实例行为，默认false
     * @returns
     */
    constructor(e = {}, force = false) {
        super(e); // 调用父类的构造函数
        // 判断当前bot适配器是否为'QQBot'，如果是，则直接返回true，否则继续执行
        if (this.botadapter === 'QQBot') {
            e.reply('不支持QQBot，请使用其他适配器');
            return;
        }
        this.force = force; // 保存传入的强制执行标志
    }
    /**
     * 执行主要的操作流程，包括检查缓存并根据需要获取和更新用户数据。
     * @returns
     */
    async action() {
        if (await this.checkremark())
            return true;
        try {
            const data = await this.getDynamicList(Config.pushlist.bilibili);
            const pushdata = this.excludeAlreadyPushed(data.willbepushlist, data.DBdata);
            if (Object.keys(pushdata).length === 0)
                return true;
            if (this.force)
                return await this.forcepush(pushdata);
            else
                return await this.getdata(pushdata);
        }
        catch (error) {
            logger.error(error);
        }
    }
    /**
     * 异步获取数据并根据动态类型处理和发送动态信息。
     * @param data 包含动态相关信息的对象。
     */
    async getdata(data) {
        let nocd_data;
        for (const dynamicId in data) {
            // 检查banWords，banTags
            let skip = skipDynamic(data[dynamicId].Dynamic_Data);
            let send_video = true;
            let img = [];
            const dynamicCARDINFO = await fetchBilibiliData('dynamic_card', { dynamic_id: dynamicId });
            const dycrad = dynamicCARDINFO.data.card && dynamicCARDINFO.data.card.card && JSON.parse(dynamicCARDINFO.data.card.card);
            if (!skip) {
                const userINFO = await fetchBilibiliData('user_profile', { host_mid: data[dynamicId].host_mid });
                let emojiDATA = await fetchBilibiliData('emoji_list');
                emojiDATA = extractEmojisData(emojiDATA.data.packages);
                logger.debug(`UP: ${data[dynamicId].remark}\n动态id：${dynamicId}\nhttps://t.bilibili.com/${dynamicId}`);
                switch (data[dynamicId].dynamic_type) {
                    /** 处理图文动态 */
                    case DynamicType.DRAW: {
                        if ('topic' in data[dynamicId].Dynamic_Data.modules.module_dynamic && data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null) {
                            const name = data[dynamicId].Dynamic_Data.modules.module_dynamic.topic.name;
                            data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes.unshift({
                                orig_text: name,
                                text: name,
                                type: 'topic'
                            });
                            data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text = `${name}\n\n` + data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text;
                        }
                        img = await Render('bilibili/dynamic/DYNAMIC_TYPE_DRAW', {
                            image_url: cover(dycrad.item.pictures),
                            text: replacetext(br(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes),
                            dianzan: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
                            pinglun: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
                            share: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
                            create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                            avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                            frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                            share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
                            username: checkvip(userINFO.data.card),
                            fans: this.count(userINFO.data.follower),
                            user_shortid: data[dynamicId].host_mid,
                            total_favorited: this.count(userINFO.data.like_num),
                            following_count: this.count(userINFO.data.card.attention),
                            decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.modules.module_author.decorate),
                            render_time: Common.getCurrentTime(),
                            dynamicTYPE: '图文动态推送'
                        });
                        break;
                    }
                    /** 处理纯文动态 */
                    case DynamicType.WORD: {
                        let text = replacetext(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text, data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes);
                        for (const item of emojiDATA) {
                            if (text.includes(item.text)) {
                                if (text.includes('[') && text.includes(']')) {
                                    text = text.replace(/\[[^\]]*\]/g, `<img src="${item.url}"/>`).replace(/\\/g, '');
                                }
                                text += '&#160';
                            }
                        }
                        img = await Render('bilibili/dynamic/DYNAMIC_TYPE_WORD', {
                            text: br(text),
                            dianzan: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
                            pinglun: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
                            share: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
                            create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                            avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                            frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                            share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
                            username: checkvip(userINFO.data.card),
                            fans: this.count(userINFO.data.follower),
                            user_shortid: data[dynamicId].host_mid,
                            total_favorited: this.count(userINFO.data.like_num),
                            following_count: this.count(userINFO.data.card.attention),
                            dynamicTYPE: '纯文动态推送'
                        });
                        break;
                    }
                    /** 处理视频动态 */
                    case DynamicType.AV: {
                        if (data[dynamicId].Dynamic_Data.modules.module_dynamic.major.type === 'MAJOR_TYPE_ARCHIVE') {
                            const aid = data[dynamicId].Dynamic_Data.modules.module_dynamic.major.archive.aid;
                            const bvid = data[dynamicId].Dynamic_Data.modules.module_dynamic.major.archive.bvid;
                            const INFODATA = await getBilibiliData('单个视频作品数据', '', { bvid });
                            /** 特殊字段，只有番剧和影视才会有，如果是该类型视频，默认不发送 */
                            if (INFODATA.data.redirect_url) {
                                send_video = false;
                                logger.debug(`UP主：${INFODATA.data.owner.name} 的该动态类型为${logger.yellow('番剧或影视')}，默认跳过不下载，直达：${logger.green(INFODATA.data.redirect_url)}`);
                            }
                            else {
                                nocd_data = await getBilibiliData('单个视频下载信息数据', '', { avid: aid, cid: INFODATA.data.cid });
                            }
                            img = await Render('bilibili/dynamic/DYNAMIC_TYPE_AV', {
                                image_url: [{ image_src: INFODATA.data.pic }],
                                text: br(INFODATA.data.title),
                                desc: br(dycrad.desc),
                                dianzan: this.count(INFODATA.data.stat.like),
                                pinglun: this.count(INFODATA.data.stat.reply),
                                share: this.count(INFODATA.data.stat.share),
                                view: this.count(dycrad.stat.view),
                                coin: this.count(dycrad.stat.coin),
                                duration_text: data[dynamicId].Dynamic_Data.modules.module_dynamic.major.archive.duration_text,
                                create_time: Common.convertTimestampToDateTime(INFODATA.data.ctime),
                                avatar_url: INFODATA.data.owner.face,
                                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                                share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str || 'https://www.bilibili.com/video/' + bvid,
                                username: checkvip(userINFO.data.card),
                                fans: this.count(userINFO.data.follower),
                                user_shortid: data[dynamicId].host_mid,
                                total_favorited: this.count(userINFO.data.like_num),
                                following_count: this.count(userINFO.data.card.attention),
                                dynamicTYPE: '视频动态推送'
                            });
                        }
                        break;
                    }
                    /** 处理直播动态 */
                    case DynamicType.LIVE_RCMD: {
                        img = await Render('bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD', {
                            image_url: [{ image_src: dycrad.live_play_info.cover }],
                            text: br(dycrad.live_play_info.title),
                            liveinf: br(`${dycrad.live_play_info.area_name} | 房间号: ${dycrad.live_play_info.room_id}`),
                            username: checkvip(userINFO.data.card),
                            avatar_url: userINFO.data.card.face,
                            frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                            fans: this.count(userINFO.data.follower),
                            create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                            now_time: Common.getCurrentTime(),
                            share_url: 'https://live.bilibili.com/' + dycrad.live_play_info.room_id,
                            dynamicTYPE: '直播动态推送'
                        });
                        break;
                    }
                    /** 处理转发动态 */
                    case DynamicType.FORWARD: {
                        const text = replacetext(br(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes);
                        let param = {};
                        switch (data[dynamicId].Dynamic_Data.orig.type) {
                            case DynamicType.AV: {
                                param = {
                                    username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                                    pub_action: data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_action,
                                    avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                                    duration_text: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive.duration_text,
                                    title: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive.title,
                                    danmaku: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive.stat.danmaku,
                                    play: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive.stat.play,
                                    cover: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive.cover,
                                    create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                                    decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                                    frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                                };
                                break;
                            }
                            case DynamicType.DRAW: {
                                const dynamicCARD = await getBilibiliData('动态卡片数据', Config.cookies.bilibili, { dynamic_id: data[dynamicId].Dynamic_Data.orig.id_str });
                                const cardData = JSON.parse(dynamicCARD.data.card.card);
                                param = {
                                    username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                                    create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                                    avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                                    text: replacetext(br(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.desc.rich_text_nodes),
                                    image_url: cover(cardData.item.pictures),
                                    decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                                    frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                                };
                                break;
                            }
                            case DynamicType.WORD: {
                                param = {
                                    username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                                    create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                                    avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                                    text: replacetext(br(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.desc.rich_text_nodes),
                                    decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                                    frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                                };
                                break;
                            }
                            case DynamicType.LIVE_RCMD: {
                                const liveData = JSON.parse(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.live_rcmd.content);
                                param = {
                                    username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                                    create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                                    avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                                    decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                                    frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image,
                                    cover: liveData.live_play_info.cover,
                                    text_large: liveData.live_play_info.watched_show.text_large,
                                    area_name: liveData.live_play_info.area_name,
                                    title: liveData.live_play_info.title,
                                    online: liveData.live_play_info.online
                                };
                                break;
                            }
                            case DynamicType.FORWARD:
                            default: {
                                logger.warn(`UP主：${data[dynamicId].remark}的${logger.green('转发动态')}转发的原动态类型为「${logger.yellow(data[dynamicId].Dynamic_Data.orig.type)}」暂未支持解析`);
                                break;
                            }
                        }
                        img = await Render('bilibili/dynamic/DYNAMIC_TYPE_FORWARD', {
                            text,
                            dianzan: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
                            pinglun: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
                            share: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
                            create_time: data[dynamicId].Dynamic_Data.modules.module_author.pub_time,
                            avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                            frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                            share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
                            username: checkvip(userINFO.data.card),
                            fans: this.count(userINFO.data.follower),
                            user_shortid: data[dynamicId].Dynamic_Data.modules.module_author.mid,
                            total_favorited: this.count(userINFO.data.like_num),
                            following_count: this.count(userINFO.data.card.attention),
                            dynamicTYPE: '转发动态推送',
                            decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.modules.module_author.decorate),
                            render_time: Common.getCurrentTime(),
                            original_content: { [data[dynamicId].Dynamic_Data.orig.type]: param }
                        });
                        break;
                    }
                    /** 未处理的动态类型 */
                    default: {
                        skip = true;
                        logger.warn(`UP主：${data[dynamicId].remark}「${data[dynamicId].dynamic_type}」动态类型的暂未支持推送\n动态地址：${'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str}`);
                        break;
                    }
                }
            }
            // 遍历 group_id 数组，并发送消息
            for (const groupId of data[dynamicId].group_id) {
                let status;
                if (!skip) {
                    const [group_id, uin] = groupId.split(':');
                    const bot = karin.getBot(uin);
                    status = await karin.sendMsg(String(uin), karin.contactGroup(group_id), img ? [...img] : []);
                    if (Config.bilibili.push.parsedynamic) {
                        switch (data[dynamicId].dynamic_type) {
                            case 'DYNAMIC_TYPE_AV': {
                                if (send_video) {
                                    await this.DownLoadVideo({
                                        video_url: nocd_data.data.durl[0].url,
                                        title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${dycrad.title}.mp4` }
                                    }, { active: true, activeOption: { uin, group_id } });
                                }
                                break;
                            }
                            case 'DYNAMIC_TYPE_DRAW': {
                                const imgArray = [];
                                for (const img of data[dynamicId].Dynamic_Data.modules.module_dynamic.major && data[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.draw?.items) {
                                    imgArray.push(segment.image(img.src));
                                }
                                const forwardMsg = common.makeForward(imgArray, uin, bot.account.name);
                                await bot.sendForwardMsg(karin.contactFriend(uin), forwardMsg);
                                break;
                            }
                        }
                    }
                }
                if (skip || status?.message_id) {
                    const DBdata = await DB.FindGroup('bilibili', groupId);
                    /**
                     * 检查 DBdata 中是否存在与给定 host_mid 匹配的项
                     * @param DBdata - 数据库中存储的群组数据
                     * @param host_midToCheck 要检查的host_mid
                     * @returns 匹配的host_mid
                     */
                    const findMatchingSecUid = (DBdata, host_midToCheck) => {
                        for (const host_mid in DBdata) {
                            if (DBdata.hasOwnProperty(host_mid) && DBdata[host_mid].host_mid === host_midToCheck) {
                                return host_midToCheck;
                            }
                        }
                        return '';
                    };
                    let newEntry;
                    if (DBdata) {
                        // 如果 DBdata 存在，遍历 DBdata 来查找对应的 host_mid
                        let found = false;
                        if (data[dynamicId].host_mid === findMatchingSecUid(DBdata, data[dynamicId].host_mid)) {
                            // 如果找到了对应的 host_mid ，将 dynamicId 添加到 dynamic_idlist 数组中
                            const isSecUidFound = findMatchingSecUid(DBdata, data[dynamicId].host_mid);
                            if (isSecUidFound && this.force ? true : !DBdata[data[dynamicId].host_mid].dynamic_idlist.includes(dynamicId)) {
                                DBdata[isSecUidFound].dynamic_idlist.push(dynamicId);
                                DBdata[isSecUidFound].create_time = Number(data[dynamicId].create_time);
                                await DB.UpdateGroupData('bilibili', groupId, DBdata);
                                found = true;
                            }
                        }
                        if (!found) {
                            // 如果没有找到对应的 host_mid ，创建一个新的条目
                            newEntry = {
                                [data[dynamicId].host_mid]: {
                                    remark: data[dynamicId].remark,
                                    create_time: data[dynamicId].create_time,
                                    host_mid: data[dynamicId].host_mid,
                                    dynamic_idlist: [dynamicId],
                                    avatar_img: data[dynamicId].Dynamic_Data.modules.module_author.face,
                                    dynamic_type: data[dynamicId].dynamic_type,
                                    group_id: [groupId]
                                }
                            };
                            // 更新数据库
                            await DB.UpdateGroupData('bilibili', groupId, { ...DBdata, ...newEntry });
                        }
                    }
                    else {
                        // 如果 DBdata 为空，创建新的条目
                        await DB.CreateSheet('bilibili', groupId, {
                            [data[dynamicId].host_mid]: {
                                remark: data[dynamicId].remark,
                                create_time: data[dynamicId].create_time,
                                host_mid: data[dynamicId].host_mid,
                                dynamic_idlist: [dynamicId],
                                avatar_img: data[dynamicId].Dynamic_Data.modules.module_author.face,
                                dynamic_type: data[dynamicId].dynamic_type,
                                group_id: [groupId]
                            }
                        });
                    }
                }
            }
        }
    }
    /**
     * 根据配置文件获取UP当天的动态列表。
     * @returns
     */
    async getDynamicList(userList) {
        const willbepushlist = {};
        try {
            for (const item of userList) {
                const dynamic_list = await fetchBilibiliData('user_dynamic', { host_mid: item.host_mid });
                if (dynamic_list.data.items.length > 0) {
                    // 遍历接口返回的视频列表
                    for (const dynamic of dynamic_list.data.items) {
                        const now = Date.now();
                        // B站的是秒为单位的时间戳，需要乘 1000 转为毫秒
                        const createTime = parseInt(dynamic.modules.module_author.pub_ts);
                        const timeDifference = (now - createTime * 1000);
                        const is_top = dynamic.modules.module_tag?.text === '置顶'; // 是否为置顶
                        let shouldPush = false; // 是否列入推送数组
                        // 条件判断，以下任何一项成立都将进行推送：如果是置顶且发布时间在一天内 || 如果是置顶作品且有新的群组且发布时间在一天内 || 如果有新的群组且发布时间在一天内
                        logger.debug(`前期获取该动态基本信息：\n动态ID：${dynamic.id_str}\n发布时间：${Common.convertTimestampToDateTime(Number(createTime))}\n发布时间戳（s）：${createTime}\n时间差（ms）：${timeDifference}\n是否置顶：${is_top}\n是否在一天内：${timeDifference < 86400000 ? logger.green('true') : logger.red('false')}`);
                        if ((is_top && timeDifference < 86400000) || (timeDifference < 86400000)) {
                            shouldPush = true;
                            logger.debug(logger.green(`根据以上判断，shoulPush 为 true，将对该动态纳入当天推送列表：https://t.bilibili.com/${dynamic.id_str}\n`));
                        }
                        else
                            logger.debug(logger.yellow(`根据以上判断，shoulPush 为 false，跳过该动态：https://t.bilibili.com/${dynamic.id_str}\n`));
                        // 如果 shouldPush 为 true，或该作品距现在的时间差小于一天，则将该动态添加到 willbepushlist 中
                        if (timeDifference < 86400000 || shouldPush) {
                            // 确保 willbepushlist[host_mid.aweme_id] 是一个对象
                            if (!willbepushlist[dynamic.id_str]) {
                                willbepushlist[dynamic.id_str] = {
                                    remark: item.remark,
                                    host_mid: item.host_mid,
                                    create_time: dynamic.modules.module_author.pub_ts,
                                    group_id: [...item.group_id],
                                    Dynamic_Data: dynamic, // 存储 dynamic 对象
                                    avatar_img: dynamic.modules.module_author.face,
                                    dynamic_type: dynamic.type
                                };
                            }
                        }
                    }
                }
                else {
                    throw new Error(`「${item.remark}」的动态列表数量为零！`);
                }
            }
        }
        catch (error) {
            logger.error(error);
        }
        const DBdata = await DB.FindAll('bilibili');
        // 这里是强制数组的第一个对象中的内容 DBdata[0]?.data 因为调用这个函数的上层有遍历群组逻辑
        // DBdata[0]?.data 则是当前群组的推送用户数据
        return { willbepushlist, DBdata };
    }
    /**
     * 排除已推送过的群组并返回更新后的推送列表
     * @param willBePushList 将要推送的列表
     * @param dbData 数据库缓存
     * @returns 更新后的推送列表
     */
    excludeAlreadyPushed(willBePushList, dbData) {
        // 主要逻辑：
        // 遍历推送列表中的 dynamicId。
        // 对每个 dynamicId 的 group_id 逐一检查：
        // 如果群组不存在于数据库中，直接保留。
        // 如果群组存在，进一步检查数据库中的缓存列表是否包含该 dynamicId。
        // 更新 group_id 数组：移除已推送的群组。
        // 如果 group_id 为空，则删除该dynamicId。
        // 遍历推送列表中的作品ID
        for (const dynamicId in willBePushList) {
            const pushItem = willBePushList[dynamicId];
            const newGroupIds = [];
            // 遍历作品对应的群组
            for (const groupId of pushItem.group_id) {
                // 如果数据库中不存在该群组，保留此群组
                if (!dbData) {
                    newGroupIds.push(groupId);
                    continue;
                }
                // 检查群组中所有博主的缓存
                let isAlreadyPushed = false;
                for (const secUid in dbData[groupId]) {
                    const cachedData = dbData[groupId][secUid];
                    if (cachedData.dynamic_idlist.includes(dynamicId)) {
                        isAlreadyPushed = true;
                        break;
                    }
                }
                // 如果未被推送过，则保留此群组
                if (!isAlreadyPushed) {
                    newGroupIds.push(groupId);
                }
            }
            // 更新作品的群组数组
            if (newGroupIds.length > 0) {
                pushItem.group_id = newGroupIds;
            }
            else {
                // 如果没有剩余群组，移除该作品
                delete willBePushList[dynamicId];
            }
        }
        return willBePushList;
    }
    /**
     * 设置或更新特定 host_mid 的群组信息。
     * @param data 包含 card 对象。
     * @returns 操作成功或失败的消息字符串。
     */
    async setting(data) {
        const groupInfo = await this.e.bot.getGroupInfo('groupId' in this.e && this.e.groupId ? this.e.groupId : '');
        const host_mid = data.data.card.mid;
        const config = Config.pushlist; // 读取配置文件
        const group_id = 'groupId' in this.e && this.e.groupId ? this.e.groupId : '';
        // 初始化或确保 bilibilipushlist 数组存在
        if (!config.bilibili) {
            config.bilibili = [];
        }
        // 检查是否存在相同的 host_mid
        const existingItem = config.bilibili.find((item) => item.host_mid === host_mid);
        if (existingItem) {
            // 如果已经存在相同的 host_mid ，则检查是否存在相同的 group_id
            let has = false;
            let groupIndexToRemove = -1; // 用于记录要删除的 group_id 对象的索引
            for (let index = 0; index < existingItem.group_id.length; index++) {
                // 分割每个对象的 id 属性，并获取第一部分
                const item = existingItem.group_id[index];
                const existingGroupId = item.split(':')[0];
                // 检查分割后的第一部分是否与提供的 group_id 相同
                if (existingGroupId === String(group_id)) {
                    has = true;
                    groupIndexToRemove = index;
                    break; // 找到匹配项后退出循环
                }
            }
            if (has) {
                // 如果已存在相同的 group_id，则删除它
                existingItem.group_id.splice(groupIndexToRemove, 1);
                logger.info(`\n删除成功！${data.data.card.name}\nUID：${host_mid}`);
                await this.e.reply(`群：${groupInfo.groupName}(${group_id})\n删除成功！${data.data.card.name}\nUID：${host_mid}`);
                // 如果删除后 group_id 数组为空，则删除整个属性
                if (existingItem.group_id.length === 0) {
                    const index = config.bilibili.indexOf(existingItem);
                    config.bilibili.splice(index, 1);
                }
            }
            else {
                const status = await DB.FindGroup('bilibili', `${group_id}:${this.e.selfId}`);
                if (!status) {
                    await DB.CreateSheet('bilibili', `${group_id}:${this.e.selfId}`, {});
                }
                // 否则，将新的 group_id 添加到该 host_mid 对应的数组中
                existingItem.group_id.push(`${group_id}:${this.e.selfId}`);
                await this.e.reply(`群：${groupInfo.groupName}(${group_id})\n添加成功！${data.data.card.name}\nUID：${host_mid}`);
                if (Config.bilibili.push.switch === false)
                    await this.e.reply('请发送「#kkk设置B站推送开启」以进行推送');
                logger.info(`\n设置成功！${data.data.card.name}\nUID：${host_mid}`);
                // 渲染状态图片
                await this.renderPushList(config.bilibili, host_mid);
            }
        }
        else {
            const status = await DB.FindGroup('bilibili', `${group_id}:${this.e.selfId}`);
            if (!status) {
                await DB.CreateSheet('bilibili', `${group_id}:${this.e.selfId}`, {});
            }
            // 不存在相同的 host_mid，新增一个配置项
            config.bilibili.push({ host_mid, group_id: [`${group_id}:${this.e.selfId}`], remark: data.data.card.name });
            await this.e.reply(`群：${groupInfo.groupName}(${group_id})\n添加成功！${data.data.card.name}\nUID：${host_mid}`);
            if (Config.bilibili.push.switch === false)
                await this.e.reply('请发送「#kkk设置B站推送开启」以进行推送');
            // 渲染状态图片
            await this.renderPushList(config.bilibili, host_mid);
        }
        // 更新配置文件
        Config.Modify('pushlist', 'bilibili', config.bilibili);
    }
    /**
     * 检查并更新配置文件中指定用户的备注信息。
     * 该函数会遍历配置文件中的用户列表，对于没有备注或备注为空的用户，会从外部数据源获取其备注信息，并更新到配置文件中。
     */
    async checkremark() {
        // 读取配置文件内容
        const config = Config.pushlist;
        const abclist = [];
        if (Config.pushlist.bilibili === null || Config.pushlist.bilibili.length === 0)
            return true;
        // 遍历配置文件中的用户列表，收集需要更新备注信息的用户
        for (const i of Config.pushlist.bilibili) {
            const remark = i.remark;
            const group_id = i.group_id;
            const host_mid = i.host_mid;
            if (remark === undefined || remark === '') {
                abclist.push({ host_mid, group_id });
            }
        }
        // 如果有需要更新备注的用户，则逐个获取备注信息并更新到配置文件中
        if (abclist.length > 0) {
            for (const i of abclist) {
                // 从外部数据源获取用户备注信息
                const resp = await fetchBilibiliData('user_profile', { host_mid: i.host_mid });
                const remark = resp.data.card.name;
                // 在配置文件中找到对应的用户，并更新其备注信息
                const matchingItemIndex = config.bilibili.findIndex((item) => item.host_mid === i.host_mid);
                if (matchingItemIndex !== -1) {
                    config.bilibili[matchingItemIndex].remark = remark;
                }
            }
            // 将更新后的配置文件内容写回文件
            Config.Modify('pushlist', 'bilibili', config.bilibili);
        }
    }
    /**
     * 强制推送
     * @param data 处理完成的推送列表
     */
    async forcepush(data) {
        if (!this.e.msg.includes('全部')) {
            for (const detail in data) {
                data[detail].group_id = [...[`${'groupId' in this.e && this.e.groupId ? this.e.groupId : ''}:${this.e.selfId}`]];
            }
        }
        await this.getdata(data);
    }
    /**
     * 渲染推送列表图片
     * @param pushList B站配置文件的推送列表
     * @param host_mid 优先展示的UP主的UID
     * @returns
     */
    async renderPushList(pushList, host_mid) {
        const groupInfo = await this.e.bot.getGroupInfo('groupId' in this.e && this.e.groupId ? this.e.groupId : '');
        const filteredList = pushList.filter(item => item.group_id.some(group => group.split(':')[0] === groupInfo.groupId));
        if (filteredList.length === 0) {
            await this.e.reply(`当前群：${groupInfo.groupName}(${groupInfo.groupId})\n没有设置任何B站UP推送！\n可使用「#设置B站推送 + UP主UID」进行设置`);
            return true;
        }
        /** 用户的今日动态列表 */
        const DynamicList = await this.getDynamicList(filteredList);
        const renderOpt = [];
        for (const dynamic_id in removeDuplicateHostMid(DynamicList.willbepushlist)) {
            const item = DynamicList.willbepushlist[dynamic_id];
            const userInfo = await getBilibiliData('用户主页数据', Config.cookies.bilibili, { host_mid: item.host_mid });
            renderOpt.push({
                avatar_img: userInfo.data.card.face,
                username: userInfo.data.card.name,
                host_mid,
                fans: this.count(userInfo.data.follower),
                total_favorited: this.count(userInfo.data.like_num),
                following_count: this.count(userInfo.data.card.attention),
                willPushNum: 999
            });
        }
        // 将此次设置推送的用户排序到首位
        if (host_mid)
            renderOpt.sort((a, b) => (a.host_mid === host_mid ? -1 : b.host_mid === host_mid ? 1 : 0));
        const img = await Render('bilibili/userlist', { renderOpt });
        await this.e.reply(img);
    }
}
/**
 * 将换行符替换为HTML的<br>标签。
 * @param data 需要进行换行符替换的字符串。
 * @returns 替换后的字符串，其中的换行符\n被<br>替换。
 */
function br(data) {
    // 使用正则表达式将所有换行符替换为<br>
    return (data = data.replace(/\n/g, '<br>'));
}
/**
 * 检查成员是否为VIP，并根据VIP状态改变其显示颜色。
 * @param member 成员对象，需要包含vip属性，该属性应包含vipStatus和nickname_color（可选）。
 * @returns 返回成员名称的HTML标签字符串，VIP成员将显示为特定颜色，非VIP成员显示为默认颜色。
 */
function checkvip(member) {
    // 根据VIP状态选择不同的颜色显示成员名称
    return member.vip.vipStatus === 1
        ? `<span style="color: ${member.vip.nickname_color || '#FB7299'}; font-weight: 700;">${member.name}</span>`
        : `<span style="color: ${Common.useDarkTheme() ? '#EDEDED' : '#606060'}">${member.name}</span>`;
}
/**
 * 处理并提取表情数据，返回一个包含表情名称和URL的对象数组。
 * @param data 表情数据的数组，每个元素包含一个表情包的信息。
 * @returns 返回一个对象数组，每个对象包含text(表情名称)和url(表情图片地址)属性。
 */
function extractEmojisData(data) {
    const emojisData = [];
    // 遍历data数组中的每个表情包
    data.forEach((packages) => {
        // 遍历每个表情包中的每个表情
        packages.emote.forEach((emote) => {
            emojisData.push({ text: emote.text, url: emote.url });
        });
    });
    return emojisData;
}
/**
 * 判断标题是否有屏蔽词或屏蔽标签
 * @param Dynamic_Data 作品详情数据
 * @returns
 */
const skipDynamic = (Dynamic_Data) => {
    for (const banWord of Config.bilibili.push.banWords) {
        if (Dynamic_Data.modules.module_dynamic.major?.archive?.title.includes(banWord) || Dynamic_Data.modules.module_dynamic.desc?.text?.includes(banWord)) {
            logger.mark(`动态：${logger.green(`https://t.bilibili.com/${Dynamic_Data.id_str}`)} 包含屏蔽词：「${logger.red(banWord)}」，跳过推送`);
            return true;
        }
    }
    if (Dynamic_Data.type === DynamicType.DRAW || Dynamic_Data.type === DynamicType.FORWARD) {
        for (const banTag of Config.bilibili.push.banTags) {
            for (const tag of Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes) {
                if (tag.orig_text.includes(banTag)) {
                    logger.mark(`图文动态：${logger.green(`https://t.bilibili.com/${Dynamic_Data.id_str}`)} 包含屏蔽标签：「${logger.red(banTag)}」，跳过推送`);
                    return true;
                }
            }
        }
    }
    return false;
};
const removeDuplicateHostMid = (willBePushList) => {
    const result = {};
    const seenHostMids = new Set();
    for (const key in willBePushList) {
        const item = willBePushList[key];
        if (!seenHostMids.has(item.host_mid)) {
            result[key] = item;
            seenHostMids.add(item.host_mid);
        }
    }
    return result;
};
