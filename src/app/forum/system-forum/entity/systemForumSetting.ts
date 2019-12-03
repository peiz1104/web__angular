import { Site } from 'app/system/entity/site';

export class SystemForumSetting {
    id?: number;
    isEnabled?: boolean;
    freeSpeech?: boolean;
    maxTopicOneDay?: number;
    postInterval?: number;
}
