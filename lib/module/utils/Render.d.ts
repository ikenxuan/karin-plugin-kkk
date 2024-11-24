import { ImageElement } from 'node-karin';
/**
 *
 * @param {string} path html模板路径
 * @param {*} params 模板参数
 * @returns
 */
export declare function Render(path: string, params?: any): Promise<ImageElement[]>;
