import { UserGroup } from 'app/system/entity/user-group';
import { Site } from 'app/system/entity/site';
import { User } from 'app/system/entity/user';

export class PointsMall {
    id?: number;
    name?: string;

    startDate?: Date;
    endDate?: Date;

    userGroup?: UserGroup;
    site?: Site;
}
