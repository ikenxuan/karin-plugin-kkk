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
            const data = await this.getDynamicList();
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
                    const DBdata = await DB.FindGroup('douyin', groupId);
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
                                const msgItem = DBdata[data[awemeId].sec_uid]?.message_id;
                                for (const gid in msgItem) {
                                    if (msgItem[gid] && msgItem[gid].message_id !== '' && groupId === gid) {
                                        await karin.sendMsg(String(uin), karin.contactGroup(group_id), [
                                            segment.reply(msgItem[gid].message_id),
                                            segment.text(`「${data[awemeId].remark}」的直播已经结束惹 ~\n`),
                                            segment.text(`直播时长：${Common.timeSince(DBdata[data[awemeId].sec_uid].start_living_pn)}`)
                                        ]);
                                        break;
                                    }
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
                                    if (Detail_Data?.liveStatus?.isliving) {
                                        DBdata[isSecUidFound].message_id[groupId].message_id = status.message_id;
                                        DBdata[isSecUidFound].living = data[awemeId].living;
                                        DBdata[isSecUidFound].start_living_pn = Date.now();
                                    }
                                    else {
                                        DBdata[isSecUidFound].message_id = { [groupId]: { message_id: '' }, ...DBdata[isSecUidFound].message_id };
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
                                        message_id: {
                                            [groupId]: {
                                                message_id: 'liveStatus' in data[awemeId].Detail_Data && data[awemeId].living ? status.message_id : ''
                                            }
                                        },
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
                                    message_id: {
                                        [groupId]: {
                                            message_id: 'liveStatus' in data[awemeId].Detail_Data && data[awemeId].living ? status.message_id : ''
                                        }
                                    },
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
                if (liveStatus?.liveStatus === 'open') {
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
                // 如果直播状态更变，不管是开播还是关播，都要保留该群组
                if ('liveStatus' in pushItem.Detail_Data) {
                    // 开播推送
                    if (pushItem.living === true) {
                        const msgItem = cachedData.message_id[groupId];
                        if (msgItem && msgItem.message_id === '') {
                            filteredGroupIds.push(groupId);
                            continue;
                        }
                    }
                    // 关播推送
                    if (pushItem.living === false && cachedData.living === true) {
                        const msgItem = cachedData.message_id[groupId];
                        if (msgItem && msgItem.message_id !== '') {
                            filteredGroupIds.push(groupId);
                            continue;
                        }
                    }
                }
                // 当该作品ID不在数据库缓存列表中时，直接保留该群组
                if (!cachedData.aweme_idlist.includes(awemeId) && !('liveStatus' in pushItem.Detail_Data)) {
                    filteredGroupIds.push(groupId);
                    continue;
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
        for (const i of Config.pushlist.douyin) {
            const remark = i.remark;
            const group_id = i.group_id;
            const sec_uid = i.sec_uid;
            const short_id = i.short_id;
            if (!remark) {
                abclist.push({ sec_uid, group_id });
            }
            if (!short_id) {
                abclist.push({ sec_uid, group_id });
            }
        }
        if (abclist.length > 0) {
            for (const i of abclist) {
                const resp = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid: i.sec_uid });
                const remark = resp.user.nickname;
                const matchingItemIndex = config.douyin.findIndex((item) => item.sec_uid === i.sec_uid);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbGF0Zm9ybS9kb3V5aW4vcHVzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBZ0IsS0FBSyxFQUFnQixNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBRXZGLE9BQU8sRUFBZSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQWdCLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0RixPQUFPLEVBQTZCLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBMkIxRSxNQUFNLE9BQU8sVUFBVyxTQUFRLElBQUk7SUFDMUIsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUNyQjs7Ozs7O09BTUc7SUFDSCxZQUFhLElBQUksRUFBa0IsRUFBRSxLQUFLLEdBQUcsS0FBSztRQUNoRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDUixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDaEMsT0FBTTtRQUNSLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTtRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQTtRQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUNwQixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU07UUFDVixJQUFJLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFBO1FBRXpDLElBQUksQ0FBQztZQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1lBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUks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