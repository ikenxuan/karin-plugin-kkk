import fs from 'node:fs';
import karin, { logger, Plugin } from 'node-karin';
import path from 'path';
import { Common, Config, Render } from '../module/index.js';
import { bilibiliLogin, douyinLogin } from '../platform/index.js';
export const task = Config.app.rmmp4 && karin.task('[kkk-视频缓存自动删除]', '0 0 4 * * *', async () => {
    try {
        await removeAllFiles(Common.tempDri.video);
        logger.mark(Common.tempDri.video + '目录下所有文件已删除');
    }
    catch (err) {
        console.error('删除文件时出错:', err);
    }
});
export const biLogin = karin.command(new RegExp(/^#?(kkk)?\s*B站\s*(扫码)?\s*登录$/i), async (e) => {
    await bilibiliLogin(e);
    return true;
}, { permission: 'group.admin', name: 'kkk-ck管理' });
export const dylogin = karin.command(/^#?(kkk)?抖音(扫码)?登录$/, async (e) => {
    await douyinLogin(e);
    return true;
}, { permission: 'group.admin', name: 'kkk-ck管理' });
export const setdyck = karin.command(new RegExp(/^#?(kkk)?s*设置抖音ck$/i), async (e) => {
    const msg = await e.reply('请发在120秒内送抖音ck\n教程：https://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n');
    const context = await karin.ctx(e);
    Config.modify('cookies', 'douyin', context.msg);
    await e.bot.RecallMessage(e.contact, msg.message_id);
    await e.reply('设置成功！', { at: true });
    return true;
}, { permission: 'master', name: 'kkk-ck管理', event: 'message.private_message' });
export const setbilick = karin.command(new RegExp(/^#?(kkk)?s*设置s*(B站)ck$/i), async (e) => {
    const msg = await e.reply('请发在120秒内送B站ck\n教程：https://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n');
    const context = await karin.ctx(e);
    Config.modify('cookies', 'bilibili', context.msg);
    await e.bot.RecallMessage(e.contact, msg.message_id);
    await e.reply('设置成功！', { at: true });
    return true;
}, { permission: 'master', name: 'kkk-ck管理', event: 'message.private_message' });
// 插件类
export class Admin extends Plugin {
    constructor() {
        super({
            name: 'kkk-管理',
            rule: [
                { reg: createSwitchRegExp('app'), fnc: 'ConfigSwitch', permission: 'master' },
                { reg: createNumberRegExp('app'), fnc: 'ConfigNumber', permission: 'master' },
                { reg: createCustomRegExp('app'), fnc: 'ConfigCustom', permission: 'master' },
                { reg: createSwitchRegExp('douyin'), fnc: 'ConfigSwitch', permission: 'master' },
                { reg: createNumberRegExp('douyin'), fnc: 'ConfigNumber', permission: 'master' },
                { reg: createNumberRegExp('douyin'), fnc: 'ConfigCustom', permission: 'master' },
                { reg: createSwitchRegExp('bilibili'), fnc: 'ConfigSwitch', permission: 'master' },
                { reg: createNumberRegExp('bilibili'), fnc: 'ConfigNumber', permission: 'master' },
                { reg: createNumberRegExp('bilibili'), fnc: 'ConfigCustom', permission: 'master' },
                { reg: createSwitchRegExp('upload'), fnc: 'ConfigSwitch', permission: 'master' },
                { reg: createNumberRegExp('upload'), fnc: 'ConfigNumber', permission: 'master' },
                { reg: createNumberRegExp('upload'), fnc: 'ConfigCustom', permission: 'master' },
                { reg: createSwitchRegExp('kuaishou'), fnc: 'ConfigSwitch', permission: 'master' },
                { reg: createNumberRegExp('kuaishou'), fnc: 'ConfigNumber', permission: 'master' },
                { reg: createNumberRegExp('kuaishou'), fnc: 'ConfigCustom', permission: 'master' },
                { reg: /^#kkk设置$/, fnc: 'index_Settings', permission: 'master' },
                { reg: /^#?kkk删除缓存$/, fnc: 'deleteCache', permission: 'master' }
            ]
        });
    }
    async deleteCache(e) {
        await removeAllFiles(Common.tempDri.video);
        await e.reply(Common.tempDri.video + '目录下所有文件已删除');
        return true;
    }
    // 配置开关
    async ConfigSwitch(e) {
        const platform = this.getPlatformFromMessage(e.msg);
        const regRet = createSwitchRegExp(platform).exec(e.msg);
        if (regRet) {
            const key = regRet[1];
            const isOn = regRet[2] === '开启';
            Config.modify(platform, PlatformTypeConfig[platform].types[key], isOn);
            await this.index_Settings(e);
            return true;
        }
        return false;
    }
    // 修改数值配置
    async ConfigNumber(e) {
        const platform = this.getPlatformFromMessage(e.msg);
        const regRet = createNumberRegExp(platform).exec(e.msg);
        if (regRet) {
            const configType = PlatformTypeConfig[platform].numberConfig[regRet[1]];
            const number = this.checkNumberValue(Number(regRet[2]), configType.limit);
            Config.modify(platform, configType.key, number);
            await this.index_Settings(e);
            return true;
        }
        return true;
    }
    // 处理自定义内容
    async ConfigCustom(e) {
        const platform = this.getPlatformFromMessage(e.msg);
        const regRet = createCustomRegExp(platform).exec(e.msg);
        if (regRet) {
            const key = regRet[1]; // 提取设置的关键字
            const customValue = regRet[2].trim(); // 提取后方的内容
            // 检查 customConfig 是否存在
            const customConfig = PlatformTypeConfig[platform]?.customConfig;
            if (!customConfig || !customConfig[key]) {
                logger.warn(`无效的设置项：${key}`);
                return false;
            }
            const configKey = customConfig[key].key; // 提取实际的 key
            Config.modify(platform, configKey, customValue);
            await this.index_Settings(e);
            return true;
        }
        return false;
    }
    // 渲染设置图片
    async index_Settings(e) {
        const _cfg = Config.All();
        const statusData = getStatus(_cfg); // 获取状态对象
        const img = await Render('admin/index', { data: statusData });
        await e.reply(img);
        return true;
    }
    // 根据消息判断平台
    getPlatformFromMessage(msg) {
        if (msg.includes('抖音'))
            return 'douyin';
        if (msg.includes('B站'))
            return 'bilibili';
        if (msg.includes('上传'))
            return 'upload';
        if (msg.includes('快手'))
            return 'kuaishou';
        return 'app';
    }
    // 检查数值范围
    checkNumberValue(value, limit) {
        const [min, max] = limit.split('-').map(Number);
        return Math.min(Math.max(value, min), max);
    }
}
// 文件删除工具
async function removeAllFiles(dir) {
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await fs.promises.stat(filePath);
        if (stats.isDirectory()) {
            await removeAllFiles(filePath);
            await fs.promises.rmdir(filePath);
        }
        else {
            await fs.promises.unlink(filePath);
        }
    }
}
// 获取状态渲染
function getStatus(data) {
    const result = {};
    const processValue = (value) => {
        if (typeof value === 'boolean') {
            return `<div class="cfg-status ${value ? '' : 'status-off'}">${value ? '已开启' : '已关闭'}</div>`;
        }
        else if (typeof value === 'number') {
            return `<div class="cfg-status ${value === null ? 'status-off' : ''}">${value ?? '未配置'}</div>`;
        }
        else if (typeof value === 'string') {
            return `<div class="cfg-status">${value.length > 12 ? `${value.slice(0, 12)}...` : value}</div>`;
        }
        else if (Array.isArray(value)) {
            return value.length === 0
                ? `<div class="cfg-status status-off">未配置</div>`
                : `<div class="cfg-status">已配置 ${value.length} 项</div>`;
        }
        else if (value === null) {
            return `<div class="cfg-status status-off">未配置</div>`;
        }
        return `<div class="cfg-status status-off">未知类型</div>`;
    };
    const processObject = (obj) => {
        const res = {};
        for (const key in obj) {
            const value = obj[key];
            if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
                // 如果是子对象，递归处理
                res[key] = processObject(value);
            }
            else {
                // 处理基础类型
                res[key] = processValue(value);
            }
        }
        return res;
    };
    for (const key in data) {
        result[key] = processObject(data[key]);
    }
    return result;
}
const PlatformTypeConfig = {
    upload: {
        name: '上传',
        types: {
            上传拦截: 'usefilelimit',
            上传base64: 'sendbase64',
            上传压缩: 'compress',
            上传群文件: 'usegroupfile'
        },
        numberConfig: {
            上传拦截阈值: { key: 'filelimit', limit: '0-1000000' },
            上传压缩触发值: { key: 'compresstrigger', limit: '0-1000000' },
            上传压缩后的值: { key: 'compressvalue', limit: '0-1000000' },
            上传群文件阈值: { key: 'groupfilevalue', limit: '0-1000000' }
        }
    },
    app: {
        name: 'APP',
        types: {
            缓存删除: 'rmmp4',
            视频解析: 'videotool',
            默认解析: 'defaulttool',
            转发: 'sendforwardmsg',
            上传限制: 'usefilelimit',
            API服务: 'APIServer',
            base64: 'sendbase64'
        },
        numberConfig: {
            渲染精度: { key: 'renderScale', limit: '50-200' },
            优先级: { key: 'priority', limit: '0-114514' },
            限制: { key: 'filelimit', limit: '5-114514' },
            主题: { key: 'Theme', limit: '0-2' }
        }
    },
    douyin: {
        name: '抖音',
        types: {
            抖音解析: 'switch',
            抖音评论: 'comment',
            抖音推送: 'push.switch',
            抖音推送日志: 'push.log',
            抖音解析提示: 'tip',
            抖音高清语音: 'sendHDrecord',
            抖音动态解析: 'push.parsedynamic'
        },
        numberConfig: {
            抖音评论数量: { key: 'numcomment', limit: '0-999999' }
        },
        customConfig: {
            抖音推送表达式: { key: 'push.cron', type: 'string' },
            抖音推送权限: { key: 'push.permission', type: 'string' }
        }
    },
    bilibili: {
        name: 'B站',
        types: {
            B站解析: 'switch',
            B站评论: 'comment',
            B站推送: 'push.switch',
            B站推送日志: 'push.log',
            B站解析提示: 'tip',
            B站动态解析: 'push.parsedynamic',
            B站内容优先: 'videopriority'
        },
        numberConfig: {
            B站评论数量: { key: 'numcomment', limit: '0-999999' }
        },
        customConfig: {
            B站推送表达式: { key: 'push.cron', type: 'string' },
            B站推送权限: { key: 'push.permission', type: 'string' }
        }
    },
    kuaishou: {
        name: '快手',
        types: {
            快手解析: 'switch',
            快手解析提示: 'tip'
        },
        numberConfig: {
            快手评论数量: { key: 'numcomment', limit: '0-30' }
        }
    }
};
// 创建正则表达式的函数
const createSwitchRegExp = (platform) => new RegExp(`^#kkk设置(${Object.keys(PlatformTypeConfig[platform].types).join('|')})(开启|关闭)$`);
const createNumberRegExp = (platform) => new RegExp(`^#kkk设置(${Object.keys(PlatformTypeConfig[platform].numberConfig).join('|')})(\\d+)$`);
const createCustomRegExp = (platform) => new RegExp(`^#kkk设置(${Object.keys(PlatformTypeConfig[platform].customConfig ?? {}).join('|')})(.+)$`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwcy9hZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFFeEIsT0FBTyxLQUFLLEVBQUUsRUFBZ0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUNoRSxPQUFPLElBQUksTUFBTSxNQUFNLENBQUE7QUFFdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBRXZELE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxLQUFLLElBQUksRUFBRTtJQUM3RixJQUFJLENBQUM7UUFDSCxNQUFNLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM1RixNQUFNLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN0QixPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMsRUFBRSxF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R0FBRyxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtnQkFDaEYsRUFBRSxHQUFHLEVBQUUsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFO2dCQUNoRixFQUFFLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7Z0JBQ2hGLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtnQkFDbEYsRUFBRSxHQUFHLEVBQUUsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFO2dCQUNsRixFQUFFLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7Z0JBQ2xGLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtnQkFDaEYsRUFBRSxHQUFHLEVBQUUsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFO2dCQUNoRixFQUFFLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7Z0JBQ2hGLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtnQkFDbEYsRUFBRSxHQUFHLEVBQUUs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