import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { handler, logger, segment } from 'node-karin';
import { chromium } from 'playwright';
import { Config, Version } from '../../module/index.js';
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
                        await e.bot.RecallMessage(e.contact, id);
                    });
                }
            });
        }
        catch (err) {
            await browser.close();
            // 批量撤回
            msg_id.forEach(async (id) => {
                await e.bot.RecallMessage(e.contact, id);
            });
            await e.reply('登录超时！二维码已失效！', { reply: true });
            logger.error(err);
        }
    }
    catch (error) {
        const msg = await e.reply('首次使用，正在初始化 playwright 环境，请稍等片刻...');
        logger.error(error);
        if (error.message.includes('npx playwright install')) {
            execSync('npx playwright install chromium', { cwd: Version.pluginPath, stdio: 'inherit' });
            await e.reply(`playwright 初始化成功，请再次发送「${e.msg}」`);
            await e.bot.RecallMessage(e.contact, msg.message_id);
            return true;
        }
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0vZG91eWluL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUM3QyxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFFeEIsT0FBUSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBRXJDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRTFDLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsQ0FBZSxFQUFFLEVBQUU7SUFDbkQsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN4RCxJQUFJLEdBQUc7UUFBRSxPQUFPLElBQUksQ0FBQTtJQUNwQixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUE7SUFDM0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLDZIQUE2SCxDQUFDLENBQUE7SUFDN0osSUFBSSxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3BDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsSUFBSSxFQUFFO2dCQUNKLCtDQUErQyxFQUFFLFVBQVU7Z0JBQzNELGlDQUFpQyxFQUFFLFdBQVc7Z0JBQzlDLG1CQUFtQixFQUFFLFNBQVM7Z0JBQzlCLGNBQWMsQ0FBQyxLQUFLO2FBQ3JCO1NBQ0YsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7UUFFcEMsTUFBTSxJQUFJLENBQUMs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