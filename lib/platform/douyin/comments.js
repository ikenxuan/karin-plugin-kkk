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
        const relativeTime = getRelativeTimeFromTimestamp(time);
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
    for (const i of jsonArray) {
        if (i.digg_count > 10000) {
            i.digg_count = (i.digg_count / 10000).toFixed(1) + 'w';
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
function getRelativeTimeFromTimestamp(timestamp) {
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
    for (const i of data) {
        let text = i.text;
        text = text.replace(/\n/g, '<br>');
        i.text = text;
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
            const headers = await new Networks({ url: item.commentimage, type: 'arraybuffer' }).getHeaders();
            if (headers["content-type"] && headers["content-type"] === 'image/heic') {
                const response = await new Networks({ url: item.commentimage, type: 'arraybuffer' }).returnResult();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0vZG91eWluL2NvbW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUMvQyxPQUFPLE9BQU8sTUFBTSxjQUFjLENBQUE7QUFFbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDekM7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGNBQWMsQ0FBRSxJQUFTLEVBQUUsU0FBYztJQUM3RCxJQUFJLFNBQVMsR0FBVSxFQUFFLENBQUE7SUFDekIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUk7UUFBRSxPQUFPLEVBQUUsQ0FBQTtJQUVyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtRQUNoQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtRQUMxQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDL0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNwRSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMs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