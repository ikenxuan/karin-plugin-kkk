import fs from 'node:fs';
import axios, { AxiosError } from 'axios';
import { logger } from 'node-karin';
import { pipeline } from 'stream/promises';
export class Networks {
    url;
    method;
    headers;
    type;
    body;
    axiosInstance;
    timeout;
    filepath;
    maxRetries;
    constructor(data) {
        this.headers = data.headers || {};
        this.url = data.url ?? '';
        this.type = data.type ?? 'json';
        this.method = data.method ?? 'GET';
        this.body = data.body ?? null;
        this.timeout = data.timeout ?? 5000;
        this.filepath = data.filepath ?? '';
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
        const config = {
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
            return response.headers.location;
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
            return result.data;
        }
        catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.stack ?? error.message);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmV0d29ya3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlL3V0aWxzL05ldHdvcmtzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUV4QixPQUFPLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBa0UsTUFBTSxPQUFPLENBQUE7QUFDekcsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUNuQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFNMUMsTUFBTSxPQUFPLFFBQVE7SUFDWCxHQUFHLENBQVE7SUFDWCxNQUFNLENBQVE7SUFDZCxPQUFPLENBQWU7SUFDdEIsSUFBSSxDQUFjO0lBQ2xCLElBQUksQ0FBTTtJQUNWLGFBQWEsQ0FBZTtJQUM1QixPQUFPLENBQVE7SUFDZixRQUFRLENBQVE7SUFDaEIsVUFBVSxDQUFRO0lBRTFCLFlBQWEsSUFBd0I7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUE7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQTtRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFBO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUE7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQTtRQUVu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