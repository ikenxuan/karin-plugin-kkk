import { getBilibiliData } from '@ikenxuan/amagi';
import { common, karin, logger, segment } from 'node-karin';
import { Base, Common, Config, DB, Render } from '../../module/index.js';
import { fetchBilibiliData } from '../../platform/bilibili/index.js';
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
    /**
     * 异步获取数据并根据动态类型处理和发送动态信息。
     * @param data 包含动态相关信息的对象。
     */
    async getdata(data) {
        let nocd_data;
        for (const dynamicId in data) {
            // 检查banWords，banTags
            let skip = skipDynamic(data[dynamicId].Dynamic_Data);
            let send = true, send_video = true, img = [];
            const dynamicCARDINFO = await fetchBilibiliData('dynamic_card', { dynamic_id: dynamicId });
            const dycrad = dynamicCARDINFO.data.card && dynamicCARDINFO.data.card.card && JSON.parse(dynamicCARDINFO.data.card.card);
            if (!skip) {
                const userINFO = await fetchBilibiliData('user_profile', { host_mid: data[dynamicId].host_mid });
                let emojiDATA = await fetchBilibiliData('emoji_list');
                emojiDATA = extractEmojisData(emojiDATA.data.packages);
                logger.debug(`UP: ${data[dynamicId].remark}\n动态id：${dynamicId}\nhttps://t.bilibili.com/${dynamicId}`);
                switch (data[dynamicId].dynamic_type) {
                    /** 处理图文动态 */
                    case 'DYNAMIC_TYPE_DRAW': {
                        /**
                         * 生成图片数组
                         * @returns
                         */
                        const cover = () => {
                            // 初始化一个空数组来存放图片对象
                            const imgArray = [];
                            // 遍历dycrad.item.pictures数组，将每个图片的img_src存入对象，并将该对象加入imgArray
                            for (let i = 0; i < dycrad.item.pictures.length; i++) {
                                const obj = {
                                    image_src: dycrad.item.pictures[i].img_src
                                };
                                imgArray.push(obj);
                            }
                            // 返回包含所有图片对象的数组
                            return imgArray;
                        };
                        img = await Render('bilibili/dynamic/DYNAMIC_TYPE_DRAW', {
                            image_url: cover(),
                            text: replacetext(br(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data),
                            dianzan: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
                            pinglun: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
                            share: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
                            create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                            avater_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                            frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                            share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
                            username: checkvip(userINFO.data.card),
                            fans: this.count(userINFO.data.follower),
                            user_shortid: data[dynamicId].host_mid,
                            total_favorited: this.count(userINFO.data.like_num),
                            following_count: this.count(userINFO.data.card.attention),
                            dynamicTYPE: '图文动态推送'
                        });
                        break;
                    }
                    /** 处理纯文动态 */
                    case 'DYNAMIC_TYPE_WORD': {
                        let text = replacetext(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text, data[dynamicId].Dynamic_Data);
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
                            avater_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
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
                    case 'DYNAMIC_TYPE_AV': {
                        if (data[dynamicId].Dynamic_Data.modules.module_dynamic.major.type === 'MAJOR_TYPE_ARCHIVE') {
                            const aid = data[dynamicId].Dynamic_Data.modules.module_dynamic.major.archive.aid;
                            const bvid = data[dynamicId].Dynamic_Data.modules.module_dynamic.major.archive.bvid;
                            const INFODATA = await getBilibiliData('单个视频作品数据', '', { id_type: 'bvid', id: bvid });
                            /** 特殊字段，只有番剧和影视才会有，如果是该类型视频，默认不发送 */
                            if (INFODATA.data.redirect_url) {
                                send_video = false;
                                logger.debug(`UP主：${INFODATA.data.owner.name} 的该动态类型为${logger.yellow('番剧或影视')}，默认跳过不下载，直达：${logger.green(INFODATA.data.redirect_url)}`);
                            }
                            else {
                                nocd_data = await getBilibiliData('单个视频下载信息数据', '', { avid: INFODATA.data.aid, cid: INFODATA.data.cid });
                            }
                            img = await Render('bilibili/dynamic/DYNAMIC_TYPE_AV', {
                                image_url: [{ image_src: INFODATA.data.pic }],
                                text: br(INFODATA.data.title),
                                desc: br(dycrad.desc),
                                dianzan: this.count(INFODATA.data.stat.like),
                                pinglun: this.count(INFODATA.data.stat.reply),
                                share: this.count(INFODATA.data.stat.share),
                                create_time: Common.convertTimestampToDateTime(INFODATA.data.ctime),
                                avater_url: INFODATA.data.owner.face,
                                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                                share_url: 'https://www.bilibili.com/video/' + bvid,
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
                    case 'DYNAMIC_TYPE_LIVE_RCMD': {
                        img = await Render('bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD', {
                            image_url: [{ image_src: dycrad.live_play_info.cover }],
                            text: br(dycrad.live_play_info.title),
                            liveinf: br(`${dycrad.live_play_info.area_name} | 房间号: ${dycrad.live_play_info.room_id}`),
                            username: checkvip(userINFO.data.card),
                            avater_url: userINFO.data.card.face,
                            frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                            fans: this.count(userINFO.data.follower),
                            create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                            now_time: Common.getCurrentTime(),
                            share_url: 'https://live.bilibili.com/' + dycrad.live_play_info.room_id,
                            dynamicTYPE: '直播动态推送'
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
                                        title: { timestampTitle: 'tmp_' + Date.now(), originTitle: dycrad.title }
                                    }, { active: true, activeOption: { uin, group_id } });
                                }
                                break;
                            }
                            case 'DYNAMIC_TYPE_DRAW': {
                                const imgArray = [];
                                for (const img of data[dynamicId].Dynamic_Data.modules.module_dynamic.major && data[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.draw?.items) {
                                    imgArray.push(segment.image(img.src));
                                }
                                const forwardMsg = common.makeForward(imgArray, uin, (await bot?.GetCurrentAccount()).account_name);
                                await bot.sendForwardMessage(karin.contactFriend(uin), forwardMsg);
                                break;
                            }
                        }
                    }
                }
                if (skip || status?.message_id) {
                    let DBdata = await DB.FindGroup('bilibili', groupId);
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
    async getDynamicList() {
        const willbepushlist = {};
        try {
            for (const item of Config.pushlist.bilibili) {
                const dynamic_list = await fetchBilibiliData('user_dynamic', { host_mid: item.host_mid });
                const ALL_DBdata = await DB.FindAll('bilibili');
                // 将数据库中的 group_id 转换为 Set，便于后续检查是否存在
                const dbGroupIds = new Set(Object.keys(ALL_DBdata).map(groupIdStr => groupIdStr.split(':')[0]));
                // 配置文件中的 group_id 转换为对象数组，每个对象包含群号和机器人账号
                const configGroupIdObjs = item.group_id.map(groupIdStr => {
                    const [groupId, robotId] = groupIdStr.split(':');
                    return { groupId: groupId, robotId };
                });
                // 找出新添加的群组ID
                const newGroupIds = configGroupIdObjs.filter(groupIdObj => !dbGroupIds.has(groupIdObj.groupId));
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
                        logger.debug(`前期获取该动态基本信息：\n动态ID：${dynamic.id_str}\n发布时间：${Common.convertTimestampToDateTime(Number(createTime))}\n发布时间戳（s）：${createTime}\n时间差（ms）：${timeDifference}\n是否置顶：${is_top}\n是否有新群组：${newGroupIds.length > 0}\n是否在一天内：${timeDifference < 86400000 ? logger.green('true') : logger.red('false')}`);
                        if ((is_top && timeDifference < 86400000) || (timeDifference < 86400000) || (newGroupIds.length > 0 && timeDifference < 86400000)) {
                            shouldPush = true;
                            logger.debug(logger.green(`根据以上判断，shoulPush 为 true，将对该动态：https://t.bilibili.com/${dynamic.id_str}\n`));
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
        const groupInfo = await this.e.bot.GetGroupInfo(this.e.group_id);
        let msg;
        const host_mid = data.data.card.mid;
        const config = Config.pushlist; // 读取配置文件
        const group_id = this.e.group_id;
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
                msg = `群：${groupInfo.group_name}(${group_id})\n删除成功！${data.data.card.name}\nUID：${host_mid}`;
                // 如果删除后 group_id 数组为空，则删除整个属性
                if (existingItem.group_id.length === 0) {
                    const index = config.bilibili.indexOf(existingItem);
                    config.bilibili.splice(index, 1);
                }
            }
            else {
                const status = await DB.FindGroup('bilibili', `${group_id}:${this.e.self_id}`);
                if (!status) {
                    await DB.CreateSheet('bilibili', `${group_id}:${this.e.self_id}`, {});
                }
                // 否则，将新的 group_id 添加到该 host_mid 对应的数组中
                existingItem.group_id.push(`${group_id}:${this.e.self_id}`);
                msg = `群：${groupInfo.group_name}(${group_id})\n添加成功！${data.data.card.name}\nUID：${host_mid}`;
                logger.info(`\n设置成功！${data.data.card.name}\nUID：${host_mid}`);
            }
        }
        else {
            const status = await DB.FindGroup('bilibili', `${group_id}:${this.e.self_id}`);
            if (!status) {
                await DB.CreateSheet('bilibili', `${group_id}:${this.e.self_id}`, {});
            }
            // 不存在相同的 host_mid，新增一个配置项
            config.bilibili.push({ host_mid, group_id: [`${group_id}:${this.e.self_id}`], remark: data.data.card.name });
            msg = `群：${groupInfo.group_name}(${group_id})\n添加成功！${data.data.card.name}\nUID：${host_mid}`;
        }
        // 更新配置文件
        Config.modify('pushlist', 'bilibili', config.bilibili);
        return msg;
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
        for (let i = 0; i < Config.pushlist.bilibili.length; i++) {
            const remark = Config.pushlist.bilibili[i].remark;
            const group_id = Config.pushlist.bilibili[i].group_id;
            const host_mid = Config.pushlist.bilibili[i].host_mid;
            if (remark === undefined || remark === '') {
                abclist.push({ host_mid, group_id });
            }
        }
        // 如果有需要更新备注的用户，则逐个获取备注信息并更新到配置文件中
        if (abclist.length > 0) {
            for (let i = 0; i < abclist.length; i++) {
                // 从外部数据源获取用户备注信息
                const resp = await fetchBilibiliData('user_profile', { host_mid: abclist[i].host_mid });
                const remark = resp.data.card.name;
                // 在配置文件中找到对应的用户，并更新其备注信息
                const matchingItemIndex = config.bilibili.findIndex((item) => item.host_mid === abclist[i].host_mid);
                if (matchingItemIndex !== -1) {
                    config.bilibili[matchingItemIndex].remark = remark;
                }
            }
            // 将更新后的配置文件内容写回文件
            Config.modify('pushlist', 'bilibili', config.bilibili);
        }
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
    let light = false;
    const date = new Date().getHours();
    if (date >= 6 && date < 18) {
        light = true;
    }
    return member.vip.vipStatus === 1
        ? `<span style="color: ${member.vip.nickname_color || '#FB7299'}; font-weight: bold;">${member.name}</span>`
        : `<span style="color: ${light ? '#606060' : '#dbdbdb'}">${member.name}</span>`;
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
            try {
                // 尝试将表情的URL转换为URL对象，如果成功则将其添加到emojisData数组中
                // new URL(emote.url)
                emojisData.push({ text: emote.text, url: emote.url });
            }
            catch { } // 如果URL无效，则忽略该表情
        });
    });
    return emojisData;
}
function replacetext(text, obj) {
    for (const tag of obj.modules.module_dynamic.desc.rich_text_nodes) {
        // 对正则表达式中的特殊字符进行转义
        const escapedText = tag.orig_text.replace(/([.*+?^${}()|[\]\\])/g, '\\$1').replace(/\n/g, '\\n');
        const regex = new RegExp(escapedText, 'g');
        switch (tag.type) {
            case 'RICH_TEXT_NODE_TYPE_TOPIC':
            case 'RICH_TEXT_NODE_TYPE_AT': {
                text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#0C6692'};">${tag.orig_text}</span>`);
                break;
            }
            case 'RICH_TEXT_NODE_TYPE_LOTTERY': {
                text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#0C6692'};"><svg style="width: 65px;height: 65px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M3.7499750000000005 9.732083333333334C4.095158333333333 9.732083333333334 4.374975 10.011875000000002 4.374975 10.357083333333334L4.374975 15.357083333333334C4.374975 15.899458333333335 4.8147 16.339166666666667 5.357116666666667 16.339166666666667L14.642833333333334 16.339166666666667C15.185250000000002 16.339166666666667 15.625 15.899458333333335 15.625 15.357083333333334L15.625 10.357083333333334C15.625 10.011875000000002 15.904791666666668 9.732083333333334 16.25 9.732083333333334C16.595166666666668 9.732083333333334 16.875 10.011875000000002 16.875 10.357083333333334L16.875 15.357083333333334C16.875 16.589833333333335 15.875625000000001 17.589166666666667 14.642833333333334 17.589166666666667L5.357116666666667 17.589166666666667C4.124341666666667 17.589166666666667 3.124975 16.589833333333335 3.124975 15.357083333333334L3.124975 10.357083333333334C3.124975 10.011875000000002 3.4048 9.732083333333334 3.7499750000000005 9.732083333333334z" fill="currentColor"></path><path d="M2.4106916666666667 7.3214250000000005C2.4106916666666667 6.384516666666666 3.1702083333333335 5.625 4.107116666666667 5.625L15.892833333333334 5.625C16.82975 5.625 17.58925 6.384516666666666 17.58925 7.3214250000000005L17.58925 8.917583333333335C17.58925 9.74225 16.987583333333337 10.467208333333334 16.13125 10.554C15.073666666666668 10.661208333333335 13.087708333333333 10.803583333333334 10 10.803583333333334C6.912275 10.803583333333334 4.9263 10.661208333333335 3.8687250000000004 10.554C3.0123833333333336 10.467208333333334 2.4106916666666667 9.74225 2.4106916666666667 8.917583333333335L2.4106916666666667 7.3214250000000005zM4.107116666666667 6.875C3.8605666666666667 6.875 3.6606916666666667 7.0748750000000005 3.6606916666666667 7.3214250000000005L3.6606916666666667 8.917583333333335C3.6606916666666667 9.135250000000001 3.8040833333333333 9.291041666666667 3.9947583333333334 9.310375C5.0068 9.412958333333334 6.950525000000001 9.553583333333334 10 9.553583333333334C13.049458333333334 9.553583333333334 14.993166666666669 9.412958333333334 16.005166666666668 9.310375C16.195875 9.291041666666667 16.33925 9.135250000000001 16.33925 8.917583333333335L16.33925 7.3214250000000005C16.33925 7.0748750000000005 16.139375 6.875 15.892833333333334 6.875L4.107116666666667 6.875z" fill="currentColor"></path><path d="M5.446408333333333 4.464341666666667C5.446408333333333 3.1329416666666665 6.525716666666667 2.0536333333333334 7.857116666666667 2.0536333333333334C9.188541666666666 2.0536333333333334 10.267833333333334 3.1329416666666665 10.267833333333334 4.464341666666667L10.267833333333334 6.875058333333333L7.857116666666667 6.875058333333333C6.525716666666667 6.875058333333333 5.446408333333333 5.795741666666666 5.446408333333333 4.464341666666667zM7.857116666666667 3.3036333333333334C7.216075000000001 3.3036333333333334 6.696408333333334 3.8233 6.696408333333334 4.464341666666667C6.696408333333334 5.105391666666667 7.216075000000001 5.6250583333333335 7.857116666666667 5.6250583333333335L9.017833333333334 5.6250583333333335L9.017833333333334 4.464341666666667C9.017833333333334 3.8233 8.498166666666668 3.3036333333333334 7.857116666666667 3.3036333333333334z" fill="currentColor"></path><path d="M9.732083333333334 4.464341666666667C9.732083333333334 3.1329416666666665 10.811416666666666 2.0536333333333334 12.142833333333334 2.0536333333333334C13.474250000000001 2.0536333333333334 14.553583333333336 3.1329416666666665 14.553583333333336 4.464341666666667C14.553583333333336 5.795741666666666 13.474250000000001 6.875058333333333 12.142833333333334 6.875058333333333L9.732083333333334 6.875058333333333L9.732083333333334 4.464341666666667zM12.142833333333334 3.3036333333333334C11.501791666666666 3.3036333333333334 10.982083333333334 3.8233 10.982083333333334 4.464341666666667L10.982083333333334 5.6250583333333335L12.142833333333334 5.6250583333333335C12.783875 5.6250583333333335 13.303583333333334 5.105391666666667 13.303583333333334 4.464341666666667C13.303583333333334 3.8233 12.783875 3.3036333333333334 12.142833333333334 3.3036333333333334z" fill="currentColor"></path><path d="M10 4.732058333333334C10.345166666666666 4.732058333333334 10.625 5.011875 10.625 5.357058333333334L10.625 16.428500000000003C10.625 16.773666666666667 10.345166666666666 17.053500000000003 10 17.053500000000003C9.654791666666668 17.053500000000003 9.375 16.773666666666667 9.375 16.428500000000003L9.375 5.357058333333334C9.375 5.011875 9.654791666666668 4.732058333333334 10 4.732058333333334z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`);
                break;
            }
            case 'RICH_TEXT_NODE_TYPE_WEB': {
                text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? '#58B0D5' : '#0C6692'};"><svg style="width: 60px;height: 60px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M9.571416666666666 7.6439C9.721125 7.33675 10.091416666666667 7.209108333333334 10.398583333333335 7.358808333333333C10.896041666666667 7.540316666666667 11.366333333333333 7.832000000000001 11.767333333333333 8.232975C13.475833333333334 9.941541666666668 13.475833333333334 12.711625 11.767333333333333 14.420166666666669L9.704916666666666 16.482583333333334C7.996383333333334 18.191125000000003 5.226283333333334 18.191125000000003 3.5177416666666668 16.482583333333334C1.8091916666666668 14.774041666666669 1.8091916666666668 12.003916666666667 3.5177416666666668 10.295375L5.008791666666667 8.804333333333334C5.252875 8.56025 5.6486 8.56025 5.892683333333334 8.804333333333334C6.136758333333334 9.048416666666668 6.136758333333334 9.444125000000001 5.892683333333334 9.688208333333334L4.401625 11.179250000000001C3.1812333333333336 12.399666666666667 3.1812333333333336 14.378291666666668 4.401625 15.598708333333335C5.622000000000001 16.819083333333335 7.60065 16.819083333333335 8.821041666666668 15.598708333333335L10.883416666666667 13.536291666666667C12.103833333333334 12.315916666666666 12.103833333333334 10.337250000000001 10.883416666666667 9.116875C10.582458333333333 8.815875 10.229416666666667 8.600908333333333 9.856458333333334 8.471066666666667C9.549333333333333 8.321375 9.421708333333335 7.9510499999999995 9.571416666666666 7.6439z" fill="currentColor"></path><path d="M15.597541666666668 4.402641666666667C14.377166666666668 3.1822500000000002 12.398541666666667 3.1822500000000002 11.178125000000001 4.402641666666667L9.11575 6.465033333333333C7.895358333333333 7.685425 7.895358333333333 9.664041666666668 9.11575 10.884458333333333C9.397666666666668 11.166375 9.725916666666667 11.371583333333334 10.073083333333333 11.500958333333333C10.376583333333334 11.658083333333334 10.495291666666667 12.031416666666667 10.338208333333332 12.334875C10.181083333333333 12.638375 9.80775 12.757083333333334 9.504291666666667 12.6C9.042416666666666 12.420333333333334 8.606383333333333 12.142833333333334 8.231858333333333 11.768333333333334C6.523316666666667 10.059791666666667 6.523316666666667 7.289691666666666 8.231858333333333 5.58115L10.29425 3.5187583333333334C12.002791666666667 1.8102083333333334 14.772875 1.8102083333333334 16.481458333333336 3.5187583333333334C18.19 5.2273000000000005 18.19 7.997400000000001 16.481458333333336 9.705916666666667L15.054916666666667 11.132458333333334C14.810875000000001 11.3765 14.415166666666668 11.3765 14.171041666666667 11.132458333333334C13.927 10.888333333333334 13.927 10.492625 14.171041666666667 10.248541666666666L15.597541666666668 8.822041666666667C16.81791666666667 7.601666666666667 16.81791666666667 5.623025 15.597541666666668 4.402641666666667z" fill="currentColor"></path></svg> ${tag.text}</span>`);
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
/**
 * 判断标题是否有屏蔽词或屏蔽标签
 * @param Dynamic_Data 作品详情数据
 * @returns
 */
const skipDynamic = (Dynamic_Data) => {
    for (const banWord of Config.douyin.push.banWords) {
        if (Dynamic_Data.modules.module_dynamic.major?.archive?.title.includes(banWord) || Dynamic_Data.modules.module_dynamic.desc?.text?.includes(banWord)) {
            logger.mark(`动态：${logger.green(`https://t.bilibili.com/${Dynamic_Data.id_str}`)} 包含屏蔽词：「${logger.red(banWord)}」，跳过推送`);
            return true;
        }
    }
    if (Dynamic_Data.type === 'DYNAMIC_TYPE_DRAW') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbGF0Zm9ybS9iaWxpYmlsaS9wdXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFnQixLQUFLLEVBQThCLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFFckcsT0FBTyxFQUFlLElBQUksRUFBa0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBMEJ2RCxNQUFNLE9BQU8sWUFBYSxTQUFRLElBQUk7SUFDNUIsS0FBSyxHQUFZLEtBQUssQ0FBQTtJQUM5Qjs7Ozs7T0FLRztJQUNILFlBQWEsSUFBSSxFQUFrQixFQUFFLFFBQWlCLEtBQUs7UUFDekQsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsWUFBWTtRQUNyQiw0Q0FBNEM7UUFDNUMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQ2hDLE9BQU07UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUEsQ0FBQyxjQUFjO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsTUFBTTtRQUNWLElBQUksTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUE7UUFFekMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7WUFDdEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRTVFLElB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