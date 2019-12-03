import { MessageType } from './message-type';
export class MessageReceiveConfig {
    sourceType?: string;
    name?: string;
    description?: string;
    userId?: number;
    receiveEmail?: boolean;
    receiveSms?: boolean;
    items?: MessageReceiveConfig[];
}
