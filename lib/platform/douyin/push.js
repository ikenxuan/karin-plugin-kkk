import { getDouyinData } from '@ikenxuan/amagi';
import { common, karin, logger, segment } from 'node-karin';
import { Base, Common, Config, DB, Render } from '../../module/index.js';
import { getDouyinID } from '../../platform/douyin/index.js';
export class DouYinpush extends Base {
    force = false;
    /**
     *
     * @param e  事件KarinMessage
     * @param force 是否强制推送
     * @default false
     * @returns
     */
    constructor(e = {}, force = false) {
        super(e);
        if (this.botadapter === 'QQBot') {
            return;
        }
        this.headers.Referer = 'https://www.douyin.com';
        this.headers.Cookie = Config.cookies.douyin;
        this.force = force;
    }
    async action() {
        if (await this.checkremark())
            return true;
        try {
            let data = await this.getDynamicList();
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
    async getdata(data) {
        if (Object.keys(data).length === 0)
            return true;
        for (const awemeId in data) {
            const Detail_Data = data[awemeId].Detail_Data;
            const skip = skipDynamic(Detail_Data);
            let img = [];
            let iddata = { is_mp4: true, type: 'one_work' };
            if (!skip) {
                iddata = await getDouyinID(Detail_Data.share_url || 'https://live.douyin.com/' + Detail_Data.room_data.owner.web_rid, false);
            }
            if (!skip) {
                if (data[awemeId].living && 'room_data' in data[awemeId].Detail_Data) {
                    img = await Render('douyin/live', {
                        image_url: [{ image_src: Detail_Data.live_data.data.data[0].cover.url_list[0] }],
                        text: Detail_Data.live_data.data.data[0].title,
                        liveinf: `${Detail_Data.live_data.data.partition_road_map?.partition?.title || Detail_Data.live_data.data.data[0].title} | 房间号: ${Detail_Data.room_data.owner.web_rid}`,
                        在线观众: this.count(Detail_Data.live_data.data.data[0].room_view_stats.display_value),
                        总观看次数: this.count(Detail_Data.live_data.data.data[0].stats.total_user_str),
                        username: Detail_Data.user_info.user.nickname,
                        avater_url: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + Detail_Data.user_info.user.avatar_larger.uri,
                        fans: this.count(Detail_Data.user_info.user.follower_count),
                        create_time: Common.convertTimestampToDateTime(Date.now()),
                        now_time: Common.convertTimestampToDateTime(Date.now()),
                        share_url: 'https://live.douyin.com/' + Detail_Data.room_data.owner.web_rid,
                        dynamicTYPE: '直播动态推送'
                    });
                }
                else {
                    img = await Render('douyin/dynamic', {
                        image_url: iddata.is_mp4 ? Detail_Data.video.animated_cover?.url_list[0] || Detail_Data.video.cover.url_list[0] : Detail_Data.images[0].url_list[0],
                        desc: this.desc(Detail_Data, Detail_Data.desc),
                        dianzan: this.count(Detail_Data.statistics.digg_count),
                        pinglun: this.count(Detail_Data.statistics.comment_count),
                        share: this.count(Detail_Data.statistics.share_count),
                        shouchang: this.count(Detail_Data.statistics.collect_count),
                        create_time: Common.convertTimestampToDateTime(data[awemeId].create_time),
                        avater_url: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + Detail_Data.user_info.user.avatar_larger.uri,
                        share_url: iddata.is_mp4
                            ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`
                            : Detail_Data.share_url,
                        username: Detail_Data.author.nickname,
                        抖音号: Detail_Data.user_info.user.unique_id === '' ? Detail_Data.user_info.user.unique_id : Detail_Data.user_info.user.unique_id,
                        粉丝: this.count(Detail_Data.user_info.user.follower_count),
                        获赞: this.count(Detail_Data.user_info.user.total_favorited),
                        关注: this.count(Detail_Data.user_info.user.following_count)
                    });
                }
            }
            // 遍历 group_id 数组，并发送消息
            try {
                for (const groupId of data[awemeId].group_id) {
                    let DBdata = await DB.FindGroup('douyin', groupId);
                    let status = { message_id: '' };
                    const [group_id, uin] = groupId.split(':');
                    const bot = karin.getBot(uin);
                    if (!skip) {
                        status = await karin.sendMsg(String(uin), karin.contactGroup(group_id), img ? [...img] : []);
                        // 是否一同解析该新作品？
                        if (Config.douyin.push.parsedynamic) {
                            // 如果新作品是视频
                            if (iddata.is_mp4) {
                                try {
                                    // 下载视频
                                    await this.DownLoadVideo({
                                        video_url: `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`,
                                        title: { timestampTitle: 'tmp_' + Date.now(), originTitle: Detail_Data.desc }
                                    }, { active: true, activeOption: { uin, group_id } });
                                }
                                catch (error) {
                                    logger.error(error);
                                }
                            }
                            else if (!iddata.is_mp4 && iddata.type === 'one_work') { // 如果新作品是图集
                                const imageres = [];
                                let image_url;
                                for (const item of Detail_Data.aweme_detail.images) {
                                    image_url = item.url_list[2] || item.url_list[1]; // 图片地址
                                    imageres.push(segment.image(image_url));
                                }
                                const forwardMsg = common.makeForward(imageres, uin, (await bot?.GetCurrentAccount()).account_name);
                                await bot.sendForwardMessage(karin.contactFriend(uin), forwardMsg);
                            }
                        }
                    }
                    // 如果跳过该新作品或者动态图已成功发送且返回msg_id，则写入作品ID到数据库
                    if (skip || status.message_id) {
                        let newEntry;
                        if (DBdata) {
                            // 如果直播状态改变了，且这次是关播状态，发送通知
                            if (data[awemeId].Detail_Data.liveStatus?.isChanged && data[awemeId].Detail_Data.liveStatus.isliving === false) {
                                const message_id = DBdata[data[awemeId].sec_uid]?.message_id;
                                if (message_id && message_id !== '') {
                                    await karin.sendMsg(String(uin), karin.contactGroup(group_id), [
                                        segment.reply(message_id),
                                        segment.text(`「${data[awemeId].remark}」的直播已经结束惹 ~\n`),
                                        segment.text(`直播时间：${Common.timeSince(DBdata[data[awemeId].sec_uid].start_living_pn)}`)
                                    ]);
                                }
                            }
                            // 如果 DBdata 存在，遍历 DBdata 来查找对应的 sec_uid
                            let found = false;
                            if (data[awemeId].sec_uid === findMatchingSecUid(DBdata, data[awemeId].sec_uid)) {
                                // 如果找到了对应的 sec_uid，将 awemeId 添加到 aweme_idlist 数组中
                                const isSecUidFound = findMatchingSecUid(DBdata, data[awemeId].sec_uid);
                                if (isSecUidFound && this.force ? true : !DBdata[data[awemeId].sec_uid].aweme_idlist.includes(awemeId)) {
                                    !data[awemeId].living ? DBdata[isSecUidFound].aweme_idlist.push(awemeId) : false;
                                    DBdata[isSecUidFound].create_time = Number(data[awemeId].create_time);
                                    // 如果直播状态改变了且该次是开播状态，则更新数据库中的直播状态
                                    if (Detail_Data?.liveStatus && Detail_Data.liveStatus.isChanged) {
                                        DBdata[isSecUidFound].message_id = status.message_id;
                                        DBdata[isSecUidFound].living = data[awemeId].living;
                                        DBdata[isSecUidFound].start_living_pn = Detail_Data?.liveStatus.isliving ? Date.now() : 0;
                                    }
                                    else {
                                        DBdata[isSecUidFound].message_id = '',
                                            DBdata[isSecUidFound].living = data[awemeId].Detail_Data.user_info.user.live_status === 1,
                                            DBdata[isSecUidFound].start_living_pn = 0;
                                    }
                                    await DB.UpdateGroupData('douyin', groupId, DBdata);
                                    found = true;
                                }
                            }
                            if (!found) {
                                // 如果没有找到对应的 sec_uid，创建一个新的条目
                                newEntry = {
                                    [data[awemeId].sec_uid]: {
                                        remark: data[awemeId].remark,
                                        create_time: Number(data[awemeId].create_time),
                                        sec_uid: data[awemeId].sec_uid,
                                        aweme_idlist: !data[awemeId].living ? [awemeId] : [],
                                        group_id: [groupId],
                                        avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + data[awemeId].Detail_Data.user_info.user.avatar_larger.uri,
                                        living: data[awemeId].living,
                                        message_id: 'liveStatus' in data[awemeId].Detail_Data && data[awemeId].living ? status.message_id : '',
                                        start_living_pn: 'liveStatus' in data[awemeId].Detail_Data && data[awemeId].living ? Date.now() : 0
                                    }
                                };
                                // 更新数据库
                                await DB.UpdateGroupData('douyin', groupId, { ...DBdata, ...newEntry });
                            }
                        }
                        else {
                            // 如果 DBdata 为空，创建新的条目
                            await DB.CreateSheet('douyin', groupId, {
                                [data[awemeId].sec_uid]: {
                                    remark: data[awemeId].remark,
                                    create_time: data[awemeId].create_time,
                                    sec_uid: data[awemeId].sec_uid,
                                    aweme_idlist: !data[awemeId].living ? [awemeId] : [],
                                    avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + data[awemeId].Detail_Data.user_info.user.avatar_larger.uri,
                                    group_id: [groupId],
                                    living: data[awemeId].living,
                                    message_id: 'liveStatus' in data[awemeId].Detail_Data && data[awemeId].living ? status.message_id : '',
                                    start_living_pn: 'liveStatus' in data[awemeId].Detail_Data && data[awemeId].living ? Date.now() : 0
                                }
                            });
                        }
                    }
                }
            }
            catch (error) {
                logger.error(error);
            }
        }
    }
    /**
     * 根据配置文件获取UP当天的动态列表。
     * @returns
     */
    async getDynamicList() {
        const willbepushlist = {};
        const DBdata = await DB.FindAll('douyin');
        try {
            for (const item of Config.pushlist.douyin) {
                const videolist = await getDouyinData('用户主页视频列表数据', Config.cookies.douyin, { sec_uid: item.sec_uid });
                const userinfo = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid: item.sec_uid });
                if (videolist.aweme_list.length > 0) {
                    for (const aweme of videolist.aweme_list) {
                        const now = Date.now();
                        const createTime = parseInt(aweme.create_time, 10) * 1000;
                        const timeDifference = now - createTime; // 时间差，单位秒
                        const is_top = aweme.is_top === 1; // 是否为置顶
                        let shouldPush = false;
                        logger.debug(`前期获取该动态基本信息：\n动态ID：${aweme.aweme_id}\n发布时间：${Common.convertTimestampToDateTime(parseInt(aweme.create_time, 10))}\n发布时间戳（s）：${parseInt(aweme.create_time, 10)}\n时间差（ms）：${timeDifference}\n是否置顶：${is_top}\n是否处于开播：${userinfo.user.live_status === 1 ? logger.green('true') : logger.red('false')}是否在一天内：${timeDifference < 86400000 ? logger.green('true') : logger.red('false')}`);
                        if ((is_top && timeDifference < 86400000) || (timeDifference < 86400000)) {
                            shouldPush = true;
                            logger.debug(logger.green(`根据以上判断，shoulPush 为 true，将对该作品进行推送：${aweme.share_url}\n`));
                        }
                        else
                            logger.debug(logger.yellow(`根据以上判断，shoulPush 为 false，跳过该作品：${aweme.share_url}\n`));
                        // 如果 shouldPush 为 true，或该作品距现在的时间差小于一天，则将该动态添加到 willbepushlist 中
                        if (shouldPush) {
                            // 确保 willbepushlist[aweme.aweme_id] 是一个对象
                            if (!willbepushlist[aweme.aweme_id]) {
                                willbepushlist[aweme.aweme_id] = {
                                    remark: item.remark,
                                    sec_uid: userinfo.user.sec_uid,
                                    create_time: aweme.create_time,
                                    group_id: item.group_id,
                                    Detail_Data: { ...aweme, user_info: userinfo },
                                    avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + userinfo.user.avatar_larger.uri,
                                    living: userinfo.user.live_status === 1
                                };
                            }
                        }
                    }
                }
                else {
                    logger.error(`‘${item.remark}’的主页视频列表数量为零！`);
                }
                // 如果正在开播
                const liveStatus = checkUserLiveStatus(userinfo, DBdata);
                const fake_room_id = '7' + Math.random().toString().slice(2).padEnd(18, '0').slice(0, 18);
                if (liveStatus?.liveStatus === 'open' && liveStatus.isChanged === true) {
                    const live_data = await getDouyinData('直播间信息数据', Config.cookies.douyin, { sec_uid: item.sec_uid });
                    const room_data = JSON.parse(userinfo.user.room_data);
                    if (!willbepushlist[room_data.owner.web_rid]) {
                        willbepushlist[room_data.owner.web_rid] = {
                            remark: item.remark,
                            sec_uid: userinfo.user.sec_uid,
                            create_time: Date.now(),
                            group_id: item.group_id,
                            Detail_Data: { live_data, room_data, user_info: userinfo, liveStatus },
                            avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + userinfo.user.avatar_larger.uri,
                            living: liveStatus.isliving
                        };
                    }
                }
                else if (liveStatus?.liveStatus === 'close' && liveStatus.isChanged === true) {
                    if (!willbepushlist[fake_room_id]) {
                        willbepushlist[fake_room_id] = {
                            remark: item.remark,
                            sec_uid: userinfo.user.sec_uid,
                            create_time: Date.now(),
                            group_id: item.group_id,
                            Detail_Data: { user_info: userinfo, liveStatus },
                            avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + userinfo.user.avatar_larger.uri,
                            living: liveStatus.isliving
                        };
                    }
                }
            }
        }
        catch (error) {
            logger.error(error);
        }
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
        // 遍历推送列表中的 awemeId。
        // 对每个 awemeId 的 group_id 逐一检查：
        // 如果群组不存在于数据库中，直接保留。
        // 如果群组存在，进一步检查数据库中的缓存列表是否包含该 awemeId。
        // 更新 group_id 数组：移除已推送的群组。
        // 如果 group_id 为空，则删除该 awemeId。
        // 遍历推送列表中的每一个作品
        for (const awemeId in willBePushList) {
            const pushItem = willBePushList[awemeId];
            let filteredGroupIds = [];
            for (const groupId of pushItem.group_id) {
                const groupData = dbData[groupId];
                // 如果 dbData 是空或者没有对应的 groupId 数据，直接保留该群组
                if (!groupData) {
                    filteredGroupIds.push(groupId);
                    continue;
                }
                // 获取与 pushItem.sec_uid 对应的 cachedData
                const cachedData = groupData[pushItem.sec_uid];
                // 如果找不到对应的 sec_uid 数据，直接保留该群组
                if (!cachedData) {
                    filteredGroupIds.push(groupId);
                    continue;
                }
                // 如果是普通动态，检查 aweme_id 是否已缓存
                // 如果缓存列表中没有该 awemeId，则保留该群组
                if (pushItem.living === true && cachedData.living === false && !cachedData.aweme_idlist.includes(awemeId)) {
                    filteredGroupIds.push(groupId);
                    continue;
                }
                if ('liveStatus' in pushItem.Detail_Data) {
                    // 如果直播状态更变，不管是开播还是关播，都要保留该群组
                    if (pushItem.living === true && cachedData.living === false) {
                        filteredGroupIds.push(groupId);
                        continue;
                    }
                    if (pushItem.living === false && cachedData.living === true) {
                        filteredGroupIds.push(groupId);
                        continue;
                    }
                }
            }
            // 更新 group_id，如果为空则删除该作品
            if (filteredGroupIds.length > 0) {
                pushItem.group_id = filteredGroupIds;
                filteredGroupIds = [];
            }
            else {
                delete willBePushList[awemeId];
            }
        }
        return willBePushList;
    }
    async checkremark() {
        const config = Config.pushlist;
        const abclist = [];
        if (Config.pushlist.douyin === null || Config.pushlist.douyin.length === 0)
            return true;
        for (let i = 0; i < Config.pushlist.douyin.length; i++) {
            const remark = Config.pushlist.douyin[i].remark;
            const group_id = Config.pushlist.douyin[i].group_id;
            const sec_uid = Config.pushlist.douyin[i].sec_uid;
            const short_id = Config.pushlist.douyin[i].short_id;
            if (!remark) {
                abclist.push({ sec_uid, group_id });
            }
            if (!short_id) {
                abclist.push({ sec_uid, group_id });
            }
        }
        if (abclist.length > 0) {
            for (let i = 0; i < abclist.length; i++) {
                const resp = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid: abclist[i].sec_uid });
                const remark = resp.user.nickname;
                const matchingItemIndex = config.douyin.findIndex((item) => item.sec_uid === abclist[i].sec_uid);
                if (matchingItemIndex !== -1) {
                    // 更新匹配的对象的 remark 和抖音号
                    config.douyin[matchingItemIndex].remark = remark;
                    config.douyin[matchingItemIndex].short_id = resp.user.unique_id === '' ? resp.user.unique_id : resp.user.unique_id;
                }
            }
            Config.modify('pushlist', 'douyin', config.douyin);
        }
    }
    desc(video_obj, text) {
        if (Array.isArray(video_obj) && video_obj.length > 0) {
            const regex = new RegExp(video_obj.map((obj) => `#${obj.hashtag_name}`).join('|'), 'g');
            // 使用正则表达式替换匹配到的话题标签
            text = text.replace(regex, (match) => {
                // 对于每个匹配的话题标签，检查它是否在video_obj中存在
                const matchedObj = video_obj.find((obj) => `#${obj.hashtag_name}` === match);
                if (matchedObj) {
                    return `<span style="font-weight: bold; color: #cfcfcf">${match}</span>`;
                }
                return match;
            });
        }
        return text;
    }
    /**
     * 强制推送
     * @param data 处理完成的推送列表
     */
    async forcepush(data) {
        if (!this.e.msg.includes('全部')) {
            for (const detail in data) {
                data[detail].group_id = [...[`${this.e.group_id}:${this.e.self_id}`]];
            }
        }
        await this.getdata(data);
    }
    /**
     * 设置或更新特定 sec_uid 的群组信息。
     * @param data 抖音的搜索结果数据。需要接口返回的原始数据
     * @returns 操作成功或失败的消息字符串。
     */
    async setting(data) {
        const groupInfo = await this.e.bot.GetGroupInfo(this.e.group_id);
        try {
            let index = 0;
            while (data.data[index].card_unique_name !== 'user') {
                index++;
            }
            let msg;
            const sec_uid = data.data[index].user_list[0].user_info.sec_uid;
            const UserInfoData = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid });
            const config = Config.pushlist;
            const group_id = this.e.group_id;
            /** 处理抖音号 */
            let user_shortid;
            UserInfoData.user.unique_id === '' ? (user_shortid = UserInfoData.user.short_id) : (user_shortid = UserInfoData.user.unique_id);
            // 初始化 group_id 对应的数组
            if (!config.douyin) {
                config.douyin = [];
            }
            // 查找是否存在相同的 sec_uid
            const existingItem = config.douyin.find((item) => item.sec_uid === sec_uid);
            if (existingItem) {
                // 如果已经存在相同的 sec_uid，则检查是否存在相同的 group_id
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
                    // 如果存在相同的 group_id，则删除它
                    existingItem.group_id.splice(groupIndexToRemove, 1);
                    logger.info(`\n删除成功！${UserInfoData.user.nickname}\n抖音号：${user_shortid}\nsec_uid${UserInfoData.user.sec_uid}`);
                    msg = `群：${groupInfo.group_name}(${group_id})\n删除成功！${UserInfoData.user.nickname}\n抖音号：${user_shortid}`;
                    // 如果删除后 group_id 数组为空，则删除整个属性
                    if (existingItem.group_id.length === 0) {
                        const index = config.douyin.indexOf(existingItem);
                        config.douyin.splice(index, 1);
                    }
                }
                else {
                    const status = await DB.FindGroup('douyin', `${group_id}:${this.e.self_id}`);
                    if (!status) {
                        await DB.CreateSheet('douyin', `${group_id}:${this.e.self_id}`, {});
                    }
                    // 否则，将新的 group_id 添加到该 sec_uid 对应的数组中
                    existingItem.group_id.push(`${group_id}:${this.e.self_id}`);
                    msg = `群：${groupInfo.group_name}(${group_id})\n添加成功！${UserInfoData.user.nickname}\n抖音号：${user_shortid}`;
                    logger.info(`\n设置成功！${UserInfoData.user.nickname}\n抖音号：${user_shortid}\nsec_uid${UserInfoData.user.sec_uid}`);
                }
            }
            else {
                const status = await DB.FindGroup('douyin', `${group_id}:${this.e.self_id}`);
                if (!status) {
                    await DB.CreateSheet('douyin', `${group_id}:${this.e.self_id}`, {});
                }
                // 如果不存在相同的 sec_uid，则新增一个属性
                config.douyin.push({ sec_uid, group_id: [`${group_id}:${this.e.self_id}`], remark: UserInfoData.user.nickname, short_id: user_shortid });
                msg = `群：${groupInfo.group_name}(${group_id})\n添加成功！${UserInfoData.user.nickname}\n抖音号：${user_shortid}`;
            }
            Config.modify('pushlist', 'douyin', config.douyin);
            return msg;
        }
        catch (error) {
            logger.error(error);
            return '无法获取用户信息，请确认抖音号是否正确';
        }
    }
}
/**
 * 判断标题是否有屏蔽词或屏蔽标签
 * @param Detail_Data 作品详情数据
 * @returns
 */
const skipDynamic = (Detail_Data) => {
    if ('liveStatus' in Detail_Data) {
        if (Detail_Data.liveStatus?.liveStatus === 'close' && Detail_Data.liveStatus?.isChanged) {
            return true;
        }
        else
            return false;
    }
    for (const banWord of Config.douyin.push.banWords) {
        if (Detail_Data.item_title.includes(banWord)) {
            logger.mark(`作品：${logger.green(Detail_Data.share_url)} 包含屏蔽词：「${logger.red(banWord)}」，跳过推送`);
            return true;
        }
    }
    for (const banTag of Config.douyin.push.banTags) {
        if (Detail_Data.caption.includes(banTag)) {
            logger.mark(`作品：${logger.green(Detail_Data.share_url)} 包含屏蔽标签：「${logger.red(banTag)}」，跳过推送`);
            return true;
        }
    }
    return false;
};
/**
 * 检查博主是否在直播和是否改变直播状态
 * @param userInfo 用户主页信息
 * @param cacheData 数据库的缓存数据
 * @returns 直播状态和是否改变的布尔值，默认false
 */
const checkUserLiveStatus = (userInfo, cacheData) => {
    const liveStatus = userInfo.user.live_status === 1 ? 'open' : 'close';
    const isLiving = userInfo.user.live_status === 1;
    let isChanged = false;
    const sec_uid = userInfo.user.sec_uid;
    const mergeCacheData = mergeDouyinData(cacheData);
    if (!mergeCacheData[sec_uid] && isLiving === true) {
        return { liveStatus, isChanged: true, isliving: true };
    }
    if (!mergeCacheData[sec_uid] && isLiving === false) {
        return { liveStatus, isChanged: false, isliving: false };
    }
    if (mergeCacheData[sec_uid].living === false && isLiving === true) {
        isChanged = true;
    }
    else if (mergeCacheData[sec_uid].living === true && isLiving === false) {
        isChanged = true;
    }
    else
        isChanged = false;
    return { liveStatus, isChanged, isliving: liveStatus === 'open' };
};
/**
 * 合并数据库的博主对象
 * @param data 数据库的缓存数据
 * @returns
 */
const mergeDouyinData = (data) => {
    const result = {};
    for (const group in data) {
        for (const secUid in data[group]) {
            result[secUid] = data[group][secUid];
        }
    }
    return result;
};
/**
 * 检查 DBdata 中是否存在与给定 host_mid 匹配的项
 * @param DBdata - 数据库中存储的群组数据
 * @param host_midToCheck 要检查的host_mid
 * @returns 匹配的host_mid
 */
const findMatchingSecUid = (DBdata, secUidToCheck) => {
    for (const sec_uid in DBdata) {
        if (DBdata.hasOwnProperty(sec_uid) && DBdata[sec_uid].sec_uid === secUidToCheck) {
            return secUidToCheck;
        }
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbGF0Zm9ybS9kb3V5aW4vcHVzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBZ0IsS0FBSyxFQUE4QixNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBRXJHLE9BQU8sRUFBZSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQWdCLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0RixPQUFPLEVBQTZCLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBNkIxRSxNQUFNLE9BQU8sVUFBVyxTQUFRLElBQUk7SUFDMUIsS0FBSyxHQUFZLEtBQUssQ0FBQTtJQUM5Qjs7Ozs7O09BTUc7SUFDSCxZQUFhLElBQUksRUFBa0IsRUFBRSxRQUFpQixLQUFLO1FBQ3pELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNSLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUNoQyxPQUFNO1FBQ1IsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFBO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFBO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTTtRQUNWLElBQUksTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUE7UUFFekMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7WUFDdEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFD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