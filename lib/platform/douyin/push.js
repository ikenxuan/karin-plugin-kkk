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
                                const msgItem = DBdata[data[awemeId].sec_uid]?.message_id;
                                for (const gid in msgItem) {
                                    if (msgItem[gid] && msgItem[gid].message_id !== '' && groupId === gid) {
                                        await karin.sendMsg(String(uin), karin.contactGroup(group_id), [
                                            segment.reply(msgItem[gid].message_id),
                                            segment.text(`「${data[awemeId].remark}」的直播已经结束惹 ~\n`),
                                            segment.text(`直播时间：${Common.timeSince(DBdata[data[awemeId].sec_uid].start_living_pn)}`)
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
                                        DBdata[isSecUidFound].message_id[groupId].message_id = '',
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
                // 如果是普通动态，检查 aweme_id 是否已缓存
                // 如果缓存列表中没有该 awemeId，则保留该群组
                if (pushItem.living === true && cachedData.living === false && !cachedData.aweme_idlist.includes(awemeId)) {
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