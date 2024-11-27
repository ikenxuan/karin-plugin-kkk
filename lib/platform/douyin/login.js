import karin, { logger, handler, segment } from 'node-karin';
import { chromium } from 'playwright';
import { Version, Config } from '../../module/index.js';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
export const douyinLogin = async (e) => {
    const hal = await handler.call('kkk.douyinLogin', { e });
    if (hal)
        return true;
    const msg_id = [];
    const message1 = await e.reply('免责声明:\n您将通过扫码完成获取抖音网页端的用户登录凭证（ck），该ck将用于请求抖音WEB API接口。\n本Bot不会保存您的登录状态。\n我方仅提供视频解析及相关抖音内容服务,若您的账号封禁、被盗等处罚与我方无关。\n害怕风险请勿扫码 ~');
    try {
        const browser = await chromium.launch({
            headless: false,
            args: [
                '--disable-blink-features=AutomationControlled', // 禁用自动化控制
                '--window-position=-10000,-10000', // 将窗口移到屏幕外
                '--start-minimized', // 启动时最小化
                '--mute-audio' // 静音
            ]
        });
        const page = await browser.newPage();
        await page.goto('https://www.douyin.com');
        // 等待二维码容器出现
        await page.waitForSelector('.web-login-scan-code__content__qrcode-wrapper', { timeout: 10000 });
        // 等待 img 元素加载并变得可见
        const qrcodeImage = await page.waitForSelector('.web-login-scan-code__content__qrcode-wrapper img', { timeout: 10000 });
        // 获取 img 的 src 属性内容
        const qrCodeBase64 = await qrcodeImage.getAttribute('src');
        // 移除 base64 前缀，提取实际数据
        const base64Data = qrCodeBase64 ? qrCodeBase64.replace(/^data:image\/\w+;base64,/, '') : '';
        // 将 base64 转换为 Buffer 并保存为文件
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(`${Version.karinPath}/temp/${Version.pluginName}/DouyinLoginQrcode.png`, buffer);
        const message2 = await e.reply([segment.image('base64://' + base64Data), segment.text('请在120秒内通过抖音APP扫码进行登录')], { reply: true });
        msg_id.push(message2.message_id, message1.message_id);
        try {
            // 监听页面的 response 事件，捕捉包含 Set-Cookie 的 302 重定向响应
            page.on('response', async (response) => {
                if (response.status() === 302 && response.url().includes('/passport/sso/login/callback')) {
                    // 获取本地的 cookie
                    const localCookies = await page.context().cookies();
                    const cookieString = localCookies.map(cookie => {
                        return `${cookie.name}=${cookie.value}`;
                    }).join('; ');
                    Config.modify('cookies', 'douyin', cookieString);
                    await e.reply('登录成功！用户登录凭证已保存至cookies.yaml', { reply: true });
                    // 关闭浏览器
                    await browser.close();
                    // 批量撤回
                    msg_id.forEach(async (id) => {
                        const bot = karin.getBot(e.self_id);
                        await bot.RecallMessage(e.contact, id);
                    });
                }
            });
        }
        catch (err) {
            await browser.close();
            // 批量撤回
            msg_id.forEach(async (id) => {
                const bot = karin.getBot(e.self_id);
                await bot.RecallMessage(e.contact, id);
            });
            await e.reply('登录超时！二维码已失效！', { reply: true });
            logger.error(err);
        }
    }
    catch (error) {
        logger.warn('首次使用，正在初始化 playwright 环境，请稍等片刻...');
        if (error.meeage.includes('npx playwright install')) {
            execSync('npx playwright install', { cwd: Version.pluginPath, stdio: 'inherit' });
            await e.reply(`playwright 初始化成功，请再次发送「${e.msg}」`);
            return true;
        }
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0vZG91eWluL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFnQixPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLFlBQVksQ0FBQTtBQUN4RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBQ3JDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzFDLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUN4QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFN0MsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFBRSxDQUFlLEVBQUUsRUFBRTtJQUNuRCxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3hELElBQUksR0FBRztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBQ3BCLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQTtJQUMzQixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsNkhBQTZILENBQUMsQ0FBQTtJQUM3SixJQUFJLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDcEMsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUU7Z0JBQ0osK0NBQStDLEVBQUUsVUFBVTtnQkFDM0QsaUNBQWlDLEVBQUUsV0FBVztnQkFDOUMsbUJBQW1CLEVBQUUsU0FBUztnQkFDOUIsY0FBYyxDQUFDLEtBQUs7YUFDckI7U0FDRixDQUFDLENBQUE7UUFDRixNQUFNLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUVwQyxNQUFN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