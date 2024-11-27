import axios, { AxiosError } from 'axios';
import { logger } from 'node-karin';
import fs from 'node:fs';
import { pipeline } from 'stream/promises';
export class Networks {
    url;
    method;
    headers;
    type;
    body;
    axiosInstance;
    isGetResult;
    timeout;
    timer;
    data;
    filepath;
    maxRetries;
    constructor(data) {
        this.headers = data.headers || {};
        this.url = data.url || '';
        this.type = data.type || 'json';
        this.method = data.method || 'GET';
        this.body = data.body || null;
        this.data = {};
        this.timeout = data.timeout || 5000;
        this.isGetResult = false;
        this.timer = undefined;
        this.filepath = data.filepath || '';
        this.maxRetries = 0;
        // 创建axios实例
        this.axiosInstance = axios.create({
            timeout: this.timeout,
            headers: this.headers,
            maxRedirects: 5,
            validateStatus: (status) => {
                return (status >= 200 && status < 300) || status === 406 || (status >= 500);
            }
        });
    }
    get config() {
        let config = {
            url: this.url,
            method: this.method,
            headers: this.headers,
            responseType: this.type
        };
        if (this.method === 'POST' && this.body) {
            config.data = this.body;
        }
        return config;
    }
    /**
     * 异步下载流方法
     *
     * @param progressCallback 下载进度回调函数，接收已下载字节数和总字节数作为参数
     * @param retryCount 重试次数，默认为0
     * @returns 返回一个Promise，解析为包含文件路径和总字节数的对象
     *
     * 此函数通过axios库发送HTTP请求，下载指定URL的资源，并将下载的资源流保存到本地文件系统中
     * 它还提供了一个回调函数来报告下载进度，并在下载失败时根据配置自动重试
     */
    async downloadStream(progressCallback, retryCount = 0) {
        // 创建一个中止控制器，用于在请求超时时中止请求
        const controller = new AbortController();
        // 设置一个定时器，如果请求超过预定时间，则中止请求
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        try {
            // 使用axios库发送HTTP请求，获取资源流
            const response = await axios({
                ...this.config,
                url: this.url,
                responseType: 'stream',
                signal: controller.signal
            });
            // 清除中止请求的定时器
            clearTimeout(timeoutId);
            // 检查HTTP响应状态码，如果状态码不在200到299之间，则抛出错误
            if (!(response.status >= 200 && response.status < 300)) {
                throw new Error(`无法获取 ${this.url}。状态: ${response.status} ${response.statusText}`);
            }
            // 解析响应头中的content-length，以获取资源的总字节大小
            const totalBytes = parseInt(response.headers['content-length'] ?? '0', 10);
            // 如果无法解析content-length，则抛出错误
            if (isNaN(totalBytes)) {
                throw new Error('无效的 content-length 头');
            }
            // 初始化已下载字节数和上次打印的进度百分比
            let downloadedBytes = 0;
            let lastPrintedPercentage = -1;
            // 创建一个文件写入流，用于将下载的资源保存到本地文件系统
            const writer = fs.createWriteStream(this.filepath);
            // 定义一个函数来打印下载进度
            const printProgress = () => {
                const progressPercentage = Math.floor((downloadedBytes / totalBytes) * 100);
                if (progressPercentage !== lastPrintedPercentage) {
                    progressCallback(downloadedBytes, totalBytes);
                    lastPrintedPercentage = progressPercentage;
                }
            };
            // 根据资源大小决定进度更新的间隔时间
            const interval = totalBytes < 10 * 1024 * 1024 ? 1000 : 500;
            // 设置一个定时器，定期调用printProgress函数来更新下载进度
            const intervalId = setInterval(printProgress, interval);
            // 定义一个函数来处理下载的数据块
            const onData = (chunk) => {
                downloadedBytes += chunk.length;
            };
            // 在下载的数据流上绑定'data'事件监听器，处理下载的数据块
            response.data.on('data', onData);
            // 使用pipeline函数将下载的数据流管道到文件写入流
            await pipeline(response.data, writer);
            clearInterval(intervalId);
            response.data.off('data', onData);
            // 确保所有写入操作已完成
            writer.end();
            // 返回包含文件路径和总字节数的对象
            return { filepath: this.filepath, totalBytes };
        }
        catch (error) {
            clearTimeout(timeoutId);
            // 处理请求或下载过程中的错误
            if (error instanceof AxiosError) {
                console.error(`请求在 ${this.timeout / 1000} 秒后超时`);
            }
            else {
                console.error('下载失败:', error);
            }
            // 如果重试次数小于最大重试次数，则等待一段时间后重试下载
            if (retryCount < this.maxRetries) {
                const delay = Math.min(Math.pow(2, retryCount) * 1000, 1000);
                console.warn(`正在重试下载... (${retryCount + 1}/${this.maxRetries})，将在 ${delay / 1000} 秒后重试`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.downloadStream(progressCallback, retryCount + 1);
            }
            else {
                // 如果超过最大重试次数，则抛出错误
                throw new Error(`在 ${this.maxRetries} 次尝试后下载失败: ${error}`);
            }
        }
    }
    async getfetch() {
        try {
            const result = await this.returnResult();
            if (result.status === 504) {
                return result;
            }
            this.isGetResult = true;
            return result;
        }
        catch (error) {
            logger.info(error);
            return false;
        }
    }
    async returnResult() {
        let response = {};
        try {
            response = await this.axiosInstance(this.config);
        }
        catch (error) {
            logger.error(error);
        }
        return response;
    }
    /** 最终地址（跟随重定向） */
    async getLongLink() {
        try {
            const response = await this.axiosInstance({
                method: 'GET',
                url: this.url
            });
            return response.request.res.responseUrl; // axios中获取最终的请求URL
        }
        catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.stack);
            }
            return '';
        }
    }
    /** 获取首个302链接 */
    async getLocation() {
        try {
            const response = await this.axiosInstance({
                method: 'GET',
                url: this.url,
                maxRedirects: 0, // 禁止跟随重定向
                validateStatus: (status) => status >= 300 && status < 400 // 仅处理3xx响应
            });
            return response.headers['location'];
        }
        catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.stack);
            }
        }
    }
    /** 获取数据并处理数据的格式化，默认json */
    async getData() {
        try {
            const result = await this.returnResult();
            if (result.status === 504) {
                return result;
            }
            if (result.status === 429) {
                logger.error('HTTP 响应状态码: 429');
                throw new Error('ratelimit triggered, 触发 https://www.douyin.com/ 的速率限制！！！');
            }
            this.isGetResult = true;
            return result.data;
        }
        catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.stack || error.message);
            }
            return false;
        }
    }
    /**
     * 获取响应头信息（仅首个字节）
     * 适用于获取视频流的完整大小
     * @returns
     */
    async getHeaders() {
        try {
            const response = await this.axiosInstance({
                ...this.config,
                method: 'GET',
                headers: {
                    ...this.config.headers,
                    Range: 'bytes=0-0'
                }
            });
            return response.headers;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }
    /**
     * 获取响应头信息（完整）
     * @returns
     */
    async getHeadersFull() {
        try {
            const response = await this.axiosInstance({
                ...this.config,
                method: 'GET'
            });
            return response.headers;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmV0d29ya3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlL3V0aWxzL05ldHdvcmtzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFrRSxNQUFNLE9BQU8sQ0FBQTtBQUV6RyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBQ25DLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUN4QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFNMUMsTUFBTSxPQUFPLFFBQVE7SUFDWCxHQUFHLENBQVE7SUFDWCxNQUFNLENBQVE7SUFDZCxPQUFPLENBQWU7SUFDdEIsSUFBSSxDQUFjO0lBQ2xCLElBQUksQ0FBTTtJQUNWLGFBQWEsQ0FBZTtJQUM1QixXQUFXLENBQVM7SUFDcEIsT0FBTyxDQUFRO0lBQ2YsS0FBSyxDQUE0QjtJQUNqQyxJQUFJLENBQUk7SUFDUixRQUFRLENBQVE7SUFDaEIsVUFBVSxDQUFRO0lBRTFCLFlBQWEsSUFBd0I7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUE7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQTtRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFBO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQTtRQUNuQyxJQUFJLENB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