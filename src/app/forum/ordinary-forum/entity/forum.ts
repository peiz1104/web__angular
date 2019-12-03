import { Site } from 'app/system/entity/site';

export class Forum {
    id?: number;
    name?: string;
    description?: string;
    cover?: string;
    isEnabled?: boolean;
    freeSpeech?: boolean;
    maxTopicOneDay?: number;
    postInterval?: number;
    site?: Site;
}
