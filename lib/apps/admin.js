import fs from "node:fs";
import karin, { segment, common, handler, logger } from "node-karin";
import require$$1 from "path";
import "sequelize";
import { g as getBilibiliData, f as browserExports, C as Common, a as Config } from "../chunk/index-D1uAih11.js";
import { Version } from "../Version.js";
import "node-karin/axios";
import "stream/promises";
import "node:path";
import "../chunk/push-B46k-BZT.js";
import "../chunk/index-BDlGFCbK.js";
import { execSync, spawn } from "node:child_process";
import { chromium } from "playwright";
const bilibiliLogin = async (e) => {
  const qrcodeurl = await getBilibiliData("申请二维码");
  const qrimg = await browserExports.toDataURL(qrcodeurl.data.url);
  const base64Data = qrimg ? qrimg.replace(/^data:image\/\w+;base64,/, "") : "";
  const buffer = Buffer.from(base64Data, "base64");
  fs.writeFileSync(`${Common.tempDri.default}BilibiliLoginQrcode.png`, buffer);
  const qrcode_key = qrcodeurl.data.qrcode_key;
  const msg_id = [];
  const message1 = await e.reply("免责声明:\n您将通过扫码完成获取哔哩哔哩网页端的用户登录凭证（ck），该ck将用于请求哔哩哔哩WEB API接口。\n本BOT不会上传任何有关你的信息到第三方，所配置的 ck 只会用于请求官方 API 接口。\n我方仅提供视频解析及相关哔哩哔哩内容服务,若您的账号封禁、被盗等处罚与我方无关。\n害怕风险请勿扫码 ~");
  const message2 = await e.reply([segment.image(qrimg.split(";")[1].replace("base64,", "base64://")), segment.text("请在120秒内通过哔哩哔哩APP扫码进行登录")], { reply: true });
  msg_id.push(message1.messageId, message2.messageId);
  let executed86090 = false;
  let completedCase0 = false;
  for (let i = 0; i < 33; i++) {
    const qrcodestatusdata = await getBilibiliData("二维码状态", { qrcode_key });
    switch (qrcodestatusdata.data.data.code) {
      case 0: {
        Config.Modify("cookies", "bilibili", Common.formatCookies(qrcodestatusdata.headers["set-cookie"]));
        await e.reply("登录成功！用户登录凭证已保存至cookies.yaml", { reply: true });
        await Promise.all(msg_id.map(async (id) => {
          await e.bot.recallMsg(e.contact, id);
        }));
        completedCase0 = true;
        break;
      }
      case 86038: {
        i === 17 && await e.reply("二维码已失效", { reply: true });
        await Promise.all(msg_id.map(async (id) => {
          await e.bot.recallMsg(e.contact, id);
        }));
        break;
      }
      case 86090: {
        if (!executed86090) {
          const message3 = await e.reply("二维码已扫码，未确认", { reply: true });
          msg_id.push(message3.messageId);
          await e.bot.recallMsg(e.contact, message2.messageId);
          executed86090 = true;
          const index = msg_id.indexOf(message2.messageId);
          if (index > -1) {
            msg_id.splice(index, 1);
          }
        } else {
          executed86090 = true;
        }
        break;
      }
    }
    if (completedCase0) break;
    await common.sleep(5e3);
  }
};
const startXvfb = async () => {
  if (process.platform !== "linux") return;
  const DISPLAY_NUMBER = ":150";
  const LOCK_FILE = "/tmp/.X150-lock";
  try {
    execSync(`xdpyinfo -display ${DISPLAY_NUMBER}`, { stdio: "ignore" });
    logger.debug(`检测到 DISPLAY ${DISPLAY_NUMBER} 已经在运行，无需启动新的 Xvfb。`);
    return;
  } catch (err) {
    logger.debug(logger.red(`未检测到 DISPLAY ${DISPLAY_NUMBER}，尝试启动 Xvfb...`));
  }
  if (fs.existsSync(LOCK_FILE)) {
    logger.debug(logger.red(`检测到锁文件 ${LOCK_FILE}，可能存在冲突。尝试清理...`));
    try {
      fs.unlinkSync(LOCK_FILE);
      logger.debug(`成功清理锁文件 ${LOCK_FILE}`);
    } catch (err) {
      logger.debug(logger.red(`无法清理锁文件 ${LOCK_FILE}，请检查权限或手动处理。`));
      throw err;
    }
  }
  const xvfb = spawn("Xvfb", [DISPLAY_NUMBER, "-ac", "-screen", "0", "1280x1024x24"], {
    stdio: "inherit"
  });
  xvfb.unref();
  process.env.DISPLAY = DISPLAY_NUMBER;
  let retries = 5;
  while (retries > 0) {
    try {
      execSync(`xdpyinfo -display ${DISPLAY_NUMBER}`, { stdio: "ignore" });
      logger.debug(`Xvfb (${DISPLAY_NUMBER}) 启动成功`);
      return;
    } catch (err) {
      logger.debug(logger.yellow(`Xvfb (${DISPLAY_NUMBER}) 启动失败，正在重试...`));
      retries -= 1;
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
      } else {
        logger.debug(logger.red("Xvfb 启动失败，重试多次后仍未成功"));
        throw err;
      }
    }
  }
};
const douyinLogin = async (e) => {
  const hal = await handler.call("kkk.douyinLogin", { e });
  if (hal) return true;
  const msg_id = [];
  const message1 = await e.reply("免责声明:\n您将通过扫码完成获取抖音网页端的用户登录凭证（ck），该ck将用于请求抖音WEB API接口。\n本BOT不会上传任何有关你的信息到第三方，所配置的 ck 只会用于请求官方 API 接口。\n我方仅提供视频解析及相关抖音内容服务,若您的账号封禁、被盗等处罚与我方无关。\n害怕风险请勿扫码 ~");
  try {
    startXvfb();
    const browser = await chromium.launch({
      headless: false,
      args: [
        "--disable-blink-features=AutomationControlled",
        // 禁用自动化控制
        "--window-position=-10000,-10000",
        // 将窗口移到屏幕外
        "--start-minimized",
        // 启动时最小化
        "--mute-audio",
        // 静音
        "--no-sandbox"
        // 使用无沙箱模式，适合无桌面环境
      ]
    });
    const page = await browser.newPage();
    await page.goto("https://www.douyin.com", { timeout: 12e4 });
    const timeout = new Promise((resolve) => setTimeout(async () => {
      await browser.close();
    }, 12e4));
    const qrCodePromise = (async () => {
      try {
        const qrCodeBase64 = await waitQrcode(page);
        const base64Data = qrCodeBase64 ? qrCodeBase64.replace(/^data:image\/\w+;base64,/, "") : "";
        const buffer = Buffer.from(base64Data, "base64");
        fs.writeFileSync(`${Common.tempDri.default}DouyinLoginQrcode.png`, buffer);
        const message2 = await e.reply([segment.image("base64://" + base64Data), segment.text("请在120秒内通过抖音APP扫码进行登录")], { reply: true });
        msg_id.push(message2.messageId, message1.messageId);
        page.on("response", async (response) => {
          try {
            logger.debug(`接收到响应：${response.url()}`);
            if (response.status() === 302 && response.url().includes("/passport/sso/login/callback")) {
              const localCookies = await page.context().cookies();
              const cookieString = localCookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
              Config.Modify("cookies", "douyin", cookieString);
              await e.reply("登录成功！用户登录凭证已保存至cookies.yaml", { reply: true });
              await browser.close();
              await Promise.all(msg_id.map(async (id) => {
                await e.bot.recallMsg(e.contact, id);
              }));
            } else if (response.headers()["content-type"] && response.headers()["content-type"].includes("application/json") && response.url().includes("https://sso.douyin.com")) {
              const responseBody = await response.body();
              const jsonResponse = JSON.parse(responseBody.toString());
              logger.debug(`SSO 回调 Code：${jsonResponse.error_code}`, `响应内容：${jsonResponse.description}`);
              if (jsonResponse.error_code === 2046) {
                logger.debug("需要短信验证码");
                await page.getByText("接收短信验证").click();
                const elements = page.locator(":has-text('为保护账号安全，请输入当前手机号')");
                const texts = await elements.allInnerTexts();
                await page.getByText("获取验证码").click();
                const message3 = await e.reply(segment.text(texts.pop()));
                msg_id.push(message3.messageId);
                const ctx = await karin.ctx(e, { reply: true });
                await page.getByPlaceholder("请输入验证码").click();
                await page.getByPlaceholder("请输入验证码").fill(ctx.msg);
                await page.getByText("验证", { exact: true }).click();
              }
            }
          } catch (error) {
            await browser.close();
            await Promise.all(msg_id.map(async (id) => {
              await e.bot.recallMsg(e.contact, id);
            }));
          }
        });
      } catch (error) {
        await browser.close();
        await Promise.all(msg_id.map(async (id) => {
          await e.bot.recallMsg(e.contact, id);
        }));
        await e.reply("登录超时！二维码已失效！", { reply: true });
        logger.error(error);
      }
    })();
    await Promise.race([qrCodePromise, timeout]);
  } catch (error) {
    logger.error(error);
    if (error.message.includes("npx playwright install")) {
      const msg = await e.reply("首次使用，正在初始化 playwright 环境，请稍等片刻...");
      execSync("npx playwright install chromium", { cwd: Version.pluginPath, stdio: "inherit" });
      await e.reply(`playwright 初始化成功，请再次发送「${e.msg}」`);
      await e.bot.recallMsg(e.contact, msg.messageId);
      return true;
    } else {
      await e.reply("chromiun 环境初始化失败，请查看控制台错误日志", { reply: true });
    }
  }
  return true;
};
const waitQrcode = async (page) => {
  const qrCodeSelector = ".web-login-scan-code__content__qrcode-wrapper img";
  const loginButton = page.getByRole("button", { name: "登录" });
  const qrCodeImage = await page.waitForSelector(qrCodeSelector, { state: "attached", timeout: 3e4 });
  if (qrCodeImage) {
    const qrCodeBase64 = await qrCodeImage.getAttribute("src");
    return qrCodeBase64;
  } else {
    await loginButton.click();
    await page.waitForSelector(qrCodeSelector, { timeout: 2e4 });
    const qrCodeImage2 = await page.waitForSelector(qrCodeSelector, { timeout: 2e4 });
    const qrCodeBase64 = await qrCodeImage2.getAttribute("src");
    return qrCodeBase64;
  }
};
const task = Config.app.rmmp4 && karin.task("[kkk-视频缓存自动删除]", "0 0 4 * * *", async () => {
  try {
    await removeAllFiles(Common.tempDri.video);
    logger.mark(Common.tempDri.video + "目录下所有文件已删除");
  } catch (err) {
    console.error("删除文件时出错:", err);
  }
});
const biLogin = karin.command(/^#?(kkk)?\s*B站\s*(扫码)?\s*登录$/i, async (e) => {
  await bilibiliLogin(e);
  return true;
}, { perm: Config.bilibili.loginPerm, name: "kkk-ck管理" });
const dylogin = karin.command(/^#?(kkk)?抖音(扫码)?登录$/, async (e) => {
  await douyinLogin(e);
  return true;
}, { perm: Config.douyin.loginPerm, name: "kkk-ck管理" });
const setdyck = karin.command(/^#?(kkk)?s*设置抖音ck$/i, async (e) => {
  const msg = await e.reply("请发在120秒内送抖音ck\n教程：https://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n");
  const context = await karin.ctx(e);
  Config.Modify("cookies", "douyin", context.msg);
  await e.bot.recallMsg(e.contact, msg.messageId);
  await e.reply("设置成功！", { at: true });
  return true;
}, { perm: "master", name: "kkk-ck管理", event: "message.friend" });
const setbilick = karin.command(/^#?(kkk)?s*设置s*(B站)ck$/i, async (e) => {
  const msg = await e.reply("请发在120秒内送B站ck\n教程：https://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n");
  const context = await karin.ctx(e);
  Config.Modify("cookies", "bilibili", context.msg);
  await e.bot.recallMsg(e.contact, msg.messageId);
  await e.reply("设置成功！", { at: true });
  return true;
}, { perm: "master", name: "kkk-ck管理", event: "message.friend" });
async function removeAllFiles(dir) {
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const filePath = require$$1.join(dir, file);
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      await removeAllFiles(filePath);
      await fs.promises.rmdir(filePath);
    } else {
      await fs.promises.unlink(filePath);
    }
  }
}
export {
  biLogin,
  dylogin,
  setbilick,
  setdyck,
  task
};
