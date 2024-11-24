import { KarinMessage } from 'node-karin';
declare function UploadRecord(e: KarinMessage, record_url: string, seconds?: number, transcoding?: boolean, brief?: string): Promise<any>;
export { UploadRecord };
