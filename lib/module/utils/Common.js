import fs from 'node:fs';
import { logger } from 'node-karin';
import { Config } from '../../module/utils/index.js';
import { Version } from './Version.js';
/** 常用工具合集 */
export const Common = {
    /**
     * 获取引用消息
     * @param e event 消息事件
     * @returns 被引用的消息
     */
    getReplyMessage: async (e) => {
        if (e.reply_id) {
            const reply = await e.bot.GetMessage(e.contact, e.reply_id);
            for (const v of reply.elements) {
                if (v.type === 'text') {
                    return v.text;
                }
                else if (v.type === 'json') {
                    return v.data;
                }
            }
        }
        return '';
    },
    /**
     * 插件缓存文件夹
     */
    tempDri: {
        /** 视频缓存文件 */
        video: `${Version.karinPath}/temp/${Version.pluginName}/kkkdownload/video/`,
        /** 图片缓存文件 */
        images: `${Version.karinPath}/temp/${Version.pluginName}/kkkdownload/images/`
    },
    /**
     * 将中文数字转换为阿拉伯数字的函数
     * @param chineseNumber 数字的中文
     * @returns 中文数字对应的阿拉伯数字映射
     */
    chineseToArabic: (chineseNumber) => {
        // 映射表，定义基础的中文数字
        const chineseToArabicMap = {
            '零': 0, '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9
        };
        // 对应中文单位映射
        const units = {
            '十': 10, '百': 100, '千': 1000, '万': 10000, '亿': 100000000
        };
        let result = 0;
        let temp = 0; // 存储每一段的临时结果
        let unit = 1; // 当前处理的单位，初始为1
        for (let i = chineseNumber.length - 1; i >= 0; i--) {
            const char = chineseNumber[i];
            // 如果是单位字符
            if (units[char] !== undefined) {
                unit = units[char];
                if (unit === 10000 || unit === 100000000) {
                    result += temp * unit;
                    temp = 0;
                }
            }
            // 如果是数字字符
            else {
                const num = chineseToArabicMap[char];
                if (unit > 1) {
                    temp += num * unit;
                }
                else {
                    temp += num;
                }
                unit = 1; // 重置单位
            }
        }
        return result + temp;
    },
    /**
     * 格式化cookie字符串
     * @param cookies cookie数组
     * @returns 格式化后的cookie字符串
     */
    formatCookies: (cookies) => {
        return cookies.map(cookie => {
            // 分割每个cookie字符串以获取名称和值
            const [nameValue, ...attributes] = cookie.split(';').map((part) => part.trim());
            const [name, value] = nameValue.split('=');
            // 重新组合名称和值，忽略其他属性
            return `${name}=${value}`;
        }).join('; ');
    },
    /**
     * 计算目标视频平均码率（单位：Kbps）
     * @param targetSizeMB 目标视频大小（MB）
     * @param duration 视频时长（秒）
     * @returns
     */
    calculateBitrate: (targetSizeMB, duration) => {
        // 将目标大小转换为字节
        const targetSizeBytes = targetSizeMB * 1024 * 1024; // 转换为字节
        // 计算比特率并返回单位 Mbps
        return (targetSizeBytes * 8) / duration / 1024; // Kbps
    },
    /**
     * 获取视频文件大小（单位MB）
     * @param filePath 视频文件绝对路径
     * @returns
     */
    getVideoFileSize: async (filePath) => {
        try {
            const stats = await fs.promises.stat(filePath); // 获取文件信息
            const fileSizeInBytes = stats.size; // 文件大小（字节）
            const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // 转换为MB
            return fileSizeInMB;
        }
        catch (error) {
            console.error('获取文件大小时发生错误:', error);
            throw error;
        }
    },
    /**
     * 根据配置文件的配置项，删除缓存文件
     * @param path 文件的绝对路径
     * @param force 是否强制删除，默认false
     * @returns
     */
    removeFile: (path, force = false) => {
        path = path.replace(/\\/g, '/');
        if (Config.app.rmmp4) {
            try {
                fs.promises.unlink(path);
                logger.mark('缓存文件: ', path + ' 删除成功！');
                return true;
            }
            catch (err) {
                logger.error('缓存文件: ', path + ' 删除失败！', err);
                return false;
            }
        }
        else if (force) {
            try {
                fs.promises.unlink(path);
                logger.mark('缓存文件: ', path + ' 删除成功！');
                return true;
            }
            catch (err) {
                logger.error('缓存文件: ', path + ' 删除失败！', err);
                return false;
            }
        }
        return true;
    },
    /**
     * 将时间戳转换为日期时间字符串
     * @param timestamp 时间戳
     * @returns 格式为YYYY-MM-DD HH:MM的日期时间字符串
     */
    convertTimestampToDateTime: (timestamp) => {
        // 创建一个Date对象，时间戳乘以1000是为了转换为毫秒
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear(); // 获取年份
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 获取月份，确保两位数显示
        const day = String(date.getDate()).padStart(2, '0'); // 获取日，确保两位数显示
        const hours = String(date.getHours()).padStart(2, '0'); // 获取小时，确保两位数显示
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 获取分钟，确保两位数显示
        // 返回格式化后的日期时间字符串
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    /**
     * 获取当前时间：年-月-日 时:分:秒
     * @returns
     */
    getCurrentTime: () => {
        // 创建一个Date对象以获取当前时间
        const now = new Date();
        // 获取年、月、日、时、分、秒
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // month 是 number 类型
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        const formattedMonth = month < 10 ? '0' + month : '' + month;
        const formattedDay = day < 10 ? '0' + day : '' + day;
        const formattedHour = hour < 10 ? '0' + hour : '' + hour;
        const formattedMinute = minute < 10 ? '0' + minute : '' + minute;
        const formattedSecond = second < 10 ? '0' + second : '' + second;
        return `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`;
    },
    /**
     * 评论图、推送图是否使用深色模式
     * @returns
     */
    useDarkTheme: () => {
        let dark = true;
        const configTheme = Config.app.Theme;
        if (configTheme === 0) { // 自动
            const date = new Date().getHours();
            if (date >= 6 && date < 18) {
                dark = false;
            }
        }
        else if (configTheme === 1) {
            dark = false;
        }
        else if (configTheme === 2) {
            dark = true;
        }
        return dark;
    },
    /**
     * 传入一个时间戳（单位：毫秒），返回距离当前时间的相对的时间字符串
     * @param timestamp 时间戳
     * @returns 距离这个时间戳过去的多久的字符串
     */
    timeSince: (timestamp) => {
        const now = Date.now();
        const elapsed = now - timestamp;
        const seconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const remainingSeconds = seconds % 60;
        const remainingMinutes = minutes % 60;
        if (hours > 0) {
            return `${hours}小时${remainingMinutes}分钟${remainingSeconds}秒`;
        }
        else if (minutes > 0) {
            return `${minutes}分钟${remainingSeconds}秒`;
        }
        else {
            return `${seconds}秒`;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZS91dGlscy9Db21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRXhCLE9BQU8sRUFBZ0IsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV2QyxPQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFBO0FBRXBDLGFBQWE7QUFDYixNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUc7SUFDcEI7Ozs7T0FJRztJQUNILGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBZSxFQUFtQixFQUFFO1FBQzFELElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2YsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUMzRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRSxDQUFDO29CQUN0QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUE7Z0JBQ2YsQ0FBQztxQkFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFLENBQUM7b0JBQzdCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQTtnQkFDZixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU8sRUFBRTtRQUNQLGFBQWE7UUFDYixLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FBUyxTQUFTLE9BQU8sQ0FBQyxVQUFVLHFCQUFxQjtRQUMzRSxhQUFhO1FB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