import { DouyinDataTypes } from '../../types/index.js';
export declare function fetchDouyinData<T extends keyof DouyinDataTypes>(type: T, opt?: any): Promise<any>;
