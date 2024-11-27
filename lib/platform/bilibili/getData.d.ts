import { BilibiliDataTypes } from '../../types/index.js';
export declare function fetchBilibiliData<T extends keyof BilibiliDataTypes>(type: T, opt?: any): Promise<any>;
