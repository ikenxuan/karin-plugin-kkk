import { getDouyinData } from '@ikenxuan/amagi';
import convert from 'heic-convert';
import { Common, Config } from '../../module/utils/index.js';
import { Networks } from '../../module/utils/index.js';
/**
 *
 * @param {*} data 完整的评论数据
 * @param {*} emojidata 处理过后的emoji列表
 * @returns obj
 */
export async function douyinComments(data, emojidata) {
    let jsonArray = [];
    if (data.comments === null)
        return [];
    for (let i = 0; i < data.comments.length; i++) {
        const cid = data.comments[i].cid;
        const aweme_id = data.comments[i].aweme_id;
        const nickname = data.comments[i].user.nickname;
        const userimageurl = data.comments[i].user.avatar_larger.url_list[0];
        const text = data.comments[i].text;
        const ip = data.comments[i].ip_label ? data.comments[i].ip_label : '未知';
        const time = data.comments[i].create_time;
        const label_type = data.comments[i].label_type ? data.comments[i].label_type : -1;
        const sticker = data.comments[i].sticker ? data.comments[i].sticker.animate_url.url_list[0] : null;
        const digg_count = data.comments[i].digg_count;
        const imageurl = data.comments[i].image_list &&
            data.comments[i].image_list[0] &&
            data.comments[i].image_list[0].origin_url &&
            data.comments[i].image_list[0].origin_url.url_list
            ? data.comments[i].image_list[0].origin_url.url_list[0]
            : null;
        const status_label = data.comments[i].label_list ? data.comments[i].label_list[0].text : null;
        const userintextlongid = data.comments[i].text_extra && data.comments[i].text_extra[0] && data.comments[i].text_extra[0].sec_uid
            ? data.comments[i].text_extra[0].sec_uid && data.comments[i].text_extra.map((extra) => extra.sec_uid)
            : null;
        const search_text = data.comments[i].text_extra && data.comments[i].text_extra[0] && data.comments[i].text_extra[0].search_text
            ? data.comments[i].text_extra[0].search_text &&
                data.comments[i].text_extra.map((extra) => ({
                    search_text: extra.search_text,
                    search_query_id: extra.search_query_id
                }))
            : null;
        const relativeTime = await getRelativeTimeFromTimestamp(time);
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
            search_text,
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
    for (let i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i].digg_count > 10000) {
            jsonArray[i].digg_count = (jsonArray[i].digg_count / 10000).toFixed(1) + 'w';
        }
    }
    for (const item1 of CommentData.jsonArray) {
        // 遍历emojidata中的每个元素
        for (const item2 of emojidata) {
            // 如果jsonArray中的text包含在emojidata中的name中
            if (item1.text.includes(item2.name)) {
                // 检查是否存在中括号
                if (item1.text.includes('[') && item1.text.includes(']')) {
                    item1.text = item1.text.replace(/\[[^\]]*\]/g, `<img src="${item2.url}"/>`).replace(/\\/g, '');
                }
                else {
                    item1.text = `<img src="${item2.url}"/>`;
                }
                item1.text += '&#160';
            }
        }
    }
    return CommentData;
}
async function getRelativeTimeFromTimestamp(timestamp) {
    const now = Math.floor(Date.now() / 1000); // 当前时间的时间戳
    const differenceInSeconds = now - timestamp;
    if (differenceInSeconds < 30) {
        return '刚刚';
    }
    else if (differenceInSeconds < 60) {
        return differenceInSeconds + '秒前';
    }
    else if (differenceInSeconds < 3600) {
        return Math.floor(differenceInSeconds / 60) + '分钟前';
    }
    else if (differenceInSeconds < 86400) {
        return Math.floor(differenceInSeconds / 3600) + '小时前';
    }
    else if (differenceInSeconds < 2592000) {
        return Math.floor(differenceInSeconds / 86400) + '天前';
    }
    else if (differenceInSeconds < 7776000) {
        // 三个月的秒数
        return Math.floor(differenceInSeconds / 2592000) + '个月前';
    }
    else {
        const date = new Date(timestamp * 1000); // 将时间戳转换为毫秒
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return year + '-' + month + '-' + day;
    }
}
/**
 * 高亮 @ 的内容
 * @param data 评论数据
 * @returns
 */
async function handling_at(data) {
    for (const item of data) {
        if (item.is_At_user_id !== null && Array.isArray(item.is_At_user_id)) {
            for (const secUid of item.is_At_user_id) {
                const UserInfoData = await getDouyinData('用户主页数据', Config.cookies.douyin, { sec_uid: secUid });
                if (UserInfoData.user.sec_uid === secUid) {
                    /** 这里评论只要生成了艾特，如果艾特的人改了昵称，评论也不会变，所以可能会出现有些艾特没有正确上颜色，因为接口没有提供历史昵称 */
                    const regex = new RegExp(`@${UserInfoData.user.nickname?.replace(/[-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')}`, 'g');
                    item.text = item.text.replace(regex, (match) => {
                        return `<span class="${Common.useDarkTheme() ? 'dark-mode handling_at' : 'handling_at'}">${match}</span>`;
                    });
                }
            }
        }
    }
    return data;
}
/**
 * 高亮热点搜索关键词
 * @param data 评论数据
 * @returns
 */
async function search_text(data) {
    for (const item of data) {
        if (item.search_text !== null && Array.isArray(item.search_text)) {
            for (const search_text of item.search_text) {
                const SuggestWordsData = await getDouyinData('热点词数据', Config.cookies.douyin, { query: search_text.search_text });
                if (SuggestWordsData.data &&
                    SuggestWordsData.data[0] &&
                    SuggestWordsData.data[0].params &&
                    SuggestWordsData.data[0].params.query_id &&
                    SuggestWordsData.data[0].params.query_id === search_text.search_query_id) {
                    const regex = new RegExp(`${search_text.search_text}`, 'g');
                    item.text = item.text.replace(regex, (match) => {
                        const themeClass = Common.useDarkTheme() ? 'dark-mode' : '';
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
/**
 * 换行符转义为<br>
 * @param data 评论数据
 * @returns
 */
function br(data) {
    for (let i = 0; i < data.length; i++) {
        let text = data[i].text;
        text = text.replace(/\n/g, '<br>');
        data[i].text = text;
    }
    return data;
}
/**
 * HEIC转JPG
 * @param jsonArray 评论数据
 * @returns
 */
const heic2jpg = async (jsonArray) => {
    for (const item of jsonArray) {
        if (item.commentimage) {
            const response = await new Networks({ url: item.commentimage, type: 'arraybuffer' }).returnResult();
            if (response.headers["content-type"] && response.headers["content-type"] === 'image/heic') {
                const jpegBuffer = await convert({
                    buffer: response.data,
                    format: 'JPEG'
                });
                const base64Image = Buffer.from(jpegBuffer).toString('base64');
                item.commentimage = `data:image/jpeg;base64,${base64Image}`;
            }
        }
    }
    return jsonArray;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0vZG91eWluL2NvbW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUMvQyxPQUFPLE9BQU8sTUFBTSxjQUFjLENBQUE7QUFFbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDekM7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGNBQWMsQ0FBRSxJQUFTLEVBQUUsU0FBYztJQUM3RCxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFDbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUk7UUFBRSxPQUFPLEVBQUUsQ0FBQTtJQUVyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtRQUNoQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtRQUMxQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDL0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNwRSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMs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