import { logger } from 'node-karin';
import { Config, Version } from '../../module/utils/index.js';
import fs from 'node:fs';
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
    removeFile: async (path, force = false) => {
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
        let month = now.getMonth() + 1; // month 是 number 类型
        let day = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZS91dGlscy9Db21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFFeEIsYUFBYTtBQUNiLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRztJQUNwQjs7OztPQUlHO0lBQ0gsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFlLEVBQW1CLEVBQUU7UUFDMUQsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDZixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQzNELEtBQUssTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMvQixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFLENBQUM7b0JBQ3RCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQTtnQkFDZixDQUFDO3FCQUFNLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUUsQ0FBQztvQkFDN0IsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFBO2dCQUNmLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTyxFQUFFO1FBQ1AsYUFBYTtRQUNiLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxTQUFTLFNBQVMsT0FBTyxDQUFDLFVBQVUscUJBQXFCO1FBQzNFLGFBQWE7UUFDYixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FB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