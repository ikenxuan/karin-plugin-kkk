import { getBilibiliData, wbi_sign } from '@ikenxuan/amagi';
import { Config } from '../../module/utils/index.js';
/**
 * 计算请求参数
 * @param apiURL 请求地址
 * @returns
 */
export async function genParams(apiURL) {
    if (Config.cookies.bilibili === '' || Config.cookies.bilibili === null)
        return '&platform=html5';
    const loginInfo = await getBilibiliData('登录基本信息', Config.cookies.bilibili);
    const genSign = await wbi_sign(apiURL, Config.cookies.bilibili);
    const qn = [6, 16, 32, 64, 74, 80, 112, 116, 120, 125, 126, 127];
    let isvip;
    loginInfo.data.vipStatus === 1 ? (isvip = true) : (isvip = false);
    if (isvip) {
        return `&fnval=16&fourk=1&${genSign}`;
    }
    else
        return `&qn=${qn[3]}&fnval=16`;
}
export async function checkCk() {
    if (Config.cookies.bilibili === '' || Config.cookies.bilibili === null)
        return { Status: '!isLogin', isVIP: false };
    const loginInfo = await getBilibiliData('登录基本信息', Config.cookies.bilibili);
    let isVIP;
    loginInfo.data.vipStatus === 1 ? (isVIP = true) : (isVIP = false);
    if (isVIP) {
        return { Status: 'isLogin', isVIP };
    }
    else
        return { Status: 'isLogin', isVIP };
}
