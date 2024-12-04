import fs from 'node:fs';
import amagi from '@ikenxuan/amagi';
import { common, segment } from 'node-karin';
import QRCode from 'qrcode';
import { Common, Config, Version } from '../../module/utils/index.js';
const cl = new amagi({ bilibili: Config.cookies.bilibili });
export const bilibiliLogin = async (e) => {
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
                for (const id of msg_id) {
                    await e.bot.RecallMessage(e.contact, id);
                }
                completedCase0 = true;
                break;
            }
            case 86038: {
                i === 17 && await e.reply('二维码已失效', { reply: true });
                for (const id of msg_id) {
                    await e.bot.RecallMessage(e.contact, id);
                }
                break;
            }
            case 86090: {
                if (!executed86090) {
                    const message3 = await e.reply('二维码已扫码，未确认', { reply: true });
                    msg_id.push(message3.message_id);
                    await e.bot.RecallMessage(e.contact, message2.message_id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0vYmlsaWJpbGkvbG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRXhCLE9BQU8sS0FBSyxNQUFNLGlCQUFpQixDQUFBO0FBQ25DLE9BQU8sRUFBRSxNQUFNLEVBQWdCLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUMxRCxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUE7QUFFM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFFeEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzNELE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQUUsQ0FBZSxFQUFFLEVBQUU7SUFDckQsWUFBWTtJQUNaLE1BQU0sU0FBUyxHQUFHLE1BQU0sRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuRCxNQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN4RCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUM3RSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNoRCxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsU0FBUyxPQUFPLENBQUMsVUFBVSwwQkFBMEIsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNuRyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUM1QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDakIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLGlJQUFpSSxDQUFDLENBQUE7SUFDakssTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQy9KLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDckQsY0FBYztJQUNkLDBCQUEwQjtJQUMxQixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUE7SUFDekIsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFBO0lBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFHLEVBQUUsQ0FBQztRQUM3QixNQUFNLGdCQUFnQixHQUFHLE1BQU0sRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQzFFLFFBQVEsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1Asd0RBQXdEO2dCQUN4RCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNsRywwRUFBMEU7Z0JBQzFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2dCQUM3RCxPQUFPO2dCQUNQLEtBQUssTUFBTSxFQUFFLElBQUksTUFBTSxFQUFFLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQTtnQkFDMUMsQ0FBQztnQkFDRCxjQUFjLEdBQUcsSUFBSSxDQUFBO2dCQUNyQixNQUFLO1lBQ1AsQ0FBQztZQUNELEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFDcEQsS0FBSyxNQUFNLEVBQUUsSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDeEIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFBO2dCQUMxQyxDQUFDO2dCQUNELE1BQUs7WUFDUCxDQUFDO1lBQ0QsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLElBQUksQ0FBRSxhQUFhLEVBQUUsQ0FBQztvQkFDcEIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO29CQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtvQkFDaEMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtvQkFDekQsYUFBYSxHQUFHLElBQUksQ0FBQTtvQkFDcEIscUNBQXFDO29CQUNyQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtvQkFDakQsSUFBSSxLQUFLLEdBQUcsQ0FBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQ3pCLENBQUM7Z0JBQ0gsQ0FBQztxQkFBTSxDQUFDO29CQUNOLGFBQWEsR0FBRyxJQUFJLENBQUE7Z0JBQ3RCLENBQUM7Z0JBQ0QsTUFBSztZQUNQLENBQUM7WUFDRDtnQkFDRSxNQUFLO1FBQ1QsQ0FBQztRQUNELElBQUksY0FBYztZQUFFLE1BQUs7UUFDekIsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7QUFDSCxDQUFDLENBQUEifQ==