import { Base } from '../../module/index.js';
import { KarinMessage } from 'node-karin';
import { KuaishouDataTypes, ExtendedKuaishouOptionsType } from '../../types/index.js';
export declare class Kuaishou extends Base {
    e: KarinMessage;
    type: KuaishouDataTypes[keyof KuaishouDataTypes];
    is_mp4: any;
    constructor(e: KarinMessage, iddata: ExtendedKuaishouOptionsType);
    RESOURCES(data: any): Promise<boolean>;
}
