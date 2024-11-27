import { Config, Common } from '../../module/utils/index.js';
import { Networks, mergeFile } from '../../module/utils/index.js';
import karin, { segment, logger } from 'node-karin';
import fs from 'node:fs';
export class Base {
    e;
    headers;
    _path;
    constructor(e) {
        this.e = e;
        this.headers = {
            Accept: '*/*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
        };
        this._path = process.cwd()?.replace(/\\/g, '/');
    }
    /** 检查是或否设置抖音ck */
    get allow() {
        return Config.cookies.douyin !== '';
    }
    /** 获取适配器名称 */
    get botadapter() {
        return this.e.bot?.adapter?.name;
    }
    /**
     * 上传视频文件
     * @param file - 包含本地视频文件信息的对象。
     * @param video_url 视频直链，无则传空字符串
     * @param options 上传参数
     * @returns
     */
    async upload_file(file, video_url, options) {
        let sendStatus = true;
        let File, newFileSize = file.totalBytes;
        // 判断是否使用群文件上传
        if (options) {
            options.useGroupFile = Config.upload.usegroupfile && (file.totalBytes > Config.upload.groupfilevalue);
        }
        if (Config.upload.compress && (file.totalBytes > Config.upload.compresstrigger)) {
            const Duration = await mergeFile('获取指定视频文件时长', { path: file.filepath });
            logger.warn(logger.yellow(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`));
            const msg1 = await karin.sendMsg(String(this.e.self_id || options?.activeOption?.uin), karin.contactGroup(this.e.group_id || String(options?.activeOption?.group_id)), [
                segment.text(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`),
                options?.message_id ? segment.reply(options.message_id) : segment.text('')
            ]);
            // 计算目标视频平均码率
            const targetBitrate = Common.calculateBitrate(Config.upload.compresstrigger, Duration) * 0.75;
            // 执行压缩
            const startTime = Date.now();
            file.filepath = await mergeFile('压缩视频', { path: file.filepath, targetBitrate, resultPath: `${Common.tempDri.video}tmp_${Date.now()}.mp4` });
            const endTime = Date.now();
            // 再次检查大小
            newFileSize = await Common.getVideoFileSize(file.filepath);
            logger.debug(`原始视频大小为: ${file.totalBytes.toFixed(2)} MB, ${logger.green(`经 FFmpeg 压缩后最终视频大小为: ${newFileSize.toFixed(2)} MB，原视频文件已删除`)}`);
            await karin.sendMsg(String(this.e.self_id || options?.activeOption?.uin), karin.contactGroup(this.e.group_id || String(options?.activeOption?.group_id)), [
                segment.text(`压缩后最终视频大小为: ${newFileSize.toFixed(2)} MB，压缩耗时：${((endTime - startTime) / 1000).toFixed(2)} 秒`),
                segment.reply(msg1.message_id)
            ]);
        }
        // 是否先转换为base64
        if (Config.upload.sendbase64) {
            const videoBuffer = await fs.promises.readFile(file.filepath);
            File = `base64://${videoBuffer.toString('base64')}`;
        }
        else
            File = file.filepath;
        try {
            // 是主动消息
            if (options?.active) {
                if (options.useGroupFile) { // 是群文件
                    const bot = karin.getBot(String(options.activeOption?.uin));
                    const status = await bot.UploadGroupFile(String(options.activeOption?.group_id), File, file.originTitle ? file.originTitle : `tmp_${Date.now()}`);
                    status ? sendStatus = true : sendStatus = false;
                }
                else { // 不是群文件
                    const status = await karin.sendMsg(String(options?.activeOption?.uin), karin.contactGroup(String(options?.activeOption?.group_id)), [segment.video(File)]);
                    status.message_id ? sendStatus = true : sendStatus = false;
                }
            }
            else { // 不是主动消息
                if (options?.useGroupFile) { // 是群文件
                    const status = await this.e.bot.UploadGroupFile(this.e.group_id, File, file.originTitle ? file.originTitle : `tmp_${Date.now()}`);
                    status ? sendStatus = true : sendStatus = false;
                }
                else { // 不是群文件
                    const status = await this.e.reply(segment.video(File) || video_url);
                    status.message_id ? sendStatus = true : sendStatus = false;
                }
            }
            return sendStatus;
        }
        catch (error) {
            logger.error('视频文件上传错误,' + error);
            return false;
        }
        finally {
            await this.removeFile(file.filepath);
        }
    }
    /**
     * 下载视频并上传到群
     * @param video_url 视频链接
     * @param title 文件名，是一个对象，时间戳或自定义
     * @param opt 上传参数
     * @returns
     */
    async DownLoadVideo(downloadOpt, uploadOpt) {
        /** 获取文件大小 */
        const fileHeaders = await new Networks({ url: downloadOpt.video_url, headers: downloadOpt.headers || this.headers }).getHeaders();
        const fileSizeContent = fileHeaders['content-range']?.match(/\/(\d+)/) ? parseInt(fileHeaders['content-range']?.match(/\/(\d+)/)[1], 10) : 0;
        const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2);
        const fileSize = parseInt(parseFloat(fileSizeInMB).toFixed(2));
        if (Config.upload.usefilelimit && fileSize > Config.upload.filelimit) {
            await karin.sendMsg(String(this.e.self_id || uploadOpt?.activeOption?.uin), karin.contactGroup(this.e.group_id || String(uploadOpt?.activeOption?.group_id)), [segment.text(`视频：「${downloadOpt.title.originTitle ? downloadOpt.title.originTitle : 'Error: 文件名获取失败'}」大小 (${fileSizeInMB} MB) 超出最大限制（设定值：${Config.upload.filelimit} MB），已取消上传`)]);
            return false;
        }
        // 下载文件，视频URL，标题和自定义headers
        let res = await this.DownLoadFile(downloadOpt.video_url, {
            title: Config.app.rmmp4 ? downloadOpt.title.timestampTitle : downloadOpt.title.originTitle,
            headers: downloadOpt.headers || this.headers,
            filetype: '.mp4'
        });
        res = { ...res, ...downloadOpt.title };
        // 将下载的文件大小转换为MB并保留两位小数
        res.totalBytes = Number((res.totalBytes / (1024 * 1024)).toFixed(2));
        /** 上传视频 */
        return await this.upload_file(res, downloadOpt.video_url, uploadOpt);
    }
    /**
     * 异步下载文件的函数。
     * @param video_url 下载地址。
     * @param title 文件名。
     * @param headers 请求头，可选参数，默认为空对象。
     * @param filetype 下载文件的类型，默认为'.mp4'。
     * @returns 返回一个包含文件路径和总字节数的对象。
     */
    async DownLoadFile(video_url, opt) {
        // 使用networks类进行文件下载，并通过回调函数实时更新下载进度
        const { filepath, totalBytes } = await new Networks({
            url: video_url, // 视频地址
            headers: opt.headers || this.headers, // 请求头
            filepath: Common.tempDri.video + `${opt.title}${opt.filetype || '.mp4'}`, // 文件保存路径
            timeout: 30000, // 设置30秒超时
            maxRetries: 3 // 最多重试3次
        }).downloadStream((downloadedBytes, totalBytes) => {
            // 定义进度条长度及生成进度条字符串的函数
            const barLength = 45;
            function generateProgressBar(progressPercentage) {
                // 根据进度计算填充的'#'字符数量，并生成进度条样式
                const filledLength = Math.floor((progressPercentage / 100) * barLength);
                let progress = '';
                progress += '#'.repeat(filledLength);
                progress += '-'.repeat(Math.max(0, barLength - filledLength - 1));
                const formattedProgress = progressPercentage.toFixed(2) + '%';
                console.log(`正在下载 ${opt.title}${opt.filetype || '.mp4'} [${progress}] ${formattedProgress}\r`);
            }
            // 计算并打印当前下载进度
            const progressPercentage = (downloadedBytes / totalBytes) * 100;
            generateProgressBar(progressPercentage);
        });
        return { filepath, totalBytes };
    }
    /** 删文件 */
    async removeFile(path, force = false) {
        return Common.removeFile(path, force);
    }
    /** 过万整除 */
    count(count) {
        if (count > 10000) {
            return (count / 10000).toFixed(1) + '万';
        }
        else {
            return count?.toString() || '无法获取';
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGUvdXRpbHMvQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDcEQsT0FBTyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUE4QixNQUFNLFlBQVksQ0FBQTtBQUMvRSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUE7QUErRHhCLE1BQU0sT0FBTyxJQUFJO0lBQ2YsQ0FBQyxDQUFjO0lBQ2YsT0FBTyxDQUFLO0lBQ1osS0FBSyxDQUFRO0lBQ2IsWUFBYSxDQUFlO1FBQzFCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLE1BQU0sRUFBRSxLQUFLO1lBQ2IsaUJBQWlCLEVBQUUsaURBQWlEO1lBQ3BFLFlBQVksRUFDVixpSEFBaUg7U0FDcEgsQ0FBQTtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUVELGtCQUFrQjtJQUNsQixJQUFJLEtBQUs7UUFDUCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsY0FBYztJQUNkLElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQTtJQUNsQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBRSxJQUFjLEVBQUUsU0FBaUIsRUFBRSxPQUEyQjtRQUMvRSxJQUFJLFVBQVUs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