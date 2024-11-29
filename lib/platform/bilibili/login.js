import fs from 'node:fs';
import amagi from '@ikenxuan/amagi';
import karin, { common, segment } from 'node-karin';
import QRCode from 'qrcode';
import { Common, Config, Version } from '../../module/utils/index.js';
const cl = new amagi({ bilibili: Config.cookies.bilibili });
export const bilibiliLogin = async (e) => {
    const bot = karin.getBot(e.self_id);
    /** 申请二维码 */
    const qrcodeurl = await cl.getBilibiliData('申请二维码');
    const qrimg = await QRCode.toDataURL(qrcodeurl.data.url);
    const base64Data = qrimg ? qrimg.replace(/^data:image\/\w+;base64,/, '') : '';
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(`${Version.karinPath}/temp/${Version.pluginName}/BilibiliLoginQrcode.png`, buffer);
    const qrcode_key = qrcodeurl.data.qrcode_key;
    const msg_id = [];
    const message1 = await e.reply('免责声明:\n您将通过扫码完成获取哔哩哔哩网页端的用户登录凭证（ck），该ck将用于请求哔哩哔哩WEB API接口。\n本Bot不会保存您的登录状态。\n我方仅提供视频解析及相关抖音内容服务,若您的账号封禁、被盗等处罚与我方无关。\n害怕风险请勿扫码 ~');
    const message2 = await e.reply([segment.image(qrimg.split(';')[1].replace('base64,', 'base64://')), segment.text('请在120秒内通过哔哩哔哩APP扫码进行登录')], { reply: true });
    msg_id.push(message1.message_id, message2.message_id);
    /** 判断二维码状态 */
    // let Execution86038 = -1
    let executed86090 = false;
    let completedCase0 = false;
    for (let i = 0; i < 33; i++) {
        const qrcodestatusdata = await cl.getBilibiliData('二维码状态', { qrcode_key });
        switch (qrcodestatusdata.data.data.code) {
            case 0: {
                // console.log(qrcodestatusdata.data.data.refresh_token)
                Config.modify('cookies', 'bilibili', Common.formatCookies(qrcodestatusdata.headers['set-cookie']));
                // Config.bilibilirefresh_token = qrcodestatusdata.data.data.refresh_token
                await e.reply('登录成功！用户登录凭证已保存至cookies.yaml', { reply: true });
                // 批量撤回
                msg_id.forEach(async (id) => {
                    await bot.RecallMessage(e.contact, id);
                });
                completedCase0 = true;
                break;
            }
            case 86038: {
                i === 17 && await e.reply('二维码已失效', { reply: true });
                msg_id.forEach(async (id) => {
                    await bot.RecallMessage(e.contact, id);
                });
                break;
            }
            case 86090: {
                if (!executed86090) {
                    const message3 = await e.reply('二维码已扫码，未确认', { reply: true });
                    msg_id.push(message3.message_id);
                    await bot.RecallMessage(e.contact, message2.message_id);
                    executed86090 = true;
                    // 删除 msg_id 数组中的 message2.message_id
                    const index = msg_id.indexOf(message2.message_id);
                    if (index > -1) {
                        msg_id.splice(index, 1);
                    }
                }
                else {
                    executed86090 = true;
                }
                break;
            }
            default:
                break;
        }
        if (completedCase0)
            break;
        await common.sleep(5000);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0vYmlsaWJpbGkvbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRXhCLE9BQU8sS0FBSyxNQUFNLGlCQUFpQixDQUFBO0FBQ25DLE9BQU8sS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUE4QixPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFDL0UsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBRTNCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBRXhELE1BQU0sRUFBRSxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUMzRCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLENBQWUsRUFBRSxFQUFFO0lBQ3JELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBaUIsQ0FBQTtJQUNuRCxZQUFZO0lBQ1osTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ25ELE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3hELE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBQzdFLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2hELEVBQUUsQ0FBQyxh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