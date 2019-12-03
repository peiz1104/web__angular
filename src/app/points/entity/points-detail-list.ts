import { UserGroup } from 'app/system/entity/user-group';
import { Site } from 'app/system/entity/site';
import { User } from 'app/system/entity/user';

export class PointsDetailList {
    id: number;
    username: string;
    password?: string;
    modifyPassword?: string;

    email?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;

    phoneNumber?: string;
    sex?: string; // enum Sex {MALE, FAMALE}
    // startDate?: Date;
    // endDate?: Date;
    startDate?: Date;
    endDate?: Date;
    status?: string; // enum AccountStatus {ACTIVE, LOCKED}

    userGroup?: UserGroup;
    site?: Site;
    
    language?: string;
}
