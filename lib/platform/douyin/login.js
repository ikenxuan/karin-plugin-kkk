import { execSync } from 'node:child_process';
import fs from 'node:fs';
import karin, { handler, logger, segment } from 'node-karin';
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
        if (error.includes('npx playwright install')) {
            execSync('npx playwright install', { cwd: Version.pluginPath, stdio: 'inherit' });
            await e.reply(`playwright 初始化成功，请再次发送「${e.msg}」`);
            return true;
        }
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0vZG91eWluL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUM3QyxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFFeEIsT0FBTyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQThCLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFDeEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUVyQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUUxQyxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLENBQWUsRUFBRSxFQUFFO0lBQ25ELE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDeEQsSUFBSSxHQUFHO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFDcEIsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFBO0lBQzNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyw2SEFBNkgsQ0FBQyxDQUFBO0lBQzdKLElBQUksQ0FBQztRQUNILE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNwQyxRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRTtnQkFDSiwrQ0FBK0MsRUFBRSxVQUFVO2dCQUMzRCxpQ0FBaUMsRUFBRSxXQUFXO2dCQUM5QyxtQkFBbUIsRUFBRSxTQUFTO2dCQUM5QixjQUFjLENBQUMsS0FBSzthQUNyQjtTQUNGLENBQUMsQ0FBQTtRQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBRXBDLE1BQU0s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