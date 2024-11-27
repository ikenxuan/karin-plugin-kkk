import { Config } from '../../module/index.js';
/**
 *
 * @param {*} data 完整的评论数据
 * @param {*} emojidata 处理过后的emoji列表
 * @returns obj
 */
export async function kuaishouComments(data, emojidata) {
    let jsonArray = [];
    for (let i = 0; i < data.data.visionCommentList.rootComments.length; i++) {
        const cid = data.data.visionCommentList.rootComments[i].commentId;
        const aweme_id = data.data.visionCommentList.rootComments[i].commentId;
        const nickname = data.data.visionCommentList.rootComments[i].authorName;
        const userimageurl = data.data.visionCommentList.rootComments[i].headurl;
        const text = data.data.visionCommentList.rootComments[i].content;
        const time = getRelativeTimeFromTimestamp(data.data.visionCommentList.rootComments[i].timestamp);
        const digg_count = data.data.visionCommentList.rootComments[i].likedCount;
        const commentObj = {
            id: i + 1,
            cid,
            aweme_id,
            nickname,
            userimageurl,
            text,
            digg_count,
            create_time: time
        };
        jsonArray.push(commentObj);
    }
    // 按照点赞量降序
    jsonArray.sort((a, b) => b.digg_count - a.digg_count);
    // const indexLabelTypeOne = jsonArray.findIndex((comment) => comment.label_type === 1)
    // if (indexLabelTypeOne !== -1) {
    //   const commentTypeOne = jsonArray.splice(indexLabelTypeOne, 1)[0]
    //   jsonArray.unshift(commentTypeOne)
    // }
    jsonArray = br(jsonArray);
    jsonArray = await handling_at(jsonArray);
    // jsonArray.text = await search_text(jsonArray)
    for (let i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i].digg_count > 10000) {
            jsonArray[i].digg_count = (jsonArray[i].digg_count / 10000).toFixed(1) + 'w';
        }
    }
    for (const item1 of jsonArray) {
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
    // 从数组前方开始保留 Config.kuaishou.kuaishounumcomments 条评论，自动移除数组末尾的评论
    return jsonArray.slice(0, Math.min(jsonArray.length, Config.kuaishou.kuaishounumcomments));
}
function getRelativeTimeFromTimestamp(timestamp) {
    // 快手是毫秒（ms）
    const timestampInSeconds = Math.floor(timestamp / 1000);
    const now = Math.floor(Date.now() / 1000);
    const differenceInSeconds = now - timestampInSeconds;
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
 * 处理换行符
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
 * 处理 @
 * @param data 评论数据
 * @returns
 */
async function handling_at(data) {
    for (let i = 0; i < data.length; i++) {
        let text = data[i].text;
        // 匹配 @后面的字符，允许空格，直到 (\w+\)
        text = text.replace(/(@[\S\s]+?)\(\w+\)/g, (match, p1) => {
            // 将 @后面的名字替换为带有样式的 <span>，保留空格
            return `<span style="color: rgb(3,72,141);">${p1.trim()}</span>`;
        });
        data[i].text = text;
    }
    return data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0va3VhaXNob3UvY29tbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVqQzs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsZ0JBQWdCLENBQUUsSUFBUyxFQUFFLFNBQWM7SUFDL0QsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN6RSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7UUFDakUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO1FBQ3RFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQTtRQUN2RSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUE7UUFDeEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFBO1FBQ2hFLE1BQU0sSUFBSSxHQUFHLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFD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