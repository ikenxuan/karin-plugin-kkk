import { KuaishouDataTypes } from '../../types/index.js';
export declare function fetchKuaishouData<T extends keyof KuaishouDataTypes>(type: T, opt?: any): Promise<any>;
