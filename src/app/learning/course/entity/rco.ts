import { UserGroup } from './../../../system/entity/user-group';

export class Rco {
    id?: number;
    title?: string;
    description?: string;
    parent?: Rco;
    children?: Rco[];
    isPublished?: boolean;
    contentType?: 'COURSE' | 'TOPIC_GROUP' | 'TOPIC';
    userGroup?: UserGroup;
    sourseRco?: Rco;
    rootRco?: Rco;

    depth?: number;
    childSeq?: number;

    trackingType?: 'AUTO' | 'VIDEO' | 'CMI' | 'CMI5' | 'TEST' | 'LIVE' | 'DOC';

    startingUrl?: string;

    // used by preview player
    isEnabled: boolean;
    isCurrent: boolean;
    contentServerPath: string;
}
