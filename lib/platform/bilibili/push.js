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
    /**
     * 异步获取数据并根据动态类型处理和发送动态信息。
     * @param data 包含动态相关信息的对象。
     */
    async getdata(data) {
        let nocd_data;
        for (const dynamicId in data) {
            // 检查banWords，banTags
            let skip = skipDynamic(data[dynamicId].Dynamic_Data);
            let send_video = true, img = [];
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
                            for (const i of dycrad.item.pictures) {
                                const obj = {
                                    image_src: i.img_src
                                };
                                imgArray.push(obj);
                            }
                            // 返回包含所有图片对象的数组
                            return imgArray;
                        };
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
                            decoration_card: data[dynamicId].Dynamic_Data.modules.module_author.decorate ?
                                `<div style="display: flex; width: 500px; height: 150px; background-position: center; background-attachment: fixed; background-repeat: no-repeat; background-size: contain; align-items: center; justify-content: flex-end; background-image: url('${data[dynamicId].Dynamic_Data.modules.module_author.decorate.card_url}')">${generateGradientStyle(data[dynamicId].Dynamic_Data.modules.module_author.decorate.fan.color_format.colors, data[dynamicId].Dynamic_Data.modules.module_author.decorate.fan.num_str)}</div>` : '<div></div>',
                            render_time: Common.getCurrentTime(),
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
    return member.vip.vipStatus === 1
        ? `<span style="color: ${member.vip.nickname_color || '#FB7299'}; font-weight: bold;">${member.name}</span>`
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
function replacetext(text, obj) {
    for (const tag of obj.modules.module_dynamic.desc.rich_text_nodes) {
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
const generateGradientStyle = (colors, text) => {
    const gradientString = colors.map((color) => {
        return `${color}`;
    }).join(', ');
    // 返回完整的CSS样式字符串
    return `<span style="font-family: bilifont; color: transparent; background-clip: text; margin: 0 200px 0 0; font-size: 43px; background-image: linear-gradient(135deg, ${gradientString} 0%, ${gradientString} 100%); ">${text}</span>`;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbGF0Zm9ybS9iaWxpYmlsaS9wdXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFnQixLQUFLLEVBQWdCLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFFdkYsT0FBTyxFQUFlLElBQUksRUFBa0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBd0J2RCxNQUFNLE9BQU8sWUFBYSxTQUFRLElBQUk7SUFDNUIsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUNyQjs7Ozs7T0FLRztJQUNILFlBQWEsSUFBSSxFQUFrQixFQUFFLEtBQUssR0FBRyxLQUFLO1FBQ2hELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLFlBQVk7UUFDckIsNENBQTRDO1FBQzVDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUNoQyxPQUFNO1FBQ1IsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBLENBQUMsY0FBYztJQUNuQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE1BQU07UUFDVixJQUFJLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFBO1FBRXpDLElBQUksQ0FBQztZQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1lBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUU1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